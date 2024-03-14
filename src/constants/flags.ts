// @flow
const FLAGS = Object.freeze({
  COMMIT: 'commit',
  CONFIG: 'config',
  HELP: 'help',
  HOOK: 'hook',
  INIT: 'init',
  LIST: 'list',
  REMOVE: 'remove',
  SEARCH: 'search',
  UPDATE: 'update',
  VERSION: 'version'
}) as const;

export default FLAGS;
