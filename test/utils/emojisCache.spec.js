import pathExists from 'path-exists'
import fs from 'fs'
import path from 'path'

import emojisCache, {
  GITMOJI_CACHE,
  CACHE_PATH
} from '../../src/utils/emojisCache'
import * as stubs from './stubs'

jest.mock('os', () => ({
  homedir: jest.fn().mockReturnValue('/Users/Test/')
}))

describe('emojisCache', () => {
  it('should match GITMOJI_CACHE', () => {
    expect(GITMOJI_CACHE).toMatchSnapshot()
  })

  it('should match CACHE_PATH', () => {
    expect(CACHE_PATH).toMatchSnapshot()
  })

  describe('isAvailable', () => {
    emojisCache.isAvailable()

    it('should check that cache path exists', () => {
      expect(pathExists.sync).toHaveBeenCalledWith(CACHE_PATH)
    })
  })

  describe('createEmojis', () => {
    describe('when cache directory does not exists', () => {
      beforeAll(() => {
        pathExists.sync.mockReturnValue(false)
        emojisCache.createEmojis(stubs.gitmojis)
      })

      it('should create cache directory', () => {
        expect(fs.mkdirSync).toHaveBeenCalledWith(path.dirname(CACHE_PATH))
      })

      it('should write the gitmojis.json file', () => {
        expect(fs.writeFileSync).toHaveBeenCalledWith(
          CACHE_PATH,
          JSON.stringify(stubs.gitmojis)
        )
      })
    })

    describe('when cache directory exists', () => {
      beforeAll(() => {
        pathExists.sync.mockReturnValue(true)
        fs.mkdirSync.mockClear()
        fs.writeFileSync.mockClear()
        emojisCache.createEmojis(stubs.gitmojis)
      })

      it('should create cache directory', () => {
        expect(fs.mkdirSync).not.toHaveBeenCalled()
      })

      it('should write the gitmojis.json file', () => {
        expect(fs.writeFileSync).toHaveBeenCalledWith(
          CACHE_PATH,
          JSON.stringify(stubs.gitmojis)
        )
      })
    })
  })

  describe('getEmojis', () => {
    describe('when cache exists', () => {
      beforeAll(() => {
        fs.readFileSync.mockReturnValue(JSON.stringify(stubs.gitmojis))
      })

      it('should read and return the emojis from the cache', () => {
        const emojis = emojisCache.getEmojis()

        expect(fs.readFileSync).toHaveBeenCalledWith(CACHE_PATH)
        expect(emojis).toEqual(stubs.gitmojis)
      })
    })

    describe('when cache doesn\'t exists', () => {
      beforeAll(() => {
        fs.readFileSync.mockImplementation(() => {
          throw new Error('ERROR: Cache doesn\'t exist')
        })
      })

      it('should return an empty array', () => {
        const emojis = emojisCache.getEmojis()

        expect(fs.readFileSync).toHaveBeenCalled()
        expect(emojis).toEqual([])
      })
    })
  })
})
