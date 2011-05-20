var d0 = new Date().getTime();

var fs = require('fs');
var fil = fs.readFileSync('if.bloom', 'utf-8');
// JSON doesn't like tabs
// or quotes
fil = fil.replace(/\t/g, "    ").replace(/"/g, "\\\"");
// split into lines TODO if this is right approach - windows CRLF
var lines = fil.split(/\n/);

function parse(remlines) {
	console.log(typeof remlines);
	var indent = 0;
	var myobj = "[\"HTML\"";


	for (var i = 0; i < remlines.length; i++) {
		if (remlines[i].indexOf("((end") > -1) {
			myobj += "}";
			indent--;
			if (indent === 0) myobj += ",";
			continue;
		}
		
		
		
		if (remlines[i].indexOf("((=") > -1) {
			myobj += ",{\"value\": " + "\"" +   (remlines[i].replace("((=", "").replace("))", "").replace(/^ */, "")) + "\"}";
			continue;
		}
		
		if (remlines[i].indexOf("((if") > -1) {
			indent++;
			if (indent > 1) {
				myobj += ", \"nestedif\": ";
				myobj += "{\"if\": \"" + remlines[i].replace("((if ", "").replace("))", "") + "\"\n";
			} else {
				myobj += ", {\"if\": \"" + remlines[i].replace("((if ", "").replace("))", "") + "\"\n";
			}
		} else {
			if (indent > 0) {
				myobj += ", \"content\": ";
				myobj += '"' + remlines[i] + "\"\n";	
			} else {
				myobj += ', "' + remlines[i] + "\"\n";	
			}
			
				
			
		}
				
	}
	myobj += "]";
	//myobj = myobj.replace(",,", ",");
	fs.writeFileSync("temp.json", myobj, 'utf-8');
	console.log(myobj);
	return JSON.parse(myobj);
	// return myobj;
}


var obj = parse(lines);

console.log(obj);

fs.writeFileSync("out.json", JSON.stringify(obj), 'utf-8');

var d1 = new Date().getTime();

console.log("time is " + (d1 - d0));