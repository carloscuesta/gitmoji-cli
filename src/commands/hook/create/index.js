// @flow
import fs from 'fs'
import ora from 'ora'

import getAbsoluteHooksPath from '@utils/getAbsoluteHooksPath'
import HOOK from '../hook'

const createHook = async () => {
  const spinner = ora('Creating the gitmoji commit hook').start()

  try {
    const hookFile = await getAbsoluteHooksPath(HOOK.FILENAME)

    fs.writeFileSync(hookFile, HOOK.CONTENTS, { mode: HOOK.PERMISSIONS })
    spinner.succeed('Gitmoji commit hook created successfully')
  } catch (error) {
    spinner.fail(`Error: ${error}`)
  }
}

export default createHook
