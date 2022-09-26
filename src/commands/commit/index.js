// @flow
import inquirer from 'inquirer'

import getEmojis from '@utils/getEmojis.js'
import COMMIT_MODES from '@constants/commit.js'
import withHook, {
  registerHookInterruptionHandler,
  cancelIfNeeded
} from './withHook/index.js'
import withClient from './withClient/index.js'
import prompts from './prompts.js'

export type CommitOptions = {
  message?: string,
  mode: typeof COMMIT_MODES.CLIENT | typeof COMMIT_MODES.HOOK,
  scope?: string,
  title?: string
}

const promptAndCommit = (options: CommitOptions): Function =>
  getEmojis()
    .then((gitmojis) => prompts(gitmojis, options))
    .then((questions) => {
      inquirer.prompt(questions).then((answers) => {
        if (options.mode === COMMIT_MODES.HOOK) return withHook(answers)

        return withClient(answers)
      })
    })

const commit = (options: CommitOptions): Function => {
  if (options.mode === COMMIT_MODES.HOOK) {
    registerHookInterruptionHandler()
    return cancelIfNeeded().then(() => promptAndCommit(options))
  }

  return promptAndCommit(options)
}

export default commit
