import './nav.scss';
import BaseComponent from '../base-component';
import NavItem from '../nav-item/nav-item';
import NavItemModel from '../../models/nav-item-model';
import Router from '../router/router';

export default class Nav extends BaseComponent {
  private readonly list;

  private readonly router: Router;

  constructor() {
    super('nav', ['nav', 'header__nav']);

    this.router = new Router({});

    this.list = BaseComponent.createElement('ul', ['nav__list']);
    this.el.append(this.list);

    this.getItemsList();
  }

  // Get nav items list from 'nav-items.json' file
  async getItemsList (): Promise<void> {
    const data = await fetch('./nav-items.json');
    const listNavItems: NavItemModel[] = await data.json();

    this.addItems(listNavItems);
  }

  addItems (listNavItems: NavItemModel[]): void {
    listNavItems.forEach((item) => {
      item.image = `assets/icons/${ item.image }`;  // set path to image

      const navItem = new NavItem(item);
      this.list.append(navItem.el);

      navItem.el.addEventListener('click', (e) => {
        e.preventDefault();
        this.changeRoute(navItem);
      });
    });
  }

  changeRoute(navItem: NavItem) {
    const url = navItem.link.href;
    const index = url.lastIndexOf('/') + 1; // index of begin the page name
    const pageName = url.slice(index);

    this.router.navigate(pageName);
  }
}
