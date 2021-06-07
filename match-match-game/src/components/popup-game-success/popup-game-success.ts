import './popup-game-success.scss';
import Popup from '../base/popup/popup';
import createElement from '../../shared/create-element';
import Link from '../base/link/link';
import Router from '../base/router';
import header from '../header/header';

export default class PopupGameSuccess extends Popup {
  private readonly router: Router;

  private readonly paragraph: HTMLElement;

  private readonly link: Link;

  constructor() {
    super(['popup-game-success'], 'popup-game-success__container');
    this.paragraph = createElement('p', ['popup-game-success__text']);
    this.link = new Link(['popup-game-success__link', 'btn'], 'score', 'ok');

    this.router = new Router({});
    this.render();
  }

  render() {
    this.link.attachHandler((e) => this.handleLink(e));
    this.container.append(this.paragraph, this.link.el);
  }

  handleLink (e: Event) {
    e.preventDefault();
    this.router.navigate('score');
    this.hidePopup();
    header.btnToggleGame.toggleGame();
  }

  changeParagraphText (text: string) {
    this.paragraph.textContent = text;
  }

  attachListeners() {}
}
