class Particle {
  constructor(game) {
    this.game = game
    this.markedForDeletion = false
  }

  update() {

    if (this.size < 0.5) { }
  }
}

export class Dust extends Particle {
  constructor(game, x, y) {
    super(game)
    this.size = Math.random() * 10 + 10
    this.x = x
    this.y = y
    this.speedX = Math.random()
    this.speedY = Math.random()
    this.color = 'black'
  }

  draw(ctx) {

  }
}

export class Splash extends Particle {
  constructor(game, x, y) {
    super(game)
    this.size = Math.random() * 100 + 100
    this.x = x
    this.y = y
    this.speedX = Math.random() * 6 - 3
    this.speedY = Math.random() * 2 + 2
    this.gravity = 0
    this.image = fire
  }

  update(){
    super.update()
    this.gravity+=0.1
  }
}

export class Fire extends Particle {
  constructor(game, x, y) {
    super(game)
    this.image = fire
    this.size = Math.random() * 100 + 50
    this.x = x
    this.y = y
    this.speedX = 1
    this.speedY = 1
    this.angle = 0
    this.va = Math.random() * 0.2 - 0.1
  }

  update() {
    super.update()
    this.angle += this.va
  }

  draw(ctx) {
    ctx.save()

    ctx.restore()
  }
}