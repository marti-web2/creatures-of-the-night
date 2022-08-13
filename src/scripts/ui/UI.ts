import IGame from "../main"
import { PowerBar } from "./powerBar"

export class UI {
  game: IGame
  fontSize: number
  fontFamily: string
  livesImage: HTMLImageElement

  power: number
  powerBar: PowerBar

  constructor(game: IGame) {
    this.game = game
    this.fontSize = 30
    this.fontFamily = "Creepster, serif"
    this.livesImage = document.getElementById("lives") as HTMLImageElement
    this.power = this.game.player.power

    this.powerBar = new PowerBar(this.power)
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.shadowOffsetX = 2
    ctx.shadowOffsetY = 2
    ctx.shadowColor = "white"
    ctx.shadowBlur = 0
    ctx.font = this.fontSize + "px " + this.fontFamily
    ctx.textAlign = "left"
    ctx.fillStyle = this.game.fontColor

    // score
    ctx.fillText("Score: " + this.game.score, 20, 50)

    // timer
    ctx.font = this.fontSize * 0.8 + "px " + this.fontFamily
    ctx.fillText("Time: " + (this.game.time * 0.001).toFixed(1), 20, 80)

    // lives
    for (let i = 0; i < this.game.lives; i++) {
      ctx.drawImage(this.livesImage, 25 * i + 20, 95, 25, 25)
    }

    // health bar
    this.powerBar.show(ctx)

    // game over messages
    if (this.game.gameOver) {
      ctx.fillStyle = "#eb6123"
      ctx.textAlign = "center"
      ctx.font = this.fontSize * 2 + "px " + this.fontFamily
      if (this.game.score >= this.game.winningScore) {
        ctx.fillText(
          "You Win!",
          this.game.width * 0.5,
          this.game.height * 0.5 - 20
        )
        ctx.font = this.fontSize * 0.7 + "px " + this.fontFamily
        ctx.fillStyle = "#000"
        ctx.fillText(
          "What are creatures of the night afraid of?...\nYOU!!",
          this.game.width * 0.5,
          this.game.height * 0.5 + 20
        )
        ctx.fillText(
          "( Press ENTER to restart game )",
          this.game.width * 0.5,
          this.game.height * 0.5 + 40
        )
      } else {
        ctx.fillStyle = "#eb6123"
        ctx.fillText(
          "Love at first fright?",
          this.game.width * 0.5,
          this.game.height * 0.5 - 20
        )
        ctx.font = this.fontSize * 0.7 + "px " + this.fontFamily
        ctx.fillStyle = "#000"
        ctx.fillText(
          "Nope. Better luck next time!",
          this.game.width * 0.5,
          this.game.height * 0.5 + 20
        )
        ctx.fillText(
          "( Press ENTER to restart game )",
          this.game.width * 0.5,
          this.game.height * 0.5 + 40
        )
      }
    }
    ctx.restore()
  }
}
