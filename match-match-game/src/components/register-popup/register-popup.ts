import './register-popup.scss';
import BaseComponent from '../base-component';
import RegisterForm from '../register-form/register-form';

const FIELDS = [
  {
    label: 'First Name',
    type: 'text',
  },
  {
    label: 'Last Name',
    type: 'text',
  },
  {
    label: 'E-mail',
    type: 'email',
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
    this.container = BaseComponent.createElement('div', [
      'register-popup__container',
    ]) as HTMLDivElement;
    this.form = new RegisterForm(['register-popup__form']);
    this.title = RegisterPopup.addTitle(title);
    this.btn = document.querySelector(btnSelector);
  }

  static addTitle(text: string): HTMLHeadingElement {
    const title = BaseComponent.createElement('h3', [
      'register-popup__title',
    ]) as HTMLHeadingElement;
    title.innerText = text;
    return title;
  }

  private attachListeners() {
    this.btn?.addEventListener('click', () => this.showPopup());
    this.el.addEventListener('click', (e) => this.hidePopup(e));
  }

  private showPopup() {
    this.el.classList.remove(HIDDEN_CLASS);
  }

  private hidePopup(e: Event) {
    if (e.target === this.el) {
      this.el.classList.add(HIDDEN_CLASS);
    }
  }

  render(): void {
    FIELDS.forEach((field) => this.form.addField(field.label, field.type));

    this.form.addButton('submit', 'add user');
    this.form.addButton('reset', 'cancel');

    this.form.render();

    this.container.append(this.title, this.form.el);
    this.el.append(this.container);

    this.attachListeners();
  }
}
