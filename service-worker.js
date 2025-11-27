self.addEventListener('install', (event) => {
  // Forces the waiting service worker to become the active service worker.
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Claims the clients immediately so the page is controlled by the SW.
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Do not intercept requests. 
  // This ensures the app relies 100% on the network (Online Only).
  return;
});