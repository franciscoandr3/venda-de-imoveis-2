!function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function(e) {
    var t, o, i, a, n, r, s = "Close", l = "BeforeClose", c = "MarkupParse", d = "Open", p = "Change", u = "aiosp", f = "." + u, m = "aiosp-ready", g = "aiosp-removing", v = "aiosp-prevent-close", h = function() {}, y = !!window.jQuery, C = e(window), w = function(e, o) {
        t.ev.on(u + e + f, o)
    }, b = function(t, o, i, a) {
        var n = document.createElement("div");
        return n.className = "aiosp-" + t,
        i && (n.innerHTML = i),
        a ? o && o.appendChild(n) : (n = e(n),
        o && n.appendTo(o)),
        n
    }, I = function(o, i) {
        t.ev.triggerHandler(u + o, i),
        t.st.callbacks && (o = o.charAt(0).toLowerCase() + o.slice(1),
        t.st.callbacks[o] && t.st.callbacks[o].apply(t, e.isArray(i) ? i : [i]))
    }, x = function(o) {
        return o === r && t.currTemplate.closeBtn || (t.currTemplate.closeBtn = e(t.st.closeMarkup.replace("%title%", t.st.tClose)),
        r = o),
        t.currTemplate.closeBtn
    }, k = function() {
        e.aiosPopup.instance || ((t = new h).init(),
        e.aiosPopup.instance = t)
    };
    h.prototype = {
        constructor: h,
        init: function() {
            var o = navigator.appVersion;
            t.isLowIE = t.isIE8 = document.all && !document.addEventListener,
            t.isAndroid = /android/gi.test(o),
            t.isIOS = /iphone|ipad|ipod/gi.test(o),
            t.supportsTransition = function() {
                var e = document.createElement("p").style
                  , t = ["ms", "O", "Moz", "Webkit"];
                if (void 0 !== e.transition)
                    return !0;
                for (; t.length; )
                    if (t.pop() + "Transition"in e)
                        return !0;
                return !1
            }(),
            t.probablyMobile = t.isAndroid || t.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),
            i = e(document),
            t.popupsCache = {}
        },
        open: function(o) {
            var a;
            if (!1 === o.isObj) {
                t.items = o.items.toArray(),
                t.index = 0;
                var r, s = o.items;
                for (a = 0; a < s.length; a++)
                    if ((r = s[a]).parsed && (r = r.el[0]),
                    r === o.el[0]) {
                        t.index = a;
                        break
                    }
            } else
                t.items = e.isArray(o.items) ? o.items : [o.items],
                t.index = o.index || 0;
            if (!t.isOpen) {
                t.types = [],
                n = "",
                o.mainEl && o.mainEl.length ? t.ev = o.mainEl.eq(0) : t.ev = i,
                o.key ? (t.popupsCache[o.key] || (t.popupsCache[o.key] = {}),
                t.currTemplate = t.popupsCache[o.key]) : t.currTemplate = {},
                t.st = e.extend(!0, {}, e.aiosPopup.defaults, o),
                t.fixedContentPos = "auto" === t.st.fixedContentPos ? !t.probablyMobile : t.st.fixedContentPos,
                t.st.modal && (t.st.closeOnContentClick = !1,
                t.st.closeOnBgClick = !1,
                t.st.showCloseBtn = !1,
                t.st.enableEscapeKey = !1),
                t.bgOverlay || (t.bgOverlay = b("bg").on("click" + f, function() {
                    t.close()
                }),
                t.wrap = b("wrap").attr("tabindex", -1).on("click" + f, function(e) {
                    t._checkIfClose(e.target) && t.close()
                }),
                t.container = b("container", t.wrap)),
                t.contentContainer = b("content"),
                t.st.preloader && (t.preloader = b("preloader", t.container, t.st.tLoading));
                var l = e.aiosPopup.modules;
                for (a = 0; a < l.length; a++) {
                    var p = l[a];
                    p = p.charAt(0).toUpperCase() + p.slice(1),
                    t["init" + p].call(t)
                }
                I("BeforeOpen"),
                t.st.showCloseBtn && (t.st.closeBtnInside ? (w(c, function(e, t, o, i) {
                    o.close_replaceWith = x(i.type)
                }),
                n += " aiosp-close-btn-in") : t.wrap.append(x())),
                t.st.alignTop && (n += " aiosp-align-top"),
                t.fixedContentPos ? t.wrap.css({
                    overflow: t.st.overflowY,
                    overflowX: "hidden",
                    overflowY: t.st.overflowY
                }) : t.wrap.css({
                    top: C.scrollTop(),
                    position: "absolute"
                }),
                (!1 === t.st.fixedBgPos || "auto" === t.st.fixedBgPos && !t.fixedContentPos) && t.bgOverlay.css({
                    height: i.height(),
                    position: "absolute"
                }),
                t.st.enableEscapeKey && i.on("keyup" + f, function(e) {
                    27 === e.keyCode && t.close()
                }),
                C.on("resize" + f, function() {
                    t.updateSize()
                }),
                t.st.closeOnContentClick || (n += " aiosp-auto-cursor"),
                n && t.wrap.addClass(n);
                var u = t.wH = C.height()
                  , g = {};
                if (t.fixedContentPos && t._hasScrollBar(u)) {
                    var v = t._getScrollbarSize();
                    v && (g.marginRight = v)
                }
                t.fixedContentPos && (t.isIE7 ? e("body, html").css("overflow", "hidden") : g.overflow = "hidden");
                var h = t.st.mainClass;
                return t.isIE7 && (h += " aiosp-ie7"),
                h && t._addClassToaiosp(h),
                t.updateItemHTML(),
                I("BuildControls"),
                e("html").css(g),
                t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || e(document.body)),
                t._lastFocusedEl = document.activeElement,
                setTimeout(function() {
                    t.content ? (t._addClassToaiosp(m),
                    t._setFocus()) : t.bgOverlay.addClass(m),
                    i.on("focusin" + f, t._onFocusIn)
                }, 16),
                t.isOpen = !0,
                t.updateSize(u),
                I(d),
                o
            }
            t.updateItemHTML()
        },
        close: function() {
            t.isOpen && (I(l),
            t.isOpen = !1,
            t.st.removalDelay && !t.isLowIE && t.supportsTransition ? (t._addClassToaiosp(g),
            setTimeout(function() {
                t._close()
            }, t.st.removalDelay)) : t._close())
        },
        _close: function() {
            I(s);
            var o = g + " " + m + " ";
            if (t.bgOverlay.detach(),
            t.wrap.detach(),
            t.container.empty(),
            t.st.mainClass && (o += t.st.mainClass + " "),
            t._removeClassFromaiosp(o),
            t.fixedContentPos) {
                var a = {
                    marginRight: ""
                };
                t.isIE7 ? e("body, html").css("overflow", "") : a.overflow = "",
                e("html").css(a)
            }
            i.off("keyup" + f + " focusin" + f),
            t.ev.off(f),
            t.wrap.attr("class", "aiosp-wrap").removeAttr("style"),
            t.bgOverlay.attr("class", "aiosp-bg"),
            t.container.attr("class", "aiosp-container"),
            !t.st.showCloseBtn || t.st.closeBtnInside && !0 !== t.currTemplate[t.currItem.type] || t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach(),
            t.st.autoFocusLast && t._lastFocusedEl && e(t._lastFocusedEl).focus(),
            t.currItem = null,
            t.content = null,
            t.currTemplate = null,
            t.prevHeight = 0,
            I("AfterClose")
        },
        updateSize: function(e) {
            if (t.isIOS) {
                var o = document.documentElement.clientWidth / window.innerWidth
                  , i = window.innerHeight * o;
                t.wrap.css("height", i),
                t.wH = i
            } else
                t.wH = e || C.height();
            t.fixedContentPos || t.wrap.css("height", t.wH),
            I("Resize")
        },
        updateItemHTML: function() {
            var o = t.items[t.index];
            t.contentContainer.detach(),
            t.content && t.content.detach(),
            o.parsed || (o = t.parseEl(t.index));
            var i = o.type;
            if (I("BeforeChange", [t.currItem ? t.currItem.type : "", i]),
            t.currItem = o,
            !t.currTemplate[i]) {
                var n = !!t.st[i] && t.st[i].markup;
                I("FirstMarkupParse", n),
                t.currTemplate[i] = !n || e(n)
            }
            a && a !== o.type && t.container.removeClass("aiosp-" + a + "-holder");
            var r = t["get" + i.charAt(0).toUpperCase() + i.slice(1)](o, t.currTemplate[i]);
            t.appendContent(r, i),
            o.preloaded = !0,
            I(p, o),
            a = o.type,
            t.container.prepend(t.contentContainer),
            I("AfterChange")
        },
        appendContent: function(e, o) {
            t.content = e,
            e ? t.st.showCloseBtn && t.st.closeBtnInside && !0 === t.currTemplate[o] ? t.content.find(".aiosp-close").length || t.content.append(x()) : t.content = e : t.content = "",
            I("BeforeAppend"),
            t.container.addClass("aiosp-" + o + "-holder aiosp-ref-" + e.selector.replace(".", "")),
            t.contentContainer.append(t.content)
        },
        parseEl: function(o) {
            var i, a = t.items[o];
            if (a.tagName ? a = {
                el: e(a)
            } : (i = a.type,
            a = {
                data: a,
                src: a.src
            }),
            a.el) {
                for (var n = t.types, r = 0; r < n.length; r++)
                    if (a.el.hasClass("aiosp-" + n[r])) {
                        i = n[r];
                        break
                    }
                a.src = a.el.attr("data-aiosp-src"),
                a.src || (a.src = a.el.attr("href"))
            }
            return a.type = i || t.st.type || "inline",
            a.index = o,
            a.parsed = !0,
            t.items[o] = a,
            I("ElementParse", a),
            t.items[o]
        },
        addGroup: function(e, o) {
            var i = function(i) {
                i.aiospEl = this,
                t._openClick(i, e, o)
            };
            o || (o = {});
            var a = "click.aiosPopup";
            o.mainEl = e,
            o.items ? (o.isObj = !0,
            e.off(a).on(a, i)) : (o.isObj = !1,
            o.delegate ? e.off(a).on(a, o.delegate, i) : (o.items = e,
            e.off(a).on(a, i)))
        },
        _openClick: function(o, i, a) {
            if ((void 0 !== a.midClick ? a.midClick : e.aiosPopup.defaults.midClick) || !(2 === o.which || o.ctrlKey || o.metaKey || o.altKey || o.shiftKey)) {
                var n = void 0 !== a.disableOn ? a.disableOn : e.aiosPopup.defaults.disableOn;
                if (n)
                    if (e.isFunction(n)) {
                        if (!n.call(t))
                            return !0
                    } else if (C.width() < n)
                        return !0;
                o.type && (o.preventDefault(),
                t.isOpen && o.stopPropagation()),
                a.el = e(o.aiospEl),
                a.delegate && (a.items = i.find(a.delegate)),
                t.open(a)
            }
        },
        updateStatus: function(e, i) {
            if (t.preloader) {
                o !== e && t.container.removeClass("aiosp-s-" + o),
                i || "loading" !== e || (i = t.st.tLoading);
                var a = {
                    status: e,
                    text: i
                };
                I("UpdateStatus", a),
                e = a.status,
                i = a.text,
                t.preloader.html(i),
                t.preloader.find("a").on("click", function(e) {
                    e.stopImmediatePropagation()
                }),
                t.container.addClass("aiosp-s-" + e),
                o = e
            }
        },
        _checkIfClose: function(o) {
            if (!e(o).hasClass(v)) {
                var i = t.st.closeOnContentClick
                  , a = t.st.closeOnBgClick;
                if (i && a)
                    return !0;
                if (!t.content || e(o).hasClass("aiosp-close") || t.preloader && o === t.preloader[0])
                    return !0;
                if (o === t.content[0] || e.contains(t.content[0], o)) {
                    if (i)
                        return !0
                } else if (a && e.contains(document, o))
                    return !0;
                return !1
            }
        },
        _addClassToaiosp: function(e) {
            t.bgOverlay.addClass(e),
            t.wrap.addClass(e)
        },
        _removeClassFromaiosp: function(e) {
            this.bgOverlay.removeClass(e),
            t.wrap.removeClass(e)
        },
        _hasScrollBar: function(e) {
            return (t.isIE7 ? i.height() : document.body.scrollHeight) > (e || C.height())
        },
        _setFocus: function() {
            (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus()
        },
        _onFocusIn: function(o) {
            return o.target === t.wrap[0] || e.contains(t.wrap[0], o.target) ? void 0 : (t._setFocus(),
            !1)
        },
        _parseMarkup: function(t, o, i) {
            var a;
            i.data && (o = e.extend(i.data, o)),
            I(c, [t, o, i]),
            e.each(o, function(o, i) {
                if (void 0 === i || !1 === i)
                    return !0;
                if ((a = o.split("_")).length > 1) {
                    var n = t.find(f + "-" + a[0]);
                    if (n.length > 0) {
                        var r = a[1];
                        "replaceWith" === r ? n[0] !== i[0] && n.replaceWith(i) : "img" === r ? n.is("img") ? n.attr("src", i) : n.replaceWith(e("<img>").attr("src", i).attr("class", n.attr("class"))) : n.attr(a[1], i)
                    }
                } else
                    t.find(f + "-" + o).html(i)
            })
        },
        _getScrollbarSize: function() {
            if (void 0 === t.scrollbarSize) {
                var e = document.createElement("div");
                e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",
                document.body.appendChild(e),
                t.scrollbarSize = e.offsetWidth - e.clientWidth,
                document.body.removeChild(e)
            }
            return t.scrollbarSize
        }
    },
    e.aiosPopup = {
        instance: null,
        proto: h.prototype,
        modules: [],
        open: function(t, o) {
            return k(),
            (t = t ? e.extend(!0, {}, t) : {}).isObj = !0,
            t.index = o || 0,
            this.instance.open(t)
        },
        close: function() {
            return e.aiosPopup.instance && e.aiosPopup.instance.close()
        },
        registerModule: function(t, o) {
            o.options && (e.aiosPopup.defaults[t] = o.options),
            e.extend(this.proto, o.proto),
            this.modules.push(t)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="aiosp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    },
    e.fn.aiosPopup = function(o) {
        k();
        var i = e(this);
        if ("string" == typeof o)
            if ("open" === o) {
                var a, n = y ? i.data("aiosPopup") : i[0].aiosPopup, r = parseInt(arguments[1], 10) || 0;
                n.items ? a = n.items[r] : (a = i,
                n.delegate && (a = a.find(n.delegate)),
                a = a.eq(r)),
                t._openClick({
                    aiospEl: a
                }, i, n)
            } else
                t.isOpen && t[o].apply(t, Array.prototype.slice.call(arguments, 1));
        else
            o = e.extend(!0, {}, o),
            y ? i.data("aiosPopup", o) : i[0].aiosPopup = o,
            t.addGroup(i, o);
        return i
    }
    ;
    var T, _, S, E = "inline", P = function() {
        S && (_.after(S.addClass(T)).detach(),
        S = null)
    };
    e.aiosPopup.registerModule(E, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                t.types.push(E),
                w(s + "." + E, function() {
                    P()
                })
            },
            getInline: function(o, i) {
                if (P(),
                o.src) {
                    var a = t.st.inline
                      , n = e(o.src);
                    if (n.length) {
                        var r = n[0].parentNode;
                        r && r.tagName && (_ || (T = a.hiddenClass,
                        _ = b(T),
                        T = "aiosp-" + T),
                        S = n.after(_).detach().removeClass(T)),
                        t.updateStatus("ready")
                    } else
                        t.updateStatus("error", a.tNotFound),
                        n = e("<div>");
                    return o.inlineElement = n,
                    n
                }
                return t.updateStatus("ready"),
                t._parseMarkup(i, {}, o),
                i
            }
        }
    });
    var z, O = "ajax", B = function() {
        z && e(document.body).removeClass(z)
    }, M = function() {
        B(),
        t.req && t.req.abort()
    };
    e.aiosPopup.registerModule(O, {
        options: {
            settings: null,
            cursor: "aiosp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                t.types.push(O),
                z = t.st.ajax.cursor,
                w(s + "." + O, M),
                w("BeforeChange." + O, M)
            },
            getAjax: function(o) {
                z && e(document.body).addClass(z),
                t.updateStatus("loading");
                var i = e.extend({
                    url: o.src,
                    success: function(i, a, n) {
                        var r = {
                            data: i,
                            xhr: n
                        };
                        I("ParseAjax", r),
                        t.appendContent(e(r.data), O),
                        o.finished = !0,
                        B(),
                        t._setFocus(),
                        setTimeout(function() {
                            t.wrap.addClass(m)
                        }, 16),
                        t.updateStatus("ready"),
                        I("AjaxContentAdded")
                    },
                    error: function() {
                        B(),
                        o.finished = o.loadError = !0,
                        t.updateStatus("error", t.st.ajax.tError.replace("%url%", o.src))
                    }
                }, t.st.ajax.settings);
                return t.req = e.ajax(i),
                ""
            }
        }
    });
    var L, H = function(o) {
        if (o.data && void 0 !== o.data.title)
            return o.data.title;
        var i = t.st.image.titleSrc;
        if (i) {
            if (e.isFunction(i))
                return i.call(t, o);
            if (o.el)
                return o.el.attr(i) || ""
        }
        return ""
    };
    e.aiosPopup.registerModule("image", {
        options: {
            markup: '<div class="aiosp-figure"><div class="aiosp-close"></div><figure><div class="aiosp-img"></div><figcaption><div class="aiosp-bottom-bar"><div class="aiosp-title"></div><div class="aiosp-counter"></div></div></figcaption></figure></div>',
            cursor: "aiosp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var o = t.st.image
                  , i = ".image";
                t.types.push("image"),
                w(d + i, function() {
                    "image" === t.currItem.type && o.cursor && e(document.body).addClass(o.cursor)
                }),
                w(s + i, function() {
                    o.cursor && e(document.body).removeClass(o.cursor),
                    C.off("resize" + f)
                }),
                w("Resize" + i, t.resizeImage),
                t.isLowIE && w("AfterChange", t.resizeImage)
            },
            resizeImage: function() {
                var e = t.currItem;
                if (e && e.img && t.st.image.verticalFit) {
                    var o = 0;
                    t.isLowIE && (o = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)),
                    e.img.css("max-height", t.wH - o)
                }
            },
            _onImageHasSize: function(e) {
                e.img && (e.hasSize = !0,
                L && clearInterval(L),
                e.isCheckingImgSize = !1,
                I("ImageHasSize", e),
                e.imgHidden && (t.content && t.content.removeClass("aiosp-loading"),
                e.imgHidden = !1))
            },
            findImageSize: function(e) {
                var o = 0
                  , i = e.img[0]
                  , a = function(n) {
                    L && clearInterval(L),
                    L = setInterval(function() {
                        return i.naturalWidth > 0 ? void t._onImageHasSize(e) : (o > 200 && clearInterval(L),
                        void (3 === ++o ? a(10) : 40 === o ? a(50) : 100 === o && a(500)))
                    }, n)
                };
                a(1)
            },
            getImage: function(o, i) {
                var a = 0
                  , n = function() {
                    o && (o.img[0].complete ? (o.img.off(".aiosploader"),
                    o === t.currItem && (t._onImageHasSize(o),
                    t.updateStatus("ready")),
                    o.hasSize = !0,
                    o.loaded = !0,
                    I("ImageLoadComplete")) : 200 > ++a ? setTimeout(n, 100) : r())
                }
                  , r = function() {
                    o && (o.img.off(".aiosploader"),
                    o === t.currItem && (t._onImageHasSize(o),
                    t.updateStatus("error", s.tError.replace("%url%", o.src))),
                    o.hasSize = !0,
                    o.loaded = !0,
                    o.loadError = !0)
                }
                  , s = t.st.image
                  , l = i.find(".aiosp-img");
                if (l.length) {
                    var c = document.createElement("img");
                    c.className = "aiosp-img",
                    o.el && o.el.find("img").length && (c.alt = o.el.find("img").attr("alt")),
                    o.img = e(c).on("load.aiosploader", n).on("error.aiosploader", r),
                    c.src = o.src,
                    l.is("img") && (o.img = o.img.clone()),
                    (c = o.img[0]).naturalWidth > 0 ? o.hasSize = !0 : c.width || (o.hasSize = !1)
                }
                return t._parseMarkup(i, {
                    title: H(o),
                    img_replaceWith: o.img
                }, o),
                t.resizeImage(),
                o.hasSize ? (L && clearInterval(L),
                o.loadError ? (i.addClass("aiosp-loading"),
                t.updateStatus("error", s.tError.replace("%url%", o.src))) : (i.removeClass("aiosp-loading"),
                t.updateStatus("ready")),
                i) : (t.updateStatus("loading"),
                o.loading = !0,
                o.hasSize || (o.imgHidden = !0,
                i.addClass("aiosp-loading"),
                t.findImageSize(o)),
                i)
            }
        }
    });
    var A;
    e.aiosPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(e) {
                return e.is("img") ? e : e.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var e, o = t.st.zoom, i = ".zoom";
                if (o.enabled && t.supportsTransition) {
                    var a, n, r = o.duration, c = function(e) {
                        var t = e.clone().removeAttr("style").removeAttr("class").addClass("aiosp-animated-image")
                          , i = "all " + o.duration / 1e3 + "s " + o.easing
                          , a = {
                            position: "fixed",
                            zIndex: 9999,
                            left: 0,
                            top: 0,
                            "-webkit-backface-visibility": "hidden"
                        }
                          , n = "transition";
                        return a["-webkit-" + n] = a["-moz-" + n] = a["-o-" + n] = a[n] = i,
                        t.css(a),
                        t
                    }, d = function() {
                        t.content.css("visibility", "visible")
                    };
                    w("BuildControls" + i, function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(a),
                            t.content.css("visibility", "hidden"),
                            !(e = t._getItemToZoom()))
                                return void d();
                            (n = c(e)).css(t._getOffset()),
                            t.wrap.append(n),
                            a = setTimeout(function() {
                                n.css(t._getOffset(!0)),
                                a = setTimeout(function() {
                                    d(),
                                    setTimeout(function() {
                                        n.remove(),
                                        e = n = null,
                                        I("ZoomAnimationEnded")
                                    }, 16)
                                }, r)
                            }, 16)
                        }
                    }),
                    w(l + i, function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(a),
                            t.st.removalDelay = r,
                            !e) {
                                if (!(e = t._getItemToZoom()))
                                    return;
                                n = c(e)
                            }
                            n.css(t._getOffset(!0)),
                            t.wrap.append(n),
                            t.content.css("visibility", "hidden"),
                            setTimeout(function() {
                                n.css(t._getOffset())
                            }, 16)
                        }
                    }),
                    w(s + i, function() {
                        t._allowZoom() && (d(),
                        n && n.remove(),
                        e = null)
                    })
                }
            },
            _allowZoom: function() {
                return "image" === t.currItem.type
            },
            _getItemToZoom: function() {
                return !!t.currItem.hasSize && t.currItem.img
            },
            _getOffset: function(o) {
                var i, a = (i = o ? t.currItem.img : t.st.zoom.opener(t.currItem.el || t.currItem)).offset(), n = parseInt(i.css("padding-top"), 10), r = parseInt(i.css("padding-bottom"), 10);
                a.top -= e(window).scrollTop() - n;
                var s = {
                    width: i.width(),
                    height: (y ? i.innerHeight() : i[0].offsetHeight) - r - n
                };
                return void 0 === A && (A = void 0 !== document.createElement("p").style.MozTransform),
                A ? s["-moz-transform"] = s.transform = "translate(" + a.left + "px," + a.top + "px)" : (s.left = a.left,
                s.top = a.top),
                s
            }
        }
    });
    var F = "iframe"
      , j = function(e) {
        if (t.currTemplate[F]) {
            var o = t.currTemplate[F].find("iframe");
            o.length && (e || (o[0].src = "//about:blank"),
            t.isIE8 && o.css("display", e ? "block" : "none"))
        }
    };
    e.aiosPopup.registerModule(F, {
        options: {
            markup: '<div class="aiosp-iframe-scaler"><div class="aiosp-close"></div><iframe class="aiosp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                t.types.push(F),
                w("BeforeChange", function(e, t, o) {
                    t !== o && (t === F ? j() : o === F && j(!0))
                }),
                w(s + "." + F, function() {
                    j()
                })
            },
            getIframe: function(o, i) {
                var a = o.src
                  , n = t.st.iframe;
                e.each(n.patterns, function() {
                    return a.indexOf(this.index) > -1 ? (this.id && (a = "string" == typeof this.id ? a.substr(a.lastIndexOf(this.id) + this.id.length, a.length) : this.id.call(this, a)),
                    a = this.src.replace("%id%", a),
                    !1) : void 0
                });
                var r = {};
                return n.srcAction && (r[n.srcAction] = a),
                t._parseMarkup(i, r, o),
                t.updateStatus("ready"),
                i
            }
        }
    });
    var N = function(e) {
        var o = t.items.length;
        return e > o - 1 ? e - o : 0 > e ? o + e : e
    }
      , W = function(e, t, o) {
        return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, o)
    };
    e.aiosPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="aiosp-arrow aiosp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var o = t.st.gallery
                  , a = ".aiosp-gallery";
                return t.direction = !0,
                !(!o || !o.enabled) && (n += " aiosp-gallery",
                w(d + a, function() {
                    o.navigateByImgClick && t.wrap.on("click" + a, ".aiosp-img", function() {
                        return t.items.length > 1 ? (t.next(),
                        !1) : void 0
                    }),
                    i.on("keydown" + a, function(e) {
                        37 === e.keyCode ? t.prev() : 39 === e.keyCode && t.next()
                    })
                }),
                w("UpdateStatus" + a, function(e, o) {
                    o.text && (o.text = W(o.text, t.currItem.index, t.items.length))
                }),
                w(c + a, function(e, i, a, n) {
                    var r = t.items.length;
                    a.counter = r > 1 ? W(o.tCounter, n.index, r) : ""
                }),
                w("BuildControls" + a, function() {
                    if (t.items.length > 1 && o.arrows && !t.arrowLeft) {
                        var i = o.arrowMarkup
                          , a = t.arrowLeft = e(i.replace(/%title%/gi, o.tPrev).replace(/%dir%/gi, "left")).addClass(v)
                          , n = t.arrowRight = e(i.replace(/%title%/gi, o.tNext).replace(/%dir%/gi, "right")).addClass(v);
                        a.click(function() {
                            t.prev()
                        }),
                        n.click(function() {
                            t.next()
                        }),
                        t.container.append(a.add(n))
                    }
                }),
                w(p + a, function() {
                    t._preloadTimeout && clearTimeout(t._preloadTimeout),
                    t._preloadTimeout = setTimeout(function() {
                        t.preloadNearbyImages(),
                        t._preloadTimeout = null
                    }, 16)
                }),
                void w(s + a, function() {
                    i.off(a),
                    t.wrap.off("click" + a),
                    t.arrowRight = t.arrowLeft = null
                }))
            },
            next: function() {
                t.direction = !0,
                t.index = N(t.index + 1),
                t.updateItemHTML()
            },
            prev: function() {
                t.direction = !1,
                t.index = N(t.index - 1),
                t.updateItemHTML()
            },
            goTo: function(e) {
                t.direction = e >= t.index,
                t.index = e,
                t.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var e, o = t.st.gallery.preload, i = Math.min(o[0], t.items.length), a = Math.min(o[1], t.items.length);
                for (e = 1; e <= (t.direction ? a : i); e++)
                    t._preloadItem(t.index + e);
                for (e = 1; e <= (t.direction ? i : a); e++)
                    t._preloadItem(t.index - e)
            },
            _preloadItem: function(o) {
                if (o = N(o),
                !t.items[o].preloaded) {
                    var i = t.items[o];
                    i.parsed || (i = t.parseEl(o)),
                    I("LazyLoad", i),
                    "image" === i.type && (i.img = e('<img class="aiosp-img" />').on("load.aiosploader", function() {
                        i.hasSize = !0
                    }).on("error.aiosploader", function() {
                        i.hasSize = !0,
                        i.loadError = !0,
                        I("LazyLoadError", i)
                    }).attr("src", i.src)),
                    i.preloaded = !0
                }
            }
        }
    });
    var Z = "retina";
    e.aiosPopup.registerModule(Z, {
        options: {
            replaceSrc: function(e) {
                return e.src.replace(/\.\w+$/, function(e) {
                    return "@2x" + e
                })
            },
            ratio: 1
        },
        proto: {
            initRetina: function() {
                if (window.devicePixelRatio > 1) {
                    var e = t.st.retina
                      , o = e.ratio;
                    (o = isNaN(o) ? o() : o) > 1 && (w("ImageHasSize." + Z, function(e, t) {
                        t.img.css({
                            "max-width": t.img[0].naturalWidth / o,
                            width: "100%"
                        })
                    }),
                    w("ElementParse." + Z, function(t, i) {
                        i.src = e.replaceSrc(i, o)
                    }))
                }
            }
        }
    }),
    k()
});
