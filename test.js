const gotAgent = require('./agent');
const should = require('should');

describe('PROXY env variables', () => {
  it('do not use proxy if url is in NO_PROXY', (done) => {
    process.env.NO_PROXY = 'noproxy.com';
    const agent = gotAgent('http://noproxy.com/resource/1');
    should.not.exist(agent);
    process.env.NO_PROXY = null;
    done();
  });
  it('do not use proxy if NO_PROXY equal \'*\'', (done) => {
    process.env.NO_PROXY = '*';
    process.env.HTTP_PROXY = 'http://proxy.com';
    process.env.HTTPS_PROXY = 'https://proxy.com';
    const agent = gotAgent('http://nowhere.com/resource/1');
    should.not.exist(agent);
    process.env.NO_PROXY = null;
    process.env.HTTP_PROXY = null;
    process.env.HTTPS_PROXY = null;
    done();
  });
  it('use httpOverHttp tunnel for unsecured url if HTTP_PROXY is set with a unsecured url', (done) => {
    process.env.HTTP_PROXY = 'http://proxy.com';
    const agent = gotAgent('http://nowhere.com/resource/1');
    agent.name.should.eql('httpOverHttp');
    process.env.HTTP_PROXY = null;
    done();
  });
  it('use httpOverHttps tunnel for unsecured url if HTTP_PROXY is set with a secured url', (done) => {
    process.env.HTTP_PROXY = 'https://proxy.com';
    const agent = gotAgent('http://nowhere.com/resource/1');
    agent.name.should.eql('httpOverHttps');
    process.env.HTTP_PROXY = null;
    done();
  });
  it('use httpsOverHttp tunnel for secured url if HTTP_PROXY is set with a unsecured url', (done) => {
    process.env.HTTPS_PROXY = 'http://proxy.com';
    const agent = gotAgent('https://nowhere.com/resource/1');
    agent.name.should.eql('httpsOverHttp');
    process.env.HTTPS_PROXY = null;
    done();
  });
  it('use httpsOverHttps tunnel for secured url if HTTP_PROXY is set with a secured url', (done) => {
    process.env.HTTPS_PROXY = 'https://proxy.com';
    const agent = gotAgent('https://nowhere.com/resource/1');
    agent.name.should.eql('httpsOverHttps');
    process.env.HTTPS_PROXY = null;
    done();
  });
});