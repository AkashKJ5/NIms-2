const CACHE_NAME = "pwa-cache";
const urlsToCache = ['/', '/login/','/dashboard/', '/projects/','/units/' ,'/rooms/','/room-types/','/review/','/offline/'];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});