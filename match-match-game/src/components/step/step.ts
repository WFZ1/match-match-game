import './step.scss';
import BaseComponent from '../base-component';

export default class Step extends BaseComponent {
  constructor() {
    super('div', ['step', 'steps__step']);
  }

  render(num: number, text: string, image: string): void {
    const info = BaseComponent.createElement('div', ['step__info']);

    const number = BaseComponent.createElement('span', ['step__num']);
    number.innerText = String(num);

    const p = BaseComponent.createElement('p', ['step__text']);
    p.innerText = text;

    info.append(number, p);

    const img = BaseComponent.createElement('img', [
      'step__img',
    ]) as HTMLImageElement;
    img.src = image;

    this.el.append(info, img);
  }
}
