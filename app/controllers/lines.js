(function() {
    var html = require('../../bivouac/html.js');
    var Response = require('../../bivouac/types/response.js').Response;
    var log = require('../../bivouac/logger.js');
	var url = require('url');
	var utils = require('../../bivouac/bivutils.js');
    exports.VERSION = '0.1';
      var Apricot = require('apricot').Apricot;  
	var fs = require('fs');
    var rawlines = fs.readFileSync('/Users/jim/graun/grauniad/app/controllers/lines_02.json', 'utf-8');
    var lines = JSON.parse(rawlines);


    exports.handle = function(req, response, writer) {

        if (req.url.indexOf('lined') > -1) {
			var r = url.parse(req.url);
			var q = utils.queries(r.query);
			console.log(q);
            var optin = "";
            for (var i in lines[q.line].stations) {
                optin += "<option value='" + lines[q.line].stations[i].code + "'>" + lines[q.line].stations[i].display + "</option>";
            }
            var linehtml = "<form method='get' action='saved'><input type='hidden' name='line' value='"+q.line+"'><select name='stn'>" + optin + "</select><input type='submit'></form>";
            writer(req, response, Response(html.doc("Pick a tubeline", linehtml), 200, 'text/html'));

		} else if (req.url.indexOf('saved') > -1) {
			var r = url.parse(req.url);
			var q = utils.queries(r.query);
			
			try {
				Apricot.open("http://cloud.tfl.gov.uk/TrackerNet/PredictionDetailed/"+q.line+"/"+q.stn,
		        function(err, doc) {
					doc.find("p")
					var choices = [];
					
					doc.each(function(e) {
						choices.push(e._attributes._nodes.n._nodeValue);
					});
			

			
			
		            writer(req, response, Response(html.doc("Success", "you picked " + q.line + " and " + q.stn + "they say" + choices.join())));
		        });				
			} catch (e) {
				writer(req, response, Response(html.doc("Error", "apricot doesn't want to talk to you"), 500));
	            
			}

	        
			
			
			
			
			


        } else {
            var optin = "";
            for (var i in lines) {
                optin += "<option value='" + lines[i].code + "'>" + lines[i].full + "</option>";
            }
            var linehtml = "<form method='get' action='lined'><select name='line'>" + optin + "</select><input type='submit'></form>";
            writer(req, response, Response(html.doc("Pick a tubeline", linehtml), 200, 'text/html'));
        }


    };

}).call(this);