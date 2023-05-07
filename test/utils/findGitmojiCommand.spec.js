import findGitmojiCommand from '../../src/utils/findGitmojiCommand'
import FLAGS from '../../src/constants/flags'
import COMMIT_MODES from '../../src/constants/commit'
import * as stubs from './stubs'

describe('findGitmojiCommand', () => {
  describe('with option', () => {
    test.each(stubs.commands)('it should match %s option', (command) => {
      findGitmojiCommand(stubs.cliMock({ [command]: true }), stubs.optionsMock)
      expect(stubs.optionsMock[command]).toHaveBeenCalled()
    })
  })

  describe('with command', () => {
    test.each(stubs.commands)('it should match %s command', (command) => {
      findGitmojiCommand(stubs.cliMock({}, [command]), stubs.optionsMock)
      expect(stubs.optionsMock[command]).toHaveBeenCalled()
    })
  })

  describe('with specific command', () => {
    test.each([FLAGS.COMMIT, FLAGS.HOOK])(
      'it should have been called with',
      (command) => {
        findGitmojiCommand(
          stubs.cliMock({ [command]: true }),
          stubs.optionsMock
        )
        expect(stubs.optionsMock[command]).toHaveBeenCalledWith({
          mode:
            command === FLAGS.HOOK ? COMMIT_MODES.HOOK : COMMIT_MODES.CLIENT,
          message: undefined,
          scope: undefined,
          title: undefined
        })
      }
    )

    it('should exclude subcommand from search query', () => {
      findGitmojiCommand(
        stubs.cliMock({}, [FLAGS.SEARCH, stubs.searchQuery]),
        stubs.optionsMock
      )
      expect(stubs.optionsMock.search).toHaveBeenCalledWith({
        query: [stubs.searchQuery]
      })
    })
  })
})
