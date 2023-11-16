export interface PlayerProps {
  hp: number;
  width: number;
  height: number;
  speed: number;
  texture: string;
}

export interface BaseEntityProps {
  scene: Phaser.Scene;
  x: number;
  y: number;
  texture: Phaser.Textures.Texture | string;
  hp: number;
}

export interface EnemyPropsWithoutPosition extends PlayerProps {
  xp: number;
  damage: number;
}

export interface EnemyProps extends EnemyPropsWithoutPosition {
  x: number;
  y: number;
}

export interface EnemySpawnerProps {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export type EnemyType = 'baseEnemy'
