(function(){
	
	
	var config = require('../../app/config/config.js');
	var Response = require('../types/response.js').Response;
	var static_handler = require('../handlers/static.js');
	var fs = require('fs');
	exports.VERSION = '0.2';
	exports.is_static = true;
	// build_res.handle(req.url, res, ws.writer);
	exports.handle = function(req, res, writer) {
		req.url = req.url + config.default_file;
		static_handler.handle(req, res, writer); // A decorator!
	};
	
	
}).call(this)