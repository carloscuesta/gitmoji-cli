import fs from 'fs'

import isHookCreated from '../../src/utils/isHookCreated'
import getAbsoluteHooksPath from '../../src/utils/getAbsoluteHooksPath'
import HOOK from '../../src/commands/hook/hook'
import * as stubs from './stubs'

jest.mock('../../src/utils/getAbsoluteHooksPath')

describe('isHookCreated', () => {
  beforeAll(() => {
    getAbsoluteHooksPath.mockResolvedValue(stubs.hooksPath)
  })

  describe('when the hook does not exists', () => {
    beforeAll(() => {
      fs.existsSync.mockReturnValue(false)
    })

    it('should return false', async () => {
      const hookExists = await isHookCreated()

      expect(getAbsoluteHooksPath).toHaveBeenCalledWith(HOOK.FILENAME)
      expect(fs.existsSync).toHaveBeenCalledWith(stubs.hooksPath)
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

      expect(getAbsoluteHooksPath).toHaveBeenCalledWith(HOOK.FILENAME)
      expect(fs.existsSync).toHaveBeenCalledWith(stubs.hooksPath)
      expect(fs.readFileSync).toHaveBeenCalledWith(stubs.hooksPath, {
        encoding: 'utf-8'
      })
      expect(hookExists).toBe(true)
    })
  })
})
