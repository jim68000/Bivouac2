(function() {
	var config = require('../config/config.js');
	var cookies = require('../../bivouac/cookies.js');
	var Response = require('../../bivouac/types/response.js').Response;
	var storage = require('../../bivouac/types/storage.js').SimpleStorage();
	var fs = require('fs');
	var Apricot = require('apricot').Apricot;
	
	var lines = JSON.parse(fs.readFileSync(config.controller_location + '/lines_02.json'));
	
	exports.handle = function(req, response, writer) {
		var coo = cookies.read_cookies(req);
		var cook = cookies.find_cookie(req, "STATION");
		
		var val = storage.find(cook.value);
		var parts = val.string.split("/");
		var mustbeabetter;
		for (var i in lines) {
			if (lines[i].code === parts[0]) {
				mustbeabetter = lines[i];
			}
		}
		
		
		var outs;
		if (mustbeabetter !== undefined) {
			for (var j in mustbeabetter.stations) {
				if (mustbeabetter.stations[j].code === parts[1]) {
					outs = mustbeabetter.stations[j].display;
				}
			}
		}

		Apricot.open("http://cloud.tfl.gov.uk/TrackerNet/PredictionDetailed/" + val.string,
        function(err, doc) {
            var responseArr = new Array();
			var searchstr = "P[n='" + decodeURI(val.station) + ">]T"
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
})()