export default class Timer {
  callback: () => void;
  delay: number;
  timerId: number | undefined;
  start: number;
  remaining: number;

  constructor(callback: () => void, delay: number) {
    this.callback = callback;
    this.delay = delay;
    this.timerId = undefined;
    this.start = 0;
    this.remaining = delay;
  }

  pause = () => {
    if (!this.timerId) return;
    window.clearTimeout(this.timerId);
    this.timerId = undefined;
    this.remaining -= Date.now() - this.start;
  };

  resume = () => {
    this.start = Date.now();
    this.timerId = window.setTimeout(this.callback, this.remaining);
  };
}
