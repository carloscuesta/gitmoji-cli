// @flow
import fs from 'fs'
import os from 'os'
import path from 'path'
import pathExists from 'path-exists'

export const GITMOJI_CACHE: Object = {
  FOLDER: '.gitmoji',
  FILE: 'gitmojis.json'
}

export const CACHE_PATH: string = path.join(
  os.homedir(),
  GITMOJI_CACHE.FOLDER,
  GITMOJI_CACHE.FILE
)

const createEmojis = (emojis: Array<Object>): void => {
  if (!pathExists.sync(path.dirname(CACHE_PATH))) {
    fs.mkdirSync(path.dirname(CACHE_PATH))
  }

  fs.writeFileSync(CACHE_PATH, JSON.stringify(emojis))
}

const getEmojis = (): Array<Object> => {
  try {
    return JSON.parse(fs.readFileSync(CACHE_PATH).toString())
  } catch (error) {
    return []
  }
}

const isAvailable = (): boolean => pathExists.sync(CACHE_PATH)

export default {
  createEmojis,
  getEmojis,
  isAvailable
}
