import './player-avatar.scss';
import BaseComponent from '../base/base-component';

class PlayerAvatar extends BaseComponent {
  constructor() {
    super('img', ['player-avatar']);
  }

  setImage(image: string): void {
    this.el.setAttribute('src', image);
  }
}

const playerAvatar = new PlayerAvatar();
export default playerAvatar;
