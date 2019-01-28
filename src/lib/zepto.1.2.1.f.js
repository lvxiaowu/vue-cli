// 集成vue.js2 
/* Zepto v1.2.0 - zepto event ajax form ie - zeptojs.com/license */
// Zepto 必要插件
! function(t, e) { "function" == typeof define && define.amd ? define(function() { return e(t) }) : e(t) }(this, function(t) { var e = function() {
    function $(t) { return null == t ? String(t) : S[C.call(t)] || "object" }

    function F(t) { return "function" == $(t) }

    function k(t) { return null != t && t == t.window }

    function M(t) { return null != t && t.nodeType == t.DOCUMENT_NODE }

    function R(t) { return "object" == $(t) }

    function Z(t) { return R(t) && !k(t) && Object.getPrototypeOf(t) == Object.prototype }

    function z(t) { var e = !!t && "length" in t && t.length,
        n = r.type(t); return "function" != n && !k(t) && ("array" == n || 0 === e || "number" == typeof e && e > 0 && e - 1 in t) }

    function q(t) { return a.call(t, function(t) { return null != t }) }

    function H(t) { return t.length > 0 ? r.fn.concat.apply([], t) : t }

    function I(t) { return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase() }

    function V(t) { return t in l ? l[t] : l[t] = new RegExp("(^|\\s)" + t + "(\\s|$)") }

    function _(t, e) { return "number" != typeof e || h[I(t)] ? e : e + "px" }

    function B(t) { var e, n; return c[t] || (e = f.createElement(t), f.body.appendChild(e), n = getComputedStyle(e, "").getPropertyValue("display"), e.parentNode.removeChild(e), "none" == n && (n = "block"), c[t] = n), c[t] }

    function U(t) { return "children" in t ? u.call(t.children) : r.map(t.childNodes, function(t) { return 1 == t.nodeType ? t : void 0 }) }

    function X(t, e) { var n, r = t ? t.length : 0; for (n = 0; r > n; n++) this[n] = t[n];
      this.length = r, this.selector = e || "" }

    function J(t, r, i) { for (n in r) i && (Z(r[n]) || L(r[n])) ? (Z(r[n]) && !Z(t[n]) && (t[n] = {}), L(r[n]) && !L(t[n]) && (t[n] = []), J(t[n], r[n], i)) : r[n] !== e && (t[n] = r[n]) }

    function W(t, e) { return null == e ? r(t) : r(t).filter(e) }

    function Y(t, e, n, r) { return F(e) ? e.call(t, n, r) : e }

    function G(t, e, n) { null == n ? t.removeAttribute(e) : t.setAttribute(e, n) }

    function K(t, n) { var r = t.className || "",
        i = r && r.baseVal !== e; return n === e ? i ? r.baseVal : r : void(i ? r.baseVal = n : t.className = n) }

    function Q(t) { try { return t ? "true" == t || ("false" == t ? !1 : "null" == t ? null : +t + "" == t ? +t : /^[\[\{]/.test(t) ? r.parseJSON(t) : t) : t } catch (e) { return t } }

    function tt(t, e) { e(t); for (var n = 0, r = t.childNodes.length; r > n; n++) tt(t.childNodes[n], e) } var e, n, r, i, O, P, o = [],
      s = o.concat,
      a = o.filter,
      u = o.slice,
      f = t.document,
      c = {},
      l = {},
      h = { "column-count": 1, columns: 1, "font-weight": 1, "line-height": 1, opacity: 1, "z-index": 1, zoom: 1 },
      p = /^\s*<(\w+|!)[^>]*>/,
      d = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
      m = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
      g = /^(?:body|html)$/i,
      v = /([A-Z])/g,
      y = ["val", "css", "html", "text", "data", "width", "height", "offset"],
      x = ["after", "prepend", "before", "append"],
      b = f.createElement("table"),
      E = f.createElement("tr"),
      j = { tr: f.createElement("tbody"), tbody: b, thead: b, tfoot: b, td: E, th: E, "*": f.createElement("div") },
      w = /complete|loaded|interactive/,
      T = /^[\w-]*$/,
      S = {},
      C = S.toString,
      N = {},
      A = f.createElement("div"),
      D = { tabindex: "tabIndex", readonly: "readOnly", "for": "htmlFor", "class": "className", maxlength: "maxLength", cellspacing: "cellSpacing", cellpadding: "cellPadding", rowspan: "rowSpan", colspan: "colSpan", usemap: "useMap", frameborder: "frameBorder", contenteditable: "contentEditable" },
      L = Array.isArray || function(t) { return t instanceof Array }; return N.matches = function(t, e) { if (!e || !t || 1 !== t.nodeType) return !1; var n = t.matches || t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector; if (n) return n.call(t, e); var r, i = t.parentNode,
        o = !i; return o && (i = A).appendChild(t), r = ~N.qsa(i, e).indexOf(t), o && A.removeChild(t), r }, O = function(t) { return t.replace(/-+(.)?/g, function(t, e) { return e ? e.toUpperCase() : "" }) }, P = function(t) { return a.call(t, function(e, n) { return t.indexOf(e) == n }) }, N.fragment = function(t, n, i) { var o, s, a; return d.test(t) && (o = r(f.createElement(RegExp.$1))), o || (t.replace && (t = t.replace(m, "<$1></$2>")), n === e && (n = p.test(t) && RegExp.$1), n in j || (n = "*"), a = j[n], a.innerHTML = "" + t, o = r.each(u.call(a.childNodes), function() { a.removeChild(this) })), Z(i) && (s = r(o), r.each(i, function(t, e) { y.indexOf(t) > -1 ? s[t](e) : s.attr(t, e) })), o }, N.Z = function(t, e) { return new X(t, e) }, N.isZ = function(t) { return t instanceof N.Z }, N.init = function(t, n) { var i; if (!t) return N.Z(); if ("string" == typeof t)
        if (t = t.trim(), "<" == t[0] && p.test(t)) i = N.fragment(t, RegExp.$1, n), t = null;
        else { if (n !== e) return r(n).find(t);
          i = N.qsa(f, t) } else { if (F(t)) return r(f).ready(t); if (N.isZ(t)) return t; if (L(t)) i = q(t);
        else if (R(t)) i = [t], t = null;
        else if (p.test(t)) i = N.fragment(t.trim(), RegExp.$1, n), t = null;
        else { if (n !== e) return r(n).find(t);
          i = N.qsa(f, t) } } return N.Z(i, t) }, r = function(t, e) { return N.init(t, e) }, r.extend = function(t) { var e, n = u.call(arguments, 1); return "boolean" == typeof t && (e = t, t = n.shift()), n.forEach(function(n) { J(t, n, e) }), t }, N.qsa = function(t, e) { var n, r = "#" == e[0],
        i = !r && "." == e[0],
        o = r || i ? e.slice(1) : e,
        s = T.test(o); return t.getElementById && s && r ? (n = t.getElementById(o)) ? [n] : [] : 1 !== t.nodeType && 9 !== t.nodeType && 11 !== t.nodeType ? [] : u.call(s && !r && t.getElementsByClassName ? i ? t.getElementsByClassName(o) : t.getElementsByTagName(e) : t.querySelectorAll(e)) }, r.contains = f.documentElement.contains ? function(t, e) { return t !== e && t.contains(e) } : function(t, e) { for (; e && (e = e.parentNode);)
        if (e === t) return !0; return !1 }, r.type = $, r.isFunction = F, r.isWindow = k, r.isArray = L, r.isPlainObject = Z, r.isEmptyObject = function(t) { var e; for (e in t) return !1; return !0 }, r.isNumeric = function(t) { var e = Number(t),
        n = typeof t; return null != t && "boolean" != n && ("string" != n || t.length) && !isNaN(e) && isFinite(e) || !1 }, r.inArray = function(t, e, n) { return o.indexOf.call(e, t, n) }, r.camelCase = O, r.trim = function(t) { return null == t ? "" : String.prototype.trim.call(t) }, r.uuid = 0, r.support = {}, r.expr = {}, r.noop = function() {}, r.map = function(t, e) { var n, i, o, r = []; if (z(t))
        for (i = 0; i < t.length; i++) n = e(t[i], i), null != n && r.push(n);
      else
        for (o in t) n = e(t[o], o), null != n && r.push(n); return H(r) }, r.each = function(t, e) { var n, r; if (z(t)) { for (n = 0; n < t.length; n++)
          if (e.call(t[n], n, t[n]) === !1) return t } else
        for (r in t)
          if (e.call(t[r], r, t[r]) === !1) return t; return t }, r.grep = function(t, e) { return a.call(t, e) }, t.JSON && (r.parseJSON = JSON.parse), r.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) { S["[object " + e + "]"] = e.toLowerCase() }), r.fn = { constructor: N.Z, length: 0, forEach: o.forEach, reduce: o.reduce, push: o.push, sort: o.sort, splice: o.splice, indexOf: o.indexOf, concat: function() { var t, e, n = []; for (t = 0; t < arguments.length; t++) e = arguments[t], n[t] = N.isZ(e) ? e.toArray() : e; return s.apply(N.isZ(this) ? this.toArray() : this, n) }, map: function(t) { return r(r.map(this, function(e, n) { return t.call(e, n, e) })) }, slice: function() { return r(u.apply(this, arguments)) }, ready: function(t) { return w.test(f.readyState) && f.body ? t(r) : f.addEventListener("DOMContentLoaded", function() { t(r) }, !1), this }, get: function(t) { return t === e ? u.call(this) : this[t >= 0 ? t : t + this.length] }, toArray: function() { return this.get() }, size: function() { return this.length }, remove: function() { return this.each(function() { null != this.parentNode && this.parentNode.removeChild(this) }) }, each: function(t) { return o.every.call(this, function(e, n) { return t.call(e, n, e) !== !1 }), this }, filter: function(t) { return F(t) ? this.not(this.not(t)) : r(a.call(this, function(e) { return N.matches(e, t) })) }, add: function(t, e) { return r(P(this.concat(r(t, e)))) }, is: function(t) { return this.length > 0 && N.matches(this[0], t) }, not: function(t) { var n = []; if (F(t) && t.call !== e) this.each(function(e) { t.call(this, e) || n.push(this) });
        else { var i = "string" == typeof t ? this.filter(t) : z(t) && F(t.item) ? u.call(t) : r(t);
          this.forEach(function(t) { i.indexOf(t) < 0 && n.push(t) }) } return r(n) }, has: function(t) { return this.filter(function() { return R(t) ? r.contains(this, t) : r(this).find(t).size() }) }, eq: function(t) { return -1 === t ? this.slice(t) : this.slice(t, +t + 1) }, first: function() { var t = this[0]; return t && !R(t) ? t : r(t) }, last: function() { var t = this[this.length - 1]; return t && !R(t) ? t : r(t) }, find: function(t) { var e, n = this; return e = t ? "object" == typeof t ? r(t).filter(function() { var t = this; return o.some.call(n, function(e) { return r.contains(e, t) }) }) : 1 == this.length ? r(N.qsa(this[0], t)) : this.map(function() { return N.qsa(this, t) }) : r() }, closest: function(t, e) { var n = [],
          i = "object" == typeof t && r(t); return this.each(function(r, o) { for (; o && !(i ? i.indexOf(o) >= 0 : N.matches(o, t));) o = o !== e && !M(o) && o.parentNode;
          o && n.indexOf(o) < 0 && n.push(o) }), r(n) }, parents: function(t) { for (var e = [], n = this; n.length > 0;) n = r.map(n, function(t) { return (t = t.parentNode) && !M(t) && e.indexOf(t) < 0 ? (e.push(t), t) : void 0 }); return W(e, t) }, parent: function(t) { return W(P(this.pluck("parentNode")), t) }, children: function(t) { return W(this.map(function() { return U(this) }), t) }, contents: function() { return this.map(function() { return this.contentDocument || u.call(this.childNodes) }) }, siblings: function(t) { return W(this.map(function(t, e) { return a.call(U(e.parentNode), function(t) { return t !== e }) }), t) }, empty: function() { return this.each(function() { this.innerHTML = "" }) }, pluck: function(t) { return r.map(this, function(e) { return e[t] }) }, show: function() { return this.each(function() { "none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = B(this.nodeName)) }) }, replaceWith: function(t) { return this.before(t).remove() }, wrap: function(t) { var e = F(t); if (this[0] && !e) var n = r(t).get(0),
          i = n.parentNode || this.length > 1; return this.each(function(o) { r(this).wrapAll(e ? t.call(this, o) : i ? n.cloneNode(!0) : n) }) }, wrapAll: function(t) { if (this[0]) { r(this[0]).before(t = r(t)); for (var e;
            (e = t.children()).length;) t = e.first();
          r(t).append(this) } return this }, wrapInner: function(t) { var e = F(t); return this.each(function(n) { var i = r(this),
            o = i.contents(),
            s = e ? t.call(this, n) : t;
          o.length ? o.wrapAll(s) : i.append(s) }) }, unwrap: function() { return this.parent().each(function() { r(this).replaceWith(r(this).children()) }), this }, clone: function() { return this.map(function() { return this.cloneNode(!0) }) }, hide: function() { return this.css("display", "none") }, toggle: function(t) { return this.each(function() { var n = r(this);
          (t === e ? "none" == n.css("display") : t) ? n.show(): n.hide() }) }, prev: function(t) { return r(this.pluck("previousElementSibling")).filter(t || "*") }, next: function(t) { return r(this.pluck("nextElementSibling")).filter(t || "*") }, html: function(t) { return 0 in arguments ? this.each(function(e) { var n = this.innerHTML;
          r(this).empty().append(Y(this, t, e, n)) }) : 0 in this ? this[0].innerHTML : null }, text: function(t) { return 0 in arguments ? this.each(function(e) { var n = Y(this, t, e, this.textContent);
          this.textContent = null == n ? "" : "" + n }) : 0 in this ? this.pluck("textContent").join("") : null }, attr: function(t, r) { var i; return "string" != typeof t || 1 in arguments ? this.each(function(e) { if (1 === this.nodeType)
            if (R(t))
              for (n in t) G(this, n, t[n]);
            else G(this, t, Y(this, r, e, this.getAttribute(t))) }) : 0 in this && 1 == this[0].nodeType && null != (i = this[0].getAttribute(t)) ? i : e }, removeAttr: function(t) { return this.each(function() { 1 === this.nodeType && t.split(" ").forEach(function(t) { G(this, t) }, this) }) }, prop: function(t, e) { return t = D[t] || t, 1 in arguments ? this.each(function(n) { this[t] = Y(this, e, n, this[t]) }) : this[0] && this[0][t] }, removeProp: function(t) { return t = D[t] || t, this.each(function() { delete this[t] }) }, data: function(t, n) { var r = "data-" + t.replace(v, "-$1").toLowerCase(),
          i = 1 in arguments ? this.attr(r, n) : this.attr(r); return null !== i ? Q(i) : e }, val: function(t) { return 0 in arguments ? (null == t && (t = ""), this.each(function(e) { this.value = Y(this, t, e, this.value) })) : this[0] && (this[0].multiple ? r(this[0]).find("option").filter(function() { return this.selected }).pluck("value") : this[0].value) }, offset: function(e) { if (e) return this.each(function(t) { var n = r(this),
            i = Y(this, e, t, n.offset()),
            o = n.offsetParent().offset(),
            s = { top: i.top - o.top, left: i.left - o.left }; "static" == n.css("position") && (s.position = "relative"), n.css(s) }); if (!this.length) return null; if (f.documentElement !== this[0] && !r.contains(f.documentElement, this[0])) return { top: 0, left: 0 }; var n = this[0].getBoundingClientRect(); return { left: n.left + t.pageXOffset, top: n.top + t.pageYOffset, width: Math.round(n.width), height: Math.round(n.height) } }, css: function(t, e) { if (arguments.length < 2) { var i = this[0]; if ("string" == typeof t) { if (!i) return; return i.style[O(t)] || getComputedStyle(i, "").getPropertyValue(t) } if (L(t)) { if (!i) return; var o = {},
              s = getComputedStyle(i, ""); return r.each(t, function(t, e) { o[e] = i.style[O(e)] || s.getPropertyValue(e) }), o } } var a = ""; if ("string" == $(t)) e || 0 === e ? a = I(t) + ":" + _(t, e) : this.each(function() { this.style.removeProperty(I(t)) });
        else
          for (n in t) t[n] || 0 === t[n] ? a += I(n) + ":" + _(n, t[n]) + ";" : this.each(function() { this.style.removeProperty(I(n)) }); return this.each(function() { this.style.cssText += ";" + a }) }, index: function(t) { return t ? this.indexOf(r(t)[0]) : this.parent().children().indexOf(this[0]) }, hasClass: function(t) { return t ? o.some.call(this, function(t) { return this.test(K(t)) }, V(t)) : !1 }, addClass: function(t) { return t ? this.each(function(e) { if ("className" in this) { i = []; var n = K(this),
              o = Y(this, t, e, n);
            o.split(/\s+/g).forEach(function(t) { r(this).hasClass(t) || i.push(t) }, this), i.length && K(this, n + (n ? " " : "") + i.join(" ")) } }) : this }, removeClass: function(t) { return this.each(function(n) { if ("className" in this) { if (t === e) return K(this, "");
            i = K(this), Y(this, t, n, i).split(/\s+/g).forEach(function(t) { i = i.replace(V(t), " ") }), K(this, i.trim()) } }) }, toggleClass: function(t, n) { return t ? this.each(function(i) { var o = r(this),
            s = Y(this, t, i, K(this));
          s.split(/\s+/g).forEach(function(t) {
            (n === e ? !o.hasClass(t) : n) ? o.addClass(t): o.removeClass(t) }) }) : this }, scrollTop: function(t) { if (this.length) { var n = "scrollTop" in this[0]; return t === e ? n ? this[0].scrollTop : this[0].pageYOffset : this.each(n ? function() { this.scrollTop = t } : function() { this.scrollTo(this.scrollX, t) }) } }, scrollLeft: function(t) { if (this.length) { var n = "scrollLeft" in this[0]; return t === e ? n ? this[0].scrollLeft : this[0].pageXOffset : this.each(n ? function() { this.scrollLeft = t } : function() { this.scrollTo(t, this.scrollY) }) } }, position: function() { if (this.length) { var t = this[0],
            e = this.offsetParent(),
            n = this.offset(),
            i = g.test(e[0].nodeName) ? { top: 0, left: 0 } : e.offset(); return n.top -= parseFloat(r(t).css("margin-top")) || 0, n.left -= parseFloat(r(t).css("margin-left")) || 0, i.top += parseFloat(r(e[0]).css("border-top-width")) || 0, i.left += parseFloat(r(e[0]).css("border-left-width")) || 0, { top: n.top - i.top, left: n.left - i.left } } }, offsetParent: function() { return this.map(function() { for (var t = this.offsetParent || f.body; t && !g.test(t.nodeName) && "static" == r(t).css("position");) t = t.offsetParent; return t }) } }, r.fn.detach = r.fn.remove, ["width", "height"].forEach(function(t) { var n = t.replace(/./, function(t) { return t[0].toUpperCase() });
      r.fn[t] = function(i) { var o, s = this[0]; return i === e ? k(s) ? s["inner" + n] : M(s) ? s.documentElement["scroll" + n] : (o = this.offset()) && o[t] : this.each(function(e) { s = r(this), s.css(t, Y(this, i, e, s[t]())) }) } }), x.forEach(function(n, i) { var o = i % 2;
      r.fn[n] = function() { var n, a, s = r.map(arguments, function(t) { var i = []; return n = $(t), "array" == n ? (t.forEach(function(t) { return t.nodeType !== e ? i.push(t) : r.zepto.isZ(t) ? i = i.concat(t.get()) : void(i = i.concat(N.fragment(t))) }), i) : "object" == n || null == t ? t : N.fragment(t) }),
          u = this.length > 1; return s.length < 1 ? this : this.each(function(e, n) { a = o ? n : n.parentNode, n = 0 == i ? n.nextSibling : 1 == i ? n.firstChild : 2 == i ? n : null; var c = r.contains(f.documentElement, a);
          s.forEach(function(e) { if (u) e = e.cloneNode(!0);
            else if (!a) return r(e).remove();
            a.insertBefore(e, n), c && tt(e, function(e) { if (!(null == e.nodeName || "SCRIPT" !== e.nodeName.toUpperCase() || e.type && "text/javascript" !== e.type || e.src)) { var n = e.ownerDocument ? e.ownerDocument.defaultView : t;
                n.eval.call(n, e.innerHTML) } }) }) }) }, r.fn[o ? n + "To" : "insert" + (i ? "Before" : "After")] = function(t) { return r(t)[n](this), this } }), N.Z.prototype = X.prototype = r.fn, N.uniq = P, N.deserializeValue = Q, r.zepto = N, r }(); return t.Zepto = e, void 0 === t.$ && (t.$ = e),
    function(e) {
      function h(t) { return t._zid || (t._zid = n++) }

      function p(t, e, n, r) { if (e = d(e), e.ns) var i = m(e.ns); return (a[h(t)] || []).filter(function(t) { return t && (!e.e || t.e == e.e) && (!e.ns || i.test(t.ns)) && (!n || h(t.fn) === h(n)) && (!r || t.sel == r) }) }

      function d(t) { var e = ("" + t).split("."); return { e: e[0], ns: e.slice(1).sort().join(" ") } }

      function m(t) { return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)") }

      function g(t, e) { return t.del && !f && t.e in c || !!e }

      function v(t) { return l[t] || f && c[t] || t }

      function y(t, n, i, o, s, u, f) { var c = h(t),
          p = a[c] || (a[c] = []);
        n.split(/\s/).forEach(function(n) { if ("ready" == n) return e(document).ready(i); var a = d(n);
          a.fn = i, a.sel = s, a.e in l && (i = function(t) { var n = t.relatedTarget; return !n || n !== this && !e.contains(this, n) ? a.fn.apply(this, arguments) : void 0 }), a.del = u; var c = u || i;
          a.proxy = function(e) { if (e = T(e), !e.isImmediatePropagationStopped()) { e.data = o; var n = c.apply(t, e._args == r ? [e] : [e].concat(e._args)); return n === !1 && (e.preventDefault(), e.stopPropagation()), n } }, a.i = p.length, p.push(a), "addEventListener" in t && t.addEventListener(v(a.e), a.proxy, g(a, f)) }) }

      function x(t, e, n, r, i) { var o = h(t);
        (e || "").split(/\s/).forEach(function(e) { p(t, e, n, r).forEach(function(e) { delete a[o][e.i], "removeEventListener" in t && t.removeEventListener(v(e.e), e.proxy, g(e, i)) }) }) }

      function T(t, n) { return (n || !t.isDefaultPrevented) && (n || (n = t), e.each(w, function(e, r) { var i = n[e];
          t[e] = function() { return this[r] = b, i && i.apply(n, arguments) }, t[r] = E }), t.timeStamp || (t.timeStamp = Date.now()), (n.defaultPrevented !== r ? n.defaultPrevented : "returnValue" in n ? n.returnValue === !1 : n.getPreventDefault && n.getPreventDefault()) && (t.isDefaultPrevented = b)), t }

      function S(t) { var e, n = { originalEvent: t }; for (e in t) j.test(e) || t[e] === r || (n[e] = t[e]); return T(n, t) } var r, n = 1,
        i = Array.prototype.slice,
        o = e.isFunction,
        s = function(t) { return "string" == typeof t },
        a = {},
        u = {},
        f = "onfocusin" in t,
        c = { focus: "focusin", blur: "focusout" },
        l = { mouseenter: "mouseover", mouseleave: "mouseout" };
      u.click = u.mousedown = u.mouseup = u.mousemove = "MouseEvents", e.event = { add: y, remove: x }, e.proxy = function(t, n) { var r = 2 in arguments && i.call(arguments, 2); if (o(t)) { var a = function() { return t.apply(n, r ? r.concat(i.call(arguments)) : arguments) }; return a._zid = h(t), a } if (s(n)) return r ? (r.unshift(t[n], t), e.proxy.apply(null, r)) : e.proxy(t[n], t); throw new TypeError("expected function") }, e.fn.bind = function(t, e, n) { return this.on(t, e, n) }, e.fn.unbind = function(t, e) { return this.off(t, e) }, e.fn.one = function(t, e, n, r) { return this.on(t, e, n, r, 1) }; var b = function() { return !0 },
        E = function() { return !1 },
        j = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,
        w = { preventDefault: "isDefaultPrevented", stopImmediatePropagation: "isImmediatePropagationStopped", stopPropagation: "isPropagationStopped" };
      e.fn.delegate = function(t, e, n) { return this.on(e, t, n) }, e.fn.undelegate = function(t, e, n) { return this.off(e, t, n) }, e.fn.live = function(t, n) { return e(document.body).delegate(this.selector, t, n), this }, e.fn.die = function(t, n) { return e(document.body).undelegate(this.selector, t, n), this }, e.fn.on = function(t, n, a, u, f) { var c, l, h = this; return t && !s(t) ? (e.each(t, function(t, e) { h.on(t, n, a, e, f) }), h) : (s(n) || o(u) || u === !1 || (u = a, a = n, n = r), (u === r || a === !1) && (u = a, a = r), u === !1 && (u = E), h.each(function(r, o) { f && (c = function(t) { return x(o, t.type, u), u.apply(this, arguments) }), n && (l = function(t) { var r, s = e(t.target).closest(n, o).get(0); return s && s !== o ? (r = e.extend(S(t), { currentTarget: s, liveFired: o }), (c || u).apply(s, [r].concat(i.call(arguments, 1)))) : void 0 }), y(o, t, u, a, n, l || c) })) }, e.fn.off = function(t, n, i) { var a = this; return t && !s(t) ? (e.each(t, function(t, e) { a.off(t, n, e) }), a) : (s(n) || o(i) || i === !1 || (i = n, n = r), i === !1 && (i = E), a.each(function() { x(this, t, i, n) })) }, e.fn.trigger = function(t, n) { return t = s(t) || e.isPlainObject(t) ? e.Event(t) : T(t), t._args = n, this.each(function() { t.type in c && "function" == typeof this[t.type] ? this[t.type]() : "dispatchEvent" in this ? this.dispatchEvent(t) : e(this).triggerHandler(t, n) }) }, e.fn.triggerHandler = function(t, n) { var r, i; return this.each(function(o, a) { r = S(s(t) ? e.Event(t) : t), r._args = n, r.target = a, e.each(p(a, t.type || t), function(t, e) { return i = e.proxy(r), r.isImmediatePropagationStopped() ? !1 : void 0 }) }), i }, "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(t) { e.fn[t] = function(e) { return 0 in arguments ? this.bind(t, e) : this.trigger(t) } }), e.Event = function(t, e) { s(t) || (e = t, t = e.type); var n = document.createEvent(u[t] || "Events"),
          r = !0; if (e)
          for (var i in e) "bubbles" == i ? r = !!e[i] : n[i] = e[i]; return n.initEvent(t, r, !0), T(n) } }(e),
    function(e) {
      function p(t, n, r) { var i = e.Event(n); return e(t).trigger(i, r), !i.isDefaultPrevented() }

      function d(t, e, n, i) { return t.global ? p(e || r, n, i) : void 0 }

      function m(t) { t.global && 0 === e.active++ && d(t, null, "ajaxStart") }

      function g(t) { t.global && !--e.active && d(t, null, "ajaxStop") }

      function v(t, e) { var n = e.context; return e.beforeSend.call(n, t, e) === !1 || d(e, n, "ajaxBeforeSend", [t, e]) === !1 ? !1 : void d(e, n, "ajaxSend", [t, e]) }

      function y(t, e, n, r) { var i = n.context,
          o = "success";
        n.success.call(i, t, o, e), r && r.resolveWith(i, [t, o, e]), d(n, i, "ajaxSuccess", [e, n, t]), b(o, e, n) }

      function x(t, e, n, r, i) { var o = r.context;
        r.error.call(o, n, e, t), i && i.rejectWith(o, [n, e, t]), d(r, o, "ajaxError", [n, r, t || e]), b(e, n, r) }

      function b(t, e, n) { var r = n.context;
        n.complete.call(r, e, t), d(n, r, "ajaxComplete", [e, n]), g(n) }

      function E(t, e, n) { if (n.dataFilter == j) return t; var r = n.context; return n.dataFilter.call(r, t, e) }

      function j() {}

      function w(t) { return t && (t = t.split(";", 2)[0]), t && (t == c ? "html" : t == f ? "json" : a.test(t) ? "script" : u.test(t) && "xml") || "text" }

      function T(t, e) { return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?") }

      function S(t) { t.processData && t.data && "string" != e.type(t.data) && (t.data = e.param(t.data, t.traditional)), !t.data || t.type && "GET" != t.type.toUpperCase() && "jsonp" != t.dataType || (t.url = T(t.url, t.data), t.data = void 0) }

      function C(t, n, r, i) { return e.isFunction(n) && (i = r, r = n, n = void 0), e.isFunction(r) || (i = r, r = void 0), { url: t, data: n, success: r, dataType: i } }

      function O(t, n, r, i) { var o, s = e.isArray(n),
          a = e.isPlainObject(n);
        e.each(n, function(n, u) { o = e.type(u), i && (n = r ? i : i + "[" + (a || "object" == o || "array" == o ? n : "") + "]"), !i && s ? t.add(u.name, u.value) : "array" == o || !r && "object" == o ? O(t, u, r, n) : t.add(n, u) }) } var i, o, n = +new Date,
        r = t.document,
        s = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        a = /^(?:text|application)\/javascript/i,
        u = /^(?:text|application)\/xml/i,
        f = "application/json",
        c = "text/html",
        l = /^\s*$/,
        h = r.createElement("a");
      h.href = t.location.href, e.active = 0, e.ajaxJSONP = function(i, o) { if (!("type" in i)) return e.ajax(i); var c, p, s = i.jsonpCallback,
          a = (e.isFunction(s) ? s() : s) || "Zepto" + n++,
          u = r.createElement("script"),
          f = t[a],
          l = function(t) { e(u).triggerHandler("error", t || "abort") },
          h = { abort: l }; return o && o.promise(h), e(u).on("load error", function(n, r) { clearTimeout(p), e(u).off().remove(), "error" != n.type && c ? y(c[0], h, i, o) : x(null, r || "error", h, i, o), t[a] = f, c && e.isFunction(f) && f(c[0]), f = c = void 0 }), v(h, i) === !1 ? (l("abort"), h) : (t[a] = function() { c = arguments }, u.src = i.url.replace(/\?(.+)=\?/, "?$1=" + a), r.head.appendChild(u), i.timeout > 0 && (p = setTimeout(function() { l("timeout") }, i.timeout)), h) }, e.ajaxSettings = { type: "GET", beforeSend: j, success: j, error: j, complete: j, context: null, global: !0, xhr: function() { return new t.XMLHttpRequest }, accepts: { script: "text/javascript, application/javascript, application/x-javascript", json: f, xml: "application/xml, text/xml", html: c, text: "text/plain" }, crossDomain: !1, timeout: 0, processData: !0, cache: !0, dataFilter: j }, e.ajax = function(n) { var u, f, s = e.extend({}, n || {}),
          a = e.Deferred && e.Deferred(); for (i in e.ajaxSettings) void 0 === s[i] && (s[i] = e.ajaxSettings[i]);
        m(s), s.crossDomain || (u = r.createElement("a"), u.href = s.url, u.href = u.href, s.crossDomain = h.protocol + "//" + h.host != u.protocol + "//" + u.host), s.url || (s.url = t.location.toString()), (f = s.url.indexOf("#")) > -1 && (s.url = s.url.slice(0, f)), S(s); var c = s.dataType,
          p = /\?.+=\?/.test(s.url); if (p && (c = "jsonp"), s.cache !== !1 && (n && n.cache === !0 || "script" != c && "jsonp" != c) || (s.url = T(s.url, "_=" + Date.now())), "jsonp" == c) return p || (s.url = T(s.url, s.jsonp ? s.jsonp + "=?" : s.jsonp === !1 ? "" : "callback=?")), e.ajaxJSONP(s, a); var P, d = s.accepts[c],
          g = {},
          b = function(t, e) { g[t.toLowerCase()] = [t, e] },
          C = /^([\w-]+:)\/\//.test(s.url) ? RegExp.$1 : t.location.protocol,
          N = s.xhr(),
          O = N.setRequestHeader; if (a && a.promise(N), s.crossDomain || b("X-Requested-With", "XMLHttpRequest"), b("Accept", d || "*/*"), (d = s.mimeType || d) && (d.indexOf(",") > -1 && (d = d.split(",", 2)[0]), N.overrideMimeType && N.overrideMimeType(d)), (s.contentType || s.contentType !== !1 && s.data && "GET" != s.type.toUpperCase()) && b("Content-Type", s.contentType || "application/x-www-form-urlencoded"), s.headers)
          for (o in s.headers) b(o, s.headers[o]); if (N.setRequestHeader = b, N.onreadystatechange = function() { if (4 == N.readyState) { N.onreadystatechange = j, clearTimeout(P); var t, n = !1; if (N.status >= 200 && N.status < 300 || 304 == N.status || 0 == N.status && "file:" == C) { if (c = c || w(s.mimeType || N.getResponseHeader("content-type")), "arraybuffer" == N.responseType || "blob" == N.responseType) t = N.response;
                else { t = N.responseText; try { t = E(t, c, s), "script" == c ? (1, eval)(t) : "xml" == c ? t = N.responseXML : "json" == c && (t = l.test(t) ? null : e.parseJSON(t)) } catch (r) { n = r } if (n) return x(n, "parsererror", N, s, a) } y(t, N, s, a) } else x(N.statusText || null, N.status ? "error" : "abort", N, s, a) } }, v(N, s) === !1) return N.abort(), x(null, "abort", N, s, a), N; var A = "async" in s ? s.async : !0; if (N.open(s.type, s.url, A, s.username, s.password), s.xhrFields)
          for (o in s.xhrFields) N[o] = s.xhrFields[o]; for (o in g) O.apply(N, g[o]); return s.timeout > 0 && (P = setTimeout(function() { N.onreadystatechange = j, N.abort(), x(null, "timeout", N, s, a) }, s.timeout)), N.send(s.data ? s.data : null), N }, e.get = function() { return e.ajax(C.apply(null, arguments)) }, e.post = function() { var t = C.apply(null, arguments); return t.type = "POST", e.ajax(t) }, e.getJSON = function() { var t = C.apply(null, arguments); return t.dataType = "json", e.ajax(t) }, e.fn.load = function(t, n, r) { if (!this.length) return this; var a, i = this,
          o = t.split(/\s/),
          u = C(t, n, r),
          f = u.success; return o.length > 1 && (u.url = o[0], a = o[1]), u.success = function(t) { i.html(a ? e("<div>").html(t.replace(s, "")).find(a) : t), f && f.apply(i, arguments) }, e.ajax(u), this }; var N = encodeURIComponent;
      e.param = function(t, n) { var r = []; return r.add = function(t, n) { e.isFunction(n) && (n = n()), null == n && (n = ""), this.push(N(t) + "=" + N(n)) }, O(r, t, n), r.join("&").replace(/%20/g, "+") } }(e),
    function(t) { t.fn.serializeArray = function() { var e, n, r = [],
          i = function(t) { return t.forEach ? t.forEach(i) : void r.push({ name: e, value: t }) }; return this[0] && t.each(this[0].elements, function(r, o) { n = o.type, e = o.name, e && "fieldset" != o.nodeName.toLowerCase() && !o.disabled && "submit" != n && "reset" != n && "button" != n && "file" != n && ("radio" != n && "checkbox" != n || o.checked) && i(t(o).val()) }), r }, t.fn.serialize = function() { var t = []; return this.serializeArray().forEach(function(e) { t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value)) }), t.join("&") }, t.fn.submit = function(e) { if (0 in arguments) this.bind("submit", e);
        else if (this.length) { var n = t.Event("submit");
          this.eq(0).trigger(n), n.isDefaultPrevented() || this.get(0).submit() } return this } }(e),
    function() { try { getComputedStyle(void 0) } catch (e) { var n = getComputedStyle;
        t.getComputedStyle = function(t, e) { try { return n(t, e) } catch (r) { return null } } } }(), e });
