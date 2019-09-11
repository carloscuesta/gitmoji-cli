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
    }
  ]
}

module.exports = {
  config,
  gitmoji
}
