// @flow
import inquirer from 'inquirer'

import configurationVault from '../../utils/configurationVault'
import filterGitmojis from '../../utils/filterGitmojis'
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
  message: string,
  refs: string,
  coAuthors: string
}

export type Options = {
  refs: boolean,
  coAuthors: boolean
}

export default (gitmojis: Array<Gitmoji>, options: Options): Array<Object> => [
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
          validate: guard.scope
        }
      ]
    : []),
  {
    name: 'title',
    message: 'Enter the commit title:',
    validate: guard.title,
    transformer: (input: string) => {
      return `[${input.length}/${TITLE_MAX_LENGTH_COUNT}]: ${input}`
    }
  },
  {
    name: 'message',
    message: 'Enter the commit message:',
    validate: guard.message
  },
  ...((options && options.refs) || false
    ? [
        {
          name: 'refs',
          message: 'Issue / PR reference:',
          filter: (input) => input.replace(/[^0-9#! ]/g, '').trim()
        }
      ]
    : []),
  ...((options && options.coAuthors) || false
    ? [
        {
          name: 'coAuthors',
          message: 'Co-authors (Separated by comma):',
          validate: guard.coAuthors,
          filter: (input) => {
            // Clean input
            const coAuthors = input
              .trim()
              .split(',')
              .map((coAuthor) => coAuthor.trim())
              .filter((coAuthor) => !!coAuthor)

            // TODO: Replace contacts with complete contact data. E.g.: @A -> A <a@b.c>

            // Remove duplications
            return [...new Set(coAuthors)].join(', ')
          }
        }
      ]
    : [])
]
