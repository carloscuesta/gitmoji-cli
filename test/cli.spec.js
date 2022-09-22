import updateNotifier from 'update-notifier'
import meow from 'meow'

import pkg from '../package.json'
import { asyncOptions } from '../src/cli'
import commands from '../src/commands'

jest.mock('../src/commands')

describe('cli', () => {
  it('should call updateNotifier', () => {
    expect(updateNotifier).toHaveBeenCalledWith({ pkg })
    expect(updateNotifier({ pkg }).notify).toHaveBeenCalledWith({
      isGlobal: true
    })
  })

  it('should match meow with cli information', () => {
    expect(meow.mock.calls).toMatchSnapshot()
  })

  it('should call commit command on commit', async () => {
    const options = await asyncOptions
    options.commit('client')
    expect(commands.commit).toHaveBeenCalledWith('client')
  })

  it('should call config command on config', async () => {
    const options = await asyncOptions
    options.config()
    expect(commands.config).toHaveBeenCalledWith()
  })

  it('should call commit command on hook', async () => {
    const options = await asyncOptions
    options.hook('hook')
    expect(commands.commit).toHaveBeenLastCalledWith('hook')
  })

  it('should call createHook command on init', async () => {
    const options = await asyncOptions
    options.init()
    expect(commands.createHook).toHaveBeenCalledWith()
  })

  it('should call list command on list', async () => {
    const options = await asyncOptions
    options.list()
    expect(commands.list).toHaveBeenCalledWith()
  })

  it('should call removeHook command on remove', async () => {
    const options = await asyncOptions
    options.remove()
    expect(commands.removeHook).toHaveBeenCalledWith()
  })

  it('should call search command on search', async () => {
    const options = await asyncOptions
    options.search()
    expect(commands.search).toHaveBeenCalledWith('testSearchQuery')
  })

  it('should call update command on update', async () => {
    const options = await asyncOptions
    options.update()
    expect(commands.search).toHaveBeenCalledWith('testSearchQuery')
  })
})
