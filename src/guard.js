const chalk = require('chalk')

const constants = require('./constants')

const errors = {
  title: chalk.red('Enter a valid commit title'),
  message: chalk.red('Enter a valid commit message'),
  referenceGithub: chalk.red(
    'Enter the number of the reference without the #. Eg: 12'
  ),
  referenceJira: chalk.red('Enter the JIRA reference key, such as ABC-123')
}

const title = (title) => (!title || title.includes('`')) ? errors.title : true

const message = (message) => message.includes('`') ? errors.message : true

/**
* Checks that the given github reference is valid
* https://help.github.com/articles/autolinked-references-and-urls/
* @param {Number} ref - Represents a github reference
* @returns {Boolean}
*/
const githubGuard = (ref) => ref.match(/(^[1-9][0-9]*)+$/)
  ? true
  : errors.referenceGithub

/**
* Checks that the given jira reference is valid
* https://confluence.atlassian.com/jirasoftwarecloud/linking-issues-776997756.html
* @param {Number} ref - Represents a jira reference
* @returns {Boolean}
*/
const jiraGuard = (ref) => ref.match(/^([A-Z][A-Z0-9]{1,9}-[0-9]+)$/g)
  ? true
  : errors.referenceJira

const reference = (reference, mode) => {
  if (!reference) return true
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
