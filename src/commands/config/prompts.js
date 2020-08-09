// @flow
import configurationVault from '../../utils/configurationVault'

export const CONFIGURATION_PROMPT_NAMES = {
  AUTO_ADD: 'autoAdd',
  CONTACTS: 'addContacts',
  EMOJI_FORMAT: 'emojiFormat',
  SCOPE_PROMPT: 'scopePrompt',
  SIGNED_COMMIT: 'signedCommit'
}

export const EMOJI_COMMIT_FORMATS = {
  CODE: 'code',
  EMOJI: 'emoji'
}

export default () => [
  {
    name: CONFIGURATION_PROMPT_NAMES.CONTACTS,
    message:
      'Co-authors contacts definitions. E.g.: @ContactId: Name <email@domain.com>',
    type: 'editor',
    default: configurationVault.getContacts()
  },
  {
    name: CONFIGURATION_PROMPT_NAMES.AUTO_ADD,
    message: 'Enable automatic "git add ."',
    type: 'confirm',
    default: configurationVault.getAutoAdd()
  },
  {
    name: CONFIGURATION_PROMPT_NAMES.EMOJI_FORMAT,
    message: 'Select how emojis should be used in commits',
    type: 'list',
    choices: [
      { name: ':smile:', value: EMOJI_COMMIT_FORMATS.CODE },
      { name: '😄', value: EMOJI_COMMIT_FORMATS.EMOJI }
    ],
    default: configurationVault.getEmojiFormat()
  },
  {
    name: CONFIGURATION_PROMPT_NAMES.SIGNED_COMMIT,
    message: 'Enable signed commits',
    type: 'confirm',
    default: configurationVault.getSignedCommit()
  },
  {
    name: CONFIGURATION_PROMPT_NAMES.SCOPE_PROMPT,
    message: 'Enable scope prompt',
    type: 'confirm',
    default: configurationVault.getScopePrompt()
  }
]
