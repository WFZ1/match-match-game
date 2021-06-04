import './nav-item.scss';
import BaseComponent from '../base/base-component';
import INavItem from '../../types/nav-item.type';
import createElement from '../../shared/create-element';

export default class NavItem extends BaseComponent {
  readonly link: HTMLLinkElement;

  constructor(item: INavItem) {
    super('li', ['nav-item']);

    this.link = createElement('a', ['nav-item__link']) as HTMLLinkElement;
    this.link.innerText = item.text;
    this.link.href = item.url;

    // 'icon-star.svg' initially has circled form, other no
    const spanClasses = ['nav-item__img-wrap'];
    if (!/icon-star.svg$/.test(item.image))
      spanClasses.push('nav-item__img-wrap_styled');

    const span = createElement('span', spanClasses) as HTMLSpanElement;
    const image = createElement('img', ['nav-item__img']) as HTMLImageElement;
    image.src = item.image;

    this.link.prepend(span);
    span.append(image);
    this.el.append(this.link);
  }
}
