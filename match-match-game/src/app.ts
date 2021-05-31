import BaseComponent from './components/base-component';
import Router from './components/router/router';
import Header from './components/header/header';
import Game from './components/game/game';
import ImageCategoryModel from './models/image-category-model';
import PageAbout from './components/page-about/page-about';

export default class App extends BaseComponent {
  private readonly router;

  private readonly header;

  private readonly main;

  private readonly pageAbout;

  private readonly game: Game;

  constructor(private readonly rootEl: HTMLElement) {
    super();

    this.header = new Header();
    this.main = BaseComponent.createElement('main', ['main']);

    this.rootEl.append(this.header.el);
    this.rootEl.append(this.main);

    this.router = new Router({
      mode: 'history',
      root: '/',
    });

    this.addRoutes();

    this.game = new Game();

    // this.main.append(this.game.el);

    this.pageAbout = new PageAbout(this.main);
  }

  addRoutes(): void {
    this.router
      .add('', () => {
        this.main.innerHTML = '';
        this.pageAbout.render();
        this.header.el
          .querySelectorAll('.nav-item')[0]
          .classList.add('nav-item_active');
      })
      .add('score', () => {
        this.main.innerText = 'Welcome in best score page!';
        this.header.el
          .querySelectorAll('.nav-item')[1]
          .classList.add('nav-item_active');
      })
      .add('settings', () => {
        this.main.innerText = 'Welcome in game settings page!';
        this.header.el
          .querySelectorAll('.nav-item')[2]
          .classList.add('nav-item_active');
      });
  }

  async start(): Promise<void> {
    // Get images list from 'images.json' file

    const data = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await data.json();

    // Choose category images. For this moment it is 'Animals'

    const cat = categories[0];
    const images = cat.images.map(
      (name) => `assets/images/${cat.category}/${name}`,
    );

    this.game.start(images);
  }
}
