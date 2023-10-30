export default class labirinto extends Phaser.Scene {
  constructor () {
    super('labirinto')

    this.velocidade = 200
  }

  preload () {
    this.load.tilemapTiledJSON('labirinto', './assets/mapa/labirinto.json')

    this.load.image('blocos', './assets/mapa/blocos.png')
    this.load.image('grama', './assets/mapa/grama.png')
    this.load.image('itens', './assets/mapa/itens.png')
    this.load.image('paredes', './assets/mapa/paredes.png')
    this.load.image('pedras', './assets/mapa/pedras.png')
    this.load.image('personagem', './assets/mapa/personagem.png')
    this.load.image('plantas', './assets/mapa/plantas.png')
    this.load.image('sombras-plantas', './assets/mapa/sombras-plantas.png')
    this.load.image('sombras', './assets/mapa/sombras.png')

    this.load.spritesheet('tobias', './assets/tobias.png', {
      frameWidth: 36,
      frameHeight: 52
    })

    this.load.spritesheet('lola', './assets/lola.png', {
      frameWidth: 36,
      frameHeight: 52
    })

    this.load.spritesheet('moeda', './assets/moeda.png', {
      frameWidth: 32,
      frameHeight: 32
    })

    this.load.spritesheet('esquerda', './assets/esquerda.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.spritesheet('direita', './assets/direita.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.spritesheet('cima', './assets/cima.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.spritesheet('baixo', './assets/baixo.png', {
      frameWidth: 64,
      frameHeight: 64
    })

    this.load.audio('trilha', './assets/jardim-secreto.mp3')
    this.load.audio('moeda-som', './assets/moeda.mp3')
  }

  create () {
    this.trilha = this.sound.add('trilha')
    this.trilha.loop = true
    this.trilha.play()

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

    if (this.game.jogadores.primeiro === this.game.socket.id) {
      this.local = 'tobias'
      this.remoto = 'lola'
      this.personagem = this.physics.add.sprite(-350, -80, this.local, 18)
      this.personagemRemoto = this.add.sprite(1184, -80, this.remoto, 18)
    } else if (this.game.jogadores.segundo === this.game.socket.id) {
      this.local = 'lola'
      this.remoto = 'tobias'
      this.personagemRemoto = this.add.sprite(-350, -80, this.remoto, 18)
      this.personagem = this.physics.add.sprite(1184, -80, this.local, 18)

      navigator.mediaDevices.getUserMedia({ video: false, audio: true })
        .then((stream) => {
          this.game.localConnection = new RTCPeerConnection(this.game.ice_servers)

          this.game.localConnection.onicecandidate = function ({ candidate }) {
            candidate && globalThis.game.socket.emit('candidate', globalThis.game.sala, candidate)
          }

          this.game.localConnection.ontrack = function ({ streams: [stream] }) {
            globalThis.game.audio.srcObject = stream
          }

          stream.getTracks()
            .forEach((track) => this.game.localConnection.addTrack(track, stream))

          this.game.localConnection.createOffer()
            .then((offer) => this.game.localConnection.setLocalDescription(offer))
            .then(() => this.game.socket.emit('offer', this.game.sala, this.game.localConnection.localDescription))

          this.game.midias = stream
        })
        .catch((error) => console.error(error))
    }

    this.game.socket.on('offer', (description) => {
      this.game.remoteConnection = new RTCPeerConnection(this.game.ice_servers)

      this.game.remoteConnection.onicecandidate = function ({ candidate }) {
        candidate && globalThis.game.socket.emit('candidate', globalThis.game.sala, candidate)
      }

      this.game.remoteConnection.ontrack = function ({ streams: [midia] }) {
        globalThis.game.audio.srcObject = midia
      }

      this.game.midias.getTracks()
        .forEach((track) => this.game.remoteConnection.addTrack(track, this.game.midias))

      this.game.remoteConnection.setRemoteDescription(description)
        .then(() => this.game.remoteConnection.createAnswer())
        .then((answer) => this.game.remoteConnection.setLocalDescription(answer))
        .then(() => this.game.socket.emit('answer', this.game.sala, this.game.remoteConnection.localDescription))
    })

    this.game.socket.on('answer', (description) =>
      this.game.localConnection.setRemoteDescription(description)
    )

    this.game.socket.on('candidate', (candidate) => {
      const conn = this.game.localConnection || this.game.remoteConnection
      conn.addIceCandidate(new RTCIceCandidate(candidate))
    })

    this.cameras.main.startFollow(this.personagem)

    this.anims.create({
      key: 'personagem-parado',
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 18,
        end: 18
      }),
      frameRate: 1
    })

    this.anims.create({
      key: 'personagem-esquerda',
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 9,
        end: 17
      }),
      frameRate: 12,
      repeat: -1
    })

    this.anims.create({
      key: 'personagem-direita',
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 27,
        end: 35
      }),
      frameRate: 12,
      repeat: -1
    })

    this.anims.create({
      key: 'personagem-cima',
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 0,
        end: 8
      }),
      frameRate: 12,
      repeat: -1
    })

    this.anims.create({
      key: 'personagem-baixo',
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 18,
        end: 26
      }),
      frameRate: 12,
      repeat: -1
    })

    this.moeda = this.physics.add.sprite(200, -30, 'moeda')
    this.moedaSom = this.sound.add('moeda-som')

    this.anims.create({
      key: 'moeda-brilhando',
      frames: this.anims.generateFrameNumbers('moeda', {
        start: 0,
        end: 3
      }),
      frameRate: 12,
      repeat: -1
    })

    this.moeda.anims.play('moeda-brilhando')

    this.esquerda = this.add.sprite(50, 350, 'esquerda')
      .setScrollFactor(0)
      .setInteractive()
      .on('pointerover', () => {
        this.esquerda.setFrame(1)
        this.personagem.anims.play('personagem-esquerda')
        this.personagem.setVelocityX(-this.velocidade)
      })
      .on('pointerout', () => {
        this.esquerda.setFrame(0)
        this.personagem.anims.play('personagem-parado')
        this.personagem.setVelocityX(0)
      })

    this.direita = this.add.sprite(150, 350, 'direita')
      .setScrollFactor(0)
      .setInteractive()
      .on('pointerover', () => {
        this.direita.setFrame(1)
        this.personagem.anims.play('personagem-direita')
        this.personagem.setVelocityX(this.velocidade)
      })
      .on('pointerout', () => {
        this.direita.setFrame(0)
        this.personagem.anims.play('personagem-parado')
        this.personagem.setVelocityX(0)
      })

    this.cima = this.add.sprite(100, 300, 'cima')
      .setScrollFactor(0)
      .setInteractive()
      .on('pointerover', () => {
        this.cima.setFrame(1)
        this.personagem.anims.play('personagem-cima')
        this.personagem.setVelocityY(-this.velocidade)
      })
      .on('pointerout', () => {
        this.cima.setFrame(0)
        this.personagem.anims.play('personagem-parado')
        this.personagem.setVelocityY(0)
      })

    this.baixo = this.add.sprite(100, 400, 'baixo')
      .setScrollFactor(0)
      .setInteractive()
      .on('pointerover', () => {
        this.baixo.setFrame(1)
        this.personagem.anims.play('personagem-baixo')
        this.personagem.setVelocityY(this.velocidade)
      })
      .on('pointerout', () => {
        this.baixo.setFrame(0)
        this.personagem.anims.play('personagem-parado')
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

    this.physics.add.collider(this.personagem, this.moeda, this.coletar_moeda, null, this)

    this.game.socket.on('estado-notificar', ({ cena, x, y, frame }) => {
      this.personagemRemoto.x = x
      this.personagemRemoto.y = y
      this.personagemRemoto.setFrame(frame)
    })
  }

  update () {
    try {
      this.game.socket.emit('estado-publicar', this.game.sala, {
        cena: 'labirinto',
        x: this.personagem.x,
        y: this.personagem.y,
        frame: this.personagem.frame.name
      })
    } catch (error) {
      console.error(error)
    }
  }

  coletar_moeda () {
    this.moedaSom.play()
    this.moeda.disableBody(true, true)
    this.game.scene.stop('labirinto')
    this.game.scene.start('final-triste')
  }
}
