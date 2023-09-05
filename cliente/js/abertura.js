export default class abertura extends Phaser.Scene {
  constructor () {
    super('abertura')
  }

  preload () {
    this.load.image('capa', '../assets/capa.png')
  }

  create () {
    this.add.image(this.game.config.width * 0.5, this.game.config.height * 0.5, 'capa')
    this.add.text(50, this.game.config.height * 0.85, '[Pesadelos Lúcidos]')
      .setInteractive()
      .on('pointerdown', () => {
        this.game.scene.stop('abertura')
        this.game.scene.start('labirinto')
      })
  }

  update () { }
}
