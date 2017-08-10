(function(a, b) {
	function cy(a) {
		return f.isWindow(a) ? a: a.nodeType === 9 ? a.defaultView || a.parentWindow: !1
	}
	function cu(a) {
		if (!cj[a]) {
			var b = c.body,
			d = f("<" + a + ">").appendTo(b),
			e = d.css("display");
			d.remove();
			if (e === "none" || e === "") {
				ck || (ck = c.createElement("iframe"), ck.frameBorder = ck.width = ck.height = 0),
				b.appendChild(ck);
				if (!cl || !ck.createElement) cl = (ck.contentWindow || ck.contentDocument).document,
				cl.write((f.support.boxModel ? "<!doctype html>": "") + "<html><body>"),
				cl.close();
				d = cl.createElement(a),
				cl.body.appendChild(d),
				e = f.css(d, "display"),
				b.removeChild(ck)
			}
			cj[a] = e
		}
		return cj[a]
	}
	function ct(a, b) {
		var c = {};
		f.each(cp.concat.apply([], cp.slice(0, b)),
				function() {
			c[this] = a
		});
		return c
	}
	function cs() {
		cq = b
	}
	function cr() {
		setTimeout(cs, 0);
		return cq = f.now()
	}
	function ci() {
		try {
			return new a.ActiveXObject("Microsoft.XMLHTTP")
		} catch(b) {}
	}
	function ch() {
		try {
			return new a.XMLHttpRequest
		} catch(b) {}
	}
	function cb(a, c) {
		a.dataFilter && (c = a.dataFilter(c, a.dataType));
		var d = a.dataTypes,
		e = {},
		g, h, i = d.length,
		j, k = d[0],
		l,
		m,
		n,
		o,
		p;
		for (g = 1; g < i; g++) {
			if (g === 1) for (h in a.converters) typeof h == "string" && (e[h.toLowerCase()] = a.converters[h]);
			l = k,
			k = d[g];
			if (k === "*") k = l;
			else if (l !== "*" && l !== k) {
				m = l + " " + k,
				n = e[m] || e["* " + k];
				if (!n) {
					p = b;
					for (o in e) {
						j = o.split(" ");
						if (j[0] === l || j[0] === "*") {
							p = e[j[1] + " " + k];
							if (p) {
								o = e[o],
								o === !0 ? n = p: p === !0 && (n = o);
								break
							}
						}
					}
				} ! n && !p && f.error("No conversion from " + m.replace(" ", " to ")),
				n !== !0 && (c = n ? n(c) : p(o(c)))
			}
		}
		return c
	}
	function ca(a, c, d) {
		var e = a.contents,
		f = a.dataTypes,
		g = a.responseFields,
		h, i, j, k;
		for (i in g) i in d && (c[g[i]] = d[i]);
		while (f[0] === "*") f.shift(),
		h === b && (h = a.mimeType || c.getResponseHeader("content-type"));
		if (h) for (i in e) if (e[i] && e[i].test(h)) {
			f.unshift(i);
			break
		}
		if (f[0] in d) j = f[0];
		else {
			for (i in d) {
				if (!f[0] || a.converters[i + " " + f[0]]) {
					j = i;
					break
				}
				k || (k = i)
			}
			j = j || k
		}
		if (j) {
			j !== f[0] && f.unshift(j);
			return d[j]
		}
	}
	function b_(a, b, c, d) {
		if (f.isArray(b)) f.each(b,
				function(b, e) {
			c || bD.test(a) ? d(a, e) : b_(a + "[" + (typeof e == "object" ? b: "") + "]", e, c, d)
		});
		else if (!c && f.type(b) === "object") for (var e in b) b_(a + "[" + e + "]", b[e], c, d);
		else d(a, b)
	}
	function b$(a, c) {
		var d, e, g = f.ajaxSettings.flatOptions || {};
		for (d in c) c[d] !== b && ((g[d] ? a: e || (e = {}))[d] = c[d]);
		e && f.extend(!0, a, e)
	}
	function bZ(a, c, d, e, f, g) {
		f = f || c.dataTypes[0],
		g = g || {},
		g[f] = !0;
		var h = a[f],
		i = 0,
		j = h ? h.length: 0,
				k = a === bS,
				l;
		for (; i < j && (k || !l); i++) l = h[i](c, d, e),
		typeof l == "string" && (!k || g[l] ? l = b: (c.dataTypes.unshift(l), l = bZ(a, c, d, e, l, g))); (k || !l) && !g["*"] && (l = bZ(a, c, d, e, "*", g));
		return l
	}
	function bY(a) {
		return function(b, c) {
			typeof b != "string" && (c = b, b = "*");
			if (f.isFunction(c)) {
				var d = b.toLowerCase().split(bO),
				e = 0,
				g = d.length,
				h,
				i,
				j;
				for (; e < g; e++) h = d[e],
				j = /^\+/.test(h),
				j && (h = h.substr(1) || "*"),
				i = a[h] = a[h] || [],
				i[j ? "unshift": "push"](c)
			}
		}
	}
	function bB(a, b, c) {
		var d = b === "width" ? a.offsetWidth: a.offsetHeight,
				e = b === "width" ? 1 : 0,
						g = 4;
		if (d > 0) {
			if (c !== "border") for (; e < g; e += 2) c || (d -= parseFloat(f.css(a, "padding" + bx[e])) || 0),
			c === "margin" ? d += parseFloat(f.css(a, c + bx[e])) || 0 : d -= parseFloat(f.css(a, "border" + bx[e] + "Width")) || 0;
			return d + "px"
		}
		d = by(a, b);
		if (d < 0 || d == null) d = a.style[b];
		if (bt.test(d)) return d;
		d = parseFloat(d) || 0;
		if (c) for (; e < g; e += 2) d += parseFloat(f.css(a, "padding" + bx[e])) || 0,
		c !== "padding" && (d += parseFloat(f.css(a, "border" + bx[e] + "Width")) || 0),
		c === "margin" && (d += parseFloat(f.css(a, c + bx[e])) || 0);
		return d + "px"
	}
	function bo(a) {
		var b = c.createElement("div");
		bh.appendChild(b),
		b.innerHTML = a.outerHTML;
		return b.firstChild
	}
	function bn(a) {
		var b = (a.nodeName || "").toLowerCase();
		b === "input" ? bm(a) : b !== "script" && typeof a.getElementsByTagName != "undefined" && f.grep(a.getElementsByTagName("input"), bm)
	}
	function bm(a) {
		if (a.type === "checkbox" || a.type === "radio") a.defaultChecked = a.checked
	}
	function bl(a) {
		return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : []
	}
	function bk(a, b) {
		var c;
		b.nodeType === 1 && (b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase(), c === "object" ? b.outerHTML = a.outerHTML: c !== "input" || a.type !== "checkbox" && a.type !== "radio" ? c === "option" ? b.selected = a.defaultSelected: c === "input" || c === "textarea" ? b.defaultValue = a.defaultValue: c === "script" && b.text !== a.text && (b.text = a.text) : (a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value)), b.removeAttribute(f.expando), b.removeAttribute("_submit_attached"), b.removeAttribute("_change_attached"))
	}
	function bj(a, b) {
		if (b.nodeType === 1 && !!f.hasData(a)) {
			var c, d, e, g = f._data(a),
			h = f._data(b, g),
			i = g.events;
			if (i) {
				delete h.handle,
				h.events = {};
				for (c in i) for (d = 0, e = i[c].length; d < e; d++) f.event.add(b, c, i[c][d])
			}
			h.data && (h.data = f.extend({},
					h.data))
		}
	}
	function bi(a, b) {
		return f.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
	}
	function U(a) {
		var b = V.split("|"),
		c = a.createDocumentFragment();
		if (c.createElement) while (b.length) c.createElement(b.pop());
		return c
	}
	function T(a, b, c) {
		b = b || 0;
		if (f.isFunction(b)) return f.grep(a,
				function(a, d) {
			var e = !!b.call(a, d, a);
			return e === c
		});
		if (b.nodeType) return f.grep(a,
				function(a, d) {
			return a === b === c
		});
		if (typeof b == "string") {
			var d = f.grep(a,
					function(a) {
				return a.nodeType === 1
			});
			if (O.test(b)) return f.filter(b, d, !c);
			b = f.filter(b, d)
		}
		return f.grep(a,
				function(a, d) {
			return f.inArray(a, b) >= 0 === c
		})
	}
	function S(a) {
		return ! a || !a.parentNode || a.parentNode.nodeType === 11
	}
	function K() {
		return ! 0
	}
	function J() {
		return ! 1
	}
	function n(a, b, c) {
		var d = b + "defer",
		e = b + "queue",
		g = b + "mark",
		h = f._data(a, d);
		h && (c === "queue" || !f._data(a, e)) && (c === "mark" || !f._data(a, g)) && setTimeout(function() { ! f._data(a, e) && !f._data(a, g) && (f.removeData(a, d, !0), h.fire())
		},
		0)
	}
	function m(a) {
		for (var b in a) {
			if (b === "data" && f.isEmptyObject(a[b])) continue;
			if (b !== "toJSON") return ! 1
		}
		return ! 0
	}
	function l(a, c, d) {
		if (d === b && a.nodeType === 1) {
			var e = "data-" + c.replace(k, "-$1").toLowerCase();
			d = a.getAttribute(e);
			if (typeof d == "string") {
				try {
					d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null: f.isNumeric(d) ? +d: j.test(d) ? f.parseJSON(d) : d
				} catch(g) {}
				f.data(a, c, d)
			} else d = b
		}
		return d
	}
	function h(a) {
		var b = g[a] = {},
		c,
		d;
		a = a.split(/\s+/);
		for (c = 0, d = a.length; c < d; c++) b[a[c]] = !0;
		return b
	}
	var c = a.document,
	d = a.navigator,
	e = a.location,
	f = function() {
		function J() {
			if (!e.isReady) {
				try {
					c.documentElement.doScroll("left")
				} catch(a) {
					setTimeout(J, 1);
					return
				}
				e.ready()
			}
		}
		var e = function(a, b) {
			return new e.fn.init(a, b, h)
		},
		f = a.jQuery,
		g = a.$,
		h,
		i = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
		j = /\S/,
		k = /^\s+/,
		l = /\s+$/,
		m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
		n = /^[\],:{}\s]*$/,
		o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
		p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
		q = /(?:^|:|,)(?:\s*\[)+/g,
			r = /(webkit)[ \/]([\w.]+)/,
			s = /(opera)(?:.*version)?[ \/]([\w.]+)/,
			t = /(msie) ([\w.]+)/,
			u = /(mozilla)(?:.*? rv:([\w.]+))?/,
			v = /-([a-z]|[0-9])/ig,
			w = /^-ms-/,
			x = function(a, b) {
			return (b + "").toUpperCase()
		},
		y = d.userAgent,
		z,
		A,
		B,
		C = Object.prototype.toString,
		D = Object.prototype.hasOwnProperty,
		E = Array.prototype.push,
		F = Array.prototype.slice,
		G = String.prototype.trim,
		H = Array.prototype.indexOf,
		I = {};
		e.fn = e.prototype = {
				constructor: e,
				init: function(a, d, f) {
					var g, h, j, k;
					if (!a) return this;
					if (a.nodeType) {
						this.context = this[0] = a,
						this.length = 1;
						return this
					}
					if (a === "body" && !d && c.body) {
						this.context = c,
						this[0] = c.body,
						this.selector = a,
						this.length = 1;
						return this
					}
					if (typeof a == "string") {
						a.charAt(0) !== "<" || a.charAt(a.length - 1) !== ">" || a.length < 3 ? g = i.exec(a) : g = [null, a, null];
						if (g && (g[1] || !d)) {
							if (g[1]) {
								d = d instanceof e ? d[0] : d,
										k = d ? d.ownerDocument || d: c,
												j = m.exec(a),
												j ? e.isPlainObject(d) ? (a = [c.createElement(j[1])], e.fn.attr.call(a, d, !0)) : a = [k.createElement(j[1])] : (j = e.buildFragment([g[1]], [k]), a = (j.cacheable ? e.clone(j.fragment) : j.fragment).childNodes);
												return e.merge(this, a)
							}
							h = c.getElementById(g[2]);
							if (h && h.parentNode) {
								if (h.id !== g[2]) return f.find(a);
								this.length = 1,
								this[0] = h
							}
							this.context = c,
							this.selector = a;
							return this
						}
						return ! d || d.jquery ? (d || f).find(a) : this.constructor(d).find(a)
					}
					if (e.isFunction(a)) return f.ready(a);
					a.selector !== b && (this.selector = a.selector, this.context = a.context);
					return e.makeArray(a, this)
				},
				selector: "",
				jquery: "1.7.2",
				length: 0,
				size: function() {
					return this.length
				},
				toArray: function() {
					return F.call(this, 0)
				},
				get: function(a) {
					return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
				},
				pushStack: function(a, b, c) {
					var d = this.constructor();
					e.isArray(a) ? E.apply(d, a) : e.merge(d, a),
							d.prevObject = this,
							d.context = this.context,
							b === "find" ? d.selector = this.selector + (this.selector ? " ": "") + c: b && (d.selector = this.selector + "." + b + "(" + c + ")");
							return d
				},
				each: function(a, b) {
					return e.each(this, a, b)
				},
				ready: function(a) {
					e.bindReady(),
					A.add(a);
					return this
				},
				eq: function(a) {
					a = +a;
					return a === -1 ? this.slice(a) : this.slice(a, a + 1)
				},
				first: function() {
					return this.eq(0)
				},
				last: function() {
					return this.eq( - 1)
				},
				slice: function() {
					return this.pushStack(F.apply(this, arguments), "slice", F.call(arguments).join(","))
				},
				map: function(a) {
					return this.pushStack(e.map(this,
							function(b, c) {
						return a.call(b, c, b)
					}))
				},
				end: function() {
					return this.prevObject || this.constructor(null)
				},
				push: E,
				sort: [].sort,
				splice: [].splice
		},
		e.fn.init.prototype = e.fn,
		e.extend = e.fn.extend = function() {
			var a, c, d, f, g, h, i = arguments[0] || {},
			j = 1,
			k = arguments.length,
			l = !1;
			typeof i == "boolean" && (l = i, i = arguments[1] || {},
					j = 2),
					typeof i != "object" && !e.isFunction(i) && (i = {}),
					k === j && (i = this, --j);
			for (; j < k; j++) if ((a = arguments[j]) != null) for (c in a) {
				d = i[c],
				f = a[c];
				if (i === f) continue;
				l && f && (e.isPlainObject(f) || (g = e.isArray(f))) ? (g ? (g = !1, h = d && e.isArray(d) ? d: []) : h = d && e.isPlainObject(d) ? d: {},
						i[c] = e.extend(l, h, f)) : f !== b && (i[c] = f)
			}
			return i
		},
		e.extend({
			noConflict: function(b) {
				a.$ === e && (a.$ = g),
				b && a.jQuery === e && (a.jQuery = f);
				return e
			},
			isReady: !1,
			readyWait: 1,
			holdReady: function(a) {
				a ? e.readyWait++:e.ready(!0)
			},
			ready: function(a) {
				if (a === !0 && !--e.readyWait || a !== !0 && !e.isReady) {
					if (!c.body) return setTimeout(e.ready, 1);
					e.isReady = !0;
					if (a !== !0 && --e.readyWait > 0) return;
					A.fireWith(c, [e]),
					e.fn.trigger && e(c).trigger("ready").off("ready")
				}
			},
			bindReady: function() {
				if (!A) {
					A = e.Callbacks("once memory");
					if (c.readyState === "complete") return setTimeout(e.ready, 1);
					if (c.addEventListener) c.addEventListener("DOMContentLoaded", B, !1),
					a.addEventListener("load", e.ready, !1);
					else if (c.attachEvent) {
						c.attachEvent("onreadystatechange", B),
						a.attachEvent("onload", e.ready);
						var b = !1;
						try {
							b = a.frameElement == null
						} catch(d) {}
						c.documentElement.doScroll && b && J()
					}
				}
			},
			isFunction: function(a) {
				return e.type(a) === "function"
			},
			isArray: Array.isArray ||
			function(a) {
				return e.type(a) === "array"
			},
			isWindow: function(a) {
				return a != null && a == a.window
			},
			isNumeric: function(a) {
				return ! isNaN(parseFloat(a)) && isFinite(a)
			},
			type: function(a) {
				return a == null ? String(a) : I[C.call(a)] || "object"
			},
			isPlainObject: function(a) {
				if (!a || e.type(a) !== "object" || a.nodeType || e.isWindow(a)) return ! 1;
				try {
					if (a.constructor && !D.call(a, "constructor") && !D.call(a.constructor.prototype, "isPrototypeOf")) return ! 1
				} catch(c) {
					return ! 1
				}
				var d;
				for (d in a);
				return d === b || D.call(a, d)
			},
			isEmptyObject: function(a) {
				for (var b in a) return ! 1;
				return ! 0
			},
			error: function(a) {
				throw new Error(a)
			},
			parseJSON: function(b) {
				if (typeof b != "string" || !b) return null;
				b = e.trim(b);
				if (a.JSON && a.JSON.parse) return a.JSON.parse(b);
				if (n.test(b.replace(o, "@").replace(p, "]").replace(q, ""))) return (new Function("return " + b))();
				e.error("Invalid JSON: " + b)
			},
			parseXML: function(c) {
				if (typeof c != "string" || !c) return null;
				var d, f;
				try {
					a.DOMParser ? (f = new DOMParser, d = f.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
				} catch(g) {
					d = b
				} (!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && e.error("Invalid XML: " + c);
				return d
			},
			noop: function() {},
			globalEval: function(b) {
				b && j.test(b) && (a.execScript ||
						function(b) {
					a.eval.call(a, b)
				})(b)
			},
			camelCase: function(a) {
				return a.replace(w, "ms-").replace(v, x)
			},
			nodeName: function(a, b) {
				return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
			},
			each: function(a, c, d) {
				var f, g = 0,
				h = a.length,
				i = h === b || e.isFunction(a);
				if (d) {
					if (i) {
						for (f in a) if (c.apply(a[f], d) === !1) break
					} else for (; g < h;) if (c.apply(a[g++], d) === !1) break
				} else if (i) {
					for (f in a) if (c.call(a[f], f, a[f]) === !1) break
				} else for (; g < h;) if (c.call(a[g], g, a[g++]) === !1) break;
				return a
			},
			trim: G ?
					function(a) {
				return a == null ? "": G.call(a)
			}: function(a) {
				return a == null ? "": (a + "").replace(k, "").replace(l, "")
			},
			makeArray: function(a, b) {
				var c = b || [];
				if (a != null) {
					var d = e.type(a);
					a.length == null || d === "string" || d === "function" || d === "regexp" || e.isWindow(a) ? E.call(c, a) : e.merge(c, a)
				}
				return c
			},
			inArray: function(a, b, c) {
				var d;
				if (b) {
					if (H) return H.call(b, a, c);
					d = b.length,
					c = c ? c < 0 ? Math.max(0, d + c) : c: 0;
					for (; c < d; c++) if (c in b && b[c] === a) return c
				}
				return - 1
			},
			merge: function(a, c) {
				var d = a.length,
				e = 0;
				if (typeof c.length == "number") for (var f = c.length; e < f; e++) a[d++] = c[e];
				else while (c[e] !== b) a[d++] = c[e++];
				a.length = d;
				return a
			},
			grep: function(a, b, c) {
				var d = [],
				e;
				c = !!c;
				for (var f = 0,
						g = a.length; f < g; f++) e = !!b(a[f], f),
						c !== e && d.push(a[f]);
				return d
			},
			map: function(a, c, d) {
				var f, g, h = [],
				i = 0,
				j = a.length,
				k = a instanceof e || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || e.isArray(a));
				if (k) for (; i < j; i++) f = c(a[i], i, d),
				f != null && (h[h.length] = f);
				else for (g in a) f = c(a[g], g, d),
				f != null && (h[h.length] = f);
				return h.concat.apply([], h)
			},
			guid: 1,
			proxy: function(a, c) {
				if (typeof c == "string") {
					var d = a[c];
					c = a,
					a = d
				}
				if (!e.isFunction(a)) return b;
				var f = F.call(arguments, 2),
				g = function() {
					return a.apply(c, f.concat(F.call(arguments)))
				};
				g.guid = a.guid = a.guid || g.guid || e.guid++;
				return g
			},
			access: function(a, c, d, f, g, h, i) {
				var j, k = d == null,
				l = 0,
				m = a.length;
				if (d && typeof d == "object") {
					for (l in d) e.access(a, c, l, d[l], 1, h, f);
					g = 1
				} else if (f !== b) {
					j = i === b && e.isFunction(f),
					k && (j ? (j = c, c = function(a, b, c) {
						return j.call(e(a), c)
					}) : (c.call(a, f), c = null));
					if (c) for (; l < m; l++) c(a[l], d, j ? f.call(a[l], l, c(a[l], d)) : f, i);
					g = 1
				}
				return g ? a: k ? c.call(a) : m ? c(a[0], d) : h
			},
			now: function() {
				return (new Date).getTime()
			},
			uaMatch: function(a) {
				a = a.toLowerCase();
				var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || [];
				return {
					browser: b[1] || "",
					version: b[2] || "0"
				}
			},
			sub: function() {
				function a(b, c) {
					return new a.fn.init(b, c)
				}
				e.extend(!0, a, this),
				a.superclass = this,
				a.fn = a.prototype = this(),
				a.fn.constructor = a,
				a.sub = this.sub,
				a.fn.init = function(d, f) {
					f && f instanceof e && !(f instanceof a) && (f = a(f));
					return e.fn.init.call(this, d, f, b)
				},
				a.fn.init.prototype = a.fn;
				var b = a(c);
				return a
			},
			browser: {}
		}),
		e.each("Boolean Number String Function Array Date RegExp Object".split(" "),
				function(a, b) {
			I["[object " + b + "]"] = b.toLowerCase()
		}),
		z = e.uaMatch(y),
		z.browser && (e.browser[z.browser] = !0, e.browser.version = z.version),
		e.browser.webkit && (e.browser.safari = !0),
		j.test(" ") && (k = /^[\s\xA0]+/, l = /[\s\xA0]+$/),
		h = e(c),
		c.addEventListener ? B = function() {
			c.removeEventListener("DOMContentLoaded", B, !1),
			e.ready()
		}: c.attachEvent && (B = function() {
			c.readyState === "complete" && (c.detachEvent("onreadystatechange", B), e.ready())
		});
			return e
	} (),
	g = {};
	f.Callbacks = function(a) {
		a = a ? g[a] || h(a) : {};
		var c = [],
		d = [],
		e,
		i,
		j,
		k,
		l,
		m,
		n = function(b) {
			var d, e, g, h, i;
			for (d = 0, e = b.length; d < e; d++) g = b[d],
			h = f.type(g),
			h === "array" ? n(g) : h === "function" && (!a.unique || !p.has(g)) && c.push(g)
		},
		o = function(b, f) {
			f = f || [],
			e = !a.memory || [b, f],
			i = !0,
			j = !0,
			m = k || 0,
			k = 0,
			l = c.length;
			for (; c && m < l; m++) if (c[m].apply(b, f) === !1 && a.stopOnFalse) {
				e = !0;
				break
			}
			j = !1,
			c && (a.once ? e === !0 ? p.disable() : c = [] : d && d.length && (e = d.shift(), p.fireWith(e[0], e[1])))
		},
		p = {
				add: function() {
					if (c) {
						var a = c.length;
						n(arguments),
						j ? l = c.length: e && e !== !0 && (k = a, o(e[0], e[1]))
					}
					return this
				},
				remove: function() {
					if (c) {
						var b = arguments,
						d = 0,
						e = b.length;
						for (; d < e; d++) for (var f = 0; f < c.length; f++) if (b[d] === c[f]) {
							j && f <= l && (l--, f <= m && m--),
							c.splice(f--, 1);
							if (a.unique) break
						}
					}
					return this
				},
				has: function(a) {
					if (c) {
						var b = 0,
						d = c.length;
						for (; b < d; b++) if (a === c[b]) return ! 0
					}
					return ! 1
				},
				empty: function() {
					c = [];
					return this
				},
				disable: function() {
					c = d = e = b;
					return this
				},
				disabled: function() {
					return ! c
				},
				lock: function() {
					d = b,
					(!e || e === !0) && p.disable();
					return this
				},
				locked: function() {
					return ! d
				},
				fireWith: function(b, c) {
					d && (j ? a.once || d.push([b, c]) : (!a.once || !e) && o(b, c));
					return this
				},
				fire: function() {
					p.fireWith(this, arguments);
					return this
				},
				fired: function() {
					return !! i
				}
		};
		return p
	};
	var i = [].slice;
	f.extend({
		Deferred: function(a) {
			var b = f.Callbacks("once memory"),
			c = f.Callbacks("once memory"),
			d = f.Callbacks("memory"),
			e = "pending",
			g = {
				resolve: b,
				reject: c,
				notify: d
			},
			h = {
				done: b.add,
				fail: c.add,
				progress: d.add,
				state: function() {
					return e
				},
				isResolved: b.fired,
				isRejected: c.fired,
				then: function(a, b, c) {
					i.done(a).fail(b).progress(c);
					return this
				},
				always: function() {
					i.done.apply(i, arguments).fail.apply(i, arguments);
					return this
				},
				pipe: function(a, b, c) {
					return f.Deferred(function(d) {
						f.each({
							done: [a, "resolve"],
							fail: [b, "reject"],
							progress: [c, "notify"]
						},
						function(a, b) {
							var c = b[0],
							e = b[1],
							g;
							f.isFunction(c) ? i[a](function() {
								g = c.apply(this, arguments),
								g && f.isFunction(g.promise) ? g.promise().then(d.resolve, d.reject, d.notify) : d[e + "With"](this === i ? d: this, [g])
							}) : i[a](d[e])
						})
					}).promise()
				},
				promise: function(a) {
					if (a == null) a = h;
					else for (var b in h) a[b] = h[b];
					return a
				}
			},
			i = h.promise({}),
			j;
			for (j in g) i[j] = g[j].fire,
			i[j + "With"] = g[j].fireWith;
			i.done(function() {
				e = "resolved"
			},
			c.disable, d.lock).fail(function() {
				e = "rejected"
			},
			b.disable, d.lock),
			a && a.call(i, i);
			return i
		},
		when: function(a) {
			function m(a) {
				return function(b) {
					e[a] = arguments.length > 1 ? i.call(arguments, 0) : b,
							j.notifyWith(k, e)
				}
			}
			function l(a) {
				return function(c) {
					b[a] = arguments.length > 1 ? i.call(arguments, 0) : c,
							--g || j.resolveWith(j, b)
				}
			}
			var b = i.call(arguments, 0),
			c = 0,
			d = b.length,
			e = Array(d),
			g = d,
			h = d,
			j = d <= 1 && a && f.isFunction(a.promise) ? a: f.Deferred(),
					k = j.promise();
			if (d > 1) {
				for (; c < d; c++) b[c] && b[c].promise && f.isFunction(b[c].promise) ? b[c].promise().then(l(c), j.reject, m(c)) : --g;
				g || j.resolveWith(j, b)
			} else j !== a && j.resolveWith(j, d ? [a] : []);
			return k
		}
	}),
	f.support = function() {
		var b, d, e, g, h, i, j, k, l, m, n, o, p = c.createElement("div"),
		q = c.documentElement;
		p.setAttribute("className", "t"),
		p.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",
		d = p.getElementsByTagName("*"),
		e = p.getElementsByTagName("a")[0];
		if (!d || !d.length || !e) return {};
		g = c.createElement("select"),
		h = g.appendChild(c.createElement("option")),
		i = p.getElementsByTagName("input")[0],
		b = {
			leadingWhitespace: p.firstChild.nodeType === 3,
			tbody: !p.getElementsByTagName("tbody").length,
			htmlSerialize: !!p.getElementsByTagName("link").length,
			style: /top/.test(e.getAttribute("style")),
			hrefNormalized: e.getAttribute("href") === "/a",
			opacity: /^0.55/.test(e.style.opacity),
			cssFloat: !!e.style.cssFloat,
			checkOn: i.value === "on",
			optSelected: h.selected,
			getSetAttribute: p.className !== "t",
			enctype: !!c.createElement("form").enctype,
			html5Clone: c.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
			submitBubbles: !0,
			changeBubbles: !0,
			focusinBubbles: !1,
			deleteExpando: !0,
			noCloneEvent: !0,
			inlineBlockNeedsLayout: !1,
			shrinkWrapBlocks: !1,
			reliableMarginRight: !0,
			pixelMargin: !0
		},
		f.boxModel = b.boxModel = c.compatMode === "CSS1Compat",
		i.checked = !0,
		b.noCloneChecked = i.cloneNode(!0).checked,
		g.disabled = !0,
		b.optDisabled = !h.disabled;
		try {
			delete p.test
		} catch(r) {
			b.deleteExpando = !1
		} ! p.addEventListener && p.attachEvent && p.fireEvent && (p.attachEvent("onclick",
				function() {
			b.noCloneEvent = !1
		}), p.cloneNode(!0).fireEvent("onclick")),
		i = c.createElement("input"),
		i.value = "t",
		i.setAttribute("type", "radio"),
		b.radioValue = i.value === "t",
		i.setAttribute("checked", "checked"),
		i.setAttribute("name", "t"),
		p.appendChild(i),
		j = c.createDocumentFragment(),
		j.appendChild(p.lastChild),
		b.checkClone = j.cloneNode(!0).cloneNode(!0).lastChild.checked,
		b.appendChecked = i.checked,
		j.removeChild(i),
		j.appendChild(p);
		if (p.attachEvent) for (n in {
			submit: 1,
			change: 1,
			focusin: 1
		}) m = "on" + n,
		o = m in p,
		o || (p.setAttribute(m, "return;"), o = typeof p[m] == "function"),
		b[n + "Bubbles"] = o;
		j.removeChild(p),
		j = g = h = p = i = null,
		f(function() {
			var d, e, g, h, i, j, l, m, n, q, r, s, t, u = c.getElementsByTagName("body")[0]; ! u || (m = 1, t = "padding:0;margin:0;border:", r = "position:absolute;top:0;left:0;width:1px;height:1px;", s = t + "0;visibility:hidden;", n = "style='" + r + t + "5px solid #000;", q = "<div " + n + "display:block;'><div style='" + t + "0;display:block;overflow:hidden;'></div></div>" + "<table " + n + "' cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>", d = c.createElement("div"), d.style.cssText = s + "width:0;height:0;position:static;top:0;margin-top:" + m + "px", u.insertBefore(d, u.firstChild), p = c.createElement("div"), d.appendChild(p), p.innerHTML = "<table><tr><td style='" + t + "0;display:none'></td><td>t</td></tr></table>", k = p.getElementsByTagName("td"), o = k[0].offsetHeight === 0, k[0].style.display = "", k[1].style.display = "none", b.reliableHiddenOffsets = o && k[0].offsetHeight === 0, a.getComputedStyle && (p.innerHTML = "", l = c.createElement("div"), l.style.width = "0", l.style.marginRight = "0", p.style.width = "2px", p.appendChild(l), b.reliableMarginRight = (parseInt((a.getComputedStyle(l, null) || {
				marginRight: 0
			}).marginRight, 10) || 0) === 0), typeof p.style.zoom != "undefined" && (p.innerHTML = "", p.style.width = p.style.padding = "1px", p.style.border = 0, p.style.overflow = "hidden", p.style.display = "inline", p.style.zoom = 1, b.inlineBlockNeedsLayout = p.offsetWidth === 3, p.style.display = "block", p.style.overflow = "visible", p.innerHTML = "<div style='width:5px;'></div>", b.shrinkWrapBlocks = p.offsetWidth !== 3), p.style.cssText = r + s, p.innerHTML = q, e = p.firstChild, g = e.firstChild, i = e.nextSibling.firstChild.firstChild, j = {
				doesNotAddBorder: g.offsetTop !== 5,
				doesAddBorderForTableAndCells: i.offsetTop === 5
			},
			g.style.position = "fixed", g.style.top = "20px", j.fixedPosition = g.offsetTop === 20 || g.offsetTop === 15, g.style.position = g.style.top = "", e.style.overflow = "hidden", e.style.position = "relative", j.subtractsBorderForOverflowNotVisible = g.offsetTop === -5, j.doesNotIncludeMarginInBodyOffset = u.offsetTop !== m, a.getComputedStyle && (p.style.marginTop = "1%", b.pixelMargin = (a.getComputedStyle(p, null) || {
				marginTop: 0
			}).marginTop !== "1%"), typeof d.style.zoom != "undefined" && (d.style.zoom = 1), u.removeChild(d), l = p = d = null, f.extend(b, j))
		});
		return b
	} ();
	var j = /^(?:\{.*\}|\[.*\])$/,
	k = /([A-Z])/g;
	f.extend({
		cache: {},
		uuid: 0,
		expando: "jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g, ""),
		noData: {
			embed: !0,
			object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
			applet: !0
		},
		hasData: function(a) {
			a = a.nodeType ? f.cache[a[f.expando]] : a[f.expando];
			return !! a && !m(a)
		},
		data: function(a, c, d, e) {
			if ( !! f.acceptData(a)) {
				var g, h, i, j = f.expando,
				k = typeof c == "string",
				l = a.nodeType,
				m = l ? f.cache: a,
						n = l ? a[j] : a[j] && j,
								o = c === "events";
						if ((!n || !m[n] || !o && !e && !m[n].data) && k && d === b) return;
						n || (l ? a[j] = n = ++f.uuid: n = j),
						m[n] || (m[n] = {},
								l || (m[n].toJSON = f.noop));
						if (typeof c == "object" || typeof c == "function") e ? m[n] = f.extend(m[n], c) : m[n].data = f.extend(m[n].data, c);
						g = h = m[n],
						e || (h.data || (h.data = {}), h = h.data),
						d !== b && (h[f.camelCase(c)] = d);
						if (o && !h[c]) return g.events;
						k ? (i = h[c], i == null && (i = h[f.camelCase(c)])) : i = h;
						return i
			}
		},
		removeData: function(a, b, c) {
			if ( !! f.acceptData(a)) {
				var d, e, g, h = f.expando,
				i = a.nodeType,
				j = i ? f.cache: a,
						k = i ? a[h] : h;
						if (!j[k]) return;
						if (b) {
							d = c ? j[k] : j[k].data;
							if (d) {
								f.isArray(b) || (b in d ? b = [b] : (b = f.camelCase(b), b in d ? b = [b] : b = b.split(" ")));
								for (e = 0, g = b.length; e < g; e++) delete d[b[e]];
								if (! (c ? m: f.isEmptyObject)(d)) return
							}
						}
						if (!c) {
							delete j[k].data;
							if (!m(j[k])) return
						}
						f.support.deleteExpando || !j.setInterval ? delete j[k] : j[k] = null,
								i && (f.support.deleteExpando ? delete a[h] : a.removeAttribute ? a.removeAttribute(h) : a[h] = null)
			}
		},
		_data: function(a, b, c) {
			return f.data(a, b, c, !0)
		},
		acceptData: function(a) {
			if (a.nodeName) {
				var b = f.noData[a.nodeName.toLowerCase()];
				if (b) return b !== !0 && a.getAttribute("classid") === b
			}
			return ! 0
		}
	}),
	f.fn.extend({
		data: function(a, c) {
			var d, e, g, h, i, j = this[0],
			k = 0,
			m = null;
			if (a === b) {
				if (this.length) {
					m = f.data(j);
					if (j.nodeType === 1 && !f._data(j, "parsedAttrs")) {
						g = j.attributes;
						for (i = g.length; k < i; k++) h = g[k].name,
						h.indexOf("data-") === 0 && (h = f.camelCase(h.substring(5)), l(j, h, m[h]));
						f._data(j, "parsedAttrs", !0)
					}
				}
				return m
			}
			if (typeof a == "object") return this.each(function() {
				f.data(this, a)
			});
			d = a.split(".", 2),
			d[1] = d[1] ? "." + d[1] : "",
					e = d[1] + "!";
			return f.access(this,
					function(c) {
				if (c === b) {
					m = this.triggerHandler("getData" + e, [d[0]]),
					m === b && j && (m = f.data(j, a), m = l(j, a, m));
					return m === b && d[1] ? this.data(d[0]) : m
				}
				d[1] = c,
				this.each(function() {
					var b = f(this);
					b.triggerHandler("setData" + e, d),
					f.data(this, a, c),
					b.triggerHandler("changeData" + e, d)
				})
			},
			null, c, arguments.length > 1, null, !1)
		},
		removeData: function(a) {
			return this.each(function() {
				f.removeData(this, a)
			})
		}
	}),
	f.extend({
		_mark: function(a, b) {
			a && (b = (b || "fx") + "mark", f._data(a, b, (f._data(a, b) || 0) + 1))
		},
		_unmark: function(a, b, c) {
			a !== !0 && (c = b, b = a, a = !1);
			if (b) {
				c = c || "fx";
				var d = c + "mark",
				e = a ? 0 : (f._data(b, d) || 1) - 1;
				e ? f._data(b, d, e) : (f.removeData(b, d, !0), n(b, c, "mark"))
			}
		},
		queue: function(a, b, c) {
			var d;
			if (a) {
				b = (b || "fx") + "queue",
				d = f._data(a, b),
				c && (!d || f.isArray(c) ? d = f._data(a, b, f.makeArray(c)) : d.push(c));
				return d || []
			}
		},
		dequeue: function(a, b) {
			b = b || "fx";
			var c = f.queue(a, b),
			d = c.shift(),
			e = {};
			d === "inprogress" && (d = c.shift()),
			d && (b === "fx" && c.unshift("inprogress"), f._data(a, b + ".run", e), d.call(a,
					function() {
				f.dequeue(a, b)
			},
			e)),
			c.length || (f.removeData(a, b + "queue " + b + ".run", !0), n(a, b, "queue"))
		}
	}),
	f.fn.extend({
		queue: function(a, c) {
			var d = 2;
			typeof a != "string" && (c = a, a = "fx", d--);
			if (arguments.length < d) return f.queue(this[0], a);
			return c === b ? this: this.each(function() {
				var b = f.queue(this, a, c);
				a === "fx" && b[0] !== "inprogress" && f.dequeue(this, a)
			})
		},
		dequeue: function(a) {
			return this.each(function() {
				f.dequeue(this, a)
			})
		},
		delay: function(a, b) {
			a = f.fx ? f.fx.speeds[a] || a: a,
					b = b || "fx";
			return this.queue(b,
					function(b, c) {
				var d = setTimeout(b, a);
				c.stop = function() {
					clearTimeout(d)
				}
			})
		},
		clearQueue: function(a) {
			return this.queue(a || "fx", [])
		},
		promise: function(a, c) {
			function m() {--h || d.resolveWith(e, [e])
			}
			typeof a != "string" && (c = a, a = b),
			a = a || "fx";
			var d = f.Deferred(),
			e = this,
			g = e.length,
			h = 1,
			i = a + "defer",
			j = a + "queue",
			k = a + "mark",
			l;
			while (g--) if (l = f.data(e[g], i, b, !0) || (f.data(e[g], j, b, !0) || f.data(e[g], k, b, !0)) && f.data(e[g], i, f.Callbacks("once memory"), !0)) h++,
			l.add(m);
			m();
			return d.promise(c)
		}
	});
	var o = /[\n\t\r]/g,
	p = /\s+/,
	q = /\r/g,
	r = /^(?:button|input)$/i,
	s = /^(?:button|input|object|select|textarea)$/i,
	t = /^a(?:rea)?$/i,
	u = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
	v = f.support.getSetAttribute,
	w, x, y;
	f.fn.extend({
		attr: function(a, b) {
			return f.access(this, f.attr, a, b, arguments.length > 1)
		},
		removeAttr: function(a) {
			return this.each(function() {
				f.removeAttr(this, a)
			})
		},
		prop: function(a, b) {
			return f.access(this, f.prop, a, b, arguments.length > 1)
		},
		removeProp: function(a) {
			a = f.propFix[a] || a;
			return this.each(function() {
				try {
					this[a] = b,
					delete this[a]
				} catch(c) {}
			})
		},
		addClass: function(a) {
			var b, c, d, e, g, h, i;
			if (f.isFunction(a)) return this.each(function(b) {
				f(this).addClass(a.call(this, b, this.className))
			});
			if (a && typeof a == "string") {
				b = a.split(p);
				for (c = 0, d = this.length; c < d; c++) {
					e = this[c];
					if (e.nodeType === 1) if (!e.className && b.length === 1) e.className = a;
					else {
						g = " " + e.className + " ";
						for (h = 0, i = b.length; h < i; h++)~g.indexOf(" " + b[h] + " ") || (g += b[h] + " ");
						e.className = f.trim(g)
					}
				}
			}
			return this
		},
		removeClass: function(a) {
			var c, d, e, g, h, i, j;
			if (f.isFunction(a)) return this.each(function(b) {
				f(this).removeClass(a.call(this, b, this.className))
			});
			if (a && typeof a == "string" || a === b) {
				c = (a || "").split(p);
				for (d = 0, e = this.length; d < e; d++) {
					g = this[d];
					if (g.nodeType === 1 && g.className) if (a) {
						h = (" " + g.className + " ").replace(o, " ");
						for (i = 0, j = c.length; i < j; i++) h = h.replace(" " + c[i] + " ", " ");
						g.className = f.trim(h)
					} else g.className = ""
				}
			}
			return this
		},
		toggleClass: function(a, b) {
			var c = typeof a,
			d = typeof b == "boolean";
			if (f.isFunction(a)) return this.each(function(c) {
				f(this).toggleClass(a.call(this, c, this.className, b), b)
			});
			return this.each(function() {
				if (c === "string") {
					var e, g = 0,
					h = f(this),
					i = b,
					j = a.split(p);
					while (e = j[g++]) i = d ? i: !h.hasClass(e),
							h[i ? "addClass": "removeClass"](e)
				} else if (c === "undefined" || c === "boolean") this.className && f._data(this, "__className__", this.className),
				this.className = this.className || a === !1 ? "": f._data(this, "__className__") || ""
			})
		},
		hasClass: function(a) {
			var b = " " + a + " ",
			c = 0,
			d = this.length;
			for (; c < d; c++) if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(o, " ").indexOf(b) > -1) return ! 0;
			return ! 1
		},
		val: function(a) {
			var c, d, e, g = this[0]; {
				if ( !! arguments.length) {
					e = f.isFunction(a);
					return this.each(function(d) {
						var g = f(this),
						h;
						if (this.nodeType === 1) {
							e ? h = a.call(this, d, g.val()) : h = a,
									h == null ? h = "": typeof h == "number" ? h += "": f.isArray(h) && (h = f.map(h,
											function(a) {
										return a == null ? "": a + ""
									})),
									c = f.valHooks[this.type] || f.valHooks[this.nodeName.toLowerCase()];
							if (!c || !("set" in c) || c.set(this, h, "value") === b) this.value = h
						}
					})
				}
				if (g) {
					c = f.valHooks[g.type] || f.valHooks[g.nodeName.toLowerCase()];
					if (c && "get" in c && (d = c.get(g, "value")) !== b) return d;
					d = g.value;
					return typeof d == "string" ? d.replace(q, "") : d == null ? "": d
				}
			}
		}
	}),
	f.extend({
		valHooks: {
			option: {
				get: function(a) {
					var b = a.attributes.value;
					return ! b || b.specified ? a.value: a.text
				}
			},
			select: {
				get: function(a) {
					var b, c, d, e, g = a.selectedIndex,
					h = [],
					i = a.options,
					j = a.type === "select-one";
					if (g < 0) return null;
					c = j ? g: 0,
							d = j ? g + 1 : i.length;
					for (; c < d; c++) {
						e = i[c];
						if (e.selected && (f.support.optDisabled ? !e.disabled: e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !f.nodeName(e.parentNode, "optgroup"))) {
							b = f(e).val();
							if (j) return b;
							h.push(b)
						}
					}
					if (j && !h.length && i.length) return f(i[g]).val();
					return h
				},
				set: function(a, b) {
					var c = f.makeArray(b);
					f(a).find("option").each(function() {
						this.selected = f.inArray(f(this).val(), c) >= 0
					}),
					c.length || (a.selectedIndex = -1);
					return c
				}
			}
		},
		attrFn: {
			val: !0,
			css: !0,
			html: !0,
			text: !0,
			data: !0,
			width: !0,
			height: !0,
			offset: !0
		},
		attr: function(a, c, d, e) {
			var g, h, i, j = a.nodeType;
			if ( !! a && j !== 3 && j !== 8 && j !== 2) {
				if (e && c in f.attrFn) return f(a)[c](d);
				if (typeof a.getAttribute == "undefined") return f.prop(a, c, d);
				i = j !== 1 || !f.isXMLDoc(a),
				i && (c = c.toLowerCase(), h = f.attrHooks[c] || (u.test(c) ? x: w));
				if (d !== b) {
					if (d === null) {
						f.removeAttr(a, c);
						return
					}
					if (h && "set" in h && i && (g = h.set(a, d, c)) !== b) return g;
					a.setAttribute(c, "" + d);
					return d
				}
				if (h && "get" in h && i && (g = h.get(a, c)) !== null) return g;
				g = a.getAttribute(c);
				return g === null ? b: g
			}
		},
		removeAttr: function(a, b) {
			var c, d, e, g, h, i = 0;
			if (b && a.nodeType === 1) {
				d = b.toLowerCase().split(p),
				g = d.length;
				for (; i < g; i++) e = d[i],
				e && (c = f.propFix[e] || e, h = u.test(e), h || f.attr(a, e, ""), a.removeAttribute(v ? e: c), h && c in a && (a[c] = !1))
			}
		},
		attrHooks: {
			type: {
				set: function(a, b) {
					if (r.test(a.nodeName) && a.parentNode) f.error("type property can't be changed");
					else if (!f.support.radioValue && b === "radio" && f.nodeName(a, "input")) {
						var c = a.value;
						a.setAttribute("type", b),
						c && (a.value = c);
						return b
					}
				}
			},
			value: {
				get: function(a, b) {
					if (w && f.nodeName(a, "button")) return w.get(a, b);
					return b in a ? a.value: null
				},
				set: function(a, b, c) {
					if (w && f.nodeName(a, "button")) return w.set(a, b, c);
					a.value = b
				}
			}
		},
		propFix: {
			tabindex: "tabIndex",
			readonly: "readOnly",
			"for": "htmlFor",
			"class": "className",
			maxlength: "maxLength",
			cellspacing: "cellSpacing",
			cellpadding: "cellPadding",
			rowspan: "rowSpan",
			colspan: "colSpan",
			usemap: "useMap",
			frameborder: "frameBorder",
			contenteditable: "contentEditable"
		},
		prop: function(a, c, d) {
			var e, g, h, i = a.nodeType;
			if ( !! a && i !== 3 && i !== 8 && i !== 2) {
				h = i !== 1 || !f.isXMLDoc(a),
				h && (c = f.propFix[c] || c, g = f.propHooks[c]);
				return d !== b ? g && "set" in g && (e = g.set(a, d, c)) !== b ? e: a[c] = d: g && "get" in g && (e = g.get(a, c)) !== null ? e: a[c]
			}
		},
		propHooks: {
			tabIndex: {
				get: function(a) {
					var c = a.getAttributeNode("tabindex");
					return c && c.specified ? parseInt(c.value, 10) : s.test(a.nodeName) || t.test(a.nodeName) && a.href ? 0 : b
				}
			}
		}
	}),
	f.attrHooks.tabindex = f.propHooks.tabIndex,
	x = {
		get: function(a, c) {
			var d, e = f.prop(a, c);
			return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
		},
		set: function(a, b, c) {
			var d;
			b === !1 ? f.removeAttr(a, c) : (d = f.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase()));
			return c
		}
	},
	v || (y = {
			name: !0,
			id: !0,
			coords: !0
	},
	w = f.valHooks.button = {
			get: function(a, c) {
				var d;
				d = a.getAttributeNode(c);
				return d && (y[c] ? d.nodeValue !== "": d.specified) ? d.nodeValue: b
			},
			set: function(a, b, d) {
				var e = a.getAttributeNode(d);
				e || (e = c.createAttribute(d), a.setAttributeNode(e));
				return e.nodeValue = b + ""
			}
	},
	f.attrHooks.tabindex.set = w.set, f.each(["width", "height"],
			function(a, b) {
		f.attrHooks[b] = f.extend(f.attrHooks[b], {
			set: function(a, c) {
				if (c === "") {
					a.setAttribute(b, "auto");
					return c
				}
			}
		})
	}), f.attrHooks.contenteditable = {
		get: w.get,
		set: function(a, b, c) {
			b === "" && (b = "false"),
			w.set(a, b, c)
		}
	}),
	f.support.hrefNormalized || f.each(["href", "src", "width", "height"],
			function(a, c) {
		f.attrHooks[c] = f.extend(f.attrHooks[c], {
			get: function(a) {
				var d = a.getAttribute(c, 2);
				return d === null ? b: d
			}
		})
	}),
	f.support.style || (f.attrHooks.style = {
			get: function(a) {
				return a.style.cssText.toLowerCase() || b
			},
			set: function(a, b) {
				return a.style.cssText = "" + b
			}
	}),
	f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, {
		get: function(a) {
			var b = a.parentNode;
			b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex);
			return null
		}
	})),
	f.support.enctype || (f.propFix.enctype = "encoding"),
	f.support.checkOn || f.each(["radio", "checkbox"],
			function() {
		f.valHooks[this] = {
				get: function(a) {
					return a.getAttribute("value") === null ? "on": a.value
				}
		}
	}),
	f.each(["radio", "checkbox"],
			function() {
		f.valHooks[this] = f.extend(f.valHooks[this], {
			set: function(a, b) {
				if (f.isArray(b)) return a.checked = f.inArray(f(a).val(), b) >= 0
			}
		})
	});
	var z = /^(?:textarea|input|select)$/i,
	A = /^([^\.]*)?(?:\.(.+))?$/,
	B = /(?:^|\s)hover(\.\S+)?\b/,
	C = /^key/,
	D = /^(?:mouse|contextmenu)|click/,
	E = /^(?:focusinfocus|focusoutblur)$/,
	F = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
	G = function(a) {
		var b = F.exec(a);
		b && (b[1] = (b[1] || "").toLowerCase(), b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)"));
		return b
	},
	H = function(a, b) {
		var c = a.attributes || {};
		return (!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] || (c.id || {}).value === b[2]) && (!b[3] || b[3].test((c["class"] || {}).value))
	},
	I = function(a) {
		return f.event.special.hover ? a: a.replace(B, "mouseenter$1 mouseleave$1")
	};
	f.event = {
			add: function(a, c, d, e, g) {
				var h, i, j, k, l, m, n, o, p, q, r, s;
				if (! (a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(h = f._data(a)))) {
					d.handler && (p = d, d = p.handler, g = p.selector),
					d.guid || (d.guid = f.guid++),
					j = h.events,
					j || (h.events = j = {}),
					i = h.handle,
					i || (h.handle = i = function(a) {
						return typeof f != "undefined" && (!a || f.event.triggered !== a.type) ? f.event.dispatch.apply(i.elem, arguments) : b
					},
					i.elem = a),
					c = f.trim(I(c)).split(" ");
					for (k = 0; k < c.length; k++) {
						l = A.exec(c[k]) || [],
						m = l[1],
						n = (l[2] || "").split(".").sort(),
						s = f.event.special[m] || {},
						m = (g ? s.delegateType: s.bindType) || m,
						s = f.event.special[m] || {},
						o = f.extend({
							type: m,
							origType: l[1],
							data: e,
							handler: d,
							guid: d.guid,
							selector: g,
							quick: g && G(g),
							namespace: n.join(".")
						},
						p),
						r = j[m];
						if (!r) {
							r = j[m] = [],
							r.delegateCount = 0;
							if (!s.setup || s.setup.call(a, e, n, i) === !1) a.addEventListener ? a.addEventListener(m, i, !1) : a.attachEvent && a.attachEvent("on" + m, i)
						}
						s.add && (s.add.call(a, o), o.handler.guid || (o.handler.guid = d.guid)),
						g ? r.splice(r.delegateCount++, 0, o) : r.push(o),
								f.event.global[m] = !0
					}
					a = null
				}
			},
			global: {},
			remove: function(a, b, c, d, e) {
				var g = f.hasData(a) && f._data(a),
				h,
				i,
				j,
				k,
				l,
				m,
				n,
				o,
				p,
				q,
				r,
				s;
				if ( !! g && !!(o = g.events)) {
					b = f.trim(I(b || "")).split(" ");
					for (h = 0; h < b.length; h++) {
						i = A.exec(b[h]) || [],
						j = k = i[1],
						l = i[2];
						if (!j) {
							for (j in o) f.event.remove(a, j + b[h], c, d, !0);
							continue
						}
						p = f.event.special[j] || {},
						j = (d ? p.delegateType: p.bindType) || j,
						r = o[j] || [],
						m = r.length,
						l = l ? new RegExp("(^|\\.)" + l.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
						for (n = 0; n < r.length; n++) s = r[n],
						(e || k === s.origType) && (!c || c.guid === s.guid) && (!l || l.test(s.namespace)) && (!d || d === s.selector || d === "**" && s.selector) && (r.splice(n--, 1), s.selector && r.delegateCount--, p.remove && p.remove.call(a, s));
						r.length === 0 && m !== r.length && ((!p.teardown || p.teardown.call(a, l) === !1) && f.removeEvent(a, j, g.handle), delete o[j])
					}
					f.isEmptyObject(o) && (q = g.handle, q && (q.elem = null), f.removeData(a, ["events", "handle"], !0))
				}
			},
			customEvent: {
				getData: !0,
				setData: !0,
				changeData: !0
			},
			trigger: function(c, d, e, g) {
				if (!e || e.nodeType !== 3 && e.nodeType !== 8) {
					var h = c.type || c,
					i = [],
					j,
					k,
					l,
					m,
					n,
					o,
					p,
					q,
					r,
					s;
					if (E.test(h + f.event.triggered)) return;
					h.indexOf("!") >= 0 && (h = h.slice(0, -1), k = !0),
					h.indexOf(".") >= 0 && (i = h.split("."), h = i.shift(), i.sort());
					if ((!e || f.event.customEvent[h]) && !f.event.global[h]) return;
					c = typeof c == "object" ? c[f.expando] ? c: new f.Event(h, c) : new f.Event(h),
							c.type = h,
							c.isTrigger = !0,
							c.exclusive = k,
							c.namespace = i.join("."),
							c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + i.join("\\.(?:.*\\.)?") + "(\\.|$)") : null,
									o = h.indexOf(":") < 0 ? "on" + h: "";
							if (!e) {
								j = f.cache;
								for (l in j) j[l].events && j[l].events[h] && f.event.trigger(c, d, j[l].handle.elem, !0);
								return
							}
							c.result = b,
							c.target || (c.target = e),
							d = d != null ? f.makeArray(d) : [],
									d.unshift(c),
									p = f.event.special[h] || {};
									if (p.trigger && p.trigger.apply(e, d) === !1) return;
									r = [[e, p.bindType || h]];
									if (!g && !p.noBubble && !f.isWindow(e)) {
										s = p.delegateType || h,
										m = E.test(s + h) ? e: e.parentNode,
												n = null;
										for (; m; m = m.parentNode) r.push([m, s]),
										n = m;
										n && n === e.ownerDocument && r.push([n.defaultView || n.parentWindow || a, s])
									}
									for (l = 0; l < r.length && !c.isPropagationStopped(); l++) m = r[l][0],
									c.type = r[l][1],
									q = (f._data(m, "events") || {})[c.type] && f._data(m, "handle"),
									q && q.apply(m, d),
									q = o && m[o],
									q && f.acceptData(m) && q.apply(m, d) === !1 && c.preventDefault();
									c.type = h,
									!g && !c.isDefaultPrevented() && (!p._default || p._default.apply(e.ownerDocument, d) === !1) && (h !== "click" || !f.nodeName(e, "a")) && f.acceptData(e) && o && e[h] && (h !== "focus" && h !== "blur" || c.target.offsetWidth !== 0) && !f.isWindow(e) && (n = e[o], n && (e[o] = null), f.event.triggered = h, e[h](), f.event.triggered = b, n && (e[o] = n));
									return c.result
				}
			},
			dispatch: function(c) {
				c = f.event.fix(c || a.event);
				var d = (f._data(this, "events") || {})[c.type] || [],
				e = d.delegateCount,
				g = [].slice.call(arguments, 0),
				h = !c.exclusive && !c.namespace,
				i = f.event.special[c.type] || {},
				j = [],
				k,
				l,
				m,
				n,
				o,
				p,
				q,
				r,
				s,
				t,
				u;
				g[0] = c,
				c.delegateTarget = this;
				if (!i.preDispatch || i.preDispatch.call(this, c) !== !1) {
					if (e && (!c.button || c.type !== "click")) {
						n = f(this),
						n.context = this.ownerDocument || this;
						for (m = c.target; m != this; m = m.parentNode || this) if (m.disabled !== !0) {
							p = {},
							r = [],
							n[0] = m;
							for (k = 0; k < e; k++) s = d[k],
							t = s.selector,
							p[t] === b && (p[t] = s.quick ? H(m, s.quick) : n.is(t)),
							p[t] && r.push(s);
							r.length && j.push({
								elem: m,
								matches: r
							})
						}
					}
					d.length > e && j.push({
						elem: this,
						matches: d.slice(e)
					});
					for (k = 0; k < j.length && !c.isPropagationStopped(); k++) {
						q = j[k],
						c.currentTarget = q.elem;
						for (l = 0; l < q.matches.length && !c.isImmediatePropagationStopped(); l++) {
							s = q.matches[l];
							if (h || !c.namespace && !s.namespace || c.namespace_re && c.namespace_re.test(s.namespace)) c.data = s.data,
							c.handleObj = s,
							o = ((f.event.special[s.origType] || {}).handle || s.handler).apply(q.elem, g),
							o !== b && (c.result = o, o === !1 && (c.preventDefault(), c.stopPropagation()))
						}
					}
					i.postDispatch && i.postDispatch.call(this, c);
					return c.result
				}
			},
			props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
			fixHooks: {},
			keyHooks: {
				props: "char charCode key keyCode".split(" "),
				filter: function(a, b) {
					a.which == null && (a.which = b.charCode != null ? b.charCode: b.keyCode);
					return a
				}
			},
			mouseHooks: {
				props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
				filter: function(a, d) {
					var e, f, g, h = d.button,
					i = d.fromElement;
					a.pageX == null && d.clientX != null && (e = a.target.ownerDocument || c, f = e.documentElement, g = e.body, a.pageX = d.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), a.pageY = d.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)),
					!a.relatedTarget && i && (a.relatedTarget = i === a.target ? d.toElement: i),
					!a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0);
					return a
				}
			},
			fix: function(a) {
				if (a[f.expando]) return a;
				var d, e, g = a,
				h = f.event.fixHooks[a.type] || {},
				i = h.props ? this.props.concat(h.props) : this.props;
				a = f.Event(g);
				for (d = i.length; d;) e = i[--d],
				a[e] = g[e];
				a.target || (a.target = g.srcElement || c),
				a.target.nodeType === 3 && (a.target = a.target.parentNode),
				a.metaKey === b && (a.metaKey = a.ctrlKey);
				return h.filter ? h.filter(a, g) : a
			},
			special: {
				ready: {
					setup: f.bindReady
				},
				load: {
					noBubble: !0
				},
				focus: {
					delegateType: "focusin"
				},
				blur: {
					delegateType: "focusout"
				},
				beforeunload: {
					setup: function(a, b, c) {
						f.isWindow(this) && (this.onbeforeunload = c)
					},
					teardown: function(a, b) {
						this.onbeforeunload === b && (this.onbeforeunload = null)
					}
				}
			},
			simulate: function(a, b, c, d) {
				var e = f.extend(new f.Event, c, {
					type: a,
					isSimulated: !0,
					originalEvent: {}
				});
				d ? f.event.trigger(e, null, b) : f.event.dispatch.call(b, e),
						e.isDefaultPrevented() && c.preventDefault()
			}
	},
	f.event.handle = f.event.dispatch,
	f.removeEvent = c.removeEventListener ?
			function(a, b, c) {
		a.removeEventListener && a.removeEventListener(b, c, !1)
	}: function(a, b, c) {
		a.detachEvent && a.detachEvent("on" + b, c)
	},
	f.Event = function(a, b) {
		if (! (this instanceof f.Event)) return new f.Event(a, b);
		a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? K: J) : this.type = a,
				b && f.extend(this, b),
				this.timeStamp = a && a.timeStamp || f.now(),
				this[f.expando] = !0
	},
	f.Event.prototype = {
			preventDefault: function() {
				this.isDefaultPrevented = K;
				var a = this.originalEvent; ! a || (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
			},
			stopPropagation: function() {
				this.isPropagationStopped = K;
				var a = this.originalEvent; ! a || (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
			},
			stopImmediatePropagation: function() {
				this.isImmediatePropagationStopped = K,
				this.stopPropagation()
			},
			isDefaultPrevented: J,
			isPropagationStopped: J,
			isImmediatePropagationStopped: J
	},
	f.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout"
	},
	function(a, b) {
		f.event.special[a] = {
				delegateType: b,
				bindType: b,
				handle: function(a) {
					var c = this,
					d = a.relatedTarget,
					e = a.handleObj,
					g = e.selector,
					h;
					if (!d || d !== c && !f.contains(c, d)) a.type = e.origType,
					h = e.handler.apply(this, arguments),
					a.type = b;
					return h
				}
		}
	}),
	f.support.submitBubbles || (f.event.special.submit = {
			setup: function() {
				if (f.nodeName(this, "form")) return ! 1;
				f.event.add(this, "click._submit keypress._submit",
						function(a) {
					var c = a.target,
					d = f.nodeName(c, "input") || f.nodeName(c, "button") ? c.form: b;
					d && !d._submit_attached && (f.event.add(d, "submit._submit",
							function(a) {
						a._submit_bubble = !0
					}), d._submit_attached = !0)
				})
			},
			postDispatch: function(a) {
				a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && f.event.simulate("submit", this.parentNode, a, !0))
			},
			teardown: function() {
				if (f.nodeName(this, "form")) return ! 1;
				f.event.remove(this, "._submit")
			}
	}),
	f.support.changeBubbles || (f.event.special.change = {
			setup: function() {
				if (z.test(this.nodeName)) {
					if (this.type === "checkbox" || this.type === "radio") f.event.add(this, "propertychange._change",
							function(a) {
						a.originalEvent.propertyName === "checked" && (this._just_changed = !0)
					}),
					f.event.add(this, "click._change",
							function(a) {
						this._just_changed && !a.isTrigger && (this._just_changed = !1, f.event.simulate("change", this, a, !0))
					});
					return ! 1
				}
				f.event.add(this, "beforeactivate._change",
						function(a) {
					var b = a.target;
					z.test(b.nodeName) && !b._change_attached && (f.event.add(b, "change._change",
							function(a) {
						this.parentNode && !a.isSimulated && !a.isTrigger && f.event.simulate("change", this.parentNode, a, !0)
					}), b._change_attached = !0)
				})
			},
			handle: function(a) {
				var b = a.target;
				if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") return a.handleObj.handler.apply(this, arguments)
			},
			teardown: function() {
				f.event.remove(this, "._change");
				return z.test(this.nodeName)
			}
	}),
	f.support.focusinBubbles || f.each({
		focus: "focusin",
		blur: "focusout"
	},
	function(a, b) {
		var d = 0,
		e = function(a) {
			f.event.simulate(b, a.target, f.event.fix(a), !0)
		};
		f.event.special[b] = {
				setup: function() {
					d++===0 && c.addEventListener(a, e, !0)
				},
				teardown: function() {--d === 0 && c.removeEventListener(a, e, !0)
				}
		}
	}),
	f.fn.extend({
		on: function(a, c, d, e, g) {
			var h, i;
			if (typeof a == "object") {
				typeof c != "string" && (d = d || c, c = b);
				for (i in a) this.on(i, c, d, a[i], g);
				return this
			}
			d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b));
			if (e === !1) e = J;
			else if (!e) return this;
			g === 1 && (h = e, e = function(a) {
				f().off(a);
				return h.apply(this, arguments)
			},
			e.guid = h.guid || (h.guid = f.guid++));
			return this.each(function() {
				f.event.add(this, a, e, d, c)
			})
		},
		one: function(a, b, c, d) {
			return this.on(a, b, c, d, 1)
		},
		off: function(a, c, d) {
			if (a && a.preventDefault && a.handleObj) {
				var e = a.handleObj;
				f(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace: e.origType, e.selector, e.handler);
				return this
			}
			if (typeof a == "object") {
				for (var g in a) this.off(g, c, a[g]);
				return this
			}
			if (c === !1 || typeof c == "function") d = c,
			c = b;
			d === !1 && (d = J);
			return this.each(function() {
				f.event.remove(this, a, d, c)
			})
		},
		bind: function(a, b, c) {
			return this.on(a, null, b, c)
		},
		unbind: function(a, b) {
			return this.off(a, null, b)
		},
		live: function(a, b, c) {
			f(this.context).on(a, this.selector, b, c);
			return this
		},
		die: function(a, b) {
			f(this.context).off(a, this.selector || "**", b);
			return this
		},
		delegate: function(a, b, c, d) {
			return this.on(b, a, c, d)
		},
		undelegate: function(a, b, c) {
			return arguments.length == 1 ? this.off(a, "**") : this.off(b, a, c)
		},
		trigger: function(a, b) {
			return this.each(function() {
				f.event.trigger(a, b, this)
			})
		},
		triggerHandler: function(a, b) {
			if (this[0]) return f.event.trigger(a, b, this[0], !0)
		},
		toggle: function(a) {
			var b = arguments,
			c = a.guid || f.guid++,
			d = 0,
			e = function(c) {
				var e = (f._data(this, "lastToggle" + a.guid) || 0) % d;
				f._data(this, "lastToggle" + a.guid, e + 1),
				c.preventDefault();
				return b[e].apply(this, arguments) || !1
			};
			e.guid = c;
			while (d < b.length) b[d++].guid = c;
			return this.click(e)
		},
		hover: function(a, b) {
			return this.mouseenter(a).mouseleave(b || a)
		}
	}),
	f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),
			function(a, b) {
		f.fn[b] = function(a, c) {
			c == null && (c = a, a = null);
			return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
		},
		f.attrFn && (f.attrFn[b] = !0),
		C.test(b) && (f.event.fixHooks[b] = f.event.keyHooks),
		D.test(b) && (f.event.fixHooks[b] = f.event.mouseHooks)
	}),
	function() {
		function x(a, b, c, e, f, g) {
			for (var h = 0,
					i = e.length; h < i; h++) {
				var j = e[h];
				if (j) {
					var k = !1;
					j = j[a];
					while (j) {
						if (j[d] === c) {
							k = e[j.sizset];
							break
						}
						if (j.nodeType === 1) {
							g || (j[d] = c, j.sizset = h);
							if (typeof b != "string") {
								if (j === b) {
									k = !0;
									break
								}
							} else if (m.filter(b, [j]).length > 0) {
								k = j;
								break
							}
						}
						j = j[a]
					}
					e[h] = k
				}
			}
		}
		function w(a, b, c, e, f, g) {
			for (var h = 0,
					i = e.length; h < i; h++) {
				var j = e[h];
				if (j) {
					var k = !1;
					j = j[a];
					while (j) {
						if (j[d] === c) {
							k = e[j.sizset];
							break
						}
						j.nodeType === 1 && !g && (j[d] = c, j.sizset = h);
						if (j.nodeName.toLowerCase() === b) {
							k = j;
							break
						}
						j = j[a]
					}
					e[h] = k
				}
			}
		}
		var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
		d = "sizcache" + (Math.random() + "").replace(".", ""),
		e = 0,
		g = Object.prototype.toString,
		h = !1,
		i = !0,
		j = /\\/g,
		k = /\r\n/g,
		l = /\W/; [0, 0].sort(function() {
			i = !1;
			return 0
		});
		var m = function(b, d, e, f) {
			e = e || [],
			d = d || c;
			var h = d;
			if (d.nodeType !== 1 && d.nodeType !== 9) return [];
			if (!b || typeof b != "string") return e;
			var i, j, k, l, n, q, r, t, u = !0,
			v = m.isXML(d),
			w = [],
			x = b;
			do {
				a.exec(""), i = a.exec(x);
				if (i) {
					x = i[3],
					w.push(i[1]);
					if (i[2]) {
						l = i[3];
						break
					}
				}
			} while ( i );
			if (w.length > 1 && p.exec(b)) if (w.length === 2 && o.relative[w[0]]) j = y(w[0] + w[1], d, f);
			else {
				j = o.relative[w[0]] ? [d] : m(w.shift(), d);
				while (w.length) b = w.shift(),
				o.relative[b] && (b += w.shift()),
				j = y(b, j, f)
			} else { ! f && w.length > 1 && d.nodeType === 9 && !v && o.match.ID.test(w[0]) && !o.match.ID.test(w[w.length - 1]) && (n = m.find(w.shift(), d, v), d = n.expr ? m.filter(n.expr, n.set)[0] : n.set[0]);
			if (d) {
				n = f ? {
					expr: w.pop(),
					set: s(f)
				}: m.find(w.pop(), w.length === 1 && (w[0] === "~" || w[0] === "+") && d.parentNode ? d.parentNode: d, v),
				j = n.expr ? m.filter(n.expr, n.set) : n.set,
						w.length > 0 ? k = s(j) : u = !1;
						while (w.length) q = w.pop(),
						r = q,
						o.relative[q] ? r = w.pop() : q = "",
								r == null && (r = d),
								o.relative[q](k, r, v)
			} else k = w = []
			}
			k || (k = j),
			k || m.error(q || b);
			if (g.call(k) === "[object Array]") if (!u) e.push.apply(e, k);
			else if (d && d.nodeType === 1) for (t = 0; k[t] != null; t++) k[t] && (k[t] === !0 || k[t].nodeType === 1 && m.contains(d, k[t])) && e.push(j[t]);
			else for (t = 0; k[t] != null; t++) k[t] && k[t].nodeType === 1 && e.push(j[t]);
			else s(k, e);
			l && (m(l, h, e, f), m.uniqueSort(e));
			return e
		};
		m.uniqueSort = function(a) {
			if (u) {
				h = i,
				a.sort(u);
				if (h) for (var b = 1; b < a.length; b++) a[b] === a[b - 1] && a.splice(b--, 1)
			}
			return a
		},
		m.matches = function(a, b) {
			return m(a, null, null, b)
		},
		m.matchesSelector = function(a, b) {
			return m(b, null, null, [a]).length > 0
		},
		m.find = function(a, b, c) {
			var d, e, f, g, h, i;
			if (!a) return [];
			for (e = 0, f = o.order.length; e < f; e++) {
				h = o.order[e];
				if (g = o.leftMatch[h].exec(a)) {
					i = g[1],
					g.splice(1, 1);
					if (i.substr(i.length - 1) !== "\\") {
						g[1] = (g[1] || "").replace(j, ""),
						d = o.find[h](g, b, c);
						if (d != null) {
							a = a.replace(o.match[h], "");
							break
						}
					}
				}
			}
			d || (d = typeof b.getElementsByTagName != "undefined" ? b.getElementsByTagName("*") : []);
			return {
				set: d,
				expr: a
			}
		},
		m.filter = function(a, c, d, e) {
			var f, g, h, i, j, k, l, n, p, q = a,
			r = [],
			s = c,
			t = c && c[0] && m.isXML(c[0]);
			while (a && c.length) {
				for (h in o.filter) if ((f = o.leftMatch[h].exec(a)) != null && f[2]) {
					k = o.filter[h],
					l = f[1],
					g = !1,
					f.splice(1, 1);
					if (l.substr(l.length - 1) === "\\") continue;
					s === r && (r = []);
					if (o.preFilter[h]) {
						f = o.preFilter[h](f, s, d, r, e, t);
						if (!f) g = i = !0;
						else if (f === !0) continue
					}
					if (f) for (n = 0; (j = s[n]) != null; n++) j && (i = k(j, f, n, s), p = e ^ i, d && i != null ? p ? g = !0 : s[n] = !1 : p && (r.push(j), g = !0));
					if (i !== b) {
						d || (s = r),
						a = a.replace(o.match[h], "");
						if (!g) return [];
						break
					}
				}
				if (a === q) if (g == null) m.error(a);
				else break;
				q = a
			}
			return s
		},
		m.error = function(a) {
			throw new Error("Syntax error, unrecognized expression: " + a)
		};
		var n = m.getText = function(a) {
			var b, c, d = a.nodeType,
			e = "";
			if (d) {
				if (d === 1 || d === 9 || d === 11) {
					if (typeof a.textContent == "string") return a.textContent;
					if (typeof a.innerText == "string") return a.innerText.replace(k, "");
					for (a = a.firstChild; a; a = a.nextSibling) e += n(a)
				} else if (d === 3 || d === 4) return a.nodeValue
			} else for (b = 0; c = a[b]; b++) c.nodeType !== 8 && (e += n(c));
			return e
		},
		o = m.selectors = {
				order: ["ID", "NAME", "TAG"],
				match: {
					ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
					CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
					NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
					ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
					TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
					CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
					POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
					PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
				},
				leftMatch: {},
				attrMap: {
					"class": "className",
					"for": "htmlFor"
				},
				attrHandle: {
					href: function(a) {
						return a.getAttribute("href")
					},
					type: function(a) {
						return a.getAttribute("type")
					}
				},
				relative: {
					"+": function(a, b) {
						var c = typeof b == "string",
						d = c && !l.test(b),
						e = c && !d;
						d && (b = b.toLowerCase());
						for (var f = 0,
								g = a.length,
								h; f < g; f++) if (h = a[f]) {
									while ((h = h.previousSibling) && h.nodeType !== 1);
									a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b
								}
						e && m.filter(b, a, !0)
					},
					">": function(a, b) {
						var c, d = typeof b == "string",
						e = 0,
						f = a.length;
						if (d && !l.test(b)) {
							b = b.toLowerCase();
							for (; e < f; e++) {
								c = a[e];
								if (c) {
									var g = c.parentNode;
									a[e] = g.nodeName.toLowerCase() === b ? g: !1
								}
							}
						} else {
							for (; e < f; e++) c = a[e],
							c && (a[e] = d ? c.parentNode: c.parentNode === b);
							d && m.filter(b, a, !0)
						}
					},
					"": function(a, b, c) {
						var d, f = e++,
						g = x;
						typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w),
						g("parentNode", b, f, a, d, c)
					},
					"~": function(a, b, c) {
						var d, f = e++,
						g = x;
						typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w),
						g("previousSibling", b, f, a, d, c)
					}
				},
				find: {
					ID: function(a, b, c) {
						if (typeof b.getElementById != "undefined" && !c) {
							var d = b.getElementById(a[1]);
							return d && d.parentNode ? [d] : []
						}
					},
					NAME: function(a, b) {
						if (typeof b.getElementsByName != "undefined") {
							var c = [],
							d = b.getElementsByName(a[1]);
							for (var e = 0,
									f = d.length; e < f; e++) d[e].getAttribute("name") === a[1] && c.push(d[e]);
							return c.length === 0 ? null: c
						}
					},
					TAG: function(a, b) {
						if (typeof b.getElementsByTagName != "undefined") return b.getElementsByTagName(a[1])
					}
				},
				preFilter: {
					CLASS: function(a, b, c, d, e, f) {
						a = " " + a[1].replace(j, "") + " ";
						if (f) return a;
						for (var g = 0,
								h; (h = b[g]) != null; g++) h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
						return ! 1
					},
					ID: function(a) {
						return a[1].replace(j, "")
					},
					TAG: function(a, b) {
						return a[1].replace(j, "").toLowerCase()
					},
					CHILD: function(a) {
						if (a[1] === "nth") {
							a[2] || m.error(a[0]),
							a[2] = a[2].replace(/^\+|\s*/g, "");
							var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
							a[2] = b[1] + (b[2] || 1) - 0,
							a[3] = b[3] - 0
						} else a[2] && m.error(a[0]);
						a[0] = e++;
						return a
					},
					ATTR: function(a, b, c, d, e, f) {
						var g = a[1] = a[1].replace(j, ""); ! f && o.attrMap[g] && (a[1] = o.attrMap[g]),
						a[4] = (a[4] || a[5] || "").replace(j, ""),
						a[2] === "~=" && (a[4] = " " + a[4] + " ");
						return a
					},
					PSEUDO: function(b, c, d, e, f) {
						if (b[1] === "not") if ((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3])) b[3] = m(b[3], null, null, c);
						else {
							var g = m.filter(b[3], c, d, !0 ^ f);
							d || e.push.apply(e, g);
							return ! 1
						} else if (o.match.POS.test(b[0]) || o.match.CHILD.test(b[0])) return ! 0;
						return b
					},
					POS: function(a) {
						a.unshift(!0);
						return a
					}
				},
				filters: {
					enabled: function(a) {
						return a.disabled === !1 && a.type !== "hidden"
					},
					disabled: function(a) {
						return a.disabled === !0
					},
					checked: function(a) {
						return a.checked === !0
					},
					selected: function(a) {
						a.parentNode && a.parentNode.selectedIndex;
						return a.selected === !0
					},
					parent: function(a) {
						return !! a.firstChild
					},
					empty: function(a) {
						return ! a.firstChild
					},
					has: function(a, b, c) {
						return !! m(c[3], a).length
					},
					header: function(a) {
						return /h\d/i.test(a.nodeName)
					},
					text: function(a) {
						var b = a.getAttribute("type"),
						c = a.type;
						return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null)
					},
					radio: function(a) {
						return a.nodeName.toLowerCase() === "input" && "radio" === a.type
					},
					checkbox: function(a) {
						return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type
					},
					file: function(a) {
						return a.nodeName.toLowerCase() === "input" && "file" === a.type
					},
					password: function(a) {
						return a.nodeName.toLowerCase() === "input" && "password" === a.type
					},
					submit: function(a) {
						var b = a.nodeName.toLowerCase();
						return (b === "input" || b === "button") && "submit" === a.type
					},
					image: function(a) {
						return a.nodeName.toLowerCase() === "input" && "image" === a.type
					},
					reset: function(a) {
						var b = a.nodeName.toLowerCase();
						return (b === "input" || b === "button") && "reset" === a.type
					},
					button: function(a) {
						var b = a.nodeName.toLowerCase();
						return b === "input" && "button" === a.type || b === "button"
					},
					input: function(a) {
						return /input|select|textarea|button/i.test(a.nodeName)
					},
					focus: function(a) {
						return a === a.ownerDocument.activeElement
					}
				},
				setFilters: {
					first: function(a, b) {
						return b === 0
					},
					last: function(a, b, c, d) {
						return b === d.length - 1
					},
					even: function(a, b) {
						return b % 2 === 0
					},
					odd: function(a, b) {
						return b % 2 === 1
					},
					lt: function(a, b, c) {
						return b < c[3] - 0
					},
					gt: function(a, b, c) {
						return b > c[3] - 0
					},
					nth: function(a, b, c) {
						return c[3] - 0 === b
					},
					eq: function(a, b, c) {
						return c[3] - 0 === b
					}
				},
				filter: {
					PSEUDO: function(a, b, c, d) {
						var e = b[1],
						f = o.filters[e];
						if (f) return f(a, c, b, d);
						if (e === "contains") return (a.textContent || a.innerText || n([a]) || "").indexOf(b[3]) >= 0;
						if (e === "not") {
							var g = b[3];
							for (var h = 0,
									i = g.length; h < i; h++) if (g[h] === a) return ! 1;
							return ! 0
						}
						m.error(e)
					},
					CHILD: function(a, b) {
						var c, e, f, g, h, i, j, k = b[1],
						l = a;
						switch (k) {
						case "only":
						case "first":
							while (l = l.previousSibling) if (l.nodeType === 1) return ! 1;
							if (k === "first") return ! 0;
							l = a;
						case "last":
							while (l = l.nextSibling) if (l.nodeType === 1) return ! 1;
							return ! 0;
						case "nth":
							c = b[2],
							e = b[3];
							if (c === 1 && e === 0) return ! 0;
							f = b[0],
							g = a.parentNode;
							if (g && (g[d] !== f || !a.nodeIndex)) {
								i = 0;
								for (l = g.firstChild; l; l = l.nextSibling) l.nodeType === 1 && (l.nodeIndex = ++i);
								g[d] = f
							}
							j = a.nodeIndex - e;
							return c === 0 ? j === 0 : j % c === 0 && j / c >= 0
						}
					},
					ID: function(a, b) {
						return a.nodeType === 1 && a.getAttribute("id") === b
					},
					TAG: function(a, b) {
						return b === "*" && a.nodeType === 1 || !!a.nodeName && a.nodeName.toLowerCase() === b
					},
					CLASS: function(a, b) {
						return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
					},
					ATTR: function(a, b) {
						var c = b[1],
						d = m.attr ? m.attr(a, c) : o.attrHandle[c] ? o.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c),
								e = d + "",
								f = b[2],
								g = b[4];
						return d == null ? f === "!=": !f && m.attr ? d != null: f === "=" ? e === g: f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g: f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g: f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-": !1 : e && d !== !1
					},
					POS: function(a, b, c, d) {
						var e = b[2],
						f = o.setFilters[e];
						if (f) return f(a, c, b, d)
					}
				}
		},
		p = o.match.POS,
		q = function(a, b) {
			return "\\" + (b - 0 + 1)
		};
		for (var r in o.match) o.match[r] = new RegExp(o.match[r].source + /(?![^\[]*\])(?![^\(]*\))/.source),
		o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g, q));
		o.match.globalPOS = p;
		var s = function(a, b) {
			a = Array.prototype.slice.call(a, 0);
			if (b) {
				b.push.apply(b, a);
				return b
			}
			return a
		};
		try {
			Array.prototype.slice.call(c.documentElement.childNodes, 0)[0].nodeType
		} catch(t) {
			s = function(a, b) {
				var c = 0,
				d = b || [];
				if (g.call(a) === "[object Array]") Array.prototype.push.apply(d, a);
				else if (typeof a.length == "number") for (var e = a.length; c < e; c++) d.push(a[c]);
				else for (; a[c]; c++) d.push(a[c]);
				return d
			}
		}
		var u, v;
		c.documentElement.compareDocumentPosition ? u = function(a, b) {
			if (a === b) {
				h = !0;
				return 0
			}
			if (!a.compareDocumentPosition || !b.compareDocumentPosition) return a.compareDocumentPosition ? -1 : 1;
			return a.compareDocumentPosition(b) & 4 ? -1 : 1
		}: (u = function(a, b) {
			if (a === b) {
				h = !0;
				return 0
			}
			if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
			var c, d, e = [],
			f = [],
			g = a.parentNode,
			i = b.parentNode,
			j = g;
			if (g === i) return v(a, b);
			if (!g) return - 1;
			if (!i) return 1;
			while (j) e.unshift(j),
			j = j.parentNode;
			j = i;
			while (j) f.unshift(j),
			j = j.parentNode;
			c = e.length,
			d = f.length;
			for (var k = 0; k < c && k < d; k++) if (e[k] !== f[k]) return v(e[k], f[k]);
			return k === c ? v(a, f[k], -1) : v(e[k], b, 1)
		},
		v = function(a, b, c) {
			if (a === b) return c;
			var d = a.nextSibling;
			while (d) {
				if (d === b) return - 1;
				d = d.nextSibling
			}
			return 1
		}),
		function() {
			var a = c.createElement("div"),
			d = "script" + (new Date).getTime(),
			e = c.documentElement;
			a.innerHTML = "<a name='" + d + "'/>",
			e.insertBefore(a, e.firstChild),
			c.getElementById(d) && (o.find.ID = function(a, c, d) {
				if (typeof c.getElementById != "undefined" && !d) {
					var e = c.getElementById(a[1]);
					return e ? e.id === a[1] || typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b: []
				}
			},
			o.filter.ID = function(a, b) {
				var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
				return a.nodeType === 1 && c && c.nodeValue === b
			}),
			e.removeChild(a),
			e = a = null
		} (),
		function() {
			var a = c.createElement("div");
			a.appendChild(c.createComment("")),
			a.getElementsByTagName("*").length > 0 && (o.find.TAG = function(a, b) {
				var c = b.getElementsByTagName(a[1]);
				if (a[1] === "*") {
					var d = [];
					for (var e = 0; c[e]; e++) c[e].nodeType === 1 && d.push(c[e]);
					c = d
				}
				return c
			}),
			a.innerHTML = "<a href='#'></a>",
			a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (o.attrHandle.href = function(a) {
				return a.getAttribute("href", 2)
			}),
			a = null
		} (),
		c.querySelectorAll &&
		function() {
			var a = m,
			b = c.createElement("div"),
			d = "__sizzle__";
			b.innerHTML = "<p class='TEST'></p>";
			if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) {
				m = function(b, e, f, g) {
					e = e || c;
					if (!g && !m.isXML(e)) {
						var h = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
						if (h && (e.nodeType === 1 || e.nodeType === 9)) {
							if (h[1]) return s(e.getElementsByTagName(b), f);
							if (h[2] && o.find.CLASS && e.getElementsByClassName) return s(e.getElementsByClassName(h[2]), f)
						}
						if (e.nodeType === 9) {
							if (b === "body" && e.body) return s([e.body], f);
							if (h && h[3]) {
								var i = e.getElementById(h[3]);
								if (!i || !i.parentNode) return s([], f);
								if (i.id === h[3]) return s([i], f)
							}
							try {
								return s(e.querySelectorAll(b), f)
							} catch(j) {}
						} else if (e.nodeType === 1 && e.nodeName.toLowerCase() !== "object") {
							var k = e,
							l = e.getAttribute("id"),
							n = l || d,
							p = e.parentNode,
							q = /^\s*[+~]/.test(b);
							l ? n = n.replace(/'/g, "\\$&") : e.setAttribute("id", n),
									q && p && (e = e.parentNode);
							try {
								if (!q || p) return s(e.querySelectorAll("[id='" + n + "'] " + b), f)
							} catch(r) {} finally {
								l || k.removeAttribute("id")
							}
						}
					}
					return a(b, e, f, g)
				};
				for (var e in a) m[e] = a[e];
				b = null
			}
		} (),
		function() {
			var a = c.documentElement,
			b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
			if (b) {
				var d = !b.call(c.createElement("div"), "div"),
				e = !1;
				try {
					b.call(c.documentElement, "[test!='']:sizzle")
				} catch(f) {
					e = !0
				}
				m.matchesSelector = function(a, c) {
					c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
					if (!m.isXML(a)) try {
						if (e || !o.match.PSEUDO.test(c) && !/!=/.test(c)) {
							var f = b.call(a, c);
							if (f || !d || a.document && a.document.nodeType !== 11) return f
						}
					} catch(g) {}
					return m(c, null, null, [a]).length > 0
				}
			}
		} (),
		function() {
			var a = c.createElement("div");
			a.innerHTML = "<div class='test e'></div><div class='test'></div>";
			if ( !! a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) {
				a.lastChild.className = "e";
				if (a.getElementsByClassName("e").length === 1) return;
				o.order.splice(1, 0, "CLASS"),
				o.find.CLASS = function(a, b, c) {
					if (typeof b.getElementsByClassName != "undefined" && !c) return b.getElementsByClassName(a[1])
				},
				a = null
			}
		} (),
		c.documentElement.contains ? m.contains = function(a, b) {
			return a !== b && (a.contains ? a.contains(b) : !0)
		}: c.documentElement.compareDocumentPosition ? m.contains = function(a, b) {
			return !! (a.compareDocumentPosition(b) & 16)
		}: m.contains = function() {
			return ! 1
		},
		m.isXML = function(a) {
			var b = (a ? a.ownerDocument || a: 0).documentElement;
			return b ? b.nodeName !== "HTML": !1
		};
		var y = function(a, b, c) {
			var d, e = [],
			f = "",
			g = b.nodeType ? [b] : b;
			while (d = o.match.PSEUDO.exec(a)) f += d[0],
			a = a.replace(o.match.PSEUDO, "");
			a = o.relative[a] ? a + "*": a;
			for (var h = 0,
					i = g.length; h < i; h++) m(a, g[h], e, c);
			return m.filter(f, e)
		};
		m.attr = f.attr,
		m.selectors.attrMap = {},
		f.find = m,
		f.expr = m.selectors,
		f.expr[":"] = f.expr.filters,
		f.unique = m.uniqueSort,
		f.text = m.getText,
		f.isXMLDoc = m.isXML,
		f.contains = m.contains
	} ();
	var L = /Until$/,
	M = /^(?:parents|prevUntil|prevAll)/,
	N = /,/,
	O = /^.[^:#\[\.,]*$/,
	P = Array.prototype.slice,
	Q = f.expr.match.globalPOS,
	R = {
			children: !0,
			contents: !0,
			next: !0,
			prev: !0
	};
	f.fn.extend({
		find: function(a) {
			var b = this,
			c, d;
			if (typeof a != "string") return f(a).filter(function() {
				for (c = 0, d = b.length; c < d; c++) if (f.contains(b[c], this)) return ! 0
			});
			var e = this.pushStack("", "find", a),
			g,
			h,
			i;
			for (c = 0, d = this.length; c < d; c++) {
				g = e.length,
				f.find(a, this[c], e);
				if (c > 0) for (h = g; h < e.length; h++) for (i = 0; i < g; i++) if (e[i] === e[h]) {
					e.splice(h--, 1);
					break
				}
			}
			return e
		},
		has: function(a) {
			var b = f(a);
			return this.filter(function() {
				for (var a = 0,
						c = b.length; a < c; a++) if (f.contains(this, b[a])) return ! 0
			})
		},
		not: function(a) {
			return this.pushStack(T(this, a, !1), "not", a)
		},
		filter: function(a) {
			return this.pushStack(T(this, a, !0), "filter", a)
		},
		is: function(a) {
			return !! a && (typeof a == "string" ? Q.test(a) ? f(a, this.context).index(this[0]) >= 0 : f.filter(a, this).length > 0 : this.filter(a).length > 0)
		},
		closest: function(a, b) {
			var c = [],
			d,
			e,
			g = this[0];
			if (f.isArray(a)) {
				var h = 1;
				while (g && g.ownerDocument && g !== b) {
					for (d = 0; d < a.length; d++) f(g).is(a[d]) && c.push({
						selector: a[d],
						elem: g,
						level: h
					});
					g = g.parentNode,
					h++
				}
				return c
			}
			var i = Q.test(a) || typeof a != "string" ? f(a, b || this.context) : 0;
			for (d = 0, e = this.length; d < e; d++) {
				g = this[d];
				while (g) {
					if (i ? i.index(g) > -1 : f.find.matchesSelector(g, a)) {
						c.push(g);
						break
					}
					g = g.parentNode;
					if (!g || !g.ownerDocument || g === b || g.nodeType === 11) break
				}
			}
			c = c.length > 1 ? f.unique(c) : c;
			return this.pushStack(c, "closest", a)
		},
		index: function(a) {
			if (!a) return this[0] && this[0].parentNode ? this.prevAll().length: -1;
			if (typeof a == "string") return f.inArray(this[0], f(a));
			return f.inArray(a.jquery ? a[0] : a, this)
		},
		add: function(a, b) {
			var c = typeof a == "string" ? f(a, b) : f.makeArray(a && a.nodeType ? [a] : a),
					d = f.merge(this.get(), c);
			return this.pushStack(S(c[0]) || S(d[0]) ? d: f.unique(d))
		},
		andSelf: function() {
			return this.add(this.prevObject)
		}
	}),
	f.each({
		parent: function(a) {
			var b = a.parentNode;
			return b && b.nodeType !== 11 ? b: null
		},
		parents: function(a) {
			return f.dir(a, "parentNode")
		},
		parentsUntil: function(a, b, c) {
			return f.dir(a, "parentNode", c)
		},
		next: function(a) {
			return f.nth(a, 2, "nextSibling")
		},
		prev: function(a) {
			return f.nth(a, 2, "previousSibling")
		},
		nextAll: function(a) {
			return f.dir(a, "nextSibling")
		},
		prevAll: function(a) {
			return f.dir(a, "previousSibling")
		},
		nextUntil: function(a, b, c) {
			return f.dir(a, "nextSibling", c)
		},
		prevUntil: function(a, b, c) {
			return f.dir(a, "previousSibling", c)
		},
		siblings: function(a) {
			return f.sibling((a.parentNode || {}).firstChild, a)
		},
		children: function(a) {
			return f.sibling(a.firstChild)
		},
		contents: function(a) {
			return f.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document: f.makeArray(a.childNodes)
		}
	},
	function(a, b) {
		f.fn[a] = function(c, d) {
			var e = f.map(this, b, c);
			L.test(a) || (d = c),
			d && typeof d == "string" && (e = f.filter(d, e)),
			e = this.length > 1 && !R[a] ? f.unique(e) : e,
					(this.length > 1 || N.test(d)) && M.test(a) && (e = e.reverse());
			return this.pushStack(e, a, P.call(arguments).join(","))
		}
	}),
	f.extend({
		filter: function(a, b, c) {
			c && (a = ":not(" + a + ")");
			return b.length === 1 ? f.find.matchesSelector(b[0], a) ? [b[0]] : [] : f.find.matches(a, b)
		},
		dir: function(a, c, d) {
			var e = [],
			g = a[c];
			while (g && g.nodeType !== 9 && (d === b || g.nodeType !== 1 || !f(g).is(d))) g.nodeType === 1 && e.push(g),
			g = g[c];
			return e
		},
		nth: function(a, b, c, d) {
			b = b || 1;
			var e = 0;
			for (; a; a = a[c]) if (a.nodeType === 1 && ++e === b) break;
			return a
		},
		sibling: function(a, b) {
			var c = [];
			for (; a; a = a.nextSibling) a.nodeType === 1 && a !== b && c.push(a);
			return c
		}
	});
	var V = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	W = / jQuery\d+="(?:\d+|null)"/g,
	X = /^\s+/,
	Y = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
	Z = /<([\w:]+)/,
	$ = /<tbody/i,
	_ = /<|&#?\w+;/,
	ba = /<(?:script|style)/i,
	bb = /<(?:script|object|embed|option|style)/i,
	bc = new RegExp("<(?:" + V + ")[\\s/>]", "i"),
	bd = /checked\s*(?:[^=]|=\s*.checked.)/i,
	be = /\/(java|ecma)script/i,
	bf = /^\s*<!(?:\[CDATA\[|\-\-)/,
		bg = {
		option: [1, "<select multiple='multiple'>", "</select>"],
		legend: [1, "<fieldset>", "</fieldset>"],
		thead: [1, "<table>", "</table>"],
		tr: [2, "<table><tbody>", "</tbody></table>"],
		td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
		col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
		area: [1, "<map>", "</map>"],
		_default: [0, "", ""]
	},
	bh = U(c);
	bg.optgroup = bg.option,
	bg.tbody = bg.tfoot = bg.colgroup = bg.caption = bg.thead,
	bg.th = bg.td,
	f.support.htmlSerialize || (bg._default = [1, "div<div>", "</div>"]),
	f.fn.extend({
		text: function(a) {
			return f.access(this,
					function(a) {
				return a === b ? f.text(this) : this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a))
			},
			null, a, arguments.length)
		},
		wrapAll: function(a) {
			if (f.isFunction(a)) return this.each(function(b) {
				f(this).wrapAll(a.call(this, b))
			});
			if (this[0]) {
				var b = f(a, this[0].ownerDocument).eq(0).clone(!0);
				this[0].parentNode && b.insertBefore(this[0]),
				b.map(function() {
					var a = this;
					while (a.firstChild && a.firstChild.nodeType === 1) a = a.firstChild;
					return a
				}).append(this)
			}
			return this
		},
		wrapInner: function(a) {
			if (f.isFunction(a)) return this.each(function(b) {
				f(this).wrapInner(a.call(this, b))
			});
			return this.each(function() {
				var b = f(this),
				c = b.contents();
				c.length ? c.wrapAll(a) : b.append(a)
			})
		},
		wrap: function(a) {
			var b = f.isFunction(a);
			return this.each(function(c) {
				f(this).wrapAll(b ? a.call(this, c) : a)
			})
		},
		unwrap: function() {
			return this.parent().each(function() {
				f.nodeName(this, "body") || f(this).replaceWith(this.childNodes)
			}).end()
		},
		append: function() {
			return this.domManip(arguments, !0,
					function(a) {
				this.nodeType === 1 && this.appendChild(a)
			})
		},
		prepend: function() {
			return this.domManip(arguments, !0,
					function(a) {
				this.nodeType === 1 && this.insertBefore(a, this.firstChild)
			})
		},
		before: function() {
			if (this[0] && this[0].parentNode) return this.domManip(arguments, !1,
					function(a) {
				this.parentNode.insertBefore(a, this)
			});
			if (arguments.length) {
				var a = f.clean(arguments);
				a.push.apply(a, this.toArray());
				return this.pushStack(a, "before", arguments)
			}
		},
		after: function() {
			if (this[0] && this[0].parentNode) return this.domManip(arguments, !1,
					function(a) {
				this.parentNode.insertBefore(a, this.nextSibling)
			});
			if (arguments.length) {
				var a = this.pushStack(this, "after", arguments);
				a.push.apply(a, f.clean(arguments));
				return a
			}
		},
		remove: function(a, b) {
			for (var c = 0,
					d; (d = this[c]) != null; c++) if (!a || f.filter(a, [d]).length) ! b && d.nodeType === 1 && (f.cleanData(d.getElementsByTagName("*")), f.cleanData([d])),
					d.parentNode && d.parentNode.removeChild(d);
			return this
		},
		empty: function() {
			for (var a = 0,
					b; (b = this[a]) != null; a++) {
				b.nodeType === 1 && f.cleanData(b.getElementsByTagName("*"));
				while (b.firstChild) b.removeChild(b.firstChild)
			}
			return this
		},
		clone: function(a, b) {
			a = a == null ? !1 : a,
					b = b == null ? a: b;
			return this.map(function() {
				return f.clone(this, a, b)
			})
		},
		html: function(a) {
			return f.access(this,
					function(a) {
				var c = this[0] || {},
				d = 0,
				e = this.length;
				if (a === b) return c.nodeType === 1 ? c.innerHTML.replace(W, "") : null;
				if (typeof a == "string" && !ba.test(a) && (f.support.leadingWhitespace || !X.test(a)) && !bg[(Z.exec(a) || ["", ""])[1].toLowerCase()]) {
					a = a.replace(Y, "<$1></$2>");
					try {
						for (; d < e; d++) c = this[d] || {},
						c.nodeType === 1 && (f.cleanData(c.getElementsByTagName("*")), c.innerHTML = a);
						c = 0
					} catch(g) {}
				}
				c && this.empty().append(a)
			},
			null, a, arguments.length)
		},
		replaceWith: function(a) {
			if (this[0] && this[0].parentNode) {
				if (f.isFunction(a)) return this.each(function(b) {
					var c = f(this),
					d = c.html();
					c.replaceWith(a.call(this, b, d))
				});
				typeof a != "string" && (a = f(a).detach());
				return this.each(function() {
					var b = this.nextSibling,
					c = this.parentNode;
					f(this).remove(),
					b ? f(b).before(a) : f(c).append(a)
				})
			}
			return this.length ? this.pushStack(f(f.isFunction(a) ? a() : a), "replaceWith", a) : this
		},
		detach: function(a) {
			return this.remove(a, !0)
		},
		domManip: function(a, c, d) {
			var e, g, h, i, j = a[0],
			k = [];
			if (!f.support.checkClone && arguments.length === 3 && typeof j == "string" && bd.test(j)) return this.each(function() {
				f(this).domManip(a, c, d, !0)
			});
			if (f.isFunction(j)) return this.each(function(e) {
				var g = f(this);
				a[0] = j.call(this, e, c ? g.html() : b),
				g.domManip(a, c, d)
			});
			if (this[0]) {
				i = j && j.parentNode,
				f.support.parentNode && i && i.nodeType === 11 && i.childNodes.length === this.length ? e = {
						fragment: i
				}: e = f.buildFragment(a, this, k),
				h = e.fragment,
				h.childNodes.length === 1 ? g = h = h.firstChild: g = h.firstChild;
				if (g) {
					c = c && f.nodeName(g, "tr");
					for (var l = 0,
							m = this.length,
							n = m - 1; l < m; l++) d.call(c ? bi(this[l], g) : this[l], e.cacheable || m > 1 && l < n ? f.clone(h, !0, !0) : h)
				}
				k.length && f.each(k,
						function(a, b) {
					b.src ? f.ajax({
						type: "GET",
						global: !1,
						url: b.src,
						async: !1,
						dataType: "script"
					}) : f.globalEval((b.text || b.textContent || b.innerHTML || "").replace(bf, "/*$0*/")),
					b.parentNode && b.parentNode.removeChild(b)
				})
			}
			return this
		}
	}),
	f.buildFragment = function(a, b, d) {
		var e, g, h, i, j = a[0];
		b && b[0] && (i = b[0].ownerDocument || b[0]),
		i.createDocumentFragment || (i = c),
		a.length === 1 && typeof j == "string" && j.length < 512 && i === c && j.charAt(0) === "<" && !bb.test(j) && (f.support.checkClone || !bd.test(j)) && (f.support.html5Clone || !bc.test(j)) && (g = !0, h = f.fragments[j], h && h !== 1 && (e = h)),
		e || (e = i.createDocumentFragment(), f.clean(a, i, e, d)),
		g && (f.fragments[j] = h ? e: 1);
		return {
			fragment: e,
			cacheable: g
		}
	},
	f.fragments = {},
	f.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	},
	function(a, b) {
		f.fn[a] = function(c) {
			var d = [],
			e = f(c),
			g = this.length === 1 && this[0].parentNode;
			if (g && g.nodeType === 11 && g.childNodes.length === 1 && e.length === 1) {
				e[b](this[0]);
				return this
			}
			for (var h = 0,
					i = e.length; h < i; h++) {
				var j = (h > 0 ? this.clone(!0) : this).get();
				f(e[h])[b](j),
				d = d.concat(j)
			}
			return this.pushStack(d, a, e.selector)
		}
	}),
	f.extend({
		clone: function(a, b, c) {
			var d, e, g, h = f.support.html5Clone || f.isXMLDoc(a) || !bc.test("<" + a.nodeName + ">") ? a.cloneNode(!0) : bo(a);
			if ((!f.support.noCloneEvent || !f.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !f.isXMLDoc(a)) {
				bk(a, h),
				d = bl(a),
				e = bl(h);
				for (g = 0; d[g]; ++g) e[g] && bk(d[g], e[g])
			}
			if (b) {
				bj(a, h);
				if (c) {
					d = bl(a),
					e = bl(h);
					for (g = 0; d[g]; ++g) bj(d[g], e[g])
				}
			}
			d = e = null;
			return h
		},
		clean: function(a, b, d, e) {
			var g, h, i, j = [];
			b = b || c,
			typeof b.createElement == "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c);
			for (var k = 0,
					l; (l = a[k]) != null; k++) {
				typeof l == "number" && (l += "");
				if (!l) continue;
				if (typeof l == "string") if (!_.test(l)) l = b.createTextNode(l);
				else {
					l = l.replace(Y, "<$1></$2>");
					var m = (Z.exec(l) || ["", ""])[1].toLowerCase(),
					n = bg[m] || bg._default,
					o = n[0],
					p = b.createElement("div"),
					q = bh.childNodes,
					r;
					b === c ? bh.appendChild(p) : U(b).appendChild(p),
							p.innerHTML = n[1] + l + n[2];
					while (o--) p = p.lastChild;
					if (!f.support.tbody) {
						var s = $.test(l),
						t = m === "table" && !s ? p.firstChild && p.firstChild.childNodes: n[1] === "<table>" && !s ? p.childNodes: [];
						for (i = t.length - 1; i >= 0; --i) f.nodeName(t[i], "tbody") && !t[i].childNodes.length && t[i].parentNode.removeChild(t[i])
					} ! f.support.leadingWhitespace && X.test(l) && p.insertBefore(b.createTextNode(X.exec(l)[0]), p.firstChild),
					l = p.childNodes,
					p && (p.parentNode.removeChild(p), q.length > 0 && (r = q[q.length - 1], r && r.parentNode && r.parentNode.removeChild(r)))
				}
				var u;
				if (!f.support.appendChecked) if (l[0] && typeof(u = l.length) == "number") for (i = 0; i < u; i++) bn(l[i]);
				else bn(l);
				l.nodeType ? j.push(l) : j = f.merge(j, l)
			}
			if (d) {
				g = function(a) {
					return ! a.type || be.test(a.type)
				};
				for (k = 0; j[k]; k++) {
					h = j[k];
					if (e && f.nodeName(h, "script") && (!h.type || be.test(h.type))) e.push(h.parentNode ? h.parentNode.removeChild(h) : h);
					else {
						if (h.nodeType === 1) {
							var v = f.grep(h.getElementsByTagName("script"), g);
							j.splice.apply(j, [k + 1, 0].concat(v))
						}
						d.appendChild(h)
					}
				}
			}
			return j
		},
		cleanData: function(a) {
			var b, c, d = f.cache,
			e = f.event.special,
			g = f.support.deleteExpando;
			for (var h = 0,
					i; (i = a[h]) != null; h++) {
				if (i.nodeName && f.noData[i.nodeName.toLowerCase()]) continue;
				c = i[f.expando];
				if (c) {
					b = d[c];
					if (b && b.events) {
						for (var j in b.events) e[j] ? f.event.remove(i, j) : f.removeEvent(i, j, b.handle);
						b.handle && (b.handle.elem = null)
					}
					g ? delete i[f.expando] : i.removeAttribute && i.removeAttribute(f.expando),
							delete d[c]
				}
			}
		}
	});
	var bp = /alpha\([^)]*\)/i,
	bq = /opacity=([^)]*)/,
	br = /([A-Z]|^ms)/g,
	bs = /^[\-+]?(?:\d*\.)?\d+$/i,
	bt = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,
	bu = /^([\-+])=([\-+.\de]+)/,
	bv = /^margin/,
	bw = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
	},
	bx = ["Top", "Right", "Bottom", "Left"],
	by,
	bz,
	bA;
	f.fn.css = function(a, c) {
		return f.access(this,
				function(a, c, d) {
			return d !== b ? f.style(a, c, d) : f.css(a, c)
		},
		a, c, arguments.length > 1)
	},
	f.extend({
		cssHooks: {
			opacity: {
				get: function(a, b) {
					if (b) {
						var c = by(a, "opacity");
						return c === "" ? "1": c
					}
					return a.style.opacity
				}
			}
		},
		cssNumber: {
			fillOpacity: !0,
			fontWeight: !0,
			lineHeight: !0,
			opacity: !0,
			orphans: !0,
			widows: !0,
			zIndex: !0,
			zoom: !0
		},
		cssProps: {
			"float": f.support.cssFloat ? "cssFloat": "styleFloat"
		},
		style: function(a, c, d, e) {
			if ( !! a && a.nodeType !== 3 && a.nodeType !== 8 && !!a.style) {
				var g, h, i = f.camelCase(c),
				j = a.style,
				k = f.cssHooks[i];
				c = f.cssProps[i] || i;
				if (d === b) {
					if (k && "get" in k && (g = k.get(a, !1, e)) !== b) return g;
					return j[c]
				}
				h = typeof d,
				h === "string" && (g = bu.exec(d)) && (d = +(g[1] + 1) * +g[2] + parseFloat(f.css(a, c)), h = "number");
				if (d == null || h === "number" && isNaN(d)) return;
				h === "number" && !f.cssNumber[i] && (d += "px");
				if (!k || !("set" in k) || (d = k.set(a, d)) !== b) try {
					j[c] = d
				} catch(l) {}
			}
		},
		css: function(a, c, d) {
			var e, g;
			c = f.camelCase(c),
			g = f.cssHooks[c],
			c = f.cssProps[c] || c,
			c === "cssFloat" && (c = "float");
			if (g && "get" in g && (e = g.get(a, !0, d)) !== b) return e;
			if (by) return by(a, c)
		},
		swap: function(a, b, c) {
			var d = {},
			e, f;
			for (f in b) d[f] = a.style[f],
			a.style[f] = b[f];
			e = c.call(a);
			for (f in b) a.style[f] = d[f];
			return e
		}
	}),
	f.curCSS = f.css,
	c.defaultView && c.defaultView.getComputedStyle && (bz = function(a, b) {
		var c, d, e, g, h = a.style;
		b = b.replace(br, "-$1").toLowerCase(),
		(d = a.ownerDocument.defaultView) && (e = d.getComputedStyle(a, null)) && (c = e.getPropertyValue(b), c === "" && !f.contains(a.ownerDocument.documentElement, a) && (c = f.style(a, b))),
		!f.support.pixelMargin && e && bv.test(b) && bt.test(c) && (g = h.width, h.width = c, c = e.width, h.width = g);
		return c
	}),
	c.documentElement.currentStyle && (bA = function(a, b) {
		var c, d, e, f = a.currentStyle && a.currentStyle[b],
		g = a.style;
		f == null && g && (e = g[b]) && (f = e),
		bt.test(f) && (c = g.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), g.left = b === "fontSize" ? "1em": f, f = g.pixelLeft + "px", g.left = c, d && (a.runtimeStyle.left = d));
		return f === "" ? "auto": f
	}),
	by = bz || bA,
	f.each(["height", "width"],
			function(a, b) {
		f.cssHooks[b] = {
				get: function(a, c, d) {
					if (c) return a.offsetWidth !== 0 ? bB(a, b, d) : f.swap(a, bw,
							function() {
						return bB(a, b, d)
					})
				},
				set: function(a, b) {
					return bs.test(b) ? b + "px": b
				}
		}
	}),
	f.support.opacity || (f.cssHooks.opacity = {
			get: function(a, b) {
				return bq.test((b && a.currentStyle ? a.currentStyle.filter: a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "": b ? "1": ""
			},
			set: function(a, b) {
				var c = a.style,
				d = a.currentStyle,
				e = f.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")": "",
						g = d && d.filter || c.filter || "";
				c.zoom = 1;
				if (b >= 1 && f.trim(g.replace(bp, "")) === "") {
					c.removeAttribute("filter");
					if (d && !d.filter) return
				}
				c.filter = bp.test(g) ? g.replace(bp, e) : g + " " + e
			}
	}),
	f(function() {
		f.support.reliableMarginRight || (f.cssHooks.marginRight = {
				get: function(a, b) {
					return f.swap(a, {
						display: "inline-block"
					},
					function() {
						return b ? by(a, "margin-right") : a.style.marginRight
					})
				}
		})
	}),
	f.expr && f.expr.filters && (f.expr.filters.hidden = function(a) {
		var b = a.offsetWidth,
		c = a.offsetHeight;
		return b === 0 && c === 0 || !f.support.reliableHiddenOffsets && (a.style && a.style.display || f.css(a, "display")) === "none"
	},
	f.expr.filters.visible = function(a) {
		return ! f.expr.filters.hidden(a)
	}),
	f.each({
		margin: "",
		padding: "",
		border: "Width"
	},
	function(a, b) {
		f.cssHooks[a + b] = {
				expand: function(c) {
					var d, e = typeof c == "string" ? c.split(" ") : [c],
							f = {};
					for (d = 0; d < 4; d++) f[a + bx[d] + b] = e[d] || e[d - 2] || e[0];
					return f
				}
		}
	});
	var bC = /%20/g,
	bD = /\[\]$/,
	bE = /\r?\n/g,
	bF = /#.*$/,
	bG = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
	bH = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
	bI = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
	bJ = /^(?:GET|HEAD)$/,
	bK = /^\/\//,
	bL = /\?/,
	bM = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	bN = /^(?:select|textarea)/i,
	bO = /\s+/,
	bP = /([?&])_=[^&]*/,
	bQ = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
	bR = f.fn.load,
	bS = {},
	bT = {},
	bU, bV, bW = ["*/"] + ["*"];
	try {
		bU = e.href
	} catch(bX) {
		bU = c.createElement("a"),
		bU.href = "",
		bU = bU.href
	}
	bV = bQ.exec(bU.toLowerCase()) || [],
	f.fn.extend({
		load: function(a, c, d) {
			if (typeof a != "string" && bR) return bR.apply(this, arguments);
			if (!this.length) return this;
			var e = a.indexOf(" ");
			if (e >= 0) {
				var g = a.slice(e, a.length);
				a = a.slice(0, e)
			}
			var h = "GET";
			c && (f.isFunction(c) ? (d = c, c = b) : typeof c == "object" && (c = f.param(c, f.ajaxSettings.traditional), h = "POST"));
			var i = this;
			f.ajax({
				url: a,
				type: h,
				dataType: "html",
				data: c,
				complete: function(a, b, c) {
					c = a.responseText,
					a.isResolved() && (a.done(function(a) {
						c = a
					}), i.html(g ? f("<div>").append(c.replace(bM, "")).find(g) : c)),
					d && i.each(d, [c, b, a])
				}
			});
			return this
		},
		serialize: function() {
			return f.param(this.serializeArray())
		},
		serializeArray: function() {
			return this.map(function() {
				return this.elements ? f.makeArray(this.elements) : this
			}).filter(function() {
				return this.name && !this.disabled && (this.checked || bN.test(this.nodeName) || bH.test(this.type))
			}).map(function(a, b) {
				var c = f(this).val();
				return c == null ? null: f.isArray(c) ? f.map(c,
						function(a, c) {
					return {
						name: b.name,
						value: a.replace(bE, "\r\n")
					}
				}) : {
					name: b.name,
					value: c.replace(bE, "\r\n")
				}
			}).get()
		}
	}),
	f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),
			function(a, b) {
		f.fn[b] = function(a) {
			return this.on(b, a)
		}
	}),
	f.each(["get", "post"],
			function(a, c) {
		f[c] = function(a, d, e, g) {
			f.isFunction(d) && (g = g || e, e = d, d = b);
			return f.ajax({
				type: c,
				url: a,
				data: d,
				success: e,
				dataType: g
			})
		}
	}),
	f.extend({
		getScript: function(a, c) {
			return f.get(a, b, c, "script")
		},
		getJSON: function(a, b, c) {
			return f.get(a, b, c, "json")
		},
		ajaxSetup: function(a, b) {
			b ? b$(a, f.ajaxSettings) : (b = a, a = f.ajaxSettings),
					b$(a, b);
			return a
		},
		ajaxSettings: {
			url: bU,
			isLocal: bI.test(bV[1]),
			global: !0,
			type: "GET",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			processData: !0,
			async: !0,
			accepts: {
				xml: "application/xml, text/xml",
				html: "text/html",
				text: "text/plain",
				json: "application/json, text/javascript",
				"*": bW
			},
			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},
			responseFields: {
				xml: "responseXML",
				text: "responseText"
			},
			converters: {
				"* text": a.String,
				"text html": !0,
				"text json": f.parseJSON,
				"text xml": f.parseXML
			},
			flatOptions: {
				context: !0,
				url: !0
			}
		},
		ajaxPrefilter: bY(bS),
		ajaxTransport: bY(bT),
		ajax: function(a, c) {
			function w(a, c, l, m) {
				if (s !== 2) {
					s = 2,
					q && clearTimeout(q),
					p = b,
					n = m || "",
					v.readyState = a > 0 ? 4 : 0;
					var o, r, u, w = c,
					x = l ? ca(d, v, l) : b,
							y,
							z;
					if (a >= 200 && a < 300 || a === 304) {
						if (d.ifModified) {
							if (y = v.getResponseHeader("Last-Modified")) f.lastModified[k] = y;
							if (z = v.getResponseHeader("Etag")) f.etag[k] = z
						}
						if (a === 304) w = "notmodified",
						o = !0;
						else try {
							r = cb(d, x),
							w = "success",
							o = !0
						} catch(A) {
							w = "parsererror",
							u = A
						}
					} else {
						u = w;
						if (!w || a) w = "error",
						a < 0 && (a = 0)
					}
					v.status = a,
					v.statusText = "" + (c || w),
					o ? h.resolveWith(e, [r, w, v]) : h.rejectWith(e, [v, w, u]),
							v.statusCode(j),
							j = b,
							t && g.trigger("ajax" + (o ? "Success": "Error"), [v, d, o ? r: u]),
							i.fireWith(e, [v, w]),
							t && (g.trigger("ajaxComplete", [v, d]), --f.active || f.event.trigger("ajaxStop"))
				}
			}
			typeof a == "object" && (c = a, a = b),
			c = c || {};
			var d = f.ajaxSetup({},
					c),
					e = d.context || d,
					g = e !== d && (e.nodeType || e instanceof f) ? f(e) : f.event,
							h = f.Deferred(),
							i = f.Callbacks("once memory"),
							j = d.statusCode || {},
							k,
							l = {},
							m = {},
							n,
							o,
							p,
							q,
							r,
							s = 0,
							t,
							u,
							v = {
									readyState: 0,
									setRequestHeader: function(a, b) {
										if (!s) {
											var c = a.toLowerCase();
											a = m[c] = m[c] || a,
											l[a] = b
										}
										return this
									},
									getAllResponseHeaders: function() {
										return s === 2 ? n: null
									},
									getResponseHeader: function(a) {
										var c;
										if (s === 2) {
											if (!o) {
												o = {};
												while (c = bG.exec(n)) o[c[1].toLowerCase()] = c[2]
											}
											c = o[a.toLowerCase()]
										}
										return c === b ? null: c
									},
									overrideMimeType: function(a) {
										s || (d.mimeType = a);
										return this
									},
									abort: function(a) {
										a = a || "abort",
										p && p.abort(a),
										w(0, a);
										return this
									}
							};
							h.promise(v),
							v.success = v.done,
							v.error = v.fail,
							v.complete = i.add,
							v.statusCode = function(a) {
								if (a) {
									var b;
									if (s < 2) for (b in a) j[b] = [j[b], a[b]];
									else b = a[v.status],
									v.then(b, b)
								}
								return this
							},
							d.url = ((a || d.url) + "").replace(bF, "").replace(bK, bV[1] + "//"),
							d.dataTypes = f.trim(d.dataType || "*").toLowerCase().split(bO),
							d.crossDomain == null && (r = bQ.exec(d.url.toLowerCase()), d.crossDomain = !(!r || r[1] == bV[1] && r[2] == bV[2] && (r[3] || (r[1] === "http:" ? 80 : 443)) == (bV[3] || (bV[1] === "http:" ? 80 : 443)))),
							d.data && d.processData && typeof d.data != "string" && (d.data = f.param(d.data, d.traditional)),
							bZ(bS, d, c, v);
							if (s === 2) return ! 1;
							t = d.global,
							d.type = d.type.toUpperCase(),
							d.hasContent = !bJ.test(d.type),
							t && f.active++===0 && f.event.trigger("ajaxStart");
							if (!d.hasContent) {
								d.data && (d.url += (bL.test(d.url) ? "&": "?") + d.data, delete d.data),
								k = d.url;
								if (d.cache === !1) {
									var x = f.now(),
									y = d.url.replace(bP, "$1_=" + x);
									d.url = y + (y === d.url ? (bL.test(d.url) ? "&": "?") + "_=" + x: "")
								}
							} (d.data && d.hasContent && d.contentType !== !1 || c.contentType) && v.setRequestHeader("Content-Type", d.contentType),
							d.ifModified && (k = k || d.url, f.lastModified[k] && v.setRequestHeader("If-Modified-Since", f.lastModified[k]), f.etag[k] && v.setRequestHeader("If-None-Match", f.etag[k])),
							v.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + (d.dataTypes[0] !== "*" ? ", " + bW + "; q=0.01": "") : d.accepts["*"]);
							for (u in d.headers) v.setRequestHeader(u, d.headers[u]);
							if (d.beforeSend && (d.beforeSend.call(e, v, d) === !1 || s === 2)) {
								v.abort();
								return ! 1
							}
							for (u in {
								success: 1,
								error: 1,
								complete: 1
							}) v[u](d[u]);
							p = bZ(bT, d, c, v);
							if (!p) w( - 1, "No Transport");
							else {
								v.readyState = 1,
								t && g.trigger("ajaxSend", [v, d]),
								d.async && d.timeout > 0 && (q = setTimeout(function() {
									v.abort("timeout")
								},
								d.timeout));
								try {
									s = 1,
									p.send(l, w)
								} catch(z) {
									if (s < 2) w( - 1, z);
									else throw z
								}
							}
							return v
		},
		param: function(a, c) {
			var d = [],
			e = function(a, b) {
				b = f.isFunction(b) ? b() : b,
						d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
			};
			c === b && (c = f.ajaxSettings.traditional);
			if (f.isArray(a) || a.jquery && !f.isPlainObject(a)) f.each(a,
					function() {
				e(this.name, this.value)
			});
			else for (var g in a) b_(g, a[g], c, e);
			return d.join("&").replace(bC, "+")
		}
	}),
	f.extend({
		active: 0,
		lastModified: {},
		etag: {}
	});
	var cc = f.now(),
	cd = /(\=)\?(&|$)|\?\?/i;
	f.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			return f.expando + "_" + cc++
		}
	}),
	f.ajaxPrefilter("json jsonp",
			function(b, c, d) {
		var e = typeof b.data == "string" && /^application\/x\-www\-form\-urlencoded/.test(b.contentType);
		if (b.dataTypes[0] === "jsonp" || b.jsonp !== !1 && (cd.test(b.url) || e && cd.test(b.data))) {
			var g, h = b.jsonpCallback = f.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback,
					i = a[h],
					j = b.url,
					k = b.data,
					l = "$1" + h + "$2";
			b.jsonp !== !1 && (j = j.replace(cd, l), b.url === j && (e && (k = k.replace(cd, l)), b.data === k && (j += (/\?/.test(j) ? "&": "?") + b.jsonp + "=" + h))),
			b.url = j,
			b.data = k,
			a[h] = function(a) {
				g = [a]
			},
			d.always(function() {
				a[h] = i,
				g && f.isFunction(i) && a[h](g[0])
			}),
			b.converters["script json"] = function() {
				g || f.error(h + " was not called");
				return g[0]
			},
			b.dataTypes[0] = "json";
			return "script"
		}
	}),
	f.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /javascript|ecmascript/
		},
		converters: {
			"text script": function(a) {
				f.globalEval(a);
				return a
			}
		}
	}),
	f.ajaxPrefilter("script",
			function(a) {
		a.cache === b && (a.cache = !1),
		a.crossDomain && (a.type = "GET", a.global = !1)
	}),
	f.ajaxTransport("script",
			function(a) {
		if (a.crossDomain) {
			var d, e = c.head || c.getElementsByTagName("head")[0] || c.documentElement;
			return {
				send: function(f, g) {
					d = c.createElement("script"),
					d.async = "async",
					a.scriptCharset && (d.charset = a.scriptCharset),
					d.src = a.url,
					d.onload = d.onreadystatechange = function(a, c) {
						if (c || !d.readyState || /loaded|complete/.test(d.readyState)) d.onload = d.onreadystatechange = null,
						e && d.parentNode && e.removeChild(d),
						d = b,
						c || g(200, "success")
					},
					e.insertBefore(d, e.firstChild)
				},
				abort: function() {
					d && d.onload(0, 1)
				}
			}
		}
	});
	var ce = a.ActiveXObject ?
			function() {
		for (var a in cg) cg[a](0, 1)
	}: !1,
	cf = 0,
	cg;
		f.ajaxSettings.xhr = a.ActiveXObject ?
				function() {
			return ! this.isLocal && ch() || ci()
		}: ch,
		function(a) {
			f.extend(f.support, {
				ajax: !!a,
				cors: !!a && "withCredentials" in a
			})
		} (f.ajaxSettings.xhr()),
		f.support.ajax && f.ajaxTransport(function(c) {
			if (!c.crossDomain || f.support.cors) {
				var d;
				return {
					send: function(e, g) {
						var h = c.xhr(),
						i,
						j;
						c.username ? h.open(c.type, c.url, c.async, c.username, c.password) : h.open(c.type, c.url, c.async);
						if (c.xhrFields) for (j in c.xhrFields) h[j] = c.xhrFields[j];
						c.mimeType && h.overrideMimeType && h.overrideMimeType(c.mimeType),
						!c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
						try {
							for (j in e) h.setRequestHeader(j, e[j])
						} catch(k) {}
						h.send(c.hasContent && c.data || null),
						d = function(a, e) {
							var j, k, l, m, n;
							try {
								if (d && (e || h.readyState === 4)) {
									d = b,
									i && (h.onreadystatechange = f.noop, ce && delete cg[i]);
									if (e) h.readyState !== 4 && h.abort();
									else {
										j = h.status,
										l = h.getAllResponseHeaders(),
										m = {},
										n = h.responseXML,
										n && n.documentElement && (m.xml = n);
										try {
											m.text = h.responseText
										} catch(a) {}
										try {
											k = h.statusText
										} catch(o) {
											k = ""
										} ! j && c.isLocal && !c.crossDomain ? j = m.text ? 200 : 404 : j === 1223 && (j = 204)
									}
								}
							} catch(p) {
								e || g( - 1, p)
							}
							m && g(j, k, m, l)
						},
						!c.async || h.readyState === 4 ? d() : (i = ++cf, ce && (cg || (cg = {},
								f(a).unload(ce)), cg[i] = d), h.onreadystatechange = d)
					},
					abort: function() {
						d && d(0, 1)
					}
				}
			}
		});
		var cj = {},
		ck, cl, cm = /^(?:toggle|show|hide)$/,
		cn = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
		co, cp = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]],
		cq;
		f.fn.extend({
			show: function(a, b, c) {
				var d, e;
				if (a || a === 0) return this.animate(ct("show", 3), a, b, c);
				for (var g = 0,
						h = this.length; g < h; g++) d = this[g],
						d.style && (e = d.style.display, !f._data(d, "olddisplay") && e === "none" && (e = d.style.display = ""), (e === "" && f.css(d, "display") === "none" || !f.contains(d.ownerDocument.documentElement, d)) && f._data(d, "olddisplay", cu(d.nodeName)));
				for (g = 0; g < h; g++) {
					d = this[g];
					if (d.style) {
						e = d.style.display;
						if (e === "" || e === "none") d.style.display = f._data(d, "olddisplay") || ""
					}
				}
				return this
			},
			hide: function(a, b, c) {
				if (a || a === 0) return this.animate(ct("hide", 3), a, b, c);
				var d, e, g = 0,
				h = this.length;
				for (; g < h; g++) d = this[g],
				d.style && (e = f.css(d, "display"), e !== "none" && !f._data(d, "olddisplay") && f._data(d, "olddisplay", e));
				for (g = 0; g < h; g++) this[g].style && (this[g].style.display = "none");
				return this
			},
			_toggle: f.fn.toggle,
			toggle: function(a, b, c) {
				var d = typeof a == "boolean";
				f.isFunction(a) && f.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || d ? this.each(function() {
					var b = d ? a: f(this).is(":hidden");
					f(this)[b ? "show": "hide"]()
				}) : this.animate(ct("toggle", 3), a, b, c);
				return this
			},
			fadeTo: function(a, b, c, d) {
				return this.filter(":hidden").css("opacity", 0).show().end().animate({
					opacity: b
				},
				a, c, d)
			},
			animate: function(a, b, c, d) {
				function g() {
					e.queue === !1 && f._mark(this);
					var b = f.extend({},
							e),
							c = this.nodeType === 1,
							d = c && f(this).is(":hidden"),
							g,
							h,
							i,
							j,
							k,
							l,
							m,
							n,
							o,
							p,
							q;
					b.animatedProperties = {};
					for (i in a) {
						g = f.camelCase(i),
						i !== g && (a[g] = a[i], delete a[i]);
						if ((k = f.cssHooks[g]) && "expand" in k) {
							l = k.expand(a[g]),
							delete a[g];
							for (i in l) i in a || (a[i] = l[i])
						}
					}
					for (g in a) {
						h = a[g],
						f.isArray(h) ? (b.animatedProperties[g] = h[1], h = a[g] = h[0]) : b.animatedProperties[g] = b.specialEasing && b.specialEasing[g] || b.easing || "swing";
						if (h === "hide" && d || h === "show" && !d) return b.complete.call(this);
						c && (g === "height" || g === "width") && (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], f.css(this, "display") === "inline" && f.css(this, "float") === "none" && (!f.support.inlineBlockNeedsLayout || cu(this.nodeName) === "inline" ? this.style.display = "inline-block": this.style.zoom = 1))
					}
					b.overflow != null && (this.style.overflow = "hidden");
					for (i in a) j = new f.fx(this, b, i),
					h = a[i],
					cm.test(h) ? (q = f._data(this, "toggle" + i) || (h === "toggle" ? d ? "show": "hide": 0), q ? (f._data(this, "toggle" + i, q === "show" ? "hide": "show"), j[q]()) : j[h]()) : (m = cn.exec(h), n = j.cur(), m ? (o = parseFloat(m[2]), p = m[3] || (f.cssNumber[i] ? "": "px"), p !== "px" && (f.style(this, i, (o || 1) + p), n = (o || 1) / j.cur() * n, f.style(this, i, n + p)), m[1] && (o = (m[1] === "-=" ? -1 : 1) * o + n), j.custom(n, o, p)) : j.custom(n, h, ""));
					return ! 0
				}
				var e = f.speed(b, c, d);
				if (f.isEmptyObject(a)) return this.each(e.complete, [!1]);
				a = f.extend({},
						a);
				return e.queue === !1 ? this.each(g) : this.queue(e.queue, g)
			},
			stop: function(a, c, d) {
				typeof a != "string" && (d = c, c = a, a = b),
				c && a !== !1 && this.queue(a || "fx", []);
				return this.each(function() {
					function h(a, b, c) {
						var e = b[c];
						f.removeData(a, c, !0),
						e.stop(d)
					}
					var b, c = !1,
					e = f.timers,
					g = f._data(this);
					d || f._unmark(!0, this);
					if (a == null) for (b in g) g[b] && g[b].stop && b.indexOf(".run") === b.length - 4 && h(this, g, b);
					else g[b = a + ".run"] && g[b].stop && h(this, g, b);
					for (b = e.length; b--;) e[b].elem === this && (a == null || e[b].queue === a) && (d ? e[b](!0) : e[b].saveState(), c = !0, e.splice(b, 1)); (!d || !c) && f.dequeue(this, a)
				})
			}
		}),
		f.each({
			slideDown: ct("show", 1),
			slideUp: ct("hide", 1),
			slideToggle: ct("toggle", 1),
			fadeIn: {
				opacity: "show"
			},
			fadeOut: {
				opacity: "hide"
			},
			fadeToggle: {
				opacity: "toggle"
			}
		},
		function(a, b) {
			f.fn[a] = function(a, c, d) {
				return this.animate(b, a, c, d)
			}
		}),
		f.extend({
			speed: function(a, b, c) {
				var d = a && typeof a == "object" ? f.extend({},
						a) : {
							complete: c || !c && b || f.isFunction(a) && a,
							duration: a,
							easing: c && b || b && !f.isFunction(b) && b
						};
						d.duration = f.fx.off ? 0 : typeof d.duration == "number" ? d.duration: d.duration in f.fx.speeds ? f.fx.speeds[d.duration] : f.fx.speeds._default;
						if (d.queue == null || d.queue === !0) d.queue = "fx";
						d.old = d.complete,
						d.complete = function(a) {
							f.isFunction(d.old) && d.old.call(this),
							d.queue ? f.dequeue(this, d.queue) : a !== !1 && f._unmark(this)
						};
						return d
			},
			easing: {
				linear: function(a) {
					return a
				},
				swing: function(a) {
					return - Math.cos(a * Math.PI) / 2 + .5
				}
			},
			timers: [],
			fx: function(a, b, c) {
				this.options = b,
				this.elem = a,
				this.prop = c,
				b.orig = b.orig || {}
			}
		}),
		f.fx.prototype = {
			update: function() {
				this.options.step && this.options.step.call(this.elem, this.now, this),
				(f.fx.step[this.prop] || f.fx.step._default)(this)
			},
			cur: function() {
				if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) return this.elem[this.prop];
				var a, b = f.css(this.elem, this.prop);
				return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b: a
			},
			custom: function(a, c, d) {
				function h(a) {
					return e.step(a)
				}
				var e = this,
				g = f.fx;
				this.startTime = cq || cr(),
				this.end = c,
				this.now = this.start = a,
				this.pos = this.state = 0,
				this.unit = d || this.unit || (f.cssNumber[this.prop] ? "": "px"),
				h.queue = this.options.queue,
				h.elem = this.elem,
				h.saveState = function() {
					f._data(e.elem, "fxshow" + e.prop) === b && (e.options.hide ? f._data(e.elem, "fxshow" + e.prop, e.start) : e.options.show && f._data(e.elem, "fxshow" + e.prop, e.end))
				},
				h() && f.timers.push(h) && !co && (co = setInterval(g.tick, g.interval))
			},
			show: function() {
				var a = f._data(this.elem, "fxshow" + this.prop);
				this.options.orig[this.prop] = a || f.style(this.elem, this.prop),
				this.options.show = !0,
				a !== b ? this.custom(this.cur(), a) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()),
						f(this.elem).show()
			},
			hide: function() {
				this.options.orig[this.prop] = f._data(this.elem, "fxshow" + this.prop) || f.style(this.elem, this.prop),
				this.options.hide = !0,
				this.custom(this.cur(), 0)
			},
			step: function(a) {
				var b, c, d, e = cq || cr(),
				g = !0,
				h = this.elem,
				i = this.options;
				if (a || e >= i.duration + this.startTime) {
					this.now = this.end,
					this.pos = this.state = 1,
					this.update(),
					i.animatedProperties[this.prop] = !0;
					for (b in i.animatedProperties) i.animatedProperties[b] !== !0 && (g = !1);
					if (g) {
						i.overflow != null && !f.support.shrinkWrapBlocks && f.each(["", "X", "Y"],
								function(a, b) {
							h.style["overflow" + b] = i.overflow[a]
						}),
						i.hide && f(h).hide();
						if (i.hide || i.show) for (b in i.animatedProperties) f.style(h, b, i.orig[b]),
						f.removeData(h, "fxshow" + b, !0),
						f.removeData(h, "toggle" + b, !0);
						d = i.complete,
						d && (i.complete = !1, d.call(h))
					}
					return ! 1
				}
				i.duration == Infinity ? this.now = e: (c = e - this.startTime, this.state = c / i.duration, this.pos = f.easing[i.animatedProperties[this.prop]](this.state, c, 0, 1, i.duration), this.now = this.start + (this.end - this.start) * this.pos),
						this.update();
				return ! 0
			}
		},
		f.extend(f.fx, {
			tick: function() {
				var a, b = f.timers,
				c = 0;
				for (; c < b.length; c++) a = b[c],
				!a() && b[c] === a && b.splice(c--, 1);
				b.length || f.fx.stop()
			},
			interval: 13,
			stop: function() {
				clearInterval(co),
				co = null
			},
			speeds: {
				slow: 600,
				fast: 200,
				_default: 400
			},
			step: {
				opacity: function(a) {
					f.style(a.elem, "opacity", a.now)
				},
				_default: function(a) {
					a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = a.now + a.unit: a.elem[a.prop] = a.now
				}
			}
		}),
		f.each(cp.concat.apply([], cp),
				function(a, b) {
			b.indexOf("margin") && (f.fx.step[b] = function(a) {
				f.style(a.elem, b, Math.max(0, a.now) + a.unit)
			})
		}),
		f.expr && f.expr.filters && (f.expr.filters.animated = function(a) {
			return f.grep(f.timers,
					function(b) {
				return a === b.elem
			}).length
		});
		var cv, cw = /^t(?:able|d|h)$/i,
		cx = /^(?:body|html)$/i;
		"getBoundingClientRect" in c.documentElement ? cv = function(a, b, c, d) {
			try {
				d = a.getBoundingClientRect()
			} catch(e) {}
			if (!d || !f.contains(c, a)) return d ? {
				top: d.top,
				left: d.left
			}: {
				top: 0,
				left: 0
			};
			var g = b.body,
			h = cy(b),
			i = c.clientTop || g.clientTop || 0,
			j = c.clientLeft || g.clientLeft || 0,
			k = h.pageYOffset || f.support.boxModel && c.scrollTop || g.scrollTop,
			l = h.pageXOffset || f.support.boxModel && c.scrollLeft || g.scrollLeft,
			m = d.top + k - i,
			n = d.left + l - j;
			return {
				top: m,
				left: n
			}
		}: cv = function(a, b, c) {
			var d, e = a.offsetParent,
			g = a,
			h = b.body,
			i = b.defaultView,
			j = i ? i.getComputedStyle(a, null) : a.currentStyle,
					k = a.offsetTop,
					l = a.offsetLeft;
			while ((a = a.parentNode) && a !== h && a !== c) {
				if (f.support.fixedPosition && j.position === "fixed") break;
				d = i ? i.getComputedStyle(a, null) : a.currentStyle,
						k -= a.scrollTop,
						l -= a.scrollLeft,
						a === e && (k += a.offsetTop, l += a.offsetLeft, f.support.doesNotAddBorder && (!f.support.doesAddBorderForTableAndCells || !cw.test(a.nodeName)) && (k += parseFloat(d.borderTopWidth) || 0, l += parseFloat(d.borderLeftWidth) || 0), g = e, e = a.offsetParent),
						f.support.subtractsBorderForOverflowNotVisible && d.overflow !== "visible" && (k += parseFloat(d.borderTopWidth) || 0, l += parseFloat(d.borderLeftWidth) || 0),
						j = d
			}
			if (j.position === "relative" || j.position === "static") k += h.offsetTop,
			l += h.offsetLeft;
			f.support.fixedPosition && j.position === "fixed" && (k += Math.max(c.scrollTop, h.scrollTop), l += Math.max(c.scrollLeft, h.scrollLeft));
			return {
				top: k,
				left: l
			}
		},
		f.fn.offset = function(a) {
			if (arguments.length) return a === b ? this: this.each(function(b) {
				f.offset.setOffset(this, a, b)
			});
			var c = this[0],
			d = c && c.ownerDocument;
			if (!d) return null;
			if (c === d.body) return f.offset.bodyOffset(c);
			return cv(c, d, d.documentElement)
		},
		f.offset = {
				bodyOffset: function(a) {
					var b = a.offsetTop,
					c = a.offsetLeft;
					f.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(f.css(a, "marginTop")) || 0, c += parseFloat(f.css(a, "marginLeft")) || 0);
					return {
						top: b,
						left: c
					}
				},
				setOffset: function(a, b, c) {
					var d = f.css(a, "position");
					d === "static" && (a.style.position = "relative");
					var e = f(a),
					g = e.offset(),
					h = f.css(a, "top"),
					i = f.css(a, "left"),
					j = (d === "absolute" || d === "fixed") && f.inArray("auto", [h, i]) > -1,
					k = {},
					l = {},
					m,
					n;
					j ? (l = e.position(), m = l.top, n = l.left) : (m = parseFloat(h) || 0, n = parseFloat(i) || 0),
							f.isFunction(b) && (b = b.call(a, c, g)),
							b.top != null && (k.top = b.top - g.top + m),
							b.left != null && (k.left = b.left - g.left + n),
							"using" in b ? b.using.call(a, k) : e.css(k)
				}
		},
		f.fn.extend({
			position: function() {
				if (!this[0]) return null;
				var a = this[0],
				b = this.offsetParent(),
				c = this.offset(),
				d = cx.test(b[0].nodeName) ? {
					top: 0,
					left: 0
				}: b.offset();
				c.top -= parseFloat(f.css(a, "marginTop")) || 0,
				c.left -= parseFloat(f.css(a, "marginLeft")) || 0,
				d.top += parseFloat(f.css(b[0], "borderTopWidth")) || 0,
				d.left += parseFloat(f.css(b[0], "borderLeftWidth")) || 0;
				return {
					top: c.top - d.top,
					left: c.left - d.left
				}
			},
			offsetParent: function() {
				return this.map(function() {
					var a = this.offsetParent || c.body;
					while (a && !cx.test(a.nodeName) && f.css(a, "position") === "static") a = a.offsetParent;
					return a
				})
			}
		}),
		f.each({
			scrollLeft: "pageXOffset",
			scrollTop: "pageYOffset"
		},
		function(a, c) {
			var d = /Y/.test(c);
			f.fn[a] = function(e) {
				return f.access(this,
						function(a, e, g) {
					var h = cy(a);
					if (g === b) return h ? c in h ? h[c] : f.support.boxModel && h.document.documentElement[e] || h.document.body[e] : a[e];
					h ? h.scrollTo(d ? f(h).scrollLeft() : g, d ? g: f(h).scrollTop()) : a[e] = g
				},
				a, e, arguments.length, null)
			}
		}),
		f.each({
			Height: "height",
			Width: "width"
		},
		function(a, c) {
			var d = "client" + a,
			e = "scroll" + a,
			g = "offset" + a;
			f.fn["inner" + a] = function() {
				var a = this[0];
				return a ? a.style ? parseFloat(f.css(a, c, "padding")) : this[c]() : null
			},
			f.fn["outer" + a] = function(a) {
				var b = this[0];
				return b ? b.style ? parseFloat(f.css(b, c, a ? "margin": "border")) : this[c]() : null
			},
			f.fn[c] = function(a) {
				return f.access(this,
						function(a, c, h) {
					var i, j, k, l;
					if (f.isWindow(a)) {
						i = a.document,
						j = i.documentElement[d];
						return f.support.boxModel && j || i.body && i.body[d] || j
					}
					if (a.nodeType === 9) {
						i = a.documentElement;
						if (i[d] >= i[e]) return i[d];
						return Math.max(a.body[e], i[e], a.body[g], i[g])
					}
					if (h === b) {
						k = f.css(a, c),
						l = parseFloat(k);
						return f.isNumeric(l) ? l: k
					}
					f(a).css(c, h)
				},
				c, a, arguments.length, null)
			}
		}),
		a.jQuery = a.$ = f,
		typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [],
				function() {
			return f
		})
})(window);
/*! jQuery UI - v1.8.21 - 2012-06-05
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.core.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
	function c(b, c) {
		var e = b.nodeName.toLowerCase();
		if ("area" === e) {
			var f = b.parentNode,
			g = f.name,
			h;
			return ! b.href || !g || f.nodeName.toLowerCase() !== "map" ? !1 : (h = a("img[usemap=#" + g + "]")[0], !!h && d(h))
		}
		return (/input|select|textarea|button|object/.test(e) ? !b.disabled: "a" == e ? b.href || c: c) && d(b)
	}
	function d(b) {
		return ! a(b).parents().andSelf().filter(function() {
			return a.curCSS(this, "visibility") === "hidden" || a.expr.filters.hidden(this)
		}).length
	}
	a.ui = a.ui || {};
	if (a.ui.version) return;
	a.extend(a.ui, {
		version: "1.8.21",
		keyCode: {
			ALT: 18,
			BACKSPACE: 8,
			CAPS_LOCK: 20,
			COMMA: 188,
			COMMAND: 91,
			COMMAND_LEFT: 91,
			COMMAND_RIGHT: 93,
			CONTROL: 17,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			INSERT: 45,
			LEFT: 37,
			MENU: 93,
			NUMPAD_ADD: 107,
			NUMPAD_DECIMAL: 110,
			NUMPAD_DIVIDE: 111,
			NUMPAD_ENTER: 108,
			NUMPAD_MULTIPLY: 106,
			NUMPAD_SUBTRACT: 109,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SHIFT: 16,
			SPACE: 32,
			TAB: 9,
			UP: 38,
			WINDOWS: 91
		}
	}),
	a.fn.extend({
		propAttr: a.fn.prop || a.fn.attr,
		_focus: a.fn.focus,
		focus: function(b, c) {
			return typeof b == "number" ? this.each(function() {
				var d = this;
				setTimeout(function() {
					a(d).focus(),
					c && c.call(d)
				},
				b)
			}) : this._focus.apply(this, arguments)
		},
		scrollParent: function() {
			var b;
			return a.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? b = this.parents().filter(function() {
				return /(relative|absolute|fixed)/.test(a.curCSS(this, "position", 1)) && /(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
			}).eq(0) : b = this.parents().filter(function() {
				return /(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
			}).eq(0),
			/fixed/.test(this.css("position")) || !b.length ? a(document) : b
		},
		zIndex: function(c) {
			if (c !== b) return this.css("zIndex", c);
			if (this.length) {
				var d = a(this[0]),
				e,
				f;
				while (d.length && d[0] !== document) {
					e = d.css("position");
					if (e === "absolute" || e === "relative" || e === "fixed") {
						f = parseInt(d.css("zIndex"), 10);
						if (!isNaN(f) && f !== 0) return f
					}
					d = d.parent()
				}
			}
			return 0
		},
		disableSelection: function() {
			return this.bind((a.support.selectstart ? "selectstart": "mousedown") + ".ui-disableSelection",
					function(a) {
				a.preventDefault()
			})
		},
		enableSelection: function() {
			return this.unbind(".ui-disableSelection")
		}
	}),
	a.each(["Width", "Height"],
			function(c, d) {
		function h(b, c, d, f) {
			return a.each(e,
					function() {
				c -= parseFloat(a.curCSS(b, "padding" + this, !0)) || 0,
				d && (c -= parseFloat(a.curCSS(b, "border" + this + "Width", !0)) || 0),
				f && (c -= parseFloat(a.curCSS(b, "margin" + this, !0)) || 0)
			}),
			c
		}
		var e = d === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
				f = d.toLowerCase(),
				g = {
				innerWidth: a.fn.innerWidth,
				innerHeight: a.fn.innerHeight,
				outerWidth: a.fn.outerWidth,
				outerHeight: a.fn.outerHeight
		};
		a.fn["inner" + d] = function(c) {
			return c === b ? g["inner" + d].call(this) : this.each(function() {
				a(this).css(f, h(this, c) + "px")
			})
		},
		a.fn["outer" + d] = function(b, c) {
			return typeof b != "number" ? g["outer" + d].call(this, b) : this.each(function() {
				a(this).css(f, h(this, b, !0, c) + "px")
			})
		}
	}),
	a.extend(a.expr[":"], {
		data: function(b, c, d) {
			return !! a.data(b, d[3])
		},
		focusable: function(b) {
			return c(b, !isNaN(a.attr(b, "tabindex")))
		},
		tabbable: function(b) {
			var d = a.attr(b, "tabindex"),
			e = isNaN(d);
			return (e || d >= 0) && c(b, !e)
		}
	}),
	a(function() {
		var b = document.body,
		c = b.appendChild(c = document.createElement("div"));
		c.offsetHeight,
		a.extend(c.style, {
			minHeight: "100px",
			height: "auto",
			padding: 0,
			borderWidth: 0
		}),
		a.support.minHeight = c.offsetHeight === 100,
		a.support.selectstart = "onselectstart" in c,
		b.removeChild(c).style.display = "none"
	}),
	a.extend(a.ui, {
		plugin: {
			add: function(b, c, d) {
				var e = a.ui[b].prototype;
				for (var f in d) e.plugins[f] = e.plugins[f] || [],
				e.plugins[f].push([c, d[f]])
			},
			call: function(a, b, c) {
				var d = a.plugins[b];
				if (!d || !a.element[0].parentNode) return;
				for (var e = 0; e < d.length; e++) a.options[d[e][0]] && d[e][1].apply(a.element, c)
			}
		},
		contains: function(a, b) {
			return document.compareDocumentPosition ? a.compareDocumentPosition(b) & 16 : a !== b && a.contains(b)
		},
		hasScroll: function(b, c) {
			if (a(b).css("overflow") === "hidden") return ! 1;
			var d = c && c === "left" ? "scrollLeft": "scrollTop",
					e = !1;
			return b[d] > 0 ? !0 : (b[d] = 1, e = b[d] > 0, b[d] = 0, e)
		},
		isOverAxis: function(a, b, c) {
			return a > b && a < b + c
		},
		isOver: function(b, c, d, e, f, g) {
			return a.ui.isOverAxis(b, d, f) && a.ui.isOverAxis(c, e, g)
		}
	})
})(jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.widget.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
	if (a.cleanData) {
		var c = a.cleanData;
		a.cleanData = function(b) {
			for (var d = 0,
					e; (e = b[d]) != null; d++) try {
						a(e).triggerHandler("remove")
					} catch(f) {}
					c(b)
		}
	} else {
		var d = a.fn.remove;
		a.fn.remove = function(b, c) {
			return this.each(function() {
				return c || (!b || a.filter(b, [this]).length) && a("*", this).add([this]).each(function() {
					try {
						a(this).triggerHandler("remove")
					} catch(b) {}
				}),
				d.call(a(this), b, c)
			})
		}
	}
	a.widget = function(b, c, d) {
		var e = b.split(".")[0],
		f;
		b = b.split(".")[1],
		f = e + "-" + b,
		d || (d = c, c = a.Widget),
		a.expr[":"][f] = function(c) {
			return !! a.data(c, b)
		},
		a[e] = a[e] || {},
		a[e][b] = function(a, b) {
			arguments.length && this._createWidget(a, b)
		};
		var g = new c;
		g.options = a.extend(!0, {},
				g.options),
				a[e][b].prototype = a.extend(!0, g, {
					namespace: e,
					widgetName: b,
					widgetEventPrefix: a[e][b].prototype.widgetEventPrefix || b,
					widgetBaseClass: f
				},
				d),
				a.widget.bridge(b, a[e][b])
	},
	a.widget.bridge = function(c, d) {
		a.fn[c] = function(e) {
			var f = typeof e == "string",
			g = Array.prototype.slice.call(arguments, 1),
			h = this;
			return e = !f && g.length ? a.extend.apply(null, [!0, e].concat(g)) : e,
					f && e.charAt(0) === "_" ? h: (f ? this.each(function() {
						var d = a.data(this, c),
						f = d && a.isFunction(d[e]) ? d[e].apply(d, g) : d;
						if (f !== d && f !== b) return h = f,
						!1
					}) : this.each(function() {
						var b = a.data(this, c);
						b ? b.option(e || {})._init() : a.data(this, c, new d(e, this))
					}), h)
		}
	},
	a.Widget = function(a, b) {
		arguments.length && this._createWidget(a, b)
	},
	a.Widget.prototype = {
			widgetName: "widget",
			widgetEventPrefix: "",
			options: {
				disabled: !1
			},
			_createWidget: function(b, c) {
				a.data(c, this.widgetName, this),
				this.element = a(c),
				this.options = a.extend(!0, {},
						this.options, this._getCreateOptions(), b);
				var d = this;
				this.element.bind("remove." + this.widgetName,
						function() {
					d.destroy()
				}),
				this._create(),
				this._trigger("create"),
				this._init()
			},
			_getCreateOptions: function() {
				return a.metadata && a.metadata.get(this.element[0])[this.widgetName]
			},
			_create: function() {},
			_init: function() {},
			destroy: function() {
				this.element.unbind("." + this.widgetName).removeData(this.widgetName),
				this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled " + "ui-state-disabled")
			},
			widget: function() {
				return this.element
			},
			option: function(c, d) {
				var e = c;
				if (arguments.length === 0) return a.extend({},
						this.options);
				if (typeof c == "string") {
					if (d === b) return this.options[c];
					e = {},
					e[c] = d
				}
				return this._setOptions(e),
				this
			},
			_setOptions: function(b) {
				var c = this;
				return a.each(b,
						function(a, b) {
					c._setOption(a, b)
				}),
				this
			},
			_setOption: function(a, b) {
				return this.options[a] = b,
				a === "disabled" && this.widget()[b ? "addClass": "removeClass"](this.widgetBaseClass + "-disabled" + " " + "ui-state-disabled").attr("aria-disabled", b),
				this
			},
			enable: function() {
				return this._setOption("disabled", !1)
			},
			disable: function() {
				return this._setOption("disabled", !0)
			},
			_trigger: function(b, c, d) {
				var e, f, g = this.options[b];
				d = d || {},
				c = a.Event(c),
				c.type = (b === this.widgetEventPrefix ? b: this.widgetEventPrefix + b).toLowerCase(),
				c.target = this.element[0],
				f = c.originalEvent;
				if (f) for (e in f) e in c || (c[e] = f[e]);
				return this.element.trigger(c, d),
				!(a.isFunction(g) && g.call(this.element[0], c, d) === !1 || c.isDefaultPrevented())
			}
	}
})(jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.mouse.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
	var c = !1;
	a(document).mouseup(function(a) {
		c = !1
	}),
	a.widget("ui.mouse", {
		options: {
			cancel: ":input,option",
			distance: 1,
			delay: 0
		},
		_mouseInit: function() {
			var b = this;
			this.element.bind("mousedown." + this.widgetName,
					function(a) {
				return b._mouseDown(a)
			}).bind("click." + this.widgetName,
					function(c) {
				if (!0 === a.data(c.target, b.widgetName + ".preventClickEvent")) return a.removeData(c.target, b.widgetName + ".preventClickEvent"),
				c.stopImmediatePropagation(),
				!1
			}),
			this.started = !1
		},
		_mouseDestroy: function() {
			this.element.unbind("." + this.widgetName),
			a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
		},
		_mouseDown: function(b) {
			if (c) return;
			this._mouseStarted && this._mouseUp(b),
			this._mouseDownEvent = b;
			var d = this,
			e = b.which == 1,
			f = typeof this.options.cancel == "string" && b.target.nodeName ? a(b.target).closest(this.options.cancel).length: !1;
			if (!e || f || !this._mouseCapture(b)) return ! 0;
			this.mouseDelayMet = !this.options.delay,
			this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
				d.mouseDelayMet = !0
			},
			this.options.delay));
			if (this._mouseDistanceMet(b) && this._mouseDelayMet(b)) {
				this._mouseStarted = this._mouseStart(b) !== !1;
				if (!this._mouseStarted) return b.preventDefault(),
				!0
			}
			return ! 0 === a.data(b.target, this.widgetName + ".preventClickEvent") && a.removeData(b.target, this.widgetName + ".preventClickEvent"),
			this._mouseMoveDelegate = function(a) {
				return d._mouseMove(a)
			},
			this._mouseUpDelegate = function(a) {
				return d._mouseUp(a)
			},
			a(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate),
			b.preventDefault(),
			c = !0,
			!0
		},
		_mouseMove: function(b) {
			return ! a.browser.msie || document.documentMode >= 9 || !!b.button ? this._mouseStarted ? (this._mouseDrag(b), b.preventDefault()) : (this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, b) !== !1, this._mouseStarted ? this._mouseDrag(b) : this._mouseUp(b)), !this._mouseStarted) : this._mouseUp(b)
		},
		_mouseUp: function(b) {
			return a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate),
			this._mouseStarted && (this._mouseStarted = !1, b.target == this._mouseDownEvent.target && a.data(b.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(b)),
			!1
		},
		_mouseDistanceMet: function(a) {
			return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance
		},
		_mouseDelayMet: function(a) {
			return this.mouseDelayMet
		},
		_mouseStart: function(a) {},
		_mouseDrag: function(a) {},
		_mouseStop: function(a) {},
		_mouseCapture: function(a) {
			return ! 0
		}
	})
})(jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.position.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
	a.ui = a.ui || {};
	var c = /left|center|right/,
	d = /top|center|bottom/,
	e = "center",
	f = {},
	g = a.fn.position,
	h = a.fn.offset;
	a.fn.position = function(b) {
		if (!b || !b.of) return g.apply(this, arguments);
		b = a.extend({},
				b);
		var h = a(b.of),
		i = h[0],
		j = (b.collision || "flip").split(" "),
		k = b.offset ? b.offset.split(" ") : [0, 0],
				l,
				m,
				n;
		return i.nodeType === 9 ? (l = h.width(), m = h.height(), n = {
			top: 0,
			left: 0
		}) : i.setTimeout ? (l = h.width(), m = h.height(), n = {
			top: h.scrollTop(),
			left: h.scrollLeft()
		}) : i.preventDefault ? (b.at = "left top", l = m = 0, n = {
				top: b.of.pageY,
				left: b.of.pageX
		}) : (l = h.outerWidth(), m = h.outerHeight(), n = h.offset()),
		a.each(["my", "at"],
				function() {
			var a = (b[this] || "").split(" ");
			a.length === 1 && (a = c.test(a[0]) ? a.concat([e]) : d.test(a[0]) ? [e].concat(a) : [e, e]),
			a[0] = c.test(a[0]) ? a[0] : e,
					a[1] = d.test(a[1]) ? a[1] : e,
							b[this] = a
		}),
		j.length === 1 && (j[1] = j[0]),
		k[0] = parseInt(k[0], 10) || 0,
		k.length === 1 && (k[1] = k[0]),
		k[1] = parseInt(k[1], 10) || 0,
		b.at[0] === "right" ? n.left += l: b.at[0] === e && (n.left += l / 2),
				b.at[1] === "bottom" ? n.top += m: b.at[1] === e && (n.top += m / 2),
						n.left += k[0],
						n.top += k[1],
						this.each(function() {
							var c = a(this),
							d = c.outerWidth(),
							g = c.outerHeight(),
							h = parseInt(a.curCSS(this, "marginLeft", !0)) || 0,
							i = parseInt(a.curCSS(this, "marginTop", !0)) || 0,
							o = d + h + (parseInt(a.curCSS(this, "marginRight", !0)) || 0),
							p = g + i + (parseInt(a.curCSS(this, "marginBottom", !0)) || 0),
							q = a.extend({},
									n),
									r;
							b.my[0] === "right" ? q.left -= d: b.my[0] === e && (q.left -= d / 2),
									b.my[1] === "bottom" ? q.top -= g: b.my[1] === e && (q.top -= g / 2),
											f.fractions || (q.left = Math.round(q.left), q.top = Math.round(q.top)),
											r = {
											left: q.left - h,
											top: q.top - i
									},
									a.each(["left", "top"],
											function(c, e) {
										a.ui.position[j[c]] && a.ui.position[j[c]][e](q, {
											targetWidth: l,
											targetHeight: m,
											elemWidth: d,
											elemHeight: g,
											collisionPosition: r,
											collisionWidth: o,
											collisionHeight: p,
											offset: k,
											my: b.my,
											at: b.at
										})
									}),
									a.fn.bgiframe && c.bgiframe(),
									c.offset(a.extend(q, {
										using: b.using
									}))
						})
	},
	a.ui.position = {
			fit: {
				left: function(b, c) {
					var d = a(window),
					e = c.collisionPosition.left + c.collisionWidth - d.width() - d.scrollLeft();
					b.left = e > 0 ? b.left - e: Math.max(b.left - c.collisionPosition.left, b.left)
				},
				top: function(b, c) {
					var d = a(window),
					e = c.collisionPosition.top + c.collisionHeight - d.height() - d.scrollTop();
					b.top = e > 0 ? b.top - e: Math.max(b.top - c.collisionPosition.top, b.top)
				}
			},
			flip: {
				left: function(b, c) {
					if (c.at[0] === e) return;
					var d = a(window),
					f = c.collisionPosition.left + c.collisionWidth - d.width() - d.scrollLeft(),
					g = c.my[0] === "left" ? -c.elemWidth: c.my[0] === "right" ? c.elemWidth: 0,
							h = c.at[0] === "left" ? c.targetWidth: -c.targetWidth,
									i = -2 * c.offset[0];
					b.left += c.collisionPosition.left < 0 ? g + h + i: f > 0 ? g + h + i: 0
				},
				top: function(b, c) {
					if (c.at[1] === e) return;
					var d = a(window),
					f = c.collisionPosition.top + c.collisionHeight - d.height() - d.scrollTop(),
					g = c.my[1] === "top" ? -c.elemHeight: c.my[1] === "bottom" ? c.elemHeight: 0,
							h = c.at[1] === "top" ? c.targetHeight: -c.targetHeight,
									i = -2 * c.offset[1];
					b.top += c.collisionPosition.top < 0 ? g + h + i: f > 0 ? g + h + i: 0
				}
			}
	},
	a.offset.setOffset || (a.offset.setOffset = function(b, c) { / static / .test(a.curCSS(b, "position")) && (b.style.position = "relative");
	var d = a(b),
	e = d.offset(),
	f = parseInt(a.curCSS(b, "top", !0), 10) || 0,
	g = parseInt(a.curCSS(b, "left", !0), 10) || 0,
	h = {
		top: c.top - e.top + f,
		left: c.left - e.left + g
	};
	"using" in c ? c.using.call(b, h) : d.css(h)
	},
	a.fn.offset = function(b) {
		var c = this[0];
		return ! c || !c.ownerDocument ? null: b ? a.isFunction(b) ? this.each(function(c) {
			a(this).offset(b.call(this, c, a(this).offset()))
		}) : this.each(function() {
			a.offset.setOffset(this, b)
		}) : h.call(this)
	}),
	function() {
		var b = document.getElementsByTagName("body")[0],
		c = document.createElement("div"),
		d,
		e,
		g,
		h,
		i;
		d = document.createElement(b ? "div": "body"),
		g = {
			visibility: "hidden",
			width: 0,
			height: 0,
			border: 0,
			margin: 0,
			background: "none"
		},
		b && a.extend(g, {
			position: "absolute",
			left: "-1000px",
			top: "-1000px"
		});
		for (var j in g) d.style[j] = g[j];
		d.appendChild(c),
		e = b || document.documentElement,
		e.insertBefore(d, e.firstChild),
		c.style.cssText = "position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;",
		h = a(c).offset(function(a, b) {
			return b
		}).offset(),
		d.innerHTML = "",
		e.removeChild(d),
		i = h.top + h.left + (b ? 2e3: 0),
		f.fractions = i > 21 && i < 22
	} ()
})(jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.draggable.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
	a.widget("ui.draggable", a.ui.mouse, {
		widgetEventPrefix: "drag",
		options: {
			addClasses: !0,
			appendTo: "parent",
			axis: !1,
			connectToSortable: !1,
			containment: !1,
			cursor: "auto",
			cursorAt: !1,
			grid: !1,
			handle: !1,
			helper: "original",
			iframeFix: !1,
			opacity: !1,
			refreshPositions: !1,
			revert: !1,
			revertDuration: 500,
			scope: "default",
			scroll: !0,
			scrollSensitivity: 20,
			scrollSpeed: 20,
			snap: !1,
			snapMode: "both",
			snapTolerance: 20,
			stack: !1,
			zIndex: !1
		},
		_create: function() {
			this.options.helper == "original" && !/^(?:r|a|f)/.test(this.element.css("position")) && (this.element[0].style.position = "relative"),
			this.options.addClasses && this.element.addClass("ui-draggable"),
			this.options.disabled && this.element.addClass("ui-draggable-disabled"),
			this._mouseInit()
		},
		destroy: function() {
			if (!this.element.data("draggable")) return;
			return this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),
			this._mouseDestroy(),
			this
		},
		_mouseCapture: function(b) {
			var c = this.options;
			return this.helper || c.disabled || a(b.target).is(".ui-resizable-handle") ? !1 : (this.handle = this._getHandle(b), this.handle ? (c.iframeFix && a(c.iframeFix === !0 ? "iframe": c.iframeFix).each(function() {
				a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
					width: this.offsetWidth + "px",
					height: this.offsetHeight + "px",
					position: "absolute",
					opacity: "0.001",
					zIndex: 1e3
				}).css(a(this).offset()).appendTo("body")
			}), !0) : !1)
		},
		_mouseStart: function(b) {
			var c = this.options;
			return this.helper = this._createHelper(b),
			this.helper.addClass("ui-draggable-dragging"),
			this._cacheHelperProportions(),
			a.ui.ddmanager && (a.ui.ddmanager.current = this),
			this._cacheMargins(),
			this.cssPosition = this.helper.css("position"),
			this.scrollParent = this.helper.scrollParent(),
			this.offset = this.positionAbs = this.element.offset(),
			this.offset = {
				top: this.offset.top - this.margins.top,
				left: this.offset.left - this.margins.left
			},
			a.extend(this.offset, {
				click: {
					left: b.pageX - this.offset.left,
					top: b.pageY - this.offset.top
				},
				parent: this._getParentOffset(),
				relative: this._getRelativeOffset()
			}),
			this.originalPosition = this.position = this._generatePosition(b),
			this.originalPageX = b.pageX,
			this.originalPageY = b.pageY,
			c.cursorAt && this._adjustOffsetFromHelper(c.cursorAt),
			c.containment && this._setContainment(),
			this._trigger("start", b) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this._mouseDrag(b, !0), a.ui.ddmanager && a.ui.ddmanager.dragStart(this, b), !0)
		},
		_mouseDrag: function(b, c) {
			this.position = this._generatePosition(b),
			this.positionAbs = this._convertPositionTo("absolute");
			if (!c) {
				var d = this._uiHash();
				if (this._trigger("drag", b, d) === !1) return this._mouseUp({}),
				!1;
				this.position = d.position
			}
			if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
			if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
			return a.ui.ddmanager && a.ui.ddmanager.drag(this, b),
			!1
		},
		_mouseStop: function(b) {
			var c = !1;
			a.ui.ddmanager && !this.options.dropBehaviour && (c = a.ui.ddmanager.drop(this, b)),
			this.dropped && (c = this.dropped, this.dropped = !1);
			var d = this.element[0],
			e = !1;
			while (d && (d = d.parentNode)) d == document && (e = !0);
			if (!e && this.options.helper === "original") return ! 1;
			if (this.options.revert == "invalid" && !c || this.options.revert == "valid" && c || this.options.revert === !0 || a.isFunction(this.options.revert) && this.options.revert.call(this.element, c)) {
				var f = this;
				a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10),
						function() {
					f._trigger("stop", b) !== !1 && f._clear()
				})
			} else this._trigger("stop", b) !== !1 && this._clear();
			return ! 1
		},
		_mouseUp: function(b) {
			return this.options.iframeFix === !0 && a("div.ui-draggable-iframeFix").each(function() {
				this.parentNode.removeChild(this)
			}),
			a.ui.ddmanager && a.ui.ddmanager.dragStop(this, b),
			a.ui.mouse.prototype._mouseUp.call(this, b)
		},
		cancel: function() {
			return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(),
					this
		},
		_getHandle: function(b) {
			var c = !this.options.handle || !a(this.options.handle, this.element).length ? !0 : !1;
			return a(this.options.handle, this.element).find("*").andSelf().each(function() {
				this == b.target && (c = !0)
			}),
			c
		},
		_createHelper: function(b) {
			var c = this.options,
			d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [b])) : c.helper == "clone" ? this.element.clone().removeAttr("id") : this.element;
			return d.parents("body").length || d.appendTo(c.appendTo == "parent" ? this.element[0].parentNode: c.appendTo),
			d[0] != this.element[0] && !/(fixed|absolute)/.test(d.css("position")) && d.css("position", "absolute"),
			d
		},
		_adjustOffsetFromHelper: function(b) {
			typeof b == "string" && (b = b.split(" ")),
			a.isArray(b) && (b = {
					left: +b[0],
					top: +b[1] || 0
			}),
			"left" in b && (this.offset.click.left = b.left + this.margins.left),
			"right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left),
			"top" in b && (this.offset.click.top = b.top + this.margins.top),
			"bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
		},
		_getParentOffset: function() {
			this.offsetParent = this.helper.offsetParent();
			var b = this.offsetParent.offset();
			this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop());
			if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie) b = {
					top: 0,
					left: 0
			};
			return {
				top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
				left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
			}
		},
		_getRelativeOffset: function() {
			if (this.cssPosition == "relative") {
				var a = this.element.position();
				return {
					top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
					left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
				}
			}
			return {
				top: 0,
				left: 0
			}
		},
		_cacheMargins: function() {
			this.margins = {
					left: parseInt(this.element.css("marginLeft"), 10) || 0,
					top: parseInt(this.element.css("marginTop"), 10) || 0,
					right: parseInt(this.element.css("marginRight"), 10) || 0,
					bottom: parseInt(this.element.css("marginBottom"), 10) || 0
			}
		},
		_cacheHelperProportions: function() {
			this.helperProportions = {
					width: this.helper.outerWidth(),
					height: this.helper.outerHeight()
			}
		},
		_setContainment: function() {
			var b = this.options;
			b.containment == "parent" && (b.containment = this.helper[0].parentNode);
			if (b.containment == "document" || b.containment == "window") this.containment = [b.containment == "document" ? 0 : a(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, b.containment == "document" ? 0 : a(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, (b.containment == "document" ? 0 : a(window).scrollLeft()) + a(b.containment == "document" ? document: window).width() - this.helperProportions.width - this.margins.left, (b.containment == "document" ? 0 : a(window).scrollTop()) + (a(b.containment == "document" ? document: window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
			if (!/^(document|window|parent)$/.test(b.containment) && b.containment.constructor != Array) {
				var c = a(b.containment),
				d = c[0];
				if (!d) return;
				var e = c.offset(),
				f = a(d).css("overflow") != "hidden";
				this.containment = [(parseInt(a(d).css("borderLeftWidth"), 10) || 0) + (parseInt(a(d).css("paddingLeft"), 10) || 0), (parseInt(a(d).css("borderTopWidth"), 10) || 0) + (parseInt(a(d).css("paddingTop"), 10) || 0), (f ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(a(d).css("borderLeftWidth"), 10) || 0) - (parseInt(a(d).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (f ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(a(d).css("borderTopWidth"), 10) || 0) - (parseInt(a(d).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom],
				this.relative_container = c
			} else b.containment.constructor == Array && (this.containment = b.containment)
		},
		_convertPositionTo: function(b, c) {
			c || (c = this.position);
			var d = b == "absolute" ? 1 : -1,
					e = this.options,
					f = this.cssPosition == "absolute" && (this.scrollParent[0] == document || !a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent: this.scrollParent,
							g = /(html|body)/i.test(f[0].tagName);
			return {
				top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : g ? 0 : f.scrollTop()) * d),
				left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : f.scrollLeft()) * d)
			}
		},
		_generatePosition: function(b) {
			var c = this.options,
			d = this.cssPosition == "absolute" && (this.scrollParent[0] == document || !a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent: this.scrollParent,
					e = /(html|body)/i.test(d[0].tagName),
					f = b.pageX,
					g = b.pageY;
			if (this.originalPosition) {
				var h;
				if (this.containment) {
					if (this.relative_container) {
						var i = this.relative_container.offset();
						h = [this.containment[0] + i.left, this.containment[1] + i.top, this.containment[2] + i.left, this.containment[3] + i.top]
					} else h = this.containment;
					b.pageX - this.offset.click.left < h[0] && (f = h[0] + this.offset.click.left),
					b.pageY - this.offset.click.top < h[1] && (g = h[1] + this.offset.click.top),
					b.pageX - this.offset.click.left > h[2] && (f = h[2] + this.offset.click.left),
					b.pageY - this.offset.click.top > h[3] && (g = h[3] + this.offset.click.top)
				}
				if (c.grid) {
					var j = c.grid[1] ? this.originalPageY + Math.round((g - this.originalPageY) / c.grid[1]) * c.grid[1] : this.originalPageY;
					g = h ? j - this.offset.click.top < h[1] || j - this.offset.click.top > h[3] ? j - this.offset.click.top < h[1] ? j + c.grid[1] : j - c.grid[1] : j: j;
					var k = c.grid[0] ? this.originalPageX + Math.round((f - this.originalPageX) / c.grid[0]) * c.grid[0] : this.originalPageX;
					f = h ? k - this.offset.click.left < h[0] || k - this.offset.click.left > h[2] ? k - this.offset.click.left < h[0] ? k + c.grid[0] : k - c.grid[0] : k: k
				}
			}
			return {
				top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : e ? 0 : d.scrollTop()),
				left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : e ? 0 : d.scrollLeft())
			}
		},
		_clear: function() {
			this.helper.removeClass("ui-draggable-dragging"),
			this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove(),
			this.helper = null,
			this.cancelHelperRemoval = !1
		},
		_trigger: function(b, c, d) {
			return d = d || this._uiHash(),
			a.ui.plugin.call(this, b, [c, d]),
			b == "drag" && (this.positionAbs = this._convertPositionTo("absolute")),
			a.Widget.prototype._trigger.call(this, b, c, d)
		},
		plugins: {},
		_uiHash: function(a) {
			return {
				helper: this.helper,
				position: this.position,
				originalPosition: this.originalPosition,
				offset: this.positionAbs
			}
		}
	}),
	a.extend(a.ui.draggable, {
		version: "1.8.21"
	}),
	a.ui.plugin.add("draggable", "connectToSortable", {
		start: function(b, c) {
			var d = a(this).data("draggable"),
			e = d.options,
			f = a.extend({},
					c, {
				item: d.element
			});
			d.sortables = [],
			a(e.connectToSortable).each(function() {
				var c = a.data(this, "sortable");
				c && !c.options.disabled && (d.sortables.push({
					instance: c,
					shouldRevert: c.options.revert
				}), c.refreshPositions(), c._trigger("activate", b, f))
			})
		},
		stop: function(b, c) {
			var d = a(this).data("draggable"),
			e = a.extend({},
					c, {
				item: d.element
			});
			a.each(d.sortables,
					function() {
				this.instance.isOver ? (this.instance.isOver = 0, d.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), this.instance._mouseStop(b), this.instance.options.helper = this.instance.options._helper, d.options.helper == "original" && this.instance.currentItem.css({
					top: "auto",
					left: "auto"
				})) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", b, e))
			})
		},
		drag: function(b, c) {
			var d = a(this).data("draggable"),
			e = this,
			f = function(b) {
				var c = this.offset.click.top,
				d = this.offset.click.left,
				e = this.positionAbs.top,
				f = this.positionAbs.left,
				g = b.height,
				h = b.width,
				i = b.top,
				j = b.left;
				return a.ui.isOver(e + c, f + d, i, j, g, h)
			};
			a.each(d.sortables,
					function(f) {
				this.instance.positionAbs = d.positionAbs,
				this.instance.helperProportions = d.helperProportions,
				this.instance.offset.click = d.offset.click,
				this.instance._intersectsWith(this.instance.containerCache) ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = a(e).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
					return c.helper[0]
				},
				b.target = this.instance.currentItem[0], this.instance._mouseCapture(b, !0), this.instance._mouseStart(b, !0, !0), this.instance.offset.click.top = d.offset.click.top, this.instance.offset.click.left = d.offset.click.left, this.instance.offset.parent.left -= d.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= d.offset.parent.top - this.instance.offset.parent.top, d._trigger("toSortable", b), d.dropped = this.instance.element, d.currentItem = d.element, this.instance.fromOutside = d), this.instance.currentItem && this.instance._mouseDrag(b)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", b, this.instance._uiHash(this.instance)), this.instance._mouseStop(b, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), d._trigger("fromSortable", b), d.dropped = !1)
			})
		}
	}),
	a.ui.plugin.add("draggable", "cursor", {
		start: function(b, c) {
			var d = a("body"),
			e = a(this).data("draggable").options;
			d.css("cursor") && (e._cursor = d.css("cursor")),
			d.css("cursor", e.cursor)
		},
		stop: function(b, c) {
			var d = a(this).data("draggable").options;
			d._cursor && a("body").css("cursor", d._cursor)
		}
	}),
	a.ui.plugin.add("draggable", "opacity", {
		start: function(b, c) {
			var d = a(c.helper),
			e = a(this).data("draggable").options;
			d.css("opacity") && (e._opacity = d.css("opacity")),
			d.css("opacity", e.opacity)
		},
		stop: function(b, c) {
			var d = a(this).data("draggable").options;
			d._opacity && a(c.helper).css("opacity", d._opacity)
		}
	}),
	a.ui.plugin.add("draggable", "scroll", {
		start: function(b, c) {
			var d = a(this).data("draggable");
			d.scrollParent[0] != document && d.scrollParent[0].tagName != "HTML" && (d.overflowOffset = d.scrollParent.offset())
		},
		drag: function(b, c) {
			var d = a(this).data("draggable"),
			e = d.options,
			f = !1;
			if (d.scrollParent[0] != document && d.scrollParent[0].tagName != "HTML") {
				if (!e.axis || e.axis != "x") d.overflowOffset.top + d.scrollParent[0].offsetHeight - b.pageY < e.scrollSensitivity ? d.scrollParent[0].scrollTop = f = d.scrollParent[0].scrollTop + e.scrollSpeed: b.pageY - d.overflowOffset.top < e.scrollSensitivity && (d.scrollParent[0].scrollTop = f = d.scrollParent[0].scrollTop - e.scrollSpeed);
				if (!e.axis || e.axis != "y") d.overflowOffset.left + d.scrollParent[0].offsetWidth - b.pageX < e.scrollSensitivity ? d.scrollParent[0].scrollLeft = f = d.scrollParent[0].scrollLeft + e.scrollSpeed: b.pageX - d.overflowOffset.left < e.scrollSensitivity && (d.scrollParent[0].scrollLeft = f = d.scrollParent[0].scrollLeft - e.scrollSpeed)
			} else {
				if (!e.axis || e.axis != "x") b.pageY - a(document).scrollTop() < e.scrollSensitivity ? f = a(document).scrollTop(a(document).scrollTop() - e.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < e.scrollSensitivity && (f = a(document).scrollTop(a(document).scrollTop() + e.scrollSpeed));
				if (!e.axis || e.axis != "y") b.pageX - a(document).scrollLeft() < e.scrollSensitivity ? f = a(document).scrollLeft(a(document).scrollLeft() - e.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < e.scrollSensitivity && (f = a(document).scrollLeft(a(document).scrollLeft() + e.scrollSpeed))
			}
			f !== !1 && a.ui.ddmanager && !e.dropBehaviour && a.ui.ddmanager.prepareOffsets(d, b)
		}
	}),
	a.ui.plugin.add("draggable", "snap", {
		start: function(b, c) {
			var d = a(this).data("draggable"),
			e = d.options;
			d.snapElements = [],
			a(e.snap.constructor != String ? e.snap.items || ":data(draggable)": e.snap).each(function() {
				var b = a(this),
				c = b.offset();
				this != d.element[0] && d.snapElements.push({
					item: this,
					width: b.outerWidth(),
					height: b.outerHeight(),
					top: c.top,
					left: c.left
				})
			})
		},
		drag: function(b, c) {
			var d = a(this).data("draggable"),
			e = d.options,
			f = e.snapTolerance,
			g = c.offset.left,
			h = g + d.helperProportions.width,
			i = c.offset.top,
			j = i + d.helperProportions.height;
			for (var k = d.snapElements.length - 1; k >= 0; k--) {
				var l = d.snapElements[k].left,
				m = l + d.snapElements[k].width,
				n = d.snapElements[k].top,
				o = n + d.snapElements[k].height;
				if (! (l - f < g && g < m + f && n - f < i && i < o + f || l - f < g && g < m + f && n - f < j && j < o + f || l - f < h && h < m + f && n - f < i && i < o + f || l - f < h && h < m + f && n - f < j && j < o + f)) {
					d.snapElements[k].snapping && d.options.snap.release && d.options.snap.release.call(d.element, b, a.extend(d._uiHash(), {
						snapItem: d.snapElements[k].item
					})),
					d.snapElements[k].snapping = !1;
					continue
				}
				if (e.snapMode != "inner") {
					var p = Math.abs(n - j) <= f,
					q = Math.abs(o - i) <= f,
					r = Math.abs(l - h) <= f,
					s = Math.abs(m - g) <= f;
					p && (c.position.top = d._convertPositionTo("relative", {
						top: n - d.helperProportions.height,
						left: 0
					}).top - d.margins.top),
					q && (c.position.top = d._convertPositionTo("relative", {
						top: o,
						left: 0
					}).top - d.margins.top),
					r && (c.position.left = d._convertPositionTo("relative", {
						top: 0,
						left: l - d.helperProportions.width
					}).left - d.margins.left),
					s && (c.position.left = d._convertPositionTo("relative", {
						top: 0,
						left: m
					}).left - d.margins.left)
				}
				var t = p || q || r || s;
				if (e.snapMode != "outer") {
					var p = Math.abs(n - i) <= f,
					q = Math.abs(o - j) <= f,
					r = Math.abs(l - g) <= f,
					s = Math.abs(m - h) <= f;
					p && (c.position.top = d._convertPositionTo("relative", {
						top: n,
						left: 0
					}).top - d.margins.top),
					q && (c.position.top = d._convertPositionTo("relative", {
						top: o - d.helperProportions.height,
						left: 0
					}).top - d.margins.top),
					r && (c.position.left = d._convertPositionTo("relative", {
						top: 0,
						left: l
					}).left - d.margins.left),
					s && (c.position.left = d._convertPositionTo("relative", {
						top: 0,
						left: m - d.helperProportions.width
					}).left - d.margins.left)
				} ! d.snapElements[k].snapping && (p || q || r || s || t) && d.options.snap.snap && d.options.snap.snap.call(d.element, b, a.extend(d._uiHash(), {
					snapItem: d.snapElements[k].item
				})),
				d.snapElements[k].snapping = p || q || r || s || t
			}
		}
	}),
	a.ui.plugin.add("draggable", "stack", {
		start: function(b, c) {
			var d = a(this).data("draggable").options,
			e = a.makeArray(a(d.stack)).sort(function(b, c) {
				return (parseInt(a(b).css("zIndex"), 10) || 0) - (parseInt(a(c).css("zIndex"), 10) || 0)
			});
			if (!e.length) return;
			var f = parseInt(e[0].style.zIndex) || 0;
			a(e).each(function(a) {
				this.style.zIndex = f + a
			}),
			this[0].style.zIndex = f + e.length
		}
	}),
	a.ui.plugin.add("draggable", "zIndex", {
		start: function(b, c) {
			var d = a(c.helper),
			e = a(this).data("draggable").options;
			d.css("zIndex") && (e._zIndex = d.css("zIndex")),
			d.css("zIndex", e.zIndex)
		},
		stop: function(b, c) {
			var d = a(this).data("draggable").options;
			d._zIndex && a(c.helper).css("zIndex", d._zIndex)
		}
	})
})(jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.droppable.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
	a.widget("ui.droppable", {
		widgetEventPrefix: "drop",
		options: {
			accept: "*",
			activeClass: !1,
			addClasses: !0,
			greedy: !1,
			hoverClass: !1,
			scope: "default",
			tolerance: "intersect"
		},
		_create: function() {
			var b = this.options,
			c = b.accept;
			this.isover = 0,
			this.isout = 1,
			this.accept = a.isFunction(c) ? c: function(a) {
				return a.is(c)
			},
			this.proportions = {
					width: this.element[0].offsetWidth,
					height: this.element[0].offsetHeight
			},
			a.ui.ddmanager.droppables[b.scope] = a.ui.ddmanager.droppables[b.scope] || [],
			a.ui.ddmanager.droppables[b.scope].push(this),
			b.addClasses && this.element.addClass("ui-droppable")
		},
		destroy: function() {
			var b = a.ui.ddmanager.droppables[this.options.scope];
			for (var c = 0; c < b.length; c++) b[c] == this && b.splice(c, 1);
			return this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable"),
			this
		},
		_setOption: function(b, c) {
			b == "accept" && (this.accept = a.isFunction(c) ? c: function(a) {
				return a.is(c)
			}),
			a.Widget.prototype._setOption.apply(this, arguments)
		},
		_activate: function(b) {
			var c = a.ui.ddmanager.current;
			this.options.activeClass && this.element.addClass(this.options.activeClass),
			c && this._trigger("activate", b, this.ui(c))
		},
		_deactivate: function(b) {
			var c = a.ui.ddmanager.current;
			this.options.activeClass && this.element.removeClass(this.options.activeClass),
			c && this._trigger("deactivate", b, this.ui(c))
		},
		_over: function(b) {
			var c = a.ui.ddmanager.current;
			if (!c || (c.currentItem || c.element)[0] == this.element[0]) return;
			this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", b, this.ui(c)))
		},
		_out: function(b) {
			var c = a.ui.ddmanager.current;
			if (!c || (c.currentItem || c.element)[0] == this.element[0]) return;
			this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", b, this.ui(c)))
		},
		_drop: function(b, c) {
			var d = c || a.ui.ddmanager.current;
			if (!d || (d.currentItem || d.element)[0] == this.element[0]) return ! 1;
			var e = !1;
			return this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function() {
				var b = a.data(this, "droppable");
				if (b.options.greedy && !b.options.disabled && b.options.scope == d.options.scope && b.accept.call(b.element[0], d.currentItem || d.element) && a.ui.intersect(d, a.extend(b, {
					offset: b.element.offset()
				}), b.options.tolerance)) return e = !0,
				!1
			}),
			e ? !1 : this.accept.call(this.element[0], d.currentItem || d.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", b, this.ui(d)), this.element) : !1
		},
		ui: function(a) {
			return {
				draggable: a.currentItem || a.element,
				helper: a.helper,
				position: a.position,
				offset: a.positionAbs
			}
		}
	}),
	a.extend(a.ui.droppable, {
		version: "1.8.21"
	}),
	a.ui.intersect = function(b, c, d) {
		if (!c.offset) return ! 1;
		var e = (b.positionAbs || b.position.absolute).left,
		f = e + b.helperProportions.width,
		g = (b.positionAbs || b.position.absolute).top,
		h = g + b.helperProportions.height,
		i = c.offset.left,
		j = i + c.proportions.width,
		k = c.offset.top,
		l = k + c.proportions.height;
		switch (d) {
		case "fit":
			return i <= e && f <= j && k <= g && h <= l;
		case "intersect":
			return i < e + b.helperProportions.width / 2 && f - b.helperProportions.width / 2 < j && k < g + b.helperProportions.height / 2 && h - b.helperProportions.height / 2 < l;
		case "pointer":
			var m = (b.positionAbs || b.position.absolute).left + (b.clickOffset || b.offset.click).left,
			n = (b.positionAbs || b.position.absolute).top + (b.clickOffset || b.offset.click).top,
			o = a.ui.isOver(n, m, k, i, c.proportions.height, c.proportions.width);
			return o;
		case "touch":
			return (g >= k && g <= l || h >= k && h <= l || g < k && h > l) && (e >= i && e <= j || f >= i && f <= j || e < i && f > j);
		default:
			return ! 1
		}
	},
	a.ui.ddmanager = {
			current: null,
			droppables: {
				"default": []
			},
			prepareOffsets: function(b, c) {
				var d = a.ui.ddmanager.droppables[b.options.scope] || [],
				e = c ? c.type: null,
						f = (b.currentItem || b.element).find(":data(droppable)").andSelf();
				g: for (var h = 0; h < d.length; h++) {
					if (d[h].options.disabled || b && !d[h].accept.call(d[h].element[0], b.currentItem || b.element)) continue;
					for (var i = 0; i < f.length; i++) if (f[i] == d[h].element[0]) {
						d[h].proportions.height = 0;
						continue g
					}
					d[h].visible = d[h].element.css("display") != "none";
					if (!d[h].visible) continue;
					e == "mousedown" && d[h]._activate.call(d[h], c),
					d[h].offset = d[h].element.offset(),
					d[h].proportions = {
						width: d[h].element[0].offsetWidth,
						height: d[h].element[0].offsetHeight
					}
				}
			},
			drop: function(b, c) {
				var d = !1;
				return a.each(a.ui.ddmanager.droppables[b.options.scope] || [],
						function() {
					if (!this.options) return; ! this.options.disabled && this.visible && a.ui.intersect(b, this, this.options.tolerance) && (d = this._drop.call(this, c) || d),
					!this.options.disabled && this.visible && this.accept.call(this.element[0], b.currentItem || b.element) && (this.isout = 1, this.isover = 0, this._deactivate.call(this, c))
				}),
				d
			},
			dragStart: function(b, c) {
				b.element.parents(":not(body,html)").bind("scroll.droppable",
						function() {
					b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c)
				})
			},
			drag: function(b, c) {
				b.options.refreshPositions && a.ui.ddmanager.prepareOffsets(b, c),
				a.each(a.ui.ddmanager.droppables[b.options.scope] || [],
						function() {
					if (this.options.disabled || this.greedyChild || !this.visible) return;
					var d = a.ui.intersect(b, this, this.options.tolerance),
					e = !d && this.isover == 1 ? "isout": d && this.isover == 0 ? "isover": null;
					if (!e) return;
					var f;
					if (this.options.greedy) {
						var g = this.element.parents(":data(droppable):eq(0)");
						g.length && (f = a.data(g[0], "droppable"), f.greedyChild = e == "isover" ? 1 : 0)
					}
					f && e == "isover" && (f.isover = 0, f.isout = 1, f._out.call(f, c)),
					this[e] = 1,
					this[e == "isout" ? "isover": "isout"] = 0,
					this[e == "isover" ? "_over": "_out"].call(this, c),
					f && e == "isout" && (f.isout = 0, f.isover = 1, f._over.call(f, c))
				})
			},
			dragStop: function(b, c) {
				b.element.parents(":not(body,html)").unbind("scroll.droppable"),
				b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c)
			}
	}
})(jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.resizable.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
	a.widget("ui.resizable", a.ui.mouse, {
		widgetEventPrefix: "resize",
		options: {
			alsoResize: !1,
			animate: !1,
			animateDuration: "slow",
			animateEasing: "swing",
			aspectRatio: !1,
			autoHide: !1,
			containment: !1,
			ghost: !1,
			grid: !1,
			handles: "e,s,se",
			helper: !1,
			maxHeight: null,
			maxWidth: null,
			minHeight: 10,
			minWidth: 10,
			zIndex: 1e3
		},
		_create: function() {
			var b = this,
			c = this.options;
			this.element.addClass("ui-resizable"),
			a.extend(this, {
				_aspectRatio: !!c.aspectRatio,
				aspectRatio: c.aspectRatio,
				originalElement: this.element,
				_proportionallyResizeElements: [],
				_helper: c.helper || c.ghost || c.animate ? c.helper || "ui-resizable-helper": null
			}),
			this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(a('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
				position: this.element.css("position"),
				width: this.element.outerWidth(),
				height: this.element.outerHeight(),
				top: this.element.css("top"),
				left: this.element.css("left")
			})), this.element = this.element.parent().data("resizable", this.element.data("resizable")), this.elementIsWrapper = !0, this.element.css({
				marginLeft: this.originalElement.css("marginLeft"),
				marginTop: this.originalElement.css("marginTop"),
				marginRight: this.originalElement.css("marginRight"),
				marginBottom: this.originalElement.css("marginBottom")
			}), this.originalElement.css({
				marginLeft: 0,
				marginTop: 0,
				marginRight: 0,
				marginBottom: 0
			}), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
				position: "static",
				zoom: 1,
				display: "block"
			})), this.originalElement.css({
				margin: this.originalElement.css("margin")
			}), this._proportionallyResize()),
			this.handles = c.handles || (a(".ui-resizable-handle", this.element).length ? {
				n: ".ui-resizable-n",
				e: ".ui-resizable-e",
				s: ".ui-resizable-s",
				w: ".ui-resizable-w",
				se: ".ui-resizable-se",
				sw: ".ui-resizable-sw",
				ne: ".ui-resizable-ne",
				nw: ".ui-resizable-nw"
			}: "e,s,se");
			if (this.handles.constructor == String) {
				this.handles == "all" && (this.handles = "n,e,s,w,se,sw,ne,nw");
				var d = this.handles.split(",");
				this.handles = {};
				for (var e = 0; e < d.length; e++) {
					var f = a.trim(d[e]),
					g = "ui-resizable-" + f,
					h = a('<div class="ui-resizable-handle ' + g + '"></div>');
					h.css({
						zIndex: c.zIndex
					}),
					"se" == f && h.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),
					this.handles[f] = ".ui-resizable-" + f,
					this.element.append(h)
				}
			}
			this._renderAxis = function(b) {
				b = b || this.element;
				for (var c in this.handles) {
					this.handles[c].constructor == String && (this.handles[c] = a(this.handles[c], this.element).show());
					if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
						var d = a(this.handles[c], this.element),
						e = 0;
						e = /sw|ne|nw|se|n|s/.test(c) ? d.outerHeight() : d.outerWidth();
						var f = ["padding", /ne|nw|n/.test(c) ? "Top": /se|sw|s/.test(c) ? "Bottom": /^e$/.test(c) ? "Right": "Left"].join("");
						b.css(f, e),
						this._proportionallyResize()
					}
					if (!a(this.handles[c]).length) continue
				}
			},
			this._renderAxis(this.element),
			this._handles = a(".ui-resizable-handle", this.element).disableSelection(),
			this._handles.mouseover(function() {
				if (!b.resizing) {
					if (this.className) var a = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
					b.axis = a && a[1] ? a[1] : "se"
				}
			}),
			c.autoHide && (this._handles.hide(), a(this.element).addClass("ui-resizable-autohide").hover(function() {
				if (c.disabled) return;
				a(this).removeClass("ui-resizable-autohide"),
				b._handles.show()
			},
			function() {
				if (c.disabled) return;
				b.resizing || (a(this).addClass("ui-resizable-autohide"), b._handles.hide())
			})),
			this._mouseInit()
		},
		destroy: function() {
			this._mouseDestroy();
			var b = function(b) {
				a(b).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
			};
			if (this.elementIsWrapper) {
				b(this.element);
				var c = this.element;
				c.after(this.originalElement.css({
					position: c.css("position"),
					width: c.outerWidth(),
					height: c.outerHeight(),
					top: c.css("top"),
					left: c.css("left")
				})).remove()
			}
			return this.originalElement.css("resize", this.originalResizeStyle),
			b(this.originalElement),
			this
		},
		_mouseCapture: function(b) {
			var c = !1;
			for (var d in this.handles) a(this.handles[d])[0] == b.target && (c = !0);
			return ! this.options.disabled && c
		},
		_mouseStart: function(b) {
			var d = this.options,
			e = this.element.position(),
			f = this.element;
			this.resizing = !0,
			this.documentScroll = {
					top: a(document).scrollTop(),
					left: a(document).scrollLeft()
			},
			(f.is(".ui-draggable") || /absolute/.test(f.css("position"))) && f.css({
				position: "absolute",
				top: e.top,
				left: e.left
			}),
			this._renderProxy();
			var g = c(this.helper.css("left")),
			h = c(this.helper.css("top"));
			d.containment && (g += a(d.containment).scrollLeft() || 0, h += a(d.containment).scrollTop() || 0),
			this.offset = this.helper.offset(),
			this.position = {
				left: g,
				top: h
			},
			this.size = this._helper ? {
				width: f.outerWidth(),
				height: f.outerHeight()
			}: {
				width: f.width(),
				height: f.height()
			},
			this.originalSize = this._helper ? {
				width: f.outerWidth(),
				height: f.outerHeight()
			}: {
				width: f.width(),
				height: f.height()
			},
			this.originalPosition = {
					left: g,
					top: h
			},
			this.sizeDiff = {
					width: f.outerWidth() - f.width(),
					height: f.outerHeight() - f.height()
			},
			this.originalMousePosition = {
					left: b.pageX,
					top: b.pageY
			},
			this.aspectRatio = typeof d.aspectRatio == "number" ? d.aspectRatio: this.originalSize.width / this.originalSize.height || 1;
			var i = a(".ui-resizable-" + this.axis).css("cursor");
			return a("body").css("cursor", i == "auto" ? this.axis + "-resize": i),
			f.addClass("ui-resizable-resizing"),
			this._propagate("start", b),
			!0
		},
		_mouseDrag: function(b) {
			var c = this.helper,
			d = this.options,
			e = {},
			f = this,
			g = this.originalMousePosition,
			h = this.axis,
			i = b.pageX - g.left || 0,
			j = b.pageY - g.top || 0,
			k = this._change[h];
			if (!k) return ! 1;
			var l = k.apply(this, [b, i, j]),
			m = a.browser.msie && a.browser.version < 7,
			n = this.sizeDiff;
			this._updateVirtualBoundaries(b.shiftKey);
			if (this._aspectRatio || b.shiftKey) l = this._updateRatio(l, b);
			return l = this._respectSize(l, b),
			this._propagate("resize", b),
			c.css({
				top: this.position.top + "px",
				left: this.position.left + "px",
				width: this.size.width + "px",
				height: this.size.height + "px"
			}),
			!this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(),
			this._updateCache(l),
			this._trigger("resize", b, this.ui()),
			!1
		},
		_mouseStop: function(b) {
			this.resizing = !1;
			var c = this.options,
			d = this;
			if (this._helper) {
				var e = this._proportionallyResizeElements,
				f = e.length && /textarea/i.test(e[0].nodeName),
				g = f && a.ui.hasScroll(e[0], "left") ? 0 : d.sizeDiff.height,
						h = f ? 0 : d.sizeDiff.width,
								i = {
								width: d.helper.width() - h,
								height: d.helper.height() - g
						},
						j = parseInt(d.element.css("left"), 10) + (d.position.left - d.originalPosition.left) || null,
						k = parseInt(d.element.css("top"), 10) + (d.position.top - d.originalPosition.top) || null;
				c.animate || this.element.css(a.extend(i, {
					top: k,
					left: j
				})),
				d.helper.height(d.size.height),
				d.helper.width(d.size.width),
				this._helper && !c.animate && this._proportionallyResize()
			}
			return a("body").css("cursor", "auto"),
			this.element.removeClass("ui-resizable-resizing"),
			this._propagate("stop", b),
			this._helper && this.helper.remove(),
			!1
		},
		_updateVirtualBoundaries: function(a) {
			var b = this.options,
			c, e, f, g, h;
			h = {
					minWidth: d(b.minWidth) ? b.minWidth: 0,
							maxWidth: d(b.maxWidth) ? b.maxWidth: Infinity,
									minHeight: d(b.minHeight) ? b.minHeight: 0,
											maxHeight: d(b.maxHeight) ? b.maxHeight: Infinity
			};
			if (this._aspectRatio || a) c = h.minHeight * this.aspectRatio,
			f = h.minWidth / this.aspectRatio,
			e = h.maxHeight * this.aspectRatio,
			g = h.maxWidth / this.aspectRatio,
			c > h.minWidth && (h.minWidth = c),
			f > h.minHeight && (h.minHeight = f),
			e < h.maxWidth && (h.maxWidth = e),
			g < h.maxHeight && (h.maxHeight = g);
			this._vBoundaries = h
		},
		_updateCache: function(a) {
			var b = this.options;
			this.offset = this.helper.offset(),
			d(a.left) && (this.position.left = a.left),
			d(a.top) && (this.position.top = a.top),
			d(a.height) && (this.size.height = a.height),
			d(a.width) && (this.size.width = a.width)
		},
		_updateRatio: function(a, b) {
			var c = this.options,
			e = this.position,
			f = this.size,
			g = this.axis;
			return d(a.height) ? a.width = a.height * this.aspectRatio: d(a.width) && (a.height = a.width / this.aspectRatio),
					g == "sw" && (a.left = e.left + (f.width - a.width), a.top = null),
					g == "nw" && (a.top = e.top + (f.height - a.height), a.left = e.left + (f.width - a.width)),
					a
		},
		_respectSize: function(a, b) {
			var c = this.helper,
			e = this._vBoundaries,
			f = this._aspectRatio || b.shiftKey,
			g = this.axis,
			h = d(a.width) && e.maxWidth && e.maxWidth < a.width,
			i = d(a.height) && e.maxHeight && e.maxHeight < a.height,
			j = d(a.width) && e.minWidth && e.minWidth > a.width,
			k = d(a.height) && e.minHeight && e.minHeight > a.height;
			j && (a.width = e.minWidth),
			k && (a.height = e.minHeight),
			h && (a.width = e.maxWidth),
			i && (a.height = e.maxHeight);
			var l = this.originalPosition.left + this.originalSize.width,
			m = this.position.top + this.size.height,
			n = /sw|nw|w/.test(g),
			o = /nw|ne|n/.test(g);
			j && n && (a.left = l - e.minWidth),
			h && n && (a.left = l - e.maxWidth),
			k && o && (a.top = m - e.minHeight),
			i && o && (a.top = m - e.maxHeight);
			var p = !a.width && !a.height;
			return p && !a.left && a.top ? a.top = null: p && !a.top && a.left && (a.left = null),
					a
		},
		_proportionallyResize: function() {
			var b = this.options;
			if (!this._proportionallyResizeElements.length) return;
			var c = this.helper || this.element;
			for (var d = 0; d < this._proportionallyResizeElements.length; d++) {
				var e = this._proportionallyResizeElements[d];
				if (!this.borderDif) {
					var f = [e.css("borderTopWidth"), e.css("borderRightWidth"), e.css("borderBottomWidth"), e.css("borderLeftWidth")],
					g = [e.css("paddingTop"), e.css("paddingRight"), e.css("paddingBottom"), e.css("paddingLeft")];
					this.borderDif = a.map(f,
							function(a, b) {
						var c = parseInt(a, 10) || 0,
						d = parseInt(g[b], 10) || 0;
						return c + d
					})
				}
				if (!a.browser.msie || !a(c).is(":hidden") && !a(c).parents(":hidden").length) e.css({
					height: c.height() - this.borderDif[0] - this.borderDif[2] || 0,
					width: c.width() - this.borderDif[1] - this.borderDif[3] || 0
				});
				else continue
			}
		},
		_renderProxy: function() {
			var b = this.element,
			c = this.options;
			this.elementOffset = b.offset();
			if (this._helper) {
				this.helper = this.helper || a('<div style="overflow:hidden;"></div>');
				var d = a.browser.msie && a.browser.version < 7,
				e = d ? 1 : 0,
						f = d ? 2 : -1;
				this.helper.addClass(this._helper).css({
					width: this.element.outerWidth() + f,
					height: this.element.outerHeight() + f,
					position: "absolute",
					left: this.elementOffset.left - e + "px",
					top: this.elementOffset.top - e + "px",
					zIndex: ++c.zIndex
				}),
				this.helper.appendTo("body").disableSelection()
			} else this.helper = this.element
		},
		_change: {
			e: function(a, b, c) {
				return {
					width: this.originalSize.width + b
				}
			},
			w: function(a, b, c) {
				var d = this.options,
				e = this.originalSize,
				f = this.originalPosition;
				return {
					left: f.left + b,
					width: e.width - b
				}
			},
			n: function(a, b, c) {
				var d = this.options,
				e = this.originalSize,
				f = this.originalPosition;
				return {
					top: f.top + c,
					height: e.height - c
				}
			},
			s: function(a, b, c) {
				return {
					height: this.originalSize.height + c
				}
			},
			se: function(b, c, d) {
				return a.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [b, c, d]))
			},
			sw: function(b, c, d) {
				return a.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [b, c, d]))
			},
			ne: function(b, c, d) {
				return a.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [b, c, d]))
			},
			nw: function(b, c, d) {
				return a.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [b, c, d]))
			}
		},
		_propagate: function(b, c) {
			a.ui.plugin.call(this, b, [c, this.ui()]),
			b != "resize" && this._trigger(b, c, this.ui())
		},
		plugins: {},
		ui: function() {
			return {
				originalElement: this.originalElement,
				element: this.element,
				helper: this.helper,
				position: this.position,
				size: this.size,
				originalSize: this.originalSize,
				originalPosition: this.originalPosition
			}
		}
	}),
	a.extend(a.ui.resizable, {
		version: "1.8.21"
	}),
	a.ui.plugin.add("resizable", "alsoResize", {
		start: function(b, c) {
			var d = a(this).data("resizable"),
			e = d.options,
			f = function(b) {
				a(b).each(function() {
					var b = a(this);
					b.data("resizable-alsoresize", {
						width: parseInt(b.width(), 10),
						height: parseInt(b.height(), 10),
						left: parseInt(b.css("left"), 10),
						top: parseInt(b.css("top"), 10)
					})
				})
			};
			typeof e.alsoResize == "object" && !e.alsoResize.parentNode ? e.alsoResize.length ? (e.alsoResize = e.alsoResize[0], f(e.alsoResize)) : a.each(e.alsoResize,
					function(a) {
				f(a)
			}) : f(e.alsoResize)
		},
		resize: function(b, c) {
			var d = a(this).data("resizable"),
			e = d.options,
			f = d.originalSize,
			g = d.originalPosition,
			h = {
				height: d.size.height - f.height || 0,
				width: d.size.width - f.width || 0,
				top: d.position.top - g.top || 0,
				left: d.position.left - g.left || 0
			},
			i = function(b, d) {
				a(b).each(function() {
					var b = a(this),
					e = a(this).data("resizable-alsoresize"),
					f = {},
					g = d && d.length ? d: b.parents(c.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
					a.each(g,
							function(a, b) {
						var c = (e[b] || 0) + (h[b] || 0);
						c && c >= 0 && (f[b] = c || null)
					}),
					b.css(f)
				})
			};
			typeof e.alsoResize == "object" && !e.alsoResize.nodeType ? a.each(e.alsoResize,
					function(a, b) {
				i(a, b)
			}) : i(e.alsoResize)
		},
		stop: function(b, c) {
			a(this).removeData("resizable-alsoresize")
		}
	}),
	a.ui.plugin.add("resizable", "animate", {
		stop: function(b, c) {
			var d = a(this).data("resizable"),
			e = d.options,
			f = d._proportionallyResizeElements,
			g = f.length && /textarea/i.test(f[0].nodeName),
			h = g && a.ui.hasScroll(f[0], "left") ? 0 : d.sizeDiff.height,
					i = g ? 0 : d.sizeDiff.width,
							j = {
							width: d.size.width - i,
							height: d.size.height - h
					},
					k = parseInt(d.element.css("left"), 10) + (d.position.left - d.originalPosition.left) || null,
					l = parseInt(d.element.css("top"), 10) + (d.position.top - d.originalPosition.top) || null;
			d.element.animate(a.extend(j, l && k ? {
				top: l,
				left: k
			}: {}), {
				duration: e.animateDuration,
				easing: e.animateEasing,
				step: function() {
					var c = {
							width: parseInt(d.element.css("width"), 10),
							height: parseInt(d.element.css("height"), 10),
							top: parseInt(d.element.css("top"), 10),
							left: parseInt(d.element.css("left"), 10)
					};
					f && f.length && a(f[0]).css({
						width: c.width,
						height: c.height
					}),
					d._updateCache(c),
					d._propagate("resize", b)
				}
			})
		}
	}),
	a.ui.plugin.add("resizable", "containment", {
		start: function(b, d) {
			var e = a(this).data("resizable"),
			f = e.options,
			g = e.element,
			h = f.containment,
			i = h instanceof a ? h.get(0) : /parent/.test(h) ? g.parent().get(0) : h;
			if (!i) return;
			e.containerElement = a(i);
			if (/document/.test(h) || h == document) e.containerOffset = {
					left: 0,
					top: 0
			},
			e.containerPosition = {
					left: 0,
					top: 0
			},
			e.parentData = {
					element: a(document),
					left: 0,
					top: 0,
					width: a(document).width(),
					height: a(document).height() || document.body.parentNode.scrollHeight
			};
			else {
				var j = a(i),
				k = [];
				a(["Top", "Right", "Left", "Bottom"]).each(function(a, b) {
					k[a] = c(j.css("padding" + b))
				}),
				e.containerOffset = j.offset(),
				e.containerPosition = j.position(),
				e.containerSize = {
					height: j.innerHeight() - k[3],
					width: j.innerWidth() - k[1]
				};
				var l = e.containerOffset,
				m = e.containerSize.height,
				n = e.containerSize.width,
				o = a.ui.hasScroll(i, "left") ? i.scrollWidth: n,
						p = a.ui.hasScroll(i) ? i.scrollHeight: m;
				e.parentData = {
						element: i,
						left: l.left,
						top: l.top,
						width: o,
						height: p
				}
			}
		},
		resize: function(b, c) {
			var d = a(this).data("resizable"),
			e = d.options,
			f = d.containerSize,
			g = d.containerOffset,
			h = d.size,
			i = d.position,
			j = d._aspectRatio || b.shiftKey,
			k = {
				top: 0,
				left: 0
			},
			l = d.containerElement;
			l[0] != document && /static/.test(l.css("position")) && (k = g),
			i.left < (d._helper ? g.left: 0) && (d.size.width = d.size.width + (d._helper ? d.position.left - g.left: d.position.left - k.left), j && (d.size.height = d.size.width / d.aspectRatio), d.position.left = e.helper ? g.left: 0),
			i.top < (d._helper ? g.top: 0) && (d.size.height = d.size.height + (d._helper ? d.position.top - g.top: d.position.top), j && (d.size.width = d.size.height * d.aspectRatio), d.position.top = d._helper ? g.top: 0),
			d.offset.left = d.parentData.left + d.position.left,
			d.offset.top = d.parentData.top + d.position.top;
			var m = Math.abs((d._helper ? d.offset.left - k.left: d.offset.left - k.left) + d.sizeDiff.width),
			n = Math.abs((d._helper ? d.offset.top - k.top: d.offset.top - g.top) + d.sizeDiff.height),
			o = d.containerElement.get(0) == d.element.parent().get(0),
			p = /relative|absolute/.test(d.containerElement.css("position"));
			o && p && (m -= d.parentData.left),
			m + d.size.width >= d.parentData.width && (d.size.width = d.parentData.width - m, j && (d.size.height = d.size.width / d.aspectRatio)),
			n + d.size.height >= d.parentData.height && (d.size.height = d.parentData.height - n, j && (d.size.width = d.size.height * d.aspectRatio))
		},
		stop: function(b, c) {
			var d = a(this).data("resizable"),
			e = d.options,
			f = d.position,
			g = d.containerOffset,
			h = d.containerPosition,
			i = d.containerElement,
			j = a(d.helper),
			k = j.offset(),
			l = j.outerWidth() - d.sizeDiff.width,
			m = j.outerHeight() - d.sizeDiff.height;
			d._helper && !e.animate && /relative/.test(i.css("position")) && a(this).css({
				left: k.left - h.left - g.left,
				width: l,
				height: m
			}),
			d._helper && !e.animate && /static/.test(i.css("position")) && a(this).css({
				left: k.left - h.left - g.left,
				width: l,
				height: m
			})
		}
	}),
	a.ui.plugin.add("resizable", "ghost", {
		start: function(b, c) {
			var d = a(this).data("resizable"),
			e = d.options,
			f = d.size;
			d.ghost = d.originalElement.clone(),
			d.ghost.css({
				opacity: .25,
				display: "block",
				position: "relative",
				height: f.height,
				width: f.width,
				margin: 0,
				left: 0,
				top: 0
			}).addClass("ui-resizable-ghost").addClass(typeof e.ghost == "string" ? e.ghost: ""),
			d.ghost.appendTo(d.helper)
		},
		resize: function(b, c) {
			var d = a(this).data("resizable"),
			e = d.options;
			d.ghost && d.ghost.css({
				position: "relative",
				height: d.size.height,
				width: d.size.width
			})
		},
		stop: function(b, c) {
			var d = a(this).data("resizable"),
			e = d.options;
			d.ghost && d.helper && d.helper.get(0).removeChild(d.ghost.get(0))
		}
	}),
	a.ui.plugin.add("resizable", "grid", {
		resize: function(b, c) {
			var d = a(this).data("resizable"),
			e = d.options,
			f = d.size,
			g = d.originalSize,
			h = d.originalPosition,
			i = d.axis,
			j = e._aspectRatio || b.shiftKey;
			e.grid = typeof e.grid == "number" ? [e.grid, e.grid] : e.grid;
			var k = Math.round((f.width - g.width) / (e.grid[0] || 1)) * (e.grid[0] || 1),
			l = Math.round((f.height - g.height) / (e.grid[1] || 1)) * (e.grid[1] || 1);
			/^(se|s|e)$/.test(i) ? (d.size.width = g.width + k, d.size.height = g.height + l) : /^(ne)$/.test(i) ? (d.size.width = g.width + k, d.size.height = g.height + l, d.position.top = h.top - l) : /^(sw)$/.test(i) ? (d.size.width = g.width + k, d.size.height = g.height + l, d.position.left = h.left - k) : (d.size.width = g.width + k, d.size.height = g.height + l, d.position.top = h.top - l, d.position.left = h.left - k)
		}
	});
	var c = function(a) {
		return parseInt(a, 10) || 0
	},
	d = function(a) {
		return ! isNaN(parseInt(a, 10))
	}
})(jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.autocomplete.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
	var c = 0;
	a.widget("ui.autocomplete", {
		options: {
			appendTo: "body",
			autoFocus: !1,
			delay: 300,
			minLength: 1,
			position: {
				my: "left top",
				at: "left bottom",
				collision: "none"
			},
			source: null
		},
		pending: 0,
		_create: function() {
			var b = this,
			c = this.element[0].ownerDocument,
			d;
			this.isMultiLine = this.element.is("textarea"),
			this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off").attr({
				role: "textbox",
				"aria-autocomplete": "list",
				"aria-haspopup": "true"
			}).bind("keydown.autocomplete",
					function(c) {
				if (b.options.disabled || b.element.propAttr("readOnly")) return;
				d = !1;
				var e = a.ui.keyCode;
				switch (c.keyCode) {
				case e.PAGE_UP:
					b._move("previousPage", c);
					break;
				case e.PAGE_DOWN:
					b._move("nextPage", c);
					break;
				case e.UP:
					b._keyEvent("previous", c);
					break;
				case e.DOWN:
					b._keyEvent("next", c);
					break;
				case e.ENTER:
				case e.NUMPAD_ENTER:
					b.menu.active && (d = !0, c.preventDefault());
				case e.TAB:
					if (!b.menu.active) return;
					b.menu.select(c);
					break;
				case e.ESCAPE:
					b.element.val(b.term),
					b.close(c);
					break;
				default:
					clearTimeout(b.searching),
					b.searching = setTimeout(function() {
						b.term != b.element.val() && (b.selectedItem = null, b.search(null, c))
					},
					b.options.delay)
				}
			}).bind("keypress.autocomplete",
					function(a) {
				d && (d = !1, a.preventDefault())
			}).bind("focus.autocomplete",
					function() {
				if (b.options.disabled) return;
				b.selectedItem = null,
				b.previous = b.element.val()
			}).bind("blur.autocomplete",
					function(a) {
				if (b.options.disabled) return;
				clearTimeout(b.searching),
				b.closing = setTimeout(function() {
					b.close(a),
					b._change(a)
				},
				150)
			}),
			this._initSource(),
			this.menu = a("<ul></ul>").addClass("ui-autocomplete").appendTo(a(this.options.appendTo || "body", c)[0]).mousedown(function(c) {
				var d = b.menu.element[0];
				a(c.target).closest(".ui-menu-item").length || setTimeout(function() {
					a(document).one("mousedown",
							function(c) {
						c.target !== b.element[0] && c.target !== d && !a.ui.contains(d, c.target) && b.close()
					})
				},
				1),
				setTimeout(function() {
					clearTimeout(b.closing)
				},
				13)
			}).menu({
				focus: function(a, c) {
					var d = c.item.data("item.autocomplete"); ! 1 !== b._trigger("focus", a, {
						item: d
					}) && /^key/.test(a.originalEvent.type) && b.element.val(d.value)
				},
				selected: function(a, d) {
					var e = d.item.data("item.autocomplete"),
					f = b.previous;
					b.element[0] !== c.activeElement && (b.element.focus(), b.previous = f, setTimeout(function() {
						b.previous = f,
						b.selectedItem = e
					},
					1)),
					!1 !== b._trigger("select", a, {
						item: e
					}) && b.element.val(e.value),
					b.term = b.element.val(),
					b.close(a),
					b.selectedItem = e
				},
				blur: function(a, c) {
					b.menu.element.is(":visible") && b.element.val() !== b.term && b.element.val(b.term)
				}
			}).zIndex(this.element.zIndex() + 1).css({
				top: 0,
				left: 0
			}).hide().data("menu"),
			a.fn.bgiframe && this.menu.element.bgiframe(),
			b.beforeunloadHandler = function() {
				b.element.removeAttr("autocomplete")
			},
			a(window).bind("beforeunload", b.beforeunloadHandler)
		},
		destroy: function() {
			this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup"),
			this.menu.element.remove(),
			a(window).unbind("beforeunload", this.beforeunloadHandler),
			a.Widget.prototype.destroy.call(this)
		},
		_setOption: function(b, c) {
			a.Widget.prototype._setOption.apply(this, arguments),
			b === "source" && this._initSource(),
			b === "appendTo" && this.menu.element.appendTo(a(c || "body", this.element[0].ownerDocument)[0]),
			b === "disabled" && c && this.xhr && this.xhr.abort()
		},
		_initSource: function() {
			var b = this,
			c, d;
			a.isArray(this.options.source) ? (c = this.options.source, this.source = function(b, d) {
				d(a.ui.autocomplete.filter(c, b.term))
			}) : typeof this.options.source == "string" ? (d = this.options.source, this.source = function(c, e) {
				b.xhr && b.xhr.abort(),
				b.xhr = a.ajax({
					url: d,
					data: c,
					dataType: "json",
					success: function(a, b) {
						e(a)
					},
					error: function() {
						e([])
					}
				})
			}) : this.source = this.options.source
		},
		search: function(a, b) {
			a = a != null ? a: this.element.val(),
					this.term = this.element.val();
			if (a.length < this.options.minLength) return this.close(b);
			clearTimeout(this.closing);
			if (this._trigger("search", b) === !1) return;
			return this._search(a)
		},
		_search: function(a) {
			this.pending++,
			this.element.addClass("ui-autocomplete-loading"),
			this.source({
				term: a
			},
			this._response())
		},
		_response: function() {
			var a = this,
			b = ++c;
			return function(d) {
				b === c && a.__response(d),
				a.pending--,
				a.pending || a.element.removeClass("ui-autocomplete-loading")
			}
		},
		__response: function(a) { ! this.options.disabled && a && a.length ? (a = this._normalize(a), this._suggest(a), this._trigger("open")) : this.close()
		},
		close: function(a) {
			clearTimeout(this.closing),
			this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.deactivate(), this._trigger("close", a))
		},
		_change: function(a) {
			this.previous !== this.element.val() && this._trigger("change", a, {
				item: this.selectedItem
			})
		},
		_normalize: function(b) {
			return b.length && b[0].label && b[0].value ? b: a.map(b,
					function(b) {
				return typeof b == "string" ? {
					label: b,
					value: b
				}: a.extend({
					label: b.label || b.value,
					value: b.value || b.label
				},
				b)
			})
		},
		_suggest: function(b) {
			var c = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
			this._renderMenu(c, b),
			this.menu.deactivate(),
			this.menu.refresh(),
			c.show(),
			this._resizeMenu(),
			c.position(a.extend({
				of: this.element
			},
			this.options.position)),
			this.options.autoFocus && this.menu.next(new a.Event("mouseover"))
		},
		_resizeMenu: function() {
			var a = this.menu.element;
			a.outerWidth(Math.max(a.width("").outerWidth() + 1, this.element.outerWidth()))
		},
		_renderMenu: function(b, c) {
			var d = this;
			a.each(c,
					function(a, c) {
				d._renderItem(b, c)
			})
		},
		_renderItem: function(b, c) {
			return a("<li></li>").data("item.autocomplete", c).append(a("<a></a>").text(c.label)).appendTo(b)
		},
		_move: function(a, b) {
			if (!this.menu.element.is(":visible")) {
				this.search(null, b);
				return
			}
			if (this.menu.first() && /^previous/.test(a) || this.menu.last() && /^next/.test(a)) {
				this.element.val(this.term),
				this.menu.deactivate();
				return
			}
			this.menu[a](b)
		},
		widget: function() {
			return this.menu.element
		},
		_keyEvent: function(a, b) {
			if (!this.isMultiLine || this.menu.element.is(":visible")) this._move(a, b),
			b.preventDefault()
		}
	}),
	a.extend(a.ui.autocomplete, {
		escapeRegex: function(a) {
			return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
		},
		filter: function(b, c) {
			var d = new RegExp(a.ui.autocomplete.escapeRegex(c), "i");
			return a.grep(b,
					function(a) {
				return d.test(a.label || a.value || a)
			})
		}
	})
})(jQuery),
function(a) {
	a.widget("ui.menu", {
		_create: function() {
			var b = this;
			this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({
				role: "listbox",
				"aria-activedescendant": "ui-active-menuitem"
			}).click(function(c) {
				if (!a(c.target).closest(".ui-menu-item a").length) return;
				c.preventDefault(),
				b.select(c)
			}),
			this.refresh()
		},
		refresh: function() {
			var b = this,
			c = this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "menuitem");
			c.children("a").addClass("ui-corner-all").attr("tabindex", -1).mouseenter(function(c) {
				b.activate(c, a(this).parent())
			}).mouseleave(function() {
				b.deactivate()
			})
		},
		activate: function(a, b) {
			this.deactivate();
			if (this.hasScroll()) {
				var c = b.offset().top - this.element.offset().top,
				d = this.element.scrollTop(),
				e = this.element.height();
				c < 0 ? this.element.scrollTop(d + c) : c >= e && this.element.scrollTop(d + c - e + b.height())
			}
			this.active = b.eq(0).children("a").addClass("ui-state-hover").attr("id", "ui-active-menuitem").end(),
			this._trigger("focus", a, {
				item: b
			})
		},
		deactivate: function() {
			if (!this.active) return;
			this.active.children("a").removeClass("ui-state-hover").removeAttr("id"),
			this._trigger("blur"),
			this.active = null
		},
		next: function(a) {
			this.move("next", ".ui-menu-item:first", a)
		},
		previous: function(a) {
			this.move("prev", ".ui-menu-item:last", a)
		},
		first: function() {
			return this.active && !this.active.prevAll(".ui-menu-item").length
		},
		last: function() {
			return this.active && !this.active.nextAll(".ui-menu-item").length
		},
		move: function(a, b, c) {
			if (!this.active) {
				this.activate(c, this.element.children(b));
				return
			}
			var d = this.active[a + "All"](".ui-menu-item").eq(0);
			d.length ? this.activate(c, d) : this.activate(c, this.element.children(b))
		},
		nextPage: function(b) {
			if (this.hasScroll()) {
				if (!this.active || this.last()) {
					this.activate(b, this.element.children(".ui-menu-item:first"));
					return
				}
				var c = this.active.offset().top,
				d = this.element.height(),
				e = this.element.children(".ui-menu-item").filter(function() {
					var b = a(this).offset().top - c - d + a(this).height();
					return b < 10 && b > -10
				});
				e.length || (e = this.element.children(".ui-menu-item:last")),
				this.activate(b, e)
			} else this.activate(b, this.element.children(".ui-menu-item").filter(!this.active || this.last() ? ":first": ":last"))
		},
		previousPage: function(b) {
			if (this.hasScroll()) {
				if (!this.active || this.first()) {
					this.activate(b, this.element.children(".ui-menu-item:last"));
					return
				}
				var c = this.active.offset().top,
				d = this.element.height(),
				e = this.element.children(".ui-menu-item").filter(function() {
					var b = a(this).offset().top - c + d - a(this).height();
					return b < 10 && b > -10
				});
				e.length || (e = this.element.children(".ui-menu-item:first")),
				this.activate(b, e)
			} else this.activate(b, this.element.children(".ui-menu-item").filter(!this.active || this.first() ? ":last": ":first"))
		},
		hasScroll: function() {
			return this.element.height() < this.element[a.fn.prop ? "prop": "attr"]("scrollHeight")
		},
		select: function(a) {
			this._trigger("selected", a, {
				item: this.active
			})
		}
	})
} (jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.button.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
	var c, d, e, f, g = "ui-button ui-widget ui-state-default ui-corner-all",
	h = "ui-state-hover ui-state-active ",
	i = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
	j = function() {
		var b = a(this).find(":ui-button");
		setTimeout(function() {
			b.button("refresh")
		},
		1)
	},
	k = function(b) {
		var c = b.name,
		d = b.form,
		e = a([]);
		return c && (d ? e = a(d).find("[name='" + c + "']") : e = a("[name='" + c + "']", b.ownerDocument).filter(function() {
			return ! this.form
		})),
		e
	};
	a.widget("ui.button", {
		options: {
			disabled: null,
			text: !0,
			label: null,
			icons: {
				primary: null,
				secondary: null
			}
		},
		_create: function() {
			this.element.closest("form").unbind("reset.button").bind("reset.button", j),
			typeof this.options.disabled != "boolean" ? this.options.disabled = !!this.element.propAttr("disabled") : this.element.propAttr("disabled", this.options.disabled),
					this._determineButtonType(),
					this.hasTitle = !!this.buttonElement.attr("title");
			var b = this,
			h = this.options,
			i = this.type === "checkbox" || this.type === "radio",
			l = "ui-state-hover" + (i ? "": " ui-state-active"),
			m = "ui-state-focus";
			h.label === null && (h.label = this.buttonElement.html()),
			this.buttonElement.addClass(g).attr("role", "button").bind("mouseenter.button",
					function() {
				if (h.disabled) return;
				a(this).addClass("ui-state-hover"),
				this === c && a(this).addClass("ui-state-active")
			}).bind("mouseleave.button",
					function() {
				if (h.disabled) return;
				a(this).removeClass(l)
			}).bind("click.button",
					function(a) {
				h.disabled && (a.preventDefault(), a.stopImmediatePropagation())
			}),
			this.element.bind("focus.button",
					function() {
				b.buttonElement.addClass(m)
			}).bind("blur.button",
					function() {
				b.buttonElement.removeClass(m)
			}),
			i && (this.element.bind("change.button",
					function() {
				if (f) return;
				b.refresh()
			}), this.buttonElement.bind("mousedown.button",
					function(a) {
				if (h.disabled) return;
				f = !1,
				d = a.pageX,
				e = a.pageY
			}).bind("mouseup.button",
					function(a) {
				if (h.disabled) return;
				if (d !== a.pageX || e !== a.pageY) f = !0
			})),
			this.type === "checkbox" ? this.buttonElement.bind("click.button",
					function() {
				if (h.disabled || f) return ! 1;
				a(this).toggleClass("ui-state-active"),
				b.buttonElement.attr("aria-pressed", b.element[0].checked)
			}) : this.type === "radio" ? this.buttonElement.bind("click.button",
					function() {
				if (h.disabled || f) return ! 1;
				a(this).addClass("ui-state-active"),
				b.buttonElement.attr("aria-pressed", "true");
				var c = b.element[0];
				k(c).not(c).map(function() {
					return a(this).button("widget")[0]
				}).removeClass("ui-state-active").attr("aria-pressed", "false")
			}) : (this.buttonElement.bind("mousedown.button",
					function() {
				if (h.disabled) return ! 1;
				a(this).addClass("ui-state-active"),
				c = this,
				a(document).one("mouseup",
						function() {
					c = null
				})
			}).bind("mouseup.button",
					function() {
				if (h.disabled) return ! 1;
				a(this).removeClass("ui-state-active")
			}).bind("keydown.button",
					function(b) {
				if (h.disabled) return ! 1; (b.keyCode == a.ui.keyCode.SPACE || b.keyCode == a.ui.keyCode.ENTER) && a(this).addClass("ui-state-active")
			}).bind("keyup.button",
					function() {
				a(this).removeClass("ui-state-active")
			}), this.buttonElement.is("a") && this.buttonElement.keyup(function(b) {
				b.keyCode === a.ui.keyCode.SPACE && a(this).click()
			})),
			this._setOption("disabled", h.disabled),
			this._resetButton()
		},
		_determineButtonType: function() {
			this.element.is(":checkbox") ? this.type = "checkbox": this.element.is(":radio") ? this.type = "radio": this.element.is("input") ? this.type = "input": this.type = "button";
			if (this.type === "checkbox" || this.type === "radio") {
				var a = this.element.parents().filter(":last"),
				b = "label[for='" + this.element.attr("id") + "']";
				this.buttonElement = a.find(b),
				this.buttonElement.length || (a = a.length ? a.siblings() : this.element.siblings(), this.buttonElement = a.filter(b), this.buttonElement.length || (this.buttonElement = a.find(b))),
				this.element.addClass("ui-helper-hidden-accessible");
				var c = this.element.is(":checked");
				c && this.buttonElement.addClass("ui-state-active"),
				this.buttonElement.attr("aria-pressed", c)
			} else this.buttonElement = this.element
		},
		widget: function() {
			return this.buttonElement
		},
		destroy: function() {
			this.element.removeClass("ui-helper-hidden-accessible"),
			this.buttonElement.removeClass(g + " " + h + " " + i).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),
			this.hasTitle || this.buttonElement.removeAttr("title"),
			a.Widget.prototype.destroy.call(this)
		},
		_setOption: function(b, c) {
			a.Widget.prototype._setOption.apply(this, arguments);
			if (b === "disabled") {
				c ? this.element.propAttr("disabled", !0) : this.element.propAttr("disabled", !1);
				return
			}
			this._resetButton()
		},
		refresh: function() {
			var b = this.element.is(":disabled");
			b !== this.options.disabled && this._setOption("disabled", b),
			this.type === "radio" ? k(this.element[0]).each(function() {
				a(this).is(":checked") ? a(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : a(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
			}) : this.type === "checkbox" && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
		},
		_resetButton: function() {
			if (this.type === "input") {
				this.options.label && this.element.val(this.options.label);
				return
			}
			var b = this.buttonElement.removeClass(i),
			c = a("<span></span>", this.element[0].ownerDocument).addClass("ui-button-text").html(this.options.label).appendTo(b.empty()).text(),
			d = this.options.icons,
			e = d.primary && d.secondary,
			f = [];
			d.primary || d.secondary ? (this.options.text && f.push("ui-button-text-icon" + (e ? "s": d.primary ? "-primary": "-secondary")), d.primary && b.prepend("<span class='ui-button-icon-primary ui-icon " + d.primary + "'></span>"), d.secondary && b.append("<span class='ui-button-icon-secondary ui-icon " + d.secondary + "'></span>"), this.options.text || (f.push(e ? "ui-button-icons-only": "ui-button-icon-only"), this.hasTitle || b.attr("title", c))) : f.push("ui-button-text-only"),
					b.addClass(f.join(" "))
		}
	}),
	a.widget("ui.buttonset", {
		options: {
			items: ":button, :submit, :reset, :checkbox, :radio, a, :data(button)"
		},
		_create: function() {
			this.element.addClass("ui-buttonset")
		},
		_init: function() {
			this.refresh()
		},
		_setOption: function(b, c) {
			b === "disabled" && this.buttons.button("option", b, c),
			a.Widget.prototype._setOption.apply(this, arguments)
		},
		refresh: function() {
			var b = this.element.css("direction") === "rtl";
			this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function() {
				return a(this).button("widget")[0]
			}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(b ? "ui-corner-right": "ui-corner-left").end().filter(":last").addClass(b ? "ui-corner-left": "ui-corner-right").end().end()
		},
		destroy: function() {
			this.element.removeClass("ui-buttonset"),
			this.buttons.map(function() {
				return a(this).button("widget")[0]
			}).removeClass("ui-corner-left ui-corner-right").end().button("destroy"),
			a.Widget.prototype.destroy.call(this)
		}
	})
})(jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.dialog.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
	var c = "ui-dialog ui-widget ui-widget-content ui-corner-all ",
	d = {
			buttons: !0,
			height: !0,
			maxHeight: !0,
			maxWidth: !0,
			minHeight: !0,
			minWidth: !0,
			width: !0
	},
	e = {
			maxHeight: !0,
			maxWidth: !0,
			minHeight: !0,
			minWidth: !0
	},
	f = a.attrFn || {
		val: !0,
		css: !0,
		html: !0,
		text: !0,
		data: !0,
		width: !0,
		height: !0,
		offset: !0,
		click: !0
	};
	a.widget("ui.dialog", {
		options: {
			autoOpen: !0,
			buttons: {},
			closeOnEscape: !0,
			closeText: "close",
			dialogClass: "",
			draggable: !0,
			hide: null,
			height: "auto",
			maxHeight: !1,
			maxWidth: !1,
			minHeight: 105,
			minWidth: 150,
			modal: !1,
			position: {
				my: "center",
				at: "center",
				collision: "fit",
				using: function(b) {
					var c = a(this).css(b).offset().top;
					c < 0 && a(this).css("top", b.top - c)
				}
			},
			resizable: !0,
			show: null,
			stack: !0,
			title: "",
			width: 300,
			zIndex: 1e3
		},
		_create: function() {
			this.originalTitle = this.element.attr("title"),
			typeof this.originalTitle != "string" && (this.originalTitle = ""),
			this.options.title = this.options.title || this.originalTitle;
			var b = this,
			d = b.options,
			e = d.title || "&#160;",
			f = a.ui.dialog.getTitleId(b.element),
			g = (b.uiDialog = a("<div></div>")).appendTo(document.body).hide().addClass(c + d.dialogClass).css({
				zIndex: d.zIndex
			}).attr("tabIndex", -1).css("outline", 0).keydown(function(c) {
				d.closeOnEscape && !c.isDefaultPrevented() && c.keyCode && c.keyCode === a.ui.keyCode.ESCAPE && (b.close(c), c.preventDefault())
			}).attr({
				role: "dialog",
				"aria-labelledby": f
			}).mousedown(function(a) {
				b.moveToTop(!1, a)
			}),
			h = b.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(g),
			i = (b.uiDialogTitlebar = a("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(g),
			j = a('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role", "button").hover(function() {
				j.addClass("ui-state-hover")
			},
			function() {
				j.removeClass("ui-state-hover")
			}).focus(function() {
				j.addClass("ui-state-focus")
			}).blur(function() {
				j.removeClass("ui-state-focus")
			}).click(function(a) {
				return b.close(a),
				!1
			}).appendTo(i),
			k = (b.uiDialogTitlebarCloseText = a("<span></span>")).addClass("ui-icon ui-icon-closethick").text(d.closeText).appendTo(j),
			l = a("<span></span>").addClass("ui-dialog-title").attr("id", f).html(e).prependTo(i);
			a.isFunction(d.beforeclose) && !a.isFunction(d.beforeClose) && (d.beforeClose = d.beforeclose),
			i.find("*").add(i).disableSelection(),
			d.draggable && a.fn.draggable && b._makeDraggable(),
			d.resizable && a.fn.resizable && b._makeResizable(),
			b._createButtons(d.buttons),
			b._isOpen = !1,
			a.fn.bgiframe && g.bgiframe()
		},
		_init: function() {
			this.options.autoOpen && this.open()
		},
		destroy: function() {
			var a = this;
			return a.overlay && a.overlay.destroy(),
			a.uiDialog.hide(),
			a.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"),
			a.uiDialog.remove(),
			a.originalTitle && a.element.attr("title", a.originalTitle),
			a
		},
		widget: function() {
			return this.uiDialog
		},
		close: function(b) {
			var c = this,
			d, e;
			if (!1 === c._trigger("beforeClose", b)) return;
			return c.overlay && c.overlay.destroy(),
			c.uiDialog.unbind("keypress.ui-dialog"),
			c._isOpen = !1,
			c.options.hide ? c.uiDialog.hide(c.options.hide,
					function() {
				c._trigger("close", b)
			}) : (c.uiDialog.hide(), c._trigger("close", b)),
			a.ui.dialog.overlay.resize(),
			c.options.modal && (d = 0, a(".ui-dialog").each(function() {
				this !== c.uiDialog[0] && (e = a(this).css("z-index"), isNaN(e) || (d = Math.max(d, e)))
			}), a.ui.dialog.maxZ = d),
			c
		},
		isOpen: function() {
			return this._isOpen
		},
		moveToTop: function(b, c) {
			var d = this,
			e = d.options,
			f;
			return e.modal && !b || !e.stack && !e.modal ? d._trigger("focus", c) : (e.zIndex > a.ui.dialog.maxZ && (a.ui.dialog.maxZ = e.zIndex), d.overlay && (a.ui.dialog.maxZ += 1, d.overlay.$el.css("z-index", a.ui.dialog.overlay.maxZ = a.ui.dialog.maxZ)), f = {
					scrollTop: d.element.scrollTop(),
					scrollLeft: d.element.scrollLeft()
			},
			a.ui.dialog.maxZ += 1, d.uiDialog.css("z-index", a.ui.dialog.maxZ), d.element.attr(f), d._trigger("focus", c), d)
		},
		open: function() {
			if (this._isOpen) return;
			var b = this,
			c = b.options,
			d = b.uiDialog;
			return b.overlay = c.modal ? new a.ui.dialog.overlay(b) : null,
					b._size(),
					b._position(c.position),
					d.show(c.show),
					b.moveToTop(!0),
					c.modal && d.bind("keydown.ui-dialog",
							function(b) {
						if (b.keyCode !== a.ui.keyCode.TAB) return;
						var c = a(":tabbable", this),
						d = c.filter(":first"),
						e = c.filter(":last");
						if (b.target === e[0] && !b.shiftKey) return d.focus(1),
						!1;
						if (b.target === d[0] && b.shiftKey) return e.focus(1),
						!1
					}),
					a(b.element.find(":tabbable").get().concat(d.find(".ui-dialog-buttonpane :tabbable").get().concat(d.get()))).eq(0).focus(),
					b._isOpen = !0,
					b._trigger("open"),
					b
		},
		_createButtons: function(b) {
			var c = this,
			d = !1,
			e = a("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),
			g = a("<div></div>").addClass("ui-dialog-buttonset").appendTo(e);
			c.uiDialog.find(".ui-dialog-buttonpane").remove(),
			typeof b == "object" && b !== null && a.each(b,
					function() {
				return ! (d = !0)
			}),
			d && (a.each(b,
					function(b, d) {
				d = a.isFunction(d) ? {
					click: d,
					text: b
				}: d;
				var e = a('<button type="button"></button>').click(function() {
					d.click.apply(c.element[0], arguments)
				}).appendTo(g);
				a.each(d,
						function(a, b) {
					if (a === "click") return;
					a in f ? e[a](b) : e.attr(a, b)
				}),
				a.fn.button && e.button()
			}), e.appendTo(c.uiDialog))
		},
		_makeDraggable: function() {
			function f(a) {
				return {
					position: a.position,
					offset: a.offset
				}
			}
			var b = this,
			c = b.options,
			d = a(document),
			e;
			b.uiDialog.draggable({
				cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
				handle: ".ui-dialog-titlebar",
				containment: "document",
				start: function(d, g) {
					e = c.height === "auto" ? "auto": a(this).height(),
							a(this).height(a(this).height()).addClass("ui-dialog-dragging"),
							b._trigger("dragStart", d, f(g))
				},
				drag: function(a, c) {
					b._trigger("drag", a, f(c))
				},
				stop: function(g, h) {
					c.position = [h.position.left - d.scrollLeft(), h.position.top - d.scrollTop()],
					a(this).removeClass("ui-dialog-dragging").height(e),
					b._trigger("dragStop", g, f(h)),
					a.ui.dialog.overlay.resize()
				}
			})
		},
		_makeResizable: function(c) {
			function h(a) {
				return {
					originalPosition: a.originalPosition,
					originalSize: a.originalSize,
					position: a.position,
					size: a.size
				}
			}
			c = c === b ? this.options.resizable: c;
			var d = this,
			e = d.options,
			f = d.uiDialog.css("position"),
			g = typeof c == "string" ? c: "n,e,s,w,se,sw,ne,nw";
			d.uiDialog.resizable({
				cancel: ".ui-dialog-content",
				containment: "document",
				alsoResize: d.element,
				maxWidth: e.maxWidth,
				maxHeight: e.maxHeight,
				minWidth: e.minWidth,
				minHeight: d._minHeight(),
				handles: g,
				start: function(b, c) {
					a(this).addClass("ui-dialog-resizing"),
					d._trigger("resizeStart", b, h(c))
				},
				resize: function(a, b) {
					d._trigger("resize", a, h(b))
				},
				stop: function(b, c) {
					a(this).removeClass("ui-dialog-resizing"),
					e.height = a(this).height(),
					e.width = a(this).width(),
					d._trigger("resizeStop", b, h(c)),
					a.ui.dialog.overlay.resize()
				}
			}).css("position", f).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
		},
		_minHeight: function() {
			var a = this.options;
			return a.height === "auto" ? a.minHeight: Math.min(a.minHeight, a.height)
		},
		_position: function(b) {
			var c = [],
			d = [0, 0],
			e;
			if (b) {
				if (typeof b == "string" || typeof b == "object" && "0" in b) c = b.split ? b.split(" ") : [b[0], b[1]],
						c.length === 1 && (c[1] = c[0]),
						a.each(["left", "top"],
								function(a, b) { + c[a] === c[a] && (d[a] = c[a], c[a] = b)
						}),
						b = {
						my: c.join(" "),
						at: c.join(" "),
						offset: d.join(" ")
				};
				b = a.extend({},
						a.ui.dialog.prototype.options.position, b)
			} else b = a.ui.dialog.prototype.options.position;
			e = this.uiDialog.is(":visible"),
			e || this.uiDialog.show(),
			this.uiDialog.css({
				top: 0,
				left: 0
			}).position(a.extend({
				of: window
			},
			b)),
			e || this.uiDialog.hide()
		},
		_setOptions: function(b) {
			var c = this,
			f = {},
			g = !1;
			a.each(b,
					function(a, b) {
				c._setOption(a, b),
				a in d && (g = !0),
				a in e && (f[a] = b)
			}),
			g && this._size(),
			this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", f)
		},
		_setOption: function(b, d) {
			var e = this,
			f = e.uiDialog;
			switch (b) {
			case "beforeclose":
				b = "beforeClose";
				break;
			case "buttons":
				e._createButtons(d);
				break;
			case "closeText":
				e.uiDialogTitlebarCloseText.text("" + d);
				break;
			case "dialogClass":
				f.removeClass(e.options.dialogClass).addClass(c + d);
				break;
			case "disabled":
				d ? f.addClass("ui-dialog-disabled") : f.removeClass("ui-dialog-disabled");
				break;
			case "draggable":
				var g = f.is(":data(draggable)");
				g && !d && f.draggable("destroy"),
				!g && d && e._makeDraggable();
				break;
			case "position":
				e._position(d);
				break;
			case "resizable":
				var h = f.is(":data(resizable)");
				h && !d && f.resizable("destroy"),
				h && typeof d == "string" && f.resizable("option", "handles", d),
				!h && d !== !1 && e._makeResizable(d);
				break;
			case "title":
				a(".ui-dialog-title", e.uiDialogTitlebar).html("" + (d || "&#160;"))
			}
			a.Widget.prototype._setOption.apply(e, arguments)
		},
		_size: function() {
			var b = this.options,
			c, d, e = this.uiDialog.is(":visible");
			this.element.show().css({
				width: "auto",
				minHeight: 0,
				height: 0
			}),
			b.minWidth > b.width && (b.width = b.minWidth),
			c = this.uiDialog.css({
				height: "auto",
				width: b.width
			}).height(),
			d = Math.max(0, b.minHeight - c);
			if (b.height === "auto") if (a.support.minHeight) this.element.css({
				minHeight: d,
				height: "auto"
			});
			else {
				this.uiDialog.show();
				var f = this.element.css("height", "auto").height();
				e || this.uiDialog.hide(),
				this.element.height(Math.max(f, d))
			} else this.element.height(Math.max(b.height - c, 0));
			this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
		}
	}),
	a.extend(a.ui.dialog, {
		version: "1.8.21",
		uuid: 0,
		maxZ: 0,
		getTitleId: function(a) {
			var b = a.attr("id");
			return b || (this.uuid += 1, b = this.uuid),
			"ui-dialog-title-" + b
		},
		overlay: function(b) {
			this.$el = a.ui.dialog.overlay.create(b)
		}
	}),
	a.extend(a.ui.dialog.overlay, {
		instances: [],
		oldInstances: [],
		maxZ: 0,
		events: a.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),
				function(a) {
			return a + ".dialog-overlay"
		}).join(" "),
		create: function(b) {
			this.instances.length === 0 && (setTimeout(function() {
				a.ui.dialog.overlay.instances.length && a(document).bind(a.ui.dialog.overlay.events,
						function(b) {
					if (a(b.target).zIndex() < a.ui.dialog.overlay.maxZ) return ! 1
				})
			},
			1), a(document).bind("keydown.dialog-overlay",
					function(c) {
				b.options.closeOnEscape && !c.isDefaultPrevented() && c.keyCode && c.keyCode === a.ui.keyCode.ESCAPE && (b.close(c), c.preventDefault())
			}), a(window).bind("resize.dialog-overlay", a.ui.dialog.overlay.resize));
			var c = (this.oldInstances.pop() || a("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({
				width: this.width(),
				height: this.height()
			});
			return a.fn.bgiframe && c.bgiframe(),
			this.instances.push(c),
			c
		},
		destroy: function(b) {
			var c = a.inArray(b, this.instances);
			c != -1 && this.oldInstances.push(this.instances.splice(c, 1)[0]),
			this.instances.length === 0 && a([document, window]).unbind(".dialog-overlay"),
			b.remove();
			var d = 0;
			a.each(this.instances,
					function() {
				d = Math.max(d, this.css("z-index"))
			}),
			this.maxZ = d
		},
		height: function() {
			var b, c;
			return a.browser.msie && a.browser.version < 7 ? (b = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight), c = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight), b < c ? a(window).height() + "px": b + "px") : a(document).height() + "px"
		},
		width: function() {
			var b, c;
			return a.browser.msie ? (b = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth), c = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth), b < c ? a(window).width() + "px": b + "px") : a(document).width() + "px"
		},
		resize: function() {
			var b = a([]);
			a.each(a.ui.dialog.overlay.instances,
					function() {
				b = b.add(this)
			}),
			b.css({
				width: 0,
				height: 0
			}).css({
				width: a.ui.dialog.overlay.width(),
				height: a.ui.dialog.overlay.height()
			})
		}
	}),
	a.extend(a.ui.dialog.overlay.prototype, {
		destroy: function() {
			a.ui.dialog.overlay.destroy(this.$el)
		}
	})
})(jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.slider.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
	var c = 5;
	a.widget("ui.slider", a.ui.mouse, {
		widgetEventPrefix: "slide",
		options: {
			animate: !1,
			distance: 0,
			max: 100,
			min: 0,
			orientation: "horizontal",
			range: !1,
			step: 1,
			value: 0,
			values: null
		},
		_create: function() {
			var b = this,
			d = this.options,
			e = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
			f = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
			g = d.values && d.values.length || 1,
			h = [];
			this._keySliding = !1,
			this._mouseSliding = !1,
			this._animateOff = !0,
			this._handleIndex = null,
			this._detectOrientation(),
			this._mouseInit(),
			this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget" + " ui-widget-content" + " ui-corner-all" + (d.disabled ? " ui-slider-disabled ui-disabled": "")),
			this.range = a([]),
			d.range && (d.range === !0 && (d.values || (d.values = [this._valueMin(), this._valueMin()]), d.values.length && d.values.length !== 2 && (d.values = [d.values[0], d.values[0]])), this.range = a("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header" + (d.range === "min" || d.range === "max" ? " ui-slider-range-" + d.range: "")));
			for (var i = e.length; i < g; i += 1) h.push(f);
			this.handles = e.add(a(h.join("")).appendTo(b.element)),
			this.handle = this.handles.eq(0),
			this.handles.add(this.range).filter("a").click(function(a) {
				a.preventDefault()
			}).hover(function() {
				d.disabled || a(this).addClass("ui-state-hover")
			},
			function() {
				a(this).removeClass("ui-state-hover")
			}).focus(function() {
				d.disabled ? a(this).blur() : (a(".ui-slider .ui-state-focus").removeClass("ui-state-focus"), a(this).addClass("ui-state-focus"))
			}).blur(function() {
				a(this).removeClass("ui-state-focus")
			}),
			this.handles.each(function(b) {
				a(this).data("index.ui-slider-handle", b)
			}),
			this.handles.keydown(function(d) {
				var e = a(this).data("index.ui-slider-handle"),
				f,
				g,
				h,
				i;
				if (b.options.disabled) return;
				switch (d.keyCode) {
				case a.ui.keyCode.HOME:
				case a.ui.keyCode.END:
				case a.ui.keyCode.PAGE_UP:
				case a.ui.keyCode.PAGE_DOWN:
				case a.ui.keyCode.UP:
				case a.ui.keyCode.RIGHT:
				case a.ui.keyCode.DOWN:
				case a.ui.keyCode.LEFT:
					d.preventDefault();
					if (!b._keySliding) {
						b._keySliding = !0,
						a(this).addClass("ui-state-active"),
						f = b._start(d, e);
						if (f === !1) return
					}
				}
				i = b.options.step,
				b.options.values && b.options.values.length ? g = h = b.values(e) : g = h = b.value();
				switch (d.keyCode) {
				case a.ui.keyCode.HOME:
					h = b._valueMin();
					break;
				case a.ui.keyCode.END:
					h = b._valueMax();
					break;
				case a.ui.keyCode.PAGE_UP:
					h = b._trimAlignValue(g + (b._valueMax() - b._valueMin()) / c);
					break;
				case a.ui.keyCode.PAGE_DOWN:
					h = b._trimAlignValue(g - (b._valueMax() - b._valueMin()) / c);
					break;
				case a.ui.keyCode.UP:
				case a.ui.keyCode.RIGHT:
					if (g === b._valueMax()) return;
					h = b._trimAlignValue(g + i);
					break;
				case a.ui.keyCode.DOWN:
				case a.ui.keyCode.LEFT:
					if (g === b._valueMin()) return;
					h = b._trimAlignValue(g - i)
				}
				b._slide(d, e, h)
			}).keyup(function(c) {
				var d = a(this).data("index.ui-slider-handle");
				b._keySliding && (b._keySliding = !1, b._stop(c, d), b._change(c, d), a(this).removeClass("ui-state-active"))
			}),
			this._refreshValue(),
			this._animateOff = !1
		},
		destroy: function() {
			return this.handles.remove(),
			this.range.remove(),
			this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider"),
			this._mouseDestroy(),
			this
		},
		_mouseCapture: function(b) {
			var c = this.options,
			d, e, f, g, h, i, j, k, l;
			return c.disabled ? !1 : (this.elementSize = {
					width: this.element.outerWidth(),
					height: this.element.outerHeight()
			},
			this.elementOffset = this.element.offset(), d = {
				x: b.pageX,
				y: b.pageY
			},
			e = this._normValueFromMouse(d), f = this._valueMax() - this._valueMin() + 1, h = this, this.handles.each(function(b) {
				var c = Math.abs(e - h.values(b));
				f > c && (f = c, g = a(this), i = b)
			}), c.range === !0 && this.values(1) === c.min && (i += 1, g = a(this.handles[i])), j = this._start(b, i), j === !1 ? !1 : (this._mouseSliding = !0, h._handleIndex = i, g.addClass("ui-state-active").focus(), k = g.offset(), l = !a(b.target).parents().andSelf().is(".ui-slider-handle"), this._clickOffset = l ? {
				left: 0,
				top: 0
			}: {
				left: b.pageX - k.left - g.width() / 2,
				top: b.pageY - k.top - g.height() / 2 - (parseInt(g.css("borderTopWidth"), 10) || 0) - (parseInt(g.css("borderBottomWidth"), 10) || 0) + (parseInt(g.css("marginTop"), 10) || 0)
			},
			this.handles.hasClass("ui-state-hover") || this._slide(b, i, e), this._animateOff = !0, !0))
		},
		_mouseStart: function(a) {
			return ! 0
		},
		_mouseDrag: function(a) {
			var b = {
					x: a.pageX,
					y: a.pageY
			},
			c = this._normValueFromMouse(b);
			return this._slide(a, this._handleIndex, c),
			!1
		},
		_mouseStop: function(a) {
			return this.handles.removeClass("ui-state-active"),
			this._mouseSliding = !1,
			this._stop(a, this._handleIndex),
			this._change(a, this._handleIndex),
			this._handleIndex = null,
			this._clickOffset = null,
			this._animateOff = !1,
			!1
		},
		_detectOrientation: function() {
			this.orientation = this.options.orientation === "vertical" ? "vertical": "horizontal"
		},
		_normValueFromMouse: function(a) {
			var b, c, d, e, f;
			return this.orientation === "horizontal" ? (b = this.elementSize.width, c = a.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left: 0)) : (b = this.elementSize.height, c = a.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top: 0)),
					d = c / b,
					d > 1 && (d = 1),
					d < 0 && (d = 0),
					this.orientation === "vertical" && (d = 1 - d),
					e = this._valueMax() - this._valueMin(),
					f = this._valueMin() + d * e,
					this._trimAlignValue(f)
		},
		_start: function(a, b) {
			var c = {
					handle: this.handles[b],
					value: this.value()
			};
			return this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()),
			this._trigger("start", a, c)
		},
		_slide: function(a, b, c) {
			var d, e, f;
			this.options.values && this.options.values.length ? (d = this.values(b ? 0 : 1), this.options.values.length === 2 && this.options.range === !0 && (b === 0 && c > d || b === 1 && c < d) && (c = d), c !== this.values(b) && (e = this.values(), e[b] = c, f = this._trigger("slide", a, {
				handle: this.handles[b],
				value: c,
				values: e
			}), d = this.values(b ? 0 : 1), f !== !1 && this.values(b, c, !0))) : c !== this.value() && (f = this._trigger("slide", a, {
				handle: this.handles[b],
				value: c
			}), f !== !1 && this.value(c))
		},
		_stop: function(a, b) {
			var c = {
					handle: this.handles[b],
					value: this.value()
			};
			this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()),
			this._trigger("stop", a, c)
		},
		_change: function(a, b) {
			if (!this._keySliding && !this._mouseSliding) {
				var c = {
						handle: this.handles[b],
						value: this.value()
				};
				this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()),
				this._trigger("change", a, c)
			}
		},
		value: function(a) {
			if (arguments.length) {
				this.options.value = this._trimAlignValue(a),
				this._refreshValue(),
				this._change(null, 0);
				return
			}
			return this._value()
		},
		values: function(b, c) {
			var d, e, f;
			if (arguments.length > 1) {
				this.options.values[b] = this._trimAlignValue(c),
				this._refreshValue(),
				this._change(null, b);
				return
			}
			if (!arguments.length) return this._values();
			if (!a.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(b) : this.value();
			d = this.options.values,
			e = arguments[0];
			for (f = 0; f < d.length; f += 1) d[f] = this._trimAlignValue(e[f]),
			this._change(null, f);
			this._refreshValue()
		},
		_setOption: function(b, c) {
			var d, e = 0;
			a.isArray(this.options.values) && (e = this.options.values.length),
			a.Widget.prototype._setOption.apply(this, arguments);
			switch (b) {
			case "disabled":
				c ? (this.handles.filter(".ui-state-focus").blur(), this.handles.removeClass("ui-state-hover"), this.handles.propAttr("disabled", !0), this.element.addClass("ui-disabled")) : (this.handles.propAttr("disabled", !1), this.element.removeClass("ui-disabled"));
				break;
			case "orientation":
				this._detectOrientation(),
				this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation),
				this._refreshValue();
				break;
			case "value":
				this._animateOff = !0,
				this._refreshValue(),
				this._change(null, 0),
				this._animateOff = !1;
				break;
			case "values":
				this._animateOff = !0,
				this._refreshValue();
				for (d = 0; d < e; d += 1) this._change(null, d);
				this._animateOff = !1
			}
		},
		_value: function() {
			var a = this.options.value;
			return a = this._trimAlignValue(a),
			a
		},
		_values: function(a) {
			var b, c, d;
			if (arguments.length) return b = this.options.values[a],
			b = this._trimAlignValue(b),
			b;
			c = this.options.values.slice();
			for (d = 0; d < c.length; d += 1) c[d] = this._trimAlignValue(c[d]);
			return c
		},
		_trimAlignValue: function(a) {
			if (a <= this._valueMin()) return this._valueMin();
			if (a >= this._valueMax()) return this._valueMax();
			var b = this.options.step > 0 ? this.options.step: 1,
					c = (a - this._valueMin()) % b,
					d = a - c;
			return Math.abs(c) * 2 >= b && (d += c > 0 ? b: -b),
			parseFloat(d.toFixed(5))
		},
		_valueMin: function() {
			return this.options.min
		},
		_valueMax: function() {
			return this.options.max
		},
		_refreshValue: function() {
			var b = this.options.range,
			c = this.options,
			d = this,
			e = this._animateOff ? !1 : c.animate,
					f,
					g = {},
					h,
					i,
					j,
					k;
			this.options.values && this.options.values.length ? this.handles.each(function(b, i) {
				f = (d.values(b) - d._valueMin()) / (d._valueMax() - d._valueMin()) * 100,
				g[d.orientation === "horizontal" ? "left": "bottom"] = f + "%",
				a(this).stop(1, 1)[e ? "animate": "css"](g, c.animate),
				d.options.range === !0 && (d.orientation === "horizontal" ? (b === 0 && d.range.stop(1, 1)[e ? "animate": "css"]({
					left: f + "%"
				},
				c.animate), b === 1 && d.range[e ? "animate": "css"]({
					width: f - h + "%"
				},
				{
					queue: !1,
					duration: c.animate
				})) : (b === 0 && d.range.stop(1, 1)[e ? "animate": "css"]({
					bottom: f + "%"
				},
				c.animate), b === 1 && d.range[e ? "animate": "css"]({
					height: f - h + "%"
				},
				{
					queue: !1,
					duration: c.animate
				}))),
				h = f
			}) : (i = this.value(), j = this._valueMin(), k = this._valueMax(), f = k !== j ? (i - j) / (k - j) * 100 : 0, g[d.orientation === "horizontal" ? "left": "bottom"] = f + "%", this.handle.stop(1, 1)[e ? "animate": "css"](g, c.animate), b === "min" && this.orientation === "horizontal" && this.range.stop(1, 1)[e ? "animate": "css"]({
				width: f + "%"
			},
			c.animate), b === "max" && this.orientation === "horizontal" && this.range[e ? "animate": "css"]({
				width: 100 - f + "%"
			},
			{
				queue: !1,
				duration: c.animate
			}), b === "min" && this.orientation === "vertical" && this.range.stop(1, 1)[e ? "animate": "css"]({
				height: f + "%"
			},
			c.animate), b === "max" && this.orientation === "vertical" && this.range[e ? "animate": "css"]({
				height: 100 - f + "%"
			},
			{
				queue: !1,
				duration: c.animate
			}))
		}
	}),
	a.extend(a.ui.slider, {
		version: "1.8.21"
	})
})(jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.tabs.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
	function e() {
		return++c
	}
	function f() {
		return++d
	}
	var c = 0,
	d = 0;
	a.widget("ui.tabs", {
		options: {
			add: null,
			ajaxOptions: null,
			cache: !1,
			cookie: null,
			collapsible: !1,
			disable: null,
			disabled: [],
			enable: null,
			event: "click",
			fx: null,
			idPrefix: "ui-tabs-",
			load: null,
			panelTemplate: "<div></div>",
			remove: null,
			select: null,
			show: null,
			spinner: "<em>Loading&#8230;</em>",
			tabTemplate: "<li><a href='#{href}'><span>#{label}</span></a></li>"
		},
		_create: function() {
			this._tabify(!0)
		},
		_setOption: function(a, b) {
			if (a == "selected") {
				if (this.options.collapsible && b == this.options.selected) return;
				this.select(b)
			} else this.options[a] = b,
			this._tabify()
		},
		_tabId: function(a) {
			return a.title && a.title.replace(/\s/g, "_").replace(/[^\w\u00c0-\uFFFF-]/g, "") || this.options.idPrefix + e()
		},
		_sanitizeSelector: function(a) {
			return a.replace(/:/g, "\\:")
		},
		_cookie: function() {
			var b = this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + f());
			return a.cookie.apply(null, [b].concat(a.makeArray(arguments)))
		},
		_ui: function(a, b) {
			return {
				tab: a,
				panel: b,
				index: this.anchors.index(a)
			}
		},
		_cleanup: function() {
			this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function() {
				var b = a(this);
				b.html(b.data("label.tabs")).removeData("label.tabs")
			})
		},
		_tabify: function(c) {
			function m(b, c) {
				b.css("display", ""),
				!a.support.opacity && c.opacity && b[0].style.removeAttribute("filter")
			}
			var d = this,
			e = this.options,
			f = /^#.+/;
			this.list = this.element.find("ol,ul").eq(0),
			this.lis = a(" > li:has(a[href])", this.list),
			this.anchors = this.lis.map(function() {
				return a("a", this)[0]
			}),
			this.panels = a([]),
			this.anchors.each(function(b, c) {
				var g = a(c).attr("href"),
				h = g.split("#")[0],
				i;
				h && (h === location.toString().split("#")[0] || (i = a("base")[0]) && h === i.href) && (g = c.hash, c.href = g);
				if (f.test(g)) d.panels = d.panels.add(d.element.find(d._sanitizeSelector(g)));
				else if (g && g !== "#") {
					a.data(c, "href.tabs", g),
					a.data(c, "load.tabs", g.replace(/#.*$/, ""));
					var j = d._tabId(c);
					c.href = "#" + j;
					var k = d.element.find("#" + j);
					k.length || (k = a(e.panelTemplate).attr("id", j).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(d.panels[b - 1] || d.list), k.data("destroy.tabs", !0)),
					d.panels = d.panels.add(k)
				} else e.disabled.push(b)
			}),
			c ? (this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all"), this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"), this.lis.addClass("ui-state-default ui-corner-top"), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom"), e.selected === b ? (location.hash && this.anchors.each(function(a, b) {
				if (b.hash == location.hash) return e.selected = a,
				!1
			}), typeof e.selected != "number" && e.cookie && (e.selected = parseInt(d._cookie(), 10)), typeof e.selected != "number" && this.lis.filter(".ui-tabs-selected").length && (e.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"))), e.selected = e.selected || (this.lis.length ? 0 : -1)) : e.selected === null && (e.selected = -1), e.selected = e.selected >= 0 && this.anchors[e.selected] || e.selected < 0 ? e.selected: 0, e.disabled = a.unique(e.disabled.concat(a.map(this.lis.filter(".ui-state-disabled"),
					function(a, b) {
				return d.lis.index(a)
			}))).sort(), a.inArray(e.selected, e.disabled) != -1 && e.disabled.splice(a.inArray(e.selected, e.disabled), 1), this.panels.addClass("ui-tabs-hide"), this.lis.removeClass("ui-tabs-selected ui-state-active"), e.selected >= 0 && this.anchors.length && (d.element.find(d._sanitizeSelector(d.anchors[e.selected].hash)).removeClass("ui-tabs-hide"), this.lis.eq(e.selected).addClass("ui-tabs-selected ui-state-active"), d.element.queue("tabs",
					function() {
				d._trigger("show", null, d._ui(d.anchors[e.selected], d.element.find(d._sanitizeSelector(d.anchors[e.selected].hash))[0]))
			}), this.load(e.selected)), a(window).bind("unload",
					function() {
				d.lis.add(d.anchors).unbind(".tabs"),
				d.lis = d.anchors = d.panels = null
			})) : e.selected = this.lis.index(this.lis.filter(".ui-tabs-selected")),
			this.element[e.collapsible ? "addClass": "removeClass"]("ui-tabs-collapsible"),
			e.cookie && this._cookie(e.selected, e.cookie);
			for (var g = 0,
					h; h = this.lis[g]; g++) a(h)[a.inArray(g, e.disabled) != -1 && !a(h).hasClass("ui-tabs-selected") ? "addClass": "removeClass"]("ui-state-disabled");
			e.cache === !1 && this.anchors.removeData("cache.tabs"),
			this.lis.add(this.anchors).unbind(".tabs");
			if (e.event !== "mouseover") {
				var i = function(a, b) {
					b.is(":not(.ui-state-disabled)") && b.addClass("ui-state-" + a)
				},
				j = function(a, b) {
					b.removeClass("ui-state-" + a)
				};
				this.lis.bind("mouseover.tabs",
						function() {
					i("hover", a(this))
				}),
				this.lis.bind("mouseout.tabs",
						function() {
					j("hover", a(this))
				}),
				this.anchors.bind("focus.tabs",
						function() {
					i("focus", a(this).closest("li"))
				}),
				this.anchors.bind("blur.tabs",
						function() {
					j("focus", a(this).closest("li"))
				})
			}
			var k, l;
			e.fx && (a.isArray(e.fx) ? (k = e.fx[0], l = e.fx[1]) : k = l = e.fx);
			var n = l ?
					function(b, c) {
				a(b).closest("li").addClass("ui-tabs-selected ui-state-active"),
				c.hide().removeClass("ui-tabs-hide").animate(l, l.duration || "normal",
						function() {
					m(c, l),
					d._trigger("show", null, d._ui(b, c[0]))
				})
			}: function(b, c) {
				a(b).closest("li").addClass("ui-tabs-selected ui-state-active"),
				c.removeClass("ui-tabs-hide"),
				d._trigger("show", null, d._ui(b, c[0]))
			},
			o = k ?
					function(a, b) {
				b.animate(k, k.duration || "normal",
						function() {
					d.lis.removeClass("ui-tabs-selected ui-state-active"),
					b.addClass("ui-tabs-hide"),
					m(b, k),
					d.element.dequeue("tabs")
				})
			}: function(a, b, c) {
				d.lis.removeClass("ui-tabs-selected ui-state-active"),
				b.addClass("ui-tabs-hide"),
				d.element.dequeue("tabs")
			};
			this.anchors.bind(e.event + ".tabs",
					function() {
				var b = this,
				c = a(b).closest("li"),
				f = d.panels.filter(":not(.ui-tabs-hide)"),
				g = d.element.find(d._sanitizeSelector(b.hash));
				if (c.hasClass("ui-tabs-selected") && !e.collapsible || c.hasClass("ui-state-disabled") || c.hasClass("ui-state-processing") || d.panels.filter(":animated").length || d._trigger("select", null, d._ui(this, g[0])) === !1) return this.blur(),
				!1;
				e.selected = d.anchors.index(this),
				d.abort();
				if (e.collapsible) {
					if (c.hasClass("ui-tabs-selected")) return e.selected = -1,
					e.cookie && d._cookie(e.selected, e.cookie),
					d.element.queue("tabs",
							function() {
						o(b, f)
					}).dequeue("tabs"),
					this.blur(),
					!1;
					if (!f.length) return e.cookie && d._cookie(e.selected, e.cookie),
					d.element.queue("tabs",
							function() {
						n(b, g)
					}),
					d.load(d.anchors.index(this)),
					this.blur(),
					!1
				}
				e.cookie && d._cookie(e.selected, e.cookie);
				if (g.length) f.length && d.element.queue("tabs",
						function() {
					o(b, f)
				}),
				d.element.queue("tabs",
						function() {
					n(b, g)
				}),
				d.load(d.anchors.index(this));
				else throw "jQuery UI Tabs: Mismatching fragment identifier.";
				a.browser.msie && this.blur()
			}),
			this.anchors.bind("click.tabs",
					function() {
				return ! 1
			})
		},
		_getIndex: function(a) {
			return typeof a == "string" && (a = this.anchors.index(this.anchors.filter("[href$='" + a + "']"))),
			a
		},
		destroy: function() {
			var b = this.options;
			return this.abort(),
			this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs"),
			this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"),
			this.anchors.each(function() {
				var b = a.data(this, "href.tabs");
				b && (this.href = b);
				var c = a(this).unbind(".tabs");
				a.each(["href", "load", "cache"],
						function(a, b) {
					c.removeData(b + ".tabs")
				})
			}),
			this.lis.unbind(".tabs").add(this.panels).each(function() {
				a.data(this, "destroy.tabs") ? a(this).remove() : a(this).removeClass(["ui-state-default", "ui-corner-top", "ui-tabs-selected", "ui-state-active", "ui-state-hover", "ui-state-focus", "ui-state-disabled", "ui-tabs-panel", "ui-widget-content", "ui-corner-bottom", "ui-tabs-hide"].join(" "))
			}),
			b.cookie && this._cookie(null, b.cookie),
			this
		},
		add: function(c, d, e) {
			e === b && (e = this.anchors.length);
			var f = this,
			g = this.options,
			h = a(g.tabTemplate.replace(/#\{href\}/g, c).replace(/#\{label\}/g, d)),
			i = c.indexOf("#") ? this._tabId(a("a", h)[0]) : c.replace("#", "");
			h.addClass("ui-state-default ui-corner-top").data("destroy.tabs", !0);
			var j = f.element.find("#" + i);
			return j.length || (j = a(g.panelTemplate).attr("id", i).data("destroy.tabs", !0)),
			j.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide"),
			e >= this.lis.length ? (h.appendTo(this.list), j.appendTo(this.list[0].parentNode)) : (h.insertBefore(this.lis[e]), j.insertBefore(this.panels[e])),
					g.disabled = a.map(g.disabled,
							function(a, b) {
						return a >= e ? ++a: a
					}),
					this._tabify(),
					this.anchors.length == 1 && (g.selected = 0, h.addClass("ui-tabs-selected ui-state-active"), j.removeClass("ui-tabs-hide"), this.element.queue("tabs",
							function() {
						f._trigger("show", null, f._ui(f.anchors[0], f.panels[0]))
					}), this.load(0)),
					this._trigger("add", null, this._ui(this.anchors[e], this.panels[e])),
					this
		},
		remove: function(b) {
			b = this._getIndex(b);
			var c = this.options,
			d = this.lis.eq(b).remove(),
			e = this.panels.eq(b).remove();
			return d.hasClass("ui-tabs-selected") && this.anchors.length > 1 && this.select(b + (b + 1 < this.anchors.length ? 1 : -1)),
			c.disabled = a.map(a.grep(c.disabled,
					function(a, c) {
				return a != b
			}),
			function(a, c) {
				return a >= b ? --a: a
			}),
			this._tabify(),
			this._trigger("remove", null, this._ui(d.find("a")[0], e[0])),
			this
		},
		enable: function(b) {
			b = this._getIndex(b);
			var c = this.options;
			if (a.inArray(b, c.disabled) == -1) return;
			return this.lis.eq(b).removeClass("ui-state-disabled"),
			c.disabled = a.grep(c.disabled,
					function(a, c) {
				return a != b
			}),
			this._trigger("enable", null, this._ui(this.anchors[b], this.panels[b])),
			this
		},
		disable: function(a) {
			a = this._getIndex(a);
			var b = this,
			c = this.options;
			return a != c.selected && (this.lis.eq(a).addClass("ui-state-disabled"), c.disabled.push(a), c.disabled.sort(), this._trigger("disable", null, this._ui(this.anchors[a], this.panels[a]))),
			this
		},
		select: function(a) {
			a = this._getIndex(a);
			if (a == -1) if (this.options.collapsible && this.options.selected != -1) a = this.options.selected;
			else return this;
			return this.anchors.eq(a).trigger(this.options.event + ".tabs"),
			this
		},
		load: function(b) {
			b = this._getIndex(b);
			var c = this,
			d = this.options,
			e = this.anchors.eq(b)[0],
			f = a.data(e, "load.tabs");
			this.abort();
			if (!f || this.element.queue("tabs").length !== 0 && a.data(e, "cache.tabs")) {
				this.element.dequeue("tabs");
				return
			}
			this.lis.eq(b).addClass("ui-state-processing");
			if (d.spinner) {
				var g = a("span", e);
				g.data("label.tabs", g.html()).html(d.spinner)
			}
			return this.xhr = a.ajax(a.extend({},
					d.ajaxOptions, {
				url: f,
				success: function(f, g) {
					c.element.find(c._sanitizeSelector(e.hash)).html(f),
					c._cleanup(),
					d.cache && a.data(e, "cache.tabs", !0),
					c._trigger("load", null, c._ui(c.anchors[b], c.panels[b]));
					try {
						d.ajaxOptions.success(f, g)
					} catch(h) {}
				},
				error: function(a, f, g) {
					c._cleanup(),
					c._trigger("load", null, c._ui(c.anchors[b], c.panels[b]));
					try {
						d.ajaxOptions.error(a, f, b, e)
					} catch(g) {}
				}
			})),
			c.element.dequeue("tabs"),
			this
		},
		abort: function() {
			return this.element.queue([]),
			this.panels.stop(!1, !0),
			this.element.queue("tabs", this.element.queue("tabs").splice( - 2, 2)),
			this.xhr && (this.xhr.abort(), delete this.xhr),
			this._cleanup(),
			this
		},
		url: function(a, b) {
			return this.anchors.eq(a).removeData("cache.tabs").data("load.tabs", b),
			this
		},
		length: function() {
			return this.anchors.length
		}
	}),
	a.extend(a.ui.tabs, {
		version: "1.8.21"
	}),
	a.extend(a.ui.tabs.prototype, {
		rotation: null,
		rotate: function(a, b) {
			var c = this,
			d = this.options,
			e = c._rotate || (c._rotate = function(b) {
				clearTimeout(c.rotation),
				c.rotation = setTimeout(function() {
					var a = d.selected;
					c.select(++a < c.anchors.length ? a: 0)
				},
				a),
				b && b.stopPropagation()
			}),
			f = c._unrotate || (c._unrotate = b ?
					function(a) {
				e()
			}: function(a) {
				a.clientX && c.rotate(null)
			});
			return a ? (this.element.bind("tabsshow", e), this.anchors.bind(d.event + ".tabs", f), e()) : (clearTimeout(c.rotation), this.element.unbind("tabsshow", e), this.anchors.unbind(d.event + ".tabs", f), delete this._rotate, delete this._unrotate),
					this
		}
	})
})(jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.effects.core.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
jQuery.effects ||
function(a, b) {
	function c(b) {
		var c;
		return b && b.constructor == Array && b.length == 3 ? b: (c = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(b)) ? [parseInt(c[1], 10), parseInt(c[2], 10), parseInt(c[3], 10)] : (c = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(b)) ? [parseFloat(c[1]) * 2.55, parseFloat(c[2]) * 2.55, parseFloat(c[3]) * 2.55] : (c = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(b)) ? [parseInt(c[1], 16), parseInt(c[2], 16), parseInt(c[3], 16)] : (c = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(b)) ? [parseInt(c[1] + c[1], 16), parseInt(c[2] + c[2], 16), parseInt(c[3] + c[3], 16)] : (c = /rgba\(0, 0, 0, 0\)/.exec(b)) ? e.transparent: e[a.trim(b).toLowerCase()]
	}
	function d(b, d) {
		var e;
		do {
			e = a.curCSS(b, d);
			if (e != "" && e != "transparent" || a.nodeName(b, "body")) break;
			d = "backgroundColor"
		} while ( b = b . parentNode );
		return c(e)
	}
	function h() {
		var a = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle,
				b = {},
				c,
				d;
		if (a && a.length && a[0] && a[a[0]]) {
			var e = a.length;
			while (e--) c = a[e],
			typeof a[c] == "string" && (d = c.replace(/\-(\w)/g,
					function(a, b) {
				return b.toUpperCase()
			}), b[d] = a[c])
		} else for (c in a) typeof a[c] == "string" && (b[c] = a[c]);
		return b
	}
	function i(b) {
		var c, d;
		for (c in b) d = b[c],
		(d == null || a.isFunction(d) || c in g || /scrollbar/.test(c) || !/color/i.test(c) && isNaN(parseFloat(d))) && delete b[c];
		return b
	}
	function j(a, b) {
		var c = {
				_: 0
		},
		d;
		for (d in b) a[d] != b[d] && (c[d] = b[d]);
		return c
	}
	function k(b, c, d, e) {
		typeof b == "object" && (e = c, d = null, c = b, b = c.effect),
		a.isFunction(c) && (e = c, d = null, c = {});
		if (typeof c == "number" || a.fx.speeds[c]) e = d,
		d = c,
		c = {};
		return a.isFunction(d) && (e = d, d = null),
		c = c || {},
		d = d || c.duration,
		d = a.fx.off ? 0 : typeof d == "number" ? d: d in a.fx.speeds ? a.fx.speeds[d] : a.fx.speeds._default,
				e = e || c.complete,
				[b, c, d, e]
	}
	function l(b) {
		return ! b || typeof b == "number" || a.fx.speeds[b] ? !0 : typeof b == "string" && !a.effects[b] ? !0 : !1
	}
	a.effects = {},
	a.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "borderColor", "color", "outlineColor"],
			function(b, e) {
		a.fx.step[e] = function(a) {
			a.colorInit || (a.start = d(a.elem, e), a.end = c(a.end), a.colorInit = !0),
			a.elem.style[e] = "rgb(" + Math.max(Math.min(parseInt(a.pos * (a.end[0] - a.start[0]) + a.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt(a.pos * (a.end[1] - a.start[1]) + a.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt(a.pos * (a.end[2] - a.start[2]) + a.start[2], 10), 255), 0) + ")"
		}
	});
	var e = {
			aqua: [0, 255, 255],
			azure: [240, 255, 255],
			beige: [245, 245, 220],
			black: [0, 0, 0],
			blue: [0, 0, 255],
			brown: [165, 42, 42],
			cyan: [0, 255, 255],
			darkblue: [0, 0, 139],
			darkcyan: [0, 139, 139],
			darkgrey: [169, 169, 169],
			darkgreen: [0, 100, 0],
			darkkhaki: [189, 183, 107],
			darkmagenta: [139, 0, 139],
			darkolivegreen: [85, 107, 47],
			darkorange: [255, 140, 0],
			darkorchid: [153, 50, 204],
			darkred: [139, 0, 0],
			darksalmon: [233, 150, 122],
			darkviolet: [148, 0, 211],
			fuchsia: [255, 0, 255],
			gold: [255, 215, 0],
			green: [0, 128, 0],
			indigo: [75, 0, 130],
			khaki: [240, 230, 140],
			lightblue: [173, 216, 230],
			lightcyan: [224, 255, 255],
			lightgreen: [144, 238, 144],
			lightgrey: [211, 211, 211],
			lightpink: [255, 182, 193],
			lightyellow: [255, 255, 224],
			lime: [0, 255, 0],
			magenta: [255, 0, 255],
			maroon: [128, 0, 0],
			navy: [0, 0, 128],
			olive: [128, 128, 0],
			orange: [255, 165, 0],
			pink: [255, 192, 203],
			purple: [128, 0, 128],
			violet: [128, 0, 128],
			red: [255, 0, 0],
			silver: [192, 192, 192],
			white: [255, 255, 255],
			yellow: [255, 255, 0],
			transparent: [255, 255, 255]
	},
	f = ["add", "remove", "toggle"],
	g = {
			border: 1,
			borderBottom: 1,
			borderColor: 1,
			borderLeft: 1,
			borderRight: 1,
			borderTop: 1,
			borderWidth: 1,
			margin: 1,
			padding: 1
	};
	a.effects.animateClass = function(b, c, d, e) {
		return a.isFunction(d) && (e = d, d = null),
		this.queue(function() {
			var g = a(this),
			k = g.attr("style") || " ",
			l = i(h.call(this)),
			m,
			n = g.attr("class") || "";
			a.each(f,
					function(a, c) {
				b[c] && g[c + "Class"](b[c])
			}),
			m = i(h.call(this)),
			g.attr("class", n),
			g.animate(j(l, m), {
				queue: !1,
				duration: c,
				easing: d,
				complete: function() {
					a.each(f,
							function(a, c) {
						b[c] && g[c + "Class"](b[c])
					}),
					typeof g.attr("style") == "object" ? (g.attr("style").cssText = "", g.attr("style").cssText = k) : g.attr("style", k),
							e && e.apply(this, arguments),
							a.dequeue(this)
				}
			})
		})
	},
	a.fn.extend({
		_addClass: a.fn.addClass,
		addClass: function(b, c, d, e) {
			return c ? a.effects.animateClass.apply(this, [{
				add: b
			},
			c, d, e]) : this._addClass(b)
		},
		_removeClass: a.fn.removeClass,
		removeClass: function(b, c, d, e) {
			return c ? a.effects.animateClass.apply(this, [{
				remove: b
			},
			c, d, e]) : this._removeClass(b)
		},
		_toggleClass: a.fn.toggleClass,
		toggleClass: function(c, d, e, f, g) {
			return typeof d == "boolean" || d === b ? e ? a.effects.animateClass.apply(this, [d ? {
				add: c
			}: {
				remove: c
			},
			e, f, g]) : this._toggleClass(c, d) : a.effects.animateClass.apply(this, [{
				toggle: c
			},
			d, e, f])
		},
		switchClass: function(b, c, d, e, f) {
			return a.effects.animateClass.apply(this, [{
				add: c,
				remove: b
			},
			d, e, f])
		}
	}),
	a.extend(a.effects, {
		version: "1.8.21",
		save: function(a, b) {
			for (var c = 0; c < b.length; c++) b[c] !== null && a.data("ec.storage." + b[c], a[0].style[b[c]])
		},
		restore: function(a, b) {
			for (var c = 0; c < b.length; c++) b[c] !== null && a.css(b[c], a.data("ec.storage." + b[c]))
		},
		setMode: function(a, b) {
			return b == "toggle" && (b = a.is(":hidden") ? "show": "hide"),
			b
		},
		getBaseline: function(a, b) {
			var c, d;
			switch (a[0]) {
			case "top":
				c = 0;
				break;
			case "middle":
				c = .5;
				break;
			case "bottom":
				c = 1;
				break;
			default:
				c = a[0] / b.height
			}
			switch (a[1]) {
			case "left":
				d = 0;
				break;
			case "center":
				d = .5;
				break;
			case "right":
				d = 1;
				break;
			default:
				d = a[1] / b.width
			}
			return {
				x: d,
				y: c
			}
		},
		createWrapper: function(b) {
			if (b.parent().is(".ui-effects-wrapper")) return b.parent();
			var c = {
					width: b.outerWidth(!0),
					height: b.outerHeight(!0),
					"float": b.css("float")
			},
			d = a("<div></div>").addClass("ui-effects-wrapper").css({
				fontSize: "100%",
				background: "transparent",
				border: "none",
				margin: 0,
				padding: 0
			}),
			e = document.activeElement;
			try {
				e.id
			} catch(f) {
				e = document.body
			}
			return b.wrap(d),
			(b[0] === e || a.contains(b[0], e)) && a(e).focus(),
			d = b.parent(),
			b.css("position") == "static" ? (d.css({
				position: "relative"
			}), b.css({
				position: "relative"
			})) : (a.extend(c, {
				position: b.css("position"),
				zIndex: b.css("z-index")
			}), a.each(["top", "left", "bottom", "right"],
					function(a, d) {
				c[d] = b.css(d),
				isNaN(parseInt(c[d], 10)) && (c[d] = "auto")
			}), b.css({
				position: "relative",
				top: 0,
				left: 0,
				right: "auto",
				bottom: "auto"
			})),
			d.css(c).show()
		},
		removeWrapper: function(b) {
			var c, d = document.activeElement;
			return b.parent().is(".ui-effects-wrapper") ? (c = b.parent().replaceWith(b), (b[0] === d || a.contains(b[0], d)) && a(d).focus(), c) : b
		},
		setTransition: function(b, c, d, e) {
			return e = e || {},
			a.each(c,
					function(a, c) {
				var f = b.cssUnit(c);
				f[0] > 0 && (e[c] = f[0] * d + f[1])
			}),
			e
		}
	}),
	a.fn.extend({
		effect: function(b, c, d, e) {
			var f = k.apply(this, arguments),
			g = {
				options: f[1],
				duration: f[2],
				callback: f[3]
			},
			h = g.options.mode,
			i = a.effects[b];
			return a.fx.off || !i ? h ? this[h](g.duration, g.callback) : this.each(function() {
				g.callback && g.callback.call(this)
			}) : i.call(this, g)
		},
		_show: a.fn.show,
		show: function(a) {
			if (l(a)) return this._show.apply(this, arguments);
			var b = k.apply(this, arguments);
			return b[1].mode = "show",
			this.effect.apply(this, b)
		},
		_hide: a.fn.hide,
		hide: function(a) {
			if (l(a)) return this._hide.apply(this, arguments);
			var b = k.apply(this, arguments);
			return b[1].mode = "hide",
			this.effect.apply(this, b)
		},
		__toggle: a.fn.toggle,
		toggle: function(b) {
			if (l(b) || typeof b == "boolean" || a.isFunction(b)) return this.__toggle.apply(this, arguments);
			var c = k.apply(this, arguments);
			return c[1].mode = "toggle",
			this.effect.apply(this, c)
		},
		cssUnit: function(b) {
			var c = this.css(b),
			d = [];
			return a.each(["em", "px", "%", "pt"],
					function(a, b) {
				c.indexOf(b) > 0 && (d = [parseFloat(c), b])
			}),
			d
		}
	}),
	a.easing.jswing = a.easing.swing,
	a.extend(a.easing, {
		def: "easeOutQuad",
		swing: function(b, c, d, e, f) {
			return a.easing[a.easing.def](b, c, d, e, f)
		},
		easeInQuad: function(a, b, c, d, e) {
			return d * (b /= e) * b + c
		},
		easeOutQuad: function(a, b, c, d, e) {
			return - d * (b /= e) * (b - 2) + c
		},
		easeInOutQuad: function(a, b, c, d, e) {
			return (b /= e / 2) < 1 ? d / 2 * b * b + c: -d / 2 * (--b * (b - 2) - 1) + c
		},
		easeInCubic: function(a, b, c, d, e) {
			return d * (b /= e) * b * b + c
		},
		easeOutCubic: function(a, b, c, d, e) {
			return d * ((b = b / e - 1) * b * b + 1) + c
		},
		easeInOutCubic: function(a, b, c, d, e) {
			return (b /= e / 2) < 1 ? d / 2 * b * b * b + c: d / 2 * ((b -= 2) * b * b + 2) + c
		},
		easeInQuart: function(a, b, c, d, e) {
			return d * (b /= e) * b * b * b + c
		},
		easeOutQuart: function(a, b, c, d, e) {
			return - d * ((b = b / e - 1) * b * b * b - 1) + c
		},
		easeInOutQuart: function(a, b, c, d, e) {
			return (b /= e / 2) < 1 ? d / 2 * b * b * b * b + c: -d / 2 * ((b -= 2) * b * b * b - 2) + c
		},
		easeInQuint: function(a, b, c, d, e) {
			return d * (b /= e) * b * b * b * b + c
		},
		easeOutQuint: function(a, b, c, d, e) {
			return d * ((b = b / e - 1) * b * b * b * b + 1) + c
		},
		easeInOutQuint: function(a, b, c, d, e) {
			return (b /= e / 2) < 1 ? d / 2 * b * b * b * b * b + c: d / 2 * ((b -= 2) * b * b * b * b + 2) + c
		},
		easeInSine: function(a, b, c, d, e) {
			return - d * Math.cos(b / e * (Math.PI / 2)) + d + c
		},
		easeOutSine: function(a, b, c, d, e) {
			return d * Math.sin(b / e * (Math.PI / 2)) + c
		},
		easeInOutSine: function(a, b, c, d, e) {
			return - d / 2 * (Math.cos(Math.PI * b / e) - 1) + c
		},
		easeInExpo: function(a, b, c, d, e) {
			return b == 0 ? c: d * Math.pow(2, 10 * (b / e - 1)) + c
		},
		easeOutExpo: function(a, b, c, d, e) {
			return b == e ? c + d: d * ( - Math.pow(2, -10 * b / e) + 1) + c
		},
		easeInOutExpo: function(a, b, c, d, e) {
			return b == 0 ? c: b == e ? c + d: (b /= e / 2) < 1 ? d / 2 * Math.pow(2, 10 * (b - 1)) + c: d / 2 * ( - Math.pow(2, -10 * --b) + 2) + c
		},
		easeInCirc: function(a, b, c, d, e) {
			return - d * (Math.sqrt(1 - (b /= e) * b) - 1) + c
		},
		easeOutCirc: function(a, b, c, d, e) {
			return d * Math.sqrt(1 - (b = b / e - 1) * b) + c
		},
		easeInOutCirc: function(a, b, c, d, e) {
			return (b /= e / 2) < 1 ? -d / 2 * (Math.sqrt(1 - b * b) - 1) + c: d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c
		},
		easeInElastic: function(a, b, c, d, e) {
			var f = 1.70158,
			g = 0,
			h = d;
			if (b == 0) return c;
			if ((b /= e) == 1) return c + d;
			g || (g = e * .3);
			if (h < Math.abs(d)) {
				h = d;
				var f = g / 4
			} else var f = g / (2 * Math.PI) * Math.asin(d / h);
			return - (h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g)) + c
		},
		easeOutElastic: function(a, b, c, d, e) {
			var f = 1.70158,
			g = 0,
			h = d;
			if (b == 0) return c;
			if ((b /= e) == 1) return c + d;
			g || (g = e * .3);
			if (h < Math.abs(d)) {
				h = d;
				var f = g / 4
			} else var f = g / (2 * Math.PI) * Math.asin(d / h);
			return h * Math.pow(2, -10 * b) * Math.sin((b * e - f) * 2 * Math.PI / g) + d + c
		},
		easeInOutElastic: function(a, b, c, d, e) {
			var f = 1.70158,
			g = 0,
			h = d;
			if (b == 0) return c;
			if ((b /= e / 2) == 2) return c + d;
			g || (g = e * .3 * 1.5);
			if (h < Math.abs(d)) {
				h = d;
				var f = g / 4
			} else var f = g / (2 * Math.PI) * Math.asin(d / h);
			return b < 1 ? -0.5 * h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) + c: h * Math.pow(2, -10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) * .5 + d + c
		},
		easeInBack: function(a, c, d, e, f, g) {
			return g == b && (g = 1.70158),
			e * (c /= f) * c * ((g + 1) * c - g) + d
		},
		easeOutBack: function(a, c, d, e, f, g) {
			return g == b && (g = 1.70158),
			e * ((c = c / f - 1) * c * ((g + 1) * c + g) + 1) + d
		},
		easeInOutBack: function(a, c, d, e, f, g) {
			return g == b && (g = 1.70158),
			(c /= f / 2) < 1 ? e / 2 * c * c * (((g *= 1.525) + 1) * c - g) + d: e / 2 * ((c -= 2) * c * (((g *= 1.525) + 1) * c + g) + 2) + d
		},
		easeInBounce: function(b, c, d, e, f) {
			return e - a.easing.easeOutBounce(b, f - c, 0, e, f) + d
		},
		easeOutBounce: function(a, b, c, d, e) {
			return (b /= e) < 1 / 2.75 ? d * 7.5625 * b * b + c: b < 2 / 2.75 ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c: b < 2.5 / 2.75 ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c: d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c
		},
		easeInOutBounce: function(b, c, d, e, f) {
			return c < f / 2 ? a.easing.easeInBounce(b, c * 2, 0, e, f) * .5 + d: a.easing.easeOutBounce(b, c * 2 - f, 0, e, f) * .5 + e * .5 + d
		}
	})
} (jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.effects.blind.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
	a.effects.blind = function(b) {
		return this.queue(function() {
			var c = a(this),
			d = ["position", "top", "bottom", "left", "right"],
			e = a.effects.setMode(c, b.options.mode || "hide"),
			f = b.options.direction || "vertical";
			a.effects.save(c, d),
			c.show();
			var g = a.effects.createWrapper(c).css({
				overflow: "hidden"
			}),
			h = f == "vertical" ? "height": "width",
					i = f == "vertical" ? g.height() : g.width();
					e == "show" && g.css(h, 0);
					var j = {};
					j[h] = e == "show" ? i: 0,
							g.animate(j, b.duration, b.options.easing,
									function() {
								e == "hide" && c.hide(),
								a.effects.restore(c, d),
								a.effects.removeWrapper(c),
								b.callback && b.callback.apply(c[0], arguments),
								c.dequeue()
							})
		})
	}
})(jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.effects.bounce.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
	a.effects.bounce = function(b) {
		return this.queue(function() {
			var c = a(this),
			d = ["position", "top", "bottom", "left", "right"],
			e = a.effects.setMode(c, b.options.mode || "effect"),
			f = b.options.direction || "up",
			g = b.options.distance || 20,
			h = b.options.times || 5,
			i = b.duration || 250;
			/show|hide/.test(e) && d.push("opacity"),
			a.effects.save(c, d),
			c.show(),
			a.effects.createWrapper(c);
			var j = f == "up" || f == "down" ? "top": "left",
					k = f == "up" || f == "left" ? "pos": "neg",
							g = b.options.distance || (j == "top" ? c.outerHeight({
								margin: !0
							}) / 3 : c.outerWidth({
								margin: !0
							}) / 3);
			e == "show" && c.css("opacity", 0).css(j, k == "pos" ? -g: g),
			e == "hide" && (g = g / (h * 2)),
			e != "hide" && h--;
			if (e == "show") {
				var l = {
						opacity: 1
				};
				l[j] = (k == "pos" ? "+=": "-=") + g,
				c.animate(l, i / 2, b.options.easing),
				g = g / 2,
				h--
			}
			for (var m = 0; m < h; m++) {
				var n = {},
				p = {};
				n[j] = (k == "pos" ? "-=": "+=") + g,
				p[j] = (k == "pos" ? "+=": "-=") + g,
				c.animate(n, i / 2, b.options.easing).animate(p, i / 2, b.options.easing),
				g = e == "hide" ? g * 2 : g / 2
			}
			if (e == "hide") {
				var l = {
						opacity: 0
				};
				l[j] = (k == "pos" ? "-=": "+=") + g,
				c.animate(l, i / 2, b.options.easing,
						function() {
					c.hide(),
					a.effects.restore(c, d),
					a.effects.removeWrapper(c),
					b.callback && b.callback.apply(this, arguments)
				})
			} else {
				var n = {},
				p = {};
				n[j] = (k == "pos" ? "-=": "+=") + g,
				p[j] = (k == "pos" ? "+=": "-=") + g,
				c.animate(n, i / 2, b.options.easing).animate(p, i / 2, b.options.easing,
						function() {
					a.effects.restore(c, d),
					a.effects.removeWrapper(c),
					b.callback && b.callback.apply(this, arguments)
				})
			}
			c.queue("fx",
					function() {
				c.dequeue()
			}),
			c.dequeue()
		})
	}
})(jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.effects.clip.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
	a.effects.clip = function(b) {
		return this.queue(function() {
			var c = a(this),
			d = ["position", "top", "bottom", "left", "right", "height", "width"],
			e = a.effects.setMode(c, b.options.mode || "hide"),
			f = b.options.direction || "vertical";
			a.effects.save(c, d),
			c.show();
			var g = a.effects.createWrapper(c).css({
				overflow: "hidden"
			}),
			h = c[0].tagName == "IMG" ? g: c,
					i = {
					size: f == "vertical" ? "height": "width",
							position: f == "vertical" ? "top": "left"
			},
			j = f == "vertical" ? h.height() : h.width();
			e == "show" && (h.css(i.size, 0), h.css(i.position, j / 2));
			var k = {};
			k[i.size] = e == "show" ? j: 0,
					k[i.position] = e == "show" ? 0 : j / 2,
							h.animate(k, {
								queue: !1,
								duration: b.duration,
								easing: b.options.easing,
								complete: function() {
									e == "hide" && c.hide(),
									a.effects.restore(c, d),
									a.effects.removeWrapper(c),
									b.callback && b.callback.apply(c[0], arguments),
									c.dequeue()
								}
							})
		})
	}
})(jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.effects.drop.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
	a.effects.drop = function(b) {
		return this.queue(function() {
			var c = a(this),
			d = ["position", "top", "bottom", "left", "right", "opacity"],
			e = a.effects.setMode(c, b.options.mode || "hide"),
			f = b.options.direction || "left";
			a.effects.save(c, d),
			c.show(),
			a.effects.createWrapper(c);
			var g = f == "up" || f == "down" ? "top": "left",
					h = f == "up" || f == "left" ? "pos": "neg",
							i = b.options.distance || (g == "top" ? c.outerHeight({
								margin: !0
							}) / 2 : c.outerWidth({
								margin: !0
							}) / 2);
			e == "show" && c.css("opacity", 0).css(g, h == "pos" ? -i: i);
			var j = {
					opacity: e == "show" ? 1 : 0
			};
			j[g] = (e == "show" ? h == "pos" ? "+=": "-=": h == "pos" ? "-=": "+=") + i,
			c.animate(j, {
				queue: !1,
				duration: b.duration,
				easing: b.options.easing,
				complete: function() {
					e == "hide" && c.hide(),
					a.effects.restore(c, d),
					a.effects.removeWrapper(c),
					b.callback && b.callback.apply(this, arguments),
					c.dequeue()
				}
			})
		})
	}
})(jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.effects.explode.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
	a.effects.explode = function(b) {
		return this.queue(function() {
			var c = b.options.pieces ? Math.round(Math.sqrt(b.options.pieces)) : 3,
					d = b.options.pieces ? Math.round(Math.sqrt(b.options.pieces)) : 3;
					b.options.mode = b.options.mode == "toggle" ? a(this).is(":visible") ? "hide": "show": b.options.mode;
					var e = a(this).show().css("visibility", "hidden"),
					f = e.offset();
					f.top -= parseInt(e.css("marginTop"), 10) || 0,
					f.left -= parseInt(e.css("marginLeft"), 10) || 0;
					var g = e.outerWidth(!0),
					h = e.outerHeight(!0);
					for (var i = 0; i < c; i++) for (var j = 0; j < d; j++) e.clone().appendTo("body").wrap("<div></div>").css({
						position: "absolute",
						visibility: "visible",
						left: -j * (g / d),
						top: -i * (h / c)
					}).parent().addClass("ui-effects-explode").css({
						position: "absolute",
						overflow: "hidden",
						width: g / d,
						height: h / c,
						left: f.left + j * (g / d) + (b.options.mode == "show" ? (j - Math.floor(d / 2)) * (g / d) : 0),
						top: f.top + i * (h / c) + (b.options.mode == "show" ? (i - Math.floor(c / 2)) * (h / c) : 0),
						opacity: b.options.mode == "show" ? 0 : 1
					}).animate({
						left: f.left + j * (g / d) + (b.options.mode == "show" ? 0 : (j - Math.floor(d / 2)) * (g / d)),
						top: f.top + i * (h / c) + (b.options.mode == "show" ? 0 : (i - Math.floor(c / 2)) * (h / c)),
						opacity: b.options.mode == "show" ? 1 : 0
					},
					b.duration || 500);
					setTimeout(function() {
						b.options.mode == "show" ? e.css({
							visibility: "visible"
						}) : e.css({
							visibility: "visible"
						}).hide(),
						b.callback && b.callback.apply(e[0]),
						e.dequeue(),
						a("div.ui-effects-explode").remove()
					},
					b.duration || 500)
		})
	}
})(jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.effects.fade.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
	a.effects.fade = function(b) {
		return this.queue(function() {
			var c = a(this),
			d = a.effects.setMode(c, b.options.mode || "hide");
			c.animate({
				opacity: d
			},
			{
				queue: !1,
				duration: b.duration,
				easing: b.options.easing,
				complete: function() {
					b.callback && b.callback.apply(this, arguments),
					c.dequeue()
				}
			})
		})
	}
})(jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.effects.fold.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
	a.effects.fold = function(b) {
		return this.queue(function() {
			var c = a(this),
			d = ["position", "top", "bottom", "left", "right"],
			e = a.effects.setMode(c, b.options.mode || "hide"),
			f = b.options.size || 15,
			g = !!b.options.horizFirst,
			h = b.duration ? b.duration / 2 : a.fx.speeds._default / 2;
			a.effects.save(c, d),
			c.show();
			var i = a.effects.createWrapper(c).css({
				overflow: "hidden"
			}),
			j = e == "show" != g,
			k = j ? ["width", "height"] : ["height", "width"],
					l = j ? [i.width(), i.height()] : [i.height(), i.width()],
							m = /([0-9]+)%/.exec(f);
					m && (f = parseInt(m[1], 10) / 100 * l[e == "hide" ? 0 : 1]),
					e == "show" && i.css(g ? {
						height: 0,
						width: f
					}: {
						height: f,
						width: 0
					});
					var n = {},
					p = {};
					n[k[0]] = e == "show" ? l[0] : f,
							p[k[1]] = e == "show" ? l[1] : 0,
									i.animate(n, h, b.options.easing).animate(p, h, b.options.easing,
											function() {
										e == "hide" && c.hide(),
										a.effects.restore(c, d),
										a.effects.removeWrapper(c),
										b.callback && b.callback.apply(c[0], arguments),
										c.dequeue()
									})
		})
	}
})(jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.effects.highlight.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
	a.effects.highlight = function(b) {
		return this.queue(function() {
			var c = a(this),
			d = ["backgroundImage", "backgroundColor", "opacity"],
			e = a.effects.setMode(c, b.options.mode || "show"),
			f = {
				backgroundColor: c.css("backgroundColor")
			};
			e == "hide" && (f.opacity = 0),
			a.effects.save(c, d),
			c.show().css({
				backgroundImage: "none",
				backgroundColor: b.options.color || "#ffff99"
			}).animate(f, {
				queue: !1,
				duration: b.duration,
				easing: b.options.easing,
				complete: function() {
					e == "hide" && c.hide(),
					a.effects.restore(c, d),
					e == "show" && !a.support.opacity && this.style.removeAttribute("filter"),
					b.callback && b.callback.apply(this, arguments),
					c.dequeue()
				}
			})
		})
	}
})(jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.effects.pulsate.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
	a.effects.pulsate = function(b) {
		return this.queue(function() {
			var c = a(this),
			d = a.effects.setMode(c, b.options.mode || "show"),
			e = (b.options.times || 5) * 2 - 1,
			f = b.duration ? b.duration / 2 : a.fx.speeds._default / 2,
					g = c.is(":visible"),
					h = 0;
			g || (c.css("opacity", 0).show(), h = 1),
			(d == "hide" && g || d == "show" && !g) && e--;
			for (var i = 0; i < e; i++) c.animate({
				opacity: h
			},
			f, b.options.easing),
			h = (h + 1) % 2;
			c.animate({
				opacity: h
			},
			f, b.options.easing,
			function() {
				h == 0 && c.hide(),
				b.callback && b.callback.apply(this, arguments)
			}),
			c.queue("fx",
					function() {
				c.dequeue()
			}).dequeue()
		})
	}
})(jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.effects.scale.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
	a.effects.puff = function(b) {
		return this.queue(function() {
			var c = a(this),
			d = a.effects.setMode(c, b.options.mode || "hide"),
			e = parseInt(b.options.percent, 10) || 150,
			f = e / 100,
			g = {
				height: c.height(),
				width: c.width()
			};
			a.extend(b.options, {
				fade: !0,
				mode: d,
				percent: d == "hide" ? e: 100,
						from: d == "hide" ? g: {
							height: g.height * f,
							width: g.width * f
						}
			}),
			c.effect("scale", b.options, b.duration, b.callback),
			c.dequeue()
		})
	},
	a.effects.scale = function(b) {
		return this.queue(function() {
			var c = a(this),
			d = a.extend(!0, {},
					b.options),
					e = a.effects.setMode(c, b.options.mode || "effect"),
					f = parseInt(b.options.percent, 10) || (parseInt(b.options.percent, 10) == 0 ? 0 : e == "hide" ? 0 : 100),
					g = b.options.direction || "both",
					h = b.options.origin;
			e != "effect" && (d.origin = h || ["middle", "center"], d.restore = !0);
			var i = {
					height: c.height(),
					width: c.width()
			};
			c.from = b.options.from || (e == "show" ? {
				height: 0,
				width: 0
			}: i);
			var j = {
					y: g != "horizontal" ? f / 100 : 1,
							x: g != "vertical" ? f / 100 : 1
			};
			c.to = {
					height: i.height * j.y,
					width: i.width * j.x
			},
			b.options.fade && (e == "show" && (c.from.opacity = 0, c.to.opacity = 1), e == "hide" && (c.from.opacity = 1, c.to.opacity = 0)),
			d.from = c.from,
			d.to = c.to,
			d.mode = e,
			c.effect("size", d, b.duration, b.callback),
			c.dequeue()
		})
	},
	a.effects.size = function(b) {
		return this.queue(function() {
			var c = a(this),
			d = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
			e = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
			f = ["width", "height", "overflow"],
			g = ["fontSize"],
			h = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
			i = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
			j = a.effects.setMode(c, b.options.mode || "effect"),
			k = b.options.restore || !1,
			l = b.options.scale || "both",
			m = b.options.origin,
			n = {
				height: c.height(),
				width: c.width()
			};
			c.from = b.options.from || n,
			c.to = b.options.to || n;
			if (m) {
				var p = a.effects.getBaseline(m, n);
				c.from.top = (n.height - c.from.height) * p.y,
				c.from.left = (n.width - c.from.width) * p.x,
				c.to.top = (n.height - c.to.height) * p.y,
				c.to.left = (n.width - c.to.width) * p.x
			}
			var q = {
					from: {
						y: c.from.height / n.height,
						x: c.from.width / n.width
					},
					to: {
						y: c.to.height / n.height,
						x: c.to.width / n.width
					}
			};
			if (l == "box" || l == "both") q.from.y != q.to.y && (d = d.concat(h), c.from = a.effects.setTransition(c, h, q.from.y, c.from), c.to = a.effects.setTransition(c, h, q.to.y, c.to)),
			q.from.x != q.to.x && (d = d.concat(i), c.from = a.effects.setTransition(c, i, q.from.x, c.from), c.to = a.effects.setTransition(c, i, q.to.x, c.to)); (l == "content" || l == "both") && q.from.y != q.to.y && (d = d.concat(g), c.from = a.effects.setTransition(c, g, q.from.y, c.from), c.to = a.effects.setTransition(c, g, q.to.y, c.to)),
			a.effects.save(c, k ? d: e),
			c.show(),
			a.effects.createWrapper(c),
			c.css("overflow", "hidden").css(c.from);
			if (l == "content" || l == "both") h = h.concat(["marginTop", "marginBottom"]).concat(g),
			i = i.concat(["marginLeft", "marginRight"]),
			f = d.concat(h).concat(i),
			c.find("*[width]").each(function() {
				var c = a(this);
				k && a.effects.save(c, f);
				var d = {
						height: c.height(),
						width: c.width()
				};
				c.from = {
						height: d.height * q.from.y,
						width: d.width * q.from.x
				},
				c.to = {
						height: d.height * q.to.y,
						width: d.width * q.to.x
				},
				q.from.y != q.to.y && (c.from = a.effects.setTransition(c, h, q.from.y, c.from), c.to = a.effects.setTransition(c, h, q.to.y, c.to)),
				q.from.x != q.to.x && (c.from = a.effects.setTransition(c, i, q.from.x, c.from), c.to = a.effects.setTransition(c, i, q.to.x, c.to)),
				c.css(c.from),
				c.animate(c.to, b.duration, b.options.easing,
						function() {
					k && a.effects.restore(c, f)
				})
			});
			c.animate(c.to, {
				queue: !1,
				duration: b.duration,
				easing: b.options.easing,
				complete: function() {
					c.to.opacity === 0 && c.css("opacity", c.from.opacity),
					j == "hide" && c.hide(),
					a.effects.restore(c, k ? d: e),
					a.effects.removeWrapper(c),
					b.callback && b.callback.apply(this, arguments),
					c.dequeue()
				}
			})
		})
	}
})(jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.effects.shake.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
	a.effects.shake = function(b) {
		return this.queue(function() {
			var c = a(this),
			d = ["position", "top", "bottom", "left", "right"],
			e = a.effects.setMode(c, b.options.mode || "effect"),
			f = b.options.direction || "left",
			g = b.options.distance || 20,
			h = b.options.times || 3,
			i = b.duration || b.options.duration || 140;
			a.effects.save(c, d),
			c.show(),
			a.effects.createWrapper(c);
			var j = f == "up" || f == "down" ? "top": "left",
					k = f == "up" || f == "left" ? "pos": "neg",
							l = {},
							m = {},
							n = {};
			l[j] = (k == "pos" ? "-=": "+=") + g,
			m[j] = (k == "pos" ? "+=": "-=") + g * 2,
			n[j] = (k == "pos" ? "-=": "+=") + g * 2,
			c.animate(l, i, b.options.easing);
			for (var p = 1; p < h; p++) c.animate(m, i, b.options.easing).animate(n, i, b.options.easing);
			c.animate(m, i, b.options.easing).animate(l, i / 2, b.options.easing,
					function() {
				a.effects.restore(c, d),
				a.effects.removeWrapper(c),
				b.callback && b.callback.apply(this, arguments)
			}),
			c.queue("fx",
					function() {
				c.dequeue()
			}),
			c.dequeue()
		})
	}
})(jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.effects.slide.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
	a.effects.slide = function(b) {
		return this.queue(function() {
			var c = a(this),
			d = ["position", "top", "bottom", "left", "right"],
			e = a.effects.setMode(c, b.options.mode || "show"),
			f = b.options.direction || "left";
			a.effects.save(c, d),
			c.show(),
			a.effects.createWrapper(c).css({
				overflow: "hidden"
			});
			var g = f == "up" || f == "down" ? "top": "left",
					h = f == "up" || f == "left" ? "pos": "neg",
							i = b.options.distance || (g == "top" ? c.outerHeight({
								margin: !0
							}) : c.outerWidth({
								margin: !0
							}));
			e == "show" && c.css(g, h == "pos" ? isNaN(i) ? "-" + i: -i: i);
			var j = {};
			j[g] = (e == "show" ? h == "pos" ? "+=": "-=": h == "pos" ? "-=": "+=") + i,
			c.animate(j, {
				queue: !1,
				duration: b.duration,
				easing: b.options.easing,
				complete: function() {
					e == "hide" && c.hide(),
					a.effects.restore(c, d),
					a.effects.removeWrapper(c),
					b.callback && b.callback.apply(this, arguments),
					c.dequeue()
				}
			})
		})
	}
})(jQuery);;
/*! jQuery UI - v1.8.21 - 2012-06-05
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.effects.transfer.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
	a.effects.transfer = function(b) {
		return this.queue(function() {
			var c = a(this),
			d = a(b.options.to),
			e = d.offset(),
			f = {
				top: e.top,
				left: e.left,
				height: d.innerHeight(),
				width: d.innerWidth()
			},
			g = c.offset(),
			h = a('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(b.options.className).css({
				top: g.top,
				left: g.left,
				height: c.innerHeight(),
				width: c.innerWidth(),
				position: "absolute"
			}).animate(f, b.duration, b.options.easing,
					function() {
				h.remove(),
				b.callback && b.callback.apply(c[0], arguments),
				c.dequeue()
			})
		})
	}
})(jQuery);;
function showDivForA(cardid, infoid) {
	var cardList = cardid.parentNode.getElementsByTagName("a");
	for (var i = 0; i < cardList.length; i++) {
		if (cardid == cardList[i]) {
			cardList[i].className = "cur";
			eval("document.getElementById('" + infoid + i + '\').style.display="";')
		}
		if (cardid != cardList[i]) {
			cardList[i].className = " ";
			eval("document.getElementById('" + infoid + i + '\').style.display="none";')
		}
	}
}
function showDivForA_jzsj(cardid, infoid) {
	var cardList = cardid.parentNode.getElementsByTagName("a");
	for (var i = 0; i < cardList.length; i++) {
		if (cardid == cardList[i]) {
			cardList[i].className = "cur";
			eval("document.getElementById('" + infoid + i + '\').style.display="";')
		}
		if (cardid != cardList[i]) {
			cardList[i].className = "more";
			eval("document.getElementById('" + infoid + i + '\').style.display="none";')
		}
	}
}
function showCarddiv(cardid, infoid, clsName) {
	var cardList = cardid.parentNode.getElementsByTagName("span");
	for (var i = 0; i < cardList.length; i++) {
		if (cardid == cardList[i]) {
			cardList[i].className = clsName + "On";
			eval("document.getElementById('" + infoid + i + '\').style.display="inline";')
		}
		if (cardid != cardList[i]) {
			cardList[i].className = clsName + "Off";
			eval("document.getElementById('" + infoid + i + '\').style.display="none";')
		}
	}
}
function showCardG(cardid, infoid, clsName) {
	var cardList = cardid.parentNode.getElementsByTagName("span");
	for (var i = 0; i < cardList.length; i++) {
		if (cardid == cardList[i]) {
			cardList[i].className = clsName + "On";
			eval("document.getElementById('" + infoid + i + '\').style.display="inline";')
		}
		if (cardid != cardList[i]) {
			cardList[i].className = clsName + "Off";
			eval("document.getElementById('" + infoid + i + '\').style.display="none";')
		}
	}
};
var target = [];
var time_id = [];
var getTime = "";
function show_date_time_0(bs, todaydb) {
	var daysold = "";
	var e_daysold = "";
	setTimeout("show_date_time_0('" + bs + "','" + todaydb + "')", 1000);
	for (var i = 0,
			j = target.length; i < j; i++) {
		today = new Date();
		var timeold = target[i] - today.getTime();
		var sectimeold = timeold / 1000;
		var secondsold = Math.floor(sectimeold);
		var msPerDay = 24 * 60 * 60 * 1000;
		var e_daysold = timeold / msPerDay;
		var daysold = Math.floor(e_daysold);
		var e_hrsold = (e_daysold - daysold) * 24;
		var hrsold = Math.floor(e_hrsold);
		var e_minsold = (e_hrsold - hrsold) * 60;
		minsold = Math.floor((e_hrsold - hrsold) * 60);
		seconds = Math.floor((e_minsold - minsold) * 60);
		if (daysold < 0) {
			document.getElementById(time_id[i]).innerHTML = "<span class='day'>0</span><span class='unit'>天</span><span class='time'>0</span><span class='unit'>小时</span><span class='time'>0</span><span class='unit'>分</span>"
		} else {
			if (hrsold < 10) {
				hrsold = "0" + hrsold
			}
			if (minsold < 10) {
				minsold = "0" + minsold
			}
			if (seconds < 10) {
				seconds = "0" + seconds
			}
			document.getElementById(time_id[i]).innerHTML = "<span class='day'>" + daysold + "</span><span class='unit'>天</span><span class='time'>" + hrsold + "</span><span class='unit'>小时</span><span class='time'>" + minsold + "</span><span class='unit'>分</span>"
		}
	}
}; (function($) {
	$.fn.powerFloat = function(options) {
		return $(this).each(function() {
			var s = $.extend({},
					defaults, options || {});
			var init = function(pms, trigger) {
				if (o.target && o.target.css("display") !== "none") {
					o.targetHide()
				}
				o.s = pms;
				o.trigger = trigger
			},
			hoverTimer;
			switch (s.eventType) {
			case "hover":
				$(this).hover(function() {
					if (o.timerHold) {
						o.flagDisplay = true
					}
					var numShowDelay = parseInt(s.showDelay, 10);
					init(s, $(this));
					if (numShowDelay) {
						if (hoverTimer) {
							clearTimeout(hoverTimer)
						}
						hoverTimer = setTimeout(function() {
							o.targetGet.call(o)
						},
						numShowDelay)
					} else {
						o.targetGet()
					}
				},
				function() {
					if (hoverTimer) {
						clearTimeout(hoverTimer)
					}
					if (o.timerHold) {
						clearTimeout(o.timerHold)
					}
					o.flagDisplay = false;
					o.targetHold()
				});
				if (s.hoverFollow) {
					$(this).mousemove(function(e) {
						o.cacheData.left = e.pageX;
						o.cacheData.top = e.pageY;
						o.targetGet.call(o);
						return false
					})
				}
				break;
			case "click":
				$(this).click(function(e) {
					if (o.display && o.trigger && e.target === o.trigger.get(0)) {
						o.flagDisplay = false;
						o.displayDetect()
					} else {
						init(s, $(this));
						o.targetGet();
						if (!$(document).data("mouseupBind")) {
							$(document).bind("mouseup",
									function(e) {
								var flag = false;
								if (o.trigger) {
									var idTarget = o.target.attr("id");
									if (!idTarget) {
										idTarget = "R_" + Math.random();
										o.target.attr("id", idTarget)
									}
									$(e.target).parents().each(function() {
										if ($(this).attr("id") === idTarget) {
											flag = true
										}
									});
									if (s.eventType === "click" && o.display && e.target != o.trigger.get(0) && !flag) {
										o.flagDisplay = false;
										o.displayDetect()
									}
								}
								return false
							}).data("mouseupBind", true)
						}
					}
				});
				break;
			case "focus":
				$(this).focus(function() {
					var self = $(this);
					setTimeout(function() {
						init(s, self);
						o.targetGet()
					},
					200)
				}).blur(function() {
					o.flagDisplay = false;
					setTimeout(function() {
						o.displayDetect()
					},
					190)
				});
				break;
			default:
				init(s, $(this));
			o.targetGet();
			$(document).unbind("mouseup").data("mouseupBind", false)
			}
		})
	};
	var o = {
			targetGet: function() {
				if (!this.trigger) {
					return this
				}
				var attr = this.trigger.attr(this.s.targetAttr),
				target = typeof this.s.target == "function" ? this.s.target.call(this.trigger) : this.s.target;
				switch (this.s.targetMode) {
				case "common":
					if (target) {
						var type = typeof(target);
						if (type === "object") {
							if (target.size()) {
								o.target = target.eq(0)
							}
						} else {
							if (type === "string") {
								if ($(target).size()) {
									o.target = $(target).eq(0)
								}
							}
						}
					} else {
						if (attr && $("#" + attr).size()) {
							o.target = $("#" + attr)
						}
					}
					if (o.target) {
						o.targetShow()
					} else {
						return this
					}
					break;
				case "ajax":
					var url = target || attr;
					this.targetProtect = false;
					if (!url) {
						return
					}
					if (!o.cacheData[url]) {
						o.loading()
					}
					var tempImage = new Image();
					tempImage.onload = function() {
						var w = tempImage.width,
						h = tempImage.height;
						var winw = $(window).width(),
						winh = $(window).height();
						var imgScale = w / h,
						winScale = winw / winh;
						if (imgScale > winScale) {
							if (w > winw / 2) {
								w = winw / 2;
								h = w / imgScale
							}
						} else {
							if (h > winh / 2) {
								h = winh / 2;
								w = h * imgScale
							}
						}
						var imgHtml = '<img class="float_ajax_image" src="' + url + '" width="' + w + '" height = "' + h + '" />';
						o.cacheData[url] = true;
						o.target = $(imgHtml);
						o.targetShow()
					};
					tempImage.onerror = function() {
						if (/(\.jpg|\.png|\.gif|\.bmp|\.jpeg)$/i.test(url)) {
							o.target = $('<div class="float_ajax_error">图片加载失败。</div>');
							o.targetShow()
						} else {
							$.ajax({
								url: url,
								success: function(data) {
									if (typeof(data) === "string") {
										o.cacheData[url] = true;
										o.target = $('<div class="float_ajax_data">' + data + "</div>");
										o.targetShow()
									}
								},
								error: function() {
									o.target = $('<div class="float_ajax_error">数据没有加载成功。</div>');
									o.targetShow()
								}
							})
						}
					};
					tempImage.src = url;
					break;
				case "list":
					var targetHtml = '<ul class="float_list_ul">',
					arrLength;
					if ($.isArray(target) && (arrLength = target.length)) {
						$.each(target,
								function(i, obj) {
							var list = "",
							strClass = "",
							text, href;
							if (i === 0) {
								strClass = ' class="float_list_li_first"'
							}
							if (i === arrLength - 1) {
								strClass = ' class="float_list_li_last"'
							}
							if (typeof(obj) === "object" && (text = obj.text.toString())) {
								if (href = (obj.href || "javascript:")) {
									list = '<a href="' + href + '" class="float_list_a">' + text + "</a>"
								} else {
									list = text
								}
							} else {
								if (typeof(obj) === "string" && obj) {
									list = obj
								}
							}
							if (list) {
								targetHtml += "<li" + strClass + ">" + list + "</li>"
							}
						})
					} else {
						targetHtml += '<li class="float_list_null">列表无数据。</li>'
					}
					targetHtml += "</ul>";
					o.target = $(targetHtml);
					this.targetProtect = false;
					o.targetShow();
					break;
				case "remind":
					var strRemind = target || attr;
					this.targetProtect = false;
					if (typeof(strRemind) === "string") {
						o.target = $("<span>" + strRemind + "</span>");
						o.targetShow()
					}
					break;
				default:
					var objOther = target || attr,
					type = typeof(objOther);
				if (objOther) {
					if (type === "string") {
						if (/^.[^:#\[\.,]*$/.test(objOther)) {
							if ($(objOther).size()) {
								o.target = $(objOther).eq(0);
								this.targetProtect = true
							} else {
								if ($("#" + objOther).size()) {
									o.target = $("#" + objOther).eq(0);
									this.targetProtect = true
								} else {
									o.target = $("<div>" + objOther + "</div>");
									this.targetProtect = false
								}
							}
						} else {
							o.target = $("<div>" + objOther + "</div>");
							this.targetProtect = false
						}
						o.targetShow()
					} else {
						if (type === "object") {
							if (!$.isArray(objOther) && objOther.size()) {
								o.target = objOther.eq(0);
								this.targetProtect = true;
								o.targetShow()
							}
						}
					}
				}
				}
				return this
			},
			container: function() {
				var cont = this.s.container,
				mode = this.s.targetMode || "mode";
				if (mode === "ajax" || mode === "remind") {
					this.s.sharpAngle = true
				} else {
					this.s.sharpAngle = false
				}
				if (this.s.reverseSharp) {
					this.s.sharpAngle = !this.s.sharpAngle
				}
				if (mode !== "common") {
					if (cont === null) {
						cont = "plugin"
					}
					if (cont === "plugin") {
						if (!$("#floatBox_" + mode).size()) {
							$('<div id="floatBox_' + mode + '" class="float_' + mode + '_box"></div>').appendTo($("body")).hide()
						}
						cont = $("#floatBox_" + mode)
					}
					if (cont && typeof(cont) !== "string" && cont.size()) {
						if (this.targetProtect) {
							o.target.show().css("position", "static")
						}
						o.target = cont.empty().append(o.target)
					}
				}
				return this
			},
			setWidth: function() {
				var w = this.s.width;
				if (w === "auto") {
					if (this.target.get(0).style.width) {
						this.target.css("width", "auto")
					}
				} else {
					if (w === "inherit") {
						this.target.width(this.trigger.width())
					} else {
						this.target.css("width", w)
					}
				}
				return this
			},
			position: function() {
				if (!this.trigger || !this.target) {
					return this
				}
				var pos, tri_h = 0,
				tri_w = 0,
				cor_w = 0,
				cor_h = 0,
				tri_l, tri_t, tar_l, tar_t, cor_l, cor_t, tar_h = this.target.data("height"),
				tar_w = this.target.data("width"),
				st = $(window).scrollTop(),
				off_x = parseInt(this.s.offsets.x, 10) || 0,
				off_y = parseInt(this.s.offsets.y, 10) || 0,
				mousePos = this.cacheData;
				if (!tar_h) {
					tar_h = this.target.outerHeight();
					if (this.s.hoverFollow) {
						this.target.data("height", tar_h)
					}
				}
				if (!tar_w) {
					tar_w = this.target.outerWidth();
					if (this.s.hoverFollow) {
						this.target.data("width", tar_w)
					}
				}
				pos = this.trigger.offset();
				tri_h = this.trigger.outerHeight();
				tri_w = this.trigger.outerWidth();
				tri_l = pos.left;
				tri_t = pos.top;
				var funMouseL = function() {
					if (tri_l < 0) {
						tri_l = 0
					} else {
						if (tri_l + tri_h > $(window).width()) {
							tri_l = $(window).width() - tri_w
						}
					}
				},
				funMouseT = function() {
					if (tri_t < 0) {
						tri_t = 0
					} else {
						if (tri_t + tri_h > $(document).height()) {
							tri_t = $(document).height() - tri_h
						}
					}
				};
				if (this.s.hoverFollow && mousePos.left && mousePos.top) {
					if (this.s.hoverFollow === "x") {
						tri_l = mousePos.left;
						funMouseL()
					} else {
						if (this.s.hoverFollow === "y") {
							tri_t = mousePos.top;
							funMouseT()
						} else {
							tri_l = mousePos.left;
							tri_t = mousePos.top;
							funMouseL();
							funMouseT()
						}
					}
				}
				var arrLegalPos = ["4-1", "1-4", "5-7", "2-3", "2-1", "6-8", "3-4", "4-3", "8-6", "1-2", "7-5", "3-2"],
				align = this.s.position,
				alignMatch = false,
				strDirect;
				$.each(arrLegalPos,
						function(i, n) {
					if (n === align) {
						alignMatch = true;
						return
					}
				});
				if (!alignMatch) {
					align = "4-1"
				}
				var funDirect = function(a) {
					var dir = "bottom";
					switch (a) {
					case "1-4":
					case "5-7":
					case "2-3":
						dir = "top";
						break;
					case "2-1":
					case "6-8":
					case "3-4":
						dir = "right";
						break;
					case "1-2":
					case "8-6":
					case "4-3":
						dir = "left";
						break;
					case "4-1":
					case "7-5":
					case "3-2":
						dir = "bottom";
						break
					}
					return dir
				};
				var funCenterJudge = function(a) {
					if (a === "5-7" || a === "6-8" || a === "8-6" || a === "7-5") {
						return true
					}
					return false
				};
				var funJudge = function(dir) {
					var totalHeight = 0,
					totalWidth = 0,
					flagCorner = (o.s.sharpAngle && o.corner) ? true: false;
					if (dir === "right") {
						totalWidth = tri_l + tri_w + tar_w + off_x;
						if (flagCorner) {
							totalWidth += o.corner.width()
						}
						if (totalWidth > $(window).width()) {
							return false
						}
					} else {
						if (dir === "bottom") {
							totalHeight = tri_t + tri_h + tar_h + off_y;
							if (flagCorner) {
								totalHeight += o.corner.height()
							}
							if (totalHeight > st + $(window).height()) {
								return false
							}
						} else {
							if (dir === "top") {
								totalHeight = tar_h + off_y;
								if (flagCorner) {
									totalHeight += o.corner.height()
								}
								if (totalHeight > tri_t - st) {
									return false
								}
							} else {
								if (dir === "left") {
									totalWidth = tar_w + off_x;
									if (flagCorner) {
										totalWidth += o.corner.width()
									}
									if (totalWidth > tri_l) {
										return false
									}
								}
							}
						}
					}
					return true
				};
				strDirect = funDirect(align);
				if (this.s.sharpAngle) {
					this.createSharp(strDirect)
				}
				if (this.s.edgeAdjust) {
					if (funJudge(strDirect)) { (function() {
						if (funCenterJudge(align)) {
							return
						}
						var obj = {
								top: {
									right: "2-3",
									left: "1-4"
								},
								right: {
									top: "2-1",
									bottom: "3-4"
								},
								bottom: {
									right: "3-2",
									left: "4-1"
								},
								left: {
									top: "1-2",
									bottom: "4-3"
								}
						};
						var o = obj[strDirect],
						name;
						if (o) {
							for (name in o) {
								if (!funJudge(name)) {
									align = o[name]
								}
							}
						}
					})()
					} else { (function() {
						if (funCenterJudge(align)) {
							var center = {
									"5-7": "7-5",
									"7-5": "5-7",
									"6-8": "8-6",
									"8-6": "6-8"
							};
							align = center[align]
						} else {
							var obj = {
									top: {
										left: "3-2",
										right: "4-1"
									},
									right: {
										bottom: "1-2",
										top: "4-3"
									},
									bottom: {
										left: "2-3",
										right: "1-4"
									},
									left: {
										bottom: "2-1",
										top: "3-4"
									}
							};
							var o = obj[strDirect],
							arr = [];
							for (name in o) {
								arr.push(name)
							}
							if (funJudge(arr[0]) || !funJudge(arr[1])) {
								align = o[arr[0]]
							} else {
								align = o[arr[1]]
							}
						}
					})()
					}
				}
				var strNewDirect = funDirect(align),
				strFirst = align.split("-")[0];
				if (this.s.sharpAngle) {
					this.createSharp(strNewDirect);
					cor_w = this.corner.width(),
					cor_h = this.corner.height()
				}
				if (this.s.hoverFollow) {
					if (this.s.hoverFollow === "x") {
						tar_l = tri_l + off_x;
						if (strFirst === "1" || strFirst === "8" || strFirst === "4") {
							tar_l = tri_l - (tar_w - tri_w) / 2 + off_x
						} else {
							tar_l = tri_l - (tar_w - tri_w) + off_x
						}
						if (strFirst === "1" || strFirst === "5" || strFirst === "2") {
							tar_t = tri_t - off_y - tar_h - cor_h;
							cor_t = tri_t - cor_h - off_y - 1
						} else {
							tar_t = tri_t + tri_h + off_y + cor_h;
							cor_t = tri_t + tri_h + off_y + 1
						}
						cor_l = pos.left - (cor_w - tri_w) / 2
					} else {
						if (this.s.hoverFollow === "y") {
							if (strFirst === "1" || strFirst === "5" || strFirst === "2") {
								tar_t = tri_t - (tar_h - tri_h) / 2 + off_y
							} else {
								tar_t = tri_t - (tar_h - tri_h) + off_y
							}
							if (strFirst === "1" || strFirst === "8" || strFirst === "4") {
								tar_l = tri_l - tar_w - off_x - cor_w;
								cor_l = tri_l - cor_w - off_x - 1
							} else {
								tar_l = tri_l + tri_w - off_x + cor_w;
								cor_l = tri_l + tri_w + off_x + 1
							}
							cor_t = pos.top - (cor_h - tri_h) / 2
						} else {
							tar_l = tri_l + off_x;
							tar_t = tri_t + off_y
						}
					}
				} else {
					switch (strNewDirect) {
					case "top":
						tar_t = tri_t - off_y - tar_h - cor_h;
						if (strFirst == "1") {
							tar_l = tri_l - off_x
						} else {
							if (strFirst === "5") {
								tar_l = tri_l - (tar_w - tri_w) / 2 - off_x
							} else {
								tar_l = tri_l - (tar_w - tri_w) - off_x
							}
						}
						cor_t = tri_t - cor_h - off_y - 1;
						cor_l = tri_l - (cor_w - tri_w) / 2;
						break;
					case "right":
						tar_l = tri_l + tri_w + off_x + cor_w;
						if (strFirst == "2") {
							tar_t = tri_t + off_y
						} else {
							if (strFirst === "6") {
								tar_t = tri_t - (tar_h - tri_h) / 2 + off_y
							} else {
								tar_t = tri_t - (tar_h - tri_h) + off_y
							}
						}
						cor_l = tri_l + tri_w + off_x + 1;
						cor_t = tri_t - (cor_h - tri_h) / 2;
						break;
					case "bottom":
						tar_t = tri_t + tri_h + off_y + cor_h;
						if (strFirst == "4") {
							tar_l = tri_l + off_x
						} else {
							if (strFirst === "7") {
								tar_l = tri_l - (tar_w - tri_w) / 2 + off_x
							} else {
								tar_l = tri_l - (tar_w - tri_w) + off_x
							}
						}
						cor_t = tri_t + tri_h + off_y + 1;
						cor_l = tri_l - (cor_w - tri_w) / 2;
						break;
					case "left":
						tar_l = tri_l - tar_w - off_x - cor_w;
						if (strFirst == "2") {
							tar_t = tri_t - off_y
						} else {
							if (strFirst === "6") {
								tar_t = tri_t - (tar_w - tri_w) / 2 - off_y
							} else {
								tar_t = tri_t - (tar_h - tri_h) - off_y
							}
						}
						cor_l = tar_l + cor_w;
						cor_t = tri_t - (tar_w - cor_w) / 2;
						break
					}
				}
				if (cor_h && cor_w && this.corner) {
					this.corner.css({
						left: cor_l,
						top: cor_t,
						zIndex: this.s.zIndex + 1
					})
				}
				this.target.css({
					position: "absolute",
					left: tar_l,
					top: tar_t,
					zIndex: this.s.zIndex
				});
				return this
			},
			createSharp: function(dir) {
				var bgColor, bdColor, color1 = "",
				color2 = "";
				var objReverse = {
						left: "right",
						right: "left",
						bottom: "top",
						top: "bottom"
				},
				dirReverse = objReverse[dir] || "top";
				if (this.target) {
					bgColor = this.target.css("background-color");
					if (parseInt(this.target.css("border-" + dirReverse + "-width")) > 0) {
						bdColor = this.target.css("border-" + dirReverse + "-color")
					}
					if (bdColor && bdColor !== "transparent") {
						color1 = 'style="color:' + bdColor + ';"'
					} else {
						color1 = 'style="display:none;"'
					}
					if (bgColor && bgColor !== "transparent") {
						color2 = 'style="color:' + bgColor + ';"'
					} else {
						color2 = 'style="display:none;"'
					}
				}
				var html = '<div id="floatCorner_' + dir + '" class="float_corner float_corner_' + dir + '">' + '<span class="corner corner_1" ' + color1 + ">◆</span>" + '<span class="corner corner_2" ' + color2 + ">◆</span>" + "</div>";
				if (!$("#floatCorner_" + dir).size()) {
					$("body").append($(html))
				}
				this.corner = $("#floatCorner_" + dir);
				return this
			},
			targetHold: function() {
				if (this.s.hoverHold) {
					var delay = parseInt(this.s.hideDelay, 10) || 200;
					if (this.target) {
						this.target.hover(function() {
							o.flagDisplay = true
						},
						function() {
							if (o.timerHold) {
								clearTimeout(o.timerHold)
							}
							o.flagDisplay = false;
							o.targetHold()
						})
					}
					o.timerHold = setTimeout(function() {
						o.displayDetect.call(o)
					},
					delay)
				} else {
					this.displayDetect()
				}
				return this
			},
			loading: function() {
				this.target = $('<div class="float_loading"></div>');
				this.targetShow();
				this.target.removeData("width").removeData("height");
				return this
			},
			displayDetect: function() {
				if (!this.flagDisplay && this.display) {
					this.targetHide();
					this.timerHold = null
				}
				return this
			},
			targetShow: function() {
				o.cornerClear();
				this.display = true;
				this.container().setWidth().position();
				this.target.show();
				if ($.isFunction(this.s.showCall)) {
					this.s.showCall.call(this.trigger, this.target)
				}
				return this
			},
			targetHide: function() {
				this.display = false;
				this.targetClear();
				this.cornerClear();
				if ($.isFunction(this.s.hideCall)) {
					this.s.hideCall.call(this.trigger)
				}
				this.target = null;
				this.trigger = null;
				this.s = {};
				this.targetProtect = false;
				return this
			},
			targetClear: function() {
				if (this.target) {
					if (this.target.data("width")) {
						this.target.removeData("width").removeData("height")
					}
					if (this.targetProtect) {
						this.target.children().hide().appendTo($("body"))
					}
					this.target.unbind().hide()
				}
			},
			cornerClear: function() {
				if (this.corner) {
					this.corner.remove()
				}
			},
			target: null,
			trigger: null,
			s: {},
			cacheData: {},
			targetProtect: false
	};
	$.powerFloat = {};
	$.powerFloat.hide = function() {
		o.targetHide()
	};
	var defaults = {
			width: "auto",
			offsets: {
				x: 0,
				y: 0
			},
			zIndex: 999,
			eventType: "hover",
			showDelay: 0,
			hideDelay: 0,
			hoverHold: true,
			hoverFollow: false,
			targetMode: "common",
			target: null,
			targetAttr: "rel",
			container: null,
			reverseSharp: false,
			position: "4-1",
			edgeAdjust: true,
			showCall: $.noop,
			hideCall: $.noop
	}
})(jQuery); !
function(a) {
	a.fn.slide = function(b) {
		return a.fn.slide.defaults = {
				type: "slide",
				effect: "fade",
				autoPlay: !1,
				delayTime: 500,
				interTime: 15000,
				triggerTime: 150,
				defaultIndex: 0,
				titCell: ".hd li",
				mainCell: ".bd",
				targetCell: null,
				trigger: "mouseover",
				scroll: 1,
				vis: 1,
				titOnClassName: "on",
				autoPage: !1,
				prevCell: ".prev",
				nextCell: ".next",
				pageStateCell: ".pageState",
				opp: !1,
				pnLoop: !0,
				easing: "swing",
				startFun: null,
				endFun: null,
				switchLoad: null,
				playStateCell: ".playState",
				mouseOverStop: !0,
				defaultPlay: !0,
				returnDefault: !1
		},
		this.each(function() {
			var c = a.extend({},
					a.fn.slide.defaults, b),
					d = a(this),
					e = c.effect,
					f = a(c.prevCell, d),
					g = a(c.nextCell, d),
					h = a(c.pageStateCell, d),
					i = a(c.playStateCell, d),
					j = a(c.titCell, d),
					k = j.size(),
					l = a(c.mainCell, d),
					m = l.children().size(),
					n = c.switchLoad,
					o = a(c.targetCell, d),
					p = parseInt(c.defaultIndex),
					q = parseInt(c.delayTime),
					r = parseInt(c.interTime);
			parseInt(c.triggerTime);
			var Q, t = parseInt(c.scroll),
			u = parseInt(c.vis),
			v = "false" == c.autoPlay || 0 == c.autoPlay ? !1 : !0,
					w = "false" == c.opp || 0 == c.opp ? !1 : !0,
							x = "false" == c.autoPage || 0 == c.autoPage ? !1 : !0,
									y = "false" == c.pnLoop || 0 == c.pnLoop ? !1 : !0,
											z = "false" == c.mouseOverStop || 0 == c.mouseOverStop ? !1 : !0,
													A = "false" == c.defaultPlay || 0 == c.defaultPlay ? !1 : !0,
															B = "false" == c.returnDefault || 0 == c.returnDefault ? !1 : !0,
																	C = 0,
																	D = 0,
																	E = 0,
																	F = 0,
																	G = c.easing,
																	H = null,
																	I = null,
																	J = null,
																	K = c.titOnClassName,
																	L = j.index(d.find("." + K)),
																	M = p = -1 == L ? p: L,
																			N = p,
																			O = p,
																			P = m >= u ? 0 != m % t ? m % t: t: 0,
																					R = "leftMarquee" == e || "topMarquee" == e ? !0 : !1,
																							S = function() {
																						a.isFunction(c.startFun) && c.startFun(p, k, d, a(c.titCell, d), l, o, f, g)
																					},
																					T = function() {
																						a.isFunction(c.endFun) && c.endFun(p, k, d, a(c.titCell, d), l, o, f, g)
																					},
																					U = function() {
																						j.removeClass(K),
																						A && j.eq(N).addClass(K)
																					};
																					if ("menu" == c.type) return A && j.removeClass(K).eq(p).addClass(K),
																					j.hover(function() {
																						Q = a(this).find(c.targetCell);
																						var b = j.index(a(this));
																						I = setTimeout(function() {
																							switch (p = b, j.removeClass(K).eq(p).addClass(K), S(), e) {
																							case "fade":
																								Q.stop(!0, !0).animate({
																									opacity: "show"
																								},
																								q, G, T);
																								break;
																							case "slideDown":
																								Q.stop(!0, !0).animate({
																									height: "show"
																								},
																								q, G, T)
																							}
																						},
																						c.triggerTime)
																					},
																					function() {
																						switch (clearTimeout(I), e) {
																						case "fade":
																							Q.animate({
																								opacity:
																									"hide"
																							},
																							q, G);
																							break;
																						case "slideDown":
																							Q.animate({
																								height:
																									"hide"
																							},
																							q, G)
																						}
																					}),
																					B && d.hover(function() {
																						clearTimeout(J)
																					},
																					function() {
																						J = setTimeout(U, q)
																					}),
																					void 0;
																					if (0 == k && (k = m), R && (k = 2), x) {
																						if (m >= u) if ("leftLoop" == e || "topLoop" == e) k = 0 != m % t ? (0 ^ m / t) + 1 : m / t;
																						else {
																							var V = m - u;
																							k = 1 + parseInt(0 != V % t ? V / t + 1 : V / t),
																							0 >= k && (k = 1)
																						} else k = 1;
																						j.html("");
																						var W = "";
																						if (1 == c.autoPage || "true" == c.autoPage) for (var X = 0; k > X; X++) W += "<li>" + (X + 1) + "</li>";
																						else for (var X = 0; k > X; X++) W += c.autoPage.replace("$", X + 1);
																						j.html(W);
																						var j = j.children()
																					}
																					if (m >= u) {
																						l.children().each(function() {
																							a(this).width() > E && (E = a(this).width(), D = a(this).outerWidth(!0)),
																							a(this).height() > F && (F = a(this).height(), C = a(this).outerHeight(!0))
																						});
																						var Y = l.children(),
																						Z = function() {
																							for (var a = 0; u > a; a++) Y.eq(a).clone().addClass("clone").appendTo(l);
																							for (var a = 0; P > a; a++) Y.eq(m - a - 1).clone().addClass("clone").prependTo(l)
																						};
																						switch (e) {
																						case "fold":
																							l.css({
																								position:
																									"relative",
																									width: D,
																									height: C
																							}).children().css({
																								position: "absolute",
																								width: E,
																								left: 0,
																								top: 0,
																								display: "none"
																							});
																							break;
																						case "top":
																							l.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:' + u * C + 'px"></div>').css({
																								top: -(p * t) * C,
																								position: "relative",
																								padding: "0",
																								margin: "0"
																							}).children().css({
																								height: F
																							});
																							break;
																						case "left":
																							l.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:' + u * D + 'px"></div>').css({
																								width: m * D,
																								left: -(p * t) * D,
																								position: "relative",
																								overflow: "hidden",
																								padding: "0",
																								margin: "0"
																							}).children().css({
																								"float": "left",
																								width: E
																							});
																							break;
																						case "leftLoop":
																						case "leftMarquee":
																							Z(),
																							l.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:' + u * D + 'px"></div>').css({
																								width: (m + u + P) * D,
																								position: "relative",
																								overflow: "hidden",
																								padding: "0",
																								margin: "0",
																								left: -(P + p * t) * D
																							}).children().css({
																								"float": "left",
																								width: E
																							});
																							break;
																						case "topLoop":
																						case "topMarquee":
																							Z(),
																							l.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:' + u * C + 'px"></div>').css({
																								height: (m + u + P) * C,
																								position: "relative",
																								padding: "0",
																								margin: "0",
																								top: -(P + p * t) * C
																							}).children().css({
																								height: F
																							})
																						}
																					}
																					var $ = function(a) {
																						var b = a * t;
																						return a == k ? b = m: -1 == a && 0 != m % t && (b = -m % t),
																								b
																					},
																					_ = function(b) {
																						var c = function(c) {
																							for (var d = c; u + c > d; d++) b.eq(d).find("img[" + n + "]").each(function() {
																								var b = a(this);
																								if (b.attr("src", b.attr(n)).removeAttr(n), l.find(".clone")[0]) for (var c = l.children(), d = 0; d < c.size(); d++) c.eq(d).find("img[" + n + "]").each(function() {
																									a(this).attr(n) == b.attr("src") && a(this).attr("src", a(this).attr(n)).removeAttr(n)
																								})
																							})
																						};
																						switch (e) {
																						case "fade":
																						case "fold":
																						case "top":
																						case "left":
																						case "slideDown":
																							c(p * t);
																							break;
																						case "leftLoop":
																						case "topLoop":
																							c(P + $(O));
																							break;
																						case "leftMarquee":
																						case "topMarquee":
																							var d = "leftMarquee" == e ? l.css("left").replace("px", "") : l.css("top").replace("px", ""),
																									f = "leftMarquee" == e ? D: C,
																											g = P;
																							if (0 != d % f) {
																								var h = Math.abs(0 ^ d / f);
																								g = 1 == p ? P + h: P + h - 1
																							}
																							c(g)
																						}
																					},
																					ab = function(a) {
																						if (!A || M != p || a || R) {
																							if (R ? p >= 1 ? p = 1 : 0 >= p && (p = 0) : (O = p, p >= k ? p = 0 : 0 > p && (p = k - 1)), S(), null != n && _(l.children()), o[0] && (Q = o.eq(p), null != n && _(o), "slideDown" == e ? (o.not(Q).stop(!0, !0).slideUp(q), Q.slideDown(q, G,
																									function() {
																								l[0] || T()
																							})) : (o.not(Q).stop(!0, !0).hide(), Q.animate({
																								opacity: "show"
																							},
																							q,
																							function() {
																								l[0] || T()
																							}))), m >= u) switch (e) {
																							case "fade":
																								l.children().stop(!0, !0).eq(p).animate({
																									opacity: "show"
																								},
																								q, G,
																								function() {
																									T()
																								}).siblings().hide();
																								break;
																							case "fold":
																								l.children().stop(!0, !0).eq(p).animate({
																									opacity: "show"
																								},
																								q, G,
																								function() {
																									T()
																								}).siblings().animate({
																									opacity: "hide"
																								},
																								q, G);
																								break;
																							case "top":
																								l.stop(!0, !1).animate({
																									top: -p * t * C
																								},
																								q, G,
																								function() {
																									T()
																								});
																								break;
																							case "left":
																								l.stop(!0, !1).animate({
																									left: -p * t * D
																								},
																								q, G,
																								function() {
																									T()
																								});
																								break;
																							case "leftLoop":
																								var b = O;
																								l.stop(!0, !0).animate({
																									left: -($(O) + P) * D
																								},
																								q, G,
																								function() { - 1 >= b ? l.css("left", -(P + (k - 1) * t) * D) : b >= k && l.css("left", -P * D),
																										T()
																								});
																								break;
																							case "topLoop":
																								var b = O;
																								l.stop(!0, !0).animate({
																									top: -($(O) + P) * C
																								},
																								q, G,
																								function() { - 1 >= b ? l.css("top", -(P + (k - 1) * t) * C) : b >= k && l.css("top", -P * C),
																										T()
																								});
																								break;
																							case "leftMarquee":
																								var c = l.css("left").replace("px", "");
																								0 == p ? l.animate({
																									left: ++c
																								},
																								0,
																								function() {
																									l.css("left").replace("px", "") >= 0 && l.css("left", -m * D)
																								}) : l.animate({
																									left: --c
																								},
																								0,
																								function() {
																									l.css("left").replace("px", "") <= -(m + P) * D && l.css("left", -P * D)
																								});
																								break;
																							case "topMarquee":
																								var d = l.css("top").replace("px", "");
																								0 == p ? l.animate({
																									top: ++d
																								},
																								0,
																								function() {
																									l.css("top").replace("px", "") >= 0 && l.css("top", -m * C)
																								}) : l.animate({
																									top: --d
																								},
																								0,
																								function() {
																									l.css("top").replace("px", "") <= -(m + P) * C && l.css("top", -P * C)
																								})
																							}
																							j.removeClass(K).eq(p).addClass(K),
																							M = p,
																							y || (g.removeClass("nextStop"), f.removeClass("prevStop"), 0 == p && f.addClass("prevStop"), p == k - 1 && g.addClass("nextStop")),
																							h.html("<span>" + (p + 1) + "</span>/" + k)
																						}
																					};
																					A && ab(!0),
																					B && d.hover(function() {
																						clearTimeout(J)
																					},
																					function() {
																						J = setTimeout(function() {
																							p = N,
																							A ? ab() : "slideDown" == e ? Q.slideUp(q, U) : Q.animate({
																								opacity: "hide"
																							},
																							q, U),
																							M = p
																						},
																						300)
																					});
																					var bb = function(a) {
																						H = setInterval(function() {
																							w ? p--:p++,
																									ab()
																						},
																						a ? a: r)
																					},
																					cb = function(a) {
																						H = setInterval(ab, a ? a: r)
																					},
																					db = function() {
																						z || (clearInterval(H), bb())
																					},
																					eb = function() { (y || p != k - 1) && (p++, ab(), R || db())
																					},
																					fb = function() { (y || 0 != p) && (p--, ab(), R || db())
																					},
																					gb = function() {
																						clearInterval(H),
																						R ? cb() : bb(),
																								i.removeClass("pauseState")
																					},
																					hb = function() {
																						clearInterval(H),
																						i.addClass("pauseState")
																					};
																					if (v ? R ? (w ? p--:p++, cb(), z && l.hover(hb, gb)) : (bb(), z && d.hover(hb, gb)) : (R && (w ? p--:p++), i.addClass("pauseState")), i.click(function() {
																						i.hasClass("pauseState") ? gb() : hb()
																					}), "mouseover" == c.trigger ? j.hover(function() {
																						var a = j.index(this);
																						I = setTimeout(function() {
																							p = a,
																							ab(),
																							db()
																						},
																						c.triggerTime)
																					},
																					function() {
																						clearTimeout(I)
																					}) : j.click(function() {
																						p = j.index(this),
																						ab(),
																						db()
																					}), R) {
																						if (g.mousedown(eb), f.mousedown(fb), y) {
																							var ib, jb = function() {
																								ib = setTimeout(function() {
																									clearInterval(H),
																									cb(0 ^ r / 10)
																								},
																								150)
																							},
																							kb = function() {
																								clearTimeout(ib),
																								clearInterval(H),
																								cb()
																							};
																							g.mousedown(jb),
																							g.mouseup(kb),
																							f.mousedown(jb),
																							f.mouseup(kb)
																						}
																						"mouseover" == c.trigger && (g.hover(eb,
																								function() {}), f.hover(fb,
																										function() {}))
																					} else g.click(eb),
																					f.click(fb)
		})
	}
} (jQuery),
jQuery.easing.jswing = jQuery.easing.swing,
jQuery.extend(jQuery.easing, {
	def: "easeOutQuad",
	swing: function(a, b, c, d, e) {
		return jQuery.easing[jQuery.easing.def](a, b, c, d, e)
	},
	easeInQuad: function(a, b, c, d, e) {
		return d * (b /= e) * b + c
	},
	easeOutQuad: function(a, b, c, d, e) {
		return - d * (b /= e) * (b - 2) + c
	},
	easeInOutQuad: function(a, b, c, d, e) {
		return (b /= e / 2) < 1 ? d / 2 * b * b + c: -d / 2 * (--b * (b - 2) - 1) + c
	},
	easeInCubic: function(a, b, c, d, e) {
		return d * (b /= e) * b * b + c
	},
	easeOutCubic: function(a, b, c, d, e) {
		return d * ((b = b / e - 1) * b * b + 1) + c
	},
	easeInOutCubic: function(a, b, c, d, e) {
		return (b /= e / 2) < 1 ? d / 2 * b * b * b + c: d / 2 * ((b -= 2) * b * b + 2) + c
	},
	easeInQuart: function(a, b, c, d, e) {
		return d * (b /= e) * b * b * b + c
	},
	easeOutQuart: function(a, b, c, d, e) {
		return - d * ((b = b / e - 1) * b * b * b - 1) + c
	},
	easeInOutQuart: function(a, b, c, d, e) {
		return (b /= e / 2) < 1 ? d / 2 * b * b * b * b + c: -d / 2 * ((b -= 2) * b * b * b - 2) + c
	},
	easeInQuint: function(a, b, c, d, e) {
		return d * (b /= e) * b * b * b * b + c
	},
	easeOutQuint: function(a, b, c, d, e) {
		return d * ((b = b / e - 1) * b * b * b * b + 1) + c
	},
	easeInOutQuint: function(a, b, c, d, e) {
		return (b /= e / 2) < 1 ? d / 2 * b * b * b * b * b + c: d / 2 * ((b -= 2) * b * b * b * b + 2) + c
	},
	easeInSine: function(a, b, c, d, e) {
		return - d * Math.cos(b / e * (Math.PI / 2)) + d + c
	},
	easeOutSine: function(a, b, c, d, e) {
		return d * Math.sin(b / e * (Math.PI / 2)) + c
	},
	easeInOutSine: function(a, b, c, d, e) {
		return - d / 2 * (Math.cos(Math.PI * b / e) - 1) + c
	},
	easeInExpo: function(a, b, c, d, e) {
		return 0 == b ? c: d * Math.pow(2, 10 * (b / e - 1)) + c
	},
	easeOutExpo: function(a, b, c, d, e) {
		return b == e ? c + d: d * ( - Math.pow(2, -10 * b / e) + 1) + c
	},
	easeInOutExpo: function(a, b, c, d, e) {
		return 0 == b ? c: b == e ? c + d: (b /= e / 2) < 1 ? d / 2 * Math.pow(2, 10 * (b - 1)) + c: d / 2 * ( - Math.pow(2, -10 * --b) + 2) + c
	},
	easeInCirc: function(a, b, c, d, e) {
		return - d * (Math.sqrt(1 - (b /= e) * b) - 1) + c
	},
	easeOutCirc: function(a, b, c, d, e) {
		return d * Math.sqrt(1 - (b = b / e - 1) * b) + c
	},
	easeInOutCirc: function(a, b, c, d, e) {
		return (b /= e / 2) < 1 ? -d / 2 * (Math.sqrt(1 - b * b) - 1) + c: d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c
	},
	easeInElastic: function(a, b, c, d, e) {
		var f = 1.70158,
		g = 0,
		h = d;
		if (0 == b) return c;
		if (1 == (b /= e)) return c + d;
		if (g || (g = .3 * e), h < Math.abs(d)) {
			h = d;
			var f = g / 4
		} else var f = g / (2 * Math.PI) * Math.asin(d / h);
		return - (h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g)) + c
	},
	easeOutElastic: function(a, b, c, d, e) {
		var f = 1.70158,
		g = 0,
		h = d;
		if (0 == b) return c;
		if (1 == (b /= e)) return c + d;
		if (g || (g = .3 * e), h < Math.abs(d)) {
			h = d;
			var f = g / 4
		} else var f = g / (2 * Math.PI) * Math.asin(d / h);
		return h * Math.pow(2, -10 * b) * Math.sin((b * e - f) * 2 * Math.PI / g) + d + c
	},
	easeInOutElastic: function(a, b, c, d, e) {
		var f = 1.70158,
		g = 0,
		h = d;
		if (0 == b) return c;
		if (2 == (b /= e / 2)) return c + d;
		if (g || (g = e * .3 * 1.5), h < Math.abs(d)) {
			h = d;
			var f = g / 4
		} else var f = g / (2 * Math.PI) * Math.asin(d / h);
		return 1 > b ? -.5 * h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) + c: .5 * h * Math.pow(2, -10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) + d + c
	},
	easeInBack: function(a, b, c, d, e, f) {
		return void 0 == f && (f = 1.70158),
		d * (b /= e) * b * ((f + 1) * b - f) + c
	},
	easeOutBack: function(a, b, c, d, e, f) {
		return void 0 == f && (f = 1.70158),
		d * ((b = b / e - 1) * b * ((f + 1) * b + f) + 1) + c
	},
	easeInOutBack: function(a, b, c, d, e, f) {
		return void 0 == f && (f = 1.70158),
		(b /= e / 2) < 1 ? d / 2 * b * b * (((f *= 1.525) + 1) * b - f) + c: d / 2 * ((b -= 2) * b * (((f *= 1.525) + 1) * b + f) + 2) + c
	},
	easeInBounce: function(a, b, c, d, e) {
		return d - jQuery.easing.easeOutBounce(a, e - b, 0, d, e) + c
	},
	easeOutBounce: function(a, b, c, d, e) {
		return (b /= e) < 1 / 2.75 ? d * 7.5625 * b * b + c: 2 / 2.75 > b ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c: 2.5 / 2.75 > b ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c: d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c
	},
	easeInOutBounce: function(a, b, c, d, e) {
		return e / 2 > b ? .5 * jQuery.easing.easeInBounce(a, 2 * b, 0, d, e) + c: .5 * jQuery.easing.easeOutBounce(a, 2 * b - e, 0, d, e) + .5 * d + c
	}
});
var faisunMenu_openedfolderimage_src = "../menutree/openedfolder.png";
var faisunMenu_closedfolderimage_src = "../menutree/closedfolder.png";
var faisunMenu_menufileimage_src = "../menutree/menufile.png";
var faisunMenu_treetext = new Array();
var faisunMenu_treeurl = new Array();
var faisunMenu_treeurltarget = new Array();
var faisunMenu_treeNum = 0;
document.write("<style type='text/css'>.blockhide{display:none;} .blockmove{overflow: hidden;height:1px;display:block;} .blockshow{overflow: visible;height:auto!important;min-height:20px;display:block;} .hideme{overflow: visible;display:none;} .showme{overflow: visible;display:block;} .faisunMenu td{font-size:14px;} </style>");
function outinit(itemNo, dir, blockheight) {
	var subfiles = document.all["item" + itemNo];
	if (blockheight == 0) {
		subfiles.className = "blockshow";
		blockheight = parseInt(subfiles.offsetHeight);
		if (dir > 0) {
			subfiles.className = "blockmove"
		}
	}
	var outinspeed = blockheight / 5;
	var nowheight = parseInt(subfiles.offsetHeight) + outinspeed * dir;
	if (nowheight <= 0) {
		subfiles.className = "blockhide";
		return
	} else {
		subfiles.className = "blockmove"
	}
	if (nowheight >= blockheight && dir > 0) {
		subfiles.className = "blockshow";
		return
	}
	subfiles.style.height = nowheight;
	subfiles.scrollTop = blockheight;
	parentsresize(subfiles);
	setTimeout("outinit(" + itemNo + "," + dir + "," + blockheight + ")", 15)
}
function parentsresize(obj) {
	do {
		if (obj.className == "faisunMenu") {
			break
		}
		if (obj.className == "blockshow") {
			obj.style.height = "1px"
		}
	} while ( obj = obj . parentElement )
}
function showhideit(itemNo) {
	var showfolder = $("img[name='openedfolderimage" + itemNo + "']");
	var hidefolder = $("img[name='closedfolderimage" + itemNo + "']");
	var subfiles = $("#item" + itemNo);
	if (showfolder.attr("class") == "hideme") {
		showfolder.attr("class", "showme");
		hidefolder.attr("class", "hideme");
		subfiles.attr("class", "blockshow")
	} else {
		showfolder.attr("class", "hideme");
		hidefolder.attr("class", "showme");
		subfiles.attr("class", "blockhide")
	}
}
function addtree(text, url, target) {
	faisunMenu_treetext.push(text);
	faisunMenu_treeurl.push(url ? url: "");
	faisunMenu_treeurltarget.push(target ? target: "mainframe")
}
function getsubnum(text) {
	var newtext = text.replace(/^-*/, "");
	return text.length - newtext.length
}
function createtree() {
	faisunMenu_treeNum++;
	var treestatus = new Array();
	var treeendlayer = new Array();
	var openedlayer = new Array();
	var next_subnum = 0;
	for (i = faisunMenu_treetext.length - 1; i >= 0; i--) {
		var subnum = getsubnum(faisunMenu_treetext[i]);
		treestatus[i] = 0;
		if (subnum < next_subnum) {
			treeendlayer[next_subnum] = 0;
			treestatus[i] += 1
		}
		if (!treeendlayer[subnum]) {
			treeendlayer[subnum] = 1;
			treestatus[i] += 2
		}
		next_subnum = subnum
	}
	var echo = "<div class='faisunMenu'>";
	for (i = 0; i < faisunMenu_treetext.length; i++) {
		if (!faisunMenu_treetext[i]) {
			continue
		}
		var subnum = getsubnum(faisunMenu_treetext[i]);
		var newtext = faisunMenu_treetext[i].replace(/^-*\*?/, "");
		if (treestatus[i] == 1 || treestatus[i] == 3) {
			var havechild = 1
		} else {
			var havechild = 0
		}
		if (treestatus[i] == 2 || treestatus[i] == 3) {
			openedlayer[subnum] = 0;
			var barstatus = 2
		} else {
			openedlayer[subnum] = 1;
			var barstatus = 1
		}
		var showme = faisunMenu_treetext[i].match(/^-*\*/);
		var openfold = (i == faisunMenu_treetext.length - 1 ? 0 : faisunMenu_treetext[i + 1].match(/^-*\*/));
		var li = i - 1;
		if (i > 0 && (treestatus[li] == 1 || treestatus[li] == 3)) {
			echo += "<div id='item" + faisunMenu_treeNum + li + "' class='" + (showme ? "blockshow": "blockhide") + "'>"
		}
		echo += "<table border='0' cellspacing='0' cellpadding='0' " + (subnum == 0 ? "height=25": "") + "><tr>\n";
		for (j = 1; j < subnum; j++) {
			echo += "<td width='30' valign=bottom><img src='../menutree/" + (openedlayer[j] ? "bar3.gif": "spacer.gif") + "' width='30' height='30'></td>\n"
		}
		if (subnum > 0) {
			echo += "<td width='30' valign=bottom><img src='../menutree/bar" + barstatus + ".gif' width='30' height='30'></td>"
		}
		var clicktoshowhide = (havechild ? "onclick='showhideit(" + faisunMenu_treeNum + "" + i + ")' style='cursor:pointer' ": "");
		echo += "<td width='32' valign=bottom " + clicktoshowhide + "><img name='openedfolderimage" + faisunMenu_treeNum + "" + i + "' src='" + (havechild ? faisunMenu_openedfolderimage_src: faisunMenu_menufileimage_src) + "' class='" + (openfold ? "showme": "hideme") + "' width='30' height='30'><img name='closedfolderimage" + faisunMenu_treeNum + "" + i + "' src='" + (havechild ? faisunMenu_closedfolderimage_src: faisunMenu_menufileimage_src) + "' class='" + (openfold ? "hideme": "showme") + "' width='30' height='30'></td>";
		echo += "<td nowrap valign=bottom><a " + clicktoshowhide + " " + (faisunMenu_treeurl[i] ? "href='" + faisunMenu_treeurl[i] + "'": "name='#'") + " target='" + faisunMenu_treeurltarget[i] + "'>" + newtext + "</a></td></tr></table>\n\n";
		if (barstatus == 2 && !havechild) {
			for (j = subnum; j >= 0; j--) {
				if (!openedlayer[j]) {
					echo += "</div>"
				} else {
					break
				}
			}
		}
	}
	echo += "</div>";
	document.write(echo);
	faisunMenu_treetext = new Array();
	faisunMenu_treeurl = new Array();
	faisunMenu_treeurltarget = new Array()
};
var require, define; !
function(r) {
	function e(r, e) {
		var u = n[r] || {},
		o = u.pkg ? i[u.pkg].url: u.url || r;
		if (! (o in f)) {
			f[o] = !0;
			var p = a[r] || (a[r] = []);
			p.push(e);
			var s = document.createElement("script");
			s.type = "text/javascript",
			s.src = o,
			t.appendChild(s)
		}
	}
	var n, i, t = document.getElementsByTagName("head")[0],
	a = {},
	u = {},
	o = {},
	f = {};
	define = function(r, e) {
		u[r] = e;
		var n = a[r];
		if (n) {
			for (var i = n.length - 1; i >= 0; --i) n[i]();
			delete a[r]
		}
	},
	require = function(r) {
		r = require.alias(r);
		var e = o[r];
		if (e) return e.exports;
		var n = u[r];
		if (!n) throw Error("Cannot find module `" + r + "`");
		e = o[r] = {
				exports: {}
		};
		var i = "function" == typeof n ? n.apply(e, [require, e.exports, e]) : n;
		return i && (e.exports = i),
		e.exports
	},
	require.async = function(i, t) {
		function a(r) {
			for (var i = r.length - 1; i >= 0; --i) {
				var t = r[i];
				if (! (t in u || t in p)) {
					p[t] = !0,
					s++,
					e(t, o);
					var f = n[t];
					f && "deps" in f && a(f.deps)
				}
			}
		}
		function o() {
			if (0 == s--) {
				var e, n = [];
				for (e = i.length - 1; e >= 0; --e) n[e] = require(i[e]);
				t && t.apply(r, n)
			}
		}
		"string" == typeof i && (i = [i]);
		for (var f = i.length - 1; f >= 0; --f) i[f] = require.alias(i[f]);
		var p = {},
		s = 0;
		a(i),
		o()
	},
	require.resourceMap = function(r) {
		n = r.res || {},
		i = r.pkg || {}
	},
	require.alias = function(r) {
		return r
	},
	define.amd = {
			jQuery: !0,
			version: "1.0.0"
	}
} (this);
define("common:widget/sidebar/sidebar.js",
		function(o, e, i) {
	var r = function() {
		this.$root = $(".mod-sidebar"),
		this.timeoutId = -1
	};
	r.prototype = {
			init: function() {
				this.bindUI()
			},
			bindUI: function() {
				var o = this;
				this.showOrHideTopBtn(),
				this.bindSearch(),
				this.$root.on("click", ".favorite", $.proxy(this.favorite, this)),
				this.$root.find(".close-btn").hover(function() {
					o.$root.find(".close-tip").fadeIn(200)
				},
				function() {
					o.$root.find(".close-tip").fadeOut(200)
				}),
				this.$root.on("focus", ".searchInput", $.proxy(this.placeHolder, this)),
				this.$root.on("mouseenter", ".qr-code", $.proxy(this.qrcodeMouseEnter, this)),
				this.$root.on("mouseenter", ".qr-code-container", $.proxy(this.qrcodeContainerMouseEnter, this)),
				this.$root.on("mouseleave", ".qr-code", $.proxy(this.qrcodeMouseLeave, this)),
				this.$root.on("mouseleave", ".qr-code-container", $.proxy(this.qrcodeContainerMouseLeave, this))
			},
			showOrHideTopBtn: function() {
				var o = this.$root.find(".gotop");
				$(window).scroll(function() {
					var e = $(window).scrollTop();
					e > 60 ? o.slideDown(300) : o.slideUp(300)
				})
			},
			bindSearch: function() {
				this.$root.on("click", ".search", $.proxy(this.showOrSubmitSearch, this)),
				this.registerHideSearchBox()
			},
			showOrSubmitSearch: function() {
				var o = this.$root.find(".searchbox");
				if (o.hasClass("show")) {
					var e = this.$root.find(".searchInput"),
					i = "输入搜索词";
					if (e.val().length > 0 && e.val() !== i) {
						var t = this.$root.find(".submit-btn");
						$.click()
					}
				} else o.addClass("show")
			},
			registerHideSearchBox: function() {
				var o = this.$root.find(".searchbox"),
				e = this.$root.find(".searchbox .close-btn"),
				i = this.$root.find(".close-tip");
				e.click(function() {
					o.removeClass("show"),
					i.fadeOut(200)
				}),
				$("body").on("click",
						function(e) {
					var i = $(e.target);
					0 === i.closest("#goTop").length && o.removeClass("show")
				})
			},
			favorite: function() {
				if (window.sidebar && window.sidebar.addPanel) window.sidebar.addPanel(document.title, window.location.href, "");
				else if (window.external && "AddFavorite" in window.external) window.external.AddFavorite(location.href, document.title);
				else {
					if (window.opera && window.print) return this.title = document.title,
					!0;
					var o = -1 !== navigator.userAgent.toLowerCase().indexOf("mac") ? "Command/Cmd": "Ctrl",
							e = o + "+D 把科技管理信息系统公共服务平台放入收藏夹！";
					this.notice(e)
				}
			},
			notice: function(o) {
				var e = $(".mod-sidebar .notice-sidebar-favorite"),
				i = this;
				if (e.length > 0) e.show(0,
						function() {
					i.fadeOut(e)
				});
				else {
					var n = ['<li class="notice-sidebar-favorite">', '<span class="content">' + o + "</span>", '<i class="arrow"></i>', "</li>"].join("");
					e = $(n),
					this.$root.append(e),
					e.show(0,
							function() {
						i.fadeOut(e)
					}),
					setTimeout(function() {
						i.bindHideNoticeEvent(e)
					},
					1e3)
				}
			},
			fadeOut: function(o) {
				var e = 3e3;
				this.timeoutId = setTimeout(function() {
					o.fadeOut()
				},
				e)
			},
			bindHideNoticeEvent: function(o) {
				var e = this;
				$("body").on("click",
						function(i) {
					var n = $(i.target);
					0 === n.closest(".favorite").length && (o.hide(), clearTimeout(e.timeoutId))
				})
			},
			placeHolder: function(o) {
				var e = $(o.currentTarget);
				"输入搜索词" === e.val() && e.val(""),
				e.css("color", "#fff")
			},
			showQrcodeContainer: function() {
				$(".qr-code-container").fadeIn(100);
				var o = navigator.appName,
				e = navigator.appVersion.split(";")[1].replace(/[ ]/g, "");
				"Microsoft Internet Explorer" !== o || "MSIE6.0" !== e && "MSIE7.0" !== e || $(".hotword").css("margin-top", "3px")
			},
			hideQrcodeContainer: function() {
				if (!window.isSidebarQrcodeMouseOn) {
					$(".qr-code-container").fadeOut(100);
					var o = navigator.appName,
					e = navigator.appVersion.split(";")[1].replace(/[ ]/g, "");
					"Microsoft Internet Explorer" !== o || "MSIE6.0" !== e && "MSIE7.0" !== e || $(".hotword").css("margin-top", "0")
				}
			},
			qrcodeMouseEnter: function() {
				window.isSidebarQrcodeMouseOn = !0,
				this.showQrcodeContainer()
			},
			qrcodeContainerMouseEnter: function() {
				window.isSidebarQrcodeMouseOn = !0
			},
			qrcodeMouseLeave: function() {
				window.isSidebarQrcodeMouseOn = !1,
				setTimeout(this.hideQrcodeContainer, 500)
			},
			qrcodeContainerMouseLeave: function() {
				window.isSidebarQrcodeMouseOn = !1,
				setTimeout(this.hideQrcodeContainer, 500)
			}
	},
	i.exports = r
});;