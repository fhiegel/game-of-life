#!/usr/bin/env node

import { Cell } from "./core/cell";
import { Grid } from "./core/grid";

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
  .action(async (options: any) =>  {
    console.log(chalk.green('Ready'));
    let grid = new Grid([
      [Cell.alive(), Cell.dead(),Cell.alive(), Cell.dead(),Cell.alive(), Cell.dead()],
      [Cell.alive(), Cell.dead(),Cell.alive(), Cell.dead(),Cell.alive(), Cell.dead()],
      [Cell.alive(), Cell.dead(),Cell.alive(), Cell.dead(),Cell.alive(), Cell.dead()],
      [Cell.alive(), Cell.dead(),Cell.alive(), Cell.dead(),Cell.alive(), Cell.dead()],
      [Cell.alive(), Cell.dead(),Cell.alive(), Cell.dead(),Cell.alive(), Cell.dead()],
      [Cell.alive(), Cell.dead(),Cell.alive(), Cell.dead(),Cell.alive(), Cell.dead()],
    ]);
    let count = 0;
    while (count < 100) {
      clear();
      console.log(grid.render());
      console.log('---');
      grid = grid.evolve();
      await sleep(1000);
      count++
    }

  })
  .parse(process.argv);

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
