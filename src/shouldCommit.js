const config = require('../takeABreakConfig.js');
const {makeNet} = require('./net/net');
const simpleGit = require('simple-git')();

function hashTime(timeInMinutes) {
  if (timeInMinutes > 100) timeInMinutes = 100;
  return Math.log10(timeInMinutes / 10);
}

function reverseHashTime(num) {
  return Math.floor(Math.pow(10, num) * 10);
}

function hashFilesChanged(num) {
  if (num > 10) return 1;
  return Math.log10(num);
}

function reverseHashFilesChanged(num) {
  return Math.pow(10, num);
}

function hashInsDel(num) {
  if (num > 50) return 1;
  return Math.log10(num / 5);
}

function reversehashInsDel(num) {
  return Math.floor(Math.pow(10, num) * 5);
}

function shouldCommit() {
  let net = makeNet();
  simpleGit.status();
}
