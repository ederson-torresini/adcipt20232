export default class cena0 extends Phaser.Scene {
  constructor () {
    super('cena0')
  }

  preload () {
    /* Imagem de fundo */
    this.load.image('ifsc-sj-2014', '../assets/ifsc-sj-2014.png')

    /* Personagem */
    this.load.spritesheet('derek', '../assets/derek.png', {
      frameWidth: 64,
      frameHeight: 64
    })

    /* Botões */
    this.load.spritesheet('direita', '../assets/direita.png', {
      frameWidth: 64,
      frameHeight: 64
    })
  }

  create () {
    /* Imagem de fundo */
    this.add.image(400, 225, 'ifsc-sj-2014')

    /* Personagem */
    this.personagem = this.physics.add.sprite(400, 225, 'derek')

    /* Animações */
    this.anims.create({
      key: 'derek-parado',
      frames: this.anims.generateFrameNumbers('derek', {
        start: 0,
        end: 0
      }),
      frameRate: 1
    })

    this.anims.create({
      key: 'derek-direita',
      frames: this.anims.generateFrameNumbers('derek', {
        start: 8,
        end: 11
      }),
      frameRate: 6,
      repeat: -1
    })

    /* Botões */
    this.direita = this.add.sprite(150, 400, 'direita', 0)
      .setInteractive()
      .on('pointerdown', () => {
        this.direita.setFrame(1)
        this.personagem.anims.play('derek-direita', true)
        this.personagem.setVelocityX(100)
      })
      .on('pointerup', () => {
        this.direita.setFrame(0)
        this.personagem.anims.play('derek-parado')
        this.personagem.setVelocityX(0)
      })
  }

  update () { }
}
