// @flow
import Fuse from 'fuse.js'

import { type Gitmoji } from '../commands/commit/prompts'

const options = {
  keys: [
    {
      name: 'name',
      weight: 0.5
    },
    {
      name: 'description',
      weight: 1
    }
  ]
}

const filterGitmojis = (input: ?string, gitmojis: Array<Gitmoji>) => {
  const fuse = new Fuse(gitmojis, options)
  return input ? fuse.search(input) : gitmojis
}

export default filterGitmojis
