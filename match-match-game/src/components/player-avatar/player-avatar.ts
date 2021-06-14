import './player-avatar.scss';
import BaseComponent from '../base/base-component';

export default class PlayerAvatar extends BaseComponent {
  constructor(classes: string[]) {
    super('img', ['player-avatar', ...classes]);
  }

  setPhoto(image: string): void {
    this.el.setAttribute('src', image);
  }
}
