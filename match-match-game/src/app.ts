import Router from './components/base/router';
import header from './components/header/header';
import PageAbout from './components/page-about/page-about';
import game from './components/game/game';
import createElement from './shared/create-element';

const ROOT = document.body;

export class App {
  private readonly header;

  readonly main;

  private readonly pageAbout;

  private readonly router;

  constructor(private readonly rootEl: HTMLElement) {
    this.header = header;
    this.main = createElement('main', ['main']);

    this.render();

    this.pageAbout = new PageAbout(this.main);

    this.router = new Router({
      mode: 'history',
      root: '/',
    });

    this.addRoutes();
  }

  render(): void {
    this.rootEl.append(this.header.el, this.main);
  }

  clearMainArea (): void {
    this.main.innerHTML = '';
  }

  addRoutes(): void {
    this.router
      .add('', () => {
        this.clearMainArea();
        this.pageAbout.render();
        this.header.nav.navItems[0].el.classList.add('nav-item_active');
      })
      .add('game', () => {
        this.clearMainArea();
        app.main.append(game.el);
        this.header.nav.navItems.forEach((navItem) => navItem.el.classList.remove('nav-item_active'));
      })
      .add('score', () => {
        this.main.innerText = 'Welcome in best score page!';
        this.header.nav.navItems[1].el.classList.add('nav-item_active');
      })
      .add('settings', () => {
        this.main.innerText = 'Welcome in game settings page!';
        this.header.nav.navItems[2].el.classList.add('nav-item_active');
      });
  }
}

const app = new App(ROOT);
export default app;
