const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const defaultConfig = getDefaultConfig(__dirname);

// Merge the default Expo Metro configuration
const config = {
  ...defaultConfig,
  resolver: {
    ...defaultConfig.resolver,
    assetExts: [
      ...defaultConfig.resolver.assetExts.filter((ext) => ext !== 'svg'),
      // Add other asset extensions if needed
    ],
    sourceExts: [
      ...defaultConfig.resolver.sourceExts,
      'svg',
      'mjs',
      'cjs'
    ],
    alias: {
      // Add any custom module aliases here
      '@': './src',
      '@components': './src/components',
      '@utils': './src/utils',
      '@assets': './src/assets',
    },
    platforms: ['ios', 'android', 'native', 'web']
  },
  transformer: {
    ...defaultConfig.transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    unstable_allowRequireContext: true,
    // Ensure proper handling of async imports
    asyncRequireModulePath: require.resolve('metro-runtime/src/modules/async-require'),
  },
  watchFolders: [
    // Add any additional folders to watch
  ],
  maxWorkers: 4,
  resetCache: false,
};

// Apply NativeWind transformer for CSS support
module.exports = withNativeWind(config, {
  input: './src/styles/global.css',
  configPath: './tailwind.config.js',
});