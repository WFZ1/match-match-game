import './register-form.scss';
import BaseComponent from '../base/base-component';
import BtnAddUser from '../btn-add-user/btn-add-user';
import BtnCancel from '../btn-cancel/btn-cancel';
import Btn from '../base/btn/btn';
import Field from '../field/field';
import db from '../base/database';
import type RegisterPopup from '../register-popup/register-popup';
import header from '../header/header';
import createElement from '../../shared/create-element';

const FIELD_VALID_CLASS = 'field__valid';
const BTN_CLASS = 'register-form__btn';

const AVATAR_SRC = './assets/images/player/avatar.png';

export default class RegisterForm extends BaseComponent {
  private readonly fields: Field[] = [];

  private readonly btns: Btn[] = [];

  private avatar: HTMLImageElement;

  constructor(classes: string[], private popup: RegisterPopup) {
    super('form', ['register-form', ...classes]);
    this.avatar = RegisterForm.addAvatar(AVATAR_SRC);
  }

  addField(label: string, type: string, name: string): void {
    const field = new Field(label, type, name, ['register-form__field']);
    field.render();
    this.fields.push(field);
  }

  addButton(type: string, text: string): void {
    let btn;

    if (type === 'submit') {
      btn = new BtnAddUser([BTN_CLASS, 'register-form__add-user'], text);
      btn.attachHandler((e) => this.addPlayer.call(this, e));
    } else {
      btn = new BtnCancel([BTN_CLASS, 'register-form__cancel'], text);
      btn.attachHandler(() => this.clearFields.call(this));
    }

    this.btns.push(btn);
  }

  static addAvatar(image: string): HTMLImageElement {
    const avatar = createElement('img', [
      'register-form__img',
    ]) as HTMLImageElement;
    avatar.src = image;
    return avatar;
  }

  changeAvatar(image: string): void {
    this.avatar.src = image;
  }

  clearFields(): void {
    this.fields.forEach((field) =>
      field.el.classList.remove(FIELD_VALID_CLASS),
    );
  }

  checkValidation(): boolean {
    for (let i = 0; i < this.fields.length; i++) {
      if (!this.fields[i].el.matches(`.${FIELD_VALID_CLASS}`)) return false;
    }

    return true;
  }

  addPlayer(e: Event): void {
    e.preventDefault();

    const isValid = this.checkValidation();
    if (!isValid) return;

    const data: { [key: string]: string } = {};

    this.fields.forEach((field) => {
      const input: HTMLInputElement | null =
        field.el.querySelector('.field__input');
      if (input) data[input.name] = input.value;
    });

    const player = {
      fullName: `${data['first-name']} ${data['last-name']}`,
      email: data.email,
    };

    db.addData('players', player);

    this.popup.hidePopup();

    header.renderUserPart();
    header.userAvatar.setPhoto(AVATAR_SRC);
  }

  render(): void {
    this.fields.forEach((field) => this.el.append(field.el));
    this.el.append(this.avatar);
    this.btns.forEach((btn) => this.el.append(btn.el));
  }
}
