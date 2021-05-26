export default function getContainEl (target: HTMLElement, selector: string, container: HTMLElement,) {
  const el: HTMLElement | null = target.closest(selector);
  return !el || !container.contains(el) ? 0 : el;
};
