import { CommitModes } from '@constants/commit'; // Assuming COMMIT_MODES is exported as CommitModes
import FLAGS from '@constants/flags';

type Options = {
  [key: string]: any;
}

type Cli = {
  flags: Record<string, any>;
  input: string[];
  showHelp(): void;
}

const isSupportedCommand = (command: string | undefined, options: Options): boolean => {
  return command !== undefined && Object.keys(options).includes(command);
};

enum CommandType {
  Flag = 'flag',
  Command = 'command',
}

type CommandResult = {
  type: CommandType;
  command: string | null;
}

const determineCommand = (flags: Options, input: string[], options: Options): CommandResult => {
  const command = Object.keys(flags)
    .map((flag) => flags[flag] && flag)
    .find((flag) => options[flag]);

  return command
    ? {
      type: 'flag',
      command
    }
    : {
      type: 'command',
      command: input[0] || null
    };
};

type CommandOptions = {
  message?: string;
  mode?: CommitModes;
  scope?: string;
  title?: string;
  query?: string[];
}

const getOptionsForCommand = (
  command: string | null,
  flags: Options,
  input: string[],
  type: CommandType
): CommandOptions | null => {
  switch (command) {
    case FLAGS.COMMIT:
    case FLAGS.HOOK:
      return {
        message: flags['message'],
        mode: command === FLAGS.HOOK ? CommitModes.HOOK : CommitModes.CLIENT,
        scope: flags['scope'],
        title: flags['title']
      };
    case FLAGS.SEARCH:
      return {
        query: type === 'command' ? input.slice(1) : input
      };
  }

  return null;
};

const findGitmojiCommand = (cli: Cli, options: Options): void => {
  const { command, type } = determineCommand(cli.flags, cli.input, options);

  if (!command || !isSupportedCommand(command, options)) {
    return cli.showHelp();
  }

  const commandOptions = getOptionsForCommand(command, cli.flags, cli.input, type);

  return options[command] ? options[command](commandOptions) : cli.showHelp();
};

export default findGitmojiCommand;
