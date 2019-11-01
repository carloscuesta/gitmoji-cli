const search = require('./search').default
const list = require('./list').default
const update = require('./update').default
const config = require('./config').default
const hook = require('./hook').default

export default {
  config,
  createHook: hook.create,
  list,
  removeHook: hook.remove,
  search,
  update
}
