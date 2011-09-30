(function() {
    var html = require('../../bivouac/html.js');
    var Response = require('../../bivouac/types/response.js').Response;
    var log = require('../../bivouac/logger.js');
	var url = require('url');
	var utils = require('../../bivouac/bivutils.js');
    var magick = require('imagemagick');
	var fs = require('fs');
	var TAG = "RESIZER";


	// could still be cleverer
    exports.handle = function(req, response, writer) {
		magick.convert(['test.jpg', '-resize', '75x120', '-crop', '50x50', 'test-crop.jpg'], function(err, metadata){ if (err) throw err; console.log('stdout:', metadata);}) };

}).call(this);