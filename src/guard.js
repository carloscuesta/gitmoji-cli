const chalk = require('chalk')

const errors = {
  title: chalk.red('Enter a valid commit title'),
  message: chalk.red('Enter a valid commit message')
}

const title = (title) => (!title || title.includes('`')) ? errors.title : true

const message = (message) => message.includes('`') ? errors.message : true

module.exports = {
  title,
  message
}
