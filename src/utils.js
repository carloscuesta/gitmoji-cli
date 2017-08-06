const chalk = require('chalk')

const AUTO_ADD = 'autoAdd'
const ISSUE_FORMAT = 'issueFormat'
const GITHUB = 'github'
const JIRA = 'jira'
const HOOK = 'hook'
const EMOJI_FORMAT = 'emojiFormat'
const hookPath = `${process.env.PWD}/.git/hooks/prepare-commit-msg`
const hookFileContents = '#!/bin/sh\n# gitmoji as a commit hook\n' +
  'exec < /dev/tty\ngitmoji --hook $1'
const hookPermissions = 0o775
const configQuestions = [
  {
    name: AUTO_ADD,
    message: 'Enable automatic "git add ."',
    type: 'confirm'
  }, {
    name: ISSUE_FORMAT,
    message: 'Choose Issue Format',
    type: 'list',
    choices: ['github', 'jira']
  }, {
    name: EMOJI_FORMAT,
    message: 'Select how emojis should be used in commits',
    type: 'list',
    choices: [
      { name: ':smile:', value: 'code' }, { name: '😄', value: 'emoji' }
    ]
  }
]
const gitmojiQuestions = (gitmojis, emojiFormat, issueFormat) => {
  return [
    {
      name: 'gitmoji',
      message: 'Choose a gitmoji:',
      type: 'autocomplete',
      source: (answersSoFor, input) => {
        return Promise.resolve(gitmojis.filter(gitmoji => !input || gitmoji.name.concat(gitmoji.description).toLowerCase().indexOf(input.toLowerCase()) !== -1).map(gitmoji => {
          return {
            name: `${gitmoji.emoji}  - ${gitmoji.description}`,
            value: gitmoji[emojiFormat || 'code']
          }
        }))
      }
    }, {
      name: 'title',
      message: 'Enter the commit title:',
      validate (value) {
        if (value === '' || value.includes('`')) {
          return chalk.red('Enter a valid commit title')
        }
        return true
      }
    }, {
      name: 'message',
      message: 'Enter the commit message:',
      validate (value) {
        if (value.includes('`')) {
          return chalk.red('Enter a valid commit message')
        }
        return true
      }
    }, {
      name: 'reference',
      message: 'Issue / PR reference:',
      validate (value) {
        if (value === '') {
          return true
        }
        if (value !== null) {
          let validReference = ''
          let errorReference = ''
          switch (issueFormat) {
            case 'jira':
              validReference = value.match(/^([A-Z][A-Z0-9]{1,9}-[0-9]+)$/g)
              errorReference = 'Enter the JIRA reference key, such as ABC-123'
              break
            default:
              validReference = value.match(/(^[1-9][0-9]*)+$/)
              errorReference = 'Enter the number of the reference without the #. Eg: 12'
          }

          if (validReference) {
            return true
          }
          return chalk.red(errorReference)
        }
      }
    }, {
      name: 'signed',
      message: 'Signed commit:',
      type: 'confirm'
    }
  ]
}

module.exports = {
  AUTO_ADD,
  configQuestions,
  EMOJI_FORMAT,
  GITHUB,
  gitmojiQuestions,
  HOOK,
  hookFileContents,
  hookPath,
  hookPermissions,
  ISSUE_FORMAT,
  JIRA
}
