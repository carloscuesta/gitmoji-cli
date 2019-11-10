// @flow
import { type Answers } from '../commands/commit/prompts'

export const escapeAnswers = (answers: Answers) => {
  const escape = (str: string) =>
    str.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
  answers.title = escape(answers.title)
  answers.message = escape(answers.message)
  if (answers.scope !== undefined) {
    answers.scope = escape(answers.scope)
  }
}

export default escapeAnswers
