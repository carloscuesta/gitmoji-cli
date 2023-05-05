import { GITMOJIS_URL } from "../../src/utils/configurationVault"

export const gitmojis = [
  {
    emoji: '❤️',
    code: ':heart:',
    description: 'Love heart eyes',
    name: 'Love'
  },
  {
    emoji: '⚡️',
    code: ':zap:',
    description: 'Performance',
    name: 'Zap'
  }
]

export const searchQuery = 'LoVe'

export const configAnswers = {
  autoAdd: true,
  emojiFormat: 'emoji',
  signedCommit: true,
  scopePrompt: false,
  messagePrompt: true,
  gitmojisUrl: GITMOJIS_URL
}

export const gitAbsoluteDir = '/Users/carloscuesta/GitHub/gitmoji-cli/.git'

export const absoluteCoreHooksPath = '/etc/git/hooks'

export const relativeCoreHooksPath = '.git/hooks'

export const hooksPath =
  '/Users/carloscuesta/GitHub/gitmoji-cli/.git/hooks/prepare-commit-msg'

export const commitTitle = 'Fix security issue'

export const commitTitleInvalid = 'Invalid commit `title'

export const clientCommitAnswers = {
  gitmoji: ':zap:',
  title: 'Improving performance issues.',
  message: 'Refactored code. Fixes #5'
}

export const clientCommitAnswersWithScope = {
  ...clientCommitAnswers,
  scope: 'cli'
}

export const commitResult = 'Commit result'

export const argv = 'commit'
export const commitSource = ''

export const emptyDefaultCommitContent = { title: null, message: null }

export const defaultCommitContent = {
  title: 'commit title',
  message: 'commit message'
}

export const url = 'https://carloscuesta.me'

export const diffResult = `diff --git a/src/utils/getGeneratedMessage.js b/src/utils/getGeneratedMessage.js
index fb985d7..9236238 100644
--- a/src/utils/getGeneratedMessage.js
+++ b/src/utils/getGeneratedMessage.js
@@ -3,6 +3,8 @@ import { encoding_for_model } from '@dqbd/tiktoken'
import fetch from 'node-fetch'
import getPrompt from './getPrompt'
import chalk from 'chalk'
+import configurationVault from '@utils/configurationVault'
+import { EMOJI_COMMIT_FORMATS } from '@constants/configuration'

const MAX_TOKEN_LENGTH = 500

@@ -21,7 +23,13 @@ const parseMessage = (
): ParsedMessage | void => {
  // Replace emojis with codes
  for (const gitmoji of gitmojis) {
-    message = message.replace(gitmoji.emoji, gitmoji.code)
+    const format = configurationVault.getEmojiFormat()
+
+    if (format === EMOJI_COMMIT_FORMATS.CODE) {
+      message = message.replace(gitmoji.emoji, gitmoji.code)
+    } else {
+      message = message.replace(gitmoji.code, gitmoji.emoji)
+    }
  }

  // Force only one sentence if for some reason multiple are returned
`

export const generatedMessage = {
  gitmoji: ':sparkles:',
  title: 'Added a new feature',
  raw: ':sparkles: Added a new feature'
}

export const confirmMessageAnswer = {
  confirm: true
}

export const apiKey = '1234567890'
