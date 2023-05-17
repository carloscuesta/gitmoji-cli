import Conf from 'conf'
import { cwd } from 'process'
import { readFileSync } from 'fs'
import { pathExistsSync } from 'path-exists'

import { CONFIG, EMOJI_COMMIT_FORMATS } from '@constants/configuration'

const DEFAULT_CONFIGURATION = {
  [CONFIG.AUTO_ADD]: false,
  [CONFIG.EMOJI_FORMAT]: EMOJI_COMMIT_FORMATS.CODE,
  [CONFIG.SCOPE_PROMPT]: false,
  [CONFIG.STORYID_PROMPT]: false,
  [CONFIG.MESSAGE_PROMPT]: true,
  [CONFIG.CAPITALIZE_TITLE]: true,
  [CONFIG.GITMOJIS_URL]: 'https://gitmoji.dev/api/gitmojis'
}

const LOCAL_CONFIGURATION: typeof Conf = new Conf({
  projectName: 'gitmoji',
  schema: {
    [CONFIG.AUTO_ADD]: {
      type: 'boolean',
      default: DEFAULT_CONFIGURATION[CONFIG.AUTO_ADD]
    },
    [CONFIG.EMOJI_FORMAT]: {
      enum: Object.values(EMOJI_COMMIT_FORMATS),
      default: DEFAULT_CONFIGURATION[CONFIG.EMOJI_FORMAT]
    },
    [CONFIG.SCOPE_PROMPT]: {
      type: 'boolean',
      default: DEFAULT_CONFIGURATION[CONFIG.SCOPE_PROMPT]
    },
    [CONFIG.STORYID_PROMPT]: {
      type: 'boolean',
      default: DEFAULT_CONFIGURATION[CONFIG.STORYID_PROMPT]
    },
    [CONFIG.MESSAGE_PROMPT]: {
      type: 'boolean',
      default: DEFAULT_CONFIGURATION[CONFIG.MESSAGE_PROMPT]
    },
    [CONFIG.CAPITALIZE_TITLE]: {
      type: 'boolean',
      default: DEFAULT_CONFIGURATION[CONFIG.CAPITALIZE_TITLE]
    },
    [CONFIG.GITMOJIS_URL]: {
      type: 'string',
      format: 'url',
      default: DEFAULT_CONFIGURATION[CONFIG.GITMOJIS_URL]
    }
  }
})

const getFile = (path: string): Buffer | void => {
  try {
    return JSON.parse(readFileSync(path))
  } catch (error) {
    return
  }
}

const getConfiguration = (): { get: Function, set: Function } => {
  const loadConfig = (): {
    [$Values<typeof CONFIG>]: string | boolean
  } => {
    const packageJson = `${cwd()}/package.json`
    const configurationFile = `${cwd()}/.gitmojirc.json`

    if (pathExistsSync(packageJson) && getFile(packageJson)?.gitmoji) {
      return getFile(packageJson)?.gitmoji
    }

    if (pathExistsSync(configurationFile) && getFile(configurationFile)) {
      return getFile(configurationFile)
    }

    return LOCAL_CONFIGURATION.store
  }

  return {
    get: (key: string): string | boolean => {
      const resolvedConfiguration = loadConfig()
      const configuration =
        typeof resolvedConfiguration === 'object' &&
        Object.keys(resolvedConfiguration).length
          ? resolvedConfiguration
          : DEFAULT_CONFIGURATION

      return configuration[key] ?? DEFAULT_CONFIGURATION[key]
    },
    set: (key: string, value: string | boolean): void =>
      LOCAL_CONFIGURATION.set(key, value)
  }
}

export default getConfiguration
