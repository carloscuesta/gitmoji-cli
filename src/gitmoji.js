'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const execa = require('execa');
const pathExists = require('path-exists');
const Conf = require('conf');
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

const config = new Conf();

const commitHookPath = `${process.env.PWD}/.git/hooks/prepare-commit-msg`;

class GitmojiCli {

	constructor(gitmojiApiClient, gitmojis) {
		this._gitmojiApiClient = gitmojiApiClient;
		this._gitmojis = gitmojis;
		if (config.get('autoadd') === undefined) {
			config.set('autoadd', true);
		}
		if (config.get('issueFormat') === undefined) {
			config.set('issueFormat', 'github');
		}
		if (config.get('emojiFormat') === undefined) {
			config.set('emojiFormat', 'code');
		}
	}

	config() {
		const questions = [
			{
				name: 'add',
				message: 'Enable automatic "git add ."',
				type: 'confirm'
			},
			{
				name: 'issueFormat',
				message: 'Choose Issue Format',
				type: 'list',
				choices: ['github', 'jira']
			},
			{
				name: 'emojiFormat',
				message: 'Select how emojis should be used in commits',
				type: 'list',
				choices: [{name: ':smile:', value: 'code'}, {name: '😄', value: 'emoji'}]
			}
		];

		inquirer.prompt(questions).then(answers => {
			config.set('autoadd', answers.add);
			config.set('issueFormat', answers.issueFormat);
			config.set('emojiFormat', answers.emojiFormat);
		});
	}

	init() {
		const fileContents = `#!/bin/sh\n# gitmoji as a commit hook\nexec < /dev/tty\ngitmoji --hook $1`;

		if (this._isAGitRepo('.git')) {
			fs.writeFile(commitHookPath, fileContents, {mode: 0o775}, err => {
				if (err) {
					this._errorMessage(err);
				}
				console.log(`${chalk.yellow('gitmoji')} commit hook created successfully.`);
			});
		}

		return {
			commitHookPath,
			fileContents
		};
	}

	remove() {
		if (this._isAGitRepo('.git')) {
			fs.unlink(commitHookPath, err => {
				if (err) {
					this._errorMessage(err);
				} else {
					console.log(`${chalk.yellow('gitmoji')} commit hook unlinked successfully.`);
				}
			});
		}

		return {
			commitHookPath
		};
	}

	version(number) {
		return number;
	}

	list() {
		return this._fetchEmojis()
			.then(gitmojis => this._parseGitmojis(gitmojis))
			.catch(err => this._errorMessage(`gitmoji list not found - ${err.code}`));
	}

	search(name) {
		return this._fetchEmojis()
			.then(gitmojis => gitmojis.filter(gitmoji => gitmoji.name.concat(gitmoji.description).toLowerCase().indexOf(name.toLowerCase()) !== -1))
			.then(gitmojisFiltered => this._parseGitmojis(gitmojisFiltered))
		.catch(err => this._errorMessage(err.code));
	}

