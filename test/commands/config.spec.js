import inquirer from 'inquirer'

import config from '@commands/config'
import configurationPrompts from '@commands/config/prompts'
import guard from '@commands/config/guard'
import configurationVault from '@utils/configurationVault'
import * as stubs from './stubs'

jest.mock('@utils/configurationVault')

describe('config command', () => {
  beforeAll(() => {
    inquirer.prompt.mockReturnValue(Promise.resolve(stubs.configAnswers))
    config()
  })

  it('should call inquirer.prompt with configuration prompts', () => {
    expect(inquirer.prompt).toHaveBeenCalledWith(configurationPrompts())
  })

  it('should save the answers into the configuration vault', () => {
    expect(configurationVault.setAutoAdd).toHaveBeenCalledWith(
      stubs.configAnswers.autoAdd
    )
    expect(configurationVault.setEmojiFormat).toHaveBeenCalledWith(
      stubs.configAnswers.emojiFormat
    )
    expect(configurationVault.setScopePrompt).toHaveBeenCalledWith(
      stubs.configAnswers.scopePrompt
    )
    expect(configurationVault.setStoryIdPrompt).toHaveBeenCalledWith(
      stubs.configAnswers.storyIdPrompt
    )
    expect(configurationVault.setMessagePrompt).toHaveBeenCalledWith(
      stubs.configAnswers.messagePrompt
    )
    expect(configurationVault.setCapitalizeTitle).toHaveBeenCalledWith(
      stubs.configAnswers.capitalizeTitle
    )
    expect(configurationVault.setGitmojisUrl).toHaveBeenCalledWith(
      stubs.configAnswers.gitmojisUrl
    )
  })

  describe('guard', () => {
    it('should match guard', () => {
      expect(guard).toMatchSnapshot()
    })

    describe('title', () => {
      it('should return true when valid', () => {
        expect(guard.url(stubs.url)).toBe(true)
      })

      it('should return error message when empty', () => {
        expect(guard.url('')).toEqual(expect.any(String))
      })
    })
  })
})
