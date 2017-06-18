var dHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);
console.log(dHeight);
var footer = document.getElementsByTagName('footer')[0];

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

document.onkeydown = buttonPress;

var scroll = -1;
var positions = document.getElementsByTagName('section');
var time = true;

addOnWheel(document, function(e) {
	var delta = e.deltaY || e.detail || e.wheelDelta;
	
	if (time) {
	    time = false;
		if (delta < 0) {
			if (scroll > 0) {
			    scrollDown();
			} else if (scroll == 0) {
			    scrollTop();
			}
		} else {
			if ((positions.length - 1) > scroll) {
			    scrollUp();
			} else if ((positions.length - 1) == scroll) {
			    //scrollBottom();
			}
		}
		setTimeout(function () { time = true; }, 1000);
	}
	//console.log(scroll);
	//e.preventDefault(); // отменим прокрутку
});

function buttonPress(e) {
    console.log(e.keyCode);
    if (time) {
        time = false;
        if (e.keyCode == 38) {
            if (scroll > 0) {
                scrollDown();
            } else if (scroll == 0) {
                scrollTop();
            }
        } else if (e.keyCode == 40) {
            if ((positions.length - 1) > scroll) {
                scrollUp();
            } else if ((positions.length - 1) == scroll) {
                //scrollBottom();
            }
        }
        setTimeout(function () { time = true; }, 1000);
    }
}

function scrollDown() {
    scroll -= 1;
    document.body.style.top = -H(positions[scroll]) + 'px';
    animate_section(positions[scroll]);
}

function scrollTop() {
    scroll = -1;
    document.body.style.top = '0px';
}

function scrollUp() {
    scroll += 1;
    document.body.style.top = -H(positions[scroll]) + 'px';
    animate_section(positions[scroll]);
}

function scrollBottom() {
    
    document.body.style.top = -footer.offsetTop - footer.clientHeight + window.innerHeight + 'px';
    scroll = positions.length;
}

function H(elem) {
	var cHeight = elem.clientHeight;
	var oHeight = elem.offsetTop;
	var wHeight = window.innerHeight;
	console.log(cHeight + ' ' + oHeight + ' ' + wHeight + ' ' + (oHeight + cHeight/2 - wHeight/2));
	return oHeight + cHeight/2 - wHeight/2;
}

// animation

function animate_section(elem) {
	var img = (elem.getElementsByClassName('img'))[0];
	var content = (elem.getElementsByClassName('content'))[0];
	if (img && content) {
	    if (img.style.right)
	        img.style.right = '0%';
	    if (img.style.left)
	        img.style.left = '0%';
	    if (content.style.right)
	        content.style.right = '0%';
	    if (content.style.left)
	        content.style.left = '0%';
	}
}

animate_section(positions[0]);

function s() {
    document.body.style.top = "-6000px";
    scroll = 7;
}