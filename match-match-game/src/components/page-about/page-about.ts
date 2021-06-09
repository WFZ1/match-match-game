import './page-about.scss';
import getData from '../../shared/get-data';
import Steps from '../steps/steps';
import IStep from '../../types/step.type';
import RegisterPopup from '../register-popup/register-popup';

export default class PageAbout {
  private readonly steps: Steps;

  private readonly registerPopup: RegisterPopup;

  private pageIsReady = false;

  constructor(private readonly rootEl: HTMLElement) {
    this.steps = new Steps();
    this.registerPopup = new RegisterPopup(
      'Register new Player',
      '.register-btn',
    );
  }

  async render(): Promise<void> {
    document.body.classList.add('page-about');

    if (this.pageIsReady) {
      this.rootEl.append(this.steps.el, this.registerPopup.el);
      return;
    }

    const data = await getData('./steps.json');

    data.forEach((step: IStep) => {
      const image = `./assets/images/steps/${step.image}`;
      this.steps.addStep(step.text, image);
    });

    this.steps.render('How to play?');

    this.registerPopup.render();

    this.rootEl.append(this.steps.el, this.registerPopup.el);

    this.pageIsReady = true;
  }
}
