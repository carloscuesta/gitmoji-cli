// @flow
import fs from 'fs'
import ora from 'ora'

import HOOK from '../hook'
import getAbsoluteHooksPath from '../../../utils/getAbsoluteHooksPath'

const removeHook = async () => {
  const spinner = ora('Creating the gitmoji commit hook').start()

  try {
    const hookFile = await getAbsoluteHooksPath(HOOK.FILENAME)

    fs.unlinkSync(hookFile)
    spinner.succeed('Gitmoji commit hook removed successfully')
  } catch (error) {
    spinner.fail('Error: Gitmoji commit hook is not created')
  }
}

export default removeHook
