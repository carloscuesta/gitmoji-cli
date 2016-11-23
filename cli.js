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
	Examples
		$ gitmoji -l
		$ gitmoji bug linter -s
`, {
	alias: {
		i: 'init',
		c: 'commit',
		l: 'list',
		s: 'search',
		h: 'help'
	}
});

const gitmojiApiClient = axios.create({
	baseURL: 'https://raw.githubusercontent.com/carloscuesta/gitmoji/master',
	timeout: 5000,
	headers: {},
	params: {}
});

const gitmojiCli = new GitmojiCli(gitmojiApiClient);

if (cli.flags.list) {
	gitmojiCli.list();
}

if (cli.flags.search) {
	cli.input.map(element => {
		return gitmojiCli.search(element);
	});
}

if (cli.flags.commit) {
	gitmojiCli.ask('client');
}

if (cli.flags.init) {
	gitmojiCli.init();
}

if (cli.flags.hook) {
	gitmojiCli.ask('hook');
}
