var CANVAS = {};

(function canvascreator() {
	var my_el; 
	var canvas = function(el) {
		my_el = el;
		return {
			gc:function() {
				return my_el.getContext('2d');
			},
			duplicate:function(container) {
				var i = new Image();
				i.src = my_el.toDataURL();
				container.appendChild(i);
			},
			replace_with_image:function() {
				var i = new Image();
				i.src = my_el.toDataURL();
				my_el.parentElement.replaceChild(i, my_el);
			}
		}
	}
	
	// todo rename to linear gradient factory
	
	var linearGradient = function(context) {
		var ctx = context;
		return {
			horizontal:function(start, end) {
				var tgrad = ctx.createLinearGradient(0,0,ctx.canvas.width,0);
				tgrad.addColorStop(0, start);
				tgrad.addColorStop(1, end);
				return tgrad;
			}, 
			vertical:function(start, end) {
				var tgrad = ctx.createLinearGradient(0,0,0,ctx.canvas.height);
				tgrad.addColorStop(0, start);
				tgrad.addColorStop(1, end);
				return tgrad;				
			},
			
			horizontal_mid:function(start, end, middle, position) {
				var grad = this.horizontal(start, end);
				grad.addColorStop(position, middle);
				return grad;
			}
			
		}
	}
	
	var shapeFactory = function(context) {
		var ctx = context;
		
		var fill_or_stroke = function(fill, stroke) {
			if (fill !== undefined) {
				ctx.fillStyle = fill;
				ctx.fill();
			}
			if (stroke !== undefined) {
				ctx.strokeStyle = stroke;
				ctx.stroke();
			}
		}
		
		return {
			roundRect:function(x1,y1,x2,y2,radius,fill,stroke) {
				// generalised from Goodman, Canvas Pocket Reference
				ctx.save();
				ctx.beginPath();
				ctx.moveTo((x1+x2/2), y1);
				ctx.arcTo(x2,y1,x2,y2,radius);
				ctx.arcTo(x2,y2,x1,y2,radius);
				ctx.arcTo(x1,y2,x1,y1,radius);
				ctx.arcTo(x1,y1,x2,y1,radius);
				ctx.closePath();
				fill_or_stroke(fill, stroke);
				ctx.restore();
			},
			circle:function(x, y, radius, fill, stroke) {
				ctx.save();
				ctx.beginPath();
				ctx.arc(x, y, radius, 0, Math.PI * 2, false);
				fill_or_stroke(fill, stroke);
				ctx.closePath();
				ctx.restore();
			}
		}
	}
	
	CANVAS.canvas = canvas;
	CANVAS.linearGradient = linearGradient;
	CANVAS.shapeFactory = shapeFactory;
	
}).call(this)