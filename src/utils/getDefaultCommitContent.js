// @flow
import fs from 'fs'

import { type CommitMode } from '../commands/commit'

const COMMIT_FILE_PATH_INDEX = 3
const COMMIT_TITLE_LINE_INDEX = 0
const COMMIT_MESSAGE_LINE_INDEX = 2

const getDefaultCommitContent = (
  mode: CommitMode
): { title: ?string, message: ?string } => {
  /*
    Since the hook is called with `gitmoji --hook $1`
    According to https://git-scm.com/docs/githooks#_prepare_commit_msg,
    the commit file path will be stored in the 4th argument of the command
  */
  const commitFilePath: string = process.argv[COMMIT_FILE_PATH_INDEX]

  if (mode === 'client' || !fs.existsSync(commitFilePath)) {
    return {
      title: null,
      message: null
    }
  }

  const commitFileContent: Array<string> = fs
    .readFileSync(commitFilePath)
    .toString()
    .split('\n')

  return {
    title: commitFileContent[COMMIT_TITLE_LINE_INDEX],
    message:
      commitFileContent.length > COMMIT_MESSAGE_LINE_INDEX
        ? commitFileContent[COMMIT_MESSAGE_LINE_INDEX]
        : null
  }
}

export default getDefaultCommitContent
