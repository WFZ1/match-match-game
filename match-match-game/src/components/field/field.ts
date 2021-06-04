import './field.scss';
import BaseComponent from '../base-component';

const VALIDATION = {
  onlyNumbs: /^\d+$/,
  onlyServiceSymbols: /[~!@#$%*()_—+=|:;"'`<>,.?/^]/,

  // https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression
  email:
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[x01-x08x0bx0cx0e-x1fx21x23-x5bx5d-x7f]|\\[x01-x09x0bx0cx0e-x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[x01-x08x0bx0cx0e-x1fx21-x5ax53-x7f]|\\[x01-x09x0bx0cx0e-x7f])+)\])/,
};

export default class Field extends BaseComponent {
  private readonly label: string;

  private readonly type: string;

  private readonly name: string;

  constructor(label: string, type: string, name: string, classes: string[]) {
    super('div', ['field', ...classes]);
    this.label = label;
    this.type = type;
    this.name = name;
  }

  attachListeners(): void {
    this.el.addEventListener('input', () => this.validateField());
  }

  validateField(): void {
    const input: HTMLInputElement | null =
      this.el.querySelector('.field__input');
    const val = input?.value;

    if (!val) {
      this.el.classList.remove('field__valid');
      return;
    }

    if (
      this.type === 'text' &&
      !VALIDATION.onlyNumbs.test(val) &&
      !VALIDATION.onlyServiceSymbols.test(val)
    ) {
      this.el.classList.add('field__valid');
    } else if (this.type === 'email' && VALIDATION.email.test(val)) {
      this.el.classList.add('field__valid');
    } else {
      this.el.classList.remove('field__valid');
    }
  }

  private createLabel() {
    const label = BaseComponent.createElement('label', [
      'field__label',
    ]) as HTMLLabelElement;
    label.innerText = this.label;
    return label;
  }

  private createInput() {
    const input = BaseComponent.createElement('input', [
      'field__input',
    ]) as HTMLInputElement;
    input.setAttribute('type', this.type);
    input.setAttribute('name', this.name);
    input.setAttribute('maxlength', '30');
    input.setAttribute('required', 'required');
    return input;
  }

  render(): void {
    const label = this.createLabel();
    const input = this.createInput();
    const checker = BaseComponent.createElement('div', [
      'field__checker',
    ]) as HTMLElement;
    this.attachListeners();

    this.el.append(label, input, checker);
  }
}
