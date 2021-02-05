import inquirer from 'inquirer'
import execa from 'execa'
import fs from 'fs'

const mockProcess = require('jest-mock-process')

import configurationVault from '../../src/utils/configurationVault'
import getDefaultCommitContent from '../../src/utils/getDefaultCommitContent'
import getEmojis from '../../src/utils/getEmojis'
import isHookCreated from '../../src/utils/isHookCreated'
import commit from '../../src/commands/commit'
import guard from '../../src/commands/commit/guard'
import prompts from '../../src/commands/commit/prompts'
import * as stubs from './stubs'
import { COMMIT_MESSAGE_SOURCE } from '../../src/commands/commit/withHook/index'
import type { Answers } from '../../src/commands/commit/prompts'

jest.mock('../../src/utils/getDefaultCommitContent')
jest.mock('../../src/utils/getEmojis')
jest.mock('../../src/utils/isHookCreated')
jest.mock('../../src/utils/configurationVault')

describe('commit command', () => {
  describe('withClient', () => {
    describe('with no autoAdd and no signed commits and no scope', () => {
      beforeAll(() => {
        console.log = jest.fn()
        execa.mockReturnValue({ stdout: stubs.commitResult })
        inquirer.prompt.mockReturnValue(
          Promise.resolve(stubs.clientCommitAnswers)
        )
        getEmojis.mockResolvedValue(stubs.gitmojis)
        isHookCreated.mockResolvedValue(false)
        getDefaultCommitContent.mockReturnValueOnce(
          stubs.emptyDefaultCommitContent
        )
        commit('client')
      })

      it('should call inquirer with prompts', () => {
        expect(inquirer.prompt.mock.calls).toMatchSnapshot()
      })

      it('should call execa with the commit command based on answers', () => {
        expect(execa).toHaveBeenCalledWith('git', [
          'commit',
          '-m',
          `${stubs.clientCommitAnswers.gitmoji} ${stubs.clientCommitAnswers.title}`,
          '-m',
          stubs.clientCommitAnswers.message
        ])
      })

      it('should print the result to the console', () => {
        expect(console.log).toHaveBeenCalledWith(stubs.commitResult)
      })
    })

    describe('with autoAdd, signed commits and scope', () => {
      beforeAll(() => {
        console.log = jest.fn()
        execa.mockReturnValue({ stdout: stubs.commitResult })
        inquirer.prompt.mockReturnValue(
          Promise.resolve(stubs.clientCommitAnswersWithScope)
        )
        getEmojis.mockResolvedValue(stubs.gitmojis)
        isHookCreated.mockResolvedValue(false)
        configurationVault.getAutoAdd.mockReturnValue(true)
        configurationVault.getSignedCommit.mockReturnValue(true)
        getDefaultCommitContent.mockReturnValueOnce(
          stubs.emptyDefaultCommitContent
        )
        commit('client')
      })

      it('should call inquirer with prompts', () => {
        expect(inquirer.prompt.mock.calls).toMatchSnapshot()
      })

      it('should call execa with the add command', () => {
        expect(execa).toHaveBeenCalledWith('git', ['add', '.'])
      })

      it('should call execa with the commit command based on answers', () => {
        expect(execa).toHaveBeenLastCalledWith('git', [
          'commit',
          '-S',
          '-m',
          `${stubs.clientCommitAnswersWithScope.gitmoji} (${stubs.clientCommitAnswersWithScope.scope}): ${stubs.clientCommitAnswersWithScope.title}`,
          '-m',
          stubs.clientCommitAnswersWithScope.message
        ])
      })

      it('should print the result to the console', () => {
        expect(console.log).toHaveBeenCalledWith(stubs.commitResult)
      })
    })

    describe('with the commit hook created', () => {
      beforeAll(() => {
        console.log = jest.fn()
        inquirer.prompt.mockReturnValue(
          Promise.resolve(stubs.clientCommitAnswers)
        )
        getEmojis.mockResolvedValue(stubs.gitmojis)
        isHookCreated.mockResolvedValue(true)
        getDefaultCommitContent.mockReturnValueOnce(
          stubs.emptyDefaultCommitContent
        )
        commit('client')
      })

      it('should call inquirer with prompts', () => {
        expect(inquirer.prompt.mock.calls).toMatchSnapshot()
      })

      it('should stop the commit because the hook is created and log the explanation to the user', () => {
        expect(console.log).toHaveBeenCalledWith(expect.any(String))
        expect(execa).not.toHaveBeenCalledWith()
      })
    })
  })

  describe('withHook', () => {
    describe('without scope', () => {
      beforeAll(async () => {
        console.log = jest.fn()
        inquirer.prompt.mockReturnValue(
          Promise.resolve(stubs.clientCommitAnswers)
        )
        getEmojis.mockResolvedValue(stubs.gitmojis)
        mockProcess.mockProcessExit()
        process.argv[3] = stubs.argv
        process.argv[COMMIT_MESSAGE_SOURCE] = undefined
        getDefaultCommitContent.mockReturnValueOnce(
          stubs.emptyDefaultCommitContent
        )
        execa.mockReturnValueOnce(Promise.resolve(stubs.gitAbsoluteDir))
        fs.existsSync.mockReturnValueOnce(false).mockReturnValueOnce(false)
        await commit('hook')
      })

      it('should commit using the hook', () => {
        expect(fs.writeFileSync).toHaveBeenCalledWith(
          stubs.argv,
          `${stubs.clientCommitAnswers.gitmoji} ${stubs.clientCommitAnswers.title}\n\n${stubs.clientCommitAnswers.message}`
        )
      })

      it('should call process.exit', () => {
        expect(process.exit).toHaveBeenCalledWith(0)
      })
    })

    describe('with scope', () => {
      beforeAll(async () => {
        console.log = jest.fn()
        inquirer.prompt.mockReturnValue(
          Promise.resolve(stubs.clientCommitAnswersWithScope)
        )
        getEmojis.mockResolvedValue(stubs.gitmojis)
        mockProcess.mockProcessExit()
        process.argv[3] = stubs.argv
        process.argv[COMMIT_MESSAGE_SOURCE] = stubs.commitSource
        getDefaultCommitContent.mockReturnValueOnce(
          stubs.emptyDefaultCommitContent
        )
        execa.mockReturnValueOnce(Promise.resolve(stubs.gitAbsoluteDir))
        fs.existsSync.mockReturnValueOnce(false).mockReturnValueOnce(false)
        await commit('hook')
      })

      it('should commit using the hook', () => {
        expect(fs.writeFileSync).toHaveBeenCalledWith(
          stubs.argv,
          `${stubs.clientCommitAnswersWithScope.gitmoji} (${stubs.clientCommitAnswersWithScope.scope}): ${stubs.clientCommitAnswersWithScope.title}\n\n${stubs.clientCommitAnswersWithScope.message}`
        )
      })

      it('should call process.exit', () => {
        expect(process.exit).toHaveBeenCalledWith(0)
      })
    })

    describe('when rebasing', () => {
      it('should cancel the hook', async () => {
        /*
        Use an exception to suspend code execution to simulate the process.exit triggered
        when the hook mode detect that the user is rebasing. (Simulated to not kill the tests)
        Simulation needed because if we just mock process exit, then the code execution resume in the test.
        */
        process.argv[COMMIT_MESSAGE_SOURCE] = stubs.commitSource
        mockProcess.mockProcessExit(new Error('ProcessExit0'))
        execa.mockReturnValueOnce(Promise.resolve(stubs.gitAbsoluteDir))
        // mock that we found one of the rebase trigger (file existence in .git)
        fs.existsSync.mockReturnValueOnce(true)

        try {
          await commit('hook')
        } catch (e) {
          expect(e.message).toMatch('ProcessExit0')
        }

        expect(process.exit).toHaveBeenCalledWith(0)
      })
    })

    describe('when amending', () => {
      it('should cancel the hook', async () => {
        /*
        Use an exception to suspend code execution to simulate the process.exit triggered
        when the hook mode detect that the user is rebasing. (Simulated to not kill the tests)
        Simulation needed because if we just mock process exit, then the code execution resume in the test.
        */
        mockProcess.mockProcessExit(new Error('ProcessExit0'))
        execa.mockReturnValueOnce(Promise.resolve(stubs.gitAbsoluteDir))
        // mock that we are amending
        process.argv[COMMIT_MESSAGE_SOURCE] = 'commit sha123'

        try {
          await commit('hook')
        } catch (e) {
          expect(e.message).toMatch('ProcessExit0')
        }

        expect(process.exit).toHaveBeenCalledWith(0)
      })
    })

    describe('when receiving a signal interrupt', () => {
      it('should call process.exit(0)', async () => {
        console.warn = jest.fn()

        // mock process.on and process.kill to test registerHookInterruptionHandler
        const processEvents = {}
        jest.spyOn(process, 'on').mockImplementation((signal, cb) => {
          processEvents[signal] = cb
        })
        jest.spyOn(process, 'kill').mockImplementation((pid, signal) => {
          processEvents[signal]()
        })

        execa.mockReturnValueOnce(Promise.resolve(stubs.gitAbsoluteDir))
        fs.existsSync.mockReturnValueOnce(false).mockReturnValueOnce(false)

        inquirer.prompt.mockImplementation(() => {
          process.kill(process.pid, 'SIGINT')
        })
        getEmojis.mockResolvedValue(stubs.gitmojis)

        // Use an exception to suspend code execution to simulate process.exit
        mockProcess.mockProcessExit(new Error('SIGINT'))
        process.argv[3] = stubs.argv
        process.argv[COMMIT_MESSAGE_SOURCE] = stubs.commitSource

        getDefaultCommitContent.mockReturnValueOnce(
          stubs.emptyDefaultCommitContent
        )

        try {
          await commit('hook')
        } catch (e) {
          expect(e.message).toMatch('SIGINT')
        }

        expect(console.warn).toHaveBeenCalledWith('gitmoji-cli was interrupted')
        expect(process.exit).toHaveBeenCalledWith(0)
      })
    })
  })

  describe('guard', () => {
    it('should match guard', () => {
      expect(guard).toMatchSnapshot()
    })

    describe('title', () => {
      it('should return true when valid', () => {
        expect(guard.title(stubs.commitTitle)).toBe(true)
      })

      it('should return error message when empty', () => {
        expect(guard.title('')).toEqual(expect.any(String))
      })

      it('should return error message with invalid characters', () => {
        expect(guard.title(stubs.commitTitleInvalid)).toEqual(
          expect.any(String)
        )
      })
    })

    describe('message', () => {
      it('should return true when valid', () => {
        expect(guard.title(stubs.commitTitle)).toBe(true)
      })

      it('should return error message when empty', () => {
        expect(guard.title('')).toEqual(expect.any(String))
      })

      it('should return error message with invalid characters', () => {
        expect(guard.title(stubs.commitTitleInvalid)).toEqual(
          expect.any(String)
        )
      })
    })

    describe('scope', () => {
      it('should return true when valid', () => {
        expect(guard.title(stubs.commitTitle)).toBe(true)
      })

      it('should return error message when empty', () => {
        expect(guard.title('')).toEqual(expect.any(String))
      })

      it('should return error message with invalid characters', () => {
        expect(guard.title(stubs.commitTitleInvalid)).toEqual(
          expect.any(String)
        )
      })
    })
  })

  describe('prompts', () => {
    it('should register the autoComplete inquirer prompt', () => {
      expect(inquirer.registerPrompt).toHaveBeenCalledWith(
        'autocomplete',
        expect.any(Function)
      )
    })

    describe('without scope prompt', () => {
      beforeAll(() => {
        configurationVault.getScopePrompt.mockReturnValue(false)
      })

      it('should match the array of questions', () => {
        expect(
          prompts(
            stubs.gitmojis,
            stubs.emptyDefaultCommitContent,
            stubs.emptyDefaultAnswers
          )
        ).toMatchSnapshot()
      })

      it('should match the default title and message', () => {
        expect(
          prompts(
            stubs.gitmojis,
            stubs.defaultCommitContent,
            stubs.emptyDefaultAnswers
          )
        ).toMatchSnapshot()
      })

      it('should ask unanswered questions', () => {
        const defaultAnswers: $Shape<Answers> = {
          gitmoji: ':sparkles:',
          ...stubs.defaultCommitContent
        }
        expect(
          prompts(stubs.gitmojis, stubs.defaultCommitContent, defaultAnswers)
        ).toEqual([])
      })
    })

    describe('with scope prompt', () => {
      beforeAll(() => {
        configurationVault.getScopePrompt.mockReturnValue(true)
      })

      it('should match the array of questions', () => {
        expect(
          prompts(
            stubs.gitmojis,
            stubs.emptyDefaultCommitContent,
            stubs.emptyDefaultAnswers
          )
        ).toMatchSnapshot()
      })

      it('should not fill default title and message', () => {
        expect(
          prompts(
            stubs.gitmojis,
            stubs.emptyDefaultCommitContent,
            stubs.emptyDefaultAnswers
          )
        ).toMatchSnapshot()
      })

      it('should ask unanswered questions', () => {
        const defaultAnswers: $Shape<Answers> = {
          gitmoji: ':sparkles:',
          ...stubs.defaultCommitContent
        }
        expect(
          prompts(stubs.gitmojis, stubs.defaultCommitContent, defaultAnswers)
        ).toMatchSnapshot()
      })
    })
  })
})
