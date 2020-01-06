import execa from 'execa'
import fs from 'fs'

import isHookCreated from '../../src/utils/isHookCreated'
import HOOK from '../../src/commands/hook/hook'
import * as stubs from './stubs'

describe('isHookCreated', () => {
  beforeAll(() => {
    execa.mockReturnValue({ stdout: stubs.gitAbsoluteDir })
  })

  it('should obtain the absolute git dir with execa', () => {
    isHookCreated()
    expect(execa).toHaveBeenCalledWith('git', [
      'rev-parse',
      '--absolute-git-dir'
    ])
  })

  it('should check if hook file exists', async () => {
    expect(await isHookCreated()).toEqual(false)
    expect(fs.existsSync).toHaveBeenCalledWith(stubs.gitAbsoluteDir + HOOK.PATH)
  })

  it('should check if hook file matches', async () => {
    fs.existsSync.mockReturnValue(true)
    expect(await isHookCreated()).toEqual(false)
    expect(fs.readFileSync).toHaveBeenCalledWith(
      stubs.gitAbsoluteDir + HOOK.PATH
    )
  })
})
