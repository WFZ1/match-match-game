import './best-player.scss';
import BaseComponent from '../base/base-component';
import IPlayer from '../../types/player.type';
import createElement from '../../shared/create-element';
import Score from '../score/score';

export default class BestPlayer extends BaseComponent {
  private readonly image: HTMLImageElement;

  private readonly fullName: HTMLElement;

  private readonly email: HTMLElement;

  private readonly score: Score;

  constructor(classes: string[], player: IPlayer) {
    super('div', ['best-player', ...classes]);
    this.image = createElement('img', ['best-player__img']) as HTMLImageElement;
    this.fullName = createElement('span', ['best-player__fullname']);
    this.email = createElement('span', ['best-player__email']);
    this.score = new Score(['best-player__score'], player.score);

    this.render(player);
  }

  render(player: IPlayer): void {
    this.image.src = player.avatar;
    this.fullName.textContent = player.fullName;
    this.email.textContent = player.email;

    this.el.append(this.image, this.fullName, this.email, this.score.el);
  }
}