	ask(mode) {
		if (this._isAGitRepo('.git')) {
			return this._fetchEmojis()
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

							default:
								this._errorMessage(`Unexpected mode [${mode}]`);
						}
					});
				})
			.catch(err => this._errorMessage(err.code));
		}
		this._errorMessage('This directory is not a git repository.');
	}

	updateCache() {
		this._fetchRemoteEmojis()
			.then(emojis => this._createCache(this._getCachePath(), emojis));
	}

	_errorMessage(message) {
		console.error(chalk.red(`ERROR: ${message}`));
	}

	_hook(answers) {
		const title = `${answers.gitmoji} ${answers.title}`;
		const reference = (answers.reference) ? `#${answers.reference}` : '';
		const body = `${answers.message} ${reference}`;

		fs.writeFileSync(process.argv[3], `${title}\n\n${body}`);
	}

	_commit(answers) {
		const title = `${answers.gitmoji} ${answers.title}`;
		const prefixReference = config.get('issueFormat') === 'github' ? '#' : '';
		const reference = (answers.reference) ? `${prefixReference}${answers.reference}` : '';
		const signed = this._isCommitSigned(answers.signed);
		const body = `${answers.message} ${reference}`;
		const commit = `git commit ${signed} -m "${title}" -m "${body}"`;

		if (this._isAGitRepo('.git')) {
			if (config.get('autoadd')) {
				execa.stdout('git', ['add', '.'])
					.then(res => console.log(chalk.blue(res)))
					.catch(err => this._errorMessage(err.stderr));
			}
			execa.shell(commit)
				.then(res => console.log(chalk.blue(res.stdout)))
				.catch(err => this._errorMessage(err.stderr ? err.stderr : err.stdout));
		}

		return commit;
	}

	_questions(gitmojis) {
		const questions = [
			{
				name: 'gitmoji',
				message: 'Choose a gitmoji:',
				type: 'autocomplete',
				source: (answersSoFor, input) => {
					return Promise.resolve(gitmojis
						.filter(gitmoji => !input || gitmoji.name.concat(gitmoji.description).toLowerCase().indexOf(input.toLowerCase()) !== -1)
						.map(gitmoji => {
							return {
								name: `${gitmoji.emoji}  - ${gitmoji.description}`,
								value: gitmoji[config.get('emojiFormat') || 'code']
							};
						}));
				}
			},
			{
				name: 'title',
				message: 'Enter the commit title:',
				validate(value) {
					if (value === '' || value.includes('`')) {
						return chalk.red('Enter a valid commit title');
					}
					return true;
				}
			},
			{
				name: 'message',
				message: 'Enter the commit message:',
				validate(value) {
					if (value.includes('`')) {
						return chalk.red('Enter a valid commit message');
					}
					return true;
				}
			},
			{
				name: 'reference',
				message: 'Issue / PR reference:',
				validate(value) {
					if (value === '') {
						return true;
					}
					if (value !== null) {
						let validReference = '';
						let errorReference = '';
						switch (config.get('issueFormat')) {
							case 'jira':
								validReference = value.match(/^([A-Z][A-Z0-9]{1,9}-[0-9]+)$/g);
								errorReference = 'Enter the JIRA reference key, such as ABC-123';
								break;
							default:
								validReference = value.match(/(^[1-9][0-9]*)+$/);
								errorReference = 'Enter the number of the reference without the #. Eg: 12';
						}

						if (validReference) {
							return true;
						}
						return chalk.red(errorReference);
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
		return gitmojis.forEach(gitmoji => {
			console.log(`${gitmoji.emoji}  - ${chalk.blue(gitmoji.code)} - ${gitmoji.description}`);
		});
	}

	_isCommitSigned(sign) {
		let signed;

		if (sign) {
			signed = '-S';
		} else {
			signed = '';
		}

		return signed;
	}

	_isAGitRepo(dir) {
		return pathExists.sync(dir);
	}

	_getCachePath() {
		const home = process.env.HOME || process.env.USERPROFILE;
		return path.join(home, '.gitmoji', 'gitmojis.json');
	}

	_cacheAvailable(cachePath) {
		return pathExists.sync(cachePath);
	}

	_createCache(cachePath, emojis) {
		const cacheDir = path.dirname(cachePath);

		if (emojis !== undefined) {
			if (!pathExists.sync(cacheDir)) {
				fs.mkdirSync(cacheDir);
			}
			fs.writeFileSync(cachePath, JSON.stringify(emojis));
		}
	}

	_fetchRemoteEmojis() {
		return this._gitmojiApiClient.request({
			method: 'GET',
			url: '/src/data/gitmojis.json'
		}).then(res => {
			console.log(`${chalk.yellow('Gitmojis')} updated successfully!`);
			return res.data.gitmojis;
		})
		.catch(err => this._errorMessage(`Network connection not found - ${err.code}`));
	}

	_fetchCachedEmojis(cachePath) {
		return Promise.resolve(JSON.parse(fs.readFileSync(cachePath)));
	}

	_fetchEmojis() {
		const cachePath = this._getCachePath();
		if (this._cacheAvailable(cachePath)) {
			return this._fetchCachedEmojis(cachePath);
		}
		return this._fetchRemoteEmojis()
			.then(emojis => {
				this._createCache(cachePath, emojis);
				return emojis;
			});
	}
}

module.exports = GitmojiCli;
