const workboxBuild = require("workbox-build");

/**
 * Transform nuxt page file
 * e.g. /my-page/index.html => /my-page
 */
const htmlTransform = async manifestEntries => {
  const manifest = manifestEntries.map(entry => {
    if (entry.url.endsWith("/index.html")) {
      entry.url = entry.url.substring(0, entry.url.length - 11);
    }
    return entry;
  });
  return { manifest, warnings: [] };
};

const buildSW = async () => {
  try {
    const result = await workboxBuild.injectManifest({
      swSrc: "./pwa/swSrc.js",
      swDest: "./static/sw.js",
      globDirectory: "./dist",
      globPatterns: ["**/*.{js,html,ico}"],
      globIgnores: ["sw.js"],
      manifestTransforms: [htmlTransform],
      maximumFileSizeToCacheInBytes: 1000000 // 1mb
    });
    const { count, size, warnings } = result;
    warnings.forEach(console.warn); //eslint-disable-line
    console.log(`${count} files will be precached, totaling ${size/1000000} MB.`); //eslint-disable-line
  } catch (error) {
    console.log(error); //eslint-disable-line
  }
};

buildSW();
