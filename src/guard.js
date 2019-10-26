const chalk = require('chalk')

const errors = {
  scope: chalk.red('Enter a valid scope'),
  title: chalk.red('Enter a valid commit title'),
  message: chalk.red('Enter a valid commit message')
}

const scope = (scope) => (scope.includes('`') ? errors.scope : true)

const title = (title) => (!title || title.includes('`') ? errors.title : true)

const message = (message) => (message.includes('`') ? errors.message : true)

module.exports = {
  scope,
  title,
  message
}
