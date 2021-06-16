import './register-form.scss';
import BaseComponent from '../base/base-component';
import header from '../header/header';
import db from '../base/database/database';
import Field from '../field/field';
import BtnAddPlayer from '../btn-add-player/btn-add-player';
import BtnCancel from '../btn-cancel/btn-cancel';
import createElement from '../../shared/create-element';
import IField from '../../types/field.type';
import playerAvatar from '../player-avatar/player-avatar';
import type RegisterPopup from '../register-popup/register-popup';
import type Btn from '../base/btn/btn';
import { AVATAR_SRC, BTN_CLASS, FIELD_VALID_CLASS } from './constants';

export default class RegisterForm extends BaseComponent {
  private readonly fields: Field[] = [];

  private readonly btns: Btn[] = [];

  private readonly avatarEl: HTMLElement;

  private readonly imageEl: HTMLImageElement;

  private readonly imgUploaderEl: HTMLInputElement;

  constructor(classes: string[], private readonly popup: RegisterPopup) {
    super('form', ['register-form', ...classes]);

    this.avatarEl = createElement('div', ['register-form__avatar']);
    this.imageEl = createElement('img', [
      'register-form__img',
    ]) as HTMLImageElement;
    this.imgUploaderEl = createElement('input', [
      'register-form__upload-img',
    ]) as HTMLInputElement;

    this.render();
    this.attachListeners();
  }

  private render(): void {
    this.el.setAttribute('novalidate', '');
    this.imageEl.setAttribute('src', AVATAR_SRC);

    this.imgUploaderEl.setAttribute('type', 'file');
    this.imgUploaderEl.setAttribute('name', 'upload');

    this.el.append(this.avatarEl);
    this.avatarEl.append(this.imageEl, this.imgUploaderEl);
  }

  private attachListeners(): void {
    this.imgUploaderEl.addEventListener('change', () => this.changeAvatar());
  }

  private changeAvatar(): void {
    const file = (this.imgUploaderEl as { files: FileList }).files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result) {
          this.imageEl.setAttribute('src', reader.result.toString());
        }
      };

      reader.readAsDataURL(file);
    }
  }

  addField(fieldProps: IField): void {
    fieldProps.classes = ['register-form__field'];
    const field = new Field(fieldProps);

    this.fields.push(field);
    this.el.append(field.el);
  }

  addButton({ type, text }: { [key: string]: string }): void {
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

  private clearFields(): void {
    this.fields.forEach((field) =>
      field.el.classList.remove(FIELD_VALID_CLASS),
    );
  }

  private checkValidation(): boolean {
    return this.fields.every((field) =>
      field.el.matches(`.${FIELD_VALID_CLASS}`),
    );
  }

  addPlayer(e: Event): void {
    e.preventDefault();

    const isValid = this.checkValidation();
    if (!isValid) return;

    const data: { [key: string]: string } = {};
    this.fields.forEach((field) => {
      data[field.input.name] = field.input.value;
    });

    const player = {
      fullName: `${data['first-name']} ${data['last-name']}`,
      email: data.email,
      avatar: this.imageEl.src,
    };

    db.addData('players', player);

    this.popup.hidePopup();

    header.renderPlayerPart();
    playerAvatar.setImage(this.imageEl.src);
  }
}
