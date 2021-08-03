import fs from 'fs'
import getDefaultCommitContent from '../../src/utils/getDefaultCommitContent'

describe('getDefaultCommitContent', () => {
  describe('when file exists', () => {
    beforeAll(() => {
      fs.existsSync.mockImplementation(() => true)
      fs.readFileSync.mockReturnValueOnce({
        toString: () => 'commit title\n\ncommit message'
      })
    })

    it('should retrieve title and message in hook mode', () => {
      const { title, message } = getDefaultCommitContent({ mode: 'hook' })

      expect(title).toBe('commit title')
      expect(message).toBe('commit message')
    })

    it('should retrieve null title and message in client mode', () => {
      const { title, message } = getDefaultCommitContent({ mode: 'client' })

      expect(title).toBe(null)
      expect(message).toBe(null)
    })
  })

  describe('when file does not exist', () => {
    beforeAll(() => {
      fs.existsSync.mockImplementation(() => false)
    })

    it('should retrieve null title and message', () => {
      const { title, message } = getDefaultCommitContent({ mode: 'hook' })

      expect(title).toBe(null)
      expect(message).toBe(null)
    })
  })
})
