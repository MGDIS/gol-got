const gotAgent = require('./agent');
const should = require('should');

describe('PROXY env variables', () => {
  it('must not use agent if url is in NO_PROXY', async() => {
    const agent = gotAgent('http://www.mgdis.fr/resource/1');
    process.env.NO_PROXY = 'www.mgdis.fr';
    process.env.HTTP_PROXY = 'http://proxy.mgdis.fr';
    process.env.HTTPS_PROXY = 'https://proxy.mgdis.fr';
    should.not.exist(agent);
    process.env.NO_PROXY = null;
    process.env.HTTP_PROXY = null;
    process.env.HTTPS_PROXY = null;
  });
  it('must not use agent if NO_PROXY equal \'*\'', () => {
    process.env.NO_PROXY = '*';
    process.env.HTTP_PROXY = 'http://proxy.mgdis.fr';
    process.env.HTTPS_PROXY = 'https://proxy.mgdis.fr';
    const agent = gotAgent('http://www.mgdis.fr/resource/1');
    should.not.exist(agent);
    process.env.NO_PROXY = null;
    process.env.HTTP_PROXY = null;
    process.env.HTTPS_PROXY = null;
  });
  it('must use an HTTP agent for a unsecured url and HTTP_PROXY set with an unsecured url (httpOverHttp)', async() => {
    process.env.HTTP_PROXY = 'http://proxy.mgdis.fr';
    const agent = gotAgent('http://www.mgdis.fr/resource/1');
    should.equal(agent.proxyOptions.host, 'proxy.mgdis.fr');
    should.equal(agent.options.proxy.host, 'proxy.mgdis.fr');
    should.equal(agent.createSocket.name, 'createSocket')
    should.not.exists(agent.defaultPort);
    process.env.HTTP_PROXY = null;
  })
  it('must use an HTTP agent for an unsecured url and HTTP_PROXY set with a secured url (httpOverHttps)', async() => {
    process.env.HTTP_PROXY = 'https://proxy.mgdis.fr';
    const agent = gotAgent('http://www.mgdis.fr/resource/1');
    should.equal(agent.proxyOptions.host, 'proxy.mgdis.fr');
    should.equal(agent.options.proxy.host, 'proxy.mgdis.fr');
    should.equal(agent.createSocket.name, 'createSocket')
    should.not.exists(agent.defaultPort);
    process.env.HTTP_PROXY = null;
  })
  it('must use an HTTPS agent for a secured url and HTTPS_PROXY set with an unsecured url (httpsOverHttp)', async() => {
    process.env.HTTPS_PROXY = 'http://proxy.mgdis.fr';
    const agent = gotAgent('https://www.mgdis.fr/resource/1');
    should.equal(agent.proxyOptions.host, 'proxy.mgdis.fr');
    should.equal(agent.options.proxy.host, 'proxy.mgdis.fr');
    should.equal(agent.createSocket.name, 'createSecureSocket')
    should.equal(agent.defaultPort, 443);
    process.env.HTTPS_PROXY = null;
  })
  it('must use an HTTPS agent for a secured url and HTTPS_PROXY set with a secured url (httpsOverHttps)', async() => {
    process.env.HTTPS_PROXY = 'https://proxy.mgdis.fr';
    const agent = gotAgent('https://www.mgdis.fr/resource/1');
    should.equal(agent.proxyOptions.host, 'proxy.mgdis.fr');
    should.equal(agent.options.proxy.host, 'proxy.mgdis.fr');
    should.equal(agent.createSocket.name, 'createSecureSocket')
    should.equal(agent.defaultPort, 443);
    process.env.HTTPS_PROXY = null;
  })
});