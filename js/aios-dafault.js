!function(e) {
    var t = {};
    function n(r) {
        if (t[r])
            return t[r].exports;
        var o = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, n),
        o.l = !0,
        o.exports
    }
    n.m = e,
    n.c = t,
    n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        })
    }
    ,
    n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    n.t = function(e, t) {
        if (1 & t && (e = n(e)),
        8 & t)
            return e;
        if (4 & t && "object" == typeof e && e && e.__esModule)
            return e;
        var r = Object.create(null);
        if (n.r(r),
        Object.defineProperty(r, "default", {
            enumerable: !0,
            value: e
        }),
        2 & t && "string" != typeof e)
            for (var o in e)
                n.d(r, o, function(t) {
                    return e[t]
                }
                .bind(null, o));
        return r
    }
    ,
    n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return n.d(t, "a", t),
        t
    }
    ,
    n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    n.p = "",
    n(n.s = 10)
}({
    10: function(e, t, n) {
        e.exports = n(19)
    },
    11: function(e, t) {
        Document.prototype.aiosLoad = function(e) {
            e && "function" == typeof e && window.addEventListener("load", (function() {
                if ("interactive" === document.readyState || "complete" === document.readyState)
                    return e()
            }
            ))
        }
    },
    12: function(e, t) {
        Document.prototype.aiosReady = function(e) {
            e && "function" == typeof e && document.addEventListener("DOMContentLoaded", (function() {
                if ("interactive" === document.readyState || "complete" === document.readyState)
                    return e()
            }
            ))
        }
    },
    19: function(e, t, n) {
        "use strict";
        function r(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value"in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
        }
        n.r(t);
        var o = function() {
            function e(t) {
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e),
                this.rules = t,
                this.render()
            }
            var t, n, o;
            return t = e,
            (n = [{
                key: "render",
                value: function() {
                    var e = document.createElement("style");
                    document.head.appendChild(e);
                    for (var t = e.sheet, n = 0; n < this.rules.length; n++) {
                        var r = 1
                          , o = this.rules[n]
                          , i = o[0]
                          , a = "";
                        Array.isArray(o[1][0]) && (o = o[1],
                        r = 0);
                        for (var c = o.length; r < c; r++) {
                            var u = o[r];
                            a += "".concat(u[0], ": ").concat(u[1], " ").concat(u[2] ? " !important" : "", ";\n")
                        }
                        t.insertRule("".concat(i, " {").concat(a, "}"), t.cssRules.length)
                    }
                }
            }]) && r(t.prototype, n),
            o && r(t, o),
            e
        }();
        function i(e) {
            return function(e) {
                if (Array.isArray(e))
                    return a(e)
            }(e) || function(e) {
                if ("undefined" != typeof Symbol && Symbol.iterator in Object(e))
                    return Array.from(e)
            }(e) || function(e, t) {
                if (!e)
                    return;
                if ("string" == typeof e)
                    return a(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === n && e.constructor && (n = e.constructor.name);
                if ("Map" === n || "Set" === n)
                    return Array.from(e);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                    return a(e, t)
            }(e) || function() {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        function a(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++)
                r[n] = e[n];
            return r
        }
        function c(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value"in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
        }
        var u = function() {
            function e(t) {
                var n = this;
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e),
                this.element = t,
                this.ctrlActive = !1,
                this.ready(),
                this.element.addEventListener("touchstart", (function(e) {
                    n.touchGesture(e)
                }
                )),
                this.element.addEventListener("mousedown", (function(e) {
                    n.mouseGestures(e)
                }
                )),
                document.addEventListener("keydown", (function(e) {
                    17 == e.which && (n.ctrlActive = !0)
                }
                )),
                document.addEventListener("keyup", (function(e) {
                    17 == e.which && (n.ctrlActive = !1)
                }
                )),
                this.element.addEventListener("click", (function(e) {
                    n.openUrl(e, e.target)
                }
                )),
                document.body.addEventListener("click", (function(e) {
                    n.reset()
                }
                ))
            }
            var t, n, r;
            return t = e,
            (n = [{
                key: "ready",
                value: function() {
                    this.element.className += " mobile-anchor-pointer"
                }
            }, {
                key: "touchGesture",
                value: function(e) {
                    e.stopPropagation(),
                    document.body.style.cursor = "pointer",
                    document.body.style.webkitTapHighlightColor = "transparent",
                    [].forEach.call(document.querySelectorAll(".mobile-anchor-pointer"), (function(e, t) {
                        e.addEventListener("click", (function() {
                            for (var t = i(document.querySelectorAll(".mobile-anchor-pointer")).filter((function(t) {
                                return t !== e
                            }
                            )), n = 0; n < t.length; n++)
                                t[n].classList.remove("mobile-anchor-redirect", "mobile-anchor-active", "mobile-anchor-touchstart")
                        }
                        ))
                    }
                    )),
                    e.target.classList.add("mobile-anchor-touchstart"),
                    e.target.classList.contains("mobile-anchor-active") ? e.target.classList.add("mobile-anchor-redirect") : e.target.classList.add("mobile-anchor-active")
                }
            }, {
                key: "mouseGestures",
                value: function(e) {
                    e.target.classList.contains("mobile-anchor-touchstart") || e.target.classList.add("mobile-anchor-redirect")
                }
            }, {
                key: "openUrl",
                value: function(e, t) {
                    if (e.preventDefault(),
                    e.stopPropagation(),
                    e.target.classList.contains("mobile-anchor-redirect") && !e.target.classList.contains("aios-initial-setup-dead-link")) {
                        var n = t.getAttribute("href")
                          , r = null === t.getAttribute("target") ? "_self" : t.getAttribute("target");
                        if (null != n || "#" != n)
                            return !1;
                        this.ctrlActive && (r = "_blank"),
                        window.open(n, r)
                    }
                }
            }, {
                key: "reset",
                value: function() {
                    document.body.style.cursor = "auto",
                    document.body.style.webkitTapHighlightColor = "inherit",
                    this.element.classList.remove("mobile-anchor-redirect", "mobile-anchor-active", "mobile-anchor-touchstart")
                }
            }]) && c(t.prototype, n),
            r && c(t, r),
            e
        }();
        function l(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value"in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
        }
        var s = function() {
            function e(t) {
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e),
                this.element = t,
                this.src = "",
                this.defaultSrc = this.element.getAttribute("data-bg-src"),
                this.regexRemoveSpaces = /[\s\t]+/g,
                this.regexGetImageUrlFromString = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/g,
                this.viewportWidth = window.innerWidth,
                this.ready()
            }
            var t, n, r;
            return t = e,
            (n = [{
                key: "ready",
                value: function() {
                    var e = this.element.getAttribute("data-bg-srcset");
                    this.update(e.split(","))
                }
            }, {
                key: "update",
                value: function(e) {
                    if (Array.isArray(e)) {
                        var t;
                        e = e.reverse();
                        for (var n = 0; n < e.length; n++) {
                            var r = e[n]
                              , o = (r = r.replace(this.regexRemoveSpaces, "")).replace(this.regexGetImageUrlFromString, "");
                            o = o.replace("w", "");
                            var i = r.match(this.regexGetImageUrlFromString);
                            if (this.viewportWidth <= o) {
                                t = i;
                                break
                            }
                        }
                        this.render(t)
                    }
                }
            }, {
                key: "render",
                value: function(e) {
                    var t = this.defaultSrc;
                    void 0 !== e && (t = e),
                    this.element.style.backgroundImage = 'url("'.concat(t, '")')
                }
            }]) && l(t.prototype, n),
            r && l(t, r),
            e
        }();
        n(11),
        n(12);
        document.aiosReady((function() {
            for (var e = document.querySelectorAll(".responsive-background-image"), t = function(t) {
                var n = e[t].className;
                (n = n.split(" ")).indexOf("lazyloaded") > 0 ? document.aiosLoad((function() {
                    setTimeout((function() {
                        new s(e[t])
                    }
                    ), 100 * t)
                }
                )) : new s(e[t])
            }, n = 0; n < e.length; n++)
                t(n)
        }
        )),
        document.aiosReady((function() {
            for (var e = document.querySelectorAll(".mobile-hover"), t = 0; t < e.length; t++)
                new u(e[t])
        }
        )),
        new o([[".mobile-hover", ["-webkit-user-select", "none"], ["-webkit-touch-callout", "none"]]])
    }
});
