(function() {
    var html = require('../../bivouac/html.js');
    var Response = require('../../bivouac/types/response.js').Response;
    var log = require('../../bivouac/logger.js');
	var url = require('url');
	var utils = require('../../bivouac/bivutils.js');
	var fs = require('fs');
	exports.VERSION = '0.1';
	var TAG = "READER";
	var scraper = require('scraper');


	// could still be cleverer
    exports.handle = function(req, response, writer) {

		var opts = {};
		var quer = url.parse(req.url, true).query;
		log.info(TAG, req.url);
		opts.dstPath = "tmp/" + quer.uri.replace(/\W/g, '') + ".txt";
		opts.srcPath = encodeURI(quer.uri);
		opts.locs = {};
		opts.locs.h1 = "";
		opts.locs.h2 = "";
		opts.locs.pars = "";
		opts.locs.img = "";
		
		if (opts.srcPath.indexOf('spiegel.de') !== -1) {
			opts.locs.h1 = "#spArticleColumn > h1";
			opts.locs.h2 = "#spArticleColumn > h2";
			opts.locs.pars = "#spArticleColumn > p";
			opts.locs.img = "#spArticleTopAsset > .spArticleImageBox > a > img";			
		}
		
		if (opts.srcPath.indexOf('localhost') !== -1) {
			opts.locs.h1 = "#outs > h1";
			opts.locs.h2 = "#outs > h2";
			opts.locs.pars = "#outs > p";
			opts.locs.img = "#spArticleTopAsset > .spArticleImageBox > a > img";			
		}		

		
		function get_text_or(text_args, callback, failback) {
			fs.readFile(text_args.dstPath, 'utf-8', function(err, fd) {
				if (err) {
					failback(text_args.dstPath);
				} else {
					callback(fd);
				}
			});
		}

		function return_text(file_handle) {
				file_handle = "reader_callback(" + file_handle + ");";
				writer(req, response, Response(file_handle, 200, 'text/javascript; charset=UTF-8', {'Expires': new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365).toString(), 'Encoding': 'UTF-8', 'Hello': 'Jake'}));
		}
		
		function fetch_text() {
			scraper({
						'uri':opts.srcPath,
						'headers': {
							'User-Agent': 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 5_0b like Mac OS X; en-us) AppleWebKit/592.1 (KHTML, like Gecko) Version/5.0b1 Mobile/8B833 Safari/6827.20.1',
							'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
							'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
						},
						'encoding': 'binary'
						
					}, function(err, $) {
				if (err) {
					// it's an error
					fail_it();
				} else {
					
					
					var resp = {};

					resp.h1 = null;
					resp.h2 = null;
					resp.pars = [];
					resp.img = null;

					$(opts.locs.h1).each(function() {
						resp.h1 = $(this).text().trim();
					});

					$(opts.locs.h2).each(function() {
						resp.h2 = $(this).text().trim();
					});

					try {
							resp.img =  $(opts.locs.img)[0]._attributes._nodes.src._nodeValue; // not good
					} catch (e) {
						log.warn(TAG, e.message);						
					}

					$(opts.locs.pars).each(function() {
						resp.pars.push($(this).text().trim());
					});
					
					
					fs.writeFile(opts.dstPath, JSON.stringify(resp), 'utf-8', function(err) {
						if (err) fail_it("Failed to write cached file");
						get_text_or(opts, return_text, fail_it);	
						
					});
				}



			});

		}
		
		function fail_it(mess) {
			var message = (mess) ? mess : "An error has occurred";
			writer(req, response, Response(message, 500, "text/html"));
		}


		
		try {
			get_text_or(opts, return_text, fetch_text);
		} catch (e) {
			log.warn(TAG, e.message);
			fail_it("General failure");
		}
		
    };

}).call(this);