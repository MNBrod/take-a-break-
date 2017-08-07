let {
  window
} = require('vscode');
let shouldCommit = require('./shouldCommit');
let simpleGit = require('simple-git')();
const config = require('../takeABreakConfig');
const generateMessage = require('./messageParser');
//q library


function createCommitInput(prompt) {
  return window.showInputBox({
    prompt: prompt
  });
  //returns a promsise
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


function handleTimeUp(date, item, reset) {
  let now = new Date();
  let diff = now.getTime() - date.getTime();
  if (shouldCommit(diff / 60000)) {
  // if (diff % config.queryTickRate < 999) {
    const message = "You haven't committed in a while! All has been added for you. If you want to commit, type a message! otherwise, submit an empty message";
    createCommitInput(message)
      .then((result, error) => {
        if (error) {
          console.error(error);
        } else if (result && result.length !== 0) {
          result = generateMessage(result);
          simpleGit.status((err, status) => {
            if (err) console.error(err);
            if (status.modified.length !== 0) {
              simpleGit.add(status.modified.concat(status.not_added), () => {
                console.log('Added ', status.modified);
                console.log('commiting message: ', result);
                simpleGit.commit(result, () => {
                  window.showInformationMessage('success! changes committed');
                  reset();
                });
              });
            }
          });
        } else {
          window.showInformationMessage('nothing was added or committed');
          config.queryTickRate += 10000;
        }
      });
  }
  item.text = `Time: ${makeTime(diff)}`;
}

module.exports = {
  createCommitInput,
  handleTimeUp
};
