(function(){
	
	
	var config = require('../../app/config/config.js');
	var Response = require('../types/response.js').Response;
	var remapper = require('./remapper.js');
	var fs = require('fs');
	exports.VERSION = '0.2';
	exports.is_static = true;
	
	// build_res.handle(req.url, res, ws.writer);
	exports.handle = function(req, res, writer) {
		var required_file = config.static_location + req.url;
		if (required_file.indexOf("?") > -1) {
			required_file = required_file.substring(0,required_file.indexOf("?"));
		}
		fs.stat(required_file, function(err, stat) {
			if (!err) {
				fs.readFile(required_file, function(err, data) {
					if (!err) {
						var filex = required_file.substring(required_file.lastIndexOf(".")+1);
						var response = Response(data, '200', config.mimes[filex]);
						writer(req, res, response);	
					} else if (err.code === 'EISDIR'){ 
						if (config.list_dirs) {
							fs.readdir(required_file, function(err, list) {
								writer(req, res, Response(list.join('<br>')));
							});
						} else {
							remapper.handle(req, res, writer); // adds the default name and returns to this file. probably not best
						}
					} else {
						writer(req, res, Response('static.js: static.js: Problem with file ' + req.url + " " + err, '404', 'text/html'));
					}	
				});
			} else {
				writer(req, res, Response('Problem with file ' + req.url + " " + err, 404, 'text/html'));
			}
			
		});
	};
	
	
}).call(this);