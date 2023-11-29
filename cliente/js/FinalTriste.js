import Phaser from 'phaser'

export default class finalTriste extends Phaser.Scene {
  constructor () {
    super('final-triste')
  }

  preload () {
    this.load.image('final-triste', './assets/final-triste.png')
  }

  create () {
    this.add.image(this.game.config.width * 0.5, this.game.config.height * 0.5, 'final-triste')

    this.posicao = ''

    this.usuarioTextoBase = 'Usuário: '
    this.usuarioDigitado = ''
    this.usuario = this.add.text(450, 150, this.usuarioTextoBase, {
      fontFamily: 'monospace',
      font: '32px Courier',
      fill: '#000000'
    })
      .setInteractive()
      .on('pointerdown', () => {
        this.posicao = 'usuário'
        this.usuario.setFill('#ffffff')
        this.senha.setFill('#000000')
        this.voltar.x = 750
        this.voltar.y = this.usuario.y
      })

    this.senhaTextoBase = 'Senha: '
    this.senhaDigitada = ''
    this.senha = this.add.text(450, 250, this.senhaTextoBase, {
      fontFamily: 'monospace',
      font: '32px Courier',
      fill: '#000000'
    })
      .setInteractive()
      .on('pointerdown', () => {
        this.posicao = 'senha'
        this.usuario.setFill('#000000')
        this.senha.setFill('#ffffff')
        this.voltar.x = 750
        this.voltar.y = this.senha.y
      })

    const teclado = [...Array(10).keys()]
    teclado.forEach(digito => {
      const valor = (digito + 1) % 10
      this.add.text(80 * ((digito % 3) + 1), 100 * (Math.floor(digito / 3) + 1), valor, {
        fontFamily: 'monospace',
        font: '32px Courier',
        fill: '#ffffff'
      })
        .setInteractive()
        .on('pointerdown', () => {
          if (this.posicao === 'usuário') {
            if (this.usuarioDigitado.length < 4) {
              this.usuarioDigitado += valor
              this.usuario.text = this.usuarioTextoBase + this.usuarioDigitado
            }
          } else if (this.posicao === 'senha') {
            if (this.senhaDigitada.length < 4) {
              this.senhaDigitada += valor
              let senhaOculta = ''
              Array.from(this.senhaDigitada).forEach(numero => {
                senhaOculta += '*'
              })
              this.senha.text = this.senhaTextoBase + senhaOculta
            }
          }
          if (this.usuarioDigitado.length === 4 && this.senhaDigitada === 4) {
            this.enviar = this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.5, '[ENVIAR]', {
              fontFamily: 'monospace',
              font: '64px Courier',
              fill: '#ffffff'
            })
              .setInteractive()
              .on('pointerdown', () => {
                axios.post('https://feira-de-jogos.sj.ifsc.edu.br/api/v1/credito', {
                  id: this.usuarioDigitado,
                  senha: this.senhaDigitada,
                  jogo: 1, // Jogo Pesadelos Lúcidos
                  valor: 100 // Tijolinhos
                })
                  .then((response) => {
                    console.log(response)
                  })
                  .catch((error) => {
                    console.error(error)
                  })
              })
          } else {
            if (this.enviar) this.enviar.destroy()
          }
        })
    })

    this.voltar = this.add.text(800, 100, '<', {
      fontFamily: 'monospace',
      font: '32px Courier',
      fill: '#ffffff'
    })
      .setInteractive()
      .on('pointerdown', () => {
        if (this.posicao === 'usuário') {
          if (this.usuarioDigitado > 0) {
            this.usuarioDigitado = this.usuarioDigitado.slice(0, -1)
            this.usuario.text = this.usuarioTextoBase + this.usuarioDigitado
          }
        } else if (this.posicao === 'senha') {
          if (this.senhaDigitada > 0) {
            this.senhaDigitada = this.senhaDigitada.slice(0, -1)
            let senhaOculta = ''
            Array.from(this.senhaDigitada).forEach(numero => {
              senhaOculta += '*'
            })
            this.senha.text = this.senhaTextoBase + senhaOculta
          }
        }
      })
  }

  update () { }
}
