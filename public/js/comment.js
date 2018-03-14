// Staticman comment replies
// modified from Wordpress https://core.svn.wordpress.org/trunk/wp-includes/js/comment-reply.js
// Released under the GNU General Public License - https://wordpress.org/about/gpl/
$(document).ready(function () { //ready方法
	$('#subscribe-input').click(function(){
		if ($('#subscribe-input').is(":checked")){
			$('input[type="email"]').prop('required',true);
		}else{
			$('input[type="email"]').prop('required',false);
		}
	});
	(function ($) {
		$.getUrlParam = function (name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r != null)
				return unescape(r[2]);
			return null;
		}
	})(jQuery);
	xx = $.getUrlParam('a');
	if (xx == 1) {
		$(".change-where").html("分类阅读");
		$(".link--active2").attr("href", "/archive/directory/index.html");
		$(".link--active3").attr("href", "/archive/directory/index.html");
	} else if (xx == 2) {
		$(".change-where").html("文库");
		$(".link--active2").attr("href", "/archive/timeline/index.html");
		$(".link--active3").attr("href", "/archive/timeline/index.html");
	}
	if ($("#page__section-label").html() == null) {
		$(".link-comment").append("0&nbsp;Comment");
	} else {
		$(".link-comment").append($("#page__section-label").html().replace(/[^0-9]/ig, "") + "&nbsp;Comments");
	}
	var eb = function (t) {
		function e() {
			t('#comment-form').submit(function () {
				// Create the encryption object.
				var crypt = new JSEncrypt();
				// Set the private.
				crypt.setPublicKey($('#pubkey').val());
				//return;
				// If no public key is set then set it here...
				// Get the input and crypted values.
				var input = $('#email').val();
				if (input) {
					input=crypt.encrypt(input);
					if ($('#subscribe-input').is(":checked")){
						$('#email').val("SUB-"+input);
					}else{
						$('#email').val("NOS-"+input);
					}
				}
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
						s('Oops! There was an error when submitting your comment. Please try again.')
						console.log('** ERROR!'),
						console.log(t)
					}
				}),
				t(this).get(0).reset()
				$('input[type="email"]').prop('required',false)
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
		}),
		e()
	}
	(jQuery);
});
var addComment = {
	moveForm: function (commId, parentId, respondId, postId) {
		var div,
		element,
		style,
		cssHidden,
		t = this,
		comm = t.I(commId),
		respond = t.I(respondId),
		cancel = t.I('cancel-comment-reply-link'),
		parent = t.I('comment-replying-to'),
		commentForm = respond.getElementsByTagName('form')[0];

		if (!comm || !respond || !cancel || !parent || !commentForm) {
			return;
		}

		t.respondId = respondId;
		postId = postId || false;

		if (!t.I('sm-temp-form-div')) {
			div = document.createElement('div');
			div.id = 'sm-temp-form-div';
			div.style.display = 'none';
			respond.parentNode.insertBefore(div, respond);
		}

		comm.parentNode.insertBefore(respond, comm.nextSibling);
		parent.value = parentId;
		cancel.style.display = '';

		cancel.onclick = function () {
			var t = addComment,
			temp = t.I('sm-temp-form-div'),
			respond = t.I(t.respondId);

			if (!temp || !respond) {
				return;
			}

			t.I('comment-replying-to').value = null;
			temp.parentNode.insertBefore(respond, temp);
			temp.parentNode.removeChild(temp);
			this.style.display = 'none';
			this.onclick = null;
			return false;
		};

		/*
		 * Set initial focus to the first form focusable element.
		 * Try/catch used just to avoid errors in IE 7- which return visibility
		 * 'inherit' when the visibility value is inherited from an ancestor.
		 */
		try {
			for (var i = 0; i < commentForm.elements.length; i++) {
				element = commentForm.elements[i];
				cssHidden = false;

				// Modern browsers.
				if ('getComputedStyle' in window) {
					style = window.getComputedStyle(element);
					// IE 8.
				} else if (document.documentElement.currentStyle) {
					style = element.currentStyle;
				}

				/*
				 * For display none, do the same thing jQuery does. For visibility,
				 * check the element computed style since browsers are already doing
				 * the job for us. In fact, the visibility computed style is the actual
				 * computed value and already takes into account the element ancestors.
				 */
				if ((element.offsetWidth <= 0 && element.offsetHeight <= 0) || style.visibility === 'hidden') {
					cssHidden = true;
				}

				// Skip form elements that are hidden or disabled.
				if ('hidden' === element.type || element.disabled || cssHidden) {
					continue;
				}

				element.focus();
				// Stop after the first focusable element.
				break;
			}

		} catch (er) {}
		return false;
	},
	I: function (id) {
		return document.getElementById(id);
	}
};
