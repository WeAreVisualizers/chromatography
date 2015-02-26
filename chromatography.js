(function() {
  var Color;

chromato = function(x, y, z, m) {
  return new Color(x, y, z, m);
};

if ((typeof module !== "undefined" && module !== null) && (module.exports != null)) {
    module.exports = chroma;
  }

chromato.color = function(x, y, z, m) {
  return new Color(x, y, z, m);
};

  chromato.color = function(x, y, z, m) {
    return new Color(x, y, z, m);
  };
  
  chromato.rgb = function(r, g, b, a) {
    return new Color(r, g, b, a, 'rgb');
  };

  chromato.hex = function(x) {
    return new Color(x);
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

}).call(this);

