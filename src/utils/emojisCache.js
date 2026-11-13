// @flow
import fs from 'fs'
import os from 'os'
import path from 'path'
import { pathExistsSync } from 'path-exists'

export const GITMOJI_CACHE: Object = {
  FOLDER: '.gitmoji',
  FILE: 'gitmojis.json'
}

export const getCachePath = (): string => {
  const cacheDirectory =
    process.env.GITMOJI_HOME && process.env.GITMOJI_HOME.trim() !== ''
      ? process.env.GITMOJI_HOME.trim()
      : path.join(os.homedir(), GITMOJI_CACHE.FOLDER)

  return path.join(cacheDirectory, GITMOJI_CACHE.FILE)
}

export const CACHE_PATH: string = getCachePath()

const createEmojis = (emojis: Array<Object>): void => {
  const cachePath = getCachePath()
  const cacheDir = path.dirname(cachePath)

  if (!pathExistsSync(cacheDir)) {
    fs.mkdirSync(cacheDir)
  }

  fs.writeFileSync(cachePath, JSON.stringify(emojis))
}

const getEmojis = (): Array<Object> => {
  try {
    return JSON.parse(fs.readFileSync(getCachePath()).toString())
  } catch (error) {
    return []
  }
}

const isAvailable = (): boolean => pathExistsSync(getCachePath())

export default {
  createEmojis,
  getEmojis,
  isAvailable
}
