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
  scopePrompt: false
}

export const gitAbsoluteDir = '/Users/carloscuesta/GitHub/gitmoji-cli/.git'

export const commitTitle = 'Fix security issue'

export const commitTitleInvalid = 'Invalid commit `title'

export const clientCommitAnswers = {
  gitmoji: ':zap:',
  title: 'Improving performance issues.',
  message: 'Refactored code. Fixes #5'
}

export const clientCommitContactsConfig = '@A: A B <a@b.com>\n@B: B C <b@c.com>'

export const clientCommitAnswersWithScopeAndOptions = {
  ...clientCommitAnswers,
  scope: 'cli',
  refs: '#123',
  coAuthors: '@A,   Foo Bar <foo.bar@mail.com>,@B,@C'
}

export const clientCommitRefsMounted = 'Refs #123'
export const clientCommitCoAuthorsMounted =
  'Co-authored-by: A B <a@b.com>\nCo-authored-by: Foo Bar <foo.bar@mail.com>\nCo-authored-by: B C <b@c.com>'

export const commitResult = 'Commit result'

export const argv = 'commit'
