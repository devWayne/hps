#Http Proxy Server[![Build Status](https://travis-ci.org/devWayne/claws.svg?branch=master)](https://travis-ci.org/devWayne/claws)


> Fast HTTP proxy tool   
   
[![NPM](https://nodei.co/npm/hps.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/hps/)

##Usage


#### Global install hps

```shell
$ npm install -g hps

``` 

#### Write the config file

Write and save the config file

```javasciprt
//proxy port
exports.port=7000;

//proxy path
exports.map=[
	['url','local file path']
];

```

#### Run Browser proxy

Use `SwitchtSharp` to run browser proxy


#### Run hps

`./config.js` is your config file path

```javasciprt

$ hps start ./config.js

```

