import configurationVault from '../../src/utils/configurationVault'
import getDefaultAnswers from '../../src/utils/getDefaultAnswers'
import * as stubs from './stubs'

jest.mock('../../src/utils/configurationVault')

describe('getDefaultAnswers', () => {
  describe('when skip prompting is disabled', () => {
    beforeAll(() => {
      configurationVault.getSkipPromptingFilledInfo.mockReturnValue(false)
    })

    it('should return empty default answers', () => {
      expect(getDefaultAnswers(stubs.commitContent)).toEqual({})
    })
  })

  describe('when skip prompting is enabled', () => {
    beforeAll(() => {
      configurationVault.getSkipPromptingFilledInfo.mockReturnValue(true)
    })

    it('should return empty default answers', () => {
      expect(getDefaultAnswers({})).toEqual({})
    })

    it('should return all valid answers', () => {
      expect(getDefaultAnswers(stubs.commitContent)).toMatchInlineSnapshot(`
        Object {
          "gitmoji": ":sparkles:",
          "message": "commit message",
          "title": "commit title",
        }
      `)
      expect(
        getDefaultAnswers({
          ...stubs.commitContent,
          message: '` broken message'
        })
      ).toMatchInlineSnapshot(`
        Object {
          "gitmoji": ":sparkles:",
          "title": "commit title",
        }
      `)
    })
  })
})
