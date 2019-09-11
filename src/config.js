const Conf = require('conf')

const constants = require('./constants')
const config = new Conf()

const getAutoAdd = () => config.get(constants.AUTO_ADD)
const getEmojiFormat = () => config.get(constants.EMOJI_FORMAT)
const getSignedCommit = () => config.get(constants.SIGNED_COMMIT)
const setAutoAdd = (autoAdd) => config.set(constants.AUTO_ADD, autoAdd)
const setEmojiFormat = (emojiFormat) => {
  config.set(constants.EMOJI_FORMAT, emojiFormat)
}
const setSignedCommit = (signedCommit) => {
  config.set(constants.SIGNED_COMMIT, signedCommit)
}

module.exports = {
  getAutoAdd,
  getEmojiFormat,
  getSignedCommit,
  setAutoAdd,
  setEmojiFormat,
  setSignedCommit
}
