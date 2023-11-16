import { WeaponPlugin } from 'phaser3-weapon-plugin';

import { EnemiesSpawner, Player, Enemy, ShipWeapon } from '../entities';
import { BASE_SHIP, ENEMY_DESTROY, charactersMap, weaponsMap } from '../config';
import { CollideObject } from '../types';
import { eventsCenter } from '../utils/events';
import { UIScene } from './uiScene';

export class BattleScene extends Phaser.Scene {
  #player!: Player
  #enemiesSpawner!: EnemiesSpawner
  #weapons: ShipWeapon[] = []
  // #eventsEmitter

  constructor() {
    super('battle-scene');
  }

  preload(): void {
    this.load.image(BASE_SHIP, 'assets/ship.png');
    this.load.image('stars1', 'assets/stars1.png')
    this.load.image('stars2', 'assets/stars2.png')
  }

  create(): void {
    // Plugin setup
    this.plugins.installScenePlugin('WeaponPlugin', WeaponPlugin, 'weapons', this)

    this.#player = new Player(this, charactersMap.base)
    this.#enemiesSpawner = new EnemiesSpawner(this)

    // Camera setup
    this.cameras.main.zoom = 2
    this.cameras.main.startFollow(this.#player, false, 0.9, 0.9)

    // Weapon setup
    const baseWeapon = new ShipWeapon(this, this.#player, weaponsMap.baseWeapon)
    this.#weapons.push(baseWeapon)

    // Events setup
    eventsCenter.on(ENEMY_DESTROY, this.#addExperience)

    // UI setup
    this.scene.run('ui-scene')
  }

  update(time: number, delta: number): void {
    this.#player.update()
    this.#enemiesSpawner.preUpdate()
    this.#handleEnemyFollows()
    this.#handleCheckCollisionEnemyWithPlayer()

    this.#weapons.forEach(weapon => {
      weapon.update()
      this.#handleCheckCollisionEnemyWithBullets(weapon)
    })
  }

  #handleEnemyFollows(): void {
    for (let enemy of this.#enemiesSpawner.children.entries) {
      this.physics.moveToObject(enemy, this.#player)
    }
  }

  #handleCheckCollisionEnemyWithPlayer(): void {
    this.physics.add.collider(this.#player, this.#enemiesSpawner, this.#onCollideEnemyWithPlayer, undefined, this)
  }

  #handleCheckCollisionEnemyWithBullets(weapon: ShipWeapon): void {
    this.physics.add.collider(weapon.bullets, this.#enemiesSpawner, this.#onCollideEnemyWithBullets, undefined, this)
  }

  #onCollideEnemyWithPlayer(player: CollideObject, enemy: CollideObject): void {
    (player as Player).getDamage((enemy as Enemy).damage)

    this.#enemiesSpawner.removeEnemy(enemy as Phaser.Types.Physics.Arcade.GameObjectWithBody)
  }

  #onCollideEnemyWithBullets(bullet: CollideObject, enemy: CollideObject): void {
    bullet.destroy();

    (enemy as Enemy).getDamage(5)
  }

  #addExperience(xp?: number) {
    console.log('exp', xp)
  }

  // #onOverlapWithRange(circle: Phaser.Types.Physics.Arcade.GameObjectWithBody, enemy: Phaser.Types.Physics.Arcade.GameObjectWithBody): void {
  //   // const angle = Phaser.Math.Angle.Between(this.#player.body.x, this.#player.body.y, enemy.body.x, enemy.body.y)
  //   const nearestEnemy = this.#getNearestEnemy()

  //   if (nearestEnemy) {
  //     const body = nearestEnemy.body as Phaser.Physics.Arcade.Body
  //     const angle = Math.atan2(body.y - this.#player.y, body.x - this.#player.x)
  //     const angleInDegrees = angle * 180 / Math.PI
  //     this.#weapon.fireAngle = angleInDegrees
  //     // console.log(this.#weapon.bullets.getChildren().length)
  //     if (this.#weapon.bullets.getChildren().length > 0) {
  //       this.#weapon.fire()
  //     }
  //   }
  // }

  // #getNearestEnemy() {
  //   let nearestEnemy
  //   let nearestEnemyDistance = Infinity

  //   for (const enemy of this.#enemiesSpawner.getChildren()) {
  //     //@ts-ignore
  //     const distance = Phaser.Math.Distance.BetweenPoints(this.#player, enemy);

  //     if (distance < nearestEnemyDistance) {
  //       nearestEnemyDistance = distance;
  //       nearestEnemy = enemy;
  //     }
  //   }

  //   return nearestEnemy
  // }
}
