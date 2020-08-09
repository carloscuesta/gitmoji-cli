// @flow
const findGitmojiCommand = (cli: any, options: Object) => {
  const flags = cli.flags

  const inputFlags = Object.keys(flags).map((flag) => flags[flag] && flag)

  const matchedFlagsWithInput = inputFlags.filter((flag) => options[flag])

  const option = options[matchedFlagsWithInput]

  if (!option) {
    return cli.showHelp()
  }

  if (typeof option === 'function') {
    return option()
  }

  const cmdOptions = inputFlags.filter((flag) => option.opts.includes(flag))

  return option.cmd(cmdOptions)
}

export default findGitmojiCommand