//data方法扩展
(function(d) { var c = {},
    g = d.fn.data,
    e = d.camelCase,
    b = d.expando = "Zepto" + (+new Date()),
    h = [];

  function a(m, l) { var n = m[b],
      j = n && c[n]; if (l === undefined) { return j || i(m) } else { if (j) { if (l in j) { return j[l] } var k = e(l); if (k in j) { return j[k] } } return g.call(d(m), l) } }

  function i(l, k, m) { var n = l[b] || (l[b] = ++d.uuid),
      j = c[n] || (c[n] = f(l)); if (k !== undefined) { j[e(k)] = m } return j }

  function f(k) { var j = {};
    d.each(k.attributes || h, function(m, l) { if (l.name.indexOf("data-") == 0) { j[e(l.name.replace("data-", ""))] = d.zepto.deserializeValue(l.value) } }); return j } d.fn.data = function(j, k) { return k === undefined ? d.isPlainObject(j) ? this.each(function(l, m) { d.each(j, function(n, o) { i(m, n, o) }) }) : (0 in this ? a(this[0], j) : undefined) : this.each(function() { i(this, j, k) }) };
  d.data = function(k, j, l) { return d(k).data(j, l) };
  d.hasData = function(k) { var l = k[b],
      j = l && c[l]; return j ? !d.isEmptyObject(j) : false };
  d.fn.removeData = function(j) { if (typeof j == "string") { j = j.split(/\s+/) } return this.each(function() { var l = this[b],
        k = l && c[l]; if (k) { d.each(j || k, function(m) { delete k[j ? e(this) : m] }) } }) };
  ["remove", "empty"].forEach(function(j) { var k = d.fn[j];
    d.fn[j] = function() { var l = this.find("*"); if (j === "remove") { l = l.add(this) } l.removeData(); return k.call(this) } }) })(Zepto);
