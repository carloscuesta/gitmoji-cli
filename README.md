# gitmoji-cli

[![Build Status](https://img.shields.io/github/workflow/status/carloscuesta/gitmoji-cli/CI?style=flat-square)](https://github.com/carloscuesta/gitmoji-cli/actions?query=workflow%3ACI+branch%3Amaster)
[![Code Climate](https://img.shields.io/codeclimate/maintainability/carloscuesta/gitmoji-cli.svg?style=flat-square)](https://codeclimate.com/github/carloscuesta/gitmoji-cli)
[![Codecov](https://img.shields.io/codecov/c/github/carloscuesta/gitmoji-cli.svg?style=flat-square)](https://github.com/carloscuesta/gitmoji-cli)
[![David Dependencies](https://img.shields.io/david/carloscuesta/gitmoji-cli.svg?style=flat-square)](https://david-dm.org/carloscuesta/gitmoji-cli)
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
$ npm i -g gitmoji-cli
```

### brew

```bash
$ brew install gitmoji
```

## Usage

```bash
$ gitmoji --help
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

#### Client

Start the interactive commit client, to auto generate your commit based on your prompts.

```bash
$ gitmoji -c
```

#### Hook

Run the init option, add your changes and commit them, after that the prompts will begin and your commit message will be built.

```bash
$ gitmoji -i
$ git add .
$ git commit
```

⚠️ The hook **should not be used** with the `gitmoji -c` command.

![gitmoji commit](https://user-images.githubusercontent.com/7629661/41189947-1de56124-6bd6-11e8-9567-e7f1a8e99500.png)

### Search

Search using specific keywords to find the right gitmoji.

```bash
$ gitmoji -s "criteria"
```

![gitmoji search](https://user-images.githubusercontent.com/7629661/41189878-d24a3b78-6bd4-11e8-8d47-c8edf3b87e53.png)


### List

Pretty print all the available gitmojis.

```bash
$ gitmoji -l
```

![gitmoji list](https://user-images.githubusercontent.com/7629661/41189877-d22b145a-6bd4-11e8-97f8-a8e36bcab062.png)

### Update

Update the gitmojis list, by default the first time you run gitmoji, the cli creates a cache to allow using this tool without internet connection.

```bash
$ gitmoji -u
```

### Config

Run `gitmoji -g` to setup some gitmoji-cli preferences.

![gitmoji config](https://user-images.githubusercontent.com/7629661/41189876-d21167ee-6bd4-11e8-9008-4c987502f307.png)

#### Options

- **Automatic git add**: Enable or disable the automatic `git add .` everytime you use the commit command.
- **Emoji format**: Switch between the emoji format.
- **Scope prompt**: Enable or disable [conventional commits scope prompt](https://www.conventionalcommits.org/en/v1.0.0/#summary).
- **Signed commits**: Enable or disable [signed commits with GPG](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/signing-commits).
