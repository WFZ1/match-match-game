import BaseComponent from './components/base-component';
import Router from './components/router/router';
import Header from './components/header/header';
import Game from './components/game/game';
import ImageCategoryModel from './models/image-category-model';

export default class App extends BaseComponent {
  private readonly router;

  private readonly header;

  private readonly main;

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
    this.main.append(this.game.el);
  }

  addRoutes() {
    this.router
      .add('', () => {
        const el = BaseComponent.createElement('h2');
        el.innerText = 'Welcome in about page!';
        this.main.prepend(el);
      })
      .add('score', () => {
        this.main.innerText = 'Welcome in best score page!';
      })
      .add('settings', () => {
        this.main.innerText = 'Welcome in game settings page!';
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
