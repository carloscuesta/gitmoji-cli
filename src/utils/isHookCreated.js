// @flow
import execa from 'execa'
import fs from 'fs'

import HOOK from '../commands/hook/hook'

const isHookCreated = async () => {
  try {
    const { stdout } = await execa('git', ['rev-parse', '--absolute-git-dir'])

    return fs.existsSync(stdout + HOOK.PATH)
  } catch (error) {
    console.error(error)
  }
}

export default isHookCreated
