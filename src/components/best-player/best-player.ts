import './best-player.scss';
import BaseComponent from '../base/base-component';
import Score from '../score/score';
import createElement from '../../shared/create-element';
import IPlayer from '../../types/player.type';

export default class BestPlayer extends BaseComponent {
  private readonly imageEl: HTMLImageElement;

  private readonly fullNameEl: HTMLElement;

  private readonly emailEl: HTMLElement;

  private readonly score: Score;

  constructor(classes: string[], player: IPlayer) {
    super('div', ['best-player', ...classes]);

    this.imageEl = createElement('img', [
      'best-player__img',
    ]) as HTMLImageElement;
    this.fullNameEl = createElement('span', ['best-player__fullname']);
    this.emailEl = createElement('span', ['best-player__email']);
    this.score = new Score(['best-player__score'], player.score);

    this.render(player);
  }

  private render({ avatar, fullName, email }: IPlayer): void {
    this.imageEl.src = avatar;
    this.fullNameEl.textContent = fullName;
    this.emailEl.textContent = email;

    this.el.append(this.imageEl, this.fullNameEl, this.emailEl, this.score.el);
  }
}
