import './btn-add-player.scss';
import Btn from '../base/btn/btn';

export default class BtnAddPlayer extends Btn {
  constructor(classes: string[], text: string) {
    super(['btn-add-player', ...classes], text, 'submit');
  }
}
