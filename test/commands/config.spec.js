import inquirer from 'inquirer'

import config from '@commands/config'
import configurationPrompts from '@commands/config/prompts'
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
    expect(configurationVault.setGitmojisUrl).toHaveBeenCalledWith(
      stubs.configAnswers.gitmojisUrl
    )
  })
})
