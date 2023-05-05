import fetchMock from 'jest-fetch-mock'

jest.setMock('node-fetch', fetchMock)
jest.mock('path-exists')
jest.mock('fs')
jest
  .requireMock('fs')
  .readFileSync.mockImplementation(jest.requireActual('fs').readFileSync)
jest.mock('ora', () =>
  jest.fn().mockReturnValue({
    start: jest.fn(function () {
      return this
    }),
    succeed: jest.fn(),
    fail: jest.fn()
  })
)
jest.mock('conf')
jest.mock('inquirer')
jest.mock('execa')
jest.mock('meow', () =>
  jest.fn().mockReturnValue({
    flags: {},
    showHelp: jest.fn(),
    input: ['testSearchQuery']
  })
)
jest.mock('update-notifier', () =>
  jest.fn().mockReturnValue({
    notify: jest.fn()
  })
)
jest.mock('@dqbd/tiktoken', () => {
  return {
    encoding_for_model: jest.fn().mockReturnValue({
      encode: jest.fn().mockReturnValue('testToken'),
      free: jest.fn()
    })
  }
})
