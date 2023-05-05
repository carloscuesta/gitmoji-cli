// @flow
import inquirer from 'inquirer'
import getEmojis from '@utils/getEmojis'
import getGeneratedMessage from '@utils/getGeneratedMessage'
import { execa } from 'execa'
import { type ParsedMessage } from '@utils/getGeneratedMessage'
import chalk from 'chalk'
import withClient from '@commands/commit/withClient'

type CommitOptions = {
  model?: 'gpt-3.5-turbo' | 'gpt-4',
  context?: boolean
}

const generate = async (options: CommitOptions): Promise<void> => {
  if (!process.env.OPENAI_API_KEY) {
    return console.error(
      chalk.red(`Unable to locate OPENAI_API_KEY in environment`)
    )
  }

  const { stdout: diff } = await execa('git', ['diff', '--cached'])
  if (!diff) {
    return console.error(chalk.red('Could not find any staged files to commit'))
  }

  // Let the user specify additional context to give some guidance to the generated message
  let context
  if (!!options.context) {
    ;({ context } = await inquirer.prompt(
      {
        type: 'text',
        name: 'context',
        message: 'Provide additional context for the commit message'
      },
      {
        onCancel: () => process.exit()
      }
    ))
  }

  let message: ParsedMessage | void
  const gitmojis = await getEmojis()
  while (true) {
    message = await getGeneratedMessage(diff, gitmojis, context, options.model)
    if (!message) {
      return
    }

    const { confirm } = await inquirer.prompt({
      type: 'confirm',
      name: 'confirm',
      message: message.raw
    })

    if (confirm) {
      break
    }
  }

  // Sanity should not be able to get here but Flow needed it
  if (!message) {
    return console.error(chalk.red('Unable to generate commit message'))
  }

  await withClient({
    title: message.title,
    gitmoji: message.gitmoji,
    message: ''
  })
}

export default generate
