var base, dest, node_client,
count = 0,
url = require('url'),
util = require('util'),
http = require('http'),
http_client = require('http'),
request = require('request'),
events = require('events'),  
httpProxy = require('./lib/node-http-proxy'),

data_emitter = new events.EventEmitter();

httpProxy.createServer(9000, 'localhost').listen(8000);

http.createServer(function (req, res) {

    if(!count)
    { 
        base = url.parse(req.url).pathname;
        node_client = http_client.createClient(80, base);
        count++;
    } else {
        dest = req.url.substr(1, req.url.length -1);
    }

    request = node_client.request("GET", dest, {"host": base});
    request.addListener("response", function (response) {
        var body = "";
        response.addListener("data", function (data) {
            body +=data;
        }); 

        response.addListener("end", function () {
            var out = JSON.parse(body);
            if(out.length > 0) {
                data_emitter.emit("out", out);
            }
        });
    });

   // request.close();

    var listener = data_emitter.addListener("data", function(out) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(JSON.stringify(out));
        res.close();
    });



}).listen(9000);