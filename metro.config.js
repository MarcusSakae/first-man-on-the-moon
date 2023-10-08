// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
  watcher: {
    watchman: {
      ignore_dirs: ["server"]
    }
  }

});

config.resolver.assetExts.push('lottie');
config.resolver.assetExts.push('obj');
config.resolver.assetExts.push('mtl');

module.exports = config;
