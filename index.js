/* Importação de objetos */
import config from './config.js'

/* Definição do objeto Game */
class Game extends Phaser.Game {
  constructor () {
    super(config)
  }
}

/* Criação do objeto Game */
window.onload = () => {
  window.game = new Game()
}
