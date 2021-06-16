import './logo.scss';
import BaseComponent from '../base/base-component';
import createElement from '../../shared/create-element';

export default class Logo extends BaseComponent {
  private readonly text1El: HTMLElement;

  private readonly text2El: HTMLElement;

  constructor(content: { [key: string]: string }) {
    super('div', ['logo', 'header__logo']);

    this.text1El = createElement('span', ['logo__text']);
    this.text2El = createElement('span', [
      'logo__text',
      'logo__text_highlighted',
    ]);

    this.render(content);
  }

  private render(content: { [key: string]: string }): void {
    this.text1El.textContent = content.text1;
    this.text2El.textContent = content.text2;

    this.el.append(this.text1El, this.text2El);
  }
}
