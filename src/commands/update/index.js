// @flow
import getEmojis from '../../utils/getEmojis'
import printEmojis from '../../utils/printEmojis'

const update = (): Promise<void> =>
  getEmojis(true).then((gitmojis) => printEmojis(gitmojis))

export default update
