var dHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);
console.log(dHeight);

//resize event

document.body.style.width = document.body.clientWidth;

document.body.onresize = function () {
	document.body.style.width = document.body.clientWidth;
}

//scroll event

function addOnWheel(elem, handler) {
	if (elem.addEventListener) {
		if ('onwheel' in document) {
		  // IE9+, FF17+
			elem.addEventListener("wheel", handler);
		} else if ('onmousewheel' in document) {
			// устаревший вариант события
			elem.addEventListener("mousewheel", handler);
		}else {
			// 3.5 <= Firefox < 17, более старое событие DOMMouseScroll пропустим
			elem.addEventListener("MozMousePixelScroll", handler);
		}
	} else { // IE8-
		document.attachEvent("onmousewheel", handler);
	}
}

var scroll = -1;
var positions = document.getElementsByTagName('section');
var time = true;

addOnWheel(document, function(e) {
	var delta = e.deltaY || e.detail || e.wheelDelta;
	
	if (time) {
		if (delta < 0) {
			if (scroll > 0) {
				scroll -= 1;
				document.body.style.top = -H(positions[scroll]) + 'px';
				animate_section(positions[scroll]);
			} else if (scroll == 0) {
				scroll = -1;
				document.body.style.top = '0px';
			}
		} else {
			if ((positions.length - 1) > scroll) {
				scroll += 1;
				document.body.style.top = -H(positions[scroll]) + 'px';
				animate_section(positions[scroll]);
			} else if ((positions.length - 1) == scroll) {
				document.body.style.top = -dHeight + window.innerHeight + 'px';
				scroll = positions.length;
			}
		}
	}
	time = false;
	setTimeout( function() {time = true;}, 1000);
	console.log(scroll);
	//e.preventDefault(); // отменим прокрутку
});

function H(elem) {
	var cHeight = elem.offsetHeight;
	var oHeight = elem.offsetTop;
	var wHeight = window.innerHeight;
	console.log(cHeight + ' ' + oHeight + ' ' + (oHeight + cHeight/2 - wHeight/2));
	return oHeight + cHeight/2 - wHeight/2;
}

// animation

function animate_section(elem) {
	var img = (elem.getElementsByClassName('img'))[0];
	var content = (elem.getElementsByClassName('content'))[0];
	if (img.style.right)
		img.style.right = '0%';
	if (img.style.left)
		img.style.left = '0%';
	// if (content.style.right)
		// content.style.right = '0%';
	// if (content.style.left)
		// content.style.left = '0%';
}

animate_section(positions[0]);