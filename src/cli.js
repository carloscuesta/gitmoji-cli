#!/usr/bin/env node
import meow from 'meow'
import updateNotifier from 'update-notifier'

import pkg from '../package.json'
import commands from './commands'
import findGitmojiCommand from './utils/findGitmojiCommand'

updateNotifier({ pkg }).notify({ isGlobal: true })

const cli = meow(
  `
  Usage
    $ gitmoji
  Options
    --commit, -c    Interactively commit using the prompts
    --config, -g    Setup gitmoji-cli preferences.
    --init, -i      Initialize gitmoji as a commit hook
    --list, -l      List all the available gitmojis
    --remove, -r    Remove a previously initialized commit hook
    --search, -s    Search gitmojis
    --update, -u    Sync emoji list with the repo
    --version, -v   Print gitmoji-cli installed version
  Examples
    $ gitmoji -l
    $ gitmoji bug linter -s
`,
  {
    flags: {
      commit: { type: 'boolean', alias: 'c' },
      config: { type: 'boolean', alias: 'g' },
      help: { type: 'boolean', alias: 'h' },
      init: { type: 'boolean', alias: 'i' },
      list: { type: 'boolean', alias: 'l' },
      remove: { type: 'boolean', alias: 'r' },
      search: { type: 'boolean', alias: 's' },
      update: { type: 'boolean', alias: 'u' },
      version: { type: 'boolean', alias: 'v' }
    },
    importMeta: import.meta
  }
)

export const options = {
  commit: () => commands.commit('client'),
  config: () => commands.config(),
  hook: () => commands.commit('hook'),
  init: () => commands.createHook(),
  list: () => commands.list(),
  remove: () => commands.removeHook(),
  search: () => cli.input.map((input) => commands.search(input)),
  update: () => commands.update()
}

findGitmojiCommand(cli, options)
