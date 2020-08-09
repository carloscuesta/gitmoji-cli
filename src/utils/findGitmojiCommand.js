// @flow
const findGitmojiCommand = (cli: any, options: Object) => {
  const flags = cli.flags
  const matchedFlagsWithInput = Object.keys(flags)
    .map((flag) => flags[flag] && flag)
    .filter((flag) => options[flag])

  return options[matchedFlagsWithInput]
    ? options[matchedFlagsWithInput]()
    : cli.showHelp()
}

export default findGitmojiCommand
