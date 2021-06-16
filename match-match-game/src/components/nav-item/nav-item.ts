import './nav-item.scss';
import BaseComponent from '../base/base-component';
import INavItem from '../../types/nav-item.type';
import createElement from '../../shared/create-element';

export default class NavItem extends BaseComponent {
  readonly linkEl: HTMLLinkElement;

  private readonly imageWrapperEl: HTMLElement;

  private readonly imageEl: HTMLElement;

  constructor(navItem: INavItem) {
    super('li', ['nav-item']);

    this.linkEl = createElement('a', ['nav-item__link']) as HTMLLinkElement;
    this.imageWrapperEl = createElement('span', ['nav-item__img-wrap']);
    this.imageEl = createElement('img', ['nav-item__img']);

    this.render(navItem);
  }

  private render({ url, text, image }: INavItem): void {
    this.linkEl.textContent = text;
    this.linkEl.setAttribute('href', url);

    // 'icon-star.svg' initially has circled form, other no
    if (!/icon-star.svg$/.test(image)) {
      this.imageWrapperEl.classList.add('nav-item__img-wrap_styled');
    }

    this.imageEl.setAttribute('src', image);

    this.el.append(this.linkEl);
    this.linkEl.prepend(this.imageWrapperEl);
    this.imageWrapperEl.append(this.imageEl);
  }
}
