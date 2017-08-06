const chalk = require('chalk')
const Conf = require('conf')
const execa = require('execa')
const fs = require('fs')
const inquirer = require('inquirer')
const parentDirs = require('parent-dirs')
const path = require('path')
const pathExists = require('path-exists')
const config = new Conf()
const utils = require('./utils')

const getAutoAdd = () => config.get(utils.AUTO_ADD)
const getIssueFormat = () => config.get(utils.ISSUE_FORMAT)
const getEmojiFormat = () => config.get(utils.EMOJI_FORMAT)
inquirer.registerPrompt(
  'autocomplete', require('inquirer-autocomplete-prompt')
)

class GitmojiCli {
  constructor (gitmojiApiClient, gitmojis) {
    this._gitmojiApiClient = gitmojiApiClient
    this._gitmojis = gitmojis
    if (!getAutoAdd()) config.set(utils.AUTO_ADD, true)
    if (!getIssueFormat()) config.set(utils.ISSUE_FORMAT, utils.GITHUB)
    if (!getEmojiFormat()) config.set(utils.EMOJI_FORMAT, 'code')
  }

  config () {
    inquirer.prompt(utils.configQuestions).then(answers => {
      config.set(utils.AUTO_ADD, answers.autoAdd)
      config.set(utils.ISSUE_FORMAT, answers.issueFormat)
      config.set(utils.EMOJI_FORMAT, answers.emojiFormat)
    })
  }

  init () {
    if (!this._isAGitRepo()) {
      return this._errorMessage('Not a git repository - @init')
    }

    fs.writeFile(utils.hookPath, utils.hookFileContents, { mode: 0o775 },
      (err) => {
        if (err) this._errorMessage(err)
        console.log(
          `${chalk.yellow('gitmoji')} commit hook created successfully.`
        )
      }
    )
  }

  remove () {
    if (!this._isAGitRepo()) {
      return this._errorMessage('Couldn\'t remove hook, not a git repository')
    }

    fs.unlink(utils.hookPath, (err) => {
      if (err) return this._errorMessage(err)
      return console.log(
        `${chalk.yellow('gitmoji')} commit hook unlinked successfully.`
      )
    })
  }

  version (number) {
    return number
  }

  list () {
    return this._fetchEmojis()
      .then(gitmojis => this._parseGitmojis(gitmojis))
      .catch(err => this._errorMessage(`gitmoji list not found - ${err.code}`))
  }

  search (query) {
    return this._fetchEmojis()
      .then((gitmojis) => gitmojis.filter((gitmoji) => {
        const emoji = gitmoji.name.concat(gitmoji.description).toLowerCase()
        return (emoji.indexOf(query.toLowerCase()) !== -1)
      }))
      .then((gitmojisFiltered) => this._parseGitmojis(gitmojisFiltered))
      .catch((err) => this._errorMessage(err.code))
  }

  ask (mode) {
    if (!this._isAGitRepo()) {
      return this._errorMessage('This directory is not a git repository.')
    }

    return this._fetchEmojis()
      .then((gitmojis) => utils.gitmojiQuestions(gitmojis, getEmojiFormat(), getIssueFormat()))
      .then((questions) => {
        inquirer.prompt(questions).then((answers) => {
          if (mode === utils.HOOK) this._hook(answers)
          return this._commit(answers)
        })
      })
      .catch(err => this._errorMessage(err.code))
  }

  updateCache () {
    this._fetchRemoteEmojis()
      .then(emojis => this._createCache(this._getCachePath(), emojis))
  }

  _errorMessage (message) {
    console.error(chalk.red(`ERROR: ${message}`))
  }

  _hook (answers) {
    const title = `${answers.gitmoji} ${answers.title}`
    const reference = (answers.reference) ? `#${answers.reference}` : ''
    const body = `${answers.message} ${reference}`
    fs.writeFileSync(process.argv[3], `${title}\n\n${body}`)
  }

  _commit (answers) {
    const title = `${answers.gitmoji} ${answers.title}`
    const prefixReference = getIssueFormat() === utils.GITHUB ? '#' : ''
    const reference = (answers.reference)
      ? `${prefixReference}${answers.reference}`
      : ''
    const signed = this._isCommitSigned(answers.signed)
    const body = `${answers.message} ${reference}`
    const commit = `git commit ${signed} -m "${title}" -m "${body}"`

    if (!this._isAGitRepo()) {
      return this._errorMessage('Not a git repository')
    }

    if (getAutoAdd()) {
      execa.stdout('git', ['add', '.'])
        .then((res) => console.log(chalk.blue(res)))
        .catch((err) => this._errorMessage(err.stderr))
    }
    execa.shell(commit)
      .then((res) => console.log(chalk.blue(res.stdout)))
      .catch((err) => this._errorMessage(err.stderr ? err.stderr : err.stdout))

    return commit
  }

  _parseGitmojis (gitmojis) {
    return gitmojis.map(gitmoji => {
      const emoji = gitmoji.emoji
      const code = gitmoji.code
      const description = gitmoji.description
      return console.log(`${emoji} - ${chalk.blue(code)} - ${description}`)
    })
  }

  _isCommitSigned (sign) {
    let signed

    if (sign) {
      signed = '-S'
    } else {
      signed = ''
    }

    return signed
  }

  _isAGitRepo () {
    return parentDirs(process.cwd())
      .some((directory) => pathExists.sync(path.resolve(directory, '.git')))
  }

  _getCachePath () {
    const home = process.env.HOME || process.env.USERPROFILE
    return path.join(home, '.gitmoji', 'gitmojis.json')
  }

  _cacheAvailable (cachePath) {
    return pathExists.sync(cachePath)
  }

  _createCache (cachePath, emojis) {
    const cacheDir = path.dirname(cachePath)

    if (emojis !== undefined) {
      if (!pathExists.sync(cacheDir)) {
        fs.mkdirSync(cacheDir)
      }
      fs.writeFileSync(cachePath, JSON.stringify(emojis))
    }
  }

  _fetchRemoteEmojis () {
    return this._gitmojiApiClient.request({
      method: 'GET',
      url: '/src/data/gitmojis.json'
    }).then((res) => {
      console.log(`${chalk.yellow('Gitmojis')} updated successfully!`)
      return res.data.gitmojis
    })
    .catch((err) => this._errorMessage(`Network connection not found - ${err.code}`))
  }

  _fetchCachedEmojis (cachePath) {
    return Promise.resolve(JSON.parse(fs.readFileSync(cachePath)))
  }

  _fetchEmojis () {
    const cachePath = this._getCachePath()
    if (this._cacheAvailable(cachePath)) {
      return this._fetchCachedEmojis(cachePath)
    }
    return this._fetchRemoteEmojis().then(emojis => {
      this._createCache(cachePath, emojis)
      return emojis
    })
  }
}

module.exports = GitmojiCli
