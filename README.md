# gitmoji-cli

[![Build Status](https://img.shields.io/github/actions/workflow/status/carloscuesta/gitmoji-cli/ci.yml?branch=master&style=flat-square)](https://github.com/carloscuesta/gitmoji-cli/actions?query=workflow%3ACI+branch%3Amaster)
[![Code Climate](https://img.shields.io/codeclimate/maintainability/carloscuesta/gitmoji-cli.svg?style=flat-square)](https://codeclimate.com/github/carloscuesta/gitmoji-cli)
[![Codecov](https://img.shields.io/codecov/c/github/carloscuesta/gitmoji-cli.svg?style=flat-square)](https://github.com/carloscuesta/gitmoji-cli)
[![npm version](https://img.shields.io/npm/v/gitmoji-cli.svg?style=flat-square)](https://www.npmjs.com/package/gitmoji-cli)
[![npm downloads](https://img.shields.io/npm/dt/gitmoji-cli.svg?style=flat-square)](https://www.npmjs.com/package/gitmoji-cli)
[![gitmoji badge](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square)](https://github.com/carloscuesta/gitmoji)

![gitmoji-cli](https://cloud.githubusercontent.com/assets/7629661/20454643/11eb9e40-ae47-11e6-90db-a1ad8a87b495.gif)

> A [gitmoji](https://github.com/carloscuesta/gitmoji) interactive client for using gitmojis on commit messages.

## About

This project provides an easy solution for using [**gitmoji**](https://github.com/carloscuesta/gitmoji) from your command line. Gitmoji-cli solves the hassle of searching through the gitmoji list. Includes a bunch of options you can play with! :tada:

## Install

### npm

```bash
npm i -g gitmoji-cli
```

### brew

```bash
brew install gitmoji
```

## Usage

```bash
gitmoji --help
```

```
A gitmoji interactive client for using gitmojis on commit messages.

  Usage
    $ gitmoji
  Options
    --init, -i      Initialize gitmoji as a commit hook
    --remove, -r    Remove a previously initialized commit hook
    --config, -g    Setup gitmoji-cli preferences.
    --commit, -c    Interactively commit using the prompts
    --list, -l      List all the available gitmojis
    --search, -s    Search gitmojis
    --version, -v   Print gitmoji-cli installed version
    --update, -u    Sync emoji list with the repo
```

### Commit

You can use the commit functionality in two ways, directly or via a commit-hook.

If you want to integrate `gitmoji-cli` in your project I would recommend going for the **hook mode** as it support more use cases, it's more flexible and has a better integration with other tools, whereas the **client mode** is more quick and easy to use.

#### Client

Start the interactive commit client, to auto generate your commit based on your prompts.

```bash
gitmoji -c
```

##### Options

You can pass default values to the prompts using the following flags:

- `title`: For setting the commit title.
- `message`: For setting the commit message.
- `scope`: For setting the commit scope.

Those flags should be used like this:

```bash
gitmoji -c --title="Commit" --message="Message" --scope="Scope"
```

#### Hook

Run the init option, add your changes and commit them, after that the prompts will begin and your commit message will be built.

```bash
gitmoji -i
git add .
git commit
```

⚠️ The hook **should not be used** with the `gitmoji -c` command.

![gitmoji commit](https://user-images.githubusercontent.com/7629661/41189947-1de56124-6bd6-11e8-9567-e7f1a8e99500.png)

### Search

Search using specific keywords to find the right gitmoji.

```bash
gitmoji -s "criteria"
```

![gitmoji search](https://user-images.githubusercontent.com/7629661/41189878-d24a3b78-6bd4-11e8-8d47-c8edf3b87e53.png)


### List

Pretty print all the available gitmojis.

```bash
gitmoji -l
```

![gitmoji list](https://user-images.githubusercontent.com/7629661/41189877-d22b145a-6bd4-11e8-97f8-a8e36bcab062.png)

### Update

Update the gitmojis list, by default the first time you run gitmoji, the cli creates a cache to allow using this tool without internet connection.

```bash
gitmoji -u
```

### Config

The cli has some built-in configuration options that you can tweak at your own preference:

- **Automatic git add**: Enable or disable the automatic `git add .` every time you use the commit command.
- **Emoji format**: Switch between the emoji format.
- **Message prompt**: Enable or disable the message prompt.
- **Scope prompt**: Enable or disable [conventional commits scope prompt](https://www.conventionalcommits.org/en/v1.0.0/#summary).
- **Gitmojis api URL**: Set a custom URL to use it as the library of gitmojis.

You can configure these options via (in order of precedence):

- A `gitmoji` key in your `package.json` file
- A `.gitmojirc.json` file.
- Using the global cli configuration.

If no user configuration is found, a set of default values will be used.

#### `package.json`

```json
{
  "gitmoji": {
    "autoAdd": false,
    "emojiFormat": "code | emoji",
    "scopePrompt": false,
    "messagePrompt": false,
    "capitalizeTitle": true,
    "gitmojisUrl": "https://gitmoji.dev/api/gitmojis"
  }
}
```

#### `.gitmojirc.json`

```json
{
  "autoAdd": false,
  "emojiFormat": "code | emoji" ,
  "scopePrompt": false,
  "messagePrompt": false,
  "capitalizeTitle": true,
  "gitmojisUrl": "https://gitmoji.dev/api/gitmojis"
}
```

#### Local configuration

Run `gitmoji -g` to setup some gitmoji-cli preferences.

![gitmoji config](https://user-images.githubusercontent.com/7629661/41189876-d21167ee-6bd4-11e8-9008-4c987502f307.png)
