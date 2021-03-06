import './register-btn.scss';
import Btn from '../base/btn/btn';

export default class RegisterBtn extends Btn {
  constructor(classes: string[], text: string) {
    super(['register-btn', ...classes], text);
  }
}
