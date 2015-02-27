(function() {
  var Color;

chromato = function(x, y, z, m) {
  return new Color(x, y, z, m);
};

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

  chromato.color = function(x, y, z, m) {
    return new Color(x, y, z, m);
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

}).call(this);

