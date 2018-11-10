import StringAction from './StringAction';

export default class EncodeBase64Action extends StringAction {
  constructor(name) {
    super('encode Base64', 'hdr_strong');
  }

  execute(value) {
    return btoa(value);
  }

  isShortKey(key) {
    return (key.ctrlKey && !key.shiftKey && key.keyCode === 221);
  }

  getShortCut() {
    return 'ctrl-]';
  }
}
