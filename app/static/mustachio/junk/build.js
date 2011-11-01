var mustache = require('mustache');
var fs = require('fs');

var template = fs.readFileSync(process.argv[2], 'UTF-8');
var view = require(__dirname + "/" + process.argv[3]);

console.log(mustache.to_html(template, view.view));