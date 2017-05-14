'use strict';

const meow = require('meow');
const axios = require('axios');
const GitmojiCli = require('./../src/gitmoji.js');
const should = require('should');
const pkg = require('./../package.json');
const Conf = require('conf');

const config = new Conf();

const gitmojiApiClient = axios.create({
	baseURL: 'https://raw.githubusercontent.com/carloscuesta/gitmoji/master',
	timeout: 5000,
	headers: {},
	params: {}
});

const prompts = {
	gitmoji: ':zap:',
	title: 'Improving performance issues.',
	message: 'Refactored code.',
	reference: '5',
	signed: true
};

const promptsForJiraCommit = {
	gitmoji: ':zap:',
	title: 'Improving performance issues.',
	message: 'Refactored code.',
	reference: 'ABC-123',
	signed: true
};

const gitmojiCli = new GitmojiCli(gitmojiApiClient);


describe('gitmoji', function() {

	describe('commit-with-github-format', function() {
		it('should return the formed commit based on the input prompts', function() {
			config.set('issueFormat', 'github');
			gitmojiCli._commit(prompts).should.equal('git commit -S -m ":zap: Improving performance issues." -m "Refactored code. #5"');
		});
	});

	describe('commit-with-jira-format', function() {
		it('should return the formed commit based on the input prompts', function() {
			config.set('issueFormat', 'jira');
			gitmojiCli._commit(promptsForJiraCommit).should.equal('git commit -S -m ":zap: Improving performance issues." -m "Refactored code. ABC-123"');
		});
	});

	describe('init', function() {
		it('path should be set to .git/hooks/prepare-commit-msg', function() {
			gitmojiCli.init().path.should.containEql('.git/hooks/prepare-commit-msg');
		});

		it('prepare-commit-msg should contain the hook script', function() {
			gitmojiCli.init().fileContents.should.containEql('exec < /dev/tty\ngitmoji --hook $1');
		});
	});

	describe('version', function() {
		it('should return the version number equal to the package.json one', function() {
			gitmojiCli.version(pkg.version).should.be.equal(pkg.version);
		});

		it('should return a version number not equal to the package.json', function() {
			gitmojiCli.version(pkg.version).should.not.be.equal('1.0.0');
		});
	});

	describe('_isAGitRepo', function() {
		it('should find a .git repo and return true', function() {
			gitmojiCli._isAGitRepo('.git').should.be.true();
		});

		it('should not find a .git repo and return false', function() {
			gitmojiCli._isAGitRepo('.notagit').should.be.false();
		});
	});

	describe('_isCommitSigned', function() {
		it('should have the signed commit flag "-S"', function() {
			gitmojiCli._isCommitSigned(true).should.equal('-S');
		});

		it('should not have the signed commit flag', function() {
			gitmojiCli._isCommitSigned(false).should.equal('');
		});
	});
});
