// @flow
const HOOK: Object = {
  PERMISSIONS: 0o775,
  FILENAME: 'prepare-commit-msg',
  CONTENTS:
    '#!/usr/bin/env sh\n# gitmoji as a commit hook\n' +
    'if npx -v >/dev/null\n' +
    'then\n' +
    '  exec < /dev/tty\n  npx -c gitmoji --hook $1 $2\n' +
    'else\n' +
    '  exec < /dev/tty\n  gitmoji --hook $1 $2\n' +
    'fi'
}

export default HOOK
