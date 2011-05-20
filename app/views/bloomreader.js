var fs = require('fs');

var obj = {
	"name":"Jim Smith",
	"home": "Hanwell", 
	"reason": false
};

function handle_if(args) {
	return obj[args];
}

var proc_string = "";
var command = "";
var fil = fs.readFileSync('sample.bloom', 'utf-8');
var chunks = [];

var processing = true;

while (processing) {
	var proc_start = fil.indexOf('((');
	
	if (proc_start == -1) {
		processing = false; // no more commands embedded
		chunks.push(fil);
	} else {
		chunks.push(fil.slice(0, proc_start));
		fil = fil.substr(proc_start);
		var proc_end = fil.indexOf('))');
		chunks.push(fil.slice(0, proc_end+2));
		fil = fil.substr(proc_end+2);		
	}
}

for (i in chunks) {
	var considered = chunks[i];
	if (considered.indexOf("((=") == 0) {
		considered = considered.replace("((=", "").replace("))", ""); // strip command encapsulation
		if (considered.indexOf("{") == 0) {
			considered = considered.replace("{", "").replace("}", ""); //strip the eval encaps
			chunks[i] = eval(considered);
		} else {
			chunks[i] = obj[considered];
		}
	} else if (considered.indexOf("((") == 0) {
		considered = considered.replace("((", "").replace("))", ""); // strip command encapsulation
		if (considered.indexOf("if") == 0) {
			var result = handle_if(considered.substr(3));
			chunks[i] = "if statement";
			console.log(result);
			if (!result) {
				chunks[i+1] = "";
			}
		}
	}
}

console.log(chunks.join(""));