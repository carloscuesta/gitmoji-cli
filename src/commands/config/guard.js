import chalk from 'chalk'
import isURL from 'validator/lib/isURL.js'

const errors = {
  url: chalk.red('Enter a valid API URL')
}

const url = (url: string) => (isURL(url) ? true : errors.url)

export default {
  url
}
