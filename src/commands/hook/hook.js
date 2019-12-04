// @flow
const HOOK: Object = {
  PERMISSIONS: 0o775,
  PATH: '/hooks/prepare-commit-msg',
  CONTENTS: `#!/bin/sh
# gitmoji as a commit hook
exec < /dev/tty
gitmoji --hook $1
`
}

export default HOOK
