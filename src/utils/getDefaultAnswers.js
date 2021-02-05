import { CommitContent } from './getDefaultCommitContent'
import type { Answers } from '../commands/commit/prompts'
import configurationVault from './configurationVault'
import guard from '../commands/commit/guard'

const getDefaultAnswers = ({
  gitmoji,
  title,
  message
}: CommitContent): $Shape<Answers> => {
  const answers: $Shape<Answers> = {}
  if (!configurationVault.getSkipPromptingFilledInfo()) return answers

  if (gitmoji) {
    answers.gitmoji = gitmoji
  }
  if (title && guard.title(title) === true) {
    answers.title = title
  }
  if (message && guard.message(message) === true) {
    answers.message = message
  }

  return answers
}

export default getDefaultAnswers
