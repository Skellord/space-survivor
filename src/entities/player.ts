import { GET_DAMAGE } from '../config';
import { PlayerProps } from '../types';
import { eventsCenter } from '../utils';
import { BaseEntity } from './baseEntity';

export class Player extends BaseEntity {
  declare body: Phaser.Physics.Arcade.Body

  #cursors?: Phaser.Types.Input.Keyboard.CursorKeys
  #speed: number
  #xp = 0
  #maxHp: number

  constructor(scene: Phaser.Scene, props: PlayerProps) {
    super({
      scene,
      texture: props.texture,
      hp: props.hp,
      x: 0,
      y: 0,
    })

    this.scene.add.existing(this)
    this.scene.physics.world.enable(this)
    this.body.setSize(props.width, props.height, true)
    this.setDepth(1)

    this.#maxHp = props.hp
    this.#speed = props.speed
    this.#cursors = this.scene.input.keyboard?.createCursorKeys()
    this.#handleAngleRotation()
  }

  update(): void {
    this.#handleMovement()
  }

  #handleMovement() {
    this.body.setVelocity(0, 0)

    if (this.#cursors?.up?.isDown) {
      this.body.velocity.y = -this.#speed
    } else if (this.#cursors?.down?.isDown) {
      this.body.velocity.y = this.#speed
    } else {
      this.body.velocity.y = 0
    }

    if (this.#cursors?.left?.isDown) {
      this.body.velocity.x = -this.#speed
    } else if (this.#cursors?.right?.isDown) {
      this.body.velocity.x = this.#speed
    } else {
      this.body.velocity.x = 0
    }
  }

  #handleAngleRotation() {
    this.scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      const angle = Phaser.Math.Angle.Between(
        this.x,
        this.y,
        pointer.x + this.scene.cameras.main.scrollX,
        pointer.y + this.scene.cameras.main.scrollY,
      )

      const normilizedAngle = Phaser.Math.RadToDeg(angle) + 90;

      this.setAngle(normilizedAngle)
    })
  }

  addXp(points: number) {
    this.#xp += points
  }

  getDamage(value: number): void {
    super.getDamage(value)

    eventsCenter.emit(GET_DAMAGE, this.hp, this.#maxHp)
  }
}
