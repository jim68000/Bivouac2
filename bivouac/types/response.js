(function(){
	
	// This is supposed to enforce a common payload response
	
	exports.VERSION = '0.1';
	exports.Response = function(payload, code, mime, extras) {
		
		if (!payload) {
			throw new Error("must have a payload")
		}
		
		var rcode = code || "200";
		var rmime = mime || "text/html"; //provide some defaults
		var rextras = extras || false;
		
		return {
			"code": rcode,
			"mime": rmime,
			"payload": payload,
			"extras": rextras
		}
	}
	

	
}).call(this)