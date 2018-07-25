const axios = require('axios')

const gitmojiApiClient = axios.create({
  baseURL: 'https://raw.githubusercontent.com/carloscuesta/gitmoji/master',
  timeout: 5000,
  headers: {},
  params: {}
})

/**
* @param {Object} cli - The cli object that returns meow()
* @param {Object} cli.flags - The cli flags matched against the input
* @param {Object} options - The mapping for a command to the gitmoji-cli method
* @return {Function}
**/
const findGitmojiCommand = (cli, options) => {
  const flags = cli.flags
  const matchedFlagsWithInput = Object.keys(flags)
    .map((flag) => flags[flag] && flag)
    .filter((flag) => options[flag])

  return options[matchedFlagsWithInput]
    ? options[matchedFlagsWithInput]()
    : cli.showHelp()
}

const inputCountTransformer = (input, maxLength) => {
  return `[${input.length}/${maxLength}]: ${input}`
}

module.exports = {
  findGitmojiCommand,
  gitmojiApiClient,
  inputCountTransformer
}
