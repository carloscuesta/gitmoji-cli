// @flow
import inquirer from 'inquirer'

import getEmojis from '@utils/getEmojis'
import COMMIT_MODES from '@constants/commit'
import withHook, {
  registerHookInterruptionHandler,
  cancelIfNeeded
} from './withHook'
import withClient from './withClient'
import prompts from './prompts'

export type CommitOptions = {
  message?: string,
  mode: typeof COMMIT_MODES.CLIENT | typeof COMMIT_MODES.HOOK,
  scope?: string,
  title?: string,
  gitFlags: Object
}

const promptAndCommit = (options: CommitOptions): Function =>
  getEmojis()
    .then((gitmojis) => prompts(gitmojis, options))
    .then((questions) => {
      inquirer.prompt(questions).then((answers) => {
        if (options.mode === COMMIT_MODES.HOOK) return withHook(answers)

        return withClient(answers, options.gitFlags)
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
