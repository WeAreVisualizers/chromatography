(function () {


if ((typeof module !== "undefined" && module !== null) && (module.exports != null)) {
    module.exports = chroma;
  }

  if (typeof define === 'function' && define.amd) {
    define([], function() {
      return chroma;
    });
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    root.chroma = chroma;
  }
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
  };
  
  chromato.rgb = function(r, g, b, a) {
    return new Color(r, g, b, a, 'rgb');
  };

  chromato.hex = function(x) {
    return new Color(x);
  };
  
  chromato.hsl = function(h, s, l, a) {
    return new Color(h, s, l, a, 'hsl');
  };

  chromato.hsv = function(h, s, v, a) {
    return new Color(h, s, v, a, 'hsv');
  };

  chromato.lab = function(l, a, b) {
    return new Color(l, a, b, 'lab');
  };

  chromato.lch = function(l, c, h) {
    return new Color(l, c, h, 'lch');
  };
  
  chromato.css = function(x) {
    return new Color(x);
  };

  chromato.hsi = function(h, s, i) {
    return new Color(h, s, i, 'hsi');
  };

  chromato.gl = function(r, g, b, a) {
    return new Color(r * 255, g * 255, b * 255, a, 'gl');
  };

  chromato.interpolate = function(a, b, f, m) {
    if ((a == null) || (b == null)) {
      return '#000';
    }
    if (type(a) === 'string') {
      a = new Color(a);
    }
    if (type(b) === 'string') {
      b = new Color(b);
    }
    return a.interpolate(f, b, m);
  };

  chromato.mix = chromato.interpolate;

  chromato.contrast = function(a, b) {
    var l1, l2;

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

  chromato.luminance = function(color) {
    return chroma(color).luminance();
  };

}).call(this);