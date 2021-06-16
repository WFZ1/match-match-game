import './register-popup.scss';
import header from '../header/header';
import Popup from '../base/popup/popup';
import RegisterForm from '../register-form/register-form';
import createElement from '../../shared/create-element';
import { FIELDS, BUTTONS } from './constants';

export default class RegisterPopup extends Popup {
  private readonly form: RegisterForm;

  private readonly titleEl: HTMLElement;

  constructor(title: string) {
    super(['register-popup'], 'register-popup__container');

    this.titleEl = createElement('h3', ['register-popup__title']);
    this.form = new RegisterForm(['register-popup__form'], this);

    this.render(title);
  }

  private render(title: string): void {
    this.titleEl.textContent = title;

    FIELDS.forEach((field) => this.form.addField(field));
    BUTTONS.forEach((btn) => this.form.addButton(btn));

    this.containerEl.append(this.titleEl, this.form.el);
  }

  protected attachListeners(): void {
    header.registerBtn.el.addEventListener('click', () => this.showPopup());
    this.el.addEventListener('click', (e) => this.checkClickIsOutside(e));
  }
}
