// @flow
import chalk from 'chalk'
import fetch from 'node-fetch'
import ora from 'ora'

import cache from './emojisCache'

export const GITMOJIS_URL =
  'https://raw.githubusercontent.com/carloscuesta/gitmoji/master/src/data/gitmojis.json'

const getEmojis = () => {
  if (cache.isAvailable()) return cache.getEmojis()

  const spinner = ora('Fetching the emoji list').start()

  return fetch(GITMOJIS_URL)
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
