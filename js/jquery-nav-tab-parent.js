!function() {
    jQuery.fn.navTabDoubleTap = function(r) {
        return r = jQuery.extend({
            submenu: ".sub-menu",
            ignoreItems: ""
        }, r),
        jQuery(this).each(function(e, t) {
            !function(r, e) {
                var t = !1
                  , a = r.find("li").not(jQuery(e.ignoreItems))
                  , n = r.find("a").not(jQuery(e.ignoreItems));
                function u(r) {
                    17 == r.which && (t = !0)
                }
                function i(r) {
                    17 == r.which && (t = !1)
                }
                a.addClass("jquery-nav-tab-parent"),
                n.bind("touchstart", function(t) {
                    t.stopPropagation(),
                    jQuery("body").css("cursor", "pointer"),
                    jQuery("body").css("-webkit-tap-highlight-color", "transparent"),
                    jQuery(t.currentTarget).addClass("jquery-nav-tab-touchstart"),
                    r.find("a").not(jQuery(t.currentTarget).parent(".jquery-nav-tab-parent").children("a")).removeClass("jquery-nav-tab-redirect jquery-nav-tab-active jquery-nav-tab-touchstart"),
                    jQuery(t.currentTarget).parent().children(e.submenu).length || jQuery(t.currentTarget).addClass("jquery-nav-tab-redirect"),
                    jQuery(t.currentTarget).hasClass("jquery-nav-tab-active") ? jQuery(t.currentTarget).addClass("jquery-nav-tab-redirect") : jQuery(t.currentTarget).addClass("jquery-nav-tab-active")
                }),
                n.bind("mousedown", function(r) {
                    jQuery(r.currentTarget).hasClass("jquery-nav-tab-touchstart") || jQuery(r.currentTarget).addClass("jquery-nav-tab-redirect")
                }),
                n.bind("click", function(r) {
                    var e, a, n;
                    r.preventDefault(),
                    r.stopPropagation(),
                    jQuery(r.currentTarget).hasClass("jquery-nav-tab-redirect") && !jQuery(r.currentTarget).hasClass("aios-initial-setup-dead-link") && (e = jQuery(r.currentTarget),
                    a = e.attr("href"),
                    n = void 0 === e.attr("target") ? "_self" : e.attr("target"),
                    t && (n = "_blank"),
                    window.open(a, n))
                }),
                jQuery(document).bind("keydown", u),
                jQuery(document).bind("keyup", i),
                jQuery("body").click(function(e) {
                    jQuery(e.currentTarget).css({
                        cursor: "auto",
                        "-webkit-tap-highlight-color": "inherit"
                    }),
                    r.find("a").removeClass("jquery-nav-tab-redirect jquery-nav-tab-active jquery-nav-tab-touchstart")
                })
            }(jQuery(t), r)
        })
    }
}();
