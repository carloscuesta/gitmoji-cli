import chalk from 'chalk'
import getContacts from '../../utils/getContacts'

const errors = {
  scope: chalk.red('Enter a valid scope'),
  title: chalk.red('Enter a valid commit title'),
  message: chalk.red('Enter a valid commit message'),
  coAuthors: chalk.red(
    'Enter valid co-authors. E.g: @A, name <name@example.com>'
  )
}

const title = (title: string) =>
  !title || title.includes('`') ? errors.title : true

const message = (message: string) =>
  message.includes('`') ? errors.message : true

const scope = (scope: string) => (scope.includes('`') ? errors.scope : true)

function isValidContact(input: string) {
  return input.startsWith('@') && !/ /.test(input)
}

function isValidCoAuthor(input: string) {
  // Pattern extracted from https://stackoverflow.com/a/46181/7491725
  const validCoAuthorPattern = /.* <(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))>$/g
  return validCoAuthorPattern.test(input)
}

const coAuthors = (input: string) => {
  const coAuthors = input.split(',').map((coAuthor) => coAuthor.trim())

  const invalidCoAuthors = coAuthors.filter(
    (coAuthor) => !isValidContact(coAuthor) && !isValidCoAuthor(coAuthor)
  )

  if (invalidCoAuthors.length) return errors.coAuthors

  const possibleContacts = coAuthors.filter((coAuthor) =>
    coAuthor.startsWith('@')
  )

  if (!possibleContacts.length) return true

  const contacts = getContacts()

  const notFoundContacts = possibleContacts.filter(
    (possibleContact) =>
      !contacts.some((contact) => contact.trim().startsWith(possibleContact))
  )

  if (!notFoundContacts.length) return true

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
