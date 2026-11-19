const CACHE = 'napippi-v23-pwa-1';
const ASSETS = ['./index.html','./manifest.json','./icon-192.png','./icon-512.png','./apple-touch-icon.png','./bgm.mp3'];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('napippi-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', event => {
 const req = event.request;
 if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
 if (req.mode === 'navigate') { event.respondWith(fetch(req).catch(() => caches.open(CACHE).then(cache => cache.match('./index.html')))); return; }
 event.respondWith(caches.open(CACHE).then(cache => cache.match(req)).then(hit => hit || fetch(req)));
});
