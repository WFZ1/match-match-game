import './btn-toggle-game.scss';
import BaseComponent from '../base/base-component';
import router from '../base/router';
import game from '../game/game';
import { GAME_URL, START_GAME, STOP_GAME } from './constants';

class BtnToggleGame extends BaseComponent {
  private isGameStart = false;

  constructor() {
    super('a', ['btn-toggle-game', 'btn']);

    this.render();
    this.attachListeners();
  }

  private render(): void {
    this.el.textContent = START_GAME;
    this.el.setAttribute('href', GAME_URL);
  }

  private attachListeners(): void {
    this.el.addEventListener('click', (e) => this.attachHandler(e));
    game.attachHandlerGameCompleting(this.toggleGame.bind(this));
  }

  addClasses(classes: string[]) {
    this.el.classList.add(...classes);
  }

  toggleGame(): void {
    if (!this.isGameStart) {
      game.start();
      this.el.textContent = STOP_GAME;
      this.isGameStart = true;
    } else {
      game.stop();
      this.el.textContent = START_GAME;
      this.isGameStart = false;
    }
  }

  private attachHandler(e: Event): void {
    e.preventDefault();

    if (!this.isGameStart) {
      router.navigate(GAME_URL);
    } else {
      router.navigate('');
    }

    this.toggleGame();
  }
}

const btnToggleGame = new BtnToggleGame();
export default btnToggleGame;
