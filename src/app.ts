import router from './components/base/router';
import header from './components/header/header';
import RegisterPopup from './components/register-popup/register-popup';
import PageAbout from './components/page-about/page-about';
import PageBestScore from './components/page-best-score/page-best-score';
import PageSettings from './components/page-settings/page-settings';
import game from './components/game/game';
import createElement from './shared/create-element';
import {
  NAV_ITEM_ACTIVE_CLASS,
  NAV_ITEM_DISABLED_CLASS,
  REGISTER_POPUP_TITLE,
} from './constants';

export default class App {
  private readonly registerPopup: RegisterPopup;

  private readonly mainEl: HTMLElement;

  private readonly pageAbout: PageAbout;

  private readonly pageBestScore: PageBestScore;

  private readonly pageSettings: PageSettings;

  constructor(private readonly rootEl: HTMLElement) {
    this.registerPopup = new RegisterPopup(REGISTER_POPUP_TITLE);
    this.mainEl = createElement('main', ['main']);

    this.pageAbout = new PageAbout(this.mainEl);
    this.pageBestScore = new PageBestScore(this.mainEl);
    this.pageSettings = new PageSettings(this.mainEl);

    this.render();
  }

  private render(): void {
    this.rootEl.append(header.el, this.mainEl, this.registerPopup.el);
  }

  private clearMainEl(): void {
    this.mainEl.innerHTML = '';
  }

  private static highlightNavItem(index: number): void {
    header.nav.navItems[index].el.classList.add(NAV_ITEM_ACTIVE_CLASS);
  }

  private static unlockNavItems(): void {
    header.nav.navItems.forEach((navItem) =>
      navItem.el.classList.remove(NAV_ITEM_DISABLED_CLASS),
    );
  }

  addRoutes(): void {
    router
      .add('', () => {
        this.clearMainEl();
        this.pageAbout.build();
        App.highlightNavItem(0);

        // In the case if come after click to the stop game button
        App.unlockNavItems();
      })
      .add('game', () => {
        this.clearMainEl();
        this.mainEl.append(game.el);

        header.nav.navItems.forEach((navItem) => {
          navItem.el.classList.remove(NAV_ITEM_ACTIVE_CLASS);
          navItem.el.classList.add(NAV_ITEM_DISABLED_CLASS);
        });
      })
      .add('score', () => {
        this.clearMainEl();
        this.pageBestScore.build();
        App.highlightNavItem(1);

        // In the case if come after click to the ok button when game end
        App.unlockNavItems();
      })
      .add('settings', () => {
        this.clearMainEl();
        this.pageSettings.build();
        App.highlightNavItem(2);
      });
  }
}
