import findGitmojiCommand from '../../src/utils/findGitmojiCommand'
import * as stubs from './stubs'

describe('findGitmojiCommand', () => {
  stubs.commands.map((command) => {
    it(`it should match ${command} command`, () => {
      findGitmojiCommand(stubs.cliMock({ [command]: true }), stubs.optionsMock)
      expect(stubs.optionsMock[command]).toHaveBeenCalled()
    })
  })
})
