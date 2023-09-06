// @flow
import { ProxyAgent } from 'proxy-agent'

export const buildFetchOptions = (): ?{ agent: Object } => {
  const isProxyConfigured = process.env.https_proxy || process.env.http_proxy
  return isProxyConfigured ? { agent: new ProxyAgent() } : undefined
}

export default buildFetchOptions
