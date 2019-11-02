// @flow
import chalk from 'chalk'

type Gitmoji = {
  emoji: string,
  code: string,
  description: string
}

const printEmojis = (gitmojis: Array<Gitmoji>) => {
  return gitmojis.forEach((gitmoji) => {
    console.log(
      `${gitmoji.emoji} - ${chalk.blue(gitmoji.code)} - ${gitmoji.description}`
    )
  })
}

export default printEmojis
