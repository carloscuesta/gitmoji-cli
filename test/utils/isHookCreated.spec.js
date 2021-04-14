import execa from 'execa'
import fs from 'fs'
import path from 'path'

import isHookCreated from '../../src/utils/isHookCreated'
import HOOK from '../../src/commands/hook/hook'
import * as stubs from './stubs'

describe('isHookCreated', () => {
  beforeAll(() => {
    execa.mockReturnValue({ stdout: stubs.coreHooksPath })
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

      const hookFile = path.resolve(
        process.cwd(),
        stubs.coreHooksPath,
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

      const hookFile = path.resolve(
        process.cwd(),
        stubs.coreHooksPath,
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
