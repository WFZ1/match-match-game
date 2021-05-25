import Game from './components/game/game';
import { ImageCategoryModel } from './models/image-category-model';

export default class App {
  private readonly game: Game;

  constructor(private readonly rootEl: HTMLElement) {
    this.game = new Game();
    this.rootEl.append(this.game.el);
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
