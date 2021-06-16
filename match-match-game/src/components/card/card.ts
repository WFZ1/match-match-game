import './card.scss';
import BaseComponent from '../base/base-component';
import createElement from '../../shared/create-element';
import delay from '../../shared/delay';
import { FLIP_CLASS } from './constants';

export default class Card extends BaseComponent {
  isFlipped = false;

  readonly flipDuration = 250;

  private readonly cardContainerEl;

  private readonly cardFrontEl;

  private readonly cardBackEl;

  private readonly cardFrontImgEl;

  constructor(readonly imageSrc: string) {
    super('div', ['card']);

    this.cardContainerEl = createElement('div', ['card__container']);
    this.cardFrontEl = createElement('div', ['card__front']);
    this.cardBackEl = createElement('div', ['card__back']);
    this.cardFrontImgEl = createElement('img', [
      'card__front-img',
    ]) as HTMLImageElement;

    this.render();
  }

  private render(): void {
    this.cardFrontImgEl.src = this.imageSrc;

    this.el.append(this.cardContainerEl);
    this.cardContainerEl.append(this.cardFrontEl, this.cardBackEl);
    this.cardFrontEl.append(this.cardFrontImgEl);
  }

  flipToBack(): Promise<void> {
    this.isFlipped = true;
    return this.flip(true);
  }

  flipToFront(): Promise<void> {
    this.isFlipped = false;
    return this.flip();
  }

  private flip(isFront = false): Promise<void> {
    return new Promise((resolve) => {
      this.el.classList.toggle(FLIP_CLASS, isFront);
      delay(this.flipDuration).then(resolve);
    });
  }
}
