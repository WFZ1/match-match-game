import './popup.scss';
import BaseComponent from '../base-component';
import createElement from '../../../shared/create-element';

export default class Popup extends BaseComponent {
  readonly container: HTMLElement;

  constructor(
    classes: string[],
    containerClass: string,
    private readonly hiddenClass: string = 'popup_hidden',
  ) {
    super('div', ['popup', ...classes, hiddenClass]);
    this.container = createElement('div', ['popup__container', containerClass]);

    this.build();
    this.attachListeners();
  }

  private build(): void {
    this.el.append(this.container);
  }

  protected attachListeners(): void {
    this.el.addEventListener('click', (e) => this.checkClickIsOutside(e));
  }

  showPopup(): void {
    this.el.classList.remove(this.hiddenClass);
  }

  hidePopup(): void {
    this.el.classList.add(this.hiddenClass);
  }

  protected checkClickIsOutside(e: Event): void {
    if (e.target === this.el) this.hidePopup();
  }
}
