'use strict';

const chalk = require('chalk');

class GitmojiCli {

	constructor(gitmojiApiClient, gitmojis) {
		this._gitmojiApiClient = gitmojiApiClient;
		this._gitmojis = gitmojis;
	}

	list() {
		return this._gitmojiApiClient.request({
			method: 'GET',
			url: '/src/data/gitmojis.json'
		}).then(res => res.data.gitmojis)
			.then(gitmojis => this._parseGitmojis(gitmojis))
			.catch(err => {
				console.error(chalk.red(`ERROR: gitmoji list not found - ${err.code}`));
			});
	}

	search(name) {
		return this._gitmojiApiClient.request({
			method: 'GET',
			url: '/src/data/gitmojis.json'
		}).then(res => res.data.gitmojis)
			.then(gitmojis => gitmojis.filter(gitmoji => gitmoji.name.concat(gitmoji.description).indexOf(name) !== -1))
			.then(gitmojisFiltered => this._parseGitmojis(gitmojisFiltered));
	}

	_parseGitmojis(gitmojis) {
		return gitmojis.map(gitmoji => {
			console.log(`${gitmoji.emoji}  - ${chalk.blue(gitmoji.code)} - ${gitmoji.description}`);
		});
	}
}

module.exports = GitmojiCli;
