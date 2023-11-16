import { ENEMY_DESTROY } from '../config';
import { EnemyProps } from '../types';
import { eventsCenter } from '../utils/events';
import { BaseEntity } from './baseEntity';

export class Enemy extends BaseEntity {
  declare body: Phaser.Physics.Arcade.Body

  #xp: number
  #damage: number

  constructor(scene: Phaser.Scene, props: EnemyProps) {
    super({
      scene,
      hp: props.hp,
      texture: props.texture,
      x: props.x,
      y: props.y,
    });

    this.#xp = props.xp
    this.#damage = props.damage

    this.scene.physics.world.enable(this)
    this.body.setSize(props.width, props.height, true)
  }

  update(): void {
    if (this.hp <= 0) {
      this.destroy()

      eventsCenter.emit(ENEMY_DESTROY, this.#xp)
    }
  }

  get damage(): number {
    return this.#damage
  }
}
