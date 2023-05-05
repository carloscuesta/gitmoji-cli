// @flow
import { encoding_for_model } from '@dqbd/tiktoken'
import fetch from 'node-fetch'
import getPrompt from './getPrompt'
import chalk from 'chalk'

const MAX_TOKEN_LENGTH = 500

export type ParsedMessage = {
  gitmoji: string,
  title: string,
  raw: string
}

/**
 * Do some additional post processing on the received answer
 */
const parseMessage = (
  message: string,
  gitmojis: Object[]
): ParsedMessage | void => {
  // Replace emojis with codes
  for (const gitmoji of gitmojis) {
    message = message.replace(gitmoji.emoji, gitmoji.code)
  }

  // Force only one sentence if for some reason multiple are returned
  message = message.split('\n')[0]

  // Remove trailing punctuation
  message = message.replace(/\.$/g, '')

  // Extract the gitmoji from the generated message
  const matches = message.match(/^(:\w+:)\s(.+)$/)
  if (!matches) {
    return console.error(chalk.red(`Unable to parse message: ${message}`))
  }

  return {
    gitmoji: matches[1],
    title: matches[2],
    raw: message
  }
}

const getGeneratedMessage = async (
  diff: string,
  gitmojis: Object[],
  context?: string,
  model: string = 'gpt-3.5-turbo'
): Promise<ParsedMessage | void> => {
  const encoding = encoding_for_model(model)
  let prompt = getPrompt(diff, gitmojis, context)

  // Check if exceeding model max token length and minify accordingly
  if (encoding.encode(prompt).length > 4096) {
    prompt = getPrompt(diff, gitmojis, context, true)

    // Check if minified prompt is still too long
    if (encoding.encode(prompt).length > 4096) {
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
      max_tokens: MAX_TOKEN_LENGTH
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
