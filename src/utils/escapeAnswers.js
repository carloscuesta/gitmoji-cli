// @flow
import { type Answers } from '../commands/commit/prompts'

export const escapeAnswers = (answers: Answers) => {
  const escape = (str: string) =>
    str.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
  return {
    ...answers,
    title: escape(answers.title),
    message: escape(answers.message)
  }
}

export default escapeAnswers
