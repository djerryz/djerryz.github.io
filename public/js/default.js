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
var eb = function (t) {
  function e() {
    t('#comment-form').submit(function () {
		var e = t(this).serializeArray();
        var n = t(this).attr('action'), 
        o = t.param(e);
        t.ajax({
          type: 'POST',
          url: n,
          data: o,
          success: function (t) {
            var e = t.success ? 'Thanks for your comment. It will appear on the site shortly.' : 'Oops! There was an error when submitting your comment. Please try again.';
            s(e)
          },
          error: function (t) {
            console.log('** ERROR!'),
            console.log(t)
          }
        }),
        t(this).get(0).reset()
		return !1
    })
  }
  function a() {
    t('#toaster').fadeOut(300, function () {
      t(this).remove()
    })
  }
  function s(e) {
    t('#toaster').remove();
    var i = '<div id="toaster" class="toaster"><button type="button" class="toaster__close js-close-toaster">&times;</button><p>' + e + '</p></div>';
    t('#wrapall').append(i),
    setTimeout(function () {
      a()
    }, 5000)
  }
  return t('body').on('click', '.js-close-toaster', function () {
	  a()
  })
  , 
  e()
}(jQuery);
});
