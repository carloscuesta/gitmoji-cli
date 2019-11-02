// @flow
import execa from 'execa'

import configurationVault from '../../../utils/configurationVault'
import { type Answers } from '../prompts'

const withClient = async (answers: Answers) => {
  try {
    const scope = answers.scope ? `(${answers.scope}): ` : ''
    const title = `${answers.gitmoji} ${scope}${answers.title}`
    const isSigned = configurationVault.getSignedCommit() ? ['-S'] : []

    if (configurationVault.getAutoAdd()) await execa('git', ['add', '.'])

    const { stdout } = await execa('git', [
      'commit',
      ...isSigned,
      '-m',
      title,
      '-m',
      answers.message
    ])

    console.log(stdout)
  } catch (error) {
    console.error(error)
  }
}

export default withClient
