import {
  formatJson as doFormatJson,
  formatXml as doFormatXml,
} from '@/js/FormatUtil';

function createAction(name, icon, shortcut, isShortKey, execute) {
  return {
    name,
    icon,
    shortcut,
    isShortKey,
    execute(value) {
      return execute(value);
    },
  };
}

const formatJson = createAction(
  'format JSON',
  'format_line_spacing',
  'ctrl-shift-f',
  key => key.ctrlKey && key.shiftKey && key.keyCode === 70,
  doFormatJson,
);

const formatXml = createAction(
  'format XML',
  'code',
  'ctrl-shift-f',
  key => key.ctrlKey && key.shiftKey && key.keyCode === 70,
  doFormatXml,
);

const encodeBase64 = createAction(
  'encode Base64',
  'hdr_strong',
  'ctrl-]',
  key => key.ctrlKey && !key.shiftKey && key.keyCode === 221,
  btoa,
);

const decodeBase64 = createAction(
  'decode Base64',
  'hdr_weak',
  'ctrl-shift-]',
  key => key.ctrlKey && key.shiftKey && key.keyCode === 221,
  atob,
);

const encodeUrl = createAction(
  'encode URL', 'cloud',
  'ctrl-[',
  key => key.ctrlKey && !key.shiftKey && key.keyCode === 219,
  encodeURIComponent,
);

const decodeUrl = createAction(
  'decode URL', 'cloud_queue',
  'ctrl-shift-[',
  key => key.ctrlKey && key.shiftKey && key.keyCode === 219,
  decodeURIComponent,
);

export default [
  encodeUrl,
  decodeUrl,
  encodeBase64,
  decodeBase64,
  formatJson,
  formatXml,
];
