import './btn-add-user.scss';
import Btn from '../btn/btn';

export default class BtnAddUser extends Btn {
  constructor(classes: string[], text: string) {
    super(['btn-add-user', ...classes], text, 'submit');
  }
}
