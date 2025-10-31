declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME = "our-voice-our-rights-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/vite.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  const fetchEvent = event as FetchEvent;
  // Use a network-first strategy for API requests
  if (fetchEvent.request.url.includes('/api/')) {
    fetchEvent.respondWith(
      fetch(fetchEvent.request)
        .then((response) => {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(fetchEvent.request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          return caches.match(fetchEvent.request) as Promise<Response>;
        })
    );
  } else {
    // Use a cache-first strategy for static assets
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then((response) => {
        return response || fetch(fetchEvent.request);
      })
    );
  }
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
          return Promise.resolve();
        })
      ).then(() => undefined);
    })
  );
});

export {};
