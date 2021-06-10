import './header.scss';
import BaseComponent from '../base/base-component';
import Logo from '../logo/logo';
import Nav from '../nav/nav';
import RegisterBtn from '../register-btn/register-btn';
import UserAvatar from '../user-avatar/user-avatar';
import btnToggleGame from '../btn-toggle-game/btn-toggle-game';
import createElement from '../../shared/create-element';

export class Header extends BaseComponent {
  private readonly container;

  private readonly logo;

  readonly nav;

  readonly registerBtn;

  readonly userAvatar;

  constructor() {
    super('header', ['header']);
    this.container = createElement('div', ['header__container']);
    this.logo = new Logo();
    this.nav = new Nav();
    this.registerBtn = new RegisterBtn(
      ['header__register-btn'],
      'register new player',
    );
    this.render();

    // They will render after register new player

    this.userAvatar = new UserAvatar(['header__user-avatar']);
  }

  renderUserPart(): void {
    this.registerBtn.el.remove();
    btnToggleGame.addClasses(['header__btn-start-game']);
    this.container.append(btnToggleGame.el, this.userAvatar.el);
  }

  render(): void {
    this.el.append(this.container);
    this.container.append(this.logo.el, this.nav.el, this.registerBtn.el);
  }
}

// Singleton pattern
const header = new Header();
export default header;
