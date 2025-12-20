/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: '<rootDir>/tsconfig.json',
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^@integrations/message/providers/chatwoot/(.*)$': '<rootDir>/src/chatwoot/$1',
    '^@integrations/message/providers/chatwoot$': '<rootDir>/src/chatwoot',
  },
};
