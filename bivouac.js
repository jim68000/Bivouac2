var http = require('http'), fs = require('fs'), url = require('url'), io = require('socket.io');
var biv = require('./bivouac/bivutils.js');
var router = require('./bivouac/router.js');
var config = require('./app/config/config.js');
var Response = require('./bivouac/types/response.js').Response; // Maybe types should be just one module?
var ws = require('./bivouac/ws.js');
var socket = require('./bivouac/socket.js');
var routes = require('./app/config/routes.js');
var shell = require('./bivouac/shell.js');
//set the app up
routes.setup();

var server = http.createServer(function (req, res) {	
	req.startTime = new Date().getTime();
	var build_res = router.resolve(req.url);
	build_res.handle(req, res, ws.writer);
});
server.listen(config.APP_PORT);

if (config.admin_shell) {
	shell.load_shell();
}


if (config.enable_socket) {
	console.log("Socket.io enabled")
	socket.load_server(io.listen(server));
	socket.add_listener("next", function(c){c.broadcast("next")});
}
