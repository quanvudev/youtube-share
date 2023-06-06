import { act } from 'react-dom/test-utils';

import Timer from '../time';

describe('Timer', () => {
  it('should clear the timer and update the remaining time', async () => {
    const callbackMock = jest.fn();
    const clearTimeoutMock = jest.spyOn(window, 'clearTimeout');

    const timer = new Timer(callbackMock, 1000);
    timer.start = 0;

    act(() => {
      timer.pause();
    });

    expect(timer.timerId).toBeUndefined();
    expect(timer.remaining).toBe(1000);

    clearTimeoutMock.mockRestore();
  });
});
