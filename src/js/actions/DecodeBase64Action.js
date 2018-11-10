import StringAction from './StringAction';

export default class DecodeBase64Action extends StringAction {
  constructor(name) {
    super('decode Base64', 'hdr_weak');
  }

  execute(value) {
    return atob(value);
  }
}
