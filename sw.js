/* Flock Watch service worker — offline app shell + instant launch.
   Bump CACHE when you change cached files to force a refresh. */
var CACHE = "flock-watch-v1";
var SHELL = [
  "./",
  "index.html",
  "manifest.json",
  "icon-180.png",
  "icon-192.png",
  "icon-512.png",
  "icon-512-maskable.png"
];

self.addEventListener("install", function(e){
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(function(c){ return c.addAll(SHELL).catch(function(){}); })
  );
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){ if(k !== CACHE) return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(e){
  var req = e.request;
  if(req.method !== "GET") return;                 // never touch the Overpass POST
  var url = new URL(req.url);
  if(url.origin !== self.location.origin) return;   // pass cross-origin requests straight through

  // HTML: network-first so an online user always gets the latest, offline falls back to cache
  if(req.mode === "navigate"){
    e.respondWith(
      fetch(req).then(function(r){
        var copy = r.clone();
        caches.open(CACHE).then(function(c){ c.put(req, copy); });
        return r;
      }).catch(function(){
        return caches.match(req).then(function(m){ return m || caches.match("index.html"); });
      })
    );
    return;
  }

  // Other same-origin assets: cache-first
  e.respondWith(
    caches.match(req).then(function(m){
      return m || fetch(req).then(function(r){
        var copy = r.clone();
        caches.open(CACHE).then(function(c){ c.put(req, copy); });
        return r;
      });
    })
  );
});
