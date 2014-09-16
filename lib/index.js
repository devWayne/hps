#!/usr/bin/env node

var program = require('commander'),
	pkg = require('../package.json'),
	config = require('../config');

program
	.version(pkg.version)

program
	.command('start <cmd>')
	.description('start webapp server')
	.action(function(cmd) {


	});

program.parse(process.argv);