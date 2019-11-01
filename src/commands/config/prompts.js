// @flow
export const CONFIGURATION_PROMPT_NAMES = {
  AUTO_ADD: 'autoAdd',
  EMOJI_FORMAT: 'emojiFormat',
  SCOPE_PROMPT: 'scopePrompt',
  SIGNED_COMMIT: 'signedCommit'
}

export default [
  {
    name: CONFIGURATION_PROMPT_NAMES.AUTO_ADD,
    message: 'Enable automatic "git add ."',
    type: 'confirm'
  },
  {
    name: CONFIGURATION_PROMPT_NAMES.EMOJI_FORMAT,
    message: 'Select how emojis should be used in commits',
    type: 'list',
    choices: [
      { name: ':smile:', value: 'code' },
      { name: '😄', value: 'emoji' }
    ]
  },
  {
    name: CONFIGURATION_PROMPT_NAMES.SIGNED_COMMIT,
    message: 'Enable signed commits',
    type: 'confirm'
  },
  {
    name: CONFIGURATION_PROMPT_NAMES.SCOPE_PROMPT,
    message: 'Enable scope prompt',
    type: 'confirm'
  }
]
