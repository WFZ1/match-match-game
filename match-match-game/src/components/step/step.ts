import './step.scss';
import BaseComponent from '../base/base-component';
import createElement from '../../shared/create-element';

export default class Step extends BaseComponent {
  constructor() {
    super('div', ['step', 'steps__step']);
  }

  render(num: number, text: string, image: string): void {
    const info = createElement('div', ['step__info']);

    const number = createElement('span', ['step__num']);
    number.innerText = String(num);

    const p = createElement('p', ['step__text']);
    p.innerText = text;

    info.append(number, p);

    const img = createElement('img', ['step__img']) as HTMLImageElement;
    img.src = image;

    this.el.append(info, img);
  }
}
