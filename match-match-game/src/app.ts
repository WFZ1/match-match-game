import router from './components/base/router';
import header from './components/header/header';
import PageAbout from './components/page-about/page-about';
import game from './components/game/game';
import createElement from './shared/create-element';
import PageBestScore from './components/page-best-score/page-best-score';

export default class App {
  private readonly header;

  readonly main;

  private readonly pageAbout;

  private readonly pageBestScore;

  constructor(private readonly rootEl: HTMLElement) {
    this.header = header;
    this.main = createElement('main', ['main']);

    this.render();

    this.pageAbout = new PageAbout(this.main);
    this.pageBestScore = new PageBestScore(this.main);
  }

  render(): void {
    this.rootEl.append(this.header.el, this.main);
  }

  clearMainArea(): void {
    this.main.innerHTML = '';
  }

  addRoutes(): void {
    router
      .add('', () => {
        this.clearMainArea();
        this.pageAbout.render();
        this.header.nav.navItems[0].el.classList.add('nav-item_active');

        // In the case if come after click to the stop button
        header.nav.navItems.forEach((navItem) =>
          navItem.el.classList.remove('nav-item_disabled'),
        );
      })
      .add('game', () => {
        this.clearMainArea();
        this.main.append(game.el);
        this.header.nav.navItems.forEach((navItem) => {
          navItem.el.classList.remove('nav-item_active');
          navItem.el.classList.add('nav-item_disabled');
        });
      })
      .add('score', () => {
        this.clearMainArea();
        this.pageBestScore.render();
        this.header.nav.navItems[1].el.classList.add('nav-item_active');

        // In the case if come after click to the ok button
        header.nav.navItems.forEach((navItem) =>
          navItem.el.classList.remove('nav-item_disabled'),
        );
      })
      .add('settings', () => {
        this.main.innerText = 'Welcome in game settings page!';
        this.header.nav.navItems[2].el.classList.add('nav-item_active');
      });
  }
}
