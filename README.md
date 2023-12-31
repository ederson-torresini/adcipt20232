# ADC/IPT 2023.2

Projetos das disciplinas de Administração de Redes de Computadores (ADC) e Telefonia IP (IPT) do Curso Técnico Integrado ao Ensino Médio em Telecomunicações do Instituto Federal de Santa Catarina (IFSC) câmpus São José.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/boidacarapreta/adcipt20232)

## Premissa básica do jogo

Dois irmãos, Tobias e Lola, acordam em um labirinto. Ou melhor, acordam separados, cada um em um lugar do labirinto. Nos seus bolsos, um comunicador e uma lanterna. Eles devem, juntos, acharem a saída desse labirinto de várias camadas que, parece, ao que tudo indica, apenas um sonho. Um sonho lúcido.

Ou um pesadelo.

### Referências do jogo

Filmes:

- Ghost in the Shell;
- Paprika;
- Matrix;
- Cubo.

Na literatura:

- Jorge Luis Borges: A Bilbioteca de Babel;
- Philip K. Dick: Ubik;
- William Gibson: Neuromancer.

### Jogo ideal

Se houvesse recursos infinitos, o jogo ideal seria uma jornada pela mente interconectada dos dois jogadores.

Tobias, 23 anos, impulsivo, rápido, temperamental. Lola, 15 anos, analítica, estrategista, cuidadosa.
Eles não sabem (ainda), mas seu pai capturou-os e conectou seus cérebros na Grande Mente, algo que ele tem buscado [há bastante tempo](https://github.com/boidacarapreta/adcipt20222).
O jogo, assim, é a descoberta dos dois irmãos por um caminho transcedental através de planos criativos e, por que não, psicodélicos.
O que vem, a seguir, são labirintos intrincados e, cada vez mais, assustadores, uma vez que irão mostrar os medos a cada um deles.
Labirintos que, cabe destacar, mudam ao longo do tempo...

No final do labirinto, eles encontram o pai imerso na Grande Mente, e precisam usar os artefatos recolhidos no labirinto para libertá-lo e voltarem, juntos, para o mundo real.

### Regras

Este é um detalhe importante: a cada intervalo de tempo, o mapa muda: as camadas do labirinto se alternam na tela, alterando as áreas de colisão.
O labirinto, na prática, está vivo.
E pulsando.
Há apenas um único inimigo: o próprio jogador (e seus medos).

### Objetivo

Para conseguirem terminar o jogo, basta chegar ao final do labirinto: o centro onde os irmãos se encontrarão e, juntos, terão forças para enfrentar o pai - que os aprisionou (contra sua vontade...).

### Formas de receita

Como formas de receita, estão previstos:

- Compra de créditos para estender o relógio;
- Personalização de personagens e mapas.

### Cenas do jogo

O jogo tem poucas cenas. A primeira, de abertura, é apenas para apresentar o jogo com uma imagem de capa e um texto, o qual deve ser clicado para avançar para a próxima cena:

```mermaid
flowchart TD
  A([Início])
  B[Cena de abertura]
  C[Próxima cena:\nLabirinto]
  Z([Fim])

  A --> B
  B --> |Usuário clica no botão| C
  C --> Z
```

Na cen seguinte, a principal do jogo, os dois jogadores estão em um labirinto, onde devem chegar ao final antes do contador regressivo:

```mermaid
flowchart TD
  A([Início])
  B(Cena do labirinto)
  C{Acharam a\nsaída antes\nde terminar\no tempo?}
  X[Próxima cena:\nFinal feliz]
  Y[Próxima cena:\nFinal triste]
  Z([Fim])

  A --> B
  B--> C
  C --> |Sim| X
  C --> |Não| Y
  X --> Z
  Y --> Z
```

As duas cenas de final feliz e triste têm função equivalente, que é de indicar o final para os jogadores e voltar para a tela de abertura:

```mermaid
flowchart TD
  A([Início])
  B[Cena de final\nfeliz ou triste]
  C[Próxima cena:\nAbertura]
  Z([Fim])

  A --> B
  B --> |Usuário clica no botão| C
  C --> Z
```

## Jogos das Equipes

| Equipe | Jogo | Entrega 1 | Entrega 2 | Entrega 3 | Entrega 4 | Entrega 5 | Entrega 6 | Entrega 7 | Entrega 8
|-|-|-|-|-|-|-|-|-|-|
| [Projeto PATO](https://github.com/Projeto-PATO) | [Além das Montanhas](https://github.com/Projeto-PATO/Alem-das-Montanhas) | 8 | 8 | 8 | 6 |
| [Manos Association ManAss](https://github.com/Manos-association-ManAss) | [Errei Mlk Pro Soccer](https://github.com/Manos-association-ManAss/ErreiFuiMlk-ProSoccer) | 6 | 6 | 0 | 0 |
| [Pixel Quest Games](https://github.com/Pixel-Quest-Games) | [Room Riddle](https://github.com/Pixel-Quest-Games/Room-Riddle) | 6 | 6 | 6 | 6 |
| [Syzygy Team](https://github.com/SyzygyTeam) | [Last Fate](https://github.com/SyzygyTeam/LastFate) | 6 | 6 | 6 | 0 |
| [Hoff Games](https://github.com/Hoff-Games) | [FutHoff - A Busca pelo Troféu Dourado](https://github.com/Hoff-Games/FutHoff_-_A_Busca_pelo_Trofeu_Dourado) | 6 | 6 | 6 | 6 |
| [HairStyle Company](https://github.com/Hairstyle-Company/SeguremOsPersas) | [Segurem os Persas!](https://github.com/Hairstyle-Company/SeguremOsPersas) | 6 | 6 | 6 | 0 |
| [The New Hera](https://github.com/The-New-Hera) | [On the Run](https://github.com/The-New-Hera/On-The-Run) | 6 | 6 | 6 | 6 |
| [Pijama 13](https://github.com/pijama-13) | [labirintopia](https://github.com/pijama-13/labirintopia) | 6 | 6 | 6 | 6 |
| [Thouer Engine](https://github.com/Thouer-Engine) | [Damn, It's Monday](https://github.com/Thouer-Engine/damnitsmonday) | 6 | 6 | 6 | 6 |
| [Armbreakers Games](https://github.com/ARMBREAKERS-GAMES) | [Gatasma](https://github.com/ARMBREAKERS-GAMES/Gatasma) | 6 | 6 | 6 | 6 |
| [STB Games](https://github.com/STB-Games) | [The Conundrum](https://github.com/STB-Games/The-Conundrum) | 6 | 6 | 6 | 0 |
