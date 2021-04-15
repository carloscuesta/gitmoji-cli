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
    beforeEach(() => {
      execa.mockReturnValueOnce({ stdout: stubs.relativeCoreHooksPath })
      execa.mockReturnValueOnce({ stdout: stubs.gitAbsoluteDir })
    })

    it('should create the hook file', async () => {
      await hook.create()

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
    beforeEach(() => {
      execa.mockReturnValueOnce({ stdout: stubs.relativeCoreHooksPath })
      execa.mockReturnValueOnce({ stdout: stubs.gitAbsoluteDir })
    })

    it('should remove the hook file', async () => {
      await hook.remove()

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
        hookConfig.FILENAME
      )
      expect(fs.unlink).toHaveBeenCalledWith(hookFile, expect.any(Function))
    })
  })
})
