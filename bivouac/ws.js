// TEMPORARY HACK TO ENCLOSE WEB SERVER FUNCTIONALITY
// perhaps make this a feature? You can choose your webserver?

(function(){
	var Response = require('./types/response.js').Response;
	var log = require('./logger.js');
	
	exports.VERSION = '0.1';	
	exports.writer = function(req, res, payload) {
		res.writeHead(payload.code, {'Content-Type': payload.mime});
		res.write(payload.payload);
		res.end();
		log.weblog(req, res, payload.code, new Date().getTime());
	};
	
}).call(this);