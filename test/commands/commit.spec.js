import inquirer from 'inquirer'
import { execa } from 'execa'
import fs from 'fs'
import chalk from 'chalk'
import { mockProcessExit } from 'jest-mock-process'

import configurationVault from '@utils/configurationVault'
import getDefaultCommitContent from '@utils/getDefaultCommitContent'
import getEmojis from '@utils/getEmojis'
import isHookCreated from '@utils/isHookCreated'
import commit from '@commands/commit'
import guard from '@commands/commit/guard'
import prompts from '@commands/commit/prompts'
import * as stubs from './stubs'
import { COMMIT_MESSAGE_SOURCE } from '@commands/commit/withHook/index'

jest.mock('@utils/getDefaultCommitContent', () => jest.fn().mockReturnValue({}))
jest.mock('@utils/getEmojis')
jest.mock('@utils/isHookCreated')
jest.mock('@utils/configurationVault')

describe('commit command', () => {
  describe('withClient', () => {
    describe('with no autoAdd and no signed commits and no scope', () => {
      beforeAll(() => {
        execa.mockReturnValue({ stdout: stubs.commitResult })
        inquirer.prompt.mockReturnValue(
          Promise.resolve(stubs.clientCommitAnswers)
        )
        getEmojis.mockResolvedValue(stubs.gitmojis)
        isHookCreated.mockResolvedValue(false)
        getDefaultCommitContent.mockReturnValueOnce(
          stubs.emptyDefaultCommitContent
        )
        commit({ mode: 'client' })
        configurationVault.getMessagePrompt.mockReturnValue(true)
      })

      it('should call inquirer with prompts', () => {
        expect(inquirer.prompt.mock.calls).toMatchSnapshot()
      })

      it('should call execa with the commit command based on answers', () => {
        expect(execa).toHaveBeenCalledWith(
          'git',
          [
            'commit',
            '-m',
            `"${stubs.clientCommitAnswers.gitmoji} ${stubs.clientCommitAnswers.title}"`,
            '-m',
            `"${stubs.clientCommitAnswers.message}"`
          ],
          {
            shell: true,
            buffer: false,
            stdio: 'inherit'
          }
        )
      })
    })

    describe('with autoAdd, signed commits and scope', () => {
      beforeAll(() => {
        execa.mockReturnValue({ stdout: stubs.commitResult })
        inquirer.prompt.mockReturnValue(
          Promise.resolve(stubs.clientCommitAnswersWithScope)
        )
        getEmojis.mockResolvedValue(stubs.gitmojis)
        isHookCreated.mockResolvedValue(false)
        configurationVault.getAutoAdd.mockReturnValue(true)
        getDefaultCommitContent.mockReturnValueOnce(
          stubs.emptyDefaultCommitContent
        )
        commit({ mode: 'client' })
      })

      it('should call inquirer with prompts', () => {
        expect(inquirer.prompt.mock.calls).toMatchSnapshot()
      })

      it('should call execa with the add command', () => {
        expect(execa).toHaveBeenCalledWith('git', ['add', '.'])
      })

      it('should call execa with the commit command based on answers', () => {
        expect(execa).toHaveBeenLastCalledWith(
          'git',
          [
            'commit',
            '-am',
            `"${stubs.clientCommitAnswersWithScope.gitmoji} (${stubs.clientCommitAnswersWithScope.scope}): ${stubs.clientCommitAnswersWithScope.title}"`,
            '-m',
            `"${stubs.clientCommitAnswersWithScope.message}"`
          ],
          {
            shell: true,
            buffer: false,
            stdio: 'inherit'
          }
        )
      })
    })

    describe('with the commit hook created', () => {
      beforeAll(() => {
        inquirer.prompt.mockReturnValue(
          Promise.resolve(stubs.clientCommitAnswers)
        )
        getEmojis.mockResolvedValue(stubs.gitmojis)
        isHookCreated.mockResolvedValue(true)
        getDefaultCommitContent.mockReturnValueOnce(
          stubs.emptyDefaultCommitContent
        )
        commit({ mode: 'client' })
      })

      it('should call inquirer with prompts', () => {
        expect(inquirer.prompt.mock.calls).toMatchSnapshot()
      })

      it('should stop the commit because the hook is created and log the explanation to the user', () => {
        expect(execa).not.toHaveBeenCalledWith()
      })
    })

    describe('when an error happens', () => {
      const consoleError = jest.spyOn(console, 'error')

      beforeAll(() => {
        consoleError.mockImplementation((msg) => msg)
        inquirer.prompt.mockReturnValue(
          Promise.resolve(stubs.clientCommitAnswersWithScope)
        )
        getEmojis.mockResolvedValue(stubs.gitmojis)
        isHookCreated.mockResolvedValue(false)
        configurationVault.getAutoAdd.mockReturnValue(true)
        getDefaultCommitContent.mockReturnValueOnce(
          stubs.emptyDefaultCommitContent
        )
        execa.mockImplementation(() => {
          throw new Error({ stdout: 'Hey' })
        })
        commit({ mode: 'client' })
      })

      it('should print the error to the console', () => {
        expect(consoleError).toHaveBeenCalled()
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
        mockProcessExit()
        process.argv[3] = stubs.argv
        process.argv[COMMIT_MESSAGE_SOURCE] = undefined
        getDefaultCommitContent.mockReturnValueOnce(
          stubs.emptyDefaultCommitContent
        )
        execa.mockReturnValueOnce(Promise.resolve(stubs.gitAbsoluteDir))
        fs.existsSync.mockReturnValueOnce(false).mockReturnValueOnce(false)
        commit({ mode: 'hook' })
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
        mockProcessExit()
        process.argv[3] = stubs.argv
        process.argv[COMMIT_MESSAGE_SOURCE] = stubs.commitSource
        getDefaultCommitContent.mockReturnValueOnce(
          stubs.emptyDefaultCommitContent
        )
        execa.mockReturnValueOnce(Promise.resolve(stubs.gitAbsoluteDir))
        fs.existsSync.mockReturnValueOnce(false).mockReturnValueOnce(false)
        commit({ mode: 'hook' })
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
        mockProcessExit(new Error('ProcessExit0'))
        execa.mockReturnValueOnce(Promise.resolve(stubs.gitAbsoluteDir))
        // mock that we found one of the rebase trigger (file existence in .git)
        fs.existsSync.mockReturnValueOnce(true)

        try {
          await commit({ mode: 'hook' })
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
        mockProcessExit(new Error('ProcessExit0'))
        execa.mockReturnValueOnce(Promise.resolve(stubs.gitAbsoluteDir))
        // mock that we are amending
        process.argv[COMMIT_MESSAGE_SOURCE] = 'commit sha123'

        try {
          await commit({ mode: 'hook' })
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
        mockProcessExit(new Error('SIGINT'))
        process.argv[3] = stubs.argv
        process.argv[COMMIT_MESSAGE_SOURCE] = stubs.commitSource

        getDefaultCommitContent.mockReturnValueOnce(
          stubs.emptyDefaultCommitContent
        )

        try {
          await commit({ mode: 'hook' })
        } catch (e) {
          expect(e.message).toMatch('SIGINT')
        }

        expect(console.warn).toHaveBeenCalledWith('gitmoji-cli was interrupted')
        expect(process.exit).toHaveBeenCalledWith(0)
      })
    })

    describe('with git auto merge trigger by git pull', () => {
      it('should cancel the hook', async () => {
        mockProcessExit(new Error('ProcessExit0'))
        execa.mockReturnValueOnce(Promise.resolve(stubs.gitAbsoluteDir))
        // mock that we are merging
        process.argv[3] = '.git/MERGE_MSG'
        process.argv[COMMIT_MESSAGE_SOURCE] = 'merge'

        try {
          await commit({ mode: 'hook' })
        } catch (e) {
          expect(e.message).toMatch('ProcessExit0')
        }

        expect(process.exit).toHaveBeenCalledWith(0)
      })
    })

    describe('when gitmoji is present in the title', () => {
      beforeAll(() => {
        mockProcessExit(new Error('ProcessExit0'))
        execa.mockReturnValueOnce(Promise.resolve(stubs.gitAbsoluteDir))
        getEmojis.mockResolvedValue(stubs.gitmojis)
      })

      describe('as a shortcode', () => {
        beforeAll(() => {
          getDefaultCommitContent.mockReturnValueOnce(
            stubs.gitmojiShortcodeCommitContent
          )
        })

        it('should cancel the hook', async () => {
          try {
            await commit({ mode: 'hook' })
          } catch (e) {
            expect(process.exit).toHaveBeenCalledWith(0)
          }
        })
      })

      describe('as a unicode', () => {
        beforeAll(() => {
          getDefaultCommitContent.mockReturnValueOnce(
            stubs.gitmojiUnicodeCommitContent
          )
        })

        it('should cancel the hook', async () => {
          try {
            await commit({ mode: 'hook' })
          } catch (e) {
            expect(process.exit).toHaveBeenCalledWith(0)
          }
        })
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
    })
  })

  describe('prompts', () => {
    beforeAll(() => {
      configurationVault.getMessagePrompt.mockReturnValue(true)
    })

    it('should register the autoComplete inquirer prompt', () => {
      expect(inquirer.registerPrompt).toHaveBeenCalledWith(
        'autocomplete',
        expect.any(Function)
      )
    })

    describe('without scope prompt', () => {
      beforeAll(() => {
        getDefaultCommitContent.mockReturnValueOnce(
          stubs.emptyDefaultCommitContent
        )
      })

      it('should match the array of questions', () => {
        expect(prompts(stubs.gitmojis, 'client')).toMatchSnapshot()
      })
    })

    describe('with list of scopes prompt', () => {
      beforeAll(() => {
        getDefaultCommitContent.mockReturnValueOnce(
          stubs.emptyDefaultCommitContent
        )
        configurationVault.getScopePrompt.mockReturnValue([])
      })

      it('should match the array of questions with scopes list', () => {
        expect(prompts(stubs.gitmojis, 'client')).toMatchSnapshot()
      })
    })

    describe('with scope prompt with scope enabled', () => {
      beforeAll(() => {
        getDefaultCommitContent.mockReturnValueOnce(
          stubs.emptyDefaultCommitContent
        )
        configurationVault.getScopePrompt.mockReturnValue(true)
      })

      it('should match the array of questions', () => {
        expect(prompts(stubs.gitmojis, 'client')).toMatchSnapshot()
      })
    })

    describe('with default commit content in hook mode', () => {
      beforeAll(() => {
        getDefaultCommitContent.mockReturnValueOnce(stubs.defaultCommitContent)
      })

      it('should match the default title and message', () => {
        expect(prompts(stubs.gitmojis, 'hook')).toMatchSnapshot()
      })
    })

    describe('with default commit content in commit mode', () => {
      beforeAll(() => {
        getDefaultCommitContent.mockReturnValueOnce(
          stubs.emptyDefaultCommitContent
        )
      })

      it('should not fill default title and message', () => {
        expect(prompts(stubs.gitmojis, 'commit')).toMatchSnapshot()
      })
    })

    describe('without message prompt', () => {
      beforeAll(() => {
        getDefaultCommitContent.mockReturnValueOnce(
          stubs.emptyDefaultCommitContent
        )
        configurationVault.getMessagePrompt.mockReturnValue(false)
      })

      it('should match the array of questions', () => {
        expect(prompts(stubs.gitmojis, 'client')).toMatchSnapshot()
      })
    })
  })
})
