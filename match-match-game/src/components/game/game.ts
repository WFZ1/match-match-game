import BaseComponent from '../base-component';
import CardsField from '../cards-field/cards-field';
import Card from '../card/card';
import { delay } from '../../shared/delay';

const FLIP_DELAY = 1000;

export default class Game extends BaseComponent {
  private readonly cardsField: CardsField;

  private activeCard?: Card;

  private isAnimation = false;

  constructor() {
    super();
    this.cardsField = new CardsField();
    this.el.append(this.cardsField.el);
  }

  start(images: string[]): void {
    this.cardsField.clear();

    const cards = images
      .concat(images) // to duplicate images for creating images couples
      .map((url) => {
        // create cards
        const card = new Card(url);
        card.el.addEventListener('click', () => this.handleCard(card));
        return card;
      })
      .sort(() => Math.random() - 0.5); // shuffle cards

    this.cardsField.addCards(cards);
  }

  private async handleCard(card: Card) {
    if (this.isAnimation || !card.isFlipped) return;

    this.isAnimation = true;

    await card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }

    if (this.activeCard.imageSrc !== card.imageSrc) {
      this.activeCard.el.classList.add('card_wrong');
      card.el.classList.add('card_wrong');

      await delay(FLIP_DELAY);

      this.activeCard.flipToBack();
      card.flipToBack();

      this.activeCard.el.classList.remove('card_wrong');
      card.el.classList.remove('card_wrong');
    } else {
      this.activeCard.el.classList.add('card_approved');
      card.el.classList.add('card_approved');
    }

    this.activeCard = undefined;
    this.isAnimation = false;
  }
}
