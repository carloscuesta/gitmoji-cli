// @flow
import { encoding_for_model } from '@dqbd/tiktoken'
import fetch from 'node-fetch'
import getPrompt from './getPrompt'
import chalk from 'chalk'
import configurationVault from '@utils/configurationVault'
import { EMOJI_COMMIT_FORMATS } from '@constants/configuration'

export type ParsedMessage = {
  gitmoji: string,
  title: string,
  raw: string
}

const MAX_RESPONSE_LENGTH = 500
const GPT4_TOKEN_LENGTH = 8192
const GPT3_TOKEN_LENGTH = 4096

const getMaxTokenLength = (model: 'gpt-3.5-turbo' | 'gpt-4') =>
  (model === 'gpt-3.5-turbo' ? GPT3_TOKEN_LENGTH : GPT4_TOKEN_LENGTH) -
  MAX_RESPONSE_LENGTH

/**
 * Do some additional post processing on the received answer
 */
const parseMessage = (
  message: string,
  gitmojis: Object[]
): ParsedMessage | void => {
  let gitmojiUsed
  for (const gitmoji of gitmojis) {
    if (!message.includes(gitmoji.emoji) && !message.includes(gitmoji.code)) {
      continue
    }

    const format = configurationVault.getEmojiFormat()
    if (format === EMOJI_COMMIT_FORMATS.CODE) {
      message = message.replace(gitmoji.emoji, gitmoji.code)
      gitmojiUsed = gitmoji.code
    } else {
      message = message.replace(gitmoji.code, gitmoji.emoji)
      gitmojiUsed = gitmoji.emoji
    }
  }

  if (!gitmojiUsed) {
    return console.error(
      chalk.red(
        'The generated commit message did not contain any gitmojis. Contact the author.'
      )
    )
  }

  // Force only one sentence if for some reason multiple are returned
  message = message.split('\n')[0]

  // Remove trailing punctuation
  message = message.replace(/\.$/g, '')

  return {
    gitmoji: gitmojiUsed,
    title: message.replace(gitmojiUsed, '').trim(),
    raw: message
  }
}

const getGeneratedMessage = async (
  diff: string,
  gitmojis: Object[],
  context?: string,
  model: 'gpt-3.5-turbo' | 'gpt-4' = 'gpt-3.5-turbo'
): Promise<ParsedMessage | void> => {
  const encoding = encoding_for_model(model)
  const modelLength = getMaxTokenLength(model)

  // Check if exceeding model max token length and minify accordingly
  let prompt = getPrompt(diff, gitmojis, context)
  if (encoding.encode(prompt).length > modelLength) {
    prompt = getPrompt(diff, gitmojis, context, true)

    // Check if minified prompt is still too long
    if (encoding.encode(prompt).length > modelLength) {
      return console.error(
        chalk.red(
          'The diff is too large, try reducing the number of staged changes.'
        )
      )
    }
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ''}`
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: MAX_RESPONSE_LENGTH
    })
  })

  if (!response.ok) {
    return console.error(chalk.red(await response.text()))
  }

  const data = await response.json()

  // Free the encoding to prevent memory leaks
  encoding.free()

  return parseMessage(data.choices[0].message.content, gitmojis)
}

export default getGeneratedMessage
