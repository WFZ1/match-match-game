import './drop-down-list.scss';
import BaseComponent from '../base-component';
import createElement from '../../../shared/create-element';
import IDropDownListItem from '../../../types/drop-down-list-item.type';

export default class DropDownList extends BaseComponent {
  opts: HTMLElement[] = [];

  constructor(classes: string[], id: string, opts: IDropDownListItem[]) {
    super('select', ['drop-down-list', ...classes]);
    this.render(id, opts);
  }

  private render(id: string, opts: IDropDownListItem[]): void {
    this.el.id = id;

    opts.forEach((obj) => {
      const opt = createElement('option', [
        'drop-down-list__item',
      ]) as HTMLOptionElement;
      opt.value = obj.value.toLowerCase();
      opt.textContent = obj.value;
      if (obj.selected) opt.selected = true;
      if (obj.disabled) opt.disabled = true;

      this.opts.push(opt);
      this.el.append(opt);
    });
  }
}
