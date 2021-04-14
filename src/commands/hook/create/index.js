// @flow
import fs from 'fs'
import execa from 'execa'
import ora from 'ora'
import path from 'path'

import HOOK from '../hook'

/**
 * Create a "prepare-commit-msg" git hook
 *
 * If "core.hooksPath" is not set in git config, use default ".git/hooks"
 * @see https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks
 */
const createHook = async () => {
  const spinner = ora('Creating the gitmoji commit hook').start()

  try {
    const { stdout } = await execa('git', ['config', '--get', 'core.hooksPath'])
    const relativeHooksPath = stdout || '.git/hooks'
    const hookFile = path.resolve(
      process.cwd(),
      relativeHooksPath,
      HOOK.FILENAME
    )

    fs.writeFile(
      hookFile,
      HOOK.CONTENTS,
      { mode: HOOK.PERMISSIONS },
      (error) => {
        if (error) return spinner.fail(error)
        spinner.succeed('Gitmoji commit hook created successfully')
      }
    )
  } catch (error) {
    spinner.fail(`Error: ${error}`)
  }
}

export default createHook
