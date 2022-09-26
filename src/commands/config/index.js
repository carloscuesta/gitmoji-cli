// @flow
import inquirer from 'inquirer'

import configurationPrompts from './prompts.js'
import { CONFIG } from '@constants/configuration.js'
import configurationVault from '@utils/configurationVault/index.js'

const config = () => {
  inquirer.prompt(configurationPrompts()).then((answers) => {
    configurationVault.setAutoAdd(answers[CONFIG.AUTO_ADD])
    configurationVault.setEmojiFormat(answers[CONFIG.EMOJI_FORMAT])
    configurationVault.setScopePrompt(answers[CONFIG.SCOPE_PROMPT])
    configurationVault.setGitmojisUrl(answers[CONFIG.GITMOJIS_URL])
  })
}

export default config
