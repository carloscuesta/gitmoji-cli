// @flow
import type { Parser } from 'meow'

export const SUPPORTED_SHELLS = ['bash', 'zsh', 'fish', 'powershell']

type CompletionGenerator = {
  generateCompletions: (parser: Parser, binName: string) => string
}

const generateBashCompletions = (parser: Parser, binName: string): string => {
  const flags = Object.keys(parser.flags)
  const choices = SUPPORTED_SHELLS.join(' ')

  return `# bash completion for ${binName}
_${binName}_completions() {
  local cur prev
  COMPREPLY=()
  cur="\${COMP_WORDS[COMP_CWORD]}"
  prev="\${COMP_WORDS[COMP_CWORD-1]}"

  case \${COMP_CWORD} in
    1)
      COMPREPLY=( $(compgen -W "${flags.join(' ')}" -- \${cur}) )
      return 0
      ;;
    2)
      case \${prev} in
        --completions|-C)
          COMPREPLY=( $(compgen -W "${choices}" -- \${cur}) )
          return 0
          ;;
        *)
          COMPREPLY=( $(compgen -W "${flags.join(' ')}" -- \${cur}) )
          return 0
          ;;
      esac
      ;;
  esac
}

complete -F _${binName}_completions ${binName}
`
}

const generateZshCompletions = (parser: Parser, binName: string): string => {
  const flags = Object.entries(parser.flags)
    .map(([name, config]) => {
      const shortFlag = config.shortFlag ? `(-${config.shortFlag} |--${name})` : `--${name}`
      return shortFlag
    })
    .join(' ')

  return `# zsh completion for ${binName}

_${binName}() {
  local -a cmd
  cmd=(
    'commit:Interactively commit using the prompts'
    'config:Setup gitmoji-cli preferences'
    'init:Initialize gitmoji as a commit hook'
    'list:List all the available gitmojis'
    'remove:Remove a previously initialized commit hook'
    'search:Search gitmojis'
    'update:Sync emoji list with the repo'
  )

  _describe 'command' cmd

  local -a flags
  flags=(
    '--commit[Interactively commit using the prompts]:flag(-c)'
    '--config[Setup gitmoji-cli preferences]:flag(-g)'
    '--help[Show help]:flag(-h)'
    '--init[Initialize gitmoji as a commit hook]:flag(-i)'
    '--list[List all the available gitmojis]:flag(-l)'
    '--remove[Remove a previously initialized commit hook]:flag(-r)'
    '--search[Search gitmojis]:flag(-s)'
    '--update[Sync emoji list with the repo]:flag(-u)'
    '--version[Print gitmoji-cli installed version]:flag(-v)'
    '--completions[Generate shell completions]:shell:(${SUPPORTED_SHELLS.join(' ')})'
  )

  _arguments -s \${flags}
}

_${binName} "$@"
`
}

const generateFishCompletions = (parser: Parser, binName: string): string => {
  const flags = Object.keys(parser.flags)

  return `# fish completion for ${binName}

complete -c ${binName} -f

# Commands
complete -c ${binName} -n '__fish_use_subcommand' -a 'commit' -d 'Interactively commit using the prompts'
complete -c ${binName} -n '__fish_use_subcommand' -a 'config' -d 'Setup gitmoji-cli preferences'
complete -c ${binName} -n '__fish_use_subcommand' -a 'init' -d 'Initialize gitmoji as a commit hook'
complete -c ${binName} -n '__fish_use_subcommand' -a 'list' -d 'List all the available gitmojis'
complete -c ${binName} -n '__fish_use_subcommand' -a 'remove' -d 'Remove a previously initialized commit hook'
complete -c ${binName} -n '__fish_use_subcommand' -a 'search' -d 'Search gitmojis'
complete -c ${binName} -n '__fish_use_subcommand' -a 'update' -d 'Sync emoji list with the repo'

# Options
complete -c ${binName} -l commit -s c -d 'Interactively commit using the prompts'
complete -c ${binName} -l config -s g -d 'Setup gitmoji-cli preferences'
complete -c ${binName} -l help -s h -d 'Show help'
complete -c ${binName} -l init -s i -d 'Initialize gitmoji as a commit hook'
complete -c ${binName} -l list -s l -d 'List all the available gitmojis'
complete -c ${binName} -l remove -s r -d 'Remove a previously initialized commit hook'
complete -c ${binName} -l search -s s -d 'Search gitmojis'
complete -c ${binName} -l update -s u -d 'Sync emoji list with the repo'
complete -c ${binName} -l version -s v -d 'Print gitmoji-cli installed version'
complete -c ${binName} -l completions -s C -d 'Generate shell completions' -a '${SUPPORTED_SHELLS.join(' ')}'
`
}

