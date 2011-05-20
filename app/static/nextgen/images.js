var lastX = -1;
var lastY = -1;

var initdist = -1;

function resetinits(el) {
    el.target.style.height = "100%";
    lastX = lastY = initdist = -1;
}


function initdistF(el) {
    if (el.touches.length > 1) {
        var nowX = Math.abs(el.touches[0].clientX - el.touches[1].clientX);
        var nowY = Math.abs(el.touches[0].clientY - el.touches[1].clientY);
        initdist = Math.sqrt(nowX * nowX + nowY * nowY);
    }
}


function decorate(el) {
    if (el.touches.length > 1) {
        el.preventDefault();
        var nowX = Math.abs(el.touches[0].clientX - el.touches[1].clientX);
        var nowY = Math.abs(el.touches[0].clientY - el.touches[1].clientY);
        if (lastX != -1) {
            var nowX = Math.abs(el.touches[0].clientX - el.touches[1].clientX);
            var nowY = Math.abs(el.touches[0].clientY - el.touches[1].clientY);
            var dist = Math.sqrt(nowX * nowX + nowY * nowY);
            var olddist = Math.sqrt(lastX * lastX + lastY * lastY);
            el.target.style.height = 100 * (olddist / initdist) + "%";
			$('outslider').style.height = 100 * (olddist / initdist) + "%";
        }
        lastX = nowX;
        lastY = nowY;
    }
}

function showImgs(res) {
    var slider = $('photoslider');
    var imgs = JSON.parse(res);
    iteration(imgs,
    function(it) {
        var i = new Image();
        i.src = "imgs/" + it;
        i.addEventListener("touchstart", initdistF, true, true);
        i.addEventListener("touchmove", decorate, true, true);
        i.addEventListener("touchend", resetinits, true, true);
        i.onload = function() {
            slider.appendChild(i);
        }

    });
}

function report(mess) {
	console.log(mess);
}

xhr.once("imagedata.js", showImgs, report);
