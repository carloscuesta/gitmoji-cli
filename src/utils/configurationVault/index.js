// @flow
import { CONFIGURATION_PROMPT_NAMES } from '@commands/config/prompts'
import getConfiguration from './getConfiguration'

const configuration = getConfiguration()

const setAutoAdd = (autoAdd: boolean): void => {
  configuration.set(CONFIGURATION_PROMPT_NAMES.AUTO_ADD, autoAdd)
}

const setEmojiFormat = (emojiFormat: string): void => {
  configuration.set(CONFIGURATION_PROMPT_NAMES.EMOJI_FORMAT, emojiFormat)
}

const setScopePrompt = (scopePrompt: boolean): void => {
  configuration.set(CONFIGURATION_PROMPT_NAMES.SCOPE_PROMPT, scopePrompt)
}

const setGitmojisUrl = (gitmojisUrl: string): void => {
  configuration.set(CONFIGURATION_PROMPT_NAMES.GITMOJIS_URL, gitmojisUrl)
}

const getAutoAdd = (): boolean => {
  return configuration.get(CONFIGURATION_PROMPT_NAMES.AUTO_ADD)
}

const getEmojiFormat = (): string => {
  return configuration.get(CONFIGURATION_PROMPT_NAMES.EMOJI_FORMAT)
}

const getScopePrompt = (): boolean => {
  return configuration.get(CONFIGURATION_PROMPT_NAMES.SCOPE_PROMPT)
}

const getGitmojisUrl = (): string => {
  return configuration.get(CONFIGURATION_PROMPT_NAMES.GITMOJIS_URL)
}

export default {
  getAutoAdd,
  getEmojiFormat,
  getScopePrompt,
  getGitmojisUrl,
  setAutoAdd,
  setEmojiFormat,
  setScopePrompt,
  setGitmojisUrl
}
