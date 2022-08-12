import {
  State,
  Sitting,
  Running,
  Jumping,
  Falling,
  Rolling,
  Diving,
  Hit,
} from "./playerStates"
import { CollisionAnimation } from "../fx/collisionAnimation"
import { FloatingMessage } from "../ui/floatingMessages"
import IGame from "../main"

export default class Player {
  game: IGame
  width: number
  height: number
  x: number
  y: number
  vy: number
  weight: number
  image: HTMLImageElement

  frameX: number
  frameY: number
  maxFrame: number | null
  fps: number
  frameInterval: number
  frameTimer: number
  speed: number
  maxSpeed: number
  states: [Sitting, Running, Jumping, Falling, Rolling, Diving, Hit]
  currentState: State | null

  constructor(game: IGame) {
    this.game = game
    this.width = 100
    this.height = 91.3
    this.x = 0
    this.y = this.game.height - this.height - this.game.groundMargin
    this.vy = 0
    this.weight = 1
    this.image = document.getElementById("player") as HTMLImageElement

    this.frameX = 0
    this.frameY = 0
    this.maxFrame = null
    this.fps = 20
    this.frameInterval = 1000 / this.fps
    this.frameTimer = 0
    this.speed = 0
    this.maxSpeed = this.game.maxSpeed * 0.25
    this.states = [
      new Sitting(this.game),
      new Running(this.game),
      new Jumping(this.game),
      new Falling(this.game),
      new Rolling(this.game),
      new Diving(this.game),
      new Hit(this.game),
    ]
    this.currentState = null
  }

  update(input: string[], deltaTime: number) {
    this.checkCollision()
    this.currentState!.handleInput(input)

    // horizontal movement
    this.x += this.speed
    if (input.includes("ArrowRight") && this.currentState !== this.states[6]) {
      this.speed = this.maxSpeed
    } else if (
      input.includes("ArrowLeft") &&
      this.currentState !== this.states[6]
    ) {
      this.speed = -this.maxSpeed
    } else {
      this.speed = 0
    }

    // horizontal boundaries
    if (this.x < 0) {
      this.x = 0
    }
    if (this.x > this.game.width - this.width) {
      this.x = this.game.width - this.width
    }

    // vertical movement
    this.y += this.vy
    if (!this.onGround()) {
      this.vy += this.weight
    } else {
      this.vy = 0
    }

    // vertical boundaries
    if (this.y > this.game.height - this.height - this.game.groundMargin) {
      this.y = this.game.height - this.height - this.game.groundMargin
    }

    // sprite animation
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0
      if (this.frameX < this.maxFrame!) {
        this.frameX++
      } else {
        this.frameX = 0
      }
    } else {
      this.frameTimer += deltaTime
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.game.debug) {
      ctx.strokeRect(this.x, this.y, this.width, this.height)
    }
    ctx.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  onGround() {
    return this.y >= this.game.height - this.height - this.game.groundMargin
  }

  setState(state: number, speed: number) {
    this.currentState = this.states[state]
    this.game.speed = this.game.maxSpeed * speed
    this.currentState.enter()
  }

  checkCollision() {
    this.game.enemies.forEach((enemy) => {
      if (
        enemy.x < this.x + this.width &&
        enemy.x + enemy.width > this.x &&
        enemy.y < this.y + this.height &&
        enemy.y + enemy.height > this.y
      ) {
        // collision detected
        enemy.markedForDeletion = true
        this.game.collisions.push(
          new CollisionAnimation(
            this.game,
            enemy.x + enemy.width * 0.5,
            enemy.y + enemy.height * 0.5
          )
        )
        if (
          this.currentState === this.states[4] ||
          this.currentState === this.states[5]
        ) {
          this.game.score++
          this.game.sounds.playSound("fireKill")
          this.game.floatingMessages.push(
            new FloatingMessage("+1", enemy.x, enemy.y, 150, 50)
          )
          if (this.game.score >= this.game.winningScore) {
            this.game.gameOver = true
          }
        } else {
          this.setState(6, 0)
          this.game.score -= 2
          this.game.lives--
          if (this.game.lives <= 0) {
            this.game.gameOver = true
          }
        }
      }
    })
  }
}
