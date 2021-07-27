import './steps.scss';
import BaseComponent from '../base/base-component';
import Step from '../step/step';
import IStep from '../../types/step.type';
import createElement from '../../shared/create-element';

export default class Steps extends BaseComponent {
  private counter = 1;

  private readonly steps: Step[] = [];

  private readonly titleEl: HTMLElement;

  private readonly containerEl: HTMLElement;

  constructor(title: string) {
    super('section', ['steps']);

    this.titleEl = createElement('h2', ['steps__title']);
    this.containerEl = createElement('div', ['steps__container']);

    this.render(title);
  }

  private render(title: string): void {
    this.titleEl.textContent = title;

    this.el.append(this.titleEl, this.containerEl);
  }

  addStep({ text, image }: IStep): void {
    const stepProps = {
      classes: ['steps__step'],
      id: this.counter,
      text,
      image,
    };

    const step = new Step(stepProps);
    this.steps.push(step);
    this.containerEl.append(step.el);

    this.counter++;
  }
}
