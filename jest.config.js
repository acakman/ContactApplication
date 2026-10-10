module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js', './jest.setup.js'],
  moduleNameMapper: {'\\.ttf$': '<rootDir>/__mocks__/fileMock.js'},
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native(-[a-z-]+)?|@react-native(-community)?|@react-native-vector-icons|@react-navigation|@op-engineering)/)',
  ],
};
