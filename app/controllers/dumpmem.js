(function() {
	var utils = require('../../bivouac/bivutils.js');
    var Response = require('../../bivouac/types/response.js').Response;
	var cookies = require('../../bivouac/cookies.js');
	var storage = require('../../bivouac/types/storage.js').SimpleStorage();
	var url = require('url');
	
	var fs = require('fs');
	exports.version = "0.1";

	exports.handle = function(req, response, writer) {
		
		console.log(storage.find_all());
	}

}).call(this)
