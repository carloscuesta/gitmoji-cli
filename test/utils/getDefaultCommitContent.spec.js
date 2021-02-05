import fs from 'fs'
import getDefaultCommitContent from '../../src/utils/getDefaultCommitContent'
import configurationVault from '../../src/utils/configurationVault'
import { EMOJI_COMMIT_FORMATS } from '../../src/commands/config/prompts'

jest.mock('../../src/utils/configurationVault')

describe('getDefaultCommitContent', () => {
  describe('when file exists', () => {
    beforeAll(() => {
      fs.existsSync.mockImplementation(() => true)
    })

    describe('without gitmoji on the title', () => {
      beforeAll(() => {
        fs.readFileSync.mockReturnValueOnce({
          toString: () => 'commit title\n\ncommit message'
        })
      })

      it('should retrieve gitmoji, title and message in hook mode', () => {
        const { title, message } = getDefaultCommitContent('hook')

        expect(title).toBe('commit title')
        expect(message).toBe('commit message')
      })

      it('should retrieve null title and message in client mode', () => {
        const { gitmoji, title, message } = getDefaultCommitContent('client')

        expect(gitmoji).toBe(null)
        expect(title).toBe(null)
        expect(message).toBe(null)
      })
    })

    describe('with gitmoji', () => {
      it('should retrieve code gitmoji, title and message', () => {
        configurationVault.getEmojiFormat.mockReturnValue(
          EMOJI_COMMIT_FORMATS.CODE
        )
        fs.readFileSync.mockReturnValueOnce({
          toString: () => ':sparkles: commit title\n\ncommit message'
        })
        const { gitmoji, title, message } = getDefaultCommitContent('hook')

        expect(gitmoji).toBe(':sparkles:')
        expect(title).toBe('commit title')
        expect(message).toBe('commit message')
      })

      it('should retrieve symbol gitmoji, title and message', () => {
        configurationVault.getEmojiFormat.mockReturnValue(
          EMOJI_COMMIT_FORMATS.EMOJI
        )
        fs.readFileSync.mockReturnValueOnce({
          toString: () => '✨ commit title\n\ncommit message'
        })
        const { gitmoji, title, message } = getDefaultCommitContent('hook')

        expect(gitmoji).toBe('✨')
        expect(title).toBe('commit title')
        expect(message).toBe('commit message')
      })
    })
  })

  describe('when file does not exist', () => {
    beforeAll(() => {
      fs.existsSync.mockImplementation(() => false)
    })

    it('should retrieve null title and message', () => {
      const { title, message } = getDefaultCommitContent('hook')

      expect(title).toBe(null)
      expect(message).toBe(null)
    })
  })
})
