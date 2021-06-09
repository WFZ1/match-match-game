import './game-parameter.scss';
import BaseComponent from '../base/base-component';
import createElement from '../../shared/create-element';
import DropDownList from '../base/drop-down-list/drop-down-list';
import IDropDownListItem from '../../types/drop-down-list-item.type';

export default class GameParameter extends BaseComponent{
  readonly title;

  readonly field;

  constructor(classes: string[], title: string, listParams: IDropDownListItem[]) {
    super('div', ['game-parameter', ...classes]);
    this.title = createElement('label', ['game-parameter__title']);
    this.field = new DropDownList(['game-parameter__list'], listParams);

    this.render(title);
  }

  render (title: string): void {
    this.title.textContent = title;
    this.el.append(this.title, this.field.el);
  }

}
