window.f = 0;
function show(event) {
	var translateY = 0;
	var e = event || window.event;
	var a = $('.stage').width() / 2;
	var b = a - e.clientX + $('.stage').css('left').split('px')[0];
	b = (b / a) * 3;
	b = b + "%";
	Modernizr.csstransforms3d ? $('.inner-layer').css({
		transform: 'translate3d(' + b + ', ' + translateY + 'px, 0)',
		'-webkit-transform': 'translate3d(' + b + ', ' + translateY + 'px, 0)',
		'-moz-transform': 'translate3d(' + b + ', ' + translateY + 'px, 0)',
		'-ms-transform': 'translate3d(' + b + ', ' + translateY + 'px, 0)'
	}) : $('.inner-layer').css({
		left: b.split('%')[0] * 0.01 * a * 2 + 'px',
	})
};
function clicktomove(k) {
	j = window.f;
	var tran = new Array(0, -402, -803);
	if (k == 0) {
		if (j != 0) {
			j--;
		}
	} else if (k == 1) {
		if (j != 2) {
			j++;
		}
	}
	translateY = 0;
	Modernizr.csstransforms3d ? $('.slides').css({
		transform: 'translate3d(' + tran[j] + 'px,' + translateY + 'px, 0)',
		'-webkit-transform': 'translate3d(' + tran[j] + 'px,' + translateY + 'px, 0)',
		'-moz-transform': 'translate3d(' + tran[j] + 'px,' + translateY + 'px, 0)',
		'-ms-transform': 'translate3d(' + tran[j] + 'px,' + translateY + 'px, 0)'
	}) : $('.slides').css({
		left: tran[j] + 'px',
	})
	window.f = j;
};
 <  / script >  < script > function abc() {
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
		array: []
	};
	function Dot() {
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;
		this.vx = -0.5 + Math.random();
		this.vy = -0.5 + Math.random();
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
					dot.vy = -dot.vy;
				} else if (dot.x < 0 || dot.x > canvas.width) {
					dot.vx = -dot.vx;
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
$(document).ready(function () {
	var a;
	var b = 0;
	var checkonnews = {
		"opacity": "1",
		"transform": "translate3d(0, 0.32rem, 0)",
		"box-shadow": "0 0 0 1px rgba(0, 0, 0, 0.15)",
		"z-index": "40",
		"display": "block"
	};
	var checkoutnews = {
		"opacity": "0",
		"transform": "translate3d(0, -0.32rem, 0)",
		"box-shadow": "none",
		"z-index": "-5"
	};
	var checkonhas = {
		"opacity": "1"
	};
	var checkouthas = {
		"opacity": "0.2"
	};
	abc();
	$(".has-ajax,.news").mouseover(function () {
		if (b == 0) {
			$(".news").css(checkonnews);
			$(".has-ajax").css(checkonhas);
			b = 1;
		} else {
			clearTimeout(a);
		}
	});
	$(".has-ajax,.news").mouseout(function () {
		a = setTimeout(function () {
				$(".news").css(checkoutnews);
				$(".has-ajax").css(checkouthas);
				b = 0;
			}, 340);
	});
	$(".close").click(function () {
		$(".news").css(checkoutnews);
		$(".has-ajax").css(checkouthas);
		b = 0;
	});
});
