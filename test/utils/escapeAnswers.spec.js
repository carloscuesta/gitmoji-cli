import escapeAnswers from '../../src/utils/escapeAnswers'
import * as stubs from './stubs'

describe('escapeAnswers', () => {
  it(`it should escape the answers`, () => {
    escapeAnswers(stubs.answers)
    expect(stubs.answers).toMatchSnapshot()
  })
})
