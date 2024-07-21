// @flow
import inquirer from 'inquirer'
import inquirerAutocompletePrompt from 'inquirer-autocomplete-prompt'

import configurationVault from '@utils/configurationVault'
import filterGitmojis from '@utils/filterGitmojis'
import getDefaultCommitContent from '@utils/getDefaultCommitContent'
import { type CommitOptions, capitalizeTitle } from '.'
import guard from './guard'
import Fuse from 'fuse.js'

const TITLE_MAX_LENGTH_COUNT: number = 48

inquirer.registerPrompt('autocomplete', inquirerAutocompletePrompt)

export type Gitmoji = {
  code: string,
  description: string,
  emoji: string,
  name: string
}

export type Answers = {
  gitmoji: string,
  scope: ?string,
  title: string,
  message: ?string
}

export const filterScopes = (
  input?: string,
  scopes: Array<string>
): Function | Array<string> => {
  const fuse = new Fuse(scopes, {
    includeScore: true
  })

  return input ? fuse.search(input).map((scope) => scope.item) : scopes
}

export default (
  gitmojis: Array<Gitmoji>,
  options: CommitOptions
): Array<Object> => {
  const { title, message, scope } = getDefaultCommitContent(options)

  const getScopePrompt = (scopes?: boolean | string[]): Array<Object> => {
    const name = 'scope'
    const message = 'Enter the scope of current changes:'

    switch (scopes) {
      case false:
      case undefined:
        return []
      case true:
        return [
          {
            name,
            message,
            ...(scope ? { default: scope } : {})
          }
        ]
      default:
        return [
          {
            name,
            message,
            ...(scope ? { default: scope } : {}),
            type: 'autocomplete',
            source: (answersSoFor: any, input: string) => {
              return Promise.resolve(
                filterScopes(input, scopes).map((scopeSearch) => ({
                  name: scopeSearch,
                  value: scopeSearch
                }))
              )
            }
          }
        ]
    }
  }

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
    ...getScopePrompt(configurationVault.getScopePrompt()),
    {
      name: 'title',
      message: 'Enter the commit title',
      validate: guard.title,
      transformer: (input: string) => {
        const length = (title || input).length.toString().padStart(2, '0')

        return `[${length}/${TITLE_MAX_LENGTH_COUNT}]: ${
          configurationVault.getCapitalizeTitle()
            ? capitalizeTitle(input)
            : input
        }`
      },
      ...(title ? { default: title } : {})
    },
    ...(configurationVault.getMessagePrompt()
      ? [
          {
            name: 'message',
            message: 'Enter the commit message:',
            ...(message ? { default: message } : {})
          }
        ]
      : [])
  ]
}
