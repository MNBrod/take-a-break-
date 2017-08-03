let {window} = require('vscode');
function createCommitInput(prompt) {
  return window.showInputBox({prompt: prompt});
  //returns a promsise
}
// window.showInputBox({prompt: 'enter git commit message'})
// .then(message => console.log(message));
module.exports = {createCommitInput};
