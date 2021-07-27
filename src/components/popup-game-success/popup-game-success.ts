import './popup-game-success.scss';
import Popup from '../base/popup/popup';
import Link from '../base/link/link';
import createElement from '../../shared/create-element';
import { POPUP_LINK } from './constants';

export default class PopupGameSuccess extends Popup {
  private readonly paragraphEl: HTMLElement;

  private readonly link: Link;

  constructor() {
    super(['popup-game-success'], 'popup-game-success__container');

    this.paragraphEl = createElement('p', ['popup-game-success__text']);
    this.link = new Link(
      ['popup-game-success__link', 'btn'],
      POPUP_LINK.url,
      POPUP_LINK.text,
    );

    this.render();
  }

  // Disable default behaviour
  protected static attachListeners(): void {}

  private render(): void {
    this.containerEl.append(this.paragraphEl, this.link.el);
  }

  changeParagraphText(text: string): void {
    this.paragraphEl.textContent = text;
  }

  attachHandler(func: (e: Event) => void): void {
    this.link.attachHandler((e) => func(e));
  }
}
