// @flow
import ProxyAgent from 'proxy-agent'

const defaultProxy: string | undefined =
  process.env.https_proxy || process.env.http_proxy || undefined

export const buildAgent = (
  proxy: string | undefined = defaultProxy
): ProxyAgent | undefined => (proxy ? new ProxyAgent(proxy) : undefined)

export const buildFetchOptions = (
  options: { proxy?: string } = {}
): { agent: Object | undefined } => {
  const agent = buildAgent(options.proxy)
  return agent ? { agent } : undefined
}

export default buildFetchOptions
