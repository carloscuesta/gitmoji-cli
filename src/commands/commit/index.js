// @flow
import inquirer from 'inquirer'

import getEmojis from '../../utils/getEmojis'
import prompts from './prompts'
import withHook, {
  registerHookInterruptionHandler,
  cancelIfNeeded
} from './withHook'
import withClient from './withClient'
import getDefaultCommitContent from '../../utils/getDefaultCommitContent'
import getDefaultAnswers from '../../utils/getDefaultAnswers'

export type CommitMode = 'client' | 'hook'

const commit = (mode: CommitMode) => {
  if (mode === 'hook') {
    registerHookInterruptionHandler()
    return cancelIfNeeded().then(() => promptAndCommit(mode))
  }

  return promptAndCommit(mode)
}

const promptAndCommit = async (mode: CommitMode) => {
  const gitmojis = await getEmojis()
  const commitContent = getDefaultCommitContent(mode)
  const defaultAnswers = getDefaultAnswers(commitContent)
  const questions = prompts(gitmojis, commitContent, defaultAnswers)
  const answers = {
    ...defaultAnswers,
    ...(await inquirer.prompt(questions))
  }

  if (mode === 'hook') return withHook(answers)

  return withClient(answers)
}

export default commit
