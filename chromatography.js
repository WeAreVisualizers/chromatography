(function() {
  var Color;

chromato = function(x, y, z, m) {
  return new Color(x, y, z, m);
};


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
  

}).call(this);