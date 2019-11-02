const prompts = {
  gitmoji: ':zap:',
  title: 'Improving performance issues.',
  message: 'Refactored code. Fixes #5'
}

const promptsJira = {
  gitmoji: ':zap:',
  title: 'Improving performance issues.',
  message: 'Refactored code. Fixes ABC-123'
}

const promptsScope = {
  gitmoji: ':zap:',
  scope: 'Scope',
  title: 'Improving performance issues.',
  message: 'Refactored code.',
  reference: '5'
}

const gitmojis = [{ emoji: '⚡️', code: ':zap:', description: '', name: 'zap' }]

const invalidTitleMessageChar = '`'

const commands = [
  'commit',
  'config',
  'hook',
  'init',
  'list',
  'remove',
  'search',
  'update'
]

const cliMock = (options) => ({
  flags: {
    commit: options.commit || false,
    config: options.config || false,
    hook: options.hook || false,
    init: options.init || false,
    list: options.list || false,
    remove: options.remove || false,
    search: options.search || false,
    update: options.update || false
  },
  showHelp: jest.fn()
})

const optionsMock = {
  commit: jest.fn(),
  config: jest.fn(),
  hook: jest.fn(),
  init: jest.fn(),
  list: jest.fn(),
  remove: jest.fn(),
  search: jest.fn(),
  update: jest.fn()
}

const titleMaxLength = 48

module.exports = {
  cliMock,
  commands,
  gitmojiApiClient,
  gitmojis,
  invalidTitleMessageChar,
  optionsMock,
  prompts,
  promptsJira,
  promptsScope,
  titleMaxLength
}
