import './link.scss';
import BaseComponent from '../base-component';

export default class Link extends BaseComponent {
  constructor(classes: string[], href: string, text: string) {
    super('a', ['link', ...classes]);

    this.render(href, text);
  }

  private render(href: string, text: string): void {
    this.el.setAttribute('href', href);
    this.el.textContent = text;
  }

  attachHandler(func: (e: Event) => void): void {
    this.el.addEventListener('click', func);
  }
}
