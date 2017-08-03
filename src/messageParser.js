const snippets = require('../takeABreakConfig').snippets;

function generateMessage(message) {
  if (message[0] !== '/') return message;
  const keys = Object.keys(snippets);
  for (let i = 0; i < keys.length; i++) {
    if (message[1] === keys[i]) {
      let mess = message.slice(2);
      return snippets[keys[i]] + mess;
    }
  }
}

module.exports = generateMessage;
