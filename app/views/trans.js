var d0 = new Date().getTime();

var fs = require('fs');
var fil = fs.readFileSync('out.json', 'utf-8');



var obj = JSON.parse(fil);

console.log(obj);




var d1 = new Date().getTime();

console.log("time is " + (d1 - d0));