import { Weapon } from 'phaser3-weapon-plugin';

import { WeaponProps } from '../types';

export class ShipWeapon extends Weapon {
  constructor(scene: Phaser.Scene, player: Phaser.GameObjects.Sprite, props: WeaponProps) {
    super(scene, 10, props.texture);

    //@ts-ignore
    this.scene.add.existing(this);
    //@ts-ignore
    this.scene.physics.world.enable(this);

    this.debugPhysics = true

    this.trackSprite(player)

    this.bulletSpeed = props.bulletSpeed
    this.fireRate = props.fireRate
    this.autoExpandBulletsGroup = true
    this.bulletKillType = 2
    this.bulletKillDistance = 300
    this.autofire = true
    this.setBulletBodyOffset(props.bulletWidth, props.bulletHeight, props.bulletWidth / 2, props.bulletHeight / 2)

    this.#handleAngleRotation()
  }

  #handleAngleRotation() {
    this.scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      const angle = Phaser.Math.Angle.Between(
        this.x,
        this.y,
        pointer.x + this.scene.cameras.main.scrollX,
        pointer.y + this.scene.cameras.main.scrollY,
      )

      const normilizedAngle = Phaser.Math.RadToDeg(angle);

      this.fireAngle = normilizedAngle
    })
  }
}