// 扩展outerWidth,outerHeight方法
(function(a) {
  ["width", "height"].forEach(function(c) { var b = c.replace(/./, function(d) { return d[0].toUpperCase() });
    a.fn["outer" + b] = function(d) { var g = this; if (g) { var e = g[c](); var f = { width: ["left", "right"], height: ["top", "bottom"] };
        f[c].forEach(function(h) { if (d) { e += parseInt(g.css("margin-" + h), 10) } }); return e } else { return null } } }) })($);
(function(e) {
  function v(a, c, d, e) { return Math.abs(a - c) >= Math.abs(d - e) ? 0 < a - c ? "Left" : "Right" : 0 < d - e ? "Up" : "Down" }

  function w() { c = null;
    a.last && (a.el.trigger("longTap"), a = {}) }

  function r() { d && clearTimeout(d);
    k && clearTimeout(k);
    l && clearTimeout(l);
    c && clearTimeout(c);
    d = k = l = c = null;
    a = {} }

  function t(a) { return ("touch" == a.pointerType || a.pointerType == a.MSPOINTER_TYPE_TOUCH) && a.isPrimary }

  function u(a, c) { return a.type == "pointer" + c || a.type.toLowerCase() == "mspointer" + c }
  var a = {},
    d, k, l, c, m;
  e(document).ready(function() {
    var h,
      n, p = 0,
      q = 0,
      f, g;
    "MSGesture" in window && (m = new MSGesture, m.target = document.body);
    e(document).bind("MSGestureEnd", function(b) { if (b = 1 < b.velocityX ? "Right" : -1 > b.velocityX ? "Left" : 1 < b.velocityY ? "Down" : -1 > b.velocityY ? "Up" : null) a.el.trigger("swipe"), a.el.trigger("swipe" + b) }).on("touchstart MSPointerDown pointerdown", function(b) {
      if (!(g = u(b, "down")) || t(b)) f = g ? b : b.touches[0], b.touches && 1 === b.touches.length && a.x2 && (a.x2 = void 0, a.y2 = void 0), h = Date.now(), n = h - (a.last || h), a.el = e("tagName" in f.target ? f.target : f.target.parentNode),
        d && clearTimeout(d), a.x1 = f.pageX, a.y1 = f.pageY, 0 < n && 250 >= n && (a.isDoubleTap = !0), a.last = h, c = setTimeout(w, 750), m && g && m.addPointer(b.pointerId)
    }).on("touchmove MSPointerMove pointermove", function(b) { if (!(g = u(b, "move")) || t(b)) f = g ? b : b.touches[0], c && clearTimeout(c), c = null, a.x2 = f.pageX, a.y2 = f.pageY, p += Math.abs(a.x1 - a.x2), q += Math.abs(a.y1 - a.y2) }).on("touchend MSPointerUp", function(b) {
      if (!(g = u(b, "up")) || t(b)) c && clearTimeout(c), c = null, a.x2 && 30 < Math.abs(a.x1 - a.x2) || a.y2 && 30 < Math.abs(a.y1 - a.y2) ? l = setTimeout(function() {
        a.el &&
          (a.el.trigger("swipe"), a.el.trigger("swipe" + v(a.x1, a.x2, a.y1, a.y2)));
        a = {}
      }, 0) : "last" in a && (30 > p && 30 > q ? k = setTimeout(function() { var b = e.Event("tap");
        b.cancelTouch = r;
        a.el && a.el.trigger(b);
        a.isDoubleTap ? (a.el && a.el.trigger("doubleTap"), a = {}) : d = setTimeout(function() { d = null;
          a.el && a.el.trigger("singleTap");
          a = {} }, 250) }, 0) : a = {}), p = q = 0
    }).on("touchcancel MSPointerCancel pointercancel", r);
    e(window).on("scroll", r)
  });
  "swipe swipeLeft swipeRight swipeUp swipeDown doubleTap tap singleTap longTap".split(" ").forEach(function(a) {
    e.fn[a] =
      function(c) { return this.on(a, c) }
  })
})(Zepto);

