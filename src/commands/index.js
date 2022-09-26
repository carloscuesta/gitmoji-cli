// @flow
import commit from './commit/index.js'
import config from './config/index.js'
import hook from './hook/index.js'
import list from './list/index.js'
import search from './search/index.js'
import update from './update/index.js'

export default {
  commit,
  config,
  createHook: hook.create,
  list,
  removeHook: hook.remove,
  search,
  update
}
