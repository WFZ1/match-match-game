import './nav.scss';
import BaseComponent from '../base/base-component';
import NavItem from '../nav-item/nav-item';
import router from '../base/router';
import createElement from '../../shared/create-element';
import { NAV_ITEMS } from './constants';
import { NAV_ITEM_ACTIVE_CLASS } from '../../constants';

export default class Nav extends BaseComponent {
  private readonly listEl: HTMLElement;

  readonly navItems: NavItem[] = [];

  constructor() {
    super('nav', ['nav', 'header__nav']);

    this.listEl = createElement('ul', ['nav__list']);

    this.render();
    this.addItems();
  }

  private render(): void {
    this.el.append(this.listEl);
  }

  private addItems(): void {
    NAV_ITEMS.forEach((item) => {
      item.image = `assets/icons/${item.image}`;

      const navItem = new NavItem(item);
      this.navItems.push(navItem);
      this.listEl.append(navItem.el);

      navItem.el.addEventListener('click', (e) =>
        this.changeRoute(e, item.url),
      );
    });
  }

  changeRoute(e: Event, url: string): void {
    e.preventDefault();

    this.navItems.forEach((item) =>
      item.el.classList.remove(NAV_ITEM_ACTIVE_CLASS),
    );

    router.navigate(url);
  }
}
