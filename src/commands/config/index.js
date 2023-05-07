// @flow
import inquirer from 'inquirer'

import configurationPrompts from './prompts'
import { CONFIG } from '@constants/configuration'
import configurationVault from '@utils/configurationVault'

const config = () => {
  inquirer.prompt(configurationPrompts()).then((answers) => {
    configurationVault.setAutoAdd(answers[CONFIG.AUTO_ADD])
    configurationVault.setEmojiFormat(answers[CONFIG.EMOJI_FORMAT])
    configurationVault.setScopePrompt(answers[CONFIG.SCOPE_PROMPT])
    configurationVault.setMessagePrompt(answers[CONFIG.MESSAGE_PROMPT])
    configurationVault.setGitmojisUrl(answers[CONFIG.GITMOJIS_URL])
  })
}

export default config
