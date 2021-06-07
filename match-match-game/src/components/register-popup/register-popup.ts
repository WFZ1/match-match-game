import './register-popup.scss';
import Popup from '../base/popup/popup';
import RegisterForm from '../register-form/register-form';
import createElement from '../../shared/create-element';

const FIELDS = [
  {
    label: 'First Name',
    type: 'text',
    name: 'first-name',
  },
  {
    label: 'Last Name',
    type: 'text',
    name: 'last-name',
  },
  {
    label: 'E-mail',
    type: 'email',
    name: 'email',
  },
];

export default class RegisterPopup extends Popup {
  private readonly form: RegisterForm;

  private readonly title: HTMLHeadingElement;

  private readonly btn: HTMLButtonElement | null;

  constructor(title: string, btnSelector: string) {
    super(['register-popup'], 'register-popup__container');
    this.form = new RegisterForm(['register-popup__form'], this);
    this.title = RegisterPopup.addTitle(title);
    this.btn = document.querySelector(btnSelector);
  }

  static addTitle(text: string): HTMLHeadingElement {
    const title = createElement('h3', [
      'register-popup__title',
    ]) as HTMLHeadingElement;
    title.textContent = text;
    return title;
  }

  protected attachListeners(): void {
    this.btn?.addEventListener('click', () => this.showPopup());
    this.el.addEventListener('click', (e) => this.checkClickIsOutside(e));
  }

  render(): void {
    FIELDS.forEach((field) =>
      this.form.addField(field.label, field.type, field.name),
    );

    this.form.addButton('submit', 'add user');
    this.form.addButton('reset', 'cancel');

    this.form.render();

    this.el.append(this.container);
    this.container.append(this.title, this.form.el);

    this.attachListeners();
  }
}
