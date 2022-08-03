export default class CollisionAnimation {
  constructor(game, x, y) {
    this.game = game
    this.image = collisionAnimation
    this.spriteWidth = 100
    this.spriteHeight = 90
    this.sizeModifier = Math.random() + 0.5
    this.width = this.spriteWidth * this.sizeModifier
    this.height = this.spriteHeight * this.sizeModifier
    this.x = this.width * 0.5
    this.y = y - this.height * 0.5
    this.frameX = 0
    this.maxFrame = 4
    this.markedForDeletion = false
    this.fps = Math.random() * 10 + 5
    this.frameInterval = 1000 / this.fps
    this.frameTimer = 0
  }

  draw(ctx) {

  }

  update() {

    if (this.frameTimer > this.frameInterval) {

    } else {

    }

    if (this.frameX > this.maxFrame) { }
  }
}