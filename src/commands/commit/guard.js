import chalk from 'chalk'
import configurationVault from '../../utils/configurationVault'

const errors = {
  scope: chalk.red('Enter a valid scope'),
  title: chalk.red('Enter a valid commit title'),
  message: chalk.red('Enter a valid commit message')
}

const title = (title: string) =>
  !title || title.includes('`') ? errors.title : true

const message = (message: string) =>
  message.includes('`') ? errors.message : true

const scope = (scope: string) => (scope.includes('`') ? errors.scope : true)

const coAuthors = (coAuthors: string) => {
  // TODO: Validate not contact co authors format to be like: Name <email@domain.com>

  const possibleContacts = coAuthors
    .split(',')
    .map((coAuthor) => coAuthor.trim())
    .filter((coAuthor) => coAuthor.startsWith('@'))

  if (!possibleContacts.length) {
    return true
  }

  const contactsText = configurationVault.getContacts().trim()
  let contacts = []
  if (contactsText.length > 0) {
    contacts = contactsText.split('\n')
  }

  const notFoundContacts = possibleContacts.filter((possibleContact) => {
    const exists = contacts.some((contact) =>
      contact.trim().startsWith(possibleContact)
    )

    return !exists
  })

  if (!notFoundContacts.length) {
    return true
  }

  return chalk.red(
    `Contact${notFoundContacts.length > 1 ? 's' : ''} ${notFoundContacts.join(
      ', '
    )} not found. You have the following contacts: ${contacts.join(', ')}`
  )
}

export default {
  coAuthors,
  message,
  scope,
  title
}
