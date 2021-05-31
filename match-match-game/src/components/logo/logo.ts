import './logo.scss';
import BaseComponent from '../base-component';

export default class Logo extends BaseComponent {
  constructor() {
    super('div', ['logo', 'header__logo']);

    const span1 = BaseComponent.createElement('span', ['logo__text']);
    const span2 = BaseComponent.createElement('span', [
      'logo__text',
      'logo__text_highlighted',
    ]);
    span1.innerText = 'match';
    span2.innerText = 'match';

    this.el.append(span1, span2);
  }
}
