import commands from '@commands'

describe('commands', () => {
  it('should match commands', () => {
    expect(commands).toMatchSnapshot()
  })
})
