(function(){
	var html = require('../bivouac/html.js');
	var Response = require('../bivouac/types/response.js').Response;
		
	exports.VERSION = '0.1';	

	exports.render = function(url) {
		return "i\'ll have a lager";
	};
	
	exports.handle = function(url) {
		return Response(html.doc("Beer", "I will drink the place dry"));
	};
	
}).call(this);