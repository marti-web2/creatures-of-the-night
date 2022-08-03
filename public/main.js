import Player from './player.js'
import InputHandler from './input.js'
import { Background } from './background.js'
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
      this.groundMargin = 40
      this.speed = 0
      this.maxSpeed = 6
      this.background = new Background(this)
      this.player = new Player(this)
      this.input = new InputHandler(this)
      this.UI = new UI(this)
      this.enemies = []
      this.particles = []
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
      this.player.update(this.input.keys)

      // handle enemies

      if (this.enemyTimer > this.enemyInterval) {

      } else {

      }

      // handle messages


      // handle particles


      // handle collision sprites

    }

    draw(ctx) {
      if (this.debug) { }
      this.player.draw(ctx)
    }

    addEnemy() {

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