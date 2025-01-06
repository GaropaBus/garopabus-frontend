const CACHE_NAME = "garopabus-cache-v1";
const urlsToCache = [
  "/",
  "/user/rotas-onibus/",
  "/user/ajuda/",
  "/user/horarios/",
  "/assets/css/user/rotas-onibus.css",
  "/assets/css/user/ajuda.css",
  "/assets/css/user/horarios.css",
  "/assets/css/base.css",
  "/assets/css/index.css",
  "/assets/images/android-chrome-192x192.png",
  "/assets/images/android-chrome-512x512.png",
  "/assets/images/favicon-32x32.png",
  "/assets/images/Logo_garopabus_horizontal.png",
  // Adicione aqui todos os recursos essenciais do seu site
];

// Instalar o Service Worker e armazenar recursos em cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Interceptar requisições de rede
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Retorna o recurso em cache se existir
      if (response) {
        return response;
      }

      // Tenta buscar da rede
      return fetch(event.request);
    })
  );
});

// Limpar caches antigos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

  // Garante que o Service Worker mais recente controla imediatamente
  self.clients.claim();
});

// Listener para receber notificações push
self.addEventListener("push", function (event) {
  const data = event.data.json(); // Parseia os dados enviados pelo backend
  const options = {
    body: data.body,
    icon: data.icon, // Ícone da notificação
    data: { url: data.click_action }, // URL para onde o usuário será redirecionado ao clicar
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});

// Listener para ações quando a notificação for clicada
self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  if (event.notification.data.url) {
    event.waitUntil(clients.openWindow(event.notification.data.url));
  }
});
