(function(){
	var router = require('../../bivouac/router.js');
	var static_handler = require('../../bivouac/handlers/static.js');
	var remapper = require('../../bivouac/handlers/remapper.js');
	exports.setup = function() {
		router.add_route(/.*json.*/, 				"guardian.js");
		router.add_route(/beer.*/, 					"beer.js");
		router.add_route(/tubes/, 					"tubes.js");
		router.add_route(/.*favicon.ico.*/, 		static_handler);
		router.add_route(/.*.html/, 				static_handler); 
		router.add_route(/^\/$/, 					remapper);
		router.add_route(/\/.*/, 					static_handler);
	};
}).call(this);