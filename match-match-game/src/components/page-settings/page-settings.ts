import './page-settings.scss';
import gameSettingsField from '../game-settings-field/game-settings-field';

export default class PageSettings {
  constructor(private readonly rootEl: HTMLElement) {}

  build(): void {
    document.body.className = 'page-settings';
    this.rootEl.append(gameSettingsField.el);
  }
}
