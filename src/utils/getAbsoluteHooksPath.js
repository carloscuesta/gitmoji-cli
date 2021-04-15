// @flow
import execa from 'execa'
import path from 'path'

const getAbsoluteHooksPath = async (hookName: string) => {
  let absoluteHooksPath

  // First retrieve the hooks path from the git config
  // It can be either absolute or relative according to git documentation
  // NOTE: this requires git >= 2.9 (2016-06-13)
  const hooksPathCommand = await execa('git', [
    'config',
    '--get',
    'core.hooksPath'
  ])
  const hooksPath = hooksPathCommand.stdout || '.git/hooks'

  if (path.isAbsolute(hooksPath)) {
    // If the hooks path is absolute, return it
    absoluteHooksPath = hooksPathCommand.stdout
  } else {
    // If it is relative, retrieve the absolute path of the git directory then map the relative hooks path to it
    // NOTE: this requires git >= 2.13 (2017-05-10)
    const absoluteGitDirCommand = await execa('git', [
      'rev-parse',
      '--absolute-git-dir'
    ])

    // Finally, reassemble those paths
    absoluteHooksPath = path.resolve(
      // Use dirname to remove the trailing "/.git" from the path
      path.dirname(absoluteGitDirCommand.stdout),
      hooksPath
    )
  }

  return path.resolve(absoluteHooksPath, hookName)
}

export default getAbsoluteHooksPath
