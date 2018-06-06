const Conf = require('conf')

const constants = require('./constants')
const config = new Conf()

const getAutoAdd = () => config.get(constants.AUTO_ADD)
const getEmojiFormat = () => config.get(constants.EMOJI_FORMAT)
const getIssueFormat = () => config.get(constants.ISSUE_FORMAT)
const getSignedCommit = () => config.get(constants.SIGNED_COMMIT)
const getSignedOffCommit = () => config.get(constants.SIGNED_OFF_COMMIT)
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
const setSignedOffCommit = (signedOffCommit) => {
  config.set(constants.SIGNED_OFF_COMMIT, signedOffCommit)
}

module.exports = {
  getAutoAdd,
  getEmojiFormat,
  getIssueFormat,
  getSignedCommit,
  getSignedOffCommit,
  setAutoAdd,
  setEmojiFormat,
  setIssueFormat,
  setSignedCommit,
  setSignedOffCommit
}
