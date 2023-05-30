// @flow
import { execa } from 'execa'
import fs from 'fs'

import getDefaultCommitContent from '@utils/getDefaultCommitContent'
import { type Answers } from '../prompts'
import { type CommitOptions } from '../index'

const withHook = (answers: Answers) => {
  try {
    const scope = answers.scope ? `(${answers.scope}): ` : ''
    const title = `${answers.gitmoji} ${scope}${answers.title}`
    const commitMessage = `${title}${
      answers.message ? `\n\n${answers.message}` : ''
    }`

    fs.writeFileSync(process.argv[3], commitMessage)
  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    process.exit(0)
  }
}

export const registerHookInterruptionHandler = () => {
  // Allow to interrupt the hook without cancelling the commit
  process.on('SIGINT', () => {
    console.warn('gitmoji-cli was interrupted')
    process.exit(0)
  })
}

export const cancelIfRebasing = (): Promise<void> =>
  execa('git', ['rev-parse', '--absolute-git-dir']).then(
    ({ stdout: gitDirectory }) => {
      // see https://stackoverflow.com/questions/3921409/how-to-know-if-there-is-a-git-rebase-in-progress
      // to understand how a rebase is detected
      if (
        fs.existsSync(gitDirectory + '/rebase-merge') ||
        fs.existsSync(gitDirectory + '/rebase-apply')
      ) {
        process.exit(0)
      }
    }
  )

export const COMMIT_MESSAGE_SOURCE = 4

export const cancelIfAmending = (): Promise<void> =>
  new Promise<void>((resolve) => {
    /*
      from https://git-scm.com/docs/githooks#_prepare_commit_msg
      the commit message source is passed as second argument and corresponding 4 for gitmoji-cli
      `gitmoji --hook $1 $2`
    */
    const commitMessageSource: ?string = process.argv[COMMIT_MESSAGE_SOURCE]
    if (
      commitMessageSource &&
      (commitMessageSource.startsWith('commit') ||
        commitMessageSource.startsWith('merge'))
    ) {
      process.exit(0)
    }
    resolve()
  })

// I avoid Promise.all to avoid race condition in future cancel callbacks
export const cancelIfNeeded = (): Promise<void> =>
  cancelIfAmending().then(cancelIfRebasing)

export const skipIfGitmojiIsPresent = (options: CommitOptions) => {
  const { title } = getDefaultCommitContent(options)
  const UNICODE_EMOJI_REGEX =
    /[\p{Extended_Pictographic}\u{1F3FB}-\u{1F3FF}\u{1F9B0}-\u{1F9B3}]/u
  const SHORTCODE_EMOJI_REGEX = /:[a-z_]+:/

  if (!title) return

  if (UNICODE_EMOJI_REGEX.test(title) || SHORTCODE_EMOJI_REGEX.test(title)) {
    process.exit(0)
  }
}

export default withHook
