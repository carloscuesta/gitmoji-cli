// @flow
import { execa } from 'execa'
import chalk from 'chalk'

import isHookCreated from '@utils/isHookCreated'
import configurationVault from '@utils/configurationVault'
import { type Answers } from '../prompts'

const withClient = async (answers: Answers): Promise<void> => {
  try {
    const scope = answers.scope ? `(${answers.scope}): ` : ''
    const title = `${answers.gitmoji} ${scope}${answers.title}`
    const isAutoAddEnabled = configurationVault.getAutoAdd()

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

    if (isAutoAddEnabled) await execa('git', ['add', '.'])

    await execa(
      'git',
      [
        'commit',
        isAutoAddEnabled ? '-am' : '-m',
        title,
        ...(answers.message ? ['-m', answers.message] : []),
        ...(answers.storyId ? ['-m', '[' + answers.storyId + ']'] : [])
      ],
      {
        buffer: false,
        stdio: 'inherit'
      }
    )
  } catch (error) {
    console.error(
      chalk.red(
        '\n',
        'Oops! An error occurred. There is likely additional logging output above.\n',
        'You can run the same commit with this command:\n'
      ),
      '\t',
      error.escapedCommand
    )
  }
}

export default withClient
