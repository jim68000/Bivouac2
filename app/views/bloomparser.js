
var proc_string = "";
var command = "";
var fil = fs.readFileSync('sample.bloom', 'utf-8');
var chunks = [];

var parse = {};

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

function if_statement(chunk) {
	var outchunk = parse(chunk);
	return {
		"if": outchunk[statement];
		"action":outchunk[rest];
	}
}