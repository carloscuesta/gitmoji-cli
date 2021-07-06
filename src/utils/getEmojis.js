// @flow
import chalk from 'chalk'
import fetch from 'node-fetch'
import ora from 'ora'

import cache from './emojisCache'
import buildFetchOptions from './buildFetchOptions'

export const GITMOJIS_URL = 'https://raw.githubusercontent.com/carloscuesta/gitmoji/master/src/data/gitmojis.json'

const getEmojis = (skipCache: boolean = false) => {
  if (cache.isAvailable() && !skipCache) return cache.getEmojis()

  const spinner = ora('Fetching the emoji list').start()

  return fetch(GITMOJIS_URL, buildFetchOptions())
    .then((response) => response.json())
    .then((data) => {
      const emojis = data.gitmojis

      cache.createEmojis(emojis)
      spinner.succeed('Gitmojis fetched successfully')

      return emojis
    })
    .catch((error) => {
      spinner.fail(`Error: ${error}`)
    })
}

export default getEmojis