const generatePowershellCompletions = (parser: Parser, binName: string): string => {
  return `# powershell completion for ${binName}

Register-ArgumentCompleter -CommandName ${binName} -ScriptBlock {
  param($wordToComplete, $commandAst, $cursorPosition)

  $completions = @(
    @{
      CompletionText = 'commit'
      ToolTip = 'Interactively commit using the prompts'
    },
    @{
      CompletionText = 'config'
      ToolTip = 'Setup gitmoji-cli preferences'
    },
    @{
      CompletionText = 'init'
      ToolTip = 'Initialize gitmoji as a commit hook'
    },
    @{
      CompletionText = 'list'
      ToolTip = 'List all the available gitmojis'
    },
    @{
      CompletionText = 'remove'
      ToolTip = 'Remove a previously initialized commit hook'
    },
    @{
      CompletionText = 'search'
      ToolTip = 'Search gitmojis'
    },
    @{
      CompletionText = 'update'
      ToolTip = 'Sync emoji list with the repo'
    },
    @{
      CompletionText = '--commit'
      ToolTip = 'Interactively commit using the prompts'
    },
    @{
      CompletionText = '-c'
      ToolTip = 'Interactively commit using the prompts (short)'
    },
    @{
      CompletionText = '--config'
      ToolTip = 'Setup gitmoji-cli preferences'
    },
    @{
      CompletionText = '-g'
      ToolTip = 'Setup gitmoji-cli preferences (short)'
    },
    @{
      CompletionText = '--help'
      ToolTip = 'Show help'
    },
    @{
      CompletionText = '-h'
      ToolTip = 'Show help (short)'
    },
    @{
      CompletionText = '--init'
      ToolTip = 'Initialize gitmoji as a commit hook'
    },
    @{
      CompletionText = '-i'
      ToolTip = 'Initialize gitmoji as a commit hook (short)'
    },
    @{
      CompletionText = '--list'
      ToolTip = 'List all the available gitmojis'
    },
    @{
      CompletionText = '-l'
      ToolTip = 'List all the available gitmojis (short)'
    },
    @{
      CompletionText = '--remove'
      ToolTip = 'Remove a previously initialized commit hook'
    },
    @{
      CompletionText = '-r'
      ToolTip = 'Remove a previously initialized commit hook (short)'
    },
    @{
      CompletionText = '--search'
      ToolTip = 'Search gitmojis'
    },
    @{
      CompletionText = '-s'
      ToolTip = 'Search gitmojis (short)'
    },
    @{
      CompletionText = '--update'
      ToolTip = 'Sync emoji list with the repo'
    },
    @{
      CompletionText = '-u'
      ToolTip = 'Sync emoji list with the repo (short)'
    },
    @{
      CompletionText = '--version'
      ToolTip = 'Print gitmoji-cli installed version'
    },
    @{
      CompletionText = '-v'
      ToolTip = 'Print gitmoji-cli installed version (short)'
    },
    @{
      CompletionText = '--completions'
      ToolTip = 'Generate shell completions'
    },
    @{
      CompletionText = '-C'
      ToolTip = 'Generate shell completions (short)'
    }
  )

  $completions | Where-Object {
    $_.CompletionText -like "$wordToComplete*"
  } | ForEach-Object {
    [System.Management.Automation.CompletionResult]::new(
      $_.CompletionText,
      $_.CompletionText,
      'ParameterValue',
      $_.ToolTip
    )
  }
}
`
}

const completions: CompletionGenerator = {
  generateCompletions(parser: Parser, binName: string): string {
    const generatorMap: Record<string, (parser: Parser, binName: string) => string> = {
      bash: generateBashCompletions,
      zsh: generateZshCompletions,
      fish: generateFishCompletions,
      powershell: generatePowershellCompletions
    }

    const generator = generatorMap[binName] // binName is actually the shell here

    if (!generator) {
      throw new Error(
        `Unsupported shell: ${binName}. Supported shells: ${SUPPORTED_SHELLS.join(', ')}`
      )
    }

    return generator(parser, 'gitmoji')
  }
}

export default completions