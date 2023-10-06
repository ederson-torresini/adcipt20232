export default class sala extends Phaser.Scene {
  constructor () {
    super('sala')
  }

  preload () {
    this.load.image('fundo', './assets.fundo-sala.png')
  }

  create () {
    this.add.image('fundo')

    this.salas = [
      {
        numero: 1,
        x: 100,
        y: 100
      },
      {
        numero: 2,
        x: 200,
        y: 100
      }
    ]

    this.salas.forEach((sala) => {
      sala.botao = this.add.text(sala.x, sala.y, 'Sala ' + sala.numero)
        .setInteractive()
        .on('pointerdown', () => {
          this.game.socket.on('jogadores', (jogadores) => {
            this.game.jogadores = jogadores
            this.game.scene.stop('sala')
            this.game.scene.start('labirinto')
          })
          this.game.socket.emit('entrar-na-sala', sala.numero)
          this.aguarde = this.add
            .text(this.game.config.width / 2, this.game.config.heigth / 2, 'Conectando...')
        })
    })
  }

  update () { }
}
