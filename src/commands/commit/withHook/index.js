// @flow
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

export const cancelIfMessageIsAlreadySet = () => {
  const commitMessageFilePath = process.argv[3]
  if (
    fs.existsSync(commitMessageFilePath) &&
    fs.lstatSync(commitMessageFilePath).isFile() &&
    !!fs.readFileSync(commitMessageFilePath, 'utf8')
  ) {
    console.warn('A commit message is already set, cancelling gitmoji\n')
    process.exit(0)
  }
}

export default withHook
