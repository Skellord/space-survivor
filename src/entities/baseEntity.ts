import { BaseEntityProps } from '../types';

export class BaseEntity extends Phaser.GameObjects.Sprite {
  #hp: number

  constructor(props: BaseEntityProps) {
    super(props.scene, props.x, props.y, props.texture);
    this.#hp = props.hp
  }

  get hp(): number {
    return this.#hp
  }

  getDamage(value: number) {
    this.#hp -= value
  }
}
