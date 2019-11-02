const search = require('./search').default
const list = require('./list').default
const update = require('./update').default
const config = require('./config').default
const hook = require('./hook').default
const commit = require('./commit').default

export default {
  config,
  commit,
  createHook: hook.create,
  list,
  removeHook: hook.remove,
  search,
  update
}
