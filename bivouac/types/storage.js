(function() {

	var mem = undefined;
	
	function get_mem() {
		if (mem === undefined) {
			mem = {};
		} 
		return mem;
	}
	
	exports.dump_mem = function() {
		return mem;
	}


	exports.version = "0.1";
	exports.Storage = function() {
		return {
			find:function(type, key) {
				// always returns a single item, might not be what you want
			},
			find_all:function(type) {
				// always returns an array
			},
			save:function(type, key, value) {
				
			},
			update:function(type, key, value) {
				
			}, 
			drop:function(type, key) {
				
			}
		}
	};
	exports.SimpleStorage = function() {
		return {
			find:function(key) {
				var mem = get_mem();
				return mem[key];
			},
			find_all:function() {
				var mem = get_mem();
				return mem;
			},
			save:function(key, value) {
				var mem = get_mem();
				mem[key] = value;
			},
			update:function(key, value) {
				this.save(key, value);
			},
			drop:function(type, key) {
				var mem = get_mem();
				delete mem[key];
			}
			
		}
	}

}).call(this)