;
(function() {
  'use strict';

  /**
   * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
   *
   * @codingstandard ftlabs-jsv2
   * @copyright The Financial Times Limited [All Rights Reserved]
   * @license MIT License (see LICENSE.txt)
   */

  /*jslint browser:true, node:true*/
  /*global define, Event, Node*/


  /**
   * Instantiate fast-clicking listeners on the specified layer.
   *
   * @constructor
   * @param {Element} layer The layer to listen on
   * @param {Object} [options={}] The options to override the defaults
   */
  function FastClick(layer, options) {
    var oldOnClick;

    options = options || {};

    /**
     * Whether a click is currently being tracked.
     *
     * @type boolean
     */
    this.trackingClick = false;


    /**
     * Timestamp for when click tracking started.
     *
     * @type number
     */
    this.trackingClickStart = 0;


    /**
     * The element being tracked for a click.
     *
     * @type EventTarget
     */
    this.targetElement = null;


    /**
     * X-coordinate of touch start event.
     *
     * @type number
     */
    this.touchStartX = 0;


    /**
     * Y-coordinate of touch start event.
     *
     * @type number
     */
    this.touchStartY = 0;


    /**
     * ID of the last touch, retrieved from Touch.identifier.
     *
     * @type number
     */
    this.lastTouchIdentifier = 0;


    /**
     * Touchmove boundary, beyond which a click will be cancelled.
     *
     * @type number
     */
    this.touchBoundary = options.touchBoundary || 10;


    /**
     * The FastClick layer.
     *
     * @type Element
     */
    this.layer = layer;

    /**
     * The minimum time between tap(touchstart and touchend) events
     *
     * @type number
     */
    this.tapDelay = options.tapDelay || 200;

    /**
     * The maximum time for a tap
     *
     * @type number
     */
    this.tapTimeout = options.tapTimeout || 700;

    if (FastClick.notNeeded(layer)) {
      return;
    }

    // Some old versions of Android don't have Function.prototype.bind
    function bind(method, context) {
      return function() { return method.apply(context, arguments); };
    }


    var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
    var context = this;
    for (var i = 0, l = methods.length; i < l; i++) {
      context[methods[i]] = bind(context[methods[i]], context);
    }

    // Set up event handlers as required
    if (deviceIsAndroid) {
      layer.addEventListener('mouseover', this.onMouse, true);
      layer.addEventListener('mousedown', this.onMouse, true);
      layer.addEventListener('mouseup', this.onMouse, true);
    }

    layer.addEventListener('click', this.onClick, true);
    layer.addEventListener('touchstart', this.onTouchStart, false);
    layer.addEventListener('touchmove', this.onTouchMove, false);
    layer.addEventListener('touchend', this.onTouchEnd, false);
    layer.addEventListener('touchcancel', this.onTouchCancel, false);

    // Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
    // which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
    // layer when they are cancelled.
    if (!Event.prototype.stopImmediatePropagation) {
      layer.removeEventListener = function(type, callback, capture) {
        var rmv = Node.prototype.removeEventListener;
        if (type === 'click') {
          rmv.call(layer, type, callback.hijacked || callback, capture);
        } else {
          rmv.call(layer, type, callback, capture);
        }
      };

      layer.addEventListener = function(type, callback, capture) {
        var adv = Node.prototype.addEventListener;
        if (type === 'click') {
          adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
            if (!event.propagationStopped) {
              callback(event);
            }
          }), capture);
        } else {
          adv.call(layer, type, callback, capture);
        }
      };
    }

    // If a handler is already declared in the element's onclick attribute, it will be fired before
    // FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
    // adding it as listener.
    if (typeof layer.onclick === 'function') {

      // Android browser on at least 3.2 requires a new reference to the function in layer.onclick
      // - the old one won't work if passed to addEventListener directly.
      oldOnClick = layer.onclick;
      layer.addEventListener('click', function(event) {
        oldOnClick(event);
      }, false);
      layer.onclick = null;
    }
  }

  /**
   * Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
   *
   * @type boolean
   */
  var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

  /**
   * Android requires exceptions.
   *
   * @type boolean
   */
  var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


  /**
   * iOS requires exceptions.
   *
   * @type boolean
   */
  var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


  /**
   * iOS 4 requires an exception for select elements.
   *
   * @type boolean
   */
  var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


  /**
   * iOS 6.0-7.* requires the target element to be manually derived
   *
   * @type boolean
   */
  var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

  /**
   * BlackBerry requires exceptions.
   *
   * @type boolean
   */
  var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

  /**
   * Determine whether a given element requires a native click.
   *
   * @param {EventTarget|Element} target Target DOM element
   * @returns {boolean} Returns true if the element needs a native click
   */
  FastClick.prototype.needsClick = function(target) {
    switch (target.nodeName.toLowerCase()) {

      // Don't send a synthetic click to disabled inputs (issue #62)
      case 'button':
      case 'select':
      case 'textarea':
        if (target.disabled) {
          return true;
        }

        break;
      case 'input':

        // File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
        if ((deviceIsIOS && target.type === 'file') || target.disabled) {
          return true;
        }

        break;
      case 'label':
      case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
      case 'video':
        return true;
    }

    return (/\bneedsclick\b/).test(target.className);
  };


  /**
   * Determine whether a given element requires a call to focus to simulate click into element.
   *
   * @param {EventTarget|Element} target Target DOM element
   * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
   */
  FastClick.prototype.needsFocus = function(target) {
    switch (target.nodeName.toLowerCase()) {
      case 'textarea':
        return true;
      case 'select':
        return !deviceIsAndroid;
      case 'input':
        switch (target.type) {
          case 'button':
          case 'checkbox':
          case 'file':
          case 'image':
          case 'radio':
          case 'submit':
            return false;
        }

        // No point in attempting to focus disabled inputs
        return !target.disabled && !target.readOnly;
      default:
        return (/\bneedsfocus\b/).test(target.className);
    }
  };


  /**
   * Send a click event to the specified element.
   *
   * @param {EventTarget|Element} targetElement
   * @param {Event} event
   */
  FastClick.prototype.sendClick = function(targetElement, event) {
    var clickEvent, touch;

    // On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
    if (document.activeElement && document.activeElement !== targetElement) {
      document.activeElement.blur();
    }

    touch = event.changedTouches[0];

    // Synthesise a click event, with an extra attribute so it can be tracked
    clickEvent = document.createEvent('MouseEvents');
    clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
    clickEvent.forwardedTouchEvent = true;
    targetElement.dispatchEvent(clickEvent);
  };

  FastClick.prototype.determineEventType = function(targetElement) {

    //Issue #159: Android Chrome Select Box does not open with a synthetic click event
    if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
      return 'mousedown';
    }

    return 'click';
  };


  /**
   * @param {EventTarget|Element} targetElement
   */
  FastClick.prototype.focus = function(targetElement) {
    var length;

    // Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
    if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month' && targetElement.type !== 'email') {
      length = targetElement.value.length;
      targetElement.setSelectionRange(length, length);
    } else {
      targetElement.focus();
    }
  };


  /**
   * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
   *
   * @param {EventTarget|Element} targetElement
   */
  FastClick.prototype.updateScrollParent = function(targetElement) {
    var scrollParent, parentElement;

    scrollParent = targetElement.fastClickScrollParent;

    // Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
    // target element was moved to another parent.
    if (!scrollParent || !scrollParent.contains(targetElement)) {
      parentElement = targetElement;
      do {
        if (parentElement.scrollHeight > parentElement.offsetHeight) {
          scrollParent = parentElement;
          targetElement.fastClickScrollParent = parentElement;
          break;
        }

        parentElement = parentElement.parentElement;
      } while (parentElement);
    }

    // Always update the scroll top tracker if possible.
    if (scrollParent) {
      scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
    }
  };


  /**
   * @param {EventTarget} targetElement
   * @returns {Element|EventTarget}
   */
  FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

    // On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
    if (eventTarget.nodeType === Node.TEXT_NODE) {
      return eventTarget.parentNode;
    }

    return eventTarget;
  };


  /**
   * On touch start, record the position and scroll offset.
   *
   * @param {Event} event
   * @returns {boolean}
   */
  FastClick.prototype.onTouchStart = function(event) {
    var targetElement, touch, selection;

    // Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
    if (event.targetTouches.length > 1) {
      return true;
    }

    targetElement = this.getTargetElementFromEventTarget(event.target);
    touch = event.targetTouches[0];

    if (deviceIsIOS) {

      var nodeName = targetElement.nodeName.toLowerCase();
      var typeAttribute = targetElement.getAttribute('type');
      if (nodeName === "select") {
        return false;
      }

      // Only trusted events will deselect text on iOS (issue #49)
      selection = window.getSelection();
      if (selection.rangeCount && !selection.isCollapsed) {
        return true;
      }

      if (!deviceIsIOS4) {

        // Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
        // when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
        // with the same identifier as the touch event that previously triggered the click that triggered the alert.
        // Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
        // immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
        // Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
        // which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
        // random integers, it's safe to to continue if the identifier is 0 here.
        if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
          event.preventDefault();
          return false;
        }

        this.lastTouchIdentifier = touch.identifier;

        // If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
        // 1) the user does a fling scroll on the scrollable layer
        // 2) the user stops the fling scroll with another tap
        // then the event.target of the last 'touchend' event will be the element that was under the user's finger
        // when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
        // is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
        this.updateScrollParent(targetElement);
      }
    }

    this.trackingClick = true;
    this.trackingClickStart = event.timeStamp;
    this.targetElement = targetElement;

    this.touchStartX = touch.pageX;
    this.touchStartY = touch.pageY;

    // Prevent phantom clicks on fast double-tap (issue #36)
    if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
      event.preventDefault();
    }

    return true;
  };


  /**
   * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
   *
   * @param {Event} event
   * @returns {boolean}
   */
  FastClick.prototype.touchHasMoved = function(event) {
    var touch = event.changedTouches[0],
      boundary = this.touchBoundary;

    if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
      return true;
    }

    return false;
  };


  /**
   * Update the last position.
   *
   * @param {Event} event
   * @returns {boolean}
   */
  FastClick.prototype.onTouchMove = function(event) {
    if (!this.trackingClick) {
      return true;
    }

    // If the touch has moved, cancel the click tracking
    if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
      this.trackingClick = false;
      this.targetElement = null;
    }

    return true;
  };


  /**
   * Attempt to find the labelled control for the given label element.
   *
   * @param {EventTarget|HTMLLabelElement} labelElement
   * @returns {Element|null}
   */
  FastClick.prototype.findControl = function(labelElement) {

    // Fast path for newer browsers supporting the HTML5 control attribute
    if (labelElement.control !== undefined) {
      return labelElement.control;
    }

    // All browsers under test that support touch events also support the HTML5 htmlFor attribute
    if (labelElement.htmlFor) {
      return document.getElementById(labelElement.htmlFor);
    }

    // If no for attribute exists, attempt to retrieve the first labellable descendant element
    // the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
    return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
  };


  /**
   * On touch end, determine whether to send a click event at once.
   *
   * @param {Event} event
   * @returns {boolean}
   */
  FastClick.prototype.onTouchEnd = function(event) {
    var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

    if (!this.trackingClick) {
      return true;
    }

    // Prevent phantom clicks on fast double-tap (issue #36)
    if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
      this.cancelNextClick = true;
      return true;
    }

    if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
      return true;
    }

    // Reset to prevent wrong click cancel on input (issue #156).
    this.cancelNextClick = false;

    this.lastClickTime = event.timeStamp;

    trackingClickStart = this.trackingClickStart;
    this.trackingClick = false;
    this.trackingClickStart = 0;

    // On some iOS devices, the targetElement supplied with the event is invalid if the layer
    // is performing a transition or scroll, and has to be re-detected manually. Note that
    // for this to function correctly, it must be called *after* the event target is checked!
    // See issue #57; also filed as rdar://13048589 .
    if (deviceIsIOSWithBadTarget) {
      touch = event.changedTouches[0];

      // In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
      targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
      targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
    }

    targetTagName = targetElement.tagName.toLowerCase();
    if (targetTagName === 'label') {
      forElement = this.findControl(targetElement);
      if (forElement) {
        this.focus(targetElement);
        if (deviceIsAndroid) {
          return false;
        }

        targetElement = forElement;
      }
    } else if (this.needsFocus(targetElement)) {

      // Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
      // Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
      if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
        this.targetElement = null;
        return false;
      }

      this.focus(targetElement);
      this.sendClick(targetElement, event);

      // Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
      // Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
      if (!deviceIsIOS || targetTagName !== 'select') {
        this.targetElement = null;
        event.preventDefault();
      }

      return false;
    }

    if (deviceIsIOS && !deviceIsIOS4) {

      // Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
      // and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
      scrollParent = targetElement.fastClickScrollParent;
      if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
        return true;
      }
    }

    // Prevent the actual click from going though - unless the target node is marked as requiring
    // real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
    if (!this.needsClick(targetElement)) {
      event.preventDefault();
      this.sendClick(targetElement, event);
    }

    return false;
  };


  /**
   * On touch cancel, stop tracking the click.
   *
   * @returns {void}
   */
  FastClick.prototype.onTouchCancel = function() {
    this.trackingClick = false;
    this.targetElement = null;
  };


  /**
   * Determine mouse events which should be permitted.
   *
   * @param {Event} event
   * @returns {boolean}
   */
  FastClick.prototype.onMouse = function(event) {

    // If a target element was never set (because a touch event was never fired) allow the event
    if (!this.targetElement) {
      return true;
    }

    if (event.forwardedTouchEvent) {
      return true;
    }

    // Programmatically generated events targeting a specific element should be permitted
    if (!event.cancelable) {
      return true;
    }

    // Derive and check the target element to see whether the mouse event needs to be permitted;
    // unless explicitly enabled, prevent non-touch click events from triggering actions,
    // to prevent ghost/doubleclicks.
    if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

      // Prevent any user-added listeners declared on FastClick element from being fired.
      if (event.stopImmediatePropagation) {
        event.stopImmediatePropagation();
      } else {

        // Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
        event.propagationStopped = true;
      }

      // Cancel the event
      event.stopPropagation();
      event.preventDefault();

      return false;
    }

    // If the mouse event is permitted, return true for the action to go through.
    return true;
  };


  /**
   * On actual clicks, determine whether this is a touch-generated click, a click action occurring
   * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
   * an actual click which should be permitted.
   *
   * @param {Event} event
   * @returns {boolean}
   */
  FastClick.prototype.onClick = function(event) {
    var permitted;

    // It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
    if (this.trackingClick) {
      this.targetElement = null;
      this.trackingClick = false;
      return true;
    }

    // Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
    if (event.target.type === 'submit' && event.detail === 0) {
      return true;
    }

    permitted = this.onMouse(event);

    // Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
    if (!permitted) {
      this.targetElement = null;
    }

    // If clicks are permitted, return true for the action to go through.
    return permitted;
  };


  /**
   * Remove all FastClick's event listeners.
   *
   * @returns {void}
   */
  FastClick.prototype.destroy = function() {
    var layer = this.layer;

    if (deviceIsAndroid) {
      layer.removeEventListener('mouseover', this.onMouse, true);
      layer.removeEventListener('mousedown', this.onMouse, true);
      layer.removeEventListener('mouseup', this.onMouse, true);
    }

    layer.removeEventListener('click', this.onClick, true);
    layer.removeEventListener('touchstart', this.onTouchStart, false);
    layer.removeEventListener('touchmove', this.onTouchMove, false);
    layer.removeEventListener('touchend', this.onTouchEnd, false);
    layer.removeEventListener('touchcancel', this.onTouchCancel, false);
  };


  /**
   * Check whether FastClick is needed.
   *
   * @param {Element} layer The layer to listen on
   */
  FastClick.notNeeded = function(layer) {
    var metaViewport;
    var chromeVersion;
    var blackberryVersion;
    var firefoxVersion;

    // Devices that don't support touch don't need FastClick
    if (typeof window.ontouchstart === 'undefined') {
      return true;
    }

    // Chrome version - zero for other browsers
    chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

    if (chromeVersion) {

      if (deviceIsAndroid) {
        metaViewport = document.querySelector('meta[name=viewport]');

        if (metaViewport) {
          // Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
          if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
            return true;
          }
          // Chrome 32 and above with width=device-width or less don't need FastClick
          if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
            return true;
          }
        }

        // Chrome desktop doesn't need FastClick (issue #15)
      } else {
        return true;
      }
    }

    if (deviceIsBlackBerry10) {
      blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

      // BlackBerry 10.3+ does not require Fastclick library.
      // https://github.com/ftlabs/fastclick/issues/251
      if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
        metaViewport = document.querySelector('meta[name=viewport]');

        if (metaViewport) {
          // user-scalable=no eliminates click delay.
          if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
            return true;
          }
          // width=device-width (or less than device-width) eliminates click delay.
          if (document.documentElement.scrollWidth <= window.outerWidth) {
            return true;
          }
        }
      }
    }

    // IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
    if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
      return true;
    }

    // Firefox version - zero for other browsers
    firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

    if (firefoxVersion >= 27) {
      // Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

      metaViewport = document.querySelector('meta[name=viewport]');
      if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
        return true;
      }
    }

    // IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
    // http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
    if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
      return true;
    }

    return false;
  };


  /**
   * Factory method for creating a FastClick object
   *
   * @param {Element} layer The layer to listen on
   * @param {Object} [options={}] The options to override the defaults
   */
  FastClick.attach = function(layer, options) {
    return new FastClick(layer, options);
  };


  if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

    // AMD. Register as an anonymous module.
    define(function() {
      return FastClick;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = FastClick.attach;
    module.exports.FastClick = FastClick;
  } else {
    window.FastClick = FastClick;
  }
}());
