const debug = require('debug')('gol-got');
const tunnel = require('tunnel-agent');

function getTunnel(parsedProxyUrl) {
  const urlProxyProtocol = parsedProxyUrl.protocol === 'https:' ? 'Https' : 'Http';
  const method = `httpsOver${urlProxyProtocol}`;
  debug(`Using tunnel agent ${method}`);
  
  return tunnel[method]({
    proxy: {
      port: parsedProxyUrl.port,
      host: parsedProxyUrl.hostname,
      proxyAuth: parsedProxyUrl.auth
    }
  });
}

module.exports = getTunnel;