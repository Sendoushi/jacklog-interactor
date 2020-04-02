module.exports = {
  verbose: true,
  setupFiles: ['./setup-jest.js'],
  testPathIgnorePatterns: ['/node_modules/', '/lib/', '__tests__/helpers/*'],
  testRegex: '(/test/.*|\\.(test|spec))\\.(ts|js)$',
  moduleNameMapper: {
    // '^Components(.*)$': '<rootDir>/src/components$1',
  },
  moduleFileExtensions: ['js', 'ts', 'json'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.(ts)': 'ts-jest'
  }
};
