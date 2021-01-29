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
    if (process.platform !== 'win32') {
      expect(CACHE_PATH).toMatchSnapshot()
    } else {
      expect('/Users/Test/.gitmoji/gitmojis.json').toMatchSnapshot()
    }
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
    beforeAll(() => {
      fs.readFileSync.mockReturnValue(JSON.stringify(stubs.gitmojis))
      emojisCache.getEmojis()
    })

    it('should read the emojis from the cache', () => {
      expect(fs.readFileSync).toHaveBeenCalled()
    })
  })
})
