(function() {
    var io = require('socket.io');
	var patterns = [];

	exports.add_listener = function(pattern, func) {
		patterns[pattern] = func;
	};

	exports._dump = function() {
		console.log(patterns);
	};

    exports.load_server = function(socket) {
        socket.on('connection',
        function(client) {

            // new client is here!
            client.on('message', function(m) {
				if (patterns[m] !== undefined) {
					// console.log(client);
					patterns[m](client);
				}

            });

            client.on('disconnect',
            function() {
                console.log("gone")
            });
        });
    };




}).call(this);


