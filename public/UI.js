export default class UI {
  constructor(game) {
    this.game = game
    this.fontSize = 30
    this.fontFamily = 'Creepster, serif'
    this.livesImage = lives
  }

  draw(ctx) {
    ctx.save()

    // score


    // timer


    // lives
    for (let i = 0; i < this.game.lives; i++) {

    }


    // game over messages
    if (this.game.gameOver) {

      if (this.game.score > this.game.winningScore) {

      } else {

      }
    }

    ctx.restore()
  }
}