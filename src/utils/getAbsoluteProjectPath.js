import execa from 'execa'

const getAbsoluteProjectPath = async () => {
  const { stdout: projectPath } = await execa('git', [
    'rev-parse',
    '--show-toplevel'
  ])
  return projectPath
}

export default getAbsoluteProjectPath
