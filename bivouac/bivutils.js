(function(){
	
	// TODO split out logging
	
	exports.VERSION = '0.1';
	

	exports.queries = function(query_string) {
		var pairs = query_string.split("&"), reqo = [];
		pairs.forEach(function(p) {
			var tp = p.split("=");
			reqo[tp[0]] = tp[1];
		});
		return reqo;
	};
	

	
	
}).call(this);