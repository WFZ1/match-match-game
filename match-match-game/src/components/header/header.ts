import './header.scss';
import BaseComponent from '../base-component';
import Logo from '../logo/logo';
import Nav from '../nav/nav';
import RegisterBtn from '../register-btn/register-btn';
import UserAvatar from '../user-avatar/user-avatar';
import BtnStartGame from '../btn-start-game/btn-start-game';

export class Header {
  readonly el;

  private readonly container;

  private readonly logo;

  private readonly nav;

  private readonly registerBtn;

  private readonly btnStartGame;

  readonly userAvatar;

  constructor() {
    this.el = BaseComponent.createElement('header', ['header']);
    this.container = BaseComponent.createElement('div', ['header__container']);
    this.logo = new Logo();
    this.nav = new Nav();
    this.registerBtn = new RegisterBtn(
      ['header__register-btn'],
      'register new player',
    );
    this.render();

    // They will render after register new player

    this.btnStartGame = new BtnStartGame(
      ['header__btn-start-game'],
      'start game',
    );
    this.userAvatar = new UserAvatar(['header__user-avatar']);
  }

  renderUserPart(): void {
    this.registerBtn.el.remove();
    this.container.append(this.btnStartGame.el, this.userAvatar.el);
  }

  render(): void {
    this.el.append(this.container);
    this.container.append(this.logo.el, this.nav.el, this.registerBtn.el);
  }
}

// Singleton pattern
const header = new Header();
export default header;
