const getOptions = require('./lib/options');
const should = require('should');

describe('PROXY env variables', () => {
  it('must not use proxy if url is in NO_PROXY', async() => {
    const options = getOptions('http://www.mgdis.fr/resource/1');
    process.env.NO_PROXY = 'www.mgdis.fr';
    process.env.HTTP_PROXY = 'http://proxy.mgdis.fr';
    process.env.HTTPS_PROXY = 'https://proxy.mgdis.fr';
    should.not.exist(options.agent);
    process.env.NO_PROXY = null;
    process.env.HTTP_PROXY = null;
    process.env.HTTPS_PROXY = null;
  });
  it('must not use proxy if NO_PROXY equal \'*\'', () => {
    process.env.NO_PROXY = '*';
    process.env.HTTP_PROXY = 'http://proxy.mgdis.fr';
    process.env.HTTPS_PROXY = 'https://proxy.mgdis.fr';
    const options = getOptions('http://www.mgdis.fr/resource/1');
    should.not.exist(options.agent);
    process.env.NO_PROXY = null;
    process.env.HTTP_PROXY = null;
    process.env.HTTPS_PROXY = null;
  });
  it('must modify request options for an unsecured url and HTTP_PROXY set with an unsecured url', async() => {
    process.env.HTTP_PROXY = 'http://proxy.mgdis.fr';
    const options = getOptions('http://www.mgdis.fr/resource/1');
    should.equal(options.host, 'proxy.mgdis.fr');
    should.equal(options.hostname, 'proxy.mgdis.fr');
    should.equal(options.port, '80');
    should.equal(options.protocol, 'http:');
    should.equal(options.path, 'http://www.mgdis.fr/resource/1')
    process.env.HTTP_PROXY = null;
  })
  it('must modify request options for an secured url and HTTP_PROXY set with a secured url', async() => {
    process.env.HTTP_PROXY = 'https://proxy.mgdis.fr';
    const options = getOptions('http://www.mgdis.fr/resource/1');
    should.equal(options.host, 'proxy.mgdis.fr');
    should.equal(options.hostname, 'proxy.mgdis.fr');
    should.equal(options.port, '443');
    should.equal(options.protocol, 'https:');
    should.equal(options.path, 'http://www.mgdis.fr/resource/1')
    process.env.HTTPS_PROXY = null;
  })

  it('must use an tunnel agent (httpsOverHttp) for an secured url and HTTPS_PROXY set with a unsecured url', async() => {
    process.env.HTTPS_PROXY = 'http://proxy.mgdis.fr';
    const options = getOptions('https://www.mgdis.fr/resource/1');
    should.equal(options.agent.proxyOptions.host, 'proxy.mgdis.fr');
    should.equal(options.agent.options.proxy.host, 'proxy.mgdis.fr');
    should.equal(options.agent.createSocket.name, 'createSecureSocket')
    should.equal(options.agent.defaultPort, 443);
    process.env.HTTP_PROXY = null;
  })
  
  it('must use an tunnel agent (httpsOverHttps) for a secured url and HTTPS_PROXY set with a secured url', async() => {
    process.env.HTTPS_PROXY = 'https://proxy.mgdis.fr';
    const options = getOptions('https://www.mgdis.fr/resource/1');
    should.equal(options.agent.proxyOptions.host, 'proxy.mgdis.fr');
    should.equal(options.agent.options.proxy.host, 'proxy.mgdis.fr');
    should.equal(options.agent.createSocket.name, 'createSecureSocket')
    should.equal(options.agent.defaultPort, 443);
    process.env.HTTPS_PROXY = null;
  })
});