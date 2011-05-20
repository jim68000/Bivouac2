(function(){
	var html = require('../bivouac/html.js');
	var Response = require('../bivouac/types/response.js').Response;
	exports.VERSION = '0.1';	
	exports.render = function(url) {
		return "hello " + url;
	};
	
	exports.handle = function(url) {
		return Response(html.doc("Hello", "hello " + url));
	};
	
}).call(this);