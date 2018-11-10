import StringAction from './StringAction';
import {
  formatXml
} from '@/js/FormatUtil';

export default class FormatXmlAction extends StringAction {
  constructor(name) {
    super('format XML', 'code');
  }

  execute(value) {
    return formatXml(value);
  }

  isShortKey(key) {
    return (key.ctrlKey && key.shiftKey && key.keyCode === 70);
  }

  getShortCut() {
    return 'ctrl-shift-f';
  }

}
