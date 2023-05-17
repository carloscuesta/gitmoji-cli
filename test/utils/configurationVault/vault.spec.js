import configurationVault from '@utils/configurationVault'
import getConfiguration from '@utils/configurationVault/getConfiguration'
import { CONFIG, EMOJI_COMMIT_FORMATS } from '@constants/configuration'

jest.mock('@utils/configurationVault/getConfiguration', () =>
  jest.fn().mockReturnValue({
    set: jest.fn(),
    get: jest.fn()
  })
)

describe('index > vault', () => {
  describe('setter and getters', () => {
    it('should set and return value for autoAdd', () => {
      configurationVault.setAutoAdd(true)
      configurationVault.getAutoAdd()

      expect(getConfiguration().set).toHaveBeenCalledWith(CONFIG.AUTO_ADD, true)
      expect(getConfiguration().get).toHaveBeenCalledWith(CONFIG.AUTO_ADD)
    })

    it('should set and return value for emojiFormat', () => {
      configurationVault.setEmojiFormat('emoji')
      configurationVault.getEmojiFormat()

      expect(getConfiguration().set).toHaveBeenCalledWith(
        CONFIG.EMOJI_FORMAT,
        EMOJI_COMMIT_FORMATS.EMOJI
      )
      expect(getConfiguration().get).toHaveBeenCalledWith(CONFIG.EMOJI_FORMAT)
    })

    it('should set and return value for scopePrompt', () => {
      configurationVault.setScopePrompt(true)
      configurationVault.getScopePrompt()

      expect(getConfiguration().set).toHaveBeenCalledWith(
        CONFIG.SCOPE_PROMPT,
        true
      )
      expect(getConfiguration().get).toHaveBeenCalledWith(CONFIG.SCOPE_PROMPT)
    })

    it('should set and return value for storyIdPrompt', () => {
      configurationVault.setStoryIdPrompt(true)
      configurationVault.getStoryIdPrompt()

      expect(getConfiguration().set).toHaveBeenCalledWith(
        CONFIG.STORYID_PROMPT,
        true
      )
      expect(getConfiguration().get).toHaveBeenCalledWith(CONFIG.STORYID_PROMPT)
    })

    it('should set and return value for messagePrompt', () => {
      configurationVault.setMessagePrompt(false)
      configurationVault.getMessagePrompt()

      expect(getConfiguration().set).toHaveBeenCalledWith(
        CONFIG.MESSAGE_PROMPT,
        false
      )
      expect(getConfiguration().get).toHaveBeenCalledWith(CONFIG.MESSAGE_PROMPT)
    })

    it('should set and return value for capitalizeTitle', () => {
      configurationVault.setCapitalizeTitle(false)
      configurationVault.getCapitalizeTitle()

      expect(getConfiguration().set).toHaveBeenCalledWith(
        CONFIG.CAPITALIZE_TITLE,
        false
      )
      expect(getConfiguration().get).toHaveBeenCalledWith(
        CONFIG.CAPITALIZE_TITLE
      )
    })

    it('should set and return value for gitmojisUrl', () => {
      const testGitmojisUrl =
        'https://raw.githubusercontent.com/carloscuesta/gitmoji/master/src/data/gitmojis.json'
      configurationVault.setGitmojisUrl(testGitmojisUrl)
      configurationVault.getGitmojisUrl()

      expect(getConfiguration().set).toHaveBeenCalledWith(
        CONFIG.GITMOJIS_URL,
        testGitmojisUrl
      )
      expect(getConfiguration().get).toHaveBeenCalledWith(CONFIG.GITMOJIS_URL)
    })
  })
})
