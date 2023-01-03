#!/usr/bin/env node
const yargs = require('yargs');
const {runApp} = require("../app");

const argv = yargs
    .option('to', {
        alias: 't',
        description: 'Proxy To',
        type: 'string'
    })
    .option('replace', {
        alias: 'r',
        description: 'Replace Origin',
        type: 'string'
    })
    .option('port', {
        alias: 'p',
        description: 'Port',
        type: 'string'
    })
    .help()
    .alias('help', 'h').argv;

runApp(argv.to, argv.replace, argv.port)
