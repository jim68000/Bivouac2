(function() {
    var html = require('../../bivouac/html.js');
    var Response = require('../../bivouac/types/response.js').Response;
    var log = require('../../bivouac/logger.js');
    var Apricot = require('apricot').Apricot;
    exports.VERSION = '0.1';

    exports.handle = function(req, response, writer) {
        Apricot.open("http://cloud.tfl.gov.uk/TrackerNet/PredictionDetailed/P/BOS",
        function(err, doc) {
            var responseArr = new Array();

            doc.find("P[n='Eastbound - Platform 2']>T");
            doc.each(function(e) {
                responseArr.push({
                    "destination": e._attributes._nodes.destination._nodeValue,
                    "timeto": e._attributes._nodes.timeto._nodeValue
                });

            })
            writer(req, response, Response(JSON.stringify(responseArr), 200, 'application/json'));
        });

    }



}).call(this);