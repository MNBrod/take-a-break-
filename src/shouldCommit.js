const factors = {
  timeElapsed: 0,
  currentTime: 0,
  addedFiles: 0,
  modifiedFiles: 0,
};
let brain = require('brain');
const config = require('../takeABreakConfig.js');

/*
time since last commit
insertions
deletions
#files changed
*/

function makeTest(num) {
  let result = [];
  for (let i = num; i > 0; i--) {
    result.push({
      insertions: Math.random(),
      deletions: Math.random(),
      filesChanged: Math.random(),
      time: Math.random()
    });
  }
  return result;
}

function hashTime(timeInMinutes) {
  if (timeInMinutes > 100) timeInMinutes = 100;
  return Math.log10(timeInMinutes / 10);
}
function hashFilesChanged(num) {
  if (num > 10) return 1;
  return num / 10;
}
function hashInsertions(num) {

}
