const CACHE_NAME = "profile-cache-v2";

const urlsToCache = [
    "/",
    "/index.html",
    "/dashboard.css",
    "/dashboard.js",
    "/cms.html",
    "/cms.css",
    "/cms.js",
    "/login.html",
    "/login.css",
    "/login.js",
    "/style.css",
    "/script.js",
    "/foto.jpeg",
    "/icon-192.png",
    "/icon-512.png"
];

// Install Service Worker
self.addEventListener("install", (event) => {

    console.log("Service Worker Installed");

    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(async (cache) => {

            for (const url of urlsToCache) {
                try {
                    await cache.add(url);
                    console.log("✔ Berhasil:", url);
                } catch (err) {
                    console.error("❌ Gagal:", url, err);
                }
            }

        })
    );

});

// Activate
self.addEventListener("activate", (event) => {

    console.log("Service Worker Activated");

    event.waitUntil(

        caches.keys().then((cacheNames) => {

            return Promise.all(

                cacheNames.map((cache) => {

                    if (cache !== CACHE_NAME) {

                        return caches.delete(cache);

                    }

                })

            );

        })

    );

});

// Fetch
self.addEventListener("fetch", (event) => {

    event.respondWith(

        caches.match(event.request)

        .then((response) => {

            return response || fetch(event.request);

        })

    );

});

// Push Notification
self.addEventListener("message", (event) => {

    if (event.data === "show-notification") {

        self.registration.showNotification("Website Profil", {

            body: "Selamat datang di Website Profil Suci Nur Khayani 🎉",

            icon: "icon-192.png",

            badge: "icon-192.png"

        });

    }

});