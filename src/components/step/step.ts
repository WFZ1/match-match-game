import './step.scss';
import BaseComponent from '../base/base-component';
import createElement from '../../shared/create-element';
import IStep from '../../types/step.type';

export default class Step extends BaseComponent {
  private readonly infoEl: HTMLElement;

  private readonly idEl: HTMLElement;

  private readonly paragraphEl: HTMLElement;

  private readonly imageEl: HTMLElement;

  constructor(stepProps: IStep) {
    super('div', ['step', ...(stepProps.classes as [])]);

    this.infoEl = createElement('div', ['step__info']);
    this.idEl = createElement('span', ['step__num']);
    this.paragraphEl = createElement('p', ['step__text']);
    this.imageEl = createElement('img', ['step__img']);

    this.render(stepProps);
  }

  private render({ id, text, image }: IStep): void {
    this.idEl.textContent = String(id);
    this.paragraphEl.textContent = text;
    this.imageEl.setAttribute('src', image);

    this.el.append(this.infoEl, this.imageEl);
    this.infoEl.append(this.idEl, this.paragraphEl);
  }
}
