(function(){
	
	// This is supposed to enforce a common payload response
	
	exports.VERSION = '0.1';
	exports.Response = function(payload, code, mime) {
		
		if (!payload) {
			throw new Error("must have a payload")
		}
		
		var rcode = code || "200";
		var rmime = mime || "text/html"; //provide some defaults
		
		return {
			"code": rcode,
			"mime": rmime,
			"payload": payload
		}
	}
	

	
}).call(this)