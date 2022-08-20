// @flow
import { CONFIG, EMOJI_COMMIT_FORMATS } from '@constants/configuration'
import getConfiguration from './getConfiguration'

const configuration = getConfiguration()

const setAutoAdd = (autoAdd: boolean): void => {
  configuration.set(CONFIG.AUTO_ADD, autoAdd)
}

const setEmojiFormat = (emojiFormat: string): void => {
  configuration.set(CONFIG.EMOJI_FORMAT, emojiFormat)
}

const setScopePrompt = (scopePrompt: boolean): void => {
  configuration.set(CONFIG.SCOPE_PROMPT, scopePrompt)
}

const setGitmojisUrl = (gitmojisUrl: string): void => {
  configuration.set(CONFIG.GITMOJIS_URL, gitmojisUrl)
}

const getAutoAdd = (): boolean => {
  return configuration.get(CONFIG.AUTO_ADD)
}

const getEmojiFormat = (): string => {
  return configuration.get(CONFIG.EMOJI_FORMAT)
}

const getScopePrompt = (): boolean => {
  return configuration.get(CONFIG.SCOPE_PROMPT)
}

const getGitmojisUrl = (): string => {
  return configuration.get(CONFIG.GITMOJIS_URL)
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
