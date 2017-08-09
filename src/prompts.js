const constants = require('./constants')
const configVault = require('./config')
const chalk = require('chalk')

const config = [
  {
    name: constants.AUTO_ADD,
    message: 'Enable automatic "git add ."',
    type: 'confirm'
  },
  {
    name: constants.ISSUE_FORMAT,
    message: 'Choose Issue Format',
    type: 'list',
    choices: ['github', 'jira']
  },
  {
    name: constants.EMOJI_FORMAT,
    message: 'Select how emojis should be used in commits',
    type: 'list',
    choices: [
      { name: ':smile:', value: 'code' }, { name: '😄', value: 'emoji' }
    ]
  }
]

const gitmoji = (gitmojis) => {
  return [
    {
      name: 'gitmoji',
      message: 'Choose a gitmoji:',
      type: 'autocomplete',
      source: (answersSoFor, input) => {
        return Promise.resolve(
          gitmojis.filter((gitmoji) => {
            const emoji = gitmoji.name.concat(gitmoji.description).toLowerCase()
            return (!input || emoji.indexOf(input.toLowerCase()) !== -1)
          })
          .map((gitmoji) => ({
            name: `${gitmoji.emoji}  - ${gitmoji.description}`,
            value: gitmoji[configVault.getEmojiFormat() || constants.CODE]
          }))
        )
      }
    },
    {
      name: 'title',
      message: 'Enter the commit title:',
      validate (value) {
        if (!value || value.includes('`')) {
          return chalk.red('Enter a valid commit title')
        }
        return true
      }
    },
    {
      name: 'message',
      message: 'Enter the commit message:',
      validate (value) {
        if (value.includes('`')) {
          return chalk.red('Enter a valid commit message')
        }
        return true
      }
    },
    {
      name: 'reference',
      message: 'Issue / PR reference:',
      validate (value) {
        if (!value) return true
        const validGithubRef = value.match(/(^[1-9][0-9]*)+$/)
        const validJiraRef = value.match(/^([A-Z][A-Z0-9]{1,9}-[0-9]+)$/g)
        if (validGithubRef) return true
        if (configVault.getIssueFormat() === constants.JIRA) {
          if (validJiraRef) return true
          return chalk.red('Enter the JIRA reference key, such as ABC-123')
        }
        return chalk.red(
          'Enter the number of the reference without the #. Eg: 12'
        )
      }
    },
    {
      name: 'signed',
      message: 'Signed commit:',
      type: 'confirm'
    }
  ]
}

module.exports = {
  config,
  gitmoji
}
