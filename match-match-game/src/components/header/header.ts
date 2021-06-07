import './header.scss';
import BaseComponent from '../base/base-component';
import Logo from '../logo/logo';
import Nav from '../nav/nav';
import RegisterBtn from '../register-btn/register-btn';
import UserAvatar from '../user-avatar/user-avatar';
import BtnToggleGame from '../btn-toggle-game/btn-toggle-game';
import createElement from '../../shared/create-element';

export class Header extends BaseComponent {
  private readonly container;

  private readonly logo;

  readonly nav;

  private readonly registerBtn;

  readonly btnToggleGame;

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

    this.btnToggleGame = new BtnToggleGame(['header__btn-start-game']);
    this.userAvatar = new UserAvatar(['header__user-avatar']);
  }

  renderUserPart(): void {
    this.registerBtn.el.remove();
    this.container.append(this.btnToggleGame.el, this.userAvatar.el);
  }

  render(): void {
    this.el.append(this.container);
    this.container.append(this.logo.el, this.nav.el, this.registerBtn.el);
  }
}

// Singleton pattern
const header = new Header();
export default header;
