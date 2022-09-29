import updateNotifier from 'update-notifier'
import meow from 'meow'

import pkg from '../package.json'
import { options } from '../src/cli'
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
    meow.mock.calls[0][1].importMeta = 'import.meta.url'

    expect(meow.mock.calls).toMatchSnapshot()
  })

  it('should call commit command on commit', () => {
    options.commit('client')
    expect(commands.commit).toHaveBeenCalledWith('client')
  })

  it('should call config command on config', () => {
    options.config()
    expect(commands.config).toHaveBeenCalledWith()
  })

  it('should call commit command on hook', () => {
    options.hook('hook')
    expect(commands.commit).toHaveBeenLastCalledWith('hook')
  })

  it('should call createHook command on init', () => {
    options.init()
    expect(commands.createHook).toHaveBeenCalledWith()
  })

  it('should call list command on list', () => {
    options.list()
    expect(commands.list).toHaveBeenCalledWith()
  })

  it('should call removeHook command on remove', () => {
    options.remove()
    expect(commands.removeHook).toHaveBeenCalledWith()
  })

  it('should call search command on search', () => {
    options.search()
    expect(commands.search).toHaveBeenCalledWith('testSearchQuery')
  })

  it('should call update command on update', () => {
    options.update()
    expect(commands.search).toHaveBeenCalledWith('testSearchQuery')
  })
})
