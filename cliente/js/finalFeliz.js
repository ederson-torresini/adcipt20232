export default class finalFeliz extends Phaser.Scene {
  constructor () {
    super('final-feliz')
  }

  preload () {
    this.load.spritesheet('yin-yang', '../assets/yin-yang.png', { frameWidth: 250, frameHeight: 250 })
  }

  create () {
    this.anims.create({
      key: 'yin-yang-girando',
      frames: this.anims.generateFrameNumbers('yin-yang', {
        start: 0,
        end: 22
      }),
      frameRate: 12,
      repeat: -1
    })

    this.add.sprite(this.game.config.width * 0.5, this.game.config.height * 0.5, 'yin-yang')
      .anims.play('yin-yang-girando')
      .setInteractive()
      .on('pointerdown', () => {
        this.game.scene.stop('final-feliz')
        this.game.scene.start('abertura')
      })
    
    this.cameras.main.setZoom(4)
  }

  update () { }
}
