// Choose a cache name
const cacheName = 'cache-v1'

// List the files to precache
const precacheResources = [
  './',
  './index.html',
  './main.css',
  './assets/logo/128.png',
  './assets/logo/192.png',
  './assets/logo/256.png',
  './assets/logo/384.png',
  './assets/logo/512.png',
  './assets/mapa/blocos.png',
  './assets/mapa/grama.png',
  './assets/mapa/itens.png',
  './assets/mapa/labirinto.json',
  './assets/mapa/paredes.png',
  './assets/mapa/pedras.png',
  './assets/mapa/personagenm.png',
  './assets/mapa/plantas.png',
  './assets/mapa/sombras-plantas.png',
  './assets/mapa/sombars.png',
  './assets/baixo.png',
  './assets/capa.png',
  './assets/cima.png',
  './assets/clique.mp3',
  './assets/credito.mp3',
  './assets/direita.png',
  './assets/erro.mp3',
  './assets/esquerda.png',
  './assets/final-triste.png',
  './assets/jardim-secreto.mp3',
  './assets/lola.png',
  './assets/moeda.mp3',
  './assets/baixo.png',
  './assets/tela-cheia.png',
  './assets/tobias.png',
  '/dist/index.js'
]

// When the service worker is installing, open the cache and add the precache resources to it
self.addEventListener('install', (event) => {
  console.log('Service worker install event!')
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources)))
})

self.addEventListener('activate', (event) => {
  console.log('Service worker activate event!')
})

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request)
    })
  )
})
