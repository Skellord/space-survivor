import { enemiesMap } from '../config'
import { EnemyType } from '../types'
import { Enemy } from './enemy'

export class EnemiesSpawner extends Phaser.GameObjects.Group {
  #scene: Phaser.Scene

  constructor(scene: Phaser.Scene) {
    super(scene)

    scene.add.existing(this)

    this.#scene = scene
  }

  addEnemy(x: number, y: number, enemyType: EnemyType): void {
    const { height, hp, speed, texture, width, xp, damage } = enemiesMap[enemyType]

    const enemy = new Enemy(this.#scene, {
      height,
      width,
      hp,
      texture,
      speed,
      x,
      y,
      xp,
      damage,
    })

    this.add(enemy, true)
  }

  removeEnemy(enemy: Phaser.Types.Physics.Arcade.GameObjectWithBody): void {

    this.remove(enemy, true, true)
  }

  preUpdate(): void {
    this.children.entries.forEach(element => {
      element.update()
    });

    if (this.children.entries.length < 2) {
      const x = Phaser.Math.Between(this.#scene.cameras.main.x, this.#scene.cameras.main.x + this.#scene.cameras.main.width)
      const y = Phaser.Math.Between(this.#scene.cameras.main.y, this.#scene.cameras.main.y - this.#scene.cameras.main.height)

      this.addEnemy(x, y, 'baseEnemy')
    }
  }
}
