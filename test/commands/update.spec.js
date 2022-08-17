import getEmojis from '@utils/getEmojis'
import printEmojis from '@utils/printEmojis'
import update from '@commands/update'

import * as stubs from './stubs'

jest.mock('@utils/getEmojis')
jest.mock('@utils/printEmojis')

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
