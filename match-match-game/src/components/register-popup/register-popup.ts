import './register-popup.scss';
import BaseComponent from '../base/base-component';
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

const HIDDEN_CLASS = 'register-popup_hidden';

export default class RegisterPopup extends BaseComponent {
  private readonly container: HTMLDivElement;

  private readonly form: RegisterForm;

  private readonly title: HTMLHeadingElement;

  private readonly btn: HTMLButtonElement | null;

  constructor(title: string, btnSelector: string) {
    super('div', ['register-popup', HIDDEN_CLASS]);
    this.container = createElement('div', [
      'register-popup__container',
    ]) as HTMLDivElement;
    this.form = new RegisterForm(['register-popup__form'], this);
    this.title = RegisterPopup.addTitle(title);
    this.btn = document.querySelector(btnSelector);
  }

  static addTitle(text: string): HTMLHeadingElement {
    const title = createElement('h3', [
      'register-popup__title',
    ]) as HTMLHeadingElement;
    title.innerText = text;
    return title;
  }

  private attachListeners() {
    this.btn?.addEventListener('click', () => this.showPopup());
    this.el.addEventListener('click', (e) => this.checkClickIsOutside(e));
  }

  private showPopup() {
    this.el.classList.remove(HIDDEN_CLASS);
  }

  private checkClickIsOutside(e: Event) {
    if (e.target === this.el) this.hidePopup();
  }

  hidePopup(): void {
    this.el.classList.add(HIDDEN_CLASS);
  }

  render(): void {
    FIELDS.forEach((field) =>
      this.form.addField(field.label, field.type, field.name),
    );

    this.form.addButton('submit', 'add user');
    this.form.addButton('reset', 'cancel');

    this.form.render();

    this.container.append(this.title, this.form.el);
    this.el.append(this.container);

    this.attachListeners();
  }
}
