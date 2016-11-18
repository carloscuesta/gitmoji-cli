#!/usr/bin/env node
'use strict';

const meow = require('meow');
const axios = require('axios');
const GitmojiCli = require('./src/gitmoji.js');

const cli = meow(`
	Usage
	  $ gitmoji
	Options
		--init, -i	Create and initialize the gitmoji commit hook
		--list, -l  List all the available gitmojis
		--search, -s	Search gitmojis
	Examples
		$ gitmoji -l
		$ gitmoji bug linter -s
`, {
	alias: {
		i: 'init',
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
	gitmojiCli.ask();
}
