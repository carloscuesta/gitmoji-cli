import Conf from 'conf'
import { cwd } from 'process'
import pathExists from 'path-exists'

import { CONFIG, EMOJI_COMMIT_FORMATS } from '@constants/configuration'

const DEFAULT_CONFIGURATION = {
  [CONFIG.AUTO_ADD]: false,
  [CONFIG.EMOJI_FORMAT]: EMOJI_COMMIT_FORMATS.CODE,
  [CONFIG.SCOPE_PROMPT]: false,
  [CONFIG.GITMOJIS_URL]: 'https://gitmoji.dev/api/gitmojis'
}

const LOCAL_CONFIGURATION: typeof Conf = new Conf({
  projectName: 'gitmoji',
  schema: {
    [CONFIG.AUTO_ADD]: { type: 'boolean' },
    [CONFIG.EMOJI_FORMAT]: {
      enum: Object.values(EMOJI_COMMIT_FORMATS)
    },
    [CONFIG.SCOPE_PROMPT]: { type: 'boolean' },
    [CONFIG.GITMOJIS_URL]: { type: 'string', format: 'url' }
  }
})

const getConfiguration = (): { get: Function, set: Function } => {
  const loadConfig = (): {
    [$Values<typeof CONFIG>]: string | boolean
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
