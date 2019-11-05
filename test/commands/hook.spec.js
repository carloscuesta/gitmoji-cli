import execa from 'execa'
import fs from 'fs'

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
      execa.mockReturnValue({ stdout: stubs.gitAbsoluteDir })
      hook.create()
    })

    it('should obtain the absolute git dir with execa', () => {
      expect(execa).toHaveBeenCalledWith('git', [
        'rev-parse',
        '--absolute-git-dir'
      ])
    })

    it('should create the hook file', () => {
      expect(fs.writeFile).toHaveBeenCalledWith(
        stubs.gitAbsoluteDir + hookConfig.PATH,
        hookConfig.CONTENTS,
        { mode: hookConfig.PERMISSIONS },
        expect.any(Function)
      )
    })
  })

  describe('remove hook', () => {
    beforeAll(() => {
      execa.mockReturnValue({ stdout: stubs.gitAbsoluteDir })
      hook.remove()
    })

    it('should obtain the absolute git dir with execa', () => {
      expect(execa).toHaveBeenCalledWith('git', [
        'rev-parse',
        '--absolute-git-dir'
      ])
    })

    it('should remove the hook file', () => {
      expect(fs.unlink).toHaveBeenCalledWith(
        stubs.gitAbsoluteDir + hookConfig.PATH,
        expect.any(Function)
      )
    })
  })
})
