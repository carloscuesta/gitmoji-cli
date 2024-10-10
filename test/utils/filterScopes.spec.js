import { filterScopes } from '../../src/commands/commit/prompts.js'
import * as stubs from './stubs'

describe('filterScopes', () => {
  it('should find all scopes with empty input', () => {
    const filteredGitmojis = filterScopes(undefined, stubs.scopes)

    expect(filteredGitmojis).toStrictEqual(stubs.scopes)
  })

  it('should find the `apps` scope first', () => {
    const filteredGitmojis = filterScopes('apps', stubs.scopes)

    const scope = stubs.scopes.find((scope) => scope === 'apps')
    expect(filteredGitmojis[0]).toStrictEqual(scope)
  })

  it('should find the `toolings/typescript` scope first', () => {
    const filteredGitmojis = filterScopes('toolings/types', stubs.scopes)

    const scope = stubs.scopes.find((scope) => scope === 'toolings/typescript')
    expect(filteredGitmojis[0]).toStrictEqual(scope)
  })

  it('should match a list of filteredScopes', () => {
    const filteredScopes = filterScopes('packages', stubs.scopes)

    expect(filteredScopes).toMatchSnapshot()
  })
})
