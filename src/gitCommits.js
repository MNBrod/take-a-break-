let {window} = require('vscode');
let simpleGit = require('simple-git')();
const config = require('../takeABreakConfig');
const generateMessage = require('./messageParser');
//q library


function createCommitInput(prompt) {
  return window.showInputBox({prompt: prompt});
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


function handleTimeUp (date, item, reset) {
  let now = new Date();
  // let temp = date.getTime() - 3590000;
  let diff = now.getTime() - date.getTime();
  // if (diff % config.gitCheckRate < 999) {
  //   simpleGit.log([], (err, log) => {
  //     if (err) console.error(err);
  //     let temp = new Date(log.all[0].date);
  //     if (now.getTime() - temp.getTime() < config.queryTickRate) {
  //       reset();
  //     }
  //   });
  // }
  if (diff % config.queryTickRate < 999) {
    simpleGit.status((err, status) => {
      if (err) console.error(err);
      console.log(status);
      if (status.modified.length !== 0) {
        simpleGit.add(status.modified.concat(status.not_added), () => {
          console.log('Added ', status.modified);
          const message = `You haven't committed in a while! All has been added for you.
          If you want to commit, type a message! otherwise, submit an empty message`;
          createCommitInput(message)
            .then((result, error) => {
              if (error) {
                console.log('err');
                console.error(error);
              } else if (result && result.length !== 0) {
                result = generateMessage(result);
                console.log('commiting message: ', result);
                simpleGit.commit(result, () => {
                  window.showInformationMessage('success! changes committed');
                  reset();
                });
              } else {
                config.queryTickRate = config.queryTickRate + 10000;
              }
            });
        });
      }
    });
  }
  // let diff = now.getTime() - temp;
  item.text = `Time: ${makeTime(diff)}`;
}

module.exports = {createCommitInput, handleTimeUp};
