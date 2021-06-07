import './btn-toggle-game.scss';
import BaseComponent from '../base/base-component';
import Router from '../base/router';
import game from '../game/game';

const GAME_URL = 'game';
const START_GAME = 'start game';
const STOP_GAME = 'stop game';

export default class BtnToggleGame extends BaseComponent {
  private isGameStart = false;

  private readonly router: Router;

  constructor(classes: string[]) {
    super('a', ['btn-toggle-game', 'btn', ...classes]);
    this.router = new Router({});
    this.render();
  }

  render (): void {
    this.el.textContent = START_GAME;
    this.el.setAttribute('href', GAME_URL);
    this.el.addEventListener('click', (e) => this.attachHandler(e));
  }

  toggleGame (): void {
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

  attachHandler(e: Event): void {
    e.preventDefault();

    if (!this.isGameStart) {
      this.router.navigate(GAME_URL);
    } else {
      this.router.navigate('');
    }

    this.toggleGame();
  }
}
