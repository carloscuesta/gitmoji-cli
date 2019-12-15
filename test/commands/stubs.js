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
  scopeTemplate: '(%s): '
}

export const gitAbsoluteDir = '/Users/carloscuesta/GitHub/gitmoji-cli/.git'

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
