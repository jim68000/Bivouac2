(function(){
	var html = require('../../bivouac/html.js');
	var Response = require('../../bivouac/types/response.js').Response;
	var mongo = require('../../bivouac/mongo.js');
	var Model = require('../models/gu_news.js').Model;
	var log = require('../../bivouac/logger.js');
	exports.VERSION = '0.1';	


	// TODO sorting makes latency jump from 16ms to 160ms! Why?
	var dateSortRecentFirst = function(a, b) {		
		return  b.date.getTime() - a.date.getTime(); // most recent first
	}
	
	var pageSortLowestFirst = function(a, b) {
		return a.page_number - b.page_number;
	}
	
	
	exports.handle = function(req, response, writer) {
			var collection = req.url.replace("\/", "").replace(".json", "");
			if (collection !== 'news') {
				writer(req, response, Response("FEED "+ collection +" DOES NOT EXIST", 404));
			} else {
				mongo.get_collection_as_array(collection,
					function(t){
						var responseArr = new Array();
						if (t.length > 0) {
							for (var x in t) {
								responseArr.push(new Model(t[x].webPublicationDate, t[x].webTitle, t[x].fields.body, t[x].fields.newspaperPageNumber))
							} 
							responseArr.sort(pageSortLowestFirst);
						}
						writer(req, response, Response(JSON.stringify(responseArr), 200));
					},
					function(err) {
						// TODO errors should be automatically handled
						writer(req, response, Response("DATABASE ERROR " + err, 500));
					}
				);				
			}

			
			
	}
	
}).call(this);