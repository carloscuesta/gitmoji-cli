const chalk = require('chalk')
const execa = require('execa')
const fs = require('fs')
const inquirer = require('inquirer')
const parentDirs = require('parent-dirs')
const path = require('path')
const pathExists = require('path-exists')

const config = require('./config')
const prompts = require('./prompts')
const constants = require('./constants')

inquirer.registerPrompt(
  'autocomplete', require('inquirer-autocomplete-prompt')
)

class GitmojiCli {
  constructor (gitmojiApiClient, gitmojis) {
    this._gitmojiApiClient = gitmojiApiClient
    this._gitmojis = gitmojis
    if (config.getAutoAdd() === undefined) config.setAutoAdd(true)
    if (!config.getIssueFormat()) config.setIssueFormat(constants.GITHUB)
    if (!config.getEmojiFormat()) config.setEmojiFormat(constants.CODE)
    if (config.getSignedCommit() === undefined) config.setSignedCommit(true)
  }

  config () {
    inquirer.prompt(prompts.config).then(answers => {
      config.setAutoAdd(answers[constants.AUTO_ADD])
      config.setIssueFormat(answers[constants.ISSUE_FORMAT])
      config.setEmojiFormat(answers[constants.EMOJI_FORMAT])
      config.setSignedCommit(answers[constants.SIGNED_COMMIT])
    })
  }

  init () {
    if (!this._isAGitRepo()) {
      return this._errorMessage('Not a git repository - @init')
    }

    execa('git', ['rev-parse', '--absolute-git-dir'])
      .then(result => {
        fs.writeFile(
          result.stdout.trim() + constants.HOOK_PATH,
          constants.HOOK_FILE_CONTENTS,
          { mode: constants.HOOK_PERMISSIONS },
          (err) => {
            if (err) this._errorMessage(err)
            console.log(
              `${chalk.yellow('gitmoji')} commit hook created successfully.`
            )
          }
        )
      })
      .catch(err => {
        return this._errorMessage(err)
      })
  }

  remove () {
    if (!this._isAGitRepo()) {
      return this._errorMessage('Couldn\'t remove hook, not a git repository')
    }

    execa('git', ['rev-parse', '--absolute-git-dir'])
      .then(result => {
        fs.unlink(result.stdout.trim() + constants.HOOK_PATH, (err) => {
          if (err) return this._errorMessage(err)
          return console.log(
            `${chalk.yellow('gitmoji')} commit hook unlinked successfully.`
          )
        })
      })
      .catch(err => {
        return this._errorMessage(err)
      })
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
      .then((gitmojis) => prompts.gitmoji(gitmojis))
      .then((questions) => {
        inquirer.prompt(questions).then((answers) => {
          if (mode === constants.HOOK_MODE) this._hook(answers)
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

    try {
      fs.writeFileSync(process.argv[3], `${title}\n\n${body}`)
    } catch (error) {
      return this._errorMessage(error)
    }
    process.exit(0)
  }

  _commit (answers) {
    const title = `${answers.gitmoji} ${answers.title}`
    const prefixReference = config.getIssueFormat() === constants.GITHUB
      ? '#'
      : ''
    const reference = (answers.reference)
      ? `${prefixReference}${answers.reference}`
      : ''
    const signed = config.getSignedCommit() ? '-S' : ''
    const body = `${answers.message} ${reference}`
    const commit = `git commit ${signed} -m "${title}" -m "${body}"`

    if (!this._isAGitRepo()) {
      return this._errorMessage('Not a git repository')
    }

    if (config.getAutoAdd()) {
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
      .catch((error) =>
        this._errorMessage(`Network connection not found - ${error.code}`)
      )
  }

  _fetchCachedEmojis (cachePath) {
    return Promise.resolve(JSON.parse(fs.readFileSync(cachePath)))
  }

  _fetchEmojis () {
    const cachePath = this._getCachePath()
    if (this._cacheAvailable(cachePath)) {
      return this._fetchCachedEmojis(cachePath)
    }
    return this._fetchRemoteEmojis().then((emojis) => {
      this._createCache(cachePath, emojis)
      return emojis
    })
  }
}

module.exports = GitmojiCli
