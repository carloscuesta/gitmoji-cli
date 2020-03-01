// @flow
const HOOK: Object = {
  PERMISSIONS: 0o775,
  PATH: '/hooks/prepare-commit-msg',
  CONTENTS: `#!/bin/sh
# gitmoji as a commit hook
commit_message_empty=true
while read line
do
  if [[ $line == "# ------------------------ >8 ------------------------"* ]]; then
    break
  elif [[ $line != "#"* && $line != "" ]]; then
    commit_message_empty=false
    break
  fi
done < $1

if test -t 1 && $commit_message_empty; then
  # it has been invoked from a tty and no commit message is already set
  exec < /dev/tty
  gitmoji --hook $1
fi`
}

export default HOOK
