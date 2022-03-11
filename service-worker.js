let cacheName = "afterSchool-v1";
let cacheFiles = [
    'index.html',
    'manifest.json',
    'images/bg.jpeg',
    'images/favicon.ico',
    'images/icon-192.png',
    'images/icon-512.png',
    'https://web-individual-coursework-2.herokuapp.com/english.jpeg',
    'https://web-individual-coursework-2.herokuapp.com/maths.jpeg',
    'https://web-individual-coursework-2.herokuapp.com/history.jpeg',
    'https://web-individual-coursework-2.herokuapp.com/geography.jpeg',
    'https://web-individual-coursework-2.herokuapp.com/urdu.jpeg',
    'https://web-individual-coursework-2.herokuapp.com/cs.jpeg',
    'https://web-individual-coursework-2.herokuapp.com/physics.jpeg',
    'https://web-individual-coursework-2.herokuapp.com/chemistery.jpeg',
    'https://web-individual-coursework-2.herokuapp.com/addmaths.jpeg',
    'https://web-individual-coursework-2.herokuapp.com/islamiat.jpeg',
    'https://web-individual-coursework-2.herokuapp.com/arabic.jpeg',
    'https://web-individual-coursework-2.herokuapp.com/literature.jpeg',
    'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js',
    'https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap'
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFiles);
        })
    )
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((r) => {

            console.log('[Service Worker] Fetching resource: ' + e.request.url);
            return r || fetch(e.request).then((response) => {
                return caches.open(cacheName).then((cache) => {
                    cache.put(e.request, response.clone());
                    return response;
                })
            });
        })
    )
})