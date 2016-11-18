#!/usr/bin/env node
'use strict';

const meow = require('meow');
const axios = require('axios');

const gitmojis = 'https://raw.githubusercontent.com/carloscuesta/gitmoji/master/src/data/gitmojis.json';

const cli = meow(`
	Usage
	  $ gitmoji

	Options
		--init, -i  Create and initialize the gitmoji commit hook
		--list, -l  Output all the gitmojis
`, {
	alias: {
		i: 'init',
		l: 'list'
	}
});

if (cli.flags.list) {
	axios.get(gitmojis)
		.then(res => {
			const gitmojiList = res.data.gitmojis;

			const gitmojiPrettyList = gitmojiList.map(obj => {
				return `${obj.emoji}  - ${obj.code} - ${obj.description}`;
			});

			console.log(gitmojiPrettyList);
		})
		.catch(err => {
			console.log(err);
		});
}
