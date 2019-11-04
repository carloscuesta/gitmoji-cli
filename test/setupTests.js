import fetchMock from 'jest-fetch-mock'

jest.setMock('node-fetch', fetchMock)
jest.mock('path-exists')
jest.mock('fs')
jest.mock('ora', () =>
  jest.fn().mockReturnValue({
    start: jest.fn(),
    succeed: jest.fn(),
    fail: jest.fn()
  })
)
jest.mock('conf')
