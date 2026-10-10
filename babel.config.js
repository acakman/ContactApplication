module.exports = {
  presets: ['module:@react-native/babel-preset'],
  // Must be listed last (required by react-native-reanimated, used for swipe-to-delete).
  plugins: ['react-native-worklets/plugin'],
};
