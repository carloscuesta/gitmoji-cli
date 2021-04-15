import execa from 'execa'
// import fs from 'fs'
import path from 'path'

import getAbsoluteHooksPath from '../../src/utils/getAbsoluteHooksPath'
import * as stubs from './stubs'

describe('getAbsoluteHooksPath', () => {
  const hookName = 'pre-commit'

  describe('when the core path is absolute', () => {
    beforeEach(() => {
      // simulate the result of "git config --get core.hooksPath"
      execa.mockReturnValueOnce({ stdout: stubs.absoluteCoreHooksPath })
    })

    it('returns an absolute path inside it', async () => {
      const hookFile = await getAbsoluteHooksPath(hookName)

      expect(execa).toHaveBeenCalledWith('git', [
        'config',
        '--get',
        'core.hooksPath'
      ])
      expect(hookFile).toEqual(
        expect.stringContaining(stubs.absoluteCoreHooksPath)
      )
      expect(hookFile).toEqual(expect.stringContaining(hookName))
    })
  })

  describe('when the core path is relative', () => {
    beforeEach(() => {
      // simulate the result of "git config --get core.hooksPath"
      execa.mockReturnValueOnce({ stdout: stubs.relativeCoreHooksPath })
      // simulate the result of "git rev-parse --absolute-git-dir" (invoked only when previous result is relative)
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
        expect.stringContaining(path.dirname(stubs.relativeCoreHooksPath))
      )
      expect(hookFile).toEqual(
        expect.stringContaining(stubs.relativeCoreHooksPath)
      )
      expect(hookFile).toEqual(expect.stringContaining(hookName))
    })
  })

  describe('when the core path is not set in the config', () => {
    beforeEach(() => {
      // simulate the result of "git config --get core.hooksPath"
      execa.mockReturnValueOnce({ stdout: undefined })
      // simulate the result of "git rev-parse --absolute-git-dir" (invoked only when previous result is relative)
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
        expect.stringContaining(path.dirname(stubs.relativeCoreHooksPath))
      )
      expect(hookFile).toEqual(expect.stringContaining('.git/hooks'))
      expect(hookFile).toEqual(expect.stringContaining(hookName))
    })
  })
})
