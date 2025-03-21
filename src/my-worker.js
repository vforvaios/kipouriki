import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from "workbox-precaching";
import { NavigationRoute, registerRoute } from "workbox-routing";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
  console.log("Hi Vaios service worker");

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(cacheNames.map((cache) => caches.delete(cache)));
    })
  );
});

// self.__WB_MANIFEST is default injection point
// precacheAndRoute(self.__WB_MANIFEST);
precacheAndRoute(self.__WB_MANIFEST.filter((_) => false));

// clean old assets
cleanupOutdatedCaches();

// to allow work offline
// registerRoute(new NavigationRoute(createHandlerBoundToURL("index.html")));
