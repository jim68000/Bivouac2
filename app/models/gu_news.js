(function(){	
	exports.VERSION = '0.1';	
	exports.Model = function(date, title, body, page) {
		 return {
			date:date,
			title:title,
			body:body,
			page_number:page
		}
	}
	
}).call(this);