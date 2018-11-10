import StringAction from './StringAction';

export default class EncodeUrlAction extends StringAction {
  constructor(name) {
    super('encode URL', 'cloud');
  }

  execute(value) {
    return encodeURIComponent(value);
  }
}
