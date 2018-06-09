/* global describe, it, expect */
const GitmojiCli = require('../src/gitmoji')
const config = require('../src/config')
const constants = require('../src/constants')
const guard = require('../src/guard')
const prompts = require('../src/prompts')
const utils = require('../src/utils')
const stubs = require('./stubs')

const gitmojiCli = new GitmojiCli(stubs.gitmojiApiClient)

describe('constants module', () => {
  it('should match for the exported constants', () => {
    expect(constants).toMatchSnapshot()
  })
})

describe('prompts module', () => {
  it('should match for the config prompts', () => {
    expect(prompts.config).toMatchSnapshot()
  })

  it('should match for the gitmoji prompts', () => {
    const gitmojiPrompt = prompts.gitmoji(stubs.gitmojis, 'code', 'github')
    expect(prompts.gitmoji(gitmojiPrompt)).toMatchSnapshot()
  })

  it('should commit using the text emoji', () => {
    config.setEmojiFormat('code')
    const question = prompts.gitmoji(stubs.gitmojis, 'code', 'github')[0]
    return question.source(null, 'zap').then((emojis) => {
      expect(emojis[0].value).toMatchSnapshot()
    })
  })

  it('should commit using the unicode emoji', () => {
    config.setEmojiFormat('emoji')
    const question = prompts.gitmoji(stubs.gitmojis, 'emoji', 'github')[0]
    return question.source(null, 'zap').then((emojis) => {
      expect(emojis[0].value).toMatchSnapshot()
    })
  })
})

describe('config module', () => {
  it('should match the exported methods', () => {
    expect(config).toMatchSnapshot()
  })

  it('should match for setAutoAdd and getAutoAdd', () => {
    config.setAutoAdd(false)
    expect(config.getAutoAdd()).toMatchSnapshot()
  })

  it('should match for setEmojiFormat and getEmojiFormat', () => {
    config.setEmojiFormat('code')
    expect(config.getEmojiFormat()).toMatchSnapshot()
  })

  it('should match for setSignedCommit and getSignedCommit', () => {
    config.setSignedCommit(false)
    expect(config.getSignedCommit()).toMatchSnapshot()
  })
})

describe('gitmoji module', () => {
  it('should match for gitmoji class', () => {
    expect(gitmojiCli).toMatchSnapshot()
  })

  describe('commit', () => {
    it('should match for the commit snapshot with the given prompts', () => {
      expect(gitmojiCli._commit(stubs.prompts)).toMatchSnapshot()
    })

    it('should match for the commit snapshot with the given prompts', () => {
      expect(gitmojiCli._commit(stubs.promptsJira)).toMatchSnapshot()
    })
  })

  describe('_isAGitRepo', () => {
    it('should return true if a git repo is found', () => {
      expect(gitmojiCli._isAGitRepo()).toBe(true)
    })
  })
})

describe('utils module', () => {
  describe('findGitmojiCommand', () => {
    stubs.commands.map((command) => {
      it(`it should match ${command} command`, () => {
        utils.findGitmojiCommand(
          stubs.cliMock({ [command]: true }),
          stubs.optionsMock
        )
        expect(stubs.optionsMock[command]).toHaveBeenCalled()
      })
    })
  })

  describe('inputCountTransformer', () => {
    it('should match for an input with characters count string', () => {
      expect(
        utils.inputCountTransformer(stubs.prompts.title, stubs.titleMaxLength)
      ).toMatchSnapshot()
    })
  })
})

describe('guard module', () => {
  describe('title', () => {
    it('should return true when is valid', () => {
      expect(guard.title(stubs.prompts.title)).toBe(true)
    })

    it('should return error message when contains invalid characters', () => {
      expect(guard.title(stubs.invalidTitleMessageChar)).toMatchSnapshot()
    })

    it('should return an error message when its empty', () => {
      expect(guard.title(undefined)).toMatchSnapshot()
    })
  })

  describe('message', () => {
    it('should return true when is valid', () => {
      expect(guard.message(stubs.prompts.message)).toBe(true)
    })

    it('should return error message when contains invalid characters', () => {
      expect(guard.message(stubs.invalidTitleMessageChar)).toMatchSnapshot()
    })
  })
})
