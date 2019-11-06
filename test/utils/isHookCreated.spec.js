import execa from 'execa'
import fs from 'fs'

import isHookCreated from '../../src/utils/isHookCreated'
import HOOK from '../../src/commands/hook/hook'
import * as stubs from './stubs'

describe('isHookCreated', () => {
  beforeAll(() => {
    execa.mockReturnValue({ stdout: stubs.gitAbsoluteDir })
    isHookCreated()
  })

  it('should obtain the absolute git dir with execa', () => {
    expect(execa).toHaveBeenCalledWith('git', [
      'rev-parse',
      '--absolute-git-dir'
    ])
  })

  it('should check if hook file exists', () => {
    expect(fs.existsSync).toHaveBeenCalledWith(stubs.gitAbsoluteDir + HOOK.PATH)
  })
})
