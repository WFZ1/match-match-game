export default function createElement(
  tag: keyof HTMLElementTagNameMap = 'div',
  styles: string[] = [],
): HTMLElement {
  const elem = document.createElement(tag);
  elem.classList.add(...styles);
  return elem;
}
