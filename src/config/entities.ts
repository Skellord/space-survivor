import { BASE_SHIP } from './common';
import { EnemyPropsWithoutPosition, EnemyType, PlayerProps } from '../types';

export const charactersMap: Record<string, PlayerProps> = {
  base: {
    height: 30,
    width: 30,
    hp: 50,
    speed: 100,
    texture: BASE_SHIP,
  }
}

export const enemiesMap: Record<EnemyType, EnemyPropsWithoutPosition> = {
  baseEnemy: {
    height: 30,
    width: 30,
    hp: 10,
    speed: 80,
    texture: BASE_SHIP,
    xp: 1,
    damage: 5,
  }
}
