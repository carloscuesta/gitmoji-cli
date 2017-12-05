#!/usr/bin/env node
const meow = require('meow')
const updateNotifier = require('update-notifier')
const GitmojiCli = require('./src/gitmoji.js')
const pkg = require('./package.json')
const utils = require('./src/utils.js')

updateNotifier({ pkg }).notify()

const cli = meow(`
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
`, {
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
  }
})

const gitmojiCli = new GitmojiCli(utils.gitmojiApiClient)
const options = {
  commit: () => gitmojiCli.ask('client'),
  config: () => gitmojiCli.config(),
  hook: () => gitmojiCli.ask('hook'),
  init: () => gitmojiCli.init(),
  list: () => gitmojiCli.list(),
  remove: () => gitmojiCli.remove(),
  search: () => cli.input.map(element => gitmojiCli.search(element)),
  update: () => gitmojiCli.updateCache()
}

utils.findGitmojiCommand(cli, options)
