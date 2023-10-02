export default class abertura extends Phaser.Scene {
  constructor () {
    super('abertura')
  }

  preload () {
    this.load.image('capa', '../assets/capa.png')

    this.load.spritesheet('tela-cheia', './assets/tela-cheia.png', {
      frameWidth: 64,
      frameHeight: 64
    })
  }

  create () {
    this.add.image(this.game.config.width * 0.5, this.game.config.height * 0.5, 'capa')

    this.add.text(50, this.game.config.height * 0.85, '[Pesadelos Lúcidos]')
      .setInteractive()
      .on('pointerdown', () => {
        this.game.scene.stop('abertura')
        this.scale.startFullscreen()
        this.game.scene.start('labirinto')
      })

    this.tela_cheia = this.add
      .sprite(750, 50, 'tela-cheia', 0)
      .setInteractive()
      .on('pointerdown', () => {
        if (this.scale.isFullscreen) {
          this.tela_cheia.setFrame(0)
          this.scale.stopFullscreen()
        } else {
          this.tela_cheia.setFrame(1)
          this.scale.startFullscreen()
        }
      })
  }

  update () { }
}
