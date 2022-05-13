import pathExists from 'path-exists'
import path from 'path'
import getAbsoluteProjectPath from './getAbsoluteProjectPath'
import { GITMOJI_CACHE } from './emojisCache'
import fs from 'fs'

export const getLocalPath = async () => {
  const projectPath = await getAbsoluteProjectPath()
  return path.join(projectPath, GITMOJI_CACHE.FOLDER, GITMOJI_CACHE.FILE)
}

const isAvailable = async () => {
  return pathExists.sync(await getLocalPath())
}

const getEmojisLocal = async () => {
  const localPath = await getLocalPath()
  try {
    return JSON.parse(fs.readFileSync(localPath).toString())
  } catch (error) {
    return []
  }
}

export default {
  isAvailable,
  getLocalPath,
  getEmojisLocal
}
