// @flow
import COMMIT_MODES, { COMMIT_MESSAGE_PARTS } from '@constants/commit'
import FLAGS from '@constants/flags'

const getOptionsForCommand = (command: ?string, flags: Object): ?Object => {
  const commandsWithOptions = [FLAGS.COMMIT, FLAGS.HOOK]

  if (commandsWithOptions.includes(command)) {
    const gitFlags = omit(
      flags,
      'm',
      'add',
      ...Object.values(COMMIT_MESSAGE_PARTS),
      ...Object.values(FLAGS)
    )
    // TODO(anau) check if message, mode, scope, title in git flags (-m ":mode: (scope) title" -m "message" -> 'm' is array if 2 times) includes #1037
    // currently those messages are removed
    return {
      message: flags[COMMIT_MESSAGE_PARTS.MESSAGE],
      mode: command === FLAGS.HOOK ? COMMIT_MODES.HOOK : COMMIT_MODES.CLIENT,
      scope: flags[COMMIT_MESSAGE_PARTS.SCOPE],
      title: flags[COMMIT_MESSAGE_PARTS.TITLE],
      gitFlags
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

const omit = (obj: Object, ...props: mixed[]) => {
  const result = { ...obj }
  props.forEach(function (prop) {
    delete result[prop]
  })
  return result
}

export default findGitmojiCommand
