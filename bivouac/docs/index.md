bivouac
=======

Bivouac is my attempt to wrap node with some functionality to make it easy for me to develop web apps. As such it could be regarded as web framework - or will be when I've put the two missing bits in, templating and model management.

To use you need to write a simple app that looks like the below:


	var http = require('http'), fs = require('fs'), url = require('url');
	var biv = require('./bivutils.js');
	var router = require('./router.js');
	var config = require('./config/config.js');
	var Response = require('./types/response.js').Response; // Maybe types should be just one module?
	var static_handler = require('./static.js');


	//set the app up
	router.add_route(/.*mybeer.*/, "beer.js");
	router.add_route(/.*broken.*/, "broken.js");
	router.add_route(/beer.html/, "beer.js");
	router.add_route(/store.*/, static_handler);
	router.add_route(/.*favicon.ico.*/, static_handler);
	router.add_route(/.*.html/, static_handler); 
	router.add_route(/\/.*/, "index.js");


	http.createServer(function (req, res) {	
		var build_res = router.resolve(req.url);
		// TODO can the below be done async?
		var tres = build_res.handle(req.url);
		res.writeHead(tres.code, {'Content-Type': tres.mime});
		res.write(tres.payload);
		res.end();
		biv.log(req, res, tres);
	}).listen(8124);
	
The requires lines do the following:

var http = require('http'), fs = require('fs'), url = require('url');

As we're writing a web app that uses the file system, we import the relevant bits of nodes

	var biv = require('./bivutils.js');

bivutils provides logging and the ability to split query strings

	var router = require('./router.js');

The router maps incoming URLs to bits of the bivouac app. 

	var config = require('./config/config.js');

Stores our local config

	var Response = require('./types/response.js').Response;
	
This is an interface definition for reponses, in an attempt to ensure that all responses have an http response and mime-type. You don't have to use this so long as you respect the definition.

	var static_handler = require('./static.js');
	
This is the  handler for non-dynamic files - flat HTML, images, CSS. 

After the imports we set up some mappings between URLs and controllers. These are in two forms:

	router.add_route(/.*mybeer.*/, "beer.js");
	
Defines a regular expression that will pass the request to a controller called "beer.js"

TODO: we need to pass the whole request to dynamic controllers so they can inspect things like headers

	router.add_route(/store.*/, static_handler);
	
Defines a regex that will pass control to the static handler

Handlers should be more specific at the top of the block:

	router.add_route(/beer.html/, "beer.js");
	...
	router.add_route(/.*.html/, static_handler);
	
This example means that a request for beer.html will pass to beer.js, but that all requests ending html will pass to the static controller for resolution. Because beer.html triggers first and captures the request we never get to the more generic handler.