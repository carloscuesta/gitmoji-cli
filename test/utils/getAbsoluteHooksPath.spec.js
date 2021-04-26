import execa from 'execa'

import getAbsoluteHooksPath from '../../src/utils/getAbsoluteHooksPath'
import * as stubs from './stubs'

describe('getAbsoluteHooksPath', () => {
  const hookName = 'pre-commit'

  describe('when core.hooksPath is defined', () => {
    beforeAll(() => {
      execa.mockReturnValue({ stdout: stubs.absoluteCoreHooksPath })
    })

    it('should return core.hooksPath', async () => {
      const path = await getAbsoluteHooksPath(hookName)

      expect(execa).toHaveBeenCalledWith('git', [
        'config',
        '--get',
        'core.hooksPath'
      ])

      expect(path).toEqual(`${stubs.absoluteCoreHooksPath}/${hookName}`)
    })
  })

  describe('when core.hooksPath is not defined', () => {
    beforeAll(() => {
      execa.mockReturnValueOnce(new Error('core.hooksPath is not defined'))
      execa.mockReturnValueOnce({ stdout: stubs.gitAbsoluteDir })
    })

    it('should return the default hook path', async () => {
      const path = await getAbsoluteHooksPath(hookName)

      expect(execa).toHaveBeenCalledWith('git', [
        'rev-parse',
        '--absolute-git-dir'
      ])

      expect(path).toEqual(`${stubs.gitAbsoluteDir}/hooks/${hookName}`)
    })
  })
})
