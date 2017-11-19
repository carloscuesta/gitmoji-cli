const chalk = require('chalk')

const constants = require('./constants')

const errors = {
  title: 'Enter a valid commit title',
  message: 'Enter a valid commit message',
  referenceGithub: 'Enter the number of the reference without the #. Eg: 12',
  referenceJira: 'Enter the JIRA reference key, such as ABC-123'
}

const title = (title) => {
  if (!title || title.includes('`')) return chalk.red(errors.title)
  return true
}

const message = (message) => {
  if (message.includes('`')) return chalk.red(errors.message)
  return true
}

const reference = (reference, mode) => {
  if (!reference) return true

  const githubGuard = (reference) => {
    const error = chalk.red(errors.referenceGithub)
    return reference.match(/(^[1-9][0-9]*)+$/) ? true : error
  }

  const jiraGuard = (reference) => {
    const error = chalk.red(errors.referenceJira)
    return reference.match(/^([A-Z][A-Z0-9]{1,9}-[0-9]+)$/g) ? true : error
  }

  switch (mode) {
    case constants.GITHUB: {
      return githubGuard(reference)
    }

    case constants.JIRA: {
      return jiraGuard(reference)
    }

    default: {
      return githubGuard(reference)
    }
  }
}

module.exports = {
  title,
  message,
  reference
}
