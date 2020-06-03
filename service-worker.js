
importScripts( 'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js')
/**
 * service worker file where webpack will import precache-manifest
 * and Workbox runtime libraries
 */

if (workbox) {
  workbox.core.skipWaiting();
  workbox.core.clientsClaim();
  workbox.precaching.cleanupOutdatedCaches();

  // eslint-disable-next-line no-restricted-globals,no-underscore-dangle
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

}