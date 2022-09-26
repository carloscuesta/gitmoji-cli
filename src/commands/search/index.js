// @flow
import filterGitmojis from '@utils/filterGitmojis.js'
import getEmojis from '@utils/getEmojis.js'
import printEmojis from '@utils/printEmojis.js'

const search = (query: string): Promise<void> => {
  return getEmojis()
    .then((gitmojis) => filterGitmojis(query, gitmojis))
    .then((gitmojisFiltered) => printEmojis(gitmojisFiltered))
    .catch((err) => console.error(err))
}

export default search
