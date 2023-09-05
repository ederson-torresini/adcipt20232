import config from './config.js'
import abertura from './abertura.js'
import labirinto from './labirinto.js'
import finalFeliz from './finalFeliz.js'
import finalTriste from './FinalTriste.js'

class Game extends Phaser.Game {
  constructor () {
    super(config)

    this.scene.add('abertura', abertura)
    this.scene.add('labirinto', labirinto)
    this.scene.add('final-feliz', finalFeliz)
    this.scene.add('final-triste', finalTriste)
    this.scene.start('abertura')
  }
}

window.onload = () => {
  window.game = new Game()
}
