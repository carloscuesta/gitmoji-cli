'use strict';

const meow = require('meow');
const axios = require('axios');
const GitmojiCli = require('./../src/gitmoji.js');
const should = require('should');

const gitmojiApiClient = axios.create({
	baseURL: 'https://raw.githubusercontent.com/carloscuesta/gitmoji/master',
	timeout: 5000,
	headers: {},
	params: {}
});

const gitmojiCli = new GitmojiCli(gitmojiApiClient);

describe('gitmoji', function() {
	
	describe('version', function() {
		it('should return a version number and equal to the package.json one', function() {
			gitmojiCli.version(pkg.version).should.be.equal(pkg.version);
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
		it('should have the signed commit flag "-s"', function() {
			gitmojiCli._isCommitSigned(true).should.equal('-s');
		});

		it('should not have the signed commit flag', function() {
			gitmojiCli._isCommitSigned(false).should.equal('');
		});
	});
});
