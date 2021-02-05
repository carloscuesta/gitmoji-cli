// @flow
import inquirer from 'inquirer'

import configurationVault from '../../utils/configurationVault'
import filterGitmojis from '../../utils/filterGitmojis'
import guard from './guard'
import type { CommitContent } from '../../utils/getDefaultCommitContent'

const TITLE_MAX_LENGTH_COUNT: number = 48

inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'))

export type Gitmoji = {
  code: string,
  description: string,
  emoji: string,
  name: string
}

export type Answers = {
  gitmoji: string,
  scope?: string,
  title: string,
  message: string
}

export default (
  gitmojis: Array<Gitmoji>,
  { title, message }: CommitContent,
  defaultAnswers: $Shape<Answers>
): Array<Object> => {
  const questions = []

  if (!defaultAnswers.gitmoji) {
    questions.push({
      name: 'gitmoji',
      message: 'Choose a gitmoji:',
      type: 'autocomplete',
      source: (answersSoFor: any, input: string) => {
        return Promise.resolve(
          filterGitmojis(input, gitmojis).map((gitmoji) => ({
            name: `${gitmoji.emoji}  - ${gitmoji.description}`,
            value: gitmoji[configurationVault.getEmojiFormat()]
          }))
        )
      }
    })
  }
  if (configurationVault.getScopePrompt()) {
    questions.push({
      name: 'scope',
      message: 'Enter the scope of current changes:',
      validate: guard.scope
    })
  }
  if (!defaultAnswers.title) {
    questions.push({
      name: 'title',
      message: 'Enter the commit title',
      validate: guard.title,
      transformer: (input: string) => {
        return `[${
          (title || input).length
        }/${TITLE_MAX_LENGTH_COUNT}]: ${input}`
      },
      ...(title ? { default: title } : {})
    })
  }

  if (!defaultAnswers.message) {
    questions.push({
      name: 'message',
      message: 'Enter the commit message:',
      validate: guard.message,
      ...(message ? { default: message } : {})
    })
  }

  return questions
}
