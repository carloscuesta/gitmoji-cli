import buildFetchOptions from '../../src/utils/buildFetchOptions'

describe('buildFetchOptions', () => {
  describe('when proxy is passed as an argument', () => {
    describe('when using an anonymous proxy', () => {
      describe('when is http proxy', () => {
        it('should return an object containing a proxy agent', () => {
          expect(
            buildFetchOptions({ proxy: 'http://localhost:8080' })
          ).toMatchObject({
            agent: {
              proxy: {
                auth: null,
                host: 'localhost:8080',
                hostname: 'localhost',
                href: 'http://localhost:8080/',
                port: '8080',
                protocol: 'http:'
              },
              proxyUri: 'http://localhost:8080'
            }
          })
        })
      })

      describe('when is https proxy', () => {
        it('should return an object containing a proxy agent', () => {
          expect(
            buildFetchOptions({ proxy: 'https://localhost:8080' })
          ).toMatchObject({
            agent: {
              proxy: {
                auth: null,
                host: 'localhost:8080',
                hostname: 'localhost',
                href: 'https://localhost:8080/',
                port: '8080',
                protocol: 'https:'
              },
              proxyUri: 'https://localhost:8080'
            }
          })
        })
      })
    })

    describe('when using an authenticated proxy', () => {
      describe('when is http proxy', () => {
        it('should return an object containing a proxy agent', () => {
          expect(
            buildFetchOptions({ proxy: 'http://user:pass@localhost:8080' })
          ).toMatchObject({
            agent: {
              proxy: {
                auth: 'user:pass',
                host: 'localhost:8080',
                hostname: 'localhost',
                href: 'http://user:pass@localhost:8080/',
                port: '8080',
                protocol: 'http:'
              },
              proxyUri: 'http://user:pass@localhost:8080'
            }
          })
        })
      })

      describe('when is https proxy', () => {
        it('should return an object containing a proxy agent', () => {
          expect(
            buildFetchOptions({ proxy: 'https://user:pass@localhost:8080' })
          ).toMatchObject({
            agent: {
              proxy: {
                auth: 'user:pass',
                host: 'localhost:8080',
                hostname: 'localhost',
                href: 'https://user:pass@localhost:8080/',
                port: '8080',
                protocol: 'https:'
              },
              proxyUri: 'https://user:pass@localhost:8080'
            }
          })
        })
      })
    })
  })

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
          process.env.http_proxy = 'http://localhost-env:8080'

          const { default: buildFetchOptionsFromEnv } = await import(
            '../../src/utils/buildFetchOptions'
          )

          expect(buildFetchOptionsFromEnv()).toMatchObject({
            agent: {
              proxy: {
                auth: null,
                host: 'localhost-env:8080',
                hostname: 'localhost-env',
                href: 'http://localhost-env:8080/',
                port: '8080',
                protocol: 'http:'
              },
              proxyUri: 'http://localhost-env:8080'
            }
          })
        })
      })

      describe('when is https proxy', () => {
        it('should return an object containing a proxy agent', async () => {
          process.env.https_proxy = 'https://localhost-env:8080'

          const { default: buildFetchOptionsFromEnv } = await import(
            '../../src/utils/buildFetchOptions'
          )

          expect(buildFetchOptionsFromEnv()).toMatchObject({
            agent: {
              proxy: {
                auth: null,
                host: 'localhost-env:8080',
                hostname: 'localhost-env',
                href: 'https://localhost-env:8080/',
                port: '8080',
                protocol: 'https:'
              },
              proxyUri: 'https://localhost-env:8080'
            }
          })
        })
      })
    })

    describe('when using an authenticated proxy', () => {
      describe('when is http proxy', () => {
        it('should return an object containing a proxy agent', async () => {
          process.env.http_proxy = 'http://user:pass@localhost-env:8080'

          const { default: buildFetchOptionsFromEnv } = await import(
            '../../src/utils/buildFetchOptions'
          )

          expect(buildFetchOptionsFromEnv()).toMatchObject({
            agent: {
              proxy: {
                auth: 'user:pass',
                host: 'localhost-env:8080',
                hostname: 'localhost-env',
                href: 'http://user:pass@localhost-env:8080/',
                port: '8080',
                protocol: 'http:'
              },
              proxyUri: 'http://user:pass@localhost-env:8080'
            }
          })
        })
      })

      describe('when is https proxy', () => {
        it('should return an object containing a proxy agent', async () => {
          process.env.https_proxy = 'https://user:pass@localhost-env:8080'

          const { default: buildFetchOptionsFromEnv } = await import(
            '../../src/utils/buildFetchOptions'
          )

          expect(buildFetchOptionsFromEnv()).toMatchObject({
            agent: {
              proxy: {
                auth: 'user:pass',
                host: 'localhost-env:8080',
                hostname: 'localhost-env',
                href: 'https://user:pass@localhost-env:8080/',
                port: '8080',
                protocol: 'https:'
              },
              proxyUri: 'https://user:pass@localhost-env:8080'
            }
          })
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
