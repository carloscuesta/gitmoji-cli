#!/usr/bin/env node
import meow from 'meow'
import updateNotifier from 'update-notifier'
import { readFileSync } from 'fs'

import FLAGS from '@constants/flags'
import findGitmojiCommand from '@utils/findGitmojiCommand'
import type { CommitOptions } from '@commands/commit'
import type { SearchOptions } from '@commands/search'

const packageJson = readFileSync(
  new URL('../package.json', import.meta.url)
).toString()

updateNotifier({ pkg: JSON.parse(packageJson) }).notify({
  isGlobal: true
})

const cli = meow(
  `
  Usage
    $ gitmoji [option] [command]
  Options
    --${FLAGS.COMMIT}, -c    Interactively commit using the prompts
    --${FLAGS.CONFIG}, -g    Setup gitmoji-cli preferences.
    --${FLAGS.INIT}, -i      Initialize gitmoji as a commit hook
    --${FLAGS.LIST}, -l      List all the available gitmojis
    --${FLAGS.REMOVE}, -r    Remove a previously initialized commit hook
    --${FLAGS.SEARCH}, -s    Search gitmojis
    --${FLAGS.UPDATE}, -u    Sync emoji list with the repo
    --${FLAGS.VERSION}, -v   Print gitmoji-cli installed version
  Commands
    commit          Interactively commit using the prompts
    config          Setup gitmoji-cli preferences.
    init            Initialize gitmoji as a commit hook
    list            List all the available gitmojis
    remove          Remove a previously initialized commit hook
    search          Search gitmojis
    update          Sync emoji list with the repo
  Examples
    $ gitmoji -l
    $ gitmoji bug linter -s
`,
  {
    importMeta: { url: import.meta.url } as ImportMeta,
    flags: {
      [FLAGS.COMMIT]: { type: 'boolean', shortFlag: 'c' },
      [FLAGS.CONFIG]: { type: 'boolean', shortFlag: 'g' },
      [FLAGS.HELP]: { type: 'boolean', shortFlag: 'h' },
      [FLAGS.INIT]: { type: 'boolean', shortFlag: 'i' },
      [FLAGS.LIST]: { type: 'boolean', shortFlag: 'l' },
      [FLAGS.REMOVE]: { type: 'boolean', shortFlag: 'r' },
      [FLAGS.SEARCH]: { type: 'boolean', shortFlag: 's' },
      [FLAGS.UPDATE]: { type: 'boolean', shortFlag: 'u' },
      [FLAGS.VERSION]: { type: 'boolean', shortFlag: 'v' }
    }
  }
)

export const options = {
  [FLAGS.COMMIT]: async (options: CommitOptions) =>
    await (await import('@commands/commit')).default(options),
  [FLAGS.CONFIG]: async () =>
    await (await import('@commands/config')).default(),
  [FLAGS.HOOK]: async (options: CommitOptions) =>
    await (await import('@commands/commit')).default(options),
  [FLAGS.INIT]: async () =>
    await (await import('@commands/hook')).default.create(),
  [FLAGS.LIST]: async () => await (await import('@commands/list')).default(),
  [FLAGS.REMOVE]: async () =>
    await (await import('@commands/hook')).default.remove(),
  [FLAGS.SEARCH]: async (options: SearchOptions) =>
    await (await import('@commands/search')).default(options),
  [FLAGS.UPDATE]: async () => await (await import('@commands/update')).default()
}

findGitmojiCommand(cli, options)
