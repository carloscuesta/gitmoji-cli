// @flow
import ProxyAgent from 'proxy-agent'

const defaultProxy: ?string =
  process.env.https_proxy || process.env.http_proxy || undefined

export const buildAgent = (
  proxy: ?string = defaultProxy
): ?typeof ProxyAgent => (proxy ? new ProxyAgent(proxy) : undefined)

export const buildFetchOptions = (
  options: { proxy?: string } = {}
): ?{ agent: Object } => {
  const agent = buildAgent(options.proxy)
  return agent ? { agent } : undefined
}

export default buildFetchOptions
