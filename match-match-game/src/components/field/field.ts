import './field.scss';
import BaseComponent from '../base/base-component';
import createElement from '../../shared/create-element';
import IField from '../../types/field.type';

export default class Field extends BaseComponent {
  private readonly container: HTMLElement;

  private readonly title: HTMLElement;

  readonly input: HTMLInputElement;

  private readonly checker: HTMLElement;

  private readonly error: HTMLElement;

  constructor(fieldProps: IField) {
    super('div', ['field', ...(fieldProps.classes as []) ]);

    this.container = createElement('label', ['field__container']);
    this.title = createElement('span', ['field__title']);
    this.input = createElement('input', ['field__input']) as HTMLInputElement;
    this.checker = createElement('div', ['field__checker']);
    this.error = createElement('p', ['field__error', 'field__error_hidden']);

    this.render(fieldProps);
    this.attachListeners();
  }

  private render({ title, type, name, pattern, error }: IField): void {
    this.title.textContent = title;
    this.error.textContent = error;

    this.input.setAttribute('type', type);
    this.input.setAttribute('name', name);
    this.input.setAttribute('maxlength', '30');
    this.input.setAttribute('required', 'required');

    const regexStr = pattern.toString();
    const patternStr = regexStr.substring(1, regexStr.length - 1);
    this.input.setAttribute('pattern', patternStr);

    this.el.append(this.container, this.error);
    this.container.append(this.title, this.input, this.checker);
  }

  attachListeners(): void {
    this.el.addEventListener('input', () => this.validateField());
  }

  validateField(): void {
    if (this.input.validity.valid) {
      this.el.classList.remove('field__invalid');
      this.el.classList.add('field__valid');
      this.error.classList.add('field__error_hidden');
    } else {
      this.el.classList.remove('field__valid');
      this.el.classList.add('field__invalid');
      this.error.classList.remove('field__error_hidden');
    }
  }
}
