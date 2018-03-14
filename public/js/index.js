window.f = 0;
function showa(event) {//这儿之前用的是show，感觉不太好，但是可以用
	var translateY = 0;
	var e = event || window.event;
	var a = $('.stage').width() / 2;
	var b = a - e.clientX;
	b = (b / a) * 3;
	j=b * 0.01 * a * 2;
	b = b+"%";
	$('.inner-layer').css({
			transform: 'translate3d(' + b + ', ' + translateY + 'px, 0)',
			'-webkit-transform': 'translate3d(' + b + ', ' + translateY + 'px, 0)',
			'-moz-transform': 'translate3d(' + b + ', ' + translateY + 'px, 0)',
			'-ms-transform': 'translate3d(' + b + ', ' + translateY + 'px, 0)'
	})
};
function isMobileDevice() {//https://coderwall.com/p/i817wa/one-line-function-to-detect-mobile-devices-with-javascript
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};
function clicktomove(k) {
	j = window.f;	
	var tran = new Array(0, -402, -803);
	if (k == 0) { //左点击
		if (j != 0) {
			j--;
		}
	} else if (k == 1) { //右点击
		if (j != 2) {
			j++;
		}
	}
	$(".slides").animate({left:tran[j] + 'px'});
	/*
	translateY = 0;
	Modernizr.csstransforms3d ? $('.slides').css({
		transform: 'translate3d(' + tran[j] + 'px,' + translateY + 'px, 0)',
		'-webkit-transform': 'translate3d(' + tran[j] + 'px,' + translateY + 'px, 0)',
		'-moz-transform': 'translate3d(' + tran[j] + 'px,' + translateY + 'px, 0)',
		'-ms-transform': 'translate3d(' + tran[j] + 'px,' + translateY + 'px, 0)'
	}) : $('.slides').css({
		left: tran[j] + 'px',
	})*/
	window.f = j;
};
function abc() {
	var canvas = document.querySelector('canvas'),
	ctx = canvas.getContext('2d');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvas.style.display = 'block';
	ctx.lineWidth = 0.1;
	color = '#00f1a3';
	var dots = {
		nb: 380,
		distance: 80,
		d_radius: 150,
		array: [
		]
	};
	function Dot() {
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;
		this.vx =  - 0.5 + Math.random();
		this.vy =  - 0.5 + Math.random();
		this.radius = Math.random();
		if (canvas.width > 768) {
			this.radius *= 1.9;
		}
	}
	Dot.prototype = {
		create: function () {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			ctx.fill();
		},
		animate: function () {
			for (i = 0; i < dots.nb; i++) {
				var dot = dots.array[i];
				if (dot.y < 0 || dot.y > canvas.height) {
					dot.vx = dot.vx;
					dot.vy =  - dot.vy;
				} else if (dot.x < 0 || dot.x > canvas.width) {
					dot.vx =  - dot.vx;
					dot.vy = dot.vy;
				}
				dot.x += dot.vx;
				dot.y += dot.vy;
			}
		},
		line: function () {
			for (i = 0; i < dots.nb; i++) {
				for (j = 0; j < dots.nb; j++) {
					i_dot = dots.array[i];
					j_dot = dots.array[j];
				}
			}
		}
	};
	function createDots() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = color;
		ctx.strokeStyle = color;
		for (i = 0; i < dots.nb; i++) {
			dots.array.push(new Dot());
			dot = dots.array[i];
			dot.create();
		}
		dot.line();
		dot.animate();
	}
	setInterval(createDots, 65);
};
function closenews() {
	$(".news").css(checkoutnews);
	$(".has-ajax").css(checkouthas);
}
function preview(){
	$('#de_tips').toggle();
	$('.cover').toggleClass('de_tips');
}
$(window).on("load",function(){
	abc();
	if (!isMobileDevice()){
		$('.stage').mousemove(function(e){//之前这儿是<div class="stage" onmousemove="showa(event);">,但是由于函数在js文件下，导致DOM加载而js文件函数没被加载，而报错：showa is not defined
			showa(e)
		});
	}
});
