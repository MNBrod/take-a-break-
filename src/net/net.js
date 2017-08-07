let brain = require('brain');
// let {cases} = require('./training/fortyTraining');
let fs = require('fs');
const netStore = './netJSON.json';

function readJSON(fileName) {
  //let str = fs.readFileSync('../net/netJSON.json');
  //str = JSON.parse(str);
  return {
    layers: [{
      insDel: {},
      filesChanged: {},
      time: {}
    }, {
      0: {
        bias: -13.41189975613008,
        weights: {
          insDel: 3.3697042641105845,
          filesChanged: -14.28425954379618,
          time: 50.291237678591294
        }
      },
      1: {
        bias: 4.86634156371014,
        weights: {
          insDel: 49.37336027961708,
          filesChanged: 4.902754903697284,
          time: -45.9176573742782
        }
      },
      2: {
        bias: 31.708797040150664,
        weights: {
          insDel: -19.73591257956686,
          filesChanged: -2.8983955758073576,
          time: -28.113777723738163
        }
      }
    }, {
      yes: {
        bias: -13.191759953218563,
        weights: {
          0: 29.220153417676308,
          1: 30.52587818941849,
          2: -31.398566168805722
        }
      },
      no: {
        bias: 13.1919161318044,
        weights: {
          0: -29.220231209723387,
          1: -30.52592297137031,
          2: 31.398496408309608
        }
      }
    }],
    outputLookup: true,
    inputLookup: true
  };
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

module.exports = {
  makeNet
};

// let result = net.run({insDel: 0.731821088276934,
//   filesChanged: 0.07590124614402649,
//   time: 0.4505742693912096});
// console.log(result.yes > result.no ? 'yes' : 'no');
