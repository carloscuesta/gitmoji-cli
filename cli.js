#!/usr/bin/env node
'use strict';

const meow = require('meow');
const axios = require('axios');
const updateNotifier = require('update-notifier');
const GitmojiCli = require('./src/gitmoji.js');
const pkg = require('./package.json');

updateNotifier({pkg}).notify();

const cli = meow(`
	Usage
	  $ gitmoji
	Options
		--init, -i	Initialize gitmoji as a commit hook
		--commit, -c Interactively commit using the prompts
		--list, -l  List all the available gitmojis
		--search, -s	Search gitmojis
		--version, -v	Print gitmoji-cli installed version
	Examples
		$ gitmoji -l
		$ gitmoji bug linter -s
`, {
	alias: {
		i: 'init',
		c: 'commit',
		l: 'list',
		s: 'search',
		h: 'help',
		v: 'version'
	}
});

const gitmojiApiClient = axios.create({
	baseURL: 'https://raw.githubusercontent.com/carloscuesta/gitmoji/master',
	timeout: 5000,
	headers: {},
	params: {}
});

const gitmojiCli = new GitmojiCli(gitmojiApiClient);

const commands = {
	list: () => gitmojiCli.list(),
	search: () => cli.input.map(element => gitmojiCli.search(element)),
	init: () => gitmojiCli.init(),
	hook: () => gitmojiCli.ask('hook'),
	version: () => console.log(gitmojiCli.version(pkg.version)),
	commit: () => gitmojiCli.ask('client')
};

const arg = Object.keys(cli.flags)[1];
if (arg) {
	commands[arg]();
}
