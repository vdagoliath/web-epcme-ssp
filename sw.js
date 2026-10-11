/* Bembé Producciones — service worker
   Estrategia pensada para conexiones lentas o intermitentes (ETECSA móvil).
   1. Precachea el armazón del sitio (HTML + CSS + JS + imágenes clave).
   2. "Cache first" para estáticos, "network first" para el HTML. */
const CACHE = "bembe-v1";
const ARMAZON = [
  "./",
  "index.html",
  "servicios.html",
  "artistas.html",
  "eventos.html",
  "tienda.html",
  "nosotros.html",
  "noticias.html",
  "contacto.html",
  "legal.html",
  "assets/css/styles.css",
  "assets/js/main.js",
  "assets/img/logo-bembe.svg",
  "assets/img/logo-bembe-claro.svg",
  "assets/img/favicon.svg",
  "manifest.webmanifest"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ARMAZON).catch(() => undefined)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((claves) => Promise.all(claves.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;

  if (req.mode === "navigate" || req.destination === "document") {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copia = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copia));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match("index.html")))
    );
    return;
  }

  e.respondWith(
    caches.match(req).then((cacheado) => {
      if (cacheado) return cacheado;
      return fetch(req).then((res) => {
        if (res.ok) {
          const copia = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copia));
        }
        return res;
      });
    })
  );
});
