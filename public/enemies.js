class Enemy {
  constructor() {
    this.frameX = 0
    this.frameY = 0
    this.fps = 20
    this.frameInterval = 1000 / this.fps
    this.frameTimer = 0
  }

  update(deltaTime) {
    // movement


    // check if offscreen

  }

  draw(ctx) {

  }
}

export class FlyingEnemy extends Enemy {
  constructor(game) {
    super()
    this.game = game
    this.width = 60
    this.height = 44
    this.x = 200
    this.y = 200
    this.speedX = 2
    this.maxFrame = 5
    this.image = enemy_fly
    this.angle = 0
    this.va = Math.random() * 0.1 + 0.1
  }

  update(deltaTime) {
    super.update(deltaTime)

  }
}

export class GroundEnemy extends Enemy {
  constructor(game) {
    super()
    this.game = game
    this.width = 60
    this.height = 87
    this.x = this.game.width
    this.y = this.game.height - this.height - this.game.groundMargin
    this.image = enemy_plant
    this.speedX = 0
    this.speedY = 0
    this.maxFrame = 1
  }

  update(deltaTime) {
    super.update(deltaTime)
  }
}

export class ClimbingEnemy extends Enemy {
  constructor(game) {
    super()
    this.game = game
    this.width = 120
    this.height = 144
    this.x = this.game.width
    this.y = Math.random() * this.game.height * 0.5
    this.image = enemy_spider_big
    this.speedX = 0
    this.speedY = Math.random() > 0.5 ? 1 : -1
  }

  update(deltaTime) {
    super.update(deltaTime)
  }

  draw(ctx) {
    super.draw(ctx)
    // ctx.beginPath()
    // ctx.moveTo(this.x + this.width/2, 0)
    // ctx.lineTo(this.x + this.width/2, this.y + 50)
    // ctx.stroke()
  }
}