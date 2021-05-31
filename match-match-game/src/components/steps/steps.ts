import './steps.scss';
import BaseComponent from '../base-component';
import Step from '../step/step';

export default class Steps extends BaseComponent {
  private counter = 1;

  private readonly steps: Step[] = [];

  constructor() {
    super('section', ['steps', 'main__steps']);
  }

  render(title: string): void {
    const h2 = BaseComponent.createElement('h2', ['steps__title']);
    h2.innerText = title;

    const container = BaseComponent.createElement('div', ['steps__container']);
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
