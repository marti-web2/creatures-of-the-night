export class PowerBar {
  x: number
  y: number
  width: number
  height: number
  maxHealth: number
  maxWidth: number
  health: number
  color: string

  constructor(maxHealth: number) {
    this.x = 20
    this.y = 130
    this.width = 200
    this.height = 20
    this.maxHealth = maxHealth
    this.maxWidth = this.width
    this.health = maxHealth
    this.color = "green"
  }

  show(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = "#333"
    ctx.lineWidth = 5
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.strokeRect(this.x, this.y, this.maxWidth, this.height)
  }

  updateHealth(val: number) {
    this.health = val
    this.width = this.maxWidth * (this.health / this.maxHealth)
  }
}
