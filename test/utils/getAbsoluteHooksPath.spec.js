import execa from 'execa'

import getAbsoluteHooksPath from '../../src/utils/getAbsoluteHooksPath'
import * as stubs from './stubs'

describe('getAbsoluteHooksPath', () => {
  const hookName = 'pre-commit'

  describe('when the core path is absolute', () => {
    beforeEach(() => {
      execa.mockReturnValueOnce({ stdout: stubs.absoluteCoreHooksPath })
      execa.mockReturnValueOnce({ stdout: stubs.gitAbsoluteDir })
    })

    it('returns an absolute path inside it', async () => {
      const hookFile = await getAbsoluteHooksPath(hookName)

      expect(execa).toHaveBeenCalledWith('git', [
        'config',
        '--get',
        'core.hooksPath'
      ])
      expect(execa).toHaveBeenCalledWith('git', [
        'rev-parse',
        '--absolute-git-dir'
      ])
      expect(hookFile).toEqual(
        expect.stringContaining(stubs.absoluteCoreHooksPath)
      )
      expect(hookFile).toEqual(expect.stringContaining(hookName))
    })
  })

  describe('when the core path is relative', () => {
    beforeEach(() => {
      execa.mockReturnValueOnce({ stdout: stubs.relativeCoreHooksPath })
      execa.mockReturnValueOnce({ stdout: stubs.gitAbsoluteDir })
    })

    it('returns an absolute path inside the git directory', async () => {
      const hookFile = await getAbsoluteHooksPath(hookName)

      expect(execa).toHaveBeenCalledWith('git', [
        'config',
        '--get',
        'core.hooksPath'
      ])
      expect(execa).toHaveBeenCalledWith('git', [
        'rev-parse',
        '--absolute-git-dir'
      ])
      expect(hookFile).toEqual(
        expect.stringContaining(stubs.relativeCoreHooksPath)
      )
      expect(hookFile).toEqual(expect.stringContaining(hookName))
    })
  })

  describe('when the core path is not set in the config', () => {
    beforeEach(() => {
      execa.mockReturnValueOnce({ stdout: undefined })
      execa.mockReturnValueOnce({ stdout: stubs.gitAbsoluteDir })
    })

    it('returns an absolute path inside the git directory', async () => {
      const hookFile = await getAbsoluteHooksPath(hookName)

      expect(execa).toHaveBeenCalledWith('git', [
        'config',
        '--get',
        'core.hooksPath'
      ])
      expect(execa).toHaveBeenCalledWith('git', [
        'rev-parse',
        '--absolute-git-dir'
      ])
      expect(hookFile).toEqual(expect.stringContaining(stubs.gitAbsoluteDir))
      expect(hookFile).toEqual(expect.stringContaining('.git/hooks'))
      expect(hookFile).toEqual(expect.stringContaining(hookName))
    })
  })
})
