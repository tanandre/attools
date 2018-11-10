import StringAction from './StringAction';

export default class DecodeUrlAction extends StringAction {
  constructor(name) {
    super('decode URL', 'cloud_queue');
  }

  execute(value) {
    return decodeURIComponent(value);
  }
}
