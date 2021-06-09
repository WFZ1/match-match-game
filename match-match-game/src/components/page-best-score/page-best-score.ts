import './page-best-score.scss';
import BestPlayers from '../best-players/best-players';
import db from '../base/database';

export default class PageBestScore {
  private readonly bestPlayers: BestPlayers;

  constructor(private readonly rootEl: HTMLElement) {
    this.bestPlayers = new BestPlayers();
  }

  render(): void {
    document.body.classList.add('page-best-score');
    this.rootEl.append(this.bestPlayers.el);

    const bestPlayers = db.bestPlayers as [];

    if (bestPlayers.length) {
      this.bestPlayers.addBestPlayers(bestPlayers);
    }
  }
}
