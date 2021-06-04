import './logo.scss';
import BaseComponent from '../base/base-component';
import createElement from '../../shared/create-element';

export default class Logo extends BaseComponent {
  constructor() {
    super('div', ['logo', 'header__logo']);

    const span1 = createElement('span', ['logo__text']);
    const span2 = createElement('span', [
      'logo__text',
      'logo__text_highlighted',
    ]);
    span1.innerText = 'match';
    span2.innerText = 'match';

    this.el.append(span1, span2);
  }
}
