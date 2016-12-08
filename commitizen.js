const GitmojiCli = require('./src/gitmoji');
const gitmojiApiClient = require('./src/api-client');

function czEngine() {
	const apiClient = gitmojiApiClient('https://raw.githubusercontent.com/carloscuesta/gitmoji/master');
	const gitmojiCli = new GitmojiCli(apiClient);

	return {
		prompter(cz, commit) {
			gitmojiCli._fetchEmojis().then(gitmojis => {
				const questions = gitmojiCli._questions(gitmojis);
				return cz.prompt(questions);
			})
			.then(answers => {
				const commitTitle = gitmojiCli._commitTitle(answers);
				const commitBody = gitmojiCli._commitBody(answers);
				const args = gitmojiCli._isCommitSigned(answers.signed);

				commit(`${commitTitle}\n${commitBody}`, {args});
			});
		}
	};
}

module.exports = czEngine();
