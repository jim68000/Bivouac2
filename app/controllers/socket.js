(function(){
	var html = require('../../bivouac/html.js');
	var Response = require('../../bivouac/types/response.js').Response;
	var mongo = require('../../bivouac/mongo.js');
	var Model = require('../models/gu_news.js').Model;
	var log = require('../../bivouac/logger.js');
	exports.VERSION = '0.1';
	
	exports.handle = function(req, response, writer) {
		writer(req, response, Response("Hello", 200));
	};

}).call(this);