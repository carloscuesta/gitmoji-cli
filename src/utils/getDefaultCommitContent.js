// @flow
import fs from 'fs'

import { type CommitOptions } from '@commands/commit'
import COMMIT_MODES from '@constants/commit'

const COMMIT_FILE_PATH_INDEX = 3
const COMMIT_TITLE_LINE_INDEX = 0
const COMMIT_MESSAGE_LINE_INDEX = 2

const getDefaultCommitContent = (
  options: CommitOptions
): { title: ?string, message: ?string, scope: ?string } => {
  /*
    Since the hook is called with `gitmoji --hook $1`
    According to https://git-scm.com/docs/githooks#_prepare_commit_msg,
    the commit file path will be stored in the 4th argument of the command
  */
  const commitFilePath: string = process.argv[COMMIT_FILE_PATH_INDEX]

  if (options.mode === COMMIT_MODES.CLIENT || !fs.existsSync(commitFilePath)) {
    return {
      message: options['message'] || null,
      scope: options['scope'] || null,
      title: options['title'] || null
    }
  }

  const commitFileContent: Array<string> = fs
    .readFileSync(commitFilePath)
    .toString()
    .split('\n')

  return {
    message:
      commitFileContent.length > COMMIT_MESSAGE_LINE_INDEX
        ? commitFileContent[COMMIT_MESSAGE_LINE_INDEX]
        : null,
    scope: options['scope'],
    title: commitFileContent[COMMIT_TITLE_LINE_INDEX]
  }
}

export default getDefaultCommitContent
