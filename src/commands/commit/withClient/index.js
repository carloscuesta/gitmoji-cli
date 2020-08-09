// @flow
import execa from 'execa'
import fs from 'fs'
import chalk from 'chalk'

import isHookCreated from '../../../utils/isHookCreated'
import configurationVault from '../../../utils/configurationVault'
import { type Answers } from '../prompts'

const getContacts = (): string[] => {
  const contactsText = configurationVault.getContacts().trim()
  let contacts = []
  if (contactsText.length > 0) {
    contacts = contactsText.split('\n')
  }
  return contacts
}

const getCoAuthor = (coAuthor: string): string | null => {
  coAuthor = coAuthor.trim()
  if (!coAuthor.startsWith('@')) {
    return coAuthor
  }

  const contact = getContacts().find((contact) =>
    contact.trim().startsWith(coAuthor)
  )
  // Contact not found
  if (typeof contact !== 'string') {
    return null
  }

  const [, coAuthoredBy] = contact.split(': ')

  return coAuthoredBy
}

const withClient = async (answers: Answers) => {
  try {
    const scope = answers.scope ? `(${answers.scope}): ` : ''
    const title = `${answers.gitmoji} ${scope}${answers.title}`
    const isSigned = configurationVault.getSignedCommit() ? ['-S'] : []

    if (await isHookCreated()) {
      return console.log(
        chalk.red(
          "\nError: Seems that you're trying to commit with the cli " +
            'but you have the hook created.\nIf you want to use the `gitmoji -c` ' +
            'command you have to remove the hook with the command `gitmoji -r`. \n' +
            'The hook must be used only when you want to commit with the instruction `git commit`\n'
        )
      )
    }

    if (configurationVault.getAutoAdd()) await execa('git', ['add', '.'])

    let cmdArgs = ['commit', ...isSigned, '-m', title]

    if (answers.message) {
      cmdArgs = [...cmdArgs, '-m', answers.message]
    }

    if (answers.refs) {
      cmdArgs = [...cmdArgs, '-m', `Refs ${answers.refs}`]
    }

    if (answers.coAuthors) {
      let coAuthors = ''
      answers.coAuthors.split(',').forEach((coAuthor) => {
        const coAuthoredBy = getCoAuthor(coAuthor)

        if (coAuthoredBy !== null) {
          coAuthors += `Co-authored-by: ${coAuthoredBy}\n`
        }
      })

      if (coAuthors.trim().length) {
        cmdArgs = [...cmdArgs, '-m', coAuthors.slice(0, -1)]
      }
    }

    const { stdout } = await execa('git', cmdArgs)

    console.log(stdout)
  } catch (error) {
    console.error(error)
  }
}

export default withClient
