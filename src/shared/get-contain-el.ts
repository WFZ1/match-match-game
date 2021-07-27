export default function getContainEl(
  target: HTMLElement,
  selector: string,
  container: HTMLElement,
): HTMLElement | 0 {
  const el: HTMLElement | null = target.closest(selector);
  return !el || !container.contains(el) ? 0 : el;
}
