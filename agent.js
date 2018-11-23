const debug = require('debug')('got-proxy');
const URL = require('url');
const getProxyForUrl = require('proxy-from-env').getProxyForUrl;
const tunnel = require('tunnel-agent');

function getAgent(url) {
  let agent;
  const proxyUrl = getProxyForUrl(url);
  if (proxyUrl) {
    debug(`Using proxy ${proxyUrl} for ${url}`);
    const parsedUrl = URL.parse(url);
    const tunnelUrlProtocol = parsedUrl.protocol === 'https:' ? 'https' : 'http';
    const parsedProxyUrl = URL.parse(proxyUrl);
    const tunnelProxyProtocol = parsedProxyUrl.protocol === 'https:' ? 'Https' : 'Http';
    const method = `${tunnelUrlProtocol}Over${tunnelProxyProtocol}`;
    agent = tunnel[method];
  }
  return agent;
}

module.exports = getAgent;