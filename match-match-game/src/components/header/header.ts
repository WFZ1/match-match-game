import './header.scss';
import BaseComponent from '../base/base-component';
import Logo from '../logo/logo';
import Nav from '../nav/nav';
import RegisterBtn from '../register-btn/register-btn';
import playerAvatar from '../player-avatar/player-avatar';
import btnToggleGame from '../btn-toggle-game/btn-toggle-game';
import createElement from '../../shared/create-element';
import { LOGO_TEXT } from './constants';

export class Header extends BaseComponent {
  private readonly containerEl: HTMLElement;

  private readonly logo: Logo;

  readonly nav: Nav;

  readonly registerBtn: RegisterBtn;

  constructor() {
    super('header', ['header']);

    this.containerEl = createElement('div', ['header__container']);
    this.logo = new Logo(LOGO_TEXT);
    this.nav = new Nav();
    this.registerBtn = new RegisterBtn(
      ['header__register-btn'],
      'register new player',
    );

    this.render();
  }

  private render(): void {
    this.el.append(this.containerEl);
    this.containerEl.append(this.logo.el, this.nav.el, this.registerBtn.el);
  }

  renderPlayerPart(): void {
    this.registerBtn.el.remove();
    btnToggleGame.addClasses(['header__btn-start-game']);
    this.containerEl.append(btnToggleGame.el, playerAvatar.el);
  }
}

const header = new Header();
export default header;
