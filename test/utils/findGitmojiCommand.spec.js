import findGitmojiCommand from '../../src/utils/findGitmojiCommand'
import FLAGS from '../../src/constants/flags'
import COMMIT_MODES from '../../src/constants/commit'
import * as stubs from './stubs'

describe('findGitmojiCommand', () => {
  stubs.commands.map((command) => {
    if ([FLAGS.COMMIT, FLAGS.HOOK].includes(command)) {
      it(`it should match ${command} command`, () => {
        findGitmojiCommand(stubs.cliMock({ [command]: true }), stubs.optionsMock)
        expect(stubs.optionsMock[command]).toHaveBeenCalledWith({
          mode: command === FLAGS.HOOK ? COMMIT_MODES.HOOK : COMMIT_MODES.CLIENT,
          message: undefined,
          scope: undefined,
          title: undefined,
        })
      })
    }

    it(`it should match ${command} command`, () => {
      findGitmojiCommand(stubs.cliMock({ [command]: true }), stubs.optionsMock)
      expect(stubs.optionsMock[command]).toHaveBeenCalled()
    })
  })
})
