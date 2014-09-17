var path = require('path'),
	log=require('./log'),
	watchr=require('watchr');	
	
function setResponse(response, contentType, buffer) {
	response.setHeader('Content-Type', contentType);
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.write(buffer);
	response.end();
}

function watchFile(filePath){
	watchr.watch({
		paths:[filePath],
		listeners:{
			error:function(err){
				log.error('[watch]',err);
			},
			change:function(){
				delete require.cache[filePath];
				log.info('[watch] reload config:'+filePath);
			}
		}
	});
}

function rewrite(map, url) {
	// rewrite by map
	for (var i = 0, len = map.length; i < len; i++) {
		var row = map[i];

		if (row.length != 2) {
			continue;
		}

		
		var from = row[0];
		var to = row[1];

			var index = url.indexOf(from);

		if (index === 0) {
			var suffix = url.substr(index + from.length);
			suffix = suffix.replace(/[?#].*$/, '');
			return path.resolve(to + suffix);
		}
	}
	return url;
}
exports.rewrite=rewrite;
exports.setResponse = setResponse;
exports.watchFile=watchFile;