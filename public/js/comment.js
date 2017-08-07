

// Staticman comment replies
// modified from Wordpress https://core.svn.wordpress.org/trunk/wp-includes/js/comment-reply.js
// Released under the GNU General Public License - https://wordpress.org/about/gpl/
var addComment = {
  moveForm: function( commId, parentId, respondId, postId ) {
    var div, element, style, cssHidden,
      t           = this,
      comm        = t.I( commId ),
      respond     = t.I( respondId ),
      cancel      = t.I( 'cancel-comment-reply-link' ),
      parent      = t.I( 'comment-replying-to' ),
      commentForm = respond.getElementsByTagName( 'form' )[0];

    if ( ! comm || ! respond || ! cancel || ! parent || ! commentForm ) {
      return;
    }

    t.respondId = respondId;
    postId = postId || false;

    if ( ! t.I( 'sm-temp-form-div' ) ) {
      div = document.createElement( 'div' );
      div.id = 'sm-temp-form-div';
      div.style.display = 'none';
      respond.parentNode.insertBefore( div, respond );
    }

    comm.parentNode.insertBefore( respond, comm.nextSibling );
    parent.value = parentId;
    cancel.style.display = '';

    cancel.onclick = function() {
      var t       = addComment,
        temp    = t.I( 'sm-temp-form-div' ),
        respond = t.I( t.respondId );

      if ( ! temp || ! respond ) {
        return;
      }

      t.I( 'comment-replying-to' ).value = null;
      temp.parentNode.insertBefore( respond, temp );
      temp.parentNode.removeChild( temp );
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
      for ( var i = 0; i < commentForm.elements.length; i++ ) {
        element = commentForm.elements[i];
        cssHidden = false;

        // Modern browsers.
        if ( 'getComputedStyle' in window ) {
          style = window.getComputedStyle( element );
        // IE 8.
        } else if ( document.documentElement.currentStyle ) {
          style = element.currentStyle;
        }

        /*
         * For display none, do the same thing jQuery does. For visibility,
         * check the element computed style since browsers are already doing
         * the job for us. In fact, the visibility computed style is the actual
         * computed value and already takes into account the element ancestors.
         */
        if ( ( element.offsetWidth <= 0 && element.offsetHeight <= 0 ) || style.visibility === 'hidden' ) {
          cssHidden = true;
        }

        // Skip form elements that are hidden or disabled.
        if ( 'hidden' === element.type || element.disabled || cssHidden ) {
          continue;
        }

        element.focus();
        // Stop after the first focusable element.
        break;
      }

    } catch( er ) {}

    return false;
  },

  I: function( id ) {
    return document.getElementById( id );
  }
};

var eb = function (t) {
  function e() {
    t(window).load(function () {
      i()
    }),
    t(window).resize(function () {
      i()
    }),
    t('#post-new-comment').submit(function () {
      var e = t(this).serializeArray(),
      i = [
      ];
      if (t(e).each(function (e, n) {
        var o = t(this).find('[name="' + n.name + '"]').attr('required'),
        r = 0 === n.value.trim().length;
        o && r && i.push(n.name)
      }.bind(this)), 0 === i.length) {
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
      }
      return !1
    }),
    t('.js-load-more-articles').click(function () {
      return t(this).addClass('cta--progress'),
      n(function () {
        t(this).removeClass('cta--progress')
      }.bind(this)),
      r('Articles', 'Load more'),
      !1
    }),
    t('#search-toggle').change(function () {
      t(this).is(':checked') && (setTimeout(function () {
        t('#search-input').focus()
      }, 500), r('Search', 'Open'))
    }),
    t('.js-post-navigation-arrow').click(function () {
      r('Articles', 'Article navigation')
    })
  }
  function i() {
    var e = t('.feature-title'),
    i = e.parent().width();
    e.children('.feature-title__part').each(function () {
      t(this).attr('style', '').css({
        display: 'inline-block',
        opacity: 0
      });
      var e = Math.floor(i / t(this).width() * 100);
      t(this).css({
        'font-size': e + '%',
        display: 'block',
        opacity: 1
      })
    })
  }
  function n(e) {
    var i = parseInt(c.attr('data-paginator-current')),
    n = parseInt(c.attr('data-paginator-total')),
    r = i + 1;
    r > n || (r == n && o(), t.get('/page/' + r + '/', function (i) {
      var n = t.parseHTML(i),
      o = t(n).filter('#main').children();
      c.find('.js-posts').append(o).masonry('appended', o),
      c.attr('data-paginator-current', r),
      e()
    }))
  }
  function o() {
    t('.js-paginator').remove()
  }
  function r(t, e) {
    void 0 !== window.ga && (void 0 !== e ? ga('send', 'event', t, e)  : ga('send', 'event', t))
  }
  function s(e) {
    t('#toaster').remove();
    var i = '<div id="toaster" class="toaster"><button type="button" class="toaster__close js-close-toaster">&times;</button><p>' + e + '</p></div>';
    t('#main').append(i),
    setTimeout(function () {
      a()
    }, 5000)
  }
  function a() {
    t('#toaster').fadeOut(300, function () {
      t(this).remove()
    })
  }
  function u() {
    e(),
    window.SimpleJekyllSearch ? h()  : window.SimpleJekyllSearchInit = h,
    d()
  }
  function h() {
    var t = '';
    t += '<a href="{url}" class="search-result small-card">',
    t += ' <p class="small-card__pre">{date}</p>',
    t += ' <p class="small-card__title">{title}</p>',
    t += '</a>',
    SimpleJekyllSearch({
      searchInput: document.getElementById('search-input'),
      resultsContainer: document.getElementById('search-results'),
      json: window.searchDatabase,
      noResultsText: '<p class="search-results__message">No results, sorry.</p>',
      searchResultTemplate: t
    })
  }
  function d() {
    var e = t('.js-audio'),
    i = e.get(0),
    n = t('.js-audio-play'),
    o = t('.js-audio-pause'),
    s = function (t) {
      t ? (n.attr('aria-hidden', 'true'), o.removeAttr('aria-hidden'))  : (n.removeAttr('aria-hidden'), o.attr('aria-hidden', 'true'))
    },
    a = function () {
      i.paused ? (i.play(), s(!0), r('Articles', 'Audio play'))  : (i.pause(), s(!1))
    };
    n.click(a),
    o.click(a),
    e.on('ended', function () {
      s(!1)
    })
  }
  var c = t('#main');
  return t('body').on('click', '.js-close-toaster', function () {
    a()
  }),
  u(),
  {
    init: u,
    loadMoreArticles: n,
    toaster: s
  }
}(jQuery);
