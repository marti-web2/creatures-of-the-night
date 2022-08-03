import Player from './player.js'
import InputHandler from './input.js'
import Background from './background.js'
import { FlyingEnemy, ClimbingEnemy, GroundEnemy } from './enemies.js'
import UI from './UI.js'

window.addEventListener('load', _ => {
  /** @type { HTMLCanvasElement }  **/

  const loading = document.getElementById('loading')
  loading.style.display = 'none'
  const canvas = document.getElementById('canvas1')
  const ctx = canvas.getContext('2d')
  const CANVAS_WIDTH = canvas.width = window.innerWidth
  const CANVAS_HEIGHT = canvas.height = window.innerHeight

  class Game {
    constructor(width, height) {
      this.width = width
      this.height = height
      this.groundMargin = 80
      this.speed = 0
      this.maxSpeed = 4
      this.background = new Background(this)
      this.player = new Player(this)
      this.input = new InputHandler(this)
      this.UI = new UI(this)
      this.enemies = []
      this.particles = []
      this.maxParticles = 128
      this.floatingMessages = []
      this.enemyTimer = 0
      this.enemyInterval = 1000
      this.debug = true
      this.score = 0
      this.winningScore = 40
      this.fontColor = 'black'
      this.time = 0
      this.maxTime = 2000
      this.gameOver = false
      this.lives = 5
      this.player.currentState = this.player.states[0]
      this.player.currentState.enter()
    }

    update(deltaTime) {

      if (this.time > this.maxTime) { }
      this.background.update()
      this.player.update(this.input.keys, deltaTime)

      // handle enemies
      if (this.enemyTimer > this.enemyInterval) {
        this.addEnemy()
        this.enemyTimer = 0
      } else {
        this.enemyTimer += deltaTime
      }
      this.enemies.forEach((enemy) => {
        enemy.update(deltaTime)
        if (enemy.markedForDeletion) { this.enemies.splice(this.enemies.indexOf(enemy), 1) }
      })

      // handle messages


      // handle particles
      this.particles.forEach((particle, i) => {
        particle.update()
        if (particle.markedForDeletion) { this.particles.splice(i, 1) }
      })
      if (this.particles.length > this.maxParticles) { this.particles.length = this.maxParticles }

      // handle collision sprites

    }

    draw(ctx) {
      if (this.debug) { }
      this.background.draw(ctx)
      this.player.draw(ctx)
      this.enemies.forEach((enemy) => {
        enemy.draw(ctx)
      })
      this.particles.forEach((particle) => {
        particle.draw(ctx)
      })
      this.UI.draw(ctx)
    }

    addEnemy() {
      if (this.speed > 0 && Math.random() < 0.5) { this.enemies.push(new GroundEnemy(this)) }
      else if (this.speed > 0) { this.enemies.push(new ClimbingEnemy(this)) }
      this.enemies.push(new FlyingEnemy(this))
    }
  }

  const game = new Game(CANVAS_WIDTH, CANVAS_HEIGHT)
  let lastTime = 0

  function animate(timestamp) {
    const deltaTime = timestamp - lastTime
    lastTime = timestamp
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    game.update()
    game.draw(ctx)

    requestAnimationFrame(animate)
  }

  animate(0)
})