//Singleton pattern

(function(){
	var lock; 
	
	
	exports.Getlock = function() {
		return function() {
			if (!lock) {
				lock = Math.random();
			} 
			return lock;
		}
	}
	
	

}).call(this);