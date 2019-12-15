import inquirer from 'inquirer'

import config from '../../src/commands/config'
import configurationPrompts from '../../src/commands/config/prompts'
import configurationVault from '../../src/utils/configurationVault'
import * as stubs from './stubs'

jest.mock('../../src/utils/configurationVault')

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
    expect(configurationVault.setSignedCommit).toHaveBeenCalledWith(
      stubs.configAnswers.signedCommit
    )
    expect(configurationVault.setScopePrompt).toHaveBeenCalledWith(
      stubs.configAnswers.scopePrompt
    )
    expect(configurationVault.setScopeTemplate).toHaveBeenCalledWith(
      stubs.configAnswers.scopeTemplate
    )
  })
})
