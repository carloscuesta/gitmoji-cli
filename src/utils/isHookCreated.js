// @flow
import fs from 'fs'

import HOOK from '@commands/hook/hook.js'
import getAbsoluteHooksPath from './getAbsoluteHooksPath.js'

const isHookCreated = async (): Promise<?boolean> => {
  try {
    const hookFile = await getAbsoluteHooksPath(HOOK.FILENAME)

    if (fs.existsSync(hookFile)) {
      return fs.readFileSync(hookFile, { encoding: 'utf-8' }) === HOOK.CONTENTS
    }

    return false
  } catch (error) {
    console.error(error)
  }
}

export default isHookCreated
