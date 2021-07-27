import './game-parameter.scss';
import BaseComponent from '../base/base-component';
import DropDownList from '../base/drop-down-list/drop-down-list';
import createElement from '../../shared/create-element';
import IGameParams from '../../types/game-params.type';

export default class GameParameter extends BaseComponent {
  readonly titleEl: HTMLElement;

  readonly field: DropDownList;

  constructor({ classes, title, id, options }: IGameParams) {
    super('div', ['game-parameter', ...(classes as [])]);

    this.titleEl = createElement('label', ['game-parameter__title']);
    this.field = new DropDownList(['game-parameter__list'], id, options);

    this.render(title, id);
  }

  private render(title: string, id: string): void {
    this.titleEl.textContent = title;
    this.titleEl.setAttribute('for', id);

    this.el.append(this.titleEl, this.field.el);
  }
}
