import execa from 'execa'
import fs from 'fs'

import isHookCreated from '../../src/utils/isHookCreated'
import HOOK from '../../src/commands/hook/hook'
import * as stubs from './stubs'

describe('isHookCreated', () => {
  beforeAll(() => {
    execa.mockReturnValue({ stdout: stubs.gitAbsoluteDir })
  })

  describe('when the hook does not exists', () => {
    beforeAll(() => {
      fs.existsSync.mockReturnValue(false)
      fs.readFileSync.mockReturnValue(HOOK.CONTENTS)
    })

    it('should return false', async () => {
      const hookExists = await isHookCreated()

      expect(execa).toHaveBeenCalledWith('git', [
        'rev-parse',
        '--absolute-git-dir'
      ])
      expect(fs.existsSync).toHaveBeenCalledWith(stubs.gitAbsoluteDir + HOOK.PATH)
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
        'rev-parse',
        '--absolute-git-dir'
      ])
      expect(fs.existsSync).toHaveBeenCalledWith(stubs.gitAbsoluteDir + HOOK.PATH)
      expect(fs.readFileSync).toHaveBeenCalledWith(stubs.gitAbsoluteDir + HOOK.PATH, { encoding: 'utf-8' })
      expect(hookExists).toBe(true)
    })
  })
})
