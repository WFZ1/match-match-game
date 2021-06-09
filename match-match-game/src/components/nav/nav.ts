import './nav.scss';
import BaseComponent from '../base/base-component';
import NavItem from '../nav-item/nav-item';
import INavItem from '../../types/nav-item.type';
import router from '../base/router';
import createElement from '../../shared/create-element';

export default class Nav extends BaseComponent {
  private readonly list;

  readonly navItems: NavItem[] = [];

  constructor() {
    super('nav', ['nav', 'header__nav']);

    this.list = createElement('ul', ['nav__list']);
    this.el.append(this.list);

    this.getItemsList();
  }

  // Get nav items list from 'nav-items.json' file
  async getItemsList(): Promise<void> {
    const data = await fetch('./nav-items.json');
    const listNavItems: INavItem[] = await data.json();

    this.addItems(listNavItems);
  }

  addItems(listNavItems: INavItem[]): void {
    listNavItems.forEach((item) => {
      item.image = `assets/icons/${item.image}`; // set path to image

      const navItem = new NavItem(item);
      this.list.append(navItem.el);
      this.navItems.push(navItem);

      navItem.el.addEventListener('click', (e) => this.changeRoute(e, navItem));
    });
  }

  changeRoute(e: Event, navItem: NavItem): void {
    e.preventDefault();
    this.navItems.forEach((item) =>
      item.el.classList.remove('nav-item_active'),
    );

    const url = navItem.link.href;
    const index = url.lastIndexOf('/') + 1; // index of begin the page name
    const pageName = url.slice(index);

    router.navigate(pageName);
  }
}
