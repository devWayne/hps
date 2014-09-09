var http = require('http'),
	url = require('url'),
	httpProxy = require('http-proxy'),
	log = require('./log'),
	config = require('./config');



http.createServer(function(req, res) {
	var url = req.url;

	var parsedUrl = url.parse(url);
	var proxy = httpProxy.createServer({
		target: {
			host: parsedUrl.hostname,
			port: parsedUrl.port || 80
		}
	});
	proxy.proxyRequest(req, res);
	
}).listen(config.server_port);