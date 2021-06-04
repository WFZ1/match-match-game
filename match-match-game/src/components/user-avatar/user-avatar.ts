import './user-avatar.scss';
import BaseComponent from '../base-component';

export default class UserAvatar extends BaseComponent {
  constructor(classes: string[]) {
    super('img', ['user-avatar', ...classes]);
  }

  setPhoto(image: string) {
    this.el.setAttribute('src', image);
  }
}
