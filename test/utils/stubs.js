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
    emoji: '🎨',
    code: ':art:',
    description: 'Improving structure / format of the code.',
    name: 'art'
  },
  {
    emoji: '⚡️',
    code: ':zap:',
    description: 'Improving performance.',
    name: 'zap'
  },
  {
    emoji: '🔥',
    code: ':fire:',
    description: 'Removing code or files.',
    name: 'fire'
  },
  { emoji: '🐛', code: ':bug:', description: 'Fixing a bug.', name: 'bug' },
  {
    emoji: '🚑',
    code: ':ambulance:',
    description: 'Critical hotfix.',
    name: 'ambulance'
  },
  {
    emoji: '✨',
    code: ':sparkles:',
    description: 'Introducing new features.',
    name: 'sparkles'
  },
  {
    emoji: '📝',
    code: ':pencil:',
    description: 'Writing docs.',
    name: 'pencil'
  },
  {
    emoji: '🚀',
    code: ':rocket:',
    description: 'Deploying stuff.',
    name: 'rocket'
  },
  {
    emoji: '💄',
    code: ':lipstick:',
    description: 'Updating the UI and style files.',
    name: 'lipstick'
  },
  { emoji: '🎉', code: ':tada:', description: 'Initial commit.', name: 'tada' },
  {
    emoji: '✅',
    code: ':white_check_mark:',
    description: 'Updating tests.',
    name: 'white-check-mark'
  },
  {
    emoji: '🔒',
    code: ':lock:',
    description: 'Fixing security issues.',
    name: 'lock'
  },
  {
    emoji: '🍎',
    code: ':apple:',
    description: 'Fixing something on macOS.',
    name: 'apple'
  },
  {
    emoji: '🐧',
    code: ':penguin:',
    description: 'Fixing something on Linux.',
    name: 'penguin'
  },
  {
    emoji: '🏁',
    code: ':checkered_flag:',
    description: 'Fixing something on Windows.',
    name: 'checkered-flag'
  },
  {
    emoji: '🤖',
    code: ':robot:',
    description: 'Fixing something on Android.',
    name: 'robot'
  },
  {
    emoji: '🍏',
    code: ':green_apple:',
    description: 'Fixing something on iOS.',
    name: 'green-apple'
  },
  {
    emoji: '🔖',
    code: ':bookmark:',
    description: 'Releasing / Version tags.',
    name: 'bookmark'
  },
  {
    emoji: '🚨',
    code: ':rotating_light:',
    description: 'Removing linter warnings.',
    name: 'rotating-light'
  },
  {
    emoji: '🚧',
    code: ':construction:',
    description: 'Work in progress.',
    name: 'construction'
  },
  {
    emoji: '💚',
    code: ':green_heart:',
    description: 'Fixing CI Build.',
    name: 'green-heart'
  },
  {
    emoji: '⬇️',
    code: ':arrow_down:',
    description: 'Downgrading dependencies.',
    name: 'arrow-down'
  },
  {
    emoji: '⬆️',
    code: ':arrow_up:',
    description: 'Upgrading dependencies.',
    name: 'arrow-up'
  },
  {
    emoji: '📌',
    code: ':pushpin:',
    description: 'Pinning dependencies to specific versions.',
    name: 'pushpin'
  },
  {
    emoji: '👷',
    code: ':construction_worker:',
    description: 'Adding CI build system.',
    name: 'construction-worker'
  },
  {
    emoji: '📈',
    code: ':chart_with_upwards_trend:',
    description: 'Adding analytics or tracking code.',
    name: 'chart-with-upwards-trend'
  },
  {
    emoji: '♻️',
    code: ':recycle:',
    description: 'Refactoring code.',
    name: 'recycle'
  },
  {
    emoji: '🐳',
    code: ':whale:',
    description: 'Work about Docker.',
    name: 'whale'
  },
  {
    emoji: '➕',
    code: ':heavy_plus_sign:',
    description: 'Adding a dependency.',
    name: 'heavy-plus-sign'
  },
  {
    emoji: '➖',
    code: ':heavy_minus_sign:',
    description: 'Removing a dependency.',
    name: 'heavy-minus-sign'
  },
  {
    emoji: '🔧',
    code: ':wrench:',
    description: 'Changing configuration files.',
    name: 'wrench'
  },
  {
    emoji: '🌐',
    code: ':globe_with_meridians:',
    description: 'Internationalization and localization.',
    name: 'globe-with-meridians'
  },
  {
    emoji: '✏️',
    code: ':pencil2:',
    description: 'Fixing typos.',
    name: 'pencil'
  },
  {
    emoji: '💩',
    code: ':poop:',
    description: 'Writing bad code that needs to be improved.',
    name: 'poop'
  },
  {
    emoji: '⏪',
    code: ':rewind:',
    description: 'Reverting changes.',
    name: 'rewind'
  },
  {
    emoji: '🔀',
    code: ':twisted_rightwards_arrows:',
    description: 'Merging branches.',
    name: 'twisted-rightwards-arrows'
  },
  {
    emoji: '📦',
    code: ':package:',
    description: 'Updating compiled files or packages.',
    name: 'package'
  },
  {
    emoji: '👽',
    code: ':alien:',
    description: 'Updating code due to external API changes.',
    name: 'alien'
  },
  {
    emoji: '🚚',
    code: ':truck:',
    description: 'Moving or renaming files.',
    name: 'truck'
  },
  {
    emoji: '📄',
    code: ':page_facing_up:',
    description: 'Adding or updating license.',
    name: 'page-facing-up'
  },
  {
    emoji: '💥',
    code: ':boom:',
    description: 'Introducing breaking changes.',
    name: 'boom'
  },
  {
    emoji: '🍱',
    code: ':bento:',
    description: 'Adding or updating assets.',
    name: 'bento'
  },
  {
    emoji: '👌',
    code: ':ok_hand:',
    description: 'Updating code due to code review changes.',
    name: 'ok-hand'
  },
  {
    emoji: '♿️',
    code: ':wheelchair:',
    description: 'Improving accessibility.',
    name: 'wheelchair'
  },
  {
    emoji: '💡',
    code: ':bulb:',
    description: 'Documenting source code.',
    name: 'bulb'
  },
  {
    emoji: '🍻',
    code: ':beers:',
    description: 'Writing code drunkenly.',
    name: 'beers'
  },
  {
    emoji: '💬',
    code: ':speech_balloon:',
    description: 'Updating text and literals.',
    name: 'speech-balloon'
  },
  {
    emoji: '🗃',
    code: ':card_file_box:',
    description: 'Performing database related changes.',
    name: 'card-file-box'
  },
  {
    emoji: '🔊',
    code: ':loud_sound:',
    description: 'Adding logs.',
    name: 'loud-sound'
  },
  { emoji: '🔇', code: ':mute:', description: 'Removing logs.', name: 'mute' },
  {
    emoji: '👥',
    code: ':busts_in_silhouette:',
    description: 'Adding contributor(s).',
    name: 'busts-in-silhouette'
  },
  {
    emoji: '🚸',
    code: ':children_crossing:',
    description: 'Improving user experience / usability.',
    name: 'children-crossing'
  },
  {
    emoji: '🏗',
    code: ':building_construction:',
    description: 'Making architectural changes.',
    name: 'building-construction'
  },
  {
    emoji: '📱',
    code: ':iphone:',
    description: 'Working on responsive design.',
    name: 'iphone'
  },
  {
    emoji: '🤡',
    code: ':clown_face:',
    description: 'Mocking things.',
    name: 'clown-face'
  },
  {
    emoji: '🥚',
    code: ':egg:',
    description: 'Adding an easter egg.',
    name: 'egg'
  },
  {
    emoji: '🙈',
    code: ':see_no_evil:',
    description: 'Adding or updating a .gitignore file',
    name: 'see-no-evil'
  },
  {
    emoji: '📸',
    code: ':camera_flash:',
    description: 'Adding or updating snapshots',
    name: 'camera-flash'
  },
  {
    emoji: '⚗',
    code: ':alembic:',
    description: 'Experimenting new things',
    name: 'alembic'
  },
  { emoji: '🔍', code: ':mag:', description: 'Improving SEO', name: 'mag' },
  {
    emoji: '☸️',
    code: ':wheel_of_dharma:',
    description: 'Work about Kubernetes',
    name: 'wheel-of-dharma'
  },
  {
    emoji: '🏷️',
    code: ':label:',
    description: 'Adding or updating types (Flow, TypeScript)',
    name: 'label'
  }
]

export const gitmojisResponse = {
  gitmojis: [
    {
      emoji: '🎨',
      entity: '&#x1f3a8;',
      code: ':art:',
      description: 'Improving structure / format of the code.',
      name: 'art'
    },
    {
      emoji: '⚡️',
      entity: '&#x26a1;',
      code: ':zap:',
      description: 'Improving performance.',
      name: 'zap'
    }
  ]
}

export const gitAbsoluteDir = '/Users/carloscuesta/GitHub/gitmoji-cli/.git'

export const commitContent = Object.freeze({
  gitmoji: ':sparkles:',
  title: 'commit title',
  message: 'commit message'
})
