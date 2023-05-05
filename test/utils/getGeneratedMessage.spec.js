import fetch from 'node-fetch'

import * as stubs from './stubs'
import getGeneratedMessage from '@utils/getGeneratedMessage'

describe('getGeneratedPrompt', () => {
  it('should generate payload prompt', async () => {
    fetch.mockResponse(JSON.stringify(stubs.gptResponse))
    const message = await getGeneratedMessage(stubs.diff, stubs.gitmojis)

    expect(message).toMatchObject({
      raw: stubs.gptResponse.choices[0].message.content,
      gitmoji: ':sparkles:',
      title: 'Added a new feature'
    })
  })
})
