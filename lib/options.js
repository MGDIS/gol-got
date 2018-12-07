const debug = require('debug')('gol-got');
const URL = require('url');
const getProxyForUrl = require('proxy-from-env').getProxyForUrl;
const tunnel = require('./tunnel')

function getOptions(url, options) {
  let opts = Object.assign({}, options);
  const proxyUrl = getProxyForUrl(url);
  if (proxyUrl) {
    debug(`Using proxy ${proxyUrl} for ${url}`);
    const parsedUrl = URL.parse(url); 
    const parsedProxyUrl = URL.parse(proxyUrl);
  
    if (parsedUrl.protocol === 'https:') { 
      // If the destination is HTTPS, tunnel.
      opts.agent = tunnel(parsedProxyUrl);
    } else {
      // Otherwise, do not use tunnel.
      opts.port = parsedProxyUrl.port || (parsedProxyUrl.protocol === 'http:' ? 80 : 443);
      opts.hostname = parsedProxyUrl.hostname;
      opts.protocol = parsedProxyUrl.protocol;
      opts.host = parsedProxyUrl.hostname;
      opts.path = parsedUrl.href
    }
  }
  return opts;
}

module.exports = getOptions;