// @flow
import fs from 'fs'

import HOOK from '../commands/hook/hook'
import getAbsoluteHooksPath from './getAbsoluteHooksPath'

const isHookCreated = async () => {
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
