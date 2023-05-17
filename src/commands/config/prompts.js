// @flow
import configurationVault from '@utils/configurationVault'
import { CONFIG, EMOJI_COMMIT_FORMATS } from '@constants/configuration'
import guard from './guard'

export default (): Array<Object> => [
  {
    name: CONFIG.AUTO_ADD,
    message: 'Enable automatic "git add ."',
    type: 'confirm',
    default: configurationVault.getAutoAdd()
  },
  {
    name: CONFIG.EMOJI_FORMAT,
    message: 'Select how emojis should be used in commits',
    type: 'list',
    choices: [
      { name: ':smile:', value: EMOJI_COMMIT_FORMATS.CODE },
      { name: '😄', value: EMOJI_COMMIT_FORMATS.EMOJI }
    ],
    default: configurationVault.getEmojiFormat()
  },
  {
    name: CONFIG.SCOPE_PROMPT,
    message: 'Enable scope prompt',
    type: 'confirm',
    default: configurationVault.getScopePrompt()
  },
  {
    name: CONFIG.STORYID_PROMPT,
    message: 'Enable story id prompt',
    type: 'confirm',
    default: configurationVault.getStoryIdPrompt()
  },
  {
    name: CONFIG.STORYID_PROMPT,
    message: 'Enable story_id prompt',
    type: 'confirm',
    default: configurationVault.getStoryIdPrompt()
  },
  {
    name: CONFIG.MESSAGE_PROMPT,
    message: 'Enable message prompt',
    type: 'confirm',
    default: configurationVault.getMessagePrompt()
  },
  {
    name: CONFIG.CAPITALIZE_TITLE,
    message: 'Capitalize title',
    type: 'confirm',
    default: configurationVault.getCapitalizeTitle()
  },
  {
    name: CONFIG.GITMOJIS_URL,
    message: 'Set gitmojis api url',
    type: 'input',
    default: configurationVault.getGitmojisUrl(),
    validate: guard.url
  }
]
