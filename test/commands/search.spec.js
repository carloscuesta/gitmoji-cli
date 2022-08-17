import getEmojis from '@utils/getEmojis'
import printEmojis from '@utils/printEmojis'
import search from '@commands/search'

import * as stubs from './stubs'

jest.mock('@utils/getEmojis')
jest.mock('@utils/printEmojis')

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
