(function() {
	var utils = require('../../bivouac/bivutils.js');
    var Response = require('../../bivouac/types/response.js').Response;
	var cookies = require('../../bivouac/cookies.js');
	var storage = require('../../bivouac/types/storage.js').SimpleStorage();
	var url = require('url');
	
	var fs = require('fs');
	exports.version = "0.1";
	exports.handle = function(req, response, writer) {
		var r = url.parse(req.url);
		var q = utils.queries(r.query);
		var uuid = utils.randomUUID();
		storage.save(uuid, {
			"string": q.line + "/" + q.stn,
			"platform": q.dir
		});
		var outs = fs.openSync('/Users/jim/graun/grauniad/urs/' + uuid + ".txt", 'w');
		fs.writeSync(outs, q.line + "/" + q.stn + " " + q.dir, 0, 'utf-8')
		writer(req, response, new Response(JSON.stringify({'status':'OK'}), 200, 'application/json', {'set-cookie': cookies.make_cookie('STATION', uuid, 24 * 60 * 60 * 1000)}));
	}

}).call(this)
