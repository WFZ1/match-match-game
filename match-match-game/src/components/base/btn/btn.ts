import './btn.scss';
import BaseComponent from '../base-component';

export default class Btn extends BaseComponent {
  constructor(classes: string[], text: string, type = 'button') {
    super('button', ['btn', ...classes]);
    this.el.textContent = text;
    this.el.setAttribute('type', type);
  }

  attachHandler(func: (e: Event) => void): void {
    this.el.addEventListener('click', func);
  }
}
