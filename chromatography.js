(function () {

  var Color, ColorScale, chromato


  Color = (function() {
    function Color(x, y, z, m) {
      var me, _ref2;
      me = this;
      if (!(x != null) && !(y != null) && !(z != null) && !(m != null)) {
        x = [255, 0, 255];
      }
      if (type(x) === 'array' && x.length === 3) {
        if (m == null) m = y;
        _ref2 = x, x = _ref2[0], y = _ref2[1], z = _ref2[2];
      }
      if (type(x) === 'string') {
        m = 'hex';
      } else {
        if (m == null) m = 'rgb';
      }
      if (m === 'rgb') {
        me.rgb = [x, y, z];
      } else if (m === 'hsl') {
        me.rgb = Color.hsl2rgb(x, y, z);
      } else if (m === 'hsv') {
        me.rgb = Color.hsv2rgb(x, y, z);
      } else if (m === 'hex') {
        me.rgb = Color.hex2rgb(x);
      } else if (m === 'lab') {
        me.rgb = Color.lab2rgb(x, y, z);
      } else if (m === 'hcl') {
        me.rgb = Color.hcl2rgb(x, y, z);
      } else if (m === 'hsi') {
        me.rgb = Color.hsi2rgb(x, y, z);
      }
    }

    Color.prototype.hex = function() {
      return Color.rgb2hex(this.rgb);
    };

    Color.prototype.toString = function() {
      return this.hex();
    };

    Color.prototype.hsl = function() {
      return Color.rgb2hsl(this.rgb);
    };

    Color.prototype.hsv = function() {
      return Color.rgb2hsv(this.rgb);
    };

    Color.prototype.lab = function() {
      return Color.rgb2lab(this.rgb);
    };

    Color.prototype.hcl = function() {
      return Color.rgb2hcl(this.rgb);
    };

    Color.prototype.hsi = function() {
      return Color.rgb2hsi(this.rgb);
    };

    Color.prototype.interpolate = function(f, col, m) {
      var dh, hue, hue0, hue1, lbv, lbv0, lbv1, me, sat, sat0, sat1, xyz0, xyz1;
      me = this;
      if (m == null) m = 'rgb';
      if (type(col) === 'string') col = new Color(col);
      if (m === 'hsl' || m === 'hsv' || m === 'hcl' || m === 'hsi') {
        if (m === 'hsl') {
          xyz0 = me.hsl();
          xyz1 = col.hsl();
        } else if (m === 'hsv') {
          xyz0 = me.hsv();
          xyz1 = col.hsv();
        } else if (m === 'hcl') {
          xyz0 = me.hcl();
          xyz1 = col.hcl();
        } else if (m === 'hsi') {
          xyz0 = me.hsi();
          xyz1 = col.hsi();
        }
        hue0 = xyz0[0], sat0 = xyz0[1], lbv0 = xyz0[2];
        hue1 = xyz1[0], sat1 = xyz1[1], lbv1 = xyz1[2];
        if (!isNaN(hue0) && !isNaN(hue1)) {
          if (hue1 > hue0 && hue1 - hue0 > 180) {
            dh = hue1 - (hue0 + 360);
          } else if (hue1 < hue0 && hue0 - hue1 > 180) {
            dh = hue1 + 360 - hue0;
          } else {
            dh = hue1 - hue0;
          }
          hue = hue0 + f * dh;
        } else if (!isNaN(hue0)) {
          hue = hue0;
          if (lbv1 === 1 || lbv1 === 0) sat = sat0;
        } else if (!isNaN(hue1)) {
          hue = hue1;
          if (lbv0 === 1 || lbv0 === 0) sat = sat1;
        } else {
          hue = void 0;
        }
        if (sat == null) sat = sat0 + f * (sat1 - sat0);
        lbv = lbv0 + f * (lbv1 - lbv0);
        return new Color(hue, sat, lbv, m);
      } else if (m === 'rgb') {
        xyz0 = me.rgb;
        xyz1 = col.rgb;
        return new Color(xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), m);
      } else if (m === 'lab') {
        xyz0 = me.lab();
        xyz1 = col.lab();
        return new Color(xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), m);
      } else {
        throw m + ' is not supported as a color mode';
      }
    };
    return Color;
  })();

  Color.hex2rgb = function(hex) {
    var b, g, r, u;
    if (!hex.match(/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
      if ((chromato.colors != null) && chromato.colors[hex]) {
        hex = chromato.colors[hex];
      } else {
        throw 'This color format is unknown: ' + hex;
      }
    }
    if (hex.length === 4 || hex.length === 7) hex = hex.substr(1);
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    u = parseInt(hex, 16);
    r = u >> 16;
    g = u >> 8 & 0xFF;
    b = u & 0xFF;
    return [r, g, b];
  };

  Color.rgb2hex = function(r, g, b) {
    var str, u, _ref2;
    if (r !== void 0 && r.length === 3) {
      _ref2 = r, r = _ref2[0], g = _ref2[1], b = _ref2[2];
    }
    u = r << 16 | g << 8 | b;
    str = '000000' + u.toString(16).toUpperCase();
    return '#' + str.substr(str.length - 6);
  };

  Color.hsv2rgb = function(h, s, v) {
    var b, f, g, i, l, p, q, r, t, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8;
    if (type(h) === 'array' && h.length === 3) {
      _ref2 = h, h = _ref2[0], s = _ref2[1], l = _ref2[2];
    }
    v *= 255;
    if (s === 0 && isNaN(h)) {
      r = g = b = v;
    } else {
      if (h === 360) h = 0;
      if (h > 360) h -= 360;
      if (h < 0) h += 360;
      h /= 60;
      i = Math.floor(h);
      f = h - i;
      p = v * (1 - s);
      q = v * (1 - s * f);
      t = v * (1 - s * (1 - f));
      switch (i) {
        case 0:
          _ref3 = [v, t, p], r = _ref3[0], g = _ref3[1], b = _ref3[2];
          break;
        case 1:
          _ref4 = [q, v, p], r = _ref4[0], g = _ref4[1], b = _ref4[2];
          break;
        case 2:
          _ref5 = [p, v, t], r = _ref5[0], g = _ref5[1], b = _ref5[2];
          break;
        case 3:
          _ref6 = [p, q, v], r = _ref6[0], g = _ref6[1], b = _ref6[2];
          break;
        case 4:
          _ref7 = [t, p, v], r = _ref7[0], g = _ref7[1], b = _ref7[2];
          break;
        case 5:
          _ref8 = [v, p, q], r = _ref8[0], g = _ref8[1], b = _ref8[2];
      }
    }
    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);
    return [r, g, b];
  };

  Color.rgb2hsv = function(r, g, b) {
    var delta, h, max, min, s, v, _ref2;
    if (r !== void 0 && r.length === 3) {
      _ref2 = r, r = _ref2[0], g = _ref2[1], b = _ref2[2];
    }
    min = Math.min(r, g, b);
    max = Math.max(r, g, b);
    delta = max - min;
    v = max / 255.0;
    s = delta / max;
    if (s === 0) {
      h = void 0;
      s = 0;
    } else {
      if (r === max) h = (g - b) / delta;
      if (g === max) h = 2 + (b - r) / delta;
      if (b === max) h = 4 + (r - g) / delta;
      h *= 60;
      if (h < 0) h += 360;
    }
    return [h, s, v];
  };

  Color.hsl2rgb = function(h, s, l) {
    var b, c, g, i, r, t1, t2, t3, _ref2, _ref3;
    if (h !== void 0 && h.length === 3) {
      _ref2 = h, h = _ref2[0], s = _ref2[1], l = _ref2[2];
    }
    if (s === 0) {
      r = g = b = l * 255;
    } else {
      t3 = [0, 0, 0];
      c = [0, 0, 0];
      t2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
      t1 = 2 * l - t2;
      h /= 360;
      t3[0] = h + 1 / 3;
      t3[1] = h;
      t3[2] = h - 1 / 3;
      for (i = 0; i <= 2; i++) {
        if (t3[i] < 0) t3[i] += 1;
        if (t3[i] > 1) t3[i] -= 1;
        if (6 * t3[i] < 1) {
          c[i] = t1 + (t2 - t1) * 6 * t3[i];
        } else if (2 * t3[i] < 1) {
          c[i] = t2;
        } else if (3 * t3[i] < 2) {
          c[i] = t1 + (t2 - t1) * ((2 / 3) - t3[i]) * 6;
        } else {
          c[i] = t1;
        }
      }
      _ref3 = [Math.round(c[0] * 255), Math.round(c[1] * 255), Math.round(c[2] * 255)], r = _ref3[0], g = _ref3[1], b = _ref3[2];
    }
    return [r, g, b];
  };

  Color.rgb2hsl = function(r, g, b) {
    var h, l, max, min, s, _ref2;
    if (r !== void 0 && r.length === 3) {
      _ref2 = r, r = _ref2[0], g = _ref2[1], b = _ref2[2];
    }
    r /= 255;
    g /= 255;
    b /= 255;
    min = Math.min(r, g, b);
    max = Math.max(r, g, b);
    l = (max + min) / 2;
    if (max === min) {
      s = 0;
      h = void 0;
    } else {
      s = l < 0.5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
    }
    if (r === max) {
      h = (g - b) / (max - min);
    } else if (g === max) {
      h = 2 + (b - r) / (max - min);
    } else if (b === max) {
      h = 4 + (r - g) / (max - min);
    }
    h *= 60;
    if (h < 0) h += 360;
    return [h, s, l];
  };

  Color.lab2xyz = function(l, a, b) {
    var finv, ill, sl, x, y, z, _ref2;
    if (type(l) === 'array' && l.length === 3) {
      _ref2 = l, l = _ref2[0], a = _ref2[1], b = _ref2[2];
    }
    finv = function(t) {
      if (t > (6.0 / 29.0)) {
        return t * t * t;
      } else {
        return 3 * (6.0 / 29.0) * (6.0 / 29.0) * (t - 4.0 / 29.0);
      }
    };
    sl = (l + 0.16) / 1.16;
    ill = [0.96421, 1.00000, 0.82519];
    y = ill[1] * finv(sl);
    x = ill[0] * finv(sl + (a / 5.0));
    z = ill[2] * finv(sl - (b / 2.0));
    return [x, y, z];
  };

  Color.xyz2rgb = function(x, y, z) {
    var b, bl, clip, correct, g, gl, r, rl, _ref2, _ref3;
    if (type(x) === 'array' && x.length === 3) {
      _ref2 = x, x = _ref2[0], y = _ref2[1], z = _ref2[2];
    }
    rl = 3.2406 * x - 1.5372 * y - 0.4986 * z;
    gl = -0.9689 * x + 1.8758 * y + 0.0415 * z;
    bl = 0.0557 * x - 0.2040 * y + 1.0570 * z;
    clip = Math.min(rl, gl, bl) < -0.001 || Math.max(rl, gl, bl) > 1.001;
    if (clip) {
      rl = rl < 0.0 ? 0.0 : rl > 1.0 ? 1.0 : rl;
      gl = gl < 0.0 ? 0.0 : gl > 1.0 ? 1.0 : gl;
      bl = bl < 0.0 ? 0.0 : bl > 1.0 ? 1.0 : bl;
    }
    if (clip) {
      _ref3 = [void 0, void 0, void 0], rl = _ref3[0], gl = _ref3[1], bl = _ref3[2];
    }
    correct = function(cl) {
      var a;
      a = 0.055;
      if (cl <= 0.0031308) {
        return 12.92 * cl;
      } else {
        return (1 + a) * Math.pow(cl, 1 / 2.4) - a;
      }
    };
    r = Math.round(255.0 * correct(rl));
    g = Math.round(255.0 * correct(gl));
    b = Math.round(255.0 * correct(bl));
    return [r, g, b];
  };

  Color.lab2rgb = function(l, a, b) {
    var x, y, z, _ref2, _ref3, _ref4;
    if (l !== void 0 && l.length === 3) {
      _ref2 = l, l = _ref2[0], a = _ref2[1], b = _ref2[2];
    }
    if (l !== void 0 && l.length === 3) {
      _ref3 = l, l = _ref3[0], a = _ref3[1], b = _ref3[2];
    }
    _ref4 = Color.lab2xyz(l, a, b), x = _ref4[0], y = _ref4[1], z = _ref4[2];
    return Color.xyz2rgb(x, y, z);
  };

  Color.hcl2lab = function(c, s, l) {
    var L, tau_const, a, angle, b, r, _ref2;
    if (type(c) === 'array' && c.length === 3) {
      _ref2 = c, c = _ref2[0], s = _ref2[1], l = _ref2[2];
    }
    c /= 360.0;
    tau_const = 6.283185307179586476925287;
    L = l * 0.61 + 0.09;
    angle = tau_const / 6.0 - c * tau_const;
    r = (l * 0.311 + 0.125) * s;
    a = Math.sin(angle) * r;
    b = Math.cos(angle) * r;
    return [L, a, b];
  };

  Color.hcl2rgb = function(c, s, l) {
    var L, a, b, _ref2;
    _ref2 = Color.hcl2lab(c, s, l), L = _ref2[0], a = _ref2[1], b = _ref2[2];
    return Color.lab2rgb(L, a, b);
  };

  Color.rgb2xyz = function(r, g, b) {
    var bl, correct, gl, rl, x, y, z, _ref2;
    if (r !== void 0 && r.length === 3) {
      _ref2 = r, r = _ref2[0], g = _ref2[1], b = _ref2[2];
    }
    correct = function(c) {
      var a;
      a = 0.055;
      if (c <= 0.04045) {
        return c / 12.92;
      } else {
        return Math.pow((c + a) / (1 + a), 2.4);
      }
    };
    rl = correct(r / 255.0);
    gl = correct(g / 255.0);
    bl = correct(b / 255.0);
    x = 0.4124 * rl + 0.3576 * gl + 0.1805 * bl;
    y = 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
    z = 0.0193 * rl + 0.1192 * gl + 0.9505 * bl;
    return [x, y, z];
  };

  Color.xyz2lab = function(x, y, z) {
    var a, b, f, ill, l, _ref2;
    if (x !== void 0 && x.length === 3) {
      _ref2 = x, x = _ref2[0], y = _ref2[1], z = _ref2[2];
    }
    ill = [0.96421, 1.00000, 0.82519];
    f = function(t) {
      if (t > Math.pow(6.0 / 29.0, 3)) {
        return Math.pow(t, 1 / 3);
      } else {
        return (1 / 3) * (29 / 6) * (29 / 6) * t + 4.0 / 29.0;
      }
    };
    l = 1.16 * f(y / ill[1]) - 0.16;
    a = 5 * (f(x / ill[0]) - f(y / ill[1]));
    b = 2 * (f(y / ill[1]) - f(z / ill[2]));
    return [l, a, b];
  };

  };

  };

  };
    return new Color(x);
  };

  chromato.hsi = function(h, s, i) {
    return new Color(h, s, i, 'hsi');
  };

  };

    }
    if (type(a) === 'string') {
      a = new Color(a);
    }
    if (type(b) === 'string') {
      b = new Color(b);
    }
    return a.interpolate(f, b, m);
  };



    if (type(a) === 'string') {
      a = new Color(a);
    }
    if (type(b) === 'string') {
      b = new Color(b);
    }
    l1 = a.luminance();
    l2 = b.luminance();
    if (l1 > l2) {
      return (l1 + 0.05) / (l2 + 0.05);
    } else {
      return (l2 + 0.05) / (l1 + 0.05);
    }
  };

  };

}).call(this);