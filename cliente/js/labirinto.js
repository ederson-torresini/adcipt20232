export default class labirinto extends Phaser.Scene {
  constructor () {
    super('labirinto')

    this.velocidade = 200
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

    this.load.spritesheet('esquerda', '../assets/esquerda.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.spritesheet('direita', '../assets/direita.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.spritesheet('cima', '../assets/cima.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.spritesheet('baixo', '../assets/baixo.png', {
      frameWidth: 64,
      frameHeight: 64
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

    this.personagem = this.physics.add.sprite(-350, -80, 'tobias', 18)
    this.cameras.main.startFollow(this.personagem)

    this.anims.create({
      key: 'tobias-parado',
      frames: this.anims.generateFrameNumbers('tobias', {
        start: 18,
        end: 18
      }),
      frameRate: 1
    })
    this.anims.create({
      key: 'tobias-esquerda',
      frames: this.anims.generateFrameNumbers('tobias', {
        start: 9,
        end: 17
      }), frameRate: 12,
      repeat: -1
    })
    this.anims.create({
      key: 'tobias-direita',
      frames: this.anims.generateFrameNumbers('tobias', {
        start: 27,
        end: 35
      }), frameRate: 12,
      repeat: -1
    })
    this.anims.create({
      key: 'tobias-cima',
      frames: this.anims.generateFrameNumbers('tobias', {
        start: 0,
        end: 8
      }),
      frameRate: 12,
      repeat: -1
    })
    this.anims.create({
      key: 'tobias-baixo',
      frames: this.anims.generateFrameNumbers('tobias', {
        start: 18,
        end: 26
      }),
      frameRate: 12,
      repeat: -1
    })

    this.esquerda = this.add.sprite(50, 350, 'esquerda')
      .setScrollFactor(0)
      .setInteractive()
      .on('pointerover', () => {
        this.esquerda.setFrame(1)
        this.personagem.anims.play('tobias-esquerda')
        this.personagem.setVelocityX(-this.velocidade)
      })
      .on('pointerout', () => {
        this.esquerda.setFrame(0)
        this.personagem.anims.play('tobias-parado')
        this.personagem.setVelocityX(0)
      })
    this.direita = this.add.sprite(150, 350, 'direita')
      .setScrollFactor(0)
      .setInteractive()
      .on('pointerover', () => {
        this.direita.setFrame(1)
        this.personagem.anims.play('tobias-direita')
        this.personagem.setVelocityX(this.velocidade)
      })
      .on('pointerout', () => {
        this.direita.setFrame(0)
        this.personagem.anims.play('tobias-parado')
        this.personagem.setVelocityX(0)
      })
    this.cima = this.add.sprite(100, 300, 'cima')
      .setScrollFactor(0)
      .setInteractive()
      .on('pointerover', () => {
        this.cima.setFrame(1)
        this.personagem.anims.play('tobias-cima')
        this.personagem.setVelocityY(-this.velocidade)
      })
      .on('pointerout', () => {
        this.cima.setFrame(0)
        this.personagem.anims.play('tobias-parado')
        this.personagem.setVelocityY(0)
      })
    this.baixo = this.add.sprite(100, 400, 'baixo')
      .setScrollFactor(0)
      .setInteractive()
      .on('pointerover', () => {
        this.baixo.setFrame(1)
        this.personagem.anims.play('tobias-baixo')
        this.personagem.setVelocityY(this.velocidade)
      })
      .on('pointerout', () => {
        this.baixo.setFrame(0)
        this.personagem.anims.play('tobias-parado')
        this.personagem.setVelocityY(0)
      })

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
