(function() {
  var Color;

chromato = function(x, y, z, m) {
  return new Color(x, y, z, m);
};


chromato.color = function(x, y, z, m) {
  return new Color(x, y, z, m);
};

chromato.hex = function(x) {
  return new Color(x);
};

}).call(this);