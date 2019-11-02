import printEmojis from '../../src/utils/printEmojis'
import * as stubs from './stubs'

describe('printEmojis', () => {
  beforeAll(() => {
    console.log = jest.fn()
  })

  it('should call console.log forEach gitmoji', () => {
    printEmojis(stubs.gitmojis)

    expect(console.log).toHaveBeenCalledWith(expect.any(String))
  })
})
