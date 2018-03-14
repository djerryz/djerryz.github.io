$(document).ready(function () {//这儿用于处理喇叭和sidebar效果
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
	myToggle = document.querySelector('.toggle');
	myToggle.addEventListener('click', function () {
		if (myToggle.classList.contains('open')) {
			myToggle.classList.remove('open');
		} else {
			myToggle.classList.add('open');
		}
	});
});
