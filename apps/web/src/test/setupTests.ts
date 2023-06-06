import '@testing-library/jest-dom/extend-expect';

declare const global: any;

global.setImmediate = jest.useRealTimers;
