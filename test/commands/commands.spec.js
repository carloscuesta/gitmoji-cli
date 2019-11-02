import commands from '../../src/commands'

describe('commands', () => {
  it('should match commands', () => {
    expect(commands).toMatchSnapshot()
  })
})
