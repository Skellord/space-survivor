import './style.css'
import Phaser from 'phaser'
import { BattleScene } from './scenes/battleScene'
import { UIScene } from './scenes/uiScene'

const config: Phaser.Types.Core.GameConfig = {
  width: window.innerWidth,
  height: window.innerHeight,
  type: Phaser.WEBGL,
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  autoFocus: true,
  render: {
    pixelArt: false,
    antialias: false,
  },
  scene: [BattleScene, UIScene]
}

const game = new Phaser.Game(config)
