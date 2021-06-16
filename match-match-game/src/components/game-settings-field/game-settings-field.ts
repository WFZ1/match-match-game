import './game-settings-field.scss';
import BaseComponent from '../base/base-component';
import GameParameter from '../game-parameter/game-parameter';
import IGameParams from '../../types/game-params.type';
import { GAME_PARAMS } from './constants';

class GameSettingsField extends BaseComponent {
  readonly gameParams: GameParameter[] = [];

  constructor() {
    super('div', ['game-settings-field']);

    this.render();
  }

  private render(): void {
    GAME_PARAMS.forEach((params) => this.addParameter(params));
  }

  private addParameter(params: IGameParams): void {
    params.classes = ['game-settings-field__parameter'];
    const gameParameter = new GameParameter(params);

    this.gameParams.push(gameParameter);
    this.el.append(gameParameter.el);
  }
}

const gameSettingsField = new GameSettingsField();
export default gameSettingsField;
