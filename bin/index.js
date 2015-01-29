#!/usr/bin/env node

var program = require('commander'),
	path = require('path'),
	pkg = require('../package.json'),
	sv = require('../lib/main');
program
	.version(pkg.version)

program
	.command('start <proxyConfig>')
	.description('start webapp server')
	.action(function(proxyConfig) {
		configPath = path.resolve(proxyConfig);
		sv.main(configPath);
	});

program.parse(process.argv);
