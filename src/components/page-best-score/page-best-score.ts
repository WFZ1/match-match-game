import './page-best-score.scss';
import BestPlayers from '../best-players/best-players';
import db from '../base/database/database';
import { BEST_PLAYERS_TITLE } from './constants';
import IPlayer from '../../types/player.type';

export default class PageBestScore {
  private readonly bestPlayers: BestPlayers;

  constructor(private readonly rootEl: HTMLElement) {
    this.bestPlayers = new BestPlayers(BEST_PLAYERS_TITLE);
  }

  build(): void {
    document.body.className = 'page-best-score';

    db.getAccessToDataStore('best-players', (data) => {
      this.bestPlayers.addBestPlayers(data as IPlayer[]);

      this.rootEl.append(this.bestPlayers.el);
    });
  }
}
