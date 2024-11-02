var dataCacheName = 'moneycalc-v1';
var cacheName = 'moneycalc-v1';
var filesToCache = [
  'https://bartronix.github.io/moneycalc/',
  'https://bartronix.github.io/moneycalc/index.html',
  'https://bartronix.github.io/moneycalc/betalen.html',
  'https://bartronix.github.io/moneycalc/info.html',
  'https://bartronix.github.io/moneycalc/rekenmachine.html',
  'https://bartronix.github.io/moneycalc/scripts/errorhandler.js',
  'https://bartronix.github.io/moneycalc/scripts/jquery-1.10.1.min.js',
  'hhttps://bartronix.github.io/moneycalc/scripts/menu.js',
  'https://bartronix.github.io/moneycalc/scripts/init.js',
  'https://bartronix.github.io/moneycalc/scripts/main.js',  
  'https://bartronix.github.io/moneycalc/css/menu.css',
  'https://bartronix.github.io/moneycalc/css/modal.css',
  'https://bartronix.github.io/moneycalc/css/main.css',
  'https://bartronix.github.io/moneycalc/favicon.ico',
  'https://bartronix.github.io/moneycalc/images/icons/icon-16x16.png',
  'https://bartronix.github.io/moneycalc/images/icons/icon-32x32.png',
  'https://bartronix.github.io/moneycalc/images/icons/icon-128x128.png',
  'https://bartronix.github.io/moneycalc/images/icons/icon-144x144.png',
  'https://bartronix.github.io/moneycalc/images/icons/icon-152x152.png',
  'https://bartronix.github.io/moneycalc/images/icons/icon-192x192.png',
  'https://bartronix.github.io/moneycalc/images/icons/icon-256x256.png',
  'https://bartronix.github.io/moneycalc/images/icons/android-chrome-192x192.png',
  'https://bartronix.github.io/moneycalc/images/icons/android-chrome-512x512.png',
  'https://bartronix.github.io/moneycalc/images/icons/apple-touch-icon.png',
  'https://bartronix.github.io/moneycalc/images/icons/mstile-150x150.png',
  'https://moneycalc.bartleemans.be/images/splash/launch-640x1136.png',
  'https://moneycalc.bartleemans.be/images/splash/launch-750x1294.png',
  'https://moneycalc.bartleemans.be/images/splash/launch-1125x2436.png',
  'https://moneycalc.bartleemans.be/images/splash/launch-1242x2148.png',
  'https://moneycalc.bartleemans.be/images/splash/launch-1536x2048.png',
  'https://moneycalc.bartleemans.be/images/splash/launch-1668x2224.png',
  'https://moneycalc.bartleemans.be/images/splash/launch-2048x2732.png',
  'https://bartronix.github.io/moneycalc/images/money/1.png',
  'https://bartronix.github.io/moneycalc/images/money/2.png',
  'https://bartronix.github.io/moneycalc/images/money/5.png',
  'https://bartronix.github.io/moneycalc/images/money/10.png',
  'https://bartronix.github.io/moneycalc/images/money/20.png',
  'https://bartronix.github.io/moneycalc/images/money/50.png',
  'https://bartronix.github.io/moneycalc/images/money/100.png',
  'https://bartronix.github.io/moneycalc/images/money/200.png',
  'https://bartronix.github.io/moneycalc/images/money/500.png',
  'https://bartronix.github.io/moneycalc/images/money/1000.png',
  'https://bartronix.github.io/moneycalc/images/money/2000.png',
  'https://bartronix.github.io/moneycalc/images/money/5000.png',
  'https://bartronix.github.io/moneycalc/images/money/10000.png',
  'https://bartronix.github.io/moneycalc/images/money/20000.png'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if(key !== cacheName && key !== dataCacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      } else {
        return fetch(event.request).then(function(res) {
          return caches.open('dynamic').then(function(cache) {
            cache.put(event.request.url, res.clone());
            return res;
          });
        });
      }
    })
  );
});
