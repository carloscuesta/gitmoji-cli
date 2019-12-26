import filterGitmojis from '../../src/utils/filterGitmojis'
import * as stubs from './stubs'

describe('filterGirmojis', () => {
  it('should find all gitmojis with empty input', () => {
    const filteredGitmojis = filterGitmojis(undefined, stubs.gitmojis)

    expect(filteredGitmojis).toStrictEqual(stubs.gitmojis)
  })

  it('should should find heart gitmoji', () => {
    const filteredGitmojis = filterGitmojis('hart', stubs.gitmojis)

    expect(filteredGitmojis[0]).toStrictEqual(stubs.gitmojis[0])
  })
})
