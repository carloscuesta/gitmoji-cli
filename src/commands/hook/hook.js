// @flow
const HOOK: Object = {
  PERMISSIONS: 0o775,
  FILENAME: 'prepare-commit-msg',
  CONTENTS:
    '#!/bin/sh\n# gitmoji as a commit hook\n' +
    'exec < /dev/tty\ngitmoji --hook $1 $2\n'
}

export default HOOK
