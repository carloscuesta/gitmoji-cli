import buildFetchOptions from '../../src/utils/buildFetchOptions';

describe('buildOptionsWithProxyArg', () => {
  describe('when unauthenticated http proxy is passed as an argument', () => {
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
      });
    });
  });

  describe('when authenticated http proxy is passed as an argument', () => {
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
      });
    });
  });

  describe('when unauthenticated https proxy is passed as an argument', () => {
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
      });
    });
  });

  describe('when authenticated https proxy is passed as an argument', () => {
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
      });
    });
  });
});

describe('buildOptionsWithProxyFromENV', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    process.env.http_proxy = undefined;
    process.env.https_proxy = undefined;
  });

  afterEach(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  describe('when unauthenticated http proxy is detected in the environment', () => {
    it('should return an object containing a proxy agent', () => {
      process.env.http_proxy = 'http://localhost-env:8080';

      const buildFetchOptionsFromEnv = require('../../src/utils/buildFetchOptions')
        .default;

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
      });
    });
  });

  describe('when unauthenticated https proxy is detected in the environment', () => {
    it('should return an object containing a proxy agent', () => {
      process.env.https_proxy = 'https://localhost-env:8080';

      const buildFetchOptionsFromEnv = require('../../src/utils/buildFetchOptions')
        .default;

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
      });
    });
  });

  describe('when authenticated http proxy is detected in the environment', () => {
    it('should return an object containing a proxy agent', () => {
      process.env.http_proxy = 'http://user:pass@localhost-env:8080';

      const buildFetchOptionsFromEnv = require('../../src/utils/buildFetchOptions')
        .default;

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
      });
    });
  });

  describe('when authenticated https proxy is detected in the environment', () => {
    it('should return an object containing a proxy agent', () => {
      process.env.https_proxy = 'https://user:pass@localhost-env:8080';

      const buildFetchOptionsFromEnv = require('../../src/utils/buildFetchOptions')
        .default;

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
      });
    });
  });

  describe('buildOptionsWithNoProxy', () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
      jest.resetModules();
      process.env = { ...OLD_ENV };
      process.env.http_proxy = undefined;
      process.env.https_proxy = undefined;
    });

    afterEach(() => {
      process.env = OLD_ENV; // Restore old environment
    });

    afterAll(() => {
      process.env = OLD_ENV; // Restore old environment
    });

    describe('when no proxy is passed from the environment or as argumentss', () => {
      it('should return an object containing a proxy agent', () => {
        const buildFetchOptionsWithoutProxy = require('../../src/utils/buildFetchOptions')
          .default;

        expect(buildFetchOptionsWithoutProxy()).toBe(undefined);
      });
    });
  });
});
