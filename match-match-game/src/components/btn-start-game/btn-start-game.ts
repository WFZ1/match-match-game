import './btn-start-game.scss';
import Btn from '../base/btn/btn';

export default class BtnStartGame extends Btn {
  constructor(classes: string[], text: string) {
    super(['btn-start-game', ...classes], text);
  }
}
