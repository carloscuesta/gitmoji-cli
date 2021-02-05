// @flow
import inquirer from 'inquirer'

import configurationPrompts, { CONFIGURATION_PROMPT_NAMES } from './prompts'
import configurationVault from '../../utils/configurationVault'

const config = () => {
  inquirer.prompt(configurationPrompts()).then((answers) => {
    configurationVault.setAutoAdd(answers[CONFIGURATION_PROMPT_NAMES.AUTO_ADD])
    configurationVault.setEmojiFormat(
      answers[CONFIGURATION_PROMPT_NAMES.EMOJI_FORMAT]
    )
    configurationVault.setSignedCommit(
      answers[CONFIGURATION_PROMPT_NAMES.SIGNED_COMMIT]
    )
    configurationVault.setScopePrompt(
      answers[CONFIGURATION_PROMPT_NAMES.SCOPE_PROMPT]
    )
    configurationVault.setSkipPromptingFilledInfo(
      answers[CONFIGURATION_PROMPT_NAMES.SKIP_PROMPTING_FILLED_INFO]
    )
  })
}

export default config
