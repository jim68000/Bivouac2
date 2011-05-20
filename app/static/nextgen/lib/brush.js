var BRUSH = {};

(function(){
	
	var initY, endY, pageInitY, currtop;
	var storedEvent;
	var tweakiness = 2;
	var anim_thread;
	var thumb;
	var inside;

	var touched_start = function(e) {
		make_thumb_visible();
		e.stopPropagation();
		e.preventDefault();					
		initY = e.touches[0].pageY;
		pageInitY = e.layerY;
		storedEvent = e;
	}

	var touched_end = function(e) {
		
		endY = pageInitY - e.layerY;
		ilog("endY = " + endY + "<br>pageInitY = " + pageInitY + "<br>e.layerY = " + e.layerY);
		
		if (Math.abs(endY) < tweakiness) {				
			var evo = document.createEvent('TouchEvent');
			evo.initEvent('touched', true, false);
			for (var i in storedEvent) {
				evo[i] = storedEvent[i];
			}
			var ev = e.target.dispatchEvent(evo);
			hide_thumb();
		} else {
			var its = 10;
			var incrementor = endY/its;
			anim_thread = setInterval(function() {
				currtop = currtop + incrementor;
				incrementor *= 0.8;
				inside.style.top = (currtop, -260, 100);
				console.log(currtop);
				its--;
				if (its < 0) {
					clearInterval(anim_thread);
				}
			}, 20
			);
			hide_thumb();
		}
		

	}

	var pos = function(num, lowlim, uplim) {
		var retnum = num;
		if (num > uplim) retnum = uplim;
		if (num < lowlim) retnum = lowlim;
		return retnum + 'px';
	}

	var touchmov = function(e) {
		currtop = e.touches[0].pageY - initY;
		// thumb needs to move proportionally to the main body
		// its a remap issue - thumb y = mainy / (totmain - visible bit) * visible bit height
		// plus, it needs to move the other way
		inside.style.top = pos(currtop, -260, 0);
		thumb.style.top = pos(-currtop, 0, 260);
		ilog("CURRTOP = " + currtop + "<br>initY = " + initY);
		
	}

	var proctouch = function(e) {
		var myev = document.createEvent('MouseEvent');
		myev.initEvent('click', true, false);
		e.target.dispatchEvent(myev);
	}
	
	
	var make_thumb_visible = function() {
		cw.add(thumb, "thumb_visible")
	}
	
	var hide_thumb = function() {
		cw.remove(thumb, "thumb_visible");
	}
	
	var addScroll = function(container, slider) {


		inside = slider;

		container.addEventListener('touchstart', touched_start, false);
		container.addEventListener('touchend', touched_end, false);
		container.addEventListener('touchmove', touchmov, false);
		container.addEventListener('touched', proctouch, false);				


		thumb = document.createElement('div');
		thumb.id = 'thumb_' + container.id;
		thumb.className = 'thumb';
		container.appendChild(thumb);
		return thumb.id + ' created';
		
	}
	
	

	BRUSH.addScroll = addScroll;
	
	
}).call(this);




