import buildFetchOptions from '../../src/utils/buildFetchOptions'
import * as http from 'http'

describe('buildFetchOptions', () => {
  const anHttpUrl = 'http://something.com';
  const anHttpsUrl = 'https://something.com';

  describe('when proxy is detected from the environment', () => {
    const OLD_ENV = process.env

    beforeEach(() => {
      jest.resetModules()
      process.env = { ...OLD_ENV }
      process.env.http_proxy = undefined
      process.env.https_proxy = undefined
    })

    afterAll(() => {
      process.env = OLD_ENV
    })

    describe('when using an anonymous proxy', () => {
      describe('when is http proxy', () => {
        it('should return an object containing a proxy agent', async () => {
          const httpProxyUrl = 'http://localhost-env:8080'
          process.env.http_proxy = httpProxyUrl

          const { default: buildFetchOptionsFromEnv } = await import(
            '../../src/utils/buildFetchOptions'
          )

          const proxyAgent = buildFetchOptionsFromEnv().agent

          expect(
            proxyAgent.getProxyForUrl(anHttpUrl)
          ).toBe(httpProxyUrl)
          })
        })

      describe('when is https proxy', () => {
        it('should return an object containing a proxy agent', async () => {
          const httpsProxyUrl = 'https://localhost-env:8080'
          process.env.https_proxy = httpsProxyUrl

          const { default: buildFetchOptionsFromEnv } = await import(
            '../../src/utils/buildFetchOptions'
          )

          const proxyAgent = buildFetchOptionsFromEnv().agent

          expect(
            proxyAgent.getProxyForUrl(anHttpsUrl)
          ).toBe(httpsProxyUrl)
        })
      })
    })

    describe('when using an authenticated proxy', () => {
      describe('when is http proxy', () => {
        it('should return an object containing a proxy agent', async () => {
          const httpProxyUrl = 'http://user:pass@localhost-env:8080'
          process.env.http_proxy = httpProxyUrl

          const { default: buildFetchOptionsFromEnv } = await import(
            '../../src/utils/buildFetchOptions'
          )

          const proxyAgent = buildFetchOptionsFromEnv().agent

          expect(
            proxyAgent.getProxyForUrl(anHttpUrl)
          ).toBe(httpProxyUrl)
        })
      })

      describe('when is https proxy', () => {
        it('should return an object containing a proxy agent', async () => {
          const httpsProxyUrl = 'https://user:pass@localhost-env:8080'
          process.env.https_proxy = httpsProxyUrl

          const { default: buildFetchOptionsFromEnv } = await import(
            '../../src/utils/buildFetchOptions'
          )

          const proxyAgent = buildFetchOptionsFromEnv().agent

          expect(
            proxyAgent.getProxyForUrl(anHttpsUrl)
          ).toBe(httpsProxyUrl)

        })
      })
    })
  })

  describe('when no proxy is detected or used', () => {
    it('should return undefined', () => {
      expect(buildFetchOptions()).toBe(undefined)
    })
  })
})
