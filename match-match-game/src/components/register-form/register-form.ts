import './register-form.scss';
import BaseComponent from '../base-component';
import BtnAddUser from '../btn-add-user/btn-add-user';
import BtnCancel from '../btn-cancel/btn-cancel';
import Btn from '../btn/btn';
import Field from '../field/field';

const FIELD_CLASS = 'register-form__field';
const AVATAR = './assets/images/player/avatar.png';

export default class RegisterForm extends BaseComponent {
  private readonly fields: Field[] = [];

  private readonly btns: Btn[] = [];

  private avatar: HTMLImageElement;

  constructor(classes: string[]) {
    super('form', ['register-form', ...classes]);
    this.avatar = RegisterForm.addAvatar(AVATAR);
  }

  addField(label: string, type: string): void {
    const field = new Field(label, type, [FIELD_CLASS]);
    field.render();
    this.fields.push(field);
  }

  addButton(type: string, text: string): void {
    let btn;

    if (type === 'submit') {
      btn = new BtnAddUser(
        ['register-form__btn', 'register-form__add-user'],
        text,
      );
      btn.attachHandler(RegisterForm.addPlayer);
    } else {
      btn = new BtnCancel(
        ['register-form__btn', 'register-form__cancel'],
        text,
      );
      btn.attachHandler(RegisterForm.clearFields);
    }

    this.btns.push(btn);
  }

  static addAvatar(image: string): HTMLImageElement {
    const avatar = BaseComponent.createElement('img', [
      'register-form__img',
    ]) as HTMLImageElement;
    avatar.src = image;
    return avatar;
  }

  changeAvatar(image: string): void {
    this.avatar.src = image;
  }

  static clearFields(e: Event): void {
    const btn = e.currentTarget as HTMLElement | null;
    const form = btn?.parentElement;
    const fields = form?.querySelectorAll('.field');

    fields?.forEach((el) => {
      el.classList.remove('field__valid');
    });
  }

  static addPlayer(): void {}

  render(): void {
    this.fields.forEach((field) => this.el.append(field.el));
    this.el.append(this.avatar);
    this.btns.forEach((btn) => this.el.append(btn.el));
  }
}
