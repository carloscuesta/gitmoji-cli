import Conf from 'conf'

import { CONFIG, EMOJI_COMMIT_FORMATS } from '@constants/configuration'
import getConfiguration from '@utils/configurationVault/getConfiguration'

jest.mock('conf')

describe('getConfiguration', () => {
  describe('setup', () => {
    it('should create the `config` object', () => {
      expect(Conf).toHaveBeenCalledWith({
        projectName: 'gitmoji',
        schema: {
          [CONFIG.AUTO_ADD]: { type: 'boolean' },
          [CONFIG.EMOJI_FORMAT]: {
            enum: Object.values(EMOJI_COMMIT_FORMATS)
          },
          [CONFIG.SCOPE_PROMPT]: { type: 'boolean' },
          [CONFIG.GITMOJIS_URL]: { type: 'string', format: 'url' }
        }
      })
    })
  })
})