import StringAction from './StringAction';
import {
  formatJson
} from '@/js/FormatUtil';

export default class FormatJsonAction extends StringAction {
  constructor(name) {
    super('format JSON', 'format_line_spacing');
  }

  execute(value) {
    return formatJson(value);
  }

  isShortKey(key) {
    return (key.ctrlKey && key.shiftKey && key.keyCode === 70);
  }

  getShortCut() {
    return 'ctrl-shift-f';
  }
}
