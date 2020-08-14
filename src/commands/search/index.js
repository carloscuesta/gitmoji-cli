// @flow
import filterGitmojis from '../../utils/filterGitmojis'
import getEmojis from '../../utils/getEmojis'
import printEmojis from '../../utils/printEmojis'

const search = (query: string) => {
  return getEmojis()
    .then((gitmojis) => filterGitmojis(query, gitmojis))
    .then((gitmojisFiltered) => printEmojis(gitmojisFiltered))
    .catch((err) => console.error(err))
}

export default search
