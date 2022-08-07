import IGame from "../main"

export class Sounds {
  game: IGame
  sounds: { [key: string]: HTMLAudioElement } = {}
  music: HTMLAudioElement

  constructor(game: IGame) {
    this.game = game
    this.sounds = {
      "fireKill": document.getElementById('firekill_audio') as HTMLAudioElement,
      "music": document.getElementById('music') as HTMLAudioElement
    }
    this.music = this.sounds["music"]
    this.music.loop = true
    this.music.volume = 0.35
    this.music.play()
  }

  playMusic(name: string) {
    if (this.music) {
      this.music.pause()
    }
    this.music = this.sounds[name]
    this.music.loop = true
    this.music.play()
  }

  toggleMusic() {
    if (this.music.paused) {
      this.music.play()
    } else {
      this.music.pause()
    }
  }

  play(name: string) {
    this.sounds[name].currentTime = 0
    this.sounds[name].volume = 0.4
    this.sounds[name].play()
  }
}