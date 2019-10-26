// @flow
import getEmojis from '../../utils/getEmojis'
import printEmojis from '../../utils/printEmojis'

const update = () => {
  return getEmojis(true)
    .then((gitmojis) => printEmojis(gitmojis))
    .catch((err) => console.error(err))
}

export default update
