(function(){
	
	var config = require('../app/config/config.js'); // FIXME circular dependency
	
	var fs = require('fs');
	
	var applog_handle = fs.openSync(config.this_loc + '/logs/applog.log', 'a+');
	var weblog_handle = fs.openSync(config.this_loc + '/logs/weblog.log', 'a+');

	const WARN = 2;
	const INFO = 1;
	const DEBUG = 0;
	
	var weblog = function(req, res, code, now) {
		var d = new Date();
		var date_string = d.toUTCString();
		// console.log(req);
		fs.write(weblog_handle, date_string + " " + req.client.remoteAddress + " " + req.url + " " + code + " \"" + req.headers["user-agent"] + "\" " + (now - req.startTime) + "ms\n");
	};
	
	var applog = function(tag, level, message, module) {

		try {
			if (config.log_level <= level) {
				var d = new Date();
				var date_string = d.toUTCString();
				var message = date_string + ": " + tag + (module?" - " + module.filename:"") + ": " + message + "\n";
				fs.write(applog_handle, message);
			}		
		} catch (e) {
			process.stderr.write(e.message);
		}
		

	};
	
	var warn = function(tag, message) {
		applog(tag, WARN, message);
	};
	
	var info = function(tag, message) {
		applog(tag, INFO, message);		
	}
	
	var debug = function(tag, message) {		
		applog(tag, DEBUG, message)
	}
	
	exports.WARN = WARN;
	exports.INFO = INFO;
	exports.DEBUG = DEBUG;
	
	exports.weblog = weblog;
	exports.applog = applog;
	exports.warn = warn;
	exports.info = info;
	exports.debug = debug;
	
}).call(this);