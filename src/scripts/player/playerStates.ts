import IGame from "../main"
import { Dust, Splash, Fire } from "../fx/particles"

const states = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
  ROLLING: 4,
  DIVING: 5,
  HIT: 6,
}

export interface State {
  state: string
  game: IGame

  enter(): void
  handleInput(input: string[]): void
}

export class State implements State {
  state: string
  game: IGame

  constructor(state: string, game: IGame) {
    this.state = state // debug
    this.game = game
  }
}

export class Sitting extends State {
  constructor(game: IGame) {
    super("SITTING", game)
  }

  enter() {
    this.game.player.frameX = 0
    this.game.player.maxFrame = 4
    this.game.player.frameY = 5
  }

  handleInput(input: string[]) {
    if (input.includes("ArrowLeft") || input.includes("ArrowRight")) {
      this.game.player.setState(states.RUNNING, 1)
    } else if (input.includes("c")) {
      this.game.player.setState(states.ROLLING, 2)
    }
  }
}

export class Running extends State {
  constructor(game: IGame) {
    super("RUNNING", game)
  }

  enter() {
    this.game.player.frameX = 0
    this.game.player.maxFrame = 8
    this.game.player.frameY = 3
  }

  handleInput(input: string[]) {
    this.game.particles.push(
      new Dust(
        this.game,
        this.game.player.x + this.game.player.width * 0.6,
        this.game.player.y + this.game.player.height
      )
    )
    if (input.includes("ArrowUp")) {
      this.game.player.setState(states.JUMPING, 1)
    } else if (input.includes("ArrowDown")) {
      this.game.player.setState(states.SITTING, 0)
    } else if (input.includes("c")) {
      this.game.player.setState(states.ROLLING, 2)
    }
  }
}

export class Jumping extends State {
  constructor(game: IGame) {
    super("JUMPING", game)
  }

  enter() {
    if (this.game.player.onGround()) {
      this.game.player.vy -= 24
    }
    this.game.player.frameX = 0
    this.game.player.maxFrame = 6
    this.game.player.frameY = 1
  }

  handleInput(input: string[]) {
    if (this.game.player.vy > this.game.player.weight) {
      this.game.player.setState(states.FALLING, 1)
    } else if (input.includes("c")) {
      this.game.player.setState(states.ROLLING, 2)
    } else if (input.includes("ArrowDown")) {
      this.game.player.setState(states.DIVING, 0)
    }
  }
}

export class Falling extends State {
  constructor(game: IGame) {
    super("FALLING", game)
  }

  enter() {
    this.game.player.frameX = 0
    this.game.player.maxFrame = 6
    this.game.player.frameY = 2
  }

  handleInput(input: string[]) {
    if (this.game.player.onGround()) {
      this.game.player.setState(states.RUNNING, 1)
    } else if (input.includes("ArrowDown")) {
      this.game.player.setState(states.DIVING, 0)
    }
  }
}

export class Rolling extends State {
 

  constructor(game: IGame) {
    super("ROLLING", game)
  }

  enter() {
    this.game.player.rollingTime = 0
    this.game.player.frameX = 0
    this.game.player.maxFrame = 6
    this.game.player.frameY = 6
  }

  handleInput(input: string[]) {
    this.game.particles.unshift(
      new Fire(
        this.game,
        this.game.player.x + this.game.player.width * 0.5,
        this.game.player.y + this.game.player.height * 0.5
      )
    )
    if (!input.includes("c") && this.game.player.onGround()) {
      this.game.player.setState(states.RUNNING, 1)
    } else if (!input.includes("c") && !this.game.player.onGround()) {
      this.game.player.setState(states.FALLING, 1)
    } else if (
      input.includes("c") &&
      input.includes("ArrowUp") &&
      this.game.player.onGround()
    ) {
      this.game.player.vy -= 27
    } else if (input.includes("ArrowDown") && !this.game.player.onGround()) {
      this.game.player.setState(states.DIVING, 0)
    }
  }
}

export class Diving extends State {
  constructor(game: IGame) {
    super("DIVING", game)
  }

  enter() {
    this.game.player.frameX = 0
    this.game.player.maxFrame = 6
    this.game.player.frameY = 6
    this.game.player.vy = 15
  }

  handleInput(input: string[]) {
    this.game.particles.unshift(
      new Fire(
        this.game,
        this.game.player.x + this.game.player.width * 0.5,
        this.game.player.y + this.game.player.height * 0.5
      )
    )
    if (this.game.player.onGround()) {
      this.game.player.setState(states.RUNNING, 1)
      for (let i = 0; i < this.game.splashParticles; i++) {
        this.game.particles.unshift(
          new Splash(
            this.game,
            this.game.player.x + this.game.player.width * 0.5,
            this.game.player.y + this.game.player.height
          )
        )
      }
    } else if (input.includes("c") && this.game.player.onGround()) {
      this.game.player.setState(states.ROLLING, 2)
    }
  }
}

export class Hit extends State {
  constructor(game: IGame) {
    super("HIT", game)
  }

  enter() {
    this.game.player.frameX = 0
    this.game.player.maxFrame = 10
    this.game.player.frameY = 4
  }

  handleInput(input: string[]) {
    if (this.game.player.frameX >= 10 && this.game.player.onGround()) {
      this.game.player.setState(states.RUNNING, 1)
    } else if (this.game.player.frameX >= 10 && !this.game.player.onGround()) {
      this.game.player.setState(states.FALLING, 1)
    }
  }
}
