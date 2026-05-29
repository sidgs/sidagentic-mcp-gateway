var Tm = Object.defineProperty;
var Em = (e, t, o) => t in e ? Tm(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[t] = o;
var $o = (e, t, o) => Em(e, typeof t != "symbol" ? t + "" : t, o);
import { jsx as l, jsxs as T, Fragment as qt } from "react/jsx-runtime";
import * as b from "react";
import Jn, { forwardRef as Om, useContext as Rm, isValidElement as Wi, cloneElement as zi, Children as Nm, useState as Ne, useCallback as km, useEffect as $r, useMemo as At } from "react";
import * as Pm from "react-dom";
import xi from "react-dom";
function eo(e, ...t) {
  const o = new URL(`https://mui.com/production-error/?code=${e}`);
  return t.forEach((r) => o.searchParams.append("args[]", r)), `Minified MUI error #${e}; visit ${o} for the full message.`;
}
function Yi() {
  return Yi = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var o = arguments[t];
      for (var r in o) ({}).hasOwnProperty.call(o, r) && (e[r] = o[r]);
    }
    return e;
  }, Yi.apply(null, arguments);
}
function Im(e) {
  if (e.sheet)
    return e.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === e)
      return document.styleSheets[t];
}
function $m(e) {
  var t = document.createElement("style");
  return t.setAttribute("data-emotion", e.key), e.nonce !== void 0 && t.setAttribute("nonce", e.nonce), t.appendChild(document.createTextNode("")), t.setAttribute("data-s", ""), t;
}
var Mm = /* @__PURE__ */ function() {
  function e(o) {
    var r = this;
    this._insertTag = function(i) {
      var s;
      r.tags.length === 0 ? r.insertionPoint ? s = r.insertionPoint.nextSibling : r.prepend ? s = r.container.firstChild : s = r.before : s = r.tags[r.tags.length - 1].nextSibling, r.container.insertBefore(i, s), r.tags.push(i);
    }, this.isSpeedy = o.speedy === void 0 ? !0 : o.speedy, this.tags = [], this.ctr = 0, this.nonce = o.nonce, this.key = o.key, this.container = o.container, this.prepend = o.prepend, this.insertionPoint = o.insertionPoint, this.before = null;
  }
  var t = e.prototype;
  return t.hydrate = function(r) {
    r.forEach(this._insertTag);
  }, t.insert = function(r) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag($m(this));
    var i = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var s = Im(i);
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
}(), Ft = "-ms-", Xi = "-moz-", Ke = "-webkit-", hu = "comm", Xa = "rule", Ja = "decl", Am = "@import", gu = "@keyframes", _m = "@layer", Dm = Math.abs, gs = String.fromCharCode, Lm = Object.assign;
function Bm(e, t) {
  return _t(e, 0) ^ 45 ? (((t << 2 ^ _t(e, 0)) << 2 ^ _t(e, 1)) << 2 ^ _t(e, 2)) << 2 ^ _t(e, 3) : 0;
}
function bu(e) {
  return e.trim();
}
function Fm(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function Ye(e, t, o) {
  return e.replace(t, o);
}
function xa(e, t) {
  return e.indexOf(t);
}
function _t(e, t) {
  return e.charCodeAt(t) | 0;
}
function Vr(e, t, o) {
  return e.slice(t, o);
}
function Dn(e) {
  return e.length;
}
function Qa(e) {
  return e.length;
}
function Si(e, t) {
  return t.push(e), e;
}
function jm(e, t) {
  return e.map(t).join("");
}
var bs = 1, er = 1, yu = 0, Jt = 0, Ot = 0, pr = "";
function ys(e, t, o, r, i, s, a) {
  return { value: e, root: t, parent: o, type: r, props: i, children: s, line: bs, column: er, length: a, return: "" };
}
function Cr(e, t) {
  return Lm(ys("", null, null, "", null, null, 0), e, { length: -e.length }, t);
}
function Wm() {
  return Ot;
}
function zm() {
  return Ot = Jt > 0 ? _t(pr, --Jt) : 0, er--, Ot === 10 && (er = 1, bs--), Ot;
}
function on() {
  return Ot = Jt < yu ? _t(pr, Jt++) : 0, er++, Ot === 10 && (er = 1, bs++), Ot;
}
function Fn() {
  return _t(pr, Jt);
}
function Vi() {
  return Jt;
}
function ni(e, t) {
  return Vr(pr, e, t);
}
function Ur(e) {
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
function vu(e) {
  return bs = er = 1, yu = Dn(pr = e), Jt = 0, [];
}
function xu(e) {
  return pr = "", e;
}
function Ui(e) {
  return bu(ni(Jt - 1, Sa(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function Vm(e) {
  for (; (Ot = Fn()) && Ot < 33; )
    on();
  return Ur(e) > 2 || Ur(Ot) > 3 ? "" : " ";
}
function Um(e, t) {
  for (; --t && on() && !(Ot < 48 || Ot > 102 || Ot > 57 && Ot < 65 || Ot > 70 && Ot < 97); )
    ;
  return ni(e, Vi() + (t < 6 && Fn() == 32 && on() == 32));
}
function Sa(e) {
  for (; on(); )
    switch (Ot) {
      case e:
        return Jt;
      case 34:
      case 39:
        e !== 34 && e !== 39 && Sa(Ot);
        break;
      case 40:
        e === 41 && Sa(e);
        break;
      case 92:
        on();
        break;
    }
  return Jt;
}
function Hm(e, t) {
  for (; on() && e + Ot !== 57; )
    if (e + Ot === 84 && Fn() === 47)
      break;
  return "/*" + ni(t, Jt - 1) + "*" + gs(e === 47 ? e : on());
}
function Gm(e) {
  for (; !Ur(Fn()); )
    on();
  return ni(e, Jt);
}
function qm(e) {
  return xu(Hi("", null, null, null, [""], e = vu(e), 0, [0], e));
}
function Hi(e, t, o, r, i, s, a, c, d) {
  for (var p = 0, m = 0, y = a, x = 0, f = 0, v = 0, h = 1, w = 1, O = 1, k = 0, E = "", C = i, S = s, N = r, A = E; w; )
    switch (v = k, k = on()) {
      case 40:
        if (v != 108 && _t(A, y - 1) == 58) {
          xa(A += Ye(Ui(k), "&", "&\f"), "&\f") != -1 && (O = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        A += Ui(k);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        A += Vm(v);
        break;
      case 92:
        A += Um(Vi() - 1, 7);
        continue;
      case 47:
        switch (Fn()) {
          case 42:
          case 47:
            Si(Km(Hm(on(), Vi()), t, o), d);
            break;
          default:
            A += "/";
        }
        break;
      case 123 * h:
        c[p++] = Dn(A) * O;
      case 125 * h:
      case 59:
      case 0:
        switch (k) {
          case 0:
          case 125:
            w = 0;
          case 59 + m:
            O == -1 && (A = Ye(A, /\f/g, "")), f > 0 && Dn(A) - y && Si(f > 32 ? hc(A + ";", r, o, y - 1) : hc(Ye(A, " ", "") + ";", r, o, y - 2), d);
            break;
          case 59:
            A += ";";
          default:
            if (Si(N = mc(A, t, o, p, m, i, c, E, C = [], S = [], y), s), k === 123)
              if (m === 0)
                Hi(A, t, N, N, C, s, y, c, S);
              else
                switch (x === 99 && _t(A, 3) === 110 ? 100 : x) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    Hi(e, N, N, r && Si(mc(e, N, N, 0, 0, i, c, E, i, C = [], y), S), i, S, y, c, r ? C : S);
                    break;
                  default:
                    Hi(A, N, N, N, [""], S, 0, c, S);
                }
        }
        p = m = f = 0, h = O = 1, E = A = "", y = a;
        break;
      case 58:
        y = 1 + Dn(A), f = v;
      default:
        if (h < 1) {
          if (k == 123)
            --h;
          else if (k == 125 && h++ == 0 && zm() == 125)
            continue;
        }
        switch (A += gs(k), k * h) {
          case 38:
            O = m > 0 ? 1 : (A += "\f", -1);
            break;
          case 44:
            c[p++] = (Dn(A) - 1) * O, O = 1;
            break;
          case 64:
            Fn() === 45 && (A += Ui(on())), x = Fn(), m = y = Dn(E = A += Gm(Vi())), k++;
            break;
          case 45:
            v === 45 && Dn(A) == 2 && (h = 0);
        }
    }
  return s;
}
function mc(e, t, o, r, i, s, a, c, d, p, m) {
  for (var y = i - 1, x = i === 0 ? s : [""], f = Qa(x), v = 0, h = 0, w = 0; v < r; ++v)
    for (var O = 0, k = Vr(e, y + 1, y = Dm(h = a[v])), E = e; O < f; ++O)
      (E = bu(h > 0 ? x[O] + " " + k : Ye(k, /&\f/g, x[O]))) && (d[w++] = E);
  return ys(e, t, o, i === 0 ? Xa : c, d, p, m);
}
function Km(e, t, o) {
  return ys(e, t, o, hu, gs(Wm()), Vr(e, 2, -2), 0);
}
function hc(e, t, o, r) {
  return ys(e, t, o, Ja, Vr(e, 0, r), Vr(e, r + 1, -1), r);
}
function Yo(e, t) {
  for (var o = "", r = Qa(e), i = 0; i < r; i++)
    o += t(e[i], i, e, t) || "";
  return o;
}
function Ym(e, t, o, r) {
  switch (e.type) {
    case _m:
      if (e.children.length) break;
    case Am:
    case Ja:
      return e.return = e.return || e.value;
    case hu:
      return "";
    case gu:
      return e.return = e.value + "{" + Yo(e.children, r) + "}";
    case Xa:
      e.value = e.props.join(",");
  }
  return Dn(o = Yo(e.children, r)) ? e.return = e.value + "{" + o + "}" : "";
}
function Xm(e) {
  var t = Qa(e);
  return function(o, r, i, s) {
    for (var a = "", c = 0; c < t; c++)
      a += e[c](o, r, i, s) || "";
    return a;
  };
}
function Jm(e) {
  return function(t) {
    t.root || (t = t.return) && e(t);
  };
}
function Su(e) {
  var t = /* @__PURE__ */ Object.create(null);
  return function(o) {
    return t[o] === void 0 && (t[o] = e(o)), t[o];
  };
}
var Qm = function(t, o, r) {
  for (var i = 0, s = 0; i = s, s = Fn(), i === 38 && s === 12 && (o[r] = 1), !Ur(s); )
    on();
  return ni(t, Jt);
}, Zm = function(t, o) {
  var r = -1, i = 44;
  do
    switch (Ur(i)) {
      case 0:
        i === 38 && Fn() === 12 && (o[r] = 1), t[r] += Qm(Jt - 1, o, r);
        break;
      case 2:
        t[r] += Ui(i);
        break;
      case 4:
        if (i === 44) {
          t[++r] = Fn() === 58 ? "&\f" : "", o[r] = t[r].length;
          break;
        }
      default:
        t[r] += gs(i);
    }
  while (i = on());
  return t;
}, eh = function(t, o) {
  return xu(Zm(vu(t), o));
}, gc = /* @__PURE__ */ new WeakMap(), th = function(t) {
  if (!(t.type !== "rule" || !t.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  t.length < 1)) {
    for (var o = t.value, r = t.parent, i = t.column === r.column && t.line === r.line; r.type !== "rule"; )
      if (r = r.parent, !r) return;
    if (!(t.props.length === 1 && o.charCodeAt(0) !== 58 && !gc.get(r)) && !i) {
      gc.set(t, !0);
      for (var s = [], a = eh(o, s), c = r.props, d = 0, p = 0; d < a.length; d++)
        for (var m = 0; m < c.length; m++, p++)
          t.props[p] = s[d] ? a[d].replace(/&\f/g, c[m]) : c[m] + " " + a[d];
    }
  }
}, nh = function(t) {
  if (t.type === "decl") {
    var o = t.value;
    // charcode for l
    o.charCodeAt(0) === 108 && // charcode for b
    o.charCodeAt(2) === 98 && (t.return = "", t.value = "");
  }
};
function Cu(e, t) {
  switch (Bm(e, t)) {
    case 5103:
      return Ke + "print-" + e + e;
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
      return Ke + e + e;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return Ke + e + Xi + e + Ft + e + e;
    case 6828:
    case 4268:
      return Ke + e + Ft + e + e;
    case 6165:
      return Ke + e + Ft + "flex-" + e + e;
    case 5187:
      return Ke + e + Ye(e, /(\w+).+(:[^]+)/, Ke + "box-$1$2" + Ft + "flex-$1$2") + e;
    case 5443:
      return Ke + e + Ft + "flex-item-" + Ye(e, /flex-|-self/, "") + e;
    case 4675:
      return Ke + e + Ft + "flex-line-pack" + Ye(e, /align-content|flex-|-self/, "") + e;
    case 5548:
      return Ke + e + Ft + Ye(e, "shrink", "negative") + e;
    case 5292:
      return Ke + e + Ft + Ye(e, "basis", "preferred-size") + e;
    case 6060:
      return Ke + "box-" + Ye(e, "-grow", "") + Ke + e + Ft + Ye(e, "grow", "positive") + e;
    case 4554:
      return Ke + Ye(e, /([^-])(transform)/g, "$1" + Ke + "$2") + e;
    case 6187:
      return Ye(Ye(Ye(e, /(zoom-|grab)/, Ke + "$1"), /(image-set)/, Ke + "$1"), e, "") + e;
    case 5495:
    case 3959:
      return Ye(e, /(image-set\([^]*)/, Ke + "$1$`$1");
    case 4968:
      return Ye(Ye(e, /(.+:)(flex-)?(.*)/, Ke + "box-pack:$3" + Ft + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + Ke + e + e;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return Ye(e, /(.+)-inline(.+)/, Ke + "$1$2") + e;
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
      if (Dn(e) - 1 - t > 6) switch (_t(e, t + 1)) {
        case 109:
          if (_t(e, t + 4) !== 45) break;
        case 102:
          return Ye(e, /(.+:)(.+)-([^]+)/, "$1" + Ke + "$2-$3$1" + Xi + (_t(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
        case 115:
          return ~xa(e, "stretch") ? Cu(Ye(e, "stretch", "fill-available"), t) + e : e;
      }
      break;
    case 4949:
      if (_t(e, t + 1) !== 115) break;
    case 6444:
      switch (_t(e, Dn(e) - 3 - (~xa(e, "!important") && 10))) {
        case 107:
          return Ye(e, ":", ":" + Ke) + e;
        case 101:
          return Ye(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + Ke + (_t(e, 14) === 45 ? "inline-" : "") + "box$3$1" + Ke + "$2$3$1" + Ft + "$2box$3") + e;
      }
      break;
    case 5936:
      switch (_t(e, t + 11)) {
        case 114:
          return Ke + e + Ft + Ye(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
        case 108:
          return Ke + e + Ft + Ye(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
        case 45:
          return Ke + e + Ft + Ye(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
      }
      return Ke + e + Ft + e + e;
  }
  return e;
}
var oh = function(t, o, r, i) {
  if (t.length > -1 && !t.return) switch (t.type) {
    case Ja:
      t.return = Cu(t.value, t.length);
      break;
    case gu:
      return Yo([Cr(t, {
        value: Ye(t.value, "@", "@" + Ke)
      })], i);
    case Xa:
      if (t.length) return jm(t.props, function(s) {
        switch (Fm(s, /(::plac\w+|:read-\w+)/)) {
          case ":read-only":
          case ":read-write":
            return Yo([Cr(t, {
              props: [Ye(s, /:(read-\w+)/, ":" + Xi + "$1")]
            })], i);
          case "::placeholder":
            return Yo([Cr(t, {
              props: [Ye(s, /:(plac\w+)/, ":" + Ke + "input-$1")]
            }), Cr(t, {
              props: [Ye(s, /:(plac\w+)/, ":" + Xi + "$1")]
            }), Cr(t, {
              props: [Ye(s, /:(plac\w+)/, Ft + "input-$1")]
            })], i);
        }
        return "";
      });
  }
}, rh = [oh], ih = function(t) {
  var o = t.key;
  if (o === "css") {
    var r = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(r, function(h) {
      var w = h.getAttribute("data-emotion");
      w.indexOf(" ") !== -1 && (document.head.appendChild(h), h.setAttribute("data-s", ""));
    });
  }
  var i = t.stylisPlugins || rh, s = {}, a, c = [];
  a = t.container || document.head, Array.prototype.forEach.call(
    // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll('style[data-emotion^="' + o + ' "]'),
    function(h) {
      for (var w = h.getAttribute("data-emotion").split(" "), O = 1; O < w.length; O++)
        s[w[O]] = !0;
      c.push(h);
    }
  );
  var d, p = [th, nh];
  {
    var m, y = [Ym, Jm(function(h) {
      m.insert(h);
    })], x = Xm(p.concat(i, y)), f = function(w) {
      return Yo(qm(w), x);
    };
    d = function(w, O, k, E) {
      m = k, f(w ? w + "{" + O.styles + "}" : O.styles), E && (v.inserted[O.name] = !0);
    };
  }
  var v = {
    key: o,
    sheet: new Mm({
      key: o,
      container: a,
      nonce: t.nonce,
      speedy: t.speedy,
      prepend: t.prepend,
      insertionPoint: t.insertionPoint
    }),
    nonce: t.nonce,
    inserted: s,
    registered: {},
    insert: d
  };
  return v.sheet.hydrate(c), v;
};
function sh(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ca = { exports: {} }, Xe = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bc;
function ah() {
  if (bc) return Xe;
  bc = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, o = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, i = e ? Symbol.for("react.strict_mode") : 60108, s = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, c = e ? Symbol.for("react.context") : 60110, d = e ? Symbol.for("react.async_mode") : 60111, p = e ? Symbol.for("react.concurrent_mode") : 60111, m = e ? Symbol.for("react.forward_ref") : 60112, y = e ? Symbol.for("react.suspense") : 60113, x = e ? Symbol.for("react.suspense_list") : 60120, f = e ? Symbol.for("react.memo") : 60115, v = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, w = e ? Symbol.for("react.fundamental") : 60117, O = e ? Symbol.for("react.responder") : 60118, k = e ? Symbol.for("react.scope") : 60119;
  function E(S) {
    if (typeof S == "object" && S !== null) {
      var N = S.$$typeof;
      switch (N) {
        case t:
          switch (S = S.type, S) {
            case d:
            case p:
            case r:
            case s:
            case i:
            case y:
              return S;
            default:
              switch (S = S && S.$$typeof, S) {
                case c:
                case m:
                case v:
                case f:
                case a:
                  return S;
                default:
                  return N;
              }
          }
        case o:
          return N;
      }
    }
  }
  function C(S) {
    return E(S) === p;
  }
  return Xe.AsyncMode = d, Xe.ConcurrentMode = p, Xe.ContextConsumer = c, Xe.ContextProvider = a, Xe.Element = t, Xe.ForwardRef = m, Xe.Fragment = r, Xe.Lazy = v, Xe.Memo = f, Xe.Portal = o, Xe.Profiler = s, Xe.StrictMode = i, Xe.Suspense = y, Xe.isAsyncMode = function(S) {
    return C(S) || E(S) === d;
  }, Xe.isConcurrentMode = C, Xe.isContextConsumer = function(S) {
    return E(S) === c;
  }, Xe.isContextProvider = function(S) {
    return E(S) === a;
  }, Xe.isElement = function(S) {
    return typeof S == "object" && S !== null && S.$$typeof === t;
  }, Xe.isForwardRef = function(S) {
    return E(S) === m;
  }, Xe.isFragment = function(S) {
    return E(S) === r;
  }, Xe.isLazy = function(S) {
    return E(S) === v;
  }, Xe.isMemo = function(S) {
    return E(S) === f;
  }, Xe.isPortal = function(S) {
    return E(S) === o;
  }, Xe.isProfiler = function(S) {
    return E(S) === s;
  }, Xe.isStrictMode = function(S) {
    return E(S) === i;
  }, Xe.isSuspense = function(S) {
    return E(S) === y;
  }, Xe.isValidElementType = function(S) {
    return typeof S == "string" || typeof S == "function" || S === r || S === p || S === s || S === i || S === y || S === x || typeof S == "object" && S !== null && (S.$$typeof === v || S.$$typeof === f || S.$$typeof === a || S.$$typeof === c || S.$$typeof === m || S.$$typeof === w || S.$$typeof === O || S.$$typeof === k || S.$$typeof === h);
  }, Xe.typeOf = E, Xe;
}
var Je = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var yc;
function lh() {
  return yc || (yc = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, o = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, i = e ? Symbol.for("react.strict_mode") : 60108, s = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, c = e ? Symbol.for("react.context") : 60110, d = e ? Symbol.for("react.async_mode") : 60111, p = e ? Symbol.for("react.concurrent_mode") : 60111, m = e ? Symbol.for("react.forward_ref") : 60112, y = e ? Symbol.for("react.suspense") : 60113, x = e ? Symbol.for("react.suspense_list") : 60120, f = e ? Symbol.for("react.memo") : 60115, v = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, w = e ? Symbol.for("react.fundamental") : 60117, O = e ? Symbol.for("react.responder") : 60118, k = e ? Symbol.for("react.scope") : 60119;
    function E(j) {
      return typeof j == "string" || typeof j == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      j === r || j === p || j === s || j === i || j === y || j === x || typeof j == "object" && j !== null && (j.$$typeof === v || j.$$typeof === f || j.$$typeof === a || j.$$typeof === c || j.$$typeof === m || j.$$typeof === w || j.$$typeof === O || j.$$typeof === k || j.$$typeof === h);
    }
    function C(j) {
      if (typeof j == "object" && j !== null) {
        var me = j.$$typeof;
        switch (me) {
          case t:
            var Q = j.type;
            switch (Q) {
              case d:
              case p:
              case r:
              case s:
              case i:
              case y:
                return Q;
              default:
                var fe = Q && Q.$$typeof;
                switch (fe) {
                  case c:
                  case m:
                  case v:
                  case f:
                  case a:
                    return fe;
                  default:
                    return me;
                }
            }
          case o:
            return me;
        }
      }
    }
    var S = d, N = p, A = c, _ = a, D = t, F = m, P = r, g = v, $ = f, I = o, M = s, B = i, W = y, G = !1;
    function oe(j) {
      return G || (G = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), z(j) || C(j) === d;
    }
    function z(j) {
      return C(j) === p;
    }
    function V(j) {
      return C(j) === c;
    }
    function Y(j) {
      return C(j) === a;
    }
    function ne(j) {
      return typeof j == "object" && j !== null && j.$$typeof === t;
    }
    function te(j) {
      return C(j) === m;
    }
    function re(j) {
      return C(j) === r;
    }
    function ee(j) {
      return C(j) === v;
    }
    function K(j) {
      return C(j) === f;
    }
    function U(j) {
      return C(j) === o;
    }
    function X(j) {
      return C(j) === s;
    }
    function Z(j) {
      return C(j) === i;
    }
    function ae(j) {
      return C(j) === y;
    }
    Je.AsyncMode = S, Je.ConcurrentMode = N, Je.ContextConsumer = A, Je.ContextProvider = _, Je.Element = D, Je.ForwardRef = F, Je.Fragment = P, Je.Lazy = g, Je.Memo = $, Je.Portal = I, Je.Profiler = M, Je.StrictMode = B, Je.Suspense = W, Je.isAsyncMode = oe, Je.isConcurrentMode = z, Je.isContextConsumer = V, Je.isContextProvider = Y, Je.isElement = ne, Je.isForwardRef = te, Je.isFragment = re, Je.isLazy = ee, Je.isMemo = K, Je.isPortal = U, Je.isProfiler = X, Je.isStrictMode = Z, Je.isSuspense = ae, Je.isValidElementType = E, Je.typeOf = C;
  }()), Je;
}
process.env.NODE_ENV === "production" ? Ca.exports = ah() : Ca.exports = lh();
var ch = Ca.exports, wu = ch, dh = {
  $$typeof: !0,
  render: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0
}, uh = {
  $$typeof: !0,
  compare: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0,
  type: !0
}, Tu = {};
Tu[wu.ForwardRef] = dh;
Tu[wu.Memo] = uh;
var ph = !0;
function Eu(e, t, o) {
  var r = "";
  return o.split(" ").forEach(function(i) {
    e[i] !== void 0 ? t.push(e[i] + ";") : i && (r += i + " ");
  }), r;
}
var Za = function(t, o, r) {
  var i = t.key + "-" + o.name;
  // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (r === !1 || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  ph === !1) && t.registered[i] === void 0 && (t.registered[i] = o.styles);
}, el = function(t, o, r) {
  Za(t, o, r);
  var i = t.key + "-" + o.name;
  if (t.inserted[o.name] === void 0) {
    var s = o;
    do
      t.insert(o === s ? "." + i : "", s, t.sheet, !0), s = s.next;
    while (s !== void 0);
  }
};
function fh(e) {
  for (var t = 0, o, r = 0, i = e.length; i >= 4; ++r, i -= 4)
    o = e.charCodeAt(r) & 255 | (e.charCodeAt(++r) & 255) << 8 | (e.charCodeAt(++r) & 255) << 16 | (e.charCodeAt(++r) & 255) << 24, o = /* Math.imul(k, m): */
    (o & 65535) * 1540483477 + ((o >>> 16) * 59797 << 16), o ^= /* k >>> r: */
    o >>> 24, t = /* Math.imul(k, m): */
    (o & 65535) * 1540483477 + ((o >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
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
var mh = {
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
}, hh = /[A-Z]|^ms/g, gh = /_EMO_([^_]+?)_([^]*?)_EMO_/g, Ou = function(t) {
  return t.charCodeAt(1) === 45;
}, vc = function(t) {
  return t != null && typeof t != "boolean";
}, Zs = /* @__PURE__ */ Su(function(e) {
  return Ou(e) ? e : e.replace(hh, "-$&").toLowerCase();
}), xc = function(t, o) {
  switch (t) {
    case "animation":
    case "animationName":
      if (typeof o == "string")
        return o.replace(gh, function(r, i, s) {
          return Ln = {
            name: i,
            styles: s,
            next: Ln
          }, i;
        });
  }
  return mh[t] !== 1 && !Ou(t) && typeof o == "number" && o !== 0 ? o + "px" : o;
};
function Hr(e, t, o) {
  if (o == null)
    return "";
  var r = o;
  if (r.__emotion_styles !== void 0)
    return r;
  switch (typeof o) {
    case "boolean":
      return "";
    case "object": {
      var i = o;
      if (i.anim === 1)
        return Ln = {
          name: i.name,
          styles: i.styles,
          next: Ln
        }, i.name;
      var s = o;
      if (s.styles !== void 0) {
        var a = s.next;
        if (a !== void 0)
          for (; a !== void 0; )
            Ln = {
              name: a.name,
              styles: a.styles,
              next: Ln
            }, a = a.next;
        var c = s.styles + ";";
        return c;
      }
      return bh(e, t, o);
    }
    case "function": {
      if (e !== void 0) {
        var d = Ln, p = o(e);
        return Ln = d, Hr(e, t, p);
      }
      break;
    }
  }
  var m = o;
  if (t == null)
    return m;
  var y = t[m];
  return y !== void 0 ? y : m;
}
function bh(e, t, o) {
  var r = "";
  if (Array.isArray(o))
    for (var i = 0; i < o.length; i++)
      r += Hr(e, t, o[i]) + ";";
  else
    for (var s in o) {
      var a = o[s];
      if (typeof a != "object") {
        var c = a;
        t != null && t[c] !== void 0 ? r += s + "{" + t[c] + "}" : vc(c) && (r += Zs(s) + ":" + xc(s, c) + ";");
      } else if (Array.isArray(a) && typeof a[0] == "string" && (t == null || t[a[0]] === void 0))
        for (var d = 0; d < a.length; d++)
          vc(a[d]) && (r += Zs(s) + ":" + xc(s, a[d]) + ";");
      else {
        var p = Hr(e, t, a);
        switch (s) {
          case "animation":
          case "animationName": {
            r += Zs(s) + ":" + p + ";";
            break;
          }
          default:
            r += s + "{" + p + "}";
        }
      }
    }
  return r;
}
var Sc = /label:\s*([^\s;{]+)\s*(;|$)/g, Ln;
function oi(e, t, o) {
  if (e.length === 1 && typeof e[0] == "object" && e[0] !== null && e[0].styles !== void 0)
    return e[0];
  var r = !0, i = "";
  Ln = void 0;
  var s = e[0];
  if (s == null || s.raw === void 0)
    r = !1, i += Hr(o, t, s);
  else {
    var a = s;
    i += a[0];
  }
  for (var c = 1; c < e.length; c++)
    if (i += Hr(o, t, e[c]), r) {
      var d = s;
      i += d[c];
    }
  Sc.lastIndex = 0;
  for (var p = "", m; (m = Sc.exec(i)) !== null; )
    p += "-" + m[1];
  var y = fh(i) + p;
  return {
    name: y,
    styles: i,
    next: Ln
  };
}
var yh = function(t) {
  return t();
}, Ru = b.useInsertionEffect ? b.useInsertionEffect : !1, Nu = Ru || yh, Cc = Ru || b.useLayoutEffect, ku = /* @__PURE__ */ b.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement < "u" ? /* @__PURE__ */ ih({
    key: "css"
  }) : null
);
ku.Provider;
var tl = function(t) {
  return /* @__PURE__ */ Om(function(o, r) {
    var i = Rm(ku);
    return t(o, i, r);
  });
}, ri = /* @__PURE__ */ b.createContext({}), nl = {}.hasOwnProperty, wa = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", vh = function(t, o) {
  var r = {};
  for (var i in o)
    nl.call(o, i) && (r[i] = o[i]);
  return r[wa] = t, r;
}, xh = function(t) {
  var o = t.cache, r = t.serialized, i = t.isStringTag;
  return Za(o, r, i), Nu(function() {
    return el(o, r, i);
  }), null;
}, Sh = /* @__PURE__ */ tl(function(e, t, o) {
  var r = e.css;
  typeof r == "string" && t.registered[r] !== void 0 && (r = t.registered[r]);
  var i = e[wa], s = [r], a = "";
  typeof e.className == "string" ? a = Eu(t.registered, s, e.className) : e.className != null && (a = e.className + " ");
  var c = oi(s, void 0, b.useContext(ri));
  a += t.key + "-" + c.name;
  var d = {};
  for (var p in e)
    nl.call(e, p) && p !== "css" && p !== wa && (d[p] = e[p]);
  return d.className = a, o && (d.ref = o), /* @__PURE__ */ b.createElement(b.Fragment, null, /* @__PURE__ */ b.createElement(xh, {
    cache: t,
    serialized: c,
    isStringTag: typeof i == "string"
  }), /* @__PURE__ */ b.createElement(i, d));
}), Ch = Sh, wc = function(t, o) {
  var r = arguments;
  if (o == null || !nl.call(o, "css"))
    return b.createElement.apply(void 0, r);
  var i = r.length, s = new Array(i);
  s[0] = Ch, s[1] = vh(t, o);
  for (var a = 2; a < i; a++)
    s[a] = r[a];
  return b.createElement.apply(null, s);
};
(function(e) {
  var t;
  t || (t = e.JSX || (e.JSX = {}));
})(wc || (wc = {}));
var wh = /* @__PURE__ */ tl(function(e, t) {
  var o = e.styles, r = oi([o], void 0, b.useContext(ri)), i = b.useRef();
  return Cc(function() {
    var s = t.key + "-global", a = new t.sheet.constructor({
      key: s,
      nonce: t.sheet.nonce,
      container: t.sheet.container,
      speedy: t.sheet.isSpeedy
    }), c = !1, d = document.querySelector('style[data-emotion="' + s + " " + r.name + '"]');
    return t.sheet.tags.length && (a.before = t.sheet.tags[0]), d !== null && (c = !0, d.setAttribute("data-emotion", s), a.hydrate([d])), i.current = [a, c], function() {
      a.flush();
    };
  }, [t]), Cc(function() {
    var s = i.current, a = s[0], c = s[1];
    if (c) {
      s[1] = !1;
      return;
    }
    if (r.next !== void 0 && el(t, r.next, !0), a.tags.length) {
      var d = a.tags[a.tags.length - 1].nextElementSibling;
      a.before = d, a.flush();
    }
    t.insert("", r, a, !1);
  }, [t, r.name]), null;
});
function ol() {
  for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++)
    t[o] = arguments[o];
  return oi(t);
}
function ii() {
  var e = ol.apply(void 0, arguments), t = "animation-" + e.name;
  return {
    name: t,
    styles: "@keyframes " + t + "{" + e.styles + "}",
    anim: 1,
    toString: function() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
}
var Th = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|popover|popoverTarget|popoverTargetAction|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/, Eh = /* @__PURE__ */ Su(
  function(e) {
    return Th.test(e) || e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) < 91;
  }
  /* Z+1 */
), Oh = Eh, Rh = function(t) {
  return t !== "theme";
}, Tc = function(t) {
  return typeof t == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  t.charCodeAt(0) > 96 ? Oh : Rh;
}, Ec = function(t, o, r) {
  var i;
  if (o) {
    var s = o.shouldForwardProp;
    i = t.__emotion_forwardProp && s ? function(a) {
      return t.__emotion_forwardProp(a) && s(a);
    } : s;
  }
  return typeof i != "function" && r && (i = t.__emotion_forwardProp), i;
}, Nh = function(t) {
  var o = t.cache, r = t.serialized, i = t.isStringTag;
  return Za(o, r, i), Nu(function() {
    return el(o, r, i);
  }), null;
}, kh = function e(t, o) {
  var r = t.__emotion_real === t, i = r && t.__emotion_base || t, s, a;
  o !== void 0 && (s = o.label, a = o.target);
  var c = Ec(t, o, r), d = c || Tc(i), p = !d("as");
  return function() {
    var m = arguments, y = r && t.__emotion_styles !== void 0 ? t.__emotion_styles.slice(0) : [];
    if (s !== void 0 && y.push("label:" + s + ";"), m[0] == null || m[0].raw === void 0)
      y.push.apply(y, m);
    else {
      var x = m[0];
      y.push(x[0]);
      for (var f = m.length, v = 1; v < f; v++)
        y.push(m[v], x[v]);
    }
    var h = tl(function(w, O, k) {
      var E = p && w.as || i, C = "", S = [], N = w;
      if (w.theme == null) {
        N = {};
        for (var A in w)
          N[A] = w[A];
        N.theme = b.useContext(ri);
      }
      typeof w.className == "string" ? C = Eu(O.registered, S, w.className) : w.className != null && (C = w.className + " ");
      var _ = oi(y.concat(S), O.registered, N);
      C += O.key + "-" + _.name, a !== void 0 && (C += " " + a);
      var D = p && c === void 0 ? Tc(E) : d, F = {};
      for (var P in w)
        p && P === "as" || D(P) && (F[P] = w[P]);
      return F.className = C, k && (F.ref = k), /* @__PURE__ */ b.createElement(b.Fragment, null, /* @__PURE__ */ b.createElement(Nh, {
        cache: O,
        serialized: _,
        isStringTag: typeof E == "string"
      }), /* @__PURE__ */ b.createElement(E, F));
    });
    return h.displayName = s !== void 0 ? s : "Styled(" + (typeof i == "string" ? i : i.displayName || i.name || "Component") + ")", h.defaultProps = t.defaultProps, h.__emotion_real = h, h.__emotion_base = i, h.__emotion_styles = y, h.__emotion_forwardProp = c, Object.defineProperty(h, "toString", {
      value: function() {
        return "." + a;
      }
    }), h.withComponent = function(w, O) {
      var k = e(w, Yi({}, o, O, {
        shouldForwardProp: Ec(h, O, !0)
      }));
      return k.apply(void 0, y);
    }, h;
  };
}, Ph = [
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
], Ta = kh.bind(null);
Ph.forEach(function(e) {
  Ta[e] = Ta(e);
});
var Ea = { exports: {} }, Ci = { exports: {} }, Qe = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Oc;
function Ih() {
  if (Oc) return Qe;
  Oc = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, o = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, i = e ? Symbol.for("react.strict_mode") : 60108, s = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, c = e ? Symbol.for("react.context") : 60110, d = e ? Symbol.for("react.async_mode") : 60111, p = e ? Symbol.for("react.concurrent_mode") : 60111, m = e ? Symbol.for("react.forward_ref") : 60112, y = e ? Symbol.for("react.suspense") : 60113, x = e ? Symbol.for("react.suspense_list") : 60120, f = e ? Symbol.for("react.memo") : 60115, v = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, w = e ? Symbol.for("react.fundamental") : 60117, O = e ? Symbol.for("react.responder") : 60118, k = e ? Symbol.for("react.scope") : 60119;
  function E(S) {
    if (typeof S == "object" && S !== null) {
      var N = S.$$typeof;
      switch (N) {
        case t:
          switch (S = S.type, S) {
            case d:
            case p:
            case r:
            case s:
            case i:
            case y:
              return S;
            default:
              switch (S = S && S.$$typeof, S) {
                case c:
                case m:
                case v:
                case f:
                case a:
                  return S;
                default:
                  return N;
              }
          }
        case o:
          return N;
      }
    }
  }
  function C(S) {
    return E(S) === p;
  }
  return Qe.AsyncMode = d, Qe.ConcurrentMode = p, Qe.ContextConsumer = c, Qe.ContextProvider = a, Qe.Element = t, Qe.ForwardRef = m, Qe.Fragment = r, Qe.Lazy = v, Qe.Memo = f, Qe.Portal = o, Qe.Profiler = s, Qe.StrictMode = i, Qe.Suspense = y, Qe.isAsyncMode = function(S) {
    return C(S) || E(S) === d;
  }, Qe.isConcurrentMode = C, Qe.isContextConsumer = function(S) {
    return E(S) === c;
  }, Qe.isContextProvider = function(S) {
    return E(S) === a;
  }, Qe.isElement = function(S) {
    return typeof S == "object" && S !== null && S.$$typeof === t;
  }, Qe.isForwardRef = function(S) {
    return E(S) === m;
  }, Qe.isFragment = function(S) {
    return E(S) === r;
  }, Qe.isLazy = function(S) {
    return E(S) === v;
  }, Qe.isMemo = function(S) {
    return E(S) === f;
  }, Qe.isPortal = function(S) {
    return E(S) === o;
  }, Qe.isProfiler = function(S) {
    return E(S) === s;
  }, Qe.isStrictMode = function(S) {
    return E(S) === i;
  }, Qe.isSuspense = function(S) {
    return E(S) === y;
  }, Qe.isValidElementType = function(S) {
    return typeof S == "string" || typeof S == "function" || S === r || S === p || S === s || S === i || S === y || S === x || typeof S == "object" && S !== null && (S.$$typeof === v || S.$$typeof === f || S.$$typeof === a || S.$$typeof === c || S.$$typeof === m || S.$$typeof === w || S.$$typeof === O || S.$$typeof === k || S.$$typeof === h);
  }, Qe.typeOf = E, Qe;
}
var Ze = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Rc;
function $h() {
  return Rc || (Rc = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, o = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, i = e ? Symbol.for("react.strict_mode") : 60108, s = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, c = e ? Symbol.for("react.context") : 60110, d = e ? Symbol.for("react.async_mode") : 60111, p = e ? Symbol.for("react.concurrent_mode") : 60111, m = e ? Symbol.for("react.forward_ref") : 60112, y = e ? Symbol.for("react.suspense") : 60113, x = e ? Symbol.for("react.suspense_list") : 60120, f = e ? Symbol.for("react.memo") : 60115, v = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, w = e ? Symbol.for("react.fundamental") : 60117, O = e ? Symbol.for("react.responder") : 60118, k = e ? Symbol.for("react.scope") : 60119;
    function E(j) {
      return typeof j == "string" || typeof j == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      j === r || j === p || j === s || j === i || j === y || j === x || typeof j == "object" && j !== null && (j.$$typeof === v || j.$$typeof === f || j.$$typeof === a || j.$$typeof === c || j.$$typeof === m || j.$$typeof === w || j.$$typeof === O || j.$$typeof === k || j.$$typeof === h);
    }
    function C(j) {
      if (typeof j == "object" && j !== null) {
        var me = j.$$typeof;
        switch (me) {
          case t:
            var Q = j.type;
            switch (Q) {
              case d:
              case p:
              case r:
              case s:
              case i:
              case y:
                return Q;
              default:
                var fe = Q && Q.$$typeof;
                switch (fe) {
                  case c:
                  case m:
                  case v:
                  case f:
                  case a:
                    return fe;
                  default:
                    return me;
                }
            }
          case o:
            return me;
        }
      }
    }
    var S = d, N = p, A = c, _ = a, D = t, F = m, P = r, g = v, $ = f, I = o, M = s, B = i, W = y, G = !1;
    function oe(j) {
      return G || (G = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), z(j) || C(j) === d;
    }
    function z(j) {
      return C(j) === p;
    }
    function V(j) {
      return C(j) === c;
    }
    function Y(j) {
      return C(j) === a;
    }
    function ne(j) {
      return typeof j == "object" && j !== null && j.$$typeof === t;
    }
    function te(j) {
      return C(j) === m;
    }
    function re(j) {
      return C(j) === r;
    }
    function ee(j) {
      return C(j) === v;
    }
    function K(j) {
      return C(j) === f;
    }
    function U(j) {
      return C(j) === o;
    }
    function X(j) {
      return C(j) === s;
    }
    function Z(j) {
      return C(j) === i;
    }
    function ae(j) {
      return C(j) === y;
    }
    Ze.AsyncMode = S, Ze.ConcurrentMode = N, Ze.ContextConsumer = A, Ze.ContextProvider = _, Ze.Element = D, Ze.ForwardRef = F, Ze.Fragment = P, Ze.Lazy = g, Ze.Memo = $, Ze.Portal = I, Ze.Profiler = M, Ze.StrictMode = B, Ze.Suspense = W, Ze.isAsyncMode = oe, Ze.isConcurrentMode = z, Ze.isContextConsumer = V, Ze.isContextProvider = Y, Ze.isElement = ne, Ze.isForwardRef = te, Ze.isFragment = re, Ze.isLazy = ee, Ze.isMemo = K, Ze.isPortal = U, Ze.isProfiler = X, Ze.isStrictMode = Z, Ze.isSuspense = ae, Ze.isValidElementType = E, Ze.typeOf = C;
  }()), Ze;
}
var Nc;
function Pu() {
  return Nc || (Nc = 1, process.env.NODE_ENV === "production" ? Ci.exports = Ih() : Ci.exports = $h()), Ci.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var ea, kc;
function Mh() {
  if (kc) return ea;
  kc = 1;
  var e = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, o = Object.prototype.propertyIsEnumerable;
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
      var d = Object.getOwnPropertyNames(a).map(function(m) {
        return a[m];
      });
      if (d.join("") !== "0123456789")
        return !1;
      var p = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(m) {
        p[m] = m;
      }), Object.keys(Object.assign({}, p)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return ea = i() ? Object.assign : function(s, a) {
    for (var c, d = r(s), p, m = 1; m < arguments.length; m++) {
      c = Object(arguments[m]);
      for (var y in c)
        t.call(c, y) && (d[y] = c[y]);
      if (e) {
        p = e(c);
        for (var x = 0; x < p.length; x++)
          o.call(c, p[x]) && (d[p[x]] = c[p[x]]);
      }
    }
    return d;
  }, ea;
}
var ta, Pc;
function rl() {
  if (Pc) return ta;
  Pc = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return ta = e, ta;
}
var na, Ic;
function Iu() {
  return Ic || (Ic = 1, na = Function.call.bind(Object.prototype.hasOwnProperty)), na;
}
var oa, $c;
function Ah() {
  if ($c) return oa;
  $c = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = rl(), o = {}, r = Iu();
    e = function(s) {
      var a = "Warning: " + s;
      typeof console < "u" && console.error(a);
      try {
        throw new Error(a);
      } catch {
      }
    };
  }
  function i(s, a, c, d, p) {
    if (process.env.NODE_ENV !== "production") {
      for (var m in s)
        if (r(s, m)) {
          var y;
          try {
            if (typeof s[m] != "function") {
              var x = Error(
                (d || "React class") + ": " + c + " type `" + m + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof s[m] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw x.name = "Invariant Violation", x;
            }
            y = s[m](a, m, d, c, null, t);
          } catch (v) {
            y = v;
          }
          if (y && !(y instanceof Error) && e(
            (d || "React class") + ": type specification of " + c + " `" + m + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof y + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), y instanceof Error && !(y.message in o)) {
            o[y.message] = !0;
            var f = p ? p() : "";
            e(
              "Failed " + c + " type: " + y.message + (f ?? "")
            );
          }
        }
    }
  }
  return i.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (o = {});
  }, oa = i, oa;
}
var ra, Mc;
function _h() {
  if (Mc) return ra;
  Mc = 1;
  var e = Pu(), t = Mh(), o = rl(), r = Iu(), i = Ah(), s = function() {
  };
  process.env.NODE_ENV !== "production" && (s = function(c) {
    var d = "Warning: " + c;
    typeof console < "u" && console.error(d);
    try {
      throw new Error(d);
    } catch {
    }
  });
  function a() {
    return null;
  }
  return ra = function(c, d) {
    var p = typeof Symbol == "function" && Symbol.iterator, m = "@@iterator";
    function y(z) {
      var V = z && (p && z[p] || z[m]);
      if (typeof V == "function")
        return V;
    }
    var x = "<<anonymous>>", f = {
      array: O("array"),
      bigint: O("bigint"),
      bool: O("boolean"),
      func: O("function"),
      number: O("number"),
      object: O("object"),
      string: O("string"),
      symbol: O("symbol"),
      any: k(),
      arrayOf: E,
      element: C(),
      elementType: S(),
      instanceOf: N,
      node: F(),
      objectOf: _,
      oneOf: A,
      oneOfType: D,
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
    function w(z) {
      if (process.env.NODE_ENV !== "production")
        var V = {}, Y = 0;
      function ne(re, ee, K, U, X, Z, ae) {
        if (U = U || x, Z = Z || K, ae !== o) {
          if (d) {
            var j = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw j.name = "Invariant Violation", j;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var me = U + ":" + K;
            !V[me] && // Avoid spamming the console because they are often not actionable except for lib authors
            Y < 3 && (s(
              "You are manually calling a React.PropTypes validation function for the `" + Z + "` prop on `" + U + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), V[me] = !0, Y++);
          }
        }
        return ee[K] == null ? re ? ee[K] === null ? new h("The " + X + " `" + Z + "` is marked as required " + ("in `" + U + "`, but its value is `null`.")) : new h("The " + X + " `" + Z + "` is marked as required in " + ("`" + U + "`, but its value is `undefined`.")) : null : z(ee, K, U, X, Z);
      }
      var te = ne.bind(null, !1);
      return te.isRequired = ne.bind(null, !0), te;
    }
    function O(z) {
      function V(Y, ne, te, re, ee, K) {
        var U = Y[ne], X = B(U);
        if (X !== z) {
          var Z = W(U);
          return new h(
            "Invalid " + re + " `" + ee + "` of type " + ("`" + Z + "` supplied to `" + te + "`, expected ") + ("`" + z + "`."),
            { expectedType: z }
          );
        }
        return null;
      }
      return w(V);
    }
    function k() {
      return w(a);
    }
    function E(z) {
      function V(Y, ne, te, re, ee) {
        if (typeof z != "function")
          return new h("Property `" + ee + "` of component `" + te + "` has invalid PropType notation inside arrayOf.");
        var K = Y[ne];
        if (!Array.isArray(K)) {
          var U = B(K);
          return new h("Invalid " + re + " `" + ee + "` of type " + ("`" + U + "` supplied to `" + te + "`, expected an array."));
        }
        for (var X = 0; X < K.length; X++) {
          var Z = z(K, X, te, re, ee + "[" + X + "]", o);
          if (Z instanceof Error)
            return Z;
        }
        return null;
      }
      return w(V);
    }
    function C() {
      function z(V, Y, ne, te, re) {
        var ee = V[Y];
        if (!c(ee)) {
          var K = B(ee);
          return new h("Invalid " + te + " `" + re + "` of type " + ("`" + K + "` supplied to `" + ne + "`, expected a single ReactElement."));
        }
        return null;
      }
      return w(z);
    }
    function S() {
      function z(V, Y, ne, te, re) {
        var ee = V[Y];
        if (!e.isValidElementType(ee)) {
          var K = B(ee);
          return new h("Invalid " + te + " `" + re + "` of type " + ("`" + K + "` supplied to `" + ne + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return w(z);
    }
    function N(z) {
      function V(Y, ne, te, re, ee) {
        if (!(Y[ne] instanceof z)) {
          var K = z.name || x, U = oe(Y[ne]);
          return new h("Invalid " + re + " `" + ee + "` of type " + ("`" + U + "` supplied to `" + te + "`, expected ") + ("instance of `" + K + "`."));
        }
        return null;
      }
      return w(V);
    }
    function A(z) {
      if (!Array.isArray(z))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? s(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : s("Invalid argument supplied to oneOf, expected an array.")), a;
      function V(Y, ne, te, re, ee) {
        for (var K = Y[ne], U = 0; U < z.length; U++)
          if (v(K, z[U]))
            return null;
        var X = JSON.stringify(z, function(ae, j) {
          var me = W(j);
          return me === "symbol" ? String(j) : j;
        });
        return new h("Invalid " + re + " `" + ee + "` of value `" + String(K) + "` " + ("supplied to `" + te + "`, expected one of " + X + "."));
      }
      return w(V);
    }
    function _(z) {
      function V(Y, ne, te, re, ee) {
        if (typeof z != "function")
          return new h("Property `" + ee + "` of component `" + te + "` has invalid PropType notation inside objectOf.");
        var K = Y[ne], U = B(K);
        if (U !== "object")
          return new h("Invalid " + re + " `" + ee + "` of type " + ("`" + U + "` supplied to `" + te + "`, expected an object."));
        for (var X in K)
          if (r(K, X)) {
            var Z = z(K, X, te, re, ee + "." + X, o);
            if (Z instanceof Error)
              return Z;
          }
        return null;
      }
      return w(V);
    }
    function D(z) {
      if (!Array.isArray(z))
        return process.env.NODE_ENV !== "production" && s("Invalid argument supplied to oneOfType, expected an instance of array."), a;
      for (var V = 0; V < z.length; V++) {
        var Y = z[V];
        if (typeof Y != "function")
          return s(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + G(Y) + " at index " + V + "."
          ), a;
      }
      function ne(te, re, ee, K, U) {
        for (var X = [], Z = 0; Z < z.length; Z++) {
          var ae = z[Z], j = ae(te, re, ee, K, U, o);
          if (j == null)
            return null;
          j.data && r(j.data, "expectedType") && X.push(j.data.expectedType);
        }
        var me = X.length > 0 ? ", expected one of type [" + X.join(", ") + "]" : "";
        return new h("Invalid " + K + " `" + U + "` supplied to " + ("`" + ee + "`" + me + "."));
      }
      return w(ne);
    }
    function F() {
      function z(V, Y, ne, te, re) {
        return I(V[Y]) ? null : new h("Invalid " + te + " `" + re + "` supplied to " + ("`" + ne + "`, expected a ReactNode."));
      }
      return w(z);
    }
    function P(z, V, Y, ne, te) {
      return new h(
        (z || "React class") + ": " + V + " type `" + Y + "." + ne + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + te + "`."
      );
    }
    function g(z) {
      function V(Y, ne, te, re, ee) {
        var K = Y[ne], U = B(K);
        if (U !== "object")
          return new h("Invalid " + re + " `" + ee + "` of type `" + U + "` " + ("supplied to `" + te + "`, expected `object`."));
        for (var X in z) {
          var Z = z[X];
          if (typeof Z != "function")
            return P(te, re, ee, X, W(Z));
          var ae = Z(K, X, te, re, ee + "." + X, o);
          if (ae)
            return ae;
        }
        return null;
      }
      return w(V);
    }
    function $(z) {
      function V(Y, ne, te, re, ee) {
        var K = Y[ne], U = B(K);
        if (U !== "object")
          return new h("Invalid " + re + " `" + ee + "` of type `" + U + "` " + ("supplied to `" + te + "`, expected `object`."));
        var X = t({}, Y[ne], z);
        for (var Z in X) {
          var ae = z[Z];
          if (r(z, Z) && typeof ae != "function")
            return P(te, re, ee, Z, W(ae));
          if (!ae)
            return new h(
              "Invalid " + re + " `" + ee + "` key `" + Z + "` supplied to `" + te + "`.\nBad object: " + JSON.stringify(Y[ne], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(z), null, "  ")
            );
          var j = ae(K, Z, te, re, ee + "." + Z, o);
          if (j)
            return j;
        }
        return null;
      }
      return w(V);
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
            var Y = V.call(z), ne;
            if (V !== z.entries) {
              for (; !(ne = Y.next()).done; )
                if (!I(ne.value))
                  return !1;
            } else
              for (; !(ne = Y.next()).done; ) {
                var te = ne.value;
                if (te && !I(te[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function M(z, V) {
      return z === "symbol" ? !0 : V ? V["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && V instanceof Symbol : !1;
    }
    function B(z) {
      var V = typeof z;
      return Array.isArray(z) ? "array" : z instanceof RegExp ? "object" : M(V, z) ? "symbol" : V;
    }
    function W(z) {
      if (typeof z > "u" || z === null)
        return "" + z;
      var V = B(z);
      if (V === "object") {
        if (z instanceof Date)
          return "date";
        if (z instanceof RegExp)
          return "regexp";
      }
      return V;
    }
    function G(z) {
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
    function oe(z) {
      return !z.constructor || !z.constructor.name ? x : z.constructor.name;
    }
    return f.checkPropTypes = i, f.resetWarningCache = i.resetWarningCache, f.PropTypes = f, f;
  }, ra;
}
var ia, Ac;
function Dh() {
  if (Ac) return ia;
  Ac = 1;
  var e = rl();
  function t() {
  }
  function o() {
  }
  return o.resetWarningCache = t, ia = function() {
    function r(a, c, d, p, m, y) {
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
      checkPropTypes: o,
      resetWarningCache: t
    };
    return s.PropTypes = s, s;
  }, ia;
}
if (process.env.NODE_ENV !== "production") {
  var Lh = Pu(), Bh = !0;
  Ea.exports = _h()(Lh.isElement, Bh);
} else
  Ea.exports = Dh()();
var Fh = Ea.exports;
const n = /* @__PURE__ */ sh(Fh);
function jh(e) {
  return e == null || Object.keys(e).length === 0;
}
function il(e) {
  const {
    styles: t,
    defaultTheme: o = {}
  } = e;
  return /* @__PURE__ */ l(wh, {
    styles: typeof t == "function" ? (i) => t(jh(i) ? o : i) : t
  });
}
process.env.NODE_ENV !== "production" && (il.propTypes = {
  defaultTheme: n.object,
  styles: n.oneOfType([n.array, n.string, n.object, n.func])
});
/**
 * @mui/styled-engine v9.0.0
 *
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function $u(e, t) {
  const o = Ta(e, t);
  return process.env.NODE_ENV !== "production" ? (...r) => {
    const i = typeof e == "string" ? `"${e}"` : "component";
    return r.length === 0 ? console.error([`MUI: Seems like you called \`styled(${i})()\` without a \`style\` argument.`, 'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.'].join(`
`)) : r.some((s) => s === void 0) && console.error(`MUI: the styled(${i})(...args) API requires all its args to be defined.`), o(...r);
  } : o;
}
function Wh(e, t) {
  Array.isArray(e.__emotion_styles) && (e.__emotion_styles = t(e.__emotion_styles));
}
const _c = [];
function ao(e) {
  return _c[0] = e, oi(_c);
}
var Oa = { exports: {} }, it = {};
/**
 * @license React
 * react-is.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Dc;
function zh() {
  if (Dc) return it;
  Dc = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), s = Symbol.for("react.consumer"), a = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), m = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), x = Symbol.for("react.view_transition"), f = Symbol.for("react.client.reference");
  function v(h) {
    if (typeof h == "object" && h !== null) {
      var w = h.$$typeof;
      switch (w) {
        case e:
          switch (h = h.type, h) {
            case o:
            case i:
            case r:
            case d:
            case p:
            case x:
              return h;
            default:
              switch (h = h && h.$$typeof, h) {
                case a:
                case c:
                case y:
                case m:
                  return h;
                case s:
                  return h;
                default:
                  return w;
              }
          }
        case t:
          return w;
      }
    }
  }
  return it.ContextConsumer = s, it.ContextProvider = a, it.Element = e, it.ForwardRef = c, it.Fragment = o, it.Lazy = y, it.Memo = m, it.Portal = t, it.Profiler = i, it.StrictMode = r, it.Suspense = d, it.SuspenseList = p, it.isContextConsumer = function(h) {
    return v(h) === s;
  }, it.isContextProvider = function(h) {
    return v(h) === a;
  }, it.isElement = function(h) {
    return typeof h == "object" && h !== null && h.$$typeof === e;
  }, it.isForwardRef = function(h) {
    return v(h) === c;
  }, it.isFragment = function(h) {
    return v(h) === o;
  }, it.isLazy = function(h) {
    return v(h) === y;
  }, it.isMemo = function(h) {
    return v(h) === m;
  }, it.isPortal = function(h) {
    return v(h) === t;
  }, it.isProfiler = function(h) {
    return v(h) === i;
  }, it.isStrictMode = function(h) {
    return v(h) === r;
  }, it.isSuspense = function(h) {
    return v(h) === d;
  }, it.isSuspenseList = function(h) {
    return v(h) === p;
  }, it.isValidElementType = function(h) {
    return typeof h == "string" || typeof h == "function" || h === o || h === i || h === r || h === d || h === p || typeof h == "object" && h !== null && (h.$$typeof === y || h.$$typeof === m || h.$$typeof === a || h.$$typeof === s || h.$$typeof === c || h.$$typeof === f || h.getModuleId !== void 0);
  }, it.typeOf = v, it;
}
var st = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Lc;
function Vh() {
  return Lc || (Lc = 1, process.env.NODE_ENV !== "production" && function() {
    function e(h) {
      if (typeof h == "object" && h !== null) {
        var w = h.$$typeof;
        switch (w) {
          case t:
            switch (h = h.type, h) {
              case r:
              case s:
              case i:
              case p:
              case m:
              case f:
                return h;
              default:
                switch (h = h && h.$$typeof, h) {
                  case c:
                  case d:
                  case x:
                  case y:
                    return h;
                  case a:
                    return h;
                  default:
                    return w;
                }
            }
          case o:
            return w;
        }
      }
    }
    var t = Symbol.for("react.transitional.element"), o = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), a = Symbol.for("react.consumer"), c = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), m = Symbol.for("react.suspense_list"), y = Symbol.for("react.memo"), x = Symbol.for("react.lazy"), f = Symbol.for("react.view_transition"), v = Symbol.for("react.client.reference");
    st.ContextConsumer = a, st.ContextProvider = c, st.Element = t, st.ForwardRef = d, st.Fragment = r, st.Lazy = x, st.Memo = y, st.Portal = o, st.Profiler = s, st.StrictMode = i, st.Suspense = p, st.SuspenseList = m, st.isContextConsumer = function(h) {
      return e(h) === a;
    }, st.isContextProvider = function(h) {
      return e(h) === c;
    }, st.isElement = function(h) {
      return typeof h == "object" && h !== null && h.$$typeof === t;
    }, st.isForwardRef = function(h) {
      return e(h) === d;
    }, st.isFragment = function(h) {
      return e(h) === r;
    }, st.isLazy = function(h) {
      return e(h) === x;
    }, st.isMemo = function(h) {
      return e(h) === y;
    }, st.isPortal = function(h) {
      return e(h) === o;
    }, st.isProfiler = function(h) {
      return e(h) === s;
    }, st.isStrictMode = function(h) {
      return e(h) === i;
    }, st.isSuspense = function(h) {
      return e(h) === p;
    }, st.isSuspenseList = function(h) {
      return e(h) === m;
    }, st.isValidElementType = function(h) {
      return typeof h == "string" || typeof h == "function" || h === r || h === s || h === i || h === p || h === m || typeof h == "object" && h !== null && (h.$$typeof === x || h.$$typeof === y || h.$$typeof === c || h.$$typeof === a || h.$$typeof === d || h.$$typeof === v || h.getModuleId !== void 0);
    }, st.typeOf = e;
  }()), st;
}
process.env.NODE_ENV === "production" ? Oa.exports = zh() : Oa.exports = Vh();
var Eo = Oa.exports;
function Xn(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Mu(e) {
  if (/* @__PURE__ */ b.isValidElement(e) || Eo.isValidElementType(e) || !Xn(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((o) => {
    t[o] = Mu(e[o]);
  }), t;
}
function Dt(e, t, o = {
  clone: !0
}) {
  const r = o.clone ? {
    ...e
  } : e;
  return Xn(e) && Xn(t) && Object.keys(t).forEach((i) => {
    /* @__PURE__ */ b.isValidElement(t[i]) || Eo.isValidElementType(t[i]) ? r[i] = t[i] : Xn(t[i]) && // Avoid prototype pollution
    Object.prototype.hasOwnProperty.call(e, i) && Xn(e[i]) ? r[i] = Dt(e[i], t[i], o) : o.clone ? r[i] = Xn(t[i]) ? Mu(t[i]) : t[i] : r[i] = t[i];
  }), r;
}
const Uh = (e) => {
  const t = Object.keys(e).map((o) => ({
    key: o,
    val: e[o]
  })) || [];
  return t.sort((o, r) => o.val - r.val), t.reduce((o, r) => ({
    ...o,
    [r.key]: r.val
  }), {});
};
function Au(e) {
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
    unit: o = "px",
    step: r = 5,
    ...i
  } = e, s = Uh(t), a = Object.keys(s);
  function c(f) {
    return `@media (min-width:${typeof t[f] == "number" ? t[f] : f}${o})`;
  }
  function d(f) {
    return `@media (max-width:${(typeof t[f] == "number" ? t[f] : f) - r / 100}${o})`;
  }
  function p(f, v) {
    const h = a.indexOf(v);
    return `@media (min-width:${typeof t[f] == "number" ? t[f] : f}${o}) and (max-width:${(h !== -1 && typeof t[a[h]] == "number" ? t[a[h]] : v) - r / 100}${o})`;
  }
  function m(f) {
    return a.indexOf(f) + 1 < a.length ? p(f, a[a.indexOf(f) + 1]) : c(f);
  }
  function y(f) {
    const v = a.indexOf(f);
    return v === 0 ? c(a[1]) : v === a.length - 1 ? d(a[v]) : p(f, a[a.indexOf(f) + 1]).replace("@media", "@media not all and");
  }
  const x = [];
  for (let f = 0; f < a.length; f += 1)
    x.push(c(a[f]));
  return {
    keys: a,
    values: s,
    up: c,
    down: d,
    between: p,
    only: m,
    not: y,
    unit: o,
    internal_mediaKeys: x,
    ...i
  };
}
const Bc = /min-width:\s*([0-9.]+)/;
function Fc(e, t) {
  if (!e.containerQueries || !Hh(t))
    return t;
  const o = [];
  for (const i in t)
    i.startsWith("@container") && o.push(i);
  o.sort((i, s) => {
    var a, c;
    return +(((a = i.match(Bc)) == null ? void 0 : a[1]) || 0) - +(((c = s.match(Bc)) == null ? void 0 : c[1]) || 0);
  });
  const r = t;
  for (let i = 0; i < o.length; i += 1) {
    const s = o[i], a = r[s];
    delete r[s], r[s] = a;
  }
  return r;
}
function Hh(e) {
  for (const t in e)
    if (t.startsWith("@container"))
      return !0;
  return !1;
}
function _u(e, t) {
  return t === "@" || t.startsWith("@") && (e.some((o) => t.startsWith(`@${o}`)) || !!t.match(/^@\d/));
}
function Gh(e, t) {
  const o = t.match(/^@([^/]+)?\/?(.+)?$/);
  if (!o) {
    if (process.env.NODE_ENV !== "production")
      throw (
        /* minify-error */
        new Error(`MUI: The provided shorthand ${`(${t})`} is invalid. The format should be \`@<breakpoint | number>\` or \`@<breakpoint | number>/<container>\`.
For example, \`@sm\` or \`@600\` or \`@40rem/sidebar\`.`)
      );
    return null;
  }
  const [, r, i] = o, s = Number.isNaN(+r) ? r || 0 : +r;
  return e.containerQueries(i).up(s);
}
function qh(e) {
  const t = (s, a) => s.replace("@media", a ? `@container ${a}` : "@container");
  function o(s, a) {
    s.up = (...c) => t(e.breakpoints.up(...c), a), s.down = (...c) => t(e.breakpoints.down(...c), a), s.between = (...c) => t(e.breakpoints.between(...c), a), s.only = (...c) => t(e.breakpoints.only(...c), a), s.not = (...c) => {
      const d = t(e.breakpoints.not(...c), a);
      return d.includes("not all and") ? d.replace("not all and ", "").replace("min-width:", "width<").replace("max-width:", "width>").replace("and", "or") : d;
    };
  }
  const r = {}, i = (s) => (o(r, s), r);
  return o(i), {
    ...e,
    containerQueries: i
  };
}
const Kh = {
  borderRadius: 4
}, uo = process.env.NODE_ENV !== "production" ? n.oneOfType([n.number, n.string, n.object, n.array]) : {};
function Du(e) {
  if (e == null)
    return !0;
  for (const t in e)
    return !1;
  return !0;
}
function Xo(e, t) {
  const o = Array.isArray(t), r = Array.isArray(e);
  return Zh(t) ? t : eg(e) ? tr(t) : o && r ? Jh(e, t) : o !== r ? tr(t) : tg(e, t);
}
function Yh(e) {
  let t = 0;
  const o = e.length, r = new Array(o);
  for (t = 0; t < o; t += 1)
    r[t] = tr(e[t]);
  return r;
}
function Xh(e) {
  const t = {};
  for (const o in e)
    t[o] = tr(e[o]);
  return t;
}
function Jh(e, t) {
  const o = e.length;
  for (let r = 0; r < t.length; r += 1)
    e[o + r] = tr(t[r]);
  return e;
}
function Qh(e) {
  return typeof e == "object" && e !== null && !(e instanceof RegExp) && !(e instanceof Date);
}
function Zh(e) {
  return typeof e != "object" || e === null;
}
function eg(e) {
  return typeof e != "object" || e === null || e instanceof RegExp || e instanceof Date;
}
function tr(e) {
  return Qh(e) ? Array.isArray(e) ? Yh(e) : Xh(e) : e;
}
function tg(e, t) {
  for (const o in t)
    o in e ? e[o] = Xo(e[o], t[o]) : e[o] = tr(t[o]);
  return e;
}
const ng = {}, vs = {
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
}, Ji = Au({
  values: vs
}), og = {
  containerQueries: (e) => ({
    up: (t) => {
      let o = typeof t == "number" ? t : vs[t] || t;
      return typeof o == "number" && (o = `${o}px`), e ? `@container ${e} (min-width:${o})` : `@container (min-width:${o})`;
    }
  })
};
function lo(e, t, o) {
  const r = {};
  return xs(r, e.theme, t, (i, s, a) => {
    const c = o(s, a);
    i ? r[i] = c : Xo(r, c);
  });
}
function xs(e, t, o, r) {
  if (t ?? (t = ng), Array.isArray(o)) {
    const i = t.breakpoints ?? Ji;
    for (let s = 0; s < o.length; s += 1)
      sa(e, i.up(i.keys[s]), o[s], void 0, r);
    return e;
  }
  if (typeof o == "object") {
    const i = t.breakpoints ?? Ji, s = i.values ?? vs;
    for (const a in o)
      if (_u(i.keys, a)) {
        const c = Gh(t.containerQueries ? t : og, a);
        c && sa(e, c, o[a], a, r);
      } else if (a in s) {
        const c = i.up(a);
        sa(e, c, o[a], a, r);
      } else {
        const c = a;
        e[c] = o[c];
      }
    return e;
  }
  return r(void 0, o), e;
}
function sa(e, t, o, r, i) {
  e[t] ?? (e[t] = {}), i(t, o, r);
}
function Lu(e = Ji) {
  const {
    internal_mediaKeys: t
  } = e, o = {};
  for (let r = 0; r < t.length; r += 1)
    o[t[r]] = {};
  return o;
}
function Ra(e, t) {
  const o = e.internal_mediaKeys;
  for (let r = 0; r < o.length; r += 1) {
    const i = o[r];
    Du(t[i]) && delete t[i];
  }
  return t;
}
function rg(e, ...t) {
  const r = [Lu(e), ...t].reduce((i, s) => Dt(i, s), {});
  return Ra(e, r);
}
function ig(e, t) {
  if (typeof e != "object")
    return {};
  const o = {}, r = Object.keys(t);
  return Array.isArray(e) ? r.forEach((i, s) => {
    s < e.length && (o[i] = !0);
  }) : r.forEach((i) => {
    e[i] != null && (o[i] = !0);
  }), o;
}
function aa({
  values: e,
  breakpoints: t,
  base: o
}) {
  const r = o || ig(e, t), i = Object.keys(r);
  if (i.length === 0)
    return e;
  let s;
  return i.reduce((a, c, d) => (Array.isArray(e) ? (a[c] = e[d] != null ? e[d] : e[s], s = d) : typeof e == "object" ? (a[c] = e[c] != null ? e[c] : e[s], s = c) : a[c] = e, a), {});
}
function sg(e, t) {
  if (Array.isArray(t))
    return !0;
  if (typeof t == "object" && t !== null) {
    for (let r = 0; r < e.keys.length; r += 1)
      if (e.keys[r] in t)
        return !0;
    const o = Object.keys(t);
    for (let r = 0; r < o.length; r += 1)
      if (_u(e.keys, o[r]))
        return !0;
  }
  return !1;
}
function Ce(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : eo(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Bu(e, t, o, r) {
  let i;
  return typeof e == "function" ? i = e(o) : Array.isArray(e) ? i = e[o] || o : typeof o == "string" ? i = Ss(e, o, !0, r) || o : i = o, t && (i = t(i, o, e)), i;
}
function Ss(e, t, o = !0, r = void 0) {
  if (!e || !t)
    return null;
  const i = t.split(".");
  if (e.vars && o) {
    const s = jc(e.vars, i, r);
    if (s != null)
      return s;
  }
  return jc(e, i, r);
}
function jc(e, t, o = void 0) {
  let r, i = e, s = 0;
  for (; s < t.length; ) {
    if (i == null)
      return i;
    r = i, i = i[t[s]], s += 1;
  }
  if (o && i === void 0) {
    const a = t[t.length - 1], c = `${o}${a === "default" ? "" : Ce(a)}`;
    return r == null ? void 0 : r[c];
  }
  return i;
}
function Tt(e) {
  const {
    prop: t,
    cssProperty: o = e.prop,
    themeKey: r,
    transform: i
  } = e, s = (a) => {
    if (a[t] == null)
      return null;
    const c = a[t], d = a.theme, p = Ss(d, r) || {};
    return lo(a, c, (y) => {
      const x = Bu(p, i, y, t);
      return o === !1 ? x : {
        [o]: x
      };
    });
  };
  return s.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: uo
  } : {}, s.filterProps = [t], s;
}
const ag = {
  internal_cache: {}
}, Qi = {
  m: "margin",
  p: "padding"
}, Wc = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, zc = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, Gr = {};
for (const e in Qi)
  Gr[e] = [Qi[e]];
for (const e in Qi)
  for (const t in Wc) {
    const o = Qi[e], r = Wc[t], i = Array.isArray(r) ? r.map((s) => o + s) : [o + r];
    Gr[e + t] = i;
  }
for (const e in zc)
  Gr[e] = Gr[zc[e]];
const Cs = /* @__PURE__ */ new Set(["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"]), ws = /* @__PURE__ */ new Set(["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"]), lg = /* @__PURE__ */ new Set([...Cs, ...ws]);
function si(e, t, o, r) {
  const i = Ss(e, t, !0) ?? o;
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
function Ts(e) {
  return si(e, "spacing", 8, "spacing");
}
function Oo(e, t) {
  return typeof t == "string" || t == null ? t : e(t);
}
const Vc = [""];
function Fu(e, t) {
  var s;
  const o = e.theme ?? ag, r = ((s = o == null ? void 0 : o.internal_cache) == null ? void 0 : s.unarySpacing) ?? Ts(o), i = {};
  for (const a in e) {
    if (!t.has(a))
      continue;
    const c = Gr[a] ?? (Vc[0] = a, Vc), d = e[a];
    xs(i, e.theme, d, (p, m) => {
      const y = p ? i[p] : i;
      for (let x = 0; x < c.length; x += 1)
        y[c[x]] = Oo(r, m);
    });
  }
  return i;
}
function xt(e) {
  return Fu(e, Cs);
}
xt.propTypes = process.env.NODE_ENV !== "production" ? Array.from(Cs).reduce((e, t) => (e[t] = uo, e), {}) : {};
xt.filterProps = Cs;
function St(e) {
  return Fu(e, ws);
}
St.propTypes = process.env.NODE_ENV !== "production" ? Array.from(ws).reduce((e, t) => (e[t] = uo, e), {}) : {};
St.filterProps = ws;
process.env.NODE_ENV !== "production" && Array.from(lg).reduce((e, t) => (e[t] = uo, e), {});
function ju(e = 8, t = Ts({
  spacing: e
})) {
  if (e.mui)
    return e;
  const o = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((s) => {
    const a = t(s);
    return typeof a == "number" ? `${a}px` : a;
  }).join(" "));
  return o.mui = !0, o;
}
function Es(...e) {
  const t = e.reduce((r, i) => (i.filterProps.forEach((s) => {
    r[s] = i;
  }), r), {}), o = (r) => {
    const i = {};
    for (const s in r)
      t[s] && Xo(i, t[s](r));
    return i;
  };
  return o.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((r, i) => Object.assign(r, i.propTypes), {}) : {}, o.filterProps = e.reduce((r, i) => r.concat(i.filterProps), []), o;
}
function pn(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function gn(e, t) {
  return Tt({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const cg = gn("border", pn), dg = gn("borderTop", pn), ug = gn("borderRight", pn), pg = gn("borderBottom", pn), fg = gn("borderLeft", pn), mg = gn("borderColor"), hg = gn("borderTopColor"), gg = gn("borderRightColor"), bg = gn("borderBottomColor"), yg = gn("borderLeftColor"), vg = gn("outline", pn), xg = gn("outlineColor"), Os = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = si(e.theme, "shape.borderRadius", 4, "borderRadius"), o = (r) => ({
      borderRadius: Oo(t, r)
    });
    return lo(e, e.borderRadius, o);
  }
  return null;
};
Os.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: uo
} : {};
Os.filterProps = ["borderRadius"];
Es(cg, dg, ug, pg, fg, mg, hg, gg, bg, yg, Os, vg, xg);
const Rs = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = si(e.theme, "spacing", 8, "gap"), o = (r) => ({
      gap: Oo(t, r)
    });
    return lo(e, e.gap, o);
  }
  return null;
};
Rs.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: uo
} : {};
Rs.filterProps = ["gap"];
const Ns = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = si(e.theme, "spacing", 8, "columnGap"), o = (r) => ({
      columnGap: Oo(t, r)
    });
    return lo(e, e.columnGap, o);
  }
  return null;
};
Ns.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: uo
} : {};
Ns.filterProps = ["columnGap"];
const ks = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = si(e.theme, "spacing", 8, "rowGap"), o = (r) => ({
      rowGap: Oo(t, r)
    });
    return lo(e, e.rowGap, o);
  }
  return null;
};
ks.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: uo
} : {};
ks.filterProps = ["rowGap"];
const Sg = Tt({
  prop: "gridColumn"
}), Cg = Tt({
  prop: "gridRow"
}), wg = Tt({
  prop: "gridAutoFlow"
}), Tg = Tt({
  prop: "gridAutoColumns"
}), Eg = Tt({
  prop: "gridAutoRows"
}), Og = Tt({
  prop: "gridTemplateColumns"
}), Rg = Tt({
  prop: "gridTemplateRows"
}), Ng = Tt({
  prop: "gridTemplateAreas"
}), kg = Tt({
  prop: "gridArea"
});
Es(Rs, Ns, ks, Sg, Cg, wg, Tg, Eg, Og, Rg, Ng, kg);
function Jo(e, t) {
  return t === "grey" ? t : e;
}
const Pg = Tt({
  prop: "color",
  themeKey: "palette",
  transform: Jo
}), Ig = Tt({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Jo
}), $g = Tt({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Jo
});
Es(Pg, Ig, $g);
function nn(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const Mg = Tt({
  prop: "width",
  transform: nn
}), sl = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (o) => {
      var i, s, a, c, d;
      const r = ((a = (s = (i = e.theme) == null ? void 0 : i.breakpoints) == null ? void 0 : s.values) == null ? void 0 : a[o]) || vs[o];
      return r ? ((d = (c = e.theme) == null ? void 0 : c.breakpoints) == null ? void 0 : d.unit) !== "px" ? {
        maxWidth: `${r}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: r
      } : {
        maxWidth: nn(o)
      };
    };
    return lo(e, e.maxWidth, t);
  }
  return null;
};
sl.filterProps = ["maxWidth"];
const Ag = Tt({
  prop: "minWidth",
  transform: nn
}), _g = Tt({
  prop: "height",
  transform: nn
}), Dg = Tt({
  prop: "maxHeight",
  transform: nn
}), Lg = Tt({
  prop: "minHeight",
  transform: nn
});
Tt({
  prop: "size",
  cssProperty: "width",
  transform: nn
});
Tt({
  prop: "size",
  cssProperty: "height",
  transform: nn
});
const Bg = Tt({
  prop: "boxSizing"
});
Es(Mg, sl, Ag, _g, Dg, Lg, Bg);
const Ps = {
  // borders
  border: {
    themeKey: "borders",
    transform: pn
  },
  borderTop: {
    themeKey: "borders",
    transform: pn
  },
  borderRight: {
    themeKey: "borders",
    transform: pn
  },
  borderBottom: {
    themeKey: "borders",
    transform: pn
  },
  borderLeft: {
    themeKey: "borders",
    transform: pn
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
    transform: pn
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: Os
  },
  // palette
  color: {
    themeKey: "palette",
    transform: Jo
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: Jo
  },
  backgroundColor: {
    themeKey: "palette",
    transform: Jo
  },
  // spacing
  p: {
    style: St
  },
  pt: {
    style: St
  },
  pr: {
    style: St
  },
  pb: {
    style: St
  },
  pl: {
    style: St
  },
  px: {
    style: St
  },
  py: {
    style: St
  },
  padding: {
    style: St
  },
  paddingTop: {
    style: St
  },
  paddingRight: {
    style: St
  },
  paddingBottom: {
    style: St
  },
  paddingLeft: {
    style: St
  },
  paddingX: {
    style: St
  },
  paddingY: {
    style: St
  },
  paddingInline: {
    style: St
  },
  paddingInlineStart: {
    style: St
  },
  paddingInlineEnd: {
    style: St
  },
  paddingBlock: {
    style: St
  },
  paddingBlockStart: {
    style: St
  },
  paddingBlockEnd: {
    style: St
  },
  m: {
    style: xt
  },
  mt: {
    style: xt
  },
  mr: {
    style: xt
  },
  mb: {
    style: xt
  },
  ml: {
    style: xt
  },
  mx: {
    style: xt
  },
  my: {
    style: xt
  },
  margin: {
    style: xt
  },
  marginTop: {
    style: xt
  },
  marginRight: {
    style: xt
  },
  marginBottom: {
    style: xt
  },
  marginLeft: {
    style: xt
  },
  marginX: {
    style: xt
  },
  marginY: {
    style: xt
  },
  marginInline: {
    style: xt
  },
  marginInlineStart: {
    style: xt
  },
  marginInlineEnd: {
    style: xt
  },
  marginBlock: {
    style: xt
  },
  marginBlockStart: {
    style: xt
  },
  marginBlockEnd: {
    style: xt
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
    style: Rs
  },
  rowGap: {
    style: ks
  },
  columnGap: {
    style: Ns
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
    transform: nn
  },
  maxWidth: {
    style: sl
  },
  minWidth: {
    transform: nn
  },
  height: {
    transform: nn
  },
  maxHeight: {
    transform: nn
  },
  minHeight: {
    transform: nn
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
}, Fg = {};
function jg() {
  function e(t) {
    if (!t.sx)
      return null;
    const {
      sx: o,
      theme: r = Fg,
      nested: i
    } = t, s = r.unstable_sxConfig ?? Ps, a = {
      sx: null,
      theme: r,
      nested: !0
    };
    function c(d) {
      let p = d;
      if (typeof d == "function")
        p = d(r);
      else if (typeof d != "object")
        return d;
      if (!p)
        return null;
      const m = r.breakpoints ?? Ji, y = Lu(m);
      for (const x in p) {
        const f = Wg(p[x], r);
        if (f != null) {
          if (typeof f != "object") {
            Uc(y, x, f, r, s);
            continue;
          }
          if (s[x]) {
            Uc(y, x, f, r, s);
            continue;
          }
          sg(m, f) ? xs(y, t.theme, f, (v, h) => {
            y[v][x] = h;
          }) : (a.sx = f, y[x] = e(a));
        }
      }
      return !i && r.modularCssLayers ? {
        "@layer sx": Fc(r, Ra(m, y))
      } : Fc(r, Ra(m, y));
    }
    return Array.isArray(o) ? o.map(c) : c(o);
  }
  return e.filterProps = ["sx"], e;
}
const Ro = jg();
function Uc(e, t, o, r, i) {
  const s = i[t];
  if (!s) {
    e[t] = o;
    return;
  }
  if (o == null)
    return;
  const {
    themeKey: a
  } = s;
  if (a === "typography" && o === "inherit") {
    e[t] = o;
    return;
  }
  const {
    style: c
  } = s;
  if (c) {
    Xo(e, c({
      [t]: o,
      theme: r
    }));
    return;
  }
  const {
    cssProperty: d = t,
    transform: p
  } = s, m = Ss(r, a);
  xs(e, r, o, (y, x) => {
    const f = Bu(m, p, x, t);
    d === !1 ? Xo(y ? e[y] : e, f) : y ? e[y][d] = f : e[d] = f;
  });
}
function Wg(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function zg(e, t) {
  var r;
  const o = this;
  if (o.vars) {
    if (!((r = o.colorSchemes) != null && r[e]) || typeof o.getColorSchemeSelector != "function")
      return {};
    let i = o.getColorSchemeSelector(e);
    return i === "&" ? t : ((i.includes("data-") || i.includes(".")) && (i = `*:where(${i.replace(/\s*&$/, "")}) &`), {
      [i]: t
    });
  }
  return o.palette.mode === e ? t : {};
}
function ai(e = {}, ...t) {
  const {
    breakpoints: o = {},
    palette: r = {},
    spacing: i,
    shape: s = {},
    ...a
  } = e, c = Au(o), d = ju(i);
  let p = Dt({
    breakpoints: c,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: {
      mode: "light",
      ...r
    },
    spacing: d,
    shape: {
      ...Kh,
      ...s
    }
  }, a);
  return p = qh(p), p.applyStyles = zg, p = t.reduce((m, y) => Dt(m, y), p), p.unstable_sxConfig = {
    ...Ps,
    ...a == null ? void 0 : a.unstable_sxConfig
  }, p.unstable_sx = function(y) {
    return Ro({
      sx: y,
      theme: this
    });
  }, p.internal_cache = {}, p;
}
function Vg(e) {
  return Object.keys(e).length === 0;
}
function al(e = null) {
  const t = b.useContext(ri);
  return !t || Vg(t) ? e : t;
}
const Ug = ai();
function Is(e = Ug) {
  return al(e);
}
function la(e) {
  const t = ao(e);
  return e !== t && t.styles ? (t.styles.match(/^@layer\s+[^{]*$/) || (t.styles = `@layer global{${t.styles}}`), t) : e;
}
function ll({
  styles: e,
  themeId: t,
  defaultTheme: o = {}
}) {
  const r = Is(o), i = t && r[t] || r;
  let s = typeof e == "function" ? e(i) : e;
  return i.modularCssLayers && (Array.isArray(s) ? s = s.map((a) => la(typeof a == "function" ? a(i) : a)) : s = la(s)), /* @__PURE__ */ l(il, {
    styles: s
  });
}
process.env.NODE_ENV !== "production" && (ll.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  defaultTheme: n.object,
  /**
   * @ignore
   */
  styles: n.oneOfType([n.array, n.func, n.number, n.object, n.string, n.bool]),
  /**
   * @ignore
   */
  themeId: n.string
});
const Hc = (e) => e, Hg = () => {
  let e = Hc;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = Hc;
    }
  };
}, Wu = Hg();
function zu(e) {
  var t, o, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var i = e.length;
    for (t = 0; t < i; t++) e[t] && (o = zu(e[t])) && (r && (r += " "), r += o);
  } else for (o in e) e[o] && (r && (r += " "), r += o);
  return r;
}
function de() {
  for (var e, t, o = 0, r = "", i = arguments.length; o < i; o++) (e = arguments[o]) && (t = zu(e)) && (r && (r += " "), r += t);
  return r;
}
function Gg(e = {}) {
  const {
    themeId: t,
    defaultTheme: o,
    defaultClassName: r = "MuiBox-root",
    generateClassName: i
  } = e, s = $u("div", {
    shouldForwardProp: (c) => c !== "theme" && c !== "sx" && c !== "as"
  })(Ro);
  return /* @__PURE__ */ b.forwardRef(function(d, p) {
    const m = Is(o), {
      className: y,
      component: x = "div",
      ...f
    } = d;
    return /* @__PURE__ */ l(s, {
      as: x,
      ref: p,
      className: de(y, i ? i(r) : r),
      theme: t && m[t] || m,
      ...f
    });
  });
}
const qg = {
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
function Se(e, t, o = "Mui") {
  const r = qg[t];
  return r ? `${o}-${r}` : `${Wu.generate(e)}-${t}`;
}
function we(e, t, o = "Mui") {
  const r = {};
  return t.forEach((i) => {
    r[i] = Se(e, i, o);
  }), r;
}
function Vu(e, t = "") {
  return e.displayName || e.name || t;
}
function Gc(e, t, o) {
  const r = Vu(t);
  return e.displayName || (r !== "" ? `${o}(${r})` : o);
}
function Kg(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return Vu(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Eo.ForwardRef:
          return Gc(e, e.render, "ForwardRef");
        case Eo.Memo:
          return Gc(e, e.type, "memo");
        default:
          return;
      }
  }
}
function Uu(e) {
  const {
    variants: t,
    ...o
  } = e, r = {
    variants: t,
    style: ao(o),
    isProcessed: !0
  };
  return r.style === o || t && t.forEach((i) => {
    typeof i.style != "function" && (i.style = ao(i.style));
  }), r;
}
const Yg = ai();
function ca(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
function Co(e, t) {
  return t && e && typeof e == "object" && e.styles && !e.styles.startsWith("@layer") && (e.styles = `@layer ${t}{${String(e.styles)}}`), e;
}
function Xg(e) {
  return e ? (t, o) => o[e] : null;
}
function Jg(e, t, o) {
  e.theme = Du(e.theme) ? o : e.theme[t] || e.theme;
}
function Gi(e, t, o) {
  const r = typeof t == "function" ? t(e) : t;
  if (Array.isArray(r))
    return r.flatMap((i) => Gi(e, i, o));
  if (Array.isArray(r == null ? void 0 : r.variants)) {
    let i;
    if (r.isProcessed)
      i = o ? Co(r.style, o) : r.style;
    else {
      const {
        variants: s,
        ...a
      } = r;
      i = o ? Co(ao(a), o) : a;
    }
    return Hu(e, r.variants, [i], o);
  }
  return r != null && r.isProcessed ? o ? Co(ao(r.style), o) : r.style : o ? Co(ao(r), o) : r;
}
function Hu(e, t, o = [], r = void 0) {
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
      for (const d in c.props)
        if (e[d] !== c.props[d] && ((s = e.ownerState) == null ? void 0 : s[d]) !== c.props[d])
          continue e;
    typeof c.style == "function" ? (i ?? (i = {
      ...e,
      ...e.ownerState,
      ownerState: e.ownerState
    }), o.push(r ? Co(ao(c.style(i)), r) : c.style(i))) : o.push(r ? Co(ao(c.style), r) : c.style);
  }
  return o;
}
function Gu(e = {}) {
  const {
    themeId: t,
    defaultTheme: o = Yg,
    rootShouldForwardProp: r = ca,
    slotShouldForwardProp: i = ca
  } = e;
  function s(c) {
    Jg(c, t, o);
  }
  return (c, d = {}) => {
    Wh(c, (N) => N.filter((A) => A !== Ro));
    const {
      name: p,
      slot: m,
      skipVariantsResolver: y,
      skipSx: x,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: f = Xg(qu(m)),
      ...v
    } = d, h = p && p.startsWith("Mui") || m ? "components" : "custom", w = y !== void 0 ? y : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      m && m !== "Root" && m !== "root" || !1
    ), O = x || !1;
    let k = ca;
    m === "Root" || m === "root" ? k = r : m ? k = i : eb(c) && (k = void 0);
    const E = $u(c, {
      shouldForwardProp: k,
      label: Zg(p, m),
      ...v
    }), C = (N) => {
      if (N.__emotion_real === N)
        return N;
      if (typeof N == "function")
        return function(_) {
          return Gi(_, N, _.theme.modularCssLayers ? h : void 0);
        };
      if (Xn(N)) {
        const A = Uu(N);
        return function(D) {
          return A.variants ? Gi(D, A, D.theme.modularCssLayers ? h : void 0) : D.theme.modularCssLayers ? Co(A.style, h) : A.style;
        };
      }
      return N;
    }, S = (...N) => {
      const A = [], _ = N.map(C), D = [];
      if (A.push(s), p && f && D.push(function($) {
        var W, G;
        const M = (G = (W = $.theme.components) == null ? void 0 : W[p]) == null ? void 0 : G.styleOverrides;
        if (!M)
          return null;
        const B = {};
        for (const oe in M)
          B[oe] = Gi($, M[oe], $.theme.modularCssLayers ? "theme" : void 0);
        return f($, B);
      }), p && !w && D.push(function($) {
        var B, W;
        const I = $.theme, M = (W = (B = I == null ? void 0 : I.components) == null ? void 0 : B[p]) == null ? void 0 : W.variants;
        return M ? Hu($, M, [], $.theme.modularCssLayers ? "theme" : void 0) : null;
      }), O || D.push(Ro), Array.isArray(_[0])) {
        const g = _.shift(), $ = new Array(A.length).fill(""), I = new Array(D.length).fill("");
        let M;
        M = [...$, ...g, ...I], M.raw = [...$, ...g.raw, ...I], A.unshift(M);
      }
      const F = [...A, ..._, ...D], P = E(...F);
      return c.muiName && (P.muiName = c.muiName), process.env.NODE_ENV !== "production" && (P.displayName = Qg(p, m, c)), P;
    };
    return E.withConfig && (S.withConfig = E.withConfig), S;
  };
}
function Qg(e, t, o) {
  return e ? `${e}${Ce(t || "")}` : `Styled(${Kg(o)})`;
}
function Zg(e, t) {
  let o;
  return process.env.NODE_ENV !== "production" && e && (o = `${e}-${qu(t || "Root")}`), o;
}
function eb(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function qu(e) {
  return e && e.charAt(0).toLowerCase() + e.slice(1);
}
const Ku = Gu();
function qr(e, t, o = !1) {
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
          for (const d in a)
            if (Object.prototype.hasOwnProperty.call(a, d)) {
              const p = d;
              r[s][p] = qr(a[p], c[p], o);
            }
        }
      } else s === "className" && o && t.className !== void 0 ? r.className = de(e == null ? void 0 : e.className, t == null ? void 0 : t.className) : s === "style" && o && t.style ? r.style = {
        ...e == null ? void 0 : e.style,
        ...t == null ? void 0 : t.style
      } : r[s] === void 0 && (r[s] = e[s]);
    }
  return r;
}
function tb(e) {
  const {
    theme: t,
    name: o,
    props: r
  } = e;
  return !t || !t.components || !t.components[o] || !t.components[o].defaultProps ? r : qr(t.components[o].defaultProps, r);
}
function Yu({
  props: e,
  name: t,
  defaultTheme: o,
  themeId: r
}) {
  let i = Is(o);
  return r && (i = i[r] || i), tb({
    theme: i,
    name: t,
    props: e
  });
}
const Nt = typeof window < "u" ? b.useLayoutEffect : b.useEffect;
function nb(e, t = Number.MIN_SAFE_INTEGER, o = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, o));
}
function cl(e, t = 0, o = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > o) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${o}].`), nb(e, t, o);
}
function ob(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let o = e.match(t);
  return o && o[0].length === 1 && (o = o.map((r) => r + r)), process.env.NODE_ENV !== "production" && e.length !== e.trim().length && console.error(`MUI: The color: "${e}" is invalid. Make sure the color input doesn't contain leading/trailing space.`), o ? `rgb${o.length === 4 ? "a" : ""}(${o.map((r, i) => i < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function co(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return co(ob(e));
  const t = e.indexOf("("), o = e.substring(0, t);
  if (!["rgb", "rgba", "hsl", "hsla", "color"].includes(o))
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : eo(9, e));
  let r = e.substring(t + 1, e.length - 1), i;
  if (o === "color") {
    if (r = r.split(" "), i = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), !["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].includes(i))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${i}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : eo(10, i));
  } else
    r = r.split(",");
  return r = r.map((s) => parseFloat(s)), {
    type: o,
    values: r,
    colorSpace: i
  };
}
const rb = (e) => {
  const t = co(e);
  return t.values.slice(0, 3).map((o, r) => t.type.includes("hsl") && r !== 0 ? `${o}%` : o).join(" ");
}, Mr = (e, t) => {
  try {
    return rb(e);
  } catch {
    return t && process.env.NODE_ENV !== "production" && console.warn(t), e;
  }
};
function $s(e) {
  const {
    type: t,
    colorSpace: o
  } = e;
  let {
    values: r
  } = e;
  return t.includes("rgb") ? r = r.map((i, s) => s < 3 ? parseInt(i, 10) : i) : t.includes("hsl") && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), t.includes("color") ? r = `${o} ${r.join(" ")}` : r = `${r.join(", ")}`, `${t}(${r})`;
}
function Xu(e) {
  e = co(e);
  const {
    values: t
  } = e, o = t[0], r = t[1] / 100, i = t[2] / 100, s = r * Math.min(i, 1 - i), a = (p, m = (p + o / 30) % 12) => i - s * Math.max(Math.min(m - 3, 9 - m, 1), -1);
  let c = "rgb";
  const d = [Math.round(a(0) * 255), Math.round(a(8) * 255), Math.round(a(4) * 255)];
  return e.type === "hsla" && (c += "a", d.push(t[3])), $s({
    type: c,
    values: d
  });
}
function Na(e) {
  e = co(e);
  let t = e.type === "hsl" || e.type === "hsla" ? co(Xu(e)).values : e.values;
  return t = t.map((o) => (e.type !== "color" && (o /= 255), o <= 0.03928 ? o / 12.92 : ((o + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function qc(e, t) {
  const o = Na(e), r = Na(t);
  return (Math.max(o, r) + 0.05) / (Math.min(o, r) + 0.05);
}
function Zi(e, t) {
  return e = co(e), t = cl(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, $s(e);
}
function go(e, t, o) {
  try {
    return Zi(e, t);
  } catch {
    return o && process.env.NODE_ENV !== "production" && console.warn(o), e;
  }
}
function Ms(e, t) {
  if (e = co(e), t = cl(t), e.type.includes("hsl"))
    e.values[2] *= 1 - t;
  else if (e.type.includes("rgb") || e.type.includes("color"))
    for (let o = 0; o < 3; o += 1)
      e.values[o] *= 1 - t;
  return $s(e);
}
function nt(e, t, o) {
  try {
    return Ms(e, t);
  } catch {
    return o && process.env.NODE_ENV !== "production" && console.warn(o), e;
  }
}
function As(e, t) {
  if (e = co(e), t = cl(t), e.type.includes("hsl"))
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.includes("rgb"))
    for (let o = 0; o < 3; o += 1)
      e.values[o] += (255 - e.values[o]) * t;
  else if (e.type.includes("color"))
    for (let o = 0; o < 3; o += 1)
      e.values[o] += (1 - e.values[o]) * t;
  return $s(e);
}
function ot(e, t, o) {
  try {
    return As(e, t);
  } catch {
    return o && process.env.NODE_ENV !== "production" && console.warn(o), e;
  }
}
function ib(e, t = 0.15) {
  return Na(e) > 0.5 ? Ms(e, t) : As(e, t);
}
function wi(e, t, o) {
  try {
    return ib(e, t);
  } catch {
    return e;
  }
}
const sb = "exact-prop: ​";
function _s(e) {
  return process.env.NODE_ENV === "production" ? e : {
    ...e,
    [sb]: (t) => {
      const o = Object.keys(t).filter((r) => !e.hasOwnProperty(r));
      return o.length > 0 ? new Error(`The following props are not supported: ${o.map((r) => `\`${r}\``).join(", ")}. Please remove them.`) : null;
    }
  };
}
const dl = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (dl.displayName = "ThemeContext");
function ul() {
  const e = b.useContext(dl);
  return process.env.NODE_ENV !== "production" && b.useDebugValue(e), e;
}
const ab = typeof Symbol == "function" && Symbol.for, lb = ab ? Symbol.for("mui.nested") : "__THEME_NESTED__";
function cb(e, t) {
  if (typeof t == "function") {
    const o = t(e);
    return process.env.NODE_ENV !== "production" && (o || console.error(["MUI: You should return an object from your theme function, i.e.", "<ThemeProvider theme={() => ({})} />"].join(`
`))), o;
  }
  return {
    ...e,
    ...t
  };
}
function es(e) {
  const {
    children: t,
    theme: o
  } = e, r = ul();
  process.env.NODE_ENV !== "production" && r === null && typeof o == "function" && console.error(["MUI: You are providing a theme function prop to the ThemeProvider component:", "<ThemeProvider theme={outerTheme => outerTheme} />", "", "However, no outer theme is present.", "Make sure a theme is already injected higher in the React tree or provide a theme object."].join(`
`));
  const i = b.useMemo(() => {
    const s = r === null ? {
      ...o
    } : cb(r, o);
    return s != null && (s[lb] = r !== null), s;
  }, [o, r]);
  return /* @__PURE__ */ l(dl.Provider, {
    value: i,
    children: t
  });
}
process.env.NODE_ENV !== "production" && (es.propTypes = {
  /**
   * Your component tree.
   */
  children: n.node,
  /**
   * A theme object. You can provide a function to extend the outer theme.
   */
  theme: n.oneOfType([n.object, n.func]).isRequired
});
process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "production" && (es.propTypes = _s(es.propTypes));
const Ju = /* @__PURE__ */ b.createContext();
function Qu({
  value: e,
  ...t
}) {
  return /* @__PURE__ */ l(Ju.Provider, {
    value: e ?? !0,
    ...t
  });
}
process.env.NODE_ENV !== "production" && (Qu.propTypes = {
  children: n.node,
  value: n.bool
});
const Ds = () => b.useContext(Ju) ?? !1, Zu = /* @__PURE__ */ b.createContext(void 0);
function ep({
  value: e,
  children: t
}) {
  return /* @__PURE__ */ l(Zu.Provider, {
    value: e,
    children: t
  });
}
process.env.NODE_ENV !== "production" && (ep.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: n.node,
  /**
   * @ignore
   */
  value: n.object
});
function db(e) {
  const {
    theme: t,
    name: o,
    props: r
  } = e;
  if (!t || !t.components || !t.components[o])
    return r;
  const i = t.components[o];
  return i.defaultProps ? qr(i.defaultProps, r, t.components.mergeClassNameAndStyle) : !i.styleOverrides && !i.variants ? qr(i, r, t.components.mergeClassNameAndStyle) : r;
}
function ub({
  props: e,
  name: t
}) {
  const o = b.useContext(Zu);
  return db({
    props: e,
    name: t,
    theme: {
      components: o
    }
  });
}
let Kc = 0;
function pb(e) {
  const [t, o] = b.useState(e), r = e || t;
  return b.useEffect(() => {
    t == null && (Kc += 1, o(`mui-${Kc}`));
  }, [t]), r;
}
const fb = {
  ...b
}, Yc = fb.useId;
function to(e) {
  if (Yc !== void 0) {
    const t = Yc();
    return e ?? t;
  }
  return pb(e);
}
function mb(e) {
  const t = al(), o = to() || "", {
    modularCssLayers: r
  } = e;
  let i = "mui.global, mui.components, mui.theme, mui.custom, mui.sx";
  return !r || t !== null ? i = "" : typeof r == "string" ? i = r.replace(/mui(?!\.)/g, i) : i = `@layer ${i};`, Nt(() => {
    var c, d;
    const s = document.querySelector("head");
    if (!s)
      return;
    const a = s.firstChild;
    if (i) {
      if (a && ((c = a.hasAttribute) != null && c.call(a, "data-mui-layer-order")) && a.getAttribute("data-mui-layer-order") === o)
        return;
      const p = document.createElement("style");
      p.setAttribute("data-mui-layer-order", o), p.textContent = i, s.prepend(p);
    } else
      (d = s.querySelector(`style[data-mui-layer-order="${o}"]`)) == null || d.remove();
  }, [i, o]), i ? /* @__PURE__ */ l(ll, {
    styles: i
  }) : null;
}
const Xc = {};
function Jc(e, t, o, r = !1) {
  return b.useMemo(() => {
    const i = e && t[e] || t;
    if (typeof o == "function") {
      const s = o(i), a = e ? {
        ...t,
        [e]: s
      } : s;
      return r ? () => a : a;
    }
    return e ? {
      ...t,
      [e]: o
    } : {
      ...t,
      ...o
    };
  }, [e, t, o, r]);
}
function Kr(e) {
  const {
    children: t,
    theme: o,
    themeId: r
  } = e, i = al(Xc), s = ul() || Xc;
  process.env.NODE_ENV !== "production" && (i === null && typeof o == "function" || r && i && !i[r] && typeof o == "function") && console.error(["MUI: You are providing a theme function prop to the ThemeProvider component:", "<ThemeProvider theme={outerTheme => outerTheme} />", "", "However, no outer theme is present.", "Make sure a theme is already injected higher in the React tree or provide a theme object."].join(`
`));
  const a = Jc(r, i, o), c = Jc(r, s, o, !0), d = (r ? a[r] : a).direction === "rtl", p = mb(a);
  return /* @__PURE__ */ l(es, {
    theme: c,
    children: /* @__PURE__ */ l(ri.Provider, {
      value: a,
      children: /* @__PURE__ */ l(Qu, {
        value: d,
        children: /* @__PURE__ */ T(ep, {
          value: r ? a[r].components : a.components,
          children: [p, t]
        })
      })
    })
  });
}
process.env.NODE_ENV !== "production" && (Kr.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Your component tree.
   */
  children: n.node,
  /**
   * A theme object. You can provide a function to extend the outer theme.
   */
  theme: n.oneOfType([n.func, n.object]).isRequired,
  /**
   * The design system's unique id for getting the corresponded theme when there are multiple design systems.
   */
  themeId: n.string
});
process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "production" && (Kr.propTypes = _s(Kr.propTypes));
const Qc = {
  theme: void 0
};
function hb(e) {
  let t, o;
  return function(i) {
    let s = t;
    return (s === void 0 || i.theme !== o) && (Qc.theme = i.theme, s = Uu(e(Qc)), t = s, o = i.theme), s;
  };
}
const pl = "mode", fl = "color-scheme", gb = "data-color-scheme";
function bb(e) {
  const {
    defaultMode: t = "system",
    defaultLightColorScheme: o = "light",
    defaultDarkColorScheme: r = "dark",
    modeStorageKey: i = pl,
    colorSchemeStorageKey: s = fl,
    attribute: a = gb,
    colorSchemeNode: c = "document.documentElement",
    nonce: d
  } = e || {};
  let p = "", m = a;
  if (a === "class" && (m = ".%s"), a === "data" && (m = "[data-%s]"), m.startsWith(".")) {
    const x = m.substring(1);
    p += `${c}.classList.remove('${x}'.replace('%s', light), '${x}'.replace('%s', dark));
      ${c}.classList.add('${x}'.replace('%s', colorScheme));`;
  }
  const y = m.match(/\[([^[\]]+)\]/);
  if (y) {
    const [x, f] = y[1].split("=");
    f || (p += `${c}.removeAttribute('${x}'.replace('%s', light));
      ${c}.removeAttribute('${x}'.replace('%s', dark));`), p += `
      ${c}.setAttribute('${x}'.replace('%s', colorScheme), ${f ? `${f}.replace('%s', colorScheme)` : '""'});`;
  } else m !== ".%s" && (p += `${c}.setAttribute('${m}', colorScheme);`);
  return /* @__PURE__ */ l("script", {
    suppressHydrationWarning: !0,
    nonce: typeof window > "u" ? d : "",
    dangerouslySetInnerHTML: {
      __html: `(function() {
try {
  let colorScheme = '';
  const mode = localStorage.getItem('${i}') || '${t}';
  const dark = localStorage.getItem('${s}-dark') || '${r}';
  const light = localStorage.getItem('${s}-light') || '${o}';
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
function yb() {
}
const vb = ({
  key: e,
  storageWindow: t
}) => (!t && typeof window < "u" && (t = window), {
  get(o) {
    if (typeof window > "u")
      return;
    if (!t)
      return o;
    let r;
    try {
      r = t.localStorage.getItem(e);
    } catch {
    }
    return r || o;
  },
  set: (o) => {
    if (t)
      try {
        t.localStorage.setItem(e, o);
      } catch {
      }
  },
  subscribe: (o) => {
    if (!t)
      return yb;
    const r = (i) => {
      const s = i.newValue;
      i.key === e && o(s);
    };
    return t.addEventListener("storage", r), () => {
      t.removeEventListener("storage", r);
    };
  }
});
function da() {
}
function Zc(e) {
  if (typeof window < "u" && typeof window.matchMedia == "function" && e === "system")
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function tp(e, t) {
  if (e.mode === "light" || e.mode === "system" && e.systemMode === "light")
    return t("light");
  if (e.mode === "dark" || e.mode === "system" && e.systemMode === "dark")
    return t("dark");
}
function xb(e) {
  return tp(e, (t) => {
    if (t === "light")
      return e.lightColorScheme;
    if (t === "dark")
      return e.darkColorScheme;
  });
}
function Sb(e) {
  const {
    defaultMode: t = "light",
    defaultLightColorScheme: o,
    defaultDarkColorScheme: r,
    supportedColorSchemes: i = [],
    modeStorageKey: s = pl,
    colorSchemeStorageKey: a = fl,
    storageWindow: c = typeof window > "u" ? void 0 : window,
    storageManager: d = vb,
    noSsr: p = !1
  } = e, m = i.join(","), y = i.length > 1, x = b.useMemo(() => d == null ? void 0 : d({
    key: s,
    storageWindow: c
  }), [d, s, c]), f = b.useMemo(() => d == null ? void 0 : d({
    key: `${a}-light`,
    storageWindow: c
  }), [d, a, c]), v = b.useMemo(() => d == null ? void 0 : d({
    key: `${a}-dark`,
    storageWindow: c
  }), [d, a, c]), [h, w] = b.useState(() => {
    const _ = (x == null ? void 0 : x.get(t)) || t, D = (f == null ? void 0 : f.get(o)) || o, F = (v == null ? void 0 : v.get(r)) || r;
    return {
      mode: _,
      systemMode: Zc(_),
      lightColorScheme: D,
      darkColorScheme: F
    };
  }), [O, k] = b.useState(p || !y);
  b.useEffect(() => {
    k(!0);
  }, []);
  const E = xb(h), C = b.useCallback((_) => {
    w((D) => {
      if (_ === D.mode)
        return D;
      const F = _ ?? t;
      return x == null || x.set(F), {
        ...D,
        mode: F,
        systemMode: Zc(F)
      };
    });
  }, [x, t]), S = b.useCallback((_) => {
    _ ? typeof _ == "string" ? _ && !m.includes(_) ? console.error(`\`${_}\` does not exist in \`theme.colorSchemes\`.`) : w((D) => {
      const F = {
        ...D
      };
      return tp(D, (P) => {
        P === "light" && (f == null || f.set(_), F.lightColorScheme = _), P === "dark" && (v == null || v.set(_), F.darkColorScheme = _);
      }), F;
    }) : w((D) => {
      const F = {
        ...D
      }, P = _.light === null ? o : _.light, g = _.dark === null ? r : _.dark;
      return P && (m.includes(P) ? (F.lightColorScheme = P, f == null || f.set(P)) : console.error(`\`${P}\` does not exist in \`theme.colorSchemes\`.`)), g && (m.includes(g) ? (F.darkColorScheme = g, v == null || v.set(g)) : console.error(`\`${g}\` does not exist in \`theme.colorSchemes\`.`)), F;
    }) : w((D) => (f == null || f.set(o), v == null || v.set(r), {
      ...D,
      lightColorScheme: o,
      darkColorScheme: r
    }));
  }, [m, f, v, o, r]), N = b.useCallback((_) => {
    h.mode === "system" && w((D) => {
      const F = _ != null && _.matches ? "dark" : "light";
      return D.systemMode === F ? D : {
        ...D,
        systemMode: F
      };
    });
  }, [h.mode]), A = b.useRef(N);
  return A.current = N, b.useEffect(() => {
    if (typeof window.matchMedia != "function" || !y)
      return;
    const _ = (...F) => A.current(...F), D = window.matchMedia("(prefers-color-scheme: dark)");
    return D.addListener(_), _(D), () => {
      D.removeListener(_);
    };
  }, [y]), b.useEffect(() => {
    if (y) {
      const _ = (x == null ? void 0 : x.subscribe((P) => {
        (!P || ["light", "dark", "system"].includes(P)) && C(P || t);
      })) || da, D = (f == null ? void 0 : f.subscribe((P) => {
        (!P || m.match(P)) && S({
          light: P
        });
      })) || da, F = (v == null ? void 0 : v.subscribe((P) => {
        (!P || m.match(P)) && S({
          dark: P
        });
      })) || da;
      return () => {
        _(), D(), F();
      };
    }
  }, [S, C, m, t, c, y, x, f, v]), {
    ...h,
    mode: O ? h.mode : void 0,
    systemMode: O ? h.systemMode : void 0,
    colorScheme: O ? E : void 0,
    setMode: C,
    setColorScheme: S
  };
}
const Cb = "*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";
function wb(e) {
  const {
    themeId: t,
    /**
     * This `theme` object needs to follow a certain structure to
     * be used correctly by the finel `CssVarsProvider`. It should have a
     * `colorSchemes` key with the light and dark (and any other) palette.
     * It should also ideally have a vars object created using `prepareCssVars`.
     */
    theme: o = {},
    modeStorageKey: r = pl,
    colorSchemeStorageKey: i = fl,
    disableTransitionOnChange: s = !1,
    defaultColorScheme: a,
    resolveTheme: c
  } = e, d = {
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
  }, p = /* @__PURE__ */ b.createContext(void 0);
  process.env.NODE_ENV !== "production" && (p.displayName = "ColorSchemeContext");
  const m = () => b.useContext(p) || d, y = {}, x = {};
  function f(O) {
    var ut, De, tt, We;
    const {
      children: k,
      theme: E,
      modeStorageKey: C = r,
      colorSchemeStorageKey: S = i,
      disableTransitionOnChange: N = s,
      storageManager: A,
      storageWindow: _ = typeof window > "u" ? void 0 : window,
      documentNode: D = typeof document > "u" ? void 0 : document,
      colorSchemeNode: F = typeof document > "u" ? void 0 : document.documentElement,
      disableNestedContext: P = !1,
      disableStyleSheetGeneration: g = !1,
      defaultMode: $ = "system",
      forceThemeRerender: I = !1,
      noSsr: M
    } = O, B = b.useRef(!1), W = ul(), G = b.useContext(p), oe = !!G && !P, z = b.useMemo(() => E || (typeof o == "function" ? o() : o), [E]), V = z[t], Y = V || z, {
      colorSchemes: ne = y,
      components: te = x,
      cssVarPrefix: re
    } = Y, ee = Object.keys(ne).filter((ue) => !!ne[ue]).join(","), K = b.useMemo(() => ee.split(","), [ee]), U = typeof a == "string" ? a : a.light, X = typeof a == "string" ? a : a.dark, Z = ne[U] && ne[X] ? $ : ((De = (ut = ne[Y.defaultColorScheme]) == null ? void 0 : ut.palette) == null ? void 0 : De.mode) || ((tt = Y.palette) == null ? void 0 : tt.mode), {
      mode: ae,
      setMode: j,
      systemMode: me,
      lightColorScheme: Q,
      darkColorScheme: fe,
      colorScheme: Ie,
      setColorScheme: xe
    } = Sb({
      supportedColorSchemes: K,
      defaultLightColorScheme: U,
      defaultDarkColorScheme: X,
      modeStorageKey: C,
      colorSchemeStorageKey: S,
      defaultMode: Z,
      storageManager: A,
      storageWindow: _,
      noSsr: M
    });
    let Be = ae, ye = Ie;
    oe && (Be = G.mode, ye = G.colorScheme), process.env.NODE_ENV !== "production" && I && !Y.vars && console.warn(["MUI: The `forceThemeRerender` prop should only be used with CSS theme variables.", "Note that it will slow down the app when changing between modes, so only do this when you cannot find a better solution."].join(`
`));
    let Ge = ye || Y.defaultColorScheme;
    Y.vars && !I && (Ge = Y.defaultColorScheme);
    const Me = b.useMemo(() => {
      var ze;
      const ue = ((ze = Y.generateThemeVars) == null ? void 0 : ze.call(Y)) || Y.vars, Ae = {
        ...Y,
        components: te,
        colorSchemes: ne,
        cssVarPrefix: re,
        vars: ue
      };
      if (typeof Ae.generateSpacing == "function" && (Ae.spacing = Ae.generateSpacing()), Ge) {
        const pt = ne[Ge];
        pt && typeof pt == "object" && Object.keys(pt).forEach(($e) => {
          pt[$e] && typeof pt[$e] == "object" ? Ae[$e] = {
            ...Ae[$e],
            ...pt[$e]
          } : Ae[$e] = pt[$e];
        });
      }
      return c ? c(Ae) : Ae;
    }, [Y, Ge, te, ne, re]), Fe = Y.colorSchemeSelector;
    Nt(() => {
      if (ye && F && Fe && Fe !== "media") {
        const ue = Fe;
        let Ae = Fe;
        if (ue === "class" && (Ae = ".%s"), ue === "data" && (Ae = "[data-%s]"), ue != null && ue.startsWith("data-") && !ue.includes("%s") && (Ae = `[${ue}="%s"]`), Ae.startsWith("."))
          F.classList.remove(...K.map((ze) => Ae.substring(1).replace("%s", ze))), F.classList.add(Ae.substring(1).replace("%s", ye));
        else {
          const ze = Ae.replace("%s", ye).match(/\[([^\]]+)\]/);
          if (ze) {
            const [pt, $e] = ze[1].split("=");
            $e || K.forEach(($t) => {
              F.removeAttribute(pt.replace(ye, $t));
            }), F.setAttribute(pt, $e ? $e.replace(/"|'/g, "") : "");
          } else
            F.setAttribute(Ae, ye);
        }
      }
    }, [ye, Fe, F, K]), b.useEffect(() => {
      let ue;
      if (N && B.current && D) {
        const Ae = D.createElement("style");
        Ae.appendChild(D.createTextNode(Cb)), D.head.appendChild(Ae), window.getComputedStyle(D.body), ue = setTimeout(() => {
          D.head.removeChild(Ae);
        }, 1);
      }
      return () => {
        clearTimeout(ue);
      };
    }, [ye, N, D]), b.useEffect(() => (B.current = !0, () => {
      B.current = !1;
    }), []);
    const rt = b.useMemo(() => ({
      allColorSchemes: K,
      colorScheme: ye,
      darkColorScheme: fe,
      lightColorScheme: Q,
      mode: Be,
      setColorScheme: xe,
      setMode: process.env.NODE_ENV === "production" ? j : (ue) => {
        Me.colorSchemeSelector === "media" && console.error(["MUI: The `setMode` function has no effect if `colorSchemeSelector` is `media` (`media` is the default value).", "To toggle the mode manually, please configure `colorSchemeSelector` to use a class or data attribute.", "To learn more, visit https://mui.com/material-ui/customization/css-theme-variables/configuration/#toggling-dark-mode-manually"].join(`
`)), j(ue);
      },
      systemMode: me
    }), [K, ye, fe, Q, Be, xe, j, me, Me.colorSchemeSelector]);
    let ke = !0;
    (g || Y.cssVariables === !1 || oe && (W == null ? void 0 : W.cssVarPrefix) === re) && (ke = !1);
    const Ue = /* @__PURE__ */ T(b.Fragment, {
      children: [/* @__PURE__ */ l(Kr, {
        themeId: V ? t : void 0,
        theme: Me,
        children: k
      }), ke && /* @__PURE__ */ l(il, {
        styles: ((We = Me.generateStyleSheets) == null ? void 0 : We.call(Me)) || []
      })]
    });
    return oe ? Ue : /* @__PURE__ */ l(p.Provider, {
      value: rt,
      children: Ue
    });
  }
  process.env.NODE_ENV !== "production" && (f.propTypes = {
    /**
     * The component tree.
     */
    children: n.node,
    /**
     * The node used to attach the color-scheme attribute
     */
    colorSchemeNode: n.any,
    /**
     * localStorage key used to store `colorScheme`
     */
    colorSchemeStorageKey: n.string,
    /**
     * The default mode when the storage is empty,
     * require the theme to have `colorSchemes` with light and dark.
     */
    defaultMode: n.string,
    /**
     * If `true`, the provider creates its own context and generate stylesheet as if it is a root `CssVarsProvider`.
     */
    disableNestedContext: n.bool,
    /**
     * If `true`, the style sheet won't be generated.
     *
     * This is useful for controlling nested CssVarsProvider behavior.
     */
    disableStyleSheetGeneration: n.bool,
    /**
     * Disable CSS transitions when switching between modes or color schemes.
     */
    disableTransitionOnChange: n.bool,
    /**
     * The document to attach the attribute to.
     */
    documentNode: n.any,
    /**
     * If `true`, theme values are recalculated when the mode changes.
     */
    forceThemeRerender: n.bool,
    /**
     * The key in the local storage used to store current color scheme.
     */
    modeStorageKey: n.string,
    /**
     * If `true`, the mode will be the same value as the storage without an extra rerendering after the hydration.
     * You should use this option in conjunction with `InitColorSchemeScript` component.
     */
    noSsr: n.bool,
    /**
     * The storage manager to be used for storing the mode and color scheme
     * @default using `window.localStorage`
     */
    storageManager: n.func,
    /**
     * The window that attaches the 'storage' event listener.
     * @default window
     */
    storageWindow: n.any,
    /**
     * The calculated theme object that will be passed through context.
     */
    theme: n.object
  });
  const v = typeof a == "string" ? a : a.light, h = typeof a == "string" ? a : a.dark;
  return {
    CssVarsProvider: f,
    useColorScheme: m,
    getInitColorSchemeScript: (O) => bb({
      colorSchemeStorageKey: i,
      defaultLightColorScheme: v,
      defaultDarkColorScheme: h,
      modeStorageKey: r,
      ...O
    })
  };
}
function Tb(e = "") {
  function t(...r) {
    if (!r.length)
      return "";
    const i = r[0];
    return typeof i == "string" && !i.match(/(#|\(|\)|(-?(\d*\.)?\d+)(px|em|%|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc))|^(-?(\d*\.)?\d+)$|(\d+ \d+ \d+)/) ? `, var(--${e ? `${e}-` : ""}${i}${t(...r.slice(1))})` : `, ${i}`;
  }
  return (r, ...i) => `var(--${e ? `${e}-` : ""}${r}${t(...i)})`;
}
const ed = (e, t, o, r = []) => {
  let i = e;
  t.forEach((s, a) => {
    a === t.length - 1 ? Array.isArray(i) ? i[Number(s)] = o : i && typeof i == "object" && (i[s] = o) : i && typeof i == "object" && (i[s] || (i[s] = r.includes(s) ? [] : {}), i = i[s]);
  });
}, Eb = (e, t, o) => {
  function r(i, s = [], a = []) {
    Object.entries(i).forEach(([c, d]) => {
      (!o || o && !o([...s, c])) && d != null && (typeof d == "object" && Object.keys(d).length > 0 ? r(d, [...s, c], Array.isArray(d) ? [...a, c] : a) : t([...s, c], d, a));
    });
  }
  r(e);
}, Ob = (e, t) => typeof t == "number" ? ["lineHeight", "fontWeight", "opacity", "zIndex"].some((r) => e.includes(r)) || e[e.length - 1].toLowerCase().includes("opacity") ? t : `${t}px` : t;
function ua(e, t) {
  const {
    prefix: o,
    shouldSkipGeneratingVar: r
  } = t || {}, i = {}, s = {}, a = {};
  return Eb(
    e,
    (c, d, p) => {
      if ((typeof d == "string" || typeof d == "number") && (!r || !r(c, d))) {
        const m = `--${o ? `${o}-` : ""}${c.join("-")}`, y = Ob(c, d);
        Object.assign(i, {
          [m]: y
        }), ed(s, c, `var(${m})`, p), ed(a, c, `var(${m}, ${y})`, p);
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
function Rb(e, t = {}) {
  const {
    getSelector: o = O,
    disableCssColorScheme: r,
    colorSchemeSelector: i,
    enableContrastVars: s
  } = t, {
    colorSchemes: a = {},
    components: c,
    defaultColorScheme: d = "light",
    ...p
  } = e, {
    vars: m,
    css: y,
    varsWithDefaults: x
  } = ua(p, t);
  let f = x;
  const v = {}, {
    [d]: h,
    ...w
  } = a;
  if (Object.entries(w || {}).forEach(([C, S]) => {
    const {
      vars: N,
      css: A,
      varsWithDefaults: _
    } = ua(S, t);
    f = Dt(f, _), v[C] = {
      css: A,
      vars: N
    };
  }), h) {
    const {
      css: C,
      vars: S,
      varsWithDefaults: N
    } = ua(h, t);
    f = Dt(f, N), v[d] = {
      css: C,
      vars: S
    };
  }
  function O(C, S) {
    var A, _;
    let N = i;
    if (i === "class" && (N = ".%s"), i === "data" && (N = "[data-%s]"), i != null && i.startsWith("data-") && !i.includes("%s") && (N = `[${i}="%s"]`), C) {
      if (N === "media")
        return e.defaultColorScheme === C ? ":root" : {
          [`@media (prefers-color-scheme: ${((_ = (A = a[C]) == null ? void 0 : A.palette) == null ? void 0 : _.mode) || C})`]: {
            ":root": S
          }
        };
      if (N)
        return e.defaultColorScheme === C ? `:root, ${N.replace("%s", String(C))}` : N.replace("%s", String(C));
    }
    return ":root";
  }
  return {
    vars: f,
    generateThemeVars: () => {
      let C = {
        ...m
      };
      return Object.entries(v).forEach(([, {
        vars: S
      }]) => {
        C = Dt(C, S);
      }), C;
    },
    generateStyleSheets: () => {
      var D, F;
      const C = [], S = e.defaultColorScheme || "light";
      function N(P, g) {
        Object.keys(g).length && C.push(typeof P == "string" ? {
          [P]: {
            ...g
          }
        } : P);
      }
      N(o(void 0, {
        ...y
      }), y);
      const {
        [S]: A,
        ..._
      } = v;
      if (A) {
        const {
          css: P
        } = A, g = (F = (D = a[S]) == null ? void 0 : D.palette) == null ? void 0 : F.mode, $ = !r && g ? {
          colorScheme: g,
          ...P
        } : {
          ...P
        };
        N(o(S, {
          ...$
        }), $);
      }
      return Object.entries(_).forEach(([P, {
        css: g
      }]) => {
        var M, B;
        const $ = (B = (M = a[P]) == null ? void 0 : M.palette) == null ? void 0 : B.mode, I = !r && $ ? {
          colorScheme: $,
          ...g
        } : {
          ...g
        };
        N(o(P, {
          ...I
        }), I);
      }), s && C.push({
        ":root": {
          // use double underscore to indicate that these are private variables
          "--__l-threshold": "0.7",
          "--__l": "clamp(0, (l / var(--__l-threshold) - 1) * -infinity, 1)",
          "--__a": "clamp(0.87, (l / var(--__l-threshold) - 1) * -infinity, 1)"
          // 0.87 is the default alpha value for black text.
        }
      }), C;
    }
  };
}
function Nb(e) {
  return function(o) {
    return e === "media" ? (process.env.NODE_ENV !== "production" && o !== "light" && o !== "dark" && console.error(`MUI: @media (prefers-color-scheme) supports only 'light' or 'dark', but receive '${o}'.`), `@media (prefers-color-scheme: ${o})`) : e ? e.startsWith("data-") && !e.includes("%s") ? `[${e}="${o}"] &` : e === "class" ? `.${o} &` : e === "data" ? `[data-${o}] &` : `${e.replace("%s", o)} &` : "&";
  };
}
function Te(e, t, o = void 0) {
  const r = {};
  for (const i in e) {
    const s = e[i];
    let a = "", c = !0;
    for (let d = 0; d < s.length; d += 1) {
      const p = s[d];
      p && (a += (c === !0 ? "" : " ") + t(p), c = !1, o && o[p] && (a += " " + o[p]));
    }
    r[i] = a;
  }
  return r;
}
const kb = ai(), Pb = Ku("div", {
  name: "MuiContainer",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [t.root, t[`maxWidth${Ce(String(o.maxWidth))}`], o.fixed && t.fixed, o.disableGutters && t.disableGutters];
  }
}), Ib = (e) => Yu({
  props: e,
  name: "MuiContainer",
  defaultTheme: kb
}), $b = (e, t) => {
  const o = (d) => Se(t, d), {
    classes: r,
    fixed: i,
    disableGutters: s,
    maxWidth: a
  } = e, c = {
    root: ["root", a && `maxWidth${Ce(String(a))}`, i && "fixed", s && "disableGutters"]
  };
  return Te(c, o, r);
};
function Mb(e = {}) {
  const {
    // This will allow adding custom styled fn (for example for custom sx style function)
    createStyledComponent: t = Pb,
    useThemeProps: o = Ib,
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
  }) => c.fixed && Object.keys(a.breakpoints.values).reduce((d, p) => {
    const m = p, y = a.breakpoints.values[m];
    return y !== 0 && (d[a.breakpoints.up(m)] = {
      maxWidth: `${y}${a.breakpoints.unit}`
    }), d;
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
  })), s = /* @__PURE__ */ b.forwardRef(function(c, d) {
    const p = o(c), {
      className: m,
      component: y = "div",
      disableGutters: x = !1,
      fixed: f = !1,
      maxWidth: v = "lg",
      classes: h,
      ...w
    } = p, O = {
      ...p,
      component: y,
      disableGutters: x,
      fixed: f,
      maxWidth: v
    }, k = $b(O, r);
    return (
      // @ts-ignore theme is injected by the styled util
      /* @__PURE__ */ l(i, {
        as: y,
        ownerState: O,
        className: de(k.root, m),
        ref: d,
        ...w
      })
    );
  });
  return process.env.NODE_ENV !== "production" && (s.propTypes = {
    children: n.node,
    classes: n.object,
    className: n.string,
    component: n.elementType,
    disableGutters: n.bool,
    fixed: n.bool,
    maxWidth: n.oneOfType([n.oneOf(["xs", "sm", "md", "lg", "xl", !1]), n.string]),
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object])
  }), s;
}
function pa(e, t) {
  var o, r, i;
  return /* @__PURE__ */ b.isValidElement(e) && t.indexOf(
    // For server components `muiName` is available in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    e.type.muiName ?? ((i = (r = (o = e.type) == null ? void 0 : o._payload) == null ? void 0 : r.value) == null ? void 0 : i.muiName)
  ) !== -1;
}
const Ab = ai(), _b = Ku("div", {
  name: "MuiStack",
  slot: "Root"
});
function Db(e) {
  return Yu({
    props: e,
    name: "MuiStack",
    defaultTheme: Ab
  });
}
function Lb(e, t) {
  const o = b.Children.toArray(e).filter(Boolean);
  return o.reduce((r, i, s) => (r.push(i), s < o.length - 1 && r.push(/* @__PURE__ */ b.cloneElement(t, {
    key: `separator-${s}`
  })), r), []);
}
const Bb = (e) => ({
  row: "Left",
  "row-reverse": "Right",
  column: "Top",
  "column-reverse": "Bottom"
})[e], Fb = ({
  ownerState: e,
  theme: t
}) => {
  let o = {
    display: "flex",
    flexDirection: "column",
    ...lo({
      theme: t
    }, aa({
      values: e.direction,
      breakpoints: t.breakpoints.values
    }), (r) => ({
      flexDirection: r
    }))
  };
  if (e.spacing) {
    const r = Ts(t), i = Object.keys(t.breakpoints.values).reduce((d, p) => ((typeof e.spacing == "object" && e.spacing[p] != null || typeof e.direction == "object" && e.direction[p] != null) && (d[p] = !0), d), {}), s = aa({
      values: e.direction,
      base: i
    }), a = aa({
      values: e.spacing,
      base: i
    });
    typeof s == "object" && Object.keys(s).forEach((d, p, m) => {
      if (!s[d]) {
        const x = p > 0 ? s[m[p - 1]] : "column";
        s[d] = x;
      }
    }), o = Dt(o, lo({
      theme: t
    }, a, (d, p) => e.useFlexGap ? {
      gap: Oo(r, d)
    } : {
      // The useFlexGap={false} implement relies on each child to give up control of the margin.
      // We need to reset the margin to avoid double spacing.
      "& > :not(style):not(style)": {
        margin: 0
      },
      "& > :not(style) ~ :not(style)": {
        [`margin${Bb(p ? s[p] : e.direction)}`]: Oo(r, d)
      }
    }));
  }
  return o = rg(t.breakpoints, o), o;
};
function jb(e = {}) {
  const {
    // This will allow adding custom styled fn (for example for custom sx style function)
    createStyledComponent: t = _b,
    useThemeProps: o = Db,
    componentName: r = "MuiStack"
  } = e, i = () => Te({
    root: ["root"]
  }, (d) => Se(r, d), {}), s = t(Fb), a = /* @__PURE__ */ b.forwardRef(function(d, p) {
    const m = o(d), {
      component: y = "div",
      direction: x = "column",
      spacing: f = 0,
      divider: v,
      children: h,
      className: w,
      useFlexGap: O = !1,
      ...k
    } = m, E = {
      direction: x,
      spacing: f,
      useFlexGap: O
    }, C = i();
    return /* @__PURE__ */ l(s, {
      as: y,
      ownerState: E,
      ref: p,
      className: de(C.root, w),
      ...k,
      children: v ? Lb(h, v) : h
    });
  });
  return process.env.NODE_ENV !== "production" && (a.propTypes = {
    children: n.node,
    direction: n.oneOfType([n.oneOf(["column-reverse", "column", "row-reverse", "row"]), n.arrayOf(n.oneOf(["column-reverse", "column", "row-reverse", "row"])), n.object]),
    divider: n.node,
    spacing: n.oneOfType([n.arrayOf(n.oneOfType([n.number, n.string])), n.number, n.object, n.string]),
    sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object])
  }), a;
}
const jn = "$$material", Yr = {
  black: "#000",
  white: "#fff"
}, Wb = {
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
}, Mo = {
  50: "#f3e5f5",
  200: "#ce93d8",
  300: "#ba68c8",
  400: "#ab47bc",
  500: "#9c27b0",
  700: "#7b1fa2"
}, Ao = {
  300: "#e57373",
  400: "#ef5350",
  500: "#f44336",
  700: "#d32f2f",
  800: "#c62828"
}, wr = {
  300: "#ffb74d",
  400: "#ffa726",
  500: "#ff9800",
  700: "#f57c00",
  900: "#e65100"
}, _o = {
  50: "#e3f2fd",
  200: "#90caf9",
  400: "#42a5f5",
  700: "#1976d2",
  800: "#1565c0"
}, Do = {
  300: "#4fc3f7",
  400: "#29b6f6",
  500: "#03a9f4",
  700: "#0288d1",
  900: "#01579b"
}, Lo = {
  300: "#81c784",
  400: "#66bb6a",
  500: "#4caf50",
  700: "#388e3c",
  800: "#2e7d32",
  900: "#1b5e20"
};
function np() {
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
      paper: Yr.white,
      default: Yr.white
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
const op = np();
function rp() {
  return {
    text: {
      primary: Yr.white,
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
      active: Yr.white,
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
const ka = rp();
function td(e, t, o, r) {
  const i = r.light || r, s = r.dark || r * 1.5;
  e[t] || (e.hasOwnProperty(o) ? e[t] = e[o] : t === "light" ? e.light = As(e.main, i) : t === "dark" && (e.dark = Ms(e.main, s)));
}
function nd(e, t, o, r, i) {
  const s = i.light || i, a = i.dark || i * 1.5;
  t[o] || (t.hasOwnProperty(r) ? t[o] = t[r] : o === "light" ? t.light = `color-mix(in ${e}, ${t.main}, #fff ${(s * 100).toFixed(0)}%)` : o === "dark" && (t.dark = `color-mix(in ${e}, ${t.main}, #000 ${(a * 100).toFixed(0)}%)`));
}
function zb(e = "light") {
  return e === "dark" ? {
    main: _o[200],
    light: _o[50],
    dark: _o[400]
  } : {
    main: _o[700],
    light: _o[400],
    dark: _o[800]
  };
}
function Vb(e = "light") {
  return e === "dark" ? {
    main: Mo[200],
    light: Mo[50],
    dark: Mo[400]
  } : {
    main: Mo[500],
    light: Mo[300],
    dark: Mo[700]
  };
}
function Ub(e = "light") {
  return e === "dark" ? {
    main: Ao[500],
    light: Ao[300],
    dark: Ao[700]
  } : {
    main: Ao[700],
    light: Ao[400],
    dark: Ao[800]
  };
}
function Hb(e = "light") {
  return e === "dark" ? {
    main: Do[400],
    light: Do[300],
    dark: Do[700]
  } : {
    main: Do[700],
    light: Do[500],
    dark: Do[900]
  };
}
function Gb(e = "light") {
  return e === "dark" ? {
    main: Lo[400],
    light: Lo[300],
    dark: Lo[700]
  } : {
    main: Lo[800],
    light: Lo[500],
    dark: Lo[900]
  };
}
function qb(e = "light") {
  return e === "dark" ? {
    main: wr[400],
    light: wr[300],
    dark: wr[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: wr[500],
    dark: wr[900]
  };
}
function Kb(e) {
  return `oklch(from ${e} var(--__l) 0 h / var(--__a))`;
}
function ml(e) {
  const {
    mode: t = "light",
    contrastThreshold: o = 3,
    tonalOffset: r = 0.2,
    colorSpace: i,
    ...s
  } = e, a = e.primary || zb(t), c = e.secondary || Vb(t), d = e.error || Ub(t), p = e.info || Hb(t), m = e.success || Gb(t), y = e.warning || qb(t);
  function x(w) {
    if (i)
      return Kb(w);
    const O = qc(w, ka.text.primary) >= o ? ka.text.primary : op.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const k = qc(w, O);
      k < 3 && console.error([`MUI: The contrast ratio of ${k}:1 for ${O} on ${w}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return O;
  }
  const f = ({
    color: w,
    name: O,
    mainShade: k = 500,
    lightShade: E = 300,
    darkShade: C = 700
  }) => {
    if (w = {
      ...w
    }, !w.main && w[k] && (w.main = w[k]), !w.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${O ? ` (${O})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${k}\` property.` : eo(11, O ? ` (${O})` : "", k));
    if (typeof w.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${O ? ` (${O})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(w.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : eo(12, O ? ` (${O})` : "", JSON.stringify(w.main)));
    return i ? (nd(i, w, "light", E, r), nd(i, w, "dark", C, r)) : (td(w, "light", E, r), td(w, "dark", C, r)), w.contrastText || (w.contrastText = x(w.main)), w;
  };
  let v;
  return t === "light" ? v = np() : t === "dark" && (v = rp()), process.env.NODE_ENV !== "production" && (v || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), Dt({
    // A collection of common colors.
    common: {
      ...Yr
    },
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: t,
    // The colors used to represent primary interface elements for a user.
    primary: f({
      color: a,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: f({
      color: c,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: f({
      color: d,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: f({
      color: y,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: f({
      color: p,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: f({
      color: m,
      name: "success"
    }),
    // The grey colors.
    grey: Wb,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: o,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: x,
    // Generate a rich color object.
    augmentColor: f,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: r,
    // The light and dark mode object.
    ...v
  }, s);
}
function Yb(e) {
  const t = {};
  return Object.entries(e).forEach((r) => {
    const [i, s] = r;
    typeof s == "object" && (t[i] = `${s.fontStyle ? `${s.fontStyle} ` : ""}${s.fontVariant ? `${s.fontVariant} ` : ""}${s.fontWeight ? `${s.fontWeight} ` : ""}${s.fontStretch ? `${s.fontStretch} ` : ""}${s.fontSize || ""}${s.lineHeight ? `/${s.lineHeight} ` : ""}${s.fontFamily || ""}`);
  }), t;
}
function Xb(e, t) {
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
function Jb(e) {
  return Math.round(e * 1e5) / 1e5;
}
const od = {
  textTransform: "uppercase"
}, rd = '"Roboto", "Helvetica", "Arial", sans-serif';
function ip(e, t) {
  const {
    fontFamily: o = rd,
    // The default font size of the Material Specification.
    fontSize: r = 14,
    // px
    fontWeightLight: i = 300,
    fontWeightRegular: s = 400,
    fontWeightMedium: a = 500,
    fontWeightBold: c = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: d = 16,
    // Apply the CSS properties to all the variants.
    allVariants: p,
    pxToRem: m,
    ...y
  } = typeof t == "function" ? t(e) : t;
  process.env.NODE_ENV !== "production" && (typeof r != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof d != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const x = r / 14, f = m || ((w) => `${w / d * x}rem`), v = (w, O, k, E, C) => ({
    fontFamily: o,
    fontWeight: w,
    fontSize: f(O),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: k,
    // The letter spacing was designed for the Roboto font-family. Using the same letter-spacing
    // across font-families can cause issues with the kerning.
    ...o === rd ? {
      letterSpacing: `${Jb(E / O)}em`
    } : {},
    ...C,
    ...p
  }), h = {
    h1: v(i, 96, 1.167, -1.5),
    h2: v(i, 60, 1.2, -0.5),
    h3: v(s, 48, 1.167, 0),
    h4: v(s, 34, 1.235, 0.25),
    h5: v(s, 24, 1.334, 0),
    h6: v(a, 20, 1.6, 0.15),
    subtitle1: v(s, 16, 1.75, 0.15),
    subtitle2: v(a, 14, 1.57, 0.1),
    body1: v(s, 16, 1.5, 0.15),
    body2: v(s, 14, 1.43, 0.15),
    button: v(a, 14, 1.75, 0.4, od),
    caption: v(s, 12, 1.66, 0.4),
    overline: v(s, 12, 2.66, 1, od),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return Dt({
    htmlFontSize: d,
    pxToRem: f,
    fontFamily: o,
    fontSize: r,
    fontWeightLight: i,
    fontWeightRegular: s,
    fontWeightMedium: a,
    fontWeightBold: c,
    ...h
  }, y, {
    clone: !1
    // No need to clone deep
  });
}
const Qb = 0.2, Zb = 0.14, ey = 0.12;
function mt(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Qb})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Zb})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${ey})`].join(",");
}
const ty = ["none", mt(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), mt(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), mt(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), mt(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), mt(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), mt(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), mt(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), mt(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), mt(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), mt(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), mt(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), mt(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), mt(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), mt(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), mt(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), mt(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), mt(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), mt(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), mt(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), mt(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), mt(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), mt(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), mt(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), mt(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], ny = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, sp = {
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
function id(e) {
  return `${Math.round(e)}ms`;
}
function oy(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.min(Math.round((4 + 15 * t ** 0.25 + t / 5) * 10), 3e3);
}
function ry(e) {
  const t = {
    ...ny,
    ...e.easing
  }, o = {
    ...sp,
    ...e.duration
  };
  return {
    getAutoHeightDuration: oy,
    create: (i = ["all"], s = {}) => {
      const {
        duration: a = o.standard,
        easing: c = t.easeInOut,
        delay: d = 0,
        ...p
      } = s;
      if (process.env.NODE_ENV !== "production") {
        const m = (x) => typeof x == "string", y = (x) => !Number.isNaN(parseFloat(x));
        !m(i) && !Array.isArray(i) && console.error('MUI: Argument "props" must be a string or Array.'), !y(a) && !m(a) && console.error(`MUI: Argument "duration" must be a number or a string but found ${a}.`), m(c) || console.error('MUI: Argument "easing" must be a string.'), !y(d) && !m(d) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof s != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(p).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(p).join(",")}].`);
      }
      return (Array.isArray(i) ? i : [i]).map((m) => `${m} ${typeof a == "string" ? a : id(a)} ${c} ${typeof d == "string" ? d : id(d)}`).join(",");
    },
    ...e,
    easing: t,
    duration: o
  };
}
const iy = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};
function sy(e) {
  return Xn(e) || typeof e > "u" || typeof e == "string" || typeof e == "boolean" || typeof e == "number" || Array.isArray(e);
}
function ap(e = {}) {
  const t = {
    ...e
  };
  function o(r) {
    const i = Object.entries(r);
    for (let s = 0; s < i.length; s++) {
      const [a, c] = i[s];
      !sy(c) || a.startsWith("unstable_") || a.startsWith("internal_") ? delete r[a] : Xn(c) && (r[a] = {
        ...c
      }, o(r[a]));
    }
  }
  return o(t), `import { unstable_createBreakpoints as createBreakpoints, createTransitions } from '@mui/material/styles';

const theme = ${JSON.stringify(t, null, 2)};

theme.breakpoints = createBreakpoints(theme.breakpoints || {});
theme.transitions = createTransitions(theme.transitions || {});

export default theme;`;
}
function sd(e) {
  return typeof e == "number" ? `${(e * 100).toFixed(0)}%` : `calc((${e}) * 100%)`;
}
const ay = (e) => {
  if (!Number.isNaN(+e))
    return +e;
  const t = e.match(/\d*\.?\d+/g);
  if (!t)
    return 0;
  let o = 0;
  for (let r = 0; r < t.length; r += 1)
    o += +t[r];
  return o;
};
function ly(e) {
  Object.assign(e, {
    alpha(t, o) {
      const r = this || e;
      return r.colorSpace ? `oklch(from ${t} l c h / ${typeof o == "string" ? `calc(${o})` : o})` : r.vars ? `rgba(${t.replace(/var\(--([^,\s)]+)(?:,[^)]+)?\)+/g, "var(--$1Channel)")} / ${typeof o == "string" ? `calc(${o})` : o})` : Zi(t, ay(o));
    },
    lighten(t, o) {
      const r = this || e;
      return r.colorSpace ? `color-mix(in ${r.colorSpace}, ${t}, #fff ${sd(o)})` : As(t, o);
    },
    darken(t, o) {
      const r = this || e;
      return r.colorSpace ? `color-mix(in ${r.colorSpace}, ${t}, #000 ${sd(o)})` : Ms(t, o);
    }
  });
}
function Pa(e = {}, ...t) {
  const {
    breakpoints: o,
    mixins: r = {},
    spacing: i,
    palette: s = {},
    transitions: a = {},
    typography: c = {},
    shape: d,
    colorSpace: p,
    ...m
  } = e;
  if (e.vars && // The error should throw only for the root theme creation because user is not allowed to use a custom node `vars`.
  // `generateThemeVars` is the closest identifier for checking that the `options` is a result of `createTheme` with CSS variables so that user can create new theme for nested ThemeProvider.
  e.generateThemeVars === void 0)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name or follow the [docs](https://mui.com/material-ui/customization/css-theme-variables/usage/) to enable the feature." : eo(22));
  const y = ml({
    ...s,
    colorSpace: p
  }), x = ai(e);
  let f = Dt(x, {
    mixins: Xb(x.breakpoints, r),
    palette: y,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: ty.slice(),
    typography: ip(y, c),
    transitions: ry(a),
    zIndex: {
      ...iy
    }
  });
  if (f = Dt(f, m), f = t.reduce((v, h) => Dt(v, h), f), process.env.NODE_ENV !== "production") {
    const v = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], h = (w, O) => {
      let k;
      for (k in w) {
        const E = w[k];
        if (v.includes(k) && Object.keys(E).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const C = Se("", k);
            console.error([`MUI: The \`${O}\` component increases the CSS specificity of the \`${k}\` internal state.`, "You can not override it like this: ", JSON.stringify(w, null, 2), "", `Instead, you need to use the '&.${C}' syntax:`, JSON.stringify({
              root: {
                [`&.${C}`]: E
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          w[k] = {};
        }
      }
    };
    Object.keys(f.components).forEach((w) => {
      const O = f.components[w].styleOverrides;
      O && w.startsWith("Mui") && h(O, w);
    });
  }
  return f.unstable_sxConfig = {
    ...Ps,
    ...m == null ? void 0 : m.unstable_sxConfig
  }, f.unstable_sx = function(h) {
    return Ro({
      sx: h,
      theme: this
    });
  }, f.toRuntimeSource = ap, ly(f), f;
}
function Ia(e) {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, Math.round(t * 10) / 1e3;
}
const cy = [...Array(25)].map((e, t) => {
  if (t === 0)
    return "none";
  const o = Ia(t);
  return `linear-gradient(rgba(255 255 255 / ${o}), rgba(255 255 255 / ${o}))`;
});
function lp(e) {
  return {
    inputPlaceholder: e === "dark" ? 0.5 : 0.42,
    inputUnderline: e === "dark" ? 0.7 : 0.42,
    switchTrackDisabled: e === "dark" ? 0.2 : 0.12,
    switchTrack: e === "dark" ? 0.3 : 0.38
  };
}
function cp(e) {
  return e === "dark" ? cy : [];
}
function dy(e) {
  const {
    palette: t = {
      mode: "light"
    },
    // need to cast to avoid module augmentation test
    opacity: o,
    overlays: r,
    colorSpace: i,
    ...s
  } = e, a = ml({
    ...t,
    colorSpace: i
  });
  return {
    palette: a,
    opacity: {
      ...lp(a.mode),
      ...o
    },
    overlays: r || cp(a.mode),
    ...s
  };
}
function uy(e) {
  var t;
  return !!e[0].match(/(cssVarPrefix|colorSchemeSelector|modularCssLayers|rootSelector|typography|mixins|breakpoints|direction|transitions)/) || !!e[0].match(/sxConfig$/) || // ends with sxConfig
  e[0] === "palette" && !!((t = e[1]) != null && t.match(/(mode|contrastThreshold|tonalOffset)/));
}
const py = (e) => [...[...Array(25)].map((t, o) => `--${e ? `${e}-` : ""}overlays-${o}`), `--${e ? `${e}-` : ""}palette-AppBar-darkBg`, `--${e ? `${e}-` : ""}palette-AppBar-darkColor`], fy = (e) => (t, o) => {
  const r = e.rootSelector || ":root", i = e.colorSchemeSelector;
  let s = i;
  if (i === "class" && (s = ".%s"), i === "data" && (s = "[data-%s]"), i != null && i.startsWith("data-") && !i.includes("%s") && (s = `[${i}="%s"]`), e.defaultColorScheme === t) {
    if (t === "dark") {
      const a = {};
      return py(e.cssVarPrefix).forEach((c) => {
        a[c] = o[c], delete o[c];
      }), s === "media" ? {
        [r]: o,
        "@media (prefers-color-scheme: dark)": {
          [r]: a
        }
      } : s ? {
        [s.replace("%s", t)]: a,
        [`${r}, ${s.replace("%s", t)}`]: o
      } : {
        [r]: {
          ...o,
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
          [r]: o
        }
      };
    if (s)
      return s.replace("%s", String(t));
  }
  return r;
};
function my(e, t) {
  t.forEach((o) => {
    e[o] || (e[o] = {});
  });
}
function H(e, t, o) {
  !e[t] && o && (e[t] = o);
}
function Ar(e) {
  return typeof e != "string" || !e.startsWith("hsl") ? e : Xu(e);
}
function qn(e, t) {
  `${t}Channel` in e || (e[`${t}Channel`] = Mr(Ar(e[t]), `MUI: Can't create \`palette.${t}Channel\` because \`palette.${t}\` is not one of these formats: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().
To suppress this warning, you need to explicitly provide the \`palette.${t}Channel\` as a string (in rgb format, for example "12 12 12") or undefined if you want to remove the channel token.`));
}
function hy(e) {
  return typeof e == "number" ? `${e}px` : typeof e == "string" || typeof e == "function" || Array.isArray(e) ? e : "8px";
}
const Pn = (e) => {
  try {
    return e();
  } catch {
  }
}, gy = (e = "mui") => Tb(e);
function fa(e, t, o, r, i) {
  if (!o)
    return;
  o = o === !0 ? {} : o;
  const s = i === "dark" ? "dark" : "light";
  if (!r) {
    t[i] = dy({
      ...o,
      palette: {
        mode: s,
        ...o == null ? void 0 : o.palette
      },
      colorSpace: e
    });
    return;
  }
  const {
    palette: a,
    ...c
  } = Pa({
    ...r,
    palette: {
      mode: s,
      ...o == null ? void 0 : o.palette
    },
    colorSpace: e
  });
  return t[i] = {
    ...o,
    palette: a,
    opacity: {
      ...lp(s),
      ...o == null ? void 0 : o.opacity
    },
    overlays: (o == null ? void 0 : o.overlays) || cp(s)
  }, c;
}
function by(e = {}, ...t) {
  const {
    colorSchemes: o = {
      light: !0
    },
    defaultColorScheme: r,
    disableCssColorScheme: i = !1,
    cssVarPrefix: s = "mui",
    nativeColor: a = !1,
    shouldSkipGeneratingVar: c = uy,
    colorSchemeSelector: d = o.light && o.dark ? "media" : void 0,
    rootSelector: p = ":root",
    ...m
  } = e, y = Object.keys(o)[0], x = r || (o.light && y !== "light" ? "light" : y), f = gy(s), {
    [x]: v,
    light: h,
    dark: w,
    ...O
  } = o, k = {
    ...O
  };
  let E = v;
  if ((x === "dark" && !("dark" in o) || x === "light" && !("light" in o)) && (E = !0), !E)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The \`colorSchemes.${x}\` option is either missing or invalid.` : eo(21, x));
  let C;
  a && (C = "oklch");
  const S = fa(C, k, E, m, x);
  h && !k.light && fa(C, k, h, void 0, "light"), w && !k.dark && fa(C, k, w, void 0, "dark");
  let N = {
    defaultColorScheme: x,
    ...S,
    cssVarPrefix: s,
    colorSchemeSelector: d,
    rootSelector: p,
    getCssVar: f,
    colorSchemes: k,
    font: {
      ...Yb(S.typography),
      ...S.font
    },
    spacing: hy(m.spacing)
  };
  Object.keys(N.colorSchemes).forEach((P) => {
    const g = N.colorSchemes[P].palette, $ = (M) => {
      const B = M.split("-"), W = B[1], G = B[2];
      return f(M, g[W][G]);
    };
    g.mode === "light" && (H(g.common, "background", "#fff"), H(g.common, "onBackground", "#000")), g.mode === "dark" && (H(g.common, "background", "#000"), H(g.common, "onBackground", "#fff"));
    function I(M, B, W) {
      if (C) {
        let G;
        return M === go && (G = `transparent ${((1 - W) * 100).toFixed(0)}%`), M === nt && (G = `#000 ${(W * 100).toFixed(0)}%`), M === ot && (G = `#fff ${(W * 100).toFixed(0)}%`), `color-mix(in ${C}, ${B}, ${G})`;
      }
      return M(B, W);
    }
    if (my(g, ["Alert", "AppBar", "Avatar", "Button", "Chip", "FilledInput", "LinearProgress", "Skeleton", "Slider", "SnackbarContent", "SpeedDialAction", "StepConnector", "StepContent", "Switch", "TableCell", "Tooltip"]), g.mode === "light") {
      H(g.Alert, "errorColor", I(nt, a ? f("palette-error-light") : g.error.light, 0.6)), H(g.Alert, "infoColor", I(nt, a ? f("palette-info-light") : g.info.light, 0.6)), H(g.Alert, "successColor", I(nt, a ? f("palette-success-light") : g.success.light, 0.6)), H(g.Alert, "warningColor", I(nt, a ? f("palette-warning-light") : g.warning.light, 0.6)), H(g.Alert, "errorFilledBg", $("palette-error-main")), H(g.Alert, "infoFilledBg", $("palette-info-main")), H(g.Alert, "successFilledBg", $("palette-success-main")), H(g.Alert, "warningFilledBg", $("palette-warning-main")), H(g.Alert, "errorFilledColor", Pn(() => g.getContrastText(g.error.main))), H(g.Alert, "infoFilledColor", Pn(() => g.getContrastText(g.info.main))), H(g.Alert, "successFilledColor", Pn(() => g.getContrastText(g.success.main))), H(g.Alert, "warningFilledColor", Pn(() => g.getContrastText(g.warning.main))), H(g.Alert, "errorStandardBg", I(ot, a ? f("palette-error-light") : g.error.light, 0.9)), H(g.Alert, "infoStandardBg", I(ot, a ? f("palette-info-light") : g.info.light, 0.9)), H(g.Alert, "successStandardBg", I(ot, a ? f("palette-success-light") : g.success.light, 0.9)), H(g.Alert, "warningStandardBg", I(ot, a ? f("palette-warning-light") : g.warning.light, 0.9)), H(g.Alert, "errorIconColor", $("palette-error-main")), H(g.Alert, "infoIconColor", $("palette-info-main")), H(g.Alert, "successIconColor", $("palette-success-main")), H(g.Alert, "warningIconColor", $("palette-warning-main")), H(g.AppBar, "defaultBg", $("palette-grey-100")), H(g.Avatar, "defaultBg", $("palette-grey-400")), H(g.Button, "inheritContainedBg", $("palette-grey-300")), H(g.Button, "inheritContainedHoverBg", $("palette-grey-A100")), H(g.Chip, "defaultBorder", $("palette-grey-400")), H(g.Chip, "defaultAvatarColor", $("palette-grey-700")), H(g.Chip, "defaultIconColor", $("palette-grey-700")), H(g.FilledInput, "bg", "rgba(0, 0, 0, 0.06)"), H(g.FilledInput, "hoverBg", "rgba(0, 0, 0, 0.09)"), H(g.FilledInput, "disabledBg", "rgba(0, 0, 0, 0.12)"), H(g.LinearProgress, "primaryBg", I(ot, a ? f("palette-primary-main") : g.primary.main, 0.62)), H(g.LinearProgress, "secondaryBg", I(ot, a ? f("palette-secondary-main") : g.secondary.main, 0.62)), H(g.LinearProgress, "errorBg", I(ot, a ? f("palette-error-main") : g.error.main, 0.62)), H(g.LinearProgress, "infoBg", I(ot, a ? f("palette-info-main") : g.info.main, 0.62)), H(g.LinearProgress, "successBg", I(ot, a ? f("palette-success-main") : g.success.main, 0.62)), H(g.LinearProgress, "warningBg", I(ot, a ? f("palette-warning-light") : g.warning.main, 0.62)), H(g.Skeleton, "bg", C ? I(go, a ? f("palette-text-primary") : g.text.primary, 0.11) : `rgba(${$("palette-text-primaryChannel")} / 0.11)`), H(g.Slider, "primaryTrack", I(ot, a ? f("palette-primary-main") : g.primary.main, 0.62)), H(g.Slider, "secondaryTrack", I(ot, a ? f("palette-secondary-main") : g.secondary.main, 0.62)), H(g.Slider, "errorTrack", I(ot, a ? f("palette-error-main") : g.error.main, 0.62)), H(g.Slider, "infoTrack", I(ot, a ? f("palette-info-main") : g.info.main, 0.62)), H(g.Slider, "successTrack", I(ot, a ? f("palette-success-main") : g.success.main, 0.62)), H(g.Slider, "warningTrack", I(ot, a ? f("palette-warning-main") : g.warning.main, 0.62));
      const M = C ? I(nt, a ? f("palette-background-default") : g.background.default, 0.6825) : wi(g.background.default, 0.8);
      H(g.SnackbarContent, "bg", M), H(g.SnackbarContent, "color", Pn(() => C ? ka.text.primary : g.getContrastText(M))), H(g.SpeedDialAction, "fabHoverBg", wi(g.background.paper, 0.15)), H(g.StepConnector, "border", $("palette-grey-400")), H(g.StepContent, "border", $("palette-grey-400")), H(g.Switch, "defaultColor", $("palette-common-white")), H(g.Switch, "defaultDisabledColor", $("palette-grey-100")), H(g.Switch, "primaryDisabledColor", I(ot, a ? f("palette-primary-main") : g.primary.main, 0.62)), H(g.Switch, "secondaryDisabledColor", I(ot, a ? f("palette-secondary-main") : g.secondary.main, 0.62)), H(g.Switch, "errorDisabledColor", I(ot, a ? f("palette-error-main") : g.error.main, 0.62)), H(g.Switch, "infoDisabledColor", I(ot, a ? f("palette-info-main") : g.info.main, 0.62)), H(g.Switch, "successDisabledColor", I(ot, a ? f("palette-success-main") : g.success.main, 0.62)), H(g.Switch, "warningDisabledColor", I(ot, a ? f("palette-warning-main") : g.warning.main, 0.62)), H(g.TableCell, "border", I(ot, go(a ? f("palette-divider") : g.divider, 1), 0.88)), H(g.Tooltip, "bg", I(go, a ? f("palette-grey-700") : g.grey[700], 0.92));
    }
    if (g.mode === "dark") {
      H(g.Alert, "errorColor", I(ot, a ? f("palette-error-light") : g.error.light, 0.6)), H(g.Alert, "infoColor", I(ot, a ? f("palette-info-light") : g.info.light, 0.6)), H(g.Alert, "successColor", I(ot, a ? f("palette-success-light") : g.success.light, 0.6)), H(g.Alert, "warningColor", I(ot, a ? f("palette-warning-light") : g.warning.light, 0.6)), H(g.Alert, "errorFilledBg", $("palette-error-dark")), H(g.Alert, "infoFilledBg", $("palette-info-dark")), H(g.Alert, "successFilledBg", $("palette-success-dark")), H(g.Alert, "warningFilledBg", $("palette-warning-dark")), H(g.Alert, "errorFilledColor", Pn(() => g.getContrastText(g.error.dark))), H(g.Alert, "infoFilledColor", Pn(() => g.getContrastText(g.info.dark))), H(g.Alert, "successFilledColor", Pn(() => g.getContrastText(g.success.dark))), H(g.Alert, "warningFilledColor", Pn(() => g.getContrastText(g.warning.dark))), H(g.Alert, "errorStandardBg", I(nt, a ? f("palette-error-light") : g.error.light, 0.9)), H(g.Alert, "infoStandardBg", I(nt, a ? f("palette-info-light") : g.info.light, 0.9)), H(g.Alert, "successStandardBg", I(nt, a ? f("palette-success-light") : g.success.light, 0.9)), H(g.Alert, "warningStandardBg", I(nt, a ? f("palette-warning-light") : g.warning.light, 0.9)), H(g.Alert, "errorIconColor", $("palette-error-main")), H(g.Alert, "infoIconColor", $("palette-info-main")), H(g.Alert, "successIconColor", $("palette-success-main")), H(g.Alert, "warningIconColor", $("palette-warning-main")), H(g.AppBar, "defaultBg", $("palette-grey-900")), H(g.AppBar, "darkBg", $("palette-background-paper")), H(g.AppBar, "darkColor", $("palette-text-primary")), H(g.Avatar, "defaultBg", $("palette-grey-600")), H(g.Button, "inheritContainedBg", $("palette-grey-800")), H(g.Button, "inheritContainedHoverBg", $("palette-grey-700")), H(g.Chip, "defaultBorder", $("palette-grey-700")), H(g.Chip, "defaultAvatarColor", $("palette-grey-300")), H(g.Chip, "defaultIconColor", $("palette-grey-300")), H(g.FilledInput, "bg", "rgba(255, 255, 255, 0.09)"), H(g.FilledInput, "hoverBg", "rgba(255, 255, 255, 0.13)"), H(g.FilledInput, "disabledBg", "rgba(255, 255, 255, 0.12)"), H(g.LinearProgress, "primaryBg", I(nt, a ? f("palette-primary-main") : g.primary.main, 0.5)), H(g.LinearProgress, "secondaryBg", I(nt, a ? f("palette-secondary-main") : g.secondary.main, 0.5)), H(g.LinearProgress, "errorBg", I(nt, a ? f("palette-error-main") : g.error.main, 0.5)), H(g.LinearProgress, "infoBg", I(nt, a ? f("palette-info-main") : g.info.main, 0.5)), H(g.LinearProgress, "successBg", I(nt, a ? f("palette-success-main") : g.success.main, 0.5)), H(g.LinearProgress, "warningBg", I(nt, a ? f("palette-warning-main") : g.warning.main, 0.5)), H(g.Skeleton, "bg", C ? I(go, a ? f("palette-text-primary") : g.text.primary, 0.13) : `rgba(${$("palette-text-primaryChannel")} / 0.13)`), H(g.Slider, "primaryTrack", I(nt, a ? f("palette-primary-main") : g.primary.main, 0.5)), H(g.Slider, "secondaryTrack", I(nt, a ? f("palette-secondary-main") : g.secondary.main, 0.5)), H(g.Slider, "errorTrack", I(nt, a ? f("palette-error-main") : g.error.main, 0.5)), H(g.Slider, "infoTrack", I(nt, a ? f("palette-info-main") : g.info.main, 0.5)), H(g.Slider, "successTrack", I(nt, a ? f("palette-success-main") : g.success.main, 0.5)), H(g.Slider, "warningTrack", I(nt, a ? f("palette-warning-light") : g.warning.main, 0.5));
      const M = C ? I(ot, a ? f("palette-background-default") : g.background.default, 0.985) : wi(g.background.default, 0.98);
      H(g.SnackbarContent, "bg", M), H(g.SnackbarContent, "color", Pn(() => C ? op.text.primary : g.getContrastText(M))), H(g.SpeedDialAction, "fabHoverBg", wi(g.background.paper, 0.15)), H(g.StepConnector, "border", $("palette-grey-600")), H(g.StepContent, "border", $("palette-grey-600")), H(g.Switch, "defaultColor", $("palette-grey-300")), H(g.Switch, "defaultDisabledColor", $("palette-grey-600")), H(g.Switch, "primaryDisabledColor", I(nt, a ? f("palette-primary-main") : g.primary.main, 0.55)), H(g.Switch, "secondaryDisabledColor", I(nt, a ? f("palette-secondary-main") : g.secondary.main, 0.55)), H(g.Switch, "errorDisabledColor", I(nt, a ? f("palette-error-main") : g.error.main, 0.55)), H(g.Switch, "infoDisabledColor", I(nt, a ? f("palette-info-main") : g.info.main, 0.55)), H(g.Switch, "successDisabledColor", I(nt, a ? f("palette-success-main") : g.success.main, 0.55)), H(g.Switch, "warningDisabledColor", I(nt, a ? f("palette-warning-light") : g.warning.main, 0.55)), H(g.TableCell, "border", I(nt, go(a ? f("palette-divider") : g.divider, 1), 0.68)), H(g.Tooltip, "bg", I(go, a ? f("palette-grey-700") : g.grey[700], 0.92));
    }
    a || (qn(g.background, "default"), qn(g.background, "paper"), qn(g.common, "background"), qn(g.common, "onBackground"), qn(g, "divider")), Object.keys(g).forEach((M) => {
      const B = g[M];
      M !== "tonalOffset" && !a && B && typeof B == "object" && (B.main && H(g[M], "mainChannel", Mr(Ar(B.main))), B.light && H(g[M], "lightChannel", Mr(Ar(B.light))), B.dark && H(g[M], "darkChannel", Mr(Ar(B.dark))), B.contrastText && H(g[M], "contrastTextChannel", Mr(Ar(B.contrastText))), M === "text" && (qn(g[M], "primary"), qn(g[M], "secondary")), M === "action" && (B.active && qn(g[M], "active"), B.selected && qn(g[M], "selected")));
    });
  }), N = t.reduce((P, g) => Dt(P, g), N);
  const A = {
    prefix: s,
    disableCssColorScheme: i,
    shouldSkipGeneratingVar: c,
    getSelector: fy(N),
    enableContrastVars: a
  }, {
    vars: _,
    generateThemeVars: D,
    generateStyleSheets: F
  } = Rb(N, A);
  return N.vars = _, Object.entries(N.colorSchemes[N.defaultColorScheme]).forEach(([P, g]) => {
    N[P] = g;
  }), N.generateThemeVars = D, N.generateStyleSheets = F, N.generateSpacing = function() {
    return ju(m.spacing, Ts(this));
  }, N.getColorSchemeSelector = Nb(d), N.spacing = N.generateSpacing(), N.shouldSkipGeneratingVar = c, N.unstable_sxConfig = {
    ...Ps,
    ...m == null ? void 0 : m.unstable_sxConfig
  }, N.unstable_sx = function(g) {
    return Ro({
      sx: g,
      theme: this
    });
  }, N.internal_cache = {}, N.toRuntimeSource = ap, N;
}
function ad(e, t, o) {
  e.colorSchemes && o && (e.colorSchemes[t] = {
    ...o !== !0 && o,
    palette: ml({
      ...o === !0 ? {} : o.palette,
      mode: t
    })
    // cast type to skip module augmentation test
  });
}
function Ls(e = {}, ...t) {
  const {
    palette: o,
    cssVariables: r = !1,
    colorSchemes: i = o ? void 0 : {
      light: !0
    },
    defaultColorScheme: s = o == null ? void 0 : o.mode,
    ...a
  } = e, c = s || "light", d = i == null ? void 0 : i[c], p = {
    ...i,
    ...o ? {
      [c]: {
        ...typeof d != "boolean" && d,
        palette: o
      }
    } : void 0
  };
  if (r === !1) {
    if (!("colorSchemes" in e))
      return Pa(e, ...t);
    let m = o;
    "palette" in e || p[c] && (p[c] !== !0 ? m = p[c].palette : c === "dark" && (m = {
      mode: "dark"
    }));
    const y = Pa({
      ...e,
      palette: m
    }, ...t);
    return y.defaultColorScheme = c, y.colorSchemes = p, y.palette.mode === "light" && (y.colorSchemes.light = {
      ...p.light !== !0 && p.light,
      palette: y.palette
    }, ad(y, "dark", p.dark)), y.palette.mode === "dark" && (y.colorSchemes.dark = {
      ...p.dark !== !0 && p.dark,
      palette: y.palette
    }, ad(y, "light", p.light)), y;
  }
  return !o && !("light" in p) && c === "light" && (p.light = !0), by({
    ...a,
    colorSchemes: p,
    defaultColorScheme: c,
    ...typeof r != "boolean" && r
  }, ...t);
}
const hl = Ls();
function ko() {
  const e = Is(hl);
  return process.env.NODE_ENV !== "production" && b.useDebugValue(e), e[jn] || e;
}
function dp(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const Qt = (e) => dp(e) && e !== "classes", J = Gu({
  themeId: jn,
  defaultTheme: hl,
  rootShouldForwardProp: Qt
});
function yy({
  theme: e,
  ...t
}) {
  const o = jn in e ? e[jn] : void 0;
  return /* @__PURE__ */ l(Kr, {
    ...t,
    themeId: o ? jn : void 0,
    theme: o || e
  });
}
const Ti = {
  colorSchemeStorageKey: "mui-color-scheme",
  defaultLightColorScheme: "light",
  defaultDarkColorScheme: "dark",
  modeStorageKey: "mui-mode"
};
process.env.NODE_ENV !== "production" && (n.string, n.string, n.string, n.string, n.string, n.oneOf(["dark", "light", "system"]), n.string, n.string);
const {
  CssVarsProvider: vy
} = wb({
  themeId: jn,
  // @ts-ignore ignore module augmentation tests
  theme: () => Ls({
    cssVariables: !0
  }),
  colorSchemeStorageKey: Ti.colorSchemeStorageKey,
  modeStorageKey: Ti.modeStorageKey,
  defaultColorScheme: {
    light: Ti.defaultLightColorScheme,
    dark: Ti.defaultDarkColorScheme
  },
  resolveTheme: (e) => {
    const t = {
      ...e,
      typography: ip(e.palette, e.typography)
    };
    return t.unstable_sx = function(r) {
      return Ro({
        sx: r,
        theme: this
      });
    }, t;
  }
}), xy = vy;
function Sy({
  theme: e,
  ...t
}) {
  const o = b.useMemo(() => {
    if (typeof e == "function")
      return e;
    const r = jn in e ? e[jn] : e;
    return "colorSchemes" in r ? null : "vars" in r ? e : {
      ...e,
      vars: null
    };
  }, [e]);
  return o ? /* @__PURE__ */ l(yy, {
    theme: o,
    ...t
  }) : /* @__PURE__ */ l(xy, {
    theme: e,
    ...t
  });
}
const Cy = we("MuiBox", ["root"]), wy = Ls(), je = Gg({
  themeId: jn,
  defaultTheme: wy,
  defaultClassName: Cy.root,
  generateClassName: Wu.generate
});
process.env.NODE_ENV !== "production" && (je.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: n.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: n.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object])
});
function up(e) {
  return /* @__PURE__ */ l(ll, {
    ...e,
    defaultTheme: hl,
    themeId: jn
  });
}
process.env.NODE_ENV !== "production" && (up.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The styles you want to apply globally.
   */
  styles: n.oneOfType([n.array, n.func, n.number, n.object, n.string, n.bool])
});
function gl(e) {
  return function(o) {
    return (
      // Pigment CSS `globalCss` support callback with theme inside an object but `GlobalStyles` support theme as a callback value.
      /* @__PURE__ */ l(up, {
        styles: typeof e == "function" ? (r) => e({
          theme: r,
          ...o
        }) : e
      })
    );
  };
}
process.env.NODE_ENV !== "production" && (n.node, n.object.isRequired);
function Ee(e) {
  return ub(e);
}
const $a = typeof gl({}) == "function", Ty = (e, t) => ({
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
}), Ey = (e) => ({
  color: (e.vars || e).palette.text.primary,
  ...e.typography.body1,
  backgroundColor: (e.vars || e).palette.background.default,
  "@media print": {
    // Save printer ink.
    backgroundColor: (e.vars || e).palette.common.white
  }
}), pp = (e, t = !1) => {
  var s, a;
  const o = {};
  t && e.colorSchemes && typeof e.getColorSchemeSelector == "function" && Object.entries(e.colorSchemes).forEach(([c, d]) => {
    var m, y;
    const p = e.getColorSchemeSelector(c);
    p.startsWith("@") ? o[p] = {
      ":root": {
        colorScheme: (m = d.palette) == null ? void 0 : m.mode
      }
    } : o[p.replace(/\s*&/, "")] = {
      colorScheme: (y = d.palette) == null ? void 0 : y.mode
    };
  });
  let r = {
    html: Ty(e, t),
    "*, *::before, *::after": {
      boxSizing: "inherit"
    },
    "strong, b": {
      fontWeight: e.typography.fontWeightBold
    },
    body: {
      margin: 0,
      // Remove the margin in all browsers.
      ...Ey(e),
      // Add support for document.body.requestFullScreen().
      // Other elements, if background transparent, are not supported.
      "&::backdrop": {
        backgroundColor: (e.vars || e).palette.background.default
      }
    },
    ...o
  };
  const i = (a = (s = e.components) == null ? void 0 : s.MuiCssBaseline) == null ? void 0 : a.styleOverrides;
  return i && (r = [r, i]), r;
}, qi = "mui-ecs", Oy = (e) => {
  const t = pp(e, !1), o = Array.isArray(t) ? t[0] : t;
  return !e.vars && o && (o.html[`:root:has(${qi})`] = {
    colorScheme: e.palette.mode
  }), e.colorSchemes && Object.entries(e.colorSchemes).forEach(([r, i]) => {
    var a, c;
    const s = e.getColorSchemeSelector(r);
    s.startsWith("@") ? o[s] = {
      [`:root:not(:has(.${qi}))`]: {
        colorScheme: (a = i.palette) == null ? void 0 : a.mode
      }
    } : o[s.replace(/\s*&/, "")] = {
      [`&:not(:has(.${qi}))`]: {
        colorScheme: (c = i.palette) == null ? void 0 : c.mode
      }
    };
  }), t;
}, Ry = gl($a ? ({
  theme: e,
  enableColorScheme: t
}) => pp(e, t) : ({
  theme: e
}) => Oy(e));
function fp(e) {
  const t = Ee({
    props: e,
    name: "MuiCssBaseline"
  }), {
    children: o,
    enableColorScheme: r = !1
  } = t;
  return /* @__PURE__ */ T(b.Fragment, {
    children: [$a && /* @__PURE__ */ l(Ry, {
      enableColorScheme: r
    }), !$a && !r && /* @__PURE__ */ l("span", {
      className: qi,
      style: {
        display: "none"
      }
    }), o]
  });
}
process.env.NODE_ENV !== "production" && (fp.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * You can wrap a node.
   */
  children: n.node,
  /**
   * Enable `color-scheme` CSS property to use `theme.palette.mode`.
   * For more details, check out https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme
   * For browser support, check out https://caniuse.com/?search=color-scheme
   * @default false
   */
  enableColorScheme: n.bool
});
function Un(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : function(...r) {
    return e(...r) || t(...r);
  };
}
const Pe = hb;
function mp(e, t) {
  if (e == null) return {};
  var o = {};
  for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
    if (t.indexOf(r) !== -1) continue;
    o[r] = e[r];
  }
  return o;
}
function Ma(e, t) {
  return Ma = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o, r) {
    return o.__proto__ = r, o;
  }, Ma(e, t);
}
function hp(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Ma(e, t);
}
const ld = {
  disabled: !1
};
var Ny = process.env.NODE_ENV !== "production" ? n.oneOfType([n.number, n.shape({
  enter: n.number,
  exit: n.number,
  appear: n.number
}).isRequired]) : null;
process.env.NODE_ENV !== "production" && n.oneOfType([n.string, n.shape({
  enter: n.string,
  exit: n.string,
  active: n.string
}), n.shape({
  enter: n.string,
  enterDone: n.string,
  enterActive: n.string,
  exit: n.string,
  exitDone: n.string,
  exitActive: n.string
})]);
const ts = Jn.createContext(null);
var ky = function(t) {
  return t.scrollTop;
}, _r = "unmounted", vo = "exited", xo = "entering", jo = "entered", Aa = "exiting", Rn = /* @__PURE__ */ function(e) {
  hp(t, e);
  function t(r, i) {
    var s;
    s = e.call(this, r, i) || this;
    var a = i, c = a && !a.isMounting ? r.enter : r.appear, d;
    return s.appearStatus = null, r.in ? c ? (d = vo, s.appearStatus = xo) : d = jo : r.unmountOnExit || r.mountOnEnter ? d = _r : d = vo, s.state = {
      status: d
    }, s.nextCallback = null, s;
  }
  t.getDerivedStateFromProps = function(i, s) {
    var a = i.in;
    return a && s.status === _r ? {
      status: vo
    } : null;
  };
  var o = t.prototype;
  return o.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, o.componentDidUpdate = function(i) {
    var s = null;
    if (i !== this.props) {
      var a = this.state.status;
      this.props.in ? a !== xo && a !== jo && (s = xo) : (a === xo || a === jo) && (s = Aa);
    }
    this.updateStatus(!1, s);
  }, o.componentWillUnmount = function() {
    this.cancelNextCallback();
  }, o.getTimeouts = function() {
    var i = this.props.timeout, s, a, c;
    return s = a = c = i, i != null && typeof i != "number" && (s = i.exit, a = i.enter, c = i.appear !== void 0 ? i.appear : a), {
      exit: s,
      enter: a,
      appear: c
    };
  }, o.updateStatus = function(i, s) {
    if (i === void 0 && (i = !1), s !== null)
      if (this.cancelNextCallback(), s === xo) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var a = this.props.nodeRef ? this.props.nodeRef.current : xi.findDOMNode(this);
          a && ky(a);
        }
        this.performEnter(i);
      } else
        this.performExit();
    else this.props.unmountOnExit && this.state.status === vo && this.setState({
      status: _r
    });
  }, o.performEnter = function(i) {
    var s = this, a = this.props.enter, c = this.context ? this.context.isMounting : i, d = this.props.nodeRef ? [c] : [xi.findDOMNode(this), c], p = d[0], m = d[1], y = this.getTimeouts(), x = c ? y.appear : y.enter;
    if (!i && !a || ld.disabled) {
      this.safeSetState({
        status: jo
      }, function() {
        s.props.onEntered(p);
      });
      return;
    }
    this.props.onEnter(p, m), this.safeSetState({
      status: xo
    }, function() {
      s.props.onEntering(p, m), s.onTransitionEnd(x, function() {
        s.safeSetState({
          status: jo
        }, function() {
          s.props.onEntered(p, m);
        });
      });
    });
  }, o.performExit = function() {
    var i = this, s = this.props.exit, a = this.getTimeouts(), c = this.props.nodeRef ? void 0 : xi.findDOMNode(this);
    if (!s || ld.disabled) {
      this.safeSetState({
        status: vo
      }, function() {
        i.props.onExited(c);
      });
      return;
    }
    this.props.onExit(c), this.safeSetState({
      status: Aa
    }, function() {
      i.props.onExiting(c), i.onTransitionEnd(a.exit, function() {
        i.safeSetState({
          status: vo
        }, function() {
          i.props.onExited(c);
        });
      });
    });
  }, o.cancelNextCallback = function() {
    this.nextCallback !== null && (this.nextCallback.cancel(), this.nextCallback = null);
  }, o.safeSetState = function(i, s) {
    s = this.setNextCallback(s), this.setState(i, s);
  }, o.setNextCallback = function(i) {
    var s = this, a = !0;
    return this.nextCallback = function(c) {
      a && (a = !1, s.nextCallback = null, i(c));
    }, this.nextCallback.cancel = function() {
      a = !1;
    }, this.nextCallback;
  }, o.onTransitionEnd = function(i, s) {
    this.setNextCallback(s);
    var a = this.props.nodeRef ? this.props.nodeRef.current : xi.findDOMNode(this), c = i == null && !this.props.addEndListener;
    if (!a || c) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var d = this.props.nodeRef ? [this.nextCallback] : [a, this.nextCallback], p = d[0], m = d[1];
      this.props.addEndListener(p, m);
    }
    i != null && setTimeout(this.nextCallback, i);
  }, o.render = function() {
    var i = this.state.status;
    if (i === _r)
      return null;
    var s = this.props, a = s.children;
    s.in, s.mountOnEnter, s.unmountOnExit, s.appear, s.enter, s.exit, s.timeout, s.addEndListener, s.onEnter, s.onEntering, s.onEntered, s.onExit, s.onExiting, s.onExited, s.nodeRef;
    var c = mp(s, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ Jn.createElement(ts.Provider, {
        value: null
      }, typeof a == "function" ? a(i, c) : Jn.cloneElement(Jn.Children.only(a), c))
    );
  }, t;
}(Jn.Component);
Rn.contextType = ts;
Rn.propTypes = process.env.NODE_ENV !== "production" ? {
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
  nodeRef: n.shape({
    current: typeof Element > "u" ? n.any : function(e, t, o, r, i, s) {
      var a = e[t];
      return n.instanceOf(a && "ownerDocument" in a ? a.ownerDocument.defaultView.Element : Element)(e, t, o, r, i, s);
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
  children: n.oneOfType([n.func.isRequired, n.element.isRequired]).isRequired,
  /**
   * Show the component; triggers the enter or exit states
   */
  in: n.bool,
  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: n.bool,
  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: n.bool,
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
  appear: n.bool,
  /**
   * Enable or disable enter transitions.
   */
  enter: n.bool,
  /**
   * Enable or disable exit transitions.
   */
  exit: n.bool,
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
    var o = Ny;
    t.addEndListener || (o = o.isRequired);
    for (var r = arguments.length, i = new Array(r > 1 ? r - 1 : 0), s = 1; s < r; s++)
      i[s - 1] = arguments[s];
    return o.apply(void 0, [t].concat(i));
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
  addEndListener: n.func,
  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: n.func,
  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: n.func,
  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: n.func,
  /**
   * Callback fired before the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: n.func,
  /**
   * Callback fired after the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: n.func,
  /**
   * Callback fired after the "exited" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: n.func
} : {};
function Bo() {
}
Rn.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Bo,
  onEntering: Bo,
  onEntered: Bo,
  onExit: Bo,
  onExiting: Bo,
  onExited: Bo
};
Rn.UNMOUNTED = _r;
Rn.EXITED = vo;
Rn.ENTERING = xo;
Rn.ENTERED = jo;
Rn.EXITING = Aa;
function Py(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function bl(e, t) {
  var o = function(s) {
    return t && Wi(s) ? t(s) : s;
  }, r = /* @__PURE__ */ Object.create(null);
  return e && Nm.map(e, function(i) {
    return i;
  }).forEach(function(i) {
    r[i.key] = o(i);
  }), r;
}
function Iy(e, t) {
  e = e || {}, t = t || {};
  function o(m) {
    return m in t ? t[m] : e[m];
  }
  var r = /* @__PURE__ */ Object.create(null), i = [];
  for (var s in e)
    s in t ? i.length && (r[s] = i, i = []) : i.push(s);
  var a, c = {};
  for (var d in t) {
    if (r[d])
      for (a = 0; a < r[d].length; a++) {
        var p = r[d][a];
        c[r[d][a]] = o(p);
      }
    c[d] = o(d);
  }
  for (a = 0; a < i.length; a++)
    c[i[a]] = o(i[a]);
  return c;
}
function wo(e, t, o) {
  return o[t] != null ? o[t] : e.props[t];
}
function $y(e, t) {
  return bl(e.children, function(o) {
    return zi(o, {
      onExited: t.bind(null, o),
      in: !0,
      appear: wo(o, "appear", e),
      enter: wo(o, "enter", e),
      exit: wo(o, "exit", e)
    });
  });
}
function My(e, t, o) {
  var r = bl(e.children), i = Iy(t, r);
  return Object.keys(i).forEach(function(s) {
    var a = i[s];
    if (Wi(a)) {
      var c = s in t, d = s in r, p = t[s], m = Wi(p) && !p.props.in;
      d && (!c || m) ? i[s] = zi(a, {
        onExited: o.bind(null, a),
        in: !0,
        exit: wo(a, "exit", e),
        enter: wo(a, "enter", e)
      }) : !d && c && !m ? i[s] = zi(a, {
        in: !1
      }) : d && c && Wi(p) && (i[s] = zi(a, {
        onExited: o.bind(null, a),
        in: p.props.in,
        exit: wo(a, "exit", e),
        enter: wo(a, "enter", e)
      }));
    }
  }), i;
}
var Ay = Object.values || function(e) {
  return Object.keys(e).map(function(t) {
    return e[t];
  });
}, _y = {
  component: "div",
  childFactory: function(t) {
    return t;
  }
}, yl = /* @__PURE__ */ function(e) {
  hp(t, e);
  function t(r, i) {
    var s;
    s = e.call(this, r, i) || this;
    var a = s.handleExited.bind(Py(s));
    return s.state = {
      contextValue: {
        isMounting: !0
      },
      handleExited: a,
      firstRender: !0
    }, s;
  }
  var o = t.prototype;
  return o.componentDidMount = function() {
    this.mounted = !0, this.setState({
      contextValue: {
        isMounting: !1
      }
    });
  }, o.componentWillUnmount = function() {
    this.mounted = !1;
  }, t.getDerivedStateFromProps = function(i, s) {
    var a = s.children, c = s.handleExited, d = s.firstRender;
    return {
      children: d ? $y(i, c) : My(i, a, c),
      firstRender: !1
    };
  }, o.handleExited = function(i, s) {
    var a = bl(this.props.children);
    i.key in a || (i.props.onExited && i.props.onExited(s), this.mounted && this.setState(function(c) {
      var d = Yi({}, c.children);
      return delete d[i.key], {
        children: d
      };
    }));
  }, o.render = function() {
    var i = this.props, s = i.component, a = i.childFactory, c = mp(i, ["component", "childFactory"]), d = this.state.contextValue, p = Ay(this.state.children).map(a);
    return delete c.appear, delete c.enter, delete c.exit, s === null ? /* @__PURE__ */ Jn.createElement(ts.Provider, {
      value: d
    }, p) : /* @__PURE__ */ Jn.createElement(ts.Provider, {
      value: d
    }, /* @__PURE__ */ Jn.createElement(s, c, p));
  }, t;
}(Jn.Component);
yl.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * `<TransitionGroup>` renders a `<div>` by default. You can change this
   * behavior by providing a `component` prop.
   * If you use React v16+ and would like to avoid a wrapping `<div>` element
   * you can pass in `component={null}`. This is useful if the wrapping div
   * borks your css styles.
   */
  component: n.any,
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
  children: n.node,
  /**
   * A convenience prop that enables or disables appear animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  appear: n.bool,
  /**
   * A convenience prop that enables or disables enter animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  enter: n.bool,
  /**
   * A convenience prop that enables or disables exit animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  exit: n.bool,
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
  childFactory: n.func
} : {};
yl.defaultProps = _y;
const cd = {};
function gp(e, t) {
  const o = b.useRef(cd);
  return o.current === cd && (o.current = e(t)), o;
}
const Dy = [];
function Ly(e) {
  b.useEffect(e, Dy);
}
class Bs {
  constructor() {
    $o(this, "currentId", null);
    $o(this, "clear", () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    });
    $o(this, "disposeEffect", () => this.clear);
  }
  static create() {
    return new Bs();
  }
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  start(t, o) {
    this.clear(), this.currentId = setTimeout(() => {
      this.currentId = null, o();
    }, t);
  }
}
function Qn() {
  const e = gp(Bs.create).current;
  return Ly(e.disposeEffect), e;
}
function By(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Fy(e, t, o, r, i) {
  const s = e[t], a = i || t;
  if (s == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let c;
  return typeof s == "function" && !By(s) && (c = "Did you accidentally provide a plain function component instead?"), s === b.Fragment && (c = "Did you accidentally provide a React.Fragment instead?"), c !== void 0 ? new Error(`Invalid ${r} \`${a}\` supplied to \`${o}\`. Expected an element type that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const vl = Un(n.elementType, Fy), bp = (e) => e.scrollTop;
function Pt(e, t) {
  return (o) => {
    if (t) {
      const r = e.current;
      o === void 0 ? t(r) : t(r, o);
    }
  };
}
function yp(e, t, o, r, i, s) {
  const a = e === "exited" && !t ? r : o[e] || o.exited;
  return i || s ? {
    ...a,
    ...i,
    ...s
  } : a;
}
function nr(e, t) {
  const {
    timeout: o,
    easing: r,
    style: i = {}
  } = e;
  return {
    duration: i.transitionDuration ?? (typeof o == "number" ? o : o[t.mode] || 0),
    easing: i.transitionTimingFunction ?? (typeof r == "object" ? r[t.mode] : r),
    delay: i.transitionDelay
  };
}
function dd(...e) {
  return e.reduce((t, o) => o == null ? t : function(...i) {
    t.apply(this, i), o.apply(this, i);
  }, () => {
  });
}
function jy(e) {
  return Se("MuiSvgIcon", e);
}
we("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const Wy = (e) => {
  const {
    color: t,
    fontSize: o,
    classes: r
  } = e, i = {
    root: ["root", t !== "inherit" && `color${Ce(t)}`, `fontSize${Ce(o)}`]
  };
  return Te(i, jy, r);
}, zy = J("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [t.root, o.color !== "inherit" && t[`color${Ce(o.color)}`], t[`fontSize${Ce(o.fontSize)}`]];
  }
})(Pe(({
  theme: e
}) => {
  var t, o, r, i, s, a, c, d, p, m, y, x, f, v;
  return {
    userSelect: "none",
    width: "1em",
    height: "1em",
    display: "inline-block",
    flexShrink: 0,
    transition: (i = (t = e.transitions) == null ? void 0 : t.create) == null ? void 0 : i.call(t, "fill", {
      duration: (r = (o = (e.vars ?? e).transitions) == null ? void 0 : o.duration) == null ? void 0 : r.shorter
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
          fontSize: ((d = (c = e.typography) == null ? void 0 : c.pxToRem) == null ? void 0 : d.call(c, 24)) || "1.5rem"
        }
      },
      {
        props: {
          fontSize: "large"
        },
        style: {
          fontSize: ((m = (p = e.typography) == null ? void 0 : p.pxToRem) == null ? void 0 : m.call(p, 35)) || "2.1875rem"
        }
      },
      // TODO v5 deprecate color prop, v6 remove for sx
      ...Object.entries((e.vars ?? e).palette).filter(([, h]) => h && h.main).map(([h]) => {
        var w, O;
        return {
          props: {
            color: h
          },
          style: {
            color: (O = (w = (e.vars ?? e).palette) == null ? void 0 : w[h]) == null ? void 0 : O.main
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
          color: (v = (f = (e.vars ?? e).palette) == null ? void 0 : f.action) == null ? void 0 : v.disabled
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
})), ns = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiSvgIcon"
  }), {
    children: i,
    className: s,
    color: a = "inherit",
    component: c = "svg",
    fontSize: d = "medium",
    htmlColor: p,
    inheritViewBox: m = !1,
    titleAccess: y,
    viewBox: x = "0 0 24 24",
    ...f
  } = r, v = /* @__PURE__ */ b.isValidElement(i) && i.type === "svg", h = {
    ...r,
    color: a,
    component: c,
    fontSize: d,
    instanceFontSize: t.fontSize,
    inheritViewBox: m,
    viewBox: x,
    hasSvgAsChild: v
  }, w = {};
  m || (w.viewBox = x);
  const O = Wy(h);
  return /* @__PURE__ */ T(zy, {
    as: c,
    className: de(O.root, s),
    focusable: "false",
    color: p,
    "aria-hidden": y ? void 0 : !0,
    role: y ? "img" : void 0,
    ref: o,
    ...w,
    ...f,
    ...v && i.props,
    ownerState: h,
    children: [v ? i.props.children : i, y ? /* @__PURE__ */ l("title", {
      children: y
    }) : null]
  });
});
process.env.NODE_ENV !== "production" && (ns.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Node passed into the SVG element.
   */
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: n.oneOfType([n.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), n.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: n.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: n.oneOfType([n.oneOf(["inherit", "large", "medium", "small"]), n.string]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: n.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: n.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: n.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: n.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: n.string
});
ns.muiName = "SvgIcon";
function dt(e, t) {
  function o(r, i) {
    return /* @__PURE__ */ l(ns, {
      "data-testid": process.env.NODE_ENV !== "production" ? `${t}Icon` : void 0,
      ref: i,
      ...r,
      children: e
    });
  }
  return process.env.NODE_ENV !== "production" && (o.displayName = `${t}Icon`), o.muiName = ns.muiName, /* @__PURE__ */ b.memo(/* @__PURE__ */ b.forwardRef(o));
}
function Fs(e, t = 166) {
  let o;
  function r(...i) {
    const s = () => {
      e.apply(this, i);
    };
    clearTimeout(o), o = setTimeout(s, t);
  }
  return r.clear = () => {
    clearTimeout(o);
  }, r;
}
function Bn(e) {
  var o;
  let t = e.activeElement;
  for (; ((o = t == null ? void 0 : t.shadowRoot) == null ? void 0 : o.activeElement) != null; )
    t = t.shadowRoot.activeElement;
  return t;
}
function kt(e) {
  return e && e.ownerDocument || document;
}
function En(e) {
  return kt(e).defaultView || window;
}
function _a(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
function vp(e, t, o, r, i) {
  if (process.env.NODE_ENV === "production")
    return null;
  const s = i || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${s}\` is not supported. Please remove it.`) : null;
}
function os(e) {
  const {
    controlled: t,
    default: o,
    name: r,
    state: i = "value"
  } = e, {
    current: s
  } = b.useRef(t !== void 0), [a, c] = b.useState(o), d = s ? t : a;
  if (process.env.NODE_ENV !== "production") {
    b.useEffect(() => {
      s !== (t !== void 0) && console.error([`MUI: A component is changing the ${s ? "" : "un"}controlled ${i} state of ${r} to be ${s ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${r} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [i, r, t]);
    const {
      current: m
    } = b.useRef(o);
    b.useEffect(() => {
      !s && JSON.stringify(o) !== JSON.stringify(m) && console.error([`MUI: A component is changing the default ${i} state of an uncontrolled ${r} after being initialized. To suppress this warning opt to use a controlled ${r}.`].join(`
`));
    }, [JSON.stringify(o)]);
  }
  const p = b.useCallback((m) => {
    s || c(m);
  }, []);
  return [d, p];
}
function It(e) {
  const t = b.useRef(e);
  return Nt(() => {
    t.current = e;
  }), b.useRef((...o) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...o)
  )).current;
}
function gt(...e) {
  const t = b.useRef(void 0), o = b.useCallback((r) => {
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
  return b.useMemo(() => e.every((r) => r == null) ? null : (r) => {
    t.current && (t.current(), t.current = void 0), r != null && (t.current = o(r));
  }, e);
}
function xp(e, t) {
  const o = e.charCodeAt(2);
  return e[0] === "o" && e[1] === "n" && o >= 65 && o <= 90 && typeof t == "function";
}
function Vy(e, t) {
  if (!e)
    return t;
  function o(a, c) {
    const d = {};
    return Object.keys(c).forEach((p) => {
      xp(p, c[p]) && typeof a[p] == "function" && (d[p] = (...m) => {
        a[p](...m), c[p](...m);
      });
    }), d;
  }
  if (typeof e == "function" || typeof t == "function")
    return (a) => {
      const c = typeof t == "function" ? t(a) : t, d = typeof e == "function" ? e({
        ...a,
        ...c
      }) : e, p = de(a == null ? void 0 : a.className, c == null ? void 0 : c.className, d == null ? void 0 : d.className), m = o(d, c);
      return {
        ...c,
        ...d,
        ...m,
        ...!!p && {
          className: p
        },
        ...(c == null ? void 0 : c.style) && (d == null ? void 0 : d.style) && {
          style: {
            ...c.style,
            ...d.style
          }
        },
        ...(c == null ? void 0 : c.sx) && (d == null ? void 0 : d.sx) && {
          sx: [...Array.isArray(c.sx) ? c.sx : [c.sx], ...Array.isArray(d.sx) ? d.sx : [d.sx]]
        }
      };
    };
  const r = t, i = o(e, r), s = de(r == null ? void 0 : r.className, e == null ? void 0 : e.className);
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
function rs(e) {
  return typeof e == "string";
}
function Sp(e, t, o) {
  return e === void 0 || rs(e) ? t : {
    ...t,
    ownerState: {
      ...t.ownerState,
      ...o
    }
  };
}
function Cp(e, t, o) {
  return typeof e == "function" ? e(t, o) : e;
}
function wp(e) {
  if (e === void 0)
    return {};
  const t = {};
  for (const o of Object.keys(e))
    xp(o, e[o]) && (t[o] = e[o]);
  return t;
}
function ud(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((o) => !(o.match(/^on[A-Z]/) && typeof e[o] == "function")).forEach((o) => {
    t[o] = e[o];
  }), t;
}
function Tp(e) {
  const {
    getSlotProps: t,
    additionalProps: o,
    externalSlotProps: r,
    externalForwardedProps: i,
    className: s
  } = e;
  if (!t) {
    const f = de(o == null ? void 0 : o.className, s, i == null ? void 0 : i.className, r == null ? void 0 : r.className), v = {
      ...o == null ? void 0 : o.style,
      ...i == null ? void 0 : i.style,
      ...r == null ? void 0 : r.style
    }, h = {
      ...o,
      ...i,
      ...r
    };
    return f.length > 0 && (h.className = f), Object.keys(v).length > 0 && (h.style = v), {
      props: h,
      internalRef: void 0
    };
  }
  const a = wp({
    ...i,
    ...r
  }), c = ud(r), d = ud(i), p = t(a), m = de(p == null ? void 0 : p.className, o == null ? void 0 : o.className, s, i == null ? void 0 : i.className, r == null ? void 0 : r.className), y = {
    ...p == null ? void 0 : p.style,
    ...o == null ? void 0 : o.style,
    ...i == null ? void 0 : i.style,
    ...r == null ? void 0 : r.style
  }, x = {
    ...p,
    ...o,
    ...d,
    ...c
  };
  return m.length > 0 && (x.className = m), Object.keys(y).length > 0 && (x.style = y), {
    props: x,
    internalRef: p.ref
  };
}
function be(e, t) {
  const {
    className: o,
    elementType: r,
    ownerState: i,
    externalForwardedProps: s,
    internalForwardedProps: a,
    shouldForwardComponentProp: c = !1,
    ...d
  } = t, {
    component: p,
    slots: m = {
      [e]: void 0
    },
    slotProps: y = {
      [e]: void 0
    },
    ...x
  } = s, f = m[e] || r, v = Cp(y[e], i), {
    props: {
      component: h,
      ...w
    },
    internalRef: O
  } = Tp({
    className: o,
    ...d,
    externalForwardedProps: e === "root" ? x : void 0,
    externalSlotProps: v
  }), k = gt(O, v == null ? void 0 : v.ref, t.ref), E = e === "root" ? h || p : h, C = Sp(f, {
    ...e === "root" && !p && !m[e] && a,
    ...e !== "root" && !m[e] && a,
    ...w,
    ...E && !c && {
      as: E
    },
    ...E && c && {
      component: E
    },
    ref: k
  }, i);
  return [f, C];
}
function Uy(e) {
  return Se("MuiCollapse", e);
}
we("MuiCollapse", ["root", "horizontal", "vertical", "entered", "hidden", "wrapper", "wrapperInner"]);
const Hy = (e) => {
  const {
    orientation: t,
    classes: o
  } = e;
  return Te({
    root: ["root", t],
    entered: ["entered"],
    hidden: ["hidden"],
    wrapper: ["wrapper", t],
    wrapperInner: ["wrapperInner", t]
  }, Uy, o);
}, Gy = J("div", {
  name: "MuiCollapse",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [t.root, t[o.orientation], o.state === "entered" && t.entered, o.state === "exited" && !o.in && o.collapsedSize === "0px" && t.hidden];
  }
})(Pe(({
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
}))), qy = J("div", {
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
}), Ky = J("div", {
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
}), is = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiCollapse"
  }), {
    addEndListener: i,
    children: s,
    className: a,
    collapsedSize: c = "0px",
    component: d,
    easing: p,
    in: m,
    onEnter: y,
    onEntered: x,
    onEntering: f,
    onExit: v,
    onExited: h,
    onExiting: w,
    orientation: O = "vertical",
    slots: k = {},
    slotProps: E = {},
    style: C,
    timeout: S = sp.standard,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: N = Rn,
    ...A
  } = r, _ = {
    ...r,
    orientation: O,
    collapsedSize: c
  }, D = Hy(_), F = ko(), P = Qn(), g = b.useRef(null), $ = b.useRef(), I = typeof c == "number" ? `${c}px` : c, M = O === "horizontal", B = M ? "width" : "height", W = b.useRef(null), G = gt(o, W), oe = () => g.current ? g.current[M ? "clientWidth" : "clientHeight"] : 0, z = Pt(W, (Q, fe) => {
    g.current && M && (g.current.style.position = "absolute"), Q.style[B] = I, y && y(Q, fe);
  }), V = Pt(W, (Q, fe) => {
    const Ie = oe();
    g.current && M && (g.current.style.position = "");
    const {
      duration: xe,
      easing: Be
    } = nr({
      style: C,
      timeout: S,
      easing: p
    }, {
      mode: "enter"
    });
    if (S === "auto") {
      const ye = F.transitions.getAutoHeightDuration(Ie);
      Q.style.transitionDuration = `${ye}ms`, $.current = ye;
    } else
      Q.style.transitionDuration = typeof xe == "string" ? xe : `${xe}ms`;
    Q.style[B] = `${Ie}px`, Q.style.transitionTimingFunction = Be, f && f(Q, fe);
  }), Y = Pt(W, (Q, fe) => {
    Q.style[B] = "auto", x && x(Q, fe);
  }), ne = Pt(W, (Q) => {
    Q.style[B] = `${oe()}px`, v && v(Q);
  }), te = Pt(W, h), re = Pt(W, (Q) => {
    const fe = oe(), {
      duration: Ie,
      easing: xe
    } = nr({
      style: C,
      timeout: S,
      easing: p
    }, {
      mode: "exit"
    });
    if (S === "auto") {
      const Be = F.transitions.getAutoHeightDuration(fe);
      Q.style.transitionDuration = `${Be}ms`, $.current = Be;
    } else
      Q.style.transitionDuration = typeof Ie == "string" ? Ie : `${Ie}ms`;
    Q.style[B] = I, Q.style.transitionTimingFunction = xe, w && w(Q);
  }), ee = (Q) => {
    S === "auto" && P.start($.current || 0, Q), i && i(W.current, Q);
  }, K = {
    slots: k,
    slotProps: E,
    component: d
  }, [U, X] = be("root", {
    ref: G,
    className: de(D.root, a),
    elementType: Gy,
    externalForwardedProps: K,
    ownerState: _,
    additionalProps: {
      style: {
        [M ? "minWidth" : "minHeight"]: I,
        ...C
      }
    }
  }), [Z, ae] = be("wrapper", {
    ref: g,
    className: D.wrapper,
    elementType: qy,
    externalForwardedProps: K,
    ownerState: _
  }), [j, me] = be("wrapperInner", {
    className: D.wrapperInner,
    elementType: Ky,
    externalForwardedProps: K,
    ownerState: _
  });
  return /* @__PURE__ */ l(N, {
    in: m,
    onEnter: z,
    onEntered: Y,
    onEntering: V,
    onExit: ne,
    onExited: te,
    onExiting: re,
    addEndListener: ee,
    nodeRef: W,
    timeout: S === "auto" ? null : S,
    ...A,
    children: (Q, {
      ownerState: fe,
      ...Ie
    }) => {
      const xe = {
        ..._,
        state: Q
      };
      return /* @__PURE__ */ l(U, {
        ...X,
        className: de(X.className, {
          entered: D.entered,
          exited: !m && I === "0px" && D.hidden
        }[Q]),
        ownerState: xe,
        ...Ie,
        children: /* @__PURE__ */ l(Z, {
          ...ae,
          ownerState: xe,
          children: /* @__PURE__ */ l(j, {
            ...me,
            ownerState: xe,
            children: s
          })
        })
      });
    }
  });
});
process.env.NODE_ENV !== "production" && (is.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: n.func,
  /**
   * The content node to be collapsed.
   */
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * The width (horizontal) or height (vertical) of the container when collapsed.
   * @default '0px'
   */
  collapsedSize: n.oneOfType([n.number, n.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: vl,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: n.oneOfType([n.shape({
    enter: n.string,
    exit: n.string
  }), n.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: n.bool,
  /**
   * @ignore
   */
  onEnter: n.func,
  /**
   * @ignore
   */
  onEntered: n.func,
  /**
   * @ignore
   */
  onEntering: n.func,
  /**
   * @ignore
   */
  onExit: n.func,
  /**
   * @ignore
   */
  onExited: n.func,
  /**
   * @ignore
   */
  onExiting: n.func,
  /**
   * The transition orientation.
   * @default 'vertical'
   */
  orientation: n.oneOf(["horizontal", "vertical"]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: n.shape({
    root: n.oneOfType([n.func, n.object]),
    wrapper: n.oneOfType([n.func, n.object]),
    wrapperInner: n.oneOfType([n.func, n.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: n.shape({
    root: n.elementType,
    wrapper: n.elementType,
    wrapperInner: n.elementType
  }),
  /**
   * @ignore
   */
  style: n.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default duration.standard
   */
  timeout: n.oneOfType([n.oneOf(["auto"]), n.number, n.shape({
    appear: n.number,
    enter: n.number,
    exit: n.number
  })])
});
is && (is.muiSupportAuto = !0);
function Yy(e) {
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
function Ep(e, t, o, r) {
  const i = e[t];
  if (i == null || !Number.isInteger(i)) {
    const s = Yy(i);
    return new RangeError(`Invalid ${r} \`${t}\` of type \`${s}\` supplied to \`${o}\`, expected \`integer\`.`);
  }
  return null;
}
function Op(e, t, o, r) {
  return e[t] === void 0 ? null : Ep(e, t, o, r);
}
function Da() {
  return null;
}
Op.isRequired = Ep;
Da.isRequired = Da;
const Rp = process.env.NODE_ENV === "production" ? Da : Op;
function Xy(e) {
  return Se("MuiPaper", e);
}
we("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const Jy = (e) => {
  const {
    square: t,
    elevation: o,
    variant: r,
    classes: i
  } = e, s = {
    root: ["root", r, !t && "rounded", r === "elevation" && `elevation${o}`]
  };
  return Te(s, Xy, i);
}, Qy = J("div", {
  name: "MuiPaper",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [t.root, t[o.variant], !o.square && t.rounded, o.variant === "elevation" && t[`elevation${o.elevation}`]];
  }
})(Pe(({
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
}))), ht = /* @__PURE__ */ b.forwardRef(function(t, o) {
  var f;
  const r = Ee({
    props: t,
    name: "MuiPaper"
  }), i = ko(), {
    className: s,
    component: a = "div",
    elevation: c = 1,
    square: d = !1,
    variant: p = "elevation",
    ...m
  } = r, y = {
    ...r,
    component: a,
    elevation: c,
    square: d,
    variant: p
  }, x = Jy(y);
  return process.env.NODE_ENV !== "production" && i.shadows[c] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${c}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${c}]\` is defined.`].join(`
`)), /* @__PURE__ */ l(Qy, {
    as: a,
    ownerState: y,
    className: de(x.root, s),
    ref: o,
    ...m,
    style: {
      ...p === "elevation" && {
        "--Paper-shadow": (i.vars || i).shadows[c],
        ...i.vars && {
          "--Paper-overlay": (f = i.vars.overlays) == null ? void 0 : f[c]
        },
        ...!i.vars && i.palette.mode === "dark" && {
          "--Paper-overlay": `linear-gradient(${Zi("#fff", Ia(c))}, ${Zi("#fff", Ia(c))})`
        }
      },
      ...m.style
    }
  });
});
process.env.NODE_ENV !== "production" && (ht.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: n.elementType,
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 1
   */
  elevation: Un(Rp, (e) => {
    const {
      elevation: t,
      variant: o
    } = e;
    return t > 0 && o === "outlined" ? new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${o}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`) : null;
  }),
  /**
   * If `true`, rounded corners are disabled.
   * @default false
   */
  square: n.bool,
  /**
   * @ignore
   */
  style: n.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  /**
   * The variant to use.
   * @default 'elevation'
   */
  variant: n.oneOfType([n.oneOf(["elevation", "outlined"]), n.string])
});
const xl = /* @__PURE__ */ b.createContext({});
process.env.NODE_ENV !== "production" && (xl.displayName = "AccordionContext");
function Zy(e) {
  return Se("MuiAccordion", e);
}
const Ei = we("MuiAccordion", ["root", "heading", "rounded", "expanded", "disabled", "gutters", "region"]), ev = (e) => {
  const {
    classes: t,
    square: o,
    expanded: r,
    disabled: i,
    disableGutters: s
  } = e;
  return Te({
    root: ["root", !o && "rounded", r && "expanded", i && "disabled", !s && "gutters"],
    heading: ["heading"],
    region: ["region"]
  }, Zy, t);
}, tv = J(ht, {
  name: "MuiAccordion",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [{
      [`& .${Ei.region}`]: t.region
    }, t.root, !o.square && t.rounded, !o.disableGutters && t.gutters];
  }
})(Pe(({
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
    [`&.${Ei.expanded}`]: {
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
    [`&.${Ei.disabled}`]: {
      backgroundColor: (e.vars || e).palette.action.disabledBackground
    }
  };
}), Pe(({
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
      [`&.${Ei.expanded}`]: {
        margin: "16px 0"
      }
    }
  }]
}))), nv = J("h3", {
  name: "MuiAccordion",
  slot: "Heading"
})({
  all: "unset"
}), ov = J("div", {
  name: "MuiAccordion",
  slot: "Region"
})({}), Np = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiAccordion"
  }), {
    children: i,
    className: s,
    defaultExpanded: a = !1,
    disabled: c = !1,
    disableGutters: d = !1,
    expanded: p,
    onChange: m,
    slots: y = {},
    slotProps: x = {},
    ...f
  } = r, [v, h] = os({
    controlled: p,
    default: a,
    name: "Accordion",
    state: "expanded"
  }), w = b.useCallback((M) => {
    h(!v), m && m(M, !v);
  }, [v, m, h]), [O, ...k] = b.Children.toArray(i), E = b.useMemo(() => ({
    expanded: v,
    disabled: c,
    disableGutters: d,
    toggle: w
  }), [v, c, d, w]), C = {
    ...r,
    disabled: c,
    disableGutters: d,
    expanded: v
  }, S = ev(C), N = {
    slots: y,
    slotProps: x
  }, [A, _] = be("root", {
    elementType: tv,
    externalForwardedProps: {
      ...N,
      ...f
    },
    className: de(S.root, s),
    shouldForwardComponentProp: !0,
    ownerState: C,
    ref: o
  }), [D, F] = be("heading", {
    elementType: nv,
    externalForwardedProps: N,
    className: S.heading,
    ownerState: C
  }), [P, g] = be("transition", {
    elementType: is,
    externalForwardedProps: N,
    ownerState: C
  }), [$, I] = be("region", {
    elementType: ov,
    externalForwardedProps: N,
    ownerState: C,
    className: S.region,
    additionalProps: {
      "aria-labelledby": O.props.id,
      id: O.props["aria-controls"],
      role: "region"
    }
  });
  return /* @__PURE__ */ T(A, {
    ..._,
    children: [/* @__PURE__ */ l(D, {
      ...F,
      children: /* @__PURE__ */ l(xl.Provider, {
        value: E,
        children: O
      })
    }), /* @__PURE__ */ l(P, {
      in: v,
      timeout: "auto",
      ...g,
      children: /* @__PURE__ */ l($, {
        ...I,
        children: k
      })
    })]
  });
});
process.env.NODE_ENV !== "production" && (Np.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: Un(n.node.isRequired, (e) => {
    const t = b.Children.toArray(e.children)[0];
    return Eo.isFragment(t) ? new Error("MUI: The Accordion doesn't accept a Fragment as a child. Consider providing an array instead.") : /* @__PURE__ */ b.isValidElement(t) ? null : new Error("MUI: Expected the first child of Accordion to be a valid element.");
  }),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * If `true`, expands the accordion by default.
   * @default false
   */
  defaultExpanded: n.bool,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: n.bool,
  /**
   * If `true`, it removes the margin between two expanded accordion items and prevents the increased height when expanded.
   * @default false
   */
  disableGutters: n.bool,
  /**
   * If `true`, expands the accordion, otherwise collapses it.
   * Setting this prop enables control over the accordion.
   */
  expanded: n.bool,
  /**
   * Callback fired when the expand/collapse state is changed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {boolean} expanded The `expanded` state of the accordion.
   */
  onChange: n.func,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: n.shape({
    heading: n.oneOfType([n.func, n.object]),
    region: n.oneOfType([n.func, n.object]),
    root: n.oneOfType([n.func, n.object]),
    transition: n.oneOfType([n.func, n.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: n.shape({
    heading: n.elementType,
    region: n.elementType,
    root: n.elementType,
    transition: n.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object])
});
function rv(e) {
  return Se("MuiAccordionDetails", e);
}
we("MuiAccordionDetails", ["root"]);
const iv = (e) => {
  const {
    classes: t
  } = e;
  return Te({
    root: ["root"]
  }, rv, t);
}, sv = J("div", {
  name: "MuiAccordionDetails",
  slot: "Root"
})(Pe(({
  theme: e
}) => ({
  padding: e.spacing(1, 2, 2)
}))), kp = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiAccordionDetails"
  }), {
    className: i,
    ...s
  } = r, a = r, c = iv(a);
  return /* @__PURE__ */ l(sv, {
    className: de(c.root, i),
    ref: o,
    ownerState: a,
    ...s
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
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object])
});
const bn = n.oneOfType([n.func, n.object]);
function ss(e) {
  try {
    return e.matches(":focus-visible");
  } catch {
    process.env.NODE_ENV !== "production" && !window.navigator.userAgent.includes("jsdom") && console.warn(["MUI: The `:focus-visible` pseudo class is not supported in this browser.", "Some components rely on this feature to work properly."].join(`
`));
  }
  return !1;
}
function av(e) {
  const {
    focusableWhenDisabled: t,
    disabled: o,
    composite: r = !1,
    tabIndex: i = 0,
    isNativeButton: s
  } = e, a = r && t !== !1, c = r && t === !1;
  return b.useMemo(() => {
    const p = {
      // allow Tabbing away from focusableWhenDisabled elements
      onKeyDown(m) {
        o && t && m.key !== "Tab" && m.preventDefault();
      }
    };
    return r || (p.tabIndex = i, !s && o && (p.tabIndex = t ? i : -1)), (s && (t || a) || !s && o) && (p["aria-disabled"] = o), s && (!t || c) && (p.disabled = o), p;
  }, [r, o, t, a, c, s, i]);
}
const lv = {};
function cv(e) {
  const {
    nativeButton: t,
    nativeButtonProp: o,
    internalNativeButton: r = t,
    allowInferredHostMismatch: i = !1,
    disabled: s,
    type: a,
    hasFormAction: c = !1,
    tabIndex: d = 0,
    focusableWhenDisabled: p,
    stopEventPropagation: m = !1,
    onBeforeKeyDown: y,
    onBeforeKeyUp: x
  } = e, f = b.useRef(null), v = p === !0, h = av({
    focusableWhenDisabled: v,
    disabled: s,
    isNativeButton: t,
    tabIndex: d
  });
  process.env.NODE_ENV !== "production" && b.useEffect(() => {
    const E = f.current;
    if (E == null)
      return;
    const C = E.tagName === "BUTTON";
    if (o !== void 0) {
      o && !C && console.error("MUI: A component that acts as a button expected a native <button> because the `nativeButton` prop is true. Rendering a non-<button> removes native button semantics, which can impact forms and accessibility. Render a real <button> or set `nativeButton` to `false`."), !o && C && console.error("MUI: A component that acts as a button expected a non-<button> because the `nativeButton` prop is false. Rendering a <button> keeps native behavior while additionally applies non-native attributes and handlers, which can add unintended extra attributes (such as `role` or `aria-disabled`). Render a non-<button> such as <div>, or set `nativeButton` to `true`.");
      return;
    }
    i || (r && !C && console.error("MUI: A component rendering a native <button> resolved to a non-<button> element, but `nativeButton={false}` was not specified and the resolved root is a non-<button>. When rendering a custom component, set `nativeButton={false}` explicitly or render a <button> element."), !r && C && console.error("MUI: A component that acts as a non-native button resolved to a native <button> element, but `nativeButton={true}` was not specified. When rendering a custom component, set `nativeButton={true}` explicitly or render a non-<button> element."));
  }, [i, r, o]);
  const w = b.useCallback(() => {
    const E = f.current;
    return E == null ? t : E.tagName === "BUTTON" ? !0 : !!(E.tagName === "A" && E.href);
  }, [t]), O = b.useMemo(() => {
    const E = v ? {} : {
      tabIndex: s ? -1 : d
    };
    return t ? (E.type = a === void 0 && !c ? "button" : a, v || (E.disabled = s)) : (E.role = "button", !v && s && (E["aria-disabled"] = s)), v ? {
      ...E,
      ...h
    } : E;
  }, [s, v, h, c, t, d, a]);
  return {
    getButtonProps: b.useCallback((E = lv) => {
      const {
        onClick: C,
        onKeyDown: S,
        onKeyUp: N,
        ...A
      } = E;
      return {
        ...O,
        ...A,
        onClick: (P) => {
          if (m && P.stopPropagation(), s) {
            P.preventDefault();
            return;
          }
          C == null || C(P);
        },
        onKeyDown: (P) => {
          if (v && h.onKeyDown(P), !s && (y == null || y(P), S == null || S(P), !(P.target !== P.currentTarget || w()))) {
            if (P.key === " ") {
              P.preventDefault();
              return;
            }
            P.key === "Enter" && (P.preventDefault(), P.currentTarget.click());
          }
        },
        onKeyUp: (P) => {
          s || (x == null || x(P), N == null || N(P), P.target === P.currentTarget && !w() && P.key === " " && !P.defaultPrevented && P.currentTarget.click());
        }
      };
    }, [O, s, v, h, w, y, x, m]),
    rootRef: f
  };
}
class as {
  constructor() {
    $o(this, "mountEffect", () => {
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
    return new as();
  }
  static use() {
    const t = gp(as.create).current, [o, r] = b.useState(!1);
    return t.shouldMount = o, t.setShouldMount = r, b.useEffect(t.mountEffect, [o]), t;
  }
  mount() {
    return this.mounted || (this.mounted = uv(), this.shouldMount = !0, this.setShouldMount(this.shouldMount)), this.mounted;
  }
  /* Ripple API */
  start(...t) {
    this.mount().then(() => {
      var o;
      return (o = this.ref.current) == null ? void 0 : o.start(...t);
    });
  }
  stop(...t) {
    this.mount().then(() => {
      var o;
      return (o = this.ref.current) == null ? void 0 : o.stop(...t);
    });
  }
  pulsate(...t) {
    this.mount().then(() => {
      var o;
      return (o = this.ref.current) == null ? void 0 : o.pulsate(...t);
    });
  }
}
function dv() {
  return as.use();
}
function uv() {
  let e, t;
  const o = new Promise((r, i) => {
    e = r, t = i;
  });
  return o.resolve = e, o.reject = t, o;
}
function Pp(e) {
  const {
    className: t,
    classes: o,
    pulsate: r = !1,
    rippleX: i,
    rippleY: s,
    rippleSize: a,
    in: c,
    onExited: d,
    timeout: p
  } = e, [m, y] = b.useState(!1), x = de(t, o.ripple, o.rippleVisible, r && o.ripplePulsate), f = {
    width: a,
    height: a,
    top: -(a / 2) + s,
    left: -(a / 2) + i
  }, v = de(o.child, m && o.childLeaving, r && o.childPulsate);
  return !c && !m && y(!0), b.useEffect(() => {
    if (!c && d != null) {
      const h = setTimeout(d, p);
      return () => {
        clearTimeout(h);
      };
    }
  }, [d, c, p]), /* @__PURE__ */ l("span", {
    className: x,
    style: f,
    children: /* @__PURE__ */ l("span", {
      className: v
    })
  });
}
process.env.NODE_ENV !== "production" && (Pp.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object.isRequired,
  className: n.string,
  /**
   * @ignore - injected from TransitionGroup
   */
  in: n.bool,
  /**
   * @ignore - injected from TransitionGroup
   */
  onExited: n.func,
  /**
   * If `true`, the ripple pulsates, typically indicating the keyboard focus state of an element.
   */
  pulsate: n.bool,
  /**
   * Diameter of the ripple.
   */
  rippleSize: n.number,
  /**
   * Horizontal position of the ripple center.
   */
  rippleX: n.number,
  /**
   * Vertical position of the ripple center.
   */
  rippleY: n.number,
  /**
   * exit delay
   */
  timeout: n.number.isRequired
});
const un = we("MuiTouchRipple", ["root", "ripple", "rippleVisible", "ripplePulsate", "child", "childLeaving", "childPulsate"]), La = 550, pv = 80, fv = ii`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`, mv = ii`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`, hv = ii`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`, gv = J("span", {
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
}), bv = J(Pp, {
  name: "MuiTouchRipple",
  slot: "Ripple"
})`
  opacity: 0;
  position: absolute;

  &.${un.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${fv};
    animation-duration: ${La}ms;
    animation-timing-function: ${({
  theme: e
}) => e.transitions.easing.easeInOut};
  }

  &.${un.ripplePulsate} {
    animation-duration: ${({
  theme: e
}) => e.transitions.duration.shorter}ms;
  }

  & .${un.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${un.childLeaving} {
    opacity: 0;
    animation-name: ${mv};
    animation-duration: ${La}ms;
    animation-timing-function: ${({
  theme: e
}) => e.transitions.easing.easeInOut};
  }

  & .${un.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${hv};
    animation-duration: 2500ms;
    animation-timing-function: ${({
  theme: e
}) => e.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`, Ip = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiTouchRipple"
  }), {
    center: i = !1,
    classes: s = {},
    className: a,
    ...c
  } = r, [d, p] = b.useState([]), m = b.useRef(0), y = b.useRef(null);
  b.useEffect(() => {
    y.current && (y.current(), y.current = null);
  }, [d]);
  const x = b.useRef(!1), f = Qn(), v = b.useRef(null), h = b.useRef(null), w = b.useCallback((C) => {
    const {
      pulsate: S,
      rippleX: N,
      rippleY: A,
      rippleSize: _,
      cb: D
    } = C;
    p((F) => [...F, /* @__PURE__ */ l(bv, {
      classes: {
        ripple: de(s.ripple, un.ripple),
        rippleVisible: de(s.rippleVisible, un.rippleVisible),
        ripplePulsate: de(s.ripplePulsate, un.ripplePulsate),
        child: de(s.child, un.child),
        childLeaving: de(s.childLeaving, un.childLeaving),
        childPulsate: de(s.childPulsate, un.childPulsate)
      },
      timeout: La,
      pulsate: S,
      rippleX: N,
      rippleY: A,
      rippleSize: _
    }, m.current)]), m.current += 1, y.current = D;
  }, [s]), O = b.useCallback((C = {}, S = {}, N = () => {
  }) => {
    const {
      pulsate: A = !1,
      center: _ = i || S.pulsate,
      fakeElement: D = !1
      // For test purposes
    } = S;
    if ((C == null ? void 0 : C.type) === "mousedown" && x.current) {
      x.current = !1;
      return;
    }
    (C == null ? void 0 : C.type) === "touchstart" && (x.current = !0);
    const F = D ? null : h.current, P = F ? F.getBoundingClientRect() : {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    };
    let g, $, I;
    if (_ || C === void 0 || C.clientX === 0 && C.clientY === 0 || !C.clientX && !C.touches)
      g = Math.round(P.width / 2), $ = Math.round(P.height / 2);
    else {
      const {
        clientX: M,
        clientY: B
      } = C.touches && C.touches.length > 0 ? C.touches[0] : C;
      g = Math.round(M - P.left), $ = Math.round(B - P.top);
    }
    if (_)
      I = Math.sqrt((2 * P.width ** 2 + P.height ** 2) / 3), I % 2 === 0 && (I += 1);
    else {
      const M = Math.max(Math.abs((F ? F.clientWidth : 0) - g), g) * 2 + 2, B = Math.max(Math.abs((F ? F.clientHeight : 0) - $), $) * 2 + 2;
      I = Math.sqrt(M ** 2 + B ** 2);
    }
    C != null && C.touches ? v.current === null && (v.current = () => {
      w({
        pulsate: A,
        rippleX: g,
        rippleY: $,
        rippleSize: I,
        cb: N
      });
    }, f.start(pv, () => {
      v.current && (v.current(), v.current = null);
    })) : w({
      pulsate: A,
      rippleX: g,
      rippleY: $,
      rippleSize: I,
      cb: N
    });
  }, [i, w, f]), k = b.useCallback(() => {
    O({}, {
      pulsate: !0
    });
  }, [O]), E = b.useCallback((C, S) => {
    if (f.clear(), (C == null ? void 0 : C.type) === "touchend" && v.current) {
      v.current(), v.current = null, f.start(0, () => {
        E(C, S);
      });
      return;
    }
    v.current = null, p((N) => N.length > 0 ? N.slice(1) : N), y.current = S;
  }, [f]);
  return b.useImperativeHandle(o, () => ({
    pulsate: k,
    start: O,
    stop: E
  }), [k, O, E]), /* @__PURE__ */ l(gv, {
    className: de(un.root, s.root, a),
    ref: h,
    ...c,
    children: /* @__PURE__ */ l(yl, {
      component: null,
      exit: !0,
      children: d
    })
  });
});
process.env.NODE_ENV !== "production" && (Ip.propTypes = {
  /**
   * If `true`, the ripple starts at the center of the component
   * rather than at the point of interaction.
   */
  center: n.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string
});
function yv(e) {
  return Se("MuiButtonBase", e);
}
const vv = we("MuiButtonBase", ["root", "disabled", "focusVisible"]), xv = (e) => {
  const {
    disabled: t,
    focusVisible: o,
    focusVisibleClassName: r,
    suppressFocusVisible: i,
    classes: s
  } = e, c = Te({
    root: ["root", t && "disabled", o && !i && "focusVisible"]
  }, yv, s);
  return o && !i && r && (c.root += ` ${r}`), c;
}, Sv = J("button", {
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
  [`&.${vv.disabled}`]: {
    pointerEvents: "none",
    // Disable link interactions
    cursor: "default"
  },
  "@media print": {
    colorAdjust: "exact"
  }
}), zn = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiButtonBase"
  }), {
    action: i,
    centerRipple: s = !1,
    children: a,
    className: c,
    component: d = "button",
    disabled: p = !1,
    disableRipple: m = !1,
    disableTouchRipple: y = !1,
    focusRipple: x = !1,
    focusVisibleClassName: f,
    /* eslint-disable react/prop-types */
    // replaces internal handling in Chip, other components can opt-in individually to use this in the future
    focusableWhenDisabled: v,
    // escape hatch to suppress the focusVisible state and callback
    // used by anchored <Menu>s to to suppress focus visible styling when opened with a pointer
    suppressFocusVisible: h = !1,
    // private prop to allow native vs non-native button props to be resolved before mount
    internalNativeButton: w,
    /* eslint-enable react/prop-types */
    LinkComponent: O = "a",
    nativeButton: k,
    onBlur: E,
    onClick: C,
    onContextMenu: S,
    onDragLeave: N,
    onFocus: A,
    onFocusVisible: _,
    onKeyDown: D,
    onKeyUp: F,
    onMouseDown: P,
    onMouseLeave: g,
    onMouseUp: $,
    onTouchEnd: I,
    onTouchMove: M,
    onTouchStart: B,
    tabIndex: W = 0,
    TouchRippleProps: G,
    touchRippleRef: oe,
    type: z,
    ...V
  } = r, Y = !!(V.href || V.to), ne = !!V.formAction;
  let te = d;
  te === "button" && Y && (te = O);
  const re = typeof te == "string" ? te === "button" : w ?? !1, ee = k ?? re, K = dv(), U = gt(K.ref, oe), [X, Z] = b.useState(!1);
  (p || h) && X && Z(!1);
  const ae = It(($e) => {
    x && !$e.repeat && X && $e.key === " " && K.stop($e, () => {
      K.start($e);
    });
  }), j = It(($e) => {
    x && $e.key === " " && X && !$e.defaultPrevented && K.stop($e, () => {
      K.pulsate($e);
    });
  }), {
    getButtonProps: me,
    rootRef: Q
  } = cv({
    nativeButton: ee,
    nativeButtonProp: k,
    internalNativeButton: re,
    allowInferredHostMismatch: Y || typeof te == "string",
    disabled: p,
    type: z,
    hasFormAction: ne,
    tabIndex: W,
    onBeforeKeyDown: ae,
    onBeforeKeyUp: j
  }), {
    onClick: fe,
    onKeyDown: Ie,
    onKeyUp: xe,
    ...Be
  } = me({
    onClick: C,
    onKeyDown: D,
    onKeyUp: F
  });
  b.useImperativeHandle(i, () => ({
    focusVisible: () => {
      Z(!0), Q.current.focus();
    }
  }), [Q]);
  const ye = K.shouldMount && !m && !p;
  b.useEffect(() => {
    X && x && !m && K.pulsate();
  }, [m, x, X, K]);
  const Ge = Kn(K, "start", P, y), Me = Kn(K, "stop", S, y), Fe = Kn(K, "stop", N, y), rt = Kn(K, "stop", $, y), ke = Kn(K, "stop", ($e) => {
    X && $e.preventDefault(), g && g($e);
  }, y), Ue = Kn(K, "start", B, y), ut = Kn(K, "stop", I, y), De = Kn(K, "stop", M, y), tt = Kn(K, "stop", ($e) => {
    ss($e.target) || Z(!1), E && E($e);
  }, !1), We = It(($e) => {
    Q.current || (Q.current = $e.currentTarget), !h && ss($e.target) && (Z(!0), _ && _($e)), A && A($e);
  }), ue = {};
  Y && (ue.tabIndex = p ? -1 : W, p && (ue["aria-disabled"] = p), ue.type = z);
  const Ae = gt(o, Q), ze = {
    ...r,
    centerRipple: s,
    component: d,
    disabled: p,
    disableRipple: m,
    disableTouchRipple: y,
    focusRipple: x,
    suppressFocusVisible: h,
    tabIndex: W,
    focusVisible: X
  }, pt = xv(ze);
  return /* @__PURE__ */ T(Sv, {
    as: te,
    className: de(pt.root, c),
    ownerState: ze,
    onBlur: tt,
    onClick: fe,
    onContextMenu: Me,
    onFocus: We,
    onKeyDown: Ie,
    onKeyUp: xe,
    onMouseDown: Ge,
    onMouseLeave: ke,
    onMouseUp: rt,
    onDragLeave: Fe,
    onTouchEnd: ut,
    onTouchMove: De,
    onTouchStart: Ue,
    ref: Ae,
    ...Y ? ue : Be,
    ...V,
    children: [a, ye ? /* @__PURE__ */ l(Ip, {
      ref: U,
      center: s,
      ...G
    }) : null]
  });
});
function Kn(e, t, o, r = !1) {
  return It((i) => (o && o(i), r || e[t](i), !0));
}
process.env.NODE_ENV !== "production" && (zn.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports `focusVisible()` action.
   */
  action: bn,
  /**
   * If `true`, the ripples are centered.
   * They won't start at the cursor interaction position.
   * @default false
   */
  centerRipple: n.bool,
  /**
   * The content of the component.
   */
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: vl,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: n.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: n.bool,
  /**
   * If `true`, the touch ripple effect is disabled.
   * @default false
   */
  disableTouchRipple: n.bool,
  /**
   * If `true`, the base button will have a keyboard focus ripple.
   * @default false
   */
  focusRipple: n.bool,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: n.string,
  /**
   * @ignore
   */
  formAction: n.oneOfType([n.func, n.string]),
  /**
   * @ignore
   */
  href: n.any,
  /**
   * The component used to render a link when the `href` prop is provided.
   * @default 'a'
   */
  LinkComponent: n.elementType,
  /**
   * Whether the custom component is expected to render a native `<button>` element
   * when passing a React component to the `component` or `slots` prop.
   */
  nativeButton: n.bool,
  /**
   * @ignore
   */
  onBlur: n.func,
  /**
   * @ignore
   */
  onClick: n.func,
  /**
   * @ignore
   */
  onContextMenu: n.func,
  /**
   * @ignore
   */
  onDragLeave: n.func,
  /**
   * @ignore
   */
  onFocus: n.func,
  /**
   * Callback fired when the component is focused with a keyboard.
   * We trigger a `onFocus` callback too.
   */
  onFocusVisible: n.func,
  /**
   * @ignore
   */
  onKeyDown: n.func,
  /**
   * @ignore
   */
  onKeyUp: n.func,
  /**
   * @ignore
   */
  onMouseDown: n.func,
  /**
   * @ignore
   */
  onMouseLeave: n.func,
  /**
   * @ignore
   */
  onMouseUp: n.func,
  /**
   * @ignore
   */
  onTouchEnd: n.func,
  /**
   * @ignore
   */
  onTouchMove: n.func,
  /**
   * @ignore
   */
  onTouchStart: n.func,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  /**
   * @default 0
   */
  tabIndex: n.number,
  /**
   * Props applied to the `TouchRipple` element.
   */
  TouchRippleProps: n.object,
  /**
   * A ref that points to the `TouchRipple` element.
   */
  touchRippleRef: n.oneOfType([n.func, n.shape({
    current: n.shape({
      pulsate: n.func.isRequired,
      start: n.func.isRequired,
      stop: n.func.isRequired
    })
  })]),
  /**
   * The HTML [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#type)
   * attribute applied to `button` and `a` elements.
   * Ignored when rendering non-native buttons.
   * @default 'button'
   */
  type: n.string
});
function Cv(e) {
  return Se("MuiAccordionSummary", e);
}
const qo = we("MuiAccordionSummary", ["root", "expanded", "focusVisible", "disabled", "gutters", "content", "expandIconWrapper"]), wv = (e) => {
  const {
    classes: t,
    expanded: o,
    disabled: r,
    disableGutters: i
  } = e;
  return Te({
    root: ["root", o && "expanded", r && "disabled", !i && "gutters"],
    focusVisible: ["focusVisible"],
    content: ["content", o && "expanded"],
    expandIconWrapper: ["expandIconWrapper", o && "expanded"]
  }, Cv, t);
}, Tv = J(zn, {
  name: "MuiAccordionSummary",
  slot: "Root"
})(Pe(({
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
    [`&.${qo.focusVisible}`]: {
      backgroundColor: (e.vars || e).palette.action.focus
    },
    [`&.${qo.disabled}`]: {
      opacity: (e.vars || e).palette.action.disabledOpacity
    },
    [`&:hover:not(.${qo.disabled})`]: {
      cursor: "pointer"
    },
    variants: [{
      props: (o) => !o.disableGutters,
      style: {
        [`&.${qo.expanded}`]: {
          minHeight: 64
        }
      }
    }]
  };
})), Ev = J("span", {
  name: "MuiAccordionSummary",
  slot: "Content"
})(Pe(({
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
      [`&.${qo.expanded}`]: {
        margin: "20px 0"
      }
    }
  }]
}))), Ov = J("span", {
  name: "MuiAccordionSummary",
  slot: "ExpandIconWrapper"
})(Pe(({
  theme: e
}) => ({
  display: "flex",
  color: (e.vars || e).palette.action.active,
  transform: "rotate(0deg)",
  transition: e.transitions.create("transform", {
    duration: e.transitions.duration.shortest
  }),
  [`&.${qo.expanded}`]: {
    transform: "rotate(180deg)"
  }
}))), $p = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiAccordionSummary"
  }), {
    children: i,
    className: s,
    expandIcon: a,
    focusVisibleClassName: c,
    onClick: d,
    slots: p,
    slotProps: m,
    ...y
  } = r, {
    disabled: x = !1,
    disableGutters: f,
    expanded: v,
    toggle: h
  } = b.useContext(xl), w = (F) => {
    h && h(F), d && d(F);
  }, O = {
    ...r,
    expanded: v,
    disabled: x,
    disableGutters: f
  }, k = wv(O), E = {
    slots: p,
    slotProps: m
  }, [C, S] = be("root", {
    ref: o,
    shouldForwardComponentProp: !0,
    className: de(k.root, s),
    elementType: Tv,
    externalForwardedProps: {
      ...E,
      ...y
    },
    ownerState: O,
    additionalProps: {
      focusRipple: !1,
      disableRipple: !0,
      internalNativeButton: !0,
      disabled: x,
      "aria-expanded": v,
      focusVisibleClassName: de(k.focusVisible, c)
    },
    getSlotProps: (F) => ({
      ...F,
      onClick: (P) => {
        var g;
        (g = F.onClick) == null || g.call(F, P), w(P);
      }
    })
  }), [N, A] = be("content", {
    className: k.content,
    elementType: Ev,
    externalForwardedProps: E,
    ownerState: O
  }), [_, D] = be("expandIconWrapper", {
    className: k.expandIconWrapper,
    elementType: Ov,
    externalForwardedProps: E,
    ownerState: O
  });
  return /* @__PURE__ */ T(C, {
    ...S,
    children: [/* @__PURE__ */ l(N, {
      ...A,
      children: i
    }), a && /* @__PURE__ */ l(_, {
      ...D,
      children: a
    })]
  });
});
process.env.NODE_ENV !== "production" && ($p.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * The icon to display as the expand indicator.
   */
  expandIcon: n.node,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: n.string,
  /**
   * @ignore
   */
  onClick: n.func,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: n.shape({
    content: n.oneOfType([n.func, n.object]),
    expandIconWrapper: n.oneOfType([n.func, n.object]),
    root: n.oneOfType([n.func, n.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: n.shape({
    content: n.elementType,
    expandIconWrapper: n.elementType,
    root: n.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object])
});
function Rv(e) {
  return typeof e.main == "string";
}
function Nv(e, t = []) {
  if (!Rv(e))
    return !1;
  for (const o of t)
    if (!e.hasOwnProperty(o) || typeof e[o] != "string")
      return !1;
  return !0;
}
function Ut(e = []) {
  return ([, t]) => t && Nv(t, e);
}
function kv(e) {
  return Se("MuiAlert", e);
}
const pd = we("MuiAlert", ["root", "action", "icon", "message", "filled", "colorSuccess", "colorInfo", "colorWarning", "colorError", "outlined", "standard"]);
function Pv(e) {
  return Se("MuiCircularProgress", e);
}
we("MuiCircularProgress", ["root", "determinate", "indeterminate", "colorPrimary", "colorSecondary", "svg", "track", "circle", "circleDisableShrink"]);
const Cn = 44, Ba = ii`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`, Fa = ii`
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
`, Iv = typeof Ba != "string" ? ol`
        animation: ${Ba} 1.4s linear infinite;
      ` : null, $v = typeof Fa != "string" ? ol`
        animation: ${Fa} 1.4s ease-in-out infinite;
      ` : null, Mv = (e) => {
  const {
    classes: t,
    variant: o,
    color: r,
    disableShrink: i
  } = e, s = {
    root: ["root", o, `color${Ce(r)}`],
    svg: ["svg"],
    track: ["track"],
    circle: ["circle", i && "circleDisableShrink"]
  };
  return Te(s, Pv, t);
}, Av = J("span", {
  name: "MuiCircularProgress",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [t.root, t[o.variant], t[`color${Ce(o.color)}`]];
  }
})(Pe(({
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
    style: Iv || {
      animation: `${Ba} 1.4s linear infinite`
    }
  }, ...Object.entries(e.palette).filter(Ut()).map(([t]) => ({
    props: {
      color: t
    },
    style: {
      color: (e.vars || e).palette[t].main
    }
  }))]
}))), _v = J("svg", {
  name: "MuiCircularProgress",
  slot: "Svg"
})({
  display: "block"
  // Keeps the progress centered
}), Dv = J("circle", {
  name: "MuiCircularProgress",
  slot: "Circle",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [t.circle, o.disableShrink && t.circleDisableShrink];
  }
})(Pe(({
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
    style: $v || {
      // At runtime for Pigment CSS, `dashAnimation` will be null and the generated keyframe will be used.
      animation: `${Fa} 1.4s ease-in-out infinite`
    }
  }]
}))), Lv = J("circle", {
  name: "MuiCircularProgress",
  slot: "Track"
})(Pe(({
  theme: e
}) => ({
  stroke: "currentColor",
  opacity: (e.vars || e).palette.action.activatedOpacity
}))), Qo = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiCircularProgress"
  }), {
    className: i,
    color: s = "primary",
    disableShrink: a = !1,
    enableTrackSlot: c = !1,
    min: d,
    max: p,
    size: m = 40,
    style: y,
    thickness: x = 3.6,
    value: f = r.min ?? 0,
    variant: v = "indeterminate",
    ...h
  } = r;
  process.env.NODE_ENV !== "production" && v === "indeterminate" && (d !== void 0 || p !== void 0) && console.warn("MUI: You have provided the `min` or `max` props with an 'indeterminate' variant. These props will have no effect.");
  const w = d ?? 0, O = p ?? 100, k = {
    ...r,
    color: s,
    disableShrink: a,
    size: m,
    thickness: x,
    value: f,
    variant: v,
    enableTrackSlot: c
  }, E = Mv(k), C = {}, S = {}, N = {};
  if (v === "determinate") {
    const A = 2 * Math.PI * ((Cn - x) / 2);
    process.env.NODE_ENV !== "production" && (f < w || f > O || w >= O) && console.error(`MUI: The min, max, and value props in CircularProgress should be numbers where min < max and min <= value <= max. Received min=${w}, max=${O}, value=${f}.`);
    const _ = O - w;
    C.strokeDasharray = A.toFixed(3), C.strokeDashoffset = _ > 0 ? `${((O - f) / _ * A).toFixed(3)}px` : `${A.toFixed(3)}px`, S.transform = "rotate(-90deg)", N["aria-valuenow"] = f, N["aria-valuemin"] = w, N["aria-valuemax"] = O;
  }
  return /* @__PURE__ */ l(Av, {
    className: de(E.root, i),
    style: {
      width: m,
      height: m,
      ...S,
      ...y
    },
    ownerState: k,
    ref: o,
    role: "progressbar",
    ...N,
    ...h,
    children: /* @__PURE__ */ T(_v, {
      className: E.svg,
      ownerState: k,
      viewBox: `${Cn / 2} ${Cn / 2} ${Cn} ${Cn}`,
      children: [c ? /* @__PURE__ */ l(Lv, {
        className: E.track,
        ownerState: k,
        cx: Cn,
        cy: Cn,
        r: (Cn - x) / 2,
        fill: "none",
        strokeWidth: x,
        "aria-hidden": "true"
      }) : null, /* @__PURE__ */ l(Dv, {
        className: E.circle,
        style: C,
        ownerState: k,
        cx: Cn,
        cy: Cn,
        r: (Cn - x) / 2,
        fill: "none",
        strokeWidth: x
      })]
    })
  });
});
process.env.NODE_ENV !== "production" && (Qo.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: n.oneOfType([n.oneOf(["inherit", "primary", "secondary", "error", "info", "success", "warning"]), n.string]),
  /**
   * If `true`, the shrink animation is disabled.
   * This only works if variant is `indeterminate`.
   * @default false
   */
  disableShrink: Un(n.bool, (e) => e.disableShrink && e.variant && e.variant !== "indeterminate" ? new Error("MUI: You have provided the `disableShrink` prop with a variant other than `indeterminate`. This will have no effect.") : null),
  /**
   * If `true`, a track circle slot is mounted to show a subtle background for the progress.
   * The `size` and `thickness` apply to the track slot to be consistent with the progress circle.
   * @default false
   */
  enableTrackSlot: n.bool,
  /**
   * The maximum value for the progress indicator for the determinate variant.
   * @default 100
   */
  max: n.number,
  /**
   * The minimum value for the progress indicator for the determinate variant.
   * @default 0
   */
  min: n.number,
  /**
   * The size of the component.
   * If using a number, the pixel unit is assumed.
   * If using a string, you need to provide the CSS unit, for example '3rem'.
   * @default 40
   */
  size: n.oneOfType([n.number, n.string]),
  /**
   * @ignore
   */
  style: n.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  /**
   * The thickness of the circle.
   * @default 3.6
   */
  thickness: n.number,
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between `min` and `max`.
   * @default props.min ?? 0
   */
  value: n.number,
  /**
   * The variant to use.
   * Use indeterminate when there is no progress value.
   * @default 'indeterminate'
   */
  variant: n.oneOf(["determinate", "indeterminate"])
});
function Bv(e) {
  return Se("MuiIconButton", e);
}
const fd = we("MuiIconButton", ["root", "disabled", "colorInherit", "colorPrimary", "colorSecondary", "colorError", "colorInfo", "colorSuccess", "colorWarning", "edgeStart", "edgeEnd", "sizeSmall", "sizeMedium", "sizeLarge", "loading", "loadingIndicator", "loadingWrapper"]), Fv = (e) => {
  const {
    classes: t,
    disabled: o,
    color: r,
    edge: i,
    size: s,
    loading: a
  } = e, c = {
    root: ["root", a && "loading", o && "disabled", r !== "default" && `color${Ce(r)}`, i && `edge${Ce(i)}`, `size${Ce(s)}`],
    loadingIndicator: ["loadingIndicator"],
    loadingWrapper: ["loadingWrapper"]
  };
  return Te(c, Bv, t);
}, jv = J(zn, {
  name: "MuiIconButton",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [t.root, o.loading && t.loading, o.color !== "default" && t[`color${Ce(o.color)}`], o.edge && t[`edge${Ce(o.edge)}`], t[`size${Ce(o.size)}`]];
  }
})(Pe(({
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
})), Pe(({
  theme: e
}) => ({
  variants: [{
    props: {
      color: "inherit"
    },
    style: {
      color: "inherit"
    }
  }, ...Object.entries(e.palette).filter(Ut()).map(([t]) => ({
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
  [`&.${fd.disabled}`]: {
    backgroundColor: "transparent",
    color: (e.vars || e).palette.action.disabled
  },
  [`&.${fd.loading}`]: {
    color: "transparent"
  }
}))), Wv = J("span", {
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
})), tn = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiIconButton"
  }), {
    edge: i = !1,
    children: s,
    className: a,
    color: c = "default",
    disabled: d = !1,
    disableFocusRipple: p = !1,
    size: m = "medium",
    id: y,
    loading: x = null,
    loadingIndicator: f,
    ...v
  } = r, h = to(y), w = f ?? /* @__PURE__ */ l(Qo, {
    "aria-labelledby": h,
    color: "inherit",
    size: 16
  }), O = {
    ...r,
    edge: i,
    color: c,
    disabled: d,
    disableFocusRipple: p,
    loading: x,
    loadingIndicator: w,
    size: m
  }, k = Fv(O);
  return /* @__PURE__ */ T(jv, {
    id: x ? h : y,
    className: de(k.root, a),
    centerRipple: !0,
    internalNativeButton: !0,
    focusRipple: !p,
    disabled: d || x,
    ref: o,
    ...v,
    ownerState: O,
    children: [typeof x == "boolean" && // use plain HTML span to minimize the runtime overhead
    /* @__PURE__ */ l("span", {
      className: k.loadingWrapper,
      style: {
        display: "contents"
      },
      children: /* @__PURE__ */ l(Wv, {
        className: k.loadingIndicator,
        ownerState: O,
        children: x && w
      })
    }), s]
  });
});
process.env.NODE_ENV !== "production" && (tn.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The icon to display.
   */
  children: Un(n.node, (e) => b.Children.toArray(e.children).some((o) => /* @__PURE__ */ b.isValidElement(o) && o.props.onClick) ? new Error(["MUI: You are providing an onClick event listener to a child of a button element.", "Prefer applying it to the IconButton directly.", "This guarantees that the whole <button> will be responsive to click events."].join(`
`)) : null),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'default'
   */
  color: n.oneOfType([n.oneOf(["inherit", "default", "primary", "secondary", "error", "info", "success", "warning"]), n.string]),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: n.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: n.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: n.bool,
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge: n.oneOf(["end", "start", !1]),
  /**
   * @ignore
   */
  id: n.string,
  /**
   * If `true`, the loading indicator is visible and the button is disabled.
   * If `true | false`, the loading wrapper is always rendered before the children to prevent [Google Translation Crash](https://github.com/mui/material-ui/issues/27853).
   * @default null
   */
  loading: n.bool,
  /**
   * Element placed before the children if the button is in loading state.
   * The node should contain an element with `role="progressbar"` with an accessible name.
   * By default, it renders a `CircularProgress` that is labeled by the button itself.
   * @default <CircularProgress color="inherit" size={16} />
   */
  loadingIndicator: n.node,
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: n.oneOfType([n.oneOf(["small", "medium", "large"]), n.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object])
});
const zv = dt(/* @__PURE__ */ l("path", {
  d: "M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"
}), "SuccessOutlined"), Vv = dt(/* @__PURE__ */ l("path", {
  d: "M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"
}), "ReportProblemOutlined"), Uv = dt(/* @__PURE__ */ l("path", {
  d: "M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
}), "ErrorOutline"), Hv = dt(/* @__PURE__ */ l("path", {
  d: "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"
}), "InfoOutlined"), Gv = dt(/* @__PURE__ */ l("path", {
  d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
}), "Close"), qv = (e) => {
  const {
    variant: t,
    color: o,
    severity: r,
    classes: i
  } = e, s = {
    root: ["root", `color${Ce(o || r)}`, `${t}`],
    icon: ["icon"],
    message: ["message"],
    action: ["action"]
  };
  return Te(s, kv, i);
}, Kv = J(ht, {
  name: "MuiAlert",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [t.root, t[o.variant]];
  }
})(Pe(({
  theme: e
}) => {
  const t = e.palette.mode === "light" ? e.darken : e.lighten, o = e.palette.mode === "light" ? e.lighten : e.darken;
  return {
    ...e.typography.body2,
    backgroundColor: "transparent",
    display: "flex",
    padding: "6px 16px",
    variants: [...Object.entries(e.palette).filter(Ut(["light"])).map(([r]) => ({
      props: {
        colorSeverity: r,
        variant: "standard"
      },
      style: {
        color: e.vars ? e.vars.palette.Alert[`${r}Color`] : t(e.palette[r].light, 0.6),
        backgroundColor: e.vars ? e.vars.palette.Alert[`${r}StandardBg`] : o(e.palette[r].light, 0.9),
        [`& .${pd.icon}`]: e.vars ? {
          color: e.vars.palette.Alert[`${r}IconColor`]
        } : {
          color: e.palette[r].main
        }
      }
    })), ...Object.entries(e.palette).filter(Ut(["light"])).map(([r]) => ({
      props: {
        colorSeverity: r,
        variant: "outlined"
      },
      style: {
        color: e.vars ? e.vars.palette.Alert[`${r}Color`] : t(e.palette[r].light, 0.6),
        border: `1px solid ${(e.vars || e).palette[r].light}`,
        [`& .${pd.icon}`]: e.vars ? {
          color: e.vars.palette.Alert[`${r}IconColor`]
        } : {
          color: e.palette[r].main
        }
      }
    })), ...Object.entries(e.palette).filter(Ut(["dark"])).map(([r]) => ({
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
})), Yv = J("div", {
  name: "MuiAlert",
  slot: "Icon"
})({
  marginRight: 12,
  padding: "7px 0",
  display: "flex",
  fontSize: 22,
  opacity: 0.9
}), Xv = J("div", {
  name: "MuiAlert",
  slot: "Message"
})({
  padding: "8px 0",
  minWidth: 0,
  overflow: "auto"
}), Jv = J("div", {
  name: "MuiAlert",
  slot: "Action"
})({
  display: "flex",
  alignItems: "flex-start",
  padding: "4px 0 0 16px",
  marginLeft: "auto",
  marginRight: -8
}), md = {
  success: /* @__PURE__ */ l(zv, {
    fontSize: "inherit"
  }),
  warning: /* @__PURE__ */ l(Vv, {
    fontSize: "inherit"
  }),
  error: /* @__PURE__ */ l(Uv, {
    fontSize: "inherit"
  }),
  info: /* @__PURE__ */ l(Hv, {
    fontSize: "inherit"
  })
}, ja = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiAlert"
  }), {
    action: i,
    children: s,
    className: a,
    closeText: c = "Close",
    color: d,
    icon: p,
    iconMapping: m = md,
    onClose: y,
    role: x = "alert",
    severity: f = "success",
    slotProps: v = {},
    slots: h = {},
    variant: w = "standard",
    ...O
  } = r, k = {
    ...r,
    color: d,
    severity: f,
    variant: w,
    colorSeverity: d || f
  }, E = qv(k), C = {
    slots: h,
    slotProps: v
  }, [S, N] = be("root", {
    ref: o,
    shouldForwardComponentProp: !0,
    className: de(E.root, a),
    elementType: Kv,
    externalForwardedProps: {
      ...C,
      ...O
    },
    ownerState: k,
    additionalProps: {
      role: x,
      elevation: 0
    }
  }), [A, _] = be("icon", {
    className: E.icon,
    elementType: Yv,
    externalForwardedProps: C,
    ownerState: k
  }), [D, F] = be("message", {
    className: E.message,
    elementType: Xv,
    externalForwardedProps: C,
    ownerState: k
  }), [P, g] = be("action", {
    className: E.action,
    elementType: Jv,
    externalForwardedProps: C,
    ownerState: k
  }), [$, I] = be("closeButton", {
    elementType: tn,
    externalForwardedProps: C,
    ownerState: k
  }), [M, B] = be("closeIcon", {
    elementType: Gv,
    externalForwardedProps: C,
    ownerState: k
  });
  return /* @__PURE__ */ T(S, {
    ...N,
    children: [p !== !1 ? /* @__PURE__ */ l(A, {
      ..._,
      children: p || m[f] || md[f]
    }) : null, /* @__PURE__ */ l(D, {
      ...F,
      children: s
    }), i != null ? /* @__PURE__ */ l(P, {
      ...g,
      children: i
    }) : null, i == null && y ? /* @__PURE__ */ l(P, {
      ...g,
      children: /* @__PURE__ */ l($, {
        size: "small",
        "aria-label": c,
        title: c,
        color: "inherit",
        onClick: y,
        ...I,
        children: /* @__PURE__ */ l(M, {
          fontSize: "small",
          ...B
        })
      })
    }) : null]
  });
});
process.env.NODE_ENV !== "production" && (ja.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The action to display. It renders after the message, at the end of the alert.
   */
  action: n.node,
  /**
   * The content of the component.
   */
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * Override the default label for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @default 'Close'
   */
  closeText: n.string,
  /**
   * The color of the component. Unless provided, the value is taken from the `severity` prop.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color: n.oneOfType([n.oneOf(["error", "info", "success", "warning"]), n.string]),
  /**
   * Override the icon displayed before the children.
   * Unless provided, the icon is mapped to the value of the `severity` prop.
   * Set to `false` to remove the `icon`.
   */
  icon: n.node,
  /**
   * The component maps the `severity` prop to a range of different icons,
   * for instance success to `<SuccessOutlined>`.
   * If you wish to change this mapping, you can provide your own.
   * Alternatively, you can use the `icon` prop to override the icon displayed.
   */
  iconMapping: n.shape({
    error: n.node,
    info: n.node,
    success: n.node,
    warning: n.node
  }),
  /**
   * Callback fired when the component requests to be closed.
   * When provided and no `action` prop is set, a close icon button is displayed that triggers the callback when clicked.
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose: n.func,
  /**
   * The ARIA role attribute of the element.
   * @default 'alert'
   */
  role: n.string,
  /**
   * The severity of the alert. This defines the color and icon used.
   * @default 'success'
   */
  severity: n.oneOfType([n.oneOf(["error", "info", "success", "warning"]), n.string]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: n.shape({
    action: n.oneOfType([n.func, n.object]),
    closeButton: n.oneOfType([n.func, n.object]),
    closeIcon: n.oneOfType([n.func, n.object]),
    icon: n.oneOfType([n.func, n.object]),
    message: n.oneOfType([n.func, n.object]),
    root: n.oneOfType([n.func, n.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: n.shape({
    action: n.elementType,
    closeButton: n.elementType,
    closeIcon: n.elementType,
    icon: n.elementType,
    message: n.elementType,
    root: n.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  /**
   * The variant to use.
   * @default 'standard'
   */
  variant: n.oneOfType([n.oneOf(["filled", "outlined", "standard"]), n.string])
});
function Qv(e) {
  return Se("MuiButton", e);
}
const bo = we("MuiButton", ["root", "text", "outlined", "contained", "disableElevation", "focusVisible", "disabled", "colorInherit", "colorPrimary", "colorSecondary", "colorSuccess", "colorError", "colorInfo", "colorWarning", "sizeMedium", "sizeSmall", "sizeLarge", "fullWidth", "startIcon", "endIcon", "icon", "loading", "loadingWrapper", "loadingIconPlaceholder", "loadingIndicator", "loadingPositionCenter", "loadingPositionStart", "loadingPositionEnd"]), Mp = /* @__PURE__ */ b.createContext({});
process.env.NODE_ENV !== "production" && (Mp.displayName = "ButtonGroupContext");
const Ap = /* @__PURE__ */ b.createContext(void 0);
process.env.NODE_ENV !== "production" && (Ap.displayName = "ButtonGroupButtonContext");
const Zv = (e) => {
  const {
    color: t,
    disableElevation: o,
    fullWidth: r,
    size: i,
    variant: s,
    loading: a,
    loadingPosition: c,
    classes: d
  } = e, p = {
    root: ["root", a && "loading", s, `size${Ce(i)}`, `color${Ce(t)}`, o && "disableElevation", r && "fullWidth", a && `loadingPosition${Ce(c)}`],
    startIcon: ["icon", "startIcon"],
    endIcon: ["icon", "endIcon"],
    loadingIndicator: ["loadingIndicator"],
    loadingWrapper: ["loadingWrapper"]
  }, m = Te(p, Qv, d);
  return {
    ...d,
    // forward the focused, disabled, etc. classes to the ButtonBase
    ...m
  };
}, _p = [{
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
}], e0 = J(zn, {
  shouldForwardProp: (e) => Qt(e) || e === "classes",
  name: "MuiButton",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [t.root, t[o.variant], t[`size${Ce(o.size)}`], o.color === "inherit" && t.colorInherit, o.disableElevation && t.disableElevation, o.fullWidth && t.fullWidth, o.loading && t.loading];
  }
})(Pe(({
  theme: e
}) => {
  const t = e.palette.mode === "light" ? e.palette.grey[300] : e.palette.grey[800], o = e.palette.mode === "light" ? e.palette.grey.A100 : e.palette.grey[700];
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
    [`&.${bo.disabled}`]: {
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
        [`&.${bo.focusVisible}`]: {
          boxShadow: (e.vars || e).shadows[6]
        },
        [`&.${bo.disabled}`]: {
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
        [`&.${bo.disabled}`]: {
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
    }, ...Object.entries(e.palette).filter(Ut()).map(([r]) => ({
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
            "--variant-containedBg": e.vars ? e.vars.palette.Button.inheritContainedHoverBg : o,
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
        [`&.${bo.focusVisible}`]: {
          boxShadow: "none"
        },
        "&:active": {
          boxShadow: "none"
        },
        [`&.${bo.disabled}`]: {
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
        [`&.${bo.loading}`]: {
          color: "transparent"
        }
      }
    }]
  };
})), t0 = J("span", {
  name: "MuiButton",
  slot: "StartIcon",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [t.startIcon, o.loading && t.startIconLoadingStart];
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
  }, ..._p]
})), n0 = J("span", {
  name: "MuiButton",
  slot: "EndIcon",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [t.endIcon, o.loading && t.endIconLoadingEnd];
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
  }, ..._p]
})), o0 = J("span", {
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
})), hd = J("span", {
  name: "MuiButton",
  slot: "LoadingIconPlaceholder"
})({
  display: "inline-block",
  width: "1em",
  height: "1em"
}), ge = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = b.useContext(Mp), i = b.useContext(Ap), s = qr(r, t), a = Ee({
    props: s,
    name: "MuiButton"
  }), {
    children: c,
    color: d = "primary",
    component: p = "button",
    className: m,
    disabled: y = !1,
    disableElevation: x = !1,
    disableFocusRipple: f = !1,
    endIcon: v,
    focusVisibleClassName: h,
    fullWidth: w = !1,
    id: O,
    loading: k = null,
    loadingIndicator: E,
    loadingPosition: C = "center",
    size: S = "medium",
    startIcon: N,
    type: A,
    variant: _ = "text",
    ...D
  } = a, F = to(O), P = E ?? /* @__PURE__ */ l(Qo, {
    "aria-labelledby": F,
    color: "inherit",
    size: 16
  }), g = {
    ...a,
    color: d,
    component: p,
    disabled: y,
    disableElevation: x,
    disableFocusRipple: f,
    fullWidth: w,
    loading: k,
    loadingIndicator: P,
    loadingPosition: C,
    size: S,
    type: A,
    variant: _
  }, $ = Zv(g), I = (N || k && C === "start") && /* @__PURE__ */ l(t0, {
    className: $.startIcon,
    ownerState: g,
    children: N || /* @__PURE__ */ l(hd, {
      className: $.loadingIconPlaceholder,
      ownerState: g
    })
  }), M = (v || k && C === "end") && /* @__PURE__ */ l(n0, {
    className: $.endIcon,
    ownerState: g,
    children: v || /* @__PURE__ */ l(hd, {
      className: $.loadingIconPlaceholder,
      ownerState: g
    })
  }), B = i || "", W = typeof k == "boolean" ? (
    // use plain HTML span to minimize the runtime overhead
    /* @__PURE__ */ l("span", {
      className: $.loadingWrapper,
      style: {
        display: "contents"
      },
      children: k && /* @__PURE__ */ l(o0, {
        className: $.loadingIndicator,
        ownerState: g,
        children: P
      })
    })
  ) : null, {
    root: G,
    ...oe
  } = $;
  return /* @__PURE__ */ T(e0, {
    ownerState: g,
    className: de(r.className, $.root, m, B),
    component: p,
    disabled: y || k,
    focusRipple: !f,
    focusVisibleClassName: de($.focusVisible, h),
    ref: o,
    internalNativeButton: !0,
    type: A,
    id: k ? F : O,
    ...D,
    classes: oe,
    children: [I, C !== "end" && W, c, C === "end" && W, M]
  });
});
process.env.NODE_ENV !== "production" && (ge.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: n.oneOfType([n.oneOf(["inherit", "primary", "secondary", "success", "error", "info", "warning"]), n.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: n.elementType,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: n.bool,
  /**
   * If `true`, no elevation is used.
   * @default false
   */
  disableElevation: n.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: n.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: n.bool,
  /**
   * Element placed after the children.
   */
  endIcon: n.node,
  /**
   * @ignore
   */
  focusVisibleClassName: n.string,
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: n.bool,
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: n.string,
  /**
   * @ignore
   */
  id: n.string,
  /**
   * If `true`, the loading indicator is visible and the button is disabled.
   * If `true | false`, the loading wrapper is always rendered before the children to prevent [Google Translation Crash](https://github.com/mui/material-ui/issues/27853).
   * @default null
   */
  loading: n.bool,
  /**
   * Element placed before the children if the button is in loading state.
   * The node should contain an element with `role="progressbar"` with an accessible name.
   * By default, it renders a `CircularProgress` that is labeled by the button itself.
   * @default <CircularProgress color="inherit" size={16} />
   */
  loadingIndicator: n.node,
  /**
   * The loading indicator can be positioned on the start, end, or the center of the button.
   * @default 'center'
   */
  loadingPosition: n.oneOf(["center", "end", "start"]),
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: n.oneOfType([n.oneOf(["small", "medium", "large"]), n.string]),
  /**
   * Element placed before the children.
   */
  startIcon: n.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  /**
   * @ignore
   */
  type: n.string,
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: n.oneOfType([n.oneOf(["contained", "outlined", "text"]), n.string])
});
function Dp(e = window) {
  const t = e.document.documentElement.clientWidth;
  return e.innerWidth - t;
}
function r0(e) {
  const t = kt(e);
  return t.body === e ? En(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function Lr(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function gd(e) {
  return parseFloat(En(e).getComputedStyle(e).paddingRight) || 0;
}
function i0(e) {
  const o = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].includes(e.tagName), r = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return o || r;
}
function bd(e, t, o, r, i) {
  const s = [t, o, ...r];
  [].forEach.call(e.children, (a) => {
    const c = !s.includes(a), d = !i0(a);
    c && d && Lr(a, i);
  });
}
function ma(e, t) {
  let o = -1;
  return e.some((r, i) => t(r) ? (o = i, !0) : !1), o;
}
function s0(e, t) {
  const o = [], r = e.container;
  if (!t.disableScrollLock) {
    if (r0(r)) {
      const a = Dp(En(r));
      o.push({
        value: r.style.paddingRight,
        property: "padding-right",
        el: r
      }), r.style.paddingRight = `${gd(r) + a}px`;
      const c = kt(r).querySelectorAll(".mui-fixed");
      [].forEach.call(c, (d) => {
        o.push({
          value: d.style.paddingRight,
          property: "padding-right",
          el: d
        }), d.style.paddingRight = `${gd(d) + a}px`;
      });
    }
    let s;
    if (r.parentNode instanceof DocumentFragment)
      s = kt(r).body;
    else {
      const a = r.parentElement, c = En(r);
      s = (a == null ? void 0 : a.nodeName) === "HTML" && c.getComputedStyle(a).overflowY === "scroll" ? a : r;
    }
    o.push({
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
    o.forEach(({
      value: s,
      el: a,
      property: c
    }) => {
      s ? a.style.setProperty(c, s) : a.style.removeProperty(c);
    });
  };
}
function a0(e) {
  const t = [];
  return [].forEach.call(e.children, (o) => {
    o.getAttribute("aria-hidden") === "true" && t.push(o);
  }), t;
}
class l0 {
  constructor() {
    this.modals = [], this.containers = [];
  }
  add(t, o) {
    let r = this.modals.indexOf(t);
    if (r !== -1)
      return r;
    r = this.modals.length, this.modals.push(t), t.modalRef && Lr(t.modalRef, !1);
    const i = a0(o);
    bd(o, t.mount, t.modalRef, i, !0);
    const s = ma(this.containers, (a) => a.container === o);
    return s !== -1 ? (this.containers[s].modals.push(t), r) : (this.containers.push({
      modals: [t],
      container: o,
      restore: null,
      hiddenSiblings: i
    }), r);
  }
  mount(t, o) {
    const r = ma(this.containers, (s) => s.modals.includes(t)), i = this.containers[r];
    i.restore || (i.restore = s0(i, o));
  }
  remove(t, o = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1)
      return r;
    const i = ma(this.containers, (a) => a.modals.includes(t)), s = this.containers[i];
    if (s.modals.splice(s.modals.indexOf(t), 1), this.modals.splice(r, 1), s.modals.length === 0)
      s.restore && s.restore(), t.modalRef && Lr(t.modalRef, o), bd(s.container, t.mount, t.modalRef, s.hiddenSiblings, !1), this.containers.splice(i, 1);
    else {
      const a = s.modals[s.modals.length - 1];
      a.modalRef && Lr(a.modalRef, !1);
    }
    return r;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function no(e, t, o, r, i) {
  if (process.env.NODE_ENV === "production")
    return null;
  const s = e[t], a = i || t;
  return s == null ? null : s && s.nodeType !== 1 ? new Error(`Invalid ${r} \`${a}\` supplied to \`${o}\`. Expected an HTMLElement.`) : null;
}
function c0(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Lp(e, t, o, r, i) {
  const s = e[t], a = i || t;
  if (s == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let c;
  const d = s.type;
  return typeof d == "function" && !c0(d) && (c = "Did you accidentally use a plain function component for an element instead?"), c !== void 0 ? new Error(`Invalid ${r} \`${a}\` supplied to \`${o}\`. Expected an element that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const fr = Un(n.element, Lp);
fr.isRequired = Un(n.element.isRequired, Lp);
function mr(e) {
  var t;
  return parseInt(b.version, 10) >= 19 ? ((t = e == null ? void 0 : e.props) == null ? void 0 : t.ref) || null : (e == null ? void 0 : e.ref) || null;
}
function ls(e, t) {
  var r;
  if (!e || !t)
    return !1;
  if (e.contains(t))
    return !0;
  const o = (r = t.getRootNode) == null ? void 0 : r.call(t);
  if (o && o instanceof ShadowRoot) {
    let i = t;
    for (; i; ) {
      if (e === i)
        return !0;
      i = i.parentNode ?? i.host ?? null;
    }
  }
  return !1;
}
const Wa = "data-mui-focusable";
function d0(e) {
  return e ? e.hasAttribute(Wa) ? e : e.querySelector(`[${Wa}]`) : null;
}
const u0 = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function p0(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function f0(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let o = t(`[name="${e.name}"]:checked`);
  return o || (o = t(`[name="${e.name}"]`)), o !== e;
}
function m0(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || f0(e));
}
function h0(e) {
  const t = [], o = [];
  return Array.from(e.querySelectorAll(u0)).forEach((r, i) => {
    const s = p0(r);
    s === -1 || !m0(r) || (s === 0 ? t.push(r) : o.push({
      documentOrder: i,
      tabIndex: s,
      node: r
    }));
  }), o.sort((r, i) => r.tabIndex === i.tabIndex ? r.documentOrder - i.documentOrder : r.tabIndex - i.tabIndex).map((r) => r.node).concat(t);
}
function g0() {
  return !0;
}
function cs(e) {
  const {
    children: t,
    disableAutoFocus: o = !1,
    disableEnforceFocus: r = !1,
    disableRestoreFocus: i = !1,
    getTabbable: s = h0,
    isEnabled: a = g0,
    open: c
  } = e, d = b.useRef(!1), p = b.useRef(null), m = b.useRef(null), y = b.useRef(null), x = b.useRef(null), f = b.useRef(!1), v = b.useRef(null), h = gt(mr(t), v), w = b.useRef(null);
  b.useEffect(() => {
    !c || !v.current || (f.current = !o);
  }, [o, c]), b.useEffect(() => {
    if (d.current = !1, !c || !v.current)
      return;
    const E = kt(v.current), C = Bn(E), S = d0(v.current) ?? v.current;
    return ls(v.current, C) || (S.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), S.setAttribute("tabIndex", "-1")), f.current && S.focus()), () => {
      !i && y.current && (d.current = !0, y.current.focus(), y.current = null);
    };
  }, [c]), b.useEffect(() => {
    if (!c || !v.current)
      return;
    const E = kt(v.current), C = (A) => {
      if (w.current = A, r || !a() || A.key !== "Tab")
        return;
      Bn(E) === v.current && A.shiftKey && (d.current = !0, m.current && m.current.focus());
    }, S = () => {
      var F, P;
      const A = v.current;
      if (A === null)
        return;
      const _ = Bn(E);
      if (!E.hasFocus() || !a() || d.current) {
        d.current = !1;
        return;
      }
      if (ls(A, _) || r && _ !== p.current && _ !== m.current)
        return;
      if (_ !== x.current)
        x.current = null;
      else if (x.current !== null)
        return;
      if (!f.current)
        return;
      let D = [];
      if ((_ === p.current || _ === m.current) && (D = s(v.current)), D.length > 0) {
        const g = !!((F = w.current) != null && F.shiftKey && ((P = w.current) == null ? void 0 : P.key) === "Tab"), $ = D[0], I = D[D.length - 1];
        typeof $ != "string" && typeof I != "string" && (g ? I.focus() : $.focus());
      } else
        A.focus();
    };
    E.addEventListener("focusin", S), E.addEventListener("keydown", C, !0);
    const N = setInterval(() => {
      const A = Bn(E);
      A && A.tagName === "BODY" && S();
    }, 50);
    return () => {
      clearInterval(N), E.removeEventListener("focusin", S), E.removeEventListener("keydown", C, !0);
    };
  }, [o, r, i, a, c, s]);
  const O = (E) => {
    y.current === null && (y.current = E.relatedTarget), f.current = !0, x.current = E.target;
    const C = t.props.onFocus;
    C && C(E);
  }, k = (E) => {
    y.current === null && (y.current = E.relatedTarget), f.current = !0;
  };
  return /* @__PURE__ */ T(b.Fragment, {
    children: [/* @__PURE__ */ l("div", {
      tabIndex: c ? 0 : -1,
      onFocus: k,
      ref: p,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ b.cloneElement(t, {
      ref: h,
      onFocus: O
    }), /* @__PURE__ */ l("div", {
      tabIndex: c ? 0 : -1,
      onFocus: k,
      ref: m,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" && (cs.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: fr,
  /**
   * If `true`, the focus trap will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any focus trap children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: n.bool,
  /**
   * If `true`, the focus trap will not prevent focus from leaving the focus trap while open.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: n.bool,
  /**
   * If `true`, the focus trap will not restore focus to previously focused element once
   * focus trap is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: n.bool,
  /**
   * Returns an array of ordered tabbable nodes (i.e. in tab order) within the root.
   * For instance, you can provide the "tabbable" npm dependency.
   * @param {HTMLElement} root
   */
  getTabbable: n.func,
  /**
   * This prop extends the `open` prop.
   * It allows to toggle the open state without having to wait for a rerender when changing the `open` prop.
   * This prop should be memoized.
   * It can be used to support multiple focus trap mounted at the same time.
   * @default function defaultIsEnabled(): boolean {
   *   return true;
   * }
   */
  isEnabled: n.func,
  /**
   * If `true`, focus is locked.
   */
  open: n.bool.isRequired
});
process.env.NODE_ENV !== "production" && (cs.propTypes = _s(cs.propTypes));
function b0(e) {
  return typeof e == "function" ? e() : e;
}
const Xr = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const {
    children: r,
    container: i,
    disablePortal: s = !1
  } = t, [a, c] = b.useState(null), d = gt(/* @__PURE__ */ b.isValidElement(r) ? mr(r) : null, o);
  if (Nt(() => {
    s || c(b0(i) || document.body);
  }, [i, s]), Nt(() => {
    if (a && !s)
      return _a(o, a), () => {
        _a(o, null);
      };
  }, [o, a, s]), s) {
    if (/* @__PURE__ */ b.isValidElement(r)) {
      const p = {
        ref: d
      };
      return /* @__PURE__ */ b.cloneElement(r, p);
    }
    return r;
  }
  return a && /* @__PURE__ */ Pm.createPortal(r, a);
});
process.env.NODE_ENV !== "production" && (Xr.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The children to render into the `container`.
   */
  children: n.node,
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
  container: n.oneOfType([no, n.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: n.bool
});
process.env.NODE_ENV !== "production" && (Xr.propTypes = _s(Xr.propTypes));
const y0 = {
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
}, v0 = {
  opacity: 0,
  visibility: "hidden"
}, Sl = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = ko(), i = {
    enter: r.transitions.duration.enteringScreen,
    exit: r.transitions.duration.leavingScreen
  }, {
    addEndListener: s,
    appear: a = !0,
    children: c,
    easing: d,
    in: p,
    onEnter: m,
    onEntered: y,
    onEntering: x,
    onExit: f,
    onExited: v,
    onExiting: h,
    style: w,
    timeout: O = i,
    ...k
  } = t, E = b.useRef(null), C = gt(E, mr(c), o), S = Pt(E, x), N = Pt(E, (g, $) => {
    bp(g);
    const I = nr({
      style: w,
      timeout: O,
      easing: d
    }, {
      mode: "enter"
    });
    g.style.transition = r.transitions.create("opacity", I), m && m(g, $);
  }), A = Pt(E, y), _ = Pt(E, h), D = Pt(E, (g) => {
    const $ = nr({
      style: w,
      timeout: O,
      easing: d
    }, {
      mode: "exit"
    });
    g.style.transition = r.transitions.create("opacity", $), f && f(g);
  }), F = Pt(E, (g) => {
    g.style.transition = "", v && v(g);
  });
  return /* @__PURE__ */ l(Rn, {
    appear: a,
    in: p,
    nodeRef: E,
    onEnter: N,
    onEntered: A,
    onEntering: S,
    onExit: D,
    onExited: F,
    onExiting: _,
    addEndListener: (g) => {
      s && s(E.current, g);
    },
    timeout: O,
    ...k,
    children: (g, {
      ownerState: $,
      ...I
    }) => {
      const M = yp(g, p, y0, v0, w, c.props.style);
      return /* @__PURE__ */ b.cloneElement(c, {
        style: M,
        ref: C,
        ...I
      });
    }
  });
});
process.env.NODE_ENV !== "production" && (Sl.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: n.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: n.bool,
  /**
   * A single child content element.
   */
  children: fr.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: n.oneOfType([n.shape({
    enter: n.string,
    exit: n.string
  }), n.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: n.bool,
  /**
   * @ignore
   */
  onEnter: n.func,
  /**
   * @ignore
   */
  onEntered: n.func,
  /**
   * @ignore
   */
  onEntering: n.func,
  /**
   * @ignore
   */
  onExit: n.func,
  /**
   * @ignore
   */
  onExited: n.func,
  /**
   * @ignore
   */
  onExiting: n.func,
  /**
   * @ignore
   */
  style: n.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  timeout: n.oneOfType([n.number, n.shape({
    appear: n.number,
    enter: n.number,
    exit: n.number
  })])
});
function x0(e) {
  return Se("MuiBackdrop", e);
}
we("MuiBackdrop", ["root", "invisible"]);
const S0 = (e) => {
  const {
    classes: t,
    invisible: o
  } = e;
  return Te({
    root: ["root", o && "invisible"]
  }, x0, t);
}, C0 = J("div", {
  name: "MuiBackdrop",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [t.root, o.invisible && t.invisible];
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
}), Cl = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiBackdrop"
  }), {
    children: i,
    className: s,
    component: a = "div",
    invisible: c = !1,
    open: d,
    slotProps: p = {},
    slots: m = {},
    transitionDuration: y,
    ...x
  } = r, f = {
    ...r,
    component: a,
    invisible: c
  }, v = S0(f), h = {
    component: a,
    slots: m,
    slotProps: p
  }, [w, O] = be("root", {
    elementType: C0,
    externalForwardedProps: h,
    className: de(v.root, s),
    ownerState: f
  }), [k, E] = be("transition", {
    elementType: Sl,
    externalForwardedProps: h,
    ownerState: f
  });
  return /* @__PURE__ */ l(k, {
    in: d,
    timeout: y,
    ...x,
    ...E,
    children: /* @__PURE__ */ l(w, {
      ...O,
      ref: o,
      children: i
    })
  });
});
process.env.NODE_ENV !== "production" && (Cl.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: n.elementType,
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   * @default false
   */
  invisible: n.bool,
  /**
   * If `true`, the component is shown.
   */
  open: n.bool.isRequired,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: n.shape({
    root: n.oneOfType([n.func, n.object]),
    transition: n.oneOfType([n.func, n.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: n.shape({
    root: n.elementType,
    transition: n.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: n.oneOfType([n.number, n.shape({
    appear: n.number,
    enter: n.number,
    exit: n.number
  })])
});
function w0(e) {
  return typeof e == "function" ? e() : e;
}
function T0(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const yd = () => {
}, Oi = new l0();
function E0(e) {
  const {
    container: t,
    disableScrollLock: o = !1,
    closeAfterTransition: r = !1,
    onTransitionEnter: i,
    onTransitionExited: s,
    children: a,
    onClose: c,
    open: d,
    rootRef: p
  } = e, m = b.useRef({}), y = b.useRef(null), x = b.useRef(null), f = gt(x, p), [v, h] = b.useState(!d), w = T0(a);
  let O = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (O = !1);
  const k = () => kt(y.current), E = () => (m.current.modalRef = x.current, m.current.mount = y.current, m.current), C = () => {
    Oi.mount(E(), {
      disableScrollLock: o
    }), x.current && (x.current.scrollTop = 0);
  }, S = It(() => {
    const I = w0(t) || k().body;
    Oi.add(E(), I), x.current && C();
  }), N = () => Oi.isTopModal(E()), A = It((I) => {
    y.current = I, I && (d && N() ? C() : x.current && Lr(x.current, O));
  }), _ = b.useCallback(() => {
    Oi.remove(E(), O);
  }, [O]);
  b.useEffect(() => () => {
    _();
  }, [_]), b.useEffect(() => {
    d ? S() : (!w || !r) && _();
  }, [d, _, w, r, S]);
  const D = (I) => (M) => {
    var B;
    (B = I.onKeyDown) == null || B.call(I, M), !(M.key !== "Escape" || M.which === 229 || // Wait until IME is settled.
    !N()) && (M.stopPropagation(), c && c(M, "escapeKeyDown"));
  }, F = (I) => (M) => {
    var B;
    (B = I.onClick) == null || B.call(I, M), M.target === M.currentTarget && c && c(M, "backdropClick");
  };
  return {
    getRootProps: (I = {}) => {
      const M = wp(e);
      delete M.onTransitionEnter, delete M.onTransitionExited;
      const B = {
        ...M,
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
        ...B,
        onKeyDown: D(B),
        ref: f
      };
    },
    getBackdropProps: (I = {}) => {
      const M = I;
      return {
        "aria-hidden": !0,
        ...M,
        onClick: F(M),
        open: d
      };
    },
    getTransitionProps: () => {
      const I = () => {
        h(!1), i && i();
      }, M = () => {
        h(!0), s && s(), r && _();
      };
      return {
        onEnter: dd(I, (a == null ? void 0 : a.props.onEnter) ?? yd),
        onExited: dd(M, (a == null ? void 0 : a.props.onExited) ?? yd)
      };
    },
    rootRef: f,
    portalRef: A,
    isTopModal: N,
    exited: v,
    hasTransition: w
  };
}
function O0(e) {
  return Se("MuiModal", e);
}
we("MuiModal", ["root", "hidden", "backdrop"]);
const R0 = (e) => {
  const {
    open: t,
    exited: o,
    classes: r
  } = e;
  return Te({
    root: ["root", !t && o && "hidden"],
    backdrop: ["backdrop"]
  }, O0, r);
}, N0 = J("div", {
  name: "MuiModal",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [t.root, !o.open && o.exited && t.hidden];
  }
})(Pe(({
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
}))), k0 = J(Cl, {
  name: "MuiModal",
  slot: "Backdrop"
})({
  zIndex: -1
}), wl = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    name: "MuiModal",
    props: t
  }), {
    classes: i,
    className: s,
    closeAfterTransition: a = !1,
    children: c,
    container: d,
    component: p,
    disableAutoFocus: m = !1,
    disableEnforceFocus: y = !1,
    disablePortal: x = !1,
    disableRestoreFocus: f = !1,
    disableScrollLock: v = !1,
    hideBackdrop: h = !1,
    keepMounted: w = !1,
    onClose: O,
    onTransitionEnter: k,
    onTransitionExited: E,
    open: C,
    slotProps: S = {},
    slots: N = {},
    // eslint-disable-next-line react/prop-types
    theme: A,
    ..._
  } = r, D = {
    ...r,
    closeAfterTransition: a,
    disableAutoFocus: m,
    disableEnforceFocus: y,
    disablePortal: x,
    disableRestoreFocus: f,
    disableScrollLock: v,
    hideBackdrop: h,
    keepMounted: w
  }, {
    getRootProps: F,
    getBackdropProps: P,
    getTransitionProps: g,
    portalRef: $,
    isTopModal: I,
    exited: M,
    hasTransition: B
  } = E0({
    ...D,
    rootRef: o
  }), W = {
    ...D,
    exited: M
  }, G = R0(W), oe = {};
  if (c.props.tabIndex === void 0 && (oe.tabIndex = "-1"), B) {
    const {
      onEnter: re,
      onExited: ee
    } = g();
    oe.onEnter = re, oe.onExited = ee;
  }
  const z = {
    slots: N,
    slotProps: S
  }, [V, Y] = be("root", {
    ref: o,
    elementType: N0,
    externalForwardedProps: {
      ...z,
      ..._,
      component: p
    },
    getSlotProps: F,
    ownerState: W,
    className: de(s, G == null ? void 0 : G.root, !W.open && W.exited && (G == null ? void 0 : G.hidden))
  }), [ne, te] = be("backdrop", {
    elementType: k0,
    externalForwardedProps: z,
    shouldForwardComponentProp: !0,
    getSlotProps: (re) => P({
      ...re,
      onClick: (ee) => {
        re != null && re.onClick && re.onClick(ee);
      }
    }),
    className: G == null ? void 0 : G.backdrop,
    ownerState: W
  });
  return !w && !C && (!B || M) ? null : /* @__PURE__ */ l(Xr, {
    ref: $,
    container: d,
    disablePortal: x,
    children: /* @__PURE__ */ T(V, {
      ...Y,
      children: [h ? null : /* @__PURE__ */ l(ne, {
        ...te
      }), /* @__PURE__ */ l(cs, {
        disableEnforceFocus: y,
        disableAutoFocus: m,
        disableRestoreFocus: f,
        isEnabled: I,
        open: C,
        children: /* @__PURE__ */ b.cloneElement(c, oe)
      })]
    })
  });
});
process.env.NODE_ENV !== "production" && (wl.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: fr.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * When set to true the Modal waits until a nested Transition is completed before closing.
   * @default false
   */
  closeAfterTransition: n.bool,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: n.elementType,
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
  container: n.oneOfType([no, n.func]),
  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: n.bool,
  /**
   * If `true`, the modal will not prevent focus from leaving the modal while open.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: n.bool,
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: n.bool,
  /**
   * If `true`, the modal will not restore focus to previously focused element once
   * modal is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: n.bool,
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: n.bool,
  /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop: n.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Modal.
   * @default false
   */
  keepMounted: n.bool,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: n.func,
  /**
   * A function called when a transition enters.
   */
  onTransitionEnter: n.func,
  /**
   * A function called when a transition has exited.
   */
  onTransitionExited: n.func,
  /**
   * If `true`, the component is shown.
   */
  open: n.bool.isRequired,
  /**
   * The props used for each slot inside the Modal.
   * @default {}
   */
  slotProps: n.shape({
    backdrop: n.oneOfType([n.func, n.object]),
    root: n.oneOfType([n.func, n.object])
  }),
  /**
   * The components used for each slot inside the Modal.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: n.shape({
    backdrop: n.elementType,
    root: n.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object])
});
function P0(e) {
  return Se("MuiDialog", e);
}
we("MuiDialog", ["root", "backdrop", "scrollPaper", "scrollBody", "container", "paper", "paperWidthFalse", "paperWidthXs", "paperWidthSm", "paperWidthMd", "paperWidthLg", "paperWidthXl", "paperFullWidth", "paperFullScreen"]);
const Tl = /* @__PURE__ */ b.createContext({});
process.env.NODE_ENV !== "production" && (Tl.displayName = "DialogContext");
const I0 = J(Cl, {
  name: "MuiDialog",
  slot: "Backdrop"
})({
  // Improve scrollable dialog support.
  zIndex: -1
}), $0 = (e) => {
  const {
    classes: t,
    scroll: o,
    maxWidth: r,
    fullWidth: i,
    fullScreen: s
  } = e, a = {
    root: ["root"],
    backdrop: ["backdrop"],
    container: ["container", `scroll${Ce(o)}`],
    paper: ["paper", `paperWidth${Ce(String(r))}`, i && "paperFullWidth", s && "paperFullScreen"]
  };
  return Te(a, P0, t);
}, M0 = J(wl, {
  name: "MuiDialog",
  slot: "Root"
})({
  "@media print": {
    // Use !important to override the Modal inline-style.
    position: "absolute !important"
  }
}), A0 = J("div", {
  name: "MuiDialog",
  slot: "Container",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [t.container, t[`scroll${Ce(o.scroll)}`]];
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
}), _0 = J(ht, {
  name: "MuiDialog",
  slot: "Paper",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [t.paper, t[`paperWidth${Ce(String(o.maxWidth))}`], o.fullWidth && t.paperFullWidth, o.fullScreen && t.paperFullScreen];
  }
})(Pe(({
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
}))), Wo = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiDialog"
  }), i = ko(), s = {
    enter: i.transitions.duration.enteringScreen,
    exit: i.transitions.duration.leavingScreen
  }, {
    "aria-describedby": a,
    "aria-labelledby": c,
    "aria-modal": d = !0,
    children: p,
    className: m,
    fullScreen: y = !1,
    fullWidth: x = !1,
    maxWidth: f = "sm",
    onClick: v,
    onClose: h,
    open: w,
    PaperComponent: O = ht,
    role: k = "dialog",
    scroll: E = "paper",
    slots: C = {},
    slotProps: S = {},
    transitionDuration: N = s,
    ...A
  } = r, _ = {
    ...r,
    fullScreen: y,
    fullWidth: x,
    maxWidth: f,
    scroll: E
  }, D = $0(_), F = b.useRef(), P = (ee) => {
    F.current = ee.target === ee.currentTarget;
  }, g = (ee) => {
    v && v(ee), F.current && (F.current = null, h && h(ee, "backdropClick"));
  }, $ = to(c), I = b.useMemo(() => ({
    titleId: $
  }), [$]), M = {
    slots: C,
    slotProps: S
  }, [B, W] = be("root", {
    elementType: M0,
    shouldForwardComponentProp: !0,
    externalForwardedProps: M,
    ownerState: _,
    className: de(D.root, m),
    ref: o
  }), [G, oe] = be("backdrop", {
    elementType: I0,
    shouldForwardComponentProp: !0,
    externalForwardedProps: M,
    ownerState: _,
    className: D.backdrop
  }), [z, V] = be("paper", {
    elementType: _0,
    shouldForwardComponentProp: !0,
    externalForwardedProps: M,
    ownerState: _,
    className: D.paper,
    additionalProps: {
      elevation: 24,
      role: k,
      "aria-describedby": a,
      "aria-labelledby": $,
      "aria-modal": d,
      tabIndex: -1,
      [Wa]: ""
    }
  }), [Y, ne] = be("container", {
    elementType: A0,
    externalForwardedProps: M,
    ownerState: _,
    className: D.container
  }), [te, re] = be("transition", {
    elementType: Sl,
    externalForwardedProps: M,
    ownerState: _,
    additionalProps: {
      appear: !0,
      in: w,
      timeout: N,
      role: "presentation"
    }
  });
  return /* @__PURE__ */ l(B, {
    closeAfterTransition: !0,
    slots: {
      backdrop: G
    },
    slotProps: {
      backdrop: {
        transitionDuration: N,
        ...oe
      }
    },
    onClose: h,
    open: w,
    onClick: g,
    ...W,
    ...A,
    children: /* @__PURE__ */ l(te, {
      ...re,
      children: /* @__PURE__ */ l(Y, {
        onMouseDown: P,
        ...ne,
        children: /* @__PURE__ */ l(z, {
          as: O,
          ...V,
          children: /* @__PURE__ */ l(Tl.Provider, {
            value: I,
            children: p
          })
        })
      })
    })
  });
});
process.env.NODE_ENV !== "production" && (Wo.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The id(s) of the element(s) that describe the dialog.
   */
  "aria-describedby": n.string,
  /**
   * The id(s) of the element(s) that label the dialog.
   */
  "aria-labelledby": n.string,
  /**
   * Informs assistive technologies that the element is modal.
   * It's added on the element with role="dialog".
   * @default true
   */
  "aria-modal": n.oneOfType([n.oneOf(["false", "true"]), n.bool]),
  /**
   * Dialog children, usually the included sub-components.
   */
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * If `true`, the dialog is full-screen.
   * @default false
   */
  fullScreen: n.bool,
  /**
   * If `true`, the dialog stretches to `maxWidth`.
   *
   * Notice that the dialog width grow is limited by the default margin.
   * @default false
   */
  fullWidth: n.bool,
  /**
   * Determine the max-width of the dialog.
   * The dialog width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   * @default 'sm'
   */
  maxWidth: n.oneOfType([n.oneOf(["xs", "sm", "md", "lg", "xl", !1]), n.string]),
  /**
   * @ignore
   */
  onClick: n.func,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: n.func,
  /**
   * If `true`, the component is shown.
   */
  open: n.bool.isRequired,
  /**
   * The component used to render the body of the dialog.
   * @default Paper
   */
  PaperComponent: n.elementType,
  /**
   * The ARIA role for the dialog element.
   * The main dialog role is `dialog`, but `alertdialog` can be used if the content of the dialog requires immediate attention.
   * See https://www.w3.org/TR/wai-aria-1.2/#dialog and https://www.w3.org/TR/wai-aria-1.2/#alertdialog for more details.
   * @default 'dialog'
   */
  role: n.oneOf(["alertdialog", "dialog"]),
  /**
   * Determine the container for scrolling the dialog.
   * @default 'paper'
   */
  scroll: n.oneOf(["body", "paper"]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: n.shape({
    backdrop: n.oneOfType([n.func, n.object]),
    container: n.oneOfType([n.func, n.object]),
    paper: n.oneOfType([n.func, n.object]),
    root: n.oneOfType([n.func, n.object]),
    transition: n.oneOfType([n.func, n.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: n.shape({
    backdrop: n.elementType,
    container: n.elementType,
    paper: n.elementType,
    root: n.elementType,
    transition: n.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  transitionDuration: n.oneOfType([n.number, n.shape({
    appear: n.number,
    enter: n.number,
    exit: n.number
  })])
});
function D0(e) {
  return Se("MuiDialogActions", e);
}
we("MuiDialogActions", ["root", "spacing"]);
const L0 = (e) => {
  const {
    classes: t,
    disableSpacing: o
  } = e;
  return Te({
    root: ["root", !o && "spacing"]
  }, D0, t);
}, B0 = J("div", {
  name: "MuiDialogActions",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [t.root, !o.disableSpacing && t.spacing];
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
}), zo = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiDialogActions"
  }), {
    className: i,
    disableSpacing: s = !1,
    ...a
  } = r, c = {
    ...r,
    disableSpacing: s
  }, d = L0(c);
  return /* @__PURE__ */ l(B0, {
    className: de(d.root, i),
    ownerState: c,
    ref: o,
    ...a
  });
});
process.env.NODE_ENV !== "production" && (zo.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * If `true`, the actions do not have additional margin.
   * @default false
   */
  disableSpacing: n.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object])
});
function F0(e) {
  return Se("MuiDialogContent", e);
}
we("MuiDialogContent", ["root", "dividers"]);
function j0(e) {
  return Se("MuiDialogTitle", e);
}
const W0 = we("MuiDialogTitle", ["root"]), z0 = (e) => {
  const {
    classes: t,
    dividers: o
  } = e;
  return Te({
    root: ["root", o && "dividers"]
  }, F0, t);
}, V0 = J("div", {
  name: "MuiDialogContent",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [t.root, o.dividers && t.dividers];
  }
})(Pe(({
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
      [`.${W0.root} + &`]: {
        paddingTop: 0
      }
    }
  }]
}))), Vo = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiDialogContent"
  }), {
    className: i,
    dividers: s = !1,
    ...a
  } = r, c = {
    ...r,
    dividers: s
  }, d = z0(c);
  return /* @__PURE__ */ l(V0, {
    className: de(d.root, i),
    ownerState: c,
    ref: o,
    ...a
  });
});
process.env.NODE_ENV !== "production" && (Vo.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * Display the top and bottom dividers.
   * @default false
   */
  dividers: n.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object])
});
function U0(e) {
  return Se("MuiTypography", e);
}
const vd = we("MuiTypography", ["root", "h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "body1", "body2", "inherit", "button", "caption", "overline", "alignLeft", "alignRight", "alignCenter", "alignJustify", "noWrap", "gutterBottom"]), H0 = (e) => {
  const {
    align: t,
    gutterBottom: o,
    noWrap: r,
    variant: i,
    classes: s
  } = e, a = {
    root: ["root", i, e.align !== "inherit" && `align${Ce(t)}`, o && "gutterBottom", r && "noWrap"]
  };
  return Te(a, U0, s);
}, G0 = J("span", {
  name: "MuiTypography",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [t.root, o.variant && t[o.variant], o.align !== "inherit" && t[`align${Ce(o.align)}`], o.noWrap && t.noWrap, o.gutterBottom && t.gutterBottom];
  }
})(Pe(({
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
    }, ...Object.entries(e.typography).filter(([o, r]) => o !== "inherit" && r && typeof r == "object").map(([o, r]) => ({
      props: {
        variant: o
      },
      style: r
    })), ...Object.entries(e.palette).filter(Ut()).map(([o]) => ({
      props: {
        color: o
      },
      style: {
        color: (e.vars || e).palette[o].main
      }
    })), ...Object.entries(((t = e.palette) == null ? void 0 : t.text) || {}).filter(([, o]) => typeof o == "string").map(([o]) => ({
      props: {
        color: `text${Ce(o)}`
      },
      style: {
        color: (e.vars || e).palette.text[o]
      }
    })), {
      props: ({
        ownerState: o
      }) => o.align !== "inherit",
      style: {
        textAlign: "var(--Typography-textAlign)"
      }
    }, {
      props: ({
        ownerState: o
      }) => o.noWrap,
      style: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, {
      props: ({
        ownerState: o
      }) => o.gutterBottom,
      style: {
        marginBottom: "0.35em"
      }
    }]
  };
})), xd = {
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
}, q = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiTypography"
  }), {
    color: i,
    align: s = "inherit",
    className: a,
    component: c,
    gutterBottom: d = !1,
    noWrap: p = !1,
    variant: m = "body1",
    variantMapping: y = xd,
    ...x
  } = r, f = {
    ...r,
    align: s,
    color: i,
    className: a,
    component: c,
    gutterBottom: d,
    noWrap: p,
    variant: m,
    variantMapping: y
  }, v = c || y[m] || xd[m] || "span", h = H0(f);
  return /* @__PURE__ */ l(G0, {
    as: v,
    ref: o,
    className: de(h.root, a),
    ...x,
    ownerState: f,
    style: {
      ...s !== "inherit" && {
        "--Typography-textAlign": s
      },
      ...x.style
    }
  });
});
process.env.NODE_ENV !== "production" && (q.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Set the text-align on the component.
   * @default 'inherit'
   */
  align: n.oneOf(["center", "inherit", "justify", "left", "right"]),
  /**
   * The content of the component.
   */
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color: n.oneOfType([n.oneOf(["primary", "secondary", "success", "error", "info", "warning", "textPrimary", "textSecondary", "textDisabled"]), n.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: n.elementType,
  /**
   * If `true`, the text will have a bottom margin.
   * @default false
   */
  gutterBottom: n.bool,
  /**
   * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   *
   * Note that text overflow can only happen with block or inline-block level elements
   * (the element needs to have a width in order to overflow).
   * @default false
   */
  noWrap: n.bool,
  /**
   * @ignore
   */
  style: n.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  /**
   * Applies the theme typography styles.
   * @default 'body1'
   */
  variant: n.oneOfType([n.oneOf(["body1", "body2", "button", "caption", "h1", "h2", "h3", "h4", "h5", "h6", "inherit", "overline", "subtitle1", "subtitle2"]), n.string]),
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
  variantMapping: n.object
});
const q0 = (e) => {
  const {
    classes: t
  } = e;
  return Te({
    root: ["root"]
  }, j0, t);
}, K0 = J(q, {
  name: "MuiDialogTitle",
  slot: "Root"
})({
  padding: "16px 24px",
  flex: "0 0 auto"
}), Uo = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiDialogTitle"
  }), {
    className: i,
    id: s,
    ...a
  } = r, c = r, d = q0(c), {
    titleId: p = s
  } = b.useContext(Tl);
  return /* @__PURE__ */ l(K0, {
    component: "h2",
    className: de(d.root, i),
    ownerState: c,
    ref: o,
    variant: "h6",
    id: s ?? p,
    ...a
  });
});
process.env.NODE_ENV !== "production" && (Uo.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * @ignore
   */
  id: n.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object])
});
function Sd(e) {
  return e != null && !(Array.isArray(e) && e.length === 0);
}
function ds(e, t = !1) {
  return e && (Sd(e.value) && e.value !== "" || t && Sd(e.defaultValue) && e.defaultValue !== "");
}
function Y0(e) {
  return e.startAdornment;
}
const js = /* @__PURE__ */ b.createContext(void 0);
process.env.NODE_ENV !== "production" && (js.displayName = "FormControlContext");
function X0(e) {
  return Se("MuiFormControl", e);
}
we("MuiFormControl", ["root", "marginNone", "marginNormal", "marginDense", "fullWidth", "disabled"]);
const J0 = (e) => {
  const {
    classes: t,
    margin: o,
    fullWidth: r
  } = e, i = {
    root: ["root", o !== "none" && `margin${Ce(o)}`, r && "fullWidth"]
  };
  return Te(i, X0, t);
}, Q0 = J("div", {
  name: "MuiFormControl",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [t.root, t[`margin${Ce(o.margin)}`], o.fullWidth && t.fullWidth];
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
}), An = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiFormControl"
  }), {
    children: i,
    className: s,
    color: a = "primary",
    component: c = "div",
    disabled: d = !1,
    error: p = !1,
    focused: m,
    fullWidth: y = !1,
    hiddenLabel: x = !1,
    margin: f = "none",
    required: v = !1,
    size: h = "medium",
    variant: w = "outlined",
    ...O
  } = r, k = {
    ...r,
    color: a,
    component: c,
    disabled: d,
    error: p,
    fullWidth: y,
    hiddenLabel: x,
    margin: f,
    required: v,
    size: h,
    variant: w
  }, E = J0(k), [C, S] = b.useState(() => {
    let B = !1;
    return i && b.Children.forEach(i, (W) => {
      if (!pa(W, ["Input", "Select"]))
        return;
      const G = pa(W, ["Select"]) ? W.props.input : W;
      G && Y0(G.props) && (B = !0);
    }), B;
  }), [N, A] = b.useState(() => {
    let B = !1;
    return i && b.Children.forEach(i, (W) => {
      pa(W, ["Input", "Select"]) && (ds(W.props, !0) || ds(W.props.inputProps, !0)) && (B = !0);
    }), B;
  }), [_, D] = b.useState(!1);
  d && _ && D(!1);
  const F = m !== void 0 && !d ? m : _;
  let P;
  const g = b.useRef(!1);
  process.env.NODE_ENV !== "production" && (P = () => (g.current && console.error(["MUI: There are multiple `InputBase` components inside a FormControl.", "This creates visual inconsistencies, only use one `InputBase`."].join(`
`)), g.current = !0, () => {
    g.current = !1;
  }));
  const $ = b.useCallback(() => {
    A(!0);
  }, []), I = b.useCallback(() => {
    A(!1);
  }, []), M = b.useMemo(() => ({
    adornedStart: C,
    setAdornedStart: S,
    color: a,
    disabled: d,
    error: p,
    filled: N,
    focused: F,
    fullWidth: y,
    hiddenLabel: x,
    size: h,
    onBlur: () => {
      D(!1);
    },
    onFocus: () => {
      D(!0);
    },
    onEmpty: I,
    onFilled: $,
    registerEffect: P,
    required: v,
    variant: w
  }), [C, a, d, p, N, F, y, x, P, I, $, v, h, w]);
  return /* @__PURE__ */ l(js.Provider, {
    value: M,
    children: /* @__PURE__ */ l(Q0, {
      as: c,
      ownerState: k,
      className: de(E.root, s),
      ref: o,
      ...O,
      children: i
    })
  });
});
process.env.NODE_ENV !== "production" && (An.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: n.oneOfType([n.oneOf(["primary", "secondary", "error", "info", "success", "warning"]), n.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: n.elementType,
  /**
   * If `true`, the label, input and helper text should be displayed in a disabled state.
   * @default false
   */
  disabled: n.bool,
  /**
   * If `true`, the label is displayed in an error state.
   * @default false
   */
  error: n.bool,
  /**
   * If `true`, the component is displayed in focused state.
   */
  focused: n.bool,
  /**
   * If `true`, the component will take up the full width of its container.
   * @default false
   */
  fullWidth: n.bool,
  /**
   * If `true`, the label is hidden.
   * This is used to increase density for a `FilledInput`.
   * Be sure to add `aria-label` to the `input` element.
   * @default false
   */
  hiddenLabel: n.bool,
  /**
   * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
   * @default 'none'
   */
  margin: n.oneOf(["dense", "none", "normal"]),
  /**
   * If `true`, the label will indicate that the `input` is required.
   * @default false
   */
  required: n.bool,
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: n.oneOfType([n.oneOf(["medium", "small"]), n.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: n.oneOf(["filled", "outlined", "standard"])
});
function hr({
  props: e,
  states: t
}) {
  const o = b.useContext(js), r = {};
  return t.forEach((i) => {
    const s = e[i];
    r[i] = s === void 0 && o ? o[i] : s;
  }), [r, o];
}
function Z0(e) {
  return Se("MuiFormHelperText", e);
}
const Cd = we("MuiFormHelperText", ["root", "error", "disabled", "sizeSmall", "sizeMedium", "contained", "focused", "filled", "required"]);
var wd;
const ex = (e) => {
  const {
    classes: t,
    contained: o,
    size: r,
    disabled: i,
    error: s,
    filled: a,
    focused: c,
    required: d
  } = e, p = {
    root: ["root", i && "disabled", s && "error", r && `size${Ce(r)}`, o && "contained", c && "focused", a && "filled", d && "required"]
  };
  return Te(p, Z0, t);
}, tx = J("p", {
  name: "MuiFormHelperText",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [t.root, o.size && t[`size${Ce(o.size)}`], o.contained && t.contained, o.filled && t.filled];
  }
})(Pe(({
  theme: e
}) => ({
  color: (e.vars || e).palette.text.secondary,
  ...e.typography.caption,
  textAlign: "left",
  marginTop: 3,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
  [`&.${Cd.disabled}`]: {
    color: (e.vars || e).palette.text.disabled
  },
  [`&.${Cd.error}`]: {
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
}))), us = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiFormHelperText"
  }), {
    children: i,
    className: s,
    component: a = "p",
    disabled: c,
    error: d,
    filled: p,
    focused: m,
    margin: y,
    required: x,
    variant: f,
    ...v
  } = r, [h] = hr({
    props: r,
    states: ["variant", "size", "disabled", "error", "filled", "focused", "required"]
  }), w = {
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
  delete w.ownerState;
  const O = ex(w);
  return /* @__PURE__ */ l(tx, {
    as: a,
    className: de(O.root, s),
    ref: o,
    ...v,
    ownerState: w,
    children: i === " " ? (
      // notranslate needed while Google Translate will not fix zero-width space issue
      wd || (wd = /* @__PURE__ */ l("span", {
        className: "notranslate",
        "aria-hidden": !0,
        children: "​"
      }))
    ) : i
  });
});
process.env.NODE_ENV !== "production" && (us.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   *
   * If `' '` is provided, the component reserves one line height for displaying a future message.
   */
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: n.elementType,
  /**
   * If `true`, the helper text should be displayed in a disabled state.
   */
  disabled: n.bool,
  /**
   * If `true`, helper text should be displayed in an error state.
   */
  error: n.bool,
  /**
   * If `true`, the helper text should use filled classes key.
   */
  filled: n.bool,
  /**
   * If `true`, the helper text should use focused classes key.
   */
  focused: n.bool,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: n.oneOf(["dense"]),
  /**
   * If `true`, the helper text should use required classes key.
   */
  required: n.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  /**
   * The variant to use.
   */
  variant: n.oneOfType([n.oneOf(["filled", "outlined", "standard"]), n.string])
});
function nx(e) {
  return Se("MuiFormLabel", e);
}
const Br = we("MuiFormLabel", ["root", "colorSecondary", "focused", "disabled", "error", "filled", "required", "asterisk"]), ox = (e) => {
  const {
    classes: t,
    color: o,
    focused: r,
    disabled: i,
    error: s,
    filled: a,
    required: c
  } = e, d = {
    root: ["root", `color${Ce(o)}`, i && "disabled", s && "error", a && "filled", r && "focused", c && "required"],
    asterisk: ["asterisk", s && "error"]
  };
  return Te(d, nx, t);
}, rx = J("label", {
  name: "MuiFormLabel",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [t.root, o.color === "secondary" && t.colorSecondary, o.filled && t.filled];
  }
})(Pe(({
  theme: e
}) => ({
  color: (e.vars || e).palette.text.secondary,
  ...e.typography.body1,
  lineHeight: "1.4375em",
  padding: 0,
  position: "relative",
  variants: [...Object.entries(e.palette).filter(Ut()).map(([t]) => ({
    props: {
      color: t
    },
    style: {
      [`&.${Br.focused}`]: {
        color: (e.vars || e).palette[t].main
      }
    }
  })), {
    props: {},
    style: {
      [`&.${Br.disabled}`]: {
        color: (e.vars || e).palette.text.disabled
      },
      [`&.${Br.error}`]: {
        color: (e.vars || e).palette.error.main
      }
    }
  }]
}))), ix = J("span", {
  name: "MuiFormLabel",
  slot: "Asterisk"
})(Pe(({
  theme: e
}) => ({
  [`&.${Br.error}`]: {
    color: (e.vars || e).palette.error.main
  }
}))), Bp = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiFormLabel"
  }), {
    children: i,
    className: s,
    color: a,
    component: c = "label",
    disabled: d,
    error: p,
    filled: m,
    focused: y,
    required: x,
    ...f
  } = r, [v] = hr({
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
  }, w = ox(h);
  return /* @__PURE__ */ T(rx, {
    as: c,
    ownerState: h,
    className: de(w.root, s),
    ref: o,
    ...f,
    children: [i, v.required && /* @__PURE__ */ T(ix, {
      ownerState: h,
      "aria-hidden": !0,
      className: w.asterisk,
      children: [" ", "*"]
    })]
  });
});
process.env.NODE_ENV !== "production" && (Bp.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color: n.oneOfType([n.oneOf(["error", "info", "primary", "secondary", "success", "warning"]), n.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: n.elementType,
  /**
   * If `true`, the label should be displayed in a disabled state.
   */
  disabled: n.bool,
  /**
   * If `true`, the label is displayed in an error state.
   */
  error: n.bool,
  /**
   * If `true`, the label should use filled classes key.
   */
  filled: n.bool,
  /**
   * If `true`, the input of this label is focused (used by `FormGroup` components).
   */
  focused: n.bool,
  /**
   * If `true`, the label will indicate that the `input` is required.
   */
  required: n.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object])
});
function sx(e) {
  return Se("MuiInputLabel", e);
}
const ax = we("MuiInputLabel", ["root", "focused", "disabled", "error", "required", "asterisk", "formControl", "sizeSmall", "shrink", "animated", "standard", "filled", "outlined"]), lx = (e) => {
  const {
    classes: t,
    formControl: o,
    size: r,
    shrink: i,
    disableAnimation: s,
    variant: a,
    required: c
  } = e, d = {
    root: ["root", o && "formControl", !s && "animated", i && "shrink", r && r !== "medium" && `size${Ce(r)}`, a],
    asterisk: [c && "asterisk"]
  }, p = Te(d, sx, t);
  return {
    ...t,
    // forward the focused, disabled, etc. classes to the FormLabel
    ...p
  };
}, cx = J(Bp, {
  shouldForwardProp: (e) => Qt(e) || e === "classes",
  name: "MuiInputLabel",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [{
      [`& .${Br.asterisk}`]: t.asterisk
    }, t.root, o.formControl && t.formControl, o.size === "small" && t.sizeSmall, o.shrink && t.shrink, !o.disableAnimation && t.animated, o.focused && t.focused, t[o.variant]];
  }
})(Pe(({
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
      ownerState: o
    }) => t === "filled" && o.shrink,
    style: {
      userSelect: "none",
      pointerEvents: "auto",
      transform: "translate(12px, 7px) scale(0.75)",
      maxWidth: "calc(133% - 24px)"
    }
  }, {
    props: ({
      variant: t,
      ownerState: o,
      size: r
    }) => t === "filled" && o.shrink && r === "small",
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
      ownerState: o
    }) => t === "outlined" && o.shrink,
    style: {
      userSelect: "none",
      pointerEvents: "auto",
      // Theoretically, we should have (8+5)*2/0.75 = 34px
      // but it feels a better when it bleeds a bit on the left, so 32px.
      maxWidth: "calc(133% - 32px)",
      transform: "translate(14px, -9px) scale(0.75)"
    }
  }]
}))), _n = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    name: "MuiInputLabel",
    props: t
  }), {
    disableAnimation: i = !1,
    margin: s,
    shrink: a,
    variant: c,
    className: d,
    ...p
  } = r, [m, y] = hr({
    props: r,
    states: ["size", "variant", "required", "focused"]
  });
  let x = a;
  typeof x > "u" && y && (x = y.filled || y.focused || y.adornedStart);
  const f = {
    ...r,
    disableAnimation: i,
    formControl: y,
    shrink: x,
    size: m.size,
    variant: m.variant,
    required: m.required,
    focused: m.focused
  }, v = lx(f);
  return /* @__PURE__ */ l(cx, {
    "data-shrink": x,
    ref: o,
    className: de(v.root, d),
    ...p,
    ownerState: f,
    classes: v
  });
});
process.env.NODE_ENV !== "production" && (_n.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color: n.oneOfType([n.oneOf(["error", "info", "primary", "secondary", "success", "warning"]), n.string]),
  /**
   * If `true`, the transition animation is disabled.
   * @default false
   */
  disableAnimation: n.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: n.bool,
  /**
   * If `true`, the label is displayed in an error state.
   */
  error: n.bool,
  /**
   * If `true`, the `input` of this label is focused.
   */
  focused: n.bool,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: n.oneOf(["dense"]),
  /**
   * if `true`, the label will indicate that the `input` is required.
   */
  required: n.bool,
  /**
   * If `true`, the label is shrunk.
   */
  shrink: n.bool,
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: n.oneOfType([n.oneOf(["medium", "small"]), n.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  /**
   * The variant to use.
   */
  variant: n.oneOf(["filled", "outlined", "standard"])
});
const On = /* @__PURE__ */ b.createContext({});
process.env.NODE_ENV !== "production" && (On.displayName = "ListContext");
function Fp(e, t) {
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
const Ws = /* @__PURE__ */ b.createContext(void 0);
process.env.NODE_ENV !== "production" && (Ws.displayName = "RovingTabIndexContext");
function jp() {
  const e = b.useContext(Ws);
  if (e === void 0)
    throw new Error("MUI: RovingTabIndexContext is missing. Roving tab index items must be placed within a roving tab index provider.");
  return e;
}
const dx = Object.is;
function ux(e, t) {
  if (e === t)
    return !0;
  if (!(e instanceof Object) || !(t instanceof Object))
    return !1;
  let o = 0, r = 0;
  for (const i in e)
    if (o += 1, !dx(e[i], t[i]) || !(i in t))
      return !1;
  for (const i in t)
    r += 1;
  return o === r;
}
const px = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "Home", "End"];
function Wp(e) {
  const {
    activeItemId: t,
    getDefaultActiveItemId: o,
    orientation: r,
    isRtl: i = !1,
    isItemFocusable: s = Fr,
    wrap: a = !0
  } = e, [c, d] = b.useState(t), p = b.useRef(t);
  let m = c;
  t !== p.current && (p.current = t, t !== void 0 && t !== c && (m = t, d(t)));
  const y = b.useRef(null), x = b.useRef(/* @__PURE__ */ new Map()), [f, v] = b.useState(0), h = b.useMemo(() => za(x.current), [f]), w = Td(m, h, s, o), O = b.useRef(w);
  O.current = w;
  const k = b.useCallback(() => {
    const P = za(x.current), g = Td(O.current, P, s, o);
    return Hp(P, g);
  }, [o, s]), E = b.useCallback(() => x.current, []), C = It((P) => {
    const g = x.current.get(P.id);
    ux(g ?? null, P) || (x.current.set(P.id, P), v(($) => $ + 1));
  }), S = It((P) => {
    x.current.delete(P) && v((g) => g + 1);
  }), N = It((P) => {
    d(P);
  }), A = b.useCallback((P) => O.current === P, []), _ = b.useCallback((P, g, $, I) => {
    var W;
    const M = Ri(x.current), B = Vp(M, P, g, $, I ?? s);
    return B ? ((W = B.element) == null || W.focus(), d(B.id), B) : null;
  }, [s]), D = b.useCallback((P) => ({
    onFocus: (I) => {
      const M = Ri(x.current), B = qp(M, I.target);
      B !== -1 && d(M[B].id);
    },
    onKeyDown: (I) => {
      if (I.altKey || I.shiftKey || I.ctrlKey || I.metaKey || !px.includes(I.key))
        return;
      let M = r === "horizontal" ? "ArrowLeft" : "ArrowUp", B = r === "horizontal" ? "ArrowRight" : "ArrowDown";
      r === "horizontal" && i && (M = "ArrowRight", B = "ArrowLeft");
      const W = Ri(x.current), G = Bn(kt(y.current)), oe = G === y.current;
      let z = Ed(W, G, O.current), V = "next";
      switch (I.key) {
        case M:
          V = "previous", I.preventDefault(), oe && (z = W.length);
          break;
        case B:
          I.preventDefault(), oe && (z = -1);
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
      _(z, V, a);
    },
    ref: gx(P, (I) => {
      y.current = I;
    })
  }), [_, i, r, a]), F = b.useCallback((P) => {
    var B;
    const g = Ri(x.current), $ = Bn(kt(y.current)), M = $ === y.current ? -1 : Ed(g, $, O.current);
    return ((B = _(M, "next", !0, P)) == null ? void 0 : B.id) ?? null;
  }, [_]);
  return b.useMemo(() => ({
    activeItemId: w,
    focusNext: F,
    getActiveItem: k,
    getContainerProps: D,
    getItemMap: E,
    isItemActive: A,
    registerItem: C,
    setActiveItemId: N,
    unregisterItem: S
  }), [w, F, k, D, E, A, C, N, S]);
}
function zp(e) {
  const t = jp(), {
    activeItemId: o,
    registerItem: r,
    unregisterItem: i
  } = t, s = b.useRef(null), a = b.useMemo(() => ({
    disabled: e.disabled ?? !1,
    element: null,
    focusableWhenDisabled: e.focusableWhenDisabled ?? !1,
    id: e.id,
    selected: e.selected ?? !1,
    textValue: e.textValue
  }), [e.disabled, e.focusableWhenDisabled, e.id, e.selected, e.textValue]), c = b.useRef(a);
  c.current = a;
  const d = b.useCallback((m) => {
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
  }, [e.id, r, i]), p = gt(e.ref, d);
  return Nt(() => {
    s.current && r({
      ...a,
      element: s.current
    });
  }, [a, r]), Nt(() => {
    const m = e.id;
    return () => {
      i(m);
    };
  }, [e.id, i]), {
    ref: p,
    tabIndex: o === e.id ? 0 : -1
  };
}
function Td(e, t, o, r) {
  return e != null ? fx(e, t, o) : mx(t, o, r);
}
function fx(e, t, o) {
  var i;
  const r = Gp(t, e);
  return r === -1 ? Up(t, o) : o(t[r]) ? t[r].id : ((i = Vp(t, r, "next", !1, o)) == null ? void 0 : i.id) ?? null;
}
function mx(e, t, o) {
  const r = o == null ? void 0 : o(e);
  if (r != null) {
    const i = Hp(e, r);
    if (i && t(i))
      return i.id;
  }
  return Up(e, t);
}
function Ed(e, t, o) {
  if (t) {
    const r = qp(e, t);
    if (r !== -1)
      return r;
  }
  return Gp(e, o);
}
function Vp(e, t, o, r, i) {
  const s = e.length - 1;
  if (s === -1)
    return null;
  let a = !1, c = Od(t, s, o, r);
  const d = c;
  for (; c !== -1; ) {
    if (c === d) {
      if (a)
        return null;
      a = !0;
    }
    const p = e[c];
    if (!p || !i(p))
      c = Od(c, s, o, r);
    else
      return p;
  }
  return null;
}
function Up(e, t) {
  var o;
  return ((o = e.find((r) => t(r))) == null ? void 0 : o.id) ?? null;
}
function Hp(e, t) {
  return t == null ? null : e.find((o) => o.id === t) ?? null;
}
function Gp(e, t) {
  return t == null ? -1 : e.findIndex((o) => o.id === t);
}
function qp(e, t) {
  return t ? e.findIndex((o) => {
    var r;
    return o.element === t || ((r = o.element) == null ? void 0 : r.contains(t));
  }) : -1;
}
function za(e) {
  const t = Array.from(e.values());
  if (t.every((i) => i.element == null))
    return t;
  const o = t.filter(Va).sort((i, s) => hx(i.element, s.element)), r = t.filter((i) => !Va(i));
  return [...o, ...r];
}
function Ri(e) {
  return za(e).filter(Va);
}
function Od(e, t, o, r = !0) {
  return o === "next" ? e === t ? r ? 0 : -1 : e + 1 : e === 0 ? r ? t : -1 : e - 1;
}
function Fr(e) {
  return e.element ? e.focusableWhenDisabled ? !0 : !e.disabled && !e.element.hasAttribute("disabled") && e.element.getAttribute("aria-disabled") !== "true" && e.element.hasAttribute("tabindex") : !1;
}
function Va(e) {
  return e.element != null && e.element.isConnected;
}
function hx(e, t) {
  if (e === t)
    return 0;
  const o = e.compareDocumentPosition(t);
  return o & Node.DOCUMENT_POSITION_FOLLOWING || o & Node.DOCUMENT_POSITION_CONTAINED_BY ? -1 : o & Node.DOCUMENT_POSITION_PRECEDING || o & Node.DOCUMENT_POSITION_CONTAINS ? 1 : 0;
}
function gx(...e) {
  return (t) => {
    e.forEach((o) => {
      _a(o ?? null, t);
    });
  };
}
const Rd = we("MuiDivider", ["root", "absolute", "fullWidth", "inset", "middle", "flexItem", "vertical", "withChildren", "textAlignRight", "textAlignLeft", "wrapper", "wrapperVertical"]);
function bx(e) {
  return Se("MuiListItemIcon", e);
}
const Nd = we("MuiListItemIcon", ["root", "alignItemsFlexStart"]), yx = (e) => {
  const {
    alignItems: t,
    classes: o
  } = e;
  return Te({
    root: ["root", t === "flex-start" && "alignItemsFlexStart"]
  }, bx, o);
}, vx = J("div", {
  name: "MuiListItemIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [t.root, o.alignItems === "flex-start" && t.alignItemsFlexStart];
  }
})(Pe(({
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
}))), Kp = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiListItemIcon"
  }), {
    className: i,
    ...s
  } = r, a = b.useContext(On), c = {
    ...r,
    alignItems: a.alignItems
  }, d = yx(c);
  return /* @__PURE__ */ l(vx, {
    className: de(d.root, i),
    ownerState: c,
    ref: o,
    ...s
  });
});
process.env.NODE_ENV !== "production" && (Kp.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component, normally `Icon`, `SvgIcon`,
   * or a `@mui/icons-material` SVG icon element.
   */
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object])
});
function xx(e) {
  return Se("MuiListItemText", e);
}
const Ko = we("MuiListItemText", ["root", "multiline", "dense", "inset", "primary", "secondary"]), Sx = (e) => {
  const {
    classes: t,
    inset: o,
    primary: r,
    secondary: i,
    dense: s
  } = e;
  return Te({
    root: ["root", o && "inset", s && "dense", r && i && "multiline"],
    primary: ["primary"],
    secondary: ["secondary"]
  }, xx, t);
}, Cx = J("div", {
  name: "MuiListItemText",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [{
      [`& .${Ko.primary}`]: t.primary
    }, {
      [`& .${Ko.secondary}`]: t.secondary
    }, t.root, o.inset && t.inset, o.primary && o.secondary && t.multiline, o.dense && t.dense];
  }
})({
  flex: "1 1 auto",
  minWidth: 0,
  marginTop: 4,
  marginBottom: 4,
  // Combine this and the below selector once https://github.com/emotion-js/emotion/issues/3366 is solved
  [`.${vd.root}:where(& .${Ko.primary})`]: {
    display: "block"
  },
  [`.${vd.root}:where(& .${Ko.secondary})`]: {
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
}), Yp = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiListItemText"
  }), {
    children: i,
    className: s,
    disableTypography: a = !1,
    inset: c = !1,
    primary: d,
    secondary: p,
    slots: m = {},
    slotProps: y = {},
    ...x
  } = r, {
    dense: f
  } = b.useContext(On);
  let v = d ?? i, h = p;
  const w = {
    ...r,
    disableTypography: a,
    inset: c,
    primary: !!v,
    secondary: !!h,
    dense: f
  }, O = Sx(w), k = {
    slots: m,
    slotProps: y
  }, [E, C] = be("root", {
    className: de(O.root, s),
    elementType: Cx,
    externalForwardedProps: {
      ...k,
      ...x
    },
    ownerState: w,
    ref: o
  }), [S, N] = be("primary", {
    className: O.primary,
    elementType: q,
    externalForwardedProps: k,
    ownerState: w
  }), [A, _] = be("secondary", {
    className: O.secondary,
    elementType: q,
    externalForwardedProps: k,
    ownerState: w
  });
  return v != null && v.type !== q && !a && (v = /* @__PURE__ */ l(S, {
    variant: f ? "body2" : "body1",
    component: N != null && N.variant ? void 0 : "span",
    ...N,
    children: v
  })), h != null && h.type !== q && !a && (h = /* @__PURE__ */ l(A, {
    variant: "body2",
    color: "textSecondary",
    ..._,
    children: h
  })), /* @__PURE__ */ T(E, {
    ...C,
    children: [v, h]
  });
});
process.env.NODE_ENV !== "production" && (Yp.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Alias for the `primary` prop.
   */
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * If `true`, the children won't be wrapped by a Typography component.
   * This can be useful to render an alternative Typography variant by wrapping
   * the `children` (or `primary`) text, and optional `secondary` text
   * with the Typography component.
   * @default false
   */
  disableTypography: n.bool,
  /**
   * If `true`, the children are indented.
   * This should be used if there is no left avatar or left icon.
   * @default false
   */
  inset: n.bool,
  /**
   * The main content element.
   */
  primary: n.node,
  /**
   * The secondary content element.
   */
  secondary: n.node,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: n.shape({
    primary: n.oneOfType([n.func, n.object]),
    root: n.oneOfType([n.func, n.object]),
    secondary: n.oneOfType([n.func, n.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: n.shape({
    primary: n.elementType,
    root: n.elementType,
    secondary: n.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object])
});
const El = /* @__PURE__ */ b.createContext(void 0);
process.env.NODE_ENV !== "production" && (El.displayName = "MenuListContext");
function wx() {
  const e = b.useContext(El);
  if (e === void 0)
    throw new Error("MUI: MenuListContext is missing. MenuItems must be placed within Menu or MenuList.");
  return e;
}
function Tx(e) {
  return e ? e.type === "mousedown" || e.type === "pointerdown" || e.type === "touchstart" ? "pointer" : e.type === "keydown" || e.type === "click" && e.detail === 0 ? "keyboard" : null : null;
}
function Ex(e) {
  return e == null || typeof e == "string" && !e.trim();
}
function kd(e, t) {
  return typeof t == "object" && t !== null ? e === t : String(e) === String(t);
}
const Ol = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (Ol.displayName = "SelectFocusSourceContext");
function Xp() {
  return b.useContext(Ol);
}
const Ox = Ol.Provider;
function Rx(e) {
  return Se("MuiMenuItem", e);
}
const Tr = we("MuiMenuItem", ["root", "focusVisible", "dense", "disabled", "divider", "gutters", "selected"]), Nx = (e, t) => {
  const {
    ownerState: o
  } = e;
  return [t.root, o.dense && t.dense, o.divider && t.divider, !o.disableGutters && t.gutters];
}, kx = (e) => {
  const {
    disabled: t,
    dense: o,
    divider: r,
    disableGutters: i,
    selected: s,
    classes: a
  } = e, d = Te({
    root: ["root", o && "dense", t && "disabled", !i && "gutters", r && "divider", s && "selected"]
  }, Rx, a);
  return {
    ...a,
    ...d
  };
}, Px = J(zn, {
  shouldForwardProp: (e) => Qt(e) || e === "classes",
  name: "MuiMenuItem",
  slot: "Root",
  overridesResolver: Nx
})(Pe(({
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
  [`&.${Tr.selected}`]: {
    backgroundColor: e.alpha((e.vars || e).palette.primary.main, (e.vars || e).palette.action.selectedOpacity),
    [`&.${Tr.focusVisible}`]: {
      backgroundColor: e.alpha((e.vars || e).palette.primary.main, `${(e.vars || e).palette.action.selectedOpacity} + ${(e.vars || e).palette.action.focusOpacity}`)
    }
  },
  [`&.${Tr.selected}:hover`]: {
    backgroundColor: e.alpha((e.vars || e).palette.primary.main, `${(e.vars || e).palette.action.selectedOpacity} + ${(e.vars || e).palette.action.hoverOpacity}`),
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      backgroundColor: e.alpha((e.vars || e).palette.primary.main, (e.vars || e).palette.action.selectedOpacity)
    }
  },
  [`&.${Tr.focusVisible}`]: {
    backgroundColor: (e.vars || e).palette.action.focus
  },
  [`&.${Tr.disabled}`]: {
    opacity: (e.vars || e).palette.action.disabledOpacity
  },
  [`& + .${Rd.root}`]: {
    marginTop: e.spacing(1),
    marginBottom: e.spacing(1)
  },
  [`& + .${Rd.inset}`]: {
    marginLeft: 52
  },
  [`& .${Ko.root}`]: {
    marginTop: 0,
    marginBottom: 0
  },
  [`& .${Ko.inset}`]: {
    paddingLeft: 36
  },
  [`& .${Nd.root}`]: {
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
      [`& .${Nd.root} svg`]: {
        fontSize: "1.25rem"
      }
    }
  }]
}))), jt = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiMenuItem"
  }), {
    autoFocus: i = !1,
    component: s = "li",
    dense: a = !1,
    divider: c = !1,
    disableGutters: d = !1,
    focusVisibleClassName: p,
    role: m = "menuitem",
    tabIndex: y,
    className: x,
    ...f
  } = r, v = Xp(), h = b.useContext(On), w = b.useMemo(() => ({
    dense: a || h.dense || !1,
    disableGutters: d
  }), [h.dense, a, d]), O = wx(), k = to(), E = O.suppressInitialFocusVisible, C = O.itemsFocusableWhenDisabled, S = b.useRef(null);
  Nt(() => {
    i && (S.current ? Fp(S.current, v) : process.env.NODE_ENV !== "production" && console.error("MUI: Unable to set focus to a MenuItem whose component has not been rendered."));
  }, [i]);
  const N = {
    ...r,
    dense: w.dense,
    divider: c,
    disableGutters: d
  }, A = kx(r), {
    root: _,
    ...D
  } = A, F = zp({
    id: k,
    ref: o,
    disabled: r.disabled,
    focusableWhenDisabled: C,
    selected: r.selected
  }), P = gt(S, F.ref);
  let g;
  return y !== void 0 ? g = y : O.variant === "selectedMenu" ? g = F.tabIndex : (!r.disabled || C) && (g = -1), /* @__PURE__ */ l(On.Provider, {
    value: w,
    children: /* @__PURE__ */ l(Px, {
      ref: P,
      role: m,
      tabIndex: g,
      component: s,
      internalNativeButton: !1,
      focusableWhenDisabled: C,
      suppressFocusVisible: E,
      focusVisibleClassName: de(A.focusVisible, p),
      className: de(A.root, x),
      ...f,
      ownerState: N,
      classes: D
    })
  });
});
process.env.NODE_ENV !== "production" && (jt.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the list item is focused during the first mount.
   * Focus will also be triggered if the value changes from false to true.
   * @default false
   */
  autoFocus: n.bool,
  /**
   * The content of the component.
   */
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: n.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * The prop defaults to the value inherited from the parent Menu component.
   * @default false
   */
  dense: n.bool,
  /**
   * @ignore
   */
  disabled: n.bool,
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: n.bool,
  /**
   * If `true`, a 1px light border is added to the bottom of the menu item.
   * @default false
   */
  divider: n.bool,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: n.string,
  /**
   * @ignore
   */
  role: n.string,
  /**
   * If `true`, the component is selected.
   * @default false
   */
  selected: n.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  /**
   * @default 0
   */
  tabIndex: n.number
});
function or(e) {
  var y;
  const {
    elementType: t,
    externalSlotProps: o,
    ownerState: r,
    skipResolvingSlotProps: i = !1,
    ...s
  } = e, a = i ? {} : Cp(o, r), {
    props: c,
    internalRef: d
  } = Tp({
    ...s,
    externalSlotProps: a
  }), p = gt(d, a == null ? void 0 : a.ref, (y = e.additionalProps) == null ? void 0 : y.ref);
  return Sp(t, {
    ...c,
    ref: p
  }, r);
}
function Ix(e) {
  return Se("MuiList", e);
}
we("MuiList", ["root", "padding", "dense", "subheader"]);
const $x = (e) => {
  const {
    classes: t,
    disablePadding: o,
    dense: r,
    subheader: i
  } = e;
  return Te({
    root: ["root", !o && "padding", r && "dense", i && "subheader"]
  }, Ix, t);
}, Mx = J("ul", {
  name: "MuiList",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [t.root, !o.disablePadding && t.padding, o.dense && t.dense, o.subheader && t.subheader];
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
}), Rl = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiList"
  }), {
    children: i,
    className: s,
    component: a = "ul",
    dense: c = !1,
    disablePadding: d = !1,
    subheader: p,
    ...m
  } = r, y = b.useMemo(() => ({
    dense: c
  }), [c]), x = {
    ...r,
    component: a,
    dense: c,
    disablePadding: d
  }, f = $x(x);
  return /* @__PURE__ */ l(On.Provider, {
    value: y,
    children: /* @__PURE__ */ T(Mx, {
      as: a,
      className: de(f.root, s),
      ref: o,
      ownerState: x,
      ...m,
      children: [p, i]
    })
  });
});
process.env.NODE_ENV !== "production" && (Rl.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: n.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used for
   * the list and list items.
   * The prop is available to descendant components as the `dense` context.
   * @default false
   */
  dense: n.bool,
  /**
   * If `true`, vertical padding is removed from the list.
   * @default false
   */
  disablePadding: n.bool,
  /**
   * The content of the subheader, normally `ListSubheader`.
   */
  subheader: n.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object])
});
function Ax(e) {
  const t = (e == null ? void 0 : e.element) ?? e;
  if (!t)
    return "";
  if ((e == null ? void 0 : e.textValue) !== void 0)
    return e.textValue;
  let o = t.innerText;
  return o === void 0 && (o = t.textContent), o ?? "";
}
function Jp(e, t) {
  if (t === void 0)
    return !0;
  let o = Ax(e);
  return o = o.trim().toLowerCase(), o.length === 0 ? !1 : t.repeating ? o[0] === t.keys[0] : o.startsWith(t.keys.join(""));
}
function _x(e, t) {
  return Jp(e, t) ? Fr(e) : !1;
}
function Dx(e, t) {
  Fp(e, t);
}
const Qp = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const {
    // private
    // eslint-disable-next-line react/prop-types
    actions: r,
    autoFocus: i = !1,
    autoFocusItem: s = !1,
    children: a,
    className: c,
    disabledItemsFocusable: d = !1,
    disableListWrap: p = !1,
    onKeyDown: m,
    variant: y = "selectedMenu",
    ...x
  } = t, f = b.useRef(null), v = b.useRef(!1), [h, w] = b.useState(!1), O = Xp(), k = b.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  }), E = b.useCallback((M) => {
    var B, W, G;
    return y === "selectedMenu" ? ((B = M.find((oe) => oe.selected && Fr(oe))) == null ? void 0 : B.id) ?? ((W = M.find((oe) => Fr(oe))) == null ? void 0 : W.id) ?? null : ((G = M.find((oe) => Fr(oe))) == null ? void 0 : G.id) ?? null;
  }, [y]), C = Wp({
    activeItemId: void 0,
    getDefaultActiveItemId: E,
    orientation: "vertical",
    wrap: !p
  }), {
    activeItemId: S,
    focusNext: N,
    getActiveItem: A,
    getContainerProps: _,
    getItemMap: D
  } = C, F = It((M = !1) => {
    if (!f.current || !M && v.current)
      return null;
    if (s) {
      const B = A();
      if (B != null && B.element) {
        const W = Array.from(D().values()).some((oe) => oe.selected), G = y === "menu" && W && !B.selected && O == null;
        return w(G), Dx(B.element, O), v.current = !0, B.element;
      }
      return i ? (w(!1), f.current.focus(), f.current) : null;
    }
    return i ? (w(!1), f.current.focus(), v.current = !0, f.current) : (w(!1), null);
  });
  Nt(() => {
    if (!i && !s) {
      v.current = !1, w(!1);
      return;
    }
    F();
  }, [S, s, i, F]), b.useImperativeHandle(r, () => ({
    adjustStyleForScrollbar: (M, {
      direction: B
    }) => {
      const W = !f.current.style.width;
      if (M.clientHeight < f.current.clientHeight && W) {
        const G = `${Dp(En(M))}px`;
        f.current.style[B === "rtl" ? "paddingLeft" : "paddingRight"] = G, f.current.style.width = `calc(100% + ${G})`;
      }
      return f.current;
    },
    focusInitialTarget: () => {
      if (!f.current)
        return null;
      const M = Bn(kt(f.current));
      return M && ls(f.current, M) ? M : F(!0);
    }
  }), [F]);
  const P = _(), g = gt(f, P.ref, o), $ = b.useMemo(() => ({
    itemsFocusableWhenDisabled: d,
    suppressInitialFocusVisible: h,
    variant: y
  }), [d, h, y]), I = It((M) => {
    if (h && w(!1), (M.ctrlKey || M.metaKey || M.altKey) && m) {
      m(M);
      return;
    }
    if (P.onKeyDown(M), M.key.length === 1) {
      const W = k.current, G = M.key.toLowerCase(), oe = performance.now();
      W.keys.length > 0 && (oe - W.lastTime > 500 ? (W.keys = [], W.repeating = !0, W.previousKeyMatched = !0) : W.repeating && G !== W.keys[0] && (W.repeating = !1)), W.lastTime = oe, W.keys.push(G);
      const z = Bn(kt(f.current)), V = z && !W.repeating && Jp(z, W);
      W.previousKeyMatched && (V || N((Y) => _x(Y, W)) != null) ? M.preventDefault() : W.previousKeyMatched = !1;
    }
    m && m(M);
  });
  return /* @__PURE__ */ l(Rl, {
    role: "menu",
    ref: g,
    className: c,
    onKeyDown: I,
    onFocus: P.onFocus,
    tabIndex: -1,
    ...x,
    children: /* @__PURE__ */ l(El.Provider, {
      value: $,
      children: /* @__PURE__ */ l(Ws.Provider, {
        value: C,
        children: a
      })
    })
  });
});
process.env.NODE_ENV !== "production" && (Qp.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, will focus the `[role="menu"]` container and move into tab order.
   * @default false
   */
  autoFocus: n.bool,
  /**
   * If `true`, will focus the first menuitem if `variant="menu"` or selected item
   * if `variant="selectedMenu"`.
   * @default false
   */
  autoFocusItem: n.bool,
  /**
   * MenuList contents, normally `MenuItem`s.
   */
  children: n.node,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * If `true`, will allow focus on disabled items.
   * @default false
   */
  disabledItemsFocusable: n.bool,
  /**
   * If `true`, the menu items will not wrap focus.
   * @default false
   */
  disableListWrap: n.bool,
  /**
   * @ignore
   */
  onKeyDown: n.func,
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus
   * and the vertical alignment relative to the anchor element.
   * @default 'selectedMenu'
   */
  variant: n.oneOf(["menu", "selectedMenu"])
});
function li() {
  return !(/jsdom|HappyDOM/.test(window.navigator.userAgent) || // TODO(v9): Remove the test environment check
  // eslint-disable-next-line mui/consistent-production-guard
  process.env.NODE_ENV === "test");
}
function jr(e) {
  return `scale(${e}, ${e ** 2})`;
}
const Lx = {
  entering: {
    opacity: 1,
    transform: jr(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  },
  exiting: {
    opacity: 0,
    transform: jr(0.75)
  },
  exited: {
    opacity: 0,
    transform: jr(0.75)
  }
}, Bx = {
  opacity: 0,
  transform: jr(0.75),
  visibility: "hidden"
}, Jr = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const {
    addEndListener: r,
    appear: i = !0,
    children: s,
    easing: a,
    in: c,
    onEnter: d,
    onEntered: p,
    onEntering: m,
    onExit: y,
    onExited: x,
    onExiting: f,
    style: v,
    timeout: h = "auto",
    ...w
  } = t, O = Qn(), k = b.useRef(), E = ko(), C = b.useRef(null), S = gt(C, mr(s), o), N = Pt(C, m), A = Pt(C, ($, I) => {
    bp($);
    const {
      duration: M,
      delay: B,
      easing: W
    } = nr({
      style: v,
      timeout: h,
      easing: a
    }, {
      mode: "enter"
    });
    let G;
    h === "auto" ? (G = E.transitions.getAutoHeightDuration($.clientHeight), k.current = G) : G = M, $.style.transition = [E.transitions.create("opacity", {
      duration: G,
      delay: B
    }), E.transitions.create("transform", {
      duration: G * 0.666,
      delay: B,
      easing: W
    })].join(","), d && d($, I);
  }), _ = Pt(C, p), D = Pt(C, f), F = Pt(C, ($) => {
    const {
      duration: I,
      delay: M,
      easing: B
    } = nr({
      style: v,
      timeout: h,
      easing: a
    }, {
      mode: "exit"
    });
    let W;
    h === "auto" ? (W = E.transitions.getAutoHeightDuration($.clientHeight), k.current = W) : W = I, $.style.transition = [E.transitions.create("opacity", {
      duration: W,
      delay: M
    }), E.transitions.create("transform", {
      duration: W * 0.666,
      delay: M || W * 0.333,
      easing: B
    })].join(","), $.style.opacity = 0, $.style.transform = jr(0.75), y && y($);
  }), P = Pt(C, ($) => {
    $.style.transition = "", x && x($);
  });
  return /* @__PURE__ */ l(Rn, {
    appear: i,
    in: c,
    nodeRef: C,
    onEnter: A,
    onEntered: _,
    onEntering: N,
    onExit: F,
    onExited: P,
    onExiting: D,
    addEndListener: ($) => {
      h === "auto" && O.start(k.current || 0, $), r && r(C.current, $);
    },
    timeout: h === "auto" ? null : h,
    ...w,
    children: ($, {
      ownerState: I,
      ...M
    }) => {
      const B = yp($, c, Lx, Bx, v, s.props.style);
      return /* @__PURE__ */ b.cloneElement(s, {
        style: B,
        ref: S,
        ...M
      });
    }
  });
});
process.env.NODE_ENV !== "production" && (Jr.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: n.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: n.bool,
  /**
   * A single child content element.
   */
  children: fr.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: n.oneOfType([n.shape({
    enter: n.string,
    exit: n.string
  }), n.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: n.bool,
  /**
   * @ignore
   */
  onEnter: n.func,
  /**
   * @ignore
   */
  onEntered: n.func,
  /**
   * @ignore
   */
  onEntering: n.func,
  /**
   * @ignore
   */
  onExit: n.func,
  /**
   * @ignore
   */
  onExited: n.func,
  /**
   * @ignore
   */
  onExiting: n.func,
  /**
   * @ignore
   */
  style: n.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  timeout: n.oneOfType([n.oneOf(["auto"]), n.number, n.shape({
    appear: n.number,
    enter: n.number,
    exit: n.number
  })])
});
Jr && (Jr.muiSupportAuto = !0);
function Fx(e) {
  return Se("MuiPopover", e);
}
we("MuiPopover", ["root", "paper"]);
function Pd(e, t) {
  let o = 0;
  return typeof t == "number" ? o = t : t === "center" ? o = e.height / 2 : t === "bottom" && (o = e.height), o;
}
function Id(e, t) {
  let o = 0;
  return typeof t == "number" ? o = t : t === "center" ? o = e.width / 2 : t === "right" && (o = e.width), o;
}
function $d(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function Dr(e) {
  return typeof e == "function" ? e() : e;
}
const jx = (e) => {
  const {
    classes: t
  } = e;
  return Te({
    root: ["root"],
    paper: ["paper"]
  }, Fx, t);
}, Wx = J(wl, {
  name: "MuiPopover",
  slot: "Root"
})({}), Zp = J(ht, {
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
}), ef = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
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
    anchorReference: d = "anchorEl",
    children: p,
    className: m,
    container: y,
    disableAutoFocus: x = !1,
    elevation: f = 8,
    marginThreshold: v = 16,
    open: h,
    slots: w = {},
    slotProps: O = {},
    transformOrigin: k = {
      vertical: "top",
      horizontal: "left"
    },
    transitionDuration: E = "auto",
    disableScrollLock: C = !1,
    ...S
  } = r, N = b.useRef(), A = {
    ...r,
    anchorOrigin: a,
    anchorReference: d,
    elevation: f,
    marginThreshold: v,
    transformOrigin: k,
    transitionDuration: E
  }, _ = jx(A), D = b.useCallback(() => {
    if (d === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (c || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), c;
    const U = Dr(s), X = U && U.nodeType === 1 ? U : kt(N.current).body, Z = X.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const ae = X.getBoundingClientRect();
      li() && ae.top === 0 && ae.left === 0 && ae.right === 0 && ae.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: Z.top + Pd(Z, a.vertical),
      left: Z.left + Id(Z, a.horizontal)
    };
  }, [s, a.horizontal, a.vertical, c, d]), F = b.useCallback((U) => ({
    vertical: Pd(U, k.vertical),
    horizontal: Id(U, k.horizontal)
  }), [k.horizontal, k.vertical]), P = b.useCallback((U) => {
    const X = {
      width: U.offsetWidth,
      height: U.offsetHeight
    }, Z = F(X);
    if (d === "none")
      return {
        top: null,
        left: null,
        transformOrigin: $d(Z)
      };
    const ae = D();
    let j = ae.top - Z.vertical, me = ae.left - Z.horizontal;
    const Q = j + X.height, fe = me + X.width, Ie = En(Dr(s)), xe = Ie.innerHeight - v, Be = Ie.innerWidth - v;
    if (v != null && j < v) {
      const ye = j - v;
      j -= ye, Z.vertical += ye;
    } else if (v != null && Q > xe) {
      const ye = Q - xe;
      j -= ye, Z.vertical += ye;
    }
    if (process.env.NODE_ENV !== "production" && X.height > xe && X.height && xe && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${X.height - xe}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), v != null && me < v) {
      const ye = me - v;
      me -= ye, Z.horizontal += ye;
    } else if (fe > Be) {
      const ye = fe - Be;
      me -= ye, Z.horizontal += ye;
    }
    return {
      top: `${Math.round(j)}px`,
      left: `${Math.round(me)}px`,
      transformOrigin: $d(Z)
    };
  }, [s, d, D, F, v]), [g, $] = b.useState(h), I = b.useCallback(() => {
    const U = N.current;
    if (!U)
      return;
    const X = P(U);
    X.top != null && U.style.setProperty("top", X.top), X.left != null && (U.style.left = X.left), U.style.transformOrigin = X.transformOrigin, $(!0);
  }, [P]);
  b.useEffect(() => (C && window.addEventListener("scroll", I), () => window.removeEventListener("scroll", I)), [s, C, I]);
  const M = () => {
    I();
  }, B = () => {
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
    const U = Fs(() => {
      I();
    }), X = En(Dr(s));
    return X.addEventListener("resize", U), () => {
      U.clear(), X.removeEventListener("resize", U);
    };
  }, [s, h, I]);
  let W = E;
  const G = {
    slots: w,
    slotProps: O
  }, [oe, z] = be("transition", {
    elementType: Jr,
    externalForwardedProps: G,
    ownerState: A,
    getSlotProps: (U) => ({
      ...U,
      onEntering: (X, Z) => {
        var ae;
        (ae = U.onEntering) == null || ae.call(U, X, Z), M();
      },
      onExited: (X) => {
        var Z;
        (Z = U.onExited) == null || Z.call(U, X), B();
      }
    }),
    additionalProps: {
      appear: !0,
      in: h
    }
  });
  E === "auto" && !oe.muiSupportAuto && (W = void 0);
  const V = y || (s ? kt(Dr(s)).body : void 0), [Y, {
    slots: ne,
    slotProps: te,
    ...re
  }] = be("root", {
    ref: o,
    elementType: Wx,
    externalForwardedProps: {
      ...G,
      ...S
    },
    shouldForwardComponentProp: !0,
    additionalProps: {
      slots: {
        backdrop: w.backdrop
      },
      slotProps: {
        backdrop: Vy(typeof O.backdrop == "function" ? O.backdrop(A) : O.backdrop, {
          invisible: !0
        })
      },
      container: V,
      open: h
    },
    ownerState: A,
    className: de(_.root, m)
  }), [ee, K] = be("paper", {
    ref: N,
    className: _.paper,
    elementType: Zp,
    externalForwardedProps: G,
    shouldForwardComponentProp: !0,
    additionalProps: {
      elevation: f,
      style: g ? void 0 : {
        opacity: 0
      }
    },
    ownerState: A
  });
  return /* @__PURE__ */ l(Y, {
    ...re,
    ...!rs(Y) && {
      slots: ne,
      slotProps: te,
      disableAutoFocus: x,
      disableScrollLock: C
    },
    children: /* @__PURE__ */ l(oe, {
      ...z,
      timeout: W,
      children: /* @__PURE__ */ l(ee, {
        ...K,
        children: p
      })
    })
  });
});
process.env.NODE_ENV !== "production" && (ef.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: bn,
  /**
   * An HTML element, [PopoverVirtualElement](https://mui.com/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: Un(n.oneOfType([no, n.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const t = Dr(e.anchorEl);
      if (t && t.nodeType === 1) {
        const o = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "production" && li() && o.top === 0 && o.left === 0 && o.right === 0 && o.bottom === 0)
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
  anchorOrigin: n.shape({
    horizontal: n.oneOfType([n.oneOf(["center", "left", "right"]), n.number]).isRequired,
    vertical: n.oneOfType([n.oneOf(["bottom", "center", "top"]), n.number]).isRequired
  }),
  /**
   * This is the position that may be used to set the position of the popover.
   * The coordinates are relative to the application's client area.
   */
  anchorPosition: n.shape({
    left: n.number.isRequired,
    top: n.number.isRequired
  }),
  /**
   * This determines which anchor prop to refer to when setting
   * the position of the popover.
   * @default 'anchorEl'
   */
  anchorReference: n.oneOf(["anchorEl", "anchorPosition", "none"]),
  /**
   * The content of the component.
   */
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * An HTML element, component instance, or function that returns either.
   * The `container` will passed to the Modal component.
   *
   * By default, it uses the body of the anchorEl's top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: n.oneOfType([no, n.func]),
  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: n.bool,
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: n.bool,
  /**
   * The elevation of the popover.
   * @default 8
   */
  elevation: Rp,
  /**
   * Specifies how close to the edge of the window the popover can appear.
   * If null, the popover will not be constrained by the window.
   * @default 16
   */
  marginThreshold: n.number,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   */
  onClose: n.func,
  /**
   * If `true`, the component is shown.
   */
  open: n.bool.isRequired,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: n.shape({
    backdrop: n.oneOfType([n.func, n.object]),
    paper: n.oneOfType([n.func, n.object]),
    root: n.oneOfType([n.func, n.object]),
    transition: n.oneOfType([n.func, n.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: n.shape({
    backdrop: n.elementType,
    paper: n.elementType,
    root: n.elementType,
    transition: n.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
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
  transformOrigin: n.shape({
    horizontal: n.oneOfType([n.oneOf(["center", "left", "right"]), n.number]).isRequired,
    vertical: n.oneOfType([n.oneOf(["bottom", "center", "top"]), n.number]).isRequired
  }),
  /**
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  transitionDuration: n.oneOfType([n.oneOf(["auto"]), n.number, n.shape({
    appear: n.number,
    enter: n.number,
    exit: n.number
  })])
});
function zx(e) {
  return Se("MuiMenu", e);
}
we("MuiMenu", ["root", "paper", "list"]);
const Vx = {
  vertical: "top",
  horizontal: "right"
}, Ux = {
  vertical: "top",
  horizontal: "left"
}, Hx = (e) => {
  const {
    classes: t
  } = e;
  return Te({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, zx, t);
}, Gx = J(ef, {
  shouldForwardProp: (e) => Qt(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root"
})({}), qx = J(Zp, {
  name: "MuiMenu",
  slot: "Paper"
})({
  // specZ: The maximum height of a simple menu should be one or more rows less than the view
  // height. This ensures a tappable area outside of the simple menu with which to dismiss
  // the menu.
  maxHeight: "calc(100% - 96px)",
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: "touch"
}), Kx = J(Qp, {
  name: "MuiMenu",
  slot: "List"
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), tf = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiMenu"
  }), {
    autoFocus: i = !0,
    children: s,
    className: a,
    disableAutoFocusItem: c = !1,
    onClose: d,
    open: p,
    PopoverClasses: m,
    transitionDuration: y = "auto",
    variant: x = "selectedMenu",
    slots: f = {},
    slotProps: v = {},
    ...h
  } = r, w = Ds(), O = {
    ...r,
    autoFocus: i,
    disableAutoFocusItem: c,
    transitionDuration: y,
    variant: x
  }, k = Hx(O), E = i && p, C = E && !c, S = b.useRef(null), N = (M, B) => {
    var W, G;
    S.current && (S.current.adjustStyleForScrollbar(M, {
      direction: w ? "rtl" : "ltr"
    }), E && ((G = (W = S.current).focusInitialTarget) == null || G.call(W)));
  }, A = (M) => {
    M.key === "Tab" && (M.preventDefault(), d && d(M, "tabKeyDown"));
  }, _ = {
    slots: f,
    slotProps: v
  }, D = or({
    elementType: f.root,
    externalSlotProps: v.root,
    ownerState: O,
    className: [k.root, a]
  }), [F, P] = be("paper", {
    className: k.paper,
    elementType: qx,
    externalForwardedProps: _,
    shouldForwardComponentProp: !0,
    ownerState: O
  }), [g, $] = be("list", {
    className: k.list,
    elementType: Kx,
    shouldForwardComponentProp: !0,
    externalForwardedProps: _,
    getSlotProps: (M) => ({
      ...M,
      onKeyDown: (B) => {
        var W;
        A(B), (W = M.onKeyDown) == null || W.call(M, B);
      }
    }),
    ownerState: O
  }), I = typeof v.transition == "function" ? v.transition(O) : v.transition;
  return /* @__PURE__ */ l(
    Gx,
    {
      disableAutoFocus: i,
      onClose: d,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: w ? "right" : "left"
      },
      transformOrigin: w ? Vx : Ux,
      slots: {
        root: f.root,
        paper: F,
        backdrop: f.backdrop,
        transition: f.transition
      },
      slotProps: {
        root: D,
        paper: P,
        backdrop: typeof v.backdrop == "function" ? v.backdrop(O) : v.backdrop,
        transition: {
          ...I,
          onEntering: (...M) => {
            var B;
            N(...M), (B = I == null ? void 0 : I.onEntering) == null || B.call(I, ...M);
          }
        }
      },
      open: p,
      ref: o,
      transitionDuration: y,
      ownerState: O,
      ...h,
      classes: m,
      children: /* @__PURE__ */ l(g, {
        actions: S,
        autoFocus: E,
        autoFocusItem: C,
        variant: x,
        ...$,
        children: s
      })
    }
  );
});
process.env.NODE_ENV !== "production" && (tf.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, or a function that returns one.
   * It's used to set the position of the menu.
   */
  anchorEl: n.oneOfType([no, n.func]),
  /**
   * If `true` (Default) will focus the `[role="menu"]` if no focusable child is found. Disabled
   * children are not focusable. If you set this prop to `false` focus will be placed
   * on the parent modal container. This has severe accessibility implications
   * and should only be considered if you manage focus otherwise.
   * @default true
   */
  autoFocus: n.bool,
  /**
   * Menu contents, normally `MenuItem`s.
   */
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * When opening the menu will not focus the active item but the `[role="menu"]`
   * unless `autoFocus` is also set to `false`. Not using the default means not
   * following WAI-ARIA authoring practices. Please be considerate about possible
   * accessibility implications.
   * @default false
   */
  disableAutoFocusItem: n.bool,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`, `"tabKeyDown"`.
   */
  onClose: n.func,
  /**
   * If `true`, the component is shown.
   */
  open: n.bool.isRequired,
  /**
   * `classes` prop applied to the [`Popover`](https://mui.com/material-ui/api/popover/) element.
   */
  PopoverClasses: n.object,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: n.shape({
    backdrop: n.oneOfType([n.func, n.object]),
    list: n.oneOfType([n.func, n.object]),
    paper: n.oneOfType([n.func, n.object]),
    root: n.oneOfType([n.func, n.object]),
    transition: n.oneOfType([n.func, n.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: n.shape({
    backdrop: n.elementType,
    list: n.elementType,
    paper: n.elementType,
    root: n.elementType,
    transition: n.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  /**
   * The length of the transition in `ms`, or 'auto'
   * @default 'auto'
   */
  transitionDuration: n.oneOfType([n.oneOf(["auto"]), n.number, n.shape({
    appear: n.number,
    enter: n.number,
    exit: n.number
  })]),
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus.
   * @default 'selectedMenu'
   */
  variant: n.oneOf(["menu", "selectedMenu"])
});
function Yx(e) {
  return Se("MuiNativeSelect", e);
}
const Nl = we("MuiNativeSelect", ["root", "select", "multiple", "filled", "outlined", "standard", "disabled", "icon", "iconOpen", "iconFilled", "iconOutlined", "iconStandard", "nativeInput", "error"]), Xx = (e) => {
  const {
    classes: t,
    variant: o,
    disabled: r,
    multiple: i,
    open: s,
    error: a
  } = e, c = {
    select: ["select", o, r && "disabled", i && "multiple", a && "error"],
    icon: ["icon", `icon${Ce(o)}`, s && "iconOpen", r && "disabled"]
  };
  return Te(c, Yx, t);
}, nf = J("select", {
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
  [`&.${Nl.disabled}`]: {
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
})), Jx = J(nf, {
  name: "MuiNativeSelect",
  slot: "Select",
  shouldForwardProp: Qt,
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [t.select, t[o.variant], o.error && t.error, {
      [`&.${Nl.multiple}`]: t.multiple
    }];
  }
})({}), of = J("svg", {
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
  [`&.${Nl.disabled}`]: {
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
})), Qx = J(of, {
  name: "MuiNativeSelect",
  slot: "Icon",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [t.icon, o.variant && t[`icon${Ce(o.variant)}`], o.open && t.iconOpen];
  }
})({}), rf = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const {
    className: r,
    disabled: i,
    error: s,
    IconComponent: a,
    inputRef: c,
    variant: d = "standard",
    ...p
  } = t, m = {
    ...t,
    disabled: i,
    variant: d,
    error: s
  }, y = Xx(m);
  return /* @__PURE__ */ T(b.Fragment, {
    children: [/* @__PURE__ */ l(Jx, {
      ownerState: m,
      className: de(y.select, r),
      disabled: i,
      ref: c || o,
      ...p
    }), t.multiple ? null : /* @__PURE__ */ l(Qx, {
      as: a,
      ownerState: m,
      className: y.icon
    })]
  });
});
process.env.NODE_ENV !== "production" && (rf.propTypes = {
  /**
   * The option elements to populate the select with.
   * Can be some `<option>` elements.
   */
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * The CSS class name of the select element.
   */
  className: n.string,
  /**
   * If `true`, the select is disabled.
   */
  disabled: n.bool,
  /**
   * If `true`, the `select input` will indicate an error.
   */
  error: n.bool,
  /**
   * The icon that displays the arrow.
   */
  IconComponent: n.elementType.isRequired,
  /**
   * Use that prop to pass a ref to the native select element.
   * @deprecated
   */
  inputRef: bn,
  /**
   * @ignore
   */
  multiple: n.bool,
  /**
   * Name attribute of the `select` or hidden `input` element.
   */
  name: n.string,
  /**
   * Callback fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: n.func,
  /**
   * The input value.
   */
  value: n.any,
  /**
   * The variant to use.
   */
  variant: n.oneOf(["standard", "outlined", "filled"])
});
function sf(e) {
  return Se("MuiSelect", e);
}
const Er = we("MuiSelect", ["root", "select", "multiple", "filled", "outlined", "standard", "disabled", "focused", "icon", "iconOpen", "nativeInput", "error"]);
var Md;
const Ni = 2, Zx = 400, Ad = 200;
function _d(e, t) {
  var i;
  if (!t)
    return !1;
  if (e.composedPath().includes(t) || (i = e.target) != null && i.nodeType && t.contains(e.target))
    return !0;
  const r = t.getBoundingClientRect();
  return r.width === 0 && r.height === 0 ? !1 : e.clientX >= r.left - Ni && e.clientX <= r.right + Ni && e.clientY >= r.top - Ni && e.clientY <= r.bottom + Ni;
}
const e1 = J(nf, {
  name: "MuiSelect",
  slot: "Select",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [
      // Win specificity over the input base
      {
        [`&.${Er.select}`]: t.select
      },
      {
        [`&.${Er.select}`]: t[o.variant]
      },
      {
        [`&.${Er.error}`]: t.error
      },
      {
        [`&.${Er.multiple}`]: t.multiple
      }
    ];
  }
})({
  // Win specificity over the input base
  [`&.${Er.select}`]: {
    height: "auto",
    // Resets for multiple select with chips
    minHeight: "1.4375em",
    // Required for select\text-field height consistency
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
  }
}), t1 = J(of, {
  name: "MuiSelect",
  slot: "Icon",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [t.icon, o.open && t.iconOpen];
  }
})({}), n1 = J("input", {
  shouldForwardProp: (e) => dp(e) && e !== "classes",
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
}), o1 = (e) => {
  const {
    classes: t,
    variant: o,
    disabled: r,
    multiple: i,
    open: s,
    error: a
  } = e;
  return Te({
    select: ["select", o, r && "disabled", i && "multiple", a && "error"],
    icon: ["icon", s && "iconOpen", r && "disabled"],
    nativeInput: ["nativeInput"]
  }, sf, t);
}, af = /* @__PURE__ */ b.forwardRef(function(t, o) {
  var Le, ft, Gt, sn;
  const {
    "aria-describedby": r,
    "aria-label": i,
    autoFocus: s,
    autoWidth: a,
    children: c,
    className: d,
    defaultOpen: p,
    defaultValue: m,
    disabled: y,
    displayEmpty: x,
    error: f = !1,
    IconComponent: v,
    inputRef: h,
    labelId: w,
    MenuProps: O = {},
    multiple: k,
    name: E,
    onBlur: C,
    onChange: S,
    onClose: N,
    onFocus: A,
    // eslint-disable-next-line react/prop-types
    onKeyDown: _,
    // eslint-disable-next-line react/prop-types
    onMouseDown: D,
    onOpen: F,
    open: P,
    readOnly: g,
    renderValue: $,
    required: I,
    SelectDisplayProps: M = {},
    tabIndex: B,
    // catching `type` from Input which makes no sense for SelectInput
    type: W,
    value: G,
    variant: oe = "standard",
    ...z
  } = t, [V, Y] = os({
    controlled: G,
    default: m,
    name: "Select"
  }), [ne, te] = os({
    controlled: P,
    default: p,
    name: "Select"
  }), re = b.useRef(null), ee = b.useRef(null), K = b.useRef(null), U = b.useRef(!1), X = b.useRef(!1), Z = b.useRef(null), ae = b.useRef(!1), j = b.useRef({
    allowSelectedMouseUp: !1,
    allowUnselectedMouseUp: !1
  }), me = Qn(), Q = Qn(), [fe, Ie] = b.useState(null), {
    current: xe
  } = b.useRef(P != null), [Be, ye] = b.useState(), [Ge, Me] = b.useState(null), Fe = gt(o, h), rt = b.useCallback((ie) => {
    ee.current = ie, ie && Ie(ie);
  }, []), ke = fe == null ? void 0 : fe.parentNode;
  b.useImperativeHandle(Fe, () => ({
    focus: () => {
      ee.current.focus();
    },
    node: re.current,
    value: V
  }), [V]);
  const Ue = fe !== null && ne;
  Nt(() => {
    U.current = Ue;
  }, [Ue]);
  const ut = b.useCallback(() => {
    me.clear(), Q.clear();
  }, [me, Q]), De = b.useCallback(() => {
    ut(), ae.current = !1, j.current = {
      allowSelectedMouseUp: !1,
      allowUnselectedMouseUp: !1
    };
  }, [ut]), tt = b.useCallback(() => {
    Z.current && (Z.current(), Z.current = null);
  }, []);
  b.useEffect(() => {
    Ue || (De(), tt());
  }, [Ue, De, tt]), b.useEffect(() => () => {
    De(), tt();
  }, [De, tt]), b.useEffect(() => {
    if (!Ue || !ke || a || typeof ResizeObserver > "u")
      return;
    const ie = new ResizeObserver(() => {
      ye(ke.clientWidth);
    });
    return ie.observe(ke), () => {
      ie.disconnect();
    };
  }, [Ue, ke, a]), b.useEffect(() => {
    p && ne && fe && !xe && (ye(a ? null : ke.clientWidth), ee.current.focus());
  }, [fe, a]), b.useEffect(() => {
    s && ee.current.focus();
  }, [s]), b.useEffect(() => {
    if (!w)
      return;
    const ie = kt(ee.current).getElementById(w);
    if (ie) {
      const Re = () => {
        getSelection().isCollapsed && ee.current.focus();
      };
      return ie.addEventListener("click", Re), () => {
        ie.removeEventListener("click", Re);
      };
    }
  }, [w]);
  const We = It((ie, Re) => {
    ie || (De(), tt()), ie ? (Me(Tx(Re)), F && F(Re)) : (Me(null), N && N(Re)), xe || (U.current = ie, ye(a ? null : ke.clientWidth), te(ie));
  }), ue = () => {
    De(), X.current ? Q.start(Ad, () => {
      j.current.allowUnselectedMouseUp = !0, me.start(Ad, () => {
        j.current.allowSelectedMouseUp = !0;
      });
    }) : me.start(Zx, () => {
      j.current.allowSelectedMouseUp = !0, j.current.allowUnselectedMouseUp = !0;
    });
  }, Ae = (ie) => {
    if (D == null || D(ie), ie.button !== 0)
      return;
    ie.preventDefault(), ee.current.focus();
    const Re = kt(ie.currentTarget);
    ue(), tt();
    const Ve = (wt) => {
      Z.current = null, ee.current && (_d(wt, ee.current) || _d(wt, K.current) || !U.current && xe || We(!1, wt));
    };
    Re.addEventListener("mouseup", Ve, {
      capture: !0,
      once: !0
    }), Z.current = () => {
      Re.removeEventListener("mouseup", Ve, !0);
    }, We(!0, ie);
  }, ze = (ie) => {
    We(!1, ie);
  }, pt = b.Children.toArray(c), $e = (ie) => {
    const Re = pt.find((Ve) => Ve.props.value === ie.target.value);
    Re !== void 0 && (Y(Re.props.value), S && S(ie, Re));
  }, $t = (ie) => (Re) => {
    ae.current = !1;
    let Ve;
    if (Re.currentTarget.hasAttribute("tabindex")) {
      if (k) {
        Ve = Array.isArray(V) ? V.slice() : [];
        const wt = V.indexOf(ie.props.value);
        wt === -1 ? Ve.push(ie.props.value) : Ve.splice(wt, 1);
      } else
        Ve = ie.props.value;
      if (ie.props.onClick && ie.props.onClick(Re), V !== Ve && (Y(Ve), S)) {
        const wt = Re.nativeEvent || Re, an = new wt.constructor(wt.type, wt);
        Object.defineProperty(an, "target", {
          writable: !0,
          value: {
            value: Ve,
            name: E
          }
        }), S(an, ie);
      }
      k || We(!1, Re);
    }
  }, Hn = (ie, Re) => (Ve) => {
    var ui, pi;
    if ((pi = (ui = ie.props).onMouseUp) == null || pi.call(ui, Ve), ae.current) {
      ae.current = !1;
      return;
    }
    const wt = !j.current.allowSelectedMouseUp && Re, an = !j.current.allowUnselectedMouseUp && !Re;
    wt || an || Ve.currentTarget.click();
  }, ro = (ie) => {
    g || ([
      " ",
      "ArrowUp",
      "ArrowDown",
      // The native select doesn't respond to enter on macOS, but it's recommended by
      // https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
      "Enter"
    ].includes(ie.key) && (ie.preventDefault(), We(!0, ie)), _ == null || _(ie));
  }, yn = (ie) => {
    !Ue && C && (Object.defineProperty(ie, "target", {
      writable: !0,
      value: {
        value: V,
        name: E
      }
    }), C(ie));
  };
  delete z["aria-invalid"];
  let he, He;
  const Ct = [];
  let Zt = !1, Mt = !1;
  (ds({
    value: V
  }) || x) && ($ ? he = $(V) : Zt = !0);
  const Nn = pt.map((ie) => {
    if (!/* @__PURE__ */ b.isValidElement(ie))
      return null;
    process.env.NODE_ENV !== "production" && Eo.isFragment(ie) && console.error(["MUI: The Select component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`));
    let Re;
    if (k) {
      if (!Array.isArray(V))
        throw new Error(process.env.NODE_ENV !== "production" ? "MUI: The `value` prop must be an array when using the `Select` component with `multiple`." : eo(2));
      Re = V.some((Ve) => kd(Ve, ie.props.value)), Re && Zt && Ct.push(ie.props.children);
    } else
      Re = kd(V, ie.props.value), Re && Zt && (He = ie.props.children);
    return Re && (Mt = !0), /* @__PURE__ */ b.cloneElement(ie, {
      "aria-selected": Re ? "true" : "false",
      onMouseDown: (Ve) => {
        var wt, an;
        ae.current = !0, (an = (wt = ie.props).onMouseDown) == null || an.call(wt, Ve);
      },
      onPointerDown: (Ve) => {
        var wt, an;
        ae.current = !0, (an = (wt = ie.props).onPointerDown) == null || an.call(wt, Ve);
      },
      onClick: $t(ie),
      onMouseUp: Hn(ie, Re),
      onKeyUp: (Ve) => {
        Ve.key === " " && Ve.preventDefault(), ie.props.onKeyUp && ie.props.onKeyUp(Ve);
      },
      role: "option",
      selected: Re,
      value: void 0,
      // The value is most likely not a valid HTML attribute.
      "data-value": ie.props.value
      // Instead, we provide it as a data attribute.
    });
  });
  Nt(() => {
    X.current = Mt;
  }, [Mt]), process.env.NODE_ENV !== "production" && b.useEffect(() => {
    if (!Mt && !k && V !== "") {
      const ie = pt.map((Re) => Re.props.value);
      console.warn([`MUI: You have provided an out-of-range value \`${V}\` for the select ${E ? `(name="${E}") ` : ""}component.`, "Consider providing a value that matches one of the available options or ''.", `The available values are ${ie.filter((Re) => Re != null).map((Re) => `\`${Re}\``).join(", ") || '""'}.`].join(`
`));
    }
  }, [Mt, pt, k, E, V]), Zt && (k ? Ct.length === 0 ? he = null : he = Ct.reduce((ie, Re, Ve) => (ie.push(Re), Ve < Ct.length - 1 && ie.push(", "), ie), []) : he = He);
  let Po = Be;
  !a && xe && fe && (Po = ke.clientWidth);
  let kn;
  typeof B < "u" ? kn = B : kn = y ? null : 0;
  const Io = M.id || (E ? `mui-component-select-${E}` : void 0), Lt = {
    ...t,
    variant: oe,
    value: V,
    open: Ue,
    error: f
  }, Bt = o1(Lt), Ht = typeof ((Le = O.slotProps) == null ? void 0 : Le.paper) == "function" ? O.slotProps.paper(Lt) : (ft = O.slotProps) == null ? void 0 : ft.paper, Gn = gt(Ht == null ? void 0 : Ht.ref, K), le = typeof ((Gt = O.slotProps) == null ? void 0 : Gt.list) == "function" ? O.slotProps.list(Lt) : (sn = O.slotProps) == null ? void 0 : sn.list, ce = to(), Oe = to();
  return /* @__PURE__ */ T(b.Fragment, {
    children: [/* @__PURE__ */ l(e1, {
      as: "div",
      ref: rt,
      tabIndex: kn,
      role: "combobox",
      "aria-controls": Ue ? ce : void 0,
      "aria-disabled": y ? "true" : void 0,
      "aria-expanded": Ue ? "true" : "false",
      "aria-haspopup": "listbox",
      "aria-label": i,
      "aria-labelledby": w,
      "aria-describedby": r,
      "aria-required": I ? "true" : void 0,
      "aria-invalid": f ? "true" : void 0,
      onKeyDown: ro,
      onMouseDown: y || g ? null : Ae,
      onBlur: yn,
      onFocus: A,
      ...M,
      ownerState: Lt,
      className: de(M.className, Bt.select, d),
      id: Io,
      children: Ex(he) ? (
        // notranslate needed while Google Translate will not fix zero-width space issue
        Md || (Md = /* @__PURE__ */ l("span", {
          className: "notranslate",
          "aria-hidden": !0,
          children: "​"
        }))
      ) : he
    }), /* @__PURE__ */ l(n1, {
      "aria-invalid": f,
      value: Array.isArray(V) ? V.join(",") : V,
      name: E,
      ref: re,
      "aria-hidden": !0,
      onChange: $e,
      tabIndex: -1,
      disabled: y,
      className: Bt.nativeInput,
      autoFocus: s,
      required: I,
      ...z,
      id: z.id ?? Oe,
      ownerState: Lt
    }), /* @__PURE__ */ l(t1, {
      as: v,
      className: Bt.icon,
      ownerState: Lt
    }), /* @__PURE__ */ l(Ox, {
      value: Ge,
      children: /* @__PURE__ */ l(tf, {
        id: `menu-${E || ""}`,
        anchorEl: ke,
        open: Ue,
        onClose: ze,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center"
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "center"
        },
        ...O,
        slotProps: {
          ...O.slotProps,
          list: {
            "aria-labelledby": w,
            role: "listbox",
            "aria-multiselectable": k ? "true" : void 0,
            disableListWrap: !0,
            id: ce,
            ...le
          },
          paper: {
            ...Ht,
            ref: Gn,
            style: {
              minWidth: Po,
              ...Ht == null ? void 0 : Ht.style
            }
          }
        },
        children: Nn
      })
    })]
  });
});
process.env.NODE_ENV !== "production" && (af.propTypes = {
  /**
   * @ignore
   */
  "aria-describedby": n.string,
  /**
   * @ignore
   */
  "aria-label": n.string,
  /**
   * @ignore
   */
  autoFocus: n.bool,
  /**
   * If `true`, the width of the popover will automatically be set according to the items inside the
   * menu, otherwise it will be at least the width of the select input.
   */
  autoWidth: n.bool,
  /**
   * The option elements to populate the select with.
   * Can be some `<MenuItem>` elements.
   */
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * The CSS class name of the select element.
   */
  className: n.string,
  /**
   * If `true`, the component is toggled on mount. Use when the component open state is not controlled.
   * You can only use it when the `native` prop is `false` (default).
   */
  defaultOpen: n.bool,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: n.any,
  /**
   * If `true`, the select is disabled.
   */
  disabled: n.bool,
  /**
   * If `true`, the selected item is displayed even if its value is empty.
   */
  displayEmpty: n.bool,
  /**
   * If `true`, the `select input` will indicate an error.
   */
  error: n.bool,
  /**
   * The icon that displays the arrow.
   */
  IconComponent: n.elementType.isRequired,
  /**
   * Imperative handle implementing `{ value: T, node: HTMLElement, focus(): void }`
   * Equivalent to `ref`
   */
  inputRef: bn,
  /**
   * The ID of an element that acts as an additional label. The Select will
   * be labelled by the additional label and the selected value.
   */
  labelId: n.string,
  /**
   * Props applied to the [`Menu`](/material-ui/api/menu/) element.
   */
  MenuProps: n.object,
  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   */
  multiple: n.bool,
  /**
   * Name attribute of the `select` or hidden `input` element.
   */
  name: n.string,
  /**
   * @ignore
   */
  onBlur: n.func,
  /**
   * Callback fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * @param {object} [child] The react element that was selected.
   */
  onChange: n.func,
  /**
   * Callback fired when the component requests to be closed.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   */
  onClose: n.func,
  /**
   * @ignore
   */
  onFocus: n.func,
  /**
   * Callback fired when the component requests to be opened.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   */
  onOpen: n.func,
  /**
   * If `true`, the component is shown.
   */
  open: n.bool,
  /**
   * @ignore
   */
  readOnly: n.bool,
  /**
   * Render the selected value.
   *
   * @param {any} value The `value` provided to the component.
   * @returns {ReactNode}
   */
  renderValue: n.func,
  /**
   * If `true`, the component is required.
   */
  required: n.bool,
  /**
   * Props applied to the clickable div element.
   */
  SelectDisplayProps: n.object,
  /**
   * @ignore
   */
  tabIndex: n.oneOfType([n.number, n.string]),
  /**
   * @ignore
   */
  type: n.any,
  /**
   * The input value.
   */
  value: n.any,
  /**
   * The variant to use.
   */
  variant: n.oneOf(["standard", "outlined", "filled"])
});
const r1 = dt(/* @__PURE__ */ l("path", {
  d: "M7 10l5 5 5-5z"
}), "ArrowDropDown");
function ki(e) {
  return parseInt(e, 10) || 0;
}
const i1 = {
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
function s1(e) {
  for (const t in e)
    return !1;
  return !0;
}
function Dd(e) {
  return s1(e) || e.outerHeightStyle === 0 && !e.overflowing;
}
const lf = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const {
    onChange: r,
    maxRows: i,
    minRows: s = 1,
    style: a,
    value: c,
    ...d
  } = t, {
    current: p
  } = b.useRef(c != null), m = b.useRef(null), y = gt(o, m), x = b.useRef(null), f = b.useRef(null), v = b.useCallback(() => {
    const E = m.current, C = f.current;
    if (!E || !C)
      return;
    const N = En(E).getComputedStyle(E);
    if (N.width === "0px")
      return {
        outerHeightStyle: 0,
        overflowing: !1
      };
    C.style.width = N.width, C.value = E.value || t.placeholder || "x", C.value.slice(-1) === `
` && (C.value += " ");
    const A = N.boxSizing, _ = ki(N.paddingBottom) + ki(N.paddingTop), D = ki(N.borderBottomWidth) + ki(N.borderTopWidth), F = C.scrollHeight;
    C.value = "x";
    const P = C.scrollHeight;
    let g = F;
    s && (g = Math.max(Number(s) * P, g)), i && (g = Math.min(Number(i) * P, g)), g = Math.max(g, P);
    const $ = g + (A === "border-box" ? _ + D : 0), I = Math.abs(g - F) <= 1;
    return {
      outerHeightStyle: $,
      overflowing: I
    };
  }, [i, s, t.placeholder]), h = It(() => {
    const E = m.current, C = v();
    if (!E || !C || Dd(C))
      return !1;
    const S = C.outerHeightStyle;
    return x.current != null && x.current !== S;
  }), w = b.useCallback(() => {
    const E = m.current, C = v();
    if (!E || !C || Dd(C))
      return;
    const S = C.outerHeightStyle;
    x.current !== S && (x.current = S, E.style.height = `${S}px`), E.style.overflow = C.overflowing ? "hidden" : "";
  }, [v]), O = b.useRef(-1);
  Nt(() => {
    const E = Fs(w), C = m == null ? void 0 : m.current;
    if (!C)
      return;
    const S = En(C);
    S.addEventListener("resize", E);
    let N;
    return typeof ResizeObserver < "u" && (N = new ResizeObserver(() => {
      h() && (N.unobserve(C), cancelAnimationFrame(O.current), w(), O.current = requestAnimationFrame(() => {
        N.observe(C);
      }));
    }), N.observe(C)), () => {
      E.clear(), cancelAnimationFrame(O.current), S.removeEventListener("resize", E), N && N.disconnect();
    };
  }, [v, w, h]), Nt(() => {
    w();
  });
  const k = (E) => {
    p || w();
    const C = E.target, S = C.value.length, N = C.value.endsWith(`
`), A = C.selectionStart === S;
    N && A && C.setSelectionRange(S, S), r && r(E);
  };
  return /* @__PURE__ */ T(b.Fragment, {
    children: [/* @__PURE__ */ l("textarea", {
      value: c,
      onChange: k,
      ref: y,
      rows: s,
      style: a,
      ...d
    }), /* @__PURE__ */ l("textarea", {
      "aria-hidden": !0,
      className: t.className,
      readOnly: !0,
      ref: f,
      tabIndex: -1,
      style: {
        ...i1.shadow,
        ...a,
        paddingTop: 0,
        paddingBottom: 0
      }
    })]
  });
});
process.env.NODE_ENV !== "production" && (lf.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  className: n.string,
  /**
   * Maximum number of rows to display.
   */
  maxRows: n.oneOfType([n.number, n.string]),
  /**
   * Minimum number of rows to display.
   * @default 1
   */
  minRows: n.oneOfType([n.number, n.string]),
  /**
   * @ignore
   */
  onChange: n.func,
  /**
   * @ignore
   */
  placeholder: n.string,
  /**
   * @ignore
   */
  style: n.object,
  /**
   * @ignore
   */
  value: n.oneOfType([n.arrayOf(n.string), n.number, n.string])
});
function a1(e) {
  return Se("MuiInputBase", e);
}
const rr = we("MuiInputBase", ["root", "formControl", "focused", "disabled", "adornedStart", "adornedEnd", "error", "sizeSmall", "multiline", "colorSecondary", "fullWidth", "hiddenLabel", "readOnly", "input", "inputTypeSearch"]);
var Ld;
const Ua = "mui-auto-fill", ps = "mui-auto-fill-cancel", zs = (e, t) => {
  const {
    ownerState: o
  } = e;
  return [t.root, o.formControl && t.formControl, o.startAdornment && t.adornedStart, o.endAdornment && t.adornedEnd, o.error && t.error, o.size === "small" && t.sizeSmall, o.multiline && t.multiline, o.color && t[`color${Ce(o.color)}`], o.fullWidth && t.fullWidth, o.hiddenLabel && t.hiddenLabel];
}, Vs = (e, t) => {
  const {
    ownerState: o
  } = e;
  return [t.input, o.type === "search" && t.inputTypeSearch];
}, l1 = (e) => {
  const {
    classes: t,
    color: o,
    disabled: r,
    error: i,
    endAdornment: s,
    focused: a,
    formControl: c,
    fullWidth: d,
    hiddenLabel: p,
    multiline: m,
    readOnly: y,
    size: x,
    startAdornment: f,
    type: v
  } = e, h = {
    root: ["root", `color${Ce(o)}`, r && "disabled", i && "error", d && "fullWidth", a && "focused", c && "formControl", x && x !== "medium" && `size${Ce(x)}`, m && "multiline", f && "adornedStart", s && "adornedEnd", p && "hiddenLabel", y && "readOnly"],
    input: ["input", r && "disabled", v === "search" && "inputTypeSearch", y && "readOnly"]
  };
  return Te(h, a1, t);
}, Us = J("div", {
  name: "MuiInputBase",
  slot: "Root",
  overridesResolver: zs
})(Pe(({
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
      size: o
    }) => t.multiline && o === "small",
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
}))), Hs = J("input", {
  name: "MuiInputBase",
  slot: "Input",
  overridesResolver: Vs
})(Pe(({
  theme: e
}) => {
  const t = e.palette.mode === "light", o = {
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
    "&::-webkit-input-placeholder": o,
    "&::-moz-placeholder": o,
    // Firefox 19+
    "&::-ms-input-placeholder": o,
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
        animationName: ps,
        animationDuration: "10ms",
        "&:-webkit-autofill": {
          animationDuration: "5000s",
          animationName: Ua
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
})), Bd = gl({
  // Keep keyframes non-empty for Emotion production builds. Animation properties are ignored
  // inside keyframes, avoiding the visible display animation triggered by Chrome 117+.
  [`@keyframes ${Ua}`]: {
    from: {
      animationName: Ua
    }
  },
  [`@keyframes ${ps}`]: {
    from: {
      animationName: ps
    }
  }
}), Gs = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiInputBase"
  }), {
    "aria-describedby": i,
    "aria-label": s,
    autoComplete: a,
    autoFocus: c,
    className: d,
    color: p,
    defaultValue: m,
    disabled: y,
    disableInjectingGlobalStyles: x,
    endAdornment: f,
    error: v,
    fullWidth: h = !1,
    id: w,
    inputComponent: O = "input",
    inputProps: k = {},
    inputRef: E,
    margin: C,
    maxRows: S,
    minRows: N,
    multiline: A = !1,
    name: _,
    onBlur: D,
    onChange: F,
    onClick: P,
    onFocus: g,
    onKeyDown: $,
    onKeyUp: I,
    placeholder: M,
    readOnly: B,
    renderSuffix: W,
    rows: G,
    size: oe,
    slotProps: z = {},
    slots: V = {},
    startAdornment: Y,
    type: ne = "text",
    value: te,
    ...re
  } = r, ee = k.value != null ? k.value : te, {
    current: K
  } = b.useRef(ee != null), U = b.useRef(), X = b.useCallback((ue) => {
    process.env.NODE_ENV !== "production" && ue && ue.nodeName !== "INPUT" && !ue.focus && console.error(["MUI: You have provided a `inputComponent` to the input component", "that does not correctly handle the `ref` prop.", "Make sure the `ref` prop is called with a HTMLInputElement."].join(`
`));
  }, []), Z = gt(U, E, k.ref, X), [ae, j] = b.useState(!1), [me, Q] = hr({
    props: r,
    states: ["color", "disabled", "error", "hiddenLabel", "size", "required", "filled"]
  });
  process.env.NODE_ENV !== "production" && b.useEffect(() => {
    if (Q)
      return Q.registerEffect();
  }, [Q]), me.focused = Q ? Q.focused : ae, b.useEffect(() => {
    !Q && y && ae && (j(!1), D && D());
  }, [Q, y, ae, D]);
  const fe = Q && Q.onFilled, Ie = Q && Q.onEmpty, xe = b.useCallback((ue) => {
    ds(ue) ? fe && fe() : Ie && Ie();
  }, [fe, Ie]);
  Nt(() => {
    K && xe({
      value: ee
    });
  }, [ee, xe, K]), Nt(() => {
    if (!c)
      return;
    const ue = U.current;
    if (!ue)
      return;
    const Ae = kt(ue), ze = Bn(Ae), pt = ze == null || ze === Ae.body || ze === Ae.documentElement;
    ue === ze ? Q && Q.onFocus ? Q.onFocus() : j(!0) : pt && ue.focus();
  }, [c]);
  const Be = (ue) => {
    g && g(ue), k.onFocus && k.onFocus(ue), Q && Q.onFocus ? Q.onFocus(ue) : j(!0);
  }, ye = (ue) => {
    D && D(ue), k.onBlur && k.onBlur(ue), Q && Q.onBlur ? Q.onBlur(ue) : j(!1);
  }, Ge = (ue, ...Ae) => {
    if (!K) {
      const ze = ue.target || U.current;
      if (ze == null)
        throw new Error(process.env.NODE_ENV !== "production" ? "MUI: Expected valid input target. Did you use a custom `inputComponent` and forget to forward refs? See https://mui.com/r/input-component-ref-interface for more info." : eo(1));
      xe({
        value: ze.value
      });
    }
    k.onChange && k.onChange(ue, ...Ae), F && F(ue, ...Ae);
  };
  b.useEffect(() => {
    xe(U.current);
  }, []);
  const Me = (ue) => {
    U.current && ue.currentTarget === ue.target && U.current.focus(), P && P(ue);
  };
  let Fe = O, rt = k;
  A && Fe === "input" && (G ? (process.env.NODE_ENV !== "production" && (N || S) && console.warn("MUI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set."), rt = {
    type: void 0,
    minRows: G,
    maxRows: G,
    ...rt
  }) : rt = {
    type: void 0,
    maxRows: S,
    minRows: N,
    ...rt
  }, Fe = lf);
  const ke = (ue) => {
    xe(ue.animationName === ps ? U.current : {
      value: "x"
    });
  };
  b.useEffect(() => {
    Q && Q.setAdornedStart(!!Y);
  }, [Q, Y]);
  const Ue = {
    ...r,
    color: me.color || "primary",
    disabled: me.disabled,
    endAdornment: f,
    error: me.error,
    focused: me.focused,
    formControl: Q,
    fullWidth: h,
    hiddenLabel: me.hiddenLabel,
    multiline: A,
    size: me.size,
    startAdornment: Y,
    type: ne
  }, ut = l1(Ue), De = V.root || Us, tt = z.root || {}, We = V.input || Hs;
  return rt = {
    ...rt,
    ...z.input
  }, /* @__PURE__ */ T(b.Fragment, {
    children: [!x && typeof Bd == "function" && // For Emotion/Styled-components, InputGlobalStyles will be a function
    // For Pigment CSS, this has no effect because the InputGlobalStyles will be null.
    (Ld || (Ld = /* @__PURE__ */ l(Bd, {}))), /* @__PURE__ */ T(De, {
      ...tt,
      ref: o,
      onClick: Me,
      ...re,
      ...!rs(De) && {
        ownerState: {
          ...Ue,
          ...tt.ownerState
        }
      },
      className: de(ut.root, tt.className, d, B && "MuiInputBase-readOnly"),
      children: [Y, /* @__PURE__ */ l(js.Provider, {
        value: null,
        children: /* @__PURE__ */ l(We, {
          "aria-invalid": me.error,
          "aria-describedby": i,
          "aria-label": s,
          autoComplete: a,
          autoFocus: c,
          defaultValue: m,
          disabled: me.disabled,
          id: w,
          onAnimationStart: ke,
          name: _,
          placeholder: M,
          readOnly: B,
          required: me.required,
          rows: G,
          value: ee,
          onKeyDown: $,
          onKeyUp: I,
          type: ne,
          ...rt,
          ...!rs(We) && {
            as: Fe,
            ownerState: {
              ...Ue,
              ...rt.ownerState
            }
          },
          ref: Z,
          className: de(ut.input, rt.className, B && "MuiInputBase-readOnly"),
          onBlur: ye,
          onChange: Ge,
          onFocus: Be
        })
      }), f, W ? W({
        ...me,
        startAdornment: Y
      }) : null]
    })]
  });
});
process.env.NODE_ENV !== "production" && (Gs.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  "aria-describedby": n.string,
  /**
   * @ignore
   */
  "aria-label": n.string,
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: n.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: n.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
   */
  color: n.oneOfType([n.oneOf(["primary", "secondary", "error", "info", "success", "warning"]), n.string]),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: n.any,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: n.bool,
  /**
   * If `true`, GlobalStyles for the auto-fill keyframes will not be injected/removed on mount/unmount. Make sure to inject them at the top of your application.
   * This option is intended to help with boosting the initial rendering performance if you are loading a big amount of Input components at once.
   * @default false
   */
  disableInjectingGlobalStyles: n.bool,
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment: n.node,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: n.bool,
  /**
   * If `true`, the `input` will take up the full width of its container.
   * @default false
   */
  fullWidth: n.bool,
  /**
   * The id of the `input` element.
   */
  id: n.string,
  /**
   * The component used for the `input` element.
   * Either a string to use a HTML element or a component.
   * @default 'input'
   */
  inputComponent: vl,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#attributes) applied to the `input` element.
   * @default {}
   */
  inputProps: n.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: bn,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
   */
  margin: n.oneOf(["dense", "none"]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: n.oneOfType([n.number, n.string]),
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: n.oneOfType([n.number, n.string]),
  /**
   * If `true`, a [TextareaAutosize](https://mui.com/material-ui/react-textarea-autosize/) element is rendered.
   * @default false
   */
  multiline: n.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: n.string,
  /**
   * Callback fired when the `input` is blurred.
   *
   * Notice that the first argument (event) might be undefined.
   */
  onBlur: n.func,
  /**
   * Callback fired when the value is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: n.func,
  /**
   * @ignore
   */
  onClick: n.func,
  /**
   * @ignore
   */
  onFocus: n.func,
  /**
   * Callback fired when the `input` doesn't satisfy its constraints.
   */
  onInvalid: n.func,
  /**
   * @ignore
   */
  onKeyDown: n.func,
  /**
   * @ignore
   */
  onKeyUp: n.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: n.string,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: n.bool,
  /**
   * @ignore
   */
  renderSuffix: n.func,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: n.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: n.oneOfType([n.number, n.string]),
  /**
   * The size of the component.
   */
  size: n.oneOfType([n.oneOf(["medium", "small"]), n.string]),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: n.shape({
    input: n.object,
    root: n.object
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: n.shape({
    input: n.elementType,
    root: n.elementType
  }),
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: n.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#input_types).
   * @default 'text'
   */
  type: n.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: n.any
});
function c1(e) {
  return Se("MuiInput", e);
}
const Or = {
  ...rr,
  ...we("MuiInput", ["root", "underline", "input"])
}, d1 = (e) => {
  const {
    classes: t,
    disableUnderline: o
  } = e, i = Te({
    root: ["root", !o && "underline"],
    input: ["input"]
  }, c1, t);
  return {
    ...t,
    // forward classes to the InputBase
    ...i
  };
}, u1 = J(Us, {
  shouldForwardProp: (e) => Qt(e) || e === "classes",
  name: "MuiInput",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [...zs(e, t), !o.disableUnderline && t.underline];
  }
})(Pe(({
  theme: e
}) => {
  let o = e.palette.mode === "light" ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)";
  return e.vars && (o = e.alpha(e.vars.palette.common.onBackground, e.vars.opacity.inputUnderline)), {
    position: "relative",
    variants: [{
      props: ({
        ownerState: r
      }) => r.formControl,
      style: {
        [`label + &, .${ax.root} + &`]: {
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
        [`&.${Or.focused}:after`]: {
          // translateX(0) is a workaround for Safari transform scale bug
          // See https://github.com/mui/material-ui/issues/31766
          transform: "scaleX(1) translateX(0)"
        },
        [`&.${Or.error}`]: {
          "&::before, &::after": {
            borderBottomColor: (e.vars || e).palette.error.main
          }
        },
        "&::before": {
          borderBottom: `1px solid ${o}`,
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
        [`&:hover:not(.${Or.disabled}, .${Or.error}):before`]: {
          borderBottom: `2px solid ${(e.vars || e).palette.text.primary}`,
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            borderBottom: `1px solid ${o}`
          }
        },
        [`&.${Or.disabled}:before`]: {
          borderBottomStyle: "dotted"
        }
      }
    }, ...Object.entries(e.palette).filter(Ut()).map(([r]) => ({
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
})), p1 = J(Hs, {
  name: "MuiInput",
  slot: "Input",
  overridesResolver: Vs
})({}), qs = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiInput"
  }), {
    disableUnderline: i = !1,
    fullWidth: s = !1,
    inputComponent: a = "input",
    multiline: c = !1,
    notched: d,
    // declare here to prevent spreading to DOM
    slotProps: p,
    slots: m = {},
    type: y = "text",
    ...x
  } = r, f = d1(r), h = {
    root: {
      ownerState: {
        disableUnderline: i
      }
    }
  }, w = p ? Dt(p, h) : h, O = m.root ?? u1, k = m.input ?? p1;
  return /* @__PURE__ */ l(Gs, {
    slots: {
      root: O,
      input: k
    },
    slotProps: w,
    fullWidth: s,
    inputComponent: a,
    multiline: c,
    ref: o,
    type: y,
    ...x,
    classes: f
  });
});
process.env.NODE_ENV !== "production" && (qs.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: n.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: n.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
   */
  color: n.oneOfType([n.oneOf(["primary", "secondary"]), n.string]),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: n.any,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: n.bool,
  /**
   * If `true`, the `input` will not have an underline.
   * @default false
   */
  disableUnderline: n.bool,
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment: n.node,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: n.bool,
  /**
   * If `true`, the `input` will take up the full width of its container.
   * @default false
   */
  fullWidth: n.bool,
  /**
   * The id of the `input` element.
   */
  id: n.string,
  /**
   * The component used for the `input` element.
   * Either a string to use a HTML element or a component.
   * @default 'input'
   */
  inputComponent: n.elementType,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#attributes) applied to the `input` element.
   * @default {}
   */
  inputProps: n.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: bn,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
   */
  margin: n.oneOf(["dense", "none"]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: n.oneOfType([n.number, n.string]),
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: n.oneOfType([n.number, n.string]),
  /**
   * If `true`, a [TextareaAutosize](https://mui.com/material-ui/react-textarea-autosize/) element is rendered.
   * @default false
   */
  multiline: n.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: n.string,
  /**
   * @internal
   */
  notched: n.bool,
  /**
   * Callback fired when the value is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: n.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: n.string,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: n.bool,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: n.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: n.oneOfType([n.number, n.string]),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: n.shape({
    input: n.object,
    root: n.object
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: n.shape({
    input: n.elementType,
    root: n.elementType
  }),
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: n.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#input_types).
   * @default 'text'
   */
  type: n.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: n.any
});
qs.muiName = "Input";
function f1(e) {
  return Se("MuiFilledInput", e);
}
const yo = {
  ...rr,
  ...we("MuiFilledInput", ["root", "underline", "input", "adornedStart", "adornedEnd", "sizeSmall", "multiline", "hiddenLabel"])
}, m1 = (e) => {
  const {
    classes: t,
    disableUnderline: o,
    startAdornment: r,
    endAdornment: i,
    size: s,
    hiddenLabel: a,
    multiline: c
  } = e, d = {
    root: ["root", !o && "underline", r && "adornedStart", i && "adornedEnd", s === "small" && `size${Ce(s)}`, a && "hiddenLabel", c && "multiline"],
    input: ["input"]
  }, p = Te(d, f1, t);
  return {
    ...t,
    // forward classes to the InputBase
    ...p
  };
}, h1 = J(Us, {
  shouldForwardProp: (e) => Qt(e) || e === "classes",
  name: "MuiFilledInput",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [...zs(e, t), !o.disableUnderline && t.underline];
  }
})(Pe(({
  theme: e
}) => {
  const t = e.palette.mode === "light", o = t ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)", r = t ? "rgba(0, 0, 0, 0.06)" : "rgba(255, 255, 255, 0.09)", i = t ? "rgba(0, 0, 0, 0.09)" : "rgba(255, 255, 255, 0.13)", s = t ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)";
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
    [`&.${yo.focused}`]: {
      backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : r
    },
    [`&.${yo.disabled}`]: {
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
        [`&.${yo.focused}:after`]: {
          // translateX(0) is a workaround for Safari transform scale bug
          // See https://github.com/mui/material-ui/issues/31766
          transform: "scaleX(1) translateX(0)"
        },
        [`&.${yo.error}`]: {
          "&::before, &::after": {
            borderBottomColor: (e.vars || e).palette.error.main
          }
        },
        "&::before": {
          borderBottom: `1px solid ${e.vars ? e.alpha(e.vars.palette.common.onBackground, e.vars.opacity.inputUnderline) : o}`,
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
        [`&:hover:not(.${yo.disabled}, .${yo.error}):before`]: {
          borderBottom: `1px solid ${(e.vars || e).palette.text.primary}`
        },
        [`&.${yo.disabled}:before`]: {
          borderBottomStyle: "dotted"
        }
      }
    }, ...Object.entries(e.palette).filter(Ut()).map(([a]) => {
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
})), g1 = J(Hs, {
  name: "MuiFilledInput",
  slot: "Input",
  overridesResolver: Vs
})(Pe(({
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
}))), Ks = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiFilledInput"
  }), {
    disableUnderline: i = !1,
    fullWidth: s = !1,
    hiddenLabel: a,
    // declare here to prevent spreading to DOM
    inputComponent: c = "input",
    multiline: d = !1,
    notched: p,
    // declare here to prevent spreading to DOM
    slotProps: m,
    slots: y = {},
    type: x = "text",
    ...f
  } = r, v = {
    ...r,
    disableUnderline: i,
    fullWidth: s,
    inputComponent: c,
    multiline: d,
    type: x
  }, h = m1(r), w = {
    root: {
      ownerState: v
    },
    input: {
      ownerState: v
    }
  }, O = m ? Dt(w, m) : w, k = y.root ?? h1, E = y.input ?? g1;
  return /* @__PURE__ */ l(Gs, {
    slots: {
      root: k,
      input: E
    },
    slotProps: O,
    fullWidth: s,
    inputComponent: c,
    multiline: d,
    ref: o,
    type: x,
    ...f,
    classes: h
  });
});
process.env.NODE_ENV !== "production" && (Ks.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: n.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: n.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
   */
  color: n.oneOfType([n.oneOf(["primary", "secondary"]), n.string]),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: n.any,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: n.bool,
  /**
   * If `true`, the input will not have an underline.
   * @default false
   */
  disableUnderline: n.bool,
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment: n.node,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: n.bool,
  /**
   * If `true`, the `input` will take up the full width of its container.
   * @default false
   */
  fullWidth: n.bool,
  /**
   * If `true`, the label is hidden.
   * This is used to increase density for a `FilledInput`.
   * Be sure to add `aria-label` to the `input` element.
   * @default false
   */
  hiddenLabel: n.bool,
  /**
   * The id of the `input` element.
   */
  id: n.string,
  /**
   * The component used for the `input` element.
   * Either a string to use a HTML element or a component.
   * @default 'input'
   */
  inputComponent: n.elementType,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#attributes) applied to the `input` element.
   * @default {}
   */
  inputProps: n.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: bn,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
   */
  margin: n.oneOf(["dense", "none"]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: n.oneOfType([n.number, n.string]),
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: n.oneOfType([n.number, n.string]),
  /**
   * If `true`, a [TextareaAutosize](https://mui.com/material-ui/react-textarea-autosize/) element is rendered.
   * @default false
   */
  multiline: n.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: n.string,
  /**
   * @internal
   */
  notched: n.bool,
  /**
   * Callback fired when the value is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: n.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: n.string,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: n.bool,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: n.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: n.oneOfType([n.number, n.string]),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: n.shape({
    input: n.object,
    root: n.object
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: n.shape({
    input: n.elementType,
    root: n.elementType
  }),
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: n.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#input_types).
   * @default 'text'
   */
  type: n.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: n.any
});
Ks.muiName = "Input";
var Fd;
const b1 = J("fieldset", {
  name: "MuiNotchedOutlined",
  shouldForwardProp: Qt
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
}), y1 = J("legend", {
  name: "MuiNotchedOutlined",
  shouldForwardProp: Qt
})(Pe(({
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
function cf(e) {
  const {
    children: t,
    classes: o,
    className: r,
    label: i,
    notched: s,
    ...a
  } = e, c = i != null && i !== "", d = {
    ...e,
    notched: s,
    withLabel: c
  };
  return /* @__PURE__ */ l(b1, {
    "aria-hidden": !0,
    className: r,
    ownerState: d,
    ...a,
    children: /* @__PURE__ */ l(y1, {
      ownerState: d,
      children: c ? /* @__PURE__ */ l("span", {
        children: i
      }) : (
        // notranslate needed while Google Translate will not fix zero-width space issue
        Fd || (Fd = /* @__PURE__ */ l("span", {
          className: "notranslate",
          "aria-hidden": !0,
          children: "​"
        }))
      )
    })
  });
}
process.env.NODE_ENV !== "production" && (cf.propTypes = {
  /**
   * The content of the component.
   */
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * The label.
   */
  label: n.node,
  /**
   * If `true`, the outline is notched to accommodate the label.
   */
  notched: n.bool.isRequired,
  /**
   * @ignore
   */
  style: n.object
});
function v1(e) {
  return Se("MuiOutlinedInput", e);
}
const In = {
  ...rr,
  ...we("MuiOutlinedInput", ["root", "notchedOutline", "input"])
}, x1 = (e) => {
  const {
    classes: t
  } = e, r = Te({
    root: ["root"],
    notchedOutline: ["notchedOutline"],
    input: ["input"]
  }, v1, t);
  return {
    ...t,
    // forward classes to the InputBase
    ...r
  };
}, S1 = J(Us, {
  shouldForwardProp: (e) => Qt(e) || e === "classes",
  name: "MuiOutlinedInput",
  slot: "Root",
  overridesResolver: zs
})(Pe(({
  theme: e
}) => {
  const t = e.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";
  return {
    position: "relative",
    borderRadius: (e.vars || e).shape.borderRadius,
    [`&:hover .${In.notchedOutline}`]: {
      borderColor: (e.vars || e).palette.text.primary
    },
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      [`&:hover .${In.notchedOutline}`]: {
        borderColor: e.vars ? e.alpha(e.vars.palette.common.onBackground, 0.23) : t
      }
    },
    [`&.${In.focused} .${In.notchedOutline}`]: {
      borderWidth: 2
    },
    variants: [...Object.entries(e.palette).filter(Ut()).map(([o]) => ({
      props: {
        color: o
      },
      style: {
        [`&.${In.focused} .${In.notchedOutline}`]: {
          borderColor: (e.vars || e).palette[o].main
        }
      }
    })), {
      props: {},
      // to override the above style
      style: {
        [`&.${In.error} .${In.notchedOutline}`]: {
          borderColor: (e.vars || e).palette.error.main
        },
        [`&.${In.disabled} .${In.notchedOutline}`]: {
          borderColor: (e.vars || e).palette.action.disabled
        }
      }
    }, {
      props: ({
        ownerState: o
      }) => o.startAdornment,
      style: {
        paddingLeft: 14
      }
    }, {
      props: ({
        ownerState: o
      }) => o.endAdornment,
      style: {
        paddingRight: 14
      }
    }, {
      props: ({
        ownerState: o
      }) => o.multiline,
      style: {
        padding: "16.5px 14px"
      }
    }, {
      props: ({
        ownerState: o,
        size: r
      }) => o.multiline && r === "small",
      style: {
        padding: "8.5px 14px"
      }
    }]
  };
})), C1 = J(cf, {
  name: "MuiOutlinedInput",
  slot: "NotchedOutline"
})(Pe(({
  theme: e
}) => {
  const t = e.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";
  return {
    borderColor: e.vars ? e.alpha(e.vars.palette.common.onBackground, 0.23) : t
  };
})), w1 = J(Hs, {
  name: "MuiOutlinedInput",
  slot: "Input",
  overridesResolver: Vs
})(Pe(({
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
}))), Ys = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiOutlinedInput"
  }), {
    fullWidth: i = !1,
    inputComponent: s = "input",
    label: a,
    multiline: c = !1,
    notched: d,
    slots: p = {},
    slotProps: m = {},
    type: y = "text",
    ...x
  } = r, f = x1(r), [v, h] = hr({
    props: r,
    states: ["color", "disabled", "error", "focused", "hiddenLabel", "size", "required"]
  }), w = {
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
  }, O = p.root ?? S1, k = p.input ?? w1, [E, C] = be("notchedOutline", {
    elementType: C1,
    className: f.notchedOutline,
    shouldForwardComponentProp: !0,
    ownerState: w,
    externalForwardedProps: {
      slots: p,
      slotProps: m
    },
    additionalProps: {
      label: a != null && a !== "" && v.required ? /* @__PURE__ */ T(b.Fragment, {
        children: [a, " ", "*"]
      }) : a
    }
  });
  return /* @__PURE__ */ l(Gs, {
    slots: {
      root: O,
      input: k
    },
    slotProps: m,
    renderSuffix: (S) => /* @__PURE__ */ l(E, {
      ...C,
      notched: typeof d < "u" ? d : !!(S.startAdornment || S.filled || S.focused)
    }),
    fullWidth: i,
    inputComponent: s,
    multiline: c,
    ref: o,
    type: y,
    ...x,
    classes: {
      ...f,
      notchedOutline: null
    }
  });
});
process.env.NODE_ENV !== "production" && (Ys.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: n.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: n.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
   */
  color: n.oneOfType([n.oneOf(["primary", "secondary"]), n.string]),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: n.any,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: n.bool,
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment: n.node,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: n.bool,
  /**
   * If `true`, the `input` will take up the full width of its container.
   * @default false
   */
  fullWidth: n.bool,
  /**
   * The id of the `input` element.
   */
  id: n.string,
  /**
   * The component used for the `input` element.
   * Either a string to use a HTML element or a component.
   * @default 'input'
   */
  inputComponent: n.elementType,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#attributes) applied to the `input` element.
   * @default {}
   */
  inputProps: n.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: bn,
  /**
   * The label of the `input`. It is only used for layout. The actual labelling
   * is handled by `InputLabel`.
   */
  label: n.node,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
   */
  margin: n.oneOf(["dense", "none"]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: n.oneOfType([n.number, n.string]),
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: n.oneOfType([n.number, n.string]),
  /**
   * If `true`, a [TextareaAutosize](https://mui.com/material-ui/react-textarea-autosize/) element is rendered.
   * @default false
   */
  multiline: n.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: n.string,
  /**
   * If `true`, the outline is notched to accommodate the label.
   */
  notched: n.bool,
  /**
   * Callback fired when the value is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: n.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: n.string,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: n.bool,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: n.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: n.oneOfType([n.number, n.string]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: n.shape({
    input: n.object,
    notchedOutline: n.oneOfType([n.func, n.object]),
    root: n.object
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: n.shape({
    input: n.elementType,
    notchedOutline: n.elementType,
    root: n.elementType
  }),
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: n.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#input_types).
   * @default 'text'
   */
  type: n.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: n.any
});
Ys.muiName = "Input";
const T1 = (e) => {
  const {
    classes: t
  } = e, r = Te({
    root: ["root"]
  }, sf, t);
  return {
    ...t,
    ...r
  };
}, kl = {
  name: "MuiSelect",
  slot: "Root",
  shouldForwardProp: (e) => Qt(e) && e !== "variant"
}, E1 = J(qs, kl)(""), O1 = J(Ys, kl)(""), R1 = J(Ks, kl)(""), Tn = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    name: "MuiSelect",
    props: t
  }), {
    autoWidth: i = !1,
    children: s,
    classes: a = {},
    className: c,
    defaultOpen: d = !1,
    displayEmpty: p = !1,
    IconComponent: m = r1,
    id: y,
    input: x,
    inputProps: f,
    label: v,
    labelId: h,
    MenuProps: w,
    multiple: O = !1,
    native: k = !1,
    onClose: E,
    onOpen: C,
    open: S,
    renderValue: N,
    SelectDisplayProps: A,
    variant: _ = "outlined",
    ...D
  } = r, F = k ? rf : af, [P] = hr({
    props: r,
    states: ["variant", "error"]
  }), g = P.variant || _, $ = {
    ...r,
    variant: g,
    classes: a
  }, I = T1($), {
    root: M,
    ...B
  } = I, W = x || {
    standard: /* @__PURE__ */ l(E1, {
      ownerState: $
    }),
    outlined: /* @__PURE__ */ l(O1, {
      label: v,
      ownerState: $
    }),
    filled: /* @__PURE__ */ l(R1, {
      ownerState: $
    })
  }[g], G = gt(o, mr(W));
  return /* @__PURE__ */ l(b.Fragment, {
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
        multiple: O,
        ...k ? {
          id: y
        } : {
          autoWidth: i,
          defaultOpen: d,
          displayEmpty: p,
          labelId: h,
          MenuProps: w,
          onClose: E,
          onOpen: C,
          open: S,
          renderValue: N,
          SelectDisplayProps: {
            id: y,
            ...A
          }
        },
        ...f,
        classes: f ? Dt(B, f.classes) : B,
        ...x ? x.props.inputProps : {}
      },
      ...(O && k || p) && g === "outlined" ? {
        notched: !0
      } : {},
      ref: G,
      className: de(W.props.className, c, I.root),
      // If a custom input is provided via 'input' prop, do not allow 'variant' to be propagated to it's root element. See https://github.com/mui/material-ui/issues/33894.
      ...!x && {
        variant: g
      },
      ...D
    })
  });
});
process.env.NODE_ENV !== "production" && (Tn.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the width of the popover will automatically be set according to the items inside the
   * menu, otherwise it will be at least the width of the select input.
   * @default false
   */
  autoWidth: n.bool,
  /**
   * The option elements to populate the select with.
   * Can be some `MenuItem` when `native` is false and `option` when `native` is true.
   *
   * ⚠️The `MenuItem` elements **must** be direct descendants when `native` is false.
   */
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   * @default {}
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * If `true`, the component is initially open. Use when the component open state is not controlled (i.e. the `open` prop is not defined).
   * You can only use it when the `native` prop is `false` (default).
   * @default false
   */
  defaultOpen: n.bool,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: n.any,
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
  displayEmpty: n.bool,
  /**
   * The icon that displays the arrow.
   * @default ArrowDropDownIcon
   */
  IconComponent: n.elementType,
  /**
   * The `id` of the wrapper element or the `select` element when `native`.
   */
  id: n.string,
  /**
   * An `Input` element; does not have to be a material-ui specific `Input`.
   */
  input: n.element,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#attributes) applied to the `input` element.
   * When `native` is `true`, the attributes are applied on the `select` element.
   */
  inputProps: n.object,
  /**
   * See [OutlinedInput#label](https://mui.com/material-ui/api/outlined-input/#props)
   */
  label: n.node,
  /**
   * The ID of an element that acts as an additional label. The Select will
   * be labelled by the additional label and the selected value.
   */
  labelId: n.string,
  /**
   * Props applied to the [`Menu`](https://mui.com/material-ui/api/menu/) element.
   */
  MenuProps: n.object,
  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   * @default false
   */
  multiple: n.bool,
  /**
   * If `true`, the component uses a native `select` element.
   * @default false
   */
  native: n.bool,
  /**
   * Callback fired when a menu item is selected.
   *
   * @param {SelectChangeEvent<Value>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * **Warning**: This is a generic event, not a change event, unless the change event is caused by browser autofill.
   * @param {object} [child] The react element that was selected when `native` is `false` (default).
   */
  onChange: n.func,
  /**
   * Callback fired when the component requests to be closed.
   * Use it in either controlled (see the `open` prop), or uncontrolled mode (to detect when the Select collapses).
   *
   * @param {object} event The event source of the callback.
   */
  onClose: n.func,
  /**
   * Callback fired when the component requests to be opened.
   * Use it in either controlled (see the `open` prop), or uncontrolled mode (to detect when the Select expands).
   *
   * @param {object} event The event source of the callback.
   */
  onOpen: n.func,
  /**
   * If `true`, the component is shown.
   * You can only use it when the `native` prop is `false` (default).
   */
  open: n.bool,
  /**
   * Render the selected value.
   * You can only use it when the `native` prop is `false` (default).
   *
   * @param {any} value The `value` provided to the component.
   * @returns {ReactNode}
   */
  renderValue: n.func,
  /**
   * Props applied to the clickable div element.
   */
  SelectDisplayProps: n.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  /**
   * The `input` value. Providing an empty string will select no options.
   * Set to an empty string `''` if you don't want any of the available options to be selected.
   *
   * If the value is an object it must have reference equality with the option in order to be selected.
   * If the value is not an object, the string representation must match with the string representation of the option in order to be selected.
   */
  value: n.oneOfType([n.oneOf([""]), n.any]),
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: n.oneOf(["filled", "outlined", "standard"])
});
Tn.muiName = "Select";
const pe = jb({
  createStyledComponent: J("div", {
    name: "MuiStack",
    slot: "Root"
  }),
  useThemeProps: (e) => Ee({
    props: e,
    name: "MuiStack"
  })
});
process.env.NODE_ENV !== "production" && (pe.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: n.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: n.elementType,
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'column'
   */
  direction: n.oneOfType([n.oneOf(["column-reverse", "column", "row-reverse", "row"]), n.arrayOf(n.oneOf(["column-reverse", "column", "row-reverse", "row"])), n.object]),
  /**
   * Add an element between each child.
   */
  divider: n.node,
  /**
   * Defines the space between immediate children.
   * @default 0
   */
  spacing: n.oneOfType([n.arrayOf(n.oneOfType([n.number, n.string])), n.number, n.object, n.string]),
  /**
   * The system prop, which allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  /**
   * If `true`, the CSS flexbox `gap` is used instead of applying `margin` to children.
   *
   * While CSS `gap` removes the [known limitations](https://mui.com/joy-ui/react-stack/#limitations),
   * it is not fully supported in some browsers. We recommend checking https://caniuse.com/?search=flex%20gap before using this flag.
   *
   * To enable this flag globally, follow the [theme's default props](https://mui.com/material-ui/customization/theme-components/#default-props) configuration.
   * @default false
   */
  useFlexGap: n.bool
});
function N1(e) {
  return Se("MuiTextField", e);
}
we("MuiTextField", ["root"]);
const k1 = {
  standard: qs,
  filled: Ks,
  outlined: Ys
}, P1 = (e) => {
  const {
    classes: t
  } = e;
  return Te({
    root: ["root"]
  }, N1, t);
}, I1 = J(An, {
  name: "MuiTextField",
  slot: "Root"
})({}), Et = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiTextField"
  }), {
    autoComplete: i,
    autoFocus: s = !1,
    children: a,
    className: c,
    color: d = "primary",
    defaultValue: p,
    disabled: m = !1,
    error: y = !1,
    fullWidth: x = !1,
    helperText: f,
    id: v,
    inputRef: h,
    label: w,
    maxRows: O,
    minRows: k,
    multiline: E = !1,
    name: C,
    onBlur: S,
    onChange: N,
    onFocus: A,
    placeholder: _,
    required: D = !1,
    rows: F,
    select: P = !1,
    slots: g = {},
    slotProps: $ = {},
    type: I,
    value: M,
    variant: B = "outlined",
    ...W
  } = r, G = {
    ...r,
    autoFocus: s,
    color: d,
    disabled: m,
    error: y,
    fullWidth: x,
    multiline: E,
    required: D,
    select: P,
    variant: B
  }, oe = P1(G);
  process.env.NODE_ENV !== "production" && P && !a && console.error("MUI: `children` must be passed when using the `TextField` component with `select`.");
  const z = to(v), V = f && z ? `${z}-helper-text` : void 0, Y = w && z ? `${z}-label` : void 0, ne = k1[B], te = {
    slots: g,
    slotProps: $
  }, [re, ee] = be("select", {
    elementType: Tn,
    externalForwardedProps: te,
    ownerState: G
  }), K = P && ee.native, U = {}, X = te.slotProps.inputLabel;
  B === "outlined" && (X && typeof X.shrink < "u" && (U.notched = X.shrink), U.label = w), P && (K || (U.id = void 0), U["aria-describedby"] = void 0);
  const [Z, ae] = be("root", {
    elementType: I1,
    shouldForwardComponentProp: !0,
    externalForwardedProps: {
      ...te,
      ...W
    },
    ownerState: G,
    className: de(oe.root, c),
    ref: o,
    additionalProps: {
      disabled: m,
      error: y,
      fullWidth: x,
      required: D,
      color: d,
      variant: B
    }
  }), [j, me] = be("input", {
    elementType: ne,
    externalForwardedProps: te,
    additionalProps: U,
    ownerState: G
  }), [Q, fe] = be("inputLabel", {
    elementType: _n,
    externalForwardedProps: te,
    ownerState: G
  }), [Ie, xe] = be("htmlInput", {
    elementType: "input",
    externalForwardedProps: te,
    ownerState: G
  }), [Be, ye] = be("formHelperText", {
    elementType: us,
    externalForwardedProps: te,
    ownerState: G
  }), Ge = /* @__PURE__ */ l(j, {
    "aria-describedby": V,
    autoComplete: i,
    autoFocus: s,
    defaultValue: p,
    fullWidth: x,
    multiline: E,
    name: C,
    rows: F,
    maxRows: O,
    minRows: k,
    type: I,
    value: M,
    id: z,
    inputRef: h,
    onBlur: S,
    onChange: N,
    onFocus: A,
    placeholder: _,
    inputProps: xe,
    slots: {
      input: g.htmlInput ? Ie : void 0
    },
    ...me
  });
  return /* @__PURE__ */ T(Z, {
    ...ae,
    children: [w != null && w !== "" && /* @__PURE__ */ l(Q, {
      htmlFor: P && !K ? void 0 : z,
      id: Y,
      ...P && !K && {
        component: "div"
      },
      ...fe,
      children: w
    }), P ? /* @__PURE__ */ l(re, {
      "aria-describedby": V,
      id: z,
      labelId: Y,
      value: M,
      input: Ge,
      ...ee,
      children: a
    }) : Ge, f && /* @__PURE__ */ l(Be, {
      id: V,
      ...ye,
      children: f
    })]
  });
});
process.env.NODE_ENV !== "production" && (Et.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: n.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   * @default false
   */
  autoFocus: n.bool,
  /**
   * @ignore
   */
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: n.oneOfType([n.oneOf(["primary", "secondary", "error", "info", "success", "warning"]), n.string]),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: n.any,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: n.bool,
  /**
   * If `true`, the label is displayed in an error state.
   * @default false
   */
  error: n.bool,
  /**
   * If `true`, the input will take up the full width of its container.
   * @default false
   */
  fullWidth: n.bool,
  /**
   * The helper text content.
   */
  helperText: n.node,
  /**
   * The id of the `input` element.
   * Use this prop to make `label` and `helperText` accessible for screen readers.
   */
  id: n.string,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: bn,
  /**
   * The label content.
   */
  label: n.node,
  /**
   * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
   * @default 'none'
   */
  margin: n.oneOf(["dense", "none", "normal"]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: n.oneOfType([n.number, n.string]),
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: n.oneOfType([n.number, n.string]),
  /**
   * If `true`, a `textarea` element is rendered instead of an input.
   * @default false
   */
  multiline: n.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: n.string,
  /**
   * @ignore
   */
  onBlur: n.func,
  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: n.func,
  /**
   * @ignore
   */
  onFocus: n.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: n.string,
  /**
   * If `true`, the label is displayed as required and the `input` element is required.
   * @default false
   */
  required: n.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: n.oneOfType([n.number, n.string]),
  /**
   * Render a [`Select`](https://mui.com/material-ui/api/select/) element while passing the Input element to `Select` as `input` parameter.
   * If this option is set you must pass the options of the select as children.
   * @default false
   */
  select: n.bool,
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: n.oneOfType([n.oneOf(["medium", "small"]), n.string]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: n.shape({
    formHelperText: n.oneOfType([n.func, n.object]),
    htmlInput: n.oneOfType([n.func, n.object]),
    input: n.oneOfType([n.func, n.object]),
    inputLabel: n.oneOfType([n.func, n.object]),
    select: n.oneOfType([n.func, n.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: n.shape({
    formHelperText: n.elementType,
    htmlInput: n.elementType,
    input: n.elementType,
    inputLabel: n.elementType,
    root: n.elementType,
    select: n.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#input_types).
   */
  type: n.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: n.any,
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: n.oneOf(["filled", "outlined", "standard"])
});
const $1 = dt(/* @__PURE__ */ l("path", {
  d: "M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"
}), "ExpandMore");
class Zo extends Error {
  constructor(t) {
    super(t), this.name = "EmbedAuthMissingError";
  }
}
class df extends Error {
  constructor(o) {
    super("authentication required");
    $o(this, "loginPath");
    this.name = "DashboardAuthRequiredError", this.loginPath = o;
  }
}
function uf(e) {
  const t = e.startsWith("/") ? e : `/${e}`;
  window.location.assign(t);
}
let Kt = null;
function jd(e) {
  Kt = e;
}
function Ha() {
  return Kt;
}
function pf() {
  return (Kt == null ? void 0 : Kt.mode) === "component";
}
function ir() {
  const e = Kt;
  return (e == null ? void 0 : e.mode) === "embed" || (e == null ? void 0 : e.mode) === "component";
}
function M1(e) {
  const t = e.trim();
  return t === "" ? "" : t.replace(/\/$/, "");
}
function A1() {
  return Kt !== null ? Kt.httpPathPrefix : M1("");
}
function Qr() {
  return ir() ? (Kt == null ? void 0 : Kt.defaultSection) ?? "servers" : "home";
}
function cn() {
  return (Kt == null ? void 0 : Kt.mode) !== "component";
}
const ff = "tenant_id_token";
function _1() {
  try {
    const e = window.localStorage.getItem(ff);
    if (e === null)
      return null;
    const t = e.trim();
    return t.length > 0 ? t : null;
  } catch {
    return null;
  }
}
function mf() {
  var t, o;
  const e = (o = (t = Ha()) == null ? void 0 : t.token) == null ? void 0 : o.trim();
  return e || _1();
}
function Rr(e, t) {
  const o = e[t];
  if (typeof o != "string")
    return;
  const r = o.trim();
  return r.length > 0 ? r : void 0;
}
function hf(e) {
  const t = e.split(".");
  if (t.length !== 3)
    throw new Zo("tenant_id_token is not a valid JWT");
  let o;
  try {
    o = atob(t[1].replace(/-/g, "+").replace(/_/g, "/"));
  } catch {
    throw new Zo("tenant_id_token JWT payload could not be decoded");
  }
  let r;
  try {
    r = JSON.parse(o);
  } catch {
    throw new Zo("tenant_id_token JWT payload is not valid JSON");
  }
  const i = Rr(r, "tenant_id") ?? Rr(r, "custom:tenant_id") ?? Rr(r, "tenantId");
  return {
    email: Rr(r, "email"),
    sub: Rr(r, "sub"),
    tenantId: i
  };
}
function gf() {
  var s, a;
  if (!ir())
    return {};
  const e = mf();
  if (e === null) {
    const c = Ha();
    throw (c == null ? void 0 : c.mode) === "component" ? new Zo(
      "Missing token prop — pass token to <MCPGatewayDashboard /> or set localStorage tenant_id_token"
    ) : new Zo(
      `Missing ${ff} in localStorage — parent app must set it before loading the embed`
    );
  }
  const t = hf(e), r = ((a = (s = Ha()) == null ? void 0 : s.tenantId) == null ? void 0 : a.trim()) || t.tenantId, i = {
    Authorization: `Bearer ${e}`
  };
  return r && (i["X-Tenant-ID"] = r), i;
}
function D1(e) {
  const t = e.trim();
  return t === "" ? "" : t.replace(/\/$/, "");
}
function bf() {
  return D1(A1());
}
function L1(e) {
  const t = e.startsWith("/") ? e : `/${e}`, o = bf();
  return o !== "" ? `${o}${t}` : t;
}
function B1(e) {
  const t = L1(e);
  if (bf() !== "")
    return t;
  const r = "/", i = t.startsWith("/") ? t.slice(1) : t;
  return r + i;
}
async function at(e, t) {
  const o = ir() ? gf() : {}, r = await fetch(B1(e), {
    ...t,
    headers: {
      Accept: "application/json",
      ...o,
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
  if (r.status === 401 && typeof c.login_path == "string" && !ir()) {
    const d = c.login_path.trim();
    if (d.length > 0)
      throw new df(d);
  }
  if (!r.ok) {
    let d = `Request failed: ${r.status}`;
    throw typeof c.error == "string" && c.error.trim() !== "" && (d = c.error.trim()), new Error(d);
  }
  if (r.status !== 204)
    return a;
}
const _e = {
  authStatus: () => at("/dashboard/auth-status"),
  overview: () => at("/dashboard/overview"),
  servers: () => at("/dashboard/servers"),
  tools: () => at("/dashboard/tools"),
  toolGroups: () => at("/dashboard/tool-groups"),
  promptGroups: () => at("/dashboard/prompt-groups"),
  prompts: () => at("/dashboard/prompts"),
  resources: () => at("/dashboard/resources"),
  diagnostics: () => at("/dashboard/diagnostics"),
  registerServer: (e) => at("/dashboard/servers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(e)
  }),
  getServerConfig: (e) => at(`/dashboard/servers/${encodeURIComponent(e)}/config`),
  updateServer: (e, t) => at(`/dashboard/servers/${encodeURIComponent(e)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(t)
  }),
  getOAuthSession: (e) => at(
    `/dashboard/oauth/session/${encodeURIComponent(e)}`
  ),
  createToolGroup: (e) => at("/dashboard/tool-groups", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(e)
  }),
  updateToolGroup: (e, t) => at(`/dashboard/tool-groups/${encodeURIComponent(e)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(t)
  }),
  deleteToolGroup: (e) => at(`/dashboard/tool-groups/${encodeURIComponent(e)}`, {
    method: "DELETE"
  }),
  createPromptGroup: (e) => at("/dashboard/prompt-groups", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(e)
  }),
  updatePromptGroup: (e, t) => at(`/dashboard/prompt-groups/${encodeURIComponent(e)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(t)
  }),
  deletePromptGroup: (e) => at(`/dashboard/prompt-groups/${encodeURIComponent(e)}`, {
    method: "DELETE"
  }),
  deleteServer: (e) => at(`/dashboard/servers/${encodeURIComponent(e)}`, {
    method: "DELETE"
  }),
  setServerEnabled: (e, t) => at(`/dashboard/servers/${encodeURIComponent(e)}/enabled`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ enabled: t })
  }),
  setToolEnabled: (e, t) => at(`/dashboard/tools/${encodeURIComponent(e)}/enabled`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ enabled: t })
  }),
  setPromptEnabled: (e, t) => at(`/dashboard/prompts/${encodeURIComponent(e)}/enabled`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ enabled: t })
  }),
  agentApps: () => at("/dashboard/agent-apps"),
  createAgentApp: (e) => at("/dashboard/agent-apps", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(e)
  }),
  patchAgentApp: (e, t) => at(`/dashboard/agent-apps/${e}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(t)
  }),
  deleteAgentApp: (e) => at(`/dashboard/agent-apps/${e}`, {
    method: "DELETE"
  }),
  rotateAgentAppSecret: (e) => at(`/dashboard/agent-apps/${e}/rotate-secret`, {
    method: "POST"
  })
}, F1 = /* @__PURE__ */ new Set([
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
function yt(e) {
  return `#/${e}`;
}
function Nr(e, t) {
  if (t >= e.length)
    return null;
  const o = e.slice(t).join("/");
  try {
    const r = decodeURIComponent(o);
    return r.length > 0 ? r : null;
  } catch {
    return null;
  }
}
function Yn() {
  let e = window.location.hash.replace(/^#/, "");
  e.startsWith("/") && (e = e.slice(1));
  const t = e.split("/").map((p) => p.trim()).filter((p) => p.length > 0);
  if (t.length === 0 || !F1.has(t[0]))
    return {
      section: null,
      agentAppId: null,
      serverName: null,
      toolGroupName: null,
      promptGroupName: null,
      toolCanonicalName: null,
      promptCanonicalName: null
    };
  const o = t[0];
  let r = null;
  if (o === "agent_apps" && t.length >= 2) {
    const p = Number.parseInt(t[1], 10);
    Number.isFinite(p) && p > 0 && (r = p);
  }
  const i = o === "servers" ? Nr(t, 1) : null, s = o === "tool_groups" ? Nr(t, 1) : null, a = o === "prompt_groups" ? Nr(t, 1) : null, c = o === "tools" ? Nr(t, 1) : null, d = o === "prompts" ? Nr(t, 1) : null;
  return {
    section: o,
    agentAppId: o === "agent_apps" ? r : null,
    serverName: o === "servers" ? i : null,
    toolGroupName: o === "tool_groups" ? s : null,
    promptGroupName: o === "prompt_groups" ? a : null,
    toolCanonicalName: o === "tools" ? c : null,
    promptCanonicalName: o === "prompts" ? d : null
  };
}
function Wd() {
  return Yn().section;
}
function ha(e) {
  return `#/agent_apps/${e}`;
}
function zd(e) {
  return `#/servers/${encodeURIComponent(e)}`;
}
function Pi(e) {
  return `#/tool_groups/${encodeURIComponent(e)}`;
}
function Ii(e) {
  return `#/prompt_groups/${encodeURIComponent(e)}`;
}
function Vd(e) {
  return `#/tools/${encodeURIComponent(e)}`;
}
function Ud(e) {
  return `#/prompts/${encodeURIComponent(e)}`;
}
function lt(e) {
  cn() && window.location.hash !== e && (window.location.hash = e);
}
function $n(e, t, o) {
  cn() && window.history.replaceState(null, "", `${e}${t}${o}`);
}
const j1 = dt(/* @__PURE__ */ l("path", {
  d: "M9 16.17 5.53 12.7a.996.996 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41a.996.996 0 0 0-1.41 0z"
}), "CheckRounded"), W1 = dt(/* @__PURE__ */ l("path", {
  d: "M15 20H5V7c0-.55-.45-1-1-1s-1 .45-1 1v13c0 1.1.9 2 2 2h10c.55 0 1-.45 1-1s-.45-1-1-1m5-4V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2m-2 0H9V4h9z"
}), "ContentCopyRounded");
function vt({
  value: e,
  ariaLabel: t = "Copy",
  title: o
}) {
  const [r, i] = Ne(!1);
  async function s() {
    try {
      await navigator.clipboard.writeText(e), i(!0), window.setTimeout(() => i(!1), 1200);
    } catch {
      i(!1);
    }
  }
  return /* @__PURE__ */ l(
    tn,
    {
      "aria-label": r ? "Copied" : t,
      color: r ? "success" : "default",
      edge: "end",
      onClick: s,
      title: r ? "Copied" : o ?? t,
      type: "button",
      size: "small",
      children: r ? /* @__PURE__ */ l(j1, { fontSize: "small" }) : /* @__PURE__ */ l(W1, { fontSize: "small" })
    }
  );
}
const So = '"JetBrains Mono", "SFMono-Regular", "SF Mono", ui-monospace, monospace', z1 = Ls({
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
          fontFamily: So
        },
        "button, input, textarea, select": {
          font: "inherit"
        }
      }
    }
  }
});
function Fo({ emptyState: e }) {
  return /* @__PURE__ */ l(ht, { elevation: 0, variant: "outlined", sx: { borderRadius: 2, bgcolor: "#f6f8fa", p: 2 }, children: /* @__PURE__ */ T(pe, { spacing: 2, children: [
    /* @__PURE__ */ T(je, { children: [
      /* @__PURE__ */ l(q, { variant: "caption", sx: { letterSpacing: "0.12em", fontWeight: 600 }, children: "Empty state" }),
      /* @__PURE__ */ l(q, { variant: "h6", component: "h3", sx: { mt: 1, mb: 0 }, children: e.title }),
      /* @__PURE__ */ l(q, { color: "text.secondary", sx: { mt: 1 }, children: e.description })
    ] }),
    e.commands && e.commands.length > 0 ? /* @__PURE__ */ l(pe, { spacing: 1, children: e.commands.map((t) => /* @__PURE__ */ T(
      ht,
      {
        variant: "outlined",
        sx: { px: 1.25, py: 0.75, bgcolor: "#fff", display: "flex", alignItems: "center", gap: 1 },
        children: [
          /* @__PURE__ */ l(
            q,
            {
              component: "code",
              variant: "body2",
              sx: {
                flex: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontFamily: So
              },
              children: t
            }
          ),
          /* @__PURE__ */ l(vt, { ariaLabel: "Copy command", title: "Copy command", value: t })
        ]
      },
      t
    )) }) : null
  ] }) });
}
const V1 = dt(/* @__PURE__ */ l("path", {
  d: "M21 6.5c-1.66 0-3 1.34-3 3 0 .07 0 .14.01.21l-2.03.68c-.64-1.21-1.82-2.09-3.22-2.32V5.91C14.04 5.57 15 4.4 15 3c0-1.66-1.34-3-3-3S9 1.34 9 3c0 1.4.96 2.57 2.25 2.91v2.16c-1.4.23-2.58 1.11-3.22 2.32l-2.04-.68C6 9.64 6 9.57 6 9.5c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3c1.06 0 1.98-.55 2.52-1.37l2.03.68c-.2 1.29.17 2.66 1.09 3.69l-1.41 1.77Q6.66 17 6 17c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3c0-.68-.22-1.3-.6-1.8l1.41-1.77c1.36.76 3.02.75 4.37 0l1.41 1.77c-.37.5-.59 1.12-.59 1.8 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3c-.44 0-.85.09-1.23.26l-1.41-1.77c.93-1.04 1.29-2.4 1.09-3.69l2.03-.68c.53.82 1.46 1.37 2.52 1.37 1.66 0 3-1.34 3-3S22.66 6.5 21 6.5m-18 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1M6 21c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m5-18c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1m1 12c-1.38 0-2.5-1.12-2.5-2.5S10.62 10 12 10s2.5 1.12 2.5 2.5S13.38 15 12 15m6 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1m3-8.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1"
}), "HubOutlined"), yf = dt(/* @__PURE__ */ l("path", {
  d: "M19 15v4H5v-4zm1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1M7 18.5c-.82 0-1.5-.67-1.5-1.5s.68-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5M19 5v4H5V5zm1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1M7 8.5c-.82 0-1.5-.67-1.5-1.5S6.18 5.5 7 5.5s1.5.68 1.5 1.5S7.83 8.5 7 8.5"
}), "DnsOutlined"), vf = dt([/* @__PURE__ */ l("path", {
  d: "m21.67 18.17-5.3-5.3h-.99l-2.54 2.54v.99l5.3 5.3c.39.39 1.02.39 1.41 0l2.12-2.12c.39-.38.39-1.02 0-1.41m-2.83 1.42-4.24-4.24.71-.71 4.24 4.24z"
}, "0"), /* @__PURE__ */ l("path", {
  d: "m17.34 10.19 1.41-1.41 2.12 2.12c1.17-1.17 1.17-3.07 0-4.24l-3.54-3.54-1.41 1.41V1.71l-.7-.71-3.54 3.54.71.71h2.83l-1.41 1.41 1.06 1.06-2.89 2.89-4.13-4.13V5.06L4.83 2.04 2 4.87 5.03 7.9h1.41l4.13 4.13-.85.85H7.6l-5.3 5.3c-.39.39-.39 1.02 0 1.41l2.12 2.12c.39.39 1.02.39 1.41 0l5.3-5.3v-2.12l5.15-5.15zm-7.98 5.15-4.24 4.24-.71-.71 4.24-4.24z"
}, "1")], "HandymanOutlined"), xf = dt(/* @__PURE__ */ l("path", {
  d: "m11.99 18.54-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27zm0-11.47L17.74 9 12 13.47 6.26 9z"
}), "LayersOutlined"), Sf = dt(/* @__PURE__ */ l("path", {
  d: "M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7zm12-4h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04-.39.08-.74.28-1.01.55-.18.18-.33.4-.43.64-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75M19 19H5V5h14z"
}), "AssignmentOutlined"), Cf = dt(/* @__PURE__ */ l("path", {
  d: "M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z"
}), "DescriptionOutlined"), U1 = dt(/* @__PURE__ */ l("path", {
  d: "M12 2 4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5zm6 9.09c0 4-2.55 7.7-6 8.83-3.45-1.13-6-4.82-6-8.83v-4.7l6-2.25 6 2.25z"
}), "ShieldOutlined"), H1 = dt([/* @__PURE__ */ l("path", {
  d: "m20.38 8.57-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44z"
}, "0"), /* @__PURE__ */ l("path", {
  d: "M10.59 15.41a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83"
}, "1")], "SpeedOutlined"), wf = dt(/* @__PURE__ */ l("path", {
  d: "M4 8h4V4H4zm6 12h4v-4h-4zm-6 0h4v-4H4zm0-6h4v-4H4zm6 0h4v-4h-4zm6-10v4h4V4zm-6 4h4V4h-4zm6 6h4v-4h-4zm0 6h4v-4h-4z"
}), "AppsOutlined");
function G1(e) {
  return Se("MuiCard", e);
}
we("MuiCard", ["root"]);
const q1 = (e) => {
  const {
    classes: t
  } = e;
  return Te({
    root: ["root"]
  }, G1, t);
}, K1 = J(ht, {
  name: "MuiCard",
  slot: "Root"
})({
  overflow: "hidden"
}), Tf = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiCard"
  }), {
    className: i,
    raised: s = !1,
    ...a
  } = r, c = {
    ...r,
    raised: s
  }, d = q1(c);
  return /* @__PURE__ */ l(K1, {
    className: de(d.root, i),
    elevation: s ? 8 : void 0,
    ref: o,
    ownerState: c,
    ...a
  });
});
process.env.NODE_ENV !== "production" && (Tf.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * If `true`, the card will use raised styling.
   * @default false
   */
  raised: Un(n.bool, (e) => e.raised && e.variant === "outlined" ? new Error('MUI: Combining `raised={true}` with `variant="outlined"` has no effect.') : null),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object])
});
function Y1(e) {
  return Se("MuiCardContent", e);
}
we("MuiCardContent", ["root"]);
const X1 = (e) => {
  const {
    classes: t
  } = e;
  return Te({
    root: ["root"]
  }, Y1, t);
}, J1 = J("div", {
  name: "MuiCardContent",
  slot: "Root"
})({
  padding: 16,
  "&:last-child": {
    paddingBottom: 24
  }
}), Ef = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiCardContent"
  }), {
    className: i,
    component: s = "div",
    ...a
  } = r, c = {
    ...r,
    component: s
  }, d = X1(c);
  return /* @__PURE__ */ l(J1, {
    as: s,
    className: de(d.root, i),
    ownerState: c,
    ref: o,
    ...a
  });
});
process.env.NODE_ENV !== "production" && (Ef.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: n.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object])
});
const Q1 = dt(/* @__PURE__ */ l("path", {
  d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
}), "Cancel");
function Z1(e) {
  return Se("MuiChip", e);
}
const et = we("MuiChip", ["root", "sizeSmall", "sizeMedium", "colorDefault", "colorError", "colorInfo", "colorPrimary", "colorSecondary", "colorSuccess", "colorWarning", "disabled", "clickable", "deletable", "outlined", "filled", "avatar", "icon", "label", "deleteIcon", "focusVisible"]), eS = (e) => {
  const {
    classes: t,
    disabled: o,
    size: r,
    color: i,
    onDelete: s,
    clickable: a,
    variant: c
  } = e, d = {
    root: ["root", c, o && "disabled", `size${Ce(r)}`, `color${Ce(i)}`, a && "clickable", s && "deletable"],
    label: ["label"],
    avatar: ["avatar"],
    icon: ["icon"],
    deleteIcon: ["deleteIcon"]
  };
  return Te(d, Z1, t);
}, tS = J("div", {
  name: "MuiChip",
  slot: "Root",
  shouldForwardProp: (e) => Qt(e) && e !== "focusableWhenDisabled" && e !== "skipFocusWhenDisabled",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e, {
      color: r,
      clickable: i,
      onDelete: s,
      size: a,
      variant: c
    } = o;
    return [{
      [`& .${et.avatar}`]: t.avatar
    }, {
      [`& .${et.icon}`]: t.icon
    }, {
      [`& .${et.deleteIcon}`]: t.deleteIcon
    }, t.root, t[`size${Ce(a)}`], t[`color${Ce(r)}`], i && t.clickable, s && t.deletable, t[c]];
  }
})(Pe(({
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
    [`&.${et.disabled}`]: {
      opacity: (e.vars || e).palette.action.disabledOpacity,
      pointerEvents: "none"
    },
    [`& .${et.avatar}`]: {
      marginLeft: 5,
      marginRight: -6,
      width: 24,
      height: 24,
      color: e.vars ? e.vars.palette.Chip.defaultAvatarColor : t,
      fontSize: e.typography.pxToRem(12)
    },
    [`& .${et.icon}`]: {
      marginLeft: 5,
      marginRight: -6
    },
    [`& .${et.deleteIcon}`]: {
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
        [`& .${et.avatar}`]: {
          color: (e.vars || e).palette.primary.contrastText,
          backgroundColor: (e.vars || e).palette.primary.dark
        }
      }
    }, {
      props: {
        color: "secondary"
      },
      style: {
        [`& .${et.avatar}`]: {
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
        [`& .${et.avatar}`]: {
          marginLeft: 4,
          marginRight: -4,
          width: 18,
          height: 18,
          fontSize: e.typography.pxToRem(10)
        },
        [`& .${et.icon}`]: {
          fontSize: 18,
          marginLeft: 4,
          marginRight: -4
        },
        [`& .${et.deleteIcon}`]: {
          fontSize: 16,
          marginRight: 4,
          marginLeft: -4
        }
      }
    }, ...Object.entries(e.palette).filter(Ut(["contrastText"])).map(([o]) => ({
      props: {
        color: o
      },
      style: {
        backgroundColor: (e.vars || e).palette[o].main,
        color: (e.vars || e).palette[o].contrastText,
        [`& .${et.deleteIcon}`]: {
          color: e.alpha((e.vars || e).palette[o].contrastText, 0.7),
          "&:hover, &:active": {
            color: (e.vars || e).palette[o].contrastText
          }
        }
      }
    })), {
      props: (o) => o.iconColor === o.color,
      style: {
        [`& .${et.icon}`]: {
          color: e.vars ? e.vars.palette.Chip.defaultIconColor : t
        }
      }
    }, {
      props: (o) => o.iconColor === o.color && o.color !== "default",
      style: {
        [`& .${et.icon}`]: {
          color: "inherit"
        }
      }
    }, {
      props: {
        onDelete: !0
      },
      style: {
        [`&.${et.focusVisible}`]: {
          backgroundColor: e.alpha((e.vars || e).palette.action.selected, `${(e.vars || e).palette.action.selectedOpacity} + ${(e.vars || e).palette.action.focusOpacity}`)
        }
      }
    }, ...Object.entries(e.palette).filter(Ut(["dark"])).map(([o]) => ({
      props: {
        color: o,
        onDelete: !0
      },
      style: {
        [`&.${et.focusVisible}`]: {
          background: (e.vars || e).palette[o].dark
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
        [`&.${et.focusVisible}`]: {
          backgroundColor: e.alpha((e.vars || e).palette.action.selected, `${(e.vars || e).palette.action.selectedOpacity} + ${(e.vars || e).palette.action.focusOpacity}`)
        },
        "&:active": {
          boxShadow: (e.vars || e).shadows[1]
        }
      }
    }, ...Object.entries(e.palette).filter(Ut(["dark"])).map(([o]) => ({
      props: {
        color: o,
        clickable: !0
      },
      style: {
        [`&:hover, &.${et.focusVisible}`]: {
          backgroundColor: (e.vars || e).palette[o].dark
        }
      }
    })), {
      props: {
        variant: "outlined"
      },
      style: {
        backgroundColor: "transparent",
        border: e.vars ? `1px solid ${e.vars.palette.Chip.defaultBorder}` : `1px solid ${e.palette.mode === "light" ? e.palette.grey[400] : e.palette.grey[700]}`,
        [`&.${et.clickable}:hover`]: {
          backgroundColor: (e.vars || e).palette.action.hover
        },
        [`&.${et.focusVisible}`]: {
          backgroundColor: (e.vars || e).palette.action.focus
        },
        [`& .${et.avatar}`]: {
          marginLeft: 4
        },
        [`& .${et.icon}`]: {
          marginLeft: 4
        },
        [`& .${et.deleteIcon}`]: {
          marginRight: 5
        }
      }
    }, {
      props: {
        size: "small",
        variant: "outlined"
      },
      style: {
        [`& .${et.avatar}`]: {
          marginLeft: 2
        },
        [`& .${et.icon}`]: {
          marginLeft: 2
        },
        [`& .${et.deleteIcon}`]: {
          marginRight: 3
        }
      }
    }, ...Object.entries(e.palette).filter(Ut()).map(([o]) => ({
      props: {
        variant: "outlined",
        color: o
      },
      style: {
        color: (e.vars || e).palette[o].main,
        border: `1px solid ${e.alpha((e.vars || e).palette[o].main, 0.7)}`,
        [`&.${et.clickable}:hover`]: {
          backgroundColor: e.alpha((e.vars || e).palette[o].main, (e.vars || e).palette.action.hoverOpacity)
        },
        [`&.${et.focusVisible}`]: {
          backgroundColor: e.alpha((e.vars || e).palette[o].main, (e.vars || e).palette.action.focusOpacity)
        },
        [`& .${et.deleteIcon}`]: {
          color: e.alpha((e.vars || e).palette[o].main, 0.7),
          "&:hover, &:active": {
            color: (e.vars || e).palette[o].main
          }
        }
      }
    }))]
  };
})), nS = J("span", {
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
function Hd(e) {
  return e.key === "Backspace" || e.key === "Delete";
}
const Zr = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiChip"
  }), {
    avatar: i,
    className: s,
    clickable: a,
    color: c = "default",
    component: d,
    deleteIcon: p,
    disabled: m = !1,
    icon: y,
    label: x,
    onClick: f,
    onDelete: v,
    onKeyDown: h,
    onKeyUp: w,
    size: O = "medium",
    variant: k = "filled",
    tabIndex: E,
    skipFocusWhenDisabled: C = !1,
    // TODO v6: Rename to `focusableWhenDisabled`.
    slots: S = {},
    slotProps: N = {},
    ...A
  } = r, {
    nativeButton: _,
    ...D
  } = A, F = b.useRef(null), P = gt(F, o), g = (U) => {
    U.stopPropagation(), v(U);
  }, $ = (U) => {
    U.currentTarget === U.target && Hd(U) && U.preventDefault(), h && h(U);
  }, I = (U) => {
    U.currentTarget === U.target && v && Hd(U) && v(U), w && w(U);
  }, M = a !== !1 && f ? !0 : a, B = M || v ? zn : d || "div", W = {
    ...r,
    component: B,
    disabled: m,
    size: O,
    color: c,
    iconColor: /* @__PURE__ */ b.isValidElement(y) && y.props.color || c,
    onDelete: !!v,
    clickable: M,
    variant: k
  }, G = eS(W), oe = B === zn ? {
    component: d || "div",
    internalNativeButton: !1,
    focusVisibleClassName: G.focusVisible,
    ...v && {
      disableRipple: !0
    },
    ..._ !== void 0 && {
      nativeButton: _
    }
  } : {};
  let z = null;
  v && (z = p && /* @__PURE__ */ b.isValidElement(p) ? /* @__PURE__ */ b.cloneElement(p, {
    className: de(p.props.className, G.deleteIcon),
    onClick: g
  }) : /* @__PURE__ */ l(Q1, {
    className: G.deleteIcon,
    onClick: g
  }));
  let V = null;
  i && /* @__PURE__ */ b.isValidElement(i) && (V = /* @__PURE__ */ b.cloneElement(i, {
    className: de(G.avatar, i.props.className)
  }));
  let Y = null;
  y && /* @__PURE__ */ b.isValidElement(y) && (Y = /* @__PURE__ */ b.cloneElement(y, {
    className: de(G.icon, y.props.className)
  })), process.env.NODE_ENV !== "production" && V && Y && console.error("MUI: The Chip component can not handle the avatar and the icon prop at the same time. Pick one.");
  const ne = {
    slots: S,
    slotProps: N
  }, [te, re] = be("root", {
    elementType: tS,
    externalForwardedProps: {
      ...ne,
      ...D
    },
    ownerState: W,
    // The `component` prop is preserved because `Chip` relies on it for internal logic. If `shouldForwardComponentProp` were `false`, `useSlot` would remove the `component` prop, potentially breaking the component's behavior.
    shouldForwardComponentProp: !0,
    ref: P,
    className: de(G.root, s),
    additionalProps: {
      disabled: M && m ? !0 : void 0,
      tabIndex: C && m ? -1 : E,
      ...oe
    },
    getSlotProps: (U) => ({
      ...U,
      onClick: (X) => {
        var Z;
        (Z = U.onClick) == null || Z.call(U, X), f == null || f(X);
      },
      onKeyDown: (X) => {
        var Z;
        (Z = U.onKeyDown) == null || Z.call(U, X), $(X);
      },
      onKeyUp: (X) => {
        var Z;
        (Z = U.onKeyUp) == null || Z.call(U, X), I(X);
      }
    })
  }), [ee, K] = be("label", {
    elementType: nS,
    externalForwardedProps: ne,
    ownerState: W,
    className: G.label
  });
  return /* @__PURE__ */ T(te, {
    as: B,
    ...re,
    children: [V || Y, /* @__PURE__ */ l(ee, {
      ...K,
      children: x
    }), z]
  });
});
process.env.NODE_ENV !== "production" && (Zr.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The Avatar element to display.
   */
  avatar: n.element,
  /**
   * This prop isn't supported.
   * Use the `component` prop if you need to change the children structure.
   */
  children: vp,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * If `true`, the chip will appear clickable, and will raise when pressed,
   * even if the onClick prop is not defined.
   * If `false`, the chip will not appear clickable, even if onClick prop is defined.
   * This can be used, for example,
   * along with the component prop to indicate an anchor Chip is clickable.
   * Note: this controls the UI and does not affect the onClick event.
   */
  clickable: n.bool,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'default'
   */
  color: n.oneOfType([n.oneOf(["default", "primary", "secondary", "error", "info", "success", "warning"]), n.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: n.elementType,
  /**
   * Override the default delete icon element. Shown only if `onDelete` is set.
   */
  deleteIcon: n.element,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: n.bool,
  /**
   * Icon element.
   */
  icon: n.element,
  /**
   * The content of the component.
   */
  label: n.node,
  /**
   * If `true`, the component is expected to resolve to a native `<button>` element.
   * When omitted, custom components inherit the default button semantics of the current wrapper.
   * Set to `true` when a custom component resolves to a native `<button>`, or `false`
   * when it resolves to a non-button host.
   */
  nativeButton: n.bool,
  /**
   * @ignore
   */
  onClick: n.func,
  /**
   * Callback fired when the delete icon is clicked.
   * If set, the delete icon will be shown.
   */
  onDelete: n.func,
  /**
   * @ignore
   */
  onKeyDown: n.func,
  /**
   * @ignore
   */
  onKeyUp: n.func,
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: n.oneOfType([n.oneOf(["medium", "small"]), n.string]),
  /**
   * If `true`, allows the disabled chip to escape focus.
   * If `false`, allows the disabled chip to receive focus.
   * @default false
   */
  skipFocusWhenDisabled: n.bool,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: n.shape({
    label: n.oneOfType([n.func, n.object]),
    root: n.oneOfType([n.func, n.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: n.shape({
    label: n.elementType,
    root: n.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  /**
   * @ignore
   */
  tabIndex: n.number,
  /**
   * The variant to use.
   * @default 'filled'
   */
  variant: n.oneOfType([n.oneOf(["filled", "outlined"]), n.string])
});
const Ga = Mb({
  createStyledComponent: J("div", {
    name: "MuiContainer",
    slot: "Root",
    overridesResolver: (e, t) => {
      const {
        ownerState: o
      } = e;
      return [t.root, t[`maxWidth${Ce(String(o.maxWidth))}`], o.fixed && t.fixed, o.disableGutters && t.disableGutters];
    }
  }),
  useThemeProps: (e) => Ee({
    props: e,
    name: "MuiContainer"
  })
});
process.env.NODE_ENV !== "production" && (Ga.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: n.elementType,
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: n.bool,
  /**
   * Set the max-width to match the min-width of the current breakpoint.
   * This is useful if you'd prefer to design for a fixed set of sizes
   * instead of trying to accommodate a fully fluid viewport.
   * It's fluid by default.
   * @default false
   */
  fixed: n.bool,
  /**
   * Determine the max-width of the container.
   * The container width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   * @default 'lg'
   */
  maxWidth: n.oneOfType([n.oneOf(["xs", "sm", "md", "lg", "xl", !1]), n.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object])
});
const oS = [
  {
    icon: V1,
    title: "One MCP endpoint",
    body: "Point Claude, Cursor, Copilot, Codex, or your own agents at a single streamable HTTP `/mcp` URL instead of juggling a separate config per server."
  },
  {
    icon: yf,
    title: "Central registry",
    body: "Register stdio, SSE, and streamable HTTP MCP servers once. The gateway proxies calls, tracks connection health, and keeps your inventory in one Postgres-backed catalog."
  },
  {
    icon: vf,
    title: "Unified discovery",
    body: "Tools, prompts, and resources from every server appear in one dashboard. Toggle exposure per server, tool, or prompt without redeploying clients."
  },
  {
    icon: xf,
    title: "Tool & prompt groups",
    body: "Curate subsets of tools and MCP prompts for least-privilege access and dedicated group endpoints—ideal for shared team gateways and scoped automations."
  },
  {
    icon: Sf,
    title: "Prompts & resources",
    body: "Expose prompt templates and MCP resources through the same proxy as tools so assistants get a consistent, namespaced surface across backends."
  },
  {
    icon: Cf,
    title: "Upstream OAuth flows",
    body: "Register servers that require OAuth without hand-rolling redirects—the dashboard coordinates authorization and stores tokens for repeatable access."
  },
  {
    icon: U1,
    title: "Operational hardening",
    body: "Optional OIDC sign-in for this console, path-prefix deployment behind reverse proxies, proxy auth for MCP traffic, and Redis-backed sessions when you scale replicas."
  },
  {
    icon: H1,
    title: "Observable by design",
    body: "Built-in health checks, diagnostics, and OpenTelemetry integration hooks so you can meter gateway traffic alongside the rest of your stack."
  }
];
function rS({
  overview: e,
  auth: t,
  onNavigate: o
}) {
  var r;
  return /* @__PURE__ */ T(pe, { spacing: 3, sx: { pb: 4 }, children: [
    /* @__PURE__ */ T(
      je,
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
            je,
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
            je,
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
          /* @__PURE__ */ T(Ga, { maxWidth: "lg", sx: { position: "relative", py: { xs: 4, md: 5 }, px: { xs: 2.5, sm: 4 } }, children: [
            /* @__PURE__ */ l(
              je,
              {
                sx: {
                  position: "absolute",
                  top: { xs: 12, sm: 16 },
                  right: { xs: 12, sm: 20 },
                  zIndex: 2
                },
                children: t != null && t.oidc_enabled ? t.authenticated ? /* @__PURE__ */ T(pe, { direction: { xs: "column", sm: "row" }, spacing: 1, sx: { alignItems: { sm: "center" } }, children: [
                  /* @__PURE__ */ l(
                    Zr,
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
                    ge,
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
                  ge,
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
            /* @__PURE__ */ T(pe, { spacing: 2.5, sx: { maxWidth: 720 }, children: [
              /* @__PURE__ */ l(q, { variant: "overline", sx: { letterSpacing: "0.12em", opacity: 0.92, fontWeight: 600 }, children: "Model Context Protocol" }),
              /* @__PURE__ */ l(
                q,
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
                q,
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
              /* @__PURE__ */ T(pe, { direction: { xs: "column", sm: "row" }, spacing: 1.5, sx: { pt: 1 }, children: [
                /* @__PURE__ */ l(
                  ge,
                  {
                    variant: "contained",
                    size: "large",
                    onClick: () => o("servers"),
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
                  ge,
                  {
                    variant: "outlined",
                    size: "large",
                    onClick: () => o("tools"),
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
                  ge,
                  {
                    variant: "text",
                    size: "large",
                    onClick: () => o("tool_groups"),
                    sx: { color: "common.white", fontWeight: 600, "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } },
                    children: "Tool groups"
                  }
                ),
                /* @__PURE__ */ l(
                  ge,
                  {
                    variant: "text",
                    size: "large",
                    onClick: () => o("prompt_groups"),
                    sx: { color: "common.white", fontWeight: 600, "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } },
                    children: "Prompt groups"
                  }
                ),
                /* @__PURE__ */ l(
                  ge,
                  {
                    variant: "text",
                    size: "large",
                    startIcon: /* @__PURE__ */ l(wf, {}),
                    onClick: () => o("agent_apps"),
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
      pe,
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
          /* @__PURE__ */ l(q, { variant: "subtitle2", color: "text.secondary", sx: { fontWeight: 600 }, children: "Live gateway snapshot" }),
          /* @__PURE__ */ T(pe, { direction: "row", spacing: 2, sx: { flexWrap: "wrap" }, children: [
            /* @__PURE__ */ l($i, { label: "Servers", value: e.server_count }),
            /* @__PURE__ */ l($i, { label: "Tools", value: e.tool_count }),
            /* @__PURE__ */ l($i, { label: "Prompts", value: e.prompt_count }),
            /* @__PURE__ */ l($i, { label: "Resources", value: e.resource_count })
          ] })
        ]
      }
    ) : null,
    /* @__PURE__ */ T(Ga, { maxWidth: "lg", disableGutters: !0, sx: { px: { xs: 0, sm: 0 } }, children: [
      /* @__PURE__ */ l(q, { variant: "h5", component: "h2", sx: { fontWeight: 700, mb: 1 }, children: "Why use SAMI MCPHub?" }),
      /* @__PURE__ */ l(q, { color: "text.secondary", sx: { mb: 3, maxWidth: 800, lineHeight: 1.6 }, children: "MCP connects assistants to your systems, but every new server usually means another client config, another set of credentials, and another place to look for tools. A gateway collapses that sprawl: one registration pipeline, one discovery index, and one place to apply policy—whether you are solo on a laptop or running shared infrastructure for a team." }),
      /* @__PURE__ */ l(
        je,
        {
          sx: {
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
            gap: 2
          },
          children: oS.map(({ icon: i, title: s, body: a }) => /* @__PURE__ */ l(
            Tf,
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
              children: /* @__PURE__ */ l(Ef, { sx: { p: 2.25 }, children: /* @__PURE__ */ T(pe, { spacing: 1.25, children: [
                /* @__PURE__ */ l(i, { color: "primary", sx: { fontSize: 32 } }),
                /* @__PURE__ */ l(q, { variant: "subtitle1", component: "h3", sx: { fontWeight: 700 }, children: s }),
                /* @__PURE__ */ l(q, { variant: "body2", color: "text.secondary", sx: { lineHeight: 1.55 }, children: a })
              ] }) })
            },
            s
          ))
        }
      )
    ] })
  ] });
}
function $i({ label: e, value: t }) {
  return /* @__PURE__ */ T(
    je,
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
        /* @__PURE__ */ l(q, { variant: "caption", color: "text.secondary", sx: { fontWeight: 600 }, children: e }),
        /* @__PURE__ */ l(q, { variant: "subtitle1", sx: { fontWeight: 800 }, children: t })
      ]
    }
  );
}
const Of = [
  { key: "home", label: "Home" },
  { key: "servers", label: "Servers" },
  { key: "tools", label: "Tools" },
  { key: "tool_groups", label: "Tool Groups" },
  { key: "prompt_groups", label: "Prompt Groups" },
  { key: "agent_apps", label: "Agent Apps" },
  { key: "prompts", label: "Prompts" },
  { key: "resources", label: "Resources" },
  { key: "diagnostics", label: "System Info" }
], iS = Of.filter(
  (e) => e.key !== "home"
), sS = dt(/* @__PURE__ */ l("path", {
  d: "M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"
}), "ChevronLeft"), aS = dt(/* @__PURE__ */ l("path", {
  d: "M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
}), "ChevronRight"), lS = dt(/* @__PURE__ */ l("path", {
  d: "M14.17 5 19 9.83V19H5V5zm0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9.83c0-.53-.21-1.04-.59-1.41l-4.83-4.83c-.37-.38-.88-.59-1.41-.59M7 15h10v2H7zm0-4h10v2H7zm0-4h7v2H7z"
}), "TextSnippetOutlined"), cS = dt(/* @__PURE__ */ l("path", {
  d: "m12 5.69 5 4.5V18h-2v-6H9v6H7v-7.81zM12 3 2 12h3v8h6v-6h2v6h6v-8h3z"
}), "HomeOutlined"), dS = dt(/* @__PURE__ */ l("path", {
  d: "M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8"
}), "InfoOutlined"), Gd = dt(/* @__PURE__ */ l("path", {
  d: "m17 8-1.41 1.41L17.17 11H9v2h8.17l-1.58 1.58L17 16l4-4zM5 5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h7v-2H5z"
}), "LogoutOutlined");
function uS(e) {
  return Se("MuiListItem", e);
}
we("MuiListItem", ["root", "dense", "alignItemsFlexStart", "divider", "gutters", "padding", "secondaryAction"]);
function pS(e) {
  return Se("MuiListItemButton", e);
}
const Ho = we("MuiListItemButton", ["root", "focusVisible", "dense", "alignItemsFlexStart", "disabled", "divider", "gutters", "selected"]), fS = (e, t) => {
  const {
    ownerState: o
  } = e;
  return [t.root, o.dense && t.dense, o.alignItems === "flex-start" && t.alignItemsFlexStart, o.divider && t.divider, !o.disableGutters && t.gutters];
}, mS = (e) => {
  const {
    alignItems: t,
    classes: o,
    dense: r,
    disabled: i,
    disableGutters: s,
    divider: a,
    selected: c
  } = e, p = Te({
    root: ["root", r && "dense", !s && "gutters", a && "divider", i && "disabled", t === "flex-start" && "alignItemsFlexStart", c && "selected"]
  }, pS, o);
  return {
    ...o,
    ...p
  };
}, hS = J(zn, {
  shouldForwardProp: (e) => Qt(e) || e === "classes",
  name: "MuiListItemButton",
  slot: "Root",
  overridesResolver: fS
})(Pe(({
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
  [`&.${Ho.selected}`]: {
    backgroundColor: e.alpha((e.vars || e).palette.primary.main, (e.vars || e).palette.action.selectedOpacity),
    [`&.${Ho.focusVisible}`]: {
      backgroundColor: e.alpha((e.vars || e).palette.primary.main, `${(e.vars || e).palette.action.selectedOpacity} + ${(e.vars || e).palette.action.focusOpacity}`)
    }
  },
  [`&.${Ho.selected}:hover`]: {
    backgroundColor: e.alpha((e.vars || e).palette.primary.main, `${(e.vars || e).palette.action.selectedOpacity} + ${(e.vars || e).palette.action.hoverOpacity}`),
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      backgroundColor: e.alpha((e.vars || e).palette.primary.main, (e.vars || e).palette.action.selectedOpacity)
    }
  },
  [`&.${Ho.focusVisible}`]: {
    backgroundColor: (e.vars || e).palette.action.focus
  },
  [`&.${Ho.disabled}`]: {
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
}))), Rf = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiListItemButton"
  }), {
    alignItems: i = "center",
    autoFocus: s = !1,
    component: a = "div",
    children: c,
    dense: d = !1,
    disableGutters: p = !1,
    divider: m = !1,
    focusVisibleClassName: y,
    selected: x = !1,
    className: f,
    ...v
  } = r, h = b.useContext(On), w = b.useMemo(() => ({
    dense: d || h.dense || !1,
    alignItems: i,
    disableGutters: p
  }), [i, h.dense, d, p]), O = b.useRef(null);
  Nt(() => {
    s && (O.current ? O.current.focus() : process.env.NODE_ENV !== "production" && console.error("MUI: Unable to set focus to a ListItemButton whose component has not been rendered."));
  }, [s]);
  const k = {
    ...r,
    alignItems: i,
    dense: w.dense,
    disableGutters: p,
    divider: m,
    selected: x
  }, E = mS(k), {
    root: C,
    ...S
  } = E, N = gt(O, o);
  return /* @__PURE__ */ l(On.Provider, {
    value: w,
    children: /* @__PURE__ */ l(hS, {
      ref: N,
      href: v.href || v.to,
      component: (v.href || v.to) && a === "div" ? "button" : a,
      internalNativeButton: !1,
      focusVisibleClassName: de(E.focusVisible, y),
      ownerState: k,
      className: de(E.root, f),
      ...v,
      classes: S,
      children: c
    })
  });
});
process.env.NODE_ENV !== "production" && (Rf.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Defines the `align-items` style property.
   * @default 'center'
   */
  alignItems: n.oneOf(["center", "flex-start"]),
  /**
   * If `true`, the list item is focused during the first mount.
   * Focus will also be triggered if the value changes from false to true.
   * @default false
   */
  autoFocus: n.bool,
  /**
   * The content of the component.
   */
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: n.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * The prop defaults to the value inherited from the parent List component.
   * @default false
   */
  dense: n.bool,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: n.bool,
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: n.bool,
  /**
   * If `true`, a 1px light border is added to the bottom of the list item.
   * @default false
   */
  divider: n.bool,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: n.string,
  /**
   * @ignore
   */
  href: n.string,
  /**
   * Use to apply selected styling.
   * @default false
   */
  selected: n.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object])
});
function gS(e) {
  return Se("MuiListItemSecondaryAction", e);
}
we("MuiListItemSecondaryAction", ["root", "disableGutters"]);
const bS = (e) => {
  const {
    disableGutters: t,
    classes: o
  } = e;
  return Te({
    root: ["root", t && "disableGutters"]
  }, gS, o);
}, yS = J("div", {
  name: "MuiListItemSecondaryAction",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [t.root, o.disableGutters && t.disableGutters];
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
}), Pl = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiListItemSecondaryAction"
  }), {
    className: i,
    component: s,
    ...a
  } = r, c = b.useContext(On), d = {
    ...r,
    disableGutters: c.disableGutters
  }, p = bS(d);
  return /* @__PURE__ */ l(yS, {
    as: s,
    className: de(p.root, i),
    ownerState: d,
    ref: o,
    ...a
  });
});
process.env.NODE_ENV !== "production" && (Pl.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component, normally an `IconButton` or selection control.
   */
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: n.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object])
});
Pl.muiName = "ListItemSecondaryAction";
const vS = (e, t) => {
  const {
    ownerState: o
  } = e;
  return [t.root, o.dense && t.dense, o.alignItems === "flex-start" && t.alignItemsFlexStart, o.divider && t.divider, !o.disableGutters && t.gutters, !o.disablePadding && t.padding];
}, xS = (e) => {
  const {
    alignItems: t,
    classes: o,
    dense: r,
    disableGutters: i,
    disablePadding: s,
    divider: a
  } = e;
  return Te({
    root: ["root", r && "dense", !i && "gutters", !s && "padding", a && "divider", t === "flex-start" && "alignItemsFlexStart"],
    secondaryAction: ["secondaryAction"]
  }, uS, o);
}, SS = J("div", {
  name: "MuiListItem",
  slot: "Root",
  overridesResolver: vS
})(Pe(({
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
      [`& > .${Ho.root}`]: {
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
}))), CS = J(Pl, {
  name: "MuiListItem",
  slot: "secondaryAction"
})({}), Nf = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiListItem"
  }), {
    alignItems: i = "center",
    children: s,
    className: a,
    component: c = "li",
    dense: d = !1,
    disableGutters: p = !1,
    disablePadding: m = !1,
    divider: y = !1,
    secondaryAction: x,
    slotProps: f = {},
    slots: v = {},
    ...h
  } = r, w = b.useContext(On), O = b.useMemo(() => ({
    dense: d || w.dense || !1,
    alignItems: i,
    disableGutters: p
  }), [i, w.dense, d, p]), k = {
    ...r,
    alignItems: i,
    dense: O.dense,
    disableGutters: p,
    disablePadding: m,
    divider: y,
    secondaryAction: x
  }, E = xS(k), C = {
    slots: v,
    slotProps: f
  }, [S, N] = be("root", {
    ref: o,
    elementType: SS,
    externalForwardedProps: {
      component: c,
      ...C,
      ...h
    },
    ownerState: k,
    className: de(E.root, a)
  }), [A, _] = be("secondaryAction", {
    elementType: CS,
    shouldForwardComponentProp: !0,
    externalForwardedProps: C,
    ownerState: k,
    className: E.secondaryAction
  });
  return /* @__PURE__ */ l(On.Provider, {
    value: O,
    children: /* @__PURE__ */ T(S, {
      ...N,
      children: [s, x && /* @__PURE__ */ l(A, {
        ..._,
        children: x
      })]
    })
  });
});
process.env.NODE_ENV !== "production" && (Nf.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Defines the `align-items` style property.
   * @default 'center'
   */
  alignItems: n.oneOf(["center", "flex-start"]),
  /**
   * The content of the component.
   */
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: n.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * The prop defaults to the value inherited from the parent List component.
   * @default false
   */
  dense: n.bool,
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: n.bool,
  /**
   * If `true`, all padding is removed.
   * @default false
   */
  disablePadding: n.bool,
  /**
   * If `true`, a 1px light border is added to the bottom of the list item.
   * @default false
   */
  divider: n.bool,
  /**
   * The element to display at the end of ListItem.
   */
  secondaryAction: n.node,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: n.shape({
    root: n.object,
    secondaryAction: n.oneOfType([n.func, n.object])
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: n.shape({
    root: n.elementType,
    secondaryAction: n.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object])
});
var Yt = "top", mn = "bottom", hn = "right", Xt = "left", Il = "auto", ci = [Yt, mn, hn, Xt], sr = "start", ei = "end", wS = "clippingParents", kf = "viewport", kr = "popper", TS = "reference", qd = /* @__PURE__ */ ci.reduce(function(e, t) {
  return e.concat([t + "-" + sr, t + "-" + ei]);
}, []), Pf = /* @__PURE__ */ [].concat(ci, [Il]).reduce(function(e, t) {
  return e.concat([t, t + "-" + sr, t + "-" + ei]);
}, []), ES = "beforeRead", OS = "read", RS = "afterRead", NS = "beforeMain", kS = "main", PS = "afterMain", IS = "beforeWrite", $S = "write", MS = "afterWrite", AS = [ES, OS, RS, NS, kS, PS, IS, $S, MS];
function Vn(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function rn(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function No(e) {
  var t = rn(e).Element;
  return e instanceof t || e instanceof Element;
}
function fn(e) {
  var t = rn(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function $l(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = rn(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function _S(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(o) {
    var r = t.styles[o] || {}, i = t.attributes[o] || {}, s = t.elements[o];
    !fn(s) || !Vn(s) || (Object.assign(s.style, r), Object.keys(i).forEach(function(a) {
      var c = i[a];
      c === !1 ? s.removeAttribute(a) : s.setAttribute(a, c === !0 ? "" : c);
    }));
  });
}
function DS(e) {
  var t = e.state, o = {
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
  return Object.assign(t.elements.popper.style, o.popper), t.styles = o, t.elements.arrow && Object.assign(t.elements.arrow.style, o.arrow), function() {
    Object.keys(t.elements).forEach(function(r) {
      var i = t.elements[r], s = t.attributes[r] || {}, a = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : o[r]), c = a.reduce(function(d, p) {
        return d[p] = "", d;
      }, {});
      !fn(i) || !Vn(i) || (Object.assign(i.style, c), Object.keys(s).forEach(function(d) {
        i.removeAttribute(d);
      }));
    });
  };
}
const LS = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: _S,
  effect: DS,
  requires: ["computeStyles"]
};
function Wn(e) {
  return e.split("-")[0];
}
var To = Math.max, fs = Math.min, ar = Math.round;
function qa() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function If() {
  return !/^((?!chrome|android).)*safari/i.test(qa());
}
function lr(e, t, o) {
  t === void 0 && (t = !1), o === void 0 && (o = !1);
  var r = e.getBoundingClientRect(), i = 1, s = 1;
  t && fn(e) && (i = e.offsetWidth > 0 && ar(r.width) / e.offsetWidth || 1, s = e.offsetHeight > 0 && ar(r.height) / e.offsetHeight || 1);
  var a = No(e) ? rn(e) : window, c = a.visualViewport, d = !If() && o, p = (r.left + (d && c ? c.offsetLeft : 0)) / i, m = (r.top + (d && c ? c.offsetTop : 0)) / s, y = r.width / i, x = r.height / s;
  return {
    width: y,
    height: x,
    top: m,
    right: p + y,
    bottom: m + x,
    left: p,
    x: p,
    y: m
  };
}
function Ml(e) {
  var t = lr(e), o = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - o) <= 1 && (o = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: o,
    height: r
  };
}
function $f(e, t) {
  var o = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (o && $l(o)) {
    var r = t;
    do {
      if (r && e.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function oo(e) {
  return rn(e).getComputedStyle(e);
}
function BS(e) {
  return ["table", "td", "th"].indexOf(Vn(e)) >= 0;
}
function po(e) {
  return ((No(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function Xs(e) {
  return Vn(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    ($l(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    po(e)
  );
}
function Kd(e) {
  return !fn(e) || // https://github.com/popperjs/popper-core/issues/837
  oo(e).position === "fixed" ? null : e.offsetParent;
}
function FS(e) {
  var t = /firefox/i.test(qa()), o = /Trident/i.test(qa());
  if (o && fn(e)) {
    var r = oo(e);
    if (r.position === "fixed")
      return null;
  }
  var i = Xs(e);
  for ($l(i) && (i = i.host); fn(i) && ["html", "body"].indexOf(Vn(i)) < 0; ) {
    var s = oo(i);
    if (s.transform !== "none" || s.perspective !== "none" || s.contain === "paint" || ["transform", "perspective"].indexOf(s.willChange) !== -1 || t && s.willChange === "filter" || t && s.filter && s.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function di(e) {
  for (var t = rn(e), o = Kd(e); o && BS(o) && oo(o).position === "static"; )
    o = Kd(o);
  return o && (Vn(o) === "html" || Vn(o) === "body" && oo(o).position === "static") ? t : o || FS(e) || t;
}
function Al(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function Wr(e, t, o) {
  return To(e, fs(t, o));
}
function jS(e, t, o) {
  var r = Wr(e, t, o);
  return r > o ? o : r;
}
function Mf() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Af(e) {
  return Object.assign({}, Mf(), e);
}
function _f(e, t) {
  return t.reduce(function(o, r) {
    return o[r] = e, o;
  }, {});
}
var WS = function(t, o) {
  return t = typeof t == "function" ? t(Object.assign({}, o.rects, {
    placement: o.placement
  })) : t, Af(typeof t != "number" ? t : _f(t, ci));
};
function zS(e) {
  var t, o = e.state, r = e.name, i = e.options, s = o.elements.arrow, a = o.modifiersData.popperOffsets, c = Wn(o.placement), d = Al(c), p = [Xt, hn].indexOf(c) >= 0, m = p ? "height" : "width";
  if (!(!s || !a)) {
    var y = WS(i.padding, o), x = Ml(s), f = d === "y" ? Yt : Xt, v = d === "y" ? mn : hn, h = o.rects.reference[m] + o.rects.reference[d] - a[d] - o.rects.popper[m], w = a[d] - o.rects.reference[d], O = di(s), k = O ? d === "y" ? O.clientHeight || 0 : O.clientWidth || 0 : 0, E = h / 2 - w / 2, C = y[f], S = k - x[m] - y[v], N = k / 2 - x[m] / 2 + E, A = Wr(C, N, S), _ = d;
    o.modifiersData[r] = (t = {}, t[_] = A, t.centerOffset = A - N, t);
  }
}
function VS(e) {
  var t = e.state, o = e.options, r = o.element, i = r === void 0 ? "[data-popper-arrow]" : r;
  i != null && (typeof i == "string" && (i = t.elements.popper.querySelector(i), !i) || $f(t.elements.popper, i) && (t.elements.arrow = i));
}
const US = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: zS,
  effect: VS,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function cr(e) {
  return e.split("-")[1];
}
var HS = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function GS(e, t) {
  var o = e.x, r = e.y, i = t.devicePixelRatio || 1;
  return {
    x: ar(o * i) / i || 0,
    y: ar(r * i) / i || 0
  };
}
function Yd(e) {
  var t, o = e.popper, r = e.popperRect, i = e.placement, s = e.variation, a = e.offsets, c = e.position, d = e.gpuAcceleration, p = e.adaptive, m = e.roundOffsets, y = e.isFixed, x = a.x, f = x === void 0 ? 0 : x, v = a.y, h = v === void 0 ? 0 : v, w = typeof m == "function" ? m({
    x: f,
    y: h
  }) : {
    x: f,
    y: h
  };
  f = w.x, h = w.y;
  var O = a.hasOwnProperty("x"), k = a.hasOwnProperty("y"), E = Xt, C = Yt, S = window;
  if (p) {
    var N = di(o), A = "clientHeight", _ = "clientWidth";
    if (N === rn(o) && (N = po(o), oo(N).position !== "static" && c === "absolute" && (A = "scrollHeight", _ = "scrollWidth")), N = N, i === Yt || (i === Xt || i === hn) && s === ei) {
      C = mn;
      var D = y && N === S && S.visualViewport ? S.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        N[A]
      );
      h -= D - r.height, h *= d ? 1 : -1;
    }
    if (i === Xt || (i === Yt || i === mn) && s === ei) {
      E = hn;
      var F = y && N === S && S.visualViewport ? S.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        N[_]
      );
      f -= F - r.width, f *= d ? 1 : -1;
    }
  }
  var P = Object.assign({
    position: c
  }, p && HS), g = m === !0 ? GS({
    x: f,
    y: h
  }, rn(o)) : {
    x: f,
    y: h
  };
  if (f = g.x, h = g.y, d) {
    var $;
    return Object.assign({}, P, ($ = {}, $[C] = k ? "0" : "", $[E] = O ? "0" : "", $.transform = (S.devicePixelRatio || 1) <= 1 ? "translate(" + f + "px, " + h + "px)" : "translate3d(" + f + "px, " + h + "px, 0)", $));
  }
  return Object.assign({}, P, (t = {}, t[C] = k ? h + "px" : "", t[E] = O ? f + "px" : "", t.transform = "", t));
}
function qS(e) {
  var t = e.state, o = e.options, r = o.gpuAcceleration, i = r === void 0 ? !0 : r, s = o.adaptive, a = s === void 0 ? !0 : s, c = o.roundOffsets, d = c === void 0 ? !0 : c, p = {
    placement: Wn(t.placement),
    variation: cr(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: i,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Yd(Object.assign({}, p, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: a,
    roundOffsets: d
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Yd(Object.assign({}, p, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: d
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const KS = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: qS,
  data: {}
};
var Mi = {
  passive: !0
};
function YS(e) {
  var t = e.state, o = e.instance, r = e.options, i = r.scroll, s = i === void 0 ? !0 : i, a = r.resize, c = a === void 0 ? !0 : a, d = rn(t.elements.popper), p = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return s && p.forEach(function(m) {
    m.addEventListener("scroll", o.update, Mi);
  }), c && d.addEventListener("resize", o.update, Mi), function() {
    s && p.forEach(function(m) {
      m.removeEventListener("scroll", o.update, Mi);
    }), c && d.removeEventListener("resize", o.update, Mi);
  };
}
const XS = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: YS,
  data: {}
};
var JS = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Ki(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return JS[t];
  });
}
var QS = {
  start: "end",
  end: "start"
};
function Xd(e) {
  return e.replace(/start|end/g, function(t) {
    return QS[t];
  });
}
function _l(e) {
  var t = rn(e), o = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: o,
    scrollTop: r
  };
}
function Dl(e) {
  return lr(po(e)).left + _l(e).scrollLeft;
}
function ZS(e, t) {
  var o = rn(e), r = po(e), i = o.visualViewport, s = r.clientWidth, a = r.clientHeight, c = 0, d = 0;
  if (i) {
    s = i.width, a = i.height;
    var p = If();
    (p || !p && t === "fixed") && (c = i.offsetLeft, d = i.offsetTop);
  }
  return {
    width: s,
    height: a,
    x: c + Dl(e),
    y: d
  };
}
function eC(e) {
  var t, o = po(e), r = _l(e), i = (t = e.ownerDocument) == null ? void 0 : t.body, s = To(o.scrollWidth, o.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), a = To(o.scrollHeight, o.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), c = -r.scrollLeft + Dl(e), d = -r.scrollTop;
  return oo(i || o).direction === "rtl" && (c += To(o.clientWidth, i ? i.clientWidth : 0) - s), {
    width: s,
    height: a,
    x: c,
    y: d
  };
}
function Ll(e) {
  var t = oo(e), o = t.overflow, r = t.overflowX, i = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(o + i + r);
}
function Df(e) {
  return ["html", "body", "#document"].indexOf(Vn(e)) >= 0 ? e.ownerDocument.body : fn(e) && Ll(e) ? e : Df(Xs(e));
}
function zr(e, t) {
  var o;
  t === void 0 && (t = []);
  var r = Df(e), i = r === ((o = e.ownerDocument) == null ? void 0 : o.body), s = rn(r), a = i ? [s].concat(s.visualViewport || [], Ll(r) ? r : []) : r, c = t.concat(a);
  return i ? c : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    c.concat(zr(Xs(a)))
  );
}
function Ka(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function tC(e, t) {
  var o = lr(e, !1, t === "fixed");
  return o.top = o.top + e.clientTop, o.left = o.left + e.clientLeft, o.bottom = o.top + e.clientHeight, o.right = o.left + e.clientWidth, o.width = e.clientWidth, o.height = e.clientHeight, o.x = o.left, o.y = o.top, o;
}
function Jd(e, t, o) {
  return t === kf ? Ka(ZS(e, o)) : No(t) ? tC(t, o) : Ka(eC(po(e)));
}
function nC(e) {
  var t = zr(Xs(e)), o = ["absolute", "fixed"].indexOf(oo(e).position) >= 0, r = o && fn(e) ? di(e) : e;
  return No(r) ? t.filter(function(i) {
    return No(i) && $f(i, r) && Vn(i) !== "body";
  }) : [];
}
function oC(e, t, o, r) {
  var i = t === "clippingParents" ? nC(e) : [].concat(t), s = [].concat(i, [o]), a = s[0], c = s.reduce(function(d, p) {
    var m = Jd(e, p, r);
    return d.top = To(m.top, d.top), d.right = fs(m.right, d.right), d.bottom = fs(m.bottom, d.bottom), d.left = To(m.left, d.left), d;
  }, Jd(e, a, r));
  return c.width = c.right - c.left, c.height = c.bottom - c.top, c.x = c.left, c.y = c.top, c;
}
function Lf(e) {
  var t = e.reference, o = e.element, r = e.placement, i = r ? Wn(r) : null, s = r ? cr(r) : null, a = t.x + t.width / 2 - o.width / 2, c = t.y + t.height / 2 - o.height / 2, d;
  switch (i) {
    case Yt:
      d = {
        x: a,
        y: t.y - o.height
      };
      break;
    case mn:
      d = {
        x: a,
        y: t.y + t.height
      };
      break;
    case hn:
      d = {
        x: t.x + t.width,
        y: c
      };
      break;
    case Xt:
      d = {
        x: t.x - o.width,
        y: c
      };
      break;
    default:
      d = {
        x: t.x,
        y: t.y
      };
  }
  var p = i ? Al(i) : null;
  if (p != null) {
    var m = p === "y" ? "height" : "width";
    switch (s) {
      case sr:
        d[p] = d[p] - (t[m] / 2 - o[m] / 2);
        break;
      case ei:
        d[p] = d[p] + (t[m] / 2 - o[m] / 2);
        break;
    }
  }
  return d;
}
function ti(e, t) {
  t === void 0 && (t = {});
  var o = t, r = o.placement, i = r === void 0 ? e.placement : r, s = o.strategy, a = s === void 0 ? e.strategy : s, c = o.boundary, d = c === void 0 ? wS : c, p = o.rootBoundary, m = p === void 0 ? kf : p, y = o.elementContext, x = y === void 0 ? kr : y, f = o.altBoundary, v = f === void 0 ? !1 : f, h = o.padding, w = h === void 0 ? 0 : h, O = Af(typeof w != "number" ? w : _f(w, ci)), k = x === kr ? TS : kr, E = e.rects.popper, C = e.elements[v ? k : x], S = oC(No(C) ? C : C.contextElement || po(e.elements.popper), d, m, a), N = lr(e.elements.reference), A = Lf({
    reference: N,
    element: E,
    placement: i
  }), _ = Ka(Object.assign({}, E, A)), D = x === kr ? _ : N, F = {
    top: S.top - D.top + O.top,
    bottom: D.bottom - S.bottom + O.bottom,
    left: S.left - D.left + O.left,
    right: D.right - S.right + O.right
  }, P = e.modifiersData.offset;
  if (x === kr && P) {
    var g = P[i];
    Object.keys(F).forEach(function($) {
      var I = [hn, mn].indexOf($) >= 0 ? 1 : -1, M = [Yt, mn].indexOf($) >= 0 ? "y" : "x";
      F[$] += g[M] * I;
    });
  }
  return F;
}
function rC(e, t) {
  t === void 0 && (t = {});
  var o = t, r = o.placement, i = o.boundary, s = o.rootBoundary, a = o.padding, c = o.flipVariations, d = o.allowedAutoPlacements, p = d === void 0 ? Pf : d, m = cr(r), y = m ? c ? qd : qd.filter(function(v) {
    return cr(v) === m;
  }) : ci, x = y.filter(function(v) {
    return p.indexOf(v) >= 0;
  });
  x.length === 0 && (x = y);
  var f = x.reduce(function(v, h) {
    return v[h] = ti(e, {
      placement: h,
      boundary: i,
      rootBoundary: s,
      padding: a
    })[Wn(h)], v;
  }, {});
  return Object.keys(f).sort(function(v, h) {
    return f[v] - f[h];
  });
}
function iC(e) {
  if (Wn(e) === Il)
    return [];
  var t = Ki(e);
  return [Xd(e), t, Xd(t)];
}
function sC(e) {
  var t = e.state, o = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var i = o.mainAxis, s = i === void 0 ? !0 : i, a = o.altAxis, c = a === void 0 ? !0 : a, d = o.fallbackPlacements, p = o.padding, m = o.boundary, y = o.rootBoundary, x = o.altBoundary, f = o.flipVariations, v = f === void 0 ? !0 : f, h = o.allowedAutoPlacements, w = t.options.placement, O = Wn(w), k = O === w, E = d || (k || !v ? [Ki(w)] : iC(w)), C = [w].concat(E).reduce(function(te, re) {
      return te.concat(Wn(re) === Il ? rC(t, {
        placement: re,
        boundary: m,
        rootBoundary: y,
        padding: p,
        flipVariations: v,
        allowedAutoPlacements: h
      }) : re);
    }, []), S = t.rects.reference, N = t.rects.popper, A = /* @__PURE__ */ new Map(), _ = !0, D = C[0], F = 0; F < C.length; F++) {
      var P = C[F], g = Wn(P), $ = cr(P) === sr, I = [Yt, mn].indexOf(g) >= 0, M = I ? "width" : "height", B = ti(t, {
        placement: P,
        boundary: m,
        rootBoundary: y,
        altBoundary: x,
        padding: p
      }), W = I ? $ ? hn : Xt : $ ? mn : Yt;
      S[M] > N[M] && (W = Ki(W));
      var G = Ki(W), oe = [];
      if (s && oe.push(B[g] <= 0), c && oe.push(B[W] <= 0, B[G] <= 0), oe.every(function(te) {
        return te;
      })) {
        D = P, _ = !1;
        break;
      }
      A.set(P, oe);
    }
    if (_)
      for (var z = v ? 3 : 1, V = function(re) {
        var ee = C.find(function(K) {
          var U = A.get(K);
          if (U)
            return U.slice(0, re).every(function(X) {
              return X;
            });
        });
        if (ee)
          return D = ee, "break";
      }, Y = z; Y > 0; Y--) {
        var ne = V(Y);
        if (ne === "break") break;
      }
    t.placement !== D && (t.modifiersData[r]._skip = !0, t.placement = D, t.reset = !0);
  }
}
const aC = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: sC,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Qd(e, t, o) {
  return o === void 0 && (o = {
    x: 0,
    y: 0
  }), {
    top: e.top - t.height - o.y,
    right: e.right - t.width + o.x,
    bottom: e.bottom - t.height + o.y,
    left: e.left - t.width - o.x
  };
}
function Zd(e) {
  return [Yt, hn, mn, Xt].some(function(t) {
    return e[t] >= 0;
  });
}
function lC(e) {
  var t = e.state, o = e.name, r = t.rects.reference, i = t.rects.popper, s = t.modifiersData.preventOverflow, a = ti(t, {
    elementContext: "reference"
  }), c = ti(t, {
    altBoundary: !0
  }), d = Qd(a, r), p = Qd(c, i, s), m = Zd(d), y = Zd(p);
  t.modifiersData[o] = {
    referenceClippingOffsets: d,
    popperEscapeOffsets: p,
    isReferenceHidden: m,
    hasPopperEscaped: y
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": m,
    "data-popper-escaped": y
  });
}
const cC = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: lC
};
function dC(e, t, o) {
  var r = Wn(e), i = [Xt, Yt].indexOf(r) >= 0 ? -1 : 1, s = typeof o == "function" ? o(Object.assign({}, t, {
    placement: e
  })) : o, a = s[0], c = s[1];
  return a = a || 0, c = (c || 0) * i, [Xt, hn].indexOf(r) >= 0 ? {
    x: c,
    y: a
  } : {
    x: a,
    y: c
  };
}
function uC(e) {
  var t = e.state, o = e.options, r = e.name, i = o.offset, s = i === void 0 ? [0, 0] : i, a = Pf.reduce(function(m, y) {
    return m[y] = dC(y, t.rects, s), m;
  }, {}), c = a[t.placement], d = c.x, p = c.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += d, t.modifiersData.popperOffsets.y += p), t.modifiersData[r] = a;
}
const pC = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: uC
};
function fC(e) {
  var t = e.state, o = e.name;
  t.modifiersData[o] = Lf({
    reference: t.rects.reference,
    element: t.rects.popper,
    placement: t.placement
  });
}
const mC = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: fC,
  data: {}
};
function hC(e) {
  return e === "x" ? "y" : "x";
}
function gC(e) {
  var t = e.state, o = e.options, r = e.name, i = o.mainAxis, s = i === void 0 ? !0 : i, a = o.altAxis, c = a === void 0 ? !1 : a, d = o.boundary, p = o.rootBoundary, m = o.altBoundary, y = o.padding, x = o.tether, f = x === void 0 ? !0 : x, v = o.tetherOffset, h = v === void 0 ? 0 : v, w = ti(t, {
    boundary: d,
    rootBoundary: p,
    padding: y,
    altBoundary: m
  }), O = Wn(t.placement), k = cr(t.placement), E = !k, C = Al(O), S = hC(C), N = t.modifiersData.popperOffsets, A = t.rects.reference, _ = t.rects.popper, D = typeof h == "function" ? h(Object.assign({}, t.rects, {
    placement: t.placement
  })) : h, F = typeof D == "number" ? {
    mainAxis: D,
    altAxis: D
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, D), P = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, g = {
    x: 0,
    y: 0
  };
  if (N) {
    if (s) {
      var $, I = C === "y" ? Yt : Xt, M = C === "y" ? mn : hn, B = C === "y" ? "height" : "width", W = N[C], G = W + w[I], oe = W - w[M], z = f ? -_[B] / 2 : 0, V = k === sr ? A[B] : _[B], Y = k === sr ? -_[B] : -A[B], ne = t.elements.arrow, te = f && ne ? Ml(ne) : {
        width: 0,
        height: 0
      }, re = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Mf(), ee = re[I], K = re[M], U = Wr(0, A[B], te[B]), X = E ? A[B] / 2 - z - U - ee - F.mainAxis : V - U - ee - F.mainAxis, Z = E ? -A[B] / 2 + z + U + K + F.mainAxis : Y + U + K + F.mainAxis, ae = t.elements.arrow && di(t.elements.arrow), j = ae ? C === "y" ? ae.clientTop || 0 : ae.clientLeft || 0 : 0, me = ($ = P == null ? void 0 : P[C]) != null ? $ : 0, Q = W + X - me - j, fe = W + Z - me, Ie = Wr(f ? fs(G, Q) : G, W, f ? To(oe, fe) : oe);
      N[C] = Ie, g[C] = Ie - W;
    }
    if (c) {
      var xe, Be = C === "x" ? Yt : Xt, ye = C === "x" ? mn : hn, Ge = N[S], Me = S === "y" ? "height" : "width", Fe = Ge + w[Be], rt = Ge - w[ye], ke = [Yt, Xt].indexOf(O) !== -1, Ue = (xe = P == null ? void 0 : P[S]) != null ? xe : 0, ut = ke ? Fe : Ge - A[Me] - _[Me] - Ue + F.altAxis, De = ke ? Ge + A[Me] + _[Me] - Ue - F.altAxis : rt, tt = f && ke ? jS(ut, Ge, De) : Wr(f ? ut : Fe, Ge, f ? De : rt);
      N[S] = tt, g[S] = tt - Ge;
    }
    t.modifiersData[r] = g;
  }
}
const bC = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: gC,
  requiresIfExists: ["offset"]
};
function yC(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function vC(e) {
  return e === rn(e) || !fn(e) ? _l(e) : yC(e);
}
function xC(e) {
  var t = e.getBoundingClientRect(), o = ar(t.width) / e.offsetWidth || 1, r = ar(t.height) / e.offsetHeight || 1;
  return o !== 1 || r !== 1;
}
function SC(e, t, o) {
  o === void 0 && (o = !1);
  var r = fn(t), i = fn(t) && xC(t), s = po(t), a = lr(e, i, o), c = {
    scrollLeft: 0,
    scrollTop: 0
  }, d = {
    x: 0,
    y: 0
  };
  return (r || !r && !o) && ((Vn(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Ll(s)) && (c = vC(t)), fn(t) ? (d = lr(t, !0), d.x += t.clientLeft, d.y += t.clientTop) : s && (d.x = Dl(s))), {
    x: a.left + c.scrollLeft - d.x,
    y: a.top + c.scrollTop - d.y,
    width: a.width,
    height: a.height
  };
}
function CC(e) {
  var t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Set(), r = [];
  e.forEach(function(s) {
    t.set(s.name, s);
  });
  function i(s) {
    o.add(s.name);
    var a = [].concat(s.requires || [], s.requiresIfExists || []);
    a.forEach(function(c) {
      if (!o.has(c)) {
        var d = t.get(c);
        d && i(d);
      }
    }), r.push(s);
  }
  return e.forEach(function(s) {
    o.has(s.name) || i(s);
  }), r;
}
function wC(e) {
  var t = CC(e);
  return AS.reduce(function(o, r) {
    return o.concat(t.filter(function(i) {
      return i.phase === r;
    }));
  }, []);
}
function TC(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(o) {
      Promise.resolve().then(function() {
        t = void 0, o(e());
      });
    })), t;
  };
}
function EC(e) {
  var t = e.reduce(function(o, r) {
    var i = o[r.name];
    return o[r.name] = i ? Object.assign({}, i, r, {
      options: Object.assign({}, i.options, r.options),
      data: Object.assign({}, i.data, r.data)
    }) : r, o;
  }, {});
  return Object.keys(t).map(function(o) {
    return t[o];
  });
}
var eu = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function tu() {
  for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++)
    t[o] = arguments[o];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function OC(e) {
  e === void 0 && (e = {});
  var t = e, o = t.defaultModifiers, r = o === void 0 ? [] : o, i = t.defaultOptions, s = i === void 0 ? eu : i;
  return function(c, d, p) {
    p === void 0 && (p = s);
    var m = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, eu, s),
      modifiersData: {},
      elements: {
        reference: c,
        popper: d
      },
      attributes: {},
      styles: {}
    }, y = [], x = !1, f = {
      state: m,
      setOptions: function(O) {
        var k = typeof O == "function" ? O(m.options) : O;
        h(), m.options = Object.assign({}, s, m.options, k), m.scrollParents = {
          reference: No(c) ? zr(c) : c.contextElement ? zr(c.contextElement) : [],
          popper: zr(d)
        };
        var E = wC(EC([].concat(r, m.options.modifiers)));
        return m.orderedModifiers = E.filter(function(C) {
          return C.enabled;
        }), v(), f.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!x) {
          var O = m.elements, k = O.reference, E = O.popper;
          if (tu(k, E)) {
            m.rects = {
              reference: SC(k, di(E), m.options.strategy === "fixed"),
              popper: Ml(E)
            }, m.reset = !1, m.placement = m.options.placement, m.orderedModifiers.forEach(function(F) {
              return m.modifiersData[F.name] = Object.assign({}, F.data);
            });
            for (var C = 0; C < m.orderedModifiers.length; C++) {
              if (m.reset === !0) {
                m.reset = !1, C = -1;
                continue;
              }
              var S = m.orderedModifiers[C], N = S.fn, A = S.options, _ = A === void 0 ? {} : A, D = S.name;
              typeof N == "function" && (m = N({
                state: m,
                options: _,
                name: D,
                instance: f
              }) || m);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: TC(function() {
        return new Promise(function(w) {
          f.forceUpdate(), w(m);
        });
      }),
      destroy: function() {
        h(), x = !0;
      }
    };
    if (!tu(c, d))
      return f;
    f.setOptions(p).then(function(w) {
      !x && p.onFirstUpdate && p.onFirstUpdate(w);
    });
    function v() {
      m.orderedModifiers.forEach(function(w) {
        var O = w.name, k = w.options, E = k === void 0 ? {} : k, C = w.effect;
        if (typeof C == "function") {
          var S = C({
            state: m,
            name: O,
            instance: f,
            options: E
          }), N = function() {
          };
          y.push(S || N);
        }
      });
    }
    function h() {
      y.forEach(function(w) {
        return w();
      }), y = [];
    }
    return f;
  };
}
var RC = [XS, mC, KS, LS, pC, aC, bC, US, cC], NC = /* @__PURE__ */ OC({
  defaultModifiers: RC
});
function kC(e) {
  return Se("MuiPopper", e);
}
we("MuiPopper", ["root"]);
function PC(e, t) {
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
function ms(e) {
  return typeof e == "function" ? e() : e;
}
function Js(e) {
  return e.nodeType !== void 0;
}
function IC(e) {
  return !Js(e);
}
const $C = (e) => {
  const {
    classes: t
  } = e;
  return Te({
    root: ["root"]
  }, kC, t);
}, MC = {}, AC = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const {
    anchorEl: r,
    children: i,
    direction: s,
    disablePortal: a,
    modifiers: c,
    open: d,
    placement: p,
    popperOptions: m,
    popperRef: y,
    slotProps: x = {},
    slots: f = {},
    TransitionProps: v,
    // @ts-ignore internal logic
    ownerState: h,
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
    ...w
  } = t, O = b.useRef(null), k = gt(O, o), E = b.useRef(null), C = gt(E, y), S = b.useRef(C);
  Nt(() => {
    S.current = C;
  }, [C]), b.useImperativeHandle(y, () => E.current, []);
  const N = PC(p, s), [A, _] = b.useState(N), [D, F] = b.useState(ms(r));
  b.useEffect(() => {
    E.current && E.current.forceUpdate();
  }), b.useEffect(() => {
    r && F(ms(r));
  }, [r]), Nt(() => {
    if (!D || !d)
      return;
    const M = (oe) => {
      _(oe.placement);
    };
    if (process.env.NODE_ENV !== "production" && D && Js(D) && D.nodeType === 1) {
      const oe = D.getBoundingClientRect();
      li() && oe.top === 0 && oe.left === 0 && oe.right === 0 && oe.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    let B = [{
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
        state: oe
      }) => {
        M(oe);
      }
    }];
    c != null && (B = B.concat(c)), m && m.modifiers != null && (B = B.concat(m.modifiers));
    const W = NC(D, O.current, {
      placement: N,
      ...m,
      modifiers: B
    });
    S.current(W);
    const G = O.current;
    return () => {
      if (G) {
        const {
          style: oe
        } = G, z = oe.position, V = oe.top, Y = oe.left, ne = oe.transform;
        W.destroy(), oe.position = z, oe.top = V, oe.left = Y, oe.transform = ne;
      } else
        W.destroy();
      S.current(null);
    };
  }, [D, a, c, d, m, N]);
  const P = {
    placement: A
  };
  v !== null && (P.TransitionProps = v);
  const g = $C(t), $ = f.root ?? "div", I = or({
    elementType: $,
    externalSlotProps: x.root,
    externalForwardedProps: w,
    additionalProps: {
      role: "tooltip",
      ref: k
    },
    ownerState: t,
    className: g.root
  });
  return /* @__PURE__ */ l($, {
    ...I,
    children: typeof i == "function" ? i(P) : i
  });
}), Bf = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const {
    anchorEl: r,
    children: i,
    container: s,
    direction: a = "ltr",
    disablePortal: c = !1,
    keepMounted: d = !1,
    modifiers: p,
    open: m,
    placement: y = "bottom",
    popperOptions: x = MC,
    popperRef: f,
    style: v,
    transition: h = !1,
    slotProps: w = {},
    slots: O = {},
    ...k
  } = t, [E, C] = b.useState(!0), S = () => {
    C(!1);
  }, N = () => {
    C(!0);
  };
  if (!d && !m && (!h || E))
    return null;
  let A;
  if (s)
    A = s;
  else if (r) {
    const F = ms(r);
    A = F && Js(F) ? kt(F).body : kt(null).body;
  }
  const _ = !m && d && (!h || E) ? "none" : void 0, D = h ? {
    in: m,
    onEnter: S,
    onExited: N
  } : void 0;
  return /* @__PURE__ */ l(Xr, {
    disablePortal: c,
    container: A,
    children: /* @__PURE__ */ l(AC, {
      anchorEl: r,
      direction: a,
      disablePortal: c,
      modifiers: p,
      ref: o,
      open: h ? !E : m,
      placement: y,
      popperOptions: x,
      popperRef: f,
      slotProps: w,
      slots: O,
      ...k,
      style: {
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: _,
        ...v
      },
      TransitionProps: D,
      children: i
    })
  });
});
process.env.NODE_ENV !== "production" && (Bf.propTypes = {
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
  anchorEl: Un(n.oneOfType([no, n.object, n.func]), (e) => {
    if (e.open) {
      const t = ms(e.anchorEl);
      if (t && Js(t) && t.nodeType === 1) {
        const o = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "production" && li() && o.top === 0 && o.left === 0 && o.right === 0 && o.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || IC(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
        return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "It should be an HTML element instance or a virtualElement ", "(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`));
    }
    return null;
  }),
  /**
   * Popper render function or node.
   */
  children: n.oneOfType([n.node, n.func]),
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
  container: n.oneOfType([no, n.func]),
  /**
   * Direction of the text.
   * @default 'ltr'
   */
  direction: n.oneOf(["ltr", "rtl"]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: n.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: n.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: n.arrayOf(n.shape({
    data: n.object,
    effect: n.func,
    enabled: n.bool,
    fn: n.func,
    name: n.any,
    options: n.object,
    phase: n.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: n.arrayOf(n.string),
    requiresIfExists: n.arrayOf(n.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: n.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: n.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: n.shape({
    modifiers: n.array,
    onFirstUpdate: n.func,
    placement: n.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: n.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: bn,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: n.shape({
    root: n.oneOfType([n.func, n.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: n.shape({
    root: n.elementType
  }),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: n.bool
});
const _C = J(Bf, {
  name: "MuiPopper",
  slot: "Root"
})({}), Bl = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ds(), i = Ee({
    props: t,
    name: "MuiPopper"
  }), {
    anchorEl: s,
    component: a,
    container: c,
    disablePortal: d,
    keepMounted: p,
    modifiers: m,
    open: y,
    placement: x,
    popperOptions: f,
    popperRef: v,
    transition: h,
    slots: w,
    slotProps: O,
    ...k
  } = i, E = {
    anchorEl: s,
    container: c,
    disablePortal: d,
    keepMounted: p,
    modifiers: m,
    open: y,
    placement: x,
    popperOptions: f,
    popperRef: v,
    transition: h,
    ...k
  };
  return /* @__PURE__ */ l(_C, {
    as: a,
    direction: r ? "rtl" : "ltr",
    slots: w,
    slotProps: O,
    ...E,
    ref: o
  });
});
process.env.NODE_ENV !== "production" && (Bl.propTypes = {
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
  anchorEl: n.oneOfType([no, n.object, n.func]),
  /**
   * Popper render function or node.
   */
  children: n.oneOfType([n.node, n.func]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: n.elementType,
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
  container: n.oneOfType([no, n.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: n.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: n.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: n.arrayOf(n.shape({
    data: n.object,
    effect: n.func,
    enabled: n.bool,
    fn: n.func,
    name: n.any,
    options: n.object,
    phase: n.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: n.arrayOf(n.string),
    requiresIfExists: n.arrayOf(n.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: n.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: n.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: n.shape({
    modifiers: n.array,
    onFirstUpdate: n.func,
    placement: n.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: n.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: bn,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: n.shape({
    root: n.oneOfType([n.func, n.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: n.shape({
    root: n.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: n.bool
});
function DC(e) {
  return Se("MuiTooltip", e);
}
const dn = we("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]);
function LC(e) {
  return Math.round(e * 1e5) / 1e5;
}
const BC = (e) => {
  const {
    classes: t,
    disableInteractive: o,
    arrow: r,
    touch: i,
    placement: s
  } = e, a = {
    popper: ["popper", !o && "popperInteractive", r && "popperArrow"],
    tooltip: ["tooltip", r && "tooltipArrow", i && "touch", `tooltipPlacement${Ce(s.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return Te(a, DC, t);
}, FC = J(Bl, {
  name: "MuiTooltip",
  slot: "Popper",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [t.popper, !o.disableInteractive && t.popperInteractive, o.arrow && t.popperArrow, !o.open && t.popperClose];
  }
})(Pe(({
  theme: e
}) => ({
  zIndex: (e.vars || e).zIndex.tooltip,
  pointerEvents: "none",
  variants: [{
    props: ({
      ownerState: t,
      open: o
    }) => o && !t.disableInteractive,
    style: {
      pointerEvents: "auto"
    }
  }, {
    props: ({
      ownerState: t
    }) => t.arrow,
    style: {
      [`&[data-popper-placement*="bottom"] .${dn.arrow}`]: {
        top: 0,
        marginTop: "-0.71em",
        "&::before": {
          transformOrigin: "0 100%"
        }
      },
      [`&[data-popper-placement*="top"] .${dn.arrow}`]: {
        bottom: 0,
        marginBottom: "-0.71em",
        "&::before": {
          transformOrigin: "100% 0"
        }
      },
      [`&[data-popper-placement*="right"] .${dn.arrow}`]: {
        height: "1em",
        width: "0.71em",
        insetInlineStart: 0,
        marginInlineStart: "-0.71em",
        "&::before": {
          transformOrigin: "100% 100%"
        }
      },
      [`&[data-popper-placement*="left"] .${dn.arrow}`]: {
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
}))), jC = J("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [t.tooltip, o.touch && t.touch, o.arrow && t.tooltipArrow, t[`tooltipPlacement${Ce(o.placement.split("-")[0])}`]];
  }
})(Pe(({
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
  [`.${dn.popper}[data-popper-placement*="left"] &`]: {
    transformOrigin: "right center",
    marginInlineEnd: "14px"
  },
  [`.${dn.popper}[data-popper-placement*="right"] &`]: {
    transformOrigin: "left center",
    marginInlineStart: "14px"
  },
  [`.${dn.popper}[data-popper-placement*="top"] &`]: {
    transformOrigin: "center bottom",
    marginBottom: "14px"
  },
  [`.${dn.popper}[data-popper-placement*="bottom"] &`]: {
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
      lineHeight: `${LC(16 / 14)}em`,
      fontWeight: e.typography.fontWeightRegular
    }
  }, {
    props: ({
      ownerState: t
    }) => t.touch,
    style: {
      [`.${dn.popper}[data-popper-placement*="left"] &`]: {
        marginInlineEnd: "24px"
      },
      [`.${dn.popper}[data-popper-placement*="right"] &`]: {
        marginInlineStart: "24px"
      },
      [`.${dn.popper}[data-popper-placement*="top"] &`]: {
        marginBottom: "24px"
      },
      [`.${dn.popper}[data-popper-placement*="bottom"] &`]: {
        marginTop: "24px"
      }
    }
  }]
}))), WC = J("span", {
  name: "MuiTooltip",
  slot: "Arrow"
})(Pe(({
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
let Ai = !1;
const nu = new Bs();
let Pr = {
  x: 0,
  y: 0
};
function _i(e, t) {
  return (o, ...r) => {
    t && t(o, ...r), e(o, ...r);
  };
}
const Go = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: i = !1,
    children: s,
    classes: a,
    describeChild: c = !1,
    disableFocusListener: d = !1,
    disableHoverListener: p = !1,
    disableInteractive: m = !1,
    disableTouchListener: y = !1,
    enterDelay: x = 100,
    enterNextDelay: f = 0,
    enterTouchDelay: v = 700,
    followCursor: h = !1,
    id: w,
    leaveDelay: O = 0,
    leaveTouchDelay: k = 1500,
    onClose: E,
    onOpen: C,
    open: S,
    placement: N = "bottom",
    slotProps: A = {},
    slots: _ = {},
    title: D,
    ...F
  } = r, P = /* @__PURE__ */ b.isValidElement(s) ? s : /* @__PURE__ */ l("span", {
    children: s
  }), g = ko(), [$, I] = b.useState(), [M, B] = b.useState(null), W = b.useRef(!1), G = m || h, oe = Qn(), z = Qn(), V = Qn(), Y = Qn(), [ne, te] = os({
    controlled: S,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let re = ne;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: he
    } = b.useRef(S !== void 0);
    b.useEffect(() => {
      $ && $.disabled && !he && D !== "" && $.tagName.toLowerCase() === "button" && console.warn(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [D, $, he]);
  }
  const ee = to(w), K = b.useRef(), U = It(() => {
    K.current !== void 0 && (document.body.style.WebkitUserSelect = K.current, K.current = void 0), Y.clear();
  });
  b.useEffect(() => U, [U]);
  const X = (he) => {
    nu.clear(), Ai = !0, te(!0), C && !re && C(he);
  }, Z = It(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (he) => {
      nu.start(800 + O, () => {
        Ai = !1;
      }), te(!1), E && re && E(he), oe.start(g.transitions.duration.shortest, () => {
        W.current = !1;
      });
    }
  ), ae = (he) => {
    W.current && he.type !== "touchstart" || ($ && $.removeAttribute("title"), z.clear(), V.clear(), x || Ai && f ? z.start(Ai ? f : x, () => {
      X(he);
    }) : X(he));
  }, j = (he) => {
    z.clear(), V.start(O, () => {
      Z(he);
    });
  }, [, me] = b.useState(!1), Q = (he) => {
    const He = (he == null ? void 0 : he.target) ?? $;
    if (!He || He.disabled || !ss(He)) {
      me(!1);
      const Ct = he ?? new Event("blur");
      !he && He && (Object.defineProperty(Ct, "target", {
        value: He
      }), Object.defineProperty(Ct, "currentTarget", {
        value: He
      })), j(Ct);
    }
  }, fe = (he) => {
    if ($ || I(he.currentTarget), ss(he.target)) {
      const He = (Ct) => {
        Ct.target.disabled && Q(Ct), Ct.target.removeEventListener("blur", He);
      };
      he.target.addEventListener("blur", He), me(!0), ae(he);
    }
  }, Ie = (he) => {
    W.current = !0;
    const He = P.props;
    He.onTouchStart && He.onTouchStart(he);
  }, xe = (he) => {
    Ie(he), V.clear(), oe.clear(), U(), K.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", Y.start(v, () => {
      document.body.style.WebkitUserSelect = K.current, ae(he);
    });
  }, Be = (he) => {
    P.props.onTouchEnd && P.props.onTouchEnd(he), U(), V.start(k, () => {
      Z(he);
    });
  };
  b.useEffect(() => {
    if (!re)
      return;
    function he(He) {
      He.key === "Escape" && Z(He);
    }
    return document.addEventListener("keydown", he), () => {
      document.removeEventListener("keydown", he);
    };
  }, [Z, re]);
  const ye = gt(mr(P), I, o);
  !D && D !== 0 && (re = !1);
  const Ge = b.useRef(), Me = (he) => {
    const He = P.props;
    He.onMouseMove && He.onMouseMove(he), Pr = {
      x: he.clientX,
      y: he.clientY
    }, Ge.current && Ge.current.update();
  }, Fe = {}, rt = typeof D == "string";
  c ? (Fe.title = !re && rt && !p ? D : null, Fe["aria-describedby"] = re ? ee : null) : (Fe["aria-label"] = rt ? D : null, Fe["aria-labelledby"] = re && !rt ? ee : null);
  const ke = {
    ...Fe,
    ...F,
    ...P.props,
    className: de(F.className, P.props.className),
    onTouchStart: Ie,
    ref: ye,
    ...h ? {
      onMouseMove: Me
    } : {}
  };
  process.env.NODE_ENV !== "production" && (ke["data-mui-internal-clone-element"] = !0, b.useEffect(() => {
    $ && !$.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [$]));
  const Ue = {};
  y || (ke.onTouchStart = xe, ke.onTouchEnd = Be), p || (ke.onMouseOver = _i(ae, ke.onMouseOver), ke.onMouseLeave = _i(j, ke.onMouseLeave), G || (Ue.onMouseOver = ae, Ue.onMouseLeave = j)), d || (ke.onFocus = _i(fe, ke.onFocus), ke.onBlur = _i(Q, ke.onBlur), G || (Ue.onFocus = fe, Ue.onBlur = Q)), process.env.NODE_ENV !== "production" && P.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${P.props.title}\` or the Tooltip component.`].join(`
`));
  const ut = {
    ...r,
    arrow: i,
    disableInteractive: G,
    placement: N,
    touch: W.current
  }, De = typeof A.popper == "function" ? A.popper(ut) : A.popper, tt = b.useMemo(() => {
    var He;
    let he = [{
      name: "arrow",
      enabled: !!M,
      options: {
        element: M,
        padding: 4
      }
    }];
    return (He = De == null ? void 0 : De.popperOptions) != null && He.modifiers && (he = he.concat(De.popperOptions.modifiers)), {
      ...De == null ? void 0 : De.popperOptions,
      modifiers: he
    };
  }, [M, De == null ? void 0 : De.popperOptions]), We = BC(ut), ue = {
    slots: _,
    slotProps: {
      arrow: A.arrow,
      popper: De,
      tooltip: A.tooltip,
      transition: A.transition
    }
  }, [Ae, ze] = be("popper", {
    elementType: FC,
    externalForwardedProps: ue,
    ownerState: ut,
    className: We.popper
  }), [pt, $e] = be("transition", {
    elementType: Jr,
    externalForwardedProps: ue,
    ownerState: ut
  }), [$t, Hn] = be("tooltip", {
    elementType: jC,
    className: We.tooltip,
    externalForwardedProps: ue,
    ownerState: ut
  }), [ro, yn] = be("arrow", {
    elementType: WC,
    className: We.arrow,
    externalForwardedProps: ue,
    ownerState: ut,
    ref: B
  });
  return /* @__PURE__ */ T(b.Fragment, {
    children: [/* @__PURE__ */ b.cloneElement(P, ke), /* @__PURE__ */ l(Ae, {
      as: Bl,
      placement: N,
      anchorEl: h ? {
        getBoundingClientRect: () => ({
          top: Pr.y,
          left: Pr.x,
          right: Pr.x,
          bottom: Pr.y,
          width: 0,
          height: 0
        })
      } : $,
      popperRef: Ge,
      open: $ ? re : !1,
      id: ee,
      transition: !0,
      ...Ue,
      ...ze,
      popperOptions: tt,
      children: ({
        TransitionProps: he
      }) => /* @__PURE__ */ l(pt, {
        timeout: g.transitions.duration.shorter,
        ...he,
        ...$e,
        children: /* @__PURE__ */ T($t, {
          ...Hn,
          children: [D, i ? /* @__PURE__ */ l(ro, {
            ...yn
          }) : null]
        })
      })
    })]
  });
});
process.env.NODE_ENV !== "production" && (Go.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, adds an arrow to the tooltip.
   * @default false
   */
  arrow: n.bool,
  /**
   * Tooltip reference element.
   */
  children: fr.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * Set to `true` if the `title` acts as an accessible description.
   * By default the `title` acts as an accessible label for the child.
   * @default false
   */
  describeChild: n.bool,
  /**
   * Do not respond to focus-visible events.
   * @default false
   */
  disableFocusListener: n.bool,
  /**
   * Do not respond to hover events.
   * @default false
   */
  disableHoverListener: n.bool,
  /**
   * Makes a tooltip not interactive, i.e. it will close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   * @default false
   */
  disableInteractive: n.bool,
  /**
   * Do not respond to long press touch events.
   * @default false
   */
  disableTouchListener: n.bool,
  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This prop won't impact the enter touch delay (`enterTouchDelay`).
   * @default 100
   */
  enterDelay: n.number,
  /**
   * The number of milliseconds to wait before showing the tooltip when one was already recently opened.
   * @default 0
   */
  enterNextDelay: n.number,
  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   * @default 700
   */
  enterTouchDelay: n.number,
  /**
   * If `true`, the tooltip follow the cursor over the wrapped element.
   * @default false
   */
  followCursor: n.bool,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: n.string,
  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This prop won't impact the leave touch delay (`leaveTouchDelay`).
   * @default 0
   */
  leaveDelay: n.number,
  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   * @default 1500
   */
  leaveTouchDelay: n.number,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose: n.func,
  /**
   * Callback fired when the component requests to be open.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onOpen: n.func,
  /**
   * If `true`, the component is shown.
   */
  open: n.bool,
  /**
   * Tooltip placement.
   * @default 'bottom'
   */
  placement: n.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: n.shape({
    arrow: n.oneOfType([n.func, n.object]),
    popper: n.oneOfType([n.func, n.object]),
    tooltip: n.oneOfType([n.func, n.object]),
    transition: n.oneOfType([n.func, n.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: n.shape({
    arrow: n.elementType,
    popper: n.elementType,
    tooltip: n.elementType,
    transition: n.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  /**
   * Tooltip title. Zero-length titles string, undefined, null and false are never displayed.
   */
  title: n.node
});
const zC = 216, VC = 56;
function UC({ section: e, ...t }) {
  switch (e) {
    case "home":
      return /* @__PURE__ */ l(cS, { ...t });
    case "servers":
      return /* @__PURE__ */ l(yf, { ...t });
    case "tools":
      return /* @__PURE__ */ l(vf, { ...t });
    case "tool_groups":
      return /* @__PURE__ */ l(xf, { ...t });
    case "prompt_groups":
      return /* @__PURE__ */ l(lS, { ...t });
    case "agent_apps":
      return /* @__PURE__ */ l(wf, { ...t });
    case "prompts":
      return /* @__PURE__ */ l(Sf, { ...t });
    case "resources":
      return /* @__PURE__ */ l(Cf, { ...t });
    case "diagnostics":
      return /* @__PURE__ */ l(dS, { ...t });
    default:
      return null;
  }
}
const ou = Of;
function HC({
  active: e,
  onSelect: t,
  signOutHref: o,
  embedMode: r = !1,
  signedInEmail: i
}) {
  const s = r ? ou.filter((p) => p.key !== "home") : ou, [a, c] = Ne(() => {
    try {
      const p = window.localStorage.getItem("dashboard-nav-expanded");
      if (p !== null)
        return p === "1";
    } catch {
    }
    return !0;
  });
  function d(p) {
    c(p);
    try {
      window.localStorage.setItem("dashboard-nav-expanded", p ? "1" : "0");
    } catch {
    }
  }
  return /* @__PURE__ */ l(
    je,
    {
      "aria-label": "Dashboard navigation",
      "aria-expanded": a,
      component: "aside",
      sx: {
        width: a ? zC : VC,
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
      children: /* @__PURE__ */ T(pe, { spacing: 2.25, sx: { flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }, children: [
        /* @__PURE__ */ l(
          pe,
          {
            direction: "row",
            spacing: 1,
            sx: {
              alignItems: "center",
              minWidth: 0,
              justifyContent: a ? "flex-start" : "center",
              flexWrap: "nowrap"
            },
            children: a ? /* @__PURE__ */ T(qt, { children: [
              /* @__PURE__ */ l(je, { sx: { flex: "1 1 auto", minWidth: 0 }, children: /* @__PURE__ */ l(
                q,
                {
                  component: "span",
                  sx: { fontWeight: 700, fontSize: 16, whiteSpace: "nowrap", overflow: "hidden" },
                  children: "SAMI MCPHub"
                }
              ) }),
              /* @__PURE__ */ l(Go, { title: "Collapse menu", children: /* @__PURE__ */ l(tn, { "aria-label": "Collapse menu", edge: "end", size: "small", onClick: () => d(!1), children: /* @__PURE__ */ l(sS, { fontSize: "small" }) }) })
            ] }) : /* @__PURE__ */ l(Go, { title: "Expand menu", children: /* @__PURE__ */ l(tn, { "aria-label": "Expand menu", size: "small", onClick: () => d(!0), children: /* @__PURE__ */ l(aS, { fontSize: "small" }) }) })
          }
        ),
        /* @__PURE__ */ l(Rl, { disablePadding: !0, sx: { px: 0, flex: 1, minHeight: 0, overflowY: "auto" }, "aria-label": "Dashboard sections", children: s.map((p) => {
          const m = e === p.key, y = /* @__PURE__ */ T(
            Rf,
            {
              selected: m,
              onClick: () => t(p.key),
              sx: {
                px: a ? "12px" : "6px",
                py: 1.125,
                borderRadius: "12px",
                mb: 0,
                border: 1,
                borderColor: m ? "divider" : "transparent",
                backgroundColor: m ? "background.paper" : "transparent",
                justifyContent: a ? "flex-start" : "center"
              },
              children: [
                a ? null : /* @__PURE__ */ l(
                  Kp,
                  {
                    sx: {
                      minWidth: 0,
                      justifyContent: "center",
                      color: m ? "primary.main" : "text.secondary"
                    },
                    children: /* @__PURE__ */ l(UC, { section: p.key, fontSize: "small" })
                  }
                ),
                a ? /* @__PURE__ */ l(
                  Yp,
                  {
                    primary: p.label,
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
          return /* @__PURE__ */ l(Nf, { disablePadding: !0, sx: { mb: 0.25 }, children: a ? y : /* @__PURE__ */ l(Go, { title: p.label, placement: "right", children: y }) }, p.key);
        }) }),
        r && i ? /* @__PURE__ */ l(
          je,
          {
            sx: {
              mt: "auto",
              pt: 1.5,
              borderTop: 1,
              borderColor: "divider",
              flexShrink: 0
            },
            children: a ? /* @__PURE__ */ l(Zr, { label: `Signed in as ${i}`, size: "small", sx: { width: "100%" } }) : /* @__PURE__ */ l(Go, { title: `Signed in as ${i}`, placement: "right", children: /* @__PURE__ */ l(je, { sx: { display: "flex", justifyContent: "center" }, children: /* @__PURE__ */ l(Zr, { label: i.slice(0, 1).toUpperCase(), size: "small" }) }) })
          }
        ) : o ? /* @__PURE__ */ l(
          je,
          {
            sx: {
              mt: "auto",
              pt: 1.5,
              borderTop: 1,
              borderColor: "divider",
              flexShrink: 0
            },
            children: a ? /* @__PURE__ */ l(
              ge,
              {
                component: "a",
                href: o,
                variant: "outlined",
                size: "small",
                fullWidth: !0,
                startIcon: /* @__PURE__ */ l(Gd, {}),
                sx: {
                  fontSize: "0.88rem",
                  minHeight: 36,
                  borderRadius: "12px",
                  textTransform: "none"
                },
                children: "Sign out"
              }
            ) : /* @__PURE__ */ l(je, { sx: { display: "flex", justifyContent: "center" }, children: /* @__PURE__ */ l(Go, { title: "Sign out", placement: "right", children: /* @__PURE__ */ l(tn, { component: "a", href: o, "aria-label": "Sign out", size: "small", color: "primary", children: /* @__PURE__ */ l(Gd, { fontSize: "small" }) }) }) })
          }
        ) : null
      ] })
    }
  );
}
function GC(e) {
  return Se("MuiTab", e);
}
const wn = we("MuiTab", ["root", "labelIcon", "textColorInherit", "textColorPrimary", "textColorSecondary", "selected", "disabled", "fullWidth", "wrapped", "icon"]), qC = (e) => {
  const {
    classes: t,
    textColor: o,
    fullWidth: r,
    wrapped: i,
    icon: s,
    label: a,
    selected: c,
    disabled: d
  } = e, p = {
    root: ["root", s && a && "labelIcon", `textColor${Ce(o)}`, r && "fullWidth", i && "wrapped", c && "selected", d && "disabled"],
    icon: ["icon"]
  };
  return Te(p, GC, t);
}, KC = J(zn, {
  name: "MuiTab",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [t.root, o.label && o.icon && t.labelIcon, t[`textColor${Ce(o.textColor)}`], o.fullWidth && t.fullWidth, o.wrapped && t.wrapped, {
      [`& .${wn.icon}`]: t.icon
    }];
  }
})(Pe(({
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
      iconPosition: o
    }) => t.icon && t.label && o === "top",
    style: {
      [`& > .${wn.icon}`]: {
        marginBottom: 6
      }
    }
  }, {
    props: ({
      ownerState: t,
      iconPosition: o
    }) => t.icon && t.label && o === "bottom",
    style: {
      [`& > .${wn.icon}`]: {
        marginTop: 6
      }
    }
  }, {
    props: ({
      ownerState: t,
      iconPosition: o
    }) => t.icon && t.label && o === "start",
    style: {
      [`& > .${wn.icon}`]: {
        marginRight: e.spacing(1)
      }
    }
  }, {
    props: ({
      ownerState: t,
      iconPosition: o
    }) => t.icon && t.label && o === "end",
    style: {
      [`& > .${wn.icon}`]: {
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
      [`&.${wn.selected}`]: {
        opacity: 1
      },
      [`&.${wn.disabled}`]: {
        opacity: (e.vars || e).palette.action.disabledOpacity
      }
    }
  }, {
    props: {
      textColor: "primary"
    },
    style: {
      color: (e.vars || e).palette.text.secondary,
      [`&.${wn.selected}`]: {
        color: (e.vars || e).palette.primary.main
      },
      [`&.${wn.disabled}`]: {
        color: (e.vars || e).palette.text.disabled
      }
    }
  }, {
    props: {
      textColor: "secondary"
    },
    style: {
      color: (e.vars || e).palette.text.secondary,
      [`&.${wn.selected}`]: {
        color: (e.vars || e).palette.secondary.main
      },
      [`&.${wn.disabled}`]: {
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
}))), Ff = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiTab"
  }), {
    className: i,
    disabled: s = !1,
    disableFocusRipple: a = !1,
    // eslint-disable-next-line react/prop-types
    fullWidth: c,
    icon: d,
    iconPosition: p = "top",
    // eslint-disable-next-line react/prop-types
    indicator: m,
    label: y,
    onChange: x,
    onClick: f,
    onFocus: v,
    // eslint-disable-next-line react/prop-types
    selected: h,
    // eslint-disable-next-line react/prop-types
    selectionFollowsFocus: w,
    // eslint-disable-next-line react/prop-types
    textColor: O = "inherit",
    value: k,
    wrapped: E = !1,
    ...C
  } = r, S = jp(), N = zp({
    id: k,
    ref: o,
    disabled: s,
    selected: h
  }), _ = S.getItemMap().size === 0 && h ? 0 : N.tabIndex, D = {
    ...r,
    disabled: s,
    disableFocusRipple: a,
    selected: h,
    icon: !!d,
    iconPosition: p,
    label: !!y,
    fullWidth: c,
    textColor: O,
    wrapped: E
  }, F = qC(D), P = d && y && /* @__PURE__ */ b.isValidElement(d) ? /* @__PURE__ */ b.cloneElement(d, {
    className: de(F.icon, d.props.className)
  }) : d, g = (I) => {
    !h && x && x(I, k), f && f(I);
  }, $ = (I) => {
    w && !h && x && x(I, k), v && v(I);
  };
  return /* @__PURE__ */ T(KC, {
    internalNativeButton: !0,
    focusRipple: !a,
    className: de(F.root, i),
    ref: N.ref,
    role: "tab",
    "aria-selected": h,
    disabled: s,
    onClick: g,
    onFocus: $,
    tabIndex: _,
    ownerState: D,
    ...C,
    children: [p === "top" || p === "start" ? /* @__PURE__ */ T(b.Fragment, {
      children: [P, y]
    }) : /* @__PURE__ */ T(b.Fragment, {
      children: [y, P]
    }), m]
  });
});
process.env.NODE_ENV !== "production" && (Ff.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * This prop isn't supported.
   * Use the `component` prop if you need to change the children structure.
   */
  children: vp,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: n.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: n.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: n.bool,
  /**
   * The icon to display.
   */
  icon: n.oneOfType([n.element, n.string]),
  /**
   * The position of the icon relative to the label.
   * @default 'top'
   */
  iconPosition: n.oneOf(["bottom", "end", "start", "top"]),
  /**
   * The label element.
   */
  label: n.node,
  /**
   * @ignore
   */
  onChange: n.func,
  /**
   * @ignore
   */
  onClick: n.func,
  /**
   * @ignore
   */
  onFocus: n.func,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  /**
   * You can provide your own value. Otherwise, we fallback to the child position index.
   */
  value: n.any,
  /**
   * Tab labels appear in a single row.
   * They can use a second line if needed.
   * @default false
   */
  wrapped: n.bool
});
function YC(e) {
  return (1 + Math.sin(Math.PI * e - Math.PI / 2)) / 2;
}
function XC(e, t, o, r = {}, i = () => {
}) {
  const {
    ease: s = YC,
    duration: a = 300
    // standard
  } = r;
  let c = null;
  const d = t[e];
  let p = !1;
  const m = () => {
    p = !0;
  }, y = (x) => {
    if (p) {
      i(new Error("Animation cancelled"));
      return;
    }
    c === null && (c = x);
    const f = Math.min(1, (x - c) / a);
    if (t[e] = s(f) * (o - d) + d, f >= 1) {
      requestAnimationFrame(() => {
        i(null);
      });
      return;
    }
    requestAnimationFrame(y);
  };
  return d === o ? (i(new Error("Element already at target position")), m) : (requestAnimationFrame(y), m);
}
const JC = {
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
    ...o
  } = e, r = b.useRef(), i = b.useRef(null), s = () => {
    r.current = i.current.offsetHeight - i.current.clientHeight;
  };
  return Nt(() => {
    const a = Fs(() => {
      const d = r.current;
      s(), d !== r.current && t(r.current);
    }), c = En(i.current);
    return c.addEventListener("resize", a), () => {
      a.clear(), c.removeEventListener("resize", a);
    };
  }, [t]), b.useEffect(() => {
    s(), t(r.current);
  }, [t]), /* @__PURE__ */ l("div", {
    style: JC,
    ...o,
    ref: i
  });
}
process.env.NODE_ENV !== "production" && (jf.propTypes = {
  onChange: n.func.isRequired
});
const QC = dt(/* @__PURE__ */ l("path", {
  d: "M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"
}), "KeyboardArrowLeft"), ZC = dt(/* @__PURE__ */ l("path", {
  d: "M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"
}), "KeyboardArrowRight");
function ew(e) {
  return Se("MuiTabScrollButton", e);
}
const tw = we("MuiTabScrollButton", ["root", "vertical", "horizontal", "disabled"]), nw = (e) => {
  const {
    classes: t,
    orientation: o,
    disabled: r
  } = e;
  return Te({
    root: ["root", o, r && "disabled"]
  }, ew, t);
}, ow = J(zn, {
  name: "MuiTabScrollButton",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [t.root, o.orientation && t[o.orientation]];
  }
})({
  width: 40,
  flexShrink: 0,
  opacity: 0.8,
  [`&.${tw.disabled}`]: {
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
}), Wf = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiTabScrollButton"
  }), {
    className: i,
    slots: s = {},
    slotProps: a = {},
    direction: c,
    orientation: d,
    disabled: p,
    ...m
  } = r, {
    nativeButton: y,
    ...x
  } = m, f = Ds(), v = {
    isRtl: f,
    ...r
  }, h = nw(v), w = s.StartScrollButtonIcon ?? QC, O = s.EndScrollButtonIcon ?? ZC, k = or({
    elementType: w,
    externalSlotProps: a.startScrollButtonIcon,
    additionalProps: {
      fontSize: "small"
    },
    ownerState: v
  }), E = or({
    elementType: O,
    externalSlotProps: a.endScrollButtonIcon,
    additionalProps: {
      fontSize: "small"
    },
    ownerState: v
  });
  return /* @__PURE__ */ l(ow, {
    component: "div",
    className: de(h.root, i),
    ref: o,
    role: null,
    ownerState: v,
    tabIndex: null,
    ...x,
    style: {
      ...x.style,
      ...d === "vertical" && {
        "--TabScrollButton-svgRotate": `rotate(${f ? -90 : 90}deg)`
      }
    },
    children: c === "left" ? /* @__PURE__ */ l(w, {
      ...k
    }) : /* @__PURE__ */ l(O, {
      ...E
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
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * The direction the button should indicate.
   */
  direction: n.oneOf(["left", "right"]).isRequired,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: n.bool,
  /**
   * The component orientation (layout flow direction).
   */
  orientation: n.oneOf(["horizontal", "vertical"]).isRequired,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   * @default {}
   */
  slotProps: n.shape({
    endScrollButtonIcon: n.oneOfType([n.func, n.object]),
    startScrollButtonIcon: n.oneOfType([n.func, n.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: n.shape({
    EndScrollButtonIcon: n.elementType,
    StartScrollButtonIcon: n.elementType
  }),
  /**
   * @ignore
   */
  style: n.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object])
});
function rw(e) {
  return Se("MuiTabs", e);
}
const ga = we("MuiTabs", ["root", "vertical", "list", "centered", "scroller", "fixed", "scrollableX", "scrollableY", "hideScrollbar", "scrollButtons", "scrollButtonsHideMobile", "indicator"]), iw = (e) => {
  const {
    vertical: t,
    fixed: o,
    hideScrollbar: r,
    scrollableX: i,
    scrollableY: s,
    centered: a,
    scrollButtonsHideMobile: c,
    classes: d
  } = e;
  return Te({
    root: ["root", t && "vertical"],
    scroller: ["scroller", o && "fixed", r && "hideScrollbar", i && "scrollableX", s && "scrollableY"],
    list: ["list", t && "vertical", a && "centered"],
    indicator: ["indicator"],
    scrollButtons: ["scrollButtons", c && "scrollButtonsHideMobile"],
    scrollableX: [i && "scrollableX"],
    hideScrollbar: [r && "hideScrollbar"]
  }, rw, d);
}, sw = J("div", {
  name: "MuiTabs",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [{
      [`& .${ga.scrollButtons}`]: t.scrollButtons
    }, {
      [`& .${ga.scrollButtons}`]: o.scrollButtonsHideMobile && t.scrollButtonsHideMobile
    }, t.root, o.vertical && t.vertical];
  }
})(Pe(({
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
      [`& .${ga.scrollButtons}`]: {
        [e.breakpoints.down("sm")]: {
          display: "none"
        }
      }
    }
  }]
}))), aw = J("div", {
  name: "MuiTabs",
  slot: "Scroller",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [t.scroller, o.fixed && t.fixed, o.hideScrollbar && t.hideScrollbar, o.scrollableX && t.scrollableX, o.scrollableY && t.scrollableY];
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
}), lw = J("div", {
  name: "MuiTabs",
  slot: "List",
  overridesResolver: (e, t) => {
    const {
      ownerState: o
    } = e;
    return [t.list, o.centered && t.centered];
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
}), cw = J("span", {
  name: "MuiTabs",
  slot: "Indicator"
})(Pe(({
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
}))), dw = J(jf)({
  overflowX: "auto",
  overflowY: "hidden",
  // Hide dimensionless scrollbar on macOS
  scrollbarWidth: "none",
  // Firefox
  "&::-webkit-scrollbar": {
    display: "none"
    // Safari + Chrome
  }
}), ru = {};
let iu = !1;
const zf = /* @__PURE__ */ b.forwardRef(function(t, o) {
  const r = Ee({
    props: t,
    name: "MuiTabs"
  }), i = ko(), s = Ds(), {
    "aria-label": a,
    "aria-labelledby": c,
    action: d,
    centered: p = !1,
    children: m,
    className: y,
    component: x = "div",
    allowScrollButtonsMobile: f = !1,
    indicatorColor: v = "primary",
    onChange: h,
    orientation: w = "horizontal",
    scrollButtons: O = "auto",
    selectionFollowsFocus: k,
    slots: E = {},
    slotProps: C = {},
    textColor: S = "primary",
    value: N,
    variant: A = "standard",
    visibleScrollbar: _ = !1,
    ...D
  } = r, F = A === "scrollable", P = w === "vertical", g = P ? "scrollTop" : "scrollLeft", $ = P ? "top" : "left", I = P ? "bottom" : "right", M = P ? "clientHeight" : "clientWidth", B = P ? "height" : "width", W = {
    ...r,
    component: x,
    allowScrollButtonsMobile: f,
    indicatorColor: v,
    orientation: w,
    vertical: P,
    scrollButtons: O,
    textColor: S,
    variant: A,
    visibleScrollbar: _,
    fixed: !F,
    hideScrollbar: F && !_,
    scrollableX: F && !P,
    scrollableY: F && P,
    centered: p && !F,
    scrollButtonsHideMobile: !f
  }, G = iw(W), oe = or({
    elementType: E.startScrollButtonIcon,
    externalSlotProps: C.startScrollButtonIcon,
    ownerState: W
  }), z = or({
    elementType: E.endScrollButtonIcon,
    externalSlotProps: C.endScrollButtonIcon,
    ownerState: W
  });
  process.env.NODE_ENV !== "production" && p && F && console.error('MUI: You can not use the `centered={true}` and `variant="scrollable"` properties at the same time on a `Tabs` component.');
  const [V, Y] = b.useState(!1), [ne, te] = b.useState(ru), [re, ee] = b.useState(!1), [K, U] = b.useState(!1), [X, Z] = b.useState(!1), ae = N === !1 ? null : N, [j, me] = b.useState(!1), [Q, fe] = b.useState({
    overflow: "hidden",
    scrollbarWidth: 0
  }), Ie = /* @__PURE__ */ new Map(), xe = b.useRef(null), Be = b.useRef(null), ye = {
    slots: E,
    slotProps: C
  }, Ge = () => {
    const le = xe.current;
    let ce;
    if (le) {
      const Le = le.getBoundingClientRect();
      ce = {
        clientWidth: le.clientWidth,
        scrollLeft: le.scrollLeft,
        scrollTop: le.scrollTop,
        scrollWidth: le.scrollWidth,
        top: Le.top,
        bottom: Le.bottom,
        left: Le.left,
        right: Le.right
      };
    }
    let Oe;
    if (le && N !== !1) {
      const Le = Be.current.children;
      if (Le.length > 0) {
        const ft = Le[Ie.get(N)];
        process.env.NODE_ENV !== "production" && (ft || console.error(["MUI: The `value` provided to the Tabs component is invalid.", `None of the Tabs' children match with "${N}".`, Ie.keys ? `You can provide one of the following values: ${Array.from(Ie.keys()).join(", ")}.` : null].join(`
`))), Oe = ft ? ft.getBoundingClientRect() : null, process.env.NODE_ENV !== "production" && li() && !iu && Oe && Oe.width === 0 && Oe.height === 0 && // if the whole Tabs component is hidden, don't warn
        ce.clientWidth !== 0 && (ce = null, console.error(["MUI: The `value` provided to the Tabs component is invalid.", `The Tab with this \`value\` ("${N}") is not part of the document layout.`, "Make sure the tab item is present in the document or that it's not `display: none`."].join(`
`)), iu = !0);
      }
    }
    return {
      tabsMeta: ce,
      tabMeta: Oe
    };
  }, Me = It(() => {
    const {
      tabsMeta: le,
      tabMeta: ce
    } = Ge();
    let Oe = 0, Le;
    P ? (Le = "top", ce && le && (Oe = ce.top - le.top + le.scrollTop)) : (Le = s ? "right" : "left", ce && le && (Oe = (s ? -1 : 1) * (ce[Le] - le[Le] + le.scrollLeft)));
    const ft = {
      [Le]: Oe,
      // May be wrong until the font is loaded.
      [B]: ce ? ce[B] : 0
    };
    if (typeof ne[Le] != "number" || typeof ne[B] != "number")
      te(ft);
    else {
      const Gt = Math.abs(ne[Le] - ft[Le]), sn = Math.abs(ne[B] - ft[B]);
      (Gt >= 1 || sn >= 1) && te(ft);
    }
  }), Fe = (le, {
    animation: ce = !0
  } = {}) => {
    ce ? XC(g, xe.current, le, {
      duration: i.transitions.duration.standard
    }) : xe.current[g] = le;
  }, rt = (le) => {
    let ce = xe.current[g];
    P ? ce += le : ce += le * (s ? -1 : 1), Fe(ce);
  }, ke = () => {
    const le = xe.current[M];
    let ce = 0;
    const Oe = Array.from(Be.current.children);
    for (let Le = 0; Le < Oe.length; Le += 1) {
      const ft = Oe[Le];
      if (ce + ft[M] > le) {
        Le === 0 && (ce = le);
        break;
      }
      ce += ft[M];
    }
    return ce;
  }, Ue = () => {
    rt(-1 * ke());
  }, ut = () => {
    rt(ke());
  }, [De, {
    onChange: tt,
    ...We
  }] = be("scrollbar", {
    className: de(G.scrollableX, G.hideScrollbar),
    elementType: dw,
    shouldForwardComponentProp: !0,
    externalForwardedProps: ye,
    ownerState: W
  }), ue = b.useCallback((le) => {
    tt == null || tt(le), fe({
      overflow: null,
      scrollbarWidth: le
    });
  }, [tt]), [Ae, ze] = be("scrollButtons", {
    className: G.scrollButtons,
    elementType: Wf,
    externalForwardedProps: ye,
    ownerState: W,
    additionalProps: {
      orientation: w,
      slots: {
        StartScrollButtonIcon: E.startScrollButtonIcon,
        EndScrollButtonIcon: E.endScrollButtonIcon
      },
      slotProps: {
        startScrollButtonIcon: oe,
        endScrollButtonIcon: z
      }
    }
  }), pt = () => {
    const le = {};
    le.scrollbarSizeListener = F ? /* @__PURE__ */ l(De, {
      ...We,
      onChange: ue
    }) : null;
    const Oe = F && (O === "auto" && (re || K) || O === !0);
    return le.scrollButtonStart = Oe ? /* @__PURE__ */ l(Ae, {
      direction: s ? "right" : "left",
      onClick: Ue,
      disabled: !re,
      ...ze
    }) : null, le.scrollButtonEnd = Oe ? /* @__PURE__ */ l(Ae, {
      direction: s ? "left" : "right",
      onClick: ut,
      disabled: !K,
      ...ze
    }) : null, le;
  }, $e = It((le) => {
    const {
      tabsMeta: ce,
      tabMeta: Oe
    } = Ge();
    if (!(!Oe || !ce)) {
      if (Oe[$] < ce[$]) {
        const Le = ce[g] + (Oe[$] - ce[$]);
        Fe(Le, {
          animation: le
        });
      } else if (Oe[I] > ce[I]) {
        const Le = ce[g] + (Oe[I] - ce[I]);
        Fe(Le, {
          animation: le
        });
      }
    }
  }), $t = It(() => {
    F && O !== !1 && Z(!X);
  });
  b.useEffect(() => {
    const le = Fs(() => {
      xe.current && Me();
    });
    let ce;
    const Oe = (Gt) => {
      Gt.forEach((sn) => {
        sn.removedNodes.forEach((ie) => {
          ce == null || ce.unobserve(ie);
        }), sn.addedNodes.forEach((ie) => {
          ce == null || ce.observe(ie);
        });
      }), le(), $t();
    }, Le = En(xe.current);
    Le.addEventListener("resize", le);
    let ft;
    return typeof ResizeObserver < "u" && (ce = new ResizeObserver(le), Array.from(Be.current.children).forEach((Gt) => {
      ce.observe(Gt);
    })), typeof MutationObserver < "u" && (ft = new MutationObserver(Oe), ft.observe(Be.current, {
      childList: !0
    })), () => {
      le.clear(), Le.removeEventListener("resize", le), ft == null || ft.disconnect(), ce == null || ce.disconnect();
    };
  }, [Me, $t]), b.useEffect(() => {
    const le = Array.from(Be.current.children), ce = le.length;
    if (typeof IntersectionObserver < "u" && ce > 0 && F && O !== !1) {
      const Oe = le[0], Le = le[ce - 1], ft = {
        root: xe.current,
        threshold: 0.99
      }, Gt = (Ve) => {
        ee(!Ve[0].isIntersecting);
      }, sn = new IntersectionObserver(Gt, ft);
      sn.observe(Oe);
      const ie = (Ve) => {
        U(!Ve[0].isIntersecting);
      }, Re = new IntersectionObserver(ie, ft);
      return Re.observe(Le), () => {
        sn.disconnect(), Re.disconnect();
      };
    }
  }, [F, O, X, m == null ? void 0 : m.length]), b.useEffect(() => {
    Y(!0);
  }, []), b.useEffect(() => {
    Me();
  }), b.useEffect(() => {
    $e(ru !== ne);
  }, [$e, ne]), b.useImperativeHandle(d, () => ({
    updateIndicator: Me,
    updateScrollButtons: $t
  }), [Me, $t]);
  const [Hn, ro] = be("indicator", {
    className: G.indicator,
    elementType: cw,
    externalForwardedProps: ye,
    ownerState: W,
    additionalProps: {
      style: ne
    }
  }), yn = /* @__PURE__ */ l(Hn, {
    ...ro
  }), he = Wp({
    activeItemId: j ? void 0 : ae,
    orientation: w,
    isRtl: s
  }), He = he.getContainerProps(), Zt = b.Children.toArray(m).filter(b.isValidElement).map((le, ce) => {
    const Oe = le.props.value === void 0 ? ce : le.props.value;
    return process.env.NODE_ENV !== "production" && Eo.isFragment(le) && console.error(["MUI: The Tabs component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), Ie.set(Oe, ce), {
      child: le,
      index: ce,
      childValue: Oe
    };
  }).map(({
    child: le,
    childValue: ce
  }) => {
    const Oe = ce === N;
    return /* @__PURE__ */ b.cloneElement(le, {
      fullWidth: A === "fullWidth",
      indicator: Oe && !V && yn,
      selected: Oe,
      selectionFollowsFocus: k,
      onChange: h,
      textColor: S,
      value: ce
    });
  }), Mt = pt(), [Nn, Po] = be("root", {
    ref: o,
    className: de(G.root, y),
    elementType: sw,
    externalForwardedProps: {
      ...ye,
      ...D,
      component: x
    },
    ownerState: W
  }), [kn, Io] = be("scroller", {
    ref: xe,
    className: G.scroller,
    elementType: aw,
    externalForwardedProps: ye,
    ownerState: W,
    additionalProps: {
      style: {
        overflow: Q.overflow,
        [P ? `margin${s ? "Left" : "Right"}` : "marginBottom"]: _ ? void 0 : -Q.scrollbarWidth
      }
    }
  }), Lt = gt(He.ref, Be), Bt = (le) => {
    const ce = Be.current, Oe = Bn(kt(ce));
    (Oe == null ? void 0 : Oe.getAttribute("role")) === "tab" && He.onKeyDown(le);
  }, [Ht, Gn] = be("list", {
    ref: Lt,
    className: G.list,
    elementType: lw,
    externalForwardedProps: ye,
    ownerState: W,
    getSlotProps: (le) => ({
      ...le,
      onBlur: (ce) => {
        var Oe;
        ls(ce.currentTarget, ce.relatedTarget) || me(!1), (Oe = le.onBlur) == null || Oe.call(le, ce);
      },
      onKeyDown: (ce) => {
        var Oe;
        Bt(ce), (Oe = le.onKeyDown) == null || Oe.call(le, ce);
      },
      onFocus: (ce) => {
        var Oe;
        me(!0), He.onFocus(ce), (Oe = le.onFocus) == null || Oe.call(le, ce);
      }
    })
  });
  return /* @__PURE__ */ T(Nn, {
    ...Po,
    children: [Mt.scrollButtonStart, Mt.scrollbarSizeListener, /* @__PURE__ */ T(kn, {
      ...Io,
      children: [/* @__PURE__ */ l(Ht, {
        "aria-label": a,
        "aria-labelledby": c,
        "aria-orientation": w === "vertical" ? "vertical" : null,
        role: "tablist",
        ...Gn,
        children: /* @__PURE__ */ l(Ws.Provider, {
          value: he,
          children: Zt
        })
      }), V && yn]
    }), Mt.scrollButtonEnd]
  });
});
process.env.NODE_ENV !== "production" && (zf.propTypes = {
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
  action: bn,
  /**
   * If `true`, the scroll buttons aren't forced hidden on mobile.
   * By default the scroll buttons are hidden on mobile and takes precedence over `scrollButtons`.
   * @default false
   */
  allowScrollButtonsMobile: n.bool,
  /**
   * The label for the Tabs as a string.
   */
  "aria-label": n.string,
  /**
   * An id or list of ids separated by a space that label the Tabs.
   */
  "aria-labelledby": n.string,
  /**
   * If `true`, the tabs are centered.
   * This prop is intended for large views.
   * @default false
   */
  centered: n.bool,
  /**
   * The content of the component.
   */
  children: n.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: n.object,
  /**
   * @ignore
   */
  className: n.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: n.elementType,
  /**
   * Determines the color of the indicator.
   * @default 'primary'
   */
  indicatorColor: n.oneOfType([n.oneOf(["primary", "secondary"]), n.string]),
  /**
   * Callback fired when the value changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {any} value We default to the index of the child (number)
   */
  onChange: n.func,
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: n.oneOf(["horizontal", "vertical"]),
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
  scrollButtons: n.oneOf(["auto", !1, !0]),
  /**
   * If `true` the selected tab changes on focus. Otherwise it only
   * changes on activation.
   */
  selectionFollowsFocus: n.bool,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: n.shape({
    endScrollButtonIcon: n.oneOfType([n.func, n.object]),
    indicator: n.oneOfType([n.func, n.object]),
    list: n.oneOfType([n.func, n.object]),
    root: n.oneOfType([n.func, n.object]),
    scrollbar: n.oneOfType([n.func, n.object]),
    scrollButtons: n.oneOfType([n.func, n.object]),
    scroller: n.oneOfType([n.func, n.object]),
    startScrollButtonIcon: n.oneOfType([n.func, n.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: n.shape({
    endScrollButtonIcon: n.elementType,
    indicator: n.elementType,
    list: n.elementType,
    root: n.elementType,
    scrollbar: n.elementType,
    scrollButtons: n.elementType,
    scroller: n.elementType,
    startScrollButtonIcon: n.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: n.oneOfType([n.arrayOf(n.oneOfType([n.func, n.object, n.bool])), n.func, n.object]),
  /**
   * Determines the color of the `Tab`.
   * @default 'primary'
   */
  textColor: n.oneOf(["inherit", "primary", "secondary"]),
  /**
   * The value of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this prop to `false`.
   */
  value: n.any,
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
  variant: n.oneOf(["fullWidth", "scrollable", "standard"]),
  /**
   * If `true`, the scrollbar is visible. It can be useful when displaying
   * a long vertical list of tabs.
   * @default false
   */
  visibleScrollbar: n.bool
});
function uw({
  active: e,
  onSelect: t
}) {
  return /* @__PURE__ */ l(
    zf,
    {
      "aria-label": "Dashboard sections",
      onChange: (o, r) => t(r),
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
      children: iS.map((o) => /* @__PURE__ */ l(Ff, { label: o.label, value: o.key }, o.key))
    }
  );
}
function Vt({
  title: e,
  subtitle: t,
  action: o,
  children: r
}) {
  return /* @__PURE__ */ T(
    ht,
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
          pe,
          {
            direction: { xs: "column", sm: "row" },
            spacing: 1,
            sx: {
              mb: 1.5,
              alignItems: { xs: "stretch", sm: "flex-start" },
              justifyContent: "space-between"
            },
            children: [
              /* @__PURE__ */ T(je, { sx: { flex: "1 1 auto", minWidth: 0 }, children: [
                /* @__PURE__ */ l(q, { variant: "caption", sx: { letterSpacing: "0.12em", fontWeight: 600, fontSize: "0.74rem" }, children: e }),
                t ? /* @__PURE__ */ l(q, { variant: "h6", component: "h3", sx: { mt: 0.5, mb: 0, fontWeight: 600 }, children: t }) : null
              ] }),
              o
            ]
          }
        ),
        r
      ]
    }
  );
}
const pw = {
  good: "success",
  warn: "warning",
  bad: "error",
  muted: "default"
};
function en({ tone: e, text: t }) {
  const o = pw[e] ?? "default";
  return /* @__PURE__ */ l(Zr, { label: t, size: "small", variant: "outlined", color: o, sx: { textTransform: "capitalize" } });
}
function Ir(e) {
  return `'${e.replace(/'/g, "'\\''")}'`;
}
function fw(e, t) {
  return [
    `curl -sS -X POST ${Ir(e)} \\`,
    `  -H ${Ir("Content-Type: application/x-www-form-urlencoded")} \\`,
    `  --data-urlencode ${Ir("grant_type=client_credentials")} \\`,
    `  --data-urlencode ${Ir(`client_id=${t}`)} \\`,
    `  --data-urlencode ${Ir("client_secret=YOUR_CLIENT_SECRET")}`
  ].join(`
`);
}
const Ya = [
  { value: "open", label: "Open (no auth)" },
  { value: "api_key", label: "API key (client id in X-API-Key)" },
  { value: "basic", label: "Basic auth" },
  { value: "bearer", label: "Bearer (agent-app JWT)" }
];
function Di(e) {
  const t = Ya.find((o) => o.value === e);
  return (t == null ? void 0 : t.label) ?? e;
}
function Li() {
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
function ba() {
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
function Mn(e) {
  return ir() ? !1 : e instanceof df ? (uf(e.loginPath), !0) : !1;
}
function su(e) {
  if (pf() && e === "home") {
    const t = Qr();
    return t === "home" ? "servers" : t;
  }
  return e;
}
function mw() {
  return cn() ? su(Yn().section ?? Qr()) : su(Qr());
}
const hw = {
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
function gw(e) {
  if (!e)
    return "";
  const t = e.match(/v?\d+\.\d+\.\d+/);
  return t ? t[0] : e.length > 16 ? e.slice(0, 16) : e;
}
function au(e, t) {
  return [.../* @__PURE__ */ new Set([...e, ...t])].sort((o, r) => o.localeCompare(r));
}
function lu(e) {
  return e ? e.split("_").join(" ") : "unknown";
}
function cu(e) {
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
function du(e) {
  return e.split("_").join(" ");
}
function Bi(e) {
  return e.description || "No description";
}
function Fi(e) {
  return e.description || "No description";
}
function bw(e) {
  return e.description || "No description";
}
function uu(e) {
  return e ? JSON.stringify(e, null, 2) : "No schema available.";
}
function pu(e) {
  return !e || e.length === 0 ? "No arguments" : JSON.stringify(e, null, 2);
}
function Zn(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function Vf(e) {
  const t = e.type;
  return typeof t == "string" ? t : Array.isArray(t) && t.every((o) => typeof o == "string") ? t.join(" | ") : Zn(e.properties) ? "object" : e.items ? "array" : Array.isArray(e.enum) && e.enum.length > 0 ? "enum" : "unknown";
}
function hs(e) {
  return e === void 0 ? "" : typeof e == "string" ? e : JSON.stringify(e);
}
function Uf(e) {
  const t = [];
  return Array.isArray(e.oneOf) && e.oneOf.length > 0 && t.push(`${e.oneOf.length} oneOf variants`), Array.isArray(e.anyOf) && e.anyOf.length > 0 && t.push(`${e.anyOf.length} anyOf variants`), e.additionalProperties === !0 && t.push("additional properties allowed"), t.join(", ");
}
function dr(e, t, o, r) {
  const i = {
    path: t,
    type: Vf(e),
    required: o
  };
  typeof e.description == "string" && e.description.trim() && (i.description = e.description), Array.isArray(e.enum) && e.enum.length > 0 && (i.enumValues = e.enum.map((a) => hs(a))), e.default !== void 0 && (i.defaultValue = hs(e.default));
  const s = Uf(e);
  if (s && (i.note = s), r.push(i), Zn(e.properties)) {
    const a = new Set(
      Array.isArray(e.required) ? e.required.filter((c) => typeof c == "string") : []
    );
    Object.entries(e.properties).forEach(([c, d]) => {
      if (!Zn(d))
        return;
      const p = t ? `${t}.${c}` : c;
      dr(d, p, a.has(c), r);
    });
  }
  e.items && Zn(e.items) && dr(e.items, `${t}[]`, !0, r);
}
function yw(e) {
  if (!e)
    return [];
  const t = [];
  if (Zn(e.properties)) {
    const o = new Set(
      Array.isArray(e.required) ? e.required.filter((r) => typeof r == "string") : []
    );
    return Object.entries(e.properties).forEach(([r, i]) => {
      Zn(i) && dr(i, r, o.has(r), t);
    }), t;
  }
  return dr(e, "(root)", !0, t), t;
}
function vw(e) {
  if (!e || e.length === 0)
    return [];
  const t = [];
  return e.forEach((o, r) => {
    const i = typeof o.name == "string" && o.name || typeof o.title == "string" && o.title || `arg${r + 1}`, s = {
      path: i,
      // Prompt arguments are string-like by default unless the backend explicitly provides a schema type.
      type: (() => {
        const c = Vf(o);
        return c === "unknown" ? "string" : c;
      })(),
      required: !!o.required
    };
    typeof o.description == "string" && o.description.trim() && (s.description = o.description), Array.isArray(o.enum) && o.enum.length > 0 && (s.enumValues = o.enum.map((c) => hs(c))), o.default !== void 0 && (s.defaultValue = hs(o.default));
    const a = Uf(o);
    if (a && (s.note = a), t.push(s), Zn(o.properties)) {
      const c = new Set(
        Array.isArray(o.required) ? o.required.filter((d) => typeof d == "string") : []
      );
      Object.entries(o.properties).forEach(([d, p]) => {
        Zn(p) && dr(p, `${i}.${d}`, c.has(d), t);
      });
    }
    o.items && Zn(o.items) && dr(o.items, `${i}[]`, !0, t);
  }), t;
}
function ur() {
  return { key: "", value: "" };
}
function ji() {
  return {
    name: "",
    description: "",
    transport: "streamable_http",
    session_mode: "stateless",
    command: "",
    args_text: "",
    env_rows: [ur()],
    url: "",
    bearer_token: "",
    header_rows: [ur()]
  };
}
function xw(e) {
  const t = e.env ? Object.entries(e.env) : [], o = t.length > 0 ? t.map(([s, a]) => ({ key: s, value: String(a) })) : [ur()], r = e.headers ? Object.entries(e.headers) : [], i = r.length > 0 ? r.map(([s, a]) => ({ key: s, value: String(a) })) : [ur()];
  return {
    name: e.name,
    description: e.description ?? "",
    transport: e.transport,
    session_mode: e.session_mode ?? "stateless",
    command: e.command ?? "",
    args_text: (e.args ?? []).join(`
`),
    env_rows: o,
    url: e.url ?? "",
    bearer_token: e.bearer_token ?? "",
    header_rows: i
  };
}
function fu(e) {
  const t = {};
  return e.forEach((o) => {
    const r = o.key.trim();
    r && (t[r] = o.value);
  }), t;
}
function Sw(e) {
  return e.split(`
`).map((t) => t.trim()).filter(Boolean);
}
function Cw(e) {
  return e.name.trim() ? e.transport === "stdio" && !e.command.trim() ? "Command is required for stdio servers." : (e.transport === "streamable_http" || e.transport === "sse") && !e.url.trim() ? "Target URL is required for HTTP and SSE servers." : "" : "Server name is required.";
}
function mu(e) {
  const t = {
    name: e.name.trim(),
    description: e.description.trim(),
    transport: e.transport,
    session_mode: e.session_mode
  };
  if (e.transport === "stdio") {
    t.command = e.command.trim(), t.args = Sw(e.args_text);
    const o = fu(e.env_rows);
    return Object.keys(o).length > 0 && (t.env = o), t;
  }
  if (t.url = e.url.trim(), e.bearer_token.trim() && (t.bearer_token = e.bearer_token.trim()), e.transport === "streamable_http") {
    const o = fu(e.header_rows);
    Object.keys(o).length > 0 && (t.headers = o);
  }
  return t;
}
function ya() {
  return {
    name: "",
    description: "",
    securityOption: "basic",
    selectedTools: []
  };
}
function va() {
  return {
    name: "",
    description: "",
    securityOption: "basic",
    selectedPrompts: []
  };
}
function ww() {
  var Yl, Xl, Jl, Ql, Zl, ec, tc, nc, oc, rc, ic, sc, ac, lc, cc, dc, uc, pc;
  const e = ir(), t = pf(), [o, r] = Ne(mw), [i, s] = Ne(null), a = km((u) => {
    var R;
    if (!(t && u === "home")) {
      if (!e && (i != null && i.oidc_enabled) && !i.authenticated && u !== "home") {
        const L = (R = i.login_path) == null ? void 0 : R.trim();
        L && uf(L);
        return;
      }
      r(u), cn() && lt(yt(u));
    }
  }, [i, t, e]), [c, d] = Ne("checking_session"), [p, m] = Ne(""), [y, x] = Ne(null), [f, v] = Ne({}), [h, w] = Ne(""), [O, k] = Ne(""), [E, C] = Ne("all"), [S, N] = Ne(""), [A, _] = Ne(""), [D, F] = Ne("all"), [P, g] = Ne(""), [$, I] = Ne("all"), [M, B] = Ne(() => {
    if (!cn()) return null;
    const u = Yn();
    return u.section === "servers" ? u.serverName : null;
  }), [W, G] = Ne(() => {
    if (!cn()) return null;
    const u = Yn();
    return u.section === "tools" ? u.toolCanonicalName : null;
  }), [oe, z] = Ne(() => {
    if (!cn()) return null;
    const u = Yn();
    return u.section === "tool_groups" ? u.toolGroupName : null;
  }), [V, Y] = Ne(() => {
    if (!cn()) return null;
    const u = Yn();
    return u.section === "prompt_groups" ? u.promptGroupName : null;
  }), [ne, te] = Ne(() => {
    if (!cn()) return null;
    const u = Yn();
    return u.section === "prompts" ? u.promptCanonicalName : null;
  }), [re, ee] = Ne(!1), [K, U] = Ne(null), [X, Z] = Ne(!1), [ae, j] = Ne(ji()), [me, Q] = Ne(""), [fe, Ie] = Ne(null), [xe, Be] = Ne(!1), [ye, Ge] = Ne(null), [Me, Fe] = Ne(ya()), [rt, ke] = Ne(""), [Ue, ut] = Ne(!1), [De, tt] = Ne(null), [We, ue] = Ne(va()), [Ae, ze] = Ne(""), [pt, $e] = Ne(!1), [$t, Hn] = Ne(null), [ro, yn] = Ne(""), [he, He] = Ne(""), [Ct, Zt] = Ne(""), [Mt, Nn] = Ne(""), [Po, kn] = Ne(!1), [Io, Lt] = Ne(""), [Bt, Ht] = Ne(
    null
  ), [Gn, le] = Ne(() => {
    if (!cn()) return null;
    const u = Yn();
    return u.section === "agent_apps" ? u.agentAppId : null;
  }), [ce, Oe] = Ne({});
  $r(() => {
    if (!cn() || Wd() !== null)
      return;
    const { pathname: u, search: R } = window.location;
    $n(u, R, yt(Qr())), r(Qr()), le(null), B(null), z(null), Y(null), G(null), te(null);
  }, []), $r(() => {
    if (!cn())
      return;
    function u() {
      const R = Yn();
      if (R.section !== null) {
        if (!e && (i != null && i.oidc_enabled) && !i.authenticated && R.section !== "home") {
          const { pathname: L, search: se } = window.location;
          $n(L, se, yt("home")), r("home"), le(null), B(null), z(null), Y(null), G(null), te(null);
          return;
        }
        r(R.section), le(R.section === "agent_apps" ? R.agentAppId : null), B(R.section === "servers" ? R.serverName : null), z(R.section === "tool_groups" ? R.toolGroupName : null), Y(R.section === "prompt_groups" ? R.promptGroupName : null), G(R.section === "tools" ? R.toolCanonicalName : null), te(R.section === "prompts" ? R.promptCanonicalName : null);
      }
    }
    return window.addEventListener("hashchange", u), () => window.removeEventListener("hashchange", u);
  }, [i]);
  async function Le(u) {
    const [R, L, se, ve, ct, Rt, zt, ho] = await Promise.all([
      _e.servers(),
      _e.tools(),
      _e.toolGroups(),
      _e.promptGroups(),
      _e.prompts(),
      _e.resources(),
      _e.diagnostics(),
      _e.agentApps()
    ]);
    return { overview: u, servers: R, tools: L, toolGroups: se, promptGroups: ve, prompts: ct, resources: Rt, diagnostics: zt, agentApps: ho };
  }
  async function ft() {
    const [u, R, L, se, ve, ct, Rt, zt, ho] = await Promise.all([
      _e.overview(),
      _e.servers(),
      _e.tools(),
      _e.toolGroups(),
      _e.promptGroups(),
      _e.prompts(),
      _e.resources(),
      _e.diagnostics(),
      _e.agentApps()
    ]);
    return { overview: u, servers: R, tools: L, toolGroups: se, promptGroups: ve, prompts: ct, resources: Rt, diagnostics: zt, agentApps: ho };
  }
  function Gt(u) {
    const { overview: R, servers: L, tools: se, toolGroups: ve, promptGroups: ct, prompts: Rt, resources: zt, diagnostics: ho, agentApps: fc } = u;
    v({
      overview: R,
      servers: L,
      tools: se,
      toolGroups: ve,
      promptGroups: ct,
      prompts: Rt,
      resources: zt,
      diagnostics: ho,
      agentApps: fc
    }), B((bt) => {
      if (bt === null)
        return null;
      if (L.servers.some((Sn) => Sn.name === bt))
        return bt;
      const { pathname: vn, search: xn } = window.location;
      return $n(vn, xn, yt("servers")), null;
    }), G((bt) => {
      if (bt === null)
        return null;
      if (se.tools.some((Sn) => Sn.canonical_name === bt))
        return bt;
      const { pathname: vn, search: xn } = window.location;
      return $n(vn, xn, yt("tools")), null;
    }), z((bt) => {
      if (bt === null)
        return null;
      if (ve.tool_groups.some((Sn) => Sn.name === bt))
        return bt;
      const { pathname: vn, search: xn } = window.location;
      return $n(vn, xn, yt("tool_groups")), null;
    }), Y((bt) => {
      if (bt === null)
        return null;
      if (ct.prompt_groups.some((Sn) => Sn.name === bt))
        return bt;
      const { pathname: vn, search: xn } = window.location;
      return $n(vn, xn, yt("prompt_groups")), null;
    }), te((bt) => {
      if (bt === null)
        return null;
      if (Rt.prompts.some((Sn) => Sn.canonical_name === bt))
        return bt;
      const { pathname: vn, search: xn } = window.location;
      return $n(vn, xn, yt("prompts")), null;
    }), le((bt) => {
      if (bt === null)
        return null;
      if (fc.apps.some((Sn) => Sn.id === bt))
        return bt;
      const { pathname: vn, search: xn } = window.location;
      return $n(vn, xn, yt("agent_apps")), null;
    });
  }
  async function sn() {
    d("checking_session"), m("");
    try {
      if (e) {
        const L = mf();
        if (L === null)
          throw new Zo(
            "Missing authentication token — pass token to <MCPGatewayDashboard /> or set localStorage tenant_id_token"
          );
        const se = hf(L);
        gf(), s({
          authenticated: !0,
          oidc_enabled: !0,
          email: se.email,
          sub: se.sub
        }), d("loading");
        const ve = await _e.overview(), ct = await Le(ve);
        Gt(ct), d("ready");
        return;
      }
      const u = await _e.authStatus();
      if (s(u), !u.oidc_enabled || u.authenticated) {
        d("loading");
        const L = await _e.overview(), se = await Le(L);
        Gt(se), d("ready");
        return;
      }
      v({});
      const R = Wd();
      if (R !== null && R !== "home") {
        const { pathname: L, search: se } = window.location;
        $n(L, se, yt("home")), r("home"), le(null), B(null), z(null), Y(null), G(null), te(null);
      }
      d("ready");
    } catch (u) {
      if (Mn(u))
        return;
      const R = u instanceof Error ? u.message : "Unknown error";
      m(R), d("error");
    }
  }
  async function ie(u = !1) {
    u || d("loading"), m("");
    try {
      const R = await ft();
      Gt(R), d("ready");
    } catch (R) {
      if (Mn(R))
        return;
      const L = R instanceof Error ? R.message : "Unknown error";
      m(L), d("error");
    }
  }
  $r(() => {
    sn();
  }, []);
  const Re = At(() => {
    var L;
    const u = ((L = f.servers) == null ? void 0 : L.servers) ?? [];
    if (!h.trim())
      return u;
    const R = h.toLowerCase();
    return u.filter(
      (se) => se.name.toLowerCase().includes(R) || se.transport.toLowerCase().includes(R) || se.connection_summary.toLowerCase().includes(R)
    );
  }, [(Yl = f.servers) == null ? void 0 : Yl.servers, h]), Ve = At(() => {
    var L;
    let u = ((L = f.tools) == null ? void 0 : L.tools) ?? [];
    if (E !== "all" && (u = u.filter((se) => se.server === E)), !O.trim())
      return u;
    const R = O.toLowerCase();
    return u.filter(
      (se) => se.name.toLowerCase().includes(R) || se.server.toLowerCase().includes(R) || se.canonical_name.toLowerCase().includes(R) || Bi(se).toLowerCase().includes(R)
    );
  }, [(Xl = f.tools) == null ? void 0 : Xl.tools, O, E]), wt = At(() => {
    var R;
    const u = new Set((((R = f.tools) == null ? void 0 : R.tools) ?? []).map((L) => L.server));
    return Array.from(u).sort();
  }, [(Jl = f.tools) == null ? void 0 : Jl.tools]), an = At(() => {
    var L;
    let u = ((L = f.tools) == null ? void 0 : L.tools) ?? [];
    if (D !== "all" && (u = u.filter((se) => se.server === D)), !A.trim())
      return u;
    const R = A.toLowerCase();
    return u.filter(
      (se) => se.name.toLowerCase().includes(R) || se.canonical_name.toLowerCase().includes(R) || se.server.toLowerCase().includes(R) || Bi(se).toLowerCase().includes(R)
    );
  }, [(Ql = f.tools) == null ? void 0 : Ql.tools, A, D]), ui = At(() => {
    var R;
    const u = new Set((((R = f.prompts) == null ? void 0 : R.prompts) ?? []).map((L) => L.server));
    return Array.from(u).sort();
  }, [(Zl = f.prompts) == null ? void 0 : Zl.prompts]), pi = At(() => {
    var L;
    let u = ((L = f.prompts) == null ? void 0 : L.prompts) ?? [];
    if ($ !== "all" && (u = u.filter((se) => se.server === $)), !P.trim())
      return u;
    const R = P.toLowerCase();
    return u.filter(
      (se) => se.name.toLowerCase().includes(R) || se.canonical_name.toLowerCase().includes(R) || se.server.toLowerCase().includes(R) || Fi(se).toLowerCase().includes(R)
    );
  }, [(ec = f.prompts) == null ? void 0 : ec.prompts, P, $]), Fl = At(() => {
    var L;
    const u = ((L = f.prompts) == null ? void 0 : L.prompts) ?? [];
    if (!S.trim())
      return u;
    const R = S.toLowerCase();
    return u.filter(
      (se) => se.name.toLowerCase().includes(R) || se.canonical_name.toLowerCase().includes(R) || se.server.toLowerCase().includes(R) || Fi(se).toLowerCase().includes(R)
    );
  }, [(tc = f.prompts) == null ? void 0 : tc.prompts, S]), fi = At(
    () => {
      var u;
      return [...((u = f.toolGroups) == null ? void 0 : u.tool_groups) ?? []].map((R) => R.name).sort((R, L) => R.localeCompare(L));
    },
    [(nc = f.toolGroups) == null ? void 0 : nc.tool_groups]
  ), mi = At(
    () => {
      var u;
      return [...((u = f.promptGroups) == null ? void 0 : u.prompt_groups) ?? []].map((R) => R.name).sort((R, L) => R.localeCompare(L));
    },
    [(oc = f.promptGroups) == null ? void 0 : oc.prompt_groups]
  ), Hf = At(
    () => au(fi, Ct ? [Ct] : []),
    [fi, Ct]
  ), Gf = At(
    () => au(mi, Mt ? [Mt] : []),
    [mi, Mt]
  ), gr = At(() => {
    var R;
    const u = (R = f.agentApps) == null ? void 0 : R.apps;
    return !(u != null && u.length) || Gn === null ? null : u.find((L) => L.id === Gn) ?? null;
  }, [(rc = f.agentApps) == null ? void 0 : rc.apps, Gn]), br = At(() => {
    var R;
    const u = (R = f.servers) == null ? void 0 : R.servers;
    return !(u != null && u.length) || M === null ? null : u.find((L) => L.name === M) ?? null;
  }, [(ic = f.servers) == null ? void 0 : ic.servers, M]), yr = At(() => {
    var R;
    const u = (R = f.toolGroups) == null ? void 0 : R.tool_groups;
    return !(u != null && u.length) || oe === null ? null : u.find((L) => L.name === oe) ?? null;
  }, [(sc = f.toolGroups) == null ? void 0 : sc.tool_groups, oe]), vr = At(() => {
    var R;
    const u = (R = f.promptGroups) == null ? void 0 : R.prompt_groups;
    return !(u != null && u.length) || V === null ? null : u.find((L) => L.name === V) ?? null;
  }, [(ac = f.promptGroups) == null ? void 0 : ac.prompt_groups, V]), xr = At(() => {
    var R;
    const u = (R = f.tools) == null ? void 0 : R.tools;
    return !(u != null && u.length) || W === null ? null : u.find((L) => L.canonical_name === W) ?? null;
  }, [(lc = f.tools) == null ? void 0 : lc.tools, W]), Sr = At(() => {
    var R;
    const u = (R = f.prompts) == null ? void 0 : R.prompts;
    return !(u != null && u.length) || ne === null ? null : u.find((L) => L.canonical_name === ne) ?? null;
  }, [(cc = f.prompts) == null ? void 0 : cc.prompts, ne]), Wt = f.overview, fo = f.diagnostics;
  f.agentApps;
  const jl = !e && i !== null && i.oidc_enabled && !i.authenticated, qf = !e && (i != null && i.oidc_enabled) && i.authenticated ? (Wt == null ? void 0 : Wt.oidc_logout_path) ?? i.logout_path : void 0, Kf = e && !t ? (dc = i == null ? void 0 : i.email) == null ? void 0 : dc.trim() : void 0, Qs = hw[o];
  function ln(u, R) {
    Oe((L) => {
      const se = { ...L };
      return R ? se[u] = !0 : delete se[u], se;
    });
  }
  function qe(u) {
    return !!ce[u];
  }
  async function io(u, R, L) {
    x(null), ln(u, !0);
    try {
      await R(), await ie(!0), x({ tone: "success", message: L });
    } catch (se) {
      if (Mn(se))
        return;
      const ve = se instanceof Error ? se.message : "Request failed";
      throw x({ tone: "error", message: ve }), se;
    } finally {
      ln(u, !1);
    }
  }
  function so(u, R) {
    j((L) => ({ ...L, [u]: R }));
  }
  function hi(u, R, L, se) {
    j((ve) => {
      const ct = ve[u].map(
        (Rt, zt) => zt === R ? { ...Rt, [L]: se } : Rt
      );
      return { ...ve, [u]: ct };
    });
  }
  function Wl(u) {
    j((R) => ({ ...R, [u]: [...R[u], ur()] }));
  }
  function zl(u, R) {
    j((L) => {
      const se = L[u].filter((ve, ct) => ct !== R);
      return { ...L, [u]: se.length > 0 ? se : [ur()] };
    });
  }
  function Vl() {
    j(ji()), U(null), Z(!1), Q(""), Ie(null), ee(!0);
  }
  function mo() {
    ee(!1), U(null), Z(!1), Q(""), Ie(null), j(ji());
  }
  async function Yf(u) {
    Q(""), Ie(null), U(u), ee(!0), Z(!0), j(ji());
    try {
      const R = await _e.getServerConfig(u);
      j(xw(R));
    } catch (R) {
      if (Mn(R))
        return;
      const L = R instanceof Error ? R.message : "Failed to load server configuration";
      x({ tone: "error", message: L }), mo();
    } finally {
      Z(!1);
    }
  }
  function Xf(u = "") {
    Ie(null), Q(u);
  }
  function Ul() {
    Ge(null), Fe(ya()), ke(""), _(""), F("all"), Be(!0);
  }
  function Jf(u) {
    Ge(u.name), Fe({
      name: u.name,
      description: u.description ?? "",
      securityOption: u.security_option,
      selectedTools: u.tools.map((R) => R.canonical_name)
    }), ke(""), _(""), F("all"), Be(!0);
  }
  function gi() {
    Be(!1), Ge(null), Fe(ya()), ke("");
  }
  function Qf(u) {
    Fe((R) => ({
      ...R,
      selectedTools: R.selectedTools.includes(u) ? R.selectedTools.filter((L) => L !== u) : [...R.selectedTools, u]
    }));
  }
  function Zf(u) {
    Fe((R) => ({
      ...R,
      selectedTools: R.selectedTools.filter((L) => L !== u)
    }));
  }
  function Hl() {
    tt(null), ue(va()), ze(""), g(""), I("all"), ut(!0);
  }
  function em(u) {
    tt(u.name), ue({
      name: u.name,
      description: u.description ?? "",
      securityOption: u.security_option,
      selectedPrompts: u.prompts.map((R) => R.canonical_name)
    }), ze(""), g(""), I("all"), ut(!0);
  }
  function bi() {
    ut(!1), tt(null), ue(va()), ze("");
  }
  function tm(u) {
    ue((R) => ({
      ...R,
      selectedPrompts: R.selectedPrompts.includes(u) ? R.selectedPrompts.filter((L) => L !== u) : [...R.selectedPrompts, u]
    }));
  }
  function nm(u) {
    ue((R) => ({
      ...R,
      selectedPrompts: R.selectedPrompts.filter((L) => L !== u)
    }));
  }
  async function om() {
    const u = Cw(ae);
    if (u) {
      Q(u);
      return;
    }
    Q("");
    try {
      x(null), ln("register-server", !0);
      const R = K;
      if (R) {
        await _e.updateServer(R, mu(ae)), await ie(!0), x({ tone: "success", message: `Server ${ae.name.trim()} updated.` }), mo();
        return;
      }
      const L = await _e.registerServer(mu(ae));
      if (L.authorization_required) {
        Ie({
          authorization: L.authorization_required,
          hasOpenedBrowser: !1,
          error: ""
        }), x(null);
        return;
      }
      await ie(!0), x({ tone: "success", message: `Server ${ae.name.trim()} registered.` }), mo();
    } catch (R) {
      if (Mn(R))
        return;
      const L = R instanceof Error ? R.message : "Request failed";
      Q(L), x({ tone: "error", message: L });
    } finally {
      ln("register-server", !1);
    }
  }
  function rm() {
    fe && (window.open(fe.authorization.authorization_url, "_blank", "noopener,noreferrer"), Ie(
      (u) => u && {
        ...u,
        hasOpenedBrowser: !0,
        error: ""
      }
    ));
  }
  $r(() => {
    if (!(fe != null && fe.hasOpenedBrowser))
      return;
    let u = !1;
    const R = fe.authorization.session_id;
    async function L() {
      try {
        const ve = await _e.getOAuthSession(R);
        if (u || ve.status === "pending")
          return;
        if (ve.status === "completed") {
          if (await ie(!0), u)
            return;
          x({
            tone: "success",
            message: `Server ${ve.server_name ?? ae.name.trim()} registered.`
          }), mo();
          return;
        }
        Ie(
          (ct) => ct && {
            ...ct,
            hasOpenedBrowser: !1,
            error: ve.error || "OAuth authorization could not be completed. Start registration again."
          }
        );
      } catch (ve) {
        if (u || Mn(ve))
          return;
        const ct = ve instanceof Error ? ve.message : "Failed to check OAuth authorization state.";
        Ie(
          (Rt) => Rt && {
            ...Rt,
            hasOpenedBrowser: !1,
            error: ct
          }
        );
      }
    }
    L();
    const se = window.setInterval(() => {
      L();
    }, 2e3);
    return () => {
      u = !0, window.clearInterval(se);
    };
  }, [fe == null ? void 0 : fe.authorization.session_id, fe == null ? void 0 : fe.hasOpenedBrowser]);
  async function im(u) {
    const R = !u.enabled;
    await io(
      `server-toggle:${u.name}`,
      async () => {
        await _e.setServerEnabled(u.name, R);
      },
      `${u.name} ${R ? "enabled" : "disabled"}.`
    );
  }
  async function sm(u) {
    if (window.confirm(
      `Delete server "${u.name}"? This removes the registration and all discovered tools, prompts, and resources from MCP Gateway.`
    ) && (await io(
      `server-delete:${u.name}`,
      async () => {
        await _e.deleteServer(u.name);
      },
      `${u.name} deleted.`
    ), M === u.name)) {
      B(null);
      const { pathname: L, search: se } = window.location;
      $n(L, se, yt("servers"));
    }
  }
  async function am(u) {
    const R = !u.enabled;
    await io(
      `tool-toggle:${u.canonical_name}`,
      async () => {
        await _e.setToolEnabled(u.canonical_name, R);
      },
      `${u.canonical_name} ${R ? "enabled" : "disabled"}.`
    );
  }
  async function lm(u) {
    const R = !u.enabled;
    await io(
      `prompt-toggle:${u.canonical_name}`,
      async () => {
        await _e.setPromptEnabled(u.canonical_name, R);
      },
      `${u.canonical_name} ${R ? "enabled" : "disabled"}.`
    );
  }
  async function cm() {
    var se;
    const u = ye, R = u ?? Me.name.trim();
    if (!R) {
      ke("Group name is required.");
      return;
    }
    if (Me.selectedTools.length === 0) {
      ke("Select at least one tool.");
      return;
    }
    if (!u && (((se = f.toolGroups) == null ? void 0 : se.tool_groups) ?? []).some((ve) => ve.name === R)) {
      ke("A tool group with that name already exists.");
      return;
    }
    ke(""), x(null);
    const L = u ? "tool-group-save" : "tool-group-create";
    ln(L, !0);
    try {
      if (u)
        await _e.updateToolGroup(u, {
          description: Me.description.trim(),
          tools: Me.selectedTools,
          security_option: Me.securityOption
        }), await ie(!0), x({ tone: "success", message: `Tool group ${u} updated.` });
      else {
        const ve = {
          name: R,
          description: Me.description.trim(),
          tools: Me.selectedTools,
          security_option: Me.securityOption
        };
        await _e.createToolGroup(ve), await ie(!0), x({ tone: "success", message: `Tool group ${R} created.` });
      }
      gi(), lt(Pi(u || R));
    } catch (ve) {
      if (Mn(ve))
        return;
      const ct = ve instanceof Error ? ve.message : "Request failed";
      ke(ct), x({ tone: "error", message: ct });
    } finally {
      ln(L, !1);
    }
  }
  async function dm() {
    var se;
    const u = De, R = u ?? We.name.trim();
    if (!R) {
      ze("Group name is required.");
      return;
    }
    if (We.selectedPrompts.length === 0) {
      ze("Select at least one prompt.");
      return;
    }
    if (!u && (((se = f.promptGroups) == null ? void 0 : se.prompt_groups) ?? []).some((ve) => ve.name === R)) {
      ze("A prompt group with that name already exists.");
      return;
    }
    ze(""), x(null);
    const L = u ? "prompt-group-save" : "prompt-group-create";
    ln(L, !0);
    try {
      if (u)
        await _e.updatePromptGroup(u, {
          description: We.description.trim(),
          prompts: We.selectedPrompts,
          security_option: We.securityOption
        }), await ie(!0), x({ tone: "success", message: `Prompt group ${u} updated.` });
      else {
        const ve = {
          name: R,
          description: We.description.trim(),
          prompts: We.selectedPrompts,
          security_option: We.securityOption
        };
        await _e.createPromptGroup(ve), await ie(!0), x({ tone: "success", message: `Prompt group ${R} created.` });
      }
      bi(), lt(Ii(u || R));
    } catch (ve) {
      if (Mn(ve))
        return;
      const ct = ve instanceof Error ? ve.message : "Request failed";
      ze(ct), x({ tone: "error", message: ct });
    } finally {
      ln(L, !1);
    }
  }
  async function um(u) {
    window.confirm(`Delete tool group "${u.name}"?`) && await io(
      `tool-group-delete:${u.name}`,
      async () => {
        await _e.deleteToolGroup(u.name);
      },
      `${u.name} deleted.`
    );
  }
  async function pm(u) {
    window.confirm(`Delete prompt group "${u.name}"?`) && await io(
      `prompt-group-delete:${u.name}`,
      async () => {
        await _e.deletePromptGroup(u.name);
      },
      `${u.name} deleted.`
    );
  }
  function Gl() {
    Hn(null), yn(""), He(""), Zt(""), Nn(""), kn(!1), Lt(""), $e(!0);
  }
  function fm(u) {
    Hn(u.id), yn(u.name), He(u.description ?? ""), Lt("");
    const R = u.tool_group_names ?? [], L = u.prompt_group_names ?? [];
    R.length === 0 && L.length === 0 || R.length > 1 || L.length > 1 || R.length > 0 && L.length > 0 ? (Zt(""), Nn(""), kn(!0)) : (kn(!1), Zt(R[0] ?? ""), Nn(L[0] ?? "")), $e(!0);
  }
  function yi() {
    $e(!1), Lt(""), Hn(null), yn(""), He(""), Zt(""), Nn(""), kn(!1);
  }
  async function mm() {
    const u = ro.trim();
    if (!u) {
      Lt("Name is required.");
      return;
    }
    const R = Ct.trim() ? [Ct.trim()] : [], L = Mt.trim() ? [Mt.trim()] : [];
    if (!(R.length === 1 && L.length === 0 || R.length === 0 && L.length === 1)) {
      Lt("Select exactly one tool group or exactly one prompt group.");
      return;
    }
    Lt(""), x(null);
    const ve = $t, ct = ve !== null ? `agent-app-edit:${ve}` : "agent-app-create";
    ln(ct, !0);
    try {
      if (ve !== null) {
        const ho = {
          name: u,
          description: he.trim(),
          tool_group_names: R,
          prompt_group_names: L
        };
        await _e.patchAgentApp(ve, ho), yi(), await ie(!0), x({ tone: "success", message: `${u} updated.` });
        return;
      }
      const Rt = {
        name: u,
        description: he.trim() || void 0,
        tool_group_names: R,
        prompt_group_names: L
      }, zt = await _e.createAgentApp(Rt);
      Ht({
        title: `Client secret for ${zt.app.name}`,
        secret: zt.client_secret
      }), yi(), await ie(!0), lt(ha(zt.app.id)), x({
        tone: "success",
        message: `${zt.app.name} created. Copy the client secret from the dialog — it will not be shown again.`
      });
    } catch (Rt) {
      if (Mn(Rt))
        return;
      const zt = Rt instanceof Error ? Rt.message : "Request failed";
      Lt(zt), x({ tone: "error", message: zt });
    } finally {
      ln(ct, !1);
    }
  }
  async function hm(u) {
    window.confirm(`Delete agent app "${u.name}"? This cannot be undone.`) && await io(
      `agent-app-delete:${u.id}`,
      async () => {
        await _e.deleteAgentApp(u.id);
      },
      `${u.name} deleted.`
    );
  }
  async function gm(u) {
    const R = u.status === "enabled" ? "disabled" : "enabled";
    await io(
      `agent-app-status:${u.id}`,
      async () => {
        await _e.patchAgentApp(u.id, { status: R });
      },
      R === "enabled" ? `${u.name} enabled.` : `${u.name} disabled.`
    );
  }
  async function bm(u) {
    if (window.confirm(
      `Rotate secret for "${u.name}"? The previous secret stops working immediately.`
    )) {
      x(null), ln(`agent-app-rotate:${u.id}`, !0);
      try {
        const L = await _e.rotateAgentAppSecret(u.id);
        Ht({
          title: `New client secret for ${u.name}`,
          secret: L.client_secret
        }), await ie(!0), x({
          tone: "success",
          message: `Secret rotated for ${u.name}. Copy it from the dialog — it will not be shown again.`
        });
      } catch (L) {
        if (Mn(L))
          return;
        const se = L instanceof Error ? L.message : "Request failed";
        x({ tone: "error", message: se });
      } finally {
        ln(`agent-app-rotate:${u.id}`, !1);
      }
    }
  }
  function ql(u, R) {
    return R != null && R.length ? /* @__PURE__ */ T(je, { sx: { mt: 2 }, children: [
      /* @__PURE__ */ l(q, { variant: "subtitle2", sx: { mb: 1 }, children: u }),
      /* @__PURE__ */ l(pe, { spacing: 2, children: R.map((L) => /* @__PURE__ */ T(ht, { variant: "outlined", sx: { p: 1.5, borderRadius: 2 }, children: [
        /* @__PURE__ */ l(q, { variant: "body2", sx: { fontWeight: 700, mb: 1 }, children: L.name }),
        /* @__PURE__ */ T("div", { className: "tool-group-endpoints", children: [
          /* @__PURE__ */ T("div", { className: "tool-group-endpoint-row", children: [
            /* @__PURE__ */ l("span", { className: "tool-group-endpoint-label", children: "Streamable HTTP" }),
            /* @__PURE__ */ T("div", { className: "tool-group-endpoint-value", children: [
              /* @__PURE__ */ l("code", { className: "detail-target-code", title: L.streamable_http_endpoint, children: L.streamable_http_endpoint }),
              /* @__PURE__ */ l(
                vt,
                {
                  ariaLabel: "Copy Streamable HTTP endpoint",
                  title: "Copy Streamable HTTP endpoint",
                  value: L.streamable_http_endpoint
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ T("div", { className: "tool-group-endpoint-row", children: [
            /* @__PURE__ */ l("span", { className: "tool-group-endpoint-label", children: "SSE" }),
            /* @__PURE__ */ T("div", { className: "tool-group-endpoint-stack", children: [
              /* @__PURE__ */ T("div", { className: "tool-group-endpoint-value", children: [
                /* @__PURE__ */ l("code", { className: "detail-target-code", title: L.sse_endpoint, children: L.sse_endpoint }),
                /* @__PURE__ */ l(vt, { ariaLabel: "Copy SSE endpoint", title: "Copy SSE endpoint", value: L.sse_endpoint })
              ] }),
              L.sse_message_endpoint ? /* @__PURE__ */ T("div", { className: "tool-group-endpoint-value", children: [
                /* @__PURE__ */ l("code", { className: "detail-target-code", title: L.sse_message_endpoint, children: L.sse_message_endpoint }),
                /* @__PURE__ */ l(
                  vt,
                  {
                    ariaLabel: "Copy SSE message endpoint",
                    title: "Copy SSE message endpoint",
                    value: L.sse_message_endpoint
                  }
                )
              ] }) : null
            ] })
          ] })
        ] })
      ] }, L.name)) })
    ] }) : null;
  }
  function ym(u) {
    return /* @__PURE__ */ T(qt, { children: [
      /* @__PURE__ */ T(pe, { direction: "row", spacing: 1, sx: { justifyContent: "flex-end", flexWrap: "wrap", mb: 2 }, children: [
        /* @__PURE__ */ l(
          tn,
          {
            "aria-label": "Edit tool group",
            disabled: qe("tool-group-save") || qe("tool-group-create"),
            onClick: (R) => {
              R.stopPropagation(), Jf(u);
            },
            title: "Edit tool group",
            size: "small",
            children: /* @__PURE__ */ l(ba, {})
          }
        ),
        /* @__PURE__ */ l(
          tn,
          {
            "aria-label": "Delete tool group",
            color: "error",
            disabled: qe(`tool-group-delete:${u.name}`),
            onClick: (R) => {
              R.stopPropagation(), um(u);
            },
            title: "Delete tool group",
            size: "small",
            children: /* @__PURE__ */ l(Li, {})
          }
        )
      ] }),
      /* @__PURE__ */ T("div", { className: "tool-detail-panel", children: [
        /* @__PURE__ */ l("div", { className: "tool-detail-header", children: /* @__PURE__ */ l("p", { className: "panel-label", children: "Tool group details" }) }),
        /* @__PURE__ */ l("dl", { className: "tool-detail-meta", children: /* @__PURE__ */ T("div", { className: "tool-detail-description", children: [
          /* @__PURE__ */ l("dt", { children: "MCP security" }),
          /* @__PURE__ */ T("dd", { children: [
            Di(u.security_option),
            " ",
            /* @__PURE__ */ T("code", { className: "identifier-code", children: [
              "(",
              u.security_option,
              ")"
            ] })
          ] })
        ] }) }),
        u.description ? /* @__PURE__ */ l("dl", { className: "tool-detail-meta", children: /* @__PURE__ */ T("div", { className: "tool-detail-description", children: [
          /* @__PURE__ */ l("dt", { children: "Description" }),
          /* @__PURE__ */ l("dd", { children: u.description })
        ] }) }) : null,
        /* @__PURE__ */ T("div", { className: "tool-schema-section", children: [
          /* @__PURE__ */ l("div", { className: "tool-schema-header", children: /* @__PURE__ */ l("h4", { children: "MCP endpoints" }) }),
          /* @__PURE__ */ T("div", { className: "tool-group-endpoints", children: [
            /* @__PURE__ */ T("div", { className: "tool-group-endpoint-row", children: [
              /* @__PURE__ */ l("span", { className: "tool-group-endpoint-label", children: "Streamable HTTP" }),
              /* @__PURE__ */ T("div", { className: "tool-group-endpoint-value", children: [
                /* @__PURE__ */ l("code", { className: "detail-target-code", title: u.streamable_http_endpoint, children: u.streamable_http_endpoint }),
                /* @__PURE__ */ l(
                  vt,
                  {
                    ariaLabel: "Copy Streamable HTTP endpoint",
                    title: "Copy Streamable HTTP endpoint",
                    value: u.streamable_http_endpoint
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ T("div", { className: "tool-group-endpoint-row", children: [
              /* @__PURE__ */ l("span", { className: "tool-group-endpoint-label", children: "SSE" }),
              /* @__PURE__ */ T("div", { className: "tool-group-endpoint-stack", children: [
                /* @__PURE__ */ T("div", { className: "tool-group-endpoint-value", children: [
                  /* @__PURE__ */ l("code", { className: "detail-target-code", title: u.sse_endpoint, children: u.sse_endpoint }),
                  /* @__PURE__ */ l(vt, { ariaLabel: "Copy SSE endpoint", title: "Copy SSE endpoint", value: u.sse_endpoint })
                ] }),
                /* @__PURE__ */ T("div", { className: "tool-group-endpoint-value", children: [
                  /* @__PURE__ */ l("code", { className: "detail-target-code", title: u.sse_message_endpoint, children: u.sse_message_endpoint }),
                  /* @__PURE__ */ l(
                    vt,
                    {
                      ariaLabel: "Copy SSE message endpoint",
                      title: "Copy SSE message endpoint",
                      value: u.sse_message_endpoint
                    }
                  )
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ T("div", { className: "tool-schema-section", children: [
          /* @__PURE__ */ l("div", { className: "tool-schema-header", children: /* @__PURE__ */ l("h4", { children: "Included tools" }) }),
          u.tools.length > 0 ? /* @__PURE__ */ l("div", { className: "schema-field-list", children: u.tools.map((R) => /* @__PURE__ */ T("article", { className: "schema-field-card", children: [
            /* @__PURE__ */ T("div", { className: "schema-field-head", children: [
              /* @__PURE__ */ l("code", { children: R.canonical_name }),
              /* @__PURE__ */ l("span", { className: "schema-type-pill", children: /* @__PURE__ */ l("code", { children: R.server }) })
            ] }),
            /* @__PURE__ */ l("dl", { className: "schema-field-meta", children: R.description ? /* @__PURE__ */ T("div", { children: [
              /* @__PURE__ */ l("dt", { children: "Description" }),
              /* @__PURE__ */ l("dd", { children: R.description })
            ] }) : null })
          ] }, R.canonical_name)) }) : /* @__PURE__ */ l("p", { className: "empty-inline", children: "No tools in this group." })
        ] })
      ] })
    ] });
  }
  function vm(u) {
    return /* @__PURE__ */ T(qt, { children: [
      /* @__PURE__ */ T(pe, { direction: "row", spacing: 1, sx: { justifyContent: "flex-end", flexWrap: "wrap", mb: 2 }, children: [
        /* @__PURE__ */ l(
          tn,
          {
            "aria-label": "Edit prompt group",
            disabled: qe("prompt-group-save") || qe("prompt-group-create"),
            onClick: (R) => {
              R.stopPropagation(), em(u);
            },
            title: "Edit prompt group",
            size: "small",
            children: /* @__PURE__ */ l(ba, {})
          }
        ),
        /* @__PURE__ */ l(
          tn,
          {
            "aria-label": "Delete prompt group",
            color: "error",
            disabled: qe(`prompt-group-delete:${u.name}`),
            onClick: (R) => {
              R.stopPropagation(), pm(u);
            },
            title: "Delete prompt group",
            size: "small",
            children: /* @__PURE__ */ l(Li, {})
          }
        )
      ] }),
      /* @__PURE__ */ T("div", { className: "tool-detail-panel", children: [
        /* @__PURE__ */ l("div", { className: "tool-detail-header", children: /* @__PURE__ */ l("p", { className: "panel-label", children: "Prompt group details" }) }),
        /* @__PURE__ */ l("dl", { className: "tool-detail-meta", children: /* @__PURE__ */ T("div", { className: "tool-detail-description", children: [
          /* @__PURE__ */ l("dt", { children: "MCP security" }),
          /* @__PURE__ */ T("dd", { children: [
            Di(u.security_option),
            " ",
            /* @__PURE__ */ T("code", { className: "identifier-code", children: [
              "(",
              u.security_option,
              ")"
            ] })
          ] })
        ] }) }),
        u.description ? /* @__PURE__ */ l("dl", { className: "tool-detail-meta", children: /* @__PURE__ */ T("div", { className: "tool-detail-description", children: [
          /* @__PURE__ */ l("dt", { children: "Description" }),
          /* @__PURE__ */ l("dd", { children: u.description })
        ] }) }) : null,
        /* @__PURE__ */ T("div", { className: "tool-schema-section", children: [
          /* @__PURE__ */ l("div", { className: "tool-schema-header", children: /* @__PURE__ */ l("h4", { children: "MCP endpoints" }) }),
          /* @__PURE__ */ T("div", { className: "tool-group-endpoints", children: [
            /* @__PURE__ */ T("div", { className: "tool-group-endpoint-row", children: [
              /* @__PURE__ */ l("span", { className: "tool-group-endpoint-label", children: "Streamable HTTP" }),
              /* @__PURE__ */ T("div", { className: "tool-group-endpoint-value", children: [
                /* @__PURE__ */ l("code", { className: "detail-target-code", title: u.streamable_http_endpoint, children: u.streamable_http_endpoint }),
                /* @__PURE__ */ l(
                  vt,
                  {
                    ariaLabel: "Copy Streamable HTTP endpoint",
                    title: "Copy Streamable HTTP endpoint",
                    value: u.streamable_http_endpoint
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ T("div", { className: "tool-group-endpoint-row", children: [
              /* @__PURE__ */ l("span", { className: "tool-group-endpoint-label", children: "SSE" }),
              /* @__PURE__ */ T("div", { className: "tool-group-endpoint-stack", children: [
                /* @__PURE__ */ T("div", { className: "tool-group-endpoint-value", children: [
                  /* @__PURE__ */ l("code", { className: "detail-target-code", title: u.sse_endpoint, children: u.sse_endpoint }),
                  /* @__PURE__ */ l(vt, { ariaLabel: "Copy SSE endpoint", title: "Copy SSE endpoint", value: u.sse_endpoint })
                ] }),
                /* @__PURE__ */ T("div", { className: "tool-group-endpoint-value", children: [
                  /* @__PURE__ */ l("code", { className: "detail-target-code", title: u.sse_message_endpoint, children: u.sse_message_endpoint }),
                  /* @__PURE__ */ l(
                    vt,
                    {
                      ariaLabel: "Copy SSE message endpoint",
                      title: "Copy SSE message endpoint",
                      value: u.sse_message_endpoint
                    }
                  )
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ T("div", { className: "tool-schema-section", children: [
          /* @__PURE__ */ l("div", { className: "tool-schema-header", children: /* @__PURE__ */ l("h4", { children: "Included prompts" }) }),
          u.prompts.length > 0 ? /* @__PURE__ */ l("div", { className: "schema-field-list", children: u.prompts.map((R) => /* @__PURE__ */ T("article", { className: "schema-field-card", children: [
            /* @__PURE__ */ T("div", { className: "schema-field-head", children: [
              /* @__PURE__ */ l("code", { children: R.canonical_name }),
              /* @__PURE__ */ l("span", { className: "schema-type-pill", children: /* @__PURE__ */ l("code", { children: R.server }) })
            ] }),
            /* @__PURE__ */ l("dl", { className: "schema-field-meta", children: R.description ? /* @__PURE__ */ T("div", { children: [
              /* @__PURE__ */ l("dt", { children: "Description" }),
              /* @__PURE__ */ l("dd", { children: R.description })
            ] }) : null })
          ] }, R.canonical_name)) }) : /* @__PURE__ */ l("p", { className: "empty-inline", children: "No prompts in this group." })
        ] })
      ] })
    ] });
  }
  function xm(u) {
    var R, L;
    return /* @__PURE__ */ T(qt, { children: [
      /* @__PURE__ */ T(pe, { direction: "row", spacing: 1, useFlexGap: !0, sx: { flexWrap: "wrap", justifyContent: "flex-end", mb: 2 }, children: [
        /* @__PURE__ */ l(vt, { ariaLabel: "Copy server name", title: "Copy server name", value: u.name }),
        /* @__PURE__ */ l(ge, { variant: "outlined", size: "small", onClick: () => void Yf(u.name), children: "Edit" }),
        /* @__PURE__ */ l(
          ge,
          {
            variant: "outlined",
            size: "small",
            disabled: qe(`server-toggle:${u.name}`),
            onClick: () => void im(u),
            children: qe(`server-toggle:${u.name}`) ? "Saving..." : u.enabled ? "Disable" : "Enable"
          }
        ),
        /* @__PURE__ */ l(
          tn,
          {
            "aria-label": "Delete server",
            color: "error",
            disabled: qe(`server-delete:${u.name}`),
            onClick: () => void sm(u),
            title: "Delete server",
            size: "small",
            children: /* @__PURE__ */ l(Li, {})
          }
        )
      ] }),
      /* @__PURE__ */ T("div", { className: "tool-detail-panel", children: [
        /* @__PURE__ */ l("div", { className: "tool-detail-header", children: /* @__PURE__ */ l("p", { className: "panel-label", children: "Server details" }) }),
        u.enabled ? null : /* @__PURE__ */ l(q, { color: "text.secondary", variant: "body2", sx: { mb: 2 }, children: "This server is registered but currently not exposed to MCP clients." }),
        /* @__PURE__ */ T("dl", { className: "tool-detail-meta", children: [
          /* @__PURE__ */ T("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ l("dt", { children: "Transport" }),
            /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ l("code", { children: lu(u.transport) }) })
          ] }),
          /* @__PURE__ */ T("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ l("dt", { children: "Connection" }),
            /* @__PURE__ */ T("dd", { children: [
              /* @__PURE__ */ l("div", { className: "tool-state-line", children: /* @__PURE__ */ l(
                en,
                {
                  text: du(u.status),
                  tone: cu(u.status)
                }
              ) }),
              /* @__PURE__ */ l(q, { variant: "body2", color: "text.secondary", sx: { mt: 0.75 }, children: u.connection_summary })
            ] })
          ] }),
          /* @__PURE__ */ T("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ l("dt", { children: "Catalog" }),
            /* @__PURE__ */ T("dd", { children: [
              u.tool_count,
              " tools · ",
              u.prompt_count,
              " prompts · ",
              u.resource_count,
              " resources"
            ] })
          ] }),
          u.last_discovered_at ? /* @__PURE__ */ T("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ l("dt", { children: "Last discovered" }),
            /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ l("code", { children: u.last_discovered_at }) })
          ] }) : null,
          u.updated_at ? /* @__PURE__ */ T("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ l("dt", { children: "Updated" }),
            /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ l("code", { children: u.updated_at }) })
          ] }) : null,
          u.config_summary.description ? /* @__PURE__ */ T("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ l("dt", { children: "Description" }),
            /* @__PURE__ */ l("dd", { children: u.config_summary.description })
          ] }) : null
        ] }),
        /* @__PURE__ */ l("div", { className: "server-detail", style: { marginTop: "1rem" }, children: /* @__PURE__ */ T("dl", { children: [
          /* @__PURE__ */ T("div", { children: [
            /* @__PURE__ */ l("dt", { children: "Target" }),
            /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ T("div", { className: "detail-copy-row", children: [
              /* @__PURE__ */ l("code", { className: "detail-target-code", children: u.config_summary.target ?? u.config_summary.command ?? "Unknown" }),
              u.config_summary.target || u.config_summary.command ? /* @__PURE__ */ l(
                vt,
                {
                  ariaLabel: "Copy target",
                  title: "Copy target",
                  value: u.config_summary.target ?? u.config_summary.command ?? ""
                }
              ) : null
            ] }) })
          ] }),
          /* @__PURE__ */ T("div", { children: [
            /* @__PURE__ */ l("dt", { children: "Session mode" }),
            /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ l("code", { children: u.config_summary.session_mode ?? "Unknown" }) })
          ] }),
          /* @__PURE__ */ T("div", { children: [
            /* @__PURE__ */ l("dt", { children: "Header keys" }),
            /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ l("code", { children: ((R = u.config_summary.header_keys) == null ? void 0 : R.join(", ")) || "None" }) })
          ] }),
          /* @__PURE__ */ T("div", { children: [
            /* @__PURE__ */ l("dt", { children: "Env keys" }),
            /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ l("code", { children: ((L = u.config_summary.env_keys) == null ? void 0 : L.join(", ")) || "None" }) })
          ] })
        ] }) })
      ] })
    ] });
  }
  function Sm(u) {
    const R = yw(u.input_schema);
    return /* @__PURE__ */ T(qt, { children: [
      /* @__PURE__ */ T(pe, { direction: "row", spacing: 1, useFlexGap: !0, sx: { flexWrap: "wrap", justifyContent: "flex-end", mb: 2 }, children: [
        /* @__PURE__ */ l(
          vt,
          {
            ariaLabel: "Copy canonical name",
            title: "Copy canonical name",
            value: u.canonical_name
          }
        ),
        /* @__PURE__ */ l(
          ge,
          {
            variant: "outlined",
            size: "small",
            disabled: qe(`tool-toggle:${u.canonical_name}`),
            onClick: (L) => {
              L.stopPropagation(), am(u);
            },
            children: qe(`tool-toggle:${u.canonical_name}`) ? "Saving..." : u.enabled ? "Disable" : "Enable"
          }
        )
      ] }),
      /* @__PURE__ */ T("div", { className: "tool-detail-panel", children: [
        /* @__PURE__ */ l("div", { className: "tool-detail-header", children: /* @__PURE__ */ l("p", { className: "panel-label", children: "Tool details" }) }),
        /* @__PURE__ */ T("dl", { className: "tool-detail-meta", children: [
          /* @__PURE__ */ T("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ l("dt", { children: "Server" }),
            /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ l("code", { children: u.server }) })
          ] }),
          /* @__PURE__ */ T("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ l("dt", { children: "Canonical name" }),
            /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ l("code", { className: "identifier-code", children: u.canonical_name }) })
          ] }),
          /* @__PURE__ */ T("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ l("dt", { children: "Status" }),
            /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ T("div", { className: "tool-state-line", children: [
              /* @__PURE__ */ l(
                en,
                {
                  text: u.enabled ? "Enabled" : "Disabled",
                  tone: u.enabled ? "good" : "muted"
                }
              ),
              u.server_enabled ? null : /* @__PURE__ */ l(en, { text: "Server disabled", tone: "warn" })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ l("dl", { className: "tool-detail-meta", children: /* @__PURE__ */ T("div", { className: "tool-detail-description", children: [
          /* @__PURE__ */ l("dt", { children: "Description" }),
          /* @__PURE__ */ l("dd", { children: Bi(u) })
        ] }) }),
        /* @__PURE__ */ T("div", { className: "tool-schema-section", children: [
          /* @__PURE__ */ l("div", { className: "tool-schema-header", children: /* @__PURE__ */ l("h4", { children: "Input fields" }) }),
          R.length > 0 ? /* @__PURE__ */ l("div", { className: "schema-field-list", children: R.map((L) => {
            var se;
            return /* @__PURE__ */ T("article", { className: "schema-field-card", children: [
              /* @__PURE__ */ T("div", { className: "schema-field-head", children: [
                /* @__PURE__ */ l("code", { children: L.path }),
                /* @__PURE__ */ l("span", { className: "schema-type-pill", children: /* @__PURE__ */ l("code", { children: L.type }) })
              ] }),
              /* @__PURE__ */ T("dl", { className: "schema-field-meta", children: [
                /* @__PURE__ */ T("div", { children: [
                  /* @__PURE__ */ l("dt", { children: "Required" }),
                  /* @__PURE__ */ l("dd", { children: L.required ? "yes" : "no" })
                ] }),
                L.description ? /* @__PURE__ */ T("div", { children: [
                  /* @__PURE__ */ l("dt", { children: "Description" }),
                  /* @__PURE__ */ l("dd", { children: L.description })
                ] }) : null,
                (se = L.enumValues) != null && se.length ? /* @__PURE__ */ T("div", { children: [
                  /* @__PURE__ */ l("dt", { children: "Enum" }),
                  /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ l("code", { children: L.enumValues.join(", ") }) })
                ] }) : null,
                L.defaultValue ? /* @__PURE__ */ T("div", { children: [
                  /* @__PURE__ */ l("dt", { children: "Default" }),
                  /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ l("code", { children: L.defaultValue }) })
                ] }) : null,
                L.note ? /* @__PURE__ */ T("div", { children: [
                  /* @__PURE__ */ l("dt", { children: "Notes" }),
                  /* @__PURE__ */ l("dd", { children: L.note })
                ] }) : null
              ] })
            ] }, L.path);
          }) }) : /* @__PURE__ */ l("p", { className: "empty-inline", children: "No structured input fields were provided." })
        ] }),
        /* @__PURE__ */ T("details", { className: "raw-schema-disclosure", children: [
          /* @__PURE__ */ l("summary", { children: "Raw schema" }),
          /* @__PURE__ */ T("div", { className: "raw-schema-code-wrap", children: [
            /* @__PURE__ */ l(
              vt,
              {
                ariaLabel: "Copy raw schema",
                title: "Copy raw schema",
                value: uu(u.input_schema)
              }
            ),
            /* @__PURE__ */ l("pre", { className: "schema-code", children: /* @__PURE__ */ l("code", { children: uu(u.input_schema) }) })
          ] })
        ] })
      ] })
    ] });
  }
  function Cm(u) {
    const R = vw(u.arguments);
    return /* @__PURE__ */ T(qt, { children: [
      /* @__PURE__ */ T(pe, { direction: "row", spacing: 1, useFlexGap: !0, sx: { flexWrap: "wrap", justifyContent: "flex-end", mb: 2 }, children: [
        /* @__PURE__ */ l(
          vt,
          {
            ariaLabel: "Copy canonical name",
            title: "Copy canonical name",
            value: u.canonical_name
          }
        ),
        /* @__PURE__ */ l(
          ge,
          {
            variant: "outlined",
            size: "small",
            disabled: qe(`prompt-toggle:${u.canonical_name}`),
            onClick: (L) => {
              L.stopPropagation(), lm(u);
            },
            children: qe(`prompt-toggle:${u.canonical_name}`) ? "Saving..." : u.enabled ? "Disable" : "Enable"
          }
        )
      ] }),
      /* @__PURE__ */ T("div", { className: "tool-detail-panel", children: [
        /* @__PURE__ */ l("div", { className: "tool-detail-header", children: /* @__PURE__ */ l("p", { className: "panel-label", children: "Prompt details" }) }),
        /* @__PURE__ */ T("dl", { className: "tool-detail-meta", children: [
          /* @__PURE__ */ T("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ l("dt", { children: "Server" }),
            /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ l("code", { children: u.server }) })
          ] }),
          /* @__PURE__ */ T("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ l("dt", { children: "Canonical name" }),
            /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ l("code", { className: "identifier-code", children: u.canonical_name }) })
          ] }),
          /* @__PURE__ */ T("div", { className: "tool-detail-description", children: [
            /* @__PURE__ */ l("dt", { children: "Status" }),
            /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ T("div", { className: "tool-state-line", children: [
              /* @__PURE__ */ l(
                en,
                {
                  text: u.enabled ? "Enabled" : "Disabled",
                  tone: u.enabled ? "good" : "muted"
                }
              ),
              u.server_enabled ? null : /* @__PURE__ */ l(en, { text: "Server disabled", tone: "warn" })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ l("dl", { className: "tool-detail-meta", children: /* @__PURE__ */ T("div", { className: "tool-detail-description", children: [
          /* @__PURE__ */ l("dt", { children: "Description" }),
          /* @__PURE__ */ l("dd", { children: Fi(u) })
        ] }) }),
        /* @__PURE__ */ T("div", { className: "tool-schema-section", children: [
          /* @__PURE__ */ l("div", { className: "tool-schema-header", children: /* @__PURE__ */ l("h4", { children: "Arguments" }) }),
          R.length > 0 ? /* @__PURE__ */ l("div", { className: "schema-field-list", children: R.map((L) => {
            var se;
            return /* @__PURE__ */ T("article", { className: "schema-field-card", children: [
              /* @__PURE__ */ T("div", { className: "schema-field-head", children: [
                /* @__PURE__ */ l("code", { children: L.path }),
                /* @__PURE__ */ l("span", { className: "schema-type-pill", children: /* @__PURE__ */ l("code", { children: L.type }) })
              ] }),
              /* @__PURE__ */ T("dl", { className: "schema-field-meta", children: [
                /* @__PURE__ */ T("div", { children: [
                  /* @__PURE__ */ l("dt", { children: "Required" }),
                  /* @__PURE__ */ l("dd", { children: L.required ? "yes" : "no" })
                ] }),
                L.description ? /* @__PURE__ */ T("div", { children: [
                  /* @__PURE__ */ l("dt", { children: "Description" }),
                  /* @__PURE__ */ l("dd", { children: L.description })
                ] }) : null,
                (se = L.enumValues) != null && se.length ? /* @__PURE__ */ T("div", { children: [
                  /* @__PURE__ */ l("dt", { children: "Enum" }),
                  /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ l("code", { children: L.enumValues.join(", ") }) })
                ] }) : null,
                L.defaultValue ? /* @__PURE__ */ T("div", { children: [
                  /* @__PURE__ */ l("dt", { children: "Default" }),
                  /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ l("code", { children: L.defaultValue }) })
                ] }) : null,
                L.note ? /* @__PURE__ */ T("div", { children: [
                  /* @__PURE__ */ l("dt", { children: "Notes" }),
                  /* @__PURE__ */ l("dd", { children: L.note })
                ] }) : null
              ] })
            ] }, L.path);
          }) }) : /* @__PURE__ */ l("p", { className: "empty-inline", children: "No arguments." })
        ] }),
        /* @__PURE__ */ T("details", { className: "raw-schema-disclosure", children: [
          /* @__PURE__ */ l("summary", { children: "Raw arguments" }),
          /* @__PURE__ */ l("div", { className: "raw-schema-actions", children: /* @__PURE__ */ l(
            vt,
            {
              ariaLabel: "Copy raw arguments",
              title: "Copy raw arguments",
              value: pu(u.arguments)
            }
          ) }),
          /* @__PURE__ */ l("pre", { className: "schema-code", children: /* @__PURE__ */ l("code", { children: pu(u.arguments) }) })
        ] })
      ] })
    ] });
  }
  function wm(u) {
    var L, se;
    const R = fw(u.oauth_token_url, u.client_id);
    return /* @__PURE__ */ T(qt, { children: [
      /* @__PURE__ */ T(
        pe,
        {
          direction: { xs: "column", sm: "row" },
          spacing: 2,
          sx: { justifyContent: "space-between", alignItems: { sm: "flex-start" }, mb: 1 },
          children: [
            /* @__PURE__ */ T(je, { sx: { flex: "1 1 auto", minWidth: 0 }, children: [
              /* @__PURE__ */ l(pe, { direction: "row", spacing: 1, sx: { alignItems: "center", flexWrap: "wrap", mb: 0.5 }, children: /* @__PURE__ */ l(
                en,
                {
                  tone: u.status === "enabled" ? "good" : "muted",
                  text: u.status === "enabled" ? "enabled" : "disabled"
                }
              ) }),
              u.description ? /* @__PURE__ */ l(q, { variant: "body2", color: "text.secondary", sx: { mb: 1 }, children: u.description }) : null
            ] }),
            /* @__PURE__ */ T(pe, { direction: "row", spacing: 1, sx: { flexShrink: 0, flexWrap: "wrap" }, children: [
              /* @__PURE__ */ l(
                tn,
                {
                  "aria-label": `Edit ${u.name}`,
                  color: "primary",
                  size: "small",
                  disabled: qe(`agent-app-edit:${u.id}`),
                  onClick: (ve) => {
                    ve.stopPropagation(), fm(u);
                  },
                  title: "Edit agent app",
                  children: /* @__PURE__ */ l(ba, {})
                }
              ),
              /* @__PURE__ */ l(
                ge,
                {
                  size: "small",
                  variant: "outlined",
                  disabled: qe(`agent-app-status:${u.id}`),
                  onClick: (ve) => {
                    ve.stopPropagation(), gm(u);
                  },
                  children: u.status === "enabled" ? "Disable" : "Enable"
                }
              ),
              /* @__PURE__ */ l(
                ge,
                {
                  size: "small",
                  variant: "outlined",
                  color: "warning",
                  disabled: qe(`agent-app-rotate:${u.id}`),
                  onClick: (ve) => {
                    ve.stopPropagation(), bm(u);
                  },
                  children: "Rotate secret"
                }
              ),
              /* @__PURE__ */ l(
                tn,
                {
                  "aria-label": `Delete ${u.name}`,
                  color: "error",
                  size: "small",
                  disabled: qe(`agent-app-delete:${u.id}`),
                  onClick: (ve) => {
                    ve.stopPropagation(), hm(u);
                  },
                  title: "Delete agent app",
                  children: /* @__PURE__ */ l(Li, {})
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ l(q, { variant: "caption", color: "text.secondary", component: "div", sx: { mb: 0.5 }, children: "Client ID" }),
      /* @__PURE__ */ T(pe, { direction: "row", spacing: 1, sx: { alignItems: "center", mb: 1, flexWrap: "wrap" }, children: [
        /* @__PURE__ */ l(
          q,
          {
            component: "code",
            variant: "body2",
            sx: { wordBreak: "break-all", fontFamily: So },
            children: u.client_id
          }
        ),
        /* @__PURE__ */ l(vt, { ariaLabel: "Copy client ID", title: "Copy client ID", value: u.client_id })
      ] }),
      /* @__PURE__ */ T(q, { variant: "caption", color: "text.secondary", children: [
        "Attached group:",
        " ",
        ((L = u.tool_group_names) == null ? void 0 : L.length) === 1 ? `${u.tool_group_names[0]} (tool)` : ((se = u.prompt_group_names) == null ? void 0 : se.length) === 1 ? `${u.prompt_group_names[0]} (prompt)` : "— (invalid or unset — edit to fix)"
      ] }),
      /* @__PURE__ */ T(je, { sx: { mt: 2, pt: 2, borderTop: 1, borderColor: "divider" }, children: [
        /* @__PURE__ */ l(q, { variant: "subtitle2", sx: { mb: 1 }, children: "OAuth token URL" }),
        /* @__PURE__ */ l("div", { className: "tool-group-endpoint-row", children: /* @__PURE__ */ T("div", { className: "tool-group-endpoint-value", children: [
          /* @__PURE__ */ l("code", { className: "detail-target-code", title: u.oauth_token_url, children: u.oauth_token_url }),
          /* @__PURE__ */ l(vt, { ariaLabel: "Copy OAuth token URL", title: "Copy OAuth token URL", value: u.oauth_token_url })
        ] }) }),
        /* @__PURE__ */ T(
          Np,
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
              /* @__PURE__ */ l($p, { expandIcon: /* @__PURE__ */ l($1, { fontSize: "small" }), children: /* @__PURE__ */ l(q, { variant: "subtitle2", children: "Get a Bearer token (curl)" }) }),
              /* @__PURE__ */ T(kp, { sx: { pt: 0 }, children: [
                /* @__PURE__ */ T(q, { variant: "body2", color: "text.secondary", sx: { mb: 1.5 }, children: [
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
                /* @__PURE__ */ l(ht, { variant: "outlined", sx: { p: 1.5, borderRadius: 2, bgcolor: "grey.50" }, children: /* @__PURE__ */ T(pe, { direction: { xs: "column", sm: "row" }, spacing: 1, sx: { alignItems: "flex-start" }, children: [
                  /* @__PURE__ */ l(
                    q,
                    {
                      component: "pre",
                      sx: {
                        flex: 1,
                        m: 0,
                        overflow: "auto",
                        fontSize: "0.75rem",
                        lineHeight: 1.5,
                        fontFamily: So,
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-all"
                      },
                      children: R
                    }
                  ),
                  /* @__PURE__ */ l(vt, { ariaLabel: "Copy curl command", title: "Copy curl command", value: R })
                ] }) }),
                /* @__PURE__ */ T(q, { variant: "caption", color: "text.secondary", component: "div", sx: { mt: 1.5 }, children: [
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
      ql("Tool group MCP URLs", u.tool_group_endpoints),
      ql("Prompt group MCP URLs", u.prompt_group_endpoints)
    ] });
  }
  const vi = c === "ready", Kl = vi && !jl;
  return /* @__PURE__ */ T(
    je,
    {
      sx: {
        display: "flex",
        flexDirection: t ? "column" : "row",
        minHeight: e ? "100%" : "100vh",
        bgcolor: "background.default"
      },
      children: [
        Kl && !t ? /* @__PURE__ */ l(
          HC,
          {
            active: o,
            onSelect: a,
            signOutHref: qf,
            embedMode: e,
            signedInEmail: Kf
          }
        ) : null,
        /* @__PURE__ */ T(
          je,
          {
            component: "main",
            sx: {
              flex: 1,
              minWidth: 0,
              overflowX: "auto",
              ...vi ? { p: t ? "12px 18px 18px" : "18px" } : {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
                minHeight: t ? "100%" : "100vh"
              }
            },
            children: [
              Kl && t ? /* @__PURE__ */ l(uw, { active: o, onSelect: a }) : null,
              vi ? /* @__PURE__ */ T(pe, { component: "header", direction: { xs: "column", lg: "row" }, spacing: 2, sx: { mb: 2 }, children: [
                o === "home" ? /* @__PURE__ */ l(je, { sx: { flex: "1 1 auto", minWidth: 0 }, "aria-hidden": !0 }) : /* @__PURE__ */ T(je, { sx: { flex: "1 1 auto", minWidth: 0 }, children: [
                  /* @__PURE__ */ l(q, { variant: "h4", component: "h1", sx: { mt: "2px", fontWeight: 700, lineHeight: 1.1 }, children: Qs.title }),
                  Qs.subtitle ? /* @__PURE__ */ l(q, { color: "text.secondary", sx: { mt: "6px" }, children: Qs.subtitle }) : null
                ] }),
                /* @__PURE__ */ l(
                  pe,
                  {
                    direction: "row",
                    spacing: 1,
                    sx: {
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      maxWidth: { lg: 720 }
                    },
                    children: Wt != null && Wt.endpoints[0] ? /* @__PURE__ */ T(
                      pe,
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
                            q,
                            {
                              component: "span",
                              variant: "caption",
                              color: "text.secondary",
                              sx: { display: { xs: "none", sm: "inline" } },
                              children: "Global Endpoint"
                            }
                          ),
                          /* @__PURE__ */ l(
                            q,
                            {
                              component: "code",
                              variant: "body2",
                              sx: {
                                flex: 1,
                                minWidth: 0,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontFamily: So
                              },
                              title: Wt.endpoints[0].url,
                              children: Wt.endpoints[0].url
                            }
                          ),
                          /* @__PURE__ */ l(vt, { ariaLabel: "Copy global endpoint", title: "Copy global endpoint", value: Wt.endpoints[0].url })
                        ]
                      }
                    ) : null
                  }
                )
              ] }) : null,
              vi && y ? /* @__PURE__ */ T(
                ja,
                {
                  severity: y.tone === "success" ? "success" : "error",
                  sx: { mb: 2 },
                  onClose: () => x(null),
                  children: [
                    /* @__PURE__ */ l("strong", { children: y.tone === "success" ? "Updated" : "Request failed" }),
                    /* @__PURE__ */ T("span", { children: [
                      " ",
                      y.message
                    ] })
                  ]
                }
              ) : null,
              c === "checking_session" ? /* @__PURE__ */ l(ht, { variant: "outlined", sx: { p: 4, borderRadius: 2, maxWidth: 480, width: "100%" }, children: /* @__PURE__ */ T(pe, { spacing: 2, sx: { alignItems: "center" }, children: [
                /* @__PURE__ */ l(Qo, {}),
                /* @__PURE__ */ l(q, { variant: "h5", component: "h2", sx: { textAlign: "center" }, children: "Starting dashboard" }),
                /* @__PURE__ */ l(q, { color: "text.secondary", sx: { textAlign: "center" }, children: "Checking gateway access and sign-in requirements." })
              ] }) }) : null,
              c === "loading" ? /* @__PURE__ */ l(ht, { variant: "outlined", sx: { p: 4, borderRadius: 2, maxWidth: 480, width: "100%" }, children: /* @__PURE__ */ T(pe, { spacing: 2, sx: { alignItems: "center" }, children: [
                /* @__PURE__ */ l(Qo, {}),
                /* @__PURE__ */ l(q, { variant: "h5", component: "h2", children: "Loading dashboard" }),
                /* @__PURE__ */ l(q, { color: "text.secondary", sx: { textAlign: "center" }, children: "Querying local MCP Gateway state, servers, tools, prompts, and resources." })
              ] }) }) : null,
              c === "error" ? /* @__PURE__ */ T(ht, { variant: "outlined", sx: { p: 4, borderRadius: 2, borderColor: "error.light", maxWidth: 560, width: "100%" }, children: [
                /* @__PURE__ */ l(q, { variant: "h5", component: "h2", gutterBottom: !0, children: "Dashboard API unavailable" }),
                /* @__PURE__ */ l(q, { color: "text.secondary", gutterBottom: !0, children: "Failed to load dashboard data from the local server." }),
                /* @__PURE__ */ l(
                  q,
                  {
                    component: "code",
                    sx: {
                      display: "block",
                      mt: 2,
                      p: 1.5,
                      bgcolor: "grey.100",
                      borderRadius: 1,
                      fontFamily: So,
                      wordBreak: "break-word"
                    },
                    children: p
                  }
                )
              ] }) : null,
              c === "ready" ? /* @__PURE__ */ l("div", { className: "flex flex-col gap-[14px]", children: !t && o === "home" ? /* @__PURE__ */ l(
                rS,
                {
                  overview: Wt,
                  auth: i ?? void 0,
                  onNavigate: a
                }
              ) : jl ? /* @__PURE__ */ T(ht, { variant: "outlined", sx: { p: 4, maxWidth: 560, borderRadius: 2, mx: "auto" }, children: [
                /* @__PURE__ */ l(q, { variant: "h5", component: "h2", gutterBottom: !0, children: "Sign in required" }),
                /* @__PURE__ */ l(q, { color: "text.secondary", sx: { mb: 2 }, children: "Use the gateway sign-in flow to manage servers, tools, prompts, resources, and diagnostics." }),
                i != null && i.login_path ? /* @__PURE__ */ l(ge, { variant: "contained", component: "a", href: i.login_path, children: "Sign in" }) : null
              ] }) : /* @__PURE__ */ T(qt, { children: [
                o === "servers" && f.servers ? /* @__PURE__ */ T(qt, { children: [
                  Wt ? /* @__PURE__ */ T("section", { className: "dense-metrics-grid", children: [
                    /* @__PURE__ */ T("div", { className: "metric-card compact-metric", children: [
                      /* @__PURE__ */ l("span", { children: "Servers" }),
                      /* @__PURE__ */ l("strong", { children: Wt.server_count })
                    ] }),
                    /* @__PURE__ */ T("div", { className: "metric-card compact-metric", children: [
                      /* @__PURE__ */ l("span", { children: "Tools" }),
                      /* @__PURE__ */ l("strong", { children: Wt.tool_count })
                    ] }),
                    /* @__PURE__ */ T("div", { className: "metric-card compact-metric", children: [
                      /* @__PURE__ */ l("span", { children: "Prompts" }),
                      /* @__PURE__ */ l("strong", { children: Wt.prompt_count })
                    ] }),
                    /* @__PURE__ */ T("div", { className: "metric-card compact-metric", children: [
                      /* @__PURE__ */ l("span", { children: "Resources" }),
                      /* @__PURE__ */ l("strong", { children: Wt.resource_count })
                    ] })
                  ] }) : null,
                  M !== null ? /* @__PURE__ */ l(
                    Vt,
                    {
                      title: (br == null ? void 0 : br.name) ?? M,
                      subtitle: "Registered MCP servers",
                      action: /* @__PURE__ */ T(pe, { direction: { xs: "column", sm: "row" }, spacing: 1, sx: { alignItems: { sm: "center" } }, children: [
                        /* @__PURE__ */ l(
                          ge,
                          {
                            variant: "outlined",
                            onClick: () => {
                              lt(yt("servers"));
                            },
                            children: "← All servers"
                          }
                        ),
                        /* @__PURE__ */ l(ge, { variant: "contained", onClick: Vl, children: "+ Add Server" })
                      ] }),
                      children: br ? xm(br) : /* @__PURE__ */ T(pe, { spacing: 2, sx: { py: 2 }, children: [
                        /* @__PURE__ */ l(q, { color: "text.secondary", variant: "body2", children: "This server does not exist or was removed. Bookmarked URLs stay valid only while the server is registered." }),
                        /* @__PURE__ */ l(
                          ge,
                          {
                            variant: "contained",
                            onClick: () => {
                              lt(yt("servers"));
                            },
                            children: "Back to all servers"
                          }
                        )
                      ] })
                    }
                  ) : /* @__PURE__ */ l(
                    Vt,
                    {
                      title: "Servers",
                      subtitle: "Registered MCP servers",
                      action: /* @__PURE__ */ T(pe, { direction: { xs: "column", sm: "row" }, spacing: 1, sx: { alignItems: { sm: "center" } }, children: [
                        /* @__PURE__ */ l(
                          Et,
                          {
                            size: "small",
                            placeholder: "Search servers",
                            value: h,
                            onChange: (u) => w(u.target.value),
                            sx: { minWidth: { sm: 220 } }
                          }
                        ),
                        /* @__PURE__ */ l(ge, { variant: "contained", onClick: Vl, children: "+ Add Server" })
                      ] }),
                      children: f.servers.empty_state && Re.length === 0 ? /* @__PURE__ */ l(Fo, { emptyState: f.servers.empty_state }) : /* @__PURE__ */ l(
                        je,
                        {
                          sx: {
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                            gap: 1.5
                          },
                          children: Re.map((u) => {
                            const R = !u.enabled;
                            return /* @__PURE__ */ T(
                              ht,
                              {
                                role: "link",
                                tabIndex: 0,
                                "aria-label": `Open server ${u.name}`,
                                onClick: () => {
                                  lt(zd(u.name));
                                },
                                onKeyDown: (L) => {
                                  (L.key === "Enter" || L.key === " ") && (L.preventDefault(), lt(zd(u.name)));
                                },
                                elevation: 0,
                                variant: "outlined",
                                sx: {
                                  p: 1.5,
                                  borderRadius: 2,
                                  cursor: "pointer",
                                  borderColor: "divider",
                                  opacity: R ? 0.82 : 1,
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
                                  /* @__PURE__ */ l(q, { variant: "subtitle2", sx: { fontWeight: 700, mb: 0.5 }, children: u.name }),
                                  /* @__PURE__ */ l(
                                    q,
                                    {
                                      variant: "caption",
                                      color: "text.secondary",
                                      sx: { display: "block", mb: 1, wordBreak: "break-word" },
                                      children: u.connection_summary
                                    }
                                  ),
                                  /* @__PURE__ */ l(q, { variant: "caption", color: "text.secondary", sx: { display: "block", mb: 1 }, children: /* @__PURE__ */ l("code", { children: lu(u.transport) }) }),
                                  /* @__PURE__ */ T(pe, { direction: "row", spacing: 0.5, sx: { flexWrap: "wrap", gap: 0.5, mb: 1 }, children: [
                                    /* @__PURE__ */ l(
                                      en,
                                      {
                                        text: u.enabled ? "Enabled" : "Disabled",
                                        tone: u.enabled ? "good" : "muted"
                                      }
                                    ),
                                    /* @__PURE__ */ l(
                                      en,
                                      {
                                        text: du(u.status),
                                        tone: cu(u.status)
                                      }
                                    )
                                  ] }),
                                  /* @__PURE__ */ T(q, { variant: "caption", color: "text.secondary", sx: { display: "block", mb: 1 }, children: [
                                    u.tool_count,
                                    " tools · ",
                                    u.prompt_count,
                                    " prompts · ",
                                    u.resource_count,
                                    " ",
                                    "resources"
                                  ] }),
                                  /* @__PURE__ */ l(q, { variant: "caption", color: "primary", sx: { display: "block", mt: 1 }, children: "View details →" })
                                ]
                              },
                              u.name
                            );
                          })
                        }
                      )
                    }
                  )
                ] }) : null,
                o === "tools" && f.tools ? W !== null ? /* @__PURE__ */ l(
                  Vt,
                  {
                    title: (xr == null ? void 0 : xr.name) ?? W ?? "Tool",
                    subtitle: "Discovered tools across registered servers",
                    action: /* @__PURE__ */ l(
                      ge,
                      {
                        variant: "outlined",
                        onClick: () => {
                          lt(yt("tools"));
                        },
                        children: "← All tools"
                      }
                    ),
                    children: xr ? Sm(xr) : /* @__PURE__ */ T(pe, { spacing: 2, sx: { py: 2 }, children: [
                      /* @__PURE__ */ l(q, { color: "text.secondary", variant: "body2", children: "This tool does not exist or was removed. Bookmarked URLs stay valid only while the tool is present in the catalog." }),
                      /* @__PURE__ */ l(
                        ge,
                        {
                          variant: "contained",
                          onClick: () => {
                            lt(yt("tools"));
                          },
                          children: "Back to all tools"
                        }
                      )
                    ] })
                  }
                ) : /* @__PURE__ */ l(
                  Vt,
                  {
                    title: "Tools",
                    subtitle: "Discovered tools across registered servers",
                    action: /* @__PURE__ */ T("div", { className: "toolbar-cluster", children: [
                      /* @__PURE__ */ l(
                        "input",
                        {
                          className: "table-filter compact-filter",
                          onChange: (u) => k(u.target.value),
                          placeholder: "Search tools",
                          value: O
                        }
                      ),
                      /* @__PURE__ */ T(
                        "select",
                        {
                          className: "table-filter compact-filter compact-select",
                          onChange: (u) => C(u.target.value),
                          value: E,
                          children: [
                            /* @__PURE__ */ l("option", { value: "all", children: "All servers" }),
                            wt.map((u) => /* @__PURE__ */ l("option", { value: u, children: u }, u))
                          ]
                        }
                      )
                    ] }),
                    children: f.tools.empty_state && Ve.length === 0 ? /* @__PURE__ */ l(Fo, { emptyState: f.tools.empty_state }) : /* @__PURE__ */ l(
                      je,
                      {
                        sx: {
                          display: "grid",
                          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                          gap: 1.5
                        },
                        children: Ve.map((u) => {
                          const R = !u.enabled || !u.server_enabled;
                          return /* @__PURE__ */ T(
                            ht,
                            {
                              role: "link",
                              tabIndex: 0,
                              "aria-label": `Open tool ${u.name}`,
                              onClick: () => {
                                lt(Vd(u.canonical_name));
                              },
                              onKeyDown: (L) => {
                                (L.key === "Enter" || L.key === " ") && (L.preventDefault(), lt(Vd(u.canonical_name)));
                              },
                              elevation: 0,
                              variant: "outlined",
                              sx: {
                                p: 1.5,
                                borderRadius: 2,
                                cursor: "pointer",
                                borderColor: "divider",
                                opacity: R ? 0.82 : 1,
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
                                /* @__PURE__ */ l(q, { variant: "subtitle2", sx: { fontWeight: 700, mb: 0.5 }, children: u.name }),
                                /* @__PURE__ */ l(q, { variant: "caption", color: "text.secondary", sx: { display: "block", mb: 1, wordBreak: "break-all" }, children: /* @__PURE__ */ l("code", { children: u.canonical_name }) }),
                                /* @__PURE__ */ l(q, { variant: "caption", color: "text.secondary", sx: { display: "block", mb: 1 }, children: /* @__PURE__ */ l("code", { children: u.server }) }),
                                /* @__PURE__ */ T(pe, { direction: "row", spacing: 0.5, sx: { flexWrap: "wrap", gap: 0.5, mb: 1 }, children: [
                                  /* @__PURE__ */ l(
                                    en,
                                    {
                                      text: u.enabled ? "Enabled" : "Disabled",
                                      tone: u.enabled ? "good" : "muted"
                                    }
                                  ),
                                  u.server_enabled ? null : /* @__PURE__ */ l(en, { text: "Server off", tone: "warn" })
                                ] }),
                                /* @__PURE__ */ l(
                                  q,
                                  {
                                    variant: "caption",
                                    color: "text.secondary",
                                    sx: {
                                      display: "-webkit-box",
                                      WebkitLineClamp: 3,
                                      WebkitBoxOrient: "vertical",
                                      overflow: "hidden"
                                    },
                                    children: Bi(u)
                                  }
                                ),
                                /* @__PURE__ */ l(q, { variant: "caption", color: "primary", sx: { display: "block", mt: 1 }, children: "View details →" })
                              ]
                            },
                            u.canonical_name
                          );
                        })
                      }
                    )
                  }
                ) : null,
                o === "tool_groups" && f.toolGroups ? oe !== null ? /* @__PURE__ */ l(
                  Vt,
                  {
                    title: (yr == null ? void 0 : yr.name) ?? oe,
                    subtitle: "",
                    action: /* @__PURE__ */ T(pe, { direction: "row", spacing: 1, useFlexGap: !0, sx: { flexWrap: "wrap" }, children: [
                      /* @__PURE__ */ l(
                        ge,
                        {
                          variant: "outlined",
                          onClick: () => {
                            lt(yt("tool_groups"));
                          },
                          children: "← All tool groups"
                        }
                      ),
                      /* @__PURE__ */ l(ge, { variant: "contained", onClick: Ul, children: "+ Add Tool Group" })
                    ] }),
                    children: yr ? ym(yr) : /* @__PURE__ */ T(pe, { spacing: 2, sx: { py: 2 }, children: [
                      /* @__PURE__ */ l(q, { color: "text.secondary", variant: "body2", children: "This tool group does not exist or was deleted." }),
                      /* @__PURE__ */ l(
                        ge,
                        {
                          variant: "contained",
                          onClick: () => {
                            lt(yt("tool_groups"));
                          },
                          children: "Back to all tool groups"
                        }
                      )
                    ] })
                  }
                ) : /* @__PURE__ */ l(
                  Vt,
                  {
                    title: "Configured tool groups",
                    subtitle: "",
                    action: /* @__PURE__ */ l(ge, { variant: "contained", onClick: Ul, children: "+ Add Tool Group" }),
                    children: f.toolGroups.empty_state && f.toolGroups.tool_groups.length === 0 ? /* @__PURE__ */ l(Fo, { emptyState: f.toolGroups.empty_state }) : /* @__PURE__ */ l(
                      je,
                      {
                        sx: {
                          display: "grid",
                          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                          gap: 1.5
                        },
                        children: f.toolGroups.tool_groups.map((u) => /* @__PURE__ */ T(
                          ht,
                          {
                            role: "link",
                            tabIndex: 0,
                            "aria-label": `Open tool group ${u.name}`,
                            onClick: () => {
                              lt(Pi(u.name));
                            },
                            onKeyDown: (R) => {
                              (R.key === "Enter" || R.key === " ") && (R.preventDefault(), lt(Pi(u.name)));
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
                              /* @__PURE__ */ T(pe, { direction: "row", spacing: 1, sx: { alignItems: "flex-start", mb: 1 }, children: [
                                /* @__PURE__ */ l(q, { variant: "subtitle2", sx: { fontWeight: 700, flex: 1, minWidth: 0 }, children: u.name }),
                                /* @__PURE__ */ T(
                                  q,
                                  {
                                    variant: "caption",
                                    component: "span",
                                    sx: { fontWeight: 600, color: "text.secondary", flexShrink: 0 },
                                    children: [
                                      u.tool_count,
                                      " tools"
                                    ]
                                  }
                                )
                              ] }),
                              /* @__PURE__ */ l(q, { variant: "caption", color: "text.secondary", sx: { display: "block", mb: 1 }, children: /* @__PURE__ */ l("code", { title: Di(u.security_option), children: u.security_option }) }),
                              u.description ? /* @__PURE__ */ l(
                                q,
                                {
                                  variant: "caption",
                                  color: "text.secondary",
                                  sx: {
                                    display: "-webkit-box",
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden"
                                  },
                                  children: u.description
                                }
                              ) : /* @__PURE__ */ l(q, { variant: "caption", color: "text.disabled", children: "No description" }),
                              /* @__PURE__ */ l(q, { variant: "caption", color: "primary", sx: { display: "block", mt: 1 }, children: "View details →" })
                            ]
                          },
                          u.name
                        ))
                      }
                    )
                  }
                ) : null,
                o === "prompt_groups" && f.promptGroups ? V !== null ? /* @__PURE__ */ l(
                  Vt,
                  {
                    title: (vr == null ? void 0 : vr.name) ?? V,
                    subtitle: "",
                    action: /* @__PURE__ */ T(pe, { direction: "row", spacing: 1, useFlexGap: !0, sx: { flexWrap: "wrap" }, children: [
                      /* @__PURE__ */ l(
                        ge,
                        {
                          variant: "outlined",
                          onClick: () => {
                            lt(yt("prompt_groups"));
                          },
                          children: "← All prompt groups"
                        }
                      ),
                      /* @__PURE__ */ l(ge, { variant: "contained", onClick: Hl, children: "+ Add Prompt Group" })
                    ] }),
                    children: vr ? vm(vr) : /* @__PURE__ */ T(pe, { spacing: 2, sx: { py: 2 }, children: [
                      /* @__PURE__ */ l(q, { color: "text.secondary", variant: "body2", children: "This prompt group does not exist or was deleted." }),
                      /* @__PURE__ */ l(
                        ge,
                        {
                          variant: "contained",
                          onClick: () => {
                            lt(yt("prompt_groups"));
                          },
                          children: "Back to all prompt groups"
                        }
                      )
                    ] })
                  }
                ) : /* @__PURE__ */ l(
                  Vt,
                  {
                    title: "Configured prompt groups",
                    subtitle: "",
                    action: /* @__PURE__ */ l(ge, { variant: "contained", onClick: Hl, children: "+ Add Prompt Group" }),
                    children: f.promptGroups.empty_state && f.promptGroups.prompt_groups.length === 0 ? /* @__PURE__ */ l(Fo, { emptyState: f.promptGroups.empty_state }) : /* @__PURE__ */ l(
                      je,
                      {
                        sx: {
                          display: "grid",
                          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                          gap: 1.5
                        },
                        children: f.promptGroups.prompt_groups.map((u) => /* @__PURE__ */ T(
                          ht,
                          {
                            role: "link",
                            tabIndex: 0,
                            "aria-label": `Open prompt group ${u.name}`,
                            onClick: () => {
                              lt(Ii(u.name));
                            },
                            onKeyDown: (R) => {
                              (R.key === "Enter" || R.key === " ") && (R.preventDefault(), lt(Ii(u.name)));
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
                              /* @__PURE__ */ T(pe, { direction: "row", spacing: 1, sx: { alignItems: "flex-start", mb: 1 }, children: [
                                /* @__PURE__ */ l(q, { variant: "subtitle2", sx: { fontWeight: 700, flex: 1, minWidth: 0 }, children: u.name }),
                                /* @__PURE__ */ T(
                                  q,
                                  {
                                    variant: "caption",
                                    component: "span",
                                    sx: { fontWeight: 600, color: "text.secondary", flexShrink: 0 },
                                    children: [
                                      u.prompt_count,
                                      " prompts"
                                    ]
                                  }
                                )
                              ] }),
                              /* @__PURE__ */ l(q, { variant: "caption", color: "text.secondary", sx: { display: "block", mb: 1 }, children: /* @__PURE__ */ l("code", { title: Di(u.security_option), children: u.security_option }) }),
                              u.description ? /* @__PURE__ */ l(
                                q,
                                {
                                  variant: "caption",
                                  color: "text.secondary",
                                  sx: {
                                    display: "-webkit-box",
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden"
                                  },
                                  children: u.description
                                }
                              ) : /* @__PURE__ */ l(q, { variant: "caption", color: "text.disabled", children: "No description" }),
                              /* @__PURE__ */ l(q, { variant: "caption", color: "primary", sx: { display: "block", mt: 1 }, children: "View details →" })
                            ]
                          },
                          u.name
                        ))
                      }
                    )
                  }
                ) : null,
                o === "prompts" && f.prompts ? ne !== null ? /* @__PURE__ */ l(
                  Vt,
                  {
                    title: (Sr == null ? void 0 : Sr.name) ?? ne ?? "Prompt",
                    subtitle: "Discovered prompt templates",
                    action: /* @__PURE__ */ l(
                      ge,
                      {
                        variant: "outlined",
                        onClick: () => {
                          lt(yt("prompts"));
                        },
                        children: "← All prompts"
                      }
                    ),
                    children: Sr ? Cm(Sr) : /* @__PURE__ */ T(pe, { spacing: 2, sx: { py: 2 }, children: [
                      /* @__PURE__ */ l(q, { color: "text.secondary", variant: "body2", children: "This prompt does not exist or was removed. Bookmarked URLs stay valid only while the prompt is in the catalog." }),
                      /* @__PURE__ */ l(
                        ge,
                        {
                          variant: "contained",
                          onClick: () => {
                            lt(yt("prompts"));
                          },
                          children: "Back to all prompts"
                        }
                      )
                    ] })
                  }
                ) : /* @__PURE__ */ l(
                  Vt,
                  {
                    title: "Prompts",
                    subtitle: "Discovered prompt templates",
                    action: /* @__PURE__ */ l("div", { className: "toolbar-cluster", children: /* @__PURE__ */ l(
                      "input",
                      {
                        className: "table-filter compact-filter",
                        onChange: (u) => N(u.target.value),
                        placeholder: "Search prompts",
                        value: S
                      }
                    ) }),
                    children: f.prompts.empty_state && Fl.length === 0 ? /* @__PURE__ */ l(Fo, { emptyState: f.prompts.empty_state }) : /* @__PURE__ */ l(
                      je,
                      {
                        sx: {
                          display: "grid",
                          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                          gap: 1.5
                        },
                        children: Fl.map((u) => {
                          const R = !u.enabled || !u.server_enabled;
                          return /* @__PURE__ */ T(
                            ht,
                            {
                              role: "link",
                              tabIndex: 0,
                              "aria-label": `Open prompt ${u.name}`,
                              onClick: () => {
                                lt(Ud(u.canonical_name));
                              },
                              onKeyDown: (L) => {
                                (L.key === "Enter" || L.key === " ") && (L.preventDefault(), lt(Ud(u.canonical_name)));
                              },
                              elevation: 0,
                              variant: "outlined",
                              sx: {
                                p: 1.5,
                                borderRadius: 2,
                                cursor: "pointer",
                                borderColor: "divider",
                                opacity: R ? 0.82 : 1,
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
                                /* @__PURE__ */ l(q, { variant: "subtitle2", sx: { fontWeight: 700, mb: 0.5 }, children: u.name }),
                                /* @__PURE__ */ l(q, { variant: "caption", color: "text.secondary", sx: { display: "block", mb: 1, wordBreak: "break-all" }, children: /* @__PURE__ */ l("code", { children: u.canonical_name }) }),
                                /* @__PURE__ */ l(q, { variant: "caption", color: "text.secondary", sx: { display: "block", mb: 1 }, children: /* @__PURE__ */ l("code", { children: u.server }) }),
                                /* @__PURE__ */ T(pe, { direction: "row", spacing: 0.5, sx: { flexWrap: "wrap", gap: 0.5, mb: 1 }, children: [
                                  /* @__PURE__ */ l(
                                    en,
                                    {
                                      text: u.enabled ? "Enabled" : "Disabled",
                                      tone: u.enabled ? "good" : "muted"
                                    }
                                  ),
                                  u.server_enabled ? null : /* @__PURE__ */ l(en, { text: "Server off", tone: "warn" })
                                ] }),
                                /* @__PURE__ */ l(
                                  q,
                                  {
                                    variant: "caption",
                                    color: "text.secondary",
                                    sx: {
                                      display: "-webkit-box",
                                      WebkitLineClamp: 3,
                                      WebkitBoxOrient: "vertical",
                                      overflow: "hidden"
                                    },
                                    children: Fi(u)
                                  }
                                ),
                                /* @__PURE__ */ l(q, { variant: "caption", color: "primary", sx: { display: "block", mt: 1 }, children: "View details →" })
                              ]
                            },
                            u.canonical_name
                          );
                        })
                      }
                    )
                  }
                ) : null,
                o === "resources" && f.resources ? /* @__PURE__ */ l(Vt, { title: "Resources", subtitle: "Discovered MCP resources", children: f.resources.empty_state && f.resources.resources.length === 0 ? /* @__PURE__ */ l(Fo, { emptyState: f.resources.empty_state }) : /* @__PURE__ */ T("table", { className: "data-table compact-table resources-table", children: [
                  /* @__PURE__ */ l("thead", { children: /* @__PURE__ */ T("tr", { children: [
                    /* @__PURE__ */ l("th", { children: "Name" }),
                    /* @__PURE__ */ l("th", { children: "URI" }),
                    /* @__PURE__ */ l("th", { children: "Server" }),
                    /* @__PURE__ */ l("th", { children: "MIME" }),
                    /* @__PURE__ */ l("th", { children: "Description" })
                  ] }) }),
                  /* @__PURE__ */ l("tbody", { children: f.resources.resources.map((u) => /* @__PURE__ */ T("tr", { children: [
                    /* @__PURE__ */ l("td", { children: u.name }),
                    /* @__PURE__ */ l("td", { children: /* @__PURE__ */ T("div", { className: "inline-copy resource-uri-cell", children: [
                      /* @__PURE__ */ l("code", { className: "identifier-code", title: u.uri, children: u.uri }),
                      /* @__PURE__ */ l(
                        vt,
                        {
                          ariaLabel: "Copy resource URI",
                          title: "Copy resource URI",
                          value: u.uri
                        }
                      )
                    ] }) }),
                    /* @__PURE__ */ l("td", { children: u.server }),
                    /* @__PURE__ */ l("td", { children: /* @__PURE__ */ l("code", { children: u.mime_type || "Unknown" }) }),
                    /* @__PURE__ */ l("td", { children: bw(u) })
                  ] }, u.uri)) })
                ] }) }) : null,
                o === "agent_apps" && f.agentApps ? Gn !== null ? /* @__PURE__ */ l(
                  Vt,
                  {
                    title: (gr == null ? void 0 : gr.name) ?? `Agent app #${Gn}`,
                    action: /* @__PURE__ */ T(pe, { direction: "row", spacing: 1, useFlexGap: !0, sx: { flexWrap: "wrap" }, children: [
                      /* @__PURE__ */ l(
                        ge,
                        {
                          variant: "outlined",
                          onClick: () => {
                            lt(yt("agent_apps"));
                          },
                          children: "← All apps"
                        }
                      ),
                      /* @__PURE__ */ l(ge, { variant: "contained", onClick: Gl, children: "+ Create agent app" })
                    ] }),
                    children: gr ? wm(gr) : /* @__PURE__ */ T(pe, { spacing: 2, sx: { py: 2 }, children: [
                      /* @__PURE__ */ l(q, { color: "text.secondary", variant: "body2", children: "This agent app does not exist or was deleted. Bookmarked URLs are only valid while the app is present." }),
                      /* @__PURE__ */ l(
                        ge,
                        {
                          variant: "contained",
                          onClick: () => {
                            lt(yt("agent_apps"));
                          },
                          children: "Back to all apps"
                        }
                      )
                    ] })
                  }
                ) : /* @__PURE__ */ l(
                  Vt,
                  {
                    title: "Agent apps",
                    action: /* @__PURE__ */ l(ge, { variant: "contained", onClick: Gl, children: "+ Create agent app" }),
                    children: f.agentApps.apps.length === 0 ? /* @__PURE__ */ l(q, { color: "text.secondary", variant: "body2", children: "No agent apps yet. Create one to mint tokens scoped to specific tool and prompt groups." }) : /* @__PURE__ */ l(
                      je,
                      {
                        sx: {
                          display: "grid",
                          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                          gap: 1.5
                        },
                        children: f.agentApps.apps.map((u) => /* @__PURE__ */ T(
                          ht,
                          {
                            role: "link",
                            tabIndex: 0,
                            "aria-label": `Open ${u.name}`,
                            onClick: () => {
                              lt(ha(u.id));
                            },
                            onKeyDown: (R) => {
                              (R.key === "Enter" || R.key === " ") && (R.preventDefault(), lt(ha(u.id)));
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
                              /* @__PURE__ */ T(pe, { direction: "row", spacing: 1, sx: { alignItems: "flex-start", mb: 0.5 }, children: [
                                /* @__PURE__ */ l(q, { variant: "subtitle2", sx: { fontWeight: 700, flex: 1, minWidth: 0 }, children: u.name }),
                                /* @__PURE__ */ l(
                                  en,
                                  {
                                    tone: u.status === "enabled" ? "good" : "muted",
                                    text: u.status === "enabled" ? "enabled" : "disabled"
                                  }
                                )
                              ] }),
                              u.description ? /* @__PURE__ */ l(
                                q,
                                {
                                  variant: "caption",
                                  color: "text.secondary",
                                  sx: {
                                    display: "-webkit-box",
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden"
                                  },
                                  children: u.description
                                }
                              ) : /* @__PURE__ */ l(q, { variant: "caption", color: "text.disabled", children: "No description" }),
                              /* @__PURE__ */ l(q, { variant: "caption", color: "primary", sx: { display: "block", mt: 1 }, children: "View details →" })
                            ]
                          },
                          u.id
                        ))
                      }
                    )
                  }
                ) : null,
                o === "diagnostics" && fo ? /* @__PURE__ */ T(qt, { children: [
                  /* @__PURE__ */ T(Vt, { title: "System Info", subtitle: "Runtime details", children: [
                    /* @__PURE__ */ l(
                      je,
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
                        children: /* @__PURE__ */ T(q, { variant: "body2", color: "text.secondary", sx: { lineHeight: 1.6 }, children: [
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
                        /* @__PURE__ */ l("strong", { children: gw(fo.version) })
                      ] }),
                      /* @__PURE__ */ T("div", { className: "diag-card compact-metric", children: [
                        /* @__PURE__ */ l("span", { children: "Mode" }),
                        /* @__PURE__ */ l("strong", { children: fo.mode })
                      ] }),
                      /* @__PURE__ */ T("div", { className: "diag-card compact-metric", children: [
                        /* @__PURE__ */ l("span", { children: "Database" }),
                        /* @__PURE__ */ l("strong", { children: fo.database })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ l(Vt, { title: "Runtime details", subtitle: "System information", children: /* @__PURE__ */ T("dl", { className: "diagnostic-list compact-diagnostic-list", children: [
                    /* @__PURE__ */ T("div", { children: [
                      /* @__PURE__ */ l("dt", { children: "Full build" }),
                      /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ l("code", { children: fo.version }) })
                    ] }),
                    /* @__PURE__ */ T("div", { children: [
                      /* @__PURE__ */ l("dt", { children: "Global MCP Endpoint" }),
                      /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ l("code", { children: fo.primary_endpoint }) })
                    ] }),
                    /* @__PURE__ */ T("div", { children: [
                      /* @__PURE__ */ l("dt", { children: "Enabled transports" }),
                      /* @__PURE__ */ l("dd", { children: /* @__PURE__ */ l("code", { children: fo.enabled_transports.join(", ") }) })
                    ] })
                  ] }) })
                ] }) : null
              ] }) }) : null,
              /* @__PURE__ */ T(Wo, { open: xe, onClose: gi, maxWidth: "md", fullWidth: !0, scroll: "paper", children: [
                /* @__PURE__ */ l(Uo, { sx: { pr: 6 }, children: /* @__PURE__ */ T(
                  pe,
                  {
                    direction: "row",
                    spacing: 2,
                    sx: { justifyContent: "space-between", alignItems: "flex-start" },
                    children: [
                      /* @__PURE__ */ T(je, { children: [
                        /* @__PURE__ */ l(q, { variant: "caption", sx: { letterSpacing: "0.12em", fontWeight: 600 }, children: "Tool Groups" }),
                        /* @__PURE__ */ l(q, { variant: "h5", sx: { mt: 0.5 }, children: ye ? "Edit Tool Group" : "Add Tool Group" })
                      ] }),
                      /* @__PURE__ */ l(ge, { variant: "outlined", size: "small", onClick: gi, children: "Close" })
                    ]
                  }
                ) }),
                /* @__PURE__ */ l(Vo, { dividers: !0, children: /* @__PURE__ */ T(pe, { spacing: 2, children: [
                  /* @__PURE__ */ l(
                    Et,
                    {
                      label: "Group name",
                      placeholder: "coding",
                      fullWidth: !0,
                      size: "small",
                      value: Me.name,
                      disabled: ye !== null,
                      helperText: ye ? "Group name cannot be changed." : void 0,
                      onChange: (u) => Fe((R) => ({ ...R, name: u.target.value }))
                    }
                  ),
                  /* @__PURE__ */ l(
                    Et,
                    {
                      label: "Description",
                      placeholder: "Tools useful for coding workflows",
                      fullWidth: !0,
                      size: "small",
                      value: Me.description,
                      onChange: (u) => Fe((R) => ({ ...R, description: u.target.value }))
                    }
                  ),
                  /* @__PURE__ */ T(An, { size: "small", fullWidth: !0, children: [
                    /* @__PURE__ */ l(_n, { id: "tg-mcp-security-label", children: "MCP security" }),
                    /* @__PURE__ */ l(
                      Tn,
                      {
                        labelId: "tg-mcp-security-label",
                        label: "MCP security",
                        value: Me.securityOption,
                        onChange: (u) => Fe((R) => ({
                          ...R,
                          securityOption: u.target.value
                        })),
                        children: Ya.map((u) => /* @__PURE__ */ l(jt, { value: u.value, children: u.label }, u.value))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ T("div", { className: "tool-group-builder", children: [
                    /* @__PURE__ */ T("div", { className: "tool-group-selector panel", children: [
                      /* @__PURE__ */ l("div", { className: "tool-group-selector-header", children: /* @__PURE__ */ l("strong", { children: "Available tools" }) }),
                      (((uc = f.tools) == null ? void 0 : uc.tools.length) ?? 0) > 0 ? /* @__PURE__ */ T(qt, { children: [
                        /* @__PURE__ */ T(pe, { direction: { xs: "column", sm: "row" }, spacing: 1, sx: { mb: 1 }, children: [
                          /* @__PURE__ */ l(
                            Et,
                            {
                              placeholder: "Search tools",
                              size: "small",
                              value: A,
                              onChange: (u) => _(u.target.value),
                              sx: { flex: 1, minWidth: 0 }
                            }
                          ),
                          /* @__PURE__ */ T(An, { size: "small", sx: { minWidth: 160 }, children: [
                            /* @__PURE__ */ l(_n, { id: "tg-server-filter", children: "Server" }),
                            /* @__PURE__ */ T(
                              Tn,
                              {
                                labelId: "tg-server-filter",
                                label: "Server",
                                value: D,
                                onChange: (u) => F(u.target.value),
                                children: [
                                  /* @__PURE__ */ l(jt, { value: "all", children: "All servers" }),
                                  wt.map((u) => /* @__PURE__ */ l(jt, { value: u, children: u }, u))
                                ]
                              }
                            )
                          ] })
                        ] }),
                        /* @__PURE__ */ l("div", { className: "tool-pick-list", children: an.map((u) => {
                          const R = Me.selectedTools.includes(u.canonical_name);
                          return /* @__PURE__ */ T(
                            "button",
                            {
                              className: `tool-pick-item ${R ? "is-selected" : ""}`,
                              onClick: () => Qf(u.canonical_name),
                              type: "button",
                              children: [
                                /* @__PURE__ */ l("div", { className: "table-primary", children: u.name }),
                                /* @__PURE__ */ l("code", { className: "identifier-code", title: u.canonical_name, children: u.canonical_name }),
                                /* @__PURE__ */ l("div", { className: "table-secondary", children: u.server })
                              ]
                            },
                            u.canonical_name
                          );
                        }) })
                      ] }) : /* @__PURE__ */ l("p", { className: "empty-inline", children: "Register MCP servers first so tools are available to group." })
                    ] }),
                    /* @__PURE__ */ T("div", { className: "tool-group-selector panel", children: [
                      /* @__PURE__ */ l("div", { className: "tool-group-selector-header", children: /* @__PURE__ */ l("strong", { children: "Selected tools" }) }),
                      Me.selectedTools.length > 0 ? /* @__PURE__ */ l("div", { className: "selected-tool-list", children: Me.selectedTools.map((u) => /* @__PURE__ */ T(
                        "button",
                        {
                          className: "selected-tool-chip",
                          onClick: () => Zf(u),
                          type: "button",
                          children: [
                            /* @__PURE__ */ l("code", { children: u }),
                            /* @__PURE__ */ l("span", { children: "Remove" })
                          ]
                        },
                        u
                      )) }) : /* @__PURE__ */ l("p", { className: "empty-inline", children: "Select at least one tool." })
                    ] })
                  ] }),
                  rt ? /* @__PURE__ */ l(q, { color: "error", variant: "body2", children: rt }) : null
                ] }) }),
                /* @__PURE__ */ T(zo, { sx: { px: 3, py: 2 }, children: [
                  /* @__PURE__ */ l(ge, { variant: "outlined", onClick: gi, children: "Cancel" }),
                  /* @__PURE__ */ l(
                    ge,
                    {
                      variant: "contained",
                      disabled: qe("tool-group-create") || qe("tool-group-save"),
                      onClick: () => void cm(),
                      children: qe("tool-group-create") || qe("tool-group-save") ? "Saving..." : ye ? "Save changes" : "+ Add Tool Group"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ T(Wo, { open: Ue, onClose: bi, maxWidth: "md", fullWidth: !0, scroll: "paper", children: [
                /* @__PURE__ */ l(Uo, { sx: { pr: 6 }, children: /* @__PURE__ */ T(
                  pe,
                  {
                    direction: "row",
                    spacing: 2,
                    sx: { justifyContent: "space-between", alignItems: "flex-start" },
                    children: [
                      /* @__PURE__ */ T(je, { children: [
                        /* @__PURE__ */ l(q, { variant: "caption", sx: { letterSpacing: "0.12em", fontWeight: 600 }, children: "Prompt Groups" }),
                        /* @__PURE__ */ l(q, { variant: "h5", sx: { mt: 0.5 }, children: De ? "Edit Prompt Group" : "Add Prompt Group" })
                      ] }),
                      /* @__PURE__ */ l(ge, { variant: "outlined", size: "small", onClick: bi, children: "Close" })
                    ]
                  }
                ) }),
                /* @__PURE__ */ l(Vo, { dividers: !0, children: /* @__PURE__ */ T(pe, { spacing: 2, children: [
                  /* @__PURE__ */ l(
                    Et,
                    {
                      label: "Group name",
                      placeholder: "reviews",
                      fullWidth: !0,
                      size: "small",
                      value: We.name,
                      disabled: De !== null,
                      helperText: De ? "Group name cannot be changed." : void 0,
                      onChange: (u) => ue((R) => ({ ...R, name: u.target.value }))
                    }
                  ),
                  /* @__PURE__ */ l(
                    Et,
                    {
                      label: "Description",
                      placeholder: "Prompts useful for PR review workflows",
                      fullWidth: !0,
                      size: "small",
                      value: We.description,
                      onChange: (u) => ue((R) => ({ ...R, description: u.target.value }))
                    }
                  ),
                  /* @__PURE__ */ T(An, { size: "small", fullWidth: !0, children: [
                    /* @__PURE__ */ l(_n, { id: "pg-mcp-security-label", children: "MCP security" }),
                    /* @__PURE__ */ l(
                      Tn,
                      {
                        labelId: "pg-mcp-security-label",
                        label: "MCP security",
                        value: We.securityOption,
                        onChange: (u) => ue((R) => ({
                          ...R,
                          securityOption: u.target.value
                        })),
                        children: Ya.map((u) => /* @__PURE__ */ l(jt, { value: u.value, children: u.label }, u.value))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ T("div", { className: "tool-group-builder", children: [
                    /* @__PURE__ */ T("div", { className: "tool-group-selector panel", children: [
                      /* @__PURE__ */ l("div", { className: "tool-group-selector-header", children: /* @__PURE__ */ l("strong", { children: "Available prompts" }) }),
                      (((pc = f.prompts) == null ? void 0 : pc.prompts.length) ?? 0) > 0 ? /* @__PURE__ */ T(qt, { children: [
                        /* @__PURE__ */ T(pe, { direction: { xs: "column", sm: "row" }, spacing: 1, sx: { mb: 1 }, children: [
                          /* @__PURE__ */ l(
                            Et,
                            {
                              placeholder: "Search prompts",
                              size: "small",
                              value: P,
                              onChange: (u) => g(u.target.value),
                              sx: { flex: 1, minWidth: 0 }
                            }
                          ),
                          /* @__PURE__ */ T(An, { size: "small", sx: { minWidth: 160 }, children: [
                            /* @__PURE__ */ l(_n, { id: "pg-server-filter", children: "Server" }),
                            /* @__PURE__ */ T(
                              Tn,
                              {
                                labelId: "pg-server-filter",
                                label: "Server",
                                value: $,
                                onChange: (u) => I(u.target.value),
                                children: [
                                  /* @__PURE__ */ l(jt, { value: "all", children: "All servers" }),
                                  ui.map((u) => /* @__PURE__ */ l(jt, { value: u, children: u }, u))
                                ]
                              }
                            )
                          ] })
                        ] }),
                        /* @__PURE__ */ l("div", { className: "tool-pick-list", children: pi.map((u) => {
                          const R = We.selectedPrompts.includes(u.canonical_name);
                          return /* @__PURE__ */ T(
                            "button",
                            {
                              className: `tool-pick-item ${R ? "is-selected" : ""}`,
                              onClick: () => tm(u.canonical_name),
                              type: "button",
                              children: [
                                /* @__PURE__ */ l("div", { className: "table-primary", children: u.name }),
                                /* @__PURE__ */ l("code", { className: "identifier-code", title: u.canonical_name, children: u.canonical_name }),
                                /* @__PURE__ */ l("div", { className: "table-secondary", children: u.server })
                              ]
                            },
                            u.canonical_name
                          );
                        }) })
                      ] }) : /* @__PURE__ */ l("p", { className: "empty-inline", children: "Register MCP servers first so prompts are available to group." })
                    ] }),
                    /* @__PURE__ */ T("div", { className: "tool-group-selector panel", children: [
                      /* @__PURE__ */ l("div", { className: "tool-group-selector-header", children: /* @__PURE__ */ l("strong", { children: "Selected prompts" }) }),
                      We.selectedPrompts.length > 0 ? /* @__PURE__ */ l("div", { className: "selected-tool-list", children: We.selectedPrompts.map((u) => /* @__PURE__ */ T(
                        "button",
                        {
                          className: "selected-tool-chip",
                          onClick: () => nm(u),
                          type: "button",
                          children: [
                            /* @__PURE__ */ l("code", { children: u }),
                            /* @__PURE__ */ l("span", { children: "Remove" })
                          ]
                        },
                        u
                      )) }) : /* @__PURE__ */ l("p", { className: "empty-inline", children: "Select at least one prompt." })
                    ] })
                  ] }),
                  Ae ? /* @__PURE__ */ l(q, { color: "error", variant: "body2", children: Ae }) : null
                ] }) }),
                /* @__PURE__ */ T(zo, { sx: { px: 3, py: 2 }, children: [
                  /* @__PURE__ */ l(ge, { variant: "outlined", onClick: bi, children: "Cancel" }),
                  /* @__PURE__ */ l(
                    ge,
                    {
                      variant: "contained",
                      disabled: qe("prompt-group-create") || qe("prompt-group-save"),
                      onClick: () => void dm(),
                      children: qe("prompt-group-create") || qe("prompt-group-save") ? "Saving..." : De ? "Save changes" : "+ Add Prompt Group"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ T(Wo, { open: re, onClose: mo, maxWidth: "sm", fullWidth: !0, scroll: "paper", children: [
                /* @__PURE__ */ l(Uo, { sx: { pr: 6 }, children: /* @__PURE__ */ T(
                  pe,
                  {
                    direction: "row",
                    spacing: 2,
                    sx: { justifyContent: "space-between", alignItems: "flex-start" },
                    children: [
                      /* @__PURE__ */ T(je, { children: [
                        /* @__PURE__ */ l(q, { variant: "caption", sx: { letterSpacing: "0.12em", fontWeight: 600 }, children: K ? "Edit server" : "Add server" }),
                        /* @__PURE__ */ l(q, { variant: "h5", sx: { mt: 0.5 }, children: fe ? "Complete OAuth authorization" : K ? "Edit MCP server" : "Register an MCP server" })
                      ] }),
                      /* @__PURE__ */ l(ge, { variant: "outlined", size: "small", onClick: mo, children: "Close" })
                    ]
                  }
                ) }),
                /* @__PURE__ */ l(Vo, { dividers: !0, children: X ? /* @__PURE__ */ l(pe, { sx: { alignItems: "center", justifyContent: "center", py: 6 }, children: /* @__PURE__ */ l(Qo, {}) }) : fe ? /* @__PURE__ */ T(pe, { spacing: 2, className: "oauth-step", children: [
                  /* @__PURE__ */ l(q, { children: "This MCP server requires OAuth authorization. Continue in your browser to complete registration." }),
                  /* @__PURE__ */ l(ht, { variant: "outlined", sx: { p: 2, borderRadius: 2 }, children: /* @__PURE__ */ T(pe, { spacing: 0.5, children: [
                    /* @__PURE__ */ l(q, { variant: "caption", color: "text.secondary", children: "Status" }),
                    /* @__PURE__ */ l(q, { variant: "body1", sx: { fontWeight: 600 }, children: fe.hasOpenedBrowser ? "Waiting for OAuth authorization..." : "Authorization required" }),
                    fe.authorization.expires_at ? /* @__PURE__ */ T(q, { variant: "body2", color: "text.secondary", children: [
                      "Expires ",
                      new Date(fe.authorization.expires_at).toLocaleTimeString()
                    ] }) : null
                  ] }) }),
                  fe.error ? /* @__PURE__ */ l(q, { color: "error", variant: "body2", children: fe.error }) : null
                ] }) : /* @__PURE__ */ T(pe, { spacing: 2, children: [
                  /* @__PURE__ */ l(
                    Et,
                    {
                      label: "Server name",
                      placeholder: ae.transport === "streamable_http" ? "context7" : "filesystem",
                      fullWidth: !0,
                      size: "small",
                      value: ae.name,
                      disabled: K !== null,
                      onChange: (u) => so("name", u.target.value)
                    }
                  ),
                  /* @__PURE__ */ l(
                    Et,
                    {
                      label: "Description",
                      placeholder: ae.transport === "streamable_http" ? "context7 mcp server" : "Local filesystem access",
                      fullWidth: !0,
                      size: "small",
                      value: ae.description,
                      onChange: (u) => so("description", u.target.value)
                    }
                  ),
                  /* @__PURE__ */ T(pe, { direction: { xs: "column", md: "row" }, spacing: 2, children: [
                    /* @__PURE__ */ T(An, { fullWidth: !0, size: "small", children: [
                      /* @__PURE__ */ l(_n, { id: "reg-transport", children: "Transport" }),
                      /* @__PURE__ */ T(
                        Tn,
                        {
                          labelId: "reg-transport",
                          label: "Transport",
                          value: ae.transport,
                          disabled: K !== null,
                          onChange: (u) => so(
                            "transport",
                            u.target.value
                          ),
                          children: [
                            /* @__PURE__ */ l(jt, { value: "stdio", children: "stdio" }),
                            /* @__PURE__ */ l(jt, { value: "streamable_http", children: "streamable_http" }),
                            /* @__PURE__ */ l(jt, { value: "sse", children: "sse" })
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ T(An, { fullWidth: !0, size: "small", children: [
                      /* @__PURE__ */ l(_n, { id: "reg-session", children: "Session mode" }),
                      /* @__PURE__ */ T(
                        Tn,
                        {
                          labelId: "reg-session",
                          label: "Session mode",
                          value: ae.session_mode,
                          onChange: (u) => so(
                            "session_mode",
                            u.target.value
                          ),
                          children: [
                            /* @__PURE__ */ l(jt, { value: "stateless", children: "stateless" }),
                            /* @__PURE__ */ l(jt, { value: "stateful", children: "stateful" })
                          ]
                        }
                      )
                    ] })
                  ] }),
                  ae.transport === "stdio" ? /* @__PURE__ */ T(pe, { spacing: 2, children: [
                    /* @__PURE__ */ l(
                      Et,
                      {
                        label: "Command",
                        placeholder: "npx",
                        fullWidth: !0,
                        size: "small",
                        value: ae.command,
                        onChange: (u) => so("command", u.target.value)
                      }
                    ),
                    /* @__PURE__ */ l(
                      Et,
                      {
                        label: "Arguments",
                        placeholder: "-y\\n@modelcontextprotocol/server-filesystem",
                        fullWidth: !0,
                        size: "small",
                        multiline: !0,
                        minRows: 3,
                        value: ae.args_text,
                        onChange: (u) => so("args_text", u.target.value)
                      }
                    ),
                    /* @__PURE__ */ T(je, { children: [
                      /* @__PURE__ */ l(q, { variant: "subtitle2", gutterBottom: !0, children: "Environment variables" }),
                      /* @__PURE__ */ l(pe, { spacing: 1, children: ae.env_rows.map((u, R) => /* @__PURE__ */ T(pe, { direction: { xs: "column", sm: "row" }, spacing: 1, children: [
                        /* @__PURE__ */ l(
                          Et,
                          {
                            size: "small",
                            label: "KEY",
                            placeholder: "KEY",
                            value: u.key,
                            onChange: (L) => hi("env_rows", R, "key", L.target.value),
                            sx: { flex: 1 }
                          }
                        ),
                        /* @__PURE__ */ l(
                          Et,
                          {
                            size: "small",
                            label: "value",
                            placeholder: "value",
                            value: u.value,
                            onChange: (L) => hi("env_rows", R, "value", L.target.value),
                            sx: { flex: 1 }
                          }
                        ),
                        /* @__PURE__ */ l(
                          ge,
                          {
                            variant: "outlined",
                            onClick: () => zl("env_rows", R),
                            sx: { alignSelf: { sm: "center" } },
                            children: "Remove"
                          }
                        )
                      ] }, `env-${R}`)) }),
                      /* @__PURE__ */ l(
                        ge,
                        {
                          variant: "outlined",
                          size: "small",
                          sx: { mt: 1 },
                          onClick: () => Wl("env_rows"),
                          children: "Add env var"
                        }
                      )
                    ] })
                  ] }) : /* @__PURE__ */ T(pe, { spacing: 2, children: [
                    /* @__PURE__ */ l(
                      Et,
                      {
                        label: "Target URL",
                        fullWidth: !0,
                        size: "small",
                        placeholder: ae.transport === "streamable_http" ? "https://mcp.context7.com/mcp" : "http://127.0.0.1:8000/mcp",
                        value: ae.url,
                        onChange: (u) => so("url", u.target.value)
                      }
                    ),
                    /* @__PURE__ */ l(
                      Et,
                      {
                        label: "Bearer token",
                        fullWidth: !0,
                        size: "small",
                        type: "password",
                        placeholder: "Optional",
                        value: ae.bearer_token,
                        onChange: (u) => so("bearer_token", u.target.value),
                        helperText: K !== null ? "Leave blank to keep the current bearer token." : void 0
                      }
                    ),
                    ae.transport === "streamable_http" ? /* @__PURE__ */ T(je, { children: [
                      /* @__PURE__ */ l(q, { variant: "subtitle2", gutterBottom: !0, children: "Headers" }),
                      /* @__PURE__ */ l(pe, { spacing: 1, children: ae.header_rows.map((u, R) => /* @__PURE__ */ T(pe, { direction: { xs: "column", sm: "row" }, spacing: 1, children: [
                        /* @__PURE__ */ l(
                          Et,
                          {
                            size: "small",
                            label: "Header",
                            placeholder: "Header",
                            value: u.key,
                            onChange: (L) => hi("header_rows", R, "key", L.target.value),
                            sx: { flex: 1 }
                          }
                        ),
                        /* @__PURE__ */ l(
                          Et,
                          {
                            size: "small",
                            label: "Value",
                            placeholder: "Value",
                            value: u.value,
                            onChange: (L) => hi("header_rows", R, "value", L.target.value),
                            sx: { flex: 1 }
                          }
                        ),
                        /* @__PURE__ */ l(
                          ge,
                          {
                            variant: "outlined",
                            onClick: () => zl("header_rows", R),
                            sx: { alignSelf: { sm: "center" } },
                            children: "Remove"
                          }
                        )
                      ] }, `header-${R}`)) }),
                      /* @__PURE__ */ l(
                        ge,
                        {
                          variant: "outlined",
                          size: "small",
                          sx: { mt: 1 },
                          onClick: () => Wl("header_rows"),
                          children: "Add header"
                        }
                      )
                    ] }) : null
                  ] }),
                  me ? /* @__PURE__ */ l(q, { color: "error", variant: "body2", children: me }) : null
                ] }) }),
                /* @__PURE__ */ l(zo, { sx: { px: 3, py: 2, flexWrap: "wrap", gap: 1 }, children: fe ? /* @__PURE__ */ T(qt, { children: [
                  /* @__PURE__ */ l(
                    ge,
                    {
                      variant: "outlined",
                      onClick: () => Xf("Start registration again to retry OAuth."),
                      children: "Start over"
                    }
                  ),
                  /* @__PURE__ */ l(ge, { variant: "contained", onClick: rm, children: fe.hasOpenedBrowser ? "Open OAuth again" : "Continue OAuth" })
                ] }) : /* @__PURE__ */ T(qt, { children: [
                  /* @__PURE__ */ l(ge, { variant: "outlined", onClick: mo, children: "Cancel" }),
                  /* @__PURE__ */ l(
                    ge,
                    {
                      variant: "contained",
                      disabled: qe("register-server") || X,
                      onClick: () => void om(),
                      children: qe("register-server") ? K ? "Saving..." : "Registering..." : K ? "Save changes" : "+ Add Server"
                    }
                  )
                ] }) })
              ] }),
              /* @__PURE__ */ T(Wo, { open: pt, onClose: yi, maxWidth: "sm", fullWidth: !0, scroll: "paper", children: [
                /* @__PURE__ */ l(Uo, { children: $t !== null ? "Edit agent app" : "Create agent app" }),
                /* @__PURE__ */ l(Vo, { dividers: !0, children: /* @__PURE__ */ T(pe, { spacing: 2, sx: { pt: 1 }, children: [
                  /* @__PURE__ */ l(
                    Et,
                    {
                      label: "Name",
                      fullWidth: !0,
                      required: !0,
                      size: "small",
                      value: ro,
                      onChange: (u) => yn(u.target.value)
                    }
                  ),
                  /* @__PURE__ */ l(
                    Et,
                    {
                      label: "Description",
                      fullWidth: !0,
                      size: "small",
                      multiline: !0,
                      minRows: 2,
                      value: he,
                      onChange: (u) => He(u.target.value)
                    }
                  ),
                  Po ? /* @__PURE__ */ l(ja, { severity: "warning", children: "This app's saved configuration is invalid (must be exactly one tool group or one prompt group). Choose one valid group below and save." }) : null,
                  /* @__PURE__ */ T(
                    An,
                    {
                      fullWidth: !0,
                      size: "small",
                      disabled: fi.length === 0 && Ct === "",
                      children: [
                        /* @__PURE__ */ l(_n, { id: "agent-app-tool-groups-label", children: "Tool group" }),
                        /* @__PURE__ */ T(
                          Tn,
                          {
                            labelId: "agent-app-tool-groups-label",
                            id: "agent-app-tool-groups",
                            value: Ct,
                            label: "Tool group",
                            onChange: (u) => {
                              const R = u.target.value;
                              Zt(R), R !== "" && Nn("");
                            },
                            MenuProps: { slotProps: { paper: { sx: { maxHeight: 360 } } } },
                            children: [
                              /* @__PURE__ */ l(jt, { value: "", children: /* @__PURE__ */ l("em", { children: "— None —" }) }),
                              Hf.map((u) => /* @__PURE__ */ l(jt, { value: u, children: u }, u))
                            ]
                          }
                        ),
                        /* @__PURE__ */ l(us, { children: fi.length === 0 ? "No tool groups yet. Create one in the Tool groups section." : "Pick exactly one tool group or one prompt group (not both). Choosing a tool group clears the prompt group." })
                      ]
                    }
                  ),
                  /* @__PURE__ */ T(
                    An,
                    {
                      fullWidth: !0,
                      size: "small",
                      disabled: mi.length === 0 && Mt === "",
                      children: [
                        /* @__PURE__ */ l(_n, { id: "agent-app-prompt-groups-label", children: "Prompt group" }),
                        /* @__PURE__ */ T(
                          Tn,
                          {
                            labelId: "agent-app-prompt-groups-label",
                            id: "agent-app-prompt-groups",
                            value: Mt,
                            label: "Prompt group",
                            onChange: (u) => {
                              const R = u.target.value;
                              Nn(R), R !== "" && Zt("");
                            },
                            MenuProps: { slotProps: { paper: { sx: { maxHeight: 360 } } } },
                            children: [
                              /* @__PURE__ */ l(jt, { value: "", children: /* @__PURE__ */ l("em", { children: "— None —" }) }),
                              Gf.map((u) => /* @__PURE__ */ l(jt, { value: u, children: u }, u))
                            ]
                          }
                        ),
                        /* @__PURE__ */ l(us, { children: mi.length === 0 ? "No prompt groups yet. Create one in the Prompt groups section." : "Choosing a prompt group clears the tool group." })
                      ]
                    }
                  ),
                  Io ? /* @__PURE__ */ l(q, { color: "error", variant: "body2", children: Io }) : null
                ] }) }),
                /* @__PURE__ */ T(zo, { sx: { px: 3, py: 2 }, children: [
                  /* @__PURE__ */ l(ge, { variant: "outlined", onClick: yi, children: "Cancel" }),
                  /* @__PURE__ */ l(
                    ge,
                    {
                      variant: "contained",
                      disabled: qe($t !== null ? `agent-app-edit:${$t}` : "agent-app-create"),
                      onClick: () => void mm(),
                      children: $t !== null ? qe(`agent-app-edit:${$t}`) ? "Saving..." : "Save changes" : qe("agent-app-create") ? "Creating..." : "Create"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ T(
                Wo,
                {
                  open: Bt !== null,
                  onClose: () => Ht(null),
                  maxWidth: "sm",
                  fullWidth: !0,
                  children: [
                    /* @__PURE__ */ l(Uo, { children: "Client secret" }),
                    /* @__PURE__ */ l(Vo, { dividers: !0, children: /* @__PURE__ */ T(pe, { spacing: 2, children: [
                      /* @__PURE__ */ l(q, { variant: "body2", children: Bt == null ? void 0 : Bt.title }),
                      /* @__PURE__ */ l(ht, { variant: "outlined", sx: { p: 1.5, borderRadius: 2 }, children: /* @__PURE__ */ T(pe, { direction: "row", spacing: 1, sx: { alignItems: "center" }, children: [
                        /* @__PURE__ */ l(
                          q,
                          {
                            component: "code",
                            sx: { flex: 1, wordBreak: "break-all", fontFamily: So },
                            children: Bt == null ? void 0 : Bt.secret
                          }
                        ),
                        /* @__PURE__ */ l(
                          vt,
                          {
                            ariaLabel: "Copy client secret",
                            title: "Copy client secret",
                            value: (Bt == null ? void 0 : Bt.secret) ?? ""
                          }
                        )
                      ] }) }),
                      /* @__PURE__ */ l(q, { variant: "caption", color: "text.secondary", children: "Store this secret securely. It will not be shown again after you close this dialog." })
                    ] }) }),
                    /* @__PURE__ */ l(zo, { sx: { px: 3, py: 2 }, children: /* @__PURE__ */ l(ge, { variant: "contained", onClick: () => Ht(null), children: "Done" }) })
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
function Tw(e) {
  const t = e.trim();
  return t === "" ? "" : t.replace(/\/$/, "");
}
function Ew(e) {
  return e === "home" ? "servers" : e;
}
function Ow({
  children: e,
  mode: t,
  token: o,
  tenantId: r,
  httpPathPrefix: i,
  defaultSection: s = "servers"
}) {
  return jd({
    mode: t,
    token: (o == null ? void 0 : o.trim()) || void 0,
    tenantId: (r == null ? void 0 : r.trim()) || void 0,
    httpPathPrefix: Tw(i ?? ""),
    defaultSection: t === "standalone" ? "home" : t === "component" ? Ew(s) : s
  }), $r(() => () => jd(null), []), e;
}
function Iw({
  token: e,
  tenantId: t,
  httpPathPrefix: o,
  defaultSection: r = "servers",
  className: i,
  style: s
}) {
  return /* @__PURE__ */ l(
    je,
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
        Ow,
        {
          mode: "component",
          token: e,
          tenantId: t,
          httpPathPrefix: o,
          defaultSection: r,
          children: /* @__PURE__ */ T(Sy, { theme: z1, children: [
            /* @__PURE__ */ l(fp, {}),
            /* @__PURE__ */ l(ww, {})
          ] })
        }
      )
    }
  );
}
export {
  Iw as MCPGatewayDashboard
};
