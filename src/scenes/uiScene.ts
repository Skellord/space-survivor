import { GET_DAMAGE } from '../config'
import { HealthBar } from '../ui'
import { eventsCenter } from '../utils'

export class UIScene extends Phaser.Scene {

  constructor() {
    super('ui-scene')
  }

  create(): void {
    const healthBar = new HealthBar(this)

    eventsCenter.on(GET_DAMAGE, (hp: number, maxHp: number) => {
      healthBar.setValue(200 * (hp / maxHp))
    })
  }
}
