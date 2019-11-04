import getEmojis from '../../src/utils/getEmojis'
import printEmojis from '../../src/utils/printEmojis'
import list from '../../src/commands/list'

import * as stubs from './stubs'

jest.mock('../../src/utils/getEmojis')
jest.mock('../../src/utils/printEmojis')

describe('list command', () => {
  beforeAll(() => {
    console.log = jest.fn()
    getEmojis.mockResolvedValue(stubs.gitmojis)
    list()
  })

  it('should call getEmojis', () => {
    expect(getEmojis).toHaveBeenCalled()
  })

  it('should call printEmojis', () => {
    expect(printEmojis).toHaveBeenCalledWith(stubs.gitmojis)
  })
})
