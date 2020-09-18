// @flow
import execa from 'execa'
import fs from 'fs'

import HOOK from '../commands/hook/hook'

const isHookCreated = async () => {
  try {
    const { stdout } = await execa('git', ['rev-parse', '--absolute-git-dir'])
    const hookFile = stdout + HOOK.PATH

    if (fs.existsSync(hookFile)) {
      return fs.readFileSync(hookFile, { encoding: 'utf-8' }) === HOOK.CONTENTS
    }

    return false
  } catch (error) {
    console.error(error)
  }
}

export default isHookCreated
