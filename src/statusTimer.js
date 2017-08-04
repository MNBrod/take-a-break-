let {
  window,
  StatusBarAlignment,
} = require('vscode');

function createItem() {
  let item = window.createStatusBarItem(StatusBarAlignment.left);
  item.tooltip = 'Time Elapsed: H:M:S';
  item.show();
  return item;
}

module.exports = {createItem};
