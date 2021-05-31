import './nav-item.scss';
import BaseComponent from '../base-component';
import NavItemModel from '../../models/nav-item-model';

export default class NavItem extends BaseComponent {
  readonly link: HTMLLinkElement;

  constructor(item: NavItemModel) {
    super('li', ['nav-item']);

    this.link = BaseComponent.createElement('a', [
      'nav-item__link',
    ]) as HTMLLinkElement;
    this.link.innerText = item.text;
    this.link.href = item.url;

    // 'icon-star.svg' initially has circled form, other no
    const spanClasses = ['nav-item__img-wrap'];
    if (!/icon-star.svg$/.test(item.image))
      spanClasses.push('nav-item__img-wrap_styled');

    const span = BaseComponent.createElement(
      'span',
      spanClasses,
    ) as HTMLSpanElement;
    const image = BaseComponent.createElement('img', [
      'nav-item__img',
    ]) as HTMLImageElement;
    image.src = item.image;

    this.link.prepend(span);
    span.append(image);
    this.el.append(this.link);
  }
}
