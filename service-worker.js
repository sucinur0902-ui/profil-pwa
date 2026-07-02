const CACHE_NAME = "profile-cache-v1";

const urlsToCache = [

"/",
"/dashboard.html",
"/dashboard.css",
"/dashboard.js",
"/cms.html",
"/cms.css",
"/cms.js",
"/login.html",
"/login.css",
"/foto.jpeg"

];

self.addEventListener("install", (event)=>{

event.waitUntil(

caches.open(CACHE_NAME)

.then((cache)=>{

return cache.addAll(urlsToCache);

})

);

});

self.addEventListener("fetch",(event)=>{

event.respondWith(

caches.match(event.request)

.then((response)=>{

return response || fetch(event.request);

})

);

});