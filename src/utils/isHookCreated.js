// @flow
import execa from 'execa'
import fs from 'fs'

import HOOK from '../commands/hook/hook'

const isHookCreated = async () => {
  try {
    const { stdout } = await execa('git', ['rev-parse', '--absolute-git-dir'])

    if (!fs.existsSync(stdout + HOOK.PATH)) {
      return false
    }
    return fs.readFileSync(stdout + HOOK.PATH) === HOOK.CONTENTS
  } catch (error) {
    console.error(error)
  }
}

export default isHookCreated
