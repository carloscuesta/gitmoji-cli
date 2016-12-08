const axios = require('axios');

module.exports = gitmojiApiClient;

function gitmojiApiClient(baseURL) {
	return axios.create({
		baseURL,
		timeout: 5000,
		headers: {},
		params: {}
	});
}
