import Player from "./player/player"
import Background from "./environment/background"
import { FlyingEnemy, ClimbingEnemy, GroundEnemy } from "./enemies/enemies"
import {UI} from "./ui/UI"
import IFloatingMessage from './ui/floatingMessages'
import ICollisionAnimation from "./collisionAnimation"
import { Particle, Dust, Splash, Fire } from "./particles"
import {InputHandler} from "./controls/input"

export default interface IGame {
  width: number
  height: number
  groundMargin: number
  maxSpeed: number
  maxParticles: number
  splashParticles: number
  maxTime: number
  winningScore: number
  enemyInterval: number
  fontColor: string
  debug: boolean
  gameOver: boolean
  speed: number
  enemies: (FlyingEnemy | ClimbingEnemy | GroundEnemy)[]
  particles: (Dust | Splash | Fire)[]
  collisions: ICollisionAnimation[]
  floatingMessages: IFloatingMessage[]
  enemyTimer: number
  score: number
  time: number
  lives: number
  background: Background
  player: Player
  input: InputHandler
  UI: UI

  update(deltaTime: number): void
  draw(ctx: CanvasRenderingContext2D): void
  addEnemy(): void
  start(): void
  reset(): void
}

window.addEventListener("load", () => {
  const loading = document.getElementById('loading') as HTMLHeadingElement
  loading.style.display = "none"
  const canvas = document.getElementById('canvas1') as HTMLCanvasElement
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
  const CANVAS_WIDTH = (canvas.width = 1667)
  const CANVAS_HEIGHT = (canvas.height = 500)

  class Game implements IGame {
    width: number
    height: number
    groundMargin: number
    maxSpeed: number
    maxParticles: number
    splashParticles: number
    maxTime: number
    winningScore: number
    enemyInterval: number
    fontColor: string
    debug: boolean
    gameOver: boolean
    speed: number
    enemies: (FlyingEnemy | ClimbingEnemy | GroundEnemy)[]
    particles: (Dust | Splash | Fire)[]
    collisions: ICollisionAnimation[]
    floatingMessages: IFloatingMessage[]
    enemyTimer: number
    score: number
    time: number
    lives: number
    background: Background
    player: Player
    input: InputHandler
    UI: UI

    constructor(width: number, height: number) {
      this.width = width
      this.height = height
      this.groundMargin = 40
      this.maxSpeed = 4
      this.maxParticles = 128
      this.splashParticles = 30
      this.maxTime = 5000
      this.winningScore = 3
      this.enemyInterval = 1000
      this.fontColor = "black"
      this.debug = false
      this.gameOver = false
      this.speed = 0
      this.enemies = []
      this.particles = []
      this.collisions = []
      this.floatingMessages = []
      this.enemyTimer = 0
      this.score = 0
      this.time = 0
      this.lives = 5
      this.background = new Background(this)
      this.player = new Player(this)
      this.input = new InputHandler(this)
      this.UI = new UI(this)
      this.player.currentState = this.player.states[0]
      this.player.currentState.enter()
    }

    update(deltaTime: number) {
      this.time += deltaTime
      if (this.time > this.maxTime) {
        this.gameOver = true
      }
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
      })

      // handle messages
      this.floatingMessages.forEach((msg) => {
        msg.update()
      })

      // handle particles
      this.particles.forEach((particle) => {
        particle.update()
      })
      if (this.particles.length > this.maxParticles) {
        this.particles.length = this.maxParticles
      }

      // handle collision sprites
      this.collisions.forEach((collision) => {
        collision.update(deltaTime)
      })
      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)
      this.particles = this.particles.filter((particle) => !particle.markedForDeletion)
      this.collisions = this.collisions.filter((collision) => !collision.markedForDeletion)
      this.floatingMessages = this.floatingMessages.filter((msg) => !msg.markedForDeletion)
    }

    draw(ctx: CanvasRenderingContext2D) {
      if (this.debug) {
      }
      this.background.draw(ctx)
      this.player.draw(ctx)
      this.enemies.forEach((enemy) => {
        enemy.draw(ctx)
      })
      this.particles.forEach((particle) => {
        particle.draw(ctx)
      })
      this.collisions.forEach((collision) => {
        collision.draw(ctx)
      })
      this.floatingMessages.forEach((msg) => {
        msg.draw(ctx)
      })
      this.UI.draw(ctx)
    }

    addEnemy() {
      if (this.speed > 0 && Math.random() < 0.5) {
        this.enemies.push(new GroundEnemy(this))
      } else if (this.speed > 0) {
        this.enemies.push(new ClimbingEnemy(this))
      }
      this.enemies.push(new FlyingEnemy(this))
    }

    start() {
      if (this.gameOver) { this.reset() }
      requestAnimationFrame(animate)
    }

    /* properties that will need to be reset when starting a new game */
    reset() {
      this.gameOver = false
      this.speed = 0
      this.enemies = []
      this.particles = []
      this.collisions = []
      this.floatingMessages = []
      this.enemyTimer = 0
      this.score = 0
      this.time = 0
      this.lives = 5
      this.background = new Background(this)
      this.player = new Player(this)
      this.input = new InputHandler(this)
      this.UI = new UI(this)
      this.player.currentState = this.player.states[0]
      this.player.currentState.enter()
    }
  }

  let game = new Game(CANVAS_WIDTH, CANVAS_HEIGHT)
  let lastTime = 0

  function animate(timestamp: number) {
    // Update lastTime to catch up with the current timestamp
    if (!lastTime) { lastTime = timestamp }

    const deltaTime = timestamp - lastTime
    lastTime = timestamp
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    game.update(deltaTime)
    game.draw(ctx)

    if (!game.gameOver) { requestAnimationFrame(animate) }
    else { lastTime = 0 }
  }

  game.start()

})
