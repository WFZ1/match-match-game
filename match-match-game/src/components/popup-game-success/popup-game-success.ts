import './popup-game-success.scss';
import Popup from '../base/popup/popup';
import createElement from '../../shared/create-element';
import Link from '../base/link/link';
// import router from '../base/router';
// import btnToggleGame from '../btn-toggle-game/btn-toggle-game';

export default class PopupGameSuccess extends Popup {
  private readonly paragraph: HTMLElement;

  private readonly link: Link;

  constructor() {
    super(['popup-game-success'], 'popup-game-success__container');
    this.paragraph = createElement('p', ['popup-game-success__text']);
    this.link = new Link(['popup-game-success__link', 'btn'], 'score', 'ok');

    this.render();
  }

  render(): void {
    this.container.append(this.paragraph, this.link.el);
  }

  changeParagraphText(text: string): void {
    this.paragraph.textContent = text;
  }

  attachHandler(func: (e: Event) => void): void {
    this.link.attachHandler((e) => func(e));
  }
}
