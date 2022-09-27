#!/usr/bin/env node
// @flow
import meow from 'meow'
import updateNotifier from 'update-notifier'
import { readFileSync } from 'fs'

import commands from '@commands/index.js'
import FLAGS from '@constants/flags.js'
import findGitmojiCommand from '@utils/findGitmojiCommand.js'

const importMeta = { url: import.meta.url }

const packageJson: Object = readFileSync(
  new URL('../package.json', importMeta.url)
)

updateNotifier({ pkg: JSON.parse(packageJson) }).notify({ isGlobal: true })

const cli = meow(
  `
  Usage
    $ gitmoji
  Options
    --${FLAGS.COMMIT}, -c    Interactively commit using the prompts
    --${FLAGS.CONFIG}, -g    Setup gitmoji-cli preferences.
    --${FLAGS.INIT}, -i      Initialize gitmoji as a commit hook
    --${FLAGS.LIST}, -l      List all the available gitmojis
    --${FLAGS.REMOVE}, -r    Remove a previously initialized commit hook
    --${FLAGS.SEARCH}, -s    Search gitmojis
    --${FLAGS.UPDATE}, -u    Sync emoji list with the repo
    --${FLAGS.VERSION}, -v   Print gitmoji-cli installed version
  Examples
    $ gitmoji -l
    $ gitmoji bug linter -s
`,
  {
    importMeta,
    flags: {
      [FLAGS.COMMIT]: { type: 'boolean', alias: 'c' },
      [FLAGS.CONFIG]: { type: 'boolean', alias: 'g' },
      [FLAGS.HELP]: { type: 'boolean', alias: 'h' },
      [FLAGS.INIT]: { type: 'boolean', alias: 'i' },
      [FLAGS.LIST]: { type: 'boolean', alias: 'l' },
      [FLAGS.REMOVE]: { type: 'boolean', alias: 'r' },
      [FLAGS.SEARCH]: { type: 'boolean', alias: 's' },
      [FLAGS.UPDATE]: { type: 'boolean', alias: 'u' },
      [FLAGS.VERSION]: { type: 'boolean', alias: 'v' }
    }
  }
)

export const options = ({
  [FLAGS.COMMIT]: (options: Object) => commands.commit(options),
  [FLAGS.CONFIG]: () => commands.config(),
  [FLAGS.HOOK]: (options: Object) => commands.commit(options),
  [FLAGS.INIT]: () => commands.createHook(),
  [FLAGS.LIST]: () => commands.list(),
  [FLAGS.REMOVE]: () => commands.removeHook(),
  [FLAGS.SEARCH]: () => cli.input.map((input) => commands.search(input)),
  [FLAGS.UPDATE]: () => commands.update()
}: { [$Values<typeof FLAGS>]: Function })

findGitmojiCommand(cli, options)
