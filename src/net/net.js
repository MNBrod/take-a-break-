let brain = require('brain');
// let {cases} = require('./training/fortyTraining');
let fs = require('fs');
const netStore = './netJSON.json';

function readJSON(fileName) {
  let str = fs.readFileSync(fileName);
  str = JSON.parse(str);
  return str;
}

function netFromJSON(json) {
  let net = new brain.NeuralNetwork();
  net.fromJSON(json);
  return net;
}

function makeNet() {
  let jsonNet = readJSON(netStore);
  let net = netFromJSON(jsonNet);
  return net;
}

module.exports = {makeNet};

// let result = net.run({insDel: 0.731821088276934,
//   filesChanged: 0.07590124614402649,
//   time: 0.4505742693912096});
// console.log(result.yes > result.no ? 'yes' : 'no');
