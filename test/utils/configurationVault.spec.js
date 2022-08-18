import Conf from 'conf'
import configurationVault, { config, GITMOJIS_URL } from '../../src/utils/configurationVault'
import {
  CONFIGURATION_PROMPT_NAMES,
  EMOJI_COMMIT_FORMATS
} from '../../src/commands/config/prompts'


jest.createMockFromModule('conf')

describe('configurationVault', () => {
  it('should match the module', () => {
    expect(configurationVault).toMatchSnapshot()
  })

  describe('setup', () => {
    it('should create the `config` object', () => {
      expect(Conf).toHaveBeenCalledWith({
        projectName: 'gitmoji',
        schema: {
          [CONFIGURATION_PROMPT_NAMES.AUTO_ADD]: { type: 'boolean' },
          [CONFIGURATION_PROMPT_NAMES.EMOJI_FORMAT]: {
            enum: Object.values(EMOJI_COMMIT_FORMATS)
          },
          [CONFIGURATION_PROMPT_NAMES.SCOPE_PROMPT]: { type: 'boolean' },
          [CONFIGURATION_PROMPT_NAMES.GITMOJIS_URL]: { type: 'string', format: 'url' }
        }
      })
    })
  })

  describe('defaults', () => {
    beforeAll(() => {
      config.clear()
    })

    it('should return the default value for autoAdd', () => {
      expect(configurationVault.getAutoAdd()).toEqual(false)
    })

    it('should return the default value for emojiFormat', () => {
      expect(configurationVault.getEmojiFormat()).toEqual('code')
    })

    it('should return the default value for scopePrompt', () => {
      expect(configurationVault.getScopePrompt()).toEqual(false)
    })

    it('should return the default value for gitmojisUrl', () => {
      expect(configurationVault.getGitmojisUrl()).toEqual(GITMOJIS_URL)
    })
  })

  describe('setter and getters', () => {
    beforeAll(() => {
      config.clear()
    })

    beforeEach(() => {
      config.set.mockClear()
      config.get.mockClear()
    })

    it('should set and return value for autoAdd', () => {
      configurationVault.setAutoAdd(true)
      configurationVault.getAutoAdd()

      expect(config.set).toHaveBeenCalledWith(
        CONFIGURATION_PROMPT_NAMES.AUTO_ADD,
        true
      )
      expect(config.get).toHaveBeenCalledWith(
        CONFIGURATION_PROMPT_NAMES.AUTO_ADD
      )
    })

    it('should set and return value for emojiFormat', () => {
      configurationVault.setEmojiFormat('emoji')
      configurationVault.getEmojiFormat()

      expect(config.set).toHaveBeenCalledWith(
        CONFIGURATION_PROMPT_NAMES.EMOJI_FORMAT,
        EMOJI_COMMIT_FORMATS.EMOJI
      )
      expect(config.get).toHaveBeenCalledWith(
        CONFIGURATION_PROMPT_NAMES.EMOJI_FORMAT
      )
    })

    it('should set and return value for scopePrompt', () => {
      configurationVault.setScopePrompt(true)
      configurationVault.getScopePrompt()

      expect(config.set).toHaveBeenCalledWith(
        CONFIGURATION_PROMPT_NAMES.SCOPE_PROMPT,
        true
      )
      expect(config.get).toHaveBeenCalledWith(
        CONFIGURATION_PROMPT_NAMES.SCOPE_PROMPT
      )
    })

    it('should set and return value for gitmojisUrl', () => {
      const testGitmojisUrl = 'https://raw.githubusercontent.com/carloscuesta/gitmoji/master/src/data/gitmojis.json'
      configurationVault.setGitmojisUrl(testGitmojisUrl)
      configurationVault.getGitmojisUrl()

      expect(config.set).toHaveBeenCalledWith(
        CONFIGURATION_PROMPT_NAMES.GITMOJIS_URL,
        testGitmojisUrl
      )
      expect(config.get).toHaveBeenCalledWith(
        CONFIGURATION_PROMPT_NAMES.GITMOJIS_URL
      )
    })
  })
})
