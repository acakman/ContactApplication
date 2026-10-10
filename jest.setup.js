/* eslint-env jest */
// Swipe gestures can't be exercised in Jest; render the row content only.
jest.mock('react-native-gesture-handler/ReanimatedSwipeable', () => {
  const {View} = require('react-native');
  return ({children}) => <View>{children}</View>;
});
jest.mock('react-native-safe-area-context', () => require('react-native-safe-area-context/jest/mock').default);
jest.mock('react-native-image-picker', () => ({launchCamera: jest.fn(), launchImageLibrary: jest.fn()}));
jest.mock('@op-engineering/op-sqlite', () => {
  const rows = [];
  return {
    __rows: rows,
    open: () => ({
      execute: jest.fn(async (query) => (query.startsWith('SELECT') ? {rows, rowsAffected: 0} : {rows: [], rowsAffected: 1})),
    }),
  };
});
