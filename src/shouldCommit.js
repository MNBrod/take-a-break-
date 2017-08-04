const factors = {
  timeElapsed: 0,
  fileDiff: 0,
  currentTime: 0,
  addedFiles: 0,
  modifiedFiles: 0,
};
const config = require('../takeABreakConfig');

function shouldCommit(factors) {
  let total;
  total += factors.timeElapsed;
  total += 3 * (factors.timeElapsed - factors.currentTime);
  total += factors.addedFiles * 1000;
  total += factors.modifiedFiles * 1000;

}
