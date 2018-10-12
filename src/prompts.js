const constants = require('./constants')
const configVault = require('./config')
const guard = require('./guard')
const utils = require('./utils')

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
  },
  {
    name: constants.SIGNED_COMMIT,
    message: 'Enable signed commits',
    type: 'confirm'
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
      message: 'Enter the commit title',
      validate: guard.title,
      transformer: (input) => utils.inputCountTransformer(
        input,
        constants.TITLE_MAX_LENGTH_COUNT
      )
    },
    {
      name: 'message',
      message: 'Enter the commit message:',
      validate: guard.message
    },
    {
      name: 'reference',
      message: 'Issue / PR reference:',
      validate: (value) => guard.reference(value, configVault.getIssueFormat())
    }
  ]
}

module.exports = {
  config,
  gitmoji
}
