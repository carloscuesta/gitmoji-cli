'use strict';

const fs = require('fs');
const chalk = require('chalk');
const inquirer = require('inquirer');
const execa = require('execa');
const pathExists = require('path-exists');

class GitmojiCli {

	constructor(gitmojiApiClient, gitmojis) {
		this._gitmojiApiClient = gitmojiApiClient;
		this._gitmojis = gitmojis;
	}

	init() {
		const hookFile = 'prepare-commit-msg';
		const path = `${process.env.PWD}/.git/hooks/${hookFile}`;
		const fileContents = `#!/bin/sh\n# gitmoji as a commit hook\nexec < /dev/tty\ngitmoji --hook $1`;

		if (this._isAGitRepo('.git')) {
			fs.writeFile(path, fileContents, {mode: 0o775}, err => {
				if (err) {
					console.error(chalk.red(`ERROR: ${err}`));
				}
				console.log(`${chalk.yellow('gitmoji')} commit hook created succesfully.`);
			});
		}

		return {
			path,
			fileContents
		};
	}

	version(number) {
		return number;
	}

	list() {
		return this._gitmojiApiClient.request({
			method: 'GET',
			url: '/src/data/gitmojis.json'
		}).then(res => res.data.gitmojis)
			.then(gitmojis => this._parseGitmojis(gitmojis))
			.catch(err => console.error(chalk.red(`ERROR: gitmoji list not found - ${err.code}`)));
	}

	search(name) {
		return this._gitmojiApiClient.request({
			method: 'GET',
			url: '/src/data/gitmojis.json'
		}).then(res => res.data.gitmojis)
			.then(gitmojis => gitmojis.filter(gitmoji => gitmoji.name.concat(gitmoji.description).toLowerCase().indexOf(name.toLowerCase()) !== -1))
			.then(gitmojisFiltered => this._parseGitmojis(gitmojisFiltered))
		.catch(err => console.error(chalk.red(`ERROR: ${err.code}`)));
	}

	ask(mode) {
		if (this._isAGitRepo('.git')) {
			return this._gitmojiApiClient.request({
				method: 'GET',
				url: '/src/data/gitmojis.json'
			}).then(res => res.data.gitmojis)
				.then(gitmojis => this._questions(gitmojis))
				.then(questions => {
					inquirer.prompt(questions).then(answers => {
						switch (mode) {
							case 'client':
								this._commit(answers);
								break;

							case 'hook':
								this._hook(answers);
								break;
						}
					});
				})
			.catch(err => console.error(chalk.red(`ERROR: ${err.code}`)));
		}
		console.error(chalk.red('ERROR: This directory is not a git repository.'));
	}

	_hook(answers) {
		const commitTitle = `${answers.gitmoji} ${answers.title}`;
		const reference = (answers.reference) ? `#${answers.reference}` : '';
		const commitBody = `${answers.message} ${reference}`;

		fs.writeFileSync(process.argv[3], `${commitTitle}\n${commitBody}`);
	}

	_commit(answers) {
		const commitTitle = `${answers.gitmoji} ${answers.title}`;
		const reference = (answers.reference) ? `#${answers.reference}` : '';
		const signed = this._isCommitSigned(answers.signed);
		const commitBody = `${answers.message} ${reference}`;

		if (this._isAGitRepo('.git')) {
			execa.stdout('git', ['add', '.'])
				.then(res => console.log(chalk.blue(res)))
				.catch(err => console.error(chalk.red(`ERROR: ${err.stderr}`)));
			execa.shell(`git commit ${signed} -m "${commitTitle}" -m "${commitBody}"`)
				.then(res => console.log(chalk.blue(res.stdout)))
				.catch(err => console.error(chalk.red(`ERROR: ${err.stderr}`)));
		}

		return `git commit ${signed} -m "${commitTitle}" -m "${commitBody}"`;
	}

	_questions(gitmojis) {
		const questions = [
			{
				name: 'gitmoji',
				message: 'Choose a gitmoji:',
				type: 'list',
				choices: gitmojis.map(gitmoji => {
					return {
						name: `${gitmoji.emoji}  - ${gitmoji.description}`,
						value: gitmoji.code
					};
				})
			},
			{
				name: 'title',
				message: 'Enter the commit title:',
				validate(value) {
					if (value === '') {
						return chalk.red('Enter the commit title');
					}
					return true;
				}
			},
			{
				name: 'message',
				message: 'Enter the commit message:'
			},
			{
				name: 'reference',
				message: 'Issue / PR reference #:',
				validate(value) {
					if (value === '') {
						return true;
					}
					if (value !== null) {
						const validReference = value.match(/(^[1-9][0-9]*)+$/);
						if (validReference) {
							return true;
						}
						return chalk.red('Enter the number of the reference without the #. Eg: 12');
					}
				}
			},
			{
				name: 'signed',
				message: 'Signed commit:',
				type: 'confirm'
			}
		];

		return questions;
	}

	_parseGitmojis(gitmojis) {
		return gitmojis.map(gitmoji => {
			console.log(`${gitmoji.emoji}  - ${chalk.blue(gitmoji.code)} - ${gitmoji.description}`);
		});
	}

	_isCommitSigned(sign) {
		let signed;

		if (sign) {
			signed = '-s';
		} else {
			signed = '';
		}

		return signed;
	}

	_isAGitRepo(dir) {
		return pathExists.sync(dir);
	}
}

module.exports = GitmojiCli;
