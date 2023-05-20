// @flow
import COMMIT_MODES from '@constants/commit'
import FLAGS from '@constants/flags'

const isSupportedCommand = (command: ?string, options: Object): boolean => {
  return Object.keys(options).includes(command)
}

const determineCommand = (
  flags: Object,
  input: string[],
  options: Object
): {
  type: 'flag' | 'command',
  command: ?string
} => {
  const command = Object.keys(flags)
    .map((flag) => flags[flag] && flag)
    .find((flag) => options[flag])

  return command
    ? {
        type: 'flag',
        command
      }
    : {
        type: 'command',
        command: input[0]
      }
}

const getOptionsForCommand = (
  command: ?string,
  flags: Object,
  input: string[],
  type: 'flag' | 'command'
): ?Object => {
  switch (command) {
    case FLAGS.COMMIT:
    case FLAGS.HOOK:
      return {
        message: flags['message'],
        mode: command === FLAGS.HOOK ? COMMIT_MODES.HOOK : COMMIT_MODES.CLIENT,
        scope: flags['scope'],
        title: flags['title']
      }
    case FLAGS.SEARCH:
      return {
        query: type === 'command' ? input.slice(1) : input
      }
  }

  return null
}

const findGitmojiCommand = (cli: any, options: Object): void => {
  const { command, type } = determineCommand(cli.flags, cli.input, options)

  if (!command || !isSupportedCommand(command, options)) {
    return cli.showHelp()
  }

  const commandOptions = getOptionsForCommand(
    command,
    cli.flags,
    cli.input,
    type
  )

  return options[command] ? options[command](commandOptions) : cli.showHelp()
}

export default findGitmojiCommand
