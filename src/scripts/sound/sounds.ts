import IGame from "../main"

export class Sounds {
  game: IGame
  sounds: { [key: string]: HTMLAudioElement } = {}
  music: HTMLAudioElement

  constructor(game: IGame) {
    this.game = game
    this.sounds = {
      fireKill: document.getElementById("firekill_audio") as HTMLAudioElement,
      music: document.getElementById("music") as HTMLAudioElement,
    }
    this.music = this.sounds["music"]
    this.music.volume = 0.35
  }

  playMusic() {
    this.music.loop = true
    if (!this.game.debug) {
      this.music.play()
    }
  }

  toggleMusic() {
    if (this.music.paused) {
      this.music.play()
    } else {
      this.music.pause()
    }
  }

  playSound(name: string) {
    this.sounds[name].currentTime = 0
    this.sounds[name].volume = 0.4
    this.sounds[name].play()
  }
}
