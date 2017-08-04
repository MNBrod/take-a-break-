let gitCommits = require('./gitCommits');
let timerCallback = gitCommits.handleTimeUp;

function createTimer(interval, date, item) {
  const timer = setInterval(() => {
    timerCallback(date, item, () => {
      date = new Date();
    });
  }, interval);
  timer.item = item;
  timer.prototype.hideItem = function () {
    this.item.hide();
  };
  return timer;
}


module.exports = {
  createTimer
};
