(function() {
    var html = require('../../bivouac/html.js');
    var Response = require('../../bivouac/types/response.js').Response;
    var log = require('../../bivouac/logger.js');
	var url = require('url');
	var utils = require('../../bivouac/bivutils.js');
    var magick = require('imagemagick');
	var fs = require('fs');
	exports.VERSION = '0.1';
	var TAG = "RESIZER";


	// could still be cleverer
    exports.handle = function(req, response, writer) {

		var opts = {};
		var quer = url.parse(req.url, true).query;
		log.info(TAG, req.url);
		opts.dstPath = "tmp/" + quer.uri.replace(/\W/g, '');
		opts.srcPath = encodeURI(quer.uri);
		opts.width = 0;
		opts.height = 0;
		opts.format = 'jpg';
		opts.croph = quer.croph;
		opts.cropw = quer.cropw;
		
		if (opts.srcPath.indexOf('spiegel.de') !== -1) {
			opts.srcPath = encodeURI(opts.srcPath.replace('thumbsmall', 'thumb'));
		}
		
		if (opts.srcPath.indexOf('faz.net') !== -1) {
			opts.srcPath = encodeURI(opts.srcPath.replace('File2', 'g300_4'));
		}
		//opts.srcPath = opts.srcPath);
		
		if (quer.width) {
			opts.width = quer.width;
			opts.dstPath += opts.width + "x"; 
		}
		if (quer.height) {
			opts.height = quer.height;
			opts.dstPath += opts.height;
		}
		
		opts.dstPath += 'cw' + opts.cropw + 'ch' + opts.croph;
		
		function get_image_or(magick_args, callback, failback) {
			fs.readFile(magick_args.dstPath, function(err, fd) {
				if (err) {
					failback(magick_args.dstPath);
				} else {
					callback(fd);
				}
			});
		}

		function return_image(file_handle) {
			if (file_handle === undefined || file_handle.length === undefined || file_handle.length < 100) { 
				writer(req, response, Response("err", 500, "text/html"));
			} else {
				writer(req, response, Response(file_handle, 200, 'image/jpeg', {'Expires': new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365).toString()}));
			}
		}
		
		function fetch_image() {
			var scalestr = '';
			if (opts.width === 0) {
				scalestr = 'x' + opts.height;
			} else if (opts.height === 0) {
				scalestr = opts.width;
			} else {
				scalestr = opts.width + 'x' + opts.height;
			}
			
			var cropstr = opts.cropw + 'x' + opts.croph + '+0+0';
			
			magick.convert([opts.srcPath, '-gravity', 'center', '-resize', scalestr, '-crop', cropstr, opts.dstPath], function(err, stdout, stderr) { if (err) {
			
			//magick.resize(opts, function(err, stdout, stderr) { if (err) {
				log.warn(TAG, err);
			}
			get_image_or(opts, return_image, fail_it); });
		}
		
		function fail_it() {
			writer(req, response, Response("err", 500, "text/html"));
		}


		
		try {
			get_image_or(opts, return_image, fetch_image);
		} catch (e) {
			log.warn(TAG, e.message);
			fail_it();
		}
		
    };

}).call(this);