export default class BaseComponent {
  readonly el: HTMLElement;

  constructor(tag: keyof HTMLElementTagNameMap = 'div', styles: string[] = []) {
    this.el = document.createElement(tag);
    this.el.classList.add(...styles);
  }

  static createElement(
    tag: keyof HTMLElementTagNameMap = 'div',
    styles: string[] = [],
  ): HTMLElement {
    const elem = document.createElement(tag);
    elem.classList.add(...styles);
    return elem;
  }
}
