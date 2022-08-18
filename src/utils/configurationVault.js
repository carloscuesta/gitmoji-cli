// @flow
import Conf from 'conf'

import {
  CONFIGURATION_PROMPT_NAMES,
  EMOJI_COMMIT_FORMATS
} from '@commands/config/prompts'

export const config: typeof Conf = new Conf({
  projectName: 'gitmoji',
  schema: {
    [CONFIGURATION_PROMPT_NAMES.AUTO_ADD]: { type: 'boolean' },
    [CONFIGURATION_PROMPT_NAMES.EMOJI_FORMAT]: {
      enum: Object.values(EMOJI_COMMIT_FORMATS)
    },
    [CONFIGURATION_PROMPT_NAMES.SIGNED_COMMIT]: { type: 'boolean' },
    [CONFIGURATION_PROMPT_NAMES.SCOPE_PROMPT]: { type: 'boolean' },
    [CONFIGURATION_PROMPT_NAMES.GITMOJIS_URL]: { type: 'string', format: 'url' }
  }
})

const setAutoAdd = (autoAdd: boolean): void => {
  config.set(CONFIGURATION_PROMPT_NAMES.AUTO_ADD, autoAdd)
}

const setEmojiFormat = (emojiFormat: string): void => {
  config.set(CONFIGURATION_PROMPT_NAMES.EMOJI_FORMAT, emojiFormat)
}

const setSignedCommit = (signedCommit: boolean): void => {
  config.set(CONFIGURATION_PROMPT_NAMES.SIGNED_COMMIT, signedCommit)
}

const setScopePrompt = (scopePrompt: boolean): void => {
  config.set(CONFIGURATION_PROMPT_NAMES.SCOPE_PROMPT, scopePrompt)
}

const setGitmojisUrl = (gitmojisUrl: string): void => {
  config.set(CONFIGURATION_PROMPT_NAMES.GITMOJIS_URL, gitmojisUrl)
}

const getAutoAdd = (): boolean => {
  return config.get(CONFIGURATION_PROMPT_NAMES.AUTO_ADD) || false
}

const getEmojiFormat = (): string => {
  return (
    config.get(CONFIGURATION_PROMPT_NAMES.EMOJI_FORMAT) ||
    EMOJI_COMMIT_FORMATS.CODE
  )
}

const getSignedCommit = (): boolean => {
  return config.get(CONFIGURATION_PROMPT_NAMES.SIGNED_COMMIT) || false
}

const getScopePrompt = (): boolean => {
  return config.get(CONFIGURATION_PROMPT_NAMES.SCOPE_PROMPT) || false
}

export const GITMOJIS_URL = 'https://gitmoji.dev/api/gitmojis'

const getGitmojisUrl = (): string => {
  return config.get(CONFIGURATION_PROMPT_NAMES.GITMOJIS_URL) || GITMOJIS_URL
}

export default {
  getAutoAdd,
  getEmojiFormat,
  getScopePrompt,
  getSignedCommit,
  getGitmojisUrl,
  setAutoAdd,
  setEmojiFormat,
  setScopePrompt,
  setSignedCommit,
  setGitmojisUrl
}
