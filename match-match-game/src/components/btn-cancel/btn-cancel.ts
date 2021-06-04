import './btn-cancel.scss';
import Btn from '../base/btn/btn';

export default class BtnCancel extends Btn {
  constructor(classes: string[], text: string) {
    super(['btn-cancel', ...classes], text, 'reset');
  }
}
