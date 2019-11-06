import getEmojis from '../../src/utils/getEmojis'
import printEmojis from '../../src/utils/printEmojis'
import update from '../../src/commands/update'

import * as stubs from './stubs'

jest.mock('../../src/utils/getEmojis')
jest.mock('../../src/utils/printEmojis')

describe('update command', () => {
  beforeAll(() => {
    console.log = jest.fn()
    getEmojis.mockResolvedValue(stubs.gitmojis)
    update()
  })

  it('should call getEmojis', () => {
    expect(getEmojis).toHaveBeenCalledWith(true)
  })

  it('should call printEmojis', () => {
    expect(printEmojis).toHaveBeenCalledWith(stubs.gitmojis)
  })
})
