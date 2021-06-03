#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const path = require('path');
const program = require('commander');

clear();
console.log(
  chalk.red(
    figlet.textSync('Game Of Life', { horizontalLayout: 'full' })
  )
);

program
  .version('0.0.1')
  .description("Game Of Life simple CLI runner")
  .action((options: any) => {
    console.log(chalk.green('Ready'));
  })
  .parse(process.argv);