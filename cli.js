#!/usr/bin/env node
'use strict';

const meow = require('meow');
const updateNotifier = require('update-notifier');
const GitmojiCli = require('./src/gitmoji');
const gitmojiApiClient = require('./src/api-client');
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
		--update, -u	Sync emoji list with the repo
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
		v: 'version',
		u: 'update'
	}
});

const apiClient = gitmojiApiClient('https://raw.githubusercontent.com/carloscuesta/gitmoji/master');
const gitmojiCli = new GitmojiCli(apiClient);

const commands = {
	list: () => gitmojiCli.list(),
	search: () => cli.input.map(element => gitmojiCli.search(element)),
	init: () => gitmojiCli.init(),
	hook: () => gitmojiCli.ask('hook'),
	version: () => console.log(gitmojiCli.version(pkg.version)),
	commit: () => gitmojiCli.ask('client'),
	update: () => gitmojiCli.updateCache(),
	undefined: () => {
		if (process.argv[2] === '--hook') {
			gitmojiCli.ask('hook');
		} else {
			gitmojiCli.ask('client');
		}
	}
};

const arg = Object.keys(cli.flags)[1];
if (commands[arg]) {
	commands[arg]();
} else {
	cli.showHelp();
}
