import getEmojis from '@utils/getEmojis.js'
import printEmojis from '@utils/printEmojis.js'
import list from '@commands/list'

import * as stubs from './stubs'

jest.mock('@utils/getEmojis')
jest.mock('@utils/printEmojis')

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
