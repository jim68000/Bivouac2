
function $(id) {
	if (typeof id === 'string') {
		return document.getElementById(id);
	} else {
		return id;
	}
}


function ilog(msg) {
	$('debug').innerHTML = msg;
}

var xhr = (function XHR() {
	var onerequest = function(url,callback,errorcallback){
		var r = new XMLHttpRequest();
		var d = setTimeout(function(){r.abort();errorcallback();},10000);
		r.onerror=errorcallback;
		r.onreadystatechange = function(){
			if(r.readyState==4&&r.status==200){
				clearTimeout(d);
				callback(r.responseText);
				}
			if(r.readyState==4&&r.status!=200){
				clearTimeout(d);
				errorcallback(r.status + " " + r.responseText);
			}
		};
		r.open("GET",url,true);
		r.send(null);
	}
	
	return {
		once: onerequest
	}
})();

	
	
var cw = (function ClassWrangler() {
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
	}
	return {
		contains: containsClass,
		add: addClass,
		remove: removeClass
	}	
})();	
	
