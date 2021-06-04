import './nav.scss';
import BaseComponent from '../base/base-component';
import NavItem from '../nav-item/nav-item';
import INavItem from '../../types/nav-item.type';
import Router from '../base/router';
import createElement from '../../shared/create-element';

export default class Nav extends BaseComponent {
  private readonly list;

  private readonly router: Router;

  constructor() {
    super('nav', ['nav', 'header__nav']);

    this.router = new Router({});

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

      navItem.el.addEventListener('click', (e) => {
        e.preventDefault();
        this.changeRoute(navItem);
      });
    });
  }

  changeRoute(navItem: NavItem): void {
    for (let i = 0; i < this.list.children.length; i++) {
      this.list.children[i].classList.remove('nav-item_active');
    }

    const url = navItem.link.href;
    const index = url.lastIndexOf('/') + 1; // index of begin the page name
    const pageName = url.slice(index);

    this.router.navigate(pageName);
  }
}
