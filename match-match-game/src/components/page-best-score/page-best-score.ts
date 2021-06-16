import './page-best-score.scss';
import BestPlayers from '../best-players/best-players';
import db from '../base/database/database';
import { BEST_PLAYERS_TITLE } from './constants';

export default class PageBestScore {
  private readonly bestPlayers: BestPlayers;

  constructor(private readonly rootEl: HTMLElement) {
    this.bestPlayers = new BestPlayers(BEST_PLAYERS_TITLE);
  }

  build(): void {
    document.body.className = 'page-best-score';

    const bestPlayers = db.bestPlayers as [];
    if (bestPlayers.length) {
      this.bestPlayers.addBestPlayers(bestPlayers);
    }

    this.rootEl.append(this.bestPlayers.el);
  }
}
