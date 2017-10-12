/* global describe, it, expect */
const GitmojiCli = require('../src/gitmoji')
const config = require('../src/config')
const prompts = require('../src/prompts')
const constants = require('../src/constants')
const pkg = require('../package.json')
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

  it('should match for setIssueFormat and getIssueFormat', () => {
    config.setIssueFormat('github')
    expect(config.getIssueFormat()).toMatchSnapshot()
  })

  it('should match for setSignedCommit and getSignedCommit', () => {
    config.setSignedCommit('no')
    expect(config.getSignedCommit()).toMatchSnapshot()
  })
})

describe('gitmoji module', () => {
  it('should match for gitmoji class', () => {
    expect(gitmojiCli).toMatchSnapshot()
  })

  describe('version', () => {
    it('should return the version number equal to the package.json one', () => {
      expect(gitmojiCli.version(pkg.version)).toEqual(pkg.version)
    })
  })

  describe('commit', () => {
    it('should match for the commit snapshot with the given prompts', () => {
      config.setIssueFormat('github')
      expect(gitmojiCli._commit(stubs.prompts)).toMatchSnapshot()
    })

    it('should match for the commit snapshot with the given prompts', () => {
      config.setIssueFormat('jira')
      expect(gitmojiCli._commit(stubs.promptsJira)).toMatchSnapshot()
    })
  })

  describe('_isAGitRepo', () => {
    it('should return true if a git repo is found', () => {
      expect(gitmojiCli._isAGitRepo()).toBe(true)
    })
  })

  describe('_isCommitSigned', () => {
    it('should have the signed commit flag "-S"', () => {
      expect(gitmojiCli._isCommitSigned(true)).toMatchSnapshot()
    })

    it('should not have the signed commit flag', () => {
      expect(gitmojiCli._isCommitSigned(false)).toMatchSnapshot()
    })
  })
})
