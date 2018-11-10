import StringAction from './StringAction';

export default class DecodeBase64Action extends StringAction {
  constructor(name) {
    super('decode Base64', 'hdr_weak');
  }

  execute(value) {
    return atob(value);
  }

  isShortKey(key) {
    return (key.ctrlKey && key.shiftKey && key.keyCode === 221);
  }

  getShortCut() {
    return 'ctrl-shift-]';
  }

}
