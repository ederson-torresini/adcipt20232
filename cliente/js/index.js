import config from './config.js'
import abertura from './abertura.js'
import sala from './sala.js'
import labirinto from './labirinto.js'
import finalFeliz from './finalFeliz.js'
import finalTriste from './FinalTriste.js'

class Game extends Phaser.Game {
  constructor () {
    super(config)

    let iceServers
    if (window.location.host === 'feira-de-jogos.sj.ifsc.edu.br') {
      iceServers = [
        {
          urls: 'stun:feira-de-jogos.sj.ifsc.edu.br'
        },
        {
          urls: 'turns:feira-de-jogos.sj.ifsc.edu.br',
          username: 'adcipt',
          credential: 'adcipt20232'
        }
      ]
    } else {
      iceServers = [
        {
          urls: 'stun:stun.l.google.com:19302'
        }
      ]
    }
    this.iceServers = { iceServers }
    this.audio = document.querySelector('audio')

    this.socket = io()
    this.socket.on('connect', () => {
      console.log('Conectado ao servidor!')
    })

    this.scene.add('abertura', abertura)
    this.scene.add('sala', sala)
    this.scene.add('labirinto', labirinto)
    this.scene.add('final-feliz', finalFeliz)
    this.scene.add('final-triste', finalTriste)

    this.scene.start('abertura')
  }
}

window.onload = () => {
  window.game = new Game()
}
