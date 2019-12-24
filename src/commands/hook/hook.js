// @flow

const CONTENTS = `#! /bin/bash
# gitmoji as a commit hook

# strict mode for bash
set -eo pipefail
IFS=$'\\n\\t'

readonly COMMIT_MSG_FILE=$1
# no undefined variables
set -u

BRANCH_NAME="$(git branch | sed -e 's/* //')"
if [[ ! "$BRANCH_NAME" =~ 'no branch' ]]; then
  exec < /dev/tty
  gitmoji --hook "$COMMIT_MSG_FILE"
fi
`

const HOOK: Object = {
  PERMISSIONS: 0o775,
  PATH: '/hooks/prepare-commit-msg',
  CONTENTS
}

export default HOOK
