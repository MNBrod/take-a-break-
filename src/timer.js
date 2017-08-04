let gitCommits = require('./gitCommits');
const {
  createItem
} = require('./statusTimer');
let timerCallback = gitCommits.handleTimeUp;

class Timer {
  constructor(interval, date) {
    this.item = createItem();
    this.timer = setInterval(() => {
      timerCallback(date, this.item, () => {
        date = new Date();
      });
    }, interval);
  }
  endTimer() {
    this.item.hide();
    clearInterval(this.timer);
  }
}

module.exports = {
  Timer
};
