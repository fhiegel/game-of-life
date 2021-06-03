import { Cell, LivingState } from "./cell";

// Any live cell with fewer than two live neighbours dies, as if by underpopulation.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overpopulation.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
// These rules, which compare the behavior of the automaton to real life, can be condensed into the following:
//
// Any live cell with two or three live neighbours survives.
// Any dead cell with three live neighbours becomes a live cell.
// All other live cells die in the next generation. Similarly, all other dead cells stay dead.

describe(`Alive cell`, () => {

  [
    [],
    Array(3).fill(Cell.dead()),
    Array(1).fill(Cell.alive()),
  ].forEach(siblings => it(`dies when ${JSON.stringify(siblings)} contains less than two alive siblings`, () => {
    const aliveCell = Cell.alive();

    const cell = aliveCell.evolve(siblings);

    expect(cell.living).toBe(LivingState.dead);
  }));

  [
    Array(2).fill(Cell.alive()),
    Array(3).fill(Cell.alive()),
  ].forEach(siblings => it(`survives when ${JSON.stringify(siblings)} contains two or three alive siblings`, () => {
    const aliveCell = Cell.alive();

    const cell = aliveCell.evolve(siblings);

    expect(cell.living).toBe(LivingState.alive);
  }));

  [
    Array(4).fill(Cell.alive()),
    Array(5).fill(Cell.alive()),
  ].forEach(siblings => it(`dies when ${JSON.stringify(siblings)} contains more than three siblings`, () => {
    const aliveCell = Cell.alive();

    const cell = aliveCell.evolve(siblings);

    expect(cell.living).toBe(LivingState.dead);
  }));

})
describe(`Dead cell`, () => {

  [
    [],
    Array(3).fill(Cell.dead()),
    Array(1).fill(Cell.alive()),
    Array(2).fill(Cell.alive()),
    Array(4).fill(Cell.alive()),
    Array(5).fill(Cell.alive()),
  ].forEach(siblings => it(`remains dead`, () => {
    const aliveCell = Cell.dead();

    const cell = aliveCell.evolve(siblings);

    expect(cell.living).toBe(LivingState.dead);
  }));

  [
    Array(3).fill(Cell.alive()),
  ].forEach(siblings => it(`revives when have 3 alive siblings`, () => {
    const aliveCell = Cell.dead();

    const cell = aliveCell.evolve(siblings);

    expect(cell.living).toBe(LivingState.alive);
  }));

})