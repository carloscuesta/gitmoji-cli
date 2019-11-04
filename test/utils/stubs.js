export const commands = [
  'commit',
  'config',
  'hook',
  'init',
  'list',
  'remove',
  'search',
  'update'
]

export const cliMock = (options) => ({
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

export const optionsMock = {
  commit: jest.fn(),
  config: jest.fn(),
  hook: jest.fn(),
  init: jest.fn(),
  list: jest.fn(),
  remove: jest.fn(),
  search: jest.fn(),
  update: jest.fn()
}

export const gitmojis = [
  {
    emoji: '😍',
    code: ':heart_eyes:',
    description: 'Heart eyes'
  }
]
