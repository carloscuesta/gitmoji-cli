// @flow
import execa from 'execa'
import path from 'path'

const getAbsoluteHooksPath = async (hookName: string): Promise<string> => {
  const { stdout: coreHooksPath } = await execa('git', [
    'config',
    '--get',
    'core.hooksPath'
  ])

  const { stdout: gitDirPath } = await execa('git', [
    'rev-parse',
    '--absolute-git-dir'
  ])

  const hooksPath = coreHooksPath || gitDirPath + '/hooks'

  return path.resolve(hooksPath, hookName)
}

export default getAbsoluteHooksPath
