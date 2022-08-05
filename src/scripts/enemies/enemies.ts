import IGame from "../main"

class Enemy {
  frameX: number
  frameY: number
  fps: number
  frameInterval: number
  frameTimer: number
  markedForDeletion: boolean
  x: number
  y: number
  speedX: number
  speedY: number
  maxFrame: number
  image: HTMLImageElement | null
  game: IGame | null
  width: number
  height: number

  constructor() {
    this.frameX = 0
    this.frameY = 0
    this.fps = 20
    this.frameInterval = 1000 / this.fps
    this.frameTimer = 0
    this.markedForDeletion = false
    this.x = 0
    this.y = 0
    this.speedX = 0
    this.speedY = 0
    this.maxFrame = 0
    this.image = null
    this.game = null
    this.width = 0
    this.height = 0
  }

  update(deltaTime: number) {
    // movement
    this.x -= this.speedX + this.game!.speed
    this.y += this.speedY
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0
      if (this.frameX < this.maxFrame) {
        this.frameX++
      } else {
        this.frameX = 0
      }
    } else {
      this.frameTimer += deltaTime
    }

    // check if offscreen
    if (this.x + this.width < 0) {
      this.markedForDeletion = true
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image as HTMLImageElement,
      this.frameX * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}

export class FlyingEnemy extends Enemy {
  image: HTMLImageElement
  angle: number
  va: number

  constructor(game: IGame) {
    super()
    this.game = game
    this.width = 60
    this.height = 44
    this.x = this.game.width + Math.random() * this.game.width * 0.5
    this.y = Math.random() * this.game.height * 0.5
    this.speedX = Math.random() + 1
    this.speedY = 0
    this.maxFrame = 5
    this.image = document.getElementById("enemy_fly") as HTMLImageElement
    this.angle = 0
    this.va = Math.random() * 0.1 + 0.1
  }

  update(deltaTime: number) {
    super.update(deltaTime)
    this.angle += this.va
    this.y += Math.sin(this.angle)
  }
}

export class GroundEnemy extends Enemy {
  constructor(game: IGame) {
    super()
    this.game = game
    this.width = 60
    this.height = 87
    this.x = this.game.width
    this.y = this.game.height - this.height - this.game.groundMargin
    this.image = document.getElementById("enemy_plant") as HTMLImageElement
    this.speedX = 0
    this.speedY = 0
    this.maxFrame = 1
  }

  update(deltaTime: number) {
    super.update(deltaTime)
  }
}

export class ClimbingEnemy extends Enemy {
  constructor(game: IGame) {
    super()
    this.game = game
    this.width = 120
    this.height = 144
    this.x = this.game.width
    this.y = Math.random() * this.game.height * 0.5
    this.image = document.getElementById("enemy_spider_big") as HTMLImageElement
    this.speedX = 0
    this.speedY = Math.random() > 0.5 ? 1 : -1
    this.maxFrame = 5
  }

  update(deltaTime: number) {
    super.update(deltaTime)
    if (this.y > this.game!.height - this.height - this.game!.groundMargin) {
      this.speedY *= -1
    }
    if (this.y < -this.height) {
      this.markedForDeletion = true
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx)
    ctx.beginPath()
    ctx.moveTo(this.x + this.width / 2, 0)
    ctx.lineTo(this.x + this.width / 2, this.y + 50)
    ctx.stroke()
  }
}
