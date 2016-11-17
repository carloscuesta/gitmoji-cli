#!/usr/bin/env node
'use strict';

const meow = require('meow');
const axios = require('axios');
const chalk = require('chalk');
const gitmojis = 'https://raw.githubusercontent.com/carloscuesta/gitmoji/master/src/data/gitmojis.json';

const cli = meow(`
    Usage
      $ gitmoji

    Options
        --init, -i  Create and initialize the gitmoji commit hook
        --list, -l  Output all the gitmojis
`, {
    alias: {
        i: 'init',
        l: 'list'
    }
});

if (cli.flags.list) {

axios.get(gitmojis)
    .then(function (res) {
        let gitmojiList = res.data.gitmojis;

        let gitmojiPrettyList = gitmojiList.map( (obj) => {
            let list = {};
            list = `${obj.emoji}  - ${obj.code} - ${obj.description}`;
            return list;
        });

        console.log(gitmojiPrettyList);
    })
    .catch(function (error) {
    console.log(error);
    });
}
