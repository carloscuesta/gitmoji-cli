// @flow
import Conf from 'conf'

import {
  CONFIGURATION_PROMPT_NAMES,
  EMOJI_COMMIT_FORMATS
} from '../commands/config/prompts'

export const config: typeof Conf = new Conf({ projectName: 'gitmoji' })

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

const setCommitExtraArgs = (extraArgs: string) => {
  config.set(CONFIGURATION_PROMPT_NAMES.COMMIT_EXTRA_ARGS, extraArgs)
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

const getCommitExtraArgs = (): string => {
  return config.get(CONFIGURATION_PROMPT_NAMES.COMMIT_EXTRA_ARGS) || ''
}

export default {
  getAutoAdd,
  getEmojiFormat,
  getScopePrompt,
  getSignedCommit,
  getGitmojisUrl,
  getCommitExtraArgs,
  setAutoAdd,
  setEmojiFormat,
  setScopePrompt,
  setSignedCommit,
  setGitmojisUrl,
  setCommitExtraArgs
}
