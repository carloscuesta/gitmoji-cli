// @flow
import Conf from 'conf'

import { CONFIGURATION_PROMPT_NAMES } from '../commands/config/prompts'

export const config = new Conf({ projectName: 'gitmoji' })

const setAutoAdd = (autoAdd: boolean) => {
  config.set(CONFIGURATION_PROMPT_NAMES.AUTO_ADD, autoAdd)
}

const setEmojiFormat = (emojiFormat: string) => {
  config.set(CONFIGURATION_PROMPT_NAMES.EMOJI_FORMAT, emojiFormat)
}

const setSignedCommit = (signedCommit: boolean) => {
  config.set(CONFIGURATION_PROMPT_NAMES.SIGNED_COMMIT, signedCommit)
}

const setScopePrompt = (scopePrompt: boolean) => {
  config.set(CONFIGURATION_PROMPT_NAMES.SCOPE_PROMPT, scopePrompt)
}

const getAutoAdd = () => {
  config.get(CONFIGURATION_PROMPT_NAMES.AUTO_ADD)
}

const getEmojiFormat = () => {
  config.get(CONFIGURATION_PROMPT_NAMES.EMOJI_FORMAT)
}

const getSignedCommit = () => {
  config.get(CONFIGURATION_PROMPT_NAMES.SIGNED_COMMIT)
}

const getScopePrompt = () => {
  config.get(CONFIGURATION_PROMPT_NAMES.SCOPE_PROMPT)
}

export default {
  getAutoAdd,
  getEmojiFormat,
  getScopePrompt,
  getSignedCommit,
  setAutoAdd,
  setEmojiFormat,
  setScopePrompt,
  setSignedCommit
}
