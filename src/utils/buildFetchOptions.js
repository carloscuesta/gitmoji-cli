// @flow
import ProxyAgent from 'proxy-agent'

const defaultProxy =
  process.env.https_proxy || process.env.http_proxy || undefined

export const buildAgent = (proxy: string = defaultProxy) =>
  proxy ? new ProxyAgent(proxy) : undefined

export const buildFetchOptions = (options: object = {}) => {
  const agent = buildAgent(options.proxy)
  return { ...options, agent }
}

export default buildFetchOptions
