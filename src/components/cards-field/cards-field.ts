import './cards-field.scss';
import BaseComponent from '../base/base-component';
import Card from '../card/card';

export default class CardsField extends BaseComponent {
  cards: Card[] = [];

  readonly showTime = 30000; // time before cards flip back

  constructor() {
    super('div', ['cards-field']);
  }

  clear(): void {
    this.cards = [];
    this.el.innerHTML = '';
  }

  addCards(cards: Card[]): void {
    this.cards = cards;
    this.cards.forEach((card) => this.el.append(card.el));

    setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack());
    }, this.showTime);
  }
}
