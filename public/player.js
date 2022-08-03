import { Sitting, Running, Jumping, Falling, Rolling, Diving, Hit } from "./playerStates.js"
import CollisionAnimation from './collisionAnimation.js'
import { FloatingMessage } from "./floatingMessages.js"

export default class Player {
  constructor(game) {
    this.game = game
    this.width = 100
    this.height = 91.3
    this.x = 0
    this.y = this.game.height - this.height - this.game.groundMargin
    this.vy = 0
    this.weight = 1
    this.image = player
    this.frameX = 0
    this.frameY = 0
    this.maxFrame = 5
    this.fps = 200
    this.frameInterval = 1000 / this.fps
    this.frameTimer = 0
    this.speed = 0
    this.maxSpeed = 10
    this.states = [
      new Sitting(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game),
      new Rolling(this.game), new Diving(this.game), new Hit(this.game)
    ]
    this.currentState = null
  }

  update(input, deltaTime) {
    // horizontal movement
    this.x += this.speed
    // if (input.includes('ArrowRight')) { this.speed = this.maxSpeed }
    // else if (input.includes('ArrowLeft')) { this.speed = -this.maxSpeed }
    // else { this.speed = 0 }
    // if (this.x < 0) { this.x = 0 }
    // if (this.x > this.game.width - this.width) { this.x = this.game.width - this.width }


    // vertical movement
    this.y += this.vy


    // vertical boundaries
    if (this.y > this.game.height - this.height - this.game.groundMargin) {

    }


    // sprite animation
    if (this.frameTimer > this.frameInterval) {
      if (this.frameX < this.maxFrame) { }
      else { }
    }
  }

  draw(ctx) {
    // ctx.fillRect(this.x, this.y, this.width, this.height)
    // ctx.drawImage(
    //   this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, 
    // this.x, this.y, this.width, this.height
    //   )
  }

  onGround() {
    return this.y >= this.game.height - this.height
  }

  setState(state) {
    // this.currentState = this.states[state]
    // this.currentState.enter()
  }

  checkCollision() {
    this.game.enemies.forEach((enemy) => {
      if (enemy.x < this.x + this.width &&
        enemy.x + enemy.width > this.x &&
        enemy.y < this.y + this.height &&
        enemy.y + enemy.height > this.y) {

        if (this.currentState === this.states[4] || this.currentState === this.states[5]) {

        } else {

          if (this.game.lives <= 0) { }
        }
      }

    })
  }
}