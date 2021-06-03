import { Cell, LivingState } from "./cell";

export class Grid {
  private readonly grid: Cell[][];


  constructor(grid: Cell[][]) {
    this.grid = grid;
  }

  cellAt(position: { x: number; y: number }): Cell {
    return this.grid[position.y][position.x];
  }

  siblingsFor(position: { x: number; y: number }) {
    return Position.of(position)
      .siblings()
      .filter(position => this.contains(position))
      .map(position => this.cellAt(position));
  }

  private contains(position: Position) {
    return 0 <= position.x && position.x < this.grid[0].length
      && 0 <= position.y && position.y < this.grid.length;
  }

  evolve(): Grid {
    let grid: Cell[][] = Array(this.grid.length).fill(Array(this.grid[0].length));
    for (let x = 0; x < this.grid[0].length; x++) {
      for (let y = 0; y < this.grid.length; y++) {
        const position = { x: x, y: y };
        const siblings = this.siblingsFor(position);
        grid[y][x] = this.cellAt(position).evolve(siblings)
      }
    }
    return new Grid(grid);
  }

  render() {
    return this.grid.map(row => row.map(cell => cell.living == LivingState.alive ? '*' : 'o').join('')).join('\n')
  }
}

class Position {
  public readonly x: number;
  public readonly y: number;

  private constructor(args: { x: number, y: number }) {
    this.x = args.x;
    this.y = args.y;
  }

  static of(args: { x: number, y: number }) {
    return new Position(args)
  }

  down(): Position {
    return Position.of({ x: this.x, y: this.y + 1 })
  }

  up(): Position {
    return Position.of({ x: this.x, y: this.y - 1 })
  }

  left(): Position {
    return Position.of({ x: this.x - 1, y: this.y })
  }

  right(): Position {
    return Position.of({ x: this.x + 1, y: this.y })
  }

  siblings(): Position[] {
    return [
      this.up(),
      this.up().left(),
      this.up().right(),
      this.left(),
      this.right(),
      this.down(),
      this.down().left(),
      this.down().right(),
    ];
  }

}