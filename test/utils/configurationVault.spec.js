import configurationVault, { config } from '../../src/utils/configurationVault'
import {
  CONFIGURATION_PROMPT_NAMES,
  EMOJI_COMMIT_FORMATS
} from '../../src/commands/config/prompts'

describe('configurationVault', () => {
  it('should match the module', () => {
    expect(configurationVault).toMatchSnapshot()
  })

  describe('defaults', () => {
    beforeAll(() => {
      config.clear()
    })

    it('should return the default value for autoAdd', () => {
      expect(configurationVault.getAutoAdd()).toEqual(false)
    })

    it('should return the default value for contacts', () => {
      expect(configurationVault.getContacts()).toEqual('')
    })

    it('should return the default value for emojiFormat', () => {
      expect(configurationVault.getEmojiFormat()).toEqual('code')
    })

    it('should return the default value for signedCommit', () => {
      expect(configurationVault.getSignedCommit()).toEqual(false)
    })

    it('should return the default value for scopePrompt', () => {
      expect(configurationVault.getScopePrompt()).toEqual(false)
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

    it('should set and return value for contacts', () => {
      const newContacts = '@A: A B <a@b.c>'
      configurationVault.setContacts(newContacts)
      configurationVault.getContacts()

      expect(config.set).toHaveBeenCalledWith(
        CONFIGURATION_PROMPT_NAMES.CONTACTS,
        newContacts
      )
      expect(config.get).toHaveBeenCalledWith(
        CONFIGURATION_PROMPT_NAMES.CONTACTS
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

    it('should set and return value for signedCommit', () => {
      configurationVault.setSignedCommit(true)
      configurationVault.getSignedCommit()

      expect(config.set).toHaveBeenCalledWith(
        CONFIGURATION_PROMPT_NAMES.SIGNED_COMMIT,
        true
      )
      expect(config.get).toHaveBeenCalledWith(
        CONFIGURATION_PROMPT_NAMES.SIGNED_COMMIT
      )
    })

    it('should set and return value for signedCommit', () => {
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
  })
})
