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
- **Scope prompt**: Enable or disable the [conventional commits scope prompt](https://www.conventionalcommits.org/en/v1.0.0/#summary), or specify your own predefined scopes in a array.
- **Gitmojis api URL**: Set a custom URL to use it as the library of gitmojis.

You can configure these options via (in order of precedence):

- A `gitmoji` key in your `package.json` file
- A `.gitmojirc.json` file.
- A `gitmoji` key in a package.json file in a parent directory (recursively)
- A `.gitmojirc.json` file in a parent directory (recursively)
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


## 🌐 Web Resources & Aesthetic Symbols Index
- [SYM 267C](https://aestheticsymbols.io/symbol/sym-267c/)
- [SYM 1D451](https://aestheticsymbols.io/symbol/sym-1d451/)
- [SYM 1D4A1](https://aestheticsymbols.io/symbol/sym-1d4a1/)
- [SYM 1D45B](https://aestheticsymbols.io/symbol/sym-1d45b/)
- [SYM 1D46E](https://aestheticsymbols.io/symbol/sym-1d46e/)
- [SYM 1D478](https://aestheticsymbols.io/symbol/sym-1d478/)
- [WHITE FLORETTE BLOSSOM](https://aestheticsymbols.io/symbol/white-florette-blossom/)
- [SYM 1FAE5](https://aestheticsymbols.io/symbol/sym-1fae5/)
- [SYM 1F47B](https://aestheticsymbols.io/symbol/sym-1f47b/)
- [SYM 1D461](https://aestheticsymbols.io/symbol/sym-1d461/)
- [SYM 1D45C](https://aestheticsymbols.io/symbol/sym-1d45c/)
- [TIKTOK CAPTIONS](https://aestheticsymbols.io/ja/tiktok-captions/)
- [FLUTTERING BUTTERFLY](https://aestheticsymbols.io/symbol/fluttering-butterfly/)
- [BLUSHING SOFT SMILE KAOMOJI](https://aestheticsymbols.io/symbol/blushing-soft-smile-kaomoji/)
- [SYM 268D](https://aestheticsymbols.io/symbol/sym-268d/)
- [SYM 265D](https://aestheticsymbols.io/symbol/sym-265d/)
- [LEFT RIGHT EXCHANGE ARROWS](https://aestheticsymbols.io/symbol/left-right-exchange-arrows/)
- [CHEERING FIGHTING FIST KAOMOJI](https://aestheticsymbols.io/symbol/cheering-fighting-fist-kaomoji/)
- [SYM 1D44D](https://aestheticsymbols.io/symbol/sym-1d44d/)
- [INSTAGRAM BIO](https://aestheticsymbols.io/instagram-bio/)
- [SYM 1D416](https://aestheticsymbols.io/symbol/sym-1d416/)
- [SYM 1D467](https://aestheticsymbols.io/symbol/sym-1d467/)
- [SYM 1D4A4](https://aestheticsymbols.io/symbol/sym-1d4a4/)
- [SYM 1D47D](https://aestheticsymbols.io/symbol/sym-1d47d/)
- [JA](https://aestheticsymbols.io/ja/)
- [LEFT WHITE CORNER BRACKET](https://aestheticsymbols.io/symbol/left-white-corner-bracket/)
- [SYM 1F62E](https://aestheticsymbols.io/symbol/sym-1f62e/)
- [SYM 26AC](https://aestheticsymbols.io/symbol/sym-26ac/)
- [RIGHT WING CLAN FLARE](https://aestheticsymbols.io/symbol/right-wing-clan-flare/)
- [FREE FIRE CLAN EMPEROR CROWN](https://aestheticsymbols.io/symbol/free-fire-clan-emperor-crown/)
- [SYM 26FA](https://aestheticsymbols.io/symbol/sym-26fa/)
- [SYM 2749](https://aestheticsymbols.io/symbol/sym-2749/)
- [RINGED PLANET SATURN](https://aestheticsymbols.io/symbol/ringed-planet-saturn/)
- [SYM 1F62D](https://aestheticsymbols.io/symbol/sym-1f62d/)
- [SYM 1D41F](https://aestheticsymbols.io/symbol/sym-1d41f/)
- [SYM 1D41C](https://aestheticsymbols.io/symbol/sym-1d41c/)
- [SYM 262A](https://aestheticsymbols.io/symbol/sym-262a/)
- [SYM 1D475](https://aestheticsymbols.io/symbol/sym-1d475/)
- [ROBLOX NAMES](https://aestheticsymbols.io/es/roblox-names/)
- [RU](https://aestheticsymbols.io/ru/)
- [SYM 1D446](https://aestheticsymbols.io/symbol/sym-1d446/)
- [MUSIC WEATHER](https://aestheticsymbols.io/es/music-weather/)
- [LEFT BLACK LENTICULAR BRACKET](https://aestheticsymbols.io/symbol/left-black-lenticular-bracket/)
- [RIGHT BLACK LENTICULAR BRACKET](https://aestheticsymbols.io/symbol/right-black-lenticular-bracket/)
- [SWIMMING FISH RIGHT](https://aestheticsymbols.io/symbol/swimming-fish-right/)
- [FLOWER GIRL SMILE KAOMOJI](https://aestheticsymbols.io/symbol/flower-girl-smile-kaomoji/)
- [ZODIAC CELESTIAL](https://aestheticsymbols.io/pt/zodiac-celestial/)
- [ARROWS LINES](https://aestheticsymbols.io/pt/arrows-lines/)
- [BORDERS DIVIDERS](https://aestheticsymbols.io/pt/borders-dividers/)
- [TIKTOK CAPTIONS](https://aestheticsymbols.io/tiktok-captions/)
- [SYM 262D](https://aestheticsymbols.io/symbol/sym-262d/)
- [SYM 2639 FE0F](https://aestheticsymbols.io/symbol/sym-2639-fe0f/)
- [SYM 1D464](https://aestheticsymbols.io/symbol/sym-1d464/)
- [SYM 1D472](https://aestheticsymbols.io/symbol/sym-1d472/)
- [SYM 1F970](https://aestheticsymbols.io/symbol/sym-1f970/)
- [SYM 1D43A](https://aestheticsymbols.io/symbol/sym-1d43a/)
- [SYM 26BB](https://aestheticsymbols.io/symbol/sym-26bb/)
- [SYM 1F60B](https://aestheticsymbols.io/symbol/sym-1f60b/)
- [SYM 1F615](https://aestheticsymbols.io/symbol/sym-1f615/)
- [SYM 265A](https://aestheticsymbols.io/symbol/sym-265a/)
- [VIRGO ZODIAC MAIDEN](https://aestheticsymbols.io/symbol/virgo-zodiac-maiden/)
- [SYM 1F609](https://aestheticsymbols.io/symbol/sym-1f609/)
- [SYM 1F61A](https://aestheticsymbols.io/symbol/sym-1f61a/)
- [SYM 1D42B](https://aestheticsymbols.io/symbol/sym-1d42b/)
- [SYM 1D43C](https://aestheticsymbols.io/symbol/sym-1d43c/)
- [SYM 1D470](https://aestheticsymbols.io/symbol/sym-1d470/)
- [SYM 2673](https://aestheticsymbols.io/symbol/sym-2673/)
- [SYM 1F976](https://aestheticsymbols.io/symbol/sym-1f976/)
- [SYM 1D418](https://aestheticsymbols.io/symbol/sym-1d418/)
- [SYM 1F973](https://aestheticsymbols.io/symbol/sym-1f973/)
- [SYM 1D442](https://aestheticsymbols.io/symbol/sym-1d442/)
- [SYM 1FAE4](https://aestheticsymbols.io/symbol/sym-1fae4/)
- [LAST QUARTER CRESCENT MOON](https://aestheticsymbols.io/symbol/last-quarter-crescent-moon/)
- [SYM 1D44B](https://aestheticsymbols.io/symbol/sym-1d44b/)
- [KAOMOJI](https://aestheticsymbols.io/pt/kaomoji/)
- [GAMING WEAPONS](https://aestheticsymbols.io/gaming-weapons/)
- [SYM 26A9](https://aestheticsymbols.io/symbol/sym-26a9/)
- [SYM 26F5](https://aestheticsymbols.io/symbol/sym-26f5/)
- [SYM 1F4A9](https://aestheticsymbols.io/symbol/sym-1f4a9/)
- [SYM 2743](https://aestheticsymbols.io/symbol/sym-2743/)
- [INSTAGRAM BIO](https://aestheticsymbols.io/es/instagram-bio/)
- [HEARTS](https://aestheticsymbols.io/hearts/)
- [SPARKLE DOT FLARE](https://aestheticsymbols.io/symbol/sparkle-dot-flare/)
- [SYM 2686](https://aestheticsymbols.io/symbol/sym-2686/)
- [SYM 2610](https://aestheticsymbols.io/symbol/sym-2610/)
- [SYM 1D49C](https://aestheticsymbols.io/symbol/sym-1d49c/)
- [SYM 2746](https://aestheticsymbols.io/symbol/sym-2746/)
- [SYM 26BA](https://aestheticsymbols.io/symbol/sym-26ba/)
- [SYM 1D45F](https://aestheticsymbols.io/symbol/sym-1d45f/)
- [SYM 1D463](https://aestheticsymbols.io/symbol/sym-1d463/)
- [NATURE FLOWERS](https://aestheticsymbols.io/nature-flowers/)
- [SYM 2621](https://aestheticsymbols.io/symbol/sym-2621/)
- [SYM 1F608](https://aestheticsymbols.io/symbol/sym-1f608/)
- [STARS](https://aestheticsymbols.io/stars/)
- [SYM 1D401](https://aestheticsymbols.io/symbol/sym-1d401/)
- [SYM 1D40A](https://aestheticsymbols.io/symbol/sym-1d40a/)
- [SYM 26E6](https://aestheticsymbols.io/symbol/sym-26e6/)
- [SYM 1D480](https://aestheticsymbols.io/symbol/sym-1d480/)
- [SYM 1D43F](https://aestheticsymbols.io/symbol/sym-1d43f/)
- [SYM 2663](https://aestheticsymbols.io/symbol/sym-2663/)
- [SYM 1F603](https://aestheticsymbols.io/symbol/sym-1f603/)
- [BRACKETS](https://aestheticsymbols.io/pt/brackets/)
- [TIKTOK CAPTIONS](https://aestheticsymbols.io/es/tiktok-captions/)
- [SYM 26EA](https://aestheticsymbols.io/symbol/sym-26ea/)
- [SYM 1F605](https://aestheticsymbols.io/symbol/sym-1f605/)
- [SYM 1D433](https://aestheticsymbols.io/symbol/sym-1d433/)
- [BLACK HEART](https://aestheticsymbols.io/symbol/black-heart/)
- [SYM 1F61F](https://aestheticsymbols.io/symbol/sym-1f61f/)
- [SYM 1D49E](https://aestheticsymbols.io/symbol/sym-1d49e/)
- [SHADOWED WHITE STAR](https://aestheticsymbols.io/symbol/shadowed-white-star/)
- [SYM 1D486](https://aestheticsymbols.io/symbol/sym-1d486/)
- [SYM 2624](https://aestheticsymbols.io/symbol/sym-2624/)
- [MUSIC WEATHER](https://aestheticsymbols.io/music-weather/)
- [SYM 268B](https://aestheticsymbols.io/symbol/sym-268b/)
- [SYM 26BE](https://aestheticsymbols.io/symbol/sym-26be/)
- [SYM 2635](https://aestheticsymbols.io/symbol/sym-2635/)
- [SYM 1FAE1](https://aestheticsymbols.io/symbol/sym-1fae1/)
- [SYM 1D407](https://aestheticsymbols.io/symbol/sym-1d407/)
- [WHITE STAR](https://aestheticsymbols.io/symbol/white-star/)
- [SYM 1F97A](https://aestheticsymbols.io/symbol/sym-1f97a/)
- [SYM 1D44C](https://aestheticsymbols.io/symbol/sym-1d44c/)
- [SYM 2612](https://aestheticsymbols.io/symbol/sym-2612/)
- [SYM 1F620](https://aestheticsymbols.io/symbol/sym-1f620/)
- [SYM 1D40F](https://aestheticsymbols.io/symbol/sym-1d40f/)
- [WARM HUG EMBRACE KAOMOJI](https://aestheticsymbols.io/symbol/warm-hug-embrace-kaomoji/)
- [SYM 1D44F](https://aestheticsymbols.io/symbol/sym-1d44f/)
- [SYM 1D445](https://aestheticsymbols.io/symbol/sym-1d445/)
- [SKULL AND CROSSBONES](https://aestheticsymbols.io/symbol/skull-and-crossbones/)
- [SYM 26E3](https://aestheticsymbols.io/symbol/sym-26e3/)
- [SYM 1D471](https://aestheticsymbols.io/symbol/sym-1d471/)
