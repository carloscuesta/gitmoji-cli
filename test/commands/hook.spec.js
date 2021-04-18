import fs from 'fs'

import hook from '../../src/commands/hook'
import hookConfig from '../../src/commands/hook/hook'
import getAbsoluteHooksPath from '../../src/utils/getAbsoluteHooksPath'
import * as stubs from './stubs'

jest.mock('../../src/utils/getAbsoluteHooksPath')

describe('hook command', () => {
  beforeAll(() => {
    getAbsoluteHooksPath.mockResolvedValue(stubs.hooksPath)
  })

  it('should match hook module export', () => {
    expect(hook).toMatchSnapshot()
  })

  it('should match hook configuration', () => {
    expect(hookConfig).toMatchSnapshot()
  })

  describe('create hook', () => {
    it('should create the hook file', async () => {
      await hook.create()

      expect(getAbsoluteHooksPath).toHaveBeenCalledWith(hookConfig.FILENAME)
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        stubs.hooksPath,
        hookConfig.CONTENTS,
        { mode: hookConfig.PERMISSIONS }
      )
    })
  })

  describe('remove hook', () => {
    it('should remove the hook file', async () => {
      await hook.remove()

      expect(getAbsoluteHooksPath).toHaveBeenCalledWith(hookConfig.FILENAME)
      expect(fs.unlinkSync).toHaveBeenCalledWith(stubs.hooksPath)
    })
  })
})
