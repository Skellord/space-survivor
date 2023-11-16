import { BASE_SHIP } from './common';
import { WeaponProps, Weapons } from '../types';

export const weaponsMap: Record<Weapons, WeaponProps> = {
  baseWeapon: {
    texture: BASE_SHIP,
    bulletSpeed: 200,
    fireRate: 600,
    bulletWidth: 30,
    bulletHeight: 30,
  }
}
