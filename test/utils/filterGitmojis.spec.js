import filterGitmojis, { options } from '../../src/utils/filterGitmojis'
import * as stubs from './stubs'

describe('filterGitmojis', () => {
  it('should find all gitmojis with empty input', () => {
    const filteredGitmojis = filterGitmojis(undefined, stubs.gitmojis)

    expect(filteredGitmojis).toStrictEqual(stubs.gitmojis)
  })

  it('should should find the `Updating tests.` gitmoji first', () => {
    const filteredGitmojis = filterGitmojis('test', stubs.gitmojis)

    const gitmoji = stubs.gitmojis.find(
      (gitmoji) => gitmoji.name === 'white-check-mark'
    )
    expect(filteredGitmojis[0]).toStrictEqual(gitmoji)
  })

  it('should should find the `Introducing new features.` gitmoji first', () => {
    const filteredGitmojis = filterGitmojis('fea', stubs.gitmojis)

    const gitmoji = stubs.gitmojis.find(
      (gitmoji) => gitmoji.name === 'sparkles'
    )
    expect(filteredGitmojis[0]).toStrictEqual(gitmoji)
  })

  it('should should find the `Updating code due to external API changes.` gitmoji first', () => {
    const filteredGitmojis = filterGitmojis('alian', stubs.gitmojis)

    const gitmoji = stubs.gitmojis.find((gitmoji) => gitmoji.name === 'alien')
    expect(filteredGitmojis[0]).toStrictEqual(gitmoji)
  })

  it('should match a list of filteredGitmojis', () => {
    const filteredGitmojis = filterGitmojis('bug', stubs.gitmojis)

    expect(filteredGitmojis).toMatchSnapshot()
  })

  it('should not have a total weight of greater than 1', () => {
    const weightSum = options.keys.reduce(
      (carry, key) => (carry += key.weight),
      0
    )

    expect(weightSum).toBeLessThanOrEqual(1)
  })
})
