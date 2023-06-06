import type { Config } from '@jest/types';

declare const __dirname: string;

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.ts'],
  moduleDirectories: ['node_modules', 'src/test/utils', __dirname],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
};

export default config;
