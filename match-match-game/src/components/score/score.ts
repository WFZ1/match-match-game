import './score.scss';
import BaseComponent from '../base/base-component';
import createElement from '../../shared/create-element';

const TITLE = 'Score:';

export default class Score extends BaseComponent {
  private readonly title: HTMLElement;

  private readonly number: HTMLElement;

  constructor(classes: string[], score = 0) {
    super('div', ['score', ...classes]);

    this.title = createElement('span', ['score__title']);
    this.number = createElement('span', ['score__number']);

    this.render(score);
  }

  render(score: number): void {
    this.title.textContent = TITLE;
    this.number.textContent = String(score);
    this.el.append(this.title, this.number);
  }
}
