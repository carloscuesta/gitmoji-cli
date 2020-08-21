// @flow
import inquirer from 'inquirer'

import getEmojis from '../../utils/getEmojis'
import prompts from './prompts'
import withHook, { registerHookInterruptionHandler } from './withHook'
import withClient from './withClient'

export type CommitMode = 'client' | 'hook'

const commit = (mode: CommitMode) => {
  if (mode === 'hook') registerHookInterruptionHandler()

  return getEmojis()
    .then((gitmojis) => prompts(gitmojis, mode))
    .then((questions) => {
      inquirer.prompt(questions).then((answers) => {
        if (mode === 'hook') return withHook(answers)

        return withClient(answers)
      })
    })
}

export default commit
