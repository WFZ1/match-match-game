import './score.scss';
import BaseComponent from '../base/base-component';
import createElement from '../../shared/create-element';
import { TITLE } from './constants';

export default class Score extends BaseComponent {
  private readonly titleEl: HTMLElement;

  private readonly numberEl: HTMLElement;

  constructor(classes: string[], score = 0) {
    super('div', ['score', ...classes]);

    this.titleEl = createElement('span', ['score__title']);
    this.numberEl = createElement('span', ['score__number']);

    this.render(score);
  }

  private render(score: number): void {
    this.titleEl.textContent = TITLE;
    this.numberEl.textContent = String(score);

    this.el.append(this.titleEl, this.numberEl);
  }
}
