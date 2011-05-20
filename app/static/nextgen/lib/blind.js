var obj, hidden_obj, open_func;
var last_touch;


function make_blind(o, h, f) {
	open_func = f;
	obj = o;
	hidden_obj = h;
	obj.addEventListener('touchstart', touched_start, false);
	obj.addEventListener('touchend', touched_end, false);
	obj.addEventListener('touchmove', touchmov, false);
}

function touched_start(ev) {
	ev.stopPropagation();
	ev.preventDefault();
	hidden_obj.style.display = 'block';
	last_touch = 0;
	cw.remove(hidden_obj, 'latched_open');
	cw.remove(hidden_obj, 'latched_closed');
	
}

function touchmov(ev) {
	hidden_obj.style.height = (ev.touches[0].clientY - hidden_obj.offsetTop) + "px";
	last_touch =  (ev.touches[0].clientY - hidden_obj.offsetTop);
}

function touched_end(ev) {
	if (last_touch > 120) {
		latch_open();
	} else if (last_touch < 120) {
		close_blinds();
	}
}

function latch_open() {
	cw.add(hidden_obj, 'latched_open');
	hidden_obj.style.height = "120px"; // hmmm
	setTimeout(open_func, 100);
}

function close_blinds() {
	cw.remove(hidden_obj, 'latched_open');
	cw.add(hidden_obj, 'latched_closed');
	setTimeout(function() {
		hidden_obj.style.display = "none";
	}, 200);
}