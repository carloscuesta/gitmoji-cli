import updateNotifier from 'update-notifier'
import meow from 'meow'

import commit from '@commands/commit/index.js'
import config from '@commands/config/index.js'
import hook from '@commands/hook/index.js'
import list from '@commands/list/index.js'
import search from '@commands/search/index.js'
import update from '@commands/update/index.js'

import pkg from '../package.json'
import { options } from '../src/cli.js'

jest.mock('@commands/commit/index.js')
jest.mock('@commands/config/index.js')
jest.mock('@commands/hook/index.js')
jest.mock('@commands/list/index.js')
jest.mock('@commands/search/index.js')
jest.mock('@commands/update/index.js')

describe('cli', () => {
  it('should call updateNotifier', () => {
    expect(updateNotifier).toHaveBeenCalledWith({ pkg })
    expect(updateNotifier({ pkg }).notify).toHaveBeenCalledWith({
      isGlobal: true
    })
  })

  it('should match meow with cli information', () => {
    const mockMeow = meow as jest.Mock
    mockMeow.mock.calls[0][1].importMeta = 'import.meta.url'
    expect(mockMeow.mock.calls).toMatchSnapshot()
  })

  it('should call commit command on commit', async () => {
    await options.commit({ mode: 'client' })
    expect(commit).toHaveBeenCalledWith({ mode: 'client' })
  })

  it('should call config command on config', async () => {
    await options.config()
    expect(config).toHaveBeenCalledWith()
  })

  it('should call commit command on hook', async () => {
    await options.hook({ mode: 'hook' })
    expect(commit).toHaveBeenLastCalledWith({ mode: 'hook' })
  })

  it('should call createHook command on init', async () => {
    await options.init()
    expect(hook.create).toHaveBeenCalledWith()
  })

  it('should call list command on list', async () => {
    await options.list()
    expect(list).toHaveBeenCalledWith()
  })

  it('should call removeHook command on remove', async () => {
    await options.remove()
    expect(hook.remove).toHaveBeenCalledWith()
  })

  it('should call search command on search', async () => {
    await options.search({ query: ['testSearchQuery'] })
    expect(search).toHaveBeenCalledWith({ query: ['testSearchQuery'] })
  })

  it('should call update command on update', async () => {
    await options.update()
    expect(update).toHaveBeenCalledWith()
  })
})
