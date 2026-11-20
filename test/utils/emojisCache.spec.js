import { pathExistsSync } from 'path-exists'
import fs from 'fs'
import path from 'path'

import emojisCache, {
  GITMOJI_CACHE,
  CACHE_PATH,
  getCachePath
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

  describe('getCachePath', () => {
    describe('when GITMOJI_HOME is unset', () => {
      beforeEach(() => {
        delete process.env.GITMOJI_HOME
      })

      it('should return default cache path in ~/.gitmoji', () => {
        expect(getCachePath()).toEqual(CACHE_PATH)
        expect(getCachePath()).toEqual('/Users/Test/.gitmoji/gitmojis.json')
      })

      it('should have the correct cache filename inside the default directory', () => {
        expect(path.basename(getCachePath())).toEqual(GITMOJI_CACHE.FILE)
      })
    })

    describe('when GITMOJI_HOME is empty string or whitespace', () => {
      afterEach(() => {
        delete process.env.GITMOJI_HOME
      })

      it('should fall back to default cache path when empty', () => {
        process.env.GITMOJI_HOME = ''
        expect(getCachePath()).toEqual(CACHE_PATH)
      })

      it('should fall back to default cache path when whitespace', () => {
        process.env.GITMOJI_HOME = '   '
        expect(getCachePath()).toEqual(CACHE_PATH)
      })
    })

    describe('when GITMOJI_HOME is defined', () => {
      const customDir = '/custom/cache/dir'

      beforeEach(() => {
        process.env.GITMOJI_HOME = customDir
      })

      afterEach(() => {
        delete process.env.GITMOJI_HOME
      })

      it('should return custom cache path', () => {
        expect(getCachePath()).toEqual(path.join(customDir, GITMOJI_CACHE.FILE))
      })

      it('should have the correct cache filename inside the configured directory', () => {
        expect(path.basename(getCachePath())).toEqual(GITMOJI_CACHE.FILE)
        expect(path.dirname(getCachePath())).toEqual(customDir)
      })
    })
  })

  describe('default location (backward compatibility)', () => {
    describe('isAvailable', () => {
      emojisCache.isAvailable()

      it('should check that cache path exists', () => {
        expect(pathExistsSync).toHaveBeenCalledWith(CACHE_PATH)
      })
    })

    describe('createEmojis', () => {
      describe('when cache directory does not exists', () => {
        beforeAll(() => {
          pathExistsSync.mockReturnValue(false)
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
          pathExistsSync.mockReturnValue(true)
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

      describe("when cache doesn't exists", () => {
        beforeAll(() => {
          fs.readFileSync.mockImplementation(() => {
            throw new Error("ERROR: Cache doesn't exist")
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

  describe('when GITMOJI_HOME is defined', () => {
    const customDir = '/custom/path'
    const customCachePath = path.join(customDir, GITMOJI_CACHE.FILE)

    beforeAll(() => {
      process.env.GITMOJI_HOME = customDir
    })

    afterAll(() => {
      delete process.env.GITMOJI_HOME
    })

    describe('isAvailable', () => {
      it('should check that custom cache path exists', () => {
        pathExistsSync.mockClear()
        emojisCache.isAvailable()
        expect(pathExistsSync).toHaveBeenCalledWith(customCachePath)
      })
    })

    describe('createEmojis', () => {
      describe('when configured cache directory does not exist', () => {
        beforeAll(() => {
          pathExistsSync.mockReturnValue(false)
          fs.mkdirSync.mockClear()
          fs.writeFileSync.mockClear()
          emojisCache.createEmojis(stubs.gitmojis)
        })

        it('should create configured cache directory', () => {
          expect(fs.mkdirSync).toHaveBeenCalledWith(customDir)
        })

        it('should write the gitmojis.json file in configured directory', () => {
          expect(fs.writeFileSync).toHaveBeenCalledWith(
            customCachePath,
            JSON.stringify(stubs.gitmojis)
          )
        })
      })

      describe('when configured cache directory already exists', () => {
        beforeAll(() => {
          pathExistsSync.mockReturnValue(true)
          fs.mkdirSync.mockClear()
          fs.writeFileSync.mockClear()
          emojisCache.createEmojis(stubs.gitmojis)
        })

        it('should not create cache directory', () => {
          expect(fs.mkdirSync).not.toHaveBeenCalled()
        })

        it('should write the gitmojis.json file in configured directory', () => {
          expect(fs.writeFileSync).toHaveBeenCalledWith(
            customCachePath,
            JSON.stringify(stubs.gitmojis)
          )
        })
      })
    })

    describe('getEmojis', () => {
      describe('when cache exists in configured location', () => {
        beforeAll(() => {
          fs.readFileSync.mockClear()
          fs.readFileSync.mockReturnValue(JSON.stringify(stubs.gitmojis))
        })

        it('should read and return emojis from configured cache path', () => {
          const emojis = emojisCache.getEmojis()

          expect(fs.readFileSync).toHaveBeenCalledWith(customCachePath)
          expect(emojis).toEqual(stubs.gitmojis)
        })
      })

      describe('when cache is unavailable in configured location', () => {
        beforeAll(() => {
          fs.readFileSync.mockClear()
          fs.readFileSync.mockImplementation(() => {
            throw new Error("ERROR: Cache doesn't exist")
          })
        })

        it('should return an empty array', () => {
          const emojis = emojisCache.getEmojis()

          expect(fs.readFileSync).toHaveBeenCalledWith(customCachePath)
          expect(emojis).toEqual([])
        })
      })
    })
  })
})
