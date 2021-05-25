import './card.scss';
import BaseComponent from '../base-component';

const FLIP_CLASS = 'card_flipped';

export default class Card extends BaseComponent {
  isFlipped = false;

  private readonly cardContainer;

  private readonly cardFront;

  private readonly cardBack;

  private readonly cardFrontImg;

  constructor(readonly imageSrc: string) {
    super('div', ['card']);

    this.cardContainer = BaseComponent.createElement('div', [
      'card__container',
    ]);
    this.cardFront = BaseComponent.createElement('div', ['card__front']);
    this.cardFrontImg = BaseComponent.createElement('img', [
      'card__front-img',
    ]) as HTMLImageElement;
    this.cardBack = BaseComponent.createElement('div', ['card__back']);

    this.cardFront.append(this.cardFrontImg);
    this.cardContainer.append(this.cardFront, this.cardBack);
    this.el.append(this.cardContainer);

    this.addImage();
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
      this.el.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  }
}
