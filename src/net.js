let brain = require('brain');
let {cases} = require('../training/fortyTraining');
let fs = require('fs');


// let net =  new brain.NeuralNetwork();

// net.train(cases, {log: true, logPeriod: 1000, iterations: 1000000});
// let json = net.toJSON();
// let strJSON = JSON.stringify(json);
// fs.writeFileSync('./netJSON.js', strJSON);
// console.log(json);

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
let jsonNet = readJSON('./netJSON.json');
let net = netFromJSON(jsonNet);
let result = net.run({insDel: 0.731821088276934,
  filesChanged: 0.07590124614402649,
  time: 0.4505742693912096});
console.log(result.yes > result.no ? 'yes' : 'no');
