import execa from 'execa'
import fs from 'fs'
import path from 'path'

import isHookCreated from '../../src/utils/isHookCreated'
import HOOK from '../../src/commands/hook/hook'
import * as stubs from './stubs'

describe('isHookCreated', () => {
  beforeEach(() => {
    execa.mockReturnValueOnce({ stdout: stubs.relativeCoreHooksPath })
    execa.mockReturnValueOnce({ stdout: stubs.gitAbsoluteDir })
  })

  describe('when the hook does not exists', () => {
    beforeAll(() => {
      fs.existsSync.mockReturnValue(false)
      fs.readFileSync.mockReturnValue(HOOK.CONTENTS)
    })

    it('should return false', async () => {
      const hookExists = await isHookCreated()

      expect(execa).toHaveBeenCalledWith('git', [
        'config',
        '--get',
        'core.hooksPath'
      ])
      expect(execa).toHaveBeenCalledWith('git', [
        'rev-parse',
        '--absolute-git-dir'
      ])

      const hookFile = path.resolve(
        path.dirname(stubs.gitAbsoluteDir),
        stubs.relativeCoreHooksPath,
        HOOK.FILENAME
      )
      expect(fs.existsSync).toHaveBeenCalledWith(hookFile)
      expect(fs.readFileSync).not.toHaveBeenCalled()
      expect(hookExists).toBe(false)
    })
  })

  describe('when the hook exists', () => {
    beforeAll(() => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(HOOK.CONTENTS)
    })

    it('should return true', async () => {
      const hookExists = await isHookCreated()

      expect(execa).toHaveBeenCalledWith('git', [
        'config',
        '--get',
        'core.hooksPath'
      ])
      expect(execa).toHaveBeenCalledWith('git', [
        'rev-parse',
        '--absolute-git-dir'
      ])

      const hookFile = path.resolve(
        path.dirname(stubs.gitAbsoluteDir),
        stubs.relativeCoreHooksPath,
        HOOK.FILENAME
      )
      expect(fs.existsSync).toHaveBeenCalledWith(hookFile)
      expect(fs.readFileSync).toHaveBeenCalledWith(hookFile, {
        encoding: 'utf-8'
      })
      expect(hookExists).toBe(true)
    })
  })
})
