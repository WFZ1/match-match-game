import './page-about.scss';
import Steps from '../steps/steps';
import IStep from '../../types/step.type';
import { STEPS_TITLE, STEPS } from './constants';

export default class PageAbout {
  private readonly steps: Steps;

  constructor(private readonly rootEl: HTMLElement) {
    this.steps = new Steps(STEPS_TITLE);

    this.render();
  }

  private render(): void {
    STEPS.forEach((step: IStep) => {
      step.image = `./assets/images/steps/${step.image}`;
      this.steps.addStep(step);
    });
  }

  build(): void {
    document.body.className = 'page-about';
    this.rootEl.append(this.steps.el);
  }
}
