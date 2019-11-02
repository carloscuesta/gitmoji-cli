import chalk from 'chalk'

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

export default {
  message,
  scope,
  title
}
