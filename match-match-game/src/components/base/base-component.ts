export default class BaseComponent {
  readonly el: HTMLElement;

  constructor(tag: keyof HTMLElementTagNameMap = 'div', styles: string[] = []) {
    this.el = document.createElement(tag);
    this.el.classList.add(...styles);
  }
}
