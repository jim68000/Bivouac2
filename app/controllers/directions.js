(function() {
    var html = require('../../bivouac/html.js');
    var Response = require('../../bivouac/types/response.js').Response;
    var log = require('../../bivouac/logger.js');
	var url = require('url');
	var utils = require('../../bivouac/bivutils.js');

    var Apricot = require('apricot').Apricot;
    exports.VERSION = '0.1';

    exports.handle = function(req, response, writer) {
	
		var r = url.parse(req.url);
		var q = utils.queries(r.query);
	
        Apricot.open("http://cloud.tfl.gov.uk/TrackerNet/PredictionDetailed/"+q.lin+"/" + q.stn,
        function(err, doc) {
            doc.find("p")
			var choices = [];
			
			doc.each(function(e) {
				choices.push(e._attributes._nodes.n._nodeValue);
			});
            writer(req, response, Response(JSON.stringify(choices), 200, 'application/json'));
        });

    }

}).call(this);
