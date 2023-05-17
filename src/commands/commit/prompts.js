// @flow
import inquirer from 'inquirer'
import inquirerAutocompletePrompt from 'inquirer-autocomplete-prompt'

import configurationVault from '@utils/configurationVault'
import filterGitmojis from '@utils/filterGitmojis'
import getDefaultCommitContent from '@utils/getDefaultCommitContent'
import { type CommitOptions, capitalizeTitle } from '.'
import guard from './guard'

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
  scope?: string,
  storyId?: string,
  title: string,
  message?: string
}

export default (
  gitmojis: Array<Gitmoji>,
  options: CommitOptions
): Array<Object> => {
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
            ...(scope ? { default: scope } : {})
          }
        ]
      : []),
    {
      name: 'title',
      message: 'Enter the commit title',
      validate: guard.title,
      transformer: (input: string) => {
        return `[${(title || input).length}/${TITLE_MAX_LENGTH_COUNT}]: ${
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
      : []),
    ...(configurationVault.getStoryIdPrompt()
      ? [
          {
            name: 'storyId',
            message: 'Enter the story id:',
            ...(message ? { default: message } : {})
          }
        ]
      : [])
  ]
}
