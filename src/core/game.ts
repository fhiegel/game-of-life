import { Player } from './player'
import { CartesianMap } from './world'

type SoftGameArgs = {
  players?: Player[];
  world?: CartesianMap;
}
type GameArgs = {
  players: Player[];
  world: CartesianMap;
}

export abstract class Game {
  public readonly world: CartesianMap

  abstract nextTurn(): Game;

  static of({ players = [], world = CartesianMap.of({ width: 1, height: 1 }) }: SoftGameArgs): Game {
    return new InitializingGame({
      players,
      world
    }).nextTurn()
  }

  protected constructor(args: { world: CartesianMap }) {
    this.world = args.world
  }

  private _playersHaveUniqueNames(players: Player[]) {
    return players.some((player, index) => players.findIndex(item => item.name === player.name) !== index)
  }

  protected validateGame({ players, world }: GameArgs): Game {
    if (this._playersHaveUniqueNames(players)) {
      return new InvalidGame({
        previous: this,
        error: 'Names should be different.'
      })
    }
    return new ValidGame(
      {
        players,
        world
      }
    )
  }

}

class InitializingGame extends Game {
  private readonly args: GameArgs

  constructor(args: GameArgs) {
    super({ world: args.world })
    this.args = args
  }

  nextTurn(): Game {
    return super.validateGame(this.args)
  }

}

export class ValidGame extends Game {

  public readonly players: Player[]

  constructor({ players, world }: GameArgs) {
    super({ world: world })
    this.players = players
  }

  nextTurn(): Game {
    return super.validateGame({
      players: this.players.map(player => player.play()),
      world: this.world,
    })
  }
}

type InvalidGameArgs = {
  previous: Game;
  error: string;
}

export class InvalidGame extends Game {
  private readonly previous: Game
  public readonly error: string

  constructor({ previous, error }: InvalidGameArgs) {
    super(previous)
    this.previous = previous
    this.error = error
  }

  nextTurn(): Game {
    return this.previous.nextTurn()
  }

}