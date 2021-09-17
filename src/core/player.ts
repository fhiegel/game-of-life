type PlayerArgs = {
    name: string;
    gold?: number;
}

export class Player {
    public readonly gold: number
    public readonly name: string

    constructor({ name, gold = 0 }: PlayerArgs) {
        this.name = name
        this.gold = gold
    }

    play(): Player {
        return new Player({
            name: this.name,
            gold: this.gold + 1
        })
    }
}