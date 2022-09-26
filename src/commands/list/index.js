// @flow
import getEmojis from '@utils/getEmojis.js'
import printEmojis from '@utils/printEmojis.js'

const list = (): Promise<void> =>
  getEmojis().then((gitmojis) => printEmojis(gitmojis))

export default list
