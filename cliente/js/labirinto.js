export default class labirinto extends Phaser.Scene {
  constructor () {
    super('labirinto')
  }

  preload () {
    this.load.tilemapTiledJSON('labirinto', '../assets/mapa/labirinto.json')

    this.load.image('blocos', '../assets/mapa/blocos.png')
    this.load.image('grama', '../assets/mapa/grama.png')
    this.load.image('itens', '../assets/mapa/itens.png')
    this.load.image('paredes', '../assets/mapa/paredes.png')
    this.load.image('pedras', '../assets/mapa/pedras.png')
    this.load.image('personagem', '../assets/mapa/personagem.png')
    this.load.image('plantas', '../assets/mapa/plantas.png')
    this.load.image('sombras-plantas', '../assets/mapa/sombras-plantas.png')
    this.load.image('sombras', '../assets/mapa/sombras.png')

    this.load.spritesheet('tobias', '../assets/tobias.png', {
      frameWidth: 36,
      frameHeight: 52
    })
  }

  create () {
    this.tilemapLabirinto = this.make.tilemap({
      key: 'labirinto'
    })

    this.tilesetBlocos = this.tilemapLabirinto.addTilesetImage('blocos')
    this.tilesetGrama = this.tilemapLabirinto.addTilesetImage('grama')
    this.tilesetItens = this.tilemapLabirinto.addTilesetImage('itens')
    this.tilesetParedes = this.tilemapLabirinto.addTilesetImage('paredes')
    this.tilesetPedras = this.tilemapLabirinto.addTilesetImage('pedras')
    this.tilesetPersonagem = this.tilemapLabirinto.addTilesetImage('personagem')
    this.tilesetPlantas = this.tilemapLabirinto.addTilesetImage('plantas')
    this.tilesetSombrasPlantas = this.tilemapLabirinto.addTilesetImage('sombras-plantas')
    this.tilesetSombras = this.tilemapLabirinto.addTilesetImage('sombras')

    this.layerTerreno = this.tilemapLabirinto.createLayer('terreno', [this.tilesetGrama])
    this.layerSombras = this.tilemapLabirinto.createLayer('sombras', [this.tilesetSombrasPlantas, this.tilesetSombras])
    this.layerPlantas = this.tilemapLabirinto.createLayer('plantas', [this.tilesetPlantas])
    this.layerItens = this.tilemapLabirinto.createLayer('itens', [this.tilesetItens])
    this.layerParedes = this.tilemapLabirinto.createLayer('paredes', [this.tilesetBlocos, this.tilesetParedes])

    this.personagem = this.physics.add.sprite(400, 225, 'tobias', 18)

    this.layerTerreno.setCollisionByProperty({ collides: true })
    this.layerPlantas.setCollisionByProperty({ collides: true })
    this.layerItens.setCollisionByProperty({ collides: true })
    this.layerParedes.setCollisionByProperty({ collides: true })

    this.physics.add.collider(this.personagem, this.layerTerreno)
    this.physics.add.collider(this.personagem, this.layerPlantas)
    this.physics.add.collider(this.personagem, this.layerItens)
    this.physics.add.collider(this.personagem, this.layerParedes)
  }

  update () { }
}
