import './game-time.scss';
import BaseComponent from '../base/base-component';

const ZERO_TIME = '00:00';

export default class GameTime extends BaseComponent {
  private stoptime = true;

  private min: number | string = 0;

  private sec: number | string = 0;

  constructor(classes: string[]) {
    super('span', ['game-time', ...classes]);
    this.render();
  }

  render(): void {
    this.el.textContent = ZERO_TIME;
  }

  start(): void {
    if (this.stoptime) {
      this.stoptime = false;
      this.updateTime();
    }
  }

  stop(): void {
    if (!this.stoptime) {
      this.stoptime = true;
    }
  }

  updateTime(): void {
    if (!this.stoptime) {
      this.sec = +this.sec;
      this.min = +this.min;

      this.sec++;

      if (this.sec === 60) {
        this.min++;
        this.sec = 0;
      }

      if (this.sec < 10 || this.sec === 0) this.sec = `0${this.sec}`;
      if (this.min < 10 || this.min === 0) this.min = `0${this.min}`;

      this.el.textContent = `${this.min}:${this.sec}`;

      setTimeout(() => this.updateTime(), 1000);
    }
  }

  getTime(): { [key: string]: number } {
    return {
      min: +this.min,
      sec: +this.sec,
    };
  }

  reset(): void {
    this.min = 0;
    this.sec = 0;
    this.el.textContent = ZERO_TIME;
  }
}
