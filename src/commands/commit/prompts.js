// @flow
import inquirer from 'inquirer'

import configurationVault from '../../utils/configurationVault'
import filterGitmojis from '../../utils/filterGitmojis'
import getDefaultCommitContent from '../../utils/getDefaultCommitContent'
import { type CommitOptions } from './index'
import guard from './guard'

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

export default (gitmojis: Array<Gitmoji>, options: CommitOptions): Array<Object> => {
  const { title, message, scope } = getDefaultCommitContent(options)

  return [
    {
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
    },
    ...(configurationVault.getScopePrompt()
      ? [
          {
            name: 'scope',
            message: 'Enter the scope of current changes:',
            validate: guard.scope,
            ...(scope ? { default: scope } : {})
          }
        ]
      : []),
    {
      name: 'title',
      message: 'Enter the commit title',
      validate: guard.title,
      transformer: (input: string) => {
        return `[${
          (title || input).length
        }/${TITLE_MAX_LENGTH_COUNT}]: ${input}`
      },
      ...(title ? { default: title } : {})
    },
    {
      name: 'message',
      message: 'Enter the commit message:',
      validate: guard.message,
      ...(message ? { default: message } : {})
    }
  ]
}
