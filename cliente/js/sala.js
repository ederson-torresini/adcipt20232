export default class sala extends Phaser.Scene {
  constructor () {
    super('sala')
  }

  preload () {
  }

  create () {
    this.mensagem = this.add.text(100, 75, 'Escolha uma sala para entrar:', {
      fontFamily: 'monospace',
      font: '32px Courier',
      fill: '#cccccc'
    })

    this.salas = [
      {
        numero: 1,
        x: 100,
        y: 200
      },
      {
        numero: 2,
        x: 400,
        y: 200
      }
    ]

    this.salas.forEach((sala) => {
      sala.botao = this.add.text(sala.x, sala.y, 'Sala ' + sala.numero, {
        fontFamily: 'monospace',
        font: '32px Courier',
        fill: '#cccccc'
      })
        .setInteractive()
        .on('pointerdown', () => {
          this.salas.forEach((item) => {
            item.botao.destroy()
          })
          this.game.sala = sala.numero
          this.game.socket.emit('entrar-na-sala', this.game.sala)
        })

      this.game.socket.on('jogadores', (jogadores) => {
        console.log(jogadores)
        if (jogadores.segundo) {
          this.mensagem.setText('Conectando...')
          this.game.jogadores = jogadores
          this.game.scene.stop('sala')
          this.game.scene.start('labirinto')
        } else if (jogadores.primeiro) {
          this.mensagem.setText('Aguardando segundo jogador...')
          navigator.mediaDevices.getUserMedia({ video: false, audio: true })
            .then((stream) => {
              this.game.midias = stream
            })
            .catch((error) => console.error(error))
        }
      })
    })
  }

  update () { }
}
