import './page-settings.scss';
import GameSettingsField from '../game-settings-field/game-settings-field';

export default class PageSettings {
  private readonly gameSettingsField: GameSettingsField;

  constructor(private readonly rootEl: HTMLElement) {
    this.gameSettingsField = new GameSettingsField();
  }

  render(): void {
    document.body.classList.add('page-settings');
    this.rootEl.append(this.gameSettingsField.el);
  }
}
