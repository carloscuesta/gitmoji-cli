#!/usr/bin/env node
'use strict'

const meow = require('meow')
const axios = require('axios')
const updateNotifier = require('update-notifier')
const GitmojiCli = require('./src/gitmoji.js')
const pkg = require('./package.json')

updateNotifier({pkg}).notify()

const cli = meow(`
  Usage
    $ gitmoji
  Options
    --init, -i      Initialize gitmoji as a commit hook
    --remove, -r    Remove a previously initialized commit hook
    --config, -g    Setup gitmoji-cli preferences.
    --commit, -c    Interactively commit using the prompts
    --list, -l      List all the available gitmojis
    --search, -s    Search gitmojis
    --version, -v   Print gitmoji-cli installed version
    --update, -u    Sync emoji list with the repo
  Examples
    $ gitmoji -l
    $ gitmoji bug linter -s
`, {
  alias: {
    i: 'init',
    r: 'remove',
    c: 'commit',
    l: 'list',
    s: 'search',
    h: 'help',
    v: 'version',
    u: 'update',
    g: 'config'
  }
})

const gitmojiApiClient = axios.create({
  baseURL: 'https://raw.githubusercontent.com/carloscuesta/gitmoji/master',
  timeout: 5000,
  headers: {},
  params: {}
})

const gitmojiCli = new GitmojiCli(gitmojiApiClient)

const commands = {
  list: () => gitmojiCli.list(),
  config: () => gitmojiCli.config(),
  search: () => cli.input.map(element => gitmojiCli.search(element)),
  init: () => gitmojiCli.init(),
  remove: () => gitmojiCli.remove(),
  hook: () => gitmojiCli.ask('hook'),
  version: () => console.log(gitmojiCli.version(pkg.version)),
  commit: () => gitmojiCli.ask('client'),
  update: () => gitmojiCli.updateCache(),
  undefined: () => {
    if (process.argv[2] === '--hook') return gitmojiCli.ask('hook')
    return gitmojiCli.ask('client')
  }
}

const arg = Object.keys(cli.flags)[1]
if (commands[arg]) {
  commands[arg]()
} else {
  cli.showHelp()
}
