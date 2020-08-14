// @flow
import Fuse from 'fuse.js'

import { type Gitmoji } from '../commands/commit/prompts'

export const options = {
  threshold: 0.5,
  keys: [
    {
      name: 'name',
      weight: 0.33
    },
    {
      name: 'description',
      weight: 0.67
    }
  ]
}

const filterGitmojis = (input: ?string, gitmojis: Array<Gitmoji>) => {
  const fuse = new Fuse(gitmojis, options)

  return input ? fuse.search(input).map((gitmoji) => gitmoji.item) : gitmojis
}

export default filterGitmojis
