import config from './config.js'
import abertura from './abertura.js'
import sala from './sala.js'
import labirinto from './labirinto.js'
import finalFeliz from './finalFeliz.js'
import finalTriste from './FinalTriste.js'

class Game extends Phaser.Game {
  constructor () {
    super(config)

    this.id = 1 // Jogo Pesadelos Lúcidos, id 1
    this.valor = 100 // crédito padrão em Tijolinhos quando termina o jogo

    let iceServers
    if (window.location.host === 'feira-de-jogos.sj.ifsc.edu.br') {
      this.socket = io.connect({ path: '/adcipt20232/socket.io/' })
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
      this.socket = io()
      iceServers = [
        {
          urls: 'stun:stun.l.google.com:19302'
        }
      ]
    }
    this.iceServers = { iceServers }
    this.audio = document.querySelector('audio')

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
