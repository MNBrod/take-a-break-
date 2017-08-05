let brain = require('brain');


let net =  new brain.NeuralNetwork();

net.train([{input: [0, 0], output: [0]},
  {input: [0, 1], output: [1]},
  {input: [1, 0], output: [1]},
  {input: [1, 1], output: [0]}], {
    log: false
  });
let json = net.toJSON();
console.log(json);
// console.log(net.run([1, 0]));
