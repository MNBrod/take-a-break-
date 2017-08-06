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
insertions + deletions
#files changed
*/

// function makeTest(num) {
//   let result = [];
//   for (let i = 0; i < 1; i += 1 / num) {
//     result.push({
//       input: {
//         insDel: Math.random(),
//         filesChanged: Math.random(),
//         time: Math.random()
//       },
//       output: {
//         yes: 1
//       }
//     });
//   }
//   return result;
// }

// console.log(makeTest(40));

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
  if (num < 30) num = 0;
  if (num > 500) num = 500;
  return Math.log10(num / 50);
}

function reversehashInsDel(num) {
  return Math.floor(Math.pow(10, num) * 50);
}
