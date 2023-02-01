// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig }  = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);
  const { transformer, resolver } = config;
  config.resolver.assetExts.push('cjs');
  
  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  };
  config.resolver = {
    ...resolver,
    // Add svg and cjs to the list of asset extensions
    assetExts: resolver.assetExts.filter((ext) => {
      if (ext === 'svg') {
        return false;
      }
      if (ext === 'cjs') {
        return false;
      }
      return true;
    }),
    sourceExts: [...resolver.sourceExts, 'svg', 'cjs'],
  };

  return config;
})();
