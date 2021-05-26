import './register-btn.scss'
import BaseComponent from "../base-component";

export default class RegisterBtn extends BaseComponent {
  constructor () {
    super('button', ['register-btn', 'btn', 'header__register-btn']);
    this.el.innerText = 'register new player';
  }
}
