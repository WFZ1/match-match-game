import './page-about.scss';
import getData from '../../shared/get-data';
import Steps from '../steps/steps';
import IStep from '../../types/step.type';

export default class PageAbout {
  private readonly steps: Steps;

  private pageIsReady = false;

  constructor(private readonly rootEl: HTMLElement) {
    this.steps = new Steps();
  }

  async render(): Promise<void> {
    document.body.classList.add('page-about');

    if (this.pageIsReady) {
      this.rootEl.append(this.steps.el);
      return;
    }

    const data = await getData('./steps.json');

    data.forEach((step: IStep) => {
      const image = `./assets/images/steps/${step.image}`;
      this.steps.addStep(step.text, image);
    });

    this.steps.render('How to play?');

    this.rootEl.append(this.steps.el);

    this.pageIsReady = true;
  }
}
