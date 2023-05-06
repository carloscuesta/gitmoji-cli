// @flow
import COMMIT_MODES from '@constants/commit'
import FLAGS from '@constants/flags'

const isSupportedCommand = (command: ?string, options: Object): boolean => {
  return Object.keys(options).includes(command)
}

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

  const command =
    Object.keys(flags)
      .map((flag) => flags[flag] && flag)
      .find((flag) => options[flag]) || cli.input[0]

  if (!command || !isSupportedCommand(command, options)) {
    return cli.showHelp()
  }

  const commandOptions = getOptionsForCommand(command, flags)

  return options[command] ? options[command](commandOptions) : cli.showHelp()
}

export default findGitmojiCommand
