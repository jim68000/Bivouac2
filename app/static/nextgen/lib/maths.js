var maths = {
	map: function(val, orig_high, orig_low, targ_high, targ_low) {
		return (val / (orig_high - orig_low)) * (targ_high - targ_low) + targ_low;
	},
	amax: function(arr) {
		var t = -Infinity;
		for (var i = 0; i < arr.length; i++) {
			if (parseInt(arr[i]) > t) t = parseInt(arr[i])
		}
		return t;
	},
	amin: function(arr) {
		var t = Infinity;
		for (var i = 0; i < arr.length; i++) {
			if (parseInt(arr[i]) < t) t = parseInt(arr[i])
		}
		return t;
	}
	
}