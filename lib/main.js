var http = require('http'),
    url = require('url'),
    fs = require('fs'),
    path = require('path'),
    httpProxy = require('http-proxy'),
    log = require('clilog'),
    mime = require('mime'),
    watchr = require('watchr'),
    utils = require('./utils');
config = require('../config');

function main(configpath) {
    console.log(configpath);
    var urlconfig = require(configpath);



    watchr.watch({
        paths: [configpath],
        listeners: {
            error: function(err) {
                log.error('[watch]', err);
            },
            change: function() {
                delete require.cache[configpath];
                urlconfig = require(configpath);
                log.warn('[watch] reload config:' + configpath);
            }
        }
    });

    http.createServer(function(req, res) {
        var reqUrl = req.url;
        var from = reqUrl;
        var map = urlconfig.map;
        if (from) {
            log.info('[get]' + from);
            var to = utils.rewrite(map, from);
            if (from !== to) {
                log.debug('[rewirte]' + from + '->' + to);
                if (!/^https?:\/\//.test(to)) {
                    var contentType = mime.lookup(to);
                    fs.readFile(to, function(err, buffer) {
			if(err){
			log.error('failed to read the local file:'+err.path);
		        return;	
			}
                        utils.setResponse(res, contentType, buffer);
                    });

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

    }).listen(urlconfig.port, function() {
        console.log('Rewrite Server runing at port: ' + config.port);
    });
}

exports.main = main;
