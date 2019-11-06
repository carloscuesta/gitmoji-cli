// @flow
import fs from 'fs'
import os from 'os'
import path from 'path'
import pathExists from 'path-exists'

export const GITMOJI_CACHE: Object = {
  FOLDER: '.gitmoji',
  FILE: 'gitmojis.json'
}

export const CACHE_PATH = path.join(
  os.homedir(),
  GITMOJI_CACHE.FOLDER,
  GITMOJI_CACHE.FILE
)

const createEmojis = (emojis: Array<Object>) => {
  if (!pathExists.sync(path.dirname(CACHE_PATH))) {
    fs.mkdirSync(path.dirname(CACHE_PATH))
  }

  fs.writeFileSync(CACHE_PATH, JSON.stringify(emojis))
}

const getEmojis = () => {
  // $FlowFixMe
  return Promise.resolve(JSON.parse(fs.readFileSync(CACHE_PATH)))
}

const isAvailable = () => pathExists.sync(CACHE_PATH)

export default {
  createEmojis,
  getEmojis,
  isAvailable
}
