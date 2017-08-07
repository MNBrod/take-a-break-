const fs = require('fs');

function parseFile (fileName) {
  let res = fs.readFileSync(fileName);
  return JSON.parse(res);
}
function writeFile (obj, fileName) {
  let str = JSON.stringify(obj);
  fs.writeFileSync(fileName, str);
}

module.exports = {
  parseFile,
  writeFile
};
