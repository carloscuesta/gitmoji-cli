import Conf from 'conf'
import { readFileSync } from 'fs'
import { pathExistsSync } from 'path-exists'

import { CONFIG, EMOJI_COMMIT_FORMATS } from '@constants/configuration'
import getConfiguration from '@utils/configurationVault/getConfiguration'

jest.mock('conf', () =>
  jest.fn().mockReturnValue({
    store: { from: 'local-cli' },
    set: jest.fn()
  })
)

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

  describe('get', () => {
    describe('when package.json exists', () => {
      beforeEach(() => {
        jest.resetModules()
      })

      beforeAll(() => {
        pathExistsSync.mockImplementation((path) => {
          return path.includes('package.json')
        })
      })

      describe('when `gitmoji` key is defined', () => {
        beforeAll(() => {
          readFileSync.mockImplementation(() =>
            JSON.stringify({ gitmoji: { from: 'package.json' } })
          )
        })

        it('should return package.json configuration', () => {
          const configuration = getConfiguration()

          expect(configuration.get('from')).toEqual('package.json')
        })
      })

      describe('when `gitmoji` key is not defined', () => {
        beforeAll(() => {
          readFileSync.mockImplementation(() => JSON.stringify({}))
        })

        it('should return local configuration', () => {
          const configuration = getConfiguration()

          expect(configuration.get('from')).toEqual('local-cli')
        })
      })
    })

    describe('when .gitmojirc exists', () => {
      beforeEach(() => {
        jest.resetModules()
      })

      beforeAll(() => {
        pathExistsSync.mockImplementation((path) => {
          return path.includes('.gitmojirc.json')
        })
      })

      describe('when file contains a valid json', () => {
        beforeAll(() => {
          readFileSync.mockImplementation(() => JSON.stringify({ from: 'rc' }))
        })

        it('should return .gitmojirc.json configuration', () => {
          const configuration = getConfiguration()

          expect(configuration.get('from')).toEqual('rc')
        })
      })

      describe('when file is empty', () => {
        beforeAll(() => {
          readFileSync.mockImplementation(() => JSON.stringify(null))
        })

        it('should return .gitmojirc.json configuration', () => {
          const configuration = getConfiguration()

          expect(configuration.get('from')).toEqual('local-cli')
        })
      })
    })

    describe('when package.json and .gitmojirc are not available', () => {
      beforeAll(() => {
        pathExistsSync.mockReturnValue(false)
      })

      it('should return local configuration', () => {
        const configuration = getConfiguration()

        expect(configuration.get('from')).toEqual('local-cli')
      })
    })

    describe('when no configuration is available', () => {
      beforeAll(() => {
        pathExistsSync.mockReturnValue(false)
        Conf().store = undefined
      })

      it('should return the default configuration', () => {
        const configuration = getConfiguration()

        expect(configuration.get('autoAdd')).toEqual(false)
        expect(configuration.get('emojiFormat')).toEqual('code')
        expect(configuration.get('scopePrompt')).toEqual(false)
        expect(configuration.get('gitmojisUrl')).toEqual(
          'https://gitmoji.dev/api/gitmojis'
        )
      })
    })
  })

  describe('set', () => {
    it('should call Conf.set with the key and value', () => {
      const configuration = getConfiguration()

      configuration.set('key', 'value')

      expect(Conf().set).toHaveBeenCalledWith('key', 'value')
    })
  })
})
