import getEmojis from '../../src/utils/getEmojis'
import printEmojis from '../../src/utils/printEmojis'
import search from '../../src/commands/search'

import * as stubs from './stubs'

jest.mock('../../src/utils/getEmojis')
jest.mock('../../src/utils/printEmojis')

describe('search command', () => {
  beforeAll(() => {
    console.log = jest.fn()
    getEmojis.mockResolvedValue(stubs.gitmojis)
    search(stubs.searchQuery)
  })

  it('should call getEmojis', () => {
    expect(getEmojis).toHaveBeenCalled()
  })

  it('should call printEmojis', () => {
    expect(printEmojis).toHaveBeenCalledWith([stubs.gitmojis[0]])
  })
})
