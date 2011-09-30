(function(){
	var html = require('../../bivouac/html.js');
	var Response = require('../../bivouac/types/response.js').Response;
	var mongo = require('../../bivouac/mongo.js');
	var Model = require('../models/gu_news.js').Model;
	var log = require('../../bivouac/logger.js');
	var cookies = require('../../bivouac/cookies.js');
	exports.VERSION = '0.1';
	
	exports.handle = function(req, response, writer) {		
		writer(req, response, Response("You sent " + cookies.read_cookies(req).join(), 200, 'text/html', {
			'set-cookie':'namen=value;Expires=Wed, 09 Apr 2021 10:18:14 GMT; nom=valour;Expires=Wed, 08 Apr 2021 10:18:14 GMT'
		}));
	};

}).call(this);