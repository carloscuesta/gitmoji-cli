// @flow
import getEmojis from '../../utils/getEmojis'
import printEmojis from '../../utils/printEmojis'

const list = () => {
  return getEmojis()
    .then((gitmojis) => printEmojis(gitmojis))
    .catch((err) => console.error(err))
}

export default list
