// @flow
import fs from 'fs'
import execa from 'execa'
import ora from 'ora'

import HOOK from '../hook'

const removeHook = async () => {
  const spinner = ora('Creating the gitmoji commit hook').start()

  try {
    const { stdout } = await execa('git', ['rev-parse', '--absolute-git-dir'])

    fs.unlink(stdout + HOOK.PATH, (error) => {
      if (error)
        return spinner.fail('Error: Gitmoji commit hook is not created')
      spinner.succeed('Gitmoji commit hook removed successfully')
    })
  } catch (error) {
    spinner.fail(`Error: ${error}`)
  }
}

export default removeHook
