(function () {
    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    'use strict';
    var C;

    function ca(a) {
        var c = 0;
        return function () {
            return c < a.length ? {
                done: !1,
                value: a[c++]
            } : {
                done: !0
            }
        }
    }
    var E = "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, c, b) {
        if (a == Array.prototype || a == Object.prototype) return a;
        a[c] = b.value;
        return a
    };

    function da(a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var c = 0; c < a.length; ++c) {
            var b = a[c];
            if (b && b.Math == Math) return b
        }
        throw Error("Cannot find global object");
    }
    var G = da(this);

    function H(a, c) {
        if (c) a: {
            var b = G;a = a.split(".");
            for (var d = 0; d < a.length - 1; d++) {
                var f = a[d];
                if (!(f in b)) break a;
                b = b[f]
            }
            a = a[a.length - 1];d = b[a];c = c(d);c != d && null != c && E(b, a, {
                configurable: !0,
                writable: !0,
                value: c
            })
        }
    }
    H("Symbol", function (a) {
        function c(k) {
            if (this instanceof c) throw new TypeError("Symbol is not a constructor");
            return new b(d + (k || "") + "_" + f++, k)
        }

        function b(k, e) {
            this.g = k;
            E(this, "description", {
                configurable: !0,
                writable: !0,
                value: e
            })
        }
        if (a) return a;
        b.prototype.toString = function () {
            return this.g
        };
        var d = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_",
            f = 0;
        return c
    });
    H("Symbol.iterator", function (a) {
        if (a) return a;
        a = Symbol("Symbol.iterator");
        for (var c = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), b = 0; b < c.length; b++) {
            var d = G[c[b]];
            "function" === typeof d && "function" != typeof d.prototype[a] && E(d.prototype, a, {
                configurable: !0,
                writable: !0,
                value: function () {
                    return ea(ca(this))
                }
            })
        }
        return a
    });

    function ea(a) {
        a = {
            next: a
        };
        a[Symbol.iterator] = function () {
            return this
        };
        return a
    }

    function J(a) {
        var c = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
        return c ? c.call(a) : {
            next: ca(a)
        }
    }

    function fa(a) {
        if (!(a instanceof Array)) {
            a = J(a);
            for (var c, b = []; !(c = a.next()).done;) b.push(c.value);
            a = b
        }
        return a
    }
    var K;
    if ("function" == typeof Object.setPrototypeOf) K = Object.setPrototypeOf;
    else {
        var M;
        a: {
            var ha = {
                    a: !0
                },
                ia = {};
            try {
                ia.__proto__ = ha;
                M = ia.a;
                break a
            } catch (a) {}
            M = !1
        }
        K = M ? function (a, c) {
            a.__proto__ = c;
            if (a.__proto__ !== c) throw new TypeError(a + " is not extensible");
            return a
        } : null
    }
    var ja = K;

    function N() {
        this.l = !1;
        this.h = null;
        this.j = void 0;
        this.g = 1;
        this.s = this.m = 0;
        this.i = null
    }

    function O(a) {
        if (a.l) throw new TypeError("Generator is already running");
        a.l = !0
    }
    N.prototype.o = function (a) {
        this.j = a
    };

    function P(a, c) {
        a.i = {
            M: c,
            N: !0
        };
        a.g = a.m || a.s
    }
    N.prototype.return = function (a) {
        this.i = {
            return: a
        };
        this.g = this.s
    };

    function Q(a, c, b) {
        a.g = b;
        return {
            value: c
        }
    }

    function ka(a) {
        this.g = new N;
        this.h = a
    }

    function na(a, c) {
        O(a.g);
        var b = a.g.h;
        if (b) return R(a, "return" in b ? b["return"] : function (d) {
            return {
                value: d,
                done: !0
            }
        }, c, a.g.return);
        a.g.return(c);
        return S(a)
    }

    function R(a, c, b, d) {
        try {
            var f = c.call(a.g.h, b);
            if (!(f instanceof Object)) throw new TypeError("Iterator result " + f + " is not an object");
            if (!f.done) return a.g.l = !1, f;
            var k = f.value
        } catch (e) {
            return a.g.h = null, P(a.g, e), S(a)
        }
        a.g.h = null;
        d.call(a.g, k);
        return S(a)
    }

    function S(a) {
        for (; a.g.g;) try {
            var c = a.h(a.g);
            if (c) return a.g.l = !1, {
                value: c.value,
                done: !1
            }
        } catch (b) {
            a.g.j = void 0, P(a.g, b)
        }
        a.g.l = !1;
        if (a.g.i) {
            c = a.g.i;
            a.g.i = null;
            if (c.N) throw c.M;
            return {
                value: c.return,
                done: !0
            }
        }
        return {
            value: void 0,
            done: !0
        }
    }

    function oa(a) {
        this.next = function (c) {
            O(a.g);
            a.g.h ? c = R(a, a.g.h.next, c, a.g.o) : (a.g.o(c), c = S(a));
            return c
        };
        this.throw = function (c) {
            O(a.g);
            a.g.h ? c = R(a, a.g.h["throw"], c, a.g.o) : (P(a.g, c), c = S(a));
            return c
        };
        this.return = function (c) {
            return na(a, c)
        };
        this[Symbol.iterator] = function () {
            return this
        }
    }

    function T(a, c) {
        c = new oa(new ka(c));
        ja && a.prototype && ja(c, a.prototype);
        return c
    }
    var pa = "function" == typeof Object.assign ? Object.assign : function (a, c) {
        for (var b = 1; b < arguments.length; b++) {
            var d = arguments[b];
            if (d)
                for (var f in d) Object.prototype.hasOwnProperty.call(d, f) && (a[f] = d[f])
        }
        return a
    };
    H("Object.assign", function (a) {
        return a || pa
    });
    H("Promise", function (a) {
        function c(e) {
            this.h = 0;
            this.i = void 0;
            this.g = [];
            this.o = !1;
            var g = this.j();
            try {
                e(g.resolve, g.reject)
            } catch (h) {
                g.reject(h)
            }
        }

        function b() {
            this.g = null
        }

        function d(e) {
            return e instanceof c ? e : new c(function (g) {
                g(e)
            })
        }
        if (a) return a;
        b.prototype.h = function (e) {
            if (null == this.g) {
                this.g = [];
                var g = this;
                this.i(function () {
                    g.l()
                })
            }
            this.g.push(e)
        };
        var f = G.setTimeout;
        b.prototype.i = function (e) {
            f(e, 0)
        };
        b.prototype.l = function () {
            for (; this.g && this.g.length;) {
                var e = this.g;
                this.g = [];
                for (var g = 0; g < e.length; ++g) {
                    var h =
                        e[g];
                    e[g] = null;
                    try {
                        h()
                    } catch (m) {
                        this.j(m)
                    }
                }
            }
            this.g = null
        };
        b.prototype.j = function (e) {
            this.i(function () {
                throw e;
            })
        };
        c.prototype.j = function () {
            function e(m) {
                return function (q) {
                    h || (h = !0, m.call(g, q))
                }
            }
            var g = this,
                h = !1;
            return {
                resolve: e(this.D),
                reject: e(this.l)
            }
        };
        c.prototype.D = function (e) {
            if (e === this) this.l(new TypeError("A Promise cannot resolve to itself"));
            else if (e instanceof c) this.J(e);
            else {
                a: switch (typeof e) {
                    case "object":
                        var g = null != e;
                        break a;
                    case "function":
                        g = !0;
                        break a;
                    default:
                        g = !1
                }
                g ? this.C(e) : this.m(e)
            }
        };
        c.prototype.C = function (e) {
            var g = void 0;
            try {
                g = e.then
            } catch (h) {
                this.l(h);
                return
            }
            "function" == typeof g ? this.K(g, e) : this.m(e)
        };
        c.prototype.l = function (e) {
            this.s(2, e)
        };
        c.prototype.m = function (e) {
            this.s(1, e)
        };
        c.prototype.s = function (e, g) {
            if (0 != this.h) throw Error("Cannot settle(" + e + ", " + g + "): Promise already settled in state" + this.h);
            this.h = e;
            this.i = g;
            2 === this.h && this.I();
            this.A()
        };
        c.prototype.I = function () {
            var e = this;
            f(function () {
                if (e.B()) {
                    var g = G.console;
                    "undefined" !== typeof g && g.error(e.i)
                }
            }, 1)
        };
        c.prototype.B =
            function () {
                if (this.o) return !1;
                var e = G.CustomEvent,
                    g = G.Event,
                    h = G.dispatchEvent;
                if ("undefined" === typeof h) return !0;
                "function" === typeof e ? e = new e("unhandledrejection", {
                    cancelable: !0
                }) : "function" === typeof g ? e = new g("unhandledrejection", {
                    cancelable: !0
                }) : (e = G.document.createEvent("CustomEvent"), e.initCustomEvent("unhandledrejection", !1, !0, e));
                e.promise = this;
                e.reason = this.i;
                return h(e)
            };
        c.prototype.A = function () {
            if (null != this.g) {
                for (var e = 0; e < this.g.length; ++e) k.h(this.g[e]);
                this.g = null
            }
        };
        var k = new b;
        c.prototype.J =
            function (e) {
                var g = this.j();
                e.F(g.resolve, g.reject)
            };
        c.prototype.K = function (e, g) {
            var h = this.j();
            try {
                e.call(g, h.resolve, h.reject)
            } catch (m) {
                h.reject(m)
            }
        };
        c.prototype.then = function (e, g) {
            function h(u, v) {
                return "function" == typeof u ? function (z) {
                    try {
                        m(u(z))
                    } catch (n) {
                        q(n)
                    }
                } : v
            }
            var m, q, A = new c(function (u, v) {
                m = u;
                q = v
            });
            this.F(h(e, m), h(g, q));
            return A
        };
        c.prototype.catch = function (e) {
            return this.then(void 0, e)
        };
        c.prototype.F = function (e, g) {
            function h() {
                switch (m.h) {
                    case 1:
                        e(m.i);
                        break;
                    case 2:
                        g(m.i);
                        break;
                    default:
                        throw Error("Unexpected state: " +
                            m.h);
                }
            }
            var m = this;
            null == this.g ? k.h(h) : this.g.push(h);
            this.o = !0
        };
        c.resolve = d;
        c.reject = function (e) {
            return new c(function (g, h) {
                h(e)
            })
        };
        c.race = function (e) {
            return new c(function (g, h) {
                for (var m = J(e), q = m.next(); !q.done; q = m.next()) d(q.value).F(g, h)
            })
        };
        c.all = function (e) {
            var g = J(e),
                h = g.next();
            return h.done ? d([]) : new c(function (m, q) {
                function A(z) {
                    return function (n) {
                        u[z] = n;
                        v--;
                        0 == v && m(u)
                    }
                }
                var u = [],
                    v = 0;
                do u.push(void 0), v++, d(h.value).F(A(u.length - 1), q), h = g.next(); while (!h.done)
            })
        };
        return c
    });

    function qa(a, c) {
        a instanceof String && (a += "");
        var b = 0,
            d = !1,
            f = {
                next: function () {
                    if (!d && b < a.length) {
                        var k = b++;
                        return {
                            value: c(k, a[k]),
                            done: !1
                        }
                    }
                    d = !0;
                    return {
                        done: !0,
                        value: void 0
                    }
                }
            };
        f[Symbol.iterator] = function () {
            return f
        };
        return f
    }
    H("Array.prototype.keys", function (a) {
        return a ? a : function () {
            return qa(this, function (c) {
                return c
            })
        }
    });
    var ra = this || self;

    function U(a, c) {
        a = a.split(".");
        var b = ra;
        a[0] in b || "undefined" == typeof b.execScript || b.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift());) a.length || void 0 === c ? b[d] && b[d] !== Object.prototype[d] ? b = b[d] : b = b[d] = {} : b[d] = c
    };

    function V(a, c) {
        var b = void 0;
        return new(b || (b = Promise))(function (d, f) {
            function k(h) {
                try {
                    g(c.next(h))
                } catch (m) {
                    f(m)
                }
            }

            function e(h) {
                try {
                    g(c["throw"](h))
                } catch (m) {
                    f(m)
                }
            }

            function g(h) {
                h.done ? d(h.value) : (new b(function (m) {
                    m(h.value)
                })).then(k, e)
            }
            g((c = c.apply(a, void 0)).next())
        })
    };

    function sa(a, c, b) {
        b = a.createShader(0 === b ? a.VERTEX_SHADER : a.FRAGMENT_SHADER);
        a.shaderSource(b, c);
        a.compileShader(b);
        if (!a.getShaderParameter(b, a.COMPILE_STATUS)) throw Error("Could not compile WebGL shader.\n\n" + a.getShaderInfoLog(b));
        return b
    };

    function W(a, c) {
        this.g = a;
        this.i = c;
        this.j = 0
    }

    function ta(a, c) {
        var b = a.i;
        if (void 0 === a.l) {
            var d = sa(b, "\n  attribute vec2 aVertex;\n  attribute vec2 aTex;\n  varying vec2 vTex;\n  void main(void) {\n    gl_Position = vec4(aVertex, 0.0, 1.0);\n    vTex = aTex;\n  }", 0),
                f = sa(b, "\n  precision highp float;\n  varying vec2 vTex;\n  uniform sampler2D sampler0;\n  void main(){\n    gl_FragColor = texture2D(sampler0, vTex);\n  }", 1),
                k = b.createProgram();
            b.attachShader(k, d);
            b.attachShader(k, f);
            b.linkProgram(k);
            if (!b.getProgramParameter(k, b.LINK_STATUS)) throw Error("Could not compile WebGL program.\n\n" +
                b.getProgramInfoLog(k));
            d = a.l = k;
            b.useProgram(d);
            f = b.getUniformLocation(d, "sampler0");
            a.h = {
                v: b.getAttribLocation(d, "aVertex"),
                u: b.getAttribLocation(d, "aTex"),
                O: f
            };
            a.o = b.createBuffer();
            b.bindBuffer(b.ARRAY_BUFFER, a.o);
            b.enableVertexAttribArray(a.h.v);
            b.vertexAttribPointer(a.h.v, 2, b.FLOAT, !1, 0, 0);
            b.bufferData(b.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), b.STATIC_DRAW);
            b.bindBuffer(b.ARRAY_BUFFER, null);
            a.m = b.createBuffer();
            b.bindBuffer(b.ARRAY_BUFFER, a.m);
            b.enableVertexAttribArray(a.h.u);
            b.vertexAttribPointer(a.h.u,
                2, b.FLOAT, !1, 0, 0);
            b.bufferData(b.ARRAY_BUFFER, new Float32Array([0, 1, 0, 0, 1, 0, 1, 1]), b.STATIC_DRAW);
            b.bindBuffer(b.ARRAY_BUFFER, null);
            b.uniform1i(f, 0)
        }
        d = a.h;
        b.useProgram(a.l);
        b.canvas.width = c.width;
        b.canvas.height = c.height;
        b.viewport(0, 0, c.width, c.height);
        b.activeTexture(b.TEXTURE0);
        a.g.bindTexture2d(c.glName);
        b.enableVertexAttribArray(d.v);
        b.bindBuffer(b.ARRAY_BUFFER, a.o);
        b.vertexAttribPointer(d.v, 2, b.FLOAT, !1, 0, 0);
        b.enableVertexAttribArray(d.u);
        b.bindBuffer(b.ARRAY_BUFFER, a.m);
        b.vertexAttribPointer(d.u,
            2, b.FLOAT, !1, 0, 0);
        b.bindFramebuffer(b.DRAW_FRAMEBUFFER ? b.DRAW_FRAMEBUFFER : b.FRAMEBUFFER, null);
        b.drawArrays(b.TRIANGLE_FAN, 0, 4);
        b.disableVertexAttribArray(d.v);
        b.disableVertexAttribArray(d.u);
        b.bindBuffer(b.ARRAY_BUFFER, null);
        a.g.bindTexture2d(0)
    }

    function ua(a) {
        this.g = a
    };
    var va = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 9, 1, 7, 0, 65, 0, 253, 15, 26, 11]);

    function wa(a, c) {
        return c + a
    }

    function xa(a, c) {
        window[a] = c
    }

    function ya(a) {
        var c = document.createElement("script");
        c.setAttribute("src", a);
        c.setAttribute("crossorigin", "anonymous");
        document.body.appendChild(c);
        return new Promise(function (b) {
            c.addEventListener("load", function () {
                b()
            }, !1)
        })
    }

    function X(a) {
        for (var c = [], b = a.size(), d = 0; d < b; ++d) {
            var f = a.get(d);
            c.push({
                x: f.x,
                y: f.y,
                z: f.z,
                visibility: f.hasVisibility ? f.visibility : void 0
            })
        }
        return c
    }

    function za(a) {
        for (var c = [], b = a.size(), d = 0; d < b; ++d) {
            var f = a.get(d);
            c.push({
                index: f.index,
                score: f.score,
                label: f.hasLabel ? f.label : void 0,
                displayName: f.hasDisplayName ? f.displayName : void 0
            })
        }
        return c
    }

    function Aa(a, c, b) {
        this.graph = a;
        this.locateFile = c;
        this.g = b
    }
    Aa.prototype.toArrayBuffer = function () {
        return V(this, function c() {
            var b = this,
                d;
            return T(c, function (f) {
                return 1 == f.g ? (b.graph.url ? f = Q(f, fetch(b.locateFile(b.graph.url, b.g)), 3) : (f.g = 2, f = void 0), f) : 2 != f.g && (d = f.j, d.body) ? f.return(d.arrayBuffer()) : f.return(new ArrayBuffer(0))
            })
        })
    };

    function Ba() {
        return V(this, function c() {
            return T(c, function (b) {
                switch (b.g) {
                    case 1:
                        return b.m = 2, Q(b, WebAssembly.instantiate(va), 4);
                    case 4:
                        b.g = 3;
                        b.m = 0;
                        break;
                    case 2:
                        return b.m = 0, b.i = null, b.return(!1);
                    case 3:
                        return b.return(!0)
                }
            })
        })
    }

    function Y(a) {
        this.h = a;
        this.listeners = {};
        this.j = {};
        this.l = {};
        this.s = this.D = !0;
        this.B = Promise.resolve();
        this.locateFile = a && a.locateFile || wa;
        if ("object" === typeof window) a = window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf("/")) + "/";
        else if ("undefined" !== typeof location) a = location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf("/")) + "/";
        else throw Error("solutions can only be loaded on a web page or in a web worker");
        this.C = a
    }
    C = Y.prototype;
    C.close = function () {
        this.i && this.i.delete();
        return Promise.resolve()
    };

    function Ca(a) {
        return V(a, function b() {
            var d = this,
                f, k, e, g, h, m, q, A, u;
            return T(b, function (v) {
                switch (v.g) {
                    case 1:
                        f = d;
                        if (!d.D) return v.return();
                        xa("createMediapipeSolutionsWasm", {
                            locateFile: d.locateFile
                        });
                        xa("createMediapipeSolutionsPackedAssets", {
                            locateFile: d.locateFile
                        });
                        k = d.h.files || [];
                        return Q(v, Ba(), 2);
                    case 2:
                        return e = v.j, Q(v, Promise.all(k.map(function (z) {
                            return void 0 === z.simd || z.simd && e || !z.simd && !e ? ya(f.locateFile(z.url, f.C)) : Promise.resolve()
                        })), 3);
                    case 3:
                        return g = window.createMediapipeSolutionsWasm,
                            h = window.createMediapipeSolutionsPackedAssets, Q(v, g(h), 4);
                    case 4:
                        return d.g = v.j, d.m = document.createElement("canvas"), d.g.canvas = d.m, d.g.createContext(d.m, !0, !0, {}), d.i = new d.g.SolutionWasm, m = new Aa(d.h.graph, d.locateFile, d.C), Q(v, d.loadGraph(m), 5);
                    case 5:
                        if (d.h.listeners)
                            for (q = J(d.h.listeners), A = q.next(); !A.done; A = q.next()) u = A.value, Da(d, u);
                        d.D = !1;
                        v.g = 0
                }
            })
        })
    }
    C.reset = function () {
        return V(this, function c() {
            var b = this;
            return T(c, function (d) {
                b.i && (b.i.reset(), b.j = {}, b.l = {});
                d.g = 0
            })
        })
    };
    C.setOptions = function (a) {
        if (this.h.options) {
            for (var c = [], b = J(Object.keys(a)), d = b.next(); !d.done; d = b.next()) {
                var f = d.value;
                (d = this.h.options[f]) && d.graphOptionXref && (f = {
                    valueNumber: 0 === d.type ? a[f] : 0,
                    valueBoolean: 1 === d.type ? a[f] : !1
                }, d = Object.assign(Object.assign(Object.assign({}, {
                    calculatorName: "",
                    calculatorIndex: 0
                }), d.graphOptionXref), f), c.push(d))
            }
            0 !== c.length && (this.s = !0, this.A = c)
        }
    };

    function Ea(a) {
        return V(a, function b() {
            var d = this,
                f, k, e, g, h;
            return T(b, function (m) {
                if (!d.s) return m.return();
                f = d.m.getContext("webgl2");
                if (!f && (f = d.m.getContext("webgl"), !f)) return alert("Failed to create WebGL canvas context when passing video frame."), m.return();
                d.o = f;
                if (d.A) {
                    k = new d.g.GraphOptionChangeRequestList;
                    e = J(d.A);
                    for (g = e.next(); !g.done; g = e.next()) h = g.value, k.push_back(h);
                    d.i.changeOptions(k);
                    k.delete();
                    d.A = void 0
                }
                d.s = !1;
                m.g = 0
            })
        })
    }
    C.initialize = function () {
        return V(this, function c() {
            var b = this;
            return T(c, function (d) {
                return 1 == d.g ? Q(d, Ca(b), 2) : Q(d, Ea(b), 0)
            })
        })
    };
    C.loadGraph = function (a) {
        return V(this, function b() {
            var d, f = this;
            return T(b, function (k) {
                if (1 == k.g) return Q(k, a.toArrayBuffer(), 2);
                d = k.j;
                f.i.loadGraph(d);
                k.g = 0
            })
        })
    };
    C.send = function (a, c) {
        return V(this, function d() {
            var f = this,
                k, e, g, h, m, q, A, u, v;
            return T(d, function (z) {
                if (1 == z.g) {
                    if (!f.h.inputs) return z.return();
                    k = 1E3 * (c || performance.now());
                    return Q(z, f.B, 2)
                }
                if (3 != z.g) return Q(z, f.initialize(), 3);
                e = new f.g.PacketDataList;
                g = J(Object.keys(a));
                for (h = g.next(); !h.done; h = g.next())
                    if (m = h.value, q = f.h.inputs[m]) {
                        a: {
                            var n = f;
                            var x = a[m];
                            switch (q.type) {
                                case "video":
                                    var r = n.j[q.stream];
                                    r || (r = new W(n.g, n.o), n.j[q.stream] = r);
                                    n = r;
                                    0 === n.j && (n.j = n.g.createTexture());
                                    if (x instanceof HTMLVideoElement) {
                                        var p = x.videoWidth;
                                        r = x.videoHeight
                                    } else x instanceof HTMLImageElement ? (p = x.naturalWidth, r = x.naturalHeight) : (p = x.width, r = x.height);
                                    r = {
                                        glName: n.j,
                                        width: p,
                                        height: r
                                    };
                                    p = n.i;
                                    p.canvas.width = r.width;
                                    p.canvas.height = r.height;
                                    p.activeTexture(p.TEXTURE0);
                                    n.g.bindTexture2d(n.j);
                                    p.texImage2D(p.TEXTURE_2D, 0, p.RGBA, p.RGBA, p.UNSIGNED_BYTE, x);
                                    n.g.bindTexture2d(0);
                                    n = r;
                                    break a;
                                case "detections":
                                    r = n.j[q.stream];
                                    r || (r = new ua(n.g), n.j[q.stream] = r);
                                    n = r;
                                    n.data || (n.data = new n.g.DetectionListData);
                                    n.data.reset(x.length);
                                    for (r = 0; r < x.length; ++r) {
                                        p = x[r];
                                        n.data.setBoundingBox(r, p.L);
                                        for (var I = 0; I < p.H.length; ++I) {
                                            var t = p.H[I],
                                                y = t.visibility ? !0 : !1;
                                            n.data.addNormalizedLandmark(r, Object.assign(Object.assign({}, t), {
                                                hasVisibility: y,
                                                visibility: y ? t.visibility : 0
                                            }))
                                        }
                                        for (I = 0; I < p.G.length; ++I) {
                                            t = p.G[I];
                                            y = t.index ? !0 : !1;
                                            var w = t.label ? !0 : !1,
                                                l = t.displayName ? !0 : !1;
                                            n.data.addClassification(r, {
                                                score: t.score,
                                                hasIndex: y,
                                                index: y ? t.index : -1,
                                                hasLabel: w,
                                                label: w ? t.label : "",
                                                hasDisplayName: l,
                                                displayName: l ? t.displayName : ""
                                            })
                                        }
                                    }
                                    n = n.data;
                                    break a;
                                default:
                                    n = {}
                            }
                        }
                        A = n;u = q.stream;
                        switch (q.type) {
                            case "video":
                                e.pushTexture2d(Object.assign(Object.assign({}, A), {
                                    stream: u,
                                    timestamp: k
                                }));
                                break;
                            case "detections":
                                v = A;
                                v.stream = u;
                                v.timestamp = k;
                                e.pushDetectionList(v);
                                break;
                            default:
                                throw Error("Unknown input config type: '" + q.type + "'");
                        }
                    } f.i.send(e);
                e.delete();
                z.g = 0
            })
        })
    };

    function Fa(a, c, b) {
        if (b.isNumber()) return b.getNumber();
        if (b.isRect()) return b.getRect();
        if (b.isLandmarks()) return b.getLandmarks();
        if (b.isLandmarksList()) return b.getLandmarksList();
        if (b.isClassificationsList()) return b.getClassificationsList();
        if (b.isObjectDetectionList()) return b.getObjectDetectionList();
        if (b.isTexture2d()) {
            var d = a.l[c];
            d || (d = new W(a.g, a.o), a.l[c] = d);
            a = d;
            b = b.getTexture2d();
            ta(a, b);
            return a.i.canvas
        }
    }

    function Da(a, c) {
        for (var b = c.name || "$", d = [].concat(fa(c.wants)), f = new a.g.StringList, k = J(c.wants), e = k.next(); !e.done; e = k.next()) f.push_back(e.value);
        k = a.g.PacketListener.implement({
            onResults: function (g) {
                return V(a, function m() {
                    var q, A, u = this,
                        v, z, n;
                    return T(m, function (x) {
                        if (1 == x.g) {
                            q = {};
                            for (A = 0; A < c.wants.length; ++A) q[d[A]] = g.get(A);
                            var r;
                            if (r = c.outs) {
                                for (var p = {}, I = J(Object.keys(r)), t = I.next(); !t.done; t = I.next()) {
                                    t = t.value;
                                    var y = r[t];
                                    if ("string" === typeof y) p[t] = Fa(u, t, q[y]);
                                    else {
                                        var w = q[y.stream];
                                        if (void 0 !== w) {
                                            if ("detection_list" === y.type) {
                                                var l = w.getRectList(),
                                                    D = w.getLandmarksList();
                                                w = w.getClassificationsList();
                                                var B = [];
                                                if (l)
                                                    for (var F = 0; F < l.size(); ++F) {
                                                        var Z = {
                                                            L: l.get(F),
                                                            H: X(D.get(F)),
                                                            G: za(w.get(F))
                                                        };
                                                        B.push(Z)
                                                    }
                                                p[t] = B
                                            } else if ("landmarks" === y.type) l = w.getLandmarks(), p[t] = l ? X(l) : void 0;
                                            else if ("landmarks_list" === y.type) {
                                                if (l = w.getLandmarksList()) {
                                                    D = [];
                                                    w = l.size();
                                                    for (B = 0; B < w; ++B) F = l.get(B), D.push(X(F));
                                                    l = D
                                                } else l = void 0;
                                                p[t] = l
                                            } else if ("rect_list" === y.type) {
                                                if (l = w.getRectList()) {
                                                    D = [];
                                                    w = l.size();
                                                    for (B = 0; B < w; ++B) F = l.get(B), D.push(F);
                                                    l = D
                                                } else l = void 0;
                                                p[t] = l
                                            } else if ("classifications_list" === y.type) {
                                                if (l = w.getClassificationsList()) {
                                                    D = [];
                                                    w = l.size();
                                                    for (B = 0; B < w; ++B) F = l.get(B), D.push(za(F));
                                                    l = D
                                                } else l = void 0;
                                                p[t] = l
                                            } else if ("object_detection_list" === y.type) {
                                                if (l = w.getObjectDetectionList()) {
                                                    D = [];
                                                    w = l.size();
                                                    for (B = 0; B < w; ++B) {
                                                        var aa = l.get(B);
                                                        F = D;
                                                        Z = F.push;
                                                        for (var Ha = aa.id, la = aa.keypoints, ma = [], Ia = la.size(), ba = 0; ba < Ia; ++ba) {
                                                            var L = la.get(ba);
                                                            ma.push({
                                                                id: L.id,
                                                                point3d: {
                                                                    x: L.point3d.x,
                                                                    y: L.point3d.y,
                                                                    z: L.point3d.z
                                                                },
                                                                point2d: {
                                                                    x: L.point2d.x,
                                                                    y: L.point2d.y,
                                                                    depth: L.point2d.depth
                                                                }
                                                            })
                                                        }
                                                        Z.call(F, {
                                                            id: Ha,
                                                            keypoints: ma,
                                                            visibility: aa.visibility
                                                        })
                                                    }
                                                    l = D
                                                } else l = void 0;
                                                p[t] = l
                                            } else if ("texture" === y.type) l = u.l[t], l || (l = new W(u.g, u.o), u.l[t] = l), D = w.getTexture2d(), ta(l, D), p[t] = l.i.canvas;
                                            else throw Error("Unknown output config type: '" + y.type + "'");
                                            y.transform && p[t] && (p[t] = y.transform(p[t]))
                                        }
                                    }
                                }
                                r = p
                            } else r = q;
                            v = r;
                            (z = u.listeners[b]) ? x = Q(x, u.B, 3): (x.g = 0, x = void 0);
                            return x
                        }
                        if (n = z(v)) return u.B = n, x.return(n);
                        x.g = 0
                    })
                })
            }
        });
        a.i.attachMultiListener(f,
            k);
        f.delete()
    }
    C.onResults = function (a, c) {
        this.listeners[c || "$"] = a
    };
    U("Solution", Y);
    U("OptionType", {
        NUMBER: 0,
        BOOL: 1,
        0: "NUMBER",
        1: "BOOL"
    });

    function Ga(a) {
        a = a || {};
        this.g = new Y({
            locateFile: a.locateFile,
            files: [{
                url: "hands_solution_packed_assets_loader.js"
            }, {
                simd: !1,
                url: "hands_solution_wasm_bin.js"
            }, {
                simd: !0,
                url: "hands_solution_simd_wasm_bin.js"
            }],
            graph: {
                url: "hands.binarypb"
            },
            inputs: {
                image: {
                    type: "video",
                    stream: "input_frames_gpu"
                }
            },
            listeners: [{
                wants: ["multi_hand_landmarks", "image_transformed", "multi_handedness"],
                outs: {
                    image: "image_transformed",
                    multiHandLandmarks: {
                        type: "landmarks_list",
                        stream: "multi_hand_landmarks"
                    },
                    multiHandedness: {
                        type: "classifications_list",
                        stream: "multi_handedness",
                        transform: function (c) {
                            return c.map(function (b) {
                                return b[0]
                            })
                        }
                    }
                }
            }],
            options: {
                selfieMode: {
                    type: 1,
                    graphOptionXref: {
                        calculatorType: "GlScalerCalculator",
                        calculatorIndex: 1,
                        fieldName: "flip_horizontal"
                    }
                },
                maxNumHands: {
                    type: 0,
                    graphOptionXref: {
                        calculatorType: "ConstantSidePacketCalculator",
                        calculatorName: "ConstantSidePacketCalculator",
                        fieldName: "int_value"
                    }
                },
                minDetectionConfidence: {
                    type: 0,
                    graphOptionXref: {
                        calculatorType: "TensorsToDetectionsCalculator",
                        calculatorName: "handlandmarktrackinggpu__palmdetectiongpu__TensorsToDetectionsCalculator",
                        fieldName: "min_score_thresh"
                    }
                },
                minTrackingConfidence: {
                    type: 0,
                    graphOptionXref: {
                        calculatorType: "ThresholdingCalculator",
                        calculatorName: "handlandmarktrackinggpu__handlandmarkgpu__ThresholdingCalculator",
                        fieldName: "threshold"
                    }
                }
            }
        })
    }
    C = Ga.prototype;
    C.close = function () {
        this.g.close();
        return Promise.resolve()
    };
    C.onResults = function (a) {
        this.g.onResults(a)
    };
    C.initialize = function () {
        return V(this, function c() {
            var b = this;
            return T(c, function (d) {
                return Q(d, b.g.initialize(), 0)
            })
        })
    };
    C.reset = function () {
        this.g.reset()
    };
    C.send = function (a) {
        return V(this, function b() {
            var d = this;
            return T(b, function (f) {
                return Q(f, d.g.send(a), 0)
            })
        })
    };
    C.setOptions = function (a) {
        this.g.setOptions(a)
    };
    U("Hands", Ga);
    U("HAND_CONNECTIONS", [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [0, 5],
        [5, 6],
        [6, 7],
        [7, 8],
        [5, 9],
        [9, 10],
        [10, 11],
        [11, 12],
        [9, 13],
        [13, 14],
        [14, 15],
        [15, 16],
        [13, 17],
        [0, 17],
        [17, 18],
        [18, 19],
        [19, 20]
    ]);
}).call(this);