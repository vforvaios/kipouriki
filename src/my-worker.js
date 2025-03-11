import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from "workbox-precaching";
import { NavigationRoute, registerRoute } from "workbox-routing";

self.addEventListener("activate", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
  console.log("Hi Vaios service worker");

  const expectedCacheNamesSet = new Set(Object.values(CURRENT_CACHES));
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!expectedCacheNamesSet.has(cacheName)) {
            console.log("Hiiiiiiiiiiiiiiiiiii");
            // If this cache name isn't present in the set of
            // "expected" cache names, then delete it.
            console.log("Deleting out of date cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

// self.__WB_MANIFEST is default injection point
// precacheAndRoute(self.__WB_MANIFEST);
precacheAndRoute(self.__WB_MANIFEST.filter((_) => false));

// clean old assets
cleanupOutdatedCaches();

// to allow work offline
// registerRoute(new NavigationRoute(createHandlerBoundToURL("index.html")));
