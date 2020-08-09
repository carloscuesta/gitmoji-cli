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
export const commitCoAuthorsNoContact = 'A B <a@b.com>'
export const commitCoAuthorsWithValidContacts = '@A, @B'

export const clientCommitAnswersWithScopeAndOptions = {
  ...clientCommitAnswers,
  scope: 'cli',
  refs: '#123',
  coAuthors: '@A,   Foo Bar <foo.bar@mail.com>,@B,@C'
}

export const clientCommitRefsMounted = 'Refs #123'
export const clientCommitCoAuthorsMounted =
  'Co-authored-by: A B <a@b.com>\nCo-authored-by: Foo Bar <foo.bar@mail.com>\nCo-authored-by: B C <b@c.com>'

export const commitContactsNotFoundError = `Contact @C not found. You have the following contacts: ${clientCommitContactsConfig.replace(
  '\n',
  ', '
)}`

export const invalidCoAuthorsEntries = [
  'a',
  'Foo foo.bar@mail.com',
  'foo@mail.com',
  '<foo@mail.com>',
  'Foo<foo@mail.com>'
]

export const commitInvalidCoAuthorError =
  'Enter valid co-authors. E.g: @A, name <name@example.com>'

export const commitResult = 'Commit result'

export const coAuthorsInputFiltered = [
  [
    '@A, @A,  @B,name <name@example.com>, test <name@example.com>, test <name@example.com>',
    '@A, @B, name <name@example.com>, test <name@example.com>'
  ]
]

export const refsFilterInput = 'Refs #123 #432   !234'
export const refsFilterInputFiltered = '#123 #432 !234'

export const argv = 'commit'
