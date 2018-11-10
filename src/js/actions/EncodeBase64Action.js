import StringAction from './StringAction';

export default class EncodeBase64Action extends StringAction {
  constructor(name) {
    super('encode Base64', 'hdr_strong');
  }

  execute(value) {
    return btoa(value);
  }
}
