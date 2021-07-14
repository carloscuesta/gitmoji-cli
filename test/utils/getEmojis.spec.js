import fetch from 'node-fetch'

import configurationVault from '../../src/utils/configurationVault'
import getEmojis, { GITMOJIS_URL } from '../../src/utils/getEmojis'
import buildFetchOptions from '../../src/utils/buildFetchOptions'
import emojisCache from '../../src/utils/emojisCache'
import * as stubs from './stubs'

jest.mock('../../src/utils/emojisCache')

describe('getEmojis', () => {
  describe('when cache is available', () => {
    beforeAll(() => {
      emojisCache.isAvailable.mockReturnValue(true)
      getEmojis()
    })

    it('should return gitmojis from cache', () => {
      expect(emojisCache.getEmojis).toHaveBeenCalled()
    })
  })

  describe('when cache is not available', () => {
    beforeAll(() => {
      emojisCache.isAvailable.mockReturnValue(false)
      fetch.mockResponse(JSON.stringify(stubs.gitmojisResponse))
      getEmojis()
      emojisCache.getEmojis.mockClear()
    })

    it('should not return emojis from cache', () => {
      expect(emojisCache.getEmojis).not.toHaveBeenCalled()
    })

    it('should fetch the emojis', async () => {
      expect(fetch).toHaveBeenCalledWith(configurationVault.getGitmojisUrl(), buildFetchOptions())
    })

    it('should create the cache with the fetched emojis', () => {
      expect(emojisCache.createEmojis).toHaveBeenCalledWith(
        stubs.gitmojisResponse.gitmojis
      )
    })
  })

  describe('when cache is available but is skipped', () => {
    beforeAll(() => {
      emojisCache.isAvailable.mockReturnValue(true)
      fetch.mockResponse(JSON.stringify(stubs.gitmojisResponse))
      getEmojis(true)
      emojisCache.getEmojis.mockClear()
    })

    it('should not return emojis from cache', () => {
      expect(emojisCache.getEmojis).not.toHaveBeenCalled()
    })

    it('should fetch the emojis', async () => {
      expect(fetch).toHaveBeenCalledWith(configurationVault.getGitmojisUrl(), buildFetchOptions())
    })

    it('should create the cache with the fetched emojis', () => {
      expect(emojisCache.createEmojis).toHaveBeenCalledWith(
        stubs.gitmojisResponse.gitmojis
      )
    })
  })
})
