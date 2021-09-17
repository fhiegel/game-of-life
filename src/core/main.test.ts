import { Game, InvalidGame, ValidGame } from './game'
import { Player } from './player'
import { CartesianMap, INEXISTANT_TILE } from './world'

type PawnArgs = {
  owner: Player
}

class Pawn {
  public readonly owner: Player

  constructor({ owner }: PawnArgs) {
    this.owner = owner
  }

}

describe(`Players`, () => {

  it(`should have a name`, () => {
    const player = new Player({ name: 'Georges' })
    expect(player.name).toBe('Georges')
  })

  it(`should have different names`, () => {
    const player = new Player({ name: 'Georges' })
    const player2 = new Player({ name: 'Georges' })

    const game = Game.of({
      players: [player, player2]
    })
    expect(game).toBeInstanceOf(InvalidGame)
    expect((game as InvalidGame).error).toBe('Names should be different.')
  })

  it(`starts with no gold`, () => {
    const player = new Player({ name: 'Georges' })
    expect(player.gold).toBe(0)
  })

  it(`get one gold when game goes on next turn`, () => {
    let game = Game.of({
      players: [
        new Player({ name: 'Georges' }),
        new Player({ name: 'Jean' })
      ]
    }) as ValidGame

    game = game.nextTurn() as ValidGame

    game.players.every((player: Player) =>
      expect(player.gold).toBe(1))
  })

  it(`own pawns`, () => {
    let player = new Player({ name: 'Georges' })
    // let game = new Game({
    //   players: [
    //     new Player({ name: 'Georges' }),
    //   ],
    //   world: CartesianMap.of({ width: 1, height: 1 })
    // })
    let pawn = new Pawn({ owner: player })

    expect(pawn.owner).toBe(player)
  })


  it(`can put a pawns on Cartesian Map`, () => {
    let player = new Player({ name: 'Georges' })
    let game = Game.of({
      players: [
        new Player({ name: 'Georges' }),
      ],
      world: CartesianMap.of({ width: 1, height: 1 })
    })

    let pawn = new Pawn({ owner: player })
    // game.world.at(CartesianPosition.of({ x: 0, y: 0 })).add(pawn)
    // game.world.at({ x: 0, y: 0 }).add(pawn)

    // expect(game.owner).toBe(player)
  })

})

describe(`Cartesian Map`, () => {

  it(`should be created`, () => {
    const map = CartesianMap.of({
      width: 1,
      height: 1
    })
    expect(map.size).toEqual({
      width: 1,
      height: 1,
    })
  });

  [
    { width: 1, height: 1 },
    { width: 1, height: 2 },
    { width: 2, height: 1 },
    { width: 2, height: 2 }
  ].forEach((size) => {
      it(`should have ${size.width * size.height} tiles`, () => {
        const map = CartesianMap.of(size)
        expect(map.tiles.length).toBe(size.width * size.height)
      })
    }
  );

  [
    { size: { width: 1, height: 1 }, position: { x: 0, y: 0 } },
    { size: { width: 2, height: 1 }, position: { x: 0, y: 0 } },
    { size: { width: 2, height: 1 }, position: { x: 1, y: 0 } },
    { size: { width: 1, height: 2 }, position: { x: 0, y: 0 } },
    { size: { width: 1, height: 2 }, position: { x: 0, y: 1 } },
  ].forEach(({ size, position }) => {
    it(`should map of ${size.width}x${size.height} have existing tile at x:${position.x} y:${position.y}`, () => {
      const map = CartesianMap.of(size)
      const tile = map.at(position)

      expect(tile).toBeDefined()
      expect(tile).not.toEqual(INEXISTANT_TILE)
    })
  });

  [
    { size: { width: 1, height: 1 }, position: { x: 1, y: 1 } },
    { size: { width: 1, height: 1 }, position: { x: 0, y: 1 } },
    { size: { width: 1, height: 1 }, position: { x: 1, y: 0 } },
    { size: { width: 2, height: 1 }, position: { x: 2, y: 0 } },
  ].forEach(({ size, position }) => {
    it(`should map of ${size.width}x${size.height} have inexistant tile at x:${position.x} y:${position.y}`, () => {
      const map = CartesianMap.of(size)
      expect(map.at(position)).toEqual(INEXISTANT_TILE)
    })
  })

  it(`can put a pawns on Cartesian Map`, () => {
    const player = new Player({ name: 'Georges' })
    const pawn = new Pawn({ owner: player })
    const map = CartesianMap.of({ width: 1, height: 1 })

    map.at({ x: 0, y: 0 }).add(pawn)

    expect(map.at({ x: 0, y: 0 }).get()).toBe(pawn)
  })

})