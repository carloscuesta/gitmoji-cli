// @flow
import fs from 'fs'

import { type CommitMode } from '../commands/commit'
import configurationVault from './configurationVault'
import { EMOJI_COMMIT_FORMATS } from '../commands/config/prompts'

const COMMIT_FILE_PATH_INDEX = 3
const COMMIT_TITLE_LINE_INDEX = 0
const COMMIT_MESSAGE_LINE_INDEX = 2

const gitmojiSymbolRegex = /^(\p{Emoji_Presentation})\s*(.*)/gu
const gitmojiCodeRegex = /^(:[a-zA-Z_]+:)\s*(.*)/gu

export type CommitContent = {
  gitmoji: ?string,
  title: ?string,
  message: ?string
}

const getDefaultCommitContent = (mode: CommitMode): CommitContent => {
  /*
    Since the hook is called with `gitmoji --hook $1`
    According to https://git-scm.com/docs/githooks#_prepare_commit_msg,
    the commit file path will be stored in the 4th argument of the command
  */
  const commitFilePath: string = process.argv[COMMIT_FILE_PATH_INDEX]

  if (mode === 'client' || !fs.existsSync(commitFilePath)) {
    return {
      gitmoji: null,
      title: null,
      message: null
    }
  }

  const commitFileContent: Array<string> = fs
    .readFileSync(commitFilePath)
    .toString()
    .split('\n')

  let gitmoji = null
  let title = commitFileContent[COMMIT_TITLE_LINE_INDEX]

  const gitmojiRegexResult =
    configurationVault.getEmojiFormat() === EMOJI_COMMIT_FORMATS.CODE
      ? gitmojiCodeRegex.exec(title)
      : gitmojiSymbolRegex.exec(title)
  if (gitmojiRegexResult && gitmojiRegexResult.length === 3) {
    ;[, gitmoji, title] = gitmojiRegexResult
  }

  return {
    gitmoji,
    title,
    message:
      commitFileContent.length > COMMIT_MESSAGE_LINE_INDEX
        ? commitFileContent[COMMIT_MESSAGE_LINE_INDEX]
        : null
  }
}

export default getDefaultCommitContent
