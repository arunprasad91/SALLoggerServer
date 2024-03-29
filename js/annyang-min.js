//! annyang
//! version : 2.4.0
//! author  : Tal Ater @TalAter
//! license : MIT
//! https://www.TalAter.com/annyang/
!function (a, b) {
    "use strict";
    "function" == typeof define && define.amd ? define([], function () {
        return a.annyang = b(a)
    }) : "object" == typeof module && module.exports ? module.exports = b(a) : a.annyang = b(a)
}("undefined" != typeof window ? window : this, function (a, b) {
    "use strict";
    var c, d = a.SpeechRecognition || a.webkitSpeechRecognition || a.mozSpeechRecognition || a.msSpeechRecognition || a.oSpeechRecognition;
    if (!d)
        return null;
    var e, f, g = [], h = {start: [], error: [], end: [], result: [], resultMatch: [], resultNoMatch: [], errorNetwork: [], errorPermissionBlocked: [], errorPermissionDenied: []}, i = 0, j = !1, k = "font-weight: bold; color: #00f;", l = !1, m = !1, n = /\s*\((.*?)\)\s*/g, o = /(\(\?:[^)]+\))\?/g, p = /(\(\?)?:\w+/g, q = /\*\w+/g, r = /[\-{}\[\]+?.,\\\^$|#]/g, s = function (a) {
        return a = a.replace(r, "\\$&").replace(n, "(?:$1)?").replace(p, function (a, b) {
            return b ? a : "([^\\s]+)"
        }).replace(q, "(.*?)").replace(o, "\\s*$1?\\s*"), new RegExp("^" + a + "$", "i")
    }, t = function (a) {
        var b = Array.prototype.slice.call(arguments, 1);
        a.forEach(function (a) {
            a.callback.apply(a.context, b)
        })
    }, u = function () {
        return e !== b
    }, v = function () {
        u() || c.init({}, !1)
    }, w = function (a, b, c) {
        g.push({command: a, callback: b, originalPhrase: c}), j && console.log("Command successfully loaded: %c" + c, k)
    }, x = function (a) {
        t(h.result, a);
        for (var b, c = 0; c < a.length; c++) {
            b = a[c].trim(), j && console.log("Speech recognized: %c" + b, k);
            for (var d = 0, e = g.length; e > d; d++) {
                var f = g[d], i = f.command.exec(b);
                if (i) {
                    var l = i.slice(1);
                    return j && (console.log("command matched: %c" + f.originalPhrase, k), l.length && console.log("with parameters", l)), f.callback.apply(this, l), void t(h.resultMatch, b, f.originalPhrase, a)
                }
            }
        }
        t(h.resultNoMatch, a)
    };
    return c = {init: function (k, n) {
            n = n === b ? !0 : !!n, e && e.abort && e.abort(), e = new d, e.maxAlternatives = 5, e.continuous = "http:" === a.location.protocol, e.lang = "en-US", e.onstart = function () {
                m = !0, t(h.start)
            }, e.onerror = function (a) {
                switch (t(h.error), a.error) {
                    case"network":
                        t(h.errorNetwork);
                        break;
                    case"not-allowed":
                    case"service-not-allowed":
                        f = !1, t((new Date).getTime() - i < 200 ? h.errorPermissionBlocked : h.errorPermissionDenied)
                    }
            }, e.onend = function () {
                if (m = !1, t(h.end), f) {
                    var a = (new Date).getTime() - i;
                    1e3 > a ? setTimeout(c.start, 1e3 - a) : c.start()
                }
            }, e.onresult = function (a) {
                if (l)
                    return j && console.log("Speech heard, but annyang is paused"), !1;
                for (var b = a.results[a.resultIndex], c = [], d = 0; d < b.length; d++)
                    c[d] = b[d].transcript;
                x(c)
            }, n && (g = []), k.length && this.addCommands(k)
        }, start: function (a) {
            l = !1, v(), a = a || {}, f = a.autoRestart !== b ? !!a.autoRestart : !0, a.continuous !== b && (e.continuous = !!a.continuous), i = (new Date).getTime();
            try {
                e.start()
            } catch (c) {
                j && console.log(c.message)
            }
        }, abort: function () {
            f = !1, u() && e.abort()
        }, pause: function () {
            l = !0
        }, resume: function () {
            c.start()
        }, debug: function (a) {
            j = arguments.length > 0 ? !!a : !0
        }, setLanguage: function (a) {
            v(), e.lang = a
        }, addCommands: function (b) {
            var c;
            v();
            for (var d in b)
                if (b.hasOwnProperty(d))
                    if (c = a[b[d]] || b[d], "function" == typeof c)
                        w(s(d), c, d);
                    else {
                        if (!("object" == typeof c && c.regexp instanceof RegExp)) {
                            j && console.log("Can not register command: %c" + d, k);
                            continue
                        }
                        w(new RegExp(c.regexp.source, "i"), c.callback, d)
                    }
        }, removeCommands: function (a) {
            return a === b ? void(g = []) : (a = Array.isArray(a) ? a : [a], void(g = g.filter(function (b) {
                for (var c = 0; c < a.length; c++)
                    if (a[c] === b.originalPhrase)
                        return!1;
                return!0
            })))
        }, addCallback: function (c, d, e) {
            if (h[c] !== b) {
                var f = a[d] || d;
                "function" == typeof f && h[c].push({callback: f, context: e || this})
            }
        }, removeCallback: function (a, c) {
            var d = function (a) {
                return a.callback !== c
            };
            for (var e in h)
                h.hasOwnProperty(e) && (a !== b && a !== e || (c === b ? h[e] = [] : h[e] = h[e].filter(d)))
        }, isListening: function () {
            return m && !l
        }, getSpeechRecognizer: function () {
            return e
        }, trigger: function (a) {
            return c.isListening() ? (Array.isArray(a) || (a = [a]), void x(a)) : void(j && (m ? console.log("Speech heard, but annyang is paused") : console.log("Cannot trigger while annyang is aborted")))
        }}
});