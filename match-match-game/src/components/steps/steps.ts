import './steps.scss';
import BaseComponent from '../base/base-component';
import Step from '../step/step';
import createElement from '../../shared/create-element';

export default class Steps extends BaseComponent {
  private counter = 1;

  private readonly steps: Step[] = [];

  constructor() {
    super('section', ['steps', 'main__steps']);
  }

  render(title: string): void {
    const h2 = createElement('h2', ['steps__title']);
    h2.innerText = title;

    const container = createElement('div', ['steps__container']);
    this.steps.forEach((step) => container.append(step.el));

    this.el.append(h2, container);
  }

  addStep(text: string, image: string): void {
    const step = new Step();
    step.render(this.counter, text, image);

    this.steps.push(step);
    this.counter++;
  }
}
