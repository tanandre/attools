import StringAction from './StringAction';

export default class EncodeUrlAction extends StringAction {
  constructor(name) {
    super('encode URL', 'cloud');
  }

  execute(value) {
    return encodeURIComponent(value);
  }

  isShortKey(key) {
    return (key.ctrlKey && !key.shiftKey && key.keyCode === 219);
  }

  getShortCut() {
    return 'ctrl-[';
  }
}
