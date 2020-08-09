// @flow
import execa from 'execa'
import fs from 'fs'
import chalk from 'chalk'

import isHookCreated from '../../../utils/isHookCreated'
import configurationVault from '../../../utils/configurationVault'
import { type Answers } from '../prompts'

const getCoAuthor = (coAuthor: string) => {
  coAuthor = coAuthor.trim()
  if (!coAuthor.startsWith('@')) {
    return coAuthor
  }

  const contactsText = configurationVault.getContacts().trim()
  let contacts = []
  if (contactsText.length > 0) {
    contacts = contactsText.split('\n')
  }

  const contact = contacts.find((contact) =>
    contact.trim().startsWith(coAuthor)
  )
  if (typeof contact !== 'string') {
    throw new Error(
      `Contact ${coAuthor} not found! Please set the contacts using the option "-g"`
    )
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
      const refs = answers.refs.replace(/[^0-9#! ]/g, '').trim()

      cmdArgs = [...cmdArgs, '-m', `Refs ${refs}`]
    }

    if (answers.coAuthors) {
      let coAuthors = ''
      answers.coAuthors
        // Remove duplicated whitespaces
        .replace(/ +(?= )/g, '')
        .split(',')
        .forEach((coAuthor) => {
          const coAuthoredBy = getCoAuthor(coAuthor)

          coAuthors += `Co-authored-by: ${coAuthoredBy}\n`
        })

      if (coAuthors.trim().length) {
        cmdArgs = [...cmdArgs, '-m', coAuthors]
      }
    }

    const { stdout } = await execa('git', cmdArgs)

    console.log(stdout)
  } catch (error) {
    console.error(error)
  }
}

export default withClient
