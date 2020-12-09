// @flow
import execa from 'execa'
import fs from 'fs'

import { type Answers } from '../prompts'

const withHook = (answers: Answers) => {
  try {
    const scope = answers.scope ? `(${answers.scope}): ` : ''
    const title = `${answers.gitmoji} ${scope}${answers.title}`
    const commitMessage = `${title}\n\n${answers.message}`

    fs.writeFileSync(process.argv[3], commitMessage)
  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    process.exit(0)
  }
}

export const registerHookInterruptionHandler = () => {
  // Allow to interrupt the hook without cancelling the commit
  process.on('SIGINT', () => {
    console.warn('gitmoji-cli was interrupted')
    process.exit(0)
  })
}

export const cancelIfRebasing = () =>
  execa('git', ['rev-parse', '--absolute-git-dir']).then(
    ({ stdout: gitDirectory }) => {
      // see https://stackoverflow.com/questions/3921409/how-to-know-if-there-is-a-git-rebase-in-progress
      // to understand how a rebase is detected
      if (
        fs.existsSync(gitDirectory + '/rebase-merge') ||
        fs.existsSync(gitDirectory + '/rebase-apply')
      ) {
        process.exit(0)
      }
    }
  )

export default withHook
