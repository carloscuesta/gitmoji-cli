const Conf = require('conf')

const constants = require('./constants')
const config = new Conf()

const getAutoAdd = () => config.get(constants.AUTO_ADD)
const getAutoAddOnEmptyStage = () => config.get(constants.AUTO_ADD_ON_EMPTY_STAGE)
const getEmojiFormat = () => config.get(constants.EMOJI_FORMAT)
const getIssueFormat = () => config.get(constants.ISSUE_FORMAT)
const getSignedCommit = () => config.get(constants.SIGNED_COMMIT)
const setAutoAdd = (autoAdd) => config.set(constants.AUTO_ADD, autoAdd)
const setEmojiFormat = (emojiFormat) => {
  config.set(constants.EMOJI_FORMAT, emojiFormat)
}
const setIssueFormat = (issueFormat) => {
  config.set(constants.ISSUE_FORMAT, issueFormat)
}
const setSignedCommit = (signedCommit) => {
  config.set(constants.SIGNED_COMMIT, signedCommit)
}

module.exports = {
  getAutoAdd,
  getAutoAddOnEmptyStage,
  getEmojiFormat,
  getIssueFormat,
  getSignedCommit,
  setAutoAdd,
  setEmojiFormat,
  setIssueFormat,
  setSignedCommit
}
