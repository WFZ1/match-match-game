import './best-players.scss';
import BaseComponent from '../base/base-component';
import IPlayer from '../../types/player.type';
import BestPlayer from '../best-player/best-player';
import createElement from '../../shared/create-element';

const TITLE = 'Best players';
const NUMBER_TOP_PLAYERS = 10;

export default class BestPlayers extends BaseComponent {
  private readonly bestPlayers: BestPlayer[] = [];

  private readonly container: HTMLElement;

  private readonly title: HTMLElement;

  constructor() {
    super('div', ['best-players']);
    this.title = createElement('h2', ['best-players__title']);
    this.container = createElement('div', ['best-players__container']);

    this.render();
  }

  render(): void {
    this.title.textContent = TITLE;
    this.el.append(this.title, this.container);
  }

  addBestPlayers(players: IPlayer[]): void {
    this.container.innerHTML = '';

    for (let i = 0; i < NUMBER_TOP_PLAYERS && players[i]; i++) {
      const player = new BestPlayer(['best-players__player'], players[i]);
      this.bestPlayers.push(player);
      this.container.append(player.el);
    }
  }
}
