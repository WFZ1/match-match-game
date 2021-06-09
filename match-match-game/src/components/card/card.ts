import './card.scss';
import BaseComponent from '../base/base-component';
import createElement from '../../shared/create-element';
import delay from '../../shared/delay';

const FLIP_CLASS = 'card_flipped';

export default class Card extends BaseComponent {
  isFlipped = false;

  readonly flipDuration = 250;

  private readonly cardContainer;

  private readonly cardFront;

  private readonly cardBack;

  private readonly cardFrontImg;

  constructor(readonly imageSrc: string) {
    super('div', ['card']);

    this.cardContainer = createElement('div', ['card__container']);
    this.cardFront = createElement('div', ['card__front']);
    this.cardBack = createElement('div', ['card__back']);
    this.cardFrontImg = createElement('img', [
      'card__front-img',
    ]) as HTMLImageElement;

    this.render();
    this.addImage();
  }

  render(): void {
    this.el.append(this.cardContainer);
    this.cardContainer.append(this.cardFront, this.cardBack);
    this.cardFront.append(this.cardFrontImg);
  }

  addImage(): void {
    this.cardFrontImg.src = this.imageSrc;
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
