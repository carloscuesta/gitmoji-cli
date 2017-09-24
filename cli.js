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
  alias: {
    c: 'commit',
    g: 'config',
    h: 'help',
    i: 'init',
    l: 'list',
    r: 'remove',
    s: 'search',
    u: 'update',
    v: 'version'
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
  update: () => gitmojiCli.updateCache(),
  version: () => console.log(gitmojiCli.version(pkg.version))
}

const command = Object.keys(cli.flags).filter((flag) => options[flag])
options[command] ? options[command]() : cli.showHelp()
