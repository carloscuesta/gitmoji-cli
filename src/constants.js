const AUTO_ADD = 'autoAdd'
const CODE = 'code'
const EMOJI_FORMAT = 'emojiFormat'
const GITHUB = 'github'
const HOOK_MODE = 'hook'
const HOOK_FILE_CONTENTS = 'BRANCH_NAME=$(git branch | grep \'*\' | sed \'s/* //\')\n' +
'if [ $BRANCH_NAME != \'(no branch)\' ]\n' +
'then\n' +
      '#!/bin/sh\n# gitmoji as a commit hook\n' +
  'exec < /dev/tty\ngitmoji --hook $1\n' +
'fi'
const HOOK_PATH = '/hooks/prepare-commit-msg'
const HOOK_PERMISSIONS = 0o775
const ISSUE_FORMAT = 'issueFormat'
const JIRA = 'jira'
const SIGNED_COMMIT = 'signedCommit'

module.exports = {
  AUTO_ADD,
  CODE,
  EMOJI_FORMAT,
  GITHUB,
  HOOK_MODE,
  HOOK_FILE_CONTENTS,
  HOOK_PATH,
  HOOK_PERMISSIONS,
  ISSUE_FORMAT,
  JIRA,
  SIGNED_COMMIT
}
