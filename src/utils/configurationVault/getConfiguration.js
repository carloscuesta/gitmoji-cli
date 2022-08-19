import Conf from 'conf'
import { cwd } from 'process'
import pathExists from 'path-exists'

import {
  CONFIGURATION_PROMPT_NAMES,
  EMOJI_COMMIT_FORMATS
} from '@commands/config/prompts'

const DEFAULT_CONFIGURATION = {
  [CONFIGURATION_PROMPT_NAMES.AUTO_ADD]: false,
  [CONFIGURATION_PROMPT_NAMES.EMOJI_FORMAT]: EMOJI_COMMIT_FORMATS.CODE,
  [CONFIGURATION_PROMPT_NAMES.SCOPE_PROMPT]: false,
  [CONFIGURATION_PROMPT_NAMES.GITMOJIS_URL]: 'https://gitmoji.dev/api/gitmojis'
}

const LOCAL_CONFIGURATION: typeof Conf = new Conf({
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

const getConfiguration = (): { get: Function, set: Function } => {
  const loadConfig = (): {
    [$Values<typeof CONFIGURATION_PROMPT_NAMES>]: string | boolean
  } => {
    const packageJson = `${cwd()}/package.json`
    const configurationFile = `${cwd()}/.gitmojirc.json`

    if (!pathExists.sync(packageJson) && !pathExists.sync(configurationFile)) {
      return LOCAL_CONFIGURATION.store
    }

    if (pathExists.sync(packageJson)) {
      return require(packageJson).gitmoji || LOCAL_CONFIGURATION.store
    }

    if (pathExists.sync(configurationFile)) {
      return require(configurationFile) || LOCAL_CONFIGURATION.store
    }
  }

  return {
    get: (key: string): string | boolean => {
      const configuration = loadConfig() || DEFAULT_CONFIGURATION

      return configuration[key]
    },
    set: (key: string, value: string | boolean): void =>
      LOCAL_CONFIGURATION.set(key, value)
  }
}

export default getConfiguration
