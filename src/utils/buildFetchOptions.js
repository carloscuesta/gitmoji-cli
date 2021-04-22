// @flow
import ProxyAgent from 'proxy-agent'

const defaultProxy = process.env.https_proxy || process.env.http_proxy || ''

export const buildAgent = (proxy: string = defaultProxy) =>
  proxy ? new ProxyAgent(proxy) : ''

export const buildFetchOptions = (options: { proxy?: string } = {}) => {
  const agent = buildAgent(options.proxy)
  return { agent }
}

export default buildFetchOptions
