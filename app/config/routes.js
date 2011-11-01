(function(){
	var router = require('../../bivouac/router.js');
	var static_handler = require('../../bivouac/handlers/static.js');
	var remapper = require('../../bivouac/handlers/remapper.js');
	exports.setup = function() {
		router.add_route(/news.json.*/, 			"guardian.js");
		router.add_route(/beer.*/, 					"beer.js");
		router.add_route(/tubes/, 					"tubes.js");
		router.add_route(/resize.*/, 				"resize.js");
		router.add_route(/newsread.*/, 				"reader.js");

		router.add_route(/lines/, 					"lines.js");
		router.add_route(/retrieve/, 				"retriever.js");
		router.add_route(/display_station/, 		"display_station.js");
		router.add_route(/directions/, 				"directions.js");
		router.add_route(/savedir/, 				"saved.js");
		router.add_route(/cook/, 					"cookie_test.js");
		router.add_route(/bivouac\/dumpmem/, 		"dumpmem.js");
		router.add_route(/.*favicon.ico.*/, 		static_handler);
		router.add_route(/.*.html/, 				static_handler); 
		router.add_route(/^\/$/, 					remapper);
		router.add_route(/\/.*/, 					static_handler);
	};
}).call(this);