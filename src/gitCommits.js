let {window} = require('vscode');
function createCommitInput() {
  return window.showInputBox({prompt: 'enter git commit message'});
  //returns a promsise
}
// window.showInputBox({prompt: 'enter git commit message'})
// .then(message => console.log(message));
module.exports = {createCommitInput};
