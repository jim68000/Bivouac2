(function() {


	
	exports.make_cookie = function(cookie_name, cookie_value, expires) {
		return cookie_name + "=" + cookie_value + ";" + (new Date(new Date().getTime() + expires)); 
	}
	
	exports.find_cookie = function(req, cookie_name) {
		
		var cooks = exports.read_cookies(req);
		
		var ret_cook = undefined;
		for (var i in cooks) {
			if (cooks[i].name === cookie_name) {
				ret_cook = cooks[i];
			}
		}
		return ret_cook;
	}

	exports.read_cookies = function(req) {
		
		var cookies = [];
		var cook;
		if (req && req.headers && req.headers.cookie) {
			var tcookies = req.headers.cookie.split(';');
			for (var i in tcookies) {
				if (tcookies[i].indexOf(" ") === 0) {
					tcookies[i] = tcookies[i].substring(1)
				}
				cook = tcookies[i].split("=");
				cookies.push({"name": cook[0], "value": cook[1]});
			}
		}
		return cookies;
	}

}).call(this)