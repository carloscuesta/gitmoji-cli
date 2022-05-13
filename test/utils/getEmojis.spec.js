import fetch from 'node-fetch'

import configurationVault from '../../src/utils/configurationVault'
import getEmojis, { GITMOJIS_URL } from '../../src/utils/getEmojis'
import buildFetchOptions from '../../src/utils/buildFetchOptions'
import emojisCache from '../../src/utils/emojisCache'
import * as stubs from './stubs'
import emojisLocal from "../../src/utils/emojisLocal";

jest.mock('../../src/utils/emojisCache')
jest.mock('../../src/utils/emojisLocal')

describe('getEmojis', () => {
    afterEach(() => {
       jest.clearAllMocks();
    });
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
    beforeEach(() => {
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
    beforeEach(() => {
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

  describe('when cache and fechted data contains the same information', () => {
    let emojis

    beforeEach(async () => {
      emojisCache.isAvailable.mockReturnValue(true)
      fetch.mockResponse(JSON.stringify(stubs.gitmojisResponse))
      emojis = await getEmojis(true)
      emojisCache.getEmojis.mockReturnValue(JSON.stringify(stubs.gitmojisResponse))
    })

    it('should fetch the emojis', async () => {
      expect(fetch).toHaveBeenCalledWith(configurationVault.getGitmojisUrl(), buildFetchOptions())
    })

    it('should create the cache with the fetched emojis', () => {
      expect(emojisCache.createEmojis).toHaveBeenCalledWith(
        stubs.gitmojisResponse.gitmojis
      )
    })

    it('should return an empty array', () => {
      expect(emojis).toEqual([])
    })
  })

    describe('when local gitmojis.json is present', () => {
        it('should return gitmojis from local file', async () => {
            emojisLocal.isAvailable.mockResolvedValueOnce(true);

            await getEmojis();

            expect(emojisLocal.getEmojisLocal).toHaveBeenCalled();
        });
    })

    describe('when local gitmojis.json is not present', () => {
        it('should not return gitmojis from local file', async () => {
            emojisLocal.isAvailable.mockResolvedValueOnce(false);

            await getEmojis();

            expect(emojisLocal.getEmojisLocal).not.toHaveBeenCalled();
        });
    })
})
