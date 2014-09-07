var http = require('http'),
	httpProxy = require('http-proxy'),
	connect = require('connect'),
	log = require('./log'),
	config = require('./config');

var proxy = httpProxy.createServer({

});

connect.createServer(

).listen(config.proxyServer_port);

http.createServer(

).listen(config.server_port);