// @flow
import execa from 'execa'
import fs from 'fs'
import chalk from 'chalk'

import isHookCreated from '../../../utils/isHookCreated'
import configurationVault from '../../../utils/configurationVault'
import { type Answers } from '../prompts'

const withClient = async (answers: Answers) => {
  try {
    const scope = answers.scope ? `(${answers.scope}): ` : ''
    const title = `${answers.gitmoji} ${scope}${answers.title}`
    const isSigned = configurationVault.getSignedCommit() ? ['-S'] : []

    if (await isHookCreated()) {
      return console.log(
        chalk.red(
          "\nError: Seems that you're trying to commit with the cli " +
            'but you have the hook created.\nIf you want to use the `gitmoji -c` ' +
            'command you have to remove the hook with the command `gitmoji -r`. \n' +
            'The hook must be used only when you want to commit with the instruction `git commit`\n'
        )
      )
    }

    if (configurationVault.getAutoAdd()) await execa('git', ['add', '.'])

    const { stdout } = await execa('git', [
      'commit',
      ...isSigned,
      '-m',
      `"${title}"`,
      '-m',
      `"${answers.message}"`
    ])

    console.log(stdout)
  } catch (error) {
    console.error(error)
  }
}

export default withClient
