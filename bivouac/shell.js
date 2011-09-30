var net = require("net");
var repl = require("repl");
var config = require('../app/config/config.js');
var storage = require('./types/storage.js').SimpleStorage();

(function() {

exports.load_shell = function(){
	console.log("starting admin shell");
	net.createServer(function (socket) {
	  var ctx = repl.start("bivouac> ", socket).context;
	  ctx.storage = storage.find_all;
	  ctx.mem = process.memoryUsage;
	}).listen(config.admin_port);
}

}).call(this)