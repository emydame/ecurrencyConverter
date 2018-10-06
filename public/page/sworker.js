const CACHE_NAME = 'cConverter-cache-v1';
const urlsToCache = [
  './',
  '../css/style.css',
  '../page/home.html',
  '../imgs/converter.jpg',
  '../js/index.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      }).then(function() {
        console.log('WORKER: install completed');
      }).catch(error => {
        console.log('Error', error);
      })
  );
});

self.addEventListener('fetch',function(event){
    event.respondWith(
      caches.match(event.request).then(function(response){
        if(response)return response;
        return fetch(event.request);
      })
    )
});

