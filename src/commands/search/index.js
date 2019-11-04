// @flow
import getEmojis from '../../utils/getEmojis'
import printEmojis from '../../utils/printEmojis'

const search = (query: string) => {
  console.log('query', query)
  return getEmojis()
    .then((gitmojis) => {
      return gitmojis.filter((gitmoji) => {
        const emoji = gitmoji.name.concat(gitmoji.description).toLowerCase()
        return emoji.indexOf(query.toLowerCase()) !== -1
      })
    })
    .then((gitmojisFiltered) => printEmojis(gitmojisFiltered))
    .catch((err) => console.error(err))
}

export default search
