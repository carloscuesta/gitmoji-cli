// @flow
import inquirer from 'inquirer'

import configurationVault from '../../utils/configurationVault'
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

export default (gitmojis: Array<Gitmoji>): Array<Object> => [
  {
    name: 'gitmoji',
    message: 'Choose a gitmoji:',
    type: 'autocomplete',
    source: (answersSoFor: any, input: string) => {
      return Promise.resolve(
        gitmojis
          .filter((gitmoji) => {
            const emoji = gitmoji.name.concat(gitmoji.description).toLowerCase()
            return !input || emoji.indexOf(input.toLowerCase()) !== -1
          })
          .map((gitmoji) => ({
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
          validate: guard.scope
        }
      ]
    : []),
  {
    name: 'title',
    message: 'Enter the commit title',
    validate: guard.title,
    transformer: (input: string) => {
      return `[${input.length}/${TITLE_MAX_LENGTH_COUNT}]: ${input}`
    }
  },
  {
    name: 'message',
    message: 'Enter the commit message:',
    validate: guard.message
  }
]
