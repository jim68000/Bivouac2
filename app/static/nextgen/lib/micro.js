
function $(id) {
	if (typeof id === 'string') {
		return document.getElementById(id);
	} else {
		return id;
	}
}


function ilog(msg) {
	$('debug').innerHTML += msg + "<br>";
}

var xhr = (function XHR() {
	var onerequest = function(url,callback,errorcallback){
		var r = new XMLHttpRequest();
		var d = setTimeout(function(){r.abort();e();},10000);
		r.onerror=errorcallback;
		r.onreadystatechange = function(){
			if(r.readyState==4&&r.status==200){
				clearTimeout(d);
				callback(r.responseText);
				}
			if(r.readyState==4&&r.status!=200){
				clearTimeout(d);
				errorcallback('got a ' + r.status);
			}
		};
		r.open("GET",url,true);
		r.send(null);
	}
	
	return {
		once: onerequest
	}
})();

	
	
var cw = (function StyleWrangler() {
	var splitClasses = function(classString) {
		return classString.split(" ");
	};
	
	var containsClass = function(el, qlass) {
		if (el.className) {
			var chlasses = el.className.split(" ");
			var found = false;
			for (var i = 0; i < chlasses.length; i++) {
				if (chlasses[i] == qlass) {
					found = true;
				}
			}		
			return found;					
		} else {
			return false;
		}
	};
	
	var addClass = function(el, qlass) {
		if (!containsClass(el, qlass)) {
			el.className += " " + qlass;
		}
	};
	var removeClass = function(el, qlass) {
		console.log(el.className);
		var chlasses = splitClasses(el.className);
		console.log(chlasses);
		var retchlasses = new Array();
		for (var i = 0; i < chlasses.length; i++) {
			if (chlasses[i] != qlass) {
				retchlasses.push(chlasses[i]);
			}
			
		}
		el.className = retchlasses.join(" ");
	};
	
	var getPixels = function(len) {
		var num = 0;
		if (len.indexOf('px') > -1) {
			try {
				num = parseInt(len.substring(0, len.indexOf('px')));				
			} catch (e) {
				console.log(e.message)
			}
		} else {
			console.log("No px");
		}
		return num;
	}
	
	return {
		contains: containsClass,
		add: addClass,
		remove: removeClass,
		getPixels: getPixels
	}	
})();	
	
