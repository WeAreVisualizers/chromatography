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
        throw 'this color format is unknown: ' + hex;
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

  };
  };

  };
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