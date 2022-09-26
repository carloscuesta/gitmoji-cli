// @flow
import getEmojis from '@utils/getEmojis.js'
import printEmojis from '@utils/printEmojis.js'

const update = (): Promise<void> =>
  getEmojis(true).then((gitmojis) => printEmojis(gitmojis))

export default update
