// @flow
import COMMIT_MODES from '@constants/commit'
import FLAGS from '@constants/flags'

const getOptionsForCommand = (command: ?string, flags: Object): ?Object => {
  const commandsWithOptions = [FLAGS.COMMIT, FLAGS.HOOK]

  if (commandsWithOptions.includes(command)) {
    return {
      message: flags['message'],
      mode: command === FLAGS.HOOK ? COMMIT_MODES.HOOK : COMMIT_MODES.CLIENT,
      scope: flags['scope'],
      title: flags['title']
    }
  }

  return null
}

const findGitmojiCommand = (cli: any, options: Object): void => {
  const flags = cli.flags
  const commandFlag = Object.keys(flags)
    .map((flag) => flags[flag] && flag)
    .find((flag) => options[flag])
  const commandOptions = getOptionsForCommand(commandFlag, flags)

  return options[commandFlag]
    ? options[commandFlag](commandOptions)
    : cli.showHelp()
}

export default findGitmojiCommand
