var d0 = new Date().getTime();

var fs = require('fs');
var fil = fs.readFileSync('if.bloom', 'utf-8');
var lines = fil.split("\n");

var curr_if = "";

function parse(inlines, startAt) {
	console.log(startAt);
	var linenum = startAt;
	
	var obj = [];
	
	while (linenum < inlines.length) {



		if (inlines[linenum].indexOf("((if") > -1) {
			var anon_inner = {"if" : inlines[linenum].replace("((if ", "").replace("))", "")};
			var statement = [];
			for (var j = linenum+1; j < inlines.length; j++) {
				if (inlines[j].indexOf("((end if))") == -1) {
					linenum = obj.push(parse(inlines, linenum))[1];
				} else {
					linenum = j;
					anon_inner.action = statement;
					obj.push(anon_inner);
					break;
				}
			}
		} else {
			obj.push(inlines[linenum]);
		}
		linenum++;
	}
	return [obj, linenum];
	
}

var outobj = parse(lines, 0)[0];


console.log(outobj);

var d1 = new Date().getTime();

console.log("time is " + (d1 - d0));