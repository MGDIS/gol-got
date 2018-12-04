
const got = require('got');
const gotAgent = require('./agent');

function gotWrapper(url, options = {}) {
  if (!options.agent) options.agent = gotAgent(url);
  return got(url, options);
}

module.exports = gotWrapper;