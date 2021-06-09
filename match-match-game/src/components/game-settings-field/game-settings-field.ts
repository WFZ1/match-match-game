import './game-settings-field.scss';
import BaseComponent from '../base/base-component';
import IGameParams from '../../types/game-params.type';
import GameParameter from '../game-parameter/game-parameter';

const GAME_PARAMS = [
  {
    title: 'Game cards',
    options: [
      {
        value: 'select game cards type',
        disabled: true,
      },
      {
        value: 'Animals',
        selected: true,
      },
      {
        value: 'Fruits',

      },
      {
        value: 'Vegetables',
      }
    ],
  },
  {
    title: 'Difficulty',
    options: [
      {
        value: 'select game type',
        disabled: true,
      },
      {
        value: '4x4',
      },
      {
        value: '6x6',
        selected: true,
      },
      {
        value: '8x8',
      }
    ],
  },
];

export default class GameSettingsField extends BaseComponent {
  readonly gameParams: GameParameter[] = [];

  constructor() {
    super('div', ['game-settings-field']);
    this.render();
  }

  render(): void {
    GAME_PARAMS.forEach((param) => this.addParameter(param));
  }

  addParameter({ title, options }: IGameParams): void {
    const gameParameter = new GameParameter(['game-settings-field__parameter'], title, options);
    this.gameParams.push(gameParameter);
    this.el.append(gameParameter.el);
  }
}
