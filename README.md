# gitmoji-cli

[![Travis Build Status](https://img.shields.io/travis/carloscuesta/gitmoji-cli.svg?style=flat-square)](https://travis-ci.org/carloscuesta/gitmoji-cli)
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

```bash
$ npm i -g gitmoji-cli
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
$ gitmoji -i # this will create the .git/hook/prepare-commit-msg
$ git add .
$ git commit
```

![gitmoji commit](https://cloud.githubusercontent.com/assets/7629661/20454513/5db2750a-ae43-11e6-99d7-4757108fe640.png)

### Search

Search using specific keywords to find the right gitmoji.

```bash
$ gitmoji bug linter -s
```

![gitmoji list](https://cloud.githubusercontent.com/assets/7629661/20454469/1815550e-ae42-11e6-8c23-33ab7a3e48a3.png)


### List

Pretty print all the available gitmojis.

```bash
$ gitmoji -l
```

![gitmoji list](https://cloud.githubusercontent.com/assets/7629661/20454472/1c351e6c-ae42-11e6-8f3c-da73429d8eff.png)

### Update

Update the gitmojis list, by default the first time you run gitmoji, the cli creates a cache to allow using this tool without internet connection.

```bash
$ gitmoji -u
```

### Config

Run `gitmoji -g` to setup some gitmoji-cli preferences, such as the auto `git add .` feature.

![gitmoji config](https://cloud.githubusercontent.com/assets/7629661/23577826/82e8745e-00c9-11e7-9d7e-623a0a51bff9.png)
