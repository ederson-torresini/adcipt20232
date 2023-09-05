export default class finalTriste extends Phaser.Scene {
  constructor () {
    super('final-triste')
  }

  preload () {
    this.load.image('final-triste', '../assets/final-triste.png')
  }

  create () {
    this.add.image(this.game.config.width * 0.5, this.game.config.height * 0.5, 'final-triste')
    this.add.text(50, this.game.config.height * 0.85, '[Reiniciar]', { fill: '#ff0000' })
      .setInteractive()
      .on('pointerdown', () => {
        this.game.scene.stop('final-triste')
        this.game.scene.start('abertura')
      })
  }

  update () { }
}
