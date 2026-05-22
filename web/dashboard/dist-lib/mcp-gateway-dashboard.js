var am = Object.defineProperty;
var lm = (e, t, n) => t in e ? am(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var So = (e, t, n) => lm(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as l, jsxs as T, Fragment as Ft } from "react/jsx-runtime";
import * as v from "react";
import Ln, { forwardRef as cm, useContext as dm, isValidElement as _i, cloneElement as Di, Children as um, useState as ve, useCallback as pm, useEffect as Er, useMemo as Rt } from "react";
import * as fm from "react-dom";
import mi from "react-dom";
function Wn(e, ...t) {
  const n = new URL(`https://mui.com/production-error/?code=${e}`);
  return t.forEach((r) => n.searchParams.append("args[]", r)), `Minified MUI error #${e}; visit ${n} for the full message.`;
}
function Vi() {
  return Vi = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Vi.apply(null, arguments);
}
function mm(e) {
  if (e.sheet)
    return e.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === e)
      return document.styleSheets[t];
}
function hm(e) {
  var t = document.createElement("style");
  return t.setAttribute("data-emotion", e.key), e.nonce !== void 0 && t.setAttribute("nonce", e.nonce), t.appendChild(document.createTextNode("")), t.setAttribute("data-s", ""), t;
}
var gm = /* @__PURE__ */ function() {
  function e(n) {
    var r = this;
    this._insertTag = function(i) {
      var s;
      r.tags.length === 0 ? r.insertionPoint ? s = r.insertionPoint.nextSibling : r.prepend ? s = r.container.firstChild : s = r.before : s = r.tags[r.tags.length - 1].nextSibling, r.container.insertBefore(i, s), r.tags.push(i);
    }, this.isSpeedy = n.speedy === void 0 ? !0 : n.speedy, this.tags = [], this.ctr = 0, this.nonce = n.nonce, this.key = n.key, this.container = n.container, this.prepend = n.prepend, this.insertionPoint = n.insertionPoint, this.before = null;
  }
  var t = e.prototype;
  return t.hydrate = function(r) {
    r.forEach(this._insertTag);
  }, t.insert = function(r) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(hm(this));
    var i = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var s = mm(i);
      try {
        s.insertRule(r, s.cssRules.length);
      } catch {
      }
    } else
      i.appendChild(document.createTextNode(r));
    this.ctr++;
  }, t.flush = function() {
    this.tags.forEach(function(r) {
      var i;
      return (i = r.parentNode) == null ? void 0 : i.removeChild(r);
    }), this.tags = [], this.ctr = 0;
  }, e;
}(), Pt = "-ms-", Ui = "-moz-", Be = "-webkit-", iu = "comm", Ua = "rule", Ga = "decl", ym = "@import", su = "@keyframes", bm = "@layer", vm = Math.abs, ds = String.fromCharCode, xm = Object.assign;
function Cm(e, t) {
  return Nt(e, 0) ^ 45 ? (((t << 2 ^ Nt(e, 0)) << 2 ^ Nt(e, 1)) << 2 ^ Nt(e, 2)) << 2 ^ Nt(e, 3) : 0;
}
function au(e) {
  return e.trim();
}
function wm(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function We(e, t, n) {
  return e.replace(t, n);
}
function fa(e, t) {
  return e.indexOf(t);
}
function Nt(e, t) {
  return e.charCodeAt(t) | 0;
}
function Dr(e, t, n) {
  return e.slice(t, n);
}
function Sn(e) {
  return e.length;
}
function Ha(e) {
  return e.length;
}
function hi(e, t) {
  return t.push(e), e;
}
function Sm(e, t) {
  return e.map(t).join("");
}
var us = 1, Go = 1, lu = 0, Wt = 0, xt = 0, or = "";
function ps(e, t, n, r, i, s, a) {
  return { value: e, root: t, parent: n, type: r, props: i, children: s, line: us, column: Go, length: a, return: "" };
}
function hr(e, t) {
  return xm(ps("", null, null, "", null, null, 0), e, { length: -e.length }, t);
}
function Tm() {
  return xt;
}
function Em() {
  return xt = Wt > 0 ? Nt(or, --Wt) : 0, Go--, xt === 10 && (Go = 1, us--), xt;
}
function qt() {
  return xt = Wt < lu ? Nt(or, Wt++) : 0, Go++, xt === 10 && (Go = 1, us++), xt;
}
function En() {
  return Nt(or, Wt);
}
function Li() {
  return Wt;
}
function Kr(e, t) {
  return Dr(or, e, t);
}
function Lr(e) {
  switch (e) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function cu(e) {
  return us = Go = 1, lu = Sn(or = e), Wt = 0, [];
}
function du(e) {
  return or = "", e;
}
function Fi(e) {
  return au(Kr(Wt - 1, ma(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function Om(e) {
  for (; (xt = En()) && xt < 33; )
    qt();
  return Lr(e) > 2 || Lr(xt) > 3 ? "" : " ";
}
function Rm(e, t) {
  for (; --t && qt() && !(xt < 48 || xt > 102 || xt > 57 && xt < 65 || xt > 70 && xt < 97); )
    ;
  return Kr(e, Li() + (t < 6 && En() == 32 && qt() == 32));
}
function ma(e) {
  for (; qt(); )
    switch (xt) {
      case e:
        return Wt;
      case 34:
      case 39:
        e !== 34 && e !== 39 && ma(xt);
        break;
      case 40:
        e === 41 && ma(e);
        break;
      case 92:
        qt();
        break;
    }
  return Wt;
}
function Nm(e, t) {
  for (; qt() && e + xt !== 57; )
    if (e + xt === 84 && En() === 47)
      break;
  return "/*" + Kr(t, Wt - 1) + "*" + ds(e === 47 ? e : qt());
}
function km(e) {
  for (; !Lr(En()); )
    qt();
  return Kr(e, Wt);
}
function Pm(e) {
  return du(ji("", null, null, null, [""], e = cu(e), 0, [0], e));
}
function ji(e, t, n, r, i, s, a, c, u) {
  for (var p = 0, f = 0, g = a, b = 0, m = 0, x = 0, h = 1, S = 1, R = 1, k = 0, E = "", w = i, C = s, N = r, M = E; S; )
    switch (x = k, k = qt()) {
      case 40:
        if (x != 108 && Nt(M, g - 1) == 58) {
          fa(M += We(Fi(k), "&", "&\f"), "&\f") != -1 && (R = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        M += Fi(k);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        M += Om(x);
        break;
      case 92:
        M += Rm(Li() - 1, 7);
        continue;
      case 47:
        switch (En()) {
          case 42:
          case 47:
            hi(Im(Nm(qt(), Li()), t, n), u);
            break;
          default:
            M += "/";
        }
        break;
      case 123 * h:
        c[p++] = Sn(M) * R;
      case 125 * h:
      case 59:
      case 0:
        switch (k) {
          case 0:
          case 125:
            S = 0;
          case 59 + f:
            R == -1 && (M = We(M, /\f/g, "")), m > 0 && Sn(M) - g && hi(m > 32 ? lc(M + ";", r, n, g - 1) : lc(We(M, " ", "") + ";", r, n, g - 2), u);
            break;
          case 59:
            M += ";";
          default:
            if (hi(N = ac(M, t, n, p, f, i, c, E, w = [], C = [], g), s), k === 123)
              if (f === 0)
                ji(M, t, N, N, w, s, g, c, C);
              else
                switch (b === 99 && Nt(M, 3) === 110 ? 100 : b) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    ji(e, N, N, r && hi(ac(e, N, N, 0, 0, i, c, E, i, w = [], g), C), i, C, g, c, r ? w : C);
                    break;
                  default:
                    ji(M, N, N, N, [""], C, 0, c, C);
                }
        }
        p = f = m = 0, h = R = 1, E = M = "", g = a;
        break;
      case 58:
        g = 1 + Sn(M), m = x;
      default:
        if (h < 1) {
          if (k == 123)
            --h;
          else if (k == 125 && h++ == 0 && Em() == 125)
            continue;
        }
        switch (M += ds(k), k * h) {
          case 38:
            R = f > 0 ? 1 : (M += "\f", -1);
            break;
          case 44:
            c[p++] = (Sn(M) - 1) * R, R = 1;
            break;
          case 64:
            En() === 45 && (M += Fi(qt())), b = En(), f = g = Sn(E = M += km(Li())), k++;
            break;
          case 45:
            x === 45 && Sn(M) == 2 && (h = 0);
        }
    }
  return s;
}
function ac(e, t, n, r, i, s, a, c, u, p, f) {
  for (var g = i - 1, b = i === 0 ? s : [""], m = Ha(b), x = 0, h = 0, S = 0; x < r; ++x)
    for (var R = 0, k = Dr(e, g + 1, g = vm(h = a[x])), E = e; R < m; ++R)
      (E = au(h > 0 ? b[R] + " " + k : We(k, /&\f/g, b[R]))) && (u[S++] = E);
  return ps(e, t, n, i === 0 ? Ua : c, u, p, f);
}
function Im(e, t, n) {
  return ps(e, t, n, iu, ds(Tm()), Dr(e, 2, -2), 0);
}
function lc(e, t, n, r) {
  return ps(e, t, n, Ga, Dr(e, 0, r), Dr(e, r + 1, -1), r);
}
function Bo(e, t) {
  for (var n = "", r = Ha(e), i = 0; i < r; i++)
    n += t(e[i], i, e, t) || "";
  return n;
}
function $m(e, t, n, r) {
  switch (e.type) {
    case bm:
      if (e.children.length) break;
    case ym:
    case Ga:
      return e.return = e.return || e.value;
    case iu:
      return "";
    case su:
      return e.return = e.value + "{" + Bo(e.children, r) + "}";
    case Ua:
      e.value = e.props.join(",");
  }
  return Sn(n = Bo(e.children, r)) ? e.return = e.value + "{" + n + "}" : "";
}
function Am(e) {
  var t = Ha(e);
  return function(n, r, i, s) {
    for (var a = "", c = 0; c < t; c++)
      a += e[c](n, r, i, s) || "";
    return a;
  };
}
function Mm(e) {
  return function(t) {
    t.root || (t = t.return) && e(t);
  };
}
function uu(e) {
  var t = /* @__PURE__ */ Object.create(null);
  return function(n) {
    return t[n] === void 0 && (t[n] = e(n)), t[n];
  };
}
var _m = function(t, n, r) {
  for (var i = 0, s = 0; i = s, s = En(), i === 38 && s === 12 && (n[r] = 1), !Lr(s); )
    qt();
  return Kr(t, Wt);
}, Dm = function(t, n) {
  var r = -1, i = 44;
  do
    switch (Lr(i)) {
      case 0:
        i === 38 && En() === 12 && (n[r] = 1), t[r] += _m(Wt - 1, n, r);
        break;
      case 2:
        t[r] += Fi(i);
        break;
      case 4:
        if (i === 44) {
          t[++r] = En() === 58 ? "&\f" : "", n[r] = t[r].length;
          break;
        }
      default:
        t[r] += ds(i);
    }
  while (i = qt());
  return t;
}, Lm = function(t, n) {
  return du(Dm(cu(t), n));
}, cc = /* @__PURE__ */ new WeakMap(), Fm = function(t) {
  if (!(t.type !== "rule" || !t.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  t.length < 1)) {
    for (var n = t.value, r = t.parent, i = t.column === r.column && t.line === r.line; r.type !== "rule"; )
      if (r = r.parent, !r) return;
    if (!(t.props.length === 1 && n.charCodeAt(0) !== 58 && !cc.get(r)) && !i) {
      cc.set(t, !0);
      for (var s = [], a = Lm(n, s), c = r.props, u = 0, p = 0; u < a.length; u++)
        for (var f = 0; f < c.length; f++, p++)
          t.props[p] = s[u] ? a[u].replace(/&\f/g, c[f]) : c[f] + " " + a[u];
    }
  }
}, jm = function(t) {
  if (t.type === "decl") {
    var n = t.value;
    // charcode for l
    n.charCodeAt(0) === 108 && // charcode for b
    n.charCodeAt(2) === 98 && (t.return = "", t.value = "");
  }
};
function pu(e, t) {
  switch (Cm(e, t)) {
    case 5103:
      return Be + "print-" + e + e;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return Be + e + e;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return Be + e + Ui + e + Pt + e + e;
    case 6828:
    case 4268:
      return Be + e + Pt + e + e;
    case 6165:
      return Be + e + Pt + "flex-" + e + e;
    case 5187:
      return Be + e + We(e, /(\w+).+(:[^]+)/, Be + "box-$1$2" + Pt + "flex-$1$2") + e;
    case 5443:
      return Be + e + Pt + "flex-item-" + We(e, /flex-|-self/, "") + e;
    case 4675:
      return Be + e + Pt + "flex-line-pack" + We(e, /align-content|flex-|-self/, "") + e;
    case 5548:
      return Be + e + Pt + We(e, "shrink", "negative") + e;
    case 5292:
      return Be + e + Pt + We(e, "basis", "preferred-size") + e;
    case 6060:
      return Be + "box-" + We(e, "-grow", "") + Be + e + Pt + We(e, "grow", "positive") + e;
    case 4554:
      return Be + We(e, /([^-])(transform)/g, "$1" + Be + "$2") + e;
    case 6187:
      return We(We(We(e, /(zoom-|grab)/, Be + "$1"), /(image-set)/, Be + "$1"), e, "") + e;
    case 5495:
    case 3959:
      return We(e, /(image-set\([^]*)/, Be + "$1$`$1");
    case 4968:
      return We(We(e, /(.+:)(flex-)?(.*)/, Be + "box-pack:$3" + Pt + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + Be + e + e;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return We(e, /(.+)-inline(.+)/, Be + "$1$2") + e;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (Sn(e) - 1 - t > 6) switch (Nt(e, t + 1)) {
        case 109:
          if (Nt(e, t + 4) !== 45) break;
        case 102:
          return We(e, /(.+:)(.+)-([^]+)/, "$1" + Be + "$2-$3$1" + Ui + (Nt(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
        case 115:
          return ~fa(e, "stretch") ? pu(We(e, "stretch", "fill-available"), t) + e : e;
      }
      break;
    case 4949:
      if (Nt(e, t + 1) !== 115) break;
    case 6444:
      switch (Nt(e, Sn(e) - 3 - (~fa(e, "!important") && 10))) {
        case 107:
          return We(e, ":", ":" + Be) + e;
        case 101:
          return We(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + Be + (Nt(e, 14) === 45 ? "inline-" : "") + "box$3$1" + Be + "$2$3$1" + Pt + "$2box$3") + e;
      }
      break;
    case 5936:
      switch (Nt(e, t + 11)) {
        case 114:
          return Be + e + Pt + We(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
        case 108:
          return Be + e + Pt + We(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
        case 45:
          return Be + e + Pt + We(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
      }
      return Be + e + Pt + e + e;
  }
  return e;
}
var Bm = function(t, n, r, i) {
  if (t.length > -1 && !t.return) switch (t.type) {
    case Ga:
      t.return = pu(t.value, t.length);
      break;
    case su:
      return Bo([hr(t, {
        value: We(t.value, "@", "@" + Be)
      })], i);
    case Ua:
      if (t.length) return Sm(t.props, function(s) {
        switch (wm(s, /(::plac\w+|:read-\w+)/)) {
          case ":read-only":
          case ":read-write":
            return Bo([hr(t, {
              props: [We(s, /:(read-\w+)/, ":" + Ui + "$1")]
            })], i);
          case "::placeholder":
            return Bo([hr(t, {
              props: [We(s, /:(plac\w+)/, ":" + Be + "input-$1")]
            }), hr(t, {
              props: [We(s, /:(plac\w+)/, ":" + Ui + "$1")]
            }), hr(t, {
              props: [We(s, /:(plac\w+)/, Pt + "input-$1")]
            })], i);
        }
        return "";
      });
  }
}, Wm = [Bm], zm = function(t) {
  var n = t.key;
  if (n === "css") {
    var r = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(r, function(h) {
      var S = h.getAttribute("data-emotion");
      S.indexOf(" ") !== -1 && (document.head.appendChild(h), h.setAttribute("data-s", ""));
    });
  }
  var i = t.stylisPlugins || Wm, s = {}, a, c = [];
  a = t.container || document.head, Array.prototype.forEach.call(
    // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll('style[data-emotion^="' + n + ' "]'),
    function(h) {
      for (var S = h.getAttribute("data-emotion").split(" "), R = 1; R < S.length; R++)
        s[S[R]] = !0;
      c.push(h);
    }
  );
  var u, p = [Fm, jm];
  {
    var f, g = [$m, Mm(function(h) {
      f.insert(h);
    })], b = Am(p.concat(i, g)), m = function(S) {
      return Bo(Pm(S), b);
    };
    u = function(S, R, k, E) {
      f = k, m(S ? S + "{" + R.styles + "}" : R.styles), E && (x.inserted[R.name] = !0);
    };
  }
  var x = {
    key: n,
    sheet: new gm({
      key: n,
      container: a,
      nonce: t.nonce,
      speedy: t.speedy,
      prepend: t.prepend,
      insertionPoint: t.insertionPoint
    }),
    nonce: t.nonce,
    inserted: s,
    registered: {},
    insert: u
  };
  return x.sheet.hydrate(c), x;
};
function Vm(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ha = { exports: {} }, Ve = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var dc;
function Um() {
  if (dc) return Ve;
  dc = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, i = e ? Symbol.for("react.strict_mode") : 60108, s = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, c = e ? Symbol.for("react.context") : 60110, u = e ? Symbol.for("react.async_mode") : 60111, p = e ? Symbol.for("react.concurrent_mode") : 60111, f = e ? Symbol.for("react.forward_ref") : 60112, g = e ? Symbol.for("react.suspense") : 60113, b = e ? Symbol.for("react.suspense_list") : 60120, m = e ? Symbol.for("react.memo") : 60115, x = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, S = e ? Symbol.for("react.fundamental") : 60117, R = e ? Symbol.for("react.responder") : 60118, k = e ? Symbol.for("react.scope") : 60119;
  function E(C) {
    if (typeof C == "object" && C !== null) {
      var N = C.$$typeof;
      switch (N) {
        case t:
          switch (C = C.type, C) {
            case u:
            case p:
            case r:
            case s:
            case i:
            case g:
              return C;
            default:
              switch (C = C && C.$$typeof, C) {
                case c:
                case f:
                case x:
                case m:
                case a:
                  return C;
                default:
                  return N;
              }
          }
        case n:
          return N;
      }
    }
  }
  function w(C) {
    return E(C) === p;
  }
  return Ve.AsyncMode = u, Ve.ConcurrentMode = p, Ve.ContextConsumer = c, Ve.ContextProvider = a, Ve.Element = t, Ve.ForwardRef = f, Ve.Fragment = r, Ve.Lazy = x, Ve.Memo = m, Ve.Portal = n, Ve.Profiler = s, Ve.StrictMode = i, Ve.Suspense = g, Ve.isAsyncMode = function(C) {
    return w(C) || E(C) === u;
  }, Ve.isConcurrentMode = w, Ve.isContextConsumer = function(C) {
    return E(C) === c;
  }, Ve.isContextProvider = function(C) {
    return E(C) === a;
  }, Ve.isElement = function(C) {
    return typeof C == "object" && C !== null && C.$$typeof === t;
  }, Ve.isForwardRef = function(C) {
    return E(C) === f;
  }, Ve.isFragment = function(C) {
    return E(C) === r;
  }, Ve.isLazy = function(C) {
    return E(C) === x;
  }, Ve.isMemo = function(C) {
    return E(C) === m;
  }, Ve.isPortal = function(C) {
    return E(C) === n;
  }, Ve.isProfiler = function(C) {
    return E(C) === s;
  }, Ve.isStrictMode = function(C) {
    return E(C) === i;
  }, Ve.isSuspense = function(C) {
    return E(C) === g;
  }, Ve.isValidElementType = function(C) {
    return typeof C == "string" || typeof C == "function" || C === r || C === p || C === s || C === i || C === g || C === b || typeof C == "object" && C !== null && (C.$$typeof === x || C.$$typeof === m || C.$$typeof === a || C.$$typeof === c || C.$$typeof === f || C.$$typeof === S || C.$$typeof === R || C.$$typeof === k || C.$$typeof === h);
  }, Ve.typeOf = E, Ve;
}
var Ue = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var uc;
function Gm() {
  return uc || (uc = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, i = e ? Symbol.for("react.strict_mode") : 60108, s = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, c = e ? Symbol.for("react.context") : 60110, u = e ? Symbol.for("react.async_mode") : 60111, p = e ? Symbol.for("react.concurrent_mode") : 60111, f = e ? Symbol.for("react.forward_ref") : 60112, g = e ? Symbol.for("react.suspense") : 60113, b = e ? Symbol.for("react.suspense_list") : 60120, m = e ? Symbol.for("react.memo") : 60115, x = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, S = e ? Symbol.for("react.fundamental") : 60117, R = e ? Symbol.for("react.responder") : 60118, k = e ? Symbol.for("react.scope") : 60119;
    function E(j) {
      return typeof j == "string" || typeof j == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      j === r || j === p || j === s || j === i || j === g || j === b || typeof j == "object" && j !== null && (j.$$typeof === x || j.$$typeof === m || j.$$typeof === a || j.$$typeof === c || j.$$typeof === f || j.$$typeof === S || j.$$typeof === R || j.$$typeof === k || j.$$typeof === h);
    }
    function w(j) {
      if (typeof j == "object" && j !== null) {
        var de = j.$$typeof;
        switch (de) {
          case t:
            var Y = j.type;
            switch (Y) {
              case u:
              case p:
              case r:
              case s:
              case i:
              case g:
                return Y;
              default:
                var he = Y && Y.$$typeof;
                switch (he) {
                  case c:
                  case f:
                  case x:
                  case m:
                  case a:
                    return he;
                  default:
                    return de;
                }
            }
          case n:
            return de;
        }
      }
    }
    var C = u, N = p, M = c, D = a, L = t, B = f, I = r, y = x, $ = m, P = n, A = s, F = i, W = g, H = !1;
    function te(j) {
      return H || (H = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), z(j) || w(j) === u;
    }
    function z(j) {
      return w(j) === p;
    }
    function V(j) {
      return w(j) === c;
    }
    function X(j) {
      return w(j) === a;
    }
    function re(j) {
      return typeof j == "object" && j !== null && j.$$typeof === t;
    }
    function oe(j) {
      return w(j) === f;
    }
    function ne(j) {
      return w(j) === r;
    }
    function Q(j) {
      return w(j) === x;
    }
    function Z(j) {
      return w(j) === m;
    }
    function U(j) {
      return w(j) === n;
    }
    function J(j) {
      return w(j) === s;
    }
    function q(j) {
      return w(j) === i;
    }
    function ce(j) {
      return w(j) === g;
    }
    Ue.AsyncMode = C, Ue.ConcurrentMode = N, Ue.ContextConsumer = M, Ue.ContextProvider = D, Ue.Element = L, Ue.ForwardRef = B, Ue.Fragment = I, Ue.Lazy = y, Ue.Memo = $, Ue.Portal = P, Ue.Profiler = A, Ue.StrictMode = F, Ue.Suspense = W, Ue.isAsyncMode = te, Ue.isConcurrentMode = z, Ue.isContextConsumer = V, Ue.isContextProvider = X, Ue.isElement = re, Ue.isForwardRef = oe, Ue.isFragment = ne, Ue.isLazy = Q, Ue.isMemo = Z, Ue.isPortal = U, Ue.isProfiler = J, Ue.isStrictMode = q, Ue.isSuspense = ce, Ue.isValidElementType = E, Ue.typeOf = w;
  }()), Ue;
}
process.env.NODE_ENV === "production" ? ha.exports = Um() : ha.exports = Gm();
var Hm = ha.exports, fu = Hm, qm = {
  $$typeof: !0,
  render: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0
}, Km = {
  $$typeof: !0,
  compare: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0,
  type: !0
}, mu = {};
mu[fu.ForwardRef] = qm;
mu[fu.Memo] = Km;
var Ym = !0;
function hu(e, t, n) {
  var r = "";
  return n.split(" ").forEach(function(i) {
    e[i] !== void 0 ? t.push(e[i] + ";") : i && (r += i + " ");
  }), r;
}
var qa = function(t, n, r) {
  var i = t.key + "-" + n.name;
  // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (r === !1 || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  Ym === !1) && t.registered[i] === void 0 && (t.registered[i] = n.styles);
}, Ka = function(t, n, r) {
  qa(t, n, r);
  var i = t.key + "-" + n.name;
  if (t.inserted[n.name] === void 0) {
    var s = n;
    do
      t.insert(n === s ? "." + i : "", s, t.sheet, !0), s = s.next;
    while (s !== void 0);
  }
};
function Xm(e) {
  for (var t = 0, n, r = 0, i = e.length; i >= 4; ++r, i -= 4)
    n = e.charCodeAt(r) & 255 | (e.charCodeAt(++r) & 255) << 8 | (e.charCodeAt(++r) & 255) << 16 | (e.charCodeAt(++r) & 255) << 24, n = /* Math.imul(k, m): */
    (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16), n ^= /* k >>> r: */
    n >>> 24, t = /* Math.imul(k, m): */
    (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  switch (i) {
    case 3:
      t ^= (e.charCodeAt(r + 2) & 255) << 16;
    case 2:
      t ^= (e.charCodeAt(r + 1) & 255) << 8;
    case 1:
      t ^= e.charCodeAt(r) & 255, t = /* Math.imul(h, m): */
      (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  }
  return t ^= t >>> 13, t = /* Math.imul(h, m): */
  (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16), ((t ^ t >>> 15) >>> 0).toString(36);
}
var Jm = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  scale: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
}, Qm = /[A-Z]|^ms/g, Zm = /_EMO_([^_]+?)_([^]*?)_EMO_/g, gu = function(t) {
  return t.charCodeAt(1) === 45;
}, pc = function(t) {
  return t != null && typeof t != "boolean";
}, qs = /* @__PURE__ */ uu(function(e) {
  return gu(e) ? e : e.replace(Qm, "-$&").toLowerCase();
}), fc = function(t, n) {
  switch (t) {
    case "animation":
    case "animationName":
      if (typeof n == "string")
        return n.replace(Zm, function(r, i, s) {
          return Tn = {
            name: i,
            styles: s,
            next: Tn
          }, i;
        });
  }
  return Jm[t] !== 1 && !gu(t) && typeof n == "number" && n !== 0 ? n + "px" : n;
};
function Fr(e, t, n) {
  if (n == null)
    return "";
  var r = n;
  if (r.__emotion_styles !== void 0)
    return r;
  switch (typeof n) {
    case "boolean":
      return "";
    case "object": {
      var i = n;
      if (i.anim === 1)
        return Tn = {
          name: i.name,
          styles: i.styles,
          next: Tn
        }, i.name;
      var s = n;
      if (s.styles !== void 0) {
        var a = s.next;
        if (a !== void 0)
          for (; a !== void 0; )
            Tn = {
              name: a.name,
              styles: a.styles,
              next: Tn
            }, a = a.next;
        var c = s.styles + ";";
        return c;
      }
      return eh(e, t, n);
    }
    case "function": {
      if (e !== void 0) {
        var u = Tn, p = n(e);
        return Tn = u, Fr(e, t, p);
      }
      break;
    }
  }
  var f = n;
  if (t == null)
    return f;
  var g = t[f];
  return g !== void 0 ? g : f;
}
function eh(e, t, n) {
  var r = "";
  if (Array.isArray(n))
    for (var i = 0; i < n.length; i++)
      r += Fr(e, t, n[i]) + ";";
  else
    for (var s in n) {
      var a = n[s];
      if (typeof a != "object") {
        var c = a;
        t != null && t[c] !== void 0 ? r += s + "{" + t[c] + "}" : pc(c) && (r += qs(s) + ":" + fc(s, c) + ";");
      } else if (Array.isArray(a) && typeof a[0] == "string" && (t == null || t[a[0]] === void 0))
        for (var u = 0; u < a.length; u++)
          pc(a[u]) && (r += qs(s) + ":" + fc(s, a[u]) + ";");
      else {
        var p = Fr(e, t, a);
        switch (s) {
          case "animation":
          case "animationName": {
            r += qs(s) + ":" + p + ";";
            break;
          }
          default:
            r += s + "{" + p + "}";
        }
      }
    }
  return r;
}
var mc = /label:\s*([^\s;{]+)\s*(;|$)/g, Tn;
function Yr(e, t, n) {
  if (e.length === 1 && typeof e[0] == "object" && e[0] !== null && e[0].styles !== void 0)
    return e[0];
  var r = !0, i = "";
  Tn = void 0;
  var s = e[0];
  if (s == null || s.raw === void 0)
    r = !1, i += Fr(n, t, s);
  else {
    var a = s;
    i += a[0];
  }
  for (var c = 1; c < e.length; c++)
    if (i += Fr(n, t, e[c]), r) {
      var u = s;
      i += u[c];
    }
  mc.lastIndex = 0;
  for (var p = "", f; (f = mc.exec(i)) !== null; )
    p += "-" + f[1];
  var g = Xm(i) + p;
  return {
    name: g,
    styles: i,
    next: Tn
  };
}
var th = function(t) {
  return t();
}, yu = v.useInsertionEffect ? v.useInsertionEffect : !1, bu = yu || th, hc = yu || v.useLayoutEffect, vu = /* @__PURE__ */ v.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement < "u" ? /* @__PURE__ */ zm({
    key: "css"
  }) : null
);
vu.Provider;
var Ya = function(t) {
  return /* @__PURE__ */ cm(function(n, r) {
    var i = dm(vu);
    return t(n, i, r);
  });
}, Xr = /* @__PURE__ */ v.createContext({}), Xa = {}.hasOwnProperty, ga = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", nh = function(t, n) {
  var r = {};
  for (var i in n)
    Xa.call(n, i) && (r[i] = n[i]);
  return r[ga] = t, r;
}, oh = function(t) {
  var n = t.cache, r = t.serialized, i = t.isStringTag;
  return qa(n, r, i), bu(function() {
    return Ka(n, r, i);
  }), null;
}, rh = /* @__PURE__ */ Ya(function(e, t, n) {
  var r = e.css;
  typeof r == "string" && t.registered[r] !== void 0 && (r = t.registered[r]);
  var i = e[ga], s = [r], a = "";
  typeof e.className == "string" ? a = hu(t.registered, s, e.className) : e.className != null && (a = e.className + " ");
  var c = Yr(s, void 0, v.useContext(Xr));
  a += t.key + "-" + c.name;
  var u = {};
  for (var p in e)
    Xa.call(e, p) && p !== "css" && p !== ga && (u[p] = e[p]);
  return u.className = a, n && (u.ref = n), /* @__PURE__ */ v.createElement(v.Fragment, null, /* @__PURE__ */ v.createElement(oh, {
    cache: t,
    serialized: c,
    isStringTag: typeof i == "string"
  }), /* @__PURE__ */ v.createElement(i, u));
}), ih = rh, gc = function(t, n) {
  var r = arguments;
  if (n == null || !Xa.call(n, "css"))
    return v.createElement.apply(void 0, r);
  var i = r.length, s = new Array(i);
  s[0] = ih, s[1] = nh(t, n);
  for (var a = 2; a < i; a++)
    s[a] = r[a];
  return v.createElement.apply(null, s);
};
(function(e) {
  var t;
  t || (t = e.JSX || (e.JSX = {}));
})(gc || (gc = {}));
var sh = /* @__PURE__ */ Ya(function(e, t) {
  var n = e.styles, r = Yr([n], void 0, v.useContext(Xr)), i = v.useRef();
  return hc(function() {
    var s = t.key + "-global", a = new t.sheet.constructor({
      key: s,
      nonce: t.sheet.nonce,
      container: t.sheet.container,
      speedy: t.sheet.isSpeedy
    }), c = !1, u = document.querySelector('style[data-emotion="' + s + " " + r.name + '"]');
    return t.sheet.tags.length && (a.before = t.sheet.tags[0]), u !== null && (c = !0, u.setAttribute("data-emotion", s), a.hydrate([u])), i.current = [a, c], function() {
      a.flush();
    };
  }, [t]), hc(function() {
    var s = i.current, a = s[0], c = s[1];
    if (c) {
      s[1] = !1;
      return;
    }
    if (r.next !== void 0 && Ka(t, r.next, !0), a.tags.length) {
      var u = a.tags[a.tags.length - 1].nextElementSibling;
      a.before = u, a.flush();
    }
    t.insert("", r, a, !1);
  }, [t, r.name]), null;
});
function Ja() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return Yr(t);
}
function Jr() {
  var e = Ja.apply(void 0, arguments), t = "animation-" + e.name;
  return {
    name: t,
    styles: "@keyframes " + t + "{" + e.styles + "}",
    anim: 1,
    toString: function() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
}
var ah = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|popover|popoverTarget|popoverTargetAction|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/, lh = /* @__PURE__ */ uu(
  function(e) {
    return ah.test(e) || e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) < 91;
  }
  /* Z+1 */
), ch = lh, dh = function(t) {
  return t !== "theme";
}, yc = function(t) {
  return typeof t == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  t.charCodeAt(0) > 96 ? ch : dh;
}, bc = function(t, n, r) {
  var i;
  if (n) {
    var s = n.shouldForwardProp;
    i = t.__emotion_forwardProp && s ? function(a) {
      return t.__emotion_forwardProp(a) && s(a);
    } : s;
  }
  return typeof i != "function" && r && (i = t.__emotion_forwardProp), i;
}, uh = function(t) {
  var n = t.cache, r = t.serialized, i = t.isStringTag;
  return qa(n, r, i), bu(function() {
    return Ka(n, r, i);
  }), null;
}, ph = function e(t, n) {
  var r = t.__emotion_real === t, i = r && t.__emotion_base || t, s, a;
  n !== void 0 && (s = n.label, a = n.target);
  var c = bc(t, n, r), u = c || yc(i), p = !u("as");
  return function() {
    var f = arguments, g = r && t.__emotion_styles !== void 0 ? t.__emotion_styles.slice(0) : [];
    if (s !== void 0 && g.push("label:" + s + ";"), f[0] == null || f[0].raw === void 0)
      g.push.apply(g, f);
    else {
      var b = f[0];
      g.push(b[0]);
      for (var m = f.length, x = 1; x < m; x++)
        g.push(f[x], b[x]);
    }
    var h = Ya(function(S, R, k) {
      var E = p && S.as || i, w = "", C = [], N = S;
      if (S.theme == null) {
        N = {};
        for (var M in S)
          N[M] = S[M];
        N.theme = v.useContext(Xr);
      }
      typeof S.className == "string" ? w = hu(R.registered, C, S.className) : S.className != null && (w = S.className + " ");
      var D = Yr(g.concat(C), R.registered, N);
      w += R.key + "-" + D.name, a !== void 0 && (w += " " + a);
      var L = p && c === void 0 ? yc(E) : u, B = {};
      for (var I in S)
        p && I === "as" || L(I) && (B[I] = S[I]);
      return B.className = w, k && (B.ref = k), /* @__PURE__ */ v.createElement(v.Fragment, null, /* @__PURE__ */ v.createElement(uh, {
        cache: R,
        serialized: D,
        isStringTag: typeof E == "string"
      }), /* @__PURE__ */ v.createElement(E, B));
    });
    return h.displayName = s !== void 0 ? s : "Styled(" + (typeof i == "string" ? i : i.displayName || i.name || "Component") + ")", h.defaultProps = t.defaultProps, h.__emotion_real = h, h.__emotion_base = i, h.__emotion_styles = g, h.__emotion_forwardProp = c, Object.defineProperty(h, "toString", {
      value: function() {
        return "." + a;
      }
    }), h.withComponent = function(S, R) {
      var k = e(S, Vi({}, n, R, {
        shouldForwardProp: bc(h, R, !0)
      }));
      return k.apply(void 0, g);
    }, h;
  };
}, fh = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "marquee",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  // SVG
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
], ya = ph.bind(null);
fh.forEach(function(e) {
  ya[e] = ya(e);
});
var ba = { exports: {} }, gi = { exports: {} }, Ge = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var vc;
function mh() {
  if (vc) return Ge;
  vc = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, i = e ? Symbol.for("react.strict_mode") : 60108, s = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, c = e ? Symbol.for("react.context") : 60110, u = e ? Symbol.for("react.async_mode") : 60111, p = e ? Symbol.for("react.concurrent_mode") : 60111, f = e ? Symbol.for("react.forward_ref") : 60112, g = e ? Symbol.for("react.suspense") : 60113, b = e ? Symbol.for("react.suspense_list") : 60120, m = e ? Symbol.for("react.memo") : 60115, x = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, S = e ? Symbol.for("react.fundamental") : 60117, R = e ? Symbol.for("react.responder") : 60118, k = e ? Symbol.for("react.scope") : 60119;
  function E(C) {
    if (typeof C == "object" && C !== null) {
      var N = C.$$typeof;
      switch (N) {
        case t:
          switch (C = C.type, C) {
            case u:
            case p:
            case r:
            case s:
            case i:
            case g:
              return C;
            default:
              switch (C = C && C.$$typeof, C) {
                case c:
                case f:
                case x:
                case m:
                case a:
                  return C;
                default:
                  return N;
              }
          }
        case n:
          return N;
      }
    }
  }
  function w(C) {
    return E(C) === p;
  }
  return Ge.AsyncMode = u, Ge.ConcurrentMode = p, Ge.ContextConsumer = c, Ge.ContextProvider = a, Ge.Element = t, Ge.ForwardRef = f, Ge.Fragment = r, Ge.Lazy = x, Ge.Memo = m, Ge.Portal = n, Ge.Profiler = s, Ge.StrictMode = i, Ge.Suspense = g, Ge.isAsyncMode = function(C) {
    return w(C) || E(C) === u;
  }, Ge.isConcurrentMode = w, Ge.isContextConsumer = function(C) {
    return E(C) === c;
  }, Ge.isContextProvider = function(C) {
    return E(C) === a;
  }, Ge.isElement = function(C) {
    return typeof C == "object" && C !== null && C.$$typeof === t;
  }, Ge.isForwardRef = function(C) {
    return E(C) === f;
  }, Ge.isFragment = function(C) {
    return E(C) === r;
  }, Ge.isLazy = function(C) {
    return E(C) === x;
  }, Ge.isMemo = function(C) {
    return E(C) === m;
  }, Ge.isPortal = function(C) {
    return E(C) === n;
  }, Ge.isProfiler = function(C) {
    return E(C) === s;
  }, Ge.isStrictMode = function(C) {
    return E(C) === i;
  }, Ge.isSuspense = function(C) {
    return E(C) === g;
  }, Ge.isValidElementType = function(C) {
    return typeof C == "string" || typeof C == "function" || C === r || C === p || C === s || C === i || C === g || C === b || typeof C == "object" && C !== null && (C.$$typeof === x || C.$$typeof === m || C.$$typeof === a || C.$$typeof === c || C.$$typeof === f || C.$$typeof === S || C.$$typeof === R || C.$$typeof === k || C.$$typeof === h);
  }, Ge.typeOf = E, Ge;
}
var He = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var xc;
function hh() {
  return xc || (xc = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, i = e ? Symbol.for("react.strict_mode") : 60108, s = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, c = e ? Symbol.for("react.context") : 60110, u = e ? Symbol.for("react.async_mode") : 60111, p = e ? Symbol.for("react.concurrent_mode") : 60111, f = e ? Symbol.for("react.forward_ref") : 60112, g = e ? Symbol.for("react.suspense") : 60113, b = e ? Symbol.for("react.suspense_list") : 60120, m = e ? Symbol.for("react.memo") : 60115, x = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, S = e ? Symbol.for("react.fundamental") : 60117, R = e ? Symbol.for("react.responder") : 60118, k = e ? Symbol.for("react.scope") : 60119;
    function E(j) {
      return typeof j == "string" || typeof j == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      j === r || j === p || j === s || j === i || j === g || j === b || typeof j == "object" && j !== null && (j.$$typeof === x || j.$$typeof === m || j.$$typeof === a || j.$$typeof === c || j.$$typeof === f || j.$$typeof === S || j.$$typeof === R || j.$$typeof === k || j.$$typeof === h);
    }
    function w(j) {
      if (typeof j == "object" && j !== null) {
        var de = j.$$typeof;
        switch (de) {
          case t:
            var Y = j.type;
            switch (Y) {
              case u:
              case p:
              case r:
              case s:
              case i:
              case g:
                return Y;
              default:
                var he = Y && Y.$$typeof;
                switch (he) {
                  case c:
                  case f:
                  case x:
                  case m:
                  case a:
                    return he;
                  default:
                    return de;
                }
            }
          case n:
            return de;
        }
      }
    }
    var C = u, N = p, M = c, D = a, L = t, B = f, I = r, y = x, $ = m, P = n, A = s, F = i, W = g, H = !1;
    function te(j) {
      return H || (H = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), z(j) || w(j) === u;
    }
    function z(j) {
      return w(j) === p;
    }
    function V(j) {
      return w(j) === c;
    }
    function X(j) {
      return w(j) === a;
    }
    function re(j) {
      return typeof j == "object" && j !== null && j.$$typeof === t;
    }
    function oe(j) {
      return w(j) === f;
    }
    function ne(j) {
      return w(j) === r;
    }
    function Q(j) {
      return w(j) === x;
    }
    function Z(j) {
      return w(j) === m;
    }
    function U(j) {
      return w(j) === n;
    }
    function J(j) {
      return w(j) === s;
    }
    function q(j) {
      return w(j) === i;
    }
    function ce(j) {
      return w(j) === g;
    }
    He.AsyncMode = C, He.ConcurrentMode = N, He.ContextConsumer = M, He.ContextProvider = D, He.Element = L, He.ForwardRef = B, He.Fragment = I, He.Lazy = y, He.Memo = $, He.Portal = P, He.Profiler = A, He.StrictMode = F, He.Suspense = W, He.isAsyncMode = te, He.isConcurrentMode = z, He.isContextConsumer = V, He.isContextProvider = X, He.isElement = re, He.isForwardRef = oe, He.isFragment = ne, He.isLazy = Q, He.isMemo = Z, He.isPortal = U, He.isProfiler = J, He.isStrictMode = q, He.isSuspense = ce, He.isValidElementType = E, He.typeOf = w;
  }()), He;
}
var Cc;
function xu() {
  return Cc || (Cc = 1, process.env.NODE_ENV === "production" ? gi.exports = mh() : gi.exports = hh()), gi.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Ks, wc;
function gh() {
  if (wc) return Ks;
  wc = 1;
  var e = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, n = Object.prototype.propertyIsEnumerable;
  function r(s) {
    if (s == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(s);
  }
  function i() {
    try {
      if (!Object.assign)
        return !1;
      var s = new String("abc");
      if (s[5] = "de", Object.getOwnPropertyNames(s)[0] === "5")
        return !1;
      for (var a = {}, c = 0; c < 10; c++)
        a["_" + String.fromCharCode(c)] = c;
      var u = Object.getOwnPropertyNames(a).map(function(f) {
        return a[f];
      });
      if (u.join("") !== "0123456789")
        return !1;
      var p = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(f) {
        p[f] = f;
      }), Object.keys(Object.assign({}, p)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Ks = i() ? Object.assign : function(s, a) {
    for (var c, u = r(s), p, f = 1; f < arguments.length; f++) {
      c = Object(arguments[f]);
      for (var g in c)
        t.call(c, g) && (u[g] = c[g]);
      if (e) {
        p = e(c);
        for (var b = 0; b < p.length; b++)
          n.call(c, p[b]) && (u[p[b]] = c[p[b]]);
      }
    }
    return u;
  }, Ks;
}
var Ys, Sc;
function Qa() {
  if (Sc) return Ys;
  Sc = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Ys = e, Ys;
}
var Xs, Tc;
function Cu() {
  return Tc || (Tc = 1, Xs = Function.call.bind(Object.prototype.hasOwnProperty)), Xs;
}
var Js, Ec;
function yh() {
  if (Ec) return Js;
  Ec = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = Qa(), n = {}, r = Cu();
    e = function(s) {
      var a = "Warning: " + s;
      typeof console < "u" && console.error(a);
      try {
        throw new Error(a);
      } catch {
      }
    };
  }
  function i(s, a, c, u, p) {
    if (process.env.NODE_ENV !== "production") {
      for (var f in s)
        if (r(s, f)) {
          var g;
          try {
            if (typeof s[f] != "function") {
              var b = Error(
                (u || "React class") + ": " + c + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof s[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw b.name = "Invariant Violation", b;
            }
            g = s[f](a, f, u, c, null, t);
          } catch (x) {
            g = x;
          }
          if (g && !(g instanceof Error) && e(
            (u || "React class") + ": type specification of " + c + " `" + f + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof g + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), g instanceof Error && !(g.message in n)) {
            n[g.message] = !0;
            var m = p ? p() : "";
            e(
              "Failed " + c + " type: " + g.message + (m ?? "")
            );
          }
        }
    }
  }
  return i.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, Js = i, Js;
}
var Qs, Oc;
function bh() {
  if (Oc) return Qs;
  Oc = 1;
  var e = xu(), t = gh(), n = Qa(), r = Cu(), i = yh(), s = function() {
  };
  process.env.NODE_ENV !== "production" && (s = function(c) {
    var u = "Warning: " + c;
    typeof console < "u" && console.error(u);
    try {
      throw new Error(u);
    } catch {
    }
  });
  function a() {
    return null;
  }
  return Qs = function(c, u) {
    var p = typeof Symbol == "function" && Symbol.iterator, f = "@@iterator";
    function g(z) {
      var V = z && (p && z[p] || z[f]);
      if (typeof V == "function")
        return V;
    }
    var b = "<<anonymous>>", m = {
      array: R("array"),
      bigint: R("bigint"),
      bool: R("boolean"),
      func: R("function"),
      number: R("number"),
      object: R("object"),
      string: R("string"),
      symbol: R("symbol"),
      any: k(),
      arrayOf: E,
      element: w(),
      elementType: C(),
      instanceOf: N,
      node: B(),
      objectOf: D,
      oneOf: M,
      oneOfType: L,
      shape: y,
      exact: $
    };
    function x(z, V) {
      return z === V ? z !== 0 || 1 / z === 1 / V : z !== z && V !== V;
    }
    function h(z, V) {
      this.message = z, this.data = V && typeof V == "object" ? V : {}, this.stack = "";
    }
    h.prototype = Error.prototype;
    function S(z) {
      if (process.env.NODE_ENV !== "production")
        var V = {}, X = 0;
      function re(ne, Q, Z, U, J, q, ce) {
        if (U = U || b, q = q || Z, ce !== n) {
          if (u) {
            var j = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw j.name = "Invariant Violation", j;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var de = U + ":" + Z;
            !V[de] && // Avoid spamming the console because they are often not actionable except for lib authors
            X < 3 && (s(
              "You are manually calling a React.PropTypes validation function for the `" + q + "` prop on `" + U + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), V[de] = !0, X++);
          }
        }
        return Q[Z] == null ? ne ? Q[Z] === null ? new h("The " + J + " `" + q + "` is marked as required " + ("in `" + U + "`, but its value is `null`.")) : new h("The " + J + " `" + q + "` is marked as required in " + ("`" + U + "`, but its value is `undefined`.")) : null : z(Q, Z, U, J, q);
      }
      var oe = re.bind(null, !1);
      return oe.isRequired = re.bind(null, !0), oe;
    }
    function R(z) {
      function V(X, re, oe, ne, Q, Z) {
        var U = X[re], J = F(U);
        if (J !== z) {
          var q = W(U);
          return new h(
            "Invalid " + ne + " `" + Q + "` of type " + ("`" + q + "` supplied to `" + oe + "`, expected ") + ("`" + z + "`."),
            { expectedType: z }
          );
        }
        return null;
      }
      return S(V);
    }
    function k() {
      return S(a);
    }
    function E(z) {
      function V(X, re, oe, ne, Q) {
        if (typeof z != "function")
          return new h("Property `" + Q + "` of component `" + oe + "` has invalid PropType notation inside arrayOf.");
        var Z = X[re];
        if (!Array.isArray(Z)) {
          var U = F(Z);
          return new h("Invalid " + ne + " `" + Q + "` of type " + ("`" + U + "` supplied to `" + oe + "`, expected an array."));
        }
        for (var J = 0; J < Z.length; J++) {
          var q = z(Z, J, oe, ne, Q + "[" + J + "]", n);
          if (q instanceof Error)
            return q;
        }
        return null;
      }
      return S(V);
    }
    function w() {
      function z(V, X, re, oe, ne) {
        var Q = V[X];
        if (!c(Q)) {
          var Z = F(Q);
          return new h("Invalid " + oe + " `" + ne + "` of type " + ("`" + Z + "` supplied to `" + re + "`, expected a single ReactElement."));
        }
        return null;
      }
      return S(z);
    }
    function C() {
      function z(V, X, re, oe, ne) {
        var Q = V[X];
        if (!e.isValidElementType(Q)) {
          var Z = F(Q);
          return new h("Invalid " + oe + " `" + ne + "` of type " + ("`" + Z + "` supplied to `" + re + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return S(z);
    }
    function N(z) {
      function V(X, re, oe, ne, Q) {
        if (!(X[re] instanceof z)) {
          var Z = z.name || b, U = te(X[re]);
          return new h("Invalid " + ne + " `" + Q + "` of type " + ("`" + U + "` supplied to `" + oe + "`, expected ") + ("instance of `" + Z + "`."));
        }
        return null;
      }
      return S(V);
    }
    function M(z) {
      if (!Array.isArray(z))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? s(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : s("Invalid argument supplied to oneOf, expected an array.")), a;
      function V(X, re, oe, ne, Q) {
        for (var Z = X[re], U = 0; U < z.length; U++)
          if (x(Z, z[U]))
            return null;
        var J = JSON.stringify(z, function(ce, j) {
          var de = W(j);
          return de === "symbol" ? String(j) : j;
        });
        return new h("Invalid " + ne + " `" + Q + "` of value `" + String(Z) + "` " + ("supplied to `" + oe + "`, expected one of " + J + "."));
      }
      return S(V);
    }
    function D(z) {
      function V(X, re, oe, ne, Q) {
        if (typeof z != "function")
          return new h("Property `" + Q + "` of component `" + oe + "` has invalid PropType notation inside objectOf.");
        var Z = X[re], U = F(Z);
        if (U !== "object")
          return new h("Invalid " + ne + " `" + Q + "` of type " + ("`" + U + "` supplied to `" + oe + "`, expected an object."));
        for (var J in Z)
          if (r(Z, J)) {
            var q = z(Z, J, oe, ne, Q + "." + J, n);
            if (q instanceof Error)
              return q;
          }
        return null;
      }
      return S(V);
    }
    function L(z) {
      if (!Array.isArray(z))
        return process.env.NODE_ENV !== "production" && s("Invalid argument supplied to oneOfType, expected an instance of array."), a;
      for (var V = 0; V < z.length; V++) {
        var X = z[V];
        if (typeof X != "function")
          return s(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + H(X) + " at index " + V + "."
          ), a;
      }
      function re(oe, ne, Q, Z, U) {
        for (var J = [], q = 0; q < z.length; q++) {
          var ce = z[q], j = ce(oe, ne, Q, Z, U, n);
          if (j == null)
            return null;
          j.data && r(j.data, "expectedType") && J.push(j.data.expectedType);
        }
        var de = J.length > 0 ? ", expected one of type [" + J.join(", ") + "]" : "";
        return new h("Invalid " + Z + " `" + U + "` supplied to " + ("`" + Q + "`" + de + "."));
      }
      return S(re);
    }
    function B() {
      function z(V, X, re, oe, ne) {
        return P(V[X]) ? null : new h("Invalid " + oe + " `" + ne + "` supplied to " + ("`" + re + "`, expected a ReactNode."));
      }
      return S(z);
    }
    function I(z, V, X, re, oe) {
      return new h(
        (z || "React class") + ": " + V + " type `" + X + "." + re + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + oe + "`."
      );
    }
    function y(z) {
      function V(X, re, oe, ne, Q) {
        var Z = X[re], U = F(Z);
        if (U !== "object")
          return new h("Invalid " + ne + " `" + Q + "` of type `" + U + "` " + ("supplied to `" + oe + "`, expected `object`."));
        for (var J in z) {
          var q = z[J];
          if (typeof q != "function")
            return I(oe, ne, Q, J, W(q));
          var ce = q(Z, J, oe, ne, Q + "." + J, n);
          if (ce)
            return ce;
        }
        return null;
      }
      return S(V);
    }
    function $(z) {
      function V(X, re, oe, ne, Q) {
        var Z = X[re], U = F(Z);
        if (U !== "object")
          return new h("Invalid " + ne + " `" + Q + "` of type `" + U + "` " + ("supplied to `" + oe + "`, expected `object`."));
        var J = t({}, X[re], z);
        for (var q in J) {
          var ce = z[q];
          if (r(z, q) && typeof ce != "function")
            return I(oe, ne, Q, q, W(ce));
          if (!ce)
            return new h(
              "Invalid " + ne + " `" + Q + "` key `" + q + "` supplied to `" + oe + "`.\nBad object: " + JSON.stringify(X[re], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(z), null, "  ")
            );
          var j = ce(Z, q, oe, ne, Q + "." + q, n);
          if (j)
            return j;
        }
        return null;
      }
      return S(V);
    }
    function P(z) {
      switch (typeof z) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !z;
        case "object":
          if (Array.isArray(z))
            return z.every(P);
          if (z === null || c(z))
            return !0;
          var V = g(z);
          if (V) {
            var X = V.call(z), re;
            if (V !== z.entries) {
              for (; !(re = X.next()).done; )
                if (!P(re.value))
                  return !1;
            } else
              for (; !(re = X.next()).done; ) {
                var oe = re.value;
                if (oe && !P(oe[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function A(z, V) {
      return z === "symbol" ? !0 : V ? V["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && V instanceof Symbol : !1;
    }
    function F(z) {
      var V = typeof z;
      return Array.isArray(z) ? "array" : z instanceof RegExp ? "object" : A(V, z) ? "symbol" : V;
    }
    function W(z) {
      if (typeof z > "u" || z === null)
        return "" + z;
      var V = F(z);
      if (V === "object") {
        if (z instanceof Date)
          return "date";
        if (z instanceof RegExp)
          return "regexp";
      }
      return V;
    }
    function H(z) {
      var V = W(z);
      switch (V) {
        case "array":
        case "object":
          return "an " + V;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + V;
        default:
          return V;
      }
    }
    function te(z) {
      return !z.constructor || !z.constructor.name ? b : z.constructor.name;
    }
    return m.checkPropTypes = i, m.resetWarningCache = i.resetWarningCache, m.PropTypes = m, m;
  }, Qs;
}
var Zs, Rc;
function vh() {
  if (Rc) return Zs;
  Rc = 1;
  var e = Qa();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, Zs = function() {
    function r(a, c, u, p, f, g) {
      if (g !== e) {
        var b = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw b.name = "Invariant Violation", b;
      }
    }
    r.isRequired = r;
    function i() {
      return r;
    }
    var s = {
      array: r,
      bigint: r,
      bool: r,
      func: r,
      number: r,
      object: r,
      string: r,
      symbol: r,
      any: r,
      arrayOf: i,
      element: r,
      elementType: r,
      instanceOf: i,
      node: r,
      objectOf: i,
      oneOf: i,
      oneOfType: i,
      shape: i,
      exact: i,
      checkPropTypes: n,
      resetWarningCache: t
    };
    return s.PropTypes = s, s;
  }, Zs;
}
if (process.env.NODE_ENV !== "production") {
  var xh = xu(), Ch = !0;
  ba.exports = bh()(xh.isElement, Ch);
} else
  ba.exports = vh()();
var wh = ba.exports;
const o = /* @__PURE__ */ Vm(wh);
function Sh(e) {
  return e == null || Object.keys(e).length === 0;
}
function Za(e) {
  const {
    styles: t,
    defaultTheme: n = {}
  } = e;
  return /* @__PURE__ */ l(sh, {
    styles: typeof t == "function" ? (i) => t(Sh(i) ? n : i) : t
  });
}
process.env.NODE_ENV !== "production" && (Za.propTypes = {
  defaultTheme: o.object,
  styles: o.oneOfType([o.array, o.string, o.object, o.func])
});
/**
 * @mui/styled-engine v9.0.0
 *
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function wu(e, t) {
  const n = ya(e, t);
  return process.env.NODE_ENV !== "production" ? (...r) => {
    const i = typeof e == "string" ? `"${e}"` : "component";
    return r.length === 0 ? console.error([`MUI: Seems like you called \`styled(${i})()\` without a \`style\` argument.`, 'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.'].join(`
`)) : r.some((s) => s === void 0) && console.error(`MUI: the styled(${i})(...args) API requires all its args to be defined.`), n(...r);
  } : n;
}
function Th(e, t) {
  Array.isArray(e.__emotion_styles) && (e.__emotion_styles = t(e.__emotion_styles));
}
const Nc = [];
function Xn(e) {
  return Nc[0] = e, Yr(Nc);
}
var va = { exports: {} }, Qe = {};
/**
 * @license React
 * react-is.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var kc;
function Eh() {
  if (kc) return Qe;
  kc = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), s = Symbol.for("react.consumer"), a = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), b = Symbol.for("react.view_transition"), m = Symbol.for("react.client.reference");
  function x(h) {
    if (typeof h == "object" && h !== null) {
      var S = h.$$typeof;
      switch (S) {
        case e:
          switch (h = h.type, h) {
            case n:
            case i:
            case r:
            case u:
            case p:
            case b:
              return h;
            default:
              switch (h = h && h.$$typeof, h) {
                case a:
                case c:
                case g:
                case f:
                  return h;
                case s:
                  return h;
                default:
                  return S;
              }
          }
        case t:
          return S;
      }
    }
  }
  return Qe.ContextConsumer = s, Qe.ContextProvider = a, Qe.Element = e, Qe.ForwardRef = c, Qe.Fragment = n, Qe.Lazy = g, Qe.Memo = f, Qe.Portal = t, Qe.Profiler = i, Qe.StrictMode = r, Qe.Suspense = u, Qe.SuspenseList = p, Qe.isContextConsumer = function(h) {
    return x(h) === s;
  }, Qe.isContextProvider = function(h) {
    return x(h) === a;
  }, Qe.isElement = function(h) {
    return typeof h == "object" && h !== null && h.$$typeof === e;
  }, Qe.isForwardRef = function(h) {
    return x(h) === c;
  }, Qe.isFragment = function(h) {
    return x(h) === n;
  }, Qe.isLazy = function(h) {
    return x(h) === g;
  }, Qe.isMemo = function(h) {
    return x(h) === f;
  }, Qe.isPortal = function(h) {
    return x(h) === t;
  }, Qe.isProfiler = function(h) {
    return x(h) === i;
  }, Qe.isStrictMode = function(h) {
    return x(h) === r;
  }, Qe.isSuspense = function(h) {
    return x(h) === u;
  }, Qe.isSuspenseList = function(h) {
    return x(h) === p;
  }, Qe.isValidElementType = function(h) {
    return typeof h == "string" || typeof h == "function" || h === n || h === i || h === r || h === u || h === p || typeof h == "object" && h !== null && (h.$$typeof === g || h.$$typeof === f || h.$$typeof === a || h.$$typeof === s || h.$$typeof === c || h.$$typeof === m || h.getModuleId !== void 0);
  }, Qe.typeOf = x, Qe;
}
var Ze = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Pc;
function Oh() {
  return Pc || (Pc = 1, process.env.NODE_ENV !== "production" && function() {
    function e(h) {
      if (typeof h == "object" && h !== null) {
        var S = h.$$typeof;
        switch (S) {
          case t:
            switch (h = h.type, h) {
              case r:
              case s:
              case i:
              case p:
              case f:
              case m:
                return h;
              default:
                switch (h = h && h.$$typeof, h) {
                  case c:
                  case u:
                  case b:
                  case g:
                    return h;
                  case a:
                    return h;
                  default:
                    return S;
                }
            }
          case n:
            return S;
        }
      }
    }
    var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), a = Symbol.for("react.consumer"), c = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), g = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), m = Symbol.for("react.view_transition"), x = Symbol.for("react.client.reference");
    Ze.ContextConsumer = a, Ze.ContextProvider = c, Ze.Element = t, Ze.ForwardRef = u, Ze.Fragment = r, Ze.Lazy = b, Ze.Memo = g, Ze.Portal = n, Ze.Profiler = s, Ze.StrictMode = i, Ze.Suspense = p, Ze.SuspenseList = f, Ze.isContextConsumer = function(h) {
      return e(h) === a;
    }, Ze.isContextProvider = function(h) {
      return e(h) === c;
    }, Ze.isElement = function(h) {
      return typeof h == "object" && h !== null && h.$$typeof === t;
    }, Ze.isForwardRef = function(h) {
      return e(h) === u;
    }, Ze.isFragment = function(h) {
      return e(h) === r;
    }, Ze.isLazy = function(h) {
      return e(h) === b;
    }, Ze.isMemo = function(h) {
      return e(h) === g;
    }, Ze.isPortal = function(h) {
      return e(h) === n;
    }, Ze.isProfiler = function(h) {
      return e(h) === s;
    }, Ze.isStrictMode = function(h) {
      return e(h) === i;
    }, Ze.isSuspense = function(h) {
      return e(h) === p;
    }, Ze.isSuspenseList = function(h) {
      return e(h) === f;
    }, Ze.isValidElementType = function(h) {
      return typeof h == "string" || typeof h == "function" || h === r || h === s || h === i || h === p || h === f || typeof h == "object" && h !== null && (h.$$typeof === b || h.$$typeof === g || h.$$typeof === c || h.$$typeof === a || h.$$typeof === u || h.$$typeof === x || h.getModuleId !== void 0);
    }, Ze.typeOf = e;
  }()), Ze;
}
process.env.NODE_ENV === "production" ? va.exports = Eh() : va.exports = Oh();
var Ho = va.exports;
function Dn(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Su(e) {
  if (/* @__PURE__ */ v.isValidElement(e) || Ho.isValidElementType(e) || !Dn(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[n] = Su(e[n]);
  }), t;
}
function kt(e, t, n = {
  clone: !0
}) {
  const r = n.clone ? {
    ...e
  } : e;
  return Dn(e) && Dn(t) && Object.keys(t).forEach((i) => {
    /* @__PURE__ */ v.isValidElement(t[i]) || Ho.isValidElementType(t[i]) ? r[i] = t[i] : Dn(t[i]) && // Avoid prototype pollution
    Object.prototype.hasOwnProperty.call(e, i) && Dn(e[i]) ? r[i] = kt(e[i], t[i], n) : n.clone ? r[i] = Dn(t[i]) ? Su(t[i]) : t[i] : r[i] = t[i];
  }), r;
}
const Rh = (e) => {
  const t = Object.keys(e).map((n) => ({
    key: n,
    val: e[n]
  })) || [];
  return t.sort((n, r) => n.val - r.val), t.reduce((n, r) => ({
    ...n,
    [r.key]: r.val
  }), {});
};
function Tu(e) {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm).
    values: t = {
      xs: 0,
      // phone
      sm: 600,
      // tablet
      md: 900,
      // small laptop
      lg: 1200,
      // desktop
      xl: 1536
      // large screen
    },
    unit: n = "px",
    step: r = 5,
    ...i
  } = e, s = Rh(t), a = Object.keys(s);
  function c(m) {
    return `@media (min-width:${typeof t[m] == "number" ? t[m] : m}${n})`;
  }
  function u(m) {
    return `@media (max-width:${(typeof t[m] == "number" ? t[m] : m) - r / 100}${n})`;
  }
  function p(m, x) {
    const h = a.indexOf(x);
    return `@media (min-width:${typeof t[m] == "number" ? t[m] : m}${n}) and (max-width:${(h !== -1 && typeof t[a[h]] == "number" ? t[a[h]] : x) - r / 100}${n})`;
  }
  function f(m) {
    return a.indexOf(m) + 1 < a.length ? p(m, a[a.indexOf(m) + 1]) : c(m);
  }
  function g(m) {
    const x = a.indexOf(m);
    return x === 0 ? c(a[1]) : x === a.length - 1 ? u(a[x]) : p(m, a[a.indexOf(m) + 1]).replace("@media", "@media not all and");
  }
  const b = [];
  for (let m = 0; m < a.length; m += 1)
    b.push(c(a[m]));
  return {
    keys: a,
    values: s,
    up: c,
    down: u,
    between: p,
    only: f,
    not: g,
    unit: n,
    internal_mediaKeys: b,
    ...i
  };
}
const Ic = /min-width:\s*([0-9.]+)/;
function $c(e, t) {
  if (!e.containerQueries || !Nh(t))
    return t;
  const n = [];
  for (const i in t)
    i.startsWith("@container") && n.push(i);
  n.sort((i, s) => {
    var a, c;
    return +(((a = i.match(Ic)) == null ? void 0 : a[1]) || 0) - +(((c = s.match(Ic)) == null ? void 0 : c[1]) || 0);
  });
  const r = t;
  for (let i = 0; i < n.length; i += 1) {
    const s = n[i], a = r[s];
    delete r[s], r[s] = a;
  }
  return r;
}
function Nh(e) {
  for (const t in e)
    if (t.startsWith("@container"))
      return !0;
  return !1;
}
function Eu(e, t) {
  return t === "@" || t.startsWith("@") && (e.some((n) => t.startsWith(`@${n}`)) || !!t.match(/^@\d/));
}
function kh(e, t) {
  const n = t.match(/^@([^/]+)?\/?(.+)?$/);
  if (!n) {
    if (process.env.NODE_ENV !== "production")
      throw (
        /* minify-error */
        new Error(`MUI: The provided shorthand ${`(${t})`} is invalid. The format should be \`@<breakpoint | number>\` or \`@<breakpoint | number>/<container>\`.
For example, \`@sm\` or \`@600\` or \`@40rem/sidebar\`.`)
      );
    return null;
  }
  const [, r, i] = n, s = Number.isNaN(+r) ? r || 0 : +r;
  return e.containerQueries(i).up(s);
}
function Ph(e) {
  const t = (s, a) => s.replace("@media", a ? `@container ${a}` : "@container");
  function n(s, a) {
    s.up = (...c) => t(e.breakpoints.up(...c), a), s.down = (...c) => t(e.breakpoints.down(...c), a), s.between = (...c) => t(e.breakpoints.between(...c), a), s.only = (...c) => t(e.breakpoints.only(...c), a), s.not = (...c) => {
      const u = t(e.breakpoints.not(...c), a);
      return u.includes("not all and") ? u.replace("not all and ", "").replace("min-width:", "width<").replace("max-width:", "width>").replace("and", "or") : u;
    };
  }
  const r = {}, i = (s) => (n(r, s), r);
  return n(i), {
    ...e,
    containerQueries: i
  };
}
const Ih = {
  borderRadius: 4
}, eo = process.env.NODE_ENV !== "production" ? o.oneOfType([o.number, o.string, o.object, o.array]) : {};
function Ou(e) {
  if (e == null)
    return !0;
  for (const t in e)
    return !1;
  return !0;
}
function Wo(e, t) {
  const n = Array.isArray(t), r = Array.isArray(e);
  return Dh(t) ? t : Lh(e) ? qo(t) : n && r ? Mh(e, t) : n !== r ? qo(t) : Fh(e, t);
}
function $h(e) {
  let t = 0;
  const n = e.length, r = new Array(n);
  for (t = 0; t < n; t += 1)
    r[t] = qo(e[t]);
  return r;
}
function Ah(e) {
  const t = {};
  for (const n in e)
    t[n] = qo(e[n]);
  return t;
}
function Mh(e, t) {
  const n = e.length;
  for (let r = 0; r < t.length; r += 1)
    e[n + r] = qo(t[r]);
  return e;
}
function _h(e) {
  return typeof e == "object" && e !== null && !(e instanceof RegExp) && !(e instanceof Date);
}
function Dh(e) {
  return typeof e != "object" || e === null;
}
function Lh(e) {
  return typeof e != "object" || e === null || e instanceof RegExp || e instanceof Date;
}
function qo(e) {
  return _h(e) ? Array.isArray(e) ? $h(e) : Ah(e) : e;
}
function Fh(e, t) {
  for (const n in t)
    n in e ? e[n] = Wo(e[n], t[n]) : e[n] = qo(t[n]);
  return e;
}
const jh = {}, fs = {
  xs: 0,
  // phone
  sm: 600,
  // tablet
  md: 900,
  // small laptop
  lg: 1200,
  // desktop
  xl: 1536
  // large screen
}, Gi = Tu({
  values: fs
}), Bh = {
  containerQueries: (e) => ({
    up: (t) => {
      let n = typeof t == "number" ? t : fs[t] || t;
      return typeof n == "number" && (n = `${n}px`), e ? `@container ${e} (min-width:${n})` : `@container (min-width:${n})`;
    }
  })
};
function Jn(e, t, n) {
  const r = {};
  return ms(r, e.theme, t, (i, s, a) => {
    const c = n(s, a);
    i ? r[i] = c : Wo(r, c);
  });
}
function ms(e, t, n, r) {
  if (t ?? (t = jh), Array.isArray(n)) {
    const i = t.breakpoints ?? Gi;
    for (let s = 0; s < n.length; s += 1)
      ea(e, i.up(i.keys[s]), n[s], void 0, r);
    return e;
  }
  if (typeof n == "object") {
    const i = t.breakpoints ?? Gi, s = i.values ?? fs;
    for (const a in n)
      if (Eu(i.keys, a)) {
        const c = kh(t.containerQueries ? t : Bh, a);
        c && ea(e, c, n[a], a, r);
      } else if (a in s) {
        const c = i.up(a);
        ea(e, c, n[a], a, r);
      } else {
        const c = a;
        e[c] = n[c];
      }
    return e;
  }
  return r(void 0, n), e;
}
function ea(e, t, n, r, i) {
  e[t] ?? (e[t] = {}), i(t, n, r);
}
function Ru(e = Gi) {
  const {
    internal_mediaKeys: t
  } = e, n = {};
  for (let r = 0; r < t.length; r += 1)
    n[t[r]] = {};
  return n;
}
function xa(e, t) {
  const n = e.internal_mediaKeys;
  for (let r = 0; r < n.length; r += 1) {
    const i = n[r];
    Ou(t[i]) && delete t[i];
  }
  return t;
}
function Wh(e, ...t) {
  const r = [Ru(e), ...t].reduce((i, s) => kt(i, s), {});
  return xa(e, r);
}
function zh(e, t) {
  if (typeof e != "object")
    return {};
  const n = {}, r = Object.keys(t);
  return Array.isArray(e) ? r.forEach((i, s) => {
    s < e.length && (n[i] = !0);
  }) : r.forEach((i) => {
    e[i] != null && (n[i] = !0);
  }), n;
}
function ta({
  values: e,
  breakpoints: t,
  base: n
}) {
  const r = n || zh(e, t), i = Object.keys(r);
  if (i.length === 0)
    return e;
  let s;
  return i.reduce((a, c, u) => (Array.isArray(e) ? (a[c] = e[u] != null ? e[u] : e[s], s = u) : typeof e == "object" ? (a[c] = e[c] != null ? e[c] : e[s], s = c) : a[c] = e, a), {});
}
function Vh(e, t) {
  if (Array.isArray(t))
    return !0;
  if (typeof t == "object" && t !== null) {
    for (let r = 0; r < e.keys.length; r += 1)
      if (e.keys[r] in t)
        return !0;
    const n = Object.keys(t);
    for (let r = 0; r < n.length; r += 1)
      if (Eu(e.keys, n[r]))
        return !0;
  }
  return !1;
}
function ye(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Wn(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Nu(e, t, n, r) {
  let i;
  return typeof e == "function" ? i = e(n) : Array.isArray(e) ? i = e[n] || n : typeof n == "string" ? i = hs(e, n, !0, r) || n : i = n, t && (i = t(i, n, e)), i;
}
function hs(e, t, n = !0, r = void 0) {
  if (!e || !t)
    return null;
  const i = t.split(".");
  if (e.vars && n) {
    const s = Ac(e.vars, i, r);
    if (s != null)
      return s;
  }
  return Ac(e, i, r);
}
function Ac(e, t, n = void 0) {
  let r, i = e, s = 0;
  for (; s < t.length; ) {
    if (i == null)
      return i;
    r = i, i = i[t[s]], s += 1;
  }
  if (n && i === void 0) {
    const a = t[t.length - 1], c = `${n}${a === "default" ? "" : ye(a)}`;
    return r == null ? void 0 : r[c];
  }
  return i;
}
function yt(e) {
  const {
    prop: t,
    cssProperty: n = e.prop,
    themeKey: r,
    transform: i
  } = e, s = (a) => {
    if (a[t] == null)
      return null;
    const c = a[t], u = a.theme, p = hs(u, r) || {};
    return Jn(a, c, (g) => {
      const b = Nu(p, i, g, t);
      return n === !1 ? b : {
        [n]: b
      };
    });
  };
  return s.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: eo
  } : {}, s.filterProps = [t], s;
}
const Uh = {
  internal_cache: {}
}, Hi = {
  m: "margin",
  p: "padding"
}, Mc = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, _c = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, jr = {};
for (const e in Hi)
  jr[e] = [Hi[e]];
for (const e in Hi)
  for (const t in Mc) {
    const n = Hi[e], r = Mc[t], i = Array.isArray(r) ? r.map((s) => n + s) : [n + r];
    jr[e + t] = i;
  }
for (const e in _c)
  jr[e] = jr[_c[e]];
const gs = /* @__PURE__ */ new Set(["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"]), ys = /* @__PURE__ */ new Set(["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"]), Gh = /* @__PURE__ */ new Set([...gs, ...ys]);
function Qr(e, t, n, r) {
  const i = hs(e, t, !0) ?? n;
  return typeof i == "number" || typeof i == "string" ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && typeof s != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`), typeof i == "string" ? i.startsWith("var(") && s === 0 ? 0 : i.startsWith("var(") && s === 1 ? i : `calc(${s} * ${i})` : i * s) : Array.isArray(i) ? (s) => {
    if (typeof s == "string")
      return s;
    const a = Math.abs(s);
    process.env.NODE_ENV !== "production" && (Number.isInteger(a) ? a > i.length - 1 && console.error([`MUI: The value provided (${a}) overflows.`, `The supported values are: ${JSON.stringify(i)}.`, `${a} > ${i.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`)));
    const c = i[a];
    return s >= 0 ? c : typeof c == "number" ? -c : typeof c == "string" && c.startsWith("var(") ? `calc(-1 * ${c})` : `-${c}`;
  } : typeof i == "function" ? i : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function bs(e) {
  return Qr(e, "spacing", 8, "spacing");
}
function yo(e, t) {
  return typeof t == "string" || t == null ? t : e(t);
}
const Dc = [""];
function ku(e, t) {
  var s;
  const n = e.theme ?? Uh, r = ((s = n == null ? void 0 : n.internal_cache) == null ? void 0 : s.unarySpacing) ?? bs(n), i = {};
  for (const a in e) {
    if (!t.has(a))
      continue;
    const c = jr[a] ?? (Dc[0] = a, Dc), u = e[a];
    ms(i, e.theme, u, (p, f) => {
      const g = p ? i[p] : i;
      for (let b = 0; b < c.length; b += 1)
        g[c[b]] = yo(r, f);
    });
  }
  return i;
}
function ht(e) {
  return ku(e, gs);
}
ht.propTypes = process.env.NODE_ENV !== "production" ? Array.from(gs).reduce((e, t) => (e[t] = eo, e), {}) : {};
ht.filterProps = gs;
function gt(e) {
  return ku(e, ys);
}
gt.propTypes = process.env.NODE_ENV !== "production" ? Array.from(ys).reduce((e, t) => (e[t] = eo, e), {}) : {};
gt.filterProps = ys;
process.env.NODE_ENV !== "production" && Array.from(Gh).reduce((e, t) => (e[t] = eo, e), {});
function Pu(e = 8, t = bs({
  spacing: e
})) {
  if (e.mui)
    return e;
  const n = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((s) => {
    const a = t(s);
    return typeof a == "number" ? `${a}px` : a;
  }).join(" "));
  return n.mui = !0, n;
}
function vs(...e) {
  const t = e.reduce((r, i) => (i.filterProps.forEach((s) => {
    r[s] = i;
  }), r), {}), n = (r) => {
    const i = {};
    for (const s in r)
      t[s] && Wo(i, t[s](r));
    return i;
  };
  return n.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((r, i) => Object.assign(r, i.propTypes), {}) : {}, n.filterProps = e.reduce((r, i) => r.concat(i.filterProps), []), n;
}
function nn(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function an(e, t) {
  return yt({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const Hh = an("border", nn), qh = an("borderTop", nn), Kh = an("borderRight", nn), Yh = an("borderBottom", nn), Xh = an("borderLeft", nn), Jh = an("borderColor"), Qh = an("borderTopColor"), Zh = an("borderRightColor"), eg = an("borderBottomColor"), tg = an("borderLeftColor"), ng = an("outline", nn), og = an("outlineColor"), xs = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = Qr(e.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: yo(t, r)
    });
    return Jn(e, e.borderRadius, n);
  }
  return null;
};
xs.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: eo
} : {};
xs.filterProps = ["borderRadius"];
vs(Hh, qh, Kh, Yh, Xh, Jh, Qh, Zh, eg, tg, xs, ng, og);
const Cs = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = Qr(e.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: yo(t, r)
    });
    return Jn(e, e.gap, n);
  }
  return null;
};
Cs.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: eo
} : {};
Cs.filterProps = ["gap"];
const ws = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = Qr(e.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: yo(t, r)
    });
    return Jn(e, e.columnGap, n);
  }
  return null;
};
ws.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: eo
} : {};
ws.filterProps = ["columnGap"];
const Ss = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = Qr(e.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: yo(t, r)
    });
    return Jn(e, e.rowGap, n);
  }
  return null;
};
Ss.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: eo
} : {};
Ss.filterProps = ["rowGap"];
const rg = yt({
  prop: "gridColumn"
}), ig = yt({
  prop: "gridRow"
}), sg = yt({
  prop: "gridAutoFlow"
}), ag = yt({
  prop: "gridAutoColumns"
}), lg = yt({
  prop: "gridAutoRows"
}), cg = yt({
  prop: "gridTemplateColumns"
}), dg = yt({
  prop: "gridTemplateRows"
}), ug = yt({
  prop: "gridTemplateAreas"
}), pg = yt({
  prop: "gridArea"
});
vs(Cs, ws, Ss, rg, ig, sg, ag, lg, cg, dg, ug, pg);
function zo(e, t) {
  return t === "grey" ? t : e;
}
const fg = yt({
  prop: "color",
  themeKey: "palette",
  transform: zo
}), mg = yt({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: zo
}), hg = yt({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: zo
});
vs(fg, mg, hg);
function Ht(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const gg = yt({
  prop: "width",
  transform: Ht
}), el = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (n) => {
      var i, s, a, c, u;
      const r = ((a = (s = (i = e.theme) == null ? void 0 : i.breakpoints) == null ? void 0 : s.values) == null ? void 0 : a[n]) || fs[n];
      return r ? ((u = (c = e.theme) == null ? void 0 : c.breakpoints) == null ? void 0 : u.unit) !== "px" ? {
        maxWidth: `${r}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: r
      } : {
        maxWidth: Ht(n)
      };
    };
    return Jn(e, e.maxWidth, t);
  }
  return null;
};
el.filterProps = ["maxWidth"];
const yg = yt({
  prop: "minWidth",
  transform: Ht
}), bg = yt({
  prop: "height",
  transform: Ht
}), vg = yt({
  prop: "maxHeight",
  transform: Ht
}), xg = yt({
  prop: "minHeight",
  transform: Ht
});
yt({
  prop: "size",
  cssProperty: "width",
  transform: Ht
});
yt({
  prop: "size",
  cssProperty: "height",
  transform: Ht
});
const Cg = yt({
  prop: "boxSizing"
});
vs(gg, el, yg, bg, vg, xg, Cg);
const Ts = {
  // borders
  border: {
    themeKey: "borders",
    transform: nn
  },
  borderTop: {
    themeKey: "borders",
    transform: nn
  },
  borderRight: {
    themeKey: "borders",
    transform: nn
  },
  borderBottom: {
    themeKey: "borders",
    transform: nn
  },
  borderLeft: {
    themeKey: "borders",
    transform: nn
  },
  borderColor: {
    themeKey: "palette"
  },
  borderTopColor: {
    themeKey: "palette"
  },
  borderRightColor: {
    themeKey: "palette"
  },
  borderBottomColor: {
    themeKey: "palette"
  },
  borderLeftColor: {
    themeKey: "palette"
  },
  outline: {
    themeKey: "borders",
    transform: nn
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: xs
  },
  // palette
  color: {
    themeKey: "palette",
    transform: zo
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: zo
  },
  backgroundColor: {
    themeKey: "palette",
    transform: zo
  },
  // spacing
  p: {
    style: gt
  },
  pt: {
    style: gt
  },
  pr: {
    style: gt
  },
  pb: {
    style: gt
  },
  pl: {
    style: gt
  },
  px: {
    style: gt
  },
  py: {
    style: gt
  },
  padding: {
    style: gt
  },
  paddingTop: {
    style: gt
  },
  paddingRight: {
    style: gt
  },
  paddingBottom: {
    style: gt
  },
  paddingLeft: {
    style: gt
  },
  paddingX: {
    style: gt
  },
  paddingY: {
    style: gt
  },
  paddingInline: {
    style: gt
  },
  paddingInlineStart: {
    style: gt
  },
  paddingInlineEnd: {
    style: gt
  },
  paddingBlock: {
    style: gt
  },
  paddingBlockStart: {
    style: gt
  },
  paddingBlockEnd: {
    style: gt
  },
  m: {
    style: ht
  },
  mt: {
    style: ht
  },
  mr: {
    style: ht
  },
  mb: {
    style: ht
  },
  ml: {
    style: ht
  },
  mx: {
    style: ht
  },
  my: {
    style: ht
  },
  margin: {
    style: ht
  },
  marginTop: {
    style: ht
  },
  marginRight: {
    style: ht
  },
  marginBottom: {
    style: ht
  },
  marginLeft: {
    style: ht
  },
  marginX: {
    style: ht
  },
  marginY: {
    style: ht
  },
  marginInline: {
    style: ht
  },
  marginInlineStart: {
    style: ht
  },
  marginInlineEnd: {
    style: ht
  },
  marginBlock: {
    style: ht
  },
  marginBlockStart: {
    style: ht
  },
  marginBlockEnd: {
    style: ht
  },
  // display
  displayPrint: {
    cssProperty: !1,
    transform: (e) => ({
      "@media print": {
        display: e
      }
    })
  },
  display: {},
  overflow: {},
  textOverflow: {},
  visibility: {},
  whiteSpace: {},
  // flexbox
  flexBasis: {},
  flexDirection: {},
  flexWrap: {},
  justifyContent: {},
  alignItems: {},
  alignContent: {},
  order: {},
  flex: {},
  flexGrow: {},
  flexShrink: {},
  alignSelf: {},
  justifyItems: {},
  justifySelf: {},
  // grid
  gap: {
    style: Cs
  },
  rowGap: {
    style: Ss
  },
  columnGap: {
    style: ws
  },
  gridColumn: {},
  gridRow: {},
  gridAutoFlow: {},
  gridAutoColumns: {},
  gridAutoRows: {},
  gridTemplateColumns: {},
  gridTemplateRows: {},
  gridTemplateAreas: {},
  gridArea: {},
  // positions
  position: {},
  zIndex: {
    themeKey: "zIndex"
  },
  top: {},
  right: {},
  bottom: {},
  left: {},
  // shadows
  boxShadow: {
    themeKey: "shadows"
  },
  // sizing
  width: {
    transform: Ht
  },
  maxWidth: {
    style: el
  },
  minWidth: {
    transform: Ht
  },
  height: {
    transform: Ht
  },
  maxHeight: {
    transform: Ht
  },
  minHeight: {
    transform: Ht
  },
  boxSizing: {},
  // typography
  font: {
    themeKey: "font"
  },
  fontFamily: {
    themeKey: "typography"
  },
  fontSize: {
    themeKey: "typography"
  },
  fontStyle: {
    themeKey: "typography"
  },
  fontWeight: {
    themeKey: "typography"
  },
  letterSpacing: {},
  textTransform: {},
  lineHeight: {},
  textAlign: {},
  typography: {
    cssProperty: !1,
    themeKey: "typography"
  }
}, wg = {};
function Sg() {
  function e(t) {
    if (!t.sx)
      return null;
    const {
      sx: n,
      theme: r = wg,
      nested: i
    } = t, s = r.unstable_sxConfig ?? Ts, a = {
      sx: null,
      theme: r,
      nested: !0
    };
    function c(u) {
      let p = u;
      if (typeof u == "function")
        p = u(r);
      else if (typeof u != "object")
        return u;
      if (!p)
        return null;
      const f = r.breakpoints ?? Gi, g = Ru(f);
      for (const b in p) {
        const m = Tg(p[b], r);
        if (m != null) {
          if (typeof m != "object") {
            Lc(g, b, m, r, s);
            continue;
          }
          if (s[b]) {
            Lc(g, b, m, r, s);
            continue;
          }
          Vh(f, m) ? ms(g, t.theme, m, (x, h) => {
            g[x][b] = h;
          }) : (a.sx = m, g[b] = e(a));
        }
      }
      return !i && r.modularCssLayers ? {
        "@layer sx": $c(r, xa(f, g))
      } : $c(r, xa(f, g));
    }
    return Array.isArray(n) ? n.map(c) : c(n);
  }
  return e.filterProps = ["sx"], e;
}
const bo = Sg();
function Lc(e, t, n, r, i) {
  const s = i[t];
  if (!s) {
    e[t] = n;
    return;
  }
  if (n == null)
    return;
  const {
    themeKey: a
  } = s;
  if (a === "typography" && n === "inherit") {
    e[t] = n;
    return;
  }
  const {
    style: c
  } = s;
  if (c) {
    Wo(e, c({
      [t]: n,
      theme: r
    }));
    return;
  }
  const {
    cssProperty: u = t,
    transform: p
  } = s, f = hs(r, a);
  ms(e, r, n, (g, b) => {
    const m = Nu(f, p, b, t);
    u === !1 ? Wo(g ? e[g] : e, m) : g ? e[g][u] = m : e[u] = m;
  });
}
function Tg(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Eg(e, t) {
  var r;
  const n = this;
  if (n.vars) {
    if (!((r = n.colorSchemes) != null && r[e]) || typeof n.getColorSchemeSelector != "function")
      return {};
    let i = n.getColorSchemeSelector(e);
    return i === "&" ? t : ((i.includes("data-") || i.includes(".")) && (i = `*:where(${i.replace(/\s*&$/, "")}) &`), {
      [i]: t
    });
  }
  return n.palette.mode === e ? t : {};
}
function Zr(e = {}, ...t) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: i,
    shape: s = {},
    ...a
  } = e, c = Tu(n), u = Pu(i);
  let p = kt({
    breakpoints: c,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: {
      mode: "light",
      ...r
    },
    spacing: u,
    shape: {
      ...Ih,
      ...s
    }
  }, a);
  return p = Ph(p), p.applyStyles = Eg, p = t.reduce((f, g) => kt(f, g), p), p.unstable_sxConfig = {
    ...Ts,
    ...a == null ? void 0 : a.unstable_sxConfig
  }, p.unstable_sx = function(g) {
    return bo({
      sx: g,
      theme: this
    });
  }, p.internal_cache = {}, p;
}
function Og(e) {
  return Object.keys(e).length === 0;
}
function tl(e = null) {
  const t = v.useContext(Xr);
  return !t || Og(t) ? e : t;
}
const Rg = Zr();
function Es(e = Rg) {
  return tl(e);
}
function na(e) {
  const t = Xn(e);
  return e !== t && t.styles ? (t.styles.match(/^@layer\s+[^{]*$/) || (t.styles = `@layer global{${t.styles}}`), t) : e;
}
function nl({
  styles: e,
  themeId: t,
  defaultTheme: n = {}
}) {
  const r = Es(n), i = t && r[t] || r;
  let s = typeof e == "function" ? e(i) : e;
  return i.modularCssLayers && (Array.isArray(s) ? s = s.map((a) => na(typeof a == "function" ? a(i) : a)) : s = na(s)), /* @__PURE__ */ l(Za, {
    styles: s
  });
}
process.env.NODE_ENV !== "production" && (nl.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  defaultTheme: o.object,
  /**
   * @ignore
   */
  styles: o.oneOfType([o.array, o.func, o.number, o.object, o.string, o.bool]),
  /**
   * @ignore
   */
  themeId: o.string
});
const Fc = (e) => e, Ng = () => {
  let e = Fc;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = Fc;
    }
  };
}, Iu = Ng();
function $u(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var i = e.length;
    for (t = 0; t < i; t++) e[t] && (n = $u(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function le() {
  for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = $u(e)) && (r && (r += " "), r += t);
  return r;
}
function kg(e = {}) {
  const {
    themeId: t,
    defaultTheme: n,
    defaultClassName: r = "MuiBox-root",
    generateClassName: i
  } = e, s = wu("div", {
    shouldForwardProp: (c) => c !== "theme" && c !== "sx" && c !== "as"
  })(bo);
  return /* @__PURE__ */ v.forwardRef(function(u, p) {
    const f = Es(n), {
      className: g,
      component: b = "div",
      ...m
    } = u;
    return /* @__PURE__ */ l(s, {
      as: b,
      ref: p,
      className: le(g, i ? i(r) : r),
      theme: t && f[t] || f,
      ...m
    });
  });
}
const Pg = {
  active: "active",
  checked: "checked",
  completed: "completed",
  disabled: "disabled",
  error: "error",
  expanded: "expanded",
  focused: "focused",
  focusVisible: "focusVisible",
  open: "open",
  readOnly: "readOnly",
  required: "required",
  selected: "selected"
};
function be(e, t, n = "Mui") {
  const r = Pg[t];
  return r ? `${n}-${r}` : `${Iu.generate(e)}-${t}`;
}
function xe(e, t, n = "Mui") {
  const r = {};
  return t.forEach((i) => {
    r[i] = be(e, i, n);
  }), r;
}
function Au(e, t = "") {
  return e.displayName || e.name || t;
}
function jc(e, t, n) {
  const r = Au(t);
  return e.displayName || (r !== "" ? `${n}(${r})` : n);
}
function Ig(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return Au(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Ho.ForwardRef:
          return jc(e, e.render, "ForwardRef");
        case Ho.Memo:
          return jc(e, e.type, "memo");
        default:
          return;
      }
  }
}
function Mu(e) {
  const {
    variants: t,
    ...n
  } = e, r = {
    variants: t,
    style: Xn(n),
    isProcessed: !0
  };
  return r.style === n || t && t.forEach((i) => {
    typeof i.style != "function" && (i.style = Xn(i.style));
  }), r;
}
const $g = Zr();
function oa(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
function mo(e, t) {
  return t && e && typeof e == "object" && e.styles && !e.styles.startsWith("@layer") && (e.styles = `@layer ${t}{${String(e.styles)}}`), e;
}
function Ag(e) {
  return e ? (t, n) => n[e] : null;
}
function Mg(e, t, n) {
  e.theme = Ou(e.theme) ? n : e.theme[t] || e.theme;
}
function Bi(e, t, n) {
  const r = typeof t == "function" ? t(e) : t;
  if (Array.isArray(r))
    return r.flatMap((i) => Bi(e, i, n));
  if (Array.isArray(r == null ? void 0 : r.variants)) {
    let i;
    if (r.isProcessed)
      i = n ? mo(r.style, n) : r.style;
    else {
      const {
        variants: s,
        ...a
      } = r;
      i = n ? mo(Xn(a), n) : a;
    }
    return _u(e, r.variants, [i], n);
  }
  return r != null && r.isProcessed ? n ? mo(Xn(r.style), n) : r.style : n ? mo(Xn(r), n) : r;
}
function _u(e, t, n = [], r = void 0) {
  var s;
  let i;
  e: for (let a = 0; a < t.length; a += 1) {
    const c = t[a];
    if (typeof c.props == "function") {
      if (i ?? (i = {
        ...e,
        ...e.ownerState,
        ownerState: e.ownerState
      }), !c.props(i))
        continue;
    } else
      for (const u in c.props)
        if (e[u] !== c.props[u] && ((s = e.ownerState) == null ? void 0 : s[u]) !== c.props[u])
          continue e;
    typeof c.style == "function" ? (i ?? (i = {
      ...e,
      ...e.ownerState,
      ownerState: e.ownerState
    }), n.push(r ? mo(Xn(c.style(i)), r) : c.style(i))) : n.push(r ? mo(Xn(c.style), r) : c.style);
  }
  return n;
}
function Du(e = {}) {
  const {
    themeId: t,
    defaultTheme: n = $g,
    rootShouldForwardProp: r = oa,
    slotShouldForwardProp: i = oa
  } = e;
  function s(c) {
    Mg(c, t, n);
  }
  return (c, u = {}) => {
    Th(c, (N) => N.filter((M) => M !== bo));
    const {
      name: p,
      slot: f,
      skipVariantsResolver: g,
      skipSx: b,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: m = Ag(Lu(f)),
      ...x
    } = u, h = p && p.startsWith("Mui") || f ? "components" : "custom", S = g !== void 0 ? g : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      f && f !== "Root" && f !== "root" || !1
    ), R = b || !1;
    let k = oa;
    f === "Root" || f === "root" ? k = r : f ? k = i : Lg(c) && (k = void 0);
    const E = wu(c, {
      shouldForwardProp: k,
      label: Dg(p, f),
      ...x
    }), w = (N) => {
      if (N.__emotion_real === N)
        return N;
      if (typeof N == "function")
        return function(D) {
          return Bi(D, N, D.theme.modularCssLayers ? h : void 0);
        };
      if (Dn(N)) {
        const M = Mu(N);
        return function(L) {
          return M.variants ? Bi(L, M, L.theme.modularCssLayers ? h : void 0) : L.theme.modularCssLayers ? mo(M.style, h) : M.style;
        };
      }
      return N;
    }, C = (...N) => {
      const M = [], D = N.map(w), L = [];
      if (M.push(s), p && m && L.push(function($) {
        var W, H;
        const A = (H = (W = $.theme.components) == null ? void 0 : W[p]) == null ? void 0 : H.styleOverrides;
        if (!A)
          return null;
        const F = {};
        for (const te in A)
          F[te] = Bi($, A[te], $.theme.modularCssLayers ? "theme" : void 0);
        return m($, F);
      }), p && !S && L.push(function($) {
        var F, W;
        const P = $.theme, A = (W = (F = P == null ? void 0 : P.components) == null ? void 0 : F[p]) == null ? void 0 : W.variants;
        return A ? _u($, A, [], $.theme.modularCssLayers ? "theme" : void 0) : null;
      }), R || L.push(bo), Array.isArray(D[0])) {
        const y = D.shift(), $ = new Array(M.length).fill(""), P = new Array(L.length).fill("");
        let A;
        A = [...$, ...y, ...P], A.raw = [...$, ...y.raw, ...P], M.unshift(A);
      }
      const B = [...M, ...D, ...L], I = E(...B);
      return c.muiName && (I.muiName = c.muiName), process.env.NODE_ENV !== "production" && (I.displayName = _g(p, f, c)), I;
    };
    return E.withConfig && (C.withConfig = E.withConfig), C;
  };
}
function _g(e, t, n) {
  return e ? `${e}${ye(t || "")}` : `Styled(${Ig(n)})`;
}
function Dg(e, t) {
  let n;
  return process.env.NODE_ENV !== "production" && e && (n = `${e}-${Lu(t || "Root")}`), n;
}
function Lg(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function Lu(e) {
  return e && e.charAt(0).toLowerCase() + e.slice(1);
}
const Fu = Du();
function Br(e, t, n = !1) {
  const r = {
    ...t
  };
  for (const i in e)
    if (Object.prototype.hasOwnProperty.call(e, i)) {
      const s = i;
      if (s === "components" || s === "slots")
        r[s] = {
          ...e[s],
          ...r[s]
        };
      else if (s === "componentsProps" || s === "slotProps") {
        const a = e[s], c = t[s];
        if (!c)
          r[s] = a || {};
        else if (!a)
          r[s] = c;
        else {
          r[s] = {
            ...c
          };
          for (const u in a)
            if (Object.prototype.hasOwnProperty.call(a, u)) {
              const p = u;
              r[s][p] = Br(a[p], c[p], n);
            }
        }
      } else s === "className" && n && t.className !== void 0 ? r.className = le(e == null ? void 0 : e.className, t == null ? void 0 : t.className) : s === "style" && n && t.style ? r.style = {
        ...e == null ? void 0 : e.style,
        ...t == null ? void 0 : t.style
      } : r[s] === void 0 && (r[s] = e[s]);
    }
  return r;
}
function Fg(e) {
  const {
    theme: t,
    name: n,
    props: r
  } = e;
  return !t || !t.components || !t.components[n] || !t.components[n].defaultProps ? r : Br(t.components[n].defaultProps, r);
}
function ju({
  props: e,
  name: t,
  defaultTheme: n,
  themeId: r
}) {
  let i = Es(n);
  return r && (i = i[r] || i), Fg({
    theme: i,
    name: t,
    props: e
  });
}
const Tt = typeof window < "u" ? v.useLayoutEffect : v.useEffect;
function jg(e, t = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, n));
}
function ol(e, t = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > n) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`), jg(e, t, n);
}
function Bg(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let n = e.match(t);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), process.env.NODE_ENV !== "production" && e.length !== e.trim().length && console.error(`MUI: The color: "${e}" is invalid. Make sure the color input doesn't contain leading/trailing space.`), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, i) => i < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Qn(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Qn(Bg(e));
  const t = e.indexOf("("), n = e.substring(0, t);
  if (!["rgb", "rgba", "hsl", "hsla", "color"].includes(n))
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : Wn(9, e));
  let r = e.substring(t + 1, e.length - 1), i;
  if (n === "color") {
    if (r = r.split(" "), i = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), !["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].includes(i))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${i}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : Wn(10, i));
  } else
    r = r.split(",");
  return r = r.map((s) => parseFloat(s)), {
    type: n,
    values: r,
    colorSpace: i
  };
}
const Wg = (e) => {
  const t = Qn(e);
  return t.values.slice(0, 3).map((n, r) => t.type.includes("hsl") && r !== 0 ? `${n}%` : n).join(" ");
}, Or = (e, t) => {
  try {
    return Wg(e);
  } catch {
    return t && process.env.NODE_ENV !== "production" && console.warn(t), e;
  }
};
function Os(e) {
  const {
    type: t,
    colorSpace: n
  } = e;
  let {
    values: r
  } = e;
  return t.includes("rgb") ? r = r.map((i, s) => s < 3 ? parseInt(i, 10) : i) : t.includes("hsl") && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), t.includes("color") ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${t}(${r})`;
}
function Bu(e) {
  e = Qn(e);
  const {
    values: t
  } = e, n = t[0], r = t[1] / 100, i = t[2] / 100, s = r * Math.min(i, 1 - i), a = (p, f = (p + n / 30) % 12) => i - s * Math.max(Math.min(f - 3, 9 - f, 1), -1);
  let c = "rgb";
  const u = [Math.round(a(0) * 255), Math.round(a(8) * 255), Math.round(a(4) * 255)];
  return e.type === "hsla" && (c += "a", u.push(t[3])), Os({
    type: c,
    values: u
  });
}
function Ca(e) {
  e = Qn(e);
  let t = e.type === "hsl" || e.type === "hsla" ? Qn(Bu(e)).values : e.values;
  return t = t.map((n) => (e.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function Bc(e, t) {
  const n = Ca(e), r = Ca(t);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function qi(e, t) {
  return e = Qn(e), t = ol(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, Os(e);
}
function ao(e, t, n) {
  try {
    return qi(e, t);
  } catch {
    return n && process.env.NODE_ENV !== "production" && console.warn(n), e;
  }
}
function Rs(e, t) {
  if (e = Qn(e), t = ol(t), e.type.includes("hsl"))
    e.values[2] *= 1 - t;
  else if (e.type.includes("rgb") || e.type.includes("color"))
    for (let n = 0; n < 3; n += 1)
      e.values[n] *= 1 - t;
  return Os(e);
}
function Xe(e, t, n) {
  try {
    return Rs(e, t);
  } catch {
    return n && process.env.NODE_ENV !== "production" && console.warn(n), e;
  }
}
function Ns(e, t) {
  if (e = Qn(e), t = ol(t), e.type.includes("hsl"))
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.includes("rgb"))
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (255 - e.values[n]) * t;
  else if (e.type.includes("color"))
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (1 - e.values[n]) * t;
  return Os(e);
}
function Je(e, t, n) {
  try {
    return Ns(e, t);
  } catch {
    return n && process.env.NODE_ENV !== "production" && console.warn(n), e;
  }
}
function zg(e, t = 0.15) {
  return Ca(e) > 0.5 ? Rs(e, t) : Ns(e, t);
}
function yi(e, t, n) {
  try {
    return zg(e, t);
  } catch {
    return e;
  }
}
const Vg = "exact-prop: ​";
function ks(e) {
  return process.env.NODE_ENV === "production" ? e : {
    ...e,
    [Vg]: (t) => {
      const n = Object.keys(t).filter((r) => !e.hasOwnProperty(r));
      return n.length > 0 ? new Error(`The following props are not supported: ${n.map((r) => `\`${r}\``).join(", ")}. Please remove them.`) : null;
    }
  };
}
const rl = /* @__PURE__ */ v.createContext(null);
process.env.NODE_ENV !== "production" && (rl.displayName = "ThemeContext");
function il() {
  const e = v.useContext(rl);
  return process.env.NODE_ENV !== "production" && v.useDebugValue(e), e;
}
const Ug = typeof Symbol == "function" && Symbol.for, Gg = Ug ? Symbol.for("mui.nested") : "__THEME_NESTED__";
function Hg(e, t) {
  if (typeof t == "function") {
    const n = t(e);
    return process.env.NODE_ENV !== "production" && (n || console.error(["MUI: You should return an object from your theme function, i.e.", "<ThemeProvider theme={() => ({})} />"].join(`
`))), n;
  }
  return {
    ...e,
    ...t
  };
}
function Ki(e) {
  const {
    children: t,
    theme: n
  } = e, r = il();
  process.env.NODE_ENV !== "production" && r === null && typeof n == "function" && console.error(["MUI: You are providing a theme function prop to the ThemeProvider component:", "<ThemeProvider theme={outerTheme => outerTheme} />", "", "However, no outer theme is present.", "Make sure a theme is already injected higher in the React tree or provide a theme object."].join(`
`));
  const i = v.useMemo(() => {
    const s = r === null ? {
      ...n
    } : Hg(r, n);
    return s != null && (s[Gg] = r !== null), s;
  }, [n, r]);
  return /* @__PURE__ */ l(rl.Provider, {
    value: i,
    children: t
  });
}
process.env.NODE_ENV !== "production" && (Ki.propTypes = {
  /**
   * Your component tree.
   */
  children: o.node,
  /**
   * A theme object. You can provide a function to extend the outer theme.
   */
  theme: o.oneOfType([o.object, o.func]).isRequired
});
process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "production" && (Ki.propTypes = ks(Ki.propTypes));
const Wu = /* @__PURE__ */ v.createContext();
function zu({
  value: e,
  ...t
}) {
  return /* @__PURE__ */ l(Wu.Provider, {
    value: e ?? !0,
    ...t
  });
}
process.env.NODE_ENV !== "production" && (zu.propTypes = {
  children: o.node,
  value: o.bool
});
const Vu = () => v.useContext(Wu) ?? !1, Uu = /* @__PURE__ */ v.createContext(void 0);
function Gu({
  value: e,
  children: t
}) {
  return /* @__PURE__ */ l(Uu.Provider, {
    value: e,
    children: t
  });
}
process.env.NODE_ENV !== "production" && (Gu.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: o.node,
  /**
   * @ignore
   */
  value: o.object
});
function qg(e) {
  const {
    theme: t,
    name: n,
    props: r
  } = e;
  if (!t || !t.components || !t.components[n])
    return r;
  const i = t.components[n];
  return i.defaultProps ? Br(i.defaultProps, r, t.components.mergeClassNameAndStyle) : !i.styleOverrides && !i.variants ? Br(i, r, t.components.mergeClassNameAndStyle) : r;
}
function Kg({
  props: e,
  name: t
}) {
  const n = v.useContext(Uu);
  return qg({
    props: e,
    name: t,
    theme: {
      components: n
    }
  });
}
let Wc = 0;
function Yg(e) {
  const [t, n] = v.useState(e), r = e || t;
  return v.useEffect(() => {
    t == null && (Wc += 1, n(`mui-${Wc}`));
  }, [t]), r;
}
const Xg = {
  ...v
}, zc = Xg.useId;
function zn(e) {
  if (zc !== void 0) {
    const t = zc();
    return e ?? t;
  }
  return Yg(e);
}
function Jg(e) {
  const t = tl(), n = zn() || "", {
    modularCssLayers: r
  } = e;
  let i = "mui.global, mui.components, mui.theme, mui.custom, mui.sx";
  return !r || t !== null ? i = "" : typeof r == "string" ? i = r.replace(/mui(?!\.)/g, i) : i = `@layer ${i};`, Tt(() => {
    var c, u;
    const s = document.querySelector("head");
    if (!s)
      return;
    const a = s.firstChild;
    if (i) {
      if (a && ((c = a.hasAttribute) != null && c.call(a, "data-mui-layer-order")) && a.getAttribute("data-mui-layer-order") === n)
        return;
      const p = document.createElement("style");
      p.setAttribute("data-mui-layer-order", n), p.textContent = i, s.prepend(p);
    } else
      (u = s.querySelector(`style[data-mui-layer-order="${n}"]`)) == null || u.remove();
  }, [i, n]), i ? /* @__PURE__ */ l(nl, {
    styles: i
  }) : null;
}
const Vc = {};
function Uc(e, t, n, r = !1) {
  return v.useMemo(() => {
    const i = e && t[e] || t;
    if (typeof n == "function") {
      const s = n(i), a = e ? {
        ...t,
        [e]: s
      } : s;
      return r ? () => a : a;
    }
    return e ? {
      ...t,
      [e]: n
    } : {
      ...t,
      ...n
    };
  }, [e, t, n, r]);
}
function Wr(e) {
  const {
    children: t,
    theme: n,
    themeId: r
  } = e, i = tl(Vc), s = il() || Vc;
  process.env.NODE_ENV !== "production" && (i === null && typeof n == "function" || r && i && !i[r] && typeof n == "function") && console.error(["MUI: You are providing a theme function prop to the ThemeProvider component:", "<ThemeProvider theme={outerTheme => outerTheme} />", "", "However, no outer theme is present.", "Make sure a theme is already injected higher in the React tree or provide a theme object."].join(`
`));
  const a = Uc(r, i, n), c = Uc(r, s, n, !0), u = (r ? a[r] : a).direction === "rtl", p = Jg(a);
  return /* @__PURE__ */ l(Ki, {
    theme: c,
    children: /* @__PURE__ */ l(Xr.Provider, {
      value: a,
      children: /* @__PURE__ */ l(zu, {
        value: u,
        children: /* @__PURE__ */ T(Gu, {
          value: r ? a[r].components : a.components,
          children: [p, t]
        })
      })
    })
  });
}
process.env.NODE_ENV !== "production" && (Wr.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Your component tree.
   */
  children: o.node,
  /**
   * A theme object. You can provide a function to extend the outer theme.
   */
  theme: o.oneOfType([o.func, o.object]).isRequired,
  /**
   * The design system's unique id for getting the corresponded theme when there are multiple design systems.
   */
  themeId: o.string
});
process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "production" && (Wr.propTypes = ks(Wr.propTypes));
const Gc = {
  theme: void 0
};
function Qg(e) {
  let t, n;
  return function(i) {
    let s = t;
    return (s === void 0 || i.theme !== n) && (Gc.theme = i.theme, s = Mu(e(Gc)), t = s, n = i.theme), s;
  };
}
const sl = "mode", al = "color-scheme", Zg = "data-color-scheme";
function ey(e) {
  const {
    defaultMode: t = "system",
    defaultLightColorScheme: n = "light",
    defaultDarkColorScheme: r = "dark",
    modeStorageKey: i = sl,
    colorSchemeStorageKey: s = al,
    attribute: a = Zg,
    colorSchemeNode: c = "document.documentElement",
    nonce: u
  } = e || {};
  let p = "", f = a;
  if (a === "class" && (f = ".%s"), a === "data" && (f = "[data-%s]"), f.startsWith(".")) {
    const b = f.substring(1);
    p += `${c}.classList.remove('${b}'.replace('%s', light), '${b}'.replace('%s', dark));
      ${c}.classList.add('${b}'.replace('%s', colorScheme));`;
  }
  const g = f.match(/\[([^[\]]+)\]/);
  if (g) {
    const [b, m] = g[1].split("=");
    m || (p += `${c}.removeAttribute('${b}'.replace('%s', light));
      ${c}.removeAttribute('${b}'.replace('%s', dark));`), p += `
      ${c}.setAttribute('${b}'.replace('%s', colorScheme), ${m ? `${m}.replace('%s', colorScheme)` : '""'});`;
  } else f !== ".%s" && (p += `${c}.setAttribute('${f}', colorScheme);`);
  return /* @__PURE__ */ l("script", {
    suppressHydrationWarning: !0,
    nonce: typeof window > "u" ? u : "",
    dangerouslySetInnerHTML: {
      __html: `(function() {
try {
  let colorScheme = '';
  const mode = localStorage.getItem('${i}') || '${t}';
  const dark = localStorage.getItem('${s}-dark') || '${r}';
  const light = localStorage.getItem('${s}-light') || '${n}';
  if (mode === 'system') {
    // handle system mode
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    if (mql.matches) {
      colorScheme = dark
    } else {
      colorScheme = light
    }
  }
  if (mode === 'light') {
    colorScheme = light;
  }
  if (mode === 'dark') {
    colorScheme = dark;
  }
  if (colorScheme) {
    ${p}
  }
} catch(e){}})();`
    }
  }, "mui-color-scheme-init");
}
function ty() {
}
const ny = ({
  key: e,
  storageWindow: t
}) => (!t && typeof window < "u" && (t = window), {
  get(n) {
    if (typeof window > "u")
      return;
    if (!t)
      return n;
    let r;
    try {
      r = t.localStorage.getItem(e);
    } catch {
    }
    return r || n;
  },
  set: (n) => {
    if (t)
      try {
        t.localStorage.setItem(e, n);
      } catch {
      }
  },
  subscribe: (n) => {
    if (!t)
      return ty;
    const r = (i) => {
      const s = i.newValue;
      i.key === e && n(s);
    };
    return t.addEventListener("storage", r), () => {
      t.removeEventListener("storage", r);
    };
  }
});
function ra() {
}
function Hc(e) {
  if (typeof window < "u" && typeof window.matchMedia == "function" && e === "system")
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function Hu(e, t) {
  if (e.mode === "light" || e.mode === "system" && e.systemMode === "light")
    return t("light");
  if (e.mode === "dark" || e.mode === "system" && e.systemMode === "dark")
    return t("dark");
}
function oy(e) {
  return Hu(e, (t) => {
    if (t === "light")
      return e.lightColorScheme;
    if (t === "dark")
      return e.darkColorScheme;
  });
}
function ry(e) {
  const {
    defaultMode: t = "light",
    defaultLightColorScheme: n,
    defaultDarkColorScheme: r,
    supportedColorSchemes: i = [],
    modeStorageKey: s = sl,
    colorSchemeStorageKey: a = al,
    storageWindow: c = typeof window > "u" ? void 0 : window,
    storageManager: u = ny,
    noSsr: p = !1
  } = e, f = i.join(","), g = i.length > 1, b = v.useMemo(() => u == null ? void 0 : u({
    key: s,
    storageWindow: c
  }), [u, s, c]), m = v.useMemo(() => u == null ? void 0 : u({
    key: `${a}-light`,
    storageWindow: c
  }), [u, a, c]), x = v.useMemo(() => u == null ? void 0 : u({
    key: `${a}-dark`,
    storageWindow: c
  }), [u, a, c]), [h, S] = v.useState(() => {
    const D = (b == null ? void 0 : b.get(t)) || t, L = (m == null ? void 0 : m.get(n)) || n, B = (x == null ? void 0 : x.get(r)) || r;
    return {
      mode: D,
      systemMode: Hc(D),
      lightColorScheme: L,
      darkColorScheme: B
    };
  }), [R, k] = v.useState(p || !g);
  v.useEffect(() => {
    k(!0);
  }, []);
  const E = oy(h), w = v.useCallback((D) => {
    S((L) => {
      if (D === L.mode)
        return L;
      const B = D ?? t;
      return b == null || b.set(B), {
        ...L,
        mode: B,
        systemMode: Hc(B)
      };
    });
  }, [b, t]), C = v.useCallback((D) => {
    D ? typeof D == "string" ? D && !f.includes(D) ? console.error(`\`${D}\` does not exist in \`theme.colorSchemes\`.`) : S((L) => {
      const B = {
        ...L
      };
      return Hu(L, (I) => {
        I === "light" && (m == null || m.set(D), B.lightColorScheme = D), I === "dark" && (x == null || x.set(D), B.darkColorScheme = D);
      }), B;
    }) : S((L) => {
      const B = {
        ...L
      }, I = D.light === null ? n : D.light, y = D.dark === null ? r : D.dark;
      return I && (f.includes(I) ? (B.lightColorScheme = I, m == null || m.set(I)) : console.error(`\`${I}\` does not exist in \`theme.colorSchemes\`.`)), y && (f.includes(y) ? (B.darkColorScheme = y, x == null || x.set(y)) : console.error(`\`${y}\` does not exist in \`theme.colorSchemes\`.`)), B;
    }) : S((L) => (m == null || m.set(n), x == null || x.set(r), {
      ...L,
      lightColorScheme: n,
      darkColorScheme: r
    }));
  }, [f, m, x, n, r]), N = v.useCallback((D) => {
    h.mode === "system" && S((L) => {
      const B = D != null && D.matches ? "dark" : "light";
      return L.systemMode === B ? L : {
        ...L,
        systemMode: B
      };
    });
  }, [h.mode]), M = v.useRef(N);
  return M.current = N, v.useEffect(() => {
    if (typeof window.matchMedia != "function" || !g)
      return;
    const D = (...B) => M.current(...B), L = window.matchMedia("(prefers-color-scheme: dark)");
    return L.addListener(D), D(L), () => {
      L.removeListener(D);
    };
  }, [g]), v.useEffect(() => {
    if (g) {
      const D = (b == null ? void 0 : b.subscribe((I) => {
        (!I || ["light", "dark", "system"].includes(I)) && w(I || t);
      })) || ra, L = (m == null ? void 0 : m.subscribe((I) => {
        (!I || f.match(I)) && C({
          light: I
        });
      })) || ra, B = (x == null ? void 0 : x.subscribe((I) => {
        (!I || f.match(I)) && C({
          dark: I
        });
      })) || ra;
      return () => {
        D(), L(), B();
      };
    }
  }, [C, w, f, t, c, g, b, m, x]), {
    ...h,
    mode: R ? h.mode : void 0,
    systemMode: R ? h.systemMode : void 0,
    colorScheme: R ? E : void 0,
    setMode: w,
    setColorScheme: C
  };
}
const iy = "*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";
function sy(e) {
  const {
    themeId: t,
    /**
     * This `theme` object needs to follow a certain structure to
     * be used correctly by the finel `CssVarsProvider`. It should have a
     * `colorSchemes` key with the light and dark (and any other) palette.
     * It should also ideally have a vars object created using `prepareCssVars`.
     */
    theme: n = {},
    modeStorageKey: r = sl,
    colorSchemeStorageKey: i = al,
    disableTransitionOnChange: s = !1,
    defaultColorScheme: a,
    resolveTheme: c
  } = e, u = {
    allColorSchemes: [],
    colorScheme: void 0,
    darkColorScheme: void 0,
    lightColorScheme: void 0,
    mode: void 0,
    setColorScheme: () => {
    },
    setMode: () => {
    },
    systemMode: void 0
  }, p = /* @__PURE__ */ v.createContext(void 0);
  process.env.NODE_ENV !== "production" && (p.displayName = "ColorSchemeContext");
  const f = () => v.useContext(p) || u, g = {}, b = {};
  function m(R) {
    var ot, _e, $e, rt;
    const {
      children: k,
      theme: E,
      modeStorageKey: w = r,
      colorSchemeStorageKey: C = i,
      disableTransitionOnChange: N = s,
      storageManager: M,
      storageWindow: D = typeof window > "u" ? void 0 : window,
      documentNode: L = typeof document > "u" ? void 0 : document,
      colorSchemeNode: B = typeof document > "u" ? void 0 : document.documentElement,
      disableNestedContext: I = !1,
      disableStyleSheetGeneration: y = !1,
      defaultMode: $ = "system",
      forceThemeRerender: P = !1,
      noSsr: A
    } = R, F = v.useRef(!1), W = il(), H = v.useContext(p), te = !!H && !I, z = v.useMemo(() => E || (typeof n == "function" ? n() : n), [E]), V = z[t], X = V || z, {
      colorSchemes: re = g,
      components: oe = b,
      cssVarPrefix: ne
    } = X, Q = Object.keys(re).filter((ue) => !!re[ue]).join(","), Z = v.useMemo(() => Q.split(","), [Q]), U = typeof a == "string" ? a : a.light, J = typeof a == "string" ? a : a.dark, q = re[U] && re[J] ? $ : ((_e = (ot = re[X.defaultColorScheme]) == null ? void 0 : ot.palette) == null ? void 0 : _e.mode) || (($e = X.palette) == null ? void 0 : $e.mode), {
      mode: ce,
      setMode: j,
      systemMode: de,
      lightColorScheme: Y,
      darkColorScheme: he,
      colorScheme: Le,
      setColorScheme: Re
    } = ry({
      supportedColorSchemes: Z,
      defaultLightColorScheme: U,
      defaultDarkColorScheme: J,
      modeStorageKey: w,
      colorSchemeStorageKey: C,
      defaultMode: q,
      storageManager: M,
      storageWindow: D,
      noSsr: A
    });
    let Ke = ce, Se = Le;
    te && (Ke = H.mode, Se = H.colorScheme), process.env.NODE_ENV !== "production" && P && !X.vars && console.warn(["MUI: The `forceThemeRerender` prop should only be used with CSS theme variables.", "Note that it will slow down the app when changing between modes, so only do this when you cannot find a better solution."].join(`
`));
    let Pe = Se || X.defaultColorScheme;
    X.vars && !P && (Pe = X.defaultColorScheme);
    const Ye = v.useMemo(() => {
      var lt;
      const ue = ((lt = X.generateThemeVars) == null ? void 0 : lt.call(X)) || X.vars, Te = {
        ...X,
        components: oe,
        colorSchemes: re,
        cssVarPrefix: ne,
        vars: ue
      };
      if (typeof Te.generateSpacing == "function" && (Te.spacing = Te.generateSpacing()), Pe) {
        const st = re[Pe];
        st && typeof st == "object" && Object.keys(st).forEach((Ee) => {
          st[Ee] && typeof st[Ee] == "object" ? Te[Ee] = {
            ...Te[Ee],
            ...st[Ee]
          } : Te[Ee] = st[Ee];
        });
      }
      return c ? c(Te) : Te;
    }, [X, Pe, oe, re, ne]), it = X.colorSchemeSelector;
    Tt(() => {
      if (Se && B && it && it !== "media") {
        const ue = it;
        let Te = it;
        if (ue === "class" && (Te = ".%s"), ue === "data" && (Te = "[data-%s]"), ue != null && ue.startsWith("data-") && !ue.includes("%s") && (Te = `[${ue}="%s"]`), Te.startsWith("."))
          B.classList.remove(...Z.map((lt) => Te.substring(1).replace("%s", lt))), B.classList.add(Te.substring(1).replace("%s", Se));
        else {
          const lt = Te.replace("%s", Se).match(/\[([^\]]+)\]/);
          if (lt) {
            const [st, Ee] = lt[1].split("=");
            Ee || Z.forEach((Pn) => {
              B.removeAttribute(st.replace(Se, Pn));
            }), B.setAttribute(st, Ee ? Ee.replace(/"|'/g, "") : "");
          } else
            B.setAttribute(Te, Se);
        }
      }
    }, [Se, it, B, Z]), v.useEffect(() => {
      let ue;
      if (N && F.current && L) {
        const Te = L.createElement("style");
        Te.appendChild(L.createTextNode(iy)), L.head.appendChild(Te), window.getComputedStyle(L.body), ue = setTimeout(() => {
          L.head.removeChild(Te);
        }, 1);
      }
      return () => {
        clearTimeout(ue);
      };
    }, [Se, N, L]), v.useEffect(() => (F.current = !0, () => {
      F.current = !1;
    }), []);
    const Fe = v.useMemo(() => ({
      allColorSchemes: Z,
      colorScheme: Se,
      darkColorScheme: he,
      lightColorScheme: Y,
      mode: Ke,
      setColorScheme: Re,
      setMode: process.env.NODE_ENV === "production" ? j : (ue) => {
        Ye.colorSchemeSelector === "media" && console.error(["MUI: The `setMode` function has no effect if `colorSchemeSelector` is `media` (`media` is the default value).", "To toggle the mode manually, please configure `colorSchemeSelector` to use a class or data attribute.", "To learn more, visit https://mui.com/material-ui/customization/css-theme-variables/configuration/#toggling-dark-mode-manually"].join(`
`)), j(ue);
      },
      systemMode: de
    }), [Z, Se, he, Y, Ke, Re, j, de, Ye.colorSchemeSelector]);
    let Ae = !0;
    (y || X.cssVariables === !1 || te && (W == null ? void 0 : W.cssVarPrefix) === ne) && (Ae = !1);
    const Me = /* @__PURE__ */ T(v.Fragment, {
      children: [/* @__PURE__ */ l(Wr, {
        themeId: V ? t : void 0,
        theme: Ye,
        children: k
      }), Ae && /* @__PURE__ */ l(Za, {
        styles: ((rt = Ye.generateStyleSheets) == null ? void 0 : rt.call(Ye)) || []
      })]
    });
    return te ? Me : /* @__PURE__ */ l(p.Provider, {
      value: Fe,
      children: Me
    });
  }
  process.env.NODE_ENV !== "production" && (m.propTypes = {
    /**
     * The component tree.
     */
    children: o.node,
    /**
     * The node used to attach the color-scheme attribute
     */
    colorSchemeNode: o.any,
    /**
     * localStorage key used to store `colorScheme`
     */
    colorSchemeStorageKey: o.string,
    /**
     * The default mode when the storage is empty,
     * require the theme to have `colorSchemes` with light and dark.
     */
    defaultMode: o.string,
    /**
     * If `true`, the provider creates its own context and generate stylesheet as if it is a root `CssVarsProvider`.
     */
    disableNestedContext: o.bool,
    /**
     * If `true`, the style sheet won't be generated.
     *
     * This is useful for controlling nested CssVarsProvider behavior.
     */
    disableStyleSheetGeneration: o.bool,
    /**
     * Disable CSS transitions when switching between modes or color schemes.
     */
    disableTransitionOnChange: o.bool,
    /**
     * The document to attach the attribute to.
     */
    documentNode: o.any,
    /**
     * If `true`, theme values are recalculated when the mode changes.
     */
    forceThemeRerender: o.bool,
    /**
     * The key in the local storage used to store current color scheme.
     */
    modeStorageKey: o.string,
    /**
     * If `true`, the mode will be the same value as the storage without an extra rerendering after the hydration.
     * You should use this option in conjunction with `InitColorSchemeScript` component.
     */
    noSsr: o.bool,
    /**
     * The storage manager to be used for storing the mode and color scheme
     * @default using `window.localStorage`
     */
    storageManager: o.func,
    /**
     * The window that attaches the 'storage' event listener.
     * @default window
     */
    storageWindow: o.any,
    /**
     * The calculated theme object that will be passed through context.
     */
    theme: o.object
  });
  const x = typeof a == "string" ? a : a.light, h = typeof a == "string" ? a : a.dark;
  return {
    CssVarsProvider: m,
    useColorScheme: f,
    getInitColorSchemeScript: (R) => ey({
      colorSchemeStorageKey: i,
      defaultLightColorScheme: x,
      defaultDarkColorScheme: h,
      modeStorageKey: r,
      ...R
    })
  };
}
function ay(e = "") {
  function t(...r) {
    if (!r.length)
      return "";
    const i = r[0];
    return typeof i == "string" && !i.match(/(#|\(|\)|(-?(\d*\.)?\d+)(px|em|%|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc))|^(-?(\d*\.)?\d+)$|(\d+ \d+ \d+)/) ? `, var(--${e ? `${e}-` : ""}${i}${t(...r.slice(1))})` : `, ${i}`;
  }
  return (r, ...i) => `var(--${e ? `${e}-` : ""}${r}${t(...i)})`;
}
const qc = (e, t, n, r = []) => {
  let i = e;
  t.forEach((s, a) => {
    a === t.length - 1 ? Array.isArray(i) ? i[Number(s)] = n : i && typeof i == "object" && (i[s] = n) : i && typeof i == "object" && (i[s] || (i[s] = r.includes(s) ? [] : {}), i = i[s]);
  });
}, ly = (e, t, n) => {
  function r(i, s = [], a = []) {
    Object.entries(i).forEach(([c, u]) => {
      (!n || n && !n([...s, c])) && u != null && (typeof u == "object" && Object.keys(u).length > 0 ? r(u, [...s, c], Array.isArray(u) ? [...a, c] : a) : t([...s, c], u, a));
    });
  }
  r(e);
}, cy = (e, t) => typeof t == "number" ? ["lineHeight", "fontWeight", "opacity", "zIndex"].some((r) => e.includes(r)) || e[e.length - 1].toLowerCase().includes("opacity") ? t : `${t}px` : t;
function ia(e, t) {
  const {
    prefix: n,
    shouldSkipGeneratingVar: r
  } = t || {}, i = {}, s = {}, a = {};
  return ly(
    e,
    (c, u, p) => {
      if ((typeof u == "string" || typeof u == "number") && (!r || !r(c, u))) {
        const f = `--${n ? `${n}-` : ""}${c.join("-")}`, g = cy(c, u);
        Object.assign(i, {
          [f]: g
        }), qc(s, c, `var(${f})`, p), qc(a, c, `var(${f}, ${g})`, p);
      }
    },
    (c) => c[0] === "vars"
    // skip 'vars/*' paths
  ), {
    css: i,
    vars: s,
    varsWithDefaults: a
  };
}
function dy(e, t = {}) {
  const {
    getSelector: n = R,
    disableCssColorScheme: r,
    colorSchemeSelector: i,
    enableContrastVars: s
  } = t, {
    colorSchemes: a = {},
    components: c,
    defaultColorScheme: u = "light",
    ...p
  } = e, {
    vars: f,
    css: g,
    varsWithDefaults: b
  } = ia(p, t);
  let m = b;
  const x = {}, {
    [u]: h,
    ...S
  } = a;
  if (Object.entries(S || {}).forEach(([w, C]) => {
    const {
      vars: N,
      css: M,
      varsWithDefaults: D
    } = ia(C, t);
    m = kt(m, D), x[w] = {
      css: M,
      vars: N
    };
  }), h) {
    const {
      css: w,
      vars: C,
      varsWithDefaults: N
    } = ia(h, t);
    m = kt(m, N), x[u] = {
      css: w,
      vars: C
    };
  }
  function R(w, C) {
    var M, D;
    let N = i;
    if (i === "class" && (N = ".%s"), i === "data" && (N = "[data-%s]"), i != null && i.startsWith("data-") && !i.includes("%s") && (N = `[${i}="%s"]`), w) {
      if (N === "media")
        return e.defaultColorScheme === w ? ":root" : {
          [`@media (prefers-color-scheme: ${((D = (M = a[w]) == null ? void 0 : M.palette) == null ? void 0 : D.mode) || w})`]: {
            ":root": C
          }
        };
      if (N)
        return e.defaultColorScheme === w ? `:root, ${N.replace("%s", String(w))}` : N.replace("%s", String(w));
    }
    return ":root";
  }
  return {
    vars: m,
    generateThemeVars: () => {
      let w = {
        ...f
      };
      return Object.entries(x).forEach(([, {
        vars: C
      }]) => {
        w = kt(w, C);
      }), w;
    },
    generateStyleSheets: () => {
      var L, B;
      const w = [], C = e.defaultColorScheme || "light";
      function N(I, y) {
        Object.keys(y).length && w.push(typeof I == "string" ? {
          [I]: {
            ...y
          }
        } : I);
      }
      N(n(void 0, {
        ...g
      }), g);
      const {
        [C]: M,
        ...D
      } = x;
      if (M) {
        const {
          css: I
        } = M, y = (B = (L = a[C]) == null ? void 0 : L.palette) == null ? void 0 : B.mode, $ = !r && y ? {
          colorScheme: y,
          ...I
        } : {
          ...I
        };
        N(n(C, {
          ...$
        }), $);
      }
      return Object.entries(D).forEach(([I, {
        css: y
      }]) => {
        var A, F;
        const $ = (F = (A = a[I]) == null ? void 0 : A.palette) == null ? void 0 : F.mode, P = !r && $ ? {
          colorScheme: $,
          ...y
        } : {
          ...y
        };
        N(n(I, {
          ...P
        }), P);
      }), s && w.push({
        ":root": {
          // use double underscore to indicate that these are private variables
          "--__l-threshold": "0.7",
          "--__l": "clamp(0, (l / var(--__l-threshold) - 1) * -infinity, 1)",
          "--__a": "clamp(0.87, (l / var(--__l-threshold) - 1) * -infinity, 1)"
          // 0.87 is the default alpha value for black text.
        }
      }), w;
    }
  };
}
function uy(e) {
  return function(n) {
    return e === "media" ? (process.env.NODE_ENV !== "production" && n !== "light" && n !== "dark" && console.error(`MUI: @media (prefers-color-scheme) supports only 'light' or 'dark', but receive '${n}'.`), `@media (prefers-color-scheme: ${n})`) : e ? e.startsWith("data-") && !e.includes("%s") ? `[${e}="${n}"] &` : e === "class" ? `.${n} &` : e === "data" ? `[data-${n}] &` : `${e.replace("%s", n)} &` : "&";
  };
}
function Ce(e, t, n = void 0) {
  const r = {};
  for (const i in e) {
    const s = e[i];
    let a = "", c = !0;
    for (let u = 0; u < s.length; u += 1) {
      const p = s[u];
      p && (a += (c === !0 ? "" : " ") + t(p), c = !1, n && n[p] && (a += " " + n[p]));
    }
    r[i] = a;
  }
  return r;
}
const py = Zr(), fy = Fu("div", {
  name: "MuiContainer",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, t[`maxWidth${ye(String(n.maxWidth))}`], n.fixed && t.fixed, n.disableGutters && t.disableGutters];
  }
}), my = (e) => ju({
  props: e,
  name: "MuiContainer",
  defaultTheme: py
}), hy = (e, t) => {
  const n = (u) => be(t, u), {
    classes: r,
    fixed: i,
    disableGutters: s,
    maxWidth: a
  } = e, c = {
    root: ["root", a && `maxWidth${ye(String(a))}`, i && "fixed", s && "disableGutters"]
  };
  return Ce(c, n, r);
};
function gy(e = {}) {
  const {
    // This will allow adding custom styled fn (for example for custom sx style function)
    createStyledComponent: t = fy,
    useThemeProps: n = my,
    componentName: r = "MuiContainer"
  } = e, i = t(({
    theme: a,
    ownerState: c
  }) => ({
    width: "100%",
    marginLeft: "auto",
    boxSizing: "border-box",
    marginRight: "auto",
    ...!c.disableGutters && {
      paddingLeft: a.spacing(2),
      paddingRight: a.spacing(2),
      // @ts-ignore module augmentation fails if custom breakpoints are used
      [a.breakpoints.up("sm")]: {
        paddingLeft: a.spacing(3),
        paddingRight: a.spacing(3)
      }
    }
  }), ({
    theme: a,
    ownerState: c
  }) => c.fixed && Object.keys(a.breakpoints.values).reduce((u, p) => {
    const f = p, g = a.breakpoints.values[f];
    return g !== 0 && (u[a.breakpoints.up(f)] = {
      maxWidth: `${g}${a.breakpoints.unit}`
    }), u;
  }, {}), ({
    theme: a,
    ownerState: c
  }) => ({
    // @ts-ignore module augmentation fails if custom breakpoints are used
    ...c.maxWidth === "xs" && {
      // @ts-ignore module augmentation fails if custom breakpoints are used
      [a.breakpoints.up("xs")]: {
        // @ts-ignore module augmentation fails if custom breakpoints are used
        maxWidth: Math.max(a.breakpoints.values.xs, 444)
      }
    },
    ...c.maxWidth && // @ts-ignore module augmentation fails if custom breakpoints are used
    c.maxWidth !== "xs" && {
      // @ts-ignore module augmentation fails if custom breakpoints are used
      [a.breakpoints.up(c.maxWidth)]: {
        // @ts-ignore module augmentation fails if custom breakpoints are used
        maxWidth: `${a.breakpoints.values[c.maxWidth]}${a.breakpoints.unit}`
      }
    }
  })), s = /* @__PURE__ */ v.forwardRef(function(c, u) {
    const p = n(c), {
      className: f,
      component: g = "div",
      disableGutters: b = !1,
      fixed: m = !1,
      maxWidth: x = "lg",
      classes: h,
      ...S
    } = p, R = {
      ...p,
      component: g,
      disableGutters: b,
      fixed: m,
      maxWidth: x
    }, k = hy(R, r);
    return (
      // @ts-ignore theme is injected by the styled util
      /* @__PURE__ */ l(i, {
        as: g,
        ownerState: R,
        className: le(k.root, f),
        ref: u,
        ...S
      })
    );
  });
  return process.env.NODE_ENV !== "production" && (s.propTypes = {
    children: o.node,
    classes: o.object,
    className: o.string,
    component: o.elementType,
    disableGutters: o.bool,
    fixed: o.bool,
    maxWidth: o.oneOfType([o.oneOf(["xs", "sm", "md", "lg", "xl", !1]), o.string]),
    sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object])
  }), s;
}
function sa(e, t) {
  var n, r, i;
  return /* @__PURE__ */ v.isValidElement(e) && t.indexOf(
    // For server components `muiName` is available in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    e.type.muiName ?? ((i = (r = (n = e.type) == null ? void 0 : n._payload) == null ? void 0 : r.value) == null ? void 0 : i.muiName)
  ) !== -1;
}
const yy = Zr(), by = Fu("div", {
  name: "MuiStack",
  slot: "Root"
});
function vy(e) {
  return ju({
    props: e,
    name: "MuiStack",
    defaultTheme: yy
  });
}
function xy(e, t) {
  const n = v.Children.toArray(e).filter(Boolean);
  return n.reduce((r, i, s) => (r.push(i), s < n.length - 1 && r.push(/* @__PURE__ */ v.cloneElement(t, {
    key: `separator-${s}`
  })), r), []);
}
const Cy = (e) => ({
  row: "Left",
  "row-reverse": "Right",
  column: "Top",
  "column-reverse": "Bottom"
})[e], wy = ({
  ownerState: e,
  theme: t
}) => {
  let n = {
    display: "flex",
    flexDirection: "column",
    ...Jn({
      theme: t
    }, ta({
      values: e.direction,
      breakpoints: t.breakpoints.values
    }), (r) => ({
      flexDirection: r
    }))
  };
  if (e.spacing) {
    const r = bs(t), i = Object.keys(t.breakpoints.values).reduce((u, p) => ((typeof e.spacing == "object" && e.spacing[p] != null || typeof e.direction == "object" && e.direction[p] != null) && (u[p] = !0), u), {}), s = ta({
      values: e.direction,
      base: i
    }), a = ta({
      values: e.spacing,
      base: i
    });
    typeof s == "object" && Object.keys(s).forEach((u, p, f) => {
      if (!s[u]) {
        const b = p > 0 ? s[f[p - 1]] : "column";
        s[u] = b;
      }
    }), n = kt(n, Jn({
      theme: t
    }, a, (u, p) => e.useFlexGap ? {
      gap: yo(r, u)
    } : {
      // The useFlexGap={false} implement relies on each child to give up control of the margin.
      // We need to reset the margin to avoid double spacing.
      "& > :not(style):not(style)": {
        margin: 0
      },
      "& > :not(style) ~ :not(style)": {
        [`margin${Cy(p ? s[p] : e.direction)}`]: yo(r, u)
      }
    }));
  }
  return n = Wh(t.breakpoints, n), n;
};
function Sy(e = {}) {
  const {
    // This will allow adding custom styled fn (for example for custom sx style function)
    createStyledComponent: t = by,
    useThemeProps: n = vy,
    componentName: r = "MuiStack"
  } = e, i = () => Ce({
    root: ["root"]
  }, (u) => be(r, u), {}), s = t(wy), a = /* @__PURE__ */ v.forwardRef(function(u, p) {
    const f = n(u), {
      component: g = "div",
      direction: b = "column",
      spacing: m = 0,
      divider: x,
      children: h,
      className: S,
      useFlexGap: R = !1,
      ...k
    } = f, E = {
      direction: b,
      spacing: m,
      useFlexGap: R
    }, w = i();
    return /* @__PURE__ */ l(s, {
      as: g,
      ownerState: E,
      ref: p,
      className: le(w.root, S),
      ...k,
      children: x ? xy(h, x) : h
    });
  });
  return process.env.NODE_ENV !== "production" && (a.propTypes = {
    children: o.node,
    direction: o.oneOfType([o.oneOf(["column-reverse", "column", "row-reverse", "row"]), o.arrayOf(o.oneOf(["column-reverse", "column", "row-reverse", "row"])), o.object]),
    divider: o.node,
    spacing: o.oneOfType([o.arrayOf(o.oneOfType([o.number, o.string])), o.number, o.object, o.string]),
    sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object])
  }), a;
}
const On = "$$material", zr = {
  black: "#000",
  white: "#fff"
}, Ty = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#9e9e9e",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121",
  A100: "#f5f5f5",
  A200: "#eeeeee",
  A400: "#bdbdbd",
  A700: "#616161"
}, To = {
  50: "#f3e5f5",
  200: "#ce93d8",
  300: "#ba68c8",
  400: "#ab47bc",
  500: "#9c27b0",
  700: "#7b1fa2"
}, Eo = {
  300: "#e57373",
  400: "#ef5350",
  500: "#f44336",
  700: "#d32f2f",
  800: "#c62828"
}, gr = {
  300: "#ffb74d",
  400: "#ffa726",
  500: "#ff9800",
  700: "#f57c00",
  900: "#e65100"
}, Oo = {
  50: "#e3f2fd",
  200: "#90caf9",
  400: "#42a5f5",
  700: "#1976d2",
  800: "#1565c0"
}, Ro = {
  300: "#4fc3f7",
  400: "#29b6f6",
  500: "#03a9f4",
  700: "#0288d1",
  900: "#01579b"
}, No = {
  300: "#81c784",
  400: "#66bb6a",
  500: "#4caf50",
  700: "#388e3c",
  800: "#2e7d32",
  900: "#1b5e20"
};
function qu() {
  return {
    // The colors used to style the text.
    text: {
      // The most important text.
      primary: "rgba(0, 0, 0, 0.87)",
      // Secondary text.
      secondary: "rgba(0, 0, 0, 0.6)",
      // Disabled text have even lower visual prominence.
      disabled: "rgba(0, 0, 0, 0.38)"
    },
    // The color used to divide different elements.
    divider: "rgba(0, 0, 0, 0.12)",
    // The background colors used to style the surfaces.
    // Consistency between these values is important.
    background: {
      paper: zr.white,
      default: zr.white
    },
    // The colors used to style the action elements.
    action: {
      // The color of an active action like an icon button.
      active: "rgba(0, 0, 0, 0.54)",
      // The color of an hovered action.
      hover: "rgba(0, 0, 0, 0.04)",
      hoverOpacity: 0.04,
      // The color of a selected action.
      selected: "rgba(0, 0, 0, 0.08)",
      selectedOpacity: 0.08,
      // The color of a disabled action.
      disabled: "rgba(0, 0, 0, 0.26)",
      // The background color of a disabled action.
      disabledBackground: "rgba(0, 0, 0, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(0, 0, 0, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.12
    }
  };
}
const Ku = qu();
function Yu() {
  return {
    text: {
      primary: zr.white,
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
      icon: "rgba(255, 255, 255, 0.5)"
    },
    divider: "rgba(255, 255, 255, 0.12)",
    background: {
      paper: "#121212",
      default: "#121212"
    },
    action: {
      active: zr.white,
      hover: "rgba(255, 255, 255, 0.08)",
      hoverOpacity: 0.08,
      selected: "rgba(255, 255, 255, 0.16)",
      selectedOpacity: 0.16,
      disabled: "rgba(255, 255, 255, 0.3)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(255, 255, 255, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.24
    }
  };
}
const wa = Yu();
function Kc(e, t, n, r) {
  const i = r.light || r, s = r.dark || r * 1.5;
  e[t] || (e.hasOwnProperty(n) ? e[t] = e[n] : t === "light" ? e.light = Ns(e.main, i) : t === "dark" && (e.dark = Rs(e.main, s)));
}
function Yc(e, t, n, r, i) {
  const s = i.light || i, a = i.dark || i * 1.5;
  t[n] || (t.hasOwnProperty(r) ? t[n] = t[r] : n === "light" ? t.light = `color-mix(in ${e}, ${t.main}, #fff ${(s * 100).toFixed(0)}%)` : n === "dark" && (t.dark = `color-mix(in ${e}, ${t.main}, #000 ${(a * 100).toFixed(0)}%)`));
}
function Ey(e = "light") {
  return e === "dark" ? {
    main: Oo[200],
    light: Oo[50],
    dark: Oo[400]
  } : {
    main: Oo[700],
    light: Oo[400],
    dark: Oo[800]
  };
}
function Oy(e = "light") {
  return e === "dark" ? {
    main: To[200],
    light: To[50],
    dark: To[400]
  } : {
    main: To[500],
    light: To[300],
    dark: To[700]
  };
}
function Ry(e = "light") {
  return e === "dark" ? {
    main: Eo[500],
    light: Eo[300],
    dark: Eo[700]
  } : {
    main: Eo[700],
    light: Eo[400],
    dark: Eo[800]
  };
}
function Ny(e = "light") {
  return e === "dark" ? {
    main: Ro[400],
    light: Ro[300],
    dark: Ro[700]
  } : {
    main: Ro[700],
    light: Ro[500],
    dark: Ro[900]
  };
}
function ky(e = "light") {
  return e === "dark" ? {
    main: No[400],
    light: No[300],
    dark: No[700]
  } : {
    main: No[800],
    light: No[500],
    dark: No[900]
  };
}
function Py(e = "light") {
  return e === "dark" ? {
    main: gr[400],
    light: gr[300],
    dark: gr[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: gr[500],
    dark: gr[900]
  };
}
function Iy(e) {
  return `oklch(from ${e} var(--__l) 0 h / var(--__a))`;
}
function ll(e) {
  const {
    mode: t = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2,
    colorSpace: i,
    ...s
  } = e, a = e.primary || Ey(t), c = e.secondary || Oy(t), u = e.error || Ry(t), p = e.info || Ny(t), f = e.success || ky(t), g = e.warning || Py(t);
  function b(S) {
    if (i)
      return Iy(S);
    const R = Bc(S, wa.text.primary) >= n ? wa.text.primary : Ku.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const k = Bc(S, R);
      k < 3 && console.error([`MUI: The contrast ratio of ${k}:1 for ${R} on ${S}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return R;
  }
  const m = ({
    color: S,
    name: R,
    mainShade: k = 500,
    lightShade: E = 300,
    darkShade: w = 700
  }) => {
    if (S = {
      ...S
    }, !S.main && S[k] && (S.main = S[k]), !S.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${R ? ` (${R})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${k}\` property.` : Wn(11, R ? ` (${R})` : "", k));
    if (typeof S.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${R ? ` (${R})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(S.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : Wn(12, R ? ` (${R})` : "", JSON.stringify(S.main)));
    return i ? (Yc(i, S, "light", E, r), Yc(i, S, "dark", w, r)) : (Kc(S, "light", E, r), Kc(S, "dark", w, r)), S.contrastText || (S.contrastText = b(S.main)), S;
  };
  let x;
  return t === "light" ? x = qu() : t === "dark" && (x = Yu()), process.env.NODE_ENV !== "production" && (x || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), kt({
    // A collection of common colors.
    common: {
      ...zr
    },
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: t,
    // The colors used to represent primary interface elements for a user.
    primary: m({
      color: a,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: m({
      color: c,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: m({
      color: u,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: m({
      color: g,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: m({
      color: p,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: m({
      color: f,
      name: "success"
    }),
    // The grey colors.
    grey: Ty,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: n,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: b,
    // Generate a rich color object.
    augmentColor: m,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: r,
    // The light and dark mode object.
    ...x
  }, s);
}
function $y(e) {
  const t = {};
  return Object.entries(e).forEach((r) => {
    const [i, s] = r;
    typeof s == "object" && (t[i] = `${s.fontStyle ? `${s.fontStyle} ` : ""}${s.fontVariant ? `${s.fontVariant} ` : ""}${s.fontWeight ? `${s.fontWeight} ` : ""}${s.fontStretch ? `${s.fontStretch} ` : ""}${s.fontSize || ""}${s.lineHeight ? `/${s.lineHeight} ` : ""}${s.fontFamily || ""}`);
  }), t;
}
function Ay(e, t) {
  return {
    toolbar: {
      minHeight: 56,
      [e.up("xs")]: {
        "@media (orientation: landscape)": {
          minHeight: 48
        }
      },
      [e.up("sm")]: {
        minHeight: 64
      }
    },
    ...t
  };
}
function My(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Xc = {
  textTransform: "uppercase"
}, Jc = '"Roboto", "Helvetica", "Arial", sans-serif';
function Xu(e, t) {
  const {
    fontFamily: n = Jc,
    // The default font size of the Material Specification.
    fontSize: r = 14,
    // px
    fontWeightLight: i = 300,
    fontWeightRegular: s = 400,
    fontWeightMedium: a = 500,
    fontWeightBold: c = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: u = 16,
    // Apply the CSS properties to all the variants.
    allVariants: p,
    pxToRem: f,
    ...g
  } = typeof t == "function" ? t(e) : t;
  process.env.NODE_ENV !== "production" && (typeof r != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof u != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const b = r / 14, m = f || ((S) => `${S / u * b}rem`), x = (S, R, k, E, w) => ({
    fontFamily: n,
    fontWeight: S,
    fontSize: m(R),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: k,
    // The letter spacing was designed for the Roboto font-family. Using the same letter-spacing
    // across font-families can cause issues with the kerning.
    ...n === Jc ? {
      letterSpacing: `${My(E / R)}em`
    } : {},
    ...w,
    ...p
  }), h = {
    h1: x(i, 96, 1.167, -1.5),
    h2: x(i, 60, 1.2, -0.5),
    h3: x(s, 48, 1.167, 0),
    h4: x(s, 34, 1.235, 0.25),
    h5: x(s, 24, 1.334, 0),
    h6: x(a, 20, 1.6, 0.15),
    subtitle1: x(s, 16, 1.75, 0.15),
    subtitle2: x(a, 14, 1.57, 0.1),
    body1: x(s, 16, 1.5, 0.15),
    body2: x(s, 14, 1.43, 0.15),
    button: x(a, 14, 1.75, 0.4, Xc),
    caption: x(s, 12, 1.66, 0.4),
    overline: x(s, 12, 2.66, 1, Xc),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return kt({
    htmlFontSize: u,
    pxToRem: m,
    fontFamily: n,
    fontSize: r,
    fontWeightLight: i,
    fontWeightRegular: s,
    fontWeightMedium: a,
    fontWeightBold: c,
    ...h
  }, g, {
    clone: !1
    // No need to clone deep
  });
}
const _y = 0.2, Dy = 0.14, Ly = 0.12;
function ct(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${_y})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Dy})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Ly})`].join(",");
}
const Fy = ["none", ct(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), ct(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), ct(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), ct(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), ct(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), ct(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), ct(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), ct(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), ct(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), ct(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), ct(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), ct(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), ct(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), ct(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), ct(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), ct(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), ct(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), ct(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), ct(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), ct(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), ct(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), ct(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), ct(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), ct(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], jy = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, Ju = {
  shortest: 150,
  shorter: 200,
  short: 250,
  // most basic recommended timing
  standard: 300,
  // this is to be used in complex animations
  complex: 375,
  // recommended when something is entering screen
  enteringScreen: 225,
  // recommended when something is leaving screen
  leavingScreen: 195
};
function Qc(e) {
  return `${Math.round(e)}ms`;
}
function By(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.min(Math.round((4 + 15 * t ** 0.25 + t / 5) * 10), 3e3);
}
function Wy(e) {
  const t = {
    ...jy,
    ...e.easing
  }, n = {
    ...Ju,
    ...e.duration
  };
  return {
    getAutoHeightDuration: By,
    create: (i = ["all"], s = {}) => {
      const {
        duration: a = n.standard,
        easing: c = t.easeInOut,
        delay: u = 0,
        ...p
      } = s;
      if (process.env.NODE_ENV !== "production") {
        const f = (b) => typeof b == "string", g = (b) => !Number.isNaN(parseFloat(b));
        !f(i) && !Array.isArray(i) && console.error('MUI: Argument "props" must be a string or Array.'), !g(a) && !f(a) && console.error(`MUI: Argument "duration" must be a number or a string but found ${a}.`), f(c) || console.error('MUI: Argument "easing" must be a string.'), !g(u) && !f(u) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof s != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(p).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(p).join(",")}].`);
      }
      return (Array.isArray(i) ? i : [i]).map((f) => `${f} ${typeof a == "string" ? a : Qc(a)} ${c} ${typeof u == "string" ? u : Qc(u)}`).join(",");
    },
    ...e,
    easing: t,
    duration: n
  };
}
const zy = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};
function Vy(e) {
  return Dn(e) || typeof e > "u" || typeof e == "string" || typeof e == "boolean" || typeof e == "number" || Array.isArray(e);
}
function Qu(e = {}) {
  const t = {
    ...e
  };
  function n(r) {
    const i = Object.entries(r);
    for (let s = 0; s < i.length; s++) {
      const [a, c] = i[s];
      !Vy(c) || a.startsWith("unstable_") || a.startsWith("internal_") ? delete r[a] : Dn(c) && (r[a] = {
        ...c
      }, n(r[a]));
    }
  }
  return n(t), `import { unstable_createBreakpoints as createBreakpoints, createTransitions } from '@mui/material/styles';

const theme = ${JSON.stringify(t, null, 2)};

theme.breakpoints = createBreakpoints(theme.breakpoints || {});
theme.transitions = createTransitions(theme.transitions || {});

export default theme;`;
}
function Zc(e) {
  return typeof e == "number" ? `${(e * 100).toFixed(0)}%` : `calc((${e}) * 100%)`;
}
const Uy = (e) => {
  if (!Number.isNaN(+e))
    return +e;
  const t = e.match(/\d*\.?\d+/g);
  if (!t)
    return 0;
  let n = 0;
  for (let r = 0; r < t.length; r += 1)
    n += +t[r];
  return n;
};
function Gy(e) {
  Object.assign(e, {
    alpha(t, n) {
      const r = this || e;
      return r.colorSpace ? `oklch(from ${t} l c h / ${typeof n == "string" ? `calc(${n})` : n})` : r.vars ? `rgba(${t.replace(/var\(--([^,\s)]+)(?:,[^)]+)?\)+/g, "var(--$1Channel)")} / ${typeof n == "string" ? `calc(${n})` : n})` : qi(t, Uy(n));
    },
    lighten(t, n) {
      const r = this || e;
      return r.colorSpace ? `color-mix(in ${r.colorSpace}, ${t}, #fff ${Zc(n)})` : Ns(t, n);
    },
    darken(t, n) {
      const r = this || e;
      return r.colorSpace ? `color-mix(in ${r.colorSpace}, ${t}, #000 ${Zc(n)})` : Rs(t, n);
    }
  });
}
function Sa(e = {}, ...t) {
  const {
    breakpoints: n,
    mixins: r = {},
    spacing: i,
    palette: s = {},
    transitions: a = {},
    typography: c = {},
    shape: u,
    colorSpace: p,
    ...f
  } = e;
  if (e.vars && // The error should throw only for the root theme creation because user is not allowed to use a custom node `vars`.
  // `generateThemeVars` is the closest identifier for checking that the `options` is a result of `createTheme` with CSS variables so that user can create new theme for nested ThemeProvider.
  e.generateThemeVars === void 0)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name or follow the [docs](https://mui.com/material-ui/customization/css-theme-variables/usage/) to enable the feature." : Wn(22));
  const g = ll({
    ...s,
    colorSpace: p
  }), b = Zr(e);
  let m = kt(b, {
    mixins: Ay(b.breakpoints, r),
    palette: g,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: Fy.slice(),
    typography: Xu(g, c),
    transitions: Wy(a),
    zIndex: {
      ...zy
    }
  });
  if (m = kt(m, f), m = t.reduce((x, h) => kt(x, h), m), process.env.NODE_ENV !== "production") {
    const x = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], h = (S, R) => {
      let k;
      for (k in S) {
        const E = S[k];
        if (x.includes(k) && Object.keys(E).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const w = be("", k);
            console.error([`MUI: The \`${R}\` component increases the CSS specificity of the \`${k}\` internal state.`, "You can not override it like this: ", JSON.stringify(S, null, 2), "", `Instead, you need to use the '&.${w}' syntax:`, JSON.stringify({
              root: {
                [`&.${w}`]: E
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          S[k] = {};
        }
      }
    };
    Object.keys(m.components).forEach((S) => {
      const R = m.components[S].styleOverrides;
      R && S.startsWith("Mui") && h(R, S);
    });
  }
  return m.unstable_sxConfig = {
    ...Ts,
    ...f == null ? void 0 : f.unstable_sxConfig
  }, m.unstable_sx = function(h) {
    return bo({
      sx: h,
      theme: this
    });
  }, m.toRuntimeSource = Qu, Gy(m), m;
}
function Ta(e) {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, Math.round(t * 10) / 1e3;
}
const Hy = [...Array(25)].map((e, t) => {
  if (t === 0)
    return "none";
  const n = Ta(t);
  return `linear-gradient(rgba(255 255 255 / ${n}), rgba(255 255 255 / ${n}))`;
});
function Zu(e) {
  return {
    inputPlaceholder: e === "dark" ? 0.5 : 0.42,
    inputUnderline: e === "dark" ? 0.7 : 0.42,
    switchTrackDisabled: e === "dark" ? 0.2 : 0.12,
    switchTrack: e === "dark" ? 0.3 : 0.38
  };
}
function ep(e) {
  return e === "dark" ? Hy : [];
}
function qy(e) {
  const {
    palette: t = {
      mode: "light"
    },
    // need to cast to avoid module augmentation test
    opacity: n,
    overlays: r,
    colorSpace: i,
    ...s
  } = e, a = ll({
    ...t,
    colorSpace: i
  });
  return {
    palette: a,
    opacity: {
      ...Zu(a.mode),
      ...n
    },
    overlays: r || ep(a.mode),
    ...s
  };
}
function Ky(e) {
  var t;
  return !!e[0].match(/(cssVarPrefix|colorSchemeSelector|modularCssLayers|rootSelector|typography|mixins|breakpoints|direction|transitions)/) || !!e[0].match(/sxConfig$/) || // ends with sxConfig
  e[0] === "palette" && !!((t = e[1]) != null && t.match(/(mode|contrastThreshold|tonalOffset)/));
}
const Yy = (e) => [...[...Array(25)].map((t, n) => `--${e ? `${e}-` : ""}overlays-${n}`), `--${e ? `${e}-` : ""}palette-AppBar-darkBg`, `--${e ? `${e}-` : ""}palette-AppBar-darkColor`], Xy = (e) => (t, n) => {
  const r = e.rootSelector || ":root", i = e.colorSchemeSelector;
  let s = i;
  if (i === "class" && (s = ".%s"), i === "data" && (s = "[data-%s]"), i != null && i.startsWith("data-") && !i.includes("%s") && (s = `[${i}="%s"]`), e.defaultColorScheme === t) {
    if (t === "dark") {
      const a = {};
      return Yy(e.cssVarPrefix).forEach((c) => {
        a[c] = n[c], delete n[c];
      }), s === "media" ? {
        [r]: n,
        "@media (prefers-color-scheme: dark)": {
          [r]: a
        }
      } : s ? {
        [s.replace("%s", t)]: a,
        [`${r}, ${s.replace("%s", t)}`]: n
      } : {
        [r]: {
          ...n,
          ...a
        }
      };
    }
    if (s && s !== "media")
      return `${r}, ${s.replace("%s", String(t))}`;
  } else if (t) {
    if (s === "media")
      return {
        [`@media (prefers-color-scheme: ${String(t)})`]: {
          [r]: n
        }
      };
    if (s)
      return s.replace("%s", String(t));
  }
  return r;
};
function Jy(e, t) {
  t.forEach((n) => {
    e[n] || (e[n] = {});
  });
}
function G(e, t, n) {
  !e[t] && n && (e[t] = n);
}
function Rr(e) {
  return typeof e != "string" || !e.startsWith("hsl") ? e : Bu(e);
}
function An(e, t) {
  `${t}Channel` in e || (e[`${t}Channel`] = Or(Rr(e[t]), `MUI: Can't create \`palette.${t}Channel\` because \`palette.${t}\` is not one of these formats: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().
To suppress this warning, you need to explicitly provide the \`palette.${t}Channel\` as a string (in rgb format, for example "12 12 12") or undefined if you want to remove the channel token.`));
}
function Qy(e) {
  return typeof e == "number" ? `${e}px` : typeof e == "string" || typeof e == "function" || Array.isArray(e) ? e : "8px";
}
const yn = (e) => {
  try {
    return e();
  } catch {
  }
}, Zy = (e = "mui") => ay(e);
function aa(e, t, n, r, i) {
  if (!n)
    return;
  n = n === !0 ? {} : n;
  const s = i === "dark" ? "dark" : "light";
  if (!r) {
    t[i] = qy({
      ...n,
      palette: {
        mode: s,
        ...n == null ? void 0 : n.palette
      },
      colorSpace: e
    });
    return;
  }
  const {
    palette: a,
    ...c
  } = Sa({
    ...r,
    palette: {
      mode: s,
      ...n == null ? void 0 : n.palette
    },
    colorSpace: e
  });
  return t[i] = {
    ...n,
    palette: a,
    opacity: {
      ...Zu(s),
      ...n == null ? void 0 : n.opacity
    },
    overlays: (n == null ? void 0 : n.overlays) || ep(s)
  }, c;
}
function eb(e = {}, ...t) {
  const {
    colorSchemes: n = {
      light: !0
    },
    defaultColorScheme: r,
    disableCssColorScheme: i = !1,
    cssVarPrefix: s = "mui",
    nativeColor: a = !1,
    shouldSkipGeneratingVar: c = Ky,
    colorSchemeSelector: u = n.light && n.dark ? "media" : void 0,
    rootSelector: p = ":root",
    ...f
  } = e, g = Object.keys(n)[0], b = r || (n.light && g !== "light" ? "light" : g), m = Zy(s), {
    [b]: x,
    light: h,
    dark: S,
    ...R
  } = n, k = {
    ...R
  };
  let E = x;
  if ((b === "dark" && !("dark" in n) || b === "light" && !("light" in n)) && (E = !0), !E)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The \`colorSchemes.${b}\` option is either missing or invalid.` : Wn(21, b));
  let w;
  a && (w = "oklch");
  const C = aa(w, k, E, f, b);
  h && !k.light && aa(w, k, h, void 0, "light"), S && !k.dark && aa(w, k, S, void 0, "dark");
  let N = {
    defaultColorScheme: b,
    ...C,
    cssVarPrefix: s,
    colorSchemeSelector: u,
    rootSelector: p,
    getCssVar: m,
    colorSchemes: k,
    font: {
      ...$y(C.typography),
      ...C.font
    },
    spacing: Qy(f.spacing)
  };
  Object.keys(N.colorSchemes).forEach((I) => {
    const y = N.colorSchemes[I].palette, $ = (A) => {
      const F = A.split("-"), W = F[1], H = F[2];
      return m(A, y[W][H]);
    };
    y.mode === "light" && (G(y.common, "background", "#fff"), G(y.common, "onBackground", "#000")), y.mode === "dark" && (G(y.common, "background", "#000"), G(y.common, "onBackground", "#fff"));
    function P(A, F, W) {
      if (w) {
        let H;
        return A === ao && (H = `transparent ${((1 - W) * 100).toFixed(0)}%`), A === Xe && (H = `#000 ${(W * 100).toFixed(0)}%`), A === Je && (H = `#fff ${(W * 100).toFixed(0)}%`), `color-mix(in ${w}, ${F}, ${H})`;
      }
      return A(F, W);
    }
    if (Jy(y, ["Alert", "AppBar", "Avatar", "Button", "Chip", "FilledInput", "LinearProgress", "Skeleton", "Slider", "SnackbarContent", "SpeedDialAction", "StepConnector", "StepContent", "Switch", "TableCell", "Tooltip"]), y.mode === "light") {
      G(y.Alert, "errorColor", P(Xe, a ? m("palette-error-light") : y.error.light, 0.6)), G(y.Alert, "infoColor", P(Xe, a ? m("palette-info-light") : y.info.light, 0.6)), G(y.Alert, "successColor", P(Xe, a ? m("palette-success-light") : y.success.light, 0.6)), G(y.Alert, "warningColor", P(Xe, a ? m("palette-warning-light") : y.warning.light, 0.6)), G(y.Alert, "errorFilledBg", $("palette-error-main")), G(y.Alert, "infoFilledBg", $("palette-info-main")), G(y.Alert, "successFilledBg", $("palette-success-main")), G(y.Alert, "warningFilledBg", $("palette-warning-main")), G(y.Alert, "errorFilledColor", yn(() => y.getContrastText(y.error.main))), G(y.Alert, "infoFilledColor", yn(() => y.getContrastText(y.info.main))), G(y.Alert, "successFilledColor", yn(() => y.getContrastText(y.success.main))), G(y.Alert, "warningFilledColor", yn(() => y.getContrastText(y.warning.main))), G(y.Alert, "errorStandardBg", P(Je, a ? m("palette-error-light") : y.error.light, 0.9)), G(y.Alert, "infoStandardBg", P(Je, a ? m("palette-info-light") : y.info.light, 0.9)), G(y.Alert, "successStandardBg", P(Je, a ? m("palette-success-light") : y.success.light, 0.9)), G(y.Alert, "warningStandardBg", P(Je, a ? m("palette-warning-light") : y.warning.light, 0.9)), G(y.Alert, "errorIconColor", $("palette-error-main")), G(y.Alert, "infoIconColor", $("palette-info-main")), G(y.Alert, "successIconColor", $("palette-success-main")), G(y.Alert, "warningIconColor", $("palette-warning-main")), G(y.AppBar, "defaultBg", $("palette-grey-100")), G(y.Avatar, "defaultBg", $("palette-grey-400")), G(y.Button, "inheritContainedBg", $("palette-grey-300")), G(y.Button, "inheritContainedHoverBg", $("palette-grey-A100")), G(y.Chip, "defaultBorder", $("palette-grey-400")), G(y.Chip, "defaultAvatarColor", $("palette-grey-700")), G(y.Chip, "defaultIconColor", $("palette-grey-700")), G(y.FilledInput, "bg", "rgba(0, 0, 0, 0.06)"), G(y.FilledInput, "hoverBg", "rgba(0, 0, 0, 0.09)"), G(y.FilledInput, "disabledBg", "rgba(0, 0, 0, 0.12)"), G(y.LinearProgress, "primaryBg", P(Je, a ? m("palette-primary-main") : y.primary.main, 0.62)), G(y.LinearProgress, "secondaryBg", P(Je, a ? m("palette-secondary-main") : y.secondary.main, 0.62)), G(y.LinearProgress, "errorBg", P(Je, a ? m("palette-error-main") : y.error.main, 0.62)), G(y.LinearProgress, "infoBg", P(Je, a ? m("palette-info-main") : y.info.main, 0.62)), G(y.LinearProgress, "successBg", P(Je, a ? m("palette-success-main") : y.success.main, 0.62)), G(y.LinearProgress, "warningBg", P(Je, a ? m("palette-warning-light") : y.warning.main, 0.62)), G(y.Skeleton, "bg", w ? P(ao, a ? m("palette-text-primary") : y.text.primary, 0.11) : `rgba(${$("palette-text-primaryChannel")} / 0.11)`), G(y.Slider, "primaryTrack", P(Je, a ? m("palette-primary-main") : y.primary.main, 0.62)), G(y.Slider, "secondaryTrack", P(Je, a ? m("palette-secondary-main") : y.secondary.main, 0.62)), G(y.Slider, "errorTrack", P(Je, a ? m("palette-error-main") : y.error.main, 0.62)), G(y.Slider, "infoTrack", P(Je, a ? m("palette-info-main") : y.info.main, 0.62)), G(y.Slider, "successTrack", P(Je, a ? m("palette-success-main") : y.success.main, 0.62)), G(y.Slider, "warningTrack", P(Je, a ? m("palette-warning-main") : y.warning.main, 0.62));
      const A = w ? P(Xe, a ? m("palette-background-default") : y.background.default, 0.6825) : yi(y.background.default, 0.8);
      G(y.SnackbarContent, "bg", A), G(y.SnackbarContent, "color", yn(() => w ? wa.text.primary : y.getContrastText(A))), G(y.SpeedDialAction, "fabHoverBg", yi(y.background.paper, 0.15)), G(y.StepConnector, "border", $("palette-grey-400")), G(y.StepContent, "border", $("palette-grey-400")), G(y.Switch, "defaultColor", $("palette-common-white")), G(y.Switch, "defaultDisabledColor", $("palette-grey-100")), G(y.Switch, "primaryDisabledColor", P(Je, a ? m("palette-primary-main") : y.primary.main, 0.62)), G(y.Switch, "secondaryDisabledColor", P(Je, a ? m("palette-secondary-main") : y.secondary.main, 0.62)), G(y.Switch, "errorDisabledColor", P(Je, a ? m("palette-error-main") : y.error.main, 0.62)), G(y.Switch, "infoDisabledColor", P(Je, a ? m("palette-info-main") : y.info.main, 0.62)), G(y.Switch, "successDisabledColor", P(Je, a ? m("palette-success-main") : y.success.main, 0.62)), G(y.Switch, "warningDisabledColor", P(Je, a ? m("palette-warning-main") : y.warning.main, 0.62)), G(y.TableCell, "border", P(Je, ao(a ? m("palette-divider") : y.divider, 1), 0.88)), G(y.Tooltip, "bg", P(ao, a ? m("palette-grey-700") : y.grey[700], 0.92));
    }
    if (y.mode === "dark") {
      G(y.Alert, "errorColor", P(Je, a ? m("palette-error-light") : y.error.light, 0.6)), G(y.Alert, "infoColor", P(Je, a ? m("palette-info-light") : y.info.light, 0.6)), G(y.Alert, "successColor", P(Je, a ? m("palette-success-light") : y.success.light, 0.6)), G(y.Alert, "warningColor", P(Je, a ? m("palette-warning-light") : y.warning.light, 0.6)), G(y.Alert, "errorFilledBg", $("palette-error-dark")), G(y.Alert, "infoFilledBg", $("palette-info-dark")), G(y.Alert, "successFilledBg", $("palette-success-dark")), G(y.Alert, "warningFilledBg", $("palette-warning-dark")), G(y.Alert, "errorFilledColor", yn(() => y.getContrastText(y.error.dark))), G(y.Alert, "infoFilledColor", yn(() => y.getContrastText(y.info.dark))), G(y.Alert, "successFilledColor", yn(() => y.getContrastText(y.success.dark))), G(y.Alert, "warningFilledColor", yn(() => y.getContrastText(y.warning.dark))), G(y.Alert, "errorStandardBg", P(Xe, a ? m("palette-error-light") : y.error.light, 0.9)), G(y.Alert, "infoStandardBg", P(Xe, a ? m("palette-info-light") : y.info.light, 0.9)), G(y.Alert, "successStandardBg", P(Xe, a ? m("palette-success-light") : y.success.light, 0.9)), G(y.Alert, "warningStandardBg", P(Xe, a ? m("palette-warning-light") : y.warning.light, 0.9)), G(y.Alert, "errorIconColor", $("palette-error-main")), G(y.Alert, "infoIconColor", $("palette-info-main")), G(y.Alert, "successIconColor", $("palette-success-main")), G(y.Alert, "warningIconColor", $("palette-warning-main")), G(y.AppBar, "defaultBg", $("palette-grey-900")), G(y.AppBar, "darkBg", $("palette-background-paper")), G(y.AppBar, "darkColor", $("palette-text-primary")), G(y.Avatar, "defaultBg", $("palette-grey-600")), G(y.Button, "inheritContainedBg", $("palette-grey-800")), G(y.Button, "inheritContainedHoverBg", $("palette-grey-700")), G(y.Chip, "defaultBorder", $("palette-grey-700")), G(y.Chip, "defaultAvatarColor", $("palette-grey-300")), G(y.Chip, "defaultIconColor", $("palette-grey-300")), G(y.FilledInput, "bg", "rgba(255, 255, 255, 0.09)"), G(y.FilledInput, "hoverBg", "rgba(255, 255, 255, 0.13)"), G(y.FilledInput, "disabledBg", "rgba(255, 255, 255, 0.12)"), G(y.LinearProgress, "primaryBg", P(Xe, a ? m("palette-primary-main") : y.primary.main, 0.5)), G(y.LinearProgress, "secondaryBg", P(Xe, a ? m("palette-secondary-main") : y.secondary.main, 0.5)), G(y.LinearProgress, "errorBg", P(Xe, a ? m("palette-error-main") : y.error.main, 0.5)), G(y.LinearProgress, "infoBg", P(Xe, a ? m("palette-info-main") : y.info.main, 0.5)), G(y.LinearProgress, "successBg", P(Xe, a ? m("palette-success-main") : y.success.main, 0.5)), G(y.LinearProgress, "warningBg", P(Xe, a ? m("palette-warning-main") : y.warning.main, 0.5)), G(y.Skeleton, "bg", w ? P(ao, a ? m("palette-text-primary") : y.text.primary, 0.13) : `rgba(${$("palette-text-primaryChannel")} / 0.13)`), G(y.Slider, "primaryTrack", P(Xe, a ? m("palette-primary-main") : y.primary.main, 0.5)), G(y.Slider, "secondaryTrack", P(Xe, a ? m("palette-secondary-main") : y.secondary.main, 0.5)), G(y.Slider, "errorTrack", P(Xe, a ? m("palette-error-main") : y.error.main, 0.5)), G(y.Slider, "infoTrack", P(Xe, a ? m("palette-info-main") : y.info.main, 0.5)), G(y.Slider, "successTrack", P(Xe, a ? m("palette-success-main") : y.success.main, 0.5)), G(y.Slider, "warningTrack", P(Xe, a ? m("palette-warning-light") : y.warning.main, 0.5));
      const A = w ? P(Je, a ? m("palette-background-default") : y.background.default, 0.985) : yi(y.background.default, 0.98);
      G(y.SnackbarContent, "bg", A), G(y.SnackbarContent, "color", yn(() => w ? Ku.text.primary : y.getContrastText(A))), G(y.SpeedDialAction, "fabHoverBg", yi(y.background.paper, 0.15)), G(y.StepConnector, "border", $("palette-grey-600")), G(y.StepContent, "border", $("palette-grey-600")), G(y.Switch, "defaultColor", $("palette-grey-300")), G(y.Switch, "defaultDisabledColor", $("palette-grey-600")), G(y.Switch, "primaryDisabledColor", P(Xe, a ? m("palette-primary-main") : y.primary.main, 0.55)), G(y.Switch, "secondaryDisabledColor", P(Xe, a ? m("palette-secondary-main") : y.secondary.main, 0.55)), G(y.Switch, "errorDisabledColor", P(Xe, a ? m("palette-error-main") : y.error.main, 0.55)), G(y.Switch, "infoDisabledColor", P(Xe, a ? m("palette-info-main") : y.info.main, 0.55)), G(y.Switch, "successDisabledColor", P(Xe, a ? m("palette-success-main") : y.success.main, 0.55)), G(y.Switch, "warningDisabledColor", P(Xe, a ? m("palette-warning-light") : y.warning.main, 0.55)), G(y.TableCell, "border", P(Xe, ao(a ? m("palette-divider") : y.divider, 1), 0.68)), G(y.Tooltip, "bg", P(ao, a ? m("palette-grey-700") : y.grey[700], 0.92));
    }
    a || (An(y.background, "default"), An(y.background, "paper"), An(y.common, "background"), An(y.common, "onBackground"), An(y, "divider")), Object.keys(y).forEach((A) => {
      const F = y[A];
      A !== "tonalOffset" && !a && F && typeof F == "object" && (F.main && G(y[A], "mainChannel", Or(Rr(F.main))), F.light && G(y[A], "lightChannel", Or(Rr(F.light))), F.dark && G(y[A], "darkChannel", Or(Rr(F.dark))), F.contrastText && G(y[A], "contrastTextChannel", Or(Rr(F.contrastText))), A === "text" && (An(y[A], "primary"), An(y[A], "secondary")), A === "action" && (F.active && An(y[A], "active"), F.selected && An(y[A], "selected")));
    });
  }), N = t.reduce((I, y) => kt(I, y), N);
  const M = {
    prefix: s,
    disableCssColorScheme: i,
    shouldSkipGeneratingVar: c,
    getSelector: Xy(N),
    enableContrastVars: a
  }, {
    vars: D,
    generateThemeVars: L,
    generateStyleSheets: B
  } = dy(N, M);
  return N.vars = D, Object.entries(N.colorSchemes[N.defaultColorScheme]).forEach(([I, y]) => {
    N[I] = y;
  }), N.generateThemeVars = L, N.generateStyleSheets = B, N.generateSpacing = function() {
    return Pu(f.spacing, bs(this));
  }, N.getColorSchemeSelector = uy(u), N.spacing = N.generateSpacing(), N.shouldSkipGeneratingVar = c, N.unstable_sxConfig = {
    ...Ts,
    ...f == null ? void 0 : f.unstable_sxConfig
  }, N.unstable_sx = function(y) {
    return bo({
      sx: y,
      theme: this
    });
  }, N.internal_cache = {}, N.toRuntimeSource = Qu, N;
}
function ed(e, t, n) {
  e.colorSchemes && n && (e.colorSchemes[t] = {
    ...n !== !0 && n,
    palette: ll({
      ...n === !0 ? {} : n.palette,
      mode: t
    })
    // cast type to skip module augmentation test
  });
}
function Ps(e = {}, ...t) {
  const {
    palette: n,
    cssVariables: r = !1,
    colorSchemes: i = n ? void 0 : {
      light: !0
    },
    defaultColorScheme: s = n == null ? void 0 : n.mode,
    ...a
  } = e, c = s || "light", u = i == null ? void 0 : i[c], p = {
    ...i,
    ...n ? {
      [c]: {
        ...typeof u != "boolean" && u,
        palette: n
      }
    } : void 0
  };
  if (r === !1) {
    if (!("colorSchemes" in e))
      return Sa(e, ...t);
    let f = n;
    "palette" in e || p[c] && (p[c] !== !0 ? f = p[c].palette : c === "dark" && (f = {
      mode: "dark"
    }));
    const g = Sa({
      ...e,
      palette: f
    }, ...t);
    return g.defaultColorScheme = c, g.colorSchemes = p, g.palette.mode === "light" && (g.colorSchemes.light = {
      ...p.light !== !0 && p.light,
      palette: g.palette
    }, ed(g, "dark", p.dark)), g.palette.mode === "dark" && (g.colorSchemes.dark = {
      ...p.dark !== !0 && p.dark,
      palette: g.palette
    }, ed(g, "light", p.light)), g;
  }
  return !n && !("light" in p) && c === "light" && (p.light = !0), eb({
    ...a,
    colorSchemes: p,
    defaultColorScheme: c,
    ...typeof r != "boolean" && r
  }, ...t);
}
const cl = Ps();
function rr() {
  const e = Es(cl);
  return process.env.NODE_ENV !== "production" && v.useDebugValue(e), e[On] || e;
}
function tp(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const zt = (e) => tp(e) && e !== "classes", ee = Du({
  themeId: On,
  defaultTheme: cl,
  rootShouldForwardProp: zt
});
function tb({
  theme: e,
  ...t
}) {
  const n = On in e ? e[On] : void 0;
  return /* @__PURE__ */ l(Wr, {
    ...t,
    themeId: n ? On : void 0,
    theme: n || e
  });
}
const bi = {
  colorSchemeStorageKey: "mui-color-scheme",
  defaultLightColorScheme: "light",
  defaultDarkColorScheme: "dark",
  modeStorageKey: "mui-mode"
};
process.env.NODE_ENV !== "production" && (o.string, o.string, o.string, o.string, o.string, o.oneOf(["dark", "light", "system"]), o.string, o.string);
const {
  CssVarsProvider: nb
} = sy({
  themeId: On,
  // @ts-ignore ignore module augmentation tests
  theme: () => Ps({
    cssVariables: !0
  }),
  colorSchemeStorageKey: bi.colorSchemeStorageKey,
  modeStorageKey: bi.modeStorageKey,
  defaultColorScheme: {
    light: bi.defaultLightColorScheme,
    dark: bi.defaultDarkColorScheme
  },
  resolveTheme: (e) => {
    const t = {
      ...e,
      typography: Xu(e.palette, e.typography)
    };
    return t.unstable_sx = function(r) {
      return bo({
        sx: r,
        theme: this
      });
    }, t;
  }
}), ob = nb;
function rb({
  theme: e,
  ...t
}) {
  const n = v.useMemo(() => {
    if (typeof e == "function")
      return e;
    const r = On in e ? e[On] : e;
    return "colorSchemes" in r ? null : "vars" in r ? e : {
      ...e,
      vars: null
    };
  }, [e]);
  return n ? /* @__PURE__ */ l(tb, {
    theme: n,
    ...t
  }) : /* @__PURE__ */ l(ob, {
    theme: e,
    ...t
  });
}
const ib = xe("MuiBox", ["root"]), sb = Ps(), Ne = kg({
  themeId: On,
  defaultTheme: sb,
  defaultClassName: ib.root,
  generateClassName: Iu.generate
});
process.env.NODE_ENV !== "production" && (Ne.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: o.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: o.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object])
});
function np(e) {
  return /* @__PURE__ */ l(nl, {
    ...e,
    defaultTheme: cl,
    themeId: On
  });
}
process.env.NODE_ENV !== "production" && (np.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The styles you want to apply globally.
   */
  styles: o.oneOfType([o.array, o.func, o.number, o.object, o.string, o.bool])
});
function dl(e) {
  return function(n) {
    return (
      // Pigment CSS `globalCss` support callback with theme inside an object but `GlobalStyles` support theme as a callback value.
      /* @__PURE__ */ l(np, {
        styles: typeof e == "function" ? (r) => e({
          theme: r,
          ...n
        }) : e
      })
    );
  };
}
process.env.NODE_ENV !== "production" && (o.node, o.object.isRequired);
function we(e) {
  return Kg(e);
}
const Ea = typeof dl({}) == "function", ab = (e, t) => ({
  WebkitFontSmoothing: "antialiased",
  // Antialiasing.
  MozOsxFontSmoothing: "grayscale",
  // Antialiasing.
  // Change from `box-sizing: content-box` so that `width`
  // is not affected by `padding` or `border`.
  boxSizing: "border-box",
  // Fix font resize problem in iOS
  WebkitTextSizeAdjust: "100%",
  // When used under CssVarsProvider, colorScheme should not be applied dynamically because it will generate the stylesheet twice for server-rendered applications.
  ...t && !e.vars && {
    colorScheme: e.palette.mode
  }
}), lb = (e) => ({
  color: (e.vars || e).palette.text.primary,
  ...e.typography.body1,
  backgroundColor: (e.vars || e).palette.background.default,
  "@media print": {
    // Save printer ink.
    backgroundColor: (e.vars || e).palette.common.white
  }
}), op = (e, t = !1) => {
  var s, a;
  const n = {};
  t && e.colorSchemes && typeof e.getColorSchemeSelector == "function" && Object.entries(e.colorSchemes).forEach(([c, u]) => {
    var f, g;
    const p = e.getColorSchemeSelector(c);
    p.startsWith("@") ? n[p] = {
      ":root": {
        colorScheme: (f = u.palette) == null ? void 0 : f.mode
      }
    } : n[p.replace(/\s*&/, "")] = {
      colorScheme: (g = u.palette) == null ? void 0 : g.mode
    };
  });
  let r = {
    html: ab(e, t),
    "*, *::before, *::after": {
      boxSizing: "inherit"
    },
    "strong, b": {
      fontWeight: e.typography.fontWeightBold
    },
    body: {
      margin: 0,
      // Remove the margin in all browsers.
      ...lb(e),
      // Add support for document.body.requestFullScreen().
      // Other elements, if background transparent, are not supported.
      "&::backdrop": {
        backgroundColor: (e.vars || e).palette.background.default
      }
    },
    ...n
  };
  const i = (a = (s = e.components) == null ? void 0 : s.MuiCssBaseline) == null ? void 0 : a.styleOverrides;
  return i && (r = [r, i]), r;
}, Wi = "mui-ecs", cb = (e) => {
  const t = op(e, !1), n = Array.isArray(t) ? t[0] : t;
  return !e.vars && n && (n.html[`:root:has(${Wi})`] = {
    colorScheme: e.palette.mode
  }), e.colorSchemes && Object.entries(e.colorSchemes).forEach(([r, i]) => {
    var a, c;
    const s = e.getColorSchemeSelector(r);
    s.startsWith("@") ? n[s] = {
      [`:root:not(:has(.${Wi}))`]: {
        colorScheme: (a = i.palette) == null ? void 0 : a.mode
      }
    } : n[s.replace(/\s*&/, "")] = {
      [`&:not(:has(.${Wi}))`]: {
        colorScheme: (c = i.palette) == null ? void 0 : c.mode
      }
    };
  }), t;
}, db = dl(Ea ? ({
  theme: e,
  enableColorScheme: t
}) => op(e, t) : ({
  theme: e
}) => cb(e));
function rp(e) {
  const t = we({
    props: e,
    name: "MuiCssBaseline"
  }), {
    children: n,
    enableColorScheme: r = !1
  } = t;
  return /* @__PURE__ */ T(v.Fragment, {
    children: [Ea && /* @__PURE__ */ l(db, {
      enableColorScheme: r
    }), !Ea && !r && /* @__PURE__ */ l("span", {
      className: Wi,
      style: {
        display: "none"
      }
    }), n]
  });
}
process.env.NODE_ENV !== "production" && (rp.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * You can wrap a node.
   */
  children: o.node,
  /**
   * Enable `color-scheme` CSS property to use `theme.palette.mode`.
   * For more details, check out https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme
   * For browser support, check out https://caniuse.com/?search=color-scheme
   * @default false
   */
  enableColorScheme: o.bool
});
function kn(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : function(...r) {
    return e(...r) || t(...r);
  };
}
const ke = Qg;
function ip(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
    if (t.indexOf(r) !== -1) continue;
    n[r] = e[r];
  }
  return n;
}
function Oa(e, t) {
  return Oa = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, r) {
    return n.__proto__ = r, n;
  }, Oa(e, t);
}
function sp(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Oa(e, t);
}
const td = {
  disabled: !1
};
var ub = process.env.NODE_ENV !== "production" ? o.oneOfType([o.number, o.shape({
  enter: o.number,
  exit: o.number,
  appear: o.number
}).isRequired]) : null;
process.env.NODE_ENV !== "production" && o.oneOfType([o.string, o.shape({
  enter: o.string,
  exit: o.string,
  active: o.string
}), o.shape({
  enter: o.string,
  enterDone: o.string,
  enterActive: o.string,
  exit: o.string,
  exitDone: o.string,
  exitActive: o.string
})]);
const Yi = Ln.createContext(null);
var pb = function(t) {
  return t.scrollTop;
}, Nr = "unmounted", uo = "exited", po = "entering", Io = "entered", Ra = "exiting", hn = /* @__PURE__ */ function(e) {
  sp(t, e);
  function t(r, i) {
    var s;
    s = e.call(this, r, i) || this;
    var a = i, c = a && !a.isMounting ? r.enter : r.appear, u;
    return s.appearStatus = null, r.in ? c ? (u = uo, s.appearStatus = po) : u = Io : r.unmountOnExit || r.mountOnEnter ? u = Nr : u = uo, s.state = {
      status: u
    }, s.nextCallback = null, s;
  }
  t.getDerivedStateFromProps = function(i, s) {
    var a = i.in;
    return a && s.status === Nr ? {
      status: uo
    } : null;
  };
  var n = t.prototype;
  return n.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, n.componentDidUpdate = function(i) {
    var s = null;
    if (i !== this.props) {
      var a = this.state.status;
      this.props.in ? a !== po && a !== Io && (s = po) : (a === po || a === Io) && (s = Ra);
    }
    this.updateStatus(!1, s);
  }, n.componentWillUnmount = function() {
    this.cancelNextCallback();
  }, n.getTimeouts = function() {
    var i = this.props.timeout, s, a, c;
    return s = a = c = i, i != null && typeof i != "number" && (s = i.exit, a = i.enter, c = i.appear !== void 0 ? i.appear : a), {
      exit: s,
      enter: a,
      appear: c
    };
  }, n.updateStatus = function(i, s) {
    if (i === void 0 && (i = !1), s !== null)
      if (this.cancelNextCallback(), s === po) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var a = this.props.nodeRef ? this.props.nodeRef.current : mi.findDOMNode(this);
          a && pb(a);
        }
        this.performEnter(i);
      } else
        this.performExit();
    else this.props.unmountOnExit && this.state.status === uo && this.setState({
      status: Nr
    });
  }, n.performEnter = function(i) {
    var s = this, a = this.props.enter, c = this.context ? this.context.isMounting : i, u = this.props.nodeRef ? [c] : [mi.findDOMNode(this), c], p = u[0], f = u[1], g = this.getTimeouts(), b = c ? g.appear : g.enter;
    if (!i && !a || td.disabled) {
      this.safeSetState({
        status: Io
      }, function() {
        s.props.onEntered(p);
      });
      return;
    }
    this.props.onEnter(p, f), this.safeSetState({
      status: po
    }, function() {
      s.props.onEntering(p, f), s.onTransitionEnd(b, function() {
        s.safeSetState({
          status: Io
        }, function() {
          s.props.onEntered(p, f);
        });
      });
    });
  }, n.performExit = function() {
    var i = this, s = this.props.exit, a = this.getTimeouts(), c = this.props.nodeRef ? void 0 : mi.findDOMNode(this);
    if (!s || td.disabled) {
      this.safeSetState({
        status: uo
      }, function() {
        i.props.onExited(c);
      });
      return;
    }
    this.props.onExit(c), this.safeSetState({
      status: Ra
    }, function() {
      i.props.onExiting(c), i.onTransitionEnd(a.exit, function() {
        i.safeSetState({
          status: uo
        }, function() {
          i.props.onExited(c);
        });
      });
    });
  }, n.cancelNextCallback = function() {
    this.nextCallback !== null && (this.nextCallback.cancel(), this.nextCallback = null);
  }, n.safeSetState = function(i, s) {
    s = this.setNextCallback(s), this.setState(i, s);
  }, n.setNextCallback = function(i) {
    var s = this, a = !0;
    return this.nextCallback = function(c) {
      a && (a = !1, s.nextCallback = null, i(c));
    }, this.nextCallback.cancel = function() {
      a = !1;
    }, this.nextCallback;
  }, n.onTransitionEnd = function(i, s) {
    this.setNextCallback(s);
    var a = this.props.nodeRef ? this.props.nodeRef.current : mi.findDOMNode(this), c = i == null && !this.props.addEndListener;
    if (!a || c) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var u = this.props.nodeRef ? [this.nextCallback] : [a, this.nextCallback], p = u[0], f = u[1];
      this.props.addEndListener(p, f);
    }
    i != null && setTimeout(this.nextCallback, i);
  }, n.render = function() {
    var i = this.state.status;
    if (i === Nr)
      return null;
    var s = this.props, a = s.children;
    s.in, s.mountOnEnter, s.unmountOnExit, s.appear, s.enter, s.exit, s.timeout, s.addEndListener, s.onEnter, s.onEntering, s.onEntered, s.onExit, s.onExiting, s.onExited, s.nodeRef;
    var c = ip(s, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ Ln.createElement(Yi.Provider, {
        value: null
      }, typeof a == "function" ? a(i, c) : Ln.cloneElement(Ln.Children.only(a), c))
    );
  }, t;
}(Ln.Component);
hn.contextType = Yi;
hn.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * A React reference to DOM element that need to transition:
   * https://stackoverflow.com/a/51127130/4671932
   *
   *   - When `nodeRef` prop is used, `node` is not passed to callback functions
   *      (e.g. `onEnter`) because user already has direct access to the node.
   *   - When changing `key` prop of `Transition` in a `TransitionGroup` a new
   *     `nodeRef` need to be provided to `Transition` with changed `key` prop
   *     (see
   *     [test/CSSTransition-test.js](https://github.com/reactjs/react-transition-group/blob/13435f897b3ab71f6e19d724f145596f5910581c/test/CSSTransition-test.js#L362-L437)).
   */
  nodeRef: o.shape({
    current: typeof Element > "u" ? o.any : function(e, t, n, r, i, s) {
      var a = e[t];
      return o.instanceOf(a && "ownerDocument" in a ? a.ownerDocument.defaultView.Element : Element)(e, t, n, r, i, s);
    }
  }),
  /**
   * A `function` child can be used instead of a React element. This function is
   * called with the current transition status (`'entering'`, `'entered'`,
   * `'exiting'`, `'exited'`), which can be used to apply context
   * specific props to a component.
   *
   * ```jsx
   * <Transition in={this.state.in} timeout={150}>
   *   {state => (
   *     <MyComponent className={`fade fade-${state}`} />
   *   )}
   * </Transition>
   * ```
   */
  children: o.oneOfType([o.func.isRequired, o.element.isRequired]).isRequired,
  /**
   * Show the component; triggers the enter or exit states
   */
  in: o.bool,
  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: o.bool,
  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: o.bool,
  /**
   * By default the child component does not perform the enter transition when
   * it first mounts, regardless of the value of `in`. If you want this
   * behavior, set both `appear` and `in` to `true`.
   *
   * > **Note**: there are no special appear states like `appearing`/`appeared`, this prop
   * > only adds an additional enter transition. However, in the
   * > `<CSSTransition>` component that first enter transition does result in
   * > additional `.appear-*` classes, that way you can choose to style it
   * > differently.
   */
  appear: o.bool,
  /**
   * Enable or disable enter transitions.
   */
  enter: o.bool,
  /**
   * Enable or disable exit transitions.
   */
  exit: o.bool,
  /**
   * The duration of the transition, in milliseconds.
   * Required unless `addEndListener` is provided.
   *
   * You may specify a single timeout for all transitions:
   *
   * ```jsx
   * timeout={500}
   * ```
   *
   * or individually:
   *
   * ```jsx
   * timeout={{
   *  appear: 500,
   *  enter: 300,
   *  exit: 500,
   * }}
   * ```
   *
   * - `appear` defaults to the value of `enter`
   * - `enter` defaults to `0`
   * - `exit` defaults to `0`
   *
   * @type {number | { enter?: number, exit?: number, appear?: number }}
   */
  timeout: function(t) {
    var n = ub;
    t.addEndListener || (n = n.isRequired);
    for (var r = arguments.length, i = new Array(r > 1 ? r - 1 : 0), s = 1; s < r; s++)
      i[s - 1] = arguments[s];
    return n.apply(void 0, [t].concat(i));
  },
  /**
   * Add a custom transition end trigger. Called with the transitioning
   * DOM node and a `done` callback. Allows for more fine grained transition end
   * logic. Timeouts are still used as a fallback if provided.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * ```jsx
   * addEndListener={(node, done) => {
   *   // use the css transitionend event to mark the finish of a transition
   *   node.addEventListener('transitionend', done, false);
   * }}
   * ```
   */
  addEndListener: o.func,
  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: o.func,
  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: o.func,
  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: o.func,
  /**
   * Callback fired before the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: o.func,
  /**
   * Callback fired after the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: o.func,
  /**
   * Callback fired after the "exited" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: o.func
} : {};
function ko() {
}
hn.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: ko,
  onEntering: ko,
  onEntered: ko,
  onExit: ko,
  onExiting: ko,
  onExited: ko
};
hn.UNMOUNTED = Nr;
hn.EXITED = uo;
hn.ENTERING = po;
hn.ENTERED = Io;
hn.EXITING = Ra;
function fb(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function ul(e, t) {
  var n = function(s) {
    return t && _i(s) ? t(s) : s;
  }, r = /* @__PURE__ */ Object.create(null);
  return e && um.map(e, function(i) {
    return i;
  }).forEach(function(i) {
    r[i.key] = n(i);
  }), r;
}
function mb(e, t) {
  e = e || {}, t = t || {};
  function n(f) {
    return f in t ? t[f] : e[f];
  }
  var r = /* @__PURE__ */ Object.create(null), i = [];
  for (var s in e)
    s in t ? i.length && (r[s] = i, i = []) : i.push(s);
  var a, c = {};
  for (var u in t) {
    if (r[u])
      for (a = 0; a < r[u].length; a++) {
        var p = r[u][a];
        c[r[u][a]] = n(p);
      }
    c[u] = n(u);
  }
  for (a = 0; a < i.length; a++)
    c[i[a]] = n(i[a]);
  return c;
}
function ho(e, t, n) {
  return n[t] != null ? n[t] : e.props[t];
}
function hb(e, t) {
  return ul(e.children, function(n) {
    return Di(n, {
      onExited: t.bind(null, n),
      in: !0,
      appear: ho(n, "appear", e),
      enter: ho(n, "enter", e),
      exit: ho(n, "exit", e)
    });
  });
}
function gb(e, t, n) {
  var r = ul(e.children), i = mb(t, r);
  return Object.keys(i).forEach(function(s) {
    var a = i[s];
    if (_i(a)) {
      var c = s in t, u = s in r, p = t[s], f = _i(p) && !p.props.in;
      u && (!c || f) ? i[s] = Di(a, {
        onExited: n.bind(null, a),
        in: !0,
        exit: ho(a, "exit", e),
        enter: ho(a, "enter", e)
      }) : !u && c && !f ? i[s] = Di(a, {
        in: !1
      }) : u && c && _i(p) && (i[s] = Di(a, {
        onExited: n.bind(null, a),
        in: p.props.in,
        exit: ho(a, "exit", e),
        enter: ho(a, "enter", e)
      }));
    }
  }), i;
}
var yb = Object.values || function(e) {
  return Object.keys(e).map(function(t) {
    return e[t];
  });
}, bb = {
  component: "div",
  childFactory: function(t) {
    return t;
  }
}, pl = /* @__PURE__ */ function(e) {
  sp(t, e);
  function t(r, i) {
    var s;
    s = e.call(this, r, i) || this;
    var a = s.handleExited.bind(fb(s));
    return s.state = {
      contextValue: {
        isMounting: !0
      },
      handleExited: a,
      firstRender: !0
    }, s;
  }
  var n = t.prototype;
  return n.componentDidMount = function() {
    this.mounted = !0, this.setState({
      contextValue: {
        isMounting: !1
      }
    });
  }, n.componentWillUnmount = function() {
    this.mounted = !1;
  }, t.getDerivedStateFromProps = function(i, s) {
    var a = s.children, c = s.handleExited, u = s.firstRender;
    return {
      children: u ? hb(i, c) : gb(i, a, c),
      firstRender: !1
    };
  }, n.handleExited = function(i, s) {
    var a = ul(this.props.children);
    i.key in a || (i.props.onExited && i.props.onExited(s), this.mounted && this.setState(function(c) {
      var u = Vi({}, c.children);
      return delete u[i.key], {
        children: u
      };
    }));
  }, n.render = function() {
    var i = this.props, s = i.component, a = i.childFactory, c = ip(i, ["component", "childFactory"]), u = this.state.contextValue, p = yb(this.state.children).map(a);
    return delete c.appear, delete c.enter, delete c.exit, s === null ? /* @__PURE__ */ Ln.createElement(Yi.Provider, {
      value: u
    }, p) : /* @__PURE__ */ Ln.createElement(Yi.Provider, {
      value: u
    }, /* @__PURE__ */ Ln.createElement(s, c, p));
  }, t;
}(Ln.Component);
pl.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * `<TransitionGroup>` renders a `<div>` by default. You can change this
   * behavior by providing a `component` prop.
   * If you use React v16+ and would like to avoid a wrapping `<div>` element
   * you can pass in `component={null}`. This is useful if the wrapping div
   * borks your css styles.
   */
  component: o.any,
  /**
   * A set of `<Transition>` components, that are toggled `in` and out as they
   * leave. the `<TransitionGroup>` will inject specific transition props, so
   * remember to spread them through if you are wrapping the `<Transition>` as
   * with our `<Fade>` example.
   *
   * While this component is meant for multiple `Transition` or `CSSTransition`
   * children, sometimes you may want to have a single transition child with
   * content that you want to be transitioned out and in when you change it
   * (e.g. routes, images etc.) In that case you can change the `key` prop of
   * the transition child as you change its content, this will cause
   * `TransitionGroup` to transition the child out and back in.
   */
  children: o.node,
  /**
   * A convenience prop that enables or disables appear animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  appear: o.bool,
  /**
   * A convenience prop that enables or disables enter animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  enter: o.bool,
  /**
   * A convenience prop that enables or disables exit animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  exit: o.bool,
  /**
   * You may need to apply reactive updates to a child as it is exiting.
   * This is generally done by using `cloneElement` however in the case of an exiting
   * child the element has already been removed and not accessible to the consumer.
   *
   * If you do need to update a child as it leaves you can provide a `childFactory`
   * to wrap every child, even the ones that are leaving.
   *
   * @type Function(child: ReactElement) -> ReactElement
   */
  childFactory: o.func
} : {};
pl.defaultProps = bb;
const nd = {};
function ap(e, t) {
  const n = v.useRef(nd);
  return n.current === nd && (n.current = e(t)), n;
}
const vb = [];
function xb(e) {
  v.useEffect(e, vb);
}
class Is {
  constructor() {
    So(this, "currentId", null);
    So(this, "clear", () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    });
    So(this, "disposeEffect", () => this.clear);
  }
  static create() {
    return new Is();
  }
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  start(t, n) {
    this.clear(), this.currentId = setTimeout(() => {
      this.currentId = null, n();
    }, t);
  }
}
function Fn() {
  const e = ap(Is.create).current;
  return xb(e.disposeEffect), e;
}
function Cb(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function wb(e, t, n, r, i) {
  const s = e[t], a = i || t;
  if (s == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let c;
  return typeof s == "function" && !Cb(s) && (c = "Did you accidentally provide a plain function component instead?"), s === v.Fragment && (c = "Did you accidentally provide a React.Fragment instead?"), c !== void 0 ? new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const fl = kn(o.elementType, wb), lp = (e) => e.scrollTop;
function St(e, t) {
  return (n) => {
    if (t) {
      const r = e.current;
      n === void 0 ? t(r) : t(r, n);
    }
  };
}
function cp(e, t, n, r, i, s) {
  const a = e === "exited" && !t ? r : n[e] || n.exited;
  return i || s ? {
    ...a,
    ...i,
    ...s
  } : a;
}
function Ko(e, t) {
  const {
    timeout: n,
    easing: r,
    style: i = {}
  } = e;
  return {
    duration: i.transitionDuration ?? (typeof n == "number" ? n : n[t.mode] || 0),
    easing: i.transitionTimingFunction ?? (typeof r == "object" ? r[t.mode] : r),
    delay: i.transitionDelay
  };
}
function od(...e) {
  return e.reduce((t, n) => n == null ? t : function(...i) {
    t.apply(this, i), n.apply(this, i);
  }, () => {
  });
}
function Sb(e) {
  return be("MuiSvgIcon", e);
}
xe("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const Tb = (e) => {
  const {
    color: t,
    fontSize: n,
    classes: r
  } = e, i = {
    root: ["root", t !== "inherit" && `color${ye(t)}`, `fontSize${ye(n)}`]
  };
  return Ce(i, Sb, r);
}, Eb = ee("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.color !== "inherit" && t[`color${ye(n.color)}`], t[`fontSize${ye(n.fontSize)}`]];
  }
})(ke(({
  theme: e
}) => {
  var t, n, r, i, s, a, c, u, p, f, g, b, m, x;
  return {
    userSelect: "none",
    width: "1em",
    height: "1em",
    display: "inline-block",
    flexShrink: 0,
    transition: (i = (t = e.transitions) == null ? void 0 : t.create) == null ? void 0 : i.call(t, "fill", {
      duration: (r = (n = (e.vars ?? e).transitions) == null ? void 0 : n.duration) == null ? void 0 : r.shorter
    }),
    variants: [
      {
        props: (h) => !h.hasSvgAsChild,
        style: {
          // the <svg> will define the property that has `currentColor`
          // for example heroicons uses fill="none" and stroke="currentColor"
          fill: "currentColor"
        }
      },
      {
        props: {
          fontSize: "inherit"
        },
        style: {
          fontSize: "inherit"
        }
      },
      {
        props: {
          fontSize: "small"
        },
        style: {
          fontSize: ((a = (s = e.typography) == null ? void 0 : s.pxToRem) == null ? void 0 : a.call(s, 20)) || "1.25rem"
        }
      },
      {
        props: {
          fontSize: "medium"
        },
        style: {
          fontSize: ((u = (c = e.typography) == null ? void 0 : c.pxToRem) == null ? void 0 : u.call(c, 24)) || "1.5rem"
        }
      },
      {
        props: {
          fontSize: "large"
        },
        style: {
          fontSize: ((f = (p = e.typography) == null ? void 0 : p.pxToRem) == null ? void 0 : f.call(p, 35)) || "2.1875rem"
        }
      },
      // TODO v5 deprecate color prop, v6 remove for sx
      ...Object.entries((e.vars ?? e).palette).filter(([, h]) => h && h.main).map(([h]) => {
        var S, R;
        return {
          props: {
            color: h
          },
          style: {
            color: (R = (S = (e.vars ?? e).palette) == null ? void 0 : S[h]) == null ? void 0 : R.main
          }
        };
      }),
      {
        props: {
          color: "action"
        },
        style: {
          color: (b = (g = (e.vars ?? e).palette) == null ? void 0 : g.action) == null ? void 0 : b.active
        }
      },
      {
        props: {
          color: "disabled"
        },
        style: {
          color: (x = (m = (e.vars ?? e).palette) == null ? void 0 : m.action) == null ? void 0 : x.disabled
        }
      },
      {
        props: {
          color: "inherit"
        },
        style: {
          color: void 0
        }
      }
    ]
  };
})), Xi = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiSvgIcon"
  }), {
    children: i,
    className: s,
    color: a = "inherit",
    component: c = "svg",
    fontSize: u = "medium",
    htmlColor: p,
    inheritViewBox: f = !1,
    titleAccess: g,
    viewBox: b = "0 0 24 24",
    ...m
  } = r, x = /* @__PURE__ */ v.isValidElement(i) && i.type === "svg", h = {
    ...r,
    color: a,
    component: c,
    fontSize: u,
    instanceFontSize: t.fontSize,
    inheritViewBox: f,
    viewBox: b,
    hasSvgAsChild: x
  }, S = {};
  f || (S.viewBox = b);
  const R = Tb(h);
  return /* @__PURE__ */ T(Eb, {
    as: c,
    className: le(R.root, s),
    focusable: "false",
    color: p,
    "aria-hidden": g ? void 0 : !0,
    role: g ? "img" : void 0,
    ref: n,
    ...S,
    ...m,
    ...x && i.props,
    ownerState: h,
    children: [x ? i.props.children : i, g ? /* @__PURE__ */ l("title", {
      children: g
    }) : null]
  });
});
process.env.NODE_ENV !== "production" && (Xi.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Node passed into the SVG element.
   */
  children: o.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: o.oneOfType([o.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), o.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: o.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: o.oneOfType([o.oneOf(["inherit", "large", "medium", "small"]), o.string]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: o.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: o.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: o.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: o.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: o.string
});
Xi.muiName = "SvgIcon";
function at(e, t) {
  function n(r, i) {
    return /* @__PURE__ */ l(Xi, {
      "data-testid": process.env.NODE_ENV !== "production" ? `${t}Icon` : void 0,
      ref: i,
      ...r,
      children: e
    });
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${t}Icon`), n.muiName = Xi.muiName, /* @__PURE__ */ v.memo(/* @__PURE__ */ v.forwardRef(n));
}
function dp(e, t = 166) {
  let n;
  function r(...i) {
    const s = () => {
      e.apply(this, i);
    };
    clearTimeout(n), n = setTimeout(s, t);
  }
  return r.clear = () => {
    clearTimeout(n);
  }, r;
}
function jn(e) {
  var n;
  let t = e.activeElement;
  for (; ((n = t == null ? void 0 : t.shadowRoot) == null ? void 0 : n.activeElement) != null; )
    t = t.shadowRoot.activeElement;
  return t;
}
function Et(e) {
  return e && e.ownerDocument || document;
}
function Vn(e) {
  return Et(e).defaultView || window;
}
function Na(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
function Ob(e, t, n, r, i) {
  if (process.env.NODE_ENV === "production")
    return null;
  const s = i || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${s}\` is not supported. Please remove it.`) : null;
}
function Ji(e) {
  const {
    controlled: t,
    default: n,
    name: r,
    state: i = "value"
  } = e, {
    current: s
  } = v.useRef(t !== void 0), [a, c] = v.useState(n), u = s ? t : a;
  if (process.env.NODE_ENV !== "production") {
    v.useEffect(() => {
      s !== (t !== void 0) && console.error([`MUI: A component is changing the ${s ? "" : "un"}controlled ${i} state of ${r} to be ${s ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${r} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [i, r, t]);
    const {
      current: f
    } = v.useRef(n);
    v.useEffect(() => {
      !s && JSON.stringify(n) !== JSON.stringify(f) && console.error([`MUI: A component is changing the default ${i} state of an uncontrolled ${r} after being initialized. To suppress this warning opt to use a controlled ${r}.`].join(`
`));
    }, [JSON.stringify(n)]);
  }
  const p = v.useCallback((f) => {
    s || c(f);
  }, []);
  return [u, p];
}
function Dt(e) {
  const t = v.useRef(e);
  return Tt(() => {
    t.current = e;
  }), v.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...n)
  )).current;
}
function ft(...e) {
  const t = v.useRef(void 0), n = v.useCallback((r) => {
    const i = e.map((s) => {
      if (s == null)
        return null;
      if (typeof s == "function") {
        const a = s, c = a(r);
        return typeof c == "function" ? c : () => {
          a(null);
        };
      }
      return s.current = r, () => {
        s.current = null;
      };
    });
    return () => {
      i.forEach((s) => s == null ? void 0 : s());
    };
  }, e);
  return v.useMemo(() => e.every((r) => r == null) ? null : (r) => {
    t.current && (t.current(), t.current = void 0), r != null && (t.current = n(r));
  }, e);
}
function up(e, t) {
  const n = e.charCodeAt(2);
  return e[0] === "o" && e[1] === "n" && n >= 65 && n <= 90 && typeof t == "function";
}
function Rb(e, t) {
  if (!e)
    return t;
  function n(a, c) {
    const u = {};
    return Object.keys(c).forEach((p) => {
      up(p, c[p]) && typeof a[p] == "function" && (u[p] = (...f) => {
        a[p](...f), c[p](...f);
      });
    }), u;
  }
  if (typeof e == "function" || typeof t == "function")
    return (a) => {
      const c = typeof t == "function" ? t(a) : t, u = typeof e == "function" ? e({
        ...a,
        ...c
      }) : e, p = le(a == null ? void 0 : a.className, c == null ? void 0 : c.className, u == null ? void 0 : u.className), f = n(u, c);
      return {
        ...c,
        ...u,
        ...f,
        ...!!p && {
          className: p
        },
        ...(c == null ? void 0 : c.style) && (u == null ? void 0 : u.style) && {
          style: {
            ...c.style,
            ...u.style
          }
        },
        ...(c == null ? void 0 : c.sx) && (u == null ? void 0 : u.sx) && {
          sx: [...Array.isArray(c.sx) ? c.sx : [c.sx], ...Array.isArray(u.sx) ? u.sx : [u.sx]]
        }
      };
    };
  const r = t, i = n(e, r), s = le(r == null ? void 0 : r.className, e == null ? void 0 : e.className);
  return {
    ...t,
    ...e,
    ...i,
    ...!!s && {
      className: s
    },
    ...(r == null ? void 0 : r.style) && (e == null ? void 0 : e.style) && {
      style: {
        ...r.style,
        ...e.style
      }
    },
    ...(r == null ? void 0 : r.sx) && (e == null ? void 0 : e.sx) && {
      sx: [...Array.isArray(r.sx) ? r.sx : [r.sx], ...Array.isArray(e.sx) ? e.sx : [e.sx]]
    }
  };
}
function Qi(e) {
  return typeof e == "string";
}
function pp(e, t, n) {
  return e === void 0 || Qi(e) ? t : {
    ...t,
    ownerState: {
      ...t.ownerState,
      ...n
    }
  };
}
function fp(e, t, n) {
  return typeof e == "function" ? e(t, n) : e;
}
function mp(e) {
  if (e === void 0)
    return {};
  const t = {};
  for (const n of Object.keys(e))
    up(n, e[n]) && (t[n] = e[n]);
  return t;
}
function rd(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((n) => !(n.match(/^on[A-Z]/) && typeof e[n] == "function")).forEach((n) => {
    t[n] = e[n];
  }), t;
}
function hp(e) {
  const {
    getSlotProps: t,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: i,
    className: s
  } = e;
  if (!t) {
    const m = le(n == null ? void 0 : n.className, s, i == null ? void 0 : i.className, r == null ? void 0 : r.className), x = {
      ...n == null ? void 0 : n.style,
      ...i == null ? void 0 : i.style,
      ...r == null ? void 0 : r.style
    }, h = {
      ...n,
      ...i,
      ...r
    };
    return m.length > 0 && (h.className = m), Object.keys(x).length > 0 && (h.style = x), {
      props: h,
      internalRef: void 0
    };
  }
  const a = mp({
    ...i,
    ...r
  }), c = rd(r), u = rd(i), p = t(a), f = le(p == null ? void 0 : p.className, n == null ? void 0 : n.className, s, i == null ? void 0 : i.className, r == null ? void 0 : r.className), g = {
    ...p == null ? void 0 : p.style,
    ...n == null ? void 0 : n.style,
    ...i == null ? void 0 : i.style,
    ...r == null ? void 0 : r.style
  }, b = {
    ...p,
    ...n,
    ...u,
    ...c
  };
  return f.length > 0 && (b.className = f), Object.keys(g).length > 0 && (b.style = g), {
    props: b,
    internalRef: p.ref
  };
}
function ge(e, t) {
  const {
    className: n,
    elementType: r,
    ownerState: i,
    externalForwardedProps: s,
    internalForwardedProps: a,
    shouldForwardComponentProp: c = !1,
    ...u
  } = t, {
    component: p,
    slots: f = {
      [e]: void 0
    },
    slotProps: g = {
      [e]: void 0
    },
    ...b
  } = s, m = f[e] || r, x = fp(g[e], i), {
    props: {
      component: h,
      ...S
    },
    internalRef: R
  } = hp({
    className: n,
    ...u,
    externalForwardedProps: e === "root" ? b : void 0,
    externalSlotProps: x
  }), k = ft(R, x == null ? void 0 : x.ref, t.ref), E = e === "root" ? h || p : h, w = pp(m, {
    ...e === "root" && !p && !f[e] && a,
    ...e !== "root" && !f[e] && a,
    ...S,
    ...E && !c && {
      as: E
    },
    ...E && c && {
      component: E
    },
    ref: k
  }, i);
  return [m, w];
}
function Nb(e) {
  return be("MuiCollapse", e);
}
xe("MuiCollapse", ["root", "horizontal", "vertical", "entered", "hidden", "wrapper", "wrapperInner"]);
const kb = (e) => {
  const {
    orientation: t,
    classes: n
  } = e;
  return Ce({
    root: ["root", t],
    entered: ["entered"],
    hidden: ["hidden"],
    wrapper: ["wrapper", t],
    wrapperInner: ["wrapperInner", t]
  }, Nb, n);
}, Pb = ee("div", {
  name: "MuiCollapse",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, t[n.orientation], n.state === "entered" && t.entered, n.state === "exited" && !n.in && n.collapsedSize === "0px" && t.hidden];
  }
})(ke(({
  theme: e
}) => ({
  height: 0,
  overflow: "hidden",
  transition: e.transitions.create("height"),
  variants: [{
    props: {
      orientation: "horizontal"
    },
    style: {
      height: "auto",
      width: 0,
      transition: e.transitions.create("width")
    }
  }, {
    props: {
      state: "entered"
    },
    style: {
      height: "auto",
      overflow: "visible"
    }
  }, {
    props: {
      state: "entered",
      orientation: "horizontal"
    },
    style: {
      width: "auto"
    }
  }, {
    props: ({
      ownerState: t
    }) => t.state === "exited" && !t.in && t.collapsedSize === "0px",
    style: {
      visibility: "hidden"
    }
  }]
}))), Ib = ee("div", {
  name: "MuiCollapse",
  slot: "Wrapper"
})({
  // Hack to get children with a negative margin to not falsify the height computation.
  display: "flex",
  width: "100%",
  variants: [{
    props: {
      orientation: "horizontal"
    },
    style: {
      width: "auto",
      height: "100%"
    }
  }]
}), $b = ee("div", {
  name: "MuiCollapse",
  slot: "WrapperInner"
})({
  width: "100%",
  variants: [{
    props: {
      orientation: "horizontal"
    },
    style: {
      width: "auto",
      height: "100%"
    }
  }]
}), Zi = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiCollapse"
  }), {
    addEndListener: i,
    children: s,
    className: a,
    collapsedSize: c = "0px",
    component: u,
    easing: p,
    in: f,
    onEnter: g,
    onEntered: b,
    onEntering: m,
    onExit: x,
    onExited: h,
    onExiting: S,
    orientation: R = "vertical",
    slots: k = {},
    slotProps: E = {},
    style: w,
    timeout: C = Ju.standard,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: N = hn,
    ...M
  } = r, D = {
    ...r,
    orientation: R,
    collapsedSize: c
  }, L = kb(D), B = rr(), I = Fn(), y = v.useRef(null), $ = v.useRef(), P = typeof c == "number" ? `${c}px` : c, A = R === "horizontal", F = A ? "width" : "height", W = v.useRef(null), H = ft(n, W), te = () => y.current ? y.current[A ? "clientWidth" : "clientHeight"] : 0, z = St(W, (Y, he) => {
    y.current && A && (y.current.style.position = "absolute"), Y.style[F] = P, g && g(Y, he);
  }), V = St(W, (Y, he) => {
    const Le = te();
    y.current && A && (y.current.style.position = "");
    const {
      duration: Re,
      easing: Ke
    } = Ko({
      style: w,
      timeout: C,
      easing: p
    }, {
      mode: "enter"
    });
    if (C === "auto") {
      const Se = B.transitions.getAutoHeightDuration(Le);
      Y.style.transitionDuration = `${Se}ms`, $.current = Se;
    } else
      Y.style.transitionDuration = typeof Re == "string" ? Re : `${Re}ms`;
    Y.style[F] = `${Le}px`, Y.style.transitionTimingFunction = Ke, m && m(Y, he);
  }), X = St(W, (Y, he) => {
    Y.style[F] = "auto", b && b(Y, he);
  }), re = St(W, (Y) => {
    Y.style[F] = `${te()}px`, x && x(Y);
  }), oe = St(W, h), ne = St(W, (Y) => {
    const he = te(), {
      duration: Le,
      easing: Re
    } = Ko({
      style: w,
      timeout: C,
      easing: p
    }, {
      mode: "exit"
    });
    if (C === "auto") {
      const Ke = B.transitions.getAutoHeightDuration(he);
      Y.style.transitionDuration = `${Ke}ms`, $.current = Ke;
    } else
      Y.style.transitionDuration = typeof Le == "string" ? Le : `${Le}ms`;
    Y.style[F] = P, Y.style.transitionTimingFunction = Re, S && S(Y);
  }), Q = (Y) => {
    C === "auto" && I.start($.current || 0, Y), i && i(W.current, Y);
  }, Z = {
    slots: k,
    slotProps: E,
    component: u
  }, [U, J] = ge("root", {
    ref: H,
    className: le(L.root, a),
    elementType: Pb,
    externalForwardedProps: Z,
    ownerState: D,
    additionalProps: {
      style: {
        [A ? "minWidth" : "minHeight"]: P,
        ...w
      }
    }
  }), [q, ce] = ge("wrapper", {
    ref: y,
    className: L.wrapper,
    elementType: Ib,
    externalForwardedProps: Z,
    ownerState: D
  }), [j, de] = ge("wrapperInner", {
    className: L.wrapperInner,
    elementType: $b,
    externalForwardedProps: Z,
    ownerState: D
  });
  return /* @__PURE__ */ l(N, {
    in: f,
    onEnter: z,
    onEntered: X,
    onEntering: V,
    onExit: re,
    onExited: oe,
    onExiting: ne,
    addEndListener: Q,
    nodeRef: W,
    timeout: C === "auto" ? null : C,
    ...M,
    children: (Y, {
      ownerState: he,
      ...Le
    }) => {
      const Re = {
        ...D,
        state: Y
      };
      return /* @__PURE__ */ l(U, {
        ...J,
        className: le(J.className, {
          entered: L.entered,
          exited: !f && P === "0px" && L.hidden
        }[Y]),
        ownerState: Re,
        ...Le,
        children: /* @__PURE__ */ l(q, {
          ...ce,
          ownerState: Re,
          children: /* @__PURE__ */ l(j, {
            ...de,
            ownerState: Re,
            children: s
          })
        })
      });
    }
  });
});
process.env.NODE_ENV !== "production" && (Zi.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: o.func,
  /**
   * The content node to be collapsed.
   */
  children: o.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * The width (horizontal) or height (vertical) of the container when collapsed.
   * @default '0px'
   */
  collapsedSize: o.oneOfType([o.number, o.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: fl,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: o.oneOfType([o.shape({
    enter: o.string,
    exit: o.string
  }), o.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: o.bool,
  /**
   * @ignore
   */
  onEnter: o.func,
  /**
   * @ignore
   */
  onEntered: o.func,
  /**
   * @ignore
   */
  onEntering: o.func,
  /**
   * @ignore
   */
  onExit: o.func,
  /**
   * @ignore
   */
  onExited: o.func,
  /**
   * @ignore
   */
  onExiting: o.func,
  /**
   * The transition orientation.
   * @default 'vertical'
   */
  orientation: o.oneOf(["horizontal", "vertical"]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: o.shape({
    root: o.oneOfType([o.func, o.object]),
    wrapper: o.oneOfType([o.func, o.object]),
    wrapperInner: o.oneOfType([o.func, o.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: o.shape({
    root: o.elementType,
    wrapper: o.elementType,
    wrapperInner: o.elementType
  }),
  /**
   * @ignore
   */
  style: o.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object]),
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default duration.standard
   */
  timeout: o.oneOfType([o.oneOf(["auto"]), o.number, o.shape({
    appear: o.number,
    enter: o.number,
    exit: o.number
  })])
});
Zi && (Zi.muiSupportAuto = !0);
function Ab(e) {
  const t = typeof e;
  switch (t) {
    case "number":
      return Number.isNaN(e) ? "NaN" : Number.isFinite(e) ? e !== Math.floor(e) ? "float" : "number" : "Infinity";
    case "object":
      return e === null ? "null" : e.constructor.name;
    default:
      return t;
  }
}
function gp(e, t, n, r) {
  const i = e[t];
  if (i == null || !Number.isInteger(i)) {
    const s = Ab(i);
    return new RangeError(`Invalid ${r} \`${t}\` of type \`${s}\` supplied to \`${n}\`, expected \`integer\`.`);
  }
  return null;
}
function yp(e, t, n, r) {
  return e[t] === void 0 ? null : gp(e, t, n, r);
}
function ka() {
  return null;
}
yp.isRequired = gp;
ka.isRequired = ka;
const bp = process.env.NODE_ENV === "production" ? ka : yp;
function Mb(e) {
  return be("MuiPaper", e);
}
xe("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const _b = (e) => {
  const {
    square: t,
    elevation: n,
    variant: r,
    classes: i
  } = e, s = {
    root: ["root", r, !t && "rounded", r === "elevation" && `elevation${n}`]
  };
  return Ce(s, Mb, i);
}, Db = ee("div", {
  name: "MuiPaper",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, t[n.variant], !n.square && t.rounded, n.variant === "elevation" && t[`elevation${n.elevation}`]];
  }
})(ke(({
  theme: e
}) => ({
  backgroundColor: (e.vars || e).palette.background.paper,
  color: (e.vars || e).palette.text.primary,
  transition: e.transitions.create("box-shadow"),
  variants: [{
    props: ({
      ownerState: t
    }) => !t.square,
    style: {
      borderRadius: e.shape.borderRadius
    }
  }, {
    props: {
      variant: "outlined"
    },
    style: {
      border: `1px solid ${(e.vars || e).palette.divider}`
    }
  }, {
    props: {
      variant: "elevation"
    },
    style: {
      boxShadow: "var(--Paper-shadow)",
      backgroundImage: "var(--Paper-overlay)"
    }
  }]
}))), dt = /* @__PURE__ */ v.forwardRef(function(t, n) {
  var m;
  const r = we({
    props: t,
    name: "MuiPaper"
  }), i = rr(), {
    className: s,
    component: a = "div",
    elevation: c = 1,
    square: u = !1,
    variant: p = "elevation",
    ...f
  } = r, g = {
    ...r,
    component: a,
    elevation: c,
    square: u,
    variant: p
  }, b = _b(g);
  return process.env.NODE_ENV !== "production" && i.shadows[c] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${c}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${c}]\` is defined.`].join(`
`)), /* @__PURE__ */ l(Db, {
    as: a,
    ownerState: g,
    className: le(b.root, s),
    ref: n,
    ...f,
    style: {
      ...p === "elevation" && {
        "--Paper-shadow": (i.vars || i).shadows[c],
        ...i.vars && {
          "--Paper-overlay": (m = i.vars.overlays) == null ? void 0 : m[c]
        },
        ...!i.vars && i.palette.mode === "dark" && {
          "--Paper-overlay": `linear-gradient(${qi("#fff", Ta(c))}, ${qi("#fff", Ta(c))})`
        }
      },
      ...f.style
    }
  });
});
process.env.NODE_ENV !== "production" && (dt.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: o.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: o.elementType,
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 1
   */
  elevation: kn(bp, (e) => {
    const {
      elevation: t,
      variant: n
    } = e;
    return t > 0 && n === "outlined" ? new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`) : null;
  }),
  /**
   * If `true`, rounded corners are disabled.
   * @default false
   */
  square: o.bool,
  /**
   * @ignore
   */
  style: o.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object]),
  /**
   * The variant to use.
   * @default 'elevation'
   */
  variant: o.oneOfType([o.oneOf(["elevation", "outlined"]), o.string])
});
const ml = /* @__PURE__ */ v.createContext({});
process.env.NODE_ENV !== "production" && (ml.displayName = "AccordionContext");
function Lb(e) {
  return be("MuiAccordion", e);
}
const vi = xe("MuiAccordion", ["root", "heading", "rounded", "expanded", "disabled", "gutters", "region"]), Fb = (e) => {
  const {
    classes: t,
    square: n,
    expanded: r,
    disabled: i,
    disableGutters: s
  } = e;
  return Ce({
    root: ["root", !n && "rounded", r && "expanded", i && "disabled", !s && "gutters"],
    heading: ["heading"],
    region: ["region"]
  }, Lb, t);
}, jb = ee(dt, {
  name: "MuiAccordion",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [{
      [`& .${vi.region}`]: t.region
    }, t.root, !n.square && t.rounded, !n.disableGutters && t.gutters];
  }
})(ke(({
  theme: e
}) => {
  const t = {
    duration: e.transitions.duration.shortest
  };
  return {
    position: "relative",
    transition: e.transitions.create(["margin"], t),
    overflowAnchor: "none",
    // Keep the same scrolling position
    "&::before": {
      position: "absolute",
      left: 0,
      top: -1,
      right: 0,
      height: 1,
      content: '""',
      opacity: 1,
      backgroundColor: (e.vars || e).palette.divider,
      transition: e.transitions.create(["opacity", "background-color"], t)
    },
    "&:first-of-type": {
      "&::before": {
        display: "none"
      }
    },
    [`&.${vi.expanded}`]: {
      "&::before": {
        opacity: 0
      },
      "&:first-of-type": {
        marginTop: 0
      },
      "&:last-of-type": {
        marginBottom: 0
      },
      "& + &": {
        "&::before": {
          display: "none"
        }
      }
    },
    [`&.${vi.disabled}`]: {
      backgroundColor: (e.vars || e).palette.action.disabledBackground
    }
  };
}), ke(({
  theme: e
}) => ({
  variants: [{
    props: (t) => !t.square,
    style: {
      borderRadius: 0,
      "&:first-of-type": {
        borderTopLeftRadius: (e.vars || e).shape.borderRadius,
        borderTopRightRadius: (e.vars || e).shape.borderRadius
      },
      "&:last-of-type": {
        borderBottomLeftRadius: (e.vars || e).shape.borderRadius,
        borderBottomRightRadius: (e.vars || e).shape.borderRadius,
        // Fix a rendering issue on Edge
        "@supports (-ms-ime-align: auto)": {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0
        }
      }
    }
  }, {
    props: (t) => !t.disableGutters,
    style: {
      [`&.${vi.expanded}`]: {
        margin: "16px 0"
      }
    }
  }]
}))), Bb = ee("h3", {
  name: "MuiAccordion",
  slot: "Heading"
})({
  all: "unset"
}), Wb = ee("div", {
  name: "MuiAccordion",
  slot: "Region"
})({}), vp = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiAccordion"
  }), {
    children: i,
    className: s,
    defaultExpanded: a = !1,
    disabled: c = !1,
    disableGutters: u = !1,
    expanded: p,
    onChange: f,
    slots: g = {},
    slotProps: b = {},
    ...m
  } = r, [x, h] = Ji({
    controlled: p,
    default: a,
    name: "Accordion",
    state: "expanded"
  }), S = v.useCallback((A) => {
    h(!x), f && f(A, !x);
  }, [x, f, h]), [R, ...k] = v.Children.toArray(i), E = v.useMemo(() => ({
    expanded: x,
    disabled: c,
    disableGutters: u,
    toggle: S
  }), [x, c, u, S]), w = {
    ...r,
    disabled: c,
    disableGutters: u,
    expanded: x
  }, C = Fb(w), N = {
    slots: g,
    slotProps: b
  }, [M, D] = ge("root", {
    elementType: jb,
    externalForwardedProps: {
      ...N,
      ...m
    },
    className: le(C.root, s),
    shouldForwardComponentProp: !0,
    ownerState: w,
    ref: n
  }), [L, B] = ge("heading", {
    elementType: Bb,
    externalForwardedProps: N,
    className: C.heading,
    ownerState: w
  }), [I, y] = ge("transition", {
    elementType: Zi,
    externalForwardedProps: N,
    ownerState: w
  }), [$, P] = ge("region", {
    elementType: Wb,
    externalForwardedProps: N,
    ownerState: w,
    className: C.region,
    additionalProps: {
      "aria-labelledby": R.props.id,
      id: R.props["aria-controls"],
      role: "region"
    }
  });
  return /* @__PURE__ */ T(M, {
    ...D,
    children: [/* @__PURE__ */ l(L, {
      ...B,
      children: /* @__PURE__ */ l(ml.Provider, {
        value: E,
        children: R
      })
    }), /* @__PURE__ */ l(I, {
      in: x,
      timeout: "auto",
      ...y,
      children: /* @__PURE__ */ l($, {
        ...P,
        children: k
      })
    })]
  });
});
process.env.NODE_ENV !== "production" && (vp.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: kn(o.node.isRequired, (e) => {
    const t = v.Children.toArray(e.children)[0];
    return Ho.isFragment(t) ? new Error("MUI: The Accordion doesn't accept a Fragment as a child. Consider providing an array instead.") : /* @__PURE__ */ v.isValidElement(t) ? null : new Error("MUI: Expected the first child of Accordion to be a valid element.");
  }),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * If `true`, expands the accordion by default.
   * @default false
   */
  defaultExpanded: o.bool,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: o.bool,
  /**
   * If `true`, it removes the margin between two expanded accordion items and prevents the increased height when expanded.
   * @default false
   */
  disableGutters: o.bool,
  /**
   * If `true`, expands the accordion, otherwise collapses it.
   * Setting this prop enables control over the accordion.
   */
  expanded: o.bool,
  /**
   * Callback fired when the expand/collapse state is changed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {boolean} expanded The `expanded` state of the accordion.
   */
  onChange: o.func,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: o.shape({
    heading: o.oneOfType([o.func, o.object]),
    region: o.oneOfType([o.func, o.object]),
    root: o.oneOfType([o.func, o.object]),
    transition: o.oneOfType([o.func, o.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: o.shape({
    heading: o.elementType,
    region: o.elementType,
    root: o.elementType,
    transition: o.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object])
});
function zb(e) {
  return be("MuiAccordionDetails", e);
}
xe("MuiAccordionDetails", ["root"]);
const Vb = (e) => {
  const {
    classes: t
  } = e;
  return Ce({
    root: ["root"]
  }, zb, t);
}, Ub = ee("div", {
  name: "MuiAccordionDetails",
  slot: "Root"
})(ke(({
  theme: e
}) => ({
  padding: e.spacing(1, 2, 2)
}))), xp = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiAccordionDetails"
  }), {
    className: i,
    ...s
  } = r, a = r, c = Vb(a);
  return /* @__PURE__ */ l(Ub, {
    className: le(c.root, i),
    ref: n,
    ownerState: a,
    ...s
  });
});
process.env.NODE_ENV !== "production" && (xp.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: o.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object])
});
const gn = o.oneOfType([o.func, o.object]);
function es(e) {
  try {
    return e.matches(":focus-visible");
  } catch {
    process.env.NODE_ENV !== "production" && !window.navigator.userAgent.includes("jsdom") && console.warn(["MUI: The `:focus-visible` pseudo class is not supported in this browser.", "Some components rely on this feature to work properly."].join(`
`));
  }
  return !1;
}
function Gb(e) {
  const {
    focusableWhenDisabled: t,
    disabled: n,
    composite: r = !1,
    tabIndex: i = 0,
    isNativeButton: s
  } = e, a = r && t !== !1, c = r && t === !1;
  return v.useMemo(() => {
    const p = {
      // allow Tabbing away from focusableWhenDisabled elements
      onKeyDown(f) {
        n && t && f.key !== "Tab" && f.preventDefault();
      }
    };
    return r || (p.tabIndex = i, !s && n && (p.tabIndex = t ? i : -1)), (s && (t || a) || !s && n) && (p["aria-disabled"] = n), s && (!t || c) && (p.disabled = n), p;
  }, [r, n, t, a, c, s, i]);
}
const Hb = {};
function qb(e) {
  const {
    nativeButton: t,
    nativeButtonProp: n,
    internalNativeButton: r = t,
    allowInferredHostMismatch: i = !1,
    disabled: s,
    type: a,
    hasFormAction: c = !1,
    tabIndex: u = 0,
    focusableWhenDisabled: p,
    stopEventPropagation: f = !1,
    onBeforeKeyDown: g,
    onBeforeKeyUp: b
  } = e, m = v.useRef(null), x = p === !0, h = Gb({
    focusableWhenDisabled: x,
    disabled: s,
    isNativeButton: t,
    tabIndex: u
  });
  process.env.NODE_ENV !== "production" && v.useEffect(() => {
    const E = m.current;
    if (E == null)
      return;
    const w = E.tagName === "BUTTON";
    if (n !== void 0) {
      n && !w && console.error("MUI: A component that acts as a button expected a native <button> because the `nativeButton` prop is true. Rendering a non-<button> removes native button semantics, which can impact forms and accessibility. Render a real <button> or set `nativeButton` to `false`."), !n && w && console.error("MUI: A component that acts as a button expected a non-<button> because the `nativeButton` prop is false. Rendering a <button> keeps native behavior while additionally applies non-native attributes and handlers, which can add unintended extra attributes (such as `role` or `aria-disabled`). Render a non-<button> such as <div>, or set `nativeButton` to `true`.");
      return;
    }
    i || (r && !w && console.error("MUI: A component rendering a native <button> resolved to a non-<button> element, but `nativeButton={false}` was not specified and the resolved root is a non-<button>. When rendering a custom component, set `nativeButton={false}` explicitly or render a <button> element."), !r && w && console.error("MUI: A component that acts as a non-native button resolved to a native <button> element, but `nativeButton={true}` was not specified. When rendering a custom component, set `nativeButton={true}` explicitly or render a non-<button> element."));
  }, [i, r, n]);
  const S = v.useCallback(() => {
    const E = m.current;
    return E == null ? t : E.tagName === "BUTTON" ? !0 : !!(E.tagName === "A" && E.href);
  }, [t]), R = v.useMemo(() => {
    const E = x ? {} : {
      tabIndex: s ? -1 : u
    };
    return t ? (E.type = a === void 0 && !c ? "button" : a, x || (E.disabled = s)) : (E.role = "button", !x && s && (E["aria-disabled"] = s)), x ? {
      ...E,
      ...h
    } : E;
  }, [s, x, h, c, t, u, a]);
  return {
    getButtonProps: v.useCallback((E = Hb) => {
      const {
        onClick: w,
        onKeyDown: C,
        onKeyUp: N,
        ...M
      } = E;
      return {
        ...R,
        ...M,
        onClick: (I) => {
          if (f && I.stopPropagation(), s) {
            I.preventDefault();
            return;
          }
          w == null || w(I);
        },
        onKeyDown: (I) => {
          if (x && h.onKeyDown(I), !s && (g == null || g(I), C == null || C(I), !(I.target !== I.currentTarget || S()))) {
            if (I.key === " ") {
              I.preventDefault();
              return;
            }
            I.key === "Enter" && (I.preventDefault(), I.currentTarget.click());
          }
        },
        onKeyUp: (I) => {
          s || (b == null || b(I), N == null || N(I), I.target === I.currentTarget && !S() && I.key === " " && !I.defaultPrevented && I.currentTarget.click());
        }
      };
    }, [R, s, x, h, S, g, b, f]),
    rootRef: m
  };
}
class ts {
  constructor() {
    So(this, "mountEffect", () => {
      this.shouldMount && !this.didMount && this.ref.current !== null && (this.didMount = !0, this.mounted.resolve());
    });
    this.ref = {
      current: null
    }, this.mounted = null, this.didMount = !1, this.shouldMount = !1, this.setShouldMount = null;
  }
  /** React ref to the ripple instance */
  /** If the ripple component should be mounted */
  /** Promise that resolves when the ripple component is mounted */
  /** If the ripple component has been mounted */
  /** React state hook setter */
  static create() {
    return new ts();
  }
  static use() {
    const t = ap(ts.create).current, [n, r] = v.useState(!1);
    return t.shouldMount = n, t.setShouldMount = r, v.useEffect(t.mountEffect, [n]), t;
  }
  mount() {
    return this.mounted || (this.mounted = Yb(), this.shouldMount = !0, this.setShouldMount(this.shouldMount)), this.mounted;
  }
  /* Ripple API */
  start(...t) {
    this.mount().then(() => {
      var n;
      return (n = this.ref.current) == null ? void 0 : n.start(...t);
    });
  }
  stop(...t) {
    this.mount().then(() => {
      var n;
      return (n = this.ref.current) == null ? void 0 : n.stop(...t);
    });
  }
  pulsate(...t) {
    this.mount().then(() => {
      var n;
      return (n = this.ref.current) == null ? void 0 : n.pulsate(...t);
    });
  }
}
function Kb() {
  return ts.use();
}
function Yb() {
  let e, t;
  const n = new Promise((r, i) => {
    e = r, t = i;
  });
  return n.resolve = e, n.reject = t, n;
}
function Cp(e) {
  const {
    className: t,
    classes: n,
    pulsate: r = !1,
    rippleX: i,
    rippleY: s,
    rippleSize: a,
    in: c,
    onExited: u,
    timeout: p
  } = e, [f, g] = v.useState(!1), b = le(t, n.ripple, n.rippleVisible, r && n.ripplePulsate), m = {
    width: a,
    height: a,
    top: -(a / 2) + s,
    left: -(a / 2) + i
  }, x = le(n.child, f && n.childLeaving, r && n.childPulsate);
  return !c && !f && g(!0), v.useEffect(() => {
    if (!c && u != null) {
      const h = setTimeout(u, p);
      return () => {
        clearTimeout(h);
      };
    }
  }, [u, c, p]), /* @__PURE__ */ l("span", {
    className: b,
    style: m,
    children: /* @__PURE__ */ l("span", {
      className: x
    })
  });
}
process.env.NODE_ENV !== "production" && (Cp.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object.isRequired,
  className: o.string,
  /**
   * @ignore - injected from TransitionGroup
   */
  in: o.bool,
  /**
   * @ignore - injected from TransitionGroup
   */
  onExited: o.func,
  /**
   * If `true`, the ripple pulsates, typically indicating the keyboard focus state of an element.
   */
  pulsate: o.bool,
  /**
   * Diameter of the ripple.
   */
  rippleSize: o.number,
  /**
   * Horizontal position of the ripple center.
   */
  rippleX: o.number,
  /**
   * Vertical position of the ripple center.
   */
  rippleY: o.number,
  /**
   * exit delay
   */
  timeout: o.number.isRequired
});
const tn = xe("MuiTouchRipple", ["root", "ripple", "rippleVisible", "ripplePulsate", "child", "childLeaving", "childPulsate"]), Pa = 550, Xb = 80, Jb = Jr`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`, Qb = Jr`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`, Zb = Jr`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`, ev = ee("span", {
  name: "MuiTouchRipple",
  slot: "Root"
})({
  overflow: "hidden",
  pointerEvents: "none",
  position: "absolute",
  zIndex: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  borderRadius: "inherit"
}), tv = ee(Cp, {
  name: "MuiTouchRipple",
  slot: "Ripple"
})`
  opacity: 0;
  position: absolute;

  &.${tn.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${Jb};
    animation-duration: ${Pa}ms;
    animation-timing-function: ${({
  theme: e
}) => e.transitions.easing.easeInOut};
  }

  &.${tn.ripplePulsate} {
    animation-duration: ${({
  theme: e
}) => e.transitions.duration.shorter}ms;
  }

  & .${tn.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${tn.childLeaving} {
    opacity: 0;
    animation-name: ${Qb};
    animation-duration: ${Pa}ms;
    animation-timing-function: ${({
  theme: e
}) => e.transitions.easing.easeInOut};
  }

  & .${tn.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${Zb};
    animation-duration: 2500ms;
    animation-timing-function: ${({
  theme: e
}) => e.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`, wp = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiTouchRipple"
  }), {
    center: i = !1,
    classes: s = {},
    className: a,
    ...c
  } = r, [u, p] = v.useState([]), f = v.useRef(0), g = v.useRef(null);
  v.useEffect(() => {
    g.current && (g.current(), g.current = null);
  }, [u]);
  const b = v.useRef(!1), m = Fn(), x = v.useRef(null), h = v.useRef(null), S = v.useCallback((w) => {
    const {
      pulsate: C,
      rippleX: N,
      rippleY: M,
      rippleSize: D,
      cb: L
    } = w;
    p((B) => [...B, /* @__PURE__ */ l(tv, {
      classes: {
        ripple: le(s.ripple, tn.ripple),
        rippleVisible: le(s.rippleVisible, tn.rippleVisible),
        ripplePulsate: le(s.ripplePulsate, tn.ripplePulsate),
        child: le(s.child, tn.child),
        childLeaving: le(s.childLeaving, tn.childLeaving),
        childPulsate: le(s.childPulsate, tn.childPulsate)
      },
      timeout: Pa,
      pulsate: C,
      rippleX: N,
      rippleY: M,
      rippleSize: D
    }, f.current)]), f.current += 1, g.current = L;
  }, [s]), R = v.useCallback((w = {}, C = {}, N = () => {
  }) => {
    const {
      pulsate: M = !1,
      center: D = i || C.pulsate,
      fakeElement: L = !1
      // For test purposes
    } = C;
    if ((w == null ? void 0 : w.type) === "mousedown" && b.current) {
      b.current = !1;
      return;
    }
    (w == null ? void 0 : w.type) === "touchstart" && (b.current = !0);
    const B = L ? null : h.current, I = B ? B.getBoundingClientRect() : {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    };
    let y, $, P;
    if (D || w === void 0 || w.clientX === 0 && w.clientY === 0 || !w.clientX && !w.touches)
      y = Math.round(I.width / 2), $ = Math.round(I.height / 2);
    else {
      const {
        clientX: A,
        clientY: F
      } = w.touches && w.touches.length > 0 ? w.touches[0] : w;
      y = Math.round(A - I.left), $ = Math.round(F - I.top);
    }
    if (D)
      P = Math.sqrt((2 * I.width ** 2 + I.height ** 2) / 3), P % 2 === 0 && (P += 1);
    else {
      const A = Math.max(Math.abs((B ? B.clientWidth : 0) - y), y) * 2 + 2, F = Math.max(Math.abs((B ? B.clientHeight : 0) - $), $) * 2 + 2;
      P = Math.sqrt(A ** 2 + F ** 2);
    }
    w != null && w.touches ? x.current === null && (x.current = () => {
      S({
        pulsate: M,
        rippleX: y,
        rippleY: $,
        rippleSize: P,
        cb: N
      });
    }, m.start(Xb, () => {
      x.current && (x.current(), x.current = null);
    })) : S({
      pulsate: M,
      rippleX: y,
      rippleY: $,
      rippleSize: P,
      cb: N
    });
  }, [i, S, m]), k = v.useCallback(() => {
    R({}, {
      pulsate: !0
    });
  }, [R]), E = v.useCallback((w, C) => {
    if (m.clear(), (w == null ? void 0 : w.type) === "touchend" && x.current) {
      x.current(), x.current = null, m.start(0, () => {
        E(w, C);
      });
      return;
    }
    x.current = null, p((N) => N.length > 0 ? N.slice(1) : N), g.current = C;
  }, [m]);
  return v.useImperativeHandle(n, () => ({
    pulsate: k,
    start: R,
    stop: E
  }), [k, R, E]), /* @__PURE__ */ l(ev, {
    className: le(tn.root, s.root, a),
    ref: h,
    ...c,
    children: /* @__PURE__ */ l(pl, {
      component: null,
      exit: !0,
      children: u
    })
  });
});
process.env.NODE_ENV !== "production" && (wp.propTypes = {
  /**
   * If `true`, the ripple starts at the center of the component
   * rather than at the point of interaction.
   */
  center: o.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string
});
function nv(e) {
  return be("MuiButtonBase", e);
}
const ov = xe("MuiButtonBase", ["root", "disabled", "focusVisible"]), rv = (e) => {
  const {
    disabled: t,
    focusVisible: n,
    focusVisibleClassName: r,
    suppressFocusVisible: i,
    classes: s
  } = e, c = Ce({
    root: ["root", t && "disabled", n && !i && "focusVisible"]
  }, nv, s);
  return n && !i && r && (c.root += ` ${r}`), c;
}, iv = ee("button", {
  name: "MuiButtonBase",
  slot: "Root"
})({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxSizing: "border-box",
  WebkitTapHighlightColor: "transparent",
  backgroundColor: "transparent",
  // Reset default value
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0,
  border: 0,
  margin: 0,
  // Remove the margin in Safari
  borderRadius: 0,
  padding: 0,
  // Remove the padding in Firefox
  cursor: "pointer",
  userSelect: "none",
  verticalAlign: "middle",
  MozAppearance: "none",
  // Reset
  WebkitAppearance: "none",
  // Reset
  textDecoration: "none",
  // So we take precedent over the style of a native <a /> element.
  color: "inherit",
  "&::-moz-focus-inner": {
    borderStyle: "none"
    // Remove Firefox dotted outline.
  },
  [`&.${ov.disabled}`]: {
    pointerEvents: "none",
    // Disable link interactions
    cursor: "default"
  },
  "@media print": {
    colorAdjust: "exact"
  }
}), Zn = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiButtonBase"
  }), {
    action: i,
    centerRipple: s = !1,
    children: a,
    className: c,
    component: u = "button",
    disabled: p = !1,
    disableRipple: f = !1,
    disableTouchRipple: g = !1,
    focusRipple: b = !1,
    focusVisibleClassName: m,
    /* eslint-disable react/prop-types */
    // replaces internal handling in Chip, other components can opt-in individually to use this in the future
    focusableWhenDisabled: x,
    // escape hatch to suppress the focusVisible state and callback
    // used by anchored <Menu>s to to suppress focus visible styling when opened with a pointer
    suppressFocusVisible: h = !1,
    // private prop to allow native vs non-native button props to be resolved before mount
    internalNativeButton: S,
    /* eslint-enable react/prop-types */
    LinkComponent: R = "a",
    nativeButton: k,
    onBlur: E,
    onClick: w,
    onContextMenu: C,
    onDragLeave: N,
    onFocus: M,
    onFocusVisible: D,
    onKeyDown: L,
    onKeyUp: B,
    onMouseDown: I,
    onMouseLeave: y,
    onMouseUp: $,
    onTouchEnd: P,
    onTouchMove: A,
    onTouchStart: F,
    tabIndex: W = 0,
    TouchRippleProps: H,
    touchRippleRef: te,
    type: z,
    ...V
  } = r, X = !!(V.href || V.to), re = !!V.formAction;
  let oe = u;
  oe === "button" && X && (oe = R);
  const ne = typeof oe == "string" ? oe === "button" : S ?? !1, Q = k ?? ne, Z = Kb(), U = ft(Z.ref, te), [J, q] = v.useState(!1);
  (p || h) && J && q(!1);
  const ce = Dt((Ee) => {
    b && !Ee.repeat && J && Ee.key === " " && Z.stop(Ee, () => {
      Z.start(Ee);
    });
  }), j = Dt((Ee) => {
    b && Ee.key === " " && J && !Ee.defaultPrevented && Z.stop(Ee, () => {
      Z.pulsate(Ee);
    });
  }), {
    getButtonProps: de,
    rootRef: Y
  } = qb({
    nativeButton: Q,
    nativeButtonProp: k,
    internalNativeButton: ne,
    allowInferredHostMismatch: X || typeof oe == "string",
    disabled: p,
    type: z,
    hasFormAction: re,
    tabIndex: W,
    onBeforeKeyDown: ce,
    onBeforeKeyUp: j
  }), {
    onClick: he,
    onKeyDown: Le,
    onKeyUp: Re,
    ...Ke
  } = de({
    onClick: w,
    onKeyDown: L,
    onKeyUp: B
  });
  v.useImperativeHandle(i, () => ({
    focusVisible: () => {
      q(!0), Y.current.focus();
    }
  }), [Y]);
  const Se = Z.shouldMount && !f && !p;
  v.useEffect(() => {
    J && b && !f && Z.pulsate();
  }, [f, b, J, Z]);
  const Pe = Mn(Z, "start", I, g), Ye = Mn(Z, "stop", C, g), it = Mn(Z, "stop", N, g), Fe = Mn(Z, "stop", $, g), Ae = Mn(Z, "stop", (Ee) => {
    J && Ee.preventDefault(), y && y(Ee);
  }, g), Me = Mn(Z, "start", F, g), ot = Mn(Z, "stop", P, g), _e = Mn(Z, "stop", A, g), $e = Mn(Z, "stop", (Ee) => {
    es(Ee.target) || q(!1), E && E(Ee);
  }, !1), rt = Dt((Ee) => {
    Y.current || (Y.current = Ee.currentTarget), !h && es(Ee.target) && (q(!0), D && D(Ee)), M && M(Ee);
  }), ue = {};
  X && (ue.tabIndex = p ? -1 : W, p && (ue["aria-disabled"] = p), ue.type = z);
  const Te = ft(n, Y), lt = {
    ...r,
    centerRipple: s,
    component: u,
    disabled: p,
    disableRipple: f,
    disableTouchRipple: g,
    focusRipple: b,
    suppressFocusVisible: h,
    tabIndex: W,
    focusVisible: J
  }, st = rv(lt);
  return /* @__PURE__ */ T(iv, {
    as: oe,
    className: le(st.root, c),
    ownerState: lt,
    onBlur: $e,
    onClick: he,
    onContextMenu: Ye,
    onFocus: rt,
    onKeyDown: Le,
    onKeyUp: Re,
    onMouseDown: Pe,
    onMouseLeave: Ae,
    onMouseUp: Fe,
    onDragLeave: it,
    onTouchEnd: ot,
    onTouchMove: _e,
    onTouchStart: Me,
    ref: Te,
    ...X ? ue : Ke,
    ...V,
    children: [a, Se ? /* @__PURE__ */ l(wp, {
      ref: U,
      center: s,
      ...H
    }) : null]
  });
});
function Mn(e, t, n, r = !1) {
  return Dt((i) => (n && n(i), r || e[t](i), !0));
}
process.env.NODE_ENV !== "production" && (Zn.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports `focusVisible()` action.
   */
  action: gn,
  /**
   * If `true`, the ripples are centered.
   * They won't start at the cursor interaction position.
   * @default false
   */
  centerRipple: o.bool,
  /**
   * The content of the component.
   */
  children: o.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: fl,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: o.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: o.bool,
  /**
   * If `true`, the touch ripple effect is disabled.
   * @default false
   */
  disableTouchRipple: o.bool,
  /**
   * If `true`, the base button will have a keyboard focus ripple.
   * @default false
   */
  focusRipple: o.bool,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: o.string,
  /**
   * @ignore
   */
  formAction: o.oneOfType([o.func, o.string]),
  /**
   * @ignore
   */
  href: o.any,
  /**
   * The component used to render a link when the `href` prop is provided.
   * @default 'a'
   */
  LinkComponent: o.elementType,
  /**
   * Whether the custom component is expected to render a native `<button>` element
   * when passing a React component to the `component` or `slots` prop.
   */
  nativeButton: o.bool,
  /**
   * @ignore
   */
  onBlur: o.func,
  /**
   * @ignore
   */
  onClick: o.func,
  /**
   * @ignore
   */
  onContextMenu: o.func,
  /**
   * @ignore
   */
  onDragLeave: o.func,
  /**
   * @ignore
   */
  onFocus: o.func,
  /**
   * Callback fired when the component is focused with a keyboard.
   * We trigger a `onFocus` callback too.
   */
  onFocusVisible: o.func,
  /**
   * @ignore
   */
  onKeyDown: o.func,
  /**
   * @ignore
   */
  onKeyUp: o.func,
  /**
   * @ignore
   */
  onMouseDown: o.func,
  /**
   * @ignore
   */
  onMouseLeave: o.func,
  /**
   * @ignore
   */
  onMouseUp: o.func,
  /**
   * @ignore
   */
  onTouchEnd: o.func,
  /**
   * @ignore
   */
  onTouchMove: o.func,
  /**
   * @ignore
   */
  onTouchStart: o.func,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object]),
  /**
   * @default 0
   */
  tabIndex: o.number,
  /**
   * Props applied to the `TouchRipple` element.
   */
  TouchRippleProps: o.object,
  /**
   * A ref that points to the `TouchRipple` element.
   */
  touchRippleRef: o.oneOfType([o.func, o.shape({
    current: o.shape({
      pulsate: o.func.isRequired,
      start: o.func.isRequired,
      stop: o.func.isRequired
    })
  })]),
  /**
   * The HTML [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#type)
   * attribute applied to `button` and `a` elements.
   * Ignored when rendering non-native buttons.
   * @default 'button'
   */
  type: o.string
});
function sv(e) {
  return be("MuiAccordionSummary", e);
}
const Fo = xe("MuiAccordionSummary", ["root", "expanded", "focusVisible", "disabled", "gutters", "content", "expandIconWrapper"]), av = (e) => {
  const {
    classes: t,
    expanded: n,
    disabled: r,
    disableGutters: i
  } = e;
  return Ce({
    root: ["root", n && "expanded", r && "disabled", !i && "gutters"],
    focusVisible: ["focusVisible"],
    content: ["content", n && "expanded"],
    expandIconWrapper: ["expandIconWrapper", n && "expanded"]
  }, sv, t);
}, lv = ee(Zn, {
  name: "MuiAccordionSummary",
  slot: "Root"
})(ke(({
  theme: e
}) => {
  const t = {
    duration: e.transitions.duration.shortest
  };
  return {
    display: "flex",
    width: "100%",
    minHeight: 48,
    padding: e.spacing(0, 2),
    transition: e.transitions.create(["min-height", "background-color"], t),
    [`&.${Fo.focusVisible}`]: {
      backgroundColor: (e.vars || e).palette.action.focus
    },
    [`&.${Fo.disabled}`]: {
      opacity: (e.vars || e).palette.action.disabledOpacity
    },
    [`&:hover:not(.${Fo.disabled})`]: {
      cursor: "pointer"
    },
    variants: [{
      props: (n) => !n.disableGutters,
      style: {
        [`&.${Fo.expanded}`]: {
          minHeight: 64
        }
      }
    }]
  };
})), cv = ee("span", {
  name: "MuiAccordionSummary",
  slot: "Content"
})(ke(({
  theme: e
}) => ({
  display: "flex",
  textAlign: "start",
  flexGrow: 1,
  margin: "12px 0",
  variants: [{
    props: (t) => !t.disableGutters,
    style: {
      transition: e.transitions.create(["margin"], {
        duration: e.transitions.duration.shortest
      }),
      [`&.${Fo.expanded}`]: {
        margin: "20px 0"
      }
    }
  }]
}))), dv = ee("span", {
  name: "MuiAccordionSummary",
  slot: "ExpandIconWrapper"
})(ke(({
  theme: e
}) => ({
  display: "flex",
  color: (e.vars || e).palette.action.active,
  transform: "rotate(0deg)",
  transition: e.transitions.create("transform", {
    duration: e.transitions.duration.shortest
  }),
  [`&.${Fo.expanded}`]: {
    transform: "rotate(180deg)"
  }
}))), Sp = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiAccordionSummary"
  }), {
    children: i,
    className: s,
    expandIcon: a,
    focusVisibleClassName: c,
    onClick: u,
    slots: p,
    slotProps: f,
    ...g
  } = r, {
    disabled: b = !1,
    disableGutters: m,
    expanded: x,
    toggle: h
  } = v.useContext(ml), S = (B) => {
    h && h(B), u && u(B);
  }, R = {
    ...r,
    expanded: x,
    disabled: b,
    disableGutters: m
  }, k = av(R), E = {
    slots: p,
    slotProps: f
  }, [w, C] = ge("root", {
    ref: n,
    shouldForwardComponentProp: !0,
    className: le(k.root, s),
    elementType: lv,
    externalForwardedProps: {
      ...E,
      ...g
    },
    ownerState: R,
    additionalProps: {
      focusRipple: !1,
      disableRipple: !0,
      internalNativeButton: !0,
      disabled: b,
      "aria-expanded": x,
      focusVisibleClassName: le(k.focusVisible, c)
    },
    getSlotProps: (B) => ({
      ...B,
      onClick: (I) => {
        var y;
        (y = B.onClick) == null || y.call(B, I), S(I);
      }
    })
  }), [N, M] = ge("content", {
    className: k.content,
    elementType: cv,
    externalForwardedProps: E,
    ownerState: R
  }), [D, L] = ge("expandIconWrapper", {
    className: k.expandIconWrapper,
    elementType: dv,
    externalForwardedProps: E,
    ownerState: R
  });
  return /* @__PURE__ */ T(w, {
    ...C,
    children: [/* @__PURE__ */ l(N, {
      ...M,
      children: i
    }), a && /* @__PURE__ */ l(D, {
      ...L,
      children: a
    })]
  });
});
process.env.NODE_ENV !== "production" && (Sp.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: o.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * The icon to display as the expand indicator.
   */
  expandIcon: o.node,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: o.string,
  /**
   * @ignore
   */
  onClick: o.func,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: o.shape({
    content: o.oneOfType([o.func, o.object]),
    expandIconWrapper: o.oneOfType([o.func, o.object]),
    root: o.oneOfType([o.func, o.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: o.shape({
    content: o.elementType,
    expandIconWrapper: o.elementType,
    root: o.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object])
});
function uv(e) {
  return typeof e.main == "string";
}
function pv(e, t = []) {
  if (!uv(e))
    return !1;
  for (const n of t)
    if (!e.hasOwnProperty(n) || typeof e[n] != "string")
      return !1;
  return !0;
}
function _t(e = []) {
  return ([, t]) => t && pv(t, e);
}
function fv(e) {
  return be("MuiAlert", e);
}
const id = xe("MuiAlert", ["root", "action", "icon", "message", "filled", "colorSuccess", "colorInfo", "colorWarning", "colorError", "outlined", "standard"]);
function mv(e) {
  return be("MuiCircularProgress", e);
}
xe("MuiCircularProgress", ["root", "determinate", "indeterminate", "colorPrimary", "colorSecondary", "svg", "track", "circle", "circleDisableShrink"]);
const un = 44, Ia = Jr`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`, $a = Jr`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: -126px;
  }
`, hv = typeof Ia != "string" ? Ja`
        animation: ${Ia} 1.4s linear infinite;
      ` : null, gv = typeof $a != "string" ? Ja`
        animation: ${$a} 1.4s ease-in-out infinite;
      ` : null, yv = (e) => {
  const {
    classes: t,
    variant: n,
    color: r,
    disableShrink: i
  } = e, s = {
    root: ["root", n, `color${ye(r)}`],
    svg: ["svg"],
    track: ["track"],
    circle: ["circle", i && "circleDisableShrink"]
  };
  return Ce(s, mv, t);
}, bv = ee("span", {
  name: "MuiCircularProgress",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, t[n.variant], t[`color${ye(n.color)}`]];
  }
})(ke(({
  theme: e
}) => ({
  display: "inline-block",
  variants: [{
    props: {
      variant: "determinate"
    },
    style: {
      transition: e.transitions.create("transform")
    }
  }, {
    props: {
      variant: "indeterminate"
    },
    style: hv || {
      animation: `${Ia} 1.4s linear infinite`
    }
  }, ...Object.entries(e.palette).filter(_t()).map(([t]) => ({
    props: {
      color: t
    },
    style: {
      color: (e.vars || e).palette[t].main
    }
  }))]
}))), vv = ee("svg", {
  name: "MuiCircularProgress",
  slot: "Svg"
})({
  display: "block"
  // Keeps the progress centered
}), xv = ee("circle", {
  name: "MuiCircularProgress",
  slot: "Circle",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.circle, n.disableShrink && t.circleDisableShrink];
  }
})(ke(({
  theme: e
}) => ({
  stroke: "currentColor",
  variants: [{
    props: {
      variant: "determinate"
    },
    style: {
      transition: e.transitions.create("stroke-dashoffset")
    }
  }, {
    props: {
      variant: "indeterminate"
    },
    style: {
      // Some default value that looks fine waiting for the animation to kicks in.
      strokeDasharray: "80px, 200px",
      strokeDashoffset: 0
      // Add the unit to fix a Edge 16 and below bug.
    }
  }, {
    props: ({
      ownerState: t
    }) => t.variant === "indeterminate" && !t.disableShrink,
    style: gv || {
      // At runtime for Pigment CSS, `dashAnimation` will be null and the generated keyframe will be used.
      animation: `${$a} 1.4s ease-in-out infinite`
    }
  }]
}))), Cv = ee("circle", {
  name: "MuiCircularProgress",
  slot: "Track"
})(ke(({
  theme: e
}) => ({
  stroke: "currentColor",
  opacity: (e.vars || e).palette.action.activatedOpacity
}))), Vo = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiCircularProgress"
  }), {
    className: i,
    color: s = "primary",
    disableShrink: a = !1,
    enableTrackSlot: c = !1,
    min: u,
    max: p,
    size: f = 40,
    style: g,
    thickness: b = 3.6,
    value: m = r.min ?? 0,
    variant: x = "indeterminate",
    ...h
  } = r;
  process.env.NODE_ENV !== "production" && x === "indeterminate" && (u !== void 0 || p !== void 0) && console.warn("MUI: You have provided the `min` or `max` props with an 'indeterminate' variant. These props will have no effect.");
  const S = u ?? 0, R = p ?? 100, k = {
    ...r,
    color: s,
    disableShrink: a,
    size: f,
    thickness: b,
    value: m,
    variant: x,
    enableTrackSlot: c
  }, E = yv(k), w = {}, C = {}, N = {};
  if (x === "determinate") {
    const M = 2 * Math.PI * ((un - b) / 2);
    process.env.NODE_ENV !== "production" && (m < S || m > R || S >= R) && console.error(`MUI: The min, max, and value props in CircularProgress should be numbers where min < max and min <= value <= max. Received min=${S}, max=${R}, value=${m}.`);
    const D = R - S;
    w.strokeDasharray = M.toFixed(3), w.strokeDashoffset = D > 0 ? `${((R - m) / D * M).toFixed(3)}px` : `${M.toFixed(3)}px`, C.transform = "rotate(-90deg)", N["aria-valuenow"] = m, N["aria-valuemin"] = S, N["aria-valuemax"] = R;
  }
  return /* @__PURE__ */ l(bv, {
    className: le(E.root, i),
    style: {
      width: f,
      height: f,
      ...C,
      ...g
    },
    ownerState: k,
    ref: n,
    role: "progressbar",
    ...N,
    ...h,
    children: /* @__PURE__ */ T(vv, {
      className: E.svg,
      ownerState: k,
      viewBox: `${un / 2} ${un / 2} ${un} ${un}`,
      children: [c ? /* @__PURE__ */ l(Cv, {
        className: E.track,
        ownerState: k,
        cx: un,
        cy: un,
        r: (un - b) / 2,
        fill: "none",
        strokeWidth: b,
        "aria-hidden": "true"
      }) : null, /* @__PURE__ */ l(xv, {
        className: E.circle,
        style: w,
        ownerState: k,
        cx: un,
        cy: un,
        r: (un - b) / 2,
        fill: "none",
        strokeWidth: b
      })]
    })
  });
});
process.env.NODE_ENV !== "production" && (Vo.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: o.oneOfType([o.oneOf(["inherit", "primary", "secondary", "error", "info", "success", "warning"]), o.string]),
  /**
   * If `true`, the shrink animation is disabled.
   * This only works if variant is `indeterminate`.
   * @default false
   */
  disableShrink: kn(o.bool, (e) => e.disableShrink && e.variant && e.variant !== "indeterminate" ? new Error("MUI: You have provided the `disableShrink` prop with a variant other than `indeterminate`. This will have no effect.") : null),
  /**
   * If `true`, a track circle slot is mounted to show a subtle background for the progress.
   * The `size` and `thickness` apply to the track slot to be consistent with the progress circle.
   * @default false
   */
  enableTrackSlot: o.bool,
  /**
   * The maximum value for the progress indicator for the determinate variant.
   * @default 100
   */
  max: o.number,
  /**
   * The minimum value for the progress indicator for the determinate variant.
   * @default 0
   */
  min: o.number,
  /**
   * The size of the component.
   * If using a number, the pixel unit is assumed.
   * If using a string, you need to provide the CSS unit, for example '3rem'.
   * @default 40
   */
  size: o.oneOfType([o.number, o.string]),
  /**
   * @ignore
   */
  style: o.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object]),
  /**
   * The thickness of the circle.
   * @default 3.6
   */
  thickness: o.number,
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between `min` and `max`.
   * @default props.min ?? 0
   */
  value: o.number,
  /**
   * The variant to use.
   * Use indeterminate when there is no progress value.
   * @default 'indeterminate'
   */
  variant: o.oneOf(["determinate", "indeterminate"])
});
function wv(e) {
  return be("MuiIconButton", e);
}
const sd = xe("MuiIconButton", ["root", "disabled", "colorInherit", "colorPrimary", "colorSecondary", "colorError", "colorInfo", "colorSuccess", "colorWarning", "edgeStart", "edgeEnd", "sizeSmall", "sizeMedium", "sizeLarge", "loading", "loadingIndicator", "loadingWrapper"]), Sv = (e) => {
  const {
    classes: t,
    disabled: n,
    color: r,
    edge: i,
    size: s,
    loading: a
  } = e, c = {
    root: ["root", a && "loading", n && "disabled", r !== "default" && `color${ye(r)}`, i && `edge${ye(i)}`, `size${ye(s)}`],
    loadingIndicator: ["loadingIndicator"],
    loadingWrapper: ["loadingWrapper"]
  };
  return Ce(c, wv, t);
}, Tv = ee(Zn, {
  name: "MuiIconButton",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.loading && t.loading, n.color !== "default" && t[`color${ye(n.color)}`], n.edge && t[`edge${ye(n.edge)}`], t[`size${ye(n.size)}`]];
  }
})(ke(({
  theme: e
}) => ({
  textAlign: "center",
  flex: "0 0 auto",
  fontSize: e.typography.pxToRem(24),
  padding: 8,
  borderRadius: "50%",
  color: (e.vars || e).palette.action.active,
  transition: e.transitions.create("background-color", {
    duration: e.transitions.duration.shortest
  }),
  variants: [{
    props: (t) => !t.disableRipple,
    style: {
      "--IconButton-hoverBg": e.alpha((e.vars || e).palette.action.active, (e.vars || e).palette.action.hoverOpacity),
      "&:hover": {
        backgroundColor: "var(--IconButton-hoverBg)",
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: "transparent"
        }
      }
    }
  }, {
    props: {
      edge: "start"
    },
    style: {
      marginLeft: -12
    }
  }, {
    props: {
      edge: "start",
      size: "small"
    },
    style: {
      marginLeft: -3
    }
  }, {
    props: {
      edge: "end"
    },
    style: {
      marginRight: -12
    }
  }, {
    props: {
      edge: "end",
      size: "small"
    },
    style: {
      marginRight: -3
    }
  }]
})), ke(({
  theme: e
}) => ({
  variants: [{
    props: {
      color: "inherit"
    },
    style: {
      color: "inherit"
    }
  }, ...Object.entries(e.palette).filter(_t()).map(([t]) => ({
    props: {
      color: t
    },
    style: {
      color: (e.vars || e).palette[t].main,
      "--IconButton-hoverBg": e.alpha((e.vars || e).palette[t].main, (e.vars || e).palette.action.hoverOpacity)
    }
  })), {
    props: {
      size: "small"
    },
    style: {
      padding: 5,
      fontSize: e.typography.pxToRem(18)
    }
  }, {
    props: {
      size: "large"
    },
    style: {
      padding: 12,
      fontSize: e.typography.pxToRem(28)
    }
  }],
  [`&.${sd.disabled}`]: {
    backgroundColor: "transparent",
    color: (e.vars || e).palette.action.disabled
  },
  [`&.${sd.loading}`]: {
    color: "transparent"
  }
}))), Ev = ee("span", {
  name: "MuiIconButton",
  slot: "LoadingIndicator"
})(({
  theme: e
}) => ({
  display: "none",
  position: "absolute",
  visibility: "visible",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: (e.vars || e).palette.action.disabled,
  variants: [{
    props: {
      loading: !0
    },
    style: {
      display: "flex"
    }
  }]
})), Gt = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiIconButton"
  }), {
    edge: i = !1,
    children: s,
    className: a,
    color: c = "default",
    disabled: u = !1,
    disableFocusRipple: p = !1,
    size: f = "medium",
    id: g,
    loading: b = null,
    loadingIndicator: m,
    ...x
  } = r, h = zn(g), S = m ?? /* @__PURE__ */ l(Vo, {
    "aria-labelledby": h,
    color: "inherit",
    size: 16
  }), R = {
    ...r,
    edge: i,
    color: c,
    disabled: u,
    disableFocusRipple: p,
    loading: b,
    loadingIndicator: S,
    size: f
  }, k = Sv(R);
  return /* @__PURE__ */ T(Tv, {
    id: b ? h : g,
    className: le(k.root, a),
    centerRipple: !0,
    internalNativeButton: !0,
    focusRipple: !p,
    disabled: u || b,
    ref: n,
    ...x,
    ownerState: R,
    children: [typeof b == "boolean" && // use plain HTML span to minimize the runtime overhead
    /* @__PURE__ */ l("span", {
      className: k.loadingWrapper,
      style: {
        display: "contents"
      },
      children: /* @__PURE__ */ l(Ev, {
        className: k.loadingIndicator,
        ownerState: R,
        children: b && S
      })
    }), s]
  });
});
process.env.NODE_ENV !== "production" && (Gt.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The icon to display.
   */
  children: kn(o.node, (e) => v.Children.toArray(e.children).some((n) => /* @__PURE__ */ v.isValidElement(n) && n.props.onClick) ? new Error(["MUI: You are providing an onClick event listener to a child of a button element.", "Prefer applying it to the IconButton directly.", "This guarantees that the whole <button> will be responsive to click events."].join(`
`)) : null),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'default'
   */
  color: o.oneOfType([o.oneOf(["inherit", "default", "primary", "secondary", "error", "info", "success", "warning"]), o.string]),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: o.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: o.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: o.bool,
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge: o.oneOf(["end", "start", !1]),
  /**
   * @ignore
   */
  id: o.string,
  /**
   * If `true`, the loading indicator is visible and the button is disabled.
   * If `true | false`, the loading wrapper is always rendered before the children to prevent [Google Translation Crash](https://github.com/mui/material-ui/issues/27853).
   * @default null
   */
  loading: o.bool,
  /**
   * Element placed before the children if the button is in loading state.
   * The node should contain an element with `role="progressbar"` with an accessible name.
   * By default, it renders a `CircularProgress` that is labeled by the button itself.
   * @default <CircularProgress color="inherit" size={16} />
   */
  loadingIndicator: o.node,
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: o.oneOfType([o.oneOf(["small", "medium", "large"]), o.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object])
});
const Ov = at(/* @__PURE__ */ l("path", {
  d: "M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"
}), "SuccessOutlined"), Rv = at(/* @__PURE__ */ l("path", {
  d: "M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"
}), "ReportProblemOutlined"), Nv = at(/* @__PURE__ */ l("path", {
  d: "M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
}), "ErrorOutline"), kv = at(/* @__PURE__ */ l("path", {
  d: "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"
}), "InfoOutlined"), Pv = at(/* @__PURE__ */ l("path", {
  d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
}), "Close"), Iv = (e) => {
  const {
    variant: t,
    color: n,
    severity: r,
    classes: i
  } = e, s = {
    root: ["root", `color${ye(n || r)}`, `${t}`],
    icon: ["icon"],
    message: ["message"],
    action: ["action"]
  };
  return Ce(s, fv, i);
}, $v = ee(dt, {
  name: "MuiAlert",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, t[n.variant]];
  }
})(ke(({
  theme: e
}) => {
  const t = e.palette.mode === "light" ? e.darken : e.lighten, n = e.palette.mode === "light" ? e.lighten : e.darken;
  return {
    ...e.typography.body2,
    backgroundColor: "transparent",
    display: "flex",
    padding: "6px 16px",
    variants: [...Object.entries(e.palette).filter(_t(["light"])).map(([r]) => ({
      props: {
        colorSeverity: r,
        variant: "standard"
      },
      style: {
        color: e.vars ? e.vars.palette.Alert[`${r}Color`] : t(e.palette[r].light, 0.6),
        backgroundColor: e.vars ? e.vars.palette.Alert[`${r}StandardBg`] : n(e.palette[r].light, 0.9),
        [`& .${id.icon}`]: e.vars ? {
          color: e.vars.palette.Alert[`${r}IconColor`]
        } : {
          color: e.palette[r].main
        }
      }
    })), ...Object.entries(e.palette).filter(_t(["light"])).map(([r]) => ({
      props: {
        colorSeverity: r,
        variant: "outlined"
      },
      style: {
        color: e.vars ? e.vars.palette.Alert[`${r}Color`] : t(e.palette[r].light, 0.6),
        border: `1px solid ${(e.vars || e).palette[r].light}`,
        [`& .${id.icon}`]: e.vars ? {
          color: e.vars.palette.Alert[`${r}IconColor`]
        } : {
          color: e.palette[r].main
        }
      }
    })), ...Object.entries(e.palette).filter(_t(["dark"])).map(([r]) => ({
      props: {
        colorSeverity: r,
        variant: "filled"
      },
      style: {
        fontWeight: e.typography.fontWeightMedium,
        ...e.vars ? {
          color: e.vars.palette.Alert[`${r}FilledColor`],
          backgroundColor: e.vars.palette.Alert[`${r}FilledBg`]
        } : {
          backgroundColor: e.palette.mode === "dark" ? e.palette[r].dark : e.palette[r].main,
          color: e.palette.getContrastText(e.palette[r].main)
        }
      }
    }))]
  };
})), Av = ee("div", {
  name: "MuiAlert",
  slot: "Icon"
})({
  marginRight: 12,
  padding: "7px 0",
  display: "flex",
  fontSize: 22,
  opacity: 0.9
}), Mv = ee("div", {
  name: "MuiAlert",
  slot: "Message"
})({
  padding: "8px 0",
  minWidth: 0,
  overflow: "auto"
}), _v = ee("div", {
  name: "MuiAlert",
  slot: "Action"
})({
  display: "flex",
  alignItems: "flex-start",
  padding: "4px 0 0 16px",
  marginLeft: "auto",
  marginRight: -8
}), ad = {
  success: /* @__PURE__ */ l(Ov, {
    fontSize: "inherit"
  }),
  warning: /* @__PURE__ */ l(Rv, {
    fontSize: "inherit"
  }),
  error: /* @__PURE__ */ l(Nv, {
    fontSize: "inherit"
  }),
  info: /* @__PURE__ */ l(kv, {
    fontSize: "inherit"
  })
}, Aa = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiAlert"
  }), {
    action: i,
    children: s,
    className: a,
    closeText: c = "Close",
    color: u,
    icon: p,
    iconMapping: f = ad,
    onClose: g,
    role: b = "alert",
    severity: m = "success",
    slotProps: x = {},
    slots: h = {},
    variant: S = "standard",
    ...R
  } = r, k = {
    ...r,
    color: u,
    severity: m,
    variant: S,
    colorSeverity: u || m
  }, E = Iv(k), w = {
    slots: h,
    slotProps: x
  }, [C, N] = ge("root", {
    ref: n,
    shouldForwardComponentProp: !0,
    className: le(E.root, a),
    elementType: $v,
    externalForwardedProps: {
      ...w,
      ...R
    },
    ownerState: k,
    additionalProps: {
      role: b,
      elevation: 0
    }
  }), [M, D] = ge("icon", {
    className: E.icon,
    elementType: Av,
    externalForwardedProps: w,
    ownerState: k
  }), [L, B] = ge("message", {
    className: E.message,
    elementType: Mv,
    externalForwardedProps: w,
    ownerState: k
  }), [I, y] = ge("action", {
    className: E.action,
    elementType: _v,
    externalForwardedProps: w,
    ownerState: k
  }), [$, P] = ge("closeButton", {
    elementType: Gt,
    externalForwardedProps: w,
    ownerState: k
  }), [A, F] = ge("closeIcon", {
    elementType: Pv,
    externalForwardedProps: w,
    ownerState: k
  });
  return /* @__PURE__ */ T(C, {
    ...N,
    children: [p !== !1 ? /* @__PURE__ */ l(M, {
      ...D,
      children: p || f[m] || ad[m]
    }) : null, /* @__PURE__ */ l(L, {
      ...B,
      children: s
    }), i != null ? /* @__PURE__ */ l(I, {
      ...y,
      children: i
    }) : null, i == null && g ? /* @__PURE__ */ l(I, {
      ...y,
      children: /* @__PURE__ */ l($, {
        size: "small",
        "aria-label": c,
        title: c,
        color: "inherit",
        onClick: g,
        ...P,
        children: /* @__PURE__ */ l(A, {
          fontSize: "small",
          ...F
        })
      })
    }) : null]
  });
});
process.env.NODE_ENV !== "production" && (Aa.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The action to display. It renders after the message, at the end of the alert.
   */
  action: o.node,
  /**
   * The content of the component.
   */
  children: o.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * Override the default label for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @default 'Close'
   */
  closeText: o.string,
  /**
   * The color of the component. Unless provided, the value is taken from the `severity` prop.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color: o.oneOfType([o.oneOf(["error", "info", "success", "warning"]), o.string]),
  /**
   * Override the icon displayed before the children.
   * Unless provided, the icon is mapped to the value of the `severity` prop.
   * Set to `false` to remove the `icon`.
   */
  icon: o.node,
  /**
   * The component maps the `severity` prop to a range of different icons,
   * for instance success to `<SuccessOutlined>`.
   * If you wish to change this mapping, you can provide your own.
   * Alternatively, you can use the `icon` prop to override the icon displayed.
   */
  iconMapping: o.shape({
    error: o.node,
    info: o.node,
    success: o.node,
    warning: o.node
  }),
  /**
   * Callback fired when the component requests to be closed.
   * When provided and no `action` prop is set, a close icon button is displayed that triggers the callback when clicked.
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose: o.func,
  /**
   * The ARIA role attribute of the element.
   * @default 'alert'
   */
  role: o.string,
  /**
   * The severity of the alert. This defines the color and icon used.
   * @default 'success'
   */
  severity: o.oneOfType([o.oneOf(["error", "info", "success", "warning"]), o.string]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: o.shape({
    action: o.oneOfType([o.func, o.object]),
    closeButton: o.oneOfType([o.func, o.object]),
    closeIcon: o.oneOfType([o.func, o.object]),
    icon: o.oneOfType([o.func, o.object]),
    message: o.oneOfType([o.func, o.object]),
    root: o.oneOfType([o.func, o.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: o.shape({
    action: o.elementType,
    closeButton: o.elementType,
    closeIcon: o.elementType,
    icon: o.elementType,
    message: o.elementType,
    root: o.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object]),
  /**
   * The variant to use.
   * @default 'standard'
   */
  variant: o.oneOfType([o.oneOf(["filled", "outlined", "standard"]), o.string])
});
function Dv(e) {
  return be("MuiButton", e);
}
const lo = xe("MuiButton", ["root", "text", "outlined", "contained", "disableElevation", "focusVisible", "disabled", "colorInherit", "colorPrimary", "colorSecondary", "colorSuccess", "colorError", "colorInfo", "colorWarning", "sizeMedium", "sizeSmall", "sizeLarge", "fullWidth", "startIcon", "endIcon", "icon", "loading", "loadingWrapper", "loadingIconPlaceholder", "loadingIndicator", "loadingPositionCenter", "loadingPositionStart", "loadingPositionEnd"]), Tp = /* @__PURE__ */ v.createContext({});
process.env.NODE_ENV !== "production" && (Tp.displayName = "ButtonGroupContext");
const Ep = /* @__PURE__ */ v.createContext(void 0);
process.env.NODE_ENV !== "production" && (Ep.displayName = "ButtonGroupButtonContext");
const Lv = (e) => {
  const {
    color: t,
    disableElevation: n,
    fullWidth: r,
    size: i,
    variant: s,
    loading: a,
    loadingPosition: c,
    classes: u
  } = e, p = {
    root: ["root", a && "loading", s, `size${ye(i)}`, `color${ye(t)}`, n && "disableElevation", r && "fullWidth", a && `loadingPosition${ye(c)}`],
    startIcon: ["icon", "startIcon"],
    endIcon: ["icon", "endIcon"],
    loadingIndicator: ["loadingIndicator"],
    loadingWrapper: ["loadingWrapper"]
  }, f = Ce(p, Dv, u);
  return {
    ...u,
    // forward the focused, disabled, etc. classes to the ButtonBase
    ...f
  };
}, Op = [{
  props: {
    size: "small"
  },
  style: {
    "& > *:nth-of-type(1)": {
      fontSize: 18
    }
  }
}, {
  props: {
    size: "medium"
  },
  style: {
    "& > *:nth-of-type(1)": {
      fontSize: 20
    }
  }
}, {
  props: {
    size: "large"
  },
  style: {
    "& > *:nth-of-type(1)": {
      fontSize: 22
    }
  }
}], Fv = ee(Zn, {
  shouldForwardProp: (e) => zt(e) || e === "classes",
  name: "MuiButton",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, t[n.variant], t[`size${ye(n.size)}`], n.color === "inherit" && t.colorInherit, n.disableElevation && t.disableElevation, n.fullWidth && t.fullWidth, n.loading && t.loading];
  }
})(ke(({
  theme: e
}) => {
  const t = e.palette.mode === "light" ? e.palette.grey[300] : e.palette.grey[800], n = e.palette.mode === "light" ? e.palette.grey.A100 : e.palette.grey[700];
  return {
    ...e.typography.button,
    minWidth: 64,
    padding: "6px 16px",
    border: 0,
    borderRadius: (e.vars || e).shape.borderRadius,
    transition: e.transitions.create(["background-color", "box-shadow", "border-color", "color"], {
      duration: e.transitions.duration.short
    }),
    "&:hover": {
      textDecoration: "none"
    },
    [`&.${lo.disabled}`]: {
      color: (e.vars || e).palette.action.disabled
    },
    variants: [{
      props: ({
        ownerState: r
      }) => r.startIcon || r.loading && r.loadingPosition === "start",
      style: {
        "&::before": {
          content: '"\\200b"',
          width: 0,
          overflow: "hidden"
        }
      }
    }, {
      props: {
        variant: "contained"
      },
      style: {
        color: "var(--variant-containedColor)",
        backgroundColor: "var(--variant-containedBg)",
        boxShadow: (e.vars || e).shadows[2],
        "&:hover": {
          boxShadow: (e.vars || e).shadows[4],
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            boxShadow: (e.vars || e).shadows[2]
          }
        },
        "&:active": {
          boxShadow: (e.vars || e).shadows[8]
        },
        [`&.${lo.focusVisible}`]: {
          boxShadow: (e.vars || e).shadows[6]
        },
        [`&.${lo.disabled}`]: {
          color: (e.vars || e).palette.action.disabled,
          boxShadow: (e.vars || e).shadows[0],
          backgroundColor: (e.vars || e).palette.action.disabledBackground
        }
      }
    }, {
      props: {
        variant: "outlined"
      },
      style: {
        padding: "5px 15px",
        border: "1px solid currentColor",
        borderColor: "var(--variant-outlinedBorder, currentColor)",
        backgroundColor: "var(--variant-outlinedBg)",
        color: "var(--variant-outlinedColor)",
        [`&.${lo.disabled}`]: {
          border: `1px solid ${(e.vars || e).palette.action.disabledBackground}`
        }
      }
    }, {
      props: {
        variant: "text"
      },
      style: {
        padding: "6px 8px",
        color: "var(--variant-textColor)",
        backgroundColor: "var(--variant-textBg)"
      }
    }, ...Object.entries(e.palette).filter(_t()).map(([r]) => ({
      props: {
        color: r
      },
      style: {
        "--variant-textColor": (e.vars || e).palette[r].main,
        "--variant-outlinedColor": (e.vars || e).palette[r].main,
        "--variant-outlinedBorder": e.alpha((e.vars || e).palette[r].main, 0.5),
        "--variant-containedColor": (e.vars || e).palette[r].contrastText,
        "--variant-containedBg": (e.vars || e).palette[r].main,
        "@media (hover: hover)": {
          "&:hover": {
            "--variant-containedBg": (e.vars || e).palette[r].dark,
            "--variant-textBg": e.alpha((e.vars || e).palette[r].main, (e.vars || e).palette.action.hoverOpacity),
            "--variant-outlinedBorder": (e.vars || e).palette[r].main,
            "--variant-outlinedBg": e.alpha((e.vars || e).palette[r].main, (e.vars || e).palette.action.hoverOpacity)
          }
        }
      }
    })), {
      props: {
        color: "inherit"
      },
      style: {
        color: "inherit",
        borderColor: "currentColor",
        "--variant-containedBg": e.vars ? e.vars.palette.Button.inheritContainedBg : t,
        "@media (hover: hover)": {
          "&:hover": {
            "--variant-containedBg": e.vars ? e.vars.palette.Button.inheritContainedHoverBg : n,
            "--variant-textBg": e.alpha((e.vars || e).palette.text.primary, (e.vars || e).palette.action.hoverOpacity),
            "--variant-outlinedBg": e.alpha((e.vars || e).palette.text.primary, (e.vars || e).palette.action.hoverOpacity)
          }
        }
      }
    }, {
      props: {
        size: "small",
        variant: "text"
      },
      style: {
        padding: "4px 5px",
        fontSize: e.typography.pxToRem(13)
      }
    }, {
      props: {
        size: "large",
        variant: "text"
      },
      style: {
        padding: "8px 11px",
        fontSize: e.typography.pxToRem(15)
      }
    }, {
      props: {
        size: "small",
        variant: "outlined"
      },
      style: {
        padding: "3px 9px",
        fontSize: e.typography.pxToRem(13)
      }
    }, {
      props: {
        size: "large",
        variant: "outlined"
      },
      style: {
        padding: "7px 21px",
        fontSize: e.typography.pxToRem(15)
      }
    }, {
      props: {
        size: "small",
        variant: "contained"
      },
      style: {
        padding: "4px 10px",
        fontSize: e.typography.pxToRem(13)
      }
    }, {
      props: {
        size: "large",
        variant: "contained"
      },
      style: {
        padding: "8px 22px",
        fontSize: e.typography.pxToRem(15)
      }
    }, {
      props: {
        disableElevation: !0
      },
      style: {
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none"
        },
        [`&.${lo.focusVisible}`]: {
          boxShadow: "none"
        },
        "&:active": {
          boxShadow: "none"
        },
        [`&.${lo.disabled}`]: {
          boxShadow: "none"
        }
      }
    }, {
      props: {
        fullWidth: !0
      },
      style: {
        width: "100%"
      }
    }, {
      props: {
        loadingPosition: "center"
      },
      style: {
        transition: e.transitions.create(["background-color", "box-shadow", "border-color"], {
          duration: e.transitions.duration.short
        }),
        [`&.${lo.loading}`]: {
          color: "transparent"
        }
      }
    }]
  };
})), jv = ee("span", {
  name: "MuiButton",
  slot: "StartIcon",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.startIcon, n.loading && t.startIconLoadingStart];
  }
})(({
  theme: e
}) => ({
  display: "inherit",
  marginRight: 8,
  marginLeft: -4,
  variants: [{
    props: {
      size: "small"
    },
    style: {
      marginLeft: -2
    }
  }, {
    props: {
      loadingPosition: "start",
      loading: !0
    },
    style: {
      transition: e.transitions.create(["opacity"], {
        duration: e.transitions.duration.short
      }),
      opacity: 0
    }
  }, {
    props: {
      loadingPosition: "start",
      loading: !0,
      fullWidth: !0
    },
    style: {
      marginRight: -8
    }
  }, ...Op]
})), Bv = ee("span", {
  name: "MuiButton",
  slot: "EndIcon",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.endIcon, n.loading && t.endIconLoadingEnd];
  }
})(({
  theme: e
}) => ({
  display: "inherit",
  marginRight: -4,
  marginLeft: 8,
  variants: [{
    props: {
      size: "small"
    },
    style: {
      marginRight: -2
    }
  }, {
    props: {
      loadingPosition: "end",
      loading: !0
    },
    style: {
      transition: e.transitions.create(["opacity"], {
        duration: e.transitions.duration.short
      }),
      opacity: 0
    }
  }, {
    props: {
      loadingPosition: "end",
      loading: !0,
      fullWidth: !0
    },
    style: {
      marginLeft: -8
    }
  }, ...Op]
})), Wv = ee("span", {
  name: "MuiButton",
  slot: "LoadingIndicator"
})(({
  theme: e
}) => ({
  display: "none",
  position: "absolute",
  visibility: "visible",
  variants: [{
    props: {
      loading: !0
    },
    style: {
      display: "flex"
    }
  }, {
    props: {
      loadingPosition: "start"
    },
    style: {
      left: 14
    }
  }, {
    props: {
      loadingPosition: "start",
      size: "small"
    },
    style: {
      left: 10
    }
  }, {
    props: {
      variant: "text",
      loadingPosition: "start"
    },
    style: {
      left: 6
    }
  }, {
    props: {
      loadingPosition: "center"
    },
    style: {
      left: "50%",
      transform: "translate(-50%)",
      color: (e.vars || e).palette.action.disabled
    }
  }, {
    props: {
      loadingPosition: "end"
    },
    style: {
      right: 14
    }
  }, {
    props: {
      loadingPosition: "end",
      size: "small"
    },
    style: {
      right: 10
    }
  }, {
    props: {
      variant: "text",
      loadingPosition: "end"
    },
    style: {
      right: 6
    }
  }, {
    props: {
      loadingPosition: "start",
      fullWidth: !0
    },
    style: {
      position: "relative",
      left: -10
    }
  }, {
    props: {
      loadingPosition: "end",
      fullWidth: !0
    },
    style: {
      position: "relative",
      right: -10
    }
  }]
})), ld = ee("span", {
  name: "MuiButton",
  slot: "LoadingIconPlaceholder"
})({
  display: "inline-block",
  width: "1em",
  height: "1em"
}), fe = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = v.useContext(Tp), i = v.useContext(Ep), s = Br(r, t), a = we({
    props: s,
    name: "MuiButton"
  }), {
    children: c,
    color: u = "primary",
    component: p = "button",
    className: f,
    disabled: g = !1,
    disableElevation: b = !1,
    disableFocusRipple: m = !1,
    endIcon: x,
    focusVisibleClassName: h,
    fullWidth: S = !1,
    id: R,
    loading: k = null,
    loadingIndicator: E,
    loadingPosition: w = "center",
    size: C = "medium",
    startIcon: N,
    type: M,
    variant: D = "text",
    ...L
  } = a, B = zn(R), I = E ?? /* @__PURE__ */ l(Vo, {
    "aria-labelledby": B,
    color: "inherit",
    size: 16
  }), y = {
    ...a,
    color: u,
    component: p,
    disabled: g,
    disableElevation: b,
    disableFocusRipple: m,
    fullWidth: S,
    loading: k,
    loadingIndicator: I,
    loadingPosition: w,
    size: C,
    type: M,
    variant: D
  }, $ = Lv(y), P = (N || k && w === "start") && /* @__PURE__ */ l(jv, {
    className: $.startIcon,
    ownerState: y,
    children: N || /* @__PURE__ */ l(ld, {
      className: $.loadingIconPlaceholder,
      ownerState: y
    })
  }), A = (x || k && w === "end") && /* @__PURE__ */ l(Bv, {
    className: $.endIcon,
    ownerState: y,
    children: x || /* @__PURE__ */ l(ld, {
      className: $.loadingIconPlaceholder,
      ownerState: y
    })
  }), F = i || "", W = typeof k == "boolean" ? (
    // use plain HTML span to minimize the runtime overhead
    /* @__PURE__ */ l("span", {
      className: $.loadingWrapper,
      style: {
        display: "contents"
      },
      children: k && /* @__PURE__ */ l(Wv, {
        className: $.loadingIndicator,
        ownerState: y,
        children: I
      })
    })
  ) : null, {
    root: H,
    ...te
  } = $;
  return /* @__PURE__ */ T(Fv, {
    ownerState: y,
    className: le(r.className, $.root, f, F),
    component: p,
    disabled: g || k,
    focusRipple: !m,
    focusVisibleClassName: le($.focusVisible, h),
    ref: n,
    internalNativeButton: !0,
    type: M,
    id: k ? B : R,
    ...L,
    classes: te,
    children: [P, w !== "end" && W, c, w === "end" && W, A]
  });
});
process.env.NODE_ENV !== "production" && (fe.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: o.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: o.oneOfType([o.oneOf(["inherit", "primary", "secondary", "success", "error", "info", "warning"]), o.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: o.elementType,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: o.bool,
  /**
   * If `true`, no elevation is used.
   * @default false
   */
  disableElevation: o.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: o.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: o.bool,
  /**
   * Element placed after the children.
   */
  endIcon: o.node,
  /**
   * @ignore
   */
  focusVisibleClassName: o.string,
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: o.bool,
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: o.string,
  /**
   * @ignore
   */
  id: o.string,
  /**
   * If `true`, the loading indicator is visible and the button is disabled.
   * If `true | false`, the loading wrapper is always rendered before the children to prevent [Google Translation Crash](https://github.com/mui/material-ui/issues/27853).
   * @default null
   */
  loading: o.bool,
  /**
   * Element placed before the children if the button is in loading state.
   * The node should contain an element with `role="progressbar"` with an accessible name.
   * By default, it renders a `CircularProgress` that is labeled by the button itself.
   * @default <CircularProgress color="inherit" size={16} />
   */
  loadingIndicator: o.node,
  /**
   * The loading indicator can be positioned on the start, end, or the center of the button.
   * @default 'center'
   */
  loadingPosition: o.oneOf(["center", "end", "start"]),
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: o.oneOfType([o.oneOf(["small", "medium", "large"]), o.string]),
  /**
   * Element placed before the children.
   */
  startIcon: o.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object]),
  /**
   * @ignore
   */
  type: o.string,
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: o.oneOfType([o.oneOf(["contained", "outlined", "text"]), o.string])
});
function Rp(e = window) {
  const t = e.document.documentElement.clientWidth;
  return e.innerWidth - t;
}
function zv(e) {
  const t = Et(e);
  return t.body === e ? Vn(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function Pr(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function cd(e) {
  return parseFloat(Vn(e).getComputedStyle(e).paddingRight) || 0;
}
function Vv(e) {
  const n = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].includes(e.tagName), r = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return n || r;
}
function dd(e, t, n, r, i) {
  const s = [t, n, ...r];
  [].forEach.call(e.children, (a) => {
    const c = !s.includes(a), u = !Vv(a);
    c && u && Pr(a, i);
  });
}
function la(e, t) {
  let n = -1;
  return e.some((r, i) => t(r) ? (n = i, !0) : !1), n;
}
function Uv(e, t) {
  const n = [], r = e.container;
  if (!t.disableScrollLock) {
    if (zv(r)) {
      const a = Rp(Vn(r));
      n.push({
        value: r.style.paddingRight,
        property: "padding-right",
        el: r
      }), r.style.paddingRight = `${cd(r) + a}px`;
      const c = Et(r).querySelectorAll(".mui-fixed");
      [].forEach.call(c, (u) => {
        n.push({
          value: u.style.paddingRight,
          property: "padding-right",
          el: u
        }), u.style.paddingRight = `${cd(u) + a}px`;
      });
    }
    let s;
    if (r.parentNode instanceof DocumentFragment)
      s = Et(r).body;
    else {
      const a = r.parentElement, c = Vn(r);
      s = (a == null ? void 0 : a.nodeName) === "HTML" && c.getComputedStyle(a).overflowY === "scroll" ? a : r;
    }
    n.push({
      value: s.style.overflow,
      property: "overflow",
      el: s
    }, {
      value: s.style.overflowX,
      property: "overflow-x",
      el: s
    }, {
      value: s.style.overflowY,
      property: "overflow-y",
      el: s
    }), s.style.overflow = "hidden";
  }
  return () => {
    n.forEach(({
      value: s,
      el: a,
      property: c
    }) => {
      s ? a.style.setProperty(c, s) : a.style.removeProperty(c);
    });
  };
}
function Gv(e) {
  const t = [];
  return [].forEach.call(e.children, (n) => {
    n.getAttribute("aria-hidden") === "true" && t.push(n);
  }), t;
}
class Hv {
  constructor() {
    this.modals = [], this.containers = [];
  }
  add(t, n) {
    let r = this.modals.indexOf(t);
    if (r !== -1)
      return r;
    r = this.modals.length, this.modals.push(t), t.modalRef && Pr(t.modalRef, !1);
    const i = Gv(n);
    dd(n, t.mount, t.modalRef, i, !0);
    const s = la(this.containers, (a) => a.container === n);
    return s !== -1 ? (this.containers[s].modals.push(t), r) : (this.containers.push({
      modals: [t],
      container: n,
      restore: null,
      hiddenSiblings: i
    }), r);
  }
  mount(t, n) {
    const r = la(this.containers, (s) => s.modals.includes(t)), i = this.containers[r];
    i.restore || (i.restore = Uv(i, n));
  }
  remove(t, n = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1)
      return r;
    const i = la(this.containers, (a) => a.modals.includes(t)), s = this.containers[i];
    if (s.modals.splice(s.modals.indexOf(t), 1), this.modals.splice(r, 1), s.modals.length === 0)
      s.restore && s.restore(), t.modalRef && Pr(t.modalRef, n), dd(s.container, t.mount, t.modalRef, s.hiddenSiblings, !1), this.containers.splice(i, 1);
    else {
      const a = s.modals[s.modals.length - 1];
      a.modalRef && Pr(a.modalRef, !1);
    }
    return r;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function Un(e, t, n, r, i) {
  if (process.env.NODE_ENV === "production")
    return null;
  const s = e[t], a = i || t;
  return s == null ? null : s && s.nodeType !== 1 ? new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an HTMLElement.`) : null;
}
function qv(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Np(e, t, n, r, i) {
  const s = e[t], a = i || t;
  if (s == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let c;
  const u = s.type;
  return typeof u == "function" && !qv(u) && (c = "Did you accidentally use a plain function component for an element instead?"), c !== void 0 ? new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const ir = kn(o.element, Np);
ir.isRequired = kn(o.element.isRequired, Np);
function sr(e) {
  var t;
  return parseInt(v.version, 10) >= 19 ? ((t = e == null ? void 0 : e.props) == null ? void 0 : t.ref) || null : (e == null ? void 0 : e.ref) || null;
}
function Ma(e, t) {
  var r;
  if (!e || !t)
    return !1;
  if (e.contains(t))
    return !0;
  const n = (r = t.getRootNode) == null ? void 0 : r.call(t);
  if (n && n instanceof ShadowRoot) {
    let i = t;
    for (; i; ) {
      if (e === i)
        return !0;
      i = i.parentNode ?? i.host ?? null;
    }
  }
  return !1;
}
const _a = "data-mui-focusable";
function Kv(e) {
  return e ? e.hasAttribute(_a) ? e : e.querySelector(`[${_a}]`) : null;
}
const Yv = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function Xv(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function Jv(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let n = t(`[name="${e.name}"]:checked`);
  return n || (n = t(`[name="${e.name}"]`)), n !== e;
}
function Qv(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || Jv(e));
}
function Zv(e) {
  const t = [], n = [];
  return Array.from(e.querySelectorAll(Yv)).forEach((r, i) => {
    const s = Xv(r);
    s === -1 || !Qv(r) || (s === 0 ? t.push(r) : n.push({
      documentOrder: i,
      tabIndex: s,
      node: r
    }));
  }), n.sort((r, i) => r.tabIndex === i.tabIndex ? r.documentOrder - i.documentOrder : r.tabIndex - i.tabIndex).map((r) => r.node).concat(t);
}
function e0() {
  return !0;
}
function ns(e) {
  const {
    children: t,
    disableAutoFocus: n = !1,
    disableEnforceFocus: r = !1,
    disableRestoreFocus: i = !1,
    getTabbable: s = Zv,
    isEnabled: a = e0,
    open: c
  } = e, u = v.useRef(!1), p = v.useRef(null), f = v.useRef(null), g = v.useRef(null), b = v.useRef(null), m = v.useRef(!1), x = v.useRef(null), h = ft(sr(t), x), S = v.useRef(null);
  v.useEffect(() => {
    !c || !x.current || (m.current = !n);
  }, [n, c]), v.useEffect(() => {
    if (u.current = !1, !c || !x.current)
      return;
    const E = Et(x.current), w = jn(E), C = Kv(x.current) ?? x.current;
    return Ma(x.current, w) || (C.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), C.setAttribute("tabIndex", "-1")), m.current && C.focus()), () => {
      !i && g.current && (u.current = !0, g.current.focus(), g.current = null);
    };
  }, [c]), v.useEffect(() => {
    if (!c || !x.current)
      return;
    const E = Et(x.current), w = (M) => {
      if (S.current = M, r || !a() || M.key !== "Tab")
        return;
      jn(E) === x.current && M.shiftKey && (u.current = !0, f.current && f.current.focus());
    }, C = () => {
      var B, I;
      const M = x.current;
      if (M === null)
        return;
      const D = jn(E);
      if (!E.hasFocus() || !a() || u.current) {
        u.current = !1;
        return;
      }
      if (Ma(M, D) || r && D !== p.current && D !== f.current)
        return;
      if (D !== b.current)
        b.current = null;
      else if (b.current !== null)
        return;
      if (!m.current)
        return;
      let L = [];
      if ((D === p.current || D === f.current) && (L = s(x.current)), L.length > 0) {
        const y = !!((B = S.current) != null && B.shiftKey && ((I = S.current) == null ? void 0 : I.key) === "Tab"), $ = L[0], P = L[L.length - 1];
        typeof $ != "string" && typeof P != "string" && (y ? P.focus() : $.focus());
      } else
        M.focus();
    };
    E.addEventListener("focusin", C), E.addEventListener("keydown", w, !0);
    const N = setInterval(() => {
      const M = jn(E);
      M && M.tagName === "BODY" && C();
    }, 50);
    return () => {
      clearInterval(N), E.removeEventListener("focusin", C), E.removeEventListener("keydown", w, !0);
    };
  }, [n, r, i, a, c, s]);
  const R = (E) => {
    g.current === null && (g.current = E.relatedTarget), m.current = !0, b.current = E.target;
    const w = t.props.onFocus;
    w && w(E);
  }, k = (E) => {
    g.current === null && (g.current = E.relatedTarget), m.current = !0;
  };
  return /* @__PURE__ */ T(v.Fragment, {
    children: [/* @__PURE__ */ l("div", {
      tabIndex: c ? 0 : -1,
      onFocus: k,
      ref: p,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ v.cloneElement(t, {
      ref: h,
      onFocus: R
    }), /* @__PURE__ */ l("div", {
      tabIndex: c ? 0 : -1,
      onFocus: k,
      ref: f,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" && (ns.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: ir,
  /**
   * If `true`, the focus trap will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any focus trap children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: o.bool,
  /**
   * If `true`, the focus trap will not prevent focus from leaving the focus trap while open.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: o.bool,
  /**
   * If `true`, the focus trap will not restore focus to previously focused element once
   * focus trap is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: o.bool,
  /**
   * Returns an array of ordered tabbable nodes (i.e. in tab order) within the root.
   * For instance, you can provide the "tabbable" npm dependency.
   * @param {HTMLElement} root
   */
  getTabbable: o.func,
  /**
   * This prop extends the `open` prop.
   * It allows to toggle the open state without having to wait for a rerender when changing the `open` prop.
   * This prop should be memoized.
   * It can be used to support multiple focus trap mounted at the same time.
   * @default function defaultIsEnabled(): boolean {
   *   return true;
   * }
   */
  isEnabled: o.func,
  /**
   * If `true`, focus is locked.
   */
  open: o.bool.isRequired
});
process.env.NODE_ENV !== "production" && (ns.propTypes = ks(ns.propTypes));
function t0(e) {
  return typeof e == "function" ? e() : e;
}
const Vr = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const {
    children: r,
    container: i,
    disablePortal: s = !1
  } = t, [a, c] = v.useState(null), u = ft(/* @__PURE__ */ v.isValidElement(r) ? sr(r) : null, n);
  if (Tt(() => {
    s || c(t0(i) || document.body);
  }, [i, s]), Tt(() => {
    if (a && !s)
      return Na(n, a), () => {
        Na(n, null);
      };
  }, [n, a, s]), s) {
    if (/* @__PURE__ */ v.isValidElement(r)) {
      const p = {
        ref: u
      };
      return /* @__PURE__ */ v.cloneElement(r, p);
    }
    return r;
  }
  return a && /* @__PURE__ */ fm.createPortal(r, a);
});
process.env.NODE_ENV !== "production" && (Vr.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The children to render into the `container`.
   */
  children: o.node,
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: o.oneOfType([Un, o.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: o.bool
});
process.env.NODE_ENV !== "production" && (Vr.propTypes = ks(Vr.propTypes));
const n0 = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  },
  exiting: {
    opacity: 0
  },
  exited: {
    opacity: 0
  }
}, o0 = {
  opacity: 0,
  visibility: "hidden"
}, hl = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = rr(), i = {
    enter: r.transitions.duration.enteringScreen,
    exit: r.transitions.duration.leavingScreen
  }, {
    addEndListener: s,
    appear: a = !0,
    children: c,
    easing: u,
    in: p,
    onEnter: f,
    onEntered: g,
    onEntering: b,
    onExit: m,
    onExited: x,
    onExiting: h,
    style: S,
    timeout: R = i,
    ...k
  } = t, E = v.useRef(null), w = ft(E, sr(c), n), C = St(E, b), N = St(E, (y, $) => {
    lp(y);
    const P = Ko({
      style: S,
      timeout: R,
      easing: u
    }, {
      mode: "enter"
    });
    y.style.transition = r.transitions.create("opacity", P), f && f(y, $);
  }), M = St(E, g), D = St(E, h), L = St(E, (y) => {
    const $ = Ko({
      style: S,
      timeout: R,
      easing: u
    }, {
      mode: "exit"
    });
    y.style.transition = r.transitions.create("opacity", $), m && m(y);
  }), B = St(E, (y) => {
    y.style.transition = "", x && x(y);
  });
  return /* @__PURE__ */ l(hn, {
    appear: a,
    in: p,
    nodeRef: E,
    onEnter: N,
    onEntered: M,
    onEntering: C,
    onExit: L,
    onExited: B,
    onExiting: D,
    addEndListener: (y) => {
      s && s(E.current, y);
    },
    timeout: R,
    ...k,
    children: (y, {
      ownerState: $,
      ...P
    }) => {
      const A = cp(y, p, n0, o0, S, c.props.style);
      return /* @__PURE__ */ v.cloneElement(c, {
        style: A,
        ref: w,
        ...P
      });
    }
  });
});
process.env.NODE_ENV !== "production" && (hl.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: o.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: o.bool,
  /**
   * A single child content element.
   */
  children: ir.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: o.oneOfType([o.shape({
    enter: o.string,
    exit: o.string
  }), o.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: o.bool,
  /**
   * @ignore
   */
  onEnter: o.func,
  /**
   * @ignore
   */
  onEntered: o.func,
  /**
   * @ignore
   */
  onEntering: o.func,
  /**
   * @ignore
   */
  onExit: o.func,
  /**
   * @ignore
   */
  onExited: o.func,
  /**
   * @ignore
   */
  onExiting: o.func,
  /**
   * @ignore
   */
  style: o.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  timeout: o.oneOfType([o.number, o.shape({
    appear: o.number,
    enter: o.number,
    exit: o.number
  })])
});
function r0(e) {
  return be("MuiBackdrop", e);
}
xe("MuiBackdrop", ["root", "invisible"]);
const i0 = (e) => {
  const {
    classes: t,
    invisible: n
  } = e;
  return Ce({
    root: ["root", n && "invisible"]
  }, r0, t);
}, s0 = ee("div", {
  name: "MuiBackdrop",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.invisible && t.invisible];
  }
})({
  position: "fixed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  WebkitTapHighlightColor: "transparent",
  variants: [{
    props: {
      invisible: !0
    },
    style: {
      backgroundColor: "transparent"
    }
  }]
}), gl = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiBackdrop"
  }), {
    children: i,
    className: s,
    component: a = "div",
    invisible: c = !1,
    open: u,
    slotProps: p = {},
    slots: f = {},
    transitionDuration: g,
    ...b
  } = r, m = {
    ...r,
    component: a,
    invisible: c
  }, x = i0(m), h = {
    component: a,
    slots: f,
    slotProps: p
  }, [S, R] = ge("root", {
    elementType: s0,
    externalForwardedProps: h,
    className: le(x.root, s),
    ownerState: m
  }), [k, E] = ge("transition", {
    elementType: hl,
    externalForwardedProps: h,
    ownerState: m
  });
  return /* @__PURE__ */ l(k, {
    in: u,
    timeout: g,
    ...b,
    ...E,
    children: /* @__PURE__ */ l(S, {
      ...R,
      ref: n,
      children: i
    })
  });
});
process.env.NODE_ENV !== "production" && (gl.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: o.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: o.elementType,
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   * @default false
   */
  invisible: o.bool,
  /**
   * If `true`, the component is shown.
   */
  open: o.bool.isRequired,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: o.shape({
    root: o.oneOfType([o.func, o.object]),
    transition: o.oneOfType([o.func, o.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: o.shape({
    root: o.elementType,
    transition: o.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object]),
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: o.oneOfType([o.number, o.shape({
    appear: o.number,
    enter: o.number,
    exit: o.number
  })])
});
function a0(e) {
  return typeof e == "function" ? e() : e;
}
function l0(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const ud = () => {
}, xi = new Hv();
function c0(e) {
  const {
    container: t,
    disableScrollLock: n = !1,
    closeAfterTransition: r = !1,
    onTransitionEnter: i,
    onTransitionExited: s,
    children: a,
    onClose: c,
    open: u,
    rootRef: p
  } = e, f = v.useRef({}), g = v.useRef(null), b = v.useRef(null), m = ft(b, p), [x, h] = v.useState(!u), S = l0(a);
  let R = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (R = !1);
  const k = () => Et(g.current), E = () => (f.current.modalRef = b.current, f.current.mount = g.current, f.current), w = () => {
    xi.mount(E(), {
      disableScrollLock: n
    }), b.current && (b.current.scrollTop = 0);
  }, C = Dt(() => {
    const P = a0(t) || k().body;
    xi.add(E(), P), b.current && w();
  }), N = () => xi.isTopModal(E()), M = Dt((P) => {
    g.current = P, P && (u && N() ? w() : b.current && Pr(b.current, R));
  }), D = v.useCallback(() => {
    xi.remove(E(), R);
  }, [R]);
  v.useEffect(() => () => {
    D();
  }, [D]), v.useEffect(() => {
    u ? C() : (!S || !r) && D();
  }, [u, D, S, r, C]);
  const L = (P) => (A) => {
    var F;
    (F = P.onKeyDown) == null || F.call(P, A), !(A.key !== "Escape" || A.which === 229 || // Wait until IME is settled.
    !N()) && (A.stopPropagation(), c && c(A, "escapeKeyDown"));
  }, B = (P) => (A) => {
    var F;
    (F = P.onClick) == null || F.call(P, A), A.target === A.currentTarget && c && c(A, "backdropClick");
  };
  return {
    getRootProps: (P = {}) => {
      const A = mp(e);
      delete A.onTransitionEnter, delete A.onTransitionExited;
      const F = {
        ...A,
        ...P
      };
      return {
        /*
         * Marking an element with the role presentation indicates to assistive technology
         * that this element should be ignored; it exists to support the web application and
         * is not meant for humans to interact with directly.
         * https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md
         */
        role: "presentation",
        ...F,
        onKeyDown: L(F),
        ref: m
      };
    },
    getBackdropProps: (P = {}) => {
      const A = P;
      return {
        "aria-hidden": !0,
        ...A,
        onClick: B(A),
        open: u
      };
    },
    getTransitionProps: () => {
      const P = () => {
        h(!1), i && i();
      }, A = () => {
        h(!0), s && s(), r && D();
      };
      return {
        onEnter: od(P, (a == null ? void 0 : a.props.onEnter) ?? ud),
        onExited: od(A, (a == null ? void 0 : a.props.onExited) ?? ud)
      };
    },
    rootRef: m,
    portalRef: M,
    isTopModal: N,
    exited: x,
    hasTransition: S
  };
}
function d0(e) {
  return be("MuiModal", e);
}
xe("MuiModal", ["root", "hidden", "backdrop"]);
const u0 = (e) => {
  const {
    open: t,
    exited: n,
    classes: r
  } = e;
  return Ce({
    root: ["root", !t && n && "hidden"],
    backdrop: ["backdrop"]
  }, d0, r);
}, p0 = ee("div", {
  name: "MuiModal",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, !n.open && n.exited && t.hidden];
  }
})(ke(({
  theme: e
}) => ({
  position: "fixed",
  zIndex: (e.vars || e).zIndex.modal,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  variants: [{
    props: ({
      ownerState: t
    }) => !t.open && t.exited,
    style: {
      visibility: "hidden"
    }
  }]
}))), f0 = ee(gl, {
  name: "MuiModal",
  slot: "Backdrop"
})({
  zIndex: -1
}), yl = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    name: "MuiModal",
    props: t
  }), {
    classes: i,
    className: s,
    closeAfterTransition: a = !1,
    children: c,
    container: u,
    component: p,
    disableAutoFocus: f = !1,
    disableEnforceFocus: g = !1,
    disablePortal: b = !1,
    disableRestoreFocus: m = !1,
    disableScrollLock: x = !1,
    hideBackdrop: h = !1,
    keepMounted: S = !1,
    onClose: R,
    onTransitionEnter: k,
    onTransitionExited: E,
    open: w,
    slotProps: C = {},
    slots: N = {},
    // eslint-disable-next-line react/prop-types
    theme: M,
    ...D
  } = r, L = {
    ...r,
    closeAfterTransition: a,
    disableAutoFocus: f,
    disableEnforceFocus: g,
    disablePortal: b,
    disableRestoreFocus: m,
    disableScrollLock: x,
    hideBackdrop: h,
    keepMounted: S
  }, {
    getRootProps: B,
    getBackdropProps: I,
    getTransitionProps: y,
    portalRef: $,
    isTopModal: P,
    exited: A,
    hasTransition: F
  } = c0({
    ...L,
    rootRef: n
  }), W = {
    ...L,
    exited: A
  }, H = u0(W), te = {};
  if (c.props.tabIndex === void 0 && (te.tabIndex = "-1"), F) {
    const {
      onEnter: ne,
      onExited: Q
    } = y();
    te.onEnter = ne, te.onExited = Q;
  }
  const z = {
    slots: N,
    slotProps: C
  }, [V, X] = ge("root", {
    ref: n,
    elementType: p0,
    externalForwardedProps: {
      ...z,
      ...D,
      component: p
    },
    getSlotProps: B,
    ownerState: W,
    className: le(s, H == null ? void 0 : H.root, !W.open && W.exited && (H == null ? void 0 : H.hidden))
  }), [re, oe] = ge("backdrop", {
    elementType: f0,
    externalForwardedProps: z,
    shouldForwardComponentProp: !0,
    getSlotProps: (ne) => I({
      ...ne,
      onClick: (Q) => {
        ne != null && ne.onClick && ne.onClick(Q);
      }
    }),
    className: H == null ? void 0 : H.backdrop,
    ownerState: W
  });
  return !S && !w && (!F || A) ? null : /* @__PURE__ */ l(Vr, {
    ref: $,
    container: u,
    disablePortal: b,
    children: /* @__PURE__ */ T(V, {
      ...X,
      children: [h ? null : /* @__PURE__ */ l(re, {
        ...oe
      }), /* @__PURE__ */ l(ns, {
        disableEnforceFocus: g,
        disableAutoFocus: f,
        disableRestoreFocus: m,
        isEnabled: P,
        open: w,
        children: /* @__PURE__ */ v.cloneElement(c, te)
      })]
    })
  });
});
process.env.NODE_ENV !== "production" && (yl.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: ir.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * When set to true the Modal waits until a nested Transition is completed before closing.
   * @default false
   */
  closeAfterTransition: o.bool,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: o.elementType,
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: o.oneOfType([Un, o.func]),
  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: o.bool,
  /**
   * If `true`, the modal will not prevent focus from leaving the modal while open.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: o.bool,
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: o.bool,
  /**
   * If `true`, the modal will not restore focus to previously focused element once
   * modal is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: o.bool,
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: o.bool,
  /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop: o.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Modal.
   * @default false
   */
  keepMounted: o.bool,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: o.func,
  /**
   * A function called when a transition enters.
   */
  onTransitionEnter: o.func,
  /**
   * A function called when a transition has exited.
   */
  onTransitionExited: o.func,
  /**
   * If `true`, the component is shown.
   */
  open: o.bool.isRequired,
  /**
   * The props used for each slot inside the Modal.
   * @default {}
   */
  slotProps: o.shape({
    backdrop: o.oneOfType([o.func, o.object]),
    root: o.oneOfType([o.func, o.object])
  }),
  /**
   * The components used for each slot inside the Modal.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: o.shape({
    backdrop: o.elementType,
    root: o.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object])
});
function m0(e) {
  return be("MuiDialog", e);
}
xe("MuiDialog", ["root", "backdrop", "scrollPaper", "scrollBody", "container", "paper", "paperWidthFalse", "paperWidthXs", "paperWidthSm", "paperWidthMd", "paperWidthLg", "paperWidthXl", "paperFullWidth", "paperFullScreen"]);
const bl = /* @__PURE__ */ v.createContext({});
process.env.NODE_ENV !== "production" && (bl.displayName = "DialogContext");
const h0 = ee(gl, {
  name: "MuiDialog",
  slot: "Backdrop"
})({
  // Improve scrollable dialog support.
  zIndex: -1
}), g0 = (e) => {
  const {
    classes: t,
    scroll: n,
    maxWidth: r,
    fullWidth: i,
    fullScreen: s
  } = e, a = {
    root: ["root"],
    backdrop: ["backdrop"],
    container: ["container", `scroll${ye(n)}`],
    paper: ["paper", `paperWidth${ye(String(r))}`, i && "paperFullWidth", s && "paperFullScreen"]
  };
  return Ce(a, m0, t);
}, y0 = ee(yl, {
  name: "MuiDialog",
  slot: "Root"
})({
  "@media print": {
    // Use !important to override the Modal inline-style.
    position: "absolute !important"
  }
}), b0 = ee("div", {
  name: "MuiDialog",
  slot: "Container",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.container, t[`scroll${ye(n.scroll)}`]];
  }
})({
  height: "100%",
  "@media print": {
    height: "auto"
  },
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0,
  variants: [{
    props: {
      scroll: "paper"
    },
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  }, {
    props: {
      scroll: "body"
    },
    style: {
      overflowY: "auto",
      overflowX: "hidden",
      textAlign: "center",
      "&::after": {
        content: '""',
        display: "inline-block",
        verticalAlign: "middle",
        height: "100%",
        width: "0"
      }
    }
  }]
}), v0 = ee(dt, {
  name: "MuiDialog",
  slot: "Paper",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.paper, t[`paperWidth${ye(String(n.maxWidth))}`], n.fullWidth && t.paperFullWidth, n.fullScreen && t.paperFullScreen];
  }
})(ke(({
  theme: e
}) => ({
  margin: 32,
  position: "relative",
  overflowY: "auto",
  "@media print": {
    overflowY: "visible",
    boxShadow: "none"
  },
  variants: [{
    props: {
      scroll: "paper"
    },
    style: {
      display: "flex",
      flexDirection: "column",
      maxHeight: "calc(100% - 64px)"
    }
  }, {
    props: {
      scroll: "body"
    },
    style: {
      display: "inline-block",
      verticalAlign: "middle",
      textAlign: "initial"
    }
  }, {
    props: ({
      ownerState: t
    }) => !t.maxWidth,
    style: {
      maxWidth: "calc(100% - 64px)"
    }
  }, {
    props: {
      maxWidth: "xs"
    },
    style: {
      maxWidth: e.breakpoints.unit === "px" ? Math.max(e.breakpoints.values.xs, 444) : `max(${e.breakpoints.values.xs}${e.breakpoints.unit}, 444px)`
    }
  }, {
    props: {
      maxWidth: "xs",
      scroll: "body"
    },
    style: {
      [e.breakpoints.down(Math.max(e.breakpoints.values.xs, 444) + 32 * 2)]: {
        maxWidth: "calc(100% - 64px)"
      }
    }
  }, ...Object.keys(e.breakpoints.values).filter((t) => t !== "xs").map((t) => ({
    props: {
      maxWidth: t
    },
    style: {
      maxWidth: `${e.breakpoints.values[t]}${e.breakpoints.unit}`
    }
  })), ...Object.keys(e.breakpoints.values).filter((t) => t !== "xs").map((t) => ({
    props: {
      maxWidth: t,
      scroll: "body"
    },
    style: {
      [e.breakpoints.down(e.breakpoints.values[t] + 32 * 2)]: {
        maxWidth: "calc(100% - 64px)"
      }
    }
  })), {
    props: ({
      ownerState: t
    }) => t.fullWidth,
    style: {
      width: "calc(100% - 64px)"
    }
  }, {
    props: ({
      ownerState: t
    }) => t.fullScreen,
    style: {
      margin: 0,
      width: "100%",
      maxWidth: "100%",
      height: "100%",
      maxHeight: "none",
      borderRadius: 0
    }
  }, {
    props: ({
      ownerState: t
    }) => t.fullScreen && t.scroll === "body",
    style: {
      margin: 0,
      maxWidth: "100%"
    }
  }]
}))), $o = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiDialog"
  }), i = rr(), s = {
    enter: i.transitions.duration.enteringScreen,
    exit: i.transitions.duration.leavingScreen
  }, {
    "aria-describedby": a,
    "aria-labelledby": c,
    "aria-modal": u = !0,
    children: p,
    className: f,
    fullScreen: g = !1,
    fullWidth: b = !1,
    maxWidth: m = "sm",
    onClick: x,
    onClose: h,
    open: S,
    PaperComponent: R = dt,
    role: k = "dialog",
    scroll: E = "paper",
    slots: w = {},
    slotProps: C = {},
    transitionDuration: N = s,
    ...M
  } = r, D = {
    ...r,
    fullScreen: g,
    fullWidth: b,
    maxWidth: m,
    scroll: E
  }, L = g0(D), B = v.useRef(), I = (Q) => {
    B.current = Q.target === Q.currentTarget;
  }, y = (Q) => {
    x && x(Q), B.current && (B.current = null, h && h(Q, "backdropClick"));
  }, $ = zn(c), P = v.useMemo(() => ({
    titleId: $
  }), [$]), A = {
    slots: w,
    slotProps: C
  }, [F, W] = ge("root", {
    elementType: y0,
    shouldForwardComponentProp: !0,
    externalForwardedProps: A,
    ownerState: D,
    className: le(L.root, f),
    ref: n
  }), [H, te] = ge("backdrop", {
    elementType: h0,
    shouldForwardComponentProp: !0,
    externalForwardedProps: A,
    ownerState: D,
    className: L.backdrop
  }), [z, V] = ge("paper", {
    elementType: v0,
    shouldForwardComponentProp: !0,
    externalForwardedProps: A,
    ownerState: D,
    className: L.paper,
    additionalProps: {
      elevation: 24,
      role: k,
      "aria-describedby": a,
      "aria-labelledby": $,
      "aria-modal": u,
      tabIndex: -1,
      [_a]: ""
    }
  }), [X, re] = ge("container", {
    elementType: b0,
    externalForwardedProps: A,
    ownerState: D,
    className: L.container
  }), [oe, ne] = ge("transition", {
    elementType: hl,
    externalForwardedProps: A,
    ownerState: D,
    additionalProps: {
      appear: !0,
      in: S,
      timeout: N,
      role: "presentation"
    }
  });
  return /* @__PURE__ */ l(F, {
    closeAfterTransition: !0,
    slots: {
      backdrop: H
    },
    slotProps: {
      backdrop: {
        transitionDuration: N,
        ...te
      }
    },
    onClose: h,
    open: S,
    onClick: y,
    ...W,
    ...M,
    children: /* @__PURE__ */ l(oe, {
      ...ne,
      children: /* @__PURE__ */ l(X, {
        onMouseDown: I,
        ...re,
        children: /* @__PURE__ */ l(z, {
          as: R,
          ...V,
          children: /* @__PURE__ */ l(bl.Provider, {
            value: P,
            children: p
          })
        })
      })
    })
  });
});
process.env.NODE_ENV !== "production" && ($o.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The id(s) of the element(s) that describe the dialog.
   */
  "aria-describedby": o.string,
  /**
   * The id(s) of the element(s) that label the dialog.
   */
  "aria-labelledby": o.string,
  /**
   * Informs assistive technologies that the element is modal.
   * It's added on the element with role="dialog".
   * @default true
   */
  "aria-modal": o.oneOfType([o.oneOf(["false", "true"]), o.bool]),
  /**
   * Dialog children, usually the included sub-components.
   */
  children: o.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * If `true`, the dialog is full-screen.
   * @default false
   */
  fullScreen: o.bool,
  /**
   * If `true`, the dialog stretches to `maxWidth`.
   *
   * Notice that the dialog width grow is limited by the default margin.
   * @default false
   */
  fullWidth: o.bool,
  /**
   * Determine the max-width of the dialog.
   * The dialog width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   * @default 'sm'
   */
  maxWidth: o.oneOfType([o.oneOf(["xs", "sm", "md", "lg", "xl", !1]), o.string]),
  /**
   * @ignore
   */
  onClick: o.func,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: o.func,
  /**
   * If `true`, the component is shown.
   */
  open: o.bool.isRequired,
  /**
   * The component used to render the body of the dialog.
   * @default Paper
   */
  PaperComponent: o.elementType,
  /**
   * The ARIA role for the dialog element.
   * The main dialog role is `dialog`, but `alertdialog` can be used if the content of the dialog requires immediate attention.
   * See https://www.w3.org/TR/wai-aria-1.2/#dialog and https://www.w3.org/TR/wai-aria-1.2/#alertdialog for more details.
   * @default 'dialog'
   */
  role: o.oneOf(["alertdialog", "dialog"]),
  /**
   * Determine the container for scrolling the dialog.
   * @default 'paper'
   */
  scroll: o.oneOf(["body", "paper"]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: o.shape({
    backdrop: o.oneOfType([o.func, o.object]),
    container: o.oneOfType([o.func, o.object]),
    paper: o.oneOfType([o.func, o.object]),
    root: o.oneOfType([o.func, o.object]),
    transition: o.oneOfType([o.func, o.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: o.shape({
    backdrop: o.elementType,
    container: o.elementType,
    paper: o.elementType,
    root: o.elementType,
    transition: o.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object]),
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  transitionDuration: o.oneOfType([o.number, o.shape({
    appear: o.number,
    enter: o.number,
    exit: o.number
  })])
});
function x0(e) {
  return be("MuiDialogActions", e);
}
xe("MuiDialogActions", ["root", "spacing"]);
const C0 = (e) => {
  const {
    classes: t,
    disableSpacing: n
  } = e;
  return Ce({
    root: ["root", !n && "spacing"]
  }, x0, t);
}, w0 = ee("div", {
  name: "MuiDialogActions",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, !n.disableSpacing && t.spacing];
  }
})({
  display: "flex",
  alignItems: "center",
  padding: 8,
  justifyContent: "flex-end",
  flex: "0 0 auto",
  variants: [{
    props: ({
      ownerState: e
    }) => !e.disableSpacing,
    style: {
      "& > :not(style) ~ :not(style)": {
        marginLeft: 8
      }
    }
  }]
}), Ao = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiDialogActions"
  }), {
    className: i,
    disableSpacing: s = !1,
    ...a
  } = r, c = {
    ...r,
    disableSpacing: s
  }, u = C0(c);
  return /* @__PURE__ */ l(w0, {
    className: le(u.root, i),
    ownerState: c,
    ref: n,
    ...a
  });
});
process.env.NODE_ENV !== "production" && (Ao.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: o.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * If `true`, the actions do not have additional margin.
   * @default false
   */
  disableSpacing: o.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object])
});
function S0(e) {
  return be("MuiDialogContent", e);
}
xe("MuiDialogContent", ["root", "dividers"]);
function T0(e) {
  return be("MuiDialogTitle", e);
}
const E0 = xe("MuiDialogTitle", ["root"]), O0 = (e) => {
  const {
    classes: t,
    dividers: n
  } = e;
  return Ce({
    root: ["root", n && "dividers"]
  }, S0, t);
}, R0 = ee("div", {
  name: "MuiDialogContent",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.dividers && t.dividers];
  }
})(ke(({
  theme: e
}) => ({
  flex: "1 1 auto",
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: "touch",
  overflowY: "auto",
  padding: "20px 24px",
  variants: [{
    props: ({
      ownerState: t
    }) => t.dividers,
    style: {
      padding: "16px 24px",
      borderTop: `1px solid ${(e.vars || e).palette.divider}`,
      borderBottom: `1px solid ${(e.vars || e).palette.divider}`
    }
  }, {
    props: ({
      ownerState: t
    }) => !t.dividers,
    style: {
      [`.${E0.root} + &`]: {
        paddingTop: 0
      }
    }
  }]
}))), Mo = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiDialogContent"
  }), {
    className: i,
    dividers: s = !1,
    ...a
  } = r, c = {
    ...r,
    dividers: s
  }, u = O0(c);
  return /* @__PURE__ */ l(R0, {
    className: le(u.root, i),
    ownerState: c,
    ref: n,
    ...a
  });
});
process.env.NODE_ENV !== "production" && (Mo.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: o.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * Display the top and bottom dividers.
   * @default false
   */
  dividers: o.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object])
});
function N0(e) {
  return be("MuiTypography", e);
}
const pd = xe("MuiTypography", ["root", "h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "body1", "body2", "inherit", "button", "caption", "overline", "alignLeft", "alignRight", "alignCenter", "alignJustify", "noWrap", "gutterBottom"]), k0 = (e) => {
  const {
    align: t,
    gutterBottom: n,
    noWrap: r,
    variant: i,
    classes: s
  } = e, a = {
    root: ["root", i, e.align !== "inherit" && `align${ye(t)}`, n && "gutterBottom", r && "noWrap"]
  };
  return Ce(a, N0, s);
}, P0 = ee("span", {
  name: "MuiTypography",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.variant && t[n.variant], n.align !== "inherit" && t[`align${ye(n.align)}`], n.noWrap && t.noWrap, n.gutterBottom && t.gutterBottom];
  }
})(ke(({
  theme: e
}) => {
  var t;
  return {
    margin: 0,
    variants: [{
      props: {
        variant: "inherit"
      },
      style: {
        // Some elements, like <button> on Chrome have default font that doesn't inherit, reset this.
        font: "inherit",
        lineHeight: "inherit",
        letterSpacing: "inherit"
      }
    }, ...Object.entries(e.typography).filter(([n, r]) => n !== "inherit" && r && typeof r == "object").map(([n, r]) => ({
      props: {
        variant: n
      },
      style: r
    })), ...Object.entries(e.palette).filter(_t()).map(([n]) => ({
      props: {
        color: n
      },
      style: {
        color: (e.vars || e).palette[n].main
      }
    })), ...Object.entries(((t = e.palette) == null ? void 0 : t.text) || {}).filter(([, n]) => typeof n == "string").map(([n]) => ({
      props: {
        color: `text${ye(n)}`
      },
      style: {
        color: (e.vars || e).palette.text[n]
      }
    })), {
      props: ({
        ownerState: n
      }) => n.align !== "inherit",
      style: {
        textAlign: "var(--Typography-textAlign)"
      }
    }, {
      props: ({
        ownerState: n
      }) => n.noWrap,
      style: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, {
      props: ({
        ownerState: n
      }) => n.gutterBottom,
      style: {
        marginBottom: "0.35em"
      }
    }]
  };
})), fd = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "p",
  body2: "p",
  inherit: "p"
}, K = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiTypography"
  }), {
    color: i,
    align: s = "inherit",
    className: a,
    component: c,
    gutterBottom: u = !1,
    noWrap: p = !1,
    variant: f = "body1",
    variantMapping: g = fd,
    ...b
  } = r, m = {
    ...r,
    align: s,
    color: i,
    className: a,
    component: c,
    gutterBottom: u,
    noWrap: p,
    variant: f,
    variantMapping: g
  }, x = c || g[f] || fd[f] || "span", h = k0(m);
  return /* @__PURE__ */ l(P0, {
    as: x,
    ref: n,
    className: le(h.root, a),
    ...b,
    ownerState: m,
    style: {
      ...s !== "inherit" && {
        "--Typography-textAlign": s
      },
      ...b.style
    }
  });
});
process.env.NODE_ENV !== "production" && (K.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Set the text-align on the component.
   * @default 'inherit'
   */
  align: o.oneOf(["center", "inherit", "justify", "left", "right"]),
  /**
   * The content of the component.
   */
  children: o.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color: o.oneOfType([o.oneOf(["primary", "secondary", "success", "error", "info", "warning", "textPrimary", "textSecondary", "textDisabled"]), o.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: o.elementType,
  /**
   * If `true`, the text will have a bottom margin.
   * @default false
   */
  gutterBottom: o.bool,
  /**
   * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   *
   * Note that text overflow can only happen with block or inline-block level elements
   * (the element needs to have a width in order to overflow).
   * @default false
   */
  noWrap: o.bool,
  /**
   * @ignore
   */
  style: o.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object]),
  /**
   * Applies the theme typography styles.
   * @default 'body1'
   */
  variant: o.oneOfType([o.oneOf(["body1", "body2", "button", "caption", "h1", "h2", "h3", "h4", "h5", "h6", "inherit", "overline", "subtitle1", "subtitle2"]), o.string]),
  /**
   * The component maps the variant prop to a range of different HTML element types.
   * For instance, subtitle1 to `<h6>`.
   * If you wish to change that mapping, you can provide your own.
   * Alternatively, you can use the `component` prop.
   * @default {
   *   h1: 'h1',
   *   h2: 'h2',
   *   h3: 'h3',
   *   h4: 'h4',
   *   h5: 'h5',
   *   h6: 'h6',
   *   subtitle1: 'h6',
   *   subtitle2: 'h6',
   *   body1: 'p',
   *   body2: 'p',
   *   inherit: 'p',
   * }
   */
  variantMapping: o.object
});
const I0 = (e) => {
  const {
    classes: t
  } = e;
  return Ce({
    root: ["root"]
  }, T0, t);
}, $0 = ee(K, {
  name: "MuiDialogTitle",
  slot: "Root"
})({
  padding: "16px 24px",
  flex: "0 0 auto"
}), _o = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiDialogTitle"
  }), {
    className: i,
    id: s,
    ...a
  } = r, c = r, u = I0(c), {
    titleId: p = s
  } = v.useContext(bl);
  return /* @__PURE__ */ l($0, {
    component: "h2",
    className: le(u.root, i),
    ownerState: c,
    ref: n,
    variant: "h6",
    id: s ?? p,
    ...a
  });
});
process.env.NODE_ENV !== "production" && (_o.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: o.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * @ignore
   */
  id: o.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object])
});
function md(e) {
  return e != null && !(Array.isArray(e) && e.length === 0);
}
function os(e, t = !1) {
  return e && (md(e.value) && e.value !== "" || t && md(e.defaultValue) && e.defaultValue !== "");
}
function A0(e) {
  return e.startAdornment;
}
const $s = /* @__PURE__ */ v.createContext(void 0);
process.env.NODE_ENV !== "production" && ($s.displayName = "FormControlContext");
function M0(e) {
  return be("MuiFormControl", e);
}
xe("MuiFormControl", ["root", "marginNone", "marginNormal", "marginDense", "fullWidth", "disabled"]);
const _0 = (e) => {
  const {
    classes: t,
    margin: n,
    fullWidth: r
  } = e, i = {
    root: ["root", n !== "none" && `margin${ye(n)}`, r && "fullWidth"]
  };
  return Ce(i, M0, t);
}, D0 = ee("div", {
  name: "MuiFormControl",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, t[`margin${ye(n.margin)}`], n.fullWidth && t.fullWidth];
  }
})({
  display: "inline-flex",
  flexDirection: "column",
  position: "relative",
  // Reset fieldset default style.
  minWidth: 0,
  padding: 0,
  margin: 0,
  border: 0,
  verticalAlign: "top",
  // Fix alignment issue on Safari.
  variants: [{
    props: {
      margin: "normal"
    },
    style: {
      marginTop: 16,
      marginBottom: 8
    }
  }, {
    props: {
      margin: "dense"
    },
    style: {
      marginTop: 8,
      marginBottom: 4
    }
  }, {
    props: {
      fullWidth: !0
    },
    style: {
      width: "100%"
    }
  }]
}), Cn = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiFormControl"
  }), {
    children: i,
    className: s,
    color: a = "primary",
    component: c = "div",
    disabled: u = !1,
    error: p = !1,
    focused: f,
    fullWidth: g = !1,
    hiddenLabel: b = !1,
    margin: m = "none",
    required: x = !1,
    size: h = "medium",
    variant: S = "outlined",
    ...R
  } = r, k = {
    ...r,
    color: a,
    component: c,
    disabled: u,
    error: p,
    fullWidth: g,
    hiddenLabel: b,
    margin: m,
    required: x,
    size: h,
    variant: S
  }, E = _0(k), [w, C] = v.useState(() => {
    let F = !1;
    return i && v.Children.forEach(i, (W) => {
      if (!sa(W, ["Input", "Select"]))
        return;
      const H = sa(W, ["Select"]) ? W.props.input : W;
      H && A0(H.props) && (F = !0);
    }), F;
  }), [N, M] = v.useState(() => {
    let F = !1;
    return i && v.Children.forEach(i, (W) => {
      sa(W, ["Input", "Select"]) && (os(W.props, !0) || os(W.props.inputProps, !0)) && (F = !0);
    }), F;
  }), [D, L] = v.useState(!1);
  u && D && L(!1);
  const B = f !== void 0 && !u ? f : D;
  let I;
  const y = v.useRef(!1);
  process.env.NODE_ENV !== "production" && (I = () => (y.current && console.error(["MUI: There are multiple `InputBase` components inside a FormControl.", "This creates visual inconsistencies, only use one `InputBase`."].join(`
`)), y.current = !0, () => {
    y.current = !1;
  }));
  const $ = v.useCallback(() => {
    M(!0);
  }, []), P = v.useCallback(() => {
    M(!1);
  }, []), A = v.useMemo(() => ({
    adornedStart: w,
    setAdornedStart: C,
    color: a,
    disabled: u,
    error: p,
    filled: N,
    focused: B,
    fullWidth: g,
    hiddenLabel: b,
    size: h,
    onBlur: () => {
      L(!1);
    },
    onFocus: () => {
      L(!0);
    },
    onEmpty: P,
    onFilled: $,
    registerEffect: I,
    required: x,
    variant: S
  }), [w, a, u, p, N, B, g, b, I, P, $, x, h, S]);
  return /* @__PURE__ */ l($s.Provider, {
    value: A,
    children: /* @__PURE__ */ l(D0, {
      as: c,
      ownerState: k,
      className: le(E.root, s),
      ref: n,
      ...R,
      children: i
    })
  });
});
process.env.NODE_ENV !== "production" && (Cn.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: o.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: o.oneOfType([o.oneOf(["primary", "secondary", "error", "info", "success", "warning"]), o.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: o.elementType,
  /**
   * If `true`, the label, input and helper text should be displayed in a disabled state.
   * @default false
   */
  disabled: o.bool,
  /**
   * If `true`, the label is displayed in an error state.
   * @default false
   */
  error: o.bool,
  /**
   * If `true`, the component is displayed in focused state.
   */
  focused: o.bool,
  /**
   * If `true`, the component will take up the full width of its container.
   * @default false
   */
  fullWidth: o.bool,
  /**
   * If `true`, the label is hidden.
   * This is used to increase density for a `FilledInput`.
   * Be sure to add `aria-label` to the `input` element.
   * @default false
   */
  hiddenLabel: o.bool,
  /**
   * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
   * @default 'none'
   */
  margin: o.oneOf(["dense", "none", "normal"]),
  /**
   * If `true`, the label will indicate that the `input` is required.
   * @default false
   */
  required: o.bool,
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: o.oneOfType([o.oneOf(["medium", "small"]), o.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object]),
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: o.oneOf(["filled", "outlined", "standard"])
});
function ar({
  props: e,
  states: t
}) {
  const n = v.useContext($s), r = {};
  return t.forEach((i) => {
    const s = e[i];
    r[i] = s === void 0 && n ? n[i] : s;
  }), [r, n];
}
function L0(e) {
  return be("MuiFormHelperText", e);
}
const hd = xe("MuiFormHelperText", ["root", "error", "disabled", "sizeSmall", "sizeMedium", "contained", "focused", "filled", "required"]);
var gd;
const F0 = (e) => {
  const {
    classes: t,
    contained: n,
    size: r,
    disabled: i,
    error: s,
    filled: a,
    focused: c,
    required: u
  } = e, p = {
    root: ["root", i && "disabled", s && "error", r && `size${ye(r)}`, n && "contained", c && "focused", a && "filled", u && "required"]
  };
  return Ce(p, L0, t);
}, j0 = ee("p", {
  name: "MuiFormHelperText",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.size && t[`size${ye(n.size)}`], n.contained && t.contained, n.filled && t.filled];
  }
})(ke(({
  theme: e
}) => ({
  color: (e.vars || e).palette.text.secondary,
  ...e.typography.caption,
  textAlign: "left",
  marginTop: 3,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
  [`&.${hd.disabled}`]: {
    color: (e.vars || e).palette.text.disabled
  },
  [`&.${hd.error}`]: {
    color: (e.vars || e).palette.error.main
  },
  variants: [{
    props: {
      size: "small"
    },
    style: {
      marginTop: 4
    }
  }, {
    props: ({
      ownerState: t
    }) => t.contained,
    style: {
      marginLeft: 14,
      marginRight: 14
    }
  }]
}))), rs = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiFormHelperText"
  }), {
    children: i,
    className: s,
    component: a = "p",
    disabled: c,
    error: u,
    filled: p,
    focused: f,
    margin: g,
    required: b,
    variant: m,
    ...x
  } = r, [h] = ar({
    props: r,
    states: ["variant", "size", "disabled", "error", "filled", "focused", "required"]
  }), S = {
    ...r,
    component: a,
    contained: h.variant === "filled" || h.variant === "outlined",
    variant: h.variant,
    size: h.size,
    disabled: h.disabled,
    error: h.error,
    filled: h.filled,
    focused: h.focused,
    required: h.required
  };
  delete S.ownerState;
  const R = F0(S);
  return /* @__PURE__ */ l(j0, {
    as: a,
    className: le(R.root, s),
    ref: n,
    ...x,
    ownerState: S,
    children: i === " " ? (
      // notranslate needed while Google Translate will not fix zero-width space issue
      gd || (gd = /* @__PURE__ */ l("span", {
        className: "notranslate",
        "aria-hidden": !0,
        children: "​"
      }))
    ) : i
  });
});
process.env.NODE_ENV !== "production" && (rs.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   *
   * If `' '` is provided, the component reserves one line height for displaying a future message.
   */
  children: o.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: o.elementType,
  /**
   * If `true`, the helper text should be displayed in a disabled state.
   */
  disabled: o.bool,
  /**
   * If `true`, helper text should be displayed in an error state.
   */
  error: o.bool,
  /**
   * If `true`, the helper text should use filled classes key.
   */
  filled: o.bool,
  /**
   * If `true`, the helper text should use focused classes key.
   */
  focused: o.bool,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: o.oneOf(["dense"]),
  /**
   * If `true`, the helper text should use required classes key.
   */
  required: o.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object]),
  /**
   * The variant to use.
   */
  variant: o.oneOfType([o.oneOf(["filled", "outlined", "standard"]), o.string])
});
function B0(e) {
  return be("MuiFormLabel", e);
}
const Ir = xe("MuiFormLabel", ["root", "colorSecondary", "focused", "disabled", "error", "filled", "required", "asterisk"]), W0 = (e) => {
  const {
    classes: t,
    color: n,
    focused: r,
    disabled: i,
    error: s,
    filled: a,
    required: c
  } = e, u = {
    root: ["root", `color${ye(n)}`, i && "disabled", s && "error", a && "filled", r && "focused", c && "required"],
    asterisk: ["asterisk", s && "error"]
  };
  return Ce(u, B0, t);
}, z0 = ee("label", {
  name: "MuiFormLabel",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.color === "secondary" && t.colorSecondary, n.filled && t.filled];
  }
})(ke(({
  theme: e
}) => ({
  color: (e.vars || e).palette.text.secondary,
  ...e.typography.body1,
  lineHeight: "1.4375em",
  padding: 0,
  position: "relative",
  variants: [...Object.entries(e.palette).filter(_t()).map(([t]) => ({
    props: {
      color: t
    },
    style: {
      [`&.${Ir.focused}`]: {
        color: (e.vars || e).palette[t].main
      }
    }
  })), {
    props: {},
    style: {
      [`&.${Ir.disabled}`]: {
        color: (e.vars || e).palette.text.disabled
      },
      [`&.${Ir.error}`]: {
        color: (e.vars || e).palette.error.main
      }
    }
  }]
}))), V0 = ee("span", {
  name: "MuiFormLabel",
  slot: "Asterisk"
})(ke(({
  theme: e
}) => ({
  [`&.${Ir.error}`]: {
    color: (e.vars || e).palette.error.main
  }
}))), kp = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiFormLabel"
  }), {
    children: i,
    className: s,
    color: a,
    component: c = "label",
    disabled: u,
    error: p,
    filled: f,
    focused: g,
    required: b,
    ...m
  } = r, [x] = ar({
    props: r,
    states: ["color", "required", "focused", "disabled", "error", "filled"]
  }), h = {
    ...r,
    color: x.color || "primary",
    component: c,
    disabled: x.disabled,
    error: x.error,
    filled: x.filled,
    focused: x.focused,
    required: x.required
  }, S = W0(h);
  return /* @__PURE__ */ T(z0, {
    as: c,
    ownerState: h,
    className: le(S.root, s),
    ref: n,
    ...m,
    children: [i, x.required && /* @__PURE__ */ T(V0, {
      ownerState: h,
      "aria-hidden": !0,
      className: S.asterisk,
      children: [" ", "*"]
    })]
  });
});
process.env.NODE_ENV !== "production" && (kp.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: o.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color: o.oneOfType([o.oneOf(["error", "info", "primary", "secondary", "success", "warning"]), o.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: o.elementType,
  /**
   * If `true`, the label should be displayed in a disabled state.
   */
  disabled: o.bool,
  /**
   * If `true`, the label is displayed in an error state.
   */
  error: o.bool,
  /**
   * If `true`, the label should use filled classes key.
   */
  filled: o.bool,
  /**
   * If `true`, the input of this label is focused (used by `FormGroup` components).
   */
  focused: o.bool,
  /**
   * If `true`, the label will indicate that the `input` is required.
   */
  required: o.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object])
});
function U0(e) {
  return be("MuiInputLabel", e);
}
const G0 = xe("MuiInputLabel", ["root", "focused", "disabled", "error", "required", "asterisk", "formControl", "sizeSmall", "shrink", "animated", "standard", "filled", "outlined"]), H0 = (e) => {
  const {
    classes: t,
    formControl: n,
    size: r,
    shrink: i,
    disableAnimation: s,
    variant: a,
    required: c
  } = e, u = {
    root: ["root", n && "formControl", !s && "animated", i && "shrink", r && r !== "medium" && `size${ye(r)}`, a],
    asterisk: [c && "asterisk"]
  }, p = Ce(u, U0, t);
  return {
    ...t,
    // forward the focused, disabled, etc. classes to the FormLabel
    ...p
  };
}, q0 = ee(kp, {
  shouldForwardProp: (e) => zt(e) || e === "classes",
  name: "MuiInputLabel",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [{
      [`& .${Ir.asterisk}`]: t.asterisk
    }, t.root, n.formControl && t.formControl, n.size === "small" && t.sizeSmall, n.shrink && t.shrink, !n.disableAnimation && t.animated, n.focused && t.focused, t[n.variant]];
  }
})(ke(({
  theme: e
}) => ({
  display: "block",
  transformOrigin: "top left",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "100%",
  variants: [{
    props: ({
      ownerState: t
    }) => t.formControl,
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      // slight alteration to spec spacing to match visual spec result
      transform: "translate(0, 20px) scale(1)"
    }
  }, {
    props: {
      size: "small"
    },
    style: {
      // Compensation for the `Input` small size style.
      transform: "translate(0, 17px) scale(1)"
    }
  }, {
    props: ({
      ownerState: t
    }) => t.shrink,
    style: {
      transform: "translate(0, -1.5px) scale(0.75)",
      transformOrigin: "top left",
      maxWidth: "133%"
    }
  }, {
    props: ({
      ownerState: t
    }) => !t.disableAnimation,
    style: {
      transition: e.transitions.create(["color", "transform", "max-width"], {
        duration: e.transitions.duration.shorter,
        easing: e.transitions.easing.easeOut
      })
    }
  }, {
    props: {
      variant: "filled"
    },
    style: {
      // Chrome's autofill feature gives the input field a yellow background.
      // Since the input field is behind the label in the HTML tree,
      // the input field is drawn last and hides the label with an opaque background color.
      // zIndex: 1 will raise the label above opaque background-colors of input.
      zIndex: 1,
      pointerEvents: "none",
      transform: "translate(12px, 16px) scale(1)",
      maxWidth: "calc(100% - 24px)"
    }
  }, {
    props: {
      variant: "filled",
      size: "small"
    },
    style: {
      transform: "translate(12px, 13px) scale(1)"
    }
  }, {
    props: ({
      variant: t,
      ownerState: n
    }) => t === "filled" && n.shrink,
    style: {
      userSelect: "none",
      pointerEvents: "auto",
      transform: "translate(12px, 7px) scale(0.75)",
      maxWidth: "calc(133% - 24px)"
    }
  }, {
    props: ({
      variant: t,
      ownerState: n,
      size: r
    }) => t === "filled" && n.shrink && r === "small",
    style: {
      transform: "translate(12px, 4px) scale(0.75)"
    }
  }, {
    props: {
      variant: "outlined"
    },
    style: {
      // see comment above on filled.zIndex
      zIndex: 1,
      pointerEvents: "none",
      transform: "translate(14px, 16px) scale(1)",
      maxWidth: "calc(100% - 24px)"
    }
  }, {
    props: {
      variant: "outlined",
      size: "small"
    },
    style: {
      transform: "translate(14px, 9px) scale(1)"
    }
  }, {
    props: ({
      variant: t,
      ownerState: n
    }) => t === "outlined" && n.shrink,
    style: {
      userSelect: "none",
      pointerEvents: "auto",
      // Theoretically, we should have (8+5)*2/0.75 = 34px
      // but it feels a better when it bleeds a bit on the left, so 32px.
      maxWidth: "calc(133% - 32px)",
      transform: "translate(14px, -9px) scale(0.75)"
    }
  }]
}))), wn = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    name: "MuiInputLabel",
    props: t
  }), {
    disableAnimation: i = !1,
    margin: s,
    shrink: a,
    variant: c,
    className: u,
    ...p
  } = r, [f, g] = ar({
    props: r,
    states: ["size", "variant", "required", "focused"]
  });
  let b = a;
  typeof b > "u" && g && (b = g.filled || g.focused || g.adornedStart);
  const m = {
    ...r,
    disableAnimation: i,
    formControl: g,
    shrink: b,
    size: f.size,
    variant: f.variant,
    required: f.required,
    focused: f.focused
  }, x = H0(m);
  return /* @__PURE__ */ l(q0, {
    "data-shrink": b,
    ref: n,
    className: le(x.root, u),
    ...p,
    ownerState: m,
    classes: x
  });
});
process.env.NODE_ENV !== "production" && (wn.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: o.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color: o.oneOfType([o.oneOf(["error", "info", "primary", "secondary", "success", "warning"]), o.string]),
  /**
   * If `true`, the transition animation is disabled.
   * @default false
   */
  disableAnimation: o.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: o.bool,
  /**
   * If `true`, the label is displayed in an error state.
   */
  error: o.bool,
  /**
   * If `true`, the `input` of this label is focused.
   */
  focused: o.bool,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: o.oneOf(["dense"]),
  /**
   * if `true`, the label will indicate that the `input` is required.
   */
  required: o.bool,
  /**
   * If `true`, the label is shrunk.
   */
  shrink: o.bool,
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: o.oneOfType([o.oneOf(["medium", "small"]), o.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object]),
  /**
   * The variant to use.
   */
  variant: o.oneOf(["filled", "outlined", "standard"])
});
const mn = /* @__PURE__ */ v.createContext({});
process.env.NODE_ENV !== "production" && (mn.displayName = "ListContext");
function Pp(e, t) {
  if (t == null) {
    e.focus();
    return;
  }
  try {
    e.focus({
      focusVisible: t === "keyboard"
    });
  } catch {
    e.focus();
  }
}
const vl = /* @__PURE__ */ v.createContext(void 0);
process.env.NODE_ENV !== "production" && (vl.displayName = "RovingTabIndexContext");
function K0() {
  const e = v.useContext(vl);
  if (e === void 0)
    throw new Error("MUI: RovingTabIndexContext is missing. Roving tab index items must be placed within a roving tab index provider.");
  return e;
}
const Y0 = Object.is;
function X0(e, t) {
  if (e === t)
    return !0;
  if (!(e instanceof Object) || !(t instanceof Object))
    return !1;
  let n = 0, r = 0;
  for (const i in e)
    if (n += 1, !Y0(e[i], t[i]) || !(i in t))
      return !1;
  for (const i in t)
    r += 1;
  return n === r;
}
const J0 = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "Home", "End"];
function Q0(e) {
  const {
    activeItemId: t,
    getDefaultActiveItemId: n,
    orientation: r,
    isRtl: i = !1,
    isItemFocusable: s = $r,
    wrap: a = !0
  } = e, [c, u] = v.useState(t), p = v.useRef(t);
  let f = c;
  t !== p.current && (p.current = t, t !== void 0 && t !== c && (f = t, u(t)));
  const g = v.useRef(null), b = v.useRef(/* @__PURE__ */ new Map()), [m, x] = v.useState(0), h = v.useMemo(() => Da(b.current), [m]), S = yd(f, h, s, n), R = v.useRef(S);
  R.current = S;
  const k = v.useCallback(() => {
    const I = Da(b.current), y = yd(R.current, I, s, n);
    return Ap(I, y);
  }, [n, s]), E = v.useCallback(() => b.current, []), w = Dt((I) => {
    const y = b.current.get(I.id);
    X0(y ?? null, I) || (b.current.set(I.id, I), x(($) => $ + 1));
  }), C = Dt((I) => {
    b.current.delete(I) && x((y) => y + 1);
  }), N = Dt((I) => {
    u(I);
  }), M = v.useCallback((I) => R.current === I, []), D = v.useCallback((I, y, $, P) => {
    var W;
    const A = Ci(b.current), F = Ip(A, I, y, $, P ?? s);
    return F ? ((W = F.element) == null || W.focus(), u(F.id), F) : null;
  }, [s]), L = v.useCallback((I) => ({
    onFocus: (P) => {
      const A = Ci(b.current), F = _p(A, P.target);
      F !== -1 && u(A[F].id);
    },
    onKeyDown: (P) => {
      if (P.altKey || P.shiftKey || P.ctrlKey || P.metaKey || !J0.includes(P.key))
        return;
      let A = r === "horizontal" ? "ArrowLeft" : "ArrowUp", F = r === "horizontal" ? "ArrowRight" : "ArrowDown";
      r === "horizontal" && i && (A = "ArrowRight", F = "ArrowLeft");
      const W = Ci(b.current), H = jn(Et(g.current)), te = H === g.current;
      let z = bd(W, H, R.current), V = "next";
      switch (P.key) {
        case A:
          V = "previous", P.preventDefault(), te && (z = W.length);
          break;
        case F:
          P.preventDefault(), te && (z = -1);
          break;
        case "Home":
          P.preventDefault(), z = -1;
          break;
        case "End":
          P.preventDefault(), V = "previous", z = W.length;
          break;
        default:
          return;
      }
      D(z, V, a);
    },
    ref: ox(I, (P) => {
      g.current = P;
    })
  }), [D, i, r, a]), B = v.useCallback((I) => {
    var F;
    const y = Ci(b.current), $ = jn(Et(g.current)), A = $ === g.current ? -1 : bd(y, $, R.current);
    return ((F = D(A, "next", !0, I)) == null ? void 0 : F.id) ?? null;
  }, [D]);
  return v.useMemo(() => ({
    activeItemId: S,
    focusNext: B,
    getActiveItem: k,
    getContainerProps: L,
    getItemMap: E,
    isItemActive: M,
    registerItem: w,
    setActiveItemId: N,
    unregisterItem: C
  }), [S, B, k, L, E, M, w, N, C]);
}
function Z0(e) {
  const t = K0(), {
    activeItemId: n,
    registerItem: r,
    unregisterItem: i
  } = t, s = v.useRef(null), a = v.useMemo(() => ({
    disabled: e.disabled ?? !1,
    element: null,
    focusableWhenDisabled: e.focusableWhenDisabled ?? !1,
    id: e.id,
    selected: e.selected ?? !1,
    textValue: e.textValue
  }), [e.disabled, e.focusableWhenDisabled, e.id, e.selected, e.textValue]), c = v.useRef(a);
  c.current = a;
  const u = v.useCallback((f) => {
    if (s.current = f, f == null) {
      queueMicrotask(() => {
        s.current == null && i(e.id);
      });
      return;
    }
    r({
      ...c.current,
      element: f
    });
  }, [e.id, r, i]), p = ft(e.ref, u);
  return Tt(() => {
    s.current && r({
      ...a,
      element: s.current
    });
  }, [a, r]), Tt(() => {
    const f = e.id;
    return () => {
      i(f);
    };
  }, [e.id, i]), {
    ref: p,
    tabIndex: n === e.id ? 0 : -1
  };
}
function yd(e, t, n, r) {
  return e != null ? ex(e, t, n) : tx(t, n, r);
}
function ex(e, t, n) {
  var i;
  const r = Mp(t, e);
  return r === -1 ? $p(t, n) : n(t[r]) ? t[r].id : ((i = Ip(t, r, "next", !1, n)) == null ? void 0 : i.id) ?? null;
}
function tx(e, t, n) {
  const r = n == null ? void 0 : n(e);
  if (r != null) {
    const i = Ap(e, r);
    if (i && t(i))
      return i.id;
  }
  return $p(e, t);
}
function bd(e, t, n) {
  if (t) {
    const r = _p(e, t);
    if (r !== -1)
      return r;
  }
  return Mp(e, n);
}
function Ip(e, t, n, r, i) {
  const s = e.length - 1;
  if (s === -1)
    return null;
  let a = !1, c = vd(t, s, n, r);
  const u = c;
  for (; c !== -1; ) {
    if (c === u) {
      if (a)
        return null;
      a = !0;
    }
    const p = e[c];
    if (!p || !i(p))
      c = vd(c, s, n, r);
    else
      return p;
  }
  return null;
}
function $p(e, t) {
  var n;
  return ((n = e.find((r) => t(r))) == null ? void 0 : n.id) ?? null;
}
function Ap(e, t) {
  return t == null ? null : e.find((n) => n.id === t) ?? null;
}
function Mp(e, t) {
  return t == null ? -1 : e.findIndex((n) => n.id === t);
}
function _p(e, t) {
  return t ? e.findIndex((n) => {
    var r;
    return n.element === t || ((r = n.element) == null ? void 0 : r.contains(t));
  }) : -1;
}
function Da(e) {
  const t = Array.from(e.values());
  if (t.every((i) => i.element == null))
    return t;
  const n = t.filter(La).sort((i, s) => nx(i.element, s.element)), r = t.filter((i) => !La(i));
  return [...n, ...r];
}
function Ci(e) {
  return Da(e).filter(La);
}
function vd(e, t, n, r = !0) {
  return n === "next" ? e === t ? r ? 0 : -1 : e + 1 : e === 0 ? r ? t : -1 : e - 1;
}
function $r(e) {
  return e.element ? e.focusableWhenDisabled ? !0 : !e.disabled && !e.element.hasAttribute("disabled") && e.element.getAttribute("aria-disabled") !== "true" && e.element.hasAttribute("tabindex") : !1;
}
function La(e) {
  return e.element != null && e.element.isConnected;
}
function nx(e, t) {
  if (e === t)
    return 0;
  const n = e.compareDocumentPosition(t);
  return n & Node.DOCUMENT_POSITION_FOLLOWING || n & Node.DOCUMENT_POSITION_CONTAINED_BY ? -1 : n & Node.DOCUMENT_POSITION_PRECEDING || n & Node.DOCUMENT_POSITION_CONTAINS ? 1 : 0;
}
function ox(...e) {
  return (t) => {
    e.forEach((n) => {
      Na(n ?? null, t);
    });
  };
}
const xd = xe("MuiDivider", ["root", "absolute", "fullWidth", "inset", "middle", "flexItem", "vertical", "withChildren", "textAlignRight", "textAlignLeft", "wrapper", "wrapperVertical"]);
function rx(e) {
  return be("MuiListItemIcon", e);
}
const Cd = xe("MuiListItemIcon", ["root", "alignItemsFlexStart"]), ix = (e) => {
  const {
    alignItems: t,
    classes: n
  } = e;
  return Ce({
    root: ["root", t === "flex-start" && "alignItemsFlexStart"]
  }, rx, n);
}, sx = ee("div", {
  name: "MuiListItemIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.alignItems === "flex-start" && t.alignItemsFlexStart];
  }
})(ke(({
  theme: e
}) => ({
  minWidth: e.spacing(4.5),
  color: (e.vars || e).palette.action.active,
  flexShrink: 0,
  display: "inline-flex",
  variants: [{
    props: {
      alignItems: "flex-start"
    },
    style: {
      marginTop: 8
    }
  }]
}))), Dp = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiListItemIcon"
  }), {
    className: i,
    ...s
  } = r, a = v.useContext(mn), c = {
    ...r,
    alignItems: a.alignItems
  }, u = ix(c);
  return /* @__PURE__ */ l(sx, {
    className: le(u.root, i),
    ownerState: c,
    ref: n,
    ...s
  });
});
process.env.NODE_ENV !== "production" && (Dp.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component, normally `Icon`, `SvgIcon`,
   * or a `@mui/icons-material` SVG icon element.
   */
  children: o.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object])
});
function ax(e) {
  return be("MuiListItemText", e);
}
const jo = xe("MuiListItemText", ["root", "multiline", "dense", "inset", "primary", "secondary"]), lx = (e) => {
  const {
    classes: t,
    inset: n,
    primary: r,
    secondary: i,
    dense: s
  } = e;
  return Ce({
    root: ["root", n && "inset", s && "dense", r && i && "multiline"],
    primary: ["primary"],
    secondary: ["secondary"]
  }, ax, t);
}, cx = ee("div", {
  name: "MuiListItemText",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [{
      [`& .${jo.primary}`]: t.primary
    }, {
      [`& .${jo.secondary}`]: t.secondary
    }, t.root, n.inset && t.inset, n.primary && n.secondary && t.multiline, n.dense && t.dense];
  }
})({
  flex: "1 1 auto",
  minWidth: 0,
  marginTop: 4,
  marginBottom: 4,
  // Combine this and the below selector once https://github.com/emotion-js/emotion/issues/3366 is solved
  [`.${pd.root}:where(& .${jo.primary})`]: {
    display: "block"
  },
  [`.${pd.root}:where(& .${jo.secondary})`]: {
    display: "block"
  },
  variants: [{
    props: ({
      ownerState: e
    }) => e.primary && e.secondary,
    style: {
      marginTop: 6,
      marginBottom: 6
    }
  }, {
    props: ({
      ownerState: e
    }) => e.inset,
    style: {
      paddingLeft: 56
    }
  }]
}), Lp = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiListItemText"
  }), {
    children: i,
    className: s,
    disableTypography: a = !1,
    inset: c = !1,
    primary: u,
    secondary: p,
    slots: f = {},
    slotProps: g = {},
    ...b
  } = r, {
    dense: m
  } = v.useContext(mn);
  let x = u ?? i, h = p;
  const S = {
    ...r,
    disableTypography: a,
    inset: c,
    primary: !!x,
    secondary: !!h,
    dense: m
  }, R = lx(S), k = {
    slots: f,
    slotProps: g
  }, [E, w] = ge("root", {
    className: le(R.root, s),
    elementType: cx,
    externalForwardedProps: {
      ...k,
      ...b
    },
    ownerState: S,
    ref: n
  }), [C, N] = ge("primary", {
    className: R.primary,
    elementType: K,
    externalForwardedProps: k,
    ownerState: S
  }), [M, D] = ge("secondary", {
    className: R.secondary,
    elementType: K,
    externalForwardedProps: k,
    ownerState: S
  });
  return x != null && x.type !== K && !a && (x = /* @__PURE__ */ l(C, {
    variant: m ? "body2" : "body1",
    component: N != null && N.variant ? void 0 : "span",
    ...N,
    children: x
  })), h != null && h.type !== K && !a && (h = /* @__PURE__ */ l(M, {
    variant: "body2",
    color: "textSecondary",
    ...D,
    children: h
  })), /* @__PURE__ */ T(E, {
    ...w,
    children: [x, h]
  });
});
process.env.NODE_ENV !== "production" && (Lp.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Alias for the `primary` prop.
   */
  children: o.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * If `true`, the children won't be wrapped by a Typography component.
   * This can be useful to render an alternative Typography variant by wrapping
   * the `children` (or `primary`) text, and optional `secondary` text
   * with the Typography component.
   * @default false
   */
  disableTypography: o.bool,
  /**
   * If `true`, the children are indented.
   * This should be used if there is no left avatar or left icon.
   * @default false
   */
  inset: o.bool,
  /**
   * The main content element.
   */
  primary: o.node,
  /**
   * The secondary content element.
   */
  secondary: o.node,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: o.shape({
    primary: o.oneOfType([o.func, o.object]),
    root: o.oneOfType([o.func, o.object]),
    secondary: o.oneOfType([o.func, o.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: o.shape({
    primary: o.elementType,
    root: o.elementType,
    secondary: o.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object])
});
const xl = /* @__PURE__ */ v.createContext(void 0);
process.env.NODE_ENV !== "production" && (xl.displayName = "MenuListContext");
function dx() {
  const e = v.useContext(xl);
  if (e === void 0)
    throw new Error("MUI: MenuListContext is missing. MenuItems must be placed within Menu or MenuList.");
  return e;
}
function ux(e) {
  return e ? e.type === "mousedown" || e.type === "pointerdown" || e.type === "touchstart" ? "pointer" : e.type === "keydown" || e.type === "click" && e.detail === 0 ? "keyboard" : null : null;
}
function px(e) {
  return e == null || typeof e == "string" && !e.trim();
}
function wd(e, t) {
  return typeof t == "object" && t !== null ? e === t : String(e) === String(t);
}
const Cl = /* @__PURE__ */ v.createContext(null);
process.env.NODE_ENV !== "production" && (Cl.displayName = "SelectFocusSourceContext");
function Fp() {
  return v.useContext(Cl);
}
const fx = Cl.Provider;
function mx(e) {
  return be("MuiMenuItem", e);
}
const yr = xe("MuiMenuItem", ["root", "focusVisible", "dense", "disabled", "divider", "gutters", "selected"]), hx = (e, t) => {
  const {
    ownerState: n
  } = e;
  return [t.root, n.dense && t.dense, n.divider && t.divider, !n.disableGutters && t.gutters];
}, gx = (e) => {
  const {
    disabled: t,
    dense: n,
    divider: r,
    disableGutters: i,
    selected: s,
    classes: a
  } = e, u = Ce({
    root: ["root", n && "dense", t && "disabled", !i && "gutters", r && "divider", s && "selected"]
  }, mx, a);
  return {
    ...a,
    ...u
  };
}, yx = ee(Zn, {
  shouldForwardProp: (e) => zt(e) || e === "classes",
  name: "MuiMenuItem",
  slot: "Root",
  overridesResolver: hx
})(ke(({
  theme: e
}) => ({
  ...e.typography.body1,
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  position: "relative",
  textDecoration: "none",
  minHeight: 48,
  paddingTop: 6,
  paddingBottom: 6,
  boxSizing: "border-box",
  whiteSpace: "nowrap",
  "&:hover": {
    textDecoration: "none",
    backgroundColor: (e.vars || e).palette.action.hover,
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  },
  [`&.${yr.selected}`]: {
    backgroundColor: e.alpha((e.vars || e).palette.primary.main, (e.vars || e).palette.action.selectedOpacity),
    [`&.${yr.focusVisible}`]: {
      backgroundColor: e.alpha((e.vars || e).palette.primary.main, `${(e.vars || e).palette.action.selectedOpacity} + ${(e.vars || e).palette.action.focusOpacity}`)
    }
  },
  [`&.${yr.selected}:hover`]: {
    backgroundColor: e.alpha((e.vars || e).palette.primary.main, `${(e.vars || e).palette.action.selectedOpacity} + ${(e.vars || e).palette.action.hoverOpacity}`),
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      backgroundColor: e.alpha((e.vars || e).palette.primary.main, (e.vars || e).palette.action.selectedOpacity)
    }
  },
  [`&.${yr.focusVisible}`]: {
    backgroundColor: (e.vars || e).palette.action.focus
  },
  [`&.${yr.disabled}`]: {
    opacity: (e.vars || e).palette.action.disabledOpacity
  },
  [`& + .${xd.root}`]: {
    marginTop: e.spacing(1),
    marginBottom: e.spacing(1)
  },
  [`& + .${xd.inset}`]: {
    marginLeft: 52
  },
  [`& .${jo.root}`]: {
    marginTop: 0,
    marginBottom: 0
  },
  [`& .${jo.inset}`]: {
    paddingLeft: 36
  },
  [`& .${Cd.root}`]: {
    minWidth: 36
  },
  variants: [{
    props: ({
      ownerState: t
    }) => !t.disableGutters,
    style: {
      paddingLeft: 16,
      paddingRight: 16
    }
  }, {
    props: ({
      ownerState: t
    }) => t.divider,
    style: {
      borderBottom: `1px solid ${(e.vars || e).palette.divider}`,
      backgroundClip: "padding-box"
    }
  }, {
    props: ({
      ownerState: t
    }) => !t.dense,
    style: {
      [e.breakpoints.up("sm")]: {
        minHeight: "auto"
      }
    }
  }, {
    props: ({
      ownerState: t
    }) => t.dense,
    style: {
      minHeight: 32,
      // https://m2.material.io/components/menus#specs > Dense
      paddingTop: 4,
      paddingBottom: 4,
      ...e.typography.body2,
      [`& .${Cd.root} svg`]: {
        fontSize: "1.25rem"
      }
    }
  }]
}))), It = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiMenuItem"
  }), {
    autoFocus: i = !1,
    component: s = "li",
    dense: a = !1,
    divider: c = !1,
    disableGutters: u = !1,
    focusVisibleClassName: p,
    role: f = "menuitem",
    tabIndex: g,
    className: b,
    ...m
  } = r, x = Fp(), h = v.useContext(mn), S = v.useMemo(() => ({
    dense: a || h.dense || !1,
    disableGutters: u
  }), [h.dense, a, u]), R = dx(), k = zn(), E = R.suppressInitialFocusVisible, w = R.itemsFocusableWhenDisabled, C = v.useRef(null);
  Tt(() => {
    i && (C.current ? Pp(C.current, x) : process.env.NODE_ENV !== "production" && console.error("MUI: Unable to set focus to a MenuItem whose component has not been rendered."));
  }, [i]);
  const N = {
    ...r,
    dense: S.dense,
    divider: c,
    disableGutters: u
  }, M = gx(r), {
    root: D,
    ...L
  } = M, B = Z0({
    id: k,
    ref: n,
    disabled: r.disabled,
    focusableWhenDisabled: w,
    selected: r.selected
  }), I = ft(C, B.ref);
  let y;
  return g !== void 0 ? y = g : R.variant === "selectedMenu" ? y = B.tabIndex : (!r.disabled || w) && (y = -1), /* @__PURE__ */ l(mn.Provider, {
    value: S,
    children: /* @__PURE__ */ l(yx, {
      ref: I,
      role: f,
      tabIndex: y,
      component: s,
      internalNativeButton: !1,
      focusableWhenDisabled: w,
      suppressFocusVisible: E,
      focusVisibleClassName: le(M.focusVisible, p),
      className: le(M.root, b),
      ...m,
      ownerState: N,
      classes: L
    })
  });
});
process.env.NODE_ENV !== "production" && (It.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the list item is focused during the first mount.
   * Focus will also be triggered if the value changes from false to true.
   * @default false
   */
  autoFocus: o.bool,
  /**
   * The content of the component.
   */
  children: o.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: o.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * The prop defaults to the value inherited from the parent Menu component.
   * @default false
   */
  dense: o.bool,
  /**
   * @ignore
   */
  disabled: o.bool,
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: o.bool,
  /**
   * If `true`, a 1px light border is added to the bottom of the menu item.
   * @default false
   */
  divider: o.bool,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: o.string,
  /**
   * @ignore
   */
  role: o.string,
  /**
   * If `true`, the component is selected.
   * @default false
   */
  selected: o.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object]),
  /**
   * @default 0
   */
  tabIndex: o.number
});
function jp(e) {
  var g;
  const {
    elementType: t,
    externalSlotProps: n,
    ownerState: r,
    skipResolvingSlotProps: i = !1,
    ...s
  } = e, a = i ? {} : fp(n, r), {
    props: c,
    internalRef: u
  } = hp({
    ...s,
    externalSlotProps: a
  }), p = ft(u, a == null ? void 0 : a.ref, (g = e.additionalProps) == null ? void 0 : g.ref);
  return pp(t, {
    ...c,
    ref: p
  }, r);
}
function bx(e) {
  return be("MuiList", e);
}
xe("MuiList", ["root", "padding", "dense", "subheader"]);
const vx = (e) => {
  const {
    classes: t,
    disablePadding: n,
    dense: r,
    subheader: i
  } = e;
  return Ce({
    root: ["root", !n && "padding", r && "dense", i && "subheader"]
  }, bx, t);
}, xx = ee("ul", {
  name: "MuiList",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, !n.disablePadding && t.padding, n.dense && t.dense, n.subheader && t.subheader];
  }
})({
  listStyle: "none",
  margin: 0,
  padding: 0,
  position: "relative",
  variants: [{
    props: ({
      ownerState: e
    }) => !e.disablePadding,
    style: {
      paddingTop: 8,
      paddingBottom: 8
    }
  }, {
    props: ({
      ownerState: e
    }) => e.subheader,
    style: {
      paddingTop: 0,
      isolation: "isolate"
      // Prevent overlap with iOS overlay scrollbars.
    }
  }]
}), wl = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiList"
  }), {
    children: i,
    className: s,
    component: a = "ul",
    dense: c = !1,
    disablePadding: u = !1,
    subheader: p,
    ...f
  } = r, g = v.useMemo(() => ({
    dense: c
  }), [c]), b = {
    ...r,
    component: a,
    dense: c,
    disablePadding: u
  }, m = vx(b);
  return /* @__PURE__ */ l(mn.Provider, {
    value: g,
    children: /* @__PURE__ */ T(xx, {
      as: a,
      className: le(m.root, s),
      ref: n,
      ownerState: b,
      ...f,
      children: [p, i]
    })
  });
});
process.env.NODE_ENV !== "production" && (wl.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: o.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: o.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used for
   * the list and list items.
   * The prop is available to descendant components as the `dense` context.
   * @default false
   */
  dense: o.bool,
  /**
   * If `true`, vertical padding is removed from the list.
   * @default false
   */
  disablePadding: o.bool,
  /**
   * The content of the subheader, normally `ListSubheader`.
   */
  subheader: o.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object])
});
function Cx(e) {
  const t = (e == null ? void 0 : e.element) ?? e;
  if (!t)
    return "";
  if ((e == null ? void 0 : e.textValue) !== void 0)
    return e.textValue;
  let n = t.innerText;
  return n === void 0 && (n = t.textContent), n ?? "";
}
function Bp(e, t) {
  if (t === void 0)
    return !0;
  let n = Cx(e);
  return n = n.trim().toLowerCase(), n.length === 0 ? !1 : t.repeating ? n[0] === t.keys[0] : n.startsWith(t.keys.join(""));
}
function wx(e, t) {
  return Bp(e, t) ? $r(e) : !1;
}
function Sx(e, t) {
  Pp(e, t);
}
const Wp = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const {
    // private
    // eslint-disable-next-line react/prop-types
    actions: r,
    autoFocus: i = !1,
    autoFocusItem: s = !1,
    children: a,
    className: c,
    disabledItemsFocusable: u = !1,
    disableListWrap: p = !1,
    onKeyDown: f,
    variant: g = "selectedMenu",
    ...b
  } = t, m = v.useRef(null), x = v.useRef(!1), [h, S] = v.useState(!1), R = Fp(), k = v.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  }), E = v.useCallback((A) => {
    var F, W, H;
    return g === "selectedMenu" ? ((F = A.find((te) => te.selected && $r(te))) == null ? void 0 : F.id) ?? ((W = A.find((te) => $r(te))) == null ? void 0 : W.id) ?? null : ((H = A.find((te) => $r(te))) == null ? void 0 : H.id) ?? null;
  }, [g]), w = Q0({
    activeItemId: void 0,
    getDefaultActiveItemId: E,
    orientation: "vertical",
    wrap: !p
  }), {
    activeItemId: C,
    focusNext: N,
    getActiveItem: M,
    getContainerProps: D,
    getItemMap: L
  } = w, B = Dt((A = !1) => {
    if (!m.current || !A && x.current)
      return null;
    if (s) {
      const F = M();
      if (F != null && F.element) {
        const W = Array.from(L().values()).some((te) => te.selected), H = g === "menu" && W && !F.selected && R == null;
        return S(H), Sx(F.element, R), x.current = !0, F.element;
      }
      return i ? (S(!1), m.current.focus(), m.current) : null;
    }
    return i ? (S(!1), m.current.focus(), x.current = !0, m.current) : (S(!1), null);
  });
  Tt(() => {
    if (!i && !s) {
      x.current = !1, S(!1);
      return;
    }
    B();
  }, [C, s, i, B]), v.useImperativeHandle(r, () => ({
    adjustStyleForScrollbar: (A, {
      direction: F
    }) => {
      const W = !m.current.style.width;
      if (A.clientHeight < m.current.clientHeight && W) {
        const H = `${Rp(Vn(A))}px`;
        m.current.style[F === "rtl" ? "paddingLeft" : "paddingRight"] = H, m.current.style.width = `calc(100% + ${H})`;
      }
      return m.current;
    },
    focusInitialTarget: () => {
      if (!m.current)
        return null;
      const A = jn(Et(m.current));
      return A && Ma(m.current, A) ? A : B(!0);
    }
  }), [B]);
  const I = D(), y = ft(m, I.ref, n), $ = v.useMemo(() => ({
    itemsFocusableWhenDisabled: u,
    suppressInitialFocusVisible: h,
    variant: g
  }), [u, h, g]), P = Dt((A) => {
    if (h && S(!1), (A.ctrlKey || A.metaKey || A.altKey) && f) {
      f(A);
      return;
    }
    if (I.onKeyDown(A), A.key.length === 1) {
      const W = k.current, H = A.key.toLowerCase(), te = performance.now();
      W.keys.length > 0 && (te - W.lastTime > 500 ? (W.keys = [], W.repeating = !0, W.previousKeyMatched = !0) : W.repeating && H !== W.keys[0] && (W.repeating = !1)), W.lastTime = te, W.keys.push(H);
      const z = jn(Et(m.current)), V = z && !W.repeating && Bp(z, W);
      W.previousKeyMatched && (V || N((X) => wx(X, W)) != null) ? A.preventDefault() : W.previousKeyMatched = !1;
    }
    f && f(A);
  });
  return /* @__PURE__ */ l(wl, {
    role: "menu",
    ref: y,
    className: c,
    onKeyDown: P,
    onFocus: I.onFocus,
    tabIndex: -1,
    ...b,
    children: /* @__PURE__ */ l(xl.Provider, {
      value: $,
      children: /* @__PURE__ */ l(vl.Provider, {
        value: w,
        children: a
      })
    })
  });
});
process.env.NODE_ENV !== "production" && (Wp.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, will focus the `[role="menu"]` container and move into tab order.
   * @default false
   */
  autoFocus: o.bool,
  /**
   * If `true`, will focus the first menuitem if `variant="menu"` or selected item
   * if `variant="selectedMenu"`.
   * @default false
   */
  autoFocusItem: o.bool,
  /**
   * MenuList contents, normally `MenuItem`s.
   */
  children: o.node,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * If `true`, will allow focus on disabled items.
   * @default false
   */
  disabledItemsFocusable: o.bool,
  /**
   * If `true`, the menu items will not wrap focus.
   * @default false
   */
  disableListWrap: o.bool,
  /**
   * @ignore
   */
  onKeyDown: o.func,
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus
   * and the vertical alignment relative to the anchor element.
   * @default 'selectedMenu'
   */
  variant: o.oneOf(["menu", "selectedMenu"])
});
function As() {
  return !(/jsdom|HappyDOM/.test(window.navigator.userAgent) || // TODO(v9): Remove the test environment check
  // eslint-disable-next-line mui/consistent-production-guard
  process.env.NODE_ENV === "test");
}
function Ar(e) {
  return `scale(${e}, ${e ** 2})`;
}
const Tx = {
  entering: {
    opacity: 1,
    transform: Ar(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  },
  exiting: {
    opacity: 0,
    transform: Ar(0.75)
  },
  exited: {
    opacity: 0,
    transform: Ar(0.75)
  }
}, Ex = {
  opacity: 0,
  transform: Ar(0.75),
  visibility: "hidden"
}, Ur = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const {
    addEndListener: r,
    appear: i = !0,
    children: s,
    easing: a,
    in: c,
    onEnter: u,
    onEntered: p,
    onEntering: f,
    onExit: g,
    onExited: b,
    onExiting: m,
    style: x,
    timeout: h = "auto",
    ...S
  } = t, R = Fn(), k = v.useRef(), E = rr(), w = v.useRef(null), C = ft(w, sr(s), n), N = St(w, f), M = St(w, ($, P) => {
    lp($);
    const {
      duration: A,
      delay: F,
      easing: W
    } = Ko({
      style: x,
      timeout: h,
      easing: a
    }, {
      mode: "enter"
    });
    let H;
    h === "auto" ? (H = E.transitions.getAutoHeightDuration($.clientHeight), k.current = H) : H = A, $.style.transition = [E.transitions.create("opacity", {
      duration: H,
      delay: F
    }), E.transitions.create("transform", {
      duration: H * 0.666,
      delay: F,
      easing: W
    })].join(","), u && u($, P);
  }), D = St(w, p), L = St(w, m), B = St(w, ($) => {
    const {
      duration: P,
      delay: A,
      easing: F
    } = Ko({
      style: x,
      timeout: h,
      easing: a
    }, {
      mode: "exit"
    });
    let W;
    h === "auto" ? (W = E.transitions.getAutoHeightDuration($.clientHeight), k.current = W) : W = P, $.style.transition = [E.transitions.create("opacity", {
      duration: W,
      delay: A
    }), E.transitions.create("transform", {
      duration: W * 0.666,
      delay: A || W * 0.333,
      easing: F
    })].join(","), $.style.opacity = 0, $.style.transform = Ar(0.75), g && g($);
  }), I = St(w, ($) => {
    $.style.transition = "", b && b($);
  });
  return /* @__PURE__ */ l(hn, {
    appear: i,
    in: c,
    nodeRef: w,
    onEnter: M,
    onEntered: D,
    onEntering: N,
    onExit: B,
    onExited: I,
    onExiting: L,
    addEndListener: ($) => {
      h === "auto" && R.start(k.current || 0, $), r && r(w.current, $);
    },
    timeout: h === "auto" ? null : h,
    ...S,
    children: ($, {
      ownerState: P,
      ...A
    }) => {
      const F = cp($, c, Tx, Ex, x, s.props.style);
      return /* @__PURE__ */ v.cloneElement(s, {
        style: F,
        ref: C,
        ...A
      });
    }
  });
});
process.env.NODE_ENV !== "production" && (Ur.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: o.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: o.bool,
  /**
   * A single child content element.
   */
  children: ir.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: o.oneOfType([o.shape({
    enter: o.string,
    exit: o.string
  }), o.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: o.bool,
  /**
   * @ignore
   */
  onEnter: o.func,
  /**
   * @ignore
   */
  onEntered: o.func,
  /**
   * @ignore
   */
  onEntering: o.func,
  /**
   * @ignore
   */
  onExit: o.func,
  /**
   * @ignore
   */
  onExited: o.func,
  /**
   * @ignore
   */
  onExiting: o.func,
  /**
   * @ignore
   */
  style: o.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  timeout: o.oneOfType([o.oneOf(["auto"]), o.number, o.shape({
    appear: o.number,
    enter: o.number,
    exit: o.number
  })])
});
Ur && (Ur.muiSupportAuto = !0);
function Ox(e) {
  return be("MuiPopover", e);
}
xe("MuiPopover", ["root", "paper"]);
function Sd(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.height / 2 : t === "bottom" && (n = e.height), n;
}
function Td(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.width / 2 : t === "right" && (n = e.width), n;
}
function Ed(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function kr(e) {
  return typeof e == "function" ? e() : e;
}
const Rx = (e) => {
  const {
    classes: t
  } = e;
  return Ce({
    root: ["root"],
    paper: ["paper"]
  }, Ox, t);
}, Nx = ee(yl, {
  name: "MuiPopover",
  slot: "Root"
})({}), zp = ee(dt, {
  name: "MuiPopover",
  slot: "Paper"
})({
  position: "absolute",
  overflowY: "auto",
  overflowX: "hidden",
  // So we see the popover when it's empty.
  // It's most likely on issue on userland.
  minWidth: 16,
  minHeight: 16,
  maxWidth: "calc(100% - 32px)",
  maxHeight: "calc(100% - 32px)",
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), Vp = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiPopover"
  }), {
    action: i,
    anchorEl: s,
    anchorOrigin: a = {
      vertical: "top",
      horizontal: "left"
    },
    anchorPosition: c,
    anchorReference: u = "anchorEl",
    children: p,
    className: f,
    container: g,
    disableAutoFocus: b = !1,
    elevation: m = 8,
    marginThreshold: x = 16,
    open: h,
    slots: S = {},
    slotProps: R = {},
    transformOrigin: k = {
      vertical: "top",
      horizontal: "left"
    },
    transitionDuration: E = "auto",
    disableScrollLock: w = !1,
    ...C
  } = r, N = v.useRef(), M = {
    ...r,
    anchorOrigin: a,
    anchorReference: u,
    elevation: m,
    marginThreshold: x,
    transformOrigin: k,
    transitionDuration: E
  }, D = Rx(M), L = v.useCallback(() => {
    if (u === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (c || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), c;
    const U = kr(s), J = U && U.nodeType === 1 ? U : Et(N.current).body, q = J.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const ce = J.getBoundingClientRect();
      As() && ce.top === 0 && ce.left === 0 && ce.right === 0 && ce.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: q.top + Sd(q, a.vertical),
      left: q.left + Td(q, a.horizontal)
    };
  }, [s, a.horizontal, a.vertical, c, u]), B = v.useCallback((U) => ({
    vertical: Sd(U, k.vertical),
    horizontal: Td(U, k.horizontal)
  }), [k.horizontal, k.vertical]), I = v.useCallback((U) => {
    const J = {
      width: U.offsetWidth,
      height: U.offsetHeight
    }, q = B(J);
    if (u === "none")
      return {
        top: null,
        left: null,
        transformOrigin: Ed(q)
      };
    const ce = L();
    let j = ce.top - q.vertical, de = ce.left - q.horizontal;
    const Y = j + J.height, he = de + J.width, Le = Vn(kr(s)), Re = Le.innerHeight - x, Ke = Le.innerWidth - x;
    if (x != null && j < x) {
      const Se = j - x;
      j -= Se, q.vertical += Se;
    } else if (x != null && Y > Re) {
      const Se = Y - Re;
      j -= Se, q.vertical += Se;
    }
    if (process.env.NODE_ENV !== "production" && J.height > Re && J.height && Re && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${J.height - Re}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), x != null && de < x) {
      const Se = de - x;
      de -= Se, q.horizontal += Se;
    } else if (he > Ke) {
      const Se = he - Ke;
      de -= Se, q.horizontal += Se;
    }
    return {
      top: `${Math.round(j)}px`,
      left: `${Math.round(de)}px`,
      transformOrigin: Ed(q)
    };
  }, [s, u, L, B, x]), [y, $] = v.useState(h), P = v.useCallback(() => {
    const U = N.current;
    if (!U)
      return;
    const J = I(U);
    J.top != null && U.style.setProperty("top", J.top), J.left != null && (U.style.left = J.left), U.style.transformOrigin = J.transformOrigin, $(!0);
  }, [I]);
  v.useEffect(() => (w && window.addEventListener("scroll", P), () => window.removeEventListener("scroll", P)), [s, w, P]);
  const A = () => {
    P();
  }, F = () => {
    $(!1);
  };
  v.useEffect(() => {
    h && P();
  }), v.useImperativeHandle(i, () => h ? {
    updatePosition: () => {
      P();
    }
  } : null, [h, P]), v.useEffect(() => {
    if (!h)
      return;
    const U = dp(() => {
      P();
    }), J = Vn(kr(s));
    return J.addEventListener("resize", U), () => {
      U.clear(), J.removeEventListener("resize", U);
    };
  }, [s, h, P]);
  let W = E;
  const H = {
    slots: S,
    slotProps: R
  }, [te, z] = ge("transition", {
    elementType: Ur,
    externalForwardedProps: H,
    ownerState: M,
    getSlotProps: (U) => ({
      ...U,
      onEntering: (J, q) => {
        var ce;
        (ce = U.onEntering) == null || ce.call(U, J, q), A();
      },
      onExited: (J) => {
        var q;
        (q = U.onExited) == null || q.call(U, J), F();
      }
    }),
    additionalProps: {
      appear: !0,
      in: h
    }
  });
  E === "auto" && !te.muiSupportAuto && (W = void 0);
  const V = g || (s ? Et(kr(s)).body : void 0), [X, {
    slots: re,
    slotProps: oe,
    ...ne
  }] = ge("root", {
    ref: n,
    elementType: Nx,
    externalForwardedProps: {
      ...H,
      ...C
    },
    shouldForwardComponentProp: !0,
    additionalProps: {
      slots: {
        backdrop: S.backdrop
      },
      slotProps: {
        backdrop: Rb(typeof R.backdrop == "function" ? R.backdrop(M) : R.backdrop, {
          invisible: !0
        })
      },
      container: V,
      open: h
    },
    ownerState: M,
    className: le(D.root, f)
  }), [Q, Z] = ge("paper", {
    ref: N,
    className: D.paper,
    elementType: zp,
    externalForwardedProps: H,
    shouldForwardComponentProp: !0,
    additionalProps: {
      elevation: m,
      style: y ? void 0 : {
        opacity: 0
      }
    },
    ownerState: M
  });
  return /* @__PURE__ */ l(X, {
    ...ne,
    ...!Qi(X) && {
      slots: re,
      slotProps: oe,
      disableAutoFocus: b,
      disableScrollLock: w
    },
    children: /* @__PURE__ */ l(te, {
      ...z,
      timeout: W,
      children: /* @__PURE__ */ l(Q, {
        ...Z,
        children: p
      })
    })
  });
});
process.env.NODE_ENV !== "production" && (Vp.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: gn,
  /**
   * An HTML element, [PopoverVirtualElement](https://mui.com/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: kn(o.oneOfType([Un, o.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const t = kr(e.anchorEl);
      if (t && t.nodeType === 1) {
        const n = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "production" && As() && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else
        return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", `It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`));
    }
    return null;
  }),
  /**
   * This is the point on the anchor where the popover's
   * `anchorEl` will attach to. This is not used when the
   * anchorReference is 'anchorPosition'.
   *
   * Options:
   * vertical: [top, center, bottom];
   * horizontal: [left, center, right].
   * @default {
   *   vertical: 'top',
   *   horizontal: 'left',
   * }
   */
  anchorOrigin: o.shape({
    horizontal: o.oneOfType([o.oneOf(["center", "left", "right"]), o.number]).isRequired,
    vertical: o.oneOfType([o.oneOf(["bottom", "center", "top"]), o.number]).isRequired
  }),
  /**
   * This is the position that may be used to set the position of the popover.
   * The coordinates are relative to the application's client area.
   */
  anchorPosition: o.shape({
    left: o.number.isRequired,
    top: o.number.isRequired
  }),
  /**
   * This determines which anchor prop to refer to when setting
   * the position of the popover.
   * @default 'anchorEl'
   */
  anchorReference: o.oneOf(["anchorEl", "anchorPosition", "none"]),
  /**
   * The content of the component.
   */
  children: o.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * An HTML element, component instance, or function that returns either.
   * The `container` will passed to the Modal component.
   *
   * By default, it uses the body of the anchorEl's top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: o.oneOfType([Un, o.func]),
  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: o.bool,
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: o.bool,
  /**
   * The elevation of the popover.
   * @default 8
   */
  elevation: bp,
  /**
   * Specifies how close to the edge of the window the popover can appear.
   * If null, the popover will not be constrained by the window.
   * @default 16
   */
  marginThreshold: o.number,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   */
  onClose: o.func,
  /**
   * If `true`, the component is shown.
   */
  open: o.bool.isRequired,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: o.shape({
    backdrop: o.oneOfType([o.func, o.object]),
    paper: o.oneOfType([o.func, o.object]),
    root: o.oneOfType([o.func, o.object]),
    transition: o.oneOfType([o.func, o.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: o.shape({
    backdrop: o.elementType,
    paper: o.elementType,
    root: o.elementType,
    transition: o.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object]),
  /**
   * This is the point on the popover which
   * will attach to the anchor's origin.
   *
   * Options:
   * vertical: [top, center, bottom, x(px)];
   * horizontal: [left, center, right, x(px)].
   * @default {
   *   vertical: 'top',
   *   horizontal: 'left',
   * }
   */
  transformOrigin: o.shape({
    horizontal: o.oneOfType([o.oneOf(["center", "left", "right"]), o.number]).isRequired,
    vertical: o.oneOfType([o.oneOf(["bottom", "center", "top"]), o.number]).isRequired
  }),
  /**
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  transitionDuration: o.oneOfType([o.oneOf(["auto"]), o.number, o.shape({
    appear: o.number,
    enter: o.number,
    exit: o.number
  })])
});
function kx(e) {
  return be("MuiMenu", e);
}
xe("MuiMenu", ["root", "paper", "list"]);
const Px = {
  vertical: "top",
  horizontal: "right"
}, Ix = {
  vertical: "top",
  horizontal: "left"
}, $x = (e) => {
  const {
    classes: t
  } = e;
  return Ce({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, kx, t);
}, Ax = ee(Vp, {
  shouldForwardProp: (e) => zt(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root"
})({}), Mx = ee(zp, {
  name: "MuiMenu",
  slot: "Paper"
})({
  // specZ: The maximum height of a simple menu should be one or more rows less than the view
  // height. This ensures a tappable area outside of the simple menu with which to dismiss
  // the menu.
  maxHeight: "calc(100% - 96px)",
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: "touch"
}), _x = ee(Wp, {
  name: "MuiMenu",
  slot: "List"
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), Up = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiMenu"
  }), {
    autoFocus: i = !0,
    children: s,
    className: a,
    disableAutoFocusItem: c = !1,
    onClose: u,
    open: p,
    PopoverClasses: f,
    transitionDuration: g = "auto",
    variant: b = "selectedMenu",
    slots: m = {},
    slotProps: x = {},
    ...h
  } = r, S = Vu(), R = {
    ...r,
    autoFocus: i,
    disableAutoFocusItem: c,
    transitionDuration: g,
    variant: b
  }, k = $x(R), E = i && p, w = E && !c, C = v.useRef(null), N = (A, F) => {
    var W, H;
    C.current && (C.current.adjustStyleForScrollbar(A, {
      direction: S ? "rtl" : "ltr"
    }), E && ((H = (W = C.current).focusInitialTarget) == null || H.call(W)));
  }, M = (A) => {
    A.key === "Tab" && (A.preventDefault(), u && u(A, "tabKeyDown"));
  }, D = {
    slots: m,
    slotProps: x
  }, L = jp({
    elementType: m.root,
    externalSlotProps: x.root,
    ownerState: R,
    className: [k.root, a]
  }), [B, I] = ge("paper", {
    className: k.paper,
    elementType: Mx,
    externalForwardedProps: D,
    shouldForwardComponentProp: !0,
    ownerState: R
  }), [y, $] = ge("list", {
    className: k.list,
    elementType: _x,
    shouldForwardComponentProp: !0,
    externalForwardedProps: D,
    getSlotProps: (A) => ({
      ...A,
      onKeyDown: (F) => {
        var W;
        M(F), (W = A.onKeyDown) == null || W.call(A, F);
      }
    }),
    ownerState: R
  }), P = typeof x.transition == "function" ? x.transition(R) : x.transition;
  return /* @__PURE__ */ l(
    Ax,
    {
      disableAutoFocus: i,
      onClose: u,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: S ? "right" : "left"
      },
      transformOrigin: S ? Px : Ix,
      slots: {
        root: m.root,
        paper: B,
        backdrop: m.backdrop,
        transition: m.transition
      },
      slotProps: {
        root: L,
        paper: I,
        backdrop: typeof x.backdrop == "function" ? x.backdrop(R) : x.backdrop,
        transition: {
          ...P,
          onEntering: (...A) => {
            var F;
            N(...A), (F = P == null ? void 0 : P.onEntering) == null || F.call(P, ...A);
          }
        }
      },
      open: p,
      ref: n,
      transitionDuration: g,
      ownerState: R,
      ...h,
      classes: f,
      children: /* @__PURE__ */ l(y, {
        actions: C,
        autoFocus: E,
        autoFocusItem: w,
        variant: b,
        ...$,
        children: s
      })
    }
  );
});
process.env.NODE_ENV !== "production" && (Up.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, or a function that returns one.
   * It's used to set the position of the menu.
   */
  anchorEl: o.oneOfType([Un, o.func]),
  /**
   * If `true` (Default) will focus the `[role="menu"]` if no focusable child is found. Disabled
   * children are not focusable. If you set this prop to `false` focus will be placed
   * on the parent modal container. This has severe accessibility implications
   * and should only be considered if you manage focus otherwise.
   * @default true
   */
  autoFocus: o.bool,
  /**
   * Menu contents, normally `MenuItem`s.
   */
  children: o.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * When opening the menu will not focus the active item but the `[role="menu"]`
   * unless `autoFocus` is also set to `false`. Not using the default means not
   * following WAI-ARIA authoring practices. Please be considerate about possible
   * accessibility implications.
   * @default false
   */
  disableAutoFocusItem: o.bool,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`, `"tabKeyDown"`.
   */
  onClose: o.func,
  /**
   * If `true`, the component is shown.
   */
  open: o.bool.isRequired,
  /**
   * `classes` prop applied to the [`Popover`](https://mui.com/material-ui/api/popover/) element.
   */
  PopoverClasses: o.object,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: o.shape({
    backdrop: o.oneOfType([o.func, o.object]),
    list: o.oneOfType([o.func, o.object]),
    paper: o.oneOfType([o.func, o.object]),
    root: o.oneOfType([o.func, o.object]),
    transition: o.oneOfType([o.func, o.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: o.shape({
    backdrop: o.elementType,
    list: o.elementType,
    paper: o.elementType,
    root: o.elementType,
    transition: o.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object]),
  /**
   * The length of the transition in `ms`, or 'auto'
   * @default 'auto'
   */
  transitionDuration: o.oneOfType([o.oneOf(["auto"]), o.number, o.shape({
    appear: o.number,
    enter: o.number,
    exit: o.number
  })]),
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus.
   * @default 'selectedMenu'
   */
  variant: o.oneOf(["menu", "selectedMenu"])
});
function Dx(e) {
  return be("MuiNativeSelect", e);
}
const Sl = xe("MuiNativeSelect", ["root", "select", "multiple", "filled", "outlined", "standard", "disabled", "icon", "iconOpen", "iconFilled", "iconOutlined", "iconStandard", "nativeInput", "error"]), Lx = (e) => {
  const {
    classes: t,
    variant: n,
    disabled: r,
    multiple: i,
    open: s,
    error: a
  } = e, c = {
    select: ["select", n, r && "disabled", i && "multiple", a && "error"],
    icon: ["icon", `icon${ye(n)}`, s && "iconOpen", r && "disabled"]
  };
  return Ce(c, Dx, t);
}, Gp = ee("select", {
  name: "MuiNativeSelect"
})(({
  theme: e
}) => ({
  // Reset
  MozAppearance: "none",
  // Reset
  WebkitAppearance: "none",
  // When interacting quickly, the text can end up selected.
  // Native select can't be selected either.
  userSelect: "none",
  // Reset
  borderRadius: 0,
  cursor: "pointer",
  "&:focus": {
    // Reset Chrome style
    borderRadius: 0
  },
  [`&.${Sl.disabled}`]: {
    cursor: "default"
  },
  "&[multiple]": {
    height: "auto"
  },
  "&:not([multiple]) option, &:not([multiple]) optgroup": {
    backgroundColor: (e.vars || e).palette.background.paper
  },
  variants: [{
    props: ({
      ownerState: t
    }) => t.variant !== "filled" && t.variant !== "outlined",
    style: {
      // Bump specificity to allow extending custom inputs
      "&&&": {
        paddingRight: 24,
        minWidth: 16
        // So it doesn't collapse.
      }
    }
  }, {
    props: {
      variant: "filled"
    },
    style: {
      "&&&": {
        paddingRight: 32
      }
    }
  }, {
    props: {
      variant: "outlined"
    },
    style: {
      borderRadius: (e.vars || e).shape.borderRadius,
      "&:focus": {
        borderRadius: (e.vars || e).shape.borderRadius
        // Reset the reset for Chrome style
      },
      "&&&": {
        paddingRight: 32
      }
    }
  }]
})), Fx = ee(Gp, {
  name: "MuiNativeSelect",
  slot: "Select",
  shouldForwardProp: zt,
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.select, t[n.variant], n.error && t.error, {
      [`&.${Sl.multiple}`]: t.multiple
    }];
  }
})({}), Hp = ee("svg", {
  name: "MuiNativeSelect"
})(({
  theme: e
}) => ({
  // We use a position absolute over a flexbox in order to forward the pointer events
  // to the input and to support wrapping tags..
  position: "absolute",
  right: 0,
  // Center vertically, height is 1em
  top: "calc(50% - .5em)",
  // Don't block pointer events on the select under the icon.
  pointerEvents: "none",
  color: (e.vars || e).palette.action.active,
  [`&.${Sl.disabled}`]: {
    color: (e.vars || e).palette.action.disabled
  },
  variants: [{
    props: ({
      ownerState: t
    }) => t.open,
    style: {
      transform: "rotate(180deg)"
    }
  }, {
    props: {
      variant: "filled"
    },
    style: {
      right: 7
    }
  }, {
    props: {
      variant: "outlined"
    },
    style: {
      right: 7
    }
  }]
})), jx = ee(Hp, {
  name: "MuiNativeSelect",
  slot: "Icon",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.icon, n.variant && t[`icon${ye(n.variant)}`], n.open && t.iconOpen];
  }
})({}), qp = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const {
    className: r,
    disabled: i,
    error: s,
    IconComponent: a,
    inputRef: c,
    variant: u = "standard",
    ...p
  } = t, f = {
    ...t,
    disabled: i,
    variant: u,
    error: s
  }, g = Lx(f);
  return /* @__PURE__ */ T(v.Fragment, {
    children: [/* @__PURE__ */ l(Fx, {
      ownerState: f,
      className: le(g.select, r),
      disabled: i,
      ref: c || n,
      ...p
    }), t.multiple ? null : /* @__PURE__ */ l(jx, {
      as: a,
      ownerState: f,
      className: g.icon
    })]
  });
});
process.env.NODE_ENV !== "production" && (qp.propTypes = {
  /**
   * The option elements to populate the select with.
   * Can be some `<option>` elements.
   */
  children: o.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * The CSS class name of the select element.
   */
  className: o.string,
  /**
   * If `true`, the select is disabled.
   */
  disabled: o.bool,
  /**
   * If `true`, the `select input` will indicate an error.
   */
  error: o.bool,
  /**
   * The icon that displays the arrow.
   */
  IconComponent: o.elementType.isRequired,
  /**
   * Use that prop to pass a ref to the native select element.
   * @deprecated
   */
  inputRef: gn,
  /**
   * @ignore
   */
  multiple: o.bool,
  /**
   * Name attribute of the `select` or hidden `input` element.
   */
  name: o.string,
  /**
   * Callback fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: o.func,
  /**
   * The input value.
   */
  value: o.any,
  /**
   * The variant to use.
   */
  variant: o.oneOf(["standard", "outlined", "filled"])
});
function Kp(e) {
  return be("MuiSelect", e);
}
const br = xe("MuiSelect", ["root", "select", "multiple", "filled", "outlined", "standard", "disabled", "focused", "icon", "iconOpen", "nativeInput", "error"]);
var Od;
const wi = 2, Bx = 400, Rd = 200;
function Nd(e, t) {
  var i;
  if (!t)
    return !1;
  if (e.composedPath().includes(t) || (i = e.target) != null && i.nodeType && t.contains(e.target))
    return !0;
  const r = t.getBoundingClientRect();
  return r.width === 0 && r.height === 0 ? !1 : e.clientX >= r.left - wi && e.clientX <= r.right + wi && e.clientY >= r.top - wi && e.clientY <= r.bottom + wi;
}
const Wx = ee(Gp, {
  name: "MuiSelect",
  slot: "Select",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [
      // Win specificity over the input base
      {
        [`&.${br.select}`]: t.select
      },
      {
        [`&.${br.select}`]: t[n.variant]
      },
      {
        [`&.${br.error}`]: t.error
      },
      {
        [`&.${br.multiple}`]: t.multiple
      }
    ];
  }
})({
  // Win specificity over the input base
  [`&.${br.select}`]: {
    height: "auto",
    // Resets for multiple select with chips
    minHeight: "1.4375em",
    // Required for select\text-field height consistency
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
  }
}), zx = ee(Hp, {
  name: "MuiSelect",
  slot: "Icon",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.icon, n.open && t.iconOpen];
  }
})({}), Vx = ee("input", {
  shouldForwardProp: (e) => tp(e) && e !== "classes",
  name: "MuiSelect",
  slot: "NativeInput"
})({
  bottom: 0,
  left: 0,
  position: "absolute",
  opacity: 0,
  pointerEvents: "none",
  width: "100%",
  boxSizing: "border-box"
}), Ux = (e) => {
  const {
    classes: t,
    variant: n,
    disabled: r,
    multiple: i,
    open: s,
    error: a
  } = e;
  return Ce({
    select: ["select", n, r && "disabled", i && "multiple", a && "error"],
    icon: ["icon", s && "iconOpen", r && "disabled"],
    nativeInput: ["nativeInput"]
  }, Kp, t);
}, Yp = /* @__PURE__ */ v.forwardRef(function(t, n) {
  var ri, wo, ii, Lt;
  const {
    "aria-describedby": r,
    "aria-label": i,
    autoFocus: s,
    autoWidth: a,
    children: c,
    className: u,
    defaultOpen: p,
    defaultValue: f,
    disabled: g,
    displayEmpty: b,
    error: m = !1,
    IconComponent: x,
    inputRef: h,
    labelId: S,
    MenuProps: R = {},
    multiple: k,
    name: E,
    onBlur: w,
    onChange: C,
    onClose: N,
    onFocus: M,
    // eslint-disable-next-line react/prop-types
    onKeyDown: D,
    // eslint-disable-next-line react/prop-types
    onMouseDown: L,
    onOpen: B,
    open: I,
    readOnly: y,
    renderValue: $,
    required: P,
    SelectDisplayProps: A = {},
    tabIndex: F,
    // catching `type` from Input which makes no sense for SelectInput
    type: W,
    value: H,
    variant: te = "standard",
    ...z
  } = t, [V, X] = Ji({
    controlled: H,
    default: f,
    name: "Select"
  }), [re, oe] = Ji({
    controlled: I,
    default: p,
    name: "Select"
  }), ne = v.useRef(null), Q = v.useRef(null), Z = v.useRef(null), U = v.useRef(!1), J = v.useRef(!1), q = v.useRef(null), ce = v.useRef(!1), j = v.useRef({
    allowSelectedMouseUp: !1,
    allowUnselectedMouseUp: !1
  }), de = Fn(), Y = Fn(), [he, Le] = v.useState(null), {
    current: Re
  } = v.useRef(I != null), [Ke, Se] = v.useState(), [Pe, Ye] = v.useState(null), it = ft(n, h), Fe = v.useCallback((se) => {
    Q.current = se, se && Le(se);
  }, []), Ae = he == null ? void 0 : he.parentNode;
  v.useImperativeHandle(it, () => ({
    focus: () => {
      Q.current.focus();
    },
    node: ne.current,
    value: V
  }), [V]);
  const Me = he !== null && re;
  Tt(() => {
    U.current = Me;
  }, [Me]);
  const ot = v.useCallback(() => {
    de.clear(), Y.clear();
  }, [de, Y]), _e = v.useCallback(() => {
    ot(), ce.current = !1, j.current = {
      allowSelectedMouseUp: !1,
      allowUnselectedMouseUp: !1
    };
  }, [ot]), $e = v.useCallback(() => {
    q.current && (q.current(), q.current = null);
  }, []);
  v.useEffect(() => {
    Me || (_e(), $e());
  }, [Me, _e, $e]), v.useEffect(() => () => {
    _e(), $e();
  }, [_e, $e]), v.useEffect(() => {
    if (!Me || !Ae || a || typeof ResizeObserver > "u")
      return;
    const se = new ResizeObserver(() => {
      Se(Ae.clientWidth);
    });
    return se.observe(Ae), () => {
      se.disconnect();
    };
  }, [Me, Ae, a]), v.useEffect(() => {
    p && re && he && !Re && (Se(a ? null : Ae.clientWidth), Q.current.focus());
  }, [he, a]), v.useEffect(() => {
    s && Q.current.focus();
  }, [s]), v.useEffect(() => {
    if (!S)
      return;
    const se = Et(Q.current).getElementById(S);
    if (se) {
      const Oe = () => {
        getSelection().isCollapsed && Q.current.focus();
      };
      return se.addEventListener("click", Oe), () => {
        se.removeEventListener("click", Oe);
      };
    }
  }, [S]);
  const rt = Dt((se, Oe) => {
    se || (_e(), $e()), se ? (Ye(ux(Oe)), B && B(Oe)) : (Ye(null), N && N(Oe)), Re || (U.current = se, Se(a ? null : Ae.clientWidth), oe(se));
  }), ue = () => {
    _e(), J.current ? Y.start(Rd, () => {
      j.current.allowUnselectedMouseUp = !0, de.start(Rd, () => {
        j.current.allowSelectedMouseUp = !0;
      });
    }) : de.start(Bx, () => {
      j.current.allowSelectedMouseUp = !0, j.current.allowUnselectedMouseUp = !0;
    });
  }, Te = (se) => {
    if (L == null || L(se), se.button !== 0)
      return;
    se.preventDefault(), Q.current.focus();
    const Oe = Et(se.currentTarget);
    ue(), $e();
    const ze = (bt) => {
      q.current = null, Q.current && (Nd(bt, Q.current) || Nd(bt, Z.current) || !U.current && Re || rt(!1, bt));
    };
    Oe.addEventListener("mouseup", ze, {
      capture: !0,
      once: !0
    }), q.current = () => {
      Oe.removeEventListener("mouseup", ze, !0);
    }, rt(!0, se);
  }, lt = (se) => {
    rt(!1, se);
  }, st = v.Children.toArray(c), Ee = (se) => {
    const Oe = st.find((ze) => ze.props.value === se.target.value);
    Oe !== void 0 && (X(Oe.props.value), C && C(se, Oe));
  }, Pn = (se) => (Oe) => {
    ce.current = !1;
    let ze;
    if (Oe.currentTarget.hasAttribute("tabindex")) {
      if (k) {
        ze = Array.isArray(V) ? V.slice() : [];
        const bt = V.indexOf(se.props.value);
        bt === -1 ? ze.push(se.props.value) : ze.splice(bt, 1);
      } else
        ze = se.props.value;
      if (se.props.onClick && se.props.onClick(Oe), V !== ze && (X(ze), C)) {
        const bt = Oe.nativeEvent || Oe, Jt = new bt.constructor(bt.type, bt);
        Object.defineProperty(Jt, "target", {
          writable: !0,
          value: {
            value: ze,
            name: E
          }
        }), C(Jt, se);
      }
      k || rt(!1, Oe);
    }
  }, xo = (se, Oe) => (ze) => {
    var si, lr;
    if ((lr = (si = se.props).onMouseUp) == null || lr.call(si, ze), ce.current) {
      ce.current = !1;
      return;
    }
    const bt = !j.current.allowSelectedMouseUp && Oe, Jt = !j.current.allowUnselectedMouseUp && !Oe;
    bt || Jt || ze.currentTarget.click();
  }, Hn = (se) => {
    y || ([
      " ",
      "ArrowUp",
      "ArrowDown",
      // The native select doesn't respond to enter on macOS, but it's recommended by
      // https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
      "Enter"
    ].includes(se.key) && (se.preventDefault(), rt(!0, se)), D == null || D(se));
  }, no = (se) => {
    !Me && w && (Object.defineProperty(se, "target", {
      writable: !0,
      value: {
        value: V,
        name: E
      }
    }), w(se));
  };
  delete z["aria-invalid"];
  let pe, De;
  const Ct = [];
  let Yt = !1, Xt = !1;
  (os({
    value: V
  }) || b) && ($ ? pe = $(V) : Yt = !0);
  const Us = st.map((se) => {
    if (!/* @__PURE__ */ v.isValidElement(se))
      return null;
    process.env.NODE_ENV !== "production" && Ho.isFragment(se) && console.error(["MUI: The Select component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`));
    let Oe;
    if (k) {
      if (!Array.isArray(V))
        throw new Error(process.env.NODE_ENV !== "production" ? "MUI: The `value` prop must be an array when using the `Select` component with `multiple`." : Wn(2));
      Oe = V.some((ze) => wd(ze, se.props.value)), Oe && Yt && Ct.push(se.props.children);
    } else
      Oe = wd(V, se.props.value), Oe && Yt && (De = se.props.children);
    return Oe && (Xt = !0), /* @__PURE__ */ v.cloneElement(se, {
      "aria-selected": Oe ? "true" : "false",
      onMouseDown: (ze) => {
        var bt, Jt;
        ce.current = !0, (Jt = (bt = se.props).onMouseDown) == null || Jt.call(bt, ze);
      },
      onPointerDown: (ze) => {
        var bt, Jt;
        ce.current = !0, (Jt = (bt = se.props).onPointerDown) == null || Jt.call(bt, ze);
      },
      onClick: Pn(se),
      onMouseUp: xo(se, Oe),
      onKeyUp: (ze) => {
        ze.key === " " && ze.preventDefault(), se.props.onKeyUp && se.props.onKeyUp(ze);
      },
      role: "option",
      selected: Oe,
      value: void 0,
      // The value is most likely not a valid HTML attribute.
      "data-value": se.props.value
      // Instead, we provide it as a data attribute.
    });
  });
  Tt(() => {
    J.current = Xt;
  }, [Xt]), process.env.NODE_ENV !== "production" && v.useEffect(() => {
    if (!Xt && !k && V !== "") {
      const se = st.map((Oe) => Oe.props.value);
      console.warn([`MUI: You have provided an out-of-range value \`${V}\` for the select ${E ? `(name="${E}") ` : ""}component.`, "Consider providing a value that matches one of the available options or ''.", `The available values are ${se.filter((Oe) => Oe != null).map((Oe) => `\`${Oe}\``).join(", ") || '""'}.`].join(`
`));
    }
  }, [Xt, st, k, E, V]), Yt && (k ? Ct.length === 0 ? pe = null : pe = Ct.reduce((se, Oe, ze) => (se.push(Oe), ze < Ct.length - 1 && se.push(", "), se), []) : pe = De);
  let oo = Ke;
  !a && Re && he && (oo = Ae.clientWidth);
  let Co;
  typeof F < "u" ? Co = F : Co = g ? null : 0;
  const In = A.id || (E ? `mui-component-select-${E}` : void 0), Ot = {
    ...t,
    variant: te,
    value: V,
    open: Me,
    error: m
  }, qn = Ux(Ot), Vt = typeof ((ri = R.slotProps) == null ? void 0 : ri.paper) == "function" ? R.slotProps.paper(Ot) : (wo = R.slotProps) == null ? void 0 : wo.paper, ro = ft(Vt == null ? void 0 : Vt.ref, Z), Gs = typeof ((ii = R.slotProps) == null ? void 0 : ii.list) == "function" ? R.slotProps.list(Ot) : (Lt = R.slotProps) == null ? void 0 : Lt.list, ni = zn(), oi = zn();
  return /* @__PURE__ */ T(v.Fragment, {
    children: [/* @__PURE__ */ l(Wx, {
      as: "div",
      ref: Fe,
      tabIndex: Co,
      role: "combobox",
      "aria-controls": Me ? ni : void 0,
      "aria-disabled": g ? "true" : void 0,
      "aria-expanded": Me ? "true" : "false",
      "aria-haspopup": "listbox",
      "aria-label": i,
      "aria-labelledby": S,
      "aria-describedby": r,
      "aria-required": P ? "true" : void 0,
      "aria-invalid": m ? "true" : void 0,
      onKeyDown: Hn,
      onMouseDown: g || y ? null : Te,
      onBlur: no,
      onFocus: M,
      ...A,
      ownerState: Ot,
      className: le(A.className, qn.select, u),
      id: In,
      children: px(pe) ? (
        // notranslate needed while Google Translate will not fix zero-width space issue
        Od || (Od = /* @__PURE__ */ l("span", {
          className: "notranslate",
          "aria-hidden": !0,
          children: "​"
        }))
      ) : pe
    }), /* @__PURE__ */ l(Vx, {
      "aria-invalid": m,
      value: Array.isArray(V) ? V.join(",") : V,
      name: E,
      ref: ne,
      "aria-hidden": !0,
      onChange: Ee,
      tabIndex: -1,
      disabled: g,
      className: qn.nativeInput,
      autoFocus: s,
      required: P,
      ...z,
      id: z.id ?? oi,
      ownerState: Ot
    }), /* @__PURE__ */ l(zx, {
      as: x,
      className: qn.icon,
      ownerState: Ot
    }), /* @__PURE__ */ l(fx, {
      value: Pe,
      children: /* @__PURE__ */ l(Up, {
        id: `menu-${E || ""}`,
        anchorEl: Ae,
        open: Me,
        onClose: lt,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center"
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "center"
        },
        ...R,
        slotProps: {
          ...R.slotProps,
          list: {
            "aria-labelledby": S,
            role: "listbox",
            "aria-multiselectable": k ? "true" : void 0,
            disableListWrap: !0,
            id: ni,
            ...Gs
          },
          paper: {
            ...Vt,
            ref: ro,
            style: {
              minWidth: oo,
              ...Vt == null ? void 0 : Vt.style
            }
          }
        },
        children: Us
      })
    })]
  });
});
process.env.NODE_ENV !== "production" && (Yp.propTypes = {
  /**
   * @ignore
   */
  "aria-describedby": o.string,
  /**
   * @ignore
   */
  "aria-label": o.string,
  /**
   * @ignore
   */
  autoFocus: o.bool,
  /**
   * If `true`, the width of the popover will automatically be set according to the items inside the
   * menu, otherwise it will be at least the width of the select input.
   */
  autoWidth: o.bool,
  /**
   * The option elements to populate the select with.
   * Can be some `<MenuItem>` elements.
   */
  children: o.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * The CSS class name of the select element.
   */
  className: o.string,
  /**
   * If `true`, the component is toggled on mount. Use when the component open state is not controlled.
   * You can only use it when the `native` prop is `false` (default).
   */
  defaultOpen: o.bool,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: o.any,
  /**
   * If `true`, the select is disabled.
   */
  disabled: o.bool,
  /**
   * If `true`, the selected item is displayed even if its value is empty.
   */
  displayEmpty: o.bool,
  /**
   * If `true`, the `select input` will indicate an error.
   */
  error: o.bool,
  /**
   * The icon that displays the arrow.
   */
  IconComponent: o.elementType.isRequired,
  /**
   * Imperative handle implementing `{ value: T, node: HTMLElement, focus(): void }`
   * Equivalent to `ref`
   */
  inputRef: gn,
  /**
   * The ID of an element that acts as an additional label. The Select will
   * be labelled by the additional label and the selected value.
   */
  labelId: o.string,
  /**
   * Props applied to the [`Menu`](/material-ui/api/menu/) element.
   */
  MenuProps: o.object,
  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   */
  multiple: o.bool,
  /**
   * Name attribute of the `select` or hidden `input` element.
   */
  name: o.string,
  /**
   * @ignore
   */
  onBlur: o.func,
  /**
   * Callback fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * @param {object} [child] The react element that was selected.
   */
  onChange: o.func,
  /**
   * Callback fired when the component requests to be closed.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   */
  onClose: o.func,
  /**
   * @ignore
   */
  onFocus: o.func,
  /**
   * Callback fired when the component requests to be opened.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   */
  onOpen: o.func,
  /**
   * If `true`, the component is shown.
   */
  open: o.bool,
  /**
   * @ignore
   */
  readOnly: o.bool,
  /**
   * Render the selected value.
   *
   * @param {any} value The `value` provided to the component.
   * @returns {ReactNode}
   */
  renderValue: o.func,
  /**
   * If `true`, the component is required.
   */
  required: o.bool,
  /**
   * Props applied to the clickable div element.
   */
  SelectDisplayProps: o.object,
  /**
   * @ignore
   */
  tabIndex: o.oneOfType([o.number, o.string]),
  /**
   * @ignore
   */
  type: o.any,
  /**
   * The input value.
   */
  value: o.any,
  /**
   * The variant to use.
   */
  variant: o.oneOf(["standard", "outlined", "filled"])
});
const Gx = at(/* @__PURE__ */ l("path", {
  d: "M7 10l5 5 5-5z"
}), "ArrowDropDown");
function Si(e) {
  return parseInt(e, 10) || 0;
}
const Hx = {
  shadow: {
    // Visibility needed to hide the extra text area on iPads
    visibility: "hidden",
    // Remove from the content flow
    position: "absolute",
    // Ignore the scrollbar width
    overflow: "hidden",
    height: 0,
    top: 0,
    left: 0,
    // Create a new layer, increase the isolation of the computed values
    transform: "translateZ(0)"
  }
};
function qx(e) {
  for (const t in e)
    return !1;
  return !0;
}
function kd(e) {
  return qx(e) || e.outerHeightStyle === 0 && !e.overflowing;
}
const Xp = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const {
    onChange: r,
    maxRows: i,
    minRows: s = 1,
    style: a,
    value: c,
    ...u
  } = t, {
    current: p
  } = v.useRef(c != null), f = v.useRef(null), g = ft(n, f), b = v.useRef(null), m = v.useRef(null), x = v.useCallback(() => {
    const E = f.current, w = m.current;
    if (!E || !w)
      return;
    const N = Vn(E).getComputedStyle(E);
    if (N.width === "0px")
      return {
        outerHeightStyle: 0,
        overflowing: !1
      };
    w.style.width = N.width, w.value = E.value || t.placeholder || "x", w.value.slice(-1) === `
` && (w.value += " ");
    const M = N.boxSizing, D = Si(N.paddingBottom) + Si(N.paddingTop), L = Si(N.borderBottomWidth) + Si(N.borderTopWidth), B = w.scrollHeight;
    w.value = "x";
    const I = w.scrollHeight;
    let y = B;
    s && (y = Math.max(Number(s) * I, y)), i && (y = Math.min(Number(i) * I, y)), y = Math.max(y, I);
    const $ = y + (M === "border-box" ? D + L : 0), P = Math.abs(y - B) <= 1;
    return {
      outerHeightStyle: $,
      overflowing: P
    };
  }, [i, s, t.placeholder]), h = Dt(() => {
    const E = f.current, w = x();
    if (!E || !w || kd(w))
      return !1;
    const C = w.outerHeightStyle;
    return b.current != null && b.current !== C;
  }), S = v.useCallback(() => {
    const E = f.current, w = x();
    if (!E || !w || kd(w))
      return;
    const C = w.outerHeightStyle;
    b.current !== C && (b.current = C, E.style.height = `${C}px`), E.style.overflow = w.overflowing ? "hidden" : "";
  }, [x]), R = v.useRef(-1);
  Tt(() => {
    const E = dp(S), w = f == null ? void 0 : f.current;
    if (!w)
      return;
    const C = Vn(w);
    C.addEventListener("resize", E);
    let N;
    return typeof ResizeObserver < "u" && (N = new ResizeObserver(() => {
      h() && (N.unobserve(w), cancelAnimationFrame(R.current), S(), R.current = requestAnimationFrame(() => {
        N.observe(w);
      }));
    }), N.observe(w)), () => {
      E.clear(), cancelAnimationFrame(R.current), C.removeEventListener("resize", E), N && N.disconnect();
    };
  }, [x, S, h]), Tt(() => {
    S();
  });
  const k = (E) => {
    p || S();
    const w = E.target, C = w.value.length, N = w.value.endsWith(`
`), M = w.selectionStart === C;
    N && M && w.setSelectionRange(C, C), r && r(E);
  };
  return /* @__PURE__ */ T(v.Fragment, {
    children: [/* @__PURE__ */ l("textarea", {
      value: c,
      onChange: k,
      ref: g,
      rows: s,
      style: a,
      ...u
    }), /* @__PURE__ */ l("textarea", {
      "aria-hidden": !0,
      className: t.className,
      readOnly: !0,
      ref: m,
      tabIndex: -1,
      style: {
        ...Hx.shadow,
        ...a,
        paddingTop: 0,
        paddingBottom: 0
      }
    })]
  });
});
process.env.NODE_ENV !== "production" && (Xp.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  className: o.string,
  /**
   * Maximum number of rows to display.
   */
  maxRows: o.oneOfType([o.number, o.string]),
  /**
   * Minimum number of rows to display.
   * @default 1
   */
  minRows: o.oneOfType([o.number, o.string]),
  /**
   * @ignore
   */
  onChange: o.func,
  /**
   * @ignore
   */
  placeholder: o.string,
  /**
   * @ignore
   */
  style: o.object,
  /**
   * @ignore
   */
  value: o.oneOfType([o.arrayOf(o.string), o.number, o.string])
});
function Kx(e) {
  return be("MuiInputBase", e);
}
const Yo = xe("MuiInputBase", ["root", "formControl", "focused", "disabled", "adornedStart", "adornedEnd", "error", "sizeSmall", "multiline", "colorSecondary", "fullWidth", "hiddenLabel", "readOnly", "input", "inputTypeSearch"]);
var Pd;
const Fa = "mui-auto-fill", is = "mui-auto-fill-cancel", Ms = (e, t) => {
  const {
    ownerState: n
  } = e;
  return [t.root, n.formControl && t.formControl, n.startAdornment && t.adornedStart, n.endAdornment && t.adornedEnd, n.error && t.error, n.size === "small" && t.sizeSmall, n.multiline && t.multiline, n.color && t[`color${ye(n.color)}`], n.fullWidth && t.fullWidth, n.hiddenLabel && t.hiddenLabel];
}, _s = (e, t) => {
  const {
    ownerState: n
  } = e;
  return [t.input, n.type === "search" && t.inputTypeSearch];
}, Yx = (e) => {
  const {
    classes: t,
    color: n,
    disabled: r,
    error: i,
    endAdornment: s,
    focused: a,
    formControl: c,
    fullWidth: u,
    hiddenLabel: p,
    multiline: f,
    readOnly: g,
    size: b,
    startAdornment: m,
    type: x
  } = e, h = {
    root: ["root", `color${ye(n)}`, r && "disabled", i && "error", u && "fullWidth", a && "focused", c && "formControl", b && b !== "medium" && `size${ye(b)}`, f && "multiline", m && "adornedStart", s && "adornedEnd", p && "hiddenLabel", g && "readOnly"],
    input: ["input", r && "disabled", x === "search" && "inputTypeSearch", g && "readOnly"]
  };
  return Ce(h, Kx, t);
}, Ds = ee("div", {
  name: "MuiInputBase",
  slot: "Root",
  overridesResolver: Ms
})(ke(({
  theme: e
}) => ({
  ...e.typography.body1,
  color: (e.vars || e).palette.text.primary,
  lineHeight: "1.4375em",
  // 23px
  boxSizing: "border-box",
  // Prevent padding issue with fullWidth.
  position: "relative",
  cursor: "text",
  display: "inline-flex",
  alignItems: "center",
  [`&.${Yo.disabled}`]: {
    color: (e.vars || e).palette.text.disabled,
    cursor: "default"
  },
  variants: [{
    props: ({
      ownerState: t
    }) => t.multiline,
    style: {
      padding: "4px 0 5px"
    }
  }, {
    props: ({
      ownerState: t,
      size: n
    }) => t.multiline && n === "small",
    style: {
      paddingTop: 1
    }
  }, {
    props: ({
      ownerState: t
    }) => t.fullWidth,
    style: {
      width: "100%"
    }
  }]
}))), Ls = ee("input", {
  name: "MuiInputBase",
  slot: "Input",
  overridesResolver: _s
})(ke(({
  theme: e
}) => {
  const t = e.palette.mode === "light", n = {
    color: "currentColor",
    ...e.vars ? {
      opacity: e.vars.opacity.inputPlaceholder
    } : {
      opacity: t ? 0.42 : 0.5
    },
    transition: e.transitions.create("opacity", {
      duration: e.transitions.duration.shorter
    })
  }, r = {
    opacity: "0 !important"
  }, i = e.vars ? {
    opacity: e.vars.opacity.inputPlaceholder
  } : {
    opacity: t ? 0.42 : 0.5
  };
  return {
    font: "inherit",
    letterSpacing: "inherit",
    color: "currentColor",
    padding: "4px 0 5px",
    border: 0,
    boxSizing: "content-box",
    background: "none",
    height: "1.4375em",
    // Reset 23pxthe native input line-height
    margin: 0,
    // Reset for Safari
    WebkitTapHighlightColor: "transparent",
    display: "block",
    // Make the flex item shrink with Firefox
    minWidth: 0,
    width: "100%",
    "&::-webkit-input-placeholder": n,
    "&::-moz-placeholder": n,
    // Firefox 19+
    "&::-ms-input-placeholder": n,
    // Edge
    "&:focus": {
      outline: 0
    },
    // Reset Firefox invalid required input style
    "&:invalid": {
      boxShadow: "none"
    },
    "&::-webkit-search-decoration": {
      // Remove the padding when type=search.
      WebkitAppearance: "none"
    },
    // Show and hide the placeholder logic
    [`label[data-shrink=false] + .${Yo.formControl} &`]: {
      "&::-webkit-input-placeholder": r,
      "&::-moz-placeholder": r,
      // Firefox 19+
      "&::-ms-input-placeholder": r,
      // Edge
      "&:focus::-webkit-input-placeholder": i,
      "&:focus::-moz-placeholder": i,
      // Firefox 19+
      "&:focus::-ms-input-placeholder": i
      // Edge
    },
    [`&.${Yo.disabled}`]: {
      opacity: 1,
      // Reset iOS opacity
      WebkitTextFillColor: (e.vars || e).palette.text.disabled
      // Fix opacity Safari bug
    },
    variants: [{
      props: ({
        ownerState: s
      }) => !s.disableInjectingGlobalStyles,
      style: {
        animationName: is,
        animationDuration: "10ms",
        "&:-webkit-autofill": {
          animationDuration: "5000s",
          animationName: Fa
        }
      }
    }, {
      props: {
        size: "small"
      },
      style: {
        paddingTop: 1
      }
    }, {
      props: ({
        ownerState: s
      }) => s.multiline,
      style: {
        height: "auto",
        resize: "none",
        padding: 0,
        paddingTop: 0
      }
    }, {
      props: {
        type: "search"
      },
      style: {
        MozAppearance: "textfield"
        // Improve type search style.
      }
    }]
  };
})), Id = dl({
  // Keep keyframes non-empty for Emotion production builds. Animation properties are ignored
  // inside keyframes, avoiding the visible display animation triggered by Chrome 117+.
  [`@keyframes ${Fa}`]: {
    from: {
      animationName: Fa
    }
  },
  [`@keyframes ${is}`]: {
    from: {
      animationName: is
    }
  }
}), Fs = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiInputBase"
  }), {
    "aria-describedby": i,
    "aria-label": s,
    autoComplete: a,
    autoFocus: c,
    className: u,
    color: p,
    defaultValue: f,
    disabled: g,
    disableInjectingGlobalStyles: b,
    endAdornment: m,
    error: x,
    fullWidth: h = !1,
    id: S,
    inputComponent: R = "input",
    inputProps: k = {},
    inputRef: E,
    margin: w,
    maxRows: C,
    minRows: N,
    multiline: M = !1,
    name: D,
    onBlur: L,
    onChange: B,
    onClick: I,
    onFocus: y,
    onKeyDown: $,
    onKeyUp: P,
    placeholder: A,
    readOnly: F,
    renderSuffix: W,
    rows: H,
    size: te,
    slotProps: z = {},
    slots: V = {},
    startAdornment: X,
    type: re = "text",
    value: oe,
    ...ne
  } = r, Q = k.value != null ? k.value : oe, {
    current: Z
  } = v.useRef(Q != null), U = v.useRef(), J = v.useCallback((ue) => {
    process.env.NODE_ENV !== "production" && ue && ue.nodeName !== "INPUT" && !ue.focus && console.error(["MUI: You have provided a `inputComponent` to the input component", "that does not correctly handle the `ref` prop.", "Make sure the `ref` prop is called with a HTMLInputElement."].join(`
`));
  }, []), q = ft(U, E, k.ref, J), [ce, j] = v.useState(!1), [de, Y] = ar({
    props: r,
    states: ["color", "disabled", "error", "hiddenLabel", "size", "required", "filled"]
  });
  process.env.NODE_ENV !== "production" && v.useEffect(() => {
    if (Y)
      return Y.registerEffect();
  }, [Y]), de.focused = Y ? Y.focused : ce, v.useEffect(() => {
    !Y && g && ce && (j(!1), L && L());
  }, [Y, g, ce, L]);
  const he = Y && Y.onFilled, Le = Y && Y.onEmpty, Re = v.useCallback((ue) => {
    os(ue) ? he && he() : Le && Le();
  }, [he, Le]);
  Tt(() => {
    Z && Re({
      value: Q
    });
  }, [Q, Re, Z]), Tt(() => {
    if (!c)
      return;
    const ue = U.current;
    if (!ue)
      return;
    const Te = Et(ue), lt = jn(Te), st = lt == null || lt === Te.body || lt === Te.documentElement;
    ue === lt ? Y && Y.onFocus ? Y.onFocus() : j(!0) : st && ue.focus();
  }, [c]);
  const Ke = (ue) => {
    y && y(ue), k.onFocus && k.onFocus(ue), Y && Y.onFocus ? Y.onFocus(ue) : j(!0);
  }, Se = (ue) => {
    L && L(ue), k.onBlur && k.onBlur(ue), Y && Y.onBlur ? Y.onBlur(ue) : j(!1);
  }, Pe = (ue, ...Te) => {
    if (!Z) {
      const lt = ue.target || U.current;
      if (lt == null)
        throw new Error(process.env.NODE_ENV !== "production" ? "MUI: Expected valid input target. Did you use a custom `inputComponent` and forget to forward refs? See https://mui.com/r/input-component-ref-interface for more info." : Wn(1));
      Re({
        value: lt.value
      });
    }
    k.onChange && k.onChange(ue, ...Te), B && B(ue, ...Te);
  };
  v.useEffect(() => {
    Re(U.current);
  }, []);
  const Ye = (ue) => {
    U.current && ue.currentTarget === ue.target && U.current.focus(), I && I(ue);
  };
  let it = R, Fe = k;
  M && it === "input" && (H ? (process.env.NODE_ENV !== "production" && (N || C) && console.warn("MUI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set."), Fe = {
    type: void 0,
    minRows: H,
    maxRows: H,
    ...Fe
  }) : Fe = {
    type: void 0,
    maxRows: C,
    minRows: N,
    ...Fe
  }, it = Xp);
  const Ae = (ue) => {
    Re(ue.animationName === is ? U.current : {
      value: "x"
    });
  };
  v.useEffect(() => {
    Y && Y.setAdornedStart(!!X);
  }, [Y, X]);
  const Me = {
    ...r,
    color: de.color || "primary",
    disabled: de.disabled,
    endAdornment: m,
    error: de.error,
    focused: de.focused,
    formControl: Y,
    fullWidth: h,
    hiddenLabel: de.hiddenLabel,
    multiline: M,
    size: de.size,
    startAdornment: X,
    type: re
  }, ot = Yx(Me), _e = V.root || Ds, $e = z.root || {}, rt = V.input || Ls;
  return Fe = {
    ...Fe,
    ...z.input
  }, /* @__PURE__ */ T(v.Fragment, {
    children: [!b && typeof Id == "function" && // For Emotion/Styled-components, InputGlobalStyles will be a function
    // For Pigment CSS, this has no effect because the InputGlobalStyles will be null.
    (Pd || (Pd = /* @__PURE__ */ l(Id, {}))), /* @__PURE__ */ T(_e, {
      ...$e,
      ref: n,
      onClick: Ye,
      ...ne,
      ...!Qi(_e) && {
        ownerState: {
          ...Me,
          ...$e.ownerState
        }
      },
      className: le(ot.root, $e.className, u, F && "MuiInputBase-readOnly"),
      children: [X, /* @__PURE__ */ l($s.Provider, {
        value: null,
        children: /* @__PURE__ */ l(rt, {
          "aria-invalid": de.error,
          "aria-describedby": i,
          "aria-label": s,
          autoComplete: a,
          autoFocus: c,
          defaultValue: f,
          disabled: de.disabled,
          id: S,
          onAnimationStart: Ae,
          name: D,
          placeholder: A,
          readOnly: F,
          required: de.required,
          rows: H,
          value: Q,
          onKeyDown: $,
          onKeyUp: P,
          type: re,
          ...Fe,
          ...!Qi(rt) && {
            as: it,
            ownerState: {
              ...Me,
              ...Fe.ownerState
            }
          },
          ref: q,
          className: le(ot.input, Fe.className, F && "MuiInputBase-readOnly"),
          onBlur: Se,
          onChange: Pe,
          onFocus: Ke
        })
      }), m, W ? W({
        ...de,
        startAdornment: X
      }) : null]
    })]
  });
});
process.env.NODE_ENV !== "production" && (Fs.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  "aria-describedby": o.string,
  /**
   * @ignore
   */
  "aria-label": o.string,
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: o.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: o.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
   */
  color: o.oneOfType([o.oneOf(["primary", "secondary", "error", "info", "success", "warning"]), o.string]),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: o.any,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: o.bool,
  /**
   * If `true`, GlobalStyles for the auto-fill keyframes will not be injected/removed on mount/unmount. Make sure to inject them at the top of your application.
   * This option is intended to help with boosting the initial rendering performance if you are loading a big amount of Input components at once.
   * @default false
   */
  disableInjectingGlobalStyles: o.bool,
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment: o.node,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: o.bool,
  /**
   * If `true`, the `input` will take up the full width of its container.
   * @default false
   */
  fullWidth: o.bool,
  /**
   * The id of the `input` element.
   */
  id: o.string,
  /**
   * The component used for the `input` element.
   * Either a string to use a HTML element or a component.
   * @default 'input'
   */
  inputComponent: fl,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#attributes) applied to the `input` element.
   * @default {}
   */
  inputProps: o.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: gn,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
   */
  margin: o.oneOf(["dense", "none"]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: o.oneOfType([o.number, o.string]),
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: o.oneOfType([o.number, o.string]),
  /**
   * If `true`, a [TextareaAutosize](https://mui.com/material-ui/react-textarea-autosize/) element is rendered.
   * @default false
   */
  multiline: o.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: o.string,
  /**
   * Callback fired when the `input` is blurred.
   *
   * Notice that the first argument (event) might be undefined.
   */
  onBlur: o.func,
  /**
   * Callback fired when the value is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: o.func,
  /**
   * @ignore
   */
  onClick: o.func,
  /**
   * @ignore
   */
  onFocus: o.func,
  /**
   * Callback fired when the `input` doesn't satisfy its constraints.
   */
  onInvalid: o.func,
  /**
   * @ignore
   */
  onKeyDown: o.func,
  /**
   * @ignore
   */
  onKeyUp: o.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: o.string,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: o.bool,
  /**
   * @ignore
   */
  renderSuffix: o.func,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: o.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: o.oneOfType([o.number, o.string]),
  /**
   * The size of the component.
   */
  size: o.oneOfType([o.oneOf(["medium", "small"]), o.string]),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: o.shape({
    input: o.object,
    root: o.object
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: o.shape({
    input: o.elementType,
    root: o.elementType
  }),
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: o.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object]),
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#input_types).
   * @default 'text'
   */
  type: o.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: o.any
});
function Xx(e) {
  return be("MuiInput", e);
}
const vr = {
  ...Yo,
  ...xe("MuiInput", ["root", "underline", "input"])
}, Jx = (e) => {
  const {
    classes: t,
    disableUnderline: n
  } = e, i = Ce({
    root: ["root", !n && "underline"],
    input: ["input"]
  }, Xx, t);
  return {
    ...t,
    // forward classes to the InputBase
    ...i
  };
}, Qx = ee(Ds, {
  shouldForwardProp: (e) => zt(e) || e === "classes",
  name: "MuiInput",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [...Ms(e, t), !n.disableUnderline && t.underline];
  }
})(ke(({
  theme: e
}) => {
  let n = e.palette.mode === "light" ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)";
  return e.vars && (n = e.alpha(e.vars.palette.common.onBackground, e.vars.opacity.inputUnderline)), {
    position: "relative",
    variants: [{
      props: ({
        ownerState: r
      }) => r.formControl,
      style: {
        [`label + &, .${G0.root} + &`]: {
          marginTop: 16
        }
      }
    }, {
      props: ({
        ownerState: r
      }) => !r.disableUnderline,
      style: {
        "&::after": {
          left: 0,
          bottom: 0,
          content: '""',
          position: "absolute",
          right: 0,
          transform: "scaleX(0)",
          transition: e.transitions.create("transform", {
            duration: e.transitions.duration.shorter,
            easing: e.transitions.easing.easeOut
          }),
          pointerEvents: "none"
          // Transparent to the hover style.
        },
        [`&.${vr.focused}:after`]: {
          // translateX(0) is a workaround for Safari transform scale bug
          // See https://github.com/mui/material-ui/issues/31766
          transform: "scaleX(1) translateX(0)"
        },
        [`&.${vr.error}`]: {
          "&::before, &::after": {
            borderBottomColor: (e.vars || e).palette.error.main
          }
        },
        "&::before": {
          borderBottom: `1px solid ${n}`,
          left: 0,
          bottom: 0,
          content: '""',
          position: "absolute",
          right: 0,
          transition: e.transitions.create("border-bottom-color", {
            duration: e.transitions.duration.shorter
          }),
          pointerEvents: "none"
          // Transparent to the hover style.
        },
        [`&:hover:not(.${vr.disabled}, .${vr.error}):before`]: {
          borderBottom: `2px solid ${(e.vars || e).palette.text.primary}`,
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            borderBottom: `1px solid ${n}`
          }
        },
        [`&.${vr.disabled}:before`]: {
          borderBottomStyle: "dotted"
        }
      }
    }, ...Object.entries(e.palette).filter(_t()).map(([r]) => ({
      props: {
        color: r,
        disableUnderline: !1
      },
      style: {
        "&::after": {
          borderBottom: `2px solid ${(e.vars || e).palette[r].main}`
        }
      }
    }))]
  };
})), Zx = ee(Ls, {
  name: "MuiInput",
  slot: "Input",
  overridesResolver: _s
})({}), js = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiInput"
  }), {
    disableUnderline: i = !1,
    fullWidth: s = !1,
    inputComponent: a = "input",
    multiline: c = !1,
    notched: u,
    // declare here to prevent spreading to DOM
    slotProps: p,
    slots: f = {},
    type: g = "text",
    ...b
  } = r, m = Jx(r), h = {
    root: {
      ownerState: {
        disableUnderline: i
      }
    }
  }, S = p ? kt(p, h) : h, R = f.root ?? Qx, k = f.input ?? Zx;
  return /* @__PURE__ */ l(Fs, {
    slots: {
      root: R,
      input: k
    },
    slotProps: S,
    fullWidth: s,
    inputComponent: a,
    multiline: c,
    ref: n,
    type: g,
    ...b,
    classes: m
  });
});
process.env.NODE_ENV !== "production" && (js.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: o.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: o.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
   */
  color: o.oneOfType([o.oneOf(["primary", "secondary"]), o.string]),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: o.any,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: o.bool,
  /**
   * If `true`, the `input` will not have an underline.
   * @default false
   */
  disableUnderline: o.bool,
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment: o.node,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: o.bool,
  /**
   * If `true`, the `input` will take up the full width of its container.
   * @default false
   */
  fullWidth: o.bool,
  /**
   * The id of the `input` element.
   */
  id: o.string,
  /**
   * The component used for the `input` element.
   * Either a string to use a HTML element or a component.
   * @default 'input'
   */
  inputComponent: o.elementType,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#attributes) applied to the `input` element.
   * @default {}
   */
  inputProps: o.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: gn,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
   */
  margin: o.oneOf(["dense", "none"]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: o.oneOfType([o.number, o.string]),
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: o.oneOfType([o.number, o.string]),
  /**
   * If `true`, a [TextareaAutosize](https://mui.com/material-ui/react-textarea-autosize/) element is rendered.
   * @default false
   */
  multiline: o.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: o.string,
  /**
   * @internal
   */
  notched: o.bool,
  /**
   * Callback fired when the value is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: o.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: o.string,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: o.bool,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: o.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: o.oneOfType([o.number, o.string]),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: o.shape({
    input: o.object,
    root: o.object
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: o.shape({
    input: o.elementType,
    root: o.elementType
  }),
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: o.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object]),
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#input_types).
   * @default 'text'
   */
  type: o.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: o.any
});
js.muiName = "Input";
function e1(e) {
  return be("MuiFilledInput", e);
}
const co = {
  ...Yo,
  ...xe("MuiFilledInput", ["root", "underline", "input", "adornedStart", "adornedEnd", "sizeSmall", "multiline", "hiddenLabel"])
}, t1 = (e) => {
  const {
    classes: t,
    disableUnderline: n,
    startAdornment: r,
    endAdornment: i,
    size: s,
    hiddenLabel: a,
    multiline: c
  } = e, u = {
    root: ["root", !n && "underline", r && "adornedStart", i && "adornedEnd", s === "small" && `size${ye(s)}`, a && "hiddenLabel", c && "multiline"],
    input: ["input"]
  }, p = Ce(u, e1, t);
  return {
    ...t,
    // forward classes to the InputBase
    ...p
  };
}, n1 = ee(Ds, {
  shouldForwardProp: (e) => zt(e) || e === "classes",
  name: "MuiFilledInput",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [...Ms(e, t), !n.disableUnderline && t.underline];
  }
})(ke(({
  theme: e
}) => {
  const t = e.palette.mode === "light", n = t ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)", r = t ? "rgba(0, 0, 0, 0.06)" : "rgba(255, 255, 255, 0.09)", i = t ? "rgba(0, 0, 0, 0.09)" : "rgba(255, 255, 255, 0.13)", s = t ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)";
  return {
    position: "relative",
    backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : r,
    borderTopLeftRadius: (e.vars || e).shape.borderRadius,
    borderTopRightRadius: (e.vars || e).shape.borderRadius,
    transition: e.transitions.create("background-color", {
      duration: e.transitions.duration.shorter,
      easing: e.transitions.easing.easeOut
    }),
    "&:hover": {
      backgroundColor: e.vars ? e.vars.palette.FilledInput.hoverBg : i,
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : r
      }
    },
    [`&.${co.focused}`]: {
      backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : r
    },
    [`&.${co.disabled}`]: {
      backgroundColor: e.vars ? e.vars.palette.FilledInput.disabledBg : s
    },
    variants: [{
      props: ({
        ownerState: a
      }) => !a.disableUnderline,
      style: {
        "&::after": {
          left: 0,
          bottom: 0,
          content: '""',
          position: "absolute",
          right: 0,
          transform: "scaleX(0)",
          transition: e.transitions.create("transform", {
            duration: e.transitions.duration.shorter,
            easing: e.transitions.easing.easeOut
          }),
          pointerEvents: "none"
          // Transparent to the hover style.
        },
        [`&.${co.focused}:after`]: {
          // translateX(0) is a workaround for Safari transform scale bug
          // See https://github.com/mui/material-ui/issues/31766
          transform: "scaleX(1) translateX(0)"
        },
        [`&.${co.error}`]: {
          "&::before, &::after": {
            borderBottomColor: (e.vars || e).palette.error.main
          }
        },
        "&::before": {
          borderBottom: `1px solid ${e.vars ? e.alpha(e.vars.palette.common.onBackground, e.vars.opacity.inputUnderline) : n}`,
          left: 0,
          bottom: 0,
          content: '""',
          position: "absolute",
          right: 0,
          transition: e.transitions.create("border-bottom-color", {
            duration: e.transitions.duration.shorter
          }),
          pointerEvents: "none"
          // Transparent to the hover style.
        },
        [`&:hover:not(.${co.disabled}, .${co.error}):before`]: {
          borderBottom: `1px solid ${(e.vars || e).palette.text.primary}`
        },
        [`&.${co.disabled}:before`]: {
          borderBottomStyle: "dotted"
        }
      }
    }, ...Object.entries(e.palette).filter(_t()).map(([a]) => {
      var c;
      return {
        props: {
          disableUnderline: !1,
          color: a
        },
        style: {
          "&::after": {
            borderBottom: `2px solid ${(c = (e.vars || e).palette[a]) == null ? void 0 : c.main}`
          }
        }
      };
    }), {
      props: ({
        ownerState: a
      }) => a.startAdornment,
      style: {
        paddingLeft: 12
      }
    }, {
      props: ({
        ownerState: a
      }) => a.endAdornment,
      style: {
        paddingRight: 12
      }
    }, {
      props: ({
        ownerState: a
      }) => a.multiline,
      style: {
        padding: "25px 12px 8px"
      }
    }, {
      props: ({
        ownerState: a,
        size: c
      }) => a.multiline && c === "small",
      style: {
        paddingTop: 21,
        paddingBottom: 4
      }
    }, {
      props: ({
        ownerState: a
      }) => a.multiline && a.hiddenLabel,
      style: {
        paddingTop: 16,
        paddingBottom: 17
      }
    }, {
      props: ({
        ownerState: a
      }) => a.multiline && a.hiddenLabel && a.size === "small",
      style: {
        paddingTop: 8,
        paddingBottom: 9
      }
    }]
  };
})), o1 = ee(Ls, {
  name: "MuiFilledInput",
  slot: "Input",
  overridesResolver: _s
})(ke(({
  theme: e
}) => ({
  paddingTop: 25,
  paddingRight: 12,
  paddingBottom: 8,
  paddingLeft: 12,
  "&:-webkit-autofill": {
    ...!e.vars && {
      WebkitBoxShadow: e.palette.mode === "light" ? null : "0 0 0 100px #266798 inset",
      WebkitTextFillColor: e.palette.mode === "light" ? null : "#fff",
      caretColor: e.palette.mode === "light" ? null : "#fff"
    },
    borderTopLeftRadius: "inherit",
    borderTopRightRadius: "inherit",
    ...e.vars && e.applyStyles("dark", {
      WebkitBoxShadow: "0 0 0 100px #266798 inset",
      WebkitTextFillColor: "#fff",
      caretColor: "#fff"
    })
  },
  variants: [{
    props: {
      size: "small"
    },
    style: {
      paddingTop: 21,
      paddingBottom: 4
    }
  }, {
    props: ({
      ownerState: t
    }) => t.hiddenLabel,
    style: {
      paddingTop: 16,
      paddingBottom: 17
    }
  }, {
    props: ({
      ownerState: t
    }) => t.startAdornment,
    style: {
      paddingLeft: 0
    }
  }, {
    props: ({
      ownerState: t
    }) => t.endAdornment,
    style: {
      paddingRight: 0
    }
  }, {
    props: ({
      ownerState: t
    }) => t.hiddenLabel && t.size === "small",
    style: {
      paddingTop: 8,
      paddingBottom: 9
    }
  }, {
    props: ({
      ownerState: t
    }) => t.multiline,
    style: {
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0
    }
  }]
}))), Bs = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiFilledInput"
  }), {
    disableUnderline: i = !1,
    fullWidth: s = !1,
    hiddenLabel: a,
    // declare here to prevent spreading to DOM
    inputComponent: c = "input",
    multiline: u = !1,
    notched: p,
    // declare here to prevent spreading to DOM
    slotProps: f,
    slots: g = {},
    type: b = "text",
    ...m
  } = r, x = {
    ...r,
    disableUnderline: i,
    fullWidth: s,
    inputComponent: c,
    multiline: u,
    type: b
  }, h = t1(r), S = {
    root: {
      ownerState: x
    },
    input: {
      ownerState: x
    }
  }, R = f ? kt(S, f) : S, k = g.root ?? n1, E = g.input ?? o1;
  return /* @__PURE__ */ l(Fs, {
    slots: {
      root: k,
      input: E
    },
    slotProps: R,
    fullWidth: s,
    inputComponent: c,
    multiline: u,
    ref: n,
    type: b,
    ...m,
    classes: h
  });
});
process.env.NODE_ENV !== "production" && (Bs.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: o.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: o.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
   */
  color: o.oneOfType([o.oneOf(["primary", "secondary"]), o.string]),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: o.any,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: o.bool,
  /**
   * If `true`, the input will not have an underline.
   * @default false
   */
  disableUnderline: o.bool,
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment: o.node,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: o.bool,
  /**
   * If `true`, the `input` will take up the full width of its container.
   * @default false
   */
  fullWidth: o.bool,
  /**
   * If `true`, the label is hidden.
   * This is used to increase density for a `FilledInput`.
   * Be sure to add `aria-label` to the `input` element.
   * @default false
   */
  hiddenLabel: o.bool,
  /**
   * The id of the `input` element.
   */
  id: o.string,
  /**
   * The component used for the `input` element.
   * Either a string to use a HTML element or a component.
   * @default 'input'
   */
  inputComponent: o.elementType,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#attributes) applied to the `input` element.
   * @default {}
   */
  inputProps: o.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: gn,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
   */
  margin: o.oneOf(["dense", "none"]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: o.oneOfType([o.number, o.string]),
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: o.oneOfType([o.number, o.string]),
  /**
   * If `true`, a [TextareaAutosize](https://mui.com/material-ui/react-textarea-autosize/) element is rendered.
   * @default false
   */
  multiline: o.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: o.string,
  /**
   * @internal
   */
  notched: o.bool,
  /**
   * Callback fired when the value is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: o.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: o.string,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: o.bool,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: o.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: o.oneOfType([o.number, o.string]),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: o.shape({
    input: o.object,
    root: o.object
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: o.shape({
    input: o.elementType,
    root: o.elementType
  }),
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: o.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object]),
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#input_types).
   * @default 'text'
   */
  type: o.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: o.any
});
Bs.muiName = "Input";
var $d;
const r1 = ee("fieldset", {
  name: "MuiNotchedOutlined",
  shouldForwardProp: zt
})({
  textAlign: "left",
  position: "absolute",
  bottom: 0,
  right: 0,
  top: -5,
  left: 0,
  margin: 0,
  padding: "0 8px",
  pointerEvents: "none",
  borderRadius: "inherit",
  borderStyle: "solid",
  borderWidth: 1,
  overflow: "hidden",
  minWidth: "0%"
}), i1 = ee("legend", {
  name: "MuiNotchedOutlined",
  shouldForwardProp: zt
})(ke(({
  theme: e
}) => ({
  float: "unset",
  // Fix conflict with bootstrap
  width: "auto",
  // Fix conflict with bootstrap
  overflow: "hidden",
  // Fix Horizontal scroll when label too long
  variants: [{
    props: ({
      ownerState: t
    }) => !t.withLabel,
    style: {
      padding: 0,
      lineHeight: "11px",
      // sync with `height` in `legend` styles
      transition: e.transitions.create("width", {
        duration: 150,
        easing: e.transitions.easing.easeOut
      })
    }
  }, {
    props: ({
      ownerState: t
    }) => t.withLabel,
    style: {
      display: "block",
      // Fix conflict with normalize.css and sanitize.css
      padding: 0,
      height: 11,
      // sync with `lineHeight` in `legend` styles
      fontSize: "0.75em",
      visibility: "hidden",
      maxWidth: 0.01,
      transition: e.transitions.create("max-width", {
        duration: 50,
        easing: e.transitions.easing.easeOut
      }),
      whiteSpace: "nowrap",
      "& > span": {
        paddingLeft: 5,
        paddingRight: 5,
        display: "inline-block",
        opacity: 0,
        visibility: "visible"
      }
    }
  }, {
    props: ({
      ownerState: t
    }) => t.withLabel && t.notched,
    style: {
      maxWidth: "100%",
      transition: e.transitions.create("max-width", {
        duration: 100,
        easing: e.transitions.easing.easeOut,
        delay: 50
      })
    }
  }]
})));
function Jp(e) {
  const {
    children: t,
    classes: n,
    className: r,
    label: i,
    notched: s,
    ...a
  } = e, c = i != null && i !== "", u = {
    ...e,
    notched: s,
    withLabel: c
  };
  return /* @__PURE__ */ l(r1, {
    "aria-hidden": !0,
    className: r,
    ownerState: u,
    ...a,
    children: /* @__PURE__ */ l(i1, {
      ownerState: u,
      children: c ? /* @__PURE__ */ l("span", {
        children: i
      }) : (
        // notranslate needed while Google Translate will not fix zero-width space issue
        $d || ($d = /* @__PURE__ */ l("span", {
          className: "notranslate",
          "aria-hidden": !0,
          children: "​"
        }))
      )
    })
  });
}
process.env.NODE_ENV !== "production" && (Jp.propTypes = {
  /**
   * The content of the component.
   */
  children: o.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * The label.
   */
  label: o.node,
  /**
   * If `true`, the outline is notched to accommodate the label.
   */
  notched: o.bool.isRequired,
  /**
   * @ignore
   */
  style: o.object
});
function s1(e) {
  return be("MuiOutlinedInput", e);
}
const bn = {
  ...Yo,
  ...xe("MuiOutlinedInput", ["root", "notchedOutline", "input"])
}, a1 = (e) => {
  const {
    classes: t
  } = e, r = Ce({
    root: ["root"],
    notchedOutline: ["notchedOutline"],
    input: ["input"]
  }, s1, t);
  return {
    ...t,
    // forward classes to the InputBase
    ...r
  };
}, l1 = ee(Ds, {
  shouldForwardProp: (e) => zt(e) || e === "classes",
  name: "MuiOutlinedInput",
  slot: "Root",
  overridesResolver: Ms
})(ke(({
  theme: e
}) => {
  const t = e.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";
  return {
    position: "relative",
    borderRadius: (e.vars || e).shape.borderRadius,
    [`&:hover .${bn.notchedOutline}`]: {
      borderColor: (e.vars || e).palette.text.primary
    },
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      [`&:hover .${bn.notchedOutline}`]: {
        borderColor: e.vars ? e.alpha(e.vars.palette.common.onBackground, 0.23) : t
      }
    },
    [`&.${bn.focused} .${bn.notchedOutline}`]: {
      borderWidth: 2
    },
    variants: [...Object.entries(e.palette).filter(_t()).map(([n]) => ({
      props: {
        color: n
      },
      style: {
        [`&.${bn.focused} .${bn.notchedOutline}`]: {
          borderColor: (e.vars || e).palette[n].main
        }
      }
    })), {
      props: {},
      // to override the above style
      style: {
        [`&.${bn.error} .${bn.notchedOutline}`]: {
          borderColor: (e.vars || e).palette.error.main
        },
        [`&.${bn.disabled} .${bn.notchedOutline}`]: {
          borderColor: (e.vars || e).palette.action.disabled
        }
      }
    }, {
      props: ({
        ownerState: n
      }) => n.startAdornment,
      style: {
        paddingLeft: 14
      }
    }, {
      props: ({
        ownerState: n
      }) => n.endAdornment,
      style: {
        paddingRight: 14
      }
    }, {
      props: ({
        ownerState: n
      }) => n.multiline,
      style: {
        padding: "16.5px 14px"
      }
    }, {
      props: ({
        ownerState: n,
        size: r
      }) => n.multiline && r === "small",
      style: {
        padding: "8.5px 14px"
      }
    }]
  };
})), c1 = ee(Jp, {
  name: "MuiOutlinedInput",
  slot: "NotchedOutline"
})(ke(({
  theme: e
}) => {
  const t = e.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";
  return {
    borderColor: e.vars ? e.alpha(e.vars.palette.common.onBackground, 0.23) : t
  };
})), d1 = ee(Ls, {
  name: "MuiOutlinedInput",
  slot: "Input",
  overridesResolver: _s
})(ke(({
  theme: e
}) => ({
  padding: "16.5px 14px",
  "&:-webkit-autofill": {
    ...!e.vars && {
      WebkitBoxShadow: e.palette.mode === "light" ? null : "0 0 0 100px #266798 inset",
      WebkitTextFillColor: e.palette.mode === "light" ? null : "#fff",
      caretColor: e.palette.mode === "light" ? null : "#fff"
    },
    borderRadius: "inherit",
    ...e.vars && e.applyStyles("dark", {
      WebkitBoxShadow: "0 0 0 100px #266798 inset",
      WebkitTextFillColor: "#fff",
      caretColor: "#fff"
    })
  },
  variants: [{
    props: {
      size: "small"
    },
    style: {
      padding: "8.5px 14px"
    }
  }, {
    props: ({
      ownerState: t
    }) => t.multiline,
    style: {
      padding: 0
    }
  }, {
    props: ({
      ownerState: t
    }) => t.startAdornment,
    style: {
      paddingLeft: 0
    }
  }, {
    props: ({
      ownerState: t
    }) => t.endAdornment,
    style: {
      paddingRight: 0
    }
  }]
}))), Ws = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiOutlinedInput"
  }), {
    fullWidth: i = !1,
    inputComponent: s = "input",
    label: a,
    multiline: c = !1,
    notched: u,
    slots: p = {},
    slotProps: f = {},
    type: g = "text",
    ...b
  } = r, m = a1(r), [x, h] = ar({
    props: r,
    states: ["color", "disabled", "error", "focused", "hiddenLabel", "size", "required"]
  }), S = {
    ...r,
    color: x.color || "primary",
    disabled: x.disabled,
    error: x.error,
    focused: x.focused,
    formControl: h,
    fullWidth: i,
    hiddenLabel: x.hiddenLabel,
    multiline: c,
    size: x.size,
    type: g
  }, R = p.root ?? l1, k = p.input ?? d1, [E, w] = ge("notchedOutline", {
    elementType: c1,
    className: m.notchedOutline,
    shouldForwardComponentProp: !0,
    ownerState: S,
    externalForwardedProps: {
      slots: p,
      slotProps: f
    },
    additionalProps: {
      label: a != null && a !== "" && x.required ? /* @__PURE__ */ T(v.Fragment, {
        children: [a, " ", "*"]
      }) : a
    }
  });
  return /* @__PURE__ */ l(Fs, {
    slots: {
      root: R,
      input: k
    },
    slotProps: f,
    renderSuffix: (C) => /* @__PURE__ */ l(E, {
      ...w,
      notched: typeof u < "u" ? u : !!(C.startAdornment || C.filled || C.focused)
    }),
    fullWidth: i,
    inputComponent: s,
    multiline: c,
    ref: n,
    type: g,
    ...b,
    classes: {
      ...m,
      notchedOutline: null
    }
  });
});
process.env.NODE_ENV !== "production" && (Ws.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: o.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: o.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
   */
  color: o.oneOfType([o.oneOf(["primary", "secondary"]), o.string]),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: o.any,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: o.bool,
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment: o.node,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: o.bool,
  /**
   * If `true`, the `input` will take up the full width of its container.
   * @default false
   */
  fullWidth: o.bool,
  /**
   * The id of the `input` element.
   */
  id: o.string,
  /**
   * The component used for the `input` element.
   * Either a string to use a HTML element or a component.
   * @default 'input'
   */
  inputComponent: o.elementType,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#attributes) applied to the `input` element.
   * @default {}
   */
  inputProps: o.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: gn,
  /**
   * The label of the `input`. It is only used for layout. The actual labelling
   * is handled by `InputLabel`.
   */
  label: o.node,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
   */
  margin: o.oneOf(["dense", "none"]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: o.oneOfType([o.number, o.string]),
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: o.oneOfType([o.number, o.string]),
  /**
   * If `true`, a [TextareaAutosize](https://mui.com/material-ui/react-textarea-autosize/) element is rendered.
   * @default false
   */
  multiline: o.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: o.string,
  /**
   * If `true`, the outline is notched to accommodate the label.
   */
  notched: o.bool,
  /**
   * Callback fired when the value is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: o.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: o.string,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: o.bool,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: o.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: o.oneOfType([o.number, o.string]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: o.shape({
    input: o.object,
    notchedOutline: o.oneOfType([o.func, o.object]),
    root: o.object
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: o.shape({
    input: o.elementType,
    notchedOutline: o.elementType,
    root: o.elementType
  }),
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: o.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object]),
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#input_types).
   * @default 'text'
   */
  type: o.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: o.any
});
Ws.muiName = "Input";
const u1 = (e) => {
  const {
    classes: t
  } = e, r = Ce({
    root: ["root"]
  }, Kp, t);
  return {
    ...t,
    ...r
  };
}, Tl = {
  name: "MuiSelect",
  slot: "Root",
  shouldForwardProp: (e) => zt(e) && e !== "variant"
}, p1 = ee(js, Tl)(""), f1 = ee(Ws, Tl)(""), m1 = ee(Bs, Tl)(""), pn = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    name: "MuiSelect",
    props: t
  }), {
    autoWidth: i = !1,
    children: s,
    classes: a = {},
    className: c,
    defaultOpen: u = !1,
    displayEmpty: p = !1,
    IconComponent: f = Gx,
    id: g,
    input: b,
    inputProps: m,
    label: x,
    labelId: h,
    MenuProps: S,
    multiple: R = !1,
    native: k = !1,
    onClose: E,
    onOpen: w,
    open: C,
    renderValue: N,
    SelectDisplayProps: M,
    variant: D = "outlined",
    ...L
  } = r, B = k ? qp : Yp, [I] = ar({
    props: r,
    states: ["variant", "error"]
  }), y = I.variant || D, $ = {
    ...r,
    variant: y,
    classes: a
  }, P = u1($), {
    root: A,
    ...F
  } = P, W = b || {
    standard: /* @__PURE__ */ l(p1, {
      ownerState: $
    }),
    outlined: /* @__PURE__ */ l(f1, {
      label: x,
      ownerState: $
    }),
    filled: /* @__PURE__ */ l(m1, {
      ownerState: $
    })
  }[y], H = ft(n, sr(W));
  return /* @__PURE__ */ l(v.Fragment, {
    children: /* @__PURE__ */ v.cloneElement(W, {
      // Most of the logic is implemented in `SelectInput`.
      // The `Select` component is a simple API wrapper to expose something better to play with.
      inputComponent: B,
      inputProps: {
        children: s,
        error: I.error,
        IconComponent: f,
        variant: y,
        type: void 0,
        // We render a select. We can ignore the type provided by the `Input`.
        multiple: R,
        ...k ? {
          id: g
        } : {
          autoWidth: i,
          defaultOpen: u,
          displayEmpty: p,
          labelId: h,
          MenuProps: S,
          onClose: E,
          onOpen: w,
          open: C,
          renderValue: N,
          SelectDisplayProps: {
            id: g,
            ...M
          }
        },
        ...m,
        classes: m ? kt(F, m.classes) : F,
        ...b ? b.props.inputProps : {}
      },
      ...(R && k || p) && y === "outlined" ? {
        notched: !0
      } : {},
      ref: H,
      className: le(W.props.className, c, P.root),
      // If a custom input is provided via 'input' prop, do not allow 'variant' to be propagated to it's root element. See https://github.com/mui/material-ui/issues/33894.
      ...!b && {
        variant: y
      },
      ...L
    })
  });
});
process.env.NODE_ENV !== "production" && (pn.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the width of the popover will automatically be set according to the items inside the
   * menu, otherwise it will be at least the width of the select input.
   * @default false
   */
  autoWidth: o.bool,
  /**
   * The option elements to populate the select with.
   * Can be some `MenuItem` when `native` is false and `option` when `native` is true.
   *
   * ⚠️The `MenuItem` elements **must** be direct descendants when `native` is false.
   */
  children: o.node,
  /**
   * Override or extend the styles applied to the component.
   * @default {}
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * If `true`, the component is initially open. Use when the component open state is not controlled (i.e. the `open` prop is not defined).
   * You can only use it when the `native` prop is `false` (default).
   * @default false
   */
  defaultOpen: o.bool,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: o.any,
  /**
   * If `true`, a value is displayed even if no items are selected.
   *
   * In order to display a meaningful value, a function can be passed to the `renderValue` prop which
   * returns the value to be displayed when no items are selected.
   *
   * ⚠️ When using this prop, make sure the label doesn't overlap with the empty displayed value.
   * The label should either be hidden or forced to a shrunk state.
   * @default false
   */
  displayEmpty: o.bool,
  /**
   * The icon that displays the arrow.
   * @default ArrowDropDownIcon
   */
  IconComponent: o.elementType,
  /**
   * The `id` of the wrapper element or the `select` element when `native`.
   */
  id: o.string,
  /**
   * An `Input` element; does not have to be a material-ui specific `Input`.
   */
  input: o.element,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#attributes) applied to the `input` element.
   * When `native` is `true`, the attributes are applied on the `select` element.
   */
  inputProps: o.object,
  /**
   * See [OutlinedInput#label](https://mui.com/material-ui/api/outlined-input/#props)
   */
  label: o.node,
  /**
   * The ID of an element that acts as an additional label. The Select will
   * be labelled by the additional label and the selected value.
   */
  labelId: o.string,
  /**
   * Props applied to the [`Menu`](https://mui.com/material-ui/api/menu/) element.
   */
  MenuProps: o.object,
  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   * @default false
   */
  multiple: o.bool,
  /**
   * If `true`, the component uses a native `select` element.
   * @default false
   */
  native: o.bool,
  /**
   * Callback fired when a menu item is selected.
   *
   * @param {SelectChangeEvent<Value>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * **Warning**: This is a generic event, not a change event, unless the change event is caused by browser autofill.
   * @param {object} [child] The react element that was selected when `native` is `false` (default).
   */
  onChange: o.func,
  /**
   * Callback fired when the component requests to be closed.
   * Use it in either controlled (see the `open` prop), or uncontrolled mode (to detect when the Select collapses).
   *
   * @param {object} event The event source of the callback.
   */
  onClose: o.func,
  /**
   * Callback fired when the component requests to be opened.
   * Use it in either controlled (see the `open` prop), or uncontrolled mode (to detect when the Select expands).
   *
   * @param {object} event The event source of the callback.
   */
  onOpen: o.func,
  /**
   * If `true`, the component is shown.
   * You can only use it when the `native` prop is `false` (default).
   */
  open: o.bool,
  /**
   * Render the selected value.
   * You can only use it when the `native` prop is `false` (default).
   *
   * @param {any} value The `value` provided to the component.
   * @returns {ReactNode}
   */
  renderValue: o.func,
  /**
   * Props applied to the clickable div element.
   */
  SelectDisplayProps: o.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object]),
  /**
   * The `input` value. Providing an empty string will select no options.
   * Set to an empty string `''` if you don't want any of the available options to be selected.
   *
   * If the value is an object it must have reference equality with the option in order to be selected.
   * If the value is not an object, the string representation must match with the string representation of the option in order to be selected.
   */
  value: o.oneOfType([o.oneOf([""]), o.any]),
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: o.oneOf(["filled", "outlined", "standard"])
});
pn.muiName = "Select";
const ae = Sy({
  createStyledComponent: ee("div", {
    name: "MuiStack",
    slot: "Root"
  }),
  useThemeProps: (e) => we({
    props: e,
    name: "MuiStack"
  })
});
process.env.NODE_ENV !== "production" && (ae.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: o.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: o.elementType,
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'column'
   */
  direction: o.oneOfType([o.oneOf(["column-reverse", "column", "row-reverse", "row"]), o.arrayOf(o.oneOf(["column-reverse", "column", "row-reverse", "row"])), o.object]),
  /**
   * Add an element between each child.
   */
  divider: o.node,
  /**
   * Defines the space between immediate children.
   * @default 0
   */
  spacing: o.oneOfType([o.arrayOf(o.oneOfType([o.number, o.string])), o.number, o.object, o.string]),
  /**
   * The system prop, which allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object]),
  /**
   * If `true`, the CSS flexbox `gap` is used instead of applying `margin` to children.
   *
   * While CSS `gap` removes the [known limitations](https://mui.com/joy-ui/react-stack/#limitations),
   * it is not fully supported in some browsers. We recommend checking https://caniuse.com/?search=flex%20gap before using this flag.
   *
   * To enable this flag globally, follow the [theme's default props](https://mui.com/material-ui/customization/theme-components/#default-props) configuration.
   * @default false
   */
  useFlexGap: o.bool
});
function h1(e) {
  return be("MuiTextField", e);
}
xe("MuiTextField", ["root"]);
const g1 = {
  standard: js,
  filled: Bs,
  outlined: Ws
}, y1 = (e) => {
  const {
    classes: t
  } = e;
  return Ce({
    root: ["root"]
  }, h1, t);
}, b1 = ee(Cn, {
  name: "MuiTextField",
  slot: "Root"
})({}), vt = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiTextField"
  }), {
    autoComplete: i,
    autoFocus: s = !1,
    children: a,
    className: c,
    color: u = "primary",
    defaultValue: p,
    disabled: f = !1,
    error: g = !1,
    fullWidth: b = !1,
    helperText: m,
    id: x,
    inputRef: h,
    label: S,
    maxRows: R,
    minRows: k,
    multiline: E = !1,
    name: w,
    onBlur: C,
    onChange: N,
    onFocus: M,
    placeholder: D,
    required: L = !1,
    rows: B,
    select: I = !1,
    slots: y = {},
    slotProps: $ = {},
    type: P,
    value: A,
    variant: F = "outlined",
    ...W
  } = r, H = {
    ...r,
    autoFocus: s,
    color: u,
    disabled: f,
    error: g,
    fullWidth: b,
    multiline: E,
    required: L,
    select: I,
    variant: F
  }, te = y1(H);
  process.env.NODE_ENV !== "production" && I && !a && console.error("MUI: `children` must be passed when using the `TextField` component with `select`.");
  const z = zn(x), V = m && z ? `${z}-helper-text` : void 0, X = S && z ? `${z}-label` : void 0, re = g1[F], oe = {
    slots: y,
    slotProps: $
  }, [ne, Q] = ge("select", {
    elementType: pn,
    externalForwardedProps: oe,
    ownerState: H
  }), Z = I && Q.native, U = {}, J = oe.slotProps.inputLabel;
  F === "outlined" && (J && typeof J.shrink < "u" && (U.notched = J.shrink), U.label = S), I && (Z || (U.id = void 0), U["aria-describedby"] = void 0);
  const [q, ce] = ge("root", {
    elementType: b1,
    shouldForwardComponentProp: !0,
    externalForwardedProps: {
      ...oe,
      ...W
    },
    ownerState: H,
    className: le(te.root, c),
    ref: n,
    additionalProps: {
      disabled: f,
      error: g,
      fullWidth: b,
      required: L,
      color: u,
      variant: F
    }
  }), [j, de] = ge("input", {
    elementType: re,
    externalForwardedProps: oe,
    additionalProps: U,
    ownerState: H
  }), [Y, he] = ge("inputLabel", {
    elementType: wn,
    externalForwardedProps: oe,
    ownerState: H
  }), [Le, Re] = ge("htmlInput", {
    elementType: "input",
    externalForwardedProps: oe,
    ownerState: H
  }), [Ke, Se] = ge("formHelperText", {
    elementType: rs,
    externalForwardedProps: oe,
    ownerState: H
  }), Pe = /* @__PURE__ */ l(j, {
    "aria-describedby": V,
    autoComplete: i,
    autoFocus: s,
    defaultValue: p,
    fullWidth: b,
    multiline: E,
    name: w,
    rows: B,
    maxRows: R,
    minRows: k,
    type: P,
    value: A,
    id: z,
    inputRef: h,
    onBlur: C,
    onChange: N,
    onFocus: M,
    placeholder: D,
    inputProps: Re,
    slots: {
      input: y.htmlInput ? Le : void 0
    },
    ...de
  });
  return /* @__PURE__ */ T(q, {
    ...ce,
    children: [S != null && S !== "" && /* @__PURE__ */ l(Y, {
      htmlFor: I && !Z ? void 0 : z,
      id: X,
      ...I && !Z && {
        component: "div"
      },
      ...he,
      children: S
    }), I ? /* @__PURE__ */ l(ne, {
      "aria-describedby": V,
      id: z,
      labelId: X,
      value: A,
      input: Pe,
      ...Q,
      children: a
    }) : Pe, m && /* @__PURE__ */ l(Ke, {
      id: V,
      ...Se,
      children: m
    })]
  });
});
process.env.NODE_ENV !== "production" && (vt.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: o.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   * @default false
   */
  autoFocus: o.bool,
  /**
   * @ignore
   */
  children: o.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: o.oneOfType([o.oneOf(["primary", "secondary", "error", "info", "success", "warning"]), o.string]),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: o.any,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: o.bool,
  /**
   * If `true`, the label is displayed in an error state.
   * @default false
   */
  error: o.bool,
  /**
   * If `true`, the input will take up the full width of its container.
   * @default false
   */
  fullWidth: o.bool,
  /**
   * The helper text content.
   */
  helperText: o.node,
  /**
   * The id of the `input` element.
   * Use this prop to make `label` and `helperText` accessible for screen readers.
   */
  id: o.string,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: gn,
  /**
   * The label content.
   */
  label: o.node,
  /**
   * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
   * @default 'none'
   */
  margin: o.oneOf(["dense", "none", "normal"]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: o.oneOfType([o.number, o.string]),
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: o.oneOfType([o.number, o.string]),
  /**
   * If `true`, a `textarea` element is rendered instead of an input.
   * @default false
   */
  multiline: o.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: o.string,
  /**
   * @ignore
   */
  onBlur: o.func,
  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: o.func,
  /**
   * @ignore
   */
  onFocus: o.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: o.string,
  /**
   * If `true`, the label is displayed as required and the `input` element is required.
   * @default false
   */
  required: o.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: o.oneOfType([o.number, o.string]),
  /**
   * Render a [`Select`](https://mui.com/material-ui/api/select/) element while passing the Input element to `Select` as `input` parameter.
   * If this option is set you must pass the options of the select as children.
   * @default false
   */
  select: o.bool,
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: o.oneOfType([o.oneOf(["medium", "small"]), o.string]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: o.shape({
    formHelperText: o.oneOfType([o.func, o.object]),
    htmlInput: o.oneOfType([o.func, o.object]),
    input: o.oneOfType([o.func, o.object]),
    inputLabel: o.oneOfType([o.func, o.object]),
    select: o.oneOfType([o.func, o.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: o.shape({
    formHelperText: o.elementType,
    htmlInput: o.elementType,
    input: o.elementType,
    inputLabel: o.elementType,
    root: o.elementType,
    select: o.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object]),
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#input_types).
   */
  type: o.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: o.any,
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: o.oneOf(["filled", "outlined", "standard"])
});
const v1 = at(/* @__PURE__ */ l("path", {
  d: "M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"
}), "ExpandMore");
class Uo extends Error {
  constructor(t) {
    super(t), this.name = "EmbedAuthMissingError";
  }
}
class Qp extends Error {
  constructor(n) {
    super("authentication required");
    So(this, "loginPath");
    this.name = "DashboardAuthRequiredError", this.loginPath = n;
  }
}
function Zp(e) {
  const t = e.startsWith("/") ? e : `/${e}`;
  window.location.assign(t);
}
let fn = null;
function Ad(e) {
  fn = e;
}
function ja() {
  return fn;
}
function Xo() {
  const e = fn;
  return (e == null ? void 0 : e.mode) === "embed" || (e == null ? void 0 : e.mode) === "component";
}
function x1(e) {
  const t = e.trim();
  return t === "" ? "" : t.replace(/\/$/, "");
}
function C1() {
  return fn !== null ? fn.httpPathPrefix : x1("");
}
function ss() {
  return Xo() ? (fn == null ? void 0 : fn.defaultSection) ?? "servers" : "home";
}
function Zt() {
  return (fn == null ? void 0 : fn.mode) !== "component";
}
const ef = "tenant_id_token";
function w1() {
  try {
    const e = window.localStorage.getItem(ef);
    if (e === null)
      return null;
    const t = e.trim();
    return t.length > 0 ? t : null;
  } catch {
    return null;
  }
}
function tf() {
  var t, n;
  const e = (n = (t = ja()) == null ? void 0 : t.token) == null ? void 0 : n.trim();
  return e || w1();
}
function xr(e, t) {
  const n = e[t];
  if (typeof n != "string")
    return;
  const r = n.trim();
  return r.length > 0 ? r : void 0;
}
function nf(e) {
  const t = e.split(".");
  if (t.length !== 3)
    throw new Uo("tenant_id_token is not a valid JWT");
  let n;
  try {
    n = atob(t[1].replace(/-/g, "+").replace(/_/g, "/"));
  } catch {
    throw new Uo("tenant_id_token JWT payload could not be decoded");
  }
  let r;
  try {
    r = JSON.parse(n);
  } catch {
    throw new Uo("tenant_id_token JWT payload is not valid JSON");
  }
  const i = xr(r, "tenant_id") ?? xr(r, "custom:tenant_id") ?? xr(r, "tenantId");
  return {
    email: xr(r, "email"),
    sub: xr(r, "sub"),
    tenantId: i
  };
}
function of() {
  var s, a;
  if (!Xo())
    return {};
  const e = tf();
  if (e === null) {
    const c = ja();
    throw (c == null ? void 0 : c.mode) === "component" ? new Uo(
      "Missing token prop — pass token to <MCPGatewayDashboard /> or set localStorage tenant_id_token"
    ) : new Uo(
      `Missing ${ef} in localStorage — parent app must set it before loading the embed`
    );
  }
  const t = nf(e), r = ((a = (s = ja()) == null ? void 0 : s.tenantId) == null ? void 0 : a.trim()) || t.tenantId, i = {
    Authorization: `Bearer ${e}`
  };
  return r && (i["X-Tenant-ID"] = r), i;
}
function S1(e) {
  const t = e.trim();
  return t === "" ? "" : t.replace(/\/$/, "");
}
function rf() {
  return S1(C1());
}
function T1(e) {
  const t = e.startsWith("/") ? e : `/${e}`, n = rf();
  return n !== "" ? `${n}${t}` : t;
}
function E1(e) {
  const t = T1(e);
  if (rf() !== "")
    return t;
  const r = "/", i = t.startsWith("/") ? t.slice(1) : t;
  return r + i;
}
async function et(e, t) {
  const n = Xo() ? of() : {}, r = await fetch(E1(e), {
    ...t,
    headers: {
      Accept: "application/json",
      ...n,
      ...(t == null ? void 0 : t.headers) ?? {}
    }
  }), i = await r.text(), s = r.headers.get("content-type") ?? "";
  let a;
  if (i.length > 0 && s.includes("application/json"))
    try {
      a = JSON.parse(i);
    } catch {
      a = void 0;
    }
  const c = a !== void 0 && typeof a == "object" && a !== null ? a : {};
  if (r.status === 401 && typeof c.login_path == "string" && !Xo()) {
    const u = c.login_path.trim();
    if (u.length > 0)
      throw new Qp(u);
  }
  if (!r.ok) {
    let u = `Request failed: ${r.status}`;
    throw typeof c.error == "string" && c.error.trim() !== "" && (u = c.error.trim()), new Error(u);
  }
  if (r.status !== 204)
    return a;
}
const Ie = {
  authStatus: () => et("/dashboard/auth-status"),
  overview: () => et("/dashboard/overview"),
  servers: () => et("/dashboard/servers"),
  tools: () => et("/dashboard/tools"),
  toolGroups: () => et("/dashboard/tool-groups"),
  promptGroups: () => et("/dashboard/prompt-groups"),
  prompts: () => et("/dashboard/prompts"),
  resources: () => et("/dashboard/resources"),
  diagnostics: () => et("/dashboard/diagnostics"),
  registerServer: (e) => et("/dashboard/servers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(e)
  }),
  getServerConfig: (e) => et(`/dashboard/servers/${encodeURIComponent(e)}/config`),
  updateServer: (e, t) => et(`/dashboard/servers/${encodeURIComponent(e)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(t)
  }),
  getOAuthSession: (e) => et(
    `/dashboard/oauth/session/${encodeURIComponent(e)}`
  ),
  createToolGroup: (e) => et("/dashboard/tool-groups", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(e)
  }),
  updateToolGroup: (e, t) => et(`/dashboard/tool-groups/${encodeURIComponent(e)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(t)
  }),
  deleteToolGroup: (e) => et(`/dashboard/tool-groups/${encodeURIComponent(e)}`, {
    method: "DELETE"
  }),
  createPromptGroup: (e) => et("/dashboard/prompt-groups", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(e)
  }),
  updatePromptGroup: (e, t) => et(`/dashboard/prompt-groups/${encodeURIComponent(e)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(t)
  }),
  deletePromptGroup: (e) => et(`/dashboard/prompt-groups/${encodeURIComponent(e)}`, {
    method: "DELETE"
  }),
  deleteServer: (e) => et(`/dashboard/servers/${encodeURIComponent(e)}`, {
    method: "DELETE"
  }),
  setServerEnabled: (e, t) => et(`/dashboard/servers/${encodeURIComponent(e)}/enabled`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ enabled: t })
  }),
  setToolEnabled: (e, t) => et(`/dashboard/tools/${encodeURIComponent(e)}/enabled`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ enabled: t })
  }),
  setPromptEnabled: (e, t) => et(`/dashboard/prompts/${encodeURIComponent(e)}/enabled`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ enabled: t })
  }),
  agentApps: () => et("/dashboard/agent-apps"),
  createAgentApp: (e) => et("/dashboard/agent-apps", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(e)
  }),
  patchAgentApp: (e, t) => et(`/dashboard/agent-apps/${e}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(t)
  }),
  deleteAgentApp: (e) => et(`/dashboard/agent-apps/${e}`, {
    method: "DELETE"
  }),
  rotateAgentAppSecret: (e) => et(`/dashboard/agent-apps/${e}/rotate-secret`, {
    method: "POST"
  })
}, O1 = /* @__PURE__ */ new Set([
  "home",
  "servers",
  "tools",
  "tool_groups",
  "prompt_groups",
  "agent_apps",
  "prompts",
  "resources",
  "diagnostics"
]);
function pt(e) {
  return `#/${e}`;
}
function Cr(e, t) {
  if (t >= e.length)
    return null;
  const n = e.slice(t).join("/");
  try {
    const r = decodeURIComponent(n);
    return r.length > 0 ? r : null;
  } catch {
    return null;
  }
}
function _n() {
  let e = window.location.hash.replace(/^#/, "");
  e.startsWith("/") && (e = e.slice(1));
  const t = e.split("/").map((p) => p.trim()).filter((p) => p.length > 0);
  if (t.length === 0 || !O1.has(t[0]))
    return {
      section: null,
      agentAppId: null,
      serverName: null,
      toolGroupName: null,
      promptGroupName: null,
      toolCanonicalName: null,
      promptCanonicalName: null
    };
  const n = t[0];
  let r = null;
  if (n === "agent_apps" && t.length >= 2) {
    const p = Number.parseInt(t[1], 10);
    Number.isFinite(p) && p > 0 && (r = p);
  }
  const i = n === "servers" ? Cr(t, 1) : null, s = n === "tool_groups" ? Cr(t, 1) : null, a = n === "prompt_groups" ? Cr(t, 1) : null, c = n === "tools" ? Cr(t, 1) : null, u = n === "prompts" ? Cr(t, 1) : null;
  return {
    section: n,
    agentAppId: n === "agent_apps" ? r : null,
    serverName: n === "servers" ? i : null,
    toolGroupName: n === "tool_groups" ? s : null,
    promptGroupName: n === "prompt_groups" ? a : null,
    toolCanonicalName: n === "tools" ? c : null,
    promptCanonicalName: n === "prompts" ? u : null
  };
}
function Md() {
  return _n().section;
}
function ca(e) {
  return `#/agent_apps/${e}`;
}
function _d(e) {
  return `#/servers/${encodeURIComponent(e)}`;
}
function Ti(e) {
  return `#/tool_groups/${encodeURIComponent(e)}`;
}
function Ei(e) {
  return `#/prompt_groups/${encodeURIComponent(e)}`;
}
function Dd(e) {
  return `#/tools/${encodeURIComponent(e)}`;
}
function Ld(e) {
  return `#/prompts/${encodeURIComponent(e)}`;
}
function tt(e) {
  Zt() && window.location.hash !== e && (window.location.hash = e);
}
function vn(e, t, n) {
  Zt() && window.history.replaceState(null, "", `${e}${t}${n}`);
}
const R1 = at(/* @__PURE__ */ l("path", {
  d: "M9 16.17 5.53 12.7a.996.996 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41a.996.996 0 0 0-1.41 0z"
}), "CheckRounded"), N1 = at(/* @__PURE__ */ l("path", {
  d: "M15 20H5V7c0-.55-.45-1-1-1s-1 .45-1 1v13c0 1.1.9 2 2 2h10c.55 0 1-.45 1-1s-.45-1-1-1m5-4V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2m-2 0H9V4h9z"
}), "ContentCopyRounded");
function mt({
  value: e,
  ariaLabel: t = "Copy",
  title: n
}) {
  const [r, i] = ve(!1);
  async function s() {
    try {
      await navigator.clipboard.writeText(e), i(!0), window.setTimeout(() => i(!1), 1200);
    } catch {
      i(!1);
    }
  }
  return /* @__PURE__ */ l(
    Gt,
    {
      "aria-label": r ? "Copied" : t,
      color: r ? "success" : "default",
      edge: "end",
      onClick: s,
      title: r ? "Copied" : n ?? t,
      type: "button",
      size: "small",
      children: r ? /* @__PURE__ */ l(R1, { fontSize: "small" }) : /* @__PURE__ */ l(N1, { fontSize: "small" })
    }
  );
}
const fo = '"JetBrains Mono", "SFMono-Regular", "SF Mono", ui-monospace, monospace', k1 = Ps({
  palette: {
    mode: "light",
    primary: {
      main: "#0969da",
      dark: "#0550ae",
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#57606a"
    },
    error: {
      main: "#cf222e"
    },
    background: {
      default: "#f6f8fa",
      paper: "#ffffff"
    },
    text: {
      primary: "#1f2328",
      secondary: "#57606a"
    }
  },
  shape: {
    borderRadius: 12
  },
  typography: {
    fontFamily: '"Avenir Next", "Segoe UI", "Helvetica Neue", sans-serif',
    button: {
      textTransform: "none",
      fontWeight: 600
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f6f8fa"
        },
        code: {
          fontFamily: fo
        },
        "button, input, textarea, select": {
          font: "inherit"
        }
      }
    }
  }
});
function Po({ emptyState: e }) {
  return /* @__PURE__ */ l(dt, { elevation: 0, variant: "outlined", sx: { borderRadius: 2, bgcolor: "#f6f8fa", p: 2 }, children: /* @__PURE__ */ T(ae, { spacing: 2, children: [
    /* @__PURE__ */ T(Ne, { children: [
      /* @__PURE__ */ l(K, { variant: "caption", sx: { letterSpacing: "0.12em", fontWeight: 600 }, children: "Empty state" }),
      /* @__PURE__ */ l(K, { variant: "h6", component: "h3", sx: { mt: 1, mb: 0 }, children: e.title }),
      /* @__PURE__ */ l(K, { color: "text.secondary", sx: { mt: 1 }, children: e.description })
    ] }),
    e.commands && e.commands.length > 0 ? /* @__PURE__ */ l(ae, { spacing: 1, children: e.commands.map((t) => /* @__PURE__ */ T(
      dt,
      {
        variant: "outlined",
        sx: { px: 1.25, py: 0.75, bgcolor: "#fff", display: "flex", alignItems: "center", gap: 1 },
        children: [
          /* @__PURE__ */ l(
            K,
            {
              component: "code",
              variant: "body2",
              sx: {
                flex: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontFamily: fo
              },
              children: t
            }
          ),
          /* @__PURE__ */ l(mt, { ariaLabel: "Copy command", title: "Copy command", value: t })
        ]
      },
      t
    )) }) : null
  ] }) });
}
const P1 = at(/* @__PURE__ */ l("path", {
  d: "M21 6.5c-1.66 0-3 1.34-3 3 0 .07 0 .14.01.21l-2.03.68c-.64-1.21-1.82-2.09-3.22-2.32V5.91C14.04 5.57 15 4.4 15 3c0-1.66-1.34-3-3-3S9 1.34 9 3c0 1.4.96 2.57 2.25 2.91v2.16c-1.4.23-2.58 1.11-3.22 2.32l-2.04-.68C6 9.64 6 9.57 6 9.5c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3c1.06 0 1.98-.55 2.52-1.37l2.03.68c-.2 1.29.17 2.66 1.09 3.69l-1.41 1.77Q6.66 17 6 17c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3c0-.68-.22-1.3-.6-1.8l1.41-1.77c1.36.76 3.02.75 4.37 0l1.41 1.77c-.37.5-.59 1.12-.59 1.8 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3c-.44 0-.85.09-1.23.26l-1.41-1.77c.93-1.04 1.29-2.4 1.09-3.69l2.03-.68c.53.82 1.46 1.37 2.52 1.37 1.66 0 3-1.34 3-3S22.66 6.5 21 6.5m-18 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1M6 21c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m5-18c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1m1 12c-1.38 0-2.5-1.12-2.5-2.5S10.62 10 12 10s2.5 1.12 2.5 2.5S13.38 15 12 15m6 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1m3-8.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1"
}), "HubOutlined"), sf = at(/* @__PURE__ */ l("path", {
  d: "M19 15v4H5v-4zm1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1M7 18.5c-.82 0-1.5-.67-1.5-1.5s.68-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5M19 5v4H5V5zm1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1M7 8.5c-.82 0-1.5-.67-1.5-1.5S6.18 5.5 7 5.5s1.5.68 1.5 1.5S7.83 8.5 7 8.5"
}), "DnsOutlined"), af = at([/* @__PURE__ */ l("path", {
  d: "m21.67 18.17-5.3-5.3h-.99l-2.54 2.54v.99l5.3 5.3c.39.39 1.02.39 1.41 0l2.12-2.12c.39-.38.39-1.02 0-1.41m-2.83 1.42-4.24-4.24.71-.71 4.24 4.24z"
}, "0"), /* @__PURE__ */ l("path", {
  d: "m17.34 10.19 1.41-1.41 2.12 2.12c1.17-1.17 1.17-3.07 0-4.24l-3.54-3.54-1.41 1.41V1.71l-.7-.71-3.54 3.54.71.71h2.83l-1.41 1.41 1.06 1.06-2.89 2.89-4.13-4.13V5.06L4.83 2.04 2 4.87 5.03 7.9h1.41l4.13 4.13-.85.85H7.6l-5.3 5.3c-.39.39-.39 1.02 0 1.41l2.12 2.12c.39.39 1.02.39 1.41 0l5.3-5.3v-2.12l5.15-5.15zm-7.98 5.15-4.24 4.24-.71-.71 4.24-4.24z"
}, "1")], "HandymanOutlined"), lf = at(/* @__PURE__ */ l("path", {
  d: "m11.99 18.54-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27zm0-11.47L17.74 9 12 13.47 6.26 9z"
}), "LayersOutlined"), cf = at(/* @__PURE__ */ l("path", {
  d: "M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7zm12-4h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04-.39.08-.74.28-1.01.55-.18.18-.33.4-.43.64-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75M19 19H5V5h14z"
}), "AssignmentOutlined"), df = at(/* @__PURE__ */ l("path", {
  d: "M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z"
}), "DescriptionOutlined"), I1 = at(/* @__PURE__ */ l("path", {
  d: "M12 2 4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5zm6 9.09c0 4-2.55 7.7-6 8.83-3.45-1.13-6-4.82-6-8.83v-4.7l6-2.25 6 2.25z"
}), "ShieldOutlined"), $1 = at([/* @__PURE__ */ l("path", {
  d: "m20.38 8.57-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44z"
}, "0"), /* @__PURE__ */ l("path", {
  d: "M10.59 15.41a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83"
}, "1")], "SpeedOutlined"), uf = at(/* @__PURE__ */ l("path", {
  d: "M4 8h4V4H4zm6 12h4v-4h-4zm-6 0h4v-4H4zm0-6h4v-4H4zm6 0h4v-4h-4zm6-10v4h4V4zm-6 4h4V4h-4zm6 6h4v-4h-4zm0 6h4v-4h-4z"
}), "AppsOutlined");
function A1(e) {
  return be("MuiCard", e);
}
xe("MuiCard", ["root"]);
const M1 = (e) => {
  const {
    classes: t
  } = e;
  return Ce({
    root: ["root"]
  }, A1, t);
}, _1 = ee(dt, {
  name: "MuiCard",
  slot: "Root"
})({
  overflow: "hidden"
}), pf = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiCard"
  }), {
    className: i,
    raised: s = !1,
    ...a
  } = r, c = {
    ...r,
    raised: s
  }, u = M1(c);
  return /* @__PURE__ */ l(_1, {
    className: le(u.root, i),
    elevation: s ? 8 : void 0,
    ref: n,
    ownerState: c,
    ...a
  });
});
process.env.NODE_ENV !== "production" && (pf.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: o.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * If `true`, the card will use raised styling.
   * @default false
   */
  raised: kn(o.bool, (e) => e.raised && e.variant === "outlined" ? new Error('MUI: Combining `raised={true}` with `variant="outlined"` has no effect.') : null),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object])
});
function D1(e) {
  return be("MuiCardContent", e);
}
xe("MuiCardContent", ["root"]);
const L1 = (e) => {
  const {
    classes: t
  } = e;
  return Ce({
    root: ["root"]
  }, D1, t);
}, F1 = ee("div", {
  name: "MuiCardContent",
  slot: "Root"
})({
  padding: 16,
  "&:last-child": {
    paddingBottom: 24
  }
}), ff = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiCardContent"
  }), {
    className: i,
    component: s = "div",
    ...a
  } = r, c = {
    ...r,
    component: s
  }, u = L1(c);
  return /* @__PURE__ */ l(F1, {
    as: s,
    className: le(u.root, i),
    ownerState: c,
    ref: n,
    ...a
  });
});
process.env.NODE_ENV !== "production" && (ff.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: o.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: o.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object])
});
const j1 = at(/* @__PURE__ */ l("path", {
  d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
}), "Cancel");
function B1(e) {
  return be("MuiChip", e);
}
const qe = xe("MuiChip", ["root", "sizeSmall", "sizeMedium", "colorDefault", "colorError", "colorInfo", "colorPrimary", "colorSecondary", "colorSuccess", "colorWarning", "disabled", "clickable", "deletable", "outlined", "filled", "avatar", "icon", "label", "deleteIcon", "focusVisible"]), W1 = (e) => {
  const {
    classes: t,
    disabled: n,
    size: r,
    color: i,
    onDelete: s,
    clickable: a,
    variant: c
  } = e, u = {
    root: ["root", c, n && "disabled", `size${ye(r)}`, `color${ye(i)}`, a && "clickable", s && "deletable"],
    label: ["label"],
    avatar: ["avatar"],
    icon: ["icon"],
    deleteIcon: ["deleteIcon"]
  };
  return Ce(u, B1, t);
}, z1 = ee("div", {
  name: "MuiChip",
  slot: "Root",
  shouldForwardProp: (e) => zt(e) && e !== "focusableWhenDisabled" && e !== "skipFocusWhenDisabled",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e, {
      color: r,
      clickable: i,
      onDelete: s,
      size: a,
      variant: c
    } = n;
    return [{
      [`& .${qe.avatar}`]: t.avatar
    }, {
      [`& .${qe.icon}`]: t.icon
    }, {
      [`& .${qe.deleteIcon}`]: t.deleteIcon
    }, t.root, t[`size${ye(a)}`], t[`color${ye(r)}`], i && t.clickable, s && t.deletable, t[c]];
  }
})(ke(({
  theme: e
}) => {
  const t = e.palette.mode === "light" ? e.palette.grey[700] : e.palette.grey[300];
  return {
    maxWidth: "100%",
    fontFamily: e.typography.fontFamily,
    fontSize: e.typography.pxToRem(13),
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 32,
    lineHeight: 1.5,
    color: (e.vars || e).palette.text.primary,
    backgroundColor: (e.vars || e).palette.action.selected,
    borderRadius: 32 / 2,
    whiteSpace: "nowrap",
    transition: e.transitions.create(["background-color", "box-shadow"]),
    // reset cursor explicitly in case ButtonBase is used
    cursor: "unset",
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
    textDecoration: "none",
    border: 0,
    // Remove `button` border
    padding: 0,
    // Remove `button` padding
    verticalAlign: "middle",
    boxSizing: "border-box",
    [`&.${qe.disabled}`]: {
      opacity: (e.vars || e).palette.action.disabledOpacity,
      pointerEvents: "none"
    },
    [`& .${qe.avatar}`]: {
      marginLeft: 5,
      marginRight: -6,
      width: 24,
      height: 24,
      color: e.vars ? e.vars.palette.Chip.defaultAvatarColor : t,
      fontSize: e.typography.pxToRem(12)
    },
    [`& .${qe.icon}`]: {
      marginLeft: 5,
      marginRight: -6
    },
    [`& .${qe.deleteIcon}`]: {
      WebkitTapHighlightColor: "transparent",
      color: e.alpha((e.vars || e).palette.text.primary, 0.26),
      fontSize: 22,
      cursor: "pointer",
      margin: "0 5px 0 -6px",
      "&:hover": {
        color: e.alpha((e.vars || e).palette.text.primary, 0.4)
      }
    },
    variants: [{
      props: {
        color: "primary"
      },
      style: {
        [`& .${qe.avatar}`]: {
          color: (e.vars || e).palette.primary.contrastText,
          backgroundColor: (e.vars || e).palette.primary.dark
        }
      }
    }, {
      props: {
        color: "secondary"
      },
      style: {
        [`& .${qe.avatar}`]: {
          color: (e.vars || e).palette.secondary.contrastText,
          backgroundColor: (e.vars || e).palette.secondary.dark
        }
      }
    }, {
      props: {
        size: "small"
      },
      style: {
        height: 24,
        [`& .${qe.avatar}`]: {
          marginLeft: 4,
          marginRight: -4,
          width: 18,
          height: 18,
          fontSize: e.typography.pxToRem(10)
        },
        [`& .${qe.icon}`]: {
          fontSize: 18,
          marginLeft: 4,
          marginRight: -4
        },
        [`& .${qe.deleteIcon}`]: {
          fontSize: 16,
          marginRight: 4,
          marginLeft: -4
        }
      }
    }, ...Object.entries(e.palette).filter(_t(["contrastText"])).map(([n]) => ({
      props: {
        color: n
      },
      style: {
        backgroundColor: (e.vars || e).palette[n].main,
        color: (e.vars || e).palette[n].contrastText,
        [`& .${qe.deleteIcon}`]: {
          color: e.alpha((e.vars || e).palette[n].contrastText, 0.7),
          "&:hover, &:active": {
            color: (e.vars || e).palette[n].contrastText
          }
        }
      }
    })), {
      props: (n) => n.iconColor === n.color,
      style: {
        [`& .${qe.icon}`]: {
          color: e.vars ? e.vars.palette.Chip.defaultIconColor : t
        }
      }
    }, {
      props: (n) => n.iconColor === n.color && n.color !== "default",
      style: {
        [`& .${qe.icon}`]: {
          color: "inherit"
        }
      }
    }, {
      props: {
        onDelete: !0
      },
      style: {
        [`&.${qe.focusVisible}`]: {
          backgroundColor: e.alpha((e.vars || e).palette.action.selected, `${(e.vars || e).palette.action.selectedOpacity} + ${(e.vars || e).palette.action.focusOpacity}`)
        }
      }
    }, ...Object.entries(e.palette).filter(_t(["dark"])).map(([n]) => ({
      props: {
        color: n,
        onDelete: !0
      },
      style: {
        [`&.${qe.focusVisible}`]: {
          background: (e.vars || e).palette[n].dark
        }
      }
    })), {
      props: {
        clickable: !0
      },
      style: {
        userSelect: "none",
        WebkitTapHighlightColor: "transparent",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: e.alpha((e.vars || e).palette.action.selected, `${(e.vars || e).palette.action.selectedOpacity} + ${(e.vars || e).palette.action.hoverOpacity}`)
        },
        [`&.${qe.focusVisible}`]: {
          backgroundColor: e.alpha((e.vars || e).palette.action.selected, `${(e.vars || e).palette.action.selectedOpacity} + ${(e.vars || e).palette.action.focusOpacity}`)
        },
        "&:active": {
          boxShadow: (e.vars || e).shadows[1]
        }
      }
    }, ...Object.entries(e.palette).filter(_t(["dark"])).map(([n]) => ({
      props: {
        color: n,
        clickable: !0
      },
      style: {
        [`&:hover, &.${qe.focusVisible}`]: {
          backgroundColor: (e.vars || e).palette[n].dark
        }
      }
    })), {
      props: {
        variant: "outlined"
      },
      style: {
        backgroundColor: "transparent",
        border: e.vars ? `1px solid ${e.vars.palette.Chip.defaultBorder}` : `1px solid ${e.palette.mode === "light" ? e.palette.grey[400] : e.palette.grey[700]}`,
        [`&.${qe.clickable}:hover`]: {
          backgroundColor: (e.vars || e).palette.action.hover
        },
        [`&.${qe.focusVisible}`]: {
          backgroundColor: (e.vars || e).palette.action.focus
        },
        [`& .${qe.avatar}`]: {
          marginLeft: 4
        },
        [`& .${qe.icon}`]: {
          marginLeft: 4
        },
        [`& .${qe.deleteIcon}`]: {
          marginRight: 5
        }
      }
    }, {
      props: {
        size: "small",
        variant: "outlined"
      },
      style: {
        [`& .${qe.avatar}`]: {
          marginLeft: 2
        },
        [`& .${qe.icon}`]: {
          marginLeft: 2
        },
        [`& .${qe.deleteIcon}`]: {
          marginRight: 3
        }
      }
    }, ...Object.entries(e.palette).filter(_t()).map(([n]) => ({
      props: {
        variant: "outlined",
        color: n
      },
      style: {
        color: (e.vars || e).palette[n].main,
        border: `1px solid ${e.alpha((e.vars || e).palette[n].main, 0.7)}`,
        [`&.${qe.clickable}:hover`]: {
          backgroundColor: e.alpha((e.vars || e).palette[n].main, (e.vars || e).palette.action.hoverOpacity)
        },
        [`&.${qe.focusVisible}`]: {
          backgroundColor: e.alpha((e.vars || e).palette[n].main, (e.vars || e).palette.action.focusOpacity)
        },
        [`& .${qe.deleteIcon}`]: {
          color: e.alpha((e.vars || e).palette[n].main, 0.7),
          "&:hover, &:active": {
            color: (e.vars || e).palette[n].main
          }
        }
      }
    }))]
  };
})), V1 = ee("span", {
  name: "MuiChip",
  slot: "Label"
})({
  overflow: "hidden",
  textOverflow: "ellipsis",
  paddingLeft: 12,
  paddingRight: 12,
  whiteSpace: "nowrap",
  variants: [{
    props: {
      variant: "outlined"
    },
    style: {
      paddingLeft: 11,
      paddingRight: 11
    }
  }, {
    props: {
      size: "small"
    },
    style: {
      paddingLeft: 8,
      paddingRight: 8
    }
  }, {
    props: {
      size: "small",
      variant: "outlined"
    },
    style: {
      paddingLeft: 7,
      paddingRight: 7
    }
  }]
});
function Fd(e) {
  return e.key === "Backspace" || e.key === "Delete";
}
const Gr = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiChip"
  }), {
    avatar: i,
    className: s,
    clickable: a,
    color: c = "default",
    component: u,
    deleteIcon: p,
    disabled: f = !1,
    icon: g,
    label: b,
    onClick: m,
    onDelete: x,
    onKeyDown: h,
    onKeyUp: S,
    size: R = "medium",
    variant: k = "filled",
    tabIndex: E,
    skipFocusWhenDisabled: w = !1,
    // TODO v6: Rename to `focusableWhenDisabled`.
    slots: C = {},
    slotProps: N = {},
    ...M
  } = r, {
    nativeButton: D,
    ...L
  } = M, B = v.useRef(null), I = ft(B, n), y = (U) => {
    U.stopPropagation(), x(U);
  }, $ = (U) => {
    U.currentTarget === U.target && Fd(U) && U.preventDefault(), h && h(U);
  }, P = (U) => {
    U.currentTarget === U.target && x && Fd(U) && x(U), S && S(U);
  }, A = a !== !1 && m ? !0 : a, F = A || x ? Zn : u || "div", W = {
    ...r,
    component: F,
    disabled: f,
    size: R,
    color: c,
    iconColor: /* @__PURE__ */ v.isValidElement(g) && g.props.color || c,
    onDelete: !!x,
    clickable: A,
    variant: k
  }, H = W1(W), te = F === Zn ? {
    component: u || "div",
    internalNativeButton: !1,
    focusVisibleClassName: H.focusVisible,
    ...x && {
      disableRipple: !0
    },
    ...D !== void 0 && {
      nativeButton: D
    }
  } : {};
  let z = null;
  x && (z = p && /* @__PURE__ */ v.isValidElement(p) ? /* @__PURE__ */ v.cloneElement(p, {
    className: le(p.props.className, H.deleteIcon),
    onClick: y
  }) : /* @__PURE__ */ l(j1, {
    className: H.deleteIcon,
    onClick: y
  }));
  let V = null;
  i && /* @__PURE__ */ v.isValidElement(i) && (V = /* @__PURE__ */ v.cloneElement(i, {
    className: le(H.avatar, i.props.className)
  }));
  let X = null;
  g && /* @__PURE__ */ v.isValidElement(g) && (X = /* @__PURE__ */ v.cloneElement(g, {
    className: le(H.icon, g.props.className)
  })), process.env.NODE_ENV !== "production" && V && X && console.error("MUI: The Chip component can not handle the avatar and the icon prop at the same time. Pick one.");
  const re = {
    slots: C,
    slotProps: N
  }, [oe, ne] = ge("root", {
    elementType: z1,
    externalForwardedProps: {
      ...re,
      ...L
    },
    ownerState: W,
    // The `component` prop is preserved because `Chip` relies on it for internal logic. If `shouldForwardComponentProp` were `false`, `useSlot` would remove the `component` prop, potentially breaking the component's behavior.
    shouldForwardComponentProp: !0,
    ref: I,
    className: le(H.root, s),
    additionalProps: {
      disabled: A && f ? !0 : void 0,
      tabIndex: w && f ? -1 : E,
      ...te
    },
    getSlotProps: (U) => ({
      ...U,
      onClick: (J) => {
        var q;
        (q = U.onClick) == null || q.call(U, J), m == null || m(J);
      },
      onKeyDown: (J) => {
        var q;
        (q = U.onKeyDown) == null || q.call(U, J), $(J);
      },
      onKeyUp: (J) => {
        var q;
        (q = U.onKeyUp) == null || q.call(U, J), P(J);
      }
    })
  }), [Q, Z] = ge("label", {
    elementType: V1,
    externalForwardedProps: re,
    ownerState: W,
    className: H.label
  });
  return /* @__PURE__ */ T(oe, {
    as: F,
    ...ne,
    children: [V || X, /* @__PURE__ */ l(Q, {
      ...Z,
      children: b
    }), z]
  });
});
process.env.NODE_ENV !== "production" && (Gr.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The Avatar element to display.
   */
  avatar: o.element,
  /**
   * This prop isn't supported.
   * Use the `component` prop if you need to change the children structure.
   */
  children: Ob,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * If `true`, the chip will appear clickable, and will raise when pressed,
   * even if the onClick prop is not defined.
   * If `false`, the chip will not appear clickable, even if onClick prop is defined.
   * This can be used, for example,
   * along with the component prop to indicate an anchor Chip is clickable.
   * Note: this controls the UI and does not affect the onClick event.
   */
  clickable: o.bool,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'default'
   */
  color: o.oneOfType([o.oneOf(["default", "primary", "secondary", "error", "info", "success", "warning"]), o.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: o.elementType,
  /**
   * Override the default delete icon element. Shown only if `onDelete` is set.
   */
  deleteIcon: o.element,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: o.bool,
  /**
   * Icon element.
   */
  icon: o.element,
  /**
   * The content of the component.
   */
  label: o.node,
  /**
   * If `true`, the component is expected to resolve to a native `<button>` element.
   * When omitted, custom components inherit the default button semantics of the current wrapper.
   * Set to `true` when a custom component resolves to a native `<button>`, or `false`
   * when it resolves to a non-button host.
   */
  nativeButton: o.bool,
  /**
   * @ignore
   */
  onClick: o.func,
  /**
   * Callback fired when the delete icon is clicked.
   * If set, the delete icon will be shown.
   */
  onDelete: o.func,
  /**
   * @ignore
   */
  onKeyDown: o.func,
  /**
   * @ignore
   */
  onKeyUp: o.func,
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: o.oneOfType([o.oneOf(["medium", "small"]), o.string]),
  /**
   * If `true`, allows the disabled chip to escape focus.
   * If `false`, allows the disabled chip to receive focus.
   * @default false
   */
  skipFocusWhenDisabled: o.bool,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: o.shape({
    label: o.oneOfType([o.func, o.object]),
    root: o.oneOfType([o.func, o.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: o.shape({
    label: o.elementType,
    root: o.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object]),
  /**
   * @ignore
   */
  tabIndex: o.number,
  /**
   * The variant to use.
   * @default 'filled'
   */
  variant: o.oneOfType([o.oneOf(["filled", "outlined"]), o.string])
});
const Ba = gy({
  createStyledComponent: ee("div", {
    name: "MuiContainer",
    slot: "Root",
    overridesResolver: (e, t) => {
      const {
        ownerState: n
      } = e;
      return [t.root, t[`maxWidth${ye(String(n.maxWidth))}`], n.fixed && t.fixed, n.disableGutters && t.disableGutters];
    }
  }),
  useThemeProps: (e) => we({
    props: e,
    name: "MuiContainer"
  })
});
process.env.NODE_ENV !== "production" && (Ba.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: o.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: o.elementType,
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: o.bool,
  /**
   * Set the max-width to match the min-width of the current breakpoint.
   * This is useful if you'd prefer to design for a fixed set of sizes
   * instead of trying to accommodate a fully fluid viewport.
   * It's fluid by default.
   * @default false
   */
  fixed: o.bool,
  /**
   * Determine the max-width of the container.
   * The container width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   * @default 'lg'
   */
  maxWidth: o.oneOfType([o.oneOf(["xs", "sm", "md", "lg", "xl", !1]), o.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object])
});
const U1 = [
  {
    icon: P1,
    title: "One MCP endpoint",
    body: "Point Claude, Cursor, Copilot, Codex, or your own agents at a single streamable HTTP `/mcp` URL instead of juggling a separate config per server."
  },
  {
    icon: sf,
    title: "Central registry",
    body: "Register stdio, SSE, and streamable HTTP MCP servers once. The gateway proxies calls, tracks connection health, and keeps your inventory in one Postgres-backed catalog."
  },
  {
    icon: af,
    title: "Unified discovery",
    body: "Tools, prompts, and resources from every server appear in one dashboard. Toggle exposure per server, tool, or prompt without redeploying clients."
  },
  {
    icon: lf,
    title: "Tool & prompt groups",
    body: "Curate subsets of tools and MCP prompts for least-privilege access and dedicated group endpoints—ideal for shared team gateways and scoped automations."
  },
  {
    icon: cf,
    title: "Prompts & resources",
    body: "Expose prompt templates and MCP resources through the same proxy as tools so assistants get a consistent, namespaced surface across backends."
  },
  {
    icon: df,
    title: "Upstream OAuth flows",
    body: "Register servers that require OAuth without hand-rolling redirects—the dashboard coordinates authorization and stores tokens for repeatable access."
  },
  {
    icon: I1,
    title: "Operational hardening",
    body: "Optional OIDC sign-in for this console, path-prefix deployment behind reverse proxies, proxy auth for MCP traffic, and Redis-backed sessions when you scale replicas."
  },
  {
    icon: $1,
    title: "Observable by design",
    body: "Built-in health checks, diagnostics, and OpenTelemetry integration hooks so you can meter gateway traffic alongside the rest of your stack."
  }
];
function G1({
  overview: e,
  auth: t,
  onNavigate: n
}) {
  var r;
  return /* @__PURE__ */ T(ae, { spacing: 3, sx: { pb: 4 }, children: [
    /* @__PURE__ */ T(
      Ne,
      {
        sx: {
          position: "relative",
          borderRadius: 3,
          overflow: "hidden",
          color: "primary.contrastText",
          background: "linear-gradient(125deg, #042f60 0%, #0550ae 38%, #0969da 72%, #388bfd 100%)",
          boxShadow: "0 12px 40px rgba(5, 80, 174, 0.35)",
          minHeight: { xs: 260, md: 300 }
        },
        children: [
          /* @__PURE__ */ l(
            Ne,
            {
              "aria-hidden": !0,
              sx: {
                position: "absolute",
                inset: 0,
                opacity: 0.22,
                backgroundImage: `radial-gradient(circle at 20% 30%, rgba(255,255,255,0.9) 0, transparent 42%),
              radial-gradient(circle at 80% 70%, rgba(255,255,255,0.5) 0, transparent 38%),
              linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)`
              }
            }
          ),
          /* @__PURE__ */ l(
            Ne,
            {
              "aria-hidden": !0,
              sx: {
                position: "absolute",
                inset: 0,
                backgroundImage: `repeating-linear-gradient(
              -12deg,
              transparent,
              transparent 18px,
              rgba(255,255,255,0.04) 18px,
              rgba(255,255,255,0.04) 19px
            )`
              }
            }
          ),
          /* @__PURE__ */ T(Ba, { maxWidth: "lg", sx: { position: "relative", py: { xs: 4, md: 5 }, px: { xs: 2.5, sm: 4 } }, children: [
            /* @__PURE__ */ l(
              Ne,
              {
                sx: {
                  position: "absolute",
                  top: { xs: 12, sm: 16 },
                  right: { xs: 12, sm: 20 },
                  zIndex: 2
                },
                children: t != null && t.oidc_enabled ? t.authenticated ? /* @__PURE__ */ T(ae, { direction: { xs: "column", sm: "row" }, spacing: 1, sx: { alignItems: { sm: "center" } }, children: [
                  /* @__PURE__ */ l(
                    Gr,
                    {
                      label: (r = t.email) != null && r.trim() ? `Signed in as ${t.email.trim()}` : t.sub ? `Signed in (${t.sub})` : "Signed in",
                      sx: {
                        bgcolor: "rgba(255,255,255,0.14)",
                        color: "common.white",
                        border: "1px solid rgba(255,255,255,0.35)",
                        fontWeight: 600
                      }
                    }
                  ),
                  t.logout_path ? /* @__PURE__ */ l(
                    fe,
                    {
                      component: "a",
                      href: t.logout_path,
                      variant: "contained",
                      size: "small",
                      sx: {
                        bgcolor: "background.paper",
                        color: "primary.dark",
                        fontWeight: 700,
                        textTransform: "none",
                        "&:hover": { bgcolor: "#f0f6ff" }
                      },
                      children: "Sign out"
                    }
                  ) : null
                ] }) : t.login_path ? /* @__PURE__ */ l(
                  fe,
                  {
                    component: "a",
                    href: t.login_path,
                    variant: "contained",
                    size: "medium",
                    sx: {
                      bgcolor: "background.paper",
                      color: "primary.dark",
                      fontWeight: 700,
                      textTransform: "none",
                      "&:hover": { bgcolor: "#f0f6ff" }
                    },
                    children: "Sign in"
                  }
                ) : null : null
              }
            ),
            /* @__PURE__ */ T(ae, { spacing: 2.5, sx: { maxWidth: 720 }, children: [
              /* @__PURE__ */ l(K, { variant: "overline", sx: { letterSpacing: "0.12em", opacity: 0.92, fontWeight: 600 }, children: "Model Context Protocol" }),
              /* @__PURE__ */ l(
                K,
                {
                  component: "h1",
                  variant: "h3",
                  sx: {
                    fontWeight: 800,
                    lineHeight: 1.15,
                    fontSize: { xs: "1.85rem", sm: "2.35rem", md: "2.75rem" },
                    textShadow: "0 1px 24px rgba(0,0,0,0.2)"
                  },
                  children: "SAMI MCPHub"
                }
              ),
              /* @__PURE__ */ l(
                K,
                {
                  variant: "h6",
                  component: "p",
                  sx: {
                    fontWeight: 400,
                    opacity: 0.95,
                    lineHeight: 1.5,
                    fontSize: { xs: "1.05rem", md: "1.2rem" },
                    maxWidth: 640
                  },
                  children: "Run every MCP server behind one secure, discoverable hub. Register backends once, expose a single MCP surface to your AI clients, and govern tools with the same dashboard your team already uses for operations."
                }
              ),
              /* @__PURE__ */ T(ae, { direction: { xs: "column", sm: "row" }, spacing: 1.5, sx: { pt: 1 }, children: [
                /* @__PURE__ */ l(
                  fe,
                  {
                    variant: "contained",
                    size: "large",
                    onClick: () => n("servers"),
                    sx: {
                      bgcolor: "background.paper",
                      color: "primary.dark",
                      fontWeight: 700,
                      "&:hover": { bgcolor: "#f0f6ff" },
                      px: 3
                    },
                    children: "Manage servers"
                  }
                ),
                /* @__PURE__ */ l(
                  fe,
                  {
                    variant: "outlined",
                    size: "large",
                    onClick: () => n("tools"),
                    sx: {
                      borderColor: "rgba(255,255,255,0.72)",
                      color: "common.white",
                      fontWeight: 600,
                      "&:hover": { borderColor: "common.white", bgcolor: "rgba(255,255,255,0.12)" },
                      px: 3
                    },
                    children: "Browse tools"
                  }
                ),
                /* @__PURE__ */ l(
                  fe,
                  {
                    variant: "text",
                    size: "large",
                    onClick: () => n("tool_groups"),
                    sx: { color: "common.white", fontWeight: 600, "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } },
                    children: "Tool groups"
                  }
                ),
                /* @__PURE__ */ l(
                  fe,
                  {
                    variant: "text",
                    size: "large",
                    onClick: () => n("prompt_groups"),
                    sx: { color: "common.white", fontWeight: 600, "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } },
                    children: "Prompt groups"
                  }
                ),
                /* @__PURE__ */ l(
                  fe,
                  {
                    variant: "text",
                    size: "large",
                    startIcon: /* @__PURE__ */ l(uf, {}),
                    onClick: () => n("agent_apps"),
                    sx: { color: "common.white", fontWeight: 600, "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } },
                    children: "Agent apps"
                  }
                )
              ] })
            ] })
          ] })
        ]
      }
    ),
    e ? /* @__PURE__ */ T(
      ae,
      {
        direction: { xs: "column", sm: "row" },
        spacing: 2,
        sx: {
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: { sm: "center" },
          px: { xs: 0, sm: 0.5 }
        },
        children: [
          /* @__PURE__ */ l(K, { variant: "subtitle2", color: "text.secondary", sx: { fontWeight: 600 }, children: "Live gateway snapshot" }),
          /* @__PURE__ */ T(ae, { direction: "row", spacing: 2, sx: { flexWrap: "wrap" }, children: [
            /* @__PURE__ */ l(Oi, { label: "Servers", value: e.server_count }),
            /* @__PURE__ */ l(Oi, { label: "Tools", value: e.tool_count }),
            /* @__PURE__ */ l(Oi, { label: "Prompts", value: e.prompt_count }),
            /* @__PURE__ */ l(Oi, { label: "Resources", value: e.resource_count })
          ] })
        ]
      }
    ) : null,
    /* @__PURE__ */ T(Ba, { maxWidth: "lg", disableGutters: !0, sx: { px: { xs: 0, sm: 0 } }, children: [
      /* @__PURE__ */ l(K, { variant: "h5", component: "h2", sx: { fontWeight: 700, mb: 1 }, children: "Why use SAMI MCPHub?" }),
      /* @__PURE__ */ l(K, { color: "text.secondary", sx: { mb: 3, maxWidth: 800, lineHeight: 1.6 }, children: "MCP connects assistants to your systems, but every new server usually means another client config, another set of credentials, and another place to look for tools. A gateway collapses that sprawl: one registration pipeline, one discovery index, and one place to apply policy—whether you are solo on a laptop or running shared infrastructure for a team." }),
      /* @__PURE__ */ l(
        Ne,
        {
          sx: {
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
            gap: 2
          },
          children: U1.map(({ icon: i, title: s, body: a }) => /* @__PURE__ */ l(
            pf,
            {
              variant: "outlined",
              sx: {
                height: "100%",
                borderRadius: 2,
                transition: "box-shadow 0.2s ease, border-color 0.2s ease",
                "&:hover": {
                  boxShadow: 2,
                  borderColor: "primary.light"
                }
              },
              children: /* @__PURE__ */ l(ff, { sx: { p: 2.25 }, children: /* @__PURE__ */ T(ae, { spacing: 1.25, children: [
                /* @__PURE__ */ l(i, { color: "primary", sx: { fontSize: 32 } }),
                /* @__PURE__ */ l(K, { variant: "subtitle1", component: "h3", sx: { fontWeight: 700 }, children: s }),
                /* @__PURE__ */ l(K, { variant: "body2", color: "text.secondary", sx: { lineHeight: 1.55 }, children: a })
              ] }) })
            },
            s
          ))
        }
      )
    ] })
  ] });
}
function Oi({ label: e, value: t }) {
  return /* @__PURE__ */ T(
    Ne,
    {
      sx: {
        display: "flex",
        flexDirection: "row",
        alignItems: "baseline",
        gap: 1,
        bgcolor: "background.paper",
        border: 1,
        borderColor: "divider",
        borderRadius: "14px",
        px: 1.75,
        py: 0.75
      },
      children: [
        /* @__PURE__ */ l(K, { variant: "caption", color: "text.secondary", sx: { fontWeight: 600 }, children: e }),
        /* @__PURE__ */ l(K, { variant: "subtitle1", sx: { fontWeight: 800 }, children: t })
      ]
    }
  );
}
const H1 = at(/* @__PURE__ */ l("path", {
  d: "M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"
}), "ChevronLeft"), q1 = at(/* @__PURE__ */ l("path", {
  d: "M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
}), "ChevronRight"), K1 = at(/* @__PURE__ */ l("path", {
  d: "M14.17 5 19 9.83V19H5V5zm0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9.83c0-.53-.21-1.04-.59-1.41l-4.83-4.83c-.37-.38-.88-.59-1.41-.59M7 15h10v2H7zm0-4h10v2H7zm0-4h7v2H7z"
}), "TextSnippetOutlined"), Y1 = at(/* @__PURE__ */ l("path", {
  d: "m12 5.69 5 4.5V18h-2v-6H9v6H7v-7.81zM12 3 2 12h3v8h6v-6h2v6h6v-8h3z"
}), "HomeOutlined"), X1 = at(/* @__PURE__ */ l("path", {
  d: "M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8"
}), "InfoOutlined"), jd = at(/* @__PURE__ */ l("path", {
  d: "m17 8-1.41 1.41L17.17 11H9v2h8.17l-1.58 1.58L17 16l4-4zM5 5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h7v-2H5z"
}), "LogoutOutlined");
function J1(e) {
  return be("MuiListItem", e);
}
xe("MuiListItem", ["root", "dense", "alignItemsFlexStart", "divider", "gutters", "padding", "secondaryAction"]);
function Q1(e) {
  return be("MuiListItemButton", e);
}
const Do = xe("MuiListItemButton", ["root", "focusVisible", "dense", "alignItemsFlexStart", "disabled", "divider", "gutters", "selected"]), Z1 = (e, t) => {
  const {
    ownerState: n
  } = e;
  return [t.root, n.dense && t.dense, n.alignItems === "flex-start" && t.alignItemsFlexStart, n.divider && t.divider, !n.disableGutters && t.gutters];
}, eC = (e) => {
  const {
    alignItems: t,
    classes: n,
    dense: r,
    disabled: i,
    disableGutters: s,
    divider: a,
    selected: c
  } = e, p = Ce({
    root: ["root", r && "dense", !s && "gutters", a && "divider", i && "disabled", t === "flex-start" && "alignItemsFlexStart", c && "selected"]
  }, Q1, n);
  return {
    ...n,
    ...p
  };
}, tC = ee(Zn, {
  shouldForwardProp: (e) => zt(e) || e === "classes",
  name: "MuiListItemButton",
  slot: "Root",
  overridesResolver: Z1
})(ke(({
  theme: e
}) => ({
  display: "flex",
  flexGrow: 1,
  justifyContent: "flex-start",
  alignItems: "center",
  position: "relative",
  textDecoration: "none",
  minWidth: 0,
  boxSizing: "border-box",
  textAlign: "left",
  paddingTop: 8,
  paddingBottom: 8,
  transition: e.transitions.create("background-color", {
    duration: e.transitions.duration.shortest
  }),
  "&:hover": {
    textDecoration: "none",
    backgroundColor: (e.vars || e).palette.action.hover,
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  },
  [`&.${Do.selected}`]: {
    backgroundColor: e.alpha((e.vars || e).palette.primary.main, (e.vars || e).palette.action.selectedOpacity),
    [`&.${Do.focusVisible}`]: {
      backgroundColor: e.alpha((e.vars || e).palette.primary.main, `${(e.vars || e).palette.action.selectedOpacity} + ${(e.vars || e).palette.action.focusOpacity}`)
    }
  },
  [`&.${Do.selected}:hover`]: {
    backgroundColor: e.alpha((e.vars || e).palette.primary.main, `${(e.vars || e).palette.action.selectedOpacity} + ${(e.vars || e).palette.action.hoverOpacity}`),
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      backgroundColor: e.alpha((e.vars || e).palette.primary.main, (e.vars || e).palette.action.selectedOpacity)
    }
  },
  [`&.${Do.focusVisible}`]: {
    backgroundColor: (e.vars || e).palette.action.focus
  },
  [`&.${Do.disabled}`]: {
    opacity: (e.vars || e).palette.action.disabledOpacity
  },
  variants: [{
    props: ({
      ownerState: t
    }) => t.divider,
    style: {
      borderBottom: `1px solid ${(e.vars || e).palette.divider}`,
      backgroundClip: "padding-box"
    }
  }, {
    props: {
      alignItems: "flex-start"
    },
    style: {
      alignItems: "flex-start"
    }
  }, {
    props: ({
      ownerState: t
    }) => !t.disableGutters,
    style: {
      paddingLeft: 16,
      paddingRight: 16
    }
  }, {
    props: ({
      ownerState: t
    }) => t.dense,
    style: {
      paddingTop: 4,
      paddingBottom: 4
    }
  }]
}))), mf = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiListItemButton"
  }), {
    alignItems: i = "center",
    autoFocus: s = !1,
    component: a = "div",
    children: c,
    dense: u = !1,
    disableGutters: p = !1,
    divider: f = !1,
    focusVisibleClassName: g,
    selected: b = !1,
    className: m,
    ...x
  } = r, h = v.useContext(mn), S = v.useMemo(() => ({
    dense: u || h.dense || !1,
    alignItems: i,
    disableGutters: p
  }), [i, h.dense, u, p]), R = v.useRef(null);
  Tt(() => {
    s && (R.current ? R.current.focus() : process.env.NODE_ENV !== "production" && console.error("MUI: Unable to set focus to a ListItemButton whose component has not been rendered."));
  }, [s]);
  const k = {
    ...r,
    alignItems: i,
    dense: S.dense,
    disableGutters: p,
    divider: f,
    selected: b
  }, E = eC(k), {
    root: w,
    ...C
  } = E, N = ft(R, n);
  return /* @__PURE__ */ l(mn.Provider, {
    value: S,
    children: /* @__PURE__ */ l(tC, {
      ref: N,
      href: x.href || x.to,
      component: (x.href || x.to) && a === "div" ? "button" : a,
      internalNativeButton: !1,
      focusVisibleClassName: le(E.focusVisible, g),
      ownerState: k,
      className: le(E.root, m),
      ...x,
      classes: C,
      children: c
    })
  });
});
process.env.NODE_ENV !== "production" && (mf.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Defines the `align-items` style property.
   * @default 'center'
   */
  alignItems: o.oneOf(["center", "flex-start"]),
  /**
   * If `true`, the list item is focused during the first mount.
   * Focus will also be triggered if the value changes from false to true.
   * @default false
   */
  autoFocus: o.bool,
  /**
   * The content of the component.
   */
  children: o.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: o.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * The prop defaults to the value inherited from the parent List component.
   * @default false
   */
  dense: o.bool,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: o.bool,
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: o.bool,
  /**
   * If `true`, a 1px light border is added to the bottom of the list item.
   * @default false
   */
  divider: o.bool,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: o.string,
  /**
   * @ignore
   */
  href: o.string,
  /**
   * Use to apply selected styling.
   * @default false
   */
  selected: o.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object])
});
function nC(e) {
  return be("MuiListItemSecondaryAction", e);
}
xe("MuiListItemSecondaryAction", ["root", "disableGutters"]);
const oC = (e) => {
  const {
    disableGutters: t,
    classes: n
  } = e;
  return Ce({
    root: ["root", t && "disableGutters"]
  }, nC, n);
}, rC = ee("div", {
  name: "MuiListItemSecondaryAction",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.disableGutters && t.disableGutters];
  }
})({
  position: "absolute",
  right: 16,
  top: "50%",
  transform: "translateY(-50%)",
  variants: [{
    props: ({
      ownerState: e
    }) => e.disableGutters,
    style: {
      right: 0
    }
  }]
}), El = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiListItemSecondaryAction"
  }), {
    className: i,
    component: s,
    ...a
  } = r, c = v.useContext(mn), u = {
    ...r,
    disableGutters: c.disableGutters
  }, p = oC(u);
  return /* @__PURE__ */ l(rC, {
    as: s,
    className: le(p.root, i),
    ownerState: u,
    ref: n,
    ...a
  });
});
process.env.NODE_ENV !== "production" && (El.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component, normally an `IconButton` or selection control.
   */
  children: o.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: o.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object])
});
El.muiName = "ListItemSecondaryAction";
const iC = (e, t) => {
  const {
    ownerState: n
  } = e;
  return [t.root, n.dense && t.dense, n.alignItems === "flex-start" && t.alignItemsFlexStart, n.divider && t.divider, !n.disableGutters && t.gutters, !n.disablePadding && t.padding];
}, sC = (e) => {
  const {
    alignItems: t,
    classes: n,
    dense: r,
    disableGutters: i,
    disablePadding: s,
    divider: a
  } = e;
  return Ce({
    root: ["root", r && "dense", !i && "gutters", !s && "padding", a && "divider", t === "flex-start" && "alignItemsFlexStart"],
    secondaryAction: ["secondaryAction"]
  }, J1, n);
}, aC = ee("div", {
  name: "MuiListItem",
  slot: "Root",
  overridesResolver: iC
})(ke(({
  theme: e
}) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  position: "relative",
  textDecoration: "none",
  width: "100%",
  boxSizing: "border-box",
  textAlign: "left",
  variants: [{
    props: ({
      ownerState: t
    }) => !t.disablePadding,
    style: {
      paddingTop: 8,
      paddingBottom: 8
    }
  }, {
    props: ({
      ownerState: t
    }) => !t.disablePadding && t.dense,
    style: {
      paddingTop: 4,
      paddingBottom: 4
    }
  }, {
    props: ({
      ownerState: t
    }) => !t.disablePadding && !t.disableGutters,
    style: {
      paddingLeft: 16,
      paddingRight: 16
    }
  }, {
    props: ({
      ownerState: t
    }) => !t.disablePadding && !!t.secondaryAction,
    style: {
      // Add some space to avoid collision as `ListItemSecondaryAction`
      // is absolutely positioned.
      paddingRight: 48
    }
  }, {
    props: ({
      ownerState: t
    }) => !!t.secondaryAction,
    style: {
      [`& > .${Do.root}`]: {
        paddingRight: 48
      }
    }
  }, {
    props: {
      alignItems: "flex-start"
    },
    style: {
      alignItems: "flex-start"
    }
  }, {
    props: ({
      ownerState: t
    }) => t.divider,
    style: {
      borderBottom: `1px solid ${(e.vars || e).palette.divider}`,
      backgroundClip: "padding-box"
    }
  }, {
    props: ({
      ownerState: t
    }) => t.button,
    style: {
      transition: e.transitions.create("background-color", {
        duration: e.transitions.duration.shortest
      }),
      "&:hover": {
        textDecoration: "none",
        backgroundColor: (e.vars || e).palette.action.hover,
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: "transparent"
        }
      }
    }
  }]
}))), lC = ee(El, {
  name: "MuiListItem",
  slot: "secondaryAction"
})({}), hf = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiListItem"
  }), {
    alignItems: i = "center",
    children: s,
    className: a,
    component: c = "li",
    dense: u = !1,
    disableGutters: p = !1,
    disablePadding: f = !1,
    divider: g = !1,
    secondaryAction: b,
    slotProps: m = {},
    slots: x = {},
    ...h
  } = r, S = v.useContext(mn), R = v.useMemo(() => ({
    dense: u || S.dense || !1,
    alignItems: i,
    disableGutters: p
  }), [i, S.dense, u, p]), k = {
    ...r,
    alignItems: i,
    dense: R.dense,
    disableGutters: p,
    disablePadding: f,
    divider: g,
    secondaryAction: b
  }, E = sC(k), w = {
    slots: x,
    slotProps: m
  }, [C, N] = ge("root", {
    ref: n,
    elementType: aC,
    externalForwardedProps: {
      component: c,
      ...w,
      ...h
    },
    ownerState: k,
    className: le(E.root, a)
  }), [M, D] = ge("secondaryAction", {
    elementType: lC,
    shouldForwardComponentProp: !0,
    externalForwardedProps: w,
    ownerState: k,
    className: E.secondaryAction
  });
  return /* @__PURE__ */ l(mn.Provider, {
    value: R,
    children: /* @__PURE__ */ T(C, {
      ...N,
      children: [s, b && /* @__PURE__ */ l(M, {
        ...D,
        children: b
      })]
    })
  });
});
process.env.NODE_ENV !== "production" && (hf.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Defines the `align-items` style property.
   * @default 'center'
   */
  alignItems: o.oneOf(["center", "flex-start"]),
  /**
   * The content of the component.
   */
  children: o.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: o.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * The prop defaults to the value inherited from the parent List component.
   * @default false
   */
  dense: o.bool,
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: o.bool,
  /**
   * If `true`, all padding is removed.
   * @default false
   */
  disablePadding: o.bool,
  /**
   * If `true`, a 1px light border is added to the bottom of the list item.
   * @default false
   */
  divider: o.bool,
  /**
   * The element to display at the end of ListItem.
   */
  secondaryAction: o.node,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: o.shape({
    root: o.object,
    secondaryAction: o.oneOfType([o.func, o.object])
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: o.shape({
    root: o.elementType,
    secondaryAction: o.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object])
});
var jt = "top", rn = "bottom", sn = "right", Bt = "left", Ol = "auto", ei = [jt, rn, sn, Bt], Jo = "start", Hr = "end", cC = "clippingParents", gf = "viewport", wr = "popper", dC = "reference", Bd = /* @__PURE__ */ ei.reduce(function(e, t) {
  return e.concat([t + "-" + Jo, t + "-" + Hr]);
}, []), yf = /* @__PURE__ */ [].concat(ei, [Ol]).reduce(function(e, t) {
  return e.concat([t, t + "-" + Jo, t + "-" + Hr]);
}, []), uC = "beforeRead", pC = "read", fC = "afterRead", mC = "beforeMain", hC = "main", gC = "afterMain", yC = "beforeWrite", bC = "write", vC = "afterWrite", xC = [uC, pC, fC, mC, hC, gC, yC, bC, vC];
function Nn(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function Kt(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function vo(e) {
  var t = Kt(e).Element;
  return e instanceof t || e instanceof Element;
}
function on(e) {
  var t = Kt(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Rl(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = Kt(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function CC(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, i = t.attributes[n] || {}, s = t.elements[n];
    !on(s) || !Nn(s) || (Object.assign(s.style, r), Object.keys(i).forEach(function(a) {
      var c = i[a];
      c === !1 ? s.removeAttribute(a) : s.setAttribute(a, c === !0 ? "" : c);
    }));
  });
}
function wC(e) {
  var t = e.state, n = {
    popper: {
      position: t.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow), function() {
    Object.keys(t.elements).forEach(function(r) {
      var i = t.elements[r], s = t.attributes[r] || {}, a = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]), c = a.reduce(function(u, p) {
        return u[p] = "", u;
      }, {});
      !on(i) || !Nn(i) || (Object.assign(i.style, c), Object.keys(s).forEach(function(u) {
        i.removeAttribute(u);
      }));
    });
  };
}
const SC = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: CC,
  effect: wC,
  requires: ["computeStyles"]
};
function Rn(e) {
  return e.split("-")[0];
}
var go = Math.max, as = Math.min, Qo = Math.round;
function Wa() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function bf() {
  return !/^((?!chrome|android).)*safari/i.test(Wa());
}
function Zo(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = e.getBoundingClientRect(), i = 1, s = 1;
  t && on(e) && (i = e.offsetWidth > 0 && Qo(r.width) / e.offsetWidth || 1, s = e.offsetHeight > 0 && Qo(r.height) / e.offsetHeight || 1);
  var a = vo(e) ? Kt(e) : window, c = a.visualViewport, u = !bf() && n, p = (r.left + (u && c ? c.offsetLeft : 0)) / i, f = (r.top + (u && c ? c.offsetTop : 0)) / s, g = r.width / i, b = r.height / s;
  return {
    width: g,
    height: b,
    top: f,
    right: p + g,
    bottom: f + b,
    left: p,
    x: p,
    y: f
  };
}
function Nl(e) {
  var t = Zo(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: r
  };
}
function vf(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && Rl(n)) {
    var r = t;
    do {
      if (r && e.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function Gn(e) {
  return Kt(e).getComputedStyle(e);
}
function TC(e) {
  return ["table", "td", "th"].indexOf(Nn(e)) >= 0;
}
function to(e) {
  return ((vo(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function zs(e) {
  return Nn(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (Rl(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    to(e)
  );
}
function Wd(e) {
  return !on(e) || // https://github.com/popperjs/popper-core/issues/837
  Gn(e).position === "fixed" ? null : e.offsetParent;
}
function EC(e) {
  var t = /firefox/i.test(Wa()), n = /Trident/i.test(Wa());
  if (n && on(e)) {
    var r = Gn(e);
    if (r.position === "fixed")
      return null;
  }
  var i = zs(e);
  for (Rl(i) && (i = i.host); on(i) && ["html", "body"].indexOf(Nn(i)) < 0; ) {
    var s = Gn(i);
    if (s.transform !== "none" || s.perspective !== "none" || s.contain === "paint" || ["transform", "perspective"].indexOf(s.willChange) !== -1 || t && s.willChange === "filter" || t && s.filter && s.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function ti(e) {
  for (var t = Kt(e), n = Wd(e); n && TC(n) && Gn(n).position === "static"; )
    n = Wd(n);
  return n && (Nn(n) === "html" || Nn(n) === "body" && Gn(n).position === "static") ? t : n || EC(e) || t;
}
function kl(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function Mr(e, t, n) {
  return go(e, as(t, n));
}
function OC(e, t, n) {
  var r = Mr(e, t, n);
  return r > n ? n : r;
}
function xf() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Cf(e) {
  return Object.assign({}, xf(), e);
}
function wf(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var RC = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, Cf(typeof t != "number" ? t : wf(t, ei));
};
function NC(e) {
  var t, n = e.state, r = e.name, i = e.options, s = n.elements.arrow, a = n.modifiersData.popperOffsets, c = Rn(n.placement), u = kl(c), p = [Bt, sn].indexOf(c) >= 0, f = p ? "height" : "width";
  if (!(!s || !a)) {
    var g = RC(i.padding, n), b = Nl(s), m = u === "y" ? jt : Bt, x = u === "y" ? rn : sn, h = n.rects.reference[f] + n.rects.reference[u] - a[u] - n.rects.popper[f], S = a[u] - n.rects.reference[u], R = ti(s), k = R ? u === "y" ? R.clientHeight || 0 : R.clientWidth || 0 : 0, E = h / 2 - S / 2, w = g[m], C = k - b[f] - g[x], N = k / 2 - b[f] / 2 + E, M = Mr(w, N, C), D = u;
    n.modifiersData[r] = (t = {}, t[D] = M, t.centerOffset = M - N, t);
  }
}
function kC(e) {
  var t = e.state, n = e.options, r = n.element, i = r === void 0 ? "[data-popper-arrow]" : r;
  i != null && (typeof i == "string" && (i = t.elements.popper.querySelector(i), !i) || vf(t.elements.popper, i) && (t.elements.arrow = i));
}
const PC = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: NC,
  effect: kC,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function er(e) {
  return e.split("-")[1];
}
var IC = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function $C(e, t) {
  var n = e.x, r = e.y, i = t.devicePixelRatio || 1;
  return {
    x: Qo(n * i) / i || 0,
    y: Qo(r * i) / i || 0
  };
}
function zd(e) {
  var t, n = e.popper, r = e.popperRect, i = e.placement, s = e.variation, a = e.offsets, c = e.position, u = e.gpuAcceleration, p = e.adaptive, f = e.roundOffsets, g = e.isFixed, b = a.x, m = b === void 0 ? 0 : b, x = a.y, h = x === void 0 ? 0 : x, S = typeof f == "function" ? f({
    x: m,
    y: h
  }) : {
    x: m,
    y: h
  };
  m = S.x, h = S.y;
  var R = a.hasOwnProperty("x"), k = a.hasOwnProperty("y"), E = Bt, w = jt, C = window;
  if (p) {
    var N = ti(n), M = "clientHeight", D = "clientWidth";
    if (N === Kt(n) && (N = to(n), Gn(N).position !== "static" && c === "absolute" && (M = "scrollHeight", D = "scrollWidth")), N = N, i === jt || (i === Bt || i === sn) && s === Hr) {
      w = rn;
      var L = g && N === C && C.visualViewport ? C.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        N[M]
      );
      h -= L - r.height, h *= u ? 1 : -1;
    }
    if (i === Bt || (i === jt || i === rn) && s === Hr) {
      E = sn;
      var B = g && N === C && C.visualViewport ? C.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        N[D]
      );
      m -= B - r.width, m *= u ? 1 : -1;
    }
  }
  var I = Object.assign({
    position: c
  }, p && IC), y = f === !0 ? $C({
    x: m,
    y: h
  }, Kt(n)) : {
    x: m,
    y: h
  };
  if (m = y.x, h = y.y, u) {
    var $;
    return Object.assign({}, I, ($ = {}, $[w] = k ? "0" : "", $[E] = R ? "0" : "", $.transform = (C.devicePixelRatio || 1) <= 1 ? "translate(" + m + "px, " + h + "px)" : "translate3d(" + m + "px, " + h + "px, 0)", $));
  }
  return Object.assign({}, I, (t = {}, t[w] = k ? h + "px" : "", t[E] = R ? m + "px" : "", t.transform = "", t));
}
function AC(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, i = r === void 0 ? !0 : r, s = n.adaptive, a = s === void 0 ? !0 : s, c = n.roundOffsets, u = c === void 0 ? !0 : c, p = {
    placement: Rn(t.placement),
    variation: er(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: i,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, zd(Object.assign({}, p, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: a,
    roundOffsets: u
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, zd(Object.assign({}, p, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: u
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const MC = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: AC,
  data: {}
};
var Ri = {
  passive: !0
};
function _C(e) {
  var t = e.state, n = e.instance, r = e.options, i = r.scroll, s = i === void 0 ? !0 : i, a = r.resize, c = a === void 0 ? !0 : a, u = Kt(t.elements.popper), p = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return s && p.forEach(function(f) {
    f.addEventListener("scroll", n.update, Ri);
  }), c && u.addEventListener("resize", n.update, Ri), function() {
    s && p.forEach(function(f) {
      f.removeEventListener("scroll", n.update, Ri);
    }), c && u.removeEventListener("resize", n.update, Ri);
  };
}
const DC = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: _C,
  data: {}
};
var LC = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function zi(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return LC[t];
  });
}
var FC = {
  start: "end",
  end: "start"
};
function Vd(e) {
  return e.replace(/start|end/g, function(t) {
    return FC[t];
  });
}
function Pl(e) {
  var t = Kt(e), n = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function Il(e) {
  return Zo(to(e)).left + Pl(e).scrollLeft;
}
function jC(e, t) {
  var n = Kt(e), r = to(e), i = n.visualViewport, s = r.clientWidth, a = r.clientHeight, c = 0, u = 0;
  if (i) {
    s = i.width, a = i.height;
    var p = bf();
    (p || !p && t === "fixed") && (c = i.offsetLeft, u = i.offsetTop);
  }
  return {
    width: s,
    height: a,
    x: c + Il(e),
    y: u
  };
}
function BC(e) {
  var t, n = to(e), r = Pl(e), i = (t = e.ownerDocument) == null ? void 0 : t.body, s = go(n.scrollWidth, n.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), a = go(n.scrollHeight, n.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), c = -r.scrollLeft + Il(e), u = -r.scrollTop;
  return Gn(i || n).direction === "rtl" && (c += go(n.clientWidth, i ? i.clientWidth : 0) - s), {
    width: s,
    height: a,
    x: c,
    y: u
  };
}
function $l(e) {
  var t = Gn(e), n = t.overflow, r = t.overflowX, i = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + i + r);
}
function Sf(e) {
  return ["html", "body", "#document"].indexOf(Nn(e)) >= 0 ? e.ownerDocument.body : on(e) && $l(e) ? e : Sf(zs(e));
}
function _r(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = Sf(e), i = r === ((n = e.ownerDocument) == null ? void 0 : n.body), s = Kt(r), a = i ? [s].concat(s.visualViewport || [], $l(r) ? r : []) : r, c = t.concat(a);
  return i ? c : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    c.concat(_r(zs(a)))
  );
}
function za(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function WC(e, t) {
  var n = Zo(e, !1, t === "fixed");
  return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function Ud(e, t, n) {
  return t === gf ? za(jC(e, n)) : vo(t) ? WC(t, n) : za(BC(to(e)));
}
function zC(e) {
  var t = _r(zs(e)), n = ["absolute", "fixed"].indexOf(Gn(e).position) >= 0, r = n && on(e) ? ti(e) : e;
  return vo(r) ? t.filter(function(i) {
    return vo(i) && vf(i, r) && Nn(i) !== "body";
  }) : [];
}
function VC(e, t, n, r) {
  var i = t === "clippingParents" ? zC(e) : [].concat(t), s = [].concat(i, [n]), a = s[0], c = s.reduce(function(u, p) {
    var f = Ud(e, p, r);
    return u.top = go(f.top, u.top), u.right = as(f.right, u.right), u.bottom = as(f.bottom, u.bottom), u.left = go(f.left, u.left), u;
  }, Ud(e, a, r));
  return c.width = c.right - c.left, c.height = c.bottom - c.top, c.x = c.left, c.y = c.top, c;
}
function Tf(e) {
  var t = e.reference, n = e.element, r = e.placement, i = r ? Rn(r) : null, s = r ? er(r) : null, a = t.x + t.width / 2 - n.width / 2, c = t.y + t.height / 2 - n.height / 2, u;
  switch (i) {
    case jt:
      u = {
        x: a,
        y: t.y - n.height
      };
      break;
    case rn:
      u = {
        x: a,
        y: t.y + t.height
      };
      break;
    case sn:
      u = {
        x: t.x + t.width,
        y: c
      };
      break;
    case Bt:
      u = {
        x: t.x - n.width,
        y: c
      };
      break;
    default:
      u = {
        x: t.x,
        y: t.y
      };
  }
  var p = i ? kl(i) : null;
  if (p != null) {
    var f = p === "y" ? "height" : "width";
    switch (s) {
      case Jo:
        u[p] = u[p] - (t[f] / 2 - n[f] / 2);
        break;
      case Hr:
        u[p] = u[p] + (t[f] / 2 - n[f] / 2);
        break;
    }
  }
  return u;
}
function qr(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, i = r === void 0 ? e.placement : r, s = n.strategy, a = s === void 0 ? e.strategy : s, c = n.boundary, u = c === void 0 ? cC : c, p = n.rootBoundary, f = p === void 0 ? gf : p, g = n.elementContext, b = g === void 0 ? wr : g, m = n.altBoundary, x = m === void 0 ? !1 : m, h = n.padding, S = h === void 0 ? 0 : h, R = Cf(typeof S != "number" ? S : wf(S, ei)), k = b === wr ? dC : wr, E = e.rects.popper, w = e.elements[x ? k : b], C = VC(vo(w) ? w : w.contextElement || to(e.elements.popper), u, f, a), N = Zo(e.elements.reference), M = Tf({
    reference: N,
    element: E,
    placement: i
  }), D = za(Object.assign({}, E, M)), L = b === wr ? D : N, B = {
    top: C.top - L.top + R.top,
    bottom: L.bottom - C.bottom + R.bottom,
    left: C.left - L.left + R.left,
    right: L.right - C.right + R.right
  }, I = e.modifiersData.offset;
  if (b === wr && I) {
    var y = I[i];
    Object.keys(B).forEach(function($) {
      var P = [sn, rn].indexOf($) >= 0 ? 1 : -1, A = [jt, rn].indexOf($) >= 0 ? "y" : "x";
      B[$] += y[A] * P;
    });
  }
  return B;
}
function UC(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, i = n.boundary, s = n.rootBoundary, a = n.padding, c = n.flipVariations, u = n.allowedAutoPlacements, p = u === void 0 ? yf : u, f = er(r), g = f ? c ? Bd : Bd.filter(function(x) {
    return er(x) === f;
  }) : ei, b = g.filter(function(x) {
    return p.indexOf(x) >= 0;
  });
  b.length === 0 && (b = g);
  var m = b.reduce(function(x, h) {
    return x[h] = qr(e, {
      placement: h,
      boundary: i,
      rootBoundary: s,
      padding: a
    })[Rn(h)], x;
  }, {});
  return Object.keys(m).sort(function(x, h) {
    return m[x] - m[h];
  });
}
function GC(e) {
  if (Rn(e) === Ol)
    return [];
  var t = zi(e);
  return [Vd(e), t, Vd(t)];
}
function HC(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var i = n.mainAxis, s = i === void 0 ? !0 : i, a = n.altAxis, c = a === void 0 ? !0 : a, u = n.fallbackPlacements, p = n.padding, f = n.boundary, g = n.rootBoundary, b = n.altBoundary, m = n.flipVariations, x = m === void 0 ? !0 : m, h = n.allowedAutoPlacements, S = t.options.placement, R = Rn(S), k = R === S, E = u || (k || !x ? [zi(S)] : GC(S)), w = [S].concat(E).reduce(function(oe, ne) {
      return oe.concat(Rn(ne) === Ol ? UC(t, {
        placement: ne,
        boundary: f,
        rootBoundary: g,
        padding: p,
        flipVariations: x,
        allowedAutoPlacements: h
      }) : ne);
    }, []), C = t.rects.reference, N = t.rects.popper, M = /* @__PURE__ */ new Map(), D = !0, L = w[0], B = 0; B < w.length; B++) {
      var I = w[B], y = Rn(I), $ = er(I) === Jo, P = [jt, rn].indexOf(y) >= 0, A = P ? "width" : "height", F = qr(t, {
        placement: I,
        boundary: f,
        rootBoundary: g,
        altBoundary: b,
        padding: p
      }), W = P ? $ ? sn : Bt : $ ? rn : jt;
      C[A] > N[A] && (W = zi(W));
      var H = zi(W), te = [];
      if (s && te.push(F[y] <= 0), c && te.push(F[W] <= 0, F[H] <= 0), te.every(function(oe) {
        return oe;
      })) {
        L = I, D = !1;
        break;
      }
      M.set(I, te);
    }
    if (D)
      for (var z = x ? 3 : 1, V = function(ne) {
        var Q = w.find(function(Z) {
          var U = M.get(Z);
          if (U)
            return U.slice(0, ne).every(function(J) {
              return J;
            });
        });
        if (Q)
          return L = Q, "break";
      }, X = z; X > 0; X--) {
        var re = V(X);
        if (re === "break") break;
      }
    t.placement !== L && (t.modifiersData[r]._skip = !0, t.placement = L, t.reset = !0);
  }
}
const qC = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: HC,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Gd(e, t, n) {
  return n === void 0 && (n = {
    x: 0,
    y: 0
  }), {
    top: e.top - t.height - n.y,
    right: e.right - t.width + n.x,
    bottom: e.bottom - t.height + n.y,
    left: e.left - t.width - n.x
  };
}
function Hd(e) {
  return [jt, sn, rn, Bt].some(function(t) {
    return e[t] >= 0;
  });
}
function KC(e) {
  var t = e.state, n = e.name, r = t.rects.reference, i = t.rects.popper, s = t.modifiersData.preventOverflow, a = qr(t, {
    elementContext: "reference"
  }), c = qr(t, {
    altBoundary: !0
  }), u = Gd(a, r), p = Gd(c, i, s), f = Hd(u), g = Hd(p);
  t.modifiersData[n] = {
    referenceClippingOffsets: u,
    popperEscapeOffsets: p,
    isReferenceHidden: f,
    hasPopperEscaped: g
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": f,
    "data-popper-escaped": g
  });
}
const YC = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: KC
};
function XC(e, t, n) {
  var r = Rn(e), i = [Bt, jt].indexOf(r) >= 0 ? -1 : 1, s = typeof n == "function" ? n(Object.assign({}, t, {
    placement: e
  })) : n, a = s[0], c = s[1];
  return a = a || 0, c = (c || 0) * i, [Bt, sn].indexOf(r) >= 0 ? {
    x: c,
    y: a
  } : {
    x: a,
    y: c
  };
}
function JC(e) {
  var t = e.state, n = e.options, r = e.name, i = n.offset, s = i === void 0 ? [0, 0] : i, a = yf.reduce(function(f, g) {
    return f[g] = XC(g, t.rects, s), f;
  }, {}), c = a[t.placement], u = c.x, p = c.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += u, t.modifiersData.popperOffsets.y += p), t.modifiersData[r] = a;
}
const QC = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: JC
};
function ZC(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = Tf({
    reference: t.rects.reference,
    element: t.rects.popper,
    placement: t.placement
  });
}
const ew = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: ZC,
  data: {}
};
function tw(e) {
  return e === "x" ? "y" : "x";
}
function nw(e) {
  var t = e.state, n = e.options, r = e.name, i = n.mainAxis, s = i === void 0 ? !0 : i, a = n.altAxis, c = a === void 0 ? !1 : a, u = n.boundary, p = n.rootBoundary, f = n.altBoundary, g = n.padding, b = n.tether, m = b === void 0 ? !0 : b, x = n.tetherOffset, h = x === void 0 ? 0 : x, S = qr(t, {
    boundary: u,
    rootBoundary: p,
    padding: g,
    altBoundary: f
  }), R = Rn(t.placement), k = er(t.placement), E = !k, w = kl(R), C = tw(w), N = t.modifiersData.popperOffsets, M = t.rects.reference, D = t.rects.popper, L = typeof h == "function" ? h(Object.assign({}, t.rects, {
    placement: t.placement
  })) : h, B = typeof L == "number" ? {
    mainAxis: L,
    altAxis: L
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, L), I = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, y = {
    x: 0,
    y: 0
  };
  if (N) {
    if (s) {
      var $, P = w === "y" ? jt : Bt, A = w === "y" ? rn : sn, F = w === "y" ? "height" : "width", W = N[w], H = W + S[P], te = W - S[A], z = m ? -D[F] / 2 : 0, V = k === Jo ? M[F] : D[F], X = k === Jo ? -D[F] : -M[F], re = t.elements.arrow, oe = m && re ? Nl(re) : {
        width: 0,
        height: 0
      }, ne = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : xf(), Q = ne[P], Z = ne[A], U = Mr(0, M[F], oe[F]), J = E ? M[F] / 2 - z - U - Q - B.mainAxis : V - U - Q - B.mainAxis, q = E ? -M[F] / 2 + z + U + Z + B.mainAxis : X + U + Z + B.mainAxis, ce = t.elements.arrow && ti(t.elements.arrow), j = ce ? w === "y" ? ce.clientTop || 0 : ce.clientLeft || 0 : 0, de = ($ = I == null ? void 0 : I[w]) != null ? $ : 0, Y = W + J - de - j, he = W + q - de, Le = Mr(m ? as(H, Y) : H, W, m ? go(te, he) : te);
      N[w] = Le, y[w] = Le - W;
    }
    if (c) {
      var Re, Ke = w === "x" ? jt : Bt, Se = w === "x" ? rn : sn, Pe = N[C], Ye = C === "y" ? "height" : "width", it = Pe + S[Ke], Fe = Pe - S[Se], Ae = [jt, Bt].indexOf(R) !== -1, Me = (Re = I == null ? void 0 : I[C]) != null ? Re : 0, ot = Ae ? it : Pe - M[Ye] - D[Ye] - Me + B.altAxis, _e = Ae ? Pe + M[Ye] + D[Ye] - Me - B.altAxis : Fe, $e = m && Ae ? OC(ot, Pe, _e) : Mr(m ? ot : it, Pe, m ? _e : Fe);
      N[C] = $e, y[C] = $e - Pe;
    }
    t.modifiersData[r] = y;
  }
}
const ow = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: nw,
  requiresIfExists: ["offset"]
};
function rw(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function iw(e) {
  return e === Kt(e) || !on(e) ? Pl(e) : rw(e);
}
function sw(e) {
  var t = e.getBoundingClientRect(), n = Qo(t.width) / e.offsetWidth || 1, r = Qo(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function aw(e, t, n) {
  n === void 0 && (n = !1);
  var r = on(t), i = on(t) && sw(t), s = to(t), a = Zo(e, i, n), c = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((Nn(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  $l(s)) && (c = iw(t)), on(t) ? (u = Zo(t, !0), u.x += t.clientLeft, u.y += t.clientTop) : s && (u.x = Il(s))), {
    x: a.left + c.scrollLeft - u.x,
    y: a.top + c.scrollTop - u.y,
    width: a.width,
    height: a.height
  };
}
function lw(e) {
  var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
  e.forEach(function(s) {
    t.set(s.name, s);
  });
  function i(s) {
    n.add(s.name);
    var a = [].concat(s.requires || [], s.requiresIfExists || []);
    a.forEach(function(c) {
      if (!n.has(c)) {
        var u = t.get(c);
        u && i(u);
      }
    }), r.push(s);
  }
  return e.forEach(function(s) {
    n.has(s.name) || i(s);
  }), r;
}
function cw(e) {
  var t = lw(e);
  return xC.reduce(function(n, r) {
    return n.concat(t.filter(function(i) {
      return i.phase === r;
    }));
  }, []);
}
function dw(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function uw(e) {
  var t = e.reduce(function(n, r) {
    var i = n[r.name];
    return n[r.name] = i ? Object.assign({}, i, r, {
      options: Object.assign({}, i.options, r.options),
      data: Object.assign({}, i.data, r.data)
    }) : r, n;
  }, {});
  return Object.keys(t).map(function(n) {
    return t[n];
  });
}
var qd = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Kd() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function pw(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, i = t.defaultOptions, s = i === void 0 ? qd : i;
  return function(c, u, p) {
    p === void 0 && (p = s);
    var f = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, qd, s),
      modifiersData: {},
      elements: {
        reference: c,
        popper: u
      },
      attributes: {},
      styles: {}
    }, g = [], b = !1, m = {
      state: f,
      setOptions: function(R) {
        var k = typeof R == "function" ? R(f.options) : R;
        h(), f.options = Object.assign({}, s, f.options, k), f.scrollParents = {
          reference: vo(c) ? _r(c) : c.contextElement ? _r(c.contextElement) : [],
          popper: _r(u)
        };
        var E = cw(uw([].concat(r, f.options.modifiers)));
        return f.orderedModifiers = E.filter(function(w) {
          return w.enabled;
        }), x(), m.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!b) {
          var R = f.elements, k = R.reference, E = R.popper;
          if (Kd(k, E)) {
            f.rects = {
              reference: aw(k, ti(E), f.options.strategy === "fixed"),
              popper: Nl(E)
            }, f.reset = !1, f.placement = f.options.placement, f.orderedModifiers.forEach(function(B) {
              return f.modifiersData[B.name] = Object.assign({}, B.data);
            });
            for (var w = 0; w < f.orderedModifiers.length; w++) {
              if (f.reset === !0) {
                f.reset = !1, w = -1;
                continue;
              }
              var C = f.orderedModifiers[w], N = C.fn, M = C.options, D = M === void 0 ? {} : M, L = C.name;
              typeof N == "function" && (f = N({
                state: f,
                options: D,
                name: L,
                instance: m
              }) || f);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: dw(function() {
        return new Promise(function(S) {
          m.forceUpdate(), S(f);
        });
      }),
      destroy: function() {
        h(), b = !0;
      }
    };
    if (!Kd(c, u))
      return m;
    m.setOptions(p).then(function(S) {
      !b && p.onFirstUpdate && p.onFirstUpdate(S);
    });
    function x() {
      f.orderedModifiers.forEach(function(S) {
        var R = S.name, k = S.options, E = k === void 0 ? {} : k, w = S.effect;
        if (typeof w == "function") {
          var C = w({
            state: f,
            name: R,
            instance: m,
            options: E
          }), N = function() {
          };
          g.push(C || N);
        }
      });
    }
    function h() {
      g.forEach(function(S) {
        return S();
      }), g = [];
    }
    return m;
  };
}
var fw = [DC, ew, MC, SC, QC, qC, ow, PC, YC], mw = /* @__PURE__ */ pw({
  defaultModifiers: fw
});
function hw(e) {
  return be("MuiPopper", e);
}
xe("MuiPopper", ["root"]);
function gw(e, t) {
  if (t === "ltr")
    return e;
  switch (e) {
    case "bottom-end":
      return "bottom-start";
    case "bottom-start":
      return "bottom-end";
    case "top-end":
      return "top-start";
    case "top-start":
      return "top-end";
    default:
      return e;
  }
}
function ls(e) {
  return typeof e == "function" ? e() : e;
}
function Vs(e) {
  return e.nodeType !== void 0;
}
function yw(e) {
  return !Vs(e);
}
const bw = (e) => {
  const {
    classes: t
  } = e;
  return Ce({
    root: ["root"]
  }, hw, t);
}, vw = {}, xw = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const {
    anchorEl: r,
    children: i,
    direction: s,
    disablePortal: a,
    modifiers: c,
    open: u,
    placement: p,
    popperOptions: f,
    popperRef: g,
    slotProps: b = {},
    slots: m = {},
    TransitionProps: x,
    // @ts-ignore internal logic
    ownerState: h,
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
    ...S
  } = t, R = v.useRef(null), k = ft(R, n), E = v.useRef(null), w = ft(E, g), C = v.useRef(w);
  Tt(() => {
    C.current = w;
  }, [w]), v.useImperativeHandle(g, () => E.current, []);
  const N = gw(p, s), [M, D] = v.useState(N), [L, B] = v.useState(ls(r));
  v.useEffect(() => {
    E.current && E.current.forceUpdate();
  }), v.useEffect(() => {
    r && B(ls(r));
  }, [r]), Tt(() => {
    if (!L || !u)
      return;
    const A = (te) => {
      D(te.placement);
    };
    if (process.env.NODE_ENV !== "production" && L && Vs(L) && L.nodeType === 1) {
      const te = L.getBoundingClientRect();
      As() && te.top === 0 && te.left === 0 && te.right === 0 && te.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    let F = [{
      name: "preventOverflow",
      options: {
        altBoundary: a
      }
    }, {
      name: "flip",
      options: {
        altBoundary: a
      }
    }, {
      name: "onUpdate",
      enabled: !0,
      phase: "afterWrite",
      fn: ({
        state: te
      }) => {
        A(te);
      }
    }];
    c != null && (F = F.concat(c)), f && f.modifiers != null && (F = F.concat(f.modifiers));
    const W = mw(L, R.current, {
      placement: N,
      ...f,
      modifiers: F
    });
    C.current(W);
    const H = R.current;
    return () => {
      if (H) {
        const {
          style: te
        } = H, z = te.position, V = te.top, X = te.left, re = te.transform;
        W.destroy(), te.position = z, te.top = V, te.left = X, te.transform = re;
      } else
        W.destroy();
      C.current(null);
    };
  }, [L, a, c, u, f, N]);
  const I = {
    placement: M
  };
  x !== null && (I.TransitionProps = x);
  const y = bw(t), $ = m.root ?? "div", P = jp({
    elementType: $,
    externalSlotProps: b.root,
    externalForwardedProps: S,
    additionalProps: {
      role: "tooltip",
      ref: k
    },
    ownerState: t,
    className: y.root
  });
  return /* @__PURE__ */ l($, {
    ...P,
    children: typeof i == "function" ? i(I) : i
  });
}), Ef = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const {
    anchorEl: r,
    children: i,
    container: s,
    direction: a = "ltr",
    disablePortal: c = !1,
    keepMounted: u = !1,
    modifiers: p,
    open: f,
    placement: g = "bottom",
    popperOptions: b = vw,
    popperRef: m,
    style: x,
    transition: h = !1,
    slotProps: S = {},
    slots: R = {},
    ...k
  } = t, [E, w] = v.useState(!0), C = () => {
    w(!1);
  }, N = () => {
    w(!0);
  };
  if (!u && !f && (!h || E))
    return null;
  let M;
  if (s)
    M = s;
  else if (r) {
    const B = ls(r);
    M = B && Vs(B) ? Et(B).body : Et(null).body;
  }
  const D = !f && u && (!h || E) ? "none" : void 0, L = h ? {
    in: f,
    onEnter: C,
    onExited: N
  } : void 0;
  return /* @__PURE__ */ l(Vr, {
    disablePortal: c,
    container: M,
    children: /* @__PURE__ */ l(xw, {
      anchorEl: r,
      direction: a,
      disablePortal: c,
      modifiers: p,
      ref: n,
      open: h ? !E : f,
      placement: g,
      popperOptions: b,
      popperRef: m,
      slotProps: S,
      slots: R,
      ...k,
      style: {
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: D,
        ...x
      },
      TransitionProps: L,
      children: i
    })
  });
});
process.env.NODE_ENV !== "production" && (Ef.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   * The return value will passed as the reference object of the Popper instance.
   */
  anchorEl: kn(o.oneOfType([Un, o.object, o.func]), (e) => {
    if (e.open) {
      const t = ls(e.anchorEl);
      if (t && Vs(t) && t.nodeType === 1) {
        const n = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "production" && As() && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || yw(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
        return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "It should be an HTML element instance or a virtualElement ", "(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`));
    }
    return null;
  }),
  /**
   * Popper render function or node.
   */
  children: o.oneOfType([o.node, o.func]),
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: o.oneOfType([Un, o.func]),
  /**
   * Direction of the text.
   * @default 'ltr'
   */
  direction: o.oneOf(["ltr", "rtl"]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: o.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: o.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: o.arrayOf(o.shape({
    data: o.object,
    effect: o.func,
    enabled: o.bool,
    fn: o.func,
    name: o.any,
    options: o.object,
    phase: o.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: o.arrayOf(o.string),
    requiresIfExists: o.arrayOf(o.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: o.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: o.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: o.shape({
    modifiers: o.array,
    onFirstUpdate: o.func,
    placement: o.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: o.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: gn,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: o.shape({
    root: o.oneOfType([o.func, o.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: o.shape({
    root: o.elementType
  }),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: o.bool
});
const Cw = ee(Ef, {
  name: "MuiPopper",
  slot: "Root"
})({}), Al = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = Vu(), i = we({
    props: t,
    name: "MuiPopper"
  }), {
    anchorEl: s,
    component: a,
    container: c,
    disablePortal: u,
    keepMounted: p,
    modifiers: f,
    open: g,
    placement: b,
    popperOptions: m,
    popperRef: x,
    transition: h,
    slots: S,
    slotProps: R,
    ...k
  } = i, E = {
    anchorEl: s,
    container: c,
    disablePortal: u,
    keepMounted: p,
    modifiers: f,
    open: g,
    placement: b,
    popperOptions: m,
    popperRef: x,
    transition: h,
    ...k
  };
  return /* @__PURE__ */ l(Cw, {
    as: a,
    direction: r ? "rtl" : "ltr",
    slots: S,
    slotProps: R,
    ...E,
    ref: n
  });
});
process.env.NODE_ENV !== "production" && (Al.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   * The return value will passed as the reference object of the Popper instance.
   */
  anchorEl: o.oneOfType([Un, o.object, o.func]),
  /**
   * Popper render function or node.
   */
  children: o.oneOfType([o.node, o.func]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: o.elementType,
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: o.oneOfType([Un, o.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: o.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: o.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: o.arrayOf(o.shape({
    data: o.object,
    effect: o.func,
    enabled: o.bool,
    fn: o.func,
    name: o.any,
    options: o.object,
    phase: o.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: o.arrayOf(o.string),
    requiresIfExists: o.arrayOf(o.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: o.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: o.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: o.shape({
    modifiers: o.array,
    onFirstUpdate: o.func,
    placement: o.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: o.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: gn,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: o.shape({
    root: o.oneOfType([o.func, o.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: o.shape({
    root: o.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object]),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: o.bool
});
function ww(e) {
  return be("MuiTooltip", e);
}
const en = xe("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]);
function Sw(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Tw = (e) => {
  const {
    classes: t,
    disableInteractive: n,
    arrow: r,
    touch: i,
    placement: s
  } = e, a = {
    popper: ["popper", !n && "popperInteractive", r && "popperArrow"],
    tooltip: ["tooltip", r && "tooltipArrow", i && "touch", `tooltipPlacement${ye(s.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return Ce(a, ww, t);
}, Ew = ee(Al, {
  name: "MuiTooltip",
  slot: "Popper",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.popper, !n.disableInteractive && t.popperInteractive, n.arrow && t.popperArrow, !n.open && t.popperClose];
  }
})(ke(({
  theme: e
}) => ({
  zIndex: (e.vars || e).zIndex.tooltip,
  pointerEvents: "none",
  variants: [{
    props: ({
      ownerState: t,
      open: n
    }) => n && !t.disableInteractive,
    style: {
      pointerEvents: "auto"
    }
  }, {
    props: ({
      ownerState: t
    }) => t.arrow,
    style: {
      [`&[data-popper-placement*="bottom"] .${en.arrow}`]: {
        top: 0,
        marginTop: "-0.71em",
        "&::before": {
          transformOrigin: "0 100%"
        }
      },
      [`&[data-popper-placement*="top"] .${en.arrow}`]: {
        bottom: 0,
        marginBottom: "-0.71em",
        "&::before": {
          transformOrigin: "100% 0"
        }
      },
      [`&[data-popper-placement*="right"] .${en.arrow}`]: {
        height: "1em",
        width: "0.71em",
        insetInlineStart: 0,
        marginInlineStart: "-0.71em",
        "&::before": {
          transformOrigin: "100% 100%"
        }
      },
      [`&[data-popper-placement*="left"] .${en.arrow}`]: {
        height: "1em",
        width: "0.71em",
        insetInlineEnd: 0,
        marginInlineEnd: "-0.71em",
        "&::before": {
          transformOrigin: "0 0"
        }
      }
    }
  }]
}))), Ow = ee("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.tooltip, n.touch && t.touch, n.arrow && t.tooltipArrow, t[`tooltipPlacement${ye(n.placement.split("-")[0])}`]];
  }
})(ke(({
  theme: e
}) => ({
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : e.alpha(e.palette.grey[700], 0.92),
  borderRadius: (e.vars || e).shape.borderRadius,
  color: (e.vars || e).palette.common.white,
  fontFamily: e.typography.fontFamily,
  padding: "4px 8px",
  fontSize: e.typography.pxToRem(11),
  maxWidth: 300,
  margin: 2,
  wordWrap: "break-word",
  fontWeight: e.typography.fontWeightMedium,
  [`.${en.popper}[data-popper-placement*="left"] &`]: {
    transformOrigin: "right center",
    marginInlineEnd: "14px"
  },
  [`.${en.popper}[data-popper-placement*="right"] &`]: {
    transformOrigin: "left center",
    marginInlineStart: "14px"
  },
  [`.${en.popper}[data-popper-placement*="top"] &`]: {
    transformOrigin: "center bottom",
    marginBottom: "14px"
  },
  [`.${en.popper}[data-popper-placement*="bottom"] &`]: {
    transformOrigin: "center top",
    marginTop: "14px"
  },
  variants: [{
    props: ({
      ownerState: t
    }) => t.arrow,
    style: {
      position: "relative",
      marginBlock: 0
    }
  }, {
    props: ({
      ownerState: t
    }) => t.touch,
    style: {
      padding: "8px 16px",
      fontSize: e.typography.pxToRem(14),
      lineHeight: `${Sw(16 / 14)}em`,
      fontWeight: e.typography.fontWeightRegular
    }
  }, {
    props: ({
      ownerState: t
    }) => t.touch,
    style: {
      [`.${en.popper}[data-popper-placement*="left"] &`]: {
        marginInlineEnd: "24px"
      },
      [`.${en.popper}[data-popper-placement*="right"] &`]: {
        marginInlineStart: "24px"
      },
      [`.${en.popper}[data-popper-placement*="top"] &`]: {
        marginBottom: "24px"
      },
      [`.${en.popper}[data-popper-placement*="bottom"] &`]: {
        marginTop: "24px"
      }
    }
  }]
}))), Rw = ee("span", {
  name: "MuiTooltip",
  slot: "Arrow"
})(ke(({
  theme: e
}) => ({
  overflow: "hidden",
  position: "absolute",
  width: "1em",
  height: "0.71em",
  boxSizing: "border-box",
  color: e.vars ? e.vars.palette.Tooltip.bg : e.alpha(e.palette.grey[700], 0.9),
  "&::before": {
    content: '""',
    margin: "auto",
    display: "block",
    width: "100%",
    height: "100%",
    backgroundColor: "currentColor",
    transform: "rotate(45deg)"
  }
})));
let Ni = !1;
const Yd = new Is();
let Sr = {
  x: 0,
  y: 0
};
function ki(e, t) {
  return (n, ...r) => {
    t && t(n, ...r), e(n, ...r);
  };
}
const Lo = /* @__PURE__ */ v.forwardRef(function(t, n) {
  const r = we({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: i = !1,
    children: s,
    classes: a,
    describeChild: c = !1,
    disableFocusListener: u = !1,
    disableHoverListener: p = !1,
    disableInteractive: f = !1,
    disableTouchListener: g = !1,
    enterDelay: b = 100,
    enterNextDelay: m = 0,
    enterTouchDelay: x = 700,
    followCursor: h = !1,
    id: S,
    leaveDelay: R = 0,
    leaveTouchDelay: k = 1500,
    onClose: E,
    onOpen: w,
    open: C,
    placement: N = "bottom",
    slotProps: M = {},
    slots: D = {},
    title: L,
    ...B
  } = r, I = /* @__PURE__ */ v.isValidElement(s) ? s : /* @__PURE__ */ l("span", {
    children: s
  }), y = rr(), [$, P] = v.useState(), [A, F] = v.useState(null), W = v.useRef(!1), H = f || h, te = Fn(), z = Fn(), V = Fn(), X = Fn(), [re, oe] = Ji({
    controlled: C,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let ne = re;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: pe
    } = v.useRef(C !== void 0);
    v.useEffect(() => {
      $ && $.disabled && !pe && L !== "" && $.tagName.toLowerCase() === "button" && console.warn(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [L, $, pe]);
  }
  const Q = zn(S), Z = v.useRef(), U = Dt(() => {
    Z.current !== void 0 && (document.body.style.WebkitUserSelect = Z.current, Z.current = void 0), X.clear();
  });
  v.useEffect(() => U, [U]);
  const J = (pe) => {
    Yd.clear(), Ni = !0, oe(!0), w && !ne && w(pe);
  }, q = Dt(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (pe) => {
      Yd.start(800 + R, () => {
        Ni = !1;
      }), oe(!1), E && ne && E(pe), te.start(y.transitions.duration.shortest, () => {
        W.current = !1;
      });
    }
  ), ce = (pe) => {
    W.current && pe.type !== "touchstart" || ($ && $.removeAttribute("title"), z.clear(), V.clear(), b || Ni && m ? z.start(Ni ? m : b, () => {
      J(pe);
    }) : J(pe));
  }, j = (pe) => {
    z.clear(), V.start(R, () => {
      q(pe);
    });
  }, [, de] = v.useState(!1), Y = (pe) => {
    const De = (pe == null ? void 0 : pe.target) ?? $;
    if (!De || De.disabled || !es(De)) {
      de(!1);
      const Ct = pe ?? new Event("blur");
      !pe && De && (Object.defineProperty(Ct, "target", {
        value: De
      }), Object.defineProperty(Ct, "currentTarget", {
        value: De
      })), j(Ct);
    }
  }, he = (pe) => {
    if ($ || P(pe.currentTarget), es(pe.target)) {
      const De = (Ct) => {
        Ct.target.disabled && Y(Ct), Ct.target.removeEventListener("blur", De);
      };
      pe.target.addEventListener("blur", De), de(!0), ce(pe);
    }
  }, Le = (pe) => {
    W.current = !0;
    const De = I.props;
    De.onTouchStart && De.onTouchStart(pe);
  }, Re = (pe) => {
    Le(pe), V.clear(), te.clear(), U(), Z.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", X.start(x, () => {
      document.body.style.WebkitUserSelect = Z.current, ce(pe);
    });
  }, Ke = (pe) => {
    I.props.onTouchEnd && I.props.onTouchEnd(pe), U(), V.start(k, () => {
      q(pe);
    });
  };
  v.useEffect(() => {
    if (!ne)
      return;
    function pe(De) {
      De.key === "Escape" && q(De);
    }
    return document.addEventListener("keydown", pe), () => {
      document.removeEventListener("keydown", pe);
    };
  }, [q, ne]);
  const Se = ft(sr(I), P, n);
  !L && L !== 0 && (ne = !1);
  const Pe = v.useRef(), Ye = (pe) => {
    const De = I.props;
    De.onMouseMove && De.onMouseMove(pe), Sr = {
      x: pe.clientX,
      y: pe.clientY
    }, Pe.current && Pe.current.update();
  }, it = {}, Fe = typeof L == "string";
  c ? (it.title = !ne && Fe && !p ? L : null, it["aria-describedby"] = ne ? Q : null) : (it["aria-label"] = Fe ? L : null, it["aria-labelledby"] = ne && !Fe ? Q : null);
  const Ae = {
    ...it,
    ...B,
    ...I.props,
    className: le(B.className, I.props.className),
    onTouchStart: Le,
    ref: Se,
    ...h ? {
      onMouseMove: Ye
    } : {}
  };
  process.env.NODE_ENV !== "production" && (Ae["data-mui-internal-clone-element"] = !0, v.useEffect(() => {
    $ && !$.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [$]));
  const Me = {};
  g || (Ae.onTouchStart = Re, Ae.onTouchEnd = Ke), p || (Ae.onMouseOver = ki(ce, Ae.onMouseOver), Ae.onMouseLeave = ki(j, Ae.onMouseLeave), H || (Me.onMouseOver = ce, Me.onMouseLeave = j)), u || (Ae.onFocus = ki(he, Ae.onFocus), Ae.onBlur = ki(Y, Ae.onBlur), H || (Me.onFocus = he, Me.onBlur = Y)), process.env.NODE_ENV !== "production" && I.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${I.props.title}\` or the Tooltip component.`].join(`
`));
  const ot = {
    ...r,
    arrow: i,
    disableInteractive: H,
    placement: N,
    touch: W.current
  }, _e = typeof M.popper == "function" ? M.popper(ot) : M.popper, $e = v.useMemo(() => {
    var De;
    let pe = [{
      name: "arrow",
      enabled: !!A,
      options: {
        element: A,
        padding: 4
      }
    }];
    return (De = _e == null ? void 0 : _e.popperOptions) != null && De.modifiers && (pe = pe.concat(_e.popperOptions.modifiers)), {
      ..._e == null ? void 0 : _e.popperOptions,
      modifiers: pe
    };
  }, [A, _e == null ? void 0 : _e.popperOptions]), rt = Tw(ot), ue = {
    slots: D,
    slotProps: {
      arrow: M.arrow,
      popper: _e,
      tooltip: M.tooltip,
      transition: M.transition
    }
  }, [Te, lt] = ge("popper", {
    elementType: Ew,
    externalForwardedProps: ue,
    ownerState: ot,
    className: rt.popper
  }), [st, Ee] = ge("transition", {
    elementType: Ur,
    externalForwardedProps: ue,
    ownerState: ot
  }), [Pn, xo] = ge("tooltip", {
    elementType: Ow,
    className: rt.tooltip,
    externalForwardedProps: ue,
    ownerState: ot
  }), [Hn, no] = ge("arrow", {
    elementType: Rw,
    className: rt.arrow,
    externalForwardedProps: ue,
    ownerState: ot,
    ref: F
  });
  return /* @__PURE__ */ T(v.Fragment, {
    children: [/* @__PURE__ */ v.cloneElement(I, Ae), /* @__PURE__ */ l(Te, {
      as: Al,
      placement: N,
      anchorEl: h ? {
        getBoundingClientRect: () => ({
          top: Sr.y,
          left: Sr.x,
          right: Sr.x,
          bottom: Sr.y,
          width: 0,
          height: 0
        })
      } : $,
      popperRef: Pe,
      open: $ ? ne : !1,
      id: Q,
      transition: !0,
      ...Me,
      ...lt,
      popperOptions: $e,
      children: ({
        TransitionProps: pe
      }) => /* @__PURE__ */ l(st, {
        timeout: y.transitions.duration.shorter,
        ...pe,
        ...Ee,
        children: /* @__PURE__ */ T(Pn, {
          ...xo,
          children: [L, i ? /* @__PURE__ */ l(Hn, {
            ...no
          }) : null]
        })
      })
    })]
  });
});
process.env.NODE_ENV !== "production" && (Lo.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, adds an arrow to the tooltip.
   * @default false
   */
  arrow: o.bool,
  /**
   * Tooltip reference element.
   */
  children: ir.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
  /**
   * Set to `true` if the `title` acts as an accessible description.
   * By default the `title` acts as an accessible label for the child.
   * @default false
   */
  describeChild: o.bool,
  /**
   * Do not respond to focus-visible events.
   * @default false
   */
  disableFocusListener: o.bool,
  /**
   * Do not respond to hover events.
   * @default false
   */
  disableHoverListener: o.bool,
  /**
   * Makes a tooltip not interactive, i.e. it will close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   * @default false
   */
  disableInteractive: o.bool,
  /**
   * Do not respond to long press touch events.
   * @default false
   */
  disableTouchListener: o.bool,
  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This prop won't impact the enter touch delay (`enterTouchDelay`).
   * @default 100
   */
  enterDelay: o.number,
  /**
   * The number of milliseconds to wait before showing the tooltip when one was already recently opened.
   * @default 0
   */
  enterNextDelay: o.number,
  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   * @default 700
   */
  enterTouchDelay: o.number,
  /**
   * If `true`, the tooltip follow the cursor over the wrapped element.
   * @default false
   */
  followCursor: o.bool,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: o.string,
  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This prop won't impact the leave touch delay (`leaveTouchDelay`).
   * @default 0
   */
  leaveDelay: o.number,
  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   * @default 1500
   */
  leaveTouchDelay: o.number,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose: o.func,
  /**
   * Callback fired when the component requests to be open.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onOpen: o.func,
  /**
   * If `true`, the component is shown.
   */
  open: o.bool,
  /**
   * Tooltip placement.
   * @default 'bottom'
   */
  placement: o.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: o.shape({
    arrow: o.oneOfType([o.func, o.object]),
    popper: o.oneOfType([o.func, o.object]),
    tooltip: o.oneOfType([o.func, o.object]),
    transition: o.oneOfType([o.func, o.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: o.shape({
    arrow: o.elementType,
    popper: o.elementType,
    tooltip: o.elementType,
    transition: o.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object]),
  /**
   * Tooltip title. Zero-length titles string, undefined, null and false are never displayed.
   */
  title: o.node
});
const Nw = 216, kw = 56;
function Pw({ section: e, ...t }) {
  switch (e) {
    case "home":
      return /* @__PURE__ */ l(Y1, { ...t });
    case "servers":
      return /* @__PURE__ */ l(sf, { ...t });
    case "tools":
      return /* @__PURE__ */ l(af, { ...t });
    case "tool_groups":
      return /* @__PURE__ */ l(lf, { ...t });
    case "prompt_groups":
      return /* @__PURE__ */ l(K1, { ...t });
    case "agent_apps":
      return /* @__PURE__ */ l(uf, { ...t });
    case "prompts":
      return /* @__PURE__ */ l(cf, { ...t });
    case "resources":
      return /* @__PURE__ */ l(df, { ...t });
    case "diagnostics":
      return /* @__PURE__ */ l(X1, { ...t });
    default:
      return null;
  }
}
const Xd = [
  { key: "home", label: "Home" },
  { key: "servers", label: "Servers" },
  { key: "tools", label: "Tools" },
  { key: "tool_groups", label: "Tool Groups" },
  { key: "prompt_groups", label: "Prompt Groups" },
  { key: "agent_apps", label: "Agent Apps" },
  { key: "prompts", label: "Prompts" },
  { key: "resources", label: "Resources" },
  { key: "diagnostics", label: "System Info" }
];
function Iw({
  active: e,
  onSelect: t,
  signOutHref: n,
  embedMode: r = !1,
  signedInEmail: i
}) {
  const s = r ? Xd.filter((p) => p.key !== "home") : Xd, [a, c] = ve(() => {
    try {
      const p = window.localStorage.getItem("dashboard-nav-expanded");
      if (p !== null)
        return p === "1";
    } catch {
    }
    return !0;
  });
  function u(p) {
    c(p);
    try {
      window.localStorage.setItem("dashboard-nav-expanded", p ? "1" : "0");
    } catch {
    }
  }
  return /* @__PURE__ */ l(
    Ne,
    {
      "aria-label": "Dashboard navigation",
      "aria-expanded": a,
      component: "aside",
      sx: {
        width: a ? Nw : kw,
        flexShrink: 0,
        transition: (p) => p.transitions.create("width", {
          easing: p.transitions.easing.sharp,
          duration: p.transitions.duration.standard
        }),
        boxSizing: "border-box",
        borderRight: 1,
        borderColor: "divider",
        backgroundColor: "background.default",
        px: a ? "14px" : 1,
        py: 2,
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
        minHeight: "100vh"
      },
      children: /* @__PURE__ */ T(ae, { spacing: 2.25, sx: { flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }, children: [
        /* @__PURE__ */ l(
          ae,
          {
            direction: "row",
            spacing: 1,
            sx: {
              alignItems: "center",
              minWidth: 0,
              justifyContent: a ? "flex-start" : "center",
              flexWrap: "nowrap"
            },
            children: a ? /* @__PURE__ */ T(Ft, { children: [
              /* @__PURE__ */ l(Ne, { sx: { flex: "1 1 auto", minWidth: 0 }, children: /* @__PURE__ */ l(
                K,
                {
                  component: "span",
                  sx: { fontWeight: 700, fontSize: 16, whiteSpace: "nowrap", overflow: "hidden" },
                  children: "SAMI MCPHub"
                }
              ) }),
              /* @__PURE__ */ l(Lo, { title: "Collapse menu", children: /* @__PURE__ */ l(Gt, { "aria-label": "Collapse menu", edge: "end", size: "small", onClick: () => u(!1), children: /* @__PURE__ */ l(H1, { fontSize: "small" }) }) })
            ] }) : /* @__PURE__ */ l(Lo, { title: "Expand menu", children: /* @__PURE__ */ l(Gt, { "aria-label": "Expand menu", size: "small", onClick: () => u(!0), children: /* @__PURE__ */ l(q1, { fontSize: "small" }) }) })
          }
        ),
        /* @__PURE__ */ l(wl, { disablePadding: !0, sx: { px: 0, flex: 1, minHeight: 0, overflowY: "auto" }, "aria-label": "Dashboard sections", children: s.map((p) => {
          const f = e === p.key, g = /* @__PURE__ */ T(
            mf,
            {
              selected: f,
              onClick: () => t(p.key),
              sx: {
                px: a ? "12px" : "6px",
                py: 1.125,
                borderRadius: "12px",
                mb: 0,
                border: 1,
                borderColor: f ? "divider" : "transparent",
                backgroundColor: f ? "background.paper" : "transparent",
                justifyContent: a ? "flex-start" : "center"
              },
              children: [
                a ? null : /* @__PURE__ */ l(
                  Dp,
                  {
                    sx: {
                      minWidth: 0,
                      justifyContent: "center",
                      color: f ? "primary.main" : "text.secondary"
                    },
                    children: /* @__PURE__ */ l(Pw, { section: p.key, fontSize: "small" })
                  }
                ),
                a ? /* @__PURE__ */ l(
                  Lp,
                  {
                    primary: p.label,
                    slotProps: {
                      primary: {
                        variant: "body2",
                        sx: {
                          fontWeight: f ? 600 : 400,
                          color: f ? "text.primary" : "text.secondary"
                        }
                      }
                    }
                  }
                ) : null
              ]
            }
          );
          return /* @__PURE__ */ l(hf, { disablePadding: !0, sx: { mb: 0.25 }, children: a ? g : /* @__PURE__ */ l(Lo, { title: p.label, placement: "right", children: g }) }, p.key);
        }) }),
        r && i ? /* @__PURE__ */ l(
          Ne,
          {
            sx: {
              mt: "auto",
              pt: 1.5,
              borderTop: 1,
              borderColor: "divider",
              flexShrink: 0
            },
            children: a ? /* @__PURE__ */ l(Gr, { label: `Signed in as ${i}`, size: "small", sx: { width: "100%" } }) : /* @__PURE__ */ l(Lo, { title: `Signed in as ${i}`, placement: "right", children: /* @__PURE__ */ l(Ne, { sx: { display: "flex", justifyContent: "center" }, children: /* @__PURE__ */ l(Gr, { label: i.slice(0, 1).toUpperCase(), size: "small" }) }) })
          }
        ) : n ? /* @__PURE__ */ l(
          Ne,
          {
            sx: {
              mt: "auto",
              pt: 1.5,
              borderTop: 1,
              borderColor: "divider",
              flexShrink: 0
            },
            children: a ? /* @__PURE__ */ l(
              fe,
              {
                component: "a",
                href: n,
                variant: "outlined",
                size: "small",
                fullWidth: !0,
                startIcon: /* @__PURE__ */ l(jd, {}),
                sx: {
                  fontSize: "0.88rem",
                  minHeight: 36,
                  borderRadius: "12px",
                  textTransform: "none"
                },
                children: "Sign out"
              }
            ) : /* @__PURE__ */ l(Ne, { sx: { display: "flex", justifyContent: "center" }, children: /* @__PURE__ */ l(Lo, { title: "Sign out", placement: "right", children: /* @__PURE__ */ l(Gt, { component: "a", href: n, "aria-label": "Sign out", size: "small", color: "primary", children: /* @__PURE__ */ l(jd, { fontSize: "small" }) }) }) })
          }
        ) : null
      ] })
    }
  );
}
function Mt({
  title: e,
  subtitle: t,
  action: n,
  children: r
}) {
  return /* @__PURE__ */ T(
    dt,
    {
      elevation: 0,
      component: "section",
      variant: "outlined",
      sx: {
        p: "14px",
        borderRadius: "16px",
        boxShadow: "0 1px 2px rgba(27, 31, 36, 0.06), 0 8px 24px rgba(27, 31, 36, 0.04)"
      },
      children: [
        /* @__PURE__ */ T(
          ae,
          {
            direction: { xs: "column", sm: "row" },
            spacing: 1,
            sx: {
              mb: 1.5,
              alignItems: { xs: "stretch", sm: "flex-start" },
              justifyContent: "space-between"
            },
            children: [
              /* @__PURE__ */ T(Ne, { sx: { flex: "1 1 auto", minWidth: 0 }, children: [
                /* @__PURE__ */ l(K, { variant: "caption", sx: { letterSpacing: "0.12em", fontWeight: 600, fontSize: "0.74rem" }, children: e }),
                t ? /* @__PURE__ */ l(K, { variant: "h6", component: "h3", sx: { mt: 0.5, mb: 0, fontWeight: 600 }, children: t }) : null
              ] }),
              n
            ]
          }
        ),
        r
      ]
    }
  );
}
const $w = {
  good: "success",
  warn: "warning",
  bad: "error",
  muted: "default"
};
function Ut({ tone: e, text: t }) {
  const n = $w[e] ?? "default";
  return /* @__PURE__ */ l(Gr, { label: t, size: "small", variant: "outlined", color: n, sx: { textTransform: "capitalize" } });
}
function Tr(e) {
  return `'${e.replace(/'/g, "'\\''")}'`;
}
function Aw(e, t) {
  return [
    `curl -sS -X POST ${Tr(e)} \\`,
    `  -H ${Tr("Content-Type: application/x-www-form-urlencoded")} \\`,
    `  --data-urlencode ${Tr("grant_type=client_credentials")} \\`,
    `  --data-urlencode ${Tr(`client_id=${t}`)} \\`,
    `  --data-urlencode ${Tr("client_secret=YOUR_CLIENT_SECRET")}`
  ].join(`
`);
}
const Va = [
  { value: "open", label: "Open (no auth)" },
  { value: "api_key", label: "API key (client id in X-API-Key)" },
  { value: "basic", label: "Basic auth" },
  { value: "bearer", label: "Bearer (agent-app JWT)" }
];
function Pi(e) {
  const t = Va.find((n) => n.value === e);
  return (t == null ? void 0 : t.label) ?? e;
}
function Ii() {
  return /* @__PURE__ */ T("svg", { "aria-hidden": "true", fill: "none", height: "18", viewBox: "0 0 16 16", width: "18", children: [
    /* @__PURE__ */ l(
      "path",
      {
        d: "M2.75 4.25h10.5M6.25 2.75h3.5m-5.75 1.5.44 7.04A1.5 1.5 0 0 0 5.94 12.75h4.12a1.5 1.5 0 0 0 1.5-1.46L12 4.25",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "1.5"
      }
    ),
    /* @__PURE__ */ l("path", { d: "M6.5 6.5v3.5M9.5 6.5v3.5", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5" })
  ] });
}
function da() {
  return /* @__PURE__ */ l("svg", { "aria-hidden": "true", fill: "none", height: "18", viewBox: "0 0 16 16", width: "18", children: /* @__PURE__ */ l(
    "path",
    {
      d: "M10.5 2.5 13.5 5.5M2 14l3-.75 8.75-8.75a1.4 1.4 0 0 0-2-2L3.25 11.25 2 14Z",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "1.35"
    }
  ) });
}
function xn(e) {
  return Xo() ? !1 : e instanceof Qp ? (Zp(e.loginPath), !0) : !1;
}
function Mw() {
  return Zt() ? _n().section ?? ss() : ss();
}
const _w = {
  home: {
    title: "Home",
    subtitle: ""
  },
  servers: {
    title: "Servers",
    subtitle: ""
  },
  tools: {
    title: "Tools",
    subtitle: "All discovered tools across registered servers."
  },
  tool_groups: {
    title: "Tool Groups",
    subtitle: ""
  },
  prompt_groups: {
    title: "Prompt Groups",
    subtitle: "Expose a curated subset of prompts at dedicated MCP URLs."
  },
  prompts: {
    title: "Prompts",
    subtitle: "Prompt templates currently exposed through MCP Gateway."
  },
  resources: {
    title: "Resources",
    subtitle: "Resources registered and proxied through the gateway."
  },
  agent_apps: {
    title: "Agent Apps",
    subtitle: "OAuth clients scoped to attached tool and prompt groups."
  },
  diagnostics: {
    title: "System Info",
    subtitle: ""
  }
};
function Dw(e) {
  if (!e)
    return "";
  const t = e.match(/v?\d+\.\d+\.\d+/);
  return t ? t[0] : e.length > 16 ? e.slice(0, 16) : e;
}
function Jd(e, t) {
  return [.../* @__PURE__ */ new Set([...e, ...t])].sort((n, r) => n.localeCompare(r));
}
function Qd(e) {
  return e ? e.split("_").join(" ") : "unknown";
}
function Zd(e) {
  switch (e) {
    case "connected":
      return "good";
    case "reachable":
      return "warn";
    case "failed":
      return "bad";
    default:
      return "muted";
  }
}
function eu(e) {
  return e.split("_").join(" ");
}
function $i(e) {
  return e.description || "No description";
}
function Ai(e) {
  return e.description || "No description";
}
function Lw(e) {
  return e.description || "No description";
}
function tu(e) {
  return e ? JSON.stringify(e, null, 2) : "No schema available.";
}
function nu(e) {
  return !e || e.length === 0 ? "No arguments" : JSON.stringify(e, null, 2);
}
function Bn(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function Of(e) {
  const t = e.type;
  return typeof t == "string" ? t : Array.isArray(t) && t.every((n) => typeof n == "string") ? t.join(" | ") : Bn(e.properties) ? "object" : e.items ? "array" : Array.isArray(e.enum) && e.enum.length > 0 ? "enum" : "unknown";
}
function cs(e) {
  return e === void 0 ? "" : typeof e == "string" ? e : JSON.stringify(e);
}
function Rf(e) {
  const t = [];
  return Array.isArray(e.oneOf) && e.oneOf.length > 0 && t.push(`${e.oneOf.length} oneOf variants`), Array.isArray(e.anyOf) && e.anyOf.length > 0 && t.push(`${e.anyOf.length} anyOf variants`), e.additionalProperties === !0 && t.push("additional properties allowed"), t.join(", ");
}
function tr(e, t, n, r) {
  const i = {
    path: t,
    type: Of(e),
    required: n
  };
  typeof e.description == "string" && e.description.trim() && (i.description = e.description), Array.isArray(e.enum) && e.enum.length > 0 && (i.enumValues = e.enum.map((a) => cs(a))), e.default !== void 0 && (i.defaultValue = cs(e.default));
  const s = Rf(e);
  if (s && (i.note = s), r.push(i), Bn(e.properties)) {
    const a = new Set(
      Array.isArray(e.required) ? e.required.filter((c) => typeof c == "string") : []
    );
    Object.entries(e.properties).forEach(([c, u]) => {
      if (!Bn(u))
        return;
      const p = t ? `${t}.${c}` : c;
      tr(u, p, a.has(c), r);
    });
  }
  e.items && Bn(e.items) && tr(e.items, `${t}[]`, !0, r);
}
function Fw(e) {
  if (!e)
    return [];
  const t = [];
  if (Bn(e.properties)) {
    const n = new Set(
      Array.isArray(e.required) ? e.required.filter((r) => typeof r == "string") : []
    );
    return Object.entries(e.properties).forEach(([r, i]) => {
      Bn(i) && tr(i, r, n.has(r), t);
    }), t;
  }
  return tr(e, "(root)", !0, t), t;
}
function jw(e) {
  if (!e || e.length === 0)
    return [];
  const t = [];
  return e.forEach((n, r) => {
    const i = typeof n.name == "string" && n.name || typeof n.title == "string" && n.title || `arg${r + 1}`, s = {
      path: i,
      // Prompt arguments are string-like by default unless the backend explicitly provides a schema type.
      type: (() => {
        const c = Of(n);
        return c === "unknown" ? "string" : c;
      })(),
      required: !!n.required
    };
    typeof n.description == "string" && n.description.trim() && (s.description = n.description), Array.isArray(n.enum) && n.enum.length > 0 && (s.enumValues = n.enum.map((c) => cs(c))), n.default !== void 0 && (s.defaultValue = cs(n.default));
    const a = Rf(n);
    if (a && (s.note = a), t.push(s), Bn(n.properties)) {
      const c = new Set(
        Array.isArray(n.required) ? n.required.filter((u) => typeof u == "string") : []
      );
      Object.entries(n.properties).forEach(([u, p]) => {
        Bn(p) && tr(p, `${i}.${u}`, c.has(u), t);
      });
    }
    n.items && Bn(n.items) && tr(n.items, `${i}[]`, !0, t);
  }), t;
}
function nr() {
  return { key: "", value: "" };
}
function Mi() {
  return {
    name: "",
    description: "",
    transport: "streamable_http",
    session_mode: "stateless",
    command: "",
    args_text: "",
    env_rows: [nr()],
    url: "",
    bearer_token: "",
    header_rows: [nr()]
  };
}
function Bw(e) {
  const t = e.env ? Object.entries(e.env) : [], n = t.length > 0 ? t.map(([s, a]) => ({ key: s, value: String(a) })) : [nr()], r = e.headers ? Object.entries(e.headers) : [], i = r.length > 0 ? r.map(([s, a]) => ({ key: s, value: String(a) })) : [nr()];
  return {
    name: e.name,
    description: e.description ?? "",
    transport: e.transport,
    session_mode: e.session_mode ?? "stateless",
    command: e.command ?? "",
    args_text: (e.args ?? []).join(`
`),
    env_rows: n,
    url: e.url ?? "",
    bearer_token: e.bearer_token ?? "",
    header_rows: i
  };
}
function ou(e) {
  const t = {};
  return e.forEach((n) => {
    const r = n.key.trim();
    r && (t[r] = n.value);
  }), t;
}
function Ww(e) {
  return e.split(`
`).map((t) => t.trim()).filter(Boolean);
}
function zw(e) {
  return e.name.trim() ? e.transport === "stdio" && !e.command.trim() ? "Command is required for stdio servers." : (e.transport === "streamable_http" || e.transport === "sse") && !e.url.trim() ? "Target URL is required for HTTP and SSE servers." : "" : "Server name is required.";
}
function ru(e) {
  const t = {
    name: e.name.trim(),
    description: e.description.trim(),
    transport: e.transport,
    session_mode: e.session_mode
  };
  if (e.transport === "stdio") {
    t.command = e.command.trim(), t.args = Ww(e.args_text);
    const n = ou(e.env_rows);
    return Object.keys(n).length > 0 && (t.env = n), t;
  }
  if (t.url = e.url.trim(), e.bearer_token.trim() && (t.bearer_token = e.bearer_token.trim()), e.transport === "streamable_http") {
    const n = ou(e.header_rows);
    Object.keys(n).length > 0 && (t.headers = n);
  }
  return t;
}
function ua() {
  return {
    name: "",
    description: "",
    securityOption: "basic",
    selectedTools: []
  };
}
function pa() {
  return {
    name: "",
    description: "",
    securityOption: "basic",
    selectedPrompts: []
  };
}
function Vw() {
  var zl, Vl, Ul, Gl, Hl, ql, Kl, Yl, Xl, Jl, Ql, Zl, ec, tc, nc, oc, rc, ic;
  const e = Xo(), [t, n] = ve(Mw), [r, i] = ve(null), s = pm((d) => {
    var O;
    if (!e && (r != null && r.oidc_enabled) && !r.authenticated && d !== "home") {
      const _ = (O = r.login_path) == null ? void 0 : O.trim();
      _ && Zp(_);
      return;
    }
    n(d), Zt() && tt(pt(d));
  }, [r, e]), [a, c] = ve("checking_session"), [u, p] = ve(""), [f, g] = ve(null), [b, m] = ve({}), [x, h] = ve(""), [S, R] = ve(""), [k, E] = ve("all"), [w, C] = ve(""), [N, M] = ve(""), [D, L] = ve("all"), [B, I] = ve(""), [y, $] = ve("all"), [P, A] = ve(() => {
    if (!Zt()) return null;
    const d = _n();
    return d.section === "servers" ? d.serverName : null;
  }), [F, W] = ve(() => {
    if (!Zt()) return null;
    const d = _n();
    return d.section === "tools" ? d.toolCanonicalName : null;
  }), [H, te] = ve(() => {
    if (!Zt()) return null;
    const d = _n();
    return d.section === "tool_groups" ? d.toolGroupName : null;
  }), [z, V] = ve(() => {
    if (!Zt()) return null;
    const d = _n();
    return d.section === "prompt_groups" ? d.promptGroupName : null;
  }), [X, re] = ve(() => {
    if (!Zt()) return null;
    const d = _n();
    return d.section === "prompts" ? d.promptCanonicalName : null;
  }), [oe, ne] = ve(!1), [Q, Z] = ve(null), [U, J] = ve(!1), [q, ce] = ve(Mi()), [j, de] = ve(""), [Y, he] = ve(null), [Le, Re] = ve(!1), [Ke, Se] = ve(null), [Pe, Ye] = ve(ua()), [it, Fe] = ve(""), [Ae, Me] = ve(!1), [ot, _e] = ve(null), [$e, rt] = ve(pa()), [ue, Te] = ve(""), [lt, st] = ve(!1), [Ee, Pn] = ve(null), [xo, Hn] = ve(""), [no, pe] = ve(""), [De, Ct] = ve(""), [Yt, Xt] = ve(""), [Us, oo] = ve(!1), [Co, In] = ve(""), [Ot, qn] = ve(
    null
  ), [Vt, ro] = ve(() => {
    if (!Zt()) return null;
    const d = _n();
    return d.section === "agent_apps" ? d.agentAppId : null;
  }), [Gs, ni] = ve({});
  Er(() => {
    if (!Zt() || Md() !== null)
      return;
    const { pathname: d, search: O } = window.location;
    vn(d, O, pt(ss())), n(ss()), ro(null), A(null), te(null), V(null), W(null), re(null);
  }, []), Er(() => {
    if (!Zt())
      return;
    function d() {
      const O = _n();
      if (O.section !== null) {
        if (!e && (r != null && r.oidc_enabled) && !r.authenticated && O.section !== "home") {
          const { pathname: _, search: ie } = window.location;
          vn(_, ie, pt("home")), n("home"), ro(null), A(null), te(null), V(null), W(null), re(null);
          return;
        }
        n(O.section), ro(O.section === "agent_apps" ? O.agentAppId : null), A(O.section === "servers" ? O.serverName : null), te(O.section === "tool_groups" ? O.toolGroupName : null), V(O.section === "prompt_groups" ? O.promptGroupName : null), W(O.section === "tools" ? O.toolCanonicalName : null), re(O.section === "prompts" ? O.promptCanonicalName : null);
      }
    }
    return window.addEventListener("hashchange", d), () => window.removeEventListener("hashchange", d);
  }, [r]);
  async function oi(d) {
    const [O, _, ie, me, nt, wt, At, so] = await Promise.all([
      Ie.servers(),
      Ie.tools(),
      Ie.toolGroups(),
      Ie.promptGroups(),
      Ie.prompts(),
      Ie.resources(),
      Ie.diagnostics(),
      Ie.agentApps()
    ]);
    return { overview: d, servers: O, tools: _, toolGroups: ie, promptGroups: me, prompts: nt, resources: wt, diagnostics: At, agentApps: so };
  }
  async function ri() {
    const [d, O, _, ie, me, nt, wt, At, so] = await Promise.all([
      Ie.overview(),
      Ie.servers(),
      Ie.tools(),
      Ie.toolGroups(),
      Ie.promptGroups(),
      Ie.prompts(),
      Ie.resources(),
      Ie.diagnostics(),
      Ie.agentApps()
    ]);
    return { overview: d, servers: O, tools: _, toolGroups: ie, promptGroups: me, prompts: nt, resources: wt, diagnostics: At, agentApps: so };
  }
  function wo(d) {
    const { overview: O, servers: _, tools: ie, toolGroups: me, promptGroups: nt, prompts: wt, resources: At, diagnostics: so, agentApps: sc } = d;
    m({
      overview: O,
      servers: _,
      tools: ie,
      toolGroups: me,
      promptGroups: nt,
      prompts: wt,
      resources: At,
      diagnostics: so,
      agentApps: sc
    }), A((ut) => {
      if (ut === null)
        return null;
      if (_.servers.some((dn) => dn.name === ut))
        return ut;
      const { pathname: ln, search: cn } = window.location;
      return vn(ln, cn, pt("servers")), null;
    }), W((ut) => {
      if (ut === null)
        return null;
      if (ie.tools.some((dn) => dn.canonical_name === ut))
        return ut;
      const { pathname: ln, search: cn } = window.location;
      return vn(ln, cn, pt("tools")), null;
    }), te((ut) => {
      if (ut === null)
        return null;
      if (me.tool_groups.some((dn) => dn.name === ut))
        return ut;
      const { pathname: ln, search: cn } = window.location;
      return vn(ln, cn, pt("tool_groups")), null;
    }), V((ut) => {
      if (ut === null)
        return null;
      if (nt.prompt_groups.some((dn) => dn.name === ut))
        return ut;
      const { pathname: ln, search: cn } = window.location;
      return vn(ln, cn, pt("prompt_groups")), null;
    }), re((ut) => {
      if (ut === null)
        return null;
      if (wt.prompts.some((dn) => dn.canonical_name === ut))
        return ut;
      const { pathname: ln, search: cn } = window.location;
      return vn(ln, cn, pt("prompts")), null;
    }), ro((ut) => {
      if (ut === null)
        return null;
      if (sc.apps.some((dn) => dn.id === ut))
        return ut;
      const { pathname: ln, search: cn } = window.location;
      return vn(ln, cn, pt("agent_apps")), null;
    });
  }
  async function ii() {
    c("checking_session"), p("");
    try {
      if (e) {
        const _ = tf();
        if (_ === null)
          throw new Uo(
            "Missing authentication token — pass token to <MCPGatewayDashboard /> or set localStorage tenant_id_token"
          );
        const ie = nf(_);
        of(), i({
          authenticated: !0,
          oidc_enabled: !0,
          email: ie.email,
          sub: ie.sub
        }), c("loading");
        const me = await Ie.overview(), nt = await oi(me);
        wo(nt), c("ready");
        return;
      }
      const d = await Ie.authStatus();
      if (i(d), !d.oidc_enabled || d.authenticated) {
        c("loading");
        const _ = await Ie.overview(), ie = await oi(_);
        wo(ie), c("ready");
        return;
      }
      m({});
      const O = Md();
      if (O !== null && O !== "home") {
        const { pathname: _, search: ie } = window.location;
        vn(_, ie, pt("home")), n("home"), ro(null), A(null), te(null), V(null), W(null), re(null);
      }
      c("ready");
    } catch (d) {
      if (xn(d))
        return;
      const O = d instanceof Error ? d.message : "Unknown error";
      p(O), c("error");
    }
  }
  async function Lt(d = !1) {
    d || c("loading"), p("");
    try {
      const O = await ri();
      wo(O), c("ready");
    } catch (O) {
      if (xn(O))
        return;
      const _ = O instanceof Error ? O.message : "Unknown error";
      p(_), c("error");
    }
  }
  Er(() => {
    ii();
  }, []);
  const se = Rt(() => {
    var _;
    const d = ((_ = b.servers) == null ? void 0 : _.servers) ?? [];
    if (!x.trim())
      return d;
    const O = x.toLowerCase();
    return d.filter(
      (ie) => ie.name.toLowerCase().includes(O) || ie.transport.toLowerCase().includes(O) || ie.connection_summary.toLowerCase().includes(O)
    );
  }, [(zl = b.servers) == null ? void 0 : zl.servers, x]), Oe = Rt(() => {
    var _;
    let d = ((_ = b.tools) == null ? void 0 : _.tools) ?? [];
    if (k !== "all" && (d = d.filter((ie) => ie.server === k)), !S.trim())
      return d;
    const O = S.toLowerCase();
    return d.filter(
      (ie) => ie.name.toLowerCase().includes(O) || ie.server.toLowerCase().includes(O) || ie.canonical_name.toLowerCase().includes(O) || $i(ie).toLowerCase().includes(O)
    );
  }, [(Vl = b.tools) == null ? void 0 : Vl.tools, S, k]), ze = Rt(() => {
    var O;
    const d = new Set((((O = b.tools) == null ? void 0 : O.tools) ?? []).map((_) => _.server));
    return Array.from(d).sort();
  }, [(Ul = b.tools) == null ? void 0 : Ul.tools]), bt = Rt(() => {
    var _;
    let d = ((_ = b.tools) == null ? void 0 : _.tools) ?? [];
    if (D !== "all" && (d = d.filter((ie) => ie.server === D)), !N.trim())
      return d;
    const O = N.toLowerCase();
    return d.filter(
      (ie) => ie.name.toLowerCase().includes(O) || ie.canonical_name.toLowerCase().includes(O) || ie.server.toLowerCase().includes(O) || $i(ie).toLowerCase().includes(O)
    );
  }, [(Gl = b.tools) == null ? void 0 : Gl.tools, N, D]), Jt = Rt(() => {
    var O;
    const d = new Set((((O = b.prompts) == null ? void 0 : O.prompts) ?? []).map((_) => _.server));
    return Array.from(d).sort();
  }, [(Hl = b.prompts) == null ? void 0 : Hl.prompts]), si = Rt(() => {
    var _;
    let d = ((_ = b.prompts) == null ? void 0 : _.prompts) ?? [];
    if (y !== "all" && (d = d.filter((ie) => ie.server === y)), !B.trim())
      return d;
    const O = B.toLowerCase();
    return d.filter(
      (ie) => ie.name.toLowerCase().includes(O) || ie.canonical_name.toLowerCase().includes(O) || ie.server.toLowerCase().includes(O) || Ai(ie).toLowerCase().includes(O)
    );
  }, [(ql = b.prompts) == null ? void 0 : ql.prompts, B, y]), lr = Rt(() => {
    var _;
    const d = ((_ = b.prompts) == null ? void 0 : _.prompts) ?? [];
    if (!w.trim())
      return d;
    const O = w.toLowerCase();
    return d.filter(
      (ie) => ie.name.toLowerCase().includes(O) || ie.canonical_name.toLowerCase().includes(O) || ie.server.toLowerCase().includes(O) || Ai(ie).toLowerCase().includes(O)
    );
  }, [(Kl = b.prompts) == null ? void 0 : Kl.prompts, w]), ai = Rt(
    () => {
      var d;
      return [...((d = b.toolGroups) == null ? void 0 : d.tool_groups) ?? []].map((O) => O.name).sort((O, _) => O.localeCompare(_));
    },
    [(Yl = b.toolGroups) == null ? void 0 : Yl.tool_groups]
  ), li = Rt(
    () => {
      var d;
      return [...((d = b.promptGroups) == null ? void 0 : d.prompt_groups) ?? []].map((O) => O.name).sort((O, _) => O.localeCompare(_));
    },
    [(Xl = b.promptGroups) == null ? void 0 : Xl.prompt_groups]
  ), Nf = Rt(
    () => Jd(ai, De ? [De] : []),
    [ai, De]
  ), kf = Rt(
    () => Jd(li, Yt ? [Yt] : []),
    [li, Yt]
  ), cr = Rt(() => {
    var O;
    const d = (O = b.agentApps) == null ? void 0 : O.apps;
    return !(d != null && d.length) || Vt === null ? null : d.find((_) => _.id === Vt) ?? null;
  }, [(Jl = b.agentApps) == null ? void 0 : Jl.apps, Vt]), dr = Rt(() => {
    var O;
    const d = (O = b.servers) == null ? void 0 : O.servers;
    return !(d != null && d.length) || P === null ? null : d.find((_) => _.name === P) ?? null;
  }, [(Ql = b.servers) == null ? void 0 : Ql.servers, P]), ur = Rt(() => {
    var O;
    const d = (O = b.toolGroups) == null ? void 0 : O.tool_groups;
    return !(d != null && d.length) || H === null ? null : d.find((_) => _.name === H) ?? null;
  }, [(Zl = b.toolGroups) == null ? void 0 : Zl.tool_groups, H]), pr = Rt(() => {
    var O;
    const d = (O = b.promptGroups) == null ? void 0 : O.prompt_groups;
    return !(d != null && d.length) || z === null ? null : d.find((_) => _.name === z) ?? null;
  }, [(ec = b.promptGroups) == null ? void 0 : ec.prompt_groups, z]), fr = Rt(() => {
    var O;
    const d = (O = b.tools) == null ? void 0 : O.tools;
    return !(d != null && d.length) || F === null ? null : d.find((_) => _.canonical_name === F) ?? null;
  }, [(tc = b.tools) == null ? void 0 : tc.tools, F]), mr = Rt(() => {
    var O;
    const d = (O = b.prompts) == null ? void 0 : O.prompts;
    return !(d != null && d.length) || X === null ? null : d.find((_) => _.canonical_name === X) ?? null;
  }, [(nc = b.prompts) == null ? void 0 : nc.prompts, X]), $t = b.overview, $n = b.diagnostics;
  b.agentApps;
  const Ml = !e && r !== null && r.oidc_enabled && !r.authenticated, Pf = !e && (r != null && r.oidc_enabled) && r.authenticated ? ($t == null ? void 0 : $t.oidc_logout_path) ?? r.logout_path : void 0, If = e ? (oc = r == null ? void 0 : r.email) == null ? void 0 : oc.trim() : void 0, Hs = _w[t];
  function Qt(d, O) {
    ni((_) => {
      const ie = { ..._ };
      return O ? ie[d] = !0 : delete ie[d], ie;
    });
  }
  function je(d) {
    return !!Gs[d];
  }
  async function Kn(d, O, _) {
    g(null), Qt(d, !0);
    try {
      await O(), await Lt(!0), g({ tone: "success", message: _ });
    } catch (ie) {
      if (xn(ie))
        return;
      const me = ie instanceof Error ? ie.message : "Request failed";
      throw g({ tone: "error", message: me }), ie;
    } finally {
      Qt(d, !1);
    }
  }
  function Yn(d, O) {
    ce((_) => ({ ..._, [d]: O }));
  }
  function ci(d, O, _, ie) {
    ce((me) => {
      const nt = me[d].map(
        (wt, At) => At === O ? { ...wt, [_]: ie } : wt
      );
      return { ...me, [d]: nt };
    });
  }
  function _l(d) {
    ce((O) => ({ ...O, [d]: [...O[d], nr()] }));
  }
  function Dl(d, O) {
    ce((_) => {
      const ie = _[d].filter((me, nt) => nt !== O);
      return { ..._, [d]: ie.length > 0 ? ie : [nr()] };
    });
  }
  function Ll() {
    ce(Mi()), Z(null), J(!1), de(""), he(null), ne(!0);
  }
  function io() {
    ne(!1), Z(null), J(!1), de(""), he(null), ce(Mi());
  }
  async function $f(d) {
    de(""), he(null), Z(d), ne(!0), J(!0), ce(Mi());
    try {
      const O = await Ie.getServerConfig(d);
      ce(Bw(O));
    } catch (O) {
      if (xn(O))
        return;
      const _ = O instanceof Error ? O.message : "Failed to load server configuration";
      g({ tone: "error", message: _ }), io();
    } finally {
      J(!1);
    }
  }
  function Af(d = "") {
    he(null), de(d);
  }
  function Fl() {
    Se(null), Ye(ua()), Fe(""), M(""), L("all"), Re(!0);
  }
  function Mf(d) {
    Se(d.name), Ye({
      name: d.name,
      description: d.description ?? "",
      securityOption: d.security_option,
      selectedTools: d.tools.map((O) => O.canonical_name)
    }), Fe(""), M(""), L("all"), Re(!0);
  }
  function di() {
    Re(!1), Se(null), Ye(ua()), Fe("");
  }
  function _f(d) {
    Ye((O) => ({
      ...O,
      selectedTools: O.selectedTools.includes(d) ? O.selectedTools.filter((_) => _ !== d) : [...O.selectedTools, d]
    }));
  }
  function Df(d) {
    Ye((O) => ({
      ...O,
      selectedTools: O.selectedTools.filter((_) => _ !== d)
    }));
  }
  function jl() {
    _e(null), rt(pa()), Te(""), I(""), $("all"), Me(!0);
  }
  function Lf(d) {
    _e(d.name), rt({
      name: d.name,
      description: d.description ?? "",
      securityOption: d.security_option,
      selectedPrompts: d.prompts.map((O) => O.canonical_name)
    }), Te(""), I(""), $("all"), Me(!0);
  }
  function ui() {
    Me(!1), _e(null), rt(pa()), Te("");
  }
  function Ff(d) {
    rt((O) => ({
      ...O,
      selectedPrompts: O.selectedPrompts.includes(d) ? O.selectedPrompts.filter((_) => _ !== d) : [...O.selectedPrompts, d]
    }));
  }
  function jf(d) {
    rt((O) => ({
      ...O,
      selectedPrompts: O.selectedPrompts.filter((_) => _ !== d)
    }));
  }
  async function Bf() {
    const d = zw(q);
    if (d) {
      de(d);
      return;
    }
    de("");
    try {
      g(null), Qt("register-server", !0);
      const O = Q;
      if (O) {
        await Ie.updateServer(O, ru(q)), await Lt(!0), g({ tone: "success", message: `Server ${q.name.trim()} updated.` }), io();
        return;
      }
      const _ = await Ie.registerServer(ru(q));
      if (_.authorization_required) {
        he({
          authorization: _.authorization_required,
          hasOpenedBrowser: !1,
          error: ""
        }), g(null);
        return;
      }
      await Lt(!0), g({ tone: "success", message: `Server ${q.name.trim()} registered.` }), io();
    } catch (O) {
      if (xn(O))
        return;
      const _ = O instanceof Error ? O.message : "Request failed";
      de(_), g({ tone: "error", message: _ });
    } finally {
      Qt("register-server", !1);
    }
  }
  function Wf() {
    Y && (window.open(Y.authorization.authorization_url, "_blank", "noopener,noreferrer"), he(
      (d) => d && {
        ...d,
        hasOpenedBrowser: !0,
        error: ""
      }
    ));
  }
  Er(() => {
    if (!(Y != null && Y.hasOpenedBrowser))
      return;
    let d = !1;
    const O = Y.authorization.session_id;
    async function _() {
      try {
        const me = await Ie.getOAuthSession(O);
        if (d || me.status === "pending")
          return;
        if (me.status === "completed") {
          if (await Lt(!0), d)
            return;
          g({
            tone: "success",
            message: `Server ${me.server_name ?? q.name.trim()} registered.`
          }), io();
          return;
        }
        he(
          (nt) => nt && {
            ...nt,
            hasOpenedBrowser: !1,
            error: me.error || "OAuth authorization could not be completed. Start registration again."
          }
        );
      } catch (me) {
        if (d || xn(me))
          return;
        const nt = me instanceof Error ? me.message : "Failed to check OAuth authorization state.";
        he(
          (wt) => wt && {
            ...wt,
            hasOpenedBrowser: !1,
            error: nt
          }
        );
      }
    }
    _();
    const ie = window.setInterval(() => {
      _();
    }, 2e3);
    return () => {
      d = !0, window.clearInterval(ie);
    };
  }, [Y == null ? void 0 : Y.authorization.session_id, Y == null ? void 0 : Y.hasOpenedBrowser]);
  async function zf(d) {
    const O = !d.enabled;
    await Kn(
      `server-toggle:${d.name}`,
      async () => {
        await Ie.setServerEnabled(d.name, O);
      },
      `${d.name} ${O ? "enabled" : "disabled"}.`
    );
  }
  async function Vf(d) {
    if (window.confirm(
      `Delete server "${d.name}"? This removes the registration and all discovered tools, prompts, and resources from MCP Gateway.`
    ) && (await Kn(
      `server-delete:${d.name}`,
      async () => {
        await Ie.deleteServer(d.name);
      },
      `${d.name} deleted.`
    ), P === d.name)) {
      A(null);
      const { pathname: _, search: ie } = window.location;
      vn(_, ie, pt("servers"));
    }
  }
  async function Uf(d) {
    const O = !d.enabled;
    await Kn(
      `tool-toggle:${d.canonical_name}`,
      async () => {
        await Ie.setToolEnabled(d.canonical_name, O);
      },
      `${d.canonical_name} ${O ? "enabled" : "disabled"}.`
    );
  }
  async function Gf(d) {
    const O = !d.enabled;
    await Kn(
      `prompt-toggle:${d.canonical_name}`,
      async () => {
        await Ie.setPromptEnabled(d.canonical_name, O);
      },
      `${d.canonical_name} ${O ? "enabled" : "disabled"}.`
    );
  }
  async function Hf() {
    var ie;
    const d = Ke, O = d ?? Pe.name.trim();
    if (!O) {
      Fe("Group name is required.");
      return;
    }
    if (Pe.selectedTools.length === 0) {
      Fe("Select at least one tool.");
      return;
    }
    if (!d && (((ie = b.toolGroups) == null ? void 0 : ie.tool_groups) ?? []).some((me) => me.name === O)) {
      Fe("A tool group with that name already exists.");
      return;
    }
    Fe(""), g(null);
    const _ = d ? "tool-group-save" : "tool-group-create";
    Qt(_, !0);
    try {
      if (d)
        await Ie.updateToolGroup(d, {
          description: Pe.description.trim(),
          tools: Pe.selectedTools,
          security_option: Pe.securityOption
        }), await Lt(!0), g({ tone: "success", message: `Tool group ${d} updated.` });
      else {
        const me = {
          name: O,
          description: Pe.description.trim(),
          tools: Pe.selectedTools,
          security_option: Pe.securityOption
        };
        await Ie.createToolGroup(me), await Lt(!0), g({ tone: "success", message: `Tool group ${O} created.` });
      }
      di(), tt(Ti(d || O));
    } catch (me) {
      if (xn(me))
        return;
      const nt = me instanceof Error ? me.message : "Request failed";
      Fe(nt), g({ tone: "error", message: nt });
    } finally {
      Qt(_, !1);
    }
  }
  async function qf() {
    var ie;
    const d = ot, O = d ?? $e.name.trim();
    if (!O) {
      Te("Group name is required.");
      return;
    }
    if ($e.selectedPrompts.length === 0) {
      Te("Select at least one prompt.");
      return;
    }
    if (!d && (((ie = b.promptGroups) == null ? void 0 : ie.prompt_groups) ?? []).some((me) => me.name === O)) {
      Te("A prompt group with that name already exists.");
      return;
    }
    Te(""), g(null);
    const _ = d ? "prompt-group-save" : "prompt-group-create";
    Qt(_, !0);
    try {
      if (d)
        await Ie.updatePromptGroup(d, {
          description: $e.description.trim(),
          prompts: $e.selectedPrompts,
          security_option: $e.securityOption
        }), await Lt(!0), g({ tone: "success", message: `Prompt group ${d} updated.` });
      else {
        const me = {
          name: O,
          description: $e.description.trim(),
          prompts: $e.selectedPrompts,
          security_option: $e.securityOption
        };
        await Ie.createPromptGroup(me), await Lt(!0), g({ tone: "success", message: `Prompt group ${O} created.` });
      }
      ui(), tt(Ei(d || O));
    } catch (me) {
      if (xn(me))
        return;
      const nt = me instanceof Error ? me.message : "Request failed";
      Te(nt), g({ tone: "error", message: nt });
    } finally {
      Qt(_, !1);
    }
  }
  async function Kf(d) {
    window.confirm(`Delete tool group "${d.name}"?`) && await Kn(
      `tool-group-delete:${d.name}`,
      async () => {
        await Ie.deleteToolGroup(d.name);
      },
      `${d.name} deleted.`
    );
  }
  async function Yf(d) {
    window.confirm(`Delete prompt group "${d.name}"?`) && await Kn(
      `prompt-group-delete:${d.name}`,
      async () => {
        await Ie.deletePromptGroup(d.name);
      },
      `${d.name} deleted.`
    );
  }
  function Bl() {
    Pn(null), Hn(""), pe(""), Ct(""), Xt(""), oo(!1), In(""), st(!0);
  }
  function Xf(d) {
    Pn(d.id), Hn(d.name), pe(d.description ?? ""), In("");
    const O = d.tool_group_names ?? [], _ = d.prompt_group_names ?? [];
    O.length === 0 && _.length === 0 || O.length > 1 || _.length > 1 || O.length > 0 && _.length > 0 ? (Ct(""), Xt(""), oo(!0)) : (oo(!1), Ct(O[0] ?? ""), Xt(_[0] ?? "")), st(!0);
  }
  function pi() {
    st(!1), In(""), Pn(null), Hn(""), pe(""), Ct(""), Xt(""), oo(!1);
  }
  async function Jf() {
    const d = xo.trim();
    if (!d) {
      In("Name is required.");
      return;
    }
    const O = De.trim() ? [De.trim()] : [], _ = Yt.trim() ? [Yt.trim()] : [];
    if (!(O.length === 1 && _.length === 0 || O.length === 0 && _.length === 1)) {
      In("Select exactly one tool group or exactly one prompt group.");
      return;
    }
    In(""), g(null);
    const me = Ee, nt = me !== null ? `agent-app-edit:${me}` : "agent-app-create";
    Qt(nt, !0);
    try {
      if (me !== null) {
        const so = {
          name: d,
          description: no.trim(),
          tool_group_names: O,
          prompt_group_names: _
        };
        await Ie.patchAgentApp(me, so), pi(), await Lt(!0), g({ tone: "success", message: `${d} updated.` });
        return;
      }
      const wt = {
        name: d,
        description: no.trim() || void 0,
        tool_group_names: O,
        prompt_group_names: _
      }, At = await Ie.createAgentApp(wt);
      qn({
        title: `Client secret for ${At.app.name}`,
        secret: At.client_secret
      }), pi(), await Lt(!0), tt(ca(At.app.id)), g({
        tone: "success",
        message: `${At.app.name} created. Copy the client secret from the dialog — it will not be shown again.`
      });
    } catch (wt) {
      if (xn(wt))
        return;
      const At = wt instanceof Error ? wt.message : "Request failed";
      In(At), g({ tone: "error", message: At });
    } finally {
      Qt(nt, !1);
    }
  }
  async function Qf(d) {
    window.confirm(`Delete agent app "${d.name}"? This cannot be undone.`) && await Kn(
      `agent-app-delete:${d.id}`,
      async () => {
        await Ie.deleteAgentApp(d.id);
      },
      `${d.name} deleted.`
    );
  }
  async function Zf(d) {
    const O = d.status === "enabled" ? "disabled" : "enabled";
    await Kn(
      `agent-app-status:${d.id}`,
      async () => {
        await Ie.patchAgentApp(d.id, { status: O });
      },
      O === "enabled" ? `${d.name} enabled.` : `${d.name} disabled.`
    );
  }
  async function em(d) {
    if (window.confirm(
      `Rotate secret for "${d.name}"? The previous secret stops working immediately.`
    )) {
      g(null), Qt(`agent-app-rotate:${d.id}`, !0);
      try {
        const _ = await Ie.rotateAgentAppSecret(d.id);
        qn({
          title: `New client secret for ${d.name}`,
          secret: _.client_secret
        }), await Lt(!0), g({
          tone: "success",
          message: `Secret rotated for ${d.name}. Copy it from the dialog — it will not be shown again.`
        });
      } catch (_) {
        if (xn(_))
          return;
        const ie = _ instanceof Error ? _.message : "Request failed";
        g({ tone: "error", message: ie });
      } finally {
        Qt(`agent-app-rotate:${d.id}`, !1);
      }
    }
  }
  function Wl(d, O) {
    return O != null && O.length ? /* @__PURE__ */ T(Ne, { sx: { mt: 2 }, children: [
      /* @__PURE__ */ l(K, { variant: "subtitle2", sx: { mb: 1 }, children: d }),
      /* @__PURE__ */ l(ae, { spacing: 2, children: O.map((_) => /* @__PURE__ */ T(dt, { variant: "outlined", sx: { p: 1.5, borderRadius: 2 }, children: [
        /* @__PURE__ */ l(K, { variant: "body2", sx: { fontWeight: 700, mb: 1 }, children: _.name }),
        /* @__PURE__ */ T("div", { className: "tool-group-endpoints", children: [
          /* @__PURE__ */ T("div", { className: "tool-group-endpoint-row", children: [
            /* @__PURE__ */ l("span", { className: "tool-group-endpoint-label", children: "Streamable HTTP" }),
            /* @__PURE__ */ T("div", { className: "tool-group-endpoint-value", children: [
              /* @__PURE__ */ l("code", { className: "detail-target-code", title: _.streamable_http_endpoint, children: _.streamable_http_endpoint }),
              /* @__PURE__ */ l(
                mt,
                {
                  ariaLabel: "Copy Streamable HTTP endpoint",
                  title: "Copy Streamable HTTP endpoint",
                  value: _.streamable_http_endpoint
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ T("div", { className: "tool-group-endpoint-row", children: [
            /* @__PURE__ */ l("span", { className: "tool-group-endpoint-label", children: "SSE" }),
            /* @__PURE__ */ T("div", { className: "tool-group-endpoint-stack", children: [
              /* @__PURE__ */ T("div", { className: "tool-group-endpoint-value", children: [
                /* @__PURE__ */ l("code", { className: "detail-target-code", title: _.sse_endpoint, children: _.sse_endpoint }),
                /* @__PURE__ */ l(mt, { ariaLabel: "Copy SSE endpoint", title: "Copy SSE endpoint", value: _.sse_endpoint })
              ] }),
              _.sse_message_endpoint ? /* @__PURE__ */ T("div", { className: "tool-group-endpoint-value", children: [
                /* @__PURE__ */ l("code", { className: "detail-target-code", title: _.sse_message_endpoint, children: _.sse_message_endpoint }),
                /* @__PURE__ */ l(
                  mt,
                  {
                    ariaLabel: "Copy SSE message endpoint",
                    title: "Copy SSE message endpoint",
                    value: _.sse_message_endpoint
                  }
                )
              ] }) : null
            ] })
          ] })
        ] })
      ] }, _.name)) })
    ] }) : null;
  }
  function tm(d) {
    return /* @__PURE__ */ T(Ft, { children: [
      /* @__PURE__ */ T(ae, { direction: "row", spacing: 1, sx: { justifyContent: "flex-end", flexWrap: "wrap", mb: 2 }, children: [
        /* @__PURE__ */ l(
          Gt,
          {
            "aria-label": "Edit tool group",
            disabled: je("tool-group-save") || je("tool-group-create"),
            onClick: (O) => {
              O.stopPropagation(), Mf(d);
            },
            title: "Edit tool group",
            size: "small",
            children: /* @__PURE__ */ l(da, {})
          }
        ),
        /* @__PURE__ */ l(
          Gt,
          {
            "aria-label": "Delete tool group",
            color: "error",
            disabled: je(`tool-group-delete:${d.name}`),
            onClick: (O) => {
              O.stopPropagation(), Kf(d);
            },
            title: "Delete tool group",
            size: "small",
            children: /* @__PURE__ */ l(Ii, {})
          }
        )
      ] }),
      /* @__PURE__ */ T("div", { className: "tool-detail-panel", children: [
        /* @__PURE__ */ l("div", { className: "tool-detail-header", children: /* @__PURE__ */ l("p", { className: "panel-label", children: "Tool group details" }) }),
        /* @__PURE__ */ l("dl", { className: "tool-detail-meta", children: /* @__PURE__ */ T("div", { className: "tool-detail-description", children: [
          /* @__PURE__ */ l("dt", { children: "MCP security" }),
          /* @__PURE__ */ T("dd", { children: [
            Pi(d.security_option),
            " ",
            /* @__PURE__ */ T("code", { className: "identifier-code", children: [
              "(",
              d.security_option,
              ")"
            ] })
          ] })
        ] }) }),
        d.description ? /* @__PURE__ */ l("dl", { className: "tool-detail-meta", children: /* @__PURE__ */ T("div", { className: "tool-detail-description", children: [
          /* @__PURE__ */ l("dt", { children: "Description" }),
          /* @__PURE__ */ l("dd", { children: d.description })
        ] }) }) : null,
        /* @__PURE__ */ T("div", { className: "tool-schema-section", children: [
          /* @__PURE__ */ l("div", { className: "tool-schema-header", children: /* @__PURE__ */ l("h4", { children: "MCP endpoints" }) }),
          /* @__PURE__ */ T("div", { className: "tool-group-endpoints", children: [
            /* @__PURE__ */ T("div", { className: "tool-group-endpoint-row", children: [
              /* @__PURE__ */ l("span", { className: "tool-group-endpoint-label", children: "Streamable HTTP" }),
              /* @__PURE__ */ T("div", { className: "tool-group-endpoint-value", children: [
                /* @__PURE__ */ l("code", { className: "detail-target-code", title: d.streamable_http_endpoint, children: d.streamable_http_endpoint }),
                /* @__PURE__ */ l(
                  mt,
                  {
                    ariaLabel: "Copy Streamable HTTP endpoint",
                    title: "Copy Streamable HTTP endpoint",
                    value: d.streamable_http_endpoint
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ T("div", { className: "tool-group-endpoint-row", children: [
              /* @__PURE__ */ l("span", { className: "tool-group-endpoint-label", children: "SSE" }),
              /* @__PURE__ */ T("div", { className: "tool-group-endpoint-stack", children: [
                /* @__PURE__ */ T("div", { className: "tool-group-endpoint-value", children: [
                  /* @__PURE__ */ l("code", { className: "detail-target-code", title: d.sse_endpoint, children: d.sse_endpoint }),
                  /* @__PURE__ */ l(mt, { ariaLabel: "Copy SSE endpoint", title: "Copy SSE endpoint", value: d.sse_endpoint })
                ] }),
                /* @__PURE__ */ T("div", { className: "tool-group-endpoint-value", children: [
                  /* @__PURE__ */ l("code", { className: "detail-target-code", title: d.sse_message_endpoint, children: d.sse_message_endpoint }),
                  /* @__PURE__ */ l(
                    mt,
                    {
                      ariaLabel: "Copy SSE message endpoint",
                      title: "Copy SSE message endpoint",
                      value: d.sse_message_endpoint
                    }
                  )
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ T("div", { className: "tool-schema-section", children: [
          /* @__PURE__ */ l("div", { className: "tool-schema-header", children: /* @__PURE__ */ l("h4", { children: "Included tools" }) }),
          d.tools.length > 0 ? /* @__PURE__ */ l("div", { className: "schema-field-list", children: d.tools.map((O) => /* @__PURE__ */ T("article", { className: "schema-field-card", children: [
            /* @__PURE__ */ T("div", { className: "schema-field-head", children: [
              /* @__PURE__ */ l("code", { children: O.canonical_name }),
              /* @__PURE__ */ l("span", { className: "schema-type-pill", children: /* @__PURE__ */ l("code", { children: O.server }) })
            ] }),
            /* @__PURE__ */ l("dl", { className: "schema-field-meta", children: O.description ? /* @__PURE__ */ T("div", { children: [
              /* @__PURE__ */ l("dt", { children: "Description" }),
              /* @__PURE__ */ l("dd", { children: O.description })
            ] }) : null })
          ] }, O.canonical_name)) }) : /* @__PURE__ */ l("p", { className: "empty-inline", children: "No tools in this group." })
        ] })
      ] })
    ] });
  }
  function nm(d) {
    return /* @__PURE__ */ T(Ft, { children: [
      /* @__PURE__ */ T(ae, { direction: "row", spacing: 1, sx: { justifyContent: "flex-end", flexWrap: "wrap", mb: 2 }, children: [
        /* @__PURE__ */ l(
          Gt,
          {
            "aria-label": "Edit prompt group",
            disabled: je("prompt-group-save") || je("prompt-group-create"),
            onClick: (O) => {
              O.stopPropagation(), Lf(d);
            },
            title: "Edit prompt group",
            size: "small",
            children: /* @__PURE__ */ l(da, {})
          }
        ),
        /* @__PURE__ */ l(
          Gt,
          {
            "aria-label": "Delete prompt group",
            color: "error",
            disabled: je(`prompt-group-delete:${d.name}`),
            onClick: (O) => {
              O.stopPropagation(), Yf(d);
            },
            title: "Delete prompt group",
            size: "small",
            children: /* @__PURE__ */ l(Ii, {})
          }
        )
      ] }),
      /* @__PURE__ */ T("div", { className: "tool-detail-panel", children: [
        /* @__PURE__ */ l("div", { className: "tool-detail-header", children: /* @__PURE__ */ l("p", { className: "panel-label", children: "Prompt group details" }) }),
        /* @__PURE__ */ l("dl", { className: "tool-detail-meta", children: /* @__PURE__ */ T("div", { className: "tool-detail-description", children: [
          /* @__PURE__ */ l("dt", { children: "MCP security" }),
          /* @__PURE__ */ T("dd", { children: [
            Pi(d.security_option),
            " ",
            /* @__PURE__ */ T("code", { className: "identifier-code", children: [
              "(",
              d.security_option,
              ")"
            ] })
          ] })
        ] }) }),
        d.description ? /* @__PURE__ */ l("dl", { className: "tool-detail-meta", children: /* @__PURE__ */ T("div", { className: "tool-detail-description", children: [
          /* @__PURE__ */ l("dt", { children: "Description" }),
          /* @__PURE__ */ l("dd", { children: d.description })
        ] }) }) : null,
        /* @__PURE__ */ T("div", { className: "tool-schema-section", children: [
          /* @__PURE__ */ l("div", { className: "tool-schema-header", children: /* @__PURE__ */ l("h4", { children: "MCP endpoints" }) }),
          /* @__PURE__ */ T("div", { className: "tool-group-endpoints", children: [
            /* @__PURE__ */ T("div", { className: "tool-group-endpoint-row", children: [
              /* @__PURE__ */ l("span", { className: "tool-group-endpoint-label", children: "Streamable HTTP" }),
              /* @__PURE__ */ T("div", { className: "tool-group-endpoint-value", children: [
                /* @__PURE__ */ l("code", { className: "detail-target-code", title: d.streamable_http_endpoint, children: d.streamable_http_endpoint }),
                /* @__PURE__ */ l(
                  mt,
                  {
                    ariaLabel: "Copy Streamable HTTP endpoint",
                    title: "Copy Streamable HTTP endpoint",
                    value: d.streamable_http_endpoint
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ T("div", { className: "tool-group-endpoint-row", children: [
              /* @__PURE__ */ l("span", { className: "tool-group-endpoint-label", children: "SSE" }),
              /* @__PURE__ */ T("div", { className: "tool-group-endpoint-stack", children: [
                /* @__PURE__ */ T("div", { className: "tool-group-endpoint-value", children: [
                  /* @__PURE__ */ l("code", { className: "detail-target-code", title: d.sse_endpoint, children: d.sse_endpoint }),
                  /* @__PURE__ */ l(mt, { ariaLabel: "Copy SSE endpoint", title: "Copy SSE endpoint", value: d.sse_endpoint })
                ] }),
                /* @__PURE__ */ T("div", { className: "tool-group-endpoint-value", children: [
                  /* @__PURE__ */ l("code", { className: "detail-target-code", title: d.sse_message_endpoint, children: d.sse_message_endpoint }),
                  /* @__PURE__ */ l(
                    mt,
                    {
                      ariaLabel: "Copy SSE message endpoint",
                      title: "Copy SSE message endpoint",
                      value: d.sse_message_endpoint
                    }
                  )
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ T("div", { className: "tool-schema-section", children: [
          /* @__PURE__ */ l("div", { className: "tool-schema-header", children: /* @__PURE__ */ l("h4", { children: "Included prompts" }) }),
          d.prompts.length > 0 ? /* @__PURE__ */ l("div", { className: "schema-field-list", children: d.prompts.map((O) => /* @__PURE__ */ T("article", { className: "schema-field-card", children: [
            /* @__PURE__ */ T("div", { className: "schema-field-head", children: [
              /* @__PURE__ */ l("code", { children: O.canonical_name }),
              /* @__PURE__ */ l("span", { className: "schema-type-pill", children: /* @__PURE__ */ l("code", { children: O.server }) })
            ] }),
            /* @__PURE__ */ l("dl", { className: "schema-field-meta", children: O.description ? /* @__PURE__ */ T("div", { children: [
              /* @__PURE__ */ l("dt", { children: "Description" }),
              /* @__PURE__ */ l("dd", { children: O.description })
            ] }) : null })
          ] }, O.canonical_name)) }) : /* @__PURE__ */ l("p", { className: "empty-inline", children: "No prompts in this group." })
        ] })
      ] })
    ] });
  }
  function om(d) {
    var O, _;
    return /* @__PURE__ */ T(Ft, { children: [
      /* @__PURE__ */ T(ae, { direction: "row", spacing: 1, useFlexGap: !0, sx: { flexWrap: "wrap", justifyContent: "flex-end", mb: 2 }, children: [
        /* @__PURE__ */ l(mt, { ariaLabel: "Copy server name", title: "Copy server name", value: d.name }),
        /* @__PURE__ */ l(fe, { variant: "outlined", size: "small", onClick: () => void $f(d.name), children: "Edit" }),
        /* @__PURE__ */ l(
          fe,
          {
            variant: "outlined",
            size: "small",
            disabled: je(`server-toggle:${d.name}`),
            onClick: () => void zf(d),
            children: je(`server-toggle:${d.name}`) ? "Saving..." : d.enabled ? "Disable" : "Enable"
          }
        ),
        /* @__PURE__ */ l(
          Gt,
          {
            "aria-label": "Delete server",
            color: "error",
            disabled: je(`server-delete:${d.name}`),
            onClick: () => void Vf(d),
            title: "Delete server",
            size: "small",
            children: /* @__PURE__ */ l(Ii, {})
          }
        )
      ] }),
      /* @__PURE__ */ T("div", { className: "tool-detail-panel", children: [
        /* @__PURE__ */ l("div", { className: "tool-detail-header", children: /* @__PURE__ */ l("p", { className: "panel-label", children: "Server details" }) }),
        d.enabled ? null : /* @__PURE__ */ l(K, { color: "text.secondary", variant: "body2", sx: { mb: 2 }, children: "This server is registered but currently not exposed to MCP clients." }),
        /* @__PURE__ */ T("dl", { className: "tool-detail-meta", children: [
          /* @__PURE__ */ T("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ l("dt", { children: "Transport" }),
            /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ l("code", { children: Qd(d.transport) }) })
          ] }),
          /* @__PURE__ */ T("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ l("dt", { children: "Connection" }),
            /* @__PURE__ */ T("dd", { children: [
              /* @__PURE__ */ l("div", { className: "tool-state-line", children: /* @__PURE__ */ l(
                Ut,
                {
                  text: eu(d.status),
                  tone: Zd(d.status)
                }
              ) }),
              /* @__PURE__ */ l(K, { variant: "body2", color: "text.secondary", sx: { mt: 0.75 }, children: d.connection_summary })
            ] })
          ] }),
          /* @__PURE__ */ T("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ l("dt", { children: "Catalog" }),
            /* @__PURE__ */ T("dd", { children: [
              d.tool_count,
              " tools · ",
              d.prompt_count,
              " prompts · ",
              d.resource_count,
              " resources"
            ] })
          ] }),
          d.last_discovered_at ? /* @__PURE__ */ T("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ l("dt", { children: "Last discovered" }),
            /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ l("code", { children: d.last_discovered_at }) })
          ] }) : null,
          d.updated_at ? /* @__PURE__ */ T("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ l("dt", { children: "Updated" }),
            /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ l("code", { children: d.updated_at }) })
          ] }) : null,
          d.config_summary.description ? /* @__PURE__ */ T("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ l("dt", { children: "Description" }),
            /* @__PURE__ */ l("dd", { children: d.config_summary.description })
          ] }) : null
        ] }),
        /* @__PURE__ */ l("div", { className: "server-detail", style: { marginTop: "1rem" }, children: /* @__PURE__ */ T("dl", { children: [
          /* @__PURE__ */ T("div", { children: [
            /* @__PURE__ */ l("dt", { children: "Target" }),
            /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ T("div", { className: "detail-copy-row", children: [
              /* @__PURE__ */ l("code", { className: "detail-target-code", children: d.config_summary.target ?? d.config_summary.command ?? "Unknown" }),
              d.config_summary.target || d.config_summary.command ? /* @__PURE__ */ l(
                mt,
                {
                  ariaLabel: "Copy target",
                  title: "Copy target",
                  value: d.config_summary.target ?? d.config_summary.command ?? ""
                }
              ) : null
            ] }) })
          ] }),
          /* @__PURE__ */ T("div", { children: [
            /* @__PURE__ */ l("dt", { children: "Session mode" }),
            /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ l("code", { children: d.config_summary.session_mode ?? "Unknown" }) })
          ] }),
          /* @__PURE__ */ T("div", { children: [
            /* @__PURE__ */ l("dt", { children: "Header keys" }),
            /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ l("code", { children: ((O = d.config_summary.header_keys) == null ? void 0 : O.join(", ")) || "None" }) })
          ] }),
          /* @__PURE__ */ T("div", { children: [
            /* @__PURE__ */ l("dt", { children: "Env keys" }),
            /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ l("code", { children: ((_ = d.config_summary.env_keys) == null ? void 0 : _.join(", ")) || "None" }) })
          ] })
        ] }) })
      ] })
    ] });
  }
  function rm(d) {
    const O = Fw(d.input_schema);
    return /* @__PURE__ */ T(Ft, { children: [
      /* @__PURE__ */ T(ae, { direction: "row", spacing: 1, useFlexGap: !0, sx: { flexWrap: "wrap", justifyContent: "flex-end", mb: 2 }, children: [
        /* @__PURE__ */ l(
          mt,
          {
            ariaLabel: "Copy canonical name",
            title: "Copy canonical name",
            value: d.canonical_name
          }
        ),
        /* @__PURE__ */ l(
          fe,
          {
            variant: "outlined",
            size: "small",
            disabled: je(`tool-toggle:${d.canonical_name}`),
            onClick: (_) => {
              _.stopPropagation(), Uf(d);
            },
            children: je(`tool-toggle:${d.canonical_name}`) ? "Saving..." : d.enabled ? "Disable" : "Enable"
          }
        )
      ] }),
      /* @__PURE__ */ T("div", { className: "tool-detail-panel", children: [
        /* @__PURE__ */ l("div", { className: "tool-detail-header", children: /* @__PURE__ */ l("p", { className: "panel-label", children: "Tool details" }) }),
        /* @__PURE__ */ T("dl", { className: "tool-detail-meta", children: [
          /* @__PURE__ */ T("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ l("dt", { children: "Server" }),
            /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ l("code", { children: d.server }) })
          ] }),
          /* @__PURE__ */ T("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ l("dt", { children: "Canonical name" }),
            /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ l("code", { className: "identifier-code", children: d.canonical_name }) })
          ] }),
          /* @__PURE__ */ T("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ l("dt", { children: "Status" }),
            /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ T("div", { className: "tool-state-line", children: [
              /* @__PURE__ */ l(
                Ut,
                {
                  text: d.enabled ? "Enabled" : "Disabled",
                  tone: d.enabled ? "good" : "muted"
                }
              ),
              d.server_enabled ? null : /* @__PURE__ */ l(Ut, { text: "Server disabled", tone: "warn" })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ l("dl", { className: "tool-detail-meta", children: /* @__PURE__ */ T("div", { className: "tool-detail-description", children: [
          /* @__PURE__ */ l("dt", { children: "Description" }),
          /* @__PURE__ */ l("dd", { children: $i(d) })
        ] }) }),
        /* @__PURE__ */ T("div", { className: "tool-schema-section", children: [
          /* @__PURE__ */ l("div", { className: "tool-schema-header", children: /* @__PURE__ */ l("h4", { children: "Input fields" }) }),
          O.length > 0 ? /* @__PURE__ */ l("div", { className: "schema-field-list", children: O.map((_) => {
            var ie;
            return /* @__PURE__ */ T("article", { className: "schema-field-card", children: [
              /* @__PURE__ */ T("div", { className: "schema-field-head", children: [
                /* @__PURE__ */ l("code", { children: _.path }),
                /* @__PURE__ */ l("span", { className: "schema-type-pill", children: /* @__PURE__ */ l("code", { children: _.type }) })
              ] }),
              /* @__PURE__ */ T("dl", { className: "schema-field-meta", children: [
                /* @__PURE__ */ T("div", { children: [
                  /* @__PURE__ */ l("dt", { children: "Required" }),
                  /* @__PURE__ */ l("dd", { children: _.required ? "yes" : "no" })
                ] }),
                _.description ? /* @__PURE__ */ T("div", { children: [
                  /* @__PURE__ */ l("dt", { children: "Description" }),
                  /* @__PURE__ */ l("dd", { children: _.description })
                ] }) : null,
                (ie = _.enumValues) != null && ie.length ? /* @__PURE__ */ T("div", { children: [
                  /* @__PURE__ */ l("dt", { children: "Enum" }),
                  /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ l("code", { children: _.enumValues.join(", ") }) })
                ] }) : null,
                _.defaultValue ? /* @__PURE__ */ T("div", { children: [
                  /* @__PURE__ */ l("dt", { children: "Default" }),
                  /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ l("code", { children: _.defaultValue }) })
                ] }) : null,
                _.note ? /* @__PURE__ */ T("div", { children: [
                  /* @__PURE__ */ l("dt", { children: "Notes" }),
                  /* @__PURE__ */ l("dd", { children: _.note })
                ] }) : null
              ] })
            ] }, _.path);
          }) }) : /* @__PURE__ */ l("p", { className: "empty-inline", children: "No structured input fields were provided." })
        ] }),
        /* @__PURE__ */ T("details", { className: "raw-schema-disclosure", children: [
          /* @__PURE__ */ l("summary", { children: "Raw schema" }),
          /* @__PURE__ */ T("div", { className: "raw-schema-code-wrap", children: [
            /* @__PURE__ */ l(
              mt,
              {
                ariaLabel: "Copy raw schema",
                title: "Copy raw schema",
                value: tu(d.input_schema)
              }
            ),
            /* @__PURE__ */ l("pre", { className: "schema-code", children: /* @__PURE__ */ l("code", { children: tu(d.input_schema) }) })
          ] })
        ] })
      ] })
    ] });
  }
  function im(d) {
    const O = jw(d.arguments);
    return /* @__PURE__ */ T(Ft, { children: [
      /* @__PURE__ */ T(ae, { direction: "row", spacing: 1, useFlexGap: !0, sx: { flexWrap: "wrap", justifyContent: "flex-end", mb: 2 }, children: [
        /* @__PURE__ */ l(
          mt,
          {
            ariaLabel: "Copy canonical name",
            title: "Copy canonical name",
            value: d.canonical_name
          }
        ),
        /* @__PURE__ */ l(
          fe,
          {
            variant: "outlined",
            size: "small",
            disabled: je(`prompt-toggle:${d.canonical_name}`),
            onClick: (_) => {
              _.stopPropagation(), Gf(d);
            },
            children: je(`prompt-toggle:${d.canonical_name}`) ? "Saving..." : d.enabled ? "Disable" : "Enable"
          }
        )
      ] }),
      /* @__PURE__ */ T("div", { className: "tool-detail-panel", children: [
        /* @__PURE__ */ l("div", { className: "tool-detail-header", children: /* @__PURE__ */ l("p", { className: "panel-label", children: "Prompt details" }) }),
        /* @__PURE__ */ T("dl", { className: "tool-detail-meta", children: [
          /* @__PURE__ */ T("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ l("dt", { children: "Server" }),
            /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ l("code", { children: d.server }) })
          ] }),
          /* @__PURE__ */ T("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ l("dt", { children: "Canonical name" }),
            /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ l("code", { className: "identifier-code", children: d.canonical_name }) })
          ] }),
          /* @__PURE__ */ T("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ l("dt", { children: "Status" }),
            /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ T("div", { className: "tool-state-line", children: [
              /* @__PURE__ */ l(
                Ut,
                {
                  text: d.enabled ? "Enabled" : "Disabled",
                  tone: d.enabled ? "good" : "muted"
                }
              ),
              d.server_enabled ? null : /* @__PURE__ */ l(Ut, { text: "Server disabled", tone: "warn" })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ l("dl", { className: "tool-detail-meta", children: /* @__PURE__ */ T("div", { className: "tool-detail-description", children: [
          /* @__PURE__ */ l("dt", { children: "Description" }),
          /* @__PURE__ */ l("dd", { children: Ai(d) })
        ] }) }),
        /* @__PURE__ */ T("div", { className: "tool-schema-section", children: [
          /* @__PURE__ */ l("div", { className: "tool-schema-header", children: /* @__PURE__ */ l("h4", { children: "Arguments" }) }),
          O.length > 0 ? /* @__PURE__ */ l("div", { className: "schema-field-list", children: O.map((_) => {
            var ie;
            return /* @__PURE__ */ T("article", { className: "schema-field-card", children: [
              /* @__PURE__ */ T("div", { className: "schema-field-head", children: [
                /* @__PURE__ */ l("code", { children: _.path }),
                /* @__PURE__ */ l("span", { className: "schema-type-pill", children: /* @__PURE__ */ l("code", { children: _.type }) })
              ] }),
              /* @__PURE__ */ T("dl", { className: "schema-field-meta", children: [
                /* @__PURE__ */ T("div", { children: [
                  /* @__PURE__ */ l("dt", { children: "Required" }),
                  /* @__PURE__ */ l("dd", { children: _.required ? "yes" : "no" })
                ] }),
                _.description ? /* @__PURE__ */ T("div", { children: [
                  /* @__PURE__ */ l("dt", { children: "Description" }),
                  /* @__PURE__ */ l("dd", { children: _.description })
                ] }) : null,
                (ie = _.enumValues) != null && ie.length ? /* @__PURE__ */ T("div", { children: [
                  /* @__PURE__ */ l("dt", { children: "Enum" }),
                  /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ l("code", { children: _.enumValues.join(", ") }) })
                ] }) : null,
                _.defaultValue ? /* @__PURE__ */ T("div", { children: [
                  /* @__PURE__ */ l("dt", { children: "Default" }),
                  /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ l("code", { children: _.defaultValue }) })
                ] }) : null,
                _.note ? /* @__PURE__ */ T("div", { children: [
                  /* @__PURE__ */ l("dt", { children: "Notes" }),
                  /* @__PURE__ */ l("dd", { children: _.note })
                ] }) : null
              ] })
            ] }, _.path);
          }) }) : /* @__PURE__ */ l("p", { className: "empty-inline", children: "No arguments." })
        ] }),
        /* @__PURE__ */ T("details", { className: "raw-schema-disclosure", children: [
          /* @__PURE__ */ l("summary", { children: "Raw arguments" }),
          /* @__PURE__ */ l("div", { className: "raw-schema-actions", children: /* @__PURE__ */ l(
            mt,
            {
              ariaLabel: "Copy raw arguments",
              title: "Copy raw arguments",
              value: nu(d.arguments)
            }
          ) }),
          /* @__PURE__ */ l("pre", { className: "schema-code", children: /* @__PURE__ */ l("code", { children: nu(d.arguments) }) })
        ] })
      ] })
    ] });
  }
  function sm(d) {
    var _, ie;
    const O = Aw(d.oauth_token_url, d.client_id);
    return /* @__PURE__ */ T(Ft, { children: [
      /* @__PURE__ */ T(
        ae,
        {
          direction: { xs: "column", sm: "row" },
          spacing: 2,
          sx: { justifyContent: "space-between", alignItems: { sm: "flex-start" }, mb: 1 },
          children: [
            /* @__PURE__ */ T(Ne, { sx: { flex: "1 1 auto", minWidth: 0 }, children: [
              /* @__PURE__ */ l(ae, { direction: "row", spacing: 1, sx: { alignItems: "center", flexWrap: "wrap", mb: 0.5 }, children: /* @__PURE__ */ l(
                Ut,
                {
                  tone: d.status === "enabled" ? "good" : "muted",
                  text: d.status === "enabled" ? "enabled" : "disabled"
                }
              ) }),
              d.description ? /* @__PURE__ */ l(K, { variant: "body2", color: "text.secondary", sx: { mb: 1 }, children: d.description }) : null
            ] }),
            /* @__PURE__ */ T(ae, { direction: "row", spacing: 1, sx: { flexShrink: 0, flexWrap: "wrap" }, children: [
              /* @__PURE__ */ l(
                Gt,
                {
                  "aria-label": `Edit ${d.name}`,
                  color: "primary",
                  size: "small",
                  disabled: je(`agent-app-edit:${d.id}`),
                  onClick: (me) => {
                    me.stopPropagation(), Xf(d);
                  },
                  title: "Edit agent app",
                  children: /* @__PURE__ */ l(da, {})
                }
              ),
              /* @__PURE__ */ l(
                fe,
                {
                  size: "small",
                  variant: "outlined",
                  disabled: je(`agent-app-status:${d.id}`),
                  onClick: (me) => {
                    me.stopPropagation(), Zf(d);
                  },
                  children: d.status === "enabled" ? "Disable" : "Enable"
                }
              ),
              /* @__PURE__ */ l(
                fe,
                {
                  size: "small",
                  variant: "outlined",
                  color: "warning",
                  disabled: je(`agent-app-rotate:${d.id}`),
                  onClick: (me) => {
                    me.stopPropagation(), em(d);
                  },
                  children: "Rotate secret"
                }
              ),
              /* @__PURE__ */ l(
                Gt,
                {
                  "aria-label": `Delete ${d.name}`,
                  color: "error",
                  size: "small",
                  disabled: je(`agent-app-delete:${d.id}`),
                  onClick: (me) => {
                    me.stopPropagation(), Qf(d);
                  },
                  title: "Delete agent app",
                  children: /* @__PURE__ */ l(Ii, {})
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ l(K, { variant: "caption", color: "text.secondary", component: "div", sx: { mb: 0.5 }, children: "Client ID" }),
      /* @__PURE__ */ T(ae, { direction: "row", spacing: 1, sx: { alignItems: "center", mb: 1, flexWrap: "wrap" }, children: [
        /* @__PURE__ */ l(
          K,
          {
            component: "code",
            variant: "body2",
            sx: { wordBreak: "break-all", fontFamily: fo },
            children: d.client_id
          }
        ),
        /* @__PURE__ */ l(mt, { ariaLabel: "Copy client ID", title: "Copy client ID", value: d.client_id })
      ] }),
      /* @__PURE__ */ T(K, { variant: "caption", color: "text.secondary", children: [
        "Attached group:",
        " ",
        ((_ = d.tool_group_names) == null ? void 0 : _.length) === 1 ? `${d.tool_group_names[0]} (tool)` : ((ie = d.prompt_group_names) == null ? void 0 : ie.length) === 1 ? `${d.prompt_group_names[0]} (prompt)` : "— (invalid or unset — edit to fix)"
      ] }),
      /* @__PURE__ */ T(Ne, { sx: { mt: 2, pt: 2, borderTop: 1, borderColor: "divider" }, children: [
        /* @__PURE__ */ l(K, { variant: "subtitle2", sx: { mb: 1 }, children: "OAuth token URL" }),
        /* @__PURE__ */ l("div", { className: "tool-group-endpoint-row", children: /* @__PURE__ */ T("div", { className: "tool-group-endpoint-value", children: [
          /* @__PURE__ */ l("code", { className: "detail-target-code", title: d.oauth_token_url, children: d.oauth_token_url }),
          /* @__PURE__ */ l(mt, { ariaLabel: "Copy OAuth token URL", title: "Copy OAuth token URL", value: d.oauth_token_url })
        ] }) }),
        /* @__PURE__ */ T(
          vp,
          {
            variant: "outlined",
            disableGutters: !0,
            sx: {
              mt: 1.5,
              borderRadius: 2,
              "&:before": { display: "none" },
              boxShadow: "none"
            },
            children: [
              /* @__PURE__ */ l(Sp, { expandIcon: /* @__PURE__ */ l(v1, { fontSize: "small" }), children: /* @__PURE__ */ l(K, { variant: "subtitle2", children: "Get a Bearer token (curl)" }) }),
              /* @__PURE__ */ T(xp, { sx: { pt: 0 }, children: [
                /* @__PURE__ */ T(K, { variant: "body2", color: "text.secondary", sx: { mb: 1.5 }, children: [
                  "Replace ",
                  /* @__PURE__ */ l("code", { children: "YOUR_CLIENT_SECRET" }),
                  " with the secret from when you created or last rotated this app. The response JSON includes ",
                  /* @__PURE__ */ l("code", { children: "access_token" }),
                  ", ",
                  /* @__PURE__ */ l("code", { children: "token_type" }),
                  " (Bearer), and",
                  " ",
                  /* @__PURE__ */ l("code", { children: "expires_in" }),
                  " (seconds)."
                ] }),
                /* @__PURE__ */ l(dt, { variant: "outlined", sx: { p: 1.5, borderRadius: 2, bgcolor: "grey.50" }, children: /* @__PURE__ */ T(ae, { direction: { xs: "column", sm: "row" }, spacing: 1, sx: { alignItems: "flex-start" }, children: [
                  /* @__PURE__ */ l(
                    K,
                    {
                      component: "pre",
                      sx: {
                        flex: 1,
                        m: 0,
                        overflow: "auto",
                        fontSize: "0.75rem",
                        lineHeight: 1.5,
                        fontFamily: fo,
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-all"
                      },
                      children: O
                    }
                  ),
                  /* @__PURE__ */ l(mt, { ariaLabel: "Copy curl command", title: "Copy curl command", value: O })
                ] }) }),
                /* @__PURE__ */ T(K, { variant: "caption", color: "text.secondary", component: "div", sx: { mt: 1.5 }, children: [
                  "You can also POST JSON with ",
                  /* @__PURE__ */ l("code", { children: "grant_type" }),
                  ", ",
                  /* @__PURE__ */ l("code", { children: "client_id" }),
                  ", and",
                  " ",
                  /* @__PURE__ */ l("code", { children: "client_secret" }),
                  " fields and ",
                  /* @__PURE__ */ l("code", { children: "Content-Type: application/json" }),
                  "."
                ] })
              ] })
            ]
          }
        )
      ] }),
      Wl("Tool group MCP URLs", d.tool_group_endpoints),
      Wl("Prompt group MCP URLs", d.prompt_group_endpoints)
    ] });
  }
  const fi = a === "ready";
  return /* @__PURE__ */ T(Ne, { sx: { display: "flex", minHeight: e ? "100%" : "100vh", bgcolor: "background.default" }, children: [
    fi && !Ml ? /* @__PURE__ */ l(
      Iw,
      {
        active: t,
        onSelect: s,
        signOutHref: Pf,
        embedMode: e,
        signedInEmail: If
      }
    ) : null,
    /* @__PURE__ */ T(
      Ne,
      {
        component: "main",
        sx: {
          flex: 1,
          minWidth: 0,
          overflowX: "auto",
          ...fi ? { p: "18px" } : {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
            minHeight: "100vh"
          }
        },
        children: [
          fi ? /* @__PURE__ */ T(ae, { component: "header", direction: { xs: "column", lg: "row" }, spacing: 2, sx: { mb: 2 }, children: [
            t === "home" ? /* @__PURE__ */ l(Ne, { sx: { flex: "1 1 auto", minWidth: 0 }, "aria-hidden": !0 }) : /* @__PURE__ */ T(Ne, { sx: { flex: "1 1 auto", minWidth: 0 }, children: [
              /* @__PURE__ */ l(K, { variant: "h4", component: "h1", sx: { mt: "2px", fontWeight: 700, lineHeight: 1.1 }, children: Hs.title }),
              Hs.subtitle ? /* @__PURE__ */ l(K, { color: "text.secondary", sx: { mt: "6px" }, children: Hs.subtitle }) : null
            ] }),
            /* @__PURE__ */ l(
              ae,
              {
                direction: "row",
                spacing: 1,
                sx: {
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  maxWidth: { lg: 720 }
                },
                children: $t != null && $t.endpoints[0] ? /* @__PURE__ */ T(
                  ae,
                  {
                    direction: "row",
                    spacing: 1,
                    sx: {
                      alignItems: "center",
                      minWidth: 0,
                      maxWidth: "100%",
                      px: 1,
                      py: 0.75,
                      borderRadius: "14px",
                      border: 1,
                      borderColor: "divider",
                      bgcolor: "background.paper"
                    },
                    children: [
                      /* @__PURE__ */ l(
                        K,
                        {
                          component: "span",
                          variant: "caption",
                          color: "text.secondary",
                          sx: { display: { xs: "none", sm: "inline" } },
                          children: "Global Endpoint"
                        }
                      ),
                      /* @__PURE__ */ l(
                        K,
                        {
                          component: "code",
                          variant: "body2",
                          sx: {
                            flex: 1,
                            minWidth: 0,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontFamily: fo
                          },
                          title: $t.endpoints[0].url,
                          children: $t.endpoints[0].url
                        }
                      ),
                      /* @__PURE__ */ l(mt, { ariaLabel: "Copy global endpoint", title: "Copy global endpoint", value: $t.endpoints[0].url })
                    ]
                  }
                ) : null
              }
            )
          ] }) : null,
          fi && f ? /* @__PURE__ */ T(
            Aa,
            {
              severity: f.tone === "success" ? "success" : "error",
              sx: { mb: 2 },
              onClose: () => g(null),
              children: [
                /* @__PURE__ */ l("strong", { children: f.tone === "success" ? "Updated" : "Request failed" }),
                /* @__PURE__ */ T("span", { children: [
                  " ",
                  f.message
                ] })
              ]
            }
          ) : null,
          a === "checking_session" ? /* @__PURE__ */ l(dt, { variant: "outlined", sx: { p: 4, borderRadius: 2, maxWidth: 480, width: "100%" }, children: /* @__PURE__ */ T(ae, { spacing: 2, sx: { alignItems: "center" }, children: [
            /* @__PURE__ */ l(Vo, {}),
            /* @__PURE__ */ l(K, { variant: "h5", component: "h2", sx: { textAlign: "center" }, children: "Starting dashboard" }),
            /* @__PURE__ */ l(K, { color: "text.secondary", sx: { textAlign: "center" }, children: "Checking gateway access and sign-in requirements." })
          ] }) }) : null,
          a === "loading" ? /* @__PURE__ */ l(dt, { variant: "outlined", sx: { p: 4, borderRadius: 2, maxWidth: 480, width: "100%" }, children: /* @__PURE__ */ T(ae, { spacing: 2, sx: { alignItems: "center" }, children: [
            /* @__PURE__ */ l(Vo, {}),
            /* @__PURE__ */ l(K, { variant: "h5", component: "h2", children: "Loading dashboard" }),
            /* @__PURE__ */ l(K, { color: "text.secondary", sx: { textAlign: "center" }, children: "Querying local MCP Gateway state, servers, tools, prompts, and resources." })
          ] }) }) : null,
          a === "error" ? /* @__PURE__ */ T(dt, { variant: "outlined", sx: { p: 4, borderRadius: 2, borderColor: "error.light", maxWidth: 560, width: "100%" }, children: [
            /* @__PURE__ */ l(K, { variant: "h5", component: "h2", gutterBottom: !0, children: "Dashboard API unavailable" }),
            /* @__PURE__ */ l(K, { color: "text.secondary", gutterBottom: !0, children: "Failed to load dashboard data from the local server." }),
            /* @__PURE__ */ l(
              K,
              {
                component: "code",
                sx: {
                  display: "block",
                  mt: 2,
                  p: 1.5,
                  bgcolor: "grey.100",
                  borderRadius: 1,
                  fontFamily: fo,
                  wordBreak: "break-word"
                },
                children: u
              }
            )
          ] }) : null,
          a === "ready" ? /* @__PURE__ */ l("div", { className: "flex flex-col gap-[14px]", children: t === "home" ? /* @__PURE__ */ l(
            G1,
            {
              overview: $t,
              auth: r ?? void 0,
              onNavigate: s
            }
          ) : Ml ? /* @__PURE__ */ T(dt, { variant: "outlined", sx: { p: 4, maxWidth: 560, borderRadius: 2, mx: "auto" }, children: [
            /* @__PURE__ */ l(K, { variant: "h5", component: "h2", gutterBottom: !0, children: "Sign in required" }),
            /* @__PURE__ */ l(K, { color: "text.secondary", sx: { mb: 2 }, children: "Use the gateway sign-in flow to manage servers, tools, prompts, resources, and diagnostics." }),
            r != null && r.login_path ? /* @__PURE__ */ l(fe, { variant: "contained", component: "a", href: r.login_path, children: "Sign in" }) : null
          ] }) : /* @__PURE__ */ T(Ft, { children: [
            t === "servers" && b.servers ? /* @__PURE__ */ T(Ft, { children: [
              $t ? /* @__PURE__ */ T("section", { className: "dense-metrics-grid", children: [
                /* @__PURE__ */ T("div", { className: "metric-card compact-metric", children: [
                  /* @__PURE__ */ l("span", { children: "Servers" }),
                  /* @__PURE__ */ l("strong", { children: $t.server_count })
                ] }),
                /* @__PURE__ */ T("div", { className: "metric-card compact-metric", children: [
                  /* @__PURE__ */ l("span", { children: "Tools" }),
                  /* @__PURE__ */ l("strong", { children: $t.tool_count })
                ] }),
                /* @__PURE__ */ T("div", { className: "metric-card compact-metric", children: [
                  /* @__PURE__ */ l("span", { children: "Prompts" }),
                  /* @__PURE__ */ l("strong", { children: $t.prompt_count })
                ] }),
                /* @__PURE__ */ T("div", { className: "metric-card compact-metric", children: [
                  /* @__PURE__ */ l("span", { children: "Resources" }),
                  /* @__PURE__ */ l("strong", { children: $t.resource_count })
                ] })
              ] }) : null,
              P !== null ? /* @__PURE__ */ l(
                Mt,
                {
                  title: (dr == null ? void 0 : dr.name) ?? P,
                  subtitle: "Registered MCP servers",
                  action: /* @__PURE__ */ T(ae, { direction: { xs: "column", sm: "row" }, spacing: 1, sx: { alignItems: { sm: "center" } }, children: [
                    /* @__PURE__ */ l(
                      fe,
                      {
                        variant: "outlined",
                        onClick: () => {
                          tt(pt("servers"));
                        },
                        children: "← All servers"
                      }
                    ),
                    /* @__PURE__ */ l(fe, { variant: "contained", onClick: Ll, children: "+ Add Server" })
                  ] }),
                  children: dr ? om(dr) : /* @__PURE__ */ T(ae, { spacing: 2, sx: { py: 2 }, children: [
                    /* @__PURE__ */ l(K, { color: "text.secondary", variant: "body2", children: "This server does not exist or was removed. Bookmarked URLs stay valid only while the server is registered." }),
                    /* @__PURE__ */ l(
                      fe,
                      {
                        variant: "contained",
                        onClick: () => {
                          tt(pt("servers"));
                        },
                        children: "Back to all servers"
                      }
                    )
                  ] })
                }
              ) : /* @__PURE__ */ l(
                Mt,
                {
                  title: "Servers",
                  subtitle: "Registered MCP servers",
                  action: /* @__PURE__ */ T(ae, { direction: { xs: "column", sm: "row" }, spacing: 1, sx: { alignItems: { sm: "center" } }, children: [
                    /* @__PURE__ */ l(
                      vt,
                      {
                        size: "small",
                        placeholder: "Search servers",
                        value: x,
                        onChange: (d) => h(d.target.value),
                        sx: { minWidth: { sm: 220 } }
                      }
                    ),
                    /* @__PURE__ */ l(fe, { variant: "contained", onClick: Ll, children: "+ Add Server" })
                  ] }),
                  children: b.servers.empty_state && se.length === 0 ? /* @__PURE__ */ l(Po, { emptyState: b.servers.empty_state }) : /* @__PURE__ */ l(
                    Ne,
                    {
                      sx: {
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                        gap: 1.5
                      },
                      children: se.map((d) => {
                        const O = !d.enabled;
                        return /* @__PURE__ */ T(
                          dt,
                          {
                            role: "link",
                            tabIndex: 0,
                            "aria-label": `Open server ${d.name}`,
                            onClick: () => {
                              tt(_d(d.name));
                            },
                            onKeyDown: (_) => {
                              (_.key === "Enter" || _.key === " ") && (_.preventDefault(), tt(_d(d.name)));
                            },
                            elevation: 0,
                            variant: "outlined",
                            sx: {
                              p: 1.5,
                              borderRadius: 2,
                              cursor: "pointer",
                              borderColor: "divider",
                              opacity: O ? 0.82 : 1,
                              transition: "border-color 120ms ease, background-color 120ms ease, box-shadow 120ms ease",
                              "&:hover": {
                                borderColor: "primary.light",
                                bgcolor: "action.hover",
                                boxShadow: 1
                              },
                              "&:focus-visible": {
                                outline: "2px solid",
                                outlineColor: "primary.main",
                                outlineOffset: 2
                              }
                            },
                            children: [
                              /* @__PURE__ */ l(K, { variant: "subtitle2", sx: { fontWeight: 700, mb: 0.5 }, children: d.name }),
                              /* @__PURE__ */ l(
                                K,
                                {
                                  variant: "caption",
                                  color: "text.secondary",
                                  sx: { display: "block", mb: 1, wordBreak: "break-word" },
                                  children: d.connection_summary
                                }
                              ),
                              /* @__PURE__ */ l(K, { variant: "caption", color: "text.secondary", sx: { display: "block", mb: 1 }, children: /* @__PURE__ */ l("code", { children: Qd(d.transport) }) }),
                              /* @__PURE__ */ T(ae, { direction: "row", spacing: 0.5, sx: { flexWrap: "wrap", gap: 0.5, mb: 1 }, children: [
                                /* @__PURE__ */ l(
                                  Ut,
                                  {
                                    text: d.enabled ? "Enabled" : "Disabled",
                                    tone: d.enabled ? "good" : "muted"
                                  }
                                ),
                                /* @__PURE__ */ l(
                                  Ut,
                                  {
                                    text: eu(d.status),
                                    tone: Zd(d.status)
                                  }
                                )
                              ] }),
                              /* @__PURE__ */ T(K, { variant: "caption", color: "text.secondary", sx: { display: "block", mb: 1 }, children: [
                                d.tool_count,
                                " tools · ",
                                d.prompt_count,
                                " prompts · ",
                                d.resource_count,
                                " ",
                                "resources"
                              ] }),
                              /* @__PURE__ */ l(K, { variant: "caption", color: "primary", sx: { display: "block", mt: 1 }, children: "View details →" })
                            ]
                          },
                          d.name
                        );
                      })
                    }
                  )
                }
              )
            ] }) : null,
            t === "tools" && b.tools ? F !== null ? /* @__PURE__ */ l(
              Mt,
              {
                title: (fr == null ? void 0 : fr.name) ?? F ?? "Tool",
                subtitle: "Discovered tools across registered servers",
                action: /* @__PURE__ */ l(
                  fe,
                  {
                    variant: "outlined",
                    onClick: () => {
                      tt(pt("tools"));
                    },
                    children: "← All tools"
                  }
                ),
                children: fr ? rm(fr) : /* @__PURE__ */ T(ae, { spacing: 2, sx: { py: 2 }, children: [
                  /* @__PURE__ */ l(K, { color: "text.secondary", variant: "body2", children: "This tool does not exist or was removed. Bookmarked URLs stay valid only while the tool is present in the catalog." }),
                  /* @__PURE__ */ l(
                    fe,
                    {
                      variant: "contained",
                      onClick: () => {
                        tt(pt("tools"));
                      },
                      children: "Back to all tools"
                    }
                  )
                ] })
              }
            ) : /* @__PURE__ */ l(
              Mt,
              {
                title: "Tools",
                subtitle: "Discovered tools across registered servers",
                action: /* @__PURE__ */ T("div", { className: "toolbar-cluster", children: [
                  /* @__PURE__ */ l(
                    "input",
                    {
                      className: "table-filter compact-filter",
                      onChange: (d) => R(d.target.value),
                      placeholder: "Search tools",
                      value: S
                    }
                  ),
                  /* @__PURE__ */ T(
                    "select",
                    {
                      className: "table-filter compact-filter compact-select",
                      onChange: (d) => E(d.target.value),
                      value: k,
                      children: [
                        /* @__PURE__ */ l("option", { value: "all", children: "All servers" }),
                        ze.map((d) => /* @__PURE__ */ l("option", { value: d, children: d }, d))
                      ]
                    }
                  )
                ] }),
                children: b.tools.empty_state && Oe.length === 0 ? /* @__PURE__ */ l(Po, { emptyState: b.tools.empty_state }) : /* @__PURE__ */ l(
                  Ne,
                  {
                    sx: {
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                      gap: 1.5
                    },
                    children: Oe.map((d) => {
                      const O = !d.enabled || !d.server_enabled;
                      return /* @__PURE__ */ T(
                        dt,
                        {
                          role: "link",
                          tabIndex: 0,
                          "aria-label": `Open tool ${d.name}`,
                          onClick: () => {
                            tt(Dd(d.canonical_name));
                          },
                          onKeyDown: (_) => {
                            (_.key === "Enter" || _.key === " ") && (_.preventDefault(), tt(Dd(d.canonical_name)));
                          },
                          elevation: 0,
                          variant: "outlined",
                          sx: {
                            p: 1.5,
                            borderRadius: 2,
                            cursor: "pointer",
                            borderColor: "divider",
                            opacity: O ? 0.82 : 1,
                            transition: "border-color 120ms ease, background-color 120ms ease, box-shadow 120ms ease",
                            "&:hover": {
                              borderColor: "primary.light",
                              bgcolor: "action.hover",
                              boxShadow: 1
                            },
                            "&:focus-visible": {
                              outline: "2px solid",
                              outlineColor: "primary.main",
                              outlineOffset: 2
                            }
                          },
                          children: [
                            /* @__PURE__ */ l(K, { variant: "subtitle2", sx: { fontWeight: 700, mb: 0.5 }, children: d.name }),
                            /* @__PURE__ */ l(K, { variant: "caption", color: "text.secondary", sx: { display: "block", mb: 1, wordBreak: "break-all" }, children: /* @__PURE__ */ l("code", { children: d.canonical_name }) }),
                            /* @__PURE__ */ l(K, { variant: "caption", color: "text.secondary", sx: { display: "block", mb: 1 }, children: /* @__PURE__ */ l("code", { children: d.server }) }),
                            /* @__PURE__ */ T(ae, { direction: "row", spacing: 0.5, sx: { flexWrap: "wrap", gap: 0.5, mb: 1 }, children: [
                              /* @__PURE__ */ l(
                                Ut,
                                {
                                  text: d.enabled ? "Enabled" : "Disabled",
                                  tone: d.enabled ? "good" : "muted"
                                }
                              ),
                              d.server_enabled ? null : /* @__PURE__ */ l(Ut, { text: "Server off", tone: "warn" })
                            ] }),
                            /* @__PURE__ */ l(
                              K,
                              {
                                variant: "caption",
                                color: "text.secondary",
                                sx: {
                                  display: "-webkit-box",
                                  WebkitLineClamp: 3,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden"
                                },
                                children: $i(d)
                              }
                            ),
                            /* @__PURE__ */ l(K, { variant: "caption", color: "primary", sx: { display: "block", mt: 1 }, children: "View details →" })
                          ]
                        },
                        d.canonical_name
                      );
                    })
                  }
                )
              }
            ) : null,
            t === "tool_groups" && b.toolGroups ? H !== null ? /* @__PURE__ */ l(
              Mt,
              {
                title: (ur == null ? void 0 : ur.name) ?? H,
                subtitle: "",
                action: /* @__PURE__ */ T(ae, { direction: "row", spacing: 1, useFlexGap: !0, sx: { flexWrap: "wrap" }, children: [
                  /* @__PURE__ */ l(
                    fe,
                    {
                      variant: "outlined",
                      onClick: () => {
                        tt(pt("tool_groups"));
                      },
                      children: "← All tool groups"
                    }
                  ),
                  /* @__PURE__ */ l(fe, { variant: "contained", onClick: Fl, children: "+ Add Tool Group" })
                ] }),
                children: ur ? tm(ur) : /* @__PURE__ */ T(ae, { spacing: 2, sx: { py: 2 }, children: [
                  /* @__PURE__ */ l(K, { color: "text.secondary", variant: "body2", children: "This tool group does not exist or was deleted." }),
                  /* @__PURE__ */ l(
                    fe,
                    {
                      variant: "contained",
                      onClick: () => {
                        tt(pt("tool_groups"));
                      },
                      children: "Back to all tool groups"
                    }
                  )
                ] })
              }
            ) : /* @__PURE__ */ l(
              Mt,
              {
                title: "Configured tool groups",
                subtitle: "",
                action: /* @__PURE__ */ l(fe, { variant: "contained", onClick: Fl, children: "+ Add Tool Group" }),
                children: b.toolGroups.empty_state && b.toolGroups.tool_groups.length === 0 ? /* @__PURE__ */ l(Po, { emptyState: b.toolGroups.empty_state }) : /* @__PURE__ */ l(
                  Ne,
                  {
                    sx: {
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                      gap: 1.5
                    },
                    children: b.toolGroups.tool_groups.map((d) => /* @__PURE__ */ T(
                      dt,
                      {
                        role: "link",
                        tabIndex: 0,
                        "aria-label": `Open tool group ${d.name}`,
                        onClick: () => {
                          tt(Ti(d.name));
                        },
                        onKeyDown: (O) => {
                          (O.key === "Enter" || O.key === " ") && (O.preventDefault(), tt(Ti(d.name)));
                        },
                        elevation: 0,
                        variant: "outlined",
                        sx: {
                          p: 1.5,
                          borderRadius: 2,
                          cursor: "pointer",
                          borderColor: "divider",
                          transition: "border-color 120ms ease, background-color 120ms ease, box-shadow 120ms ease",
                          "&:hover": {
                            borderColor: "primary.light",
                            bgcolor: "action.hover",
                            boxShadow: 1
                          },
                          "&:focus-visible": {
                            outline: "2px solid",
                            outlineColor: "primary.main",
                            outlineOffset: 2
                          }
                        },
                        children: [
                          /* @__PURE__ */ T(ae, { direction: "row", spacing: 1, sx: { alignItems: "flex-start", mb: 1 }, children: [
                            /* @__PURE__ */ l(K, { variant: "subtitle2", sx: { fontWeight: 700, flex: 1, minWidth: 0 }, children: d.name }),
                            /* @__PURE__ */ T(
                              K,
                              {
                                variant: "caption",
                                component: "span",
                                sx: { fontWeight: 600, color: "text.secondary", flexShrink: 0 },
                                children: [
                                  d.tool_count,
                                  " tools"
                                ]
                              }
                            )
                          ] }),
                          /* @__PURE__ */ l(K, { variant: "caption", color: "text.secondary", sx: { display: "block", mb: 1 }, children: /* @__PURE__ */ l("code", { title: Pi(d.security_option), children: d.security_option }) }),
                          d.description ? /* @__PURE__ */ l(
                            K,
                            {
                              variant: "caption",
                              color: "text.secondary",
                              sx: {
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden"
                              },
                              children: d.description
                            }
                          ) : /* @__PURE__ */ l(K, { variant: "caption", color: "text.disabled", children: "No description" }),
                          /* @__PURE__ */ l(K, { variant: "caption", color: "primary", sx: { display: "block", mt: 1 }, children: "View details →" })
                        ]
                      },
                      d.name
                    ))
                  }
                )
              }
            ) : null,
            t === "prompt_groups" && b.promptGroups ? z !== null ? /* @__PURE__ */ l(
              Mt,
              {
                title: (pr == null ? void 0 : pr.name) ?? z,
                subtitle: "",
                action: /* @__PURE__ */ T(ae, { direction: "row", spacing: 1, useFlexGap: !0, sx: { flexWrap: "wrap" }, children: [
                  /* @__PURE__ */ l(
                    fe,
                    {
                      variant: "outlined",
                      onClick: () => {
                        tt(pt("prompt_groups"));
                      },
                      children: "← All prompt groups"
                    }
                  ),
                  /* @__PURE__ */ l(fe, { variant: "contained", onClick: jl, children: "+ Add Prompt Group" })
                ] }),
                children: pr ? nm(pr) : /* @__PURE__ */ T(ae, { spacing: 2, sx: { py: 2 }, children: [
                  /* @__PURE__ */ l(K, { color: "text.secondary", variant: "body2", children: "This prompt group does not exist or was deleted." }),
                  /* @__PURE__ */ l(
                    fe,
                    {
                      variant: "contained",
                      onClick: () => {
                        tt(pt("prompt_groups"));
                      },
                      children: "Back to all prompt groups"
                    }
                  )
                ] })
              }
            ) : /* @__PURE__ */ l(
              Mt,
              {
                title: "Configured prompt groups",
                subtitle: "",
                action: /* @__PURE__ */ l(fe, { variant: "contained", onClick: jl, children: "+ Add Prompt Group" }),
                children: b.promptGroups.empty_state && b.promptGroups.prompt_groups.length === 0 ? /* @__PURE__ */ l(Po, { emptyState: b.promptGroups.empty_state }) : /* @__PURE__ */ l(
                  Ne,
                  {
                    sx: {
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                      gap: 1.5
                    },
                    children: b.promptGroups.prompt_groups.map((d) => /* @__PURE__ */ T(
                      dt,
                      {
                        role: "link",
                        tabIndex: 0,
                        "aria-label": `Open prompt group ${d.name}`,
                        onClick: () => {
                          tt(Ei(d.name));
                        },
                        onKeyDown: (O) => {
                          (O.key === "Enter" || O.key === " ") && (O.preventDefault(), tt(Ei(d.name)));
                        },
                        elevation: 0,
                        variant: "outlined",
                        sx: {
                          p: 1.5,
                          borderRadius: 2,
                          cursor: "pointer",
                          borderColor: "divider",
                          transition: "border-color 120ms ease, background-color 120ms ease, box-shadow 120ms ease",
                          "&:hover": {
                            borderColor: "primary.light",
                            bgcolor: "action.hover",
                            boxShadow: 1
                          },
                          "&:focus-visible": {
                            outline: "2px solid",
                            outlineColor: "primary.main",
                            outlineOffset: 2
                          }
                        },
                        children: [
                          /* @__PURE__ */ T(ae, { direction: "row", spacing: 1, sx: { alignItems: "flex-start", mb: 1 }, children: [
                            /* @__PURE__ */ l(K, { variant: "subtitle2", sx: { fontWeight: 700, flex: 1, minWidth: 0 }, children: d.name }),
                            /* @__PURE__ */ T(
                              K,
                              {
                                variant: "caption",
                                component: "span",
                                sx: { fontWeight: 600, color: "text.secondary", flexShrink: 0 },
                                children: [
                                  d.prompt_count,
                                  " prompts"
                                ]
                              }
                            )
                          ] }),
                          /* @__PURE__ */ l(K, { variant: "caption", color: "text.secondary", sx: { display: "block", mb: 1 }, children: /* @__PURE__ */ l("code", { title: Pi(d.security_option), children: d.security_option }) }),
                          d.description ? /* @__PURE__ */ l(
                            K,
                            {
                              variant: "caption",
                              color: "text.secondary",
                              sx: {
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden"
                              },
                              children: d.description
                            }
                          ) : /* @__PURE__ */ l(K, { variant: "caption", color: "text.disabled", children: "No description" }),
                          /* @__PURE__ */ l(K, { variant: "caption", color: "primary", sx: { display: "block", mt: 1 }, children: "View details →" })
                        ]
                      },
                      d.name
                    ))
                  }
                )
              }
            ) : null,
            t === "prompts" && b.prompts ? X !== null ? /* @__PURE__ */ l(
              Mt,
              {
                title: (mr == null ? void 0 : mr.name) ?? X ?? "Prompt",
                subtitle: "Discovered prompt templates",
                action: /* @__PURE__ */ l(
                  fe,
                  {
                    variant: "outlined",
                    onClick: () => {
                      tt(pt("prompts"));
                    },
                    children: "← All prompts"
                  }
                ),
                children: mr ? im(mr) : /* @__PURE__ */ T(ae, { spacing: 2, sx: { py: 2 }, children: [
                  /* @__PURE__ */ l(K, { color: "text.secondary", variant: "body2", children: "This prompt does not exist or was removed. Bookmarked URLs stay valid only while the prompt is in the catalog." }),
                  /* @__PURE__ */ l(
                    fe,
                    {
                      variant: "contained",
                      onClick: () => {
                        tt(pt("prompts"));
                      },
                      children: "Back to all prompts"
                    }
                  )
                ] })
              }
            ) : /* @__PURE__ */ l(
              Mt,
              {
                title: "Prompts",
                subtitle: "Discovered prompt templates",
                action: /* @__PURE__ */ l("div", { className: "toolbar-cluster", children: /* @__PURE__ */ l(
                  "input",
                  {
                    className: "table-filter compact-filter",
                    onChange: (d) => C(d.target.value),
                    placeholder: "Search prompts",
                    value: w
                  }
                ) }),
                children: b.prompts.empty_state && lr.length === 0 ? /* @__PURE__ */ l(Po, { emptyState: b.prompts.empty_state }) : /* @__PURE__ */ l(
                  Ne,
                  {
                    sx: {
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                      gap: 1.5
                    },
                    children: lr.map((d) => {
                      const O = !d.enabled || !d.server_enabled;
                      return /* @__PURE__ */ T(
                        dt,
                        {
                          role: "link",
                          tabIndex: 0,
                          "aria-label": `Open prompt ${d.name}`,
                          onClick: () => {
                            tt(Ld(d.canonical_name));
                          },
                          onKeyDown: (_) => {
                            (_.key === "Enter" || _.key === " ") && (_.preventDefault(), tt(Ld(d.canonical_name)));
                          },
                          elevation: 0,
                          variant: "outlined",
                          sx: {
                            p: 1.5,
                            borderRadius: 2,
                            cursor: "pointer",
                            borderColor: "divider",
                            opacity: O ? 0.82 : 1,
                            transition: "border-color 120ms ease, background-color 120ms ease, box-shadow 120ms ease",
                            "&:hover": {
                              borderColor: "primary.light",
                              bgcolor: "action.hover",
                              boxShadow: 1
                            },
                            "&:focus-visible": {
                              outline: "2px solid",
                              outlineColor: "primary.main",
                              outlineOffset: 2
                            }
                          },
                          children: [
                            /* @__PURE__ */ l(K, { variant: "subtitle2", sx: { fontWeight: 700, mb: 0.5 }, children: d.name }),
                            /* @__PURE__ */ l(K, { variant: "caption", color: "text.secondary", sx: { display: "block", mb: 1, wordBreak: "break-all" }, children: /* @__PURE__ */ l("code", { children: d.canonical_name }) }),
                            /* @__PURE__ */ l(K, { variant: "caption", color: "text.secondary", sx: { display: "block", mb: 1 }, children: /* @__PURE__ */ l("code", { children: d.server }) }),
                            /* @__PURE__ */ T(ae, { direction: "row", spacing: 0.5, sx: { flexWrap: "wrap", gap: 0.5, mb: 1 }, children: [
                              /* @__PURE__ */ l(
                                Ut,
                                {
                                  text: d.enabled ? "Enabled" : "Disabled",
                                  tone: d.enabled ? "good" : "muted"
                                }
                              ),
                              d.server_enabled ? null : /* @__PURE__ */ l(Ut, { text: "Server off", tone: "warn" })
                            ] }),
                            /* @__PURE__ */ l(
                              K,
                              {
                                variant: "caption",
                                color: "text.secondary",
                                sx: {
                                  display: "-webkit-box",
                                  WebkitLineClamp: 3,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden"
                                },
                                children: Ai(d)
                              }
                            ),
                            /* @__PURE__ */ l(K, { variant: "caption", color: "primary", sx: { display: "block", mt: 1 }, children: "View details →" })
                          ]
                        },
                        d.canonical_name
                      );
                    })
                  }
                )
              }
            ) : null,
            t === "resources" && b.resources ? /* @__PURE__ */ l(Mt, { title: "Resources", subtitle: "Discovered MCP resources", children: b.resources.empty_state && b.resources.resources.length === 0 ? /* @__PURE__ */ l(Po, { emptyState: b.resources.empty_state }) : /* @__PURE__ */ T("table", { className: "data-table compact-table resources-table", children: [
              /* @__PURE__ */ l("thead", { children: /* @__PURE__ */ T("tr", { children: [
                /* @__PURE__ */ l("th", { children: "Name" }),
                /* @__PURE__ */ l("th", { children: "URI" }),
                /* @__PURE__ */ l("th", { children: "Server" }),
                /* @__PURE__ */ l("th", { children: "MIME" }),
                /* @__PURE__ */ l("th", { children: "Description" })
              ] }) }),
              /* @__PURE__ */ l("tbody", { children: b.resources.resources.map((d) => /* @__PURE__ */ T("tr", { children: [
                /* @__PURE__ */ l("td", { children: d.name }),
                /* @__PURE__ */ l("td", { children: /* @__PURE__ */ T("div", { className: "inline-copy resource-uri-cell", children: [
                  /* @__PURE__ */ l("code", { className: "identifier-code", title: d.uri, children: d.uri }),
                  /* @__PURE__ */ l(
                    mt,
                    {
                      ariaLabel: "Copy resource URI",
                      title: "Copy resource URI",
                      value: d.uri
                    }
                  )
                ] }) }),
                /* @__PURE__ */ l("td", { children: d.server }),
                /* @__PURE__ */ l("td", { children: /* @__PURE__ */ l("code", { children: d.mime_type || "Unknown" }) }),
                /* @__PURE__ */ l("td", { children: Lw(d) })
              ] }, d.uri)) })
            ] }) }) : null,
            t === "agent_apps" && b.agentApps ? Vt !== null ? /* @__PURE__ */ l(
              Mt,
              {
                title: (cr == null ? void 0 : cr.name) ?? `Agent app #${Vt}`,
                action: /* @__PURE__ */ T(ae, { direction: "row", spacing: 1, useFlexGap: !0, sx: { flexWrap: "wrap" }, children: [
                  /* @__PURE__ */ l(
                    fe,
                    {
                      variant: "outlined",
                      onClick: () => {
                        tt(pt("agent_apps"));
                      },
                      children: "← All apps"
                    }
                  ),
                  /* @__PURE__ */ l(fe, { variant: "contained", onClick: Bl, children: "+ Create agent app" })
                ] }),
                children: cr ? sm(cr) : /* @__PURE__ */ T(ae, { spacing: 2, sx: { py: 2 }, children: [
                  /* @__PURE__ */ l(K, { color: "text.secondary", variant: "body2", children: "This agent app does not exist or was deleted. Bookmarked URLs are only valid while the app is present." }),
                  /* @__PURE__ */ l(
                    fe,
                    {
                      variant: "contained",
                      onClick: () => {
                        tt(pt("agent_apps"));
                      },
                      children: "Back to all apps"
                    }
                  )
                ] })
              }
            ) : /* @__PURE__ */ l(
              Mt,
              {
                title: "Agent apps",
                action: /* @__PURE__ */ l(fe, { variant: "contained", onClick: Bl, children: "+ Create agent app" }),
                children: b.agentApps.apps.length === 0 ? /* @__PURE__ */ l(K, { color: "text.secondary", variant: "body2", children: "No agent apps yet. Create one to mint tokens scoped to specific tool and prompt groups." }) : /* @__PURE__ */ l(
                  Ne,
                  {
                    sx: {
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                      gap: 1.5
                    },
                    children: b.agentApps.apps.map((d) => /* @__PURE__ */ T(
                      dt,
                      {
                        role: "link",
                        tabIndex: 0,
                        "aria-label": `Open ${d.name}`,
                        onClick: () => {
                          tt(ca(d.id));
                        },
                        onKeyDown: (O) => {
                          (O.key === "Enter" || O.key === " ") && (O.preventDefault(), tt(ca(d.id)));
                        },
                        elevation: 0,
                        variant: "outlined",
                        sx: {
                          p: 1.5,
                          borderRadius: 2,
                          cursor: "pointer",
                          borderColor: "divider",
                          transition: "border-color 120ms ease, background-color 120ms ease, box-shadow 120ms ease",
                          "&:hover": {
                            borderColor: "primary.light",
                            bgcolor: "action.hover",
                            boxShadow: 1
                          },
                          "&:focus-visible": {
                            outline: "2px solid",
                            outlineColor: "primary.main",
                            outlineOffset: 2
                          }
                        },
                        children: [
                          /* @__PURE__ */ T(ae, { direction: "row", spacing: 1, sx: { alignItems: "flex-start", mb: 0.5 }, children: [
                            /* @__PURE__ */ l(K, { variant: "subtitle2", sx: { fontWeight: 700, flex: 1, minWidth: 0 }, children: d.name }),
                            /* @__PURE__ */ l(
                              Ut,
                              {
                                tone: d.status === "enabled" ? "good" : "muted",
                                text: d.status === "enabled" ? "enabled" : "disabled"
                              }
                            )
                          ] }),
                          d.description ? /* @__PURE__ */ l(
                            K,
                            {
                              variant: "caption",
                              color: "text.secondary",
                              sx: {
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden"
                              },
                              children: d.description
                            }
                          ) : /* @__PURE__ */ l(K, { variant: "caption", color: "text.disabled", children: "No description" }),
                          /* @__PURE__ */ l(K, { variant: "caption", color: "primary", sx: { display: "block", mt: 1 }, children: "View details →" })
                        ]
                      },
                      d.id
                    ))
                  }
                )
              }
            ) : null,
            t === "diagnostics" && $n ? /* @__PURE__ */ T(Ft, { children: [
              /* @__PURE__ */ T(Mt, { title: "System Info", subtitle: "Runtime details", children: [
                /* @__PURE__ */ l(
                  Ne,
                  {
                    sx: {
                      borderRadius: 2,
                      bgcolor: "grey.100",
                      border: 1,
                      borderColor: "divider",
                      px: 2.5,
                      py: 2,
                      mb: 2
                    },
                    children: /* @__PURE__ */ T(K, { variant: "body2", color: "text.secondary", sx: { lineHeight: 1.6 }, children: [
                      "This gateway is built for ",
                      /* @__PURE__ */ l("strong", { children: "local productivity" }),
                      " (fast iteration, minimal setup) and",
                      " ",
                      /* @__PURE__ */ l("strong", { children: "shared deployments" }),
                      " (prefix routing, optional SSO, Redis session store, and metrics). Use the sidebar to configure servers, inspect catalogued tools, and tune what each client can see."
                    ] })
                  }
                ),
                /* @__PURE__ */ T("div", { className: "diagnostics-grid compact-diagnostics-grid", children: [
                  /* @__PURE__ */ T("div", { className: "diag-card compact-metric", children: [
                    /* @__PURE__ */ l("span", { children: "Version" }),
                    /* @__PURE__ */ l("strong", { children: Dw($n.version) })
                  ] }),
                  /* @__PURE__ */ T("div", { className: "diag-card compact-metric", children: [
                    /* @__PURE__ */ l("span", { children: "Mode" }),
                    /* @__PURE__ */ l("strong", { children: $n.mode })
                  ] }),
                  /* @__PURE__ */ T("div", { className: "diag-card compact-metric", children: [
                    /* @__PURE__ */ l("span", { children: "Database" }),
                    /* @__PURE__ */ l("strong", { children: $n.database })
                  ] })
                ] }),
                $n.admin_access_token_masked ? /* @__PURE__ */ T(
                  Ne,
                  {
                    sx: {
                      mt: 2,
                      p: 2,
                      borderRadius: 2,
                      bgcolor: "action.hover",
                      border: 1,
                      borderColor: "divider"
                    },
                    children: [
                      /* @__PURE__ */ l(K, { variant: "subtitle2", sx: { mb: 1 }, children: "Admin API token (masked)" }),
                      /* @__PURE__ */ l(
                        K,
                        {
                          variant: "body2",
                          component: "code",
                          sx: { display: "block", fontFamily: "monospace", mb: 1.5, wordBreak: "break-all" },
                          children: $n.admin_access_token_masked
                        }
                      ),
                      /* @__PURE__ */ T(
                        Ne,
                        {
                          component: "ul",
                          sx: {
                            m: 0,
                            pl: 2.5,
                            "& li": { mb: 0.75 },
                            typography: "caption",
                            color: "text.secondary"
                          },
                          children: [
                            /* @__PURE__ */ T("li", { children: [
                              "The full secret is not shown. Send it as",
                              " ",
                              /* @__PURE__ */ l(Ne, { component: "code", sx: { fontSize: "0.85em" }, children: "Authorization: Bearer …" }),
                              " ",
                              "on",
                              " ",
                              /* @__PURE__ */ l(Ne, { component: "code", sx: { fontSize: "0.85em" }, children: "/api/v0/…" }),
                              " ",
                              "requests in enterprise mode."
                            ] }),
                            /* @__PURE__ */ T("li", { children: [
                              "Call",
                              " ",
                              /* @__PURE__ */ l(Ne, { component: "code", sx: { fontSize: "0.85em" }, children: "POST …/init" }),
                              " ",
                              "with enterprise mode; the JSON response includes",
                              " ",
                              /* @__PURE__ */ l(Ne, { component: "code", sx: { fontSize: "0.85em" }, children: "admin_access_token" }),
                              ". If your deployment logs bootstrap on first start, check server output."
                            ] })
                          ]
                        }
                      )
                    ]
                  }
                ) : null
              ] }),
              /* @__PURE__ */ l(Mt, { title: "Runtime details", subtitle: "System information", children: /* @__PURE__ */ T("dl", { className: "diagnostic-list compact-diagnostic-list", children: [
                /* @__PURE__ */ T("div", { children: [
                  /* @__PURE__ */ l("dt", { children: "Full build" }),
                  /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ l("code", { children: $n.version }) })
                ] }),
                /* @__PURE__ */ T("div", { children: [
                  /* @__PURE__ */ l("dt", { children: "Global MCP Endpoint" }),
                  /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ l("code", { children: $n.primary_endpoint }) })
                ] }),
                /* @__PURE__ */ T("div", { children: [
                  /* @__PURE__ */ l("dt", { children: "Enabled transports" }),
                  /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ l("code", { children: $n.enabled_transports.join(", ") }) })
                ] })
              ] }) })
            ] }) : null
          ] }) }) : null,
          /* @__PURE__ */ T($o, { open: Le, onClose: di, maxWidth: "md", fullWidth: !0, scroll: "paper", children: [
            /* @__PURE__ */ l(_o, { sx: { pr: 6 }, children: /* @__PURE__ */ T(
              ae,
              {
                direction: "row",
                spacing: 2,
                sx: { justifyContent: "space-between", alignItems: "flex-start" },
                children: [
                  /* @__PURE__ */ T(Ne, { children: [
                    /* @__PURE__ */ l(K, { variant: "caption", sx: { letterSpacing: "0.12em", fontWeight: 600 }, children: "Tool Groups" }),
                    /* @__PURE__ */ l(K, { variant: "h5", sx: { mt: 0.5 }, children: Ke ? "Edit Tool Group" : "Add Tool Group" })
                  ] }),
                  /* @__PURE__ */ l(fe, { variant: "outlined", size: "small", onClick: di, children: "Close" })
                ]
              }
            ) }),
            /* @__PURE__ */ l(Mo, { dividers: !0, children: /* @__PURE__ */ T(ae, { spacing: 2, children: [
              /* @__PURE__ */ l(
                vt,
                {
                  label: "Group name",
                  placeholder: "coding",
                  fullWidth: !0,
                  size: "small",
                  value: Pe.name,
                  disabled: Ke !== null,
                  helperText: Ke ? "Group name cannot be changed." : void 0,
                  onChange: (d) => Ye((O) => ({ ...O, name: d.target.value }))
                }
              ),
              /* @__PURE__ */ l(
                vt,
                {
                  label: "Description",
                  placeholder: "Tools useful for coding workflows",
                  fullWidth: !0,
                  size: "small",
                  value: Pe.description,
                  onChange: (d) => Ye((O) => ({ ...O, description: d.target.value }))
                }
              ),
              /* @__PURE__ */ T(Cn, { size: "small", fullWidth: !0, children: [
                /* @__PURE__ */ l(wn, { id: "tg-mcp-security-label", children: "MCP security" }),
                /* @__PURE__ */ l(
                  pn,
                  {
                    labelId: "tg-mcp-security-label",
                    label: "MCP security",
                    value: Pe.securityOption,
                    onChange: (d) => Ye((O) => ({
                      ...O,
                      securityOption: d.target.value
                    })),
                    children: Va.map((d) => /* @__PURE__ */ l(It, { value: d.value, children: d.label }, d.value))
                  }
                )
              ] }),
              /* @__PURE__ */ T("div", { className: "tool-group-builder", children: [
                /* @__PURE__ */ T("div", { className: "tool-group-selector panel", children: [
                  /* @__PURE__ */ l("div", { className: "tool-group-selector-header", children: /* @__PURE__ */ l("strong", { children: "Available tools" }) }),
                  (((rc = b.tools) == null ? void 0 : rc.tools.length) ?? 0) > 0 ? /* @__PURE__ */ T(Ft, { children: [
                    /* @__PURE__ */ T(ae, { direction: { xs: "column", sm: "row" }, spacing: 1, sx: { mb: 1 }, children: [
                      /* @__PURE__ */ l(
                        vt,
                        {
                          placeholder: "Search tools",
                          size: "small",
                          value: N,
                          onChange: (d) => M(d.target.value),
                          sx: { flex: 1, minWidth: 0 }
                        }
                      ),
                      /* @__PURE__ */ T(Cn, { size: "small", sx: { minWidth: 160 }, children: [
                        /* @__PURE__ */ l(wn, { id: "tg-server-filter", children: "Server" }),
                        /* @__PURE__ */ T(
                          pn,
                          {
                            labelId: "tg-server-filter",
                            label: "Server",
                            value: D,
                            onChange: (d) => L(d.target.value),
                            children: [
                              /* @__PURE__ */ l(It, { value: "all", children: "All servers" }),
                              ze.map((d) => /* @__PURE__ */ l(It, { value: d, children: d }, d))
                            ]
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ l("div", { className: "tool-pick-list", children: bt.map((d) => {
                      const O = Pe.selectedTools.includes(d.canonical_name);
                      return /* @__PURE__ */ T(
                        "button",
                        {
                          className: `tool-pick-item ${O ? "is-selected" : ""}`,
                          onClick: () => _f(d.canonical_name),
                          type: "button",
                          children: [
                            /* @__PURE__ */ l("div", { className: "table-primary", children: d.name }),
                            /* @__PURE__ */ l("code", { className: "identifier-code", title: d.canonical_name, children: d.canonical_name }),
                            /* @__PURE__ */ l("div", { className: "table-secondary", children: d.server })
                          ]
                        },
                        d.canonical_name
                      );
                    }) })
                  ] }) : /* @__PURE__ */ l("p", { className: "empty-inline", children: "Register MCP servers first so tools are available to group." })
                ] }),
                /* @__PURE__ */ T("div", { className: "tool-group-selector panel", children: [
                  /* @__PURE__ */ l("div", { className: "tool-group-selector-header", children: /* @__PURE__ */ l("strong", { children: "Selected tools" }) }),
                  Pe.selectedTools.length > 0 ? /* @__PURE__ */ l("div", { className: "selected-tool-list", children: Pe.selectedTools.map((d) => /* @__PURE__ */ T(
                    "button",
                    {
                      className: "selected-tool-chip",
                      onClick: () => Df(d),
                      type: "button",
                      children: [
                        /* @__PURE__ */ l("code", { children: d }),
                        /* @__PURE__ */ l("span", { children: "Remove" })
                      ]
                    },
                    d
                  )) }) : /* @__PURE__ */ l("p", { className: "empty-inline", children: "Select at least one tool." })
                ] })
              ] }),
              it ? /* @__PURE__ */ l(K, { color: "error", variant: "body2", children: it }) : null
            ] }) }),
            /* @__PURE__ */ T(Ao, { sx: { px: 3, py: 2 }, children: [
              /* @__PURE__ */ l(fe, { variant: "outlined", onClick: di, children: "Cancel" }),
              /* @__PURE__ */ l(
                fe,
                {
                  variant: "contained",
                  disabled: je("tool-group-create") || je("tool-group-save"),
                  onClick: () => void Hf(),
                  children: je("tool-group-create") || je("tool-group-save") ? "Saving..." : Ke ? "Save changes" : "+ Add Tool Group"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ T($o, { open: Ae, onClose: ui, maxWidth: "md", fullWidth: !0, scroll: "paper", children: [
            /* @__PURE__ */ l(_o, { sx: { pr: 6 }, children: /* @__PURE__ */ T(
              ae,
              {
                direction: "row",
                spacing: 2,
                sx: { justifyContent: "space-between", alignItems: "flex-start" },
                children: [
                  /* @__PURE__ */ T(Ne, { children: [
                    /* @__PURE__ */ l(K, { variant: "caption", sx: { letterSpacing: "0.12em", fontWeight: 600 }, children: "Prompt Groups" }),
                    /* @__PURE__ */ l(K, { variant: "h5", sx: { mt: 0.5 }, children: ot ? "Edit Prompt Group" : "Add Prompt Group" })
                  ] }),
                  /* @__PURE__ */ l(fe, { variant: "outlined", size: "small", onClick: ui, children: "Close" })
                ]
              }
            ) }),
            /* @__PURE__ */ l(Mo, { dividers: !0, children: /* @__PURE__ */ T(ae, { spacing: 2, children: [
              /* @__PURE__ */ l(
                vt,
                {
                  label: "Group name",
                  placeholder: "reviews",
                  fullWidth: !0,
                  size: "small",
                  value: $e.name,
                  disabled: ot !== null,
                  helperText: ot ? "Group name cannot be changed." : void 0,
                  onChange: (d) => rt((O) => ({ ...O, name: d.target.value }))
                }
              ),
              /* @__PURE__ */ l(
                vt,
                {
                  label: "Description",
                  placeholder: "Prompts useful for PR review workflows",
                  fullWidth: !0,
                  size: "small",
                  value: $e.description,
                  onChange: (d) => rt((O) => ({ ...O, description: d.target.value }))
                }
              ),
              /* @__PURE__ */ T(Cn, { size: "small", fullWidth: !0, children: [
                /* @__PURE__ */ l(wn, { id: "pg-mcp-security-label", children: "MCP security" }),
                /* @__PURE__ */ l(
                  pn,
                  {
                    labelId: "pg-mcp-security-label",
                    label: "MCP security",
                    value: $e.securityOption,
                    onChange: (d) => rt((O) => ({
                      ...O,
                      securityOption: d.target.value
                    })),
                    children: Va.map((d) => /* @__PURE__ */ l(It, { value: d.value, children: d.label }, d.value))
                  }
                )
              ] }),
              /* @__PURE__ */ T("div", { className: "tool-group-builder", children: [
                /* @__PURE__ */ T("div", { className: "tool-group-selector panel", children: [
                  /* @__PURE__ */ l("div", { className: "tool-group-selector-header", children: /* @__PURE__ */ l("strong", { children: "Available prompts" }) }),
                  (((ic = b.prompts) == null ? void 0 : ic.prompts.length) ?? 0) > 0 ? /* @__PURE__ */ T(Ft, { children: [
                    /* @__PURE__ */ T(ae, { direction: { xs: "column", sm: "row" }, spacing: 1, sx: { mb: 1 }, children: [
                      /* @__PURE__ */ l(
                        vt,
                        {
                          placeholder: "Search prompts",
                          size: "small",
                          value: B,
                          onChange: (d) => I(d.target.value),
                          sx: { flex: 1, minWidth: 0 }
                        }
                      ),
                      /* @__PURE__ */ T(Cn, { size: "small", sx: { minWidth: 160 }, children: [
                        /* @__PURE__ */ l(wn, { id: "pg-server-filter", children: "Server" }),
                        /* @__PURE__ */ T(
                          pn,
                          {
                            labelId: "pg-server-filter",
                            label: "Server",
                            value: y,
                            onChange: (d) => $(d.target.value),
                            children: [
                              /* @__PURE__ */ l(It, { value: "all", children: "All servers" }),
                              Jt.map((d) => /* @__PURE__ */ l(It, { value: d, children: d }, d))
                            ]
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ l("div", { className: "tool-pick-list", children: si.map((d) => {
                      const O = $e.selectedPrompts.includes(d.canonical_name);
                      return /* @__PURE__ */ T(
                        "button",
                        {
                          className: `tool-pick-item ${O ? "is-selected" : ""}`,
                          onClick: () => Ff(d.canonical_name),
                          type: "button",
                          children: [
                            /* @__PURE__ */ l("div", { className: "table-primary", children: d.name }),
                            /* @__PURE__ */ l("code", { className: "identifier-code", title: d.canonical_name, children: d.canonical_name }),
                            /* @__PURE__ */ l("div", { className: "table-secondary", children: d.server })
                          ]
                        },
                        d.canonical_name
                      );
                    }) })
                  ] }) : /* @__PURE__ */ l("p", { className: "empty-inline", children: "Register MCP servers first so prompts are available to group." })
                ] }),
                /* @__PURE__ */ T("div", { className: "tool-group-selector panel", children: [
                  /* @__PURE__ */ l("div", { className: "tool-group-selector-header", children: /* @__PURE__ */ l("strong", { children: "Selected prompts" }) }),
                  $e.selectedPrompts.length > 0 ? /* @__PURE__ */ l("div", { className: "selected-tool-list", children: $e.selectedPrompts.map((d) => /* @__PURE__ */ T(
                    "button",
                    {
                      className: "selected-tool-chip",
                      onClick: () => jf(d),
                      type: "button",
                      children: [
                        /* @__PURE__ */ l("code", { children: d }),
                        /* @__PURE__ */ l("span", { children: "Remove" })
                      ]
                    },
                    d
                  )) }) : /* @__PURE__ */ l("p", { className: "empty-inline", children: "Select at least one prompt." })
                ] })
              ] }),
              ue ? /* @__PURE__ */ l(K, { color: "error", variant: "body2", children: ue }) : null
            ] }) }),
            /* @__PURE__ */ T(Ao, { sx: { px: 3, py: 2 }, children: [
              /* @__PURE__ */ l(fe, { variant: "outlined", onClick: ui, children: "Cancel" }),
              /* @__PURE__ */ l(
                fe,
                {
                  variant: "contained",
                  disabled: je("prompt-group-create") || je("prompt-group-save"),
                  onClick: () => void qf(),
                  children: je("prompt-group-create") || je("prompt-group-save") ? "Saving..." : ot ? "Save changes" : "+ Add Prompt Group"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ T($o, { open: oe, onClose: io, maxWidth: "sm", fullWidth: !0, scroll: "paper", children: [
            /* @__PURE__ */ l(_o, { sx: { pr: 6 }, children: /* @__PURE__ */ T(
              ae,
              {
                direction: "row",
                spacing: 2,
                sx: { justifyContent: "space-between", alignItems: "flex-start" },
                children: [
                  /* @__PURE__ */ T(Ne, { children: [
                    /* @__PURE__ */ l(K, { variant: "caption", sx: { letterSpacing: "0.12em", fontWeight: 600 }, children: Q ? "Edit server" : "Add server" }),
                    /* @__PURE__ */ l(K, { variant: "h5", sx: { mt: 0.5 }, children: Y ? "Complete OAuth authorization" : Q ? "Edit MCP server" : "Register an MCP server" })
                  ] }),
                  /* @__PURE__ */ l(fe, { variant: "outlined", size: "small", onClick: io, children: "Close" })
                ]
              }
            ) }),
            /* @__PURE__ */ l(Mo, { dividers: !0, children: U ? /* @__PURE__ */ l(ae, { sx: { alignItems: "center", justifyContent: "center", py: 6 }, children: /* @__PURE__ */ l(Vo, {}) }) : Y ? /* @__PURE__ */ T(ae, { spacing: 2, className: "oauth-step", children: [
              /* @__PURE__ */ l(K, { children: "This MCP server requires OAuth authorization. Continue in your browser to complete registration." }),
              /* @__PURE__ */ l(dt, { variant: "outlined", sx: { p: 2, borderRadius: 2 }, children: /* @__PURE__ */ T(ae, { spacing: 0.5, children: [
                /* @__PURE__ */ l(K, { variant: "caption", color: "text.secondary", children: "Status" }),
                /* @__PURE__ */ l(K, { variant: "body1", sx: { fontWeight: 600 }, children: Y.hasOpenedBrowser ? "Waiting for OAuth authorization..." : "Authorization required" }),
                Y.authorization.expires_at ? /* @__PURE__ */ T(K, { variant: "body2", color: "text.secondary", children: [
                  "Expires ",
                  new Date(Y.authorization.expires_at).toLocaleTimeString()
                ] }) : null
              ] }) }),
              Y.error ? /* @__PURE__ */ l(K, { color: "error", variant: "body2", children: Y.error }) : null
            ] }) : /* @__PURE__ */ T(ae, { spacing: 2, children: [
              /* @__PURE__ */ l(
                vt,
                {
                  label: "Server name",
                  placeholder: q.transport === "streamable_http" ? "context7" : "filesystem",
                  fullWidth: !0,
                  size: "small",
                  value: q.name,
                  disabled: Q !== null,
                  onChange: (d) => Yn("name", d.target.value)
                }
              ),
              /* @__PURE__ */ l(
                vt,
                {
                  label: "Description",
                  placeholder: q.transport === "streamable_http" ? "context7 mcp server" : "Local filesystem access",
                  fullWidth: !0,
                  size: "small",
                  value: q.description,
                  onChange: (d) => Yn("description", d.target.value)
                }
              ),
              /* @__PURE__ */ T(ae, { direction: { xs: "column", md: "row" }, spacing: 2, children: [
                /* @__PURE__ */ T(Cn, { fullWidth: !0, size: "small", children: [
                  /* @__PURE__ */ l(wn, { id: "reg-transport", children: "Transport" }),
                  /* @__PURE__ */ T(
                    pn,
                    {
                      labelId: "reg-transport",
                      label: "Transport",
                      value: q.transport,
                      disabled: Q !== null,
                      onChange: (d) => Yn(
                        "transport",
                        d.target.value
                      ),
                      children: [
                        /* @__PURE__ */ l(It, { value: "stdio", children: "stdio" }),
                        /* @__PURE__ */ l(It, { value: "streamable_http", children: "streamable_http" }),
                        /* @__PURE__ */ l(It, { value: "sse", children: "sse" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ T(Cn, { fullWidth: !0, size: "small", children: [
                  /* @__PURE__ */ l(wn, { id: "reg-session", children: "Session mode" }),
                  /* @__PURE__ */ T(
                    pn,
                    {
                      labelId: "reg-session",
                      label: "Session mode",
                      value: q.session_mode,
                      onChange: (d) => Yn(
                        "session_mode",
                        d.target.value
                      ),
                      children: [
                        /* @__PURE__ */ l(It, { value: "stateless", children: "stateless" }),
                        /* @__PURE__ */ l(It, { value: "stateful", children: "stateful" })
                      ]
                    }
                  )
                ] })
              ] }),
              q.transport === "stdio" ? /* @__PURE__ */ T(ae, { spacing: 2, children: [
                /* @__PURE__ */ l(
                  vt,
                  {
                    label: "Command",
                    placeholder: "npx",
                    fullWidth: !0,
                    size: "small",
                    value: q.command,
                    onChange: (d) => Yn("command", d.target.value)
                  }
                ),
                /* @__PURE__ */ l(
                  vt,
                  {
                    label: "Arguments",
                    placeholder: "-y\\n@modelcontextprotocol/server-filesystem",
                    fullWidth: !0,
                    size: "small",
                    multiline: !0,
                    minRows: 3,
                    value: q.args_text,
                    onChange: (d) => Yn("args_text", d.target.value)
                  }
                ),
                /* @__PURE__ */ T(Ne, { children: [
                  /* @__PURE__ */ l(K, { variant: "subtitle2", gutterBottom: !0, children: "Environment variables" }),
                  /* @__PURE__ */ l(ae, { spacing: 1, children: q.env_rows.map((d, O) => /* @__PURE__ */ T(ae, { direction: { xs: "column", sm: "row" }, spacing: 1, children: [
                    /* @__PURE__ */ l(
                      vt,
                      {
                        size: "small",
                        label: "KEY",
                        placeholder: "KEY",
                        value: d.key,
                        onChange: (_) => ci("env_rows", O, "key", _.target.value),
                        sx: { flex: 1 }
                      }
                    ),
                    /* @__PURE__ */ l(
                      vt,
                      {
                        size: "small",
                        label: "value",
                        placeholder: "value",
                        value: d.value,
                        onChange: (_) => ci("env_rows", O, "value", _.target.value),
                        sx: { flex: 1 }
                      }
                    ),
                    /* @__PURE__ */ l(
                      fe,
                      {
                        variant: "outlined",
                        onClick: () => Dl("env_rows", O),
                        sx: { alignSelf: { sm: "center" } },
                        children: "Remove"
                      }
                    )
                  ] }, `env-${O}`)) }),
                  /* @__PURE__ */ l(
                    fe,
                    {
                      variant: "outlined",
                      size: "small",
                      sx: { mt: 1 },
                      onClick: () => _l("env_rows"),
                      children: "Add env var"
                    }
                  )
                ] })
              ] }) : /* @__PURE__ */ T(ae, { spacing: 2, children: [
                /* @__PURE__ */ l(
                  vt,
                  {
                    label: "Target URL",
                    fullWidth: !0,
                    size: "small",
                    placeholder: q.transport === "streamable_http" ? "https://mcp.context7.com/mcp" : "http://127.0.0.1:8000/mcp",
                    value: q.url,
                    onChange: (d) => Yn("url", d.target.value)
                  }
                ),
                /* @__PURE__ */ l(
                  vt,
                  {
                    label: "Bearer token",
                    fullWidth: !0,
                    size: "small",
                    type: "password",
                    placeholder: "Optional",
                    value: q.bearer_token,
                    onChange: (d) => Yn("bearer_token", d.target.value),
                    helperText: Q !== null ? "Leave blank to keep the current bearer token." : void 0
                  }
                ),
                q.transport === "streamable_http" ? /* @__PURE__ */ T(Ne, { children: [
                  /* @__PURE__ */ l(K, { variant: "subtitle2", gutterBottom: !0, children: "Headers" }),
                  /* @__PURE__ */ l(ae, { spacing: 1, children: q.header_rows.map((d, O) => /* @__PURE__ */ T(ae, { direction: { xs: "column", sm: "row" }, spacing: 1, children: [
                    /* @__PURE__ */ l(
                      vt,
                      {
                        size: "small",
                        label: "Header",
                        placeholder: "Header",
                        value: d.key,
                        onChange: (_) => ci("header_rows", O, "key", _.target.value),
                        sx: { flex: 1 }
                      }
                    ),
                    /* @__PURE__ */ l(
                      vt,
                      {
                        size: "small",
                        label: "Value",
                        placeholder: "Value",
                        value: d.value,
                        onChange: (_) => ci("header_rows", O, "value", _.target.value),
                        sx: { flex: 1 }
                      }
                    ),
                    /* @__PURE__ */ l(
                      fe,
                      {
                        variant: "outlined",
                        onClick: () => Dl("header_rows", O),
                        sx: { alignSelf: { sm: "center" } },
                        children: "Remove"
                      }
                    )
                  ] }, `header-${O}`)) }),
                  /* @__PURE__ */ l(
                    fe,
                    {
                      variant: "outlined",
                      size: "small",
                      sx: { mt: 1 },
                      onClick: () => _l("header_rows"),
                      children: "Add header"
                    }
                  )
                ] }) : null
              ] }),
              j ? /* @__PURE__ */ l(K, { color: "error", variant: "body2", children: j }) : null
            ] }) }),
            /* @__PURE__ */ l(Ao, { sx: { px: 3, py: 2, flexWrap: "wrap", gap: 1 }, children: Y ? /* @__PURE__ */ T(Ft, { children: [
              /* @__PURE__ */ l(
                fe,
                {
                  variant: "outlined",
                  onClick: () => Af("Start registration again to retry OAuth."),
                  children: "Start over"
                }
              ),
              /* @__PURE__ */ l(fe, { variant: "contained", onClick: Wf, children: Y.hasOpenedBrowser ? "Open OAuth again" : "Continue OAuth" })
            ] }) : /* @__PURE__ */ T(Ft, { children: [
              /* @__PURE__ */ l(fe, { variant: "outlined", onClick: io, children: "Cancel" }),
              /* @__PURE__ */ l(
                fe,
                {
                  variant: "contained",
                  disabled: je("register-server") || U,
                  onClick: () => void Bf(),
                  children: je("register-server") ? Q ? "Saving..." : "Registering..." : Q ? "Save changes" : "+ Add Server"
                }
              )
            ] }) })
          ] }),
          /* @__PURE__ */ T($o, { open: lt, onClose: pi, maxWidth: "sm", fullWidth: !0, scroll: "paper", children: [
            /* @__PURE__ */ l(_o, { children: Ee !== null ? "Edit agent app" : "Create agent app" }),
            /* @__PURE__ */ l(Mo, { dividers: !0, children: /* @__PURE__ */ T(ae, { spacing: 2, sx: { pt: 1 }, children: [
              /* @__PURE__ */ l(
                vt,
                {
                  label: "Name",
                  fullWidth: !0,
                  required: !0,
                  size: "small",
                  value: xo,
                  onChange: (d) => Hn(d.target.value)
                }
              ),
              /* @__PURE__ */ l(
                vt,
                {
                  label: "Description",
                  fullWidth: !0,
                  size: "small",
                  multiline: !0,
                  minRows: 2,
                  value: no,
                  onChange: (d) => pe(d.target.value)
                }
              ),
              Us ? /* @__PURE__ */ l(Aa, { severity: "warning", children: "This app's saved configuration is invalid (must be exactly one tool group or one prompt group). Choose one valid group below and save." }) : null,
              /* @__PURE__ */ T(
                Cn,
                {
                  fullWidth: !0,
                  size: "small",
                  disabled: ai.length === 0 && De === "",
                  children: [
                    /* @__PURE__ */ l(wn, { id: "agent-app-tool-groups-label", children: "Tool group" }),
                    /* @__PURE__ */ T(
                      pn,
                      {
                        labelId: "agent-app-tool-groups-label",
                        id: "agent-app-tool-groups",
                        value: De,
                        label: "Tool group",
                        onChange: (d) => {
                          const O = d.target.value;
                          Ct(O), O !== "" && Xt("");
                        },
                        MenuProps: { slotProps: { paper: { sx: { maxHeight: 360 } } } },
                        children: [
                          /* @__PURE__ */ l(It, { value: "", children: /* @__PURE__ */ l("em", { children: "— None —" }) }),
                          Nf.map((d) => /* @__PURE__ */ l(It, { value: d, children: d }, d))
                        ]
                      }
                    ),
                    /* @__PURE__ */ l(rs, { children: ai.length === 0 ? "No tool groups yet. Create one in the Tool groups section." : "Pick exactly one tool group or one prompt group (not both). Choosing a tool group clears the prompt group." })
                  ]
                }
              ),
              /* @__PURE__ */ T(
                Cn,
                {
                  fullWidth: !0,
                  size: "small",
                  disabled: li.length === 0 && Yt === "",
                  children: [
                    /* @__PURE__ */ l(wn, { id: "agent-app-prompt-groups-label", children: "Prompt group" }),
                    /* @__PURE__ */ T(
                      pn,
                      {
                        labelId: "agent-app-prompt-groups-label",
                        id: "agent-app-prompt-groups",
                        value: Yt,
                        label: "Prompt group",
                        onChange: (d) => {
                          const O = d.target.value;
                          Xt(O), O !== "" && Ct("");
                        },
                        MenuProps: { slotProps: { paper: { sx: { maxHeight: 360 } } } },
                        children: [
                          /* @__PURE__ */ l(It, { value: "", children: /* @__PURE__ */ l("em", { children: "— None —" }) }),
                          kf.map((d) => /* @__PURE__ */ l(It, { value: d, children: d }, d))
                        ]
                      }
                    ),
                    /* @__PURE__ */ l(rs, { children: li.length === 0 ? "No prompt groups yet. Create one in the Prompt groups section." : "Choosing a prompt group clears the tool group." })
                  ]
                }
              ),
              Co ? /* @__PURE__ */ l(K, { color: "error", variant: "body2", children: Co }) : null
            ] }) }),
            /* @__PURE__ */ T(Ao, { sx: { px: 3, py: 2 }, children: [
              /* @__PURE__ */ l(fe, { variant: "outlined", onClick: pi, children: "Cancel" }),
              /* @__PURE__ */ l(
                fe,
                {
                  variant: "contained",
                  disabled: je(Ee !== null ? `agent-app-edit:${Ee}` : "agent-app-create"),
                  onClick: () => void Jf(),
                  children: Ee !== null ? je(`agent-app-edit:${Ee}`) ? "Saving..." : "Save changes" : je("agent-app-create") ? "Creating..." : "Create"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ T(
            $o,
            {
              open: Ot !== null,
              onClose: () => qn(null),
              maxWidth: "sm",
              fullWidth: !0,
              children: [
                /* @__PURE__ */ l(_o, { children: "Client secret" }),
                /* @__PURE__ */ l(Mo, { dividers: !0, children: /* @__PURE__ */ T(ae, { spacing: 2, children: [
                  /* @__PURE__ */ l(K, { variant: "body2", children: Ot == null ? void 0 : Ot.title }),
                  /* @__PURE__ */ l(dt, { variant: "outlined", sx: { p: 1.5, borderRadius: 2 }, children: /* @__PURE__ */ T(ae, { direction: "row", spacing: 1, sx: { alignItems: "center" }, children: [
                    /* @__PURE__ */ l(
                      K,
                      {
                        component: "code",
                        sx: { flex: 1, wordBreak: "break-all", fontFamily: fo },
                        children: Ot == null ? void 0 : Ot.secret
                      }
                    ),
                    /* @__PURE__ */ l(
                      mt,
                      {
                        ariaLabel: "Copy client secret",
                        title: "Copy client secret",
                        value: (Ot == null ? void 0 : Ot.secret) ?? ""
                      }
                    )
                  ] }) }),
                  /* @__PURE__ */ l(K, { variant: "caption", color: "text.secondary", children: "Store this secret securely. It will not be shown again after you close this dialog." })
                ] }) }),
                /* @__PURE__ */ l(Ao, { sx: { px: 3, py: 2 }, children: /* @__PURE__ */ l(fe, { variant: "contained", onClick: () => qn(null), children: "Done" }) })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function Uw(e) {
  const t = e.trim();
  return t === "" ? "" : t.replace(/\/$/, "");
}
function Gw({
  children: e,
  mode: t,
  token: n,
  tenantId: r,
  httpPathPrefix: i,
  defaultSection: s = "servers"
}) {
  return Ad({
    mode: t,
    token: (n == null ? void 0 : n.trim()) || void 0,
    tenantId: (r == null ? void 0 : r.trim()) || void 0,
    httpPathPrefix: Uw(i ?? ""),
    defaultSection: t === "standalone" ? "home" : s
  }), Er(() => () => Ad(null), []), e;
}
function Jw({
  token: e,
  tenantId: t,
  httpPathPrefix: n,
  defaultSection: r = "servers",
  className: i,
  style: s
}) {
  return /* @__PURE__ */ l(
    Ne,
    {
      className: i,
      style: s,
      sx: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "600px",
        height: "100%"
      },
      children: /* @__PURE__ */ l(
        Gw,
        {
          mode: "component",
          token: e,
          tenantId: t,
          httpPathPrefix: n,
          defaultSection: r,
          children: /* @__PURE__ */ T(rb, { theme: k1, children: [
            /* @__PURE__ */ l(rp, {}),
            /* @__PURE__ */ l(Vw, {})
          ] })
        }
      )
    }
  );
}
export {
  Jw as MCPGatewayDashboard
};
