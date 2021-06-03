export enum LivingState {
  dead,
  alive,
}

export class Cell {
  public readonly living

  private constructor(param: { living: LivingState }) {
    this.living = param.living;
  }

  static alive(): Cell {
    return new Cell({ living: LivingState.alive });
  }

  static dead(): Cell {
    return new Cell({ living: LivingState.dead });
  }

  evolve(siblings: Cell[]): Cell {
    const aliveSiblings = siblings.filter(cell => cell.living == LivingState.alive);
    if (this.living == LivingState.alive && 2 == aliveSiblings.length) {
      return Cell.alive();
    }
    if (aliveSiblings.length == 3) {
      return Cell.alive();
    }
    return Cell.dead();
  }
}