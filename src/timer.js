let simpleGit = require('simple-git')();
let gitInput = require('./gitCommits');
let {
  window
} = require('vscode');

function timerCallback(date, item) {
  let now = new Date();
  // let temp = date.getTime() - 3590000;
  let diff = now.getTime() - date.getTime();
  if (diff < 1100) {
    console.log('hi');
    simpleGit.status((err, status) => {
      if (err) console.error(err);
      console.log(status);

      if (status.modified.length !== 0) {
        simpleGit.add(status.modified, () => {
          console.log('Added ', status.modified);
          let message = `You haven't committed in a while! All has been added for you.
          If you want to commit, type a message! otherwise, submit an empty message`;
          gitInput.createCommitInput()
            .then((result, error) => {
              console.log('result: ', result, ' error: ', error);
              if (error) {
                console.log('err', error);
                console.error(error);
              } else if (result.length !== 0) {
                console.log('commiting message: ', result);
                simpleGit.commit(message, () => {
                  window.showInformationMessage('success! changes committed');
                });
              }
            });
        });
      }

    });
  }
  // let diff = now.getTime() - temp;
  item.text = `Time Difference: ${makeTime(diff)}`;
}

function makeTime(milli) {
  let sec, minutes, hours;
  if (milli > 3600000) {
    hours = Math.floor(milli / 3.6e+6);
    milli = milli - (hours * 3.6e+6);
    minutes = Math.floor(milli / 60000);
    sec = Math.round((milli - (minutes * 60000)) / 1000);
    if (sec < 10) sec = '0' + sec;
    if (minutes < 10) minutes = '0' + minutes;
    return `${hours}:${minutes}:${sec}`;
  }
  if (milli > 60000) {
    minutes = Math.floor(milli / 60000);
    sec = Math.round((milli - (minutes * 60000)) / 1000);
    if (sec < 10) sec = '0' + sec;
    return `${minutes}:${sec}`;
  }
  if (milli > 1000) {
    sec = Math.round(milli / 1000);
    if (sec < 10) sec = '0' + sec;
    return `0:${sec}`;
  } else {
    return milli;
  }
}

function createTimer(interval, date, item) {
  let timer = setInterval(() => {
    timerCallback(date, item);
  }, interval);
  return timer;
}


// class Timer {
//   constructor(interval, date, item) {
//     this.timer = setInterval(() => {
//       timerCallback(date, item);
//     }, interval);
//   }
// }


module.exports = {
  timerCallback,
  makeTime,
  createTimer,
  // Timer
};
