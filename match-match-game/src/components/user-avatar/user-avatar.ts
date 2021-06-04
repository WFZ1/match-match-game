import './user-avatar.scss';
import BaseComponent from '../base/base-component';

export default class UserAvatar extends BaseComponent {
  constructor(classes: string[]) {
    super('img', ['user-avatar', ...classes]);
  }

  setPhoto(image: string): void {
    this.el.setAttribute('src', image);
  }
}
