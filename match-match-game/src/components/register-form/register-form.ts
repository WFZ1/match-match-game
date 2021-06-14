import './register-form.scss';
import BaseComponent from '../base/base-component';
import type RegisterPopup from '../register-popup/register-popup';
import Field from '../field/field';
import type Btn from '../base/btn/btn';
import BtnAddPlayer from '../btn-add-player/btn-add-player';
import BtnCancel from '../btn-cancel/btn-cancel';
import header from '../header/header';
import db from '../base/database';
import createElement from '../../shared/create-element';
import IField from '../../types/field.type';

const FIELD_VALID_CLASS = 'field__valid';
const BTN_CLASS = 'register-form__btn';

const AVATAR_SRC = './assets/images/player/avatar.png';

export default class RegisterForm extends BaseComponent {
  private readonly fields: Field[] = [];

  private readonly btns: Btn[] = [];

  private avatar: HTMLImageElement;

  constructor(classes: string[], private popup: RegisterPopup) {
    super('form', ['register-form', ...classes]);
    this.avatar = createElement('img', ['register-form__img']) as HTMLImageElement;
    this.render(AVATAR_SRC);
  }

  private render(avatar: string): void {
    this.el.setAttribute('novalidate', '');
    this.avatar.src = avatar;
    this.el.append(this.avatar);
  }

  changeAvatar(avatar: string): void {
    this.avatar.src = avatar;
  }

  addField(fieldProps: IField): void {
    fieldProps.classes = ['register-form__field'];
    const field = new Field(fieldProps);

    this.fields.push(field);
    this.el.append(field.el);
  }

  addButton(type: string, text: string): void {
    let btn;

    if (type === 'submit') {
      btn = new BtnAddPlayer([BTN_CLASS, 'register-form__add-player'], text);
      btn.attachHandler((e) => this.addPlayer.call(this, e));
    } else {
      btn = new BtnCancel([BTN_CLASS, 'register-form__cancel'], text);
      btn.attachHandler(() => this.clearFields.call(this));
    }

    this.btns.push(btn);
    this.el.append(btn.el);
  }

  clearFields(): void {
    this.fields.forEach((field) =>
      field.el.classList.remove(FIELD_VALID_CLASS),
    );
  }

  checkValidation(): boolean {
    return this.fields.every((field) => field.el.matches(`.${FIELD_VALID_CLASS}`));
  }

  addPlayer(e: Event): void {
    e.preventDefault();

    const isValid = this.checkValidation();
    if (!isValid) return;

    const data: { [key: string]: string } = {};
    this.fields.forEach((field) => {
      data[field.input.name] = field.input.value
    });

    const player = {
      fullName: `${data['first-name']} ${data['last-name']}`,
      email: data.email,
    };

    db.addData('players', player);

    this.popup.hidePopup();

    header.renderPlayerPart();
    header.playerAvatar.setPhoto(AVATAR_SRC);
  }
}
