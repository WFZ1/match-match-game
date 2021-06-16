import './best-players.scss';
import BaseComponent from '../base/base-component';
import BestPlayer from '../best-player/best-player';
import IPlayer from '../../types/player.type';
import createElement from '../../shared/create-element';
import { NUMBER_TOP_PLAYERS } from './constants';

export default class BestPlayers extends BaseComponent {
  private readonly bestPlayers: BestPlayer[] = [];

  private readonly containerEl: HTMLElement;

  private readonly titleEl: HTMLElement;

  constructor(title: string) {
    super('div', ['best-players']);

    this.titleEl = createElement('h2', ['best-players__title']);
    this.containerEl = createElement('div', ['best-players__container']);

    this.render(title);
  }

  private render(title: string): void {
    this.titleEl.textContent = title;
    this.el.append(this.titleEl, this.containerEl);
  }

  addBestPlayers(players: IPlayer[]): void {
    this.containerEl.innerHTML = '';

    for (let i = 0; i < NUMBER_TOP_PLAYERS && players[i]; i++) {
      const player = new BestPlayer(['best-players__player'], players[i]);

      this.bestPlayers.push(player);
      this.containerEl.append(player.el);
    }
  }
}
