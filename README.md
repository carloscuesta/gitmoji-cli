# gitmoji-cli

[![Travis Build Status](https://img.shields.io/travis/carloscuesta/gitmoji-cli.svg?style=flat-square)](https://travis-ci.org/carloscuesta/gitmoji-cli)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)](https://github.com/sindresorhus/xo)

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
  	--init, -i	Create and initialize the gitmoji commit hook
  	--commit, -c Interactively commit using the prompts
  	--list, -l  List all the available gitmojis
  	--search, -s	Search gitmojis
```

### Commit

Add your changes and start the interactive commit client, to auto generate your commit based on your prompts.

```bash
$ gitmoji -c
```

```
### List

Pretty print all the available gitmojis.

```bash
$ gitmoji -l
```

### Search

Search using specific keywords to find the right gitmoji.

```bash
$ gitmoji bug linter -s
```
