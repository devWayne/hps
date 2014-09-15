var http = require('http'),
	url = require('url'),
	fs=require('fs'),
	httpProxy = require('http-proxy'),
	log = require('./log'),
	mime=require('mime'),
	utils=require('./utils'),
	config = require('./config');

utils.watchFile(config);

http.createServer(function(req, res) {
	var reqUrl = req.url;
	var from = reqUrl;
	var map=config.map;
	if (from){
		log.info('[get]'+from);
		var to=utils.rewrite(map,from);
		if (from!==to){
			log.info('[rewirte]'+from+'->'+to);
			if(!/^https?:\/\//.test(to)){
				var contentType=mime.lookup(to);
				var buffer =fs.readFileSync(to);
				utils.setResponse(res,contentType,buffer);
				return;
			}
			return;
		}
	}
	var parsedUrl = url.parse(reqUrl);
	var proxy = httpProxy.createServer({
		target: {
			host: parsedUrl.hostname,
			port: parsedUrl.port || 80
		}
	});
	proxy.proxyRequest(req, res);
	
}).listen(config.port,function(){
	console.log('Rewrite Server runing at port: ' + config.port);
});