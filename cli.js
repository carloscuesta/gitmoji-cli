#!/usr/bin/env node
'use strict'

const meow = require('meow')
const axios = require('axios')
const updateNotifier = require('update-notifier')
const GitmojiCli = require('./src/gitmoji.js')
const pkg = require('./package.json')

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

const gitmojiApiClient = axios.create({
  baseURL: 'https://raw.githubusercontent.com/carloscuesta/gitmoji/master',
  timeout: 5000,
  headers: {},
  params: {}
})

const gitmojiCli = new GitmojiCli(gitmojiApiClient)
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

const command = Object.keys(cli.flags)
  .map((flag) => cli.flags[flag] && flag)
  .filter((flag) => options[flag])
options[command] ? options[command]() : cli.showHelp()
