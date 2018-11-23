# gol-got [![Build Status](https://travis-ci.org/MGDIS/gol-got.svg?branch=master)](https://travis-ci.org/MGDIS/gol-got) [![Coverage Status](https://coveralls.io/repos/github/MGDIS/gol-got/badge.svg?branch=master)](https://coveralls.io/github/MGDIS/gol-got?branch=master)

> Convenience wrapper for [`got`](https://github.com/sindresorhus/got) with automatic consideration of proxy env variables.


## Install

```
$ npm install gol-got
```


## Usage

Instead of:

```js
// Exemple based on https://github.com/sindresorhus/got#proxies
const got = require('got');
const tunnel = require('tunnel');

/* Proxy env variables */
process.env.NO_PROXY = 'https://noproxy.com'
process.env.HTTPS_PROXY = 'https://proxy.mgdis.fr'

/* Indigestible code part to create the method for tunneling*/
const method = ...; //httpOverHttp or httpsOverHttp or httpOverHttps or httpsOverHttps
let agent;
switch (method) {
  case 'httpOverHttp': 
    agent = tunnel.httpOverHttp({
      proxy: {
        host: 'proxy.mgdis.fr'
      });
    break:
  ...
}
/* ------------------------------------------------------- */

const response = await got('https://www/mgdis.fr/resource/1', { agent });

```

You can do:

```js
const got = require('gol-got');

/* Proxy env variables*/
process.env.NO_PROXY = 'https://noproxy.com'
process.env.HTTPS_PROXY = 'https://proxy.mgdis.fr'

const response = await got('https://www/mgdis.fr/resource/1');
```


## Why use gol-got
[`got`](https://github.com/sindresorhus/got) actually does not manage proxy environment variables : see this [issue](https://github.com/sindresorhus/got/issues/79).  
If you use [`got`](https://github.com/sindresorhus/got) in many projets that have to manage proxy environment variables, you probably don't want to write the same code routine all the time.

## API

Same as [`got`](https://github.com/sindresorhus/got).

## Clarification

- The tunnel agent used is [`tunnel-agent`](https://github.com/request/tunnel-agent) included in the popular [`request`](https://github.com/request/request) http calls library.
- [`proxy-from-env`](https://github.com/Rob--W/proxy-from-env) is used to get the proxy URL for the given URL based on standard proxies environment variables.


## License

MIT © [MGDIS](https://www.mgdis.fr)