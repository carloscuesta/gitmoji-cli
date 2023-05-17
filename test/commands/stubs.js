import { GITMOJIS_URL } from '../../src/utils/configurationVault'

export const gitmojis = [
  {
    emoji: '❤️',
    code: ':heart:',
    description: 'Love heart eyes',
    name: 'Love'
  },
  {
    emoji: '⚡️',
    code: ':zap:',
    description: 'Performance',
    name: 'Zap'
  }
]

export const searchQuery = 'LoVe'

export const configAnswers = {
  autoAdd: true,
  emojiFormat: 'emoji',
  signedCommit: true,
  scopePrompt: false,
  storyIdPrompt: false,
  messagePrompt: true,
  capitalizeTitle: true,
  gitmojisUrl: GITMOJIS_URL
}

export const gitAbsoluteDir = '/Users/carloscuesta/GitHub/gitmoji-cli/.git'

export const absoluteCoreHooksPath = '/etc/git/hooks'

export const relativeCoreHooksPath = '.git/hooks'

export const hooksPath =
  '/Users/carloscuesta/GitHub/gitmoji-cli/.git/hooks/prepare-commit-msg'

export const commitTitle = 'Fix security issue'

export const commitTitleInvalid = 'Invalid commit `title'

export const clientCommitAnswers = {
  gitmoji: ':zap:',
  title: 'Improving performance issues.',
  message: 'Refactored code. Fixes #5'
}

export const clientCommitAnswersWithScope = {
  ...clientCommitAnswers,
  scope: 'cli'
}

export const commitResult = 'Commit result'

export const argv = 'commit'
export const commitSource = ''

export const emptyDefaultCommitContent = { title: null, message: null }

export const defaultCommitContent = {
  title: 'commit title',
  message: 'commit message'
}

export const url = 'https://carloscuesta.me'
