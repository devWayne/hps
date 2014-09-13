var Path = require('path');
function setResponse(response, contentType, buffer) {
	response.setHeader('Content-Type', contentType);
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.write(buffer);
	response.end();
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
			return Path.resolve(to + suffix);
		}
	}
	return url;
}
exports.rewrite=rewrite;
exports.setResponse = setResponse;