import IGame from "../main"

/* handle logic for each state separately */
class Layer {
  game: IGame
  width: number
  height: number
  speedModifier: number
  image: HTMLImageElement
  x: number
  y: number

  constructor(
    game: IGame,
    width: number,
    height: number,
    speedModifier: number,
    image: HTMLImageElement
  ) {
    this.game = game
    this.width = width
    this.height = height
    this.speedModifier = speedModifier
    this.image = image
    this.x = 0
    this.y = 0
  }

  update() {
    if (this.x < -this.width) {
      this.x = 0
    } else {
      this.x -= this.game.speed * this.speedModifier
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    )
  }
}

export default class Background {
  game: IGame
  width: number
  height: number
  layer1Image: HTMLImageElement
  layer2Image: HTMLImageElement
  layer3Image: HTMLImageElement
  layer4Image: HTMLImageElement
  layer5Image: HTMLImageElement
  layer6Image: HTMLImageElement
  layer7Image: HTMLImageElement
  layer1: Layer
  layer2: Layer
  layer3: Layer
  layer4: Layer
  layer5: Layer
  layer6: Layer
  layer7: Layer
  backgroundLayers: Layer[]

  constructor(game: IGame) {
    this.game = game
    this.width = 2400
    this.height = 720
    this.layer1Image = document.getElementById("layer1") as HTMLImageElement
    this.layer2Image = document.getElementById("layer2") as HTMLImageElement
    this.layer3Image = document.getElementById("layer3") as HTMLImageElement
    this.layer4Image = document.getElementById("layer4") as HTMLImageElement
    this.layer5Image = document.getElementById("layer5") as HTMLImageElement
    this.layer6Image = document.getElementById("layer6") as HTMLImageElement
    this.layer7Image = document.getElementById("layer7") as HTMLImageElement
    this.layer1 = new Layer(
      this.game,
      this.width,
      this.height,
      0,
      this.layer1Image
    )
    this.layer2 = new Layer(
      this.game,
      this.width,
      this.height,
      0.2,
      this.layer2Image
    )
    this.layer3 = new Layer(
      this.game,
      this.width,
      this.height,
      0.4,
      this.layer3Image
    )
    this.layer4 = new Layer(
      this.game,
      this.width,
      this.height,
      0.6,
      this.layer4Image
    )
    this.layer5 = new Layer(
      this.game,
      this.width,
      this.height,
      0.8,
      this.layer5Image
    )
    this.layer6 = new Layer(
      this.game,
      this.width,
      this.height,
      0.9,
      this.layer6Image
    )
    this.layer7 = new Layer(
      this.game,
      this.width,
      this.height,
      1,
      this.layer7Image
    )
    this.backgroundLayers = [
      this.layer1,
      this.layer2,
      this.layer3,
      this.layer4,
      this.layer5,
      this.layer6,
      this.layer7,
    ]
  }

  update() {
    this.backgroundLayers.forEach((layer) => {
      layer.update()
    })
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.backgroundLayers.forEach((layer) => {
      layer.draw(ctx)
    })
  }
}
