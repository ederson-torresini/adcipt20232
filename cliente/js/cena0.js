export default class cena0 extends Phaser.Scene {
  constructor () {
    super('cena0')
  }

  preload () {
    this.load.image('ifsc-sj-2014', '../assets/ifsc-sj-2014.png')
  }

  create () {
    this.add.image(400, 225, 'ifsc-sj-2014')
  }

  update () { }
}
