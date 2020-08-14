import inquirer from 'inquirer'
import execa from 'execa'
import fs from 'fs'
const mockProcess = require('jest-mock-process')

import configurationVault from '../../src/utils/configurationVault'
import getEmojis from '../../src/utils/getEmojis'
import isHookCreated from '../../src/utils/isHookCreated'
import commit from '../../src/commands/commit'
import guard from '../../src/commands/commit/guard'
import prompts from '../../src/commands/commit/prompts'
import * as stubs from './stubs'

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
      beforeAll(() => {
        console.log = jest.fn()
        inquirer.prompt.mockReturnValue(
          Promise.resolve(stubs.clientCommitAnswers)
        )
        getEmojis.mockResolvedValue(stubs.gitmojis)
        mockProcess.mockProcessExit()
        process.argv[3] = stubs.argv
        commit('hook')
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
      beforeAll(() => {
        console.log = jest.fn()
        inquirer.prompt.mockReturnValue(
          Promise.resolve(stubs.clientCommitAnswersWithScope)
        )
        getEmojis.mockResolvedValue(stubs.gitmojis)
        mockProcess.mockProcessExit()
        process.argv[3] = stubs.argv
        commit('hook')
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

    describe('when the commit message is already defined', () => {
      it('should cancel the hook', async () => {
        console.warn  = jest.fn()

        // Use an exception to suspend code execution to simulate process.exit
        mockProcess.mockProcessExit(new Error('ProcessExit0'))
        fs.existsSync.mockReturnValueOnce(true)
        fs.lstatSync.mockReturnValueOnce({ isFile: () => true })
        fs.readFileSync.mockReturnValueOnce('message')
        process.argv[3] = stubs.argv

        try {
          await commit('hook')
        } catch (e) {
          expect(e.message).toMatch('ProcessExit0')
        }

        expect(console.warn).toHaveBeenCalledWith(
          'A commit message is already set, cancelling gitmoji\n'
        )
        expect(process.exit).toHaveBeenCalledWith(0)
      })
    })

    describe('when receiving a signal interrupt', () => {
      it('should call process.exit(0)', async () => {
        console.warn  = jest.fn()

        // mock process.on and process.kill to test registerHookInterruptionHandler
        const processEvents = {}
        jest.spyOn(process, 'on').mockImplementation((signal, cb) => {
          processEvents[signal] = cb
        })
        jest.spyOn(process, 'kill').mockImplementation((pid, signal) => {
          processEvents[signal]()
        })

        inquirer.prompt.mockImplementation(() => {
          process.kill(process.pid, 'SIGINT')
        })
        getEmojis.mockResolvedValue(stubs.gitmojis)

        // Use an exception to suspend code execution to simulate process.exit
        mockProcess.mockProcessExit(new Error('SIGINT'))
        process.argv[3] = stubs.argv

        try {
          await commit('hook')
        } catch (e) {
          expect(e.message).toMatch('SIGINT')
        }

        expect(console.warn).toHaveBeenCalledWith(
          'gitmoji-cli was interrupted'
        )
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
      it('should match the array of questions', () => {
        expect(prompts(stubs.gitmojis)).toMatchSnapshot()
      })
    })

    describe('with scope prompt', () => {
      beforeAll(() => {
        configurationVault.getScopePrompt.mockReturnValue(true)
      })

      it('should match the array of questions', () => {
        expect(prompts(stubs.gitmojis)).toMatchSnapshot()
      })
    })
  })
})
