/* Capture and keep track of user input */

export default class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = [];
    this.listenFor = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", "c"];
    window.addEventListener("keydown", (e) => {
      if (this.listenFor.includes(e.key) && this.keys.indexOf(e.key) === -1) {
        this.keys.push(e.key);
      } else if (e.key === "d") {
        this.game.debug = !this.game.debug;
      }
    });
    window.addEventListener("keyup", (e) => {
      if (this.listenFor.includes(e.key)) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });
  }
}
