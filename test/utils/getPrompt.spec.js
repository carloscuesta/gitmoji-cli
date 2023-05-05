import getPrompt from '@utils/getPrompt'
import * as stubs from './stubs'

describe('getPrompt', () => {
  it('should return prompt', () => {
    const prompt = getPrompt(stubs.diff, stubs.gitmojis)

    expect(prompt).toEqual(
      expect.stringContaining("import getPrompt from './getPrompt'")
    )
    expect(prompt).toEqual(
      expect.stringContaining(
        `${stubs.gitmojis[0].code} - ${stubs.gitmojis[0].description}`
      )
    )
  })

  it('should return minified prompt', () => {
    const prompt = getPrompt(stubs.diff, stubs.gitmojis, undefined, true)

    expect(prompt).toEqual(
      expect.not.stringContaining("import getPrompt from './getPrompt'")
    )
  })

  it('should exclude lockfiles', () => {
    const prompt = getPrompt(stubs.lockDiff, stubs.gitmojis, undefined, true)

    expect(prompt).toEqual(
      expect.not.stringContaining('diff --git a/yarn.lock b/yarn.lock')
    )
  })
})
