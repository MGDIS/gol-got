
const got = require('got');
const getOptions = require('./lib/options');

function getInstance(url, options = {}) {
  return got.extend(getOptions(url, options));
}

module.exports = getInstance;
