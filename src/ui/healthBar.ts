import { GET_DAMAGE } from '../config'
import { eventsCenter } from '../utils'

const DEFAULT_WIDTH = 200

export class HealthBar extends Phaser.GameObjects.Graphics {
  constructor(scene: Phaser.Scene) {
    super(scene)

    this.fillStyle(0xff0000, 1)

    this.fillRect(0, 0, 200, 15)
    this.x = 20
    this.y = 20

    this.scene.add.existing(this)
  }

  setValue(percentage: number) {
    this.scaleX = percentage / 100
  }
}
