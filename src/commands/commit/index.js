// @flow
import inquirer from 'inquirer'

import configurationVault from '@utils/configurationVault'
import getEmojis from '@utils/getEmojis'
import COMMIT_MODES from '@constants/commit'
import withHook, {
  registerHookInterruptionHandler,
  cancelIfNeeded
} from './withHook'
import withClient from './withClient'
import prompts from './prompts'
import type { Answers } from './prompts'

export type CommitOptions = {
  message?: string,
  mode: typeof COMMIT_MODES.CLIENT | typeof COMMIT_MODES.HOOK,
  scope?: string,
  storyId?: string,
  title?: string
}

export const capitalizeTitle = (title: string): string =>
  title.charAt(0).toUpperCase() + title.slice(1)

const promptAndCommit = (options: CommitOptions): Function =>
  getEmojis()
    .then((gitmojis) => prompts(gitmojis, options))
    .then((questions) => {
      inquirer.prompt(questions).then((answers: Answers) => {
        const transformedAnswers = {
          ...answers,
          title: configurationVault.getCapitalizeTitle()
            ? capitalizeTitle(answers.title)
            : answers.title
        }

        if (options.mode === COMMIT_MODES.HOOK) {
          return withHook(transformedAnswers)
        }

        return withClient(transformedAnswers)
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
