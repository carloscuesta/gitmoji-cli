import execa from 'execa'
import fs from 'fs'
import path from 'path'

import hook from '../../src/commands/hook'
import hookConfig from '../../src/commands/hook/hook'
import * as stubs from './stubs'

describe('hook command', () => {
  it('should match hook module export', () => {
    expect(hook).toMatchSnapshot()
  })

  it('should match hook configuration', () => {
    expect(hookConfig).toMatchSnapshot()
  })

  describe('create hook', () => {
    beforeAll(() => {
      execa.mockReturnValue({ stdout: stubs.coreHooksPath })
      hook.create()
    })

    it('should obtain the hooks dir path with execa', () => {
      expect(execa).toHaveBeenCalledWith('git', [
        'config',
        '--get',
        'core.hooksPath'
      ])
    })

    it('should create the hook file', () => {
      const hookFile = path.resolve(
        process.cwd(),
        stubs.coreHooksPath,
        hookConfig.FILENAME
      )
      expect(fs.writeFile).toHaveBeenCalledWith(
        hookFile,
        hookConfig.CONTENTS,
        { mode: hookConfig.PERMISSIONS },
        expect.any(Function)
      )
    })
  })

  describe('remove hook', () => {
    beforeAll(() => {
      execa.mockReturnValue({ stdout: stubs.coreHooksPath })
      hook.remove()
    })

    it('should obtain the hooks dir path with execa', () => {
      expect(execa).toHaveBeenCalledWith('git', [
        'config',
        '--get',
        'core.hooksPath'
      ])
    })

    it('should remove the hook file', () => {
      const hookFile = path.resolve(
        process.cwd(),
        stubs.coreHooksPath,
        hookConfig.FILENAME
      )
      expect(fs.unlink).toHaveBeenCalledWith(hookFile, expect.any(Function))
    })
  })
})
