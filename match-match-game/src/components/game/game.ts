import './game.scss';
import BaseComponent from '../base/base-component';
import gameSettingsField from '../game-settings-field/game-settings-field';
import CardsField from '../cards-field/cards-field';
import Card from '../card/card';
import GameTime from '../game-time/game-time';
import db from '../base/database';
import delay from '../../shared/delay';
import router from '../base/router';
import PopupGameSuccess from '../popup-game-success/popup-game-success';
import getData from '../../shared/get-data';
import IImageCategory from '../../types/image-category.type';
import getContainEl from '../../shared/get-contain-el';
import fromHyphenToCamelCase from '../../shared/from-hyphen-to-camelcase';
import IGameSettings from '../../types/game-settings.type';

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

  render(): void {
    this.el.append(
      this.gameTime.el,
      this.cardsField.el,
      this.popupGameSuccess.el,
    );
  }

  attachListener(): void {
    this.cardsField.el.addEventListener('click', (e) =>
      this.handleCardsField(e),
    );
  }

  attachHandlerGameCompleting(func: () => void): void {
    this.popupGameSuccess.attachHandler((e: Event) => {
      e.preventDefault();
      router.navigate('score');
      this.popupGameSuccess.hidePopup();
      func();
    });
  }

  private static configureSettings(
    categories: IImageCategory[],
  ): IGameSettings {
    const gameParams: { [key: string]: string } = {};

    gameSettingsField.gameParams.forEach((param) => {
      const prop = fromHyphenToCamelCase(param.id);
      gameParams[prop] = (param.field.el as HTMLSelectElement).value;
    });

    const cardsType =
      categories.find(
        (imagesType) => imagesType.category === gameParams.listGameCardsType,
      ) || categories[0];
    const difficulty = +gameParams.listGameDifficulty.split('x')[0];

    return { cardsType, difficulty };
  }

  async start(): Promise<void> {
    this.gameTime.reset();

    const categories: IImageCategory[] = await getData('./images.json');

    const { cardsType, difficulty } = Game.configureSettings(categories);

    const images = cardsType.images
      .map((name) => `assets/images/${cardsType.category}/${name}`)
      .sort(() => Math.random() - 0.5);

    images.splice(difficulty, 100);

    this.cardsField.clear();

    const cards = images
      .concat(images) // to duplicate images for creating images couples
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5); // shuffle cards

    this.cardsField.addCards(cards);

    await delay(this.cardsField.showTime + cards[0].flipDuration);
    this.gameTime.start();
  }

  stop(): void {
    this.gameTime.stop();

    this.countMatchesCards = 0;
    this.numbCompare = 0;
    this.numbErrCompare = 0;
  }

  handleCardsField(e: MouseEvent): void {
    const el = getContainEl(e.target as HTMLElement, '.card', this.el);

    if (el) {
      const pointer = this.cardsField.cards.find((card) => card.el === el);
      if (pointer) this.handleCard(pointer);
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
    } else {
      this.activeCard.el.classList.add(CARD_CORRECT_CLASS);
      card.el.classList.add(CARD_CORRECT_CLASS);
      this.countMatchesCards += 2;
    }

    this.activeCard = undefined;
    this.isAnimation = false;

    if (this.countMatchesCards === this.cardsField.cards.length)
      this.finishGame();
  }

  private finishGame(): void {
    this.gameTime.stop();

    const time = this.gameTime.getTime();
    const text = Game.getSuccessText(`${time.min}.${time.sec}`);

    this.popupGameSuccess.changeParagraphText(text);
    this.popupGameSuccess.showPopup();

    const player = db.getLastPlayer();
    const score = this.calculateScore(time);
    player.score = score;
    delete player.id;
    db.addData('best-players', player);
  }

  calculateScore(time: { [key: string]: number }): number {
    const totalSec = time.min * 60 + time.sec;
    return (this.numbCompare - this.numbErrCompare) * 100 - totalSec * 10;
  }

  private static getSuccessText(time: string): string {
    return `Congratulations! You successfully found all matches on ${time} minutes.`;
  }
}

const game = new Game();
export default game;
