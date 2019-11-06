// @flow
import getEmojis from '../../utils/getEmojis'
import printEmojis from '../../utils/printEmojis'

const list = () => getEmojis().then((gitmojis) => printEmojis(gitmojis))

export default list
