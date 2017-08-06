const {
  makeNet
} = require('./net/net');
const simpleGit = require('simple-git')();

function hashTime(timeInMinutes) {
  if (timeInMinutes > 100) timeInMinutes = 100;
  return Math.log10(timeInMinutes / 10);
}

function hashFilesChanged(num) {
  if (num > 10) return 1;
  return Math.log10(num);
}

function hashInsDel(num) {
  if (num > 50) return 1;
  return Math.log10(num / 5);
}

function shouldCommit(time) {
  let net = makeNet();
  simpleGit.diff(['--stat'], (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log('result: \n', result);
      let arr = result.split('\n');
      let line;
      arr.forEach(val => {
        if (val.indexOf('file changed') !== -1) line = val;
      });
      console.log('line:', line);
      let insDel = 0;
      let filesChanged = 0;
      arr = line.split(',');
      arr.forEach(val => {
        let temp = val.split(' ');
        if (temp[2] === 'file') {
          filesChanged = +temp[1];
        } else if (temp[2] === 'insertions(+)') {
          insDel += +temp[1];
        } else {
          (insDel += +temp[1]);
        }
      });
      console.log(insDel, filesChanged);
      insDel = hashInsDel(insDel);
      filesChanged = hashFilesChanged(filesChanged);
      time = hashTime(time);
      return net.run({
        insDel,
        filesChanged,
        time
      });
    }
  });
}

function testShouldCommit(insDel, filesChanged, time) {
  let net = makeNet();
  insDel = hashInsDel(insDel);
  filesChanged = hashFilesChanged(filesChanged);
  time = hashTime(time);
  let result = net.run({
    insDel,
    filesChanged,
    time
  });
  return result.yes > result.no;

}
console.log(testShouldCommit(60, 2, 10));

module.exports = shouldCommit;
