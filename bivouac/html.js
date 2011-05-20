(function(){
		
	exports.VERSION = '0.1';	

	var html = function(inner) {
		return "<html>" + inner + "</html>";
	};

	var head = function(title) {
		return "<head><title>" + title + "</title></head>";
	};
	
	var body = function(content) {
		return "<body>" + content + "</body>";
	};
	
	var doc = function(title, content) {
		return html(head(title) + body(content));
	};


	exports.html = html;

	exports.head = head;
	
	exports.body = body;
	
	exports.doc = doc;
	
}).call(this);