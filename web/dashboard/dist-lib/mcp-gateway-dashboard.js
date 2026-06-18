var fh = Object.defineProperty;
var mh = (e, t, n) => t in e ? fh(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var An = (e, t, n) => mh(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as a, jsxs as C, Fragment as Bt } from "react/jsx-runtime";
import * as b from "react";
import en, { forwardRef as hh, useContext as gh, isValidElement as Qi, cloneElement as Zi, Children as bh, useState as Ne, useCallback as yh, useEffect as Qo, useMemo as vt } from "react";
import * as vh from "react-dom";
import ki from "react-dom";
function nn(e, ...t) {
  const n = new URL(`https://mui.com/production-error/?code=${e}`);
  return t.forEach((r) => n.searchParams.append("args[]", r)), `Minified MUI error #${e}; visit ${n} for the full message.`;
}
function ss() {
  return ss = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, ss.apply(null, arguments);
}
function xh(e) {
  if (e.sheet)
    return e.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === e)
      return document.styleSheets[t];
}
function Ch(e) {
  var t = document.createElement("style");
  return t.setAttribute("data-emotion", e.key), e.nonce !== void 0 && t.setAttribute("nonce", e.nonce), t.appendChild(document.createTextNode("")), t.setAttribute("data-s", ""), t;
}
var Sh = /* @__PURE__ */ function() {
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
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(Ch(this));
    var i = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var s = xh(i);
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
}(), Vt = "-ms-", as = "-moz-", Qe = "-webkit-", zu = "comm", ll = "rule", cl = "decl", Th = "@import", Vu = "@keyframes", wh = "@layer", Eh = Math.abs, Rs = String.fromCharCode, Oh = Object.assign;
function Rh(e, t) {
  return Lt(e, 0) ^ 45 ? (((t << 2 ^ Lt(e, 0)) << 2 ^ Lt(e, 1)) << 2 ^ Lt(e, 2)) << 2 ^ Lt(e, 3) : 0;
}
function Uu(e) {
  return e.trim();
}
function _h(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function Ze(e, t, n) {
  return e.replace(t, n);
}
function Pa(e, t) {
  return e.indexOf(t);
}
function Lt(e, t) {
  return e.charCodeAt(t) | 0;
}
function Jr(e, t, n) {
  return e.slice(t, n);
}
function jo(e) {
  return e.length;
}
function dl(e) {
  return e.length;
}
function Pi(e, t) {
  return t.push(e), e;
}
function Nh(e, t) {
  return e.map(t).join("");
}
var _s = 1, er = 1, Gu = 0, oo = 0, kt = 0, pr = "";
function Ns(e, t, n, r, i, s, l) {
  return { value: e, root: t, parent: n, type: r, props: i, children: s, line: _s, column: er, length: l, return: "" };
}
function Er(e, t) {
  return Oh(Ns("", null, null, "", null, null, 0), e, { length: -e.length }, t);
}
function kh() {
  return kt;
}
function Ph() {
  return kt = oo > 0 ? Lt(pr, --oo) : 0, er--, kt === 10 && (er = 1, _s--), kt;
}
function ao() {
  return kt = oo < Gu ? Lt(pr, oo++) : 0, er++, kt === 10 && (er = 1, _s++), kt;
}
function Vo() {
  return Lt(pr, oo);
}
function es() {
  return oo;
}
function ui(e, t) {
  return Jr(pr, e, t);
}
function Qr(e) {
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
function Hu(e) {
  return _s = er = 1, Gu = jo(pr = e), oo = 0, [];
}
function qu(e) {
  return pr = "", e;
}
function ts(e) {
  return Uu(ui(oo - 1, Ia(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function Ih(e) {
  for (; (kt = Vo()) && kt < 33; )
    ao();
  return Qr(e) > 2 || Qr(kt) > 3 ? "" : " ";
}
function $h(e, t) {
  for (; --t && ao() && !(kt < 48 || kt > 102 || kt > 57 && kt < 65 || kt > 70 && kt < 97); )
    ;
  return ui(e, es() + (t < 6 && Vo() == 32 && ao() == 32));
}
function Ia(e) {
  for (; ao(); )
    switch (kt) {
      case e:
        return oo;
      case 34:
      case 39:
        e !== 34 && e !== 39 && Ia(kt);
        break;
      case 40:
        e === 41 && Ia(e);
        break;
      case 92:
        ao();
        break;
    }
  return oo;
}
function Mh(e, t) {
  for (; ao() && e + kt !== 57; )
    if (e + kt === 84 && Vo() === 47)
      break;
  return "/*" + ui(t, oo - 1) + "*" + Rs(e === 47 ? e : ao());
}
function Ah(e) {
  for (; !Qr(Vo()); )
    ao();
  return ui(e, oo);
}
function Dh(e) {
  return qu(os("", null, null, null, [""], e = Hu(e), 0, [0], e));
}
function os(e, t, n, r, i, s, l, c, u) {
  for (var f = 0, m = 0, y = l, x = 0, p = 0, v = 0, h = 1, E = 1, _ = 1, k = 0, O = "", w = i, T = s, N = r, M = O; E; )
    switch (v = k, k = ao()) {
      case 40:
        if (v != 108 && Lt(M, y - 1) == 58) {
          Pa(M += Ze(ts(k), "&", "&\f"), "&\f") != -1 && (_ = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        M += ts(k);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        M += Ih(v);
        break;
      case 92:
        M += $h(es() - 1, 7);
        continue;
      case 47:
        switch (Vo()) {
          case 42:
          case 47:
            Pi(Bh(Mh(ao(), es()), t, n), u);
            break;
          default:
            M += "/";
        }
        break;
      case 123 * h:
        c[f++] = jo(M) * _;
      case 125 * h:
      case 59:
      case 0:
        switch (k) {
          case 0:
          case 125:
            E = 0;
          case 59 + m:
            _ == -1 && (M = Ze(M, /\f/g, "")), p > 0 && jo(M) - y && Pi(p > 32 ? Wc(M + ";", r, n, y - 1) : Wc(Ze(M, " ", "") + ";", r, n, y - 2), u);
            break;
          case 59:
            M += ";";
          default:
            if (Pi(N = jc(M, t, n, f, m, i, c, O, w = [], T = [], y), s), k === 123)
              if (m === 0)
                os(M, t, N, N, w, s, y, c, T);
              else
                switch (x === 99 && Lt(M, 3) === 110 ? 100 : x) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    os(e, N, N, r && Pi(jc(e, N, N, 0, 0, i, c, O, i, w = [], y), T), i, T, y, c, r ? w : T);
                    break;
                  default:
                    os(M, N, N, N, [""], T, 0, c, T);
                }
        }
        f = m = p = 0, h = _ = 1, O = M = "", y = l;
        break;
      case 58:
        y = 1 + jo(M), p = v;
      default:
        if (h < 1) {
          if (k == 123)
            --h;
          else if (k == 125 && h++ == 0 && Ph() == 125)
            continue;
        }
        switch (M += Rs(k), k * h) {
          case 38:
            _ = m > 0 ? 1 : (M += "\f", -1);
            break;
          case 44:
            c[f++] = (jo(M) - 1) * _, _ = 1;
            break;
          case 64:
            Vo() === 45 && (M += ts(ao())), x = Vo(), m = y = jo(O = M += Ah(es())), k++;
            break;
          case 45:
            v === 45 && jo(M) == 2 && (h = 0);
        }
    }
  return s;
}
function jc(e, t, n, r, i, s, l, c, u, f, m) {
  for (var y = i - 1, x = i === 0 ? s : [""], p = dl(x), v = 0, h = 0, E = 0; v < r; ++v)
    for (var _ = 0, k = Jr(e, y + 1, y = Eh(h = l[v])), O = e; _ < p; ++_)
      (O = Uu(h > 0 ? x[_] + " " + k : Ze(k, /&\f/g, x[_]))) && (u[E++] = O);
  return Ns(e, t, n, i === 0 ? ll : c, u, f, m);
}
function Bh(e, t, n) {
  return Ns(e, t, n, zu, Rs(kh()), Jr(e, 2, -2), 0);
}
function Wc(e, t, n, r) {
  return Ns(e, t, n, cl, Jr(e, 0, r), Jr(e, r + 1, -1), r);
}
function Yn(e, t) {
  for (var n = "", r = dl(e), i = 0; i < r; i++)
    n += t(e[i], i, e, t) || "";
  return n;
}
function Lh(e, t, n, r) {
  switch (e.type) {
    case wh:
      if (e.children.length) break;
    case Th:
    case cl:
      return e.return = e.return || e.value;
    case zu:
      return "";
    case Vu:
      return e.return = e.value + "{" + Yn(e.children, r) + "}";
    case ll:
      e.value = e.props.join(",");
  }
  return jo(n = Yn(e.children, r)) ? e.return = e.value + "{" + n + "}" : "";
}
function Fh(e) {
  var t = dl(e);
  return function(n, r, i, s) {
    for (var l = "", c = 0; c < t; c++)
      l += e[c](n, r, i, s) || "";
    return l;
  };
}
function jh(e) {
  return function(t) {
    t.root || (t = t.return) && e(t);
  };
}
function Ku(e) {
  var t = /* @__PURE__ */ Object.create(null);
  return function(n) {
    return t[n] === void 0 && (t[n] = e(n)), t[n];
  };
}
var Wh = function(t, n, r) {
  for (var i = 0, s = 0; i = s, s = Vo(), i === 38 && s === 12 && (n[r] = 1), !Qr(s); )
    ao();
  return ui(t, oo);
}, zh = function(t, n) {
  var r = -1, i = 44;
  do
    switch (Qr(i)) {
      case 0:
        i === 38 && Vo() === 12 && (n[r] = 1), t[r] += Wh(oo - 1, n, r);
        break;
      case 2:
        t[r] += ts(i);
        break;
      case 4:
        if (i === 44) {
          t[++r] = Vo() === 58 ? "&\f" : "", n[r] = t[r].length;
          break;
        }
      default:
        t[r] += Rs(i);
    }
  while (i = ao());
  return t;
}, Vh = function(t, n) {
  return qu(zh(Hu(t), n));
}, zc = /* @__PURE__ */ new WeakMap(), Uh = function(t) {
  if (!(t.type !== "rule" || !t.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  t.length < 1)) {
    for (var n = t.value, r = t.parent, i = t.column === r.column && t.line === r.line; r.type !== "rule"; )
      if (r = r.parent, !r) return;
    if (!(t.props.length === 1 && n.charCodeAt(0) !== 58 && !zc.get(r)) && !i) {
      zc.set(t, !0);
      for (var s = [], l = Vh(n, s), c = r.props, u = 0, f = 0; u < l.length; u++)
        for (var m = 0; m < c.length; m++, f++)
          t.props[f] = s[u] ? l[u].replace(/&\f/g, c[m]) : c[m] + " " + l[u];
    }
  }
}, Gh = function(t) {
  if (t.type === "decl") {
    var n = t.value;
    // charcode for l
    n.charCodeAt(0) === 108 && // charcode for b
    n.charCodeAt(2) === 98 && (t.return = "", t.value = "");
  }
};
function Yu(e, t) {
  switch (Rh(e, t)) {
    case 5103:
      return Qe + "print-" + e + e;
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
      return Qe + e + e;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return Qe + e + as + e + Vt + e + e;
    case 6828:
    case 4268:
      return Qe + e + Vt + e + e;
    case 6165:
      return Qe + e + Vt + "flex-" + e + e;
    case 5187:
      return Qe + e + Ze(e, /(\w+).+(:[^]+)/, Qe + "box-$1$2" + Vt + "flex-$1$2") + e;
    case 5443:
      return Qe + e + Vt + "flex-item-" + Ze(e, /flex-|-self/, "") + e;
    case 4675:
      return Qe + e + Vt + "flex-line-pack" + Ze(e, /align-content|flex-|-self/, "") + e;
    case 5548:
      return Qe + e + Vt + Ze(e, "shrink", "negative") + e;
    case 5292:
      return Qe + e + Vt + Ze(e, "basis", "preferred-size") + e;
    case 6060:
      return Qe + "box-" + Ze(e, "-grow", "") + Qe + e + Vt + Ze(e, "grow", "positive") + e;
    case 4554:
      return Qe + Ze(e, /([^-])(transform)/g, "$1" + Qe + "$2") + e;
    case 6187:
      return Ze(Ze(Ze(e, /(zoom-|grab)/, Qe + "$1"), /(image-set)/, Qe + "$1"), e, "") + e;
    case 5495:
    case 3959:
      return Ze(e, /(image-set\([^]*)/, Qe + "$1$`$1");
    case 4968:
      return Ze(Ze(e, /(.+:)(flex-)?(.*)/, Qe + "box-pack:$3" + Vt + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + Qe + e + e;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return Ze(e, /(.+)-inline(.+)/, Qe + "$1$2") + e;
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
      if (jo(e) - 1 - t > 6) switch (Lt(e, t + 1)) {
        case 109:
          if (Lt(e, t + 4) !== 45) break;
        case 102:
          return Ze(e, /(.+:)(.+)-([^]+)/, "$1" + Qe + "$2-$3$1" + as + (Lt(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
        case 115:
          return ~Pa(e, "stretch") ? Yu(Ze(e, "stretch", "fill-available"), t) + e : e;
      }
      break;
    case 4949:
      if (Lt(e, t + 1) !== 115) break;
    case 6444:
      switch (Lt(e, jo(e) - 3 - (~Pa(e, "!important") && 10))) {
        case 107:
          return Ze(e, ":", ":" + Qe) + e;
        case 101:
          return Ze(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + Qe + (Lt(e, 14) === 45 ? "inline-" : "") + "box$3$1" + Qe + "$2$3$1" + Vt + "$2box$3") + e;
      }
      break;
    case 5936:
      switch (Lt(e, t + 11)) {
        case 114:
          return Qe + e + Vt + Ze(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
        case 108:
          return Qe + e + Vt + Ze(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
        case 45:
          return Qe + e + Vt + Ze(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
      }
      return Qe + e + Vt + e + e;
  }
  return e;
}
var Hh = function(t, n, r, i) {
  if (t.length > -1 && !t.return) switch (t.type) {
    case cl:
      t.return = Yu(t.value, t.length);
      break;
    case Vu:
      return Yn([Er(t, {
        value: Ze(t.value, "@", "@" + Qe)
      })], i);
    case ll:
      if (t.length) return Nh(t.props, function(s) {
        switch (_h(s, /(::plac\w+|:read-\w+)/)) {
          case ":read-only":
          case ":read-write":
            return Yn([Er(t, {
              props: [Ze(s, /:(read-\w+)/, ":" + as + "$1")]
            })], i);
          case "::placeholder":
            return Yn([Er(t, {
              props: [Ze(s, /:(plac\w+)/, ":" + Qe + "input-$1")]
            }), Er(t, {
              props: [Ze(s, /:(plac\w+)/, ":" + as + "$1")]
            }), Er(t, {
              props: [Ze(s, /:(plac\w+)/, Vt + "input-$1")]
            })], i);
        }
        return "";
      });
  }
}, qh = [Hh], Kh = function(t) {
  var n = t.key;
  if (n === "css") {
    var r = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(r, function(h) {
      var E = h.getAttribute("data-emotion");
      E.indexOf(" ") !== -1 && (document.head.appendChild(h), h.setAttribute("data-s", ""));
    });
  }
  var i = t.stylisPlugins || qh, s = {}, l, c = [];
  l = t.container || document.head, Array.prototype.forEach.call(
    // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll('style[data-emotion^="' + n + ' "]'),
    function(h) {
      for (var E = h.getAttribute("data-emotion").split(" "), _ = 1; _ < E.length; _++)
        s[E[_]] = !0;
      c.push(h);
    }
  );
  var u, f = [Uh, Gh];
  {
    var m, y = [Lh, jh(function(h) {
      m.insert(h);
    })], x = Fh(f.concat(i, y)), p = function(E) {
      return Yn(Dh(E), x);
    };
    u = function(E, _, k, O) {
      m = k, p(E ? E + "{" + _.styles + "}" : _.styles), O && (v.inserted[_.name] = !0);
    };
  }
  var v = {
    key: n,
    sheet: new Sh({
      key: n,
      container: l,
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
  return v.sheet.hydrate(c), v;
};
function Yh(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var $a = { exports: {} }, tt = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vc;
function Xh() {
  if (Vc) return tt;
  Vc = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, i = e ? Symbol.for("react.strict_mode") : 60108, s = e ? Symbol.for("react.profiler") : 60114, l = e ? Symbol.for("react.provider") : 60109, c = e ? Symbol.for("react.context") : 60110, u = e ? Symbol.for("react.async_mode") : 60111, f = e ? Symbol.for("react.concurrent_mode") : 60111, m = e ? Symbol.for("react.forward_ref") : 60112, y = e ? Symbol.for("react.suspense") : 60113, x = e ? Symbol.for("react.suspense_list") : 60120, p = e ? Symbol.for("react.memo") : 60115, v = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, E = e ? Symbol.for("react.fundamental") : 60117, _ = e ? Symbol.for("react.responder") : 60118, k = e ? Symbol.for("react.scope") : 60119;
  function O(T) {
    if (typeof T == "object" && T !== null) {
      var N = T.$$typeof;
      switch (N) {
        case t:
          switch (T = T.type, T) {
            case u:
            case f:
            case r:
            case s:
            case i:
            case y:
              return T;
            default:
              switch (T = T && T.$$typeof, T) {
                case c:
                case m:
                case v:
                case p:
                case l:
                  return T;
                default:
                  return N;
              }
          }
        case n:
          return N;
      }
    }
  }
  function w(T) {
    return O(T) === f;
  }
  return tt.AsyncMode = u, tt.ConcurrentMode = f, tt.ContextConsumer = c, tt.ContextProvider = l, tt.Element = t, tt.ForwardRef = m, tt.Fragment = r, tt.Lazy = v, tt.Memo = p, tt.Portal = n, tt.Profiler = s, tt.StrictMode = i, tt.Suspense = y, tt.isAsyncMode = function(T) {
    return w(T) || O(T) === u;
  }, tt.isConcurrentMode = w, tt.isContextConsumer = function(T) {
    return O(T) === c;
  }, tt.isContextProvider = function(T) {
    return O(T) === l;
  }, tt.isElement = function(T) {
    return typeof T == "object" && T !== null && T.$$typeof === t;
  }, tt.isForwardRef = function(T) {
    return O(T) === m;
  }, tt.isFragment = function(T) {
    return O(T) === r;
  }, tt.isLazy = function(T) {
    return O(T) === v;
  }, tt.isMemo = function(T) {
    return O(T) === p;
  }, tt.isPortal = function(T) {
    return O(T) === n;
  }, tt.isProfiler = function(T) {
    return O(T) === s;
  }, tt.isStrictMode = function(T) {
    return O(T) === i;
  }, tt.isSuspense = function(T) {
    return O(T) === y;
  }, tt.isValidElementType = function(T) {
    return typeof T == "string" || typeof T == "function" || T === r || T === f || T === s || T === i || T === y || T === x || typeof T == "object" && T !== null && (T.$$typeof === v || T.$$typeof === p || T.$$typeof === l || T.$$typeof === c || T.$$typeof === m || T.$$typeof === E || T.$$typeof === _ || T.$$typeof === k || T.$$typeof === h);
  }, tt.typeOf = O, tt;
}
var ot = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Uc;
function Jh() {
  return Uc || (Uc = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, i = e ? Symbol.for("react.strict_mode") : 60108, s = e ? Symbol.for("react.profiler") : 60114, l = e ? Symbol.for("react.provider") : 60109, c = e ? Symbol.for("react.context") : 60110, u = e ? Symbol.for("react.async_mode") : 60111, f = e ? Symbol.for("react.concurrent_mode") : 60111, m = e ? Symbol.for("react.forward_ref") : 60112, y = e ? Symbol.for("react.suspense") : 60113, x = e ? Symbol.for("react.suspense_list") : 60120, p = e ? Symbol.for("react.memo") : 60115, v = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, E = e ? Symbol.for("react.fundamental") : 60117, _ = e ? Symbol.for("react.responder") : 60118, k = e ? Symbol.for("react.scope") : 60119;
    function O(j) {
      return typeof j == "string" || typeof j == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      j === r || j === f || j === s || j === i || j === y || j === x || typeof j == "object" && j !== null && (j.$$typeof === v || j.$$typeof === p || j.$$typeof === l || j.$$typeof === c || j.$$typeof === m || j.$$typeof === E || j.$$typeof === _ || j.$$typeof === k || j.$$typeof === h);
    }
    function w(j) {
      if (typeof j == "object" && j !== null) {
        var fe = j.$$typeof;
        switch (fe) {
          case t:
            var se = j.type;
            switch (se) {
              case u:
              case f:
              case r:
              case s:
              case i:
              case y:
                return se;
              default:
                var ke = se && se.$$typeof;
                switch (ke) {
                  case c:
                  case m:
                  case v:
                  case p:
                  case l:
                    return ke;
                  default:
                    return fe;
                }
            }
          case n:
            return fe;
        }
      }
    }
    var T = u, N = f, M = c, D = l, B = t, F = m, P = r, g = v, $ = p, I = n, A = s, L = i, W = y, q = !1;
    function ie(j) {
      return q || (q = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), z(j) || w(j) === u;
    }
    function z(j) {
      return w(j) === f;
    }
    function V(j) {
      return w(j) === c;
    }
    function Q(j) {
      return w(j) === l;
    }
    function re(j) {
      return typeof j == "object" && j !== null && j.$$typeof === t;
    }
    function ee(j) {
      return w(j) === m;
    }
    function G(j) {
      return w(j) === r;
    }
    function K(j) {
      return w(j) === v;
    }
    function Y(j) {
      return w(j) === p;
    }
    function U(j) {
      return w(j) === n;
    }
    function te(j) {
      return w(j) === s;
    }
    function ne(j) {
      return w(j) === i;
    }
    function ge(j) {
      return w(j) === y;
    }
    ot.AsyncMode = T, ot.ConcurrentMode = N, ot.ContextConsumer = M, ot.ContextProvider = D, ot.Element = B, ot.ForwardRef = F, ot.Fragment = P, ot.Lazy = g, ot.Memo = $, ot.Portal = I, ot.Profiler = A, ot.StrictMode = L, ot.Suspense = W, ot.isAsyncMode = ie, ot.isConcurrentMode = z, ot.isContextConsumer = V, ot.isContextProvider = Q, ot.isElement = re, ot.isForwardRef = ee, ot.isFragment = G, ot.isLazy = K, ot.isMemo = Y, ot.isPortal = U, ot.isProfiler = te, ot.isStrictMode = ne, ot.isSuspense = ge, ot.isValidElementType = O, ot.typeOf = w;
  }()), ot;
}
process.env.NODE_ENV === "production" ? $a.exports = Xh() : $a.exports = Jh();
var Qh = $a.exports, Xu = Qh, Zh = {
  $$typeof: !0,
  render: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0
}, eg = {
  $$typeof: !0,
  compare: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0,
  type: !0
}, Ju = {};
Ju[Xu.ForwardRef] = Zh;
Ju[Xu.Memo] = eg;
var tg = !0;
function Qu(e, t, n) {
  var r = "";
  return n.split(" ").forEach(function(i) {
    e[i] !== void 0 ? t.push(e[i] + ";") : i && (r += i + " ");
  }), r;
}
var ul = function(t, n, r) {
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
  tg === !1) && t.registered[i] === void 0 && (t.registered[i] = n.styles);
}, pl = function(t, n, r) {
  ul(t, n, r);
  var i = t.key + "-" + n.name;
  if (t.inserted[n.name] === void 0) {
    var s = n;
    do
      t.insert(n === s ? "." + i : "", s, t.sheet, !0), s = s.next;
    while (s !== void 0);
  }
};
function og(e) {
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
var ng = {
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
}, rg = /[A-Z]|^ms/g, ig = /_EMO_([^_]+?)_([^]*?)_EMO_/g, Zu = function(t) {
  return t.charCodeAt(1) === 45;
}, Gc = function(t) {
  return t != null && typeof t != "boolean";
}, ca = /* @__PURE__ */ Ku(function(e) {
  return Zu(e) ? e : e.replace(rg, "-$&").toLowerCase();
}), Hc = function(t, n) {
  switch (t) {
    case "animation":
    case "animationName":
      if (typeof n == "string")
        return n.replace(ig, function(r, i, s) {
          return Wo = {
            name: i,
            styles: s,
            next: Wo
          }, i;
        });
  }
  return ng[t] !== 1 && !Zu(t) && typeof n == "number" && n !== 0 ? n + "px" : n;
};
function Zr(e, t, n) {
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
        return Wo = {
          name: i.name,
          styles: i.styles,
          next: Wo
        }, i.name;
      var s = n;
      if (s.styles !== void 0) {
        var l = s.next;
        if (l !== void 0)
          for (; l !== void 0; )
            Wo = {
              name: l.name,
              styles: l.styles,
              next: Wo
            }, l = l.next;
        var c = s.styles + ";";
        return c;
      }
      return sg(e, t, n);
    }
    case "function": {
      if (e !== void 0) {
        var u = Wo, f = n(e);
        return Wo = u, Zr(e, t, f);
      }
      break;
    }
  }
  var m = n;
  if (t == null)
    return m;
  var y = t[m];
  return y !== void 0 ? y : m;
}
function sg(e, t, n) {
  var r = "";
  if (Array.isArray(n))
    for (var i = 0; i < n.length; i++)
      r += Zr(e, t, n[i]) + ";";
  else
    for (var s in n) {
      var l = n[s];
      if (typeof l != "object") {
        var c = l;
        t != null && t[c] !== void 0 ? r += s + "{" + t[c] + "}" : Gc(c) && (r += ca(s) + ":" + Hc(s, c) + ";");
      } else if (Array.isArray(l) && typeof l[0] == "string" && (t == null || t[l[0]] === void 0))
        for (var u = 0; u < l.length; u++)
          Gc(l[u]) && (r += ca(s) + ":" + Hc(s, l[u]) + ";");
      else {
        var f = Zr(e, t, l);
        switch (s) {
          case "animation":
          case "animationName": {
            r += ca(s) + ":" + f + ";";
            break;
          }
          default:
            r += s + "{" + f + "}";
        }
      }
    }
  return r;
}
var qc = /label:\s*([^\s;{]+)\s*(;|$)/g, Wo;
function pi(e, t, n) {
  if (e.length === 1 && typeof e[0] == "object" && e[0] !== null && e[0].styles !== void 0)
    return e[0];
  var r = !0, i = "";
  Wo = void 0;
  var s = e[0];
  if (s == null || s.raw === void 0)
    r = !1, i += Zr(n, t, s);
  else {
    var l = s;
    i += l[0];
  }
  for (var c = 1; c < e.length; c++)
    if (i += Zr(n, t, e[c]), r) {
      var u = s;
      i += u[c];
    }
  qc.lastIndex = 0;
  for (var f = "", m; (m = qc.exec(i)) !== null; )
    f += "-" + m[1];
  var y = og(i) + f;
  return {
    name: y,
    styles: i,
    next: Wo
  };
}
var ag = function(t) {
  return t();
}, ep = b.useInsertionEffect ? b.useInsertionEffect : !1, tp = ep || ag, Kc = ep || b.useLayoutEffect, op = /* @__PURE__ */ b.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement < "u" ? /* @__PURE__ */ Kh({
    key: "css"
  }) : null
);
op.Provider;
var fl = function(t) {
  return /* @__PURE__ */ hh(function(n, r) {
    var i = gh(op);
    return t(n, i, r);
  });
}, fi = /* @__PURE__ */ b.createContext({}), ml = {}.hasOwnProperty, Ma = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", lg = function(t, n) {
  var r = {};
  for (var i in n)
    ml.call(n, i) && (r[i] = n[i]);
  return r[Ma] = t, r;
}, cg = function(t) {
  var n = t.cache, r = t.serialized, i = t.isStringTag;
  return ul(n, r, i), tp(function() {
    return pl(n, r, i);
  }), null;
}, dg = /* @__PURE__ */ fl(function(e, t, n) {
  var r = e.css;
  typeof r == "string" && t.registered[r] !== void 0 && (r = t.registered[r]);
  var i = e[Ma], s = [r], l = "";
  typeof e.className == "string" ? l = Qu(t.registered, s, e.className) : e.className != null && (l = e.className + " ");
  var c = pi(s, void 0, b.useContext(fi));
  l += t.key + "-" + c.name;
  var u = {};
  for (var f in e)
    ml.call(e, f) && f !== "css" && f !== Ma && (u[f] = e[f]);
  return u.className = l, n && (u.ref = n), /* @__PURE__ */ b.createElement(b.Fragment, null, /* @__PURE__ */ b.createElement(cg, {
    cache: t,
    serialized: c,
    isStringTag: typeof i == "string"
  }), /* @__PURE__ */ b.createElement(i, u));
}), ug = dg, Yc = function(t, n) {
  var r = arguments;
  if (n == null || !ml.call(n, "css"))
    return b.createElement.apply(void 0, r);
  var i = r.length, s = new Array(i);
  s[0] = ug, s[1] = lg(t, n);
  for (var l = 2; l < i; l++)
    s[l] = r[l];
  return b.createElement.apply(null, s);
};
(function(e) {
  var t;
  t || (t = e.JSX || (e.JSX = {}));
})(Yc || (Yc = {}));
var pg = /* @__PURE__ */ fl(function(e, t) {
  var n = e.styles, r = pi([n], void 0, b.useContext(fi)), i = b.useRef();
  return Kc(function() {
    var s = t.key + "-global", l = new t.sheet.constructor({
      key: s,
      nonce: t.sheet.nonce,
      container: t.sheet.container,
      speedy: t.sheet.isSpeedy
    }), c = !1, u = document.querySelector('style[data-emotion="' + s + " " + r.name + '"]');
    return t.sheet.tags.length && (l.before = t.sheet.tags[0]), u !== null && (c = !0, u.setAttribute("data-emotion", s), l.hydrate([u])), i.current = [l, c], function() {
      l.flush();
    };
  }, [t]), Kc(function() {
    var s = i.current, l = s[0], c = s[1];
    if (c) {
      s[1] = !1;
      return;
    }
    if (r.next !== void 0 && pl(t, r.next, !0), l.tags.length) {
      var u = l.tags[l.tags.length - 1].nextElementSibling;
      l.before = u, l.flush();
    }
    t.insert("", r, l, !1);
  }, [t, r.name]), null;
});
function hl() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return pi(t);
}
function mi() {
  var e = hl.apply(void 0, arguments), t = "animation-" + e.name;
  return {
    name: t,
    styles: "@keyframes " + t + "{" + e.styles + "}",
    anim: 1,
    toString: function() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
}
var fg = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|popover|popoverTarget|popoverTargetAction|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/, mg = /* @__PURE__ */ Ku(
  function(e) {
    return fg.test(e) || e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) < 91;
  }
  /* Z+1 */
), hg = mg, gg = function(t) {
  return t !== "theme";
}, Xc = function(t) {
  return typeof t == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  t.charCodeAt(0) > 96 ? hg : gg;
}, Jc = function(t, n, r) {
  var i;
  if (n) {
    var s = n.shouldForwardProp;
    i = t.__emotion_forwardProp && s ? function(l) {
      return t.__emotion_forwardProp(l) && s(l);
    } : s;
  }
  return typeof i != "function" && r && (i = t.__emotion_forwardProp), i;
}, bg = function(t) {
  var n = t.cache, r = t.serialized, i = t.isStringTag;
  return ul(n, r, i), tp(function() {
    return pl(n, r, i);
  }), null;
}, yg = function e(t, n) {
  var r = t.__emotion_real === t, i = r && t.__emotion_base || t, s, l;
  n !== void 0 && (s = n.label, l = n.target);
  var c = Jc(t, n, r), u = c || Xc(i), f = !u("as");
  return function() {
    var m = arguments, y = r && t.__emotion_styles !== void 0 ? t.__emotion_styles.slice(0) : [];
    if (s !== void 0 && y.push("label:" + s + ";"), m[0] == null || m[0].raw === void 0)
      y.push.apply(y, m);
    else {
      var x = m[0];
      y.push(x[0]);
      for (var p = m.length, v = 1; v < p; v++)
        y.push(m[v], x[v]);
    }
    var h = fl(function(E, _, k) {
      var O = f && E.as || i, w = "", T = [], N = E;
      if (E.theme == null) {
        N = {};
        for (var M in E)
          N[M] = E[M];
        N.theme = b.useContext(fi);
      }
      typeof E.className == "string" ? w = Qu(_.registered, T, E.className) : E.className != null && (w = E.className + " ");
      var D = pi(y.concat(T), _.registered, N);
      w += _.key + "-" + D.name, l !== void 0 && (w += " " + l);
      var B = f && c === void 0 ? Xc(O) : u, F = {};
      for (var P in E)
        f && P === "as" || B(P) && (F[P] = E[P]);
      return F.className = w, k && (F.ref = k), /* @__PURE__ */ b.createElement(b.Fragment, null, /* @__PURE__ */ b.createElement(bg, {
        cache: _,
        serialized: D,
        isStringTag: typeof O == "string"
      }), /* @__PURE__ */ b.createElement(O, F));
    });
    return h.displayName = s !== void 0 ? s : "Styled(" + (typeof i == "string" ? i : i.displayName || i.name || "Component") + ")", h.defaultProps = t.defaultProps, h.__emotion_real = h, h.__emotion_base = i, h.__emotion_styles = y, h.__emotion_forwardProp = c, Object.defineProperty(h, "toString", {
      value: function() {
        return "." + l;
      }
    }), h.withComponent = function(E, _) {
      var k = e(E, ss({}, n, _, {
        shouldForwardProp: Jc(h, _, !0)
      }));
      return k.apply(void 0, y);
    }, h;
  };
}, vg = [
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
], Aa = yg.bind(null);
vg.forEach(function(e) {
  Aa[e] = Aa(e);
});
var Da = { exports: {} }, Ii = { exports: {} }, nt = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Qc;
function xg() {
  if (Qc) return nt;
  Qc = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, i = e ? Symbol.for("react.strict_mode") : 60108, s = e ? Symbol.for("react.profiler") : 60114, l = e ? Symbol.for("react.provider") : 60109, c = e ? Symbol.for("react.context") : 60110, u = e ? Symbol.for("react.async_mode") : 60111, f = e ? Symbol.for("react.concurrent_mode") : 60111, m = e ? Symbol.for("react.forward_ref") : 60112, y = e ? Symbol.for("react.suspense") : 60113, x = e ? Symbol.for("react.suspense_list") : 60120, p = e ? Symbol.for("react.memo") : 60115, v = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, E = e ? Symbol.for("react.fundamental") : 60117, _ = e ? Symbol.for("react.responder") : 60118, k = e ? Symbol.for("react.scope") : 60119;
  function O(T) {
    if (typeof T == "object" && T !== null) {
      var N = T.$$typeof;
      switch (N) {
        case t:
          switch (T = T.type, T) {
            case u:
            case f:
            case r:
            case s:
            case i:
            case y:
              return T;
            default:
              switch (T = T && T.$$typeof, T) {
                case c:
                case m:
                case v:
                case p:
                case l:
                  return T;
                default:
                  return N;
              }
          }
        case n:
          return N;
      }
    }
  }
  function w(T) {
    return O(T) === f;
  }
  return nt.AsyncMode = u, nt.ConcurrentMode = f, nt.ContextConsumer = c, nt.ContextProvider = l, nt.Element = t, nt.ForwardRef = m, nt.Fragment = r, nt.Lazy = v, nt.Memo = p, nt.Portal = n, nt.Profiler = s, nt.StrictMode = i, nt.Suspense = y, nt.isAsyncMode = function(T) {
    return w(T) || O(T) === u;
  }, nt.isConcurrentMode = w, nt.isContextConsumer = function(T) {
    return O(T) === c;
  }, nt.isContextProvider = function(T) {
    return O(T) === l;
  }, nt.isElement = function(T) {
    return typeof T == "object" && T !== null && T.$$typeof === t;
  }, nt.isForwardRef = function(T) {
    return O(T) === m;
  }, nt.isFragment = function(T) {
    return O(T) === r;
  }, nt.isLazy = function(T) {
    return O(T) === v;
  }, nt.isMemo = function(T) {
    return O(T) === p;
  }, nt.isPortal = function(T) {
    return O(T) === n;
  }, nt.isProfiler = function(T) {
    return O(T) === s;
  }, nt.isStrictMode = function(T) {
    return O(T) === i;
  }, nt.isSuspense = function(T) {
    return O(T) === y;
  }, nt.isValidElementType = function(T) {
    return typeof T == "string" || typeof T == "function" || T === r || T === f || T === s || T === i || T === y || T === x || typeof T == "object" && T !== null && (T.$$typeof === v || T.$$typeof === p || T.$$typeof === l || T.$$typeof === c || T.$$typeof === m || T.$$typeof === E || T.$$typeof === _ || T.$$typeof === k || T.$$typeof === h);
  }, nt.typeOf = O, nt;
}
var rt = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Zc;
function Cg() {
  return Zc || (Zc = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, i = e ? Symbol.for("react.strict_mode") : 60108, s = e ? Symbol.for("react.profiler") : 60114, l = e ? Symbol.for("react.provider") : 60109, c = e ? Symbol.for("react.context") : 60110, u = e ? Symbol.for("react.async_mode") : 60111, f = e ? Symbol.for("react.concurrent_mode") : 60111, m = e ? Symbol.for("react.forward_ref") : 60112, y = e ? Symbol.for("react.suspense") : 60113, x = e ? Symbol.for("react.suspense_list") : 60120, p = e ? Symbol.for("react.memo") : 60115, v = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, E = e ? Symbol.for("react.fundamental") : 60117, _ = e ? Symbol.for("react.responder") : 60118, k = e ? Symbol.for("react.scope") : 60119;
    function O(j) {
      return typeof j == "string" || typeof j == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      j === r || j === f || j === s || j === i || j === y || j === x || typeof j == "object" && j !== null && (j.$$typeof === v || j.$$typeof === p || j.$$typeof === l || j.$$typeof === c || j.$$typeof === m || j.$$typeof === E || j.$$typeof === _ || j.$$typeof === k || j.$$typeof === h);
    }
    function w(j) {
      if (typeof j == "object" && j !== null) {
        var fe = j.$$typeof;
        switch (fe) {
          case t:
            var se = j.type;
            switch (se) {
              case u:
              case f:
              case r:
              case s:
              case i:
              case y:
                return se;
              default:
                var ke = se && se.$$typeof;
                switch (ke) {
                  case c:
                  case m:
                  case v:
                  case p:
                  case l:
                    return ke;
                  default:
                    return fe;
                }
            }
          case n:
            return fe;
        }
      }
    }
    var T = u, N = f, M = c, D = l, B = t, F = m, P = r, g = v, $ = p, I = n, A = s, L = i, W = y, q = !1;
    function ie(j) {
      return q || (q = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), z(j) || w(j) === u;
    }
    function z(j) {
      return w(j) === f;
    }
    function V(j) {
      return w(j) === c;
    }
    function Q(j) {
      return w(j) === l;
    }
    function re(j) {
      return typeof j == "object" && j !== null && j.$$typeof === t;
    }
    function ee(j) {
      return w(j) === m;
    }
    function G(j) {
      return w(j) === r;
    }
    function K(j) {
      return w(j) === v;
    }
    function Y(j) {
      return w(j) === p;
    }
    function U(j) {
      return w(j) === n;
    }
    function te(j) {
      return w(j) === s;
    }
    function ne(j) {
      return w(j) === i;
    }
    function ge(j) {
      return w(j) === y;
    }
    rt.AsyncMode = T, rt.ConcurrentMode = N, rt.ContextConsumer = M, rt.ContextProvider = D, rt.Element = B, rt.ForwardRef = F, rt.Fragment = P, rt.Lazy = g, rt.Memo = $, rt.Portal = I, rt.Profiler = A, rt.StrictMode = L, rt.Suspense = W, rt.isAsyncMode = ie, rt.isConcurrentMode = z, rt.isContextConsumer = V, rt.isContextProvider = Q, rt.isElement = re, rt.isForwardRef = ee, rt.isFragment = G, rt.isLazy = K, rt.isMemo = Y, rt.isPortal = U, rt.isProfiler = te, rt.isStrictMode = ne, rt.isSuspense = ge, rt.isValidElementType = O, rt.typeOf = w;
  }()), rt;
}
var ed;
function np() {
  return ed || (ed = 1, process.env.NODE_ENV === "production" ? Ii.exports = xg() : Ii.exports = Cg()), Ii.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var da, td;
function Sg() {
  if (td) return da;
  td = 1;
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
      for (var l = {}, c = 0; c < 10; c++)
        l["_" + String.fromCharCode(c)] = c;
      var u = Object.getOwnPropertyNames(l).map(function(m) {
        return l[m];
      });
      if (u.join("") !== "0123456789")
        return !1;
      var f = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(m) {
        f[m] = m;
      }), Object.keys(Object.assign({}, f)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return da = i() ? Object.assign : function(s, l) {
    for (var c, u = r(s), f, m = 1; m < arguments.length; m++) {
      c = Object(arguments[m]);
      for (var y in c)
        t.call(c, y) && (u[y] = c[y]);
      if (e) {
        f = e(c);
        for (var x = 0; x < f.length; x++)
          n.call(c, f[x]) && (u[f[x]] = c[f[x]]);
      }
    }
    return u;
  }, da;
}
var ua, od;
function gl() {
  if (od) return ua;
  od = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return ua = e, ua;
}
var pa, nd;
function rp() {
  return nd || (nd = 1, pa = Function.call.bind(Object.prototype.hasOwnProperty)), pa;
}
var fa, rd;
function Tg() {
  if (rd) return fa;
  rd = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = gl(), n = {}, r = rp();
    e = function(s) {
      var l = "Warning: " + s;
      typeof console < "u" && console.error(l);
      try {
        throw new Error(l);
      } catch {
      }
    };
  }
  function i(s, l, c, u, f) {
    if (process.env.NODE_ENV !== "production") {
      for (var m in s)
        if (r(s, m)) {
          var y;
          try {
            if (typeof s[m] != "function") {
              var x = Error(
                (u || "React class") + ": " + c + " type `" + m + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof s[m] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw x.name = "Invariant Violation", x;
            }
            y = s[m](l, m, u, c, null, t);
          } catch (v) {
            y = v;
          }
          if (y && !(y instanceof Error) && e(
            (u || "React class") + ": type specification of " + c + " `" + m + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof y + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), y instanceof Error && !(y.message in n)) {
            n[y.message] = !0;
            var p = f ? f() : "";
            e(
              "Failed " + c + " type: " + y.message + (p ?? "")
            );
          }
        }
    }
  }
  return i.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, fa = i, fa;
}
var ma, id;
function wg() {
  if (id) return ma;
  id = 1;
  var e = np(), t = Sg(), n = gl(), r = rp(), i = Tg(), s = function() {
  };
  process.env.NODE_ENV !== "production" && (s = function(c) {
    var u = "Warning: " + c;
    typeof console < "u" && console.error(u);
    try {
      throw new Error(u);
    } catch {
    }
  });
  function l() {
    return null;
  }
  return ma = function(c, u) {
    var f = typeof Symbol == "function" && Symbol.iterator, m = "@@iterator";
    function y(z) {
      var V = z && (f && z[f] || z[m]);
      if (typeof V == "function")
        return V;
    }
    var x = "<<anonymous>>", p = {
      array: _("array"),
      bigint: _("bigint"),
      bool: _("boolean"),
      func: _("function"),
      number: _("number"),
      object: _("object"),
      string: _("string"),
      symbol: _("symbol"),
      any: k(),
      arrayOf: O,
      element: w(),
      elementType: T(),
      instanceOf: N,
      node: F(),
      objectOf: D,
      oneOf: M,
      oneOfType: B,
      shape: g,
      exact: $
    };
    function v(z, V) {
      return z === V ? z !== 0 || 1 / z === 1 / V : z !== z && V !== V;
    }
    function h(z, V) {
      this.message = z, this.data = V && typeof V == "object" ? V : {}, this.stack = "";
    }
    h.prototype = Error.prototype;
    function E(z) {
      if (process.env.NODE_ENV !== "production")
        var V = {}, Q = 0;
      function re(G, K, Y, U, te, ne, ge) {
        if (U = U || x, ne = ne || Y, ge !== n) {
          if (u) {
            var j = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw j.name = "Invariant Violation", j;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var fe = U + ":" + Y;
            !V[fe] && // Avoid spamming the console because they are often not actionable except for lib authors
            Q < 3 && (s(
              "You are manually calling a React.PropTypes validation function for the `" + ne + "` prop on `" + U + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), V[fe] = !0, Q++);
          }
        }
        return K[Y] == null ? G ? K[Y] === null ? new h("The " + te + " `" + ne + "` is marked as required " + ("in `" + U + "`, but its value is `null`.")) : new h("The " + te + " `" + ne + "` is marked as required in " + ("`" + U + "`, but its value is `undefined`.")) : null : z(K, Y, U, te, ne);
      }
      var ee = re.bind(null, !1);
      return ee.isRequired = re.bind(null, !0), ee;
    }
    function _(z) {
      function V(Q, re, ee, G, K, Y) {
        var U = Q[re], te = L(U);
        if (te !== z) {
          var ne = W(U);
          return new h(
            "Invalid " + G + " `" + K + "` of type " + ("`" + ne + "` supplied to `" + ee + "`, expected ") + ("`" + z + "`."),
            { expectedType: z }
          );
        }
        return null;
      }
      return E(V);
    }
    function k() {
      return E(l);
    }
    function O(z) {
      function V(Q, re, ee, G, K) {
        if (typeof z != "function")
          return new h("Property `" + K + "` of component `" + ee + "` has invalid PropType notation inside arrayOf.");
        var Y = Q[re];
        if (!Array.isArray(Y)) {
          var U = L(Y);
          return new h("Invalid " + G + " `" + K + "` of type " + ("`" + U + "` supplied to `" + ee + "`, expected an array."));
        }
        for (var te = 0; te < Y.length; te++) {
          var ne = z(Y, te, ee, G, K + "[" + te + "]", n);
          if (ne instanceof Error)
            return ne;
        }
        return null;
      }
      return E(V);
    }
    function w() {
      function z(V, Q, re, ee, G) {
        var K = V[Q];
        if (!c(K)) {
          var Y = L(K);
          return new h("Invalid " + ee + " `" + G + "` of type " + ("`" + Y + "` supplied to `" + re + "`, expected a single ReactElement."));
        }
        return null;
      }
      return E(z);
    }
    function T() {
      function z(V, Q, re, ee, G) {
        var K = V[Q];
        if (!e.isValidElementType(K)) {
          var Y = L(K);
          return new h("Invalid " + ee + " `" + G + "` of type " + ("`" + Y + "` supplied to `" + re + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return E(z);
    }
    function N(z) {
      function V(Q, re, ee, G, K) {
        if (!(Q[re] instanceof z)) {
          var Y = z.name || x, U = ie(Q[re]);
          return new h("Invalid " + G + " `" + K + "` of type " + ("`" + U + "` supplied to `" + ee + "`, expected ") + ("instance of `" + Y + "`."));
        }
        return null;
      }
      return E(V);
    }
    function M(z) {
      if (!Array.isArray(z))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? s(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : s("Invalid argument supplied to oneOf, expected an array.")), l;
      function V(Q, re, ee, G, K) {
        for (var Y = Q[re], U = 0; U < z.length; U++)
          if (v(Y, z[U]))
            return null;
        var te = JSON.stringify(z, function(ge, j) {
          var fe = W(j);
          return fe === "symbol" ? String(j) : j;
        });
        return new h("Invalid " + G + " `" + K + "` of value `" + String(Y) + "` " + ("supplied to `" + ee + "`, expected one of " + te + "."));
      }
      return E(V);
    }
    function D(z) {
      function V(Q, re, ee, G, K) {
        if (typeof z != "function")
          return new h("Property `" + K + "` of component `" + ee + "` has invalid PropType notation inside objectOf.");
        var Y = Q[re], U = L(Y);
        if (U !== "object")
          return new h("Invalid " + G + " `" + K + "` of type " + ("`" + U + "` supplied to `" + ee + "`, expected an object."));
        for (var te in Y)
          if (r(Y, te)) {
            var ne = z(Y, te, ee, G, K + "." + te, n);
            if (ne instanceof Error)
              return ne;
          }
        return null;
      }
      return E(V);
    }
    function B(z) {
      if (!Array.isArray(z))
        return process.env.NODE_ENV !== "production" && s("Invalid argument supplied to oneOfType, expected an instance of array."), l;
      for (var V = 0; V < z.length; V++) {
        var Q = z[V];
        if (typeof Q != "function")
          return s(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + q(Q) + " at index " + V + "."
          ), l;
      }
      function re(ee, G, K, Y, U) {
        for (var te = [], ne = 0; ne < z.length; ne++) {
          var ge = z[ne], j = ge(ee, G, K, Y, U, n);
          if (j == null)
            return null;
          j.data && r(j.data, "expectedType") && te.push(j.data.expectedType);
        }
        var fe = te.length > 0 ? ", expected one of type [" + te.join(", ") + "]" : "";
        return new h("Invalid " + Y + " `" + U + "` supplied to " + ("`" + K + "`" + fe + "."));
      }
      return E(re);
    }
    function F() {
      function z(V, Q, re, ee, G) {
        return I(V[Q]) ? null : new h("Invalid " + ee + " `" + G + "` supplied to " + ("`" + re + "`, expected a ReactNode."));
      }
      return E(z);
    }
    function P(z, V, Q, re, ee) {
      return new h(
        (z || "React class") + ": " + V + " type `" + Q + "." + re + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + ee + "`."
      );
    }
    function g(z) {
      function V(Q, re, ee, G, K) {
        var Y = Q[re], U = L(Y);
        if (U !== "object")
          return new h("Invalid " + G + " `" + K + "` of type `" + U + "` " + ("supplied to `" + ee + "`, expected `object`."));
        for (var te in z) {
          var ne = z[te];
          if (typeof ne != "function")
            return P(ee, G, K, te, W(ne));
          var ge = ne(Y, te, ee, G, K + "." + te, n);
          if (ge)
            return ge;
        }
        return null;
      }
      return E(V);
    }
    function $(z) {
      function V(Q, re, ee, G, K) {
        var Y = Q[re], U = L(Y);
        if (U !== "object")
          return new h("Invalid " + G + " `" + K + "` of type `" + U + "` " + ("supplied to `" + ee + "`, expected `object`."));
        var te = t({}, Q[re], z);
        for (var ne in te) {
          var ge = z[ne];
          if (r(z, ne) && typeof ge != "function")
            return P(ee, G, K, ne, W(ge));
          if (!ge)
            return new h(
              "Invalid " + G + " `" + K + "` key `" + ne + "` supplied to `" + ee + "`.\nBad object: " + JSON.stringify(Q[re], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(z), null, "  ")
            );
          var j = ge(Y, ne, ee, G, K + "." + ne, n);
          if (j)
            return j;
        }
        return null;
      }
      return E(V);
    }
    function I(z) {
      switch (typeof z) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !z;
        case "object":
          if (Array.isArray(z))
            return z.every(I);
          if (z === null || c(z))
            return !0;
          var V = y(z);
          if (V) {
            var Q = V.call(z), re;
            if (V !== z.entries) {
              for (; !(re = Q.next()).done; )
                if (!I(re.value))
                  return !1;
            } else
              for (; !(re = Q.next()).done; ) {
                var ee = re.value;
                if (ee && !I(ee[1]))
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
    function L(z) {
      var V = typeof z;
      return Array.isArray(z) ? "array" : z instanceof RegExp ? "object" : A(V, z) ? "symbol" : V;
    }
    function W(z) {
      if (typeof z > "u" || z === null)
        return "" + z;
      var V = L(z);
      if (V === "object") {
        if (z instanceof Date)
          return "date";
        if (z instanceof RegExp)
          return "regexp";
      }
      return V;
    }
    function q(z) {
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
    function ie(z) {
      return !z.constructor || !z.constructor.name ? x : z.constructor.name;
    }
    return p.checkPropTypes = i, p.resetWarningCache = i.resetWarningCache, p.PropTypes = p, p;
  }, ma;
}
var ha, sd;
function Eg() {
  if (sd) return ha;
  sd = 1;
  var e = gl();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, ha = function() {
    function r(l, c, u, f, m, y) {
      if (y !== e) {
        var x = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw x.name = "Invariant Violation", x;
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
  }, ha;
}
if (process.env.NODE_ENV !== "production") {
  var Og = np(), Rg = !0;
  Da.exports = wg()(Og.isElement, Rg);
} else
  Da.exports = Eg()();
var _g = Da.exports;
const o = /* @__PURE__ */ Yh(_g);
function Ng(e) {
  return e == null || Object.keys(e).length === 0;
}
function bl(e) {
  const {
    styles: t,
    defaultTheme: n = {}
  } = e;
  return /* @__PURE__ */ a(pg, {
    styles: typeof t == "function" ? (i) => t(Ng(i) ? n : i) : t
  });
}
process.env.NODE_ENV !== "production" && (bl.propTypes = {
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
function ip(e, t) {
  const n = Aa(e, t);
  return process.env.NODE_ENV !== "production" ? (...r) => {
    const i = typeof e == "string" ? `"${e}"` : "component";
    return r.length === 0 ? console.error([`MUI: Seems like you called \`styled(${i})()\` without a \`style\` argument.`, 'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.'].join(`
`)) : r.some((s) => s === void 0) && console.error(`MUI: the styled(${i})(...args) API requires all its args to be defined.`), n(...r);
  } : n;
}
function kg(e, t) {
  Array.isArray(e.__emotion_styles) && (e.__emotion_styles = t(e.__emotion_styles));
}
const ad = [];
function dn(e) {
  return ad[0] = e, pi(ad);
}
var Ba = { exports: {} }, ht = {};
/**
 * @license React
 * react-is.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ld;
function Pg() {
  if (ld) return ht;
  ld = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), s = Symbol.for("react.consumer"), l = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), m = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), x = Symbol.for("react.view_transition"), p = Symbol.for("react.client.reference");
  function v(h) {
    if (typeof h == "object" && h !== null) {
      var E = h.$$typeof;
      switch (E) {
        case e:
          switch (h = h.type, h) {
            case n:
            case i:
            case r:
            case u:
            case f:
            case x:
              return h;
            default:
              switch (h = h && h.$$typeof, h) {
                case l:
                case c:
                case y:
                case m:
                  return h;
                case s:
                  return h;
                default:
                  return E;
              }
          }
        case t:
          return E;
      }
    }
  }
  return ht.ContextConsumer = s, ht.ContextProvider = l, ht.Element = e, ht.ForwardRef = c, ht.Fragment = n, ht.Lazy = y, ht.Memo = m, ht.Portal = t, ht.Profiler = i, ht.StrictMode = r, ht.Suspense = u, ht.SuspenseList = f, ht.isContextConsumer = function(h) {
    return v(h) === s;
  }, ht.isContextProvider = function(h) {
    return v(h) === l;
  }, ht.isElement = function(h) {
    return typeof h == "object" && h !== null && h.$$typeof === e;
  }, ht.isForwardRef = function(h) {
    return v(h) === c;
  }, ht.isFragment = function(h) {
    return v(h) === n;
  }, ht.isLazy = function(h) {
    return v(h) === y;
  }, ht.isMemo = function(h) {
    return v(h) === m;
  }, ht.isPortal = function(h) {
    return v(h) === t;
  }, ht.isProfiler = function(h) {
    return v(h) === i;
  }, ht.isStrictMode = function(h) {
    return v(h) === r;
  }, ht.isSuspense = function(h) {
    return v(h) === u;
  }, ht.isSuspenseList = function(h) {
    return v(h) === f;
  }, ht.isValidElementType = function(h) {
    return typeof h == "string" || typeof h == "function" || h === n || h === i || h === r || h === u || h === f || typeof h == "object" && h !== null && (h.$$typeof === y || h.$$typeof === m || h.$$typeof === l || h.$$typeof === s || h.$$typeof === c || h.$$typeof === p || h.getModuleId !== void 0);
  }, ht.typeOf = v, ht;
}
var gt = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var cd;
function Ig() {
  return cd || (cd = 1, process.env.NODE_ENV !== "production" && function() {
    function e(h) {
      if (typeof h == "object" && h !== null) {
        var E = h.$$typeof;
        switch (E) {
          case t:
            switch (h = h.type, h) {
              case r:
              case s:
              case i:
              case f:
              case m:
              case p:
                return h;
              default:
                switch (h = h && h.$$typeof, h) {
                  case c:
                  case u:
                  case x:
                  case y:
                    return h;
                  case l:
                    return h;
                  default:
                    return E;
                }
            }
          case n:
            return E;
        }
      }
    }
    var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), l = Symbol.for("react.consumer"), c = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), f = Symbol.for("react.suspense"), m = Symbol.for("react.suspense_list"), y = Symbol.for("react.memo"), x = Symbol.for("react.lazy"), p = Symbol.for("react.view_transition"), v = Symbol.for("react.client.reference");
    gt.ContextConsumer = l, gt.ContextProvider = c, gt.Element = t, gt.ForwardRef = u, gt.Fragment = r, gt.Lazy = x, gt.Memo = y, gt.Portal = n, gt.Profiler = s, gt.StrictMode = i, gt.Suspense = f, gt.SuspenseList = m, gt.isContextConsumer = function(h) {
      return e(h) === l;
    }, gt.isContextProvider = function(h) {
      return e(h) === c;
    }, gt.isElement = function(h) {
      return typeof h == "object" && h !== null && h.$$typeof === t;
    }, gt.isForwardRef = function(h) {
      return e(h) === u;
    }, gt.isFragment = function(h) {
      return e(h) === r;
    }, gt.isLazy = function(h) {
      return e(h) === x;
    }, gt.isMemo = function(h) {
      return e(h) === y;
    }, gt.isPortal = function(h) {
      return e(h) === n;
    }, gt.isProfiler = function(h) {
      return e(h) === s;
    }, gt.isStrictMode = function(h) {
      return e(h) === i;
    }, gt.isSuspense = function(h) {
      return e(h) === f;
    }, gt.isSuspenseList = function(h) {
      return e(h) === m;
    }, gt.isValidElementType = function(h) {
      return typeof h == "string" || typeof h == "function" || h === r || h === s || h === i || h === f || h === m || typeof h == "object" && h !== null && (h.$$typeof === x || h.$$typeof === y || h.$$typeof === c || h.$$typeof === l || h.$$typeof === u || h.$$typeof === v || h.getModuleId !== void 0);
    }, gt.typeOf = e;
  }()), gt;
}
process.env.NODE_ENV === "production" ? Ba.exports = Pg() : Ba.exports = Ig();
var Nn = Ba.exports;
function Zo(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function sp(e) {
  if (/* @__PURE__ */ b.isValidElement(e) || Nn.isValidElementType(e) || !Zo(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[n] = sp(e[n]);
  }), t;
}
function jt(e, t, n = {
  clone: !0
}) {
  const r = n.clone ? {
    ...e
  } : e;
  return Zo(e) && Zo(t) && Object.keys(t).forEach((i) => {
    /* @__PURE__ */ b.isValidElement(t[i]) || Nn.isValidElementType(t[i]) ? r[i] = t[i] : Zo(t[i]) && // Avoid prototype pollution
    Object.prototype.hasOwnProperty.call(e, i) && Zo(e[i]) ? r[i] = jt(e[i], t[i], n) : n.clone ? r[i] = Zo(t[i]) ? sp(t[i]) : t[i] : r[i] = t[i];
  }), r;
}
const $g = (e) => {
  const t = Object.keys(e).map((n) => ({
    key: n,
    val: e[n]
  })) || [];
  return t.sort((n, r) => n.val - r.val), t.reduce((n, r) => ({
    ...n,
    [r.key]: r.val
  }), {});
};
function ap(e) {
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
  } = e, s = $g(t), l = Object.keys(s);
  function c(p) {
    return `@media (min-width:${typeof t[p] == "number" ? t[p] : p}${n})`;
  }
  function u(p) {
    return `@media (max-width:${(typeof t[p] == "number" ? t[p] : p) - r / 100}${n})`;
  }
  function f(p, v) {
    const h = l.indexOf(v);
    return `@media (min-width:${typeof t[p] == "number" ? t[p] : p}${n}) and (max-width:${(h !== -1 && typeof t[l[h]] == "number" ? t[l[h]] : v) - r / 100}${n})`;
  }
  function m(p) {
    return l.indexOf(p) + 1 < l.length ? f(p, l[l.indexOf(p) + 1]) : c(p);
  }
  function y(p) {
    const v = l.indexOf(p);
    return v === 0 ? c(l[1]) : v === l.length - 1 ? u(l[v]) : f(p, l[l.indexOf(p) + 1]).replace("@media", "@media not all and");
  }
  const x = [];
  for (let p = 0; p < l.length; p += 1)
    x.push(c(l[p]));
  return {
    keys: l,
    values: s,
    up: c,
    down: u,
    between: f,
    only: m,
    not: y,
    unit: n,
    internal_mediaKeys: x,
    ...i
  };
}
const dd = /min-width:\s*([0-9.]+)/;
function ud(e, t) {
  if (!e.containerQueries || !Mg(t))
    return t;
  const n = [];
  for (const i in t)
    i.startsWith("@container") && n.push(i);
  n.sort((i, s) => {
    var l, c;
    return +(((l = i.match(dd)) == null ? void 0 : l[1]) || 0) - +(((c = s.match(dd)) == null ? void 0 : c[1]) || 0);
  });
  const r = t;
  for (let i = 0; i < n.length; i += 1) {
    const s = n[i], l = r[s];
    delete r[s], r[s] = l;
  }
  return r;
}
function Mg(e) {
  for (const t in e)
    if (t.startsWith("@container"))
      return !0;
  return !1;
}
function lp(e, t) {
  return t === "@" || t.startsWith("@") && (e.some((n) => t.startsWith(`@${n}`)) || !!t.match(/^@\d/));
}
function Ag(e, t) {
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
function Dg(e) {
  const t = (s, l) => s.replace("@media", l ? `@container ${l}` : "@container");
  function n(s, l) {
    s.up = (...c) => t(e.breakpoints.up(...c), l), s.down = (...c) => t(e.breakpoints.down(...c), l), s.between = (...c) => t(e.breakpoints.between(...c), l), s.only = (...c) => t(e.breakpoints.only(...c), l), s.not = (...c) => {
      const u = t(e.breakpoints.not(...c), l);
      return u.includes("not all and") ? u.replace("not all and ", "").replace("min-width:", "width<").replace("max-width:", "width>").replace("and", "or") : u;
    };
  }
  const r = {}, i = (s) => (n(r, s), r);
  return n(i), {
    ...e,
    containerQueries: i
  };
}
const Bg = {
  borderRadius: 4
}, fn = process.env.NODE_ENV !== "production" ? o.oneOfType([o.number, o.string, o.object, o.array]) : {};
function cp(e) {
  if (e == null)
    return !0;
  for (const t in e)
    return !1;
  return !0;
}
function Xn(e, t) {
  const n = Array.isArray(t), r = Array.isArray(e);
  return zg(t) ? t : Vg(e) ? tr(t) : n && r ? jg(e, t) : n !== r ? tr(t) : Ug(e, t);
}
function Lg(e) {
  let t = 0;
  const n = e.length, r = new Array(n);
  for (t = 0; t < n; t += 1)
    r[t] = tr(e[t]);
  return r;
}
function Fg(e) {
  const t = {};
  for (const n in e)
    t[n] = tr(e[n]);
  return t;
}
function jg(e, t) {
  const n = e.length;
  for (let r = 0; r < t.length; r += 1)
    e[n + r] = tr(t[r]);
  return e;
}
function Wg(e) {
  return typeof e == "object" && e !== null && !(e instanceof RegExp) && !(e instanceof Date);
}
function zg(e) {
  return typeof e != "object" || e === null;
}
function Vg(e) {
  return typeof e != "object" || e === null || e instanceof RegExp || e instanceof Date;
}
function tr(e) {
  return Wg(e) ? Array.isArray(e) ? Lg(e) : Fg(e) : e;
}
function Ug(e, t) {
  for (const n in t)
    n in e ? e[n] = Xn(e[n], t[n]) : e[n] = tr(t[n]);
  return e;
}
const Gg = {}, ks = {
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
}, ls = ap({
  values: ks
}), Hg = {
  containerQueries: (e) => ({
    up: (t) => {
      let n = typeof t == "number" ? t : ks[t] || t;
      return typeof n == "number" && (n = `${n}px`), e ? `@container ${e} (min-width:${n})` : `@container (min-width:${n})`;
    }
  })
};
function un(e, t, n) {
  const r = {};
  return Ps(r, e.theme, t, (i, s, l) => {
    const c = n(s, l);
    i ? r[i] = c : Xn(r, c);
  });
}
function Ps(e, t, n, r) {
  if (t ?? (t = Gg), Array.isArray(n)) {
    const i = t.breakpoints ?? ls;
    for (let s = 0; s < n.length; s += 1)
      ga(e, i.up(i.keys[s]), n[s], void 0, r);
    return e;
  }
  if (typeof n == "object") {
    const i = t.breakpoints ?? ls, s = i.values ?? ks;
    for (const l in n)
      if (lp(i.keys, l)) {
        const c = Ag(t.containerQueries ? t : Hg, l);
        c && ga(e, c, n[l], l, r);
      } else if (l in s) {
        const c = i.up(l);
        ga(e, c, n[l], l, r);
      } else {
        const c = l;
        e[c] = n[c];
      }
    return e;
  }
  return r(void 0, n), e;
}
function ga(e, t, n, r, i) {
  e[t] ?? (e[t] = {}), i(t, n, r);
}
function dp(e = ls) {
  const {
    internal_mediaKeys: t
  } = e, n = {};
  for (let r = 0; r < t.length; r += 1)
    n[t[r]] = {};
  return n;
}
function La(e, t) {
  const n = e.internal_mediaKeys;
  for (let r = 0; r < n.length; r += 1) {
    const i = n[r];
    cp(t[i]) && delete t[i];
  }
  return t;
}
function qg(e, ...t) {
  const r = [dp(e), ...t].reduce((i, s) => jt(i, s), {});
  return La(e, r);
}
function Kg(e, t) {
  if (typeof e != "object")
    return {};
  const n = {}, r = Object.keys(t);
  return Array.isArray(e) ? r.forEach((i, s) => {
    s < e.length && (n[i] = !0);
  }) : r.forEach((i) => {
    e[i] != null && (n[i] = !0);
  }), n;
}
function ba({
  values: e,
  breakpoints: t,
  base: n
}) {
  const r = n || Kg(e, t), i = Object.keys(r);
  if (i.length === 0)
    return e;
  let s;
  return i.reduce((l, c, u) => (Array.isArray(e) ? (l[c] = e[u] != null ? e[u] : e[s], s = u) : typeof e == "object" ? (l[c] = e[c] != null ? e[c] : e[s], s = c) : l[c] = e, l), {});
}
function Yg(e, t) {
  if (Array.isArray(t))
    return !0;
  if (typeof t == "object" && t !== null) {
    for (let r = 0; r < e.keys.length; r += 1)
      if (e.keys[r] in t)
        return !0;
    const n = Object.keys(t);
    for (let r = 0; r < n.length; r += 1)
      if (lp(e.keys, n[r]))
        return !0;
  }
  return !1;
}
function xe(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : nn(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function up(e, t, n, r) {
  let i;
  return typeof e == "function" ? i = e(n) : Array.isArray(e) ? i = e[n] || n : typeof n == "string" ? i = Is(e, n, !0, r) || n : i = n, t && (i = t(i, n, e)), i;
}
function Is(e, t, n = !0, r = void 0) {
  if (!e || !t)
    return null;
  const i = t.split(".");
  if (e.vars && n) {
    const s = pd(e.vars, i, r);
    if (s != null)
      return s;
  }
  return pd(e, i, r);
}
function pd(e, t, n = void 0) {
  let r, i = e, s = 0;
  for (; s < t.length; ) {
    if (i == null)
      return i;
    r = i, i = i[t[s]], s += 1;
  }
  if (n && i === void 0) {
    const l = t[t.length - 1], c = `${n}${l === "default" ? "" : xe(l)}`;
    return r == null ? void 0 : r[c];
  }
  return i;
}
function _t(e) {
  const {
    prop: t,
    cssProperty: n = e.prop,
    themeKey: r,
    transform: i
  } = e, s = (l) => {
    if (l[t] == null)
      return null;
    const c = l[t], u = l.theme, f = Is(u, r) || {};
    return un(l, c, (y) => {
      const x = up(f, i, y, t);
      return n === !1 ? x : {
        [n]: x
      };
    });
  };
  return s.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: fn
  } : {}, s.filterProps = [t], s;
}
const Xg = {
  internal_cache: {}
}, cs = {
  m: "margin",
  p: "padding"
}, fd = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, md = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, ei = {};
for (const e in cs)
  ei[e] = [cs[e]];
for (const e in cs)
  for (const t in fd) {
    const n = cs[e], r = fd[t], i = Array.isArray(r) ? r.map((s) => n + s) : [n + r];
    ei[e + t] = i;
  }
for (const e in md)
  ei[e] = ei[md[e]];
const $s = /* @__PURE__ */ new Set(["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"]), Ms = /* @__PURE__ */ new Set(["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"]), Jg = /* @__PURE__ */ new Set([...$s, ...Ms]);
function hi(e, t, n, r) {
  const i = Is(e, t, !0) ?? n;
  return typeof i == "number" || typeof i == "string" ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && typeof s != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`), typeof i == "string" ? i.startsWith("var(") && s === 0 ? 0 : i.startsWith("var(") && s === 1 ? i : `calc(${s} * ${i})` : i * s) : Array.isArray(i) ? (s) => {
    if (typeof s == "string")
      return s;
    const l = Math.abs(s);
    process.env.NODE_ENV !== "production" && (Number.isInteger(l) ? l > i.length - 1 && console.error([`MUI: The value provided (${l}) overflows.`, `The supported values are: ${JSON.stringify(i)}.`, `${l} > ${i.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`)));
    const c = i[l];
    return s >= 0 ? c : typeof c == "number" ? -c : typeof c == "string" && c.startsWith("var(") ? `calc(-1 * ${c})` : `-${c}`;
  } : typeof i == "function" ? i : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function As(e) {
  return hi(e, "spacing", 8, "spacing");
}
function kn(e, t) {
  return typeof t == "string" || t == null ? t : e(t);
}
const hd = [""];
function pp(e, t) {
  var s;
  const n = e.theme ?? Xg, r = ((s = n == null ? void 0 : n.internal_cache) == null ? void 0 : s.unarySpacing) ?? As(n), i = {};
  for (const l in e) {
    if (!t.has(l))
      continue;
    const c = ei[l] ?? (hd[0] = l, hd), u = e[l];
    Ps(i, e.theme, u, (f, m) => {
      const y = f ? i[f] : i;
      for (let x = 0; x < c.length; x += 1)
        y[c[x]] = kn(r, m);
    });
  }
  return i;
}
function Et(e) {
  return pp(e, $s);
}
Et.propTypes = process.env.NODE_ENV !== "production" ? Array.from($s).reduce((e, t) => (e[t] = fn, e), {}) : {};
Et.filterProps = $s;
function Ot(e) {
  return pp(e, Ms);
}
Ot.propTypes = process.env.NODE_ENV !== "production" ? Array.from(Ms).reduce((e, t) => (e[t] = fn, e), {}) : {};
Ot.filterProps = Ms;
process.env.NODE_ENV !== "production" && Array.from(Jg).reduce((e, t) => (e[t] = fn, e), {});
function fp(e = 8, t = As({
  spacing: e
})) {
  if (e.mui)
    return e;
  const n = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((s) => {
    const l = t(s);
    return typeof l == "number" ? `${l}px` : l;
  }).join(" "));
  return n.mui = !0, n;
}
function Ds(...e) {
  const t = e.reduce((r, i) => (i.filterProps.forEach((s) => {
    r[s] = i;
  }), r), {}), n = (r) => {
    const i = {};
    for (const s in r)
      t[s] && Xn(i, t[s](r));
    return i;
  };
  return n.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((r, i) => Object.assign(r, i.propTypes), {}) : {}, n.filterProps = e.reduce((r, i) => r.concat(i.filterProps), []), n;
}
function bo(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function Co(e, t) {
  return _t({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const Qg = Co("border", bo), Zg = Co("borderTop", bo), eb = Co("borderRight", bo), tb = Co("borderBottom", bo), ob = Co("borderLeft", bo), nb = Co("borderColor"), rb = Co("borderTopColor"), ib = Co("borderRightColor"), sb = Co("borderBottomColor"), ab = Co("borderLeftColor"), lb = Co("outline", bo), cb = Co("outlineColor"), Bs = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = hi(e.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: kn(t, r)
    });
    return un(e, e.borderRadius, n);
  }
  return null;
};
Bs.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: fn
} : {};
Bs.filterProps = ["borderRadius"];
Ds(Qg, Zg, eb, tb, ob, nb, rb, ib, sb, ab, Bs, lb, cb);
const Ls = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = hi(e.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: kn(t, r)
    });
    return un(e, e.gap, n);
  }
  return null;
};
Ls.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: fn
} : {};
Ls.filterProps = ["gap"];
const Fs = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = hi(e.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: kn(t, r)
    });
    return un(e, e.columnGap, n);
  }
  return null;
};
Fs.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: fn
} : {};
Fs.filterProps = ["columnGap"];
const js = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = hi(e.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: kn(t, r)
    });
    return un(e, e.rowGap, n);
  }
  return null;
};
js.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: fn
} : {};
js.filterProps = ["rowGap"];
const db = _t({
  prop: "gridColumn"
}), ub = _t({
  prop: "gridRow"
}), pb = _t({
  prop: "gridAutoFlow"
}), fb = _t({
  prop: "gridAutoColumns"
}), mb = _t({
  prop: "gridAutoRows"
}), hb = _t({
  prop: "gridTemplateColumns"
}), gb = _t({
  prop: "gridTemplateRows"
}), bb = _t({
  prop: "gridTemplateAreas"
}), yb = _t({
  prop: "gridArea"
});
Ds(Ls, Fs, js, db, ub, pb, fb, mb, hb, gb, bb, yb);
function Jn(e, t) {
  return t === "grey" ? t : e;
}
const vb = _t({
  prop: "color",
  themeKey: "palette",
  transform: Jn
}), xb = _t({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Jn
}), Cb = _t({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Jn
});
Ds(vb, xb, Cb);
function so(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const Sb = _t({
  prop: "width",
  transform: so
}), yl = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (n) => {
      var i, s, l, c, u;
      const r = ((l = (s = (i = e.theme) == null ? void 0 : i.breakpoints) == null ? void 0 : s.values) == null ? void 0 : l[n]) || ks[n];
      return r ? ((u = (c = e.theme) == null ? void 0 : c.breakpoints) == null ? void 0 : u.unit) !== "px" ? {
        maxWidth: `${r}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: r
      } : {
        maxWidth: so(n)
      };
    };
    return un(e, e.maxWidth, t);
  }
  return null;
};
yl.filterProps = ["maxWidth"];
const Tb = _t({
  prop: "minWidth",
  transform: so
}), wb = _t({
  prop: "height",
  transform: so
}), Eb = _t({
  prop: "maxHeight",
  transform: so
}), Ob = _t({
  prop: "minHeight",
  transform: so
});
_t({
  prop: "size",
  cssProperty: "width",
  transform: so
});
_t({
  prop: "size",
  cssProperty: "height",
  transform: so
});
const Rb = _t({
  prop: "boxSizing"
});
Ds(Sb, yl, Tb, wb, Eb, Ob, Rb);
const Ws = {
  // borders
  border: {
    themeKey: "borders",
    transform: bo
  },
  borderTop: {
    themeKey: "borders",
    transform: bo
  },
  borderRight: {
    themeKey: "borders",
    transform: bo
  },
  borderBottom: {
    themeKey: "borders",
    transform: bo
  },
  borderLeft: {
    themeKey: "borders",
    transform: bo
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
    transform: bo
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: Bs
  },
  // palette
  color: {
    themeKey: "palette",
    transform: Jn
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: Jn
  },
  backgroundColor: {
    themeKey: "palette",
    transform: Jn
  },
  // spacing
  p: {
    style: Ot
  },
  pt: {
    style: Ot
  },
  pr: {
    style: Ot
  },
  pb: {
    style: Ot
  },
  pl: {
    style: Ot
  },
  px: {
    style: Ot
  },
  py: {
    style: Ot
  },
  padding: {
    style: Ot
  },
  paddingTop: {
    style: Ot
  },
  paddingRight: {
    style: Ot
  },
  paddingBottom: {
    style: Ot
  },
  paddingLeft: {
    style: Ot
  },
  paddingX: {
    style: Ot
  },
  paddingY: {
    style: Ot
  },
  paddingInline: {
    style: Ot
  },
  paddingInlineStart: {
    style: Ot
  },
  paddingInlineEnd: {
    style: Ot
  },
  paddingBlock: {
    style: Ot
  },
  paddingBlockStart: {
    style: Ot
  },
  paddingBlockEnd: {
    style: Ot
  },
  m: {
    style: Et
  },
  mt: {
    style: Et
  },
  mr: {
    style: Et
  },
  mb: {
    style: Et
  },
  ml: {
    style: Et
  },
  mx: {
    style: Et
  },
  my: {
    style: Et
  },
  margin: {
    style: Et
  },
  marginTop: {
    style: Et
  },
  marginRight: {
    style: Et
  },
  marginBottom: {
    style: Et
  },
  marginLeft: {
    style: Et
  },
  marginX: {
    style: Et
  },
  marginY: {
    style: Et
  },
  marginInline: {
    style: Et
  },
  marginInlineStart: {
    style: Et
  },
  marginInlineEnd: {
    style: Et
  },
  marginBlock: {
    style: Et
  },
  marginBlockStart: {
    style: Et
  },
  marginBlockEnd: {
    style: Et
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
    style: Ls
  },
  rowGap: {
    style: js
  },
  columnGap: {
    style: Fs
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
    transform: so
  },
  maxWidth: {
    style: yl
  },
  minWidth: {
    transform: so
  },
  height: {
    transform: so
  },
  maxHeight: {
    transform: so
  },
  minHeight: {
    transform: so
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
}, _b = {};
function Nb() {
  function e(t) {
    if (!t.sx)
      return null;
    const {
      sx: n,
      theme: r = _b,
      nested: i
    } = t, s = r.unstable_sxConfig ?? Ws, l = {
      sx: null,
      theme: r,
      nested: !0
    };
    function c(u) {
      let f = u;
      if (typeof u == "function")
        f = u(r);
      else if (typeof u != "object")
        return u;
      if (!f)
        return null;
      const m = r.breakpoints ?? ls, y = dp(m);
      for (const x in f) {
        const p = kb(f[x], r);
        if (p != null) {
          if (typeof p != "object") {
            gd(y, x, p, r, s);
            continue;
          }
          if (s[x]) {
            gd(y, x, p, r, s);
            continue;
          }
          Yg(m, p) ? Ps(y, t.theme, p, (v, h) => {
            y[v][x] = h;
          }) : (l.sx = p, y[x] = e(l));
        }
      }
      return !i && r.modularCssLayers ? {
        "@layer sx": ud(r, La(m, y))
      } : ud(r, La(m, y));
    }
    return Array.isArray(n) ? n.map(c) : c(n);
  }
  return e.filterProps = ["sx"], e;
}
const Pn = Nb();
function gd(e, t, n, r, i) {
  const s = i[t];
  if (!s) {
    e[t] = n;
    return;
  }
  if (n == null)
    return;
  const {
    themeKey: l
  } = s;
  if (l === "typography" && n === "inherit") {
    e[t] = n;
    return;
  }
  const {
    style: c
  } = s;
  if (c) {
    Xn(e, c({
      [t]: n,
      theme: r
    }));
    return;
  }
  const {
    cssProperty: u = t,
    transform: f
  } = s, m = Is(r, l);
  Ps(e, r, n, (y, x) => {
    const p = up(m, f, x, t);
    u === !1 ? Xn(y ? e[y] : e, p) : y ? e[y][u] = p : e[u] = p;
  });
}
function kb(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Pb(e, t) {
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
function gi(e = {}, ...t) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: i,
    shape: s = {},
    ...l
  } = e, c = ap(n), u = fp(i);
  let f = jt({
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
      ...Bg,
      ...s
    }
  }, l);
  return f = Dg(f), f.applyStyles = Pb, f = t.reduce((m, y) => jt(m, y), f), f.unstable_sxConfig = {
    ...Ws,
    ...l == null ? void 0 : l.unstable_sxConfig
  }, f.unstable_sx = function(y) {
    return Pn({
      sx: y,
      theme: this
    });
  }, f.internal_cache = {}, f;
}
function Ib(e) {
  return Object.keys(e).length === 0;
}
function vl(e = null) {
  const t = b.useContext(fi);
  return !t || Ib(t) ? e : t;
}
const $b = gi();
function zs(e = $b) {
  return vl(e);
}
function ya(e) {
  const t = dn(e);
  return e !== t && t.styles ? (t.styles.match(/^@layer\s+[^{]*$/) || (t.styles = `@layer global{${t.styles}}`), t) : e;
}
function xl({
  styles: e,
  themeId: t,
  defaultTheme: n = {}
}) {
  const r = zs(n), i = t && r[t] || r;
  let s = typeof e == "function" ? e(i) : e;
  return i.modularCssLayers && (Array.isArray(s) ? s = s.map((l) => ya(typeof l == "function" ? l(i) : l)) : s = ya(s)), /* @__PURE__ */ a(bl, {
    styles: s
  });
}
process.env.NODE_ENV !== "production" && (xl.propTypes = {
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
const bd = (e) => e, Mb = () => {
  let e = bd;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = bd;
    }
  };
}, mp = Mb();
function hp(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var i = e.length;
    for (t = 0; t < i; t++) e[t] && (n = hp(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function pe() {
  for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = hp(e)) && (r && (r += " "), r += t);
  return r;
}
function Ab(e = {}) {
  const {
    themeId: t,
    defaultTheme: n,
    defaultClassName: r = "MuiBox-root",
    generateClassName: i
  } = e, s = ip("div", {
    shouldForwardProp: (c) => c !== "theme" && c !== "sx" && c !== "as"
  })(Pn);
  return /* @__PURE__ */ b.forwardRef(function(u, f) {
    const m = zs(n), {
      className: y,
      component: x = "div",
      ...p
    } = u;
    return /* @__PURE__ */ a(s, {
      as: x,
      ref: f,
      className: pe(y, i ? i(r) : r),
      theme: t && m[t] || m,
      ...p
    });
  });
}
const Db = {
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
function Ce(e, t, n = "Mui") {
  const r = Db[t];
  return r ? `${n}-${r}` : `${mp.generate(e)}-${t}`;
}
function Te(e, t, n = "Mui") {
  const r = {};
  return t.forEach((i) => {
    r[i] = Ce(e, i, n);
  }), r;
}
function gp(e, t = "") {
  return e.displayName || e.name || t;
}
function yd(e, t, n) {
  const r = gp(t);
  return e.displayName || (r !== "" ? `${n}(${r})` : n);
}
function Bb(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return gp(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Nn.ForwardRef:
          return yd(e, e.render, "ForwardRef");
        case Nn.Memo:
          return yd(e, e.type, "memo");
        default:
          return;
      }
  }
}
function bp(e) {
  const {
    variants: t,
    ...n
  } = e, r = {
    variants: t,
    style: dn(n),
    isProcessed: !0
  };
  return r.style === n || t && t.forEach((i) => {
    typeof i.style != "function" && (i.style = dn(i.style));
  }), r;
}
const Lb = gi();
function va(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
function On(e, t) {
  return t && e && typeof e == "object" && e.styles && !e.styles.startsWith("@layer") && (e.styles = `@layer ${t}{${String(e.styles)}}`), e;
}
function Fb(e) {
  return e ? (t, n) => n[e] : null;
}
function jb(e, t, n) {
  e.theme = cp(e.theme) ? n : e.theme[t] || e.theme;
}
function ns(e, t, n) {
  const r = typeof t == "function" ? t(e) : t;
  if (Array.isArray(r))
    return r.flatMap((i) => ns(e, i, n));
  if (Array.isArray(r == null ? void 0 : r.variants)) {
    let i;
    if (r.isProcessed)
      i = n ? On(r.style, n) : r.style;
    else {
      const {
        variants: s,
        ...l
      } = r;
      i = n ? On(dn(l), n) : l;
    }
    return yp(e, r.variants, [i], n);
  }
  return r != null && r.isProcessed ? n ? On(dn(r.style), n) : r.style : n ? On(dn(r), n) : r;
}
function yp(e, t, n = [], r = void 0) {
  var s;
  let i;
  e: for (let l = 0; l < t.length; l += 1) {
    const c = t[l];
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
    }), n.push(r ? On(dn(c.style(i)), r) : c.style(i))) : n.push(r ? On(dn(c.style), r) : c.style);
  }
  return n;
}
function vp(e = {}) {
  const {
    themeId: t,
    defaultTheme: n = Lb,
    rootShouldForwardProp: r = va,
    slotShouldForwardProp: i = va
  } = e;
  function s(c) {
    jb(c, t, n);
  }
  return (c, u = {}) => {
    kg(c, (N) => N.filter((M) => M !== Pn));
    const {
      name: f,
      slot: m,
      skipVariantsResolver: y,
      skipSx: x,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: p = Fb(xp(m)),
      ...v
    } = u, h = f && f.startsWith("Mui") || m ? "components" : "custom", E = y !== void 0 ? y : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      m && m !== "Root" && m !== "root" || !1
    ), _ = x || !1;
    let k = va;
    m === "Root" || m === "root" ? k = r : m ? k = i : Vb(c) && (k = void 0);
    const O = ip(c, {
      shouldForwardProp: k,
      label: zb(f, m),
      ...v
    }), w = (N) => {
      if (N.__emotion_real === N)
        return N;
      if (typeof N == "function")
        return function(D) {
          return ns(D, N, D.theme.modularCssLayers ? h : void 0);
        };
      if (Zo(N)) {
        const M = bp(N);
        return function(B) {
          return M.variants ? ns(B, M, B.theme.modularCssLayers ? h : void 0) : B.theme.modularCssLayers ? On(M.style, h) : M.style;
        };
      }
      return N;
    }, T = (...N) => {
      const M = [], D = N.map(w), B = [];
      if (M.push(s), f && p && B.push(function($) {
        var W, q;
        const A = (q = (W = $.theme.components) == null ? void 0 : W[f]) == null ? void 0 : q.styleOverrides;
        if (!A)
          return null;
        const L = {};
        for (const ie in A)
          L[ie] = ns($, A[ie], $.theme.modularCssLayers ? "theme" : void 0);
        return p($, L);
      }), f && !E && B.push(function($) {
        var L, W;
        const I = $.theme, A = (W = (L = I == null ? void 0 : I.components) == null ? void 0 : L[f]) == null ? void 0 : W.variants;
        return A ? yp($, A, [], $.theme.modularCssLayers ? "theme" : void 0) : null;
      }), _ || B.push(Pn), Array.isArray(D[0])) {
        const g = D.shift(), $ = new Array(M.length).fill(""), I = new Array(B.length).fill("");
        let A;
        A = [...$, ...g, ...I], A.raw = [...$, ...g.raw, ...I], M.unshift(A);
      }
      const F = [...M, ...D, ...B], P = O(...F);
      return c.muiName && (P.muiName = c.muiName), process.env.NODE_ENV !== "production" && (P.displayName = Wb(f, m, c)), P;
    };
    return O.withConfig && (T.withConfig = O.withConfig), T;
  };
}
function Wb(e, t, n) {
  return e ? `${e}${xe(t || "")}` : `Styled(${Bb(n)})`;
}
function zb(e, t) {
  let n;
  return process.env.NODE_ENV !== "production" && e && (n = `${e}-${xp(t || "Root")}`), n;
}
function Vb(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function xp(e) {
  return e && e.charAt(0).toLowerCase() + e.slice(1);
}
const Cp = vp();
function ti(e, t, n = !1) {
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
        const l = e[s], c = t[s];
        if (!c)
          r[s] = l || {};
        else if (!l)
          r[s] = c;
        else {
          r[s] = {
            ...c
          };
          for (const u in l)
            if (Object.prototype.hasOwnProperty.call(l, u)) {
              const f = u;
              r[s][f] = ti(l[f], c[f], n);
            }
        }
      } else s === "className" && n && t.className !== void 0 ? r.className = pe(e == null ? void 0 : e.className, t == null ? void 0 : t.className) : s === "style" && n && t.style ? r.style = {
        ...e == null ? void 0 : e.style,
        ...t == null ? void 0 : t.style
      } : r[s] === void 0 && (r[s] = e[s]);
    }
  return r;
}
function Ub(e) {
  const {
    theme: t,
    name: n,
    props: r
  } = e;
  return !t || !t.components || !t.components[n] || !t.components[n].defaultProps ? r : ti(t.components[n].defaultProps, r);
}
function Sp({
  props: e,
  name: t,
  defaultTheme: n,
  themeId: r
}) {
  let i = zs(n);
  return r && (i = i[r] || i), Ub({
    theme: i,
    name: t,
    props: e
  });
}
const It = typeof window < "u" ? b.useLayoutEffect : b.useEffect;
function Gb(e, t = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, n));
}
function Cl(e, t = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > n) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`), Gb(e, t, n);
}
function Hb(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let n = e.match(t);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), process.env.NODE_ENV !== "production" && e.length !== e.trim().length && console.error(`MUI: The color: "${e}" is invalid. Make sure the color input doesn't contain leading/trailing space.`), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, i) => i < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function pn(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return pn(Hb(e));
  const t = e.indexOf("("), n = e.substring(0, t);
  if (!["rgb", "rgba", "hsl", "hsla", "color"].includes(n))
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : nn(9, e));
  let r = e.substring(t + 1, e.length - 1), i;
  if (n === "color") {
    if (r = r.split(" "), i = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), !["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].includes(i))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${i}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : nn(10, i));
  } else
    r = r.split(",");
  return r = r.map((s) => parseFloat(s)), {
    type: n,
    values: r,
    colorSpace: i
  };
}
const qb = (e) => {
  const t = pn(e);
  return t.values.slice(0, 3).map((n, r) => t.type.includes("hsl") && r !== 0 ? `${n}%` : n).join(" ");
}, Ar = (e, t) => {
  try {
    return qb(e);
  } catch {
    return t && process.env.NODE_ENV !== "production" && console.warn(t), e;
  }
};
function Vs(e) {
  const {
    type: t,
    colorSpace: n
  } = e;
  let {
    values: r
  } = e;
  return t.includes("rgb") ? r = r.map((i, s) => s < 3 ? parseInt(i, 10) : i) : t.includes("hsl") && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), t.includes("color") ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${t}(${r})`;
}
function Tp(e) {
  e = pn(e);
  const {
    values: t
  } = e, n = t[0], r = t[1] / 100, i = t[2] / 100, s = r * Math.min(i, 1 - i), l = (f, m = (f + n / 30) % 12) => i - s * Math.max(Math.min(m - 3, 9 - m, 1), -1);
  let c = "rgb";
  const u = [Math.round(l(0) * 255), Math.round(l(8) * 255), Math.round(l(4) * 255)];
  return e.type === "hsla" && (c += "a", u.push(t[3])), Vs({
    type: c,
    values: u
  });
}
function Fa(e) {
  e = pn(e);
  let t = e.type === "hsl" || e.type === "hsla" ? pn(Tp(e)).values : e.values;
  return t = t.map((n) => (e.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function vd(e, t) {
  const n = Fa(e), r = Fa(t);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function ds(e, t) {
  return e = pn(e), t = Cl(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, Vs(e);
}
function xn(e, t, n) {
  try {
    return ds(e, t);
  } catch {
    return n && process.env.NODE_ENV !== "production" && console.warn(n), e;
  }
}
function Us(e, t) {
  if (e = pn(e), t = Cl(t), e.type.includes("hsl"))
    e.values[2] *= 1 - t;
  else if (e.type.includes("rgb") || e.type.includes("color"))
    for (let n = 0; n < 3; n += 1)
      e.values[n] *= 1 - t;
  return Vs(e);
}
function pt(e, t, n) {
  try {
    return Us(e, t);
  } catch {
    return n && process.env.NODE_ENV !== "production" && console.warn(n), e;
  }
}
function Gs(e, t) {
  if (e = pn(e), t = Cl(t), e.type.includes("hsl"))
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.includes("rgb"))
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (255 - e.values[n]) * t;
  else if (e.type.includes("color"))
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (1 - e.values[n]) * t;
  return Vs(e);
}
function ft(e, t, n) {
  try {
    return Gs(e, t);
  } catch {
    return n && process.env.NODE_ENV !== "production" && console.warn(n), e;
  }
}
function Kb(e, t = 0.15) {
  return Fa(e) > 0.5 ? Us(e, t) : Gs(e, t);
}
function $i(e, t, n) {
  try {
    return Kb(e, t);
  } catch {
    return e;
  }
}
const Yb = "exact-prop: ​";
function Hs(e) {
  return process.env.NODE_ENV === "production" ? e : {
    ...e,
    [Yb]: (t) => {
      const n = Object.keys(t).filter((r) => !e.hasOwnProperty(r));
      return n.length > 0 ? new Error(`The following props are not supported: ${n.map((r) => `\`${r}\``).join(", ")}. Please remove them.`) : null;
    }
  };
}
const Sl = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (Sl.displayName = "ThemeContext");
function Tl() {
  const e = b.useContext(Sl);
  return process.env.NODE_ENV !== "production" && b.useDebugValue(e), e;
}
const Xb = typeof Symbol == "function" && Symbol.for, Jb = Xb ? Symbol.for("mui.nested") : "__THEME_NESTED__";
function Qb(e, t) {
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
function us(e) {
  const {
    children: t,
    theme: n
  } = e, r = Tl();
  process.env.NODE_ENV !== "production" && r === null && typeof n == "function" && console.error(["MUI: You are providing a theme function prop to the ThemeProvider component:", "<ThemeProvider theme={outerTheme => outerTheme} />", "", "However, no outer theme is present.", "Make sure a theme is already injected higher in the React tree or provide a theme object."].join(`
`));
  const i = b.useMemo(() => {
    const s = r === null ? {
      ...n
    } : Qb(r, n);
    return s != null && (s[Jb] = r !== null), s;
  }, [n, r]);
  return /* @__PURE__ */ a(Sl.Provider, {
    value: i,
    children: t
  });
}
process.env.NODE_ENV !== "production" && (us.propTypes = {
  /**
   * Your component tree.
   */
  children: o.node,
  /**
   * A theme object. You can provide a function to extend the outer theme.
   */
  theme: o.oneOfType([o.object, o.func]).isRequired
});
process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "production" && (us.propTypes = Hs(us.propTypes));
const wp = /* @__PURE__ */ b.createContext();
function Ep({
  value: e,
  ...t
}) {
  return /* @__PURE__ */ a(wp.Provider, {
    value: e ?? !0,
    ...t
  });
}
process.env.NODE_ENV !== "production" && (Ep.propTypes = {
  children: o.node,
  value: o.bool
});
const qs = () => b.useContext(wp) ?? !1, Op = /* @__PURE__ */ b.createContext(void 0);
function Rp({
  value: e,
  children: t
}) {
  return /* @__PURE__ */ a(Op.Provider, {
    value: e,
    children: t
  });
}
process.env.NODE_ENV !== "production" && (Rp.propTypes = {
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
function Zb(e) {
  const {
    theme: t,
    name: n,
    props: r
  } = e;
  if (!t || !t.components || !t.components[n])
    return r;
  const i = t.components[n];
  return i.defaultProps ? ti(i.defaultProps, r, t.components.mergeClassNameAndStyle) : !i.styleOverrides && !i.variants ? ti(i, r, t.components.mergeClassNameAndStyle) : r;
}
function ey({
  props: e,
  name: t
}) {
  const n = b.useContext(Op);
  return Zb({
    props: e,
    name: t,
    theme: {
      components: n
    }
  });
}
let xd = 0;
function ty(e) {
  const [t, n] = b.useState(e), r = e || t;
  return b.useEffect(() => {
    t == null && (xd += 1, n(`mui-${xd}`));
  }, [t]), r;
}
const oy = {
  ...b
}, Cd = oy.useId;
function rn(e) {
  if (Cd !== void 0) {
    const t = Cd();
    return e ?? t;
  }
  return ty(e);
}
function ny(e) {
  const t = vl(), n = rn() || "", {
    modularCssLayers: r
  } = e;
  let i = "mui.global, mui.components, mui.theme, mui.custom, mui.sx";
  return !r || t !== null ? i = "" : typeof r == "string" ? i = r.replace(/mui(?!\.)/g, i) : i = `@layer ${i};`, It(() => {
    var c, u;
    const s = document.querySelector("head");
    if (!s)
      return;
    const l = s.firstChild;
    if (i) {
      if (l && ((c = l.hasAttribute) != null && c.call(l, "data-mui-layer-order")) && l.getAttribute("data-mui-layer-order") === n)
        return;
      const f = document.createElement("style");
      f.setAttribute("data-mui-layer-order", n), f.textContent = i, s.prepend(f);
    } else
      (u = s.querySelector(`style[data-mui-layer-order="${n}"]`)) == null || u.remove();
  }, [i, n]), i ? /* @__PURE__ */ a(xl, {
    styles: i
  }) : null;
}
const Sd = {};
function Td(e, t, n, r = !1) {
  return b.useMemo(() => {
    const i = e && t[e] || t;
    if (typeof n == "function") {
      const s = n(i), l = e ? {
        ...t,
        [e]: s
      } : s;
      return r ? () => l : l;
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
function oi(e) {
  const {
    children: t,
    theme: n,
    themeId: r
  } = e, i = vl(Sd), s = Tl() || Sd;
  process.env.NODE_ENV !== "production" && (i === null && typeof n == "function" || r && i && !i[r] && typeof n == "function") && console.error(["MUI: You are providing a theme function prop to the ThemeProvider component:", "<ThemeProvider theme={outerTheme => outerTheme} />", "", "However, no outer theme is present.", "Make sure a theme is already injected higher in the React tree or provide a theme object."].join(`
`));
  const l = Td(r, i, n), c = Td(r, s, n, !0), u = (r ? l[r] : l).direction === "rtl", f = ny(l);
  return /* @__PURE__ */ a(us, {
    theme: c,
    children: /* @__PURE__ */ a(fi.Provider, {
      value: l,
      children: /* @__PURE__ */ a(Ep, {
        value: u,
        children: /* @__PURE__ */ C(Rp, {
          value: r ? l[r].components : l.components,
          children: [f, t]
        })
      })
    })
  });
}
process.env.NODE_ENV !== "production" && (oi.propTypes = {
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
process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "production" && (oi.propTypes = Hs(oi.propTypes));
const wd = {
  theme: void 0
};
function ry(e) {
  let t, n;
  return function(i) {
    let s = t;
    return (s === void 0 || i.theme !== n) && (wd.theme = i.theme, s = bp(e(wd)), t = s, n = i.theme), s;
  };
}
const wl = "mode", El = "color-scheme", iy = "data-color-scheme";
function sy(e) {
  const {
    defaultMode: t = "system",
    defaultLightColorScheme: n = "light",
    defaultDarkColorScheme: r = "dark",
    modeStorageKey: i = wl,
    colorSchemeStorageKey: s = El,
    attribute: l = iy,
    colorSchemeNode: c = "document.documentElement",
    nonce: u
  } = e || {};
  let f = "", m = l;
  if (l === "class" && (m = ".%s"), l === "data" && (m = "[data-%s]"), m.startsWith(".")) {
    const x = m.substring(1);
    f += `${c}.classList.remove('${x}'.replace('%s', light), '${x}'.replace('%s', dark));
      ${c}.classList.add('${x}'.replace('%s', colorScheme));`;
  }
  const y = m.match(/\[([^[\]]+)\]/);
  if (y) {
    const [x, p] = y[1].split("=");
    p || (f += `${c}.removeAttribute('${x}'.replace('%s', light));
      ${c}.removeAttribute('${x}'.replace('%s', dark));`), f += `
      ${c}.setAttribute('${x}'.replace('%s', colorScheme), ${p ? `${p}.replace('%s', colorScheme)` : '""'});`;
  } else m !== ".%s" && (f += `${c}.setAttribute('${m}', colorScheme);`);
  return /* @__PURE__ */ a("script", {
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
    ${f}
  }
} catch(e){}})();`
    }
  }, "mui-color-scheme-init");
}
function ay() {
}
const ly = ({
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
      return ay;
    const r = (i) => {
      const s = i.newValue;
      i.key === e && n(s);
    };
    return t.addEventListener("storage", r), () => {
      t.removeEventListener("storage", r);
    };
  }
});
function xa() {
}
function Ed(e) {
  if (typeof window < "u" && typeof window.matchMedia == "function" && e === "system")
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function _p(e, t) {
  if (e.mode === "light" || e.mode === "system" && e.systemMode === "light")
    return t("light");
  if (e.mode === "dark" || e.mode === "system" && e.systemMode === "dark")
    return t("dark");
}
function cy(e) {
  return _p(e, (t) => {
    if (t === "light")
      return e.lightColorScheme;
    if (t === "dark")
      return e.darkColorScheme;
  });
}
function dy(e) {
  const {
    defaultMode: t = "light",
    defaultLightColorScheme: n,
    defaultDarkColorScheme: r,
    supportedColorSchemes: i = [],
    modeStorageKey: s = wl,
    colorSchemeStorageKey: l = El,
    storageWindow: c = typeof window > "u" ? void 0 : window,
    storageManager: u = ly,
    noSsr: f = !1
  } = e, m = i.join(","), y = i.length > 1, x = b.useMemo(() => u == null ? void 0 : u({
    key: s,
    storageWindow: c
  }), [u, s, c]), p = b.useMemo(() => u == null ? void 0 : u({
    key: `${l}-light`,
    storageWindow: c
  }), [u, l, c]), v = b.useMemo(() => u == null ? void 0 : u({
    key: `${l}-dark`,
    storageWindow: c
  }), [u, l, c]), [h, E] = b.useState(() => {
    const D = (x == null ? void 0 : x.get(t)) || t, B = (p == null ? void 0 : p.get(n)) || n, F = (v == null ? void 0 : v.get(r)) || r;
    return {
      mode: D,
      systemMode: Ed(D),
      lightColorScheme: B,
      darkColorScheme: F
    };
  }), [_, k] = b.useState(f || !y);
  b.useEffect(() => {
    k(!0);
  }, []);
  const O = cy(h), w = b.useCallback((D) => {
    E((B) => {
      if (D === B.mode)
        return B;
      const F = D ?? t;
      return x == null || x.set(F), {
        ...B,
        mode: F,
        systemMode: Ed(F)
      };
    });
  }, [x, t]), T = b.useCallback((D) => {
    D ? typeof D == "string" ? D && !m.includes(D) ? console.error(`\`${D}\` does not exist in \`theme.colorSchemes\`.`) : E((B) => {
      const F = {
        ...B
      };
      return _p(B, (P) => {
        P === "light" && (p == null || p.set(D), F.lightColorScheme = D), P === "dark" && (v == null || v.set(D), F.darkColorScheme = D);
      }), F;
    }) : E((B) => {
      const F = {
        ...B
      }, P = D.light === null ? n : D.light, g = D.dark === null ? r : D.dark;
      return P && (m.includes(P) ? (F.lightColorScheme = P, p == null || p.set(P)) : console.error(`\`${P}\` does not exist in \`theme.colorSchemes\`.`)), g && (m.includes(g) ? (F.darkColorScheme = g, v == null || v.set(g)) : console.error(`\`${g}\` does not exist in \`theme.colorSchemes\`.`)), F;
    }) : E((B) => (p == null || p.set(n), v == null || v.set(r), {
      ...B,
      lightColorScheme: n,
      darkColorScheme: r
    }));
  }, [m, p, v, n, r]), N = b.useCallback((D) => {
    h.mode === "system" && E((B) => {
      const F = D != null && D.matches ? "dark" : "light";
      return B.systemMode === F ? B : {
        ...B,
        systemMode: F
      };
    });
  }, [h.mode]), M = b.useRef(N);
  return M.current = N, b.useEffect(() => {
    if (typeof window.matchMedia != "function" || !y)
      return;
    const D = (...F) => M.current(...F), B = window.matchMedia("(prefers-color-scheme: dark)");
    return B.addListener(D), D(B), () => {
      B.removeListener(D);
    };
  }, [y]), b.useEffect(() => {
    if (y) {
      const D = (x == null ? void 0 : x.subscribe((P) => {
        (!P || ["light", "dark", "system"].includes(P)) && w(P || t);
      })) || xa, B = (p == null ? void 0 : p.subscribe((P) => {
        (!P || m.match(P)) && T({
          light: P
        });
      })) || xa, F = (v == null ? void 0 : v.subscribe((P) => {
        (!P || m.match(P)) && T({
          dark: P
        });
      })) || xa;
      return () => {
        D(), B(), F();
      };
    }
  }, [T, w, m, t, c, y, x, p, v]), {
    ...h,
    mode: _ ? h.mode : void 0,
    systemMode: _ ? h.systemMode : void 0,
    colorScheme: _ ? O : void 0,
    setMode: w,
    setColorScheme: T
  };
}
const uy = "*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";
function py(e) {
  const {
    themeId: t,
    /**
     * This `theme` object needs to follow a certain structure to
     * be used correctly by the finel `CssVarsProvider`. It should have a
     * `colorSchemes` key with the light and dark (and any other) palette.
     * It should also ideally have a vars object created using `prepareCssVars`.
     */
    theme: n = {},
    modeStorageKey: r = wl,
    colorSchemeStorageKey: i = El,
    disableTransitionOnChange: s = !1,
    defaultColorScheme: l,
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
  }, f = /* @__PURE__ */ b.createContext(void 0);
  process.env.NODE_ENV !== "production" && (f.displayName = "ColorSchemeContext");
  const m = () => b.useContext(f) || u, y = {}, x = {};
  function p(_) {
    var ze, Ke, He, Rt;
    const {
      children: k,
      theme: O,
      modeStorageKey: w = r,
      colorSchemeStorageKey: T = i,
      disableTransitionOnChange: N = s,
      storageManager: M,
      storageWindow: D = typeof window > "u" ? void 0 : window,
      documentNode: B = typeof document > "u" ? void 0 : document,
      colorSchemeNode: F = typeof document > "u" ? void 0 : document.documentElement,
      disableNestedContext: P = !1,
      disableStyleSheetGeneration: g = !1,
      defaultMode: $ = "system",
      forceThemeRerender: I = !1,
      noSsr: A
    } = _, L = b.useRef(!1), W = Tl(), q = b.useContext(f), ie = !!q && !P, z = b.useMemo(() => O || (typeof n == "function" ? n() : n), [O]), V = z[t], Q = V || z, {
      colorSchemes: re = y,
      components: ee = x,
      cssVarPrefix: G
    } = Q, K = Object.keys(re).filter((me) => !!re[me]).join(","), Y = b.useMemo(() => K.split(","), [K]), U = typeof l == "string" ? l : l.light, te = typeof l == "string" ? l : l.dark, ne = re[U] && re[te] ? $ : ((Ke = (ze = re[Q.defaultColorScheme]) == null ? void 0 : ze.palette) == null ? void 0 : Ke.mode) || ((He = Q.palette) == null ? void 0 : He.mode), {
      mode: ge,
      setMode: j,
      systemMode: fe,
      lightColorScheme: se,
      darkColorScheme: ke,
      colorScheme: Fe,
      setColorScheme: Z
    } = dy({
      supportedColorSchemes: Y,
      defaultLightColorScheme: U,
      defaultDarkColorScheme: te,
      modeStorageKey: w,
      colorSchemeStorageKey: T,
      defaultMode: ne,
      storageManager: M,
      storageWindow: D,
      noSsr: A
    });
    let Me = ge, Ee = Fe;
    ie && (Me = q.mode, Ee = q.colorScheme), process.env.NODE_ENV !== "production" && I && !Q.vars && console.warn(["MUI: The `forceThemeRerender` prop should only be used with CSS theme variables.", "Note that it will slow down the app when changing between modes, so only do this when you cannot find a better solution."].join(`
`));
    let Ue = Ee || Q.defaultColorScheme;
    Q.vars && !I && (Ue = Q.defaultColorScheme);
    const Re = b.useMemo(() => {
      var lt;
      const me = ((lt = Q.generateThemeVars) == null ? void 0 : lt.call(Q)) || Q.vars, Ae = {
        ...Q,
        components: ee,
        colorSchemes: re,
        cssVarPrefix: G,
        vars: me
      };
      if (typeof Ae.generateSpacing == "function" && (Ae.spacing = Ae.generateSpacing()), Ue) {
        const We = re[Ue];
        We && typeof We == "object" && Object.keys(We).forEach((_e) => {
          We[_e] && typeof We[_e] == "object" ? Ae[_e] = {
            ...Ae[_e],
            ...We[_e]
          } : Ae[_e] = We[_e];
        });
      }
      return c ? c(Ae) : Ae;
    }, [Q, Ue, ee, re, G]), Ge = Q.colorSchemeSelector;
    It(() => {
      if (Ee && F && Ge && Ge !== "media") {
        const me = Ge;
        let Ae = Ge;
        if (me === "class" && (Ae = ".%s"), me === "data" && (Ae = "[data-%s]"), me != null && me.startsWith("data-") && !me.includes("%s") && (Ae = `[${me}="%s"]`), Ae.startsWith("."))
          F.classList.remove(...Y.map((lt) => Ae.substring(1).replace("%s", lt))), F.classList.add(Ae.substring(1).replace("%s", Ee));
        else {
          const lt = Ae.replace("%s", Ee).match(/\[([^\]]+)\]/);
          if (lt) {
            const [We, _e] = lt[1].split("=");
            _e || Y.forEach((no) => {
              F.removeAttribute(We.replace(Ee, no));
            }), F.setAttribute(We, _e ? _e.replace(/"|'/g, "") : "");
          } else
            F.setAttribute(Ae, Ee);
        }
      }
    }, [Ee, Ge, F, Y]), b.useEffect(() => {
      let me;
      if (N && L.current && B) {
        const Ae = B.createElement("style");
        Ae.appendChild(B.createTextNode(uy)), B.head.appendChild(Ae), window.getComputedStyle(B.body), me = setTimeout(() => {
          B.head.removeChild(Ae);
        }, 1);
      }
      return () => {
        clearTimeout(me);
      };
    }, [Ee, N, B]), b.useEffect(() => (L.current = !0, () => {
      L.current = !1;
    }), []);
    const je = b.useMemo(() => ({
      allColorSchemes: Y,
      colorScheme: Ee,
      darkColorScheme: ke,
      lightColorScheme: se,
      mode: Me,
      setColorScheme: Z,
      setMode: process.env.NODE_ENV === "production" ? j : (me) => {
        Re.colorSchemeSelector === "media" && console.error(["MUI: The `setMode` function has no effect if `colorSchemeSelector` is `media` (`media` is the default value).", "To toggle the mode manually, please configure `colorSchemeSelector` to use a class or data attribute.", "To learn more, visit https://mui.com/material-ui/customization/css-theme-variables/configuration/#toggling-dark-mode-manually"].join(`
`)), j(me);
      },
      systemMode: fe
    }), [Y, Ee, ke, se, Me, Z, j, fe, Re.colorSchemeSelector]);
    let Pe = !0;
    (g || Q.cssVariables === !1 || ie && (W == null ? void 0 : W.cssVarPrefix) === G) && (Pe = !1);
    const le = /* @__PURE__ */ C(b.Fragment, {
      children: [/* @__PURE__ */ a(oi, {
        themeId: V ? t : void 0,
        theme: Re,
        children: k
      }), Pe && /* @__PURE__ */ a(bl, {
        styles: ((Rt = Re.generateStyleSheets) == null ? void 0 : Rt.call(Re)) || []
      })]
    });
    return ie ? le : /* @__PURE__ */ a(f.Provider, {
      value: je,
      children: le
    });
  }
  process.env.NODE_ENV !== "production" && (p.propTypes = {
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
  const v = typeof l == "string" ? l : l.light, h = typeof l == "string" ? l : l.dark;
  return {
    CssVarsProvider: p,
    useColorScheme: m,
    getInitColorSchemeScript: (_) => sy({
      colorSchemeStorageKey: i,
      defaultLightColorScheme: v,
      defaultDarkColorScheme: h,
      modeStorageKey: r,
      ..._
    })
  };
}
function fy(e = "") {
  function t(...r) {
    if (!r.length)
      return "";
    const i = r[0];
    return typeof i == "string" && !i.match(/(#|\(|\)|(-?(\d*\.)?\d+)(px|em|%|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc))|^(-?(\d*\.)?\d+)$|(\d+ \d+ \d+)/) ? `, var(--${e ? `${e}-` : ""}${i}${t(...r.slice(1))})` : `, ${i}`;
  }
  return (r, ...i) => `var(--${e ? `${e}-` : ""}${r}${t(...i)})`;
}
const Od = (e, t, n, r = []) => {
  let i = e;
  t.forEach((s, l) => {
    l === t.length - 1 ? Array.isArray(i) ? i[Number(s)] = n : i && typeof i == "object" && (i[s] = n) : i && typeof i == "object" && (i[s] || (i[s] = r.includes(s) ? [] : {}), i = i[s]);
  });
}, my = (e, t, n) => {
  function r(i, s = [], l = []) {
    Object.entries(i).forEach(([c, u]) => {
      (!n || n && !n([...s, c])) && u != null && (typeof u == "object" && Object.keys(u).length > 0 ? r(u, [...s, c], Array.isArray(u) ? [...l, c] : l) : t([...s, c], u, l));
    });
  }
  r(e);
}, hy = (e, t) => typeof t == "number" ? ["lineHeight", "fontWeight", "opacity", "zIndex"].some((r) => e.includes(r)) || e[e.length - 1].toLowerCase().includes("opacity") ? t : `${t}px` : t;
function Ca(e, t) {
  const {
    prefix: n,
    shouldSkipGeneratingVar: r
  } = t || {}, i = {}, s = {}, l = {};
  return my(
    e,
    (c, u, f) => {
      if ((typeof u == "string" || typeof u == "number") && (!r || !r(c, u))) {
        const m = `--${n ? `${n}-` : ""}${c.join("-")}`, y = hy(c, u);
        Object.assign(i, {
          [m]: y
        }), Od(s, c, `var(${m})`, f), Od(l, c, `var(${m}, ${y})`, f);
      }
    },
    (c) => c[0] === "vars"
    // skip 'vars/*' paths
  ), {
    css: i,
    vars: s,
    varsWithDefaults: l
  };
}
function gy(e, t = {}) {
  const {
    getSelector: n = _,
    disableCssColorScheme: r,
    colorSchemeSelector: i,
    enableContrastVars: s
  } = t, {
    colorSchemes: l = {},
    components: c,
    defaultColorScheme: u = "light",
    ...f
  } = e, {
    vars: m,
    css: y,
    varsWithDefaults: x
  } = Ca(f, t);
  let p = x;
  const v = {}, {
    [u]: h,
    ...E
  } = l;
  if (Object.entries(E || {}).forEach(([w, T]) => {
    const {
      vars: N,
      css: M,
      varsWithDefaults: D
    } = Ca(T, t);
    p = jt(p, D), v[w] = {
      css: M,
      vars: N
    };
  }), h) {
    const {
      css: w,
      vars: T,
      varsWithDefaults: N
    } = Ca(h, t);
    p = jt(p, N), v[u] = {
      css: w,
      vars: T
    };
  }
  function _(w, T) {
    var M, D;
    let N = i;
    if (i === "class" && (N = ".%s"), i === "data" && (N = "[data-%s]"), i != null && i.startsWith("data-") && !i.includes("%s") && (N = `[${i}="%s"]`), w) {
      if (N === "media")
        return e.defaultColorScheme === w ? ":root" : {
          [`@media (prefers-color-scheme: ${((D = (M = l[w]) == null ? void 0 : M.palette) == null ? void 0 : D.mode) || w})`]: {
            ":root": T
          }
        };
      if (N)
        return e.defaultColorScheme === w ? `:root, ${N.replace("%s", String(w))}` : N.replace("%s", String(w));
    }
    return ":root";
  }
  return {
    vars: p,
    generateThemeVars: () => {
      let w = {
        ...m
      };
      return Object.entries(v).forEach(([, {
        vars: T
      }]) => {
        w = jt(w, T);
      }), w;
    },
    generateStyleSheets: () => {
      var B, F;
      const w = [], T = e.defaultColorScheme || "light";
      function N(P, g) {
        Object.keys(g).length && w.push(typeof P == "string" ? {
          [P]: {
            ...g
          }
        } : P);
      }
      N(n(void 0, {
        ...y
      }), y);
      const {
        [T]: M,
        ...D
      } = v;
      if (M) {
        const {
          css: P
        } = M, g = (F = (B = l[T]) == null ? void 0 : B.palette) == null ? void 0 : F.mode, $ = !r && g ? {
          colorScheme: g,
          ...P
        } : {
          ...P
        };
        N(n(T, {
          ...$
        }), $);
      }
      return Object.entries(D).forEach(([P, {
        css: g
      }]) => {
        var A, L;
        const $ = (L = (A = l[P]) == null ? void 0 : A.palette) == null ? void 0 : L.mode, I = !r && $ ? {
          colorScheme: $,
          ...g
        } : {
          ...g
        };
        N(n(P, {
          ...I
        }), I);
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
function by(e) {
  return function(n) {
    return e === "media" ? (process.env.NODE_ENV !== "production" && n !== "light" && n !== "dark" && console.error(`MUI: @media (prefers-color-scheme) supports only 'light' or 'dark', but receive '${n}'.`), `@media (prefers-color-scheme: ${n})`) : e ? e.startsWith("data-") && !e.includes("%s") ? `[${e}="${n}"] &` : e === "class" ? `.${n} &` : e === "data" ? `[data-${n}] &` : `${e.replace("%s", n)} &` : "&";
  };
}
function we(e, t, n = void 0) {
  const r = {};
  for (const i in e) {
    const s = e[i];
    let l = "", c = !0;
    for (let u = 0; u < s.length; u += 1) {
      const f = s[u];
      f && (l += (c === !0 ? "" : " ") + t(f), c = !1, n && n[f] && (l += " " + n[f]));
    }
    r[i] = l;
  }
  return r;
}
const yy = gi(), vy = Cp("div", {
  name: "MuiContainer",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, t[`maxWidth${xe(String(n.maxWidth))}`], n.fixed && t.fixed, n.disableGutters && t.disableGutters];
  }
}), xy = (e) => Sp({
  props: e,
  name: "MuiContainer",
  defaultTheme: yy
}), Cy = (e, t) => {
  const n = (u) => Ce(t, u), {
    classes: r,
    fixed: i,
    disableGutters: s,
    maxWidth: l
  } = e, c = {
    root: ["root", l && `maxWidth${xe(String(l))}`, i && "fixed", s && "disableGutters"]
  };
  return we(c, n, r);
};
function Sy(e = {}) {
  const {
    // This will allow adding custom styled fn (for example for custom sx style function)
    createStyledComponent: t = vy,
    useThemeProps: n = xy,
    componentName: r = "MuiContainer"
  } = e, i = t(({
    theme: l,
    ownerState: c
  }) => ({
    width: "100%",
    marginLeft: "auto",
    boxSizing: "border-box",
    marginRight: "auto",
    ...!c.disableGutters && {
      paddingLeft: l.spacing(2),
      paddingRight: l.spacing(2),
      // @ts-ignore module augmentation fails if custom breakpoints are used
      [l.breakpoints.up("sm")]: {
        paddingLeft: l.spacing(3),
        paddingRight: l.spacing(3)
      }
    }
  }), ({
    theme: l,
    ownerState: c
  }) => c.fixed && Object.keys(l.breakpoints.values).reduce((u, f) => {
    const m = f, y = l.breakpoints.values[m];
    return y !== 0 && (u[l.breakpoints.up(m)] = {
      maxWidth: `${y}${l.breakpoints.unit}`
    }), u;
  }, {}), ({
    theme: l,
    ownerState: c
  }) => ({
    // @ts-ignore module augmentation fails if custom breakpoints are used
    ...c.maxWidth === "xs" && {
      // @ts-ignore module augmentation fails if custom breakpoints are used
      [l.breakpoints.up("xs")]: {
        // @ts-ignore module augmentation fails if custom breakpoints are used
        maxWidth: Math.max(l.breakpoints.values.xs, 444)
      }
    },
    ...c.maxWidth && // @ts-ignore module augmentation fails if custom breakpoints are used
    c.maxWidth !== "xs" && {
      // @ts-ignore module augmentation fails if custom breakpoints are used
      [l.breakpoints.up(c.maxWidth)]: {
        // @ts-ignore module augmentation fails if custom breakpoints are used
        maxWidth: `${l.breakpoints.values[c.maxWidth]}${l.breakpoints.unit}`
      }
    }
  })), s = /* @__PURE__ */ b.forwardRef(function(c, u) {
    const f = n(c), {
      className: m,
      component: y = "div",
      disableGutters: x = !1,
      fixed: p = !1,
      maxWidth: v = "lg",
      classes: h,
      ...E
    } = f, _ = {
      ...f,
      component: y,
      disableGutters: x,
      fixed: p,
      maxWidth: v
    }, k = Cy(_, r);
    return (
      // @ts-ignore theme is injected by the styled util
      /* @__PURE__ */ a(i, {
        as: y,
        ownerState: _,
        className: pe(k.root, m),
        ref: u,
        ...E
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
function Sa(e, t) {
  var n, r, i;
  return /* @__PURE__ */ b.isValidElement(e) && t.indexOf(
    // For server components `muiName` is available in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    e.type.muiName ?? ((i = (r = (n = e.type) == null ? void 0 : n._payload) == null ? void 0 : r.value) == null ? void 0 : i.muiName)
  ) !== -1;
}
const Ty = gi(), wy = Cp("div", {
  name: "MuiStack",
  slot: "Root"
});
function Ey(e) {
  return Sp({
    props: e,
    name: "MuiStack",
    defaultTheme: Ty
  });
}
function Oy(e, t) {
  const n = b.Children.toArray(e).filter(Boolean);
  return n.reduce((r, i, s) => (r.push(i), s < n.length - 1 && r.push(/* @__PURE__ */ b.cloneElement(t, {
    key: `separator-${s}`
  })), r), []);
}
const Ry = (e) => ({
  row: "Left",
  "row-reverse": "Right",
  column: "Top",
  "column-reverse": "Bottom"
})[e], _y = ({
  ownerState: e,
  theme: t
}) => {
  let n = {
    display: "flex",
    flexDirection: "column",
    ...un({
      theme: t
    }, ba({
      values: e.direction,
      breakpoints: t.breakpoints.values
    }), (r) => ({
      flexDirection: r
    }))
  };
  if (e.spacing) {
    const r = As(t), i = Object.keys(t.breakpoints.values).reduce((u, f) => ((typeof e.spacing == "object" && e.spacing[f] != null || typeof e.direction == "object" && e.direction[f] != null) && (u[f] = !0), u), {}), s = ba({
      values: e.direction,
      base: i
    }), l = ba({
      values: e.spacing,
      base: i
    });
    typeof s == "object" && Object.keys(s).forEach((u, f, m) => {
      if (!s[u]) {
        const x = f > 0 ? s[m[f - 1]] : "column";
        s[u] = x;
      }
    }), n = jt(n, un({
      theme: t
    }, l, (u, f) => e.useFlexGap ? {
      gap: kn(r, u)
    } : {
      // The useFlexGap={false} implement relies on each child to give up control of the margin.
      // We need to reset the margin to avoid double spacing.
      "& > :not(style):not(style)": {
        margin: 0
      },
      "& > :not(style) ~ :not(style)": {
        [`margin${Ry(f ? s[f] : e.direction)}`]: kn(r, u)
      }
    }));
  }
  return n = qg(t.breakpoints, n), n;
};
function Ny(e = {}) {
  const {
    // This will allow adding custom styled fn (for example for custom sx style function)
    createStyledComponent: t = wy,
    useThemeProps: n = Ey,
    componentName: r = "MuiStack"
  } = e, i = () => we({
    root: ["root"]
  }, (u) => Ce(r, u), {}), s = t(_y), l = /* @__PURE__ */ b.forwardRef(function(u, f) {
    const m = n(u), {
      component: y = "div",
      direction: x = "column",
      spacing: p = 0,
      divider: v,
      children: h,
      className: E,
      useFlexGap: _ = !1,
      ...k
    } = m, O = {
      direction: x,
      spacing: p,
      useFlexGap: _
    }, w = i();
    return /* @__PURE__ */ a(s, {
      as: y,
      ownerState: O,
      ref: f,
      className: pe(w.root, E),
      ...k,
      children: v ? Oy(h, v) : h
    });
  });
  return process.env.NODE_ENV !== "production" && (l.propTypes = {
    children: o.node,
    direction: o.oneOfType([o.oneOf(["column-reverse", "column", "row-reverse", "row"]), o.arrayOf(o.oneOf(["column-reverse", "column", "row-reverse", "row"])), o.object]),
    divider: o.node,
    spacing: o.oneOfType([o.arrayOf(o.oneOfType([o.number, o.string])), o.number, o.object, o.string]),
    sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object])
  }), l;
}
const Uo = "$$material", ni = {
  black: "#000",
  white: "#fff"
}, ky = {
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
}, Dn = {
  50: "#f3e5f5",
  200: "#ce93d8",
  300: "#ba68c8",
  400: "#ab47bc",
  500: "#9c27b0",
  700: "#7b1fa2"
}, Bn = {
  300: "#e57373",
  400: "#ef5350",
  500: "#f44336",
  700: "#d32f2f",
  800: "#c62828"
}, Or = {
  300: "#ffb74d",
  400: "#ffa726",
  500: "#ff9800",
  700: "#f57c00",
  900: "#e65100"
}, Ln = {
  50: "#e3f2fd",
  200: "#90caf9",
  400: "#42a5f5",
  700: "#1976d2",
  800: "#1565c0"
}, Fn = {
  300: "#4fc3f7",
  400: "#29b6f6",
  500: "#03a9f4",
  700: "#0288d1",
  900: "#01579b"
}, jn = {
  300: "#81c784",
  400: "#66bb6a",
  500: "#4caf50",
  700: "#388e3c",
  800: "#2e7d32",
  900: "#1b5e20"
};
function Np() {
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
      paper: ni.white,
      default: ni.white
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
const kp = Np();
function Pp() {
  return {
    text: {
      primary: ni.white,
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
      active: ni.white,
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
const ja = Pp();
function Rd(e, t, n, r) {
  const i = r.light || r, s = r.dark || r * 1.5;
  e[t] || (e.hasOwnProperty(n) ? e[t] = e[n] : t === "light" ? e.light = Gs(e.main, i) : t === "dark" && (e.dark = Us(e.main, s)));
}
function _d(e, t, n, r, i) {
  const s = i.light || i, l = i.dark || i * 1.5;
  t[n] || (t.hasOwnProperty(r) ? t[n] = t[r] : n === "light" ? t.light = `color-mix(in ${e}, ${t.main}, #fff ${(s * 100).toFixed(0)}%)` : n === "dark" && (t.dark = `color-mix(in ${e}, ${t.main}, #000 ${(l * 100).toFixed(0)}%)`));
}
function Py(e = "light") {
  return e === "dark" ? {
    main: Ln[200],
    light: Ln[50],
    dark: Ln[400]
  } : {
    main: Ln[700],
    light: Ln[400],
    dark: Ln[800]
  };
}
function Iy(e = "light") {
  return e === "dark" ? {
    main: Dn[200],
    light: Dn[50],
    dark: Dn[400]
  } : {
    main: Dn[500],
    light: Dn[300],
    dark: Dn[700]
  };
}
function $y(e = "light") {
  return e === "dark" ? {
    main: Bn[500],
    light: Bn[300],
    dark: Bn[700]
  } : {
    main: Bn[700],
    light: Bn[400],
    dark: Bn[800]
  };
}
function My(e = "light") {
  return e === "dark" ? {
    main: Fn[400],
    light: Fn[300],
    dark: Fn[700]
  } : {
    main: Fn[700],
    light: Fn[500],
    dark: Fn[900]
  };
}
function Ay(e = "light") {
  return e === "dark" ? {
    main: jn[400],
    light: jn[300],
    dark: jn[700]
  } : {
    main: jn[800],
    light: jn[500],
    dark: jn[900]
  };
}
function Dy(e = "light") {
  return e === "dark" ? {
    main: Or[400],
    light: Or[300],
    dark: Or[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: Or[500],
    dark: Or[900]
  };
}
function By(e) {
  return `oklch(from ${e} var(--__l) 0 h / var(--__a))`;
}
function Ol(e) {
  const {
    mode: t = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2,
    colorSpace: i,
    ...s
  } = e, l = e.primary || Py(t), c = e.secondary || Iy(t), u = e.error || $y(t), f = e.info || My(t), m = e.success || Ay(t), y = e.warning || Dy(t);
  function x(E) {
    if (i)
      return By(E);
    const _ = vd(E, ja.text.primary) >= n ? ja.text.primary : kp.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const k = vd(E, _);
      k < 3 && console.error([`MUI: The contrast ratio of ${k}:1 for ${_} on ${E}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return _;
  }
  const p = ({
    color: E,
    name: _,
    mainShade: k = 500,
    lightShade: O = 300,
    darkShade: w = 700
  }) => {
    if (E = {
      ...E
    }, !E.main && E[k] && (E.main = E[k]), !E.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${_ ? ` (${_})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${k}\` property.` : nn(11, _ ? ` (${_})` : "", k));
    if (typeof E.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${_ ? ` (${_})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(E.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : nn(12, _ ? ` (${_})` : "", JSON.stringify(E.main)));
    return i ? (_d(i, E, "light", O, r), _d(i, E, "dark", w, r)) : (Rd(E, "light", O, r), Rd(E, "dark", w, r)), E.contrastText || (E.contrastText = x(E.main)), E;
  };
  let v;
  return t === "light" ? v = Np() : t === "dark" && (v = Pp()), process.env.NODE_ENV !== "production" && (v || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), jt({
    // A collection of common colors.
    common: {
      ...ni
    },
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: t,
    // The colors used to represent primary interface elements for a user.
    primary: p({
      color: l,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: p({
      color: c,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: p({
      color: u,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: p({
      color: y,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: p({
      color: f,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: p({
      color: m,
      name: "success"
    }),
    // The grey colors.
    grey: ky,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: n,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: x,
    // Generate a rich color object.
    augmentColor: p,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: r,
    // The light and dark mode object.
    ...v
  }, s);
}
function Ly(e) {
  const t = {};
  return Object.entries(e).forEach((r) => {
    const [i, s] = r;
    typeof s == "object" && (t[i] = `${s.fontStyle ? `${s.fontStyle} ` : ""}${s.fontVariant ? `${s.fontVariant} ` : ""}${s.fontWeight ? `${s.fontWeight} ` : ""}${s.fontStretch ? `${s.fontStretch} ` : ""}${s.fontSize || ""}${s.lineHeight ? `/${s.lineHeight} ` : ""}${s.fontFamily || ""}`);
  }), t;
}
function Fy(e, t) {
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
function jy(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Nd = {
  textTransform: "uppercase"
}, kd = '"Roboto", "Helvetica", "Arial", sans-serif';
function Ip(e, t) {
  const {
    fontFamily: n = kd,
    // The default font size of the Material Specification.
    fontSize: r = 14,
    // px
    fontWeightLight: i = 300,
    fontWeightRegular: s = 400,
    fontWeightMedium: l = 500,
    fontWeightBold: c = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: u = 16,
    // Apply the CSS properties to all the variants.
    allVariants: f,
    pxToRem: m,
    ...y
  } = typeof t == "function" ? t(e) : t;
  process.env.NODE_ENV !== "production" && (typeof r != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof u != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const x = r / 14, p = m || ((E) => `${E / u * x}rem`), v = (E, _, k, O, w) => ({
    fontFamily: n,
    fontWeight: E,
    fontSize: p(_),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: k,
    // The letter spacing was designed for the Roboto font-family. Using the same letter-spacing
    // across font-families can cause issues with the kerning.
    ...n === kd ? {
      letterSpacing: `${jy(O / _)}em`
    } : {},
    ...w,
    ...f
  }), h = {
    h1: v(i, 96, 1.167, -1.5),
    h2: v(i, 60, 1.2, -0.5),
    h3: v(s, 48, 1.167, 0),
    h4: v(s, 34, 1.235, 0.25),
    h5: v(s, 24, 1.334, 0),
    h6: v(l, 20, 1.6, 0.15),
    subtitle1: v(s, 16, 1.75, 0.15),
    subtitle2: v(l, 14, 1.57, 0.1),
    body1: v(s, 16, 1.5, 0.15),
    body2: v(s, 14, 1.43, 0.15),
    button: v(l, 14, 1.75, 0.4, Nd),
    caption: v(s, 12, 1.66, 0.4),
    overline: v(s, 12, 2.66, 1, Nd),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return jt({
    htmlFontSize: u,
    pxToRem: p,
    fontFamily: n,
    fontSize: r,
    fontWeightLight: i,
    fontWeightRegular: s,
    fontWeightMedium: l,
    fontWeightBold: c,
    ...h
  }, y, {
    clone: !1
    // No need to clone deep
  });
}
const Wy = 0.2, zy = 0.14, Vy = 0.12;
function xt(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Wy})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${zy})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Vy})`].join(",");
}
const Uy = ["none", xt(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), xt(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), xt(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), xt(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), xt(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), xt(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), xt(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), xt(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), xt(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), xt(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), xt(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), xt(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), xt(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), xt(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), xt(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), xt(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), xt(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), xt(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), xt(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), xt(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), xt(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), xt(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), xt(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), xt(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], Gy = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, $p = {
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
function Pd(e) {
  return `${Math.round(e)}ms`;
}
function Hy(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.min(Math.round((4 + 15 * t ** 0.25 + t / 5) * 10), 3e3);
}
function qy(e) {
  const t = {
    ...Gy,
    ...e.easing
  }, n = {
    ...$p,
    ...e.duration
  };
  return {
    getAutoHeightDuration: Hy,
    create: (i = ["all"], s = {}) => {
      const {
        duration: l = n.standard,
        easing: c = t.easeInOut,
        delay: u = 0,
        ...f
      } = s;
      if (process.env.NODE_ENV !== "production") {
        const m = (x) => typeof x == "string", y = (x) => !Number.isNaN(parseFloat(x));
        !m(i) && !Array.isArray(i) && console.error('MUI: Argument "props" must be a string or Array.'), !y(l) && !m(l) && console.error(`MUI: Argument "duration" must be a number or a string but found ${l}.`), m(c) || console.error('MUI: Argument "easing" must be a string.'), !y(u) && !m(u) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof s != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(f).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(f).join(",")}].`);
      }
      return (Array.isArray(i) ? i : [i]).map((m) => `${m} ${typeof l == "string" ? l : Pd(l)} ${c} ${typeof u == "string" ? u : Pd(u)}`).join(",");
    },
    ...e,
    easing: t,
    duration: n
  };
}
const Ky = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};
function Yy(e) {
  return Zo(e) || typeof e > "u" || typeof e == "string" || typeof e == "boolean" || typeof e == "number" || Array.isArray(e);
}
function Mp(e = {}) {
  const t = {
    ...e
  };
  function n(r) {
    const i = Object.entries(r);
    for (let s = 0; s < i.length; s++) {
      const [l, c] = i[s];
      !Yy(c) || l.startsWith("unstable_") || l.startsWith("internal_") ? delete r[l] : Zo(c) && (r[l] = {
        ...c
      }, n(r[l]));
    }
  }
  return n(t), `import { unstable_createBreakpoints as createBreakpoints, createTransitions } from '@mui/material/styles';

const theme = ${JSON.stringify(t, null, 2)};

theme.breakpoints = createBreakpoints(theme.breakpoints || {});
theme.transitions = createTransitions(theme.transitions || {});

export default theme;`;
}
function Id(e) {
  return typeof e == "number" ? `${(e * 100).toFixed(0)}%` : `calc((${e}) * 100%)`;
}
const Xy = (e) => {
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
function Jy(e) {
  Object.assign(e, {
    alpha(t, n) {
      const r = this || e;
      return r.colorSpace ? `oklch(from ${t} l c h / ${typeof n == "string" ? `calc(${n})` : n})` : r.vars ? `rgba(${t.replace(/var\(--([^,\s)]+)(?:,[^)]+)?\)+/g, "var(--$1Channel)")} / ${typeof n == "string" ? `calc(${n})` : n})` : ds(t, Xy(n));
    },
    lighten(t, n) {
      const r = this || e;
      return r.colorSpace ? `color-mix(in ${r.colorSpace}, ${t}, #fff ${Id(n)})` : Gs(t, n);
    },
    darken(t, n) {
      const r = this || e;
      return r.colorSpace ? `color-mix(in ${r.colorSpace}, ${t}, #000 ${Id(n)})` : Us(t, n);
    }
  });
}
function Wa(e = {}, ...t) {
  const {
    breakpoints: n,
    mixins: r = {},
    spacing: i,
    palette: s = {},
    transitions: l = {},
    typography: c = {},
    shape: u,
    colorSpace: f,
    ...m
  } = e;
  if (e.vars && // The error should throw only for the root theme creation because user is not allowed to use a custom node `vars`.
  // `generateThemeVars` is the closest identifier for checking that the `options` is a result of `createTheme` with CSS variables so that user can create new theme for nested ThemeProvider.
  e.generateThemeVars === void 0)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name or follow the [docs](https://mui.com/material-ui/customization/css-theme-variables/usage/) to enable the feature." : nn(22));
  const y = Ol({
    ...s,
    colorSpace: f
  }), x = gi(e);
  let p = jt(x, {
    mixins: Fy(x.breakpoints, r),
    palette: y,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: Uy.slice(),
    typography: Ip(y, c),
    transitions: qy(l),
    zIndex: {
      ...Ky
    }
  });
  if (p = jt(p, m), p = t.reduce((v, h) => jt(v, h), p), process.env.NODE_ENV !== "production") {
    const v = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], h = (E, _) => {
      let k;
      for (k in E) {
        const O = E[k];
        if (v.includes(k) && Object.keys(O).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const w = Ce("", k);
            console.error([`MUI: The \`${_}\` component increases the CSS specificity of the \`${k}\` internal state.`, "You can not override it like this: ", JSON.stringify(E, null, 2), "", `Instead, you need to use the '&.${w}' syntax:`, JSON.stringify({
              root: {
                [`&.${w}`]: O
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          E[k] = {};
        }
      }
    };
    Object.keys(p.components).forEach((E) => {
      const _ = p.components[E].styleOverrides;
      _ && E.startsWith("Mui") && h(_, E);
    });
  }
  return p.unstable_sxConfig = {
    ...Ws,
    ...m == null ? void 0 : m.unstable_sxConfig
  }, p.unstable_sx = function(h) {
    return Pn({
      sx: h,
      theme: this
    });
  }, p.toRuntimeSource = Mp, Jy(p), p;
}
function za(e) {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, Math.round(t * 10) / 1e3;
}
const Qy = [...Array(25)].map((e, t) => {
  if (t === 0)
    return "none";
  const n = za(t);
  return `linear-gradient(rgba(255 255 255 / ${n}), rgba(255 255 255 / ${n}))`;
});
function Ap(e) {
  return {
    inputPlaceholder: e === "dark" ? 0.5 : 0.42,
    inputUnderline: e === "dark" ? 0.7 : 0.42,
    switchTrackDisabled: e === "dark" ? 0.2 : 0.12,
    switchTrack: e === "dark" ? 0.3 : 0.38
  };
}
function Dp(e) {
  return e === "dark" ? Qy : [];
}
function Zy(e) {
  const {
    palette: t = {
      mode: "light"
    },
    // need to cast to avoid module augmentation test
    opacity: n,
    overlays: r,
    colorSpace: i,
    ...s
  } = e, l = Ol({
    ...t,
    colorSpace: i
  });
  return {
    palette: l,
    opacity: {
      ...Ap(l.mode),
      ...n
    },
    overlays: r || Dp(l.mode),
    ...s
  };
}
function ev(e) {
  var t;
  return !!e[0].match(/(cssVarPrefix|colorSchemeSelector|modularCssLayers|rootSelector|typography|mixins|breakpoints|direction|transitions)/) || !!e[0].match(/sxConfig$/) || // ends with sxConfig
  e[0] === "palette" && !!((t = e[1]) != null && t.match(/(mode|contrastThreshold|tonalOffset)/));
}
const tv = (e) => [...[...Array(25)].map((t, n) => `--${e ? `${e}-` : ""}overlays-${n}`), `--${e ? `${e}-` : ""}palette-AppBar-darkBg`, `--${e ? `${e}-` : ""}palette-AppBar-darkColor`], ov = (e) => (t, n) => {
  const r = e.rootSelector || ":root", i = e.colorSchemeSelector;
  let s = i;
  if (i === "class" && (s = ".%s"), i === "data" && (s = "[data-%s]"), i != null && i.startsWith("data-") && !i.includes("%s") && (s = `[${i}="%s"]`), e.defaultColorScheme === t) {
    if (t === "dark") {
      const l = {};
      return tv(e.cssVarPrefix).forEach((c) => {
        l[c] = n[c], delete n[c];
      }), s === "media" ? {
        [r]: n,
        "@media (prefers-color-scheme: dark)": {
          [r]: l
        }
      } : s ? {
        [s.replace("%s", t)]: l,
        [`${r}, ${s.replace("%s", t)}`]: n
      } : {
        [r]: {
          ...n,
          ...l
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
function nv(e, t) {
  t.forEach((n) => {
    e[n] || (e[n] = {});
  });
}
function H(e, t, n) {
  !e[t] && n && (e[t] = n);
}
function Dr(e) {
  return typeof e != "string" || !e.startsWith("hsl") ? e : Tp(e);
}
function Xo(e, t) {
  `${t}Channel` in e || (e[`${t}Channel`] = Ar(Dr(e[t]), `MUI: Can't create \`palette.${t}Channel\` because \`palette.${t}\` is not one of these formats: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().
To suppress this warning, you need to explicitly provide the \`palette.${t}Channel\` as a string (in rgb format, for example "12 12 12") or undefined if you want to remove the channel token.`));
}
function rv(e) {
  return typeof e == "number" ? `${e}px` : typeof e == "string" || typeof e == "function" || Array.isArray(e) ? e : "8px";
}
const Do = (e) => {
  try {
    return e();
  } catch {
  }
}, iv = (e = "mui") => fy(e);
function Ta(e, t, n, r, i) {
  if (!n)
    return;
  n = n === !0 ? {} : n;
  const s = i === "dark" ? "dark" : "light";
  if (!r) {
    t[i] = Zy({
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
    palette: l,
    ...c
  } = Wa({
    ...r,
    palette: {
      mode: s,
      ...n == null ? void 0 : n.palette
    },
    colorSpace: e
  });
  return t[i] = {
    ...n,
    palette: l,
    opacity: {
      ...Ap(s),
      ...n == null ? void 0 : n.opacity
    },
    overlays: (n == null ? void 0 : n.overlays) || Dp(s)
  }, c;
}
function sv(e = {}, ...t) {
  const {
    colorSchemes: n = {
      light: !0
    },
    defaultColorScheme: r,
    disableCssColorScheme: i = !1,
    cssVarPrefix: s = "mui",
    nativeColor: l = !1,
    shouldSkipGeneratingVar: c = ev,
    colorSchemeSelector: u = n.light && n.dark ? "media" : void 0,
    rootSelector: f = ":root",
    ...m
  } = e, y = Object.keys(n)[0], x = r || (n.light && y !== "light" ? "light" : y), p = iv(s), {
    [x]: v,
    light: h,
    dark: E,
    ..._
  } = n, k = {
    ..._
  };
  let O = v;
  if ((x === "dark" && !("dark" in n) || x === "light" && !("light" in n)) && (O = !0), !O)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The \`colorSchemes.${x}\` option is either missing or invalid.` : nn(21, x));
  let w;
  l && (w = "oklch");
  const T = Ta(w, k, O, m, x);
  h && !k.light && Ta(w, k, h, void 0, "light"), E && !k.dark && Ta(w, k, E, void 0, "dark");
  let N = {
    defaultColorScheme: x,
    ...T,
    cssVarPrefix: s,
    colorSchemeSelector: u,
    rootSelector: f,
    getCssVar: p,
    colorSchemes: k,
    font: {
      ...Ly(T.typography),
      ...T.font
    },
    spacing: rv(m.spacing)
  };
  Object.keys(N.colorSchemes).forEach((P) => {
    const g = N.colorSchemes[P].palette, $ = (A) => {
      const L = A.split("-"), W = L[1], q = L[2];
      return p(A, g[W][q]);
    };
    g.mode === "light" && (H(g.common, "background", "#fff"), H(g.common, "onBackground", "#000")), g.mode === "dark" && (H(g.common, "background", "#000"), H(g.common, "onBackground", "#fff"));
    function I(A, L, W) {
      if (w) {
        let q;
        return A === xn && (q = `transparent ${((1 - W) * 100).toFixed(0)}%`), A === pt && (q = `#000 ${(W * 100).toFixed(0)}%`), A === ft && (q = `#fff ${(W * 100).toFixed(0)}%`), `color-mix(in ${w}, ${L}, ${q})`;
      }
      return A(L, W);
    }
    if (nv(g, ["Alert", "AppBar", "Avatar", "Button", "Chip", "FilledInput", "LinearProgress", "Skeleton", "Slider", "SnackbarContent", "SpeedDialAction", "StepConnector", "StepContent", "Switch", "TableCell", "Tooltip"]), g.mode === "light") {
      H(g.Alert, "errorColor", I(pt, l ? p("palette-error-light") : g.error.light, 0.6)), H(g.Alert, "infoColor", I(pt, l ? p("palette-info-light") : g.info.light, 0.6)), H(g.Alert, "successColor", I(pt, l ? p("palette-success-light") : g.success.light, 0.6)), H(g.Alert, "warningColor", I(pt, l ? p("palette-warning-light") : g.warning.light, 0.6)), H(g.Alert, "errorFilledBg", $("palette-error-main")), H(g.Alert, "infoFilledBg", $("palette-info-main")), H(g.Alert, "successFilledBg", $("palette-success-main")), H(g.Alert, "warningFilledBg", $("palette-warning-main")), H(g.Alert, "errorFilledColor", Do(() => g.getContrastText(g.error.main))), H(g.Alert, "infoFilledColor", Do(() => g.getContrastText(g.info.main))), H(g.Alert, "successFilledColor", Do(() => g.getContrastText(g.success.main))), H(g.Alert, "warningFilledColor", Do(() => g.getContrastText(g.warning.main))), H(g.Alert, "errorStandardBg", I(ft, l ? p("palette-error-light") : g.error.light, 0.9)), H(g.Alert, "infoStandardBg", I(ft, l ? p("palette-info-light") : g.info.light, 0.9)), H(g.Alert, "successStandardBg", I(ft, l ? p("palette-success-light") : g.success.light, 0.9)), H(g.Alert, "warningStandardBg", I(ft, l ? p("palette-warning-light") : g.warning.light, 0.9)), H(g.Alert, "errorIconColor", $("palette-error-main")), H(g.Alert, "infoIconColor", $("palette-info-main")), H(g.Alert, "successIconColor", $("palette-success-main")), H(g.Alert, "warningIconColor", $("palette-warning-main")), H(g.AppBar, "defaultBg", $("palette-grey-100")), H(g.Avatar, "defaultBg", $("palette-grey-400")), H(g.Button, "inheritContainedBg", $("palette-grey-300")), H(g.Button, "inheritContainedHoverBg", $("palette-grey-A100")), H(g.Chip, "defaultBorder", $("palette-grey-400")), H(g.Chip, "defaultAvatarColor", $("palette-grey-700")), H(g.Chip, "defaultIconColor", $("palette-grey-700")), H(g.FilledInput, "bg", "rgba(0, 0, 0, 0.06)"), H(g.FilledInput, "hoverBg", "rgba(0, 0, 0, 0.09)"), H(g.FilledInput, "disabledBg", "rgba(0, 0, 0, 0.12)"), H(g.LinearProgress, "primaryBg", I(ft, l ? p("palette-primary-main") : g.primary.main, 0.62)), H(g.LinearProgress, "secondaryBg", I(ft, l ? p("palette-secondary-main") : g.secondary.main, 0.62)), H(g.LinearProgress, "errorBg", I(ft, l ? p("palette-error-main") : g.error.main, 0.62)), H(g.LinearProgress, "infoBg", I(ft, l ? p("palette-info-main") : g.info.main, 0.62)), H(g.LinearProgress, "successBg", I(ft, l ? p("palette-success-main") : g.success.main, 0.62)), H(g.LinearProgress, "warningBg", I(ft, l ? p("palette-warning-light") : g.warning.main, 0.62)), H(g.Skeleton, "bg", w ? I(xn, l ? p("palette-text-primary") : g.text.primary, 0.11) : `rgba(${$("palette-text-primaryChannel")} / 0.11)`), H(g.Slider, "primaryTrack", I(ft, l ? p("palette-primary-main") : g.primary.main, 0.62)), H(g.Slider, "secondaryTrack", I(ft, l ? p("palette-secondary-main") : g.secondary.main, 0.62)), H(g.Slider, "errorTrack", I(ft, l ? p("palette-error-main") : g.error.main, 0.62)), H(g.Slider, "infoTrack", I(ft, l ? p("palette-info-main") : g.info.main, 0.62)), H(g.Slider, "successTrack", I(ft, l ? p("palette-success-main") : g.success.main, 0.62)), H(g.Slider, "warningTrack", I(ft, l ? p("palette-warning-main") : g.warning.main, 0.62));
      const A = w ? I(pt, l ? p("palette-background-default") : g.background.default, 0.6825) : $i(g.background.default, 0.8);
      H(g.SnackbarContent, "bg", A), H(g.SnackbarContent, "color", Do(() => w ? ja.text.primary : g.getContrastText(A))), H(g.SpeedDialAction, "fabHoverBg", $i(g.background.paper, 0.15)), H(g.StepConnector, "border", $("palette-grey-400")), H(g.StepContent, "border", $("palette-grey-400")), H(g.Switch, "defaultColor", $("palette-common-white")), H(g.Switch, "defaultDisabledColor", $("palette-grey-100")), H(g.Switch, "primaryDisabledColor", I(ft, l ? p("palette-primary-main") : g.primary.main, 0.62)), H(g.Switch, "secondaryDisabledColor", I(ft, l ? p("palette-secondary-main") : g.secondary.main, 0.62)), H(g.Switch, "errorDisabledColor", I(ft, l ? p("palette-error-main") : g.error.main, 0.62)), H(g.Switch, "infoDisabledColor", I(ft, l ? p("palette-info-main") : g.info.main, 0.62)), H(g.Switch, "successDisabledColor", I(ft, l ? p("palette-success-main") : g.success.main, 0.62)), H(g.Switch, "warningDisabledColor", I(ft, l ? p("palette-warning-main") : g.warning.main, 0.62)), H(g.TableCell, "border", I(ft, xn(l ? p("palette-divider") : g.divider, 1), 0.88)), H(g.Tooltip, "bg", I(xn, l ? p("palette-grey-700") : g.grey[700], 0.92));
    }
    if (g.mode === "dark") {
      H(g.Alert, "errorColor", I(ft, l ? p("palette-error-light") : g.error.light, 0.6)), H(g.Alert, "infoColor", I(ft, l ? p("palette-info-light") : g.info.light, 0.6)), H(g.Alert, "successColor", I(ft, l ? p("palette-success-light") : g.success.light, 0.6)), H(g.Alert, "warningColor", I(ft, l ? p("palette-warning-light") : g.warning.light, 0.6)), H(g.Alert, "errorFilledBg", $("palette-error-dark")), H(g.Alert, "infoFilledBg", $("palette-info-dark")), H(g.Alert, "successFilledBg", $("palette-success-dark")), H(g.Alert, "warningFilledBg", $("palette-warning-dark")), H(g.Alert, "errorFilledColor", Do(() => g.getContrastText(g.error.dark))), H(g.Alert, "infoFilledColor", Do(() => g.getContrastText(g.info.dark))), H(g.Alert, "successFilledColor", Do(() => g.getContrastText(g.success.dark))), H(g.Alert, "warningFilledColor", Do(() => g.getContrastText(g.warning.dark))), H(g.Alert, "errorStandardBg", I(pt, l ? p("palette-error-light") : g.error.light, 0.9)), H(g.Alert, "infoStandardBg", I(pt, l ? p("palette-info-light") : g.info.light, 0.9)), H(g.Alert, "successStandardBg", I(pt, l ? p("palette-success-light") : g.success.light, 0.9)), H(g.Alert, "warningStandardBg", I(pt, l ? p("palette-warning-light") : g.warning.light, 0.9)), H(g.Alert, "errorIconColor", $("palette-error-main")), H(g.Alert, "infoIconColor", $("palette-info-main")), H(g.Alert, "successIconColor", $("palette-success-main")), H(g.Alert, "warningIconColor", $("palette-warning-main")), H(g.AppBar, "defaultBg", $("palette-grey-900")), H(g.AppBar, "darkBg", $("palette-background-paper")), H(g.AppBar, "darkColor", $("palette-text-primary")), H(g.Avatar, "defaultBg", $("palette-grey-600")), H(g.Button, "inheritContainedBg", $("palette-grey-800")), H(g.Button, "inheritContainedHoverBg", $("palette-grey-700")), H(g.Chip, "defaultBorder", $("palette-grey-700")), H(g.Chip, "defaultAvatarColor", $("palette-grey-300")), H(g.Chip, "defaultIconColor", $("palette-grey-300")), H(g.FilledInput, "bg", "rgba(255, 255, 255, 0.09)"), H(g.FilledInput, "hoverBg", "rgba(255, 255, 255, 0.13)"), H(g.FilledInput, "disabledBg", "rgba(255, 255, 255, 0.12)"), H(g.LinearProgress, "primaryBg", I(pt, l ? p("palette-primary-main") : g.primary.main, 0.5)), H(g.LinearProgress, "secondaryBg", I(pt, l ? p("palette-secondary-main") : g.secondary.main, 0.5)), H(g.LinearProgress, "errorBg", I(pt, l ? p("palette-error-main") : g.error.main, 0.5)), H(g.LinearProgress, "infoBg", I(pt, l ? p("palette-info-main") : g.info.main, 0.5)), H(g.LinearProgress, "successBg", I(pt, l ? p("palette-success-main") : g.success.main, 0.5)), H(g.LinearProgress, "warningBg", I(pt, l ? p("palette-warning-main") : g.warning.main, 0.5)), H(g.Skeleton, "bg", w ? I(xn, l ? p("palette-text-primary") : g.text.primary, 0.13) : `rgba(${$("palette-text-primaryChannel")} / 0.13)`), H(g.Slider, "primaryTrack", I(pt, l ? p("palette-primary-main") : g.primary.main, 0.5)), H(g.Slider, "secondaryTrack", I(pt, l ? p("palette-secondary-main") : g.secondary.main, 0.5)), H(g.Slider, "errorTrack", I(pt, l ? p("palette-error-main") : g.error.main, 0.5)), H(g.Slider, "infoTrack", I(pt, l ? p("palette-info-main") : g.info.main, 0.5)), H(g.Slider, "successTrack", I(pt, l ? p("palette-success-main") : g.success.main, 0.5)), H(g.Slider, "warningTrack", I(pt, l ? p("palette-warning-light") : g.warning.main, 0.5));
      const A = w ? I(ft, l ? p("palette-background-default") : g.background.default, 0.985) : $i(g.background.default, 0.98);
      H(g.SnackbarContent, "bg", A), H(g.SnackbarContent, "color", Do(() => w ? kp.text.primary : g.getContrastText(A))), H(g.SpeedDialAction, "fabHoverBg", $i(g.background.paper, 0.15)), H(g.StepConnector, "border", $("palette-grey-600")), H(g.StepContent, "border", $("palette-grey-600")), H(g.Switch, "defaultColor", $("palette-grey-300")), H(g.Switch, "defaultDisabledColor", $("palette-grey-600")), H(g.Switch, "primaryDisabledColor", I(pt, l ? p("palette-primary-main") : g.primary.main, 0.55)), H(g.Switch, "secondaryDisabledColor", I(pt, l ? p("palette-secondary-main") : g.secondary.main, 0.55)), H(g.Switch, "errorDisabledColor", I(pt, l ? p("palette-error-main") : g.error.main, 0.55)), H(g.Switch, "infoDisabledColor", I(pt, l ? p("palette-info-main") : g.info.main, 0.55)), H(g.Switch, "successDisabledColor", I(pt, l ? p("palette-success-main") : g.success.main, 0.55)), H(g.Switch, "warningDisabledColor", I(pt, l ? p("palette-warning-light") : g.warning.main, 0.55)), H(g.TableCell, "border", I(pt, xn(l ? p("palette-divider") : g.divider, 1), 0.68)), H(g.Tooltip, "bg", I(xn, l ? p("palette-grey-700") : g.grey[700], 0.92));
    }
    l || (Xo(g.background, "default"), Xo(g.background, "paper"), Xo(g.common, "background"), Xo(g.common, "onBackground"), Xo(g, "divider")), Object.keys(g).forEach((A) => {
      const L = g[A];
      A !== "tonalOffset" && !l && L && typeof L == "object" && (L.main && H(g[A], "mainChannel", Ar(Dr(L.main))), L.light && H(g[A], "lightChannel", Ar(Dr(L.light))), L.dark && H(g[A], "darkChannel", Ar(Dr(L.dark))), L.contrastText && H(g[A], "contrastTextChannel", Ar(Dr(L.contrastText))), A === "text" && (Xo(g[A], "primary"), Xo(g[A], "secondary")), A === "action" && (L.active && Xo(g[A], "active"), L.selected && Xo(g[A], "selected")));
    });
  }), N = t.reduce((P, g) => jt(P, g), N);
  const M = {
    prefix: s,
    disableCssColorScheme: i,
    shouldSkipGeneratingVar: c,
    getSelector: ov(N),
    enableContrastVars: l
  }, {
    vars: D,
    generateThemeVars: B,
    generateStyleSheets: F
  } = gy(N, M);
  return N.vars = D, Object.entries(N.colorSchemes[N.defaultColorScheme]).forEach(([P, g]) => {
    N[P] = g;
  }), N.generateThemeVars = B, N.generateStyleSheets = F, N.generateSpacing = function() {
    return fp(m.spacing, As(this));
  }, N.getColorSchemeSelector = by(u), N.spacing = N.generateSpacing(), N.shouldSkipGeneratingVar = c, N.unstable_sxConfig = {
    ...Ws,
    ...m == null ? void 0 : m.unstable_sxConfig
  }, N.unstable_sx = function(g) {
    return Pn({
      sx: g,
      theme: this
    });
  }, N.internal_cache = {}, N.toRuntimeSource = Mp, N;
}
function $d(e, t, n) {
  e.colorSchemes && n && (e.colorSchemes[t] = {
    ...n !== !0 && n,
    palette: Ol({
      ...n === !0 ? {} : n.palette,
      mode: t
    })
    // cast type to skip module augmentation test
  });
}
function Ks(e = {}, ...t) {
  const {
    palette: n,
    cssVariables: r = !1,
    colorSchemes: i = n ? void 0 : {
      light: !0
    },
    defaultColorScheme: s = n == null ? void 0 : n.mode,
    ...l
  } = e, c = s || "light", u = i == null ? void 0 : i[c], f = {
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
      return Wa(e, ...t);
    let m = n;
    "palette" in e || f[c] && (f[c] !== !0 ? m = f[c].palette : c === "dark" && (m = {
      mode: "dark"
    }));
    const y = Wa({
      ...e,
      palette: m
    }, ...t);
    return y.defaultColorScheme = c, y.colorSchemes = f, y.palette.mode === "light" && (y.colorSchemes.light = {
      ...f.light !== !0 && f.light,
      palette: y.palette
    }, $d(y, "dark", f.dark)), y.palette.mode === "dark" && (y.colorSchemes.dark = {
      ...f.dark !== !0 && f.dark,
      palette: y.palette
    }, $d(y, "light", f.light)), y;
  }
  return !n && !("light" in f) && c === "light" && (f.light = !0), sv({
    ...l,
    colorSchemes: f,
    defaultColorScheme: c,
    ...typeof r != "boolean" && r
  }, ...t);
}
const Rl = Ks();
function $n() {
  const e = zs(Rl);
  return process.env.NODE_ENV !== "production" && b.useDebugValue(e), e[Uo] || e;
}
function Bp(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const Gt = (e) => Bp(e) && e !== "classes", oe = vp({
  themeId: Uo,
  defaultTheme: Rl,
  rootShouldForwardProp: Gt
});
function av({
  theme: e,
  ...t
}) {
  const n = Uo in e ? e[Uo] : void 0;
  return /* @__PURE__ */ a(oi, {
    ...t,
    themeId: n ? Uo : void 0,
    theme: n || e
  });
}
const Mi = {
  colorSchemeStorageKey: "mui-color-scheme",
  defaultLightColorScheme: "light",
  defaultDarkColorScheme: "dark",
  modeStorageKey: "mui-mode"
};
process.env.NODE_ENV !== "production" && (o.string, o.string, o.string, o.string, o.string, o.oneOf(["dark", "light", "system"]), o.string, o.string);
const {
  CssVarsProvider: lv
} = py({
  themeId: Uo,
  // @ts-ignore ignore module augmentation tests
  theme: () => Ks({
    cssVariables: !0
  }),
  colorSchemeStorageKey: Mi.colorSchemeStorageKey,
  modeStorageKey: Mi.modeStorageKey,
  defaultColorScheme: {
    light: Mi.defaultLightColorScheme,
    dark: Mi.defaultDarkColorScheme
  },
  resolveTheme: (e) => {
    const t = {
      ...e,
      typography: Ip(e.palette, e.typography)
    };
    return t.unstable_sx = function(r) {
      return Pn({
        sx: r,
        theme: this
      });
    }, t;
  }
}), cv = lv;
function dv({
  theme: e,
  ...t
}) {
  const n = b.useMemo(() => {
    if (typeof e == "function")
      return e;
    const r = Uo in e ? e[Uo] : e;
    return "colorSchemes" in r ? null : "vars" in r ? e : {
      ...e,
      vars: null
    };
  }, [e]);
  return n ? /* @__PURE__ */ a(av, {
    theme: n,
    ...t
  }) : /* @__PURE__ */ a(cv, {
    theme: e,
    ...t
  });
}
const uv = Te("MuiBox", ["root"]), pv = Ks(), Ve = Ab({
  themeId: Uo,
  defaultTheme: pv,
  defaultClassName: uv.root,
  generateClassName: mp.generate
});
process.env.NODE_ENV !== "production" && (Ve.propTypes = {
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
function Lp(e) {
  return /* @__PURE__ */ a(xl, {
    ...e,
    defaultTheme: Rl,
    themeId: Uo
  });
}
process.env.NODE_ENV !== "production" && (Lp.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The styles you want to apply globally.
   */
  styles: o.oneOfType([o.array, o.func, o.number, o.object, o.string, o.bool])
});
function _l(e) {
  return function(n) {
    return (
      // Pigment CSS `globalCss` support callback with theme inside an object but `GlobalStyles` support theme as a callback value.
      /* @__PURE__ */ a(Lp, {
        styles: typeof e == "function" ? (r) => e({
          theme: r,
          ...n
        }) : e
      })
    );
  };
}
process.env.NODE_ENV !== "production" && (o.node, o.object.isRequired);
function Oe(e) {
  return ey(e);
}
const Va = typeof _l({}) == "function", fv = (e, t) => ({
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
}), mv = (e) => ({
  color: (e.vars || e).palette.text.primary,
  ...e.typography.body1,
  backgroundColor: (e.vars || e).palette.background.default,
  "@media print": {
    // Save printer ink.
    backgroundColor: (e.vars || e).palette.common.white
  }
}), Fp = (e, t = !1) => {
  var s, l;
  const n = {};
  t && e.colorSchemes && typeof e.getColorSchemeSelector == "function" && Object.entries(e.colorSchemes).forEach(([c, u]) => {
    var m, y;
    const f = e.getColorSchemeSelector(c);
    f.startsWith("@") ? n[f] = {
      ":root": {
        colorScheme: (m = u.palette) == null ? void 0 : m.mode
      }
    } : n[f.replace(/\s*&/, "")] = {
      colorScheme: (y = u.palette) == null ? void 0 : y.mode
    };
  });
  let r = {
    html: fv(e, t),
    "*, *::before, *::after": {
      boxSizing: "inherit"
    },
    "strong, b": {
      fontWeight: e.typography.fontWeightBold
    },
    body: {
      margin: 0,
      // Remove the margin in all browsers.
      ...mv(e),
      // Add support for document.body.requestFullScreen().
      // Other elements, if background transparent, are not supported.
      "&::backdrop": {
        backgroundColor: (e.vars || e).palette.background.default
      }
    },
    ...n
  };
  const i = (l = (s = e.components) == null ? void 0 : s.MuiCssBaseline) == null ? void 0 : l.styleOverrides;
  return i && (r = [r, i]), r;
}, rs = "mui-ecs", hv = (e) => {
  const t = Fp(e, !1), n = Array.isArray(t) ? t[0] : t;
  return !e.vars && n && (n.html[`:root:has(${rs})`] = {
    colorScheme: e.palette.mode
  }), e.colorSchemes && Object.entries(e.colorSchemes).forEach(([r, i]) => {
    var l, c;
    const s = e.getColorSchemeSelector(r);
    s.startsWith("@") ? n[s] = {
      [`:root:not(:has(.${rs}))`]: {
        colorScheme: (l = i.palette) == null ? void 0 : l.mode
      }
    } : n[s.replace(/\s*&/, "")] = {
      [`&:not(:has(.${rs}))`]: {
        colorScheme: (c = i.palette) == null ? void 0 : c.mode
      }
    };
  }), t;
}, gv = _l(Va ? ({
  theme: e,
  enableColorScheme: t
}) => Fp(e, t) : ({
  theme: e
}) => hv(e));
function jp(e) {
  const t = Oe({
    props: e,
    name: "MuiCssBaseline"
  }), {
    children: n,
    enableColorScheme: r = !1
  } = t;
  return /* @__PURE__ */ C(b.Fragment, {
    children: [Va && /* @__PURE__ */ a(gv, {
      enableColorScheme: r
    }), !Va && !r && /* @__PURE__ */ a("span", {
      className: rs,
      style: {
        display: "none"
      }
    }), n]
  });
}
process.env.NODE_ENV !== "production" && (jp.propTypes = {
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
function qo(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : function(...r) {
    return e(...r) || t(...r);
  };
}
const $e = ry;
function Wp(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
    if (t.indexOf(r) !== -1) continue;
    n[r] = e[r];
  }
  return n;
}
function Ua(e, t) {
  return Ua = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, r) {
    return n.__proto__ = r, n;
  }, Ua(e, t);
}
function zp(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Ua(e, t);
}
const Md = {
  disabled: !1
};
var bv = process.env.NODE_ENV !== "production" ? o.oneOfType([o.number, o.shape({
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
const ps = en.createContext(null);
var yv = function(t) {
  return t.scrollTop;
}, Br = "unmounted", Tn = "exited", wn = "entering", Vn = "entered", Ga = "exiting", Mo = /* @__PURE__ */ function(e) {
  zp(t, e);
  function t(r, i) {
    var s;
    s = e.call(this, r, i) || this;
    var l = i, c = l && !l.isMounting ? r.enter : r.appear, u;
    return s.appearStatus = null, r.in ? c ? (u = Tn, s.appearStatus = wn) : u = Vn : r.unmountOnExit || r.mountOnEnter ? u = Br : u = Tn, s.state = {
      status: u
    }, s.nextCallback = null, s;
  }
  t.getDerivedStateFromProps = function(i, s) {
    var l = i.in;
    return l && s.status === Br ? {
      status: Tn
    } : null;
  };
  var n = t.prototype;
  return n.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, n.componentDidUpdate = function(i) {
    var s = null;
    if (i !== this.props) {
      var l = this.state.status;
      this.props.in ? l !== wn && l !== Vn && (s = wn) : (l === wn || l === Vn) && (s = Ga);
    }
    this.updateStatus(!1, s);
  }, n.componentWillUnmount = function() {
    this.cancelNextCallback();
  }, n.getTimeouts = function() {
    var i = this.props.timeout, s, l, c;
    return s = l = c = i, i != null && typeof i != "number" && (s = i.exit, l = i.enter, c = i.appear !== void 0 ? i.appear : l), {
      exit: s,
      enter: l,
      appear: c
    };
  }, n.updateStatus = function(i, s) {
    if (i === void 0 && (i = !1), s !== null)
      if (this.cancelNextCallback(), s === wn) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var l = this.props.nodeRef ? this.props.nodeRef.current : ki.findDOMNode(this);
          l && yv(l);
        }
        this.performEnter(i);
      } else
        this.performExit();
    else this.props.unmountOnExit && this.state.status === Tn && this.setState({
      status: Br
    });
  }, n.performEnter = function(i) {
    var s = this, l = this.props.enter, c = this.context ? this.context.isMounting : i, u = this.props.nodeRef ? [c] : [ki.findDOMNode(this), c], f = u[0], m = u[1], y = this.getTimeouts(), x = c ? y.appear : y.enter;
    if (!i && !l || Md.disabled) {
      this.safeSetState({
        status: Vn
      }, function() {
        s.props.onEntered(f);
      });
      return;
    }
    this.props.onEnter(f, m), this.safeSetState({
      status: wn
    }, function() {
      s.props.onEntering(f, m), s.onTransitionEnd(x, function() {
        s.safeSetState({
          status: Vn
        }, function() {
          s.props.onEntered(f, m);
        });
      });
    });
  }, n.performExit = function() {
    var i = this, s = this.props.exit, l = this.getTimeouts(), c = this.props.nodeRef ? void 0 : ki.findDOMNode(this);
    if (!s || Md.disabled) {
      this.safeSetState({
        status: Tn
      }, function() {
        i.props.onExited(c);
      });
      return;
    }
    this.props.onExit(c), this.safeSetState({
      status: Ga
    }, function() {
      i.props.onExiting(c), i.onTransitionEnd(l.exit, function() {
        i.safeSetState({
          status: Tn
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
    var s = this, l = !0;
    return this.nextCallback = function(c) {
      l && (l = !1, s.nextCallback = null, i(c));
    }, this.nextCallback.cancel = function() {
      l = !1;
    }, this.nextCallback;
  }, n.onTransitionEnd = function(i, s) {
    this.setNextCallback(s);
    var l = this.props.nodeRef ? this.props.nodeRef.current : ki.findDOMNode(this), c = i == null && !this.props.addEndListener;
    if (!l || c) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var u = this.props.nodeRef ? [this.nextCallback] : [l, this.nextCallback], f = u[0], m = u[1];
      this.props.addEndListener(f, m);
    }
    i != null && setTimeout(this.nextCallback, i);
  }, n.render = function() {
    var i = this.state.status;
    if (i === Br)
      return null;
    var s = this.props, l = s.children;
    s.in, s.mountOnEnter, s.unmountOnExit, s.appear, s.enter, s.exit, s.timeout, s.addEndListener, s.onEnter, s.onEntering, s.onEntered, s.onExit, s.onExiting, s.onExited, s.nodeRef;
    var c = Wp(s, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ en.createElement(ps.Provider, {
        value: null
      }, typeof l == "function" ? l(i, c) : en.cloneElement(en.Children.only(l), c))
    );
  }, t;
}(en.Component);
Mo.contextType = ps;
Mo.propTypes = process.env.NODE_ENV !== "production" ? {
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
      var l = e[t];
      return o.instanceOf(l && "ownerDocument" in l ? l.ownerDocument.defaultView.Element : Element)(e, t, n, r, i, s);
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
    var n = bv;
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
function Wn() {
}
Mo.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Wn,
  onEntering: Wn,
  onEntered: Wn,
  onExit: Wn,
  onExiting: Wn,
  onExited: Wn
};
Mo.UNMOUNTED = Br;
Mo.EXITED = Tn;
Mo.ENTERING = wn;
Mo.ENTERED = Vn;
Mo.EXITING = Ga;
function vv(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Nl(e, t) {
  var n = function(s) {
    return t && Qi(s) ? t(s) : s;
  }, r = /* @__PURE__ */ Object.create(null);
  return e && bh.map(e, function(i) {
    return i;
  }).forEach(function(i) {
    r[i.key] = n(i);
  }), r;
}
function xv(e, t) {
  e = e || {}, t = t || {};
  function n(m) {
    return m in t ? t[m] : e[m];
  }
  var r = /* @__PURE__ */ Object.create(null), i = [];
  for (var s in e)
    s in t ? i.length && (r[s] = i, i = []) : i.push(s);
  var l, c = {};
  for (var u in t) {
    if (r[u])
      for (l = 0; l < r[u].length; l++) {
        var f = r[u][l];
        c[r[u][l]] = n(f);
      }
    c[u] = n(u);
  }
  for (l = 0; l < i.length; l++)
    c[i[l]] = n(i[l]);
  return c;
}
function Rn(e, t, n) {
  return n[t] != null ? n[t] : e.props[t];
}
function Cv(e, t) {
  return Nl(e.children, function(n) {
    return Zi(n, {
      onExited: t.bind(null, n),
      in: !0,
      appear: Rn(n, "appear", e),
      enter: Rn(n, "enter", e),
      exit: Rn(n, "exit", e)
    });
  });
}
function Sv(e, t, n) {
  var r = Nl(e.children), i = xv(t, r);
  return Object.keys(i).forEach(function(s) {
    var l = i[s];
    if (Qi(l)) {
      var c = s in t, u = s in r, f = t[s], m = Qi(f) && !f.props.in;
      u && (!c || m) ? i[s] = Zi(l, {
        onExited: n.bind(null, l),
        in: !0,
        exit: Rn(l, "exit", e),
        enter: Rn(l, "enter", e)
      }) : !u && c && !m ? i[s] = Zi(l, {
        in: !1
      }) : u && c && Qi(f) && (i[s] = Zi(l, {
        onExited: n.bind(null, l),
        in: f.props.in,
        exit: Rn(l, "exit", e),
        enter: Rn(l, "enter", e)
      }));
    }
  }), i;
}
var Tv = Object.values || function(e) {
  return Object.keys(e).map(function(t) {
    return e[t];
  });
}, wv = {
  component: "div",
  childFactory: function(t) {
    return t;
  }
}, kl = /* @__PURE__ */ function(e) {
  zp(t, e);
  function t(r, i) {
    var s;
    s = e.call(this, r, i) || this;
    var l = s.handleExited.bind(vv(s));
    return s.state = {
      contextValue: {
        isMounting: !0
      },
      handleExited: l,
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
    var l = s.children, c = s.handleExited, u = s.firstRender;
    return {
      children: u ? Cv(i, c) : Sv(i, l, c),
      firstRender: !1
    };
  }, n.handleExited = function(i, s) {
    var l = Nl(this.props.children);
    i.key in l || (i.props.onExited && i.props.onExited(s), this.mounted && this.setState(function(c) {
      var u = ss({}, c.children);
      return delete u[i.key], {
        children: u
      };
    }));
  }, n.render = function() {
    var i = this.props, s = i.component, l = i.childFactory, c = Wp(i, ["component", "childFactory"]), u = this.state.contextValue, f = Tv(this.state.children).map(l);
    return delete c.appear, delete c.enter, delete c.exit, s === null ? /* @__PURE__ */ en.createElement(ps.Provider, {
      value: u
    }, f) : /* @__PURE__ */ en.createElement(ps.Provider, {
      value: u
    }, /* @__PURE__ */ en.createElement(s, c, f));
  }, t;
}(en.Component);
kl.propTypes = process.env.NODE_ENV !== "production" ? {
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
kl.defaultProps = wv;
const Ad = {};
function Vp(e, t) {
  const n = b.useRef(Ad);
  return n.current === Ad && (n.current = e(t)), n;
}
const Ev = [];
function Ov(e) {
  b.useEffect(e, Ev);
}
class Ys {
  constructor() {
    An(this, "currentId", null);
    An(this, "clear", () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    });
    An(this, "disposeEffect", () => this.clear);
  }
  static create() {
    return new Ys();
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
function tn() {
  const e = Vp(Ys.create).current;
  return Ov(e.disposeEffect), e;
}
function Rv(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function _v(e, t, n, r, i) {
  const s = e[t], l = i || t;
  if (s == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let c;
  return typeof s == "function" && !Rv(s) && (c = "Did you accidentally provide a plain function component instead?"), s === b.Fragment && (c = "Did you accidentally provide a React.Fragment instead?"), c !== void 0 ? new Error(`Invalid ${r} \`${l}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Pl = qo(o.elementType, _v), Up = (e) => e.scrollTop;
function At(e, t) {
  return (n) => {
    if (t) {
      const r = e.current;
      n === void 0 ? t(r) : t(r, n);
    }
  };
}
function Gp(e, t, n, r, i, s) {
  const l = e === "exited" && !t ? r : n[e] || n.exited;
  return i || s ? {
    ...l,
    ...i,
    ...s
  } : l;
}
function or(e, t) {
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
function Dd(...e) {
  return e.reduce((t, n) => n == null ? t : function(...i) {
    t.apply(this, i), n.apply(this, i);
  }, () => {
  });
}
function Nv(e) {
  return Ce("MuiSvgIcon", e);
}
Te("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const kv = (e) => {
  const {
    color: t,
    fontSize: n,
    classes: r
  } = e, i = {
    root: ["root", t !== "inherit" && `color${xe(t)}`, `fontSize${xe(n)}`]
  };
  return we(i, Nv, r);
}, Pv = oe("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.color !== "inherit" && t[`color${xe(n.color)}`], t[`fontSize${xe(n.fontSize)}`]];
  }
})($e(({
  theme: e
}) => {
  var t, n, r, i, s, l, c, u, f, m, y, x, p, v;
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
          fontSize: ((l = (s = e.typography) == null ? void 0 : s.pxToRem) == null ? void 0 : l.call(s, 20)) || "1.25rem"
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
          fontSize: ((m = (f = e.typography) == null ? void 0 : f.pxToRem) == null ? void 0 : m.call(f, 35)) || "2.1875rem"
        }
      },
      // TODO v5 deprecate color prop, v6 remove for sx
      ...Object.entries((e.vars ?? e).palette).filter(([, h]) => h && h.main).map(([h]) => {
        var E, _;
        return {
          props: {
            color: h
          },
          style: {
            color: (_ = (E = (e.vars ?? e).palette) == null ? void 0 : E[h]) == null ? void 0 : _.main
          }
        };
      }),
      {
        props: {
          color: "action"
        },
        style: {
          color: (x = (y = (e.vars ?? e).palette) == null ? void 0 : y.action) == null ? void 0 : x.active
        }
      },
      {
        props: {
          color: "disabled"
        },
        style: {
          color: (v = (p = (e.vars ?? e).palette) == null ? void 0 : p.action) == null ? void 0 : v.disabled
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
})), fs = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiSvgIcon"
  }), {
    children: i,
    className: s,
    color: l = "inherit",
    component: c = "svg",
    fontSize: u = "medium",
    htmlColor: f,
    inheritViewBox: m = !1,
    titleAccess: y,
    viewBox: x = "0 0 24 24",
    ...p
  } = r, v = /* @__PURE__ */ b.isValidElement(i) && i.type === "svg", h = {
    ...r,
    color: l,
    component: c,
    fontSize: u,
    instanceFontSize: t.fontSize,
    inheritViewBox: m,
    viewBox: x,
    hasSvgAsChild: v
  }, E = {};
  m || (E.viewBox = x);
  const _ = kv(h);
  return /* @__PURE__ */ C(Pv, {
    as: c,
    className: pe(_.root, s),
    focusable: "false",
    color: f,
    "aria-hidden": y ? void 0 : !0,
    role: y ? "img" : void 0,
    ref: n,
    ...E,
    ...p,
    ...v && i.props,
    ownerState: h,
    children: [v ? i.props.children : i, y ? /* @__PURE__ */ a("title", {
      children: y
    }) : null]
  });
});
process.env.NODE_ENV !== "production" && (fs.propTypes = {
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
fs.muiName = "SvgIcon";
function at(e, t) {
  function n(r, i) {
    return /* @__PURE__ */ a(fs, {
      "data-testid": process.env.NODE_ENV !== "production" ? `${t}Icon` : void 0,
      ref: i,
      ...r,
      children: e
    });
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${t}Icon`), n.muiName = fs.muiName, /* @__PURE__ */ b.memo(/* @__PURE__ */ b.forwardRef(n));
}
function Xs(e, t = 166) {
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
function zo(e) {
  var n;
  let t = e.activeElement;
  for (; ((n = t == null ? void 0 : t.shadowRoot) == null ? void 0 : n.activeElement) != null; )
    t = t.shadowRoot.activeElement;
  return t;
}
function $t(e) {
  return e && e.ownerDocument || document;
}
function Po(e) {
  return $t(e).defaultView || window;
}
function Ha(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
function Hp(e, t, n, r, i) {
  if (process.env.NODE_ENV === "production")
    return null;
  const s = i || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${s}\` is not supported. Please remove it.`) : null;
}
function ri(e) {
  const {
    controlled: t,
    default: n,
    name: r,
    state: i = "value"
  } = e, {
    current: s
  } = b.useRef(t !== void 0), [l, c] = b.useState(n), u = s ? t : l;
  if (process.env.NODE_ENV !== "production") {
    b.useEffect(() => {
      s !== (t !== void 0) && console.error([`MUI: A component is changing the ${s ? "" : "un"}controlled ${i} state of ${r} to be ${s ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${r} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [i, r, t]);
    const {
      current: m
    } = b.useRef(n);
    b.useEffect(() => {
      !s && JSON.stringify(n) !== JSON.stringify(m) && console.error([`MUI: A component is changing the default ${i} state of an uncontrolled ${r} after being initialized. To suppress this warning opt to use a controlled ${r}.`].join(`
`));
    }, [JSON.stringify(n)]);
  }
  const f = b.useCallback((m) => {
    s || c(m);
  }, []);
  return [u, f];
}
function Dt(e) {
  const t = b.useRef(e);
  return It(() => {
    t.current = e;
  }), b.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...n)
  )).current;
}
function Ct(...e) {
  const t = b.useRef(void 0), n = b.useCallback((r) => {
    const i = e.map((s) => {
      if (s == null)
        return null;
      if (typeof s == "function") {
        const l = s, c = l(r);
        return typeof c == "function" ? c : () => {
          l(null);
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
  return b.useMemo(() => e.every((r) => r == null) ? null : (r) => {
    t.current && (t.current(), t.current = void 0), r != null && (t.current = n(r));
  }, e);
}
function qp(e, t) {
  const n = e.charCodeAt(2);
  return e[0] === "o" && e[1] === "n" && n >= 65 && n <= 90 && typeof t == "function";
}
function Kp(e, t) {
  if (!e)
    return t;
  function n(l, c) {
    const u = {};
    return Object.keys(c).forEach((f) => {
      qp(f, c[f]) && typeof l[f] == "function" && (u[f] = (...m) => {
        l[f](...m), c[f](...m);
      });
    }), u;
  }
  if (typeof e == "function" || typeof t == "function")
    return (l) => {
      const c = typeof t == "function" ? t(l) : t, u = typeof e == "function" ? e({
        ...l,
        ...c
      }) : e, f = pe(l == null ? void 0 : l.className, c == null ? void 0 : c.className, u == null ? void 0 : u.className), m = n(u, c);
      return {
        ...c,
        ...u,
        ...m,
        ...!!f && {
          className: f
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
  const r = t, i = n(e, r), s = pe(r == null ? void 0 : r.className, e == null ? void 0 : e.className);
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
function ms(e) {
  return typeof e == "string";
}
function Yp(e, t, n) {
  return e === void 0 || ms(e) ? t : {
    ...t,
    ownerState: {
      ...t.ownerState,
      ...n
    }
  };
}
function Xp(e, t, n) {
  return typeof e == "function" ? e(t, n) : e;
}
function Jp(e) {
  if (e === void 0)
    return {};
  const t = {};
  for (const n of Object.keys(e))
    qp(n, e[n]) && (t[n] = e[n]);
  return t;
}
function Bd(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((n) => !(n.match(/^on[A-Z]/) && typeof e[n] == "function")).forEach((n) => {
    t[n] = e[n];
  }), t;
}
function Qp(e) {
  const {
    getSlotProps: t,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: i,
    className: s
  } = e;
  if (!t) {
    const p = pe(n == null ? void 0 : n.className, s, i == null ? void 0 : i.className, r == null ? void 0 : r.className), v = {
      ...n == null ? void 0 : n.style,
      ...i == null ? void 0 : i.style,
      ...r == null ? void 0 : r.style
    }, h = {
      ...n,
      ...i,
      ...r
    };
    return p.length > 0 && (h.className = p), Object.keys(v).length > 0 && (h.style = v), {
      props: h,
      internalRef: void 0
    };
  }
  const l = Jp({
    ...i,
    ...r
  }), c = Bd(r), u = Bd(i), f = t(l), m = pe(f == null ? void 0 : f.className, n == null ? void 0 : n.className, s, i == null ? void 0 : i.className, r == null ? void 0 : r.className), y = {
    ...f == null ? void 0 : f.style,
    ...n == null ? void 0 : n.style,
    ...i == null ? void 0 : i.style,
    ...r == null ? void 0 : r.style
  }, x = {
    ...f,
    ...n,
    ...u,
    ...c
  };
  return m.length > 0 && (x.className = m), Object.keys(y).length > 0 && (x.style = y), {
    props: x,
    internalRef: f.ref
  };
}
function ye(e, t) {
  const {
    className: n,
    elementType: r,
    ownerState: i,
    externalForwardedProps: s,
    internalForwardedProps: l,
    shouldForwardComponentProp: c = !1,
    ...u
  } = t, {
    component: f,
    slots: m = {
      [e]: void 0
    },
    slotProps: y = {
      [e]: void 0
    },
    ...x
  } = s, p = m[e] || r, v = Xp(y[e], i), {
    props: {
      component: h,
      ...E
    },
    internalRef: _
  } = Qp({
    className: n,
    ...u,
    externalForwardedProps: e === "root" ? x : void 0,
    externalSlotProps: v
  }), k = Ct(_, v == null ? void 0 : v.ref, t.ref), O = e === "root" ? h || f : h, w = Yp(p, {
    ...e === "root" && !f && !m[e] && l,
    ...e !== "root" && !m[e] && l,
    ...E,
    ...O && !c && {
      as: O
    },
    ...O && c && {
      component: O
    },
    ref: k
  }, i);
  return [p, w];
}
function Iv(e) {
  return Ce("MuiCollapse", e);
}
Te("MuiCollapse", ["root", "horizontal", "vertical", "entered", "hidden", "wrapper", "wrapperInner"]);
const $v = (e) => {
  const {
    orientation: t,
    classes: n
  } = e;
  return we({
    root: ["root", t],
    entered: ["entered"],
    hidden: ["hidden"],
    wrapper: ["wrapper", t],
    wrapperInner: ["wrapperInner", t]
  }, Iv, n);
}, Mv = oe("div", {
  name: "MuiCollapse",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, t[n.orientation], n.state === "entered" && t.entered, n.state === "exited" && !n.in && n.collapsedSize === "0px" && t.hidden];
  }
})($e(({
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
}))), Av = oe("div", {
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
}), Dv = oe("div", {
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
}), hs = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiCollapse"
  }), {
    addEndListener: i,
    children: s,
    className: l,
    collapsedSize: c = "0px",
    component: u,
    easing: f,
    in: m,
    onEnter: y,
    onEntered: x,
    onEntering: p,
    onExit: v,
    onExited: h,
    onExiting: E,
    orientation: _ = "vertical",
    slots: k = {},
    slotProps: O = {},
    style: w,
    timeout: T = $p.standard,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: N = Mo,
    ...M
  } = r, D = {
    ...r,
    orientation: _,
    collapsedSize: c
  }, B = $v(D), F = $n(), P = tn(), g = b.useRef(null), $ = b.useRef(), I = typeof c == "number" ? `${c}px` : c, A = _ === "horizontal", L = A ? "width" : "height", W = b.useRef(null), q = Ct(n, W), ie = () => g.current ? g.current[A ? "clientWidth" : "clientHeight"] : 0, z = At(W, (se, ke) => {
    g.current && A && (g.current.style.position = "absolute"), se.style[L] = I, y && y(se, ke);
  }), V = At(W, (se, ke) => {
    const Fe = ie();
    g.current && A && (g.current.style.position = "");
    const {
      duration: Z,
      easing: Me
    } = or({
      style: w,
      timeout: T,
      easing: f
    }, {
      mode: "enter"
    });
    if (T === "auto") {
      const Ee = F.transitions.getAutoHeightDuration(Fe);
      se.style.transitionDuration = `${Ee}ms`, $.current = Ee;
    } else
      se.style.transitionDuration = typeof Z == "string" ? Z : `${Z}ms`;
    se.style[L] = `${Fe}px`, se.style.transitionTimingFunction = Me, p && p(se, ke);
  }), Q = At(W, (se, ke) => {
    se.style[L] = "auto", x && x(se, ke);
  }), re = At(W, (se) => {
    se.style[L] = `${ie()}px`, v && v(se);
  }), ee = At(W, h), G = At(W, (se) => {
    const ke = ie(), {
      duration: Fe,
      easing: Z
    } = or({
      style: w,
      timeout: T,
      easing: f
    }, {
      mode: "exit"
    });
    if (T === "auto") {
      const Me = F.transitions.getAutoHeightDuration(ke);
      se.style.transitionDuration = `${Me}ms`, $.current = Me;
    } else
      se.style.transitionDuration = typeof Fe == "string" ? Fe : `${Fe}ms`;
    se.style[L] = I, se.style.transitionTimingFunction = Z, E && E(se);
  }), K = (se) => {
    T === "auto" && P.start($.current || 0, se), i && i(W.current, se);
  }, Y = {
    slots: k,
    slotProps: O,
    component: u
  }, [U, te] = ye("root", {
    ref: q,
    className: pe(B.root, l),
    elementType: Mv,
    externalForwardedProps: Y,
    ownerState: D,
    additionalProps: {
      style: {
        [A ? "minWidth" : "minHeight"]: I,
        ...w
      }
    }
  }), [ne, ge] = ye("wrapper", {
    ref: g,
    className: B.wrapper,
    elementType: Av,
    externalForwardedProps: Y,
    ownerState: D
  }), [j, fe] = ye("wrapperInner", {
    className: B.wrapperInner,
    elementType: Dv,
    externalForwardedProps: Y,
    ownerState: D
  });
  return /* @__PURE__ */ a(N, {
    in: m,
    onEnter: z,
    onEntered: Q,
    onEntering: V,
    onExit: re,
    onExited: ee,
    onExiting: G,
    addEndListener: K,
    nodeRef: W,
    timeout: T === "auto" ? null : T,
    ...M,
    children: (se, {
      ownerState: ke,
      ...Fe
    }) => {
      const Z = {
        ...D,
        state: se
      };
      return /* @__PURE__ */ a(U, {
        ...te,
        className: pe(te.className, {
          entered: B.entered,
          exited: !m && I === "0px" && B.hidden
        }[se]),
        ownerState: Z,
        ...Fe,
        children: /* @__PURE__ */ a(ne, {
          ...ge,
          ownerState: Z,
          children: /* @__PURE__ */ a(j, {
            ...fe,
            ownerState: Z,
            children: s
          })
        })
      });
    }
  });
});
process.env.NODE_ENV !== "production" && (hs.propTypes = {
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
  component: Pl,
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
hs && (hs.muiSupportAuto = !0);
function Bv(e) {
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
function Zp(e, t, n, r) {
  const i = e[t];
  if (i == null || !Number.isInteger(i)) {
    const s = Bv(i);
    return new RangeError(`Invalid ${r} \`${t}\` of type \`${s}\` supplied to \`${n}\`, expected \`integer\`.`);
  }
  return null;
}
function ef(e, t, n, r) {
  return e[t] === void 0 ? null : Zp(e, t, n, r);
}
function qa() {
  return null;
}
ef.isRequired = Zp;
qa.isRequired = qa;
const tf = process.env.NODE_ENV === "production" ? qa : ef;
function Lv(e) {
  return Ce("MuiPaper", e);
}
Te("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const Fv = (e) => {
  const {
    square: t,
    elevation: n,
    variant: r,
    classes: i
  } = e, s = {
    root: ["root", r, !t && "rounded", r === "elevation" && `elevation${n}`]
  };
  return we(s, Lv, i);
}, jv = oe("div", {
  name: "MuiPaper",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, t[n.variant], !n.square && t.rounded, n.variant === "elevation" && t[`elevation${n.elevation}`]];
  }
})($e(({
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
}))), yt = /* @__PURE__ */ b.forwardRef(function(t, n) {
  var p;
  const r = Oe({
    props: t,
    name: "MuiPaper"
  }), i = $n(), {
    className: s,
    component: l = "div",
    elevation: c = 1,
    square: u = !1,
    variant: f = "elevation",
    ...m
  } = r, y = {
    ...r,
    component: l,
    elevation: c,
    square: u,
    variant: f
  }, x = Fv(y);
  return process.env.NODE_ENV !== "production" && i.shadows[c] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${c}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${c}]\` is defined.`].join(`
`)), /* @__PURE__ */ a(jv, {
    as: l,
    ownerState: y,
    className: pe(x.root, s),
    ref: n,
    ...m,
    style: {
      ...f === "elevation" && {
        "--Paper-shadow": (i.vars || i).shadows[c],
        ...i.vars && {
          "--Paper-overlay": (p = i.vars.overlays) == null ? void 0 : p[c]
        },
        ...!i.vars && i.palette.mode === "dark" && {
          "--Paper-overlay": `linear-gradient(${ds("#fff", za(c))}, ${ds("#fff", za(c))})`
        }
      },
      ...m.style
    }
  });
});
process.env.NODE_ENV !== "production" && (yt.propTypes = {
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
  elevation: qo(tf, (e) => {
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
const Il = /* @__PURE__ */ b.createContext({});
process.env.NODE_ENV !== "production" && (Il.displayName = "AccordionContext");
function Wv(e) {
  return Ce("MuiAccordion", e);
}
const Ai = Te("MuiAccordion", ["root", "heading", "rounded", "expanded", "disabled", "gutters", "region"]), zv = (e) => {
  const {
    classes: t,
    square: n,
    expanded: r,
    disabled: i,
    disableGutters: s
  } = e;
  return we({
    root: ["root", !n && "rounded", r && "expanded", i && "disabled", !s && "gutters"],
    heading: ["heading"],
    region: ["region"]
  }, Wv, t);
}, Vv = oe(yt, {
  name: "MuiAccordion",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [{
      [`& .${Ai.region}`]: t.region
    }, t.root, !n.square && t.rounded, !n.disableGutters && t.gutters];
  }
})($e(({
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
    [`&.${Ai.expanded}`]: {
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
    [`&.${Ai.disabled}`]: {
      backgroundColor: (e.vars || e).palette.action.disabledBackground
    }
  };
}), $e(({
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
      [`&.${Ai.expanded}`]: {
        margin: "16px 0"
      }
    }
  }]
}))), Uv = oe("h3", {
  name: "MuiAccordion",
  slot: "Heading"
})({
  all: "unset"
}), Gv = oe("div", {
  name: "MuiAccordion",
  slot: "Region"
})({}), of = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiAccordion"
  }), {
    children: i,
    className: s,
    defaultExpanded: l = !1,
    disabled: c = !1,
    disableGutters: u = !1,
    expanded: f,
    onChange: m,
    slots: y = {},
    slotProps: x = {},
    ...p
  } = r, [v, h] = ri({
    controlled: f,
    default: l,
    name: "Accordion",
    state: "expanded"
  }), E = b.useCallback((A) => {
    h(!v), m && m(A, !v);
  }, [v, m, h]), [_, ...k] = b.Children.toArray(i), O = b.useMemo(() => ({
    expanded: v,
    disabled: c,
    disableGutters: u,
    toggle: E
  }), [v, c, u, E]), w = {
    ...r,
    disabled: c,
    disableGutters: u,
    expanded: v
  }, T = zv(w), N = {
    slots: y,
    slotProps: x
  }, [M, D] = ye("root", {
    elementType: Vv,
    externalForwardedProps: {
      ...N,
      ...p
    },
    className: pe(T.root, s),
    shouldForwardComponentProp: !0,
    ownerState: w,
    ref: n
  }), [B, F] = ye("heading", {
    elementType: Uv,
    externalForwardedProps: N,
    className: T.heading,
    ownerState: w
  }), [P, g] = ye("transition", {
    elementType: hs,
    externalForwardedProps: N,
    ownerState: w
  }), [$, I] = ye("region", {
    elementType: Gv,
    externalForwardedProps: N,
    ownerState: w,
    className: T.region,
    additionalProps: {
      "aria-labelledby": _.props.id,
      id: _.props["aria-controls"],
      role: "region"
    }
  });
  return /* @__PURE__ */ C(M, {
    ...D,
    children: [/* @__PURE__ */ a(B, {
      ...F,
      children: /* @__PURE__ */ a(Il.Provider, {
        value: O,
        children: _
      })
    }), /* @__PURE__ */ a(P, {
      in: v,
      timeout: "auto",
      ...g,
      children: /* @__PURE__ */ a($, {
        ...I,
        children: k
      })
    })]
  });
});
process.env.NODE_ENV !== "production" && (of.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: qo(o.node.isRequired, (e) => {
    const t = b.Children.toArray(e.children)[0];
    return Nn.isFragment(t) ? new Error("MUI: The Accordion doesn't accept a Fragment as a child. Consider providing an array instead.") : /* @__PURE__ */ b.isValidElement(t) ? null : new Error("MUI: Expected the first child of Accordion to be a valid element.");
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
function Hv(e) {
  return Ce("MuiAccordionDetails", e);
}
Te("MuiAccordionDetails", ["root"]);
const qv = (e) => {
  const {
    classes: t
  } = e;
  return we({
    root: ["root"]
  }, Hv, t);
}, Kv = oe("div", {
  name: "MuiAccordionDetails",
  slot: "Root"
})($e(({
  theme: e
}) => ({
  padding: e.spacing(1, 2, 2)
}))), nf = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiAccordionDetails"
  }), {
    className: i,
    ...s
  } = r, l = r, c = qv(l);
  return /* @__PURE__ */ a(Kv, {
    className: pe(c.root, i),
    ref: n,
    ownerState: l,
    ...s
  });
});
process.env.NODE_ENV !== "production" && (nf.propTypes = {
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
const So = o.oneOfType([o.func, o.object]);
function gs(e) {
  try {
    return e.matches(":focus-visible");
  } catch {
    process.env.NODE_ENV !== "production" && !window.navigator.userAgent.includes("jsdom") && console.warn(["MUI: The `:focus-visible` pseudo class is not supported in this browser.", "Some components rely on this feature to work properly."].join(`
`));
  }
  return !1;
}
function Yv(e) {
  const {
    focusableWhenDisabled: t,
    disabled: n,
    composite: r = !1,
    tabIndex: i = 0,
    isNativeButton: s
  } = e, l = r && t !== !1, c = r && t === !1;
  return b.useMemo(() => {
    const f = {
      // allow Tabbing away from focusableWhenDisabled elements
      onKeyDown(m) {
        n && t && m.key !== "Tab" && m.preventDefault();
      }
    };
    return r || (f.tabIndex = i, !s && n && (f.tabIndex = t ? i : -1)), (s && (t || l) || !s && n) && (f["aria-disabled"] = n), s && (!t || c) && (f.disabled = n), f;
  }, [r, n, t, l, c, s, i]);
}
const Xv = {};
function Jv(e) {
  const {
    nativeButton: t,
    nativeButtonProp: n,
    internalNativeButton: r = t,
    allowInferredHostMismatch: i = !1,
    disabled: s,
    type: l,
    hasFormAction: c = !1,
    tabIndex: u = 0,
    focusableWhenDisabled: f,
    stopEventPropagation: m = !1,
    onBeforeKeyDown: y,
    onBeforeKeyUp: x
  } = e, p = b.useRef(null), v = f === !0, h = Yv({
    focusableWhenDisabled: v,
    disabled: s,
    isNativeButton: t,
    tabIndex: u
  });
  process.env.NODE_ENV !== "production" && b.useEffect(() => {
    const O = p.current;
    if (O == null)
      return;
    const w = O.tagName === "BUTTON";
    if (n !== void 0) {
      n && !w && console.error("MUI: A component that acts as a button expected a native <button> because the `nativeButton` prop is true. Rendering a non-<button> removes native button semantics, which can impact forms and accessibility. Render a real <button> or set `nativeButton` to `false`."), !n && w && console.error("MUI: A component that acts as a button expected a non-<button> because the `nativeButton` prop is false. Rendering a <button> keeps native behavior while additionally applies non-native attributes and handlers, which can add unintended extra attributes (such as `role` or `aria-disabled`). Render a non-<button> such as <div>, or set `nativeButton` to `true`.");
      return;
    }
    i || (r && !w && console.error("MUI: A component rendering a native <button> resolved to a non-<button> element, but `nativeButton={false}` was not specified and the resolved root is a non-<button>. When rendering a custom component, set `nativeButton={false}` explicitly or render a <button> element."), !r && w && console.error("MUI: A component that acts as a non-native button resolved to a native <button> element, but `nativeButton={true}` was not specified. When rendering a custom component, set `nativeButton={true}` explicitly or render a non-<button> element."));
  }, [i, r, n]);
  const E = b.useCallback(() => {
    const O = p.current;
    return O == null ? t : O.tagName === "BUTTON" ? !0 : !!(O.tagName === "A" && O.href);
  }, [t]), _ = b.useMemo(() => {
    const O = v ? {} : {
      tabIndex: s ? -1 : u
    };
    return t ? (O.type = l === void 0 && !c ? "button" : l, v || (O.disabled = s)) : (O.role = "button", !v && s && (O["aria-disabled"] = s)), v ? {
      ...O,
      ...h
    } : O;
  }, [s, v, h, c, t, u, l]);
  return {
    getButtonProps: b.useCallback((O = Xv) => {
      const {
        onClick: w,
        onKeyDown: T,
        onKeyUp: N,
        ...M
      } = O;
      return {
        ..._,
        ...M,
        onClick: (P) => {
          if (m && P.stopPropagation(), s) {
            P.preventDefault();
            return;
          }
          w == null || w(P);
        },
        onKeyDown: (P) => {
          if (v && h.onKeyDown(P), !s && (y == null || y(P), T == null || T(P), !(P.target !== P.currentTarget || E()))) {
            if (P.key === " ") {
              P.preventDefault();
              return;
            }
            P.key === "Enter" && (P.preventDefault(), P.currentTarget.click());
          }
        },
        onKeyUp: (P) => {
          s || (x == null || x(P), N == null || N(P), P.target === P.currentTarget && !E() && P.key === " " && !P.defaultPrevented && P.currentTarget.click());
        }
      };
    }, [_, s, v, h, E, y, x, m]),
    rootRef: p
  };
}
class bs {
  constructor() {
    An(this, "mountEffect", () => {
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
    return new bs();
  }
  static use() {
    const t = Vp(bs.create).current, [n, r] = b.useState(!1);
    return t.shouldMount = n, t.setShouldMount = r, b.useEffect(t.mountEffect, [n]), t;
  }
  mount() {
    return this.mounted || (this.mounted = Zv(), this.shouldMount = !0, this.setShouldMount(this.shouldMount)), this.mounted;
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
function Qv() {
  return bs.use();
}
function Zv() {
  let e, t;
  const n = new Promise((r, i) => {
    e = r, t = i;
  });
  return n.resolve = e, n.reject = t, n;
}
function rf(e) {
  const {
    className: t,
    classes: n,
    pulsate: r = !1,
    rippleX: i,
    rippleY: s,
    rippleSize: l,
    in: c,
    onExited: u,
    timeout: f
  } = e, [m, y] = b.useState(!1), x = pe(t, n.ripple, n.rippleVisible, r && n.ripplePulsate), p = {
    width: l,
    height: l,
    top: -(l / 2) + s,
    left: -(l / 2) + i
  }, v = pe(n.child, m && n.childLeaving, r && n.childPulsate);
  return !c && !m && y(!0), b.useEffect(() => {
    if (!c && u != null) {
      const h = setTimeout(u, f);
      return () => {
        clearTimeout(h);
      };
    }
  }, [u, c, f]), /* @__PURE__ */ a("span", {
    className: x,
    style: p,
    children: /* @__PURE__ */ a("span", {
      className: v
    })
  });
}
process.env.NODE_ENV !== "production" && (rf.propTypes = {
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
const go = Te("MuiTouchRipple", ["root", "ripple", "rippleVisible", "ripplePulsate", "child", "childLeaving", "childPulsate"]), Ka = 550, e0 = 80, t0 = mi`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`, o0 = mi`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`, n0 = mi`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`, r0 = oe("span", {
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
}), i0 = oe(rf, {
  name: "MuiTouchRipple",
  slot: "Ripple"
})`
  opacity: 0;
  position: absolute;

  &.${go.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${t0};
    animation-duration: ${Ka}ms;
    animation-timing-function: ${({
  theme: e
}) => e.transitions.easing.easeInOut};
  }

  &.${go.ripplePulsate} {
    animation-duration: ${({
  theme: e
}) => e.transitions.duration.shorter}ms;
  }

  & .${go.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${go.childLeaving} {
    opacity: 0;
    animation-name: ${o0};
    animation-duration: ${Ka}ms;
    animation-timing-function: ${({
  theme: e
}) => e.transitions.easing.easeInOut};
  }

  & .${go.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${n0};
    animation-duration: 2500ms;
    animation-timing-function: ${({
  theme: e
}) => e.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`, sf = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiTouchRipple"
  }), {
    center: i = !1,
    classes: s = {},
    className: l,
    ...c
  } = r, [u, f] = b.useState([]), m = b.useRef(0), y = b.useRef(null);
  b.useEffect(() => {
    y.current && (y.current(), y.current = null);
  }, [u]);
  const x = b.useRef(!1), p = tn(), v = b.useRef(null), h = b.useRef(null), E = b.useCallback((w) => {
    const {
      pulsate: T,
      rippleX: N,
      rippleY: M,
      rippleSize: D,
      cb: B
    } = w;
    f((F) => [...F, /* @__PURE__ */ a(i0, {
      classes: {
        ripple: pe(s.ripple, go.ripple),
        rippleVisible: pe(s.rippleVisible, go.rippleVisible),
        ripplePulsate: pe(s.ripplePulsate, go.ripplePulsate),
        child: pe(s.child, go.child),
        childLeaving: pe(s.childLeaving, go.childLeaving),
        childPulsate: pe(s.childPulsate, go.childPulsate)
      },
      timeout: Ka,
      pulsate: T,
      rippleX: N,
      rippleY: M,
      rippleSize: D
    }, m.current)]), m.current += 1, y.current = B;
  }, [s]), _ = b.useCallback((w = {}, T = {}, N = () => {
  }) => {
    const {
      pulsate: M = !1,
      center: D = i || T.pulsate,
      fakeElement: B = !1
      // For test purposes
    } = T;
    if ((w == null ? void 0 : w.type) === "mousedown" && x.current) {
      x.current = !1;
      return;
    }
    (w == null ? void 0 : w.type) === "touchstart" && (x.current = !0);
    const F = B ? null : h.current, P = F ? F.getBoundingClientRect() : {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    };
    let g, $, I;
    if (D || w === void 0 || w.clientX === 0 && w.clientY === 0 || !w.clientX && !w.touches)
      g = Math.round(P.width / 2), $ = Math.round(P.height / 2);
    else {
      const {
        clientX: A,
        clientY: L
      } = w.touches && w.touches.length > 0 ? w.touches[0] : w;
      g = Math.round(A - P.left), $ = Math.round(L - P.top);
    }
    if (D)
      I = Math.sqrt((2 * P.width ** 2 + P.height ** 2) / 3), I % 2 === 0 && (I += 1);
    else {
      const A = Math.max(Math.abs((F ? F.clientWidth : 0) - g), g) * 2 + 2, L = Math.max(Math.abs((F ? F.clientHeight : 0) - $), $) * 2 + 2;
      I = Math.sqrt(A ** 2 + L ** 2);
    }
    w != null && w.touches ? v.current === null && (v.current = () => {
      E({
        pulsate: M,
        rippleX: g,
        rippleY: $,
        rippleSize: I,
        cb: N
      });
    }, p.start(e0, () => {
      v.current && (v.current(), v.current = null);
    })) : E({
      pulsate: M,
      rippleX: g,
      rippleY: $,
      rippleSize: I,
      cb: N
    });
  }, [i, E, p]), k = b.useCallback(() => {
    _({}, {
      pulsate: !0
    });
  }, [_]), O = b.useCallback((w, T) => {
    if (p.clear(), (w == null ? void 0 : w.type) === "touchend" && v.current) {
      v.current(), v.current = null, p.start(0, () => {
        O(w, T);
      });
      return;
    }
    v.current = null, f((N) => N.length > 0 ? N.slice(1) : N), y.current = T;
  }, [p]);
  return b.useImperativeHandle(n, () => ({
    pulsate: k,
    start: _,
    stop: O
  }), [k, _, O]), /* @__PURE__ */ a(r0, {
    className: pe(go.root, s.root, l),
    ref: h,
    ...c,
    children: /* @__PURE__ */ a(kl, {
      component: null,
      exit: !0,
      children: u
    })
  });
});
process.env.NODE_ENV !== "production" && (sf.propTypes = {
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
function s0(e) {
  return Ce("MuiButtonBase", e);
}
const a0 = Te("MuiButtonBase", ["root", "disabled", "focusVisible"]), l0 = (e) => {
  const {
    disabled: t,
    focusVisible: n,
    focusVisibleClassName: r,
    suppressFocusVisible: i,
    classes: s
  } = e, c = we({
    root: ["root", t && "disabled", n && !i && "focusVisible"]
  }, s0, s);
  return n && !i && r && (c.root += ` ${r}`), c;
}, c0 = oe("button", {
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
  [`&.${a0.disabled}`]: {
    pointerEvents: "none",
    // Disable link interactions
    cursor: "default"
  },
  "@media print": {
    colorAdjust: "exact"
  }
}), Io = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiButtonBase"
  }), {
    action: i,
    centerRipple: s = !1,
    children: l,
    className: c,
    component: u = "button",
    disabled: f = !1,
    disableRipple: m = !1,
    disableTouchRipple: y = !1,
    focusRipple: x = !1,
    focusVisibleClassName: p,
    /* eslint-disable react/prop-types */
    // replaces internal handling in Chip, other components can opt-in individually to use this in the future
    focusableWhenDisabled: v,
    // escape hatch to suppress the focusVisible state and callback
    // used by anchored <Menu>s to to suppress focus visible styling when opened with a pointer
    suppressFocusVisible: h = !1,
    // private prop to allow native vs non-native button props to be resolved before mount
    internalNativeButton: E,
    /* eslint-enable react/prop-types */
    LinkComponent: _ = "a",
    nativeButton: k,
    onBlur: O,
    onClick: w,
    onContextMenu: T,
    onDragLeave: N,
    onFocus: M,
    onFocusVisible: D,
    onKeyDown: B,
    onKeyUp: F,
    onMouseDown: P,
    onMouseLeave: g,
    onMouseUp: $,
    onTouchEnd: I,
    onTouchMove: A,
    onTouchStart: L,
    tabIndex: W = 0,
    TouchRippleProps: q,
    touchRippleRef: ie,
    type: z,
    ...V
  } = r, Q = !!(V.href || V.to), re = !!V.formAction;
  let ee = u;
  ee === "button" && Q && (ee = _);
  const G = typeof ee == "string" ? ee === "button" : E ?? !1, K = k ?? G, Y = Qv(), U = Ct(Y.ref, ie), [te, ne] = b.useState(!1);
  (f || h) && te && ne(!1);
  const ge = Dt((_e) => {
    x && !_e.repeat && te && _e.key === " " && Y.stop(_e, () => {
      Y.start(_e);
    });
  }), j = Dt((_e) => {
    x && _e.key === " " && te && !_e.defaultPrevented && Y.stop(_e, () => {
      Y.pulsate(_e);
    });
  }), {
    getButtonProps: fe,
    rootRef: se
  } = Jv({
    nativeButton: K,
    nativeButtonProp: k,
    internalNativeButton: G,
    allowInferredHostMismatch: Q || typeof ee == "string",
    disabled: f,
    type: z,
    hasFormAction: re,
    tabIndex: W,
    onBeforeKeyDown: ge,
    onBeforeKeyUp: j
  }), {
    onClick: ke,
    onKeyDown: Fe,
    onKeyUp: Z,
    ...Me
  } = fe({
    onClick: w,
    onKeyDown: B,
    onKeyUp: F
  });
  b.useImperativeHandle(i, () => ({
    focusVisible: () => {
      ne(!0), se.current.focus();
    }
  }), [se]);
  const Ee = Y.shouldMount && !m && !f;
  b.useEffect(() => {
    te && x && !m && Y.pulsate();
  }, [m, x, te, Y]);
  const Ue = Jo(Y, "start", P, y), Re = Jo(Y, "stop", T, y), Ge = Jo(Y, "stop", N, y), je = Jo(Y, "stop", $, y), Pe = Jo(Y, "stop", (_e) => {
    te && _e.preventDefault(), g && g(_e);
  }, y), le = Jo(Y, "start", L, y), ze = Jo(Y, "stop", I, y), Ke = Jo(Y, "stop", A, y), He = Jo(Y, "stop", (_e) => {
    gs(_e.target) || ne(!1), O && O(_e);
  }, !1), Rt = Dt((_e) => {
    se.current || (se.current = _e.currentTarget), !h && gs(_e.target) && (ne(!0), D && D(_e)), M && M(_e);
  }), me = {};
  Q && (me.tabIndex = f ? -1 : W, f && (me["aria-disabled"] = f), me.type = z);
  const Ae = Ct(n, se), lt = {
    ...r,
    centerRipple: s,
    component: u,
    disabled: f,
    disableRipple: m,
    disableTouchRipple: y,
    focusRipple: x,
    suppressFocusVisible: h,
    tabIndex: W,
    focusVisible: te
  }, We = l0(lt);
  return /* @__PURE__ */ C(c0, {
    as: ee,
    className: pe(We.root, c),
    ownerState: lt,
    onBlur: He,
    onClick: ke,
    onContextMenu: Re,
    onFocus: Rt,
    onKeyDown: Fe,
    onKeyUp: Z,
    onMouseDown: Ue,
    onMouseLeave: Pe,
    onMouseUp: je,
    onDragLeave: Ge,
    onTouchEnd: ze,
    onTouchMove: Ke,
    onTouchStart: le,
    ref: Ae,
    ...Q ? me : Me,
    ...V,
    children: [l, Ee ? /* @__PURE__ */ a(sf, {
      ref: U,
      center: s,
      ...q
    }) : null]
  });
});
function Jo(e, t, n, r = !1) {
  return Dt((i) => (n && n(i), r || e[t](i), !0));
}
process.env.NODE_ENV !== "production" && (Io.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports `focusVisible()` action.
   */
  action: So,
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
  component: Pl,
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
function d0(e) {
  return Ce("MuiAccordionSummary", e);
}
const Hn = Te("MuiAccordionSummary", ["root", "expanded", "focusVisible", "disabled", "gutters", "content", "expandIconWrapper"]), u0 = (e) => {
  const {
    classes: t,
    expanded: n,
    disabled: r,
    disableGutters: i
  } = e;
  return we({
    root: ["root", n && "expanded", r && "disabled", !i && "gutters"],
    focusVisible: ["focusVisible"],
    content: ["content", n && "expanded"],
    expandIconWrapper: ["expandIconWrapper", n && "expanded"]
  }, d0, t);
}, p0 = oe(Io, {
  name: "MuiAccordionSummary",
  slot: "Root"
})($e(({
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
    [`&.${Hn.focusVisible}`]: {
      backgroundColor: (e.vars || e).palette.action.focus
    },
    [`&.${Hn.disabled}`]: {
      opacity: (e.vars || e).palette.action.disabledOpacity
    },
    [`&:hover:not(.${Hn.disabled})`]: {
      cursor: "pointer"
    },
    variants: [{
      props: (n) => !n.disableGutters,
      style: {
        [`&.${Hn.expanded}`]: {
          minHeight: 64
        }
      }
    }]
  };
})), f0 = oe("span", {
  name: "MuiAccordionSummary",
  slot: "Content"
})($e(({
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
      [`&.${Hn.expanded}`]: {
        margin: "20px 0"
      }
    }
  }]
}))), m0 = oe("span", {
  name: "MuiAccordionSummary",
  slot: "ExpandIconWrapper"
})($e(({
  theme: e
}) => ({
  display: "flex",
  color: (e.vars || e).palette.action.active,
  transform: "rotate(0deg)",
  transition: e.transitions.create("transform", {
    duration: e.transitions.duration.shortest
  }),
  [`&.${Hn.expanded}`]: {
    transform: "rotate(180deg)"
  }
}))), af = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiAccordionSummary"
  }), {
    children: i,
    className: s,
    expandIcon: l,
    focusVisibleClassName: c,
    onClick: u,
    slots: f,
    slotProps: m,
    ...y
  } = r, {
    disabled: x = !1,
    disableGutters: p,
    expanded: v,
    toggle: h
  } = b.useContext(Il), E = (F) => {
    h && h(F), u && u(F);
  }, _ = {
    ...r,
    expanded: v,
    disabled: x,
    disableGutters: p
  }, k = u0(_), O = {
    slots: f,
    slotProps: m
  }, [w, T] = ye("root", {
    ref: n,
    shouldForwardComponentProp: !0,
    className: pe(k.root, s),
    elementType: p0,
    externalForwardedProps: {
      ...O,
      ...y
    },
    ownerState: _,
    additionalProps: {
      focusRipple: !1,
      disableRipple: !0,
      internalNativeButton: !0,
      disabled: x,
      "aria-expanded": v,
      focusVisibleClassName: pe(k.focusVisible, c)
    },
    getSlotProps: (F) => ({
      ...F,
      onClick: (P) => {
        var g;
        (g = F.onClick) == null || g.call(F, P), E(P);
      }
    })
  }), [N, M] = ye("content", {
    className: k.content,
    elementType: f0,
    externalForwardedProps: O,
    ownerState: _
  }), [D, B] = ye("expandIconWrapper", {
    className: k.expandIconWrapper,
    elementType: m0,
    externalForwardedProps: O,
    ownerState: _
  });
  return /* @__PURE__ */ C(w, {
    ...T,
    children: [/* @__PURE__ */ a(N, {
      ...M,
      children: i
    }), l && /* @__PURE__ */ a(D, {
      ...B,
      children: l
    })]
  });
});
process.env.NODE_ENV !== "production" && (af.propTypes = {
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
function h0(e) {
  return typeof e.main == "string";
}
function g0(e, t = []) {
  if (!h0(e))
    return !1;
  for (const n of t)
    if (!e.hasOwnProperty(n) || typeof e[n] != "string")
      return !1;
  return !0;
}
function Ft(e = []) {
  return ([, t]) => t && g0(t, e);
}
function b0(e) {
  return Ce("MuiAlert", e);
}
const Ld = Te("MuiAlert", ["root", "action", "icon", "message", "filled", "colorSuccess", "colorInfo", "colorWarning", "colorError", "outlined", "standard"]);
function y0(e) {
  return Ce("MuiCircularProgress", e);
}
Te("MuiCircularProgress", ["root", "determinate", "indeterminate", "colorPrimary", "colorSecondary", "svg", "track", "circle", "circleDisableShrink"]);
const _o = 44, Ya = mi`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`, Xa = mi`
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
`, v0 = typeof Ya != "string" ? hl`
        animation: ${Ya} 1.4s linear infinite;
      ` : null, x0 = typeof Xa != "string" ? hl`
        animation: ${Xa} 1.4s ease-in-out infinite;
      ` : null, C0 = (e) => {
  const {
    classes: t,
    variant: n,
    color: r,
    disableShrink: i
  } = e, s = {
    root: ["root", n, `color${xe(r)}`],
    svg: ["svg"],
    track: ["track"],
    circle: ["circle", i && "circleDisableShrink"]
  };
  return we(s, y0, t);
}, S0 = oe("span", {
  name: "MuiCircularProgress",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, t[n.variant], t[`color${xe(n.color)}`]];
  }
})($e(({
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
    style: v0 || {
      animation: `${Ya} 1.4s linear infinite`
    }
  }, ...Object.entries(e.palette).filter(Ft()).map(([t]) => ({
    props: {
      color: t
    },
    style: {
      color: (e.vars || e).palette[t].main
    }
  }))]
}))), T0 = oe("svg", {
  name: "MuiCircularProgress",
  slot: "Svg"
})({
  display: "block"
  // Keeps the progress centered
}), w0 = oe("circle", {
  name: "MuiCircularProgress",
  slot: "Circle",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.circle, n.disableShrink && t.circleDisableShrink];
  }
})($e(({
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
    style: x0 || {
      // At runtime for Pigment CSS, `dashAnimation` will be null and the generated keyframe will be used.
      animation: `${Xa} 1.4s ease-in-out infinite`
    }
  }]
}))), E0 = oe("circle", {
  name: "MuiCircularProgress",
  slot: "Track"
})($e(({
  theme: e
}) => ({
  stroke: "currentColor",
  opacity: (e.vars || e).palette.action.activatedOpacity
}))), Qn = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiCircularProgress"
  }), {
    className: i,
    color: s = "primary",
    disableShrink: l = !1,
    enableTrackSlot: c = !1,
    min: u,
    max: f,
    size: m = 40,
    style: y,
    thickness: x = 3.6,
    value: p = r.min ?? 0,
    variant: v = "indeterminate",
    ...h
  } = r;
  process.env.NODE_ENV !== "production" && v === "indeterminate" && (u !== void 0 || f !== void 0) && console.warn("MUI: You have provided the `min` or `max` props with an 'indeterminate' variant. These props will have no effect.");
  const E = u ?? 0, _ = f ?? 100, k = {
    ...r,
    color: s,
    disableShrink: l,
    size: m,
    thickness: x,
    value: p,
    variant: v,
    enableTrackSlot: c
  }, O = C0(k), w = {}, T = {}, N = {};
  if (v === "determinate") {
    const M = 2 * Math.PI * ((_o - x) / 2);
    process.env.NODE_ENV !== "production" && (p < E || p > _ || E >= _) && console.error(`MUI: The min, max, and value props in CircularProgress should be numbers where min < max and min <= value <= max. Received min=${E}, max=${_}, value=${p}.`);
    const D = _ - E;
    w.strokeDasharray = M.toFixed(3), w.strokeDashoffset = D > 0 ? `${((_ - p) / D * M).toFixed(3)}px` : `${M.toFixed(3)}px`, T.transform = "rotate(-90deg)", N["aria-valuenow"] = p, N["aria-valuemin"] = E, N["aria-valuemax"] = _;
  }
  return /* @__PURE__ */ a(S0, {
    className: pe(O.root, i),
    style: {
      width: m,
      height: m,
      ...T,
      ...y
    },
    ownerState: k,
    ref: n,
    role: "progressbar",
    ...N,
    ...h,
    children: /* @__PURE__ */ C(T0, {
      className: O.svg,
      ownerState: k,
      viewBox: `${_o / 2} ${_o / 2} ${_o} ${_o}`,
      children: [c ? /* @__PURE__ */ a(E0, {
        className: O.track,
        ownerState: k,
        cx: _o,
        cy: _o,
        r: (_o - x) / 2,
        fill: "none",
        strokeWidth: x,
        "aria-hidden": "true"
      }) : null, /* @__PURE__ */ a(w0, {
        className: O.circle,
        style: w,
        ownerState: k,
        cx: _o,
        cy: _o,
        r: (_o - x) / 2,
        fill: "none",
        strokeWidth: x
      })]
    })
  });
});
process.env.NODE_ENV !== "production" && (Qn.propTypes = {
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
  disableShrink: qo(o.bool, (e) => e.disableShrink && e.variant && e.variant !== "indeterminate" ? new Error("MUI: You have provided the `disableShrink` prop with a variant other than `indeterminate`. This will have no effect.") : null),
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
function O0(e) {
  return Ce("MuiIconButton", e);
}
const Fd = Te("MuiIconButton", ["root", "disabled", "colorInherit", "colorPrimary", "colorSecondary", "colorError", "colorInfo", "colorSuccess", "colorWarning", "edgeStart", "edgeEnd", "sizeSmall", "sizeMedium", "sizeLarge", "loading", "loadingIndicator", "loadingWrapper"]), R0 = (e) => {
  const {
    classes: t,
    disabled: n,
    color: r,
    edge: i,
    size: s,
    loading: l
  } = e, c = {
    root: ["root", l && "loading", n && "disabled", r !== "default" && `color${xe(r)}`, i && `edge${xe(i)}`, `size${xe(s)}`],
    loadingIndicator: ["loadingIndicator"],
    loadingWrapper: ["loadingWrapper"]
  };
  return we(c, O0, t);
}, _0 = oe(Io, {
  name: "MuiIconButton",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.loading && t.loading, n.color !== "default" && t[`color${xe(n.color)}`], n.edge && t[`edge${xe(n.edge)}`], t[`size${xe(n.size)}`]];
  }
})($e(({
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
})), $e(({
  theme: e
}) => ({
  variants: [{
    props: {
      color: "inherit"
    },
    style: {
      color: "inherit"
    }
  }, ...Object.entries(e.palette).filter(Ft()).map(([t]) => ({
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
  [`&.${Fd.disabled}`]: {
    backgroundColor: "transparent",
    color: (e.vars || e).palette.action.disabled
  },
  [`&.${Fd.loading}`]: {
    color: "transparent"
  }
}))), N0 = oe("span", {
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
})), io = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiIconButton"
  }), {
    edge: i = !1,
    children: s,
    className: l,
    color: c = "default",
    disabled: u = !1,
    disableFocusRipple: f = !1,
    size: m = "medium",
    id: y,
    loading: x = null,
    loadingIndicator: p,
    ...v
  } = r, h = rn(y), E = p ?? /* @__PURE__ */ a(Qn, {
    "aria-labelledby": h,
    color: "inherit",
    size: 16
  }), _ = {
    ...r,
    edge: i,
    color: c,
    disabled: u,
    disableFocusRipple: f,
    loading: x,
    loadingIndicator: E,
    size: m
  }, k = R0(_);
  return /* @__PURE__ */ C(_0, {
    id: x ? h : y,
    className: pe(k.root, l),
    centerRipple: !0,
    internalNativeButton: !0,
    focusRipple: !f,
    disabled: u || x,
    ref: n,
    ...v,
    ownerState: _,
    children: [typeof x == "boolean" && // use plain HTML span to minimize the runtime overhead
    /* @__PURE__ */ a("span", {
      className: k.loadingWrapper,
      style: {
        display: "contents"
      },
      children: /* @__PURE__ */ a(N0, {
        className: k.loadingIndicator,
        ownerState: _,
        children: x && E
      })
    }), s]
  });
});
process.env.NODE_ENV !== "production" && (io.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The icon to display.
   */
  children: qo(o.node, (e) => b.Children.toArray(e.children).some((n) => /* @__PURE__ */ b.isValidElement(n) && n.props.onClick) ? new Error(["MUI: You are providing an onClick event listener to a child of a button element.", "Prefer applying it to the IconButton directly.", "This guarantees that the whole <button> will be responsive to click events."].join(`
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
const k0 = at(/* @__PURE__ */ a("path", {
  d: "M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"
}), "SuccessOutlined"), P0 = at(/* @__PURE__ */ a("path", {
  d: "M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"
}), "ReportProblemOutlined"), I0 = at(/* @__PURE__ */ a("path", {
  d: "M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
}), "ErrorOutline"), $0 = at(/* @__PURE__ */ a("path", {
  d: "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"
}), "InfoOutlined"), M0 = at(/* @__PURE__ */ a("path", {
  d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
}), "Close"), A0 = (e) => {
  const {
    variant: t,
    color: n,
    severity: r,
    classes: i
  } = e, s = {
    root: ["root", `color${xe(n || r)}`, `${t}`],
    icon: ["icon"],
    message: ["message"],
    action: ["action"]
  };
  return we(s, b0, i);
}, D0 = oe(yt, {
  name: "MuiAlert",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, t[n.variant]];
  }
})($e(({
  theme: e
}) => {
  const t = e.palette.mode === "light" ? e.darken : e.lighten, n = e.palette.mode === "light" ? e.lighten : e.darken;
  return {
    ...e.typography.body2,
    backgroundColor: "transparent",
    display: "flex",
    padding: "6px 16px",
    variants: [...Object.entries(e.palette).filter(Ft(["light"])).map(([r]) => ({
      props: {
        colorSeverity: r,
        variant: "standard"
      },
      style: {
        color: e.vars ? e.vars.palette.Alert[`${r}Color`] : t(e.palette[r].light, 0.6),
        backgroundColor: e.vars ? e.vars.palette.Alert[`${r}StandardBg`] : n(e.palette[r].light, 0.9),
        [`& .${Ld.icon}`]: e.vars ? {
          color: e.vars.palette.Alert[`${r}IconColor`]
        } : {
          color: e.palette[r].main
        }
      }
    })), ...Object.entries(e.palette).filter(Ft(["light"])).map(([r]) => ({
      props: {
        colorSeverity: r,
        variant: "outlined"
      },
      style: {
        color: e.vars ? e.vars.palette.Alert[`${r}Color`] : t(e.palette[r].light, 0.6),
        border: `1px solid ${(e.vars || e).palette[r].light}`,
        [`& .${Ld.icon}`]: e.vars ? {
          color: e.vars.palette.Alert[`${r}IconColor`]
        } : {
          color: e.palette[r].main
        }
      }
    })), ...Object.entries(e.palette).filter(Ft(["dark"])).map(([r]) => ({
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
})), B0 = oe("div", {
  name: "MuiAlert",
  slot: "Icon"
})({
  marginRight: 12,
  padding: "7px 0",
  display: "flex",
  fontSize: 22,
  opacity: 0.9
}), L0 = oe("div", {
  name: "MuiAlert",
  slot: "Message"
})({
  padding: "8px 0",
  minWidth: 0,
  overflow: "auto"
}), F0 = oe("div", {
  name: "MuiAlert",
  slot: "Action"
})({
  display: "flex",
  alignItems: "flex-start",
  padding: "4px 0 0 16px",
  marginLeft: "auto",
  marginRight: -8
}), jd = {
  success: /* @__PURE__ */ a(k0, {
    fontSize: "inherit"
  }),
  warning: /* @__PURE__ */ a(P0, {
    fontSize: "inherit"
  }),
  error: /* @__PURE__ */ a(I0, {
    fontSize: "inherit"
  }),
  info: /* @__PURE__ */ a($0, {
    fontSize: "inherit"
  })
}, Ja = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiAlert"
  }), {
    action: i,
    children: s,
    className: l,
    closeText: c = "Close",
    color: u,
    icon: f,
    iconMapping: m = jd,
    onClose: y,
    role: x = "alert",
    severity: p = "success",
    slotProps: v = {},
    slots: h = {},
    variant: E = "standard",
    ..._
  } = r, k = {
    ...r,
    color: u,
    severity: p,
    variant: E,
    colorSeverity: u || p
  }, O = A0(k), w = {
    slots: h,
    slotProps: v
  }, [T, N] = ye("root", {
    ref: n,
    shouldForwardComponentProp: !0,
    className: pe(O.root, l),
    elementType: D0,
    externalForwardedProps: {
      ...w,
      ..._
    },
    ownerState: k,
    additionalProps: {
      role: x,
      elevation: 0
    }
  }), [M, D] = ye("icon", {
    className: O.icon,
    elementType: B0,
    externalForwardedProps: w,
    ownerState: k
  }), [B, F] = ye("message", {
    className: O.message,
    elementType: L0,
    externalForwardedProps: w,
    ownerState: k
  }), [P, g] = ye("action", {
    className: O.action,
    elementType: F0,
    externalForwardedProps: w,
    ownerState: k
  }), [$, I] = ye("closeButton", {
    elementType: io,
    externalForwardedProps: w,
    ownerState: k
  }), [A, L] = ye("closeIcon", {
    elementType: M0,
    externalForwardedProps: w,
    ownerState: k
  });
  return /* @__PURE__ */ C(T, {
    ...N,
    children: [f !== !1 ? /* @__PURE__ */ a(M, {
      ...D,
      children: f || m[p] || jd[p]
    }) : null, /* @__PURE__ */ a(B, {
      ...F,
      children: s
    }), i != null ? /* @__PURE__ */ a(P, {
      ...g,
      children: i
    }) : null, i == null && y ? /* @__PURE__ */ a(P, {
      ...g,
      children: /* @__PURE__ */ a($, {
        size: "small",
        "aria-label": c,
        title: c,
        color: "inherit",
        onClick: y,
        ...I,
        children: /* @__PURE__ */ a(A, {
          fontSize: "small",
          ...L
        })
      })
    }) : null]
  });
});
process.env.NODE_ENV !== "production" && (Ja.propTypes = {
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
function j0(e) {
  return Ce("MuiButton", e);
}
const Cn = Te("MuiButton", ["root", "text", "outlined", "contained", "disableElevation", "focusVisible", "disabled", "colorInherit", "colorPrimary", "colorSecondary", "colorSuccess", "colorError", "colorInfo", "colorWarning", "sizeMedium", "sizeSmall", "sizeLarge", "fullWidth", "startIcon", "endIcon", "icon", "loading", "loadingWrapper", "loadingIconPlaceholder", "loadingIndicator", "loadingPositionCenter", "loadingPositionStart", "loadingPositionEnd"]), lf = /* @__PURE__ */ b.createContext({});
process.env.NODE_ENV !== "production" && (lf.displayName = "ButtonGroupContext");
const cf = /* @__PURE__ */ b.createContext(void 0);
process.env.NODE_ENV !== "production" && (cf.displayName = "ButtonGroupButtonContext");
const W0 = (e) => {
  const {
    color: t,
    disableElevation: n,
    fullWidth: r,
    size: i,
    variant: s,
    loading: l,
    loadingPosition: c,
    classes: u
  } = e, f = {
    root: ["root", l && "loading", s, `size${xe(i)}`, `color${xe(t)}`, n && "disableElevation", r && "fullWidth", l && `loadingPosition${xe(c)}`],
    startIcon: ["icon", "startIcon"],
    endIcon: ["icon", "endIcon"],
    loadingIndicator: ["loadingIndicator"],
    loadingWrapper: ["loadingWrapper"]
  }, m = we(f, j0, u);
  return {
    ...u,
    // forward the focused, disabled, etc. classes to the ButtonBase
    ...m
  };
}, df = [{
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
}], z0 = oe(Io, {
  shouldForwardProp: (e) => Gt(e) || e === "classes",
  name: "MuiButton",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, t[n.variant], t[`size${xe(n.size)}`], n.color === "inherit" && t.colorInherit, n.disableElevation && t.disableElevation, n.fullWidth && t.fullWidth, n.loading && t.loading];
  }
})($e(({
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
    [`&.${Cn.disabled}`]: {
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
        [`&.${Cn.focusVisible}`]: {
          boxShadow: (e.vars || e).shadows[6]
        },
        [`&.${Cn.disabled}`]: {
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
        [`&.${Cn.disabled}`]: {
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
    }, ...Object.entries(e.palette).filter(Ft()).map(([r]) => ({
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
        [`&.${Cn.focusVisible}`]: {
          boxShadow: "none"
        },
        "&:active": {
          boxShadow: "none"
        },
        [`&.${Cn.disabled}`]: {
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
        [`&.${Cn.loading}`]: {
          color: "transparent"
        }
      }
    }]
  };
})), V0 = oe("span", {
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
  }, ...df]
})), U0 = oe("span", {
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
  }, ...df]
})), G0 = oe("span", {
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
})), Wd = oe("span", {
  name: "MuiButton",
  slot: "LoadingIconPlaceholder"
})({
  display: "inline-block",
  width: "1em",
  height: "1em"
}), be = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = b.useContext(lf), i = b.useContext(cf), s = ti(r, t), l = Oe({
    props: s,
    name: "MuiButton"
  }), {
    children: c,
    color: u = "primary",
    component: f = "button",
    className: m,
    disabled: y = !1,
    disableElevation: x = !1,
    disableFocusRipple: p = !1,
    endIcon: v,
    focusVisibleClassName: h,
    fullWidth: E = !1,
    id: _,
    loading: k = null,
    loadingIndicator: O,
    loadingPosition: w = "center",
    size: T = "medium",
    startIcon: N,
    type: M,
    variant: D = "text",
    ...B
  } = l, F = rn(_), P = O ?? /* @__PURE__ */ a(Qn, {
    "aria-labelledby": F,
    color: "inherit",
    size: 16
  }), g = {
    ...l,
    color: u,
    component: f,
    disabled: y,
    disableElevation: x,
    disableFocusRipple: p,
    fullWidth: E,
    loading: k,
    loadingIndicator: P,
    loadingPosition: w,
    size: T,
    type: M,
    variant: D
  }, $ = W0(g), I = (N || k && w === "start") && /* @__PURE__ */ a(V0, {
    className: $.startIcon,
    ownerState: g,
    children: N || /* @__PURE__ */ a(Wd, {
      className: $.loadingIconPlaceholder,
      ownerState: g
    })
  }), A = (v || k && w === "end") && /* @__PURE__ */ a(U0, {
    className: $.endIcon,
    ownerState: g,
    children: v || /* @__PURE__ */ a(Wd, {
      className: $.loadingIconPlaceholder,
      ownerState: g
    })
  }), L = i || "", W = typeof k == "boolean" ? (
    // use plain HTML span to minimize the runtime overhead
    /* @__PURE__ */ a("span", {
      className: $.loadingWrapper,
      style: {
        display: "contents"
      },
      children: k && /* @__PURE__ */ a(G0, {
        className: $.loadingIndicator,
        ownerState: g,
        children: P
      })
    })
  ) : null, {
    root: q,
    ...ie
  } = $;
  return /* @__PURE__ */ C(z0, {
    ownerState: g,
    className: pe(r.className, $.root, m, L),
    component: f,
    disabled: y || k,
    focusRipple: !p,
    focusVisibleClassName: pe($.focusVisible, h),
    ref: n,
    internalNativeButton: !0,
    type: M,
    id: k ? F : _,
    ...B,
    classes: ie,
    children: [I, w !== "end" && W, c, w === "end" && W, A]
  });
});
process.env.NODE_ENV !== "production" && (be.propTypes = {
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
const bi = /* @__PURE__ */ b.createContext(void 0);
process.env.NODE_ENV !== "production" && (bi.displayName = "FormControlContext");
function H0() {
  return b.useContext(bi);
}
function fr({
  props: e,
  states: t
}) {
  const n = b.useContext(bi), r = {};
  return t.forEach((i) => {
    const s = e[i];
    r[i] = s === void 0 && n ? n[i] : s;
  }), [r, n];
}
function q0(e) {
  return Ce("PrivateSwitchBase", e);
}
Te("PrivateSwitchBase", ["root", "checked", "disabled", "input", "edgeStart", "edgeEnd"]);
const K0 = (e) => {
  const {
    classes: t,
    checked: n,
    disabled: r,
    edge: i
  } = e, s = {
    root: ["root", n && "checked", r && "disabled", i && `edge${xe(i)}`],
    input: ["input"]
  };
  return we(s, q0, t);
}, Y0 = oe(Io, {
  name: "MuiSwitchBase"
})({
  padding: 9,
  borderRadius: "50%",
  variants: [{
    props: {
      edge: "start",
      size: "small"
    },
    style: {
      marginLeft: -3
    }
  }, {
    props: ({
      edge: e,
      ownerState: t
    }) => e === "start" && t.size !== "small",
    style: {
      marginLeft: -12
    }
  }, {
    props: {
      edge: "end",
      size: "small"
    },
    style: {
      marginRight: -3
    }
  }, {
    props: ({
      edge: e,
      ownerState: t
    }) => e === "end" && t.size !== "small",
    style: {
      marginRight: -12
    }
  }]
}), X0 = oe("input", {
  name: "MuiSwitchBase",
  shouldForwardProp: Gt
})({
  cursor: "inherit",
  position: "absolute",
  opacity: 0,
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  margin: 0,
  padding: 0,
  zIndex: 1
}), uf = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const {
    autoFocus: r,
    checked: i,
    checkedIcon: s,
    defaultChecked: l,
    disabled: c,
    disableFocusRipple: u = !1,
    edge: f = !1,
    icon: m,
    id: y,
    name: x,
    onBlur: p,
    onChange: v,
    onFocus: h,
    readOnly: E,
    required: _ = !1,
    tabIndex: k,
    type: O,
    value: w,
    slots: T = {},
    slotProps: N = {},
    ...M
  } = t, {
    nativeButton: D,
    ...B
  } = M, [F, P] = ri({
    controlled: i,
    default: !!l,
    name: "SwitchBase",
    state: "checked"
  }), g = H0(), $ = (G) => {
    h && h(G), g && g.onFocus && g.onFocus(G);
  }, I = (G) => {
    p && p(G), g && g.onBlur && g.onBlur(G);
  }, A = (G) => {
    if (G.nativeEvent.defaultPrevented || E)
      return;
    const K = G.target.checked;
    P(K), v && v(G, K);
  };
  let L = c;
  g && typeof L > "u" && (L = g.disabled);
  const W = O === "checkbox" || O === "radio", q = {
    ...t,
    checked: F,
    disabled: L,
    disableFocusRipple: u,
    edge: f
  }, ie = K0(q), z = {
    slots: T,
    slotProps: N
  }, [V, Q] = ye("root", {
    ref: n,
    elementType: Y0,
    className: ie.root,
    shouldForwardComponentProp: !0,
    externalForwardedProps: {
      ...z,
      component: "span",
      ...B
    },
    getSlotProps: (G) => ({
      ...G,
      onFocus: (K) => {
        var Y;
        (Y = G.onFocus) == null || Y.call(G, K), $(K);
      },
      onBlur: (K) => {
        var Y;
        (Y = G.onBlur) == null || Y.call(G, K), I(K);
      }
    }),
    ownerState: q,
    additionalProps: {
      centerRipple: !0,
      focusRipple: !u,
      role: void 0,
      tabIndex: null
    }
  }), [re, ee] = ye("input", {
    elementType: X0,
    className: ie.input,
    externalForwardedProps: z,
    getSlotProps: (G) => ({
      ...G,
      onChange: (K) => {
        var Y;
        (Y = G.onChange) == null || Y.call(G, K), A(K);
      }
    }),
    ownerState: q,
    additionalProps: {
      autoFocus: r,
      checked: i,
      defaultChecked: l,
      disabled: L,
      id: W ? y : void 0,
      name: x,
      readOnly: E,
      required: _,
      tabIndex: k,
      type: O,
      ...O === "checkbox" && w === void 0 ? {} : {
        value: w
      }
    }
  });
  return /* @__PURE__ */ C(V, {
    ...Q,
    children: [/* @__PURE__ */ a(re, {
      ...ee
    }), F ? s : m]
  });
});
process.env.NODE_ENV !== "production" && (uf.propTypes = {
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: o.bool,
  /**
   * If `true`, the component is checked.
   */
  checked: o.bool,
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: o.node.isRequired,
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
  defaultChecked: o.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: o.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: o.bool,
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge: o.oneOf(["end", "start", !1]),
  /**
   * The icon to display when the component is unchecked.
   */
  icon: o.node.isRequired,
  /**
   * The id of the `input` element.
   */
  id: o.string,
  /*
   * @ignore
   */
  name: o.string,
  /**
   * @ignore
   */
  onBlur: o.func,
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: o.func,
  /**
   * @ignore
   */
  onFocus: o.func,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: o.bool,
  /**
   * If `true`, the `input` element is required.
   */
  required: o.bool,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: o.shape({
    input: o.oneOfType([o.func, o.object]),
    root: o.oneOfType([o.func, o.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: o.shape({
    input: o.elementType,
    root: o.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.object,
  /**
   * @ignore
   */
  tabIndex: o.oneOfType([o.number, o.string]),
  /**
   * The input component prop `type`.
   */
  type: o.string.isRequired,
  /**
   * The value of the component.
   */
  value: o.any
});
const J0 = at(/* @__PURE__ */ a("path", {
  d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
}), "CheckBoxOutlineBlank"), Q0 = at(/* @__PURE__ */ a("path", {
  d: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
}), "CheckBox"), Z0 = at(/* @__PURE__ */ a("path", {
  d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"
}), "IndeterminateCheckBox");
function ex(e) {
  return Ce("MuiCheckbox", e);
}
const wa = Te("MuiCheckbox", ["root", "checked", "disabled", "indeterminate", "colorPrimary", "colorSecondary", "sizeSmall", "sizeMedium"]), tx = (e) => {
  const {
    classes: t,
    indeterminate: n,
    color: r,
    size: i
  } = e, s = {
    root: ["root", n && "indeterminate", `color${xe(r)}`, `size${xe(i)}`]
  }, l = we(s, ex, t);
  return {
    ...t,
    // forward the disabled and checked classes to the SwitchBase
    ...l
  };
}, ox = oe(uf, {
  shouldForwardProp: (e) => Gt(e) || e === "classes",
  name: "MuiCheckbox",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.indeterminate && t.indeterminate, t[`size${xe(n.size)}`], n.color !== "default" && t[`color${xe(n.color)}`]];
  }
})($e(({
  theme: e
}) => ({
  color: (e.vars || e).palette.text.secondary,
  variants: [{
    props: {
      color: "default",
      disableRipple: !1
    },
    style: {
      "&:hover": {
        backgroundColor: e.alpha((e.vars || e).palette.action.active, (e.vars || e).palette.action.hoverOpacity)
      }
    }
  }, ...Object.entries(e.palette).filter(Ft()).map(([t]) => ({
    props: {
      color: t,
      disableRipple: !1
    },
    style: {
      "&:hover": {
        backgroundColor: e.alpha((e.vars || e).palette[t].main, (e.vars || e).palette.action.hoverOpacity)
      }
    }
  })), ...Object.entries(e.palette).filter(Ft()).map(([t]) => ({
    props: {
      color: t
    },
    style: {
      [`&.${wa.checked}, &.${wa.indeterminate}`]: {
        color: (e.vars || e).palette[t].main
      },
      [`&.${wa.disabled}`]: {
        color: (e.vars || e).palette.action.disabled
      }
    }
  })), {
    // Should be last to override other colors
    props: {
      disableRipple: !1
    },
    style: {
      // Reset on touch devices, it doesn't add specificity
      "&:hover": {
        "@media (hover: none)": {
          backgroundColor: "transparent"
        }
      }
    }
  }]
}))), nx = /* @__PURE__ */ a(Q0, {}), rx = /* @__PURE__ */ a(J0, {}), ix = /* @__PURE__ */ a(Z0, {}), pf = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiCheckbox"
  }), {
    checkedIcon: i = nx,
    color: s = "primary",
    icon: l = rx,
    indeterminate: c = !1,
    indeterminateIcon: u = ix,
    size: f = "medium",
    disableRipple: m = !1,
    className: y,
    slots: x = {},
    slotProps: p = {},
    ...v
  } = r, h = c ? u : l, E = c ? u : i, _ = {
    ...r,
    disableRipple: m,
    color: s,
    indeterminate: c,
    size: f
  }, k = tx(_), O = p.input, [w, T] = ye("root", {
    ref: n,
    elementType: ox,
    className: pe(k.root, y),
    shouldForwardComponentProp: !0,
    externalForwardedProps: {
      slots: x,
      slotProps: p,
      ...v
    },
    ownerState: _,
    additionalProps: {
      type: "checkbox",
      icon: /* @__PURE__ */ b.cloneElement(h, {
        fontSize: h.props.fontSize ?? f
      }),
      checkedIcon: /* @__PURE__ */ b.cloneElement(E, {
        fontSize: E.props.fontSize ?? f
      }),
      disableRipple: m,
      slots: x,
      slotProps: {
        input: Kp(typeof O == "function" ? O(_) : O, {
          "data-indeterminate": c,
          "aria-checked": c ? "mixed" : void 0
        })
      }
    }
  });
  return /* @__PURE__ */ a(w, {
    ...T,
    classes: k
  });
});
process.env.NODE_ENV !== "production" && (pf.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the component is checked.
   */
  checked: o.bool,
  /**
   * The icon to display when the component is checked.
   * @default <CheckBoxIcon />
   */
  checkedIcon: o.node,
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
  color: o.oneOfType([o.oneOf(["default", "primary", "secondary", "error", "info", "success", "warning"]), o.string]),
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked: o.bool,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: o.bool,
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple: o.bool,
  /**
   * The icon to display when the component is unchecked.
   * @default <CheckBoxOutlineBlankIcon />
   */
  icon: o.node,
  /**
   * The id of the `input` element.
   */
  id: o.string,
  /**
   * If `true`, the component appears indeterminate.
   * This does not set the native input element to indeterminate due
   * to inconsistent behavior across browsers.
   * However, we set a `data-indeterminate` attribute on the `input`.
   * @default false
   */
  indeterminate: o.bool,
  /**
   * The icon to display when the component is indeterminate.
   * @default <IndeterminateCheckBoxIcon />
   */
  indeterminateIcon: o.node,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: o.func,
  /**
   * If `true`, the `input` element is required.
   * @default false
   */
  required: o.bool,
  /**
   * The size of the component.
   * `small` is equivalent to the dense checkbox styling.
   * @default 'medium'
   */
  size: o.oneOfType([o.oneOf(["medium", "small"]), o.string]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: o.shape({
    input: o.oneOfType([o.func, o.object]),
    root: o.oneOfType([o.func, o.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: o.shape({
    input: o.elementType,
    root: o.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object]),
  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value: o.any
});
function ff(e = window) {
  const t = e.document.documentElement.clientWidth;
  return e.innerWidth - t;
}
function sx(e) {
  const t = $t(e);
  return t.body === e ? Po(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function Ur(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function zd(e) {
  return parseFloat(Po(e).getComputedStyle(e).paddingRight) || 0;
}
function ax(e) {
  const n = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].includes(e.tagName), r = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return n || r;
}
function Vd(e, t, n, r, i) {
  const s = [t, n, ...r];
  [].forEach.call(e.children, (l) => {
    const c = !s.includes(l), u = !ax(l);
    c && u && Ur(l, i);
  });
}
function Ea(e, t) {
  let n = -1;
  return e.some((r, i) => t(r) ? (n = i, !0) : !1), n;
}
function lx(e, t) {
  const n = [], r = e.container;
  if (!t.disableScrollLock) {
    if (sx(r)) {
      const l = ff(Po(r));
      n.push({
        value: r.style.paddingRight,
        property: "padding-right",
        el: r
      }), r.style.paddingRight = `${zd(r) + l}px`;
      const c = $t(r).querySelectorAll(".mui-fixed");
      [].forEach.call(c, (u) => {
        n.push({
          value: u.style.paddingRight,
          property: "padding-right",
          el: u
        }), u.style.paddingRight = `${zd(u) + l}px`;
      });
    }
    let s;
    if (r.parentNode instanceof DocumentFragment)
      s = $t(r).body;
    else {
      const l = r.parentElement, c = Po(r);
      s = (l == null ? void 0 : l.nodeName) === "HTML" && c.getComputedStyle(l).overflowY === "scroll" ? l : r;
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
      el: l,
      property: c
    }) => {
      s ? l.style.setProperty(c, s) : l.style.removeProperty(c);
    });
  };
}
function cx(e) {
  const t = [];
  return [].forEach.call(e.children, (n) => {
    n.getAttribute("aria-hidden") === "true" && t.push(n);
  }), t;
}
class dx {
  constructor() {
    this.modals = [], this.containers = [];
  }
  add(t, n) {
    let r = this.modals.indexOf(t);
    if (r !== -1)
      return r;
    r = this.modals.length, this.modals.push(t), t.modalRef && Ur(t.modalRef, !1);
    const i = cx(n);
    Vd(n, t.mount, t.modalRef, i, !0);
    const s = Ea(this.containers, (l) => l.container === n);
    return s !== -1 ? (this.containers[s].modals.push(t), r) : (this.containers.push({
      modals: [t],
      container: n,
      restore: null,
      hiddenSiblings: i
    }), r);
  }
  mount(t, n) {
    const r = Ea(this.containers, (s) => s.modals.includes(t)), i = this.containers[r];
    i.restore || (i.restore = lx(i, n));
  }
  remove(t, n = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1)
      return r;
    const i = Ea(this.containers, (l) => l.modals.includes(t)), s = this.containers[i];
    if (s.modals.splice(s.modals.indexOf(t), 1), this.modals.splice(r, 1), s.modals.length === 0)
      s.restore && s.restore(), t.modalRef && Ur(t.modalRef, n), Vd(s.container, t.mount, t.modalRef, s.hiddenSiblings, !1), this.containers.splice(i, 1);
    else {
      const l = s.modals[s.modals.length - 1];
      l.modalRef && Ur(l.modalRef, !1);
    }
    return r;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function sn(e, t, n, r, i) {
  if (process.env.NODE_ENV === "production")
    return null;
  const s = e[t], l = i || t;
  return s == null ? null : s && s.nodeType !== 1 ? new Error(`Invalid ${r} \`${l}\` supplied to \`${n}\`. Expected an HTMLElement.`) : null;
}
function ux(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function mf(e, t, n, r, i) {
  const s = e[t], l = i || t;
  if (s == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let c;
  const u = s.type;
  return typeof u == "function" && !ux(u) && (c = "Did you accidentally use a plain function component for an element instead?"), c !== void 0 ? new Error(`Invalid ${r} \`${l}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const mr = qo(o.element, mf);
mr.isRequired = qo(o.element.isRequired, mf);
function hr(e) {
  var t;
  return parseInt(b.version, 10) >= 19 ? ((t = e == null ? void 0 : e.props) == null ? void 0 : t.ref) || null : (e == null ? void 0 : e.ref) || null;
}
function ys(e, t) {
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
const Qa = "data-mui-focusable";
function px(e) {
  return e ? e.hasAttribute(Qa) ? e : e.querySelector(`[${Qa}]`) : null;
}
const fx = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function mx(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function hx(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let n = t(`[name="${e.name}"]:checked`);
  return n || (n = t(`[name="${e.name}"]`)), n !== e;
}
function gx(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || hx(e));
}
function bx(e) {
  const t = [], n = [];
  return Array.from(e.querySelectorAll(fx)).forEach((r, i) => {
    const s = mx(r);
    s === -1 || !gx(r) || (s === 0 ? t.push(r) : n.push({
      documentOrder: i,
      tabIndex: s,
      node: r
    }));
  }), n.sort((r, i) => r.tabIndex === i.tabIndex ? r.documentOrder - i.documentOrder : r.tabIndex - i.tabIndex).map((r) => r.node).concat(t);
}
function yx() {
  return !0;
}
function vs(e) {
  const {
    children: t,
    disableAutoFocus: n = !1,
    disableEnforceFocus: r = !1,
    disableRestoreFocus: i = !1,
    getTabbable: s = bx,
    isEnabled: l = yx,
    open: c
  } = e, u = b.useRef(!1), f = b.useRef(null), m = b.useRef(null), y = b.useRef(null), x = b.useRef(null), p = b.useRef(!1), v = b.useRef(null), h = Ct(hr(t), v), E = b.useRef(null);
  b.useEffect(() => {
    !c || !v.current || (p.current = !n);
  }, [n, c]), b.useEffect(() => {
    if (u.current = !1, !c || !v.current)
      return;
    const O = $t(v.current), w = zo(O), T = px(v.current) ?? v.current;
    return ys(v.current, w) || (T.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), T.setAttribute("tabIndex", "-1")), p.current && T.focus()), () => {
      !i && y.current && (u.current = !0, y.current.focus(), y.current = null);
    };
  }, [c]), b.useEffect(() => {
    if (!c || !v.current)
      return;
    const O = $t(v.current), w = (M) => {
      if (E.current = M, r || !l() || M.key !== "Tab")
        return;
      zo(O) === v.current && M.shiftKey && (u.current = !0, m.current && m.current.focus());
    }, T = () => {
      var F, P;
      const M = v.current;
      if (M === null)
        return;
      const D = zo(O);
      if (!O.hasFocus() || !l() || u.current) {
        u.current = !1;
        return;
      }
      if (ys(M, D) || r && D !== f.current && D !== m.current)
        return;
      if (D !== x.current)
        x.current = null;
      else if (x.current !== null)
        return;
      if (!p.current)
        return;
      let B = [];
      if ((D === f.current || D === m.current) && (B = s(v.current)), B.length > 0) {
        const g = !!((F = E.current) != null && F.shiftKey && ((P = E.current) == null ? void 0 : P.key) === "Tab"), $ = B[0], I = B[B.length - 1];
        typeof $ != "string" && typeof I != "string" && (g ? I.focus() : $.focus());
      } else
        M.focus();
    };
    O.addEventListener("focusin", T), O.addEventListener("keydown", w, !0);
    const N = setInterval(() => {
      const M = zo(O);
      M && M.tagName === "BODY" && T();
    }, 50);
    return () => {
      clearInterval(N), O.removeEventListener("focusin", T), O.removeEventListener("keydown", w, !0);
    };
  }, [n, r, i, l, c, s]);
  const _ = (O) => {
    y.current === null && (y.current = O.relatedTarget), p.current = !0, x.current = O.target;
    const w = t.props.onFocus;
    w && w(O);
  }, k = (O) => {
    y.current === null && (y.current = O.relatedTarget), p.current = !0;
  };
  return /* @__PURE__ */ C(b.Fragment, {
    children: [/* @__PURE__ */ a("div", {
      tabIndex: c ? 0 : -1,
      onFocus: k,
      ref: f,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ b.cloneElement(t, {
      ref: h,
      onFocus: _
    }), /* @__PURE__ */ a("div", {
      tabIndex: c ? 0 : -1,
      onFocus: k,
      ref: m,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" && (vs.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: mr,
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
process.env.NODE_ENV !== "production" && (vs.propTypes = Hs(vs.propTypes));
function vx(e) {
  return typeof e == "function" ? e() : e;
}
const ii = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const {
    children: r,
    container: i,
    disablePortal: s = !1
  } = t, [l, c] = b.useState(null), u = Ct(/* @__PURE__ */ b.isValidElement(r) ? hr(r) : null, n);
  if (It(() => {
    s || c(vx(i) || document.body);
  }, [i, s]), It(() => {
    if (l && !s)
      return Ha(n, l), () => {
        Ha(n, null);
      };
  }, [n, l, s]), s) {
    if (/* @__PURE__ */ b.isValidElement(r)) {
      const f = {
        ref: u
      };
      return /* @__PURE__ */ b.cloneElement(r, f);
    }
    return r;
  }
  return l && /* @__PURE__ */ vh.createPortal(r, l);
});
process.env.NODE_ENV !== "production" && (ii.propTypes = {
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
  container: o.oneOfType([sn, o.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: o.bool
});
process.env.NODE_ENV !== "production" && (ii.propTypes = Hs(ii.propTypes));
const xx = {
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
}, Cx = {
  opacity: 0,
  visibility: "hidden"
}, $l = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = $n(), i = {
    enter: r.transitions.duration.enteringScreen,
    exit: r.transitions.duration.leavingScreen
  }, {
    addEndListener: s,
    appear: l = !0,
    children: c,
    easing: u,
    in: f,
    onEnter: m,
    onEntered: y,
    onEntering: x,
    onExit: p,
    onExited: v,
    onExiting: h,
    style: E,
    timeout: _ = i,
    ...k
  } = t, O = b.useRef(null), w = Ct(O, hr(c), n), T = At(O, x), N = At(O, (g, $) => {
    Up(g);
    const I = or({
      style: E,
      timeout: _,
      easing: u
    }, {
      mode: "enter"
    });
    g.style.transition = r.transitions.create("opacity", I), m && m(g, $);
  }), M = At(O, y), D = At(O, h), B = At(O, (g) => {
    const $ = or({
      style: E,
      timeout: _,
      easing: u
    }, {
      mode: "exit"
    });
    g.style.transition = r.transitions.create("opacity", $), p && p(g);
  }), F = At(O, (g) => {
    g.style.transition = "", v && v(g);
  });
  return /* @__PURE__ */ a(Mo, {
    appear: l,
    in: f,
    nodeRef: O,
    onEnter: N,
    onEntered: M,
    onEntering: T,
    onExit: B,
    onExited: F,
    onExiting: D,
    addEndListener: (g) => {
      s && s(O.current, g);
    },
    timeout: _,
    ...k,
    children: (g, {
      ownerState: $,
      ...I
    }) => {
      const A = Gp(g, f, xx, Cx, E, c.props.style);
      return /* @__PURE__ */ b.cloneElement(c, {
        style: A,
        ref: w,
        ...I
      });
    }
  });
});
process.env.NODE_ENV !== "production" && ($l.propTypes = {
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
  children: mr.isRequired,
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
function Sx(e) {
  return Ce("MuiBackdrop", e);
}
Te("MuiBackdrop", ["root", "invisible"]);
const Tx = (e) => {
  const {
    classes: t,
    invisible: n
  } = e;
  return we({
    root: ["root", n && "invisible"]
  }, Sx, t);
}, wx = oe("div", {
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
}), Ml = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiBackdrop"
  }), {
    children: i,
    className: s,
    component: l = "div",
    invisible: c = !1,
    open: u,
    slotProps: f = {},
    slots: m = {},
    transitionDuration: y,
    ...x
  } = r, p = {
    ...r,
    component: l,
    invisible: c
  }, v = Tx(p), h = {
    component: l,
    slots: m,
    slotProps: f
  }, [E, _] = ye("root", {
    elementType: wx,
    externalForwardedProps: h,
    className: pe(v.root, s),
    ownerState: p
  }), [k, O] = ye("transition", {
    elementType: $l,
    externalForwardedProps: h,
    ownerState: p
  });
  return /* @__PURE__ */ a(k, {
    in: u,
    timeout: y,
    ...x,
    ...O,
    children: /* @__PURE__ */ a(E, {
      ..._,
      ref: n,
      children: i
    })
  });
});
process.env.NODE_ENV !== "production" && (Ml.propTypes = {
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
function Ex(e) {
  return typeof e == "function" ? e() : e;
}
function Ox(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const Ud = () => {
}, Di = new dx();
function Rx(e) {
  const {
    container: t,
    disableScrollLock: n = !1,
    closeAfterTransition: r = !1,
    onTransitionEnter: i,
    onTransitionExited: s,
    children: l,
    onClose: c,
    open: u,
    rootRef: f
  } = e, m = b.useRef({}), y = b.useRef(null), x = b.useRef(null), p = Ct(x, f), [v, h] = b.useState(!u), E = Ox(l);
  let _ = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (_ = !1);
  const k = () => $t(y.current), O = () => (m.current.modalRef = x.current, m.current.mount = y.current, m.current), w = () => {
    Di.mount(O(), {
      disableScrollLock: n
    }), x.current && (x.current.scrollTop = 0);
  }, T = Dt(() => {
    const I = Ex(t) || k().body;
    Di.add(O(), I), x.current && w();
  }), N = () => Di.isTopModal(O()), M = Dt((I) => {
    y.current = I, I && (u && N() ? w() : x.current && Ur(x.current, _));
  }), D = b.useCallback(() => {
    Di.remove(O(), _);
  }, [_]);
  b.useEffect(() => () => {
    D();
  }, [D]), b.useEffect(() => {
    u ? T() : (!E || !r) && D();
  }, [u, D, E, r, T]);
  const B = (I) => (A) => {
    var L;
    (L = I.onKeyDown) == null || L.call(I, A), !(A.key !== "Escape" || A.which === 229 || // Wait until IME is settled.
    !N()) && (A.stopPropagation(), c && c(A, "escapeKeyDown"));
  }, F = (I) => (A) => {
    var L;
    (L = I.onClick) == null || L.call(I, A), A.target === A.currentTarget && c && c(A, "backdropClick");
  };
  return {
    getRootProps: (I = {}) => {
      const A = Jp(e);
      delete A.onTransitionEnter, delete A.onTransitionExited;
      const L = {
        ...A,
        ...I
      };
      return {
        /*
         * Marking an element with the role presentation indicates to assistive technology
         * that this element should be ignored; it exists to support the web application and
         * is not meant for humans to interact with directly.
         * https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md
         */
        role: "presentation",
        ...L,
        onKeyDown: B(L),
        ref: p
      };
    },
    getBackdropProps: (I = {}) => {
      const A = I;
      return {
        "aria-hidden": !0,
        ...A,
        onClick: F(A),
        open: u
      };
    },
    getTransitionProps: () => {
      const I = () => {
        h(!1), i && i();
      }, A = () => {
        h(!0), s && s(), r && D();
      };
      return {
        onEnter: Dd(I, (l == null ? void 0 : l.props.onEnter) ?? Ud),
        onExited: Dd(A, (l == null ? void 0 : l.props.onExited) ?? Ud)
      };
    },
    rootRef: p,
    portalRef: M,
    isTopModal: N,
    exited: v,
    hasTransition: E
  };
}
function _x(e) {
  return Ce("MuiModal", e);
}
Te("MuiModal", ["root", "hidden", "backdrop"]);
const Nx = (e) => {
  const {
    open: t,
    exited: n,
    classes: r
  } = e;
  return we({
    root: ["root", !t && n && "hidden"],
    backdrop: ["backdrop"]
  }, _x, r);
}, kx = oe("div", {
  name: "MuiModal",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, !n.open && n.exited && t.hidden];
  }
})($e(({
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
}))), Px = oe(Ml, {
  name: "MuiModal",
  slot: "Backdrop"
})({
  zIndex: -1
}), Al = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    name: "MuiModal",
    props: t
  }), {
    classes: i,
    className: s,
    closeAfterTransition: l = !1,
    children: c,
    container: u,
    component: f,
    disableAutoFocus: m = !1,
    disableEnforceFocus: y = !1,
    disablePortal: x = !1,
    disableRestoreFocus: p = !1,
    disableScrollLock: v = !1,
    hideBackdrop: h = !1,
    keepMounted: E = !1,
    onClose: _,
    onTransitionEnter: k,
    onTransitionExited: O,
    open: w,
    slotProps: T = {},
    slots: N = {},
    // eslint-disable-next-line react/prop-types
    theme: M,
    ...D
  } = r, B = {
    ...r,
    closeAfterTransition: l,
    disableAutoFocus: m,
    disableEnforceFocus: y,
    disablePortal: x,
    disableRestoreFocus: p,
    disableScrollLock: v,
    hideBackdrop: h,
    keepMounted: E
  }, {
    getRootProps: F,
    getBackdropProps: P,
    getTransitionProps: g,
    portalRef: $,
    isTopModal: I,
    exited: A,
    hasTransition: L
  } = Rx({
    ...B,
    rootRef: n
  }), W = {
    ...B,
    exited: A
  }, q = Nx(W), ie = {};
  if (c.props.tabIndex === void 0 && (ie.tabIndex = "-1"), L) {
    const {
      onEnter: G,
      onExited: K
    } = g();
    ie.onEnter = G, ie.onExited = K;
  }
  const z = {
    slots: N,
    slotProps: T
  }, [V, Q] = ye("root", {
    ref: n,
    elementType: kx,
    externalForwardedProps: {
      ...z,
      ...D,
      component: f
    },
    getSlotProps: F,
    ownerState: W,
    className: pe(s, q == null ? void 0 : q.root, !W.open && W.exited && (q == null ? void 0 : q.hidden))
  }), [re, ee] = ye("backdrop", {
    elementType: Px,
    externalForwardedProps: z,
    shouldForwardComponentProp: !0,
    getSlotProps: (G) => P({
      ...G,
      onClick: (K) => {
        G != null && G.onClick && G.onClick(K);
      }
    }),
    className: q == null ? void 0 : q.backdrop,
    ownerState: W
  });
  return !E && !w && (!L || A) ? null : /* @__PURE__ */ a(ii, {
    ref: $,
    container: u,
    disablePortal: x,
    children: /* @__PURE__ */ C(V, {
      ...Q,
      children: [h ? null : /* @__PURE__ */ a(re, {
        ...ee
      }), /* @__PURE__ */ a(vs, {
        disableEnforceFocus: y,
        disableAutoFocus: m,
        disableRestoreFocus: p,
        isEnabled: I,
        open: w,
        children: /* @__PURE__ */ b.cloneElement(c, ie)
      })]
    })
  });
});
process.env.NODE_ENV !== "production" && (Al.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: mr.isRequired,
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
  container: o.oneOfType([sn, o.func]),
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
function Ix(e) {
  return Ce("MuiDialog", e);
}
Te("MuiDialog", ["root", "backdrop", "scrollPaper", "scrollBody", "container", "paper", "paperWidthFalse", "paperWidthXs", "paperWidthSm", "paperWidthMd", "paperWidthLg", "paperWidthXl", "paperFullWidth", "paperFullScreen"]);
const Dl = /* @__PURE__ */ b.createContext({});
process.env.NODE_ENV !== "production" && (Dl.displayName = "DialogContext");
const $x = oe(Ml, {
  name: "MuiDialog",
  slot: "Backdrop"
})({
  // Improve scrollable dialog support.
  zIndex: -1
}), Mx = (e) => {
  const {
    classes: t,
    scroll: n,
    maxWidth: r,
    fullWidth: i,
    fullScreen: s
  } = e, l = {
    root: ["root"],
    backdrop: ["backdrop"],
    container: ["container", `scroll${xe(n)}`],
    paper: ["paper", `paperWidth${xe(String(r))}`, i && "paperFullWidth", s && "paperFullScreen"]
  };
  return we(l, Ix, t);
}, Ax = oe(Al, {
  name: "MuiDialog",
  slot: "Root"
})({
  "@media print": {
    // Use !important to override the Modal inline-style.
    position: "absolute !important"
  }
}), Dx = oe("div", {
  name: "MuiDialog",
  slot: "Container",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.container, t[`scroll${xe(n.scroll)}`]];
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
}), Bx = oe(yt, {
  name: "MuiDialog",
  slot: "Paper",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.paper, t[`paperWidth${xe(String(n.maxWidth))}`], n.fullWidth && t.paperFullWidth, n.fullScreen && t.paperFullScreen];
  }
})($e(({
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
}))), Lr = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiDialog"
  }), i = $n(), s = {
    enter: i.transitions.duration.enteringScreen,
    exit: i.transitions.duration.leavingScreen
  }, {
    "aria-describedby": l,
    "aria-labelledby": c,
    "aria-modal": u = !0,
    children: f,
    className: m,
    fullScreen: y = !1,
    fullWidth: x = !1,
    maxWidth: p = "sm",
    onClick: v,
    onClose: h,
    open: E,
    PaperComponent: _ = yt,
    role: k = "dialog",
    scroll: O = "paper",
    slots: w = {},
    slotProps: T = {},
    transitionDuration: N = s,
    ...M
  } = r, D = {
    ...r,
    fullScreen: y,
    fullWidth: x,
    maxWidth: p,
    scroll: O
  }, B = Mx(D), F = b.useRef(), P = (K) => {
    F.current = K.target === K.currentTarget;
  }, g = (K) => {
    v && v(K), F.current && (F.current = null, h && h(K, "backdropClick"));
  }, $ = rn(c), I = b.useMemo(() => ({
    titleId: $
  }), [$]), A = {
    slots: w,
    slotProps: T
  }, [L, W] = ye("root", {
    elementType: Ax,
    shouldForwardComponentProp: !0,
    externalForwardedProps: A,
    ownerState: D,
    className: pe(B.root, m),
    ref: n
  }), [q, ie] = ye("backdrop", {
    elementType: $x,
    shouldForwardComponentProp: !0,
    externalForwardedProps: A,
    ownerState: D,
    className: B.backdrop
  }), [z, V] = ye("paper", {
    elementType: Bx,
    shouldForwardComponentProp: !0,
    externalForwardedProps: A,
    ownerState: D,
    className: B.paper,
    additionalProps: {
      elevation: 24,
      role: k,
      "aria-describedby": l,
      "aria-labelledby": $,
      "aria-modal": u,
      tabIndex: -1,
      [Qa]: ""
    }
  }), [Q, re] = ye("container", {
    elementType: Dx,
    externalForwardedProps: A,
    ownerState: D,
    className: B.container
  }), [ee, G] = ye("transition", {
    elementType: $l,
    externalForwardedProps: A,
    ownerState: D,
    additionalProps: {
      appear: !0,
      in: E,
      timeout: N,
      role: "presentation"
    }
  });
  return /* @__PURE__ */ a(L, {
    closeAfterTransition: !0,
    slots: {
      backdrop: q
    },
    slotProps: {
      backdrop: {
        transitionDuration: N,
        ...ie
      }
    },
    onClose: h,
    open: E,
    onClick: g,
    ...W,
    ...M,
    children: /* @__PURE__ */ a(ee, {
      ...G,
      children: /* @__PURE__ */ a(Q, {
        onMouseDown: P,
        ...re,
        children: /* @__PURE__ */ a(z, {
          as: _,
          ...V,
          children: /* @__PURE__ */ a(Dl.Provider, {
            value: I,
            children: f
          })
        })
      })
    })
  });
});
process.env.NODE_ENV !== "production" && (Lr.propTypes = {
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
function Lx(e) {
  return Ce("MuiDialogActions", e);
}
Te("MuiDialogActions", ["root", "spacing"]);
const Fx = (e) => {
  const {
    classes: t,
    disableSpacing: n
  } = e;
  return we({
    root: ["root", !n && "spacing"]
  }, Lx, t);
}, jx = oe("div", {
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
}), Fr = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiDialogActions"
  }), {
    className: i,
    disableSpacing: s = !1,
    ...l
  } = r, c = {
    ...r,
    disableSpacing: s
  }, u = Fx(c);
  return /* @__PURE__ */ a(jx, {
    className: pe(u.root, i),
    ownerState: c,
    ref: n,
    ...l
  });
});
process.env.NODE_ENV !== "production" && (Fr.propTypes = {
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
function Wx(e) {
  return Ce("MuiDialogContent", e);
}
Te("MuiDialogContent", ["root", "dividers"]);
function zx(e) {
  return Ce("MuiDialogTitle", e);
}
const Vx = Te("MuiDialogTitle", ["root"]), Ux = (e) => {
  const {
    classes: t,
    dividers: n
  } = e;
  return we({
    root: ["root", n && "dividers"]
  }, Wx, t);
}, Gx = oe("div", {
  name: "MuiDialogContent",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.dividers && t.dividers];
  }
})($e(({
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
      [`.${Vx.root} + &`]: {
        paddingTop: 0
      }
    }
  }]
}))), jr = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiDialogContent"
  }), {
    className: i,
    dividers: s = !1,
    ...l
  } = r, c = {
    ...r,
    dividers: s
  }, u = Ux(c);
  return /* @__PURE__ */ a(Gx, {
    className: pe(u.root, i),
    ownerState: c,
    ref: n,
    ...l
  });
});
process.env.NODE_ENV !== "production" && (jr.propTypes = {
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
function Hx(e) {
  return Ce("MuiTypography", e);
}
const Gd = Te("MuiTypography", ["root", "h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "body1", "body2", "inherit", "button", "caption", "overline", "alignLeft", "alignRight", "alignCenter", "alignJustify", "noWrap", "gutterBottom"]), qx = (e) => {
  const {
    align: t,
    gutterBottom: n,
    noWrap: r,
    variant: i,
    classes: s
  } = e, l = {
    root: ["root", i, e.align !== "inherit" && `align${xe(t)}`, n && "gutterBottom", r && "noWrap"]
  };
  return we(l, Hx, s);
}, Kx = oe("span", {
  name: "MuiTypography",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.variant && t[n.variant], n.align !== "inherit" && t[`align${xe(n.align)}`], n.noWrap && t.noWrap, n.gutterBottom && t.gutterBottom];
  }
})($e(({
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
    })), ...Object.entries(e.palette).filter(Ft()).map(([n]) => ({
      props: {
        color: n
      },
      style: {
        color: (e.vars || e).palette[n].main
      }
    })), ...Object.entries(((t = e.palette) == null ? void 0 : t.text) || {}).filter(([, n]) => typeof n == "string").map(([n]) => ({
      props: {
        color: `text${xe(n)}`
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
})), Hd = {
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
}, J = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiTypography"
  }), {
    color: i,
    align: s = "inherit",
    className: l,
    component: c,
    gutterBottom: u = !1,
    noWrap: f = !1,
    variant: m = "body1",
    variantMapping: y = Hd,
    ...x
  } = r, p = {
    ...r,
    align: s,
    color: i,
    className: l,
    component: c,
    gutterBottom: u,
    noWrap: f,
    variant: m,
    variantMapping: y
  }, v = c || y[m] || Hd[m] || "span", h = qx(p);
  return /* @__PURE__ */ a(Kx, {
    as: v,
    ref: n,
    className: pe(h.root, l),
    ...x,
    ownerState: p,
    style: {
      ...s !== "inherit" && {
        "--Typography-textAlign": s
      },
      ...x.style
    }
  });
});
process.env.NODE_ENV !== "production" && (J.propTypes = {
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
const Yx = (e) => {
  const {
    classes: t
  } = e;
  return we({
    root: ["root"]
  }, zx, t);
}, Xx = oe(J, {
  name: "MuiDialogTitle",
  slot: "Root"
})({
  padding: "16px 24px",
  flex: "0 0 auto"
}), Wr = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiDialogTitle"
  }), {
    className: i,
    id: s,
    ...l
  } = r, c = r, u = Yx(c), {
    titleId: f = s
  } = b.useContext(Dl);
  return /* @__PURE__ */ a(Xx, {
    component: "h2",
    className: pe(u.root, i),
    ownerState: c,
    ref: n,
    variant: "h6",
    id: s ?? f,
    ...l
  });
});
process.env.NODE_ENV !== "production" && (Wr.propTypes = {
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
function qd(e) {
  return e != null && !(Array.isArray(e) && e.length === 0);
}
function xs(e, t = !1) {
  return e && (qd(e.value) && e.value !== "" || t && qd(e.defaultValue) && e.defaultValue !== "");
}
function Jx(e) {
  return e.startAdornment;
}
function Qx(e) {
  return Ce("MuiFormControl", e);
}
Te("MuiFormControl", ["root", "marginNone", "marginNormal", "marginDense", "fullWidth", "disabled"]);
const Zx = (e) => {
  const {
    classes: t,
    margin: n,
    fullWidth: r
  } = e, i = {
    root: ["root", n !== "none" && `margin${xe(n)}`, r && "fullWidth"]
  };
  return we(i, Qx, t);
}, e1 = oe("div", {
  name: "MuiFormControl",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, t[`margin${xe(n.margin)}`], n.fullWidth && t.fullWidth];
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
}), Yt = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiFormControl"
  }), {
    children: i,
    className: s,
    color: l = "primary",
    component: c = "div",
    disabled: u = !1,
    error: f = !1,
    focused: m,
    fullWidth: y = !1,
    hiddenLabel: x = !1,
    margin: p = "none",
    required: v = !1,
    size: h = "medium",
    variant: E = "outlined",
    ..._
  } = r, k = {
    ...r,
    color: l,
    component: c,
    disabled: u,
    error: f,
    fullWidth: y,
    hiddenLabel: x,
    margin: p,
    required: v,
    size: h,
    variant: E
  }, O = Zx(k), [w, T] = b.useState(() => {
    let L = !1;
    return i && b.Children.forEach(i, (W) => {
      if (!Sa(W, ["Input", "Select"]))
        return;
      const q = Sa(W, ["Select"]) ? W.props.input : W;
      q && Jx(q.props) && (L = !0);
    }), L;
  }), [N, M] = b.useState(() => {
    let L = !1;
    return i && b.Children.forEach(i, (W) => {
      Sa(W, ["Input", "Select"]) && (xs(W.props, !0) || xs(W.props.inputProps, !0)) && (L = !0);
    }), L;
  }), [D, B] = b.useState(!1);
  u && D && B(!1);
  const F = m !== void 0 && !u ? m : D;
  let P;
  const g = b.useRef(!1);
  process.env.NODE_ENV !== "production" && (P = () => (g.current && console.error(["MUI: There are multiple `InputBase` components inside a FormControl.", "This creates visual inconsistencies, only use one `InputBase`."].join(`
`)), g.current = !0, () => {
    g.current = !1;
  }));
  const $ = b.useCallback(() => {
    M(!0);
  }, []), I = b.useCallback(() => {
    M(!1);
  }, []), A = b.useMemo(() => ({
    adornedStart: w,
    setAdornedStart: T,
    color: l,
    disabled: u,
    error: f,
    filled: N,
    focused: F,
    fullWidth: y,
    hiddenLabel: x,
    size: h,
    onBlur: () => {
      B(!1);
    },
    onFocus: () => {
      B(!0);
    },
    onEmpty: I,
    onFilled: $,
    registerEffect: P,
    required: v,
    variant: E
  }), [w, l, u, f, N, F, y, x, P, I, $, v, h, E]);
  return /* @__PURE__ */ a(bi.Provider, {
    value: A,
    children: /* @__PURE__ */ a(e1, {
      as: c,
      ownerState: k,
      className: pe(O.root, s),
      ref: n,
      ..._,
      children: i
    })
  });
});
process.env.NODE_ENV !== "production" && (Yt.propTypes = {
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
function t1(e) {
  return Ce("MuiFormHelperText", e);
}
const Kd = Te("MuiFormHelperText", ["root", "error", "disabled", "sizeSmall", "sizeMedium", "contained", "focused", "filled", "required"]);
var Yd;
const o1 = (e) => {
  const {
    classes: t,
    contained: n,
    size: r,
    disabled: i,
    error: s,
    filled: l,
    focused: c,
    required: u
  } = e, f = {
    root: ["root", i && "disabled", s && "error", r && `size${xe(r)}`, n && "contained", c && "focused", l && "filled", u && "required"]
  };
  return we(f, t1, t);
}, n1 = oe("p", {
  name: "MuiFormHelperText",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.size && t[`size${xe(n.size)}`], n.contained && t.contained, n.filled && t.filled];
  }
})($e(({
  theme: e
}) => ({
  color: (e.vars || e).palette.text.secondary,
  ...e.typography.caption,
  textAlign: "left",
  marginTop: 3,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
  [`&.${Kd.disabled}`]: {
    color: (e.vars || e).palette.text.disabled
  },
  [`&.${Kd.error}`]: {
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
}))), Gr = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiFormHelperText"
  }), {
    children: i,
    className: s,
    component: l = "p",
    disabled: c,
    error: u,
    filled: f,
    focused: m,
    margin: y,
    required: x,
    variant: p,
    ...v
  } = r, [h] = fr({
    props: r,
    states: ["variant", "size", "disabled", "error", "filled", "focused", "required"]
  }), E = {
    ...r,
    component: l,
    contained: h.variant === "filled" || h.variant === "outlined",
    variant: h.variant,
    size: h.size,
    disabled: h.disabled,
    error: h.error,
    filled: h.filled,
    focused: h.focused,
    required: h.required
  };
  delete E.ownerState;
  const _ = o1(E);
  return /* @__PURE__ */ a(n1, {
    as: l,
    className: pe(_.root, s),
    ref: n,
    ...v,
    ownerState: E,
    children: i === " " ? (
      // notranslate needed while Google Translate will not fix zero-width space issue
      Yd || (Yd = /* @__PURE__ */ a("span", {
        className: "notranslate",
        "aria-hidden": !0,
        children: "​"
      }))
    ) : i
  });
});
process.env.NODE_ENV !== "production" && (Gr.propTypes = {
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
function r1(e) {
  return Ce("MuiFormLabel", e);
}
const Hr = Te("MuiFormLabel", ["root", "colorSecondary", "focused", "disabled", "error", "filled", "required", "asterisk"]), i1 = (e) => {
  const {
    classes: t,
    color: n,
    focused: r,
    disabled: i,
    error: s,
    filled: l,
    required: c
  } = e, u = {
    root: ["root", `color${xe(n)}`, i && "disabled", s && "error", l && "filled", r && "focused", c && "required"],
    asterisk: ["asterisk", s && "error"]
  };
  return we(u, r1, t);
}, s1 = oe("label", {
  name: "MuiFormLabel",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.color === "secondary" && t.colorSecondary, n.filled && t.filled];
  }
})($e(({
  theme: e
}) => ({
  color: (e.vars || e).palette.text.secondary,
  ...e.typography.body1,
  lineHeight: "1.4375em",
  padding: 0,
  position: "relative",
  variants: [...Object.entries(e.palette).filter(Ft()).map(([t]) => ({
    props: {
      color: t
    },
    style: {
      [`&.${Hr.focused}`]: {
        color: (e.vars || e).palette[t].main
      }
    }
  })), {
    props: {},
    style: {
      [`&.${Hr.disabled}`]: {
        color: (e.vars || e).palette.text.disabled
      },
      [`&.${Hr.error}`]: {
        color: (e.vars || e).palette.error.main
      }
    }
  }]
}))), a1 = oe("span", {
  name: "MuiFormLabel",
  slot: "Asterisk"
})($e(({
  theme: e
}) => ({
  [`&.${Hr.error}`]: {
    color: (e.vars || e).palette.error.main
  }
}))), hf = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiFormLabel"
  }), {
    children: i,
    className: s,
    color: l,
    component: c = "label",
    disabled: u,
    error: f,
    filled: m,
    focused: y,
    required: x,
    ...p
  } = r, [v] = fr({
    props: r,
    states: ["color", "required", "focused", "disabled", "error", "filled"]
  }), h = {
    ...r,
    color: v.color || "primary",
    component: c,
    disabled: v.disabled,
    error: v.error,
    filled: v.filled,
    focused: v.focused,
    required: v.required
  }, E = i1(h);
  return /* @__PURE__ */ C(s1, {
    as: c,
    ownerState: h,
    className: pe(E.root, s),
    ref: n,
    ...p,
    children: [i, v.required && /* @__PURE__ */ C(a1, {
      ownerState: h,
      "aria-hidden": !0,
      className: E.asterisk,
      children: [" ", "*"]
    })]
  });
});
process.env.NODE_ENV !== "production" && (hf.propTypes = {
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
function l1(e) {
  return Ce("MuiInputLabel", e);
}
const c1 = Te("MuiInputLabel", ["root", "focused", "disabled", "error", "required", "asterisk", "formControl", "sizeSmall", "shrink", "animated", "standard", "filled", "outlined"]), d1 = (e) => {
  const {
    classes: t,
    formControl: n,
    size: r,
    shrink: i,
    disableAnimation: s,
    variant: l,
    required: c
  } = e, u = {
    root: ["root", n && "formControl", !s && "animated", i && "shrink", r && r !== "medium" && `size${xe(r)}`, l],
    asterisk: [c && "asterisk"]
  }, f = we(u, l1, t);
  return {
    ...t,
    // forward the focused, disabled, etc. classes to the FormLabel
    ...f
  };
}, u1 = oe(hf, {
  shouldForwardProp: (e) => Gt(e) || e === "classes",
  name: "MuiInputLabel",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [{
      [`& .${Hr.asterisk}`]: t.asterisk
    }, t.root, n.formControl && t.formControl, n.size === "small" && t.sizeSmall, n.shrink && t.shrink, !n.disableAnimation && t.animated, n.focused && t.focused, t[n.variant]];
  }
})($e(({
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
}))), Xt = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    name: "MuiInputLabel",
    props: t
  }), {
    disableAnimation: i = !1,
    margin: s,
    shrink: l,
    variant: c,
    className: u,
    ...f
  } = r, [m, y] = fr({
    props: r,
    states: ["size", "variant", "required", "focused"]
  });
  let x = l;
  typeof x > "u" && y && (x = y.filled || y.focused || y.adornedStart);
  const p = {
    ...r,
    disableAnimation: i,
    formControl: y,
    shrink: x,
    size: m.size,
    variant: m.variant,
    required: m.required,
    focused: m.focused
  }, v = d1(p);
  return /* @__PURE__ */ a(u1, {
    "data-shrink": x,
    ref: n,
    className: pe(v.root, u),
    ...f,
    ownerState: p,
    classes: v
  });
});
process.env.NODE_ENV !== "production" && (Xt.propTypes = {
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
const $o = /* @__PURE__ */ b.createContext({});
process.env.NODE_ENV !== "production" && ($o.displayName = "ListContext");
function gf(e, t) {
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
const Js = /* @__PURE__ */ b.createContext(void 0);
process.env.NODE_ENV !== "production" && (Js.displayName = "RovingTabIndexContext");
function bf() {
  const e = b.useContext(Js);
  if (e === void 0)
    throw new Error("MUI: RovingTabIndexContext is missing. Roving tab index items must be placed within a roving tab index provider.");
  return e;
}
const p1 = Object.is;
function f1(e, t) {
  if (e === t)
    return !0;
  if (!(e instanceof Object) || !(t instanceof Object))
    return !1;
  let n = 0, r = 0;
  for (const i in e)
    if (n += 1, !p1(e[i], t[i]) || !(i in t))
      return !1;
  for (const i in t)
    r += 1;
  return n === r;
}
const m1 = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "Home", "End"];
function yf(e) {
  const {
    activeItemId: t,
    getDefaultActiveItemId: n,
    orientation: r,
    isRtl: i = !1,
    isItemFocusable: s = qr,
    wrap: l = !0
  } = e, [c, u] = b.useState(t), f = b.useRef(t);
  let m = c;
  t !== f.current && (f.current = t, t !== void 0 && t !== c && (m = t, u(t)));
  const y = b.useRef(null), x = b.useRef(/* @__PURE__ */ new Map()), [p, v] = b.useState(0), h = b.useMemo(() => Za(x.current), [p]), E = Xd(m, h, s, n), _ = b.useRef(E);
  _.current = E;
  const k = b.useCallback(() => {
    const P = Za(x.current), g = Xd(_.current, P, s, n);
    return Sf(P, g);
  }, [n, s]), O = b.useCallback(() => x.current, []), w = Dt((P) => {
    const g = x.current.get(P.id);
    f1(g ?? null, P) || (x.current.set(P.id, P), v(($) => $ + 1));
  }), T = Dt((P) => {
    x.current.delete(P) && v((g) => g + 1);
  }), N = Dt((P) => {
    u(P);
  }), M = b.useCallback((P) => _.current === P, []), D = b.useCallback((P, g, $, I) => {
    var W;
    const A = Bi(x.current), L = xf(A, P, g, $, I ?? s);
    return L ? ((W = L.element) == null || W.focus(), u(L.id), L) : null;
  }, [s]), B = b.useCallback((P) => ({
    onFocus: (I) => {
      const A = Bi(x.current), L = wf(A, I.target);
      L !== -1 && u(A[L].id);
    },
    onKeyDown: (I) => {
      if (I.altKey || I.shiftKey || I.ctrlKey || I.metaKey || !m1.includes(I.key))
        return;
      let A = r === "horizontal" ? "ArrowLeft" : "ArrowUp", L = r === "horizontal" ? "ArrowRight" : "ArrowDown";
      r === "horizontal" && i && (A = "ArrowRight", L = "ArrowLeft");
      const W = Bi(x.current), q = zo($t(y.current)), ie = q === y.current;
      let z = Jd(W, q, _.current), V = "next";
      switch (I.key) {
        case A:
          V = "previous", I.preventDefault(), ie && (z = W.length);
          break;
        case L:
          I.preventDefault(), ie && (z = -1);
          break;
        case "Home":
          I.preventDefault(), z = -1;
          break;
        case "End":
          I.preventDefault(), V = "previous", z = W.length;
          break;
        default:
          return;
      }
      D(z, V, l);
    },
    ref: y1(P, (I) => {
      y.current = I;
    })
  }), [D, i, r, l]), F = b.useCallback((P) => {
    var L;
    const g = Bi(x.current), $ = zo($t(y.current)), A = $ === y.current ? -1 : Jd(g, $, _.current);
    return ((L = D(A, "next", !0, P)) == null ? void 0 : L.id) ?? null;
  }, [D]);
  return b.useMemo(() => ({
    activeItemId: E,
    focusNext: F,
    getActiveItem: k,
    getContainerProps: B,
    getItemMap: O,
    isItemActive: M,
    registerItem: w,
    setActiveItemId: N,
    unregisterItem: T
  }), [E, F, k, B, O, M, w, N, T]);
}
function vf(e) {
  const t = bf(), {
    activeItemId: n,
    registerItem: r,
    unregisterItem: i
  } = t, s = b.useRef(null), l = b.useMemo(() => ({
    disabled: e.disabled ?? !1,
    element: null,
    focusableWhenDisabled: e.focusableWhenDisabled ?? !1,
    id: e.id,
    selected: e.selected ?? !1,
    textValue: e.textValue
  }), [e.disabled, e.focusableWhenDisabled, e.id, e.selected, e.textValue]), c = b.useRef(l);
  c.current = l;
  const u = b.useCallback((m) => {
    if (s.current = m, m == null) {
      queueMicrotask(() => {
        s.current == null && i(e.id);
      });
      return;
    }
    r({
      ...c.current,
      element: m
    });
  }, [e.id, r, i]), f = Ct(e.ref, u);
  return It(() => {
    s.current && r({
      ...l,
      element: s.current
    });
  }, [l, r]), It(() => {
    const m = e.id;
    return () => {
      i(m);
    };
  }, [e.id, i]), {
    ref: f,
    tabIndex: n === e.id ? 0 : -1
  };
}
function Xd(e, t, n, r) {
  return e != null ? h1(e, t, n) : g1(t, n, r);
}
function h1(e, t, n) {
  var i;
  const r = Tf(t, e);
  return r === -1 ? Cf(t, n) : n(t[r]) ? t[r].id : ((i = xf(t, r, "next", !1, n)) == null ? void 0 : i.id) ?? null;
}
function g1(e, t, n) {
  const r = n == null ? void 0 : n(e);
  if (r != null) {
    const i = Sf(e, r);
    if (i && t(i))
      return i.id;
  }
  return Cf(e, t);
}
function Jd(e, t, n) {
  if (t) {
    const r = wf(e, t);
    if (r !== -1)
      return r;
  }
  return Tf(e, n);
}
function xf(e, t, n, r, i) {
  const s = e.length - 1;
  if (s === -1)
    return null;
  let l = !1, c = Qd(t, s, n, r);
  const u = c;
  for (; c !== -1; ) {
    if (c === u) {
      if (l)
        return null;
      l = !0;
    }
    const f = e[c];
    if (!f || !i(f))
      c = Qd(c, s, n, r);
    else
      return f;
  }
  return null;
}
function Cf(e, t) {
  var n;
  return ((n = e.find((r) => t(r))) == null ? void 0 : n.id) ?? null;
}
function Sf(e, t) {
  return t == null ? null : e.find((n) => n.id === t) ?? null;
}
function Tf(e, t) {
  return t == null ? -1 : e.findIndex((n) => n.id === t);
}
function wf(e, t) {
  return t ? e.findIndex((n) => {
    var r;
    return n.element === t || ((r = n.element) == null ? void 0 : r.contains(t));
  }) : -1;
}
function Za(e) {
  const t = Array.from(e.values());
  if (t.every((i) => i.element == null))
    return t;
  const n = t.filter(el).sort((i, s) => b1(i.element, s.element)), r = t.filter((i) => !el(i));
  return [...n, ...r];
}
function Bi(e) {
  return Za(e).filter(el);
}
function Qd(e, t, n, r = !0) {
  return n === "next" ? e === t ? r ? 0 : -1 : e + 1 : e === 0 ? r ? t : -1 : e - 1;
}
function qr(e) {
  return e.element ? e.focusableWhenDisabled ? !0 : !e.disabled && !e.element.hasAttribute("disabled") && e.element.getAttribute("aria-disabled") !== "true" && e.element.hasAttribute("tabindex") : !1;
}
function el(e) {
  return e.element != null && e.element.isConnected;
}
function b1(e, t) {
  if (e === t)
    return 0;
  const n = e.compareDocumentPosition(t);
  return n & Node.DOCUMENT_POSITION_FOLLOWING || n & Node.DOCUMENT_POSITION_CONTAINED_BY ? -1 : n & Node.DOCUMENT_POSITION_PRECEDING || n & Node.DOCUMENT_POSITION_CONTAINS ? 1 : 0;
}
function y1(...e) {
  return (t) => {
    e.forEach((n) => {
      Ha(n ?? null, t);
    });
  };
}
const Zd = Te("MuiDivider", ["root", "absolute", "fullWidth", "inset", "middle", "flexItem", "vertical", "withChildren", "textAlignRight", "textAlignLeft", "wrapper", "wrapperVertical"]);
function v1(e) {
  return Ce("MuiListItemIcon", e);
}
const eu = Te("MuiListItemIcon", ["root", "alignItemsFlexStart"]), x1 = (e) => {
  const {
    alignItems: t,
    classes: n
  } = e;
  return we({
    root: ["root", t === "flex-start" && "alignItemsFlexStart"]
  }, v1, n);
}, C1 = oe("div", {
  name: "MuiListItemIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.alignItems === "flex-start" && t.alignItemsFlexStart];
  }
})($e(({
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
}))), Ef = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiListItemIcon"
  }), {
    className: i,
    ...s
  } = r, l = b.useContext($o), c = {
    ...r,
    alignItems: l.alignItems
  }, u = x1(c);
  return /* @__PURE__ */ a(C1, {
    className: pe(u.root, i),
    ownerState: c,
    ref: n,
    ...s
  });
});
process.env.NODE_ENV !== "production" && (Ef.propTypes = {
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
function S1(e) {
  return Ce("MuiListItemText", e);
}
const qn = Te("MuiListItemText", ["root", "multiline", "dense", "inset", "primary", "secondary"]), T1 = (e) => {
  const {
    classes: t,
    inset: n,
    primary: r,
    secondary: i,
    dense: s
  } = e;
  return we({
    root: ["root", n && "inset", s && "dense", r && i && "multiline"],
    primary: ["primary"],
    secondary: ["secondary"]
  }, S1, t);
}, w1 = oe("div", {
  name: "MuiListItemText",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [{
      [`& .${qn.primary}`]: t.primary
    }, {
      [`& .${qn.secondary}`]: t.secondary
    }, t.root, n.inset && t.inset, n.primary && n.secondary && t.multiline, n.dense && t.dense];
  }
})({
  flex: "1 1 auto",
  minWidth: 0,
  marginTop: 4,
  marginBottom: 4,
  // Combine this and the below selector once https://github.com/emotion-js/emotion/issues/3366 is solved
  [`.${Gd.root}:where(& .${qn.primary})`]: {
    display: "block"
  },
  [`.${Gd.root}:where(& .${qn.secondary})`]: {
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
}), Of = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiListItemText"
  }), {
    children: i,
    className: s,
    disableTypography: l = !1,
    inset: c = !1,
    primary: u,
    secondary: f,
    slots: m = {},
    slotProps: y = {},
    ...x
  } = r, {
    dense: p
  } = b.useContext($o);
  let v = u ?? i, h = f;
  const E = {
    ...r,
    disableTypography: l,
    inset: c,
    primary: !!v,
    secondary: !!h,
    dense: p
  }, _ = T1(E), k = {
    slots: m,
    slotProps: y
  }, [O, w] = ye("root", {
    className: pe(_.root, s),
    elementType: w1,
    externalForwardedProps: {
      ...k,
      ...x
    },
    ownerState: E,
    ref: n
  }), [T, N] = ye("primary", {
    className: _.primary,
    elementType: J,
    externalForwardedProps: k,
    ownerState: E
  }), [M, D] = ye("secondary", {
    className: _.secondary,
    elementType: J,
    externalForwardedProps: k,
    ownerState: E
  });
  return v != null && v.type !== J && !l && (v = /* @__PURE__ */ a(T, {
    variant: p ? "body2" : "body1",
    component: N != null && N.variant ? void 0 : "span",
    ...N,
    children: v
  })), h != null && h.type !== J && !l && (h = /* @__PURE__ */ a(M, {
    variant: "body2",
    color: "textSecondary",
    ...D,
    children: h
  })), /* @__PURE__ */ C(O, {
    ...w,
    children: [v, h]
  });
});
process.env.NODE_ENV !== "production" && (Of.propTypes = {
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
const Bl = /* @__PURE__ */ b.createContext(void 0);
process.env.NODE_ENV !== "production" && (Bl.displayName = "MenuListContext");
function E1() {
  const e = b.useContext(Bl);
  if (e === void 0)
    throw new Error("MUI: MenuListContext is missing. MenuItems must be placed within Menu or MenuList.");
  return e;
}
function O1(e) {
  return e ? e.type === "mousedown" || e.type === "pointerdown" || e.type === "touchstart" ? "pointer" : e.type === "keydown" || e.type === "click" && e.detail === 0 ? "keyboard" : null : null;
}
function R1(e) {
  return e == null || typeof e == "string" && !e.trim();
}
function tu(e, t) {
  return typeof t == "object" && t !== null ? e === t : String(e) === String(t);
}
const Ll = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (Ll.displayName = "SelectFocusSourceContext");
function Rf() {
  return b.useContext(Ll);
}
const _1 = Ll.Provider;
function N1(e) {
  return Ce("MuiMenuItem", e);
}
const Rr = Te("MuiMenuItem", ["root", "focusVisible", "dense", "disabled", "divider", "gutters", "selected"]), k1 = (e, t) => {
  const {
    ownerState: n
  } = e;
  return [t.root, n.dense && t.dense, n.divider && t.divider, !n.disableGutters && t.gutters];
}, P1 = (e) => {
  const {
    disabled: t,
    dense: n,
    divider: r,
    disableGutters: i,
    selected: s,
    classes: l
  } = e, u = we({
    root: ["root", n && "dense", t && "disabled", !i && "gutters", r && "divider", s && "selected"]
  }, N1, l);
  return {
    ...l,
    ...u
  };
}, I1 = oe(Io, {
  shouldForwardProp: (e) => Gt(e) || e === "classes",
  name: "MuiMenuItem",
  slot: "Root",
  overridesResolver: k1
})($e(({
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
  [`&.${Rr.selected}`]: {
    backgroundColor: e.alpha((e.vars || e).palette.primary.main, (e.vars || e).palette.action.selectedOpacity),
    [`&.${Rr.focusVisible}`]: {
      backgroundColor: e.alpha((e.vars || e).palette.primary.main, `${(e.vars || e).palette.action.selectedOpacity} + ${(e.vars || e).palette.action.focusOpacity}`)
    }
  },
  [`&.${Rr.selected}:hover`]: {
    backgroundColor: e.alpha((e.vars || e).palette.primary.main, `${(e.vars || e).palette.action.selectedOpacity} + ${(e.vars || e).palette.action.hoverOpacity}`),
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      backgroundColor: e.alpha((e.vars || e).palette.primary.main, (e.vars || e).palette.action.selectedOpacity)
    }
  },
  [`&.${Rr.focusVisible}`]: {
    backgroundColor: (e.vars || e).palette.action.focus
  },
  [`&.${Rr.disabled}`]: {
    opacity: (e.vars || e).palette.action.disabledOpacity
  },
  [`& + .${Zd.root}`]: {
    marginTop: e.spacing(1),
    marginBottom: e.spacing(1)
  },
  [`& + .${Zd.inset}`]: {
    marginLeft: 52
  },
  [`& .${qn.root}`]: {
    marginTop: 0,
    marginBottom: 0
  },
  [`& .${qn.inset}`]: {
    paddingLeft: 36
  },
  [`& .${eu.root}`]: {
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
      [`& .${eu.root} svg`]: {
        fontSize: "1.25rem"
      }
    }
  }]
}))), Ye = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiMenuItem"
  }), {
    autoFocus: i = !1,
    component: s = "li",
    dense: l = !1,
    divider: c = !1,
    disableGutters: u = !1,
    focusVisibleClassName: f,
    role: m = "menuitem",
    tabIndex: y,
    className: x,
    ...p
  } = r, v = Rf(), h = b.useContext($o), E = b.useMemo(() => ({
    dense: l || h.dense || !1,
    disableGutters: u
  }), [h.dense, l, u]), _ = E1(), k = rn(), O = _.suppressInitialFocusVisible, w = _.itemsFocusableWhenDisabled, T = b.useRef(null);
  It(() => {
    i && (T.current ? gf(T.current, v) : process.env.NODE_ENV !== "production" && console.error("MUI: Unable to set focus to a MenuItem whose component has not been rendered."));
  }, [i]);
  const N = {
    ...r,
    dense: E.dense,
    divider: c,
    disableGutters: u
  }, M = P1(r), {
    root: D,
    ...B
  } = M, F = vf({
    id: k,
    ref: n,
    disabled: r.disabled,
    focusableWhenDisabled: w,
    selected: r.selected
  }), P = Ct(T, F.ref);
  let g;
  return y !== void 0 ? g = y : _.variant === "selectedMenu" ? g = F.tabIndex : (!r.disabled || w) && (g = -1), /* @__PURE__ */ a($o.Provider, {
    value: E,
    children: /* @__PURE__ */ a(I1, {
      ref: P,
      role: m,
      tabIndex: g,
      component: s,
      internalNativeButton: !1,
      focusableWhenDisabled: w,
      suppressFocusVisible: O,
      focusVisibleClassName: pe(M.focusVisible, f),
      className: pe(M.root, x),
      ...p,
      ownerState: N,
      classes: B
    })
  });
});
process.env.NODE_ENV !== "production" && (Ye.propTypes = {
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
function nr(e) {
  var y;
  const {
    elementType: t,
    externalSlotProps: n,
    ownerState: r,
    skipResolvingSlotProps: i = !1,
    ...s
  } = e, l = i ? {} : Xp(n, r), {
    props: c,
    internalRef: u
  } = Qp({
    ...s,
    externalSlotProps: l
  }), f = Ct(u, l == null ? void 0 : l.ref, (y = e.additionalProps) == null ? void 0 : y.ref);
  return Yp(t, {
    ...c,
    ref: f
  }, r);
}
function $1(e) {
  return Ce("MuiList", e);
}
Te("MuiList", ["root", "padding", "dense", "subheader"]);
const M1 = (e) => {
  const {
    classes: t,
    disablePadding: n,
    dense: r,
    subheader: i
  } = e;
  return we({
    root: ["root", !n && "padding", r && "dense", i && "subheader"]
  }, $1, t);
}, A1 = oe("ul", {
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
}), Fl = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiList"
  }), {
    children: i,
    className: s,
    component: l = "ul",
    dense: c = !1,
    disablePadding: u = !1,
    subheader: f,
    ...m
  } = r, y = b.useMemo(() => ({
    dense: c
  }), [c]), x = {
    ...r,
    component: l,
    dense: c,
    disablePadding: u
  }, p = M1(x);
  return /* @__PURE__ */ a($o.Provider, {
    value: y,
    children: /* @__PURE__ */ C(A1, {
      as: l,
      className: pe(p.root, s),
      ref: n,
      ownerState: x,
      ...m,
      children: [f, i]
    })
  });
});
process.env.NODE_ENV !== "production" && (Fl.propTypes = {
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
function D1(e) {
  const t = (e == null ? void 0 : e.element) ?? e;
  if (!t)
    return "";
  if ((e == null ? void 0 : e.textValue) !== void 0)
    return e.textValue;
  let n = t.innerText;
  return n === void 0 && (n = t.textContent), n ?? "";
}
function _f(e, t) {
  if (t === void 0)
    return !0;
  let n = D1(e);
  return n = n.trim().toLowerCase(), n.length === 0 ? !1 : t.repeating ? n[0] === t.keys[0] : n.startsWith(t.keys.join(""));
}
function B1(e, t) {
  return _f(e, t) ? qr(e) : !1;
}
function L1(e, t) {
  gf(e, t);
}
const Nf = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const {
    // private
    // eslint-disable-next-line react/prop-types
    actions: r,
    autoFocus: i = !1,
    autoFocusItem: s = !1,
    children: l,
    className: c,
    disabledItemsFocusable: u = !1,
    disableListWrap: f = !1,
    onKeyDown: m,
    variant: y = "selectedMenu",
    ...x
  } = t, p = b.useRef(null), v = b.useRef(!1), [h, E] = b.useState(!1), _ = Rf(), k = b.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  }), O = b.useCallback((A) => {
    var L, W, q;
    return y === "selectedMenu" ? ((L = A.find((ie) => ie.selected && qr(ie))) == null ? void 0 : L.id) ?? ((W = A.find((ie) => qr(ie))) == null ? void 0 : W.id) ?? null : ((q = A.find((ie) => qr(ie))) == null ? void 0 : q.id) ?? null;
  }, [y]), w = yf({
    activeItemId: void 0,
    getDefaultActiveItemId: O,
    orientation: "vertical",
    wrap: !f
  }), {
    activeItemId: T,
    focusNext: N,
    getActiveItem: M,
    getContainerProps: D,
    getItemMap: B
  } = w, F = Dt((A = !1) => {
    if (!p.current || !A && v.current)
      return null;
    if (s) {
      const L = M();
      if (L != null && L.element) {
        const W = Array.from(B().values()).some((ie) => ie.selected), q = y === "menu" && W && !L.selected && _ == null;
        return E(q), L1(L.element, _), v.current = !0, L.element;
      }
      return i ? (E(!1), p.current.focus(), p.current) : null;
    }
    return i ? (E(!1), p.current.focus(), v.current = !0, p.current) : (E(!1), null);
  });
  It(() => {
    if (!i && !s) {
      v.current = !1, E(!1);
      return;
    }
    F();
  }, [T, s, i, F]), b.useImperativeHandle(r, () => ({
    adjustStyleForScrollbar: (A, {
      direction: L
    }) => {
      const W = !p.current.style.width;
      if (A.clientHeight < p.current.clientHeight && W) {
        const q = `${ff(Po(A))}px`;
        p.current.style[L === "rtl" ? "paddingLeft" : "paddingRight"] = q, p.current.style.width = `calc(100% + ${q})`;
      }
      return p.current;
    },
    focusInitialTarget: () => {
      if (!p.current)
        return null;
      const A = zo($t(p.current));
      return A && ys(p.current, A) ? A : F(!0);
    }
  }), [F]);
  const P = D(), g = Ct(p, P.ref, n), $ = b.useMemo(() => ({
    itemsFocusableWhenDisabled: u,
    suppressInitialFocusVisible: h,
    variant: y
  }), [u, h, y]), I = Dt((A) => {
    if (h && E(!1), (A.ctrlKey || A.metaKey || A.altKey) && m) {
      m(A);
      return;
    }
    if (P.onKeyDown(A), A.key.length === 1) {
      const W = k.current, q = A.key.toLowerCase(), ie = performance.now();
      W.keys.length > 0 && (ie - W.lastTime > 500 ? (W.keys = [], W.repeating = !0, W.previousKeyMatched = !0) : W.repeating && q !== W.keys[0] && (W.repeating = !1)), W.lastTime = ie, W.keys.push(q);
      const z = zo($t(p.current)), V = z && !W.repeating && _f(z, W);
      W.previousKeyMatched && (V || N((Q) => B1(Q, W)) != null) ? A.preventDefault() : W.previousKeyMatched = !1;
    }
    m && m(A);
  });
  return /* @__PURE__ */ a(Fl, {
    role: "menu",
    ref: g,
    className: c,
    onKeyDown: I,
    onFocus: P.onFocus,
    tabIndex: -1,
    ...x,
    children: /* @__PURE__ */ a(Bl.Provider, {
      value: $,
      children: /* @__PURE__ */ a(Js.Provider, {
        value: w,
        children: l
      })
    })
  });
});
process.env.NODE_ENV !== "production" && (Nf.propTypes = {
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
function yi() {
  return !(/jsdom|HappyDOM/.test(window.navigator.userAgent) || // TODO(v9): Remove the test environment check
  // eslint-disable-next-line mui/consistent-production-guard
  process.env.NODE_ENV === "test");
}
function Kr(e) {
  return `scale(${e}, ${e ** 2})`;
}
const F1 = {
  entering: {
    opacity: 1,
    transform: Kr(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  },
  exiting: {
    opacity: 0,
    transform: Kr(0.75)
  },
  exited: {
    opacity: 0,
    transform: Kr(0.75)
  }
}, j1 = {
  opacity: 0,
  transform: Kr(0.75),
  visibility: "hidden"
}, si = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const {
    addEndListener: r,
    appear: i = !0,
    children: s,
    easing: l,
    in: c,
    onEnter: u,
    onEntered: f,
    onEntering: m,
    onExit: y,
    onExited: x,
    onExiting: p,
    style: v,
    timeout: h = "auto",
    ...E
  } = t, _ = tn(), k = b.useRef(), O = $n(), w = b.useRef(null), T = Ct(w, hr(s), n), N = At(w, m), M = At(w, ($, I) => {
    Up($);
    const {
      duration: A,
      delay: L,
      easing: W
    } = or({
      style: v,
      timeout: h,
      easing: l
    }, {
      mode: "enter"
    });
    let q;
    h === "auto" ? (q = O.transitions.getAutoHeightDuration($.clientHeight), k.current = q) : q = A, $.style.transition = [O.transitions.create("opacity", {
      duration: q,
      delay: L
    }), O.transitions.create("transform", {
      duration: q * 0.666,
      delay: L,
      easing: W
    })].join(","), u && u($, I);
  }), D = At(w, f), B = At(w, p), F = At(w, ($) => {
    const {
      duration: I,
      delay: A,
      easing: L
    } = or({
      style: v,
      timeout: h,
      easing: l
    }, {
      mode: "exit"
    });
    let W;
    h === "auto" ? (W = O.transitions.getAutoHeightDuration($.clientHeight), k.current = W) : W = I, $.style.transition = [O.transitions.create("opacity", {
      duration: W,
      delay: A
    }), O.transitions.create("transform", {
      duration: W * 0.666,
      delay: A || W * 0.333,
      easing: L
    })].join(","), $.style.opacity = 0, $.style.transform = Kr(0.75), y && y($);
  }), P = At(w, ($) => {
    $.style.transition = "", x && x($);
  });
  return /* @__PURE__ */ a(Mo, {
    appear: i,
    in: c,
    nodeRef: w,
    onEnter: M,
    onEntered: D,
    onEntering: N,
    onExit: F,
    onExited: P,
    onExiting: B,
    addEndListener: ($) => {
      h === "auto" && _.start(k.current || 0, $), r && r(w.current, $);
    },
    timeout: h === "auto" ? null : h,
    ...E,
    children: ($, {
      ownerState: I,
      ...A
    }) => {
      const L = Gp($, c, F1, j1, v, s.props.style);
      return /* @__PURE__ */ b.cloneElement(s, {
        style: L,
        ref: T,
        ...A
      });
    }
  });
});
process.env.NODE_ENV !== "production" && (si.propTypes = {
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
  children: mr.isRequired,
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
si && (si.muiSupportAuto = !0);
function W1(e) {
  return Ce("MuiPopover", e);
}
Te("MuiPopover", ["root", "paper"]);
function ou(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.height / 2 : t === "bottom" && (n = e.height), n;
}
function nu(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.width / 2 : t === "right" && (n = e.width), n;
}
function ru(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function zr(e) {
  return typeof e == "function" ? e() : e;
}
const z1 = (e) => {
  const {
    classes: t
  } = e;
  return we({
    root: ["root"],
    paper: ["paper"]
  }, W1, t);
}, V1 = oe(Al, {
  name: "MuiPopover",
  slot: "Root"
})({}), kf = oe(yt, {
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
}), Pf = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiPopover"
  }), {
    action: i,
    anchorEl: s,
    anchorOrigin: l = {
      vertical: "top",
      horizontal: "left"
    },
    anchorPosition: c,
    anchorReference: u = "anchorEl",
    children: f,
    className: m,
    container: y,
    disableAutoFocus: x = !1,
    elevation: p = 8,
    marginThreshold: v = 16,
    open: h,
    slots: E = {},
    slotProps: _ = {},
    transformOrigin: k = {
      vertical: "top",
      horizontal: "left"
    },
    transitionDuration: O = "auto",
    disableScrollLock: w = !1,
    ...T
  } = r, N = b.useRef(), M = {
    ...r,
    anchorOrigin: l,
    anchorReference: u,
    elevation: p,
    marginThreshold: v,
    transformOrigin: k,
    transitionDuration: O
  }, D = z1(M), B = b.useCallback(() => {
    if (u === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (c || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), c;
    const U = zr(s), te = U && U.nodeType === 1 ? U : $t(N.current).body, ne = te.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const ge = te.getBoundingClientRect();
      yi() && ge.top === 0 && ge.left === 0 && ge.right === 0 && ge.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: ne.top + ou(ne, l.vertical),
      left: ne.left + nu(ne, l.horizontal)
    };
  }, [s, l.horizontal, l.vertical, c, u]), F = b.useCallback((U) => ({
    vertical: ou(U, k.vertical),
    horizontal: nu(U, k.horizontal)
  }), [k.horizontal, k.vertical]), P = b.useCallback((U) => {
    const te = {
      width: U.offsetWidth,
      height: U.offsetHeight
    }, ne = F(te);
    if (u === "none")
      return {
        top: null,
        left: null,
        transformOrigin: ru(ne)
      };
    const ge = B();
    let j = ge.top - ne.vertical, fe = ge.left - ne.horizontal;
    const se = j + te.height, ke = fe + te.width, Fe = Po(zr(s)), Z = Fe.innerHeight - v, Me = Fe.innerWidth - v;
    if (v != null && j < v) {
      const Ee = j - v;
      j -= Ee, ne.vertical += Ee;
    } else if (v != null && se > Z) {
      const Ee = se - Z;
      j -= Ee, ne.vertical += Ee;
    }
    if (process.env.NODE_ENV !== "production" && te.height > Z && te.height && Z && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${te.height - Z}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), v != null && fe < v) {
      const Ee = fe - v;
      fe -= Ee, ne.horizontal += Ee;
    } else if (ke > Me) {
      const Ee = ke - Me;
      fe -= Ee, ne.horizontal += Ee;
    }
    return {
      top: `${Math.round(j)}px`,
      left: `${Math.round(fe)}px`,
      transformOrigin: ru(ne)
    };
  }, [s, u, B, F, v]), [g, $] = b.useState(h), I = b.useCallback(() => {
    const U = N.current;
    if (!U)
      return;
    const te = P(U);
    te.top != null && U.style.setProperty("top", te.top), te.left != null && (U.style.left = te.left), U.style.transformOrigin = te.transformOrigin, $(!0);
  }, [P]);
  b.useEffect(() => (w && window.addEventListener("scroll", I), () => window.removeEventListener("scroll", I)), [s, w, I]);
  const A = () => {
    I();
  }, L = () => {
    $(!1);
  };
  b.useEffect(() => {
    h && I();
  }), b.useImperativeHandle(i, () => h ? {
    updatePosition: () => {
      I();
    }
  } : null, [h, I]), b.useEffect(() => {
    if (!h)
      return;
    const U = Xs(() => {
      I();
    }), te = Po(zr(s));
    return te.addEventListener("resize", U), () => {
      U.clear(), te.removeEventListener("resize", U);
    };
  }, [s, h, I]);
  let W = O;
  const q = {
    slots: E,
    slotProps: _
  }, [ie, z] = ye("transition", {
    elementType: si,
    externalForwardedProps: q,
    ownerState: M,
    getSlotProps: (U) => ({
      ...U,
      onEntering: (te, ne) => {
        var ge;
        (ge = U.onEntering) == null || ge.call(U, te, ne), A();
      },
      onExited: (te) => {
        var ne;
        (ne = U.onExited) == null || ne.call(U, te), L();
      }
    }),
    additionalProps: {
      appear: !0,
      in: h
    }
  });
  O === "auto" && !ie.muiSupportAuto && (W = void 0);
  const V = y || (s ? $t(zr(s)).body : void 0), [Q, {
    slots: re,
    slotProps: ee,
    ...G
  }] = ye("root", {
    ref: n,
    elementType: V1,
    externalForwardedProps: {
      ...q,
      ...T
    },
    shouldForwardComponentProp: !0,
    additionalProps: {
      slots: {
        backdrop: E.backdrop
      },
      slotProps: {
        backdrop: Kp(typeof _.backdrop == "function" ? _.backdrop(M) : _.backdrop, {
          invisible: !0
        })
      },
      container: V,
      open: h
    },
    ownerState: M,
    className: pe(D.root, m)
  }), [K, Y] = ye("paper", {
    ref: N,
    className: D.paper,
    elementType: kf,
    externalForwardedProps: q,
    shouldForwardComponentProp: !0,
    additionalProps: {
      elevation: p,
      style: g ? void 0 : {
        opacity: 0
      }
    },
    ownerState: M
  });
  return /* @__PURE__ */ a(Q, {
    ...G,
    ...!ms(Q) && {
      slots: re,
      slotProps: ee,
      disableAutoFocus: x,
      disableScrollLock: w
    },
    children: /* @__PURE__ */ a(ie, {
      ...z,
      timeout: W,
      children: /* @__PURE__ */ a(K, {
        ...Y,
        children: f
      })
    })
  });
});
process.env.NODE_ENV !== "production" && (Pf.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: So,
  /**
   * An HTML element, [PopoverVirtualElement](https://mui.com/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: qo(o.oneOfType([sn, o.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const t = zr(e.anchorEl);
      if (t && t.nodeType === 1) {
        const n = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "production" && yi() && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
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
  container: o.oneOfType([sn, o.func]),
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
  elevation: tf,
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
function U1(e) {
  return Ce("MuiMenu", e);
}
Te("MuiMenu", ["root", "paper", "list"]);
const G1 = {
  vertical: "top",
  horizontal: "right"
}, H1 = {
  vertical: "top",
  horizontal: "left"
}, q1 = (e) => {
  const {
    classes: t
  } = e;
  return we({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, U1, t);
}, K1 = oe(Pf, {
  shouldForwardProp: (e) => Gt(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root"
})({}), Y1 = oe(kf, {
  name: "MuiMenu",
  slot: "Paper"
})({
  // specZ: The maximum height of a simple menu should be one or more rows less than the view
  // height. This ensures a tappable area outside of the simple menu with which to dismiss
  // the menu.
  maxHeight: "calc(100% - 96px)",
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: "touch"
}), X1 = oe(Nf, {
  name: "MuiMenu",
  slot: "List"
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), If = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiMenu"
  }), {
    autoFocus: i = !0,
    children: s,
    className: l,
    disableAutoFocusItem: c = !1,
    onClose: u,
    open: f,
    PopoverClasses: m,
    transitionDuration: y = "auto",
    variant: x = "selectedMenu",
    slots: p = {},
    slotProps: v = {},
    ...h
  } = r, E = qs(), _ = {
    ...r,
    autoFocus: i,
    disableAutoFocusItem: c,
    transitionDuration: y,
    variant: x
  }, k = q1(_), O = i && f, w = O && !c, T = b.useRef(null), N = (A, L) => {
    var W, q;
    T.current && (T.current.adjustStyleForScrollbar(A, {
      direction: E ? "rtl" : "ltr"
    }), O && ((q = (W = T.current).focusInitialTarget) == null || q.call(W)));
  }, M = (A) => {
    A.key === "Tab" && (A.preventDefault(), u && u(A, "tabKeyDown"));
  }, D = {
    slots: p,
    slotProps: v
  }, B = nr({
    elementType: p.root,
    externalSlotProps: v.root,
    ownerState: _,
    className: [k.root, l]
  }), [F, P] = ye("paper", {
    className: k.paper,
    elementType: Y1,
    externalForwardedProps: D,
    shouldForwardComponentProp: !0,
    ownerState: _
  }), [g, $] = ye("list", {
    className: k.list,
    elementType: X1,
    shouldForwardComponentProp: !0,
    externalForwardedProps: D,
    getSlotProps: (A) => ({
      ...A,
      onKeyDown: (L) => {
        var W;
        M(L), (W = A.onKeyDown) == null || W.call(A, L);
      }
    }),
    ownerState: _
  }), I = typeof v.transition == "function" ? v.transition(_) : v.transition;
  return /* @__PURE__ */ a(
    K1,
    {
      disableAutoFocus: i,
      onClose: u,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: E ? "right" : "left"
      },
      transformOrigin: E ? G1 : H1,
      slots: {
        root: p.root,
        paper: F,
        backdrop: p.backdrop,
        transition: p.transition
      },
      slotProps: {
        root: B,
        paper: P,
        backdrop: typeof v.backdrop == "function" ? v.backdrop(_) : v.backdrop,
        transition: {
          ...I,
          onEntering: (...A) => {
            var L;
            N(...A), (L = I == null ? void 0 : I.onEntering) == null || L.call(I, ...A);
          }
        }
      },
      open: f,
      ref: n,
      transitionDuration: y,
      ownerState: _,
      ...h,
      classes: m,
      children: /* @__PURE__ */ a(g, {
        actions: T,
        autoFocus: O,
        autoFocusItem: w,
        variant: x,
        ...$,
        children: s
      })
    }
  );
});
process.env.NODE_ENV !== "production" && (If.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, or a function that returns one.
   * It's used to set the position of the menu.
   */
  anchorEl: o.oneOfType([sn, o.func]),
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
function J1(e) {
  return Ce("MuiNativeSelect", e);
}
const jl = Te("MuiNativeSelect", ["root", "select", "multiple", "filled", "outlined", "standard", "disabled", "icon", "iconOpen", "iconFilled", "iconOutlined", "iconStandard", "nativeInput", "error"]), Q1 = (e) => {
  const {
    classes: t,
    variant: n,
    disabled: r,
    multiple: i,
    open: s,
    error: l
  } = e, c = {
    select: ["select", n, r && "disabled", i && "multiple", l && "error"],
    icon: ["icon", `icon${xe(n)}`, s && "iconOpen", r && "disabled"]
  };
  return we(c, J1, t);
}, $f = oe("select", {
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
  [`&.${jl.disabled}`]: {
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
})), Z1 = oe($f, {
  name: "MuiNativeSelect",
  slot: "Select",
  shouldForwardProp: Gt,
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.select, t[n.variant], n.error && t.error, {
      [`&.${jl.multiple}`]: t.multiple
    }];
  }
})({}), Mf = oe("svg", {
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
  [`&.${jl.disabled}`]: {
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
})), eC = oe(Mf, {
  name: "MuiNativeSelect",
  slot: "Icon",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.icon, n.variant && t[`icon${xe(n.variant)}`], n.open && t.iconOpen];
  }
})({}), Af = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const {
    className: r,
    disabled: i,
    error: s,
    IconComponent: l,
    inputRef: c,
    variant: u = "standard",
    ...f
  } = t, m = {
    ...t,
    disabled: i,
    variant: u,
    error: s
  }, y = Q1(m);
  return /* @__PURE__ */ C(b.Fragment, {
    children: [/* @__PURE__ */ a(Z1, {
      ownerState: m,
      className: pe(y.select, r),
      disabled: i,
      ref: c || n,
      ...f
    }), t.multiple ? null : /* @__PURE__ */ a(eC, {
      as: l,
      ownerState: m,
      className: y.icon
    })]
  });
});
process.env.NODE_ENV !== "production" && (Af.propTypes = {
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
  inputRef: So,
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
function Df(e) {
  return Ce("MuiSelect", e);
}
const _r = Te("MuiSelect", ["root", "select", "multiple", "filled", "outlined", "standard", "disabled", "focused", "icon", "iconOpen", "nativeInput", "error"]);
var iu;
const Li = 2, tC = 400, su = 200;
function au(e, t) {
  var i;
  if (!t)
    return !1;
  if (e.composedPath().includes(t) || (i = e.target) != null && i.nodeType && t.contains(e.target))
    return !0;
  const r = t.getBoundingClientRect();
  return r.width === 0 && r.height === 0 ? !1 : e.clientX >= r.left - Li && e.clientX <= r.right + Li && e.clientY >= r.top - Li && e.clientY <= r.bottom + Li;
}
const oC = oe($f, {
  name: "MuiSelect",
  slot: "Select",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [
      // Win specificity over the input base
      {
        [`&.${_r.select}`]: t.select
      },
      {
        [`&.${_r.select}`]: t[n.variant]
      },
      {
        [`&.${_r.error}`]: t.error
      },
      {
        [`&.${_r.multiple}`]: t.multiple
      }
    ];
  }
})({
  // Win specificity over the input base
  [`&.${_r.select}`]: {
    height: "auto",
    // Resets for multiple select with chips
    minHeight: "1.4375em",
    // Required for select\text-field height consistency
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
  }
}), nC = oe(Mf, {
  name: "MuiSelect",
  slot: "Icon",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.icon, n.open && t.iconOpen];
  }
})({}), rC = oe("input", {
  shouldForwardProp: (e) => Bp(e) && e !== "classes",
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
}), iC = (e) => {
  const {
    classes: t,
    variant: n,
    disabled: r,
    multiple: i,
    open: s,
    error: l
  } = e;
  return we({
    select: ["select", n, r && "disabled", i && "multiple", l && "error"],
    icon: ["icon", s && "iconOpen", r && "disabled"],
    nativeInput: ["nativeInput"]
  }, Df, t);
}, Bf = /* @__PURE__ */ b.forwardRef(function(t, n) {
  var Be, ct, po, fo;
  const {
    "aria-describedby": r,
    "aria-label": i,
    autoFocus: s,
    autoWidth: l,
    children: c,
    className: u,
    defaultOpen: f,
    defaultValue: m,
    disabled: y,
    displayEmpty: x,
    error: p = !1,
    IconComponent: v,
    inputRef: h,
    labelId: E,
    MenuProps: _ = {},
    multiple: k,
    name: O,
    onBlur: w,
    onChange: T,
    onClose: N,
    onFocus: M,
    // eslint-disable-next-line react/prop-types
    onKeyDown: D,
    // eslint-disable-next-line react/prop-types
    onMouseDown: B,
    onOpen: F,
    open: P,
    readOnly: g,
    renderValue: $,
    required: I,
    SelectDisplayProps: A = {},
    tabIndex: L,
    // catching `type` from Input which makes no sense for SelectInput
    type: W,
    value: q,
    variant: ie = "standard",
    ...z
  } = t, [V, Q] = ri({
    controlled: q,
    default: m,
    name: "Select"
  }), [re, ee] = ri({
    controlled: P,
    default: f,
    name: "Select"
  }), G = b.useRef(null), K = b.useRef(null), Y = b.useRef(null), U = b.useRef(!1), te = b.useRef(!1), ne = b.useRef(null), ge = b.useRef(!1), j = b.useRef({
    allowSelectedMouseUp: !1,
    allowUnselectedMouseUp: !1
  }), fe = tn(), se = tn(), [ke, Fe] = b.useState(null), {
    current: Z
  } = b.useRef(P != null), [Me, Ee] = b.useState(), [Ue, Re] = b.useState(null), Ge = Ct(n, h), je = b.useCallback((ue) => {
    K.current = ue, ue && Fe(ue);
  }, []), Pe = ke == null ? void 0 : ke.parentNode;
  b.useImperativeHandle(Ge, () => ({
    focus: () => {
      K.current.focus();
    },
    node: G.current,
    value: V
  }), [V]);
  const le = ke !== null && re;
  It(() => {
    U.current = le;
  }, [le]);
  const ze = b.useCallback(() => {
    fe.clear(), se.clear();
  }, [fe, se]), Ke = b.useCallback(() => {
    ze(), ge.current = !1, j.current = {
      allowSelectedMouseUp: !1,
      allowUnselectedMouseUp: !1
    };
  }, [ze]), He = b.useCallback(() => {
    ne.current && (ne.current(), ne.current = null);
  }, []);
  b.useEffect(() => {
    le || (Ke(), He());
  }, [le, Ke, He]), b.useEffect(() => () => {
    Ke(), He();
  }, [Ke, He]), b.useEffect(() => {
    if (!le || !Pe || l || typeof ResizeObserver > "u")
      return;
    const ue = new ResizeObserver(() => {
      Ee(Pe.clientWidth);
    });
    return ue.observe(Pe), () => {
      ue.disconnect();
    };
  }, [le, Pe, l]), b.useEffect(() => {
    f && re && ke && !Z && (Ee(l ? null : Pe.clientWidth), K.current.focus());
  }, [ke, l]), b.useEffect(() => {
    s && K.current.focus();
  }, [s]), b.useEffect(() => {
    if (!E)
      return;
    const ue = $t(K.current).getElementById(E);
    if (ue) {
      const Ie = () => {
        getSelection().isCollapsed && K.current.focus();
      };
      return ue.addEventListener("click", Ie), () => {
        ue.removeEventListener("click", Ie);
      };
    }
  }, [E]);
  const Rt = Dt((ue, Ie) => {
    ue || (Ke(), He()), ue ? (Re(O1(Ie)), F && F(Ie)) : (Re(null), N && N(Ie)), Z || (U.current = ue, Ee(l ? null : Pe.clientWidth), ee(ue));
  }), me = () => {
    Ke(), te.current ? se.start(su, () => {
      j.current.allowUnselectedMouseUp = !0, fe.start(su, () => {
        j.current.allowSelectedMouseUp = !0;
      });
    }) : fe.start(tC, () => {
      j.current.allowSelectedMouseUp = !0, j.current.allowUnselectedMouseUp = !0;
    });
  }, Ae = (ue) => {
    if (B == null || B(ue), ue.button !== 0)
      return;
    ue.preventDefault(), K.current.focus();
    const Ie = $t(ue.currentTarget);
    me(), He();
    const qe = (Nt) => {
      ne.current = null, K.current && (au(Nt, K.current) || au(Nt, Y.current) || !U.current && Z || Rt(!1, Nt));
    };
    Ie.addEventListener("mouseup", qe, {
      capture: !0,
      once: !0
    }), ne.current = () => {
      Ie.removeEventListener("mouseup", qe, !0);
    }, Rt(!0, ue);
  }, lt = (ue) => {
    Rt(!1, ue);
  }, We = b.Children.toArray(c), _e = (ue) => {
    const Ie = We.find((qe) => qe.props.value === ue.target.value);
    Ie !== void 0 && (Q(Ie.props.value), T && T(ue, Ie));
  }, no = (ue) => (Ie) => {
    ge.current = !1;
    let qe;
    if (Ie.currentTarget.hasAttribute("tabindex")) {
      if (k) {
        qe = Array.isArray(V) ? V.slice() : [];
        const Nt = V.indexOf(ue.props.value);
        Nt === -1 ? qe.push(ue.props.value) : qe.splice(Nt, 1);
      } else
        qe = ue.props.value;
      if (ue.props.onClick && ue.props.onClick(Ie), V !== qe && (Q(qe), T)) {
        const Nt = Ie.nativeEvent || Ie, Tt = new Nt.constructor(Nt.type, Nt);
        Object.defineProperty(Tt, "target", {
          writable: !0,
          value: {
            value: qe,
            name: O
          }
        }), T(Tt, ue);
      }
      k || Rt(!1, Ie);
    }
  }, Jt = (ue, Ie) => (qe) => {
    var gr, br;
    if ((br = (gr = ue.props).onMouseUp) == null || br.call(gr, qe), ge.current) {
      ge.current = !1;
      return;
    }
    const Nt = !j.current.allowSelectedMouseUp && Ie, Tt = !j.current.allowUnselectedMouseUp && !Ie;
    Nt || Tt || qe.currentTarget.click();
  }, hn = (ue) => {
    g || ([
      " ",
      "ArrowUp",
      "ArrowDown",
      // The native select doesn't respond to enter on macOS, but it's recommended by
      // https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
      "Enter"
    ].includes(ue.key) && (ue.preventDefault(), Rt(!0, ue)), D == null || D(ue));
  }, Ao = (ue) => {
    !le && w && (Object.defineProperty(ue, "target", {
      writable: !0,
      value: {
        value: V,
        name: O
      }
    }), w(ue));
  };
  delete z["aria-invalid"];
  let he, Je;
  const Wt = [];
  let To = !1, ro = !1;
  (xs({
    value: V
  }) || x) && ($ ? he = $(V) : To = !0);
  const ln = We.map((ue) => {
    if (!/* @__PURE__ */ b.isValidElement(ue))
      return null;
    process.env.NODE_ENV !== "production" && Nn.isFragment(ue) && console.error(["MUI: The Select component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`));
    let Ie;
    if (k) {
      if (!Array.isArray(V))
        throw new Error(process.env.NODE_ENV !== "production" ? "MUI: The `value` prop must be an array when using the `Select` component with `multiple`." : nn(2));
      Ie = V.some((qe) => tu(qe, ue.props.value)), Ie && To && Wt.push(ue.props.children);
    } else
      Ie = tu(V, ue.props.value), Ie && To && (Je = ue.props.children);
    return Ie && (ro = !0), /* @__PURE__ */ b.cloneElement(ue, {
      "aria-selected": Ie ? "true" : "false",
      onMouseDown: (qe) => {
        var Nt, Tt;
        ge.current = !0, (Tt = (Nt = ue.props).onMouseDown) == null || Tt.call(Nt, qe);
      },
      onPointerDown: (qe) => {
        var Nt, Tt;
        ge.current = !0, (Tt = (Nt = ue.props).onPointerDown) == null || Tt.call(Nt, qe);
      },
      onClick: no(ue),
      onMouseUp: Jt(ue, Ie),
      onKeyUp: (qe) => {
        qe.key === " " && qe.preventDefault(), ue.props.onKeyUp && ue.props.onKeyUp(qe);
      },
      role: "option",
      selected: Ie,
      value: void 0,
      // The value is most likely not a valid HTML attribute.
      "data-value": ue.props.value
      // Instead, we provide it as a data attribute.
    });
  });
  It(() => {
    te.current = ro;
  }, [ro]), process.env.NODE_ENV !== "production" && b.useEffect(() => {
    if (!ro && !k && V !== "") {
      const ue = We.map((Ie) => Ie.props.value);
      console.warn([`MUI: You have provided an out-of-range value \`${V}\` for the select ${O ? `(name="${O}") ` : ""}component.`, "Consider providing a value that matches one of the available options or ''.", `The available values are ${ue.filter((Ie) => Ie != null).map((Ie) => `\`${Ie}\``).join(", ") || '""'}.`].join(`
`));
    }
  }, [ro, We, k, O, V]), To && (k ? Wt.length === 0 ? he = null : he = Wt.reduce((ue, Ie, qe) => (ue.push(Ie), qe < Wt.length - 1 && ue.push(", "), ue), []) : he = Je);
  let co = Me;
  !l && Z && ke && (co = Pe.clientWidth);
  let uo;
  typeof L < "u" ? uo = L : uo = y ? null : 0;
  const wo = A.id || (O ? `mui-component-select-${O}` : void 0), Ht = {
    ...t,
    variant: ie,
    value: V,
    open: le,
    error: p
  }, gn = iC(Ht), Qt = typeof ((Be = _.slotProps) == null ? void 0 : Be.paper) == "function" ? _.slotProps.paper(Ht) : (ct = _.slotProps) == null ? void 0 : ct.paper, Mn = Ct(Qt == null ? void 0 : Qt.ref, Y), de = typeof ((po = _.slotProps) == null ? void 0 : po.list) == "function" ? _.slotProps.list(Ht) : (fo = _.slotProps) == null ? void 0 : fo.list, ae = rn(), Se = rn();
  return /* @__PURE__ */ C(b.Fragment, {
    children: [/* @__PURE__ */ a(oC, {
      as: "div",
      ref: je,
      tabIndex: uo,
      role: "combobox",
      "aria-controls": le ? ae : void 0,
      "aria-disabled": y ? "true" : void 0,
      "aria-expanded": le ? "true" : "false",
      "aria-haspopup": "listbox",
      "aria-label": i,
      "aria-labelledby": E,
      "aria-describedby": r,
      "aria-required": I ? "true" : void 0,
      "aria-invalid": p ? "true" : void 0,
      onKeyDown: hn,
      onMouseDown: y || g ? null : Ae,
      onBlur: Ao,
      onFocus: M,
      ...A,
      ownerState: Ht,
      className: pe(A.className, gn.select, u),
      id: wo,
      children: R1(he) ? (
        // notranslate needed while Google Translate will not fix zero-width space issue
        iu || (iu = /* @__PURE__ */ a("span", {
          className: "notranslate",
          "aria-hidden": !0,
          children: "​"
        }))
      ) : he
    }), /* @__PURE__ */ a(rC, {
      "aria-invalid": p,
      value: Array.isArray(V) ? V.join(",") : V,
      name: O,
      ref: G,
      "aria-hidden": !0,
      onChange: _e,
      tabIndex: -1,
      disabled: y,
      className: gn.nativeInput,
      autoFocus: s,
      required: I,
      ...z,
      id: z.id ?? Se,
      ownerState: Ht
    }), /* @__PURE__ */ a(nC, {
      as: v,
      className: gn.icon,
      ownerState: Ht
    }), /* @__PURE__ */ a(_1, {
      value: Ue,
      children: /* @__PURE__ */ a(If, {
        id: `menu-${O || ""}`,
        anchorEl: Pe,
        open: le,
        onClose: lt,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center"
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "center"
        },
        ..._,
        slotProps: {
          ..._.slotProps,
          list: {
            "aria-labelledby": E,
            role: "listbox",
            "aria-multiselectable": k ? "true" : void 0,
            disableListWrap: !0,
            id: ae,
            ...de
          },
          paper: {
            ...Qt,
            ref: Mn,
            style: {
              minWidth: co,
              ...Qt == null ? void 0 : Qt.style
            }
          }
        },
        children: ln
      })
    })]
  });
});
process.env.NODE_ENV !== "production" && (Bf.propTypes = {
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
  inputRef: So,
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
const sC = at(/* @__PURE__ */ a("path", {
  d: "M7 10l5 5 5-5z"
}), "ArrowDropDown");
function Fi(e) {
  return parseInt(e, 10) || 0;
}
const aC = {
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
function lC(e) {
  for (const t in e)
    return !1;
  return !0;
}
function lu(e) {
  return lC(e) || e.outerHeightStyle === 0 && !e.overflowing;
}
const Lf = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const {
    onChange: r,
    maxRows: i,
    minRows: s = 1,
    style: l,
    value: c,
    ...u
  } = t, {
    current: f
  } = b.useRef(c != null), m = b.useRef(null), y = Ct(n, m), x = b.useRef(null), p = b.useRef(null), v = b.useCallback(() => {
    const O = m.current, w = p.current;
    if (!O || !w)
      return;
    const N = Po(O).getComputedStyle(O);
    if (N.width === "0px")
      return {
        outerHeightStyle: 0,
        overflowing: !1
      };
    w.style.width = N.width, w.value = O.value || t.placeholder || "x", w.value.slice(-1) === `
` && (w.value += " ");
    const M = N.boxSizing, D = Fi(N.paddingBottom) + Fi(N.paddingTop), B = Fi(N.borderBottomWidth) + Fi(N.borderTopWidth), F = w.scrollHeight;
    w.value = "x";
    const P = w.scrollHeight;
    let g = F;
    s && (g = Math.max(Number(s) * P, g)), i && (g = Math.min(Number(i) * P, g)), g = Math.max(g, P);
    const $ = g + (M === "border-box" ? D + B : 0), I = Math.abs(g - F) <= 1;
    return {
      outerHeightStyle: $,
      overflowing: I
    };
  }, [i, s, t.placeholder]), h = Dt(() => {
    const O = m.current, w = v();
    if (!O || !w || lu(w))
      return !1;
    const T = w.outerHeightStyle;
    return x.current != null && x.current !== T;
  }), E = b.useCallback(() => {
    const O = m.current, w = v();
    if (!O || !w || lu(w))
      return;
    const T = w.outerHeightStyle;
    x.current !== T && (x.current = T, O.style.height = `${T}px`), O.style.overflow = w.overflowing ? "hidden" : "";
  }, [v]), _ = b.useRef(-1);
  It(() => {
    const O = Xs(E), w = m == null ? void 0 : m.current;
    if (!w)
      return;
    const T = Po(w);
    T.addEventListener("resize", O);
    let N;
    return typeof ResizeObserver < "u" && (N = new ResizeObserver(() => {
      h() && (N.unobserve(w), cancelAnimationFrame(_.current), E(), _.current = requestAnimationFrame(() => {
        N.observe(w);
      }));
    }), N.observe(w)), () => {
      O.clear(), cancelAnimationFrame(_.current), T.removeEventListener("resize", O), N && N.disconnect();
    };
  }, [v, E, h]), It(() => {
    E();
  });
  const k = (O) => {
    f || E();
    const w = O.target, T = w.value.length, N = w.value.endsWith(`
`), M = w.selectionStart === T;
    N && M && w.setSelectionRange(T, T), r && r(O);
  };
  return /* @__PURE__ */ C(b.Fragment, {
    children: [/* @__PURE__ */ a("textarea", {
      value: c,
      onChange: k,
      ref: y,
      rows: s,
      style: l,
      ...u
    }), /* @__PURE__ */ a("textarea", {
      "aria-hidden": !0,
      className: t.className,
      readOnly: !0,
      ref: p,
      tabIndex: -1,
      style: {
        ...aC.shadow,
        ...l,
        paddingTop: 0,
        paddingBottom: 0
      }
    })]
  });
});
process.env.NODE_ENV !== "production" && (Lf.propTypes = {
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
function cC(e) {
  return Ce("MuiInputBase", e);
}
const rr = Te("MuiInputBase", ["root", "formControl", "focused", "disabled", "adornedStart", "adornedEnd", "error", "sizeSmall", "multiline", "colorSecondary", "fullWidth", "hiddenLabel", "readOnly", "input", "inputTypeSearch"]);
var cu;
const tl = "mui-auto-fill", Cs = "mui-auto-fill-cancel", Qs = (e, t) => {
  const {
    ownerState: n
  } = e;
  return [t.root, n.formControl && t.formControl, n.startAdornment && t.adornedStart, n.endAdornment && t.adornedEnd, n.error && t.error, n.size === "small" && t.sizeSmall, n.multiline && t.multiline, n.color && t[`color${xe(n.color)}`], n.fullWidth && t.fullWidth, n.hiddenLabel && t.hiddenLabel];
}, Zs = (e, t) => {
  const {
    ownerState: n
  } = e;
  return [t.input, n.type === "search" && t.inputTypeSearch];
}, dC = (e) => {
  const {
    classes: t,
    color: n,
    disabled: r,
    error: i,
    endAdornment: s,
    focused: l,
    formControl: c,
    fullWidth: u,
    hiddenLabel: f,
    multiline: m,
    readOnly: y,
    size: x,
    startAdornment: p,
    type: v
  } = e, h = {
    root: ["root", `color${xe(n)}`, r && "disabled", i && "error", u && "fullWidth", l && "focused", c && "formControl", x && x !== "medium" && `size${xe(x)}`, m && "multiline", p && "adornedStart", s && "adornedEnd", f && "hiddenLabel", y && "readOnly"],
    input: ["input", r && "disabled", v === "search" && "inputTypeSearch", y && "readOnly"]
  };
  return we(h, cC, t);
}, ea = oe("div", {
  name: "MuiInputBase",
  slot: "Root",
  overridesResolver: Qs
})($e(({
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
  [`&.${rr.disabled}`]: {
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
}))), ta = oe("input", {
  name: "MuiInputBase",
  slot: "Input",
  overridesResolver: Zs
})($e(({
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
    [`label[data-shrink=false] + .${rr.formControl} &`]: {
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
    [`&.${rr.disabled}`]: {
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
        animationName: Cs,
        animationDuration: "10ms",
        "&:-webkit-autofill": {
          animationDuration: "5000s",
          animationName: tl
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
})), du = _l({
  // Keep keyframes non-empty for Emotion production builds. Animation properties are ignored
  // inside keyframes, avoiding the visible display animation triggered by Chrome 117+.
  [`@keyframes ${tl}`]: {
    from: {
      animationName: tl
    }
  },
  [`@keyframes ${Cs}`]: {
    from: {
      animationName: Cs
    }
  }
}), oa = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiInputBase"
  }), {
    "aria-describedby": i,
    "aria-label": s,
    autoComplete: l,
    autoFocus: c,
    className: u,
    color: f,
    defaultValue: m,
    disabled: y,
    disableInjectingGlobalStyles: x,
    endAdornment: p,
    error: v,
    fullWidth: h = !1,
    id: E,
    inputComponent: _ = "input",
    inputProps: k = {},
    inputRef: O,
    margin: w,
    maxRows: T,
    minRows: N,
    multiline: M = !1,
    name: D,
    onBlur: B,
    onChange: F,
    onClick: P,
    onFocus: g,
    onKeyDown: $,
    onKeyUp: I,
    placeholder: A,
    readOnly: L,
    renderSuffix: W,
    rows: q,
    size: ie,
    slotProps: z = {},
    slots: V = {},
    startAdornment: Q,
    type: re = "text",
    value: ee,
    ...G
  } = r, K = k.value != null ? k.value : ee, {
    current: Y
  } = b.useRef(K != null), U = b.useRef(), te = b.useCallback((me) => {
    process.env.NODE_ENV !== "production" && me && me.nodeName !== "INPUT" && !me.focus && console.error(["MUI: You have provided a `inputComponent` to the input component", "that does not correctly handle the `ref` prop.", "Make sure the `ref` prop is called with a HTMLInputElement."].join(`
`));
  }, []), ne = Ct(U, O, k.ref, te), [ge, j] = b.useState(!1), [fe, se] = fr({
    props: r,
    states: ["color", "disabled", "error", "hiddenLabel", "size", "required", "filled"]
  });
  process.env.NODE_ENV !== "production" && b.useEffect(() => {
    if (se)
      return se.registerEffect();
  }, [se]), fe.focused = se ? se.focused : ge, b.useEffect(() => {
    !se && y && ge && (j(!1), B && B());
  }, [se, y, ge, B]);
  const ke = se && se.onFilled, Fe = se && se.onEmpty, Z = b.useCallback((me) => {
    xs(me) ? ke && ke() : Fe && Fe();
  }, [ke, Fe]);
  It(() => {
    Y && Z({
      value: K
    });
  }, [K, Z, Y]), It(() => {
    if (!c)
      return;
    const me = U.current;
    if (!me)
      return;
    const Ae = $t(me), lt = zo(Ae), We = lt == null || lt === Ae.body || lt === Ae.documentElement;
    me === lt ? se && se.onFocus ? se.onFocus() : j(!0) : We && me.focus();
  }, [c]);
  const Me = (me) => {
    g && g(me), k.onFocus && k.onFocus(me), se && se.onFocus ? se.onFocus(me) : j(!0);
  }, Ee = (me) => {
    B && B(me), k.onBlur && k.onBlur(me), se && se.onBlur ? se.onBlur(me) : j(!1);
  }, Ue = (me, ...Ae) => {
    if (!Y) {
      const lt = me.target || U.current;
      if (lt == null)
        throw new Error(process.env.NODE_ENV !== "production" ? "MUI: Expected valid input target. Did you use a custom `inputComponent` and forget to forward refs? See https://mui.com/r/input-component-ref-interface for more info." : nn(1));
      Z({
        value: lt.value
      });
    }
    k.onChange && k.onChange(me, ...Ae), F && F(me, ...Ae);
  };
  b.useEffect(() => {
    Z(U.current);
  }, []);
  const Re = (me) => {
    U.current && me.currentTarget === me.target && U.current.focus(), P && P(me);
  };
  let Ge = _, je = k;
  M && Ge === "input" && (q ? (process.env.NODE_ENV !== "production" && (N || T) && console.warn("MUI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set."), je = {
    type: void 0,
    minRows: q,
    maxRows: q,
    ...je
  }) : je = {
    type: void 0,
    maxRows: T,
    minRows: N,
    ...je
  }, Ge = Lf);
  const Pe = (me) => {
    Z(me.animationName === Cs ? U.current : {
      value: "x"
    });
  };
  b.useEffect(() => {
    se && se.setAdornedStart(!!Q);
  }, [se, Q]);
  const le = {
    ...r,
    color: fe.color || "primary",
    disabled: fe.disabled,
    endAdornment: p,
    error: fe.error,
    focused: fe.focused,
    formControl: se,
    fullWidth: h,
    hiddenLabel: fe.hiddenLabel,
    multiline: M,
    size: fe.size,
    startAdornment: Q,
    type: re
  }, ze = dC(le), Ke = V.root || ea, He = z.root || {}, Rt = V.input || ta;
  return je = {
    ...je,
    ...z.input
  }, /* @__PURE__ */ C(b.Fragment, {
    children: [!x && typeof du == "function" && // For Emotion/Styled-components, InputGlobalStyles will be a function
    // For Pigment CSS, this has no effect because the InputGlobalStyles will be null.
    (cu || (cu = /* @__PURE__ */ a(du, {}))), /* @__PURE__ */ C(Ke, {
      ...He,
      ref: n,
      onClick: Re,
      ...G,
      ...!ms(Ke) && {
        ownerState: {
          ...le,
          ...He.ownerState
        }
      },
      className: pe(ze.root, He.className, u, L && "MuiInputBase-readOnly"),
      children: [Q, /* @__PURE__ */ a(bi.Provider, {
        value: null,
        children: /* @__PURE__ */ a(Rt, {
          "aria-invalid": fe.error,
          "aria-describedby": i,
          "aria-label": s,
          autoComplete: l,
          autoFocus: c,
          defaultValue: m,
          disabled: fe.disabled,
          id: E,
          onAnimationStart: Pe,
          name: D,
          placeholder: A,
          readOnly: L,
          required: fe.required,
          rows: q,
          value: K,
          onKeyDown: $,
          onKeyUp: I,
          type: re,
          ...je,
          ...!ms(Rt) && {
            as: Ge,
            ownerState: {
              ...le,
              ...je.ownerState
            }
          },
          ref: ne,
          className: pe(ze.input, je.className, L && "MuiInputBase-readOnly"),
          onBlur: Ee,
          onChange: Ue,
          onFocus: Me
        })
      }), p, W ? W({
        ...fe,
        startAdornment: Q
      }) : null]
    })]
  });
});
process.env.NODE_ENV !== "production" && (oa.propTypes = {
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
  inputComponent: Pl,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#attributes) applied to the `input` element.
   * @default {}
   */
  inputProps: o.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: So,
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
function uC(e) {
  return Ce("MuiInput", e);
}
const Nr = {
  ...rr,
  ...Te("MuiInput", ["root", "underline", "input"])
}, pC = (e) => {
  const {
    classes: t,
    disableUnderline: n
  } = e, i = we({
    root: ["root", !n && "underline"],
    input: ["input"]
  }, uC, t);
  return {
    ...t,
    // forward classes to the InputBase
    ...i
  };
}, fC = oe(ea, {
  shouldForwardProp: (e) => Gt(e) || e === "classes",
  name: "MuiInput",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [...Qs(e, t), !n.disableUnderline && t.underline];
  }
})($e(({
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
        [`label + &, .${c1.root} + &`]: {
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
        [`&.${Nr.focused}:after`]: {
          // translateX(0) is a workaround for Safari transform scale bug
          // See https://github.com/mui/material-ui/issues/31766
          transform: "scaleX(1) translateX(0)"
        },
        [`&.${Nr.error}`]: {
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
        [`&:hover:not(.${Nr.disabled}, .${Nr.error}):before`]: {
          borderBottom: `2px solid ${(e.vars || e).palette.text.primary}`,
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            borderBottom: `1px solid ${n}`
          }
        },
        [`&.${Nr.disabled}:before`]: {
          borderBottomStyle: "dotted"
        }
      }
    }, ...Object.entries(e.palette).filter(Ft()).map(([r]) => ({
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
})), mC = oe(ta, {
  name: "MuiInput",
  slot: "Input",
  overridesResolver: Zs
})({}), na = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiInput"
  }), {
    disableUnderline: i = !1,
    fullWidth: s = !1,
    inputComponent: l = "input",
    multiline: c = !1,
    notched: u,
    // declare here to prevent spreading to DOM
    slotProps: f,
    slots: m = {},
    type: y = "text",
    ...x
  } = r, p = pC(r), h = {
    root: {
      ownerState: {
        disableUnderline: i
      }
    }
  }, E = f ? jt(f, h) : h, _ = m.root ?? fC, k = m.input ?? mC;
  return /* @__PURE__ */ a(oa, {
    slots: {
      root: _,
      input: k
    },
    slotProps: E,
    fullWidth: s,
    inputComponent: l,
    multiline: c,
    ref: n,
    type: y,
    ...x,
    classes: p
  });
});
process.env.NODE_ENV !== "production" && (na.propTypes = {
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
  inputRef: So,
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
na.muiName = "Input";
function hC(e) {
  return Ce("MuiFilledInput", e);
}
const Sn = {
  ...rr,
  ...Te("MuiFilledInput", ["root", "underline", "input", "adornedStart", "adornedEnd", "sizeSmall", "multiline", "hiddenLabel"])
}, gC = (e) => {
  const {
    classes: t,
    disableUnderline: n,
    startAdornment: r,
    endAdornment: i,
    size: s,
    hiddenLabel: l,
    multiline: c
  } = e, u = {
    root: ["root", !n && "underline", r && "adornedStart", i && "adornedEnd", s === "small" && `size${xe(s)}`, l && "hiddenLabel", c && "multiline"],
    input: ["input"]
  }, f = we(u, hC, t);
  return {
    ...t,
    // forward classes to the InputBase
    ...f
  };
}, bC = oe(ea, {
  shouldForwardProp: (e) => Gt(e) || e === "classes",
  name: "MuiFilledInput",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [...Qs(e, t), !n.disableUnderline && t.underline];
  }
})($e(({
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
    [`&.${Sn.focused}`]: {
      backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : r
    },
    [`&.${Sn.disabled}`]: {
      backgroundColor: e.vars ? e.vars.palette.FilledInput.disabledBg : s
    },
    variants: [{
      props: ({
        ownerState: l
      }) => !l.disableUnderline,
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
        [`&.${Sn.focused}:after`]: {
          // translateX(0) is a workaround for Safari transform scale bug
          // See https://github.com/mui/material-ui/issues/31766
          transform: "scaleX(1) translateX(0)"
        },
        [`&.${Sn.error}`]: {
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
        [`&:hover:not(.${Sn.disabled}, .${Sn.error}):before`]: {
          borderBottom: `1px solid ${(e.vars || e).palette.text.primary}`
        },
        [`&.${Sn.disabled}:before`]: {
          borderBottomStyle: "dotted"
        }
      }
    }, ...Object.entries(e.palette).filter(Ft()).map(([l]) => {
      var c;
      return {
        props: {
          disableUnderline: !1,
          color: l
        },
        style: {
          "&::after": {
            borderBottom: `2px solid ${(c = (e.vars || e).palette[l]) == null ? void 0 : c.main}`
          }
        }
      };
    }), {
      props: ({
        ownerState: l
      }) => l.startAdornment,
      style: {
        paddingLeft: 12
      }
    }, {
      props: ({
        ownerState: l
      }) => l.endAdornment,
      style: {
        paddingRight: 12
      }
    }, {
      props: ({
        ownerState: l
      }) => l.multiline,
      style: {
        padding: "25px 12px 8px"
      }
    }, {
      props: ({
        ownerState: l,
        size: c
      }) => l.multiline && c === "small",
      style: {
        paddingTop: 21,
        paddingBottom: 4
      }
    }, {
      props: ({
        ownerState: l
      }) => l.multiline && l.hiddenLabel,
      style: {
        paddingTop: 16,
        paddingBottom: 17
      }
    }, {
      props: ({
        ownerState: l
      }) => l.multiline && l.hiddenLabel && l.size === "small",
      style: {
        paddingTop: 8,
        paddingBottom: 9
      }
    }]
  };
})), yC = oe(ta, {
  name: "MuiFilledInput",
  slot: "Input",
  overridesResolver: Zs
})($e(({
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
}))), ra = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiFilledInput"
  }), {
    disableUnderline: i = !1,
    fullWidth: s = !1,
    hiddenLabel: l,
    // declare here to prevent spreading to DOM
    inputComponent: c = "input",
    multiline: u = !1,
    notched: f,
    // declare here to prevent spreading to DOM
    slotProps: m,
    slots: y = {},
    type: x = "text",
    ...p
  } = r, v = {
    ...r,
    disableUnderline: i,
    fullWidth: s,
    inputComponent: c,
    multiline: u,
    type: x
  }, h = gC(r), E = {
    root: {
      ownerState: v
    },
    input: {
      ownerState: v
    }
  }, _ = m ? jt(E, m) : E, k = y.root ?? bC, O = y.input ?? yC;
  return /* @__PURE__ */ a(oa, {
    slots: {
      root: k,
      input: O
    },
    slotProps: _,
    fullWidth: s,
    inputComponent: c,
    multiline: u,
    ref: n,
    type: x,
    ...p,
    classes: h
  });
});
process.env.NODE_ENV !== "production" && (ra.propTypes = {
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
  inputRef: So,
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
ra.muiName = "Input";
var uu;
const vC = oe("fieldset", {
  name: "MuiNotchedOutlined",
  shouldForwardProp: Gt
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
}), xC = oe("legend", {
  name: "MuiNotchedOutlined",
  shouldForwardProp: Gt
})($e(({
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
function Ff(e) {
  const {
    children: t,
    classes: n,
    className: r,
    label: i,
    notched: s,
    ...l
  } = e, c = i != null && i !== "", u = {
    ...e,
    notched: s,
    withLabel: c
  };
  return /* @__PURE__ */ a(vC, {
    "aria-hidden": !0,
    className: r,
    ownerState: u,
    ...l,
    children: /* @__PURE__ */ a(xC, {
      ownerState: u,
      children: c ? /* @__PURE__ */ a("span", {
        children: i
      }) : (
        // notranslate needed while Google Translate will not fix zero-width space issue
        uu || (uu = /* @__PURE__ */ a("span", {
          className: "notranslate",
          "aria-hidden": !0,
          children: "​"
        }))
      )
    })
  });
}
process.env.NODE_ENV !== "production" && (Ff.propTypes = {
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
function CC(e) {
  return Ce("MuiOutlinedInput", e);
}
const Bo = {
  ...rr,
  ...Te("MuiOutlinedInput", ["root", "notchedOutline", "input"])
}, SC = (e) => {
  const {
    classes: t
  } = e, r = we({
    root: ["root"],
    notchedOutline: ["notchedOutline"],
    input: ["input"]
  }, CC, t);
  return {
    ...t,
    // forward classes to the InputBase
    ...r
  };
}, TC = oe(ea, {
  shouldForwardProp: (e) => Gt(e) || e === "classes",
  name: "MuiOutlinedInput",
  slot: "Root",
  overridesResolver: Qs
})($e(({
  theme: e
}) => {
  const t = e.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";
  return {
    position: "relative",
    borderRadius: (e.vars || e).shape.borderRadius,
    [`&:hover .${Bo.notchedOutline}`]: {
      borderColor: (e.vars || e).palette.text.primary
    },
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      [`&:hover .${Bo.notchedOutline}`]: {
        borderColor: e.vars ? e.alpha(e.vars.palette.common.onBackground, 0.23) : t
      }
    },
    [`&.${Bo.focused} .${Bo.notchedOutline}`]: {
      borderWidth: 2
    },
    variants: [...Object.entries(e.palette).filter(Ft()).map(([n]) => ({
      props: {
        color: n
      },
      style: {
        [`&.${Bo.focused} .${Bo.notchedOutline}`]: {
          borderColor: (e.vars || e).palette[n].main
        }
      }
    })), {
      props: {},
      // to override the above style
      style: {
        [`&.${Bo.error} .${Bo.notchedOutline}`]: {
          borderColor: (e.vars || e).palette.error.main
        },
        [`&.${Bo.disabled} .${Bo.notchedOutline}`]: {
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
})), wC = oe(Ff, {
  name: "MuiOutlinedInput",
  slot: "NotchedOutline"
})($e(({
  theme: e
}) => {
  const t = e.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";
  return {
    borderColor: e.vars ? e.alpha(e.vars.palette.common.onBackground, 0.23) : t
  };
})), EC = oe(ta, {
  name: "MuiOutlinedInput",
  slot: "Input",
  overridesResolver: Zs
})($e(({
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
}))), ia = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiOutlinedInput"
  }), {
    fullWidth: i = !1,
    inputComponent: s = "input",
    label: l,
    multiline: c = !1,
    notched: u,
    slots: f = {},
    slotProps: m = {},
    type: y = "text",
    ...x
  } = r, p = SC(r), [v, h] = fr({
    props: r,
    states: ["color", "disabled", "error", "focused", "hiddenLabel", "size", "required"]
  }), E = {
    ...r,
    color: v.color || "primary",
    disabled: v.disabled,
    error: v.error,
    focused: v.focused,
    formControl: h,
    fullWidth: i,
    hiddenLabel: v.hiddenLabel,
    multiline: c,
    size: v.size,
    type: y
  }, _ = f.root ?? TC, k = f.input ?? EC, [O, w] = ye("notchedOutline", {
    elementType: wC,
    className: p.notchedOutline,
    shouldForwardComponentProp: !0,
    ownerState: E,
    externalForwardedProps: {
      slots: f,
      slotProps: m
    },
    additionalProps: {
      label: l != null && l !== "" && v.required ? /* @__PURE__ */ C(b.Fragment, {
        children: [l, " ", "*"]
      }) : l
    }
  });
  return /* @__PURE__ */ a(oa, {
    slots: {
      root: _,
      input: k
    },
    slotProps: m,
    renderSuffix: (T) => /* @__PURE__ */ a(O, {
      ...w,
      notched: typeof u < "u" ? u : !!(T.startAdornment || T.filled || T.focused)
    }),
    fullWidth: i,
    inputComponent: s,
    multiline: c,
    ref: n,
    type: y,
    ...x,
    classes: {
      ...p,
      notchedOutline: null
    }
  });
});
process.env.NODE_ENV !== "production" && (ia.propTypes = {
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
  inputRef: So,
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
ia.muiName = "Input";
const OC = (e) => {
  const {
    classes: t
  } = e, r = we({
    root: ["root"]
  }, Df, t);
  return {
    ...t,
    ...r
  };
}, Wl = {
  name: "MuiSelect",
  slot: "Root",
  shouldForwardProp: (e) => Gt(e) && e !== "variant"
}, RC = oe(na, Wl)(""), _C = oe(ia, Wl)(""), NC = oe(ra, Wl)(""), Ut = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    name: "MuiSelect",
    props: t
  }), {
    autoWidth: i = !1,
    children: s,
    classes: l = {},
    className: c,
    defaultOpen: u = !1,
    displayEmpty: f = !1,
    IconComponent: m = sC,
    id: y,
    input: x,
    inputProps: p,
    label: v,
    labelId: h,
    MenuProps: E,
    multiple: _ = !1,
    native: k = !1,
    onClose: O,
    onOpen: w,
    open: T,
    renderValue: N,
    SelectDisplayProps: M,
    variant: D = "outlined",
    ...B
  } = r, F = k ? Af : Bf, [P] = fr({
    props: r,
    states: ["variant", "error"]
  }), g = P.variant || D, $ = {
    ...r,
    variant: g,
    classes: l
  }, I = OC($), {
    root: A,
    ...L
  } = I, W = x || {
    standard: /* @__PURE__ */ a(RC, {
      ownerState: $
    }),
    outlined: /* @__PURE__ */ a(_C, {
      label: v,
      ownerState: $
    }),
    filled: /* @__PURE__ */ a(NC, {
      ownerState: $
    })
  }[g], q = Ct(n, hr(W));
  return /* @__PURE__ */ a(b.Fragment, {
    children: /* @__PURE__ */ b.cloneElement(W, {
      // Most of the logic is implemented in `SelectInput`.
      // The `Select` component is a simple API wrapper to expose something better to play with.
      inputComponent: F,
      inputProps: {
        children: s,
        error: P.error,
        IconComponent: m,
        variant: g,
        type: void 0,
        // We render a select. We can ignore the type provided by the `Input`.
        multiple: _,
        ...k ? {
          id: y
        } : {
          autoWidth: i,
          defaultOpen: u,
          displayEmpty: f,
          labelId: h,
          MenuProps: E,
          onClose: O,
          onOpen: w,
          open: T,
          renderValue: N,
          SelectDisplayProps: {
            id: y,
            ...M
          }
        },
        ...p,
        classes: p ? jt(L, p.classes) : L,
        ...x ? x.props.inputProps : {}
      },
      ...(_ && k || f) && g === "outlined" ? {
        notched: !0
      } : {},
      ref: q,
      className: pe(W.props.className, c, I.root),
      // If a custom input is provided via 'input' prop, do not allow 'variant' to be propagated to it's root element. See https://github.com/mui/material-ui/issues/33894.
      ...!x && {
        variant: g
      },
      ...B
    })
  });
});
process.env.NODE_ENV !== "production" && (Ut.propTypes = {
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
Ut.muiName = "Select";
const ce = Ny({
  createStyledComponent: oe("div", {
    name: "MuiStack",
    slot: "Root"
  }),
  useThemeProps: (e) => Oe({
    props: e,
    name: "MuiStack"
  })
});
process.env.NODE_ENV !== "production" && (ce.propTypes = {
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
function kC(e) {
  return Ce("MuiTab", e);
}
const No = Te("MuiTab", ["root", "labelIcon", "textColorInherit", "textColorPrimary", "textColorSecondary", "selected", "disabled", "fullWidth", "wrapped", "icon"]), PC = (e) => {
  const {
    classes: t,
    textColor: n,
    fullWidth: r,
    wrapped: i,
    icon: s,
    label: l,
    selected: c,
    disabled: u
  } = e, f = {
    root: ["root", s && l && "labelIcon", `textColor${xe(n)}`, r && "fullWidth", i && "wrapped", c && "selected", u && "disabled"],
    icon: ["icon"]
  };
  return we(f, kC, t);
}, IC = oe(Io, {
  name: "MuiTab",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.label && n.icon && t.labelIcon, t[`textColor${xe(n.textColor)}`], n.fullWidth && t.fullWidth, n.wrapped && t.wrapped, {
      [`& .${No.icon}`]: t.icon
    }];
  }
})($e(({
  theme: e
}) => ({
  ...e.typography.button,
  maxWidth: 360,
  minWidth: 90,
  position: "relative",
  minHeight: 48,
  flexShrink: 0,
  padding: "12px 16px",
  overflow: "hidden",
  whiteSpace: "normal",
  textAlign: "center",
  lineHeight: 1.25,
  variants: [{
    props: ({
      ownerState: t
    }) => t.label && (t.iconPosition === "top" || t.iconPosition === "bottom"),
    style: {
      flexDirection: "column"
    }
  }, {
    props: ({
      ownerState: t
    }) => t.label && t.iconPosition !== "top" && t.iconPosition !== "bottom",
    style: {
      flexDirection: "row"
    }
  }, {
    props: ({
      ownerState: t
    }) => t.icon && t.label,
    style: {
      minHeight: 72,
      paddingTop: 9,
      paddingBottom: 9
    }
  }, {
    props: ({
      ownerState: t,
      iconPosition: n
    }) => t.icon && t.label && n === "top",
    style: {
      [`& > .${No.icon}`]: {
        marginBottom: 6
      }
    }
  }, {
    props: ({
      ownerState: t,
      iconPosition: n
    }) => t.icon && t.label && n === "bottom",
    style: {
      [`& > .${No.icon}`]: {
        marginTop: 6
      }
    }
  }, {
    props: ({
      ownerState: t,
      iconPosition: n
    }) => t.icon && t.label && n === "start",
    style: {
      [`& > .${No.icon}`]: {
        marginRight: e.spacing(1)
      }
    }
  }, {
    props: ({
      ownerState: t,
      iconPosition: n
    }) => t.icon && t.label && n === "end",
    style: {
      [`& > .${No.icon}`]: {
        marginLeft: e.spacing(1)
      }
    }
  }, {
    props: {
      textColor: "inherit"
    },
    style: {
      color: "inherit",
      opacity: 0.6,
      // same opacity as theme.palette.text.secondary
      [`&.${No.selected}`]: {
        opacity: 1
      },
      [`&.${No.disabled}`]: {
        opacity: (e.vars || e).palette.action.disabledOpacity
      }
    }
  }, {
    props: {
      textColor: "primary"
    },
    style: {
      color: (e.vars || e).palette.text.secondary,
      [`&.${No.selected}`]: {
        color: (e.vars || e).palette.primary.main
      },
      [`&.${No.disabled}`]: {
        color: (e.vars || e).palette.text.disabled
      }
    }
  }, {
    props: {
      textColor: "secondary"
    },
    style: {
      color: (e.vars || e).palette.text.secondary,
      [`&.${No.selected}`]: {
        color: (e.vars || e).palette.secondary.main
      },
      [`&.${No.disabled}`]: {
        color: (e.vars || e).palette.text.disabled
      }
    }
  }, {
    props: ({
      ownerState: t
    }) => t.fullWidth,
    style: {
      flexShrink: 1,
      flexGrow: 1,
      flexBasis: 0,
      maxWidth: "none"
    }
  }, {
    props: ({
      ownerState: t
    }) => t.wrapped,
    style: {
      fontSize: e.typography.pxToRem(12)
    }
  }]
}))), cn = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiTab"
  }), {
    className: i,
    disabled: s = !1,
    disableFocusRipple: l = !1,
    // eslint-disable-next-line react/prop-types
    fullWidth: c,
    icon: u,
    iconPosition: f = "top",
    // eslint-disable-next-line react/prop-types
    indicator: m,
    label: y,
    onChange: x,
    onClick: p,
    onFocus: v,
    // eslint-disable-next-line react/prop-types
    selected: h,
    // eslint-disable-next-line react/prop-types
    selectionFollowsFocus: E,
    // eslint-disable-next-line react/prop-types
    textColor: _ = "inherit",
    value: k,
    wrapped: O = !1,
    ...w
  } = r, T = bf(), N = vf({
    id: k,
    ref: n,
    disabled: s,
    selected: h
  }), D = T.getItemMap().size === 0 && h ? 0 : N.tabIndex, B = {
    ...r,
    disabled: s,
    disableFocusRipple: l,
    selected: h,
    icon: !!u,
    iconPosition: f,
    label: !!y,
    fullWidth: c,
    textColor: _,
    wrapped: O
  }, F = PC(B), P = u && y && /* @__PURE__ */ b.isValidElement(u) ? /* @__PURE__ */ b.cloneElement(u, {
    className: pe(F.icon, u.props.className)
  }) : u, g = (I) => {
    !h && x && x(I, k), p && p(I);
  }, $ = (I) => {
    E && !h && x && x(I, k), v && v(I);
  };
  return /* @__PURE__ */ C(IC, {
    internalNativeButton: !0,
    focusRipple: !l,
    className: pe(F.root, i),
    ref: N.ref,
    role: "tab",
    "aria-selected": h,
    disabled: s,
    onClick: g,
    onFocus: $,
    tabIndex: D,
    ownerState: B,
    ...w,
    children: [f === "top" || f === "start" ? /* @__PURE__ */ C(b.Fragment, {
      children: [P, y]
    }) : /* @__PURE__ */ C(b.Fragment, {
      children: [y, P]
    }), m]
  });
});
process.env.NODE_ENV !== "production" && (cn.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * This prop isn't supported.
   * Use the `component` prop if you need to change the children structure.
   */
  children: Hp,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: o.object,
  /**
   * @ignore
   */
  className: o.string,
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
   * The icon to display.
   */
  icon: o.oneOfType([o.element, o.string]),
  /**
   * The position of the icon relative to the label.
   * @default 'top'
   */
  iconPosition: o.oneOf(["bottom", "end", "start", "top"]),
  /**
   * The label element.
   */
  label: o.node,
  /**
   * @ignore
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object]),
  /**
   * You can provide your own value. Otherwise, we fallback to the child position index.
   */
  value: o.any,
  /**
   * Tab labels appear in a single row.
   * They can use a second line if needed.
   * @default false
   */
  wrapped: o.bool
});
function $C(e) {
  return (1 + Math.sin(Math.PI * e - Math.PI / 2)) / 2;
}
function MC(e, t, n, r = {}, i = () => {
}) {
  const {
    ease: s = $C,
    duration: l = 300
    // standard
  } = r;
  let c = null;
  const u = t[e];
  let f = !1;
  const m = () => {
    f = !0;
  }, y = (x) => {
    if (f) {
      i(new Error("Animation cancelled"));
      return;
    }
    c === null && (c = x);
    const p = Math.min(1, (x - c) / l);
    if (t[e] = s(p) * (n - u) + u, p >= 1) {
      requestAnimationFrame(() => {
        i(null);
      });
      return;
    }
    requestAnimationFrame(y);
  };
  return u === n ? (i(new Error("Element already at target position")), m) : (requestAnimationFrame(y), m);
}
const AC = {
  width: 99,
  height: 99,
  position: "absolute",
  top: -9999,
  overflow: "scroll",
  pointerEvents: "none"
};
function jf(e) {
  const {
    onChange: t,
    ...n
  } = e, r = b.useRef(), i = b.useRef(null), s = () => {
    r.current = i.current.offsetHeight - i.current.clientHeight;
  };
  return It(() => {
    const l = Xs(() => {
      const u = r.current;
      s(), u !== r.current && t(r.current);
    }), c = Po(i.current);
    return c.addEventListener("resize", l), () => {
      l.clear(), c.removeEventListener("resize", l);
    };
  }, [t]), b.useEffect(() => {
    s(), t(r.current);
  }, [t]), /* @__PURE__ */ a("div", {
    style: AC,
    ...n,
    ref: i
  });
}
process.env.NODE_ENV !== "production" && (jf.propTypes = {
  onChange: o.func.isRequired
});
const DC = at(/* @__PURE__ */ a("path", {
  d: "M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"
}), "KeyboardArrowLeft"), BC = at(/* @__PURE__ */ a("path", {
  d: "M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"
}), "KeyboardArrowRight");
function LC(e) {
  return Ce("MuiTabScrollButton", e);
}
const FC = Te("MuiTabScrollButton", ["root", "vertical", "horizontal", "disabled"]), jC = (e) => {
  const {
    classes: t,
    orientation: n,
    disabled: r
  } = e;
  return we({
    root: ["root", n, r && "disabled"]
  }, LC, t);
}, WC = oe(Io, {
  name: "MuiTabScrollButton",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.orientation && t[n.orientation]];
  }
})({
  width: 40,
  flexShrink: 0,
  opacity: 0.8,
  [`&.${FC.disabled}`]: {
    opacity: 0
  },
  variants: [{
    props: {
      orientation: "vertical"
    },
    style: {
      width: "100%",
      height: 40,
      "& svg": {
        transform: "var(--TabScrollButton-svgRotate)"
      }
    }
  }]
}), Wf = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiTabScrollButton"
  }), {
    className: i,
    slots: s = {},
    slotProps: l = {},
    direction: c,
    orientation: u,
    disabled: f,
    ...m
  } = r, {
    nativeButton: y,
    ...x
  } = m, p = qs(), v = {
    isRtl: p,
    ...r
  }, h = jC(v), E = s.StartScrollButtonIcon ?? DC, _ = s.EndScrollButtonIcon ?? BC, k = nr({
    elementType: E,
    externalSlotProps: l.startScrollButtonIcon,
    additionalProps: {
      fontSize: "small"
    },
    ownerState: v
  }), O = nr({
    elementType: _,
    externalSlotProps: l.endScrollButtonIcon,
    additionalProps: {
      fontSize: "small"
    },
    ownerState: v
  });
  return /* @__PURE__ */ a(WC, {
    component: "div",
    className: pe(h.root, i),
    ref: n,
    role: null,
    ownerState: v,
    tabIndex: null,
    ...x,
    style: {
      ...x.style,
      ...u === "vertical" && {
        "--TabScrollButton-svgRotate": `rotate(${p ? -90 : 90}deg)`
      }
    },
    children: c === "left" ? /* @__PURE__ */ a(E, {
      ...k
    }) : /* @__PURE__ */ a(_, {
      ...O
    })
  });
});
process.env.NODE_ENV !== "production" && (Wf.propTypes = {
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
   * The direction the button should indicate.
   */
  direction: o.oneOf(["left", "right"]).isRequired,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: o.bool,
  /**
   * The component orientation (layout flow direction).
   */
  orientation: o.oneOf(["horizontal", "vertical"]).isRequired,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   * @default {}
   */
  slotProps: o.shape({
    endScrollButtonIcon: o.oneOfType([o.func, o.object]),
    startScrollButtonIcon: o.oneOfType([o.func, o.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: o.shape({
    EndScrollButtonIcon: o.elementType,
    StartScrollButtonIcon: o.elementType
  }),
  /**
   * @ignore
   */
  style: o.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object])
});
function zC(e) {
  return Ce("MuiTabs", e);
}
const Oa = Te("MuiTabs", ["root", "vertical", "list", "centered", "scroller", "fixed", "scrollableX", "scrollableY", "hideScrollbar", "scrollButtons", "scrollButtonsHideMobile", "indicator"]), VC = (e) => {
  const {
    vertical: t,
    fixed: n,
    hideScrollbar: r,
    scrollableX: i,
    scrollableY: s,
    centered: l,
    scrollButtonsHideMobile: c,
    classes: u
  } = e;
  return we({
    root: ["root", t && "vertical"],
    scroller: ["scroller", n && "fixed", r && "hideScrollbar", i && "scrollableX", s && "scrollableY"],
    list: ["list", t && "vertical", l && "centered"],
    indicator: ["indicator"],
    scrollButtons: ["scrollButtons", c && "scrollButtonsHideMobile"],
    scrollableX: [i && "scrollableX"],
    hideScrollbar: [r && "hideScrollbar"]
  }, zC, u);
}, UC = oe("div", {
  name: "MuiTabs",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [{
      [`& .${Oa.scrollButtons}`]: t.scrollButtons
    }, {
      [`& .${Oa.scrollButtons}`]: n.scrollButtonsHideMobile && t.scrollButtonsHideMobile
    }, t.root, n.vertical && t.vertical];
  }
})($e(({
  theme: e
}) => ({
  overflow: "hidden",
  minHeight: 48,
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: "touch",
  display: "flex",
  variants: [{
    props: ({
      ownerState: t
    }) => t.vertical,
    style: {
      flexDirection: "column"
    }
  }, {
    props: ({
      ownerState: t
    }) => t.scrollButtonsHideMobile,
    style: {
      [`& .${Oa.scrollButtons}`]: {
        [e.breakpoints.down("sm")]: {
          display: "none"
        }
      }
    }
  }]
}))), GC = oe("div", {
  name: "MuiTabs",
  slot: "Scroller",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.scroller, n.fixed && t.fixed, n.hideScrollbar && t.hideScrollbar, n.scrollableX && t.scrollableX, n.scrollableY && t.scrollableY];
  }
})({
  position: "relative",
  display: "inline-block",
  flex: "1 1 auto",
  whiteSpace: "nowrap",
  variants: [{
    props: ({
      ownerState: e
    }) => e.fixed,
    style: {
      overflowX: "hidden",
      width: "100%"
    }
  }, {
    props: ({
      ownerState: e
    }) => e.hideScrollbar,
    style: {
      // Hide dimensionless scrollbar on macOS
      scrollbarWidth: "none",
      // Firefox
      "&::-webkit-scrollbar": {
        display: "none"
        // Safari + Chrome
      }
    }
  }, {
    props: ({
      ownerState: e
    }) => e.scrollableX,
    style: {
      overflowX: "auto",
      overflowY: "hidden"
    }
  }, {
    props: ({
      ownerState: e
    }) => e.scrollableY,
    style: {
      overflowY: "auto",
      overflowX: "hidden"
    }
  }]
}), HC = oe("div", {
  name: "MuiTabs",
  slot: "List",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.list, n.centered && t.centered];
  }
})({
  display: "flex",
  variants: [{
    props: ({
      ownerState: e
    }) => e.vertical,
    style: {
      flexDirection: "column"
    }
  }, {
    props: ({
      ownerState: e
    }) => e.centered,
    style: {
      justifyContent: "center"
    }
  }]
}), qC = oe("span", {
  name: "MuiTabs",
  slot: "Indicator"
})($e(({
  theme: e
}) => ({
  position: "absolute",
  height: 2,
  bottom: 0,
  width: "100%",
  transition: e.transitions.create(),
  variants: [{
    props: {
      indicatorColor: "primary"
    },
    style: {
      backgroundColor: (e.vars || e).palette.primary.main
    }
  }, {
    props: {
      indicatorColor: "secondary"
    },
    style: {
      backgroundColor: (e.vars || e).palette.secondary.main
    }
  }, {
    props: ({
      ownerState: t
    }) => t.vertical,
    style: {
      height: "100%",
      width: 2,
      right: 0
    }
  }]
}))), KC = oe(jf)({
  overflowX: "auto",
  overflowY: "hidden",
  // Hide dimensionless scrollbar on macOS
  scrollbarWidth: "none",
  // Firefox
  "&::-webkit-scrollbar": {
    display: "none"
    // Safari + Chrome
  }
}), pu = {};
let fu = !1;
const Ss = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiTabs"
  }), i = $n(), s = qs(), {
    "aria-label": l,
    "aria-labelledby": c,
    action: u,
    centered: f = !1,
    children: m,
    className: y,
    component: x = "div",
    allowScrollButtonsMobile: p = !1,
    indicatorColor: v = "primary",
    onChange: h,
    orientation: E = "horizontal",
    scrollButtons: _ = "auto",
    selectionFollowsFocus: k,
    slots: O = {},
    slotProps: w = {},
    textColor: T = "primary",
    value: N,
    variant: M = "standard",
    visibleScrollbar: D = !1,
    ...B
  } = r, F = M === "scrollable", P = E === "vertical", g = P ? "scrollTop" : "scrollLeft", $ = P ? "top" : "left", I = P ? "bottom" : "right", A = P ? "clientHeight" : "clientWidth", L = P ? "height" : "width", W = {
    ...r,
    component: x,
    allowScrollButtonsMobile: p,
    indicatorColor: v,
    orientation: E,
    vertical: P,
    scrollButtons: _,
    textColor: T,
    variant: M,
    visibleScrollbar: D,
    fixed: !F,
    hideScrollbar: F && !D,
    scrollableX: F && !P,
    scrollableY: F && P,
    centered: f && !F,
    scrollButtonsHideMobile: !p
  }, q = VC(W), ie = nr({
    elementType: O.startScrollButtonIcon,
    externalSlotProps: w.startScrollButtonIcon,
    ownerState: W
  }), z = nr({
    elementType: O.endScrollButtonIcon,
    externalSlotProps: w.endScrollButtonIcon,
    ownerState: W
  });
  process.env.NODE_ENV !== "production" && f && F && console.error('MUI: You can not use the `centered={true}` and `variant="scrollable"` properties at the same time on a `Tabs` component.');
  const [V, Q] = b.useState(!1), [re, ee] = b.useState(pu), [G, K] = b.useState(!1), [Y, U] = b.useState(!1), [te, ne] = b.useState(!1), ge = N === !1 ? null : N, [j, fe] = b.useState(!1), [se, ke] = b.useState({
    overflow: "hidden",
    scrollbarWidth: 0
  }), Fe = /* @__PURE__ */ new Map(), Z = b.useRef(null), Me = b.useRef(null), Ee = {
    slots: O,
    slotProps: w
  }, Ue = () => {
    const de = Z.current;
    let ae;
    if (de) {
      const Be = de.getBoundingClientRect();
      ae = {
        clientWidth: de.clientWidth,
        scrollLeft: de.scrollLeft,
        scrollTop: de.scrollTop,
        scrollWidth: de.scrollWidth,
        top: Be.top,
        bottom: Be.bottom,
        left: Be.left,
        right: Be.right
      };
    }
    let Se;
    if (de && N !== !1) {
      const Be = Me.current.children;
      if (Be.length > 0) {
        const ct = Be[Fe.get(N)];
        process.env.NODE_ENV !== "production" && (ct || console.error(["MUI: The `value` provided to the Tabs component is invalid.", `None of the Tabs' children match with "${N}".`, Fe.keys ? `You can provide one of the following values: ${Array.from(Fe.keys()).join(", ")}.` : null].join(`
`))), Se = ct ? ct.getBoundingClientRect() : null, process.env.NODE_ENV !== "production" && yi() && !fu && Se && Se.width === 0 && Se.height === 0 && // if the whole Tabs component is hidden, don't warn
        ae.clientWidth !== 0 && (ae = null, console.error(["MUI: The `value` provided to the Tabs component is invalid.", `The Tab with this \`value\` ("${N}") is not part of the document layout.`, "Make sure the tab item is present in the document or that it's not `display: none`."].join(`
`)), fu = !0);
      }
    }
    return {
      tabsMeta: ae,
      tabMeta: Se
    };
  }, Re = Dt(() => {
    const {
      tabsMeta: de,
      tabMeta: ae
    } = Ue();
    let Se = 0, Be;
    P ? (Be = "top", ae && de && (Se = ae.top - de.top + de.scrollTop)) : (Be = s ? "right" : "left", ae && de && (Se = (s ? -1 : 1) * (ae[Be] - de[Be] + de.scrollLeft)));
    const ct = {
      [Be]: Se,
      // May be wrong until the font is loaded.
      [L]: ae ? ae[L] : 0
    };
    if (typeof re[Be] != "number" || typeof re[L] != "number")
      ee(ct);
    else {
      const po = Math.abs(re[Be] - ct[Be]), fo = Math.abs(re[L] - ct[L]);
      (po >= 1 || fo >= 1) && ee(ct);
    }
  }), Ge = (de, {
    animation: ae = !0
  } = {}) => {
    ae ? MC(g, Z.current, de, {
      duration: i.transitions.duration.standard
    }) : Z.current[g] = de;
  }, je = (de) => {
    let ae = Z.current[g];
    P ? ae += de : ae += de * (s ? -1 : 1), Ge(ae);
  }, Pe = () => {
    const de = Z.current[A];
    let ae = 0;
    const Se = Array.from(Me.current.children);
    for (let Be = 0; Be < Se.length; Be += 1) {
      const ct = Se[Be];
      if (ae + ct[A] > de) {
        Be === 0 && (ae = de);
        break;
      }
      ae += ct[A];
    }
    return ae;
  }, le = () => {
    je(-1 * Pe());
  }, ze = () => {
    je(Pe());
  }, [Ke, {
    onChange: He,
    ...Rt
  }] = ye("scrollbar", {
    className: pe(q.scrollableX, q.hideScrollbar),
    elementType: KC,
    shouldForwardComponentProp: !0,
    externalForwardedProps: Ee,
    ownerState: W
  }), me = b.useCallback((de) => {
    He == null || He(de), ke({
      overflow: null,
      scrollbarWidth: de
    });
  }, [He]), [Ae, lt] = ye("scrollButtons", {
    className: q.scrollButtons,
    elementType: Wf,
    externalForwardedProps: Ee,
    ownerState: W,
    additionalProps: {
      orientation: E,
      slots: {
        StartScrollButtonIcon: O.startScrollButtonIcon,
        EndScrollButtonIcon: O.endScrollButtonIcon
      },
      slotProps: {
        startScrollButtonIcon: ie,
        endScrollButtonIcon: z
      }
    }
  }), We = () => {
    const de = {};
    de.scrollbarSizeListener = F ? /* @__PURE__ */ a(Ke, {
      ...Rt,
      onChange: me
    }) : null;
    const Se = F && (_ === "auto" && (G || Y) || _ === !0);
    return de.scrollButtonStart = Se ? /* @__PURE__ */ a(Ae, {
      direction: s ? "right" : "left",
      onClick: le,
      disabled: !G,
      ...lt
    }) : null, de.scrollButtonEnd = Se ? /* @__PURE__ */ a(Ae, {
      direction: s ? "left" : "right",
      onClick: ze,
      disabled: !Y,
      ...lt
    }) : null, de;
  }, _e = Dt((de) => {
    const {
      tabsMeta: ae,
      tabMeta: Se
    } = Ue();
    if (!(!Se || !ae)) {
      if (Se[$] < ae[$]) {
        const Be = ae[g] + (Se[$] - ae[$]);
        Ge(Be, {
          animation: de
        });
      } else if (Se[I] > ae[I]) {
        const Be = ae[g] + (Se[I] - ae[I]);
        Ge(Be, {
          animation: de
        });
      }
    }
  }), no = Dt(() => {
    F && _ !== !1 && ne(!te);
  });
  b.useEffect(() => {
    const de = Xs(() => {
      Z.current && Re();
    });
    let ae;
    const Se = (po) => {
      po.forEach((fo) => {
        fo.removedNodes.forEach((ue) => {
          ae == null || ae.unobserve(ue);
        }), fo.addedNodes.forEach((ue) => {
          ae == null || ae.observe(ue);
        });
      }), de(), no();
    }, Be = Po(Z.current);
    Be.addEventListener("resize", de);
    let ct;
    return typeof ResizeObserver < "u" && (ae = new ResizeObserver(de), Array.from(Me.current.children).forEach((po) => {
      ae.observe(po);
    })), typeof MutationObserver < "u" && (ct = new MutationObserver(Se), ct.observe(Me.current, {
      childList: !0
    })), () => {
      de.clear(), Be.removeEventListener("resize", de), ct == null || ct.disconnect(), ae == null || ae.disconnect();
    };
  }, [Re, no]), b.useEffect(() => {
    const de = Array.from(Me.current.children), ae = de.length;
    if (typeof IntersectionObserver < "u" && ae > 0 && F && _ !== !1) {
      const Se = de[0], Be = de[ae - 1], ct = {
        root: Z.current,
        threshold: 0.99
      }, po = (qe) => {
        K(!qe[0].isIntersecting);
      }, fo = new IntersectionObserver(po, ct);
      fo.observe(Se);
      const ue = (qe) => {
        U(!qe[0].isIntersecting);
      }, Ie = new IntersectionObserver(ue, ct);
      return Ie.observe(Be), () => {
        fo.disconnect(), Ie.disconnect();
      };
    }
  }, [F, _, te, m == null ? void 0 : m.length]), b.useEffect(() => {
    Q(!0);
  }, []), b.useEffect(() => {
    Re();
  }), b.useEffect(() => {
    _e(pu !== re);
  }, [_e, re]), b.useImperativeHandle(u, () => ({
    updateIndicator: Re,
    updateScrollButtons: no
  }), [Re, no]);
  const [Jt, hn] = ye("indicator", {
    className: q.indicator,
    elementType: qC,
    externalForwardedProps: Ee,
    ownerState: W,
    additionalProps: {
      style: re
    }
  }), Ao = /* @__PURE__ */ a(Jt, {
    ...hn
  }), he = yf({
    activeItemId: j ? void 0 : ge,
    orientation: E,
    isRtl: s
  }), Je = he.getContainerProps(), To = b.Children.toArray(m).filter(b.isValidElement).map((de, ae) => {
    const Se = de.props.value === void 0 ? ae : de.props.value;
    return process.env.NODE_ENV !== "production" && Nn.isFragment(de) && console.error(["MUI: The Tabs component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), Fe.set(Se, ae), {
      child: de,
      index: ae,
      childValue: Se
    };
  }).map(({
    child: de,
    childValue: ae
  }) => {
    const Se = ae === N;
    return /* @__PURE__ */ b.cloneElement(de, {
      fullWidth: M === "fullWidth",
      indicator: Se && !V && Ao,
      selected: Se,
      selectionFollowsFocus: k,
      onChange: h,
      textColor: T,
      value: ae
    });
  }), ro = We(), [ln, co] = ye("root", {
    ref: n,
    className: pe(q.root, y),
    elementType: UC,
    externalForwardedProps: {
      ...Ee,
      ...B,
      component: x
    },
    ownerState: W
  }), [uo, wo] = ye("scroller", {
    ref: Z,
    className: q.scroller,
    elementType: GC,
    externalForwardedProps: Ee,
    ownerState: W,
    additionalProps: {
      style: {
        overflow: se.overflow,
        [P ? `margin${s ? "Left" : "Right"}` : "marginBottom"]: D ? void 0 : -se.scrollbarWidth
      }
    }
  }), Ht = Ct(Je.ref, Me), gn = (de) => {
    const ae = Me.current, Se = zo($t(ae));
    (Se == null ? void 0 : Se.getAttribute("role")) === "tab" && Je.onKeyDown(de);
  }, [Qt, Mn] = ye("list", {
    ref: Ht,
    className: q.list,
    elementType: HC,
    externalForwardedProps: Ee,
    ownerState: W,
    getSlotProps: (de) => ({
      ...de,
      onBlur: (ae) => {
        var Se;
        ys(ae.currentTarget, ae.relatedTarget) || fe(!1), (Se = de.onBlur) == null || Se.call(de, ae);
      },
      onKeyDown: (ae) => {
        var Se;
        gn(ae), (Se = de.onKeyDown) == null || Se.call(de, ae);
      },
      onFocus: (ae) => {
        var Se;
        fe(!0), Je.onFocus(ae), (Se = de.onFocus) == null || Se.call(de, ae);
      }
    })
  });
  return /* @__PURE__ */ C(ln, {
    ...co,
    children: [ro.scrollButtonStart, ro.scrollbarSizeListener, /* @__PURE__ */ C(uo, {
      ...wo,
      children: [/* @__PURE__ */ a(Qt, {
        "aria-label": l,
        "aria-labelledby": c,
        "aria-orientation": E === "vertical" ? "vertical" : null,
        role: "tablist",
        ...Mn,
        children: /* @__PURE__ */ a(Js.Provider, {
          value: he,
          children: To
        })
      }), V && Ao]
    }), ro.scrollButtonEnd]
  });
});
process.env.NODE_ENV !== "production" && (Ss.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Callback fired when the component mounts.
   * This is useful when you want to trigger an action programmatically.
   * It supports two actions: `updateIndicator()` and `updateScrollButtons()`
   *
   * @param {object} actions This object contains all possible actions
   * that can be triggered programmatically.
   */
  action: So,
  /**
   * If `true`, the scroll buttons aren't forced hidden on mobile.
   * By default the scroll buttons are hidden on mobile and takes precedence over `scrollButtons`.
   * @default false
   */
  allowScrollButtonsMobile: o.bool,
  /**
   * The label for the Tabs as a string.
   */
  "aria-label": o.string,
  /**
   * An id or list of ids separated by a space that label the Tabs.
   */
  "aria-labelledby": o.string,
  /**
   * If `true`, the tabs are centered.
   * This prop is intended for large views.
   * @default false
   */
  centered: o.bool,
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
   * Determines the color of the indicator.
   * @default 'primary'
   */
  indicatorColor: o.oneOfType([o.oneOf(["primary", "secondary"]), o.string]),
  /**
   * Callback fired when the value changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {any} value We default to the index of the child (number)
   */
  onChange: o.func,
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: o.oneOf(["horizontal", "vertical"]),
  /**
   * Determine behavior of scroll buttons when tabs are set to scroll:
   *
   * - `auto` will only present them when not all the items are visible.
   * - `true` will always present them.
   * - `false` will never present them.
   *
   * By default the scroll buttons are hidden on mobile.
   * This behavior can be disabled with `allowScrollButtonsMobile`.
   * @default 'auto'
   */
  scrollButtons: o.oneOf(["auto", !1, !0]),
  /**
   * If `true` the selected tab changes on focus. Otherwise it only
   * changes on activation.
   */
  selectionFollowsFocus: o.bool,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: o.shape({
    endScrollButtonIcon: o.oneOfType([o.func, o.object]),
    indicator: o.oneOfType([o.func, o.object]),
    list: o.oneOfType([o.func, o.object]),
    root: o.oneOfType([o.func, o.object]),
    scrollbar: o.oneOfType([o.func, o.object]),
    scrollButtons: o.oneOfType([o.func, o.object]),
    scroller: o.oneOfType([o.func, o.object]),
    startScrollButtonIcon: o.oneOfType([o.func, o.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: o.shape({
    endScrollButtonIcon: o.elementType,
    indicator: o.elementType,
    list: o.elementType,
    root: o.elementType,
    scrollbar: o.elementType,
    scrollButtons: o.elementType,
    scroller: o.elementType,
    startScrollButtonIcon: o.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object]),
  /**
   * Determines the color of the `Tab`.
   * @default 'primary'
   */
  textColor: o.oneOf(["inherit", "primary", "secondary"]),
  /**
   * The value of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this prop to `false`.
   */
  value: o.any,
  /**
   * Determines additional display behavior of the tabs:
   *
   *  - `scrollable` will invoke scrolling properties and allow for horizontally
   *  scrolling (or swiping) of the tab bar.
   *  - `fullWidth` will make the tabs grow to use all the available space,
   *  which should be used for small views, like on mobile.
   *  - `standard` will render the default state.
   * @default 'standard'
   */
  variant: o.oneOf(["fullWidth", "scrollable", "standard"]),
  /**
   * If `true`, the scrollbar is visible. It can be useful when displaying
   * a long vertical list of tabs.
   * @default false
   */
  visibleScrollbar: o.bool
});
function YC(e) {
  return Ce("MuiTextField", e);
}
Te("MuiTextField", ["root"]);
const XC = {
  standard: na,
  filled: ra,
  outlined: ia
}, JC = (e) => {
  const {
    classes: t
  } = e;
  return we({
    root: ["root"]
  }, YC, t);
}, QC = oe(Yt, {
  name: "MuiTextField",
  slot: "Root"
})({}), De = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiTextField"
  }), {
    autoComplete: i,
    autoFocus: s = !1,
    children: l,
    className: c,
    color: u = "primary",
    defaultValue: f,
    disabled: m = !1,
    error: y = !1,
    fullWidth: x = !1,
    helperText: p,
    id: v,
    inputRef: h,
    label: E,
    maxRows: _,
    minRows: k,
    multiline: O = !1,
    name: w,
    onBlur: T,
    onChange: N,
    onFocus: M,
    placeholder: D,
    required: B = !1,
    rows: F,
    select: P = !1,
    slots: g = {},
    slotProps: $ = {},
    type: I,
    value: A,
    variant: L = "outlined",
    ...W
  } = r, q = {
    ...r,
    autoFocus: s,
    color: u,
    disabled: m,
    error: y,
    fullWidth: x,
    multiline: O,
    required: B,
    select: P,
    variant: L
  }, ie = JC(q);
  process.env.NODE_ENV !== "production" && P && !l && console.error("MUI: `children` must be passed when using the `TextField` component with `select`.");
  const z = rn(v), V = p && z ? `${z}-helper-text` : void 0, Q = E && z ? `${z}-label` : void 0, re = XC[L], ee = {
    slots: g,
    slotProps: $
  }, [G, K] = ye("select", {
    elementType: Ut,
    externalForwardedProps: ee,
    ownerState: q
  }), Y = P && K.native, U = {}, te = ee.slotProps.inputLabel;
  L === "outlined" && (te && typeof te.shrink < "u" && (U.notched = te.shrink), U.label = E), P && (Y || (U.id = void 0), U["aria-describedby"] = void 0);
  const [ne, ge] = ye("root", {
    elementType: QC,
    shouldForwardComponentProp: !0,
    externalForwardedProps: {
      ...ee,
      ...W
    },
    ownerState: q,
    className: pe(ie.root, c),
    ref: n,
    additionalProps: {
      disabled: m,
      error: y,
      fullWidth: x,
      required: B,
      color: u,
      variant: L
    }
  }), [j, fe] = ye("input", {
    elementType: re,
    externalForwardedProps: ee,
    additionalProps: U,
    ownerState: q
  }), [se, ke] = ye("inputLabel", {
    elementType: Xt,
    externalForwardedProps: ee,
    ownerState: q
  }), [Fe, Z] = ye("htmlInput", {
    elementType: "input",
    externalForwardedProps: ee,
    ownerState: q
  }), [Me, Ee] = ye("formHelperText", {
    elementType: Gr,
    externalForwardedProps: ee,
    ownerState: q
  }), Ue = /* @__PURE__ */ a(j, {
    "aria-describedby": V,
    autoComplete: i,
    autoFocus: s,
    defaultValue: f,
    fullWidth: x,
    multiline: O,
    name: w,
    rows: F,
    maxRows: _,
    minRows: k,
    type: I,
    value: A,
    id: z,
    inputRef: h,
    onBlur: T,
    onChange: N,
    onFocus: M,
    placeholder: D,
    inputProps: Z,
    slots: {
      input: g.htmlInput ? Fe : void 0
    },
    ...fe
  });
  return /* @__PURE__ */ C(ne, {
    ...ge,
    children: [E != null && E !== "" && /* @__PURE__ */ a(se, {
      htmlFor: P && !Y ? void 0 : z,
      id: Q,
      ...P && !Y && {
        component: "div"
      },
      ...ke,
      children: E
    }), P ? /* @__PURE__ */ a(G, {
      "aria-describedby": V,
      id: z,
      labelId: Q,
      value: A,
      input: Ue,
      ...K,
      children: l
    }) : Ue, p && /* @__PURE__ */ a(Me, {
      id: V,
      ...Ee,
      children: p
    })]
  });
});
process.env.NODE_ENV !== "production" && (De.propTypes = {
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
  inputRef: So,
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
const ZC = at(/* @__PURE__ */ a("path", {
  d: "M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"
}), "ExpandMore");
class Zn extends Error {
  constructor(t) {
    super(t), this.name = "EmbedAuthMissingError";
  }
}
class zf extends Error {
  constructor(n) {
    super("authentication required");
    An(this, "loginPath");
    this.name = "DashboardAuthRequiredError", this.loginPath = n;
  }
}
function Vf(e) {
  const t = e.startsWith("/") ? e : `/${e}`;
  window.location.assign(t);
}
let Zt = null;
function mu(e) {
  Zt = e;
}
function ol() {
  return Zt;
}
function Uf() {
  return (Zt == null ? void 0 : Zt.mode) === "component";
}
function ir() {
  const e = Zt;
  return (e == null ? void 0 : e.mode) === "embed" || (e == null ? void 0 : e.mode) === "component";
}
function eS(e) {
  const t = e.trim();
  return t === "" ? "" : t.replace(/\/$/, "");
}
function tS() {
  return Zt !== null ? Zt.httpPathPrefix : eS("");
}
function ai() {
  return ir() ? (Zt == null ? void 0 : Zt.defaultSection) ?? "servers" : "home";
}
function Pt() {
  return (Zt == null ? void 0 : Zt.mode) !== "component";
}
const Gf = "tenant_id_token";
function oS() {
  try {
    const e = window.localStorage.getItem(Gf);
    if (e === null)
      return null;
    const t = e.trim();
    return t.length > 0 ? t : null;
  } catch {
    return null;
  }
}
function Hf() {
  var t, n;
  const e = (n = (t = ol()) == null ? void 0 : t.token) == null ? void 0 : n.trim();
  return e || oS();
}
function kr(e, t) {
  const n = e[t];
  if (typeof n != "string")
    return;
  const r = n.trim();
  return r.length > 0 ? r : void 0;
}
function qf(e) {
  const t = e.split(".");
  if (t.length !== 3)
    throw new Zn("tenant_id_token is not a valid JWT");
  let n;
  try {
    n = atob(t[1].replace(/-/g, "+").replace(/_/g, "/"));
  } catch {
    throw new Zn("tenant_id_token JWT payload could not be decoded");
  }
  let r;
  try {
    r = JSON.parse(n);
  } catch {
    throw new Zn("tenant_id_token JWT payload is not valid JSON");
  }
  const i = kr(r, "tenant_id") ?? kr(r, "custom:tenant_id") ?? kr(r, "tenantId");
  return {
    email: kr(r, "email"),
    sub: kr(r, "sub"),
    tenantId: i
  };
}
function Kf() {
  var s, l;
  if (!ir())
    return {};
  const e = Hf();
  if (e === null) {
    const c = ol();
    throw (c == null ? void 0 : c.mode) === "component" ? new Zn(
      "Missing token prop — pass token to <MCPGatewayDashboard /> or set localStorage tenant_id_token"
    ) : new Zn(
      `Missing ${Gf} in localStorage — parent app must set it before loading the embed`
    );
  }
  const t = qf(e), r = ((l = (s = ol()) == null ? void 0 : s.tenantId) == null ? void 0 : l.trim()) || t.tenantId, i = {
    Authorization: `Bearer ${e}`
  };
  return r && (i["X-Tenant-ID"] = r), i;
}
function nS(e) {
  const t = e.trim();
  return t === "" ? "" : t.replace(/\/$/, "");
}
function Yf() {
  return nS(tS());
}
function rS(e) {
  const t = e.startsWith("/") ? e : `/${e}`, n = Yf();
  return n !== "" ? `${n}${t}` : t;
}
function iS(e) {
  const t = rS(e);
  if (Yf() !== "")
    return t;
  const r = "/", i = t.startsWith("/") ? t.slice(1) : t;
  return r + i;
}
async function mt(e, t) {
  const n = ir() ? Kf() : {}, r = await fetch(iS(e), {
    ...t,
    headers: {
      Accept: "application/json",
      ...n,
      ...(t == null ? void 0 : t.headers) ?? {}
    }
  }), i = await r.text(), s = r.headers.get("content-type") ?? "";
  let l;
  if (i.length > 0 && s.includes("application/json"))
    try {
      l = JSON.parse(i);
    } catch {
      l = void 0;
    }
  const c = l !== void 0 && typeof l == "object" && l !== null ? l : {};
  if (r.status === 401 && typeof c.login_path == "string" && !ir()) {
    const u = c.login_path.trim();
    if (u.length > 0)
      throw new zf(u);
  }
  if (!r.ok) {
    let u = `Request failed: ${r.status}`;
    throw typeof c.error == "string" && c.error.trim() !== "" && (u = c.error.trim()), new Error(u);
  }
  if (r.status !== 204)
    return l;
}
const Le = {
  authStatus: () => mt("/dashboard/auth-status"),
  overview: () => mt("/dashboard/overview"),
  servers: () => mt("/dashboard/servers"),
  tools: () => mt("/dashboard/tools"),
  toolGroups: () => mt("/dashboard/tool-groups"),
  promptGroups: () => mt("/dashboard/prompt-groups"),
  prompts: () => mt("/dashboard/prompts"),
  resources: () => mt("/dashboard/resources"),
  diagnostics: () => mt("/dashboard/diagnostics"),
  registerServer: (e) => mt("/dashboard/servers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(e)
  }),
  getServerConfig: (e) => mt(`/dashboard/servers/${encodeURIComponent(e)}/config`),
  updateServer: (e, t) => mt(`/dashboard/servers/${encodeURIComponent(e)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(t)
  }),
  reregisterServer: (e) => mt(
    `/dashboard/servers/${encodeURIComponent(e)}/reregister`,
    {
      method: "POST"
    }
  ),
  getOAuthSession: (e) => mt(
    `/dashboard/oauth/session/${encodeURIComponent(e)}`
  ),
  createToolGroup: (e) => mt("/dashboard/tool-groups", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(e)
  }),
  updateToolGroup: (e, t) => mt(`/dashboard/tool-groups/${encodeURIComponent(e)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(t)
  }),
  deleteToolGroup: (e) => mt(`/dashboard/tool-groups/${encodeURIComponent(e)}`, {
    method: "DELETE"
  }),
  createPromptGroup: (e) => mt("/dashboard/prompt-groups", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(e)
  }),
  updatePromptGroup: (e, t) => mt(`/dashboard/prompt-groups/${encodeURIComponent(e)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(t)
  }),
  deletePromptGroup: (e) => mt(`/dashboard/prompt-groups/${encodeURIComponent(e)}`, {
    method: "DELETE"
  }),
  deleteServer: (e) => mt(`/dashboard/servers/${encodeURIComponent(e)}`, {
    method: "DELETE"
  }),
  setServerEnabled: (e, t) => mt(`/dashboard/servers/${encodeURIComponent(e)}/enabled`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ enabled: t })
  }),
  setToolEnabled: (e, t) => mt(`/dashboard/tools/${encodeURIComponent(e)}/enabled`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ enabled: t })
  }),
  setPromptEnabled: (e, t) => mt(`/dashboard/prompts/${encodeURIComponent(e)}/enabled`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ enabled: t })
  }),
  agentApps: () => mt("/dashboard/agent-apps"),
  createAgentApp: (e) => mt("/dashboard/agent-apps", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(e)
  }),
  patchAgentApp: (e, t) => mt(`/dashboard/agent-apps/${e}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(t)
  }),
  deleteAgentApp: (e) => mt(`/dashboard/agent-apps/${e}`, {
    method: "DELETE"
  }),
  rotateAgentAppSecret: (e) => mt(`/dashboard/agent-apps/${e}/rotate-secret`, {
    method: "POST"
  })
}, sS = /* @__PURE__ */ new Set([
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
function wt(e) {
  return `#/${e}`;
}
function Vr(e, t) {
  return Xf(e, t, e.length);
}
function Xf(e, t, n) {
  if (t >= n || t >= e.length)
    return null;
  const r = e.slice(t, n).join("/");
  try {
    const i = decodeURIComponent(r);
    return i.length > 0 ? i : null;
  } catch {
    return null;
  }
}
function aS(e) {
  return e.length < 2 ? { toolGroupName: null, toolGroupFormMode: null, toolGroupEditName: null } : e[1] === "new" && e.length === 2 ? { toolGroupName: null, toolGroupFormMode: "create", toolGroupEditName: null } : e.length >= 3 && e[e.length - 1] === "edit" ? {
    toolGroupName: null,
    toolGroupFormMode: "edit",
    toolGroupEditName: Xf(e, 1, e.length - 1)
  } : {
    toolGroupName: Vr(e, 1),
    toolGroupFormMode: null,
    toolGroupEditName: null
  };
}
function ko() {
  let e = window.location.hash.replace(/^#/, "");
  e.startsWith("/") && (e = e.slice(1));
  const t = e.split("/").map((f) => f.trim()).filter((f) => f.length > 0);
  if (t.length === 0 || !sS.has(t[0]))
    return {
      section: null,
      agentAppId: null,
      serverName: null,
      toolGroupName: null,
      toolGroupFormMode: null,
      toolGroupEditName: null,
      promptGroupName: null,
      toolCanonicalName: null,
      promptCanonicalName: null
    };
  const n = t[0];
  let r = null;
  if (n === "agent_apps" && t.length >= 2) {
    const f = Number.parseInt(t[1], 10);
    Number.isFinite(f) && f > 0 && (r = f);
  }
  const i = n === "servers" ? Vr(t, 1) : null, s = n === "tool_groups" ? aS(t) : { toolGroupName: null, toolGroupFormMode: null, toolGroupEditName: null }, l = n === "prompt_groups" ? Vr(t, 1) : null, c = n === "tools" ? Vr(t, 1) : null, u = n === "prompts" ? Vr(t, 1) : null;
  return {
    section: n,
    agentAppId: n === "agent_apps" ? r : null,
    serverName: n === "servers" ? i : null,
    toolGroupName: n === "tool_groups" ? s.toolGroupName : null,
    toolGroupFormMode: n === "tool_groups" ? s.toolGroupFormMode : null,
    toolGroupEditName: n === "tool_groups" ? s.toolGroupEditName : null,
    promptGroupName: n === "prompt_groups" ? l : null,
    toolCanonicalName: n === "tools" ? c : null,
    promptCanonicalName: n === "prompts" ? u : null
  };
}
function hu() {
  return ko().section;
}
function Ra(e) {
  return `#/agent_apps/${e}`;
}
function gu(e) {
  return `#/servers/${encodeURIComponent(e)}`;
}
function Pr(e) {
  return `#/tool_groups/${encodeURIComponent(e)}`;
}
function lS() {
  return "#/tool_groups/new";
}
function cS(e) {
  return `#/tool_groups/${encodeURIComponent(e)}/edit`;
}
function ji(e) {
  return `#/prompt_groups/${encodeURIComponent(e)}`;
}
function bu(e) {
  return `#/tools/${encodeURIComponent(e)}`;
}
function yu(e) {
  return `#/prompts/${encodeURIComponent(e)}`;
}
function it(e) {
  Pt() && window.location.hash !== e && (window.location.hash = e);
}
function Lo(e, t, n) {
  Pt() && window.history.replaceState(null, "", `${e}${t}${n}`);
}
const dS = at(/* @__PURE__ */ a("path", {
  d: "M9 16.17 5.53 12.7a.996.996 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41a.996.996 0 0 0-1.41 0z"
}), "CheckRounded"), uS = at(/* @__PURE__ */ a("path", {
  d: "M15 20H5V7c0-.55-.45-1-1-1s-1 .45-1 1v13c0 1.1.9 2 2 2h10c.55 0 1-.45 1-1s-.45-1-1-1m5-4V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2m-2 0H9V4h9z"
}), "ContentCopyRounded");
function bt({
  value: e,
  ariaLabel: t = "Copy",
  title: n
}) {
  const [r, i] = Ne(!1);
  async function s() {
    try {
      await navigator.clipboard.writeText(e), i(!0), window.setTimeout(() => i(!1), 1200);
    } catch {
      i(!1);
    }
  }
  return /* @__PURE__ */ a(
    io,
    {
      "aria-label": r ? "Copied" : t,
      color: r ? "success" : "default",
      edge: "end",
      onClick: s,
      title: r ? "Copied" : n ?? t,
      type: "button",
      size: "small",
      children: r ? /* @__PURE__ */ a(dS, { fontSize: "small" }) : /* @__PURE__ */ a(uS, { fontSize: "small" })
    }
  );
}
const En = '"JetBrains Mono", "SFMono-Regular", "SF Mono", ui-monospace, monospace', pS = Ks({
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
          fontFamily: En
        },
        "button, input, textarea, select": {
          font: "inherit"
        }
      }
    }
  }
});
function zn({ emptyState: e }) {
  return /* @__PURE__ */ a(yt, { elevation: 0, variant: "outlined", sx: { borderRadius: 2, bgcolor: "#f6f8fa", p: 2 }, children: /* @__PURE__ */ C(ce, { spacing: 2, children: [
    /* @__PURE__ */ C(Ve, { children: [
      /* @__PURE__ */ a(J, { variant: "caption", sx: { letterSpacing: "0.12em", fontWeight: 600 }, children: "Empty state" }),
      /* @__PURE__ */ a(J, { variant: "h6", component: "h3", sx: { mt: 1, mb: 0 }, children: e.title }),
      /* @__PURE__ */ a(J, { color: "text.secondary", sx: { mt: 1 }, children: e.description })
    ] }),
    e.commands && e.commands.length > 0 ? /* @__PURE__ */ a(ce, { spacing: 1, children: e.commands.map((t) => /* @__PURE__ */ C(
      yt,
      {
        variant: "outlined",
        sx: { px: 1.25, py: 0.75, bgcolor: "#fff", display: "flex", alignItems: "center", gap: 1 },
        children: [
          /* @__PURE__ */ a(
            J,
            {
              component: "code",
              variant: "body2",
              sx: {
                flex: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontFamily: En
              },
              children: t
            }
          ),
          /* @__PURE__ */ a(bt, { ariaLabel: "Copy command", title: "Copy command", value: t })
        ]
      },
      t
    )) }) : null
  ] }) });
}
const fS = at(/* @__PURE__ */ a("path", {
  d: "M21 6.5c-1.66 0-3 1.34-3 3 0 .07 0 .14.01.21l-2.03.68c-.64-1.21-1.82-2.09-3.22-2.32V5.91C14.04 5.57 15 4.4 15 3c0-1.66-1.34-3-3-3S9 1.34 9 3c0 1.4.96 2.57 2.25 2.91v2.16c-1.4.23-2.58 1.11-3.22 2.32l-2.04-.68C6 9.64 6 9.57 6 9.5c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3c1.06 0 1.98-.55 2.52-1.37l2.03.68c-.2 1.29.17 2.66 1.09 3.69l-1.41 1.77Q6.66 17 6 17c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3c0-.68-.22-1.3-.6-1.8l1.41-1.77c1.36.76 3.02.75 4.37 0l1.41 1.77c-.37.5-.59 1.12-.59 1.8 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3c-.44 0-.85.09-1.23.26l-1.41-1.77c.93-1.04 1.29-2.4 1.09-3.69l2.03-.68c.53.82 1.46 1.37 2.52 1.37 1.66 0 3-1.34 3-3S22.66 6.5 21 6.5m-18 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1M6 21c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m5-18c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1m1 12c-1.38 0-2.5-1.12-2.5-2.5S10.62 10 12 10s2.5 1.12 2.5 2.5S13.38 15 12 15m6 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1m3-8.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1"
}), "HubOutlined"), Jf = at(/* @__PURE__ */ a("path", {
  d: "M19 15v4H5v-4zm1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1M7 18.5c-.82 0-1.5-.67-1.5-1.5s.68-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5M19 5v4H5V5zm1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1M7 8.5c-.82 0-1.5-.67-1.5-1.5S6.18 5.5 7 5.5s1.5.68 1.5 1.5S7.83 8.5 7 8.5"
}), "DnsOutlined"), Qf = at([/* @__PURE__ */ a("path", {
  d: "m21.67 18.17-5.3-5.3h-.99l-2.54 2.54v.99l5.3 5.3c.39.39 1.02.39 1.41 0l2.12-2.12c.39-.38.39-1.02 0-1.41m-2.83 1.42-4.24-4.24.71-.71 4.24 4.24z"
}, "0"), /* @__PURE__ */ a("path", {
  d: "m17.34 10.19 1.41-1.41 2.12 2.12c1.17-1.17 1.17-3.07 0-4.24l-3.54-3.54-1.41 1.41V1.71l-.7-.71-3.54 3.54.71.71h2.83l-1.41 1.41 1.06 1.06-2.89 2.89-4.13-4.13V5.06L4.83 2.04 2 4.87 5.03 7.9h1.41l4.13 4.13-.85.85H7.6l-5.3 5.3c-.39.39-.39 1.02 0 1.41l2.12 2.12c.39.39 1.02.39 1.41 0l5.3-5.3v-2.12l5.15-5.15zm-7.98 5.15-4.24 4.24-.71-.71 4.24-4.24z"
}, "1")], "HandymanOutlined"), Zf = at(/* @__PURE__ */ a("path", {
  d: "m11.99 18.54-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27zm0-11.47L17.74 9 12 13.47 6.26 9z"
}), "LayersOutlined"), em = at(/* @__PURE__ */ a("path", {
  d: "M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7zm12-4h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04-.39.08-.74.28-1.01.55-.18.18-.33.4-.43.64-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75M19 19H5V5h14z"
}), "AssignmentOutlined"), tm = at(/* @__PURE__ */ a("path", {
  d: "M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z"
}), "DescriptionOutlined"), mS = at(/* @__PURE__ */ a("path", {
  d: "M12 2 4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5zm6 9.09c0 4-2.55 7.7-6 8.83-3.45-1.13-6-4.82-6-8.83v-4.7l6-2.25 6 2.25z"
}), "ShieldOutlined"), hS = at([/* @__PURE__ */ a("path", {
  d: "m20.38 8.57-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44z"
}, "0"), /* @__PURE__ */ a("path", {
  d: "M10.59 15.41a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83"
}, "1")], "SpeedOutlined"), om = at(/* @__PURE__ */ a("path", {
  d: "M4 8h4V4H4zm6 12h4v-4h-4zm-6 0h4v-4H4zm0-6h4v-4H4zm6 0h4v-4h-4zm6-10v4h4V4zm-6 4h4V4h-4zm6 6h4v-4h-4zm0 6h4v-4h-4z"
}), "AppsOutlined");
function gS(e) {
  return Ce("MuiCard", e);
}
Te("MuiCard", ["root"]);
const bS = (e) => {
  const {
    classes: t
  } = e;
  return we({
    root: ["root"]
  }, gS, t);
}, yS = oe(yt, {
  name: "MuiCard",
  slot: "Root"
})({
  overflow: "hidden"
}), nm = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiCard"
  }), {
    className: i,
    raised: s = !1,
    ...l
  } = r, c = {
    ...r,
    raised: s
  }, u = bS(c);
  return /* @__PURE__ */ a(yS, {
    className: pe(u.root, i),
    elevation: s ? 8 : void 0,
    ref: n,
    ownerState: c,
    ...l
  });
});
process.env.NODE_ENV !== "production" && (nm.propTypes = {
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
  raised: qo(o.bool, (e) => e.raised && e.variant === "outlined" ? new Error('MUI: Combining `raised={true}` with `variant="outlined"` has no effect.') : null),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: o.oneOfType([o.arrayOf(o.oneOfType([o.func, o.object, o.bool])), o.func, o.object])
});
function vS(e) {
  return Ce("MuiCardContent", e);
}
Te("MuiCardContent", ["root"]);
const xS = (e) => {
  const {
    classes: t
  } = e;
  return we({
    root: ["root"]
  }, vS, t);
}, CS = oe("div", {
  name: "MuiCardContent",
  slot: "Root"
})({
  padding: 16,
  "&:last-child": {
    paddingBottom: 24
  }
}), rm = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiCardContent"
  }), {
    className: i,
    component: s = "div",
    ...l
  } = r, c = {
    ...r,
    component: s
  }, u = xS(c);
  return /* @__PURE__ */ a(CS, {
    as: s,
    className: pe(u.root, i),
    ownerState: c,
    ref: n,
    ...l
  });
});
process.env.NODE_ENV !== "production" && (rm.propTypes = {
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
const SS = at(/* @__PURE__ */ a("path", {
  d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
}), "Cancel");
function TS(e) {
  return Ce("MuiChip", e);
}
const st = Te("MuiChip", ["root", "sizeSmall", "sizeMedium", "colorDefault", "colorError", "colorInfo", "colorPrimary", "colorSecondary", "colorSuccess", "colorWarning", "disabled", "clickable", "deletable", "outlined", "filled", "avatar", "icon", "label", "deleteIcon", "focusVisible"]), wS = (e) => {
  const {
    classes: t,
    disabled: n,
    size: r,
    color: i,
    onDelete: s,
    clickable: l,
    variant: c
  } = e, u = {
    root: ["root", c, n && "disabled", `size${xe(r)}`, `color${xe(i)}`, l && "clickable", s && "deletable"],
    label: ["label"],
    avatar: ["avatar"],
    icon: ["icon"],
    deleteIcon: ["deleteIcon"]
  };
  return we(u, TS, t);
}, ES = oe("div", {
  name: "MuiChip",
  slot: "Root",
  shouldForwardProp: (e) => Gt(e) && e !== "focusableWhenDisabled" && e !== "skipFocusWhenDisabled",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e, {
      color: r,
      clickable: i,
      onDelete: s,
      size: l,
      variant: c
    } = n;
    return [{
      [`& .${st.avatar}`]: t.avatar
    }, {
      [`& .${st.icon}`]: t.icon
    }, {
      [`& .${st.deleteIcon}`]: t.deleteIcon
    }, t.root, t[`size${xe(l)}`], t[`color${xe(r)}`], i && t.clickable, s && t.deletable, t[c]];
  }
})($e(({
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
    [`&.${st.disabled}`]: {
      opacity: (e.vars || e).palette.action.disabledOpacity,
      pointerEvents: "none"
    },
    [`& .${st.avatar}`]: {
      marginLeft: 5,
      marginRight: -6,
      width: 24,
      height: 24,
      color: e.vars ? e.vars.palette.Chip.defaultAvatarColor : t,
      fontSize: e.typography.pxToRem(12)
    },
    [`& .${st.icon}`]: {
      marginLeft: 5,
      marginRight: -6
    },
    [`& .${st.deleteIcon}`]: {
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
        [`& .${st.avatar}`]: {
          color: (e.vars || e).palette.primary.contrastText,
          backgroundColor: (e.vars || e).palette.primary.dark
        }
      }
    }, {
      props: {
        color: "secondary"
      },
      style: {
        [`& .${st.avatar}`]: {
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
        [`& .${st.avatar}`]: {
          marginLeft: 4,
          marginRight: -4,
          width: 18,
          height: 18,
          fontSize: e.typography.pxToRem(10)
        },
        [`& .${st.icon}`]: {
          fontSize: 18,
          marginLeft: 4,
          marginRight: -4
        },
        [`& .${st.deleteIcon}`]: {
          fontSize: 16,
          marginRight: 4,
          marginLeft: -4
        }
      }
    }, ...Object.entries(e.palette).filter(Ft(["contrastText"])).map(([n]) => ({
      props: {
        color: n
      },
      style: {
        backgroundColor: (e.vars || e).palette[n].main,
        color: (e.vars || e).palette[n].contrastText,
        [`& .${st.deleteIcon}`]: {
          color: e.alpha((e.vars || e).palette[n].contrastText, 0.7),
          "&:hover, &:active": {
            color: (e.vars || e).palette[n].contrastText
          }
        }
      }
    })), {
      props: (n) => n.iconColor === n.color,
      style: {
        [`& .${st.icon}`]: {
          color: e.vars ? e.vars.palette.Chip.defaultIconColor : t
        }
      }
    }, {
      props: (n) => n.iconColor === n.color && n.color !== "default",
      style: {
        [`& .${st.icon}`]: {
          color: "inherit"
        }
      }
    }, {
      props: {
        onDelete: !0
      },
      style: {
        [`&.${st.focusVisible}`]: {
          backgroundColor: e.alpha((e.vars || e).palette.action.selected, `${(e.vars || e).palette.action.selectedOpacity} + ${(e.vars || e).palette.action.focusOpacity}`)
        }
      }
    }, ...Object.entries(e.palette).filter(Ft(["dark"])).map(([n]) => ({
      props: {
        color: n,
        onDelete: !0
      },
      style: {
        [`&.${st.focusVisible}`]: {
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
        [`&.${st.focusVisible}`]: {
          backgroundColor: e.alpha((e.vars || e).palette.action.selected, `${(e.vars || e).palette.action.selectedOpacity} + ${(e.vars || e).palette.action.focusOpacity}`)
        },
        "&:active": {
          boxShadow: (e.vars || e).shadows[1]
        }
      }
    }, ...Object.entries(e.palette).filter(Ft(["dark"])).map(([n]) => ({
      props: {
        color: n,
        clickable: !0
      },
      style: {
        [`&:hover, &.${st.focusVisible}`]: {
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
        [`&.${st.clickable}:hover`]: {
          backgroundColor: (e.vars || e).palette.action.hover
        },
        [`&.${st.focusVisible}`]: {
          backgroundColor: (e.vars || e).palette.action.focus
        },
        [`& .${st.avatar}`]: {
          marginLeft: 4
        },
        [`& .${st.icon}`]: {
          marginLeft: 4
        },
        [`& .${st.deleteIcon}`]: {
          marginRight: 5
        }
      }
    }, {
      props: {
        size: "small",
        variant: "outlined"
      },
      style: {
        [`& .${st.avatar}`]: {
          marginLeft: 2
        },
        [`& .${st.icon}`]: {
          marginLeft: 2
        },
        [`& .${st.deleteIcon}`]: {
          marginRight: 3
        }
      }
    }, ...Object.entries(e.palette).filter(Ft()).map(([n]) => ({
      props: {
        variant: "outlined",
        color: n
      },
      style: {
        color: (e.vars || e).palette[n].main,
        border: `1px solid ${e.alpha((e.vars || e).palette[n].main, 0.7)}`,
        [`&.${st.clickable}:hover`]: {
          backgroundColor: e.alpha((e.vars || e).palette[n].main, (e.vars || e).palette.action.hoverOpacity)
        },
        [`&.${st.focusVisible}`]: {
          backgroundColor: e.alpha((e.vars || e).palette[n].main, (e.vars || e).palette.action.focusOpacity)
        },
        [`& .${st.deleteIcon}`]: {
          color: e.alpha((e.vars || e).palette[n].main, 0.7),
          "&:hover, &:active": {
            color: (e.vars || e).palette[n].main
          }
        }
      }
    }))]
  };
})), OS = oe("span", {
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
function vu(e) {
  return e.key === "Backspace" || e.key === "Delete";
}
const li = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiChip"
  }), {
    avatar: i,
    className: s,
    clickable: l,
    color: c = "default",
    component: u,
    deleteIcon: f,
    disabled: m = !1,
    icon: y,
    label: x,
    onClick: p,
    onDelete: v,
    onKeyDown: h,
    onKeyUp: E,
    size: _ = "medium",
    variant: k = "filled",
    tabIndex: O,
    skipFocusWhenDisabled: w = !1,
    // TODO v6: Rename to `focusableWhenDisabled`.
    slots: T = {},
    slotProps: N = {},
    ...M
  } = r, {
    nativeButton: D,
    ...B
  } = M, F = b.useRef(null), P = Ct(F, n), g = (U) => {
    U.stopPropagation(), v(U);
  }, $ = (U) => {
    U.currentTarget === U.target && vu(U) && U.preventDefault(), h && h(U);
  }, I = (U) => {
    U.currentTarget === U.target && v && vu(U) && v(U), E && E(U);
  }, A = l !== !1 && p ? !0 : l, L = A || v ? Io : u || "div", W = {
    ...r,
    component: L,
    disabled: m,
    size: _,
    color: c,
    iconColor: /* @__PURE__ */ b.isValidElement(y) && y.props.color || c,
    onDelete: !!v,
    clickable: A,
    variant: k
  }, q = wS(W), ie = L === Io ? {
    component: u || "div",
    internalNativeButton: !1,
    focusVisibleClassName: q.focusVisible,
    ...v && {
      disableRipple: !0
    },
    ...D !== void 0 && {
      nativeButton: D
    }
  } : {};
  let z = null;
  v && (z = f && /* @__PURE__ */ b.isValidElement(f) ? /* @__PURE__ */ b.cloneElement(f, {
    className: pe(f.props.className, q.deleteIcon),
    onClick: g
  }) : /* @__PURE__ */ a(SS, {
    className: q.deleteIcon,
    onClick: g
  }));
  let V = null;
  i && /* @__PURE__ */ b.isValidElement(i) && (V = /* @__PURE__ */ b.cloneElement(i, {
    className: pe(q.avatar, i.props.className)
  }));
  let Q = null;
  y && /* @__PURE__ */ b.isValidElement(y) && (Q = /* @__PURE__ */ b.cloneElement(y, {
    className: pe(q.icon, y.props.className)
  })), process.env.NODE_ENV !== "production" && V && Q && console.error("MUI: The Chip component can not handle the avatar and the icon prop at the same time. Pick one.");
  const re = {
    slots: T,
    slotProps: N
  }, [ee, G] = ye("root", {
    elementType: ES,
    externalForwardedProps: {
      ...re,
      ...B
    },
    ownerState: W,
    // The `component` prop is preserved because `Chip` relies on it for internal logic. If `shouldForwardComponentProp` were `false`, `useSlot` would remove the `component` prop, potentially breaking the component's behavior.
    shouldForwardComponentProp: !0,
    ref: P,
    className: pe(q.root, s),
    additionalProps: {
      disabled: A && m ? !0 : void 0,
      tabIndex: w && m ? -1 : O,
      ...ie
    },
    getSlotProps: (U) => ({
      ...U,
      onClick: (te) => {
        var ne;
        (ne = U.onClick) == null || ne.call(U, te), p == null || p(te);
      },
      onKeyDown: (te) => {
        var ne;
        (ne = U.onKeyDown) == null || ne.call(U, te), $(te);
      },
      onKeyUp: (te) => {
        var ne;
        (ne = U.onKeyUp) == null || ne.call(U, te), I(te);
      }
    })
  }), [K, Y] = ye("label", {
    elementType: OS,
    externalForwardedProps: re,
    ownerState: W,
    className: q.label
  });
  return /* @__PURE__ */ C(ee, {
    as: L,
    ...G,
    children: [V || Q, /* @__PURE__ */ a(K, {
      ...Y,
      children: x
    }), z]
  });
});
process.env.NODE_ENV !== "production" && (li.propTypes = {
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
  children: Hp,
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
const nl = Sy({
  createStyledComponent: oe("div", {
    name: "MuiContainer",
    slot: "Root",
    overridesResolver: (e, t) => {
      const {
        ownerState: n
      } = e;
      return [t.root, t[`maxWidth${xe(String(n.maxWidth))}`], n.fixed && t.fixed, n.disableGutters && t.disableGutters];
    }
  }),
  useThemeProps: (e) => Oe({
    props: e,
    name: "MuiContainer"
  })
});
process.env.NODE_ENV !== "production" && (nl.propTypes = {
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
const RS = [
  {
    icon: fS,
    title: "One MCP endpoint",
    body: "Point Claude, Cursor, Copilot, Codex, or your own agents at a single streamable HTTP `/mcp` URL instead of juggling a separate config per server."
  },
  {
    icon: Jf,
    title: "Central registry",
    body: "Register stdio, SSE, and streamable HTTP MCP servers once. The gateway proxies calls, tracks connection health, and keeps your inventory in one Postgres-backed catalog."
  },
  {
    icon: Qf,
    title: "Unified discovery",
    body: "Tools, prompts, and resources from every server appear in one dashboard. Toggle exposure per server, tool, or prompt without redeploying clients."
  },
  {
    icon: Zf,
    title: "Tool & prompt groups",
    body: "Curate subsets of tools and MCP prompts for least-privilege access and dedicated group endpoints—ideal for shared team gateways and scoped automations."
  },
  {
    icon: em,
    title: "Prompts & resources",
    body: "Expose prompt templates and MCP resources through the same proxy as tools so assistants get a consistent, namespaced surface across backends."
  },
  {
    icon: tm,
    title: "Upstream OAuth flows",
    body: "Register servers that require OAuth without hand-rolling redirects—the dashboard coordinates authorization and stores tokens for repeatable access."
  },
  {
    icon: mS,
    title: "Operational hardening",
    body: "Optional OIDC sign-in for this console, path-prefix deployment behind reverse proxies, proxy auth for MCP traffic, and Redis-backed sessions when you scale replicas."
  },
  {
    icon: hS,
    title: "Observable by design",
    body: "Built-in health checks, diagnostics, and OpenTelemetry integration hooks so you can meter gateway traffic alongside the rest of your stack."
  }
];
function _S({
  overview: e,
  auth: t,
  onNavigate: n
}) {
  var r;
  return /* @__PURE__ */ C(ce, { spacing: 3, sx: { pb: 4 }, children: [
    /* @__PURE__ */ C(
      Ve,
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
          /* @__PURE__ */ a(
            Ve,
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
          /* @__PURE__ */ a(
            Ve,
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
          /* @__PURE__ */ C(nl, { maxWidth: "lg", sx: { position: "relative", py: { xs: 4, md: 5 }, px: { xs: 2.5, sm: 4 } }, children: [
            /* @__PURE__ */ a(
              Ve,
              {
                sx: {
                  position: "absolute",
                  top: { xs: 12, sm: 16 },
                  right: { xs: 12, sm: 20 },
                  zIndex: 2
                },
                children: t != null && t.oidc_enabled ? t.authenticated ? /* @__PURE__ */ C(ce, { direction: { xs: "column", sm: "row" }, spacing: 1, sx: { alignItems: { sm: "center" } }, children: [
                  /* @__PURE__ */ a(
                    li,
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
                  t.logout_path ? /* @__PURE__ */ a(
                    be,
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
                ] }) : t.login_path ? /* @__PURE__ */ a(
                  be,
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
            /* @__PURE__ */ C(ce, { spacing: 2.5, sx: { maxWidth: 720 }, children: [
              /* @__PURE__ */ a(J, { variant: "overline", sx: { letterSpacing: "0.12em", opacity: 0.92, fontWeight: 600 }, children: "Model Context Protocol" }),
              /* @__PURE__ */ a(
                J,
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
              /* @__PURE__ */ a(
                J,
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
              /* @__PURE__ */ C(ce, { direction: { xs: "column", sm: "row" }, spacing: 1.5, sx: { pt: 1 }, children: [
                /* @__PURE__ */ a(
                  be,
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
                /* @__PURE__ */ a(
                  be,
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
                /* @__PURE__ */ a(
                  be,
                  {
                    variant: "text",
                    size: "large",
                    onClick: () => n("tool_groups"),
                    sx: { color: "common.white", fontWeight: 600, "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } },
                    children: "Tool groups"
                  }
                ),
                /* @__PURE__ */ a(
                  be,
                  {
                    variant: "text",
                    size: "large",
                    onClick: () => n("prompt_groups"),
                    sx: { color: "common.white", fontWeight: 600, "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } },
                    children: "Prompt groups"
                  }
                ),
                /* @__PURE__ */ a(
                  be,
                  {
                    variant: "text",
                    size: "large",
                    startIcon: /* @__PURE__ */ a(om, {}),
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
    e ? /* @__PURE__ */ C(
      ce,
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
          /* @__PURE__ */ a(J, { variant: "subtitle2", color: "text.secondary", sx: { fontWeight: 600 }, children: "Live gateway snapshot" }),
          /* @__PURE__ */ C(ce, { direction: "row", spacing: 2, sx: { flexWrap: "wrap" }, children: [
            /* @__PURE__ */ a(Wi, { label: "Servers", value: e.server_count }),
            /* @__PURE__ */ a(Wi, { label: "Tools", value: e.tool_count }),
            /* @__PURE__ */ a(Wi, { label: "Prompts", value: e.prompt_count }),
            /* @__PURE__ */ a(Wi, { label: "Resources", value: e.resource_count })
          ] })
        ]
      }
    ) : null,
    /* @__PURE__ */ C(nl, { maxWidth: "lg", disableGutters: !0, sx: { px: { xs: 0, sm: 0 } }, children: [
      /* @__PURE__ */ a(J, { variant: "h5", component: "h2", sx: { fontWeight: 700, mb: 1 }, children: "Why use SAMI MCPHub?" }),
      /* @__PURE__ */ a(J, { color: "text.secondary", sx: { mb: 3, maxWidth: 800, lineHeight: 1.6 }, children: "MCP connects assistants to your systems, but every new server usually means another client config, another set of credentials, and another place to look for tools. A gateway collapses that sprawl: one registration pipeline, one discovery index, and one place to apply policy—whether you are solo on a laptop or running shared infrastructure for a team." }),
      /* @__PURE__ */ a(
        Ve,
        {
          sx: {
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
            gap: 2
          },
          children: RS.map(({ icon: i, title: s, body: l }) => /* @__PURE__ */ a(
            nm,
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
              children: /* @__PURE__ */ a(rm, { sx: { p: 2.25 }, children: /* @__PURE__ */ C(ce, { spacing: 1.25, children: [
                /* @__PURE__ */ a(i, { color: "primary", sx: { fontSize: 32 } }),
                /* @__PURE__ */ a(J, { variant: "subtitle1", component: "h3", sx: { fontWeight: 700 }, children: s }),
                /* @__PURE__ */ a(J, { variant: "body2", color: "text.secondary", sx: { lineHeight: 1.55 }, children: l })
              ] }) })
            },
            s
          ))
        }
      )
    ] })
  ] });
}
function Wi({ label: e, value: t }) {
  return /* @__PURE__ */ C(
    Ve,
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
        /* @__PURE__ */ a(J, { variant: "caption", color: "text.secondary", sx: { fontWeight: 600 }, children: e }),
        /* @__PURE__ */ a(J, { variant: "subtitle1", sx: { fontWeight: 800 }, children: t })
      ]
    }
  );
}
const im = [
  { key: "home", label: "Home" },
  { key: "servers", label: "Servers" },
  { key: "tools", label: "Tools" },
  { key: "tool_groups", label: "Tool Groups" },
  { key: "prompt_groups", label: "Prompt Groups" },
  { key: "agent_apps", label: "Agent Apps" },
  { key: "prompts", label: "Prompts" },
  { key: "resources", label: "Resources" },
  { key: "diagnostics", label: "System Info" }
], NS = im.filter(
  (e) => e.key !== "home"
), kS = at(/* @__PURE__ */ a("path", {
  d: "M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"
}), "ChevronLeft"), PS = at(/* @__PURE__ */ a("path", {
  d: "M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
}), "ChevronRight"), IS = at(/* @__PURE__ */ a("path", {
  d: "M14.17 5 19 9.83V19H5V5zm0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9.83c0-.53-.21-1.04-.59-1.41l-4.83-4.83c-.37-.38-.88-.59-1.41-.59M7 15h10v2H7zm0-4h10v2H7zm0-4h7v2H7z"
}), "TextSnippetOutlined"), $S = at(/* @__PURE__ */ a("path", {
  d: "m12 5.69 5 4.5V18h-2v-6H9v6H7v-7.81zM12 3 2 12h3v8h6v-6h2v6h6v-8h3z"
}), "HomeOutlined"), MS = at(/* @__PURE__ */ a("path", {
  d: "M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8"
}), "InfoOutlined"), xu = at(/* @__PURE__ */ a("path", {
  d: "m17 8-1.41 1.41L17.17 11H9v2h8.17l-1.58 1.58L17 16l4-4zM5 5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h7v-2H5z"
}), "LogoutOutlined");
function AS(e) {
  return Ce("MuiListItem", e);
}
Te("MuiListItem", ["root", "dense", "alignItemsFlexStart", "divider", "gutters", "padding", "secondaryAction"]);
function DS(e) {
  return Ce("MuiListItemButton", e);
}
const Un = Te("MuiListItemButton", ["root", "focusVisible", "dense", "alignItemsFlexStart", "disabled", "divider", "gutters", "selected"]), BS = (e, t) => {
  const {
    ownerState: n
  } = e;
  return [t.root, n.dense && t.dense, n.alignItems === "flex-start" && t.alignItemsFlexStart, n.divider && t.divider, !n.disableGutters && t.gutters];
}, LS = (e) => {
  const {
    alignItems: t,
    classes: n,
    dense: r,
    disabled: i,
    disableGutters: s,
    divider: l,
    selected: c
  } = e, f = we({
    root: ["root", r && "dense", !s && "gutters", l && "divider", i && "disabled", t === "flex-start" && "alignItemsFlexStart", c && "selected"]
  }, DS, n);
  return {
    ...n,
    ...f
  };
}, FS = oe(Io, {
  shouldForwardProp: (e) => Gt(e) || e === "classes",
  name: "MuiListItemButton",
  slot: "Root",
  overridesResolver: BS
})($e(({
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
  [`&.${Un.selected}`]: {
    backgroundColor: e.alpha((e.vars || e).palette.primary.main, (e.vars || e).palette.action.selectedOpacity),
    [`&.${Un.focusVisible}`]: {
      backgroundColor: e.alpha((e.vars || e).palette.primary.main, `${(e.vars || e).palette.action.selectedOpacity} + ${(e.vars || e).palette.action.focusOpacity}`)
    }
  },
  [`&.${Un.selected}:hover`]: {
    backgroundColor: e.alpha((e.vars || e).palette.primary.main, `${(e.vars || e).palette.action.selectedOpacity} + ${(e.vars || e).palette.action.hoverOpacity}`),
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      backgroundColor: e.alpha((e.vars || e).palette.primary.main, (e.vars || e).palette.action.selectedOpacity)
    }
  },
  [`&.${Un.focusVisible}`]: {
    backgroundColor: (e.vars || e).palette.action.focus
  },
  [`&.${Un.disabled}`]: {
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
}))), sm = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiListItemButton"
  }), {
    alignItems: i = "center",
    autoFocus: s = !1,
    component: l = "div",
    children: c,
    dense: u = !1,
    disableGutters: f = !1,
    divider: m = !1,
    focusVisibleClassName: y,
    selected: x = !1,
    className: p,
    ...v
  } = r, h = b.useContext($o), E = b.useMemo(() => ({
    dense: u || h.dense || !1,
    alignItems: i,
    disableGutters: f
  }), [i, h.dense, u, f]), _ = b.useRef(null);
  It(() => {
    s && (_.current ? _.current.focus() : process.env.NODE_ENV !== "production" && console.error("MUI: Unable to set focus to a ListItemButton whose component has not been rendered."));
  }, [s]);
  const k = {
    ...r,
    alignItems: i,
    dense: E.dense,
    disableGutters: f,
    divider: m,
    selected: x
  }, O = LS(k), {
    root: w,
    ...T
  } = O, N = Ct(_, n);
  return /* @__PURE__ */ a($o.Provider, {
    value: E,
    children: /* @__PURE__ */ a(FS, {
      ref: N,
      href: v.href || v.to,
      component: (v.href || v.to) && l === "div" ? "button" : l,
      internalNativeButton: !1,
      focusVisibleClassName: pe(O.focusVisible, y),
      ownerState: k,
      className: pe(O.root, p),
      ...v,
      classes: T,
      children: c
    })
  });
});
process.env.NODE_ENV !== "production" && (sm.propTypes = {
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
function jS(e) {
  return Ce("MuiListItemSecondaryAction", e);
}
Te("MuiListItemSecondaryAction", ["root", "disableGutters"]);
const WS = (e) => {
  const {
    disableGutters: t,
    classes: n
  } = e;
  return we({
    root: ["root", t && "disableGutters"]
  }, jS, n);
}, zS = oe("div", {
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
}), zl = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiListItemSecondaryAction"
  }), {
    className: i,
    component: s,
    ...l
  } = r, c = b.useContext($o), u = {
    ...r,
    disableGutters: c.disableGutters
  }, f = WS(u);
  return /* @__PURE__ */ a(zS, {
    as: s,
    className: pe(f.root, i),
    ownerState: u,
    ref: n,
    ...l
  });
});
process.env.NODE_ENV !== "production" && (zl.propTypes = {
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
zl.muiName = "ListItemSecondaryAction";
const VS = (e, t) => {
  const {
    ownerState: n
  } = e;
  return [t.root, n.dense && t.dense, n.alignItems === "flex-start" && t.alignItemsFlexStart, n.divider && t.divider, !n.disableGutters && t.gutters, !n.disablePadding && t.padding];
}, US = (e) => {
  const {
    alignItems: t,
    classes: n,
    dense: r,
    disableGutters: i,
    disablePadding: s,
    divider: l
  } = e;
  return we({
    root: ["root", r && "dense", !i && "gutters", !s && "padding", l && "divider", t === "flex-start" && "alignItemsFlexStart"],
    secondaryAction: ["secondaryAction"]
  }, AS, n);
}, GS = oe("div", {
  name: "MuiListItem",
  slot: "Root",
  overridesResolver: VS
})($e(({
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
      [`& > .${Un.root}`]: {
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
}))), HS = oe(zl, {
  name: "MuiListItem",
  slot: "secondaryAction"
})({}), am = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiListItem"
  }), {
    alignItems: i = "center",
    children: s,
    className: l,
    component: c = "li",
    dense: u = !1,
    disableGutters: f = !1,
    disablePadding: m = !1,
    divider: y = !1,
    secondaryAction: x,
    slotProps: p = {},
    slots: v = {},
    ...h
  } = r, E = b.useContext($o), _ = b.useMemo(() => ({
    dense: u || E.dense || !1,
    alignItems: i,
    disableGutters: f
  }), [i, E.dense, u, f]), k = {
    ...r,
    alignItems: i,
    dense: _.dense,
    disableGutters: f,
    disablePadding: m,
    divider: y,
    secondaryAction: x
  }, O = US(k), w = {
    slots: v,
    slotProps: p
  }, [T, N] = ye("root", {
    ref: n,
    elementType: GS,
    externalForwardedProps: {
      component: c,
      ...w,
      ...h
    },
    ownerState: k,
    className: pe(O.root, l)
  }), [M, D] = ye("secondaryAction", {
    elementType: HS,
    shouldForwardComponentProp: !0,
    externalForwardedProps: w,
    ownerState: k,
    className: O.secondaryAction
  });
  return /* @__PURE__ */ a($o.Provider, {
    value: _,
    children: /* @__PURE__ */ C(T, {
      ...N,
      children: [s, x && /* @__PURE__ */ a(M, {
        ...D,
        children: x
      })]
    })
  });
});
process.env.NODE_ENV !== "production" && (am.propTypes = {
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
var eo = "top", vo = "bottom", xo = "right", to = "left", Vl = "auto", vi = [eo, vo, xo, to], sr = "start", ci = "end", qS = "clippingParents", lm = "viewport", Ir = "popper", KS = "reference", Cu = /* @__PURE__ */ vi.reduce(function(e, t) {
  return e.concat([t + "-" + sr, t + "-" + ci]);
}, []), cm = /* @__PURE__ */ [].concat(vi, [Vl]).reduce(function(e, t) {
  return e.concat([t, t + "-" + sr, t + "-" + ci]);
}, []), YS = "beforeRead", XS = "read", JS = "afterRead", QS = "beforeMain", ZS = "main", eT = "afterMain", tT = "beforeWrite", oT = "write", nT = "afterWrite", rT = [YS, XS, JS, QS, ZS, eT, tT, oT, nT];
function Ho(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function lo(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function In(e) {
  var t = lo(e).Element;
  return e instanceof t || e instanceof Element;
}
function yo(e) {
  var t = lo(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Ul(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = lo(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function iT(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, i = t.attributes[n] || {}, s = t.elements[n];
    !yo(s) || !Ho(s) || (Object.assign(s.style, r), Object.keys(i).forEach(function(l) {
      var c = i[l];
      c === !1 ? s.removeAttribute(l) : s.setAttribute(l, c === !0 ? "" : c);
    }));
  });
}
function sT(e) {
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
      var i = t.elements[r], s = t.attributes[r] || {}, l = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]), c = l.reduce(function(u, f) {
        return u[f] = "", u;
      }, {});
      !yo(i) || !Ho(i) || (Object.assign(i.style, c), Object.keys(s).forEach(function(u) {
        i.removeAttribute(u);
      }));
    });
  };
}
const aT = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: iT,
  effect: sT,
  requires: ["computeStyles"]
};
function Go(e) {
  return e.split("-")[0];
}
var _n = Math.max, Ts = Math.min, ar = Math.round;
function rl() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function dm() {
  return !/^((?!chrome|android).)*safari/i.test(rl());
}
function lr(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = e.getBoundingClientRect(), i = 1, s = 1;
  t && yo(e) && (i = e.offsetWidth > 0 && ar(r.width) / e.offsetWidth || 1, s = e.offsetHeight > 0 && ar(r.height) / e.offsetHeight || 1);
  var l = In(e) ? lo(e) : window, c = l.visualViewport, u = !dm() && n, f = (r.left + (u && c ? c.offsetLeft : 0)) / i, m = (r.top + (u && c ? c.offsetTop : 0)) / s, y = r.width / i, x = r.height / s;
  return {
    width: y,
    height: x,
    top: m,
    right: f + y,
    bottom: m + x,
    left: f,
    x: f,
    y: m
  };
}
function Gl(e) {
  var t = lr(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: r
  };
}
function um(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && Ul(n)) {
    var r = t;
    do {
      if (r && e.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function an(e) {
  return lo(e).getComputedStyle(e);
}
function lT(e) {
  return ["table", "td", "th"].indexOf(Ho(e)) >= 0;
}
function mn(e) {
  return ((In(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function sa(e) {
  return Ho(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (Ul(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    mn(e)
  );
}
function Su(e) {
  return !yo(e) || // https://github.com/popperjs/popper-core/issues/837
  an(e).position === "fixed" ? null : e.offsetParent;
}
function cT(e) {
  var t = /firefox/i.test(rl()), n = /Trident/i.test(rl());
  if (n && yo(e)) {
    var r = an(e);
    if (r.position === "fixed")
      return null;
  }
  var i = sa(e);
  for (Ul(i) && (i = i.host); yo(i) && ["html", "body"].indexOf(Ho(i)) < 0; ) {
    var s = an(i);
    if (s.transform !== "none" || s.perspective !== "none" || s.contain === "paint" || ["transform", "perspective"].indexOf(s.willChange) !== -1 || t && s.willChange === "filter" || t && s.filter && s.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function xi(e) {
  for (var t = lo(e), n = Su(e); n && lT(n) && an(n).position === "static"; )
    n = Su(n);
  return n && (Ho(n) === "html" || Ho(n) === "body" && an(n).position === "static") ? t : n || cT(e) || t;
}
function Hl(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function Yr(e, t, n) {
  return _n(e, Ts(t, n));
}
function dT(e, t, n) {
  var r = Yr(e, t, n);
  return r > n ? n : r;
}
function pm() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function fm(e) {
  return Object.assign({}, pm(), e);
}
function mm(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var uT = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, fm(typeof t != "number" ? t : mm(t, vi));
};
function pT(e) {
  var t, n = e.state, r = e.name, i = e.options, s = n.elements.arrow, l = n.modifiersData.popperOffsets, c = Go(n.placement), u = Hl(c), f = [to, xo].indexOf(c) >= 0, m = f ? "height" : "width";
  if (!(!s || !l)) {
    var y = uT(i.padding, n), x = Gl(s), p = u === "y" ? eo : to, v = u === "y" ? vo : xo, h = n.rects.reference[m] + n.rects.reference[u] - l[u] - n.rects.popper[m], E = l[u] - n.rects.reference[u], _ = xi(s), k = _ ? u === "y" ? _.clientHeight || 0 : _.clientWidth || 0 : 0, O = h / 2 - E / 2, w = y[p], T = k - x[m] - y[v], N = k / 2 - x[m] / 2 + O, M = Yr(w, N, T), D = u;
    n.modifiersData[r] = (t = {}, t[D] = M, t.centerOffset = M - N, t);
  }
}
function fT(e) {
  var t = e.state, n = e.options, r = n.element, i = r === void 0 ? "[data-popper-arrow]" : r;
  i != null && (typeof i == "string" && (i = t.elements.popper.querySelector(i), !i) || um(t.elements.popper, i) && (t.elements.arrow = i));
}
const mT = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: pT,
  effect: fT,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function cr(e) {
  return e.split("-")[1];
}
var hT = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function gT(e, t) {
  var n = e.x, r = e.y, i = t.devicePixelRatio || 1;
  return {
    x: ar(n * i) / i || 0,
    y: ar(r * i) / i || 0
  };
}
function Tu(e) {
  var t, n = e.popper, r = e.popperRect, i = e.placement, s = e.variation, l = e.offsets, c = e.position, u = e.gpuAcceleration, f = e.adaptive, m = e.roundOffsets, y = e.isFixed, x = l.x, p = x === void 0 ? 0 : x, v = l.y, h = v === void 0 ? 0 : v, E = typeof m == "function" ? m({
    x: p,
    y: h
  }) : {
    x: p,
    y: h
  };
  p = E.x, h = E.y;
  var _ = l.hasOwnProperty("x"), k = l.hasOwnProperty("y"), O = to, w = eo, T = window;
  if (f) {
    var N = xi(n), M = "clientHeight", D = "clientWidth";
    if (N === lo(n) && (N = mn(n), an(N).position !== "static" && c === "absolute" && (M = "scrollHeight", D = "scrollWidth")), N = N, i === eo || (i === to || i === xo) && s === ci) {
      w = vo;
      var B = y && N === T && T.visualViewport ? T.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        N[M]
      );
      h -= B - r.height, h *= u ? 1 : -1;
    }
    if (i === to || (i === eo || i === vo) && s === ci) {
      O = xo;
      var F = y && N === T && T.visualViewport ? T.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        N[D]
      );
      p -= F - r.width, p *= u ? 1 : -1;
    }
  }
  var P = Object.assign({
    position: c
  }, f && hT), g = m === !0 ? gT({
    x: p,
    y: h
  }, lo(n)) : {
    x: p,
    y: h
  };
  if (p = g.x, h = g.y, u) {
    var $;
    return Object.assign({}, P, ($ = {}, $[w] = k ? "0" : "", $[O] = _ ? "0" : "", $.transform = (T.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + h + "px)" : "translate3d(" + p + "px, " + h + "px, 0)", $));
  }
  return Object.assign({}, P, (t = {}, t[w] = k ? h + "px" : "", t[O] = _ ? p + "px" : "", t.transform = "", t));
}
function bT(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, i = r === void 0 ? !0 : r, s = n.adaptive, l = s === void 0 ? !0 : s, c = n.roundOffsets, u = c === void 0 ? !0 : c, f = {
    placement: Go(t.placement),
    variation: cr(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: i,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Tu(Object.assign({}, f, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: l,
    roundOffsets: u
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Tu(Object.assign({}, f, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: u
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const yT = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: bT,
  data: {}
};
var zi = {
  passive: !0
};
function vT(e) {
  var t = e.state, n = e.instance, r = e.options, i = r.scroll, s = i === void 0 ? !0 : i, l = r.resize, c = l === void 0 ? !0 : l, u = lo(t.elements.popper), f = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return s && f.forEach(function(m) {
    m.addEventListener("scroll", n.update, zi);
  }), c && u.addEventListener("resize", n.update, zi), function() {
    s && f.forEach(function(m) {
      m.removeEventListener("scroll", n.update, zi);
    }), c && u.removeEventListener("resize", n.update, zi);
  };
}
const xT = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: vT,
  data: {}
};
var CT = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function is(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return CT[t];
  });
}
var ST = {
  start: "end",
  end: "start"
};
function wu(e) {
  return e.replace(/start|end/g, function(t) {
    return ST[t];
  });
}
function ql(e) {
  var t = lo(e), n = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function Kl(e) {
  return lr(mn(e)).left + ql(e).scrollLeft;
}
function TT(e, t) {
  var n = lo(e), r = mn(e), i = n.visualViewport, s = r.clientWidth, l = r.clientHeight, c = 0, u = 0;
  if (i) {
    s = i.width, l = i.height;
    var f = dm();
    (f || !f && t === "fixed") && (c = i.offsetLeft, u = i.offsetTop);
  }
  return {
    width: s,
    height: l,
    x: c + Kl(e),
    y: u
  };
}
function wT(e) {
  var t, n = mn(e), r = ql(e), i = (t = e.ownerDocument) == null ? void 0 : t.body, s = _n(n.scrollWidth, n.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), l = _n(n.scrollHeight, n.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), c = -r.scrollLeft + Kl(e), u = -r.scrollTop;
  return an(i || n).direction === "rtl" && (c += _n(n.clientWidth, i ? i.clientWidth : 0) - s), {
    width: s,
    height: l,
    x: c,
    y: u
  };
}
function Yl(e) {
  var t = an(e), n = t.overflow, r = t.overflowX, i = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + i + r);
}
function hm(e) {
  return ["html", "body", "#document"].indexOf(Ho(e)) >= 0 ? e.ownerDocument.body : yo(e) && Yl(e) ? e : hm(sa(e));
}
function Xr(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = hm(e), i = r === ((n = e.ownerDocument) == null ? void 0 : n.body), s = lo(r), l = i ? [s].concat(s.visualViewport || [], Yl(r) ? r : []) : r, c = t.concat(l);
  return i ? c : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    c.concat(Xr(sa(l)))
  );
}
function il(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function ET(e, t) {
  var n = lr(e, !1, t === "fixed");
  return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function Eu(e, t, n) {
  return t === lm ? il(TT(e, n)) : In(t) ? ET(t, n) : il(wT(mn(e)));
}
function OT(e) {
  var t = Xr(sa(e)), n = ["absolute", "fixed"].indexOf(an(e).position) >= 0, r = n && yo(e) ? xi(e) : e;
  return In(r) ? t.filter(function(i) {
    return In(i) && um(i, r) && Ho(i) !== "body";
  }) : [];
}
function RT(e, t, n, r) {
  var i = t === "clippingParents" ? OT(e) : [].concat(t), s = [].concat(i, [n]), l = s[0], c = s.reduce(function(u, f) {
    var m = Eu(e, f, r);
    return u.top = _n(m.top, u.top), u.right = Ts(m.right, u.right), u.bottom = Ts(m.bottom, u.bottom), u.left = _n(m.left, u.left), u;
  }, Eu(e, l, r));
  return c.width = c.right - c.left, c.height = c.bottom - c.top, c.x = c.left, c.y = c.top, c;
}
function gm(e) {
  var t = e.reference, n = e.element, r = e.placement, i = r ? Go(r) : null, s = r ? cr(r) : null, l = t.x + t.width / 2 - n.width / 2, c = t.y + t.height / 2 - n.height / 2, u;
  switch (i) {
    case eo:
      u = {
        x: l,
        y: t.y - n.height
      };
      break;
    case vo:
      u = {
        x: l,
        y: t.y + t.height
      };
      break;
    case xo:
      u = {
        x: t.x + t.width,
        y: c
      };
      break;
    case to:
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
  var f = i ? Hl(i) : null;
  if (f != null) {
    var m = f === "y" ? "height" : "width";
    switch (s) {
      case sr:
        u[f] = u[f] - (t[m] / 2 - n[m] / 2);
        break;
      case ci:
        u[f] = u[f] + (t[m] / 2 - n[m] / 2);
        break;
    }
  }
  return u;
}
function di(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, i = r === void 0 ? e.placement : r, s = n.strategy, l = s === void 0 ? e.strategy : s, c = n.boundary, u = c === void 0 ? qS : c, f = n.rootBoundary, m = f === void 0 ? lm : f, y = n.elementContext, x = y === void 0 ? Ir : y, p = n.altBoundary, v = p === void 0 ? !1 : p, h = n.padding, E = h === void 0 ? 0 : h, _ = fm(typeof E != "number" ? E : mm(E, vi)), k = x === Ir ? KS : Ir, O = e.rects.popper, w = e.elements[v ? k : x], T = RT(In(w) ? w : w.contextElement || mn(e.elements.popper), u, m, l), N = lr(e.elements.reference), M = gm({
    reference: N,
    element: O,
    placement: i
  }), D = il(Object.assign({}, O, M)), B = x === Ir ? D : N, F = {
    top: T.top - B.top + _.top,
    bottom: B.bottom - T.bottom + _.bottom,
    left: T.left - B.left + _.left,
    right: B.right - T.right + _.right
  }, P = e.modifiersData.offset;
  if (x === Ir && P) {
    var g = P[i];
    Object.keys(F).forEach(function($) {
      var I = [xo, vo].indexOf($) >= 0 ? 1 : -1, A = [eo, vo].indexOf($) >= 0 ? "y" : "x";
      F[$] += g[A] * I;
    });
  }
  return F;
}
function _T(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, i = n.boundary, s = n.rootBoundary, l = n.padding, c = n.flipVariations, u = n.allowedAutoPlacements, f = u === void 0 ? cm : u, m = cr(r), y = m ? c ? Cu : Cu.filter(function(v) {
    return cr(v) === m;
  }) : vi, x = y.filter(function(v) {
    return f.indexOf(v) >= 0;
  });
  x.length === 0 && (x = y);
  var p = x.reduce(function(v, h) {
    return v[h] = di(e, {
      placement: h,
      boundary: i,
      rootBoundary: s,
      padding: l
    })[Go(h)], v;
  }, {});
  return Object.keys(p).sort(function(v, h) {
    return p[v] - p[h];
  });
}
function NT(e) {
  if (Go(e) === Vl)
    return [];
  var t = is(e);
  return [wu(e), t, wu(t)];
}
function kT(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var i = n.mainAxis, s = i === void 0 ? !0 : i, l = n.altAxis, c = l === void 0 ? !0 : l, u = n.fallbackPlacements, f = n.padding, m = n.boundary, y = n.rootBoundary, x = n.altBoundary, p = n.flipVariations, v = p === void 0 ? !0 : p, h = n.allowedAutoPlacements, E = t.options.placement, _ = Go(E), k = _ === E, O = u || (k || !v ? [is(E)] : NT(E)), w = [E].concat(O).reduce(function(ee, G) {
      return ee.concat(Go(G) === Vl ? _T(t, {
        placement: G,
        boundary: m,
        rootBoundary: y,
        padding: f,
        flipVariations: v,
        allowedAutoPlacements: h
      }) : G);
    }, []), T = t.rects.reference, N = t.rects.popper, M = /* @__PURE__ */ new Map(), D = !0, B = w[0], F = 0; F < w.length; F++) {
      var P = w[F], g = Go(P), $ = cr(P) === sr, I = [eo, vo].indexOf(g) >= 0, A = I ? "width" : "height", L = di(t, {
        placement: P,
        boundary: m,
        rootBoundary: y,
        altBoundary: x,
        padding: f
      }), W = I ? $ ? xo : to : $ ? vo : eo;
      T[A] > N[A] && (W = is(W));
      var q = is(W), ie = [];
      if (s && ie.push(L[g] <= 0), c && ie.push(L[W] <= 0, L[q] <= 0), ie.every(function(ee) {
        return ee;
      })) {
        B = P, D = !1;
        break;
      }
      M.set(P, ie);
    }
    if (D)
      for (var z = v ? 3 : 1, V = function(G) {
        var K = w.find(function(Y) {
          var U = M.get(Y);
          if (U)
            return U.slice(0, G).every(function(te) {
              return te;
            });
        });
        if (K)
          return B = K, "break";
      }, Q = z; Q > 0; Q--) {
        var re = V(Q);
        if (re === "break") break;
      }
    t.placement !== B && (t.modifiersData[r]._skip = !0, t.placement = B, t.reset = !0);
  }
}
const PT = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: kT,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Ou(e, t, n) {
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
function Ru(e) {
  return [eo, xo, vo, to].some(function(t) {
    return e[t] >= 0;
  });
}
function IT(e) {
  var t = e.state, n = e.name, r = t.rects.reference, i = t.rects.popper, s = t.modifiersData.preventOverflow, l = di(t, {
    elementContext: "reference"
  }), c = di(t, {
    altBoundary: !0
  }), u = Ou(l, r), f = Ou(c, i, s), m = Ru(u), y = Ru(f);
  t.modifiersData[n] = {
    referenceClippingOffsets: u,
    popperEscapeOffsets: f,
    isReferenceHidden: m,
    hasPopperEscaped: y
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": m,
    "data-popper-escaped": y
  });
}
const $T = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: IT
};
function MT(e, t, n) {
  var r = Go(e), i = [to, eo].indexOf(r) >= 0 ? -1 : 1, s = typeof n == "function" ? n(Object.assign({}, t, {
    placement: e
  })) : n, l = s[0], c = s[1];
  return l = l || 0, c = (c || 0) * i, [to, xo].indexOf(r) >= 0 ? {
    x: c,
    y: l
  } : {
    x: l,
    y: c
  };
}
function AT(e) {
  var t = e.state, n = e.options, r = e.name, i = n.offset, s = i === void 0 ? [0, 0] : i, l = cm.reduce(function(m, y) {
    return m[y] = MT(y, t.rects, s), m;
  }, {}), c = l[t.placement], u = c.x, f = c.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += u, t.modifiersData.popperOffsets.y += f), t.modifiersData[r] = l;
}
const DT = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: AT
};
function BT(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = gm({
    reference: t.rects.reference,
    element: t.rects.popper,
    placement: t.placement
  });
}
const LT = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: BT,
  data: {}
};
function FT(e) {
  return e === "x" ? "y" : "x";
}
function jT(e) {
  var t = e.state, n = e.options, r = e.name, i = n.mainAxis, s = i === void 0 ? !0 : i, l = n.altAxis, c = l === void 0 ? !1 : l, u = n.boundary, f = n.rootBoundary, m = n.altBoundary, y = n.padding, x = n.tether, p = x === void 0 ? !0 : x, v = n.tetherOffset, h = v === void 0 ? 0 : v, E = di(t, {
    boundary: u,
    rootBoundary: f,
    padding: y,
    altBoundary: m
  }), _ = Go(t.placement), k = cr(t.placement), O = !k, w = Hl(_), T = FT(w), N = t.modifiersData.popperOffsets, M = t.rects.reference, D = t.rects.popper, B = typeof h == "function" ? h(Object.assign({}, t.rects, {
    placement: t.placement
  })) : h, F = typeof B == "number" ? {
    mainAxis: B,
    altAxis: B
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, B), P = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, g = {
    x: 0,
    y: 0
  };
  if (N) {
    if (s) {
      var $, I = w === "y" ? eo : to, A = w === "y" ? vo : xo, L = w === "y" ? "height" : "width", W = N[w], q = W + E[I], ie = W - E[A], z = p ? -D[L] / 2 : 0, V = k === sr ? M[L] : D[L], Q = k === sr ? -D[L] : -M[L], re = t.elements.arrow, ee = p && re ? Gl(re) : {
        width: 0,
        height: 0
      }, G = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : pm(), K = G[I], Y = G[A], U = Yr(0, M[L], ee[L]), te = O ? M[L] / 2 - z - U - K - F.mainAxis : V - U - K - F.mainAxis, ne = O ? -M[L] / 2 + z + U + Y + F.mainAxis : Q + U + Y + F.mainAxis, ge = t.elements.arrow && xi(t.elements.arrow), j = ge ? w === "y" ? ge.clientTop || 0 : ge.clientLeft || 0 : 0, fe = ($ = P == null ? void 0 : P[w]) != null ? $ : 0, se = W + te - fe - j, ke = W + ne - fe, Fe = Yr(p ? Ts(q, se) : q, W, p ? _n(ie, ke) : ie);
      N[w] = Fe, g[w] = Fe - W;
    }
    if (c) {
      var Z, Me = w === "x" ? eo : to, Ee = w === "x" ? vo : xo, Ue = N[T], Re = T === "y" ? "height" : "width", Ge = Ue + E[Me], je = Ue - E[Ee], Pe = [eo, to].indexOf(_) !== -1, le = (Z = P == null ? void 0 : P[T]) != null ? Z : 0, ze = Pe ? Ge : Ue - M[Re] - D[Re] - le + F.altAxis, Ke = Pe ? Ue + M[Re] + D[Re] - le - F.altAxis : je, He = p && Pe ? dT(ze, Ue, Ke) : Yr(p ? ze : Ge, Ue, p ? Ke : je);
      N[T] = He, g[T] = He - Ue;
    }
    t.modifiersData[r] = g;
  }
}
const WT = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: jT,
  requiresIfExists: ["offset"]
};
function zT(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function VT(e) {
  return e === lo(e) || !yo(e) ? ql(e) : zT(e);
}
function UT(e) {
  var t = e.getBoundingClientRect(), n = ar(t.width) / e.offsetWidth || 1, r = ar(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function GT(e, t, n) {
  n === void 0 && (n = !1);
  var r = yo(t), i = yo(t) && UT(t), s = mn(t), l = lr(e, i, n), c = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((Ho(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Yl(s)) && (c = VT(t)), yo(t) ? (u = lr(t, !0), u.x += t.clientLeft, u.y += t.clientTop) : s && (u.x = Kl(s))), {
    x: l.left + c.scrollLeft - u.x,
    y: l.top + c.scrollTop - u.y,
    width: l.width,
    height: l.height
  };
}
function HT(e) {
  var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
  e.forEach(function(s) {
    t.set(s.name, s);
  });
  function i(s) {
    n.add(s.name);
    var l = [].concat(s.requires || [], s.requiresIfExists || []);
    l.forEach(function(c) {
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
function qT(e) {
  var t = HT(e);
  return rT.reduce(function(n, r) {
    return n.concat(t.filter(function(i) {
      return i.phase === r;
    }));
  }, []);
}
function KT(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function YT(e) {
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
var _u = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Nu() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function XT(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, i = t.defaultOptions, s = i === void 0 ? _u : i;
  return function(c, u, f) {
    f === void 0 && (f = s);
    var m = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, _u, s),
      modifiersData: {},
      elements: {
        reference: c,
        popper: u
      },
      attributes: {},
      styles: {}
    }, y = [], x = !1, p = {
      state: m,
      setOptions: function(_) {
        var k = typeof _ == "function" ? _(m.options) : _;
        h(), m.options = Object.assign({}, s, m.options, k), m.scrollParents = {
          reference: In(c) ? Xr(c) : c.contextElement ? Xr(c.contextElement) : [],
          popper: Xr(u)
        };
        var O = qT(YT([].concat(r, m.options.modifiers)));
        return m.orderedModifiers = O.filter(function(w) {
          return w.enabled;
        }), v(), p.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!x) {
          var _ = m.elements, k = _.reference, O = _.popper;
          if (Nu(k, O)) {
            m.rects = {
              reference: GT(k, xi(O), m.options.strategy === "fixed"),
              popper: Gl(O)
            }, m.reset = !1, m.placement = m.options.placement, m.orderedModifiers.forEach(function(F) {
              return m.modifiersData[F.name] = Object.assign({}, F.data);
            });
            for (var w = 0; w < m.orderedModifiers.length; w++) {
              if (m.reset === !0) {
                m.reset = !1, w = -1;
                continue;
              }
              var T = m.orderedModifiers[w], N = T.fn, M = T.options, D = M === void 0 ? {} : M, B = T.name;
              typeof N == "function" && (m = N({
                state: m,
                options: D,
                name: B,
                instance: p
              }) || m);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: KT(function() {
        return new Promise(function(E) {
          p.forceUpdate(), E(m);
        });
      }),
      destroy: function() {
        h(), x = !0;
      }
    };
    if (!Nu(c, u))
      return p;
    p.setOptions(f).then(function(E) {
      !x && f.onFirstUpdate && f.onFirstUpdate(E);
    });
    function v() {
      m.orderedModifiers.forEach(function(E) {
        var _ = E.name, k = E.options, O = k === void 0 ? {} : k, w = E.effect;
        if (typeof w == "function") {
          var T = w({
            state: m,
            name: _,
            instance: p,
            options: O
          }), N = function() {
          };
          y.push(T || N);
        }
      });
    }
    function h() {
      y.forEach(function(E) {
        return E();
      }), y = [];
    }
    return p;
  };
}
var JT = [xT, LT, yT, aT, DT, PT, WT, mT, $T], QT = /* @__PURE__ */ XT({
  defaultModifiers: JT
});
function ZT(e) {
  return Ce("MuiPopper", e);
}
Te("MuiPopper", ["root"]);
function ew(e, t) {
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
function ws(e) {
  return typeof e == "function" ? e() : e;
}
function aa(e) {
  return e.nodeType !== void 0;
}
function tw(e) {
  return !aa(e);
}
const ow = (e) => {
  const {
    classes: t
  } = e;
  return we({
    root: ["root"]
  }, ZT, t);
}, nw = {}, rw = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const {
    anchorEl: r,
    children: i,
    direction: s,
    disablePortal: l,
    modifiers: c,
    open: u,
    placement: f,
    popperOptions: m,
    popperRef: y,
    slotProps: x = {},
    slots: p = {},
    TransitionProps: v,
    // @ts-ignore internal logic
    ownerState: h,
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
    ...E
  } = t, _ = b.useRef(null), k = Ct(_, n), O = b.useRef(null), w = Ct(O, y), T = b.useRef(w);
  It(() => {
    T.current = w;
  }, [w]), b.useImperativeHandle(y, () => O.current, []);
  const N = ew(f, s), [M, D] = b.useState(N), [B, F] = b.useState(ws(r));
  b.useEffect(() => {
    O.current && O.current.forceUpdate();
  }), b.useEffect(() => {
    r && F(ws(r));
  }, [r]), It(() => {
    if (!B || !u)
      return;
    const A = (ie) => {
      D(ie.placement);
    };
    if (process.env.NODE_ENV !== "production" && B && aa(B) && B.nodeType === 1) {
      const ie = B.getBoundingClientRect();
      yi() && ie.top === 0 && ie.left === 0 && ie.right === 0 && ie.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    let L = [{
      name: "preventOverflow",
      options: {
        altBoundary: l
      }
    }, {
      name: "flip",
      options: {
        altBoundary: l
      }
    }, {
      name: "onUpdate",
      enabled: !0,
      phase: "afterWrite",
      fn: ({
        state: ie
      }) => {
        A(ie);
      }
    }];
    c != null && (L = L.concat(c)), m && m.modifiers != null && (L = L.concat(m.modifiers));
    const W = QT(B, _.current, {
      placement: N,
      ...m,
      modifiers: L
    });
    T.current(W);
    const q = _.current;
    return () => {
      if (q) {
        const {
          style: ie
        } = q, z = ie.position, V = ie.top, Q = ie.left, re = ie.transform;
        W.destroy(), ie.position = z, ie.top = V, ie.left = Q, ie.transform = re;
      } else
        W.destroy();
      T.current(null);
    };
  }, [B, l, c, u, m, N]);
  const P = {
    placement: M
  };
  v !== null && (P.TransitionProps = v);
  const g = ow(t), $ = p.root ?? "div", I = nr({
    elementType: $,
    externalSlotProps: x.root,
    externalForwardedProps: E,
    additionalProps: {
      role: "tooltip",
      ref: k
    },
    ownerState: t,
    className: g.root
  });
  return /* @__PURE__ */ a($, {
    ...I,
    children: typeof i == "function" ? i(P) : i
  });
}), bm = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const {
    anchorEl: r,
    children: i,
    container: s,
    direction: l = "ltr",
    disablePortal: c = !1,
    keepMounted: u = !1,
    modifiers: f,
    open: m,
    placement: y = "bottom",
    popperOptions: x = nw,
    popperRef: p,
    style: v,
    transition: h = !1,
    slotProps: E = {},
    slots: _ = {},
    ...k
  } = t, [O, w] = b.useState(!0), T = () => {
    w(!1);
  }, N = () => {
    w(!0);
  };
  if (!u && !m && (!h || O))
    return null;
  let M;
  if (s)
    M = s;
  else if (r) {
    const F = ws(r);
    M = F && aa(F) ? $t(F).body : $t(null).body;
  }
  const D = !m && u && (!h || O) ? "none" : void 0, B = h ? {
    in: m,
    onEnter: T,
    onExited: N
  } : void 0;
  return /* @__PURE__ */ a(ii, {
    disablePortal: c,
    container: M,
    children: /* @__PURE__ */ a(rw, {
      anchorEl: r,
      direction: l,
      disablePortal: c,
      modifiers: f,
      ref: n,
      open: h ? !O : m,
      placement: y,
      popperOptions: x,
      popperRef: p,
      slotProps: E,
      slots: _,
      ...k,
      style: {
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: D,
        ...v
      },
      TransitionProps: B,
      children: i
    })
  });
});
process.env.NODE_ENV !== "production" && (bm.propTypes = {
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
  anchorEl: qo(o.oneOfType([sn, o.object, o.func]), (e) => {
    if (e.open) {
      const t = ws(e.anchorEl);
      if (t && aa(t) && t.nodeType === 1) {
        const n = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "production" && yi() && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || tw(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
  container: o.oneOfType([sn, o.func]),
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
  popperRef: So,
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
const iw = oe(bm, {
  name: "MuiPopper",
  slot: "Root"
})({}), Xl = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = qs(), i = Oe({
    props: t,
    name: "MuiPopper"
  }), {
    anchorEl: s,
    component: l,
    container: c,
    disablePortal: u,
    keepMounted: f,
    modifiers: m,
    open: y,
    placement: x,
    popperOptions: p,
    popperRef: v,
    transition: h,
    slots: E,
    slotProps: _,
    ...k
  } = i, O = {
    anchorEl: s,
    container: c,
    disablePortal: u,
    keepMounted: f,
    modifiers: m,
    open: y,
    placement: x,
    popperOptions: p,
    popperRef: v,
    transition: h,
    ...k
  };
  return /* @__PURE__ */ a(iw, {
    as: l,
    direction: r ? "rtl" : "ltr",
    slots: E,
    slotProps: _,
    ...O,
    ref: n
  });
});
process.env.NODE_ENV !== "production" && (Xl.propTypes = {
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
  anchorEl: o.oneOfType([sn, o.object, o.func]),
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
  container: o.oneOfType([sn, o.func]),
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
  popperRef: So,
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
function sw(e) {
  return Ce("MuiTooltip", e);
}
const ho = Te("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]);
function aw(e) {
  return Math.round(e * 1e5) / 1e5;
}
const lw = (e) => {
  const {
    classes: t,
    disableInteractive: n,
    arrow: r,
    touch: i,
    placement: s
  } = e, l = {
    popper: ["popper", !n && "popperInteractive", r && "popperArrow"],
    tooltip: ["tooltip", r && "tooltipArrow", i && "touch", `tooltipPlacement${xe(s.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return we(l, sw, t);
}, cw = oe(Xl, {
  name: "MuiTooltip",
  slot: "Popper",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.popper, !n.disableInteractive && t.popperInteractive, n.arrow && t.popperArrow, !n.open && t.popperClose];
  }
})($e(({
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
      [`&[data-popper-placement*="bottom"] .${ho.arrow}`]: {
        top: 0,
        marginTop: "-0.71em",
        "&::before": {
          transformOrigin: "0 100%"
        }
      },
      [`&[data-popper-placement*="top"] .${ho.arrow}`]: {
        bottom: 0,
        marginBottom: "-0.71em",
        "&::before": {
          transformOrigin: "100% 0"
        }
      },
      [`&[data-popper-placement*="right"] .${ho.arrow}`]: {
        height: "1em",
        width: "0.71em",
        insetInlineStart: 0,
        marginInlineStart: "-0.71em",
        "&::before": {
          transformOrigin: "100% 100%"
        }
      },
      [`&[data-popper-placement*="left"] .${ho.arrow}`]: {
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
}))), dw = oe("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.tooltip, n.touch && t.touch, n.arrow && t.tooltipArrow, t[`tooltipPlacement${xe(n.placement.split("-")[0])}`]];
  }
})($e(({
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
  [`.${ho.popper}[data-popper-placement*="left"] &`]: {
    transformOrigin: "right center",
    marginInlineEnd: "14px"
  },
  [`.${ho.popper}[data-popper-placement*="right"] &`]: {
    transformOrigin: "left center",
    marginInlineStart: "14px"
  },
  [`.${ho.popper}[data-popper-placement*="top"] &`]: {
    transformOrigin: "center bottom",
    marginBottom: "14px"
  },
  [`.${ho.popper}[data-popper-placement*="bottom"] &`]: {
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
      lineHeight: `${aw(16 / 14)}em`,
      fontWeight: e.typography.fontWeightRegular
    }
  }, {
    props: ({
      ownerState: t
    }) => t.touch,
    style: {
      [`.${ho.popper}[data-popper-placement*="left"] &`]: {
        marginInlineEnd: "24px"
      },
      [`.${ho.popper}[data-popper-placement*="right"] &`]: {
        marginInlineStart: "24px"
      },
      [`.${ho.popper}[data-popper-placement*="top"] &`]: {
        marginBottom: "24px"
      },
      [`.${ho.popper}[data-popper-placement*="bottom"] &`]: {
        marginTop: "24px"
      }
    }
  }]
}))), uw = oe("span", {
  name: "MuiTooltip",
  slot: "Arrow"
})($e(({
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
let Vi = !1;
const ku = new Ys();
let $r = {
  x: 0,
  y: 0
};
function Ui(e, t) {
  return (n, ...r) => {
    t && t(n, ...r), e(n, ...r);
  };
}
const Gn = /* @__PURE__ */ b.forwardRef(function(t, n) {
  const r = Oe({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: i = !1,
    children: s,
    classes: l,
    describeChild: c = !1,
    disableFocusListener: u = !1,
    disableHoverListener: f = !1,
    disableInteractive: m = !1,
    disableTouchListener: y = !1,
    enterDelay: x = 100,
    enterNextDelay: p = 0,
    enterTouchDelay: v = 700,
    followCursor: h = !1,
    id: E,
    leaveDelay: _ = 0,
    leaveTouchDelay: k = 1500,
    onClose: O,
    onOpen: w,
    open: T,
    placement: N = "bottom",
    slotProps: M = {},
    slots: D = {},
    title: B,
    ...F
  } = r, P = /* @__PURE__ */ b.isValidElement(s) ? s : /* @__PURE__ */ a("span", {
    children: s
  }), g = $n(), [$, I] = b.useState(), [A, L] = b.useState(null), W = b.useRef(!1), q = m || h, ie = tn(), z = tn(), V = tn(), Q = tn(), [re, ee] = ri({
    controlled: T,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let G = re;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: he
    } = b.useRef(T !== void 0);
    b.useEffect(() => {
      $ && $.disabled && !he && B !== "" && $.tagName.toLowerCase() === "button" && console.warn(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [B, $, he]);
  }
  const K = rn(E), Y = b.useRef(), U = Dt(() => {
    Y.current !== void 0 && (document.body.style.WebkitUserSelect = Y.current, Y.current = void 0), Q.clear();
  });
  b.useEffect(() => U, [U]);
  const te = (he) => {
    ku.clear(), Vi = !0, ee(!0), w && !G && w(he);
  }, ne = Dt(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (he) => {
      ku.start(800 + _, () => {
        Vi = !1;
      }), ee(!1), O && G && O(he), ie.start(g.transitions.duration.shortest, () => {
        W.current = !1;
      });
    }
  ), ge = (he) => {
    W.current && he.type !== "touchstart" || ($ && $.removeAttribute("title"), z.clear(), V.clear(), x || Vi && p ? z.start(Vi ? p : x, () => {
      te(he);
    }) : te(he));
  }, j = (he) => {
    z.clear(), V.start(_, () => {
      ne(he);
    });
  }, [, fe] = b.useState(!1), se = (he) => {
    const Je = (he == null ? void 0 : he.target) ?? $;
    if (!Je || Je.disabled || !gs(Je)) {
      fe(!1);
      const Wt = he ?? new Event("blur");
      !he && Je && (Object.defineProperty(Wt, "target", {
        value: Je
      }), Object.defineProperty(Wt, "currentTarget", {
        value: Je
      })), j(Wt);
    }
  }, ke = (he) => {
    if ($ || I(he.currentTarget), gs(he.target)) {
      const Je = (Wt) => {
        Wt.target.disabled && se(Wt), Wt.target.removeEventListener("blur", Je);
      };
      he.target.addEventListener("blur", Je), fe(!0), ge(he);
    }
  }, Fe = (he) => {
    W.current = !0;
    const Je = P.props;
    Je.onTouchStart && Je.onTouchStart(he);
  }, Z = (he) => {
    Fe(he), V.clear(), ie.clear(), U(), Y.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", Q.start(v, () => {
      document.body.style.WebkitUserSelect = Y.current, ge(he);
    });
  }, Me = (he) => {
    P.props.onTouchEnd && P.props.onTouchEnd(he), U(), V.start(k, () => {
      ne(he);
    });
  };
  b.useEffect(() => {
    if (!G)
      return;
    function he(Je) {
      Je.key === "Escape" && ne(Je);
    }
    return document.addEventListener("keydown", he), () => {
      document.removeEventListener("keydown", he);
    };
  }, [ne, G]);
  const Ee = Ct(hr(P), I, n);
  !B && B !== 0 && (G = !1);
  const Ue = b.useRef(), Re = (he) => {
    const Je = P.props;
    Je.onMouseMove && Je.onMouseMove(he), $r = {
      x: he.clientX,
      y: he.clientY
    }, Ue.current && Ue.current.update();
  }, Ge = {}, je = typeof B == "string";
  c ? (Ge.title = !G && je && !f ? B : null, Ge["aria-describedby"] = G ? K : null) : (Ge["aria-label"] = je ? B : null, Ge["aria-labelledby"] = G && !je ? K : null);
  const Pe = {
    ...Ge,
    ...F,
    ...P.props,
    className: pe(F.className, P.props.className),
    onTouchStart: Fe,
    ref: Ee,
    ...h ? {
      onMouseMove: Re
    } : {}
  };
  process.env.NODE_ENV !== "production" && (Pe["data-mui-internal-clone-element"] = !0, b.useEffect(() => {
    $ && !$.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [$]));
  const le = {};
  y || (Pe.onTouchStart = Z, Pe.onTouchEnd = Me), f || (Pe.onMouseOver = Ui(ge, Pe.onMouseOver), Pe.onMouseLeave = Ui(j, Pe.onMouseLeave), q || (le.onMouseOver = ge, le.onMouseLeave = j)), u || (Pe.onFocus = Ui(ke, Pe.onFocus), Pe.onBlur = Ui(se, Pe.onBlur), q || (le.onFocus = ke, le.onBlur = se)), process.env.NODE_ENV !== "production" && P.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${P.props.title}\` or the Tooltip component.`].join(`
`));
  const ze = {
    ...r,
    arrow: i,
    disableInteractive: q,
    placement: N,
    touch: W.current
  }, Ke = typeof M.popper == "function" ? M.popper(ze) : M.popper, He = b.useMemo(() => {
    var Je;
    let he = [{
      name: "arrow",
      enabled: !!A,
      options: {
        element: A,
        padding: 4
      }
    }];
    return (Je = Ke == null ? void 0 : Ke.popperOptions) != null && Je.modifiers && (he = he.concat(Ke.popperOptions.modifiers)), {
      ...Ke == null ? void 0 : Ke.popperOptions,
      modifiers: he
    };
  }, [A, Ke == null ? void 0 : Ke.popperOptions]), Rt = lw(ze), me = {
    slots: D,
    slotProps: {
      arrow: M.arrow,
      popper: Ke,
      tooltip: M.tooltip,
      transition: M.transition
    }
  }, [Ae, lt] = ye("popper", {
    elementType: cw,
    externalForwardedProps: me,
    ownerState: ze,
    className: Rt.popper
  }), [We, _e] = ye("transition", {
    elementType: si,
    externalForwardedProps: me,
    ownerState: ze
  }), [no, Jt] = ye("tooltip", {
    elementType: dw,
    className: Rt.tooltip,
    externalForwardedProps: me,
    ownerState: ze
  }), [hn, Ao] = ye("arrow", {
    elementType: uw,
    className: Rt.arrow,
    externalForwardedProps: me,
    ownerState: ze,
    ref: L
  });
  return /* @__PURE__ */ C(b.Fragment, {
    children: [/* @__PURE__ */ b.cloneElement(P, Pe), /* @__PURE__ */ a(Ae, {
      as: Xl,
      placement: N,
      anchorEl: h ? {
        getBoundingClientRect: () => ({
          top: $r.y,
          left: $r.x,
          right: $r.x,
          bottom: $r.y,
          width: 0,
          height: 0
        })
      } : $,
      popperRef: Ue,
      open: $ ? G : !1,
      id: K,
      transition: !0,
      ...le,
      ...lt,
      popperOptions: He,
      children: ({
        TransitionProps: he
      }) => /* @__PURE__ */ a(We, {
        timeout: g.transitions.duration.shorter,
        ...he,
        ..._e,
        children: /* @__PURE__ */ C(no, {
          ...Jt,
          children: [B, i ? /* @__PURE__ */ a(hn, {
            ...Ao
          }) : null]
        })
      })
    })]
  });
});
process.env.NODE_ENV !== "production" && (Gn.propTypes = {
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
  children: mr.isRequired,
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
const pw = 216, fw = 56;
function mw({ section: e, ...t }) {
  switch (e) {
    case "home":
      return /* @__PURE__ */ a($S, { ...t });
    case "servers":
      return /* @__PURE__ */ a(Jf, { ...t });
    case "tools":
      return /* @__PURE__ */ a(Qf, { ...t });
    case "tool_groups":
      return /* @__PURE__ */ a(Zf, { ...t });
    case "prompt_groups":
      return /* @__PURE__ */ a(IS, { ...t });
    case "agent_apps":
      return /* @__PURE__ */ a(om, { ...t });
    case "prompts":
      return /* @__PURE__ */ a(em, { ...t });
    case "resources":
      return /* @__PURE__ */ a(tm, { ...t });
    case "diagnostics":
      return /* @__PURE__ */ a(MS, { ...t });
    default:
      return null;
  }
}
const Pu = im;
function hw({
  active: e,
  onSelect: t,
  signOutHref: n,
  embedMode: r = !1,
  signedInEmail: i
}) {
  const s = r ? Pu.filter((f) => f.key !== "home") : Pu, [l, c] = Ne(() => {
    try {
      const f = window.localStorage.getItem("dashboard-nav-expanded");
      if (f !== null)
        return f === "1";
    } catch {
    }
    return !0;
  });
  function u(f) {
    c(f);
    try {
      window.localStorage.setItem("dashboard-nav-expanded", f ? "1" : "0");
    } catch {
    }
  }
  return /* @__PURE__ */ a(
    Ve,
    {
      "aria-label": "Dashboard navigation",
      "aria-expanded": l,
      component: "aside",
      sx: {
        width: l ? pw : fw,
        flexShrink: 0,
        transition: (f) => f.transitions.create("width", {
          easing: f.transitions.easing.sharp,
          duration: f.transitions.duration.standard
        }),
        boxSizing: "border-box",
        borderRight: 1,
        borderColor: "divider",
        backgroundColor: "background.default",
        px: l ? "14px" : 1,
        py: 2,
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
        minHeight: "100vh"
      },
      children: /* @__PURE__ */ C(ce, { spacing: 2.25, sx: { flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }, children: [
        /* @__PURE__ */ a(
          ce,
          {
            direction: "row",
            spacing: 1,
            sx: {
              alignItems: "center",
              minWidth: 0,
              justifyContent: l ? "flex-start" : "center",
              flexWrap: "nowrap"
            },
            children: l ? /* @__PURE__ */ C(Bt, { children: [
              /* @__PURE__ */ a(Ve, { sx: { flex: "1 1 auto", minWidth: 0 }, children: /* @__PURE__ */ a(
                J,
                {
                  component: "span",
                  sx: { fontWeight: 700, fontSize: 16, whiteSpace: "nowrap", overflow: "hidden" },
                  children: "SAMI MCPHub"
                }
              ) }),
              /* @__PURE__ */ a(Gn, { title: "Collapse menu", children: /* @__PURE__ */ a(io, { "aria-label": "Collapse menu", edge: "end", size: "small", onClick: () => u(!1), children: /* @__PURE__ */ a(kS, { fontSize: "small" }) }) })
            ] }) : /* @__PURE__ */ a(Gn, { title: "Expand menu", children: /* @__PURE__ */ a(io, { "aria-label": "Expand menu", size: "small", onClick: () => u(!0), children: /* @__PURE__ */ a(PS, { fontSize: "small" }) }) })
          }
        ),
        /* @__PURE__ */ a(Fl, { disablePadding: !0, sx: { px: 0, flex: 1, minHeight: 0, overflowY: "auto" }, "aria-label": "Dashboard sections", children: s.map((f) => {
          const m = e === f.key, y = /* @__PURE__ */ C(
            sm,
            {
              selected: m,
              onClick: () => t(f.key),
              sx: {
                px: l ? "12px" : "6px",
                py: 1.125,
                borderRadius: "12px",
                mb: 0,
                border: 1,
                borderColor: m ? "divider" : "transparent",
                backgroundColor: m ? "background.paper" : "transparent",
                justifyContent: l ? "flex-start" : "center"
              },
              children: [
                l ? null : /* @__PURE__ */ a(
                  Ef,
                  {
                    sx: {
                      minWidth: 0,
                      justifyContent: "center",
                      color: m ? "primary.main" : "text.secondary"
                    },
                    children: /* @__PURE__ */ a(mw, { section: f.key, fontSize: "small" })
                  }
                ),
                l ? /* @__PURE__ */ a(
                  Of,
                  {
                    primary: f.label,
                    slotProps: {
                      primary: {
                        variant: "body2",
                        sx: {
                          fontWeight: m ? 600 : 400,
                          color: m ? "text.primary" : "text.secondary"
                        }
                      }
                    }
                  }
                ) : null
              ]
            }
          );
          return /* @__PURE__ */ a(am, { disablePadding: !0, sx: { mb: 0.25 }, children: l ? y : /* @__PURE__ */ a(Gn, { title: f.label, placement: "right", children: y }) }, f.key);
        }) }),
        r && i ? /* @__PURE__ */ a(
          Ve,
          {
            sx: {
              mt: "auto",
              pt: 1.5,
              borderTop: 1,
              borderColor: "divider",
              flexShrink: 0
            },
            children: l ? /* @__PURE__ */ a(li, { label: `Signed in as ${i}`, size: "small", sx: { width: "100%" } }) : /* @__PURE__ */ a(Gn, { title: `Signed in as ${i}`, placement: "right", children: /* @__PURE__ */ a(Ve, { sx: { display: "flex", justifyContent: "center" }, children: /* @__PURE__ */ a(li, { label: i.slice(0, 1).toUpperCase(), size: "small" }) }) })
          }
        ) : n ? /* @__PURE__ */ a(
          Ve,
          {
            sx: {
              mt: "auto",
              pt: 1.5,
              borderTop: 1,
              borderColor: "divider",
              flexShrink: 0
            },
            children: l ? /* @__PURE__ */ a(
              be,
              {
                component: "a",
                href: n,
                variant: "outlined",
                size: "small",
                fullWidth: !0,
                startIcon: /* @__PURE__ */ a(xu, {}),
                sx: {
                  fontSize: "0.88rem",
                  minHeight: 36,
                  borderRadius: "12px",
                  textTransform: "none"
                },
                children: "Sign out"
              }
            ) : /* @__PURE__ */ a(Ve, { sx: { display: "flex", justifyContent: "center" }, children: /* @__PURE__ */ a(Gn, { title: "Sign out", placement: "right", children: /* @__PURE__ */ a(io, { component: "a", href: n, "aria-label": "Sign out", size: "small", color: "primary", children: /* @__PURE__ */ a(xu, { fontSize: "small" }) }) }) })
          }
        ) : null
      ] })
    }
  );
}
function gw({
  active: e,
  onSelect: t
}) {
  return /* @__PURE__ */ a(
    Ss,
    {
      "aria-label": "Dashboard sections",
      onChange: (n, r) => t(r),
      scrollButtons: "auto",
      sx: {
        borderBottom: 1,
        borderColor: "divider",
        minHeight: 48,
        px: { xs: 0.5, sm: 1 },
        "& .MuiTab-root": {
          minHeight: 48,
          textTransform: "none",
          fontWeight: 500,
          fontSize: "0.875rem"
        }
      },
      value: e,
      variant: "scrollable",
      children: NS.map((n) => /* @__PURE__ */ a(cn, { label: n.label, value: n.key }, n.key))
    }
  );
}
function zt({
  title: e,
  subtitle: t,
  action: n,
  children: r
}) {
  return /* @__PURE__ */ C(
    yt,
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
        /* @__PURE__ */ C(
          ce,
          {
            direction: { xs: "column", sm: "row" },
            spacing: 1,
            sx: {
              mb: 1.5,
              alignItems: { xs: "stretch", sm: "flex-start" },
              justifyContent: "space-between"
            },
            children: [
              /* @__PURE__ */ C(Ve, { sx: { flex: "1 1 auto", minWidth: 0 }, children: [
                /* @__PURE__ */ a(J, { variant: "caption", sx: { letterSpacing: "0.12em", fontWeight: 600, fontSize: "0.74rem" }, children: e }),
                t ? /* @__PURE__ */ a(J, { variant: "h6", component: "h3", sx: { mt: 0.5, mb: 0, fontWeight: 600 }, children: t }) : null
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
const bw = {
  good: "success",
  warn: "warning",
  bad: "error",
  muted: "default"
};
function Kt({ tone: e, text: t }) {
  const n = bw[e] ?? "default";
  return /* @__PURE__ */ a(li, { label: t, size: "small", variant: "outlined", color: n, sx: { textTransform: "capitalize" } });
}
function Mr(e) {
  return `'${e.replace(/'/g, "'\\''")}'`;
}
function yw(e, t) {
  return [
    `curl -sS -X POST ${Mr(e)} \\`,
    `  -H ${Mr("Content-Type: application/x-www-form-urlencoded")} \\`,
    `  --data-urlencode ${Mr("grant_type=client_credentials")} \\`,
    `  --data-urlencode ${Mr(`client_id=${t}`)} \\`,
    `  --data-urlencode ${Mr("client_secret=YOUR_CLIENT_SECRET")}`
  ].join(`
`);
}
const sl = [
  { value: "open", label: "Open (no auth)" },
  { value: "api_key", label: "API key (client id in X-API-Key)" },
  { value: "basic", label: "Basic auth" },
  { value: "bearer", label: "Bearer (agent-app JWT)" }
];
function Gi(e) {
  const t = sl.find((n) => n.value === e);
  return (t == null ? void 0 : t.label) ?? e;
}
function Hi() {
  return /* @__PURE__ */ C("svg", { "aria-hidden": "true", fill: "none", height: "18", viewBox: "0 0 16 16", width: "18", children: [
    /* @__PURE__ */ a(
      "path",
      {
        d: "M2.75 4.25h10.5M6.25 2.75h3.5m-5.75 1.5.44 7.04A1.5 1.5 0 0 0 5.94 12.75h4.12a1.5 1.5 0 0 0 1.5-1.46L12 4.25",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "1.5"
      }
    ),
    /* @__PURE__ */ a("path", { d: "M6.5 6.5v3.5M9.5 6.5v3.5", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5" })
  ] });
}
function _a() {
  return /* @__PURE__ */ a("svg", { "aria-hidden": "true", fill: "none", height: "18", viewBox: "0 0 16 16", width: "18", children: /* @__PURE__ */ a(
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
function al(e, t, n) {
  const r = new Set(t);
  for (const i of n)
    for (const s of e) {
      const l = s.canonical_name;
      s.server === i && s.enabled && s.server_enabled && l && r.add(l);
    }
  return Array.from(r).sort();
}
function Iu(e, t, n, r) {
  const i = new Set(r);
  return al(e, t, n).filter(
    (s) => !i.has(s)
  );
}
function vw(e, t) {
  const n = new Map(e.map((r) => [r.canonical_name, r]));
  return t.map((r) => {
    const i = n.get(r);
    return {
      canonical_name: r,
      name: (i == null ? void 0 : i.name) ?? r,
      server: (i == null ? void 0 : i.server) ?? "Unknown"
    };
  });
}
function Fo(e) {
  return ir() ? !1 : e instanceof zf ? (Vf(e.loginPath), !0) : !1;
}
function $u(e) {
  if (Uf() && e === "home") {
    const t = ai();
    return t === "home" ? "servers" : t;
  }
  return e;
}
function xw() {
  return Pt() ? $u(ko().section ?? ai()) : $u(ai());
}
const Cw = {
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
function Sw(e) {
  if (!e)
    return "";
  const t = e.match(/v?\d+\.\d+\.\d+/);
  return t ? t[0] : e.length > 16 ? e.slice(0, 16) : e;
}
function Mu(e, t) {
  return [.../* @__PURE__ */ new Set([...e, ...t])].sort((n, r) => n.localeCompare(r));
}
function Au(e) {
  return e ? e.split("_").join(" ") : "unknown";
}
function Na(e) {
  switch (e) {
    case "rest_openapi":
      return "REST (OpenAPI)";
    case "rest_endpoint":
      return "REST (endpoint)";
    case "mcp_protocol":
      return "MCP protocol";
    default:
      return e ? e.split("_").join(" ") : "Unknown";
  }
}
function qi(e) {
  return e.server_kind || e.config_summary.server_kind || e.config_summary.kind || "mcp_protocol";
}
function Kn(e) {
  return e.upstream_type === "rest_openapi" || e.upstream_type === "rest_endpoint";
}
function Tw(e) {
  return e.split(/[\n,]+/).map((t) => t.trim()).filter(Boolean);
}
function ww(e) {
  return (e ?? []).join(`
`);
}
function Es() {
  return { name: "", in: "query", type: "string", required: !1, description: "" };
}
function Ew(e) {
  return e.split(/[\n,]+/).map((t) => t.trim()).filter(Boolean);
}
function Du(e) {
  switch (e) {
    case "connected":
    case "reachable":
      return "good";
    case "failed":
      return "bad";
    default:
      return "muted";
  }
}
function Bu(e) {
  return e.split("_").join(" ");
}
function Ki(e) {
  return e.description || "No description";
}
function Yi(e) {
  return e.description || "No description";
}
function Ow(e) {
  return e.description || "No description";
}
function Lu(e) {
  return e ? JSON.stringify(e, null, 2) : "No schema available.";
}
function Fu(e) {
  return !e || e.length === 0 ? "No arguments" : JSON.stringify(e, null, 2);
}
function on(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function ym(e) {
  const t = e.type;
  return typeof t == "string" ? t : Array.isArray(t) && t.every((n) => typeof n == "string") ? t.join(" | ") : on(e.properties) ? "object" : e.items ? "array" : Array.isArray(e.enum) && e.enum.length > 0 ? "enum" : "unknown";
}
function Os(e) {
  return e === void 0 ? "" : typeof e == "string" ? e : JSON.stringify(e);
}
function vm(e) {
  const t = [];
  return Array.isArray(e.oneOf) && e.oneOf.length > 0 && t.push(`${e.oneOf.length} oneOf variants`), Array.isArray(e.anyOf) && e.anyOf.length > 0 && t.push(`${e.anyOf.length} anyOf variants`), e.additionalProperties === !0 && t.push("additional properties allowed"), t.join(", ");
}
function dr(e, t, n, r) {
  const i = {
    path: t,
    type: ym(e),
    required: n
  };
  typeof e.description == "string" && e.description.trim() && (i.description = e.description), Array.isArray(e.enum) && e.enum.length > 0 && (i.enumValues = e.enum.map((l) => Os(l))), e.default !== void 0 && (i.defaultValue = Os(e.default));
  const s = vm(e);
  if (s && (i.note = s), r.push(i), on(e.properties)) {
    const l = new Set(
      Array.isArray(e.required) ? e.required.filter((c) => typeof c == "string") : []
    );
    Object.entries(e.properties).forEach(([c, u]) => {
      if (!on(u))
        return;
      const f = t ? `${t}.${c}` : c;
      dr(u, f, l.has(c), r);
    });
  }
  e.items && on(e.items) && dr(e.items, `${t}[]`, !0, r);
}
function Rw(e) {
  if (!e)
    return [];
  const t = [];
  if (on(e.properties)) {
    const n = new Set(
      Array.isArray(e.required) ? e.required.filter((r) => typeof r == "string") : []
    );
    return Object.entries(e.properties).forEach(([r, i]) => {
      on(i) && dr(i, r, n.has(r), t);
    }), t;
  }
  return dr(e, "(root)", !0, t), t;
}
function _w(e) {
  if (!e || e.length === 0)
    return [];
  const t = [];
  return e.forEach((n, r) => {
    const i = typeof n.name == "string" && n.name || typeof n.title == "string" && n.title || `arg${r + 1}`, s = {
      path: i,
      // Prompt arguments are string-like by default unless the backend explicitly provides a schema type.
      type: (() => {
        const c = ym(n);
        return c === "unknown" ? "string" : c;
      })(),
      required: !!n.required
    };
    typeof n.description == "string" && n.description.trim() && (s.description = n.description), Array.isArray(n.enum) && n.enum.length > 0 && (s.enumValues = n.enum.map((c) => Os(c))), n.default !== void 0 && (s.defaultValue = Os(n.default));
    const l = vm(n);
    if (l && (s.note = l), t.push(s), on(n.properties)) {
      const c = new Set(
        Array.isArray(n.required) ? n.required.filter((u) => typeof u == "string") : []
      );
      Object.entries(n.properties).forEach(([u, f]) => {
        on(f) && dr(f, `${i}.${u}`, c.has(u), t);
      });
    }
    n.items && on(n.items) && dr(n.items, `${i}[]`, !0, t);
  }), t;
}
function ur() {
  return { key: "", value: "" };
}
function Xi() {
  return {
    name: "",
    description: "",
    upstream_type: "mcp_protocol",
    transport: "streamable_http",
    session_mode: "stateless",
    command: "",
    args_text: "",
    env_rows: [ur()],
    url: "",
    bearer_token: "",
    header_rows: [ur()],
    base_url: "",
    spec_source: "url",
    openapi_spec_url: "",
    openapi_spec_inline: "",
    excluded_operations_text: "",
    method: "GET",
    path: "",
    tool_name: "",
    tool_description: "",
    parameter_rows: [Es()],
    rest_auth_type: "none",
    api_key_header: "",
    api_key_query: "",
    api_key_value: "",
    basic_username: "",
    basic_password: "",
    oauth_redirect_uri: "",
    oauth_client_id: "",
    oauth_client_secret: "",
    oauth_scopes_text: ""
  };
}
function Nw(e) {
  return e.server_kind === "rest_openapi" || e.server_kind === "rest_endpoint" ? e.server_kind : e.transport === "rest" ? "rest_openapi" : "mcp_protocol";
}
function kw(e, t) {
  const n = e.env ? Object.entries(e.env) : [], r = n.length > 0 ? n.map(([m, y]) => ({ key: m, value: String(y) })) : [ur()], i = e.headers ? Object.entries(e.headers) : [], s = i.length > 0 ? i.map(([m, y]) => ({ key: m, value: String(y) })) : [ur()], l = Nw(e), c = e.parameters && e.parameters.length > 0 ? e.parameters.map((m) => ({
    name: m.name,
    in: m.in === "path" || m.in === "header" ? m.in : "query",
    type: m.type || "string",
    required: !!m.required,
    description: m.description ?? ""
  })) : [Es()], u = e.rest_auth, f = (u == null ? void 0 : u.type) ?? "none";
  return {
    name: e.name,
    description: e.description ?? "",
    upstream_type: l,
    transport: l === "mcp_protocol" ? e.transport === "stdio" || e.transport === "sse" ? e.transport : "streamable_http" : "rest",
    session_mode: e.session_mode ?? "stateless",
    command: e.command ?? "",
    args_text: (e.args ?? []).join(`
`),
    env_rows: r,
    url: e.url ?? "",
    bearer_token: e.bearer_token ?? "",
    header_rows: s,
    base_url: e.base_url ?? e.url ?? "",
    spec_source: e.openapi_spec ? "inline" : "url",
    openapi_spec_url: e.openapi_spec_url ?? "",
    openapi_spec_inline: e.openapi_spec ?? "",
    excluded_operations_text: ww(e.excluded_operations),
    method: e.method ?? "GET",
    path: e.path ?? "",
    tool_name: e.tool_name ?? "",
    tool_description: e.tool_description ?? "",
    parameter_rows: c,
    rest_auth_type: f,
    api_key_header: (u == null ? void 0 : u.api_key_header) ?? "",
    api_key_query: (u == null ? void 0 : u.api_key_query) ?? "",
    api_key_value: t ? "" : (u == null ? void 0 : u.api_key_value) ?? "",
    basic_username: (u == null ? void 0 : u.username) ?? "",
    basic_password: t ? "" : (u == null ? void 0 : u.password) ?? "",
    oauth_redirect_uri: e.oauth_redirect_uri ?? "",
    oauth_client_id: e.oauth_client_id ?? "",
    oauth_client_secret: t ? "" : e.oauth_client_secret ?? "",
    oauth_scopes_text: (e.oauth_scopes ?? []).join(`
`)
  };
}
function ju(e) {
  const t = {};
  return e.forEach((n) => {
    const r = n.key.trim();
    r && (t[r] = n.value);
  }), t;
}
function Pw(e) {
  return e.split(`
`).map((t) => t.trim()).filter(Boolean);
}
function Iw(e, t) {
  if (!e.name.trim())
    return "Server name is required.";
  if (Kn(e)) {
    if (!e.base_url.trim())
      return "Base URL is required for REST servers.";
    if (e.upstream_type === "rest_openapi") {
      if (e.spec_source === "url" && !e.openapi_spec_url.trim())
        return "OpenAPI spec URL is required when using URL spec source.";
      if (e.spec_source === "inline" && !e.openapi_spec_inline.trim())
        return "Inline OpenAPI spec is required when using inline spec source.";
    }
    if (e.upstream_type === "rest_endpoint") {
      if (!e.method.trim())
        return "HTTP method is required for REST endpoint servers.";
      if (!e.path.trim())
        return "Path is required for REST endpoint servers.";
      if (!e.tool_name.trim())
        return "Tool name is required for REST endpoint servers.";
    }
    switch (e.rest_auth_type) {
      case "api_key":
        if (!e.api_key_header.trim() && !e.api_key_query.trim())
          return "API key header or query parameter name is required for API key auth.";
        if (!e.api_key_value.trim() && !t)
          return "API key value is required for API key auth.";
        break;
      case "basic":
        if (!e.basic_username.trim())
          return "Username is required for basic auth.";
        if (!e.basic_password.trim() && !t)
          return "Password is required for basic auth.";
        break;
      case "bearer":
        if (!e.bearer_token.trim() && !t)
          return "Bearer token is required for bearer auth.";
        break;
      case "oauth":
        if (!e.oauth_redirect_uri.trim())
          return "OAuth redirect URI is required for OAuth auth.";
        break;
    }
    return "";
  }
  return e.transport === "stdio" && !e.command.trim() ? "Command is required for stdio servers." : (e.transport === "streamable_http" || e.transport === "sse") && !e.url.trim() ? "Target URL is required for HTTP and SSE servers." : "";
}
function $w(e) {
  const t = {
    type: e.rest_auth_type
  };
  return e.rest_auth_type === "api_key" && (t.api_key_header = e.api_key_header.trim(), t.api_key_query = e.api_key_query.trim(), e.api_key_value.trim() && (t.api_key_value = e.api_key_value.trim())), e.rest_auth_type === "basic" && (t.username = e.basic_username.trim(), e.basic_password.trim() && (t.password = e.basic_password.trim())), t;
}
function Wu(e) {
  if (Kn(e)) {
    const n = {
      name: e.name.trim(),
      description: e.description.trim(),
      server_kind: e.upstream_type,
      transport: "rest",
      base_url: e.base_url.trim(),
      rest_auth: $w(e)
    };
    if (e.upstream_type === "rest_openapi") {
      e.spec_source === "url" ? n.openapi_spec_url = e.openapi_spec_url.trim() : e.openapi_spec_inline.trim() && (n.openapi_spec = e.openapi_spec_inline.trim());
      const r = Tw(e.excluded_operations_text);
      r.length > 0 && (n.excluded_operations = r);
    }
    if (e.upstream_type === "rest_endpoint") {
      n.method = e.method.trim().toUpperCase(), n.path = e.path.trim(), n.tool_name = e.tool_name.trim(), n.tool_description = e.tool_description.trim();
      const r = e.parameter_rows.filter((i) => i.name.trim()).map((i) => ({
        name: i.name.trim(),
        in: i.in,
        type: i.type.trim() || "string",
        required: i.required,
        description: i.description.trim() || void 0
      }));
      r.length > 0 && (n.parameters = r);
    }
    if (e.rest_auth_type === "bearer" && e.bearer_token.trim() && (n.bearer_token = e.bearer_token.trim()), e.rest_auth_type === "oauth") {
      n.oauth_redirect_uri = e.oauth_redirect_uri.trim(), e.oauth_client_id.trim() && (n.oauth_client_id = e.oauth_client_id.trim()), e.oauth_client_secret.trim() && (n.oauth_client_secret = e.oauth_client_secret.trim());
      const r = Ew(e.oauth_scopes_text);
      r.length > 0 && (n.oauth_scopes = r);
    }
    return n;
  }
  const t = {
    name: e.name.trim(),
    description: e.description.trim(),
    server_kind: "mcp_protocol",
    transport: e.transport,
    session_mode: e.session_mode
  };
  if (e.transport === "stdio") {
    t.command = e.command.trim(), t.args = Pw(e.args_text);
    const n = ju(e.env_rows);
    return Object.keys(n).length > 0 && (t.env = n), t;
  }
  if (t.url = e.url.trim(), e.bearer_token.trim() && (t.bearer_token = e.bearer_token.trim()), e.transport === "streamable_http") {
    const n = ju(e.header_rows);
    Object.keys(n).length > 0 && (t.headers = n);
  }
  return t;
}
function Ji() {
  return {
    name: "",
    description: "",
    securityOption: "basic",
    selectedTools: [],
    selectedServers: [],
    excludedTools: []
  };
}
function ka() {
  return {
    name: "",
    description: "",
    securityOption: "basic",
    selectedPrompts: []
  };
}
function Mw() {
  var mc, hc, gc, bc, yc, vc, xc, Cc, Sc, Tc, wc, Ec, Oc, Rc, _c, Nc, kc, Pc, Ic, $c, Mc, Ac, Dc, Bc, Lc;
  const e = ir(), t = Uf(), [n, r] = Ne(xw), [i, s] = Ne(null), l = yh((d) => {
    var S;
    if (!(t && d === "home")) {
      if (!e && (i != null && i.oidc_enabled) && !i.authenticated && d !== "home") {
        const R = (S = i.login_path) == null ? void 0 : S.trim();
        R && Vf(R);
        return;
      }
      r(d), Pt() ? it(wt(d)) : (K(null), Pe(null), d === "tool_groups" && ee(null));
    }
  }, [i, t, e]), [c, u] = Ne("checking_session"), [f, m] = Ne(""), [y, x] = Ne(null), [p, v] = Ne({}), [h, E] = Ne(""), [_, k] = Ne(""), [O, w] = Ne("all"), [T, N] = Ne(""), [M, D] = Ne(""), [B, F] = Ne("all"), [P, g] = Ne("servers"), [$, I] = Ne("detail"), [A, L] = Ne(""), [W, q] = Ne("all"), [ie, z] = Ne(() => {
    if (!Pt()) return null;
    const d = ko();
    return d.section === "servers" ? d.serverName : null;
  }), [V, Q] = Ne(() => {
    if (!Pt()) return null;
    const d = ko();
    return d.section === "tools" ? d.toolCanonicalName : null;
  }), [re, ee] = Ne(() => {
    if (!Pt()) return null;
    const d = ko();
    return d.section !== "tool_groups" || d.toolGroupFormMode !== null ? null : d.toolGroupName;
  }), [G, K] = Ne(() => {
    if (!Pt()) return null;
    const d = ko();
    return d.section === "tool_groups" ? d.toolGroupFormMode : null;
  }), [Y, U] = Ne(() => {
    if (!Pt()) return null;
    const d = ko();
    return d.section === "prompt_groups" ? d.promptGroupName : null;
  }), [te, ne] = Ne(() => {
    if (!Pt()) return null;
    const d = ko();
    return d.section === "prompts" ? d.promptCanonicalName : null;
  }), [ge, j] = Ne(!1), [fe, se] = Ne(null), [ke, Fe] = Ne(!1), [Z, Me] = Ne(Xi()), [Ee, Ue] = Ne(""), [Re, Ge] = Ne(null), [je, Pe] = Ne(() => {
    if (!Pt()) return null;
    const d = ko();
    return d.section === "tool_groups" && d.toolGroupFormMode === "edit" ? d.toolGroupEditName : null;
  }), [le, ze] = Ne(Ji()), [Ke, He] = Ne(""), [Rt, me] = Ne(!1), [Ae, lt] = Ne(null), [We, _e] = Ne(ka()), [no, Jt] = Ne(""), [hn, Ao] = Ne(!1), [he, Je] = Ne(null), [Wt, To] = Ne(""), [ro, ln] = Ne(""), [co, uo] = Ne(""), [wo, Ht] = Ne(""), [gn, Qt] = Ne(!1), [Mn, de] = Ne(""), [ae, Se] = Ne(
    null
  ), [Be, ct] = Ne(() => {
    if (!Pt()) return null;
    const d = ko();
    return d.section === "agent_apps" ? d.agentAppId : null;
  }), [po, fo] = Ne({});
  Qo(() => {
    if (!Pt() || hu() !== null)
      return;
    const { pathname: d, search: S } = window.location;
    Lo(d, S, wt(ai())), r(ai()), ct(null), z(null), ee(null), K(null), Pe(null), U(null), Q(null), ne(null);
  }, []), Qo(() => {
    if (!Pt())
      return;
    function d() {
      const S = ko();
      if (S.section !== null) {
        if (!e && (i != null && i.oidc_enabled) && !i.authenticated && S.section !== "home") {
          const { pathname: R, search: X } = window.location;
          Lo(R, X, wt("home")), r("home"), ct(null), z(null), ee(null), K(null), Pe(null), U(null), Q(null), ne(null);
          return;
        }
        r(S.section), ct(S.section === "agent_apps" ? S.agentAppId : null), z(S.section === "servers" ? S.serverName : null), ee(
          S.section === "tool_groups" && S.toolGroupFormMode === null ? S.toolGroupName : null
        ), K(S.section === "tool_groups" ? S.toolGroupFormMode : null), Pe(
          S.section === "tool_groups" && S.toolGroupFormMode === "edit" ? S.toolGroupEditName : null
        ), U(S.section === "prompt_groups" ? S.promptGroupName : null), Q(S.section === "tools" ? S.toolCanonicalName : null), ne(S.section === "prompts" ? S.promptCanonicalName : null);
      }
    }
    return window.addEventListener("hashchange", d), () => window.removeEventListener("hashchange", d);
  }, [i]);
  async function ue(d) {
    const [S, R, X, ve, et, ut, Mt, vn] = await Promise.all([
      Le.servers(),
      Le.tools(),
      Le.toolGroups(),
      Le.promptGroups(),
      Le.prompts(),
      Le.resources(),
      Le.diagnostics(),
      Le.agentApps()
    ]);
    return { overview: d, servers: S, tools: R, toolGroups: X, promptGroups: ve, prompts: et, resources: ut, diagnostics: Mt, agentApps: vn };
  }
  async function Ie() {
    const [d, S, R, X, ve, et, ut, Mt, vn] = await Promise.all([
      Le.overview(),
      Le.servers(),
      Le.tools(),
      Le.toolGroups(),
      Le.promptGroups(),
      Le.prompts(),
      Le.resources(),
      Le.diagnostics(),
      Le.agentApps()
    ]);
    return { overview: d, servers: S, tools: R, toolGroups: X, promptGroups: ve, prompts: et, resources: ut, diagnostics: Mt, agentApps: vn };
  }
  function qe(d) {
    const { overview: S, servers: R, tools: X, toolGroups: ve, promptGroups: et, prompts: ut, resources: Mt, diagnostics: vn, agentApps: Fc } = d;
    v({
      overview: S,
      servers: R,
      tools: X,
      toolGroups: ve,
      promptGroups: et,
      prompts: ut,
      resources: Mt,
      diagnostics: vn,
      agentApps: Fc
    }), z((St) => {
      if (St === null)
        return null;
      if (R.servers.some((Ro) => Ro.name === St))
        return St;
      const { pathname: Eo, search: Oo } = window.location;
      return Lo(Eo, Oo, wt("servers")), null;
    }), Q((St) => {
      if (St === null)
        return null;
      if (X.tools.some((Ro) => Ro.canonical_name === St))
        return St;
      const { pathname: Eo, search: Oo } = window.location;
      return Lo(Eo, Oo, wt("tools")), null;
    }), ee((St) => {
      if (St === null)
        return null;
      if (ve.tool_groups.some((Ro) => Ro.name === St))
        return St;
      const { pathname: Eo, search: Oo } = window.location;
      return Lo(Eo, Oo, wt("tool_groups")), null;
    }), U((St) => {
      if (St === null)
        return null;
      if (et.prompt_groups.some((Ro) => Ro.name === St))
        return St;
      const { pathname: Eo, search: Oo } = window.location;
      return Lo(Eo, Oo, wt("prompt_groups")), null;
    }), ne((St) => {
      if (St === null)
        return null;
      if (ut.prompts.some((Ro) => Ro.canonical_name === St))
        return St;
      const { pathname: Eo, search: Oo } = window.location;
      return Lo(Eo, Oo, wt("prompts")), null;
    }), ct((St) => {
      if (St === null)
        return null;
      if (Fc.apps.some((Ro) => Ro.id === St))
        return St;
      const { pathname: Eo, search: Oo } = window.location;
      return Lo(Eo, Oo, wt("agent_apps")), null;
    });
  }
  async function Nt() {
    u("checking_session"), m("");
    try {
      if (e) {
        const R = Hf();
        if (R === null)
          throw new Zn(
            "Missing authentication token — pass token to <MCPGatewayDashboard /> or set localStorage tenant_id_token"
          );
        const X = qf(R);
        Kf(), s({
          authenticated: !0,
          oidc_enabled: !0,
          email: X.email,
          sub: X.sub
        }), u("loading");
        const ve = await Le.overview(), et = await ue(ve);
        qe(et), u("ready");
        return;
      }
      const d = await Le.authStatus();
      if (s(d), !d.oidc_enabled || d.authenticated) {
        u("loading");
        const R = await Le.overview(), X = await ue(R);
        qe(X), u("ready");
        return;
      }
      v({});
      const S = hu();
      if (S !== null && S !== "home") {
        const { pathname: R, search: X } = window.location;
        Lo(R, X, wt("home")), r("home"), ct(null), z(null), ee(null), U(null), Q(null), ne(null);
      }
      u("ready");
    } catch (d) {
      if (Fo(d))
        return;
      const S = d instanceof Error ? d.message : "Unknown error";
      m(S), u("error");
    }
  }
  async function Tt(d = !1) {
    d || u("loading"), m("");
    try {
      const S = await Ie();
      qe(S), u("ready");
    } catch (S) {
      if (Fo(S))
        return;
      const R = S instanceof Error ? S.message : "Unknown error";
      m(R), u("error");
    }
  }
  Qo(() => {
    Nt();
  }, []);
  const gr = vt(() => {
    var R;
    const d = ((R = p.servers) == null ? void 0 : R.servers) ?? [];
    if (!h.trim())
      return d;
    const S = h.toLowerCase();
    return d.filter(
      (X) => X.name.toLowerCase().includes(S) || X.transport.toLowerCase().includes(S) || qi(X).toLowerCase().includes(S) || Na(qi(X)).toLowerCase().includes(S) || X.connection_summary.toLowerCase().includes(S)
    );
  }, [(mc = p.servers) == null ? void 0 : mc.servers, h]), br = vt(() => {
    var R;
    let d = ((R = p.tools) == null ? void 0 : R.tools) ?? [];
    if (O !== "all" && (d = d.filter((X) => X.server === O)), !_.trim())
      return d;
    const S = _.toLowerCase();
    return d.filter(
      (X) => X.name.toLowerCase().includes(S) || X.server.toLowerCase().includes(S) || X.canonical_name.toLowerCase().includes(S) || Ki(X).toLowerCase().includes(S)
    );
  }, [(hc = p.tools) == null ? void 0 : hc.tools, _, O]), Jl = vt(() => {
    var S;
    const d = new Set((((S = p.tools) == null ? void 0 : S.tools) ?? []).map((R) => R.server));
    return Array.from(d).sort();
  }, [(gc = p.tools) == null ? void 0 : gc.tools]), xm = vt(() => {
    var R;
    let d = ((R = p.tools) == null ? void 0 : R.tools) ?? [];
    if (B !== "all" && (d = d.filter((X) => X.server === B)), !M.trim())
      return d;
    const S = M.toLowerCase();
    return d.filter(
      (X) => X.name.toLowerCase().includes(S) || X.canonical_name.toLowerCase().includes(S) || X.server.toLowerCase().includes(S) || Ki(X).toLowerCase().includes(S)
    );
  }, [(bc = p.tools) == null ? void 0 : bc.tools, M, B]), Ql = vt(() => {
    var d;
    return [...((d = p.servers) == null ? void 0 : d.servers) ?? []].filter((S) => S.enabled).sort((S, R) => S.name.localeCompare(R.name));
  }, [(yc = p.servers) == null ? void 0 : yc.servers]), Zl = vt(
    () => {
      var d;
      return al(
        ((d = p.tools) == null ? void 0 : d.tools) ?? [],
        le.selectedTools,
        le.selectedServers
      );
    },
    [(vc = p.tools) == null ? void 0 : vc.tools, le.selectedTools, le.selectedServers]
  ), ec = vt(() => {
    var S;
    const d = new Map(
      (((S = p.tools) == null ? void 0 : S.tools) ?? []).map((R) => [R.canonical_name, R])
    );
    return Zl.map((R) => {
      const X = d.get(R);
      return X || {
        name: R,
        canonical_name: R,
        server: "Unknown",
        description: "",
        enabled: !0,
        server_enabled: !0
      };
    });
  }, [(xc = p.tools) == null ? void 0 : xc.tools, Zl]), Ko = vt(
    () => {
      var d;
      return Iu(
        ((d = p.tools) == null ? void 0 : d.tools) ?? [],
        le.selectedTools,
        le.selectedServers,
        le.excludedTools
      );
    },
    [
      (Cc = p.tools) == null ? void 0 : Cc.tools,
      le.selectedTools,
      le.selectedServers,
      le.excludedTools
    ]
  ), Cm = vt(
    () => {
      var d;
      return vw(((d = p.tools) == null ? void 0 : d.tools) ?? [], Ko);
    },
    [(Sc = p.tools) == null ? void 0 : Sc.tools, Ko]
  ), Sm = vt(
    () => Ko.join(`
`),
    [Ko]
  ), Tm = vt(() => {
    var S;
    const d = new Set((((S = p.prompts) == null ? void 0 : S.prompts) ?? []).map((R) => R.server));
    return Array.from(d).sort();
  }, [(Tc = p.prompts) == null ? void 0 : Tc.prompts]), wm = vt(() => {
    var R;
    let d = ((R = p.prompts) == null ? void 0 : R.prompts) ?? [];
    if (W !== "all" && (d = d.filter((X) => X.server === W)), !A.trim())
      return d;
    const S = A.toLowerCase();
    return d.filter(
      (X) => X.name.toLowerCase().includes(S) || X.canonical_name.toLowerCase().includes(S) || X.server.toLowerCase().includes(S) || Yi(X).toLowerCase().includes(S)
    );
  }, [(wc = p.prompts) == null ? void 0 : wc.prompts, A, W]), tc = vt(() => {
    var R;
    const d = ((R = p.prompts) == null ? void 0 : R.prompts) ?? [];
    if (!T.trim())
      return d;
    const S = T.toLowerCase();
    return d.filter(
      (X) => X.name.toLowerCase().includes(S) || X.canonical_name.toLowerCase().includes(S) || X.server.toLowerCase().includes(S) || Yi(X).toLowerCase().includes(S)
    );
  }, [(Ec = p.prompts) == null ? void 0 : Ec.prompts, T]), Ci = vt(
    () => {
      var d;
      return [...((d = p.toolGroups) == null ? void 0 : d.tool_groups) ?? []].map((S) => S.name).sort((S, R) => S.localeCompare(R));
    },
    [(Oc = p.toolGroups) == null ? void 0 : Oc.tool_groups]
  ), Si = vt(
    () => {
      var d;
      return [...((d = p.promptGroups) == null ? void 0 : d.prompt_groups) ?? []].map((S) => S.name).sort((S, R) => S.localeCompare(R));
    },
    [(Rc = p.promptGroups) == null ? void 0 : Rc.prompt_groups]
  ), Em = vt(
    () => Mu(Ci, co ? [co] : []),
    [Ci, co]
  ), Om = vt(
    () => Mu(Si, wo ? [wo] : []),
    [Si, wo]
  ), yr = vt(() => {
    var S;
    const d = (S = p.agentApps) == null ? void 0 : S.apps;
    return !(d != null && d.length) || Be === null ? null : d.find((R) => R.id === Be) ?? null;
  }, [(_c = p.agentApps) == null ? void 0 : _c.apps, Be]), vr = vt(() => {
    var S;
    const d = (S = p.servers) == null ? void 0 : S.servers;
    return !(d != null && d.length) || ie === null ? null : d.find((R) => R.name === ie) ?? null;
  }, [(Nc = p.servers) == null ? void 0 : Nc.servers, ie]), xr = vt(() => {
    var S;
    const d = (S = p.toolGroups) == null ? void 0 : S.tool_groups;
    return !(d != null && d.length) || re === null ? null : d.find((R) => R.name === re) ?? null;
  }, [(kc = p.toolGroups) == null ? void 0 : kc.tool_groups, re]), Ti = vt(() => {
    var S;
    const d = (S = p.toolGroups) == null ? void 0 : S.tool_groups;
    return !(d != null && d.length) || G !== "edit" || !je ? null : d.find((R) => R.name === je) ?? null;
  }, [(Pc = p.toolGroups) == null ? void 0 : Pc.tool_groups, G, je]);
  Qo(() => {
    I("detail");
  }, [re]), Qo(() => {
    G !== "create" && G !== "edit" || (g("servers"), G === "create" && (ze(Ji()), He(""), D(""), F("all"), Pe(null)));
  }, [G, je]), Qo(() => {
    var S;
    if (G !== "edit" || !je)
      return;
    const d = (S = p.toolGroups) == null ? void 0 : S.tool_groups.find((R) => R.name === je);
    d && (ze({
      name: d.name,
      description: d.description ?? "",
      securityOption: d.security_option,
      selectedTools: d.included_tools ?? [],
      selectedServers: d.included_servers ?? [],
      excludedTools: d.excluded_tools ?? []
    }), He(""), D(""), F("all"));
  }, [G, je, (Ic = p.toolGroups) == null ? void 0 : Ic.tool_groups]), Qo(() => {
    var S;
    const d = new Set(
      al(
        ((S = p.tools) == null ? void 0 : S.tools) ?? [],
        le.selectedTools,
        le.selectedServers
      )
    );
    ze((R) => {
      const X = R.excludedTools.filter((ve) => d.has(ve));
      return X.length === R.excludedTools.length ? R : { ...R, excludedTools: X };
    });
  }, [($c = p.tools) == null ? void 0 : $c.tools, le.selectedTools, le.selectedServers]);
  const Cr = vt(() => {
    var S;
    const d = (S = p.promptGroups) == null ? void 0 : S.prompt_groups;
    return !(d != null && d.length) || Y === null ? null : d.find((R) => R.name === Y) ?? null;
  }, [(Mc = p.promptGroups) == null ? void 0 : Mc.prompt_groups, Y]), Sr = vt(() => {
    var S;
    const d = (S = p.tools) == null ? void 0 : S.tools;
    return !(d != null && d.length) || V === null ? null : d.find((R) => R.canonical_name === V) ?? null;
  }, [(Ac = p.tools) == null ? void 0 : Ac.tools, V]), Tr = vt(() => {
    var S;
    const d = (S = p.prompts) == null ? void 0 : S.prompts;
    return !(d != null && d.length) || te === null ? null : d.find((R) => R.canonical_name === te) ?? null;
  }, [(Dc = p.prompts) == null ? void 0 : Dc.prompts, te]), qt = p.overview, bn = p.diagnostics;
  p.agentApps;
  const oc = !e && i !== null && i.oidc_enabled && !i.authenticated, Rm = !e && (i != null && i.oidc_enabled) && i.authenticated ? (qt == null ? void 0 : qt.oidc_logout_path) ?? i.logout_path : void 0, _m = e && !t ? (Bc = i == null ? void 0 : i.email) == null ? void 0 : Bc.trim() : void 0, la = Cw[n];
  function mo(d, S) {
    fo((R) => {
      const X = { ...R };
      return S ? X[d] = !0 : delete X[d], X;
    });
  }
  function Xe(d) {
    return !!po[d];
  }
  async function Yo(d, S, R) {
    x(null), mo(d, !0);
    try {
      await S(), await Tt(!0), x({ tone: "success", message: R });
    } catch (X) {
      if (Fo(X))
        return;
      const ve = X instanceof Error ? X.message : "Request failed";
      throw x({ tone: "error", message: ve }), X;
    } finally {
      mo(d, !1);
    }
  }
  function dt(d, S) {
    Me((R) => ({ ...R, [d]: S }));
  }
  function wi(d, S, R, X) {
    Me((ve) => {
      const et = ve[d].map(
        (ut, Mt) => Mt === S ? { ...ut, [R]: X } : ut
      );
      return { ...ve, [d]: et };
    });
  }
  function nc(d) {
    Me((S) => ({ ...S, [d]: [...S[d], ur()] }));
  }
  function rc(d, S) {
    Me((R) => {
      const X = R[d].filter((ve, et) => et !== S);
      return { ...R, [d]: X.length > 0 ? X : [ur()] };
    });
  }
  function wr(d, S, R) {
    Me((X) => {
      const ve = X.parameter_rows.map(
        (et, ut) => ut === d ? { ...et, [S]: R } : et
      );
      return { ...X, parameter_rows: ve };
    });
  }
  function Nm() {
    Me((d) => ({
      ...d,
      parameter_rows: [...d.parameter_rows, Es()]
    }));
  }
  function km(d) {
    Me((S) => {
      const R = S.parameter_rows.filter((X, ve) => ve !== d);
      return {
        ...S,
        parameter_rows: R.length > 0 ? R : [Es()]
      };
    });
  }
  function Pm(d) {
    Me((S) => ({
      ...S,
      upstream_type: d,
      transport: d === "mcp_protocol" ? "streamable_http" : "rest"
    }));
  }
  const ic = fe !== null, Ei = ic ? "Leave blank to keep the current value." : void 0;
  function sc() {
    return /* @__PURE__ */ C(Ve, { children: [
      /* @__PURE__ */ a(J, { variant: "subtitle2", gutterBottom: !0, children: "Upstream authentication" }),
      /* @__PURE__ */ C(ce, { spacing: 2, children: [
        /* @__PURE__ */ C(Yt, { fullWidth: !0, size: "small", children: [
          /* @__PURE__ */ a(Xt, { id: "reg-rest-auth", children: "Auth type" }),
          /* @__PURE__ */ C(
            Ut,
            {
              labelId: "reg-rest-auth",
              label: "Auth type",
              value: Z.rest_auth_type,
              onChange: (d) => dt("rest_auth_type", d.target.value),
              children: [
                /* @__PURE__ */ a(Ye, { value: "none", children: "none" }),
                /* @__PURE__ */ a(Ye, { value: "api_key", children: "api_key" }),
                /* @__PURE__ */ a(Ye, { value: "basic", children: "basic" }),
                /* @__PURE__ */ a(Ye, { value: "bearer", children: "bearer" }),
                /* @__PURE__ */ a(Ye, { value: "oauth", children: "oauth" })
              ]
            }
          )
        ] }),
        Z.rest_auth_type === "api_key" ? /* @__PURE__ */ C(Bt, { children: [
          /* @__PURE__ */ a(
            De,
            {
              label: "API key header",
              fullWidth: !0,
              size: "small",
              placeholder: "X-API-Key",
              value: Z.api_key_header,
              onChange: (d) => dt("api_key_header", d.target.value)
            }
          ),
          /* @__PURE__ */ a(
            De,
            {
              label: "API key query param",
              fullWidth: !0,
              size: "small",
              placeholder: "api_key",
              value: Z.api_key_query,
              onChange: (d) => dt("api_key_query", d.target.value)
            }
          ),
          /* @__PURE__ */ a(
            De,
            {
              label: "API key value",
              fullWidth: !0,
              size: "small",
              type: "password",
              value: Z.api_key_value,
              onChange: (d) => dt("api_key_value", d.target.value),
              helperText: Ei
            }
          )
        ] }) : null,
        Z.rest_auth_type === "basic" ? /* @__PURE__ */ C(Bt, { children: [
          /* @__PURE__ */ a(
            De,
            {
              label: "Username",
              fullWidth: !0,
              size: "small",
              value: Z.basic_username,
              onChange: (d) => dt("basic_username", d.target.value)
            }
          ),
          /* @__PURE__ */ a(
            De,
            {
              label: "Password",
              fullWidth: !0,
              size: "small",
              type: "password",
              value: Z.basic_password,
              onChange: (d) => dt("basic_password", d.target.value),
              helperText: Ei
            }
          )
        ] }) : null,
        Z.rest_auth_type === "bearer" ? /* @__PURE__ */ a(
          De,
          {
            label: "Bearer token",
            fullWidth: !0,
            size: "small",
            type: "password",
            value: Z.bearer_token,
            onChange: (d) => dt("bearer_token", d.target.value),
            helperText: Ei
          }
        ) : null,
        Z.rest_auth_type === "oauth" ? /* @__PURE__ */ C(Bt, { children: [
          /* @__PURE__ */ a(
            De,
            {
              label: "OAuth redirect URI",
              fullWidth: !0,
              size: "small",
              value: Z.oauth_redirect_uri,
              onChange: (d) => dt("oauth_redirect_uri", d.target.value)
            }
          ),
          /* @__PURE__ */ a(
            De,
            {
              label: "OAuth client ID",
              fullWidth: !0,
              size: "small",
              value: Z.oauth_client_id,
              onChange: (d) => dt("oauth_client_id", d.target.value)
            }
          ),
          /* @__PURE__ */ a(
            De,
            {
              label: "OAuth client secret",
              fullWidth: !0,
              size: "small",
              type: "password",
              value: Z.oauth_client_secret,
              onChange: (d) => dt("oauth_client_secret", d.target.value),
              helperText: Ei
            }
          ),
          /* @__PURE__ */ a(
            De,
            {
              label: "OAuth scopes",
              fullWidth: !0,
              size: "small",
              multiline: !0,
              minRows: 2,
              placeholder: `scope.one
scope.two`,
              value: Z.oauth_scopes_text,
              onChange: (d) => dt("oauth_scopes_text", d.target.value)
            }
          )
        ] }) : null
      ] })
    ] });
  }
  function ac() {
    Me(Xi()), se(null), Fe(!1), Ue(""), Ge(null), j(!0);
  }
  function yn() {
    j(!1), se(null), Fe(!1), Ue(""), Ge(null), Me(Xi());
  }
  async function Im(d) {
    Ue(""), Ge(null), se(d), j(!0), Fe(!0), Me(Xi());
    try {
      const S = await Le.getServerConfig(d);
      Me(kw(S, !0));
    } catch (S) {
      if (Fo(S))
        return;
      const R = S instanceof Error ? S.message : "Failed to load server configuration";
      x({ tone: "error", message: R }), yn();
    } finally {
      Fe(!1);
    }
  }
  function $m(d = "") {
    Ge(null), Ue(d);
  }
  function Oi() {
    if (Pt()) {
      it(wt("tool_groups"));
      return;
    }
    ee(null), K(null), Pe(null);
  }
  function lc() {
    if (Pt()) {
      it(lS());
      return;
    }
    ee(null), K("create");
  }
  function Mm(d) {
    if (Pt()) {
      it(cS(d.name));
      return;
    }
    ee(null), Pe(d.name), K("edit");
  }
  function cc() {
    const d = je;
    if (Pt()) {
      G === "edit" && d ? it(Pr(d)) : Oi();
      return;
    }
    K(null), Pe(null), ze(Ji()), He(""), ee(G === "edit" && d ? d : null);
  }
  function Am(d) {
    ze((S) => ({
      ...S,
      selectedTools: S.selectedTools.includes(d) ? S.selectedTools.filter((R) => R !== d) : [...S.selectedTools, d]
    }));
  }
  function Dm(d) {
    ze((S) => ({
      ...S,
      selectedTools: S.selectedTools.filter((R) => R !== d)
    }));
  }
  function Bm(d) {
    ze((S) => ({
      ...S,
      selectedServers: S.selectedServers.includes(d) ? S.selectedServers.filter((R) => R !== d) : [...S.selectedServers, d]
    }));
  }
  function Lm(d) {
    ze((S) => ({
      ...S,
      selectedServers: S.selectedServers.filter((R) => R !== d)
    }));
  }
  function Fm(d) {
    ze((S) => ({
      ...S,
      excludedTools: S.excludedTools.includes(d) ? S.excludedTools.filter((R) => R !== d) : [...S.excludedTools, d]
    }));
  }
  function jm(d) {
    ze((S) => ({
      ...S,
      excludedTools: S.excludedTools.filter((R) => R !== d)
    }));
  }
  function dc() {
    lt(null), _e(ka()), Jt(""), L(""), q("all"), me(!0);
  }
  function Wm(d) {
    lt(d.name), _e({
      name: d.name,
      description: d.description ?? "",
      securityOption: d.security_option,
      selectedPrompts: d.prompts.map((S) => S.canonical_name)
    }), Jt(""), L(""), q("all"), me(!0);
  }
  function Ri() {
    me(!1), lt(null), _e(ka()), Jt("");
  }
  function zm(d) {
    _e((S) => ({
      ...S,
      selectedPrompts: S.selectedPrompts.includes(d) ? S.selectedPrompts.filter((R) => R !== d) : [...S.selectedPrompts, d]
    }));
  }
  function Vm(d) {
    _e((S) => ({
      ...S,
      selectedPrompts: S.selectedPrompts.filter((R) => R !== d)
    }));
  }
  async function Um() {
    const d = Iw(Z, fe !== null);
    if (d) {
      Ue(d);
      return;
    }
    Ue("");
    try {
      x(null), mo("register-server", !0);
      const S = fe;
      if (S) {
        await Le.updateServer(S, Wu(Z)), await Tt(!0), x({ tone: "success", message: `Server ${Z.name.trim()} updated.` }), yn();
        return;
      }
      const R = await Le.registerServer(Wu(Z));
      if (R.authorization_required) {
        Ge({
          authorization: R.authorization_required,
          hasOpenedBrowser: !1,
          error: ""
        }), x(null);
        return;
      }
      await Tt(!0), x({ tone: "success", message: `Server ${Z.name.trim()} registered.` }), yn();
    } catch (S) {
      if (Fo(S))
        return;
      const R = S instanceof Error ? S.message : "Request failed";
      Ue(R), x({ tone: "error", message: R });
    } finally {
      mo("register-server", !1);
    }
  }
  function Gm() {
    Re && (window.open(Re.authorization.authorization_url, "_blank", "noopener,noreferrer"), Ge(
      (d) => d && {
        ...d,
        hasOpenedBrowser: !0,
        error: ""
      }
    ));
  }
  Qo(() => {
    if (!(Re != null && Re.hasOpenedBrowser))
      return;
    let d = !1;
    const S = Re.authorization.session_id;
    async function R() {
      try {
        const ve = await Le.getOAuthSession(S);
        if (d || ve.status === "pending")
          return;
        if (ve.status === "completed") {
          if (await Tt(!0), d)
            return;
          x({
            tone: "success",
            message: `Server ${ve.server_name ?? Z.name.trim()} registered.`
          }), yn();
          return;
        }
        Ge(
          (et) => et && {
            ...et,
            hasOpenedBrowser: !1,
            error: ve.error || "OAuth authorization could not be completed. Start registration again."
          }
        );
      } catch (ve) {
        if (d || Fo(ve))
          return;
        const et = ve instanceof Error ? ve.message : "Failed to check OAuth authorization state.";
        Ge(
          (ut) => ut && {
            ...ut,
            hasOpenedBrowser: !1,
            error: et
          }
        );
      }
    }
    R();
    const X = window.setInterval(() => {
      R();
    }, 2e3);
    return () => {
      d = !0, window.clearInterval(X);
    };
  }, [Re == null ? void 0 : Re.authorization.session_id, Re == null ? void 0 : Re.hasOpenedBrowser]);
  async function Hm(d) {
    const S = !d.enabled;
    await Yo(
      `server-toggle:${d.name}`,
      async () => {
        await Le.setServerEnabled(d.name, S);
      },
      `${d.name} ${S ? "enabled" : "disabled"}.`
    );
  }
  async function qm(d) {
    if (window.confirm(
      `Delete server "${d.name}"? This removes the registration and all discovered tools, prompts, and resources from MCP Gateway.`
    ) && (await Yo(
      `server-delete:${d.name}`,
      async () => {
        await Le.deleteServer(d.name);
      },
      `${d.name} deleted.`
    ), ie === d.name)) {
      z(null);
      const { pathname: R, search: X } = window.location;
      Lo(R, X, wt("servers"));
    }
  }
  async function Km(d) {
    window.confirm(
      `Re-register server "${d.name}"? This refreshes tools, prompts, and resources from upstream and resyncs dependent tool and prompt groups.`
    ) && await Yo(
      `server-reregister:${d.name}`,
      async () => {
        await Le.reregisterServer(d.name);
      },
      `${d.name} re-registered.`
    );
  }
  async function Ym(d) {
    const S = !d.enabled;
    await Yo(
      `tool-toggle:${d.canonical_name}`,
      async () => {
        await Le.setToolEnabled(d.canonical_name, S);
      },
      `${d.canonical_name} ${S ? "enabled" : "disabled"}.`
    );
  }
  async function Xm(d) {
    const S = !d.enabled;
    await Yo(
      `prompt-toggle:${d.canonical_name}`,
      async () => {
        await Le.setPromptEnabled(d.canonical_name, S);
      },
      `${d.canonical_name} ${S ? "enabled" : "disabled"}.`
    );
  }
  async function Jm() {
    var ve, et;
    const d = je, S = d ?? le.name.trim();
    if (!S) {
      He("Group name is required.");
      return;
    }
    if (Iu(
      ((ve = p.tools) == null ? void 0 : ve.tools) ?? [],
      le.selectedTools,
      le.selectedServers,
      le.excludedTools
    ).length === 0) {
      He("Add at least one included tool or server so the group exposes tools.");
      return;
    }
    if (!d && (((et = p.toolGroups) == null ? void 0 : et.tool_groups) ?? []).some((ut) => ut.name === S)) {
      He("A tool group with that name already exists.");
      return;
    }
    He(""), x(null);
    const X = d ? "tool-group-save" : "tool-group-create";
    mo(X, !0);
    try {
      if (d)
        await Le.updateToolGroup(d, {
          description: le.description.trim(),
          tools: le.selectedTools,
          included_servers: le.selectedServers,
          excluded_tools: le.excludedTools,
          security_option: le.securityOption
        }), await Tt(!0), x({ tone: "success", message: `Tool group ${d} updated.` });
      else {
        const ut = {
          name: S,
          description: le.description.trim(),
          tools: le.selectedTools,
          included_servers: le.selectedServers,
          excluded_tools: le.excludedTools,
          security_option: le.securityOption
        };
        await Le.createToolGroup(ut), await Tt(!0), x({ tone: "success", message: `Tool group ${S} created.` });
      }
      Pt() ? it(Pr(d || S)) : (K(null), Pe(null), ze(Ji()), He(""), ee(d ?? S));
    } catch (ut) {
      if (Fo(ut))
        return;
      const Mt = ut instanceof Error ? ut.message : "Request failed";
      He(Mt), x({ tone: "error", message: Mt });
    } finally {
      mo(X, !1);
    }
  }
  async function Qm() {
    var X;
    const d = Ae, S = d ?? We.name.trim();
    if (!S) {
      Jt("Group name is required.");
      return;
    }
    if (We.selectedPrompts.length === 0) {
      Jt("Select at least one prompt.");
      return;
    }
    if (!d && (((X = p.promptGroups) == null ? void 0 : X.prompt_groups) ?? []).some((ve) => ve.name === S)) {
      Jt("A prompt group with that name already exists.");
      return;
    }
    Jt(""), x(null);
    const R = d ? "prompt-group-save" : "prompt-group-create";
    mo(R, !0);
    try {
      if (d)
        await Le.updatePromptGroup(d, {
          description: We.description.trim(),
          prompts: We.selectedPrompts,
          security_option: We.securityOption
        }), await Tt(!0), x({ tone: "success", message: `Prompt group ${d} updated.` });
      else {
        const ve = {
          name: S,
          description: We.description.trim(),
          prompts: We.selectedPrompts,
          security_option: We.securityOption
        };
        await Le.createPromptGroup(ve), await Tt(!0), x({ tone: "success", message: `Prompt group ${S} created.` });
      }
      Ri(), it(ji(d || S));
    } catch (ve) {
      if (Fo(ve))
        return;
      const et = ve instanceof Error ? ve.message : "Request failed";
      Jt(et), x({ tone: "error", message: et });
    } finally {
      mo(R, !1);
    }
  }
  async function Zm(d) {
    window.confirm(`Delete tool group "${d.name}"?`) && await Yo(
      `tool-group-delete:${d.name}`,
      async () => {
        await Le.deleteToolGroup(d.name);
      },
      `${d.name} deleted.`
    );
  }
  async function eh(d) {
    window.confirm(`Delete prompt group "${d.name}"?`) && await Yo(
      `prompt-group-delete:${d.name}`,
      async () => {
        await Le.deletePromptGroup(d.name);
      },
      `${d.name} deleted.`
    );
  }
  function uc() {
    Je(null), To(""), ln(""), uo(""), Ht(""), Qt(!1), de(""), Ao(!0);
  }
  function th(d) {
    Je(d.id), To(d.name), ln(d.description ?? ""), de("");
    const S = d.tool_group_names ?? [], R = d.prompt_group_names ?? [];
    S.length === 0 && R.length === 0 || S.length > 1 || R.length > 1 || S.length > 0 && R.length > 0 ? (uo(""), Ht(""), Qt(!0)) : (Qt(!1), uo(S[0] ?? ""), Ht(R[0] ?? "")), Ao(!0);
  }
  function _i() {
    Ao(!1), de(""), Je(null), To(""), ln(""), uo(""), Ht(""), Qt(!1);
  }
  async function oh() {
    const d = Wt.trim();
    if (!d) {
      de("Name is required.");
      return;
    }
    const S = co.trim() ? [co.trim()] : [], R = wo.trim() ? [wo.trim()] : [];
    if (!(S.length === 1 && R.length === 0 || S.length === 0 && R.length === 1)) {
      de("Select exactly one tool group or exactly one prompt group.");
      return;
    }
    de(""), x(null);
    const ve = he, et = ve !== null ? `agent-app-edit:${ve}` : "agent-app-create";
    mo(et, !0);
    try {
      if (ve !== null) {
        const vn = {
          name: d,
          description: ro.trim(),
          tool_group_names: S,
          prompt_group_names: R
        };
        await Le.patchAgentApp(ve, vn), _i(), await Tt(!0), x({ tone: "success", message: `${d} updated.` });
        return;
      }
      const ut = {
        name: d,
        description: ro.trim() || void 0,
        tool_group_names: S,
        prompt_group_names: R
      }, Mt = await Le.createAgentApp(ut);
      Se({
        title: `Client secret for ${Mt.app.name}`,
        secret: Mt.client_secret
      }), _i(), await Tt(!0), it(Ra(Mt.app.id)), x({
        tone: "success",
        message: `${Mt.app.name} created. Copy the client secret from the dialog — it will not be shown again.`
      });
    } catch (ut) {
      if (Fo(ut))
        return;
      const Mt = ut instanceof Error ? ut.message : "Request failed";
      de(Mt), x({ tone: "error", message: Mt });
    } finally {
      mo(et, !1);
    }
  }
  async function nh(d) {
    window.confirm(`Delete agent app "${d.name}"? This cannot be undone.`) && await Yo(
      `agent-app-delete:${d.id}`,
      async () => {
        await Le.deleteAgentApp(d.id);
      },
      `${d.name} deleted.`
    );
  }
  async function rh(d) {
    const S = d.status === "enabled" ? "disabled" : "enabled";
    await Yo(
      `agent-app-status:${d.id}`,
      async () => {
        await Le.patchAgentApp(d.id, { status: S });
      },
      S === "enabled" ? `${d.name} enabled.` : `${d.name} disabled.`
    );
  }
  async function ih(d) {
    if (window.confirm(
      `Rotate secret for "${d.name}"? The previous secret stops working immediately.`
    )) {
      x(null), mo(`agent-app-rotate:${d.id}`, !0);
      try {
        const R = await Le.rotateAgentAppSecret(d.id);
        Se({
          title: `New client secret for ${d.name}`,
          secret: R.client_secret
        }), await Tt(!0), x({
          tone: "success",
          message: `Secret rotated for ${d.name}. Copy it from the dialog — it will not be shown again.`
        });
      } catch (R) {
        if (Fo(R))
          return;
        const X = R instanceof Error ? R.message : "Request failed";
        x({ tone: "error", message: X });
      } finally {
        mo(`agent-app-rotate:${d.id}`, !1);
      }
    }
  }
  function pc(d, S) {
    return S != null && S.length ? /* @__PURE__ */ C(Ve, { sx: { mt: 2 }, children: [
      /* @__PURE__ */ a(J, { variant: "subtitle2", sx: { mb: 1 }, children: d }),
      /* @__PURE__ */ a(ce, { spacing: 2, children: S.map((R) => /* @__PURE__ */ C(yt, { variant: "outlined", sx: { p: 1.5, borderRadius: 2 }, children: [
        /* @__PURE__ */ a(J, { variant: "body2", sx: { fontWeight: 700, mb: 1 }, children: R.name }),
        /* @__PURE__ */ C("div", { className: "tool-group-endpoints", children: [
          /* @__PURE__ */ C("div", { className: "tool-group-endpoint-row", children: [
            /* @__PURE__ */ a("span", { className: "tool-group-endpoint-label", children: "Streamable HTTP" }),
            /* @__PURE__ */ C("div", { className: "tool-group-endpoint-value", children: [
              /* @__PURE__ */ a("code", { className: "detail-target-code", title: R.streamable_http_endpoint, children: R.streamable_http_endpoint }),
              /* @__PURE__ */ a(
                bt,
                {
                  ariaLabel: "Copy Streamable HTTP endpoint",
                  title: "Copy Streamable HTTP endpoint",
                  value: R.streamable_http_endpoint
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ C("div", { className: "tool-group-endpoint-row", children: [
            /* @__PURE__ */ a("span", { className: "tool-group-endpoint-label", children: "SSE" }),
            /* @__PURE__ */ C("div", { className: "tool-group-endpoint-stack", children: [
              /* @__PURE__ */ C("div", { className: "tool-group-endpoint-value", children: [
                /* @__PURE__ */ a("code", { className: "detail-target-code", title: R.sse_endpoint, children: R.sse_endpoint }),
                /* @__PURE__ */ a(bt, { ariaLabel: "Copy SSE endpoint", title: "Copy SSE endpoint", value: R.sse_endpoint })
              ] }),
              R.sse_message_endpoint ? /* @__PURE__ */ C("div", { className: "tool-group-endpoint-value", children: [
                /* @__PURE__ */ a("code", { className: "detail-target-code", title: R.sse_message_endpoint, children: R.sse_message_endpoint }),
                /* @__PURE__ */ a(
                  bt,
                  {
                    ariaLabel: "Copy SSE message endpoint",
                    title: "Copy SSE message endpoint",
                    value: R.sse_message_endpoint
                  }
                )
              ] }) : null
            ] })
          ] })
        ] })
      ] }, R.name)) })
    ] }) : null;
  }
  function sh() {
    var S;
    const d = G === "edit";
    return /* @__PURE__ */ a("div", { className: "tool-group-form-page", children: /* @__PURE__ */ C(ce, { spacing: 2, children: [
      /* @__PURE__ */ a(
        De,
        {
          label: "Group name",
          placeholder: "coding",
          fullWidth: !0,
          size: "small",
          value: le.name,
          disabled: d,
          helperText: d ? "Group name cannot be changed." : void 0,
          onChange: (R) => ze((X) => ({ ...X, name: R.target.value }))
        }
      ),
      /* @__PURE__ */ a(
        De,
        {
          label: "Description",
          placeholder: "Tools useful for coding workflows",
          fullWidth: !0,
          size: "small",
          value: le.description,
          onChange: (R) => ze((X) => ({ ...X, description: R.target.value }))
        }
      ),
      /* @__PURE__ */ C(Yt, { size: "small", fullWidth: !0, children: [
        /* @__PURE__ */ a(Xt, { id: "tg-mcp-security-label", children: "MCP security" }),
        /* @__PURE__ */ a(
          Ut,
          {
            labelId: "tg-mcp-security-label",
            label: "MCP security",
            value: le.securityOption,
            onChange: (R) => ze((X) => ({
              ...X,
              securityOption: R.target.value
            })),
            children: sl.map((R) => /* @__PURE__ */ a(Ye, { value: R.value, children: R.label }, R.value))
          }
        )
      ] }),
      /* @__PURE__ */ a("div", { className: "tool-group-sections", children: /* @__PURE__ */ C("div", { className: "tool-group-tools-tabs panel", children: [
        /* @__PURE__ */ C(
          Ss,
          {
            "aria-label": "Tool group configuration",
            onChange: (R, X) => g(X),
            sx: {
              borderBottom: 1,
              borderColor: "divider",
              minHeight: 48,
              px: 1,
              "& .MuiTab-root": {
                minHeight: 48,
                textTransform: "none",
                fontWeight: 500,
                fontSize: "0.875rem"
              }
            },
            value: P,
            variant: "scrollable",
            scrollButtons: "auto",
            children: [
              /* @__PURE__ */ a(cn, { label: `Include servers (${le.selectedServers.length})`, value: "servers" }),
              /* @__PURE__ */ a(cn, { label: `Include tools (${le.selectedTools.length})`, value: "include" }),
              /* @__PURE__ */ a(cn, { label: `Exclude tools (${le.excludedTools.length})`, value: "exclude" }),
              /* @__PURE__ */ a(cn, { label: `Effective tools (${Ko.length})`, value: "effective" })
            ]
          }
        ),
        P === "servers" ? /* @__PURE__ */ C("section", { className: "tool-group-section tool-group-tab-panel", children: [
          /* @__PURE__ */ C("div", { className: "tool-group-section-header", children: [
            /* @__PURE__ */ a("strong", { children: "Included servers" }),
            /* @__PURE__ */ a("span", { className: "tool-group-section-hint", children: "All tools from selected servers are added." })
          ] }),
          /* @__PURE__ */ C("div", { className: "tool-group-builder", children: [
            /* @__PURE__ */ C("div", { className: "tool-group-selector", children: [
              /* @__PURE__ */ a("div", { className: "tool-group-selector-header", children: /* @__PURE__ */ a("span", { children: "Available servers" }) }),
              Ql.length > 0 ? /* @__PURE__ */ a("div", { className: "tool-pick-list tool-pick-list-compact", children: Ql.map((R) => {
                const X = le.selectedServers.includes(R.name);
                return /* @__PURE__ */ C(
                  "button",
                  {
                    className: `tool-pick-item ${X ? "is-selected" : ""}`,
                    onClick: () => Bm(R.name),
                    type: "button",
                    children: [
                      /* @__PURE__ */ a("div", { className: "table-primary", children: R.name }),
                      /* @__PURE__ */ C("div", { className: "table-secondary", children: [
                        R.tool_count,
                        " tools"
                      ] })
                    ]
                  },
                  R.name
                );
              }) }) : /* @__PURE__ */ a("p", { className: "empty-inline", children: "Register enabled MCP servers first." })
            ] }),
            /* @__PURE__ */ C("div", { className: "tool-group-selector", children: [
              /* @__PURE__ */ a("div", { className: "tool-group-selector-header", children: /* @__PURE__ */ a("span", { children: "Selected servers" }) }),
              le.selectedServers.length > 0 ? /* @__PURE__ */ a("div", { className: "selected-tool-list", children: le.selectedServers.map((R) => /* @__PURE__ */ C(
                "button",
                {
                  className: "selected-tool-chip",
                  onClick: () => Lm(R),
                  type: "button",
                  children: [
                    /* @__PURE__ */ a("code", { children: R }),
                    /* @__PURE__ */ a("span", { children: "Remove" })
                  ]
                },
                R
              )) }) : /* @__PURE__ */ a("p", { className: "empty-inline", children: "No servers selected." })
            ] })
          ] })
        ] }) : null,
        P === "include" ? /* @__PURE__ */ C("section", { className: "tool-group-section tool-group-tab-panel", children: [
          /* @__PURE__ */ C("div", { className: "tool-group-section-header", children: [
            /* @__PURE__ */ a("strong", { children: "Included tools" }),
            /* @__PURE__ */ a("span", { className: "tool-group-section-hint", children: "Explicit canonical tools to add." })
          ] }),
          /* @__PURE__ */ C("div", { className: "tool-group-builder", children: [
            /* @__PURE__ */ C("div", { className: "tool-group-selector", children: [
              /* @__PURE__ */ a("div", { className: "tool-group-selector-header", children: /* @__PURE__ */ a("span", { children: "Available tools" }) }),
              (((S = p.tools) == null ? void 0 : S.tools.length) ?? 0) > 0 ? /* @__PURE__ */ C(Bt, { children: [
                /* @__PURE__ */ C(ce, { direction: { xs: "column", sm: "row" }, spacing: 1, sx: { mb: 1 }, children: [
                  /* @__PURE__ */ a(
                    De,
                    {
                      placeholder: "Search tools",
                      size: "small",
                      value: M,
                      onChange: (R) => D(R.target.value),
                      sx: { flex: 1, minWidth: 0 }
                    }
                  ),
                  /* @__PURE__ */ C(Yt, { size: "small", sx: { minWidth: 160 }, children: [
                    /* @__PURE__ */ a(Xt, { id: "tg-server-filter", children: "Server" }),
                    /* @__PURE__ */ C(
                      Ut,
                      {
                        labelId: "tg-server-filter",
                        label: "Server",
                        value: B,
                        onChange: (R) => F(R.target.value),
                        children: [
                          /* @__PURE__ */ a(Ye, { value: "all", children: "All servers" }),
                          Jl.map((R) => /* @__PURE__ */ a(Ye, { value: R, children: R }, R))
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ a("div", { className: "tool-pick-list tool-pick-list-compact", children: xm.map((R) => {
                  const X = le.selectedTools.includes(R.canonical_name);
                  return /* @__PURE__ */ C(
                    "button",
                    {
                      className: `tool-pick-item ${X ? "is-selected" : ""}`,
                      onClick: () => Am(R.canonical_name),
                      type: "button",
                      children: [
                        /* @__PURE__ */ a("div", { className: "table-primary", children: R.name }),
                        /* @__PURE__ */ a("code", { className: "identifier-code", title: R.canonical_name, children: R.canonical_name }),
                        /* @__PURE__ */ a("div", { className: "table-secondary", children: R.server })
                      ]
                    },
                    R.canonical_name
                  );
                }) })
              ] }) : /* @__PURE__ */ a("p", { className: "empty-inline", children: "Register MCP servers first so tools are available to group." })
            ] }),
            /* @__PURE__ */ C("div", { className: "tool-group-selector", children: [
              /* @__PURE__ */ a("div", { className: "tool-group-selector-header", children: /* @__PURE__ */ a("span", { children: "Selected tools" }) }),
              le.selectedTools.length > 0 ? /* @__PURE__ */ a("div", { className: "selected-tool-list", children: le.selectedTools.map((R) => /* @__PURE__ */ C(
                "button",
                {
                  className: "selected-tool-chip",
                  onClick: () => Dm(R),
                  type: "button",
                  children: [
                    /* @__PURE__ */ a("code", { children: R }),
                    /* @__PURE__ */ a("span", { children: "Remove" })
                  ]
                },
                R
              )) }) : /* @__PURE__ */ a("p", { className: "empty-inline", children: "No tools selected." })
            ] })
          ] })
        ] }) : null,
        P === "exclude" ? /* @__PURE__ */ C("section", { className: "tool-group-section tool-group-tab-panel", children: [
          /* @__PURE__ */ C("div", { className: "tool-group-section-header", children: [
            /* @__PURE__ */ a("strong", { children: "Excluded tools" }),
            /* @__PURE__ */ a("span", { className: "tool-group-section-hint", children: "Remove tools from the included set; only currently included tools can be excluded." })
          ] }),
          /* @__PURE__ */ C("div", { className: "tool-group-builder", children: [
            /* @__PURE__ */ C("div", { className: "tool-group-selector", children: [
              /* @__PURE__ */ a("div", { className: "tool-group-selector-header", children: /* @__PURE__ */ a("span", { children: "Included tools" }) }),
              ec.length > 0 ? /* @__PURE__ */ a("div", { className: "tool-pick-list tool-pick-list-compact", children: ec.map((R) => {
                const X = le.excludedTools.includes(R.canonical_name);
                return /* @__PURE__ */ C(
                  "button",
                  {
                    className: `tool-pick-item tool-pick-item-excluded ${X ? "is-selected" : ""}`,
                    onClick: () => Fm(R.canonical_name),
                    type: "button",
                    children: [
                      /* @__PURE__ */ a("div", { className: "table-primary", children: R.name }),
                      /* @__PURE__ */ a("code", { className: "identifier-code", title: R.canonical_name, children: R.canonical_name }),
                      /* @__PURE__ */ a("div", { className: "table-secondary", children: R.server })
                    ]
                  },
                  `exclude-${R.canonical_name}`
                );
              }) }) : /* @__PURE__ */ a("p", { className: "empty-inline", children: "Add included tools or servers first to choose exclusions." })
            ] }),
            /* @__PURE__ */ C("div", { className: "tool-group-selector", children: [
              /* @__PURE__ */ a("div", { className: "tool-group-selector-header", children: /* @__PURE__ */ a("span", { children: "Excluded tools" }) }),
              le.excludedTools.length > 0 ? /* @__PURE__ */ a("div", { className: "selected-tool-list", children: le.excludedTools.map((R) => /* @__PURE__ */ C(
                "button",
                {
                  className: "selected-tool-chip selected-tool-chip-excluded",
                  onClick: () => jm(R),
                  type: "button",
                  children: [
                    /* @__PURE__ */ a("code", { children: R }),
                    /* @__PURE__ */ a("span", { children: "Remove" })
                  ]
                },
                R
              )) }) : /* @__PURE__ */ a("p", { className: "empty-inline", children: "No exclusions." })
            ] })
          ] })
        ] }) : null,
        P === "effective" ? /* @__PURE__ */ C("section", { className: "tool-group-section tool-group-tab-panel tool-group-preview", children: [
          /* @__PURE__ */ C("div", { className: "tool-group-section-header tool-group-preview-header", children: [
            /* @__PURE__ */ C("div", { children: [
              /* @__PURE__ */ a("strong", { children: "Effective tools preview" }),
              /* @__PURE__ */ C("span", { className: "tool-group-section-hint", children: [
                Ko.length,
                " tool",
                Ko.length === 1 ? "" : "s",
                " after resolution",
                le.excludedTools.length > 0 ? " (excluded tools omitted)" : ""
              ] })
            ] }),
            Ko.length > 0 ? /* @__PURE__ */ a(
              bt,
              {
                ariaLabel: "Copy all effective tools",
                title: "Copy all effective tools (one canonical name per line)",
                value: Sm
              }
            ) : null
          ] }),
          Ko.length > 0 ? /* @__PURE__ */ C("div", { className: "tool-group-effective-table", children: [
            /* @__PURE__ */ C("div", { className: "tool-group-effective-table-head", children: [
              /* @__PURE__ */ a("span", { children: "Tool" }),
              /* @__PURE__ */ a("span", { children: "Canonical name" }),
              /* @__PURE__ */ a("span", { children: "Server" }),
              /* @__PURE__ */ a("span", { className: "tool-group-effective-copy-col", children: "Copy" })
            ] }),
            /* @__PURE__ */ a("div", { className: "tool-group-effective-table-body", children: Cm.map((R) => /* @__PURE__ */ C("div", { className: "tool-group-effective-table-row", children: [
              /* @__PURE__ */ a("span", { className: "table-primary", children: R.name }),
              /* @__PURE__ */ a("code", { className: "identifier-code", title: R.canonical_name, children: R.canonical_name }),
              /* @__PURE__ */ a("span", { className: "table-secondary", children: R.server }),
              /* @__PURE__ */ a("span", { className: "tool-group-effective-copy-col", children: /* @__PURE__ */ a(
                bt,
                {
                  ariaLabel: `Copy ${R.canonical_name}`,
                  title: `Copy ${R.canonical_name}`,
                  value: R.canonical_name
                }
              ) })
            ] }, R.canonical_name)) })
          ] }) : /* @__PURE__ */ a("p", { className: "empty-inline", children: "Add included tools or servers to preview the effective set." })
        ] }) : null
      ] }) }),
      Ke ? /* @__PURE__ */ a(J, { color: "error", variant: "body2", children: Ke }) : null,
      /* @__PURE__ */ C(ce, { direction: "row", spacing: 1, sx: { justifyContent: "flex-end", pt: 1 }, children: [
        /* @__PURE__ */ a(be, { variant: "outlined", onClick: cc, children: "Cancel" }),
        /* @__PURE__ */ a(
          be,
          {
            variant: "contained",
            disabled: Xe("tool-group-create") || Xe("tool-group-save"),
            onClick: () => void Jm(),
            children: Xe("tool-group-create") || Xe("tool-group-save") ? "Saving..." : d ? "Save changes" : "+ Add Tool Group"
          }
        )
      ] })
    ] }) });
  }
  function ah(d) {
    return /* @__PURE__ */ C(Bt, { children: [
      /* @__PURE__ */ C(ce, { direction: "row", spacing: 1, sx: { justifyContent: "flex-end", flexWrap: "wrap", mb: 2 }, children: [
        /* @__PURE__ */ a(
          io,
          {
            "aria-label": "Edit tool group",
            disabled: Xe("tool-group-save") || Xe("tool-group-create"),
            onClick: (S) => {
              S.stopPropagation(), Mm(d);
            },
            title: "Edit tool group",
            size: "small",
            children: /* @__PURE__ */ a(_a, {})
          }
        ),
        /* @__PURE__ */ a(
          io,
          {
            "aria-label": "Delete tool group",
            color: "error",
            disabled: Xe(`tool-group-delete:${d.name}`),
            onClick: (S) => {
              S.stopPropagation(), Zm(d);
            },
            title: "Delete tool group",
            size: "small",
            children: /* @__PURE__ */ a(Hi, {})
          }
        )
      ] }),
      /* @__PURE__ */ a("div", { className: "tool-detail-panel", children: /* @__PURE__ */ C("div", { className: "tool-group-tools-tabs panel", children: [
        /* @__PURE__ */ C(
          Ss,
          {
            "aria-label": "Tool group detail sections",
            onChange: (S, R) => I(R),
            sx: {
              borderBottom: 1,
              borderColor: "divider",
              minHeight: 48,
              px: 1,
              "& .MuiTab-root": {
                minHeight: 48,
                textTransform: "none",
                fontWeight: 500,
                fontSize: "0.875rem"
              }
            },
            value: $,
            variant: "scrollable",
            scrollButtons: "auto",
            children: [
              /* @__PURE__ */ a(cn, { label: "Tool group details", value: "detail" }),
              /* @__PURE__ */ a(cn, { label: `Effective tools (${d.tool_count})`, value: "effective" })
            ]
          }
        ),
        $ === "detail" ? /* @__PURE__ */ C("div", { className: "tool-group-tab-panel", children: [
          /* @__PURE__ */ a("dl", { className: "tool-detail-meta", children: /* @__PURE__ */ C("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ a("dt", { children: "MCP security" }),
            /* @__PURE__ */ C("dd", { children: [
              Gi(d.security_option),
              " ",
              /* @__PURE__ */ C("code", { className: "identifier-code", children: [
                "(",
                d.security_option,
                ")"
              ] })
            ] })
          ] }) }),
          d.description ? /* @__PURE__ */ a("dl", { className: "tool-detail-meta", children: /* @__PURE__ */ C("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ a("dt", { children: "Description" }),
            /* @__PURE__ */ a("dd", { children: d.description })
          ] }) }) : null,
          /* @__PURE__ */ C("div", { className: "tool-schema-section", children: [
            /* @__PURE__ */ a("div", { className: "tool-schema-header", children: /* @__PURE__ */ a("h4", { children: "MCP endpoints" }) }),
            /* @__PURE__ */ C("div", { className: "tool-group-endpoints", children: [
              /* @__PURE__ */ C("div", { className: "tool-group-endpoint-row", children: [
                /* @__PURE__ */ a("span", { className: "tool-group-endpoint-label", children: "Streamable HTTP" }),
                /* @__PURE__ */ C("div", { className: "tool-group-endpoint-value", children: [
                  /* @__PURE__ */ a("code", { className: "detail-target-code", title: d.streamable_http_endpoint, children: d.streamable_http_endpoint }),
                  /* @__PURE__ */ a(
                    bt,
                    {
                      ariaLabel: "Copy Streamable HTTP endpoint",
                      title: "Copy Streamable HTTP endpoint",
                      value: d.streamable_http_endpoint
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ C("div", { className: "tool-group-endpoint-row", children: [
                /* @__PURE__ */ a("span", { className: "tool-group-endpoint-label", children: "SSE" }),
                /* @__PURE__ */ C("div", { className: "tool-group-endpoint-stack", children: [
                  /* @__PURE__ */ C("div", { className: "tool-group-endpoint-value", children: [
                    /* @__PURE__ */ a("code", { className: "detail-target-code", title: d.sse_endpoint, children: d.sse_endpoint }),
                    /* @__PURE__ */ a(
                      bt,
                      {
                        ariaLabel: "Copy SSE endpoint",
                        title: "Copy SSE endpoint",
                        value: d.sse_endpoint
                      }
                    )
                  ] }),
                  /* @__PURE__ */ C("div", { className: "tool-group-endpoint-value", children: [
                    /* @__PURE__ */ a("code", { className: "detail-target-code", title: d.sse_message_endpoint, children: d.sse_message_endpoint }),
                    /* @__PURE__ */ a(
                      bt,
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
          /* @__PURE__ */ C("div", { className: "tool-schema-section", children: [
            /* @__PURE__ */ a("div", { className: "tool-schema-header", children: /* @__PURE__ */ a("h4", { children: "Group configuration" }) }),
            /* @__PURE__ */ C("dl", { className: "tool-detail-meta", children: [
              /* @__PURE__ */ C("div", { className: "tool-detail-description", children: [
                /* @__PURE__ */ a("dt", { children: "Included servers" }),
                /* @__PURE__ */ a("dd", { children: (d.included_servers ?? []).length > 0 ? /* @__PURE__ */ a("div", { className: "tool-group-config-chips", children: d.included_servers.map((S) => /* @__PURE__ */ a("code", { className: "identifier-code", children: S }, S)) }) : /* @__PURE__ */ a("span", { className: "table-secondary", children: "None" }) })
              ] }),
              /* @__PURE__ */ C("div", { className: "tool-detail-description", children: [
                /* @__PURE__ */ a("dt", { children: "Included tools" }),
                /* @__PURE__ */ a("dd", { children: (d.included_tools ?? []).length > 0 ? /* @__PURE__ */ a("div", { className: "tool-group-config-chips", children: d.included_tools.map((S) => /* @__PURE__ */ a("code", { className: "identifier-code", children: S }, S)) }) : /* @__PURE__ */ a("span", { className: "table-secondary", children: "None" }) })
              ] }),
              /* @__PURE__ */ C("div", { className: "tool-detail-description", children: [
                /* @__PURE__ */ a("dt", { children: "Excluded tools" }),
                /* @__PURE__ */ a("dd", { children: (d.excluded_tools ?? []).length > 0 ? /* @__PURE__ */ a("div", { className: "tool-group-config-chips", children: d.excluded_tools.map((S) => /* @__PURE__ */ a("code", { className: "identifier-code", children: S }, S)) }) : /* @__PURE__ */ a("span", { className: "table-secondary", children: "None" }) })
              ] })
            ] })
          ] })
        ] }) : null,
        $ === "effective" ? /* @__PURE__ */ C("div", { className: "tool-group-tab-panel tool-group-preview", children: [
          /* @__PURE__ */ C("div", { className: "tool-group-section-header tool-group-preview-header", children: [
            /* @__PURE__ */ C("div", { children: [
              /* @__PURE__ */ a("strong", { children: "Effective tools" }),
              /* @__PURE__ */ C("span", { className: "tool-group-section-hint", children: [
                d.tool_count,
                " tool",
                d.tool_count === 1 ? "" : "s",
                " in this group"
              ] })
            ] }),
            d.tools.length > 0 ? /* @__PURE__ */ a(
              bt,
              {
                ariaLabel: "Copy all effective tools",
                title: "Copy all effective tools (one canonical name per line)",
                value: d.tools.map((S) => S.canonical_name).join(`
`)
              }
            ) : null
          ] }),
          d.tools.length > 0 ? /* @__PURE__ */ C("div", { className: "tool-group-effective-table", children: [
            /* @__PURE__ */ C("div", { className: "tool-group-effective-table-head", children: [
              /* @__PURE__ */ a("span", { children: "Tool" }),
              /* @__PURE__ */ a("span", { children: "Canonical name" }),
              /* @__PURE__ */ a("span", { children: "Server" }),
              /* @__PURE__ */ a("span", { className: "tool-group-effective-copy-col", children: "Copy" })
            ] }),
            /* @__PURE__ */ a("div", { className: "tool-group-effective-table-body", children: d.tools.map((S) => /* @__PURE__ */ C("div", { className: "tool-group-effective-table-row", children: [
              /* @__PURE__ */ a("span", { className: "table-primary", children: S.name }),
              /* @__PURE__ */ a("code", { className: "identifier-code", title: S.canonical_name, children: S.canonical_name }),
              /* @__PURE__ */ a("span", { className: "table-secondary", children: S.server }),
              /* @__PURE__ */ a("span", { className: "tool-group-effective-copy-col", children: /* @__PURE__ */ a(
                bt,
                {
                  ariaLabel: `Copy ${S.canonical_name}`,
                  title: `Copy ${S.canonical_name}`,
                  value: S.canonical_name
                }
              ) })
            ] }, S.canonical_name)) })
          ] }) : /* @__PURE__ */ a("p", { className: "empty-inline", children: "No tools in this group." })
        ] }) : null
      ] }) })
    ] });
  }
  function lh(d) {
    return /* @__PURE__ */ C(Bt, { children: [
      /* @__PURE__ */ C(ce, { direction: "row", spacing: 1, sx: { justifyContent: "flex-end", flexWrap: "wrap", mb: 2 }, children: [
        /* @__PURE__ */ a(
          io,
          {
            "aria-label": "Edit prompt group",
            disabled: Xe("prompt-group-save") || Xe("prompt-group-create"),
            onClick: (S) => {
              S.stopPropagation(), Wm(d);
            },
            title: "Edit prompt group",
            size: "small",
            children: /* @__PURE__ */ a(_a, {})
          }
        ),
        /* @__PURE__ */ a(
          io,
          {
            "aria-label": "Delete prompt group",
            color: "error",
            disabled: Xe(`prompt-group-delete:${d.name}`),
            onClick: (S) => {
              S.stopPropagation(), eh(d);
            },
            title: "Delete prompt group",
            size: "small",
            children: /* @__PURE__ */ a(Hi, {})
          }
        )
      ] }),
      /* @__PURE__ */ C("div", { className: "tool-detail-panel", children: [
        /* @__PURE__ */ a("div", { className: "tool-detail-header", children: /* @__PURE__ */ a("p", { className: "panel-label", children: "Prompt group details" }) }),
        /* @__PURE__ */ a("dl", { className: "tool-detail-meta", children: /* @__PURE__ */ C("div", { className: "tool-detail-description", children: [
          /* @__PURE__ */ a("dt", { children: "MCP security" }),
          /* @__PURE__ */ C("dd", { children: [
            Gi(d.security_option),
            " ",
            /* @__PURE__ */ C("code", { className: "identifier-code", children: [
              "(",
              d.security_option,
              ")"
            ] })
          ] })
        ] }) }),
        d.description ? /* @__PURE__ */ a("dl", { className: "tool-detail-meta", children: /* @__PURE__ */ C("div", { className: "tool-detail-description", children: [
          /* @__PURE__ */ a("dt", { children: "Description" }),
          /* @__PURE__ */ a("dd", { children: d.description })
        ] }) }) : null,
        /* @__PURE__ */ C("div", { className: "tool-schema-section", children: [
          /* @__PURE__ */ a("div", { className: "tool-schema-header", children: /* @__PURE__ */ a("h4", { children: "MCP endpoints" }) }),
          /* @__PURE__ */ C("div", { className: "tool-group-endpoints", children: [
            /* @__PURE__ */ C("div", { className: "tool-group-endpoint-row", children: [
              /* @__PURE__ */ a("span", { className: "tool-group-endpoint-label", children: "Streamable HTTP" }),
              /* @__PURE__ */ C("div", { className: "tool-group-endpoint-value", children: [
                /* @__PURE__ */ a("code", { className: "detail-target-code", title: d.streamable_http_endpoint, children: d.streamable_http_endpoint }),
                /* @__PURE__ */ a(
                  bt,
                  {
                    ariaLabel: "Copy Streamable HTTP endpoint",
                    title: "Copy Streamable HTTP endpoint",
                    value: d.streamable_http_endpoint
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ C("div", { className: "tool-group-endpoint-row", children: [
              /* @__PURE__ */ a("span", { className: "tool-group-endpoint-label", children: "SSE" }),
              /* @__PURE__ */ C("div", { className: "tool-group-endpoint-stack", children: [
                /* @__PURE__ */ C("div", { className: "tool-group-endpoint-value", children: [
                  /* @__PURE__ */ a("code", { className: "detail-target-code", title: d.sse_endpoint, children: d.sse_endpoint }),
                  /* @__PURE__ */ a(bt, { ariaLabel: "Copy SSE endpoint", title: "Copy SSE endpoint", value: d.sse_endpoint })
                ] }),
                /* @__PURE__ */ C("div", { className: "tool-group-endpoint-value", children: [
                  /* @__PURE__ */ a("code", { className: "detail-target-code", title: d.sse_message_endpoint, children: d.sse_message_endpoint }),
                  /* @__PURE__ */ a(
                    bt,
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
        /* @__PURE__ */ C("div", { className: "tool-schema-section", children: [
          /* @__PURE__ */ a("div", { className: "tool-schema-header", children: /* @__PURE__ */ a("h4", { children: "Included prompts" }) }),
          d.prompts.length > 0 ? /* @__PURE__ */ a("div", { className: "schema-field-list", children: d.prompts.map((S) => /* @__PURE__ */ C("article", { className: "schema-field-card", children: [
            /* @__PURE__ */ C("div", { className: "schema-field-head", children: [
              /* @__PURE__ */ a("code", { children: S.canonical_name }),
              /* @__PURE__ */ a("span", { className: "schema-type-pill", children: /* @__PURE__ */ a("code", { children: S.server }) })
            ] }),
            /* @__PURE__ */ a("dl", { className: "schema-field-meta", children: S.description ? /* @__PURE__ */ C("div", { children: [
              /* @__PURE__ */ a("dt", { children: "Description" }),
              /* @__PURE__ */ a("dd", { children: S.description })
            ] }) : null })
          ] }, S.canonical_name)) }) : /* @__PURE__ */ a("p", { className: "empty-inline", children: "No prompts in this group." })
        ] })
      ] })
    ] });
  }
  function ch(d) {
    var X, ve;
    const S = qi(d), R = d.transport === "rest" || S.startsWith("rest");
    return /* @__PURE__ */ C(Bt, { children: [
      /* @__PURE__ */ C(ce, { direction: "row", spacing: 1, useFlexGap: !0, sx: { flexWrap: "wrap", justifyContent: "flex-end", mb: 2 }, children: [
        /* @__PURE__ */ a(bt, { ariaLabel: "Copy server name", title: "Copy server name", value: d.name }),
        /* @__PURE__ */ a(be, { variant: "outlined", size: "small", onClick: () => void Im(d.name), children: "Edit" }),
        /* @__PURE__ */ a(
          be,
          {
            variant: "outlined",
            size: "small",
            disabled: Xe(`server-toggle:${d.name}`),
            onClick: () => void Hm(d),
            children: Xe(`server-toggle:${d.name}`) ? "Saving..." : d.enabled ? "Disable" : "Enable"
          }
        ),
        /* @__PURE__ */ a(
          be,
          {
            variant: "outlined",
            size: "small",
            disabled: Xe(`server-reregister:${d.name}`),
            onClick: () => void Km(d),
            children: Xe(`server-reregister:${d.name}`) ? "Re-registering..." : "Re-register"
          }
        ),
        /* @__PURE__ */ a(
          io,
          {
            "aria-label": "Delete server",
            color: "error",
            disabled: Xe(`server-delete:${d.name}`),
            onClick: () => void qm(d),
            title: "Delete server",
            size: "small",
            children: /* @__PURE__ */ a(Hi, {})
          }
        )
      ] }),
      /* @__PURE__ */ C("div", { className: "tool-detail-panel", children: [
        /* @__PURE__ */ a("div", { className: "tool-detail-header", children: /* @__PURE__ */ a("p", { className: "panel-label", children: "Server details" }) }),
        d.enabled ? null : /* @__PURE__ */ a(J, { color: "text.secondary", variant: "body2", sx: { mb: 2 }, children: "This server is registered but currently not exposed to MCP clients." }),
        /* @__PURE__ */ C("dl", { className: "tool-detail-meta", children: [
          /* @__PURE__ */ C("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ a("dt", { children: "Server kind" }),
            /* @__PURE__ */ a("dd", { children: /* @__PURE__ */ a(Kt, { text: Na(S), tone: "muted" }) })
          ] }),
          /* @__PURE__ */ C("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ a("dt", { children: "Transport" }),
            /* @__PURE__ */ a("dd", { children: /* @__PURE__ */ a("code", { children: Au(d.transport) }) })
          ] }),
          /* @__PURE__ */ C("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ a("dt", { children: "Connection" }),
            /* @__PURE__ */ C("dd", { children: [
              /* @__PURE__ */ a("div", { className: "tool-state-line", children: /* @__PURE__ */ a(
                Kt,
                {
                  text: Bu(d.status),
                  tone: Du(d.status)
                }
              ) }),
              /* @__PURE__ */ a(J, { variant: "body2", color: "text.secondary", sx: { mt: 0.75 }, children: d.connection_summary })
            ] })
          ] }),
          /* @__PURE__ */ C("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ a("dt", { children: "Catalog" }),
            /* @__PURE__ */ C("dd", { children: [
              d.tool_count,
              " tools · ",
              d.prompt_count,
              " prompts · ",
              d.resource_count,
              " resources"
            ] })
          ] }),
          d.last_discovered_at ? /* @__PURE__ */ C("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ a("dt", { children: "Last discovered" }),
            /* @__PURE__ */ a("dd", { children: /* @__PURE__ */ a("code", { children: d.last_discovered_at }) })
          ] }) : null,
          d.updated_at ? /* @__PURE__ */ C("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ a("dt", { children: "Updated" }),
            /* @__PURE__ */ a("dd", { children: /* @__PURE__ */ a("code", { children: d.updated_at }) })
          ] }) : null,
          d.config_summary.description ? /* @__PURE__ */ C("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ a("dt", { children: "Description" }),
            /* @__PURE__ */ a("dd", { children: d.config_summary.description })
          ] }) : null
        ] }),
        /* @__PURE__ */ a("div", { className: "server-detail", style: { marginTop: "1rem" }, children: /* @__PURE__ */ C("dl", { children: [
          /* @__PURE__ */ C("div", { children: [
            /* @__PURE__ */ a("dt", { children: R ? "Base URL" : "Target" }),
            /* @__PURE__ */ a("dd", { children: /* @__PURE__ */ C("div", { className: "detail-copy-row", children: [
              /* @__PURE__ */ a("code", { className: "detail-target-code", children: d.config_summary.target ?? d.config_summary.command ?? "Unknown" }),
              d.config_summary.target || d.config_summary.command ? /* @__PURE__ */ a(
                bt,
                {
                  ariaLabel: R ? "Copy base URL" : "Copy target",
                  title: R ? "Copy base URL" : "Copy target",
                  value: d.config_summary.target ?? d.config_summary.command ?? ""
                }
              ) : null
            ] }) })
          ] }),
          R ? null : /* @__PURE__ */ C("div", { children: [
            /* @__PURE__ */ a("dt", { children: "Session mode" }),
            /* @__PURE__ */ a("dd", { children: /* @__PURE__ */ a("code", { children: d.config_summary.session_mode ?? "Unknown" }) })
          ] }),
          R ? null : /* @__PURE__ */ C("div", { children: [
            /* @__PURE__ */ a("dt", { children: "Header keys" }),
            /* @__PURE__ */ a("dd", { children: /* @__PURE__ */ a("code", { children: ((X = d.config_summary.header_keys) == null ? void 0 : X.join(", ")) || "None" }) })
          ] }),
          R ? null : /* @__PURE__ */ C("div", { children: [
            /* @__PURE__ */ a("dt", { children: "Env keys" }),
            /* @__PURE__ */ a("dd", { children: /* @__PURE__ */ a("code", { children: ((ve = d.config_summary.env_keys) == null ? void 0 : ve.join(", ")) || "None" }) })
          ] })
        ] }) })
      ] })
    ] });
  }
  function dh(d) {
    const S = Rw(d.input_schema);
    return /* @__PURE__ */ C(Bt, { children: [
      /* @__PURE__ */ C(ce, { direction: "row", spacing: 1, useFlexGap: !0, sx: { flexWrap: "wrap", justifyContent: "flex-end", mb: 2 }, children: [
        /* @__PURE__ */ a(
          bt,
          {
            ariaLabel: "Copy canonical name",
            title: "Copy canonical name",
            value: d.canonical_name
          }
        ),
        /* @__PURE__ */ a(
          be,
          {
            variant: "outlined",
            size: "small",
            disabled: Xe(`tool-toggle:${d.canonical_name}`),
            onClick: (R) => {
              R.stopPropagation(), Ym(d);
            },
            children: Xe(`tool-toggle:${d.canonical_name}`) ? "Saving..." : d.enabled ? "Disable" : "Enable"
          }
        )
      ] }),
      /* @__PURE__ */ C("div", { className: "tool-detail-panel", children: [
        /* @__PURE__ */ a("div", { className: "tool-detail-header", children: /* @__PURE__ */ a("p", { className: "panel-label", children: "Tool details" }) }),
        /* @__PURE__ */ C("dl", { className: "tool-detail-meta", children: [
          /* @__PURE__ */ C("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ a("dt", { children: "Server" }),
            /* @__PURE__ */ a("dd", { children: /* @__PURE__ */ a("code", { children: d.server }) })
          ] }),
          /* @__PURE__ */ C("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ a("dt", { children: "Canonical name" }),
            /* @__PURE__ */ a("dd", { children: /* @__PURE__ */ a("code", { className: "identifier-code", children: d.canonical_name }) })
          ] }),
          /* @__PURE__ */ C("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ a("dt", { children: "Status" }),
            /* @__PURE__ */ a("dd", { children: /* @__PURE__ */ C("div", { className: "tool-state-line", children: [
              /* @__PURE__ */ a(
                Kt,
                {
                  text: d.enabled ? "Enabled" : "Disabled",
                  tone: d.enabled ? "good" : "muted"
                }
              ),
              d.server_enabled ? null : /* @__PURE__ */ a(Kt, { text: "Server disabled", tone: "warn" })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ a("dl", { className: "tool-detail-meta", children: /* @__PURE__ */ C("div", { className: "tool-detail-description", children: [
          /* @__PURE__ */ a("dt", { children: "Description" }),
          /* @__PURE__ */ a("dd", { children: Ki(d) })
        ] }) }),
        /* @__PURE__ */ C("div", { className: "tool-schema-section", children: [
          /* @__PURE__ */ a("div", { className: "tool-schema-header", children: /* @__PURE__ */ a("h4", { children: "Input fields" }) }),
          S.length > 0 ? /* @__PURE__ */ a("div", { className: "schema-field-list", children: S.map((R) => {
            var X;
            return /* @__PURE__ */ C("article", { className: "schema-field-card", children: [
              /* @__PURE__ */ C("div", { className: "schema-field-head", children: [
                /* @__PURE__ */ a("code", { children: R.path }),
                /* @__PURE__ */ a("span", { className: "schema-type-pill", children: /* @__PURE__ */ a("code", { children: R.type }) })
              ] }),
              /* @__PURE__ */ C("dl", { className: "schema-field-meta", children: [
                /* @__PURE__ */ C("div", { children: [
                  /* @__PURE__ */ a("dt", { children: "Required" }),
                  /* @__PURE__ */ a("dd", { children: R.required ? "yes" : "no" })
                ] }),
                R.description ? /* @__PURE__ */ C("div", { children: [
                  /* @__PURE__ */ a("dt", { children: "Description" }),
                  /* @__PURE__ */ a("dd", { children: R.description })
                ] }) : null,
                (X = R.enumValues) != null && X.length ? /* @__PURE__ */ C("div", { children: [
                  /* @__PURE__ */ a("dt", { children: "Enum" }),
                  /* @__PURE__ */ a("dd", { children: /* @__PURE__ */ a("code", { children: R.enumValues.join(", ") }) })
                ] }) : null,
                R.defaultValue ? /* @__PURE__ */ C("div", { children: [
                  /* @__PURE__ */ a("dt", { children: "Default" }),
                  /* @__PURE__ */ a("dd", { children: /* @__PURE__ */ a("code", { children: R.defaultValue }) })
                ] }) : null,
                R.note ? /* @__PURE__ */ C("div", { children: [
                  /* @__PURE__ */ a("dt", { children: "Notes" }),
                  /* @__PURE__ */ a("dd", { children: R.note })
                ] }) : null
              ] })
            ] }, R.path);
          }) }) : /* @__PURE__ */ a("p", { className: "empty-inline", children: "No structured input fields were provided." })
        ] }),
        /* @__PURE__ */ C("details", { className: "raw-schema-disclosure", children: [
          /* @__PURE__ */ a("summary", { children: "Raw schema" }),
          /* @__PURE__ */ C("div", { className: "raw-schema-code-wrap", children: [
            /* @__PURE__ */ a(
              bt,
              {
                ariaLabel: "Copy raw schema",
                title: "Copy raw schema",
                value: Lu(d.input_schema)
              }
            ),
            /* @__PURE__ */ a("pre", { className: "schema-code", children: /* @__PURE__ */ a("code", { children: Lu(d.input_schema) }) })
          ] })
        ] })
      ] })
    ] });
  }
  function uh(d) {
    const S = _w(d.arguments);
    return /* @__PURE__ */ C(Bt, { children: [
      /* @__PURE__ */ C(ce, { direction: "row", spacing: 1, useFlexGap: !0, sx: { flexWrap: "wrap", justifyContent: "flex-end", mb: 2 }, children: [
        /* @__PURE__ */ a(
          bt,
          {
            ariaLabel: "Copy canonical name",
            title: "Copy canonical name",
            value: d.canonical_name
          }
        ),
        /* @__PURE__ */ a(
          be,
          {
            variant: "outlined",
            size: "small",
            disabled: Xe(`prompt-toggle:${d.canonical_name}`),
            onClick: (R) => {
              R.stopPropagation(), Xm(d);
            },
            children: Xe(`prompt-toggle:${d.canonical_name}`) ? "Saving..." : d.enabled ? "Disable" : "Enable"
          }
        )
      ] }),
      /* @__PURE__ */ C("div", { className: "tool-detail-panel", children: [
        /* @__PURE__ */ a("div", { className: "tool-detail-header", children: /* @__PURE__ */ a("p", { className: "panel-label", children: "Prompt details" }) }),
        /* @__PURE__ */ C("dl", { className: "tool-detail-meta", children: [
          /* @__PURE__ */ C("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ a("dt", { children: "Server" }),
            /* @__PURE__ */ a("dd", { children: /* @__PURE__ */ a("code", { children: d.server }) })
          ] }),
          /* @__PURE__ */ C("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ a("dt", { children: "Canonical name" }),
            /* @__PURE__ */ a("dd", { children: /* @__PURE__ */ a("code", { className: "identifier-code", children: d.canonical_name }) })
          ] }),
          /* @__PURE__ */ C("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ a("dt", { children: "Status" }),
            /* @__PURE__ */ a("dd", { children: /* @__PURE__ */ C("div", { className: "tool-state-line", children: [
              /* @__PURE__ */ a(
                Kt,
                {
                  text: d.enabled ? "Enabled" : "Disabled",
                  tone: d.enabled ? "good" : "muted"
                }
              ),
              d.server_enabled ? null : /* @__PURE__ */ a(Kt, { text: "Server disabled", tone: "warn" })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ a("dl", { className: "tool-detail-meta", children: /* @__PURE__ */ C("div", { className: "tool-detail-description", children: [
          /* @__PURE__ */ a("dt", { children: "Description" }),
          /* @__PURE__ */ a("dd", { children: Yi(d) })
        ] }) }),
        /* @__PURE__ */ C("div", { className: "tool-schema-section", children: [
          /* @__PURE__ */ a("div", { className: "tool-schema-header", children: /* @__PURE__ */ a("h4", { children: "Arguments" }) }),
          S.length > 0 ? /* @__PURE__ */ a("div", { className: "schema-field-list", children: S.map((R) => {
            var X;
            return /* @__PURE__ */ C("article", { className: "schema-field-card", children: [
              /* @__PURE__ */ C("div", { className: "schema-field-head", children: [
                /* @__PURE__ */ a("code", { children: R.path }),
                /* @__PURE__ */ a("span", { className: "schema-type-pill", children: /* @__PURE__ */ a("code", { children: R.type }) })
              ] }),
              /* @__PURE__ */ C("dl", { className: "schema-field-meta", children: [
                /* @__PURE__ */ C("div", { children: [
                  /* @__PURE__ */ a("dt", { children: "Required" }),
                  /* @__PURE__ */ a("dd", { children: R.required ? "yes" : "no" })
                ] }),
                R.description ? /* @__PURE__ */ C("div", { children: [
                  /* @__PURE__ */ a("dt", { children: "Description" }),
                  /* @__PURE__ */ a("dd", { children: R.description })
                ] }) : null,
                (X = R.enumValues) != null && X.length ? /* @__PURE__ */ C("div", { children: [
                  /* @__PURE__ */ a("dt", { children: "Enum" }),
                  /* @__PURE__ */ a("dd", { children: /* @__PURE__ */ a("code", { children: R.enumValues.join(", ") }) })
                ] }) : null,
                R.defaultValue ? /* @__PURE__ */ C("div", { children: [
                  /* @__PURE__ */ a("dt", { children: "Default" }),
                  /* @__PURE__ */ a("dd", { children: /* @__PURE__ */ a("code", { children: R.defaultValue }) })
                ] }) : null,
                R.note ? /* @__PURE__ */ C("div", { children: [
                  /* @__PURE__ */ a("dt", { children: "Notes" }),
                  /* @__PURE__ */ a("dd", { children: R.note })
                ] }) : null
              ] })
            ] }, R.path);
          }) }) : /* @__PURE__ */ a("p", { className: "empty-inline", children: "No arguments." })
        ] }),
        /* @__PURE__ */ C("details", { className: "raw-schema-disclosure", children: [
          /* @__PURE__ */ a("summary", { children: "Raw arguments" }),
          /* @__PURE__ */ a("div", { className: "raw-schema-actions", children: /* @__PURE__ */ a(
            bt,
            {
              ariaLabel: "Copy raw arguments",
              title: "Copy raw arguments",
              value: Fu(d.arguments)
            }
          ) }),
          /* @__PURE__ */ a("pre", { className: "schema-code", children: /* @__PURE__ */ a("code", { children: Fu(d.arguments) }) })
        ] })
      ] })
    ] });
  }
  function ph(d) {
    var R, X;
    const S = yw(d.oauth_token_url, d.client_id);
    return /* @__PURE__ */ C(Bt, { children: [
      /* @__PURE__ */ C(
        ce,
        {
          direction: { xs: "column", sm: "row" },
          spacing: 2,
          sx: { justifyContent: "space-between", alignItems: { sm: "flex-start" }, mb: 1 },
          children: [
            /* @__PURE__ */ C(Ve, { sx: { flex: "1 1 auto", minWidth: 0 }, children: [
              /* @__PURE__ */ a(ce, { direction: "row", spacing: 1, sx: { alignItems: "center", flexWrap: "wrap", mb: 0.5 }, children: /* @__PURE__ */ a(
                Kt,
                {
                  tone: d.status === "enabled" ? "good" : "muted",
                  text: d.status === "enabled" ? "enabled" : "disabled"
                }
              ) }),
              d.description ? /* @__PURE__ */ a(J, { variant: "body2", color: "text.secondary", sx: { mb: 1 }, children: d.description }) : null
            ] }),
            /* @__PURE__ */ C(ce, { direction: "row", spacing: 1, sx: { flexShrink: 0, flexWrap: "wrap" }, children: [
              /* @__PURE__ */ a(
                io,
                {
                  "aria-label": `Edit ${d.name}`,
                  color: "primary",
                  size: "small",
                  disabled: Xe(`agent-app-edit:${d.id}`),
                  onClick: (ve) => {
                    ve.stopPropagation(), th(d);
                  },
                  title: "Edit agent app",
                  children: /* @__PURE__ */ a(_a, {})
                }
              ),
              /* @__PURE__ */ a(
                be,
                {
                  size: "small",
                  variant: "outlined",
                  disabled: Xe(`agent-app-status:${d.id}`),
                  onClick: (ve) => {
                    ve.stopPropagation(), rh(d);
                  },
                  children: d.status === "enabled" ? "Disable" : "Enable"
                }
              ),
              /* @__PURE__ */ a(
                be,
                {
                  size: "small",
                  variant: "outlined",
                  color: "warning",
                  disabled: Xe(`agent-app-rotate:${d.id}`),
                  onClick: (ve) => {
                    ve.stopPropagation(), ih(d);
                  },
                  children: "Rotate secret"
                }
              ),
              /* @__PURE__ */ a(
                io,
                {
                  "aria-label": `Delete ${d.name}`,
                  color: "error",
                  size: "small",
                  disabled: Xe(`agent-app-delete:${d.id}`),
                  onClick: (ve) => {
                    ve.stopPropagation(), nh(d);
                  },
                  title: "Delete agent app",
                  children: /* @__PURE__ */ a(Hi, {})
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ a(J, { variant: "caption", color: "text.secondary", component: "div", sx: { mb: 0.5 }, children: "Client ID" }),
      /* @__PURE__ */ C(ce, { direction: "row", spacing: 1, sx: { alignItems: "center", mb: 1, flexWrap: "wrap" }, children: [
        /* @__PURE__ */ a(
          J,
          {
            component: "code",
            variant: "body2",
            sx: { wordBreak: "break-all", fontFamily: En },
            children: d.client_id
          }
        ),
        /* @__PURE__ */ a(bt, { ariaLabel: "Copy client ID", title: "Copy client ID", value: d.client_id })
      ] }),
      /* @__PURE__ */ C(J, { variant: "caption", color: "text.secondary", children: [
        "Attached group:",
        " ",
        ((R = d.tool_group_names) == null ? void 0 : R.length) === 1 ? `${d.tool_group_names[0]} (tool)` : ((X = d.prompt_group_names) == null ? void 0 : X.length) === 1 ? `${d.prompt_group_names[0]} (prompt)` : "— (invalid or unset — edit to fix)"
      ] }),
      /* @__PURE__ */ C(Ve, { sx: { mt: 2, pt: 2, borderTop: 1, borderColor: "divider" }, children: [
        /* @__PURE__ */ a(J, { variant: "subtitle2", sx: { mb: 1 }, children: "OAuth token URL" }),
        /* @__PURE__ */ a("div", { className: "tool-group-endpoint-row", children: /* @__PURE__ */ C("div", { className: "tool-group-endpoint-value", children: [
          /* @__PURE__ */ a("code", { className: "detail-target-code", title: d.oauth_token_url, children: d.oauth_token_url }),
          /* @__PURE__ */ a(bt, { ariaLabel: "Copy OAuth token URL", title: "Copy OAuth token URL", value: d.oauth_token_url })
        ] }) }),
        /* @__PURE__ */ C(
          of,
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
              /* @__PURE__ */ a(af, { expandIcon: /* @__PURE__ */ a(ZC, { fontSize: "small" }), children: /* @__PURE__ */ a(J, { variant: "subtitle2", children: "Get a Bearer token (curl)" }) }),
              /* @__PURE__ */ C(nf, { sx: { pt: 0 }, children: [
                /* @__PURE__ */ C(J, { variant: "body2", color: "text.secondary", sx: { mb: 1.5 }, children: [
                  "Replace ",
                  /* @__PURE__ */ a("code", { children: "YOUR_CLIENT_SECRET" }),
                  " with the secret from when you created or last rotated this app. The response JSON includes ",
                  /* @__PURE__ */ a("code", { children: "access_token" }),
                  ", ",
                  /* @__PURE__ */ a("code", { children: "token_type" }),
                  " (Bearer), and",
                  " ",
                  /* @__PURE__ */ a("code", { children: "expires_in" }),
                  " (seconds)."
                ] }),
                /* @__PURE__ */ a(yt, { variant: "outlined", sx: { p: 1.5, borderRadius: 2, bgcolor: "grey.50" }, children: /* @__PURE__ */ C(ce, { direction: { xs: "column", sm: "row" }, spacing: 1, sx: { alignItems: "flex-start" }, children: [
                  /* @__PURE__ */ a(
                    J,
                    {
                      component: "pre",
                      sx: {
                        flex: 1,
                        m: 0,
                        overflow: "auto",
                        fontSize: "0.75rem",
                        lineHeight: 1.5,
                        fontFamily: En,
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-all"
                      },
                      children: S
                    }
                  ),
                  /* @__PURE__ */ a(bt, { ariaLabel: "Copy curl command", title: "Copy curl command", value: S })
                ] }) }),
                /* @__PURE__ */ C(J, { variant: "caption", color: "text.secondary", component: "div", sx: { mt: 1.5 }, children: [
                  "You can also POST JSON with ",
                  /* @__PURE__ */ a("code", { children: "grant_type" }),
                  ", ",
                  /* @__PURE__ */ a("code", { children: "client_id" }),
                  ", and",
                  " ",
                  /* @__PURE__ */ a("code", { children: "client_secret" }),
                  " fields and ",
                  /* @__PURE__ */ a("code", { children: "Content-Type: application/json" }),
                  "."
                ] })
              ] })
            ]
          }
        )
      ] }),
      pc("Tool group MCP URLs", d.tool_group_endpoints),
      pc("Prompt group MCP URLs", d.prompt_group_endpoints)
    ] });
  }
  const Ni = c === "ready", fc = Ni && !oc;
  return /* @__PURE__ */ C(
    Ve,
    {
      sx: {
        display: "flex",
        flexDirection: t ? "column" : "row",
        minHeight: e ? "100%" : "100vh",
        bgcolor: "background.default"
      },
      children: [
        fc && !t ? /* @__PURE__ */ a(
          hw,
          {
            active: n,
            onSelect: l,
            signOutHref: Rm,
            embedMode: e,
            signedInEmail: _m
          }
        ) : null,
        /* @__PURE__ */ C(
          Ve,
          {
            component: "main",
            sx: {
              flex: 1,
              minWidth: 0,
              overflowX: "auto",
              ...Ni ? { p: t ? "12px 18px 18px" : "18px" } : {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
                minHeight: t ? "100%" : "100vh"
              }
            },
            children: [
              fc && t ? /* @__PURE__ */ a(gw, { active: n, onSelect: l }) : null,
              Ni ? /* @__PURE__ */ C(ce, { component: "header", direction: { xs: "column", lg: "row" }, spacing: 2, sx: { mb: 2 }, children: [
                n === "home" ? /* @__PURE__ */ a(Ve, { sx: { flex: "1 1 auto", minWidth: 0 }, "aria-hidden": !0 }) : /* @__PURE__ */ C(Ve, { sx: { flex: "1 1 auto", minWidth: 0 }, children: [
                  /* @__PURE__ */ a(J, { variant: "h4", component: "h1", sx: { mt: "2px", fontWeight: 700, lineHeight: 1.1 }, children: la.title }),
                  la.subtitle ? /* @__PURE__ */ a(J, { color: "text.secondary", sx: { mt: "6px" }, children: la.subtitle }) : null
                ] }),
                /* @__PURE__ */ a(
                  ce,
                  {
                    direction: "row",
                    spacing: 1,
                    sx: {
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      maxWidth: { lg: 720 }
                    },
                    children: qt != null && qt.endpoints[0] ? /* @__PURE__ */ C(
                      ce,
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
                          /* @__PURE__ */ a(
                            J,
                            {
                              component: "span",
                              variant: "caption",
                              color: "text.secondary",
                              sx: { display: { xs: "none", sm: "inline" } },
                              children: "Global Endpoint"
                            }
                          ),
                          /* @__PURE__ */ a(
                            J,
                            {
                              component: "code",
                              variant: "body2",
                              sx: {
                                flex: 1,
                                minWidth: 0,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontFamily: En
                              },
                              title: qt.endpoints[0].url,
                              children: qt.endpoints[0].url
                            }
                          ),
                          /* @__PURE__ */ a(bt, { ariaLabel: "Copy global endpoint", title: "Copy global endpoint", value: qt.endpoints[0].url })
                        ]
                      }
                    ) : null
                  }
                )
              ] }) : null,
              Ni && y ? /* @__PURE__ */ C(
                Ja,
                {
                  severity: y.tone === "success" ? "success" : "error",
                  sx: { mb: 2 },
                  onClose: () => x(null),
                  children: [
                    /* @__PURE__ */ a("strong", { children: y.tone === "success" ? "Updated" : "Request failed" }),
                    /* @__PURE__ */ C("span", { children: [
                      " ",
                      y.message
                    ] })
                  ]
                }
              ) : null,
              c === "checking_session" ? /* @__PURE__ */ a(yt, { variant: "outlined", sx: { p: 4, borderRadius: 2, maxWidth: 480, width: "100%" }, children: /* @__PURE__ */ C(ce, { spacing: 2, sx: { alignItems: "center" }, children: [
                /* @__PURE__ */ a(Qn, {}),
                /* @__PURE__ */ a(J, { variant: "h5", component: "h2", sx: { textAlign: "center" }, children: "Starting dashboard" }),
                /* @__PURE__ */ a(J, { color: "text.secondary", sx: { textAlign: "center" }, children: "Checking gateway access and sign-in requirements." })
              ] }) }) : null,
              c === "loading" ? /* @__PURE__ */ a(yt, { variant: "outlined", sx: { p: 4, borderRadius: 2, maxWidth: 480, width: "100%" }, children: /* @__PURE__ */ C(ce, { spacing: 2, sx: { alignItems: "center" }, children: [
                /* @__PURE__ */ a(Qn, {}),
                /* @__PURE__ */ a(J, { variant: "h5", component: "h2", children: "Loading dashboard" }),
                /* @__PURE__ */ a(J, { color: "text.secondary", sx: { textAlign: "center" }, children: "Querying local MCP Gateway state, servers, tools, prompts, and resources." })
              ] }) }) : null,
              c === "error" ? /* @__PURE__ */ C(yt, { variant: "outlined", sx: { p: 4, borderRadius: 2, borderColor: "error.light", maxWidth: 560, width: "100%" }, children: [
                /* @__PURE__ */ a(J, { variant: "h5", component: "h2", gutterBottom: !0, children: "Dashboard API unavailable" }),
                /* @__PURE__ */ a(J, { color: "text.secondary", gutterBottom: !0, children: "Failed to load dashboard data from the local server." }),
                /* @__PURE__ */ a(
                  J,
                  {
                    component: "code",
                    sx: {
                      display: "block",
                      mt: 2,
                      p: 1.5,
                      bgcolor: "grey.100",
                      borderRadius: 1,
                      fontFamily: En,
                      wordBreak: "break-word"
                    },
                    children: f
                  }
                )
              ] }) : null,
              c === "ready" ? /* @__PURE__ */ a("div", { className: "flex flex-col gap-[14px]", children: !t && n === "home" ? /* @__PURE__ */ a(
                _S,
                {
                  overview: qt,
                  auth: i ?? void 0,
                  onNavigate: l
                }
              ) : oc ? /* @__PURE__ */ C(yt, { variant: "outlined", sx: { p: 4, maxWidth: 560, borderRadius: 2, mx: "auto" }, children: [
                /* @__PURE__ */ a(J, { variant: "h5", component: "h2", gutterBottom: !0, children: "Sign in required" }),
                /* @__PURE__ */ a(J, { color: "text.secondary", sx: { mb: 2 }, children: "Use the gateway sign-in flow to manage servers, tools, prompts, resources, and diagnostics." }),
                i != null && i.login_path ? /* @__PURE__ */ a(be, { variant: "contained", component: "a", href: i.login_path, children: "Sign in" }) : null
              ] }) : /* @__PURE__ */ C(Bt, { children: [
                n === "servers" && p.servers ? /* @__PURE__ */ C(Bt, { children: [
                  qt ? /* @__PURE__ */ C("section", { className: "dense-metrics-grid", children: [
                    /* @__PURE__ */ C("div", { className: "metric-card compact-metric", children: [
                      /* @__PURE__ */ a("span", { children: "Servers" }),
                      /* @__PURE__ */ a("strong", { children: qt.server_count })
                    ] }),
                    /* @__PURE__ */ C("div", { className: "metric-card compact-metric", children: [
                      /* @__PURE__ */ a("span", { children: "Tools" }),
                      /* @__PURE__ */ a("strong", { children: qt.tool_count })
                    ] }),
                    /* @__PURE__ */ C("div", { className: "metric-card compact-metric", children: [
                      /* @__PURE__ */ a("span", { children: "Prompts" }),
                      /* @__PURE__ */ a("strong", { children: qt.prompt_count })
                    ] }),
                    /* @__PURE__ */ C("div", { className: "metric-card compact-metric", children: [
                      /* @__PURE__ */ a("span", { children: "Resources" }),
                      /* @__PURE__ */ a("strong", { children: qt.resource_count })
                    ] })
                  ] }) : null,
                  ie !== null ? /* @__PURE__ */ a(
                    zt,
                    {
                      title: (vr == null ? void 0 : vr.name) ?? ie,
                      subtitle: "Registered MCP servers",
                      action: /* @__PURE__ */ C(ce, { direction: { xs: "column", sm: "row" }, spacing: 1, sx: { alignItems: { sm: "center" } }, children: [
                        /* @__PURE__ */ a(
                          be,
                          {
                            variant: "outlined",
                            onClick: () => {
                              it(wt("servers"));
                            },
                            children: "← All servers"
                          }
                        ),
                        /* @__PURE__ */ a(be, { variant: "contained", onClick: ac, children: "+ Add Server" })
                      ] }),
                      children: vr ? ch(vr) : /* @__PURE__ */ C(ce, { spacing: 2, sx: { py: 2 }, children: [
                        /* @__PURE__ */ a(J, { color: "text.secondary", variant: "body2", children: "This server does not exist or was removed. Bookmarked URLs stay valid only while the server is registered." }),
                        /* @__PURE__ */ a(
                          be,
                          {
                            variant: "contained",
                            onClick: () => {
                              it(wt("servers"));
                            },
                            children: "Back to all servers"
                          }
                        )
                      ] })
                    }
                  ) : /* @__PURE__ */ a(
                    zt,
                    {
                      title: "Servers",
                      subtitle: "Registered MCP servers",
                      action: /* @__PURE__ */ C(ce, { direction: { xs: "column", sm: "row" }, spacing: 1, sx: { alignItems: { sm: "center" } }, children: [
                        /* @__PURE__ */ a(
                          De,
                          {
                            size: "small",
                            placeholder: "Search servers",
                            value: h,
                            onChange: (d) => E(d.target.value),
                            sx: { minWidth: { sm: 220 } }
                          }
                        ),
                        /* @__PURE__ */ a(be, { variant: "contained", onClick: ac, children: "+ Add Server" })
                      ] }),
                      children: p.servers.empty_state && gr.length === 0 ? /* @__PURE__ */ a(zn, { emptyState: p.servers.empty_state }) : /* @__PURE__ */ a(
                        Ve,
                        {
                          sx: {
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                            gap: 1.5
                          },
                          children: gr.map((d) => {
                            const S = !d.enabled;
                            return /* @__PURE__ */ C(
                              yt,
                              {
                                role: "link",
                                tabIndex: 0,
                                "aria-label": `Open server ${d.name}`,
                                onClick: () => {
                                  it(gu(d.name));
                                },
                                onKeyDown: (R) => {
                                  (R.key === "Enter" || R.key === " ") && (R.preventDefault(), it(gu(d.name)));
                                },
                                elevation: 0,
                                variant: "outlined",
                                sx: {
                                  p: 1.5,
                                  borderRadius: 2,
                                  cursor: "pointer",
                                  borderColor: "divider",
                                  opacity: S ? 0.82 : 1,
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
                                  /* @__PURE__ */ a(J, { variant: "subtitle2", sx: { fontWeight: 700, mb: 0.5 }, children: d.name }),
                                  /* @__PURE__ */ a(
                                    J,
                                    {
                                      variant: "caption",
                                      color: "text.secondary",
                                      sx: { display: "block", mb: 1, wordBreak: "break-word" },
                                      children: d.connection_summary
                                    }
                                  ),
                                  /* @__PURE__ */ a(J, { variant: "caption", color: "text.secondary", sx: { display: "block", mb: 1 }, children: /* @__PURE__ */ a("code", { children: Au(d.transport) }) }),
                                  /* @__PURE__ */ C(ce, { direction: "row", spacing: 0.5, sx: { flexWrap: "wrap", gap: 0.5, mb: 1 }, children: [
                                    /* @__PURE__ */ a(
                                      Kt,
                                      {
                                        text: Na(qi(d)),
                                        tone: "muted"
                                      }
                                    ),
                                    /* @__PURE__ */ a(
                                      Kt,
                                      {
                                        text: d.enabled ? "Enabled" : "Disabled",
                                        tone: d.enabled ? "good" : "muted"
                                      }
                                    ),
                                    /* @__PURE__ */ a(
                                      Kt,
                                      {
                                        text: Bu(d.status),
                                        tone: Du(d.status)
                                      }
                                    )
                                  ] }),
                                  /* @__PURE__ */ C(J, { variant: "caption", color: "text.secondary", sx: { display: "block", mb: 1 }, children: [
                                    d.tool_count,
                                    " tools · ",
                                    d.prompt_count,
                                    " prompts · ",
                                    d.resource_count,
                                    " ",
                                    "resources"
                                  ] }),
                                  /* @__PURE__ */ a(J, { variant: "caption", color: "primary", sx: { display: "block", mt: 1 }, children: "View details →" })
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
                n === "tools" && p.tools ? V !== null ? /* @__PURE__ */ a(
                  zt,
                  {
                    title: (Sr == null ? void 0 : Sr.name) ?? V ?? "Tool",
                    subtitle: "Discovered tools across registered servers",
                    action: /* @__PURE__ */ a(
                      be,
                      {
                        variant: "outlined",
                        onClick: () => {
                          it(wt("tools"));
                        },
                        children: "← All tools"
                      }
                    ),
                    children: Sr ? dh(Sr) : /* @__PURE__ */ C(ce, { spacing: 2, sx: { py: 2 }, children: [
                      /* @__PURE__ */ a(J, { color: "text.secondary", variant: "body2", children: "This tool does not exist or was removed. Bookmarked URLs stay valid only while the tool is present in the catalog." }),
                      /* @__PURE__ */ a(
                        be,
                        {
                          variant: "contained",
                          onClick: () => {
                            it(wt("tools"));
                          },
                          children: "Back to all tools"
                        }
                      )
                    ] })
                  }
                ) : /* @__PURE__ */ a(
                  zt,
                  {
                    title: "Tools",
                    subtitle: "Discovered tools across registered servers",
                    action: /* @__PURE__ */ C("div", { className: "toolbar-cluster", children: [
                      /* @__PURE__ */ a(
                        "input",
                        {
                          className: "table-filter compact-filter",
                          onChange: (d) => k(d.target.value),
                          placeholder: "Search tools",
                          value: _
                        }
                      ),
                      /* @__PURE__ */ C(
                        "select",
                        {
                          className: "table-filter compact-filter compact-select",
                          onChange: (d) => w(d.target.value),
                          value: O,
                          children: [
                            /* @__PURE__ */ a("option", { value: "all", children: "All servers" }),
                            Jl.map((d) => /* @__PURE__ */ a("option", { value: d, children: d }, d))
                          ]
                        }
                      )
                    ] }),
                    children: p.tools.empty_state && br.length === 0 ? /* @__PURE__ */ a(zn, { emptyState: p.tools.empty_state }) : /* @__PURE__ */ a(
                      Ve,
                      {
                        sx: {
                          display: "grid",
                          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                          gap: 1.5
                        },
                        children: br.map((d) => {
                          const S = !d.enabled || !d.server_enabled;
                          return /* @__PURE__ */ C(
                            yt,
                            {
                              role: "link",
                              tabIndex: 0,
                              "aria-label": `Open tool ${d.name}`,
                              onClick: () => {
                                it(bu(d.canonical_name));
                              },
                              onKeyDown: (R) => {
                                (R.key === "Enter" || R.key === " ") && (R.preventDefault(), it(bu(d.canonical_name)));
                              },
                              elevation: 0,
                              variant: "outlined",
                              sx: {
                                p: 1.5,
                                borderRadius: 2,
                                cursor: "pointer",
                                borderColor: "divider",
                                opacity: S ? 0.82 : 1,
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
                                /* @__PURE__ */ a(J, { variant: "subtitle2", sx: { fontWeight: 700, mb: 0.5 }, children: d.name }),
                                /* @__PURE__ */ a(J, { variant: "caption", color: "text.secondary", sx: { display: "block", mb: 1, wordBreak: "break-all" }, children: /* @__PURE__ */ a("code", { children: d.canonical_name }) }),
                                /* @__PURE__ */ a(J, { variant: "caption", color: "text.secondary", sx: { display: "block", mb: 1 }, children: /* @__PURE__ */ a("code", { children: d.server }) }),
                                /* @__PURE__ */ C(ce, { direction: "row", spacing: 0.5, sx: { flexWrap: "wrap", gap: 0.5, mb: 1 }, children: [
                                  /* @__PURE__ */ a(
                                    Kt,
                                    {
                                      text: d.enabled ? "Enabled" : "Disabled",
                                      tone: d.enabled ? "good" : "muted"
                                    }
                                  ),
                                  d.server_enabled ? null : /* @__PURE__ */ a(Kt, { text: "Server off", tone: "warn" })
                                ] }),
                                /* @__PURE__ */ a(
                                  J,
                                  {
                                    variant: "caption",
                                    color: "text.secondary",
                                    sx: {
                                      display: "-webkit-box",
                                      WebkitLineClamp: 3,
                                      WebkitBoxOrient: "vertical",
                                      overflow: "hidden"
                                    },
                                    children: Ki(d)
                                  }
                                ),
                                /* @__PURE__ */ a(J, { variant: "caption", color: "primary", sx: { display: "block", mt: 1 }, children: "View details →" })
                              ]
                            },
                            d.canonical_name
                          );
                        })
                      }
                    )
                  }
                ) : null,
                n === "tool_groups" && p.toolGroups ? G !== null ? /* @__PURE__ */ a(
                  zt,
                  {
                    title: G === "edit" ? "Edit Tool Group" : "Add Tool Group",
                    subtitle: G === "edit" ? (Ti == null ? void 0 : Ti.name) ?? je ?? "" : "Configure included servers, tools, and exclusions.",
                    action: /* @__PURE__ */ a(be, { variant: "outlined", onClick: cc, children: G === "edit" && je ? `← ${je}` : "← All tool groups" }),
                    children: G === "edit" && je && !Ti ? /* @__PURE__ */ C(ce, { spacing: 2, sx: { py: 2 }, children: [
                      /* @__PURE__ */ a(J, { color: "text.secondary", variant: "body2", children: "This tool group does not exist or was deleted." }),
                      /* @__PURE__ */ a(be, { variant: "contained", onClick: Oi, children: "Back to all tool groups" })
                    ] }) : sh()
                  }
                ) : re !== null ? /* @__PURE__ */ a(
                  zt,
                  {
                    title: (xr == null ? void 0 : xr.name) ?? re,
                    subtitle: "",
                    action: /* @__PURE__ */ C(ce, { direction: "row", spacing: 1, useFlexGap: !0, sx: { flexWrap: "wrap" }, children: [
                      /* @__PURE__ */ a(be, { variant: "outlined", onClick: Oi, children: "← All tool groups" }),
                      /* @__PURE__ */ a(be, { variant: "contained", onClick: lc, children: "+ Add Tool Group" })
                    ] }),
                    children: xr ? ah(xr) : /* @__PURE__ */ C(ce, { spacing: 2, sx: { py: 2 }, children: [
                      /* @__PURE__ */ a(J, { color: "text.secondary", variant: "body2", children: "This tool group does not exist or was deleted." }),
                      /* @__PURE__ */ a(be, { variant: "contained", onClick: Oi, children: "Back to all tool groups" })
                    ] })
                  }
                ) : /* @__PURE__ */ a(
                  zt,
                  {
                    title: "Configured tool groups",
                    subtitle: "",
                    action: /* @__PURE__ */ a(be, { variant: "contained", onClick: lc, children: "+ Add Tool Group" }),
                    children: p.toolGroups.empty_state && p.toolGroups.tool_groups.length === 0 ? /* @__PURE__ */ a(zn, { emptyState: p.toolGroups.empty_state }) : /* @__PURE__ */ a(
                      Ve,
                      {
                        sx: {
                          display: "grid",
                          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                          gap: 1.5
                        },
                        children: p.toolGroups.tool_groups.map((d) => /* @__PURE__ */ C(
                          yt,
                          {
                            role: "link",
                            tabIndex: 0,
                            "aria-label": `Open tool group ${d.name}`,
                            onClick: () => {
                              it(Pr(d.name));
                            },
                            onKeyDown: (S) => {
                              (S.key === "Enter" || S.key === " ") && (S.preventDefault(), it(Pr(d.name)));
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
                              /* @__PURE__ */ C(ce, { direction: "row", spacing: 1, sx: { alignItems: "flex-start", mb: 1 }, children: [
                                /* @__PURE__ */ a(J, { variant: "subtitle2", sx: { fontWeight: 700, flex: 1, minWidth: 0 }, children: d.name }),
                                /* @__PURE__ */ C(
                                  J,
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
                              /* @__PURE__ */ a(J, { variant: "caption", color: "text.secondary", sx: { display: "block", mb: 1 }, children: /* @__PURE__ */ a("code", { title: Gi(d.security_option), children: d.security_option }) }),
                              d.description ? /* @__PURE__ */ a(
                                J,
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
                              ) : /* @__PURE__ */ a(J, { variant: "caption", color: "text.disabled", children: "No description" }),
                              /* @__PURE__ */ a(J, { variant: "caption", color: "primary", sx: { display: "block", mt: 1 }, children: "View details →" })
                            ]
                          },
                          d.name
                        ))
                      }
                    )
                  }
                ) : null,
                n === "prompt_groups" && p.promptGroups ? Y !== null ? /* @__PURE__ */ a(
                  zt,
                  {
                    title: (Cr == null ? void 0 : Cr.name) ?? Y,
                    subtitle: "",
                    action: /* @__PURE__ */ C(ce, { direction: "row", spacing: 1, useFlexGap: !0, sx: { flexWrap: "wrap" }, children: [
                      /* @__PURE__ */ a(
                        be,
                        {
                          variant: "outlined",
                          onClick: () => {
                            it(wt("prompt_groups"));
                          },
                          children: "← All prompt groups"
                        }
                      ),
                      /* @__PURE__ */ a(be, { variant: "contained", onClick: dc, children: "+ Add Prompt Group" })
                    ] }),
                    children: Cr ? lh(Cr) : /* @__PURE__ */ C(ce, { spacing: 2, sx: { py: 2 }, children: [
                      /* @__PURE__ */ a(J, { color: "text.secondary", variant: "body2", children: "This prompt group does not exist or was deleted." }),
                      /* @__PURE__ */ a(
                        be,
                        {
                          variant: "contained",
                          onClick: () => {
                            it(wt("prompt_groups"));
                          },
                          children: "Back to all prompt groups"
                        }
                      )
                    ] })
                  }
                ) : /* @__PURE__ */ a(
                  zt,
                  {
                    title: "Configured prompt groups",
                    subtitle: "",
                    action: /* @__PURE__ */ a(be, { variant: "contained", onClick: dc, children: "+ Add Prompt Group" }),
                    children: p.promptGroups.empty_state && p.promptGroups.prompt_groups.length === 0 ? /* @__PURE__ */ a(zn, { emptyState: p.promptGroups.empty_state }) : /* @__PURE__ */ a(
                      Ve,
                      {
                        sx: {
                          display: "grid",
                          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                          gap: 1.5
                        },
                        children: p.promptGroups.prompt_groups.map((d) => /* @__PURE__ */ C(
                          yt,
                          {
                            role: "link",
                            tabIndex: 0,
                            "aria-label": `Open prompt group ${d.name}`,
                            onClick: () => {
                              it(ji(d.name));
                            },
                            onKeyDown: (S) => {
                              (S.key === "Enter" || S.key === " ") && (S.preventDefault(), it(ji(d.name)));
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
                              /* @__PURE__ */ C(ce, { direction: "row", spacing: 1, sx: { alignItems: "flex-start", mb: 1 }, children: [
                                /* @__PURE__ */ a(J, { variant: "subtitle2", sx: { fontWeight: 700, flex: 1, minWidth: 0 }, children: d.name }),
                                /* @__PURE__ */ C(
                                  J,
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
                              /* @__PURE__ */ a(J, { variant: "caption", color: "text.secondary", sx: { display: "block", mb: 1 }, children: /* @__PURE__ */ a("code", { title: Gi(d.security_option), children: d.security_option }) }),
                              d.description ? /* @__PURE__ */ a(
                                J,
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
                              ) : /* @__PURE__ */ a(J, { variant: "caption", color: "text.disabled", children: "No description" }),
                              /* @__PURE__ */ a(J, { variant: "caption", color: "primary", sx: { display: "block", mt: 1 }, children: "View details →" })
                            ]
                          },
                          d.name
                        ))
                      }
                    )
                  }
                ) : null,
                n === "prompts" && p.prompts ? te !== null ? /* @__PURE__ */ a(
                  zt,
                  {
                    title: (Tr == null ? void 0 : Tr.name) ?? te ?? "Prompt",
                    subtitle: "Discovered prompt templates",
                    action: /* @__PURE__ */ a(
                      be,
                      {
                        variant: "outlined",
                        onClick: () => {
                          it(wt("prompts"));
                        },
                        children: "← All prompts"
                      }
                    ),
                    children: Tr ? uh(Tr) : /* @__PURE__ */ C(ce, { spacing: 2, sx: { py: 2 }, children: [
                      /* @__PURE__ */ a(J, { color: "text.secondary", variant: "body2", children: "This prompt does not exist or was removed. Bookmarked URLs stay valid only while the prompt is in the catalog." }),
                      /* @__PURE__ */ a(
                        be,
                        {
                          variant: "contained",
                          onClick: () => {
                            it(wt("prompts"));
                          },
                          children: "Back to all prompts"
                        }
                      )
                    ] })
                  }
                ) : /* @__PURE__ */ a(
                  zt,
                  {
                    title: "Prompts",
                    subtitle: "Discovered prompt templates",
                    action: /* @__PURE__ */ a("div", { className: "toolbar-cluster", children: /* @__PURE__ */ a(
                      "input",
                      {
                        className: "table-filter compact-filter",
                        onChange: (d) => N(d.target.value),
                        placeholder: "Search prompts",
                        value: T
                      }
                    ) }),
                    children: p.prompts.empty_state && tc.length === 0 ? /* @__PURE__ */ a(zn, { emptyState: p.prompts.empty_state }) : /* @__PURE__ */ a(
                      Ve,
                      {
                        sx: {
                          display: "grid",
                          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                          gap: 1.5
                        },
                        children: tc.map((d) => {
                          const S = !d.enabled || !d.server_enabled;
                          return /* @__PURE__ */ C(
                            yt,
                            {
                              role: "link",
                              tabIndex: 0,
                              "aria-label": `Open prompt ${d.name}`,
                              onClick: () => {
                                it(yu(d.canonical_name));
                              },
                              onKeyDown: (R) => {
                                (R.key === "Enter" || R.key === " ") && (R.preventDefault(), it(yu(d.canonical_name)));
                              },
                              elevation: 0,
                              variant: "outlined",
                              sx: {
                                p: 1.5,
                                borderRadius: 2,
                                cursor: "pointer",
                                borderColor: "divider",
                                opacity: S ? 0.82 : 1,
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
                                /* @__PURE__ */ a(J, { variant: "subtitle2", sx: { fontWeight: 700, mb: 0.5 }, children: d.name }),
                                /* @__PURE__ */ a(J, { variant: "caption", color: "text.secondary", sx: { display: "block", mb: 1, wordBreak: "break-all" }, children: /* @__PURE__ */ a("code", { children: d.canonical_name }) }),
                                /* @__PURE__ */ a(J, { variant: "caption", color: "text.secondary", sx: { display: "block", mb: 1 }, children: /* @__PURE__ */ a("code", { children: d.server }) }),
                                /* @__PURE__ */ C(ce, { direction: "row", spacing: 0.5, sx: { flexWrap: "wrap", gap: 0.5, mb: 1 }, children: [
                                  /* @__PURE__ */ a(
                                    Kt,
                                    {
                                      text: d.enabled ? "Enabled" : "Disabled",
                                      tone: d.enabled ? "good" : "muted"
                                    }
                                  ),
                                  d.server_enabled ? null : /* @__PURE__ */ a(Kt, { text: "Server off", tone: "warn" })
                                ] }),
                                /* @__PURE__ */ a(
                                  J,
                                  {
                                    variant: "caption",
                                    color: "text.secondary",
                                    sx: {
                                      display: "-webkit-box",
                                      WebkitLineClamp: 3,
                                      WebkitBoxOrient: "vertical",
                                      overflow: "hidden"
                                    },
                                    children: Yi(d)
                                  }
                                ),
                                /* @__PURE__ */ a(J, { variant: "caption", color: "primary", sx: { display: "block", mt: 1 }, children: "View details →" })
                              ]
                            },
                            d.canonical_name
                          );
                        })
                      }
                    )
                  }
                ) : null,
                n === "resources" && p.resources ? /* @__PURE__ */ a(zt, { title: "Resources", subtitle: "Discovered MCP resources", children: p.resources.empty_state && p.resources.resources.length === 0 ? /* @__PURE__ */ a(zn, { emptyState: p.resources.empty_state }) : /* @__PURE__ */ C("table", { className: "data-table compact-table resources-table", children: [
                  /* @__PURE__ */ a("thead", { children: /* @__PURE__ */ C("tr", { children: [
                    /* @__PURE__ */ a("th", { children: "Name" }),
                    /* @__PURE__ */ a("th", { children: "URI" }),
                    /* @__PURE__ */ a("th", { children: "Server" }),
                    /* @__PURE__ */ a("th", { children: "MIME" }),
                    /* @__PURE__ */ a("th", { children: "Description" })
                  ] }) }),
                  /* @__PURE__ */ a("tbody", { children: p.resources.resources.map((d) => /* @__PURE__ */ C("tr", { children: [
                    /* @__PURE__ */ a("td", { children: d.name }),
                    /* @__PURE__ */ a("td", { children: /* @__PURE__ */ C("div", { className: "inline-copy resource-uri-cell", children: [
                      /* @__PURE__ */ a("code", { className: "identifier-code", title: d.uri, children: d.uri }),
                      /* @__PURE__ */ a(
                        bt,
                        {
                          ariaLabel: "Copy resource URI",
                          title: "Copy resource URI",
                          value: d.uri
                        }
                      )
                    ] }) }),
                    /* @__PURE__ */ a("td", { children: d.server }),
                    /* @__PURE__ */ a("td", { children: /* @__PURE__ */ a("code", { children: d.mime_type || "Unknown" }) }),
                    /* @__PURE__ */ a("td", { children: Ow(d) })
                  ] }, d.uri)) })
                ] }) }) : null,
                n === "agent_apps" && p.agentApps ? Be !== null ? /* @__PURE__ */ a(
                  zt,
                  {
                    title: (yr == null ? void 0 : yr.name) ?? `Agent app #${Be}`,
                    action: /* @__PURE__ */ C(ce, { direction: "row", spacing: 1, useFlexGap: !0, sx: { flexWrap: "wrap" }, children: [
                      /* @__PURE__ */ a(
                        be,
                        {
                          variant: "outlined",
                          onClick: () => {
                            it(wt("agent_apps"));
                          },
                          children: "← All apps"
                        }
                      ),
                      /* @__PURE__ */ a(be, { variant: "contained", onClick: uc, children: "+ Create agent app" })
                    ] }),
                    children: yr ? ph(yr) : /* @__PURE__ */ C(ce, { spacing: 2, sx: { py: 2 }, children: [
                      /* @__PURE__ */ a(J, { color: "text.secondary", variant: "body2", children: "This agent app does not exist or was deleted. Bookmarked URLs are only valid while the app is present." }),
                      /* @__PURE__ */ a(
                        be,
                        {
                          variant: "contained",
                          onClick: () => {
                            it(wt("agent_apps"));
                          },
                          children: "Back to all apps"
                        }
                      )
                    ] })
                  }
                ) : /* @__PURE__ */ a(
                  zt,
                  {
                    title: "Agent apps",
                    action: /* @__PURE__ */ a(be, { variant: "contained", onClick: uc, children: "+ Create agent app" }),
                    children: p.agentApps.apps.length === 0 ? /* @__PURE__ */ a(J, { color: "text.secondary", variant: "body2", children: "No agent apps yet. Create one to mint tokens scoped to specific tool and prompt groups." }) : /* @__PURE__ */ a(
                      Ve,
                      {
                        sx: {
                          display: "grid",
                          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                          gap: 1.5
                        },
                        children: p.agentApps.apps.map((d) => /* @__PURE__ */ C(
                          yt,
                          {
                            role: "link",
                            tabIndex: 0,
                            "aria-label": `Open ${d.name}`,
                            onClick: () => {
                              it(Ra(d.id));
                            },
                            onKeyDown: (S) => {
                              (S.key === "Enter" || S.key === " ") && (S.preventDefault(), it(Ra(d.id)));
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
                              /* @__PURE__ */ C(ce, { direction: "row", spacing: 1, sx: { alignItems: "flex-start", mb: 0.5 }, children: [
                                /* @__PURE__ */ a(J, { variant: "subtitle2", sx: { fontWeight: 700, flex: 1, minWidth: 0 }, children: d.name }),
                                /* @__PURE__ */ a(
                                  Kt,
                                  {
                                    tone: d.status === "enabled" ? "good" : "muted",
                                    text: d.status === "enabled" ? "enabled" : "disabled"
                                  }
                                )
                              ] }),
                              d.description ? /* @__PURE__ */ a(
                                J,
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
                              ) : /* @__PURE__ */ a(J, { variant: "caption", color: "text.disabled", children: "No description" }),
                              /* @__PURE__ */ a(J, { variant: "caption", color: "primary", sx: { display: "block", mt: 1 }, children: "View details →" })
                            ]
                          },
                          d.id
                        ))
                      }
                    )
                  }
                ) : null,
                n === "diagnostics" && bn ? /* @__PURE__ */ C(Bt, { children: [
                  /* @__PURE__ */ C(zt, { title: "System Info", subtitle: "Runtime details", children: [
                    /* @__PURE__ */ a(
                      Ve,
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
                        children: /* @__PURE__ */ C(J, { variant: "body2", color: "text.secondary", sx: { lineHeight: 1.6 }, children: [
                          "This gateway is built for ",
                          /* @__PURE__ */ a("strong", { children: "local productivity" }),
                          " (fast iteration, minimal setup) and",
                          " ",
                          /* @__PURE__ */ a("strong", { children: "shared deployments" }),
                          " (prefix routing, optional SSO, Redis session store, and metrics). Use the sidebar to configure servers, inspect catalogued tools, and tune what each client can see."
                        ] })
                      }
                    ),
                    /* @__PURE__ */ C("div", { className: "diagnostics-grid compact-diagnostics-grid", children: [
                      /* @__PURE__ */ C("div", { className: "diag-card compact-metric", children: [
                        /* @__PURE__ */ a("span", { children: "Version" }),
                        /* @__PURE__ */ a("strong", { children: Sw(bn.version) })
                      ] }),
                      /* @__PURE__ */ C("div", { className: "diag-card compact-metric", children: [
                        /* @__PURE__ */ a("span", { children: "Mode" }),
                        /* @__PURE__ */ a("strong", { children: bn.mode })
                      ] }),
                      /* @__PURE__ */ C("div", { className: "diag-card compact-metric", children: [
                        /* @__PURE__ */ a("span", { children: "Database" }),
                        /* @__PURE__ */ a("strong", { children: bn.database })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ a(zt, { title: "Runtime details", subtitle: "System information", children: /* @__PURE__ */ C("dl", { className: "diagnostic-list compact-diagnostic-list", children: [
                    /* @__PURE__ */ C("div", { children: [
                      /* @__PURE__ */ a("dt", { children: "Full build" }),
                      /* @__PURE__ */ a("dd", { children: /* @__PURE__ */ a("code", { children: bn.version }) })
                    ] }),
                    /* @__PURE__ */ C("div", { children: [
                      /* @__PURE__ */ a("dt", { children: "Global MCP Endpoint" }),
                      /* @__PURE__ */ a("dd", { children: /* @__PURE__ */ a("code", { children: bn.primary_endpoint }) })
                    ] }),
                    /* @__PURE__ */ C("div", { children: [
                      /* @__PURE__ */ a("dt", { children: "Enabled transports" }),
                      /* @__PURE__ */ a("dd", { children: /* @__PURE__ */ a("code", { children: bn.enabled_transports.join(", ") }) })
                    ] })
                  ] }) })
                ] }) : null
              ] }) }) : null,
              /* @__PURE__ */ C(Lr, { open: Rt, onClose: Ri, maxWidth: "md", fullWidth: !0, scroll: "paper", children: [
                /* @__PURE__ */ a(Wr, { sx: { pr: 6 }, children: /* @__PURE__ */ C(
                  ce,
                  {
                    direction: "row",
                    spacing: 2,
                    sx: { justifyContent: "space-between", alignItems: "flex-start" },
                    children: [
                      /* @__PURE__ */ C(Ve, { children: [
                        /* @__PURE__ */ a(J, { variant: "caption", sx: { letterSpacing: "0.12em", fontWeight: 600 }, children: "Prompt Groups" }),
                        /* @__PURE__ */ a(J, { variant: "h5", sx: { mt: 0.5 }, children: Ae ? "Edit Prompt Group" : "Add Prompt Group" })
                      ] }),
                      /* @__PURE__ */ a(be, { variant: "outlined", size: "small", onClick: Ri, children: "Close" })
                    ]
                  }
                ) }),
                /* @__PURE__ */ a(jr, { dividers: !0, children: /* @__PURE__ */ C(ce, { spacing: 2, children: [
                  /* @__PURE__ */ a(
                    De,
                    {
                      label: "Group name",
                      placeholder: "reviews",
                      fullWidth: !0,
                      size: "small",
                      value: We.name,
                      disabled: Ae !== null,
                      helperText: Ae ? "Group name cannot be changed." : void 0,
                      onChange: (d) => _e((S) => ({ ...S, name: d.target.value }))
                    }
                  ),
                  /* @__PURE__ */ a(
                    De,
                    {
                      label: "Description",
                      placeholder: "Prompts useful for PR review workflows",
                      fullWidth: !0,
                      size: "small",
                      value: We.description,
                      onChange: (d) => _e((S) => ({ ...S, description: d.target.value }))
                    }
                  ),
                  /* @__PURE__ */ C(Yt, { size: "small", fullWidth: !0, children: [
                    /* @__PURE__ */ a(Xt, { id: "pg-mcp-security-label", children: "MCP security" }),
                    /* @__PURE__ */ a(
                      Ut,
                      {
                        labelId: "pg-mcp-security-label",
                        label: "MCP security",
                        value: We.securityOption,
                        onChange: (d) => _e((S) => ({
                          ...S,
                          securityOption: d.target.value
                        })),
                        children: sl.map((d) => /* @__PURE__ */ a(Ye, { value: d.value, children: d.label }, d.value))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ C("div", { className: "tool-group-builder", children: [
                    /* @__PURE__ */ C("div", { className: "tool-group-selector panel", children: [
                      /* @__PURE__ */ a("div", { className: "tool-group-selector-header", children: /* @__PURE__ */ a("strong", { children: "Available prompts" }) }),
                      (((Lc = p.prompts) == null ? void 0 : Lc.prompts.length) ?? 0) > 0 ? /* @__PURE__ */ C(Bt, { children: [
                        /* @__PURE__ */ C(ce, { direction: { xs: "column", sm: "row" }, spacing: 1, sx: { mb: 1 }, children: [
                          /* @__PURE__ */ a(
                            De,
                            {
                              placeholder: "Search prompts",
                              size: "small",
                              value: A,
                              onChange: (d) => L(d.target.value),
                              sx: { flex: 1, minWidth: 0 }
                            }
                          ),
                          /* @__PURE__ */ C(Yt, { size: "small", sx: { minWidth: 160 }, children: [
                            /* @__PURE__ */ a(Xt, { id: "pg-server-filter", children: "Server" }),
                            /* @__PURE__ */ C(
                              Ut,
                              {
                                labelId: "pg-server-filter",
                                label: "Server",
                                value: W,
                                onChange: (d) => q(d.target.value),
                                children: [
                                  /* @__PURE__ */ a(Ye, { value: "all", children: "All servers" }),
                                  Tm.map((d) => /* @__PURE__ */ a(Ye, { value: d, children: d }, d))
                                ]
                              }
                            )
                          ] })
                        ] }),
                        /* @__PURE__ */ a("div", { className: "tool-pick-list", children: wm.map((d) => {
                          const S = We.selectedPrompts.includes(d.canonical_name);
                          return /* @__PURE__ */ C(
                            "button",
                            {
                              className: `tool-pick-item ${S ? "is-selected" : ""}`,
                              onClick: () => zm(d.canonical_name),
                              type: "button",
                              children: [
                                /* @__PURE__ */ a("div", { className: "table-primary", children: d.name }),
                                /* @__PURE__ */ a("code", { className: "identifier-code", title: d.canonical_name, children: d.canonical_name }),
                                /* @__PURE__ */ a("div", { className: "table-secondary", children: d.server })
                              ]
                            },
                            d.canonical_name
                          );
                        }) })
                      ] }) : /* @__PURE__ */ a("p", { className: "empty-inline", children: "Register MCP servers first so prompts are available to group." })
                    ] }),
                    /* @__PURE__ */ C("div", { className: "tool-group-selector panel", children: [
                      /* @__PURE__ */ a("div", { className: "tool-group-selector-header", children: /* @__PURE__ */ a("strong", { children: "Selected prompts" }) }),
                      We.selectedPrompts.length > 0 ? /* @__PURE__ */ a("div", { className: "selected-tool-list", children: We.selectedPrompts.map((d) => /* @__PURE__ */ C(
                        "button",
                        {
                          className: "selected-tool-chip",
                          onClick: () => Vm(d),
                          type: "button",
                          children: [
                            /* @__PURE__ */ a("code", { children: d }),
                            /* @__PURE__ */ a("span", { children: "Remove" })
                          ]
                        },
                        d
                      )) }) : /* @__PURE__ */ a("p", { className: "empty-inline", children: "Select at least one prompt." })
                    ] })
                  ] }),
                  no ? /* @__PURE__ */ a(J, { color: "error", variant: "body2", children: no }) : null
                ] }) }),
                /* @__PURE__ */ C(Fr, { sx: { px: 3, py: 2 }, children: [
                  /* @__PURE__ */ a(be, { variant: "outlined", onClick: Ri, children: "Cancel" }),
                  /* @__PURE__ */ a(
                    be,
                    {
                      variant: "contained",
                      disabled: Xe("prompt-group-create") || Xe("prompt-group-save"),
                      onClick: () => void Qm(),
                      children: Xe("prompt-group-create") || Xe("prompt-group-save") ? "Saving..." : Ae ? "Save changes" : "+ Add Prompt Group"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ C(Lr, { open: ge, onClose: yn, maxWidth: "sm", fullWidth: !0, scroll: "paper", children: [
                /* @__PURE__ */ a(Wr, { sx: { pr: 6 }, children: /* @__PURE__ */ C(
                  ce,
                  {
                    direction: "row",
                    spacing: 2,
                    sx: { justifyContent: "space-between", alignItems: "flex-start" },
                    children: [
                      /* @__PURE__ */ C(Ve, { children: [
                        /* @__PURE__ */ a(J, { variant: "caption", sx: { letterSpacing: "0.12em", fontWeight: 600 }, children: fe ? "Edit server" : "Add server" }),
                        /* @__PURE__ */ a(J, { variant: "h5", sx: { mt: 0.5 }, children: Re ? "Complete OAuth authorization" : fe ? "Edit server" : Kn(Z) ? "Register a REST server" : "Register an MCP server" })
                      ] }),
                      /* @__PURE__ */ a(be, { variant: "outlined", size: "small", onClick: yn, children: "Close" })
                    ]
                  }
                ) }),
                /* @__PURE__ */ a(jr, { dividers: !0, children: ke ? /* @__PURE__ */ a(ce, { sx: { alignItems: "center", justifyContent: "center", py: 6 }, children: /* @__PURE__ */ a(Qn, {}) }) : Re ? /* @__PURE__ */ C(ce, { spacing: 2, className: "oauth-step", children: [
                  /* @__PURE__ */ a(J, { children: "This server requires OAuth authorization. Continue in your browser to complete registration." }),
                  /* @__PURE__ */ a(yt, { variant: "outlined", sx: { p: 2, borderRadius: 2 }, children: /* @__PURE__ */ C(ce, { spacing: 0.5, children: [
                    /* @__PURE__ */ a(J, { variant: "caption", color: "text.secondary", children: "Status" }),
                    /* @__PURE__ */ a(J, { variant: "body1", sx: { fontWeight: 600 }, children: Re.hasOpenedBrowser ? "Waiting for OAuth authorization..." : "Authorization required" }),
                    Re.authorization.expires_at ? /* @__PURE__ */ C(J, { variant: "body2", color: "text.secondary", children: [
                      "Expires ",
                      new Date(Re.authorization.expires_at).toLocaleTimeString()
                    ] }) : null
                  ] }) }),
                  Re.error ? /* @__PURE__ */ a(J, { color: "error", variant: "body2", children: Re.error }) : null
                ] }) : /* @__PURE__ */ C(ce, { spacing: 2, children: [
                  /* @__PURE__ */ a(
                    De,
                    {
                      label: "Server name",
                      placeholder: Kn(Z) ? "petstore" : Z.transport === "streamable_http" ? "context7" : "filesystem",
                      fullWidth: !0,
                      size: "small",
                      value: Z.name,
                      disabled: fe !== null,
                      onChange: (d) => dt("name", d.target.value)
                    }
                  ),
                  /* @__PURE__ */ a(
                    De,
                    {
                      label: "Description",
                      placeholder: Kn(Z) ? "Petstore REST API exposed as MCP tools" : Z.transport === "streamable_http" ? "context7 mcp server" : "Local filesystem access",
                      fullWidth: !0,
                      size: "small",
                      value: Z.description,
                      onChange: (d) => dt("description", d.target.value)
                    }
                  ),
                  /* @__PURE__ */ C(Yt, { fullWidth: !0, size: "small", children: [
                    /* @__PURE__ */ a(Xt, { id: "reg-upstream-type", children: "Upstream type" }),
                    /* @__PURE__ */ C(
                      Ut,
                      {
                        labelId: "reg-upstream-type",
                        label: "Upstream type",
                        value: Z.upstream_type,
                        disabled: fe !== null,
                        onChange: (d) => Pm(d.target.value),
                        children: [
                          /* @__PURE__ */ a(Ye, { value: "mcp_protocol", children: "MCP protocol server" }),
                          /* @__PURE__ */ a(Ye, { value: "rest_openapi", children: "REST API (OpenAPI)" }),
                          /* @__PURE__ */ a(Ye, { value: "rest_endpoint", children: "REST API (single endpoint)" })
                        ]
                      }
                    )
                  ] }),
                  Kn(Z) ? /* @__PURE__ */ a(Gr, { children: "Session mode is not applicable for REST adapters." }) : /* @__PURE__ */ C(ce, { direction: { xs: "column", md: "row" }, spacing: 2, children: [
                    /* @__PURE__ */ C(Yt, { fullWidth: !0, size: "small", children: [
                      /* @__PURE__ */ a(Xt, { id: "reg-transport", children: "Transport" }),
                      /* @__PURE__ */ C(
                        Ut,
                        {
                          labelId: "reg-transport",
                          label: "Transport",
                          value: Z.transport,
                          disabled: fe !== null,
                          onChange: (d) => dt(
                            "transport",
                            d.target.value
                          ),
                          children: [
                            /* @__PURE__ */ a(Ye, { value: "stdio", children: "stdio" }),
                            /* @__PURE__ */ a(Ye, { value: "streamable_http", children: "streamable_http" }),
                            /* @__PURE__ */ a(Ye, { value: "sse", children: "sse" })
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ C(Yt, { fullWidth: !0, size: "small", children: [
                      /* @__PURE__ */ a(Xt, { id: "reg-session", children: "Session mode" }),
                      /* @__PURE__ */ C(
                        Ut,
                        {
                          labelId: "reg-session",
                          label: "Session mode",
                          value: Z.session_mode,
                          onChange: (d) => dt(
                            "session_mode",
                            d.target.value
                          ),
                          children: [
                            /* @__PURE__ */ a(Ye, { value: "stateless", children: "stateless" }),
                            /* @__PURE__ */ a(Ye, { value: "stateful", children: "stateful" })
                          ]
                        }
                      )
                    ] })
                  ] }),
                  Z.upstream_type === "mcp_protocol" && Z.transport === "stdio" ? /* @__PURE__ */ C(ce, { spacing: 2, children: [
                    /* @__PURE__ */ a(
                      De,
                      {
                        label: "Command",
                        placeholder: "npx",
                        fullWidth: !0,
                        size: "small",
                        value: Z.command,
                        onChange: (d) => dt("command", d.target.value)
                      }
                    ),
                    /* @__PURE__ */ a(
                      De,
                      {
                        label: "Arguments",
                        placeholder: "-y\\n@modelcontextprotocol/server-filesystem",
                        fullWidth: !0,
                        size: "small",
                        multiline: !0,
                        minRows: 3,
                        value: Z.args_text,
                        onChange: (d) => dt("args_text", d.target.value)
                      }
                    ),
                    /* @__PURE__ */ C(Ve, { children: [
                      /* @__PURE__ */ a(J, { variant: "subtitle2", gutterBottom: !0, children: "Environment variables" }),
                      /* @__PURE__ */ a(ce, { spacing: 1, children: Z.env_rows.map((d, S) => /* @__PURE__ */ C(ce, { direction: { xs: "column", sm: "row" }, spacing: 1, children: [
                        /* @__PURE__ */ a(
                          De,
                          {
                            size: "small",
                            label: "KEY",
                            placeholder: "KEY",
                            value: d.key,
                            onChange: (R) => wi("env_rows", S, "key", R.target.value),
                            sx: { flex: 1 }
                          }
                        ),
                        /* @__PURE__ */ a(
                          De,
                          {
                            size: "small",
                            label: "value",
                            placeholder: "value",
                            value: d.value,
                            onChange: (R) => wi("env_rows", S, "value", R.target.value),
                            sx: { flex: 1 }
                          }
                        ),
                        /* @__PURE__ */ a(
                          be,
                          {
                            variant: "outlined",
                            onClick: () => rc("env_rows", S),
                            sx: { alignSelf: { sm: "center" } },
                            children: "Remove"
                          }
                        )
                      ] }, `env-${S}`)) }),
                      /* @__PURE__ */ a(
                        be,
                        {
                          variant: "outlined",
                          size: "small",
                          sx: { mt: 1 },
                          onClick: () => nc("env_rows"),
                          children: "Add env var"
                        }
                      )
                    ] })
                  ] }) : Z.upstream_type === "mcp_protocol" ? /* @__PURE__ */ C(ce, { spacing: 2, children: [
                    /* @__PURE__ */ a(
                      De,
                      {
                        label: "Target URL",
                        fullWidth: !0,
                        size: "small",
                        placeholder: Z.transport === "streamable_http" ? "https://mcp.context7.com/mcp" : "http://127.0.0.1:8000/mcp",
                        value: Z.url,
                        onChange: (d) => dt("url", d.target.value)
                      }
                    ),
                    /* @__PURE__ */ a(
                      De,
                      {
                        label: "Bearer token",
                        fullWidth: !0,
                        size: "small",
                        type: "password",
                        placeholder: "Optional",
                        value: Z.bearer_token,
                        onChange: (d) => dt("bearer_token", d.target.value),
                        helperText: fe !== null ? "Leave blank to keep the current bearer token." : void 0
                      }
                    ),
                    Z.transport === "streamable_http" ? /* @__PURE__ */ C(Ve, { children: [
                      /* @__PURE__ */ a(J, { variant: "subtitle2", gutterBottom: !0, children: "Headers" }),
                      /* @__PURE__ */ a(ce, { spacing: 1, children: Z.header_rows.map((d, S) => /* @__PURE__ */ C(ce, { direction: { xs: "column", sm: "row" }, spacing: 1, children: [
                        /* @__PURE__ */ a(
                          De,
                          {
                            size: "small",
                            label: "Header",
                            placeholder: "Header",
                            value: d.key,
                            onChange: (R) => wi("header_rows", S, "key", R.target.value),
                            sx: { flex: 1 }
                          }
                        ),
                        /* @__PURE__ */ a(
                          De,
                          {
                            size: "small",
                            label: "Value",
                            placeholder: "Value",
                            value: d.value,
                            onChange: (R) => wi("header_rows", S, "value", R.target.value),
                            sx: { flex: 1 }
                          }
                        ),
                        /* @__PURE__ */ a(
                          be,
                          {
                            variant: "outlined",
                            onClick: () => rc("header_rows", S),
                            sx: { alignSelf: { sm: "center" } },
                            children: "Remove"
                          }
                        )
                      ] }, `header-${S}`)) }),
                      /* @__PURE__ */ a(
                        be,
                        {
                          variant: "outlined",
                          size: "small",
                          sx: { mt: 1 },
                          onClick: () => nc("header_rows"),
                          children: "Add header"
                        }
                      )
                    ] }) : null
                  ] }) : Z.upstream_type === "rest_openapi" ? /* @__PURE__ */ C(ce, { spacing: 2, children: [
                    /* @__PURE__ */ a(
                      De,
                      {
                        label: "Base URL",
                        fullWidth: !0,
                        size: "small",
                        placeholder: "https://api.example.com",
                        value: Z.base_url,
                        onChange: (d) => dt("base_url", d.target.value)
                      }
                    ),
                    /* @__PURE__ */ C(Yt, { fullWidth: !0, size: "small", children: [
                      /* @__PURE__ */ a(Xt, { id: "reg-spec-source", children: "OpenAPI spec source" }),
                      /* @__PURE__ */ C(
                        Ut,
                        {
                          labelId: "reg-spec-source",
                          label: "OpenAPI spec source",
                          value: Z.spec_source,
                          onChange: (d) => dt(
                            "spec_source",
                            d.target.value
                          ),
                          children: [
                            /* @__PURE__ */ a(Ye, { value: "url", children: "URL" }),
                            /* @__PURE__ */ a(Ye, { value: "inline", children: "Inline YAML/JSON" })
                          ]
                        }
                      )
                    ] }),
                    Z.spec_source === "url" ? /* @__PURE__ */ a(
                      De,
                      {
                        label: "OpenAPI spec URL",
                        fullWidth: !0,
                        size: "small",
                        placeholder: "https://api.example.com/openapi.json",
                        value: Z.openapi_spec_url,
                        onChange: (d) => dt("openapi_spec_url", d.target.value)
                      }
                    ) : /* @__PURE__ */ a(
                      De,
                      {
                        label: "Inline OpenAPI spec",
                        fullWidth: !0,
                        size: "small",
                        multiline: !0,
                        minRows: 6,
                        placeholder: "openapi: 3.0.3...",
                        value: Z.openapi_spec_inline,
                        onChange: (d) => dt("openapi_spec_inline", d.target.value),
                        helperText: ic && Z.spec_source === "inline" ? "Leave blank to keep the current inline spec." : void 0
                      }
                    ),
                    /* @__PURE__ */ a(
                      De,
                      {
                        label: "Excluded operations",
                        fullWidth: !0,
                        size: "small",
                        multiline: !0,
                        minRows: 3,
                        placeholder: `deletePet
updateUser`,
                        value: Z.excluded_operations_text,
                        onChange: (d) => dt("excluded_operations_text", d.target.value),
                        helperText: "One OpenAPI operationId per line (optional)."
                      }
                    ),
                    sc()
                  ] }) : /* @__PURE__ */ C(ce, { spacing: 2, children: [
                    /* @__PURE__ */ a(
                      De,
                      {
                        label: "Base URL",
                        fullWidth: !0,
                        size: "small",
                        placeholder: "https://api.example.com",
                        value: Z.base_url,
                        onChange: (d) => dt("base_url", d.target.value)
                      }
                    ),
                    /* @__PURE__ */ C(ce, { direction: { xs: "column", md: "row" }, spacing: 2, children: [
                      /* @__PURE__ */ C(Yt, { fullWidth: !0, size: "small", children: [
                        /* @__PURE__ */ a(Xt, { id: "reg-rest-method", children: "HTTP method" }),
                        /* @__PURE__ */ C(
                          Ut,
                          {
                            labelId: "reg-rest-method",
                            label: "HTTP method",
                            value: Z.method,
                            onChange: (d) => dt("method", d.target.value),
                            children: [
                              /* @__PURE__ */ a(Ye, { value: "GET", children: "GET" }),
                              /* @__PURE__ */ a(Ye, { value: "POST", children: "POST" }),
                              /* @__PURE__ */ a(Ye, { value: "PUT", children: "PUT" }),
                              /* @__PURE__ */ a(Ye, { value: "PATCH", children: "PATCH" }),
                              /* @__PURE__ */ a(Ye, { value: "DELETE", children: "DELETE" })
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ a(
                        De,
                        {
                          label: "Path",
                          fullWidth: !0,
                          size: "small",
                          placeholder: "/v1/current",
                          value: Z.path,
                          onChange: (d) => dt("path", d.target.value)
                        }
                      )
                    ] }),
                    /* @__PURE__ */ a(
                      De,
                      {
                        label: "Tool name",
                        fullWidth: !0,
                        size: "small",
                        placeholder: "get_current",
                        value: Z.tool_name,
                        onChange: (d) => dt("tool_name", d.target.value)
                      }
                    ),
                    /* @__PURE__ */ a(
                      De,
                      {
                        label: "Tool description",
                        fullWidth: !0,
                        size: "small",
                        multiline: !0,
                        minRows: 2,
                        placeholder: "Use when the caller needs current weather for a city",
                        value: Z.tool_description,
                        onChange: (d) => dt("tool_description", d.target.value)
                      }
                    ),
                    /* @__PURE__ */ C(Ve, { children: [
                      /* @__PURE__ */ a(J, { variant: "subtitle2", gutterBottom: !0, children: "Parameters" }),
                      /* @__PURE__ */ a(ce, { spacing: 1, children: Z.parameter_rows.map((d, S) => /* @__PURE__ */ a(yt, { variant: "outlined", sx: { p: 1.5, borderRadius: 2 }, children: /* @__PURE__ */ C(ce, { spacing: 1, children: [
                        /* @__PURE__ */ C(ce, { direction: { xs: "column", sm: "row" }, spacing: 1, children: [
                          /* @__PURE__ */ a(
                            De,
                            {
                              size: "small",
                              label: "Name",
                              value: d.name,
                              onChange: (R) => wr(S, "name", R.target.value),
                              sx: { flex: 1 }
                            }
                          ),
                          /* @__PURE__ */ C(Yt, { size: "small", sx: { minWidth: 120 }, children: [
                            /* @__PURE__ */ a(Xt, { id: `param-in-${S}`, children: "In" }),
                            /* @__PURE__ */ C(
                              Ut,
                              {
                                labelId: `param-in-${S}`,
                                label: "In",
                                value: d.in,
                                onChange: (R) => wr(
                                  S,
                                  "in",
                                  R.target.value
                                ),
                                children: [
                                  /* @__PURE__ */ a(Ye, { value: "path", children: "path" }),
                                  /* @__PURE__ */ a(Ye, { value: "query", children: "query" }),
                                  /* @__PURE__ */ a(Ye, { value: "header", children: "header" })
                                ]
                              }
                            )
                          ] }),
                          /* @__PURE__ */ a(
                            De,
                            {
                              size: "small",
                              label: "Type",
                              value: d.type,
                              onChange: (R) => wr(S, "type", R.target.value),
                              sx: { width: 120 }
                            }
                          )
                        ] }),
                        /* @__PURE__ */ a(
                          De,
                          {
                            size: "small",
                            label: "Description",
                            value: d.description,
                            onChange: (R) => wr(S, "description", R.target.value),
                            fullWidth: !0
                          }
                        ),
                        /* @__PURE__ */ C(ce, { direction: "row", spacing: 1, sx: { alignItems: "center" }, children: [
                          /* @__PURE__ */ a(
                            pf,
                            {
                              checked: d.required,
                              onChange: (R) => wr(S, "required", R.target.checked)
                            }
                          ),
                          /* @__PURE__ */ a(J, { variant: "body2", children: "Required" }),
                          /* @__PURE__ */ a(Ve, { sx: { flex: 1 } }),
                          /* @__PURE__ */ a(be, { variant: "outlined", onClick: () => km(S), children: "Remove" })
                        ] })
                      ] }) }, `param-${S}`)) }),
                      /* @__PURE__ */ a(be, { variant: "outlined", size: "small", sx: { mt: 1 }, onClick: Nm, children: "Add parameter" })
                    ] }),
                    sc()
                  ] }),
                  Ee ? /* @__PURE__ */ a(J, { color: "error", variant: "body2", children: Ee }) : null
                ] }) }),
                /* @__PURE__ */ a(Fr, { sx: { px: 3, py: 2, flexWrap: "wrap", gap: 1 }, children: Re ? /* @__PURE__ */ C(Bt, { children: [
                  /* @__PURE__ */ a(
                    be,
                    {
                      variant: "outlined",
                      onClick: () => $m("Start registration again to retry OAuth."),
                      children: "Start over"
                    }
                  ),
                  /* @__PURE__ */ a(be, { variant: "contained", onClick: Gm, children: Re.hasOpenedBrowser ? "Open OAuth again" : "Continue OAuth" })
                ] }) : /* @__PURE__ */ C(Bt, { children: [
                  /* @__PURE__ */ a(be, { variant: "outlined", onClick: yn, children: "Cancel" }),
                  /* @__PURE__ */ a(
                    be,
                    {
                      variant: "contained",
                      disabled: Xe("register-server") || ke,
                      onClick: () => void Um(),
                      children: Xe("register-server") ? fe ? "Saving..." : "Registering..." : fe ? "Save changes" : "+ Add Server"
                    }
                  )
                ] }) })
              ] }),
              /* @__PURE__ */ C(Lr, { open: hn, onClose: _i, maxWidth: "sm", fullWidth: !0, scroll: "paper", children: [
                /* @__PURE__ */ a(Wr, { children: he !== null ? "Edit agent app" : "Create agent app" }),
                /* @__PURE__ */ a(jr, { dividers: !0, children: /* @__PURE__ */ C(ce, { spacing: 2, sx: { pt: 1 }, children: [
                  /* @__PURE__ */ a(
                    De,
                    {
                      label: "Name",
                      fullWidth: !0,
                      required: !0,
                      size: "small",
                      value: Wt,
                      onChange: (d) => To(d.target.value)
                    }
                  ),
                  /* @__PURE__ */ a(
                    De,
                    {
                      label: "Description",
                      fullWidth: !0,
                      size: "small",
                      multiline: !0,
                      minRows: 2,
                      value: ro,
                      onChange: (d) => ln(d.target.value)
                    }
                  ),
                  gn ? /* @__PURE__ */ a(Ja, { severity: "warning", children: "This app's saved configuration is invalid (must be exactly one tool group or one prompt group). Choose one valid group below and save." }) : null,
                  /* @__PURE__ */ C(
                    Yt,
                    {
                      fullWidth: !0,
                      size: "small",
                      disabled: Ci.length === 0 && co === "",
                      children: [
                        /* @__PURE__ */ a(Xt, { id: "agent-app-tool-groups-label", children: "Tool group" }),
                        /* @__PURE__ */ C(
                          Ut,
                          {
                            labelId: "agent-app-tool-groups-label",
                            id: "agent-app-tool-groups",
                            value: co,
                            label: "Tool group",
                            onChange: (d) => {
                              const S = d.target.value;
                              uo(S), S !== "" && Ht("");
                            },
                            MenuProps: { slotProps: { paper: { sx: { maxHeight: 360 } } } },
                            children: [
                              /* @__PURE__ */ a(Ye, { value: "", children: /* @__PURE__ */ a("em", { children: "— None —" }) }),
                              Em.map((d) => /* @__PURE__ */ a(Ye, { value: d, children: d }, d))
                            ]
                          }
                        ),
                        /* @__PURE__ */ a(Gr, { children: Ci.length === 0 ? "No tool groups yet. Create one in the Tool groups section." : "Pick exactly one tool group or one prompt group (not both). Choosing a tool group clears the prompt group." })
                      ]
                    }
                  ),
                  /* @__PURE__ */ C(
                    Yt,
                    {
                      fullWidth: !0,
                      size: "small",
                      disabled: Si.length === 0 && wo === "",
                      children: [
                        /* @__PURE__ */ a(Xt, { id: "agent-app-prompt-groups-label", children: "Prompt group" }),
                        /* @__PURE__ */ C(
                          Ut,
                          {
                            labelId: "agent-app-prompt-groups-label",
                            id: "agent-app-prompt-groups",
                            value: wo,
                            label: "Prompt group",
                            onChange: (d) => {
                              const S = d.target.value;
                              Ht(S), S !== "" && uo("");
                            },
                            MenuProps: { slotProps: { paper: { sx: { maxHeight: 360 } } } },
                            children: [
                              /* @__PURE__ */ a(Ye, { value: "", children: /* @__PURE__ */ a("em", { children: "— None —" }) }),
                              Om.map((d) => /* @__PURE__ */ a(Ye, { value: d, children: d }, d))
                            ]
                          }
                        ),
                        /* @__PURE__ */ a(Gr, { children: Si.length === 0 ? "No prompt groups yet. Create one in the Prompt groups section." : "Choosing a prompt group clears the tool group." })
                      ]
                    }
                  ),
                  Mn ? /* @__PURE__ */ a(J, { color: "error", variant: "body2", children: Mn }) : null
                ] }) }),
                /* @__PURE__ */ C(Fr, { sx: { px: 3, py: 2 }, children: [
                  /* @__PURE__ */ a(be, { variant: "outlined", onClick: _i, children: "Cancel" }),
                  /* @__PURE__ */ a(
                    be,
                    {
                      variant: "contained",
                      disabled: Xe(he !== null ? `agent-app-edit:${he}` : "agent-app-create"),
                      onClick: () => void oh(),
                      children: he !== null ? Xe(`agent-app-edit:${he}`) ? "Saving..." : "Save changes" : Xe("agent-app-create") ? "Creating..." : "Create"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ C(
                Lr,
                {
                  open: ae !== null,
                  onClose: () => Se(null),
                  maxWidth: "sm",
                  fullWidth: !0,
                  children: [
                    /* @__PURE__ */ a(Wr, { children: "Client secret" }),
                    /* @__PURE__ */ a(jr, { dividers: !0, children: /* @__PURE__ */ C(ce, { spacing: 2, children: [
                      /* @__PURE__ */ a(J, { variant: "body2", children: ae == null ? void 0 : ae.title }),
                      /* @__PURE__ */ a(yt, { variant: "outlined", sx: { p: 1.5, borderRadius: 2 }, children: /* @__PURE__ */ C(ce, { direction: "row", spacing: 1, sx: { alignItems: "center" }, children: [
                        /* @__PURE__ */ a(
                          J,
                          {
                            component: "code",
                            sx: { flex: 1, wordBreak: "break-all", fontFamily: En },
                            children: ae == null ? void 0 : ae.secret
                          }
                        ),
                        /* @__PURE__ */ a(
                          bt,
                          {
                            ariaLabel: "Copy client secret",
                            title: "Copy client secret",
                            value: (ae == null ? void 0 : ae.secret) ?? ""
                          }
                        )
                      ] }) }),
                      /* @__PURE__ */ a(J, { variant: "caption", color: "text.secondary", children: "Store this secret securely. It will not be shown again after you close this dialog." })
                    ] }) }),
                    /* @__PURE__ */ a(Fr, { sx: { px: 3, py: 2 }, children: /* @__PURE__ */ a(be, { variant: "contained", onClick: () => Se(null), children: "Done" }) })
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function Aw(e) {
  const t = e.trim();
  return t === "" ? "" : t.replace(/\/$/, "");
}
function Dw(e) {
  return e === "home" ? "servers" : e;
}
function Bw({
  children: e,
  mode: t,
  token: n,
  tenantId: r,
  httpPathPrefix: i,
  defaultSection: s = "servers"
}) {
  return mu({
    mode: t,
    token: (n == null ? void 0 : n.trim()) || void 0,
    tenantId: (r == null ? void 0 : r.trim()) || void 0,
    httpPathPrefix: Aw(i ?? ""),
    defaultSection: t === "standalone" ? "home" : t === "component" ? Dw(s) : s
  }), Qo(() => () => mu(null), []), e;
}
function zw({
  token: e,
  tenantId: t,
  httpPathPrefix: n,
  defaultSection: r = "servers",
  className: i,
  style: s
}) {
  return /* @__PURE__ */ a(
    Ve,
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
      children: /* @__PURE__ */ a(
        Bw,
        {
          mode: "component",
          token: e,
          tenantId: t,
          httpPathPrefix: n,
          defaultSection: r,
          children: /* @__PURE__ */ C(dv, { theme: pS, children: [
            /* @__PURE__ */ a(jp, {}),
            /* @__PURE__ */ a(Mw, {})
          ] })
        }
      )
    }
  );
}
export {
  zw as MCPGatewayDashboard
};
