// @flow
import { CONFIG } from '@constants/configuration'
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

const setStoryIdPrompt = (storyIdPrompt: boolean): void => {
  configuration.set(CONFIG.STORYID_PROMPT, storyIdPrompt)
}

const setMessagePrompt = (messagePrompt: boolean): void => {
  configuration.set(CONFIG.MESSAGE_PROMPT, messagePrompt)
}

const setCapitalizeTitle = (capitalizeTitle: boolean): void => {
  configuration.set(CONFIG.CAPITALIZE_TITLE, capitalizeTitle)
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

const getStoryIdPrompt = (): boolean => {
  return configuration.get(CONFIG.STORYID_PROMPT)
}

const getMessagePrompt = (): boolean => {
  return configuration.get(CONFIG.MESSAGE_PROMPT)
}

const getCapitalizeTitle = (): boolean => {
  return configuration.get(CONFIG.CAPITALIZE_TITLE)
}

const getGitmojisUrl = (): string => {
  return configuration.get(CONFIG.GITMOJIS_URL)
}

export default {
  getAutoAdd,
  getEmojiFormat,
  getScopePrompt,
  getStoryIdPrompt,
  getMessagePrompt,
  getCapitalizeTitle,
  getGitmojisUrl,
  setAutoAdd,
  setEmojiFormat,
  setScopePrompt,
  setStoryIdPrompt,
  setMessagePrompt,
  setCapitalizeTitle,
  setGitmojisUrl
}
