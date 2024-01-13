module.exports = {
    testEnvironment: 'node',
    testRegex: 'tests/.*\\.test\\.js$',
    // setupFiles: ['<rootDir>/tests/setup.js'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
    moduleFileExtensions: ['js', 'json'],
   
  };
  