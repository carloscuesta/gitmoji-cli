// @flow
import inquirer from 'inquirer'

import getEmojis from '../../utils/getEmojis'
import prompts from './prompts'
import withHook from './withHook'
import withClient from './withClient'

const commit = (mode: 'client' | 'hook') => {
  return getEmojis()
    .then((gitmojis) => prompts(gitmojis))
    .then((questions) => {
      inquirer.prompt(questions).then((answers) => {
        if (mode === 'hook') return withHook(answers)

        return withClient(answers)
      })
    })
}

export default commit
