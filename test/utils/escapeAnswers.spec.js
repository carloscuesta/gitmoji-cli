import escapeAnswers from '../../src/utils/escapeAnswers'
import * as stubs from './stubs'

describe('escapeAnswers', () => {
  it(`it should escape the answers`, () => {
    expect(escapeAnswers(stubs.answers)).toMatchSnapshot()
  })
})
