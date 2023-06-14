// @flow
import filterGitmojis from '@utils/filterGitmojis'
import getEmojis from '@utils/getEmojis'
import printEmojis from '@utils/printEmojis'

export type SearchOptions = {
  query?: string[]
}

const search = (options: SearchOptions): Promise<void> => {
  return getEmojis()
    .then((gitmojis) => {
      if (!options.query) {
        return printEmojis(gitmojis)
      }

      for (const query of options.query) {
        printEmojis(filterGitmojis(query, gitmojis))
      }
    })
    .catch((err) => console.error(err))
}

export default search
