// @flow
import fetch from 'node-fetch'
import ora from 'ora'

import cache from './emojisCache'
import buildFetchOptions from './buildFetchOptions'
import configurationVault from './configurationVault'

const getEmojis = async (
  skipCache: boolean = false
): Promise<Array<Object>> => {
  const emojisFromCache = cache.getEmojis()

  if (cache.isAvailable() && !skipCache) return emojisFromCache

  const spinner = ora('Fetching gitmojis').start()

  try {
    const response = await fetch(
      configurationVault.getGitmojisUrl(),
      buildFetchOptions()
    )
    const data = await response.json()
    const emojis = data.gitmojis

    cache.createEmojis(emojis)

    if (emojis.length === emojisFromCache.length) {
      spinner.info('Gitmojis already up to date')

      return []
    }

    spinner.succeed('Gitmojis fetched successfully, these are the new emojis:')

    return emojis.filter((emoji) => !emojisFromCache.includes(emoji))
  } catch (error) {
    spinner.fail(`Error: ${error}`)

    return []
  }
}

export default getEmojis
