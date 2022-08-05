import  IGame  from './main.js'
/* Capture and keep track of user input */

export default interface InputHandlerInterface {
  game: IGame
  keys: string[]
  listenFor: string[]
}


 export class InputHandler implements InputHandlerInterface {
  game: IGame
  keys: string[]
  listenFor: string[]

  constructor(game: IGame) {
    this.game = game
    this.keys = []
    this.listenFor = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", "c"]
    window.addEventListener("keydown", (e) => {
      if (this.listenFor.includes(e.key) && this.keys.indexOf(e.key) === -1) {
        this.keys.push(e.key)
      } else if (e.key === "d") {
        this.game.debug = !this.game.debug
      } else if (e.key === 'Enter' && this.game.gameOver) {
        this.game.start()
      }
    })
    window.addEventListener("keyup", (e) => {
      if (this.listenFor.includes(e.key)) {
        this.keys.splice(this.keys.indexOf(e.key), 1)
      }
    })
  }
}
