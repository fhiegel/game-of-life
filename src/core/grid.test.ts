import { Grid } from "./grid";
import { Cell, LivingState } from "./cell";

describe(`Grid`, () => {

  describe(`Singleton`, () => {

    it(`can find a given Cell`, () => {
      const grid = new Grid([
        [Cell.alive()]
      ]);

      const cell = grid.cellAt({ x: 0, y: 0 });

      expect(cell.living).toBe(LivingState.alive);
    });

    it(`return no siblings`, () => {
      const grid = new Grid([
        [Cell.alive()]
      ]);

      const siblings: Cell[] = grid.siblingsFor({ x: 0, y: 0 });

      expect(siblings).toHaveLength(0);
    });
  })

  describe(`2x2`, () => {
    [
      { position: { x: 0, y: 0 }, expectedState: LivingState.alive },
      { position: { x: 1, y: 0 }, expectedState: LivingState.dead },
      { position: { x: 0, y: 1 }, expectedState: LivingState.alive },
      { position: { x: 1, y: 1 }, expectedState: LivingState.alive },
    ].forEach(({ position, expectedState }) => it(`can find a given Cell at ${JSON.stringify(position)}`, () => {
      const grid = new Grid([
        [Cell.alive(), Cell.dead()],
        [Cell.alive(), Cell.alive()]
      ]);

      const cell = grid.cellAt(position);

      expect(cell.living).toBe(expectedState);
    }));

    it(`return three siblings`, () => {
      const grid = new Grid([
        [Cell.alive(), Cell.dead()],
        [Cell.alive(), Cell.alive()]
      ]);

      const siblings: Cell[] = grid.siblingsFor({ x: 0, y: 0 });

      expect(siblings).toHaveLength(3);
    });
  })

  describe(`evolve`, () => {

    it(`full dead field remains dead`, () => {
      const grid = new Grid([
        [Cell.dead(), Cell.dead()],
        [Cell.dead(), Cell.dead()]
      ]);

      const evolvedGrid: Grid = grid.evolve();


      expect(evolvedGrid.cellAt({ x: 0, y: 0 }).living).toBe(LivingState.dead)
      expect(evolvedGrid.cellAt({ x: 1, y: 0 }).living).toBe(LivingState.dead)
      expect(evolvedGrid.cellAt({ x: 0, y: 1 }).living).toBe(LivingState.dead)
      expect(evolvedGrid.cellAt({ x: 1, y: 1 }).living).toBe(LivingState.dead)
    });

    it(`full alive field remains alive`, () => {
      const grid = new Grid([
        [Cell.alive(), Cell.alive()],
        [Cell.alive(), Cell.alive()]
      ]);

      const evolvedGrid: Grid = grid.evolve();


      expect(evolvedGrid.cellAt({ x: 0, y: 0 }).living).toBe(LivingState.alive)
      expect(evolvedGrid.cellAt({ x: 1, y: 0 }).living).toBe(LivingState.alive)
      expect(evolvedGrid.cellAt({ x: 0, y: 1 }).living).toBe(LivingState.alive)
      expect(evolvedGrid.cellAt({ x: 1, y: 1 }).living).toBe(LivingState.alive)
    });

    it(`evolves as Cell logic`, () => {
      const grid = new Grid([
        [Cell.alive(), Cell.dead()],
        [Cell.alive(), Cell.alive()]
      ]);

      const evolvedGrid: Grid = grid.evolve();


      expect(evolvedGrid.cellAt({ x: 0, y: 0 }).living).toBe(LivingState.alive)
      expect(evolvedGrid.cellAt({ x: 1, y: 0 }).living).toBe(LivingState.alive)
      expect(evolvedGrid.cellAt({ x: 0, y: 1 }).living).toBe(LivingState.alive)
      expect(evolvedGrid.cellAt({ x: 1, y: 1 }).living).toBe(LivingState.alive)
    });

  })

})

describe(`print grid`, () => {
  it(`evolves as Cell logic`, () => {
    const grid = new Grid([
      [Cell.alive(), Cell.dead()],
      [Cell.alive(), Cell.alive()]
    ]);

    expect(grid.render()).toBe("*o\n**")
  })
})
