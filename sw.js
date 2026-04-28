const CACHE_NAME = 'access-mantencion-v1';
 
// Archivos que se guardarán en el caché para carga rápida

const ASSETS = [

  './',

  'index.html',

  'manifest.json'

];
 
// Evento de instalación: guarda los archivos en el caché

self.addEventListener('install', (e) => {

  e.waitUntil(

    caches.open(CACHE_NAME).then((cache) => {

      console.log('Cache abierto');

      return cache.addAll(ASSETS);

    })

  );

});
 
// Evento de activación: limpia cachés antiguos si los hubiera

self.addEventListener('activate', (e) => {

  e.waitUntil(

    caches.keys().then((keys) => {

      return Promise.all(

        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))

      );

    })

  );

});
 
// Evento de recuperación (fetch): sirve los archivos desde el caché si están disponibles

self.addEventListener('fetch', (e) => {

  e.respondWith(

    caches.match(e.request).then((res) => {

      return res || fetch(e.request);

    })

  );

});
 
