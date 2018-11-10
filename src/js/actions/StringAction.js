export default class Action {
  constructor(label, icon) {
    this.label = label;
    this.icon = icon;
  }

  execute() {
    // implement in subclass
  }

  isShortKey(key) {
    return false;
  }

  getShortCut() {
    return '';
  }

}
