import './game.scss';
import BaseComponent from '../base/base-component';
import CardsField from '../cards-field/cards-field';
import Card from '../card/card';
import delay from '../../shared/delay';
import IImageCategory from '../../types/image-category.type';
import getData from '../../shared/get-data';
import getContainEl from '../../shared/get-contain-el';
import GameTime from '../game-time/game-time';
import header from '../header/header';
import PopupGameSuccess from '../popup-game-success/popup-game-success';
import db from '../base/database';

const FLIP_DELAY = 1000;
const CARD_WRONG_CLASS = 'card_wrong';
const CARD_CORRECT_CLASS = 'card_approved';

class Game extends BaseComponent {
  private readonly gameTime: GameTime;

  private readonly cardsField: CardsField;

  private readonly popupGameSuccess: PopupGameSuccess;

  private activeCard?: Card;

  private isAnimation = false;

  private countMatchesCards = 0;

  private numbCompare = 0;

  private numbErrCompare = 0;

  constructor() {
    super('div', ['game']);
    this.cardsField = new CardsField();
    this.gameTime = new GameTime(['game__game-time']);
    this.popupGameSuccess = new PopupGameSuccess();

    this.render();
    this.attachListener();
  }

  render (): void {
    this.el.append(this.gameTime.el, this.cardsField.el, this.popupGameSuccess.el);
  }

  attachListener(): void {
    this.cardsField.el.addEventListener('click', (e) => this.handleCardsField(e));
  }

  async start(): Promise<void> {
    this.gameTime.reset();

    const categories: IImageCategory[] = await getData('./images.json');

    // Choose category images. For this moment it is 'Animals'

    const cat = categories[0];
    const images = cat.images.map(
      (name) => `assets/images/${cat.category}/${name}`,
    );

    this.cardsField.clear();

    const cards = images
      .concat(images) // to duplicate images for creating images couples
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5); // shuffle cards

    this.cardsField.addCards(cards);

    await delay(this.cardsField.showTime + cards[0].flipDuration);
    this.gameTime.start();

    header.nav.navItems.forEach((navItem) => navItem.el.classList.add('nav-item_disabled'));
  }

  stop(): void {
    this.gameTime.stop();

    this.countMatchesCards = 0;
    this.numbCompare = 0;
    this.numbErrCompare = 0;

    header.nav.navItems.forEach((navItem) => navItem.el.classList.remove('nav-item_disabled'));
  }

  handleCardsField(e: MouseEvent): void {
    const el = getContainEl(e.target as HTMLElement, '.card', this.el);

    if (el) {
      const card = this.cardsField.cards.find((card) => card.el === el);
      if (card) this.handleCard(card);
    }
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

    this.numbCompare++;

    if (this.activeCard.imageSrc !== card.imageSrc) {
      this.numbErrCompare++;

      this.activeCard.el.classList.add(CARD_WRONG_CLASS);
      card.el.classList.add(CARD_WRONG_CLASS);

      await delay(FLIP_DELAY);

      this.activeCard.flipToBack();
      card.flipToBack();

      this.activeCard.el.classList.remove(CARD_WRONG_CLASS);
      card.el.classList.remove(CARD_WRONG_CLASS);
    }
    else {
      this.activeCard.el.classList.add(CARD_CORRECT_CLASS);
      card.el.classList.add(CARD_CORRECT_CLASS);
      this.countMatchesCards += 2;
    }

    this.activeCard = undefined;
    this.isAnimation = false;

    if(this.countMatchesCards === this.cardsField.fieldSize) this.finishGame();
  }

  private finishGame(): void {
    this.gameTime.stop();

    const time = this.gameTime.getTime();
    const text = Game.getSuccessText(`${ time.min }.${ time.sec }`);

    this.popupGameSuccess.changeParagraphText(text);
    this.popupGameSuccess.showPopup();

    let player = db.getLastPlayer();
    const score = this.calculateScore(time);
    player.score = score;
    delete player.id;
    db.addData('best-players', player);
  }

  calculateScore (time: { [key: string]: number }): number {
    const totalSec = time.min * 60 + time.sec;
    return (this.numbCompare - this.numbErrCompare) * 100 - totalSec * 10;
  }

  private static getSuccessText (time: string): string {
    return `Congratulations! You successfully found all matches on ${ time } minutes.`;
  }
}

const game = new Game();
export default game;
