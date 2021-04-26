// @flow
import execa from 'execa'
import path from 'path'

const getAbsoluteHooksPath = async (hookName: string): Promise<string> => {
  try {
    const { stdout: coreHooksPath } = await execa('git', [
      'config',
      '--get',
      'core.hooksPath'
    ])

    return path.resolve(coreHooksPath, hookName)
  } catch (err) {
    const { stdout: gitDirPath } = await execa('git', [
      'rev-parse',
      '--absolute-git-dir'
    ])

    return path.resolve(gitDirPath + '/hooks', hookName)
  }
}

export default getAbsoluteHooksPath
