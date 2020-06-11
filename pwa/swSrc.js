/* global workbox importScripts */
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js"
);

workbox.setConfig({
  debug: false
});

/**
 * Handle a route with and without trailing slash
 * e.g. /about & /about/
 */
const mapRouteWithTrailingSlash = ({ url }) => {
  const additionalUrlsToCheck = [];
  if (url.href.endsWith("/")) {
    const newURL = new URL(url.href);
    newURL.pathname = newURL.pathname.substring(0, newURL.pathname.length - 1);
    additionalUrlsToCheck.push(newURL);
  }
  return additionalUrlsToCheck;
};

/**
 * Precache and ensure files are downloaded and cached before a service worker is installed,
 * workbox-precaching does all of this during the service worker's install event.
 */

const preacacheManifest = self.__WB_MANIFEST; // injected through workbox-build

workbox.precaching.precacheAndRoute(preacacheManifest, {
  cacheId: "wfp-fms-web",
  urlManipulation: mapRouteWithTrailingSlash
});
