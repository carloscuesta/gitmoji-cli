// @flow
import execa from 'execa'
import fs from 'fs'
import path from 'path'

import HOOK from '../commands/hook/hook'

const isHookCreated = async () => {
  try {
    const { stdout } = await execa('git', ['config', '--get', 'core.hooksPath'])
    const hookFile = path.resolve(process.cwd(), stdout, HOOK.FILENAME)

    if (fs.existsSync(hookFile)) {
      return fs.readFileSync(hookFile, { encoding: 'utf-8' }) === HOOK.CONTENTS
    }

    return false
  } catch (error) {
    console.error(error)
  }
}

export default isHookCreated
