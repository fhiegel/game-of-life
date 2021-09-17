export class CartesianPosition {
  public readonly x: number
  public readonly y: number

  private constructor(args: CartesianPosition) {
    this.x = args.x
    this.y = args.y
  }

  static of(args: CartesianPosition) {
    return new CartesianPosition(args)
  }

}

type Size = {
  width: number;
  height: number
};
type CartesianMapArgs = {
  size: Size
}

export type Tiles = {
  matrix: Array<Array<Tile>>;
  length: number;
};

export class Tile {

  private content = new Array<any>()

  add(item: any) {
    this.content.push(item)
  }

  get() {
    return this.content[0]
  }
}

export const INEXISTANT_TILE: Tile = new Tile()

export class CartesianMap {
  public readonly size: { width: number; height: number }
  public readonly tiles: Tiles

  private constructor(args: CartesianMapArgs) {
    this.size = args.size
    this.tiles = CartesianMap.createEmptyTiles(this.size)
  }

  private static createEmptyTiles({ width, height }: Size): Tiles {
    return {
      matrix: Array(width).fill(Array(height).fill(new Tile())),
      length: width * height
    }
  }

  static of(size: { width: number; height: number }) {
    return new CartesianMap({ size })
  }

  public at({ x, y }: CartesianPosition): Tile {
    return this.tiles.matrix[x] && this.tiles.matrix[x][y] || INEXISTANT_TILE
  }
}