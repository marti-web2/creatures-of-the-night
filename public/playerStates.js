import { Dust, Splash, Fire } from './particles.js'

const states = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
  ROLLING: 4,
  DIVING: 5,
  HIT: 6
}

class State {
  constructor(state, game) {
    this.state = state
    this.game = game
  }
}

export class Sitting extends State {
  constructor(game) {
    super('SITTING', game)
  }

  enter() {
    this.game.player.frameX = 0
    this.game.player.maxFrame = 4
    this.game.player.frameY = 5
  }

  handleInput(input) {
    if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {

    }
  }
}

export class Running extends State {
  constructor(game) {
    super('RUNNING', game)
  }

  enter() {
    this.game.player.frameX = 0
    this.game.player.maxFrame = 8
    this.game.player.frameY = 3
  }

  handleInput(input) {
    if (input.includes('ArrowUp')) {

    } else if (input.includes('ArrowDown')) {

    }
  }
}

export class Jumping extends State {
  constructor(game) {
    super('JUMPING', game)
  }

  enter() {
    this.game.player.frameX = 0
    this.game.player.maxFrame = 6
    this.game.player.frameY = 1
  }

  handleInput(input) {
    if (input.includes('ArrowDown')) {

    }
  }
}

export class Falling extends State {
  constructor(game) {
    super('FALLING', game)
  }

  enter() {
    this.game.player.frameX = 0
    this.game.player.maxFrame = 6
    this.game.player.frameY = 2
  }

  handleInput(input) {
    if (this.game.player.onGround()) {

    }
  }
}

export class Rolling extends State {
  constructor(game) {
    super('ROLLING', game)
  }

  enter() {
    this.game.player.frameX = 0
    this.game.player.maxFrame = 6
    this.game.player.frameY = 6
  }

  handleInput(input) {

  }
}

export class Diving extends State {
  constructor(game) {
    super('DIVING', game)
  }

  enter() {
    this.game.player.frameX = 0
    this.game.player.maxFrame = 6
    this.game.player.frameY = 6
  }

  handleInput(input) {

  }
}

export class Hit extends State {
  constructor(game) {
    super('HIT', game)
  }

  enter() {
    this.game.player.frameX = 0
    this.game.player.maxFrame = 6
    this.game.player.frameY = 4
  }

  handleInput(input) {
    
  }
}