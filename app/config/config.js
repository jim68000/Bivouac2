(function(){
	
	var this_loc = "/Users/jim/graun/grauniad";
	var appdir = "/app";
	
	exports.list_dirs = false;
	exports.list_dirs_fallback = true;
	exports.VERSION = '0.1';	
	exports.APP_PORT = "8124";
	exports.controller_location = this_loc + appdir + "/controllers/";
	exports.this_loc = this_loc;
	exports.appdir = appdir;
	exports.static_location = this_loc + appdir + "/static";
	exports.enable_route_mem_cache = true;
	exports.deployment = "development";
	exports.default_file = "index.html";
	exports.enable_socket = false;
	exports.log_level = 0; // FIXME point to external config
	exports.mimes = {
		"html": "text/html",
		"ico": "image/vnd.microsoft.icon",
		"css": "text/css",
		"jpg": "image/jpeg",
		"png": "image/png",
		"gif": "image/gif",
		"js": "text/javascript",
		"json": "text/plain", 
		"pdf": "application/pdf"
	};
	exports.bloom = {
		"start_delimiter": "((",
		"end_delimiter": "))",
		"vm_start_delimiter": "{",
		"vm_end_delimiter": "}",
		"inplace_variable_indicator": "="   
	};
	
}).call(this);
