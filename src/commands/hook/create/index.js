// @flow
import fs from 'fs'
import ora from 'ora'

import HOOK from '../hook'
import getAbsoluteHooksPath from '../../../utils/getAbsoluteHooksPath'

const createHook = async () => {
  const spinner = ora('Creating the gitmoji commit hook').start()

  try {
    const hookFile = await getAbsoluteHooksPath(HOOK.FILENAME)

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
