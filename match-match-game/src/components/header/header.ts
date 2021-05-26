import './header.scss';
import BaseComponent from "../base-component";
import Logo from '../logo/logo';
import Nav from '../nav/nav';
import RegisterBtn from '../register-btn/register-btn';

export default class Header extends BaseComponent {
  constructor() {
    super('header', ['header']);
    this.render();
  }

  render() {
    const headerContainer = BaseComponent.createElement('div', ['header__container']);
    const logo = new Logo();
    const nav = new Nav();
    const registerBtn = new RegisterBtn();

    this.el.append(headerContainer);
    headerContainer.append(logo.el, nav.el, registerBtn.el);
  }
}
